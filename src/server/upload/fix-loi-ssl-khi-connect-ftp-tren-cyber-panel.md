Nếu bạn nào cài Cyber Panel hơn 1 năm khi connect FTP sẽ bị lỗi Certificate, và không biết cách nào fix thì làm theo hướng dẫn sau nhé. Mình làm trên Centos 7, nếu Ubuntu mọi người đổi command xíu nhé

## 1. Connect SSH với quyền root / sudo
## 2. Tiến hành cài đặt và cấu hình Certificate cho Pure FTP
Trên Cyber Pnale sử dụng PureFTP để tạo kết nối, và nó sử dụng Self SSL để mã hóa đường truyền, và key ban đầu chỉ có 1 năm.

### Cài đặt thư viện Open SSL
`yum -y install openssl`

### Tạo thư mục /etc/ssl/private/ nếu chưa có

`mkdir /etc/ssl/private/`

### Tiến hành tạo self-signed SSL Certificate .
`openssl req -x509 -nodes -days 7300 -newkey rsa:2048 -keyout /etc/ssl/private/pure-ftpd.pem -out /etc/ssl/private/pure-ftpd.pem`

Lưu ý các thông số bên dưới để chọn cho đúng.

```
Output
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:New York
Locality Name (eg, city) []:New York City
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Bouncy Castles, Inc.
Organizational Unit Name (eg, section) []:Ministry of Water Slides
Common Name (e.g. server FQDN or YOUR name) []:server_IP_address
Email Address []:admin@your_domain.com
```

### Set quyền của SSL certificate:
`chmod 600 /etc/ssl/private/pure-ftpd.pem`

## 3. Tiến hành cấu hình Pure FTP
File config của pure-ftp tại: /etc/pure-ftpd/pure-ftpd.conf 
Dùng lệnh `vi /etc/pure-ftpd/pure-ftpd.conf ` để cấu hình, ở đoạn cuối, có dòng TLS = 1

Tiến hành thêm:
```
TLSCipherSuite           HIGH
CertFile                 /etc/ssl/private/pure-ftpd.pem
```

Với đoạn code trên sẽ chỉ định cấu hình file self SSL, nằm ở đâu. Chọn đúng đường dẫn file pem đã tạo ở trên.

## 4. Tiến hành khởi động lại Pure-FTP để load được cấu hình
`systemctl restart pure-ftpd.service`

## 5. Tiến hành thử lại trên FileZila

Vậy là đã hoàn thành việc cấu hình rồi, hi vọng mọi người làm được.