Chào các bạn, trong phần trước chúng ta đã tìm hiểu khái niệm `bash script` là gì, cách hoạt động, cú pháp khai báo biến và tham số, cũng như viết một câu lệnh điều kiện như thế nào. Hy vọng các bạn cảm thấy hứng thú để chúng ta tiếp tục phần 2 trong bài hôm nay. Phần này mình xin giới thiệu đến các bạn cách sử dụng vòng lặp, các trình thay thế, và cách khai báo function trong `shell` như thế nào.
## Vòng lặp
Như các bạn thừa biết, vòng lặp để lặp đi lặp lại một hoặc nhóm câu lệnh nào đó cho đến khi gặp điều kiện dừng vòng lặp lại. Có rất nhiều loại vòng lặp trong bash script.
### Vòng lặp for
Các bạn tạo file `test.sh` như phần trước và cấp quyền `execute` cho nó bằng lệnh `chmod +x test.sh`.

Ví dụ ta cần tính giai thừa của 5, cú pháp như sau:
```
#!/bin/bash

number=5
result=1

for ((i=1; i<=$number; i++))
do
	result=$(($result * $i))
done

echo $result
```

Sau khi chạy lệnh > ./test.sh kết quả trả về là 120 = 5!

### Vòng lặp for với khoảng số
Để lặp số dùng vòng lặp for, trong shell còn có một cách viết khách cách thông thường đó là dùng khoảng số:
```
kq=1

for number in {1..5}
do
  kq=$(($kq * $number))
done

echo $kq
```
Kết quả trả về cũng là 120

Chưa hết, trong shell các bạn còn biết nó có thể in kết quả của một command line nào đó ra file hoặc hiển thị trên terminal.
Ví dụ muốn in ra danh sách các file, thư mục trong thư mục hiện tại ta dùng vòng lặp for như sau:
```
for i in $(ls)
do
  echo $i
done
```
Các bạn có thể chạy thử để thấy cả đống thư mục và file trong thư mục đang chạy test.sh được list ra.
### Vòng lặp while
Vẫn trong bài toán tính giai thừa của 5, với while ta làm như sau:
```
# Tính giai thừa của 5
kq=1
i=1

while [ $i -le 5 ]
do
  kq=$(($kq * $i))
  ((i++))
done

echo $kq
```
> Trong đó : -le là kiểm tra xem biến i <= 5

Cũng không khó hiểu lắm về thuật toán vì nó khá giống các ngôn ngữ lập trình khác, chỉ khó nhớ cái cú pháp viết, các bạn cần chú ý vì viết sai là sẽ báo lỗi ngay.

## Các trình thay thế trong shell
Hiểu đơn giản đó là cách để bạn có thể xử lý các ký tự đặc biệt, ví dụ:
```
a=10
b=20
echo -e "Value of a is $a \n and value of b is $b"
```
> Kết quả in ra sẽ là
> 
> Value of a is 10
> 
>   and value of b is 20
>   
Vậy `-e` cho phép bạn hiểu ký tự `\n` là ký tự xuống dòng. Bỏ `-e` để thấy sự khác biệt. Tương tự với `\n` bạn có thể thao tác với các ký tự đặc biệt khác.
### Thay thế lệnh
Hãy xem qua ví dụ sau
```
DATE=`date`
echo "Date is $DATE"
```
> Kết quả :
> Date is Thứ sáu, 14 Tháng 9 năm 2018 05:50:00 +07

Từ ví dụ bạn có thể thấy cú pháp \`command\` (dấu nháy dưới phím Esc) cho phép bạn lấy kết quả của 1 command gán vào 1 biến.

### Trình thay thế biến
Các bạn xem ví dụ sau:
```
#!/bin/sh

echo ${var:-"Variable is not set"}
echo "1 - Value of var is ${var}"

echo ${var:="Variable is not set"}
echo "2 - Value of var is ${var}"

unset var
echo ${var:+"This is default value"}
echo "3 - Value of var is $var"

var="Prefix"
echo ${var:+"This is default value"}
echo "4 - Value of var is $var"

echo ${var:?"Print this message"}
echo "5 - Value of var is ${var}"
```
> Kết quả
> 
> Variable is not set
> 
> 1 - Value of var is
> 
>Variable is not set
>
>2 - Value of var is Variable is not set
>
>3 - Value of var is
>
>This is default value
>
>4 - Value of var is Prefix
>
>Prefix
>5 - Value of var is Prefix
>


Việc thực hiện thay thế giá trị của biến được thể hiện trong bảng sau đây:


| Mẫu | Mô tả |
| -------- | -------- |
|\${var}     | Thay thế giá trị của var     |
|\${var:-word}|	Nếu var là null hoặc unset, thì word được thay thế cho var. Giá trị của var không thay đổi.
|\${var:=word}	|Nếu var là null hoặc unset, var được thiết lập là giá trị của word .
|\${var:?message}|	Nếu var là null hoặc unset, message được in là lỗi. Lệnh này kiểm tra xem các biến có được thiết lập đúng không.
|\${var:+word}	|Nếu var được thiết lập, word được thay thế cho var. Giá trị của var không thay đổ


## Function
cũng như các ngôn ngữ lập trình khác, shell cũng cho phép khai báo function để thực hiện một nhóm các lệnh và trả về cho chúng ta kết quả có thể sử dụng tùy từng mục đích.
Syntax khá đơn giản:
```
function_name () { 
   list of commands
}
```
Ví dụ :
```
said () {
	echo "Hello Phuc"
}

said
```
> Kết quả:
> Hello Phuc
> 
Cách sử dụng có vẻ khá giống javascript đúng không?
Truyền tham số cho function thì hơi khác một chút, bạn phải làm như sau:
```
said () {
	echo "Hello $1 $2"
}

said Phuc Phuong
```
> Kết quả: Hello Phuc Phuong
> 
Vậy làm sao chúng ta có thể return kết quả từ một hàm đây:
```
 sum () {
 	a=$(($1 + $2))
	return $a
}

sum 10 20

ret=$?

echo "value is $ret"
```
> Kết quả: value is 30
> 
Gọi một function trong một function khác cũng khá đơn giản
```
number_one () {
   echo "This is the first function"
   number_two
}

number_two () {
   echo "This is now the second function"
}

number_one
```

> Kết quả:
> 
> This is the first function
> 
> This is now the second function

## Kết luận
Trên đây là tất cả những kiến thức còn lại của shell script mà mình muốn chia sẻ với các bạn trong bài này, đó là những kiến thức cơ bản cũng như thường dùng nhất với shell, hy vọng sẽ giúp các bạn phần nào trong công việc mỗi khi phải tự viết một file `bash`. Cảm ơn các bạn!

## Tài liệu tham khảo
https://techmaster.vn/

https://www.shellscript.sh/