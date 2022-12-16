Bài viết này mình sẽ hướng dẫn cách cài đặt server host một api server hoặc website cho các bạn mới tập tành host server cho riêng mình hoặc dự án nhỏ. Môi trường mình chọn setup là linux Ubuntu 20.04. 
Lần đầu tiên viết bài chia sẻ nếu có sai hoặc sử dụng tiếng Anh và Việt chung các bạn thông cảm.
# 1. Cài đặt môi trường:
## Nginx:
Nginx dễ dàng tải trên repositories mặc định của Ubuntu. Nó có thể install bằng apt packaging system.
``` 
sudo apt update
sudo apt install nginx
```
## MongoDB
Kho lưu trữ gói chính thức của Ubuntu bao gồm phiên bản ổn định của MongoDB. Tuy nhiên, tại thời điểm viết bài này, phiên bản MongoDB có sẵn từ kho lưu trữ mặc định của Ubuntu là 3.6, trong khi phiên bản ổn định mới nhất là 5.0.  Tham khảo"https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/"  
Cập nhật GPG key for the latest stable version of MongoDB:
```
curl -fsSL https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

```
Double check key:
```
apt-key list
```
Create the /etc/apt/sources.list.d/mongodb-org-5.0.list file for Ubuntu 20.04 (Focal):
```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
```
Cài đặt:
```
sudo apt-get update
sudo apt install mongodb-org
```
## ASP.Net + .Net Core Framework
ASP.Net + .Net core bạn cài đặt version mà ứng dụng bạn chạy. Tham khảo "https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu"
## fail2ban
Fail2ban dễ dàng tải trên repositories mặc định của Ubuntu. Nó có thể install bằng apt packaging system.
```
sudo apt update
sudo apt install fail2ban
```
# Cài đặt firewall:
##  Cài đặt UWF:
Chắc các bạn thường dùng Ubuntu thì không lạ gì với UFW (Uncomplicated Firewall)   tham khảo "https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands" 
> UFW, or Uncomplicated Firewall, is an interface to `iptables` that is geared towards simplifying the process of configuring a firewall. While `iptables` is a solid and flexible tool, it can be difficult for beginners to learn how to use it to properly configure a firewall.<

Đầu tiền mình sẽ kiểm tra để chắc chắn IPv6 đã bật. Để chắc chắn rằng các thay đổi sẽ áp dụng cho cả IPv4 và IPv6.
```
sudo nano /etc/default/ufw
```
```
IPV6=yes
```
Mình sẽ cài đặt mặc định là UFW là deny cho incoming và allow cho outgoing. 
```
sudo ufw default deny incoming
sudo ufw default allow outgoing
```
Tiếp theo mình sẽ mở một số Port thường dùng và sẽ dùng cho bài này.
Đầu tiên mình sẽ mở port OpenSSH và port ssh (lưu ý các bạn nên đổi port ssh mặc định nó sẽ phần nào làm khó các hacker và các hacker sẽ tốn thêm thời gian cho việc tấn công server, mình sẽ hướng dẫn sau). 

Đầu tiên mình sẽ list cách phần mềm có Port mở.
```
sudo ufw app list
```
```
Output
Available applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
```
Để mở port cho incomming cho phần mềm mình sẽ chạy lệnh:
```
sudo ufw allow OpenSSH
sudo ufw allow Nginx HTTP
sudo ufw allow Nginx HTTPS
```
Mở port ssh bẳng tên service:
```
sudo ufw allow ssh
```
Mở port ssh bằng port number, mặc định port 22.
```
sudo ufw allow 22
```

Mình sẽ ghi lại log của ufw, mặc định sẽ lưu log ở `/var/log/ufw*`
```
sudo ufw logging on
```
Đừng quên bật UFW:
```
sudo ufw enable
```
Kiểm tra status của UFW:
```
sudo ufw status
```
```
Output
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Nginx HTTP                 ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
```
## Thay đổi port ssh:
Thay đổi Port ssh là điều nên làm cho server của bạn, nó sẽ làm hacker tốn thời gian hơn trong việc tấn công server bạn cũng như cho bạn thời gian để phát hiện và xữ lý việc server bị tấn công. Tham khảo "https://linuxconfig.org/how-to-change-ssh-port-on-linux"
Đầu tiên mình sẽ sửa đổi  configuration file:
```
sudo nano /etc/ssh/sshd_config
```
Tìm dòng `#Port 22 ` chúng ta sẽ thay đổi dòng ghi chú này và thay đổi thành số mong muốn ví dụng port 2222. 
```
From:
#Port 22

To:
Port 2222
```
Lưu thay đổi và reload sshd:
```
sudo systemctl reload sshd
```
Chúng ta đổi UFW cho port ssh đã đổi:
```
sudo ufw allow 2222/tcp
```
Và đóng port 22 mặc định
```
sudo ufw deny 22
```
## Cài đặt cho Fai2ban:
Fai2ban là service thường được dùng kết hợp UFW để nâng độ an toàn cho server, chống lại các cuộc tấn công của hacker. Fail2ban dễ dàng thêm các rule và các thay đổi linh động.
Ở bài viết này mình sẽ setup Fail2ban cho cả sshd, scan port, nginx secure.

Tham khảo: "https://www.linuxcapable.com/how-to-secure-nginx-with-custom-fail2ban-filters/"

Tham khảo: "https://linuxize.com/post/install-configure-fail2ban-on-ubuntu-20-04/"

Cài đặt Fail2ban mặc định đi kèm với hai tệp cấu hình, /etc/fail2ban/jail.conf và /etc/fail2ban/jail.d/defaults-debian.conf. Bạn không nên sửa đổi các tệp này vì chúng có thể bị ghi đè khi gói được cập nhật.

Fail2ban đọc các tệp cấu hình theo thứ tự mỗi tệp .local sẽ ghi đè cài đặt từ tệp .conf. Đối với hầu hết người dùng, cách dễ nhất để định cấu hình Fail2ban là sao chép jail.conf vào jail.local và sửa đổi tệp .local. Người dùng nâng cao hơn có thể tạo tệp cấu hình .local từ đầu. Tệp .local không phải bao gồm tất cả các cài đặt từ tệp .conf tương ứng, chỉ những cài đặt bạn muốn ghi đè.
Tạo file jail.local 
```
sudo cp /etc/fail2ban/jail.{conf,local}
```
Sửa đổi file jail.local:
```
sudo nano /etc/fail2ban/jail.local
```

Đầu tiên mình sẽ thêm  Whitelist IP Addresses. Tim dòng ignoreip và thay đổi dòng ghi chú này bằng danh sách IP bạn muốn Whitelist như IP local, IP bạn thường SSH vào server.
```
ignoreip = 127.0.0.1/8 ::1 123.123.123.123 192.168.1.0/24
```
Bật cho sshd, Tìm dòng `[sshd]` và thay đổi, lưu ý có nhiều mode sshd cho bạn chọn (normal (default), ddos, extra or aggressive (combines all).) 
```
[sshd]
enabled = true
#mode   = aggressive
port    = ssh
logpath = %(sshd_log)s
backend = %(sshd_backend)s
action = iptables-multiport
banaction = %(banaction_allports)s
maxretry = 3
findtime = 86400
bantime = 86400
```
Bật cho port scan block 
```
[portscan-block]
 enabled = true
 action = iptables-allports
 filter = portscan-block
 logpath = /var/log/ufw.log
banaction = %(banaction_allports)s
 bantime = 1440m # 1 day
 findtime = 1440m # 1 day
  maxretry = 5
```
Bật cho nignx secure mặc định Fail2ban sẽ có các fillter `[nginx-botsearch] [nginx-limit-req] [nginx-http-auth] [nginx-bad-request]` bạn có thể bật những fillter cần thiết , tìm và thêm các dòng bên dưới:
```
enabled = true
action = iptables-allports
 bantime = 1440m # 1 day
 findtime = 1440m # 1 day
 maxretry = 5
```
Restart fail2ban để áp dụng thay đổi:
```
sudo systemctl restart fail2ban
```
Tiếp đó mình kiểm tra các fillter hoạt động:
```
sudo fail2ban-client status nginx-noscripts
```
Example output:
```
Status for the jail: nginx-noscripts
 |- Filter
 | |- Currently failed: 0
 | |- Total failed: 0
 | - File list: /var/log/nginx/access.log - Actions
 |- Currently banned: 95
 |- Total banned: 107
 `- Banned IP list:
```
# Tổng kết:
Bài viết này mình đã hướng dẫn các bạn cài đặt môi trường và setup cơ bản để bảo vệ server an toàn hơn. Nếu có thắc mắc hoặc câu hỏi cần sự giúp đỡ thì đừng ngần ngại comment. 
Cảm ơn các bạn đã theo dõi, ở phần tiếp theo mình sẽ hướng dẫn setup nginx cũng như một số mẹo mà mình biết.

Phần 1 - Cài đặt môi trường và firewall 

Phần 2 - hướng dẫn setup nginx .

Phần 3 - Host web với ASP.Net, .Net Core và MongoDB 

Phần 4 - Cấu hình HTTPS bằng self-certification hoặc Let's Encrypt.

Một phút quảng cáo, mình đang dùng VPS trên digitalocean.com. Đang có chương trình tặng 100$ cho account sử dụng trong 60 ngày, hãy đăng kí sử dụng và dùng invite link này "https://m.do.co/c/666bcca701f7"  để ủng hộ mình.