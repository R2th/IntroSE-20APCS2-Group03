Nginx một web services khá mạnh cho hiện tượng C10k . Có rất nhiều cấu hình của nó mà mình đã xem qua . Đa phần sysadmin không tìm hiểu kỹ về nó , đưa ra những tham số rất nguy hiểm cho hệ thống . Và vấn đề giải quyết các session như thế nào luôn làm các sysadmin lúng túng ,đôi khi phó mặc cho Dev phía dưới giải quyết vẫn đề này .

 Trước khi đi vào chi tiết cách giải quyết vấn đề này , đảo qua một chút về các thuật toán liên quan tới cân bằng tài của Nginx .

**round-robin** —Khi Client gửi kết nối tới server , Nginx sẽ tuần tự gửi gói tin tới những backend phía sau . <br>
**least-connected** — request tiếp theo của client sẽ đc gán tới backend có ít kết nối nhất .<br>
**ip-hash** — Đây là một “hash-funcsion” (chức năng băm ) . Được sử dụng để xác định máy chủ phục vụ dựa trên địa chỉ client .<br>
Mặc định của Nginx sử dụng thuật toán round-robin với cấu hình :

```
http {
    upstream myapp1 {
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://myapp1;
        }
    }
}
```
Khi muốn sử dụng thuật toán least-connected chỉ cần khai báo

```
upstream myapp1 {
        least_conn;
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
    }   
```

Với 2 thuật toán này Nginx hoàn toàn không giữ đc các session giữa client và server backend , điều này phụ thuộc vào phía ứng dụng keep các phiên làm việc tới client có thể dự trên memcache hoặc redit 

Thuật toán ip_hash hay còn gọi là ” Session persistence ” hay “Session Sticky ” (duy trì phiên ) sẽ giúp việc giữ các kết nối từ 1 client tới 1 backend trong upstream nhất định . Với ip-hash, địa chỉ IP của client sẽ được sử dụng như một hashing key để xác định máy chủ dịch vụ . Phương pháp này đảm bảo rằng ,những request từ một IP sẽ được 1 máy chủ phục vụ .

```
upstream myapp1 {
    ip_hash;
    server srv1.example.com;
    server srv2.example.com;
    server srv3.example.com;
}
```


Nhưng Session persistence có tới 3 phương pháp để lưu trữ các session

1. Session Persistence Method: Cookie Insertion

```
upstream backend {
    server webserver1;
    server webserver2;

    sticky cookie srv_id expires=1h domain=.example.com path=/;
}
```

2. Session Persistence Method: Learn

```
upstream backend {
   server webserver1;
   server webserver2;

   sticky learn create=$upstream_cookie_sessionid
       lookup=$cookie_sessionid
       zone=client_sessions:1m
       timeout=1h;
}
```
3. Session Persistence Method: Sticky Routes

```
upstream backend {
   server webserver1 route=a;
   server webserver2 route=b;

   #$var1 and $var2 are run-time variables, calculated for each request
   sticky route $var1 $var2;
}
```
Nguồn : https://techzones.me/2019/09/14/session-nginx/