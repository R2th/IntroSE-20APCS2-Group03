## 1. Giới thiệu
### Shell script là gì
**Câu lệnh shell** là một chương trình máy tính được thiết kế để chạy hoặc thực thi bởi Unix shell bởi một trình thông dịch theo dòng lệnh.

Bộ xử lý dòng lệnh phổ biến khi lập trình câu lệnh shell trên ubuntu là `bash`.
```shell
echo Hello World
```
Tập hợp các câu lệnh shell được viết trong 1 file có đuôi  `.sh` là **Shell Scripts**, chẳng hạn với nội dung file có tên là `first.sh`:
```bash
#!/bin/sh
# This is a comment!
echo Hello World        # This is a comment, too!
```
* `#!/bin/sh` luôn được viết ở dòng đầu tiên của file, không phải comment, mà là khai báo cho trình tương tác shell của hệ điều hành biết được đây là 1 chương trình shell.
* Trong một số trường hợp để thực thi file  `first.sh` cần phải cấp quyền thực thi nội dung cho nó `chmod 755 first.sh` (chmod là lệnh của unix)
* chuỗi` "Hello World"` chính là đối số, câu lệnh shell `echo` được dùng để in ra *1 chuỗi truyền vào*.

=> Thay vì chạy dòng lệnh shell ngay trên trình terminal(unix) : 
```bash
$ echo Hello World
Hello World
$
```
=> Ta có thể thực thi các dòng lệnh bên trong của cả 1 file `first.sh`:
```
$ chmod 755 first.sh
$ ./first.sh
Hello World
$
```
### Ưu Điểm
* Tự động hóa các hoạt động được thực hiện thường xuyên.
* Chạy chuỗi lệnh dưới dạng một lệnh.
* Nó có thể được thực thi trong mọi hệ điều hành giống với Unix mà không cần sửa đổi gì.
### Nhược điểm
* Tốc độ thực thi chậm so với bất kỳ ngôn ngữ lập trình nào
* Một tiến trình mới được khởi chạy cho hầu hết mọi lệnh shell được thực thi.
## 2. Sử dụng biến
*chuỗi truyền vào* trong ví dụ trên có thể được thay bởi **biến được khai báo**:
```bash
#!/bin/sh
MY_MESSAGE="Hello World"
echo $MY_MESSAGE
```
* `MY_MESSAGE` là tên biến tùy bạn đặt, miễn là format VIẾT_HOA kết hợp với gạch dưới
* Trong khi echo chấp nhận nhiều đối số truyền vào (không cần dùng `"`), một biến chỉ có thể lưu 1 giá trị chuỗi, do đó cần bao bên trong cặp dấu nháy kép `"Hello World"`.
---
Cũng có thể tương tác đặt **giá trị biến nhập vào từ bàn phím** bằng lệnh `read`:
```bash
#!/bin/sh
echo What is your name?
read MY_NAME
echo "Hello $MY_NAME - hope you're well."
```
---
Một số tham số dòng lệnh hay dùng:
* `$0`: Tên của file script.
* `$1` -> `$9`: Các tham số truyền vào
* `$#`: Số lượng của tham số truyền vào
* `$*`: Danh sách các tham số được truyền vào
(các trường hợp `$#` và `$*` sẽ không bao gồm `$0`)
```bash
#!/bin/sh
echo "Hello! I have $# parameters"
echo "My file name is $0"
echo "First parameter is $1"
echo "Second parameter is $2"
echo "All parameters are $@"
```
---
### Phạm vi sử dụng biến cũng cần được quan tâm:

**Biến chưa được khai báo sẽ có giá trị rỗng (vd: `myvar2.sh`):**
```bash
#!/bin/sh
echo "MYVAR is: $MYVAR

MYVAR="hi there"

echo "MYVAR is: $MYVAR"
```
=> kết quả là:
```bash
./myvar2.sh
MYVAR is:
MYVAR is: hi there
```
---
**Sẽ không thể trực tiếp sử dụng biến khai bao từ bên ngoài file:**
```bash
$ MYVAR=hello
$ ./myvar2.sh
MYVAR is:
MYVAR is: hi there
```
Trừ phi sử dụng `export`
```bash
$ export MYVAR
$ ./myvar2.sh
MYVAR is: hello
MYVAR is: hi there
```
--- 
Cũng không thể trực tiếp sử dụng biến bên trong file ở bên ngoài:
```bash
$ bash myvar2.sh
MYVAR is:
MYVAR is: hi there
$ echo $MYVAR

$
```
=> khi shell script được chạy xong, môi trường của nó sẽ bị phá hủy (có nghĩa là khi gọi biến trong tập lệnh shell ra bên ngoài ví dụ như terminal, biến trong shell đó sẽ là rỗng)

Vì vậy cũng cần sử dụng `export MYVAR` bên trong file, tuy nhiên ta còn có thể sử dụng `.`:
```bash
$ MYVAR=hello
$ echo $MYVAR
hello
$ . ./myvar2.sh
MYVAR is: hello
MYVAR is: hi there
$ echo $MYVAR
hi there
```
> sử dụng `.` ta sẽ không cần `export` biến ở cả trong và ngoài file
>  Từ đây bạn có thể hiểu nguyên lý sử dụng biến môi trường trong các file `.profile` hay `.bash_profile`
---

- Bài viết được tham khảo từ  [Shell Scripting Tutorial](https://www.shellscript.sh/).