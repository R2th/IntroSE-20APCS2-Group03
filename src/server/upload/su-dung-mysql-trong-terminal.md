> Bình thường có lẽ những newbie như mình thường sẽ sử dụng công cụ như workbench, PhpMyadmin,... để thao tác với cơ sở dữ liệu. Nhưng đối với hệ điều hành linux đã hỗ trợ cách dễ hơn, đơn giản hơn, nhanh hơn và ngầu hơn để làm điều đó. Mình sẽ giới thiệu với mọi người các câu lệnh để có thể sử dụng mysql trong terminal. 
Để truy cập vào cơ sở dữ liệu từ terminal ta sử dụng câu lệnh sau 
```
$ mysql -u root -p
```

Bạn gõ đúng thì terminal sẽ bắt bạn phải điền mk của mysql và kết quả nếu bạn nhập đúng là: 

```
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 4
Server version: 5.7.31-0ubuntu0.18.04.1 (Ubuntu)

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
```

Để thay đổi mk của user root bạn hãy sử dụng lệnh sau:
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```
Đê thoát khỏi mysql ta sử dụng lệnh 
```
mysql> quit
```
Để show hết database ở trong mysql ta dùng 
```
SHOW DATABASES;
```
Kết quả thu được có dạng như này 
```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)
```

Để tạo database 
```
mysql> CREATE DATABASE pets;
Query OK, 1 row affected (0.01 sec)
```

Để tạo bảng bên trong database đầu ta phải lựa chọn database để sử dụng 
```
mysql> USE pets
Database changed
```

Để tạo một bảng mới 

```
CREATE TABLE cats
(
  id              INT unsigned NOT NULL AUTO_INCREMENT, # Unique ID for the record
  name            VARCHAR(150) NOT NULL,                # Name of the cat
  owner           VARCHAR(150) NOT NULL,                # Owner of the cat
  birth           DATE NOT NULL,                        # Birthday of the cat
  PRIMARY KEY     (id)                                  # Make the id the primary key
);
```

Để xem tất cả các bảng có trong database 

```
mysql> SHOW TABLES;
+----------------+
| Tables_in_pets |
+----------------+
| cats           |
+----------------+
1 row in set (0.00 sec)
```

Để xem thông tin các cột trong bảng đấy 
```
mysql> DESCRIBE cats;
+-------+------------------+------+-----+---------+----------------+
| Field | Type             | Null | Key | Default | Extra          |
+-------+------------------+------+-----+---------+----------------+
| id    | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name  | varchar(150)     | NO   |     | NULL    |                |
| owner | varchar(150)     | NO   |     | NULL    |                |
| birth | date             | NO   |     | NULL    |                |
+-------+------------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)
```
Thêm một bản ghi vào trong bảng 
```
INSERT INTO cats ( name, owner, birth) VALUES
  ( 'Sandy', 'Lennon', '2015-01-03' ),
  ( 'Cookie', 'Casey', '2013-11-13' ),
  ( 'Charlie', 'River', '2016-05-21' );
  ```
  Xem các bản ghi có trong bảng 
  ```mysql> SELECT * FROM cats;
+----+---------+--------+------------+
| id | name    | owner  | birth      |
+----+---------+--------+------------+
|  1 | Sandy   | Lennon | 2015-01-03 |
|  2 | Cookie  | Casey  | 2013-11-13 |
|  3 | Charlie | River  | 2016-05-21 |
+----+---------+--------+------------+
3 rows in set (0.00 sec)
```
Xóa bàn ghi trong bảng 
```
mysql> DELETE FROM cats WHERE name='Cookie';
Query OK, 1 row affected (0.05 sec)

mysql> SELECT * FROM cats;
+----+---------+--------+------------+
| id | name    | owner  | birth      |
+----+---------+--------+------------+
|  1 | Sandy   | Lennon | 2015-01-03 |
|  3 | Charlie | River  | 2016-05-21 |
+----+---------+--------+------------+
2 rows in set (0.00 sec)
```
Thêm một cột vào trong bảng 
```
mysql> ALTER TABLE cats ADD gender CHAR(1) AFTER name;
Query OK, 0 rows affected (0.24 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> DESCRIBE cats;
+--------+------------------+------+-----+---------+----------------+
| Field  | Type             | Null | Key | Default | Extra          |
+--------+------------------+------+-----+---------+----------------+
| id     | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name   | varchar(150)     | NO   |     | NULL    |                |
| gender | char(1)          | YES  |     | NULL    |                |
| owner  | varchar(150)     | NO   |     | NULL    |                |
| birth  | date             | NO   |     | NULL    |                |
+--------+------------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)
```
Xóa cột trong bảng 
```
mysql> ALTER TABLE cats DROP gender;
Query OK, 0 rows affected (0.19 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> DESCRIBE cats;
+-------+------------------+------+-----+---------+----------------+
| Field | Type             | Null | Key | Default | Extra          |
+-------+------------------+------+-----+---------+----------------+
| id    | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name  | varchar(150)     | NO   |     | NULL    |                |
| owner | varchar(150)     | NO   |     | NULL    |                |
| birth | date             | NO   |     | NULL    |                |
+-------+------------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)
```
> Như vậy là mình đã giới thiệu cho các bạn thêm một cách để có thể thao tác với cơ sở dữ liệu.
### Tham khảo tại 
https://dev.mysql.com/doc/mysql-getting-started/en/