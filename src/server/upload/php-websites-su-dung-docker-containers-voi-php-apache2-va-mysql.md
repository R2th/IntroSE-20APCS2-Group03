***Xem lại series về các lệnh cơ bản trong docker:*** [***PHẦN 1***](https://viblo.asia/p/cac-lenh-co-ban-trong-docker-phan-1-ByEZkeYy5Q0), [***PHẦN 2***](https://viblo.asia/p/cac-lenh-co-ban-trong-docker-phan-2-bWrZnoJwlxw), [***PHẦN 3***](https://viblo.asia/p/cac-lenh-co-ban-trong-docker-phan-3-aWj53zMel6m)

**Docker** là một nền tảng để cung cấp cách để building, deploying và running ứng dụng dễ dàng hơn bằng cách sử dụng các containers. Trong bài viết này, mình sẽ nói lại việc mình build một website viết bằng PHP thuần của mình sử dụng apache2 và mysql bằng docker compose, mọi nguời cùng theo dõi và nếu thấy hay thì có thể cho mình 1 *star* trên repo github nha.

Mình có một project [selling-computer](https://github.com/trannguyenhan/selling-computer) được viết bằng PHP thuần, chạy trên máy chủ apache2 và sử dụng cơ sở dữ liệu là MySQL. Bây giờ mà một người nào đó muốn chạy project này của mình mà máy họ chưa có sẵn môi trường, cơ sở dữ liệu thì họ sẽ phải làm hàng tá việc trước khi project có thể chạy được. Vậy nên mình quyết định thử sức build toàn bộ project này để chúng chạy trên được docker, bạn có thể xem toàn bộ project tại đây [selling-computer-V2](https://github.com/trannguyenhan/selling-computer-V2), giờ thì việc chạy trở lên đơn giản hơn, bạn chỉ cần `clone` project về và chạy lệnh `docker-compose up`, sau đó truy cập vào cổng `8000` và xem kết quả.

Tiếp theo mình sẽ đi chi tiết từng bước mình làm để có được phiên bản [selling-computer-V2](https://github.com/trannguyenhan/selling-computer-V2).

## Cấu trúc thư mục 

Mình sẽ đi từ phần tổng quan trước sau đó đi tới từng phần cụ thể, về cấu trúc của project sẽ gồm các thư mục và các file như sau: 

```
- php-apache2
	- Dockerfile
	- my-apache2.conf
- sources
- README.md
- docker-compose.yml
```

## Thư mục chứa project

Thư mục `sources` sẽ là nơi chứa toàn bộ project của mình, đơn giản là mình sẽ copy toàn bộ file trong [selling-computer](https://github.com/trannguyenhan/selling-computer) vào trong thư mục `sources` này.

## Cấu hình docker

`docker-compose.yml` là file cấu hình mà từ đó `docker compose` sinh ra và quản lý các service.

File `docker-compose.yml` chứa những cấu hình như sau:

```yml
version: '3.8'
services:
    php-apache-environment:
        container_name: php-apache
        build:
            context: ./php-apache2
            dockerfile: Dockerfile
        depends_on:
          - db
        volumes:
            - ./sources/:/var/www/html/
        ports:
            - 8000:80
            
    db:
        container_name: db
        image: mysql
        restart: always
        environment:
            MYSQL_ROOT_PASSWORD: mysql12345
            MYSQL_DATABASE: selling_computer
            MYSQL_USER: trannguyenhan
            MYSQL_PASSWORD: mysql12345
        ports:
            - "9906:3306"
        volumes: 
            - ./sources/database/selling_computer.sql:/docker-entrypoint-initdb.d/dump.sql
```

- `version`: là khai báo phiên bản docker sẽ sử dụng
- `service`: khai báo lần lượt các service sẽ sử dụng trong project này.

### Mysql service

Khai báo mysql service với container `mysql` sử dụng trực tiếp từ official images của docker, do chúng ta không cần chỉnh sửa gì vì thế không cần phải tạo thư mục riêng để chứa các cấu hình thay đổi như image `php-apache`. 

Với container này chúng ta khai báo một số biến môi trường như `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD` và thay đổi trong file `sources/config/db_config.php` như sau để phù hợp với cấu hình: 

```php
<?php

define('DB_NAME', 'selling_computer');
define('DB_USER', 'trannguyenhan');
define('DB_PASSWORD', 'mysql12345');
define('DB_HOST', 'db');
define('DB_PORT', "3306");
```

Phần `volumes` để ánh xạ file `selling_computer.sql` vào trong thư mục `docker-entrypoint-initdb.d` của container `mysql`, sở dĩ phải làm như vậy là vì tất cả những file đặt trong `docker-entrypoint-initdb.d` sẽ được thực thi và nhập dữ liệu vào trong cơ sở dữ liệu và mình muốn nhập sẵn cơ sở dữ liệu của mình vào đây.

Ánh xạ port của `mysql` mặc định là `3306` từ container trong docker ra ngoài máy gốc là `9906`, điều này giúp bạn có thể truy cập vào cơ sở dữ liệu của project từ ngoài máy gốc thông qua cổng `9906`.

### Php-Apache2 service

Nếu sử dụng `apache2` trong image mặc định thì project sẽ không chạy được vì một số lý do như `apache2` không đọc được file `.htaccess` vì thế chúng ta cần phải thay đổi một số cấu hình của container `php-apache`.

Đầu tiên chúng ta sửa lại file `/etc/apache2/apach2.conf`, thế nên mình copy file `apache2.conf` của mình thành một file đặt tên là `my-apache2.conf` và ánh xạ nó vào vị trí của file `apache2.conf` trong container với lệnh như sau: 

```Dockerfile
COPY my-apache2.conf /etc/apache2/apach2.conf
```

Sau đó là chạy `a2enmod rewrite` và cài đặt một số thư viện cần thiết, cuối cùng chúng ta có một file Dockerfile như sau: 

```Dockerfile
FROM php:7.4-apache

COPY my-apache2.conf /etc/apache2/apach2.conf
RUN a2enmod rewrite

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt-get update && apt-get upgrade -y
```

## Chạy project

Chạy project với lệnh: 

```bash
docker-compose up
```

Sau đó truy cập vào cổng `8000` để xem kết quả: 

![](https://images.viblo.asia/348d63ef-6602-4fad-b21c-65e1009eec1d.png)

Như vừa mình đã viết ở phần trên, để truy cập vào cơ sở dữ liệu bạn vào thông qua máy gốc tại cổng `9906` với Mysql Workbench như sau: 

![](https://images.viblo.asia/9cd15728-062d-4ba2-b478-a35eee4544fb.png)

![](https://images.viblo.asia/e8943e7a-dae5-44e7-ab33-914349c98398.png)