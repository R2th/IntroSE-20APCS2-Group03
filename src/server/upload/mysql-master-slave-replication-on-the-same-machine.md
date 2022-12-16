Gần đây mình có nhớ lại một vài kiến thức học từ thời đại học mà mình khá ấn tượng trong đó có công nghệ `Replication` của MySQL, `Replication` là gì thì bạn có thể tham khảo thêm ở bài viết sau cũng trên viblo [Replication in MySQL](https://viblo.asia/p/replication-in-mysql-d6BAMYAnMnjz).Ngày đó hồi còn đi học mình thực hành trong trường hợp Master và Slave ở trên cùng một máy tính của mình.

Thực tế thì trong quá trình làm việc một MySQL developer cũng cần test thử xem replication có hoạt động ổn không, và tất nhiên sẽ cần test trước trên môi trường development trước khi deploy những thay đổi đó.Mình có đọc được một bài viết khá hay và chi tiết muốn chia sẻ để mọi người tự thực hiện và nghiên cứu thêm.Let's go!

## Installation of the first MySQL instance
Trước hết bạn cần install MySQL database trên máy của mình, mình dùng ubuntu nên command sẽ là:

```
sudo apt-get install mysql-server
```

Trong qúa trình cài đặt cũng nên nghĩ cho mình một password ổn ổn cho MySQL root user chứ nhỉ :)

## Setting up mysqld_multi

Để quản lý hai MySQL instances trên cùng một máy một cách hiệu quả, chúng ta cần sử dụng `mysqld_multi`.

Bước đầu tiên khi setup `mysqld_multi` là tạo ra 2 group [mysqld] tách biệt trong `my.cfn` file. Default location của my.cfn file trong Ubuntu là `/etc/mysql/`.

Tiếp theo chúng ta mở file `my.cfn` với text editor bạn yêu thích rồi đổi tên group `[mysqld]` thành `[mysqld1]`.Tất nhiên `[mysqld1]` sẽ được sử dụng cho MySQL instance thứ nhất và cũng được configure như là một master instance.

Lưu ý rằng mỗi instance mà chúng ta sử dụng đều phải có unique `server-id`, thêm dòng sau vào group `[mysqld1]`.

```
server-id = 1
```

Vì chúng ta muốn tách biệt group `[mysqld]` cho MySQL instance thứ 2, copy group `[mysqld1]` với tất cả các config hiện tại và paste vào bên dưới trong file `my.cfn` tương ứng.OK giờ chúng ta sẽ đổi tên group vừa được copy thành `[mysqld2]`, và thêm một số thay đổi sau trong config cho slave:

```
server-id           = 2
port                = 3307
socket              = /var/run/mysqld/mysqld_slave.sock
pid-file            = /var/run/mysqld/mysqld_slave.pid
datadir             = /var/lib/mysql_slave
log_error           = /var/log/mysql_slave/error_slave.log
relay-log           = /var/log/mysql_slave/relay-bin
relay-log-index     = /var/log/mysql_slave/relay-bin.index
master-info-file    = /var/log/mysql_slave/master.info
relay-log-info-file = /var/log/mysql_slave/relay-log.info
read_only           = 1
```

Để setup MySQL instance thứ 2 như một slave, chúng ta cần set `server-id` là 2, và tất nhiên nó sẽ khác `server-id` của master.

Vì cả 2 instance sẽ chạy trên một máy tính, do đó chúng ta cần set port cho instance thứ 2 thành 3307, khi đó nó sẽ khác với port của instance thứ nhất sử dụng port 3306(mặc định).

Để enable instance thứ 2 cũng sử dụng MySQL binaries, chúng ta cần set giá trị khác cho `socket`, `pid-file`, `datadir` và `log_error`.

Chúng ta cũng cần enable `relay-log` để sử dụng instance thứ 2 như là một slave(parameters `relay-log`, `relay-log-index` và `relay-log-info-file`), cũng như set `master-info-file`.

Cuối cùng vì ta muốn slave instance chỉ được quyền đọc nên ta set parameter `read_only` là 1.Bạn nên rất cẩn thận với lựa chọn này vì nó không hoàn toàn ngăn các thay đổi trên slave.

Khi `read_only` được set thành 1, các cập nhật chỉ được cho phép từ các user có quyền SUPER.Gần đây Mysql đã giới thiệu parameter mới là `super_read_only`, để chặn SUPER user thực hiện một số thay đổi.option này có ở version 5.7.8.
Ngoài 2 group `[mysqld1]` và `[mysqld2]`, chúng ta cũng cần add một group mới `[mysqld_multi]` vào `my.cfn` file.

```
[mysqld_multi]
mysqld     = /usr/bin/mysqld_safe
mysqladmin = /usr/bin/mysqladmin
user       = multi_admin
password   = multipass
```

Lần cài đặt MySQL instance thứ 2, chúng ta start cả 2.Chúng ta sẽ cung cấp các quyền thích hợp tới `multi_admin` user để có thể shut down MySQL instance.

## Create new folders for the second MySQL instance

Ở bước trước đó chúng ta đã chuẩn bị config file cho MySQL instance thứ 2.Ở trong config file, 2 folders mới được sử dụng.Sư dụng Linux command sau để tạo các folder đó với các quyền thích hợp:

```
mkdir -p /var/lib/mysql_slave
chmod --reference /var/lib/mysql /var/lib/mysql_slave
chown --reference /var/lib/mysql /var/lib/mysql_slave

mkdir -p /var/log/mysql_slave
chmod --reference /var/log/mysql /var/log/mysql_slave
chown --reference /var/log/mysql /var/log/mysql_slave
```

## Additional security settings in AppArmor

Trên một vài môi trường Linux [AppArmor](https://wiki.ubuntu.com/AppArmor) security settings cần chạy MySQL instance thứ 2.Ít nhất là nó required trên Ubuntu.
Để set-up AppArmor riêng, chúng ta edit file `/etc/apparmor.d/usr.sbin.mysqld`, thêm các dòng dưới đây:

```
/var/lib/mysql_slave/ r,
/var/lib/mysql_slave/** rwk,
/var/log/mysql_slave/ r,
/var/log/mysql_slave/* rw,
/var/run/mysqld/mysqld_slave.pid rw,
/var/run/mysqld/mysqld_slave.sock w,
/run/mysqld/mysqld_slave.pid rw,
/run/mysqld/mysqld_slave.sock w,
```

Sau khi safe lại, chúng ta cần reboot lại máy tính để apply các thay đổi.

## Installation of the second MySQL instance

Một số cách tiếp cận khác nhau có thể dựa theo cách cài đặt của MySQL instance thứ 2.Cách tiếp cận được trình bày trong hướng dẫn này sử dụng giống với MySQL binaries đầu tiên, với các files data riêng biệt cần thiết cho lần cài đặt thứ hai.

Vì chúng ta đã chuẩn bị file cấu hình và các thư mục cần thiết, các thay đổi bảo mật trong các bước trước, bước cài đặt cuối cùng của MySQL instance thứ hai là khởi tạo thư mục MySQL data.
Thực hiện command sau để khởi tạo thư mục MySQL data mới:

```
mysql_install_db --user=mysql --datadir=/var/lib/mysql_slave
```

MySQL data directory đã được khởi tạo, chúng ta cần start cả 2 MySQL instances sử dụng `mysqld_multi` service:

```
mysqld_multi start
```
Set root password cho MySQL instance thứ 2 bằng cách sử dụng `mysqladmin` với host và port thích hợp.Ghi nhớ rằng, nếu host và port không xác định thì `mysqladmin` sẽ connect tới MySQL instance thứ nhất như mặc định:

```
mysqladmin --host=127.0.0.1 --port=3307 -u root password rootpwd
```

Trong ví dụ phía trên chúng ta đã set password thành `rootpwd`, tuy nhiên bạn nên sử dụng password nào đó bảo mật hơn thì càng tốt nhé.


## Additional configuration of mysqld_multi
Ở cuối của mục `Setting up mysqld_multi` chúng ta có nói tới việc cấp quyền thích hợp trong `multi_admin` cho người dùng sau này.OK chúng ta sẽ triển khai ngay bây giờ.Chúng ta sẽ cấp quyền thích hợp cho cả 2 instance, đầu tiên chúng ta sẽ connect tới instance đầu tiên.

```
mysql --host=127.0.0.1 --port=3306 -uroot -p
```

Khi đã log in, thực hiện tiếp 2 command sau:

```
mysql> GRANT SHUTDOWN ON *.* TO 'multi_admin'@'localhost' IDENTIFIED BY 'multipass';
mysql> FLUSH PRIVILEGES;
```

Exit từ MySQL client và connect tới instance thứ 2

```
mysql --host=127.0.0.1 --port=3307 -uroot -p
```

Khi đã log in, thực hiện tiếp 2 command sau:

```
mysql> GRANT SHUTDOWN ON *.* TO 'multi_admin'@'localhost' IDENTIFIED BY 'multipass';
mysql> FLUSH PRIVILEGES;
```

Exit khỏi MySQL client.

## Start both MySQL instances automatically on boot

Bước cuối cùng để setting `mysqld_multi` là cài đặt automatic boot script trong `init.d`
Để làm được điều đó, tạo một file mới là `mysqld_multi` trong `/etc/init.d`, sau đó set quyền thích hợp:

```
cd /etc/init.d
touch mysqld_multi
chmod +x /etc/init.d/mysqld_multi
```

Mở file mới tạo trong text editor rồi copy script sau đây:

```
#!/bin/sh

### BEGIN INIT INFO
# Provides:      	scriptname
# Required-Start:	$remote_fs $syslog
# Required-Stop: 	$remote_fs $syslog
# Default-Start: 	2 3 4 5
# Default-Stop:  	0 1 6
# Short-Description: Start daemon at boot time
# Description:   	Enable service provided by daemon.
### END INIT INFO

bindir=/usr/bin

if test -x $bindir/mysqld_multi
then
    mysqld_multi="$bindir/mysqld_multi";
else
    echo "Can't execute $bindir/mysqld_multi";
    exit;
fi

case "$1" in
    'start' )
   	 "$mysqld_multi" start $2
   	 ;;
    'stop' )
   	 "$mysqld_multi" stop $2
   	 ;;
    'report' )
   	 "$mysqld_multi" report $2
   	 ;;
    'restart' )
   	 "$mysqld_multi" stop $2
   	 "$mysqld_multi" start $2
   	 ;;
    *)
   	 echo "Usage: $0 {start|stop|report|restart}" >&2
   	 ;;
esac
```

Add `mysqld_multi` service vào default `runlevels` với command dưới đây:

```
update-rc.d mysqld_multi defaults
```

Reboot lại máy tính của bạn và check cả 2 MySQL instance đã run hay chưa bằng command sau:

```
mysqld_multi report
```

## Setup master-slave replication

Bây giờ chúng ta đã có 2 MySQL instances chạy cùng trên một máy chuẩn bị đến phần long trọng và được mong đợi nhất rồi: setup một instance là master, một là slave.
Chúng ta sẽ edit `my.cnf` file với những sự thay đổi sau đây trong group `[mysqld1]`

```
log_bin                    	= /var/log/mysql/mysql-bin.log
innodb_flush_log_at_trx_commit  = 1
sync_binlog                	= 1
binlog-format              	= ROW
```

Restart master MySQL instance để apply các thay đổi:

```
mysqld_multi stop 1
mysqld_multi start 1
```

Để slave có thể connect tới master với quyền replication đúng, nên create một user mới trên master.Connect tới master instance sử dụng MySQL client với host và port thích hợp:

```
mysql -uroot -p --host=127.0.0.1 --port=3306
```

Tạo user mới cho replication:

```
mysql> CREATE USER 'replication'@'%' IDENTIFIED BY 'replication';
mysql> GRANT REPLICATION SLAVE ON *.* TO 'replication'@'%';
```

Exit MySQL client.
Thực thi lệnh sau để dump master data:

```
mysqldump -uroot -p --host=127.0.0.1 --port=3306 --all-databases --master-data=2 > replicationdump.sql
```

Ở đây chúng ta sử dụng option `--master-data=2` để có một comment chứa trạng thái của `CHANGE MASTER` trong backup file.Comment đó như sau:

```
--
-- Position to start replication or point-in-time recovery from
--

-- CHANGE MASTER TO MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=349;
```

Import dump database chúng ta đã tạo ở bước trước vào slave instance:

```
mysql -uroot -p --host=127.0.0.1 --port=3307 < replicationdump.sql
```

Cuối cùng để slave instance connect với master instance, master thông tin tới slave cần được update với connection parameters thích hợp.
Connect tới slave instance sử dụng MySQL client với host và port thích hợp:

```
mysql -uroot -p --host=127.0.0.1 --port=3307
```

Thực thi command sau để update thông tin master:

```
mysql> CHANGE MASTER TO
	-> MASTER_HOST='127.0.0.1',
	-> MASTER_USER='replication',
	-> MASTER_PASSWORD='replication',
	-> MASTER_LOG_FILE='mysql-bin.000001',
	-> MASTER_LOG_POS=349;
```

Để start slave chúng ta dùng:

```
mysql> START SLAVE;
```

Kiểm tra lại xem replication đã được chạy chưa:

```
mysql> SHOW SLAVE STATUS \G
```

Ok, chúng ta đã hoàn thành được ví dụ về replication giữa master và slave khi chúng ở trên cùng một máy tính.Chúc mọi người áp dụng thành công!
Tham Khảo: [MySQL Master-Slave Replication on the Same Machine](https://www.toptal.com/mysql/mysql-master-slave-replication-tutorial)