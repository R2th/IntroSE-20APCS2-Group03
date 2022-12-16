Bạn có một ứng dụng đang chạy ở môi trường local, mọi thứ đang ngon ngẻ nhưng một hôm máy tính bạn có vấn đề và buộc phải cài lại máy thế là lại bắt đầu cài đặt tất cả lại từ đầu... (csm) xui thôi =))

Hay đơn giản là một ngày đẹp trời bạn muốn deploy app đó lên internet. Thì mọi thứ sẽ rất vất vả, từ setup ruby/php/python/java đến mysql, redis, elasticsearch rồi còn nginx nữa ..... 
Chưa kể trường hợp oái ăm là local đang chạy elasticsearch 5.3 thì mượt nhưng lúc ở host cài version khác thì app lại lăn quay ra không chạy được, vậy là phải cài lại version khác.

Ứng dụng demo cho chủ đề này sẽ là ứng dụng stream video server - mình đã có một bài viết về chủ đề tạo stream video server các bạn có thể đọc qua để dễ hình dung nhé
https://viblo.asia/p/streaming-videos-server-su-dung-nginx-rtmp-va-hls-maGK7q4Llj2

Với việc dockerize ứng dụng này thì sau này triển khai nó lên môi trường khác cũng sẽ dễ dàng hơn rất nhiều.
Vì thế nên bài viết hôm nay mình sẽ viết về chủ để làm sao đưa một ứng dụng từ chạy dạng local sang chạy dạng services qua các containers bằng docker.

Cùng xem qua vài điểm lưu ý nếu đưa ứng dụng sang dạng containers sẽ gặp những vấn đề gì nhé.

> - Lúc chạy bằng docker thì ổn nhưng tắt docker bật lại thì dữ liệu bị mất hết đúng không?
> - Ở dạng container thì làm sao custom config cho các service bên trong?
> - Nếu chạy bằng docker ở local thì làm sao debug?
> - Xem log của các services ra sao?
> - Làm sao app chạy không bị xung đột cổng với app trên local host?
> 

Để dễ hình dung hãy cùng trả lời một vài câu hỏi sau. Và các vấn đề còn lại mình sẽ dần dần đề cập đến trong bài viết, mọi người tiếp tục theo dõi nhé.

## 1. Input & output của app là gì?

Nói qua về app demo trong bài này để dễ hình dung. Tác vụ chính của app sẽ là upload videos, render videos và stream videos.
Mình sẽ dùng Rails làm backend xử lý video được upload lên, sau đó convert nó qua dạng videos có thể stream được và nginx sẽ stream nó tới client.

Và để render được video thì chúng ta cần có redis, sidekiq chạy ngầm để render video, sidekiq sẽ nhờ vào ffmpeg để render video đó và lưu nó vào một thư mục, nginx được setup để stream video từ thư mục này. Sơ sơ là vậy

Vì app ở đây là web app nên mọi request/response là http, không có socket hay rtmp vì mình chỉ dùng HLS cho việc stream.

- **Input:** ứng dụng với toàn bộ sidekiq, redis mysql, rails, nginx sẽ chạy dưới dạng các services, port ở container sẽ được bind với port ở host.
- **Output:** Http request/response tới web client qua cổng 80

**Bonus thêm:**
Khi client request tới host, mình cần dùng nginx để điều hướng request đó.
Nếu request web app thì sẽ forward nó đến port được map cho container `normal-app`.

Còn request đến HLS để load video stream thì sẽ forward nó đến port được map cho container `nginx-hls`

![](https://images.viblo.asia/3d882765-ab1d-4665-932b-09233d463b8e.jpg)

## 2. App cần những services nào?

App sẽ cần chạy toàn bộ những service sau:
- Sidekiq
- Redis
- NGINX with hls
- Mysql
- Rails app qua puma

## 3. App sẽ expose & bind cổng nào?
Vì app sẽ giao tiếp với client toàn bộ qua cổng 80 nên mọi thứ ở host mình sẽ dùng nginx để điều hướng request.
Còn về phần app thì để tránh xung đột cổng, mỗi service sẽ cần xác đinh cổng sẽ expose ra ngoài host.

```yaml
services:
  normal-app:
    ...
      ports:
        - 3004:3000
    ...
  nginx:
    ...
      ports:
        - 8080:80
    ...
  redis:
    ...
      ports:
        - 63799:6379
    ...
  normal-app-db:
    ...
      ports:
        - 33066:3306
    ...
```

Ở đây chắc các bạn thắc mắc về port mình map. Sao redis lại map `63799:6379`?

Cú pháp khai báo port cho docker-compose.yml là `- <host port>:<container port>`
Docker compose sau khi chạy thì các service có thể gọi qua nhau bởi network của docker tạo ra. Vì thế nên cổng mapping với host cũng không quan trọng mấy vì mình có thể khai báo hoặc không. 

Còn với normal-app và nginx-hls thì cần xác định được map với cổng nào ở host vì app sẽ giao tiếp với host ở 2 service này là chính.

## 4. Chuẩn bị

Như mình có note ở phần đầu bài viết, ứng dụng cần chuẩn bị sẽ là ứng dụng streaming videos server, hoặc có thể là ứng dụng hiện tại của bạn =))

Các setup trước đây là setup bằng tay, và rails app thì mình dùng capistrano để đưa lên. Sau khi chuyển qua docker thành công thì mình đã chạy app bằng docker ở ec2 luôn vì nó khá tiện lợi :)), chỉ có điều là khi có thay đổi hay update gì thì sẽ có một khoảng downtime khi update.
Điểm hạn chế này có thể khắc phục được vì chúng ta có thể setup rolling-update với các version bằng tay hoặc deploy với docker swarm / k8s để có thể có `zero downtime upgrade`.

Và bài toán là migrate ứng dụng này sang chạy dưới dạng service trong các containers và sẽ cần docker cho việc này.
Source code: http://github.com/at-uytran/normal-app

Một vài setup cần thiết:
- Docker:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
apt-cache policy docker-ce
sudo apt-get install -y docker-ce
sudo systemctl start docker
```

- Docker-compose

```shell
sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

Ngoài docker thì cần nginx nếu trên host có nhiều app đang chạy.

```shell
apt-get update
apt-get install nginx
systemctl start nginx
```

### Dockerfile

Vì sao cần image riêng cho ```nginx-hls```?

> Ở đây mình cần một service nginx để chạy giao thức hls (HTTP live streaming), vì vậy cần build image nginx với cấu hình riêng, mục đích là khi chạy app sẽ dùng được hls luôn, chỉ cần vài bước mapping giữa nginx ở host và nginx ở container là ổn. Hơn nữa nếu config ở container thì sẽ không ảnh hưởng gì đến config của nginx ở host mà mình mình đang chạy.
> docker-compose sau khi chạy sẽ expose port 8080 ra host. Nginx ở host sẽ forward request đến container `nginx-hls` đang chạy ở 8080.
> 
Như vậy ở đây chúng ta cần build 2 image, một cho `nginx-hls` và một cho `normal-app`.
Và cấu trúc thư mục của app hiện giờ sẽ như sau:

![](https://images.viblo.asia/a29bd222-686f-48c7-8c6a-5144ed47aec1.png)

#### Build nginx image.

> Quay lại vấn đề nginx cho app, chúng ta cần một image `nginx-hls`, nhiệm vụ của image này sẽ là xử lý những request stream videos thông qua giao thức HLS (base on http). Mình cần truyền file config `hls.conf` vào image này và cấu hình sẽ có luôn khi start container.
> Input environment variable cho image này sẽ chỉ là domain name mà thôi, vì thế ở config mình sẽ truyền vào một biến môi trường là `HLS_DOMAIN_NAME`
> 
- ```normal-app/nginx-config/Dockerfile```

```Dockerfile
FROM nginx

COPY hls.conf /etc/nginx/conf.d/hls.conf

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/hls-data

WORKDIR /usr/src/app
```

- Ở file ```normal-app/nginx-config/hls.conf```

```nginx
server {
    listen 80;
    root /var/www/html;
    server_name ${HLS_DOMAIN_NAME};
    location /hls {
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Expose-Headers' 'Content-Length';

        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        types {
            application/vnd.apple.mpegurl m3u8;
            video/mp2t ts;
        }
        add_header Cache-Control no-cache;
        alias /usr/src/app/hls-data;
    }
}
```

Hãy build image ```nginx-hls``` để dùng trong services sau này thôi nào.

```shell
cd normal-app/nginx-config
docker build -t nginx-hls:dev .
```

#### Build normal-app image.

> Vì app của mình xử lý tác vụ nặng nhất là render videos, chúng ta cần có ffmpeg và ffmpegthumbnailer trong image nên Dockerfile ở đây sẽ hơi khác một chút - sẽ cần cài thêm ffmpeg và ffmpegthumbnailer.
> 
- ```normal-app/Dockerfile```

```Dockerfile
FROM ruby:2.5.3

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN apt-get update
RUN yes | apt-get install ffmpeg
RUN yes | apt-get install ffmpegthumbnailer
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/hls-data

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN rm ./Gemfile.lock
RUN bundle install

EXPOSE 3000
```

Build ```normal-app```:
```shell
cd normal-app
docker build -t normal-app:dev .
```

### docker-compose.yml

- **Với service cho databse mysql**, mình sẽ dùng image `mysql:5.7`
Source: https://hub.docker.com/_/mysql

```yaml
version: "3"

services:
  normal-app-db:
    image: mysql:5.7
    restart: "unless-stopped"
    environment:
      MYSQL_ROOT_PASSWORD: "toor"
    ports:
      - "33066:3306"
    volumes:
      - /var/lib/mysql57-data:/var/lib/mysql
```
Biến môi trường cần truyền vào là `MYSQL_ROOT_PASSWORD`.
Ở container dữ liệu sinh ra sẽ nằm ở `/var/lib/mysql` nên cần mount thư mục này ra ngoài, cần define thư mục `/var/lib/mysql57-data` để chứa data cho container này.
Còn mysql ở container expose cổng 3306 và ở host mình cũng đang chạy mysql nên cần bind với cổng khác. 

Vì thế nên phần ports mình để là ` - "33066:3306"`

- **Với service cho redis** mình dùng image `redis`.
image source: https://hub.docker.com/_/redis/

Redis thì sẽ chỉ cần mapping port cho nó và mount volumes tương tự với mysql là xong.

```yaml
services:
...
  redis:
    image: redis
    ports:
      - "63799:6379"
    volumes:
      - ./redis-data:/var/lib/redis/data
```

- **Với service cho service cho app chính - normal-app**:

App này chính là rails app cần migrate, sử dụng image `normal-app:dev` đã build phía trên. Ở block khai báo `normal-app` này hãy truyền vào các biến môi trường cần dùng.

```yaml
services:
...
  normal-app:
    image: normal-app:dev
    restart: "unless-stopped"
    ports:
      - "3004:3000"
    environment:
      RAILS_ENV: "development"
      MYSQL_USER_NAME: "root"
      MYSQL_HOST: "normal-app-db"
      MYSQL_PASSWORD: "toor"
      MYSQL_HOST_PORT: "3306"
      REDIS_URL: "redis://redis:6379/0"
    command: bash -c "bundle install && bundle exec rails db:create db:migrate && rails server -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/usr/src/app
      - ./hls-data:/usr/src/app/hls-data
    depends_on:
      - normal-app-db
      - redis
    tty: true
    stdin_open: true
```

Lưu ý ở biến môi trường `MYSQL_HOST` chúng ta khai báo là `normal-app-db` service đã khai báo phía trên nhé. `REDIS_URL` cũng tương tự vậy.

**debug với app trong container như thế nào ?**
>  `tty: true` và `stdin_open: true` với hai options này, chúng ta có thể input output trên run log, vì thế chúng ta có thể debug rails app bằng `binding.pry` được rồi, còn nếu bạn không chạy app ở local thì không cần thêm hai option này.
> Để debug với `binding.pry` trên docker thì chỉ cần chạy `docker attach <container id>` là được.
> 

Với option `depends_on`, chúng ta khai báo các service sẽ chạy trước service `normal-app`, tức là normal-app sẽ start ngay khi `normal-app-db` và `redis` đã chạy.

Ngoài ra cũng có thể thay thế option này bằng `links`

- **Với service cho sidekiq**

> Sidekiq sẽ dùng chung cấu trưc thư mục với `normal-app` nên không build qua image mà sẽ build trên thư mục root luôn.
> 
Các biến môi trường sẽ tương tự như với `normal-app`, nếu local bạn cần biến môi trường nào thì ở `sidekiq` cũng cần truyền vào như vậy.

Mình muốn `sidekiq` chạy sau khi `redis`, `normal-app-db` và `normal-app` đã chạy, nên cần define các service đó vào option `links`.


```yaml
services:
...
  sidekiq:
    build: .
    restart: unless-stopped
    volumes:
      - .:/usr/src/app
    environment:
      RAILS_ENV: "development"
      MYSQL_USER_NAME: "root"
      MYSQL_HOST: "normal-app-db"
      MYSQL_PASSWORD: "toor"
      MYSQL_HOST_PORT: "3306"
      REDIS_URL: "redis://redis:6379/0"
    links:
      - redis
      - normal-app
      - normal-app-db
    command: bash -c 'bundle install && bundle exec sidekiq'
```

- **Với service `nginx`**, image sử dụng image đã build phía trên.

Cần truyền value cho `HLS_DOMAIN_NAME` sử dụng cho `/etc/nginx/conf.d/hls.conf` 

```yaml
services:
...
  nginx:
    image: nginx-hls:dev
    restart: unless-stopped
    environment:
      HLS_DOMAIN_NAME: "videos.localhost"
    volumes:
      - ./hls-data:/usr/src/app/hls-data
    ports:
      - 8080:80
    command: /bin/bash -c "exec nginx -g 'daemon off;'"
```

> **Lưu ý:**
> 
> *Ở service nginx chúng ta truyền biến môi trường vào là domain name, vì thế nên ở host sẽ cần quản lý domain name này*
>

*Ở local thì chỉ cần thêm vào /etc/hosts như sau:* 

```shell
sudo nano /etc/hosts
```
Add thêm dòng sau:
```
127.0.0.1 videos.localhost
```

*Còn nếu bạn đang chạy app để expose ra internet thì chúng ta cần thêm subdomain cho videos vào đây và quản lý bằng nginx ở host.*

***Lưu ý**: Có thể có vài điểm config trong bài viết này bị thiếu hay dư hoặc sai ở đâu đó, nếu bạn gặp vấn đề ở đâu có thể để lại comment để cùng giải đáp nhé*

## 5. Run app

Như vậy mọi thứ đã chuẩn bị xong xuôi, chúng ta chỉ cần chạy compose lên là xong.

```shell
cd normal-app
docker-compose up -d
```

```shell
docker ps
```
```shell
uytv2@ip-xxxxxx:~/normal-app$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                                NAMES
d21faca20f82        normalapp_sidekiq   "bash -c 'bundle ins…"   17 hours ago        Up 17 hours         3000/tcp                             normalapp_sidekiq_1
d1cce5198393        normal-app:dev      "bash -c 'bundle ins…"   17 hours ago        Up 17 hours         0.0.0.0:3004->3000/tcp               normalapp_normal-app_1
2d4d09a003bf        mysql:5.7           "docker-entrypoint.s…"   17 hours ago        Up 17 hours         33060/tcp, 0.0.0.0:33066->3306/tcp   normalapp_db2_1
d269a3f5be6b        nginx-hls:dev       "/bin/bash -c 'exec …"   17 hours ago        Up 17 hours         0.0.0.0:8080->80/tcp                 normalapp_nginx_1
0f2cad2075e1        redis               "docker-entrypoint.s…"   17 hours ago        Up 17 hours         0.0.0.0:63799->6379/tcp              normalapp_redis_1

```

**Xem log của app như thế nào ?**

Nếu muốn xem log realtime thì có thể chạy `docker-compose up` còn sau này mọi thứ ổn áp rồi thì chỉ cần thêm option `-d` (Detached mode) vào để app chạy ngầm luôn.

Log reatime ở stdout thì khi chạy không có option `-d`, còn nếu muốn trace logs khi app đang chạy ngầm thì sao?

Để trace log thì chúng ta cần biết log của app sẽ được ghi vào đâu ở container. Khi đã biết được đúng địa chỉ ghi  log thì chúng ta có thể trace dễ dàng qua một trong các cách sau:

- Xem log realtime của một container:

```shell
docker ps
docker logs --follow <container id>
```

- Hoặc execute code ở container để xem logs trong folder của container
Ví dụ muốn trace log nginx:

```shell
docker exec -it <container id> bash -c "/bin/bash"
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## 6. Tạm kết

Như vậy mình vừa trình bày các bước để migrate ứng dụng streaming videos sang dạng containers.
Sau khi migrate xong, ứng dụng của mình có thể chạy ở môi trường bất kỳ nào có cài docker, và app sẽ xuất ra 2 ports là `3004` cho rails app và `8080` cho hls streaming videos.

Nếu chẳng may mình phải cài lại máy hay cần deploy app này lên host khác thì chỉ cần cài đặt docker và thêm nginx để quản lý domain nữa là xong.

Có thể những bài viết sau mình sẽ tiếp tục về cách rolling update để không có downtime khi upgrade app.

Hy vọng bài viết sẽ có ích với ai đang tìm hiểu về docker.
Cảm ơn mọi người đã theo dõi bài viết!