# Source paper 
* Link paper [ImageNet Classification with Deep Convolutional Neural Networks](http://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf)
# Giới thiệu 

Đây được chọn là paper đầu tiên để giới thiệu trong chuỗi các bài review paper trong Deep Learning. Paper này giới thiệu một Deep CNN - một trong những kiến trúc nền tảng cho Deep Learning hiện đại. Tại thời điểm công bố paper này vào 2012, phương pháp được áp dụng đã giành chiến thắng tại top 5 chung cuộc của **2012 ImageNet LSVRC** với test error rate là **15.3%**, tốt hơn rất nhiều so với vị trí thứ 2 ở thời điểm đó **26.5%**. Trong paper này có rất nhiều những kĩ thuật làm nền tảng cho các mô hình Deep CNN sau này. Dưới đây có thể kể ra các đóng góp nổi bật của paper này: 
* Đạt được vị trí state-of-the-art tại ILSVRC-2012.
* Release một công cụ để training mạng CNN bao gồm các xử lý tính toán phép convulution 2D trên GPU giúp tăng tốc độ tính toán trong khi training và testing. Họ release thư viện đó tại [đây](https://code.google.com/archive/p/cuda-convnet/)
* Công bố các thành phần mới của mạng CNN để giúp tăng thời gian tính toán và giảm độ phức tạp của mô hình. Trong paper đã phân tích rất chi tiết hiệu quả của từng thành phần đó. 
* Sử dụng một số kĩ thuật để giảm overfiting như sử dụng dropout và data augumentation. Đây là các kĩ thuật mà chúng ta vẫn còn sử dụng cho đến ngày hôm nay 

Bây giờ chúng ta sẽ cùng nhau tìm hiểu chi tiết về các phần đóng góp này theo thứ tự mức độ quan trọng và ảnh hưởng đến các nghiên cứu sau này nhé. 

# Chi tiết các đóng góp 
## Activation Function ReLU 
Đóng góp quan trọng nhất và cũng có tầm ảnh hưởng nhiều nhất của paper này đó chính là việc phát hiện ra hàm ReLU giúp cho tăng tốc độ hội tụ của mô hình (tức giảm thời gian training) khoảng 6 lần. Trước thời điểm ra paper (năm 2012) thì các hàm kích hoạt thường được sử dụng trong mạng nơ ron là **sigmoid** và hàm **tanh**. Ở trong paper này tác giả sử dụng hàm tanh để so sánh hiệu quả so với hàm ReLU đề xuất. Một phần vì đạo hàm của nó rất đẹp, một phần vì nó có khả năng mapping các số ở các khoảng giá trị khác nhau về một khoảng giá trị (với hàm $tanh$ là khoảng $(-1, 1)$ còn $sigmoid$ là khoảng $(0, 1)$. Cùng xem thử công thức của hàm **sigmoid**

$$f(x)=\frac{1}{1 + e^{-x}}$$

Có biểu đồ như sau:

![](https://i.stack.imgur.com/voC4J.png)

Paper cũng chỉ ra một nhược điểm của các **saturating activation** như **sigmoid** hay **tanh** đó chính là tốc độ hội tụ của mạng sẽ chậm khi trọng số của các neural có trị tuyệt đối lớn thì sẽ bị rơi vào **miền bão hoà - saturation** của activation đó, tức giá trị của hàm số gần đạt cực trị (cực tiểu 0 hoặc cực đại 1 đối với sigmoid). Điều này khiến cho đạo hàm của chúng trở nên vô cùng bé (có thể gần tới giá trị 0). Chính vì  lý do đó mà qua các iteration trong bước training các neural có trọng số lớn gần như không được cập nhật gì cả. Điều này khiến cho tốc độ học của mô hình tăng lên nhiều 

Paper đề xuất sử dụng hàm **ReLU** có công thức 

$$f(x)=max(0, x)$$

Thời gian training của mô hình khi sử dụng ReLU cải tiến rõ rệt Có thể thấy trong ảnh sau. 

![](https://images.viblo.asia/82b472b0-ddd8-47a8-a586-e618d09dbe01.png)

Tron đó đường nét liền chính là thời gian training khi sử dụng ReLU, nét đứt chính là thời gian training khi sử dụng hàm tanh. Dễ thấy sử dụng ReLU sẽ cho tốc độ hội tụ nhanh gấp khoảng 6 lần khi sử dụng activation tanh với cùng 1 kiến trúc mạng. 

## Training trên nhiều GPUs 

Tại thời điểm viết paper thì một GPU **GTX 580** chỉ có 3GB bộ nhớ, chính vì thế nó giới hạn maximum size của mạng được training. Paper đề xuất tách mạng nơ ron để training trên 2 GPUs. Điều này là khả thi bởi vì các GPU có thể đọc ghi trực tiếp vào bộ nhớ của nhau mà không phải thông qua một máy trung gian nào. Trong paper, tác giả thực hiện việc training song song trên 2 GPUs. Để làm được điều này tác giả chia số lượng kernels sử dụng trong mỗi layer ra làm 2 phần được lưu trữ và tính toán trên 2 GPUs khác nhau. Việc kết nối và trao đổi thông tin về trọng số trên mỗi GPU chỉ thực hiện với 1 layer nhất định. Ví dụ layer 2 có tập các kernel là $K_2 = K_{21} \cap  K_{22}$ trong đó $K_{21}$ chỉ các kernel của layer 2 được locate trên GPU 1, $K_{22}$ chỉ các kernel của layer2 được locate trên GPU 2.  Giả sử các kernel trên layer 3 $K_3 = K_{31} \cap  K_{32}$ sẽ nhận đầu vào chỉ từ các kernel $K_2$. Kí hiệu $\leftarrow$ chỉ sự liên kết từ các kernel ở layer sau đến các kernel ở layer trước. Lúc này chúng ta có hai cách thức để communicate các trong số trên hai GPU như sau:

* **Trường hợp 1:**  $K_3$ sẽ lấy đầu vào từ toán bộ $K_2$. Tức lúc này sẽ cần phải trao đổi chéo các thông tin giữa hai GPUs. Hay ta có 
$$(K_{21} \cap  K_{22})  \leftarrow  K_{32}$$
$$  (K_{22} \cap  K_{21}) \leftarrow K_{31}$$

* **Trường hợp 2:** $K_3$ sẽ chỉ lấy đầu vào từ các kernel thuộc $K_2$ nhưng hiện được lưu trữ trên cùng 1 GPU. Tức là 
$$  K_{21} \leftarrow K_{31}$$
$$  K_{22}  \leftarrow  K_{32}$$

Các bạn có thể thấy rõ hơn trong kiến trúc mạng của paper này 

![](https://neurohive.io/wp-content/uploads/2018/10/Capture-12.jpg)

Chúng ta có thể thấy các lớp convulution thứ 2, thứ 4 và thứ 5 sẽ connect theo trường hợp 2. Layer 3 cùng với hai layer dầu tiên trong lớp fully connected sẽ connect theo trường hợp 1

> **Lưu ys:** Hiện nay các GPU có bộ nhớ tương đối dồi dào, vì vậy ta hiếm khi cần phải chia nhỏ mô hình trên các GPU (phiên bản mô hình AlexNet của ta khác với bài báo ban đầu ở khía cạnh này).

## Local Response Normalization

Normalization là một bước rất quan trọng trong khi thiết kế một mạng nơ ron nhất là đối với các hàm kích hoạt mang tính chất **unbounded** như ReLU đã được đề cập ở phía trên. Với các activation này, output của các layer không rơi vào trong một khoảng cố định ví dụ như $(-1, 1)$ như hàm $tanh(x)$ đã đề cập phía trên chẳng hạn. Ngày nay chúng ta ít khi sử dụng **Local Response Normalization** được đề cập trong paper này và thay vào đó là **Batch Normalization** được đề xuất sau đó (2015). Để giải thích sâu hơn về sự khác nhau giữa hai khái niệm này mình sẽ có một bài viết riêng biệt. Quay trở lại với paper của chúng ta, một trong những đóng góp của paper này đó là đề xuất **Local Response Normalization - LRN**. Đây là một layer **non-trainable** có công thức như sau:

![](https://deeplearning.vn/post/alexnet/images/lrn.png)

trong đó:

* $i$ tương ứng với kernel thứ $i$ trong tổng số $N$ kernel 
* $a^{i}_{x, y}$ và $b^{i}_{x, y}$ lần lượt là giá trị của pixel có toạ độ $(x, y)$ thuộc kernel thứ $i$ tương ứng với trạng thái trước và sau khi áp dụng LRN
* các hệ số $k, n, \alpha, \beta$ là các hyper parameters được cài đạt mặc định trong mạng là $(k,α, β, n)=(0,1,1,N)$ tương ứng với **standard normalization**

Có thể hình dung LRN giống như việc chuẩn hoá dựa trên các neuron "hàng xóm" tức thuộc cùng vị trí nhưng ở các kernel lân cận. Chúng ta cso thể hình dung nó trong hình sau 

![](https://images.viblo.asia/3da3b900-a87d-4a98-8aff-802f78495091.png)

Minh hoạ cho quá trình chuẩn hoá có thể xem trong hình sau 

![](https://miro.medium.com/max/1400/1*DmnOhSTIzn04sC0w1d3FPg.png)

> **Lưu ý:** Ngày nay người ta thường sử dụng **Batch Normalization** hơn là **LRN**. Thậm chí, trong một paper nổi tiếng khác là [VGGNet](https://deeplearning.vn/post/alexnet/#vggnet) **LRN** đã được chứng minh là không làm tăng thêm hiệu quả trên **ILSVRC** dataset nhưng còn làm tăng thêm bộ nhớ và thời gian tính toán. 

## Giảm overfiting 
### Dropout 
Alexnet đã sử dụng kĩ thuật regularization là Dropout để tránh việc overfiting. Về cơ bản kĩ thuật này sẽ set ngẫu nhiên đầu ra của một neuron về 0 với xác suất $p=0.5$. Tức các neuron được drop sẽ không có đóng góp gì trong quá trình backward và forward tại chính iteration đó. Dropout là một kĩ thuật được trình bày trước đó trong paper [Improving neural networks by preventing
co-adaptation of feature detectors](https://export.arxiv.org/pdf/1207.0580) của cùng nhóm tác giả. Về cơ bản kĩ thuật này giúp khắc phục hiện tượng co-adaptation - hiện tượng các neural bị phụ thuộc quá nhều vào các neuron khác trong mạng dẫn đến nếu như xuất hiện bad feature tại một neuron sẽ có thể ảnh hưởng đến nhiều neuron khác. Có thể hình dung vấn đề co-adaptation trong hình sau 

![](https://miro.medium.com/max/875/1*-teDpAIho_nzNShRswkfrQ.gif)

Theo đó việc áp dụng dropout một cách randomly trên mỗi iteration sẽ giúp giảm tác động của hiện tượng co-adaptation. 

### Data augmentation 
Trong paper này trình bày 2 kĩ thuật của **data augmentation** đó là:
* **Thứ nhất: translations and horizontal reflections**: Lấy ra ngẫu nhiên một vùng có kích thước `224x224` và hình ảnh được reflect của nó. Điều này giúp cho kích thước của tập dữ liệu tăng lên 2048 lần. 
Phép crop random sinh ra số lượng partern là $(256 - 224) * (225 - 224) = 1024$. Kết hợp với lật ảnh sinh ra số lượng partern là $1024 * 2 = 2048$
* **Thứ hai: altering the intensities of RGB channels:** Hay còn gọi là **PCA color augmentation** trong các nghiên cứu sau này. Bước thực hiện của nó như sau:
    * Thực hiện PCA cho toàn bộ pixels trong tập dữ liệu của Imagenet. Mỗi một pixel được mã hoá bằng 1 vector 3 chiều $(R, G, B)$. Kết quả chúng ta sẽ thu được một covariance matrix tương ứng với 3 trị riêng và 3 vector riêng. Sau đó với mỗi ảnh RGB $I_{xy} = [I^R_{xy}, I^G_{xy}, I^B_{xy}]^T$ sẽ được add thêm một đại lượng ngẫu nhiên như sau 

$$[p_1, p_2, p_3][\alpha_1 \lambda_1, \alpha_2 \lambda_2, \alpha_3 \lambda_3]^T$$

Trong đó các $\lambda_i$ và $p_i$ lần lượt là  trị riêng và vector riêng kể trên. và $\alpha_i$ là hệ số ngẫu nhiên tương ứng với mỗi channel. 

Kĩ thuật này giúp cho giảm test error rate khoảng $1%$ 

### Test time augmentation 

Mặc dù không được trình bày trực tiếp ở trong paper nhưng chính nhóm tác giả cũng đã thực hiện điều này trong quá trình test.  Trong quá trình test, tác giả đã cắt random 5 patch thuộc ảnh gốc (4 corner và 1 center) sau đó kết hợp với horizontal flips để tạo thành 10 ảnh khác nhau. sau đó kết quả cuối cùng sẽ là trung bình kết quả của 10 ảnh trên. Cách làm này gọi là **test time augmentation (TTA)** mà chúng ta rất thường thấy trong các cuộc thi Kaggle sau này. 


# Implementation 
 Với các thư viện hiện đại như ngày nay thì việc implement lại Alexnet là không khó. Ở đây mình sẽ sử dụng PyTorch. Với các framework khác các bạn hãy thử implement lại coi như bài tập nhé 
 
 ```python 
 import torch.nn as nn


class AlexNet(nn.Module):

    def __init__(self, num_classes=1000):
        super(AlexNet, self).__init__()
        
        self.features = nn.Sequential(
            nn.Conv2d(3, 96, kernel_size=11, stride=4, padding=0),
            nn.ReLU(inplace=True),
            nn.LocalResponseNorm(size=5, alpha=0.0001, beta=0.75),
            nn.MaxPool2d(kernel_size=3, stride=2),
            nn.Conv2d(96, 256, kernel_size=5, padding=2, groups=2),
            nn.ReLU(inplace=True),
            nn.LocalResponseNorm(size=5, alpha=0.0001, beta=0.75),
            nn.MaxPool2d(kernel_size=3, stride=2),
            nn.Conv2d(256, 384, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.Conv2d(384, 384, kernel_size=3, padding=1, groups=2),
            nn.ReLU(inplace=True),
            nn.Conv2d(384, 256, kernel_size=3, padding=1, groups=2),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=3, stride=2),
        )
        
        self.classifier = nn.Sequential(
            nn.Linear(256 * 6 * 6, 4096),
            nn.ReLU(inplace=True),
            nn.Dropout(),
            nn.Linear(4096, 4096),
            nn.ReLU(inplace=True),
            nn.Dropout(),
            nn.Linear(4096, num_classes),
        )

    def forward(self, x):
        x = self.features(x)
        x = x.view(x.size(0), 256 * 6 * 6)
        x = self.classifier(x)
        return x
 ```
 
 # Nhận xét 
 
 ## Điểm mạnh 
 * Việc phát minh ra **ReLU** xứng đáng được coi là một bước đột phá trong thiết kế mạng Deep Learning đặc biệt là CNN 
 * Việc áp dụng local response normalization and overlapped pooling cũng là một điểm mạnh dù cho **LRN** hiện tại đã dead-end để nhường chỗ cho **Batch Normalization** ra đời sau đó. 
 * Các kĩ thuật Data Augmentation cũng là một điểm mạnh của paper này và vẫn còn được sử dụng đến thời điểm hiện tại 
 * Sử dụng Dropout để tránh việc overfiting 

## Điểm yếu 
* Các chứng minh lý thuyết cho kĩ thuật sử dụng trong paper chưa rõ ràng. Các quyết định sử dụng đa phần dựa trên kết quả của cuộc thi ILSVRC-2012