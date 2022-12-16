Với yêu cầu từ các dự án của công ty, một trong những điểm bắt buộc trước khi release dự án là phải PASS qua “Security Testing”. Mình sẽ viết một loạt bài giới thiệu cũng như hướng dẫn thực hiện Security Testing, đồng thời chỉ ra cách thức để ngăn ngừa.

Trong bài viết này mình sẽ giới thiệu về SQL Injection, đây là một trong những kỹ thuật cơ bản mà Hacker thường xử dụng để tấn công vào website họ muốn. SQL Injection tận dụng sử lỏng lẻo về thiết kế của các website để thực hiện các truy vấn mang tính chất phá hoại.

## 1. SQL injecttion là gì?
SQL viết tắt của Structured Query Language, nó được sử dụng để truy vấn, thao tác dữ liệu trong Database. SQL Injection là kỹ thuật tấn công nhằm biến các điều kiện trong câu lệnh SQL (SQL Statement) là luôn luôn đúng. (Vẫn hơi khó hiểu nhỉ ^^, các bạn sẽ hiểu rõ hơn ở phần example)
## 2. SQL injecttion hoạt động như thế nào?
Có nhiều kiểu tấn công bằng SQL Injection tuỳ thuộc vào Database Engine. Trước tiên mình sẽ giới thiệu về các thức tấn công thông qua Dynamic SQL Statement. Dynamic SQL Statement là câu lệnh SQL được tạo ra trong quá trình chạy chương trình với các parameters được truyền vào tự động thông qua một form của website.
Bạn có thể xem một đoạn code đơn gian bằng PHP mô tả môt form đăng nhập hệ thống ở dưới đây:
```
<form action='signin.php' method="post">

        <input type="email" name="email" required="required"/>

        <input type="password" name="password"/>

        <input type="submit" value="Submit"/>

</form>
```
Người dùng nhập vào địa chỉ Email, mật khẩu và submit lên signin.php.
Giả sử trong file PHP signin.php xử lý logic như sau:
```
SELECT * FROM leo.users WHERE email = '$_POST['email']' AND password = 'md5($_POST['password'])';
```
Đoạn mã trên thực hiện việc truy vấn dữ liệu từ bảng users với điều kiện là emai và password là những giá trị nhập vào từ form phía trên.
Nhập vào ô email với nội dụng: em@khongbiet.com’ OR 1 = 1 LIMIT 1 — ‘ ]
Nhập vào ô password với nội dụng bất kỳ, sau đó click vào nut Login.

Awesome! chúng ta đã đăng nhập thành công. Dù bạn không biết thông tin đăng nhập nhưng bạn cũng có thể dễ dàng vượt qua theo cách:

Bây giờ mình sẽ giải thích cho các bạn nguyên nhân chúng ta có thể dễ dàng đăng nhập vào hệ thống mà thậm chí chúng ta không có thông tin đăng nhập.
Khi đăng nhập hệ thống, chương trình sẽ tự động tạo ra cậu lệnh truyên vấn dữ liệu với tham số được truyền vào từ form login,
```
SELECT * FROM leo.users WHERE email = $_POST['email'] AND password = md5($_POST['password']);
```
Với dữ liệu chúng ta vừa nhập, câu lệnh truy vấn sẽ là:

```
SELECT * FROM leo.users WHERE email = 'em@0biet.com' OR 1 = 1 LIMIT 1 -- ' ]' AND password = 'em_biet_tuot';
```
Sau kỹ tự “–“, hệ thống sẽ hiểu đó là comment, chương trình sẽ không thực thi những gì phía sau nó. Câu truy vấn có thể rút gọn lại:
```
SELECT * FROM leo.users WHERE email = 'em@0biet.com' OR 1 = 1 LIMIT 1
```
Điều kiện của câu lệnh truy vấn: email = ’em@0biet.com’ OR 1 = 1, nó luôn là true, đó là lý do vì sao chúng ta có thể vượt qua màn hình đăng nhập một cách dễ dàng..

Đó là 1 trong những cách cơ bản nhất mà hacker có thể tận dụng để tấn công. Ngoài ra còn 1 số cách tấn khác như:
* Xoá dữ liệu
* Cập nhật thay đổi dữ liệu
* Thêm mới dữ liệu vào hệ thống
* Thực hiện các commands trên server để tự động tải và cài đặt những phần mềm nguy hiểm hay virus.
* Lấy thông tin của khách hàng trên hệ thống như thông tin thẻ ngân hàng, thông tin đăng nhập.
## 3. Cách chống lại các cuộc tấn công SQL injection:
Vậy để ngăn chặn hình thức tấn công SQL Injection chúng ta phải làm thế nào? Như mình đã nói ở trên, Hacker lợi dụng sự lỏng lẻo về thiết kế của chương trình để tấn công, chúng ta cần có các biện pháp ngăn ngừa:
* Dữ liệu nhập vào từ form giao diện người dùng phải được “làm sạch” (sanitized) trước khi đưa vào các logic code để tạo ra câu lệnh truy vấn. (Đối với PHP thì sử dụng 1 vài funtion để cắt hay xóa những ký tự đặc biệt hoặc thẻ tag)
* Prepared statements, đảm bảo dữ liệu đầu vào được lọc mà không ảnh hưởng đến cấu trúc của câu lệnh truy vấn.
* Phân quyền truy cập vào Database server với từng mức độ theo yêu cầu của từng chức năng.
* Khi có lỗi về việc truy cập, truy vấn database, hệ thống nên đưa ra thông báo chung như: “Sorry, we are experiencing technical errors. Please try again later”, thay vì hiển thị nội dung, lý do gây lỗi của quá trình thực thi câu lệnh truy vấn, Hacker sẽ dựa vào đây để phán đoán và tìm cách phá hoại.

Well done! Như vậy chúng ta đã hiểu rõ được cách thực tấn công bằng SQL Injection cũng như làm thế nào để ngăn chặn.

Dưới đây là các khái niệm đơn giản nhất về SQL injection. Các bạn có thể tham khảo link dưới đây để biết chi tiết hơn nhé

https://portswigger.net/web-security/sql-injection