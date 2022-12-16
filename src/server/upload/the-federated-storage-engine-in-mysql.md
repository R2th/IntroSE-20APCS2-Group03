# Giới thiệu.
Chào các bạn, Vừa qua trong dự án mình tham gia có gặp một yêu cầu là join 2 bảng ở hai server khác nhau, sau đó mình tìm hiểu thì biết là trong mysql có một kỷ thuật cho phép chúng ta làm điều đó là FEDERATED Storage Engine.  FEDERATED Storage Engine cho phép chúng ta truy cập một database từ xa mà không cần phải sao chép về server local. Mỗi lần query tới bảng local FEDERATED thì dữ liệu sẽ tự động được kéo về từ bảng ở server remote. Đặc biệt là dữ liệu không lưu trữ ở local table.
Muốn sử dụng được FEDERATED Storage Engine trên local server thì chúng ta cần phải enable FEDERATED trên local server ở file /etc/my.cnf bằng cách thêm 'federated' vào phía sau [mysqld] như sau:
```
[mysqld]
federated
```
Hình ảnh mô ta về FEDERATED Storage Engine.
![](https://images.viblo.asia/c6398b40-222b-4713-bbdd-63f536f0efc7.png)
# Create FEDERATED Tables.
Để tạo FEDERATED table ta phải làm theo các bước sau:
## Tạo một table ở server remote bằng câu lệnh sau:
```
    CREATE TABLE remote_table (
        id     INT(20) NOT NULL AUTO_INCREMENT,
        name   VARCHAR(32) NOT NULL DEFAULT '',
        other  INT(20) NOT NULL DEFAULT '0',
        PRIMARY KEY  (id),
        INDEX name (name),
        INDEX other_key (other)
    )
    ENGINE=MyISAM
    DEFAULT CHARSET=latin1;
```
## Tạo local table liên kết với remote table.
Để tạo một local table liên kết với remote table chúng ta có hai lựa chọn sau:
Chú ý:
* Khi tạo local table các cột phải được định nghĩa giống với các cột đã được định nghĩa trong remote table. Các cột ở local table có thể  ít hơn ở remote table.
* Để tăng performance cho bảng FEDERATED chúng ta có thể thêm index các cột ở loacl table.
### 1.Tạo một  FEDERATED table bằng cách sử dụng chuổi connect.
Để sử dụng cách này chúng ta phải chỉ định chuổi kết nối sau câu lệnh  CREATE TABLE như sau:
```
    CREATE TABLE federated_table (
        id     INT(20) NOT NULL AUTO_INCREMENT,
        name   VARCHAR(32) NOT NULL DEFAULT '',
        other  INT(20) NOT NULL DEFAULT '0',
        PRIMARY KEY  (id),
        INDEX name (name),
        INDEX other_key (other)
    )
    ENGINE=FEDERATED
    DEFAULT CHARSET=latin1
    CONNECTION='mysql://fed_user@remote_host:9306/federated/remote_table';
```
'mysql://fed_user@remote_host:9306/federated/test_table' chính là chuỗi kết nối đến remote table.
Chuổi kết nối có dạng như sau:
```
scheme://user_name[:password]@host_name[:port_num]/db_name/tbl_name
```
Hiện tại mysql chỉ support schema là mysql.
Các tham số như user_name, password, host_name, port_num, db_name, tbl_name là các thông số kết kết nối đến remote server. Trong đó password, port_num là tùy chọn chúng ta có thể bỏ qua.
### Tạo một FEDERATED Table sử dụng CREATE SERVER.
Nếu phải tạo nhiều FEDERATED Table với remote server giống nhau thì chúng ta nên dùng CREATE SERVER.
Cú pháp như sau:
```
CREATE SERVER
server_name
FOREIGN DATA WRAPPER wrapper_name
OPTIONS (option [, option] ...)
```
trong đó server_name là tên được dùng trong câu lệnh tạo bảng FEDERATED sau này.
Ví dụ chúng ta có một chuổi kết nối tới remove server như sau:
```
CONNECTION='mysql://fed_user@remote_host:9306/federated/remote_table';
```
thì câu lệnh CREATE SERVER như sau;
```
CREATE SERVER fedlink
FOREIGN DATA WRAPPER mysql
OPTIONS (USER 'fed_user', HOST 'remote_host', PORT 9306, DATABASE 'federated');
```
Sau khi tạo server_name thì ta có thể dùng để tạo table FEDERATED bằng câu lệnh sau:
```
    CREATE TABLE federated_table (
        id     INT(20) NOT NULL AUTO_INCREMENT,
        name   VARCHAR(32) NOT NULL DEFAULT '',
        other  INT(20) NOT NULL DEFAULT '0',
        PRIMARY KEY  (id),
        INDEX name (name),
        INDEX other_key (other)
    )
    ENGINE=FEDERATED
    DEFAULT CHARSET=latin1
    CONNECTION='fedlink/remote_table';
```
# Kết luận:
Từ bây giờ khi chúng ta query đến bảng federated_table thì mysql sẽ tự động kéo data từ remote_table về. Hi vọng bài viết của mình sẽ có ích cho các bạn gặp trường hợp giống như mình đã gặp.