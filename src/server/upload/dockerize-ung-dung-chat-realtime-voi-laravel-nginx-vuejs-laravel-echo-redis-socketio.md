Xin chào các bạn đã quay trở lại với series [Học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình.

Chúc mọi người một mùa giáng sinh an lành ấm áp :heart_eyes::heart_eyes:

Mấy ngày vừa rồi tinh thần viết blog đang lên cao thì đôi mắt mình lại đình công sau 1 khoảng thời gian ngồi máy tính quá nhiều, hôm nay "cửa sổ tâm hồn" có vẻ tốt trở lại thì mình lại chầm chậm viết blog tiếp cho mọi người ;)
> Dù làm gì cũng phải nhớ giữ sức khoẻ nhé mọi người, Tết nhất đến nơi rồi phải có sức khoẻ để còn đi làm lấy tiền đưa về biếu thầy bu :rofl::rofl:

Ở bài trước mình đã hướng dẫn các bạn các [Dockerize ứng dụng NodeJS](https://viblo.asia/p/dockerize-project-nodejs-mongodb-redis-passport-4P856NXW5Y3) với mysql, redis,... cùng với đó là các setup cho môi trường dev và production.

Ở bài này chúng ta sẽ chơi "hardcore" hơn bằng cách Dockerize ứng dụng Chat realtime với Laravel, VueJS, Laravel Echo, SocketIO, Redis cùng với đó là setup Laravel Horizon và Laravel Schedule Task nhé.

> Sorry các bạn vì tên bài này mình để hơi dài, mục đích để khi đọc qua tiêu đề các bạn sẽ rõ hơn đồng thời cho những anh em search từ google thì cũng sẽ dễ tìm hơn nhé.

# Tiền Setup
Vẫn như thường lệ các bạn cần phải cài đặt Docker và Docker-compose, nếu các bạn chưa làm thì xem ở [bài đầu tiên](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n#_setup-docker-va-docker-compose-14) của mình nhé
# Setup
Các bạn clone source code [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) nhé (nhánh **master**)

Ở bài này chúng ta sẽ chỉ quan tâm tới folder **docker-laravel-realtime-chat-app** nhé.
# Tổng quan ứng dụng
Ứng dụng này đã được mình làm và deploy chạy production [ở đây](https://realtime-chat.jamesisme.com) các bạn có thể vào và dùng thử

Tổng quan:
- Ứng dụng có các phòng chat để user có thể join vào
- Mỗi phòng chat sẽ có 1 hộp (box) chat chung, tất cả user trong phòng có thể nhắn tin vào đây
- Cùng với đó là danh sách user có ở trong phòng chat, click chọn vào 1 user bất kì để nhắn tin riêng vơi người đó
- Cứ mỗi 1 phút sẽ tự động xuất hiện tin nhắn chào mừng của Bot (dùng **Laravel Schedule Task**)
- Detect user đang gõ, hay đã xem tin nhắn,...
- Các bạn có thể chọn biểu cảm tin nhắn như Facebook Messager: Love, Haha, Wow,..... ;)

# Lắc não trước khi sử dụng
Trước khi chúng ta đi vào cấu hình Dockerfile thì đầu tiên ta sẽ cùng "lắc não" để phân tích xem project này có những service nào, cần Dockerfile cho những gì nhé các bạn ;)

- Tương tự như bài [Dockerize ứng dụng Laravel](https://viblo.asia/p/dockerize-ung-dung-laravel-vyDZOao75wj), để chạy project cơ bản tối thiểu là ta sẽ dùng 2 service **app** (có php-fpm) và service **webserver** ( dùng nginx)
- Có database để lưu trữ tin nhắn, danh sách user, phòng chat,... -> cần 1 service **db**
- Có queue job -> cần 1 service **redis**
- Có realtime với Laravel Echo, socketio -> cần 1 service **laravel-echo-server**
- Đồng thời ta cũng cần thêm một service **adminer** để quản trị cơ sở dữ liệu MySQL trông cho trực quan (cái này giống như kiểu phpmyadmin ấy nhé :))

Vậy tất cả thảy ta có **6 services** tương ứng với 6 container cần khởi tạo để chạy được ứng dụng.

Ở bài này ta sẽ viết Dockerfile cho 2 service là **app** và **laravel-echo-server**, các service còn lại ta dùng luôn image được cung cấp sẵn nhé
# Build Docker image
Ở bài này vì ta có khá nhiều service, nên toàn bộ phần setup + dữ liệu của Mysql, redis ta đều lưu ở một folder tên là **.docker** nhé

Ở gốc project (folder **docker-laravel-realtime-chat-app**, ở bài này mình nói luôn là gốc project nhé vì tên folder nó dài quá :-D :-D), các bạn tạo folder tên là **.docker** nhé.
## Cấu hình Dockerfile cho Laravel Echo Server
Đầu tiên ta sẽ tiến hành cấu hình Dockerfile và build image cho service **laravel-echo-server** nhé.

Ở folder **.docker** các bạn tạo 1 folder tên là **laravel-echo-server**

Service này đúng với tên gọi bên trên là Laravel Echo Server để xử lý phần broadcast từ Laravel đến trình duyệt

Về cơ bản service này khá đơn giản, viết bằng nodejs, service này gần như sẽ không hề thay đổi sau khi build, chúng ta sẽ ít động vào service này

Để chạy service viết bằng NodeJS trong môi trường Docker thì ta sẽ dùng PM2 nhé.

Ở trong folder **laravel-echo-server** các bạn tạo cho mình 1 file tên là **laravel-echo-server.json** với nội dung như sau nhé: (file này chính là cấu hình cho Laravel Echo Server)
```json
{
	"authHost": "http://localhost",
	"authEndpoint": "/broadcasting/auth",
	"clients": [],
	"database": "redis",
	"databaseConfig": {
		"redis": {},
		"sqlite": {
			"databasePath": "/database/laravel-echo-server.sqlite"
		}
	},
	"devMode": true,
	"host": null,
	"port": "6001",
	"protocol": "http",
	"socketio": {},
	"secureOptions": 67108864,
	"sslCertPath": "",
	"sslKeyPath": "",
	"sslCertChainPath": "",
	"sslPassphrase": "",
	"subscribers": {
		"http": true,
		"redis": true
	},
	"apiOriginAllow": {
		"allowCors": false,
		"allowOrigin": "",
		"allowMethods": "",
		"allowHeaders": ""
	}
}
```

Tiếp đó vì ta dùng PM2 để chạy service này nên ta sẽ tạo tiếp 1 file cấu hình cho PM2 nhé, vẫn ở folder **laravel-echo-server** các bạn tạo file **echo.json** với nội dung như sau:
```json
{
  "name": "laravel-echo-server-6001",
  "script": "laravel-echo-server",
  "args": "start"
}
```

Cuối cùng là ta tạo file **Dockerfile** để cấu hình cho image ta cần build nhé (vẫn ở thư mục **laravel-echo-server** nhé các bạn:
```shell:dockerfile
FROM node:13-alpine

WORKDIR /app

COPY echo.json /app/echo.json
COPY laravel-echo-server.json /app/laravel-echo-server.json

RUN npm install -g pm2 laravel-echo-server

EXPOSE 6001

CMD ["pm2-runtime", "echo.json"]
```
Sau khi cấu hình xong thư mục cấu hình cho **laravel echo server** của chúng ta trông sẽ như sau:

![VScode](https://images.viblo.asia/5f84e124-437f-4414-a5b4-2b0febb2fa0b.png)

Ổn rồi đó, nhưng ở bài này ta sẽ không build image ngay bằng command **docker build...** như thường lệ, mà lát nữa ta sẽ build với **docker-compose** nhé (như thế nào thì lát nữa ta sẽ thấy nhé :D)
> Note: Lí do ở trên mình EXPOSE port 6001 vì mình lát nữa từ bên service `webserver` sẽ cần forward request vào port 6001 của laravel echo server nhé. Chú ý là Map port và Expose Port chúng có ý nghĩa khác nhau, các bạn chú ý hiểu rõ nhé. Mình thấy nhiều bạn toàn EXPOSE "cho chắc" :rofl::rofl:

## Cấu hình cho service app
Tiếp theo là ta sẽ cấu hình cho service app, phần dưới này sẽ có khá nhiều thứ liên quan đến Linux, mình sẽ giải thích vào những thứ quan trọng còn lại những gì các bạn thắc mắc thì search google tiếp để hiểu thêm nhé

### Tiếp tục lắc não trước khi sử dụng
Như ở đầu bài mình có giới thiệu ở bài này ta sẽ có Laravel Horizon và Laravel Schedule Task. Do đó ở trong service **app** ta sẽ chạy các process (tiến trình như sau):
- PHP-FPM để chạy code PHP (process này là bắt buộc)
- Crontab cho Laravel Schedule Task (process này là optional)
- Laravel Horizon (process này cũng là optional)

> Ở trên mình có 2 process optional, tức là ta có thể dùng nó hoặc không, ứng dụng vẫn có thể chạy nếu không có 2 process đó, lát nữa cấu hình ta sẽ nói rõ nhé

Và ở Linux để chạy và quản lý nhiều process thì mình sẽ dùng một tool khá phổ biến tên là **supervisor** nhé.

Ta sẽ tạo các file cấu hình tương ứng với các process bên trên, sau đó **supervisor** sẽ đọc và khởi động các process đó lên.

### Cấu hình Supervisor
Ở folder **.docker** các bạn tạo cho mình 1 file tên là **supervisord.conf**, với nội dung như sau:
```php
[supervisord]
nodaemon=true ; chạy ở foreground

[include]
files = /etc/supervisor.d/*.conf ; load toàn bộ các file cấu hình cho các process ở đường dẫn này
```
Tiếp đó ở vẫn ở folder **.docker** các bạn tạo cho mình 1 folder tên là **supervisor.d**, folder này sẽ chứa các file các hình cho các process ta nói ở phần trên.

Trong folder **supervisor.d** các bạn tạo file **php-fpm.conf** với nội dung như sau:
```go
[program:php-fpm]
process_name=%(program_name)s
command=php-fpm -F ; chạy ở foreground
user=root ; chạy với user root
autostart=true
autorestart=true
numprocs=1 ; muốn chạy 1 lúc nhiều process này thì ta thay đổi numprocs (>=1)
redirect_stderr=false
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
```

Vẫn ở folder **supervisor.d** các bạn tạo file tên là **horizon.conf.default** với nội dung như sau:
```go
[program:horizon]
process_name=%(program_name)s
command=php /var/www/html/artisan horizon ; command này cũng sẽ chạy ở foreground
user=www-data
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/www/html/horizon.log
stopwaitsecs=3600
```
Cấu hình tương tự như process **php-fpm** chỉ có điều khác là process này sẽ được chạy dưới user có tên là **www-data**, user này sẽ được tạo sẵn từ **php-fpm** nhé. Lí do vì ta không cần đến hẳn quyền **root** để chạy command này, vì lát nữa toàn bộ code khi build image sẽ được chúng ta đặt quyền sở hữu cho user **www-data** (nhằm hạn chế quyền của user chạy project, chỉ cho user những quyền đủ để chạy)

Tiếp theo đó vẫn ở folder **supervisor.d** ta tạo tiếp 2 file **cron.conf.default**, và **worker.conf.default** với các nội dung như sau (mình đi nhanh không giải thích nữa nhé)

File **cron.conf.default**
```go
[program:cron-job]
process_name=%(program_name)s
command=crond -f
user=root           ; crond should be started as root at all times
autostart=true
autorestart=true
numprocs=1
redirect_stderr=false
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
```

**worker.conf.default**
```ruby
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/html/artisan queue:work --sleep=3 --tries=3 --daemon
user=www-data
autostart=true
autorestart=true
numprocs=2
redirect_stderr=true
```
Sau khi cấu hình xong xuôi thì folder **.docker** của chúng ta trông sẽ như sau:

![VSCode](https://images.viblo.asia/f91e7109-7600-422f-b660-994f68f9ead0.png)

Có thể các bạn sẽ thắc mắc:
- Tại sao chỉ có tên của process **php-fpm** là không có hậu tố **default**? Như ở trên mình đã nói, process **php-fpm** là bắt buộc để code PHP của chúng ta có thể chạy nên ta luôn luôn cần process, còn các process còn lại thì là optional (tuỳ chọn), không có chúng thì ứng dụng của ta vẫn chạy
- File **worker.conf.default** ở đâu ra vậy? có cần dùng nó hay không? Vì Laravel Horizon đã tự động tạo các workers cho chúng ta rồi nên nếu các bạn chạy Horizon thì sẽ không cần **worker.conf.default** nữa, nhưng nếu trong trường hợp các bạn không chạy Horizon thì ta cần tới file này để Queue Job có thể chạy được nhé

Ok cấu hình vậy là ổn rồi đó. Ta chuyển qua Dockerfile nhé :-D
### Cấu hình Dockerfile
Ở gốc project (folder **docker-laravel-realtime-chat-app**) các bạn tạo file **Dockerfile** với nội dung như sau:
```shell:dockerfile
# Set master image
FROM php:7.2-fpm-alpine

LABEL maintainer="Mai Trung Duc (maitrungduc1410@gmail.com)"

# Set working directory
WORKDIR /var/www/html

# Install Additional dependencies
RUN apk update && apk add --no-cache \
    build-base shadow supervisor \
    php7-common \
    php7-pdo \
    php7-pdo_mysql \
    php7-mysqli \
    php7-mcrypt \
    php7-mbstring \
    php7-xml \
    php7-openssl \
    php7-json \
    php7-phar \
    php7-zip \
    php7-gd \
    php7-dom \
    php7-session \
    php7-zlib

# Add and Enable PHP-PDO Extenstions for PHP connect Mysql
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-enable pdo_mysql

# This extension required for Laravel Horizon
RUN docker-php-ext-install pcntl

# Remove Cache
RUN rm -rf /var/cache/apk/*

COPY .docker/supervisord.conf /etc/supervisord.conf
COPY .docker/supervisor.d /etc/supervisor.d

# Use the default production configuration for PHP-FPM ($PHP_INI_DIR variable already set by the default image)
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Add UID '1000' to www-data
RUN usermod -u 1000 www-data

# Copy existing application directory
COPY . .

# Chang app directory permission
RUN chown -R www-data:www-data .

ENV ENABLE_CRONTAB 1
ENV ENABLE_HORIZON 1

ENTRYPOINT ["sh", "/var/www/html/.docker/docker-entrypoint.sh"]

CMD supervisord -n -c /etc/supervisord.conf
```

Giải thích một số chỗ có thể có thắc mắc nhé:
- Ta bắt đầu từ 1 image build sẵn của PHP-FPM mình lấy [ở đây](https://hub.docker.com/_/php)
- Bên dưới ta có tạo 2 biến môi trường **ENABLE_CRONTAB** và **ENABLE_HORIZON** để nói rõ là lát nữa ta sẽ dùng process crontab và horizon (như ở phần trước mình có nói là những process này optional có thể dùng hoặc không, ở đây ta dùng cả 2)
- Tiếp theo ta có **ENTRYPOINT**, trong đây là những sẽ up để ta có thể tuỳ chọn sử dụng các process như: crontab, horizon hay worker mà ta đã nói. Khi build image thì file **docker-entrypoint.sh** sẽ được chạy, trong đó có 1 số setup (file này ta sẽ tạo ở phía dưới)
- Cuối cùng là ta khởi động **supervisor** với **CMD** nhé

Những chỗ còn lại ở file Dockerfile các bạn có thể xem ở các bài trước mình đã giải thích nhé

### Cấu hình Entrypoint
Như ở trên mình đã nói ta sẽ dùng một file tên là **docker-entrypoint.sh** để thiết lập tuỳ chọn sử dụng các process như crontab, horizon hay worker, tuỳ vào biến môi trường ta đặt là gì.

Ở folder **.docker** các bạn tạo cho mình 1 file tên là **docker-entrypoint.sh** với nội dung như sau:
```shell
#!/bin/sh
set -e

# Enable Laravel schedule
if [[ "${ENABLE_CRONTAB:-0}" = "1" ]]; then
  mv -f /etc/supervisor.d/cron.conf.default /etc/supervisor.d/cron.conf
  echo "* * * * * php /var/www/html/artisan schedule:run >> /dev/null 2>&1" >> /etc/crontabs/www-data
fi

# Enable Laravel queue workers
if [[ "${ENABLE_WORKER:-0}" = "1" ]]; then
  mv -f /etc/supervisor.d/worker.conf.default /etc/supervisor.d/worker.conf
else
  rm -f /etc/supervisor.d/worker.conf.default
fi

# Enable Laravel horizon
if [[ "${ENABLE_HORIZON:-0}" = "1" ]]; then
  mv -f /etc/supervisor.d/horizon.conf.default /etc/supervisor.d/horizon.conf
else
  rm -f /etc/supervisor.d/horizon.conf.default
fi

exec "$@"
```
Nhìn vào file bên trên đã quá rõ rồi phải không nào, Tuỳ vào biến môi trường ta thiết lập mà ta có chọn dùng một process nào đó hay không

Nếu dùng thì đổi tên file của process bỏ hậu tố **default** đi là được, còn nếu không dùng thì ta xoá cả file cấu hình đi
### Cấu hình .dockerignore
Trước khi build image ta sẽ cấu hình **.dockerignore** để nói với Docker rằng "bỏ qua một số file đừng copy vào bên trong image khi build nhé" ;)

Ở gốc project (folder **docker-laravel-realtime-chat-app**) các bạn tạo file **.dockerignore** với nội dung như sau:
```shell
bootstrap/cache/*
storage/app/*
storage/framework/cache/*
storage/framework/sessions/*
storage/framework/views/*
storage/logs/*
node_modules
.git
.idea
.gitignore
.gitattributes
.sass-cache
*.env*
*.config.js
.dockerignore
Dockerfile
docker-compose.yml
.docker/*
!.docker/supervisor*
!.docker/php
!.docker/docker-entrypoint.sh
.vscode
.idea

README.md
.editorconfig
vendor
# ignore frontend built files
public/js/app.js
public/js/manifest.js
public/js/vendor.js
public/css/app.css
public/mix-manifest.json
./supervisord*
horizon.log
```
Nom khá giống với nội dung của **gitignore** phải không nào ;)

> Note: mặc dùng những folder như **node_modules** ta chưa có nhưng ta vẫn **ignore** vì lát nữa khi build VueJS sẽ cần **node_modules** và tương lai ta có thể build project này nhiều lần nữa, nên ta cứ thêm trước vào nhé ;)

Ok tất cả mọi thứ đã ổn cho service **app** rồi đó, nhưng ở đây ta vẫn không build image ngay mà lát nữa ta sẽ build với **docker-compose** nhé

# Cấu hình Nginx
Tương tự ở bài [Dockerize ứng dung Laravel](https://viblo.asia/p/dockerize-ung-dung-laravel-vyDZOao75wj#_cau-hinh-docker-compose-6) ta sẽ cần thiết lập cho webserver Nginx nhé.

Ở folder **.docker** các bạn tạo file **nginx.conf** với nội dung như sau:
```perl
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
        fastcgi_hide_header X-Powered-By;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
        gzip_static on;
    }

    location /socket.io {
        proxy_pass http://laravel_echo_server:6001;
        proxy_redirect     off;
        proxy_http_version 1.1;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Host $host;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header X-Real-Ip $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
Chú ý ở trên khi với code PHP thì ta sẽ redirect request vào cho service **app** để service app có PHP-FPM làm việc, còn với **socket.io** thì ta điều hướng công việc tới service **laravel-echo-server** nhé

# Tạo folder để mount volume
Tương tự như bài [Dockerize NodeJS với Mongo và Redis](https://viblo.asia/p/dockerize-project-nodejs-mongodb-redis-passport-4P856NXW5Y3) ở bài này ta sẽ tạo các folder để lưu lại data từ MySQL và Redis để khi project của tại khởi động lại thì mọi dữ liệu vẫn còn nguyên nhé.

Ở trong folder **.docker** các bạn tạo cho mình 1 folder tên là **data**, bên trong folder **data** các bạn tạo cho mình 2 folder tên là **db** (lưu dữ liệu cho MySQL) và **redis** nhé :)

Đến bước này thì folder **.docker** của chúng ta nom sẽ như sau:

![VSCODE](https://images.viblo.asia/1837b698-bf7b-4fae-861f-c3fdfea985c6.png)

# Chạy ứng dụng
## Cấu hình docker-compose
Để chạy ứng dụng này lên ta sẽ tạo file **docker-compose** với nội dung như sau nhé:
```yaml
version: '3.4'

services:

  #PHP Service
  app:
    build:
      context: .
      dockerfile: Dockerfile
    restart: unless-stopped
    working_dir: /var/www/html
    volumes:
      - ./:/var/www/html
    depends_on:
      - db
      - redis
      - laravel_echo_server

  #Nginx Service
  webserver:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "${APP_PORT}:80"
    volumes:
      - ./:/var/www/html
      - .docker/nginx.conf:/etc/nginx/conf.d/default.conf

  # DB UI management service
  adminer:
    image: adminer
    restart: unless-stopped
    ports:
      - ${ADMINER_PORT}:8080
    depends_on:
      - db

  #MySQL Service
  db:
    image: mysql:5.7.22
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_USER: ${DB_USERNAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: rootpass
    volumes:
      - .docker/data/db:/var/lib/mysql/

  laravel_echo_server:
    build:
      context: .docker/laravel-echo-server
      dockerfile: Dockerfile
    volumes:
      - .env:/app/.env
    restart: unless-stopped

  redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    restart: unless-stopped
```
Nội dung file bên trên thì cũng tương tự các bài trước phải không nào. Có 1 số chỗ mình giải thích để nếu có bạn nào thắc mắc nhé:
- Ở service **db** các thông tin ở **environment** sẽ được lấy từ các biến ở file **.env** (ta sẽ tạo ngay sau đây nhé)
- Tương tự ở service **laravel-echo-server** thì ta sẽ không dùng **environment** để thiết lập biến môi trường mà Laravel Echo Server sẽ đọc trực tiếp từ file **.env** (phần này được nói rõ ở [github của Laravel echo server](https://github.com/tlaverdure/laravel-echo-server#dotenv) nhé)
- Ở service **webserver** và **adminer** ở phần mapping port, ta có để giá trị của 2 biến môi trường lát nữa cũng được định nghĩa ở file **.env** nhé.
- Như trong bài mình đã nói service **app** và **laravel-echo-server** sẽ được build bằng **docker-compose** thì các bạn có thể thấy ta có trường **build** và nói rõ context (ngữ cảnh là ở đường dẫn nào)  cộng với Dockerfile tên là gì. Khi chạy app lên thì docker-compose sẽ tìm tới và build từng service cho ta nhé

## Tạo file .env
Tiếp theo ta sẽ tạo file **.env** nhé. Các bạn tạo file tên **.env** và copy nội dung từ file **.env.example** sang nhé. 

Sau đó các bạn mở file **.env** và sửa lại 1 số chỗ như sau:
```python
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laraveluser
DB_PASSWORD=laraveluserpass

BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

....

LARAVEL_ECHO_SERVER_REDIS_HOST=redis
LARAVEL_ECHO_SERVER_REDIS_PORT=6379
LARAVEL_ECHO_SERVER_AUTH_HOST=http://webserver:80
LARAVEL_ECHO_SERVER_DEBUG=true

APP_PORT=4000
MIX_FRONTEND_PORT=4000
ADMINER_PORT=8080
```
Giải thích:
- Ở trên ta có phần cấu hình thông số kết nối tới database, các bạn chú ý DB_HOST phải trùng khớp với tên service ta định nghĩa ở **docker-compose.yml** nhé. Tương tự cho phần cấu hình Redis
## Giây phút của sự thật
Vâng vậy là sau 1 bài cấu hình dài cả 1 năm ánh sáng thì cũng đến lúc chúng ta test thử project này xem vất vả hộc mặt kết quả có ra gì không nhé :-D :-D

Các bạn chạy command sau để khởi động project:
```html
docker-compose up -d --build
```

Sau khi command trên thành công, các bạn mở trình duyệt ở địa chỉ **localhost:4000**.

Và..... BÙM :boom: trắng xoá, không thấy gì :sob::sob:

Vấn đề ở đây là ta chưa chạy **composer install hay npm install** nên service **app** (phần chạy Laravel** bị lỗi

Vậy vấn đề ở đây là: **làm sao có thể chạy composer hay npm trong khi môi trường của service app không hề có Composer hoặc NodeJS**

**NOTE**: Nếu các bạn chạy lên thấy có lỗi báo ko tải về được image `node:12.13-alpine` thì các bạn thay lại với tên là `node:12-alpine` là được nhé

## Cài dependencies (composer install, npm install,...)
Như ở bài [Dockerize VueJS](https://viblo.asia/p/dockerize-ung-dung-vuejs-reactjs-ORNZqxwNK0n#_co-cach-nao-de-khong-phai-chia-dockerfile-thanh-2-stage-8) mình có nhắc tới dùng **container tạm thời** để cài dependencies thay vì cài trực tiếp vào image.

Việc này sẽ giúp giảm size của image xuống, vì việc cài dependencies này không xảy ra thường xuyên mà ta thường chỉ làm 1 lần lúc đầu khi setup project.

Các bạn chạy lần lượt các command sau nhé:
```
docker run --rm -v $(pwd):/app -w /app composer install --ignore-platform-reqs --no-autoloader --no-dev --no-interaction --no-progress --no-suggest --no-scripts --prefer-dist

docker run --rm -v $(pwd):/app -w /app composer dump-autoload --classmap-authoritative --no-dev --optimize

docker run --rm -v $(pwd):/app -w /app node npm install --production

docker run --rm -v $(pwd):/app -w /app node npm run prod


# Nếu bạn đang dùng Windows thì các command trên sẽ như sau:

docker run --rm -v "/$(pwd)":/app -w //app composer install --ignore-platform-reqs --no-autoloader --no-dev --no-interaction --no-progress --no-suggest --no-scripts --prefer-dist

docker run --rm -v "/$(pwd)":/app -w //app composer dump-autoload --classmap-authoritative --no-dev --optimize

docker run --rm -v "/$(pwd)":/app -w //app node npm install --production

docker run --rm -v "/$(pwd)":/app -w //app node npm run prod
```

Giải thích:
- Đầu tiên ta tạo 1 container tạm thời từ image **compose** (có cài sẵn composer) và ta chạy **composer install** với một số option đằng sau (các bạn search google để biết thêm về các option này nhé)
- Tiếp theo ta lại tạo 1 container tạm thời vẫn từ image **composer** và chạy **dump-autoload** để load các class thư viện PHP
- Tiếp đó ta tạo 1 container từ image **node** (latest) và chạy **npm install** ta có option **--production** ý là "chỉ cài những thứ ở mục **dependencies** trong file **package.json**
- Cuối cùng là ta build phần code VueJS (nếu bạn nào muốn watch thì đổi lại thành run watch là được nhé)

**Note cho bạn nào dùng Windows**:
- nếu bạn chạy `docker run ... npm install` và gặp lỗi `ENOSYS: Function not implemented` thì bạn khởi động lại Docker, nếu vẫn không được thì bạn cần khởi động lại máy nhé. Đây là 1 issue của Docker liên quan tới file system trên Windows được mô tả [ở đây](https://github.com/docker/for-win/issues/5955)
- nếu sau khi khởi động lại mà vẫn xảy ra các lỗi liên quan tới npm (`docker run ...npm install`, `npm run...`), thì các bạn chạy trực tiếp các command `npm` ở môi trường gốc nhé (tất nhiên điều này yêu cầu máy gốc các bạn có `NodeJS`)
## Giây phút của sự thật (phần 2)
Sau khi hoàn thành ta quay lại trình duyệt và F5:

![Docker laravel](https://images.viblo.asia/051d65ff-f2a2-475d-8844-3c166c270118.png)

Đã thấy app khởi động và báo chưa có key. 

Trước khi chạy command tạo key mình xin lưu ý: mọi command **php artisan ...** từ giờ ta sẽ luôn chạy dưới dạng **docker-compose exec app php artisan....** (để ý phần đầu nhé). Vì sao? Vì khi chạy bên ngoài thì Laravel sẽ dựa vào bối cảnh là môi trường ngoài để chạy, nên những command như **migrate** sẽ bị lỗi. Nên để đồng bộ và cho các bạn quen thì ta luôn chạy với **docker-compose exec...** nhé

Chúng ta chạy command sau để tạo key đồng thời tạo DB và seed luôn nhé
```python
docker-compose exec app php artisan key:generate

docker-compose exec app php artisan migrate --seed
```

Sau đó ta load lại trình duyệt và...... BÙM :boom:

![Docker Laravel](https://images.viblo.asia/fbe202fc-e3b6-4edd-a331-4bfd1a1c52cb.png)

![Docker laravel](https://images.viblo.asia/86375c10-3558-4e09-a7f9-b275674c3877.png)

Đã thành công :-D

Các bạn thử tạo 2 account và chat với nhau xem thế nào nhé. Phần này mình để cho các bạn tự sướng :-D :-D

> Để vọc vạch phần quản trị database các bạn truy cập **localhost:8080** nhé ;)

> Để vọc phần Horizon các bạn truy cập ở địa chỉ **localhost:4000/horizon** nhé

> Vì ta đã mount volume từ môi trường gốc vào trong container nên các bạn có thể sửa trực tiếp code và sẽ thấy thay đổi nhé. Chú ý nếu sửa code VueJS thì nhớ là phải chạy npm nhen ;)

> Docker + Laravel trên MacOS sẽ có cảm giác hơi lag và chậm, mình chưa biết chính xác lí do vì sao, rất nhiều người cũng bị như vậy. Một vài người nói rằng do Kernel trên Mac khác Linux dẫn tới vấn đề này, nhưng yên tâm deploy ở production ta dùng Linux thì tốc độ vẫn nhanh bình thường nhé

# Kết bài
Phùuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu........ Bài dài thấu trời thấu đất, hàng tỉ kiến thức mới, mắt mờ, đầu óc quay cuồng.

Dockerize được cái ứng dụng chat mà xịt máu mũi :rofl::rofl:

Bài này cũng khá là dài, nhưng mình không muốn tách ra làm 2 bài vì như thế nó sẽ hơi lưng chừng. Phần code Laravel mình đã làm sẵn hết cho các bạn và ta chỉ tập trung vào phần Docker.

Trong bài có rất nhiều kiến thức liên quan đến Linux, mình không thể giải thích từng tí từng tí một cho các bạn được, nhưng các bạn có thể tự copy paste và search google là sẽ có hết thông tin nhé.

Cũng sẽ có những phần kiến thức Linux các bạn thấy là "dù search xong cũng không hiểu", thì ta cứ "chấp nhận" dùng và dần dần hấp thụ nhé các bạn. Ngày trước bạn đầu dockerize Laravel mấy phần về **supervisor** mình gần như mù tịt, ai bảo gì làm nấy, giờ mới đỡ hơn :-D :-D. Cá nhân mình thấy qua những project kiểu này trình Linux của chúng ta sẽ lên đáng kể đó ;)

Qua bài này hi vọng các bạn đã hiểu được cách Dockerize một project Laravel full options :-D, đầy đủ các thứ như DB, Redis, Queue Job, Cronjob, ... trong sẽ như thế nào nhé. Từ đó vận dụng và áp dụng vào thực tế cho phù hợp nhé. Đồng thời ta cũng để ý là dù cho ta dùng nhiều thứ MySQL, Redis, Nginx, Adminer, PHP, Composer NodeJS... thế nhưng toàn bộ đều được chạy trong container Docker, môi trường gốc của ta vẫn "trinh nguyên" nhé :joy::joy:

Nếu có vấn đề gì thì các bạn cứ để lại comment cho mình nhé.

Toàn bộ source code đến bước cuối cùng của bài này mình để [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) (nhánh **complete-tutorial** nhé)

Cám ơn các bạn đã theo dõi. Hẹn gặp lại các bạn vào những bài sau ^^