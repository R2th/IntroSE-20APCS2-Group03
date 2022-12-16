# 1. SQL là gì?
**SQL** được viết tắt từ **Structured Query Language**, là ngôn ngữ truy vấn có cấu trúc.
Về cơ bản, Ngôn ngữ truy vấn có cấu trúc này được sử dụng để truy xuất dữ liệu hoặc giao diện khác như tạo, xóa trong cơ sở dữ liệu, lấy các hàng và sửa đổi các hàng .v.v. với cơ sở dữ liệu quan hệ. 

SQL cho phép bạn truy cập và thao tác cơ sở dữ liệu. Nó là ngôn ngữ được dành riêng cho sử dụng trong lập trình và được thiết kế quản lý dữ liệu được giữ trong hệ thống quản lý cơ sở dữ liệu quan hệ hoặc để xử lý luồng trong hệ thống quản lý luồng dữ liệu quan hệ. SQL được sử dụng để giao tiếp với cơ sở dữ liệu. Theo ANSI (American National Standards Institute_Viện Tiêu chuẩn Quốc gia Hoa Kỳ), SQL là ngôn ngữ tiêu chuẩn cho các hệ thống quản lý cơ sở dữ liệu quan hệ.
# 2. Các chức năng của SQL
* Với SQL, người dùng có thể thực thi các truy vấn đối với cơ sở dữ liệu
* Lấy dữ liệu từ cơ sở dữ liệu
* Chèn các records (bản ghi) trong cơ sở dữ liệu
* Cập nhật các records trong cơ sở dữ liệu
* Xóa các bản ghi từ cơ sở dữ liệu
* Tạo cơ sở dữ liệu mới
* Tạo các thủ tục được lưu trữ trong cơ sở dữ liệu
* Tạo các view, stored procedure, functions trong cơ sở dữ liệu
* SQL còn cho phép thiết lập quyền truy cập trên bảng, procedure và view
# 3. Các ngôn ngữ truy vấn dữ liệu SQL
* DDL (Data Definition Language): Ngôn ngữ định nghĩa dữ liệu
* DML (Data Manipulation Language): Ngôn ngữ thao tác dữ liệu
* DQL (Data Query Language): Ngôn ngữ truy vấn dữ liệu
* DCL (Data Control Language): Ngôn ngữ kiểm soát dữ liệu
* TCL (Transaction Control Language): Ngôn ngữ kiểm soát giao tác

![](https://images.viblo.asia/c70490b3-9111-4f20-8b54-31e81690f9ac.PNG)
# 4. Các câu lệnh SQL thường sử dụng
### a. CREATE
**Cú pháp:**
```
CREATE DATABASE databasename;
```
### b. SELECT
**Cú pháp:**
```
SELECT * FROM table_name;
or
SELECT column1, column2, ...
FROM table_name;
```
### c. WHERE
**Cú pháp:**
```
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```
Chú ý: mệnh đề **Where** không chỉ sử dụng cho câu lệnh **Select** mà còn sử dụng cho câu lệnh **Update**, **Delete**, vv
### d. INSERT INTO
**Cú pháp:**
```
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```
### e. UPDATE
**Cú pháp:**
```
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```
Chú ý: Hãy cẩn thận khi cập nhật các records trong bảng. Câu lệnh **Where** chỉ định record(s) nào thì record(s) đó sẽ được cập nhật. Nếu bỏ qua câu lệnh **Where** thì sẽ cập nhật tất cả các records trong bảng
### f. DELETE
**Cú pháp:**
```
DELETE FROM table_name WHERE condition;
```
Chú ý: Tương tự câu lệnh **Update**, hãy cẩn thận khi xóa các records trong bảng. Câu lệnh **Delete** chỉ định record(s) nào thì record(s) đó sẽ được xóa. Nếu bỏ qua câu lệnh **Where** thì sẽ xóa tất cả các records trong bảng
### g. JOINS
**Cú pháp:**
```
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```
**Để thực hành các câu lệnh trên, mọi người có thể tham khảo: https://www.w3schools.com/sql/default.asp**