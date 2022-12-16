Tiếp nối bài viết trước [Dynamic Routing trong NGINX](https://viblo.asia/p/dynamic-routing-trong-nginx-Do754dMW5M6), trong bài viết này mình sẽ hướng  dẫn các bạn cách cấu hình NGINX thành Reverse Proxy.

![](https://images.viblo.asia/902b6d0e-740a-42a8-912e-01384dc3ac8f.png)

Reverse Proxy là một server trung gian giữa Client và Server. Nó kiểm soát các request từ Client, và điều phối những request đó tới Server phù hợp, để Server xử lí request đó. Khi Server xử lí xong, sẽ trả về response cho Reverse Proxy, và Reverse Proxy có trả về response đó cho Client.

Một số ưu điểm của Reverse Proxy là:
- Có thể che giấu sự tồn tại và các đặc điểm của các Server thực sự được dùng.
- Load balancing, Proxy có thể chia đều các request của Client tới Server.
- Có thể nén nội dung, tăng tốc độ truy cập.
- Có thể trở thành một application firewall để chống đỡ những cuộc tấn công (ví dụ DDoS) và các ứng dụng Web.

**1. Basic Config**

Để config NGINX thành một Reverse Proxy, mình sẽ sửa file **nginx.conf** như sau:

```
events {

}


http {
        include /etc/nginx/mime.types;

        server {
        listen 80;

        server_name nginx-tutorial.test;

        location / {
           proxy_pass "https://www.google.com/";
        }
    }
}

```

Hãy nhớ rằng, mỗi khi sửa đổi file **nginx.conf**, hãy sử dụng lệnh:

```
nginx -t # Kiểm tra tính hợp lệ của file.

nginx -s reload # Khởi động lại NGINX.
```

Sau đó, mình sử dụng browser truy cập vào URL: `localhost:8080`, kết quả là:

![](https://images.viblo.asia/2a6a2554-b0dd-4685-ba79-3b27c5fcbeb9.gif)

Như vậy, khi mình gửi request tới `localhost:8080`, NGINX sẽ tiệp nhận request và gửi request tới `https://google.com/`, và response từ `https://google.com/` sẽ được NGINX nhận và gửi lại cho browser.

Trong file **nginx.conf**, mình sử dụng directive **proxy_pass**, directive này có tác dụng nhận request từ Client và gửi tới Server tương ứng.

**2. Reverse Proxy với NodeJS**

Ở phần 1, mình đã hướng dẫn cách cấu hình NGINX thành reverse proxy 1 cách đơn giản. Trong phần này, mình sẽ tạo ra một app NodeJS và gửi request tới app này thông qua NGINX.

Đầu tiên, mình cần cài NodeJS với câu lệnh sau:
```
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs
```

Tiếp theo ở trong thư mục `/var/www/html/`, mình làm như sau:
```
# mkdir node_app
# cd node_app
# npm install express
```

Sau đó, mình tạo một file app.js và có nội dung như sau:
```
# nano app.js

const express = require('express')
const app = express()
app.get('/', (req, res) => res.send('Hello World !\n This is tutorial about Reverse Proxy!\n'))
app.listen(3000, () => console.log('Node.js app listening on port 3000.'))
```

Chạy thử xem khởi tạo thành công hay chưa, mình sử dụng:

```
# node app.js
```

Kết quả là:

![](https://images.viblo.asia/2514447b-0d46-47b1-ab50-9f3fa6655e3d.png)

Vậy là đã tạo một app NodeJS đơn giản thành công.

Tiếp theo, mình sẽ cài PM2:

```
# npm install pm2 -g
```

Sau khi cài xong PM2, mình sẽ sử dụng phần mềm này để khởi động app NodeJS mình vừa tạo, bằng câu lệnh:

```
# pm2 start app.js
```

![](https://images.viblo.asia/e8cefdb1-5709-46e1-b99e-01baa5003d1e.png)

Vậy là mình đã khởi động app NodeJS thành công. Tiếp theo, mình sẽ config NGINX như sau:

```
events {

}

http {
    listen 80;
    
    server_name nginx-tutorial.test;
    
    location / {
        proxy_pass http://localhost:3000;
    }
}
```

Bây giờ mình gửi request tới `nginx-tutorial.test`, kết quả là:

![](https://images.viblo.asia/cf4bb61e-ba8a-4fce-ab29-f0fbb1d462cf.png)

Vậy là đã cấu hình thành công NGINX thành một Reverse Proxy với app NodeJS.

**3. Lời kết**

Trong bài viết này, mình đã giới thiệu về Reverse Proxy, ưu điểm của nó. Và hướng dẫn cách config NGINX thành 1 Reverse Proxy. Hy vọng sẽ giúp ích cho các bạn. Ở bài viết tiếp theo, mình sẽ giới thiệu về [Load balancing với NGINX](https://viblo.asia/p/load-balancing-voi-nginx-bWrZnVxnZxw)