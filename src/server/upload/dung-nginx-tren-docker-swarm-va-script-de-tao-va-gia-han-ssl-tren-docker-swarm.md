## 1. Mở đầu
Như bài viết trước mình đã giới thiệu với các bạn về docker swarm, gluster, swarmpit.
Bài biết này mình sẽ triển khai Nginx trên cụm swarm và script để tạo và gia hạn ssl trên cụm swarm của mình nhé.
Cái này rất thích hợp cho các bạn triển khai nhiều domain trên cùng 1 cụm swarm.

## 2. Nào chúng ta cùng bắt đầu.

### 2.1 Trỏ domain về IP của 3 server trong cụm swarm
Cái này thì mình sẽ không viết. Các bạn chỉ cần lên giao diện quản lý domain và thực hiện thao tác trỏ IP là được.

### 2.2 Tạo container Nginx trên docker swarm
 Đầu tiên chúng ta cần tạo container Nginx.
 Chúng ta đăng nhập vào giao diện quản lý cụm swarm theo link http://ipserver:888 như bài trước mình đã làm.
 Chọn **Stacks** => **New Stack**  sau đó chúng ta điền như hình: 
 ![image.png](https://images.viblo.asia/18572430-e7e5-4d93-b629-caf2334ab82d.png)
```
 version: '3.3'
services:
  nginx:
    image: nginx:stable
    volumes:
     - /mnt/data/ceph/letsencrypt/data/:/data/letsencrypt/
     - /mnt/data/ceph/letsencrypt/etc/:/etc/letsencrypt/
     - /mnt/data/ceph/nginx/etc/:/etc/nginx/
     - /mnt/data/www/:/www
    networks:
     - host
    logging:
      driver: json-file
    deploy:
      mode: global
networks:
  host:
    external: true
```
- Ở đây chúng ta mount volumes để lấy file cấu hình ssl và cấu hình nginx lần lượt là **/mn/data/ceph/letsencrypt/** và **/mnt/data/ceph/nginx/etc/**
- Thư mục chứa các file frontend là **/mnt/data/www**

### 2.3 Tạo file cấu hình nginx
Đăng nhập vào 1 trong 3 server trong cụm swarm
Tạo đường dẫn **/mn/data/ceph/letsencrypt/** và **/mnt/data/ceph/nginx/etc/**
![image.png](https://images.viblo.asia/447aef19-1bdd-4a43-8f37-151ac5314a0d.png)
![image.png](https://images.viblo.asia/d7af74d1-1cea-4e55-965d-ceb13927af1c.png)
Các file trong thư mục **/mnt/data/ceph/nginx/etc/** như 1 cấu hình nginx bình thường các bạn có thể cài nginx rồi coppy lên server .
Ở đây ta chỉ chú ý đến file nginx.conf và thư mục conf.d chứa các file cấu hình cho từng domain
File nginx.conf
![image.png](https://images.viblo.asia/5d10e318-8150-4a6c-a747-9444dd306400.png)
```
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
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```
- Trong thư mục conf.d ta tạo file **daotaoyte.edu.vn.conf**
![image.png](https://images.viblo.asia/58530b94-d979-4db5-968e-62686d341953.png)
```
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name  daotaoyte.edu.vn www.daotaoyte.edu.vn;
    ssl_certificate /etc/letsencrypt/live/daotaoyte.edu.vn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/daotaoyte.edu.vn/privkey.pem;

    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    #ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";
    ssl_prefer_server_ciphers on;
    charset utf-8;
    root /www/daotaoyte.edu.vn;	

    location / {
                try_files $uri $uri/home.html home.html;
        }
        location /mail {
                proxy_pass http://localhost:5000/;
        }

}
```

### 2.4 Tạo file để cấu hình ssl (https)
Ở đây mình sẽ dùng 1 script để tạo và gia hạn ssl mình sẽ giới thiệu với các bạn trong bài sau :D.
Bây giờ mình sẽ xài luôn.
![image.png](https://images.viblo.asia/172c7ede-bdd1-4645-8bcb-3bbd0e06c96d.png)

### 2.5 Tạo file build và deploy nginx trên docker
- Sau đó các bạn build file frontend và copy file đó vào thư mục **/mnt/data/ww**
- Tiếp đó chúng ta chỉ cần deploy stacks nginx_proxy bằng cách lên giao diện swarmpit và ấn deploylà xong
![image.png](https://images.viblo.asia/46aefe81-bcba-4b5c-92c7-70b18c831f6d.png)

## 3. Kiểm tra
-Vào trang web vừa triển khai kiểm tra thử 
![image.png](https://images.viblo.asia/5574c1fc-f9d8-4c62-a29f-6ebcdb1e13fc.png)
Chúng ta đã triển khai thành công nginx trên cụm docker swarm.
Do gluster nên dữ liệu đã được đồng bộ trên cả 3 server. Chúng ta trỏ IP cả 3 server về domain nhé. Điều này sẽ giúp phân tải cho server.
Cảm ơn các bạn đã đọc bài viết của mình.