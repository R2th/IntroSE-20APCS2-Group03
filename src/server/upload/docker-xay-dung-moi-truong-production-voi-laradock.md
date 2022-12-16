Chào các bạn hôm nay mình lại đến tháng đây :V Như bài hôm trước mình có hướng dẫn cách cài đặt dự án Laravel với Laradock dưới local như thế nào rồi đúng không, ok giờ mình sẽ hướng dẫn mn cách tạo 1 môi trường Production với Laradock nhé.

Cơ bản thì 2 môi trường cài đặt không khác nhau là mấy, chỉ khác là ở **Production** thì mình làm thêm *HTTPS* chi sịn sò nhé.

Khi làm đến đây thì mọi người cũng phải có 1 chút chút kiến thức về server rồi nhé, yêu cầu có thể build được thì chỉ cần có là 
+ 1 Server có public IP, 1 domain name (Server cái này mọi người có thể đăng  free của VPS hoặc của AWS nhé, mình thì hay dùng của AWS vì nó có nhiều dịch vụ hay và miễn phí nữa[ Hướng dẫn đăng ký](https://viblo.asia/p/huong-dan-deploy-rails-app-len-aws-ec2-ket-hop-nginx-va-puma-part-i-bJzKmgVXl9N))
Sau khi đăng ký và tạo server xong thì mọi người ssh vào server như bình thường nhé, mình vừa tạo rồi nè :V

![](https://images.viblo.asia/bc866fd9-dacf-4ec4-89a3-fd340d592ac6.png)

+ Và đăng ký 1 tên miền tại trang [Freenom](https://my.freenom.com/clientarea.php?action=domains) nhé , cái này cũng dễ thôi, cứ đăng ký 1 tài khoản rồi làm theo hướng dẫn là được 

Các bước deploy cũng cơ bản thôi:
+ Pull code laradock
+ Chỉnh sửa cấu hình cho các container (nếu cần)
+ Pull code laravel
+ Cho các container start lên
+ Vào workspace và chạy các câu lệnh cần thiết
+ Cài đặt certbot lên nginx container
+ Lấy certificate cho trang web của bạn

ok triển luôn thôi nhé
#  Pull code laradock
```js
git clone https://github.com/laradock/laradock.git 
```
Tạo 1 thư mục tên web kế bên. Thư mục này sẽ chứa code web. Clone code của bạn vào thư mục web này, đặt tên là Mybot (Cái này tùy dự án của các bạn thôi)

![](https://images.viblo.asia/448d2380-cbf4-4fdb-9b8f-0cfd5f9e35c4.png)

## Chỉnh sửa cấu hình cho các container
Sau khi đã tải project của mình về thư mục web rồi thì mn cd vào thư mục laradock để chỉnh sửa cấu hình vài container cần thiết để chạy nha

+ Tạo file .env
```js
cp env-example .env
```
+ Thay đổi 1 số thứ trong file .env: 
```js
 sudo nano .env sau đó sửa chỗ  APP_CODE_PATH_HOST: nơi chứa code của bạn nhé
APP_CODE_PATH_HOST=../web
```
+ PHP_VERSION: chọn version cho Php
```js

PHP_VERSION=7.2
```
+ WORKSPACE_INSTALL_MYSQL_CLIENT: cài đặt Mysql-client vào workspace. Sau này sẽ cần khi backup dữ liệu. Nếu code của bạn cần thêm gì (yarn, ioncube ...) thì enable nó lên
```js
WORKSPACE_INSTALL_MYSQL_CLIENT=true
```
Thay đổi các thông số mặc định về username và password của mariadb là rất cần thiết, nhất là root password
(T cứ đặt root hết cho dễ nhớ, nhưng khi làm dự án thật thì đừng làm như thế nhé, đặt nó có độ khó lên tý, không là dính incident đấy =)) )
```js
MARIADB_DATABASE=mybot
MARIADB_USER=root
MARIADB_PASSWORD=root
MARIADB_PORT=3306
MARIADB_ROOT_PASSWORD=root
MARIADB_ENTRYPOINT_INITDB=./mariadb/docker-entrypoint-initdb.d
```
Config đầy đủ rồi thì mình tạo thêm 1 file mybot.conf vào thư mục **ngnix/sites/** nhé
```js
server {

    listen 80;
    listen [::]:80;

    server_name mybot.tk;
    root /var/www/MyBot/public;
    index index.php index.html index.htm;

    location / {
         try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_pass php-upstream;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        #fixes timeouts
        fastcgi_read_timeout 600;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }

    error_log /var/log/nginx/mybot_error.log debug;
    access_log /var/log/nginx/mybot_access.log;
}
```
# Up Container
```js
docker-compose up -d nginx mariadb workspace
```
![](https://images.viblo.asia/5f866a58-374c-44cb-932c-6e851e3c26ae.png)

Sau khi đã up được 3 container này lên thì mình exec vào trong  workspace container .  Mọi thay đổi trong này cũng sẽ thay đổi code  trong thư mục web nhé do đã được "volume". 

```js
docker-compose exec --user=laradock workspace bash
```
![](https://images.viblo.asia/79a0ceb8-325e-4203-9afd-9a24cdc811f9.png)

sau khi exec vào container rồi thì mn cd vào thư mục dự án như bình thường thôi
![](https://images.viblo.asia/b019c443-9978-4b47-ab76-12978dbdb911.png)

Sửa file .env của bạn để laravel có thể kết nối đến database, thông tin db chính là những thông tin mình đã config trong file env của laradock nhé
```js
MARIADB_DATABASE=mybot
MARIADB_USER=root
MARIADB_PASSWORD=root
MARIADB_PORT=3306
MARIADB_ROOT_PASSWORD=root
MARIADB_ENTRYPOINT_INITDB=./mariadb/docker-entrypoint-initdb.d
```
khi đã config kết nốt xong rồi thì chạy các câu lệnh cần thiết để build project laravel như dưới local thôi
```js
+ php artisan key:gen
+ composer install
+ php artisan migrate --seed
+ npm install
```
sau đó tạo 1 cái domain trỏ tới IP public của bạn nhé,  
  + IP là cái IPv4 Public IP đấy nhé, à nhớ là server có mở cổng http và https nhé,  (mn vào phần **Sercurity Groups** sau đó vào **Inbound** là có chỗ để config cho mở mấy cái cổng đấy)
![](https://images.viblo.asia/693cce55-4fe2-4805-980d-b2741fe21e1b.png)

+  Tạo 1 domain mybot.tk trỏ để trỏ vào IP của server nhé (mn truy cập vào trang https://my.freenom.com/clientarea.php?action=domains , cái domain đấy mình đăng ký rồi nên tạo tạm 1 cái mybot1.tk cho mn xem thôi nhé =)) )
![](https://images.viblo.asia/20f84d35-d9fc-4cc1-b6c8-b2a931866743.gif)

Ok ngon hàng rồi, mọi người Bật browser lên, gõ địa chỉ và kiểm tra kết quả nào hehe
![](https://images.viblo.asia/9926d16a-1022-4aeb-bb37-8c43232e6ed9.png)

=> Giờ nó mới chỉ là http nhìn không được pro cho lắm đúng không, chúng ta chỉ cần config 1 tý nữa rồi là dùng ngon ngay

# Cài đặt certbot lên nginx container
Vào Dockerfile của nginx trong thư mục nginx của laradock, thêm dòng apk add --no-cache certbot để cài đặt certbot 
```js
RUN apk update \
    && apk upgrade \
    && apk add --no-cache openssl \
    && apk add --no-cache bash \
    && apk add --no-cache certbot \
    && adduser -D -H -u 1000 -s /bin/bash www-data
```
Cho nginx container stop, sau đó build lại image cho nginx container rồi start lên lại
```js
docker-compose stop nginx
docker-compose build --no-cache nginx
```
sau khi build xong thì cho up lên thôi
 ```js
docker-compose up -d nginx
```
Vậy là ta đã cài đặt xong certbot cho nginx container. Bước tiếp theo là lấy certificate cho trang web của mình thôi
Trước khi thực hành chi tiết, ta cùng xem qua đoạn sau trong file mybot.conf

```js
    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }
```

Đoạn này báo cho nginx biết rằng khi một client (ở đây là letsencrypt server) truy cập đến đường dẫn YOURDOMAIN/.well-known/acme-challenge, nginx sẽ tìm file trong thư mục /var/www/letsencrypt. Mà thư mục /var/www trong workspace chính là thư mục web bên ngoài máy host.

Vào thư mục web, tạo 1 thư mục tên là letsencrypt.
```js
mkdir letsencrypt
```
Set quyền cho thư mục letsencrypt
```js
chmod -R 777 letsencrypt
```
Truy cập vào nginx container
```
docker-compose exec  -it nginx /bin/bash
```
Chạy câu lệnh sau cho certbot
```js
certbot certonly --webroot -d mybot.tk -w /var/www/letsencrypt --config-dir /etc/nginx/ssl
```
Sau khi gõ câu lệnh, bạn sẽ bị hỏi vài thông tin liên quan. Cung cấp 1 email thật để nhận mail khi có certificate gần hết hạn (Letsencrypt sẽ tự động gửi cho bạn mail này). 
Nếu lấy certificate thành công, bạn sẽ nhận được thông báo như sau:
![](https://images.viblo.asia/c41ff93b-9e6f-4c3d-a095-2643ad6a6425.png)

Nhập exit để thoát ra khỏi nginx container. Thay đổi file mybot.conf như sau:
```js
server {

    # listen 80;
    # listen [::]:80;

    # For https
    listen 443 ssl http2;

    ssl_certificate /etc/nginx/ssl/live/mybot.tk/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/live/mybot.tk/privkey.pem;

    server_name mybot.tk;
    root /var/www/MyBot/public;
    index index.php index.html index.htm;

    location / {
         try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_pass php-upstream;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        #fixes timeouts
        fastcgi_read_timeout 600;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }

    error_log /var/log/nginx/mybot_error.log;
    access_log /var/log/nginx/mybot_access.log;
}

server {
    listen 80;
    server_name mybot.tk;
    return 301 https://$host$uri;
}
```
Restart nginx container
```js
docker-compose restart nginx
```
Sau đó nhận hàng ae nhé
![](https://images.viblo.asia/5e83e2a6-c3b4-431e-83a3-9f84e57fb1e6.png)

# Kết Luận
Khá ngon hàng rồi phải không, bài sau mình sẽ hướng dẫn deploy bằng file docker-compose.yml do mình tự build nhé. Và sẽ nói ra những ưu nhược điểm của docker khi dùng trên môi trường production