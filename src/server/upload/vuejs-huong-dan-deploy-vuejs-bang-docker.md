Bài này mình sẽ hướng dẫn ae deploy 1 vue app kết hợp nginx và docker

# Install docker
Trước tiên bạn phải cài docker trước đã. 

Link cài đặt ở đây nhé: https://www.docker.com/get-started

# Tạo Dockerfile
Ở đây mình lấy ví dụ thư mục chứa project của mình có tên như sau: `vue_app`

Thì bạn tạo file **Dockerfile** có đừong dẫn như sau: `vue_app/Dockerfile`

Với nội dụng:

```docker
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
```

# Tạo .dockerignore file

File `.dockerignore` dùng để bỏ qua những file hoặc folder không muốn đưa vào `image` 

Ở đây mình sẽ bỏ qua 2 thử mục `node_modules` và `dist` không cần thiết để sử dụng trong quá trình deploy

```
**/node_modules
**/dist
```

# Config nginx

`Nginx` là một máy chủ HTTP(s) mà mình sẽ sử dụng trong `docker container`.

Và dứới đây mình tạo 1 file config HTTP đơn giản trên port 80.

Các  bạn có thể tham khảo cách cấu hình tại  https://www.nginx.com/resources/wiki/start/topics/examples/full/

Tạo file `vue_app/nginx.conf` với nội dung là:

```nginx
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
  worker_connections  1024;
}
http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
  access_log  /var/log/nginx/access.log  main;
  sendfile        on;
  keepalive_timeout  65;
  server {
    listen       80;
    server_name  localhost;
    location / {
      root   /app;
      index  index.html;
      try_files $uri $uri/ /index.html;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   /usr/share/nginx/html;
    }
  }
}
```

# Build docker image

Đến bước này thì rất đơn giản, bạn chỉ cần vào thư mục chứa project (`vue_app`) rồi chạy lệnh
```
sudo docker build . -t vue-app
```

- **vue-app** là tên container sẽ tạo ra, bạn có thể thay đổi tùy thích

# Deploy
Sau khi đã build thành công docker image ở bước trên thì lúc này để tiến hành khởi chạy image để tạo ra container bạn hãy chạy lệnh sau:

```
sudo docker run -d -p 80:80 vue-app
```

- 80:80: ở đây có nghĩa là port 80 của server sẽ được link tới port 80 trong docker container

Để test xem web có hoạt động bằng cách
```
curl localhost
```


Chúc các bạn thành công!!!!