Docker là một công cụ quen thuộc và phổ biến đối với những Developer. Docker giúp chúng ta dựng môi trường phát triển một cách nhanh chóng, thuận tiện và độc lập với môi trường thật, tránh được những xung đột không đáng có. Chính vì những lợi ích trên, nên docker đang được sử dụng ngày càng rộng rãi. Trong bài viết này, mình sẽ hướng dẫn các bạn cách docker hóa một ứng dụng Laravel, hy vọng bài viết này sẽ giúp các bạn hình thành được mindset phải làm những gì khi muốn docker hóa một ứng dụng nào đó. Let's go!!!

**1. Chuẩn bị**

- Hệ điều hành mình đang sử dụng  là: Ubuntu 18.04.
- Máy tính cần cài đặt docker và docker-compose.
- Kiến thức cơ bản về docker, docker-compose và dockerfile.
- Source code laravel, các bạn có thể clone tại đây: https://github.com/laravel/laravel
- Cấu trúc thư mục sẽ như sau:

![](https://images.viblo.asia/90fd4bf1-2535-4e19-a368-ae5e9ff9d1a3.png)

- Thư mục **.docker** là nơi lưu Dockerfile, data được mount từ container.
- Thư mục **src** là nơi lưu source code, và ở trong thư mục này sẽ có chứa sẵn source code Laravel, các bạn cần copy source code vào thư mục này.

**2. Dockerfile**

Trước khi tiến docker hóa một ứng dụng nào đó, chúng ta cần xác định xem ứng dụng đó cần những gì, cụ thể ở đây đối với một ứng dụng Laravel. Để có thể chạy được cần những thành phần sau:

- **Webserver**: Sử dụng Nginx.
- **Database**: Sử dụng MySQL.
- **PHP-FPM**: Trình biên dịch của PHP.

Sau khi xác định được những thành phần cần thiết, chúng ta sẽ lựa chọn image phù hợp hoặc tự custom image bằng cách sử dụng Dockerfile. 

**Đầu tiên webserver, cụ thể ở đây là Nginx:**

- Bởi vì đối với Nginx, mình sẽ cần custom lại một vài chỗ nên là sẽ không sử dụng trực tiếp image **Nginx** để build lên **Container**, mà mình sẽ tạo ra một **Dockerfile** để build lên image riêng dựa trên image **Nginx**.

 - Ở trong thư mục con **conf.d**, mình tạo một file là **default.conf**, đây là file sẽ config **Nginx** ở trong container, với nội dung như sau:

```rust
server {
    listen 80;
    index index.php index.html;
    server_name _;
    root /var/www/html/public;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass php-fpm:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}
```
- Tiếp theo mình tạo ra một Dockerfile ở trong thư mục .docker/nginx, với nội dung như sau:
```markdown
# Sử dụng image nginx:1.19-alpine
FROM nginx:1.19-alpine 

# Copy toàn bộ nội dung ở trong default.conf vào file default.conf trong container
ADD ./.docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Tạo thư mục /var/www/html
RUN mkdir -p /var/www/html
```

 **Tiếp theo, là PHP-FPM**

 - Đối với PHP-FPM, mình sẽ tạo ra một Dockerfile ở trong thư mục .docker/php-fpm với nội dung như sau:

 ```
 # Sử dụng image php:8.0-fpm-alpine
 FROM php:8.0-fpm-alpine

LABEL maintainer="DucLS <ducls.coder@gmail.com>"

ARG DEBIAN_FRONTEND=noninteractive

# Cài đặt những thư viện cần thiết
RUN docker-php-ext-install \
  bcmath \
  pdo_mysql

# Tạo thư mục /var/www/html
RUN mkdir -p /var/www/html

# Copy toàn bộ file trong thư mục ./src ở máy local vào trong thư mục /var/www/html ở trong container
COPY ./src /var/www/html
 ```

 - Tại sao mình lại sử dụng image php:8.0-fpm-alpine và tại sao mình lại cài đặt những thư viện trên?
 - Bởi vì, đối với một ứng dụng Laravel sẽ yêu cầu hệ thống cần có những thư viện sau:

 ![](https://images.viblo.asia/5cd963c0-3140-4f5f-9477-e3719aa56ca0.png)

- Vậy làm sao để xác định xem những thư viện nào cần cài trong quá trình build image? Mình đọc Dockerfile trên Dockerhub:  https://hub.docker.com//php ,  cụ thể ở đây mình đọc Dockerfile của image **php:8.0-fpm-alpine**: https://sal.vn/qveeZh . Và thấy 2 thư viện chưa được cài là bcmath và pdo_mysql. Đối với những ứng dụng khác các bạn có thể áp dụng thử cách này để cài đặt những thư viện cần thiết trong quá trinh build image.

**Đối với Mysql, thì mình sử dụng trực tiếp image từ Dockerhub, nên sẽ không cần tạo Dockerfile.**

Ngoài 3 thành phần chính trên, mình sẽ sử dụng thêm một container khác, và đặt tên là **Workspace**, với container này mình sẽ cài đặt Composer, Git, Nano, Vim,... Và mình sẽ thao tác với app Laravel thông qua container này.

**Workspace**

- Mình sẽ tạo ra Dockerfile ở trong thư mục .docker/workspace, với nội dung như sau:

```shell
FROM composer:2.0

FROM php:8.0

LABEL maintainer="DucLS <ducls.coder@gmail.com>"

ARG DEBIAN_FRONTEND=noninteractive

# Cài đăt composer
COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install -y \
  software-properties-common locales

# Cài đặt các tool cần thiết
RUN apt-get update && apt-get install -y \
  git \
  curl \
  vim \
  nano \
  net-tools \
  pkg-config \
  iputils-ping \
  apt-utils \
  zip \
  unzip

# Cài đặt các thư viện cần thiết
RUN docker-php-ext-install \
  bcmath \
  pdo_mysql

# Cài đặt nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash

RUN apt-get install -y nodejs

#Tạo thư mục /var/www/html
RUN mkdir -p /var/www/html

#Copy toàn bộ source code ở folder ./src ở local vào thư mục /var/www/html trong container
COPY ./src /var/www/html
```

**3. Docker-compose**

Sau khi đã chuẩn bị Dockerfile cho các thành phần cần thiết, mình tiến hành build và run multi-container bằng cách sử dụng docker-compose. MÌnh tạo 1 file **docker-compose.yml** với nội dung như sau:

```python

version: "3.0"

services:
  webserver:
    build:
      context: .
      dockerfile: .docker/nginx/Dockerfile
    container_name: laravel_nginx
    volumes:
      - ./src:/var/www/html
      - .docker/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf
      - .docker/data/logs/nginx:/var/log/nginx
    ports:
      - 8080:80
    depends_on: 
      - mysql
      - php-fpm

  php-fpm:
    build:
      context: .
      dockerfile: .docker/php-fpm/Dockerfile
    container_name: laravel_php-fpm
    volumes:
      - ./src:/var/www/html

  mysql:
    image: mysql:8.0
    container_name: laravel_mysql
    volumes:
      - .docker/data/db:/var/lib/mysql
    environment:
      MYSQL_DATABASE: demo
      MYSQL_ROOT_PASSWORD: root

  workspace:
    build:
      context: .
      dockerfile: .docker/workspace/Dockerfile
    container_name: laravel_workspace
    volumes:
      - ./src:/var/www/html
    working_dir: /var/www/html
    tty: true

```

- Để duy trì data trong container không bị mất khi tắt container, thì mình sẽ sử dụng volumes, để mount trực tiếp data trong container ra ngoài máy local, và source code thay đổi ở ngoài local cũng sẽ thay đổi trong container.
- Vậy các service trên sẽ nói chuyện với nhau như thế nào?
- **Nginx** nói chuyện với **PHP-FPM** thông qua port 9000, ở image **php:8.0-fpm-alpine** đã mở sẵn port 9000, nên mình không cần sử dụng **expose** trong docker-compose ở service php-fpm nữa. Và container chạy php-fpm mình có đặt tên service là **php-fpm**, chính vì vậy nội dung file **default.conf** ở trong thư mục **.docker/nginx/conf.d** là:

```rust

server {
    listen 80;
    index index.php index.html;
    server_name _;
    root /var/www/html/public;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass php-fpm:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}

```

- Ở dòng **fastcgi_pass php-fpm:9000** để chỉ rõ **Nginx** sẽ giao tiếp với **PHP-FPM** thông qua port 9000 ở trong **Docker**. Nếu như các bạn không muốn đặt tên service chạy container php-fpm như mình, thì các bạn phải sửa lại dòng **fastcgi_pass**, ví dụ như mình đăt tên service là **fpm**, thì mình sẽ phải sửa lại là: **fastcgi_pass fpm:9000**.

Ngoài docker-compose.yml, mình sẽ tạo một file là **.dockerignore**, nhưng thư mục trong file này sẽ được bỏ qua trong quá trình build và run docker, file này có nội dung như sau:

```css
.docker/data/
```

**4. Docker-compose up**

Sau khi đã build xong file **docker-compose.yml**, thì mình sẽ tiến hành build các container bằng command: **docker-compose build**

Sau khi build xong, mình sẽ khởi chạy container bằng command: **docker-compose up**

Sau khi khởi chạy thành công, các bạn cần làm các bước sau:

- Copy nôi dụng file .env.example sang file .env: **cp .env.example .env**.
- Config file .env với nội dung sau:
```shell

APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
# Bởi vì container chạy MySql mình đặt tên là laravel_mysql
DB_HOST=laravel_mysql

# Port 3306 đã được mở sẵn trong container 
DB_PORT=3306

# Tên DB mình config trong docker-compose
DB_DATABASE=demo
DB_USERNAME=root
DB_PASSWORD=root

BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

```
- Chạy composer để cài đặt các thư viện cần thiết: **docker container exec laravel_workspace composer install**
- Tiếp theo để generate key cho app Laravel, chạy câu lệnh sau: **docker container exec laravel_workspace php artisan key:generate**
- Sau đó migrate database bằng cách: **docker container exec laravel_workspace php artisan migrate**
- Và cuối cùng là cấp quyền cho thư mục storage: **chmod -R 777 ./src/storage**

Sau khi làm các bước trên, dùng trình duyệt vào **localhost:8080**, và xem kết quả:

![](https://images.viblo.asia/3d020dc9-7d54-4e1f-93b3-c22155440c23.png)

Vậy là đã docker hóa xong một ứng dụng Laravel :100:. Thay đổi source code ở máy local, thì source code ở trong container cũng thay đổi theo, nên là các bạn không cần khởi tạo lại container mỗi lần thay đổi source code nữa nhé. Ví dụ:

![](https://images.viblo.asia/b4703b1b-8b6f-43c7-bdfb-5a32429b77ed.png)

**5. Lời kết**

Hy vọng bài viết này sẽ giúp các bạn có một mindset về docker hóa một ứng dụng nào đó. Khi bắt đầu có thể gặp rất nhiều lỗi, hy vọng các bạn đừng bỏ cuộc mà hãy sử dụng Google và Stackoverflow để tìm giải pháp. Chúc các bạn thành công! :muscle::muscle::muscle: