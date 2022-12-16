Hí mọi người lâu giờ mình cũng tiếp xúc với bash shell nhiều mà cũng chưa đi sâu hay tìm hiểu theo hệ thống nên loạt bài này mình sẽ đi theo hệ thống để biết nhiều thứ hơn về bash shell. Mọi  người nếu ai mới tiếp cận môn này thì cùng tìm hiểu với mình nhé :D

# 1. Bắt đầu với Bash
## 1.1 Hello World
Bắt đầu thì chắc chứ làm phát "Hello World" cái nhở :D
```bash
echo "Hello World"
#> Hello World # Output Example
```

**Interactive Shell**
Cách trên được gọi là kiểu sử dụng `interactively`: Nó cho phép bạn nhập và chỉnh sửa các lệnh, sau đó thực thi chúng khi bạn nhấn phím Return. Nhiều hệ điều hành dựa trên Unix và giống Unix sử dụng Bash làm trình bao mặc định của chúng (đặc biệt là Linux và macOS)

**Non-Interactive Shell**
Bash shell cũng có thể được chạy `non-interactively` script, làm cho shell không cần sự tương tác của con người. Hành vi tương tác và hành vi theo tập lệnh phải giống hệt nhau . Vì vậy một cân nhắc thiết kế quan trọng của Unix V7 Bourne shell và tạm dịch là Bash. Nó đã làm cho bất cứ điều gì có thể được thực hiện tại dòng lệnh đều có thể được đưa vào một tệp script để sử dụng lại.
Cách sử dụng `Non-Interactive Shell` theo các bước sau:
1. Tạo một file ví dụ như hello-world.sh
```bash
touch hello-world.sh
```

2. Chỉnh sửa file mới tạo
Bạn có thể chỉnh sửa bằng 1 editor của hệ điều hành bạn đang dùng và chèn bash script bạn muốn chạy, ví dụ:
```
#!/bin/bash
echo "Hello World"
```
Note: Dòng đầu tiên của tập lệnh phải bắt đầu bằng chuỗi ký tự # !, được gọi là shebang1. Shebang hướng dẫn hệ điều hành chạy `\bin bash`, Bash shell, truyền cho nó đường dẫn của script như một đối số. nó tương tự như `/bin/bash hello-world.sh`

3. Cấp quyền excute cho nó
```bash
chmod +x hello-world.sh
```

4. Chạy file.
Để chạy file bạn có thể làm một vài cách sau
```bash
./hello-world.sh # most commonly used, and recommended
/bin/bash hello-world.sh
bash hello-world.sh # assuming /bin is in your $PATH
sh hello-world.sh
```

## 1.2 Cũng là Hello World nhưng học thêm với biến nhé
Hãy tạo một một file `hello.sh` và cấp quyền excute cho nó nhé ` chmod +x
hello.sh.`
Sau đó thêm script này vào
```bash
#!/usr/bin/env bash
# Note that spaces cannot be used around the `=` assignment operator
whom_variable="World"
# Use printf to safely output the data
printf "Hello, %s\n" "$whom_variable"
#> Hello, World
```

Các bạn có thể thấy kết quả in ra sau khi chạy là Hello, World. Vì vậy có thể thấy rằng 'World' đã được gán vào `whom_variable`, đây cũng là cách sửa dụng biến trong bash, Tuy nhiên hãy lưu ý điều này nhé: **Không thể sử dụng dấu cách xung quanh toán tử gán `=`**


Đoạn mã sau chấp nhận một đối số $1, là đối số dòng lệnh đầu tiên và nó được in ra trong một chuỗi được định dạng, phía sau "Hello,". Hãy sửa hello.sh thành thế này
```bash
#!/usr/bin/env bash
printf "Hello, %s\n" "$1"
#> Hello, World
```
sau đó chạy ` ./hello.sh World`
Kết quả sẽ là `Hello, World` bạn có thể thấy 'World' đã được truyền vào $1, sau này khi làm bạn cũng có thể truyền thêm nhiều tham số nữa ` ./hello.sh World World2 World3` chả hạn, tuy nhiên muốn lấy giá trị 'Word2' 'World3' bạn phải sử dụng đến `$2`, `$3`


## 1.3 Cũng là Hello World nhưng với User Input
Phần này mình sẽ tiếp cận theo cách răng: sẽ nhắc người dùng nhập vào một giá trị, sau đó sẽ gán chuỗi đó vào một biến và in biến đó ra.

Ví dụ:
```bash
#!/usr/bin/env bash
echo "Who are you?"
read name
echo "Hello, $name."
```

Output:
```
$ ./hello_world.sh
Who are you?
Matt
Hello, Matt.
```

Lệnh `read` ở đây đọc một dòng dữ liệu từ đầu vào chuẩn vào tên biến. Sau đó, điều này được tham chiếu bằng cách sử dụng $name và được in ra chuẩn bằng cách sử dụng echo.

Và nếu bạn muốn nối một thứ gì đó vào giá trị biến trong khi in nó, hãy sử dụng dấu ngoặc nhọn xung quanh tên biến như được hiển thị trong ví dụ sau:
```
#!/usr/bin/env bash
echo "What are you doing?"
read action
echo "You are ${action}ing."
```

Ouput:
```
$ ./hello_world.sh
What are you doing?
Sleep
You are Sleeping.
```

## 1.4 Tầm quan trọng của Quoting trong Strings
Quoting rất quan trọng đối với việc mở rộng chuỗi trong bash. Với những thứ này, bạn có thể kiểm soát cách bash phân tích cú pháp và mở rộng chuỗi của bạn.
* Weak: dùng double quotes: "
* Strong: dùng single quotes: '

Nếu bạn muốn bash mở rộng đối số của mình, bạn có thể sử dụng Weak Quoting:
```bash
#!/usr/bin/env bash
world="World"
echo "Hello $world"
#> Hello World
```

Nếu bạn không muốn bash mở rộng đối số của mình, bạn có thể sử dụng Strong Quoting:

```bash
#!/usr/bin/env bash
world="World"
echo 'Hello $world'
GoalKicker.com – Bash Notes for Professionals 6
#> Hello $world
```

Bạn cũng có thể sử dụng escape để ngăn expansion:
```bash
#!/usr/bin/env bash
world="World"
echo "Hello \$world"
#> Hello $world
```

## 1.5 Xem thông tin Bash built-ins (cũng như đọc DOC vậy)
Cú pháp sẽ đi kèm từ khóa `help`
```bash
help <command>
```
Ví dụ sử dụng `help unset` sẽ hiển thị:
```
unset: unset [-f] [-v] [-n] [name ...]
Unset values and attributes of shell variables and functions.
For each NAME, remove the corresponding variable or function.
Options:
-f treat each NAME as a shell function
-v treat each NAME as a shell variable
-n treat each NAME as a name reference and unset the variable itself
rather than the variable it references
Without options, unset first tries to unset a variable, and if that fails,
tries to unset a function.
Some variables cannot be unset; also see `readonly'.
Exit Status:
Returns success unless an invalid option is given or a NAME is read-only.
```

Để xem danh sách tất cả các cài đặt sẵn với mô tả ngắn gọn, hãy sử dụng: 
```bash
help -d
```

## 1.6 Hello World trong "Debug" mode

```bash
$ cat hello.sh
#!/bin/bash
echo "Hello World"
$ bash -x hello.sh
+ echo Hello World
Hello World
```

Đối số -x cho phép bạn xem qua từng dòng trong tập lệnh. Một ví dụ nè:

**Cái này là chưa dùng -x nhé**
```bash
$ cat hello.sh
#!/bin/bash
echo "Hello World\n"
adding_string_to_number="s"
v=$(expr 5 + $adding_string_to_number)
```

Chạy nè
```bash
$ ./hello.sh
```

Output
```
Hello World
expr: non-integer argument
```


Lỗi ở trên không đủ để theo dõi tập lệnh; tuy nhiên, sử dụng cách sau sẽ giúp bạn hiểu rõ hơn về nơi bị lỗi trong tập lệnh.

**Còn dùng -x thì sao**

Vẫn hơi giống cái trên nhưng thêm -x nè 
```bash
$ bash -x hello.sh
```

Output

```bash
+ echo Hello World\n
Hello World
+ adding_string_to_number=s
+ expr 5 + s
expr: non-integer argument
+ v=
```

Bạn có thể thấy lỗi ở đâu và việc còn lại là đi sửa thôi phải không =))

# 2. Script shebang
## 2.1 Env shebang
Để thực thi một script file với bash executable được tìm thấy trong biến môi trường PATH bằng cách sử dụng executable
`env`, dòng đầu tiên của script file bản phải chỉ ra đường dẫn tuyệt đối đến tệp thực thi env với đối số bash:
```bash
#!/usr/bin/env bash
```
Đường dẫn env trong shebang được giải quyết và chỉ được sử dụng khi một tập lệnh được khởi chạy trực tiếp như sau:
```
script.sh
```

Script phải có quyền thực thi. Shebang bị bỏ qua khi một trình thông dịch bash được chỉ định rõ ràng để thực thi một tập lệnh:
```
bash script.sh
```

## 2.2 Direct shebang
Để thực thi một script file với trình thông dịch bash, dòng đầu tiên của script file phải chỉ ra đường dẫn tuyệt đối đến tệp thực thi bash để sử dụng:
```bash
#!/bin/bash
```

Đường dẫn bash trong shebang được giải quyết và chỉ được sử dụng nếu một script file được khởi chạy trực tiếp như sau:
```bash
./script.sh
```

Script phải có quyền thực thi. Shebang bị bỏ qua khi một trình thông dịch bash được chỉ định rõ ràng để thực thi một tập lệnh:
```bash
bash script.sh
```

# 3. Navigating directories
## 3.1: Absolute vs relative directories
Để thay đổi thành một thư mục được chỉ định hoàn toàn, hãy sử dụng toàn bộ tên, bắt đầu bằng dấu gạch chéo
```bash
cd /home/username/project/abc
```

Nếu bạn muốn thay đổi đến một thư mục nằm trong thư mục hiện tại bạn đang ở đấy, bạn có thể chỉ định một vị trí tương đối. Ví dụ: nếu bạn đã ở ` /home/username/project`  và bạn có một thư mục xyz ở trong thư mục đó. Nêu muốn thay đổi đến xyz bạn chỉ cần sử dụng
```bash 
cd xyz
```

Nếu bạn muốn đi đến thư mục phía trên thư mục hiện tại, bạn có thể sử dụng bí danh `..`. Ví dụ: nếu bạn ở `/home/username/project/xyz` và muốn đến ` /home/username/project`, thì bạn hãy sử dụng:
```bash
cd ..
```
Điều này cũng có thể được gọi là "lên" một thư mục.

## 3.2: Chuyển đến thư mục gần nhất bạn ở đó
Đối với trình bao hiện tại, điều này sẽ đưa bạn đến thư mục trước đó mà bạn đã ở đó, bất kể nó ở đâu.
```bash
cd -
```
Làm điều đó nhiều lần có hiệu quả sẽ "chuyển" bạn đang ở trong thư mục hiện tại hoặc thư mục trước đó.

## 3.3 Chuyển đến thư mục home
Thư mục mặc định là thư mục chính ($HOME, thường là /home/username), vì vậy nếu bạn chỉ sử dụng mình `cd` sẽ đưa bạn đến đó
```bash
cd
```
Hoặc bạn có thể rõ ràng hơn:
```bash
cd $HOME
```

Một phím tắt cho thư mục home là ~, vì vậy cũng có thể được sử dụng.
```bash
cd ~
```
Ví dụ như ở máy của mình
![](https://images.viblo.asia/f546da16-8f9f-49d4-b3f5-8624cc241910.png)

# 4. Listing Files


| Option | Description |
| -------- | -------- |
| -a, --all     | Liệt kê tất cả các mục bao gồm những mục . và ..   |
|-A, --almost-all|Liệt kê tất cả các mục trừ mục . và ..|
|-c|Sắp xếp các file theo thời gian thay đổi|
|-d, --directory|Danh sách chỉ gồm các folder|
|-h, --human-readable|Hiển thị kích thước ở định dạng con người có thể đọc được (tức là K, M) (đi kèm option s ví dụ `-sh`)|
|-H |Tương tự như trên nhưng với tỉ lệ quy đổi là 1000 thay vì 1024|
|-l | Hiển thị nội dung với định dạng long-listing|
|-o |Long -listing format nhưng không có thông tin group|
|-r, --reverse | HIển thị nội dung nhưng với sự sắp xếp ngược lại |
|-s, --size |Danh sách cách tệp với kích thước của từng thành phần|
|-S|Sắp xếp theo kích thước file|
|--sort=WORD|Sắp xếp danh sahcs file theo từ khóa, ví dụ: size, version,status|
|-t|Sắp xếp theo thời gian sửa đổi|
|-u|Sắp xếp theo thời gian truy cập|
|-v|Sắp xếp theo version|
|-1|Danh sách nhưng với 1 file một dòng|

## 4.1 Danh sách các tệp ở định dạng Long Listing
Tùy chọn -l của lệnh ls in nội dung của thư mục cụ thể ở định dạng Long Listing. Nếu không có thư mục nào được chỉ định thì theo mặc định, nội dung của thư mục hiện tại sẽ được liệt kê.
```bash
ls -l /etc
```
Output mẫu:
```
total 1204
drwxr-xr-x 3 root root 4096 Apr 21 03:44 acpi
-rw-r--r-- 1 root root 3028 Apr 21 03:38 adduser.conf
drwxr-xr-x 2 root root 4096 Jun 11 20:42 alternatives
...
```

Đầu tiên hiển thị tổng số, cho biết tổng kích thước tính bằng khối của tất cả các tệp trong thư mục được liệt kê. Sau đó, nó hiển thị tám cột thông tin cho mỗi tệp trong thư mục được liệt kê. Dưới đây là chi tiết cho từng cột trong đầu ra:


|Column No.| Example| Description|
| -------- | -------- | -------- |
|1.1| d |File type (xem ở bảng dưới đây)|
|1.2| rwxr-xr-x |Permission string|
|2| 3 |Number of hard links|
|3|root |Owner name|
|4| root |Owner group|
|5| 4096 |File size in bytes|
|6| Apr 21 03:44 |Modification time|
|7| acpi |File name|

File type có thể là một trong bất kỳ ký tự nào sau đây.
|Character| File Type|
| -------- | -------- |
| - | Regular file|
| b | Block special file|
| c | Character special file|
| C | High performance ("contiguous data") file|
| d | Directory|
| D | Door (special IPC file in Solaris 2.5+ only)|
| l | Symbolic link|
| M | Off-line ("migrated") file (Cray DMF)|
| n | Network special file (HP-UX)|
| p | FIFO (named pipe)|
| P | Port (special system file in Solaris 10+ only)|
| s | Socket|
| ? | Some other file type|

## 4.2 Danh sách 10 File được thay đổi gần đây nhất
Phần sau sẽ liệt kê tối đa mười tệp được sửa đổi gần đây nhất trong thư mục hiện tại, sử dụng  long listing format (-l) và được sắp xếp theo thời gian (-t).
```bash
ls -lt | head
```

Note: Với `head` mặc định nếu bạn không truyền tham số thì sẽ lấy là kết quả là 10 dòng đầu tiên, tuy nhiên bạn có thể dùng option để có thể lấy nhiều hoặc ít hơn, vi dụ:  `ls -lt | head -20`

## 4.3 List File với Dotfiles
**Dotfile** là một tệp có tên bắt đầu bằng dấu chấm `.` Chúng thường được ẩn bởi ls và không được liệt kê trừ khi được yêu cầu.
Ví dụ:
```bash
$ ls
bin pki
```

Option -a hoặc --all sẽ lấy ra tất cả các file bao gồm dotfiles
```bash
$ ls -a
. .ansible .bash_logout .bashrc .lesshst .puppetlabs .viminfo
.. .bash_history .bash_profile bin pki .ssh
```

Option -A hoặc --almost-all sẽ liệt kê sánh sách tát cả các file, bao gồm cả dotfile tuy nhiên sẽ không bao gồm `.` và `..`. Bạn đang tự hỏi `.`. và `..` là gì phải không?
Câu trả lời đây nhé: `.` là thư mục hiện tại và `..` là thư mục cha của nó.
```bash
$ ls -A
.ansible .bash_logout .bashrc .lesshst .puppetlabs .viminfo
.bash_history .bash_profile bin pki .ssh
```

## 4.4 Danh sách các file nhưng không dùng `ls`
Bạn hoàn toàn có thể sử dụng khả năng [Filename Expansion](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Filename-Expansion) và brace expansion của BashShell để lấy các file.

```bash
# display the files and directories that are in the current directory
printf "%s\n" *
# display only the directories in the current directory
printf "%s\n" */
# display only (some) image files
printf "%s\n" *.{gif,jpg,png}
```

Để lưu danh sách các tệp thành một biến để xử lý, thông thường bạn nên sử dụng [bash array](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Arrays):
```bash
files=( * )
# iterate over them
for file in "${files[@]}"; do
 echo "$file"
done
```

## 4.6 Danh sách các file dạng tree
`tree` command sẽ lấy ra danh sách các file trong một thư mục được chỉ định ra dưới dạng tree
Ví dụ:
```bash
$ tree /tmp
/tmp
├── 5037
├── adb.log
└── evince-20965
    └── image.FPWTJY.png
```

Sử dụng tùy chọn -L của lệnh tree để giới hạn độ sâu hiển thị và tùy chọn -d để chỉ liệt kê các thư mục.
Ví dụ
```bash
$ tree -L 1 -d /tmp
/tmp
└── evince-20965
```

# 5. Sử dụng cat
***To be continue...***

# Tham khảo 
Bạn có thể đọc nội dung trên ở:

**[Bash Reference Manual](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html)**

[**BashNotes for Professionals**](https://books.goalkicker.com/BashBook/)