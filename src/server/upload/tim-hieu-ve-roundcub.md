# Tìm hiểu về Roundcube
<br>
<br>
<br>

### 1. Giới thiệu về roundcube
<br>
Webmail là một dạng ứng dụng email chạy trên nền tảng website có khả năng truy cập máy chủ email để gửi và nhận email. Việc sử dụng nền tảng webmail giúp cho việc truy cập đọc thư hay gửi thư được tiện lợi hơn trong số rất nhiều dịch vụ webmail có thể kể đến như là Gmail, AOL mail, Hotmail, Yahoo,…. hay hiện nay các dịch vụ email doanh nghiệp đã ứng dụng việc xây dựng các dịch vụ webmails trực tuyến để giúp các doanh nghiệp có thể thuận tiện trong công việc hơn.

Roundcube là một ứng dụng webmail dùng để khởi tạo địa chỉ mail có đuôi là tên công ty hoàn toàn miễn phí.

Ví dụ: Gmail là @gmail.com, Yahoo là @yahoo.com
<br>

![](https://images.viblo.asia/329bfdb0-b360-4b11-9f3c-2a3e5da5ad03.png)


<br>
<br>

### 2. Hướng dẫn cài đặt (trên CentOS 8/RHEL 8)
<br>

*Yêu cầu trước khi cài đặt: Máy (server) cần cài nginx và mysql*

**B1. Download Roundcube Webmail**

a. Download roundcube

`wget https://github.com/roundcube/roundcubemail/releases/download/1.4.9/roundcubemail-1.4.9-complete.tar.gz`

<br>

b. Giải nén

`tar xvf roundcubemail-1.4.9-complete.tar.gz`

<br>

c. Di chuyển sang thư mục /var/www

```
sudo mkdir /var/www/
sudo mv roundcubemail-1.4.9 /var/www/roundcube
```

<br>

**B2. Install Dependencies**

a. Install the Remi Repo

`sudo dnf install -y https://rpms.remirepo.net/enterprise/remi-release-8.rpm`

<br>

b. Reset PHP

`sudo dnf module reset php`

<br>

c. Enable the php:remi-7.4 module stream

`sudo dnf module enable php:remi-7.4 -y`

<br>

d. Install PHP modules required

`sudo dnf install php-ldap php-imagick php-common php-gd php-imap php-json php-curl php-zip php-xml php-mbstring php-bz2 php-intl php-gmp`

<br>

**B3: Khởi tạo database**

a. Đăng nhập mysql

`mysql -u root -p`

<br>

b. Tạo tài khoản để dùng database mới

`CREATE DATABASE roundcube DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`

<br>

c. Cấp quyền cho user mới tạo sử dụng database

`GRANT ALL PRIVILEGES ON roundcube.* TO roundcubeuser@localhost;`

<br>

d. Flush the privileges

`flush privileges;`

<br>

e. Thoát khỏi mysql

`exit;`

<br>

**B4: Cấu hình nginx**

a. Tạo file cấu hình nginx

`sudo nano /etc/nginx/conf.d/mail.your-domain.com.conf`

<br>

b. Thêm đoạn text sau vào file cấu hình vừa tạo

```
server {
   listen 80;
   listen [::]:80;
   server_name mail.your-domain.com;
   root /var/www/roundcube/;
   index index.php index.html index.htm;

   error_log /var/log/nginx/roundcube.error;
   access_log /var/log/nginx/roundcube.access;

   location / {
       try_files $uri $uri/ /index.php;
   }

   location ~ \.php$ {
       try_files $uri =404;
       fastcgi_pass unix:/run/php-fpm/www.sock;
       fastcgi_index index.php;
       fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
       include fastcgi_params;
   }

   location ~ /.well-known/acme-challenge {
      allow all;
   }
   location ~ ^/(README|INSTALL|LICENSE|CHANGELOG|UPGRADING)$ {
       deny all;
   }
   location ~ ^/(bin|SQL)/ {
       deny all;
   }

   location ~* \.(jpg|jpeg|gif|png|webp|svg|woff|woff2|ttf|css|js|ico|xml)$ {
      access_log        off;
      log_not_found     off;
      expires           360d;
   }
}
```

<br>

c. Kiểm tra config

`sudo nginx -t`

<br>

d. Reload lại nginx

`sudo systemctl reload nginx`

<br>

**B5: Hoàn thành cài đặt**

Vào link URL của trình duyệt

`http://mail.your-domain.com/installer`

<br>

![](https://images.viblo.asia/a33be505-d33c-483f-a047-e29d04ee8511.png)

<br>

Click Next để chuyển sang step 2

<br>

![](https://images.viblo.asia/1d071a33-b1bf-44f1-b889-d1ec6586614b.png)

<br>

Step này bạn setting imap và smtp:

<br>

```
IMAP host: ssl://mail.your-domain.com  port: 993
SMTP port: tls://mail.your-domain.com  port: 587
```

<br>

Phía dưới mình chọn tất cả option. Còn các bạn tùy chọn các nhu cầu có thể chọn hoặc bỏ chọn cái khác

Chọn next

Step 3 bạn có thể test các config. Oke đã xong. Giờ bạn có thể truy cập bằng browser với link

`http://mail.your-domain.com`

<br>

![](https://images.viblo.asia/8a95ea65-1fa1-43ca-b27d-3323b9b2e4c9.png)

<br>

Đã xong, việc cài đặt roundcube.

**Nhưng vẫn còn công việc khác là cấu hình và sử dụng nó như nào. Mình sẽ chia sẻ ở các bài sau nhé.**