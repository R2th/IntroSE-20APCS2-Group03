Ở Rails 6 có sự thay đổi rõ rệt nhằm hỗ trợ về tích hợp framework Javascript trong dự án bằng Rails. Thư mục javascript được đưa ra bên ngoài assets và quản lý hoàn toàn bằng webpack. Vì vậy, chúng ta phải thay đổi 1 chút để cài đặt project

# Thiết lập project
Chúng ta sẽ viết Dockerfile như sau:
```docker
FROM ruby:2.6.3
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client npm\
  && rm -rf /var/lib/apt/lists/* \
  && curl -o- -L https://yarnpkg.com/install.sh | bash
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
# install yarn
RUN npm install -g yarn
RUN yarn install --check-files

COPY . /myapp

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
```
Tiếp đó, tạo 1 `Gemfile` chỉ load Rails. File này sau đó sẽ bị ghi đè khi chạy `rails new`
```ruby
source 'https://rubygems.org'
gem 'rails', '~>6'
```
Tạo 1 cái `Gemfile.lock` rỗng
```shell
touch Gemfile.lock
```
Tạo `entrypoint.sh` gồm
```shell
#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
```
Cuối cùng ở bước này sẽ là tạo `docker-compose.yml`
```yaml
version: '3'

services:
  db:
    image: postgres:11
    environment:
      POSTGRES_HOST_AUTH_METHOD: 'trust'
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
```
# Khởi tạo project
```shell
docker-compose run web rails new . --force --no-deps --database=postgresql --webpack
```
Và chúng ta đã có 1 app hoàn toàn mới

Chạy lệnh để xem các file
```shell
$ ls -l
total 736
-rw-r--r--    1 quanhoang  staff     605 Sep 28 11:19 Dockerfile
-rw-r--r--    1 quanhoang  staff    1971 Sep 28 15:11 Gemfile
-rw-r--r--    1 quanhoang  staff    5537 Sep 28 15:11 Gemfile.lock
-rw-r--r--    1 quanhoang  staff     374 Sep 28 15:11 README.md
-rw-r--r--    1 quanhoang  staff     227 Sep 28 15:11 Rakefile
drwxr-xr-x   11 quanhoang  staff     352 Sep 28 15:11 app
-rw-r--r--    1 quanhoang  staff    1876 Sep 28 15:11 babel.config.js
drwxr-xr-x   10 quanhoang  staff     320 Sep 28 15:11 bin
drwxr-xr-x   18 quanhoang  staff     576 Sep 28 15:11 config
-rw-r--r--    1 quanhoang  staff     130 Sep 28 15:11 config.ru
drwxr-xr-x    3 quanhoang  staff      96 Sep 28 15:11 db
-rw-r--r--    1 quanhoang  staff     309 Sep 28 15:14 docker-compose.yml
-rw-r--r--    1 quanhoang  staff     202 Sep 27 15:32 entrypoint.sh
drwxr-xr-x    4 quanhoang  staff     128 Sep 28 15:11 lib
drwxr-xr-x    4 quanhoang  staff     128 Sep 28 15:11 log
drwxr-xr-x  762 quanhoang  staff   24384 Sep 28 15:14 node_modules
-rw-r--r--    1 quanhoang  staff     332 Sep 28 15:14 package.json
-rw-r--r--    1 quanhoang  staff     224 Sep 28 15:11 postcss.config.js
drwxr-xr-x    9 quanhoang  staff     288 Sep 28 15:11 public
drwxr-xr-x    3 quanhoang  staff      96 Sep 28 15:11 storage
drwxr-xr-x   12 quanhoang  staff     384 Sep 28 15:11 test
drwxr-xr-x    7 quanhoang  staff     224 Sep 28 15:11 tmp
drwxr-xr-x    3 quanhoang  staff      96 Sep 28 15:11 vendor
-rw-r--r--    1 quanhoang  staff  310152 Sep 28 15:14 yarn.lock
```
Với trường hợp chạy Docker ở Linux, các file từ lệnh `rails new` sẽ đặt quyền root. Ta sẽ sửa lại
```shell
sudo chown -R $USER:$USER .
```
 Cuối cùng ta sẽ build lại 
 ```shell
 docker-compose build
 ```
#  Kết nối tới cơ sở dữ liệu
Sửa lại `config/database.yml` như sau:
```yaml
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
Sau đó chạy
```shell
$ docker-compose up
```
Kết quả như sau là ok
```shell
myapp_db_1 is up-to-date
Creating myapp_web_1 ... done
Attaching to myapp_db_1, myapp_web_1
db_1   | The files belonging to this database system will be owned by user "postgres".
db_1   | This user must also own the server process.
```
Sau đó chạy lệnh tạo database:
```shell
docker-compose run web rails db:create
```
Lúc này, truy cập http://localhost:3000 và chào mừng bạn tới với Rails 6

![](https://images.viblo.asia/39e598dd-231b-403a-95c8-212dfb2d748a.png)

# Kết
Để tắt ứng dụng, Ctrl+C ở cửa sổ đang chạy `docker-compose up` và chạy `docker-compose down`

Khi có thay đổi ở `Dockerfile`, `docker-compose.yml` và `Gemfile`, chạy `docker-compose up --build`

Bài viết có sự tham khảo lại từ https://docs.docker.com/compose/rails/ và chỉnh sửa lại cho phù hợp với Rails 6