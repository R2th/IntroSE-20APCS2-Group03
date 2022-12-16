### Shell Scripts 
Shell Script là một chương trình máy tính được thiết kế để chạy bởi shell Unix, trình thông dịch dòng lệnh. Các phương ngữ khác nhau của tập lệnh shell được coi là ngôn ngữ kịch bản. Các phương thức tiêu biểu được thực hiện bởi các kịch bản shell bao gồm quản lý file , thực thi chương trình và hiển thị text.
### Hello world
Mình sẽ viết một đoạn code nhỏ để in đoạn "Hello world" là một bài tập nhỏ mình thường làm mỗi khi học công nghệ mới:
```shell
#!/bin/bash
# My first script

echo "Hello World!"
```
Mình sẽ giải thích một chút ở đoạn script trên:
*  `#!/bin/bash` dùng để khai báo trình biên dịch nào để đọc đoạn script ở dưới cụ thể trong trường hợp này là `/bin/bash`. Để hiểu rõ hơn bạn có thể đọc thêm khái niệm về [shebang](https://viblo.asia/p/shebang-unix-wpVYRPQlM4ng)
*  Dòng thứ 2 đơn thuần là command giống như các ngôn ngữ khác
*  Cuối cùng là câu lệnh `echo` để in ra đoạn text.

Tiếp theo là bạn phải setting permission để có quyền execute cho đoạn script, bằng cách sử dụng command chmod  như sau:
```shell
$ chmod 755 hello_world.sh
```

Cuối cùng chạy lệnh sau:
```
$ ./hello_world.sh
```

Bạn sẽ thấy `Hello World!` xuất hiện trên terminal. Nếu không thì hãy kiểm tra lại xem vị trí thư mục chạy lệnh hoặc đã cung cấp quyền execute chưa.

### Một số concepts quan trọng về shell
**Shell Environment**

Khi đăng nhập vào hệ thống, trình biên dịch `/bin/bash` sẽ khởi động và đọc các config scripts trong các file startup. Các file startup sẽ phụ thuộc vào tùy từng môi trường shell. Có 2 loại:  `a login shell session và a non-login shell session` . Ví dụ: một login shell sẽ được khởi tạo bị bạn login thành công từ terminal ssh hoặc console, non-login shell được bắt đầu bởi các chương trình như script cronjob hay các service của linux mà không cần login vào hệ thống.

Login shell
| File  | Contents  |
| -------- | -------- | 
| /etc/profile     | Config scripts lưu trong file này sẽ áp dụng cho toàn bộ user     |
| ~/.bash_profile     | Startup file dành cho cá nhân. Được sử dụng để mở rộng hoặc ghi đè config scripts lưu trong `/etc/profile`    |
| ~/.bash_login     | Trường hợp ` ~/.bash_profile` không tìm thấy, trình biên dịch sẽ đọc scripts trong file này     |
| ~/.profile     | Nếu cả  ` ~/.bash_profile` và  `~/.bash_login` không tìm thấy thì file này sẽ được dọc |

Non-login shell
| File  | Contents  |
| -------- | -------- | 
| /etc/bash.bashrc     | Config scripts lưu trong file này sẽ áp dụng cho toàn bộ user     |
| ~/.bashrc     | Startup file dành cho cá nhân. Được sử dụng để mở rộng hoặc ghi đè config scripts lưu trong `/etc/profile`     |

**Aliases**

Đúng với các tên chúng ta sẽ tạo ra command mới đại diện command đã có trong hệ thống(dài, phức tạp). Quy chuẩn đặt tên:
```
alias name=value
```
Bạn có thể thử bằng cách sử dụng editor (vim...) mở file ` ~/.bashrc ` và thêm dòng sau:
```shell
alias vừa cài đặt l='ls -l'
```
Sau khi them vào file ` ~/.bashrc ` bạn cần tắt terminal hiện tại đi và bật lại để sử dụng alias vừa thêm vào

**Shell Functions**

Aliases là một command đơn giản, để có thể xử lý các TH phức tạp hơn thì bạn cần phải biết khái niệm `shell functions `. Bạn có thể thêm đoạn script vào file .bashrc để chạy thử
```shell
today() {
    echo -n "Today's date is: "
    date +"%A, %B %-d, %Y"
}
```
### Variables

Trước tiên mình sẽ viết 1 đoạn here scripts để làm ví dụ như sau:
```
#!/bin/bash

# sysinfo_page - A script to produce an HTML file

cat <<- _EOF_
    <html>
    <head>
        <title>
       ` My System Information`  
        </title>
    </head>

    <body>
    <h1>My System Information</h1>
    </body>
    </html>
_EOF_
```

Mình giải thích 1 chút `here script` là một cách để output ra màn hình bằng cách sử dụng `cat` command để đọc đoạn text muốn output trong script

Tiếp theo là phần chính, trong đoạn text trên ` My System Information` xuất hiện 2 lần. Do đó mình sẽ dùng variable để chứa cụm từ bị lặp cấu trúc như sau:
```shell
// khai báo biến
title="My System Information"

//gọi biến
$title
```

Như vậy mỗi khi shell đọc biên dịch script mà nhìn thấy từ bắt đầu bằng dấu `$` , nó sẽ tìm xem giá trị gì được gán cho biến và thay thế giá trị đó vào.

Ngoài ra còn các các loại biến sau: 
* Environment Variables: $HOSTNAME
* Substitution: $(date +"%x %r %Z")
* Constants: SYSTEM_NAME="Linux v16.04"

Mình sẽ tổng hợp tất cả các biến đã học ở đây:
```shell
#!/bin/bash

# sysinfo_page - A script to produce an HTML file

title="System Information for $HOSTNAME"
RIGHT_NOW=$(date +"%x %r %Z")
TIME_STAMP="Updated on $RIGHT_NOW by $USER"

cat <<- _EOF_
    <html>
    <head>
        <title>
        $title
        </title>
    </head>

    <body>
    <h1>$title</h1>
    <p>$TIME_STAMP</p>
    </body>
    </html>
_EOF_
```

### Shell Functions
Khi mà chương trình ngày càng trở lên phức tạp hơn về thiết kế, code, và bào trì. Vậy để giải quyết các việc trên thì ta sẽ tách nhỏ hơn thành các hàm để xử lý các task nhỏ
```shell
#!/bin/bash

# sysinfo_page - A script to produce an system information HTML file

##### Constants

TITLE="System Information for $HOSTNAME"
RIGHT_NOW=$(date +"%x %r %Z")
TIME_STAMP="Updated on $RIGHT_NOW by $USER"

##### Functions

system_info()
{

}


show_uptime()
{

}


drive_space()
{

}


home_space()
{

}

##### Main

cat <<- _EOF_
  <html>
  <head>
      <title>$TITLE</title>
  </head>

  <body>
      <h1>$TITLE</h1>
      <p>$TIME_STAMP</p>
      $(system_info)
      $(show_uptime)
      $(drive_space)
      $(home_space)
  </body>
  </html>
_EOF_
```

Mình sẽ bổ sung nội dung cho các hàm bằng cách hiển thị thông tin về system.
```
$ uptime
 15:58:19 up  7:14,  1 user,  load average: 0,79, 0,60, 0,57
```

Lệnh `uptime` sẽ thông báo có bao nhiêu user, thời gian chạy kể từ lần cuối re-boot

```shell
show_uptime()
{
    echo "<h2>System uptime</h2>"
    echo "<pre>"
    uptime
    echo "</pre>"
}
      
```
Tiếp theo là hàm drive_space
```
$ df

Filesystem   1k-blocks      Used Available Use% Mounted on
/dev/hda2       509992    225772    279080  45% /
/dev/hda1        23324      1796     21288   8% /boot
/dev/hda3     15739176   1748176  13832360  12% /home
/dev/hda5      3123888   3039584     52820  99% /usr
```
Lệnh `df` sẽ thông báo có bao nhiêu user, thời gian chạy kể từ lần cuối re-boot

```shell
drive_space()
{
    echo "<h2>Filesystem space</h2>"
    echo "<pre>"
    df
    echo "</pre>"
}
```
Còn lại 2 function home_space và system_info sẽ được bổ sung sau

### Flow Control

**if**
Cấu trúc của if trong shell script như sau:
```
if commands; then
  commands
elif commands; then
  commands...
else
  commands
fi
```

**test**
Test command được sử dụng như là câu điều kiển trong if command để trả về true/ false. Cấu trúc của test command như sau:
```
# First form

test expression

# Second form

[ expression ]
```
Ví dụ về việc kết hợp if else với test command:
```shell
if [ -f .bash_profile ]; then
    echo "You have a .bash_profile. Things are fine."
else
    echo "Yikes! You have no .bash_profile!"
fi
```
Ở ví dụ phía trên biểu thức `-f .bash_profile` sẽ tương đương với ý nghĩa: "Is .bash_profile a file?"

Sau đây là danh sách các test command. Để xem chi tiết hơn các bạn có thể gõ lệnh sau: `help test`
| Expression | Description | 
| -------- | -------- | 
| -d file     | True khi file là một directory     | 
| -e file    | True khi file tồn tại     | 
| -f file   | True khi file tồn tại và và một file thông thường(không bị hạn chế về permission)  | 
| -L file     | True nếu file là symbolic link     | 
| -r file     | True nếu file có quyền đọc (readable)| 
| -w file     | True nếu file có quyền ghi (writable)| 
| -x file    | True nếu file có quyền thực thi (executable)| 
| file1 -nt file2  | True nếu file 1 mới hơn so với file 2 (dựa vào modification time)| 
| file1 -ot file2  | True nếu file 1 cũ hơn so với file 2| 
| -z string| True nếu string rỗng| 
| -n string| True nếu string tồn tại| 
| string1 = string2| True nếu 2 string giống nhau| 
| string1 != string2|  True nếu 2 string khác nhau|

Trở lại với ví dụ của phần shell functions mình sẽ bổ sung tiếp cho function home_space như sau:
```shell
function home_space
{
    # Only the superuser can get this information

    if [ "$(id -u)" = "0" ]; then
        echo "<h2>Home directory space by user</h2>"
        echo "<pre>"
        echo "Bytes Directory"
            du -s /home/* | sort -nr
        echo "</pre>"
    fi

}
```
Mình sẽ giải thích qua các lệnh trên với test command: `["$(id -u)" = "0"]` để kiểm tra user hiện tại có phải superuser không. Nếu là superuser thì hệ thống sẽ hiển thị thông tin chữ lượng mà mỗi user đã sử dụng trong thư mục home.

### Keyboard Input And Arithmetic
**read**
Để có thể nhập input từ bán phím, bạn có thể sử dụng `read` command. Lệnh read sẽ đọc input từ bàn phím và gán vào biến như sau:
```shell
#!/bin/bash

echo -n "Enter some text > "
read text
echo "You entered: $text"
```

Sau đây là ví dụ mình chạy thử:
```shell
$ ./IO_Arithmetic_test.sh
Enter some text > duongpham
You entered: duongpham
```

**Arithmetic**
Shell scripts cung cấp một tính năng nữa đó là xử lý các sô nguyên VD: 1, 2, 458, -2859. Còn các số lẻ hoặc thập phân(0.5, .333, hoặc 3.1415) sẽ cần phải cài đặt plugin hỗ trợ. Các bạn có thể xem ví dụ sau:
```
$ echo $((2+2))
```
Lưu ý: shell sẽ ignore khoảng trắng có trong biểu thức

Sau đây là ví dụ tổng hợp các phép toán cơ bản

Ex1:
```shell
#!/bin/bash

first_num=0
second_num=0

echo -n "Enter the first number --> "
read first_num
echo -n "Enter the second number -> "
read second_num

echo "first number + second number = $((first_num + second_num))"
echo "first number - second number = $((first_num - second_num))"
echo "first number * second number = $((first_num * second_num))"
echo "first number / second number = $((first_num / second_num))"
echo "first number % second number = $((first_num % second_num))"
echo "first number raised to the"
echo "power of the second number   = $((first_num ** second_num))"
```
Ex2:
```shell
#!/bin/bash

number=0

echo -n "Enter a number > "
read number

echo "Number is $number"
if [ $((number % 2)) -eq 0 ]; then
    echo "Number is even"
else
    echo "Number is odd"
fi
```

### Loops
Cũng như các ngôn ngữ lập trình khác shell script cung cấp 3 command cho vòng lặp: `while, until và for` . Đầu tiên  là vòng lặp **while**
```shell
#!/bin/bash

number=0
while [ "$number" -lt 10 ]; do
    echo "Number = $number"
    number=$((number + 1))
done
```

Mình sẽ giải thích qua 1 chút, đầu tiên number được khởi tại bằng 0 sau đó chạy vào vòng while nếu nhỏ hơn 10 thì in ra đồng thời number = number +1

Tiếp theo là cấu trúc **until**
```shell
#!/bin/bash

number=0
until [ "$number" -ge 10 ]; do
    echo "Number = $number"
    number=$((number + 1))
done
```

Cuối cùng là cấu trúc **for**
```shell
for variable in words; do
    commands
done
```

VÍ dụ về vòng for trong shell script
```shell
#!/bin/bash

count=0
for i in $(cat ~/.bash_profile); do
    count=$((count + 1))
    echo "Word $count ($i) contains $(echo -n $i | wc -c) characters"
done
```
Ví dụ ở trên mình dùng vòng for để đếm có bao nhiêu từ trong file và số kí tự trong mỗi từ. Ngoài ra mình có thể chuyền các tham số the positional parameters như một dãy các từ như sau
```
#!/bin/bash

for i in "$@"; do
    echo $i
done
```
Kết quả khi chạy
```
$ ./for_test.sh 1 2 3 4 5
1
2
3
4
5
```

Ví dụ khác
```
#!/bin/bash

for filename in "$@"; do
    result=
    if [ -f "$filename" ]; then
        result="$filename is a regular file"
    else
        if [ -d "$filename" ]; then
            result="$filename is a directory"
        fi
    fi
    if [ -w "$filename" ]; then
        result="$result and it is writable"
    else
        result="$result and it is not writable"
    fi
    echo "$result"
done
```

### Kết luận 
Cảm ơn các bạn đã đọc bài viết của mình. Còn thể nó có hơi đơn giản nhưng đó nỗ lực của mình để mở rộng kiến thức về shell script, hy vọng nó giúp bạn trong quá trình làm việc với ubuntu.

Bài viết được tham khảo tại [đây](http://linuxcommand.org/lc3_writing_shell_scripts.php#contents)