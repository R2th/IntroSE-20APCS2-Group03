Chúng ta sẽ cùng tìm hiểu xem MySQL Connector của Presto có hỗ trợ và không hỗ trợ thực thi lệnh gì nhé!

MySQL Connector được sử dụng để truy vấn cơ sở dữ liệu MySQL bên ngoài.

**Điều kiện tiên quyết** : 

Đã cài đặt sẵn MySQL Server

## Thiết lập cấu hình

Hy vọng rằng bạn đã cài đặt máy chủ mysql trên máy của mình. Để kích hoạt thuộc tính mysql trên máy chủ Presto, bạn phải tạo một tệp “**mysql.properties**” trong thư mục “**etc/catalog**”. Dùng lệnh sau để tạo tệp mysql.properties.

```
$ cd etc 
$ cd catalog 
$ vi mysql.properties   

connector.name = mysql 
connection-url = jdbc:mysql://localhost:3306 
connection-user = root 
connection-password = pwd 
```

Save file và quit terminal. Trong file bên trên, bạn phải điền password mysql của bạn trong trường `connection-password`.

## Tạo cơ sở dữ liệu trong Mysql Server

Mở MySQL server và tạo CSDL sử dụng lệnh command sau:
```
create database tutorials
```

Giờ bạn đã tạo CSDL "tutorials" trong server. Để enable kiểu dữ liệu, sử dụng lệnh command "use tutorials" trong cửa sổ truy vấn.

## Tạo bảng
Chúng ta hãy thử tạo một bảng đơn giản tên "tutorials" trong database nhé.
```
create table author(auth_id int not null, auth_name varchar(50),topic varchar(100))
```


## Insert bảng
Sau khi tạo một bảng, insert 3 bản ghi sử dụng query như sau: 
```
insert into author values(1,'Doug Cutting','Hadoop') 
insert into author values(2,’James Gosling','java') 
insert into author values(3,'Dennis Ritchie’,'C')
```

## Select bản ghi
Để lấy tất cả các bản ghi, sử dụng query 

##### Query

```
select * from author
```

##### Kết quả
```
auth_id    auth_name      topic  
1        Doug Cutting     Hadoop 
2        James Gosling    java 
3        Dennis Ritchie     C
```

Hiện tại, bạn có dữ liệu được truy vấn bằng máy chủ MySQL.  Hãy kết nối plugin lưu trữ Mysql với máy chủ Presto.


## Kết nối với Presto CLI
Nhập lệnh command sau để kết nối MySql plugin trên Presto CLI
```
./presto --server localhost:8080 --catalog mysql --schema tutorials 
```

Bạn sẽ nhận được response sau: 
```
presto:tutorials> 
```

"tutorials" này là tên DB được tạo bên trên

## Danh sách lược đồ

Để liệt kê tất cả các lược đồ trong mysql, gõ lệnh query sau trong Presto server.

##### Query
```
presto:tutorials> show schemas from mysql;
```
##### Kết quả
```
      Schema 
-------------------- 
 information_schema 
 performance_schema 
 sys 
 tutorials
```

Từ kết quả này, chúng ta có thể kết luận rằng 3 lược đồ đầu tiên được xác định từ trước và lược đồ cuối là cái được bạn tạo

Liệt kê tất cả các bảng từ Lược đồ
Câu query sau liệt kê danh sách tất cả các bảng trong lược đồ tutorials:


##### Query

```
presto:tutorials> show tables from mysql.tutorials; 
```


##### Kết quả

```
  Table 
-------- 
 author
```

Chúng ta đã tạo duy nhất một bảng trong lược đồ. Nếu bạn tạo nhiều bảng, nó sẽ được liệt kê tất cả

## Mô tả bảng

Để mô tả bảng, bạn dùng câu lệnh truy vấn sau: 

##### Query

```
presto:tutorials> describe mysql.tutorials.author;
```

##### Kết quả

```
  Column   |     Type     | Comment 
-----------+--------------+--------- 
 auth_id   | integer      | 
 auth_name | varchar(50)  | 
 topic     | varchar(100) |
```

## Truy cập bản ghi trong bảng

Để lấy tất cả các bản ghi trong bảng mysql, dùng câu truy vấn sau:
##### Query

```
presto:tutorials> select * from mysql.tutorials.author; 
```

##### Kết quả

```
auth_id  |   auth_name    | topic 
---------+----------------+-------- 
       1 | Doug Cutting   | Hadoop 
       2 | James Gosling  | java 
       3 | Dennis Ritchie | C
```

Từ kết quả này, bạn có thể lấy bản ghi mysql server trong Presto

## Tạo bảng sử dụng lệnh command
Mysql connector không hỗ trợ query tạo bảng nhưng bạn có thể tạo bảng sử dụng lệnh command

##### Query

```
presto:tutorials> create table mysql.tutorials.sample as 
select * from mysql.tutorials.author; 
```

##### Kết quả 

```
CREATE TABLE: 3 rows
```

Bạn không thể chèn hàng  trực tiếp bởi vì connector này có vài giới hạn. Nó không hỗ trợ những truy vấn sau 

* create
* insert
* update
* delete
* drop

Để xem các bản ghi mới được tạo, sử dụng truy vấn sau

##### Query 

```
presto:tutorials> select * from mysql.tutorials.sample; 
```

##### Kết quả

```
auth_id  |   auth_name    | topic 
---------+----------------+-------- 
       1 | Doug Cutting   | Hadoop 
       2 | James Gosling  | java 
       3 | Dennis Ritchie | C****
```

Nguồn: https://www.tutorialspoint.com/