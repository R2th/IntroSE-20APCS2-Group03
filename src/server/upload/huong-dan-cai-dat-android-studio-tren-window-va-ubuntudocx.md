## 1. Giới thiệu về Android Studio
Android Studio được phát triển dựa trên IntelliJ IDEA Community Edition – công cụ lập trình tốt nhất cho java. Bây giờ thì Tiếng Việt cũng đã được tích hợp trong Android Studio. Đặc biệt, Android Studio cho phép người dùng Import Project từ Eclipse sang và logic lập trình cũng tương tự. Hôm nay mình sẽ
[hướng dẫn cài đặt android studio](https://bit.ly/2nJcwWR) cho bạn

## 2. Hướng dẫn cài Android Studio cho Window
Để download bản mới nhất của Android Studio, bản truy cập vào [đây](https://developer.android.com/studio/)
click vào DOWNLOAD ANDROID STUDIO for Window như hình vẽ:

![](https://images.viblo.asia/64a1a601-cca6-423b-b3a6-afe086b9052c.png)
Sau đó check đã đọc và đồng ý với Terms and Conditions và click download để tải về.
Bước 1:
Vào thư mục chứa tập tin android studio bạn vừa download về, click vào android-studio-bundle-141.2456560-windows
![](https://images.viblo.asia/2fe3c037-1010-4ce4-a4ea-ed6eb673043f.png)

– Bước 2:
Màn hình chọn thành phần cài đặt. Ta chọn cấu hình cài đặt tất cả như trên rồi bấm Next.
![](https://images.viblo.asia/d0362dfd-fa7e-45fe-acf0-71c441d6fc83.png)

Android Virtual Device (AVD) là một thiết bị cấu hình, nó chạy với bộ giả lập Android (Android emulator). Nó làm việc với bộ giả lập để cung cấp một môi trường thiết bị ảo cụ thể, để cài đặt và chạy ứng dụng Android.
– Bước 4: Chọn nơi cài đặt Android Studio và Android SDK
– Bước 5: Chọn Start Menu Folder. Ở bước này, bạn có thể tích tạo short cut cho ứng dụng hoặc không
Bấm Install để bắt đầu cài đặt.
– Bước 6: Chờ hệ thống cài đặt các package cần thiết cho tới khi hoàn thành và bấm Next để tiếp tục
– Bước 7: Bấm Finish và click Start Android Studio để khởi động phần mềm
![](https://images.viblo.asia/d0362dfd-fa7e-45fe-acf0-71c441d6fc83.png)

3. Dành cho Ubuntu

Run trên Command Line:
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
sudo apt-get install oracle-java8-set-default

Tiếp tục:
1. Download Android Studio từ trang chủ.
2. Giải nén file .zip vừa tải và đẩy vào opt:
sudo unzip "filename" -d /opt
Ví dụ: sudo unzip android-studio-ide-141.2178183-linux.zip -d /opt

3. Truy cập vào thư mục bin của file vừa nén:

cd /opt/android-studio/bin

Và chạy file .sh:
./studio.sh

Sau khi chạy xong, thường sẽ xuất hiện lỗi không hiện Icon Android Studio trên task Menu.
Vậy đây là cách để fix lỗi đó.

Trên thank Task Menu: Tool => Create Desktop Entry => Tích vào "Create the entry  for all users" => OK
![](https://images.viblo.asia/eb9e46b2-8586-42bb-85d4-bd5e70399002.png)

Như vậy, chúng ta đã hoàn tất quá trình cài đặt Android Studio, bạn có thể tự tạo cho mình một project để lập trình android thay vì sử dụng Eclipse.