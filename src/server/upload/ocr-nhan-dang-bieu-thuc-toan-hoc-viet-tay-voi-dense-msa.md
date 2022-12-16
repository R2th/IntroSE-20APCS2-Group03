# **I. Giới thiệu**

Để mô tả các vấn đề trong toán học, vật lý, biểu thức toán học là vô cùng cần thiết. Cùng với sự trừu tượng của kiến thức, các biểu thức toán học cũng vô cùng trừu tượng đối với học máy với những khó khăn như: cấu trúc 2 chiều của biểu thức, sự khó khăn tự nhiên khi nhận dạng chữ viết tay và các biến thể của kí tự toán học.

Nhận dạng chữ viết tay bao gồm 2 vấn đề chính:
- Nhận dạng kí tự
- Nhận dạng cấu trúc


Có khá nhiều cách giải quyết 2 vấn đề trên nhưng đều tồn tại 1 số hạn chế như:
- Phân đoạn kí tự toán học
- Phân tích cấu trúc thường phụ thuộc vào cấu trúc 2 chiều không có ngữ pháp cụ thể
- Sự phức tạp của thuật toán tăng dần theo kích thước của biểu thức

![](https://images.viblo.asia/a334bead-ea8f-469c-bcb5-389780cc4dfe.png)

Trong bài viết này, mình sẽ giới thiệu mô hình mạnh và tốt trong bài toán nhận diện các biểu thức toán học được cải tiến dựa trên mô hình [WAP](http://home.ustc.edu.cn/~xysszjs/paper/PR2017.pdf).

# **II. Phương pháp**

Mô hình sử dụng có 3 mô-đun chính: DenseNet, mô hình attention cơ bản gồm encoder-decoder và cuối cùng là Multi-Scale Attention with Dense Encoder

## **1. Dense Encoder**

Với khả năng feature extraction tốt với ưu thế truyền tải gradient, DenseNet thể hiện xuất sắc trong bài toán Image Classification. Ý tưởng chính của DenseNet là sử dụng output của lớp trước làm input của các lớp sau. Dưới đây là ví dụ 1 mô hình DenseBlock:
![](https://images.viblo.asia/423270b0-0ff4-4d91-9a33-9fc0a9d71b1d.png)

Và mô hình 1 DenseNet hoàn chỉnh:
![](https://images.viblo.asia/5b379ddc-5c1f-498d-aafc-1dddd06d3600.png)

Như cấu trúc ta có thể thấy DensetNet có thành phần chính là DenseBlock và kết nối chúng lại với nhau là các lớp chuyển tiếp và thay đổi feature-map bằng lớp Convolution hoặc Pooling.

Vì DenseNet là sự kết hợp rất nhiều các lớp Convolution, gọi $H_{t}$ là hàm tích chập của lớp thứ $t$, thì ta được output của lớp thứ $t$ được biểu diễn dưới dạng:

$$x_{t} = H_{t}([x_{0}; x_{1};...; x_{t-1}])$$

Tại đó:
- $x_{t}$ là output của các lớp thứ $0, 1, 2,..., t-1$
- ";" là concat các feature-map

Cấu trúc đặc biệt với các kết nối được lặp lại cho phép mô hình sử dụng lại các features được tính toán ở các lớp trước làm tăng khả năng trích xuất thông tin từ bức ảnh, đồng thời tăng cường khả năng truyền gradient trong mạng. Để hiểu rõ hơn về DenseNet, các bạn đọc tại [đây](https://arxiv.org/pdf/1608.06993.pdf).

## **2. Decoder**
![](https://images.viblo.asia/be0c74fb-fe01-4709-b456-7a0461db1ccb.png)

Trong decoder, mô hình sử dụng [GRU](https://www.noron.vn/post/toan-bo-ve-mang-gru-1494wsylpn80d) vì GRU là phiên bản nâng cấp của RNN (:D) đồng thời GRU làm giảm vanishing và exploding gradient (Thực tế thì....). Với đầu vào $x_{t}$, output $h_{t}$ được tính bởi:

$$h_{t} = GRU(x_{t}, h_{t-1})$$

và hàm GRU được tính như sau:
- Update Gate (Cổng cập nhật): Giúp mô hình chọn lọc được lượng thông tin tại time step (t - 1) để truyền đến time step t, đồng thời còn làm giảm hiện tượng vanishing gradient trong mạng RNN

$$z_{t} = \sigma(W_{xz}x_{t} + U_{hz}h_{t-1})$$

- Reset Gate (Cổng cài đặt lại): Tương tự như Update Gate, chỉ khác weight và mức sử dụng

$$r_{t} = \sigma(W_{xr}x_{t} + U_{hr}h_{t-1})$$

- Current memory content (Nội dung nhớ hiện tại): Xác định các cổng sẽ ảnh hưởng đến output tại time step t như thế nào

$$\widetilde{h}_{t} = \tanh(W_{xh}x_{t} + U_{rh}(r_{t} \otimes h_{t-1}))$$

- Final memory at current time step (Bộ nhớ tại thời điểm hiện tại): Xác định toàn bộ thông tin tại time step t để truyền tiếp đi

$$h_{t} = (1-z_{t}) \otimes h_{t-1} + z_{t} \otimes \widetilde{h}_t$$

trong đó:

- $\sigma$ : Hàm kích hoạt sigmoid
- $\tanh$: Hàm kích hoạt tanh
- $\otimes$ : toán tử element-wise

Giả sử đầu ra của DenseNet là 1 mảng 3 chiều (C x W x H), gọi L = W x H, ta được 1 lưới 2 chiều (C x L) có L phần tử, mỗi phần tử có C chiều, ứng với local region trên ảnh ban đầu

$$A = \{a_1, a_2,..., a_L\}, a_i \in \R^C$$

Qua mạng GRU, ta sẽ sinh ra được chuỗi LaTex ứng với biểu thức toán đầu vào. Ouput $Y$  là một chuỗi các kí tự one-hot encoded:

$$Y = \{y_1, y_2,..., y_T\}, y_i \in \R^K$$

Với K là tổng số kí tự trong từ điển được định sẫn và T là đọ dài của xâu LaTex

Vì độ dài của A và Y là không xác định (Không đoán trước được), nên cần cố định độ dài vector đầu ra tại mỗi step t, gọi là context vector ($c_t$) , vector c_t được tính bằng:

$$c_t = \sum_{i=1}^L{\alpha_{ti} a_i}$$

$\alpha_{ti}$ là hệ số attention, giúp cho mô hình biết được chỗ nào trên ảnh cần phải tập trung vào để dự đoán kí tự tiếp theo, đồng thời tăng trọng số cho vectors $a_i$

Xác suất mỗi kí tự dự đoán được tính bởi context vector $c_t$, current state $s_t$ và kí tự được dự đoán từ trước $y_{t-1}$:

$$\boxed{p(y_t|y_{t-1}, X) = f(W_o, h(Ey_{t-1} + W_ss_t + W_cc_t))}$$

Với:

- X: Biểu thức toán đầu vào
- f: Hàm kích hoạt softmax
- h: Hàm kích hoạt maxout
- E: Embedding matrix
- Gọi m, n là số chiều của embedding và state GRU hiện tại, khi đó:
    - $W_o \in \R^{K * \frac{m}{2}}$
    - $W_s \in \R^{m * n}$

## **3. Multi-Scale Attention with Dense Encoder**

### **3.1 Multi-Scale Dense Encoder**
![](https://images.viblo.asia/0a6195b0-cbc0-4ad1-8aa5-4ce9486b9397.png,  "abckdkkljdskfhjskdjfhkj")

Mô hình multi-scale attention được mở rộng từ  mô hình sigle-scale dense encoder. Như trong hình minh họa, ngoài ouput low_resolution A của nhánh chính thì còn có nhánh tạo ra output high-resolution B được tách từ nhánh chính ngay trước lớp pooling cuối, được gọi là nhánh multi-scale. Khi đó, output tại B sẽ là mảng 3 chiều ($C^{\prime}, 2W, 2H$), và là một lưới có $4L$ phần tử:

$$B = \{b_1, b_2,..., b_{4L}\}, b_i \in \R^{C^{\prime}}$$

với $L = W * H$

### **3.2 Multi-Scale Attention Model**

Ở đây, mô hình sử dụng 2 lớp GRU 1 chiều để tính $s_t$ và multi-scale context vector $c_t$, được sử dụng để tính xác suất của kí tự đc predict (Công thức đóng khung :v). Sau đấy, sử dụng 2 mô hình single-scale coverage based attention để sinh ra low-resolution context vector và  high-resolution context vector. Vì 2 context vector có cùng độ dài, nên mô hình ghép 2 vector lại để tạo multi-scale context vector:

$$\hat{s}_t = GRU(y_{t-1}, s_{t-1})$$

$$cA_t = f_{catt}(A, \hat{s}_t)$$

$$cB_t = f_{catt}(B, \hat{s}_t)$$

$$c_t = [cA_t, cB_t]$$

$$s_t = GRU(c_t, \hat{s}_t)$$

Với:

- s_{t-1} : State trước
- $\hat{s}_t$ : Predicted của state hiện tại
- $cA_t$ :  Low-resolution context vector của decoding tại time step t
- $cB_t$ :  High-resolution context vector của decoding tại time step t
- $f_{catt}$ : Mô hình [single-scale coverage based attention](https://arxiv.org/pdf/1601.04811v6.pdf)


# **III. Kết luận**
Vậy là mình đã giới thiệu xong mô hình Dense + MSA cho bài toán nhận dạng biểu thức toán học viết tay dựa trên paper [Multi-Scale Attention with Dense Encoder for
Handwritten Mathematical Expression Recognition](https://arxiv.org/pdf/1801.03530.pdf?fbclid=IwAR03pT8no3W13_wpVlq18xVC1B2eIEp5LXbZOhtbyCr1kFgFwHTRYB_PcOA).  Cảm ơn các bạn đã dành thời gian theo dõi bài viết của mình. Bài viết vẫn còn nhiều sai sót, mình hy vọng mọi người góp ý để có thể cải thiện bài viết tốt hơn. See ya!!! (KxSS)

# **Tài liệu tham khảo**
1. https://arxiv.org/pdf/1801.03530.pdf?fbclid=IwAR03pT8no3W13_wpVlq18xVC1B2eIEp5LXbZOhtbyCr1kFgFwHTRYB_PcOA
2. https://arxiv.org/pdf/1608.06993.pdf
3. http://home.ustc.edu.cn/~xysszjs/paper/PR2017.pdf
4. https://arxiv.org/pdf/1601.04811v6.pdf
5. https://www.noron.vn/post/toan-bo-ve-mang-gru-1494wsylpn80d
6. https://blog.chappiebot.com/h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-chi-ti%E1%BA%BFt-v%E1%BB%81-c%C6%A1-ch%E1%BA%BF-c%E1%BB%A7a-lstm-v%C3%A0-gru-trong-nlp-a1bd9346b209