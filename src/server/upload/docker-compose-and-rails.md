Trong bài này tôi sẽ thiết lập và chạy một ứng dụng Rails / PostgreSQL sử dụng Docker . Trước khi bắt đầu hãy đảm bảo rằng máy bạn đã được cài đặt Docker . Và bạn có thể đọc thêm các thồn tin về docker tại 
https://docs.docker.com/get-started/#conclusion-of-part-one
https://docs.docker.com/engine/reference/builder/#escape

Mục đích của bài viết này là để xây dựng một ứng dụng Rails server bằng Docker. Với sever này bạn có thể Stop , Restart thực hiện deploy code ứng dụng.   
# Define the project
Ứng dụng của chúng ta sẽ được chạy trong Docker container , vì vậy đầu tiên hãy xác định chúng ta cần những gì để khởi tạo ứng dụng và include chúng vào Docker container, ở đây tôi sẽ khởi tạo ứng dụng Rails . Trong file Dockerfile

```
FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp
```

Tiếp theo create "Gemfile" để tải Rails về 

```
source 'https://rubygems.org'
gem 'rails', '5.2.0'
```
Tạo file Gemfile.lock trống để xây dựng Dockerfile.

```
touch Gemfile.lock
```

Tiếp theo tạo file docker-compose.yml . File này sẽ mô tả tất cả ứng dụng của chúng ta bao gồm database và web app  và cấu hình cần thiết để chúng có thể liên kết với nhau 

```
version: '3'
services:
  db:
    image: postgres
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
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

# Build the project
Với các file vừa tạo chúng ta đã có thể xây dựng một ứng dụng  Rails skeleton sử dụng docker-compose

```
docker-compose run web rails new . --force --database=postgresql
```

Với câu lệnh này docker sẽ xây dựng một image cho "web" service sử dụng Dockerfile , và chạy lệnh "rails new" trong một container mới của image này . Sau khi chạy xong bạn có thể kiểm tra các file đã được tạo của ứng dụng Rails .

```
$ ls -l
total 72
-rw-r--r-- 1 vmb staff 223 5 26 14:20 Dockerfile
-rw-r--r-- 1 vmb staff 2223 5 26 14:24 Gemfile
-rw-r--r-- 1 vmb staff 5300 5 26 14:25 Gemfile.lock
-rw-r--r-- 1 vmb staff 374 5 26 14:24 README.md
-rw-r--r-- 1 vmb staff 227 5 26 14:24 Rakefile
drwxr-xr-x 10 vmb staff 320 5 26 14:24 app
drwxr-xr-x 9 vmb staff 288 5 26 14:25 bin
drwxr-xr-x 16 vmb staff 512 5 26 14:24 config
-rw-r--r-- 1 vmb staff 130 5 26 14:24 config.ru
drwxr-xr-x 3 vmb staff 96 5 26 14:24 db
-rw-r--r-- 1 vmb staff 266 5 26 14:22 docker-compose.yml
drwxr-xr-x 4 vmb staff 128 5 26 14:24 lib
drwxr-xr-x 3 vmb staff 96 5 26 14:24 log
-rw-r--r-- 1 vmb staff 63 5 26 14:24 package.json
drwxr-xr-x 9 vmb staff 288 5 26 14:24 public
drwxr-xr-x 3 vmb staff 96 5 26 14:24 storage
drwxr-xr-x 11 vmb staff 352 5 26 14:24 test
drwxr-xr-x 6 vmb staff 192 5 26 14:24 tmp
drwxr-xr-x 3 vmb staff 96 5 26 14:24 vendor
```

Nếu các file trên được tạo ra với quyền root . Bạn có thể chuyển quyền cho các file mới tạo với câu lệnh 

```
sudo chown -R $USER:$USER .
```

Bạn có một Gemfile mới được sinh ra . Để build lại image bạn chạy lệnh sau 

```
docker-compose build
```

# Connect the database
Chúng ta đã tạo ra một ứng dụng Rails . Tuy nhiên để chạy ứng dụng thì Rails cần connect đến một database run trên localhost vì vậy chúng ta cần kết nối ứng dụng đến container chứa db .
Trong file  config/database.yml chúng ta cần phải thay đổi các giá trị để phù hợp với những giá trị mặc định của image postgres 
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
Và giờ khởi động ứng dụng với 
```
docker-compose up
```

Bạn có thể nhìn thấy ứng dụng đang chạy 

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
web_1  | => Rails 5.2.0 application starting in development
web_1  | => Run `rails server -h` for more startup options
web_1  | Puma starting in single mode...
web_1  | * Version 3.11.4 (ruby 2.5.1-p57), codename: Love Song
web_1  | * Min threads: 5, max threads: 5
web_1  | * Environment: development
web_1  | * Listening on tcp://0.0.0.0:3000
web_1  | Use Ctrl-C to stop
```

Để khởi tạo db , mở một terminal khác và chạy 

```
docker-compose run web rake db:create
```

kết quả khi database của bạn được tạo thành công 

```
vmb at snapair in ~/sandbox/rails
$ docker-compose run web rake db:create
Starting rails_db_1 ... done
Created database 'myapp_development'
Created database 'myapp_test'
```

# View the Rails welcome
Và giờ ứng dụng sẽ chạy trên cổng 3000 của Docker. Truy cập  http://localhost:3000 trên web browser của bạn để thấy ứng dụng Rails 
![](https://images.viblo.asia/6a55a723-d6d4-4492-b92e-9a9cc78f1980.png)

# Control the application 
 ## Stop aplication
 Để dừng ứng dụng chạy lệnh "run docker-compose down" trong ứng dụng của bạn  
 
 ```
 $ docker-compose down
Stopping rails_web_1 ... done
Stopping rails_db_1 ... done
Removing rails_web_run_1 ... done
Removing rails_web_1 ... done
Removing rails_db_1 ... done
Removing network rails_default
 ```
 
 ## Restart the application 
 
 Để reset ứng dụng run "docker-compose up"
 
 ## Rebuild the application
 
 Nếu bạn thay đổi Gemfile hoặc cập nhật file code khác , bạn cần rebuild lại ứng dụng , Nếu có thay đổi nào trong ứng dụng run "docker-compose up --build" và run "docker-compose run web bundle install".
 Ngoài ra bạn có thể thay đổi port cho ứng dụng bằng cách thay đổi thông số
 trong file docker-compose.yml
 
 ```
 ports: - "3001:3000"
 ```
 
 và giờ rebuild và reset lại ứng dụng "docker-compose up --build" . Và giờ bạn có thể kiểm tra ứng dụng của mình trên cổng http://localhost:3001 thay vì http://localhost:3000 như trước . 
 
 
 Thank for reading !