Chắc mọi người ai cũng biết về khái niệm SSL. Sau khi deploy ứng dụng Web của mình, mình thường muốn  cài đặt SSL cho nó. Việc cài đặt SSL có thể nói là một quy trình hơi khó, nhất với người chưa từng làm việc với SSL. Hiện nay cũng có khá nhiều service giúp mình cài đặt SSL rồi, những phải mua theo từng tháng hoặc từng năm chẳng hạn.
 
Rất may [ZeroSSL](https://zerossl.com/) là một service giúp chúng ta cài đặt SSL miễn phí và dễ dàng hơn. 
![](https://images.viblo.asia/127eaa3d-f456-4a33-a965-dea8b031013d.png)

# Register ZeroSSL
Trước hết, nếu bạn chưa có tài khoản ZeroSSL, bạn cần phải register. Sau khi register xong, bạn có thể chọn Plan mà bạn cần. Default plan là free. Với các Website bình thường, Free plan là OK rồi. 

# Tạo New Certificate
Sau khi register xong, bạn vào Dashboard và click "New Certificate" để tạo mới.
Có 3 bước như sau:
### 1. SSL Certificate Setup
![](https://images.viblo.asia/8ba6bb04-002f-492c-b2de-cc00bb172ad5.png)

Đây là bước bạn phải điền những thông tin về domain, khoảng thơi gian expire của certificate, ...

* Domains: Bạn điền Domain name mình muốn tạo certificate vào.
* Validity:
Chọn khoảng thời gian expire của certificate. Free plan là 90 ngày. Sau 90 ngày, certificate này sẽ expired, bạn cần phải tạo mới. Nếu không, nó sẽ không dùng được nữa.
* CRS & Contact: Thông tin về contact của certificate
* Finalize Your order: Mình có thể chọn hoặc thay đổi plan mình muốn.

### 2. Verification
Bước này là bước verify mình thật là owner của domain này không. ZeroSSL có 3 cách để verify domain:
* Email verification : Nếu bạn có email với domain này (ex: administrator@example.com) , bạn có thể chọn cách này. Nó sẽ gửi link verify đển email đó.

* DNS (CNAME) : Cách này là mình cần copy Name và Point to vào DNS Management của domain đó. Nó có thể khác nhau tuỳ vào các bên mình mua Domain. 

![](https://images.viblo.asia/bf2873d1-edec-42b4-9640-b52fcdad8e70.png)

*  HTTP File Upload: Mình cần upload file của nó vào server của mình để verify.

### 3. Install Cerfiticate 
Sau khi đã verify Domain success, bước này mình cần chọn Webserver mình muốn. Ở đây mình dùng Nginx. Sau đó nó sẽ generate ra file .zip để mình download. Trong đó bao gồm 3 files:
* private.key
* certificate.crt
* ca_bundle.crt

 Mình phải upload 3 files này lên server của mình. Ở đây mình dùng Ubuntu server, vậy mình sẽ dùng lệnh này để upload lên:
```
 scp ~/path/private.key server-username@server-ip:/etc/nginx/ssl
 scp ~/path/certificate.crt server-username@server-ip:/etc/nginx/ssl
 scp ~/path/ca_bundle.crt server-username@server-ip:/etc/nginx/ssl
```

Ở trên mình upload vào path `/etc/nginx/ssl`, nhưng chúng ta có thể upload vào path nào cũng được.

Sau đó mình cần merge các file .crt để tạo file certificate.crt mới để có thể config trên Nginx.
```
cat certificate.crt ca_bundle.crt >> certificate.crt
```

Vào `/etc/nginx/site-enable/default` của nginx để config SSL. 

```
# /etc/nginx/site-enable/default

server {
    listen 80;
    server_name example.com;

    # SSL Config
    listen 443 ssl;

    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/private.key;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';

  # Application root, as defined previously
    root /home/deploy/example/public;

    try_files $uri/index.html $uri @app;

    location @app {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_redirect off;

        proxy_pass http://app;
    }
    error_page 500 502 503 504 /500.html;
    client_max_body_size 4G;
    keepalive_timeout 10;
}

```

Save và restart Nginx:
```
sudo server nginx restart
```

Bạn vào https://example.com để test nó có chạy ok chưa nhé :)