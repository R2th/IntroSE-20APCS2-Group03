Nếu bạn làm nhiều project sử dụng các phiên bản PHP khác nhau, có thể bạn sẽ nghĩ đến cách chuyển đổi giữa các phiên bản PHP mỗi khi làm việc với project sử dụng phiên bản PHP khác. Tuy nhiên, điều này khá bất tiện. Bài viết này sẽ giúp bạn giải quyết vấn đề đó.

Hướng dẫn này mô tả cài đặt và cấu hình của hai Virtualhost trên Apache với các phiên bản PHP riêng biệt. Virtualhost đầu tiên sẽ hoạt động với PHP 5.6 và một Virtualhost khác sẽ chạy với PHP 7.2. Tuy nhiên, bạn cũng có thể sử dụng nhiều hơn hai phiên bản PHP tùy theo nhu cầu.
## Cài đặt Apache
Cài đặt Apache web server từ repository chính thức. Thực hiện các lệnh sau để cài đặt phiên bản mới nhất của Apache và mod FastCGI.
```bash
sudo apt update 

# Ubuntu 16.04
sudo apt install apache2 libapache2-mod-fastcgi 

# Ubuntu 18.04
sudo apt install apache2 libapache2-mod-fcgid
```
## Cài đặt PHP
Để cài đặt các phiên bản của PHP, chúng ta sử dụng PPA . Chạy các lệnh dưới đây để thêm PPA repository vào hệ thống.
```bash
sudo apt install python-software-properties
sudo add-apt-repository ppa:ondrej/php
```
Trong bài hướng dẫn này, mình sử dụng PHP 5.6 và PHP 7.2 để cấu hình với Apache. Để có thể chạy nhiều phiên bản PHP đồng thời, chúng ta sử dụng PHP FPM và mod FastCGI. Chạy các lệnh sau để cài đặt các phiên bản PHP cần thiết.
```bash
apt update
sudo apt install php5.6 php5.6-fpm
sudo apt install php7.2 php7.2-fpm
```
Sau khi cài đặt, service php-fpm sẽ tự khởi động. Sử dụng các lệnh sau để kiểm tra.
```bash
sudo systemctl status php5.6-fpm
sudo systemctl status php7.2-fpm
```
## Cấu hình Apache
Sau khi cài đặt xong, chúng ta cần kích hoạt một số module cần thiết để tích hợp PHP FPM và FastCGI với Apache.
```bash
# Ubuntu 16.04
sudo a2enmod actions fastcgi alias proxy_fcgi

# Ubuntu 18.04
sudo a2enmod actions fcgid alias proxy_fcgi
```
Mọi thứ đã sẵn sàng, bây giờ chúng ta sẽ thử tạo 2 trang web chạy hai phiên bản PHP khác nhau.
Đầu tiên, tạo hai thư mục chứa trang web:
```bash
sudo mkdir /var/www/php56
sudo mkdir /var/www/php72
```
Tiếp theo, tạo file index.php chứa ```phpinfo()```
```bash
echo "<?php phpinfo(); ?>" > /var/www/php56/index.php
echo "<?php phpinfo(); ?>" > /var/www/php72/index.php
```
Sau đó, tạo VirtualHost cho hai trang web vừa tạo. Các tệp cấu hình của Apache được lưu ở ```/etc/apache2/sites-available``` với phần mở rộng ```.conf```
Tạo VirtualHost cho trang web thứ nhất chạy PHP 5.6
```bash
sudo vim /etc/apache2/sites-available/php56.example.com.conf
```
**Lưu ý**: **vim** là phần mềm chỉnh sửa văn bản của Ubuntu, bạn cũng có thể sử dụng **nano** hoặc **gedit**.

Thêm nội dung sau, nhớ thay đổi ServerName và đường dẫn thư mục đúng với project của bạn.
```
<VirtualHost *:80>
    ServerName php56.example.com
    DocumentRoot /var/www/php56
    <Directory /var/www/php56>
        Options -Indexes +FollowSymLinks +MultiViews
        AllowOverride All
        Require all granted
    </Directory>
    <FilesMatch \.php$>
        # Apache 2.4.10+ can proxy to unix socket
        SetHandler "proxy:unix:/var/run/php/php5.6-fpm.sock|fcgi://localhost/"
    </FilesMatch>
</VirtualHost>
```
Tương tự, tạo VirtualHost cho trang web thứ hai chạy PHP 7.2
```bash
sudo vim /etc/apache2/sites-available/php72.example.com.conf
```
Thêm nội dung sau, nhớ thay đổi ServerName và đường dẫn thư mục đúng với project của bạn.
```
<VirtualHost *:80>
    ServerName php72.example.com
    DocumentRoot /var/www/php72
    <Directory /var/www/php72>
        Options -Indexes +FollowSymLinks +MultiViews
        AllowOverride All
        Require all granted
    </Directory>
    <FilesMatch \.php$>
        # Apache 2.4.10+ can proxy to unix socket
        SetHandler "proxy:unix:/var/run/php/php7.2-fpm.sock|fcgi://localhost/"
    </FilesMatch>
</VirtualHost>
```
Cả hai trang web của chúng ta đã cấu hình xong. Bây giờ, chạy các lệnh sau để kích hoạt:
```bash
sudo a2ensite php56.example.com
sudo a2ensite php72.example.com
```
Sau đó, khởi động lại Apache:
```bash
sudo systemctl restart apache2
```
Thêm tên miền ảo cho hai trang web đã tạo bằng cách chỉnh sửa file ```etc/hosts```
```bash
sudo vim /etc/hosts
```
Thêm các dòng sau và lưu lại:
```
127.0.0.1 php56.example.com
127.0.0.1 php72.example.com
```
## Kiểm tra kết quả
Sau khi hoàn tất các bước trên, hãy mở một trình duyệt web bất kỳ và truy cập vào hai trang web vừa tạo. Bạn sẽ thấy trang web ở **php56.example.com** chạy phiên bản **PHP 5.6** và trang web ở **php72.example.com** chạy phiên bản **PHP 7.2**.

![](https://images.viblo.asia/18600c10-6a1a-4b27-bc65-100efccf647a.png)

![](https://images.viblo.asia/aa6556b5-3361-45ea-9de7-ee831d45798b.png)