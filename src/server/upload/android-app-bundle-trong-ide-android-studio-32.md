# Tổng quan
Google đã phát hành bản cập nhật mới nhất cho IDE Android Studio lên phiên bản 3.2.0 từ tháng 09/2018 và giờ là bản 3.2.1. Tại phiên bản 3.2 hiện nay nhóm phát triển Android đã cập nhật hơn 20 tính năng mới. Trong số đó có một vài tính năng liên quan tới Android Pie và Android App Bundle. <br>
Trong bài viết này mình xin giới thiệu đến một chức năng mình thấy là khá thú vị trong phiên bản 3.2 là: **Android App Bundle**
# Why Android App Bundle?
Google đã đưa ra khuyến nghị các lập trình viên sử dụng Android Studio 3.2 nên chuyển sang sự dụng Android App Builde đây là 1 dạng xuất bản app mới. <br>
Theo nhóm phát triển Android cho biết có cách build mới này giúp giảm từ 11-64% dung lượng apk so với bản build thông thường, cũng như giảm dung lượng khi download app. <br>
Mô hình này được các nhà phát triển android gọi là **Dynamic Delivery**.<br>
Tại sao nó lại tinh gọn hơn: đầu tiên nó sẽ xử lý gói ứng dụng của bạn để tạo và phân phát file APK được tối ưu hóa cho từng cấu hình thiết bị của từng người dùng, vì vậy họ chỉ download các code và các resources mà họ cần để chạy ứng dụng của bạn. Với Android Studio 3.2 hoặc thông qua command line, bạn có thể dễ dàng tạo code của mình dưới dạng gói ứng dụng và làm cho APK nhỏ hơn dựa trên các lựa chọn ngôn ngữ, kích thước màn hình và các ABI mà không có thay đổi nào trong code. <br>
Bạn sẽ dễ dàng hình dung hơn khi nhìn vào ảnh phía bên dưới<br>
![](https://images.viblo.asia/d5673770-1b33-40e6-97ad-2a409ccd3dfd.gif)
# How to?
Điều kiện đầu tiên để sử dụng chức năng này tất nhiên sẽ là update Android Studio 3.2.<br>
Tiếp theo đó là updae build gradle trong ứng dụng của mình lên 3.2.0 <br>
```
dependencies {
        classpath 'com.android.tools.build:gradle:3.2.0'
    }
```
Với 2 thứ trên là bạn đã hoàn toàn có thể xuất bản app theo cách mới rồi.
Cách bước thực hiện **Build** -> **Generate Signed Bundle/APK**.
Cửa sổ hiện lên có thêm 1 option nữa cho các bạn lựa chọn chính là **Android App Bundle**. Tiến hành **Next** thì mọi thứ sẽ trở lại quen thuộc với mọi người. Đó là điền thông tin key store.
![](https://images.viblo.asia/9ad5a988-7ea6-48d1-b86f-948ef44fbb52.png)<br>
Sau khi build thành công thì trong ứng dụng của mình sẽ xuất hiện folder **release** và chứa file **app.aab** đây chính là kết quả của lần build này. Các bạn hãy thử trải nghiệm nó bằng cách up lên Google Play nhé.

Bài viết tới đây là hết. Bản Android Studio mới này có rất nhiều chức năng thú vị. Mình sẽ cố gắng đưa tới các bạn nhiều thông tin hơn nữa. Cảm ơn các bạn đã đọc bài viết
# Tham khảo
https://android-developers.googleblog.com/2018/09/android-studio-32.html
https://developer.android.com/platform/technology/app-bundle/