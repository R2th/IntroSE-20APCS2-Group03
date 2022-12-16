### Lời mở đầu
Bài viết này sẽ hướng dẫn cho các bạn cách thức deploy ứng dụng [nuxt.js](https://nuxtjs.org/) của bạn bao gồm cả server side-rendering (SSR) với [Docker](http://docker.io/) và sử dụng [nginx](https://www.nginx.com/) như một reverse proxy.

Nếu ứng dụng nuxt của bạn là một SPA đơn giản bạn có thể tham khảo bài viết [Làm thế nào để tự động deploy một ứng dụng Vue/React/Angular lên server?](https://viblo.asia/p/lam-the-nao-de-tu-dong-deploy-mot-ung-dung-vuereactangular-len-server-Az45bW2LKxY), hoặc thậm chí có thể dùng docker tương tự.

### Chuẩn bị
Để cài đặt docker và docker compose trên Ubuntu chạy lần lượt các lệnh sau
```shell
$ sudo apt update
$ sudo apt install -y docker.io git
$ sudo usermod -a -G docker ubuntu
$ sudo service docker start
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

Đối với các server linux của Amazon (EC2) thì có một chút thay đổi
```shell
#!/bin/bash
sudo yum -y update
sudo yum install -y docker git
sudo usermod -a -G docker ec2-user
sudo service docker start
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Phiên bản mình đang sử dụng:
- Nuxt 2.10.2
- Docker 10.09.2
- Docker-compose  1.23.2
- Nginx 1.17

Ở đây mình giả định các bạn đã có một ứng dụng nuxt sẵn rồi, nếu chưa có thì bạn có thể tham khảo thêm [tại đây](https://nuxtjs.org/guide/installation).


### Dockerize
Trước tiên chúng ta sẽ cùng viết `Dockerfile` cho ứng dụng nuxt.

```Dockerfile
FROM node:10.15

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN yarn install
RUN yarn run build

ENV HOST 0.0.0.0
```

- Line 1: Cài đặt môi trường node. Thật ra image node:10.15 này sẽ cài đặt HĐH Ubuntu và môi trường node. Thay vì bạn phải tự cài ubuntu, cài node... các thứ thì người ta đã đóng gói sẵn một image có sẵn các thứ cơ bản của node.
Bạn nên chọn nuxt version giống với version bạn đang chạy trong quá trình development để tránh những lỗi không tương thích mất thời gian không cần thiết.
- Line 2: Khai báo biến môi trường `APP_ROOT`, nơi sẽ chứa toàn bộ source nuxt __bên trong container__, bạn muốn đặt tên gì cũng được, mình tạm đặt là `src`.
- Line 3: Đơn giản là tạo thư mục tên `src`, vì bên trong container mới build sẽ không có thư mục này.
- Line 4: Khai báo thư mục làm việc, các lệnh khác khi run sẽ lấy ngữ cảnh tại thư mục này. Ở đây là thư mục `src`
- Line 5: Lệnh `ADD` sẽ copy source code từ máy thật (server) vào bên trong container trong thư mục `src`.
- Line 6 - 7: Cái này quá quen thuộc rồi ha. Một tips ở đây là bạn nên dùng đúng dependency management mà bạn đã dùng ở môi trường development. Ví dụ mình dùng [yarn](https://yarnpkg.com/), bạn có thể đang dùng `npm` - hãy cứ đổi thành npm. Vì file `.lock` của yarn và npm khác nhau, để tránh lỗi khi install và build nên dùng đúng cái.
- Line 8: Khai báo biến môi trường cho quá trình build thôi, app sẽ serve trên địa chỉ này.

Thỉnh thoảng bạn sẽ gặp một số bài viết hướng dẫn bạn thêm file `.dockerignore` với nội dung đại loại như này:
```.dockerignore
node_modules
npm-debug*
.nuxt
```
Cái này chỉ cần thiết khi bạn dockerize cho môi trường development ở local. Khi deploy lên server thật code được pull về từ github, chỉ cần bạn không chạy lệnh `yarn install` thì sẽ không có các mục trên đâu. 

Login vào server qua SSH và build:
```shell
$ docker build -t my_awesome_app .
```
Sau đó run container
```shell
$ docker run -it -p 80:3000 my_awesome_app
```
Bạn sẽ nhìn thấy log kiểu như sau:
```
   ╭─────────────────────────────────────────────╮
   │                                             │
   │   Nuxt.js v2.10.2                           │
   │   Running in production mode (universal)    │
   │                                             │
   │   Listening on:                             │
   │   http://192.16.32.1:3000/                  │
   │                                             │
   ╰─────────────────────────────────────────────╯
```
App của bạn đang chạy ở cổng 3000 bên trong container và nó được map ra cổng 80 của server. Bây giờ bạn có thể truy cập ứng dụng thông qua địa chỉ IP của server ở cổng 80.

### Sử dụng nginx làm reverse proxy
Sau bước trên ứng dụng của bạn đã có thể chạy được, tuy nhiên thực tế thì có thể bạ sẽ muốn sử dụng thêm nginx để tận dụng 1 số lợi thế của nó (vs caching).

Việc cấu hình nginx cũng rất đơn giản, nhưng nếu build nginx lên một container khác nghĩa là đang chạy multiple-containers khi đó mình khuyên bạn nên sử dụng thêm `docker-compose` sẽ dễ dàng xây dựng và quản lý hơn, chỉ cần thêm 1 file thôi (yaoming).

```docker-compose.yml
version: "3"

services:
  nuxt:
    build: .
    container_name: nuxt
    restart: always
    env_file: .env
    command: "yarn run start"
    networks:
      - flat-network

  nginx:
    image: nginx:1.17
    container_name: nginx
    env_file: .env
    ports:
      - "${APP_PORT}:80"
    volumes:
      - .nginx:/etc/nginx/conf.d
      - "${LOG_PATH}:/var/log/nginx"
    depends_on:
      - nuxt
    networks:
      - flat-network

networks:
  flat-network:
```

Xạo lồng đó, thêm 1 file `.env` nữa (LOL)
```.env
NODE_ENV=development
APP_PORT=8080
LOG_PATH=./logs
```
Giải thích nhé:
- `docker-compose.yml`
    -   `services` các docker service sẽ chạy, ở đây mình sẽ có 2 service là `nuxt` và `nginx` lần lượt chạy nuxt app và nginx reverse proxy, đặt tên tuỳ ý sao cho dễ hiểu là được.
        -    `build`  docker sẽ build tại ngữ cảnh được chỉ định (context) `.` theo cấu hình trong `Dockerfile`.
        -    `image` chỉ định image để build thay thì đường dẫn đến thư mục để build, image tương tự như trong `Dockerfile`.
        -    `container_name` tên container, nên đặt tên dễ hiểu để tiện quản lý.
        -    `env_file` chỉ định file chứa biến môi trường phục vụ cho quá trình build. Ở đây mình có 1 lưu ý cho bạn là nên đặt file `.env` cùng thư mục với context của docker để tránh những phiền phức đau đầu không đáng (yaoming).
        -    `ports` mapping port bên trong container ra server bên ngoài. 

             Trong service `nuxt`, nếu bạn khai báo thêm `3333:3000` thì sẽ quay lại như trường hợp bước dockerize phía trên, app của bạn sẽ được serve ở cổng `3333` của server (không qua nginx). Ở đây mình dùng nginx nên trong service `nuxt` không cần mapping port nữa. 
             
             Trong service `nginx` bạn sẽ bind cổng `{APP_PORT}` ở server thật vào __cổng 80 của `nginx` bên trong container__, cổng 80 bên trong container sẽ forward vào cổng 3000 của service nuxt (xem file cấu hình nginx bên dưới).
        -    `depends_on` ràng buộc - đợi service `nuxt` start thành công mới start service `nginx` (lưu ý là `depends_on` chỉ đợi srart xong chứ không đợi đến khi "ready" nhé).
        -    `volumes` mount đường dẫn giữa server thật và bên trong container, ở đây bạn hiểu nôm na là bên trong container tạo 1 shortcut (symbolic link) đến thư mục được chỉ định ở bên ngoài server. Như vậy mọi thay đổi về nội dung bên trong thư mục này được cập nhật đồng bộ giữa bên trong container và server bên ngoài (host). [Đọc thêm về volumes](https://docs.docker.com/compose/compose-file/#volumes).

             Ở đây mình sẽ mount file config nginx vào và container và lưu file logs của nginx ra ngoài host.
        -    `networks` khai báo các networks mà service sẽ join vào.
        -    `command` lệnh sẽ chạy sau khi build xong.
    -   `networks` tạo networks, mỗi service sẽ chạy trên mỗi máy khác nhau (container), cần connect vào chung 1 network mới có thể giao tiếp với nhau.
- `.env` file biến môi trường quá quen thuộc rồi, tuy nhiên mình cũng xin lưu ý với các bạn là không có các dấu `"` hay `'` gì đâu nhé. Nó sẽ hiểu các dấu quote đó là 1 phần giá trị của biến.
    - `NODE_ENV` môi trường build.
    - `APP_PORT` cổng mà ứng dụng sẽ chạy khi truy cập IP của host.
    - `LOG_PATH` đường dẫn đến thư mục chứa log của nginx.

Thêm 1 file nữa =))
```.nginx/default.conf
server {
  listen       80;
  server_name  localhost;

  client_max_body_size 64M;

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  location / {
    proxy_pass http://nuxt:3000;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
Lưu ý bạn đừng đổi tên đường dẫn và tên file, nếu không thì tự mà đi sửa lại trong `docker-compse.yml` :smirk:

Trong đây có 2 cái mình muốn giải thích:
- `listen 80` lắng nghe ở cổng `80`, nếu bạn thích đổi con số, thì phải đổi cả khai báo trong `docker-compose.yml`: 
```yml
  - ports:
    - "${APP_PORT}:80"
```
- `proxy_pass http://nuxt:3000` trong đó `nuxt` là tên service bạn khai báo ở `docker-compse.yml`.

Rồi chiến thôi, login lên server qua SSH, và chạy lệnh build rồi run containers:
```shell
$ docker-compose build
$ docker-compose up
```
Đó là trong trường hợp bạn muốn test thử xem có lỗi lầm gì không, thực tế thì bạn sẽ làm như thế này:
```sh
$ docker-compose up --build --detach
```
- `--build` Build images trước khi containers.
- `--detach` hoặc `-d` chạy containers ở background, in ra tên các container mới.

### Tổng kết
![](https://images.viblo.asia/ae20400a-37cc-4712-803b-f10272d02c13.jpg)

Mình cũng là tay mơ với docker cũng như nuxt, nếu bạn có bất kỳ lời khuyên hoặc góp ý cứ thoải mái để lại comment bên dưới. Nếu thấy bài viết có ích cho bạn hoặc cộng đồng, cho nó 1 up vote.

__Thank you for reading!__