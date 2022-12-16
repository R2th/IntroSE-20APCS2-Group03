## 1. Tìm hiểu Dockerfile

***1.1. Dockerfile sinh ra là để giúp chúng ta build 1 Image***. Đây là ví dụ một mẫu Dockerfile:
```
FROM ruby:2.6.5

# Install some basic tools
RUN apt-get update && apt-get install -y build-essential curl cron logrotate gettext-base nano
RUN apt-get clean

# Install yarn because Rails 6 is required
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# Create working directory
ENV APP_DIR /app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# Define path to save installed Gem
ENV BUNDLE_PATH=/bundle \
    BUNDLE_BIN=/bundle/bin \
    GEM_HOME=/bundle
ENV PATH="${BUNDLE_BIN}:${PATH}"

# Install bundler 2.0.2 if you use this version. Because Ruby 2.6.5 installed bundler 1.6.x
RUN gem install bundler -v 2.0.2

# Expose app to port 3000 on container
EXPOSE 3000
```
<br>
**1.2. Ý nghĩa các câu lệnh:**

```
FROM ruby:2.6.5
```
kế thừa từ image ruby version 2.6.5.
<br>

có thể sẽ có dòng này trong Dockerfile:
```
CMD ["echo", "DockerLearning"]
```
có cú pháp là "excutable", "parameter"
<br>
thực hiện command khi run các image đó.
<br>Ở đây nó thực hiện lệnh echo "DockerLearning", tức là xuất ra dòng "DockerLearning" trên command trong quá trình run build image.
<br><br>
Còn câu lệnh này có ý nghĩa là gì:
```
COPY . .
```
Dấu chấm thứ nhất biểu thị ngữ cảnh(context), ở đây ngữ cảnh là tất cả các file ở thư mục mà Dockerfile đang đứng. Tức là toàn bộ file ở thư mục root <br>
Dấu chấm thứ 2 nghĩa là copy vào WORKDIR.
=> Tóm lại là copy context bên ngoài vào thư mục WORKDIR.

**1.3. Tạo entrypoint.sh**

Thường thì ở Dockerfile chỉ setup để build môi trường cho dự án.
Còn các câu lệnh khác không liên quan đến môi trường người ta thường setup vào trong entrypoint.sh. Tạo file entrypoint.sh ở thư mục root như sau:
```
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

À quên, nhắc lại chút là ở trên mình có câu lệnh `COPY .  .` => như vậy mình có docker-entrypoint.sh ở trong image

Để file sh chạy đc, chúng ta phải thực hiện 1 command cấp quyền execute cho nó:
```
RUN chmod +x ./docker_entrypoint.sh
```
Trong Dockerfile, thêm command

```
CMD ["sh", "docker_entrypoint.sh"]
```

**1.4. Cách build image:**

Giờ thì bạn đã có Dockerfile rồi. Để build các image, ta chạy lệnh:
```
docker image build
```
hoặc
```
docker build -t tên_image
```

option ```-t``` nếu bạn muốn đặt tên image có thêm tag (tag dùng để phân biệt các version cho image), ở đây mình đặt tag v1.

```
docker build -t dockerlearn:v1 .
```
**.**  là biểu thị context

![](https://images.viblo.asia/aa4384e2-dcc6-45a6-97b0-cb7a6c806826.png)

- Để xem lại quy trình đóng gói image gồm 2 step giống như đã định nghĩa trong Dockerfile bằng lệnh:

```
docker history dockerlearn
```

![](https://images.viblo.asia/5c81da28-559d-4e1f-9521-3f6a8a2ba7d4.png)

- Bây giờ, mình run image xem có lỗi gì hong nào:

```
docker run -it dockerlearn
```

```
docker run -it dockerlearn:v2 sh
```

:v2 để phân biệt với image last mà bạn vừa build

![](https://images.viblo.asia/5958f350-4cbe-49b6-9c44-0ba6d3d74b04.png)

**1.5. File .dockerignore:**

Những file mà chúng ta muốn exclude ra khỏi ngữ cảnh `.` mà không sử dụng trong quá trình build thì bỏ nó vào trong .dockerignore nhé! Mục đích giúp cho quá trình build nhẹ và nhanh hơn đó :smiley: 

## 2. Build image bằng docker-compose.yml

- Compose là công cụ giúp ứng dụng Docker chạy multi-container. Với Compose, mình sẽ sử dụng định dạng file YAML để cấu hình các services. Mỗi service sẽ là 1 container.

- `Step 1:` Chạy câu lệnh này để download bản mới nhất của Docker Compose.
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

- `Step 2:` Cấp quyền thực thi cho nó
```
sudo chmod +x /usr/local/bin/docker-compose
```

- `Step 3:` Kiểm tra cài đặt thành công chưa
```
docker-compose --version
```

Ví dụ file `docker-compose.yml`
```
version: '3'
services:
  db:
    image: mysql:5.5
    environment:
      MYSQL_USER: root
      MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
    ports:
      - 3306:3306
    volumes:
      - db-volume:/var/lib/mysql

  redis:
    image: redis:3.2.11
    ports:
      - 6379:6379

  memcached:
    image: memcached:1.4
    ports:
      - 11211:11211

  server:
    build: .
    command: /bin/sh -c "rm -f /app/tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/sakura-server
      - bundle-volume:/usr/local/bundle
    ports:
      - 3000:3000
    environment:
      MEMCACHED_HOST: memcached
      REDIS_HOST: redis
      DB_HOST: db
    depends_on:
      - db
      - redis
      - memcached
    tty: true
    stdin_open: true

volumes:
  bundle-volume:
  db-volume:
```

Build 
```
docker-compose up -d
docker-compose down
```

## 3. Share image lên DockerHub
Khi bạn có image hoàn chỉnh mà lại muốn người khác có thể pull về và dùng thì làm thế nào?

Trước tiên, cần tạo tài khoản trên DockerHub và kết nối với DockerHub ở dưới local bằng lệnh:
```docker login -u ${USERNAME} -p ${PASSWORD}```

Hai là, tạo một repo trên Dockerhub.

Rồi, giờ mình có: - USERNAME: tramle

và - REPOSITORY trên docker hub: dockerlearn

Thường thì ta 1 image sẽ có nhiều phiên bản với mỗi lần thay đổi, để lưu lại các version này, bạn cần gắn tag.

Có 3 cách để naming lại tag: 
1. ```docker build -t ${USERNAME}/${REPOSITORY}:${TAGNAME}  .```
2. ```docker tag ${EXISTING-IMAGE} ${USERNAME}/${REPOSITORY}:${TAGNAME}```
3. ```docker commit ${EXISTING-IMAGE} ${USERNAME}/${REPOSITORY}:${TAGNAME}```

**Cú pháp upload docker hub:**
Cách push image lên Dockerhub chẳng khác gì khi bạn push code lên Github cả:
```
docker push ${USERNAME}/${REPOSITORY}:${TAGNAME}
```

**Tóm lại các bước để làm việc với docker-compose:**

1. Khai báo app’s environment với Dockerfile.
2. Khai báo các services cần thiết để chạy app trong docker-compose.yml.
3. Run docker-compose up và Compose sẽ start và run app.

Bài này mình nói khá ngắn gọn, mục đích để các bạn không bị rối, có thể nắm được tổng quát về cách build image với Dockerfile và Docker-compose. Hẹn gặp lại các bạn trong các bài sau :smiley: