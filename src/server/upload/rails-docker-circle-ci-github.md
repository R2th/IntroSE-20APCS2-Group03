Như tiêu đề, thì trong bài này mình sẽ hướng dẫn tạo 1 project rails, sử dụng docker, circle CI và check statut pass trước khi merge PR trên github

# Tạo rails app với docker

## Tạo rails app

Trước hết bạn cần tạo mới 1 rails app ở local(nên ở local bạn cần cài đặt rails từ trước)

```
rails new circle-ci -d mysql
```
*mình dùng db là mysql, nên có `-d mysql`*

Khi tạo xong rails app, thì đừng vội làm gì cả, chúng ta sẽ chuyển app vào docker luôn.

Trước tiên, thì bạn có thể hiểu nôm na docker sẽ là 1 cái máy tính riêng biệt, giúp bạn chạy các phần mền, chương trình mà bạn đã cài đặt. 1 cái máy tính thì sẽ có phần cứng, phần mền. Về phần cứng thì thông thường docker sẽ sử dụng tối đa tài nguyên mà máy host(máy tính của bạn đang cài docker), trong bài này mình sẽ không đi sâu về vấn đề này, nếu bạn muốn tìm hiểu, có thể vào vào [đây](https://docs.docker.com/config/containers/resource_constraints/) để đọc thêm. Còn về phần mềm thì thường sẽ có hệ điều hành, cái chương trình cần thiết.

## Tạo Docker

> Nếu bạn biết cài win, hoặc ghost win thì phần docker này sẽ tương đối dễ hiểu.

### Tạo Dockerfile

Dockerfile hiểu nôm na là những câu lệnh để bạn có thể tạo ra 1 *image*, giống như lúc bạn cài win, bạn cần có 1 file win `.iso`, để boot vào usb, rồi sẽ cài vào cái máy tính. Thực ra quá trình này là `ghost` thì đúng hơn, vì ngoài hệ điều hành ra, thì sẽ có sẵn cả những phần mềm cần thiết.

Tạo 1 file tên là `Dockerfile` ngay trong thư mục của project

```Dockerfile
FROM ruby:2.7.1-slim-buster

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl apt-transport-https build-essential && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
      git \
      nodejs \
      yarn \
      libssl-dev \
      default-libmysqlclient-dev \
      && \
    rm -rf /var/lib/apt/lists/*
RUN gem install bundler -v 2.1.4

RUN mkdir /myapp
WORKDIR /myapp
COPY . /myapp

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000
```

Giải thích:

Mấy chữ viết in hoa là syntax của Dockerfile, bạn có thể tham khảo ở [đây](https://docs.docker.com/engine/reference/builder/)

* FROM: như tên tiếng anh, `từ`. Image mà bạn sắp tạo ra sẽ được lấy base theo 1 image khác, giống như để có thể tạo ra file *ghost win* , thì bạn phải có `1 máy chạy win` trước đó. Ở đây mình sẽ dựa theo 1 cái máy `ubuntu`, có cài sẵn ruby 2.7.1. `ruby:2.7.1-slim-buster` là 1 image được người khác tạo ra, up lên mạng, và bạn chỉ việc tải về dùng. Bạn có thể lên [https://hub.docker.com/](https://hub.docker.com/) để tìm nhiều image khác. (image ruby được mình lấy ở [https://hub.docker.com/_/ruby](https://hub.docker.com/_/ruby))
* RUN: sẽ dụng bạn chạy các câu lệnh, các câu lệnh sẽ giống như với các câu lệnh mà bạn gõ với máy thật của mình vậy, cũng cần apt-get update, rồi mới install. Ở đây mình sẽ chạy 1 số câu lệnh để cài các phần mềm, lib cần thiết cho rails app của mình: git, nodejs, yarn, libssl-dev, default-libmysqlclient-dev, rồi bundler để có thể `bundle install` 
* tiếp theo là cái cụm 3 dòng
```
RUN mkdir /myapp
WORKDIR /myapp
COPY . /myapp
```

Mình tạo 1 thư mục tên `myapp` trong cái `máy tính mới` của mình. Tiếp theo thư mục `myapp` sẽ được đặt là thư mục làm việc, các câu lệnh sau WORKDIR sẽ chạy trong thư mục `myapp`, giống như việc `myapp` sẽ là cái `ổ C` để từ giờ có cài đặt, hay copy cái gì sẽ mặc định được cài vào `ổ C`. Sau đó, mình sẽ copy toàn bộ nội dung thư mục circle-ci(là rails project ở máy thật) vào trong myapp

* Kế tiếp, mình sẽ copy file `entrypoint.sh` vào trong `/usr/bin/` và cấp quyền execute cho nó(nghĩa là để chạy 1 file bash, thì thay vì ./usr/bin/entrypoint.sh, thì bạn có thể gọi thằng entrypoint.sh). 
* ENTRYPOINT: sẽ giúp chạy lệnh `entrypoint.sh` khi cái máy tính của bạn được khởi động
* EXPOSE: sẽ set cổng mạng mà cái `máy tính` của bạn sẽ lắng nghe

### Tạo entrypoint.sh

Tạo 1 file `entrypoint.sh` trong thư mục của project

```bash
#!/bin/bash
# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# bundle install
bundle check || bundle install

# if in Dockerfile have CMD
# Then exec the container's main process (what's set as CMD in the Dockerfile).
# exec "$@"

# else
rails s -b 0.0.0.0

```

Thông thường, ở những bài hướng dẫn khác bạn có thể thấy có dòng `CMD ["rails", "server", "-b", "0.0.0.0"]` ở cuối file Dockerfile. Thực chất `CMD` cũng giống như `ENTRYPOINT` cũng là để chạy lệnh khi `máy tính` được khởi động. Do ở đây, mình cần chạy nhiều lệnh, nên thành ra mình gộp chung vào trong file bash này. Bạn có thể đọc thêm về [phân biệt CMD vs ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact)

### Tạo image

Tiếp theo chúng ta sẽ tạo ra 1 cái image để sau này dùng cho việc `cài hoặc ghost win`.

Ở thư mục của project, chạy lệnh

```
docker build -t hatd/circle-ci:3.0 .
```

* `docker build`: là câu lệnh để tạo image
* `-t hatd/circle-ci:3.0`: là option của lệnh build, giúp đặt tên cho image, ở đây image của mình có tên là `hatd/circle-ci`, và image có tag là `3.0`. Ở phần sau mình sẽ giải thích tại sao lại đặt tên như này.
* `.`: dấu `.` này sẽ ám chỉ rằng lệnh build được chạy theo file `Dockerfile` trong cùng thư mục

có nhiều option khác của lệnh build, bạn có thể tham khảo [tại đây](https://docs.docker.com/engine/reference/commandline/build/).

Đợi 1 lúc cho lệnh build chạy xong, chạy lệnh `docker image ls` để hiển thị tất cả các image có trong máy của bạn. Và bạn sẽ thấy image mà bạn vừa tạo ra

### Tạo docker-compose.yml

Docker compose giống như tập lệnh, để giúp bạn khởi động cái `máy tính` của bạn lên vậy

Tạo file `docker-compose.yml` trong thư mục của project

```yml
version: '3'
services:
  db:
    image: mysql:5.7.33
    env_file:
      - .env
    environment:
      - MYSQL_ROOT_PASSWORD=${DATABASE_PASSWORD}
    volumes:
      - mysql_cache:/var/lib/mysql
    networks:
      - internal
  web:
    image: hatd/circle-ci:3.0
    env_file:
      - .env
    volumes:
      - .:/myapp
      - bundle_cache:/usr/local/bundle
    ports:
      - "3000:3000"
    depends_on:
      - db
    networks:
      - internal
    tty: true
    stdin_open: true
volumes:
  mysql_cache:
  bundle_cache:
networks:
  internal:
    driver: bridge

```

Giải thích:

* file docker-compose.yml sẽ được viết theo cú pháp của version 3, tùy thuộc các version khác nhau mà syntax khác nhau, có thể tham khảo [list version](https://docs.docker.com/compose/compose-file/)
* services: liệt kê các `máy tính` mà mình sẽ khởi động, ở đây mình sẽ khởi động 2 máy tính là `db` và `web`. `db` là để chạy mysql làm database, còn `web` là để chạy rails server
* volumes: liệt kê các ô đĩa phụ, giống như trong máy tính có ổ C, ổ D, khi cài win thì sẽ cài vào ổ C, và ổ D còn nguyên, nên sẽ không bị mất dữ liệu.
* [networks](https://docs.docker.com/compose/compose-file/compose-file-v3/#network-configuration-reference): tạo ra các mạng, để các máy tính có thể liên kết với nhau

**Máy tính db**: được cài theo `file ghost`: mysql:5.7.33. Các biến môi trường được lấy từ file `.env`. Do trong file `.env` không có biến MYSQL_ROOT_PASSWORD, nên được liệt kê riêng trong `environment`. Với câu lệnh `mysql_cache:/var/lib/mysql`, cho phép bạn đồng bộ dữ liệu từ `/var/lib/mysql`(config, dữ liệu của mysql) ra ngoài `mysql_cache` và ngược lại. Và cái máy tính này sẽ được kết nối vào mạng `internal`

**Máy tính web**: được cài theo file ghost mà chúng ta vừa tạo trước đó `hatd/circle-ci:3.0`. Máy tính này cũng lấy các biến môi trường từ file `.env`. Máy tính này sẽ đồng bộ thư mục `myapp` trong `máy tính web`, ra ngoài thư mục `circle-ci` ở trên máy thật của chúng ta(việc này sẽ giúp ta khi sửa code ở thư mục circle-ci thì code trong `máy tính web` cũng được sửa theo). `ports: "3000:3000"` sẽ ánh xạ cổng 3000 trong cái `máy tính web` ra cổng 3000 của cái máy tính thật(vì rails server chạy mặc định ở công 3000 mà). `depends_on: db` `máy tính web` sẽ phải đợi cái `máy tính db` được mở xong thì mới được mở, đương nhiên rồi, server mà bật lên rồi trong khi database chưa được bật thì toang. Cùng kết nối vào mạng `internal` để có thể giao tiếp với nhau. 2 thằng `tty: true`, `stdin_open: true` hiểu nôm nà là sẽ giúp bạn khi vào trong `máy tính web` sẽ hiển thị những gì bạn gõ, những dòng log giống với trên terminal ngoài máy thật.

Các syntax + option của docker-compose.yml version 3 được liệt kê trong [đây](https://docs.docker.com/compose/compose-file/compose-file-v3/)
### Start rails server

Trước tiên bạn cần thêm file .env và sửa file config/database.yml

.env
```
DATABASE_HOSTNAME=db
DATABASE_USERNAME=root
DATABASE_PASSWORD=password
```
p/s: `db` chính là tên service db trong docker-compose.yml

config/database.yml
```
.....
default: &default
  adapter: mysql2
  encoding: utf8mb4
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: <%= ENV["DATABASE_USERNAME"] %>
  password: <%= ENV["DATABASE_PASSWORD"] %>
  host: <%= ENV["DATABASE_HOSTNAME"] %>
.....
```

Chạy lệnh sau để khởi động 2 cái `máy tính` của chúng ta

```
docker-compose up
```

đợi 1 chút đển khi rails server start thành công

![](https://images.viblo.asia/15b28b60-8680-40d3-82a1-afde76e6dd29.png)

Tiếp theo là đến công việc create db. Do bây giờ app đã được chạy trong `máy tính web`, nên bạn cần phải vào trong `máy tính web` để có thể chạy lệnh.

Để vào trong `máy tính web`(container web), chạy lệnh

```
docker exec -it circle-ci_web_1 bash
```

* [docker exec](https://docs.docker.com/engine/reference/commandline/exec/): là lệnh giúp vào trong cái `máy tính web`
* -it: là option của lệnh exec, giúp input và output giống với terminal ngoài máy thật vậy
* circle-ci_web_1: là container name(tên của cái `máy tính web`), ở đây có thể dùng container id cũng được, nhưng mình thường dùng container name vì nó dễ nhớ, cấu trúc của container name là `{tên project}_{tên service}_1`(thường service ít khi đặt trùng tên, nên có đuôi là 1 hết). List container đang được bật có thể kiểm tra bằng lệnh `docker container ls`
* bash: đây là lệnh sẽ chạy khi chúng ta vào trong container, nó sẽ mở ra terminal

Khi vào được trong container, chạy mấy lệnh create db như bình thường: `rails db:create`, `rails db:migrate`. Và khi đó bạn có thể truy cập localhost:3000 là sẽ thấy trang root của rails app

> từ giờ trở đi, nhưng lệnh liên quan đến rails như kiểu bundle install, rspec, rubocop là sẽ chạy trong container web nhé

# Config Circle Ci
Trong bài này, mình sẽ sử dụng circle Ci để check việc chạy rspec, rubocop có pass hay không

##  Thêm gem

Thêm 1 số gem cần thiết: rspec-rails, rubocop, rubocop-rails, simplecov, rspec_junit_formatter. Chạy `bundle install`

Thêm 1 model Post: `rails generate scaffold Post title:string body:text published:boolean`, `db:migrate`

Thêm test: mình có thểm 1 số test để có thể chạy rspec (https://github.com/hatd/circle-ci/tree/master/spec)

Sau đó thì chạy `rspec spec/`, `rubocop` để xác nhận pass ở local trước nhé

## Upload docker image

Vì Circle CI cũng dùng docker để dựng môi trường, nên cũng sẽ cần docker image. Vậy nên sẽ cần upload cái image `hatd/circle-ci:3.0` chúng ta vừa mới tạo lên internet, để Circle CI có thể tải về:

1. Hãy đăng kí 1 tài khoản trên https://hub.docker.com/
2. Tạo 1 repository có tên: circle-ci(trùng với cái tên image của chúng ta)
3. Login docker ở local bằng lệnh: `docker login --username=yourhubusername`, `yourhubusername` là username mà lúc bạn đăng kí tài khoản, của mình là `hatd`
4. Push image bằng lệnh: `docker push yourhubusername:imagename`, với trường hợp của mình sẽ là `docker push hatd/circle-ci`. Đấy là lý do, từ đầu mình đặt tên image như vậy. Nếu từ đầu bạn không đặt tên sẵn, thì bạn có thể dùng lệnh `docker tag image_id yourhubusername/repo_name:version_tag` để thay đổi tên với tag của 1 image. [Tham khảo](https://ropenscilabs.github.io/r-docker-tutorial/04-Dockerhub.html)

Như vậy, image của bạn đã được up lên, và circle ci có thể kéo về và build docker
![](https://images.viblo.asia/f39b1258-fc2c-48d3-8530-b41e05ba7ef2.png)


## Thêm config circle ci

Thêm file `.circleci/config.yml` trong project

```yml
version: 2.1
# orbs:
#   ruby: circleci/ruby@0.1.2
references:
  ruby_envs: &ruby_envs
    environment:
      DATABASE_HOSTNAME: 127.0.0.1
      DATABASE_USERNAME: root
      DATABASE_PASSWORD: password
      BUNDLER_VERSION: 2.1.4
      RAILS_ENV: test
  mysql_envs: &mysql_envs
    environment:
      DATABASE_USERNAME: root
      DATABASE_PASSWORD: password
      MYSQL_ROOT_PASSWORD: password
jobs:
  test_rspec:
    docker:
      - image: hatd/circle-ci:3.0
        <<: *ruby_envs
      - image: mysql:5.7.33
        <<: *mysql_envs
    steps:
      - checkout
      - run:
          name: Which bundler?
          command: bundle -v
      - run:
          name: Bundle Install
          command: bundle check || bundle install --jobs=4 --retry=3
      - run:
          name: Build assets
          command: bundle exec rails assets:precompile
      - run:
          name: Database setup
          command: RAILS_ENV=test bundle exec rails db:drop db:create
      - run:
          name: Run Migrate
          command: RAILS_ENV=test bundle exec rails db:migrate
      - run:
          name: Rubocop test
          command: bundle exec rubocop
      - run:
          name: Rspec test
          command: bundle exec rspec spec/
workflows:
  version: 2
  test:
    jobs:
    - test_rspec
```

Giải thích:

* Hiện tại version mà circle ci support là 2, và version cao nhất là 2.1
* Version 2.1 support orbs, cái này mình chưa rõ lắm, nên xin phép bỏ qua
* references: liệt kê các biến môi trường cần sử dụng, vì ở đây các biến này đơn gian, nên có thể được liệt kê trực tiếp vào file, nhưng sau này có những thông tin nhạy cảm, thì sẽ phải setting trong circle ci(DATABASE_HOSTNAME là `127.0.0.1`, chứ không phải là `db` như ở docker-compose.yml nữa nhé)
* jobs: liệt kê các job sẽ được chạy, ở đây mình chỉ có 1 job tên là `test_rspec`
* workflows: liệt kê các job sẽ được chạy qua, theo thứ tự, Ở đây mình có 1 workflow có tên `test`, chạy 1 job `test_rspec`

**job test_rspec**: sẽ được build bằng docker.

* Ở đây sẽ có 2 docker được build, 1 sử dụng image `hatd/circle-ci:3.0` mà mình đã up lên docker hub trước đó, 2 là image mysql, tương tự với mysql mình dùng trong docker-compose.yml, cả 2 sẽ có những biến env cần thiết. 
* steps: liệt kê các bước sẽ cần chạy trong job, theo thứ tự. 
* checkout: nghĩa là git checkout, giúp kéo code về, và đặt trong ~/project 
* run: giúp chạy các câu lệnh, ở đây sẽ cần chạy 1 loạt các lệnh, để đến cuối cùng có thể chạy lệnh `bundle exec rubocop` và `bundle exec rspec spec/` để hoàng thành công việc check

Bạn có thể đọc thêm về các config trong [đây](https://circleci.com/docs/2.0/configuration-reference/?section=configuration)

## Setup Circle CI trên web

> nhớ push code lên github trước nhé

- Đăng nhập vào trang https://app.circleci.com/dashboard, thông qua tài khoản github
- Vào tab Projects, bạn sẽ thấy repository của bên github, chọn `Set Up Project`, khi này sẽ hiển thị  luôn nut `Start Build`, vì chúng ta đã có file .circleci/config.yml và file ý valid. Nếu như chưa có file config.yml, hoặc file bị lỗi gì đó, sẽ có thêm nút download file config, hoặc commit 1 file config vào project

project có file config.yml
![](https://images.viblo.asia/61f02861-8c37-432b-858c-8a80976adc46.png)

project không có file config.yml
![](https://images.viblo.asia/2300d1ed-0929-4417-955f-fe4906f0a18e.png)

- Sau khi nhấn nút `Start Build` bạn sẽ được chuyển sang màn hình pipelines, ở đây bạn sẽ thấy pipeline đầu tiên được chạy, đợi khi nó chạy xong, nếu mà success, thì bạn đã setup xong circle rồi đấy
![](https://images.viblo.asia/59067db3-a0ac-435d-9910-0711732bbe96.png)
 
 Tiếp theo, để khi có commit mới lên github, circle ci sẽ chạy, bạn cần vào `Project Settings`, trong `Advanced`, bật `GitHub Status Updates`
 ![](https://images.viblo.asia/b1ef0eb8-88bb-4315-8937-87c857040fdf.png)

## Caching

Hãy thử push 1 commit mới lên github, và đợi pipeline mới chạy xong, rồi hãy bấm vào job `test_rspec`, và để ý step `Bundle install`
![](https://images.viblo.asia/8f5f7303-1178-4a00-95da-8e67fff45144.png)
thấy nó rất lâu đúng không? Vì mỗi 1 pipeline mới, sẽ build 1 ra 1 docker mới, và sẽ chạy lại bundle install mới, mặc dù không có sửa gì đến gemfile cả, như vậy sẽ rất tốn thời gian. Nên chúng ta sẽ cần cache lại phần này

Sửa lại đoạn step bundle install như sau

```yml
...
- restore_cache:
      keys:
        - v1-gem-cache-{{ checksum "Gemfile.lock" }}
        - v1-gem-cache-
- run:
      name: Bundle Install
      command: bundle check || bundle install --jobs=4 --retry=3
- save_cache:
      key: v1-gem-cache-{{ checksum "Gemfile.lock" }}
      paths:
        - vendor/bundle
...
```

* restore_cache: sẽ khôi phục lại cache có key là `v1-gem-cache-{{ checksum "Gemfile.lock" }}`, nếu cache này không có, circle ci sẽ tìm đến cache có key là `v1-gem-cache-`, nếu không có nữa thì là không có cache nào
* save_cache: sẽ lưu lại cache, với key là `v1-gem-cache-{{ checksum "Gemfile.lock" }}`, dữ liệu được lấy từ path `vendor/bundle`. Tại sao lại là `vendor/bundle`, bạn đến ý, trong list env, mình có để `BUNDLE_PATH: vendor/bundle`, với biến env này, thì bundle install sẽ install gem vào [path này](https://devcenter.heroku.com/changelog-items/1930), nên chúng ta sẽ cache lại các gem đã được install

Sau khi thêm config, thì hãy cùng xem kết quả 

![](https://images.viblo.asia/7547b32c-58e8-423b-a018-e4ae20532697.png)
Vậy là trong step Bundle Install, chỉ tốn thời gian cho `bundle check`

Bạn có thể đọc thêm về caching ở [đây](https://circleci.com/docs/2.0/caching/)

## Wait db:

Sau khi thêm đoạn cache bundle, thì xảy ra 1 vấn đề, đó là các step thực hiện quá nhanh, dẫn đến khi chạy step `Database setup` thì docker mysql chưa được build xong. 
![](https://images.viblo.asia/1b8ad120-cf52-4b3b-b82d-a694ac1f088c.png)


Vậy nên chúng ta cần phải có 1 step nữa là đợi database được sẵn sàng connect thì mới chạy step Database setup

Lượn lờ 1 lúc thì mình thấy có cách này https://stackoverflow.com/a/54249757, đại loại là dùng 1 đoạn script để check host mysql đã sẵn sàng hay chưa. Mình sẽ dùng `wait-for-it.sh`.

Sau thi thêm file [wait-for-it.sh](https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh) vào project, thì thêm step vào trước step Database setup

```yml
...
- run:
      name: Grant script permission
      command: chmod a+x wait-for-it.sh
- run:
      name: Wait db
      command: ./wait-for-it.sh 127.0.0.1:3306 --timeout=300 -- echo 'Mysql service is ready!'
...
```

## Thu thập kết quả test và coverage

Thông thường, thì khi chạy test trên ci, ngoài việc biết test success/error, thì bạn cũng cần biết là nó error ở chỗ nào, chỉ số coverage được bao nhiều %, vậy thì những cái đó hiển thị ở đâu.

Circle CI support việc [collect test data](https://circleci.com/docs/2.0/collect-test-data/) và [coverage](https://circleci.com/docs/2.0/code-coverage/)

Cùng sửa lại 1 chút step Rspec test, và thêm 2 step mới

```yml
...
- run:
      name: Rspec test
      command: |
        mkdir ~/rspec
        bundle exec rspec --format progress --format RspecJunitFormatter -o ~/rspec/rspec.xml
        mv coverage ~/rspec/coverage
      no_output_timeout: 20m
# collect reports
- store_test_results:
      path: ~/rspec

- store_artifacts:
      path: ~/rspec
...
```

lúc này ta sẽ cho output của rpsec thành html, và đặt trong folder `~/rspec`, copy thư mục `coverage`(thư mục được sinh ra bởi gem coverage). Và rồi lưu nó lại

Khi này, khi bấm vào job `test_rspec`, sẽ có thêm 2 tab là `TESTS` và `ARTIFACTS`

Tab TESTS
![](https://images.viblo.asia/738dde1b-060c-4b9f-af52-6d6451a3df42.png)

Tab ARTIFACTS 
![](https://images.viblo.asia/d575722b-70e9-43e0-8fea-b1e6b0f5ac79.png)

Bấm vào `~/rspec/coverage/index.html` bạn có thể qua trang hiển thị coverage của commit đó
![](https://images.viblo.asia/8ce087a7-4f8b-4733-9d0c-60dc6bd80948.png)

# Status check Github

Bây giờ, hãy setup để PR phải pass được circle ci thì mới được merge

1. Vào Settings  của repo
2. Trong tab Branches, thêm 1 rule mới
3. Điền Branch name pattern là branch mà sẽ compare trong PR, thường là master
4. Chọn `Require status checks to pass before merging` rồi chọn `ci/circleci: test_rspec`
![](https://images.viblo.asia/cf748dcd-778f-4c01-8f0b-d014a18998df.png)

Như vậy  trong PR sẽ có thêm phần check status
![](https://images.viblo.asia/55d3c68e-27a2-4937-8a85-c0600c451f18.png)

phải pass thì mới được merge PR
![](https://images.viblo.asia/982476b4-980e-4d91-bc76-ac589581b0b4.png)

Và bạn có thể xem fail ở đâu
![](https://images.viblo.asia/7a2f7fdb-ef81-4f04-abae-0e97c828ab94.png)
![](https://images.viblo.asia/68ef93d3-6d0e-4cea-9eef-7dae329fe28c.png)

Bài viết còn sơ sài, có gì xin hãy góp ý trong phần bình luận cho mình nhé

-----------------------------------------------
Update: mình mới phát hiện ra 1 lỗi khá căn bản, mình có cmt ở dưới, vui lòng check kĩ