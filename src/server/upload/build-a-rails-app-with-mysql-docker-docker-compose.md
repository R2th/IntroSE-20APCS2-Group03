Chào các bạn, hôm nay chúng ta cùng xây dựng app Rails với MySQL và Docker nhé.
Trước khi vào chi tiết bài viết thì xin mời các bạn lướt qua `nội dung chính` của bài viết:

* Sau khi follow các step đến cuối bài viết, bảo đảm sẽ chạy **thành công** app Rails, MySQL và Docker như tiêu đề.
* Hiểu được ý nghĩa của những câu lệnh đã chạy trong bài viết.
* Có thể áp dụng vào những dự án thực tế Rails cần chạy Docker.

Sau khi lướt qua `nội dung chính` của bài viết, nếu thấy hấp dẫn thì hãy tiếp tục đọc nhé các bạn. Cảm ơn nhiều.

# Phần 1: Cài đặt Docker, Docker Compose

Bạn nào đã cài đặt rồi thì có thể chuyển qua đọc tiếp phần sau nhé

**Để kiểm tra đã cài đặt Docker, Docker Compose chưa thì kiểm tra như sau:**

```
docker --version
docker-compose --version
```

Kết quả như sau thì mình chuyển sang phần 2 (hoặc có thể tiếp tục đọc **phần thêm `sudo` cho Ubuntu**)

![](https://images.viblo.asia/c21f0c78-47a8-4218-8119-1955db207c0e.png)

## Cài đặt Docker, Docker Compose

**1. Với Ubuntu:**
- Chạy những câu lệnh sau để cài đặt Docker:
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
apt-cache policy docker-ce
sudo apt-get install -y docker-ce
```
- Chạy những câu lệnh sau để cài đặt Docker Compose:
```
sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**2. Với Mac:**

- Bạn vào link này: https://store.docker.com/editions/community/docker-ce-desktop-mac , sau đó đăng nhập và tải Docker về.
- Sau khi tải thì tiến hành cài đặt như cài các App khác (quăng nó vào Application folder), thế là đã có đủ Docker và Docker Compose.

**3. Với Window:**

- Bạn vào link này: https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe
- Tiến hành cài đặt theo chỉ dẫn của Install Wizard. Tương tự Mac, cài xong là đã có đủ bộ Docker, Docker Compose.

## Thêm `sudo` cho Ubuntu

Nếu các bạn đang sử dụng Ubuntu thì có thể làm thêm bước này để khỏi phải gõ `sudo` vào đằng trước mỗi câu lệnh Docker.

```
sudo groupadd docker
sudo gpasswd -a $USER docker
newgrp docker

===> Chạy 3 câu lệnh trên là đã xong, giờ có thể sử dụng Docker không cần `sudo` thoải mái nha.
```

Nếu kết quả như hình thì OK rồi bạn nhé.
![](https://images.viblo.asia/40f76e28-87bb-4fda-ae1c-2ba4638bdddf.png)

# Phần 2: Khởi tạo Rails app, Docker, Docker Compose

**Theo mình tìm hiểu** thì mình biết hai cách để khởi tạo `Rails app, Docker, Docker Compose`:

1. Khởi tạo `Dockerfile, docker-compose.yml` trước rồi mới build app (Cách này ít xài và mình cũng không hay sử dụng cách này). Nếu cần bạn có thể tham khảo link ngay trên trang chủ: https://docs.docker.com/compose/rails/
2. Cách 2 là khởi tạo Rails app trước, sau đó tạo thêm `Dockerfile, docker-compose.yml` sau.

Giờ bắt đầu với cách 2 nào: Khởi tạo Rails app với cú pháp quen thuộc

```
rails new rails-docker-app -d mysql
cd rails-docker-app
atom .
```

Đến đây OK rầu thì sang phần Docker nào:

## Thêm Dockerfile, docker-compose.yml vào Rails app

**1. Dockerfile:**

Tạo mới Dockerfile trong folder dự án của các bạn và có nội dung như sau:
```
FROM ruby:2.5
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /myapp
WORKDIR /myapp
ADD Gemfile /myapp/Gemfile
ADD Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
ADD . /myapp
```

Hình ảnh mô tả Dockerfile:

![](https://images.viblo.asia/c18d7965-2e22-42dc-8821-c082cf92f809.png)

**Giải thích:**

1. Dòng đầu tiên: `FROM ruby:2.5`: 
- Trỏ đến `Docker image` dành cho Ruby trên `Dockerhub`. Truy cập link sau để biết thêm các version hỗ trợ - https://hub.docker.com/_/ruby/ . 
2. Dòng thứ hai: `RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -`
- Cài đặt Nodejs version 10 trở lên cho Rails app, lưu ý nếu setup Nodejs version từ 9.x trở xuống khi chạy Rails app có khả năng sẽ xuất hiện lỗi.
3. Dòng thứ ba: `RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs`
- Cài đặt các package cần thiết.
4. Dòng thứ tư và năm: `RUN mkdir /myapp`, `WORKDIR /myapp`
- Tạo folder `myapp` và set nó trở thành `directory chính` cho các câu lệnh sau.
5. Ba dòng tiếp theo:  `ADD Gemfile /myapp/Gemfile` và `ADD Gemfile.lock /myapp/Gemfile.lock`
- Thêm lần lượt `Gemfile, Gemfile.lock` vào `myapp`
7. Dòng cuối: `ADD . /myapp`
- Copy những content trên vào thư mục `myapp`

**2. docker-compose.yml:**

Tạo mới `docker-compose.yml` trong folder dự án tương tự với `Dockerfile`

```
version: "3"

services:
  db:
    image: mysql:5.5
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
      - .:/myapp
    environment:
      MYSQL_ROOT_PASSWORD: ${DATABASE_PASSWORD}
      MYSQL_USER: ${DATABASE_USER}
      MYSQL_PASSWORD: ${DATABASE_PASSWORD}
  web:
    build: .
    command: bundle exec rails s -p 3000 -b "0.0.0.0"
    env_file:
      - .env
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
    stdin_open: true
    tty: true
volumes:
  db_data:
```

Hình ảnh mô tả docker-compose.yml:

![](https://images.viblo.asia/b3233922-7751-4ac4-8000-7465c0613cfe.png)

**Giải thích:**

1. Dòng đầu tiên: `version: "3"`
- Đặt version cho file `docker-compose.yml`, vesion 3.x là phiên bản mới nhất hiện tại của `docker-compose.yml`
- Link tham khảo: https://docs.docker.com/compose/compose-file/
2. Từ phần này mình sẽ giải thích nguyên 1 cụm nhé:
```
db:
    image: mysql:5.5
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
      - .:/myapp
    environment:
      MYSQL_ROOT_PASSWORD: ${DATABASE_PASSWORD}
      MYSQL_USER: ${DATABASE_USER}
      MYSQL_PASSWORD: ${DATABASE_PASSWORD}
```

Tạo Image db với các thông tin sau:

- image: Được lấy từ `Dockerhub`, ở đây mình lấy version 5.5. `Link tham khảo`: https://hub.docker.com/_/mysql/
- ports: Đặt cổng mặc định là "3306:3306" (Sẽ có phần lưu ý nhỏ bên dưới dành cho phần `port` này)
- volumes: Tạo volume cho `db` để khi chạy `build` lại không tốn công build lại từ đầu.
- environment: Các biến `environment` cho `Image mysql` này. Như trên thì mình đang lấy từ file `.env` của Rails

**Lưu ý:**
- Mục `port`: Nếu các bạn đang chạy mySQL dưới local với port 3306 thì chắc chắn khi chạy `docker-compose up` sẽ lỗi vì port 3306 đang được sử dụng. Vì vậy cần đổi port như sau:

```
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
===> Chuyển phần port sang cổng bạn muốn: Mình đặt là 6606 cho dễ nhớ.
===> Sau khi chuyển thì chạy restart và xem lại status mysql nhé.
sudo service mysql restart
sudo service mysql status
===> Nếu OK rồi thì chúng ta làm tiếp.
```

Hình ảnh mô tả file `mysqld.cnf` sau khi chuyển: 

![](https://images.viblo.asia/3b52b737-1479-4270-9d29-2d8870d528f7.png)

- Mục `environment`: Bạn lưu ý thêm `gem 'rails-dotenv' vào Gemfile`, chưa cần bundle vội đâu vì mình sử dụng toàn bộ trên Docker nên lát sẽ bundle bằng docker sau. Tiếp theo tạo mới file `.env` như sau:
```
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_HOST=db

===> # Được sử dụng trong docker-compose.yml và database.yml (sẽ được đề cập sau)
```

Hình ảnh mô tả `.env` và `Gemfile`:

![](https://images.viblo.asia/45cfb530-0c29-4cb4-b030-c174749a6505.png)

![](https://images.viblo.asia/b396d4f9-ce5f-453b-917e-d4a839d81c20.png)

4. Phần tiếp theo:

```
web:
    build: .
    command: bundle exec rails s -p 3000 -b "0.0.0.0"
    env_file:
      - .env
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
    stdin_open: true
    tty: true
```

- build: Câu lệnh `build` sẽ thực hiện trên folder hiện tại (thể hiện bằng dấu `.`)
- command: Khi build thành công sẽ thực hiện câu lệnh này: Cụ thể là sẽ chạy `rails s`
- env_file: Định nghĩa file biến môi trường được sử dụng sẽ là file `.env` vừa tạo ở trên.
- volumes: Sử dụng volume `myapp` cho app Rails để lần sau build khỏi chạy mới lại.
- port: Cổng 3000.
- depends_on: Sử dụng `db` là image `db` vừa tạo ngay ở trên.
- `stdin_open` và `tty`:  sử dụng để debug khi bạn là `DEV`

5. Phần cuối:

```
volumes:
  db_data:
```

- Định nghĩa `volumes` vừa tạo ở phần `db` trên.

**3. database.yml:**

Bên cạnh việc config `Dockerfile` và `docker-compose.yml` thì file `database.yml` cũng góp phần quan trọng không kém:

**Đây là code ban đầu của file `database.yml` của bạn:**
```
default: &default
  adapter: mysql2
  encoding: utf8
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: root
  password:
  socket: /var/run/mysqld/mysqld.sock

development:
  <<: *default
  database: rails-docker-app_development
test:
  <<: *default
  database: rails-docker-app_test
production:
  <<: *default
  database: rails-docker-app_production
  username: rails-docker-app
  password: <%= ENV['RAILS-DOCKER-APP_DATABASE_PASSWORD'] %>
```

**Đây là file sau khi sửa đổi:**
```
default: &default
  adapter: mysql2
  encoding: utf8
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: <%= ENV["DATABASE_USER"] %>
  password: <%= ENV["DATABASE_PASSWORD"] %>
  host: <%= ENV["DATABASE_HOST"] %>

development:
  <<: *default
  database: rails-docker-app_development
test:
  <<: *default
  database: rails-docker-app_test
production:
  <<: *default
  database: rails-docker-app_production
  username: rails-docker-app
  password: <%= ENV["DATABASE_PASSWORD"] %>
```

**Giải thích**

- Điều quan trọng nhất ở đây là phần `host` đã được bổ sung vào, và mọi config chúng ta đều lấy từ file `.env` nên rất tiện lợi. Khi build thì nó sẽ chạy dưới host tên là `db` (cùng tên với image `db` đã tạo trong `docker-compose.yml`)

Hình ảnh dưới mô tả file `database.yml`

![](https://images.viblo.asia/330eccde-9d3a-4171-91ac-4651bedc6603.png)
# Phần 3: Tiến hành build, up

Sau khi đã config đầy đủ các file trên thì mở Terminal ra chạy những câu sau nào:

```
cd rails-docker-app/
newgrp docker # ==> Để chạy lệnh của docker không cần `sudo`
docker-compose build
```

Hình ảnh mô tả đoạn lệnh trên:

![](https://images.viblo.asia/cb1cf11f-85ce-4a6b-9b64-cfca9977de67.png)

Giờ thì đợi thôi, sau khi nó chạy xong thì thực hiện câu lệnh sau:

```
docker-compose run web rake db:create
docker-compose run web rake db:migrate
docker-compose run web rake db:seed
```

Hình ảnh mô tả đoạn lệnh trên:

![](https://images.viblo.asia/76c6d48e-dc50-44f6-824f-6c3547e4aefa.png)

Sau khi ok rồi thì bạn chạy câu lệnh sau để hoàn thành và test thử nhé:

```
docker-compose up
```

Trong trường hợp xem log mà gặp lỗi 
```
A server is already running. Check /myapp/tmp/pids/server.pid
```

thì vui lòng vào thư mục `dự-án-của-bạn/tmp/pids` và xóa đi file `server.pid` nha.

**Lưu ý đối với Ubuntu:** Vì tất cả các file trong dự án đều được tạo bằng Docker nên trên `Ubuntu` sẽ báo `bạn không thể xóa vì không được cấp root`. Lúc này hãy chạy câu lệnh sau:

```
sudo chown -R $USER .
rm rails-docker-app/tmp/pids/server.pid
```

Thế là xong việc fix lỗi `server is already running`

Hình ảnh mô tả đoạn trên:

====> **(Hình ảnh log lỗi - Nếu có)**

![](https://images.viblo.asia/e52fc616-a0c0-40dc-a4cc-f0222e16d0f2.png)

====> **Cách fix**

![](https://images.viblo.asia/d797ca28-7a0e-4793-b269-b699748b2e6a.png)

Giờ tiếp tục chạy lại lệnh `docker-compose up` và check trên `https://localhost:3000` nào (Nhớ tắt cái cũ đi rồi mới chạy lại nhé)

Hình ảnh mô tả chạy thành công câu lệnh trên:

![](https://images.viblo.asia/357d5632-39e5-4db7-acf5-e2e3c613f0cd.png)

Khi đăng nhập localhost:3000 mà nhận được kết quả này là thành công nhé các bạn.

![](https://images.viblo.asia/09997b33-bfcf-47a1-ac8c-f0c7bd4ac097.png)

# Phần 4: Tổng kết

Như vậy chúng ta đã cùng config từ đầu đến cuối và chạy thành công Rails app cùng với `Dockerfile` và `docker-compose.yml`.

Dưới đây là một số câu lệnh phổ biến cần biết để chạy:
| Câu lệnh | Ý nghĩa|
| -------- | -------- |
| newgrp docker     | Chạy docker không cần `sudo` (Áp dụng cho `Ubuntu`)     |
| docker-compose up     | Chạy docker-compose trực tiếp - Không `debug` được|
| docker-compose up -d     | Chạy docker-compose ngầm - `debug` được => Phía dưới sẽ có hướng dẫn `debug` trên Docker|
| docker-compose run web [**câu lệnh rails đi kèm**]     | Kiểm tra image `web` có chưa, chưa có sẽ chạy lên và thực hiện câu lệnh Rails. VD: **docker-compose run web rake db:migrate**|
|  docker-compose exec web [**câu lệnh rails đi kèm**]      | Tương tự cái trên, tuy nhiên chỉ chạy khi đã có `image web` sẵn rồi|
|  docker-compose down      |Stop các image đang chạy và xóa luôn. Phù hợp để chạy trước mỗi câu lệnh `up`|
|  docker ps      |Show ra các container `ĐANG` chạy|
|  docker ps -a      |Show ra các container `ĐANG` chạy và `KHÔNG` chạy|
|  docker images      |Show ra các image `ĐANG` chạy|
|  docker images -a      |Show ra các image `ĐANG` chạy và `KHÔNG` chạy|
|  docker stop $(docker ps -a -q)      |Stop tất cả container đang chạy|
|  docker system prune -a      |Xóa trắng tất cả container và image đang có|
|  docker volume ls      |Show ra các volume đang có|
|  docker volume rm [Tên-volume-muốn-xóa]      |Xóa đi volume chỉ định|

**Cách debug với Docker:**

Chạy những câu lệnh sau:
```
newgrp docker # Chạy docker không cần `sudo`
docker-compose up -d
docker ps
docker attach [CONTAINER_ID_của_thằng_web]
```

Sau đó vào `localhost:3000` để check thôi.

Hình ảnh mô tả:

![](https://images.viblo.asia/02fa77c3-2e29-472a-9bc5-24cff34ccf3d.png)

**Cách code với Docker:**
Vì bạn đang chạy toàn bộ trên Docker nên trên `Ubuntu` sẽ bị lỗi `bạn không có quyền root với file này` khi tạo mới bất kỳ file nào.
Nên sau khi tạo mới file thì nhớ chạy câu sau:
```
sudo chown -R $USER .
```

=> **DONE**

**Cách chạy Docker với những lần sau:**

```
cd du-an-cua-ban
git pull origin master
newgrp docker
docker-compose build
docker-compose down
docker-compose up -d

====> Vào localhost:3000 quẩy

# Nếu có cần rake db:migrate hoặc seed thì cứ nhớ cú pháp: `docker-compose run web [Cau-lenh-Rails]`
docker-compose run web rake db:migrate
docker-compose exec web rake db:seed
```

Vậy là xong, trên đây mình đã mô tả tương đối đầy đủ về `những gì cần thiết nhất` để làm việc với Docker. **Cảm ơn các bạn đã đọc đến đây!**