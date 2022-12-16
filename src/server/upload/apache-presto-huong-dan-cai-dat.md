Bài viết này mình sẽ hướng dẫn các bạn cách cài đặt Apache Presto, trước tiên, để làm theo hướng dẫn này thì yêu cầu cơ bản như sau:
- Linux hoặc Mac OS
- Java >=8, nếu bạn k biết mình đã cài java hay chưa hay có đúng phiên bản hay k, mình cũng sẽ hướng dẫn cách kiểm tra luôn

# 1. Xác định phiên bản Java trên máy 
Để kiểm tra bạn đã cài đặt phiên bản Java 8 trở lên hay không, hãy sử dụng lệnh command sau:

```
$ java -version 
```

Nếu Java đã được cài đặt thành công trên máy của bạn, bạn có thể thấy phiên bản Java đã cài đặt.  Nếu Java chưa được cài đặt, hãy làm theo các bước tiếp theo để cài đặt Java 8 trên máy của bạn.
Download JDK,  download JDK 8 bằng cách truy cập liên kết sau:
http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
![](https://images.viblo.asia/c927f354-af67-4f9b-b469-08d5dd3f6d3f.png)

Bạn hãy tải xuống file có đuôi tar.gz phù hợp với hệ điều hành của máy bạn nhé, ví dụ ở đây máy mình là linux x64, mình sẽ tải file có tên jdk-8u271-linux-x64.tar.gz

Sau khi tải, extract file và chuyển vào thư mục riêng. Set Java alternatives và hoàn thành cài đặt.
```
update-alternatives --config java
```

Cụ thể hơn, bạn có thể đọc bài viết sau đây
https://thishosting.rocks/install-java-ubuntu/

# 2. Cài đặt Apache Presto
Download phiên bản mới nhất của Presto bằng cách vào link https://repo1.maven.org/maven2/com/facebook/presto/presto-server/0.149/

-> presto-server-0.149.tar.gz

### Extract file tar 
Extract file sử dụng lệnh 
```
$ tar  -zxf  presto-server-0.149.tar.gz 
$ cd presto-server-0.149 
```

# 3. Thiết lập cấu hình 
### Tạo thư mục "data"
Tạo một thư mục dữ liệu bên ngoài thư mục cài đặt, thư mục này sẽ được sử dụng để lưu trữ log, metadata, v.v., để dễ dàng bảo quản khi nâng cấp Presto.  

```
$ cd  
$ mkdir data
```
Để xem đường dẫn của nó, hãy sử dụng lệnh "pwd".  Vị trí này sẽ được chỉ định trong tệp node.properties tiếp theo.


### Tạo thư mục "etc"
```
$ cd presto-server-0.149 
$ mkdir etc
```

Thư mục này sẽ chứa các tệp cấu hình. Hãy tạo từng tệp một.

### Node Properties
File Presto node properties chứa cấu hình môi trường cụ thể cho từng node. Nó được tạo trong thư mục etc (etc/node.properties) bằng lệnh sau 

```
$ cd etc 
$ vi node.properties  

node.environment = production 
node.id = ffffffff-ffff-ffff-ffff-ffffffffffff 
node.data-dir = /Users/../workspace/Presto
```
Sau khi thực hiện tất cả các thay đổi, hãy lưu tệp và thoát khỏi terminal.  Ở đây **node.data** là đường dẫn vị trí của thư mục dữ liệu đã tạo ở trên.  **node.id** đại diện cho định danh duy nhất cho mỗi nút.


### JVM Config

Tạo một file "jvm.config" trong thư mục etc (etc/jvm.config). Tệp này chứa danh sách các tùy chọn dòng lệnh được sử dụng để khởi chạy Java Virtual Machine.

```
$ cd etc 
$ vi jvm.config  

-server 
-Xmx16G 
-XX:+UseG1GC 
-XX:G1HeapRegionSize = 32M 
-XX:+UseGCOverheadLimit 
-XX:+ExplicitGCInvokesConcurrent 
-XX:+HeapDumpOnOutOfMemoryError 
-XX:OnOutOfMemoryError = kill -9 %p 
```

Sau khi tạo tất cả các thay đổi, lưu file, quit terminal.

### Cấu hình Properties

Tạo một tệp "config.properties" bên trong thư mục etc (etc / config.properties).  Tệp này chứa cấu hình của máy chủ Presto.  Nếu bạn đang thiết lập một máy duy nhất để thử nghiệm, máy chủ Presto chỉ có thể hoạt động như một tiến trình điều phối như được xác định bằng cách sử dụng command line sau 

```
$ cd etc 
$ vi config.properties  

coordinator = true 
node-scheduler.include-coordinator = true 
http-server.http.port = 8080 
query.max-memory = 5GB 
query.max-memory-per-node = 1GB 
discovery-server.enabled = true 
discovery.uri = http://localhost:8080
```

Trong đó, 
* coordinator −  node chính.

* node-scheduler.include-coordinator − Cho phép lên lịch làm việc trên bộ điều phối (coordinator).

* http-server.http.port − Chỉ định cổng cho máy chủ HTTP.

* query.max-memory=5GB − Số lượng bộ nhớ được phân phối tối đa.

* query.max-memory-per-node=1GB − Số lượng bộ nhớ tối đa trên mỗi node.

* discovery-server.enabled − Presto sử dụng dịch vụ Discovery để tìm tất cả các nút trong cụm.

* discovery.uri − URI cho Discovery server.

Nếu bạn đang thiết lập máy chủ Presto nhiều máy, Presto sẽ hoạt động như cả quá trình điều phối và worker.  Sử dụng cài đặt cấu hình này để kiểm tra máy chủ Presto trên nhiều máy.

### Cấu hình cho bộ điều phối


```
$ cd etc 
$ vi config.properties  

coordinator = true 
node-scheduler.include-coordinator = false 
http-server.http.port = 8080 
query.max-memory = 50GB 
query.max-memory-per-node = 1GB 
discovery-server.enabled = true 
discovery.uri = http://localhost:8080 
```

### Cấu hình cho worker 
```
$ cd etc 
$ vi config.properties  

coordinator = false 
http-server.http.port = 8080 
query.max-memory = 50GB 
query.max-memory-per-node = 1GB 
discovery.uri = http://localhost:8080
```

### Log Properties 
Tạo một tệp "log.properties" bên trong thư mục etc (etc / log.properties).  Tệp này chứa level log nhỏ nhất cho cấu trúc phân cấp trình ghi log được đặt tên.  Sử dụng command sau:
```
$ cd etc 
$ vi log.properties  
com.facebook.presto = INFO
```

Lưu file và quit terminal. Ở đây, bốn cấp độ log được sử dụng như DEBUG, INFO, WARN và ERROR. Mức log mặc định là INFO.

### Catalog Properties
Tạo một thư mục "catalog" bên trong thư mục vv (etc/catalog).  Điều này sẽ được sử dụng để gắn dữ liệu.  Ví dụ: tạo etc/catalog/jmx.properties với nội dung sau để gắn kết nối jmx làm danh mục jmx -
```
$ cd etc 
$ mkdir catalog 
$ cd catalog 
$ vi jmx.properties  
connector.name = jmx 
```

# 4. Khởi động Presto
Presto có thể được bắt đầu bằng lệnh sau,
```
$ bin/launcher start 
```

Sau đó, bạn sẽ thấy phản hồi tương tự như thế này,

```
Started as 840
```

# 5. Chạy Presto
Để khởi chạy máy chủ Presto, hãy sử dụng lệnh sau

```
$ bin/launcher run
```

Sau khi khởi chạy thành công máy chủ Presto, bạn có thể tìm thấy các tệp log trong thư mục “var/log”.
* launcher.log − Log này được tạo bởi trình khởi chạy và được kết nối với các luồng stdout và stderr của máy chủ.

* server.log − Đây là file log chính được Presto sử dụng.

* http-request.log − HTTP request do máy chủ nhận được.

Như vậy, bạn đã cài đặt thành công cài đặt cấu hình Presto trên máy của mình. Hãy tiếp tục các bước cài đặt Presto CLI.

# 6. Cài đặt Presto CLI 

Presto CLI cung cấp một trình tương tác dựa trên terminal để chạy các truy vấn.
Tải xuống Presto CLI bằng cách truy cập liên kết sau,

https://repo1.maven.org/maven2/com/facebook/presto/presto-cli/0.149/

Bây giờ “presto-cli-0.149-thi hành.jar” sẽ được cài đặt trên máy của bạn.

### Run Presto CLI 

Sau khi tải xuống presto-cli, hãy sao chép nó vào vị trí mà bạn muốn chạy nó. Vị trí này có thể là bất kỳ node nào có quyền truy cập mạng vào bộ điều phối. Đầu tiên, đổi tên của tệp Jar thành Presto. Sau đó, làm cho nó thực thi được bằng lệnh chmod + x bằng đoạn mã sau:

```
$ mv presto-cli-0.149-executable.jar presto  
$ chmod +x presto
```

Bây giờ hãy thực thi CLI bằng lệnh sau,

```
./presto --server localhost:8080 --catalog jmx --schema default  
Here jmx(Java Management Extension) refers to catalog and default referes to schema. 
```

Bạn sẽ thấy phản hồi sau,

```
 presto:default>
```

Bây giờ gõ lệnh “jps” trên terminal và bạn sẽ thấy các trình duyệt đang chạy.

# 7. Stop Presto
Sau khi thực hiện tất cả các lần thực thi, bạn có thể dừng máy chủ presto bằng lệnh sau:
```
$ bin/launcher stop 

```