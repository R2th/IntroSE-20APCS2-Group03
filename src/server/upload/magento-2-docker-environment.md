Với một nền tảng tương đối lớn như Magento, việc cài đặt để nó chạy thôi cũng khá mất công, vì kiến trúc của nó yêu cầu khá nhiều các thành phần, config liên quan. Vì vậy, với một team phát triển thì việc sử dụng docker trong trường hợp này có thể nói khá là "perfect choice", kiểu như "one click install" vậy : D Chỉ mất thời gian config docker lúc ban đầu, sau đó mọi người trong team hay kể cả member mới sau này có thể dễ dàng dựng môi trường phát triển, cũng như đảm bảo môi trường dev giữa các thành viên không quá khác biệt, tránh phát sinh các bug không đáng có liên quan đến "máy của em".

Trong bài viết này, chúng ta sẽ tìm hiểu về công việc config docker lúc ban đầu nó như thế nào : D

## Get Magento 2 source code
Có 2 cách để lấy về source code của Magento 2, ở đây là Magento Commerce version đó là:
- Download file zip từ trang [www.magento.com](http://magento.com/), lưu ý là bạn phải có tài khoản để download bản Commerce (bản dành cho doanh nghiệp, mất phí), sau đó unzip vào thư mục:
  ```bash
  unzip -d magento-ee Magento-EE-2.3.4-2020-01-22-11-32-19.zip
  ```
- Sử dụng `composer` để tạo project:
  ```bash
   composer create-project --repository-url=https://repo.magento.com/ magento/project-enterprise-edition magento-ee
  ```
  Khi chạy command, nó sẽ yêu cầu bạn nhập username và password để có thể download bản Commerce, tham khảo [hướng dẫn lấy authentication keys](https://devdocs.magento.com/guides/v2.3/install-gde/prereq/connect-auth.html).

  Sau đấy, bạn có thể lưu các keys này vào file `auth.json` để mỗi khi dùng `composer update` hay `composer require` bạn không phải nhập lại nữa, đã có file mẫu `auth.json.sample`:
  ```bash
  cd magento-ee
  cp auth.json.sample auth.json
  ```
  Tất nhiên bạn cũng nên cho file `auth.json` vào file `.gitignore` để tránh commit file này lên remote repository.

Sau khi đã lấy được source code, việc đầu tiên nên làm đó là add luôn vào git để quản lý và theo dõi các thay đổi:
```bash
cd magento-ee
git init
git add .
git commit -m 'Init magento commerce 2.3.4'
```
Vì trong source code lấy về đã có sẵn file `.gitignore` nên bạn không phải lo git add cả những file thừa.

## System requirements
Về hệ điều hành, tất nhiên đó là Linux (chẳng hạn các distro như RedHat Enterprise Linux (RHEL), CentOS, Ubuntu, Debian,...) và theo [docs của Magento](https://devdocs.magento.com/guides/v2.3/install-gde/system-requirements-tech.html) là họ không đảm bảo việc chạy Magento trên các hệ điều hành Windows hay MacOS. Hệ điều hành nên được cài sẵn các tools:
```
bash
gzip
lsof
mysql
mysqldump
nice
php
sed
tar
```

Về bộ nhớ RAM, Magento khuyên dùng đó là > 2GB, sở dĩ nó cần nhiều bộ nhớ như vậy chủ yếu là do quá trình upgrade Magento hay extensions, còn riêng về PHP memory limit chỉ cần < 1GB là đủ để chạy website rồi.

Web servers có thể là Apache hoặc Nginx. Magento recommend sử dụng [Nginx và PHP-FPM](https://devdocs.magento.com/guides/v2.3/performance-best-practices/software.html) để được hiệu năng tốt hơn, vì thế ở đây chúng ta cũng sẽ dùng Nginx.

Database sẽ là MySQL 5.7.

[PHP version](https://www.php.net/supported-versions) 7.2 hoặc 7.3 (recommend) và các extensions:
```
ext-bcmath
ext-ctype
ext-curl
ext-dom
ext-gd
ext-hash
ext-iconv
ext-intl
ext-mbstring
ext-openssl
ext-pdo_mysql
ext-simplexml
ext-soap
ext-xsl
ext-zip
ext-sockets
lib-libxml
```

PHP OPcache nên được enable và các [PHP settings](https://devdocs.magento.com/guides/v2.3/install-gde/prereq/php-settings.html):
- Timezone: https://www.php.net/manual/en/timezones.php
- PHP memory limit: khi chạy ở môi trường production có thể để limit là 1GB, còn ở môi trường dev cần phải upgrade magento hay extensions hoặc chạy unit test thì có thể để là 2 - 3GB.
- Thiết lập [`opcache.save_comments`](https://www.php.net/manual/en/opcache.configuration.php#ini.opcache.save-comments) do Magento 2 sử dụng PHP code comments để generate code.
```
date.timezone = Asia/Ho_Chi_Minh
memory_limit = 2G
opcache.save_comments = 1
```

Magento 2 sử dụng nhiều đến cookie, do đó ở môi trường dev cũng nên sử dụng domain để support cookie tốt hơn so với localhost hay 127.0.0.1. Ngoài ra HTTPS cũng là yêu cầu thiết yếu khi go live, do đó chúng ta cũng setup HTTPS cho môi trường dev luôn.

Mail server cũng cần thiết khi dev, ở đây chúng ta sẽ sử dụng [Mailhog](https://github.com/mailhog/MailHog/) để tạo SMTP server dev.

Redis cũng recommend được sử dụng cho page caching và sessions, để đảm bảo khả năng scale hay dùng load balancer, recommend Redis 5.0.

Tương tự Varnish cũng không thể thiếu khi go live, do đó chúng ta cũng thiết lập để chạy Varnish 6.2.

## Xây dựng docker environment
Về cơ bản chúng ta xây dựng các docker containers như sau:

<div align="center">
    <img src="https://images.viblo.asia/3f6440d0-628f-4459-808b-7404a2759e41.png">
</div>

Sử dụng `docker-compose`, mỗi container được mô tả bằng một `service`:
```yaml:docker-compose.yml
version: '3'

services:
  php:
    #...
  nginx:
    #...
  mysql:
    #...
  redis:
    #...
  mail-server:
    #...
  varnish:
    #...
```

### PHP FPM
Đầu tiên là container cho PHP-FPM. Do yêu cầu cần nhiều extensions, nên sẽ không có image có sẵn nên chúng ta sẽ tạo mới image bằng Dockerfile. Image nổi bật thường dùng cho PHP-FPM đó là [`php:7.3-fpm`](https://hub.docker.com/_/php/). Trong quá trình tạo Dockerfile, chúng ta có thể sử dụng image để tạo container và chạy thử cách lệnh trực tiếp cài đặt trực tiếp:
```bash
docker run -it --name php73fpm php:7.3-fpm bash
```
Ngoài việc cài các PHP extensions, chúng ta sẽ cài thêm một số công cụ vì đây là container thường được sử dụng để tương tác với Magento thông qua lệnh `php bin/magento` như `git`, `vim`, `cron` để chạy Magento cron hay `composer` (cần thêm `unzip`)...
```Dockerfile
FROM php:7.3-fpm

RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libicu-dev \
    libxml2-dev \
    libxslt-dev \
    libzip-dev \
    git vim unzip cron \
    --no-install-recommends \
    && rm -r /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-jpeg-dir=/usr/lib \
    --with-freetype-dir=/usr/include/freetype2 \
    && docker-php-ext-install -j$(nproc) gd

RUN docker-php-ext-configure intl \
    && docker-php-ext-install -j$(nproc) intl

RUN docker-php-ext-install -j$(nproc) opcache bcmath pdo_mysql soap xsl zip sockets

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Create user magento
RUN useradd -m -s /bin/bash magento \
    && usermod -a -G www-data magento

RUN cp "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

ADD ./php-custom.ini $PHP_INI_DIR/conf.d/

CMD ["php-fpm"]

EXPOSE 9000
```

Chú thích các package:

- `libfreetype6-dev`, `libjpeg62-turbo-dev`, `libpng-dev` cần dùng để cài extension `gd`.
- `libicu-dev` cần dùng cho extension `intl`
- `libxml2-dev` dùng cho extension `soap`
- `libxslt-dev` dùng cho extension `xsl`
- Và `libzip-dev` dùng cho extension `zip`

Sau khi cài xong các package trong hệ thống, chúng ta xóa cache của `apt-get` để giảm kích thước của image.

Một user mới là `magento` được tạo trong hệ thống, user này là user để chúng ta thực hiện lệnh `php bin/magento` nhằm đảm bảo file permissions không bị conflict giữa web server user `wwww-data` và cli user `magento`, bằng cách thêm user `magento` vào group `www-data`, sau đó thiết lập quyền ghi cho group `www-data`. Chi tiết, bạn có thể tham khảo thêm https://devdocs.magento.com/guides/v2.3/install-gde/prereq/file-system-perms.html#perms-private

> Bạn có tìm hiểu thêm về bit `s` hay `setgid` trong chmod, cụ thể ở đây command:
> 
> `find var generated vendor pub/static pub/media app/etc -type d -exec chmod g+ws {} +`
>  
> Mục đích của Magento là muốn các file hay folder được tạo mới trong các thư mục `var`, `generated`, `vendor`, `pub/static` `pub/media` và `app/etc` sẽ luôn thuộc group của folder cha, cho dù user tạo file hay folder đó có thuộc group gì đi chăng nữa.
> Ở đây là group của user chạy web server `www-data` ở bước chạy lệnh `chown -R :www-data .` hay `chgrp -R www-data .`

Sau đó là tạo file `php.ini` mặc định từ file example `php.ini-development` và add một số setting khác bằng file `php-custom.ini`:
```ini
date.timezone=Asia/Ho_Chi_Minh
opcache.save_comments = 1

; Maximum amount of memory a script may consume (128MB)
; http://php.net/memory-limit
memory_limit = 2G

; Maximum allowed size for uploaded files.
; http://php.net/upload-max-filesize
upload_max_filesize = 50M

; Sets max size of post data allowed.
; http://php.net/post-max-size
post_max_size = 60M

max_execution_time = 18000
```

Mặc định, container chạy ở cổng 9000, do đó các container khác, cụ thể là nginx có thể kết nối vào địa chỉ: `php:9000`.

Ta có docker-compose service đầu tiên:
```yaml
version: "3"

services:
    php:
        build:
            context: ./dev/docker/images/php
        restart: always
        working_dir: /var/www/html/magento
        volumes:
            - ./:/var/www/html/magento
        expose:
            - "9000"
```

### Nginx
Tiếp theo là container cho web server Nginx, có nhiệm vụ giao tiếp với PHP-FPM và trả về response cho client. Với service này, để tận dụng khả năng dùng lại các image có sẵn và giảm bớt việc phải build image, nên chúng ta không cần sử dụng custom Dockerfile, ở đây chỉ cần sử dụng image [`nginx`](https://hub.docker.com/_/nginx) và thực hiện mount file config:
```yaml
services:
    php:
        #...
    nginx:
        restart: always
        image: nginx:latest
        working_dir: /var/www/html/magento
        volumes:
            - ./:/var/www/html/magento
            - ./dev/docker/images/nginx/magento.conf:/etc/nginx/conf.d/default.conf
        expose:
            - "80"
```
File `magento.conf` chỉ ngắn gọn như thế này vì Magento đã cung cấp sẵn 1 file sample:
```conf
upstream fastcgi_backend {
    server php:9000;
}

server {
    listen 80;
    server_name _;
    set $MAGE_ROOT /var/www/html/magento;
    set $MAGE_DEBUG_SHOW_ARGS 1;
    include /var/www/html/magento/nginx.conf.sample;
}
```

Lưu ý đến đường dẫn `/var/www/html/magento`. Và trong file `nginx.conf.sample` có một đoạn set document root:
```conf
root $MAGE_ROOT/pub;
```

### MySQL
Tương tự, chúng ta cũng có thể dùng image [`mysql`](https://hub.docker.com/_/mysql) trực tiếp và tạo user, db qua init SQL file mà không cần custom image:
```yaml
services:
    php:
        #...
    nginx:
        #...
    mysql:
        restart: always
        image: mysql:5.7
        command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
        volumes:
            - ./dev/docker/images/mysql/initdb:/docker-entrypoint-initdb.d
            - ./dev/docker/data/mysql:/var/lib/mysql
        environment:
            MYSQL_ROOT_PASSWORD: root
        expose:
            - "3306"
```
File init SQL: tạo database user và database dùng cho Magento
```sql
# Create Databases
CREATE DATABASE IF NOT EXISTS `magento_db`;

# Create user and grant rights
FLUSH PRIVILEGES;
CREATE USER 'magento'@'%' IDENTIFIED BY 'secret';
GRANT ALL ON magento_db.* TO 'magento'@'%';
```
Bạn có thể publish port `3306` để kết nối với MySQL ở host machine (bằng MySQL Workbench, Phpmyadmin,...) hoặc dùng container adminer:
```yaml
services:
    php:
        #...
    nginx:
        #...
    mysql:
        #
    adminer:
        restart: always
        image: adminer
        volumes:
            - ./dev/docker/images/adminer/php-custom.ini:/usr/local/etc/php/conf.d/php-custom.ini
        expose:
            - "8080"
        ports:
            - "8088:8080"
        environment:
            ADMINER_DEFAULT_SERVER: mysql
            ADMINER_DESIGN: "pappu687"
```
File `php-custom.ini` mình setting tăng giới hạn file upload để import database, không cần cũng được:
```ini:php-custom.ini
; Maximum allowed size for uploaded files.
; http://php.net/upload-max-filesize
upload_max_filesize = 100M

; Sets max size of post data allowed.
; http://php.net/post-max-size
post_max_size = 120M
```
Giao diện web quản lý ở địa chị http://localhost:8088

Nếu là lần cài đặt Magento đầu tiên, chúng ta cần chạy command để cài đặt Magento, còn không thì chỉ cần import lại database cũ, nhằm đảm bảo database schema không bị thay đổi (do Magento có nhiều chức năng update qua giao diện web admin).

<div align="center">
    <img src="https://images.viblo.asia/5bfe575b-bfe4-4d4e-98c6-ea4e2b85c3d2.png">
</div>

Lệnh cài đặt cho lần đầu:
```bash
# Chạy lệnh trong container php fpm bằng user magento
docker-compose exec -u magento php bash

cd /var/www/html/magento

# Thiết lập lại permissions, trừ thư mục dev/docker vì đây là folder chứa config và data cho docker
find var generated vendor pub/static pub/media app/etc -type f -exec chmod g+w {} + \
    && find var generated vendor pub/static pub/media app/etc -type d -exec chmod g+ws {} + \
    && chown -R :www-data $(ls -Idev/docker)
# Cài đặt magento db
php bin/magento setup:install \
    --base-url=http://localhost:8011 \
    --db-host=mysql \
    --db-name=magento_db \
    --db-user=magento \
    --db-password=secret \
    --backend-frontname=admin_mn \
    --admin-firstname=admin \
    --admin-lastname=admin \
    --admin-email=admin@example.com \
    --admin-user=admin \
    --admin-password=admin123 \
    --language=en_US \
    --currency=USD \
    --timezone=America/Chicago \
    --use-rewrites=1
```
URL: http://localhost:8011 chính là url của web site, do hiện tại chưa có Varnish hay custom domain nên nó là Nginx, vậy nên cần publish port 8011 cho Nginx sau đó để có thể truy cập được website từ host machine.

Địa chỉ admin page: http://localhost:8011/admin_mn

Sau khi chạy lệnh trên Magento sẽ tạo ra 2 file config `app/etc/env.php` và `app/etc/config.php`. Theo như [docs](https://devdocs.magento.com/guides/v2.3/config-guide/config/config-php.html#config-php-overview), file `env.php` không được thêm vào git, còn `config.php` thì nên thêm. Do không được thêm vào git nên chúng ta dựa vào file `env.php` để tạo file example chung cho môi trường docker: `env.docker-dev-eample.php`.

### Redis
Docker config cho redis cũng khá đơn giản:
```yaml
version: "3"

services:
    php:
        #...
    nginx:
        #...
    mysql:
        #...
    redis:
        restart: always
        image: redis
        expose:
            - "6379"
```
Redis được dùng để lưu session và default cache (cũng có thể lưu cả full page cache - FPC). Sau khi chạy service redis, cần update lại file `env.php` để config sử dụng redis:
```php:app/etc/env.php
    'session' => [
        'save' => 'redis',
        'redis' => [
            'host' => 'redis',
            'port' => '6379',
            'password' => '',
            'timeout' => '2.5',
            'persistent_identifier' => '',
            'database' => '2',
            'compression_threshold' => '2048',
            'compression_library' => 'gzip',
            'log_level' => '3',
            'max_concurrency' => '6',
            'break_after_frontend' => '15',
            'break_after_adminhtml' => '30',
            'first_lifetime' => '600',
            'bot_first_lifetime' => '60',
            'bot_lifetime' => '7200',
            'disable_locking' => '0',
            'min_lifetime' => '60',
            'max_lifetime' => '2592000',
        ],
    ],
    'cache' => [
        'frontend' => [
            'default' => [
                'backend' => 'Cm_Cache_Backend_Redis',
                'backend_options' => [
                    'server' => 'redis',
                    'database' => '0',
                    'port' => '6379',
                ],
            ],
            'page_cache' => [
                'backend' => 'Cm_Cache_Backend_Redis',
                'backend_options' => [
                    'server' => 'redis',
                    'port' => '6379',
                    'database' => '1',
                    'compress_data' => '0',
                ],
            ],
        ],
    ],
```
Lưu ý, mỗi loại cache, session thì sẽ có database khác nhau, database 0 cho default cache, database 1 cho FPC và database 2 cho redis.
Config `page_cache` để tham chiếu vì chúng ta sẽ dùng Varnish nên config này sẽ bị bỏ qua.

Vào trang admin export file config của Varnish để tiếp tục setup Varnish cache.

Hoặc có thể dùng command để export:
```bash
docker-compose exec php bash
php bin/magento varnish:vcl:generate
```

### Varnish
Để lấy file config Varnish mặc định của Magento, chúng ta vào trang admin: http://localhost:8011/admin_mn và đến trang config theo menu: `Stores` => `Configuration` => `Advanced` => `System` => `Full Page Cache`

<div align="center">
    <img src="https://images.viblo.asia/cfe63201-c906-4e61-83b6-f428ae353df5.png">
</div>

Docker compose service:
```yaml
version: "3"

services:
    php:
        #...
    nginx:
        #...
    mysql:
        #...
    redis:
        #...
    varnish:
        restart: always
        image: varnish:6
        volumes:
            - ./dev/docker/images/varnish/default.vcl:/etc/varnish/default.vcl
        expose:
            - "80"
        ports:
            - "8011:80"
```
Vì đã config dùng Varnish nên nginx server giờ đây không cần publish port 8011 nữa mà sẽ để cho Varnish cache làm nhiệm vụ này.

Lưu ý trong file export `default.vcl` có đoạn:
```vcl
backend default {
    .host = "nginx";
    .port = "80";
    .first_byte_timeout = 600s;
    .probe = {
        .url = "/health_check.php";
        ...
   }
}
```
Chú ý url để check health là `/health_check.php` chứ không phải `/pub/health_check.php` do ở phần setting nginx trước, document root đang là `root $MAGE_ROOT/pub;`

### Mail server
Mail server có nhiệm vụ catch tất cả email được gửi trong môi trường dev, để đảm bảo không gửi nhầm email đến địa chỉ thật. Ở đây chúng ta dùng `Mailhog`, nó cung cấp SMTP server để gửi mail và một giao diện web ui để đọc các email đã gửi:
```yaml
version: "3"

services:
    php:
        #...
    nginx:
        #...
    mysql:
        #...
    varnish:
        #...
    redis:
        #...
    mail-server:
        restart: always
        image: mailhog/mailhog
        user: root # Needed if using maildir
        environment:
            MH_STORAGE: maildir
            MH_MAILDIR_PATH: /var/data/mailhog
        volumes:
            - ./dev/docker/data/mailhog:/var/data/mailhog
        expose:
            - "1025" # SMTP Server to send mail
            - "8025" # HTTP Server to check mail
        ports:
            - "8022:8025"
```
Cần phải cài thêm extension để Magento có thể sử dụng SMTP server, phần này tùy vào khách hàng nên các bạn có thể tự tìm Magento SMTP module.

Mail box ui ở địa chỉ: http://localhost:8022

Như vậy là chúng ta đã thiết lập xong các container image. Tổng kết lại chúng ta đã thêm những file sau:
```
.
├── app
│   ├── ...
├── dev
│   ├── docker
│   │   ├── env.docker-example.php
│   │   ├── docker-compose.dev.yml
│   │   └── images
│   │       ├── adminer
│   │       │   └── php-custom.ini
│   │       ├── mysql
│   │       │   └── initdb
│   │       │       └── 01-create-db.sql
│   │       ├── nginx
│   │       │   └── magento.conf
│   │       ├── php
│   │       │   ├── Dockerfile
│   │       │   └── php-custom.ini
│   │       └── varnish
│   │           └── default.vcl
```
Sau khi đã dựng xong phần setup ban đầu, các thành viên khác trong team chỉ cần pull code về và copy các file config:
```
cp dev/docker/env.docker-example.php app/etc/env.php
cp dev/docker/docker-compose.dev.yml docker-compose.xml
```
Docker compose up và sau đó import database.

## Custom domain và HTTPS
Về custom domain cho service trong Docker có nhiều cách, nhưng hôm nay mình giới thiệu cho các bạn cách đơn giản nhất đó là sử dụng Nginx hoặc Apache ở host machine để tạo reverse proxy đến địa chỉ `http://127.0.0.1:8011`.

Luồng hoạt động như thế này:

<div align="center">
    <img src="https://images.viblo.asia/3b804ac8-287b-4d8d-96a6-9f402a81b144.png">
</div>

> Ơ nhưng dùng docker rồi vẫn phải cài thêm Apache hay Nginx ở máy thật sao?? =))

Về HTTPS, chúng ta sử dụng tool [`mkcert`](https://github.com/FiloSottile/mkcert) để tạo chứng chỉ SSL hợp lệ cho localhost:
```bash
╭─ ubuntu ~/Projects/magento-ee  ‹master*› 
╰─ $ mkcert -install
Using the local CA at "/home/ubuntu/.local/share/mkcert" ✨

╭─ ubuntu ~/Projects/magento-ee  ‹master*› 
╰─ $ mkcert magento2.test
Using the local CA at "/home/ubuntu/.local/share/mkcert" ✨

Created a new certificate valid for the following names 📜
 - "magento2.test"

The certificate is at "./magento2.test.pem" and the key at "./magento2.test-key.pem" ✅
```
Lệnh trên generate ra 2 file: `magento2.test-key.pem` và `magento2.test.pem` sẵn sàng để dùng cho Apache hay Nginx.

Các lệnh và config bên dưới dùng cho Ubuntu, nếu bạn dùng distro khác thì chú ý nhé.

Với Apache, việc đầu tiên là enable proxy http module:
```bash
sudo a2enmod proxy_http
```

Sau đó thêm virtualhost, có thể thiết lập HTTPS only hoặc cả 2:
```apache
<VirtualHost *:80>
    ProxyPreserveHost On
    ServerName magento2.test
    ProxyPass / http://127.0.0.1:8011/
    ProxyPassReverse / http://127.0.0.1:8011/
</VirtualHost>

<VirtualHost *:443>
    SSLEngine On
    ProxyPreserveHost On
    ProxyRequests Off
    ServerName magento2.test

    SSLCertificateFile /usr/local/share/ssl/magento2.test.pem
    SSLCertificateKeyFile /usr/local/share/ssl/magento2.test-key.pem

    ProxyPass / http://127.0.0.1:8011/
    ProxyPassReverse / http://127.0.0.1:8011/
    RequestHeader set X-Forwarded-Proto "https"
</VirtualHost>
```

Restart apache:
```bash
sudo systemctl restart apache2.service
```

Với Nginx:
```nginx
server {
    listen 80;
    listen [::]:80;
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name magento2.test;

    ssl_certificate /usr/local/share/ssl/magento2.test.pem;
    ssl_certificate_key /usr/local/share/ssl/magento2.test-key.pem;

    location / {
        proxy_pass http://127.0.0.1:8011/;
        include /etc/nginx/proxy_params;
    }
}
```

Restart nginx:
```bash
sudo systemctl restart nginx.service
```

Tiếp theo là thêm domain vào `/etc/hosts`:
```conf
127.0.0.1 magento2.test
```

Bước cuối cùng là update magento base url, từ http://localhost:8011 sang https://magento2.test:
```bash
php bin/magento config:set web/unsecure/base_url http://magento2.test/
php bin/magento config:set web/secure/base_url https://magento2.test/
php bin/magento config:set web/secure/use_in_frontend 1
php bin/magento config:set web/secure/use_in_adminhtml 1
php bin/magento cache:flush
```

Vậy là đã xong. Hẹn gặp lại các bạn trong các bài tiếp theo của series : D

<div align="center">
    <img src="https://images.viblo.asia/9c51978b-bdaf-4dd0-ab49-97d3f8eef510.png">
</div>

Trên đây là công việc mình config docker lúc ban đầu, bạn nào muốn sử dụng luôn thì xem hướng dẫn ở Github nhé: https://github.com/tuanpht/magento2-docker