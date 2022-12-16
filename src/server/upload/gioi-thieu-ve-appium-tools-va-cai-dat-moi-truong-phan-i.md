![](https://images.viblo.asia/df3c1371-1856-4fdb-8ec4-a9fd2c7fcd14.png)
## I. Appium là gì?
- Appium là một tool test automation (open-source) rất hữu ích cho các ứng dụng trên nền tảng iOS và Android.
- Appium hỗ trợ kiểm thử phần mềm tự động hóa trên trình mô phỏng hoặc giả lập và các thiết bị di động vật lý.
- Quan trọng là:

        * Appium là công cụ kiểm thử tự động “cross-platform”đa nền tảng giúp QA có thể sử dụng lại script trên các nền tảng iOS và Android,...  sử dụng cùng một API.
        * Appium có thể thực hiện nhiệm vụ kiểm tra hồi quy các ứng dụng một cách dễ dàng. 
- Các ngôn ngữ mà Appium hỗ trợ bao gồm: 
         Java
        Objective-C
        JavaScript with Node.js
        PHP
        Python
        Ruby
        C#
        Clojure
        Perl
 - Appium support các platform bao gồm:
        Android
        IOS
        FirefoxOS
## II. Hạn chế của Appium
- Chỉ hỗ trợ cho device Android 4.2 trở lên
- Thực thi tập lệnh rất chậm trên nền tảng iOS.
- Hỗ trợ Gestures bị hạn chế.
- Không hỗ trợ cho Toast messages

## III. Download And Install Java(JDK) In Windows
![](https://images.viblo.asia/93208af7-79ab-4b5d-8693-abd867376f74.jpg)
JDK là bộ phát triển java. Nếu bạn đang làm việc với ngôn ngữ lập trình java thì bạn phải cài đặt nó vì nó là điều kiện tiên quyết để code và chạy các chương trình phần mềm java, sử dụng framework kiểm thử hoặc sử dụng SDK. 

### 1. Step 1: Download và cài đặt JDK
Truy cập trang https://www.oracle.com/technetwork/java/javase/downloads/index.html  để download và cài đặt JDK theo hướng dẫn.

### 2. Step 2: Cài đặt biến JAVA_HOME
- Đi đến thư mục C:\Program Files\Java.
- Click double và copy đường dẫn folder JDK với phiên bản tương tự khi cài đặt.
Ví dụ: “C:\Program Files\Java\jdk1.8.0_191”

### 3. Thiết lập biến JAVA_HOME
* Nhấp chuột phải vào biểu tượng My Computer nằm trên màn hình của bạn hoặc Window.
* Chọn “Properties”. Hộp thoại “System” xuất hiện
![](https://images.viblo.asia/4a960a6f-f27c-46d3-a95b-758cdf615764.png)
* Click “Advanced system settings” như hình dưới. Hộp thoại “System properties” xuất hiện.
![](https://images.viblo.asia/e793e38b-a52e-4b52-9e48-ddc3c5ada420.png)
* Click Advance tab -> Click “Environment Variables” button -> Hộp thoại “Environment Variables” xuất hiện.
* Tại mục “System variable”: click “New” button -> Hộp thoại “New System Variable” xuất hiện.
* Đặt tên biến = JAVA_HOME.
* Đặt giá trị biến = Đường dẫn nơi đặt JDK.
* Sau cùng là Click “OK” ở tất cả các hộp thoại để kết thúc.
### 4. Đặt biến đường dẫn cho Java
* Mở hộp thoại “Environment Variables” như hình dưới.
* Trong mục “System Variable”, chọn Path.
* Click button “Edit” -> Hộp thoại “Edit system variable” xuất hiện.
* Ở cuối chuỗi giá trị biến Path, Đặt dấu chấm phẩy [ ; ] và sau đó đặt đường dẫn thư mục bin của thư mục JDK.
* Click OK.
![](https://images.viblo.asia/07633c0a-be6f-4678-beee-6ed05bd8ca65.png)
### 5. Xác minh java đã được cài đặt đúng chưa
* Mở command prompt. (Window + R > cmd > OK)
* Chạy lệnh “java -version”
![](https://images.viblo.asia/763196ac-c493-474f-a999-d406190c3cb6.png)
Chú ý:
Trong quá trình verify xem java đã được cài đặt đúng hay không trong command prompt, có thể bạn sẽ gặp phải lỗi như dưới
![](https://images.viblo.asia/2dd1a118-a97a-46f2-835a-8d9284a7f372.png)
thì nên tham khảo video này để giải quyết https://www.youtube.com/watch?v=UokTaTwckDw&feature=youtu.be
## IV. Download And Install Android SDK In Windows
![](https://images.viblo.asia/560c20a7-73bd-49f8-9b3b-5ecc1a6aba74.png)
### 1.Android SDK  là gì?
- Android SDK là bộ phát triển phần mềm cho phép bạn tạo ứng dụng cho nền tảng Android.
-  Ngoài ra nó cung cấp khả năng tạo trình giả lập để kiểm tra các bất kỳ ứng dụng Android nào. 
- Sử dụng Appium, chúng ta cũng có thể tạo và chạy kiểm thử tự động cho native app và web app trên thiết bị Android hoặc trình giả lập. Android SDK là điều kiện tiên quyết để chạy test trên nền tảng Android bằng cách sử dụng Appium. 
Lưu ý: cài JDK là điều kiện tiên quyết để cài đặt SDK.

### 2. Download và cài đặt Android SDK
2.1 Yêu cầu cấu hình hệ thống: 
  -  2 GB RAM minimum, 4 GB RAM recommended 
  -  Microsoft® Windows® 8/7/Vista/2003 (32 or 64-bit)
  -  Hard disk space: 20 to 30 GB


2.2 Hướng dẫn download Android SDK
- Truy cập website http://developer.android.com/sdk/index.html
- Cuộn xuống cuối trang bạn sẽ thấy mục “Command line tools only”
- Click chọn “sdk-tools-windows-4333796.zip” để download 
![](https://images.viblo.asia/e69707f9-9bbb-4c77-9ef9-0d88ca9ea49a.png)
==> Khi quá trình download hoàn thành sẽ tiến hành cài đặt file .zip vào ổ có dung lượng lưu trữ đủ lớn.
- Giải nén file zip, sau đó bạn hãy đổi tên folder thành “SDK” cho dễ quản lý nhé.
- Click double vào file “SDK Manager.exe” bên trong thư mục SDK. 
- Hộp thoại “Android SDK Manager” xuất hiện.
- Gói công cụ Android SDK sẽ được cài đặt theo mặc định. Chọn gói yêu cầu từ danh sách các gói khác nhau và sau đó nhấp vào nút Install packages như hình dưới đây để cài đặt gói đã chọn.

![](https://images.viblo.asia/88581a56-4920-4f3a-8459-c13e8ee21666.png)
- Và cuối cùng là hoàn thành việc cài đặt các gói đã chọn

 ![](https://images.viblo.asia/24fefda7-449b-46d0-8118-a16656c7c5da.png)
 
##  V. Reference:

 http://www.software-testing-tutorials-automation.com/2015/09/appium-tutorials.html
 http://appium.io/