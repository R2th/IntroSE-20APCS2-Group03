# Tìm hiểu về Webserver, PHP
**PHP** –   Hypertext Preprocessor là một ngôn ngữ lập trình kịch bản được chạy ở phía server nhằm sinh ra mã html trên client. PHP đã có nhiều phiên bản và được tối ưu hóa cho các ứng dụng web, với cách viết mã rõ rãng, tốc độ nhanh, dễ học nên PHP đã trở thành một ngôn ngữ lập trình web rất phổ biến và được ưa chuộng.

PHP chạy trên môi trường WebServer và lưu trữ dữ liệu thông qua hệ quản trị cơ sở dữ liệu nên PHP thường đi kèm với Apache, MySQL và hệ điều hành Linux (LAMP).

- Apache là một phần mềm web server có nhiệm vụ tiếp nhận request từ trình duyệt người dùng sau đó chuyển giao cho PHP xử lý và gửi trả lại cho trình duyệt.
- MySQL cũng tương tự như các hệ quản trị cơ sở dữ liệu khác (PostgreSQL, Oracle, SQL Server…) đóng vai trò là nơi lưu trữ và truy vấn dữ liệu.
- Linux: Hệ điều hành mã nguồn mở được sử dụng rất rộng rãi cho các WebServer. Thông thường các phiên bản được sử dụng nhiều nhất là RedHat Enterprise Linux, Ubuntu…

**PHP hoạt động như thế nào?**

Khi người sử dụng gọi trang PHP, Web Server sẽ triệu gọi PHP Engine để thông dịch dịch trang PHP và trả kết quả cho người dùng như hình bên dưới.
Mô hình lập trình php![](https://images.viblo.asia/6a08d6ab-f33e-41f2-a4a8-57530d81a824.jpg)

**Bạn có thể cài đặt và cấu hình từng phần riêng rẽ để cuối cùng có được cả 3 thành phần:**

- Tải Apache và cài đặt từ đây: http://httpd.apache.org/
- Tải PHP và cài đặt nó từ đây: http://www.php.net/
- Tải MySQL và cài đặt nó từ đây: https://www.mysql.com/

# Cài đặt XAMPP trên Windows
Việc cài từng gói  Apache, PHP,  MySQL   khá phức tạp,  nên thực tế ta chọn một gói phần mềm tích hợp sẵn cả ba thành phần trên và một lần cài đặt là xong. Trên Windows có thể chọn XamPP,  chuyên dành cho lập trình viên cài đặt Apache-MySQL-PHP trên Windows.

**XAMPP là gì?**

Xampp là chương trình tạo máy chủ Web được tích hợp sẵn Apache, PHP, MySQL, FTP Server, Mail Server, phpMyAdmin và các công cụ như phpMyAdmin. Không như Appserv, Xampp có chương trình quản lý khá tiện lợi, cho phép chủ động bật tắt hoặc khởi động lại các dịch vụ máy chủ bất kỳ lúc nào.

**Download XAMPP**

Lựa chọn phiên bản phù hợp và download trực tiếp từ trang chính của XAMPP: https://www.apachefriends.org/download.html


**Cài đặt XAMPP**

Sau khi tải file cài đặt về xong, hãy chạy nó, sau đó chọn **Next**.

![](https://images.viblo.asia/e264e17f-5020-4bd5-81bb-3dc6b0f5bdd1.jpg)


Ở phần chọn đường dẫn, bạn hãy chọn đường dẫn cần lưu cài đặt của XAMPP. Lưu ý rằng đường dẫn này bạn phải nhớ vì khi cài đặt web lên localhost, bạn phải truy cập vào thư mục này. Bạn nên để mặc định là c:\xampp. Tiếp tục ấn Next.

![](https://images.viblo.asia/dd6157ae-1247-4efc-9f0e-7e78dbe3ace7.jpg)

Ở trang kế tiếp, bạn bỏ chọn phần “Learn more about Bitnami for XAMPP“. Và ấn Next 2 lần nữa để bắt đầu quá trình cài đặt XAMPP.

![](https://images.viblo.asia/fbf81baa-c601-4944-aee3-e4497ae0b7e3.jpg)

Sau khi cài xong, ấn nút Finish để kết thúc cài đặt và mở bảng điều khiển của XAMPP. Tuy nhiên, hãy khởi động lại máy sau khi cài đặt xong để tránh tình trạng không khởi động được localhost.

**Khởi động Localhost**

Bây giờ bạn hãy vào thư mục c:\xampp và mở file xampp-panel.exe lên để bật bảng điều khiển của XAMPP.

![](https://images.viblo.asia/80d9eaa5-d472-4587-8f93-f5538b561cbc.jpg)


Bạn để ý sẽ thấy hai ứng dụng Apache và MySQL có nút Start, đó là dấu hiệu bảo 2 ứng dụng này chưa được khởi động, hãy ấn vào nút Start của từng ứng dụng để khởi động Webserver Apache và MySQL Server lên thì mới chạy được localhost.

Nếu cả hai ứng dụng chuyển sang màu xanh như hình dưới là đã khởi động thành công.

![](https://images.viblo.asia/2b742b9b-f57b-4f25-83c8-0382f9bd40e9.jpg)



Sau khi khởi động xong, bạn hãy truy cập vào website với địa chỉ là http://localhost sẽ thấy nó hiển thị ra trang giới thiệu XAMPP như hình dưới.

![](https://images.viblo.asia/9682dd2d-1a62-4fae-bff5-8d0f232543d8.jpg)

**Cách đổi cổng mạng cho Localhost**

Mặc định Localhost sẽ sử dụng cổng 80, bởi vì khi bạn gõ tên miền như http://localhost thì tức là nó đã sử dụng cổng 80 để đọc các dữ liệu web trong localhost. Tuy nhiên nếu như bạn đã dùng cổng 80 cho một ứng dụng khác, hoặc đơn giản là không khởi động Apache được thì bạn nên thiết lập cho Apache trong Localhost sử dụng một cổng khác, như 8080 chẳng hạn.

Trước khi đổi, mình cần các bạn lưu ý là sau khi đổi xong thì bạn phải truy cập vào website với tên miền http://localhost:8080 thay vì chỉ là http://localhost.

Để đổi cổng, bạn mở bảng điều khiển XAMPP lên và chọn nút Config của Apache, sau đó chọn **Apache (httpd.conf)**.

![](https://images.viblo.asia/a746d20d-9386-48f0-a29f-e2a6ce6ce98e.jpg)

Sau đó bạn tìm dòng này:
![](https://images.viblo.asia/35abc0e6-23a5-400c-9f31-e695928f64d1.PNG)

Đổi thành
![](https://images.viblo.asia/605f81d2-1af6-4e85-9e9f-7a58bc5870e2.PNG)

Sau đó bạn Stop cái Apache và Start lại rồi thử truy cập vào localhost theo đường dẫn http://localhost:8080, nếu truy cập được thì bạn đã làm thành công. Và cũng nên lưu ý rằng, sau khi đổi cổng thì mỗi khi truy cập bạn phải sử dụng đường dẫn có kèm theo số cổng bạn vừa đổi sang vì mặc định nếu không điền thì nó sẽ sử dụng cổng 80.

Nếu bạn có sử dụng tên miền ảo như mình hướng dẫn ở trên thì bạn cũng nên sửa lại file C:\xampp\apache\conf\extra\httpd-vhost.conf cho nó sử dụng port 80 thay vì 8080.