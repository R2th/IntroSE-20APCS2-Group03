Chào các bạn, hôm nay mình lại đến tháng đây. Đang có những bài viết liên quan đến Devops thì mình làm luôn bài này .

Bình thường những bài trước của mình , mọi người thường thấy bảo sử dụng Docker để build môi trường đúng không. RỒi trong dự án có cái file docker-compose.yml đúng không. 

Đúng những ai đã tìm hiểu về docker thì đều biết file đấy để làm gì, và có nhưng gì trong đó, đặc biệt là những image đã có sẵn ở trên dockerhub , những image mà cài đặt đầy đủ mọi thứ từ php, mysql, git, composer .... . Dev chỉ cần use nó vào docker-compose là xong, thế là chạy như ngựa.

Nhưng bạn thử nghĩ, bạn là 1 Dev, đâu phải lúc nào bạn cũng được làm những dự án mới như laravel 6 .. rồi mysql 8 ..., bạn phải sử dụng những công nghệ của khách hàng từ những thời napoleong mà bạn còn chưa gặp bao giờ. Thế lúc này bạn lại phải tự tạo image cho riêng mình , không thể dùng sẵn trên dockerhub được nữa. Bạn phải tự config để link những container cần thiết với nhau, hoặc cho nó chúng vào 1 network để chạy, Nhiều người dùng  những image của Sun quen rồi nên không hề để ý đến những vấn đề đấy

> Đặc biệt là ae Sun hay dùng những image có sẵn của công ty như : framgia/php-fpm, framgia/workspace, framgia/nginx ...

Vâng đến với bài này mình sẽ hướng dẫn mọi người tạo những image cho riêng mình. để có thể đảm bảo là cân được mọi dự án , với những công nghệ củ chuối nhất mà không phải loay hoay cài đặt những công nghệ ấy vào chính máy host của mình.

Ok. let's go

# Bước 1 : Tạo project laravel

Cái này thì mọi người cứ chạy lên doc của laravel mà tải vể nhé, nhưng tải mấy cái phiên bản cũ cũ như 5.1 ấy, Để mình thử build docker với php version thấp.

> composer create-project laravel/laravel demo "5.1.*"
> 

Xong rồi thì 
```
cd demo
```
mở file composer.json xem phiên bản laravel này cần những cái gì để chạy được nhé
```
    "name": "laravel/laravel",
    "description": "The Laravel Framework.",
    "keywords": ["framework", "laravel"],
    "license": "MIT",
    "type": "project",
    "require": {
        "php": ">=5.6.4",
        "laravel/framework": "5.4.*",
        "laravel/tinker": "~1.0"
    },
    "require-dev": {
        "fzaninotto/faker": "~1.4",
        "mockery/mockery": "0.9.*",
        "phpunit/phpunit": "~5.7"
    },
```
À cũng không có gì, chỉ cần php trên 5.6.4 à được rồi =)) 

# Bước 2: Tạo container với docker-compose
Ta sẽ tạo những file và thư mục sau.

*    docker-compose.yml : cài đặt các service chạy trong docker, mỗi service sẽ đảm nhiệm 1 chức năng như service về webserver, service về database
    ![](https://images.viblo.asia/99ca23f2-4ed2-412e-86ee-9ee1d615aec8.png)

*    Thư mục docker, trong thư mục này có các thư mục con như php, nginx, mysql, trong các thư mục con này chứa những file Dockerfile và conf để build môi trường (nginx)

  ![](https://images.viblo.asia/06c19e59-ac65-439f-8103-9af6844f6842.png)
## Tạo service app (php-fpm)
```yml
version: '2'
services:
  # The Application setup php
  php:
    container_name: laravel5_php
    build:
      context: .
      dockerfile: docker/php/Dockerfile
    working_dir: /var/www
    volumes:
      - ./:/var/www/
    networks:
      - app-network
   # The Web Server
```
Trong đó

* version 2 : version của docker-compose, ở đây mình chọn là 2
* context : thư mục đặt dockerfile
* dockerfile : đặc tả cài đặt về service sẽ dùng image nào, trong container trạng thái sẽ có những thư mục nào được cài sẵn...
* working_dir : tương tự như đặc tả của docker run, thư mục được chọn trong container để chay các file binaries. Mặc định là root
* volumes : mount thư mục ./ (chứa source code) trên máy host vào /var/www trên container. Điều này cho phép chúng ta thay đổi source code khi container đang chạy runtime.
*    networks:
      - app-network . Bình thường mọi người cần links hoặc depend_on đến các service đúng không, mình thì ko làm cách đấy, mình chỉ cần cho những container này nó chạy trên cùng 1 network do mình định nghĩa là 'app-network' là chúng nó có thể thông được với nhau rồi.
 
 File Dockerfile đặc tả vể con container laravel5_php này
 ```yml
 FROM php:7.2-fpm

# Copy composer.lock and composer.json
COPY composer.lock composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
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

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www
USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000

CMD ["php-fpm"]
 ```
 Trong file này mình sẽ sửa dụng image php:7.2-fpm có sắn trên dockerhub, mọi người có thể tự cài đặt, dự án mọi người dùng bản bao nhiêu thì lên search có thì nhém vào. Mình đinh demo dùng bản 5.6 nhưng mà có 1 cái library nó reuqire php trên 7.1 thế là lại dùng luôn 7.2 luôn  :cry::cry::cry:
 
 Còn lại là mình cài đặt thêm 1 cài các  thư viện như git, zip, vim ... để khi mình exec vào container này thì có thể code được hay sửa chữa gì ở trong container này cũng được.
 
 Và quan trọng nhất là phần 
 
>  EXPOSE 9000
>  
mình expose ra 1 port 9000 để cho nginx có thể biết và thông đến nó.

## Tạo service Nginx
Ta sẽ cần 1 WebService để xử lý các request đến và đưa đến cho laravel xử lý. Ngoài nginx ta có thể chọn apache nhé

```yml
   # The Web Server
  nginx:
    container_name: laravel5_nginx
    build:
      context: .
      dockerfile: docker/nginx/Dockerfile
    volumes:
      - ./:/var/www/
    working_dir: /var/www
    ports:
      - 8090:80
    networks:
      - app-network
```
trong đó

* ports: - 8090:80 : Ánh xạ cổng 8080 trên máy ảo vào cổng 80 trên container. 
*  File Dockerfile đặc tả vể con container laravel5_nginx này
```yml
FROM nginx:latest

ADD ./docker/nginx/vhost.conf /etc/nginx/conf.d/default.conf
```
Rất đơn giản , mình sử dụng nginx đã có sẵn trên dockerhub. và phần quan trọng nhất là phải cấu hình làm sao cho nginx nó trỏ được đến thư mục public trong dự án của mn đúng không,
vầng đó chính là đoạn này 
```
ADD ./docker/nginx/vhost.conf /etc/nginx/conf.d/default.conf
```
nó sẽ thêm file vhost.conf vào thư mục etc/nginx/conf.d/default.conf của container laravel5_nginx mn nhé
```
server {
    listen 80;
    index index.php index.html;
    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/public;
    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass php:9000;
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
Và phần quan trọng nhất trong file này đó chính là để cho thằng nginx nó lắng nghe port 9000 của container php ở phần trên mình expose đúng không.
```
 fastcgi_pass php:9000;
```
nó là đoạn này nhé.
##  Tạo service database (mysql và phpmyadmin)
```
  # MySQL Service
  mysql:
    container_name: laravel5_mysql
    image: mysql:5.7.22
    ports:
      - "3307:3306"
    environment:
      MYSQL_DATABASE: laravel
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_ROOT_PASSWORD: root
    volumes:
      - ./docker/mysql/dbdata:/var/lib/mysql
    networks:
      - app-network
  phpmyadmin:
    container_name: laravel5_phpmyadmin
    image: phpmyadmin/phpmyadmin
    environment:
        PMA_ARBITRARY: 1
        MYSQL_USER: root
        MYSQL_PASSWORD: secret
        MYSQL_ROOT_PASSWORD: root
    ports:
        - "8081:80"
    networks:
      - app-network
```
Những cái này thì không có gì hot đúng không anh em, 

* image: mysql:5.6 So sánh với các service ở trên đều có 1 dockerfile đặc tả cài đặt cho nó thì service database này chỉ cần pull image mysql về là đủ. Các đặc tả cần thiết khác đều có sẵn trong image này nên ta sẽ không cần viết riêng.
* ./docker/mysql/dbdata:/var/lib/mysql : Cái này chỉ để mount thư mục mysql của container với thư mục dbdata để có thể log được những data của sql thôi. đảm bảo khi dữ container down nhưng yên tâm là dữ liệu đã được mount ra thư mục máy host
* enviroment : Các biến môi trường. Với định nghĩa như ở trên, mysql sẽ tạo cho chúng ta 1 database và 1 user như vậy. (Nếu không đặc tả thì sẽ chỉ có 1 user root và database mặc định của mysql)

Bình thường ở máy host mn thường dùng phpmyadmin or adminer để truy cập db đúng không, đến với docker thì mn cũng có thể dùng những thằng này, chỉ cần dùng những image có sẵn thôi :v 

OK ngon rồi đúng không,  từ nãy đến giờ mn thấy không hiểu làm sao mà mấy cái container này nó có thể link được đến nhau, sao không thấy nó mấy từ như `link, depends_on` đúng không,  ở đây mình không làm thế. mình tạo cho chúng nó 1 cái network và cho chúng nó chạy trên cái network đấy là ok rồi 

> *    networks:
>       - app-network . Bình thường mọi người cần links hoặc depend_on đến các service đúng không, mình thì ko làm cách đấy, mình chỉ cần cho những container này nó chạy trên cùng 1 network do mình định nghĩa là 'app-network' là chúng nó có thể thông được với nhau rồi.
>       
```
#Docker Networks
networks:
  app-network:
    driver: bridge
```

Ok thế là xong.
File docker-compose đầy đủ sẽ là:

```
version: '2'
services:
  # The Application setup php
  php:
    container_name: laravel5_php
    build:
      context: .
      dockerfile: docker/php/Dockerfile
    working_dir: /var/www
    volumes:
      - ./:/var/www/
    networks:
      - app-network
   # The Web Server
  nginx:
    container_name: laravel5_nginx
    build:
      context: .
      dockerfile: docker/nginx/Dockerfile
    volumes:
      - ./:/var/www/
    working_dir: /var/www
    ports:
      - 8090:80
    networks:
      - app-network
  # MySQL Service
  mysql:
    container_name: laravel5_mysql
    image: mysql:5.7.22
    ports:
      - "3307:3306"
    environment:
      MYSQL_DATABASE: laravel
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_ROOT_PASSWORD: root
    volumes:
      - ./docker/mysql/dbdata:/var/lib/mysql
    networks:
      - app-network
  phpmyadmin:
    container_name: laravel5_phpmyadmin
    image: phpmyadmin/phpmyadmin
    environment:
        PMA_ARBITRARY: 1
        MYSQL_USER: root
        MYSQL_PASSWORD: secret
        MYSQL_ROOT_PASSWORD: root
    ports:
        - "8081:80"
    networks:
      - app-network
#Docker Networks
networks:
  app-network:
    driver: bridge
```

Rồi giờ chạy
```
docker-compose build
```
sau khi chạy xong thì chạy
```
docker-compose up
```
để có thể xem log, khuyến khích lần đầu tiên thì nên chạy câu này để xem log xem có container nào bị exit hay down không, xem nó có bắn ra log gì không
or 
```
docker-compose up -d
```

sau khi chạy xong thì thử kiểm tra 
```
docker ps 
```
rồi xem thành quả nhé
![](https://images.viblo.asia/8672c217-cff8-4e7d-8b08-0d71a3aee02a.png)
rồi giờ mọi người truy cập vào container php bằng câu lệnh

```
docker exec -it laravel5_php /bin/bash
```
rồi chạy những câu lệnh bình thường như khi mọi người setup dự án thôi
```
composer install
npm install
php artisan key:gen
```
chỉnh sửa db_host ..
```
php artisan migrate --seed
```

sau khi đã xong xuôi ,  mọi người chạy vào địa chỉ locahost:8090 để xem thành quả nhé
![](https://images.viblo.asia/d26d246b-513b-4e8d-b851-14ea49f55da9.png)
 Ok ngon cơm
 
#  Kết Luận
Thôi bài mình chỉ đến đây thôi, mình đã hướng dẫn những kỹ thuật cơ bản nhất để mn có thể tự tin build mọi dự án nào mà mọi người được giao. tầm này thì sợ gì đúng không nào =)) dự án nào cũng quẩy hết