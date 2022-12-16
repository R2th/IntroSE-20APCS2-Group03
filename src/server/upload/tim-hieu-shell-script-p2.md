# 3. Loop
### Ký tự đại diện
Để sử dụng **loop** cần lướt qua 1 chút:
* Sap chép file từ thư mục `a` sang thư mục `b`:
```shell
$ cp /tmp/a/* /tmp/b/
$ cp /tmp/a/*.txt /tmp/b/
$ cp /tmp/a/*.html /tmp/b/
```
* Đổi tên file `a` sang `b`:
```bash
sudo mv a.txt b.txt
```
### Ký tự cần được giải thích (escape)
```shell
$ echo Hello       World
Hello World
$ echo "Hello       World"
Hello     World
$ echo "Hello       "World
Hello     World
$  echo "Hello \"World\""
Hello "World"
```
=> 1 tab hoặc nhiều dấu cách sẽ bị hiểu nhầm nếu không đặt trong cặp dấu `"` `"`, các ký tự đặc biệt (như `"`) cần được giải thích bằng dấu xuyệt phải ngay phía trước.
Hầu hết các ký tự đặc biệt (`*`, `'`, vân vân) không được giải thích bình thường, ví dụ `*` được coi là ký tự đại diện chứ không phải ký tự thường nếu không được đặt trong cặp `"` `"`, chẳng hạn:
```shell
$ echo *
case.shtml escape.shtml first.shtml 
functions.shtml hints.shtml index.shtml 
ip-primer.txt raid1+0.txt
$ echo *txt
ip-primer.txt raid1+0.txt
$ echo "*"
*
$ echo "*txt"
*txt
```
Trong ví dụ đầu tiên, `*` có nghĩa là tất cả các tệp trong thư mục hiện tại. 
Trong ví dụ thứ hai, `*txt` có nghĩa là tất cả các file kết thúc bằng `txt`.
Trong ví dụ ba, tôi đặt dấu `*` trong dấu ngoặc kép và nó được hiểu theo nghĩa đen.
Trong ví dụ thứ tư, áp dụng tương tự, nhưng tôi đã nối `txt` cho vào chuỗi.

Tuy nhiên, ", $,\` và \ vẫn được giải thích bởi shell, ngay cả khi chúng nằm trong dấu ngoặc kép. Ký tự dấu gạch chéo ngược (\) được sử dụng để đánh dấu các ký tự đặc biệt này để chúng không được "giải thích" bởi trình shell, nhưng được truyền cho lệnh đang được chạy (ví dụ: echo). Vì vậy, để xuất 1 chuỗi gồm toàn những ký tự đặc biệt: (Giả sử  [giá trị của biến](https://viblo.asia/p/tim-hieu-shell-script-p1-L4x5xO4rlBM#_2-su-dung-bien-4) `$X` là 5):
```
A quote is ", backslash is \, backtick is `.
A few spaces are    and dollar is $. $X is 5.
```
Ta sẽ phải viết:
```shell
$ echo "A quote is \", backslash is \\, backtick is \`."
A quote is ", backslash is \, backtick is `.
$ echo "A few spaces are    and dollar is \$. \$X is ${X}."
A few spaces are    and dollar is $. $X is 5.
```
Chúng ta đã thấy vì sao `"`  được sử dụng để xuất dấu cách, biến được sử dụng bởi dấu `$`,  nên `$X`, `${X}` đã được thay thế bởi  [giá trị của biến](https://viblo.asia/p/tim-hieu-shell-script-p1-L4x5xO4rlBM#_2-su-dung-bien-4). Còn dấu xuyệt phải (`\`) là đặc biệt dùng để đánh dấu ký tự khác, vd:
```python
$ echo "This is \\ a backslash"
This is \ a backslash
$ echo "This is \" a quote and this is \\ a backslash"
This is " a quote and this is \ a backslash
```
### Vòng Lặp
Cách viết vòng lặp `for` trong shell
chạy file `for.sh`
```shell
#!/bin/sh
for i in 1 2 3 4 5
do
  echo "Looping ... number $i"
done
```
kết quả:
```
Looping .... number 1
Looping .... number 2
Looping .... number 3
Looping .... number 4
Looping .... number 5
```
Chạy file `for2.sh`
```shell
#!/bin/sh
for i in hello 1 * 2 goodbye 
do
  echo "Looping ... i is set to $i"
done
```
```
Looping ... i is set to hello
Looping ... i is set to 1
Looping ... i is set to for2.sh
Looping ... i is set to for.sh
Looping ... i is set to 2
Looping ... i is set to goodbye
```
---
Cách viết vòng lặp `while` trong shell, file `while.sh`:
```shell
#!/bin/sh
INPUT_STRING=hello
while [ "$INPUT_STRING" != "bye" ]
do
  echo "Please type something in (bye to quit)"
  read INPUT_STRING
  echo "You typed: $INPUT_STRING"
done
```
=> gõ `bye` rồi enter từ bàn phím để kết thúc vòng lặp.

---

Một mẹo viết tắt vòng lặp đến từ [Linux From Scratch!](http://www.linuxfromscratch.org/) :
```
mkdir rc{0,1,2,3,4,5,6,S}.d
```
để thay thế cho
```
for runlevel in 0 1 2 3 4 5 6 S
do
  mkdir rc${runlevel}.d
done
```
Và vì thế có thể viết đệ quy để lấy danh sách các file/folder của nhiều path khác nhau:
```
$ cd /
$ ls -ld {,usr,usr/local}/{bin,sbin,lib}
drwxr-xr-x    2 root     root         4096 Oct 26 01:00 /bin
drwxr-xr-x    6 root     root         4096 Jan 16 17:09 /lib
drwxr-xr-x    2 root     root         4096 Oct 27 00:02 /sbin
drwxr-xr-x    2 root     root        40960 Jan 16 19:35 usr/bin
drwxr-xr-x   83 root     root        49152 Jan 16 17:23 usr/lib
drwxr-xr-x    2 root     root         4096 Jan 16 22:22 usr/local/bin
drwxr-xr-x    3 root     root         4096 Jan 16 19:17 usr/local/lib
drwxr-xr-x    2 root     root         4096 Dec 28 00:44 usr/local/sbin
drwxr-xr-x    2 root     root         8192 Dec 27 02:10 usr/sbin
```
---
## 4. Kiểm tra điều kiện
```shell
if [$foo = "bar" ]
```
Cú pháp:
```shell
if [ ... ]
then
  # if-code
else
  # else-code
fi
```
hoặc:
```shell
if  [ something ]; then
 echo "Something"
elif [ something_else ]; then
  echo "Something else"
else
  echo "None of the above"
fi
```
Để ý dấu `;` có thể dùng làm phân định 2 dòng lệnh, cặp `[`  `]` có thể sử dụng như 1 lệnh kiểm tra điều kiện:
```shell
#!/bin/sh
if  [ $X = 0 ]; then
 echo "Something"
elif [ $X -gt 1 ]; then
  echo "Something else"
else
  echo "None of the above"
fi

[ "$X" -le "0" ] && \
      echo "X is less than or equal to  zero"
```
Với `X` là biến (được export từ bên ngoài hoặc có thể khai báo bên trên cùng - [xem phần 1 ](https://viblo.asia/p/tim-hieu-shell-script-p1-L4x5xO4rlBM#_pham-vi-su-dung-bien-cung-can-duoc-quan-tam-5)).

---
## 5. Case
Cũng tương tự câu điều kiện if else, cú pháp case như sau:
```shell
#!/bin/sh

echo "Please talk to me ..."
while :
do
  read INPUT_STRING
  case $INPUT_STRING in
  hello)
    echo "Hello yourself!"
    ;;
  bye)
    echo "See you again!"
    break
    ;;
  *)
    echo "Sorry, I don't understand"
    ;;
  esac
done
echo
echo "That's all folks!"
```
Hãy chạy thử script trên và nhập và enter từ bàn phím `hello`, `lkjasldkjasldkjas`, và `bye` => bạn sẽ hiểu ngay về `case`.

--- 
Trong [phần tới](https://viblo.asia/p/tim-hieu-shell-script-p3-XL6lAQrglek) tôi sẽ nói tiếp về biến.

Trong [phần cuối](https://viblo.asia/p/tim-hieu-shell-script-p4end-oOVlYzLB58W) tôi sẽ mô tả cách khai báo `Function` , cũng như các gợi ý, lời khuyên, một số lệnh tham khảo để sử dụng trong shell (=, -gt. -le, ... bla bla) để có thể có kiến thức tương tác tốt với shell khi cần.