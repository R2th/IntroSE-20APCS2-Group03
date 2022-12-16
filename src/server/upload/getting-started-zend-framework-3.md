![](https://images.viblo.asia/2844fdc7-8be8-4783-b963-c01857430192.png)
# Cài đặt zend framework với composer

-----

Chúng ta sẽ bắt đầu với tiếp cận zendframework. Ta sẽ clone` ZendSkeletonApplication` có sẵn trên github để tạo dự án mới từ đầu:<br>
```
$ composer create-project -s dev zendframework/skeleton-application path/to/install
```
Một số các package cần thiết để sử dụng sẽ được install, bao gồm:
- zend-component-installer<br>
- zend-mvc<br>

Sau khi cài đặt xong. Chúng ta có thể test ngay lập tức bằng cách sử dụng PHP's built-in web server:
```
$ cd path/to/install
$ php -S 0.0.0.0:8080 -t public/ public/index.php
# OR use the composer alias:
$ composer run --timeout 0 serve
```
Với lệnh trên sẽ tạo một cli-server với port 8080. Ta có thể kiểm tra hoạt động với việc vào trình duyệt truy cập vào: http://localhost:8080/<br>

# Development mode

-----

Zend framework cung cấp cho chúng ta 3 commend để sử dụng chuyển đổi mode là:<br>

```
$ composer development-enable  # bật development mode
$ composer development-disable # tắt development mode
$ composer development-status  # kiểm tra trạng thái mode
```
Khi chúng ta sử dụng lệch bật development mode thì ngay lập tức zf sẽ thêm các cấu hình ở file `config/development.config.php.dist` vào trong load để sử dụng các cấu hình của bạn bằng cách copy file `development.config.php.dist` bỏ phần `.dist` vào trong forder `config/autoload/...` để sử dụng. <br>

Nếu bạn tắt development mode thì các cấu hình bạn cài đặt trong  forder `config/autoload/...` sẽ bị xóa. Nên bạn hãy copy file cấu hình này lại nếu có chỉnh sửa hoặc tái sử dụng.<br>

Hoặc bạn có thể sử dụng cách thủ công chuẩn bị file config rồi copy vào thư mục `config/autoload/...`<br>

# Sử dụng Unit Tests

-----
Nếu muốn sử dụng unit test. Chúng ta cần cài đặt thêm 1 package tên là zend-test.<br>
```
$ composer require --dev zendframework/zend-test
```
Sau đó chỉ việc sử dụng nó với câu lệnh:
```
$ ./vendor/bin/phpunit
```
Cũng giống như config development mode. Chúng ta sẽ có file `phpunit.xml.dist` để sử dụng, nếu bạn muốn thay đổi Unit test thì có thế sửa lại file nào theo ý muốn và sử dụng.

# Khi bạn sử dụng Vagrant

-----


Điều kiện: bạn đã cài đặt vagrant và apache server. Cách chạy máy ảo vagrant đã được cấu hình.
```
$ vagrant up
```
Sau đó, để thực hiện các truy vấn cũng như sử dụng apache server. Chúng cần access vào máy ảo vagrant
```
$ vagrant ssh
```
1 số ví dụ thực hiện lệnh php như: cài đặt, update những package của composer.<br>
```
composer install
composer update
```
Cuối cùng sau khi chạy xong vagrant thì host của bạn cũng được map vào port 8080 (default) và port 80 đối với apache. Vào webserver của bạn với: http://localhost:8080/ <br>

# Using docker-compose

-----
Đối với docker thì zend framework cũng cung cấp cho chúng ta 1 file `docker-compose.yml` thuận tiện cho việc sử dụng docker-compose. <br>
Và để bắt đầu build dự án với:
```
$ docker-compose up -d --build
```
Cũng giống như vagrant, chúng ta sẽ truy cập webserver chúng ta ở:  http://localhost:8080 
# Web server setup

-----
## Apache setup
Chúng ta có thể setup 1 server apache khá đơn giản. Các bạn có thể tham khảo bên dưới cấu hình của mình.<br>
```
<VirtualHost *:80>
    ServerName zfapp.localhost
    DocumentRoot /path/to/zfapp/public
    <Directory /path/to/zfapp/public>
        DirectoryIndex index.php
        AllowOverride All
        Order allow,deny
        Allow from all
        <IfModule mod_authz_core.c>
        Require all granted
        </IfModule>
    </Directory>
</VirtualHost>
```
## Nginx setup
Tương tự, cho phần server nginx. Chúng ta mở file `/path/to/nginx/nginx.conf` và thêm vào object HTTP nếu bạn chưa có:
```
http {
    # ...
    include sites-enabled/*.conf;
}
```
Tạo một máy ảo với cấu hình bên dưới trong file  /path/to/nginx/sites-enabled/zfapp.localhost.conf
```
server {
    listen       80;
    server_name  zfapp.localhost;
    root         /path/to/zfapp/public;

    location / {
        index index.php;
        try_files $uri $uri/ @php;
    }

    location @php {
        # Pass the PHP requests to FastCGI server (php-fpm) on 127.0.0.1:9000
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_param  SCRIPT_FILENAME /path/to/zfapp/public/index.php;
        include fastcgi_params;
    }
}
```
Sau đó khởi động lại nginx, và tiến hành làm những điều thú vị hơn :D.
# Tài liệu tham khảo:

-----
- Trang chủ: https://framework.zend.com/
- ZendSkeletonApplication: https://github.com/zendframework/ZendSkeletonApplication