Nếu bạn vẫn chưa biết SQL Injection là gì? Nó nguy hiểm như thế nào thì hãy đọc bài  [Tìm hiểu về SQl Injection](https://viblo.asia/p/tim-hieu-ve-sql-injection-eW65G6xjlDO) rồi quay lại nhé.

Trong bài này hãy cùng mình tìm hiểu các cách giảm thiểu và phòng tránh SQL Injection. 

### 1. Tham số hóa truy vấn 

Sử dụng tham số hóa truy vấn là một trong những cách tốt nhất để ngăn chặn việc tiêm nhiễm SQL. 
Cấu trúc của truy vấn và truyền các tham số giá trị được tách biệt. 

Ví dụ:

Nếu như bình thường câu SQL là: 

`sqlQuery = SELECT * FROM Users WHERE Username = ' + username + ' AND Password = ' + password + ';`

Thì khi tham số hóa nó sẽ có dạng

```
sqlQuery = SELECT * FROM Users WHERE Username =? AND Password =?';
parameters.add("Username", username)
parameters.add("Password", password)
```

Khi sử dụng tham số thì câu SQL sẽ không chỉ nhận giá trị input vào và chỉ việc thay thế. Thay vào đó câu lệnh SQL đã được chuyển đến SQL server, tức là nó đã biết sẵn nó sẽ truy vấn cái gì cùng với một danh sách các thông số và giá trị đã input. 

Giờ nếu bạn truyền giá trị input là Username = ***hackne" OR 1 = 1 ;--***     Password= ***khongbiet***. 

Nếu không sử dụng tham số hóa truy vấn nó sẽ thay thế giá trị và chạy với câu lệnh 
```
SELECT * FROM Users WHERE Username = "hackne" OR 1 = 1 ;--' AND Password = "khongbiet"
```

Nhưng khi sử dụng tham số hóa truy vấn ở trên. Cơ sở dữ liệu nó đã biết truy vấn sẽ làm gì.  Nó sẽ xem Username = ***hackne" OR 1 = 1 ;--***     Password= ***khongbiet*** là các giá trị truyền vào. Khi thực hiện truy vấn sẽ tìm Username = ***hackne" OR 1 = 1 ;--***     Password= ***khongbiet*** và kết quả này sẽ dẫn tới sai thông tin đăng nhập. 

### 2. Xác thực dữ liệu đầu vào của người dùng

Ngay cả khi đã sử dụng tham số hóa truy vấn, thì việc xác thực dữ liệu đầu vào là thực sự cần thiết để đảm bảo các thuộc tính dữ liệu là phù hợp như kiểu dữ liệu: Text, Number, Special characters, độ dài input,... thì những yếu tố này có thể validate ngay ở form input.

Nếu sai thuộc tính dữ liệu sẽ bị lỗi ngay không cần phải chờ tới lúc SQL chạy nữa. Với cách kiểm soát đơn giản về kiểu dữ liệu như vậy cũng đã hạn chế đáng kể các cuộc tấn công. 

Như ví dụ trên nếu ở form input trường username được validate chỉ cho phép nhập văn bản  và chữ số. Không cho phép nhập kí tự đặc biệt thì khi nhập Username = ***hackne" OR 1 = 1 ;--*** nó sẽ trả về lỗi ngay mà không cần thực thi SQL 

### 3. Ẩn thông tin của các thông báo 

Thông báo lỗi quá chi tiết cũng là điểm hữu ích cho những kẻ tấn công tìm hiểu cấu trúc CSDL của hệ thống. 

Ví dụ ở form reset password nếu nhập 1 email không tồn tại hệ thống thì nó sẽ có thông báo lỗi Email không tồn tại hoặc email đúng thì nó sẽ thông báo thành công. Trường hợp này thì những kẻ tấn công sẽ dễ dàng dò và biết được trong hệ thống đang có những user nào. 

Thay vào đó có thể xử lý bằng cách, nhập với bất kì email nào nó cũng sẽ thông báo thành công. Nếu email tồn tại trong hệ thống thì sẽ nhận được email reset password. Email nào không tồn tại thì sẽ không nhận được mail. Với cách này thì kẻ tấn công sẽ không thể dò được tài khoản của hệ thống. 

Sẽ tùy từng trường hợp mà việc xử lý mã lỗi làm sao cho hợp lý nhất. Thông báo lỗi chỉ nên hiển thị các thông tin cần thiết. Với những thông tin quan trọng thì tốt hơn là chỉ hiển thị thông báo lỗi chung cho biết có lỗi xảy ra và khuyến khích người dùng liên hệ với bộ phận support 

### 4. Hạn chế quyền 

Hạn chế dùng tài khoản root hoặc sa để truy cập DB. Thay vào đó hãy tạo account và gán một số quyền nhất định. Lúc này lỡ hacker có hack được tài khoản thì cũng sẽ không có toàn quyền truy cập hệ thống, hạn chế được rủi ro.

Việc xác định người dùng khác nhau với các đặc quyền khác nhau cũng rất là hữu ích trong quá trình phát triển hệ thống.  Giảm thiểu rủi ro của cuộc tấn công tiêm nhiễm SQL. 

### 5. Backup dữ liệu thường xuyên 

Việc backup dữ liệu thường xuyên là thực sự cần thiết. Nếu không may bị hacker tấn công xóa dữ liệu, hoặc đơn giản đôi khi Dev cũng lỡ vui tay xóa nhầm. Thì dữ liệu backup là trùm cuối để có thể giải quyết tất cả các vấn đề!


Nguồn tham khảo thêm: 
https://www.ptsecurity.com/ww-en/analytics/knowledge-base/how-to-prevent-sql-injection-attacks/