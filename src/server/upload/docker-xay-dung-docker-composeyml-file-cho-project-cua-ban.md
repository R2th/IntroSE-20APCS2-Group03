Nhật ký cho quá trình tự xây dựng `docker-compose.yml` cho dự án "Hello World" Laravel.
# Trước khi bạn bắt đầu

- Bạn cần có những hiểu biết cơ bản về Docker và Docker compose.
- Kiến thức về nginx, cấu hình virtual host cho nginx.
- Bài viết sẽ setup virtual với hàm `phpinfo()` trước tiên. Sau đó sẽ đổi đường dẫn root sang Laravel project để chạy ứng dụng của bạn ở mức cơ bản.

# Hãy bắt đầu từ việc cài đặt mà không Docker ..
```
Khoan nói về các ứng dụng Laravel phức tạp, ở đây, tôi chỉ đề cập ở mức độ cài đặt Laravel project 
trang chủ và có thể migrate bảng user có sẵn.
```

Hãy bắt đầu cài đặt ứng dụng từ việc không sử dụng Docker. **LAMP (Linux, Apache2, MySQL, PHP)**, **LEMP (Linux, Nginx, MySQL, PHP)** là 2 cụm từ "tìm kiếm" kinh điển. Nó là bộ các công cụ giúp bạn cài đặt một ứng dụng web thông thường để hoạt động.

Về cơ bản, mọi ứng dụng web để chạy được bạn cần tối thiểu 3 phần sau:
- Web server: Nginx hoặc Apache2 là những sự lựa chọn phổ biến
- Ngôn ngữ lập trình: tất nhiên :D, bạn phải cho web server biết là mình dùng ngôn ngữ lập trình nào chứ.
- Database: Nơi sẽ lưu dữ liệu cho ứng dụng

Bạn cũng có thể đọc thêm về Docker tại [đây](https://minhnv2306.github.io/categories/Development-and-Operation/Docker/)

LAMP, LEMP đều chính là 3 phần trên (Linux thì mình sẽ nói sau nhé). Trong phạm vi bài viết, mình sẽ sử dụng LEMP.

Khi cài đặt LEMP xong, chúng ta cần cấu hình 1 virtual host để chạy ứng dụng với domain. Trước hết chúng ta cứ làm hiển thị thông tin PHP qua hàm `phpinfo()`, sau rồi chuyển cấu hình cho Laravel project là ngon :D

**Bước 1: Bạn cần thay đổi cấu hình nginx**

Bạn cần để nginx trỏ tới host chứa file `index.php`. Cơ bản nó sẽ như sau:

```
server {
    listen  80;

    server_name localhost;
	
	# Cái này quan trọng nè, root của project
    root /var/www/html;

    index index.php index.html index.htm;

    error_log /var/log/nginx/laravel.error.log;
    access_log /var/log/nginx/laravel.access.log;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP-FPM Configuration Nginx
    location ~ \.php$ {
        try_files $uri = 404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass localhost:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param REQUEST_URI $request_uri;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}
```

**Bước 2: Thêm file `index.php`**

Cũng không cần giải thích nhiều. Từ cấu hình trên, ta có thể thấy, bạn cần có 1 file `index.php` ở thư mục `/var/www/html` là xong :D
```php
<?php
echo phpinfo();
?>
```
Như vậy là khi vào http://localhost, thông tin PHP đã được hiển thị.

Phần chuyển cấu hình cho ứng dụng Laravel, chỉ cần đổi đường dẫn root, tôi gộp luôn vào phần 2.

# Suy nghĩ docker hóa LEMP

##  Docker hóa HelloWorld trước tiên

Để docker hóa các phần như ở mục 1, chúng ta cần 3 images tương ứng 3 phần trong LEMP ở trên: nginx, mysql và php-fpm.

Bắt đầu từ cái dễ trước đi. Database tôi sử dụng MySQl, đơn giản chỉ là pull image của mysql về thôi, không cần cài cắm gì cả.

```yaml
services:
  mysql:
    image: mysql:5.7
    environment:
      MYSQL_DATABASE: 'laravel'
      MYSQL_USER: 'mingnv'
      MYSQL_PASSWORD: 'password'
      MYSQL_ROOT_PASSWORD: 'password'
    # Volumes này đang sử dụng theo dạng biến đó
    # Nó tương đương khai báo VOLUME trong Dockerfile, sinh volume dạng mã băm
    volumes:
      - db_data:/var/lib/mysql
```

- Game là dễ, thế là có 1 database để lưu dữ liệu rồi, tiếp theo chúng ta sẽ pull image PHP qua `php-fpm` image

```yaml
services:
  php-fpm:
	image: php:7.2-fpm
```

- Tương tự như database nhỉ. Nhưng khoan. `php-fpm` không thể đúng 1 mình được. Nó cần nói chuyện với web server, kết hợp để xử lý các request từ phía người dùng.... To be continue!!!

- Web server: phần này là phần quan trọng nhất của ứng dụng web. Ở đây tôi sử dụng `nginx` nên sẽ pull image nginx về. Nhưng như tôi đã nói ở trên, web server không thể hoạt động đơn lẻ. Nó cần  có file cấu hình, trỏ tới host của bạn, lấy code và hoạt động. Do đó bạn cần phải có file Dockerfile để build.

```docker
FROM nginx:latest

# Change Nginx config here...
RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/
```

Config mặc định sẽ không trỏ tới host được, do đó chúng ta sẽ sử dụng file conf ở trên để thay thế `default.conf` của nginx. Bạn nhớ thay đường dẫn `php-fpm bằng` host đúng của contianer nhé

Lúc này bạn bật ứng dụng lên và chạy, `docker-compose.yml` sẽ có dạng như sau

```yaml
# Sử dụng version 3.3 cho nó mới
version: '3.3'

services:
  nginx:
    build: ./nginx
    ports:
      - "8080:80"
    # Thêm depends_on để nó start php-fpm trước khi start nginx, nếu không sẽ bị báo lỗi host php-fpm không tìm thấy
    depends_on:
      - php-fpm
    volumes:
      # Logging
      - ./nginx/log:/var/log/nginx/
      # Volume đến code ứng dụng
      - ./nginx/index.php:/var/www/html/index.php
  mysql:
    image: mysql:5.7
    environment:
      MYSQL_DATABASE: 'laravel'
      MYSQL_USER: 'mingnv'
      MYSQL_PASSWORD: 'password'
      MYSQL_ROOT_PASSWORD: 'password'
  adminer:
    image: adminer
    ports:
      - 8081:8080
  php-fpm:
    image: php:7.2-fpm
```

Thực hiện `docker-compose up` để chạy. Hmm, kết quả xuất hiện lỗi .

Tôi đã thực sự lúng túng trước lỗi ngày và mất tới 2 ngày để fix nó. Nguyên nhân là nó không tìm thấy file `index.php` trong khi chạy `php-fpm`. Sau khi tham khảo 1 số tài liệu, tôi mới hiểu, dù `nginx` và `php-fpm` đã nói chuyện với nhau nhưng các thư mục, files của nó không được dùng chung. Vì vậy khi bạn chỉ `volumes` file `index.php` cho `nginx`, khi thao tác của `php-fpm` không tìm thấy file này.

```
Tất cả các services làm việc với source code (nginx, php-fpm và sau này xuất hiện thêm bạn workspace) đều cần 
volumes chung với nhau và volumes đến source code folder.
```

Và rồi kết quả cuối cùng file `docker-compose.yml` sẽ như sau:

https://github.com/minhnv2306/laravel-docker/blob/01cea0eb1af8007e6e32ba4c2803088ac98dd3ce/docker-compose.yml

Khi đã volume cho `php-fpm` và `nginx` như vậy, ứng dụng đã lên.

## Level up cho ứng dụng Laravel nào!

Ở bước 2.1, chúng ta đã lên trang `phpinfo()`. Bước tiếp theo, chúng ta sẽ thay trang này bằng ứng dụng Laravel.

Công việc đơn giản, chỉnh đường dẫn root của ứng dụng là xong.

https://github.com/minhnv2306/laravel-docker/commit/35c4920de3ec51a91c5bcc59b4014e743181b6b3

Như vậy đúng là xong thật, ứng dụng Laravel đã lên. Bạn đã thử kết nối chúng với database.

```
docker exec php-fpm php artisan migrate
```

Kết quả là nhận được 1 thông báo thiếu `mysql-extension`. Như vậy chúng ta có thể thấy rằng image `php-fpm` chỉ có những extension cơ bản nhất của php, chưa hỗ trợ `mysql-extension`. Công việc của chúng ta tiếp theo là cập nhật extension này

```
Để cài thêm các extension cho php trong Docker, bạn sử dụng docker-php-ext-install
```

```docker
FROM php:7.2-fpm

RUN apt-get update && apt-get install -y \
	vim \
  && docker-php-ext-install mysqli pdo_mysql

EXPOSE 9000 
```

Và lần này đã migrate ngon rồi nhé :D.

# Chúng ta cần nhiều hơn thế ...

Ứng dụng của chúng ta đã lên hình, đẹp đẽ, nếu nhìn lướt qua. Bạn có nhớ tôi đã nhắc đến Linux và có nói phần sau sẽ đề cập.

Trong các phần 1,2, ứng dụng của tôi đã được cài `composer`, `npm` sẵn trên máy rồi, ứng dụng mới có thể hoạt động. Nói một cách khác, tôi đã chạy các lệnh này trước đó từ máy local của mình:

```bash
composer install

npm install
npm run dev
```

Nhưng như vậy thì chưa đúng lắm với Docker, độc lập môi trường với máy của bạn. Chúng ta cần 1 nơi tên gọi là `workspace`để làm việc với mã nguồn như cài đặt git, xem mã nguồn, cài cắm composer, npm, các tool quản lý mã nguồn tương tự. Hình như tôi đang nhắc tới hệ điều hành nhỉ?

Đúng vậy, chúng ta sẽ tách biệt chúng ra thành 1 container riêng với tên là **"workspace"**, nơi làm việc với mã nguồn, cài đặt ứng dụng.

Đó chỉ là 1 phần bạn cần thêm. Bên cạnh đó, bạn có thể thêm thắt như container "data" chỉ để lưu trữ dữ liệu cho ứng dụng, container "data_test" để lưu dữ liệu cho ứng dụng khi chạy test.

Bạn có thể tham khảo thêm các services tại [đây](https://github.com/FramgiaDockerTeam/laravel-microservices)
* nginx
* application (for storing project source code)
* php-fpm
* workspace (for working around with the all project)
* mysql
* mysql_test (for running integration test)
* mongodb
* redis
* data (for storing mysql, mongo, redis data)
* data_test (for storing mysql, mongo, redis data while running test)
* logs (for storing some system logs)

# Tách biệt các biến ra cấu hình ...

Để tăng độ nguy hiểm cho bạn, hãy thêm biến `.env` khi chạy `docker-compose`. Một hữu ích nữa nó mang lại là giúp bạn dễ maintain, thay đổi các tham số mà không cần sửa trực tiếp trong `docker-composer.yml`.

```yaml:docker-compose.yml
version: '3'
...
services:
### NGINX Server #########################################
    nginx:
      build:
        context: ./nginx
        args:
          - CHANGE_SOURCE=${CHANGE_SOURCE}
          - PHP_UPSTREAM_CONTAINER=${NGINX_PHP_UPSTREAM_CONTAINER}
          - PHP_UPSTREAM_PORT=${NGINX_PHP_UPSTREAM_PORT}
          - http_proxy
          - https_proxy
          - no_proxy
      volumes:
        - ${APP_CODE_PATH_HOST}:${APP_CODE_PATH_CONTAINER}${APP_CODE_CONTAINER_FLAG}
        - ${NGINX_HOST_LOG_PATH}:/var/log/nginx
        - ${NGINX_SITES_PATH}:/etc/nginx/sites-available
        - ${NGINX_SSL_PATH}:/etc/nginx/ssl
      ports:
        - "${NGINX_HOST_HTTP_PORT}:80"
        - "${NGINX_HOST_HTTPS_PORT}:443"
        - "${VARNISH_BACKEND_PORT}:81"
      depends_on:
        - php-fpm
      networks:
        - frontend
        - backend
...
```

```docker:.env
...
### NGINX #################################################

NGINX_HOST_HTTP_PORT=80
NGINX_HOST_HTTPS_PORT=443
NGINX_HOST_LOG_PATH=./logs/nginx/
NGINX_SITES_PATH=./nginx/sites/
NGINX_PHP_UPSTREAM_CONTAINER=php-fpm
NGINX_PHP_UPSTREAM_PORT=9000
NGINX_SSL_PATH=./nginx/ssl/
...
```

# Cuối cùng tôi đúc kết được gì

* Bạn nên tách ứng dụng thành các services đơn lẻ để dễ quản lý, nó cũng là 1 phần của [best practice](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#decouple-applications) cho docker
* Tất cả các services làm việc với source code (nginx, php-fpm, workspace ...) đều cần volumes chung với nhau và volumes đến source code folder.
* Bạn cần có các services cơ bản để có thể chạy được ứng dụng (php-fpm, nginx, database). Bên cạnh đó là 1 service để làm việc với mã nguồn, cài đặt mã nguồn (composer, npm) với tên **workspace**.
```bash
docker-compose exec workspace composer install
docker-compose exec workspace php artisan key:generate
docker-compose exec workspace php artisan migrate
docker-compose exec workspace php artisan db:seed
docker-compose exec workspace yarn
docker-compose exec workspace yarn watch

# For testing
docker-compose exec workspace php artisan db:seed --class=TestDataSeeder
```
* Tách các tham số trong `docker-composer.yml` ra file cấu hình cho dễ quản lý và thay đổi.

# Tài liệu tham khảo

* [Laradock](https://github.com/laradock/laradock)
* [Laravel Microservices - Framgia Docker Team](https://github.com/FramgiaDockerTeam/laravel-microservices)
* [Declare default environment variables in file](https://docs.docker.com/compose/env-file/)
* [My project demo](https://github.com/minhnv2306/laravel-docker)