# Mở bài
Ngày nay, trong giới IT chúng ta, mọi người được làm việc và tiếp xúc với Unix/Linux khá nhiều vậy nên việc tập làm quen với các câu lệnh trên Unix/Linux chắc k còn xa lạ. Tuy nhiên việc nhớ được những câu lệnh có phần khá là khó nhớ đối với các dân chơi Linux nghiệp dư như mình, hơn nữa nhiều lúc có đến hàng tá các câu lệnh mà mình cần thực hiện liên tiếp và phải lặp đi lặp lại rất nhiều lần, rất mất thời gian.

Và thế là chúng ta cần tìm ngay một thứ đó chính là `shell script`, nó sẽ giúp chúng ta gom một nhóm các câu lệnh phức tạp vào một file rồi thực thi nó.
_cascac_ *cascac*
Một file `shell script` có extension là `.sh` dành cho môi trường Linux hoặc `.bat` dành cho môi trường Windows

Trong bài viết này, mình sẽ giới thiệu cho các bạn về `Bash script` vì đơn giản nó là một `shell` thông dụng nhất.
# Thân bài
## 1. Tạo file shell script đơn giản
Đầu tiên các bạn tạo một file là `script.sh` với nội dung như sau
```bash
#! /bin/bash

echo Hello world
```
Trước mọi file shell thì chúng ta cần định nghĩa cho file đó biết rằng, file đó sẽ sử dụng shell nào để thực thi, ví dụ như trường hợp trên mình khai báo sử dụng `bash shell`
```bash
#! /bin/bash
```

Dòng tiếp theo chúng ta sử dụng lệnh `echo` để in ra dòng chữ `Hello world`.

Để thực thi file, các bạn mở `terminal` lên vào chạy
```bash
bash script.sh
```
Kết quả
```
Hello world
```

Ngoài ra các bạn có thể cấp quyền thực thi cho file này bằng lệnh
```bash
chmod +x script.sh
```
và chạy
```bash
./script.sh
```
Kết quả sẽ tương tự như cách thực thi thứ nhất
## 2. Biến trong shell script
Giống như bao ngôn ngữ lập trình khác thì shell script cũng có cho mình một thứ gọi là `biến`. Tuy nhiên khác với cách đặt biến thường thấy ở các ngôn ngữ lập trình thì shell nghiêm ngặt hơn trong cách khai báo biến, shell **không** cho phép khai báo biến với whitespace.

Khai báo sai :
```bash
NAME = "Quang Phu"
```
Cách khai báo đúng
```bash
NAME="Quang Phu"
```
Để xuất giá trị của biến ra chúng ta cũng sẽ sử dụng lệnh `echo`
```bash
#! /bin/bash

NAME="Quang Phu"
echo $NAME
```
Kết quả
```
Quang Phu
```

Biến ở trong `Bash Shell` không bắt buộc chúng ta phải định nghĩa trước, lúc bạn xuất giá trị của biến không được định nghĩa chương trình sẽ không bị lỗi tuy nhiên kết quả giá trị trả về của biến đó là một chuỗi rỗng.

Ví dụ :
```bash
#! /bin/bash

echo "My name is $NAME"
$NAME="Quang Phu"
echo "My name is $NAME"
```
Kết quả 
```
My name is
My name is Quang Phu
```
## 3. Tham số
Ngoài những biến mà chúng ta tự khai báo ra thì trong shell script cũng cung cấp cho chúng ta kha khá các biến có sẵn với các chức năng khác nhau


| Cú pháp | Công dụng | 
| -------- | -------- |
| $0     | Tên của file mà chúng ta đang thực thi     |
| $1...$n     |  Tương ứng lần lượt là các tham số được truyền vào khi thực thi file    |
| $@     |  In ra danh sách các tham số được truyền vào    |
| $#     |  Số các tham số được truyền vào    |

Ví dụ:
```bash:script.sh
#! /bin/bash
echo "Số tham số được truyền vào là $#"
echo "Tên file này là $0"
echo "Tham số thứ nhất là $1"
echo "Tham số thứ hai là $2"
echo "Tất cả các tham số là $@"
```
Chạy
```
./script.sh 1 2
```
Kết quả
```
Số tham số được truyền vào là 2
Tên file này là ./script.sh
Tham số thứ nhất là 1
Tham số thứ hai là 2
Tất cả các tham số là 1 2
```
Đơn giản phải không ạ :100:
## 4. Lệnh điều kiện
Cú pháp :
```bash
if [ ... ]
then
  # if-code
else
  # else-code
fi
```
hoặc 
```bash
if [ ... ]; then
  # if-code
else
  # else-code
fi
```
Ví dụ :
```bash:script.sh
#! /bin/bash

if [ $1 -lt "0" ]
then
  echo "X is less than zero"
fi
if [ $1 -gt "0" ]; then
  echo "X is more than zero"
fi
```
Chạy 
```
./script.sh 1000
```
Kết quả 
```
X is more than zero
```
Khác với các ngôn ngữ lập trình thì `Shell` có toán tử khác biệt đôi chút

**Toán tử so sánh số**

| Toán tử | Ý nghĩa |Ví dụ |
| -------- | -------- | -------- |
| -eq     | So sánh bằng     | $a -eq $b     |
| -ne     | So sánh khác nhau     | $a -ne $b     |
| -gt     | So sánh lớn hơn     | $a -gt $b     |
| -lt     | So sánh nhỏ hơn    | $a -lt $b     |
| -ge     | So sánh lớn hơn hoặc bằng     | $a -ge $b     |
| -le     | So sánh nhỏ hơn hoặc bằng     | $a -le $b     |

**Toán tử so sánh chuỗi**
| Toán tử | Ý nghĩa |Ví dụ |
| -------- | -------- | -------- |
| =     | So sánh bằng     | $a = $b     |
| !=     | So sánh không bằng     | $a != $b     |
| -z     | Kiểm tra chuỗi rỗng     | -z $a     |
| -n     | Kiểm tra khác rỗng     | -n $a     |

**Toán tử với thư mục/ tệp**
| Toán tử | Ý nghĩa |Ví dụ |
| -------- | -------- | -------- |
| -f     | Kiểm tra xem có phải file không    | -f $file     |
| -d     | Kiểm tra xem có phải thư mục không    | -d $directory     |
| -r     | Kiểm tra xem file có đọc (read) được hay không  | -r $file     |
| -w     | Kiểm tra xem file có ghi (write) được hay không  | -w $file     |
| -x     | Kiểm tra xem file có thực thi (execute) được hay không  | -x $file     |
| -e     | Kiểm tra xem file có tồn tại không  | -e $file     |
| -s     | Kiểm tra xem file có kích thước lớn hơn 0 không  | -s $file     |

## 5. Vòng lặp
Đã có câu lệnh điều kiện thì không thể không có vòng lặp. Vòng lặp trong Shell cũng giống như các ngôn ngữ lập trình khác

**Vòng lặp for**

Cú pháp tương tự với C/C++ mà các bạn từng tiếp xúc
```bash
for (( EXP1; EXP2; EXP3 ))
do
	command1
	command2
	command3
done
```
Ví dụ :
```bash:script.sh
for (( c=1; c<=5; c++ ))
do  
   echo "Chào tôi lần $c"
done
```
Kết quả
```
Chào tôi lần 1
...
Chào tôi lần 5
```
Hoặc có thể viết cách khác dùng `numeric ranges`
Ví dụ:
```bash
for VARIABLE in 1 2 3 4 5 .. N
do
	command1
	command2
	commandN
done
```
Trong `bash shell` chúng ta cũng có các lệnh như `break` hay là `continue` được sử dụng trong vòng lặp
Ví dụ
```bash
for i in 1 2 3 4 5
do
  echo $i
  if [ $i -eq "3" ]; then
    break
  fi
done
```
Kết quả
```
1
2
3
```
# Kết bài

**Donate cho tác giả**: https://www.buymeacoffee.com/imphunq

Trên đây là những khái niệm cơ bản trong lập trình `shell` mà mình muốn giới thiệu tới các bạn, có thể là bây giờ nhiều người chưa thực sự cần dùng tới `shell script` nhưng trong tương lai rất có khả năng chúng ta tiếp cận với nó, có thể là những người học docker sẽ dùng tới những file `shell` như thế này.

Vậy nên chúng ta cứ học trước rồi đợi cơ hội và lôi ra sử dụng thôi. Đúng không ạ !!!!