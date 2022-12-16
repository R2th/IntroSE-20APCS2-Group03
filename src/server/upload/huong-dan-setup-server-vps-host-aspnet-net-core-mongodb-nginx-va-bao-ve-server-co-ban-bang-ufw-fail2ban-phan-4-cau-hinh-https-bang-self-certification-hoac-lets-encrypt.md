Bài viết này mình sẽ chia sẻ cách cấu hình HTTPS thông qua 2 cách self-certification hoặc Let's Encrypt.
Sơ lược 1 chút về HTTPS (Hypertext Transfer Protocol Secure) là giao thức truyền tải siêu văn bản an toàn. Thực chất, đây chính là giao thức HTTP nhưng tích hợp thêm Chứng chỉ bảo mật SSL/TLS nhằm mã hóa các thông điệp giao tiếp để tăng tính bảo mật. Có thể hiểu, HTTPS là phiên bản HTTP an toàn, bảo mật hơn.
Về các chứng giao thức SSL（Secure Sockets Layer）/TLS（Transport Layer Security）các bạ có thể tìm hiểu thêm ở "https://www.websecurity.digicert.com/security-topics/what-is-ssl-tls-https"
Hiện nay version với nhất là TLS 1.3 và được khuyến nghị sử dụng vì các giao thức cũ hơn đều có lỗ hổng bảo mật (vulnerability). 
Ví dụ ở version TLS 1.2 bạn có thể tìm đọc "https://www.ssl.com/blogs/raccoon-attack-targets-tls-1-2-and-earlier-but-is-difficult-to-exploit/" 
Tuy nhiên nếu USER của bạn dùng một vài hệ thống cũ chưa update có thể không support TLS1.3 thì bạn cũng có thể cân nhắc sử dụng các version cũ hơn. Bạn có thể cấu hình trong Nginx version các giao thức server support.
#  Cấu hình HTTPS bằng self-certification:
Cách này thường dùng cho các web nội bộ không có domain name hoặc website trong quá trình testing.

##  Cài đặt và tạo self-certification:
Bạn có thể tạo một cặp chứng chỉ và khóa tự ký (self-signed key and certificate pair) với OpenSSL trong một lệnh duy nhất:
```
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
```

Bạn có sẽ nhận được 1 prompts và bạn có thể điền thông tin, ví dụ:

```
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:New York
Locality Name (eg, city) []:New York City
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Bouncy Castles, Inc.
Organizational Unit Name (eg, section) []:Ministry of Water Slides
Common Name (e.g. server FQDN or YOUR name) []:server_IP_address
Email Address []:admin@your_domain.com
```

Cả hai tệp bạn đã tạo sẽ được đặt trong các thư mục con thích hợp của thư mục  `/etc/ssl`.
Tạo file .pem dùng trong SSL Certificate Installations:
```
sudo openssl dhparam -out /etc/nginx/dhparam.pem 4096
```

##  Configuring Nginx to Use SSL

**Tạo đoạn mã cấu hình trỏ đến khóa và chứng chỉ SSL**

Đầu tiên, hãy tạo đoạn mã cấu hình Nginx mới trong thư mục / etc / nginx / snippets.
Để phân biệt chính xác mục đích của tệp này, hãy gọi nó là tệp tự ký.conf:

```
sudo nano /etc/nginx/snippets/self-signed.conf
```
Trong tệp này, chúng tôi cần đặt chỉ thị ssl_certificate thành tệp chứng chỉ của chúng tôi và ssl_certificate_key thành khóa được liên kết. Trong trường hợp của chúng tôi, nó sẽ trông như thế này:
```
ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
```
Lưu file cấu hình.

**Tạo đoạn mã cấu hình với Strong Encryption Settings:**

```
sudo nano /etc/nginx/snippets/ssl-params.conf
```
Sao chép phần sau vào tệp đoạn mã ssl-params.conf của bạn:
```
ssl_protocols TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_dhparam /etc/nginx/dhparam.pem;
ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
ssl_ecdh_curve secp384r1; # Requires nginx >= 1.1.0
ssl_session_timeout  10m;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off; # Requires nginx >= 1.5.9
ssl_stapling on; # Requires nginx >= 1.3.7
ssl_stapling_verify on; # Requires nginx => 1.3.7
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
# Disable strict transport security for now. You can uncomment the following
# line if you understand the implications.
# add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
```
Bởi vì chúng tôi đang sử dụng chứng chỉ tự ký, ghim SSL sẽ không được sử dụng. Nginx sẽ đưa ra warning.
Lưu file cấu hình.

**Cài đặt Nginx sử dụng SSL **

Mở file cấu hình:
```
sudo nano /etc/nginx/sites-available/your_domain
```
Bên trong, server block bạn có thể thêm như sau:
Thay đổi
```
server {
        listen 80;
        listen [::]:80;
        server_name your_domain www.your_domain;
```
thành
```
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    include snippets/self-signed.conf;
    include snippets/ssl-params.conf;
    server_name your_domain www.your_domain;

```
Kiểm tra để đảm bảo rằng không có lỗi cú pháp nào trong các tệp. Chúng ta có thể thực hiện việc này bằng lệnh:
```
sudo nginx -t
```
```
Output
nginx: [warn] "ssl_stapling" ignored, issuer certificate not found
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```
Sau khi đã kiểm tra thành công restart lại nginx để áp dụng thay đổi:
```
sudo systemctl restart nginx
```

# Cấu hình HTTPS bằng Let's Encrypt.

Let's Encrypt là chứng nhận (CA) mở, miễn phí và tự động, hoạt động vì lợi ích cộng đồng. Đây là dịch vụ được cung cấp bởi Internet Security Research Group (ISRG). ... Miễn phí: Bất cứ ai sở hữu một tên miền có thể dùng Let's Encrypt để có được một chứng chỉ tin cậy với chi phí bằng không.

##  Cài đặt Let's Encrypt:

Bước đầu tiên để sử dụng Let’s Encrypt để lấy chứng chỉ SSL là cài đặt phần mềm Certbot trên Server của bạn.

Cài đặt Certbot và plugin Nginx của nó với apt:
```
sudo apt install certbot python3-certbot-nginx
```
Nếu web server của bạn đã có domain và đăng kí IP của server lên DNS thì mọi Certbot sẽ tự động cấu hình Nginx với domain bạn đã đăng kí.
Hoặc bạn có thể dùng lệnh:
```
sudo certbot --nginx
```

Bước này sẽ yêu cầu bạn nhập email, email này sẽ được dùng để làm mới chứng chỉ SSL khi hết hạn.

```
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator apache, Installer apache
Enter email address (used for urgent renewal and security notices) (Enter 'c' to
cancel): you@your_domain
```

Sau khi nhập Email, bạn cần xác nhận tuân thủ quy định của dịch vụ Let’s Encrypt. Chọn A để tiếp tục.
```
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
agree in order to register with the ACME server at
https://acme-v02.api.letsencrypt.org/directory
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(A)gree/(C)ancel: A
```

Tiếp theo, bạn sẽ được hỏi liệu bạn có muốn chia sẻ email của mình với Electronic Frontier Foundation để nhận tin tức và thông tin khác hay không. Bỏ qua nếu bạn thấy không cần thiết.
```
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing to share your email address with the Electronic Frontier
Foundation, a founding partner of the Let's Encrypt project and the non-profit
organization that develops Certbot? We'd like to send you email about our work
encrypting the web, EFF news, campaigns, and ways to support digital freedom.
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: N
```

Bước tiếp theo bạn sẽ được chọn tên miền để cài đặt HTTPS. Nếu muốn cài đặt cho toàn bộ thì để trống và nhấn Enter để tiếp tục.

```
Which names would you like to activate HTTPS for?
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: your_domain
2: www.your_domain
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel):
```
Tiếp theo là quá trình kiểm tra điều kiện tên miền của bạn có đáp ứng điều kiện để cài đặt HTTPS không? Nếu hợp lệ sẽ tiến hành cài đặt HTTPS cho tên miền bạn vừa chọn.
Sau khi cài đặt kết thúc. Bạn sẽ được hỏi là có muốn chuyển hướng trang web sang HTTPS không? Cụ thể là nếu người dùng vào tên miền cửa bạn với kênh HTTP sẽ được tự động chuyển hướng sang HTTPS.

```
Output
Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
-------------------------------------------------------------------------------
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel):
```
Sau khi xác nhận. Quá trình cài đặt HTTPS cho tên miền của bạn đã hoàn tất. 
Sau khi đã kiểm tra thành công restart lại nginx để áp dụng thay đổi:
```
sudo systemctl restart nginx
```
Bạn có thể kiểm tra website của mình đã dùng certification được cấp bởi Let's Encrypt.

##  Tạo cron để renewal certification:

Tham khảo "https://techmonger.github.io/49/certbot-auto-renew/"
Command Renew bằng Certbot:
```
 sudo certbot renew --dry-run
```
Tạo cron job để kiểm tra certification chưa bị thu hồi và renew nó:
```
sudo nano /etc/cron.d/certbot
```
```
# /etc/cron.d/certbot: crontab entries for the certbot package
#
# Upstream recommends attempting renewal twice a day
#
# Eventually, this will be an opportunity to validate certificates
# haven't been revoked, etc.  Renewal will only occur if expiration
# is within 30 days.
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

0 */12 * * * root test -x /usr/bin/certbot  -a \! -d /run/systemd/system &&  perl -e 'sleep int(rand(43200))' &&  certbot -q renew
```
Cron job sẽ kiểm tra certificates hằng ngày và renewal hết hạn trong 30 ngày tới.

# Tổng kết:

Bài viết này mình đã hướng dẫn các bạn cấu hình HTTPS bằng self-certification hoặc Let's Encrypt. Nếu có thắc mắc hoặc câu hỏi cần sự giúp đỡ thì đừng ngần ngại comment.

Phần 1 - Cài đặt môi trường và firewall

Phần 2 - hướng dẫn setup nginx .

Phần 3 - Host web với ASP.Net, .Net Core và MongoDB

Phần 4 - Cấu hình HTTPS bằng self-certification hoặc Let's Encrypt.

Một phút quảng cáo, mình đang dùng VPS trên digitalocean.com. Đang có chương trình tặng 100$ cho account sử dụng trong 60 ngày, hãy đăng kí sử dụng và dùng invite link này "https://m.do.co/c/666bcca701f7" để ủng hộ mình.