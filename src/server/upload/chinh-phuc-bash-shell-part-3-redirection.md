# 9. Redirection
Kỹ thuật redirection là kỹ thuật dùng toán tử >. redirect từ luồng stream này sang luồng stream khác. Thông thường giúp người dùng thêm nội dung vào trong file.

## 9.1 Redirecting standard output
Để tìm hiểu về Redirection hãy xem câu lệnh sau đây

```bash
ls >file.txt
> file.txt ls
```


`>` chuyển hướng đầu ra chuẩn (hay còn gọi là STDOUT) của lệnh hiện tại thành một tệp hoặc bộ mô tả khác. Các ví dụ này ghi kết quả đầu ra của lệnh ls vào tệp file.txt

File đích được tạo nếu nó không tồn tại, nếu không File này sẽ bị cắt bớt. Default redirection là standard output hoặc 1 khi không có giá trị nào được chỉ định. Lệnh này tương đương với các ví dụ trước với standard output được chỉ ra rõ ràng:

```bash
ls 1>file.txt
```

Lưu ý: redirection được khởi tạo bởi executed shell chứ không phải bởi executed command, do đó nó được thực hiện trước khi command execution.

##  9.2 Append và Truncate  Redirection
Có 2 kiểu redirection:
* Kiểu Trancate `>` sẽ xóa toàn bộ nội dung cũ của file và chèn nội dung được thêm
* Kiểu Append `>>`  sẽ chèn thêm nội dung mới vào file và không tác động gì tới nội dung cũ của file.

Ví dụ:
**Kiểu Truncate**
```bash
$ echo "first line" > /tmp/lines
$ echo "second line" > /tmp/lines
$ cat /tmp/lines
second line
```

**Kiểu Append**
```bash
# Overwrite existing file
$ echo "first line" > /tmp/lines
# Append a second line
$ echo "second line" >> /tmp/lines
$ cat /tmp/lines
first line
second line
```

## 9.3 Redirecting  STDOUT và STDERR
Các câu lệnh trong Linux đều có một input - SDTIN và hai loại output, standard output - STDOUT và standard error - STDERR, được gọi là các dòng dữ liệu (stream).

Hơn nữa trong linux , mọi thứ đều là file, và ngay cả các `standard input`, `output` và `error` đều là file. Mỗi file đều cần phải có định danh gọi là `file descriptor`. Các file descriptor được diễn đạt như một số nguyên dương như sau :

* standard input : 0
* standard ouput : 1
* standard error:  2
Nếu bạn đã từng đọc qua một vài shellscript thì nhất định bạn đã từng gặp một đoạn mã tựa như này:
```bash
# STDERR is redirect to STDOUT: redirected to /dev/null,
# effectually redirecting both STDERR and STDOUT to /dev/null
echo 'hello' > /dev/null 2>&1
```
> /dev/null (còn gọi là “the null device”) là một file có đặt điểm là vứt bỏ (discards) mọi dữ liệu mà người dùng ghi vào trong nó (thường thông qua các lệnh chuyển hướng của shell hay các lệnh mv, cp,…), nhưng nó vẫn báo là hoàn thành quá trình ghi vào chứ không sinh ra lỗi. Và vì file này không lưu gì vào trong cả nên dĩ nhiên là cũng không xuất ra bất cứ cái gì.
> 
> Người ta xem như nó là một “lỗ đen” trong máy tính, có tác dụng thu nhận mọi thứ và không giới hạn, nhưng chẳng trả lại cái gì cả

Vậy câu lệnh trên có nghĩa là:
`>/dev/null` : redirect tất cả các standard output sang `/dev/null/`. Tương đương với cách viết `1>/dev/null/`
`2>&1` : redirect tất cả các standard error sang standard output. Nhưng thời điểm này standard output đang trỏ sang `/dev/null/` nên standard error sẽ redirect sang `/dev/null/`.

Tóm lại lệnh này ngụ ý sẽ là không in ra màn hình tất cả các output và error bằng cách đẩy chúng vào hố đen /dev/null/.

Câu lệnh trên hoàn toàn có thể viết ngắn hơn bằng cách này:
```bash
echo 'hello' &> /dev/null
```

## 9.4 Sử dụng named pipes
Đôi khi bạn có thể muốn xuất một cái gì đó bằng một chương trình và nhập nó vào một chương trình khác, nhưng không thể sử dụng một standard pipe.

Ở ví dụ này :
```bash
ls -l | grep ".log"
```

Bạn có thể ghi vào một tệp tạm thời:
```bash
touch tempFile.txt
ls -l > tempFile.txt
grep ".log" < tempFile.txt
```

Điều này hoạt động khá ổn, tuy nhiên, sẽ không ai biết tempFile làm gì và ai đó có thể xóa hoặc một đoạn script, một chương trình nào đó cũng có thể xóa nó . Đây là nơi mà một named pipe phát huy tác dụng:
```bash
mkfifo myPipe
ls -l > myPipe
grep ".log" < myPipe
```

myPipe về mặt kỹ thuật là một file (mọi thứ trong Linux đều là file), vì vậy hãy thực hiện `ls -l` trong một thư mục trống mà chúng ta vừa tạo một pipe:
```bash
mkdir pipeFolder
cd pipeFolder
mkfifo myPipe
ls -l

->> prw-r--r-- 1 root root 0 Jul 25 11:20 m
```

Hãy nhìn kĩ bạn sẽ thấy: Lưu ý tự đầu tiên trong permission, nó được liệt kê dưới dạng một pipe, không phải file.

Một vài ví dụ với **named pipes**:

```bash
$ { ls -l && cat file3; } >mypipe &
$ cat <mypipe
# Output: Prints ls -l data and then prints file3 contents on screen
```

```bash
$ ls -l >mypipe &
$ cat file3 >mypipe &
$ cat <mypipe
#Output: This prints on screen the contents of mypipe.
```

```bash
$ { pipedata=$(<mypipe) && echo "$pipedata"; } &
$ ls >mypipe
# Output: Prints the output of ls directly on screen
```

```bash
$ export pipedata
$ pipedata=$(<mypipe) &
$ ls -l *.sh >mypipe
$ echo "$pipedata"
#Output : Prints correctly the contents of mypipe
```

## 9.5 In messages lỗi tới stderr
Thông báo lỗi thường được bao gồm trong một tập lệnh cho mục đích gỡ lỗi hoặc để cung cấp trải nghiệm người dùng phong phú. Đơn giản chỉ cần viết thông báo lỗi như sau:
```bash
cmd || echo 'cmd failed'
```

có thể hiệu quả với những trường hợp đơn giản nhưng không phải là cách thông thường. Trong ví dụ này, thông báo lỗi sẽ gây xấu output của command vì trộn cả lỗi và output thành công trong stdout. Tóm lại, messages lỗi sẽ đến stderr không phải stdout. Nó khá đơn giản:
```bash
cmd || echo 'cmd failed' >/dev/stderr
```
Hoặc một ví dụ khác
```bash
if cmd; then
 echo 'success'
else
 echo 'cmd failed' >/dev/stderr
fi
```
Trong ví dụ này, messages thành công sẽ được in trên stdout trong khi messages lỗi sẽ được in trên
stderr.

Một cách tốt hơn để in messages lỗi là xác định một function:
```bash
err(){
 echo "E: $*" >>/dev/stderr
}
```
Hãy thử sử dụng hàm này nhé:
```bash
err "My error message"
```

## 9.6 Redirecting multiple commands tới một file
```bash
{
 echo "contents of home directory"
 ls ~
} > output.txt
```

## 9.7 Redirecting STDIN
`<` đọc từ đối số bên phải và ghi vào đối số bên trái.

Để ghi một tệp vào STDIN, chúng ta nên đọc `/tmp/a_file` và ghi vào STDIN, tức là `0</tmp/a_file`

Lưu ý: Internal file descriptor được mặc định thành 0 (STDIN) cho `<`

```bash
$ echo "b" > /tmp/list.txt
$ echo "a" >> /tmp/list.txt
$ echo "c" >> /tmp/list.txt
$ sort < /tmp/list.txt
a
b
c
```
# Kết
Bài viết trên đã hướng dẫn cho bạn đọc về Redirection cũng như một số cách nó được sử dụng trong Linux. Hi vọng bạn đọc có thể sử dụng nó một cách hiệu quả trong công viêc

Bài viết được tham khảo từ
- https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html
- https://books.goalkicker.com/BashBook
- http://gocit.vn/bai-viet/tim-hieu-ve-dev-null
- https://blog.cloud365.vn/shell/bash-shel-danh-cho-nguoi-moi-bat-dau-p2

Bài viết tiếp theo mình sẽ đề cập đến **Control Structures** mong bạn đọc có thể đón xem. Xin cảm ơn.