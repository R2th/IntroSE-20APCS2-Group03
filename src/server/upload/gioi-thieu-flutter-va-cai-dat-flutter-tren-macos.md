##  Flutter ?
Flutter, một Framework do gã khổng lồ Google phát triển cho phép các lập trình viên xây dựng ứng dụng đa nền tảng, chạy cả trên ios và android, nói về việc xây dựng ứng dụng đa nền tảng có 1 thằng đi trước là React Native so với thằng React Native với thằng Flutter thằng Flutter build và chạy nhanh hơn thằng React Native, code có phần quản lý state và viết giao diện phức tạp hơn. Thằng này viết bằng ngôn ngữ lập trình Dart thằng này cũng có nhiều concepts và syntax như các ngôn ngữ lập trình khác, như Java và C++ hay Swift, và nó gần gũi hơn với JavaScript.
## Install Flutter
Get the Flutter SDK https://flutter.dev/docs/development/tools/sdk/releases?tab=macos chọn bản releases mới nhất ở đây là v1.2.1
`Unzip file flutter_macos_v1.2.1-stable.zip` vừa tải về 

![](https://images.viblo.asia/b392fa57-bd43-4890-a9e8-dbcad03cbbf3.png)

Kiểm tra biến môi trường:  `echo $PATH`

Kiểm tra thư mục hiện tại:  'pwd'

Thêm 1 PATH mới:  export PATH="$PATH:'pwd'/flutter/bin"

Để chuẩn bị chạy và kiểm tra ứng dụng Flutter của bạn trên simulator iOS,  tìm simulator qua Spotlight hoặc bằng cách sử dụng lệnh sau:

Set up the iOS simulator: `open -a Simulator`
## Deploy to iOS devices
Run flutter doctor: `flutter doctor` để flutter tự động kiểm tra các gói cài đặt trên máy bạn đã phù hợp và đã đầy đủ hay chưa?

![](https://images.viblo.asia/ae6bc4c6-67db-4b76-989e-df68ee1242fe.png)

Ở đây mình bỏ qua Android toolchain ko dùng  mình để ý thằng iOS toolchain 
Install homebrew :  https://brew.sh/ thằng này quản lý package của macOS Homebrew giúp cài thêm các phần mềm, thư viện có trong Linux, Unix nhưng lại không sẵn cài trong MacOSX.
chưa kể sẽ phải cấu hình môi trường thì phần mềm mới có thể chạy được. Homebrew được viết bằng Ruby ngôn ngữ kịch bản, được bổ xung thêm nhiều lệnh để đơn giản tối đa việc cấu hình, biên dịch, cài đặt, thiết lập môi trường cho một ứng dụng chạy trơn chu.
Cài rồi thì update mới nhất: `brew update`
```
brew install --HEAD usbmuxd
 brew link usbmuxd
 brew install --HEAD libimobiledevice
 brew install ideviceinstaller ios-deploy cocoapods
 pod setup
```
Cài hết đống này tầm 20 phút xong bạn chạy lại lệnh ` flutter doctor` để kiểm tra xem đã ok chưa 

![](https://images.viblo.asia/b5587227-909d-4268-bdc3-ef5453162ac6.png)

## Create and run a simple Flutter app
` flutter create my_app` lưu ý chỉ dùng các kí tự trong `[a-z0-9_]`

![](https://images.viblo.asia/422d8bed-c419-4186-8ca4-11fa7d52ca33.png)

Làm theo hướng dẫn :
`  $ cd flutter_sun

  $ flutter run`
  
  ![](https://images.viblo.asia/d6d3a1e6-4882-49a5-a595-02ae61a38fff.png)
  
  Ở đây có 2  chọn device và chọn account development 
  Tiếp theo `open ios/Runner.xcworkspace`
  
  ![](https://images.viblo.asia/55ba382a-005e-4311-a425-a6d65a455ad1.png)
##   Kết quả 
  
![](https://images.viblo.asia/46a343ac-9e64-436a-98ce-9dbffdf61e34.PNG)