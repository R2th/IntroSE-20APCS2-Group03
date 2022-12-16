# Cài đặt GitLab Server trên CentOs 7
*Xin chào mọi người,  nhân 1 ngày đẹp trời mình đi onsite, khách hàng yêu cầu mình dựng GitLab trên server của họ nên nhân tiện mình viết 1 bài để hướng dẫn mọi người cách dựng server GitLab CE trên hệ điều hành CentOs 7 nhé. Một phần để chia sẻ với mọi người 1 số lỗi mình gặp phải, phần nữa để sau này có quên thì mình cũng có cái để xem lại hihi.Chắc chẳng cần giới thiệu nhiều bởi vì ông dev nào cũng biết Git là gì rồi nên mình sẽ vào việc luôn nhé.Mình sẽ dùng GitLab CE vì nó là mã nguồn open source, bạn tự host dịch vụ GitLab Git Server riêng; nhận được sự hỗ trợ từ cộng đồng và forum.  Nào, bây giờ mình bắt đầu nhé.*

# 1. Trước tiên bạn cần cài đặt một số chương trình hỗ trợ cho **GitLab** trên CentOS 7:

> yum install -y curl policycoreutils-python postfix ca-certificates

# 2. Cài đặt GitLab CE Repository vào server qua Repository:
```
curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
```
Tiếp theo chạy lệnh sau để cài đặt **GitLab CE**:
```
yum -y install gitlab-ce
```
Kết quả trả về sẽ tương tự như sau:
```
Thank you for installing GitLab!
GitLab was unable to detect a valid hostname for your instance.
Please configure a URL for your GitLab instance by setting `external_url`
configuration in /etc/gitlab/gitlab.rb file.
Then, you can start your GitLab instance by running the following command:
sudo gitlab-ctl reconfigure

For a comprehensive list of configuration options please see the Omnibus GitLab readme
https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/README.md

Verifying : gitlab-ce-11.9.4-ce.0.el7.x86_64 1/1

Installed:
gitlab-ce.x86_64 0:11.9.4-ce.0.el7
```

Ok xong rồi, giờ chúng ta sẽ dùng [gitlab-clt](https://docs.gitlab.com/omnibus/maintenance/index.html) để quản lý service:
- Khởi động GitLab:
```
gitlab-ctl start
```

- Kiểm tra trạng thái:
```
gitlab-ctl status
```
- Dừng :
```
gitlab-ctl stop
```
- Khởi động lại:
```
gitlab-ctl restart
```

### Lưu ý:
- Gitlab Omnibus bao gồm nhiều gói package bên trong như: Nginx, Postgresql, Redis, Sidekiq, Unicorn, .. nên dung lượng khá nặng.
- Nếu trên server đang sử dụng Nginx làm web server thì có thể bị trùng cổng. Chúng ta có thể disable gói Nginx trong Gitlab Omnibus đi để dùng Nginx có sẵn.
 # 3. Cấu hình cho GitLab
 Sau khi cài đặt xong sẽ có 1 file cấu hình được lưu tại đường dẫn etc/gitlab/ tên là `gitlab.rb`. Chúng ta sẽ chỉnh sửa tất cả các cấu hình của **GitLab** tại file này. Và đầu tiên là sẽ cấu hình URL cho nó. Nếu bạn đã có tên miền riêng thì sẽ điền tên miền của bạn vào. Nếu chưa thì điền địa chỉ IP của server vào nhé ( Ví dụ IP server mình là 10.10.10.85):
 ```
 # vi /etc/gitlab/gitlab.rb
external_url 'http://10.10.10.85/'
 ```
 Nếu bạn muốn thêm chứng chỉ SSL vào tên miền thì thêm như này: `external_url 'https://10.10.10.85/'` và làm theo cách cấu hình SSL dưới đây.
 
Hiện tại **GitLab** có hỗ trợ tích hợp chứng chỉ SSL miễn phí **Let's Encrypt** nhưng trong trường hợp hệ thống của bạn nằm trong hệ thống mạng private và cũng không tiện renew Let’s certificate mỗi 3 tháng thì chúng ta tạm xài chứng chỉ SSL tự phát hành nhé.

Cấu hình dưới cũng giúp bạn tự cấu hình các chứng chỉ SSL đã mua cho tên miền hệ thống.
```
openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out gitlabce.crt -keyout gitlabce.key
...........
Country Name (2 letter code) [XX]:VN
State or Province Name (full name) []:HCM
Locality Name (eg, city) [Default City]:HCM
Organization Name (eg, company) [Default Company Ltd]:CQ
Organizational Unit Name (eg, section) []:CQ
Common Name (eg, your name or your server's hostname) []:*tên domain của bạn*
```

Tạo thư mục chứa chứng chỉ SSL tự phát hành:
```
# mkdir -p /etc/gitlab/ssl/
# mv gitlabce.crt gitlabce.key /etc/gitlab/ssl/
```
Khởi tạo thêm chứng chỉ DHPARAM .
```
# openssl dhparam -out /etc/gitlab/ssl/dhparams.pem 2048
```
Phân lại quyền cho các file chứng chỉ SSL:
```
# chmod 600 /etc/gitlab/ssl/*
# ll /etc/gitlab/ssl
total 12
-rw------- 1 root root 424 Apr 4 16:52 dhparams.pem
-rw------- 1 root root 2000 Apr 4 16:48 gitlabce.crt
-rw------- 1 root root 3272 Apr 4 16:48 gitlabce.key
```

Cấu hình để dịch vụ Nginx của GitLab nhận chứng chỉ SSL tự phát.

```
# vi /etc/gitlab/gitlab.rb
..
nginx['redirect_http_to_https'] = true
nginx['ssl_certificate'] = "/etc/gitlab/ssl/gitlabce.crt"
nginx['ssl_certificate_key'] = "/etc/gitlab/ssl/gitlabce.key"
nginx['ssl_dhparam'] = "/etc/gitlab/ssl/dhparams.pem"
nginx['ssl_protocols'] = "TLSv1.1 TLSv1.2"
nginx['ssl_ciphers'] = "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK"
nginx['ssl_prefer_server_ciphers'] = "on"
```

Sau khi chỉnh sửa xong các bạn lưu file lại và chạy lệnh `gitlab-ctl reconfigure` để **GitLab** tải lại cấu hình mới vừa thay đổi.

# 4. Cấu hình firewall
Kiểm tra xem server bạn có firewall chưa? Nếu chửa thì cài đặt nó vào 
```
yum -y install firewalld
```
Tải xong thì bật nó lên, mình sẽ config n khởi động cùng hệ thống bằng cách start và enable nó lên:
```
systemctl start firewalld
systemctl enable firewalld
```
Tiếp theo, mở cổng để sử dụng các service của máy chủ. Nếu bạn chưa thêm SSL thì bạn cần mở cổng 25, còn có SSL thì bạn mở cổng 80 và 443 nhé:
```
# firewall-cmd --permanent --add-service ssh
# firewall-cmd --permanent --add-service http
# firewall-cmd --permanent --add-service https
# iptables -I INPUT -p tcp --dport 80 -j ACCEPT
# iptables -I INPUT -p tcp --dport 25 -j ACCEPT
# iptables -I INPUT -p tcp --dport 443 -j ACCEPT
```
Rồi reload lại firewall:
```
firewall-cmd --reload
```

Done, đã hoàn thành cấu hình firewall.
# 5. Truy cập trang quản trị GitLab
Sau khi xong xuôi các bước bên trên, giờ chúng ta sẽ vào trang quản trị để đổi mật khẩu tài khoản root. Truy cập đường link mà bạn vừa cấu hình bên trên trong phần `external_url` và đổi mật khẩu root:
![](https://images.viblo.asia/c9ca63aa-c9f5-4a75-91ff-6cbb7f409bd5.png)

# 6. Một số điều biết thêm
- Theo mình tìm hiểu thì **GitLab** Chỉ Dùng database là PostgreSQL nên bạn có thể tham khảo thêm tại [đây](https://docs.gitlab.com/omnibus/settings/database.html).
- Một chức năng quan trọng nữa khi dùng **GitLab** để quản lý mã nguồn đó chính là Email Notification. Ví dụ bạn tạo mới 1 user hay tạo merge request hay bất cứ thứ gì trên đó, thì mọi thông báo đều cần gửi về các bên liên quan, bạn có thể config nó theo hướng dẫn tại [đây](https://docs.gitlab.com/omnibus/settings/smtp.html) nhé. Nếu có lỗi khi config thì có thể comment bến dưới.

Đấy đến đây chắc chẳng cần mình hướng dẫn nữa đâu nhỉ, nhảy vào trải nghiệm thôi. Vậy là chúng ta đã cài đặt xong **GitLab CE** để quản lý source code của team rồi. Cảm ơn đã đọc bài viết của mình, nếu có thắc mắc hoặc gặp lỗi gì thì có thể comment bên dưới để chúng ta trao đổi nhé. Thank you so much!!!