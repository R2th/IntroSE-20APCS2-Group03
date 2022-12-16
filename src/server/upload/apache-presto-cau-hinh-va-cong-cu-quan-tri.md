Bài viết hôm nay sẽ đề cập đến việc setting cấu hình cho Presto và giao diện quản trị của nó.

# 1. Cấu hình
### Presto Verifier

Presto Verifier có thể được sử dụng để kiểm tra Presto với một cơ sở dữ liệu khác (chẳng hạn như MySQL) hoặc để kiểm tra hai cụm Presto với nhau.

### Tạo CSDL trong MySQL

Mở MySQL Server và tạo một CSDL sử dụng lệnh command sau :

```
create database test
```

Bạn vừa tạo xong CSDL "test" trong server. Tạo bảng và load nó bằng truy vấn sau.

```
CREATE TABLE verifier_queries( 
   id INT NOT NULL AUTO_INCREMENT, 
   suite VARCHAR(256) NOT NULL, 
   name VARCHAR(256), 
   test_catalog VARCHAR(256) NOT NULL, 
   test_schema VARCHAR(256) NOT NULL, 
   test_prequeries TEXT, 
   test_query TEXT NOT NULL, 
   test_postqueries TEXT, 
   test_username VARCHAR(256) NOT NULL default 'verifier-test', 
   test_password VARCHAR(256), 
   control_catalog VARCHAR(256) NOT NULL, 
   control_schema VARCHAR(256) NOT NULL, 
   control_prequeries TEXT, 
   control_query TEXT NOT NULL, 
   control_postqueries TEXT, 
   control_username VARCHAR(256) NOT NULL default 'verifier-test', 
   control_password VARCHAR(256), 
   session_properties_json TEXT,            
   PRIMARY KEY (id) 
);
```

### Thêm Cài đặt Cấu hình

Tạo tệp thuộc tính để định cấu hình trình xác minh (verifier) -

```
$ vi config.properties  

suite = mysuite 
query-database = jdbc:mysql://localhost:3306/tutorials?user=root&password=pwd 
control.gateway = jdbc:presto://localhost:8080 
test.gateway = jdbc:presto://localhost:8080 
thread-count = 1 
```

Ở đây, trong trường **query-database**, nhập các chi tiết sau - tên cơ sở dữ liệu mysql, tên người dùng và mật khẩu.

### Download JAR file

Tải Presto-verifier jar file ở link sau:
https://repo1.maven.org/maven2/com/facebook/presto/presto-verifier/0.149/
=> Tải presto-verifier-0.149-executable.jar

### Execute JAR
Execute file JAR sử dụng lệnh command 
```
$ mv presto-verifier-0.149-executable.jar verifier  
$ chmod+x verifier 
```

### Chạy Verifier

Chạy verifier sử dụng lệnh command sau:
```
$ ./verifier config.properties 
```

### Tạo bảng
Tạo một bảng đơn giản trong CSDL "test" sử dụng truy vấn sau: 

```
create table product(id int not null, name varchar(50))
```

### Chèn bảng
Sau khi tạo bảng, chèn 2 record sử dụng truy vấn sau:
```
insert into product values(1,’Phone') 
insert into product values(2,’Television’)
```

### Chạy truy vấn Verifier
Thực thi truy vấn mẫu sau trong verifier terminal (./verifier config.propeties) để check kết quả verifier.

##### Mẫu truy vấn
```
insert into verifier_queries (suite, test_catalog, test_schema, test_query, 
control_catalog, control_schema, control_query) values 
('mysuite', 'mysql', 'default', 'select * from mysql.test.product', 
'mysql', 'default', 'select * from mysql.test.product');
```

Ở đây, truy vấn **select * from mysql.test.product** đề cập đến danh mục mysql, **test** là tên CSDL và **product** là tên bảng. Theo cách này, bạn có thể truy cập mysql connector sử dụng Presto server.

Tại đây, hai truy vấn select giống nhau được test với nhau để xem hiệu suất. Tương tự, bạn có thể chạy các truy vấn khác để test kết quả hiệu suất. Bạn cũng có thể kết nối 2 cụm Presto để check kết quả hiệu suất.

# 2. Công cụ quản trị
Ở chương này, chúng ta cùng thảo luận về các công cụ quản trị trong Presto. Cùng bắt đầu với Giao diện Web của Preso nhé.

### Giao diện Web
Presto cung cấp giao diện web để theo dõi và quản lý các truy vấn.  Nó có thể được truy cập từ số cổng được chỉ định trong Config Properties của bộ điều phối.
Khởi động Presto server và Presto CLI. Sau đó bạn có thể  truy cập vào giao diện web từ url sau - http://localhost:8080/

![](https://images.viblo.asia/fe0fb08f-b5ee-4ce8-9fa3-b62c3c1a3c17.jpg)

Bạn sẽ thấy giao diện tương tự như màn hình trên.

Tại đây, trang chính có một list truy vấn cùng với thông tin như ID quy vấn unique, text truy vấn, trạng thái truy vấn, phần trăm hoàn thành, username và nguồn gốc truy vấn. Những truy vấn cuối cùng đang chạy đầu tiên, sau đó là những truy vấn đã hoàn thành hoặc không hoàn thành được hiển thị ở dưới cùng.

### Điều chỉnh hiệu suất trên Presto
Nếu cụm Presto đang gặp bất kỳ sự cố nào liên quan đến hiệu suất, hãy thay đổi cài đặt cấu hình mặc định của bạn thành cài đặt sau.

##### Config Properties
* task. info -refresh-max-wait − Giảm tải công việc của bộ điều phối.

* task.max-worker-threads − Tách quy trình và gán cho từng node worker.

* distributed-joins-enabled − Các phép nối phân tán dựa trên băm.

* node-scheduler.network-topology − Đặt cấu trúc liên kết mạng thành bộ lập lịch.

##### Cài đặt JVM 
Thay đổi cài đặt JVM mặc định của bạn thành cài đặt sau.  Điều này sẽ hữu ích cho việc chẩn đoán các vấn đề thu gom rác.

```
-XX:+PrintGCApplicationConcurrentTime 
-XX:+PrintGCApplicationStoppedTime 
-XX:+PrintGCCause 
-XX:+PrintGCDateStamps 
-XX:+PrintGCTimeStamps 
-XX:+PrintGCDetails 
-XX:+PrintReferenceGC 
-XX:+PrintClassHistogramAfterFullGC 
-XX:+PrintClassHistogramBeforeFullGC 
-XX:PrintFLSStatistics = 2 
-XX:+PrintAdaptiveSizePolicy 
-XX:+PrintSafepointStatistics 
-XX:PrintSafepointStatisticsCount = 1 
```