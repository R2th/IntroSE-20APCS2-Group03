![](https://images.viblo.asia/aa750a0f-d1aa-4631-81e5-571dfe9decff.jpg)


Phần giới thiệu trước, chúng ta đã cùng tìm hiểu và làm một vài ví dụ để biết về Docker từ đó giúp chúng ta [Tạo Môi Trường Dev và Production Nhanh](https://viblo.asia/p/docker-cho-laravel-project-tao-moi-truong-dev-va-production-nhanh-924lJmkzZPM) nếu bạn chưa xem qua về Docker thì bài viết đó sẽ giúp bạn có cái nhìn căn bản để thực hành dễ dàng hơn.

Hôm nay chúng ta sẽ cùng tìm hiểu và sử dụng Laradock cho dự án Laravel nhé. Ngay từ cái tên của công cụ này đã cho thấy chức năng của nó mà bạn có thể đoán được ngay:

Laradock là viết tắt cho hai từ **Laravel** và **Docker** 

### 1. Laradock có gì đặc biệt ?

Ngoài sự khác biệt kể trên thì nó mang đến một mục đích cao hơn cho những PHP developer 

> Laradock is a full PHP development environment for Docker.
> 
> It supports a variety of common services, all pre-configured to provide a ready PHP development environment.

- Dễ dàng chuyển đổi các phiên bản PHP
- Chọn database mong muốn cho dự án: MySQL, Postgres, MariaDB
- Chạy trên stack của riêng bạn : Memcached, HHVM, RabbitMQ…
- Chỉnh sửa Dockerfile 
- Có sẵn base image để bạn extend sử dụng
- Cấu hình sẵn Nginx host 
- Tùy mong muốn khi chọn 1 laradock cho từng project hoặc tất cả project với 1 laradock cấu hình

Với rất nhiều tính năng cấu hình tất cả các services cho mục đích phát triển PHP kể trên thì chắc chắn sẽ đủ để bạn chăm lo coding thật ngon, phần việc cấu hình thế nào thì laradock sẽ làm :D 

### 2. Tích hợp Laradock vào dự án

Giờ đây chúng ta cùng tích hợp vào project xem bên trong nó có gì nhé :stuck_out_tongue_winking_eye:

- Nếu bạn chưa có project nào thì chỉ cần cd đến folder vị trí cần tạo rồi kéo code trên github về như dưới:

`git clone https://github.com/Laradock/laradock.git`

(*Hình ảnh dưới*)
![](https://images.viblo.asia/8c982b04-1535-4baa-8121-2d7613b64c6c.png)


- Đã có project rồi thì dùng lệnh sau để tích hợp:

`git submodule add https://github.com/LaraDock/laradock.git`

Kết quả sẽ được như sau:

```
* project-a
*   laradock-a
* project-b
*   laradock-b
```

Hoặc 1 laradock cho nhiều projects khác thì cấu trúc thư mục như sau :

```
* laradock
* project-1
* project-2
```

**Tạo ra file env**

`cp env-example .env`

**Chỉnh sửa**

APP_CODE_PATH_HOST=../web

Nơi chứa code của bạn

**Một số biến môi trường:**

`DATA_PATH_HOST=~/.laradock/data_vietlara`

Đây là biến môi trường chỉ ra vị trí lưu trữ cơ sở dữ liệu của project trên máy thật của bạn để map với cơ sở dữ liệu trong laradock

**COMPOSE_PROJECT_NAME=compose_vietlara**

Biến môi trường này dùng để phân biệt các laradock khác nhau của các project khác nhau. Ví dụ, bạn có 2 project mà cùng muốn dựng laradock lên trong một lúc, khi đó bạn cần có tên để phân biệt laradock này của project nào, biến môi trường

`PHP_VERSION=7.2`

Dễ rồi đây là phiên bản php bạn muốn dùng

`WORKSPACE_INSTALL_MYSQL_CLIENT`

Cài đặt Mysql-client vào workspace. Sau này sẽ cần khi backup dữ liệu. Nếu code của bạn cần thêm gì (yarn, ioncube ...) thì enable nó lên

**Config database cho mariadb nha:**

MARIADB_DATABASE=vietlaradockdb
MARIADB_USER=vietlaralearn
MARIADB_PASSWORD=SuperSecretPassword
MARIADB_PORT=3306
MARIADB_ROOT_PASSWORD=$vietlearnDock
MARIADB_ENTRYPOINT_INITDB=./mariadb/docker-entrypoint-initdb.d

**Giờ bạn config site**

Chuyển đến thư mục **nginx.sites** bạn có thể thêm 1 file conf cho site của mình hoặc dùng luôn file default nếu chỉ có 1 site.

(Như hình ảnh)

![](https://images.viblo.asia/c129cc8e-2b06-4fb3-95ae-63d28648e5c9.png)


Đây là config cho nginx còn nếu apache thì chuyển đến folde *apache2/sites* nhé

**Vào workspace để chạy một vài lệnh**

`docker-compose exec --user=laradock workspace bash`

Giờ bạn đã ở trong workspace container. Mọi thay đổi trong này cũng sẽ thay đổi code bên ngoài do đã được "volume"

Một số lệnh như :

```
composer install
php artisan migrate
php artisan key:genarate
```

**Chỉnh sửa file .env của project:**

MARIADB_DATABASE=vietlaradockdb
MARIADB_USER=vietlaralearn
MARIADB_PASSWORD=SuperSecretPassword
MARIADB_PORT=3306
MARIADB_ROOT_PASSWORD=$vietlearnDock
MARIADB_ENTRYPOINT_INITDB=./mariadb/docker-entrypoint-initdb.d

Và bây giờ bạn thử chạy trên trình duyệt xem kết quả:

![](https://images.viblo.asia/30323487-b560-4c11-945e-e8f5c03b1dc2.png)


Như vậy là bạn đã hoàn thành việc tích hợp Laradock vào trong project của mình.

Sự tiện lợi của laradock so với docker là mọi image đã được tạo sẵn và cần dùng cái gì thì khai báo cái đó là xong mà không phải tạo từng file như : 

> docker-compose.yml : Định nghĩa tất cả các service môi trường sẽ được cho trong này
> 
> app.dockerfile: service app cho docker compose ở file .yml
> 
> web.dockerfile: web service cho compose ở trên
> 
> vhost.conf: chứa config cho web service

### 3. Tổng kết 

Mình hy vọng với những thông tin trên đây những bạn đang có dự định sẽ dùng docker cho dự án tìm thấy sự hữu ích. Mọi config cấu hình đã được tạo sẵn và bạn chỉ cần edit nó theo đúng với project mong muốn hiện tại, thời gian còn lại để bạn chăm lo code ngon hơn. Happy new year 2021!!! :cowboy_hat_face: