![](https://images.viblo.asia/2960bf15-f952-4264-8137-b804149a43c5.png)
Docker - đây là một công cụ tạo môi trường được "đóng gói" (còn gọi là Container) trên máy tính mà không làm tác động tới môi trường hiện tại của máy, môi trường trong Docker sẽ chạy độc lập.
Một số developer thường tạo sẵn các môi trường này, và upload lên mạng để mọi người lấy về dùng, và mấy cái này gọi là các Images.
Với Docker Compose, Docker càng giúp ích hơn cho developer với nhu cầu tách các dependencies như MySQL, Solr hay Redis ra thành các components riêng biệt. Trong bài viết này, mình sẽ hướng dẫn các bạn các thiết lập môi trường development cho Rails app đơn giản với Docker và Docker Compose.
# Cài đặt Docker và Docker Compose
### Cài đặt Docker

* Update apt sources
```
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates
```
* Thêm GPG key
```
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
```
* Thêm Docker repo vào source list
```
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | sudo tee /etc/apt/sources.list.d/docker.list
```
* Cài đặt `docker-engine` và khởi động service cho nó
```
sudo apt-get update
sudo apt-get install docker-engine
sudo service docker start
```

### Cài đặt Compose

```
curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

# Phát triển Rails với Docker và Docker Compose
### Setup Docker
* Dockerfile
Trong thư mục Rails project, tạo `Dockerfile` với nội dung:
```
# Dockerfile
FROM ruby:2.5.1

RUN apt-get update -qq && apt-get install -y build-essential

# postgres
RUN apt-get install -y libpq-dev

# nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev

# capybara-webkit
RUN apt-get install -y libqt4-webkit libqt4-dev xvfb

# JS runtime
RUN apt-get install -y nodejs

ENV APP_HOME /docker_compose
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
RUN bundle install

ADD . $APP_HOME
```
* Compose file
Chúng ta đã xây dựng thành công một Docker image để chứa Rails, tuy nhiên chúng ta vẫn còn cần phải thiết định cho các dependencies như database hay search engine. Lúc này thì chúng ta sẽ sử dụng Docker Compose. Trong cùng thư mục chứa Rails, tạo file docker-compose.yml có nội dung:
```
# config/database.yml
version: '2'
services:
  db:
    image: postgres:9.6.1
    ports:
      - "5432:5432"
    volumes:
      - /data/postgresql-9.6.1:/var/lib/postgresql/data

  web:
    build: .
    command: bin/rails server --port 3000 --binding 0.0.0.0
    ports:
      - "3000:3000"
    depends_on:
      - db
    volumes:
      - .:/docker_compose
```

Lúc này trong thư mục gốc của Rails, để bắt đầu build và khởi động container, bạn chạy lệnh:

```
docker-compose up
```
### Thiết lập cho database
Do chúng ta kết nối tới database trên container, nên sẽ cần chỉnh sửa file `config/database.yml`:
```
# docker-compose.yml
development: &default
  adapter: postgresql
  database: docker_compose_development
  pool: 5
  username: postgres
  password: password

test:
  <<: *default
  database: docker_compose_test
```

Sau khi thiết lập kết nối với database từ Rails app, ta có thể chạy lệnh tạo và migrate database qua:
```
docker-compose run web rake db:create db:setup
```

Bạn có thể mở Rails console thông qua command:
```
docker-compose run web rails console
```

# Kết luận
Trên đây là một ví dụ nhỏ về việc xây dựng môi trường cho Rails app với Docker. Việc thêm vào các services khác trong cùng một application như Redis hay Solr là việc vô cùng đơn giản với Docker Compose.
# Tham khảo
* https://docs.docker.com/
* https://docs.docker.com/compose/reference/