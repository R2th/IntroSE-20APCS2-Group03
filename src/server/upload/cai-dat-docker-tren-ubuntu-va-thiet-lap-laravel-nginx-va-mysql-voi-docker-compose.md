## Cài đặt Docker trên Ubuntu
### 1. Gỡ cài đặt phiên bản cũ
Trước tiên, nếu bạn đã từng cài đặt **Docker** hãy gỡ cài đặt chúng bằng lệnh: 

> sudo apt-get remove docker docker-engine docker.io containerd runc

### 2. Thiết lập kho lưu trữ cho Docker
1. Update các package và cài các package cần thiết:

   >     $ sudo apt-get update
   >      $ sudo apt-get install \
   >        apt-transport-https \
   >        ca-certificates \
   >        curl \
   >        gnupg \
   >        lsb-release

Để các bạn hiểu rõ hơn thì dưới đây là ý nghĩa cơ bản của nó:

* **apt-transport-https:** giúp package manager chuyển file và data qua https.
* **ca-certificates:** giúp web browser và hệ thống kiểm tra certificate bảo mật.
* **curl:** chuyển data.
* **gnupg:** mã hóa và giải mã.
* **lsb-release:** cung cấp một số thông tin cụ thể về LSB (Linux Standard Base) và phân phối cụ thể.
2. Thêm Docker’s official GPG key:
   > curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
3. Thêm Docker Repository:
   > sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
### 3. Cài đặt Docker:
1. Sử dụng lệnh apt để cài đặt **Docker** trên **Ubuntu**:

   >     $ sudo apt-get update
   >      $ sudo apt-get install docker-ce docker-ce-cli containerd.io
2. Kiểm tra trạng thái **Docker**:
   >     $ sudo service docker status 
   Nếu **Docker** của bạn chưa được start, hãy start nó bằng lệnh:
   >    $ sudo service docker start

3. Xác nhận kết quả cài đặt **Docker** thành công hay chưa bằng cách chạy một **Image** thử nghiệm xem có hoạt động bình thường không:
    >     $ sudo docker run hello-world

## Thiết lập Laravel, Nginx và Mysql với Docker Compose
### 1. Khởi tạo Laravel:
Bạn hãy trỏ đến thư mục chính bạn muốn đặt project sau đó chạy lệnh:
> $ composer create-project --prefer-dist laravel/laravel docker-laravel

Di chuyển vào project: 
> $ cd docker-laravel
### 2. Tạo Docker Compose:
Sau khi di chuyển vào project, bạn hãy tạo file có tên là `docker-compose.yml`. Việc xây dựng các ứng dụng của bạn với Docker Compose giúp đơn giản hóa quá trình thiết lập và tạo phiên bản cho cơ sở hạ tầng của bạn.
Trong file `docker-compose.yml` chèn nội dung dưới đây vào file:

>     version: '3'
>      services:
> 
>      #PHP Service
>         app:
>            build:
>                context: .
>                dockerfile: Dockerfile
>            image: framgia/laravel-php-fpm
>            container_name: project_app
>            restart: always
>            tty: true
>            environment:
>                SERVICE_NAME: project_app
>                SERVICE_TAGS: dev
>            working_dir: /var/www
>            volumes:
>                 - ./:/var/www
>                 - ./php/php.ini:/usr/local/etc/php/conf.d/local.ini
>            networks:
>                 - app-network
> 
>      #Nginx Service
>         webserver:
>            image: nginx
>            container_name: project_webserver
>            restart: always
>            tty: true
>            ports:
>                - "80:80"
>                - "443:443"
>            volumes:
>                - ./:/var/www
>                - ./nginx/conf.d/:/etc/nginx/conf.d/
>             networks:
>                - app-network
> 
>      #MySQL Service
>         db:
>             image: mysql:5.7.22
>             container_name: project_db
>             restart: always
>             tty: true
>             ports:
>                 - "3376:3306"
>             environment:
>                 MYSQL_DATABASE: laravel
>                 MYSQL_ROOT_PASSWORD: your_mysql_root_password
>                 SERVICE_TAGS: dev
>                 SERVICE_NAME: mysql
>             volumes:
>                 - dbdata:/var/lib/mysql/
>                 - ./mysql/my.cnf:/etc/mysql/my.cnf
>             networks:
>                 - app-network
> 
>      #Docker Networks
>         networks:
>             app-network:
>                 driver: bridge
>     #Volumes
>         volumes:
>             dbdata:
>                 driver: local

Trong file `docker-compose.yml` bạn sẽ xác định các service đó là: *app, webservice, db* và các cú pháp khác bên trong mỗi service:

* **app:** Service này chứa ứng dụng của bạn và sử dụng 1 *Docker Image* `framgia/laravel-php-fpm` ( Các bạn có thể tùy chỉnh và chọn *Docker Image* phù hợp).
* **webservice:** Service này lấy `nginx` *Image* từ *Docker* và chạy các cổng `80` và `443`.
* **db:** Service này lấy `mysql:5.7.22`  *Image* từ *Docker* và xác định 1 vài biến môi trường như là `MYSQL_DATABASE` và `MYSQL_ROOT_PASSWORD`. Bạn có thể tùy ý đổi lại giá trị các biến sao cho phù hợp. 
* **container_name:** xác định một tên cho vùng chứa, tương ứng với tên của mỗi service.
* **app-network: **như là 1 mạng cầu nối kết nối các Container lại với nhau, tạo điều kiện giao tiếp giữa các Container.
* **dbdata:** trong `Service db` dùng để duy trì cơ sở dữ liệu mysql, cho phép bạn khơi động lại `Service db` mà không bị mất dữ liệu.
* `.php/php.ini` `./nginx/conf.d/` và `./mysql/my.cnf` đều dùng để gắn kết với vế bên phải sau dấu `:` trong Container, cho phép bạn thêm hoặc chỉnh sửa nội dung cấu hình nếu cần thiết.

###  3. Tạo Dockerfile:
**Docker** cho phép bạn chỉ định môi trường bên trong các **Container** riêng lẻ bằng **Dockerfile**. **Dockerfile** cho phép bạn tạo **Image** mà bạn sử dụng để cài đặt phần mềm theo yêu cầu của dự án. Bạn có thể push các hình ảnh tùy chỉnh mà bạn tạo vào **Docker Hub**.

Tạo file có tên là **Dockerfile** ở trong thư mục của dự án, file này sẽ thiết lập 1 **Image** và chỉ định các lệnh và hướng dẫn cần thiết để xây dựng **Image** của project Laravel của bạn.

   >     FROM php:8.0-fpm
   >      #Copy composer.lock and composer.json
   >      COPY composer.lock composer.json /var/www/
   >      #Set working directory
   >      WORKDIR /var/www
   >      #Install dependencies
   >      RUN apt-get update && apt-get install -y \
   >          build-essential \
   >          libpng-dev \
   >          libjpeg62-turbo-dev \
   >          libfreetype6-dev \
   >          locales \
   >          zip \
   >          jpegoptim optipng pngquant gifsicle \
   >          vim \
   >          unzip \
   >          git \
   >          curl
   > 
   >      #Clear cache
   > 
   >      RUN apt-get clean && rm -rf /var/lib/apt/lists/*
   >      #Install extensions
   >      RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
   >      RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/ 
   >      RUN docker-php-ext-install gd
   >      #Install composer
   >      RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
   >      #Add user for laravel application
   >      RUN groupadd -g 1000 username
   >      RUN useradd -u 1000 -ms /bin/bash -g username username
   >      #Copy existing application directory contents
   >      COPY . /var/www
   >      #Copy existing application directory permissions
   >      COPY --chown=username:username . /var/www
   >      #Change current user to username
   >      USER username
   >      EXPOSE 9000
   >      CMD ["php-fpm"]

Trước tiên, bạn khởi tạo 1 **Image** php:8.0-fpm như ở trên, các câu lệnh `RUN` dùng để cập nhật, cài đặt và thiết lập cấu hình bên trong của Container, tạo user và group gọi là username.
`EXPOSE` lệnh hiển thị một cổng trong vùng chứa 9000, cho php-fpmmáy chủ. `CMD` chỉ định lệnh sẽ chạy sau khi vùng chứa được tạo.
### 4. Cấu hình PHP:
Theo như bước số 2 chúng ra tạo file `docker-compose.yml` thì tệp cấu hình php của chúng ta sẽ nằm ở `.php/php.ini`. Bây giờ chúng ta sẽ tạo nó:
   >     $ mkdir php
   >      $ cd php
   >      $ touch php.ini

Sau đó mở file php.ini và ghi đè các cấu hình mà bạn mong muốn, ví dụ mình ghi đè cấu hình đơn giản về kích thước tối đa cho phép đẩy các tệp lên project như sau:

   >     upload_max_filesize=40M
   >      post_max_size=40M

### 5. Cấu hình Nginx:
Tương tự cấu hình php thì **Nginx** chúng ta cũng sẽ tạo tệp theo đường dẫn `./nginx/conf.d/` trong file `docker-compose.yml`, nếu bạn không ghi rõ tên file thì mặc định sẽ gọi đến file `default.conf`:

   >     $ mkdir nginx
   >      $ cd nginx
   >      $ mkdir conf.d
   >      $ cd conf.d
   >      $ touch default.conf

Sau đó, chèn đoạn mã dưới đây vào file `default.conf`:
   >     server {
   >          listen 80;
   >          index index.php index.html;
   >          error_log  /var/log/nginx/error.log;
   >          access_log /var/log/nginx/access.log;
   >          root /var/www/public;
   >          location ~ \.php$ {
   >              try_files $uri =404;
   >              fastcgi_split_path_info ^(.+\.php)(/.+)$;
   >              fastcgi_pass app:9000;
   >              fastcgi_index index.php;
   >              include fastcgi_params;
   >              fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
   >              fastcgi_param PATH_INFO $fastcgi_path_info;
   >          }
   >          location / {
   >              try_files $uri $uri/ /index.php?$query_string;
   >              gzip_static on;
   >          }
   >      }

* **listen:** Chỉ thị này xác định cổng mà máy chủ sẽ lắng nghe các yêu cầu đến.
* **error_logvà access_log:** Các lệnh này xác định các tệp để ghi nhật ký.
* **root:** Chỉ thị này đặt đường dẫn thư mục gốc, tạo thành đường dẫn hoàn chỉnh đến bất kỳ tệp nào được yêu cầu trên hệ thống tệp cục bộ.

### 6. Cấu hình Mysql:
Tương tự cấu hình **Nginx** hay **php**, Chúng ta cũng sẽ tạo tệp theo đường dẫn `./mysql/my.cnf`trong file `docker-compose.yml`:
   >     $ mkdir mysql
   >      $ cd mysql
   >      $ touch my.cnf

Sau đó, chèn đoạn mã mà bạn muốn ghi đè vào file my.cnf ví dụ như là gán `general_log` bằng 1 cho phép các bản ghi chung và các `general_log_file` quy định cụ thể thiết lập nơi các bản ghi sẽ được lưu trữ:
   >     [mysqld]
   >      general_log = 1
   >      general_log_file = /var/lib/mysql/general.log
### 7. Cài đặt môi trường cho project và chạy các Container:
Đậu tiên, nếu ta chưa có file .env thì hãy tạo file `.env` bằng cách copy file `.env.example` và đổi thành file `.env` bằng lệnh: `$ cp .env.example .env`

Tiếp theo, hãy mở file .env bạn vừa tạo và chỉnh sửa lại thông tin cấu hình cơ sở dữ liệu của bạn:
```python
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3376
DB_DATABASE=laravel
DB_USERNAME=laraveluser
DB_PASSWORD=your_laravel_db_password
```
Tiếp tục, bạn chỉ cần chạy 1 câu lệnh để khởi động tất cả các **Container**, tạo các **Volume**, thiết lập và connect tới **Networks**:  
> $ docker-compose up -d

Sau khi chạy thành công, để kiểm tra các **Container** đang chạy bạn gõ lệnh: 
> $ docker ps

Bây giờ, thay vì các bạn sử dụng lệnh command trong laravel thường ngày khi chưa cài **Docker** ví dụ như `composer install`, thì sau khi bạn cài xong các câu lệnh đó sẽ được sử dụng như sau:
```perl
docker-compose exec app composer install
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan config:cache
```
### 8. Tạo tài khoản trong Mysql:
Để tạo tài khoản mới, chúng ta cần tương tác đến **Container** `db` bằng câu lệnh: 

`docker-compose exec db bash`

Bên trong **Container**, đăng nhập bằng tài khoản quản trị `root` **Mysql**:

`mysql -u root -p`

Tiếp theo, ta tạo người dùng và gán quyền truy cập vào cơ sở dữ liệu vừa tạo:
>     GRANT ALL ON laravel.* TO 'laraveluser'@'%' IDENTIFIED BY 'your_laravel_db_password';
>      FLUSH PRIVILEGES;
>      EXIT;

Để thoát khỏi **Container**, gõ lệnh: `exit`.

Các bạn hãy kiểm tra kết nối bằng lệnh này nhé: 
>     $ docker-compose exec app php artisan migrate

Cuối cùng, hãy truy cập thử trình duyệt của bạn bằng cách lên trình duyệt gõ: http://ip_server, nếu bạn sử dụng port khác 80 thì hãy :port sau ip_server nhé. Chúc mọi người thành công!
## Tổng kết: 
Trong bài này, mình đã hướng dẫn các bạn cài **Docker** trên **Ubuntu** và thiết lập **Laravel**, **Nginx** và **Mysql** với **Docker Compose** theo cách hiểu của mình. Mình rất mong nhận được sự góp ý của các bạn qua phần comment bên dưới nhé! Cảm ơn các bạn đã lắng nghe bài chia sẻ của mình.
## Tài tiệu tham khảo:
[https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
[https://www.digitalocean.com/community/tutorials/how-to-set-up-laravel-nginx-and-mysql-with-docker-compose](https://www.digitalocean.com/community/tutorials/how-to-set-up-laravel-nginx-and-mysql-with-docker-compose)