## 1. SQL là gì?
SQL là viết tắt của Structured Query Language, là ngôn ngữ truy vấn mang tính cấu trúc.
Nó được thiết kế để quản lý dữ liệu trong một hệ thống quản lý cơ sở dữ liệu quan hệ (RDBMS).

SQL là ngôn ngữ cơ sở dữ liệu, được sử dụng để tạo, xóa trong cơ sở dữ liệu, lấy ra các giá trị và sửa đổi các các giá trị trong CSDL.

**Lệnh trong SQL**

Các lệnh SQL chuẩn để tương tác với Database là CREATE, SELECT, INSERT, UPDATE, DELETE và DROP. Các lệnh này có thể được phân loại thành các nhóm dựa trên bản chất của chúng.
## 2. Lỗi chèn mã SQL trong các ứng dụng web và nguyên nhân.
### 2.1 SQL Injection là gì?

SQL Injection là một kỹ thuật được thực thi bằng cách chèn các câu truy vấn SQL vào dữ liệu tương tác giữa máy khách và trình ứng dụng. Quá trình khai thác lỗi SQL Injection thành công có thể giúp tin tặc lấy được các dữ liệu nhạy cảm trong cở sở dữ liệu, thay đổi cơ sở dữ liệu (Insert/Update/Delete), thực thi các hành động với quyền của người quản trị và cao hơn có thể điều khiển được hệ điều hành máy chủ

### 2.2 Nguyên nhân gây ra các lỗi bảo mật SQL injection
Trước hết chúng ta cần biết được cơ chế hoạt động của Web
![](https://images.viblo.asia/5fc2422c-f2cf-4c2e-a74f-dfe812200fd7.png)

Hai phương thức truyền dữ liệu cơ bản mà các ứng dụng web sử dụng là GET method và POST method

* Method GET: Dữ liệu gửi từ trình duyệt lên qua phương thức GET là phần dữ liệu được nhập trực tiếp theo sau địa chỉ URL do trình duyệt gửi lên,
* Method POST: Post là phần dữ liệu được gửi qua các form HTML có method =”POST”.Để lấy các biến theo kiểu POST, PHP sẽ tự động sinh ra mảng có tên là $POST[]. Mảng này có chỉ số chính là tên của các phần tử trong form (các thẻ input, select… có thuộc tính name) và giá trị là nội dung giá trị do người sử dụng nhập vào các phần tử có tên tương ứng.

Do đây là hình thức truyền dữ liệu từ client đến server đo đó việc không kiểm tra chính xác các dữ liệu được cung cấp bởi người sử dụng sẽ gây ra các lỗi bảo mật sql injection.

Lỗi bảo mật Sql Injection có thể tồn tại ở bất kể nơi nào tại giao diện người sử dụng với những yêu cầu dữ liệu được truyền đến server qua hai dạng giao thức truyền dữ liệu POST & GET. Qua hai giao thức truyền dữ liệu này người sử dụng có khả năng gửi các yêu cầu xử lý dữ liệu của mình qua các câu lệnh sql được tạo ra từ ngôn ngữ lập trình đến hệ quản trị cơ sở dữ liệu mysql. Nắm được được vấn đề này các hacker có thể chèn thêm các đoạn mã sql vào trong phần dữ liệu được gửi từ trình duyệt để tạo các các đáp ứng bất thường do máy chủ truyền lại.
## 3. Các dạng tấn công SQL Injection trong ứng dụng web

### 3.1 Inline injection

Đây là một dạng tấn công bằng cách chèn các mệnh đề login luôn luôn đúng vào giao thức truyền dữ liệu đề tạo thành một dạng truy vấn luôn cho ra kết quả đúng. 
Xét với ví dụ form đăng nhập, khi ta nhập chính xác username và password thì câu lệnh SQL được thực thi sẽ là 

```
SELECT * FROM `sql`.`users` WHERE `name`='user1' AND `pass`='user1'
```
Câu truy vấn này sẽ tìm các record trong table `users` có giá trị ‘name` = `user1` và ‘pass’=’user1`, do đó chỉ khi nào chúng ta biết và nhập chính xác thì mới có thể đăng nhập vào trang web.Tuy nhiên ứng dụng này tồn tại lỗi SQL Injection do đó nếu ta thay giá trị gửi từ form lên server như hình dưới đây thì chúng ta vẫn có thể đăng nhập một cách bình thường.

![](https://images.viblo.asia/832b339d-92f9-417d-89c6-ee90220d1c2f.png)

Bằng việc thêm vào mệnh đề ‘or ‘1’=’1 chúng ta sẽ có được câu truy vấn như sau:

```
SELECT * FROM `sql`.`users` WHERE `name`='user1' or '1'='1 ' AND `pass`='test'
```
### 3.2 Terminating Injection:
![](https://images.viblo.asia/c90dc42d-7a7d-454d-a6d2-db497a556a7a.png)
Bằng việc thêm dấu "--" hệ thống sẽ thực hiện câu truy vấn như sau

```
SELECT * FROM `sql`.`users` WHERE `name`='user1' or '1'='1'-- AND `pass`='test'
```
Sử dụng dấu “–” và ”” để loại bỏ phần đoạn mã đằng sau thi hành injection. Vì bản chất dấu -- được xem như dấu comment trong code và câu lệnh bên trên sẽ không cần xét đến password mà cho phép hacker đăng nhập thẳng vào hệ thống vì phần phía trước dấu "--" được xem là câu lệnh luôn đúng
### 3.3 Blind Injection
Các ứng dụng web truy cập cơ sở sự liệu với nhiều mục đích, một trong các mục đích chính là trình bày và hiển thị nội dung khi người sử dụng yêu cầu. Bằng các thủ thuật thay đổi giá trị dữ liệu khi gửi lên server chúng ta có thể tìm thấy được các lỗi phát sinh ở phẩn trên, đây là các lỗi tiềm tàng cho một cuộc tấn công bằng SQL Injection. Tuy nhiên trong một số trường hợp các lỗi bảo mật này sẽ không hiển thị trên trang web, điểu này không bảo đảm chắc chắn rằng trang web không bị tấn công bằng SQL Injection.

Với dữ liệu nhập bên trên sẽ tạo ra câu lệnh SQL như sau:

![](https://images.viblo.asia/c0c9a812-e973-4dc5-a066-4b79f38cd06f.jpg)

```
SELECT * FROM `sql`.`users` WHERE `name`='user1' AND `pass`='' or 1=1--''
```
Mặc dù chúng ta không biết được mật khẩu của user1 nhưng chúng ta vẫn đăng nhập một cách thành công, bởi vì với câu lệnh trên mệnh đề truy vấn luôn luôn đúng với mọi trường hợp. Rõ ràng tại đây phát sinh một lỗi SQL Injection nhưng server không hề trả lại một thông báo nào.

## 4. Cách Phòng Tránh SQl Injection
Ta có thể phòng tránh các lỗi sql injection bằng hai cách:

* Kiểm tra giá trị nhập vào: Ðể phòng tránh các nguy cơ có thể xảy ra, hãy bảo vệ các câu lệnh SQL bằng cách kiểm soát chặt chẽ tất cả các dữ liệu nhập nhận được từ đối tượng GET và POST, luôn luôn kiểm tra và xác minh các ký tự: ‘.#,–,/ / và các từ khóa nhạy cảm như: select, insert, union, delete.
* Thiết lập cấu hình an toàn cho hệ quản trị database: Cần có cơ chế kiểm soát chặt chẽ và giới hạn quyền xử lí dữ liệu đến tài khoản người dùng mà ứng dụng web đang sử dụng. Quyền càng bị hạn chế, thiệt hại càng ít.Ngoài ra để tránh các nguy cơ từ SQL Injection attack, nên chú ý loại bỏ bất kì thông tin kĩ thuật nào chứa trong thông điệp chuyển xuống cho nguời dùng khi ứng dụng có lỗi. Các thông báo lỗi thông thường tiết lộ các chi tiết kĩ thuật có thể cho phép hacker biết dược điểm yếu của hệ thống.

**Các ứng dụng giúp kiểm tra các lỗi SQL Injection:**

* HP WebInspect
* IBM Rational AppScan
* Adobe Flash Player

***Tài liệu tham khảo***

Giáo trình An toàn bảo mật hệ thống thông tin Học viện Công nghệ Bưu chính Viễn Thông