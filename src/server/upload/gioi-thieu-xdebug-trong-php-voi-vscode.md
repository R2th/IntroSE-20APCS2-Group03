# I. Giới thiệu.
## 1. Debug là gì?
- Lập trình là một công việc đòi hỏi độ chính xác cao khi mà chỉ một thiếu sót nhỏ như: gõ sai cú pháp, quên dấu chấm phẩy là điều khá phổ biến ở lập trình viên. Những lỗi (bug) như vậy có thể dẫn tới việc ứng dụng không hoạt động được hoặc hoạt động theo một hướng khác với yêu cầu được ra. Khi lập trình ngay cả những ứng dụng đơn giản thì việc mắc phải lỗi (bug) trong khi viết code là điều khó có thể tránh khỏi.<br>

- Vì vậy tìm và phát hiện ra lỗi để sửa chữa là việc diễn ra khá phổ biến đối với các lập trình viên. Quá trình tìm và phát hiện ra lỗi này còn được gọi là debug.<br>

- Đối với các ứng dụng đơn giản thì việc phát hiện lỗi không tốn quá nhiều thời gian, tuy nhiên khi làm việc với các ứng dụng lớn việc tìm ra lỗi sẽ rất khó khăn. Các lập trình viên giỏi cũng là những người tìm ra lỗi rất nhanh và chính xác. Bài viết này sẽ giúp bạn hiểu quy trình debug và sau đó sẽ làm quen với việc debug trong PHP.<br>
## 2. Xdebug là gì?
- Xdebug là thư viện được viết ra để hỗ trợ việc tìm ra lỗi trong ứng dụng viết bằng PHP một cách hiệu quả hơn.<br>
- Các công cụ hỗ trợ tìm ra lỗi của ứng dụng như Xdebug được gọi là debugger.<br>
# II. Sử dụng Xdebug với vscode.
## 1. Cài đặt
### Step 1:
- Xdebug đơn giản chỉ là 1 file .dll bạn có thể vào link này download: https://xdebug.org/download.php
.<br>

- Một số liên kết tiện dụng để cài đặt Xdebug:<br>
    + MAMP<br>
    + MAMP Pro<br>
    + VVV<br>
    + Local By Flywheel<br>
    + Valet<br>
    + Desktop Server<br>
- Tạo một tệp index.php trong thư mục gốc của web của bạn và thêm mã sau đây.<br>
```
<?php 
phpinfo();

?>
```
- Chạy tệp index.php trong trình duyệt. Sau đó một số thông tin sau như được hiển thị: <br>

![](https://images.viblo.asia/635b3283-b9ac-44e6-bab3-62d77a54b0c0.PNG)
###  Step 2:
- Thêm cấu hình Xdebug vào php.ini<br>

 `[XDebug]
zend_extension=C:\xampp\php\ext\php_xdebug-2.5.4-5.6-vc11.dll
xdebug.remote_enable = 1
xdebug.remote_autostart = 1`

- Để biết có config thành công chưa bạn vào lại http://localhost/dashboard/phpinfo.php hoặc vào cmd gõ php -v để xem lại cấu hình của mình.<br>
### Step 3: Cài đặt PHP Debug Extension trong VS Code
- Bạn mở Visual Code lên vào mục Extension kiếm PHP Debug và cài đặt:
![](https://images.viblo.asia/eed795ab-c43f-475b-b5c6-7d02e77bc920.png)

- Đến đây bạn đã hoàn tất các bước cài đặt Xdebug cho Visual Code.<br>
# III.Kết luận:
- Cám ơn các bạn đã theo dõi bài viết của mình.<br>
- Hi vọng nó sẽ giúp được được cái bạn một phần nào đó trong quá trình cài đặt và sử dụng xDebug.<br>
- Dưới đây là một số nguồn mình đã tham khảo:<br>
    - https://www.codehub.vn/Gioi-Thieu-Ve-Xdebug-Trong-PHP
    - https://deliciousbrains.com/xdebug-advanced-php-debugging/
    - https://www.codewall.co.uk/debug-php-in-vscode-with-xdebug/