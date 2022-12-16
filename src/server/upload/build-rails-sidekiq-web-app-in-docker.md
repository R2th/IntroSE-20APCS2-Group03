Chắc hẳn khi đến với bài viết này thì bạn ít nhiều cũng đã có một chút khái niệm về Docker. Nhưng bạn vẫn loay hoay không biết bắt đầu từ đâu khi phải bắt tay build một dự án Ruby on Rails mới với Docker, hay một ngôn ngữ khác thì nó thật sự không quan trọng bởi vì bản chất Docker chỉ là gói gọn lại những packages, services, ... mà dự án(ngôn ngữ) bạn cần để phát triển. Vậy để không phải mỗi lần build Docker là một lần bạn phải search `How to build docker with ...` thì bạn nên làm gì? Câu trả lời có 3 bước: thực hành, thực hành và ... thực hành :v :laughing::laughing::laughing:. Bởi vì thế giới luôn thay đổi, nếu bạn không thực hành thì bạn sẽ không bao giờ biết được copy past file docker từ dự án cũ áp vào dự án mới thì ... bạn cần thay đổi những gì và bỏ đi những gì :upside_down_face:

Okay giông dài thế đủ rồi, thực hành luôn cho nóng. Mà trước khi thực hành ta nên ôn lại tí kiến thức cơ bản để có thể copy past mà không day dứt sau này :v

## 1. Concepts
`Container` - Là một quá trình chạy trên Linux kernel(Có một bài viết khá hay trên viblo [ở đây](https://viblo.asia/p/linux-co-ban-nhung-du-xai-phan-1-oOVlYbxV58W)). Nó được cấp phát tài nguyên riêng: CPU, bộ nhớ và hệ thống tập tin. Bằng cách này, Docker là độc lập với những tiến trình đang chạy trên máy của bạn. Và khi bị lỗi vì bất kỳ lý do gì, nó sẽ không ảnh hưởng đến các `containers/processes` khác đang chạy.

`Image` - Là tệp chứa mọi thứ bạn cần để thực thi: dependencies, binaries, source code, ... Chúng được xây dựng bằng cách thực thi các lệnh trong tệp giống tập lệnh có tên Dockerfile. Image được sử dụng để tạo ra nhiều `Containers` giống nhau. Những `containers` này là một `instantiation` của những `images` này(Đọc ở [đây](https://searchitoperations.techtarget.com/definition/Docker-image#:~:text=A%20Docker%20image%20is%20a,Docker%20container%2C%20like%20a%20template.&text=Image%20layers%20are%20also%20read,a%20user%20to%20make%20changes) để hiểu rõ hơn)

`Dockerfile` - Là một tệp chứa các hướng dẫn cần thiết để xây dựng một `Image`. Các lệnh bạn đặt ở đây sẽ chỉ định cách bạn có thể đưa mọi thứ mà ứng dụng của bạn cần vào một `image`.

## 2. Prepare
```
☁  invidual  ruby -v                    
ruby 2.7.2p137 (2020-10-01 revision 5445e04352) [x86_64-linux]
☁  invidual  rails -v
Rails 6.0.3.4
☁  invidual  docker -v
dockerDocker version 19.03.6, build 369ce74a3c
☁  invidual  docker-compose -v
docker-compose version 1.27.4, build 40524192
```
rails: https://gorails.com/setup/ubuntu/18.04

docker: https://docs.docker.com/compose/install/

## 3. Create rails app

```
rails new rails_docker_app
cd rails_docker_app
rails s -p 3000
```

## 4. Setting up Docker
1. tạo Dockerfile
```
# gets the docker image of ruby 2.7.1 and lets us build on top of that
FROM ruby:2.7.1

# install rails dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs libsqlite3-dev

# create a folder /myapp in the docker container and go into that folder
RUN mkdir /myapp
WORKDIR /myapp

# Copy the Gemfile and Gemfile.lock from app root directory into the /myapp/ folder in the docker container
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

# Run bundle install to install gems inside the gemfile
RUN bundle install

# Copy the whole app
COPY . /myapp
```

2.  Khi hiểu hết những câu lệnh trên thì rung `docker build .` để tạo image

Log sẽ trông như thế này
![](https://images.viblo.asia/956c652c-1c8d-4cb4-9fde-037adb7d3cda.png)

Sau đó thì rung `docker images` để kiểm tra những images mới được build :P

![](https://images.viblo.asia/3a184ffe-ec7a-446c-91ef-cf342640e878.png)

Hãy chú ý đến size của image mới được tạo ra: `1.25GB` => Đó là tất cả những packages cần có khi bạo tạo một ứng dụng rails

3. Tiếp đến thì đặt tên cho `image` mới
![](https://images.viblo.asia/755d0b01-65fa-4f80-aba5-d3e58db63276.png)

Trong đó
`rails-app` là tên REPOSITORY
`v.1.0.0` là TAG

## 5. Run Docker with docker-compose
Vì ta sẽ có ít nhất 2 môi trường develop vs production nên để dễ phân biệt(vì nó sẽ khác nhau :v) nên ta sẽ  tách file docker cho 2 mỗi trường

Tạo cho môi trường develop
```
mkdir docker && mkdir docker/development
```
Sau đó thì tạo file docker-compose.yml
```
version: '3'
services:
  db:
    image: postgres
    volumes:
      - ../../tmp/db:/var/lib/postgresql/data
  web:
    build: ../../
    command: bundle exec rails s -p 3000 -b '0.0.0.0'
    volumes:
      - ../../:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
```

Chúng ta tạm define 2 service là `web` vs `db` (bạn có thể thay web thành `api` nếu ý định của bạn chỉ là tạo api-app)
BTW, db sử dụng ở đây sẽ là PostgreSQL - đơn giản là sài MySQL mãi rồi :D

Rồi đơn giản ta sẽ run 2 commands sau:

`docker-compose build`  để build docker image

`docker-compose up` để chạy đồng thời các service trong images(hoặc chạy mỗi cái này cũng được vì nó tích hợp cả build :v)


## 6. Integrating PostgreSQL
1. Add pg to Gemfile
2. Set up `atabase.yml`
```
development:
  adapter: postgresql
  encoding: utf8
  host: db
  username: postgres
  password:
  pool: 5
  database: docker_app
```
3. run docker-compose up
## 7. Intergrating Sidekiq
1. Add gem sidekiq and bundle
2. Run `ails g sidekiq:worker IncrementCount` để tạo worker file
3. Check folder app/worker đã được load chưa? (vì rails cũ có thể không tự động load)
![](https://images.viblo.asia/520b7d40-7687-4507-aad0-2e51c93f68d0.png)

4. Thêm service sidekiq vào docker-compose.yml
```
version: '3'
services:
  db:
    image: postgres
    volumes:
      - ../../tmp/db:/var/lib/postgresql/data
  web:
    build: ../../
    command: bundle exec rails s -p 3000 -b '0.0.0.0'
    volumes:
      - ../../:/myapp
    environment:
      RAILS_ENV: "development"
      REDIS_URL: "redis://redis:6379/12"
    ports:
      - "3000:3000"
    depends_on:
      - db
  redis:
    image: redis
    volumes:
      - ../../tmp/db:/var/lib/redis/data
  sidekiq:
    build: ../../
    command: 'bundle exec sidekiq'
    volumes:
      - ../../:/myapp
    environment:
      RAILS_ENV: "development"
      REDIS_URL: "redis://redis:6379/12"
    depends_on:
      - redis
```
5. Build again
```
cd docker/development/ docker-compose build
cd docker/development/ docker-compose up
```
![](https://images.viblo.asia/e1beeaa1-171b-4cca-b07d-83ec1c4e8fae.png)


Và cũng OK đấy :v 

## 8. Conclusion
Vậy là ta build được một project nhỏ với docker, bài sau chúng ta sẽ cùng tìm hiểu để deploy ứng dụng rails lên AWS với ECS(Elastic Container Service) nhé! :D