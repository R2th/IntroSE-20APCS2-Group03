Ở thời đại công nghệ thông tin bùng nổ này việc tạo ra riêng cho mình một trang web với style riêng tùy sở thích hẳn là quá dễ ràng. Tuy vậy, để chạy được một website cũng cần một số chi phí đi kèm, không phải ai cũng mong muốn điều đó. 
Hôm nay, mình xin giới thiệu một phần có thể giảm chi phí cho trang web của bạn đó là `Tạo chứng chỉ ssl miễn phí với certbot`. Tuy còn một số điều hạn chế vì là miễn phí nhưng bản thân mình thấy khá ok do cách đăng ký khá dễ ràng và cách sử dụng đơn giản. 
# Đăng ký
Tuy cập trang web [certbot](https://certbot.eff.org/), vì là miễn phí hoàn toàn nên bạn cũng không cần bất kỳ tài khoản nào cả. 
Giao diện như sau:
![](https://images.viblo.asia/2ff304ae-9b1b-4a9f-aa99-394b2dcccd44.png)

Tại giao diện trang chủ chúng ta có thể chọn thông tin cho server web của bạn. Ở đây mình xin giới thiệu với:
* Nginx: Nginx là một máy chủ proxy ngược mã nguồn mở (open source reverse proxy server) sử dụng phổ biến giao thức HTTP, HTTPS, SMTP, POP3 và IMAP , cũng như dùng làm cân bằng tải (load balancer), HTTP cache và máy chủ web (web server). Dự án Nginx tập trung vào việc phục vụ số lượng kết nối đồng thời lớn (high concurrency), hiệu suất cao và sử dụng bộ nhớ thấp. Nginx được biết đến bởi sự ổn định cao, nhiều tính năng, cấu hình đơn giản và tiết kiệm tài nguyên.
* Hệ điều hành: Ubuntu 16.04

Sau khi chọn các thông số cần thiết `certbot` sẽ tự động hướng dẫn bạn đăng ký theo từng bước.

![](https://images.viblo.asia/b4119a5e-c795-42d6-95be-704107fd8fe7.png)


# Install
Các bạn lần lượt làm theo các bước tiếp theo:

```Ruby
$ sudo apt-get update
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
```

Việc này sẽ update lại hệ thống của bạn và add thêm repository cho certbot.
Add repository có log thế này là ok nhé.
```Ruby
deployer@ubuntu:~$ sudo add-apt-repository ppa:certbot/certbot
 This is the PPA for packages prepared by Debian Let's Encrypt Team and backported for Ubuntu(s).
 More info: https://launchpad.net/~certbot/+archive/ubuntu/certbot
Press [ENTER] to continue or ctrl-c to cancel adding it

gpg: keyring `/tmp/tmpobs4owoe/secring.gpg' created
gpg: keyring `/tmp/tmpobs4owoe/pubring.gpg' created
gpg: requesting key 75BCA694 from hkp server keyserver.ubuntu.com
gpg: /tmp/tmpobs4owoe/trustdb.gpg: trustdb created
gpg: key 75BCA694: public key "Launchpad PPA for certbot" imported
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
OK
```

Khi đã ok rồi tiếp tục bằng lệnh `sudo apt-get install python-certbot-nginx`: Có log như này là ok nhé. 
```Ruby
update-alternatives: using /usr/bin/python3-futurize to provide /usr/bin/futurize (futurize) in auto mode
update-alternatives: using /usr/bin/python3-pasteurize to provide /usr/bin/pasteurize (pasteurize) in auto mode
Setting up python3-parsedatetime (2.4-3+ubuntu16.04.1+certbot+3) ...
Setting up python3-zope.hookable (4.0.4-4+ubuntu16.04.1+certbot+1) ...
Setting up python3-zope.interface (4.3.2-1+ubuntu16.04.1+certbot+1) ...
Setting up python3-zope.event (4.2.0-1) ...
Setting up python3-zope.component (4.3.0-1+ubuntu16.04.1+certbot+3) ...
Setting up python3-certbot (0.22.2-1+ubuntu16.04.1+certbot+1) ...
Setting up certbot (0.22.2-1+ubuntu16.04.1+certbot+1) ...
Setting up python3-pyparsing (2.0.3+dfsg1-1ubuntu0.1) ...
Setting up python3-certbot-nginx (0.22.0-1+ubuntu16.04.1+certbot+2) ...
Setting up python-certbot-nginx (0.22.0-1+ubuntu16.04.1+certbot+2) ...
Setting up python3-icu (1.9.2-2build1) ...
Setting up python3-pyasn1 (0.1.9-2+certbot~xenial+1) ...
```


Một chú ý nhỏ cho phần `Install` này là Certbot's DNS plugins có thể được sử dụng để tự động hóa việc lấy chứng chỉ ký tự đại diện từ máy chủ ACMEv2 của Let's Encrypt do vậy thay vì ngồi cài đặt bằng tay mấy lệnh này bạn hoàn toàn có thể sử dụng Docker. 

# Sử dụng
Để tạo ra certificate cùng với máy chủ Ngnix bạn có hai sự lựa chọn sau:
* Sử dụng lệnh
```Ruby
  sudo certbot --nginx
```
Việc này mình khuyên không nên vì Certbot sẽ tự động edit lại nginx config để phù hợp với nó.
*  Sử dụng lệnh

```Ruby
sudo certbot --nginx certonly
```

Ta có thông báo:
```Ruby
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator nginx, Installer nginx
Enter email address (used for urgent renewal and security notices) (Enter 'c' to
cancel):
```
Nhập địa chỉ email, đây sẽ là địa chỉ email dùng để renewal lại chứng chỉ và là email để Certbot giao tiếp với bạn. 
        
 Các bước tiếp theo bạn chỉ cần làm theo hướng dẫn là được:
 ```Ruby
    Starting new HTTPS connection (1): acme-v01.api.letsencrypt.org

-------------------------------------------------------------------------------
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
agree in order to register with the ACME server at
https://acme-v01.api.letsencrypt.org/directory
-------------------------------------------------------------------------------
(A)gree/(C)ancel: A

-------------------------------------------------------------------------------
Would you be willing to share your email address with the Electronic Frontier
Foundation, a founding partner of the Let's Encrypt project and the non-profit
organization that develops Certbot? We'd like to send you email about EFF and
our work to encrypt the web, protect its users and defend digital rights.
-------------------------------------------------------------------------------
(Y)es/(N)o: Y
Starting new HTTPS connection (1): supporters.eff.org
No names were found in your configuration files. Please enter in your domain
name(s) (comma and/or space separated)  (Enter 'c' to cancel):
````
Đây là địa chỉ domain trang web của bạn.

Vậy là đã xong phần đăng ký chứng chỉ của bạn sẽ được tạo ra trong thư mục `/etc/letsencrypt/`, bây giờ bạn có thể sử dụng thoải mái chứng chỉ mình đã đăng ký như đã được trả tiền. 

# Automating renewal

Vì là đồ miễn phí nên các bạn không thể đăng ký một lần và dùng mãi mãi được. Giới hạn thời gian cho mỗi lần đăng ký trên Cerlbot là 90 ngày.
Sau thời gian đó các bạn sử dụng lệnh này để renewal lại chứng chỉ
```Ruby
sudo certbot renew --dry-run
```

Để biết chi tiết hơn về `Certbot` các bạn có thể tham khảo ở https://certbot.eff.org/docs/[Đây](https://certbot.eff.org/docs/)

*Thanks for reading !!!*