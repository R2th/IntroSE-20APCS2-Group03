# Giới thiệu

MYSQL là một hệ quản trị cơ sở dữ liệu mã nguồn mở giúp cho người dùng lưu trữ, tổ chức và sau đó lấy dữ liệu. Nó có nhiều lựa chọn cung cấp cho người dùng để thao tao với bảng và cơ sở dữ liệu. Bài viết này hướng dẫn việc tạo user và cấp quyền trong MYSQL.

Ngay khi bắt đầu sử dụng MySQL database, bạn sẽ được cung cấp username và password. Những thông tin đăng nhập này sẽ cho bạn quyền “root access”. Một user root có toàn quyền truy cập tới database và bảng trong databases. Nhưng qua thời gian hoặc thao tác trên database production chẳng hạn, bạn sẽ cần cấp quyền truy cập tới database tới một user mà không cho phép họ sử dụng toàn quyền. 

# Tạo 1 user mới như thế nào trong MySQL?

Để tạo user mới, bạn thực hiện các bước như sau:

1. Truy cập vào mysql
2. Thực thi câu lệnh để tạo user:
```
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
```

> newuser: tên user
> 
> password: mật khẩu của user

Tại thời điểm này, user mới không có quyền làm bất cứ điều gì với cơ sở dữ liệu. Trên thực tế, ngay cả khi user mới cố gắng đăng nhập,họ sẽ không thể truy cập vào MySQL shell.

Do vậy, điều đầu tiên cần làm là cung cấp cho user quyền truy cập vào các thông tin họ cần

3.  Gán quyền cho user
```
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
```

Dấu * ở trên tương ứng với cơ sở dữ liệu và bảng mà user có thể truy cập - cụ thể là lệnh này cho phép người dùng thêm, sửa, xóa thực thi các công việc trên tất cả các bảng trong cơ sở dữ liệu

4. Để thay đổi được thực hiện ngay lập tức, hãy dùng lệnh sau:
```
FLUSH PRIVILEGES;
```

Như vậy, với các bước ở trên, user mới tạo của bạn có toàn quyền như là user root

# Một số quyền bạn có thể gán cho user trong MySQL
Dưới đây là danh sách các lệnh thường dùng để gán quyền cho user:

* ALL PRIVILEGES – Cho phép MySQL user thực hiện toàn quyền trên databases (hoặc 1 vài db được thiết lập)
* CREATE – Cho phép user tạo mới tables hoặc databases
* DROP – Cho phép xóa tables hoặc databases
* DELETE – Cho phép xóa bản ghi dữ liệu trong bảng tables
* INSERT – Cho phép thêm bản ghi mới vào bảng csdl
* SELECT – Cho phép sử dụng lệnh Select để tìm kiếm dữ liệu
* UPDATE – Cho phép cập nhật csdl
* GRANT OPTION – Cho phép gán hoặc xóa quyền của người dùng khác.

MySQL cho phép gán quyền cho user với một dòng lệnh đơn giản:

```
GRANT type_of_permission ON database_name.table_name TO 'username'@'localhost';
```

Nếu bạn muốn cho phép user truy cập tất cả databases hoặc tất cả bảng, hãy dùng dấu * thay cho tên database hoặc table.

Mỗi lần bạn cập nhật hay thay đổi quyền hãy dùng lệnh Flush Privileges đảm bảo các thay đổi có hiệu lực.
```
FLUSH PRIVILEGES;
```

Để áp dụng nhiều loại quyền, ngăn cách chúng bằng dấu phẩy. Ví dụ, bạn có thể gán quyền CREATE và SELECT cho một user:
```
GRANT CREATE, SELECT ON database_name.table_name TO 'username'@'localhost';
```

Nếu cần thu hồi lại quyền của user, hãy dùng lệnh REVOKE:
```
REVOKE type_of_permission ON database_name.table_name FROM 'username'@'localhost';
```

Ví dụ, để thu hồi toàn bộ các quyền cho một user:

```
REVOKE ALL PRIVILEGES ON *.* FROM 'username'@'localhost';
```

Hoặc bạn cũng có thể xóa user:

```
DROP USER 'username'@'localhost';
```

Bạn có thể kiểm tra user mới tạo đã thành công và có thể đăng nhập được hay chưa, đầu tiên thực hiện logout bằng cách:

```
quit
```

và login bằng lệnh

```
mysql -u[username] -p[password]
```

**NOTE:** Hãy nhớ, để thực thi những quyền này bạn cần có quyền root. Cũng như vậy, hãy chắc đã thực thi FLUSH PRIVILEGES sau khi tạo bất kỳ thay đổi nào về quyền.

# Hiển thị quyền của một user trong MySQL như thế nào?

Để biết quyền gì bạn có để gán cho một MySQL, bạn có thể sử dụng lệnh SHOW GRANTS:

```
SHOW GRANTS FOR 'username'@'localhost';
```

# Tham khảo
https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql