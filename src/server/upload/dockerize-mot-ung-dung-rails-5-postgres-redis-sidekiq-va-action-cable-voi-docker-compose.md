Sau bài viết này, bạn sẽ hiểu những lợi ích của việc sử dụng Docker là gì và sẽ có thể:
* Cài đặt Docker trên tất cả các nền tảng trong vòng 5 phút.
* Chạy một ứng dụng Rails 5+ sử dụng các phương pháp tốt.
* Biết cách viết Dockerfile.
* Chạy nhiều Docker container với Docker Compose.

## Docker là gì và tại sao nó hữu ích?
Docker cho phép bạn đóng gói một ứng dụng hoặc dịch vụ với tất cả các dependencies của nó vào một đơn vị được tiêu chuẩn hóa. Đơn vị này được gọi là Docker image.

Tất cả mọi thứ ứng dụng cần để chạy đều được chứa trong đó. Docker image chứa code, runtime, thư viện hệ thống và bất cứ thứ gì bạn cài đặt trên máy chủ để làm cho nó chạy nếu bạn không sử dụng Docker.

## Cài đặt Docker
Việc cài đặt Docker được hướng dẫn chi tiết tại [Docker’s documentation](https://docs.docker.com/install/)
### Đảm bảo rằng Docker và Docker Compose hoạt động
Trước khi tiếp tục, bạn nên kiểm tra:
```
docker --version
> Docker version 17.06.0-ce, build 02c1d87

docker-compose --version
> docker-compose version 1.14.0, build c7bdf9e
```
## Tạo một ứng dụng rails
Ta có thể sử dụng `rails new` để tạo một project mới và xây dựng nó, nhưng sẽ nhanh hơn nếu sử dụng một ứng dụng có sẵn.

Ta sẽ sử dụng một ứng dụng cơ bản cung cấp bởi orats. Nó là một [công cụ mã nguồn mở để tạo một project rails](https://github.com/nickjj/orats).

### Cài đặt orats
`gem install orats`
### Tạo một project mới
```
# Feel free to generate the project anywhere you want.
orats new /tmp/my_dockerized_app
```
## Dockerize cho ứng dụng Rails
Có một vài điều ta cần làm để Dockerize ứng dụng.
### Logging
Để log hoạt động đúng, Docker cần ứng dụng của ta ghi log vào STDOUT. Đây là một ý tưởng tốt vì việc quản lý log sẽ tách khỏi ứng dụng của bạn. Bạn có thể lựa chọn để Docker ghi log vào syslog hoặc một local service  đang chạy trên máy chủ của bạn hoặc sử dụng bên thứ 3 như Loggly.

Trong tất cả các trường hợp, bạn cần thực hiện một điều chỉnh nhỏ cho ứng dụng Rails của bạn:
```
# config/application.rb : Lines 21-24

logger           = ActiveSupport::Logger.new(STDOUT)
logger.formatter = config.log_formatter
config.log_tags  = [:subdomain, :uuid]
config.logger    = ActiveSupport::TaggedLogging.new(logger)
```
Ta vừa thiết lập rails ghi log vào STDOUT và thiết lập một format tùy chỉnh để bao gồm cả subdomain và uuid vào mỗi phần tử log.
### Các tệp của Docker
Thư mục gốc của project có một vài tệp của Docker:
```
nick@oriath:/tmp/my_dockerized_app ⚡ ls -la
-rw-rw-r--  1 nick nick    3507 Jul  7 10:50 .env
-rw-rw-r--  1 nick nick    1032 Jul  7 10:50 docker-compose.yml
-rw-rw-r--  1 nick nick    4353 Jul  7 10:50 Dockerfile
-rw-rw-r--  1 nick nick     49  Jul  7 10:50 .dockerignore
```

Tệp duy nhất cần thiết là `Dockerfile` nhưng bạn sẽ thấy hầu hết các ứng dụng web đều sẽ chứa một số tệp khác.

**Dockerfile**

Hãy bắt đầu với `Dockerfile` bởi vì để nói về các tệp khác sẽ đòi hỏi phải có một chút kiến thức về cách Docker image được xây dựng như thế nào.

Bạn có thể coi tệp này như là thiết kế của Docker image của bạn. Khi chạy lệnh `docker build` các dòng trong tệp này sẽ được thực thi từ trên xuống. Nó sẽ chạy tất cả các lệnh trong context của Docker image.

```
FROM ruby:2.5-alpine

RUN apk update && apk add build-base nodejs postgresql-dev

RUN mkdir /app
WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install --binstubs

COPY . .

LABEL maintainer="Nick Janetakis <nick.janetakis@gmail.com>"

CMD puma -C config/puma.rb
```
Tại thời điểm này, ta có thể xây dựng image và có thể truy cập vào ứng dụng rails. Nhưng hãy tránh làm điều đó vào lúc này.

**.dockerignore**

Tiếp theo là tệp `.dockerignore`

```
.git
.dockerignore
.byebug_history
log/*
tmp/*
```
Tệp này tương tự như tệp `.gitignore`. Nó cho phép bạn liệt kê các danh sách đen các thư mục hoặc tệp nhất định.

**docker-compose.yml**

Docker Compose là một công cụ chính thức được cung cấp bởi Docker. Nó là một tiện ích giúp bạn soạn thảo các lệnh Docker và quản lý nhiều container một cách dễ dàng.
```
version: '2'

services:
  postgres:
    image: 'postgres:10.3-alpine'
    volumes:
      - 'postgres:/var/lib/postgresql/data'
    env_file:
      - '.env'

  redis:
    image: 'redis:4.0-alpine'
    command: redis-server --requirepass yourpassword
    volumes:
      - 'redis:/data'

  website:
    depends_on:
      - 'postgres'
      - 'redis'
    build: .
    ports:
      - '3000:3000'
    volumes:
      - '.:/app'
    env_file:
      - '.env'

  sidekiq:
    depends_on:
      - 'postgres'
      - 'redis'
    build: .
    command: sidekiq -C config/sidekiq.yml.erb
    volumes:
      - '.:/app'
    env_file:
      - '.env'

  cable:
    depends_on:
      - 'redis'
    build: .
    command: puma -p 28080 cable/config.ru
    ports:
      - '28080:28080'
    volumes:
      - '.:/app'
    env_file:
      - '.env'

volumes:
  redis:
  postgres:
```

**.env**

Tệp này không phải là một phần về mặt kỹ thuật của Docker, nhưng nó được sử dụng bởi Docker và ứng dụng Rails.
Mặc định, Docker Compose sẽ tìm kiếm tệp `.env` trong cùng thư mục với tệp `docker-compose.yml`
Ta có thể đặt các biến môi trường ở đây. Ví dụ:
```
COMPOSE_PROJECT_NAME=my_dockerized_app
```
## Chạy ứng dụng Rails
Bạn có thể chạy mọi thứ bằng cách gõ `docker-compose up --build`.
Sau khi lệnh `up` kết thúc, mở một cửa sổ lệnh mới và kiểm tra những gì đã được tạo ra.
### Docker images
Chạy `docker images`:
```
mydockerizedapp_cable     latest              ...         392 MB
mydockerizedapp_sidekiq   latest              ...         392 MB
mydockerizedapp_website   latest              ...         392 MB
postgres                  10.3-alpine         ...         39.5 MB
redis                     4.0-alpine          ...         27.5 MB
ruby                      2.5-alpine          ...         60.7 MB
```
Docker Compose tự động kéo Redis và Ruby cho bạn, sau đó xây dựng các image webside, sidekiq và cable.
### Docker containers
Chạy `docker-compose ps`:
```
Name                        State   Ports          
-------------------------------------------------------------------
mydockerizedapp_cable_1      ...   Up      0.0.0.0:28080->28080/tcp
mydockerizedapp_postgres_1   ...   Up      5432/tcp
mydockerizedapp_redis_1      ...   Up      6379/tcp
mydockerizedapp_sidekiq_1    ...   Up                              
mydockerizedapp_website_1    ...   Up      0.0.0.0:3000->3000/tcp
```
Docker Compose tự động đặt tên container cho bạn, và nó chèn thêm `_1` vì nó đang chạy 1 thể hiện của Docker image. Docker Compose hỗ trợ mở rộng quy mô nhưng nó vượt ra ngoài phạm vi của bài viết này.
### Hiển thị trang web
Nếu sử dụng Docker nguyên bản, bạn có thể truy cập `http://localhost:3000`

Nếu bạn cài đặt Docker thông qua Docker Toolbox bạn cần thực hiện 3 thay đổi cho tệp `.env`:
```
# Open the .env file and find these values:
ACTION_MAILER_HOST=localhost:3000
ACTION_CABLE_FRONTEND_URL=ws://localhost:28080
ACTION_CABLE_ALLOWED_REQUEST_ORIGINS=http:\/\/localhost*

# Replace `localhost` with your Docker Machine IP address:
ACTION_MAILER_HOST=192.168.99.100:3000
ACTION_CABLE_FRONTEND_URL=ws://192.168.99.100:28080
ACTION_CABLE_ALLOWED_REQUEST_ORIGINS=http:\/\/192.168.99.100*
```
Người dùng Toolbox cần thay đổi một vài thể hiện của `localhost` thành `192.168.99.100` hoặc bất cứ địa chỉ IP nào của Docker Machine. Bạn có thể xác định IP bằng cách chạy `docker-machine ip`. Để mở trang web, truy cập `http://192.168.99.100:3000`.
Lúc này bạn sẽ nhận được lỗi cơ sở dữ liệu không tồn tại. Điều này là do ta chưa reset cơ sở dữ liệu.
### Tương tác với ứng dụng Rails
Phần nãy sẽ cho thấy làm thế nào để chạy lệnh rails thông qua Docker và làm thế nào để khởi tạo một Rails database.

**Reset cơ sở dữ liệu**

```
docker-compose exec --user "$(id -u):$(id -g)" website rails db:reset
```

**Migrate cơ sở dữ liệu**

```
docker-compose exec --user "$(id -u):$(id -g)" website rails db:migrate
```
Docker Compose có lệnh `exec` cho phép thực thi lệnh trên một container đang chạy. 
Option `--user "$(id -u):$(id -g)"` đảm bảo rằng mọi file tạo ra khi thực thi lệnh `exec` được sở hữu bởi user chứ không phải root.
Bây giờ ta có thể truy cập được trang web trên trình duyệt.
## Kết luận
Docker thật tuyệt vời. Bây giờ bạn có thể chạy các project của mình trên các nền tảng khác mà không phải lo lắng về sự phụ thuộc vào nền tảng.
## Tham khảo
[https://nickjanetakis.com/blog/dockerize-a-rails-5-postgres-redis-sidekiq-action-cable-app-with-docker-compose](https://nickjanetakis.com/blog/dockerize-a-rails-5-postgres-redis-sidekiq-action-cable-app-with-docker-compose)