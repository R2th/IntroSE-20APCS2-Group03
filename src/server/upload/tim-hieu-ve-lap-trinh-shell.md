Mình đã suy nghĩ rất nhiều về việc lựa chọn chủ đề cho bài viết này. Thực sự là có rất nhiều chủ đề hay ho song để bạn đọc có thể dễ dàng setup và thực hành theo thì không phải chủ đề nào cũng phù hợp. Và cuối cùng, mình đã lựa chọn "Bash shell" để chia sẻ với mọi người. "Bash shell" là kiểu shell tiêu chuẩn, rất thông dụng và dễ thao tác. Cùng mình tìm hiểu chủ đề này nhé. Đây là kiến thức căn bản mà theo mình thì dev nào cũng nên biết á :)


## 1. HELLO WORLD
Shell là chương trình người dùng đặc biệt, cho phép người dùng giao tiếp với hệ điều hành thông qua cửa sổ dòng lệnh. Shell là ngôn ngữ lập trình diễn dịch.

Bash là một dạng shell, hay trình thông dịch cho hệ điều hành GNU. Tên gốc của nó là "Bourne-Again SHell", lấy cảm hứng từ tên của người cha đẻ Unix Shell - "Stephen Bourne". Bash khá thông dụng. Nó hiện đang chạy trên hầu hết mọi phiên bản của Unix và một số hệ điều hành khác như MS-DOS , OS/2 và Windows. 

Và để anh em làm quen thì chúng ta có một chương trình không thể đơn giản hơn đó là helloworld. Đừng cười mình, dù sao chúng ta cũng nên đi từ cơ bản phải không nào ;)
```bash:helloworld.sh
#!/bin/bash

echo “Hello World!”
```
Bạn chỉ cần tạo 1 file `helloworld.sh` với nội dung trên
Trong đó, dòng đầu tiên là khai báo trình thông dịch, ở đây là bash script, sẽ bắt đầu với bin/bash. Bạn cũng có thể hay gặp một khai báo tương tự là `#!/bin/sh`

Sau đó, mở `terminal` tại thư mục chứa file và chạy lệnh. Dòng chữ "Hello World!" sẽ được in ra như vậy
```
$ bash helloworld.sh
Hello World!
```
Vậy là bạn đã biết viết bash shell rồi đó phải không nào =))

## 2. Shell Systax cơ bản

### 2.1 Khai báo biến và tham số

Shell không quan tâm tới kiểu dữ liệu nên bạn có thể truyền bất kì giá trị gì cho biến, nó có thể là strings, integers, real number,...

```bash
#!/bin/sh
MY_MESSAGE="Hello World!"
echo $MY_MESSAGE
```
>> Lưu ý: Cú pháp khai báo biến không được chứa white space, ví dụ, nếu bạn khai báo như vậy sẽ bị lỗi `MY_MESSAGE = "Hello World!"`

Ngoài việc truyền giá trị trực tiếp cho biến trong file, shell còn cho phép bạn truyền biến khi excute bằng các biến đặc biệt


|  Cú pháp | Ý nghĩa |
| -------- | -------- |
| $0   | Tên tệp đang thực thi|
| $<n> (ex: $1, $2,...) | Các biến này tương ứng với các đối số đã truyền khi thực thi file|
| $# | Số lượng đối số được cung cấp cho một tập lệnh |
| $*  | Danh sách đối số được đặt trong dấu nháy kép|
| $@  | Danh sách đối số được đặt trong dấu nháy kép riêng lẻ|
| $? | "exit status" lệnh được thực thi gần nhất. Nếu lệnh thực thi thành công, "exit status" sẽ bằng 0, ngược lại thì khác 0.|
| $$ | Số thứ tự của tiến trình trong shell hiện tại, thường là `process ID` của process đang thực thi.|     |
| $! | Process ID của lệnh nền gần nhất đã được thực thi |
    
Những biến này được sử dụng khá nhiều
Ví dụ như khi bạn muốn truyền biến cho file thực thi
```bash:helloworld.sh
#!/bin/bash

echo “Hello World!”
echo $1;
```
```
$ bash helloworld "my name is HaiHaChan. Welcome!"
 “Hello World!”
My name is HaiHaChan. Welcome!
```
### 2.2 Lệnh điều kiện
Shell script hỗ trợ bạn 2 systax
```bash
if test-commands; then
  consequent-commands;
[elif more-test-commands; then
  more-consequents;]
[else alternate-consequents;]
fi
```
và 
```bash
case word in
    [ [(] pattern [| pattern]…) command-list ;;]…
esac
```

Trong đó, các điều kiện này sử dụng các toán tử logic của shell, như:

Toán tử với số

| Toán tử | Cú pháp | Ý nghĩa |
| -------- | -------- | -------- |
| -eq  |  $1 -eq $2    |   So sánh bằng  |
| -ne  |   $1 -ne $2   |   So sánh khác |
| -lt    | $1 -lt $2     | So sánh nhỏ hơn  |
| -le  | $1 -le $2     |  So sánh nhỏ hơn hoặc bằng |
|  -gt |$1 -gt $2      |  So sánh lớn hơn |
|  -ge| $1 -ge $2     |  So sánh lớn hơn hoặc bằng   |

Toán tử với chuỗi
| Toán tử | Cú pháp | Ý nghĩa |
| -------- | -------- | -------- |
| =  |  $1 = $2    |   So sánh bằng  |
| !=  |   $1 != $2   |   So sánh khác |
| -z    | -z $1     | Kiểm tra chuỗi rỗng  |
| -n    | -n $1     | Kiểm tra chuỗi khác rỗng |

Toán tử với file/directory 
| Toán tử | Cú pháp | Ý nghĩa |
| -------- | -------- | -------- |
|-a hoặc -e| -a $file_path hoặc -e $file_path| Kiểm tra xem file có tồn tại hay không|
|-f| -f $file_path|	Kiểm tra xem file có phải là tệp hay không|
|-d| -d $file_path|	Kiểm tra xem đường dẫn có phải là thư mục hay không|
|-r|-r $file_path|	Kiểm tra file tồn tại và đọc (read) được hay không|
|-w |-w $file_path|	Kiểm tra file tồn tại và  ghi (write) được hay không|
|-x| -x $file_path|	Kiểm tra file tồn tại và thực thi (execute) được hay không|
|-s| -s $file_path|	Kiểm tra file tồn tại và có kích thước lớn hơn 0 hay không|

### 2.3 Vòng lặp
Shell hỗ trợ cả 4 kiểu vòng lặp bao gồm
```bash:until
until test-commands; do consequent-commands; done
```
```bash:while
while test-commands; do consequent-commands; done
```

```bash:for in
for name [ [in [words …] ] ; ] do commands; done
```
```bash:for
for (( expr1 ; expr2 ; expr3 )) ; do commands ; done
```
    
Ví dụ:
```bash
#!/bin/sh

a=0
while [ "$a" -lt 10 ]    # this is loop1
do
   b="$a"
   while [ "$b" -ge 0 ]  # this is loop2
   do
      echo -n "$b "
      b=`expr $b - 1`
   done
   echo
   a=`expr $a + 1`
done
```
Kết quả khi bạn chạy xong sẽ như vậy
```
0
1 0
2 1 0
3 2 1 0
4 3 2 1 0
5 4 3 2 1 0
6 5 4 3 2 1 0
7 6 5 4 3 2 1 0
8 7 6 5 4 3 2 1 0
9 8 7 6 5 4 3 2 1 0
```
### 2.4 Định nghĩa chương trình
Bash shell hỗ trợ 2 cú pháp viết function, bao gồm
```bash
fname () compound-command [ redirections ]
```
hoặc
```bash
function fname [()] compound-command [ redirections ]
```
Ví dụ 
```bash
#!/bin/sh

# Define your function here
hello () {
   echo "Hello World!"
}

# Invoke your function
hello
```
Như ví dụ trên, bạn có thể thấy, sau khi function được định nghĩa, tên function sẽ được sử dụng như một command để thực thi. Vì vậy, tên function phải viết liền (không chứa white space) và không chứa các kí tự đặc biệt.
    
Nếu bạn muốn truyền biến, function nhận biến truyền vào tương tự như command nhận đối số
```bash:sum.sh
#!\bin\bash

sum () {
    a=$1;
    b=$2;

	return $(($a + $b));
}
sum 10 20
result1=$?

sum $1 $2
result2=$?

echo "sum of 10 and 20 is $result1"
echo "sum of $1 and $2 is $result2"
```
```
$ bash sum.sh 15 33
sum of 10 and 20 is 30
sum of 15 and 33 is 48
```

Trên đây là một số kiến thức căn bản về lập trình shell mà mình tìm hiểu được. Thực ra thì systax của shell khá đa dạng, còn trên đây chỉ là những cú pháp thường hay được dùng nhất trong shell. Hi vọng bài viết này sẽ có ích với bạn.
    
Xin chào và hẹn gặp lại bạn ở những bài viết tiếp theo.

Tài liệu tham khảo

[Bash Reference Manual](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html)
    
[Shell Scripting Tutorial](https://www.tutorialspoint.com/unix/unix-manpage-help.htm)