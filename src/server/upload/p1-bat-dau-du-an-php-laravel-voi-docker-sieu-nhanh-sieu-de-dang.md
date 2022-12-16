# ( P1 ) - Bắt đầu dự án PHP - Laravel với Docker, siêu nhanh, siêu dễ dàng

### Hoàn cảnh
- Nhớ lại cái thời mới code PHP, lúc đó mình thường dành cả **thanh xuân** chỉ để setup môi trường có thể chạy được PHP, nào là tự cài từng thành phần trên mọi trường local, tiến bộ hơn tí thì cài WAMP rồi nhảy qua XAMPP.
- Sau một thời gian code đã rồi chuyền file lên server mới phát hiện sự khác biết giữa PHP version dưới local khác với môi trường Product. Từ đó mà Bug xuất hiện nhiều vô số kể. 
- Vần đề tưởng đơn giản nhưng lại phát sinh bao việc, **System Admin** thì đổ thừa do code dỡm, còn mình thì hì hục kiểm tra xem nguyên nhân từ đâu, rồi lại nài nỉ **System Admin** update server, đỉnh điểm của mâu thuận là mình tự phải server, và hậu quả là giờ mình cũng có khá khá kiến thức về server =)). Người ta nói **"Trong cái khó, ló cái khôn"** là đúng.

### Sự xuất hiện

-Cuối cùng ngày đó cũng đến, Docker được xuất hiện lần đầu tiền vào năm 2013 nhưng mình lại được tiếp xúc với nó vào năm 2017 khá chậm so với thế giới. Nhưng không sao dù gì thì biết đở hơn không =)).
- Vậy Docker là gì?.... chi tiết các bạn có thể tham khảo 2 bài việc của mình về Docker tại đây

	[Hiểu về Docker](https://viblo.asia/p/hieu-co-ban-ve-docker-QpmleoQrKrd)
		
	[Tại sao có Docker rồi mà còn đẻ ra Docker Compose](https://viblo.asia/p/tai-sao-co-docker-roi-ma-con-de-ra-docker-compose-Qpmleo2mKrd)
- Trong phạm vi bài này mình chỉ giới thiểu về Docker dùng để chạy Laravel

### Bắt đầu 
- Cấu trúc yêu câu sẽ được mô tả như hình dưới. 
![enter image description here](https://i.imgur.com/GusZgVM.png)

- Bắt tay vào tạo một thử mục cho dự án mới, ở đây mình đặt tên là **LaravelStarterDocker**, bên trong thư mục hay tạo tập tin có tên **docker-compose.yaml**

***docker-compose.yaml***
```yaml
version: '3'
services:
  nginx:
    image: nginx:1.14-alpine
    volumes:
      - ./nginx/conf.d/:/etc/nginx/conf.d/
      - ./src/public:/var/www/laravel/public
    ports:
      - 8000:80
    links:
      - phpfpm
    depends_on:
      - phpfpm
  phpfpm:
    build:
      context: php
      dockerfile: Dockerfile
    volumes:
      - ./src:/var/www/laravel
    links:
      - mysql
      - mysql_test
    depends_on:
      - mysql
      - mysql_test
    environment:
      - DB_HOST=mysql
      - DB_DATABASE=sample
      - DB_USERNAME=root
      - DB_PASSWORD=root
      - REDIS_HOST=redis
      - DB_TEST_HOST=mysql_test
  mysql:
    image: mysql:5.7
    ports:
      - "3406:3306"
    volumes:
      - ./db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=sample

  mysql_test:
    image: mysql:5.7
    ports:
      - "3506:3306"
    volumes:
      - ./db_test:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=sample
  redis:
    image: redis:5.0-alpine
    ports:
      - "46379:6379"
  mailhog:
    image: mailhog/mailhog
    ports:
      - 8025:8025
      - 2525:1025
```
Sau khi copy nội dung chung ta hay để ý dòng thứ số 6

![enter image description here](https://i.imgur.com/acl8AFZ.png)

Hãy tạo thư mục **./nginx/conf.d** và tạo file **default.conf** để cấu hình cho phần Nginx
![enter image description here](https://i.imgur.com/hjlhyda.png)
***default.conf***
```bash
server {
    listen       80;
    server_name  localhost;
    charset      utf-8;

    root /var/www/laravel/public;

    index index.php;
    client_max_body_size 20M;
    client_body_buffer_size 20M;

    location / {
        try_files $uri $uri/ /index.php$is_args$args;
        gzip_static on;
    }

    location ~ \.php$ {
        root /var/www/laravel/public;
        fastcgi_pass  phpfpm:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include       fastcgi_params;
    }

}
```

Ở dòng thứ 17
![enter image description here](https://i.imgur.com/ErA0gra.png)
Riêng phần này bởi vì **phpfpm** được build từ file Dockerfile nên chúng ta sẽ tiền hành tạo file theo đường dẫn **"./php/Dockerfile"**
![enter image description here](https://i.imgur.com/bhywSo1.png)

***Dockerfile***
```bash
FROM php:7.3-fpm-alpine

RUN apk --update add freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    shadow \
    libzip-dev \
    gettext \
    gettext-dev \
    icu-dev \
    && docker-php-ext-install pdo_mysql mbstring zip gettext intl exif \
    && docker-php-ext-configure gd --with-gd \
        --with-png-dir=/usr/include/ \
        --with-freetype-dir=/usr/include/ \
        --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

RUN apk add autoconf build-base \
&& pecl install xdebug

ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}

RUN groupadd -g ${PGID} laravel && \
    useradd -u ${PUID} -g laravel -m laravel && \
    usermod -p "*" laravel -s /bin/sh

COPY upload.ini /usr/local/etc/php/conf.d/

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

USER laravel
RUN composer global require "laravel/installer" && composer global require "phpunit/phpunit"
ENV PATH $PATH:/home/laravel/.composer/vendor/bin

WORKDIR /var/www/laravel
```
#### Mô tả:
```
php:7.3-fpm-alpine 
# Cài đặt theo image với tên 7.3-fpm-alpine

RUN apk --update add freetype-dev \
...
&& pecl install xdebug
# Cài đặt các thư viện cần thiết

ARG PUID=1000  
..
ENV PGID ${PGID}
# Set biến môi trường

RUN groupadd -g ${PGID} laravel && \  
    useradd -u ${PUID} -g laravel -m laravel && \  
    usermod -p "*" laravel -s /bin/sh
# Tạo group & user với tên là laravel và add vào group laravel

COPY upload.ini /usr/local/etc/php/conf.d/
# Phần này chúng ta sẽ copy file upload.ini ở thư mục hiện tại vào
bên trong Docker, để có thể đơn giản hóa việc tùy chỉnh giới hạn
upload. Tí nữa chúng ta sẽ tạo file upload.ini

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Tiên hành cài đặt composer

USER laravel  
RUN composer global require "laravel/installer" && composer global require "phpunit/phpunit"  
ENV PATH $PATH:/home/laravel/.composer/vendor/bin
# Sau khi có composer thì sẽ tiếp tục dùng composer để cài đặt laravel

WORKDIR /var/www/laravel
# Và cuối cùng chúng ta khai báo thư mục Docker trực tiếp làm việc.
Điều này sẽ giúp chung ta lúc truy cập có thể truy cập vào được ngay thư mục cần thiết
```

Hãy tạo file trong thư mục **php**
***upload.ini***
```bash
upload_max_filesize = 20M
post_max_size = 20M
```
![enter image description here](https://i.imgur.com/wznPPD8.png)


Đên đây công tác chuẩn bị nhưng thứ cần thiết đã xong. Hay thực hiện lệnh
```bash
$ docker-compose up -d
```
Nếu là lần đầu tiên chạy, chúng ta sẽ mất tầm 5 đến 10 phút để nó build mới. Hay tranh thủ thời gian quý giả của bạn lên đọc vài tin tức lá cải :D
![enter image description here](https://i.imgur.com/pfgak3T.png)
Sau khi thực hiện, nếu nội dung xuất hiện thông báo như hình trên, xin chúc mừng vậy là bạn đã có một môi trường có thể chạy được Laravel

### Trải nghiệm
Hãy thử truy cập địa chỉ "localhost:8000" và cũng xem kết quả đạt được.

**MỘT LỖI XUẤT HIỆN**
![enter image description here](https://i.imgur.com/v1trIKQr.png)
Không sao! Đừng quá lo lắng, điều đó chứng minh rằng nginx của bạn đã hoạt động tốt =)).

Hay vào thư mục public và tạo ra file php đầu tiên với tên là "index.php" và điền nội dung như hình
![enter image description here](https://i.imgur.com/mH9sQmT.png)

Thử f5 lại trình duyệt.
![enter image description here](https://i.imgur.com/mUuNM2c.png)
Vậy là chúng ta đã có thể chạy được file PHP đầu tiền
Ở phần tới. Chúng ta sẽ tiến hành setup Laravel và giới thiệu về các service đi kèm.

**Source github:**
[https://github.com/qt91/LaravelStarterDocker](https://github.com/qt91/LaravelStarterDocker)