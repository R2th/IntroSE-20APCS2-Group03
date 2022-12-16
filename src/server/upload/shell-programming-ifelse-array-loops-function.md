Xin chào các bạn, tiếp tục với series tìm hiểu về Shell programming, bài viết này chúng ta sẽ cùng nhau tìm hiểu về câu lệnh điều kiện, mảng, vòng lặp, function...

## 1. Câu lệnh điều kiện
- Nếu bạn đã biết đến câu lệnh điều kiện trong các ngôn ngữ lập trình khác thì trong Shell cũng tương tự như vậy. Nó chỉ khác duy nhất về cú pháp mà thôi.
- Có 5 câu lệnh điều kiện trong lập trình Shell:
    - if statement
    - if-else statement
    - if..elif..else..fi statement
    - if..then..else..if..then..fi..fi..(Nested if)
    - switch statement
### Syntax
**If statement**
```
if [ expression ]
then
   statement
fi
```

**if-else statement**
```
if [ expression ]
then
   statement1
else
   statement2
fi
```

**if..elif..else..fi statement**
```
if [ expression1 ]
then
   statement1
   statement2
   .
   .
elif [ expression2 ]
then
   statement3
   statement4
   .
   .
else
   statement5
fi
```

**if..then..else..if..then..fi..fi..(Nested if)**
```
if [ expression1 ]
then
   statement1
   statement2
   .
else
   if [ expression2 ]
   then
      statement3
      .
   fi
fi
```

**switch statement**
```
case  in
   Pattern 1) Statement 1;;
   Pattern n) Statement n;;
esac
```

## 2. Mảng trong Shell
- Trong bài trước chúng ta đã tìm hiểu về **shell variables** dùng để lưu trữ một giá trị, được gọi là biến vô hướng. Shell còn hỗ trợ một loại biến khác đó là **array variable**. Các quy tắc đặt tên biến cũng được áp dụng cho đặt tên mảng.
####  Định nghĩa mảng
- Define: `array_name[index]=value`
    - array_name: Tên của mảng
    - index: là chỉ mục của item trong mảng
    - value: giá trị tại chỉ mục đó.
- Ví dụ:
```
NAME[0]="Zara"
NAME[1]="Qadir"
NAME[2]="Mahnaz"
NAME[3]="Ayan"
NAME[4]="Daisy"
```
- Nếu chúng ta đang sử dụng [KornShell](https://en.wikipedia.org/wiki/KornShell) cú pháp khởi tạo mảng: `set -A array_name value1 value2 ... valuen`
- Nếu chúng ta đang sử dụng [BashShell](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) cú pháp khởi tạo mảng: `array_name=(value1 ... valuen)`
####  Truy cập giá trị mảng
- Cú pháp để truy cập giá trị của mảng: `${array_name[index]}`
- Xem xét ví dụ sau, tạo file test.sh:
```
#!/bin/bash

NAME[0]="Zara"
NAME[1]="Qadir"
NAME[2]="Mahnaz"
NAME[3]="Ayan"
NAME[4]="Daisy"
echo "First Index: ${NAME[0]}"
echo "Second Index: ${NAME[1]}"
```
- Kết quả ví dụ trên:
```
$./test.sh
First Index: Zara
Second Index: Qadir
```
- Chúng ta cũng có thể truy cập tất cả các item trong mảng với cú pháp sau:
```
${array_name[*]}
${array_name[@]}
```
- Xem ví dụ sau:
```
#!/bin/bash

NAME[0]="Zara"
NAME[1]="Qadir"
NAME[2]="Mahnaz"
NAME[3]="Ayan"
NAME[4]="Daisy"
echo "First Method: ${NAME[*]}"
echo "Second Method: ${NAME[@]}"
```
- Kết quả:
```
$./test.sh
First Method: Zara Qadir Mahnaz Ayan Daisy
Second Method: Zara Qadir Mahnaz Ayan Daisy
```

## 3. Vòng lặp
- Vòng lặp là một công cụ lập trình mạnh mẽ cho phép chúng ta thực hiện một tập lệnh một cách liên tục. Chúng ta sẽ tìm hiểu các vòng lặp mà Shell hỗ trợ cho các lập trình viên:
    - The while loop
    - The for loop
    - The until loop
    - The select loop
- Có thể thay đổi trạng thái của vòng lặp bằng cách sử dụng lệnh **[break, continue](https://www.tutorialspoint.com/unix/unix-loop-control.htm)** như các ngôn ngữ khác.
- Chúng ta cũng có thể sử dụng các vòng lặp lồng nhau.

### While loop
- Đầu tiên, chúng ta sẽ tìm hiểu về vòng lặp while. Về cách dùng tương tự như các ngôn ngữ như C++, java...
- Syntax:
```
while command
do
   Statement(s) to be executed if command is true
done
```
- Ví dụ: In ra các số nguyên nhỏ hơn 10.
```
#!/bin/bash

a=0
while [ $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
```
- Kết quả:
```
0
1
2
3
4
5
6
7
8
9
```

### For loop
- Vòng lặp thứ 2 chúng ta sẽ tìm hiểu đó là vòng lặp For.
- Syntax:
```
for var in word1 word2 ... wordN
do
   Statement(s) to be executed for every word.
done
```
- Ví dụ: 
```
#!/bin/bash

for var in 0 1 2 3 4 5 6 7 8 9
do
   echo $var
done
```
- Kết quả:
```
0
1
2
3
4
5
6
7
8
9
```

### Until loop
- Một vòng lặp nghe tên khá lạ, chúng ta cùng xem nó sử dụng như thế nào nhé.
- Vòng lặp until cho phép thực hiện một tập lệnh cho đến khi một điều kiện trở thành đúng. Có nghĩa là nếu điều kiện false thì tập lệnh sẽ được thực thi, còn nếu điều kiện là true thì sẽ không có câu lệnh nào được thực thi. Đến đây có thể thấy **until loop** giống như vòng lặp **do...while** trong C++, Java...
- **Until loop** luôn luôn thực thi ít nhất 1 lần.
- Syntax:
```
until command
do
   Statement(s) to be executed until command is true
done
```
- Ví dụ: Hiển thị các số từ 0 đến 9
```
#!/bin/bash
a=0
until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
```

### Select loop
- Lại là một cái tên khá mới mẻ.
- Vòng lặp Select giúp tạo ra một menu được đánh số theo thứ tự, giúp người dùng có thể lựa chọn.
- Syntax:
```
select var in word1 word2 ... wordN
do
   Statement(s) to be executed for every word.
done
```
- Ví dụ:
```
#!/bin/bash

PS3='Please enter your choice: '
select DRINK in tea cofee water juice appe all none
do
   case $DRINK in
      tea|cofee|water|all) 
         echo "Go to canteen"
         ;;
      juice|appe)
         echo "Available at home"
      ;;
      none) 
         break 
      ;;
      *) echo "ERROR: Invalid selection" 
      ;;
   esac
done
```
- Kết quả:
```
1) tea
2) cofee
3) water
4) juice
5) appe
6) all
7) none
Please enter your choice: 1
Go to canteen
Please enter your choice:
```

## 4. Functions
- Sử dụng functions để thực hiện các tác vụ lặp đi lặp lại là một cách tuyệt vời để tạo tái sử dụng code. Đây là một phần quan trọng của các nguyên tắc lập trình hướng đối tượng hiện đại.
### Creating Functions
```
function_name () { 
   list of commands
}
```
- Ví dụ:
```
#!/bin/bash
# Define your function here
hello () {
   echo "Hello World"
}
# Invoke your function
hello
```
### Pass Parameters to a Function
- Chúng ta có thể định nghĩa một hàm sẽ chấp nhận các tham số trong khi gọi hàm, các tham số sẽ được biểu thị bởi $1, $2...
```
#!/bin/bash
# Define your function here
hello () {
   echo "Hello World $1 $2"
}
# Invoke your function
hello Zara Ali
```
### Returning values from Functions
- Để trả về giá trị từ một function ta sử dụng lệnh **return**
- Ví dụ: Trả về giá trị 10
```
Live Demo
#!/bin/bash
# Define your function here
hello () {
   echo "Hello World $1 $2"
   return 10
}
# Invoke your function
hello Zara Ali
# Capture value returnd by last command
ret=$?
echo "Return value is $ret"
```
> Lưu ý: Function phải được định nghĩa trước vị trí gọi function đó.

## 5. Shell Substitution
- Shell thực hiện thay thế khi gặp ký tự đặc biệt. Để hiểu rõ hơn hãy xem ví dụ dưới đây
```
#!/bin/bash
a=10
echo -e "Value of a is $a \n"
```
- Option **-e** cho phép thực thi backslash escapes `Value of a is 10`. Và đây là kết quả khi không có **-e** `Value of a is 10\n`.
- Một số escape được sử dụng trong lệnh echo:
* **\\**: backslash
* **\a**: alert
* **\b**: backspace
* **\c**: suppress trailing newline
* **\f**: form feed
* **\n**: newline
* **\r**: carriage return
* **\t**: horizontal tab
* **\v**: vertical tab
- Có thể sử dụng option **-E** để disable backslash, **-n** để disable newline.

- **Command substitution**: là cơ chế mà shell thực hiện một tập lệnh đã cho và sau đó thay thế đầu ra của nó ở nơi được gọi.
- Syntax: `command`. Sử dụng backquote, **not** single quote.
- Xem xét ví dụ sau:
```
#!/bin/bash
DATE=`date`
echo "Date is $DATE"
USERS=`who | wc -l`
echo "Logged in user are $USERS"
UP=`date ; uptime`
echo "Uptime is $UP"
```
- Result:
```
Date is Thu Jul  2 03:59:57 MST 2009
Logged in user are 1
Uptime is Thu Jul  2 03:59:57 MST 2009
03:59:57 up 20 days, 14:03,  1 user,  load avg: 0.13, 0.07, 0.15
```

- **Variable Substitution**: cho phép thao tác giá trị của variable dựa trên trạng thái của nó.
*  ${var}: Thay thế giá trị của var
*  ${var:-word}: Nếu var là null hoặc unset, word được thay thế cho var. Giá trị của var không thay đổi.
*  ${var:=word}: Nếu var là null hoặc unset, var được đặt thành giá trị của word.
*  ${var:?message}: Nếu var là null hoặc unset, message được in thành lỗi tiêu chuẩn. Điều này kiểm tra các biến được đặt chính xác.
*  ${var:+word}: Nếu var được set, word được thay thế cho var. Giá trị của var không thay đổi.
- Ví dụ:
```
#!/bin/bash

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
- Kết quả:
```
Variable is not set
1 - Value of var is
Variable is not set
2 - Value of var is Variable is not set

3 - Value of var is
This is default value
4 - Value of var is Prefix
Prefix
5 - Value of var is Prefix
```

## Tổng kết
- Đến đây, chúng ta đã có kiến thức căn bản để lập trình Shell rồi, tùy vào từng bài toán chúng ta sẽ áp dụng.
- Tham khảo thêm về Shell [tại đây](https://www.learnshell.org/)