### I. Tổng quan
:black_small_square: Đầu tiên chúng ta cùng tìm hiểu xem Shell script ở đây có nghĩa là gì nhé
```
Hiểu đơn giản Shell script là một tệp văn bản chứa một chuỗi các lệnh
(nó chấp nhận các lệnh từ chính bạn nhập vào, hoặc file hoặc output 
từ màn hình và thực thi nó).
Nếu bạn muốn chạy tất cả các lệnh bằng một câu lệnh duy nhất thay 
vì phải chạy từng dòng lệnh,
bạn có thể lưu các lệnh vào file dưới dạng text, rồi thực hiện chúng
chỉ bằng một câu lệnh duy nhất mà thôi.
```
:black_small_square: Ưu điểm
- Tự động hóa các hoạt động được thực hiện thường xuyên.
- Chạy chuỗi lệnh dưới dạng một lệnh.
- Nó có thể được thực thi trong mọi hệ điều hành giống với Unix mà không cần sửa đổi gì.

:black_small_square: Nhược điểm
- Tốc độ thực thi chậm so với bất kỳ ngôn ngữ lập trình nào
- Một tiến trình mới được khởi chạy cho hầu hết mọi lệnh shell được thực thi.
<hr>

### II. Tạo và thực thi
:black_small_square: Đối với shell script đầu tiên, ta sẽ chỉ viết một tập lệnh có nội dung "Hello World". Sau đó, ta sẽ triển khai dần những thứ khác dựa trên nó:
- Tạo một tệp example.sh (như mình mình sẽ tạo trong thư mục /home) như sau:
```bash
#!/bin/sh
# one comment!
echo Hello World        #  two comments
```
- Dòng đầu tiên cho Unix biết rằng tệp sẽ được thực thi bởi` /bin/sh`. Đây là vị trí tiêu chuẩn của [Bourne shell (sh)](https://en.wikipedia.org/wiki/Bourne_shell) trên mọi hệ thống Unix. Nếu bạn đang sử dụng `GNU/Linux`, `/bin/sh` thường là một liên kết tượng trưng đến bash.
- Dòng thứ hai bắt đầu bằng một ký hiệu đặc biệt: `#`. Điều này đánh dấu dòng này là một nhận xét, và nó bị bỏ qua hoàn toàn bởi `shell`.
Ngoại lệ duy nhất là khi dòng đầu tiên của tệp bắt đầu bằng `#! ` -  đây là một chỉ thị đặc biệt mà Unix yêu cầu cần có.
- Dòng thứ ba chạy một lệnh: `echo`, với hai tham số hoặc đối số - đầu tiên là "Hello"; thứ hai là "World".
Lưu ý rằng echo sẽ tự động đặt một khoảng trắng giữa các tham số của nó.
- Bây giờ hãy chạy `chmod 755 example.sh` để làm cho tệp văn bản có thể thực thi được và chạy `./example.sh` .
Màn hình của bạn sẽ trông như thế này:
```bash
➜ ~ ./example.sh 
Hello World
➜ ~
```
:black_small_square: Bây giờ hãy thực hiện một vài thay đổi:
- Đầu tiên, lưu ý rằng `echo` cho phép đặt một khoảng trống giữa các tham số của nó.
- Ta thử đặt thêm một vài khoảng trống giữa "Hello" và "World" và chạy lại thì đầu ra hoàn toàn giống nhau
- Điều này có nghĩa là `echo` không quan tâm nhiều hơn về khoảng cách giữa chúng. Bây giờ sửa đổi mã một lần nữa:
```bash
#!/bin/sh
# one comment!
echo "Hello      World"        #  two comments
```
- và kết quả sẽ là:
```bash
➜ ~ ./example.sh
Hello      World
➜ ~ 
```
- Lần này `echo` hiện đã được gọi chỉ với một đối số là chuỗi "Hello World". Vì thế, nó in chính xác chuỗi string ra.
- Điểm cần hiểu ở đây là `shell` phân tích các đối số trước khi chuyển chúng vào chương trình được gọi. Trong trường hợp này, nó loại bỏ các dấu ngoặc kép nhưng truyền chuỗi dưới dạng một đối số.
- Còn bạn, bạn hãy thử đoạn xem các trường hợp sau khi chạy code dưới đây xem chúng ta nhận được những gì  nhé
```bash
#!/bin/sh
# one comment!
echo "Hello      World"       #  two comments
echo "Hello World"
echo "Hello * World"
echo Hello * World
echo Hello      World
echo "Hello" World
echo Hello "     " World
echo "Hello "*" World"
echo `hello` world
echo 'hello' world
```
<hr>

### II. Biến
- Hãy nhìn lại ví dụ Hello World trước đó. Điều này có thể được thực hiện bằng cách sử dụng các biến.
- Lưu ý rằng không có khoảng trắng xung quanh dấu "="
```bash
 VAR=test #hoạt động
 VAR = test #không hoạt động
```
- Trong trường hợp đầu tiên, shell nhìn thấy dấu "=" và coi lệnh là một phép gán biến. Trong trường hợp thứ hai, shell giả định rằng VAR  là tên của một lệnh và cố gắng thực thi nó.
- Chúng ta đi vào ví dụ sau, hãy tạo một file mới: `var_exam.sh`
```bash
#!/bin/sh
HELLO_WORLD="Hello World"
echo $HELLO_WORLD
```
- Điều này gán chuỗi "Hello World" cho biến `HELLO_WORLD` sau đó cho echo out giá trị của biến ra màn hình. Một chuỗi có khoảng trắng phải được cần có dấu `""` để shell biết tất cả là một. Nếu không, shell sẽ cố thực thi lệnh `World` sau khi gán `HELLO_WORLD = Hello`.
- Shell không quan tâm đến các type của biến,  ta có thể lưu trữ chuỗi, số nguyên, số thực hay bất cứ điều gì bạn thích.
- Chúng ta có thể tương tác đặt tên biến bằng lệnh `read`:
```bash
#!/bin/sh
echo What do you do?
echo please input text:
read JOB
echo "$JOB, Wow! Good luck!"
```
<hr>

### III. Scope của biến
- Các biến trong shell không phải khai báo nhưng nếu ta cố thử đọc một biến không được khai báo, kết quả sẽ cho ta chuỗi rỗng, ta sẽ không nhận được cảnh báo hoặc lỗi gì ở đây.
```bash
#!/bin/sh
echo "MYNAME is: $MYNAME"
MYNAME="Nam"
echo "MYNAME is: $MYNAME"
```
- Bây giờ, hãy chạy nó và nhận được kết quả sau:
```bash
➜ ~ ./var_exam.sh 
MYNAME is: 
MYNAME is: Nam
➜ ~ 
```
-`MYNAME` ban đầu chưa được đặt bất kỳ giá trị nào. Sau đó, ta gán cho nó một giá trị và nhận được kết quả như mong đợi.
- Có một lệnh với cú pháp `export` có ảnh hưởng đến scope của các biến. Hãy thử chạy lệnh sau ở ngoài terminal:
```bash
➜ ~ MYNAME=TEST
➜ ~ ./var_exam.sh 
MYNAME is: 
MYNAME is: Nam
➜ ~ 
```
- Kết quả ở đây hiện tại là biến MYNAME vẫn chưa thay đổi được giá trị. Vậy ta còn thiếu gì ở đây? Ở đây, nếu muốn thay đổi được giá trị của nó ta có thể dùng command `export` như sau:
```bash
➜ ~ MYNAME=TEST  
➜ ~ export MYNAME
➜ ~ ./var_exam.sh
MYNAME is: TEST
MYNAME is: Nam
```
- Bây giờ hãy nhìn vào dòng 4 của tập lệnh: `MYNAME` đã được thay đổi giá trị. Nhưng không có cách nào điều này sẽ được chuyển trở lại vỏ tương tác của bạn. Hãy thử đọc giá trị của `MYNAME`:
```bash
➜ ~ echo $MYNAME
TEST
➜ ~ 
```
- Một khi shell script được chạy xong, môi trường của nó sẽ bị phá hủy (có nghĩa là khi gọi biến trong tập lệnh shell ra bên ngoài ví dụ như terminal, biến trong shell đó sẽ là rỗng). Ở ví dụ trên, `MYNAME` giữ giá trị `TEST` trong terminal của ta (vì ta đã gán nó bằng `TEST` ở ngoài terminal) nên khi gọi bằng `echo $MYNAME` ra ta nhận được là `TEST` chứ không phải `Nam` như trong shell script.
- Để lấy được các giá trị của biến trong shell ra bên ngoài terminal ta có thể dùng dấu `.` như sau:
```bash
➜ ~ MYNAME=TEST    
➜ ~ echo $MYNAME
TEST
➜ ~ . ./var_exam.sh 
MYNAME is: TEST
MYNAME is: Nam
➜ ~ echo $MYNAME
Nam
```

###### Cảm ơn các bạn đã đọc bài viết của mình!
<hr>

###### Tài liệu tham khảo:
[ShellScript](https://www.shellscript.sh)