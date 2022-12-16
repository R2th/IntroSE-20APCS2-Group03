## 0. Mở đầu
Vẫn là về câu chuyện Leo thang đặc quyền - Trong Linux !
Tiếp nối 2 phần trước về sử dụng [Sudo Rights](https://kgcg.wordpress.com/2020/01/13/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-0-using-sudo-rights/) và [SUID](https://kgcg.wordpress.com/2020/02/04/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-1-using-suid-bit/), hôm nay sẽ là phần 3, một phần thú vị và không hề ít gặp: Sử dụng Environment Variables - ở đây là PATH Variables.

![](https://images.viblo.asia/d412b72a-b065-4da8-b599-d1f95bdea2bc.jpg)


Như 2 bài viết trước, bài viết này sử dụng Ubuntu OS thuộc Debian distro để demo cho gần gũi với đại đa số nhất, các OS khác có thể nói là tương tự.

## 1. Cơ sở lý thuyết:  Environment Variables

Khi bạn tương tác với hệ thống Linux/Unix trên một Shell session (Ở ubuntu mặc định là **Bash shell**), sẽ có rất nhiều thông tin khác nhau mà shell sử dụng để biết được nó phải làm gì hay cần truy cập tới resources nào trên hệ thống. Khi một shell được mở, một process sẽ được dùng để thu thập và compiles những thông tin cần thiết được dùng cho shell và subshells của shell.

![](https://images.viblo.asia/3ee0d7f5-f3e3-43d3-80f6-140e512368d0.PNG)

Những thông tin đó có thể lấy từ:

1. **User input**

2.  **Linux Environment settings**, đó là một hệ thống các system-wide files và local files. System-wide files thì ảnh hưởng tới toàn bộ user, còn local files nằm trong thư mục **/home** của user và chỉ ảnh hưởng tới user đó.  Với bash user, các system-wide files này bao gồm các file hệ thống:

    ```
    /etc/environment
    /etc/bash.bashrc
    /etc/profile
    ```

    và một số files ở local:

    ```
    ~/.bashrc
    ~/.profile -- not read if ~/.bash_profile or ~/.bash_login
    ~/.bash_profile
    ~/.bash_login
    ```

    Cái mà chúng ta quan tâm ở đây đó là **/etc/environment**. Về cơ bản thì các shell process, sử dụng environment như một phương tiện, nó GET hoặc (SET lại) các settings và sau đó lần lượt chuyển chúng cho những child processes của nó.

ENV được implement dưới dạng strings ở dạng key-value, nếu có nhiều value thì chúng sẽ được phân cách bằng dấu **:**

```
KEY=value1:value2:value3...
```

Nếu value  có các khoảng trắng (space) lớn thì sử dụng **"** **"**:

```
KEY="value with spaces"
```


Ở mặc định của Ubuntu:

![](https://images.viblo.asia/0c25ef52-319a-4cf9-86cf-8ca334dd103d.PNG)

Vậy keys ở đây là gì? Đó chính là các variable, nó có thể là environment variable hoặc shell variable.

Với  environment variable của hệ thống, các bạn có thể gõ **printenv** ngay trên shell và Enter để hiện thị danh sách, ví dụ một số variable:

![](https://images.viblo.asia/08f36a14-4188-43f4-92db-a17b57652301.PNG)



 Với shell variable, chúng ta có thể gán nó như một variable thông thường, để sử dụng ta thêm ký tự **$**:
 
 ![](https://images.viblo.asia/818e69ac-92da-47af-bb0e-5f54a52d3275.PNG)
 
 Ở bài viết này chúng ta sẽ sử dụng **PATH variable** để leo quyền.

## 2. Mấu chốt

Câu chuyện ở đây đó là **user input** được sử dụng như đã nói ở trên và quan trọng hơn là: Khi log-in hay mở một shell session thì system-wide settings được áp dụng trước, ngay sau đó là local settings và local settings có thể ghi đè (override) system-wide settings. Cũng như **variable được chỉ định sau có thể ghi đè các variable có sẵn trước đó, kể cả các environment variable mặc định của hệ thống**:

![](https://images.viblo.asia/f0a1531c-0c66-4754-a354-f3d1bcfecd6b.PNG)


## 3. Leo quyền qua PATH Variables như thế nào ?

Để minh hoạ cho phần Mấu chốt ở trên và cũng là phần chính của bài viết, đây là 2 use-case mình gặp phải trong quá trình chơi Hackthebox. Các machine đang Open nên mình không thể nói là machine nào được lấy ra làm ví dụ được.

Bản thân PATH variable thường được sử dụng để hỗ trợ việc leo quyền.

Các trường hợp "vào form" hơn các bạn có thể đọc tại [đây](https://www.hackingarticles.in/linux-privilege-escalation-using-path-variable/).

### 3.1. Ghi đè PATH variable của /etc/environment/

Tìm SUID:

`find / -perm -u=s -type f 2>/dev/null`

Những binary "lạ" được gắn SUID:

![](https://images.viblo.asia/1d009a90-9ecc-45f3-a964-755e9ad90676.png)

Cố đọc từng binary bằng lệnh `strings /path/to/binary`

Tại **/bin/sysinfo** dùng tới 3 lệnh sau:

![](https://images.viblo.asia/4d9b6cbb-416f-4dad-9ee3-f66686b9cd53.png)

Để thân thuộc mình sẽ dùng **cat** để leo quyền.

Ý tưởng sẽ là: Tạo 1 file tên cat, content của nó do chúng ta quyết định, gán nó vào PATH variable.
Khi binary có SUID được chạy (sysinfo), thì **cat** cũng được chạy với quyền root (do SUID này do Root gắn), khi đó thì lấy cờ easy.

Tạo một file tên **cat**, content của nó dùng để đọc flag:

`strings /root/root.xt`

![](https://images.viblo.asia/cdca79d8-7e98-4ee3-b00c-5c3492ddd02a.PNG)


Sau đó kéo về **/tmp/** của machine,  Command leo quyền như sau:

```
cd /tmp
chmod 777 cat
echo $PATH
export PATH=/tmp:$PATH
```

Khi đó nếu bạn chạy **cat --h** thì câu chuyện sẽ như thế này:

![](https://images.viblo.asia/90fc8ca0-8f50-4685-b1cd-afd9e32a7e78.png)


Nhưng chạy thông qua **sysinfo** thì được do nó có SUID, khi Path variable đã được gán, command chỉ là **sysinfo**, và kết quả:

![](https://images.viblo.asia/7ab60cfc-6a28-4c97-8ff0-5a5afc675c90.png)

*Flag của mỗi user mỗi khác nên không vi phạm policy của Hackthebox*

### 3.2. Thông qua PYTHONPATH

PYTHONPATH là một environment variable của PYTHON ([Đọc thêm tại document của Python](https://docs.python.org/3/using/cmdline.html#environment-variables))

Các environment variable này ảnh hưởng tới Python’s behavior theo những cách khác nhau. Với PYTHONPATH, đây chính là đường dẫn (path) để Python tìm tới nơi chứa những module của nó, và câu chuyện bắt đầu từ đây.

Use-case này sẽ lên Root bằng Sudo Rights, về chi tiết hơn các bạn có thể đọc bài viết khác của mình tại  [đây](https://kgcg.wordpress.com/2020/01/13/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-0-using-sudo-rights/).

Gõ `sudo -l`:

![](https://images.viblo.asia/cfe7788a-c8f4-44ed-aba4-6eece70df196.png)

Đây là những gì có trong **/opt/scripts/**:

![](https://images.viblo.asia/f394e82a-0c76-4a63-b0d8-e1cdaf352028.png)



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
        #/usr/bin/mysqldump -u root *** > /srv/ftp/dump.sql &
        /usr/bin/mysqldump -u root *** > /var/backups/dump.sql &
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

![](https://images.viblo.asia/4242f96f-b502-48a8-a799-29994de3f783.png)


Vậy để leo quyền Root ta sẽ tạo 1 module tên **shutil** với method bên trong nó là **make_archive()** nhưng script sẽ dùng để đọc flag. Tên phải đúng vì chúng ta không có quyền ghi/thực thi với **backup.py**, nó chỉ có thể gọi khi thông qua **admin_tasks.sh** (với Sudo Rights). Lưu ý **backup.py** dùng Python 3.

Tiến hành tạo nội dung shutil.py như sau:

![](https://images.viblo.asia/4e7e4274-8c6c-4ed1-a1d2-ade532783254.png)


Và chạy như ban nãy thì đơn giản là sẽ không có permission:

![](https://images.viblo.asia/d778b8fe-af36-41b4-8da3-2d25e5f9274f.png)


Nhưng như thế này thì sẽ có:

![](https://images.viblo.asia/6035590c-3aa2-4d07-8709-37a0fb2b42e4.png)


Chọn option **6** và get Root flag:

![](https://images.viblo.asia/1847693c-e31d-4d05-92a6-53329c55da99.png)


## 4. Kết luận

Leo quyền qua PATH variable không khó để thực hiện lại dễ học. Vấn đề khi làm các labs hay trong thực tiễn chỉ là bạn có tìm ra được hay không thôi ! Mong bài viết sẽ hữu ích với các bạn trong quá trình Root các labs !

**TOP DEV - Hãy ngưng ăn cắp**

## 5. Tham khảo

https://www.networkworld.com/article/3385516/how-to-manage-your-linux-environment.html

https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps

https://www.hackingarticles.in/linux-privilege-escalation-using-path-variable/

https://www.tldp.org/HOWTO/Text-Terminal-HOWTO-1.html#ss1.6

https://bic-berkeley.github.io/psych-214-fall-2016/using_pythonpath.html