Để thiết lập Charles cho các thiết bị thật (device) và máy ảo (Emulator) hoặc Simulator đôi khi không hoàn toàn giống nhau. Việc sử dụng Trình mô phỏng (Emulator) hoặc Simulator rất thuận tiện, vì bạn không cần phải có thiết bị thật thực sự để tiến hành test.
Trong trường hợp bạn không biết Charles là gì, thì đây là một công cụ network proxy . Nói cách khác, nó có thể được sử dụng để chặn kết nối mạng từ thiết bị, để cho phép xem, chuyển hướng (redirect url), sửa đổi và gỡ lỗi (debug). Nó cũng rất hữu ích để thử nghiệm (test) local server.
Trong bài biết này, mình sẽ GUI tổng hợp các bước để cài đặt. config Charles trên các thiết bị máy ảo iOS và Android. 

CHÚ Ý: Trước khi chạy Emulator, Simulator
Sẽ tốt hơn nếu đảm bảo Charles được khởi chạy trước khi bạn khởi chạy Emulator, Simulator. Có thể điều này không chắc là luôn luôn cần thiết, nhưng đó sẽ là một bước tốt để bắt đầu.

# 1. Cài đặt Charles
Bước này cực kỳ đơn giản, bạn chỉ việc truy cập vào trang chủ Charless, download file cài đặt về máy tính và cài đặt nó giống như những phần mềm khác. 
- [Download](https://www.charlesproxy.com/documentation/installation/)
- [GUI Install](https://www.charlesproxy.com/documentation/installation/)

Sau khi cài đặt xong, bây giờ chúng ta sẽ tiến hành config Charles trên máy ảo của Android, IOS.
# 2. Android Emulator
Trước đây, việc kết nối Trình giả lập Android được thực hiện thông qua dòng lệnh (command line).  Nhưng bây giờ thì việc config hoàn toàn rất đơn giản, thao tác thực hiện trên giao diện . 

Nhưng trước đó, bạn phải đảm bảo rằng máy ảo của bạn đã được kết nối với internet.  (Chỉ sử dụng nó nếu Trình giả lập của bạn có thể kết nối với internet.)

## 2.1. Setting up the Proxy IP
Sau khi Trình giả lập của bạn được khởi chạy và đã có kết nối internet, bạn cần tìm Địa chỉ IP cục bộ (local IP). Thực hiện việc này ở Charles bằng cách chọn *Help →Local IP Address*

![](https://images.viblo.asia/3de26e4a-2656-4030-9202-d80d3b5b23d4.png)

Sau đó, trong Trình giả lập của bạn, đi tới cài đặt Wifi và nhấp giữ vào Android Wifi, nơi bạn sẽ có quyền truy cập, sửa đổi cài đặt mạng .

![](https://images.viblo.asia/adb0aec8-6ee1-4a4b-adfa-94222fcbf6d0.png)

Chọn Mofify Network, bấm vào tùy chọn Nâng cao để mở rộng hộp thoại. Sau đó, nhập Địa chỉ IP vào máy chủ Proxy và cổng Proxy (thường là 8888). Sau đó, nhấp vào Lưu.

![](https://images.viblo.asia/3af548d7-3ae2-49c5-a284-a8a8788c68a7.png)

## 2.2. Certificate installation

Chúng ta sẽ cần cài đặt chứng nhận - *Certificate* để xem mạng an toàn. Để làm như vậy, hãy truy cập trình duyệt Chrome hoặc bất cứ trình duyệt nào, sau đó nhập địa chỉ chls.pro/ssl

Nếu Charles đã được kết nối, bạn sẽ nhận được yêu cầu tải xuống hoặc thay thế *Certificate* hiện tại của mình.

![](https://images.viblo.asia/ed2f5888-6fd9-4b3f-9063-fb4fedd4e49f.png)

Sau khi download, bạn sẽ nhận được yêu cầu cài đặt nó. Sau đó, bạn có thể lưu nó với bất kỳ tên nào bạn thích.

Lưu ý rằng thiết bị của bạn cần phải có ít nhất một cài đặt bảo mật mã Pin để thực hiện điều đó. Nếu không, bạn sẽ được thông báo thiết lập ở bước đó.

## 2.3. Troubleshooting (Xử lý sự cố)
Trong trường hợp bạn không thể kết nối với Charles, hãy thử cách sau:
- Đảm bảo thiết bị của bạn được kết nối với internet trước khi bạn đặt proxy với Charles.
- Tắt mạng di động và chỉ cần bật mạng Wifi cho thiết bị.
- Kiểm tra xem cài đặt Charles của macOS Proxy có đang đang TẮT hay chưa?. Bạn có thể kiểm tra bằng cách tìm trong Charles’ Proxy → macOS Proxy. (Lưu ý rằng bước này ngược lại với iOS. Tức là khi chạy trên IOS thì macOS Proxy phải được BẬT).

# 3. iOS Simulator
Đối với iOS, việc thiết lập proxy Simulator khác với thiết bị thật và nó đơn giản hơn. Bạn không cần phải nhập chính xác địa chỉ proxy và để Charles làm điều đó cho bạn.

## 3.1. Connecting Charles to Simulator
Sau khi bạn khởi chạy Trình mô phỏng Simulator, mở Charles, đi tới *Help → SSL Proxying →Install Charles Root Certificate in iOS Simulators.*

![](https://images.viblo.asia/31562b24-424f-4d3c-9fe8-cee14e291600.png)

Sau đó, bạn sẽ nhận được thông báo dưới đây:

![](https://images.viblo.asia/40c3f4a2-6e1c-4047-b2fe-1e22e067aa20.png)

Bước tiếp theo rất quan trọng, bật ON macOS Proxy của bạn. Điều này có thể được thực hiện bằng cách truy cập nó thông qua Charles Proxy → macOS Proxy.

![](https://images.viblo.asia/c35fcc25-2404-4952-862b-aaceb96a2997.png)

## 3.2. Certificate installation

Chúng ta sẽ cần cài đặt chứng nhận - *Certificate* để xem mạng an toàn. Để làm như vậy, hãy truy cập trình duyệt Chrome hoặc bất cứ trình duyệt nào, sau đó nhập địa chỉ chls.pro/ssl

Nếu Charles đã được kết nối, bạn sẽ nhận được yêu cầu tải xuống hồ sơ cấu hình (*configuration profile*) như dưới đây. Nhấn Cho phép nó.

![](https://images.viblo.asia/7e84304f-36ec-440b-b4c7-8612c4d793c4.png)

Sau đó, bạn sẽ nhận được thông báo dưới đây:.

![](https://images.viblo.asia/1e8dc15a-9c62-4a78-a710-59c1cc078c39.png)


Sau đó, đi đến Cài đặt Trình mô phỏng của bạn *Setting → General → Profile*, bạn sẽ nhận được một cái gì đó giống như hình ảnh bên dưới. Nhấn vào nó.

![](https://images.viblo.asia/9e9d88ad-1665-4c2f-b8d0-31df4f29afd4.png)

Sau đó, nhấn Install, giống như dưới đây:

![](https://images.viblo.asia/48057b76-91f0-4f89-89fb-be75eaf81dd9.png)

Bước tiếp theo. Go to *Setting → General → About → Certificate Trust Setting*. Sau đó tìm kiếm chứng chỉ bạn vừa cài đặt và bật nó lên.

![](https://images.viblo.asia/3d3c01ba-8691-49e6-b0ca-a4f77d4abd6d.png)

Vậy là xong rồi :sweat_smile:

## 3.3. Troubleshooting (Xử lý sự cố)
Trong trường hợp bạn không thể kết nối với Charles, hãy thử cách sau:
- Đảm bảo thiết bị của bạn được kết nối với internet trước khi bạn đặt proxy với Charles.
- Kiểm tra xem cài đặt Charles của macOS Proxy có đang đang BẬT hay không?. Bạn có thể kiểm tra bằng cách tìm trong *Charles’ Proxy → macOS Proxy*. (Lưu ý rằng bước này ngược lại với Android. Tức là khi chạy trên Android thì macOS Proxy phải được TẮT).

<br>
<br>
Lưu ý: Trong trường hợp, sau khi sử dụng Charles, bạn nhận thấy máy tính của bạn KHÔNG THỂ truy cập internet, hãy kiểm tra xem cài đặt Proxy CharlesOS macOS đang không được BẬT. Bạn có thể kiểm tra bằng cách tìm trong Charles Proxy → macOS Proxy.

<br>
<br>
<br>
Thanks for reading.
<br>
<br>
TÀI LIỆU THAM KHẢO:<br>
<br> - https://www.charlesproxy.com/documentation/using-charles/ssl-certificates/ 
<br> - https://medium.com/better-programming/charles-setup-for-emulator-android-simulator-ios-94d3e21598f1