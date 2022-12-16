### 1.  Giới thiệu jetson nano

Jetson Nano là 1 bo máy tính nhúng do hãng NVIDIA sản xuất. So với các loại máy tính nhúng khác thì cấu hình của Jetson khá mạnh. Một vài so sánh với Raspberry pi:


|  | Jetson Nano |Raspberry Pi 3| Raspberry Pi 4 |
| -------- | -------- |-------- |-------- |
| CPU    | Quad-core ARM® A57 CPU    |Quad-core ARM Cortex-A53, 1.2GHz. | Broadcom BCM2711, Quad core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz   |
| GPU | 128-core NVIDIA Maxwell GPU | Broadcom VideoCore IV.|Broadcom VideoCore VI.|
| RAM | 4 GB 64-bit LPDDR4 | RAM: 1GB LPDDR2 (900 MHz) | RAM – 1GB, 2GB or 4GB LPDDR4-2400 SDRAM (depending on model) |


 Như chúng ta thấy, điểm nhấn của chiếc máy tính nhúng này là được trang bị 128 core GPU của NVIDIA làm tăng sức mạnh tính toán của chiếc máy tính nhúng này lên rất nhiều. Ngoài ra với 4G RAM giúp nó có thể chạy thêm được nhiều task vụ hơn.
Tuy nhiên, do việc tối giản lại hệ điều hành nên việc cài đặt một số package cũng khó khăn hơn. Trong bài này, mình hướng dẫn các bạn cài đặt hệ điều hành cũng như một số package thường dùng trong nghiên cứu và ứng dụng machine learning, deep learning trên con Jetson Nano . Chúng ta bắt đầu thôi!

### 2.  Cài đặt hệ điều hành

Các bạn cần chuẩn bị:
* Board Jetson Nano
* Thẻ nhớ (tối thiểu 16G)
* Nguồn 5V-2A
* Đầu đọc thẻ nhớ micro
* Bàn phím, chuột, màn hình

Hiện tại, Nvidia cung cấp 1 image duy nhất để cài đặt hệ điều hành cho jetson nano. Các bạn tải theo linh này: https://developer.nvidia.com/jetson-nano-sd-card-image-r3231 .
File có kích thước 12G nên quá trình tải khá lâu. Giải nén file dowload ta được file có đuôi .img . Tiếp theo, các bạn tải thêm phần mềm Etcher để ghi image vào thẻ nhớ. Phần mềm này hỗ trợ đa nền tảng, để download các bạn vào trang này https://www.balena.io/etcher/

Sau khi cài đặt Etcher, mở nên ta sẽ thấy giao diện thế này :
![](https://images.viblo.asia/4d39e604-7a3c-468a-b589-b31dd0b3d3bc.png)
Click vào Select image để chọn file đuôi .img vừa download ở trên
Tiếp theo, click vào Select drive để chọn phân vùng thẻ nhớ cần ghi.
Cuối cùng, click vào Flask để tiến hành ghi. Quá trình trình mất khoảng 15 phút.

![](https://images.viblo.asia/b2502862-e275-411f-8f2f-0e783f1a5b89.png)

Sau khi quá trình Flask kết thúc, các bạn reject thẻ nhớ khỏi máy tính và insert vào khe thẻ nhớ trên Jetson Nano. Các bạn kết nguồn, bàn phím, chuột và màn hình để tiến hành cài đặt cho lần boot đầu tiên. Khi hoàn thành các bạn sẽ thấy giao diện như sau

![](https://images.viblo.asia/aa572a11-ceae-428f-83a6-98f417f3585a.png)

### 3.  Cài  đặt một số package cho machine learning
Trước tiên, mình tiến hành cài đặt một số package cơ bản:
```
sudo apt-get update
sudo apt-get install libhdf5-serial-dev hdf5-tools libhdf5-dev zlib1g-dev zip libjpeg8-dev
sudo apt-get install python3-pip
sudo pip3 install -U pip testresources setuptools
```
Tiếp theo, cài đặt virtualenv để quản lý các môi trường khác nhau:
```
sudo apt-get install virtualenv
```
Tạo một môi trường với python3:
```
python3 -m virtualenv -p python3 env
```
Activate env
```
source env/bin/activate
```
Cài đặt một số package cho tensorflow:
```
pip3 install -U numpy grpcio absl-py py-cpuinfo psutil portpicker six mock requests gast h5py astor termcolor protobuf keras-applications keras-preprocessing wrapt google-pasta setuptools testresources
```
Cài đặt tensorflow, ở đây, mình dùng phiên bản 1.14
```
pip3 install --extra-index-url
pip3 install --pre --extra-index-url https://developer.download.nvidia.com/compute/redist/jp/v42 tensorflow-gpu==1.14.0+nv19.7
```
Cài đặt keras api:
Để cài đặt keras trên Jetson Nano thành công, bạn cần cài đặt tensorflow theo hướng dẫn ở trên trước. Tiếp theo, cài đặt scipy
```
pip3 install scipy
```
Thời gian cài đặt scipy khoảng từ 40-45 phút, sau khi cài scipy thành công, giờ bạn cài keras api:
```
pip3 install keras
```
Cài đặt pytorch 1.3.0:
```
wget https://nvidia.box.com/shared/static/phqe92v26cbhqjohwtvxorrwnmrnfx1o.whl -O torch-1.3.0-cp36-cp36m-linux_aarch64.whl
pip3 install numpy torch-1.3.0-cp36-cp36m-linux_aarch64.whl
```
Vậy là chúng ta đã có môi trường bao gồm tensorflow 1.14, keras api, pytorch 1.3.0 và nhiều package để nghiên cứu và ứng dụng Jetson Nano

### 4.  Test thử một số bài toán trên Jetson Nano
Để test, mình sẽ sử dụng repo xây dựng sẵn cho Jetson:
Trước tiên cài đặt cmake:
```
sudo apt-get update
sudo apt-get install git cmake
```
Tiếp theo, clone repo jetson-inference:
```
git clone https://github.com/dusty-nv/jetson-inference
cd jetson-inference
git submodule update --init
```
Cài đặt thêm các thư viện cần thiết và download các pre-train model:
```
cd jetson-inference
mkdir build
cd build
cmake ../
```
Khi đến phần download, các bạn sẽ thấy 1 giao diện chọn model tải về, dùng phím SPACE để chọn hoặc bỏ chọn:

![](https://images.viblo.asia/351599ae-3ed3-4ccf-bee6-998426ef732e.jpg)
Tiếp theo, giao diện chọn cài đặt pytorch xuất hiện, các bạn cũng dùng phím SPACE chọn hoặc bỏ chọn:

![](https://images.viblo.asia/7a299a75-a641-4ce0-a425-ce17bc75cb31.jpg)

Sau khi quá trình trên hoàn tất, ta tiến hành compile:
```
cd jetson-inference/build 
make
sudo make install
sudo ldconfig
```

OK, vậy là các project bạn vừa tải về đã sẵn sàng chạy
```
cd jetson-inference/build/aarch64/bin
ls
```

![](https://images.viblo.asia/ea6fc5e1-0c4b-4eef-9af4-d40d509b4d29.png)

Các bạn chọn 1 trong các ứng dụng trong list ở trên để test

Hình ảnh test object dection trên jetson nano
![](https://images.viblo.asia/d88199e9-5380-42fa-837d-a6b493338792.png)

Để thấy rõ hiệu năng của jetson nano các bạn có thể tham khảo thêm điểm banchmarks dưới đây:
![](https://images.viblo.asia/9e3d2d19-08ec-4056-a87d-60c1effa5e41.png)

### Tổng kết
Vậy là mình đã hướng dẫn xong các bạn cài đặt hệ điều hành, môi trường, và test chạy thử một số ứng dụng trên jetson nano. 

Cảm ơn các bạn đã đọc bài!