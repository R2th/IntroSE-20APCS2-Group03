### Kiến thức về Linux, Infra cơ bản nhất cần có cho một Developer - Phần 1
![](https://images.viblo.asia/ac922db2-3b31-45a5-a094-69339ab2de84.jpg)

Nếu bạn là 1 developer nhưng bạn chỉ biết code và chưa từng tự mình thử deploy ứng dụng web thực tế nào.  Thì bài viết này dành cho bạn đó :)  
Còn các Pro nếu xem nhầm thì vẫn có thể ủng hộ em bằng 1 LIKE và 1 SUBSCRIBE ạ.  

Gần đây, team của mình có thêm vài bạn dev mới.   
Và mình nhận thấy một điều rằng, có những bạn kinh nghiệm dev vài năm rồi, tự nhận mình là Junior, Senior rồi.    
Tuy nhiên khi được nhờ deploy 1 dự án nào đó lên server thì có phần khá là lúng túng.  
Có vài lý do chính như:  
1. Trước anh làm cty to, có bộ phần Infra riêng, nên chẳng bao giờ phải làm mấy cái này nên không biết.
2. Công ty cũ của em toàn Leader làm, em chỉ việc push code lên Git thôi.
3. Vân vân và mây mây

Mình nghĩ sẽ có nhiều bạn trong số chúng ta ở đây, có những vấn đề tương tự.       
Vậy thì cùng mình đi tìm hiểu xem, code giỏi rồi thì cần thêm gì nữa nhé :D  
Do phần nào cũng có cả trên mạng rồi, nên mình xin đc trích link, thay vì copy hết vào đây nhé.  
### 1. Cách truy cập vào server
Sau khi mua 1 con server thì bạn sẽ nhận được các thông tin như IP, Port, tài khoản truy cập.   
Sau đó bạn sẽ cần phải ssh vào server đó, để tiến hành các service, package cần thiết trước khi deploy code của bạn.  
Bạn có thể dùng các tool như Putty, Tera term để login, hoặc login thông qua command lệnh của bạn.  
[Cách ssh vào server](https://www.hostinger.vn/huong-dan/lam-the-nao-de-ket-noi-tai-khoan-bang-putty-ssh-terminal/)

### 2. Linux cơ bản
Nếu chưa biết gì nhiều, thì mình nghĩ bạn không cần phải hiểu quá sâu làm gì, cứ làm đi đã. Ngấm dần rồi sẽ hiểu sau thôi.  
[Các lệnh cơ bản trong Linux](https://www.hostinger.vn/huong-dan/cac-lenh-co-ban-trong-linux)

### 3. Webserver
Tiếp theo, để một ứng dụng web chạy được chúng ta cần tối thiểu là webserver.    
Hiện tại phổ biến bậc nhất vẫn là Apache và Nginx.   
Nên các bạn có thể tìm hiểu cái nào phù hợp với nhu cầu dự án của bạn thì cài vào nhé.  
[Cách cài Apache](https://quantrimang.com/cai-dat-va-cau-hinh-apache-trong-ubuntu-76542)  
[Cách cài Nginx](https://blog.hostvn.net/chia-se/huong-dan-cai-dat-nginx-tren-centos-7.html)  

### 4. Cài đặt ngôn ngữ lập trình  
Khi đã cài đặt webserver ở bước 3, thì mọi request của người dùng sẽ được nhận và điều hướng đến source code của bạn.   
Tuy nhiên bạn cần cài thêm các gói ngôn ngữ để, để source code của bạn có thể chạy đc.  
Tùy vào ngôn ngữ bạn sử dụng là PHP hay Rails.  
Và Framework bạn sử dụng nó yêu cầu những package nào thì bạn có thể google thêm để cài nhé.  

### 5. Cài đặt hệ quản trị cơ sở dữ liệu
Đa phần ứng dụng web nào cũng sẽ có database, nên tùy vào ứng dụng của bạn, bạn cần cài thêm hệ quản trị dữ liệu.  
Ví dụ MySQL:  
[Cách cài đặt Mysql](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04)    
Sau khi cài đặt, bạn cần connect vào mysql, tạo db và sau đó nhập thông tin connect của db cho source code của bạn.  
[Cách connect Mysql](https://www.a2hosting.com/kb/developer-corner/mysql/connect-to-mysql-from-the-command-line)  

### 6. Cài đặt Crontab  
Hầu như ứng dụng nào cũng có các tác vụ chạy tự động, 1 ngày chạy vài lần, vài ngày chạy 1 lần.  
Cái đó phía linux gọi là crontab hay cronjob.  
[Hướng dẫn về crontab](https://viblo.asia/p/tim-hieu-crontab-tren-linux-WApGx3DbM06y)  

Cơ bản 6 mục này, nếu bạn lắm chắc thì cũng đã khá tự tin khi được giao cho cầm con server nào đó để deploy ứng dùng rồi.    
Còn một số phần khác như Firewall, hay quản lý users, permission... mình sẽ giới thiệu trong bài viết khác.  Hoặc bạn có thể search google, cái gì cũng có sẵn rồi. Đọc và làm theo thôi.  

### Một Tips nhỏ có thể nó hữu dụng với bạn  
Nếu bạn được giao cho 1 server đang maintain, bạn không biết nó đang dùng webserver gì, hay hệ quản trị cơ sở dữ liệu nào thì bạn sẽ bắt đầu thế nào?  
* Để biết server đó đang dùng webserver nào, bạn chỉ cần gõ lệnh: ``` curl -I 127.0.0.1  ```
>  HTTP/1.1 404 Not Found  
Date: Mon, 10 May 2021 13:19:41 GMT  
Server: Apache/2.2.15 (CentOS)  
Content-Type: text/html; charset=iso-8859-1

* Để biết thông tin về database:  bạn chỉ cần vào phần config db connection trong source là biết thôi :D 

Mình xin kết bài này tại đây, nếu bạn có câu hỏi hay góp ý gì, nhớ comment giúp mình nhé.  
Phần sau mình sẽ viết về docker cơ bản và cách thiết lập auto deploy.   
Rất mong các bạn tiếp tục theo dõi nhé.