Hôm nay mình sẽ thực hiện một số thiết lập trên CSF

Mở file config để sửa đổi một số tính năng dưới
```
/etc/csf/csf.conf
```

# 1. Bảo vệ khỏi tấn công DoS bằng giới hạn số lượng truy cập tới cổng
```
Cấu hình tại CONNLIMIT="" với giá trị gán là "port1;limit1,port2,limit2 ..."
```

Ví dụ: CONNLIMIT = "22;5,80;20"
Có nghĩa là cổng 80 (http) cho phép 20 kết nối với 1 IP => Như vậy từ một máy tạo ra truy cấn liên tục tới server tạo ra quá 20 kết nối sẽ bị block, cổng 22 (ssh) là 5 kết nối 1 IP

# 2. Phòng chống Port Flood
Giám sát tổng số lượng kết nối từ một IP tới một cổng trong khoảng một thời gian chỉ ra với thiết lập PORTFLOOD. Giá trị gán vào có dạng
```
PORTFLOOD = "cổng;giao thức;tổng kết nối;khoảng thời gian, ..."
```

Ví dụ:  PORTFLOOD = "80;tcp;100;5"
Có nghĩa là 1 IP nào đó kết nối tới cổng 80 bằng giao thức tcp, trong vòng 5s mà tạo ra tới 100 kết nối thì bị block

# 3. Phòng chống SYN FLOOD
```
SYNFLOOD = "1"
SYNFLOOD_RATE = "75/s"
SYNFLOOD_BURST = "25"
```

Trong đó SYNFLOOD = "1" để kích hoạt SYN FLOOD
SYNFLOOD_RATE = "75/s" thiết lập số gói SYN gửi tới 1 IP/1s. SYNFLOOD_BURST Số lần mà một IP có thể chạm tới SYNFLOOD_RATE trước khi bị block.

# 4. Mở cổng, đóng cổng
```
#Các công mở cho phép nhận gói tin từ bên ngoài (IP4)
TCP_IN = "20,21,22,25,53,80"
#Các công mở cho phép gửi gói tin ra ngoài (IP4)
TCP_OUT = "443,20,21,22,25,80"
#Tương tự nếu có dùng IP6
TCP6_IN = "20,21,22,25"
TCP6_OUT = "20,21,22,25"
```

# 5. Thực thi một scripts
CSF mặc định có kiểm tra mức độ hoạt động của CPU xem nó có quá tải hay không, Nếu có sự kiện đó xảy ra thì CSF sẽ thực thi một scripts do chúng ta định nghĩa.
Giả sử bạn tạo ra một script để khởi động lại Apache, lưu tại /restartapache.sh, nhớ chmod cho nó chạy được chmod +x /restartapache.sh

Nội dung của script đó chỉ là lệnh khởi động lại Apache
```
#!/bin/sh
service httpd restart >> overload.log
```

Bây giờ muốn mỗi khi CPU quá tải sẽ chạy script /restartapache.sh thì sửa config:
```
#!/bin/sh
PT_LOAD_ACTION="/restartapache.sh"
```

# 6. Cấm tất cả các IP đến từ một quốc gia nào đó
```
CC_DENY = "RU,CN"
```

# 7. Block nếu đăng nhập các dịch vụ thất bại
```
#KÍCH HOẠT GIÁM SÁT LOGIN
LF_TRIGGER = "1"

#Block nếu đăng nhập ssh sai 3 lần
LF_SSHD = "3"
LF_SSHD_PERM = "1"

#Block nếu đăng nhập ftp sai 3 lần
LF_FTPD = "3"
LF_FTPD_PERM = "1"
```

# 8. Block danh sách IP Spam
CSF cung cấp khóa cả danh sách IP, bằng cách đưa URL của danh sách đó vào file /etc/csf/csf.blocklists. Bạn có thể mở file đó ra thêm các danh sách IP mà các dịch vụ phát hiện IP SPAM