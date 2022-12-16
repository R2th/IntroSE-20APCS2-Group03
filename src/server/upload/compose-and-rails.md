Chao,

Đến tháng lại lên, hôm nay mình xin giới thiệu với các bạn cách sử dụng Docker Compose trong việc thiết lập môi trường để phát triển ứng dụng Rails/PostgreSQL
Nhưng trước tiên, bạn cần cài đặt Docker compose trong link: [compose install](https://docs.docker.com/v17.09/compose/install/)

# Define the project
Chúng ta cần 4 tệp đầu tiên để tạo ứng dụng. Vì ứng dụng của chúng ta sẽ được chạy trong môi trường docker-docker container nên chúng ta cần xác định được những gì cần thiết để setup trong môi trường docker. Và tất cả những thứ đó sẽ được "điểm danh" trong một file có tên Dockerfiles. Dưới đây là mẫu Dockerfile

```
FROM ruby:2.3.3
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp
```

Chúng sẽ tạo ra một iamge để build một container chưa các thứ đã được đặt tên trong Gemfiles như Ruby, Bundle và các dependencies khác. Các bạn có thể tìm hiểu thêm về cách viết Dockerfiles, các bạn có thể xem thêm tại đây: (https://docs.docker.com/get-started/) (https://docs.docker.com/v17.09/engine/reference/builder/)

Tiếp theo, chúng ta khai báo gem bootstrap trong Gemfile 

```
source 'https://rubygems.org'
gem 'rails', '5.0.0.1'
```

Bạn sẽ cần thêm một Gemfile.lock để build Dockerfiles

```
touch Gemfile.lock
```

Cuối cùng, mọi thứ sẽ được kết thúc bằng file docker-compose.yml. File này mô tả các service, image, cơ sở dữ liệu-postgres và cấu hình cần thiết để liên kết chúng với nhau và hiển thị cổng port 

```
version: '3'
services:
  db:
    image: postgres
  web:
    build: .
    command: bundle exec rails s -p 3000 -b '0.0.0.0'
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
```

NOTE: Bạn có thể dùng 1 trong 2 đuôi file sau cho file docker-compose: `.yml` hoặc `.yaml`

# Build the project

Với 4 tệp được định nghĩa trên, bạn hoàn toàn đã có thể phát triển một ứng dụng Rails chạy trên môi trường docker-compose

```
docker-compose run web rails new . --force --database=postgresql
```

Đầu tiên, conpose sẽ build lên những image(đã được định nghĩa trong file trên) cho web service bằng cách sử dụng Dockerfile. Sau đó chạy `rails new ` bên trong một container mới để sử dụng image. Sau khi hoàn tất, chúng ta nên tạo một ứng dụng mới.

List file 

```
$ ls -l
total 64
-rw-r--r--   1 vmb  staff   222 Jun  7 12:05 Dockerfile
-rw-r--r--   1 vmb  staff  1738 Jun  7 12:09 Gemfile
-rw-r--r--   1 vmb  staff  4297 Jun  7 12:09 Gemfile.lock
-rw-r--r--   1 vmb  staff   374 Jun  7 12:09 README.md
-rw-r--r--   1 vmb  staff   227 Jun  7 12:09 Rakefile
drwxr-xr-x  10 vmb  staff   340 Jun  7 12:09 app
drwxr-xr-x   8 vmb  staff   272 Jun  7 12:09 bin
drwxr-xr-x  14 vmb  staff   476 Jun  7 12:09 config
-rw-r--r--   1 vmb  staff   130 Jun  7 12:09 config.ru
drwxr-xr-x   3 vmb  staff   102 Jun  7 12:09 db
-rw-r--r--   1 vmb  staff   211 Jun  7 12:06 docker-compose.yml
drwxr-xr-x   4 vmb  staff   136 Jun  7 12:09 lib
drwxr-xr-x   3 vmb  staff   102 Jun  7 12:09 log
drwxr-xr-x   9 vmb  staff   306 Jun  7 12:09 public
drwxr-xr-x   9 vmb  staff   306 Jun  7 12:09 test
drwxr-xr-x   4 vmb  staff   136 Jun  7 12:09 tmp
drwxr-xr-x   3 vmb  staff   102 Jun  7 12:09 vendor
```

Nếu chúng ta chạy Docker trên Linux, các file mà `rails new` tạo ra được quản lí bởi root. Điều này xảy ra vì container chạy như user root bình thường. Vì thế nên bạn có thể thay đổi quyền  sỡ hữu của các file 

```
sudo chown -R $USER:$USER
```

# Connect the database

Ứng dụng về cơ bản đã được xây dựng thành công nhưng nó chưa thể khởi động được. Vì theo mặc định, Rails cần một cơ sở dữ liệu để kết nối và khởi động server local. Và dĩ nhiên, chúng ta cũng cần cung cấp quyền truy cập vào cơ sở dữ liệu cho ứng dụng

Ta thiết lập file config/database.yml
```
default: &default
  adapter: postgresql
  encoding: unicode
  host: db
  username: postgres
  password:
  pool: 5

development:
  <<: *default
  database: myapp_development


test:
  <<: *default
  database: myapp_test
```

Thay đổi username và password

Sau đó ta chạy lệnh

```
docker-compose up
```
 Đây là kết quả log
 
 ```
 Starting rails_db_1 ...
Starting rails_db_1 ... done
Recreating rails_web_1 ...
Recreating rails_web_1 ... done
Attaching to rails_db_1, rails_web_1
db_1   | LOG:  database system was shut down at 2017-06-07 19:12:02 UTC
db_1   | LOG:  MultiXact member wraparound protections are now enabled
db_1   | LOG:  database system is ready to accept connections
db_1   | LOG:  autovacuum launcher started
web_1  | => Booting Puma
web_1  | => Rails 5.0.0.1 application starting in development on http://0.0.0.0:3000
web_1  | => Run `rails server -h` for more startup options
web_1  | Puma starting in single mode...
web_1  | * Version 3.9.1 (ruby 2.3.3-p222), codename: Private Caller
web_1  | * Min threads: 5, max threads: 5
web_1  | * Environment: development
web_1  | * Listening on tcp://0.0.0.0:3000
web_1  | Use Ctrl-C to stop
 ```
 
 
 Cuối cùng, chúng ta tạo database bằng lệnh
 
 ```
 docker-compose run web rake db:create
 ```
 
 Log
 
 ```
 vmb at snapair in ~/sandbox/rails
$ docker-compose run web rake db:create
Starting rails_db_1 ... done
Created database 'myapp_development'
Created database 'myapp_test'
 ```
 
 
 Chúng ta đã hoàn tất thủ tục để sử dụng docker-compose trong phát triển ứng dụng Rails
 
 Chúng ta truy cập vào link localhost

![](https://images.viblo.asia/005f8e8e-8cec-474e-8ba3-69100e4a0618.png)
 
 
#  Stop the application
Để stop ứng dụng, bạn chạy lênh 

```
docker-compose down
```

log

```
vmb at snapair in ~/sandbox/rails
$ docker-compose down
Stopping rails_web_1 ... done
Stopping rails_db_1 ... done
Removing rails_web_run_1 ... done
Removing rails_web_1 ... done
Removing rails_db_1 ... done
Removing network rails_default
```

Hoặc nhấn Ctrl C ở tab server up compose trong terminal

# Restart the application

```
docker-compose up
```

# Rebuild th application

```
docker-compose up --build
```


Hoặc bạn có thể dùng lệnh 
```
docker-compose up --build
``` 
cho cả hai lệnh trên

Trên là những hướng dẫn ban đầu của mình để bắt đầu phát triển một ứng dụng Rails với Docker Compose, các bạn có thể tìm hiểu thêm qua các tài liệu khác. Mình xin dừng bài viết tại đây