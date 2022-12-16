Như trong bài viết trước mình đã hướng dẫn các bạn cài đặt Plesk trên VPS của DigitalOcean:

https://viblo.asia/p/huong-dan-cai-dat-plesk-tren-vps-cua-digital-ocean-924lJWQY5PM

Đây là một trong những phần mềm quản trị hosting phổ biến nhất hiện nay. Trong bài viết này chúng ta sẽ tìm hiểu về cách sử dụng Plesk cơ bản.
## 1. Websites & Domains:
Trong phần này các bạn có thể thêm Domain, Subdomain, Domain Alias,... cũng như quản lý backup, database, xem các thông số của server ở sidebar bên phải.
![](https://images.viblo.asia/3e32ba20-4ef4-4774-a170-69efccd2db8e.png)
Thêm mới 1 domain bằng cách click Add Domain:
![](https://images.viblo.asia/e5298ba0-2e80-40b5-bb2d-674e2856217a.png)
Trong phần này để cài đặt HTTPS bạn nên lựa chọn Secure the domain with Let's Encrypt. Chứng chỉ của  Let's Encrypt là miễn phí và sẽ tự động renew sau 30 ngày nên bạn có thể hoàn toàn yên tâm sử dụng.

Nếu bạn muốn kết nối với github thì cũng có thể cài đặt luôn tại đây. Lựa chọn này là cần thiết cho các bạn muốn upload code trực tiếp từ Github lên server.

Sau khi thêm mới domain thành công bạn sẽ có giao diện như hình số 1. Ở đây sẽ có các menu icon tương ứng với các phần quản trị riêng cho server của bạn.

### 1.1. Web Hosting Access: 
Các bạn có thể thay đổi các thông tin đăng nhập vào server tại đây.
![](https://images.viblo.asia/9c52ead6-0034-45dc-83e6-51069bcc9402.png)

### 1.2. FTP Access:
Quản lý các tài khoản để kết nối quản lý file đến server.
![](https://images.viblo.asia/c103456e-b0f0-4788-8b11-003ed3e22f82.png)
Ở đây bạn có thể chia nhiều thư mục tương ứng với các user khác nhau

### 1.3. Hosting Settings:
Dùng để cài đặt các thông số quan trọng cho domain như document root, Security, Web scripting,...
![](https://images.viblo.asia/aaf94f12-08c3-4d1d-a09c-4149c4e8625f.png)

### 1.4. Let's Encrypt
Nếu ở bước Add Domain bạn chưa cài đặt thì bạn có thể thêm tại đây hoặc renew chứng chỉ SSL/TLS. 

### 1.5. Git
Các cài đặt liên quan đến GIT 
![](https://images.viblo.asia/a11e7354-09da-4968-8a88-1dd9f9dff6b1.png)

### 1.6. PHP Settings
Bạn có thể lựa chọn phiên bản PHP và các cài đặt về hiệu năng,...![](https://images.viblo.asia/ff5bb539-ab02-48b5-b1cb-164d00a8d2c7.png)

### 1.7. Apace & Nginx Settings
![](https://images.viblo.asia/66717ca9-7c03-44dc-b760-1b7d5093c4b3.png)
Trong phần này các bạn nên để các cài đặt mặc định tuy nhiên để tối ưu tốc độ tải trang bạn có thể thêm trong phần **Additional nginx directives** như sau:
```
location ~* .(js|jpg|jpeg|gif|png|css|tgz|gz|rar|bz2|doc|pdf|ppt|tar|wav|bmp|rtf|swf|ico|flv|txt|woff|woff2|svg)$ {
	etag on;
	if_modified_since exact;
	add_header Pragma "public";
	add_header Cache-Control "max-age=31536000, public";
}
```

### 1.8. Applications
Các ứng dụng có sẵn để giúp bạn cài đặt nhanh hơn. Hầu hết là các mã nguồn mở như WordPress, Joomla, Prestashop,...

### 1.9. File Manager
Phần rất quan trọng đó là quản lý các file. Sau khi sử dụng khá nhiều các nhà cung cấp dịch vụ hosting của Việt Nam cũng như nước ngoài thì mình đánh giá giao diện của Plesk là rất thân thiện và dễ sử dụng.
![](https://images.viblo.asia/ed2662ea-725d-42e9-a980-9c1a528dfaef.png)

##  Kết luận
Như vậy trong phần 1 Hướng dẫn sử dụng Plesk cơ bản mình đã liệt kê và hướng dẫn các cài đặt quan trọng trong phần quản lý Website và domain. Hy vọng qua bài viết đã giúp các bạn có thể nắm bắt được quản lý Plesk ban đầu. Trong bài viết sau mình sẽ hướng dẫn các bạn quản lý các phần tiếp theo trong quá trình sử dụng.