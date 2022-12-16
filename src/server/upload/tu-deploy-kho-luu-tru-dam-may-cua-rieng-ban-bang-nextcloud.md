![](https://images.viblo.asia/92c5adf3-320e-4ac0-8153-2e87cb3f448d.png)

Mình chắc hẳn rằng bạn đã từng dùng, không ít thì nhiều, một trong các dịch vụ lưu trữ đám mây như **Google Drive, One Drive, hay Dropbox**,... Nhờ các dịch vụ này mà bạn có thể truy cập file ở bất cứ đâu, trên bất cứ thiết bị nào, dễ dàng chia sẻ và làm việc chung cùng người khác, hay đơn giản là một lớp phòng vệ cho trường hợp dữ liệu lưu ở máy bị thất lạc.

**Nextcloud** cũng là một phần mềm giúp tạo một hệ thống lưu trữ đám mây. Điểm khác biệt là Nextcloud **hoàn toàn mã nguồn mở và miễn phí**. Vì thế nên bất cứ ai cũng có quyền sử dụng Nextcloud để tạo ra được một kho lưu trữ đám mây của riêng mình!

Vậy tại sao lại phải chọn Nextcloud thay thì các "ông lớn" như Google Drive? Đây chủ yếu là tùy theo sở thích của mỗi người, nhưng về cơ bản thì tự mình deploy Nextcloud giúp bạn có toàn quyền kiểm soát dữ liệu của mình, khỏi bận tâm về **vấn đề quyền riêng tư** vốn đang rất nhức nhối, và mức giá có thể sẽ rẻ hơn nữa.

Ở bài viết này, mình xin được cùng các bạn deploy một hệ thống Nextcloud hoàn chỉnh qua **Docker, Docker Compose, Mariadb và Caddyserver v2**. 

# Chuẩn bị
Trước hết, để bắt tay vào cài đặt Nextcloud, bạn cần trang bị sẵn những thứ sau:
- Tên miền tùy ý
- VPS với cấu hình tàm tạm và dung lượng đủ xài (hoặc có thể là một Raspberry Pi tại gia cũng được)
- Kiến thức cơ bản về quản trị server linux và làm việc với docker, docker-composse.

Trong bài, mình sẽ kỳ vọng rằng máy chủ/VPS của bạn đã **có sẵn đầy đủ công cụ cần thiết** (docker, docker-compose,...). Nếu bạn chưa cài đặt, bạn có thể xem hướng dẫn [cài đặt docker tại đây](https://docs.docker.com/engine/install/) và [cài đặt docker-compose tại đây](https://docs.docker.com/compose/install/).

# Tiến hành thiết đặt với docker-compose
## Cây thư mục
Sau khi cài đặt hoàn tất, cây thư mục của bạn vừa tạo sẽ trông như dưới đây:

```
nextcloud-compose/
├─ caddy/
│  ├─ Caddyfile
│  ├─ Dockerfile
docker-compose.yml
.env
```

## Tạo file `docker-compose.yml`
Ở file `docker-compose.yml` này, mình sẽ thiết lập 3 service: *nextcloud*, *mariadb* và *caddy*.

Mình chọn sử dụng file ảnh *nextcloud* ở dạng FPM. Vì file ảnh *nextcloud* này không chứa sẵn Apache (hay web server nào khác), mình chọn thiết đặt thêm Caddyserver v2 để làm nhiệm vụ reverse proxy. Ở đây, mình chọn **Caddyserver** thay cho Nginx bởi Caddy có file config ngắn gọn và đồng thời có thể tự động thiết đặt và renew SSL luôn.

Mình chọn sử dụng **Mariadb** làm database cho Nextcloud. Một vài dạng cơ sở dữ liệu khác được nextcloud hỗ trợ mà bạn có thể chọn là SQLite hoặc PostgreSQL.

Để dữ liệu được "sống sót" sau mỗi lần xóa và tạo lại container, mình sử dụng *named volume* của Docker với các tên volume: nextcloud_data, mariadb_data, caddy_data, caddy_config.

File `docker-compose.yml` sau cùng được viết như sau:

``` yml
version: '3'

services:
  nextcloud:
    image: nextcloud:fpm
    restart: on-failure:5
    volumes:
      - nextcloud_data:/var/www/html
    environment:
      - MYSQL_DATABASE=${DB_DATABASE}
      - MYSQL_USER=${DB_USER}
      - MYSQL_PASSWORD=${DB_PASSWORD}
      - MYSQL_HOST=mariadb

  mariadb:
    image: mariadb
    restart: on-failure:5
    volumes:
      - mariadb_data:/var/lib/mysql
    environment:
      - MYSQL_DATABASE=${DB_DATABASE}
      - MYSQL_USER=${DB_USER}
      - MYSQL_PASSWORD=${DB_PASSWORD}
      - MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}

  caddy:
    build:
      context: ./caddy
    restart: on-failure:5
    ports:
      - 80:80
      - 443:443
    volumes:
      - caddy_data:/data
      - caddy_config:/config
      - nextcloud_data:/var/www/html:ro
    environment:
      - DOMAIN=${DOMAIN}

volumes:
  mariadb_data:
  nextcloud_data:
  caddy_data:
  caddy_config:
```

## Khai báo các environment variable
Bạn sau đó cần khai báo các biến môi trường. Tạo file `.env` ở cùng thư mục với file `docker-compose.yml` và thêm các dữ liệu dưới đây cho phù hợp:

``` env
DB_DATABASE=nextcloud
DB_USER=nextcloud
DB_PASSWORD=PASSWORD_HERE
DB_ROOT_PASSWORD=ROOT_PASSWORD_HERE
DOMAIN=example.com
```

## Thiết đặt caddyserver
Ở trong thư mục `caddy`, bạn cần tạo 2 file có tên `Dockerfile` và `Caddyfile`.

File `Dockerfile` dùng để tạo ra file ảnh của Caddyserver với các config của mình:
``` Dockerfile
FROM caddy:2.3.0-alpine

COPY Caddyfile /etc/caddy/Caddyfile
```

File `Caddyfile` chứa các config dành cho Nextcloud:

``` Caddyfile
{$DOMAIN:localhost}

root * /var/www/html
file_server

php_fastcgi nextcloud:9000

redir /.well-known/carddav /remote.php/dav 301
redir /.well-known/caldav /remote.php/dav 301

@forbidden {
  path    /.htaccess
  path    /data/*
  path    /config/*
  path    /db_structure
  path    /.xml
  path    /README
  path    /3rdparty/*
  path    /lib/*
  path    /templates/*
  path    /occ
  path    /console.php
}

respond @forbidden 404
```

## Tải và cài đặt các container
Công việc lúc này chỉ còn là chạy một lệnh duy nhất.

```
docker-compose up --build -d
```

Sau khi hoàn tất chạy, (hy vọng là) Nextcloud đã được cài đặt thành công và có sẵn ở tên miền bạn đã chọn!

## Quá dài, ngại làm?
Nếu ngại làm theo từng bước hướng dẫn, bạn chỉ cần clone [repo từ github](https://github.com/tranxuanthang/nextcloud-compose) đã được cấu hình sẵn như hướng dẫn phía trên của mình:

``` shell
git clone git@github.com:tranxuanthang/nextcloud-compose.git
cd nextcloud-compose
cp .env.example .env
```

Sau đó bạn chỉ cần sửa lại thông tin trong tệp `.env` sao cho phù hợp và chạy lệnh:

```
docker-compose up --build -d
```

Thế là đã xong!

# Sử dụng Nextcloud
Khi mới truy cập Nextcloud lần đầu tiên, bạn sẽ được chào mừng bằng màn hình cài đặt tài khoản quản trị:

![Cài đặt tài khoản admin Nextcloud](https://images.viblo.asia/983aa515-0845-4c13-8324-3b6e7dea4bd5.png)

Sau khi nhập xong tên đăng nhập và mật khẩu của tài khoản admin mà bạn mong muốn, Nextcloud sẽ bắt đầu quá trình cài đặt tự động trong khoảng 1-2 phút. Ngay sau đó, bạn có thể bắt đầu sử dụng Nextcloud:

![Giao diện Nextcloud](https://images.viblo.asia/d1c385b0-53c9-4fdf-86a3-f175ef6773b5.png)

**Nextcloud** cũng có đầy đủ ứng dụng dành cho **Windows, Linux, macOS, Android, iOS**,... Các app đều hỗ trợ **khả năng sync folder** không khác gì Google Drive, cùng với khả năng đồng bộ lịch, danh bạ,... cũng như khả năng xem nhiều định dạng tệp phổ biến và nhiều tính năng khác. Để cài đặt app Nextcloud lên các thiết bị của bạn, bạn hãy truy cập vào https://nextcloud.com/install/# và làm theo hướng dẫn.

# Tham khảo
- https://caddy.community/t/example-docker-nextcloud-fpm-caddy-v2-webserver/9407
- https://hub.docker.com/_/nextcloud
- https://www.reddit.com/r/NextCloud/comments/gn7fdl/looking_for_caddy_v2_sample_config_for_nextcloud/
- https://docs.nextcloud.com//server/stable/admin_manual/installation/index.html#