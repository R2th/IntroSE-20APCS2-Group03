## Giới thiệu cơ bản
### 1. Tổng quan
Trước khi đi vào học pytorch , ta phải hiểu pytorch là gì, tính ứng dụng nó ra sao? Thì mình nói ngắn gọn : Pytorch là 1 thư viện Python mã nguồn mở 
dành cho deep learning được phát triển và nghiên cứu bởi Facebook. Hiện nay do tính linh hoạt, cơ động, dễ sử dụng của Pytorch nên nó được sử dụng rất phổ biến như tensorflow và keras. Bất kì một kỹ sư lập trình viên AI nào cũng phải biết qua. Giới thiệu sơ thôi, chúng ta đi vào phần chính đã 😍😋<br>

### 2. Hướng dẫn cài đặt
Trước khi cài đặt Pytorch, hãy đảm bảo các bạn đã cài Python. Nên cài đặt thêm [Anaconda](https://www.anaconda.com/products/individual) để dễ sử dụng. Có nhiều cách cài đặt pytorch mà mình khuyên các bạn nên vô trang chủ [pytorch dowload ](https://pytorch.org/get-started/locally/) tùy chọn cấu hình phù hợp với máy của bạn rồi dowload về để tránh xảy ra lỗi.<br>
![](https://images.viblo.asia/a6d163ff-0cea-421b-be9e-5a4746dbb334.png)

## Neural Networks
Deeplearning dựa trên mạng neural nhân tạo đã xuất hiện ở 1 số hình thức từ cuối năm 1950. Các mạng được xây dựng từ các phần riêng lẻ xấp xỉ với nơ-ron thần kinh giống con người, thường được gọi là đơn vị hoặc đơn giản là 'nơ-ron'. Mỗi đơn vị có một số đầu vào trọng số. Các đầu vào có trọng số này được tổng hợp lại với nhau ( một sự kết hợp tuyến tính) sau đó được chuyển qua hàm kích hoạt activation để có được đầu ra của đơn vị.<br>
![](https://images.viblo.asia/576b2892-1754-499d-8a13-10fdb6db56cc.png)<br>
Thuật toán như hình dưới đây:<br>
![](https://images.viblo.asia/61f2fa0c-fe42-430d-9397-f749fcbc2a08.png)
<br>
## Tensors
Ta đã biết tensorflow và keras thường dùng kiểu dữ liệu **numpy**. Pytorch thì khác , nó sử dụng kiểu dữ liệu **Tensor**, về cơ bản thì 2 kiểu dữ liệu này tương tự và có thể chuyển đổi qua lại cho nhau, nhưng **Tensor** nó có thể thực hiện đơn giản trên GPU giúp cho tiến trình huấn luyện mô hình nhanh hơn. Nó cũng cung cấp cho mô hình khả năng tự động tính toán backpropagation trong việc xây dựng mạng neural network. Tóm lại thì Pytorch có kết cục chặt chẽ hơn so với Numpy/Scipy, so với Tensorflow và các frameworks khác. Vậy chúng ta hãy xem Tensor là gì ?<br>
![](https://images.viblo.asia/26578eca-c1d5-4890-9958-f0d04589df4b.png)
Hiểu một cách đơn giản thì 1 vector đó cũng là 1 tensor 1 chiều, 1 ma trận cũng là 1 tensor 2 chiều, 1 array 3 indices cũng là tensor 3 chiều (bức ảnh màu RGB cũng là 1 ví dụ).<br>
Ví dụ kiểu dữ liệu tensor:<br>
```
# First, import PyTorch
import torch
### Generate some data
torch.manual_seed(7) # Set the random seed so things are predictable
# Features are 5 random normal variables
features = torch.randn((1, 5))
# create argument a is Tensor([1,2])
a = torch.Tensor([1,2])
```
Bạn cũng có thể chuyển đổi từ kiểu dữ liệu Tensor sang mảng Numpy bằng hàm *.numpy()* và ngược lại chuyển từ kiểu numpy sang Tensor bằng hàm *torch.from_numpy()* như hình dưới: <br>
![](https://images.viblo.asia/cd883af8-bea1-4874-af83-455f484ece77.png)
## Exercise
Các bạn có thể tải 8 bài tập từ [link ](https://github.com/trungtruc123/Pytorch/tree/master/intro-to-pytorch) để làm. Bài tập gồm 2 phần exercises và solutions. Làm exercise xong mới quay lại xem đáp án nhé 😂.
Chúc các bạn thành công!