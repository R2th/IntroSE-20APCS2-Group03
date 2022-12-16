Chào mọi người, lâu rồi chưa có bài viết mới hôm nay mình cùng tìm hiểu cách cài một SSL trên Apache như thế nào nhé. Chủ đề này tuy cũ người mới ta các bạn biết rồi thì bỏ qua bài viết này của mình. Các bạn chú ý nhớ thay **domain.com** bằng **domain** hoặc **subdomain** các bạn đăng kí cho website của mình nhé.Thanks!
![](https://images.viblo.asia/42d1964f-3a8a-48c2-b015-4a0b992cabce.png)

## 1. SSL là gì?
SSL là gì? SSL là viết tắt của từ Secure Sockets Layer. SSL là tiêu chuẩn của công nghệ bảo mật, truyền thông mã hoá giữa máy chủ Web server và trình duyệt.

**Let’s Encrypt** là một nhà cung cấp chứng chỉ số SSL (**Certificate Authority**) hoàn toàn miễn phí, được nhiều cá nhân và tổ chức tin dùng và đặc biệt không giới hạn.

## 2. Cài SSL trên Apache
### Bước 1: Tạo file Virtual Hosts
Tạo file config virtual host với tên miền là domain.com
```
vim /etc/httpd/conf.d/domain.com.conf
```
```
<VirtualHost *:80> 
ServerName domain.com
ServerAlias www.domain.com
ServerAdmin webmaster@domain.com
DocumentRoot /var/www/domain.com
<Directory /var/www/domain.com>
Options -Indexes +FollowSymLinks 
AllowOverride All
</Directory> 
ErrorLog /var/log/httpd/domain.com-error.log
CustomLog /var/log/httpd/domain.com-access.log combined 
</VirtualHost>
```
### Bước 2 Cài đặt SSL Let’s Encrypt
1) Đầu tiên các bạn cần đặt SSL Certificate bằng lệnh sau:
```
yum install epel-release mod_ssl
```
2) Tiếp theo các bạn cài module hỗ trợ SSL cho Apache
```
yum install python-certbot-apache
```
3) Cuối cùng các bạn cài cert cho domain
```
certbot --apache –d domain.com
```
> certbot --apache -d domain.com
> Saving debug log to /var/log/letsencrypt/letsencrypt.log
> Plugins selected: Authenticator apache, Installer apache
> Enter email address (used for urgent renewal and security notices)
>  (Enter 'c' to cancel): demohotrovps@gmail.com
> Starting new HTTPS connection (1): acme-v02.api.letsencrypt.org
> 
> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
> Please read the Terms of Service at
> https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
> agree in order to register with the ACME server. Do you agree?
> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
> (Y)es/(N)o: y
> 
> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
> Would you be willing, once your first certificate is successfully issued, to
> share your email address with the Electronic Frontier Foundation, a founding
> partner of the Let's Encrypt project and the non-profit organization that
> develops Certbot? We'd like to send you email about our work encrypting the web,
> EFF news, campaigns, and ways to support digital freedom.
> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
> (Y)es/(N)o: y
> Account registered.
> Requesting a certificate for domain.com
> Performing the following challenges:
> http-01 challenge for domain.com
> Waiting for verification...
> Cleaning up challenges
> Created an SSL vhost at /etc/httpd/conf.d/domain.com-le-ssl.conf
> Deploying Certificate to VirtualHost /etc/httpd/conf.d/domain.com-le-ssl.conf
> Redirecting vhost in /etc/httpd/conf.d/domain.com.conf to ssl vhost in /etc/httpd/conf.d/domain.com-le-ssl.conf
> 
> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
> Congratulations! You have successfully enabled https://domain.com
> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
> Subscribe to the EFF mailing list (email: abc@gmail.com).
> Starting new HTTPS connection (1): supporters.eff.org
> 
> IMPORTANT NOTES:
>  - Congratulations! Your certificate and chain have been saved at:
>    /etc/letsencrypt/live/domain.com/fullchain.pem
>    Your key file has been saved at:
>    /etc/letsencrypt/live/domain.com/privkey.pem
>    Your certificate will expire on 2021-11-28. To obtain a new or
>    tweaked version of this certificate in the future, simply run
>    certbot again with the "certonly" option. To non-interactively
>    renew *all* of your certificates, run "certbot renew"
>  - If you like Certbot, please consider supporting our work by:
> 
>    Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
>    Donating to EFF:                    https://eff.org/donate-le
>    

Bạn reload lại domain và nhận kết quả

> Lưu ý:  Khi cài SSL này chỉ có thời hạn 90 ngày dùng nếu hết hạn các bạn có thể tạo crontab sau để tự động gia hạn.
Nhập dòng này và lưu crontab:
```
00 6 * * * /usr/bin/certbot renew --quiet
```
Chúc các bạn thành công hẹn gặp các bạn ở bài viết chủ đề khác của mình.

{@embed: https://www.youtube.com/watch?v=isMleMxA7jc}