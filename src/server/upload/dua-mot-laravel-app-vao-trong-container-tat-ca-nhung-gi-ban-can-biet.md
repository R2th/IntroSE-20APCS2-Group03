Deploy và chạy ứng dụng trong docker container giờ cũng không còn là chuyện gì xa lạ nữa rồi.
Hướng dẫn cũng có ở khắp mọi nơi. Nhưng khi nhúng tay vào làm mới biết mọi thứ không đơn giản chỉ là copy code và cài
PHP. Nhất là cả những vấn đề mà bạn không thể nhận ra nếu bạn chỉ dừng ở bước build image mà chưa deploy và chạy nó
trên production. Bài này mình sẽ tổng hợp những thứ mình biết sau những gì mình đã trải qua để giúp mọi người build được
một image cho Laravel app của mình sao cho phù hợp nhất nhé.

## Base image

Chọn base image tưởng có vẻ không quan trọng lắm nhưng nó sẽ ảnh hưởng đến image cuối cùng của bạn.
Bạn có 2 lựa chọn, một là dùng một distro image (`ubuntu`, `debian`, `alpine`) rồi cài PHP và các package, extension
cần thiết. Hoặc là dùng image cài sẵn PHP (official image `php`).

Thường thì sử dụng distro image và cài PHP sẽ cho image size nhỏ hơn. Nếu bạn dùng `debian` thì image sẽ nhỏ hơn
image `php` official khoảng 300MB, còn với `alpine` là khoảng 60MB. Image build cũng sẽ nhanh hơn vì các extension đã
được build sẵn và bạn chỉ cần tải về qua package manager (`apt-get`, `apk`) thay vì build từ source. Tuy nhiên version
update có thể sẽ chậm hơn một chút vì nó phụ thuộc vào maintainer của package bạn dùng.

Nếu bạn chọn official image thì image size sẽ to hơn một chút. Bù lại thì nó đã được config sẵn để phù hợp với môi
trường trong container. Chọn version cho cũng rất đơn giản, chỉ cần chọn tag bạn muốn là xong. Version mới cũng được
update sớm và đầy đủ hơn. Thậm chí phiên bản mới nhất vẫn còn đang RC cũng đã có luôn rồi.

Có 2 lựa chọn distro phổ biến là `debian` và `alpine`. Debian thì có thể sẽ quen thuộc với bạn hơn vì nó khá phổ biến
trên server và PC. Alpine thì lại có kích thước image nhỏ hơn rất nhiều. Busybox cũng có sắn nhiều tool quen thuộc như
vi, wget, ps, top, netstat... nên bạn không cần cài thêm nữa. Gần như khác biệt duy nhất mà bạn có thể nhận thấy chỉ
là về package manager. Alpine dùng `apk` thay vì `apt-get` và tên các package cũng khác nữa.
Tuy nhiên nếu muốn dùng alpine thì có vài lưu ý bạn cần quan tâm.

Đầu tiên alpine dùng thư viện C khác nên binary được build cho debian sẽ không chạy được trên alpine.
Mà nếu được build trên alpine cũng chưa chắc nó sẽ chạy được giống như trên  debian.
Một package quen thuộc mà bạn sẽ gặp vấn đề này là [barryvdh/laravel-snappy](https://github.com/barryvdh/laravel-snappy).

Tiếp theo, alpine [có thể sẽ xóa các phiên bản cũ của các package](https://gitlab.alpinelinux.org/alpine/abuild/-/issues/9996).
Vậy nên nếu bạn cần package nào đó với version chính xác thì có thể là bạn không nên dùng alpine. Tuy nhiên những package
được nhiều người sử dụng như python, npm... thì thường sẽ không bị xóa nên cũng không cần quá lo lắng.

Tóm lại là:

- Nếu bạn không biết nên dùng cái nào thì hãy dùng official image với debian (`php:7.4-fpm-buster`, `php:8.0-fpm-buster`).
- Nếu image không có gì đặc biệt thì hãy cân nhắc sử dụng alpine để có image size nhỏ hơn (`php:7.4-fpm-alpine`, `php:8.0-fpm-alpine`).
- Nếu bạn muốn image nhỏ hơn nữa và build nhanh hơn thì hãy dùng base image là một distro (`ubuntu`, `debian`, `alpine`).
và tự cài PHP cùng với các extension và package bạn muốn.

## Build steps

Chọn xong base image rồi thì mình bắt đầu build thôi. Mình sẽ dùng base image là `php:8.0-fpm-alpine` nhé.

```Dockerfile
FROM php:8.0-fpm-alpine
```

Nhìn chung thì đưa một app vào trong container sẽ gồm những bước sau:

- Cài package/dependecies
- Copy code
- Set entrypoint

### Cài extension

Đầu tiên là cài những extension cần thiết. Với zip thì thường bạn sẽ cần thêm các extension sau:

- bcmath
- pdo_mysql
- opcache
- zip

Ngoài ra nếu bạn dùng PostgreSQL thì sẽ cần thêm *pdo_pgsql* thay vì *pdo_mysql*. Và bạn có thể thêm *redis* để dùng
*phpredis* với hiệu năng gấp 6-7 lần so với *predis*.

Bước này thì Dockerfile của mình sẽ trông như thế này.

```Dockerfile
FROM php:8.0-fpm-alpine

ENV RUN_DEPS \
    zlib \
    libzip \
    postgresql-libs

ENV BUILD_DEPS \
    zlib-dev \
    libzip-dev \
    postgresql-dev

ENV PHP_EXTENSIONS \
    opcache \
    zip \
    bcmath \
    pdo_mysql \
    pdo_pgsql

ENV PECL_EXTENSIONS \
    redis

RUN apk add --no-cache --virtual .build-deps $BUILD_DEPS \
    && pecl install $PECL_EXTENSIONS \
    && docker-php-ext-install -j "$(nproc)" $PHP_EXTENSIONS \
    && docker-php-ext-enable $PECL_EXTENSIONS \
    && apk del .build-deps

RUN apk add --no-cache --virtual .run-deps $RUN_DEPS
```

Ở đoạn trên mình đã đặt các package/extension cần cài thành biến môi trường để command trong `RUN` dễ nhìn hơn.
Một số extension phụ thuộc vào các package khác nên chúng ta có `RUN_DEPS` là các package cần cài thêm.
Với image official mình sẽ phải dùng tiện ích có sẵn của image là `docker-php-ext-install` để cài extension.
Khác với cách cài dùng package manager thì nó sẽ tải source code của extension để compile nên chúng ta sẽ có `BUILD_DEPS`
là các package cần cài thêm để build extension.

Bước này chạy khá lâu nên tốt nhất bạn nên tách đoạn này thành một image riêng và dùng nó làm base image để tiết kiệm
thời gian build cho những lần sau.

### Nginx

Với PHP-FPM, bạn sẽ cần một web server để xử lý request nữa. 2 lựa chọn phổ biến nhất là Apache và NGINX.
Mình sẽ dùng NGINX nhé. Chúng ta sẽ phải chạy NGINX trong cùng một container với PHP-FPM để có thể truy cập các file
static (folder *public* của Laravel). Có nhiều cách để chạy nhiều process trong cùng một container. Mình sẽ dùng
[s6-overlay](https://github.com/just-containers/s6-overlay), vốn được viết đặc biệt để chạy trong container.

Process của s6-overlay sẽ là process chính của container (entrypoint).
Chúng ta sẽ cần 2 file để define 2 process sẽ chạy (PHP-FPM và NGINX) trong folder `/etc/services.d` như sau.

```bash:services/php-fpm/run
#!/usr/bin/with-contenv sh

exec docker-php-entrypoint php-fpm
```

```bash:services/nginx/run
#!/usr/bin/execlineb -P

nginx -g "daemon off;"
```

Ngoài ra thì image PHP mặc định sẽ listen ở port 9000 thay vì unix socket giống như bạn cài từ package manager.
Vậy nên cần thêm config cho PHP-FPM như sau.

```conf:php-fpm.d/zz-docker.conf
[global]
daemonize = no

[www]
listen = /run/php/php-fpm.sock
listen.owner = www-data
listen.group = www-data
```

Cuối cùng là config cho NGINX.

```conf:nginx/default.conf
server {
    listen 80;

    root  /var/www/html/public;
    index index.html index.htm index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php {
        fastcgi_pass    unix:/run/php/php-fpm.sock;
        fastcgi_param   SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include         fastcgi_params;
        internal;
    }
}
```

Dockerfile để cài s6-overlay và nginx của mình sẽ như này.

```Dockerfile
# Cài s6-overlay
ENV S6_OVERLAY_RELEASE=https://github.com/just-containers/s6-overlay/releases/latest/download/s6-overlay-amd64.tar.gz
RUN curl -sL ${S6_OVERLAY_RELEASE} | tar xzf - -C /

# Cài NGINX
RUN apk add --no-cache nginx

# Tạo folder cho socket của nginx.pid và php-fpm.sock
RUN mkdir -p /run/nginx /run/php

# Copy chỗ file config lúc nãy
COPY services /etc/services.d
COPY php-fpm.d /usr/local/etc/php-fpm.d
COPY nginx /etc/nginx/conf.d
```

### Composer install

Bước tiếp theo là cài composer và các package cho app của bạn.

```Dockerfile
RUN wget -qO /usr/local/bin/composer https://getcomposer.org/download/2.1.3/composer.phar \
    && chmod +x /usr/local/bin/composer

COPY composer.json composer.lock .

RUN composer install \
    --no-interaction \
    --ansi \
    --no-progress \
    --no-dev \
    --ignore-platform-reqs \
    --no-autoloader \
    --no-scripts
```

Mình thêm `--no-autoloader` và `--no-script` vì chỗ này mình vẫn chưa copy code vào nên chưa có gì để dump autoload.

### Code và Entrypoint

Bước cuối cùng chỉ còn là copy code của bạn vào image và set entrypoint. Với Laravel thì chúng ta có thể có tới 3
process cần chạy.

- PHP-FPM cho web app
- Queue worker (`php artisan queue:work`)
- Cronjob (`php artisan schedule:run`)

Entrypoint của mình sẽ trông như này.

```bash:entrypoint.sh
#!/bin/sh

if [ "$1" = "web" ] || [ "$1" = "worker" ] || [ "$1" = "cron" ]; then
    # Cache config, view, route và migrate
    php artisan optimize
    php artisan migrate --force
fi

if [ "$1" = "web" ]; then
    # Đây là entrypoint của s6-overlay
    /init
elif [ "$2" = "worker" ]; then
    exec docker-php-entrypoint su www-data s /bin/sh -c 'php artisan queue:work'
elif [ "$2" = "cron" ]; then
    echo "* * * * * php /var/www/html/artisan schedule:run" | crontab -u www-data -
    exec docker-php-entrypoint crond -fl 2
else
    exec "$@"
fi
```

Như vậy thì với cùng một image, tùy vào command mà container của chúng ta sẽ chạy web app, worker hoặc là cronjob.
Toàn bộ Dockerfile của mình sẽ trông như này. Phần cài extension như đã nói từ trước bạn nên tách ra thành một image
riêng và dùng nó làm base image nhé.

```Dockerfile
FROM <image PHP mà bạn vừa build ở trên>

RUN apk add --no-cache nginx

ENV S6_OVERLAY_RELEASE=https://github.com/just-containers/s6-overlay/releases/latest/download/s6-overlay-amd64.tar.gz

RUN curl -sL ${S6_OVERLAY_RELEASE} | tar xzf - -C /

RUN mkdir -p /run/nginx /run/php

COPY services /etc/services.d
COPY php-fpm.d /usr/local/etc/php-fpm.d

WORKDIR /var/www/html

RUN wget -qO /usr/local/bin/composer https://getcomposer.org/download/2.1.3/composer.phar \
    && chmod +x /usr/local/bin/composer

COPY composer.json composer.lock .

RUN composer install \
    --no-interaction \
    --ansi \
    --no-progress \
    --no-dev \
    --ignore-platform-reqs \
    --no-autoloader \
    --no-scripts

COPY entrypoint.sh /usr/local/bin

# Copy code của bạn vào image
COPY . .

# Dump autoload sau khi bạn đã copy code
RUN composer dump-autoload

EXPOSE 80

ENTRYPOINT entrypoint.sh

CMD web
```

## Config

Với image như trên là đủ để bạn chạy app rồi. Tuy nhiên, app chạy trong môi trường container cần thêm một vài config nhỏ
nữa để chạy hiệu quả hơn.

### PHP-FPM và NGINX

Đầu tiên là với PHP-FPM. Vì chúng ta chạy cả NGINX trong cùng container nên sẽ có 2 cái access log, của PHP-FPM và NGINX.
Vậy nên hãy tắt một cái đi, ở đây thì access log của NGINX có nhiều thông tin hơn nên hãy tắt của PHP-FPM đi nhé.

```conf:php-fpm.d/zz-docker.conf
access.log = /dev/null
```

Mà thường thì bạn sẽ có một cái load balancer khác (có thể cũng là NGINX) đứng trước container web app của bạn nên có
thể tắt luôn log của NGINX đi cũng được.

```conf:nginx/default.conf
access_log off;
error_log  off;
```

### Laravel

Giờ đến log của Laravel. Mặc định thì nó sẽ ghi log ra file `.log` trong folder `storage/logs`. Nhưng vấn đề là mỗi lần
container reset thì những file đã được ghi ra đều sẽ bị mất. Bạn có thể mount folder log từ một volume. Nhưng nếu bạn
có nhiều server thì file log của bạn sẽ ở mỗi nơi một ít. Giải pháp quen thuộc của docker là dùng một hệ thống log tập
trung như ELK (Elasticsearch + Logstash + Kibana) hoặc GPL (Grafana + Promtail + Loki).

Phần lớn các giải pháp log tập trung có thể đọc từ file log, nhưng đơn giản nhất là đọc từ output (stdout, stderr) của
container. Vậy nên best practice của mọi docker container là log ra stdout/stderr chứ không phải là file log như mặc
định như chúng ta có. Laravel có sẵn một log driver `stderr` để support trường hợp này. Vậy nên hãy set biến môi trường:

```sh
LOG_STACK=stderr
```

Cũng với lí do tương tự như trên, chúng ta cũng sẽ không thể dùng session driver mặc định là `file` mà phải dùng những
driver có thể được chia sẻ với nhiều server như Redis

```sh
SESSION_DRIVER=redis
```

### Maintenance mode

Có vẻ ít ai quan tâm đến cái này nhưng mà cũng tương tự như trên, maintenance mode (`php artisan down`) sẽ ghi một file
vào `storage` để check xem app có đang được maintain hay không. Vậy nên tính năng này mặc định cũng không thể sử dụng
được trừ khi bạn chỉ chạy một container duy nhất.