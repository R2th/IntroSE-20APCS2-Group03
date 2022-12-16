Như chúng ta đã biết docker compose là công cụ tuyệt vời để deploy các ứng dụng Ruby Rails. Nó cho phép chúng ta có thể dễ dàng tách biệt các môi trường ruby, database hay thậm chí là Redis. Trong bài viết này chúng ta sẽ thực hiện các bước để deploy một ứng dụng rails lên heroku sử dụng docker bao gồm: <br>
- Setting một app rails trong docker compose
- Run các tác vụ cần thiết như cài đặt gem, migration
- Deploy lên heroku
# 1. Setting rails app với docker
Tạo một thư mục bằng cách chạy câu lệnh như sau: <br>
``` ruby
$ mkdir -p ~/myapp/rails-compose
$ cd ~/myapp/rails-compose
```
Sau khi đã tạo xong thư mục, ta sẽ tạo một file **Dockerfile** với nội dung như sau: <br>
``` ruby
FROM ruby:alpine

RUN apk add --update build-base postgresql-dev tzdata
```
Giải thích các câu lệnh trên: <br>
- **FROM ruby:alpine** câu lệnh này để ta sẽ lấy image Ruby mới nhất. Alpine linux là một base image nhỏ hơn
- **RUN apk add --update** ...
- **build-base** là gói chứa những tool cần thiết để complile từ source
- **postgresql-dev** gói được sử dụng để cài đặt **gem pg**
- **tzdata** được sử dụng bởi rails cho timezome
Tiếp đến ta sẽ tham chiếu **Dockerfile** này từ một file **docker-compose.yml** 
``` ruby
version: '3.6'

services:
  web:
    build: .
```
Khi sử dụng **build .** nó sẽ hiểu là có một Dockerfile nằm trong thư mục. Nó cũng sẽ sử dụng thư mục hiện tại khi build một **image** <br>
Sau khi chúng ta tạo xong file này, có thể thử chạy <br>
``` ruby
$ docker-compose build web
```
Nó sẽ pull image Ruby alpine và cài đặt các dependencies trên đó <br>
Tiếp theo chúng ta cần init một project sử dụng câu lệnh **rails new**. Để làm điều đó ở bên trong container chúng ta cần **mount** những file local trong hệ thống vào bên trong **container** mà chúng ta setup.<br> Điều này sẽ cho phép ta có thể tạo được các file bên trong image **web** và chúng cũng sẽ xuất hiện ở dưới hệ thống local. <br>
Chúng ta sẽ chỉnh sửa Dockerfile như sau: <br>
``` ruby
FROM ruby:alpine

RUN apk add --update build-base postgresql-dev tzdata
RUN gem install rails -v '5.1.6'
```
Sau khi đã chỉnh sửa ta sẽ chạy lại lệnh
``` ruby
$ docker-compose build web
```

Nó sẽ build lại file **image** của ta với gem Rails bên trong, sau đó ta có thể chạy được lệnh **rails new** <br>
Tiếp theo chúng ta cần thay đổi ile docker-compose.yml để thêm **volumes** và **working directory** <br>
``` ruby
version: '3.6'

services:
  web:
    build: .
    volumes:
      - ./:/app
    working_dir: /app
```
Sau khi đã chỉnh sửa như trên, ta có thể chạy docker compose với câu lệnh **rails new**. Chúng ta sẽ tạo ra một application với database là Progres, bỏ qua javascript và các config khác bằng cách chạy câu lệnh <br>
``` ruby
$ docker-compose run web rails new --database=progresql -J --skip-coffee
```
Sau khi chạy câu lệnh này thành công, thì thư mục của ta đã có đầy đủ file, folder cần thiết cho một rails app đơn giản và nó cũng gen ra cả **Gemfile, Gemfile.lock** <br>
Khi sử dụng deploy bằng cách truyền thống, Bundler sẽ install các gem vào trong hệ thống file local. Do đó khi chạy câu lệnh như **rails server** nó sẽ load gem một ở local. Tuy nhiên khi ta sẽ dụng docker, docker-compose, gem cần phải được install vào trong **image** thay vì ở một nơi riêng biệt. Khi ta chạy **rails new**, nó sẽ install gem và sinh ra các file ở bên trong một file tạm thời. Để sửa và thực hiện như ta mong muốn ta sẽ sủa Dockerfile như sau <br>
``` ruby
FROM ruby:alpine

RUN apk add --update build-base postgresql-dev tzdata
RUN gem install rails -v '5.1.6'

WORKDIR /app
ADD Gemfile Gemfile.lock /app/
RUN bundle install
```
Chúng ta vừa sửa để chỉ thêm **Gemfile** và **Gemfile.lock** vào thư mục **/app**, sau đó sẽ chạy **bundle install**. Lý do chúng ta không cho cả thư mục vào image bởi vì là môt khi một file trong app thay đổi, docker sẽ hiểu là image này đang bị cũ, cần phải chạy lại thay vì sử dụng cache. **Gemfile** này ít thay đổi nên ta có thể thêm vào để tăng tốc đội build vì docker sẽ sử dụng cache nếu như không có gem nào được thêm vào cũng như thay đổi. Ta sẽ chạy lại <br>
``` ruby
docker-compose build web
```
Tiếp đến, ta sẽ thay đổi file docker-compose.yml như sau <br>
``` ruby
version: '3.6'

services:
  web:
    build: .
    volumes:
      - ./:/app
    working_dir: /app
    command: puma
    ports:
      - 3000:3000
```
Tại đây chúng ta sẽ add câu lệnh để start server puma trên cổng 3000. Ta sẽ chạy câu lệnh <br>
``` ruby
docker-compose up web
```
Sau đó có thể vào đường dẫn [http://localhost:3000](http://localhost:3000) để xem kết quả.
# 2. Tạo model và migration
Tiếp theo chúng ta sẽ tạo một model đơn giản và migrate database <br>
Tạo một model **Post** bằng cách chạy lệnh <br>
``` ruby
$ docker-compose run --rm web rails g model Post content:text
```
Nó sẽ tạo một model Post và migrate bên trong container của chúng ta. Bởi vì ta đã định nghĩa **volumes** bên trong file **docker-compose.yml** , nó cũng sẽ nằm ở dưới hệ thống local. <br>
Tiếp theo nếu ta chạy <br>
``` ruby
$ docker-compose run --rm web rails db:migrate
rails aborted!
PG::ConnectionBad: could not connect to server: No such file or directory
    Is the server running locally and accepting
    connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```
Nó sẽ hiển thị lỗi chúng ta cần start progres database cho rails app để có thể kết nối đến được. Để làm ta sẽ thêm một image **progres** vào trong **docker-compose.yml** <br>
``` ruby
version: '3.6'

services:
  web:
    build: .
    volumes:
      - ./:/app
    working_dir: /app
    command: puma
    ports:
      - 3000:3000
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres@db
  db:
    image: postgres:10.3-alpine
```
Chúng ta vừa add thêm một service khác là **db** và sử dụng image **progres**. Chúng ta cũng thêm 2 phần nữa vào phần **web** đó là **depends_on** để chắc chắn rằng image **progres** đã được start và biến **enviroment** để cho rails app biết kết nối với nó như thế nào. Chúng ta cũng cần phải thay đổi file **config/database.yml** như sau <br>
``` ruby
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  url: <%= ENV['DATABASE_URL'] %>

development:
  database: app_development

test:
  database: app_test
```
Từ đây, ta có thể tạo database và run migrations <br>
``` ruby
$ docker-compose run --rm web rails db:create db:migrate
```
Lệnh **--rm** để loại bỏ container được sử dụng để chạy câu lệnh này, để tiết kiệm được bộ nhớ dưới local. <br>
Tiếp theo, ta sẽ tạo một dữ liệu với bảng **posts** vừa tạo bằng cách chạy <br>
``` ruby
$ docker-compose run --rm web rails runner 'Post.create(content: "this is content of post")'
```
Thay đổi file **config/routes.rb**
``` ruby
Rails.application.routes.draw do
  root to: 'posts#index'
end
```
Tạo file controller <br>
``` ruby
class PostsController < ApplicationController
  def index
    post = Post.order('RANDOM()').first

    render html: post.content
  end
end
```
Chúng ta sẽ chạy lại lệnh
```
docker-compose up web
```
Sau đó đến **localhost:3000** để xem kết quả. Bài post ta vừa tạo sẽ xuất hiện trên màn hình <br>
# 3. Deploy app lên Heroku
Bước cuối cùng chúng ta sẽ deploy app vừa tạo lên heroku. Ta sẽ thay đổi **Dockerfile** như sau <br>
``` ruby
FROM ruby:alpine

RUN apk add --update build-base postgresql-dev tzdata
RUN gem install rails -v '5.1.6'

WORKDIR /app
ADD Gemfile Gemfile.lock /app/
RUN bundle install

ADD . .
CMD ["puma"]
```
Nó sẽ add những file local của ta(tất cả các file trong rails app) vào trong image và sau đó set câu lệnh default là **puma**. Do đó, khi ta run **docker run** nó sẽ tự động sử dụng puma. <br>
Ta sẽ deploy Docker image lên Heroy bằng cách <br>
``` ruby
$ git init // để tạo một repos trống
```
Sau đó chạy
``` ruby
$ heroku create
```
Ta cần phải login vào heroku và đẩy Docker image lên đó <br>
``` ruby
$ heroku container:login
$ heroku container:push web
$ heroku container:release web
```
Chúng ta cần phải set up cho database progres bằng tay bằng cách chạy lệnh <br>
``` ruby
$ heroku addons:create heroku-postgresql:hobby-dev
```
Tiếp đến ta cần phải thêm một vài biến môi trường cho nó <br>
``` ruby
$ heroku config:set RAILS_ENV=production SECRET_KEY_BASE=supersecret RAILS_LOG_TO_STDOUT=true
```
Nó sẽ boot app của ta lên product (được định nghĩa trong **config/environments/production.rb**) và logs vào **STDOUT** cho phép ta nhìn được log khi sử dụng câu lệnh **heroku logs** <br>
Tiếp đến ta sẽ migrate database trên heroku <br>
``` ruby
$ heroku run rails db:migrate
```
Tạo dữ liệu mới của bảng posts trên heroku <br>
``` ruby
$ heroku run rails runner 'Post.create(body: "This is content of post")'
```
Sau đó ta sẽ chạy và xem kết quả :D
``` ruby
$ heroku open
```
# 4. Kết luận
Như vậy ta đã vừa tìm hiểu xong cách để deploy một ứng dụng rails đơn giản sử dụng docker. Hi vọng bài viết giúp ích cho mọi người, nếu có gì góp ý hay thảo luận hãy để lại bình luận phía dưới. (See you)