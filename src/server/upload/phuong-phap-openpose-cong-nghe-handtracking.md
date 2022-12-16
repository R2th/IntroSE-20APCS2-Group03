### 1. Giới thiệu
OpenPose là hệ thống đầu tiên sử dụng để phát hiện cơ thể con người, bàn tay và các điểm nhấn trên khuôn mặt (trong tổng số 130 điểm chính) trên các hình ảnh đơn lẻ.
![](https://images.viblo.asia/2c6a1b55-3028-4348-aa7b-63ef5b0d2983.jpg)
##### Hình 1.1: Openpos theo dõi chuyển động của cơ thể người
    
Các phiên bản:

Tháng 3 năm 2018: Phiên bản CPU (Phiên bản mới nhất tính đến thời điểm tháng 5 năm 2018).

Tháng 3 năm 2018: Cải thiện mô đun tái thiết điểm 3-D (từ nhiều chế độ xem máy ảnh).

Tháng 9 năm 2017: Trình cài đặt CMake và hỗ trợ camera IP.

Tháng 7 năm 2017: Bản demo.

Tháng 7 năm 2017: Ra mắt phiên bản đầu tiên.



### 2. Cài đặt
#### 2.1 Hệ điều hành hỗ trợ
- Ubuntu: 14 và 16
- Win: 8 và 10
- OpenPose cũng đã được sử dụng trên các hệ thống Windows 7, Mac, CentOS và Nvidia Jetson (TK1 và TX1). Tuy nhiên, các hệ điều hành này không được chính thức hỗ trợ vào thời điểm hiện tại.

#### 2.2 Điều kiện tiên quyết:
- Yêu cầu với cấu hình mặc định: 
+ Phiên bản của GPU Nvidia: 

Card đồ họa NVIDIA có ít nhất 1.6 GB (lệnh nvidia-smi kiểm tra bộ nhớ GPU sẵn có trong Ubuntu).
Ít nhất 2GB RAM bộ nhớ miễn phí.

Khuyến khích sử dụng cuDNN.
- CPU: 8GB RAM bộ nhớ.
- Sẽ rất tốt nếu CPU có nhiều hơn 8 lõi.

#### 2.3 Clone Openpose

- Windows: Download tại link https://desktop.github.com 
- Ubuntu: Sử dụng lệnh: “ git clone https://github.com/CMU-Perceptual-Computing-Lab/openpose” Trong cửa sổ Treminal.

#### 2.4 Update Openpose
- Tải xuống các thay đổi mới nhất:

Windows: Nhấp vào nút đồng bộ hóa ở phần trên cùng bên phải trong GitHub Desktop trong Windows.

Ubuntu: Sử dụng lệnh “git pull origin master” Trong cửa sổ terminal.

#### 2.5 Cài đặt Openpose
- Tải xuống và cài đặt Cmake GUI:

Ubuntu: Chạy lệnh “sudo apt-get install cmake-qt-gui” trong cửa sổ terminal.

Windows: tải xuống và cài đặt trình cài đặt CMake win64-x64 msi mới nhất từ trang https://cmake.org/download/ . Phiên bản hiện tại là cmake-X.X.X-win64-x64.msi.

- Các điều kiện tiên quyết về GPU của Nvidia.

CUDA 8: 

Ubuntu: Chạy lênh “sudo ubuntu/install_cuda.sh” Trong cửa sổ terminal hoặc tải và cài đặt trực tiếp trong trang https://developer.nvidia.com/cuda-80-ga2-download-archive 

Windows: Cài đặt CUDA 8.0 sau khi Visual Studio 2015 được cài đặt để đảm bảo rằng bản cài đặt CUDA sẽ tạo tất cả các tệp cần thiết cho VS. Nếu CUDA đã được cài đặt, hãy cài đặt lại CUDA sau khi cài đặt VS.

CuDNN 5.1:
Ubuntu: Chạy lênh “sudo ubuntu/install_cudnn.sh” Trong cửa sổ terminal hoặc tải và cài đặt trên trang https://developer.nvidia.com/cudnn .

Windows(Ubuntu nếu muốn cài đặt thủ công): Để cài đặt thủ công, chỉ cần giải nén và sao chép (hợp nhất) nội dung trên thư mục CUDA, thường là / usr / local / cuda / trong Ubuntu và C: \ Program Files \ NVIDIA GPU Computing Bộ công cụ \ CUDA \ v8.0 trong Windows.

#### 2.6 Các điều kiện khác trong
Ubuntu

- Điều kiện tiên quyết của Caffe: Theo mặc định, OpenPose sử dụng Caffe. Nếu bạn chưa sử dụng Caffe trước đó, hãy cài đặt các phụ thuộc của nó bằng cách chạy “sudo bash ./ubuntu/install_cmake.sh” trong cửa sổ terminal.

- OpenCV phải được cài đặt trên máy của bạn. Nó có thể được cài đặt với “apt-get install libopencv-dev”. Bạn cũng có thể sử dụng phiên bản OpenCV đã biên dịch của riêng bạn.

	Windows
    
	- Nếu cộng đồng mong muốn Visual Studio 2017. Openpose không chính thức hỗ trợ nó, nhưng nó có thể được biên soạn bằng cách cho phép CUDA 8.0 đầu tiên trong VS2017 hoặc sử dụng VS2017 với CUDA 9 bằng cách kiểm tra tệp .vcxproj và thay đổi các đường dẫn cần thiết từ CUDA 8 đến 9.
	- 
#### 2.7 OpenPose building
- Nếu chỉ định sử dụng bản demo OpenPose, có thể bỏ qua bước này. Bước này chỉ được khuyến nghị nếu dự định sử dụng API OpenPose từ các dự án khác.

- Ubuntu: chạy lần lượt các lệnh “mkdir build”,  “cd build/” và “sudo make install” trong cửa sổ terminal.

- Tiếp theo chạy lệnh “cmake ..” và lệnh “make -j” trong cửa sổ terminal.


#### 2.8 Run OpenPose

Kiểm tra Openpose đã được cài đặt đúng cách, hãy thử chạy Openpose với hình ảnh, video, webcam,.. theo hướng dẫn 
https://github.com/CMU-Perceptual-Computing Lab/openpose/blob/master/doc/quick_start.md#quick-start

### 3. Họat động
- Openpose hoạt động dựa trên việc phát hiện các điểm được lưu lại trên cơ thể, trên khuôn mặt và bàn tay. Các điểm này sẽ được kết nối lại thành bộ khung chuyển động theo chuyển động của cơ thể.

* Các điểm được lưu lại trong Openpose

- Cơ thể người: 18 điểm trên cơ thể người được Openpose đánh dấu và nhận diện. Các điểm này đại diện cho các khớp xương trên cơ thể và các điểm này có thể định hướng khuôn mặt của người được nhận diện.

![](https://images.viblo.asia/ba508478-31d2-4818-806c-33a597741fe0.png)
#### Hình 3.1: 18 điểm trên cơ thể được Openpose lưu lại

- Bàn tay: 21 điểm trên bàn tay được Openpose lưu lại và sử dụng để nhận diện chuyển động của bàn tay. Các điểm này đại diện cho các khớp xương của bàn tay.

![](https://images.viblo.asia/a2cc4bc0-8650-4e2b-ad1e-7aaa99673a6d.png)
#### Hình 3.2: 21 điểm được Openpose sử dụng để nhận dạng bàn tay

- Khuôn mặt: 68 điểm được openpose lưu trữ và sử dụng để nhận chuyển động khuôn mặt.

![](https://images.viblo.asia/d2b1e813-24d0-4e0a-86c7-414b752bd4ef.png)
#### Hình 3.3: 68 điểm Openpose sử dụng để nhận diện chuyển động khuôn mặt

### 4. Ưu - Nhược điểm
Ưu điểm:

Openpose theo dõi và mô phỏng bàn tay là tốt khi chất lượng hình ảnh rõ nét.

Openpose có thể nhận biết được bàn tay nắm lại nếu hình ảnh có chất lượng tương đối rõ.

![](https://images.viblo.asia/7be1d3e5-3bd1-4f64-aa81-c080ff3c0d44.png)
#### Hình 4.1: Openpose nhận biết và mô phỏng tay tốt

Nhược điểm:

- Khi chất lượng ảnh thấp, Openpose phát hiện bàn tay kém hiệu quả. Trong một số trường hợp, Openpose cho kết quả thấp với những hình ảnh có chất lượng rõ nét.

![](https://images.viblo.asia/92291867-6287-4e88-b1fe-9fec46219f9d.png)
#### Hình 4.2: Openpose nhận diện không chính xác các điểm trên bàn tay với chất lượng hình ảnh thấp

- Openpose chỉ có thể phát hiện và mô phỏng mô hình bàn tay trong hỉnh video có sự xuất hiện của cơ thể con người cùng với bàn tay.