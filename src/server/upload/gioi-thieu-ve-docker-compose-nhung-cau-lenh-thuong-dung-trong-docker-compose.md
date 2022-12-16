Chắc hẳn mọi người đã không còn xa lạ gì với Docker nữa rồi. Docker giúp cho việc xây dựng, triển khai môi trường phát triển web, server database trở nên dễ dàng hơn, không còn phụ thuộc vào một môi trường duy nhất.

Quản lý docker của 1 hệ thống lớn với rất nhiều container khác nhau rất phức tạp, và có thể sinh ra nhiều lỗi trong quá trình vận hành. Chính vì vậy để khắc phục vấn đề này Docker Compose ra đời .

Docker Compose giúp việc thiết lập các ứng dụng cần sự liên kết của nhiều Docker Container với nhau dễ dàng hơn. Chỉ cần tao 1 file YAML config, 1 câu lệnh duy nhất chạy container, connect đến các services ở các container khác nhau. 

Để có thể sử dụng được docker compose, cài đặt theo document của docker [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## Những tính năng chính của Docker Compose
* Thiết lập, cấu hình nhiều môi trường hoàn toàn độc lập với nhau trên 1 máy chủ
* Bảo lưu các phân vùng bộ nhớ khi container được tạo ra
* Chỉ tạo lại container khi có config thay đổi, trong khi vẫn giữ lại data của container
* Định nghĩa các biến Variable trong file YAML để tùy chỉnh cho các môi trường khác nhau (môi trường dev, production)

<br>
<b>Làm thế nào để sử dụng được docker compose</b>

- Tạo Dockerfile cho mỗi môi trường container mà mình muốn. Để khởi tạo được container thì bắt buộc phải có Dockerfile
- Tạo docker-compose.yml để định nghĩa mối liên hệ giữa các container với nhau
- Chạy lệnh `docker-compose build` để khởi tạo các container
- Chạy lệnh `docker-compose up` để khởi động container và chạy toàn bộ ứng dụng
- Chạy lệnh `docker-compose stop` để stop toàn bộ container và các services
- Chạy lệnh `docker-compose down --volumes` để xóa hoàn toàn container và data volumes được sử dụng bởi các services

## Cấu trúc của file docker-compose.yml
### Tạo Dockerfile để install các services ứng dụng của bạn cần

VD: Tạo Dockerfile để install Ruby on Rails, file này sẽ cài đặt ruby on rails và các thư viện cần thiết để có thể chay được ruby on rails
```shell
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

### Tạo docker-compose.yml

```python
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
    networks:
     - my_network

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

Ý nghĩa các giá trị trong file docker-compose này
- version: là version docker compose mà chúng ta sử dụng. Ở đây chúng ta đang sử dụng version 3. (Lưu ý: mỗi version sẽ có sự khác nhau, version khác nhau sẽ có những option khác nhau)
-  services: là khu vực khai báo các services cần thiết cho ứng dụng<br>
    - nginx  là container chạy nginx
    - app là container chưa source code chính ứng dụng của bạn
    - db là container chứa thông tin về database
- volumes: là option nên config, volumes cho phép mount data từ container ra máy local. Khi config option này thì mỗi lần stop container data của container đó sẽ không bị mất đi. <b>(container có 1 đặc điểm là khi bạn stop thì những data sinh ra ở lần chạy trước sẽ bị mất đi)</b>
- env_file: Chỉ định file lưu trữ các biến môi trường cho container hoặc nếu không sử dụng env_file thì bạn có thể config trực tiếp từng biến môi trường vào container với key `environment`
- port: option này thiết lập port cho container, maping port của container với port của máy local
    VD:  `- 3000:4000`, port 3000 là chỉ định port ở máy local, port 4000 là của container
- build: khởi tạo services bằng Dockerfile. Mặc định khi khởi tạo container sẽ khởi tạo từ Dockerfile có path được config ở `context`. Trường hợp trong thư mục đó có nhiều Dockerfile và bạn muốn chỉ định cụ thể sẽ khởi chạy từ Dockerfile nào thì bạn cần bổ sung thêm key `dockerfile` như vd trên
- depends_on : thiết lập container phụ thuộc vào container khác
        VD: `depends_on: - db` khai báo container phụ thuộc vào container có tên là db.
- command: Giống như Dockerfile, khai báo command nào sẽ chạy khi container được chạy
- image: chỉ định Image để khởi tạo container. Khi bạn đã có sẵn 1 image rồi thì hoàn toàn có thể chạy container dựa trên image đó. (Lưu ý: khi dùng image thì key `build: context..` dùng để khởi tạo container không cần thiết nữa có thể xóa đi)
- network: set network cho container
- restart
    - restart: "no" --> defaut nó sẽ không khởi động lại container trong bâts cứ trường hợp nào
    - restart: always --> Luôn khởi động lại khi xảy ra lỗi hoặc bị stop
    - restart: on-failure --> Khởi động lại nếu xả ra lỗi
    - restart: unless-stopped --> Luôn khởi động lại container khi bị lỗi, ngoại trừ container bị stop

## Kết luận
Trên đây mình đã giới thiệu với các bạn về docker compose, cấu trúc của 1 file docker-compose.yml và các key thường được sử dụng trong docker-compose.yml. 

Cảm ơn mọi người đã theo dõi

Tham khảo https://docs.docker.com/compose/compose-file/compose-file-v3/