Ở bài này mình sẽ hướng dẫn các bạn tích hợp docker vào dự án laravel.
# Các công cụ cần thiết
1. Docker (nếu chưa các bạn có thể cài đặt theo hướng dẫn tại (https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
2. Docker compose ( hướng dẫn cài đặt tại https://docs.docker.com/compose/install/).
3. Kết nối internet.

# Tích hợp docker vào dự án
Tạo ba file cần thiết trong thư mục gốc của dự án.
1. Terminal or cmd và chạy lệnh để tạo project laravel
```
composer create-project --prefer-dist laravel/laravel laravel
```

2. Trỏ tới thư mục lưu dự án laravel.
3. Bên trong thư mục laravel tạo một file có tên là : "docker-compose.yml". Bên trong có nội dung như sau:
```
version: '2'
//phiên bản của docker-compose
services:
//dịnh nghĩa các container của chúng ta ở đây
  webserver: //container của chúng ta
    build: .
    ports: //port của server
      - '80:80' 
    volumes:
      - ./:/var/www/html //Map (ánh xạ) thư mục gốc của máy thực vào thư mục html của container
      - ./apache.conf:/etc/apache2/sites-available/000-default.conf // file comfig apache để cấu hình server
    links:
      - db // Nói cho container biết là sẽ liên kết đến container db được định nghĩa bên dưới.

  db: //container chúng ta định nghĩa container db 
    image: mysql:5.7 //container chúng ta dùng image mysql:5.7 từ docker hub
    volumes: //ánh xạ thư mục .data/db với thư mục /var/lib/mysql của container
      - "./data/db:/var/lib/mysql"
    restart: always
    environment: //thiết lập thông tin để kết nói với db
      MYSQL_ROOT_PASSWORD: root // password của super user 
      MYSQL_DATABASE: laravel_ddb //name db
      MYSQL_USER: laravel //tên user
      MYSQL_PASSWORD: laravel //password của user
    ports:
      - "3306:3306" //port của container
```

4. Tiếp theo tạo file có tên là "Dockerfile"
```
FROM ubuntu:latest //dùng image ubuntu phiên bản mới nhất

RUN export LANG=en_US.UTF-8 \
  && apt-get update \
  && apt-get -y install apache2 //cài đặt apache2

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid
ENV APACHE_RUN_DIR /var/run/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
RUN ln -sf /dev/stdout /var/log/apache2/access.log && \
    ln -sf /dev/stderr /var/log/apache2/error.log
RUN mkdir -p $APACHE_RUN_DIR $APACHE_LOCK_DIR $APACHE_LOG_DIR

RUN apt-get -y install libapache2-mod-php7.0 php7.0 php7.0-cli php-xdebug php7.0-mbstring \
  sqlite3 php7.0-mysql php-imagick php-memcached php-pear curl imagemagick php7.0-dev \
  php7.0-phpdbg php7.0-gd npm nodejs-legacy php7.0-json php7.0-curl php7.0-sqlite3 php7.0-intl \
  apache2 vim git-core wget libsasl2-dev libssl-dev libsslcommon2-dev libcurl4-openssl-dev \
  autoconf g++ make openssl libssl-dev libcurl4-openssl-dev pkg-config libsasl2-dev libpcre3-dev \
  && a2enmod headers \
  && a2enmod rewrite

RUN curl -sS https://getcomposer.org/installer -o composer-setup.php //cài composer
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs //cài nodejs 
RUN apt-get update && apt-get install git //cài git

VOLUME [ "/var/www/html" ]
WORKDIR /var/www/html

EXPOSE 80

ENTRYPOINT [ "/usr/sbin/apache2" ]
CMD ["-D", "FOREGROUND"]
```

Nếu các bạn muốn cài thêm tool nào thì cứ thêm
```
 RUN apt-get update && apt-get install ứng dụng bạn muốn cài
```
Câu lệnh cài đặt trên máy thực như thế nào thì bạn cứ thay sudo bằng RUN.

5. Tiếp tục tạo file có tên "apache.conf" (file này dùng để config apache). có nội dung như sau
```
<VirtualHost *:80>
  ServerName laravel.app
  DocumentRoot /var/www/html/public
  <Directory /var/www/html/public>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Order allow,deny
    Allow from all
  </Directory>
</VirtualHost>
```

# Các lệnh cơ bản sử dụng docker
1. Để build hai container là "webserver" và  "db"  vừa định nghĩa ở file   "docker-compose.yml" bằng cách chạy lệnh 
```
docker-compose build
```

Lệnh này sẽ tải image ở dockerhub nên mất một vài phút (tùy thuộc vào mạng nhé)

2. Sau khi chạy xong lệnh trên mà không báo lỗi lầm gì là đã hành công 96,69% rồi nhé. Tiếp tục chạy lệnh
```
Docker-compose up
```

lệnh này để khởi động các container mà đã định nghĩa ở file docker-compose.yml
Chạy lệnh 
```
docker ps
```
để kiểm tra các container vừa build có khởi chạy chưa.

3. Kết nối với db. 
Chạy lệnh
```
docker inspect laravel_db_1
```
với 'laravel_db_1' là tên của container mysql:5.7. 
Các bạn kéo xuống dưới và để ý dòng : 
IpAdress : 172.0.0.4 (có thể khác nhau)
đó là địa chỉ host của mysql dùng để kết nối. còn thông tin user và password các bạn điền như ở file docker-compose.yml

4. Đừng quên chạy lệnh 
```
chmod -R 777 /storage bootstrap/cache
```


5. Để lấy địa chỉ ip của host web các bạn chạy lệnh
```
docker inspect laravel_webserver_1
```

Với 'laravel_webserver_1' là tên sever web mà chúng ta đã định nghĩa ở file docker-compose.yml. Các bạn chú ý đến dòng 
IpAdress : 172.0.0.2 (có thể khác nhau)
copy địa chỉ ip past vào trình duyệt để xem kết quả nhé.

6. Để làm việc trong máy ảo các bạn chạy lệnh sau
```
docker exec -it laravel_webserver_1 bash
```

Thử chạy lệnh
```
php artisan make:auth
```

Sau đó vào lại trình duyệt để xem kết quả. 
Các bạn thử register để xem đã kết nối với db chưa nhé.

# Kết luận.
Sau này các bạn chỉ cần copy ba file "docker-compose.yml",  "apache.conf" và Dockerfile vào thư mục gốc của project  và chạy các lệnh trên là các bạn đã dùng được docker rồi.

Hoặc đơn giản hơn các bạn có thể nghiên cứu laradock http://laradock.io/   là một môi trường phát triển dành cho PHP dựa trên Docker.