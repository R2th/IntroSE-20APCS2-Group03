# Mở đầu
- Trong bài trước mình đẫ hướng dẫn các bạn đăng ký tài khoản amazon và tạo một instance trên EC2, hôm này mình sẽ hướng dẫn các bạn deploy một project lên server. Cụ thể trong bài này mình sử dụng một project laravel để thực hành, các bước cũng giống như bạn cài đặt dưới máy local vậy.
# Chuẩn bị
- Một con server cụ thể trong bài này mà amazon(bài trước mình đã hướng dẫn các bạn đăng ký rồi).
- Một project laravel.
- Một tài khoản git để có thể clone, push, pull từ git về server.
# SSH lên server
- Trước khi ssh lên server dưới máy local chúng ta nên tạo ssh key bằng lệnh sau vào ấn enter để cài đặt mặc định `ssh-keygen`.
- Sau khi tạo xong trong folder /home/[user_name]/.ssh sẽ có 2 file public key và private key.

![](https://images.viblo.asia/665e826b-5b4d-4adf-ac71-61e65349e1f8.png)
- Chúng ta bắt đâu ssh lên server với lệnh sau.
![](https://images.viblo.asia/3a87b2bc-1350-44b9-bfaa-393fcefa8f71.png)
- Sau khi SSH lên server chúng ta tạo một user để phục vụ cho việc deploy sau này, vì lý do bảo mật nên hạn chế thực hiện thao tác tên user root. 
- Để tạo user ta thực hiện.
```bash
useradd -d /home/[username] -m [username] // tham số -d (directory) tạo user mới và thư mục của user
usermod -s /bin/bash [username] // tham số -s (shell) 
usermod -aG sudo [username] // tham số -aG (add Group)
passwd [username] // thay đổ mật khẩu user vừa tạo
su - [username]  // (switch user) Đăng nhập bằng user mới
```
- Trên server ta cần tạo folder .ssh bên trong folder này tạo file authorized_keys để ném public key vừa tạo dưới máy local vào. Để khi ssh từ máy hiện tại server sẽ nhận biết được máy bạn đã có key trên server và cho phép ssh lên.
```bash
mkdir .ssh // (make directory) tạo folder .ssh
touch .ssh/authorized_keys // tạo file authorized_keys 
nano authorized_keys // mở file authorized_keys
```
- Bây giờ copy public key dưới máy local ném vào file authorized_keys và lưu lại.
```bash
cat /home/linhdn1198/.ssh/rsa_id.public
```
![](https://images.viblo.asia/a20f55e8-f1e4-4c03-ae69-2d8d4d908581.png)
- Đảm bảo quyền file id_rsa là 600 id_rsa.pub là 644.
- Tại sao lại là 600, 644 nó có ý nghĩa gì?
    - Trong linux thư mục, file ... có 3 nhóm quyền chính owner, group, other
    - Trong mỗi nhóm này có 3 quyền chính read(đọc), write(ghi), execute(thực thi)
    - Các quyền này được biểu diễn dưới mã nhị phân 3 bit 0,1. VD: 600 nghĩa là owner có quyền đọc, ghi, group và other không có quyền gì.
![](https://images.viblo.asia/b02b1c3e-60dc-414e-8392-ba0071b74f86.png)
 - Sau khi lưu sau exit ra ngoài veào tiến hành ssh bằng user vừa tạo.
![](https://images.viblo.asia/8c1d6012-282b-4ff1-8d7b-8f9d9eabbcee.png)
# Cài đặt phần mềm trên server
- Để chạy được project trên server ta cần cài được web server, php, composer, mysql, nodejs, git...
## Cài đặt nginx
```bash
sudo apt update
sudo apt install nginx
nginx -v // Kiểm tra đã cài được chưa
nginx version: nginx/1.14.0 (Ubuntu)
```
- Bật firewall
```bash
sudo ufw enable
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'
sudo ufw allow 22 // firewall mặc định chặn cổng 22 mà ssh sử dụng port 22 để connect đến server.
```
## Cài đặt PHP
```bash
sudo install software-properties-common
sudo add-apt-repository -y \
     ppa:ondrej/php
sudo apt install php7.3 \
    php7.3-cli \
    php7.3-common \
    php7.3-mysql \
    php7.3-cgi \
    php7.3-curl \
    php7.3-zip \
    php7.3-mbstring \
    php7.3-gd \
    php7.3-xml \
    php7.3-xsl \
    php7.3-dev \
    php7.3-bz2  \
    php7.3-sqlite \
    php7.3-sqlite3 \
    php7.3-memcached \
    php7.3-fpm \
    php7.3-xdebug \
    php7.3-bcmath \
    php7.3-intl
php -v // kiểm tra đã cài được chưa
PHP 7.3.14-5+ubuntu18.04.1+deb.sury.org+2 (cli) (built: Feb  1 2020 17:51:11) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.3.14, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.3.14-5+ubuntu18.04.1+deb.sury.org+2, Copyright (c) 1999-2018, by Zend Technologies
    with Xdebug v2.9.1, Copyright (c) 2002-2020, by Derick Rethans
```
## Cài đặt composer
```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'e0012edf3e80b6978849f5eff0d4b4e4c79ff1609dd1e613307e16318854d24ae64f26d17af3ef0bf7cfb710ca74755a') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php --install-dir=/usr/local/bin --filename=composer
php -r "unlink('composer-setup.php');"
composer -v // Kiểm tra đã cài được chưa
```
## Cài đặt MySql
```bash
sudo apt install mysql-server mysql-client
sudo wget -c https://dev.mysql.com/get/mysql-apt-config_0.8.13-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.13-1_all.deb
```
## Cài đặt NodeJs
```bash
curl -sL https://deb.nodesource.com/setup_10.x | bash -
sudo apt-get install -y nodejs
```
## Cài đặt Git
```bash
sudo apt install git
git --version
```
# Cài đặt project trên server
- Trên server mở public key và copy nó lên tài khoản git.
```bash
cat /home/linhdn1198/.ssh/id_rsa.pub
```
- Sau đó vào link git: https://github.com/settings/ssh/new
 ![](https://images.viblo.asia/85d2dd46-d0ce-453a-8410-c8bf469d07f7.png)
- Đặt tên cho key và paste nội dung id_rsa.pub vào key.
- Bây giờ bắt đầu clone project về server.
```bash
git clone git@github.com:linhdn1198/DoAnTotNghiep.git
```
- Tạo database.
```bash
mysql -u root -p
mysql> create databases laravel;
mysql> show databases; // Kiểm tra xem tạo được chưa
```
- Cấu hình nginx.
```bash
cd /ect/nginx/site_sites-available // trong này có file cấu hình mặc định default
cp default laravel-conf
rm default
nano laravel-conf
server {
        listen 80;
        listen [::]:80;

        root /home/linhdn1198/DoAnTotNghiep/public; // Thư mục project

        # Add index.php to the list if you are using PHP
        index index.php index.html index.htm index.nginx-debian.html; // add thêm file index.php

        server_name 3.14.12.188; // địa chỉ của server
        # return 301 https://example.com$request_uri;

        # Add log
        access_log /var/log/nginx/demo_access.log;
        error_log /var/log/nginx/demo_error.log;
        location / {
                try_files $uri $uri/ /index.php?$query_string;
        }
        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/run/php/php7.3-fpm.sock;
        }
        location ~ /\.ht {
                deny all;
        }
}
```
- Chỉnh sửa xong lưu lại.
- Ta cần đưa file cấu hình đến folder /etc/nginx/sites-enabled/ có thẻ cp, mv, symlink ở đây tôi dùng symlink.
```bash
ln -s /etc/nginx/sites-available/laravel-conf /etc/nginx/sites-enabled/
service nginx restart // restart server để nhận cấu hình mới.
```
- Tiếp theo cd vào project để setup.
```bash
composer install
npm install && npm run dev
chmod -R 777 storage
chmod -R 777 bootstrap/cache
php artisan key:gen
cp .env.example .env
nano .env // Chỉnh sửa 3 mục chính
DB_DATABASE=laravel // tên database vừa tạo ở trên
DB_USERNAME=root
DB_PASSWORD=
php artisan migrate --seed // Tạo bảng và dữ liệu cho bảng
php artisan storage:link // Tạo symlink cho storage
```
- Đã confing xong bây giờ thử vào địa chỉ server 3.14.12.188

![](https://images.viblo.asia/5f21f9cd-e718-4a1a-98ec-f0c5c34859fd.png)
# Kết luận
- Trên đây mình đã hướng dẫn các bạn deploy một project laravel lên server.