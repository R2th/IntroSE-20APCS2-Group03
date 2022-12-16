***Xem thêm*** : [***Lập trình hướng đối tượng***](https://www.tailieubkhn.com/2020/09/oop.html)

Xem lại bài viết: [Triển khai website PHP thuần, Apache2, MySQL với docker compose](https://viblo.asia/p/php-websites-su-dung-docker-containers-voi-php-apache2-va-mysql-QpmleRGn5rd)

Trong bài viết trước mình đã giới thiệu build một website PHP thuần, Apache2, MySql với docker. Trong bài viết này chúng ta cùng tìm hiểu cách cách build một website xây dựng bằng Laravel trên docker với máy chủ Nginx và MySQL.

Project được xây dựng hoàn chỉnh tại repository [https://github.com/trannguyenhan/photo-gallery-laravel](https://github.com/trannguyenhan/photo-gallery-laravel), các bạn ghé qua cho mình một star repo nha. Và để cho dễ hình dung mình sẽ giới thiệu cách cài đặt và triển khai thông qua repo này, mọi người clone về và làm theo nha.


## Tạo file `docker-compose.yml`

Tạo file `docker-compose.yml` với 3 service `app`, `nginx` và `mysql` như sau: 

```yml
version: '3.8'
services:
  app:
    build:
      args:
        user: trannguyenhan
        uid: 1000
      context: .
      dockerfile: Dockerfile
    image: laravel-app
    restart: unless-stopped
    working_dir: /var/www/html/
    volumes:
      - ./:/var/www/html/
    networks:
      - photos
  nginx:
    image: nginx:stable-alpine
    restart: unless-stopped
    ports:
      - 8005:80
    volumes:
      - ./:/var/www/html
      - ./nginx/conf.d:/etc/nginx/conf.d/
    networks:
      - photos
  db:
    image: mysql
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: photo_gallery_laravel
      MYSQL_ROOT_PASSWORD: mysql12345
      MYSQL_USER: trannguyenhan
      MYSQL_PASSWORD: mysql12345
    ports:
      - "9906:3306"
    volumes:
      - ./database/photo-gallery-laravel-database.sql:/docker-entrypoint-initdb.d/dump.sql
    networks:
      - photos

#Docker Networks
networks:
  photos:
    driver: bridge
```

- Phần `nginx` và `mysql` chúng ta không cần cấu hình nhiều nên sẽ pull trực tiếp `image` và thêm vào 1 số tham số. 
- Còn service `app` chạy `php` có nhiều thứ cần chạy và cài đặt nên sẽ viết ra một con `Dockerfile` riêng để tiện cho việc cấu hình.
- Chúng ta ánh xạ cổng `80` của máy chủ `nginx` trong con docker ra phía ngoài cổng `8005` của máy gốc.
- Ánh xạ thư mục project vào phía trong Document Root của `nginx` thông qua câu lệnh: `./:/var/www/html`
- Cuối cùng là giống với bài viết trước, chúng ta ánh xạ port của `mysql` mặc định là `3306` từ container trong docker ra ngoài máy gốc là `9906`, điều này giúp bạn có thể truy cập vào cơ sở dữ liệu của project từ ngoài máy gốc thông qua cổng `9906`.

Với máy chủ `nginx` chúng ta cần 1 file cấu hình máy chủ `nginx` nếu không thì cổng nó sẽ nhảy loạn xạ và app sẽ không chạy được, chúng ta tạo ra một thư mục `nginx/conf.d` và tạo một file `laravel.conf` có nội dung như sau: 

```
server {
    listen 80;
    index index.php index.html;
    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/html/public;
    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
    location / {
        try_files $uri $uri/ /index.php?$query_string;
        gzip_static on;
    }
}
```

Cuối cùng, tạo file `Dockerfile` để cài đặt cho service app như sau: 

```Dockerfile
FROM php:7.4-fpm

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Set working directory
WORKDIR /var/www

USER $user
```

## Chạy ứng dụng

Chúng ta cùng sang những bước cuối cùng để chạy ứng dụng, đầu tiên là tạo 1 file `.env` từ `.env.example` với câu lệnh: 

```bash
cp .env.example .env
```

Thay đổi cấu hình của cơ sở dữ liệu giống với những biến môi trường của `mysql` docker đã được cấu hình trong file `docker-compose.yml`: 

```bash
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=photo_gallery_laravel
DB_USERNAME=trannguyenhan
DB_PASSWORD=mysql12345
```

Chạy ứng dụng với `docker-compose`: 

```bash
docker-compose up -d
```

Cài đặt các phụ thuộc cho ứng dụng Laravel: 

```bash
docker-compose exec app composer install
```

Tạo key cho ứng dụng Laravel: 

```bash
docker-compose exec app php artisan key:generate
```

Truy cập vào `http://localhost:8005/` để xem thành quả: 

![](https://images.viblo.asia/c9e4ed72-2c9a-4721-831c-99dc3ef1643c.png)