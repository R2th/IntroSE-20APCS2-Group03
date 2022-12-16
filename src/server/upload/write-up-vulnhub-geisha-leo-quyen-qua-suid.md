![](https://images.viblo.asia/23c8ba23-8a00-4ee3-ba61-b80d892f7a61.png)

# Giới thiệu
Geisha là 1 machine về leo quyền trên Linux được thiết kế bởi SunCSR team, thông tin về machine các bạn có thể xem thêm tại [đây](https://www.vulnhub.com/entry/geisha-1,481/).

Sơ lược thì geisha là 1 lab khá cơ bản, so với bài Sumo lần trước mình làm thì bài này có thêm nhiều "lỗ thỏ" để đánh lừa và làm mình mất thời gian. Cũng như với bài Write up Sumo trước đó, bài viết này cũng sẽ được trình bày theo từng bước một, từ bước cơ bản nhất cho đến khi lên root.

# Cài đặt machine Geisha
Sau khi tải file OVF về chúng ta chỉ cần giải nén ra, sau đó mở bằng VMware: File > Open... (Ctrl + O) để tiến hành cài đặt machine.

**Lưu ý**: Geisha mặc định đang ở chế độ Bridge, trước khi chạy machine chúng ta cần chuyển sang chế độ NAT.

![](https://images.viblo.asia/35ca33a9-1ef1-4d64-b93f-030eaf03ed61.png)

# Lên root
## Tìm kiếm thông tin
### Scan IP của machine
Đầu tiên mình cần kiểm tra ip của máy ảo Kali bằng lệnh: ``` ip a ```

![](https://images.viblo.asia/c8c19877-2e24-4942-800a-8297ead2039b.png)

IP của Kali là ``` 192.168.96.128 ```, để tìm được ip của Geisha mình sẽ thực hiện quét các ip trong cùng dải mạng bằng lệnh **``` nmap -sn 192.168.96.0/24 ```**. Tham số **``` -sn ```** để không quét các cổng, tăng tốc quá trình quét tập trung vào việc tìm ip.

![](https://images.viblo.asia/a1e9eb4c-8ae8-4ca4-9b1d-44fb02edf11f.png)

Đã có ip của machine Geisha là ``` 192.168.96.129 ```.

### Scan các port và dịch vụ
Thường các bài lab, các machine có nhiều "lỗ thỏ" hoặc các bài ở mức độ khó vừa - cao sẽ mở rất nhiều cổng, chạy rất nhiều dịch vụ để làm nhiễu. Các machine này sẽ yêu cầu người làm phải nhạy bén, nhận biết sớm các đối tượng cần chú ý và chuyển sang hướng làm khác để không đi lạc quá sâu vào "hang thỏ".

Biết thế đã, trước khi tới lúc đấy chúng ta phải tìm ra các cái "lỗ thỏ" thì mới biết đường mà tính được. Lần này mình sử dụng thêm 1 vài tham số so với bài Sumo: **``` sudo nmap -sS -sV -O -Pn -p- 192.168.96.129 ```**.
- **-sS**: scan bằng giao tức TCP SYN
- **-sV**: scan tìm phiên bản của các dịch vụ chạy trên cổng
- **-O**: scan phiên bản OS
- **-Pn**: tránh việc bị chặn khi gặp tường lửa
- **-p-**: scan tất cả các port

![](https://images.viblo.asia/446ee77b-fbb4-4bdf-a616-20c4a7cc4d23.png)

Như kết quả trả về thì Geisha chạy dịch vụ web trên các cổng **80**, **7080**, **7125**, **8088** và **9198**,những cổng này khi truy cập đều hiển thị mỗi cái ảnh giống y hệt nhau.

### Scan các thư mục của dịch vụ web
Do việc truy cập trực tiếp dịch vụ web không thu nhặt được thông tin gì, mình tiếp tục thực hiện rà quét các thư mục, đường dẫn của mỗi dịch vụ. Mình sử dụng công cụ **dirsearch** để quét, lệnh sử dụng là **``` sudo python3 dirsearch.py -r -u {ip}:{port} -i 200-299,300-399 -e * ```**
- **-r**: tiếp tục scan sâu vào các thư mục tìm được
- **-u {ip}:{port}**: địa chỉ quét
- **-i 200-299,300-399**: chỉ hiển thị các kết quả trả về mã 2xx (thành công) và 3xx (chuyển hướng)
- **-e &ast;**: quét toàn bộ các phần mở rộng .php .html .aspx,...

**Kết quả quét cổng 80**
![](https://images.viblo.asia/da4a4751-7695-4039-a8a6-b30a41511448.png)

Nhưng mà...

![](https://images.viblo.asia/ff3b30fd-799a-4ca1-a299-694b0bbd0f53.jpg)

**Kết quả quét cổng 7080**
![](https://images.viblo.asia/f2e0366c-b8a4-4c37-b067-d642a5f1135d.png)

Nhưng mà đều 404 hết, nên là...

![](https://images.viblo.asia/ff3b30fd-799a-4ca1-a299-694b0bbd0f53.jpg)

**Kết quả quét cổng 7125**
![](https://images.viblo.asia/77f95a9d-0511-42c8-9ed8-2fa1ef31335c.png)

Trông có vẻ hay ho, nhưng cứ để tạm đấy đã, lát mình sẽ quay lại sau.

![](https://images.viblo.asia/41ad3e5e-fd7c-41fa-989b-f1273f644347.jpg)

**Kết quả quét cổng 8088**
![](https://images.viblo.asia/68983b41-b822-4188-8f94-49dfb1440c27.png)

Có khá nhiều kết quả ở đây, mình đã thử truy cập hết. Kết quả thật bất ngờ: chẳng có gì cả -_-

**Kết quả quét cổng 9198**
![](https://images.viblo.asia/cff25444-4b10-4ce1-abee-43aec9498028.png)

Tiếp tục là...

![](https://images.viblo.asia/ff3b30fd-799a-4ca1-a299-694b0bbd0f53.jpg)

## Kiểm tra cổng 7125
Xem lại kết quả quét thì có 3 đường dẫn cần kiểm tra là **/index.php**, **/index.php/login** và **/passwd**.

![](https://images.viblo.asia/77f95a9d-0511-42c8-9ed8-2fa1ef31335c.png)

Hai đường dẫn đầu thì không có gì đặc biệt, nhưng khi truy cập đường dẫn **/passwd**  sẽ tải được 1 file passwd.
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

## Brute Force SSH
Khi server bật dịch vụ SSH thì mình có thể thử Brute Force SSH để truy cập vào server. Tuy nhiên việc Brute yêu cầu cần có wordlist lớn và mạnh mới thực sự hiệu quả.

Ở machine này tác giả cho mình hẳn file **/etc/passwd** nên có thể thử Brute Force SSH được. Phân tích file passwd có thể thấy ngay **user geisha có uid=1000**. Thường thì khi cài Linux, user đầu tiên do chúng ta tạo sẽ có uid=1000, các user được tạo sau đó sẽ có uid tăng dần từ 1000. Như vậy có thể thử Brute Force SSH password của user geisha.

Nếu như có ai thắc mắc các user có thể brute được không thì đây là câu trả lời:
- Đa số các user trong file /etc/passwd là user được tạo ra khi cài đặt hệ điều hành, hoặc được tạo ra trong quá trình cài đặt 1 số dịch vụ. Các user này chỉ được hệ điều hành sử dụng để chạy các dịch vụ và không thể đăng nhập vào được.
Chú ý phần cuối cùng mỗi dòng trong file /etc/passwd, phần này chỉ ra shell mặc định của mỗi user được sử dụng sau khi đăng nhập. Với các user có shell chỉ định là ***/usr/sbin/nologin***, ***/usr/bin/true***, ***/usr/bin/false***,... sẽ không thể đăng nhập vào được. Thông tin thêm đọc tại [đây](https://unix.stackexchange.com/questions/10852/whats-the-difference-between-sbin-nologin-and-bin-false).
- Ngoài các user đặc biệt kia thì user root cũng không nên thử khi Brute Force SSH. Lí do là mặc định dịch vụ SSH sẽ không cho phép sử dụng mật khẩu khi SSH vào bằng user root, nên chưa nói đến độ khó thì việc Brute password của user root cũng chưa có tác dụng gì nhiều.

Search qua qua thì mình tìm được hướng dẫn Brute Force SSH khá đơn giản trên [hacknos](https://www.hacknos.com/ssh-brute-force-password/). Tất cả việc mình cần làm là chạy lệnh **``` hydra -l geisha -P /usr/share/wordlists/rockyou.txt ssh://192.168.96.129 ```** và ngồi đợi. Sau thời gian pha 1 cốc cafe thì công cụ Hydra đã brute xong.

![](https://images.viblo.asia/76b62069-bbe5-48f3-a613-46b9aaacb9c4.png)

OK, đã có user name là **geisha** và password là **letmein**, giờ thì SSH vào thôi.

![](https://images.viblo.asia/a5eebeb0-92c8-48f7-bb55-3e3a461bbe60.png)

## Tìm đường lên root
### Thử Kernel exploit
Sau khi kiểm tra thấy machine đang chạy kernel bản 4.19 mình search ngay xem có cách nào exploit được không. Mình dễ dàng tìm được [PoC](https://github.com/bcoles/kernel-exploits/blob/master/CVE-2019-13272/poc.c) của [CVE-2019-13272](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13272) cho phép lên quyền root.

![](https://images.viblo.asia/46f45d11-8806-4db8-8188-6e79ab81da7f.png)

Tiếc là mình chưa thử được xem mã trên có hoạt động với bản kernel này hay không. Vì machine không cài gcc, user geisha thì không có quyền sudo, và file /etc/sudoers cũng không sửa được luôn. Vậy là đường Kernel exploit cụt.

![](https://images.viblo.asia/42958ba3-9fed-4985-b227-dae596a0eec7.png)

![](https://images.viblo.asia/616bbcb1-0f3d-4712-9c83-d8d2a1b468d5.jpg)

### Leo quyền nhờ SUID
#### Lý thuyết
Leo quyền qua SUID là một trong những hướng dễ tiếp cận. Ý tưởng cơ bản là tìm các file thỏa mãn 2 điều kiện:
- File đó thuộc sở hữu của user root
- File đó được gắn SUID
- Mình được quyền thực thi file đó

Khi 1 file thỏa mãn các điều kiện trên thì bất kỳ user nào chạy file này đều sẽ tương đương với việc user root chạy file. Nói đơn giản thì coi như chúng ta có quyền root (với cái file đó thôi :v).

Ví dụ khi kiểm tra file **flag** bằng lệnh **ls -la** được output sau:
```
-rw-r----- 1 root root 4 Dec 27 23:19 flag
```
![](https://images.viblo.asia/43092a71-14ec-4b41-b3ba-6828174e1d74.png)

Khi đó chỉ user root mới có quyền đọc file **flag**. Nếu lúc này kiểm tra file **/usr/bin/nl** bằng lệnh **ls -la** được kết quả:
```
-rwsr-xr-x 1 root root 113696 Sep 24 04:36 /usr/bin/nl
```
![](https://images.viblo.asia/5aa26bec-216f-46e7-89b5-bab5c9f32d53.png)

Thì user thường sẽ chạy được lệnh **nl** với quyền root, và có thể đọc file flag.

![](https://images.viblo.asia/c9a5ce9d-5d3a-4cc4-9358-1881d7bbe38e.png)

#### Áp dụng vào machine Geisha
Đầu tiên, ta thực hiện tìm kiếm các file được chạy với quyền root bằng lệnh **``` find / -perm -u=s -type f 2>/dev/null ```**.

![](https://images.viblo.asia/503c1e96-a7b3-4f5e-a6e0-9a732db28d07.png)

Các file trong **/usr/bin/** là các lệnh được chạy với quyền root:
- **mount** và **umount** là lệnh làm việc với các ổ đĩa
- **newgrp** và **gpasswd** là lệnh làm việc với nhóm. Mình đã nghĩ tới việc sử dụng lệnh **newgrp** để chuyển user geisha sang group root, tuy nhiên không thành công. Do newgrp chỉ chuyển được dễ dàng khi 1 user đã có sẵn trong nhiều group, lúc này có thể chuyển giữa các group với nhau.  
Lệnh newgrp cũng có thể thêm user vào group, nhưng nếu group đó đã được ***group administrator*** đặt mật khẩu bằng lệnh **gpasswd** thì phải cung cấp mật khẩu mới có thể thêm vào group đó được.

![](https://images.viblo.asia/d3ba1a78-b339-42d9-970b-e780007e2f25.png)

- **sudo**, **su** và **passwd** thì quá quen thuộc rồi, 3 lệnh này không giúp mình lên root được.
- **chsh** và **chfn** lần lượt là lệnh thay đổi login shell và thông tin user, không làm được gì ở đây.
- **base32** có thể encode file hoặc input từ stdin, cũng có thể decode base32.

Khi tìm kiếm trên [gtfobins](https://gtfobins.github.io/) cũng thấy có thể dùng lệnh base32 để tiến hành leo quyền. Trong trường hợp **/usr/bin/base32** có gắn suid thì có thể vượt quyền, đọc các file không được quyền truy cập.

![](https://images.viblo.asia/e2912fc5-e01e-4830-926c-f9839cd03650.png)

Chi tiết xem tại [base32 | GTFOBins](https://gtfobins.github.io/gtfobins/base32/)

### Đọc SSH private key
Với SUID được gắn cho lệnh base32 thì mình có thể đọc được rất nhiều file, tuy nhiên để đọc được luôn flag thì mình phải biết flag lưu ở đâu. Cách này thì khá hên xui, dựa vào kinh nghiệm guessing thì mình cũng may mắn đoán được 1 trong 4 cái tên:
- /root/root
- /root/root.txt
- /root/flag
- /root/flag.txt

Tuy nhiên cách này không chắc chắn lắm, nên mình muốn tìm 1 cách khác chính thống hơn. Nghĩ về việc đọc được các file quan trọng trên Server Linux thì mình có 2 ý tưởng:
- Đọc **/etc/shadow** và crack password của user root => **su root**
- Đọc được **SSH private key** của user root => **ssh -i {private-key-file} root@{ip}**

Sau khi đọc /etc/shadow thì mình dập tắt luôn ý tưởng đi tiếp:
```
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
Thấy trường password của user root bắt đầu với **\$6$** là mình thấy hướng này không có tương lai rồi. Bởi vì đó là dấu hiệu cho thấy password được hash với **SHA-512** cơ. Nếu là **\$1$** - **MD5** thì may ra có khả năng crack được, SHA-512 thì chịu hẳn.

Như vậy thì chỉ còn 1 hướng đó là đọc SSH private key thôi. Private key của user root nằm tại **/root/.ssh/id_rsa**. Theo như hướng dẫn trên GTFOBins thì có thể đọc được bằng lệnh **``` base32 "/root/.ssh/id_rsa.pub" | base32 --decode ```**

![](https://images.viblo.asia/e5d31c2b-8d65-49f2-803e-df2203322f44.png)

Giờ chỉ cần SSH vào machine bằng user root với private key đã lấy được bằng lệnh: **``` ssh -i privkey root@192.168.96.129 ```**  
**Lưu ý**: private key phải đặt quyền 600 mới sử dụng được.

![](https://images.viblo.asia/57db8b3d-e483-4333-99d7-ca3dcb8b6233.png)

ROOTED!!!