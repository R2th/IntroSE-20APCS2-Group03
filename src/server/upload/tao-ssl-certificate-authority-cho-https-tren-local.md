Trên đây cũng có khá nhiều bài viết làm sao để tạo self-signed SSL  cho localhost để có thể test thử HTTPS. Nhưng những cách đó đều có một nhược điểm là khi vào trang sẽ có cảnh báo **NET::ERR_CERT_AUTHORITY_INVALID** do không ai chứng thực cho SSL của chúng ta. Và chúng ta không thể test những công nghệ mới như PWA hay HTTP2 trên localhost. Hôm nay mình xin giới thiệu một cách tạo SSL "xanh lét lèn lẹt" cho localhost để chúng ta có thể thử các công nghệ như PWA hay HTTP2 hoặc đơn giản là nhìn cho nó ha oai :smile:. Chúng ta cùng bắt đầu thực hiện nhé.

##  Tạo Certificate Authority

Đầu tiên, chúng ta phải tự trở thành một nhà cung cấp chứng chỉ (giống như các nhà cung cấp chứng chỉ hiện tại như GlobalSign, Comodo, DigiCert, ...) và thông báo cho trình duyệt rằng những chứng chỉ được tạo bởi Certificate Authority do chúng ta cung cấp là hợp lệ.

Thực hiện tạo root Certificate Authority (CA) bằng việc đầu tiên là tạo private key:

```shell
openssl genrsa -des3 -out rootCA.key 2048
```

Sau khi nhập lệnh này, chúng ta thực hiện nhập pass phase để tạo. Kết quả có dạng:

```shell
Generating RSA private key, 2048 bit long modulus
.........+++
......................................+++
e is 65537 (0x10001)
Enter pass phrase for rootCA.key:
Verifying - Enter pass phrase for rootCA.key:
```

Sau khi đã có private key, chúng ta tạo root certificate:

```shell
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1825 -out rootCA.pem
```

Khi thực hiện lệnh này, nó sẽ hỏi pass phase của file `rootCA.key` mà chúng ta vừa nhập ban nãy, bạn hãy nhập chính xác vào và thực hiện điền một số thông tin nó yêu cầu, kết quả có dạng như sau (dữ liệu demo do mình nhập):

```markdown
Enter pass phrase for rootCA.key:
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:VN
State or Province Name (full name) [Some-State]:Ha Noi    
Locality Name (eg, city) []:Ha Noi
Organization Name (eg, company) [Internet Widgits Pty Ltd]:NNVSvc
Organizational Unit Name (eg, section) []:Information Technology
Common Name (e.g. server FQDN or YOUR name) []:NNVSvc
Email Address []:namnv609@gmail.com
```

Sau khi thực hiện xong, bạn sẽ có được hai files là `rootCA.key` và `rootCA.pem`. Từ bây giờ, bạn đã trở thành một Certificate Authority (tất nhiên chỉ là ở local thôi chứ không được như các nhà cung cấp nổi tiếng hiện tại đâu nhá :rofl:) rồi. Và cũng từ bây giờ, chúng ta có thể tạo SSL cho chính bản thân mình từ hai files trên. Nhưng đến bước này vẫn chưa hẳn là bạn đã được một SSL xanh lét vì các trình duyệt chưa có thông tin về root certificate (chứng chỉ gốc) của chúng ta. Chúng ta sẽ sang bước tiếp theo, nó cực kỳ quan trọng để SSL của chúng ta trở nên xanh lét.

##  Cài đặt Root Certificate cho các trình duyệt

Với bài viết này, mình sẽ hướng dẫn cho mọi người làm sao để cài đặt root certitficate cho Chrome và FireFox nhé.

### Google Chrome

Đầu tiên, mở Google Chrome và truy cập vào đường dẫn sau:  `chrome://settings/certificates`. Sau đó, bạn chọn tab **Authorities** và nhấp vào **IMPORT** rồi chọn file `rootCA.pem` mà chúng ta vừa tạo ban nãy. Sau khi chọn file đó, chúng ta sẽ có màn hình sau:

![](https://images.viblo.asia/ff07ec1f-52ad-4602-b62e-a3c7d30c01b9.png)

Bạn chọn tất và bấm **OK** là xong.

![](https://images.viblo.asia/d07f6987-4f7c-49b1-9ba5-a8e15a947848.png)

### Mozilla Firefox

Đầu tiên, mở Mozilla Firefox lên và truy cập vào đường dẫn sau: `about:preferences#privacy`. Sau đó, bạn kéo xuống dưới cùng của trang, tại phần **Certificates** chúng ta nhấp vào **View Certificates...**, tại popup này, bạn chọn tab **Authorities** rồi nhấp vào **Import...** và chọn file `rootCA.pem` mà chúng ta vừa tạo ban nãy. Sau khi chọn file, chúng ta sẽ có màn hình sau:

![](https://images.viblo.asia/5f866c60-d0ac-4993-8df8-6c547f81cb7c.png)

Thực hiện chọn tất cả và bấm **OK** là xong.

![](https://images.viblo.asia/3a74bfdd-48fa-4aa5-bdf9-9138ca5c2c38.png)

Vậy là bây giờ, với hai trình duyệt này (trên máy của chúng ta) thì chúng ta đã được ngồi cùng mâm với các CA lớn trên thế giới rồi đấy :rofl:!

Giờ chúng ta thử thực hiện tạo HTTPS cho một website ở local để xem kết quả như thế nào nhá :smile:.

## Tạo HTTPS cho local site

Đầu tiên, chúng ta tạo một private key cho domain local (mình sẽ chọn domain là `test-ssl.local`):

```shell
openssl genrsa -out test-ssl.local.key 2048
```

Sau đó tạo CSR ([Certificate Signing Request](https://en.wikipedia.org/wiki/Certificate_signing_request)):

```shell
openssl req -new -key test-ssl.local.key -out test-ssl.local.csr
```

Chúng ta sẽ được hỏi các thông tin như lần trước tạo root CA:

```markdown
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:VN
State or Province Name (full name) [Some-State]:Ha Noi
Locality Name (eg, city) []:Ha Noi
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Test SSL
Organizational Unit Name (eg, section) []:Information Technology
Common Name (e.g. server FQDN or YOUR name) []:test-ssl.local
Email Address []:namnv609@gmail.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

Các bạn có thể tùy nhập các thông tin mà các bạn muốn. Phần **A challegen password** và **An optional company name** các bạn có thể bỏ rỗng.

Bước tiếp theo, chúng ta thực hiện tạo một file config để định nghĩa [Subject Alternative Name (SAN)](https://en.wikipedia.org/wiki/Subject_Alternative_Name) cho SSL này. Chúng ta thực hiện tạo file:

```css
vi test-ssl.local.ext
```

Và nhập nội dung bên dưới:

```objectivec
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = test-ssl.local
```

Bạn có thể thêm nhiều `DNS.x = <Domain bạn muốn>`. Nhưng ở đây mình chỉ sử dụng cho chính domain này thôi. Giờ chúng ta sẽ tạo certificate cho domain:

```shell
openssl x509 -req -in test-ssl.local.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial \
-out test-ssl.local.crt -days 1825 -sha256 -extfile test-ssl.local.ext
```

Khi này chúng ta sẽ được hỏi pass phase của `rootCA.pem`, bạn nhập pass phase mà bạn đã sử dụng lúc tạo `rootCA.key`. Vậy là xong, lúc này chúng ta sẽ có các file sau:

* `test-ssl.local.key`: Private key
* `test-ssl.local.csr`: Certificate Signing Request
* `test-ssl.local.crt`: Signed certificate

Vậy là xong. Bây giờ chúng ta có thể thêm HTTPS cho local domain của chúng ta với private key file và certificate file rồi. Mình sẽ thực hiện luôn demo với NginX (mặc định là bạn đã cài đặt NginX rồi).

##  Cài đặt HTTPS với NginX

Đầu tiên, tạo thư mục để chứa code:

```shell
mkdir -p /var/www/test-ssl
```

Sau đó, tạo file `index.html` với nội dung đơn giản để hiển thị:

```css
vi /var/www/test-ssl/index.html
```

Nội dung file `index.html`:

```html:HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Test SSL Local</title>
</head>
<body>
  <h1>Hello, HTTPS :D</h1>
</body>
</html>
```

Tiếp theo, chúng ta tạo một virtual host cho NginX:

```shell
sudo vi /etc/nginx/sites-available/test-ssl
```

Nội dung file virtual host:

```css
server {
  listen 443 ssl;

  server_name test-ssl.local;

  ssl_certificate     /path/to/test-ssl.local.crt;
  ssl_certificate_key /path/to/test-ssl.local.key;
  ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers         HIGH:!aNULL:!MD5;

  location / {
    root /var/www/test-ssl;
    index index.html index.htm;
  }
}
```

Sau đó, tạo symlink đến thư mục `/etc/nginx/site-enabled` để enable virtual host (trên thực tế, bạn có thể tạo file trực tiếp vào thư mục này mà không cần phải tạo vào `site-available`, nhưng mình khuyến khích các bạn không nên làm trực tiếp như thế. Để lúc mình muốn disable virtual host chỉ cần xóa symlink là xong mà không hề ảnh hưởng đến file virtual host gốc):

```shell
sudo ln -s /etc/nginx/sites-available/test-ssl /etc/nginx/sites-enabled
```

Khởi động lại NginX:

```cpp
sudo service nginx restart
```

Tiếp theo, chúng ta sẽ trỏ domain của chúng ta về localhost bằng cách thêm nội dung sau vào file `/etc/hosts`:

```shell
sudo vi /etc/hosts
```

Thêm dòng sau:

```css
127.0.0.1    test-ssl.local
```

Vậy là xong, bây giờ bạn thử truy cập vào https://test-ssl.local để xem kết quả nhá. Chúng ta sẽ được một trang HTTPS hoàn hảo mà không hề bị màn hình warning và cũng không có dấu gạch chéo đỏ lòm ở trên thanh địa chỉ.

![](https://images.viblo.asia/2a8b9c52-7fe0-461e-9682-bbc42f2fc797.png)

![](https://images.viblo.asia/afe25b26-fa51-4e4e-93f5-2bdb6519a9db.png)

![](https://images.viblo.asia/35efe8d2-daf8-45a9-b7ee-baa058119f28.png)

Vâng, bạn có nhìn thấy màu xanh lét ở Firefox không ạ :D? Nhìn ha oai phết, nhề :rofl:. Còn với Chrome thì từ phiên bản 69 trở đi nó đã xóa bỏ secure indicator cho các trang HTTPS rồi nên chúng ta không thấy màu xanh đẹp mắt đó :smiley:!

## Lời kết

Từ bây giờ, bạn có thể tự tạo thêm nhiều HTTPS cho local site với root CA mà chúng ta đã tạo (bạn chỉ cần thực hiện từ bước **Tạo HTTPS cho local site** trở đi). Và bạn có thể thoải mái thử các công nghệ mới như PWA hay HTTP2 mà không cần phải có SSL chính chủ. Bài viết của mình đến đây là kết thúc. Hy vọng nó sẽ có ích cho các bạn trong tương lai không xa. Chào thân ái vào quyết thắng :wave:!

> Original post: https://namnv609.cf/posts/tao-ssl-certificate-authority-cho-https-tren-local.html