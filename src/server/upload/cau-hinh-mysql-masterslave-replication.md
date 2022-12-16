# Cấu hình Mysql master/slave replication

## `Mysql Replication` là gì ?

`Mysql Replication` là quá trình sao chép dữ liệu từ bản chính(master) sang nhiều bản phụ(slave).
Điều này rất hữ ích vì nó giúp cho việc phân vùng khi phần tích, truy xuất dữ liệu trong mysql mà không cần phải sử dụng dữ liệu gốc.

Hướng dẫn này sẽ trình bày 1 cách đơn giản để cấu hình `replication`  trong Mysql (một master sẽ chia sẻ dữ liệu với 1 slave). Để làm quá trình này bạn cần 2 địa chỉ IP trong cùng 1 giải mạng đóng vai trò là một master- một salve.

Trong phần này mình xin lấy 2 ví dụ:

- 192.168.107.103 | master
- 193.168.107.104 | slave

## Cài Đặt

Bài này mình sẽ cần quyền sudo của 2 server ở trên vì cần config đến mysql. 
Nếu 2 máy chưa có mysql có thể cài đặt 
```
sudo apt-get install mysql-server mysql-client
```

### Cài đặt server `Master`

Đầu tiên mở file config mysql: 
``` 
sudo vi /etc/mysql/my.cnf
```

Bạn cần config các thứ sau:

```
bind-address  = 127.0.0.1
```
Đây là giá trị mặc định khi bạn cài mysql nó cũng có thể là giá trị `localhost` hoặc dòng này đã bị comment.
Nhiệm vụ của bạn là sửa lại thành:

```
bind-address  = 192.168.107.103 
```

Bước tiếp theo: cần config `server-id`. Bạn có thể đăt giá trị là bất kỳ số nguyên nào, tuy nhiên hãy bảo đảm rằng trong hệ thống master/salve sẽ ko có sự trùng nhau. Và ở đây mình xin set là 1.

```
server-id               = 1
```
Chuyển sang dòng `log_bin`. Đây là nơi giữ các chi tiết thực sự của bản sao. Các `Slave` sao chép tất cả các thay đổi. Đối với bước này, chúng ta chỉ cần bỏ ghi chú dòng tham chiếu đến log_bin:

```
log_bin                 = /var/log/mysql/mysql-bin.log
```

`Config không bắt buộc:`

Phần này theo mình đọc tài liệu thì sẽ có 
```
binlog_do_db            = newdatabase
```
Nghĩa là chỉ đến database bạn cần replicate.

Thhêm phần nữa là show log của mysql . Phần này giúp bạn có thể theo dõi log truyên qua lại giữa 2 server. Quan trọng hơn là giúp bạn xem được log khi có cấu hình read/write.
```
general_log_file        = /var/log/mysql/mysql.log
```


Restart lại server

```
sudo service mysql restart
```

Đồng thời bạn cần tạo 1 user để sử dụng trong việc slave trên user master:
```
GRANT REPLICATION SLAVE ON *.* TO 'slave_user'@'%' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```
Để hiểu thêm phần này có thểm tham khảo [Link](https://viblo.asia/p/lam-the-nao-de-tao-va-cap-quyen-truy-cap-cho-mot-user-trong-mysql-Qbq5QgYwZD8)

Tiếp theo xem bạn đã câu hình thành công mysql master chưa bạn vào mysql

```
mysql -uroot
```
Và sử gõ lệnh:

```
SHOW MASTER STATUS;

=> 

mysql> SHOW MASTER STATUS;
+------------------+----------+--------------+------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB |
+------------------+----------+--------------+------------------+
| mysql-bin.000001 |      107 |              |                  |
+------------------+----------+--------------+------------------+
1 row in set (0.00 sec)
```

Phần này bạn cần chú ý 2 giá trị: `File` vs `Position` để giúp cho cấu hình replicate.


### Cài đặt server `Replicate`

Như trên cấu hình `Master`

Bạn cần vào file:

```
sudo nano /etc/mysql/my.cnf
```

Chỉnh sửa thuộc tính: 
```
server-id               = 2
```

ở đay mình để là `2` khác với `1` ở master

Và cấu hình 2 thuộc tính để hỗ trợ log:

```
relay-log               = /var/log/mysql/mysql-relay-bin.log
log_bin                 = /var/log/mysql/mysql-bin.log
```

Và restart lại server mysql
```
sudo service mysql restart
```

Tiếp theo cần thêm 1 việc quan trọng là add user slave ở master cho server mới này:

```
CHANGE MASTER TO MASTER_HOST='192.168.107.103 ',MASTER_USER='slave_user', MASTER_PASSWORD='password', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=  107;
```

Lệnh này thực hiện một số cài đặt:

1. Server mysql này là slave của server MASTER_HOST.
2. Cài đặt user, pasword của máy server mysql master.
3. Nó cho phép máy chủ slave biết bắt đầu sao chép từ đâu 


Cuối cùng bạn cần bật slave của server:

```
START SLAVE;
```

Và có thể xem chi tiết cấu hình trên slave:

```
SHOW SLAVE STATUS\G
```

## Kết Luận

Bài này là phần mình tìm hiểu khi làm việc với cơ chế `read/write` của mysql (1 server để phục vụ insert, 1 server phục vụ việc select).
Và khi cơ chế master/slave replicate đã hỗ trợ mình copy data từ server master -> salve.
Hi vọng bài tới có thời gian mình sẽ chia sẻ về cơ chế `read/write ` trong ruby.
Bài viết tham khảo tại: [digitalocean](https://www.digitalocean.com/community/tutorials/how-to-set-up-master-slave-replication-in-mysql)
Thanks!