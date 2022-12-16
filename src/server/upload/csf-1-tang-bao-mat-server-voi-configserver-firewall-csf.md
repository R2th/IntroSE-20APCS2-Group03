# 1. Khái niệm CSF:
CSF (ConfigServer & Firewall) là một bộ ứng dụng hoạt động trên Linux như một firewall được phát hành miễn phí để tăng tính bảo mật cho server (VPS & Dedicated). CSF hoạt động dựa trên iptables và tiến trình ldf để scan các file log phát hiện các dấu hiệu tấn công bất thường.

![image.png](https://images.viblo.asia/c5a67a22-56e6-477d-9147-de2c9c3a4991.png)<div align="center"></div>

CSF sẽ giúp server của bạn:
* Chống DoS
* Chống Scan Port
* Chống BruteFore Attack vào ftp server, web server, mail server, directadmin, cPanel ...
    * Chống Syn Flood
    * Chống Ping Flood
    * Cho phép ngăn chặn truy cập từ 1 quốc gia nào đó bằng chỉ định Country Code chuẩn IOS
    * Hỗ trợ IPv6
    * Cho phép bạn chuyển hướng yêu cầu từ các IP bị khóa sang 1 file html để thông báo cho người dùng biết IP của họ bị khóa.
    * Phát hiện đăng nhập trái phép của các dịch vụ SSH, SMTP ....
    * Và rất nhiều tính năng khác, bạn có thể tự tìm hiểu [ở đây] http://www.configserver.com/cp/csf.html

![image.png](https://images.viblo.asia/7aa095ae-08d1-4b2c-b195-61a540fb9063.png)<div align="center"></div>

CSF có thể được tích hợp vào các giao diện người dùng (UI) của WHM/cPanel, DirectAdmin, Webmin (Mình sẽ viết ở một bài viết khác)

# 2. Cài đặt và cấu hình CSF trên Centos7

Bước 1: Yum các package thư viện && tải file cài đặt
```
yum install wget perl-libwww-perl.noarch perl-Time-HiRes -y

cd /usr/src/
wget https://download.configserver.com/csf.tgz
tar -xzf csf.tgz
cd csf
sh install.sh
```

Note: Vì CSF dựa trên Perl, nên ta cần cài đặt thư viện Perl lên máy chủ trước.

Bước 2: Kiểm tra CSF có hoạt động không
```
cd /usr/local/csf/bin/
perl csftest.p
```

Nếu bạn nhận được thông báo như dưới có nghĩa là CSF hoạt động mà không gặp vấn đề nào cả.
```
RESULT: csf should function on this server
```

Bước 3: Cấu hình CSF trên Centos 7
Trước khi bước vào cấu hình CSF trên Centos 7, bạn phải biết hệ điều hành Centos 7 có một ứng dụng tường lửa mặc định firewalld. Bạn phải dừng firewalld và xóa nó khỏi khởi động theo hệ điều hành
```
systemctl stop firewalld
systemctl disable firewalld
```

Sau đó chỉnh sửa tệp /etc/csf/csf.conf
```
cd /etc/csf/
vi csf.conf
```

Các bạn cần chỉnh sửa cấu hình TESTING từ 1 sang 0, sau đó chuyển đến dòng 139 và kiểm tra mục TCP_IN xem đã có port SSH của bạn chưa, mặc định khi cài CSF thì port SSH tự động được mở, kể cả bạn đã đổi port.
```
TESTING = "0"
```

Các bạn cấu hình TCP_IN, TCP_OUT, UDP_IN và UDP_OUT cho các port phù hợp với nhu cầu.
```
# Allow incoming TCP ports
TCP_IN = "20,21,22,25,53,80,110,143,443,465,587,993,995"

# Allow outgoing TCP ports
TCP_OUT = "20,21,22,25,53,80,110,113,443"

# Allow incoming UDP ports
UDP_IN = "20,21,53"

# Allow outgoing UDP ports
# To allow outgoing traceroute add 33434:33523 to this list
UDP_OUT = "20,21,53,113,123"
```

Giờ khởi động lại CSF và LFD
```
systemctl start csf
systemctl start lfd
```

Kích hoạt dịch vụ csf và lfd được khởi động cùng Centos
```
systemctl enable csf
systemctl enable lfd
```

Bây giờ bạn có thể xem tất cả các rule của CSF với lệnh sau
```
csf -l
```

Như vậy chúng ta đã hoàn tất việc cài đặt và cấu hình CSF trên Centos 7

# 3. Những file cấu hình CSF
* csf.conf: File cấu hình chính để quản lý CSF
* csf.allow: Danh sách địa chỉ IP cho phép qua firewall
* csf.deny: Danh sách địa chỉ IP từ chối qua firewall
* csf.ignore: Danh sách địa chỉ IP cho phép qua firewall và không bị block nếu có vấn đề

# 4. Một số lệnh thường dùng

| Lệnh | Tác dụng | 
| -------- | -------- |
| csf -s | Chạy firewall |
| csf -f | Dừng - Flush firewall |
| csf -r | Nạp lại CSF (nhất là sau khi thay đổi cấu hình, thiết lập) |
| csf -l | Hiện thị các luật iptables (IP4) |
| csf -p | Kiểm tra các port đang mở |
| csf --lfd | Với tham số [stop|start|restart|status] để điều khiện, chạy, dừng dịch vụ lfd. Dịch vụ này giám sát quá trình đăng nhập (kiểm tra xem nó có đang hoạt động csf --lfd status) |
| csf -a IPADDRESS | Cho phép một IP truy cập, nó thêm vào danh sách /etc/csf/csf.allow, các IP liệt kê trong danh sách này mặc định được qua Firewall, tuy nhiên nó vẫn bị LFD kiểm tra. Ví dụ thêm IP 123.123.123.123 vào thì gõ csf -a 123.123.123.123 |
| csf -d IPADDRESS | Cấm một IP truy cập, nó thêm vào danh sách /etc/csf/csf.deny, ví dụ csf -d 123.123.123.123 |
| csf -df IPADDRESS | Gỡ một IP ra khỏi danh sách chặn csf -df 123.123.123.123 |
| csf -t | Hiện thị danh sách ip cho phép và bị chặn tạm thời (ip tự ra khỏi danh sách sau một khoảng thời gian) |
| csf -ar IPADDRESS | Xóa địa chỉ IP đã được allow |
| csf -g IPADDRESS |Kiểm tra địa chỉ IP có bị block không |
| csf -x |Tắt CSF |
| csf -e |Mở CSF |