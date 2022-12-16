Trong phần này sẽ xây dựng một hệ thống để phát triển ứng dụng Web bằng PHP trên Windows Subsystem for Linux: cài đặt gồm, máy chủ Web Apache, máy chủ dữ liệu MySQL và PHP, cấu hình để chúng làm việc rồi cài đặt Wordpress
## Cài đặt máy chủ Apache trên WSL 2
Mở dòng lệnh PS hoặc Windows Terminal, vào Ubuntu cài mặc định bằng lệnh wsl thực hiện các lệnh
```sh
sudo apt update && sudo apt upgrade -y
sudo apt install apache2
sudo service apache2 start
```
Apache đang chạy, truy cập địa chỉ http://localhost để kiểm tra
![](https://images.viblo.asia/f088db25-fe12-449d-8032-40ecdb0615f3.png)

Kiểm tra các module được nạp
```sh
apache2ctl -M
```
Nạp một module, ví dụ rewrite
```
sudo a2enmod rewrite
```
Cài đặt MySQL Server trong Ubuntu WSL
## Mặc định cài đặt MySQL 8
```sh
sudo apt install mysql-server -y
sudo service mysql start
````
Chỉnh cấu hình MySQL ở file ```/etc/mysql/my.cnf```, ví dụ cấu hình sử dụng xác thực kiểu mysql_native_password
```sh
[mysqld]
default_authentication_plugin=mysql_native_password
sudo service mysql restart
```
Cuối cùng, thử gõ lệnh sudo mysql để kết nối vào MySQL Server, gõ exit để thoát ra.
> Quản trị MySQL Server xem tại: [MySQL Server](https://xuanthulab.net/quan-tri-mysql-co-ban.html) 
## Cài đặt PHP Ubuntu WSL
Thực hiện lệnh
```
sudo apt install php libapache2-mod-php php-mysql -y
```
Kiểm tra 
Từ dòng lệnh gõ
```
php -v
```
## Cấu hình Apache làm việc với PHP
Mở file
```
sudo nano /etc/apache2/mods-enabled/dir.conf
```
Sửa lại nội dung của nó, cho index.php lên đầu.
```
<IfModule mod_dir.c>
        DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
</IfModule>
```
Tạo một file ```index.php``` với lệnh
```
sudo nano /var/www/html/index.php
```
Đưa nội dung sau vào:
```
<?php
    phpinfo();
?>
```
Truy cập lại http://localhost
![](https://images.viblo.asia/3b54fe10-1c7e-424c-9e3e-78076c4a21dc.png)

## Cài đặt Wordpress
Tải về Wordpress, giả sử thư mục làm việc của webiste sẽ ở trên máy Windows, tại thư mục: c:\mysite\site1 - có nghĩa là thư mục ```/mnt/c/mysite/site1``` trong Ubuntu

File tải về, giải nén vào thư mục site1

Mở file config của Apache

sudo nano /etc/apache2/apache2.conf
Cấu hình VirtualHost, truy cập bằng tên miền test.com, thì chạy ứng dụng Wordpress ở thư mục /mnt/c/mysite/site1/
```
<VirtualHost *:80>
    ServerName test.com
    DocumentRoot /mnt/c/mysite/site1/
    <Directory /mnt/c/mysite/site1/>
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
    </Directory>
</VirtualHost>
</pre>
```
Mở file ```C:\Windows\System32\drivers\etc\host``` của Windows (dùng notepad.exe với quyền Admin), thêm vào dòng thiết lập tên miền ảo test.com, trỏ tới IP 127.0.0.1
```
127.0.0.1 test.com
```
Hoặc lấy địa chỉ IP của Ubuntu bằng lệnh
```
ip a
```
Sau đó thiết lập test.com trỏ tới IP tìm được

Giờ truy cập http://test.com để bắt đầu cài Wordpress
![](https://images.viblo.asia/37f7c7db-2077-4570-bb51-cee6394e2a4e.png)
### Chuẩn bị CSDL
Vào MySQL bằng lệnh:
```
sudo mysql
```
Rồi thực hiện các câu lệnh (query) để tạo ra một user có tên testuser với password là 123456, tạo một database có tên wp_site1 và phân quền để testuser có mọi quyền trên database này
```sql
CREATE USER 'testuser'@'localhost' IDENTIFIED BY '123456';
create database wp_site1;
GRANT ALL PRIVILEGES ON wp_site1.* TO 'testuser'@'localhost';
FLUSH PRIVILEGES;
```
Quay trở lại cài đặt Wordpress, điền các thông tin trên vào
![](https://images.viblo.asia/e43b641f-d020-433a-8cca-cb8c88646a88.png)
Các quá trình sau rất đơn giản, thực hiện cho đến cuối bạn sẽ có một Website chạy trong Ubuntu với MySQL,PHP, Apache đồng thời mã nguồn bạn có thể sửa đổi trực tiếp từ Windows.

Tới thời điểm này WSL2 vẫn còn một số bất tiện chưa được Microsoft khắc phụ như: IP của thay đổi sau mỗi lần khởi động máy. Các dịch vụ cần chạy lại một cách thủ công khi khởi động lại.
Bài gốc: https://xuanthulab.net/cai-lamp-linux-apache-mysql-php-tren-windows-voi-wsl.html