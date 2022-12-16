Zabbix là một công cụ giám sát dịch vụ hệ thống mạng phân tán mã nguồn mở, có nhiều tính năng độc đáo và khả năng tùy biến cao. Zabbix có khả năng phục vụ cho hệ thống mạng tầm trung và lớn của các doanh nghiệp hiện tại với mức chi phí đầu tư vừa phải. Zabbix được thiết kế để giám sat, theo dõi trạng thái hoạt động của hạ tầng mạng (network), máy chủ (server), các ứng dụng (applications) theo thời gian thực. Phát triển theo mô hình client - server, zabbix có thể thu thập các loại dữ liệu khác nhau nhằm tạo biểu đồ thống kê về hiệu suất hay trạng thái tải (load trends) của các đối tượng được giám sát.

**Trong bài viết hôm nay, mình sẽ hướng dẫn các bạn cài đặt Zabbix Server version 5.0 trên hệ điều hành Centos 7.**

**Bước 1: Cấu hình Selinux sang chế độ cho phép**
```
setenforce 0 && sed -i 's/^SELINUX=.*/SELINUX=permissive/g' /etc/selinux/config
```

**Bước 2: Cài đặt Zabbix server**

* Cài đặt Zabbix repository
```
rpm -Uvh https://repo.zabbix.com/zabbix/5.0/rhel/7/x86_64/zabbix-release-5.0-1.el7.noarch.rpm
yum clean all
```

* Cài đặt Zabbix Server & Zabbix Agent
```
yum install zabbix-server-mysql zabbix-agent
```

* Cài đặt Zabbix frontend
```
yum install -y centos-release-scl
```

Chỉnh sửa tập tin zabbix.repo để bật cho phép cài zabbix-frontend từ responsitory
```
vi /etc/yum.repos.d/zabbix.repo
```

Đặt giá trị enable = 1 vào [zabbix-frontend]
Sau đó tiến hình cài đặt Zabbix frontend từ repository
```
yum install zabbix-web-mysql-scl zabbix-apache-conf-scl
```

**Bước 3: Cài đặt MariaDB**
* Thêm repository cài đặt MariaDB
MariaDB thì các bạn có thể cài đặt từ repo hoặc từ gói tar, ở đây mình sẽ cài từ repo
Để thêm repository để cài đặt MariaDB ta tiến hành tạo file mariadb.repo như sau:
```
vi /etc/yum.repos.d/mariadb.repo
```

Copy và paste đoạn text sau vào và save lại file:
```
# MariaDB 10.5 CentOS repository list - created 2021-08-31 10:52 UTC
# http://downloads.mariadb.org/mariadb/repositories/
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.5/centos7-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```

* Cài đặt MariaDB Server và MariaDB Client
```
yum install MariaDB-server MariaDB-client -y
```

* Khởi động MariaDB Service
```
systemctl enable mariadb
systemctl start mariadb
```

* Đặt lại mật khẩu cho database
Bảo mật mysql bằng cách thay đổi mật khẩu mặc định cho Mysql root:
```
mysql_secure_installation

Enter current password for root (enter for none): Nhấn Enter
Set root password? [Y/n]: Y
New password: <Nhập root DB password>
Re-enter new password: <Nhập lại root DB password>
Remove anonymous users? [Y/n]: Y
Disallow root login remotely? [Y/n]: Y
Remove test database and access to it? [Y/n]: Y
Reload privilege tables now? [Y/n]: Y
```

Lưu ý: từ phiên bản MariaDB 10.04 trở đi các bạn có thể login mà không cần nhập password
```
mysql -uroot
```

* Tạo User và Database cho Zabbix
```
create database zabbix character set utf8 collate utf8_bin;
create user zabbix@localhost identified by 'password';
grant all privileges on zabbix.* to zabbix@localhost;
quit;
```

* Import database Zabbix
Tạm thời cấu hình innodb_strict_mode = OFF để tránh lỗi Mysql "ERROR 1118 (42000) at line 1284: Row size too large (> 8126)"
```
mysql -uroot -p'rootDBpass' zabbix -e "set global innodb_strict_mode='OFF';"
```

Khi chạy lệnh import data và schema bạn sẽ được hỏi password, hãy nhập password bạn đã được tạo ở bước trên
```
zcat /usr/share/doc/zabbix-server-mysql*/create.sql.gz | mysql -uzabbix -p zabbix
```

Cấu hình lại  innodb_strict_mode = ON
```
mysql -uroot -p'rootDBpass' zabbix -e "set global innodb_strict_mode='ON';"
```

**Bước 4: Cấu hình Zabbix Server**
Chỉnh sửa file zabbix_server.conf
```
vi /etc/zabbix/zabbix_server.conf
```

Các tham số cần quan tâm:
- DBHost=localhost (Database Host)
- DBName=zabbix (Database Name)
- DBUser=zabbix (Database Username)
- DBPassword=password (Database Password)

**Bước 5: Cấu hình PHP**
Mở tập tin zabbix.conf uncomment ; php_value[date.timezone] = Europe/Riga và sửa thành Asia/Ho_Chi_Minh
```
vi /etc/opt/rh/rh-php72/php-fpm.d/zabbix.conf

php_value[date.timezone] = Asia/Ho_Chi_Minh
```

**Bước 6: Khởi động Zabbix Server và Agent**
```
systemctl restart zabbix-server zabbix-agent
systemctl enable zabbix-server zabbix-agent
```

**Bước 7: Khởi động lại web Apache server**
```
systemctl restart httpd rh-php72-php-fpm
systemctl enable httpd rh-php72-php-fpm
```

**Bước 8: Thiết lập firewall**
```
firewall-cmd --add-service={http,https} --permanent
firewall-cmd --add-port={10051/tcp,10050/tcp} --permanent
firewall-cmd --reload
```

Bước 9: Thiết lập Zabbix Dashboard
Sau khi hoàn tất các bước trên, chúng ta tiến hành mở trình duyệt và nhập địa chỉ http://ip_server/zabbix

![image.png](https://images.viblo.asia/86ab2572-5fb5-48f4-ae92-f3138be581e0.png)
<div align="center">Chọn Next</div>

![image.png](https://images.viblo.asia/8d848301-ad2f-4562-9bd2-6bc1f9d831d9.png)
<div align="center">Chọn Next</div>

![image.png](https://images.viblo.asia/c7f8a756-af1d-4201-ade4-4d638d15c7b5.png)
Nhập thông tin database chọn Next<div align="center"></div>

![image.png](https://images.viblo.asia/a84240ae-7aae-4a0e-9512-0fb50f5ea41f.png)
<div align="center">Đặt tên Zabbix Server chọn Next</div>

![image.png](https://images.viblo.asia/de3d52f2-5f82-49fa-a017-d0b7443acd66.png)
<div align="center">Chọn Next</div>

![image.png](https://images.viblo.asia/17b8f7a8-93f0-468a-98fe-85775f3b9fff.png)
<div align="center">Chọn Finish</div>

Sau khi thiết lập xong, bạn đăng nhập vào Zabbix Dashboard bằng tài khoản default Admin/zabbix
![image.png](https://images.viblo.asia/670c2e55-4062-4563-bbc3-61e47e2db44b.png)

Giao diện Dashboard trên Zabbix server
![image.png](https://images.viblo.asia/985f4e2c-a386-4fcb-8d2b-b77656571939.png)

Các bạn nhớ thay đổi mật khẩu của tài khoản quản trị (Admin) để đảm bảo ANTT, bạn truy cập Administrator --> Users --> Admin vào "change password"

Như vậy quá trình thực hiện các bước cài đặt Zabbix trên Centos đã hoàn thành.