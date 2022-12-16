Part 1 mình đã đề cập đến shebang, Navigating directories, Listing file các bạn có thể xem lại ở [**đây** ](https://viblo.asia/p/chinh-phuc-bash-shell-phan-1-eW65GJRJlDO)nhé

# 5. Sử dụng cat
Chức năng chính của `cat` là in ra nội dung của file nào đó. Ví dụ nè: cat ~/Document/test.txt
Một số option hay được sử dụng với cat:

`-n` : In ra nội dung kèm số dòng

`-b`: In ra nội dung kèm số dòng, tuy nhiên sẽ không tính dòng trống
Chủ yếu 2 cái này là hay dùng thôi còn một số option -v, -T, -E những mình chẳng bao giờ dùng cả, các bạn có thể tìm hiểu xem sao nhé.

## 5.1 Cách nối các tệp
Đơn giản lắm! Sau `cat` chúng ta liệt kê danh sách các file, sau đó sử dụng toán tử > để đẩy output sau khi nối các file đó sang 1 file khác 
Ví dụ:
```bash
cat file1 file2 file3 > file_all
```
Nội dung ở file1, file2, file3 sẽ được nối lại và lưu ở file_all

`cat` còn được sử dụng tưng tự để nối các tệp như là một phần của pipeline:
```bash
cat file1 file2 file3 |grep foo
```

## 5.2 In nội dung của một file
Đây chính là chức năng chính của `cat` được mọi người dùng. Để xem nội dung của một file thì như phần giới thiệu mình cũng có ví dụ rồi, và có 2 option chính mình cũng đã đề cập là `-n` và `-b`

**Một số phần mở rộng:**
* Trong trường hợp bạn muốn nội dung được hiển thị ngược theo dòng(tức là những dòng ở cuối thì được lộn lên đầu) thì dùng tac:
Ví dụ:
```test.txt
baz
foo
foba
bafz
```


```bash
tac test.txt
#result
bafz
foba
foo
baz
```

* Trong trường hợp bạn muốn chuyển nội dung của 1 tệp làm đầu vào cho một câu lệnh. Một cách các bạn có thể làm đó là sử dụng `redirection`:

Ví dụ này lấy nội dung của file test.txt và chuyển tất cả nội dung của nó thành chữ in thườnh
```bash
tr A-Z a-z <file.txt   # as an alternative to cat file.txt | tr A-Z a-z
```

## 5.3 Ghi vào một file
Không nhiều người biết chúng ta hoàn toàn có thể dùng `cat` để ghi nôi dung nào đó vào file đâu nè. Để làm được thì chúng ta có thể dùng câu lệnh như sau 
```bash
cat >file
```
Còn dùng thế nào thì bạn xem ở gif này nhé
![](https://images.viblo.asia/8283562e-d6cb-45cf-809d-dba7116e2bc1.gif)
Cách dừng ghi thì bạn dùng tổ hợp Ctrl + D nhé (đối với Ubuntu)

# 6. Grep
## 6.1 Cách tìm kiếm một "chuỗi" nào đó
Để tìm từ `foo` trong file `bar`
```bash
grep foo ~/Desktop/bar
```

Để tìm tất cả các dòng không chứa foo trong file `bar`(Thêm option `-v` nhé):
```bash
grep–v foo ~/Desktop/bar
```

Tìm tất cả các từ có chứa `foo` cuối cùng (WIldcard Expansion):
```bash
grep "*foo" ~/Desktop/bar
```

# 7. Aliasing
Sell aliases là một cách đơn giản để tạo ra một command mới, họă cũng có thể dùng để làm shortcut cho những command hiện tại theo ý thích của riêng bạn. Có thể nó giuống như những shell function, tuy nhiên nó có tính linh hoạt hơn cho nên thường được ưu tiên sử dụng hơn.

## 7.1: Bypass an alias
Thi thoảng bạn đặt những alias vô tình lại trùng với những command đã có sẵn của hệ thống, và nếu với logic thông thường, bạn sẽ phải disable alias nếu muốn sử dụng command đó. Tuy nhiên đó không phải là cách hay phải không? Hãy cùng xem qua ví dụ nhé

```bash
alias ls='ls --color=auto'
```
Giả sử bạn muốn sử dụng lệnh ls mà không cần tắt bí danh.Bạn có một số tùy chọn:
* Sử dụng `command`: `command ls`
* Sử dụng full path của command: /bin/ls
* Thêm một dấy `\` vào bất kì nơi nào trong tên của command. Ví dụ: `\ls` hoặc `l\s`
* Quote command: "ls" hoặc 'ls'

## 7.2 Tạo một Alias
```bash
alias word='command'
```
Khi này nếu chúng ta gọi `word` thì command sẽ được khởi chạy. Bất kỳ agrument nào được cung cấp cho alias chỉ được thêm vào cuối của bí danh:
```bash
alias myAlias='some command --with --options'
myAlias foo bar baz
```

Khi này shell sẽ thực hiện như thế này
```bash
some command --with--options foo bar baz
```

Để có thể gộp nhiều command trong cùng một alias, bạn có thể sử dụng && để nối chúng lại với nhau:
```bash
alias print_things='echo "foo" && echo "bar" && echo "baz"'
```

## 7.3 Xóa một alias
Để xóa một alias, bạn có thể sử dụng: 
```bash
unalias {alias_name}
```
 Ví dụ:
 ```bash
# create an alias
$ alias now='date'
# preview the alias
$ now
Thu Jul 21 17:11:25 CEST 2016
# remove the alias
$ unalias now
# test if removed
$ now
-bash: now: command not found
```
 
 ## 7.4 Danh sách các alias
 ```bash
 alias -p
 ```
 sẽ hiển thị danh tất các cách alias hiện tại.
 
 # 8. Jobs vàProcesses
 Để hiểu được những command phần này bạn cần có những kiến thức nhất định về hệ điều hành, job cũng như process trong Linux, đặc biệt là **Foreground** và **Background** bạn hãy bỏ chút thời gian để tìm hiểu nhé.
## 8.1 Job handling
 **Creating jobs**
 
Để tạo một job, chỉ cần thêm một kí tự `&` duy nhất và command:
```bash
$ sleep 10 &
[1]20024
```

Bạn cũng có thể biến một process đang chạy thành một job bằng cách nhấn **Ctrl  +  z** :
```bash
$ sleep 10
^Z
[1]+  Stopped                 sleep10
```

**Background và Foreground một process**
Để đưa Process thành foreground, command fg được sử dụng cùng với `%`
```bash
$ sleep 10 &
[1] 20024
$ fg %1
sleep 10
```

Bây giờ bạn có thể tương tác với  process. Để đưa nó trở lại background, bạn có thể sử dụng `bg`. Do terminal session được cài đặt sẵn, trước tiên bạn cần dừng process bằng cách nhấn Ctrl + z.
```bash
$ sleep 10
^Z
[1]+ Stopped       sleep 10
$ bg %1
[1]+ sleep 10 &
```

Nếu bạn chỉ có một proces hoặc đối với process đầu tiên trong danh sách, bạn chỉ cần `%` là đủ:
```bash
$ sleep 10 &
[1] 20024
$ fg %
 # to bring a process to foreground 'fg %' is also working.
sleep 10
```

hoặc chỉ cần
  ```bash
  $ %
 # laziness knows no boundaries, '%' is also working.
sleep 10
  ```
  
  Ngoài ra, chỉ cần nhập `fg` hoặc `bg` mà không có bất kỳ đối số nào sẽ xử lý job cuối cùng:
  ```bash
  $ sleep 20 &
$ sleep 10 &
$ fg

sleep^C
$ fg
sleep10
20
  ```
  
**Killing  jobs đang chạy**
```bash
$ sleep 10 &
[1] 20024
$ kill %1
[1]+ Terminated     sleep 10
```

**Kill một process cụ thể**
Có lẽ cách dễ nhất để kill một process đang chạy là chọn nó thông qua tên của nó như trong ví dụ sau, bằng cách sử dụng `pkill`:
```bash
pkill -f test.py
```
(hoặc) một cách nữa là sử dụng pgrep để tìm kiếm id process:
```bash
kill $(pgrep -f 'python test.py')
```

## 8.2 Kiểm tra xem process nào đang hoạt động ở cổng bất kì
Để kiếm tra process đang chạy ở cổng 8080 bạn làm cách này:
```bash
lsof-i :8080
```

## 8.3 List ra các job hiện tại
```bash
$ tail -f /var/log/syslog > log.txt
[1]+ Stopped       tail -f /var/log/syslog > log.txt
$ sleep 10 &
$ jobs
[1]+ Stopped       tail -f /var/log/syslog > log.txt
[2]- Running       sleep 10 &
```

## 8.4 Tìm kiếm thông tin về một process đang chạy
```bash
ps aux | grep <search-term> shows processes matching search-term
````

Ví dụ:
![](https://images.viblo.asia/fd20ad04-f090-4c90-aa1a-d7e1a4003fc0.png)

Nhìn trên ví dụ, cột thứ hai là id process. Nếu bạn muốn loại bỏ quá trình nginx, bạn có thể sử dụng command `kill 5647`

## 8.5 List tất cả processes
Có hai cách phổ biến để liệt kê tất cả các processes trên một hệ thống. Cả hai đều liệt kê tất cả các processes được chạy bởi tất cả người dùng, chúng khác nhau về định dạng mà chúng xuất ra (lý do cho sự khác biệt là lịch sử).
```bash
ps -ef  # lists all processes
ps aux  # lists all processes in alternative format (BSD)
```

Điều này có thể được sử dụng để kiểm tra xem một ứng dụng nhất định có đang chạy hay không. Ví dụ: để kiểm tra xem SSH server (sshd) có đang chạy hay không:
```bash
ps-ef | grep sshd
```

# Còn tiếp ...
Cảm ơn bạn đã đọc đến cuối cùng này!
Phần tiếp theo mình sẽ tiếp tục với **Redirection** các bạn cùng mình cùng tìm hiểu nhé.