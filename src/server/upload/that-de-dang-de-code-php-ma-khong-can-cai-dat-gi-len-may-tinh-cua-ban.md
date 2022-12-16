## Mở đầu

Ở thời điểm hiện tại mà các hệ thống mới có khuynh hướng  sử dụng kiến trúc Microservice, nhà nhà người người nhắc về Docker như một giải pháp hàng đầu để mang lại hiệu năng tốt nhất cho ứng dụng của mình. Docker không chỉ mang lại nhiều giá trị cho các hệ thống trên môi trường Production mà khi ta tận dụng nó cho môi trường Dev, rất nhiều lợi ích được Docker đem lại như: 

- Tạo môi trường đồng bộ giữa các thành viên trong team
- Đẩy nhanh quá trình giả lập môi trường để bắt đầu code

## Sử dụng Docker để xây dựng môi trường phát triển cho ứng dụng Laravel

### Docker Compose
Trong những năm qua, Docker trở thành 1 giải pháp thường xuyên được sử dụng để triển khai nhanh các ứng dụng nhờ vào đơn giản hóa việc chạy và triển khai các ứng dụng trong container. Khi chúng ta sử dụng LEMP, ví dụ, với PHP, Nginx, Mysql và Laravel framework, Docker có thể đơn giản hóa quá trình thiết lập.

Docker Compose đã đơn giản hóa hơn nữa quá trình phát triển bằng cách cho phép các nhà phát triển xác định cơ sở hạ tầng của họ, bao gồm các application services, networks và volumes trong một file duy nhất. Docker Compose cung cấp một giải pháp thay thế hiệu quả để chạy nhiều lệnh tạo Docker container.

Trong hướng dẫn này, chúng ta sẽ xây dựng một ứng dụng web Laravel, với Nginx là máy chủ web và MySQL là cơ sở dữ liệu, tất cả bên trong các Docker container. Bạn sẽ xác định toàn bộ cấu hình trong 1 file `docker-compose.yml`, cùng với các tệp cấu hình cho PHP, MySQL, Redis và Nginx.

### Bắt đầu thôiii

Trước tiên chúng ta cần cài đặt Docker và Docker Compose trên máy host trước.


#### PHP
Chúng ta cần clone Laravel app từ Github về

``` bash
$ git clone git@github.com:laravel/laravel.git my-laravel
$ cd my-laravel
$ cp .env.example .env
$ sudo chmod -R 777 storage/
```

Thông thường thì ta sẽ cần cài composer trên máy host và dùng composer để tải về project laravel mới như hướng dẫn trên offical https://laravel.com/docs/8.x/installation#installing-laravel . Tuy nhiên với mình thì so với việc dùng Docker thì việc cài đặt composer nói riêng và quản lý version php hay composer trên máy host nói chung cũng hơi mất công một chút, nên mình tạo một Docker container riêng cho việc này, chứa Composer và install với cấu hình theo ý mình. Mình chỉ init dự án bằng repository của Laravel từ Github thôi. 
Còn Composer và PHP sẽ do Docker lo 

```yaml:my-laravel/deployement/docker/Dockerfile
FROM php:7.4-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    mariadb-client \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions & required packages
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd
RUN curl -sS https://getcomposer.org/installer | \
    php -- --install-dir=/usr/local/bin --filename=composer

# Install Xdebug if necessary
ARG XDEBUG=false
RUN if [ $XDEBUG = "true" ] ; then\
        pecl install xdebug;\
        docker-php-ext-enable xdebug;\
        echo "error_reporting = E_ALL" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini;\
        echo "display_startup_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini;\
        echo "display_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini;\
        echo "xdebug.remote_enable=1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini;\
    fi ;

# Set new UID for user www-data
RUN usermod -u 1000 www-data

WORKDIR /var/www/
COPY . .

RUN composer install

EXPOSE 9000
CMD ["php-fpm"]
```

Trong Dockerfile trên có thực thi luôn việc chạy `composer install` cho project, nên chúng ta cần sử giá trị memory_limit để không gặp lỗi trong quá trình composer install

```yaml:my-laravel/deployement/docker/Dockerfile
memory_limit = -1
```

#### Nginx

Ta sẽ cần 1 web service để xử lý các request đến và đưa đến cho Laravel xử lý. Ngoài Nginx ta có thể chọn Apache. Trong bài này, mình chọn Nginx.

```yaml:my-laravel/deployment/docker/Dockerfile.nginx
FROM nginx:latest

ARG PHP_FPM_SERVER=127.0.0.1
ARG PHP_FPM_PORT=9000
COPY deployment/docker/nginx.conf /tmp/nginx.conf
RUN envsubst '$PHP_FPM_SERVER $PHP_FPM_PORT' < /tmp/nginx.conf > /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
```

Trong Dockerfile của Nginx mình sử dụng file cấu hình như này 

```yaml:my-laravel/deployment/docker/nginx.conf
server {
    listen 80 default;
    root /var/www/public;
    error_log /dev/stdout info;
    access_log /dev/stdout;
    location / {
        try_files $uri $uri/ /index.php$is_args$args;
        autoindex off;
        index  index.php;
    }
    location ~ \.php$ {
        set $path_info $fastcgi_path_info;
        fastcgi_index index.php;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include /etc/nginx/fastcgi_params;
        fastcgi_pass $PHP_FPM_SERVER:$PHP_FPM_PORT;
        fastcgi_param SCRIPT_FILENAME $request_filename;
        fastcgi_param PHP_VALUE "upload_max_filesize=50M \n post_max_size=50M";
    }
}
```

Ở trên các bạn chú ý dòng `fastcgi_pass $PHP_FPM_SERVER:$PHP_FPM_PORT`: khi có request gửi đến Nginx, Nginx sẽ chuyển request đó tới PHP-FPM đang lắng nghe ở host tên là 127.0.0.1 và port 9000 (do mình cấu hình trong Dockerfile ở trên).

#### Mysql

Với Mysql chúng ta không cần bổ sung file cấu hình quá nhiều, chỉ cần tạo trước 1 schema db_test cho dự án bằng file SQL thôi

```yaml:my-laravel/deployment/docker/mysql-database-test.sql
CREATE DATABASE IF NOT EXISTS `db_test`;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
```

### docker-compose.yml

Bên trên là các Dockerfile và file cấu hình cho từng service PHP, Mysql, Nginx, cuối cùng chúng ta cần xây dựng file `docker-compose.yml` nữa.

```yaml: my-laravel/docker-compose.yml
version: '2.2'
services:
  nginx:
    container_name: backend-nginx
    build:
      context: .
      dockerfile: deployment/docker/Dockerfile.nginx
      args:
        PHP_FPM_SERVER: php
        PHP_FPM_PORT: 9000
    ports:
      - ${DOCKER_NGINX_EXTERNAL_PORT-8080}:80
    depends_on:
      - php
    links:
      - php

  php:
    container_name: backend-php
    build:
      context: .
      dockerfile: deployment/docker/Dockerfile
      args:
        XDEBUG: "true"
    volumes:
      - /var/www/vendor
      - .:/var/www/
      - ./deployment/docker/php.ini:/usr/local/etc/php/conf.d/php.ini
    environment:
      APP_ENV: local
      PHP_IDE_CONFIG: serverName=ide-debugger-server
      XDEBUG_CONFIG: remote_host=${XDEBUG_REMOTE_HOST:-host.docker.internal} remote_port=9001
    links:
      - mysql
      - redis

  redis:
    container_name: redis
    image: redis:5.0.6
    ports:
      - ${DOCKER_REDIS_EXTERNAL_PORT-6379}:6379

  mysql:
    container_name: mysql
    image: mysql:5.7
    volumes:
      - mysqldata:/var/lib/mysql
      - ./deployment/docker/mysql-database-test.sql:/docker-entrypoint-initdb.d/mysql-database-test.sql
    environment:
      MYSQL_DATABASE: db
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_ALLOW_EMPTY_PASSWORD: "true"
    ports:
      - ${DOCKER_MYSQL_EXTERNAL_PORT-3306}:3306
    command: [ 'mysqld', '--character-set-server=utf8mb4', '--collation-server=utf8mb4_unicode_ci' ]

  phpmyadmin:
    container_name: phpmyadmin
    depends_on:
      - mysql
    image: phpmyadmin/phpmyadmin
    environment:
      PMA_HOST: mysql
    ports:
      - ${DOCKER_PMA_EXTERNAL_PORT-8088}:80

volumes:
  mysqldata:
    driver: local
```

Vậy là hoàn thiện phần cấu hình, bây giờ bạn chạy 

```
$ docker-compose up
```
để build image và bật các container lên thôi.

Sau khi chạy tất cả các service bật lên, chúng ta truy cập vào http://localhost:8080/ để xem thành quả

![](https://images.viblo.asia/ac259930-1fbf-4878-98ef-75033b71e91f.png)


### Tham khảo

- https://github.com/daothaison/laravel-docker-development