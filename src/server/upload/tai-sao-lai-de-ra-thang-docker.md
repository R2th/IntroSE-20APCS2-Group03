<div align="justify">
Đơn giản Docker dùng để build môi trường chạy code.
Môi trường ở đây bao gồm:
<ul>
<li>Hệ điều hành: CentOS, Ubuntu</li>
<li>Web Server: Nginx, Apache</li>
<li>Database: MySQL, PostgreSQL</li>
<li>Trình biên dịch: PHP-FPM để chạy file .php</li>
<li>Source code</li>
</ul>

### Ơ thế thì không dùng Docker tôi vẫn build bình thường mà :joy:

Đúng thế, vẫn có thể build môi trường chạy code mà không cần đến Docker nhưng nếu để ý, việc build môi trường như vậy sẽ gặp những bất cập sau:
1. Mỗi lần có 1 người mới join team, sẽ lại phải build môi trường từ đầu dẫn đến mất thời gian.
2. trong quá trình phát triển phần mềm, dự án thường sẽ tạo ra các môi trường để test:
*  Local (DEV test)
* Develop (QA test)
* Staging (QA test + Khách hàng test)
* Product (Người dùng sử dụng)
<br>
Việc tạo ra nhiều môi trường test như vậy nhằm mục đích tạo ra được môi trường tiệm cận giống với môi trường Product nhất có thể, và giảm được các lỗi khi chạy code trên Product.

*Note:*
Nếu để ý, với các dự án chưa áp dụng Docker vào triển khai thì ở môi trường Local (máy tính của DEV) sẽ có người dùng hệ điều hành Window, có người lại dùng Ubuntu. rồi khi lên môi trường Develop và Staging sẽ dùng hệ điều hành Ubuntu để cài đặt. như vậy sẽ dẫn tới việc sai khác rất nhiều giữa các môi trường, đây sẽ là nguyên nhân dẫn đến các lỗi liên quan đến version, package.
<br>
<br>
*Ví dụ:* Thư viện Horizal chỉ có thể cài đặt được trên hệ điều hành nhân Linux, còn trên Window thì không cài được. dẫn đến các lỗi phát sinh trong quá trình viết code.

### Lợi ích của việc sử dụng Docker
1. Chỉ cần viết 1 lần là có thể sử dụng môi trường đó để chạy ở nhiều máy khác nhau giúp tiết kiệm thời gian cài đặt môi trường khi có thành viên mới join vào team.
2. chỉ cần viết 1 lần và sửa lại 1 vài config là có thể sử dụng môi trường đó làm môi trường Develop, Staging, Product, giúp đồng bộ giữa các môi trường test.

Vậy thì còn chần chừ gì nữa mà không bắt tay vào build môi trường bằng Docker thôi :clap:
</div>