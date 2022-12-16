###### Chúng ta tiếp tục cùng tìm hiểu những phần tiếp theo của shell script nhé !
##### :small_red_triangle_down:Case trong shellscript<br>
:black_small_square: Câu lệnh `case` cách hoạt động tương tự như `if .. then .. else`. Cú pháp của nó khá đơn giản:
```bash
#!/bin/sh

echo "How old are you?"
while :
do
  read INPUT_STRING
  case $INPUT_STRING in
	16)
		echo "Wowwwwwwwww"
        break
		;;
	17)
		echo "Yoooooooo!!!"
		break
		;;
	*)
		echo "I don't understand"
		;;
  esac
done
echo 
echo "Thank you so much!"
```
- Kết quả trả về:
```bash
How old are you?
16
Wowwwwwwwww

Thank you so much!
➜  ~ ./var_exam.sh
How old are you?
17 
Yoooooooo!!!

Thank you so much!
➜  ~ ./var_exam.sh
How old are you?
gdg
I don't understand
```
- `case $INPUT_STRING` - ở đây ta kiểm tra giá trị của biến `INPUT_STRING`
- Các option được liệt kê và theo sau nó là một dấu `)` ví dụ như `16)` và `17)`.
- Điều này có nghĩa là nếu `INPUT_STRING` trùng với 16 thì code bên trong trường hợp đó sẽ được thực thi, cho đến dấu `;;`
- Nếu INPUT_STRING không trùng với trường hợp 16 hay 17 thì nó sẽ rơi vào trường hợp còn lại (trong ví dụ trên là `*)`) thì thông báo `I don't understand` được in và vòng lặp vẫn tiếp tục. 
- Toàn bộ câu lệnh `case` được kết thúc bằng câu lệnh `esac`.Sau đó chúng ta kết thúc vòng lặp while bằng câu lệnh `done`.
##### :small_red_triangle_down: Variables trong shellscript (Phần 2)<br>
- **Nhóm biến `$0..$9` và `$#`.**
- `$0` - Tên của tập lệnh Bash.
- `$1- $9 `- 9 đối số đầu tiên cho tập lệnh Bash. (như đã đề cập ở trên)
- `$#` - Có bao nhiêu đối số được truyền cho tập lệnh Bash.
- `$@` - Tất cả các đối số được cung cấp cho tập lệnh Bash.
- `$?` - Trạng thái thoát của quy trình chạy gần đây nhất.
- `$$` - ID tiến trình của tập lệnh hiện tại.
- `$USER` - Tên người dùng của người dùng đang chạy tập lệnh.
- `$HOSTNAME` - Tên máy chủ của máy mà tập lệnh đang chạy.
- `$SECONDS` - Số giây kể từ khi tập lệnh được bắt đầu.
- `$RANDOM` - Trả về một số ngẫu nhiên khác nhau mỗi lần được nhắc đến.
- `$LINENO` - Trả về số dòng hiện tại trong tập lệnh Bash.
- Chúng ta sẽ đi vào ví dụ để hiểu rõ hơn nhé
```bash
#!/bin/sh
echo "Hello! I have $# parameters"
echo "My file name is $0"
echo "First parameter is $1"
echo "Second parameter is $2"
echo "All parameters are $@"
```
- Kết quả trả về là:
```
➜  ~ ./variables.sh
Hello! I have 0 parameters
My file name is ./variables.sh
First parameter is 
Second parameter is 
All parameters are
```
- Nếu ta thử truyền cho nó 3 tham số ta sẽ được kết quả như sau:
```
➜  ~ ./variables.sh test hello bye
Hello! I have 3 parameters
My file name is ./variables.sh
First parameter is test
Second parameter is hello
All parameters are test hello bye
```
- Lưu ý rằng giá trị của `$0` thay đổi tùy thuộc vào cách tập lệnh được gọi. Để chỉ cho output file name ra ngoài màn hình ta có thể dùng: 
```bash
echo "My file name is `basename $0`"
```
- `$#` và `$1 .. $9` được đặt tự động bởi shellscript.
- Chúng ta có thể lấy hơn 9 tham số bằng cách sử dụng lệnh `shift`:
```bash
#!/bin/sh
while [ "$#" -gt "0" ]
do
  echo "\$1 is $1"
  shift
done     
```
- Ví dụ:
```bash
➜  ~ ./variables.sh 1 2 3 4 5 6 7 8 9 10 11
More parameter is 1
More parameter is 2
More parameter is 3
More parameter is 4
More parameter is 5
More parameter is 6
More parameter is 7
More parameter is 8
More parameter is 9
More parameter is 10
More parameter is 11
```
- Tập lệnh trên sử dụng `shift` cho đến khi `$#` giảm đến 0.
<hr>

##### :small_red_triangle_down: Số học (Arithmetic)<br>
:black_small_square: Câu lệnh `let`<br>
- `let` là một hàm dựng sẵn của Bash cho phép chúng ta thực hiện số học đơn giản. Nó tuân theo định dạng cơ bản
( lưu ý ở đây ta sẽ dùng `#!/bin/bash` thay cho `#!/bin/sh` do nó không hỗ trợ `let` ).
```bash
let <arithmetic expression>
```
- Ví dụ:
```bash
#!/bin/bash

let number=5+5
echo $number #10

let "number = 5 + 5"
echo $number #10

let number++
echo $number #11

let "number = 5 * 5"
echo $number #25

let "number = $1 + 30"
echo $number #30 + first command line argument
```
**- Ở ví dụ trên:**
- Dòng 4 - Đây là định dạng cơ bản. Lưu ý rằng nếu ta không đặt dấu ngoặc kép quanh biểu thức thì nó phải được viết không có khoảng trắng.
- Dòng 7 - Lần này ta đã sử dụng các trích dẫn cho phép ta loại bỏ biểu thức để làm cho nó dễ đọc hơn.
- Dòng 10 - Đây là một cách để tăng giá trị của biến `number` lên 1. Nó giống như viết "number = number + 1".
- Dòng 16 - Ta cũng có thể bao gồm các biến khác trong biểu thức.
- Và kết quả trả về:
```
➜  ~ ./arithmetic.sh 5
10
10
11
25
35
```
- Ngoài ra, bạn cũng có thể thử với các toán tử khác như:
```bash
+, -, \*, / #cộng, trừ, nhân, chia

var ++ #Tăng biến var thêm 1

var-- #Giảm var biến 1

% #Trả lại phần còn lại sau khi chia
```
<hr>


:black_small_square: Câu lệnh `expr`<br>
```bash
expr item1 operator item2
```
- `expr` tương tự như `let` tuy nhiên thay vì nó lưu kết quả vào một biến thì nó sẽ in câu trả lời ra ngoài màn hình luôn.
- Không giống như `let`, nó ko cần đặt biểu thức trong dấu ngoặc kép. 
- Ta cũng cần phải có khoảng trắng giữa các item trong biểu thức.
- Ví dụ:
```bash
#!/bin/bash

expr 5 + 5

expr "5 + 5"

expr 5+5

expr 5 \* $1

expr 13 % 2

number=$( expr 10 - 3 )
echo $number # 7
```
- Dòng 4 - Đây là định dạng cơ bản. Lưu ý rằng phải có khoảng trắng giữa các mục và không có dấu ngoặc kép.
- Dòng 6 - Nếu chúng ta đặt dấu ngoặc kép quanh biểu thức thì biểu thức sẽ không được thực hiện mà thay vào đó được in.
- Dòng 8 - Nếu chúng ta không đặt khoảng trắng giữa các mục của biểu thức thì biểu thức sẽ không được thực hiện mà thay vào đó được in.
- Dòng 10 - Một số ký tự có ý nghĩa đặc biệt với Bash, vì vậy chúng ta phải thoát khỏi chúng (đặt dấu gạch chéo ngược trước) để loại bỏ ý nghĩa đặc biệt của chúng.
- Dòng 12 - Ở đây ta cho phép ta in ra số dư của phép chia trên.
- Dòng 14 - Lần này ta sử dụng expr trong lệnh thay thế để lưu kết quả vào biến `number`.
- Kết quả trả về:
```bash
➜  ~ ./arithmetic.sh 5
10
5 + 5
5+5
25
1
7
```
<hr>

Bài viết lần này, có lẽ mình xin kết thúc tại đây thôi <br>
Trong bài sau, mình sẽ tiếp tục nghiên cứu thêm về Arithmetic hay Function,... của Shell Script nhé!<br>
Cảm ơn các bạn đã đọc bài viết của mình