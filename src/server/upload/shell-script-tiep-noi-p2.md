###### Ở [phần trước](https://viblo.asia/p/shell-script-khoi-dau-p1-LzD5dj1oZjY), chúng ta đã làm quen cơ bản với cách sử dụng shellcript (tạo và thực thi shellscript, biến,...). Bây giờ, chúng ta tiếp tục đến với các đặc điểm tiếp theo của nó nhé! :hugs:
##### :small_red_triangle_down:Các ký tự trong shellscript<br>
:black_small_square: Chúng ta đã thấy rằng việc sử dụng ký tự dấu ngoặc kép `"` ảnh hưởng đến cách xử lý khoảng trắng và ký tự TAB trong shellscript
```bash
➜  ~ echo Hello       Hello
Hello Hello
➜  ~ echo "Hello       Hello"
Hello       Hello
```
- Vậy làm thế nào để chúng ta có thể hiển thị được text: 
```bash
➜  ~ Hello    "Hello"
```
- Để làm được điều ấy chúng ta có thể làm như đoạn code bên dưới, tức là sẽ thêm `"` vào đầu và cuối dãy ký tự, cộng với việc thêm `\` vào đầu và cuối `"Hello"` để có thể vẫn giữ được khoảng cách giữa hai từ.
```bash
➜  ~ echo "Hello    \"Hello"\"
Hello    "Hello"
```
- Tuy nhiên, nếu chúng ta viết:
```bash
➜  ~ echo "Hello   " Hello ""
```
- Nó sẽ được hiểu là ba tham số:
1. "Hello   "
2. Hello
3. ""
- Vì vậy, đầu ra sẽ là
```
Hello    Hello
```
:black_small_square:Ký tự `*` được dùng theo nhiều mục đích khác nhau:
```bash
➜  ~ echo *
Videos Desktop Documents Downloads examples.desktop example.sh code.txt image.png
➜  ~ echo *png
image.png
➜  ~ echo "*"
*
➜  ~ echo "*png"
*png
```
- Trong VD đầu tiên, `*` được dùng để liệt kê tất cả các tệp trong thư mục hiện tại.
- Trong VD thứ hai, `*txt` dùng để liệt kê tất cả các tệp kết thúc bằng txt.
- Trong VD thứ 3 , ta đặt dấu `*` trong dấu ngoặc kép và nó được hiểu là text bình thường. (VD thứ 4 tương tự).

:black_small_square:Tiếp theo là các ký tự `", $, \`:
- Ký tự `\` được sử dụng để đánh dấu các ký tự đặc biệt mà các ký tự này không được giải thích bởi shellscript. Ví dụ, chúng ta muốn in ra một đoạn text như sau:
```bash
A quote is ", backslash is \, backtick is `.
I have $D is 5$.
```
- Chúng ta sẽ viết như sau:
```bash
➜  ~ echo "A quote is \", backslash is \\, backtick is \`."
A quote is ", backslash is \, backtick is `.
➜  ~ echo "I have \$D is 5$."
I have $D is 5$.
```
<hr>

##### :small_red_triangle_down:Vòng lặp (Loop)<br>
:black_small_square: **For Loops**
- `for` có tác dụng lặp qua một tập hợp các giá trị cho đến khi phần tử cuối cùng của danh:
```bash
#!/bin/sh
for i in 1 2 3 4 5
do
  echo "Hello $i"
done
```
và ta kết quả trả về:
```
Hello 1
Hello 2
Hello 3
Hello 4
Hello 5
```
- Ví dụ 2:
```bash
#!/bin/sh
for i in hello 1 *png 2 goodbye 
do
  echo "Hello...$i"
done
```
- kết quả thu được:
```
Hello...hello
Hello...1
Hello...image1.png
Hello...image2.png
Hello...image3.png
Hello...2
Hello...goodbye
```
- Ở đây nó sẽ lặp từ phần tử `hello` , rồi lặp tiếp những file đuôi png trong thư mục hiện tại, cuối cùng là đến phần tử `goodbye`.

:black_small_square: **While Loops**<br>
- `while` được sử dụng để thực thi nhiều lần một đoạn chương trình, khi một điều kiện vẫn còn đúng. Vòng lặp `while` thường được sử dụng khi số lần lặp không được xác định trước với cú pháp dùng nó như sau:
```bash
while [ condition ]
do
   command1
   command2
   ...
done
```
- Ví dụ:
```bash
#!/bin/sh
while [ "$INPUT_STRING" != "bye" ]
do
  echo "Please type something in (bye to quit)"
  read INPUT_STRING
  echo "Please input again"
done
```
- Ở đây, nếu ta không nhập đúng `"bye"` cho đoạn code trên nó sẽ được chạy vô thời hạn.
- **Nếu bạn muốn sử dụng một vòng lặp vô hạn mà không cần quan tâm đến điều kiện là gì ta có thể dùng cách sau:**
```bash
#!/bin/bash
while :
do
	echo "infinite loops... => Please press CTRL+C to stop"
done
```
- **Đọc tệp văn bản bằng lệnh read**:
- Bạn có thể đọc tệp văn bản bằng lệnh read và vòng lặp while như sau:
```bash
#!/bin/bash
file=/etc/resolv.conf #path if you want
while read line
do
    echo $line # echo line is stored in $line
done < "$file"
```
- Kết quả trả về:
```
nameserver 127.0.0.1
nameserver 192.168.1.254
nameserver 5.4.4.1
```
- **Sử dụng câu lệnh break để thoát ra khỏi vòng lặp**:
- câu lệnh break được sử dụng để thoát khỏi vòng lặp sớm dựa trên một điều kiện cụ thể. Ví dụ:
```bash
#!/bin/bash
n=1
while [ $n -le 10 ]
do
    if [ $n == 6 ]
    then
       echo "Stop because n=6"
       break
    fi
    echo "Number: $n"
    (( n++ ))
done
```
- Kết quả thu được:
```
Number: 1
Number: 2
Number: 3
Number: 4
Number: 5
Stop because n=6
```
- **Sử dụng câu lệnh continue để bỏ qua một bước cụ thể:**
```bash
#!/bin/bash
n=0
while [ $n -le 6 ]
do
     (( n++ ))
 
     if [ $n == 4 ]
     then
       continue
     fi
     echo "Number: $n"
done
```
- Khi vòng lặp này lặp lại lần thứ 4 thì vòng lặp sẽ đi đến lần lặp tiếp theo mà không in văn bản của text `Number: 4` ra. Và khi đó ta thu được kết quả sau:
```
Number: 1
Number: 2
Number: 3
Number: 5
Number: 6
Number: 7
```
<hr>

###### Cảm ơn các bạn đã đọc bài viết của mình!