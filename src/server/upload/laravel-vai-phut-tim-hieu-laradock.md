Thời gian gần đây, Docker đang là một hot trend mà hầu hết các anh em developer đều đã có lần nghe qua. Do mình cũng đang mò mẫm làm một cái `Pet Project` liên quan về Laravel nên tiện chia sẽ một tí về **Laradock** cho những anh em nào còn chưa biết.

**Laradock** hiểu nôm na là Docker cho **Laravel**, một package đầy đủ toy cho PHP/Laravel nói chung.

Một ngày nào đó các anh em sẽ gặp vấn đề đau đầu về việc config môi trường để deloy product, với **Laradock** mình nghĩ nó sẽ giúp hữu ích trong việc giải quyết rắc rối này cho các anh em.

Giới thiệu một tí đây là link gốc bài viết mình :smile:

**[https://hungphamdevweb.com/larvel-vai-phut-tim-hieu-laradock.html](https://hungphamdevweb.com/larvel-vai-phut-tim-hieu-laradock.html)**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/z6zx4lug4y_docker.jpg)

## Laradock Có Gì Hot?

* Cung cấp đầy đủ môi trường phát triển cho PHP.
* Hỗ trợ hầu hết các framework hoặc CMS được viết bằng PHP phổ biến hiện nay:
* Codeigniter, Symfony, WordPress, Drupal …bla…bla
* Hỗ trợ nhiều phiên bản PHP và dễ dàng chuyển đổi giữa các phiên bản: PHP 7.0, 5.6 …
* Support nhiều Database Engines thông dụng: MySQL, Postgres, MariaDB, Neo4J, MongoDB…
* Có nhiều đồ chơi cho Cache Engines: Redis, Memcached, Aerospike.
* Có nhiều tools như: Composer, Node, Gulp, PhpMyAdmin, ElasticSearch, Vim …bla…bla
* PHP handler: PHP FPM – HHVM

## Cài Đặt Và Sử Dụng

Để sử dụng **Laradock**, cần phải cài đặt docker và docker compose.

Đầu tiên git clone **Laradock** về project, các anh em run command bên dưới nhá:

```
git clone https://github.com/laradock/laradock.git
```

Cấu trúc thư mục sau khi các anh em git clone **Laradock** về như sau:

```
your project
- laradock
 ```
 
 Truy cập thư mục **Laradock** và đổi tên `.env-example` thành `.env`.

Để config mọi thứ về truy cập thì anh em sẽ vào file `.env` này trong **Laradock** để thiết lập kết nối.

```
cp env-example .env
```

Bắt đầu chạy container để thiết lập môi trường chạy phù hợp với project của mình.

Tuỳ vào mục đích nhu cầu sử dụng của các anh em, bản thân **Laradock** có rất nhiều container khác nhau, ở đây mình sử dụng **Laravel** nên dưới đây là một ví dụ của mình:

```
docker-compose up -d nginx mariadb phpmyadmin workspace
```

**Laradock** còn có các container bao gồm: `hhvm`,  `php-fpm`, `mysql`, `redis`, `postgres`, `neo4j`, `mongo`, `apache2`, `caddy`, `memcached`, `beanstalkd`, `beanstalkd-console`, `rabbitmq`, `aerospike`, `pgadmin`, `elasticsearch`, `rethinkdb`.

Cuối cùng là mở trình duyệt và truy cập đường dẫn sau khi đã run xong cái container `http://localhost`

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ye2bpcp1sk_docker-compose.jpg)

## Một Số Config Khác

#### Thực hiện các câu lệnh như Artisan, Compose, Gulp,…

Các câu lệnh composer, database migration, phpunit, npm, gulp,… có thể được thực thi bên trong container `workspace`:

```
docker-compose exec workspace bash
#or 
docker exec -it workspace bash
```

#### Cấu hình port cho database

Thay đổi cổng access Mariadb database:

Định dạng: `<host port>: <cotainer port>`

```
ports:
    - "1111:6379"
    # ...
```

Sau khi thay đổi các anh em cần phải restart lại container đó bằng dòng lệnh bên dưới như sau:

```
docker restart <container_name>
#or 
docker-compose up -d <container_name>
```

#### Xem log của container

Logs của NGINX serrver được đặt trong thư mục `logs/nginx`.

Ngoài ra để xem log của các chương trình khác (MySQL, PHP-FPM,…) các anh em có thể dùng lệnh như sau:

```
docker logs <container_name> 
```

Mọi thắc mắc vui lòng để lại bình luận nhé, thân ái và quyết thắng :smile_cat: :smile_cat: :smile_cat: