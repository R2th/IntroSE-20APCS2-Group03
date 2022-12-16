Trong bài viết trước, mình đã hướng dẫn các bạn [Cách cấu hình NGINX thành Reverse Proxy](https://viblo.asia/p/cach-cau-hinh-nginx-thanh-reverse-proxy-aWj53jkQl6m). Nhờ có chức năng **reverse proxy**, mà **NGINX** còn có thể trở thành load balancing. Trong bài viết này, mình sẽ giới thiệu về **load balancing** và hướng dẫn các cách cấu hình **NGINX** thành **load balancing**.

Load Balancing (Cân bằng tải) là một thành phần quan trọng của cơ sở hạ tầng mạng, thường được sử dụng để cải thiện hiệu suất và độ tin cậy của các website, ứng dụng, cơ sở dữ liệu và các dịch vụ khác bằng phương pháp phân phối khối lượng công việc cho nhiều máy chủ cùng xử lí.

Mô hình mạng khi công có load balancing như sau:

![](https://images.viblo.asia/b235530f-2577-498a-804a-f34c20ef65c1.png)

Trong mô hình trên, user kết nối trực tiếp tới web server, nếu web server bị quá tải hoặc bị "chết" thì user sẽ không thể truy cập tới web server nữa.

Còn khi sử dụng load balancing, mô hình mạng sẽ như sau:

![](https://images.viblo.asia/1fce49cc-9c44-42fc-9561-995ddac42b5b.png)

Khi sử dụng load balancing, sẽ có ít nhất 1 server giống với server gốc, server đó được gọi là replication server, có vai trò như 1 server gốc, phòng trường hợp server gốc bị quá tải, request sẽ được load balancing điều hướng tới server này để xử lí. Như trong hình trên, request của user sẽ được load balancer điều hướng tới server thích hợp để xử lí.  

Để thể điều phối được request cho server thích hợp, load balancing sử dụng một trong những thuật toán sau:

- **Round Robin:** Khi sử dụng thuật toán này, các request sẽ được phân phối tuần tự cho 1 nhóm server.
- **Weighted Round Robin:** Dựa trên thuật toán Round Robin, người quản trị mạng sẽ dựa vào khả năng xử lí request của từng server và đánh thứ độ ưu tiên cho các server, request sẽ được gửi tới server theo độ ưu tiên của chúng.
- **Least Connections:** Request sẽ được gửi tới server có ít kết nối nhất với client để xử lí.
- **Weighted Least Connections:** Request sẽ được gửi tới server có tốc độ phản hồi response cao nhất và ít kết nối nhất.
- **IP Hash:** Địa chỉ IP của client sẽ được sử dụng để nhận biết server nào sẽ nhận được request từ người dùng.

**1. Chuẩn bị**

Như mình giới thiệu ở phần trên, đối với mô hình mạng sử dụng load balancing thì cần có 1 server gốc và ít nhất 1 replication server. Và trong bài viết này, mình sẽ sử dụng NodeJS để tạo ra 3 server đơn giản. Vẫn giống như bài viết trước, mình sử dụng docker, trong docker có cài sẵn NodeJS, Express và PM2. Các bạn có thể đọc lại bài trước và làm theo.

Ở trong thư mục **/var/www/html**, mình tạo 3 thư mục node_app_1, node_app_2 và node_app_3 như sau:

```
# mkdir node_app_1
# cd node_app_1
# npm install express
# nano app.js

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hey Buddy! Your request is processed by Server 1\n'));
app.listen(3000, () => console.log('Server is running on port 3000!'));
```

```
# mkdir node_app_2
# cd node_app_2
# npm install express
# nano app.js

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hey Buddy! Your request is processed by Server 2\n'));
app.listen(3001, () => console.log('Server is running on port 3001!'));
```

```
# mkdir node_app_3
# cd node_app_3
# npm install express
# nano app.js

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hey Buddy! Your request is processed by Server 3\n'));
app.listen(3002, () => console.log('Server is running on port 3002!'));
```

Sau đó, mình sử dụng PM2 để khởi chạy 3 server mình vừa tạo ở trên:
```
# pm2 start node_app_1/app.js node_app_2/app.js node_app_3/app.js
```

Và khi khởi tạo thành công, kết quả như sau:

![](https://images.viblo.asia/80d17417-feca-48ee-88cb-96ca9b78c265.png)

**2. NGINX Load Balancing sử dụng thuật toán Round Robin**

Mình sẽ thay đổi file **nginx.conf** trong folder **/etc/nginx** như sau:

```
events {

}

http {

    upstream backend_servers {
        server localhost:3000;
        server localhost:3001;
        server localhost:3002;
    } 

    server {
        listen 80;
        server_name nginx-tutorial.test;

        location / {
            proxy_pass http://backend_servers;
        }       
    }
}

```

Lưu ý, khi config như trên, ở trong file /etc/hosts cũng phải sửa như sau:

```
# nano etc/hosts

127.0.0.1        nginx-tutorial.test
```

Và mỗi lần, sửa đổi **nginx.conf**, nhớ dùng câu lệnh sau:
```
# nginx -t
# nginx -s reload
```

Directive **upstream** được sử dụng để khai báo những server xử lí những request mà được load balancer gửi đến. Mỗi khi có một request gửi tới **nginx-tutorial.test** thông qua port **80**. Request đó sẽ được NGINX với vai trò là load balancer điều phối tới server thích hợp nằm trong directive **upstream**.

Để kiểm tra xem thuật toán Round Robin hoạt động đúng hay chưa? Mình sẽ sử dụng như sau:

```
# while sleep 0.5; do curl nginx-tutorial.test; done
```

Và kết quả như sau:

![](https://images.viblo.asia/31aa396d-ce82-4986-87b2-16224690c6c3.png)

Request đã gửi lần lượt tới Server 1, Server 2 và Server 3. Vậy là mình đã cấu hình load balancing sử dụng thuật toán Round Robin thành công.

**3.NGINX Load Balancing sử dụng thuật toán Weighted Round Robin**

Như mình đã giới thiệu, với thuật toán Weighted Round Robin, người quản trị sẽ đánh độ ưu tiên cho server. Để làm được điều này, trong NGINX mình sẽ sử dụng directive **weight** để đánh độ ưu tiên cho server. Mình sẽ thay đổi file **nginx.cof** như sau:

```
events {

}

http {

    upstream backend_servers {
        server localhost:3000 weight=1;
        server localhost:3001 weight=3;
        server localhost:3002 weight=2;
    } 

    server {
        listen 80;
        server_name nginx-tutorial.test;

        location / {
            proxy_pass http://backend_servers;
        }       
    }
}
```

Mình đã đánh độ ưu tiên cho server `localhost:3001` có **weight = 3**, tiêp theo độ ưu tiên cho server `localhost:3002` có **weight = 2** và cuối cùng là server `localhost:3000` có **weight = 1**. Theo như lý thuyết, thì request sẽ được gửi tới cho server `localhost:3001`, tiếp theo là `localhost:3002` và cuối cùng là `localhost:3000`. Kiểm tra kết quả xem có đúng như lý thuyết không bằng câu lệnh:

```
# while sleep 0.5; do curl nginx-tutorial.test; done
```

Kết quả là:

![](https://images.viblo.asia/547c0e76-26b0-4260-80d5-0655ce2e1786.png)


**4. NGINX Load Balancing với thuật toán Least Connections**

Với thuật toán này, load balancing sẽ gửi request tới server có ít connection với client nhất. Để cấu hình NGINX sử dụng thuật toán này, mình sẽ thay đổi file **nginx.conf**  như sau:

```
events {

}

http {

    upstream backend_servers {
        least_conn;
        server localhost:3000;
        server localhost:3001;
        server localhost:3002;
    } 

    server {
        listen 80;
        server_name nginx-tutorial.test;

        location / {
            proxy_pass http://backend_servers;
        }       
    }
}
```

Ơ trong block directive **upstream**, mình sử dụng directive **least_conn** để chỉ định sẽ sử NGINX sẽ sử dụng thuật toán **least connections**.

Kết quả sẽ như sau:

![](https://images.viblo.asia/da8ecf92-06e0-418f-82a1-0cfdd03de83f.png)

Bởi vì 3 server có số lượng kết nối với client như nhau, nên request sẽ được gửi NGINX phân phối tuần tự cho cả 3 server.

**5. NGINX Load Balancing với thuật toán IP Hash**

Đối với thuật toán này, NGINX sẽ dựa vào địa chỉ IP của Client để gửi request tới Server tương ứng. Để NGINX sử dụng thuật toán này, mình cấu hình như sau:

```
events {

}

http {

    upstream backend_servers {
        ip_hash;
        server localhost:3000;
        server localhost:3001;
        server localhost:3002;
    } 

    server {
        listen 80;
        server_name nginx-tutorial.test;

        location / {
            proxy_pass http://backend_servers;
        }       
    }
}
```

Mình sử dụng directive **ip_hash** ở trong block directive **upstream**. Và kết quả là:

![](https://images.viblo.asia/4d8f7ff6-ba39-4e76-94a7-9a660a9b760a.png)

Như vậy request từ Client sẽ được server `localhost:3001` xử lí.

**6. Lời kết**

Trong bài viết này, mình đã giới thiệu cơ bản về Load Balancing và các thuật toán. Cách cấu hình NGINX thành Load Balancer và chỉ định thuật toán cho nó. Hy vọng sẽ giúp ích cho mọi người.