![](https://i.imgur.com/BOPaQQ5.png)
Để tìm hiểu về Flutter tôi xin phép đi theo mạch câu hỏi dưới đây để bạn có thể dễ dàng hình dung ra Flutter như thế nào.
# 1. Flutter là gì ?
Flutter là mobile app SDK của Google để tạo ứng dụng có trải nghiệm và chất lượng tốt nhất trên iOS và Android. Flutter được phát triển bởi các developers và các tổ chức trên khắp thế giới. Flutter là mã nguồn mở và miễn phí.

# 2. Flutter làm gì ?
- Đối với người dùng, Flutter giúp giao diện ứng dụng trở nên sống động hơn.
- ĐỐi với nhà phát triển, Flutter giảm thời gian build app. Quan trọng hơn, Flutter giúp tăng tốc độ phát triển ứng dụng, giảm chi phí và nhân lực do với 1 projects có thể chạy trên 2 nền tảng iOS và Android.
- Đối với designer, Fultter cung cấp thay đổi design nhanh chóng

# 3. Flutter sử dụng ngôn ngữ gì ?
![](https://i.imgur.com/jS6ytuJ.png)


Flutter sử dụng ngôn ngữ DART.

Dart là ngôn ngữ lập trình đa mục đích, được phát triển bởi Google. Dart có thể sử dụng cho lập trình Web, Server, Mobile app và các thiết bị IoT.


Ngôn ngữ Dart chịu nhiều ảnh hưởng bởi các ngôn ngữ khác, nhưng ngôn ngữ ảnh hưởng lớn nhất đối với Dart là JAVA. Điều này là 1 lợi thế cho bạn nào đã biết về JAVA thì học ngôn ngữ Dart rất nhanh và khi code Dart sẽ thấy có khá nhiều điểm tương đồng với JAVA.


Do ảnh hưởng bởi JAVA nên ngôn ngữ Dart là ngôn ngữ lập trình hướng đối tượng (OOP); và tất nhiên sẽ có các tính chất như: đóng gói, đa hình, trừu tượng và kế thừa.

# 4. Điều gì khiến Flutter độc nhất ?
Flutter không sử dụng Webview và OEM widget để hiển thị. Thay vào đó, Flutter sử dụng engine render riêng để vẽ các widget với độ tối ưu cao.

Thêm 1 điểm cộng nữa là, Flutter chỉ có 1 lớp mã code C/C++ nhưng hầu hết các thành phần systems lại được viết bằng Dart nên Devloper dễ dàng đoc và sửa đổi chúng. Điều này giúp developer có thể truy cập nhiều hơn trong system.

![](https://i.imgur.com/w7h6dUZ.png)

# 5. Editor và IDE nào có thể làm việc với Flutter ?
Google đã cung cấp Plugins cho:
- [Android Studio](https://developer.android.com/studio/)

![](https://i.imgur.com/QmYzvXS.jpg)

- [IntelliJ IDEA](https://www.jetbrains.com/idea/)

![](https://i.imgur.com/HKVtgh6.png)

- [VS Code](https://code.visualstudio.com/)

![](https://i.imgur.com/TgpeFxx.png)

Vậy nên bạn có thể chọn 1 trong 3 cái trên mà bạn cảm thấy quen thuộc nhất để viết ứng dụng của mình.

# 6. Hướng dẫn cài đặt và chạy demo
Trong bài viết này tôi sẽ hướng dẫn các bạn cài đặt Flutter trên Ubuntu. Tại sao là Ubuntu ? Vì tối thấy chạy FLutter (hay React native) trên Ubuntu và MacOS là ổn định nhất.

Yêu cầu trước khi cài Flutter phải có:

- `bash`, `mkdir`, `rm`, `git`, `curl`, `unzip`, `which` đã được cài sẵn
- Linux 64 bit

## a) Cài Android Studio
Bạn vào trang [Android Studio](https://developer.android.com/studio/) và tải Android Studio về để cài đặt. Tôi khuyến khích bạn cài bản Android Studio mới nhất hiện nay là version 3.2

Sau đó bạn làm theo các bước sau:

![](https://i.imgur.com/Dk2jZrw.png)

![](https://i.imgur.com/jkSq5xH.png)

![](https://i.imgur.com/9C5qwQU.png)

Tại đây bạn sẽ gõ `Flutter` để tìm plugin cài đặt cho Android Studio và đồng thời cũng sẽ cài đặt kèm theo `Dart` với Plugin `Flutter`

Kết quả sẽ được như sau:

![](https://i.imgur.com/pEnB9zG.png)

## b) Cài đặt Flutter

Bạn có thể tải Flutter SDK theo 2 cách sau đây:
#### (1) Tải Flutter
- Cách thứ 1: Tải trên trang [github của Flutter](https://github.com/flutter/flutter)
Bạn mở terminal của Ubuntu và gõ lệnh

`git clone https://github.com/flutter/flutter.git`
để kéo mã nguồn Flutter về

- Cách thứ 2: Tải file nén từ trang [Flutter SDK Archive](https://flutter.io/sdk-archive/#linux)

Chọn version Flutter để tải về. Sau khi tải về xong ví dụ được file `flutter_linux_v0.8.2-beta.tar.xz` thì bạn giải nén ra để sử dụng

#### (2) Config Flutter

Các bạn vào thư mục Home của Ubuntu. Tìm file `.bashrc` và thêm dòng lệnh sau vào phía cuối file

```
export ANDROID_HOME=$HOME/Android_Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

export PATH=`pwd`/flutter/bin:$PATH
export PATH=$HOME/flutter/bin:$PATH
```

Nếu bạn dùng [zsh](https://ohmyz.sh/) thì bạn cũng copy lệnh trên trong `.zshrc`

#### (3) Config Flutter với Android Studio

Để Android Studio tận dụng được tất cả các tính năng (hot reload, chọn devices để run app, ...) của Flutter bạn cần gõ lệnh sau:
```
$ flutter config --android-sdk $HOME/Android_Sdk
$ flutter config --android-studio-dir $HOME/android-studio
```

Để biết đến đây bạn đã config thành công hay không thì bạn gõ lệnh sau trên terminal

```
$ flutter doctor   
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel beta, v0.8.2, on Linux, locale en_US.UTF-8)
[✓] Android toolchain - develop for Android devices (Android SDK 28.0.2)
[✓] Android Studio (version 3.2)
[!] VS Code (version 1.27.2)
[✓] Connected devices (2 available)

! Doctor found issues in 1 category.

```
 Ở đây do tôi chưa cài Flutter extension vào VS Code nên sẽ bị báo chấm than. Nhưng nếu bạn chỉ code trên Android Studio thì bạn không cần quan tâm đên VS Code. Và như vậy bạn đã config thành công Flutter với Android Studio.
 


Ngoài ra, bạn có thể kiểm tra ở đây để biết bạn đã config thành công Flutter với Android Studio hay chưa. 

Ở đây tôi đang cắm 1 devices Android vào PC thì sẽ phải hiển thị tên devices `A1601`. Nếu không thành công sẽ hiển thị `<no devices>`
![](https://i.imgur.com/srNx4qk.png)

* Để tạo projects demo bạn chọn File -> New Project Flutter

![](https://i.imgur.com/xqfR5d5.png)

Hoàn tất thao tác tạo project và bạn chạy thử sẽ được kết quả như dưới đây:

![](https://i.imgur.com/HTjPgD9.png)

# Tham khảo
1. https://flutter.io/get-started/install/
2. https://blog.geekyants.com/we-rebuilt-a-react-native-app-with-flutter-4160f0499a82