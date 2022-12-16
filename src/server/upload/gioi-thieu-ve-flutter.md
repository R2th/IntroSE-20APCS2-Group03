![](https://images.viblo.asia/5f7c8c9d-cdea-478b-9672-0d1d67cc4331.png)
# 1. Flutter là gì?
* Flutter là mobile UI framework của Google để tạo ra các giao diện chất lượng cao trên iOS và Android trong khoảng thời gian ngắn. Flutter hoạt động với những code sẵn có được sử dụng bởi các lập trình viên, các tổ chức.
* Flutter hoàn toàn miễn phí và cũng là mã nguồn mở.

# 2. Tại sao lại là Flutter?
* Nếu bạn đang tìm kiếm các phương pháp thay thế để phát triển ứng dụng Android, bạn nên cân nhắc thử Flutter của Google, một framework dựa trên ngôn ngữ lập trình Dart.
* Các ứng dụng được xây dựng với Flutter hầu như không thể phân biệt với những ứng dụng được xây dựng bằng cách sử dụng Android SDK, cả về giao diện và hiệu suất. Hơn nữa, với những tinh chỉnh nhỏ, chúng có thể chạy trên thiết bị iOS.
* Chạy ở 60 fps, giao diện người dùng được tạo ra với Flutter thực thi tốt hơn nhiều so với những ứng dụng được tạo ra với các framework phát triển đa nền tảng khác chẳng hạn như React Native và Ionic. Một số lí do khiến bạn có thể hứng thú với Flutter:
    1. Flutter sử dụng Dart, một ngôn ngữ nhanh, hướng đối tượng với nhiều tính năng hữu ích như mixin, generic, isolate, và static type.
    2. Flutter có các thành phần UI của riêng nó, cùng với một cơ chế để kết xuất chúng trên nền tảng Android và iOS. Hầu hết các thành phần giao diện người dùng, đều sẵn dùng, phù hợp với các nguyên tắc của Material Design.
    3. Các ứng dụng Flutter có thể được phát triển bằng cách4 sử dụng IntelliJ IDEA, một IDE rất giống với Android Studio.

# 3. Đặc điểm nổi bật
1. Fast Development: Tíng năng Hot Reload hoạt động trong milliseconds để hiện thị giao diện tới bạn. Sử dụng tập hợp các widget có thể customizable để xây dựng giao diện trong vài phút. Ngoài ra Hot Reload còn giúp bạn thêm các tính năng, fix bug tiết kiệm thời gian hơn mà không cần phải thông qua máy ảo, máy android hoặc iOS.
![GIF](https://images.viblo.asia/8e13fc4b-be52-4096-b4b6-a03dd67c8a8d.gif)
2. Expressive and Flexible UI: Có rất nhiều các thành phần để xây dựng giao diện của Flutter vô cùng đẹp mắt theo phong cách Material Design và Cupertino, hỗ trợ nhiều các APIs chuyển động, smooth scrolling...
![](https://images.viblo.asia/39d5cb20-1d0f-4ada-8968-e3fa1cc08fd3.png)
3. Native Performance: Các widget của fluter kết hợp các sự khác biệt của các nền tảng ví dụ như scrolling, navigation, icons, font để cung cấp một hiệu năng tốt nhất tới iOS và Android.

# 4. Video giới thiệu về cách Flutter giúp bạn phát triển ứng dụng
{@youtube: https://www.youtube.com/watch?v=fq4N0hgOWzU}

# 5. Cài đặt
Bạn có thể cài đặt bằng cách clone Flutter repository từ Github về:
```
git clone https://github.com/flutter/flutter.git
```
Tiếp theo bạn nên sử dụng công cụ chuẩn đoán của Flutter để kiểm tra các thành phần như Dart SDK, font Material Design:
```
cd flutter/bin
./flutter doctor
```
Giao diện công cụ chuẩn đoán Flutter Doctor:
![](https://images.viblo.asia/bd3fcc4b-d60c-4d40-84f4-c33850dfe3a5.png)
Để xây dựng ứng dụng Android, bạn phải trỏ Flutter tới thư mục của Android Studio 
```
./flutter config --android-studio-dir ~/android-studio
```
Cấu hình với IntelliJ hoặc Android Studio, chọn Configure->Plugins tại màn hình khởi động
![](https://images.viblo.asia/127f4247-15fc-457a-ae24-0de9e4312652.png)
Sau đó cài đặt plugin Dart
![](https://images.viblo.asia/10265396-57cc-4163-9879-a06a2ff713ef.png)
Tương tự với plugin Flutter
![](https://images.viblo.asia/7987db7b-4f90-4df4-84c7-4c80d2315d19.png)
Sau khi cài Dart và Flutter bạn nên khởi động lại IDE

Bây giờ, bạn phải trỏ plugin Flutter đến thư mục mà bạn đã cài đặt **Flutter**. Để làm như vậy, hãy chọn **Configure > Settings** trong màn hình chào mừng và trong hộp thoại bật lên, điều hướng đến **Languages & Frameworks > Flutter**. Trong trường Flutter SDK path, gõ đường dẫn tuyệt đối của thư mục.
![](https://images.viblo.asia/ffb4be67-faac-4691-8927-b141f104c54f.png)
Như vậy là bạn đã xong phần cấu hình cho IDE. Bạn có thể tìm hiểu thêm về các component trong flutter tại đây 
[Flutter Components](https://flutter.io/docs/).

Happy Reading ^^...
# 5. Tham khảo
1. https://flutter.io/get-started/install/
2. https://code.tutsplus.com/vi/tutorials/developing-an-android-app-with-flutter--cms-28270
3. https://proandroiddev.com/what-the-f-tter-understanding-flutter-as-an-android-java-developer-2158086a2bd9