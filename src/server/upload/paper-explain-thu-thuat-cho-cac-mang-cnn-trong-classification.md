# Lời mở đầu
CNN (Convolutional Neural Network) lần đầu được ra mắt và áp dụng vào bài toán Classification (phân loại) là LeNet-5 vào năm 1989 của nhóm nghiên cứu của thầy Yann LeCun. Và với sự ra mắt tiếp đó của AlexNet vào năm 2012, chiến thắng cuộc thi phân loại ảnh ImageNet, CNN đã dần có được sự thống trị của mình trong các bài toán phân loại ảnh. Rất nhiều các kiến trúc CNN mới ra đời như VGG, Inception, ResNet, DenseNet,... và gần đây nhất là ConvNext.   
Tuy nhiên, những sự phát triển vượt bậc này không chỉ nằm ở trong mỗi kiến trúc của chúng. Những thay đổi trong quá trình training, bao gồm những sự thay đổi trong **hàm loss**, **cách xử lý dữ liệu**, các phương pháp **optimization** khác nhau cũng đóng một vai trò vô cùng quan trọng. Những thay đổi này giống như những sát thủ thầm lặng, chỉ được nhắc tới rất ngắn trong các paper hoặc thậm chí là không nhắc tới, mà phải đọc source code mới có thể tìm ra, và cũng nhận được rất ít những sự quan tâm.  
Hôm nay, chúng ta sẽ khám phá những thay đổi này, giúp cải thiện độ chính xác của model mà hầu như không làm tăng độ nặng tính toán. Có khá nhiều những thay đổi vô cùng nhỏ nhặt, được gọi là "tricks" (thủ thuật), như thay đổi stride trong lớp Convolution, thay đổi learning rate. Tuy nhiên, kết hợp nhiều thay đổi nhỏ sẽ tạo ra được sự thay đổi lớn. Chúng ta sẽ đánh giá những thay đổi này trên một số CNN và tìm hiểu tác động của chúng.  
# Quy trình training
![image.png](https://images.viblo.asia/6942723c-c3ff-4654-af16-4d56ba3c4bd5.png)  
Một mạng nơ-ron train với Stochastic Gradient Descent (SGD) sẽ tuân theo quy trình training như thuật toán 1.  
### Baseline cho quy trình training
Chúng ta cần một quy trình training baseline dùng để làm so sánh với sự thay đổi trong các quy trình về sau. Tiền xử lý dữ liệu trong lúc train và validation sẽ khác nhau. Trong lúc train, ta thực hiện tuần tự các bước sau:  
1. Lấy ngẫu nhiên ảnh, xử lý ảnh thành dạng float cho từng pixel với giá trị trong khoảng \[0, 255].
2. Ngẫu nhiên crop một vùng chữ nhật có tỉ lệ được lấy ngẫu nhiên trong khoảng [$3/4$, $4/3$], diện tích của vùng được lấy ngẫu nhiên trong khoảng [$8$%, $100$%], sau đó được resize thành ảnh vuông với kích thước $224 \times 224$.
3. Sử dụng Horizontal Flip với tỉ lệ $0.5$
4. Thay đổi hue, staturation và brightness với hệ số được lấy ngẫu nhiên trong khoảng [$0.6$, $1.4$].  
5. Thêm nhiễu PCA với hệ số được lấy từ phân phối chuẩn $\mathcal { N } ( 0,0.1 )$
6. Normalize kênh màu RGB bằng việc trừ đi $123.68, 116.779, 103.939$ và chia cho $58.393, 57.12, 57.375$

Trong lúc validation, ta resize cạnh ngắn hơn của ảnh xuống $256$, cạnh còn lại được resize theo tỉ lệ của ảnh. Sau đó, ta crop ra một vùng $224 \times 224$ ở trung tâm của ảnh và normalize RGB y như lúc training.  
Weight của các lớp Convolution và Fully-Connected (FC) được khởi tạo ngẫu nhiên theo thuật toán Xavier. Với các lớp BatchNorm (BN), $\gamma$ được khởi tạo là $1$ và $\beta$ được khởi tạo là $0$.  
Nesterov Accelerated Gradient (NAG) Descent được sử dụng trong training. Model được train với 120 epochs, sử dụng 8 GPU V100 với tổng batch size là 256. Learning rate được khởi tạo là 0.1 và giảm đi mỗi 10 lần ở epoch thứ 30, 60 và 90.  
### Kết quả baseline
Áp dụng training đối với 3 model: ResNet-50, Inception-v3 và MobileNet. Kết quả được thể hiện ở Bảng 1. 
![image.png](https://images.viblo.asia/ce267bd9-7c08-4cdc-bbbe-02c949f00075.png)  
# Training một cách hiệu quả 
## Training với batch size khác nhau
Vì mỗi máy tính sẽ có các cấu hình phần cứng khác nhau, nên chúng ta phải điều chỉnh batch size để phù hợp với phần cứng đó. Tuy nhiên, việc điều chỉnh batch size khác nhau sẽ đem lại những ảnh hưởng đến độ chính xác của mô hình chúng ta. Để có thể thay đổi batch size mà vẫn có độ chính xác tốt, các kĩ thuật dưới đây sẽ giúp chúng ta đạt được điều đó.  
### Linear scaling learning rate
Trong mini-batch SGD, gradient descent là một quá trình ngẫu nhiên vì data được lấy ngẫu nhiên ở mỗi batch. Việc tăng batch size sẽ không thay đổi kì vọng của SGD nhưng sẽ làm giảm phương sai. Nói cách dễ hiểu hơn là, việc có một batch size lớn hơn sẽ giảm đi nhiễu ở trong các lần đạo hàm, vì vậy, ta cần phải tăng learning rate để quá trình hội tụ của SGD hiệu quả hơn. Giả sử learning rate ban đầu là $0.1$ với batch size là 256, khi chuyển sang batch size là $b$ learning rate mới sẽ được tính theo công thức $0.1 \times b / 256$.  
### Learning rate warmup
Khi bắt đầu training, các tham số thường được khởi tạo ngẫu nhiên và sẽ khác rất nhiều so với tham số cuối cùng của model. Vì vậy, việc sử dụng một learning rate lớn thường sẽ gây khó khăn cho việc hội tụ ở giai đoạn đầu. Từ đó sinh ra giai đoạn "warmup", ta sẽ sử dụng một learning rate nhỏ rồi chuyển lại về learning rate ta muốn khi mà model đã đạt được một sự ổn định. Giả sử ta sử dụng $m$ epoch đầu tiên để warmup, learning rate ta muốn là $\eta$, thì tại batch thứ $i$ với $1 \leq i \leq m$, learning rate sẽ tính theo công thức $i \eta / m$.  
### Zero $\gamma$
ResNet bao gồm các Residual Block, mỗi Residual Block bao gồm một vài lớp Convolution. Với đầu vào $x$, gọi $block(x)$ là đầu ra của lớp cuối cùng trong Residual Block, thì đầu ra của cả Residual Block sẽ là $x + block(x)$. Lưu ý rằng lớp cuối cùng trong Residual Block có thể là BatchNorm (BN). BN trước tiên sẽ standardize $x$, tạo ra $\hat{x}$, sau đó thực hiện biến đổi theo công thức $\gamma \hat{x} + \beta$. Cả $\gamma$ và $\beta$ đều là các tham số học được và thường được khởi tạo với giá trị $1$ và $0$. Với việc khởi tạo $\gamma$ là $0$ cho toàn bộ các lớp BN ở cuối Residual Block, các Residual Block sẽ trả lại luôn giá trị đầu vào của chúng là $x$, làm cho model như có ít lớp hơn, do đó sẽ dễ train hơn ở các giai đoạn đầu.  
### No bias decay
Chúng ta thường áp dụng weght decay cho các parameters, bao gồm cả weight và bias. Việc này giống như sử dụng L2 regularization lên các parameters. Tuy nhiên, có các nghiên cứu đã chỉ ra rằng chỉ nên áp dụng regularization lên weight để tránh overfitting. Vì vậy, chiến lược no bias decay chỉ áp dụng weight decay lên weight của các lớp convolution và FC. Các parameter khác như $\gamma$ và $\beta$ trong lớp BN không được áp dụng.  
## Kết quả
![image.png](https://images.viblo.asia/5fa80bfc-bc8a-4495-ab92-0354b756df36.png)
# Tinh chỉnh model
Tinh chỉnh model là những thay đổi vô cùng nhỏ đến cấu trúc của mạng nơ-ron, chẳng hạn như thay đổi stride trong một lớp Convolution. Những thay đổi vô cùng nhỏ đó sẽ không ảnh hưởng đáng kể đến tốc độ của model nhưng lại có thể đem lại một vài thay đổi không nhỏ đến độ chính xác của model. Trong mục này, ta sẽ cải tiến ResNet-50 (Hình 1) để cho thấy sự hiệu quả của việc tinh chỉnh model.  
![image.png](https://images.viblo.asia/112fac7d-8d44-4304-87f3-b80a39ac6888.png)
### Tinh chỉnh B (Hình 2)
Cải tiến B thay đổi khối Down sampling của ResNet. Quan sát thấy rằng việc sử dụng $1 \times 1$ Convolution với stride 2 trong Path A sẽ làm mất rất nhiều thông tin từ Feature map đầu vào, ResNet-B đổi stride trong $1 \times 1$ Convolution thành 1, stride trong $3 \times 3$ Convolution thành 2 và đảm bảo đầu ra từ Path A vẫn giữ nguyên kích thước.  
![image.png](https://images.viblo.asia/6331d133-62aa-4569-9102-dffe748d7f40.png)
### Tinh chỉnh C (Hình 3)
Quan sát thấy khối lượng tính toán của lớp Convolution $7 \times 7$ gấp 5.4 lần so với lớp Convolution $3 \times 3$. Tinh chỉnh này thay đổi Input stem, thay thế lớp Convolution $7 \times 7$ thành 3 lớp Convolution $3 \times 3$. Điều này giúp trích xuất thông tin tốt hơn mà không làm tăng độ phức tạp tí
![image.png](https://images.viblo.asia/f2ba83de-aebb-4d83-b3b7-61874afe7bb3.png)
### Tinh chỉnh D (Hình 4)
Trong khối Down sampling của ResNet, ở Path B cũng sử dụng $1 \times 1$ Convolution với stride 2 gây mất đi nhiều thông tin. Tinh chỉnh này thêm vào một lớp $2 \times 2$ Average Pooling với stride 2 trước $1 \times 1$ Convolution, và thay stride của lớp Convolution thành 1.   
![image.png](https://images.viblo.asia/904e63eb-bbeb-43f8-890d-36440bda67f7.png)
### Kết quả
![image.png](https://images.viblo.asia/50d9839c-35e8-4713-960e-9bf294e5c40e.png)
# Cải tiến training
### Learning rate decay (Hình 5)
Việc lựa chọn learning rate đúng là cực kì quan trọng. Sau learning rate warmup đã nhắc tới ở trên, ta sẽ giảm từ từ learning rate. Chiến thuật giảm learning rate đơn giản hay được lựa chọn là: 
- Giảm 0.1 learning rate mỗi 30 epochs, gọi là step decay
- Giảm 0.94 learning rate mỗi epoch

Một chiến thuật nữa là giảm learning rate theo hàm $\cos$. Giả dụ tổng số batch là $T$ (bỏ qua warmup), thì ở tại batch thứ $t$, learning rate $\eta_{t}$ được tính theo công thức:  
![image.png](https://images.viblo.asia/93978e77-d410-4aaa-a1d5-49b80638930d.png)  
với $\eta$ là learning rate lựa chọn. Chiến thuật này được gọi là Cosine Annealing.  
![image.png](https://images.viblo.asia/ef5ba623-8f60-4a0b-b6d2-e6992d41a344.png)  
### Label smoothing
Lớp cuối cùng của một mạng nơ-ron phân loại thường là một lớp FC với số unit bằng số class, kí hiệu là $K$, để sinh ra giá trị dự đoán. Với một ảnh đầu vào, mạng nơ-ron sẽ sinh ra giá trị dự đoán cho class $i$ kí hiệu là $z_i$. Giá trị dự đoán này có thể được normalized sử dụng softmax để thu được xác suất dự đoán của từng class. Gọi $q$ là output của softmax với $q = softmax(z)$, xác suất của class $i$, $q_i$ có thể được tính theo công thức:  
![image.png](https://images.viblo.asia/550ceedf-6689-4d90-ae48-58e9d217ab53.png)  
Có thể dễ dàng thấy là $q_i > 0$ và $\sum_{j=1}^{K}q_i=1$ nên có thể coi $q$ là một phân phối.  
Mặt khác, giả dụ ground truth label cho ảnh là $y$, ta có thể dựng một phân phối xác suất ground truth cho $p_i = 1$ nếu $i=y$ và $0$ nếu ngược lại. Trong training, mục tiêu của ta là minimize Cross Entropy (CE) loss.  
![image.png](https://images.viblo.asia/67812d95-6387-48ed-9054-82bdcbd7d937.png)  
để làm cho 2 phân phối là phân phối dự đoán từ model và phân phối ground truth trở nên giống nhau. Cụ thể hơn, qua cách xây dựng $p$, ta thấy $\ell (p, q)=-log{p_y}=-z_y+log(\sum_{i=1}^{K}exp(z_i))$. Kết quả tối ưu nhất sẽ là $z^*_{y}=inf$. Nói cách khác, việc này khuyến khích các class khác nhau trở nên cực kì phân biệt với nhau, do đó có thể dẫn tới overfitting.  
Ý tưởng về label smoothing được giới thiệu ở trong Inception-v2. Nó thay đổi cách biểu diễn ground truth label $y$ thành dạng:  
![image.png](https://images.viblo.asia/290b3bb5-1af1-4e47-926b-d0b317a5d60a.png)  
với $\varepsilon$ là một hằng số nhỏ. Lúc này, kết quả tối ưu sẽ trở thành:  
![image.png](https://images.viblo.asia/1bb5e5f2-8b52-408d-af99-8bd6861ee5a6.png)  
với $\alpha$ là một số thực bất kì. Điều này khiến kết quả từ lớp FC sẽ generalized tốt hơn.
### Knowledge distillation 
Trong knowledge distillation, ta sử dụng một teacher model để giúp đỡ train model hiện tại, gọi là student model. Teacher model thường là một model được pre-trained với accuracy cao, để giúp student model cải thiện accuracy mà độ phức tạp của student model vẫn giữ nguyên.  
Trong training, ta thêm vào distillation loss để phạt sự khác nhau giữa output từ teacher và student. Cho trước một input, giả sử $p$ là phân phối ground truth, $z$ và $r$ là output của student model và teacher model. Ta sẽ dùng CE loss làm distillation loss theo công thức như sau:  
![image.png](https://images.viblo.asia/672b1986-877a-417b-a6e3-80b2340d55c3.png)  
với $T$ là hyper-parameter để làm mượt output của softmax để chắt lọc kiến thức từ kết quả dự đoán của teacher.  
### Mixup training
Trong phần baseline cho training, đầu vào đã được đi qua một số augmentations. Ở đây, ta sử dụng thêm một phương pháp augmentation nữa gọi là MixUp. Trong MixUp, ta sẽ lấy ngẫu nhiên 2 mẫu dữ liệu $(x_i, y_i)$ và $(x_j, y_j)$, sau đó tạo nên một mẫu dự liệu mới theo công thức kết hợp:  
![image.png](https://images.viblo.asia/0f4d101a-3789-4223-b05b-d878e20988ea.png)  
với $\lambda \in [0, 1]$ được lấy ngẫu nhiên theo phân phối $Beta(\alpha, \alpha)$. 
### Kết quả
![image.png](https://images.viblo.asia/17928093-4f29-48ba-968c-59dbab734e38.png)  
# TL;DR
Phía trên là những phân tích rất dài, trình bày sơ qua những phương pháp đó là gì, áp dụng ra sao và có ảnh hưởng tới kết quả của một model Classification như nào. Tuy nhiên, có một số những phương pháp khá dễ áp dụng và đạt hiệu quả ổn định mà mình đã có dịp sử dụng qua dưới đây:
- Learning rate warmup: Cho learning rate tăng từ từ ở những epoch đầu
- Learning rate decay: Learning rate sẽ giảm theo thời gian
- Label smoothing: thay vì sử dụng one-hot encode thì label sẽ được smooth hơn, tránh overfitting
- Áp dụng các phương pháp augmentation phù hợp với bộ dữ liệu sử dụng: đây là một phương pháp mình thấy cực kì đơn giản mà độ hiệu quả mang lại khá cao

Hy vọng các bạn có thể áp dụng được những phương pháp nói trên vào các bài toán Image Classification của mình và đem lại hiệu quả tốt.