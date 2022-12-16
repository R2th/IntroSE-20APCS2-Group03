**Let's Encrypt cung cấp chứng chỉ SSL miễn phí cho các website muốn sử dụng HTTPS. Trong bài viết này VnCoder sẽ hướng dẫn chi tiết cách cài đặt Let's Encrypt cho website của bạn sử dụng máy chủ OpenLiteSpeed hoặc LiteSpeed Web Server**
## Tại sao lại sử dụng  Let’s Encrypt?
Let’s Encrypt là một nhà cung cấp chứng chỉ số SSL (Certificate Authority) hoàn toàn miễn phí, được nhiều cá nhân và tổ chức tin dùng và đặc biệt không giới hạn do tổ chức phi lợi nhuận Internet Security Research Group (ISRG) duy trì. Do đó Lets Encrypt được rất nhiều website sử dụng để cài đặt SSL khi muốn cấu hình HTTPS. 
## LiteSpeed và OpenLiteSpeed Web Server 
**LiteSpeed** hay **LiteSpeed Web Server** (gọi tắt là LSWS) là một dịch vụ Web Server chạy trên nền tảng OS Linux, được biết đến với khả năng cung cấp một hiệu suất tuyệt vời và khả năng mở rộng cực cao. Một web server Apache nổi tiếng có thể được thay thế bằng LiteSpeed Web Server vô cùng dễ dàng mà không cần chỉnh sửa bất kỳ chi tiết nào trong cấu hình dịch vụ trên hệ điều hành và cũng không gây ảnh hưởng hay cản trở tiến trình hay chương trình nào cả. LiteSpeed khi sử dụng cần mất phí tuy nhiên chúng ta hoàn toàn có thể sử dụng bản miễn phí mã nguồn mở **OpenLiteSpeed** với phần đầy đủ tính năng tương tự . Các bạn có thể xem [Hướng dẫn cài đặt OpenLiteSpeed tại đây ](https://vncoder.vn/bai-viet/huong-dan-cai-dat-chi-tiet-openlitespeed-tren-centos)
## Cài đặt môi trường
Để cài đặt và sử dụng **Let’s Encrypt** trên server của bạn chúng ta sử dụng một công cụ là **Let’s Encrypt CertBot **

Cài đặt CertBot trên Ubuntu
```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
```

Cài đặt CertBot trên CentOS 7
```
yum -y install yum-utils
yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional
sudo yum install certbot
```

Cài đặt CertBot trên CentOS 8
```
wget https://dl.eff.org/certbot-auto
sudo mv certbot-auto /usr/local/bin/certbot-auto
sudo chown root /usr/local/bin/certbot-auto
sudo chmod 0755 /usr/local/bin/certbot-auto
```

## Tạo chứng chỉ SSL cho website của bạn
Với các máy chủ Apache hoặc Nigx Certbot có thể tự động nhận diện máy chủ và cài đặt SSL một cách tự động. Với máy chủ OpenLiteSpeed ta thực hiện cài đặt thủ công như sau

Bước 1 chạy lệnh certbot để tạo chứng chỉ
```
certbot-auto certonly
```

Kết quả sau khi chạy lệnh
```
[root@git ~]# certbot-auto certonly
Saving debug log to /var/log/letsencrypt/letsencrypt.log

How would you like to authenticate with the ACME CA?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: Spin up a temporary webserver (standalone)
2: Place files in webroot directory (webroot)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel):      
``` 

Tiếp theo các bạn nhập số 2 rồi nhấn enter
```
Enter email address (used for urgent renewal and security notices) (Enter ‘c’ to cancel):
Sau đó  các bạn nhập email để đăng kí SSL, LiteSpeed sẽ gửi email gia hạn hoặc các thông tin liên quan vào mail này.

Please read the Terms of Service at https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must agree in order to register with the ACME server at https://acme-v01.api.letsencrypt.org/directory
(A)gree/(C)ancel:
```

Nhập 'A' để đồng ý với điều khoản dịch vụ

```
Would you be willing to share your email address with the Electronic Frontier Foundation, a founding partner of the Let’s Encrypt project and the non-profit organization that develops Certbot?
(Y)es/(N)o:
```
Nhập 'N' từ chối chia sẻ thông tin email

```
Plugins selected: Authenticator webroot, Installer None
Please enter in your domain name(s) (comma and/or space separated)  (Enter 'c'
to cancel): 
```   

Bước tiếp theo là bạn nhập tên miền của website cần đăng kí

`Input the webroot for YOUR_DOMAIN: (Enter ‘c’ to cancel):`

Nhập đường dẫn tới thưc mục gốc của website, đợi vài giây certbot sẽ tạo chứng chỉ  cho các bạn
```
Waiting for verification… Cleaning up challenges

IMPORTANT NOTES: Congratulations! Your certificate and chain have been saved at:
/etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem
Your key file has been saved at:
/etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem

Your cert will expire on DATE. To obtain a new or tweaked version of this certificate in the future, simply run “certbot-auto” again.
To non-interactively renew *all* of your certificates, run “certbot-auto renew”
```

## Cấu hình SSL cho OpenLiteSpeed 
Sau khi đã tạo xong chứng chỉ SSL cho website, việc tiếp theo là ta phải cấu hình SSL trên trang admin

Truy cập trang admin của OpenLiteSpeed mặc định là domainname:7080 tạo thêm một Listeners mới cho HTTPS theo cấu hình dưới đây (nên đặt tên là HTTPS cho dễ nhớ)
![](https://images.viblo.asia/47851852-6a52-43b4-ade9-a035c8972c96.png)

Bây giờ chúng ta sẽ cấu hình SSL cho  listener. Bạn vào  Listeners  –> SSL –> SSL Private Key & Certificate.
Copy đường dẫn chứng chỉ ở trên điền vào như sau
```
Private Key File: /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem
Certificate File: /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem
```

Ở phần SSL protocol tích tất cả các giao thức SSL 
![](https://images.viblo.asia/2780a2a1-bf82-4457-be16-c4ec5187be14.png)

Nếu server của bạn có nhiều website thì bạn nhớ mapping website của bạn vào listenner HTTPs vừa tạo

Chọn SAVE sau đó khởi động lại  OpenLiteSpeed
Khi cấu hình thành công Listener của bạn sẽ xuất hiện với màu xanh trên Dashboard
![](https://images.viblo.asia/2d737717-1ef0-4f9f-8268-a2309eca8af7.png)

Việc tiếp theo  là test thử website của các bạn trên trình duyệt, hiện cái khoá màu xanh ở thanh địa chỉ là thành công
![](https://images.viblo.asia/38b8b2a2-6bcf-46a2-bf4c-009fbf37fb07.png)

## Tổng kết
Trong bài viết này, mình đã hướng dẫn chi tiết cho các bạn cách đăng kí chứng chỉ Let’s Encrypt cho website của bạn và cấu hình HTTPS trên trang admin. Nếu bạn nào không thực hiện được có thể comment bên dưới mình sẽ hướng dẫn thêm, Chúc các bạn thành công

Tham khảo: [VNCoder: Hướng dẫn cài đặt Let's Encrypt SSL trên OpenLiteSpeed](https://vncoder.vn/bai-viet/huong-dan-cai-dat-lets-encrypt-ssl-tren-openlitespeed-litespeed-web-server)