Nếu như bạn là một developer đã từng có chân trong nhiều dự án cùng lúc thì chắc hẳn bạn cũng đã từng gặp phải những vấn đề khó chịu liên quan đến phiên bản hay thư viện được sử dụng trong mỗi dự án đó. Để rồi mỗi khi chuyển đổi qua lại giữa các môi trường bạn lại phải mất công setup lại đủ thứ. Hay đơn giản hơn là việc code trên máy công ty thì chạy, nhưng khi về đến nhà, bạn mở máy ra code những đoạn code còn dang dở thì lại không hiểu tại sao nó lại không thể chạy được nữa. Đó cũng chính là lúc bạn sẽ nghĩ đến docker. Với khẩu hiệu **“build once, run anywhere“**, chắn chắn những vấn đề trên sẽ không còn khiến bạn phải đau đầu thêm nữa. Ngày hôm nay chúng ta sẽ cùng nhau dựng một ứng dụng Ruby on Rails trên môi trường Docker.
## Docker compose
Trước khi đi vào vấn đề chính, chúng ta cần phải xác định rõ những container nào sẽ được tạo cũng như phuơng thức giao tiếp giữa chúng.
* Đầu tiền là container `app` có nhiệm vụ xử lý logic chính của ứng dụng.
* Tiếp theo là container `db` sẽ là nơi lưu trữ dữ liệu.
* Cuối cùng là container `nginx` đảm nhận chức năng là web server.

Đó cũng chính là những thành phần cơ bản nhất của một ứng dụng web bất kỳ. Việc xác định những thành phần này cũng hết sức quan trọng, vì nó cho bạn một cái nhìn tổng quan về toàn bộ hệ thống, chức năng của mỗi thành phần để từ đó tối ưu các container cho phù hợp. Dưới đây là nội dung file `docker-compose.yml`, nó giống như là một tài liệu chỉ dẫn để build image cũng như quan hệ giữa các container với nhau:

```yml
version: "3.7"

services:
  nginx:
    build:
      context: docker/nginx
      dockerfile: Dockerfile
      args:
        - HOST=${HOST}
    depends_on:
      - app
    ports:
      - 80:80
      - 443:443
    env_file:
      - .env

  app:
    depends_on:
      - db
    env_file:
      - .env
    ports:
      - 3000:3000
    build:
      context: .
      dockerfile: docker/app/Dockerfile
    volumes:
      - .:/app
      - bundle_data:/bundle
    command: sh /scripts/command.sh
    stdin_open: true
    tty: true

  db:
    image: mysql:5.7
    restart: on-failure
    env_file:
      - .env
    environment:
      - MYSQL_ROOT_PASSWORD=${DATABASE_ROOT_PASSWORD}
      - MYSQL_DATABASE=${DATABASE_NAME}
      - MYSQL_USER=${DATABASE_USERNAME}
      - MYSQL_PASSWORD=${DATABASE_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
  bundle_data:
```
Trong file `docker-compose.yml`, ở mỗi block chúng ta để ý tới những chi tiết sau:

* `build`:
    * `context`: Đây là nơi định nghĩa nơi `Dockerfile` sẽ được chạy.
    * `dockerfile`: Chỉ định docker file sẽ được sử dụng để build.
    * `args`: Các giá trị truyền thêm vào trong `Dockerfile`
* `depends_on`: Định nghĩa ràng buộc giữa các container với nhau, sử dụng thay thế cho `links`.
* `volumes`: Xác định vùng nhớ của máy chủ sẽ được mount vào trong container.
* `env_file`: Là vị trí file env, bạn có thể dùng các biến env này ở bất cứ đâu trong file` docker-compose.yml`.
* `environment`: Là nơi xác định các biến môi trường trong container.
* `command`: Đây là file sh sẽ được chạy khi container được start.
 
## Dockerfile
Để thuận tiện cho việc quản lý, chúng ta sẽ tạo ra những thư mục tuơng ứng với từng thành phần, với `app` và `nginx` các thư mục tương ứng của chúng lần lượt là `docker/app`,  `docker/nginx`.

#### Config app
Dưới đây là nội dung `docker/app/Dockerfile` nơi chúng ta sẽ chỉ định những thành phần tạo nên image `app` để từ đó build thành container `app`:

```docker
ARG RUBY_VERSION=2.6.6

FROM ruby:${RUBY_VERSION}-slim-buster

WORKDIR /app

COPY Gemfile* ./

COPY package.json ./

COPY yarn.lock ./

RUN apt-get update && \
    apt-get install build-essential -y --no-install-recommends \
    vim \
    git \
    gnupg2 \
    curl \
    wget \
    nodejs \
    patch \
    ruby-dev \
    zlib1g-dev \
    liblzma-dev \
    libmariadb-dev

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install yarn --no-install-recommends -y

ENV BUNDLER_PATH=/bundle BUNDLE_BIN=/bundle/bin GEM_HOME=/bundle

ENV PATH="${BUNDLE_BIN}:${PATH}"

ARG BUNDLER_VERSION=2.1.4

RUN gem install bundler:${BUNDLER_VERSION}

RUN bundle install --path=${BUNDLER_PATH}

RUN yarn install --check-files

COPY docker/app/*.sh /scripts/

RUN chmod a+x /scripts/*.sh
```
Như đã thấy trong nội dụng file `docker-compose.yml`, chúng ta sử dụng `context .` cho image app, điều này có nghĩa là file  `docker/app/Dockerfile` sẽ được chạy giống như là nó đang nằm ở ngoài thư mục root của ứng dụng. Đó là lý do vì sao chúng ta có thể sử dụng các lệnh:
```docker
COPY Gemfile* ./

COPY package.json ./

COPY yarn.lock ./
```
Chúng ta cũng sử dụng một file `docker/app/command.sh` để chạy các lệnh trước khi khởi động server:

```bash
rm -f tmp/pids/server.pid

bundle check || bundle install --binstubs=$BUNDLE_BIN

bundle exec rails db:prepare && bundle exec rails s -p 3000 -b 0.0.0.0
```
Để ý là trước đó chúng ta đã đưa file này từ bên ngoài vào trong container và set quyền cho nó bằng lệnh:
```docker
COPY docker/app/*.sh /scripts/

RUN chmod a+x /scripts/*.sh
```

#### Config Nginx
Đến bước này chúng ta cũng đã có thể chạy ứng dụng của mình được rồi, tuy nhiên để cho mọi thứ gần mới môi trường deploy hơn thì chúng ta cần có thêm một container khác nữa là `ngnix`:
```docker
ARG NGINX_VERSION=1.17.9

FROM nginx:${NGINX_VERSION}

ARG HOST

ARG APP_PATH=/app

RUN apt-get update && apt-get -y install \
    vim \
    curl \
    openssl \
    apache2-utils \
    --no-install-recommends apt-utils && \
    rm -r /var/lib/apt/lists/*

WORKDIR ${APP_PATH}

COPY nginx.conf /tmp/

RUN envsubst '${APP_PATH} ${HOST}' < /tmp/nginx.conf > /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```
Trên đây là nội dung trong file `docker/nginx/Dockerfile`, nó là các chỉ thị để build những thành phần cần thiết cho container `nginx`. Tiếp theo chúng ta sẽ chuẩn bị file `docker/nginx/nginx.conf` để config cho nginx với nội dung sau:

```nginx
user nginx;
worker_processes 1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
  worker_connections  1024;
}

http {
    root $APP_PATH/public;

    keepalive_timeout  65;

    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    access_log  /var/log/nginx/access.log main;
    error_log   /var/log/nginx/error.log warn;

    sendfile on;

    upstream $HOST {
      server app:3000;
    }

    server {
      listen 80;
      server_name localhost 127.0.0.1;

      location / {
        proxy_pass       http://$HOST;
        proxy_set_header X-Forwarded-For $remote_addr;
      }
    }

    include /etc/nginx/conf.d/*.conf;
}
```
Chúng ta copy file này vào trong thư mục /tmp/ của container bằng lệnh:
```docker
COPY nginx.conf /tmp/
```
Vì Nginx không hỗ trợ chúng ta truyền các biến môi trường vào trong file config, do đó để khắc phục điều này, chúng ta đã sử dụng `envsubst` để replace nội dung trong file `/tmp/nginx.conf` trước khi đưa nó vào trong `/etc/nginx/nginx.conf`:
```docker
RUN envsubst '${APP_PATH} ${HOST}' < /tmp/nginx.conf > /etc/nginx/nginx.conf
```
## Build
Chuẩn bị một file `.env` để lưu tất cả biến môi trường sử dụng trong ứng dụng, nó trông sẽ như thế này:
```env
HOST=localhost

DATABASE_HOST=db
DATABASE_ROOT_PASSWORD=root

DATABASE_NAME=rails_docker
DATABASE_PASSWORD=root
DATABASE_USER=root
```
Sau đó chúng ta sẽ sửa lại file `config/database.yml` với nội dung như sau:
```yaml
default: &default
  adapter: mysql2
  encoding: utf8mb4
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  host: <%= ENV["DATABASE_HOST"] %>
  username: <%= ENV["DATABASE_USERNAME"] %>
  password: <%= ENV["DATABASE_PASSWORD"] %>
  socket: /var/run/mysqld/mysqld.sock

development:
  <<: *default
  database: <%= ENV["DATABASE_NAME"] %>

test:
  <<: *default
  database: <%= ENV["DATABASE_NAME"] %>_test
  
production:
  <<: *default
  database: <%= ENV["DATABASE_NAME"] %>
```
Mọi thứ có vẻ ổn, giờ là lúc chúng ta tận hưởng thành quả của mình, đầu tiên là build images:
```bash
docker-compose build
```
Nếu như tất cả các image đã được build thành công thì tiếp theo bạn hãy chạy lệnh:
```bash
docker-compose up
```
Mở trình duyệt lên và đánh vào đường dẫn http://localhost nếu như màn hình hiện lên **"Yay! You're on Rails"** thì coi như chúng ta đã thành công.

## Summary
Vừa rồi chúng ta đã cùng nhau đi dựng một ứng dụng Rails sử dụng Docker. Trên đây mình sử dụng phiên những phiên bản mới nhất của Rails, Ruby và Docker. Hi vọng bài viết sẽ phần nào hữu ích để bạn có thể tự config Docker cho project của mình.

Blog: https://www.dnlblog.com/posts/dung-docker-cho-rails-app-tu-dau-den-cuoi