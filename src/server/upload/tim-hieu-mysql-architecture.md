# Mở đầu 
Đến với tháng 4, tháng của những lời nói dối. Thì tôi sẽ đưa các bạn đi tìm về một sự thật thú vị. Đó là sự thật về kiến trúc của mysql. Một hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở (RDBMS) phổ biến nhất hiện nay.
# Major components & Layer
MYSQL Architecture mô tả cách mà những component trong mysql  tương tác với nhau. Về cơ bản thì MYSQL Architecture là một hệ thống client - server system.  Với `Client`  là chỉ các ứng dụng kết nối tới Máy chủ cơ sở dữ liệu MySQL. Và server system chính là Máy chủ cơ sở dữ liệu MySQL. MYSQL Architecture  sẽ bao gồm các thành phần chính sau:

 ![](https://images.viblo.asia/a50cffe7-bf45-4da4-99a7-d7b7e605256b.png)

Để khái quát hơn thì tôi xin chia MYSQL Architecture thành 3 layer chính bao gồm : 
* Application Layer (layer 1)

* MySQL Server layer (layer 2)

* Storage Engine Layer (layer 3)

![](https://images.viblo.asia/737c9d67-99e6-4e7a-9756-16532759cdf3.png)

# Application Layer
Application Layer chính là lớp trên cùng nhất trong kiến trúc MySQL. Đây là nơi client và user dùng tương tác với MySQL RDBMS. Một số dịch vụ được cung cấp bên dưới: **connection handling**, **authentication**, **security** đều có ở đây. Có ba thành phần chính trong lớp này là Administrators, Clients, Query Users như thể hiện trong hình bên dưới.

![](https://images.viblo.asia/717fed47-8adf-4455-959c-8957195f5356.png)
*  **Administrators**
sử dụng các tiện ích và giao diện quản trị khác nhau như mysqladmin thực hiện các tác vụ như tắt máy chủ và tạo hoặc hủy cơ sở dữ liệu, mysqldump để sao lưu cơ sở dữ liệu hoặc sao chép cơ sở dữ liệu sang một máy chủ khác.

*  **Clients** giao tiếp với MySQL thông qua các giao diện và tiện ích khác nhau như MySQL API. MySQL API gửi truy vấn đến máy chủ dưới dạng một chuỗi các mã thông báo.

* **Query Users**
truy vấn tương tác với MySQL RDBMS thông qua giao diện truy vấn là mysql .

## Connection handling
 Khi một client kết nối với server, Client sẽ nhận được thread riêng cho kết nối của nó. Tất cả các truy vấn từ client đó được thực thi trong thread được chỉ định đó.  Thread được lưu trong bộ nhớ cache của máy chủ, vì vậy chúng không cần phải tạo và hủy mỗi khi có kết nối mới. 

Để quản lý số kết nối thì mysql có cung cấp cho ta biến `max_connection`. Có 1 tip nhỏ đấy chính là  [mysqld](https://dev.mysql.com/doc/refman/8.0/en/mysqld.html)  cho phép `max_connections + 1` kết nối Client.  Với điều kiện kết nối bổ sung  là các tài khoản có `CONNECTION_ADMIN`. Bằng cách cấp đặc quyền cho administrators ,  Nó có thể kết nối với máy chủ và sử dụng  `SHOW PROCESSLIST` để chẩn đoán sự cố ngay cả khi số lượng kết nối từ Client đã đạt mức tối đa.

Khi đặt giá trị của `max_connections` chúng ta nên cân nhắc đến một số yếu tố sau:

* Chất lượng của thread library trên một platform nhất định.

* Dung lượng RAM có sẵn.

* Dung lượng RAM được sử dụng cho mỗi kết nối.

* Khối lượng công việc từ mỗi kết nối.

* Thời gian phản hồi mong muốn.

* Số lượng file mô tả có sẵn.

## Authentication
Bất cứ khi nào client kết nối với  MySQL server, máy chủ sẽ thực hiện xác thực ở phía máy chủ. Việc xác thực dựa trên username, password và host của client.

Ví dụ:
```
root@localhost root:  username của Client.
localhost: tên host
```
## Security
Sau khi Client được kết nối thành công với MySQL Server, server sẽ kiểm tra xem client đó có đặc quyền đưa ra các truy vấn nhất định đối với máy chủ MySQL.

 Ví dụ: 
```
mysql> show privileges \G
*************************** 1. row ***************************
  Privilege: Alter
  Context: Tables
  Comment: To alter the table
*************************** 2. row ***************************
  Privilege: Alter routine
  Context: Functions,Procedures
  Comment: To alter or drop stored functions/procedures
```
# MySQL Server layer
Lớp này đảm nhất tất cả các chức năng logic của hệ thống mysql RDBMS, Nó còn được ví như bộ não của mysql. Lớp logic của MySQL được chia thành các thành phần phụ khác nhau, được đưa ra dưới đây:
* MySQL services and utilities.
* SQL Interface.
* SQL Parser.
* Optimizer.
* Caches.

## MySQL services and utilities
Mysql cung cấp nhiều loại dịch vụ và tiện ích. Đây là một trong những lý do chính cho sự phổ biến của MySQL. Lớp này cung cấp các dịch vụ và tiện ích để quản trị và bảo trì hệ thống MySQL, một số trong số chúng được đề cập dưới đây:
* Backup & recovery.
* Security.
* Replication.
* Cluster.
* Partitioning.
* Workbench.

### Backup & recovery
 Có một điều quan trọng là phải sao lưu cơ sở dữ liệu để bạn có thể khôi phục dữ liệu của mình và chạy lại trong trường hợp xảy ra sự cố, chẳng hạn như sự cố hệ thống, lỗi phần cứng hoặc người dùng xóa nhầm dữ liệu. Bản sao lư cũng rất cần thiết như một biện pháp bảo vệ trước khi nâng cấp cài đặt MySQL và chúng có thể được sử dụng để chuyển cài đặt MySQL sang hệ thống khác hoặc thiết lập máy chủ bản sao.

Ví dụ sao lưu bằng Command-Line trong mysqldump:
```
1. Sao lưu database trong mysql: 
sudo mysqldump -u [user] -p[database_name] > [filename].sql 

2. Để sao lưu toàn bộ Hệ thống quản lý database:
mysqldump --all-databases --single-transaction --quick --lock-tables=false > full-backup-$(date +%F).sql -u root -p
```
### Security
MySQL sử dụng bảo mật dựa trên Danh sách kiểm soát truy cập (ACL) cho tất cả các kết nối, truy vấn và các hoạt động khác mà người dùng có thể cố gắng thực hiện. Ngoài ra còn có hỗ trợ cho các kết nối được mã hóa SSL giữa máy khách và máy chủ MySQL.

Khi chạy mysql hãy làm theo 1 số nguyên tắc sau:
* Một điều quan trong là **đừng bao giờ cấp cho bất kỳ ai** (ngoại trừ tài khoản root của MySQL ) **quyền truy cập** vào bảng user trong mysql cơ sở dữ liệu hệ thống!
* Tìm hiểu cách hoạt động của hệ thống đặc quyền truy cập MySQL ( xem chi tiết [tại đây](https://dev.mysql.com/doc/mysql-security-excerpt/5.7/en/access-control.html)). Không cấp nhiều đặc quyền hơn mức cần thiết. Và không bao giờ cấp đặc quyền cho tất cả các máy chủ. Sử dụng lệnh `SHOW GRANTS` để kiểm tra những tài khoản nào có quyền truy cập vào những gì. Sau đó, sử dụng lệnh `REVOKE` để loại bỏ những đặc quyền không cần thiết.
* Không lưu trữ mật khẩu một các rõ ràng. Thay vào đó hay sử dụng , hãy sử dụng `SHA2()` hoặc một số hàm `hash` một chiều khác và lưu trữ giá trị `hash`.
* Thiết lập `firewall`, Điều này bảo vệ bạn khỏi ít nhất 50% tất cả các loại `khai thác` trong bất kỳ phần mềm nào. Đặt MySQL sau `firewall` hoặc trong `demilitarized zone (DMZ)`.
* Các ứng dụng của MYSQL không được tin tưởng bất kì dữ liệu gì mà được người dùng nhập vào. Mọi câu lệnh phải được mã hoá thích hợp. Đây cũng cách để phòng tránh 1 trong những tấn công nghiêm trọng và phổ biến nhất là tấn công`sql injection`.
* Không truyền dữ liệu thuần túy (không được mã hóa) qua Internet. Thông tin này có thể truy cập được đối với tất cả những người có thời gian và khả năng chặn nó và sử dụng nó cho mục đích riêng của họ. Thay vào đó, hãy sử dụng giao thức được mã hóa như `SSL` hoặc `SSH`. MySQL hỗ trợ các kết nối SSL nội bộ. Một kỹ thuật khác là sử dụng chuyển tiếp cổng `SSH` để tạo một đường hầm được mã hóa (và nén) cho giao tiếp.
* Tìm hiểu cách sử dụng các tiện ích **tcpdump** và **strings** .
### Replication
Replication MySQL là một quá trình cho phép dữ liệu từ một máy chủ cơ sở dữ liệu MySQL (máy chủ) được sao chép tự động sang một hoặc nhiều máy chủ cơ sở dữ liệu MySQL (máy chủ). Nghe có thể hơi giống phần **Backup & recovery**. Nhưng không phải Replication thường được sử dụng để lan truyền quyền truy cập đọc trên nhiều máy chủ, để có khả năng mở rộng. Mặc dù nó cũng có thể được sử dụng cho các mục đích khác như chuyển đổi dự phòng hoặc phân tích dữ liệu trên máy chủ để không làm quá tải máy chủ.

Giải thích 1 chút nhé, có 1 nguyên lý quan trọng trong mysql đó là tính toàn vẹn dữ liệu. Và khái niệm `lock` cũng sinh ra để đảm bảo nguyên lý trên. Nhưng cuộc sống mà, làm gì có thứ gì hoàn hảo. `Lock` cũng tồn tại khá nhiều nhược điểm như: làm giảm tốc độ truy cập,  khó scale...
Đến đây, Bằng Replication ta có thể thiết kế những DB phục vụ những chức năng chuyên biệt dành để đọc, ghi.
![](https://images.viblo.asia/c19e8881-d559-4e79-adb9-2b18b89e8834.png)

### Cluster
MySQL Cluster là cơ sở dữ liệu phân tán kết hợp khả năng mở rộng liên tục và tính sẵn sàng cao. Nó cung cấp truy cập thời gian thực trong bộ nhớ với sự nhất quán về tiến trình xử lý trên các bộ dữ liệu phân tán và phân vùng. Nó được thiết kế cho các ứng dụng quan trọng. MySQL Cluster có bản sao giữa các cụm (Cluster) trên nhiều trang web địa lý được tích hợp sẵn. MySQL Cluster được chứng minh hàng ngày trong các hệ thống phục vụ hàng tỷ người dùng. Nó được sử dụng trong nhiệm vụ quan trọng, ứng dụng cốt lõi của mạng điện thoại di động, hệ thống xác thực và trò chơi nền tảng với khối lượng dữ liệu bùng nổ và lượng người dùng tải.
### Partitioning
Mysql Partitioning theo đúng như tên của nó là việc phân chia một table thành những phần nhỏ theo một logic nhất định, được phân biệt bằng key, key này thường là tên column trong table.
![](https://images.viblo.asia/21ea6d0f-5cb9-4076-b4f6-a4d13dc94d6a.png)
### Workbench
MySQL Workbench là một công cụ trực quan hợp nhất dành cho database architects, developer và DBA. MySQL Workbench cung cấp data modeling, SQL development và các công cụ quản trị toàn diện để cấu hình máy chủ, quản trị người dùng, sao lưu và hơn thế nữa. MySQL Workbench có sẵn trên Windows, Linux và Mac OS.
## SQL Interface
Structured Query Language (SQL) là một ngôn ngữ truy vấn, được sử dụng để truy vấn máy chủ MySQL. Nó là một công cụ để tương tác giữa người dùng máy khách MySQL và máy chủ. Một số thành phần SQL Interface :
* Data Manipulation Language (DML).
* Data Definition Language (DDL).
* Stored Procedures.
* Views.
* Triggers.
## Parser
Máy chủ MySQL nhận các truy vấn ở định dạng SQL. Sau khi nhận được một truy vấn, trước tiên nó cần được `phân tích cú pháp`. Quá trình này được gọi tắt là `Parser`.
MySQL phân tích cú pháp các truy vấn để tạo cấu trúc bên trong (Parser tree). MySQL parser hoạt động như một `trình biên dịch truyền đơn`. Theo nội bộ MySQL, cấu trúc trình phân tích cú pháp được đưa ra bên dưới.
* Lexical analysis (phân tích từ vựng): Ở gian đoạn này các câu truy vấn sẽ được chia thành các `tokens` và các thành phần không thể chia (ví dụ như tên cột, tên bảng,..).  Đây cũng là giai đoạn đầu tiên của quá trình.
* Syntactic analysis (phân tích cú pháp): phân tích ngữ nghĩa (đảm bảo rằng những câu này có ý nghĩa) và tạo code (cho trình biên dịch) . Tất cả chúng đều được thực hiện cùng một lúc, trong giai đoạn code. 

Cuối cùng, một Parser tree được tạo ra, bây giờ là công việc của Optimizer.

## Optimizer
Sau khi tạo Parser tree nội bộ, MySQL áp dụng nhiều kỹ thuật tối ưu hóa khác nhau. Các kỹ thuật này có thể bao gồm, viết lại truy vấn, thứ tự quét các bảng và chọn các index phù hợp để sử dụng. Trên thực tế, bạn có thể yêu cầu máy chủ giải thích các khía cạnh khác nhau của việc tối ưu hóa.
Ví dụ:
```
EXPLAIN SELECT * FROM users;
```

## Caches
MySQL cache (bộ đệm truy vấn) lưu trữ các bộ kết quả hoàn chỉnh cho các câu lệnh SELECT . Trước khi `Parser` truy vấn, máy chủ MySQL tham khảo bộ đệm truy vấn. Nếu bất kỳ client nào đưa ra một truy vấn giống hệt với một truy vấn đã có trong bộ nhớ cache, máy chủ chỉ cần bỏ qua `parser`, `optimizer` và thậm chí là thực thi, nó chỉ đơn giản là hiển thị đầu ra từ bộ  nhớ `cache`.

MySQL cache có thể hữu ích trong môi trường mà bạn có các bảng không thường xuyên thay đổi và máy chủ nhận được nhiều truy vấn giống nhau. 

Một số lưu ý khi sử dụng MySQL cache:
* MySQL cache không được chấp nhận kể từ MySQL 5.7.20 và bị xóa trong MySQL 8.0.
* MySQL cache không hoạt động trong môi trường mà bạn có nhiều máy chủ mysqld cập nhật các MyISAM bảng giống nhau .
* MySQL cache không được hỗ trợ cho các partitioned table và tự động bị vô hiệu hóa cho các truy vấn liên quan đến các partitioned table.
# Storage Engine Layer
Tính năng Storage Engine  có  thể `cắm` được làm cho MySQL trở thành lựa chọn độc nhất và ưa thích của hầu hết các developer. MySQL cho phép chúng ta lựa chọn các công cụ lưu trữ khác nhau cho các tình huống và yêu cầu khác nhau.  Danh sách các công cụ lưu trữ được hỗ trợ được đề cập bên dưới.
* MyISAM.
* InnoDB.
* Federated.
* Mrg_MyISAM.
* Blackhole.
* CSV.
* Memory.
* Archive.
* Performance_schema.

MySQL cung cấp điều này như một công cụ lưu trữ có thể `cắm` được, các công cụ lưu trữ khác nhau có thể được sử dụng ở cấp bảng. Lệnh Show engine sẽ liệt kê tất cả các công cụ lưu trữ được hỗ trợ bởi máy chủ của bạn.
```
mysql> SHOW ENGINES;
```
# Kết luận
Với vốn kiến thức hạn hẹp của mình mình đã mô tả sợ lược về mô hình kiến trúc của mysql. Mong qua bài viết này các bạn có thể hiểu thêm về cách mà mysql tổ chức cũng như các thành phần chính tạo nên 1 hệ thống quản lý dữ mysql. 
Link tham khảo:
https://www.rathishkumar.in/2016/04/understanding-mysql-architecture.html

https://dev.mysql.com/doc

https://www.toptal.com/mysql/mysql-master-slave-replication-tutorial#:~:text=MySQL%20replication%20is%20a%20process,database%20servers%20(the%20slaves).&text=However%2C%20general%20principles%20of%20setting,same%20for%20all%20operating%20systems.