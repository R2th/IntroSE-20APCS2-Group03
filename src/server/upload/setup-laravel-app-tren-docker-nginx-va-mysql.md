![docker-laravel](https://images.viblo.asia/c95fe594-768c-46b8-abd7-db9f9d20f379.png)  
Nếu như bạn đã từng code trên nhiều môi trường hệ điều hành, nhiều máy khác nhau thì chắc hẳn bạn đã từng gặp phải trường hợp **conflict version** cài đặt ở máy local: `php, node,...` hay không tương thích giữa các hệ điều hành: `ubuntu, macos, window,...`  
Vậy làm thế nào để giải quyết vấn đề này ?   
Tại sao chúng ta không tạo nên 1 môi trường chung (hệ điều hành, phiên bản cho các ngôn ngữ sử dụng, ...)  
==> **Docker** sẽ giúp chúng ta giải quyết vấn đề này  
Trong bài này chúng ta chỉ tập trung vào vấn đề setup Docker để có được môi trường code Laravel
## Một số yêu cầu cần có
- Ứng dụng laravel đã từng code: Tham khảo [document larvavel](https://laravel.com/docs/7.x)
- Docker: [Hướng dẫn cài đặt docker](https://docs.docker.com/docker-for-mac/install/)
- Docker-compose: [Hướng dẫn cài đặt docker-compose](https://docs.docker.com/compose/install/)
- Một số khái niệm cơ bản trong docker
## Bắt đầu setup nào
### Tạo `docker-compose` file
* `docker-compose` là gì ?  
Đây là file chứa tất cả các docker container cần dùng và các docker container này có thể tạo bằng một câu lệnh tương đối đơn giản kiểu như:  
`docker-compose -f docker-compose.prod.yml up --build`
* Tạo file có tên: `docker-compose.yml` ở thư mục gốc  
Chúng ta sẽ định nghĩa các container sử dụng trong file này, có 3 phần chính
    * nginx
    * mysql
    * Ứng dụng của mình  
   #### Container của laravel app được định nghĩa như sau:
    ```docker
    version: '2'
    services:
    # The Application
    app:
        container_name: laravel_app
        build:
          context: ./
          dockerfile: development/app.dockerfile
        volumes:
          - ./storage:/var/www/storage
        env_file: '.env.prod'
        environment:
          - "DB_HOST=database"
          - "REDIS_HOST=cache"
    ```
    Giải thích một chút về đoạn code trên  
    1. `version`: tùy theo lựa chọn của mình
    2. `container_name`: Sử dụng tên này để sau này tham chiếu đến container - có thể tùy ý lựa chọn
    3. `build`:  Sử dụng để build 1 `image` từ `dockerfile`  
        Một số tùy chọn bổ sung:  
        * `context`: Giống như đường dẫn vào bên trong thư mục sourcecode của laravel app  
          Ở đây, dùng `./` vì hiện tại file `docker-compose` đang đặt ở thư mục gốc của laravel app
        * `dockerfile`: docker image được build từ `Dockerfile`, thường là thêm các lệnh bổ sung sẽ được chạy trong container  
            Ở đây, `development/app.dockerfile` nghĩa là `docker file` được để trong `development` của thư mục laravel gốc
    4. `volumes`: Định nghĩa nơi lưu trữ chia sẻ giữa ứng dụng và docker container đang chạy
    5. `env_file`: nơi định nghĩa file `.env` của laravel
    6. `environment`: Khai báo các biến môi trường
    #### NGINX Container
    ```
    # The Web Server
    web:
        container_name: nginx_server
        build:
          context: ./
          dockerfile: development/web.dockerfile
        volumes:
          - ./storage/logs/:/var/log/nginx
        ports:
          - 8990:80
    ```
    1. `volumes`: Ở đây ta chia sẻ folder log của laravel với log của nginx 
    2. `port`: Hiểu đơn giản thì chúng ta sẽ định nghĩa port mà docker container sẽ lắng nghe  
        Bên trái port của máy chủ, bên phải là port của docker container
    #### MYSQL container
    ```
    # The Database
    database:
        container_name: mysql_database
        image: mysql:5.7
        volumes:
          - dbdata:/var/lib/mysql
        environment:
          - "MYSQL_DATABASE=Baly"
          - "MYSQL_USER=phpmyadmin"
          - "MYSQL_PASSWORD=phpmyadmin"
          - "MYSQL_ROOT_PASSWORD=root"
        ports:
          - 8991:3306
    ```
    1. `image`: Ở đây ta dùng luôn từ 1 image sẵn là mysql:5.7 chứ không tự định nghĩa docker file nữa
    2. `ports`: Ở đây mysql container sẽ lắng nghe từ cổng 8991 trên máy chủ và 3306 trên mạng của container
    
### Tạo `Dockerfiles`  
Ở bước này, chúng ta định nghĩa các dockerfile cho các mục vừa khai báo ở `docker-compose` file vừa xong  
####     Tạo app.dockerfile
Tạo tệp `development/app.dockerfile` bên trong thư mục gốc sourcecode laravel app  

 ```
FROM php:7.2-fpm
COPY composer.lock composer.json /var/www/
COPY database /var/www/database
WORKDIR /var/www
RUN apt-get update && apt-get -y install git && apt-get -y install zip
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" 
    && php -r "if (hash_file('SHA384', 'composer-setup.php') === 'a5c698ffe4b8e849a443b120cd5ba38043260d5c4023dbf93e1558871f1f07f58274fc6f4c93bcfd858c6bd0775cd8d1') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" 
    && php composer-setup.php 
    && php -r "unlink('composer-setup.php');" 
    && php composer.phar install --no-dev --no-scripts 
    && rm composer.phar
COPY . /var/www
RUN chown -R www-data:www-data 
        /var/www/storage 
        /var/www/bootstrap/cache

RUN php artisan cache:clear
RUN php artisan optimize
RUN  apt-get install -y libmcrypt-dev 
        libmagickwand-dev --no-install-recommends 
        && pecl install mcrypt-1.0.2 
        && docker-php-ext-install pdo_mysql 
        && docker-php-ext-enable mcrypt
        
RUN mv .env.prod .env
RUN php artisan optimize
```
1. `From php:7.2-fpm`: Build container từ image: `php:7.2-fpm`
2. `COPY`: thực thi command copy các folder tương ứng từ máy chủ vào docker container
3. `WORKDIR`: set không gian làm việc docker container vào thẳng /var/www, sau này chạy các command ở bash thì không cần `cd` vào đó
4. `RUN`: cài đặt các trình phục thuộc mà laravel cần (tương tự composer install ở máy chủ và 1 số phần khác)  
    Hãy lưu ý dòng `if(hash_file('SHA384'...` vì mỗi lần cập nhật thì giá trị băm sẽ thay đổi, cho nên cần Get Hash Value
5. `COPY . /var/www`: copy toàn bộ source code vào foler làm việc
#### Tạo web.dockerfile
```
FROM nginx:1.10-alpine
ADD development/vhost.conf /etc/nginx/conf.d/default.conf
COPY public /var/www/public
```
Ở đây chúng ta build container từ iamge:  `nginx:1.10-alpine` và thay thế default.conf của nginx bằng `vhost.conf`  
Vì vậy ta cần tạo file `vhost.conf` cùng thư mục với web.dockerfile (development)
```
# vhost.conf
server {
    listen 80;
    index index.php index.html;
    root /var/www/public;
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
    location / {
        try_files $uri /index.php?$args;
    }

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}
```

Kiểm tra lại,  chúng ta cần có các tệp sau:
1. **root folder** 
    - docker-compose.yml
    - .env.prod
3. **development folder:**  
    - .dockerignore
    - app.dockerfile
    - web.dockerfile
    - vhost.conf

Để chạy, ta sử dụng lệnh sau 
  ```
  docker-compose up --build
  ```
Lệnh trên giúp ta tiến hành build ra các container và start chúng   
Nếu mọi thứ chạy bình thường thì laravel app của chúng ta sẽ được khởi chạy trong container tại: `0.0.0.0:8990`
## Tổng kết
Cảm ơn các bạn đã theo dõi, mong rằng một số thông tin trên sẽ giúp các bạn có thể tự mình build 1 laravel app sử dụng Docker để có thể tránh các trường hợp conflict không mong muốn  
Các thông số trong dockerfile, docker-conpose có thể còn khá khó hiểu, nhưng theo ý kiến cá nhân đối với người mới bắt đầu, ta chỉ cần hiểu mục đích nó làm gì chứ không nhất thiết phải biết cách build ra các file như vậy ngay