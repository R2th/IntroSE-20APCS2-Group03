Xin chào 500 anh em Viblo. Ngày hôm nay mình sẽ chia sẻ tới mọi người một library mà bộ phận mình đang sử dụng để dựng môi trường phát triển cho PHP/Node.js một cách nhanh chóng. Đó chính là [Docker PHP Development](https://github.com/sun-asterisk-research/docker-php-development).

## Giới thiệu chung

Docker PHP Development là tổng hợp các file cấu hình docker-compose mà team mình đã tạo ra để thuận tiện cho việc sử dụng trong các dự án PHP/Node.js của bộ phận. Với khoảng 14 service thường dùng đã được cấu hình sẵn bằng docker-compose như:
- Traefik
- PHP / Node.js / Redis
- MySQL / MariaDB / Postgres
- PHPMyadmin / Pgadmin - Postgres Tool
- Elasticsearch
- Echo Server
- Minio
- Mailhog

Trong đó thì Traefik sẽ là Reverse Proxy cho toàn bộ các web service. Bạn chỉ cần khai báo các service mà bạn cần dùng, thay đổi một vài biến environment trong file `.env` và chạy script được cung cấp sẵn là PHP/Node.js app sẽ có thể truy cập được ngay trên browser. Quả là tiện lợi phải không nào? :laughing: 

## Tại sao nên sử dụng

- Setup nhanh chóng, dễ dàng
- Cung cấp các script có sẵn, tiện lợi khi sử dụng
- Tích hợp sẵn dành cho Laravel
- Do dùng Docker nên giúp cô lập môi trường phát triển với máy thật và các dự án với nhau
- Giúp bạn làm quen, luyện tập kỹ năng sử dụng Docker, tham khảo các config mà team mình đã tạo ra trong lib
- Dễ dàng setup mở rộng qua việc sử dụng Docker

## Nhược điểm

Do sử dụng Traefik + Docker nên nếu chưa dùng Traefik thì sẽ hơi bỡ ngỡ ban đầu. Tuy nhiên, cấu hình Traefik rất ngắn và rất đơn giản nên bạn đọc qua document trong 5, 10 phút là đã hiểu và có thể tùy biến lại reverse proxy khi cần.

Ngoài ra, sẽ có những case đặc biệt tùy dự án của bạn mà bạn sẽ cần chỉnh sửa hoặc override lại config. Do đó, các kiến thức cơ bản về sử dụng network, volume cũng sẽ cần bạn nắm được.

Rồi, bây giờ hãy cùng khám phá cách sử dụng Docker PHP Development nhé!

## Cách sử dụng Docker PHP Development

### Cài đặt

Để sử dụng Docker PHP Development, bạn chỉ cần clone repo của nó về trên máy bạn. Ví dụ, mình clone Docker PHP Development về lưu vào thư mục `docker` sẽ chạy lệnh sau:

```bash
git clone git@github.com:sun-asterisk-research/docker-php-development.git docker
```

Khi sử dụng Docker PHP Development, mình khuyến khích nên đặt cấu trúc thư mục của dự án theo mẫu sau cho dễ quản lý:

```bash
~/k/sample-project> tree -L 1
.
├── docker => docker-php-development
├── php    => chứa sourcecode php
└── web    => chứa sourcecode web nodejs
```

### Cách sử dụng

Ở trên mình trình bày ra trong bài để mọi người hiểu nên hơi dài chứ việc sử dụng thực tế thì rất đơn giản:

1. Clone repo về thư mục `docker` như trên.
2. Tạo file `services` và `.env` từ các file mẫu tương ứng là `services.example` và `.env.example`.
3. Thay đổi biến môi tường trong `.env`, khai báo tên các service cần dùng vào file `services`.
4. Chạy script `./project up` để chạy các service được khai báo lên.
5. Truy cập web trên browser để kiểm tra kết quả.

### File cấu hình .env

File `.env` là file chứa các biến môi trường sẽ được docker-compose đọc và gán lại vào trong file config. Mỗi project sẽ có các thông số khác nhau như domain, port, đường dẫn tới thư mục chứa sourcecode... Bạn có thể tùy chỉnh lại bằng cách thay đổi giá trị các biến môi trường trong file `.env`.

File `.env` được ignore bởi git. Sau khi clone về sẽ chưa có file này mà bạn cần tự tạo. Nội dung chúng ta sẽ lấy từ file mẫu là `.env.example`, bạn chỉ cần copy file lúc bắt đầu setup như sau:

```bash
cp .env.example .env
```

Các biến môi trường được cung cấp gồm:

| Tên biến | Giá trị mặc định | Mô tả |
| -------- | -------- | -------- |
| `COMPOSE_PROJECT_NAME`     | `php-dev`     | Prefix cho tên của container. VD: PHP container sẽ tên là `php-dev_php_1`     |
| `PATH_PHP`     | `../php`     | Đường dẫn tới thư mục sourcecode PHP của bạn, được mount vào container PHP     |
| `PATH_WEB`     | `../web`     | Đường dẫn tới thư mục sourcecode Node.js trên máy bạn, được mount vào container Node.js     |
| `PATH_DATA`     | `./data`     | Đường dẫn thư mục chứa data chung. VD: khi bật MySQL, thư mục data của MySQL sẽ được mount ra `./data/mysql` để sau khi restart/stop MySQL thì database trước đó vẫn còn tồn tại.     |
| `PATH_LOGS`     | `./logs`     | Thư mục chứa các file logs của các service như Traefik: Access log, error log..     |
| `DOMAIN`     | `example.localhost`     | Tên domain của website sẽ được sử dụng, hiện tại biến này đang dùng chung cho cả file cấu hình PHP, Node.js nên nếu bạn chạy các PHP và Node.js đồng thời thì sẽ cần sửa lại config.     |
| `PORT`     | 8000     | Tên port cho reverse proxy cho web PHP / Node.js. Dùng để truy cập PHP/Node.js trên browser.     |
| `DOMAIN_SECONDARY`     | `localhost`     | Domain được dùng cho trang Dashboard của Traefik     |
| `DB_DATABASE`     | `localhost`     | Tên database cần khởi tạo    |
| `DB_USERNAME`     | `localhost`     | Tên username truy cập vào database      |
| `DB_PASSWORD`     | `localhost`     | Mật khẩu để truy cập vào database     |
| `DB_PORT`     | `localhost`     | Port cho service database (Deprecated). Đã bị loại bỏ và không còn được sử dụng     |
| `HOSTS_FILE`     | `/etc/hosts`     | Đường dẫn tới file `hosts`, được mount vào trong docker giúp bạn có thể sử dụng virtual domain bên trong container     |

Trên đây là các environment mà bạn chỉ cần thay đổi cho phù hợp với dự án nhé.

### File cấu hình services

File `services` là file chứa tên file cấu hình của các service mà bạn muốn bật lên để sử dụng. Các file cấu hình này ở trong thư mục `compose`, bạn có thể xem qua.

Mỗi service được khai báo trong `services` cần đặt trên một dòng riêng và cần có một dòng trống ở cuối file. File này cũng được ignore khỏi Git nên khi setup bạn cần tạo nội dung từ file có sẵn là `services.example`.

Ví dụ service PHP, Echo Server được cấu hình trong file `compose/php.yml` và `laravel/echo-server.yml`, bạn muốn dùng cả hai service này thì thêm nội dung tương ứng vào file `services` là:
```markdown:services
php
laravel/echo-server

```

### Built-in commands

Dưới đây là các lệnh được tích hợp sẵn vào trong script `./project` mà bạn có thể sử dụng.

| Command | Mô tả | Ví dụ mẫu |
| -------- | -------- | -------- |
| `./project up`     | Chạy tất cả các services đã được khai báo lên     | `./project up` |
| `./project down`     | Tắt bỏ tất cả các services khi không dùng     | `./project down` |
| `./project sh <service>`     | Chui vào trong một container sử dụng sh shell      | `./project sh php` |
| `./project bash <service>`     | Chui vào trong một container sử dụng bash shell      | `./project bash php` |
| `./project exec <service> <command>`     | Chạy một command trong container      | `./project exec web yarn dev` |
| `./project ps`     | Xem danh sách các container đang chạy có prefix trùng với `COMPOSE_PROJECT_NAME`      | `./project exec web yarn dev` |

## Tổng kết

Trên đây là bài giới thiệu về library Docker PHP Development. Mời các bạn cùng sử dụng trải nghiệm nhé. Nếu bạn cần hỗ trợ hay thắc mắc gì đừng ngại comment vào phía dưới bài viết này mình cùng thảo luận nhé. Đừng quên cho mình 1 follow, upvote, clip nếu bạn thấy bài chia sẻ này hữu ích nha. Hẹn gặp lại mọi người trong những bài viết khác. :)

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***