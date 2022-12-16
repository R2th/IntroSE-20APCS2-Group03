Việc áp dụng Docker vào dự án hẳn không phải là điều gì quá xa lạ với developer. Docker giúp chúng ta tối ưu công việc cài đặt môi trường trên các máy cần chạy project, từ development cho tới production. Tuy nhiên sử dụng Docker như thế nào cho hợp lý và tối ưu thì không phải ai cũng làm được. Bài viết hôm nay mình xin giới thiệu cách cache lại Bundle của ứng dụng Rails khi bạn config Docker sử dụng Docker Compose

### Đặt vấn đề

Mỗi lần Gemfile thay đổi, đồng nghĩa với việc phải build lại Docker container để load những sự thay đổi đó, cũng có nghĩa là mỗi lần rebuild sẽ phải chạy lại `bundle install` từ đầu, bởi vì Docker sẽ build container mới chứ không ghi đè những thay đổi trên container có sẵn. Khi app của bạn dùng ít gem và những gem của bạn tốn ít thời gian để install thì có thể bạn sẽ cảm thấy no problem. Tuy nhiên khi app càng phình to, nhiều gem được thêm mới hoặc thay đổi version, mỗi lần rebuild container đồng nghĩa bạn sẽ phải ngồi đợi cả thế kỷ, trong khi nếu không dùng Docker thì bạn chỉ sẽ phải đợi install những Gem có sự thay đổi. Vậy thì vấn đề này sẽ xử lý như thế nào khi bạn làm việc với Docker

### Hướng giải quyết

Khi bạn build lại Container, tất cả sẽ được làm mới, chính vì vậy việc đầu tiên sẽ phải lưu trữ những gem đã được install vào một nơi khác chứ không phải là container. Khi build một container, chỉ cần thực hiện check Gemfile có gì thay đổi không, nếu có thì chỉ install lại những gem đó, bỏ qua những gem đã được install.


Vậy thì chúng ta sẽ lưu trữ những gem đã install ở đâu? Ở một folder nào đó của máy chủ đang chạy Docker? Không, Docker cung cấp cho chúng ta một công cụ tên là Docker Volume. Docker Volume có thể tưởng tượng nó như là một cái database độc lập, không liên quan gì đến vòng đời của container, nó sẽ luôn ở đó từ khi chúng ta thực hiện khởi tạo, lưu mọi dữ liệu chúng ta cần và chỉ biến mất khi chúng ta thực sự xóa nó.


Bắt đầu config Docker của app chúng ta với Dockerfile đơn giản như sau:

```dockerfile
# Sử dụng Ruby version 2.6.5
FROM ruby:2.6.5

# Thực hiện cài đặt một số package cơ bản
RUN apt-get update && apt-get install -y build-essential curl cron logrotate gettext-base nano
RUN apt-get clean

# Tạo thư mục làm việc là /app
RUN mkdir -p /app
WORKDIR /app

# Định nghĩa path lưu các gem được cài đặt
ENV BUNDLE_PATH=/bundle \
        BUNDLE_BIN=/bundle/bin \
        GEM_HOME=/bundle
ENV PATH="${BUNDLE_BIN}:${PATH}"

# Expose app ra port 3000 trong container
EXPOSE 3000
```

Điều quan trọng nhất ở đây chính là set những biến môi trường `BUNDLE_PATH`, `BUNDLE_BIN`, `GEM_HOME` vào folder `/bundle`, nhằm khai báo cho Ruby biết bạn muốn lưu trữ các gem được cài đặt trong container vào folder này. Hoặc nếu không muốn, mặc định nó sẽ lưu trong `/usr/local/bundle`. Đường dẫn tới folder này rất quan trọng cho bước tiếp theo.


Với Dockerfile trên, chúng ta hoàn toàn có thể build một image giúp app chúng ta chạy trên đó. Tiếp theo chúng ta sẽ định nghĩa Docker Compose để tiến hành chạy app vào image được tạo bởi Dockerfile vừa viết.

```yaml
version: "3"

services:
  db:
    image: mysql:8.0.13 # Sử dụng offical image mysql version 8.0.13
    volumes:
      - db-data:/var/lib/mysql # Sử dụng volume để lưu dữ liệu tránh mất mát mỗi lần rebuild container
    env_file: .env
    networks:
      - my_docker
  app:
    build: # Sử dụng images build từ dockerfile
      context: .
      dockerfile: docker/ruby/Dockerfile # Trỏ tới Dockerfile vừa định nghĩa
    command: docker/common/wait-for-it.sh db:3306 -- docker/app/entrypoint.sh # command sau khi build service thành công
    volumes:
      - .:/app
      - bundle:/bundle
    ports:
      - 3000:3000
    env_file: .env
    stdin_open: true
    tty: true
    networks:
      - my_docker
volumes:
  db-data:
  bundle:
networks:
  demo_docker:
    external:
      name: my_docker # define network để các container connect với nhau
```

Chúng ta để ý dòng config sau:

```yaml
volumes:
  - bundle:/bundle
```

Chúng ta khai báo với Docker sẽ sử dụng Volume, Volume được định nghĩa dưới tên `bundle` sẽ được mount vào folder `/bundle` trong container, chính là folder mà chúng ta đã định nghĩa ở Dockerfile. Với config này mỗi lần rebuild container, các gem đã cài đặt trước đó sẽ được mount từ Volume vào container, nên ta sẽ không mất thời gian install lại nữa.


Vậy thì việc check bundle đã tồn tại và bundle install gem mới sẽ nằm ở đâu?

```yaml
command: docker/common/wait-for-it.sh db:3306 -- docker/app/entrypoint.sh
```

Ở đây có 2 file là: 

* `wait-for-it.sh`: Đây đơn thuần chỉ là 1 file đợi, mục đích là đợi db ở port 3306 được khởi tạo thành công thì mới chạy file `docker/app/entrypoint.sh`
* `entrypoint.sh`: file này sẽ chứa các lệnh mà mỗi lần deploy sẽ tự động chạy, ví dụ như: migrate db, generate API docs, **bundle install**, ... và khởi động rails server

```bash
#!/bin/bash

set -e
bundle check || bundle install --binstubs="$BUNDLE_BIN"

bundle exec rake db:create
bundle exec rake db:migrate

rm -f tmp/pids/server.pid

bundle exec rails assets:precompile
bundle exec rails server -b 0.0.0.0

exec "$@"
```

Ở dòng lệnh thứ 3, chúng ta sẽ thực hiện `bundle check`, lúc này các gem đã cài đặt đã được mount từ volume vào folder /bundle trong container nên sẽ không thực hiện install những gem này nữa. Sau khi thực hiện check có thay đổi thì sẽ thực hiện `bundle install` những gem có sự thay đổi.


Với những cài đặt trên, chúng ta chỉ cần build images 1 lần bằng lệnh `docker-compose build`.


Và sau đó mỗi lần deploy chỉ cần `docker-compose down` để kết thúc bản build cũ và `docker-compose up` để khởi tạo bản build với code mới. Và tất nhiên, sẽ không còn cảnh chờ đợi bundle install lại từ đầu như vấn đề mình đã nêu ra trước đó. Hi vọng bài viết sẽ giúp ích cho các bạn :D