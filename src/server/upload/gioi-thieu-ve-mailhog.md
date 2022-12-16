Có rất nhiều vấn đề nhạy cảm có thể xảy ra khi làm việc với mail. Việc nhầm lẫn sẽ gây ra những vấn đề nghiêm trọng, làm giảm hoặc mất niềm tin từ khách hàng, phải chịu khoản đền bù lớn
* Gửi nhầm mail có nội dung cá nhân thật cho một email (có tồn tại)
* Gửi nhầm email cho user của toàn hệ thống
* Gửi email test đến những email (có tồn tại nhưng người tạo mail test không xác định được).

Như vậy khi developer phát triển việc gửi mail cần rất cẩn trọng và test lại một cách cẩn thận. Có khá nhiều công cụ giúp chúng ta sử dụng để test việc gửi mail trước khi release như mailtrap.io, mailhog,...Ở bài này mình xin giới thiệu với mọi người về công cụ hứng mail Mail Catcher: Mail Hog.
## MailHog
* MailHog được lấy ý tưởng phát triển từ MailCatcher. 
* MailHog là một công cụ để test việc gửi mail cho dev.
* MailHog chạy trên một server SMTP để bắt các email được gửi đến server này và hiển thị trên giao diện web.
* MailHog được phát triển từ ngôn ngữ Go (golang-go).
## Install
Có nhiều cách để cài đặt mailhog:
* Cài đặt thông qua docker
```
    docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```
* Down từ github và cài trực tiếp
```
    curl -LJo MailHog https://github.com/mailhog/MailHog/releases/download/v1.0.0/MailHog_linux_amd64

    chmod +x MailHog

    ./MailHog
```

* Cài đặt trực tiếp với go.
(trước tiên máy bạn cần phải cài đặt `go`)
```
    $ sudo apt-get install golang-go
    $ mkdir gocode
    $ echo "export GOPATH=$HOME/gocode" >> ~/.profile
    $ source ~/.profile
```
Sử dụng `go` để down mailhog
```
    $ go get github.com/mailhog/MailHog
    $ go get github.com/mailhog/mhsendmail
```
Tiếp đó sao chép các tệp binary vừa tải về vào vị trí avaiable của hệ thống.
```
$ sudo cp /home/myuser/gocode/bin/MailHog   /usr/local/bin/mailhog
$ sudo cp /home/myuser/gocode/bin/mhsendmail    /usr/local/bin/mhsendmail
```

## Configure mailhog

edit file php.ini (đối với nginx: etc/php/{version}/fpm/php.ini)
```
sendmail_path = /usr/local/bin/mhsendmail
```

## Starting mailhog
### Starting MailHog manually

```
$ mailhog \
  -api-bind-addr 127.0.0.1:8025 \
  -ui-bind-addr 127.0.0.1:8025 \
  -smtp-bind-addr 127.0.0.1:1025

2019/06/02 14:20:22 Using in-memory storage
2019/06/02 14:20:22 [SMTP] Binding to address: 127.0.0.1:1025
[HTTP] Binding to address: 127.0.0.1:8025
2019/06/02 14:20:22 Serving under http://127.0.0.1:8025/
Creating API v1 with WebPath:
```
### Start Mailhog when the system boots
```
$ sudo vim /etc/systemd/system/mailhog.service
```

Nội dung của mailhog.service sẽ như sau:
```
[Unit]
Description=MailHog service

[Service]
ExecStart=/usr/local/bin/mailhog \
  -api-bind-addr 127.0.0.1:8025 \
  -ui-bind-addr 127.0.0.1:8025 \
  -smtp-bind-addr 127.0.0.1:1025

[Install]
WantedBy=multi-user.target
```
Sau khi tạo service xong chúng ta cần start service này
```
    $ sudo systemctl start mailhog
```
Để start mailhog và kiểm tra chắc chắn mailhog đang run chúng ta có thể dùng lệnh sau:
```
$ systemctl | grep mailhog
[output]
mailhog.service loaded active running MailHog service
```
Xong công việc, bây giờ chúng ta chỉ cần truy cập vào bower với link sau sẽ nhìn thấy mailhog UI: http://127.0.0.1:8025.
### Configure nginx/apache

Config đối với nginx:
```
     location /mailhog/ {
                rewrite /mailhog/(.*) /$1  break;
                proxy_pass  http://127.0.0.1:8025/;
                set_real_ip_from 10.0.1.9/32;
                real_ip_header X-Forwarded-For;
                chunked_transfer_encoding on;
                proxy_set_header X-NginX-Proxy true;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_http_version 1.1;
                proxy_redirect off;
                proxy_buffering off;
       }
```
Config  đối với apache:
```
RewriteEngine On
RewriteCond %{HTTP:CONNECTION} Upgrade [NC]
RewriteCond %{HTTP:UPGRADE} websocket [NC]
Header set Connection "Upgrade"
RequestHeader setifempty Connection "Upgrade"
Header set Upgrade "websocket"
RequestHeader setifempty Upgrade "websocket"

ProxyPass "/mailhog/api/v2/websocket" ws://127.0.0.1:8025/api/v2/websocket
ProxyPassReverse "/mailhog/api/v2/websocket" ws://127.0.0.1:8025/api/v2/websocket

ProxyPass /mailhog/  http://127.0.0.1:8025/
ProxyPassReverse /mailhog/ http://127.0.0.1:8025/
```

### Configure .env
```
MAIL_DRIVER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
```
## Docs reference
https://github.com/mailhog/MailHog

https://www.lullabot.com/articles/installing-mailhog-for-ubuntu-1604