# 6. Biến
Shell có một bộ các biến sẵn sàng cho ta sử dụng, và hầu hết không có giá trị được gán. Đã được nhắc qua trong [Phần 1](https://viblo.asia/p/tim-hieu-shell-script-p1-L4x5xO4rlBM#_2-su-dung-bien-4):

Một số tham số dòng lệnh hay dùng:
* `$0`: Tên của file script.
* `$1` -> `$9`: Các tham số truyền vào
* `$#` - Số lượng của tham số truyền vào
* `$*` - Danh sách các tham số được truyền vào (các trường hợp `$#` và `$*` sẽ không bao gồm `$0`)
* `$?` - Trạng thái thoát của quy trình chạy gần đây nhất.
* `$$` - ID tiến trình của tập lệnh hiện tại.
* `$!` là PID của tiến trình cuối cùng được chạy, giúp theo dói tiến trình job đang chạy.
* $USER - Tên người dùng của người dùng đang chạy tập lệnh.
* $HOSTNAME - Tên máy chủ của máy mà tập lệnh đang chạy.
* $SECONDS - Số giây kể từ khi tập lệnh được bắt đầu.
* $RANDOM - Trả về một số ngẫu nhiên khác nhau mỗi lần được nhắc đến.
* $LINENO - Trả về số dòng hiện tại trong tập lệnh Bash.
* $BASH_VERSION - vesion của trình shellscript hiện tại
* $BASH - Thư mục cài đặt bash
* $HOME - thư mục home
* $PATH - danh sách các đường dẫn môi trường (vd: sau khi cài ruby thì môi trường sẽ được thêm vào đường dẫn rvm tới thư mục cài ruby, vậy là có thể chạy các câu lệnh shell `ruby --version`, `rvm list`, `ruby -h` ...  của phần mềm ruby. Tương tự với git, curl, python3, mysql, elastichsearch ... hay bất cứ phần mềm nào)

Và ta chỉ việc gọi tên các biến sẵn có ở trong file script `filename.sh`

```bash
#!/bin/sh
echo "Hello! I have $# parameters"
echo "My file name is $0"
echo "First parameter is $1"
echo "Second parameter is $2"
echo "All parameters are $@"
```
Chúng có đặc điểm là bao gồm những thông tin hữu dụng khi viết kịch bản, để có thể biết được môi trường xung quanh kịch bản đang chạy.

Mặc định các tham số truyền vào được phân định bởi dấu SPACE, TAB, NEWLINE, tuy nhiên điều thú vị là ta có thể thay đổi nó.
(Internal Field Separator) , dùng IFS sẽ eazy hơn trong việc copy paste theo mẫu không chuẩn. VD sử dụng dấu `:` là phân cách các tham số:
```bash
old_IFS="$IFS"
IFS=:
echo "Please input some data separated by colons ..."
read x y z
IFS=$old_IFS
echo "x is $x y is $y z is $z"
```
=> Có thể chạy script và nhập các giá trị phân cách nhau bằng dấu `:`. Một số ký tự đặc biệt có thể [không được trình bộ xử lý dòng lệnh bash giải thích](https://viblo.asia/p/tim-hieu-shell-script-p2-63vKjDoNl2R#_ky-tu-can-duoc-giai-thich-escape-2), đó là lý do đặt "$IFS" trong cặp dấu nháy `"`, `old_IFS="$IFS"` thay vì `old_IFS=$IFS`.

---
Một lưu ý khi sử dụng biến trong lập trình shell đó là trành nhầm lẫn hoặc các giá trị underfine (null) dẫn đến chương
trình bị ảnh hưởng.
```bash
#!/bin/sh
echo -en "What is your name [ `whoami` ] "
read myname
if [ -z "$myname" ]; then
  myname=`whoami`
fi
echo "Your name is : $myname"
```
`whoami` là một command lấy ra `$USER` hiện tại. Đoạn script trên thực hiện việc kiểm tra xem tên nhập vào có tồn tại hay không và gán giá trị `whoami` cho biến $myname. Sau đó in ra biến `$myname`.

ngắn gọn hơn khi biến không được đặt chỉ cần dung cú pháp `:-`
```bash
echo -en "What is your name [ `whoami` ] "
read myname
echo "Your name is : ${myname:-`whoami`}"
```
Việc cần làm chỉ là thay thế giá trị mặc định, như  `echo "Your name is : ${myname:-John Doe}"` chẳng hạn.

Cũng có thể gán giá trị amwcj định cho biến bằng cú pháp `:=`: 
```bash
echo "Your name is : ${myname:=John Doe}"
```
Điều này nghĩa là bất cứ truy cập nào tiếp theo tới biến $myname đều sẽ lấy được giá trị đã gán. (nhập vào, hoặc là "John Doe")

---
# 7. Chương trình chạy ngoài
Là chương trình thường dùng các lệnh buildin sẵn như echo, which, test. cũng như rất nhiều lệnh tiện ích của Hệ điều hành Unix như tr, grep, expr, cut ...
Dấu backtick (`) thwuowng được dùng để liên kết với command "nội suy" 
```bash
$ MYNAME=`grep "^${USER}:" /etc/passwd | cut -d: -f5`
$ echo $MYNAME
Steve Parker
```
=> tìm tên trong danh sách /etc/passwd
Dấu backstick có thể cải thiện hiệu suất nếu script chứa câu lệnh chạy chậm:
```bash
#!/bin/sh
find / -name "*.html" -print | grep "/index.html$"
find / -name "*.html" -print | grep "/contents.html$"
```
Nên viết thành
```bash
#!/bin/sh
HTML_FILES=`find / -name "*.html" -print`
echo "$HTML_FILES" | grep "/index.html$"
echo "$HTML_FILES" | grep "/contents.html$"
```
=> nháy kép bao ngoài `$HTML_FILES` giúp ngăn ký tự xuống dòng khi đọc các files, và lệnh `grep` sẽ đọc trong một dòng text siêu dài thay vì phải đọc một dòng trên một file.

Với cách này, chạy lệnh find chậm một lần, được phỏng đoán là có thể giảm một nửa thời gian chạy (giảm độ phức tạp của giải thuật).

---
Trong [phần cuối](https://viblo.asia/p/tim-hieu-shell-script-p4end-oOVlYzLB58W) tôi sẽ mô tả cách khai báo `Function` , cũng như các gợi ý, lời khuyên, một số lệnh tham khảo để sử dụng trong shell (=, -gt. -le, ... bla bla) để có thể có kiến thức tương tác tốt với shell khi cần.