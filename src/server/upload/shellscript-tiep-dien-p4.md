###### Chúng ta tiếp tục cùng tìm hiểu những phần tiếp theo của shell script nhé !
##### :small_red_triangle_down: Số học (Arithmetic) (tiếp)<br>
:black_small_square:  Sử dụng 2 lần dấu ngoặc đơn `(( ))`, cú pháp:<br>
```
$(( biểu thức ))
```
Ví dụ:
```bash
#!/bin/bash

a=$(( 5 + 5 )) #line 3
echo $a #10

a=$((7+5)) #line 6
echo $a #12

b=$(( a + 3 )) #line 9
echo $b #15

b=$(( $a + 4 )) #line 12
echo $b #16

(( b++ )) #line 15
echo $b #17

(( b += 3 )) #line 18
echo $b #20
```
- Dòng 3 - Đây là định dạng cơ bản, ta có thể sắp xếp nó một cách dễ dàng mà không cần trích dẫn.
- Dòng 6 - Nó hoạt động tương tự nếu ta viết không có khoảng trắng.
- Dòng 9 - Ta có thể viết bao gồm các biến mà không có dấu $  đằng trước.
- Dòng 12 - Các biến có thể được bao gồm với dấu $ nếu ta muốn.
- Dòng 15 - Ở đây giá trị của biến b được tăng thêm 1. Khi ta làm điều này, ta không cần dấu $ trước dấu ngoặc.
- Dòng 18 - Ở đây giá trị của biến b được tăng thêm 3. Nó là cách viết ngắn hơn của `b = b + 3`.
<hr>

:black_small_square:  Độ dài của một biến, cú pháp:<br>
```
${#variable}
```
Ví dụ:
```bash
#!/bin/bash

a='Hello'
echo ${#a} # 5
b=4567
echo ${#b} # 4
```
<hr>

##### :small_red_triangle_down: Câu lệnh IF<br>
:black_small_square: Chúng ta sẽ tìm hiểu sâu hơn về câu lệnh `if` nhé<br>
- Các câu lệnh `if` cho phép chúng ta đưa ra quyết định trong các tập lệnh Bash của chúng ta. Nó cho phép ta quyết định có chạy mã hay không dựa trên các điều kiện mà ta có thể đặt.

:black_small_square: Câu lệnh IF cơ bản<br>

- Một câu lệnh if cơ bản sẽ check: nếu một điều kiện cụ thế trả về true thì nó sẽ thực hiện một tập hợp các hành động nhất định.Nếu không nó sẽ không thực hiện các hành động đó, cú pháp như sau:
```bash
if [ <some condition> ]
then
<command>
fi
``` 
- Bất cứ câu lệnh nào đặt giữa `then` và `fi` sẽ được thực hiện nếu điều kiện trả về true.
- Ví dụ:
```bash
#!/bin/bash

if [ $1 -gt 50 ] #line 3
then
echo Amazingggg. #line 5
fi
```
- Dòng 3 - ở đây, sẽ check xem biến truyền vào đầu tiên có lớn hơn 50 hay không
- Dòng 5 - Nếu biến truyền vào lớn hơn 50, sẽ cho echo ra màn hình text "Amazingggg."
```bash
➜  ~ ./test.sh 55
Amazingggg.
➜  ~ ./test.sh 2
```
<hr>


:black_small_square: Toán tử (Operator)<br>

| Toán tử | Mô tả |
| -------- | -------- |
| !condition     | nếu condition là true thì sẽ trả về false và ngược lại |
|-n string|độ dài của string lớn hơn 0|
|-z string|độ dài của string bằng 0 (tức là rỗng)|
|string1 = string2|string1 bằng string2|
|string1 != string2|hai string không giống nhau|
|integer1 -eq integer2|integer1 bằng integer2|
|integer1 -gt integer2|integer1 lớn hơn integer2|
|integer1 -lt integer2|integer1 nhỏ hơn integer2|
|-d file|file tồn tại và là một thư mục|
|-e file|file tồn tại|
|-r file|file tồn tại và được quyền đọc|
|-s file|file tồn tại và kích thước của nó lớn hơn 0|
|-w file|file tồn tại và được quyền viết|
- Lưu ý: 
- `=` hơi khác so với `-eq`, ví dụ `[005 = 5]` sẽ trả về false, còn `[005 -eq 5]` sẽ trả về true.
- Khi ta đề cập đến `file` bên trên sẽ được hiểu là một `path`. Một `path` - đường dẫn có thể là tuyệt đối hoặc tương đối và có thể tham chiếu đến một tệp hoặc một thư mục.
- ta có thể dùng command `test` để test thử các trường hợp ta đề cập đến, ví dụ:
```bash
➜  ~ test 005 = 5
➜  ~ echo $?
1 #false
➜  ~ test 005 -eq 5
➜  ~ echo $?       
0 #true
```
<hr>

:black_small_square: Câu lệnh if lồng nhau<br>
- Ta có thể có nhiều câu lệnh `if` trong tập lệnh của mình. Ví dụ:
```bash
#!/bin/bash

if [ $1 -gt 50 ] #line 3
then

if (( $1 % 2 == 0 )) #line 6
then
echo Congratulations. #line 8
fi
fi
```
- Dòng 3 - Thực hiện khi tham số đầu tiên truyền vào lớn hơn 50
- Dòng 6 - Nếu ta muốn kiểm tra một biểu thức ta có thể sử dụng 2 lần mở đóng ngoặc như trên
- Dòng 8 - Sẽ chạy nếu biểu thức dòng 6 trả về true
<hr>

:black_small_square: Câu lệnh if else<br>
- Trong những trường hợp ta muốn thực hiện một số hành động nhất định nếu điều kiện trong `[]` trả về true và những hành động khác nếu trả về false, ta có thể viết theo dạng:
```bash
if [ <some condition> ]
then
<command>
else
<other command>
fi
```
- Ví dụ:
```bash
#!/bin/bash

if [ $1 -eq 1 ]
then
echo This Good
else
echo This Bad
fi
```
:black_small_square: Câu lệnh if elif else<br>
- Ta có thể thêm được nhiều điều kiện để có thể dẫn đến các kết quả khác nhau , bằng cách sử dụng `if elif else`. Cú pháp:
```bash
if [ <some condition> ]
then
<command>
elif [ <some condition> ] 
then
<different command>
else
<other command>
fi
```
- Ví dụ:
```bash
#!/bin/bash

if [ $1 -ge 20 ]
then
echo The Flower
elif [ $1 = 10 ]
then
echo Good boy.
else
echo Thank you
fi
```
- Ta có thể có nhiều nhánh `elif` nếu muốn. Và kết thúc sẽ sử dụng tùy chọn `else`.
<hr>

:black_small_square: Toán tử Boolean<br>
- Toán tử này bao gồm: `and - &&` và `or- ||`
- Ví dụ:
```bash
#!/bin/bash
#and_operator
if [ $1 -ge 5 ] && [ $2 -le 10 ]
then
echo Correct.
fi
```
```bash
#!/bin/bash
#or_operator
if [ $1 -ge 5 ] || [ $2 -le 10 ]
then
echo Correct.
else
echo Bad.
fi
```
<hr>

:black_small_square: Nhắc lại câu lệnh `Case`<br>
- Về cơ bản, `if` và `case` khá giống nhau. Tuy nhiên, ta thường sử dụng `case` trong bài toán dạng mul-ti choice + biểu thức đơn giản, còn `if` sẽ dùng cho  các bài toán ít trường hợp và sử dụng biểu thức phức tạp
- Cú pháp sử dụng `case`:
```bash
case <variable> in
<value 1>)
<commands>
;;
<value 2>)
<other commands>
;;
esac
```
- Ví dụ:
```bash
#!/bin/bash

case $1 in #line 3
yellow) #line 4
echo This is yellow
;; #line 6
red)
echo This is red
;;
black)
echo This is black
;;
*) #line 13
echo Make color
;;
esac #line 16
```
- Dòng 3: Dòng này bắt đầu thực thi lênh `case`
- Dòng 4: Nếu biến truyền vào đầu tiên `$1` là `yellow` sẽ thực thi lệnh bên trong nó. Dấu `)` thể hiện việc kết thúc các trường hợp.
- Dòng 6: Ta xác định kết thúc của tập hợp câu lệnh này bằng dấu `;;`
- Dòng 13: Dấu `*` đại diện cho bất kỳ ký tự nào, ta có thể coi đây là default nếu biến truyền vào không rơi vào bất cứ trường hợp nào
- Dòng 16: `esac`cho biết ta đang ở cuối câu lệnh `case`. Bất kỳ câu lệnh khác nào sau nó sẽ được thực hiện bình thường.
<hr>

###### Trên đây mình đã tìm hiểu thêm về `Arithmetic` và `If Else`. Mình xin kết thúc phần 4 tại đây.
###### Cảm ơn các bạn đã đọc bài viết!