Với những dev php khi thiết lập môi trường thì thường cài LAMP (Linux, Apache, MySQL, PHP). Công việc này có thế khiến mất nhiều thời gian, cài được cái này lại lỗi cái kia. Hay đơn giản khi bạn có một project Laravel cũ cần chạy trên một cái máy tính mới mua, hay máy tính của người khác thì họ lại phải setup môi trường, nhưng khi cài đặt xong môi trường rồi tưởng chừng như mọi thứ đơn giản chỉ cần chạy project lên thì lại lỗi do sai phiên bản php, hay một số lỗi khác so môi trường không đồng bộ. Ta có thể dễ dàng giải quyết những vấn đề được đề cập ở trên với **Docker**, chỉ cần vài bước đơn giản là ta có thể tạo ra được một môi trường ảo hóa chứa đầy đủ những thứ cần thiết để chạy project rồi. Trong bài viết này mình và các bạn sẽ cùng tạo ra môi trường dev php với Docker hay cùng Dockerize một project Laravel. Về những kiến thức cơ bản của **Docker** các bạn có thể tham khảo bài viết của mình ở [đây](https://viblo.asia/p/docker-cho-nguoi-moi-bat-dau-naQZRy7mKvx)

![](https://images.viblo.asia/9fc8ae35-509e-4f5f-bfba-0b7879374b50.png)

# Setup
Dĩ nhiên máy bạn cần cài đặt **Docker** và **Docker-compose** rồi. Và ta cũng chỉ cần hai thứ đó thôi ^^.

# Docker-compose.yml
Trước khi bắt đầu tạo file docker-compose.yml, ta cùng suy nghĩ một chút xem để chạy một project Laravel ta cần những gì.
* PHP
* Composer
* Webserver: Apache/nginx (trong bài viết này mình sẽ dùng nginx)
* Database: Mysql

### docker-composer.yml
Trước hết ta sẽ tiến hành tạo file `docker-composer.yml` với nội dung sau:
```yml
version: '3'

networks:
  laravel:
```

Ở đây mình sử dụng version 3 và một network tên là laravel để các container kết nối với nhau.

### PHP

Đầu tiên ta sẽ tiến hành thêm `services` php trong file `docker-compose.yml`.
```yml
version: '3'

networks:
  laravel:

services:
  php:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: php-laravel
    volumes:
      - ./src:/var/www/html
    ports:
      - "9000:9000"
    networks:
      - laravel
```

Vì service php ta cần cài `composer`, một số extension của php nên ta sẽ tạo `Dockerfile` để cấu hình services này. Ở file `docker-compose.yml` mình tiến hành build một `Dockerfile` và **mount** toàn bộ source code của project ở máy host vào container trong thư mục `var/www/html`. Nếu bạn muốn tạo một project mới thì vẫn hay cứ mount thư mục này cho container vì sau khi mình chạy container lên sẽ tiến hành inject vào container dùng composer để tạo project laravel. Mapping port mình sử dụng cổng 9000, các bạn cần để ý phần này vì khi cấu hình `nginx` ta sẽ cần dùng tới.

**Dockerfile**
Vì trong file `docker-compose.yml` ta có để `context: "."` nên ta sẽ tạo **Dockerfile** cùng cấp với file `docker-compose.yml`.
```Dockerfile
FROM php:7.2-fpm-alpine

# Install extension
RUN docker-php-ext-install pdo pdo_mysql
# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
```

Mình sử dụng image: php7.2-fpm-alpine tùy vào dự án của bạn các bạn chỉnh version image khác nhau. Tiến hành cài composer và một số extension cần thiết.

### Nginx
Trong file `docker-compose.yml` ta sẽ tiến hành thêm `services` nginx như sau.

```yml
services:
  nginx:
    image: nginx:stable-alpine
    container_name: nginx-laravel
    ports:
      - "8088:80"
    volumes:
      - ./src:/var/www/html
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on: 
      - php
      - mysql
    networks:
        - laravel
```

Trong services `nginx` mình lấy cổng 8088 map với cổng 80 của container và có **mount** một **volumes** từ thư mục `/src` của máy host vào thưc mục `/var/www/html` của container. Đồng thời thêm một file config cho webserver trong thư mục `/nginx/default.conf` vào container.

**Config nginx**

Ta tiến hành tạo thư mục `nginx` và tạo file `default.conf` trong thư mục đó
```nginx
// nginx/default.conf

server {
    listen 80;
    index index.php index.html;
    server_name localhost;
    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/html/public;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}
```

Ở đây các bạn cần chú đến dòng `fastcgi_pass php:9000;`. Ở đây `php` là tên service ta đã định nghĩa trong `docker-compose` và mình cũng mapping cho port 9000 nên `nginx` sẽ chuyển request đến port này.

### MySQL

Trong file `docker-compose.yml` ta thêm services `mysql` như sau.

```yml
mysql:
    image: mysql:5.7.22
    container_name: mysql-laravel
    restart: unless-stopped
    ports:
      - "4306:3306"
    volumes:
      - ./mysql:/var/lib/mysql
    environment: 
      MYSQL_DATABASE: laravel
      MYSQL_USER: admin
      MYSQL_PASSWORD: secret
      MYSQL_ROOT_PASSWORD: secret
    networks:
      - laravel
```

Cũng tương tự như ở trên nhưng ở phần `ports` mình sẽ map port 4306 ở máy host vì có thể port 3306 đã được sử dụng rồi nền mình để port 4306 và thêm một số biến môi trường để tý mình config cho file `.env` của Laravel.


# Demo

Sau khi đã tiến hành tạo được hết các `services` các bạn tiến hành chạy lệnh: `docker-compose build && docker-compose up -d` (để build `Dockerfile` và chạy file `docker-compose.yml`). Nếu các bạn muốn test xem docker đã hoạt động hay chưa thì các bạn hạy tạo một file `index.html` đơn giản trong thư mục `/src/public` để kiểm tra. Nhưng ở đây mình sẽ tiến hành tạo luôn một project Laravel bên dưới để kiểm tra.

Đợi đến khi `docker-compose` chạy xong ta sẽ tiến hành tạo một project Laravel mới. Vì thư mục `src` của mình để trống nên khi **mount** vào sẽ k có code nào cả. Để tạo một project Laravel ta sẽ tiến hành inject vào container `php` và chạy lệnh như sau.
```
docker-compose exec php sh
/var/www/html # composer create-project --prefer-dist laravel/laravel:^7.0 .
```
Sau khi đã tạo project xong ta tiến hành vào `http://localhost:8088/` để test thử xem đã thành công chưa.
![](https://images.viblo.asia/a2c88813-3340-4a94-991e-69fd2c3879c2.png)

Như hình là đã thành công rồi đó.

**Databse**

Để sử dụng mysql ta vào file `.env` trong thư mục `src` sửa như sau.
```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=admin
DB_PASSWORD=secret
```
Vì trong `docker-compose.yml` mình có thêm một số biến môi trường của services `mysql` tùy vào giá trị biến các bạn đặt mà cấu hình file `.env` sao cho đúng. Vẫn ở trong container `php` ta tiến hành chạy `php artisan migrate` ta sẽ thấy migrate thành công.

# Debug

Nếu khi chạy container để demo mà các bạn gặp lỗi `Permission denied` của các file log thì các bạn chỉ cần cấp quyền cho file đó là mọi thứ sẽ chạy được bình thường.

# Tổng kết
Vậy là mình cùng các bạn đã tiến hành tạo được môi trường dev Laravel với Docker. Hy vọng các bạn sẽ có thêm kiến thức về Docker và áp dụng hiệu quả cho dự án của mình. Hẹn gặp lại các bạn ở những bài chia sẻ khác ❤️.