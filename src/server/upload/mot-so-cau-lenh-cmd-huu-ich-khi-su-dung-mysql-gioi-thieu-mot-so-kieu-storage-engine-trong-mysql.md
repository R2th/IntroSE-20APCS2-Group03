Khi chạy các lệnh này, bạn cần login vào MySQL với tài khoản root hoặc tài khoản có full quyền.

Đăng nhập MySQL bạn dùng lệnh:` mysql -u root -p`
# 1. Quản lý tài khoản và phân quyền
``` sql
#Hiển thị toàn bộ users:
mysql> SELECT * FROM mysql.user;

#Xóa null user:
mysql> DELETE FROM mysql.user WHERE user = ' ';

#Xóa tất cả user mà không phải root:
mysql> DELETE FROM mysql.user WHERE NOT (host="localhost" AND user="root");

#Đổi tên tài khoản root (giúp bảo mật):
mysql> UPDATE mysql.user SET user="mydbadmin" WHERE user="root";

#Gán full quyền cho một user mới:
mysql> GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' IDENTIFIED BY 'mypass' WITH GRANT OPTION;

#Phân quyền chi tiết cho một user mới:
mysql> GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON mydatabase.* TO 'username'@'localhost' IDENTIFIED BY 'mypass';

#Gán full quyền cho một user mới trên một database nhất định:
mysql> GRANT ALL PRIVILEGES ON mydatabase.* TO 'username'@'localhost' IDENTIFIED BY 'mypass' WITH GRANT OPTION;

#Thay đổi mật khẩu user:
mysql> UPDATE mysql.user SET password=PASSWORD("newpass") WHERE User='username';

#Xóa user:
mysql> DELETE FROM mysql.user WHERE user="username";

#Cuối cùng reload user
mysql> FLUSH PRIVILEGES;
mysql> exit;
```
# 2.Các thao tác database
``` sql
#Hiển thị toàn bộ databases:
mysql> SHOW DATABASES;
#Tạo database:
mysql> CREATE DATABASE mydatabase;

#Sử dụng một database:
mysql> USE mydatabase;

#Xóa một database:
mysql> DROP DATABASE mydatabase;

#Tối ưu database:
#All Databases:
$ sudo mysqlcheck -o --all-databases -u root -p
#Single Database:
$ sudo mysqlcheck -o db_schema_name -u root -p
```
# 3.Các thao với các bảng
``` sql
#Hiển thị toàn bộ table:
mysql> SHOW TABLES;

#Hiển thị dữ liệu của table:
mysql> SELECT * FROM tablename;

#Đổi tên table :
mysql> RENAME TABLE first TO second;
#hoặc
mysql> ALTER TABLE mytable rename as mynewtable;

#Xóa table:
mysql> DROP TABLE mytable;
```
 # 4. Thao tác trên các cột và hàng
``` sql
 mysql> USE mydatabase;

#Hiển thị các column trong table:
mysql> DESC mytable;
#hoặc
mysql> SHOW COLUMNS FROM mytable;

#Đổi tên column:
mysql> UPDATE mytable SET mycolumn="newinfo" WHERE mycolumn="oldinfo";

#Select dữ liệu:
mysql> SELECT * FROM mytable WHERE mycolumn='mydata' ORDER BY mycolumn2;

#Insert dữ liệu vào table:
mysql> INSERT INTO mytable VALUES('column1data','column2data','column3data','column4data','column5data','column6data','column7data','column8data','column9data');

#Xóa dữ liệu trong table:
mysql> DELETE FROM mytable WHERE mycolumn="mydata";

#Cập nhật dữ liệu trong table:
mysql> UPDATE mytable SET column1="mydata" WHERE column2="mydata";
```
# 5. Sao lưu và phục hồi trên mysql
``` sql
#Sao lưu toàn bộ database bằng lệnh (chú ý không có khoảng trắng giữa -p và mật khẩu):
mysqldump -u root -pmypass --all-databases > alldatabases.sql

#Sao lưu một database bất kỳ:
mysqldump -u username -pmypass databasename > database.sql

#Khôi phục toàn bộ database bằng lệnh:
mysql -u username -pmypass < alldatabases.sql (no space in between -p and mypass)

#Khôi phục một database bất kỳ:
mysql -u username -pmypass databasename < database.sql

#Chỉ sao lưu cấu trúc database:
mysqldump --no-data --databases databasename > structurebackup.sql

#Chỉ sao lưu cấu trúc nhiều database:
mysqldump --no-data --databases databasename1 databasename2 databasename3 > structurebackup.sql

#Sao lưu một số table nhất định:
mysqldump --add-drop-table -u username -pmypass databasename table_1 table_2 > databasebackup.sql
```
# 6. Giới thiệu MySQL: MyISAM & InnoDB & Memory
Chúng ta đã biết MySQL là hệ quản trị cơ sở dữ liệu miễn phí được sử dụng nhiều trong PHP. Khi tạo bảng trong MySQL sẽ có nhiều kiểu Storage Engine để lựa chọn. MyIsam & Innodb & Memory là 3 thằng sử dụng nhiều nhất. Thử tìm hiểu về chúng xem.

## a. MyISAM
Đây là kiểu Storage Engine mặc định khi tạo bảng và được dùng phổ biết nhất. Storage Engine này cho phép lập chỉ mục toàn cột (Full-text search indexes). Do đó, Storage Engine này cho tốc độ truy suất (Đọc và tìm kiếm) nhanh trong các Storage Engine.

Nhược điểm của MyISAM là sử dụng cơ chế table-level locking nên khi cập nhật (Thêm,xóa,sửa) 1 bản ghi nào đó trong cùng 1 table thì table đó sẽ bị khóa lại, không cho cập nhật (Thêm,xóa,sửa) cho đến khi thao tác cập nhật trước đó thực hiện xong.

## b. InnoDB
Không như trước đây, giờ đây InnoDB cũng đã hỗ trợ Full-text search indexes từ phiên bản 5.6. Và thêm cái hay nữa là nó hỗ trợ khóa ngoại Foreign key.

Tốc độ insert/update/delete tốt nhất do hoạt động theo cơ chế Row Level Locking nên khi cập nhật (Thêm,xóa,sửa) 1 bảng thì chỉ có bản ghi đang bị thao tác bị khóa mà thôi, các hoạt động khác trên table này vẫn diễn ra bình thường.

## c. MEMORY
MEMORY engine (HEAP) là engine phù hợp nhất cho việc truy cập dữ liệu nhanh, vì mọi thứ đều được lưu trữ trong RAM. Khi khởi động lại MySQL hay Server, tất cả dữ liệu sẽ bị xóa hết.
![](https://images.viblo.asia/b1091026-52a6-4a89-83bd-47d0f1b2cc5e.png)

## Túm lại

Dùng **MyISAM** với những thằng có tần suất đọc cao như 24h, vnexpress, blog, ...
Dùng **InnoDB** với những thằng hay động vào DB như Diễn đàn, Mạng xã hội, ...
Dùng **MEMORY** cho các table chứa dữ liệu tạm và thông tin phiên làm việc của người dùng (Session)

các bạn có thể tham khảo thêm một số câu lệnh tại: http://g2pc1.bu.edu/~qzpeng/manual/MySQL%20Commands.htm?fbclid=IwAR2rWLuz3CsBUW7G3QeU4jij7mEvNCUrIMhA3KVq-FAPCUCpqNZ1s1lsbeU
Cảm ơn các bạn đã đọc bài viết :)