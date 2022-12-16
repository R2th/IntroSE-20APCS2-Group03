> Các trang web trong môi trường phát triển sử dụng máy chủ WAMP đôi khi yêu cầu phải có https để phát triển thêm ứng dụng / trang web.WampServer là một công cụ tuyệt vời để xây dựng trang web trên local của bạn nhưng hiện tại nó không hỗ trợ HTTPS / SSL. Để bật https trên máy chủ phát triển, chúng ta cần bật SSL theo cách thủ công

1. Bước 1: Download and install Opend SSL
> Trước tiên cần thêm PATH biến môi trường tới `C:\wamp64\bin\apache\apache2.4.46\bin`
>  (Chú ý phiên bản apache ở đường dẫn)
Tạo thư mục key trong đường dẫn `C:\wamp64\bin\apache\apache2.4.46\conf\key`
```
openssl genrsa -aes256 -out private.key 2048
openssl rsa -in private.key -out private.key
openssl req -new -x509 -nodes -sha1 -key private.key -out certificate.crt -days 36500 -config c:\wamp64\bin\apache\apache2.4.27\conf\openssl.cnf
```
![image.png](https://images.viblo.asia/5d63c00e-1be0-4669-8b9f-20b8e8fd3409.png)
2. Bước 2:
    Bỏ comment 3 dòng sau trong file `C:\wamp64\bin\apache\apache2.4.46\conf\httpd.conf`
```
LoadModule ssl_module modules/mod_ssl.so
Include conf/extra/httpd-ssl.conf
LoadModule socache_shmcb_module modules/mod_socache_shmcb.so
```
3. Bước 3
     Cập nhật `conf\extra]httpd-ssl.conf`
```
DocumentRoot "${INSTALL_DIR}/www"
ServerName localhost:443
SSLCertificateFile "${SRVROOT}/conf/key/certificate.crt"
SSLCertificateKeyFile "${SRVROOT}/conf/key/private.key"
```
4. Bước 4
    Cập nhật `conf\extra\httpd-ssl.conf` 
```
#
<VirtualHost *:443>
	ServerName epic10.local
	DocumentRoot "d:/microsite/2022_lazada_epic10/public"
	<Directory  "d:/microsite/2022_lazada_epic10/public/">
            Options +Indexes +Includes +FollowSymLinks +MultiViews
            AllowOverride All
            Require local
	</Directory>
    SSLEngine on
    SSLCertificateFile "${SRVROOT}/conf/key/certificate.crt"
    SSLCertificateKeyFile "${SRVROOT}/conf/key/private.key"
</VirtualHost>

```