Chào mọi người :D

Chắc hẳn ai học lập trình web đều rất quen thuộc với server web Apache, nó là một máy chủ web rất phổ biến để lưu trữ các trang web của bạn trên web. Dưới đây là một số mẹo có thể giúp bạn config server Apache trên Linux để bảo mật hơn.

Ở đây trong hướng dẫn này, tôi sẽ trình bày một số mẹo chính để bảo mật máy chủ web của bạn. Trước khi áp dụng những thay đổi này trong máy chủ web của mình, bạn nên có một số thông tin cơ bản về máy chủ Apache.

* Folder chứa website: `/var/www/html` or `/var/www`
* File cấu hình:  `/etc/httpd/conf/httpd.conf` (RHEL/CentOS/Fedora) and `/etc/apache2/apache2.conf` (Debian/Ubuntu).
* Cổng HTTP mặc định: `80 TCP`
* Cổng HTTPS mặc định: `443 TCP`
* Kiểm tra cú pháp và cài đặt cấu hình của bạn: `httpd -t`
* File log access của server: `/var/log/httpd/access_log`
* File log erro của server: `/var/log/httpd/error_log`
## 1. Cách ẩn phiên bản Apache và thông tin hệ điều hành khỏi màn hình lỗi
Khi cài đặt Apache bằng apt hoặc yum, nó sẽ hiển thị phiên bản của máy chủ web Apache được cài đặt trên server của bạn với tên hệ điều hành của máy chủ của bạn trong trang lỗi 404. Nó cũng hiển thị thông tin về các module Apache đã được cài đặt trong server của bạn.
![Show Apache Version](https://images.viblo.asia/c685622d-3fa8-4bf2-8769-9f5634b142d2.png)

Trong ảnh trên, bạn có thể thấy rằng Apache đang hiển thị phiên bản của nó với hệ điều hành của server. Đây có thể là một mối đe dọa bảo mật lớn đối với server web cũng VPS Linux của bạn. Để ngăn Apache không hiển thị những thông tin này với mọi người, chúng ta cần thực hiện một số thay đổi trong file cấu hình chính của Apache.

Mở file cấu hình bằng vim và tìm kiếm “ServerSignature”, theo mặc định là On. Chúng ta cần để Of và dòng thứ hai “ServerTokens Prod” cho Apache chỉ trả lại Apache ở production trong header response của server trên mọi request, Nó sẽ không hiển thị thông tin về hệ điều hành và phiên bản nữa.
```
# vim /etc/httpd/conf/httpd.conf (RHEL/CentOS/Fedora)
# vim /etc/apache2/apache2.conf (Debian/Ubuntu)
```
```
ServerSignature Off
ServerTokens Prod
```
```
# service httpd restart (RHEL/CentOS/Fedora)
# service apache2 restart (Debian/Ubuntu)
```
![Hide Apache Version](https://images.viblo.asia/2417e5c8-5111-4bda-9981-ba18148c8817.png)

## 2. Không hiển thị danh sách thư mục Apache

Mặc định, Apache sẽ liệt kê tất cả folder và file của root folder nếu không có file index. 
![Apache Directory Listing](https://images.viblo.asia/052269d3-8447-4b0d-8e79-85f8dbfc3288.png)

Chúng ta có thể ẩn danh sách thư mục bằng cách sử dụng options indexes trong file `httpd.conf` hoặc `apache2.conf` cho 1 thư mục cụ thể như bên dưới:
 ```
<Directory /var/www/html>
    Options -Indexes
</Directory>
```
![Hide Apache Directory Listing](https://images.viblo.asia/2da743de-9e4b-4bed-882a-f5358aa160a9.png)

## 3. Update Apache
Cộng đồng phát triển Apache vẫn đang tiếp tục giải quyết các vấn đề bảo mật và release các phiên bản cập nhật với các option bảo mật mới. Vậy nên, bản mới nhất sẽ luôn được khuyến khích sử dụng.

Để kiểm tra phiên bản Apache hiện tại, bạn có thể kiểm tra phiên bản hiện tại của mình bằng lệnh:
```
# httpd -v
Server version: Apache/2.2.15 (Unix)
Server built:   Aug 13 2013 17:29:28
```
Bạn có thể cập nhật phiên bản của mình bằng lệnh sau.
```
# yum update httpd
# apt-get install apache2
```
Khi update các phiên bản mới bạn cũng nên kiểm tra độ tương thích với hệ điều hành hiện tại đang sử dụng nhé!

## 4. Tắt các module không cần thiết
Việc tắt các module không cần thiết vẫn luôn được coi là 1 trong những hành động bảo mật cần thiết để tránh khỏi các rủi ro bị tấn công web. Vì vậy, bạn nên tắt tất cả những module hiện không được sử dụng. Trước tiên, hãy liệt kê các module đã được cài đặt trên server bằng lênh sau:
```
# grep LoadModule /etc/httpd/conf/httpd.conf

# have to place corresponding `LoadModule' lines at this location so the
# LoadModule foo_module modules/mod_foo.so
LoadModule auth_basic_module modules/mod_auth_basic.so
LoadModule auth_digest_module modules/mod_auth_digest.so
LoadModule authn_file_module modules/mod_authn_file.so
LoadModule authn_alias_module modules/mod_authn_alias.so
LoadModule authn_anon_module modules/mod_authn_anon.so
LoadModule authn_dbm_module modules/mod_authn_dbm.so
LoadModule authn_default_module modules/mod_authn_default.so
LoadModule authz_host_module modules/mod_authz_host.so
LoadModule authz_user_module modules/mod_authz_user.so
LoadModule authz_owner_module modules/mod_authz_owner.so
LoadModule authz_groupfile_module modules/mod_authz_groupfile.so
LoadModule authz_dbm_module modules/mod_authz_dbm.so
LoadModule authz_default_module modules/mod_authz_default.so
LoadModule ldap_module modules/mod_ldap.so
LoadModule authnz_ldap_module modules/mod_authnz_ldap.so
LoadModule include_module modules/mod_include.so
LoadModule log_config_module modules/mod_log_config.so
LoadModule logio_module modules/mod_logio.so
LoadModule env_module modules/mod_env.so
LoadModule ext_filter_module modules/mod_ext_filter.so
....
```
Trên đây là danh sách các module đã được bật mặc định nhưng thường không cần thiết: `mod_imap`, `mod_include`,`mod_info`, `mod_userdir`,`mod_autoindex`. Để tắt module cụ thể, bạn có thể chèn “#” vào đầu dòng đó và restart lại apache.

## 5. Chạy Apache với User và Group riêng
Với các cài đặt mặc định của Apache chạy quy trình của nó mà không cần user hoặc daemon. Vì lý do bảo mật, bạn nên chạy Apache trong tài khoản riêng. Ví dụ: `http-web`.

Tạo user và group Apache
```
# groupadd http-web
# useradd -d /var/www/ -g http-web -s /bin/nologin http-web
```
Bây giờ bạn cần sửa config để Apache chạy với user mới này.
Mở `/etc/httpd/conf/httpd.conf` tìm kiếm từ khóa “User” và “Group” và nhập tên user mà ình đã tạo và group để sử dụng.
```
User http-web
Group http-web
```
## 6. Sử dụng Allow và Deny để hạn chế quyền truy cập vào folder
Apache có config để hạn chế quyền truy cập vào các thư mục với các tùy chọn “Allow” và “Deny” trong file httpd.conf.

Bằng cách setting config như thế này:
```
<Directory />
   Options None
   Order deny,allow
   Deny from all
</Directory>
```
* Options None - Tùy chọn này sẽ không cho phép người dùng bật bất kỳ tính năng tùy chọn nào.
* Order deny,allow - Sắp xếp thứ tự thực hiện xử lý. Ở đây nó sẽ “ deny” trước và “allow” sau.
* Deny from all - Điều này sẽ từ chối yêu cầu từ mọi người đến thư mục gốc , không ai có thể truy cập thư mục gốc.
## 7. Sử dụng các module mod_security và mod_evasive để bảo mật Apache
Hai module “mod_security” và “mod_evasive” là những module rất phổ biến của Apache về mặt bảo mật.

### 7.1 Mod_security
`mod_security` hoạt động như một bức tường lửa cho các web application và cho phép admin theo dõi lưu lượng truy cập theo thời gian thực. Nó cũng giúp admin bảo vệ các trang web hoặc server web khỏi các cuộc tấn công. Bạn có thể chỉ cần cài đặt mod_security trên máy chủ của mình với sự trợ giúp của apt hoặc yum.

Cài đặt `mod_security` trên Ubuntu/Debian
```

$ sudo apt-get install libapache2-modsecurity
$ sudo a2enmod mod-security
$ sudo /etc/init.d/apache2 force-reload
```
Cài đặt `mod_security` trên RHEL / CentOS / Fedora /
```
# yum install mod_security
# /etc/init.d/httpd restart
```
### 7.2 Mod_evasive
`mod_evasive` hoạt động rất hiệu quả, cần một request để xử lý và xử lý nó rất tốt. Nó ngăn chặn các cuộc tấn công DDOS gây ra nhiều thiệt hại. Tính năng này của mod_evasive cho phép nó xử lý HTTP và cuộc tấn công Dos hoặc DDos. Module này phát hiện các cuộc tấn công bằng ba phương pháp.

* Nếu có nhiều request đến cùng một trang một vài lần mỗi giây.
* Nếu bất kỳ quy trình con nào cố gắng thực hiện hơn 50 request đồng thời.
* Nếu bất kỳ IP nào vẫn cố gắng thực hiện các request mới khi nó tạm thời bị đưa vào danh sách đen .
`mod_evasive` có thể được cài đặt trực tiếp từ source. 

Nếu các bạn quan tâm, hãy đọc bài viết này [Protect Apache using Mod_Security and Mod_evasive](https://www.tecmint.com/protect-apache-using-mod_security-and-mod_evasive-on-rhel-centos-fedora/).

## 8. Vô hiệu hóa các following của Symbolic Links
Mặc định Apache tuân theo các Symbolic Links, chúng ta có thể tắt tính năng này bằng tùy chọn FollowSymLinks. Và để làm như vậy, chúng ta cần thực hiện cấu hình như sau trong file httpd.conf.
```
Options -FollowSymLinks
```

Nếu bất kỳ user hoặc trang web cụ thể nào cần bật FollowSymLinks, admin chỉ cần viết rule trong file  “.htaccess ” từ trang web đó.
```
# Enable symbolic links
Options +FollowSymLinks
```
**Lưu ý:** Để cấu hình này thực thi được trong file “ .htaccess ”,  Cần phải config “AllowOverride All" trong file cấu hình httpd.conf chính trên global.

## 9. Tắt Server Side Includes và CGI Execution
Bạn có thể tắt Server Side Includes ( mod_include ) và CGI Execution nếu không cần thiết bằng cách sửa cấu hình như sau:

```
Options -Includes
Options -ExecCGI
```
Bạn cũng có thể sửa nó cho một thư mục cụ thể với tag Directory. Trong ví dụ này, mình đang tắtServer Side Includes và CGI Execution cho “/var/www/html/web1”.
```

<Directory "/var/www/html/web1">
Options -Includes -ExecCGI
</Directory>
```
Dưới đây là một số giá trị khác có thể được Bật hoặc tắt bằng chỉ thị Tùy chọn.

* Options All - Bật tất cả tùy chọn cùng một lúc. Đây là giá trị mặc định, nếu bạn không muốn chỉ định bất kỳ giá trị nào trong file conf `Apache` hoặc `.htaccess`.
* Options IncludesNOEXEC  - Cho phép phía server Include mà không có quyền thực thi lệnh hoặc tệp cgi.
* Options MultiViews - Cho phép nhiều lượt xem thương lượng nội dung với module mod_negotiation.
* Options SymLinksIfOwnerMatch - Nó tương tự như FollowSymLinks nhưng nó sẽ chỉ xảy ra khi chủ sở hữu giống nhau giữa SymLinks và Folder root mà nó được liên kết.
## 10. Limit Request Size
Theo mặc định, Apache không có giới hạn về tổng kích thước của yêu cầu HTTP, tức là không giới hạn và khi bạn cho phép các yêu cầu lớn trên máy chủ web, nên bạn rất dễ bị tấn công từ chối dịch vụ. Bạn có thể giới hạn request size của Apache bằng “LimitRequestBody” trong tag  Directory.

Bạn có thể đặt giá trị theo byte từ 0 (không giới hạn) đến 2147483647 (2GB) được phép trong phần body request và có thể đặt giới hạn này theo nhu cầu trang web của mình, Giả sử bạn có một trang web mà bạn cho phép tải lên và bạn muốn giới hạn size upload cho một thư mục cụ thể.

VD:
```
<Directory "/var/www/myweb1/user_uploads">
   LimitRequestBody 512000
</Directory>
```
Thư mục `user_uploads` là một thư mục chứa các file do người dùng upload. Và mình đang đặt giới hạn 500KB cho nó.
## 11. Tránh các cuộc tấn công DDOS và Hardening
Chắc chắn sẽ không thể bảo vệ hoàn toàn trang web khỏi các cuộc tấn công DDos. Nhưng 1 số tips dưới đây có thể giúp bạn kiểm soát được phần nào:

* TimeOut: Cho phép bạn đặt khoảng thời gian server sẽ đợi các sự kiện nhất định hoàn thành trước khi nó bị lỗi. Mặc định của nó là 300 giây. Giá trị này hoàn toàn phụ thuộc vào loại request bạn nhận được trên trang web của mình. Lưu ý: Nó có thể gây ra vấn đề với các lệnh CGI đi kèm.
* MaxClients: Cho phép bạn giới hạn các kết nối sẽ được phục vụ đồng thời. Mọi kết nối mới sẽ được xếp hàng sau giới hạn này. Nó có sẵn với Prefork và Worker cả MPM . Giá trị mặc định của nó là 256 .
* KeepAliveTimeout : Đó là khoảng thời gian máy chủ sẽ đợi một yêu cầu tiếp theo trước khi đóng kết nối. Giá trị mặc định là 5 giây .
* LimitRequestFields: Đặt giới hạn về số lượng trường trên header của request HTTP sẽ được chấp nhận từ các máy khách. Giá trị mặc định của nó là 100. Bạn nên giảm giá trị này nếu các cuộc tấn công DDos đang xảy ra do quá nhiều request header http.
* LimitRequestFieldSize: Đặt giới hạn kích thước trên header HTTP Request.
## 12. Bật tính năng ghi log Apache
Apache cho phép bạn ghi log độc lập với ghi log hệ điều hành của bạn. Bạn nên bật tính năng ghi log Apache vì nó cung cấp nhiều thông tin hơn, chẳng hạn như các lệnh được nhập bởi người dùng đã tương tác với máy chủ Web của bạn.

Để làm như vậy, bạn cần bao gồm module `mod_log_config`. Có ba Options liên quan đến ghi log có sẵn với Apache.

* TransferLog : Tạo file log.
* LogFormat : Đặt một format tùy chỉnh.
* CustomLog : Tạo và format tệp nhật ký.
Bạn cũng có thể sử dụng nó cho một trang web cụ thể mà bạn đang sử dụng VirtualHost và bạn cần chỉ định nó trong phần VirtualHost. Ví dụ: Đây là cấu hình VirtualHost trang web của mình có bật tính năng ghi log.

```
<VirtualHost *:80>
    DocumentRoot /var/www/html/example.com/
    ServerName www.example.com
    DirectoryIndex index.htm index.html index.php
    ServerAlias example.com
    ErrorDocument 404 /story.php
    ErrorLog /var/log/httpd/example.com_error_log
    CustomLog /var/log/httpd/example.com_access_log combined
</VirtualHost>
```
## 13. Bảo mật Apache bằng SSL Certificates
Bạn có thể mua SSL Certificates từ rất nhiều nhà cung cấp SSL khác nhau như namecheap.com. Nếu bạn đang có một web rất nhỏ và không muốn mua SSL Certificates, bạn vẫn có thể cài chứng chỉ tự ký cho trang web của mình. 

Apache sử dụng mô-đun mod_ssl để hỗ trợ SSL Certificates.

```
# openssl genrsa -des3 -out example.com.key 1024
# openssl req -new -key example.com.key -out exmaple.csr
# openssl x509 -req -days 365 -in example.com.com.csr -signkey example.com.com.key -out example.com.com.crt
```
Khi Certificates của bạn đã được tạo và ký, hãy thêm nó vào cấu hình apache như sau:

```
<VirtualHost 172.16.25.125:443>
        SSLEngine on
        SSLCertificateFile /etc/pki/tls/certs/example.com.crt
        SSLCertificateKeyFile /etc/pki/tls/certs/example.com.key
        SSLCertificateChainFile /etc/pki/tls/certs/sf_bundle.crt
        ServerAdmin admin@example.com
        ServerName example.com
        DocumentRoot /var/www/html/example/
        ErrorLog /var/log/httpd/example.com-error_log
        CustomLog /var/log/httpd/example.com-access_log common
</VirtualHost>
```
Sau đó restart lại apache của bạn và mở trình duyệt, nhập `https://example.com` và bạn sẽ thấy web đã có https.
## Kết
Đây là một vài tips bảo mật mà bạn có thể sử dụng để bảo mật server web Apache của mình. Để biết thêm các mẹo và ý tưởng bảo mật hữu ích, hãy xem tài liệu trực tuyến chính thức của [Apache HTTP Server](https://httpd.apache.org/docs/2.2/misc/security_tips.html) nhé.

Cảm ơn các bạn đã theo dõi bài viết của mình!

### Tài liệu
1. [https://www.tecmint.com/apache-security-tips/](https://www.tecmint.com/apache-security-tips/)
2. [Apache HTTP Server](https://httpd.apache.org/docs/2.2/misc/security_tips.html)