# I. Giới thiệu
Trong những năm qua, **Docker** trở thành 1 giải pháp thường xuyên được sử dụng để triển khai nhanh các ứng dụng nhờ vào đơn giản hóa việc chạy và triển khai các ứng dụng trong `container` (thùng chứa). Khi chúng ta sử dụng `LEMP`, ví dụ, với `PHP`, `Nginx`, `Mysql` và `Laravel framework`, Docker có thể đơn giản hóa quá trình thiết lập

**Docker Compose** đã đơn giản hóa hơn nữa quá trình phát triển bằng cách cho phép các nhà phát triển xác định cơ sở hạ tầng của họ, bao gồm các dịch vụ ứng dụng (`application services`), mạng (`networks`) và khối lượng (`volums`) trong một file duy nhất. **Docker Compose** cung cấp một giải pháp thay thế hiệu quả để chạy nhiều lệnh tạo vùng chứa docker và các lệnh chạy container của docker.

Trong hướng dẫn này, bạn sẽ xây dựng một ứng dụng web Laravel, với `Nginx` là máy chủ web và `MySQL` là cơ sở dữ liệu, tất cả bên trong các container Docker. Bạn sẽ xác định toàn bộ cấu hình  trong tệp soạn thảo docker, cùng với các tệp cấu hình cho PHP, MySQL và Nginx.
# II. Xây dựng ứng dụng
## 1. Tải Laravel và cài đặt các Dependencies

Ở bước này, chúng ta cài đặt Laravel, các bạn có thể vào doc của Laravel để xem lại cách cài [tại đây](https://laravel.com/docs/5.8/installation)

Đầu tiên, các bạn vào thư mục làm việc của các bạn (ở đây tôi chọn `/var/www`) sau đó tiến hành clone code Laravel về với lệnh

```PHP
cd ~
git clone https://github.com/laravel/laravel.git laravel-app
```

Đi vào thư mục laravel-app vừa được tạo ra

```PHP
docker run --rm -v $(pwd):/app composer install
```

Tiếp theo, sử dụng **Docker composer image** để **mount** (gắn kết) các thư mục mà bạn cần trong project và tránh việc phải cài Composer globally

Sử dụng -v và -rm với docker run tạo ra các container, các container này sẽ được kết nối với thư mục của bạn hiện tại trước khi bị xóa. Việc này sẽ copy thư mục laravel-app của bạn vào container và đảm bảo rằng thư mục vendor được tạo bên trong là bản copy của thư mục gốc của bạn

Cuối cùng, ta cấp quyền trên thư mục project với quyền non-root user:
```PHP
sudo chown -R $USER:$USER ~/laravel-app
```

## 2. Tạo Docker Compose File

Xây dựng các ứng dụng của bạn với **Docker Compose** sẽ giúp bạn đơn giản hóa việc phải thiết lập hạ tầng. Để thiết lập ứng dụng Laravel, chúng ta sẽ một file `docker-compose `để xác định **web server**, **database** và các **service** của ứng dụng.

Trong thư mục `laravel-app`, chúng ta tạo file `docker-composer.yml` với nội dung sau:
```PHP
version: '3'
services:

#PHP Service
app:
build:
context: .
dockerfile: Dockerfile
image: digitalocean.com/php
container_name: app
restart: unless-stopped
tty: true
environment:
SERVICE_NAME: app
SERVICE_TAGS: dev
working_dir: /var/www
volumes:
- ./:/var/www
- ./php/local.ini:/usr/local/etc/php/conf.d/local.ini
networks:
- app-network

#Nginx Service
webserver:
image: nginx:alpine
container_name: webserver
restart: unless-stopped
tty: true
ports:
- "80:80"
- "443:443"
volumes:
- ./:/var/www
- ./nginx/conf.d/:/etc/nginx/conf.d/
networks:
- app-network

#MySQL Service
db:
image: mysql:5.7.22
container_name: db
restart: unless-stopped
tty: true
ports:
- "3306:3306"
environment:
MYSQL_DATABASE: laravel
MYSQL_ROOT_PASSWORD: your_mysql_root_password
SERVICE_TAGS: dev
SERVICE_NAME: mysql
volumes:
- dbdata:/var/lib/mysql/
- ./mysql/my.cnf:/etc/mysql/my.cnf
networks:
- app-network

#Docker Networks
networks:
app-network:
driver: bridge
#Volumes
volumes:
dbdata:
driver: local
```

Giải thích file `docker-compose.yml` 1 chút, ở đây chúng ta xác định có 3 services là : **app**, **webserver** và **database**
* **app**: Định nghĩa này chứa ứng dụng Laravel và chạy 1 **custom Docker image**: digitalocean.com/php, cái này được chỉ ra tại Bước 4, nó thiết lập **working_dir** trong container tới thư mục **/var/www**
* **webserver**: Định nghĩa của dịch vụ này sẽ pull image **nginx:alpine** từ docker và  chạy trên cổng 80 và 443
* **db**: Định nghĩa của dịch vụ được pull về từ image **mysql:5.7.22** từ Docker và đã xác định được một vài biến môi trường bao gồm cả `database` được thiết lập cho ứng dụng của bạn được đặt tên là laravel ( đây là name database), đồng thời kèm theo password `root` cho database, bạn có thể đặt tên khác cho database và đặt password mà bạn muốn. Service này sẽ map port 3306 trên host tới port 3306 trên container.
* **container_name**: Để xác định tên của container, tương ứng với tên của dịch vụ, nếu bạn không chỉ định tên, Docker sẽ gán tên cho mỗi container đó.
* **app-network**: để tạo kết nối giữa các container, các dịch vụ sẽ được kết nối qua app-network.
* **dbdata**: là 1 volume tồn tại nội dung của folder **/var/lib/mysql** bên trong container. Điều này cho phép bạn dừng và khởi động service db mà không bị mất dữ liệu, ở cuối file `docker-compose.yml` ta cũng thấy có dbdata, với định nghĩa này, ta có thể sử dụng volumn này qua nhiều services.

![](https://images.viblo.asia/32a7f423-5062-4869-a9bc-6492f4f91468.png)

## 3. Tạo Dockerfile

Các bạn tạo 1 file là `Dockerfile` và được lưu tại **~/laravel-app**, nội dung của file như sau:
```PHP
FROM php:7.2-fpm

# Copy composer.lock and composer.json
COPY composer.lock composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    default-mysql-client \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
COPY . /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www
USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
```
Giải thích file Dockerfile 1 chút: 

* Đầu tiên Dockerfile tạo 1 image trên cùng của một Docker image là **php:7.2-fpm**, image này đã được cài sẵn php-fpm

* **RUN** để thực hiện việc update, install và cấu hình bên trong 1 container, bao gồm cả việc chỉ ra `user` và group `www`

* **WORKDIR** chỉ ra thư mục làm việc dành cho ứng dụng trên container.

* Tạo một người dùng và nhóm chuyên dụng với các quyền hạn chế sẽ giảm thiểu lỗ hổng vốn có khi chạy các container Docker, vì mặc định là **root**. Thay vì chạy container này với quyền root, chúng ta đã tạo user **www**, người có quyền truy cập đọc / ghi vào thư mục `/var/www` thông qua lệnh **COPY** và kèm theo –**chown** để sao chép quyền của thư mục ứng dụng .

* Cuối cùng, lệnh **EXPOSE** hiển thị một cổng trong container, 9000, cho máy chủ `php-fpm`. **CMD** chỉ định lệnh sẽ chạy khi container được tạo. Ở đây, CMD chỉ định “php-fpm”, sẽ khởi động máy chủ.

## 4. Cấu hình PHP
Bây giờ bạn xác định cơ sở hạ tầng thông qua docker-compose.yml, bạn có thể cấu hình dịch vụ PHP để hoạt động xử lý các yêu cầu đến từ Nginx

Để cấu hình PHP, bạn sẽ tạo tệp **local.ini** bên trong thư mục ~/laravel-app/php. Đây là tệp mà bạn đã gắn kết với **/usr/local/etc/php/conf.d/local.ini** bên trong vùng chứa trong phần 2. Tạo tệp này sẽ cho phép bạn ghi đè tệp` php.ini `mặc định mà PHP đọc khi nó bắt đầu khởi động:

![](https://images.viblo.asia/1b7efe77-de7b-4921-b256-087ccda0dd20.png)

## 5. Cấu hình Nginx
Để cấu hình cho Nginx, bạn tạo 1 file **app.conf** bên trong thư mục **~/laravel-app/nginx/conf.d/**, với nội dung:
```PHP
server {
    listen 80;
    index index.php index.html;
    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/public;
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
## 6. Cấu hình MySQL
Tạo file my.cnf bên trong thư mục **~/laravel-app/mysql** với nội dung

```PHP
[mysqld]
general_log = 1
general_log_file = /var/lib/mysql/general.log
```

## 7. Chạy các container và sửa cấu hình môi trường
Bây giờ bạn đã xác định tất cả các dịch vụ của mình trong docker-compose và tạo các tệp cấu hình cho các dịch vụ này, bạn có thể khởi động các container. Tuy nhiên, là bước cuối cùng, chúng ta sẽ tạo file .**env** từ **.env.example** để xác định môi trường trong ứng dụng Laravel.
```PHP
cp .env.example .env
```

Chúng ta sẽ cấu hình cụ thể khi chúng ta bắt đầu chạy container.

Với tất cả các dịch vụ được xác định trong tệp docker-compose, bạn chỉ cần đưa ra một lệnh duy nhất để bắt đầu tất cả các vùng chứa, tạo khối lượng và thiết lập và kết nối các mạng:
```PHP
docker-compose up -d
```

Khi bạn chạy **docker-compose** lần đầu tiên, nó sẽ tải xuống tất cả các image Docker cần thiết. Khi image được tải xuống và lưu trữ trong máy cục bộ của bạn, Compose sẽ tạo các container. Cờ `-d `để nói rằng, việc chạy các container là chạy ngầm.

Bạn có thể sửa đổi cấu hình **.env** trong container bằng lệnh `docker-compose exec` ví dụ để mở file .env ta dùng:
```PHP
docker-compose exec app nano .env
```
ngoài ra các bạn chạy thêm
```PHP
docker-compose exec app php artisan key:generate

docker-compose exec app php artisan config:cache
```
Kết quả các bạn sẽ thấy như sau:

![](https://images.viblo.asia/d196ff01-d447-4988-81d7-607bdc230dca.png)

Chúc các bạn thành công :D :D :D !

Nguồn: https://www.digitalocean.com/community/tutorials/how-to-set-up-laravel-nginx-and-mysql-with-docker-compose