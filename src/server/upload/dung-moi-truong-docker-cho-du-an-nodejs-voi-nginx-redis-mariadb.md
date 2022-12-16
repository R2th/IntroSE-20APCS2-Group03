Sắp tới mình và bạn có dự định xây dựng một trang web sử dụng NodeJs với MariaDB, tuy nhiên vấn đề dựng môi trường làm sao để khi cả team phát triển trang web sẽ thuận lợi nhất. Có một số phương án đưa ra như tự cài đặt từng phần, hay LEMP, Docker... thì cuối cùng đã quyết định lựa chọn Docker. Bài viết này sẽ mô tả quá trình dựng môi trường phát triển trang web.
![](https://images.viblo.asia/17b277c9-03c0-4430-a21e-51feaf125099.png)

## Bắt đầu
Trong bài viết này, mình sẽ sử dụng `nodemon` thể theo dõi và cập nhật sự thay đổi của code. 

Redis sẽ như một session storage phục vụ mục đích lưu trữ dữ liệu khi `nodemon` reboot.

Những container cần quan tâm:
- Đương nhiên sẽ phải có container Node. Version: 10.10
- Container Nginx. Version: 1.15
- MariaDB. Version: 10.2
- Redis. Version: 3.2
- PHPMyadmin để quản lý CSDL MariaDB. Mình sẽ tận dụng luôn image chuẩn của PHPMyadmin ở trên dockerhub. Version: 4.6

Cuối cùng là docker-compose Version 3, đương nhiên sẽ phải sử dụng để đơn giản hóa việc xây dựng môi trường chỉ trong một file.

Và tất cả nhưng file cài đặt docker được lưu trong đường dẫn `.docker/services` để tách riêng khỏi những project khác.

# 1. Node
Trước tiên sẽ tạo thư mục `node` trong *.docker/services* để khai báo nơi lưu file cài đặt.

Ở đây mình sẽ sử dụng image node version 10.10. Tuy nhiên sẽ không dùng trực tiếp luôn mà sẽ có một số option khác bổ sung. Vì vậy mình tạo thêm một *Dockerfile* cho container này.
Giả sử sắp tới mình sẽ làm việc với Express-js, vì vậy mình sẽ cài `express-generator` và `nodemon` global.
Và đây, Dockerfile Node container có từng này dòng:
```
FROM node:10.10

RUN npm install express-generator nodemon -g
```
Mốt số chú ý:
- Khi cài đặt, docker phải chép file vào một thư mục tạm và sau đó thay đổi access mode của file đó. Như vậy sẽ không ảnh hưởng đến việc sử dụng sau này.
- Thư mục làm việc trong docker container của mình sẽ là */var/www/app*, vì vậy mình vẫn sẽ mout đường dẫn project tới đó.

Giờ Dockerfile đó sẽ build ra được container, tuy nhiên nó không chạy được project node nên mình phải tạo một file .sh khác để chạy project: 
```shell
#!/bin/bash

yarn install

nodemon www/bin

```
Giờ trông file docker-compose sẽ như thế này: 
```yaml
version: "3"

services:
  node:
    build:
      context: ./.docker/services
      dockerfile: ./node/Dockerfile
    working_dir: /var/www/app
    volumes:
      - .:/var/www/app
    command: [/bin/bash, ./.docker/services/node/command.sh]
    tty: true
```
Còn dưới đây sẽ là cây thư mục trong *.docker/services*:
```yaml
- .docker
    - services
        - node
            Dockerfile
            command.sh
```

# 2. Nginx 
Bước tiếp theo chúng ta sẽ tạo 1 container cho Nginx. 

Các file setting của Nginx sẽ được đặt trong folder *.docker/services/nginx*:

Do toàn bộ project & Phpmyadmin sẽ được serve trên Nginx thông qua ssl, vậy nên chúng ta sẽ cần sử dụng các packages & libraries hỗ trợ, và phải config khá nhiều. Vậy nên chúng ta sẽ không sử dụng trực tiếp image của nginx mà sẽ cài thông qua Dockerfile.

Nginx container sẽ được build dựa trên ubuntu, và sẽ cài đặt thêm 1 số package hỗ trợ như: curl, zip, vim ...

Dockerfile cho Nginx:

```
FROM nginx:1.15

LABEL maintainer="tiennguyenhoang339@gmail.com"

# Install modules
RUN apt-get update && apt-get install -y \
    g++ \
    zip \
    vim \
    curl \
    openssl \
    libssl-dev \
    --no-install-recommends apt-utils \
    && rm -r /var/lib/apt/lists/*

WORKDIR /var/www/app
```

Do Nginx sẽ được serve thông qua ssl, nên chúng ta cần gen ra các file certificate.
Để gen được các file certs này, chúng ta sẽ tạo 1 file command.sh  như sau: 
```shell
#!/bin/bash

certDir=".docker/services/nginx/certs"

if [ ! -f "$certDir/ssl.key" ]; then
  mkdir -p $certDir
  openssl genrsa 2048 > "$certDir/ssl.key"
  openssl req -new -x509 -nodes -days 365 -subj "/C=VN/ST=Ha Noi/L=Ha Noi City/O=ABC/OU=ABC/CN=ABC" -key "$certDir/ssl.key" -out "$certDir/ssl.crt"
  chmod 700 "$certDir/ssl.key"
  chmod 700 "$certDir/ssl.crt"
fi

nginx -g "daemon off;"
```

**Lưu ý:** 
- Các file certificate sẽ được gen vào folder *certs* bên trong folder *.docker/services*, nhằm tách biệt với các file setting khác.
- Các file cài đặt (Dockerfile, command.sh) sẽ được đặt trong folder *build*.
- Sau khi dùng openssl để gen ra các file certificate, chúng ta cần giữ cho nginx container tiếp tục hoạt động, vậy nên sẽ cần tới lệnh: `nginx -g "daemon off;"`

Tiếp theo, chúng ta cần config để nginx có thể serve được cho project. Lưu ý rằng project của chúng ta được up bởi nodemon,  vậy nên nginx sau khi tiếp nhận request sẽ cần forward request này tới node container.

Để project có thể được serve trên cổng 443 (thông qua https), chúng ta sẽ cần config trong file **default-ssl.conf** (file này sẽ được đặt trong folder *conf.d* bên trong folder *nginx*):

```
server {
  listen 443 ssl default_server;
  listen [::]:443 ssl default_server;
  ssl_certificate /var/www/app/.docker/services/nginx/certs/ssl.crt;
  ssl_certificate_key /var/www/app/.docker/services/nginx/certs/ssl.key;

  server_name localhost;

  charset utf-8;
  sendfile off;
  client_max_body_size 100m;

  location / {
    proxy_pass http://node:8000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  access_log /var/www/app/.docker/logs/nginx/access.log;
  error_log /var/www/app/.docker/logs/nginx/error.log;
}
```

Tại Nginx container, chúng ta sẽ lắng nghe tại cổng 443, bắt request và chuyển tiếp tới port 8000 của container Node.
Mọi request access & các error sẽ được log tại file access.log & errors.log mỗi khi Nginx tiếp nhận 1 request.

**Lưu ý:**

Tới đây, nginx đã có thể serve project. Và folder nginx sẽ có cấu trúc:
```yaml
- .docker
    - services
        - node
        - nginx:
            - certs: 
                - ssl.key
                - ssl.crt
            - build:
                - Dockerfile
                - command.sh
            - conf:
                - default-ssl.sh
```

Và file docker-compose.yml:
```yaml
version: "3"

services:
  node:
    build:
      context: ./.docker/services
      dockerfile: ./node/Dockerfile
    working_dir: /var/www/app
    volumes:
      - .:/var/www/app
    command: [/bin/bash, ./.docker/services/node/command.sh]
    tty: true

  nginx:
    build:
      context: ./.docker/services/
      dockerfile: ./nginx/build/Dockerfile
    command: [/bin/bash, .docker/services/nginx/build/command.sh]
    ports:
      - "443:443"
      - "6969:6969"
    volumes:
      - ./.docker/services/nginx/conf:/etc/nginx/conf.d
      - .:/var/www/app
    working_dir: /var/www/app
```

**Lưu ý:**
- Trong file `docker-compose.yml`, chúng ta mount các file trong folder *conf.d* vào trong thư mục */etc/nginx/conf.d*. Việc mount như vậy sẽ giúp chúng ta tạo ra 1 bản live-copy của các file config bên trong thư mục cài đặt của nginx. Bất cứ khi nào chúng ta chỉnh sửa nội dung của các file config bên trong project, các file config bên trong nginx cũng sẽ có content mới nhất.
- Với việc chúng ta mount project vào folder */var/www/app*, nên nginx cũng có thể truy xuất tới các file certs bên trong dự án với đường dẫn tuyệt đối */var/www/app/.docker/services/nginx/certs/ssl.crt*.
- Các request access tới project hoặc các error sẽ được log trong file với tên tương ứng.
- Do chúng ta mong muốn project được serve trên port 443 với ssl, nên docker sẽ mount port 443 ra ngoài máy host. Còn với port 6969 sẽ được sử dụng cho phpmyadmin (ở phần sau).

# 3. MariaDB
Với dự án hiện tại, mình sẽ sử dụng Mariadb. Nếu muốn bạn có thể chuyển sang Mysql. Việc cài đặt sẽ không có quá nhiều khác biệt (do Mysql cũng đã có rất nhiều official image trên Dockerhub).

Việc config cho Mysql khá đơn giản. Do không cần sử dụng tới các packages khác, chúng ta có thể sử dụng trực tiếp image của mariadb với phiên bản 10.2:

- docker-compose.yml file:
```yaml
version: "3"

services:
  node:
    build:
      context: ./.docker/services
      dockerfile: ./node/Dockerfile
    working_dir: /var/www/app
    volumes:
      - .:/var/www/app
    command: [/bin/bash, ./.docker/services/node/command.sh]
    tty: true

  nginx:
    build:
      context: ./.docker/services/
      dockerfile: ./nginx/build/Dockerfile
    command: [/bin/bash, .docker/services/nginx/build/command.sh]
    ports:
      - "443:443"
      - "6969:6969"
    volumes:
      - ./.docker/services/nginx/conf:/etc/nginx/conf.d
      - .:/var/www/app
    working_dir: /var/www/app

  db:
    image: mariadb:10.2
    expose:
      - "3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: helloworld
      MYSQL_USER: user
      MYSQL_PASSWORD: secret
```
**Lưu ý:**
- port 3306 của Mariadb cần được expose ra để các container khác có thể truy xuất tới.
- data của container này cũng có thể được mount ra ngoài (nếu cần):
```yaml
volumes:
  - ./.docker/services/mariadb:/var/lib/mysql
```
- Lưu ý việc mình đặt tên của container này là **db**.  Nếu bạn muốn đặt tên khác cho container, bạn sẽ cần config giá trị  **host** bên trong file **config.inc.php** của Phpmyadmin.
# 4.PHPMyadmin
Như đã đề cập ở trên, mình sẽ sử dụng image chuẩn của *phpmyadmin/phpmyadmin*:
```yaml
 phpmyadmin:
    image: phpmyadmin/phpmyadmin:4.6
```
Và muốn lưu những cài đặt vào cùng thư mục thì thêm dòng:
```yaml
volumes:
  - .:/var/www/app
```
Vì PHPMyadmin của mình sẽ phải serve trên Nginx, nên sẽ phải forward request từ trình duyệt đến Nginx container, sau đó Nginx container sẽ forward request tới *phpmyadmin* container.

Khi đó sẽ phải thêm các file này vào thư mục *.docker/services/nginx/conf*:
```
server {
  listen 6969 ssl default_server;
  listen [::]:6969 ssl default_server;
  ssl_certificate /var/www/app/.docker/services/nginx/certs/ssl.crt;
  ssl_certificate_key /var/www/app/.docker/services/nginx/certs/ssl.key;

  server_name localhost;

  charset utf-8;
  sendfile off;
  client_max_body_size 100m;

  location / {
    proxy_pass http://phpmyadmin:80;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  access_log /var/www/app/.docker/logs/nginx/access.log;
  error_log /var/www/app/.docker/logs/nginx/error.log;
}
```
Những config này tương tự ở *default-ssl.conf* đã thực hiện ở trên. Chỉ khác ở chỗ request sẽ được forward tới cổng 80 của *phpmyadmin* container (Do *phpmyadmin* sẽ expose cổng 80 nên cổng sẽ là 80).

Do mình muốn phpmyadmin sẽ được serve ở cổng 6969 trên Nginx, nên mình sẽ mout cổng này ra host:
```yaml
 nginx:
    build:
      context: ./.docker/services/
      dockerfile: ./nginx/build/Dockerfile
    command: [/bin/bash, .docker/services/nginx/build/command.sh]
    ports:
      - "443:443"
      - "6969:6969"
    volumes:
      - ./.docker/services/nginx/conf:/etc/nginx/conf.d
      - .:/var/www/app
    working_dir: /var/www/app
```

# 5. Redis
Công việc cuối cùng đó là thêm redis container vào `docker-compose.yml`:
```yaml
redis:
    image: redis:3.2
```

# 6. Chạy docker-compose up
Sau công việc setup, file `docker-compose.yml` hoàn thiện sẽ giống bên dưới:
```yaml
version: "3"

services:
  node:
    build:
      context: ./.docker/services
      dockerfile: ./node/Dockerfile
    working_dir: /var/www/app
    volumes:
      - .:/var/www/app
    command: [/bin/bash, ./.docker/services/node/command.sh]
    tty: true

  nginx:
    build:
      context: ./.docker/services/
      dockerfile: ./nginx/build/Dockerfile
    command: [/bin/bash, .docker/services/nginx/build/command.sh]
    ports:
      - "443:443"
      - "6969:6969"
    volumes:
      - ./.docker/services/nginx/conf:/etc/nginx/conf.d
      - .:/var/www/app
    working_dir: /var/www/app

  phpmyadmin:
    image: phpmyadmin/phpmyadmin:4.6

  db:
    image: mariadb:10.2
    expose:
      - "3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: helloworld
      MYSQL_USER: user
      MYSQL_PASSWORD: secret

  redis:
    image: redis:3.2
```

Và thư mục *.docker/services*: 
```yaml
- .docker
    - services
        - nginx
            - build
                - Dockerfile
                - command.sh
            - certs
                - ssl.key
                - ssl.crt
            - conf
                - default-ssl.conf
                - phpmyadmin.conf
        - node
            - Dockerfile
            - command.sh
```

# Kết luận
Cũng khá vất vả để có thể setup môi trường bằng Docker, tuy nhiên việc sử dụng lại tiện lợi hơn rất nhiều. Cám ơn @tiennguyenhoang339 đã  hỗ trợ mình trong quá trình thực hiện đầy gian nan này.

Mong là mọi người sẽ tìm được những phần hữu ích. Cám ơn đã theo dõi!

Tham khảo:

https://www.digitalocean.com/community/tutorials/how-to-set-up-laravel-nginx-and-mysql-with-docker-compose