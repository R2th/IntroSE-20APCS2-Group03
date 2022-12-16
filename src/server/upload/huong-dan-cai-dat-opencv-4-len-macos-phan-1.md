Hôm nay mình sẽ hướng dẫn các bạn cài đặt OpenCV4 trên MacOS

**Bước 1: Cài đặt Xcode:**

Để cài đặt Xcode chỉ cần vào **Apple App Store** tìm ứng dụng Xcode và tiến hành cài đặt. 

Sau khi Xcode được cài đặt thì chúng ta cần chấp nhận những điều khoản. Mở Terminal và chạy lệnh sau:
```
$ sudo xcodebuild -license
```
Hãy chấp nhận những điều khoản, sau đó cài đặt Apple Command Line (việc này là bắt buộc), nên bạn có thể cài đặt tools bên dưới:
```
$ sudo xcode-select --install
```
![](https://images.viblo.asia/5855cbea-f7fa-40db-93e7-b1fb1b74a052.png)

Click vào install để cài đặt.

**Bước 2: Cài đặt Homebrew:**

Để cài đặt Homebrew bạn có thể dùng qua lệnh sau thông qua Terminal:
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Tiếp theo là cập nhật Homebrew:
```
$ brew update
```
Tiếp theo chỉnh sửa bash_profile bằng lệnh:
```
$ nano ~/.bash_profile
```
Đến đây ta sẽ vào chỉnh sửa file bash_profile. Thêm PATH sau vào cuối file:
```
# Homebrew
export PATH=/usr/local/bin:$PATH
```
Bấm Ctrl + X để thoát nano. Bạn sẽ nhận được cảnh báo có lưu file không. Hãy nhớ lưu lại. Sau đó chạy lệnh:
```
$ source ~/.bash_profile
```
**Bước 4: Cài đặt các điều kiện tiên quyết bằng Homebrew:**

**Cài đặt python 3.6:** 

Tại sao lại là python 3.6. Vì python 3.7 không hỗ trợ Keras mặc dù có hỗ trợ Tensorflow nhưng cũng không khuyến khích cài đặt python 3.7 vậy để tránh trường hợp dùng thư viện mà lại có lỗi không mong muốn nên cũng không phải là sự lựa chọn tốt cho OpenCV. Lệnh bên dưới là để cài python 3.6.5_1:
```
$ brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/f2a764ef944b1080be64bd88dca9a1d80130c558/Formula/python.rb
$ brew switch python 3.6.5_1
```
Sau đó xác nhận xem python đã được cài đặt chưa:
```
$ python3
```
Kết quả: 
```
Python 3.6.5
[GCC 4.2.1 Compatible Apple LLVM 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
```
Hãy xác nhận lận nữa:
```
$ which python3
/usr/local/bin/python3
```
nếu bạn thấy `/usr/local/bin/python3`nghĩa là bạn đang sử dụng Homebrew python (đó là điều chúng ta mong muốn) còn `/usr/bin/python3` nghĩa là bạn đang sử dụng python3 của hệ thống và bạn cần phải sửa lại trong file bash_profile của bạn và source nó.

Hãy dành chút thời gian cho việc kiểm tra xem bạn dùng python của Homebrew hay hệ thống.

**Hãy cài những điều kiện tiên quyết tiếp theo**

OpenCV yêu cầu một vài điều kiện trước khi được cài đặt. Bạn sẽ cài đặt những gói sau:

*  Công cụ được sử dụng để xây dựng và biên dịch
*  Thư viện được sử dụng cho các hoạt động I / O của hình ảnh
*  Thư viện tối ưu hóa
```
$ brew install cmake pkg-config
$ brew install jpeg libpng libtiff openexr
$ brew install eigen tbb
```
Cài đặt wget:
```
$ brew install wget
```
Phần tiếp theo sẽ hơi dài nên mình tách ra làm 2 phần.

Phần 2: https://viblo.asia/p/huong-dan-cai-dat-opencv-4-len-macos-phan-2-924lJqJ8ZPM

Nguồn: https://www.pyimagesearch.com/2018/08/17/install-opencv-4-on-macos/