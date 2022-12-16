# Giới thiệu
Xin chào các bạn! Mình đã quay trở lại rồi đây.

Như [bài trước](https://viblo.asia/p/tang-toc-do-trang-web-su-dung-laravel-voi-object-caching-gGJ59b6aKX2) mình đã chia sẻ cách sử dụng object caching để lưu trữ kết quả truy vấn vào cơ sở dữ liệu giúp tăng tốc hoạt động của trang web. Hoạt động của phương pháp này là lần đầu truy xuất cơ sở dữ liệu, kết quả trả về sẽ được lưu vào bộ nhớ có tốc độ đọc nhanh hơn (cache). Lần sau cùng câu truy vấn đấy dữ liệu sẽ được lấy trong cache mà không cần thực hiện truy vấn vào cơ sở dữ liệu. Nhưng khi dữ liệu trở lên rất lớn thì việc thực hiện câu truy vấn lần đầu vẫn rất chậm.

Thông thường thì chúng ta hay cài đặt tất cả mọi thứ (app, database, cache memory, worker,...) vào một máy chủ duy nhất để tiết kiệm chi phí. Để tăng tốc việc truy vấn cơ sở dữ liệu giải pháp đầu tiên cần phải nghĩ đến là nâng cấp máy chủ. Khi đã nâng cấp máy chủ nhưng truy vấn vẫn chậm thì bạn nên tạo cache cho các truy vấn như mình đã giới thiệu trước đó. Khi có cache mà vẫn chậm thì ta sẽ phải tách phần cơ sở dữ liệu ra làm một máy chủ riêng để các thành phần khác của hệ thống không chiếm dụng tài nguyên cho việc truy vấn dữ liệu. Máy chủ cơ sở dữ liệu thông thường sẽ là máy chủ mạnh nhất trong toàn bộ hệ thống trang web.

![](https://images.viblo.asia/0e1c3139-4b66-4f11-a261-7a62c1ead897.png)

Khi làm việc này các bạn phải chú ý đến tốc độ truyền tải mạng giữa máy chủ chính và máy chủ cơ sở dữ liệu. Nếu tốc độ truyền tải mạng không đủ nhanh nó sẽ tạo thành nút thắt ở đường truyền thì chúng ta sẽ không thể khai thác hết được tài nguyên của máy chủ cơ sở dữ liệu được tách ra. Thông thường thì 2 máy chủ này phải cần được đặt cùng nhau và sử dụng mạng nội bộ giữa 2 máy để trao đổi dữ liệu giúp cho liên kết vừa nhanh, vừa bảo mật.

Nhưng khi bạn có một dữ liệu rất lớn, một lượng người truy cập khổng lồ, người sử dụng có mặt ở khắp mọi nơi trên thế giới,... thì một máy chủ cơ sở dữ liệu là không đủ để đáp ứng cho hệ thống web hoạt động trơn tru. Lúc này ta phải sử dụng chiêu cuối (**ultimate**) cực kỳ kinh khủng khiếp. Đó là nhân bản máy chủ cơ sở dữ liệu (*Database Replication*).

# Database Replication là gì?

Nhân bản là tạo một bản sao y hệt bản gốc. Nhân bản máy chủ cơ sở dữ liệu tức là tạo các bản sao máy chủ cơ sở dữ liệu y hệt bản gốc. Nhưng cơ sở dữ liệu thì sẽ bị thay đổi theo thời gian nên việc sao chép giữa hai máy chủ phải được thực hiện liên tục. Như vậy nhân bản cơ sở dữ liệu được hiểu là thường xuyên sao chép dữ liệu từ cơ sở dữ liệu của một máy chủ sang cơ sở dữ liệu của một máy chủ khác.

![](https://images.viblo.asia/298905b0-e760-4ca5-a774-bda3a482c23b.png)

Trong hệ thống Database Replication sẽ có một máy chủ **master** và nhiều máy chủ **slave**. Các máy chủ **slave** sẽ được nhân bản từ một máy chủ **master** duy nhất.

Khi thực hiện nhân bản máy chủ cơ sở dữ liệu và thực hiện cân bằng tải (*load balancing*) để phân phối truy vấn giữa các máy chủ đó thì ta sẽ phục vụ được nhiều truy vấn cùng một lúc hơn. Ví dụ ta có một máy chủ có thể phục vụ được 500 truy vấn cùng một lúc. Nếu ta dựng thêm 4 máy chủ nữa là thành 5 máy chủ có cấu hình tương tự và đặt một hệ thống cân bằng tải ở giữa thì số lượng truy vấn mà hệ thống có thể phục vụ được đồng thời là 5x500 truy vấn.

# Bài toán áp dụng

Nhân bản máy chủ cơ sở dữ liệu sẽ hữu ích khi xử lý các bài toán sau:

- **Mở rộng khả năng phục vụ của hệ thống:** Khi một hệ thống có nhiều người sử dụng, nhiều truy vấn cần được thực thi (đa số là các truy vấn đọc) thì việc nhân bản là cần thiết. Nó sẽ giúp hệ thống phục vụ được nhiều truy vấn hơn từ đó đáp ứng được nhiều người sử dụng hơn. Khi người sử dụng ở nhiều nơi cách xa nhau về địa lý thì việc nhân bản này cũng rất cần thiết. Việc nhân bản sẽ tạo ra nhiều máy chủ. Chúng ta sẽ đặt các máy chủ đó ở gần người dùng hơn giúp người dùng ở xa truy cập hệ thống dễ dàng hơn.
- **Giúp cho việc báo cáo phân tích dữ liệu:** Một số hệ thống cho phép một số người (người làm báo cáo, thống kê,...) truy cập vào dữ liệu phục vụ cho công việc của họ. Việc truy cập  thẳng vào dữ liệu production sẽ rất nguy hiểm vì có thể sẽ vô tình thực thi các câu truy vấn tốn nhiều tài nguyên, thời gian truy vấn dài làm treo hệ thống,... Việc cài đặt một máy chủ làm dữ liệu báo cáo sẽ giải quyết được vấn đề trên.
- **Sao lưu cơ sở dữ liệu theo thời gian thực:** Thông thường ta sẽ có một giải pháp sao lưu cơ sở dữ liệu offline định kì 1 ngày 1 lần hoặc 1 giờ một lần. Tuy nhiên khi cơ sở dữ liệu chưa được sao lưu mà máy chủ bị lỗi thì dữ liệu bị mất trong 1 giờ hay 1 ngày kia sẽ gây thiệt hại lớn đối với một số hệ thống giao dịch, thanh toán, thương mại điện tử,... Việc tạo các máy chủ nhân bản sẽ đóng vai trò như một cơ sở dữ liệu sao lưu realtime sẽ khắc phục được vấn đề trên. 

**Chú ý:** Nhân bản máy chủ cơ sở dữ liệu không phải là một giải pháp để tăng tốc việc thực hiện câu truy vấn mà nó chỉ giúp hệ thống phục vụ được nhiều người dùng cùng một lúc hơn. Tức là khi hệ thống của bạn chỉ có một người dùng duy nhất thì việc bạn có nhiều máy chủ cơ sở dữ liệu hay chỉ có một máy chủ cùng cấu hình thì tốc độ thực hiện câu truy vấn là như nhau. 

# Một số mô hình hoạt động

Mô hình database replication thông thường sẽ có 1 máy chủ **master** để thực hiện ghi (**write**) dữ liệu và nhiều máy chủ **slave** thực hiện nhiệm vụ đọc (**read**) dữ liệu. Các máy chủ **slave** sẽ tự động đồng bộ dữ liệu của máy chủ **master**. Tất nhiên máy chủ master cũng có thể đọc được dữ liệu. Trong trường hợp mới ghi dữ liệu vào mà muốn đọc ngay thì sẽ đọc trực tiếp trên **master** tránh trường hợp **slave** chưa được đồng bộ.

## Mô hình cụm máy chủ web - database

![](https://images.viblo.asia/d9190f56-c2f1-4abd-8409-ea2c16ae25bc.png)

Đây là mô hình có các cụm máy chủ web và database được gộp từng nhóm với nhau. Các máy chủ web sẽ đọc trực tiếp dữ liệu từ máy chủ database mà nó liên kết. Và tất cả các máy chủ web muốn ghi dữ liệu đều phải gửi truy vấn đến máy chủ **database master** . Mô hình này được sử dụng trong trường hợp người dùng phân bố ở những nơi xa nhau về mặt địa lý. Việc đặt cụm máy chủ web và database gần người dùng hơn sẽ giúp cho việc truy cập dễ dàng hơn.

## Mô hình cân bằng tải web, database riêng biệt

![](https://images.viblo.asia/8532e2c9-3902-4052-99cf-ea1a28c4818d.png)

Mô hình sử dụng cân bằng tải các truy vấn đến máy chủ cơ sở dữ liệu sẽ giúp phân bổ các truy vấn cho từng máy chủ hợp lý hơn, tránh việc một máy chủ nào đó bị quá tải. Tất nhiên trong mô hình này việc ghi dữ liệu cũng phải thực hiện ở máy chủ cơ sở dữ liệu **master**.


# Laravel và MySQL Replication
Bạn để ý rằng một hệ thống MySQL Replication đều có máy chủ **master** dùng để đọc hoặc ghi còn các máy chủ **slave** chỉ được dùng để đọc. Như vậy sẽ có 2 kết nối đến các máy chủ khác nhau. Thao tác thêm (create), sửa (update), xóa (delete) là các thao tác ghi, sẽ được thực hiện trên máy chủ **master**. Còn thao tác đọc (select) thì có thể được sử dụng trên mọi máy chủ. Trong laravel, bạn có thể cài đặt `host` dùng để đọc và `host` dùng để ghi một cách riêng rẽ thông qua file cấu hình `config/database.php`.

Để hiểu rõ hơn bây giờ chúng ta sẽ đi vào việc cài đặt một hệ thống web đơn giản sử dụng framework laravel và MySQL Replication. Trong hệ thống này mình chỉ cài đặt 2 mysql server (1 master, 1 slave) và 1 laravel server.

Sơ đồ của hệ thống sẽ như sau:

![](https://images.viblo.asia/d4599abc-43c9-4856-83bc-2a56e3746a68.png)

Trong bài viết này mình sử dụng máy chủ chạy hệ điều hành ubuntu 18.04. Đối với những máy chủ có hệ điều hành khác thì cách cài đặt có thể khác nhưng file cấu hình vẫn tương tự.

## Cài đặt và cấu hình MySQL Replication

Thông tin 2 máy chủ:

- Hệ điều hành: Ubuntu server 18.04
- Địa chỉ ip:
    - master: 10.0.4.4
    - slave: 10.0.4.5
- Hệ quản trị cơ sở dữ liệu: MySQL 5.7

### Cài đặt mysql

Để cài đặt mysql-server vào máy ta dùng lệnh

```
sudo apt-get update
sudo apt-get install mysql-server
```

Kiểm tra phiên bản đã cài đặt

```
mysql --version
```

Kiểm tra trạng thái hoạt động

```
systemctl status mysql.service
```

Cấu hình MySQL

```
sudo mysql_secure_installation
```

### Cấu hình MySQL Master Server

Thay đổi tập tin cấu hình `/etc/mysql/mysql.conf.d/mysqld.cnf` như sau:

```
[mysqld]
# Bind to local private network rather than just loopback/localhost
# so others can connect to this server on the private networks
bind-address = 10.0.4.4

# Give the server an ID (any ID is fine)
server-id = 1

# Setup the binlog to be written to:
log-bin = /var/lib/mysql/mysql-bin
sync-binlog = 1

# Enable GTID replication
gtid-mode                      = ON # Must be "ON", is not a boolean
enforce-gtid-consistency       = 1
binlog-format                  = MIXED
```

Chúng ta sử dụng **binary logging** để phục vụ cho việc nhân bản. **Binary logging** sẽ theo dõi tất cả các truy vấn dẫn đến thay đổi cơ sở dữ liệu.

- Cài đặt `sync-binlog = 1` là để tất cả các transactions sẽ được ghi vào binlog trước khi chúng được committed. Điều này sẽ tránh mất dữ liệu khi máy chủ gặp sự cố. Tuy nhiên hiệu năng hoạt động của máy chủ sẽ giảm đi một chút. Giá trị này có thể được cài đặt cao hơn, được đặt bằng số **n** chẳng hạn. Ý nghĩa của nó là sau **n** commits thì MySQL sẽ được ghi vào **binlog**. Như vậy giá trị `sync-binlog` càng cao thì khả năng mất dữ liệu càng lớn nhưng hiệu suất sẽ tăng.
- `enforce-gtid-consistency = 1` là bắt buộc khi `gtid-mode` được bật (`on`).
- `binlog-format` quy định cách mà dữ liệu được ghi vào **binlog**. Giá trị của nó có thể là: (i) **statement** Các câu lệnh sẽ được chuyển từ `master` sang `slave` (ii) **row** dữ liệu từng hàng sẽ được chuyển từ `master` sang `slave` (iii) **mixed** kết hợp 2 loại trên, mặc định sẽ là `statement` chuyển sang `row` trong một số tình huống nhất định.

Sau khi thay đổi cấu hình xong thì khởi động lại mysql

```
sudo service mysql restart
```

Xem lại các thay đổi trên dùng lệnh sau trong MySQL Command-Line Client

```
mysql> show variables like '%GTID%';
+----------------------------------+-----------+
| Variable_name                    | Value     |
+----------------------------------+-----------+
| binlog_gtid_simple_recovery      | ON        |
| enforce_gtid_consistency         | ON        |
| gtid_executed_compression_period | 1000      |
| gtid_mode                        | ON        |
| gtid_next                        | AUTOMATIC |
| gtid_owned                       |           |
| gtid_purged                      |           |
| session_track_gtids              | OFF       |
+----------------------------------+-----------+
8 rows in set (0.00 sec)
```

Tạo `user` để phục vụ việc nhân bản. User sẽ được bind với địa chỉ ip của máy `slave`. `Slave server` sẽ sử dụng user này để truy cập vào `master server`.

```
mysql -u root -p -e "GRANT REPLICATION SLAVE ON *.* TO 'replica'@'10.0.4.5' IDENTIFIED BY 'secret';"
mysql -u root -p -e "FLUSH PRIVILEGES;"
```

Tiếp theo ta cần sao lưu toàn bộ cơ sở dữ liệu của `master server`. Để làm được điều này ta phải cài đặt cho `master server` chỉ đọc (`read_only`). Sau đó dùng `mysqldump` để export toàn bộ cơ sở dữ liệu ra. Cuối cùng là bỏ trạng thái `read_only` của `master server`. Chi tiết cụ thể như sau:

- Cài đặt chỉ đọc

```
mysql> FLUSH TABLES WITH READ LOCK;
mysql> SET GLOBAL read_only = ON;
```

- Export dữ liệu

```
mysqldump -u root -p --single-transaction --default-character-set=utf8mb4 --all-databases --triggers --routines --events > backup.sql
```

- Bỏ trạng thái `read_only`

```
mysql> SET GLOBAL read_only = OFF;
mysql> UNLOCK TABLES;
```

### Cấu hình MySQL Slave Server

Thay đổi tập tin cấu hình `/etc/mysql/mysql.conf.d/mysqld.cnf` như sau:

```
[mysqld]
# Bind to local private network rather than just loopback/localhost
# so others can connect to this server on the private networks
bind-address = 10.0.4.5

# BINLOG
log-bin = /var/lib/mysql/mysql-bin
sync-binlog = 1
binlog-format = MIXED
server-id = 2
expire-logs-days = 14

# REPLICATION
gtid-mode = ON
enforce-gtid-consistency = 1
relay-log = /var/lib/mysql/mysql-relay-bin
```

Sau khi thay đổi cấu hình xong thì khởi động lại mysql

```
sudo service mysql restart
```


Để truyền được file từ `master` sang `slave` ta sử dụng lệnh `scp` tải file backup từ master về máy sau đó lại dùng lệnh này để tải file backup từ máy của mình lên server slave.

```
# download: remote -> local
scp user@remote_host:remote_file local_file 

# upload: local -> remote
scp local_file user@remote_host:remote_file
```

Tiếp theo import dữ liệu từ file dữ liệu backup lên `slave server`:

```
mysql -u root -p < backup.sql
```

Bắt đầu quá trình nhân bản (**replicating**) sử dụng 2 lệnh mysql sau:

```
mysql> CHANGE MASTER TO MASTER_HOST='10.0.4.4',MASTER_USER='replica', MASTER_PASSWORD='secret', MASTER_AUTO_POSITION = 1;
mysql> START SLAVE;
```

Kiểm tra trạng thái quá trình replication

```
mysql> SHOW SLAVE STATUS\G
```

## Cài đặt và cấu hình Laravel

Cấu hình máy chủ đọc/ghi cơ sở dữ liệu với laravel rất đơn giản. Ta chỉ cần thay đổi file cấu hình `config/database.php`

```
// config/database.php
<?php
return [

    'default' => env('DB_CONNECTION', 'mysql'),

    'connections' => [
        'mysql' => [
            'read' => ['host' => env('DB_READ_HOST', '')],
            'write' => ['host' => env('DB_HOST', '')],
            'sticky' => true,
            'driver' => 'mysql',
             # 'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ],
    ],
];
```

Và cài đặt thêm biến trong file cấu hình `.env`

```
DB_READ_HOST=10.0.4.5
DB_HOST=10.0.4.4
```

Mình giải thích một chút về cấu hình bên trên:

- `sticky` được đặt là `true` nghĩa là khi ghi dữ liệu vào database và đọc ngay thì truy vấn đọc sẽ được thực hiện trực tiếp trên `master server`. Nó sẽ khắc phục được trường hợp máy chủ master được ghi dữ liệu nhưng máy chủ slave chưa kịp cập nhật dữ liệu dẫn đến khi đọc trên slave dữ liệu có thể chưa được mới nhất.
- `host` trong `read` có thể truyền vào một mảng ip nếu bạn có nhiều `scale server`. Laravel sẽ chọn ngẫu nhiên một server trong danh sách để kết nối.

# Kết luận

Như vậy chúng ta đã cùng tìm hiểu xong MySQL Replication là gì và cách cấu hình nó, tích hợp nó vào hệ thống sử dụng laravel framework. Bài viết của mình xin kết thúc tại đây. Hi vọng sẽ giúp ích được cho các bạn. Nếu bạn thấy hay thì hãy upvote và chia sẻ cho bạn bè cùng đọc. Đừng quên Follow mình để nhận được thông báo khi mình có bài viết mới nhé. Chúc các bạn có một ngày tốt lành!