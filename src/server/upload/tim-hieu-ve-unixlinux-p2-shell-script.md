# Định nghĩa
Shell là chương trình giao tiếp với người dùng, nghĩa là shell nhận lệnh chúng ta nhập từ bàn phím và thực thi nó. Còn shell script sẽ là một chuỗi các lệnh được viết trong file plain text. Shell script thì giống như batch file trong MS-DOS nhưng mạnh hơn.

Vậy tại sao chúng ta nên viết shell script?

*  Có thể nhạn input từ user, file hoặc output từ màn hình
*  Tiện lợi để tạo nhóm lệnh riêng
*  Tiết kiệm thời gian
*  Tự động thực thi một vài công việc thường xuyên

# Tạo shell script đơn giản
Đầu tiên thì các file shell script thường có đuổi là `.sh`. Giờ chúng ta sẽ tạo ra file `script.sh`. Trước khi thêm bất kì script gì vào file shell script thì bạn sẽ cần khai báo rằng một shell script chuẩn bị được thực thi. Việc này được thực hiên bằng một cấu trúc shebang, ví dụ:

```
#!/bin/sh
```

Ví dụ trong file `script.sh` của mình:
```
#!/bin/bash

echo "This is my new shell script"
ls -l
```

Để chạy shell script thì các bạn dùng lệnh 
```
./ten-file.sh
```

Và kết quả sẽ là:

![](https://images.viblo.asia/498048ac-b124-444e-882d-ea12a9456bf4.png)

# Biến trong shell script
Tên của biến trong shell script cũng sẽ có những quy định khá giống với trong các ngôn ngữ lập trình. Tên của một biến chỉ được chứa các kí tự a tới z hoặc A tới Z, số 0 - 9, dấu gạch dưỡi `_`.  Theo quy ước thì các biến sẽ được viết in hoa. Và hãy nhớ rằng đừng để có dấu cách khi bạn khai bao biến (VAR = 1 - như này sẽ không được nha)

## Sử dụng biến

Giờ hãy tử một ví dụ đơn giản chút nhỉ

```
#!/bin/bash

MESSAGE='Hello mah friend'
echo $MESSAGE
```

Kết quả
```
Hello mah friend
```

Shell sẽ không quan tâm tới kiểu biến của bạn, bạn sẽ không phải khai bảo kiểu cho biến, thực tế thì sẽ chẳng có sự khác nhau nào với các biến sau:
```
#!/bin/bash

MY_NUMBER=1
MY_SECOND_NUMNER='1'

echo $MY_NUMBER + 1
echo $MY_SECOND_NUMNER + 1
```

Kết quả:
```
1 + 1
1 + 1
```

## Read only
Khi một biến được gán là read only thì bạn sẽ không thể thay đổi giá trị của nó

```
#!/bin/sh

MESSAGE="Hello world"
READ_ONLY_VAR="You can't change this"
echo $MESSAGE
echo $READ_ONLY_VAR
readonly READ_ONLY_VAR
MESSAGE="Hi"
echo $MESSAGE
READ_ONLY_VAR="Changed"
```

Kết quả:
```
Hello world
You can't change this
Hi
./script.sh: 10: ./script.sh: READ_ONLY_VAR: is read only
```

## Xóa biến
Đẻ xóa một biến thì chúng ta sử dụng `unset`, và chúng ta cũng không thể unset một biến read only

```
#!/bin/sh

MESSAGE="Hello world"
READ_ONLY_VAR="You can't change this"
echo $MESSAGE
unset MESSAGE
echo $MESSAGE
readonly READ_ONLY_VAR
unset READ_ONLY_VAR
````

Kết quả
```
Hello world

./script.sh: 9: unset: READ_ONLY_VAR: is read only
```

## Scope của biến
Biến bên trong shell script không nhất thiết phải được định nghĩa, nếu bạn đang cố đọc một biến chưa được định nghĩa thì nó sẽ chỉ trả về một string rỗng

```
#!/bin/sh

echo "Message is: $MESSAGE"
MESSAGE="Lakad Matatag"
echo "Message is: $MESSAGE"
```

Kết quả:
```
Message is: 
Message is: Lakad Matatag
```

Giờ chúng ta sẽ thử khai báo bên ngoài file shell script xem sao nhé
![](https://images.viblo.asia/34667578-ad50-46ec-8d8b-1bf569bd5e01.png)

Khi bạn chạy file shell script, một shell mới sẽ được sinh ra. Do đó chúng ta cần phải export biến để có thể tương tác giữa các shell khác nhau

![](https://images.viblo.asia/05985468-8f44-4ea5-a7e7-f5c8ecebb7dc.png)

Khi mà shell script chạy xong, môi trường của nó sẽ bị hủy, nghĩa là ở trong file shell script mình có gán 
```
MESSAGE="Lakad Matatag"
``` 

Nhưng khi file shell script chạy xong, mình `echo $MESSAGE` thì vẫn sẽ ra kết quả là `Helloooo`. Để có thể nhận được sự thay đổi từ shell script thì bạn cần chạy lệnh sau
```
. ./script.sh
```

![](https://images.viblo.asia/9e02f01b-f9fa-45ba-aa58-761495849ca2.png)

## Các biến đặc biệt
Shell script cũng có những ký tự đặc biệt mà bạn không nên sử dụng



| Biến| Nội dung |
| -------- | -------- |
| $0    | Tên file của script hiện tại     | 
| $n    | Biến này tương ứng với số tham số được truyền khi shell script thực thi (Tham số đầu tiên sẽ là $1, tham số thứ 2 là $2)     |
| $$    | ID của tiến trình đang chạy     |
| $#    | Số các tham số cung cấp cho 1 script     |
| $*    | Tất cả các tham số được trích dẫn kép. Nếu một script nhận hai tham số, $* là tương đương với $1 $2.     | 
| $@    | Tất cả các tham số được trích dẫn kép riêng rẽ. Nếu một script nhận hai tham số, $* là tương đương với $1 $2.     | 
| $?    | Trạng thái thoát của script trước   | 
| $!   | ID của tiến trình của lệnh background trước.    | 
| $_   | Tham số cuối cùng của lệnh trước    | 


Thử chạy file script này xem sao
```
#!/bin/sh

echo "Process ID of shell = $$"
echo "Program name = $0"
echo "Number of args = $#"
echo "Argument 1 = $1"
echo "Argument 2 = $2"
echo "Complete list of arguments = $*"
echo "Complete list of arguments = $@"
echo "Proccess ID of last command = $!"
echo "The last argument of the previous command = $_"
```

```
 ./script.sh arg1 arg2 arg3 arg4 arg5
```

Kết quả

```
Process ID of shell = 11495
Program name = ./script.sh
Number of args = 5
Argument 1 = arg1
Argument 2 = arg2
Complete list of arguments = arg1 arg2 arg3 arg4 arg5
Complete list of arguments = arg1 arg2 arg3 arg4 arg5
Proccess ID of last command = 
The last argument of the previous command = ./script.sh
```

Các bạn có thể sẽ thắc mắc: "Ở, thế cái `$*` và `$@` khác gì nhau?". Thực tết thì `$*` là 1 chuỗi còn `$@` là 1 mảng. Hãy thử với ví dụ sau
```
#!/bin/sh

echo "Using \"\$*\":"
for a in "$*"; do
    echo $a;
done

echo ----------- "\nUsing \$*:"
for a in $*; do
    echo $a;
done

echo ----------- "\nUsing \"\$@\":"
for a in "$@"; do
    echo $a;
done

echo ----------- "\nUsing \$@:"
for a in $@; do
    echo $a;
done  
```

```
./script.sh arg1 arg2 "arg3 arg4"
```

Kết quả:
```
Using "$*":
arg1 arg2 arg3 arg4
----------- 
Using $*:
arg1
arg2
arg3
arg4
----------- 
Using "$@":
arg1
arg2
arg3 arg4
----------- 
Using $@:
arg1
arg2
arg3
arg4
```

Bài viết hôm nay dừng lại ở đây thôi. Hẹn mọi người lần sau nha.

Tham khảo

* https://www.bogotobogo.com/Linux/linux_shell_programming_tutorial3_special_variables.php
* https://www.shellscript.sh/variables1.html