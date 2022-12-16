## Giới thiệu
Hiện nay hầu hết các ứng dụng Java hay các framework của nó đều dần chuyển sang các ORM(Object Relational Mapping) để làm việc với database, có thể kể đến là hibernate được sử dụng rộng rãi. Thế nên mọi người có xu hướng dần quên đi JDBC, thế nhưng các bạn có biết rằng bên dưới hibermate đang sử dụng JDBC để để kết nối đến database và thực thi các lệnh SQL được nó tạo ra.  Back to basic, cùng tìm hiểu JDBC là gì nha.

JDBC là viết tắt của Java Database Connectivity là một API dùng để kết nối và thực thi các câu lệnh SQL xuống database. JDBC API sử dụng JDBC driver để làm việc với database gồm 4 loại.

* JDBC-ODBC Bridge Driver
* Native Driver
* Network Protocol Driver
* Thin Driver

## Kiến trúc JDBC
Kiến trúc của JDBC gồm 2 tầng:

JDBC API – cho phép ứng dụng kết nối đến JDBC Manager connection.
JDBC Driver API: Hỗ trợ JDBC Manager đến Driver connection.
JDBC API cung cấp cơ chế kết nối đến đến các loại database khác nhau theo một chuẩn đồng nhất.

JDBC driver đảm bảo cho JDBC API kết nối đến database mà nó cần. Đối với mỗi database sẽ có JDBC driver riêng mà JDBC API có thể chỉ định để làm việc với nó.

## Các thành phần chính trong JDBC
JDBC API cung cấp một số class và interface:

DriverManager – class này chịu trách nhiệm quản lý danh sách các database driver, và chịu trách nhiệm tạo kết nối tương ứng đến database cụ thể được chỉ định.
Driver – Interface chịu trách nhiệm xử lý các hoạt động giao tiếp giữa ứng dụng với database.
Connection – Interface cung cấp tất cả các hàm cho việc thao tác với database.
Statement – dùng các object được tạo ra từ interface này để thực thi các câu lệnh SQL xuống database.
ResultSet: Lưu trữ kết quả trả về từ database.
SQLException – Xử lý các lỗi xảy ra trong database.


Nguồn tham khảo
[https://shareprogramming.net/jdbc-la-gi-khong-can-hoc-jdbc-dau/](https://shareprogramming.net/jdbc-la-gi-khong-can-hoc-jdbc-dau/)

[Tin tức số 24h](https://tintucso24h.com/)