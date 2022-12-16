## Phần I . Vấn đề thực tế

Làm việc với các mô hình **Deep Learning,AI** trong các bài toán phức tạp yêu cầu cao về khả năng xử lí,bộ nhớ,... chưa bao giờ là một điều dễ chịu với chúng ta. Các nhiệm vụ training model nằm trong những vấn đề quen thuộc như **phân loại ảnh (Image Classification)**, **Blending Models (ứng dụng GANs model)**, **phân vùng ảnh(Image Segmentation)** luôn gặp phải vấn đề về tốc độ đào tạo chậm (rất chậm nếu không có hỗ trợ phần cứng chuyên dụng), thậm chí khi load hay thực thi các kiến trúc đặc trưng được hỗ trợ sẵn của các framework DL đi trước ta vẫn cảm thấy độ "ì" nhất định. Nguyên nhân có thể bắt nguồn thứ nhất từ chính phần lõi chưa được tối ưu của kiến trúc đó, và khách quan mà nói bởi ngôn ngữ Python-được ưa chuộng sử dụng rộng rãi trong lĩnh vực này là một ***Interpreted language*** (Javascript,PHP,...), được tạo ra để có thể thực thi ngay các dòng lệnh riêng rẽ mà không cần cấu trúc thành một chương trình hoàn chỉnh như các ***Compile language*** (C,C++). Ưu điểm của loại thứ nhất so với loại thứ hai chúng ta có thể thấy rõ qua sử dụng, tuy nhiên nhược điểm lớn nhất của Python là *tốc độ tính toán và thực thi* lại khó thấy trong các bài toán đơn giản,kích thước nhỏ nhưng là cả vấn đề "tổ bố" khi xét trong câu chuyện của Deep Learning và AI. Hãy nói tiếp về nhược điểm này của Python ở phần dưới,còn bây giờ quay lại với nhân tố đầu tiên được nêu - các DL Framework.

![image.png](https://images.viblo.asia/98a17ed8-913b-4a24-af8e-33da857dcdf7.png)

>Ex: Thời gian và phần cứng cho việc training styleGAN models tại NVIDIA labs,những con số thực sự kinh dị 

Theo thời gian các framework nổi tiếng hiện tại như *PyTorch,Tensorflow,Caffe,Theano* sẽ ngày càng được tối ưu hóa về tốc độ và khả năng tính toán,kèm theo đó là rất nhiều framework kém tên tuổi khác (nhưng chưa chắc thua về hiệu năng với cùng lớp yêu cầu) vẫn được trình làng đều đặn. Hôm nay tôi sẽ giới thiệu qua về **Jittor** ,một kẻ mới nổi trong hàng ngũ framework hỗ trợ xây dựng các mô hình DL,AI. Nó sẽ khắc phục vấn đề cố hữu về tốc độ tính toán của các đàn anh đàn chị,qua đó cải thiện đáng kể hiệu năng cho các máy tính CPU và GPU.

## Phần II. Khám phá Jittor framework

![image.png](https://images.viblo.asia/75cd31ad-f86a-4a59-944f-e679f3ae99fa.png)

Cái tên nói lên tất cả! **Jittor** - **"Just in time"** framework là một "**DeepLearning framework hiệu năng cao dựa trên việc biên dịch JIT và các đa toán tử (meta-operators)**".
Nói ngắn gọn,Jittor được tích hợp một bộ compiler và hiệu chỉnh gần giống như compiler của ngôn ngữ C-điều giúp nó có tốc độ tốt hơn nhiều so với Python, nó cho phép các lệnh trong kiến trúc Jittor có hiệu suất cao so với các framework  khác. Jittor cũng chứa vô số thư viện mô hình hiệu suất cao, bao gồm: image recognition, detection, segmentation, generation, differentiable rendering, geometric learning, reinforcement learning,  v.v... Ngôn ngữ front-end là Python. Module Design và hỗ trợ đồ thị động được sử dụng trong giao diện người dùng tương tự các thiết kế phổ biến nhất cho giao diện DeepLearning framework, bạn sẽ không thấy xa lạ khi làm việc với Jittor bởi kết cấu cú pháp và thành phần gần giống Torch hay Keras.Phần back-end được thực hiện bởi ngôn ngữ hiệu năng cao chẳng hạn như CUDA, C.

### Cài đặt và sử dụng:

Jittor hiện hỗ trợ các os phổ biến như Linux(e.g. Ubuntu/CentOS/Arch), macOS, Windows. Với mỗi os sẽ có các yêu cầu hệ thống,yêu cầu compiler khác nhau và đều được hướng dẫn rất rõ ràng trên github chính thức của jittor. Nhìn chung phiên bản Python yêu cầu tối thiểu là 3.7 với Linux/macOS và 3.8 với Windows. Bạn có đến 3 phương án cài đặt jittor. Nếu không muốn phải cấu hình môi trường,hãy chọn Docker install để được cài đặt có cấu hình sẵn (recommended). Nếu muốn cài đặt ngay trong dòng lệnh hoặc terminal,chọn cài đặt với pip cũng khá đơn giản:

```
pip install jittor
```
Hoặc bạn có thể cài đặt thủ công,tuy nhiên cách này chỉ hỗ trợ Linux:

B1. Chọn back-end compiler:

```
# g++
sudo apt install g++ build-essential libomp-dev

# OR clang++-8
wget -O - https://raw.githubusercontent.com/Jittor/jittor/master/script/install_llvm.sh > /tmp/llvm.sh
bash /tmp/llvm.sh 8
```
B2. Cài Python và python-dev (bỏ qua nếu có sẵn):
```
sudo apt install python3.7 python3.7-dev
```
B3. Chạy thử Jittor 
```
git clone https://github.com/Jittor/jittor.git
sudo pip3.7 install ./jittor
export cc_path="clang++-8"
# if other compiler is used, change cc_path
# export cc_path="g++"
# export cc_path="icc"

# run a simple test
python3.7 -m jittor.test.test_example
```
Nếu jittor pass phần test thì cài đặt đã thành công!

Bây giờ hãy sử dụng Jittor để xây dựng 1 model CNN cơ bản nhất nhằm phân loại hình ảnh. Bộ dữ liệu tôi dùng ở đây là CIFAR-10, gồm 60,000 hình ảnh chia đều vào 10 class như ship,plane,frog,...(bạn đọc quan tâm có thể xem bộ dataset này ở link cuối bài) với 50000 hình ảnh để train, 10000 còn lại để test. Bên cạnh đó tôi cũng dựng 1 model CNN tương tự bằng PyTorch-framework vốn nổi tiếng về tốc độ và khả năng hỗ trợ tốt.

* Đầu tiên hãy import Jittor và các thành phần,function cần thiết
```
import jittor as jt
import numpy as np
from jittor import nn, Module, init
```
Có lẽ vì là lần đầu tiên import Jittor nên cảm thấy có vẻ hơi lâu,nhưng ở các lần sau thì khá nhanh. Và bước này chưa liên quan đến mục đích chính của chúng ta nên không cần để tâm lắm.

* Định nghĩa kiến trúc CNN đơn giản với tham số như sau
```
class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 6, 5)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(6, 16, 5)
        self.fc1 = nn.Linear(16 * 5 * 5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        x = self.pool(nn.relu(self.conv1(x)))
        x = self.pool(nn.relu(self.conv2(x)))
        x = nn.flatten(x, 1) # flatten all dimensions except batch
        x = nn.relu(self.fc1(x))
        x = nn.relu(self.fc2(x))
        x = self.fc3(x)
        return x


net = Net()
```
Có thể thấy cấu trúc xây dựng bởi Jittor hoàn toàn quen thuộc với ai đã làm việc với PyTorch hay Keras, thậm chí có phần gọn và dễ nhớ hơn vì các layer,function,method của trong Jittor có thể lấy trực tiếp từ module nn (neural network),trong khi với mô hình PyTorch tương tự tôi phải khai báo thêm "torch.nn.functional" để lấy hàm ReLu chẳng hạn.

* Khởi tạo các tham số,truyền dữ liệu vào mô hình và chạy training
Bước này tôi không đề cập đến phần code vì mục đích cuối của chúng ta là so sánh hiệu năng của 2 kiến trúc build bởi Jittor và PyTorch. Cơ bản là tôi đã chia tập ảnh thành các batch,chạy training qua chúng đến một ngưỡng chấp nhận được về loss score (ta không cần kết quả thật chính xác). Loss function ở đây là trung bình tổng bình phương lỗi (Mean-square error), hiệu thành phần là hiệu giữa giá trị dự đoán và giá trị ground truth. Kết quả như thế nào,chạy mất bao nhiêu epoch không quan trọng,quan trọng là tôi rút ra được kết quả: Jittor hoàn thành nhiệm vụ với thời gian nhanh gấp 5 lần PyTorch!

![image.png](https://images.viblo.asia/6abac901-3a56-42e4-a7fb-74ab1aa2046b.png)

```
>Thời gian training với PyTorch
```

![image.png](https://images.viblo.asia/636a1d8d-d069-4c6b-913b-d5132578bfae.png)
```
>Và Jittor nhanh hơn 5 lần!
```
Các nhà phát triển cũng đã tiến hành so sánh bài bản để chứng minh tốc độ đáng nể của Jittor, với các model hiện đại như ResNet,AlexNet hay VGG thậm chí Jittor thể hiện ưu thế của mình càng ưu việt hơn.

![image.png](https://images.viblo.asia/a6a93f16-e186-413d-9279-32be2ea6db0c.png)

![image.png](https://images.viblo.asia/807826a5-d34d-486b-8243-38e519d4f4f8.png)
            
  ![image.png](https://images.viblo.asia/e940eff1-bad0-46cb-b07e-4e925d8d1d88.png)
```
Chỉ số MSE thấp hơn nhiều (hội tụ tốt hơn) khi so sánh trong cùng thời gian
```
*Một số lưu ý nhỏ*: 
* Dù kiến trúc tổng quát là không khác nhau,nhưng một số đối tượng về số học,tensor và method trong Jittor có cách gọi và sử dụng khác với Tensorflow hay PyTorch, kể như PyTorch có  torch.utils.data.DataLoader để tạo pipeline nhưng trong Jittor lại không load trực tiếp được kiểu đối tượng này;  PyTorch có torch.tensor nhưng không có hỗ trợ kiểu float32 (phải dùng numpy) trong khi 
Jittor có thể dùng jt.float32(x) ; Jittor cũng hỗ trợ tránh memory leak bằng method stop_grad() nhưng với torch thì phức tạp hơn, liên quan đến thuộc tính requires_grad=true/false. 

* Bài viết này chỉ ở mức độ introduction, còn lại documentation của Jittor sẽ giải đáp các thắc mắc của bạn.

## Tổng kết.
Hi vọng qua bài viết này bạn đọc có thêm sự lựa chọn trong việc sử dụng framework để tận dụng sức mạnh có sẵn của những "người khổng lồ" cho mục đích làm việc và học tập với DeepLearning.
Mong rằng sẽ nhận được sự ủng hộ bất kể hình thức của các bạn để tôi có thêm động lực ra bài đều đặn cho series này. Thanks for reading ! 😄

## **Reference**: 

https://github.com/Jittor/jittor

https://min.news/en/tech/7927c711a9c9d2b4403cc763921e45bf.html

https://www.cs.toronto.edu/~kriz/cifar.html