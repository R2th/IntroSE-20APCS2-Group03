# PHẦN 1. Tổng quan về MySQL
## 1.1 MySQL là gì?
- MySQL là 1 hệ thống cơ sở dữ liệu mã nguồn mở RDBMS,  cho phép người dùng có thể thực hiện các thao tác  liên quan đến cơ sở dữ liệu.
- Hoạt động theo mô hình client-server.
- Hiện nay có 2 phiên bản: miễn phí (MySQL Community Server) và có phí (Enterprise Server).
## 1.2 Ưu điểm của MySQL
- Dễ sử dụng
- Độ bảo mật cao
- Đa tính năng
- Ổn định 
- Tốc độ cao 
- Hỗ trợ nhiều ngôn ngữ lập trình
- Hoạt động trên nhiều hệ điều hành 
## 1.3 Nhược điểm của MySQL
- Hạn chế dung lượng 
- Độ tin cậy kém
- Bị giới hạn về chức năng mà một vài ứng dụng cần
# 2. Các kiểu dữ liệu trong MySQL
- Được chia làm ba loại chính: kiểu số, kiểu văn bản, kiểu ngày tháng
## 2.1 Kiểu số
| Data type | Description |
| -------- | -------- | 
| TinyINT (size) | lưu trữ số nguyên có giá trị từ -128 đến -127 hoặc 0~255 | 
| SmallINT (size)  | lưu trữ số nguyên có giá trị từ -32768 đến 32767 hoặc 0~65535 |
| MediumINT (size) | lưu trữ số nguyên có giá trị từ -8388608 đến 8388607 hoặc 0~16777215 | 
| INT (size)| lưu trữ số nguyên có gía trị từ -2147483648 đến 2147483647 hoặc 0~4294967295 |
| BigINT (size) | lưu trữ số nguyên có giá trị từ -9223372036854775808~9223372036854775807 hoặc 0~18446744073709551615 | 
| FLOAT (size,d)   | lưu trữ số thập phân loại nhỏ. |
| DOUBLE (size,d) |lưu trữ số thập phân loại lớn. | 
| DECIMAL (size,d) | lưu trữ chuỗi, cho phép 1 dấu thập phân cố định.   |
*(size,d): Tham số size để xác định kích thước tối đa của phần nguyên. Tham số d để xác định kích thước tối đa của phần thập phân.

## 2.2 Kiểu văn bản
| Data type | Description |
| -------- | -------- |
| CHAR (size)     | lưu trữ chuỗi ký tự có max lenght = 255 ký tự  | 
| VARCHAR (size) |lưu trữ chuỗi ký tự có max lenght = 255 ký tự. Nếu đặt size > 255 thì nó sẽ chuyển sang kiểu TEXT.  |
| TinyTEXT |lưu trữ chuỗi ký tự có max lenght = 255 ký tự  |
|TEXT | lưu trữ chuỗi ký tự có max lenght = 65,535 byte|
| BLOB |lưu trữ dữ liệu nhị phân tối đa = 65,535 byte|
| MediumTEXT | lưu trữ chuỗi ký tự có max lenght = 16,777,215 ký tự  |
| MediumMBLOB | lưu trữ dữ liệu nhị phân tối đa = 16,777,215 byte |
| LongTEXT | lưu trữ chuỗi ký tự có max lenght = 4,294,967,295 ký tự |
| LongBLOB | lưu trữ dữ liệu nhị phân tối đa = 4,294,967,295 byte |
## 2.3 Kiểu ngày tháng 
| Data type | Description | 
| -------- | -------- |
| DATE()     | lưu trữ ngày theo format YYYY-MM-DD  | 
| TIME()     | lưu trữ thời gian theo format HH:MI:SS     | 
| YEAR()     | lưu trữ năm theo format 2 số hoặc 4 số | 
| DATETIME()   | lưu trữ ngày và thời gian theo format YYYY-MM-DD HH:MI:SS    | 
# 3. Một số cú pháp cơ bản của MySQL
## 3.1 Cú pháp tạo Database
- Câu lệnh:
**CREATE DATABASE database_name;**
- Câu lệnh để chọn 1 database:
**USE database_name;**
## 3.2 Câu lệnh tạo bảng
Cú pháp:
**CREATE TABLE table_name ( column_name1 data_type(size), column_name2 data_type(size), column_name3 data_type(size), …. );**
Trong đó:
- table_name: tên của bảng muốn tạo.
- column_name1: tên cột thứ nhất của bảng. 
- data_type: kiểu dữ liệu của cột.
- size: kích thước tối đa của kiểu dữ liệu của cột.
## 3.3 Cú pháp thêm dữ liệu vào bảng
**INSERT INTO table_name (column1,column2,column3)
VALUES (value1,value2,value3);**
Trong đó:
- column1, column2, column3:  tên của cột 1, cột 2, cột 3.
- value1, value2, value3: giá trị của cột 1, cột 2, cột 3.
## 3.4 Cú pháp xóa 
- Cú pháp xóa database:
**DROP DATABASE db_name;**
- Cú pháp xóa bảng:
**DROP TABLE tb_name;**
## 3.5 Câu lệnh truy xuất dữ liệu
- Cú pháp 1:
**SELECT * FROM name_table;**
- Cú pháp 2:
**SELECT name_column1, name_column2 FROM name_table;**


**Chú thích:**
- Mô hình client-server: Máy tính cài đặt và chạy phần mềm RDBMS được gọi là client (máy khách). Mỗi khi chúng cần truy cập dữ liệu, chúng kết nối tới máy chủ (server) RDBMS
- RDBMS: Relational Database Management System