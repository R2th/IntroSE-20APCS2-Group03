Hiện nay do nhu cầu pentest tăng cao, số lượng tool được viết ra để phục vụ mục đích nghiên cứu ngày càng nhiều.

Với kĩ thuật MITM, khi một hacker thực hiện thành công MITM trên một mạng máy tính, hacker này có thể dễ dàng thực hiện lại việc này trên nhiều mạng máy tính khác nhau.

Kết quả từ mỗi cuộc tấn công mạng mang lại đôi khi gồm khá nhiều thứ hay ho, từ thông tin tài khoản, hội thoại, email và nhiều thông tin nhạy cảm khác. Trong bài viết này thì mình sẽ hướng dẫn tấn công MITM bằng công cụ Ettercap có sẵn trên Kali Linux

MITM là gì ?
------------

![](https://anonymousvn.org/wp-content/uploads/2019/05/MITM-l%C3%A0-g%C3%AC.jpg)

Tấn côngMITM là kĩ thuật mà hacker đặt mình vào giữa một người dùng khác ( victim) và một ứng dụng ( application). Có thể là xen vào giữa cuộc điện thoại hoặc xen vào giữa cuộc chat, và mọi thứ không có gì thay đổi khiến người dùng không thể nhận ra là có người đang xen vào giữa. Mục tiêu của hacker thường là người dùng các trang thương mại điện tử, ngân hàng,..

### Ettercap là gì?

Ettercap là một công cụ chuyên nghiệp có thể giúp bạn giả mạo các kết nối, giả mạo DNS,..Ettercap giúp bạn trung gian giữa các cuộc tấn công trong mạng LAN. Nó có tính năng đánh hơi các các kết nối trực tiếp, lọc nội dung chuyển trên mạng và nhiều thủ thuật thú vị khác. . sự tìm tòi, nghiên cứu và thử nghiệm một số công cụ phần mềm hỗ trợ

**Chú ý : Đây là bài hướng dẫn pentest, bạn sẽ phải chịu trách nhiệm với những gì bạn làm !**

### 1\. Enable Packet Forwarding In Kali Linux

Để bắt đầu thực hành, bạn hãy mở Kali lên và login ( nên login với quyền root). Tài khoản mặc định của Kali là **root** và mật khẩu là **toor**

Chúng ta cần forward toàn bộ các gói tin IPV4 vì hệ thống mục tiêu cần đảm bảo kết nối liên tục khi chúng ta tấn công ARP poisoning.

![](https://anonymousvn.org/wp-content/uploads/2019/05/forward-ipv4-kali-linux.png)

forward kali linux ipv4

Để làm được điều này, bạn mở terminal lên và gõ

```
systctl -w net.ipv4.ip_forward=1
```

Hoặc

```
echo 1 > /proc/sys/net/ipv4/ip_forward
```

2\. Chỉnh sửa file config Ettercap
----------------------------------

Để sử dụng Ettercap thì bạn cần sửa file config bằng lệnh sau

![](https://anonymousvn.org/wp-content/uploads/2019/05/edit-ettercap-config-file.png)

Khi mở file lên thành công, bạn cần chú ý tới hai dòng sau phần "**[privs]**"

![](https://anonymousvn.org/wp-content/uploads/2019/05/ettercap-config-file.png)

Bạn hãy sửa hai số **65534** về thành số **0**

Tiếp theo đó bạn bấm tìm kiếm và tìm với cụm từ **iptables**

![](https://anonymousvn.org/wp-content/uploads/2019/05/find-iptables.png)

![](https://anonymousvn.org/wp-content/uploads/2019/05/result-iptables-find.png)

Sau khi tìm, bạn cần bỏ comment hai dòng "**#redir_command_on**" và "**#redir_command_off**"

Sau đó lưu lại và thoát file config của Ettercap.

Khởi động Ettercap-gtk
----------------------

Để mở Ettercap với giao diện đồ họa, bạn mở terminal và gõ lệnh

**ettercap -G**

Đi tới thanh công cụ, chọn **Sniff** và chọn **Unified Sniffing**

![](https://anonymousvn.org/wp-content/uploads/2019/05/unified-sniffing.png)

Một popup hiện lên yêu cầu bạn chọn interface, bạn hãy chọn interface mà đang kết nối với mạng bạn cần test. Trong bài viết này mình sử dụng **"eth0"**. Lựa chọn của bạn có thể khác.

Bắt đầu tìm kiếm hosts
----------------------

![](https://anonymousvn.org/wp-content/uploads/2019/05/start-unified-scanning.png)

Ở trong phần log ở cuối chương trình bạn có thể thấy Ettercap đã khởi động attack mode : "**Starting Unified Sniffing**".

![](https://anonymousvn.org/wp-content/uploads/2019/05/scan-hosts.png)

Bấm vào **Hosts > Scan For Hosts** để quét các hosts đang nằm trong mạng. Một số thông báo sẽ hiện ra ví dụ

"**Randomizing # hosts for scanning**"

"**Scanning the whole netmask for # hosts**"

"**# hosts added to the host list**"

Thêm IP của router và IP của target system vào Ettercap
-------------------------------------------------------

Mở thanh toolbar lên, click "**Hosts**", và chọn "**Hosts list**". Sau đó chọn IP và bấm **Add to target 1**. Tương tự **Add to target 2**

![](https://anonymousvn.org/wp-content/uploads/2019/05/add-to-target-ettercap.png)

Bắt đầu tấn công ARP Poisoning
------------------------------

Bạn bấm chọn **MITM > ARP Poisoning**

![](https://anonymousvn.org/wp-content/uploads/2019/05/start-ARP-Poisoning.png)

**MITM Attack: ARP Poisoning**

![](https://anonymousvn.org/wp-content/uploads/2019/05/sniff-remote-connection.png)

**Sniff remote connections**

Một box hiện lên, bạn tích vào **Sniff remote connections.**

Bắt đầu sniffing để Arp Poison target và router
-----------------------------------------------

![](https://anonymousvn.org/wp-content/uploads/2019/05/start-sniffing.png)

Đợi một chút để Ettercap tiến hành attack hệ thống.

Chúc bạn thành công <3

**Notes **: Để quay trở về trạng thái cũ và tắt ip forwarding thì bạn gõ lệnh sau :

**systctl -w net.ipv4.ip_forward=0**

Nguồn : https://anonymousvn.org/cach-thuc-hien-tan-cong-mitm-man-in-the-middle-attack-bang-ettercap.hav