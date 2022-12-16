Trong bài viết lần này, mình sẽ tổng hợp 1 số cách thức làm thế nào để tìm ra địa chỉ IP thật của 1 server đằng sau các dịch vụ CloudFlare, vừa để hỗ trợ mọi người trong quá trình pentesting cũng như cho các System Admin biết được mình misconfig thế nào dẫn đến bị lộ IP thật để phòng tránh.
Trước tiên mình sẽ nói qua về hệ thống CloudFlare

## Cloudflare là gì  ?

![](https://images.viblo.asia/289d9b4e-ac65-458f-8714-bab2892ffe1a.png)

Đơn giản nhất để hiểu là CloudFlare là 1 dịch vụ sẽ đứng giữa Client và Server có chức năng phân giải tên miền (DNS) cộng thêm vai trò như điều phối lượng truy cập, CDN cũng như các giải pháp bảo mật chống Ddos, Spam, SSL, Forward Domain,..

![](https://images.viblo.asia/e639226d-b1a4-4772-ade7-ad2d3c5f673b.png)


Khi đó đối với 1 pentester thì khi pentest 1 website có dùng dịch vụ CloudFlare thì mọi request đều phải qua CloudFlare xử lí rồi từ đó nó mới gửi đến server cho nên các payload sẽ thường bị loại bỏ trước khi lên được server .

Chắc hẳn bạn cũng thắc mắc là làm thế nào mà có thể bắt buộc người dùng kết nối đến CDN Server thay vì trực tiếp đến server thật. Thì các CDN có giải pháp chính là khai báo lại các Name Server record của domain website. Tức là bình thường Name Server thường là của Hosting Provider hoặc Domain Registrar nhưng khi sử dụng CloudFlare thì Name Server sẽ là của CloudFlare và từ đó các DNS request của user sẽ được phân giải bởi CloudFlare Name Server thay vì Registra Name Server.


## Các phương pháp tìm IP

Đầu tiên để phân biệt được đâu là IP thật hay IP CloudFlare thì trên trang chủ của dịch vụ có cung cấp dải IP của CloudFlare tại  : https://www.cloudflare.com/ips/

### Phương pháp 1 :  PING

Ping đến 1 số các subdomain như :

ping direct-connect.domain.com

ping direct.domain.com

ping ftp.domain.com

ping cpanel.domain.com

Nping mail.domain.com

Bởi vì trong 1 số trường hợp các subdomain được cấu hình trỏ A record về IP thật của server. Còn nếu trong trường hợp ping báo time out tức là có khả năng server chặn ICMP request thì dùng lệnh nmap sau :

`nmap -sV -sS -F <domain>`

trong đó :
-F : scan các port phổ biến
-Ss : xác định xem port có mở không
-sV: xác định dịch vụ và version

### Phương pháp 2:  HISTORY
Tìm lịch sử IP của website bị bot cralw lại trước khi thiết lập CloudFlare :
`http://toolbar.netcraft.com/site_report?url= <domain>` hoặc ở trên https://securitytrails.com/
https://fofa.so/
https://sitereport.netcraft.com/?url=


### Phương pháp 3 : NMAP ENUM
Bruteforce/guessing subdomain bằng nmap

`nmap --script dns-brute -sn <target>`

### Phương pháp 4 :  NSLOOKUP

Trong 1 số trường hợp máy chủ mail và web đặt cùng 1 server thì việc tìm ra Ip thật sẽ đơn giản hơn nhiều bởi vì  vì các MX record buộc phải phân giải ra IP thật của máy chủ mail, do đó phải set MX record bằng IP thật. Đối với trường hợp này ta sẽ dùng nslookup và chỉ việc ping hay scan IP là ra

```
nslookup
> set type=MX
> <domain>
```

### Phương pháp 5 : SSL CERTIFICATE
![](https://images.viblo.asia/d39810bb-b05f-4bb7-98b1-21c9891f6b23.png)

vào một trường hợp khác, gỉa sử web site của bạn có hỗ trợ SSL và có certificate. Nhưng vấn đề ở đây nằm ở chỗ Certificate dùng cho Client - CloudFlare  lại dùng chung luôn  CloudFlare - Server. Đối với trường hợp này bạn cần :

truy cập https://censys.io/certificates

 Search theo cú pháp `parsed.names: <domain> and tags.raw: trusted`
    
Censys sẽ scan và hiện các certificate với các tiêu chí trên và việc sau đó là bạn sẽ cần click từng kể quá tìm được. 
 
Chọn vào "Explore " ở bên phải -> What's using this certificate? > IPv4 Hosts.

Sau đó bạn sẽ thấy danh sách các IP sử dụng cái certificate trên thì khả năng các IP trên sẽ có IP của web server 


### Phương pháp 6 : MALICIOUS UPLOAD

Phương pháp Upload ảnh tùy chọn lên website. Đối với cách này điều kiện là website cho phép tải ảnh lên web từ website hay liên kết ngoài.

Trước hết bạn truy cập  http://iplogger.org/ và click "Generate an invisible IPLogger"

Bây giờ, copy liên kết và truy cập vào trang mà bạn cần lấy IP của nó, tạo 1 tài khoản. Sau đó vào mục thay đổi Avatar hay upload ảnh từ URL. Dán link vừa copy ở trên vào

Lúc này hệ thống nó sẽ download bức ảnh kia và tải lên server của nó, do đó IP truy cập vào bức ảnh đó là IP của Server. Bây giờ quay trở lại trang lúc nãy, nhấn vào mục View Log để xem nhật ký truy cập. Kết quả là như thế này đây.



## Đối chiếu :


[https://www.secjuice.com/finding-real-ips-of-origin-servers-behind-cloudflare-or-tor/](https://www.secjuice.com/finding-real-ips-of-origin-servers-behind-cloudflare-or-tor/)

[https://vpssim.vn/3533-tim-ip-cua-website-su-dung-dich-vu-cloudflare-de-ip.html](https://vpssim.vn/3533-tim-ip-cua-website-su-dung-dich-vu-cloudflare-de-ip.html)

[https://www.facebook.com/notes/hong-phuc-nguyen/truy-t%C3%ACm-ip-th%E1%BA%ADt-c%E1%BB%A7a-server-%C4%91%E1%BA%B1ng-sau-cloudflare-hay-c%C3%A1c-d%E1%BB%8Bch-v%E1%BB%A5-cdn/663619997015802/](https://www.facebook.com/notes/hong-phuc-nguyen/truy-t%C3%ACm-ip-th%E1%BA%ADt-c%E1%BB%A7a-server-%C4%91%E1%BA%B1ng-sau-cloudflare-hay-c%C3%A1c-d%E1%BB%8Bch-v%E1%BB%A5-cdn/663619997015802/)