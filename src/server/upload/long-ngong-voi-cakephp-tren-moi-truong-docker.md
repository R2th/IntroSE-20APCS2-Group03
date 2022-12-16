Bài viết này ngoài đưa ra 1 cách để cài đặt CakePHP trên môi trường Docker thì cũng lưu lại 1 quãng đường gian khổ mày mò của mình về sử dụng cái framework CakePHP rối rắm này.

# Phần mở đầu lằng nhằng luyên thuyên
Khi mà việc lập trình có tiện hơn 1 chút thì mình bắt đầu muốn học và làm nghiêm túc hơn, bắt đầu chuyển từ thói quen code win thành code trên 1 hệ điều hành kiểu Unix để sau còn deploy server. Và vấn đề to ở chỗ CakePHP khá là lằng nhằng để có thể code được trên HĐH kiểu Unix mình mới, lúc nào cũng báo thiếu gói `*-intl` mà mình hỏi mãi ở trên này không thấy giải pháp nào mình dùng được cả :( 

Sau đó ông bạn làm cùng đã bày cho giải pháp ảo hoá với Vagrant. Nhưng không hiểu mình xử lý thế nào mà lại cũng vẫn thiếu cái extension khó chịu kia. Và mình lại phải đi tìm hiểu 1 chút. Và cũng vỡ ra được vài điều. Vấn đề mình gặp hoá ra nhiều bác trước cũng gặp rồi và các bác ấy cũng đề xuất ra mấy mô hình. Mô hình mà dùng Vagrant kia là mô hình thế này:

![](https://images.viblo.asia/3ea4768d-c5f2-40c1-aa44-248d8063fddb.png)

Dùng máy ảo mình không thấy hiệu quả với mình. Mà kể cả hiệu quả thì việc dùng máy ảo tốn RAM mình cũng không thích. "Vũ khí" cũ của mình toàn là các loại thiếu tài nguyên nên kể cả khi dùng đồ này thì mình cũng thực sự rén.... Thế là mình lại phải về "tà đạo", mở đồ cũ code trên win lấy demo cho nhanh. :'(

Về lại "tà đạo" thuận tiện thật, nhưng lương tâm bứt rứt vô cùng. Mình lại phải cố gắng làm thế nào mà nó lại có thể chạy trên môi trường kiểu Unix kia. Và đành vượt qua nỗi sợ + đang dịch [bài](https://viblo.asia/p/thu-dung-serverless-framework-jets-ruby-4dbZN3jklYM), mình bắt đầu dấn thân tìm hiểu Docker. Và sơ sơ mình đã hiểu qua được mô hình của nó cũng như thích sự dùng đủ của containerization, không thích dùng ngốn nhưng ko dùng hết của virtualization.

![](https://images.viblo.asia/633a002e-7f9b-4947-9aba-58a4a4933eb6.png)

Và thế là tự mày mò cài đặt. Thế quái nào vẫn chả chạy :'( Việc gấp cần báo cáo nên mình đã xin cầu viện và 1 vị BrSE tốt bụng đã gọi thẳng mình lên gặp trực tiếp để debug luôn. Giờ nghĩ lại ông anh toàn đi debug cho thằng sinh viên này từ phỏng vấn tới tận giờ cũng ngại thật (bow)

Và sau cùng thì nó cũng chạy. Tuy nhiên giờ mình lại phải làm 1 cái project khác. Và chặng đường lại bắt đầu.
# Cố gắng lần 1(fail)
Đầu tiên, dựa vào bài dịch của các bác bên trên, mình đã chạy các lệnh sau:
```bash
$ mkdir app
$ cd app
```
Rồi chạy php:7.1.5-apache
```bash
$ docker run -it --rm -v ${PWD}:/usr/src/app php:7.1.5-apache bash
```
Sau đó chạy thêm các thư viện cần thiết và cài composer
```
root@f28aed5c29e7:/var/www/html# apt-get update && apt-get install -y libicu-dev libpq-dev libmcrypt-dev mysql-client git zip unzip 
root@f28aed5c29e7:/var/www/html# rm -r /var/lib/apt/lists/* && docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd 
root@f28aed5c29e7:/var/www/html# docker-php-ext-install intl mbstring mcrypt pcntl pdo_mysql pdo_pgsql pgsql zip opcache
root@f28aed5c29e7:/var/www/html# curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
```
Mọi thứ đều rất ok cho tới khi mình tạo Dockerfile và docker-compose.yml. Đúng là mọi thứ đã chạy, mỗi tội không biết project đi đâu mà lần :'( Làm sao để có thể code project được đây?

Tra cứu tiếp thì các hướng dẫn khác cũng không chạy nốt :( 
Tạm viết lại cái lần sai này để xem sau có thể sửa được nó thành đúng không hoặc có các bạn khác lấy ý tưởng để làm đúng vậy.
# Cố gắng lần 2: Khá trâu bò nhưng hiệu quả
Túng quá đâm mình liều. Download source code dạng zip của cakephp về rồi thêm vào source code ấy Dockerfile và docker-compose.yml.

Dockerfile như sau:
```docker
#start with our base image (the foundation) - version 7.1.5
FROM php:7.1.5-apache

#install all the system dependencies and enable PHP modules 
RUN apt-get update && apt-get install -y \  
      libicu-dev \
      libpq-dev \
      libmcrypt-dev \
      mysql-client \
      git \
      zip \
      unzip \
    && rm -r /var/lib/apt/lists/* \
    && docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
    && docker-php-ext-install \
      intl \
      mbstring \
      mcrypt \
      pcntl \
      pdo_mysql \
      pdo_pgsql \
      pgsql \
      zip \
      opcache

#install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

#set our application folder as an environment variable
ENV APP_HOME /var/www/html

#change uid and gid of apache to docker user uid/gid
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

#change the web_root to laravel /var/www/html/public folder
RUN sed -i -e "s/html/html\/webroot/g" /etc/apache2/sites-enabled/000-default.conf

# enable apache module rewrite
RUN a2enmod rewrite

#copy source files and run composer
COPY . $APP_HOME

# install all PHP dependencies
RUN composer install --no-interaction

#change ownership of our applications
RUN chown -R www-data:www-data $APP_HOME
```
Còn đây là docker-compose.yml
```docker
version: '3'
services:
  cakephp:
    build: .
    depends_on:
      - mysql
    links:
      - "mysql"
    ports:
      - "8765:80"  
    volumes:
      - .:/var/www/html/
    environment:
      - SECURITY_SALT=ashjg23697sds97139871298ashk  
      - MYSQL_URL=mysql
      - MYSQL_USERNAME=root
      - MYSQL_PASSWORD=root
  mysql:
    image: mysql:5.6
    volumes:
      - mysql-data:/var/lib/mysql
    environment:      
      - MYSQL_DATABASE=cakephp
      - MYSQL_ROOT_PASSWORD=root

volumes:
  mysql-data:
```
Ở `app.php` mình chỉnh như sau:
```php
'Datasources' => [
        'default' => [
            'className' => 'Cake\Database\Connection',
            'driver' => 'Cake\Database\Driver\Mysql',
            'persistent' => false,
            'host' => env('MYSQL_URL', null),
            /*
             * CakePHP will use the default DB port based on the driver selected
             * MySQL on MAMP uses port 8889, MAMP users will want to uncomment
             * the following line and set the port accordingly
             */
            //'port' => 'non_standard_port_number',
            'username' => env('MYSQL_USERNAME', 'root'),
            'password' => env('MYSQL_PASSWORD', ''),
            'database' => 'cakephp',
            /*
             * You do not need to set this flag to use full utf-8 encoding (internal default since CakePHP 3.6).
             */
            'encoding' => 'utf8',
            'timezone' => 'UTC',
            'flags' => [],
            'cacheMetadata' => true,
            'log' => false,

            /**
             * Set identifier quoting to true if you are using reserved words or
             * special characters in your table or column names. Enabling this
             * setting will result in queries built using the Query Builder having
             * identifiers quoted when creating SQL. It should be noted that this
             * decreases performance because each query needs to be traversed and
             * manipulated before being executed.
             */
            'quoteIdentifiers' => false,

            /**
             * During development, if using MySQL < 5.6, uncommenting the
             * following line could boost the speed at which schema metadata is
             * fetched from the database. It can also be set directly with the
             * mysql configuration directive 'innodb_stats_on_metadata = 0'
             * which is the recommended value in production environments
             */
            //'init' => ['SET GLOBAL innodb_stats_on_metadata = 0'],

            // 'url' => env('DATABASE_URL', null),
        ],
```
Chạy lần lượt các lệnh 
```
docker-compose build
docker-compose up
```
Sau đó nhập http://localhost:8765, nó sẽ cho giao diện thế này

![](https://images.viblo.asia/5eefbdb1-3dc1-4175-a8c1-ee7ebb80ba40.png)

Tất cả các thông số đều màu xanh. Chứng tỏ là project này hoàn toàn kết nối tới 1 database và bạn hoàn toàn có thể chiến đấu thoải mái.

Các bước tiếp theo về migrate, seed,... các bạn sẽ đọc ở blog của cloud66 mình đính kèm link dưới đây.

Tuy nhiên với bản thân mình thì còn cần tạo cả khung MVC với các bảng nữa nên mình sẽ để 1 terminal chạy `docker-compose up` ở 1 bên và mở terminal mới chạy lệnh sau:
```
docker exec -ti <tên của container chứa cakephp> /bin/bash 
```
Bạn sẽ có 1 cái terminal mới:

![](https://images.viblo.asia/854ea3ae-9cdb-4cf7-9238-808c0ae35824.png)

Với terminal này bạn có thể tuỳ ý chạy các command thông thường của CakePHP, ví dụ:
```
bin/cake bake migration CreateUsers
bin/cake bake all Users
```
À với cách này bạn phải tự tạo `.gitattributes` và `.gitignore` bằng tay nhé.
# Tổng kết
Tưởng như đơn giản mà làm không ra, rồi sai sót mấy lần. 

Cảm ơn các bạn đã đọc cái bài post lộn xộn này. Nội dung cũng thập cẩm này nọ thật. Rất mong các bạn thông cảm nếu thấy lằng nhằng
# Tham khảo
- https://tech.actindi.net/2019/02/01/184018
- https://blog.cloud66.com/deploying-your-cakephp-applications-with-cloud-66/