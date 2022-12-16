### Đặt vấn đề

Hiện nay, hầu như bất kỳ trang web nào bạn truy cập đều được HTTPS bảo vệ. Bảo vệ máy chủ của bạn bằng HTTPS cũng có nghĩa là bạn không thể gửi các yêu cầu đến máy chủ này từ một máy chủ không được bảo vệ bởi HTTPS.
Điều này đặt ra một vấn đề cho các lập trình viên sử dụng môi trường `develop` vì tất cả chúng đều chạy trên `http: // localhost`. Nếu bạn thử truy cập bằng `https: // localhost` Chorme sẽ luôn báo lỗi  `NET::ERR_CERT_COMMON_NAME_INVALID` 
![](https://images.viblo.asia/c11ff3ff-7f19-4fa1-877e-c90c2b779be8.png)

Vậy làm thế nào để triển khai HTTPS trên `localhost` ? 

### Giải pháp

Chúng ta sẽ sử dụng [OpenSSL](https://www.openssl.org/) để tạo tất cả các chứng chỉ của mình.

#### Bước 1 Root chứng chỉ SSL


Bước đầu tiên là tạo chứng chỉ lớp bảo mật gốc (SSL). Chứng chỉ này sau đó có thể được sử dụng để ký bất kỳ chứng chỉ nào giúp bạn có thể tạo cho các tên miền riêng lẻ. Nếu bạn không quen với chứng chỉ SSL, bài viết [này](https://support.dnsimple.com/articles/what-is-ssl-root-certificate/) sẽ giới thiệu chứng chỉ SSL.

Tạo khóa RSA-2048 và lưu nó vào tệp `rootCA.key`. Tập tin này sẽ được sử dụng làm chìa khóa để tạo chứng chỉ SSL. Bạn sẽ cần nhập pass phrase mỗi lần bạn sử dụng chìa khóa này để tạo chứng chỉ.

```openssl genrsa -des3 -out rootCA.key 2048```


Bạn có thể sử dụng khóa bạn đã tạo để tạo chứng chỉ SSL mới. Lưu nó vào một tệp có tên `rootCA.pem`. Chứng chỉ này sẽ có hiệu lực trong 1.024 ngày. Hãy thoải mái thay đổi nó thành bất kỳ số ngày bạn muốn. Bạn cũng sẽ được nhắc về các thông tin tùy chọn khác.

```openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.pem```

![](https://images.viblo.asia/7c1802b7-9736-4464-81a8-f4d458ecc953.png)

#### Bước 2 Trust the root SSL certificate

Trước khi bạn sử dụng được chứng chỉ SSL mới được tạo để bắt đầu cấp chứng chỉ miền, hãy làm thêm một bước nữa. Bạn cần làm cho máy tính của bạn tin tưởng chứng chỉ SSL của bạn để tất cả các chứng chỉ riêng lẻ được cấp bởi nó cũng được tin cậy.
Mở Keychain Access trên máy tính của bạn và đi đến danh mục `Certificates` trong mục `System Keychain`. Khi đó, nhập `rootCA.pem` bằng cách chọn `File > Import Items`.  Nhấp đúp vào chứng chỉ đã nhập và thay đổi “When using this certificate" thành `Always Trust`
Chứng chỉ của bạn sẽ trông giống như thế này bên trong Keychain Access nếu bạn thực hiện đúng các hướng dẫn từ đầu đến giờ.\

![](https://images.viblo.asia/fd53bd23-e697-47f6-a3d0-1b42a8f31173.png)

#### Bước 3: Domain SSL certificate

Chứng chỉ SSL đã có thể được sử dụng để cấp chứng chỉ dành riêng cho môi trường `development` của bạn tại tên miền `localhost`.
Tạo một tệp `server.csr.cnf` cấu hình OpenSSL mới để bạn có thể nhập các cài đặt này khi tạo chứng chỉ thay vì nhập chúng trên dòng lệnh.

```
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn

[dn]
C=US
ST=RandomState
L=RandomCity
O=RandomOrganization
OU=RandomOrganizationUnit
emailAddress=hello@example.com
CN = localhost
```

Tạo tệp `v3.ext` để tạo chứng chỉ [X509 v3](https://en.wikipedia.org/wiki/X.509). Chúng ta chỉ định `subjectAltName` ở đây.

```
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
```


Tạo khóa chứng chỉ cho `localhost` bằng cách sử dụng các cài đặt cấu hình được lưu trữ trong `server.csr.cnf`. Khóa này được lưu trữ trong `server.key`.

`openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat server.csr.cnf )`

Chữ ký của chứng chỉ được yêu cầu cấp thông qua chứng chỉ SSL mà chúng ta đã tạo trước đó để tạo chứng chỉ miền cho `localhost`. Đầu ra là một tệp chứng chỉ được gọi là `server.crt`.

`openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext`


![](https://images.viblo.asia/a57695cd-09c0-489a-a476-59d5540bf408.png)

#### Sử dụng chứng chỉ mới tạo


Bây giờ bạn đã sẵn sàng để bảo mật `localhost` của mình bằng HTTPS. Di chuyển các tệp `server.key` và `server.crt` đến một vị trí có thể truy cập trên máy chủ của bạn.
Trong một ứng dụng được viết bằng Node.js, làm thế nào để làm điều đó. Hãy chắc chắn rằng bạn làm điều này chỉ cho môi trường `development`. Không sử dụng trong môi trường `production`.

```
var path = require('path')
var fs = require('fs')
var express = require('express')
var https = require('https')

var certOptions = {
  key: fs.readFileSync(path.resolve('build/cert/server.key')),
  cert: fs.readFileSync(path.resolve('build/cert/server.crt'))
}

var app = express()

var server = https.createServer(certOptions, app).listen(443)
```

![](https://images.viblo.asia/668aa4f8-5796-44fe-863f-d3a1be108c9c.png)

Hy vọng hướng dẫn này hữu ích đối với mọi người. Nếu đã làm theo hướng dẫn ở trên, thì tôi đã tạo ra một tập các tập lệnh mà bạn có thể chạy nhanh để tạo chứng chỉ cho bạn. Thông tin chi tiết có thể được tìm thấy tại [đây](https://github.com/dakshshah96/local-cert-generator/)

### Bài viết còn nhiều thiếu sót, mình sẽ cải thiện hơn trong các bài viết sau

### Nguồn: https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec