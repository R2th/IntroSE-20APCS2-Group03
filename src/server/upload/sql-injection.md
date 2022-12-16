### Giới thiệu
SQL Injection là một kiểu hack phổ biến hiện nay, lợi dụng lổ hổng của việc kiểm tra dữ liệu đầu vào của các trang web và các thông báo lỗi của hệ quản trị cơ sở dữ liệu trả về để "tiêm vào" và thực thi các câu lệnh SQL bất hợp pháp. SQL Injection có thể cho phép hacker thao tác, thêm, sửa, xóa… trên cơ sở dữ liệu, không chỉ thế hacker còn có thể cài đặt backdoor trên server mà ứng dụng đang chạy => qua đó có thể kiểm soát cả hệ thống.

### Hướng khai thác
Những đoạn script SQL có thể được "tiêm" vào câu query thông qua nhiều cách khác nhau như:

#### Thông qua “user input”
Điển hình là những form nhập data, form search hay link,... những dữ liệu này được web browser gửi đến server thông qua phương thức HTTP GET, POST <br>
VD: Form search ở dưới, khi nhập vào “SQL Injection” thì ứng dụng web sẽ truy cập vào CSDL tìm và trả ra các record khớp với từ khóa.

![](https://images.viblo.asia/347b14c8-25da-4498-93ae-8d50e44ff2c1.png)


VD: ứng dụng web sẽ tìm user với id = 7 
![](https://images.viblo.asia/a7bc340c-aa8b-4715-a22e-6608b1bfc3ec.png)
#### Thông qua cookies
Cookies là những tệp tin lưu trữ thông tin trạng thái của người dùng khi truy cập các ứng dụng web. Những thông tin này do người lập trình quyết định, được tạo ra ở server và lưu trữ tại client. Khi người dùng truy cập lại ứng dụng web, cookies được browser gửi lên server giúp phục hồi lại những trạng thái của người dùng trong lần truy cập trước đó.

![](https://images.viblo.asia/6b5aa85f-3f5f-4fb3-8343-e9e7644669ab.png)

Do được lưu trữ ở client nên người dùng có thể chỉnh sửa tùy ý, vì vậy nếu ứng dụng web sử dụng những thông tin lưu trong cookies để xây dựng các truy vấn tới cơ sở dữ liệu thì hacker hoàn toàn có thể chèn vào cookies những Script SQL để thực hiện một cuộc tấn công SQL Injection.

### HACKSPLAINING
Đây là 1 [trang web](https://www.hacksplaining.com/) khá là thú vị có khá là nhiều bài học về bảo mật ứng dụng, mỗi bài học ở đây gồm 3 phần: Exercise, Prevention và Quiz, sau đây mình sẽ giới thiệu sơ qua về phần exercise của bài SQL Injection.
![](https://images.viblo.asia/427fdf9f-3b9c-4bff-b9a0-900ff0cf8b0d.png)


**Đầu tiên có 1 form đăng nhập gồm email, password và console để show logs server**
![](https://images.viblo.asia/2635e8ba-f8f8-4dff-9fd0-a8aba150c407.png)

**Làm theo hướng dẫn nhập email và password sau đó submit**

![](https://images.viblo.asia/5f9c15cf-a141-4a82-9dfc-ce354f42e6d6.png)<br>

Sau khi submit thì có lỗi trả về, ở đây tiếp tục làm theo hướng dẫn, thêm một dấu nháy đơn đằng sau **password'** <br>
Dấu nháy đơn: trong ngôn ngữ SQL dùng để “gói” chuỗi. Ta thường thêm nó vào sau tham số kiểu số trên chuỗi truy vấn để kiểm tra có lỗi hay không.


![](https://images.viblo.asia/2b7206d3-a7b9-42b7-8257-0c7f7289b71d.png)
![](https://images.viblo.asia/c16658bb-8696-4a89-bf84-8c38ec60c386.png)

Ở trên ta có thể thấy server báo lỗi, có một ký tự lạ đằng sau **password'** và raise lỗi **SyntaxError**, khi gặp lỗi này nghĩa là đằng sau server ta có thể viết code SQL bằng cách cộng chuỗi và đây là dấu hiệu để có thể tấn công SQL Injection <br>

![](https://images.viblo.asia/b00f9e38-e56a-48b1-92e8-9e63c74b2c93.png)

**Hacker có thể tấn công bằng cách thêm một chuỗi giả như dưới đây**

![](https://images.viblo.asia/606e0f50-b829-49fd-ba04-9f95a5cf3e11.png)

**Vì lúc này điều kiện pass  = ' ' or 1=1 là luôn luôn đúng, và như vậy thì hệ thống sẽ nghĩ mình login thành công => cho phép login và xem được những thông tin cá nhân của user**

![](https://images.viblo.asia/c75b05ef-7571-4d4b-97d3-a8449b63848c.png)

### Nguồn
Trên đây là bài viết cơ bản những gì mình hiểu về SQL Injection nên còn nhiều thiếu sót mong bạn đọc thông cảm, để hiểu thêm về SQL Injection có thể tham khảo thêm link bên dưới <br>
https://whitehat.vn/threads/sql-injection-paper-v1-0.37/<br>
https://www.w3schools.com/sql/sql_injection.asp<br>
https://www.hacksplaining.com/