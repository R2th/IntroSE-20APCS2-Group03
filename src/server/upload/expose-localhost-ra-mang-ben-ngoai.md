Trong quá trình phát triển phần mềm, đôi khi chúng ta có thể gặp phải vấn đề là: Làm sao để truy cập server ở local (localhost) từ mạng bên ngoài (public network) ?

Mục đích của câu hỏi trên có thể phát sinh bởi một số trường hợp sau:

- Demo trước ứng dụng web mà không cần thực hiện deploy.

- Test ứng dụng phía front-end hay ứng dụng mobile mà server phía back-end đang phát triển ở môi trường local.

- Xây dựng và kiểm tra các tính năng liên quan đến webhook: chatbot, GitHub's webhook,...

Để giải quyết vấn đề này, một vài phương án có thể đề cập tới:

- Các nhóm phát triển: front-end, back-end, mobile,... sử dụng chung một mạng nội bộ.

- Sử dụng các dịch vụ tunnel như: [ngrok](https://ngrok.com/), [localtunnel](https://localtunnel.github.io/www/), [Serveo](https://serveo.net/), [localhost.run](http://localhost.run/), [Telebit](https://telebit.cloud/), [pagekite](https://pagekite.net/), [Burrow.io](https://burrow.io/)

Tuy nhiên, có những bất cập nhất định ở các phương án trên:

- Hầu hết các mạng phổ thông đều sử dụng phương thức cấp phát IP động (DHCP). Do đó, khi muốn kết nối giữa các thiết bị, cần phải điều chỉnh cài đặt theo sự thay đổi của IP.

- Không phải lúc nào các nhóm phát triển cũng sử dụng chung một mạng nội bộ, đặc biệt đối với các nhóm làm việc từ xa (remote work).

- Một số dịch vụ tunnel yêu cầu trả phí (`pagekite`, `Burrow.io`) hoặc giới hạn chức năng đối với bản miễn phí (`ngrok`).

- Việc sử dụng dịch vụ tunnel bên ngoài có thể tiềm ẩn các vấn đề về bảo mật dữ liệu, đặc biệt đối với các dữ liệu nhạy cảm.

Do đó, một trong những giải pháp an toàn là tự tạo một tunnel riêng để expose localhost ra mạng bên ngoài.

# Cách thức hoạt động

Tunnel ở đây có thể hiểu là một phương thức truyền tải dữ liệu từ server này đến server khác.

Cụ thể hơn thì là SSH tunnel hay còn được gọi là SSH port forwarding.

SSH tunnel tạo một liên kết SSH giữa hai server thông qua các cổng (port) mà có thể chuyển tiếp được (relayed).

Dựa vào cơ chế này, chúng ta có thể expose localhost ra mạng bên ngoài bằng một SSH tunnel tới một server trung gian nào đó. Server trung gian này tạm gọi là remote server.

Mọi request từ bên ngoài sẽ được gửi tới remote server. Sau đó, remote server sẽ chuyển tiếp dữ liệu nhận được tới local server thông qua một SSH tunnel.

Ở chiều ngược lại, response từ local server trả về cho client cũng được chuyển tiếp thông qua remote server ở cùng SSH tunnel.

Quá trình xử lý và chuyển tiếp request ở phía remote server có thể được đơn giản hóa bằng phương thức reverse proxy. 

Trong bài viết này, nhờ tính phổ biến và vượt trội, [`nginx`](https://www.nginx.com/) sẽ được sử dụng để triển khai phương thức reverse proxy trên.

Hình ảnh dưới đây sẽ mô tả cơ chế hoạt động của một SSH tunnel, kết hợp với reverse HTTPS proxy:

![Remote port forwarding with a reverse HTTPS proxy](https://miro.medium.com/max/2000/1*OvpyMDgBPgouz3NLw1IZKQ.png)

Request được lắng nghe từ remote server ở cổng HTTPS 8888 (hoặc phổ biến hơn là 443). Sau đó, request này được chuyển tiếp tới cổng HTTP 8080 thông qua thiết lập reverse proxy. Một SSH tunnel đã được tạo sẵn giữa cổng 8080 của remote server và cổng 8889 của local server. Nhờ đó, việc giao tiếp giữa hai server có thể thực hiện thông qua một kết nối SSH ở cổng 22.

# Triển khai với bài toán thực tế

- Bài toán: Truy cập một ứng dụng web đang được phát triển ở cổng nội bộ 8889 (http://localhost:8889) từ một thiết bị có kết nối mạng bên ngoài.

- Phương án giải quyết: Ứng dụng web sẽ được truy cập thông qua một tên miền công khai.

- Điều kiện cần chuẩn bị:

    + Remote server

    + Tên miền công khai

    + Chứng chỉ SSL

Để tối ưu hóa về chi phí, chúng ta có thể tham khảo các dịch vụ miễn phí sau:
+ Remote server: [`Amazon EC2`](https://aws.amazon.com/ec2/) (gói [`Free Tier`](https://aws.amazon.com/free/))  hoặc [`Google Cloud VM`](https://cloud.google.com/compute/docs/instances) (gói [`Free Tier`](https://cloud.google.com/free))

+ Tên miền: [`Freenom`](https://my.freenom.com/)

+ Chứng chỉ SSL: [`Let's Encrypt`](https://letsencrypt.org/)

# Hướng dẫn chi tiết

## Thêm firewall rule cho remote server

Sau khi đã tạo xong một remote server (VPS), việc đầu tiên cần làm là cho phép forward port tại một cổng chỉ định thông qua cài đặt firewall rule.

Trong bài này, chúng ta sẽ sử dụng VM instance của Google Cloud Platform với hệ điều hành Ubuntu 16.04 .

Thêm một firewall rule tại mục: `VPC network` >  `Firewall rule` > `CREATE FIREWALL RULE`

Các thông số ví dụ như sau:

```
Name: public-tcp-8080
Target tags: tcp-8080
Source IP ranges: 0.0.0.0/0
Protocols and ports:
     Specified protocols and ports:
        tcp: 8080
```

![](https://images.viblo.asia/dab1b100-a78c-48f4-9953-db6c5bd888b2.jpg)

Thêm network tag `tcp-8080` vào instance hiện tại `instance-1`: `Compute Engine` > `VM instances` > `instance-1`  > `EDIT`

```
Network tags
    tcp-8080
````

![](https://images.viblo.asia/dc2e339b-c3c7-4627-b9ea-39b3f02299e4.jpg)

## Cấu hình SSH trên remote server

Thông thường, cấu hình mặc định của SSH sẽ cho phép việc forward port.

Để chắc chắc, chúng ta có thể thêm hai tùy chọn dưới đây ở file `/etc/ssh/sshd_config`:

```
AllowTcpForwarding yes
GatewayPorts yes
```

Để tiện cho việc forward port ở bất cứ máy local nào, chúng ta cũng nên tạo một tài khoản user riêng biệt ở remote server.

Ví dụ: User `sunbear`
```
sudo adduser sunbear
```

Sau đó, thêm các tùy chọn sau vào SSH config file.

```
Match User sunbear
    PasswordAuthentication yes
    ForceCommand /bin/false
```

Hãy nhớ reload lại SSH service sau mỗi lần thay đổi config:

```
sudo /etc/init.d/ssh reload
```

## Tạo tên miền cho remote server

Sau khi tạo một tên miền mới, hãy thực hiện trỏ domain này về public IP của remote server.

Như ví dụ ở hình dưới đây, thay vì trỏ cả domain thì có thể dùng subdomain cho linh động:
![](https://images.viblo.asia/cd5cab85-a195-4333-9d11-6b8c4974fde8.jpg)


## Cấu hình nginx trên remote server

Một ví dụ về cách cấu hình reverse proxy cho nginx:

```
server {
    listen 80 ;
    listen [::]:80 ;

    if ($host = myapp.sun-asterisk.tk) {
        return 301 https://$host$request_uri;
    }

    server_name myapp.sun-asterisk.tk;
	
    return 404;
}

server {
    listen [::]:443 ssl;
    listen 443 ssl;
	
    root /var/www/html;

    # Add index.php to the list if you are using PHP
    index index.php index.html index.htm index.nginx-debian.html;
	
    server_name myapp.sun-asterisk.tk;

    location '/.well-known/acme-challenge' {
        root /var/www/html;
    }

    location / {
        #auth_basic           "Restricted Area";
        #auth_basic_user_file /etc/nginx/.htpasswd;

        proxy_set_header  XReal-IP  $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_pass http://tunnel-8888;
        proxy_set_header X-Forwarded-Proto  https;
    }
	
    #ssl_certificate /etc/letsencrypt/live/myapp.sun-asterisk.tk/fullchain.pem;
    #ssl_certificate_key /etc/letsencrypt/live/myapp.sun-asterisk.tk/privkey.pem;
    #include /etc/letsencrypt/options-ssl-nginx.conf;
    #ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

upstream tunnel-8888 {
  server 127.0.0.1:8888;
}

````

Ở ví dụ trên, mọi request đến domain `mylocalhost.sun-asterisk.tk`, sẽ được chuyển tiếp sang cổng 8080, được định nghĩa tại upstream `tunnel-8080`.

Nên tạo riêng một file config cho tunnel và vô hiệu thiếp lập mặc định:

```
sudo rm /etc/nginx/site-enabled/default
sudo vi /etc/nginx/site-availables/mylocalhost.sun-asterisk.tk
sudo ln -s /etc/nginx/site-availables/mylocalhost.sun-asterisk.tk /etc/nginx/site-enabled
```

Kiểm tra cú pháp và reload nginx service:

```
sudo nginx -t
sudo /etc/init.d/nginx reload
```

## Tạo chứng chỉ SSL của `Let's Encrypt` cho tên miền

Đối với hệ điều hành Ubuntu, có thể làm theo hướng dẫn tại trang sau:
https://certbot.eff.org/lets-encrypt/ubuntuxenial-nginx

Lưu ý: Nên sử dụng lệnh `certonly` để tránh làm ảnh hưởng tới các config của nginx hiện tại.

```
sudo certbot certonly --nginx
```

Sau khi `cerbot` đã tạo chứng chỉ SSL xong, bỏ comment tại các dòng nginx config sau:

```
ssl_certificate /etc/letsencrypt/live/mylocalhost.sun-asterisk.tk/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/mylocalhost.sun-asterisk.tk/privkey.pem;
include /etc/letsencrypt/options-ssl-nginx.conf;
ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
```

Ngoài ra, để tăng tính bảo mật, nên thiết lập thêm Basic Authentication:

Tạo file basic authentication:

```
sudo printf "USER:$(openssl passwd -crypt PASSWORD)\n" | sudo tee -a /etc/nginx/.htpasswd
```

Bỏ comment các tùy chọn sau:
```
auth_basic           "Restricted Area";
auth_basic_user_file /etc/nginx/.htpasswd;
````

Kiểm tra cú pháp và reload nginx service:

```
sudo nginx -t
sudo /etc/init.d/nginx reload
```

Với cấu hình cài đặt hiện tại, khi truy cập vào domain `https://mylocalhost.sun-asterisk.tk`, sẽ nhận được thông báo: 

```
502 Bad Gateway
```

Nguyên nhân là bởi tại cổng 8080, chúng ta chưa có xử lý gì đối với request nhận được. Bước tiếp theo sẽ thực hiện forward port từ remote server tại cổng 8080 về một local server bất kỳ. Tại đây, request sẽ được xử lý và trả về phía client.

## Tạo SSH tunnel trên local server
Ở phía local server, chúng ta tạo một SSH tunnel bằng câu lệnh như sau:

```
ssh -NR <remote-port>:localhost:<local-port> <user>@<remote-ip> -vvv
```

```
ssh -NR 8080:localhost:8889 sunbear@35.226.239.1 -vvv
```

Trong đó:

- `8080`: cổng TCP trên remote server.

- `8889`: cổng TCP trên local server. Cổng này chính là cổng của ứng dụng mà chúng ta muốn expose ra mạng bên ngoài.

- `sunbear`: User trên remote server được sử dụng để thực hiện forward port.

- `35.226.239.1`: Public IP của remote server

- `N`: tùy chọn này chỉ thị việc ngoài forward port ra, không thực hiện bất cứ lệnh nào khác trên remote server

- `R`: chỉ thị rằng mọi kết nối từ remote server sẽ được chuyển tiếp tới local server.

- `vvv`: theo dõi và debug việc sử dụng tunnel.


Vậy là tunnel đã được tạo xong. Mọi truy cập đến domain `https://mylocalhost.sun-asterisk.tk`, sẽ được xử lý tại `http://localhost:8889` . Nói cách khác, local server đã được công khai trên mạng Internet và các thiết bị khác có thể truy cập ứng dụng thông qua một domain cụ thể.


***Chú ý:***

- Khi thực hiện lệnh tạo tunnel, sẽ có một thông báo yêu cầu nhập mật khẩu của user `sunbear` tại terminal. Chúng ta sẽ sử dụng mật khẩu đã tạo ở câu lệnh ở phần cấu hình server bên trên: `sudo adduser sunbear`.

- Khi muốn hủy tunnel, sử dụng tổ hợp phím `Ctrl + C`  tại terminal.

- Không được sử dụng các cổng nhỏ hơn 1000 trên remote server.

- Có thể sử dụng domain name thay vì IP khi thực hiện forward port:

```
ssh -NR 8080:localhost:8889 sunbear@mylocalhost.sun-asterisk.tk -vvv
````

- Không tạo nhiều tunnel trên cùng một cổng. Tạo một subdomain mới cho mỗi tunnel.

Ví dụ: Tạo một SSH tunnel mới trên cổng 8888 ở remote server, chuyển tiếp tới cổng 8000 ở local server. Subdomain được sử dụng: `myapp.sun-asterisk.tk`

![](https://images.viblo.asia/c1f65484-d32f-45df-8b1f-e6b0fcf667ea.jpg)


```
sudo vi /etc/nginx/site-availables/myapp.sun-asterisk.tk
```

```
server {
    listen 80 ;
    listen [::]:80 ;

    if ($host = myapp.sun-asterisk.tk) {
        return 301 https://$host$request_uri;
    }

    server_name myapp.sun-asterisk.tk;
	
    return 404;
}

server {
    listen [::]:443 ssl;
    listen 443 ssl;
	
    root /var/www/html;

    # Add index.php to the list if you are using PHP
    index index.php index.html index.htm index.nginx-debian.html;
	
    server_name myapp.sun-asterisk.tk;

    location '/.well-known/acme-challenge' {
        root /var/www/html;
    }

    location / {
        auth_basic           "Restricted Area";
        auth_basic_user_file /etc/nginx/.htpasswd;

        proxy_set_header  XReal-IP  $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_pass http://tunnel-8888;
        proxy_set_header X-Forwarded-Proto  https;
    }
	
    #ssl_certificate /etc/letsencrypt/live/myapp.sun-asterisk.tk/fullchain.pem;
    #ssl_certificate_key /etc/letsencrypt/live/myapp.sun-asterisk.tk/privkey.pem;
    #include /etc/letsencrypt/options-ssl-nginx.conf;
    #ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

upstream tunnel-8888 {
  server 127.0.0.1:8888;
}

```

```
sudo ln -s /etc/nginx/site-availables/myapp.sun-asterisk.tk /etc/nginx/site-enabled
sudo nginx -t
sudo /etc/init.d/nginx reload
sudo certbot certonly --nginx
```
 
Bỏ comment sau khi đã tạo xong chứng chỉ
```
ssl_certificate /etc/letsencrypt/live/myapp.sun-asterisk.tk/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/myapp.sun-asterisk.tk/privkey.pem;
include /etc/letsencrypt/options-ssl-nginx.conf;
ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
````

Reload nginx service
```
sudo nginx -t
sudo /etc/init.d/nginx reload
```

Tạo SSH tunnel:
```
ssh -NR 8888:localhost:8000 sunbear@myapp.sun-asterisk.tk -vvv
```

# Các hạn chế có thể gặp phải

- Việc tạo một remote server (VPS) mất nhiều thời gian và thường sẽ yêu cầu xác thực thông qua thẻ thanh toán quốc tế. Các gói Free Tier chỉ có thời hạn 1 năm.

- Có thể xảy ra xung đột khi nhiều tunnel được tạo trên cùng một cổng. Tunnel tạo sau sẽ không forward port được.

- Không có sẵn các công cụ theo dõi và debug request giống như các dịch vụ tunnel. Ví dụ: `ngrok` có công cụ debug tại cổng 4040.

Việc expose localhost ra mạng bên ngoài là điều cần thiết trong một số trường hợp nhất định. Tuy nhiên, nên nhận thức được rằng, khi dữ liệu được public ra bên ngoài, đồng nghĩa với tiềm ẩn rủi ro về bảo mật thông tin. Do đó, hãy sử dụng SSH tunnel một cách cẩn trọng và khôn ngoan.

## ** *Tham khảo* **
**Michel Blancard**, [*How to expose a local development server to the Internet*](https://medium.com/botfuel/how-to-expose-a-local-development-server-to-the-internet-c31532d741cc)

**Hui Jing**, [*Tunnelling services for exposing localhost to the web*](https://chenhuijing.com/blog/tunnelling-services-for-exposing-localhost-to-the-web/)

**ngrok**, [*ngrok.com*](https://ngrok.com/)