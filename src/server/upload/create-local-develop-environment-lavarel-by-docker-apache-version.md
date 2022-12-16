## Repository

https://github.com/ucan-lab/docker-laravel-apache

## Cách dùng

### A. Tạo mới Project Laravel

```shell-session
$ git clone git@github.com:ucan-lab/docker-laravel-apache.git
$ cd docker-laravel-apache
$ make create-project
```

http://localhost

Bằng 3 bước trên là hoàn thành xây dựng môi trường cho project mới của Laravel.

### A'. Chỉ định version rồi tạo mới project Laravel

Ghi phần install Laravel của phần `Makefile` 

```Makefile
    docker-compose exec app composer create-project --prefer-dist "laravel/laravel=6.*" .
```

### B. Xây dựng môi trường Laravel project

```shell-session
$ git clone git@github.com:ucan-lab/docker-laravel-apache.git

# Clone Laravel project sang docker-laravel-apache/backend 
$ git clone git@github.com:laravel/laravel.git docker-laravel-apache/backend

$ cd docker-laravel-apache
$ make init
```

http://localhost

Bằng cách này là hoàn thành xây dựng môi trường project Laravel đã có.

## Cấu trúc container

```
├── web
└── db
```

cấu tạo bằng 2 container là web, db.

### Khác biệt với nginx

Với trường hợp Nginx thì thường chia ra php-fpm(application server) và container.
Với trường hợp Apache, module mod_php default được install, module này vừa là application server mà bên PHP chạy đồng thời cũng là web server.

## Cấu trúc directory

```
.
├── backend # route directory của project Laravel
├── infra
│     └── docker
│          ├── apache
│          │   └── httpd.conf
│          ├── mysql
│          │   ├── Dockerfile
│          │   └── my.cnf
│          └── php
│              ├── Dockerfile
│              └── php.ini
├── .env.example
├── Makefile
└── docker-compose.yml
```

## Khác biệt với bản nginx

※Điểm khác biệt với bản nginx là có thay đổi trong apache directory.

- infra/docker/apache/httpd.conf
- infra/docker/php/Dockerfile
- Makefile
- docker-compose.yml

Về điểm thay đổi này các bạn chỉ cần chú ý đến 4 file nêu trên là được.
Ngoài ra có thể check được chi tiết diff bằng PR sau:

- https://github.com/ucan-lab/docker-laravel-apache/pull/2
- https://github.com/ucan-lab/docker-laravel-apache/pull/4

## Base container của PHP

- https://hub.docker.com/_/php
- https://github.com/docker-library/php/tree/master/7.4/buster/apache

Trong image tag `php:<version>-apache` có kèm.

## Giải tích

### docker-compose.yml

```yaml
version: "3.8"
volumes:
  db-store:
services:
  web:
    build:
      context: .
      dockerfile: ./infra/docker/php/Dockerfile
    ports:
      - ${WEB_PORT:-80}:80
    volumes:
      - ./backend:/work/backend
    environment:
      - DB_CONNECTION=mysql
      - DB_HOST=db
      - DB_PORT=3306
      - DB_DATABASE=${DB_NAME:-laravel_local}
      - DB_USERNAME=${DB_USER:-phper}
      - DB_PASSWORD=${DB_PASS:-secret}

  db:
    build:
      context: .
      dockerfile: ./infra/docker/mysql/Dockerfile
    ports:
      - ${DB_PORT:-3306}:3306
    volumes:
      - db-store:/var/lib/mysql
    environment:
      - MYSQL_DATABASE=${DB_NAME:-laravel_local}
      - MYSQL_USER=${DB_USER:-phper}
      - MYSQL_PASSWORD=${DB_PASS:-secret}
      - MYSQL_ROOT_PASSWORD=${DB_PASS:-secret}
```

Gộp app với wb container, để chỉ còn web container thôi.

### infra/docker/php/Dockerfile

```Dockerfile:infra/docker/php/Dockerfile
FROM node:14-buster as node
FROM php:7.4-apache-buster
LABEL maintainer="ucan-lab <yes@u-can.pro>"
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

# timezone environment
ENV TZ=UTC \
  # locale
  LANG=en_US.UTF-8 \
  LANGUAGE=en_US:en \
  LC_ALL=en_US.UTF-8 \
  # composer environment
  COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer

# composer command
COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer
# node command
COPY --from=node /usr/local/bin /usr/local/bin
# npm command
COPY --from=node /usr/local/lib /usr/local/lib
# yarn command
COPY --from=node /opt /opt

RUN apt-get update && \
  apt-get -y install git libicu-dev libonig-dev libzip-dev unzip locales && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  locale-gen en_US.UTF-8 && \
  localedef -f UTF-8 -i en_US en_US.UTF-8 && \
  a2enmod rewrite && \
  docker-php-ext-install intl pdo_mysql zip bcmath && \
  composer config -g process-timeout 3600 && \
  composer config -g repos.packagist composer https://packagist.org

COPY ./infra/docker/php/php.ini /usr/local/etc/php/php.ini
COPY ./infra/docker/apache/httpd.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /work/backend
```

3 container - php, composer, node dùng multi stage build.
(có apache trong image của php)

Tùy vào trường hợp nếu không cần node thì có thể xóa khỏi Dockerfile.
Để cho có tính toàn cầu hóa thì về phần language và timezone để tiếng anh.
Trên thực tế tùy mục đích khu vực sử dụng mà thay đổi chỗ ngôn ngữ được.

`a2enmod rewrite` sẽ active module [mod_rewrite](http://httpd.apache.org/docs/current/mod/mod_rewrite.html) của Apache.
Nếu không có cái này thì routing của Lavarel sẽ không chạy được.

### infra/docker/apache/httpd.conf

```conf:infra/docker/apache/httpd.conf
<VirtualHost *:80>
    ServerName example.com
    ServerAdmin webmaster@localhost
    DocumentRoot /work/backend/public

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    <Directory /work/backend/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Hiện tại chỉ set những mục nào bắt buộc thôi.