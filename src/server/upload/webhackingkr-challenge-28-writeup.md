## Mở đầu
[Link challenge](http://webhacking.kr:10002/)

Bài này khá hay và khó về file upload, vì cần kiến thức về htaccess
 
 Đề cho mình 2 gợi ý như sau:
 
  `Đọc file /upload/oPp7SGzQPISX/flag.php chắc đọc được file này ra được flag`
  
  `Gợi ý thứ 2 là file của bạn up lên sẽ ở /upload/oPp7SGzQPISX/`
  
 Mình đã thử upfile php nhưng không được, sau khi được một người chỉ đọc về htaccess và quay lại làm thì đã ra flag.
## Htaccess là gì ?
 Các bạn có thể tham khảo ở đây [htaccess](http://www.htaccess-guide.com/)
 
 Htaccess là một tập tin dùng để cấu hình máy chủ web apache. Nó được máy chủ chấp nhận như là một thành phần và cho phép chúng ta thực hiện điều hướng và bật các tính năng một cách linh hoạt hoặc bảo vệ một phần nào đó của website. Trong cái tên .htaccess thì htaccess là phần đuôi và tập tin này là không có tên (noname), chính vì thế khi bạn đưa file này lên host không phải lúc nào nó cũng hiển thị ra.
## Upload file .htaccess
 Bạn up 1 file lên và dùng Proxy của burp suite để chặn bắt request gửi lên.
 
 Sửa đổi request gửi lên để up file .htaccess.
 

![](https://images.viblo.asia/f21fce49-8ecf-4f44-be09-ed8cfd001b97.png)


 Các bạn có thể tham khảo thêm về [php_flag engine off](https://www.electrictoolbox.com/disable-php-apache-htaccess/)
 
 Sau khi upload file .htaccess thành công thì giờ các bạn có thể vào xem file /flag.php thôi
 
   Và đây là kết quả của mình
 
![](https://images.viblo.asia/08b34e68-4538-4f57-9268-cc7c536900af.png)

Ra flag rồi thì mình submit thôi.

## Kết

 Hy vọng qua bài writeup này các bạn có thể hiểu thêm một phần nào về .htaccess và về dạng bài file upload khi chơi CTF