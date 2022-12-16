Thay vì phải thực thi nhiều câu lệnh phức tạp, mất thời gian, chúng ta có thể viết vào một file để thực thi nó, chúng ta gọi đó là shell script. Trong bài viết hôm nay minh sẽ giới thiệu với các bạn những câu lệnh cơ bản để có thể tạo ra một file bash script.

Trong linux có nhiều shell khác nhau như Sh shell, Dash Shell, Bash Shell. Tuy nhiên mình sẽ giới thiệu bash shell vì nó là shell  tiêu chuẩn và thông dụng nhất.
# Bash script
Đầu tiên các bạn mở terminal lên, ở đây mình dùng `terminator` , Trong thư mục hiện tại hoặc bất cứ đâu mà bạn muốn, tạo một file `test.sh`, mở file này ra và gõ vào như sau:
```
#!/bin/bash

echo “Hello World !”
```


Save file lại và chúng ta đã được một file bash script đơn giản. Trong dòng đầu tiên là khai báo loại ngôn ngữ mà ta sử dụng, ở đây là bash. Sau dấu `#!` là đường dẫn trỏ đến lệnh bash.

Dòng thứ 2 là lệnh đơn giản in ra màn hình dòng chữ “Hello World!”. Để thực thi file bash này chúng ta chạy lệnh:
```
→ bash test.sh
```
Các bạn sẽ thấy “*Hello World*” được in ra.
Cách thứ 2 để chạy file bash này là bạn cấp quyền `execute` cho nó bằng lệnh
```
→ chmod +x  test.sh
```
Sau đó chạy bằng lệnh
```
→ ./test.sh 
```
và kết quả tương tự như cách thứ nhất. Các bạn hãy tự kiểm tra nhé.
# Biến và tham số
Tương tự như các ngôn ngữ lập trình khác, bash script cũng có các khái niệm biến và tham số.
Tuy nhiên trong bash biến chỉ có 4 kiểu dữ liệu là:
> 1. String
> 2. integer
> 3. constant
> 4. Array


Trong đó `string` và `integer` là 2 kiểu dữ liệu được sử dụng phổ biến nhất, khai báo biến ta thực hiện như sau:
Các bạn lại mở file `test.sh` lên và tiếp tục code :)
```
name=”phuc”
age=16
echo $name
echo $age
```
Lưu file lại và chạy lệnh `./test.sh` để xem kết quả.
> Các bạn lưu ý dấu = phải viết liền không được có dấu cách ví dụ age = 16, sẽ báo lỗi cú pháp.
> 
> Biến phân biệt chữ hoa và chữ thường, ví dụ biến NAME sẽ khác biến name


Tiếp theo để truyền tham số vào file bash ta mở file `test.sh` và khai báo như sau:
```
name=$1
age=$2
echo “Name : ” $name
echo “Age : ” $age
```

Lưu file và chạy thử bằng lệnh
```
→ ./test.sh phuc 16
```
Kết quả sẽ hiển thị ra màn hình. Các bạn lưu ý `$1` là tham số thứ nhất , và `$2` là tham số thứ hai được truyền vào trong câu lệnh thực thi trên.

Để thực hiện phép toán trong *bash script* ta làm như sau, Ví dụ ta muốn tính bình phương của một số:
```
→ ./test.sh 2
```
Chúng ta muốn hiển thị ra màn hình kết quả là : “Bình phuong cua 2 là : 4” vậy trong file bash thì lại làm như sau
```
number=$(($1 * $1))
echo “Binh phuong cua $1 la : $number”
```
Các bạn lưu lại và test thử, nếu không truyền tham số vào sẽ gặp lỗi ngay
# Lệnh điều kiện
Trong bash script ta cũng có các lệnh điều kiện `if`, `else` như các ngôn ngữ khác, tuy nhiên cú pháp có phần phức tạp và khó nhớ hơn, các bạn cố gắng tiêu hóa :P

Trở lại với bài toán tính bình phương ở trên, nếu ta không nhập tham số vào thì thay vì bị báo lỗi, ta sẽ xử lý bằng lệnh điều kiện như sau:
```
if [ -z $1 ]; then
    echo "Chua nhap tham so"            
else
    number=$(($1 * $1))
    echo "Binh phuong cua $1 la : $number"
fi

```
> -z là nếu không tồn tại tham số 1

Các bạn lưu lại và chạy thử với hai trường hợp, 1 là không nhập tham số, 2 là nhập tham số là một số bất kỳ.

Một số điều kiện cho `if`, `else` khác các bạn có thể tham khảo bảng sau đây:


#### Lệnh so sánh với số
| Cú pháp | Ý nghĩa |
| -------- | -------- | 
| n1 -eq n2     | Kiểm tra n1 = n2     |
|n1 -ne n2	|Kiểm tra n1 khác n2|
|n1 -lt n2	|Kiểm tra n1 < n2|
|n1 -le n2	|Kiểm tra n1 <= n2|
|n1 -gt n2	|Kiểm tra n1 > n2|
|n1 -ge n2	|Kiểm tra n1 >= n2|

#### Lệnh so sánh với chuỗi


| Cú pháp |Ý nghĩa
| -------- | -------- 
|s1 = s2	|Kiểm tra s1 = s2
|s1 != s2	|Kiểm tra s1 khác s2
|-z s1	|Kiểm tra s1 có kích thước bằng 0
|-n s1	|Kiểm tra s1 có kích thước khác 0
|s1	|Kiểm tra s1 khác rỗng

#### Toán tử kết hợp


| Column 1 | Column 2 
| -------- | -------- 
|!	|Phủ định (not)
|-a	|Và (and)
|-o	|Hoặc (or) 

#### Lệnh kiểm tra file (nói chung cho cả tệp và thư mục)


| Cú pháp | Ý nghĩa
| -------- | -------- 
|-f file	|Kiểm tra xem file có phải là tệp hay không
-d file	|Kiểm tra xem file có phải là thư mục hay không
-r file	|Kiểm tra file có đọc (read) được hay không
-w file	|Kiểm tra file có ghi (write) được hay không
-x file	|Kiểm tra file có thực thi (execute) được hay không
-s file	|Kiểm tra file có kích thước lớn hơn 0 hay không
-e file	|Kiểm tra xem file có tồn tại hay không

# Kết luận
Như vậy trong phần này mình đã giới thiệu đến các bạn những điều cơ bản nhất trong lập trình `shell`, và ở đây là *bash script*. Khi mới tiếp cận bạn có thể sẽ gặp khá nhiều khó khăn vì cú pháp của bash hơi khó nhớ, nhưng không sao, phần nào không nhớ ta lại google. Chúc các bạn run code thành công :D

Code hăng say, vận may sẽ đến!

# Tham khảo
https://techmaster.vn/

https://www.google.com/