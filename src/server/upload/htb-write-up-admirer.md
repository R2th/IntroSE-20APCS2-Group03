## 0. Mở đầu

Admirer là một machine linux mới ra từ 2/5/2020 (được 16 ngày). Machine có IP 10.10.10.187, được đánh giá ở mức Easy (làm xong thì không thấy thế).

![](https://images.viblo.asia/3fb9abeb-403e-454d-84fc-439545408ddf.png)

Về matrix rate, machine thiên về hướng có CVE, phải recon rất nhiều và được đánh giá giống những case ngoài đời thật.

![](https://images.viblo.asia/81514a22-5505-4b5c-9b30-da443b6e9f6b.png)

Tuy nhiên một lần nữa, làm xong thì đã rõ vì sao machine này **bị** rate rất thấp (chỉ 3,3/5 sao), những cú lừa rất lớn. Cùng đọc write-up để biết thêm chi tiết.

## 1. Write-up

### 1.1. User Flag
**Bài write-up được vừa làm vừa viết nên sẽ dài hơn các bài thông thường khác.**

Luôn là vậy, scan bằng Nmap:

`sudo nmap -v -sS -A -Pn -T5 -p- -oN nmap.txt 10.10.10.187`

Kết quả trả về chỉ có  3 port là 80,22,21 được mở, scan kỹ hơn các ports này, do Matrix-rate  hướng CVE cao nên thêm --script vào để xem có cái RCE nào không:

`sudo nmap -sS -sV --script=default,vuln -p 80,22,21 -T5 -oN nmap_final.txt 10.10.10.187`


Kết quả trả về:

```
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
|_sslv2-drown: 
22/tcp open  ssh     OpenSSH 7.4p1 Debian 10+deb9u7 (protocol 2.0)
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
| ssh-hostkey: 
|   2048 4a:71:e9:21:63:69:9d:cb:dd:84:02:1a:23:97:e1:b9 (RSA)
|   256 c5:95:b6:21:4d:46:a4:25:55:7a:87:3e:19:a8:e7:02 (ECDSA)
|_  256 d0:2d:dd:d0:5c:42:f8:7b:31:5a:be:57:c4:a9:a7:56 (ED25519)
80/tcp open  http    Apache httpd 2.4.25 ((Debian))
|_clamav-exec: ERROR: Script execution failed (use -d to debug)
| http-csrf: 
| Spidering limited to: maxdepth=3; maxpagecount=20; withinhost=10.10.10.187
|   Found the following possible CSRF vulnerabilities: 
|     
|     Path: http://10.10.10.187:80/
|     Form id: name
|_    Form action: #
|_http-dombased-xss: Couldn't find any DOM based XSS.
| http-enum: 
|_  /robots.txt: Robots file
| http-fileupload-exploiter: 
|   
|     Couldn't find a file-type field.
|   
|_    Couldn't find a file-type field.
| http-robots.txt: 1 disallowed entry 
|_/admin-dir
|_http-server-header: Apache/2.4.25 (Debian)
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
|_http-title: Admirer
|_http-vuln-cve2017-1001000: ERROR: Script execution failed (use -d to debug)
| vulners: 
|   cpe:/a:apache:http_server:2.4.25: 
|     	CVE-2017-7679	7.5	https://vulners.com/cve/CVE-2017-7679
|     	CVE-2017-7668	7.5	https://vulners.com/cve/CVE-2017-7668
|     	CVE-2017-3169	7.5	https://vulners.com/cve/CVE-2017-3169
|     	CVE-2017-3167	7.5	https://vulners.com/cve/CVE-2017-3167
|     	CVE-2019-0211	7.2	https://vulners.com/cve/CVE-2019-0211
|     	CVE-2018-1312	6.8	https://vulners.com/cve/CVE-2018-1312
|     	CVE-2017-15715	6.8	https://vulners.com/cve/CVE-2017-15715
|     	CVE-2019-10082	6.4	https://vulners.com/cve/CVE-2019-10082
|     	CVE-2017-9788	6.4	https://vulners.com/cve/CVE-2017-9788
|     	CVE-2019-0217	6.0	https://vulners.com/cve/CVE-2019-0217
|     	CVE-2020-1927	5.8	https://vulners.com/cve/CVE-2020-1927
|     	CVE-2019-10098	5.8	https://vulners.com/cve/CVE-2019-10098
|     	CVE-2020-1934	5.0	https://vulners.com/cve/CVE-2020-1934
|     	CVE-2019-10081	5.0	https://vulners.com/cve/CVE-2019-10081
|     	CVE-2019-0220	5.0	https://vulners.com/cve/CVE-2019-0220
|     	CVE-2019-0196	5.0	https://vulners.com/cve/CVE-2019-0196
|     	CVE-2018-17199	5.0	https://vulners.com/cve/CVE-2018-17199
|     	CVE-2018-1333	5.0	https://vulners.com/cve/CVE-2018-1333
|     	CVE-2017-9798	5.0	https://vulners.com/cve/CVE-2017-9798
|     	CVE-2017-7659	5.0	https://vulners.com/cve/CVE-2017-7659
|     	CVE-2017-15710	5.0	https://vulners.com/cve/CVE-2017-15710
|     	CVE-2019-0197	4.9	https://vulners.com/cve/CVE-2019-0197
|     	CVE-2019-10092	4.3	https://vulners.com/cve/CVE-2019-10092
|     	CVE-2018-11763	4.3	https://vulners.com/cve/CVE-2018-11763
|_    	CVE-2018-1283	3.5	https://vulners.com/cve/CVE-2018-1283
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 92.03 seconds

Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 92.03 seconds
```

Không kém phần long trọng đó là tìm các route trên machine:

`dirsearch -u http://10.10.10.187 -t 10 -e html,php,txt`

![](https://images.viblo.asia/bacfb4c1-36c7-4639-bb53-daf510ab5ce3.png)

Truy cập vào /robots.txt ta có được 1 path đáng ngờ  (cũng đã được nmap discover ở phía trên): **admin-dir**

![](https://images.viblo.asia/c4eea0ae-a572-4bf5-8be9-1fb708b46e8f.png)

Chắc chắn không phải tự nhiên path **admin-dir** lại Can lộ lộ thế này. Thiết kế lab thời nay cũng đã rất hạn chế việc phải brute-force credentials. Vậy tập trung vào **admin-dir** này trước. Một lần nữa sử dụng dirsearch, nhưng bất kể có dùng wordlist mặc định hay wordlist của Dirb đều không ra kết quả gì (mình cũng ko rõ vì đâu, errors log trống trơn):

`dirsearch -u http://10.10.10.187/admin-dir/ -t 10 -e html,php,txt`

`dirsearch -u http://10.10.10.187/admin-dir/ -t 10 -e html,php,txt -w common_dirb.txt `

![](https://images.viblo.asia/8679f867-a4b8-45cc-ade3-1e6d846829cc.png)


Nhưng gobuster thì có, để tìm hiểu Gobuster, các bạn có thể xem tại [đây](https://viblo.asia/p/do-tham-website-web-reconnaissance-tools-1-gobuster-ORNZq4DMK0n).

`gobuster dir -u 10.10.10.187/admin-dir/ -w common_dirb.txt -l -t 30 -e -x php,txt,html`

![](https://images.viblo.asia/e3cda1d6-6ffd-4f89-96be-8c7501ef22b8.png)

Chúng ta có contacts.txt:

![](https://images.viblo.asia/b739636d-5dfe-49a9-a00f-3d5aab9c7346.png)

Brute-force password ???

Sau khi bế tắc nhẹ thì vấn đề hóa ra nằm ở ... wordlist, dùng wordlist khác nằm chung với rockyou tại [đây](https://github.com/praetorian-code/Hob0Rules/tree/master/wordlists). Cụ thể là **english.txt** (làm biếng brute-force bằng rockyou nên tải cái này).

Chúng ta có credentials.txt (bổ sung ngay wordlist vào common):

![](https://images.viblo.asia/09283e24-33e0-4986-a16f-1a5029395a8e.png)

admin wordpress, game dễ?

Hí hửng vào "/index.php/login" thì cái kết là không thấy chỗ login (điền thông tin) đâu. Đành chuyển sang dùng port 21 với credentials ở trên:

![](https://images.viblo.asia/4d7acd33-8d02-4503-acf7-85cb479ecdc3.png)

Get files về, file thứ 2 nặng nên kéo về khá mất thời gian.

![](https://images.viblo.asia/62855094-ead6-4247-9f52-efc8c7eccef0.png)

Ở file html được kéo về, có những thông tin rất giá trị:

![](https://images.viblo.asia/90384ceb-4530-4564-988a-d871e8d4634f.png)

Tại **index.php** ta có thêm thông tin:

![](https://images.viblo.asia/226e1a92-fa4d-4b9f-8e3f-ef38127bd1eb.png)

Tại **utility-scripts/db_admin.php**:

![](https://images.viblo.asia/a78904cf-7b49-4cf8-8813-1c2d947f2103.png)

Tại info.php() ta thấy domain của bài là http://admirer.htb/, thêm vào etc/hosts/ nhưng không thấy khác gì.

Tiếp tục brute-force ở route: **/utility-scripts/**, ta có được endpoint: adminer.php, có vẻ ngon.

![](https://images.viblo.asia/299e9a46-c164-4625-ab73-c84b607fca3c.png)

Nhưng dùng hết đống credentials ở trên cũng không login được ???

![](https://images.viblo.asia/3dbb210f-c805-4af1-9653-c1838e3a829e.png)

Và sử dụng để SSH với waldo@10.10.10.187 thì cũng không được...

Google đại pháp thì ra bài [này](https://medium.com/bugbountywriteup/adminer-script-results-to-pwning-server-private-bug-bounty-program-fe6d8a43fe6f). - **Adminer Script Results to Pwning Server** và bài [này](https://www.foregenix.com/blog/serious-vulnerability-discovered-in-adminer-tool).

Rất đơn giản:

![](https://images.viblo.asia/7b740460-4d17-48b3-872c-54bdfea13f67.png)

Ta sẽ đọc files trên Server bằng cách ghi chúng vào database của chúng ta.

Tạo user mới trên MySQL có sẵn trên máy chúng ta:

![](https://images.viblo.asia/3442b228-6279-42a3-b0b7-46047c5af73a.png)

`CREATE USER 'newuser'@'%' IDENTIFIED BY 'user_password';`

Tạo database mới:

` create database testdb;`

Gán quyền:

`GRANT ALL PRIVILEGES ON test.* to 'newuser';`

Vậy là xong, nhưng có một vấn đề quan trọng mà mình mất khá lâu để sovle đó là phải sửa để Mysql không chỉ listen internal:

![](https://images.viblo.asia/c4badadc-3004-43da-a713-7c7484022b85.png)

Cách sửa (trên Kali Linux): Sửa dòng này: **bind-address = 0.0.0.0** là ok.

![](https://images.viblo.asia/6f45b6ea-d473-4324-ba60-cb3ecedd35da.png)

Đăng nhập thành công:

![](https://images.viblo.asia/3d478221-8757-4fbe-a5cb-bef4174729c4.png)

Tiếp theo đơn giản là làm theo google đại pháp phía trên!

Và ghi file, test với file ở thư mục hiện tại (cùng route với **utility-scripts**):

![](https://images.viblo.asia/5eb7dd6e-79fe-4be8-ab0e-a6277dd77058.png)

Kết quả:

![](https://images.viblo.asia/6296ed5e-d145-4da2-8902-90edbde88574.png)

Thử ghi những file như /etc/passwd thì không được, nhưng nhờ cao kiến của một người bạn (Minh Tuấn) rằng nên đọc những files khác vì có thể password mà author cho là password fake, và hóa ra password "xịn" nằm ở đây:

![](https://images.viblo.asia/7bd81b6b-e3a1-456b-8bc0-0ed0a4527035.png)

Nó khác hẳn với file dump kia:

![](https://images.viblo.asia/2b9f9cdd-3d80-4344-9572-6a9083bd0e07.png)

Và ssh vào, có ngay user flag:

![](https://images.viblo.asia/9d0d35f1-b934-4e04-b9f0-d4bcb0a2d397.png)

Tới đây đã hiểu vì sao bài này bị rate thấp vậy :v

## 1.2. Root User

Bài này sẽ lên Root bằng Sudo Rights, về chi tiết hơn các bạn có thể đọc bài viết khác của mình tại  [đây](https://kgcg.wordpress.com/2020/01/13/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-0-using-sudo-rights/).

Gõ `sudo -l`:

![](https://images.viblo.asia/5d880f7e-c566-4b5f-b713-a4bf78de9383.png)

Đây là những gì có trong **/opt/scripts/**:

![](https://images.viblo.asia/eeae6cb2-43ed-48c0-8a89-3325f365dbf5.png)


Nội dung của **admin_tasks.sh**:

```
#!/bin/bash

view_uptime()
{
    /usr/bin/uptime -p
}

view_users()
{
    /usr/bin/w
}

view_crontab()
{
    /usr/bin/crontab -l
}

backup_passwd()
{
    if [ "$EUID" -eq 0 ]
    then
        echo "Backing up /etc/passwd to /var/backups/passwd.bak..."
        /bin/cp /etc/passwd /var/backups/passwd.bak
        /bin/chown root:root /var/backups/passwd.bak
        /bin/chmod 600 /var/backups/passwd.bak
        echo "Done."
    else
        echo "Insufficient privileges to perform the selected operation."
    fi
}

backup_shadow()
{
    if [ "$EUID" -eq 0 ]
    then
        echo "Backing up /etc/shadow to /var/backups/shadow.bak..."
        /bin/cp /etc/shadow /var/backups/shadow.bak
        /bin/chown root:shadow /var/backups/shadow.bak
        /bin/chmod 600 /var/backups/shadow.bak
        echo "Done."
    else
        echo "Insufficient privileges to perform the selected operation."
    fi
}

backup_web()
{
    if [ "$EUID" -eq 0 ]
    then
        echo "Running backup script in the background, it might take a while..."
        /opt/scripts/backup.py &
    else
        echo "Insufficient privileges to perform the selected operation."
    fi
}

backup_db()
{
    if [ "$EUID" -eq 0 ]
    then
        echo "Running mysqldump in the background, it may take a while..."
        #/usr/bin/mysqldump -u root admirerdb > /srv/ftp/dump.sql &
        /usr/bin/mysqldump -u root admirerdb > /var/backups/dump.sql &
    else
        echo "Insufficient privileges to perform the selected operation."
    fi
}



# Non-interactive way, to be used by the web interface
if [ $# -eq 1 ]
then
    option=$1
    case $option in
        1) view_uptime ;;
        2) view_users ;;
        3) view_crontab ;;
        4) backup_passwd ;;
        5) backup_shadow ;;
        6) backup_web ;;
        7) backup_db ;;

        *) echo "Unknown option." >&2
    esac

    exit 0
fi


# Interactive way, to be called from the command line
options=("View system uptime"
         "View logged in users"
         "View crontab"
         "Backup passwd file"
         "Backup shadow file"
         "Backup web data"
         "Backup DB"
         "Quit")

echo
echo "[[[ System Administration Menu ]]]"
PS3="Choose an option: "
COLUMNS=11
select opt in "${options[@]}"; do
    case $REPLY in
        1) view_uptime ; break ;;
        2) view_users ; break ;;
        3) view_crontab ; break ;;
        4) backup_passwd ; break ;;
        5) backup_shadow ; break ;;
        6) backup_web ; break ;;
        7) backup_db ; break ;;
        8) echo "Bye!" ; break ;;

        *) echo "Unknown option." >&2
    esac
done

exit 0

```

Và của backup.py

```
#!/usr/bin/python3

from shutil import make_archive

src = '/var/www/html/'

# old ftp directory, not used anymore
#dst = '/srv/ftp/html'

dst = '/var/backups/html'

make_archive(dst, 'gztar', src)

```

Dựa vào Sudo Rights được định nghĩa và 2 file trên, user Waldo có thể chỉ định environment khi execute script **admin_tasks.sh** với Sudo Rights. Ở option 6 (**backup_root()**) của script, nó trỏ đến **backup.py**, tại đây file này import method **make_archive** từ module **shutil**.

Trang 8 của tài liệu [này](https://www.ikotler.org/docs/InYourPythonPath.pdf) cộng một chút chọc ngoáy là đủ để bạn hiểu ý tưởng leo Root. Cụ thể đây gọi chung là kỹ thuật Python Hijacking.

Như hình bên dưới mình đã tự tạo ra một module tên **string.py**, chỉ định PYTHONPATH cho python ở thư mục đặt  **string.py** và khi import **string** thì tự động nó sẽ in ra **Hello** như chúng ta đã định nghĩa ở trước:

![](https://images.viblo.asia/cfe5a871-7fac-41db-8382-90a9e9a3e6a2.png)

Vậy để leo quyền Root ta sẽ tạo 1 module tên **shutil** với method bên trong nó là **make_archive()** nhưng script sẽ dùng để đọc flag. Tên phải đúng vì chúng ta không có quyền ghi/thực thi với **backup.py**, nó chỉ có thể gọi khi thông qua **admin_tasks.sh** (với Sudo Rights :v ). Lưu ý **backup.py** dùng Python 3.

Tiến hành tạo nội dung shutil.py như sau:

![](https://images.viblo.asia/4e7e4274-8c6c-4ed1-a1d2-ade532783254.png)


Và chạy như ban nãy thì đơn giản là sẽ không có permission:

![](https://images.viblo.asia/a0929487-6c1e-42e6-af70-fc5397365c78.png)

Nhưng như thế này thì sẽ có:

![](https://images.viblo.asia/a341016b-c138-46bd-a844-ed86093edf3b.png)

Chọn option **6** và get Root flag:

![](https://images.viblo.asia/b98fe3ee-3922-41d3-9044-5be840760b04.png)

**ddae747b5fcc29c5a86f4dad5020022c**

## 2. Kết luận

Bài nhiều lỗ thỏ lằng nhằng nhưng cách leo Root hay, thú vị !