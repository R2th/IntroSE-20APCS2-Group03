# 10. Find 

find là một lệnh để tìm kiếm đệ quy một thư mục cho các tệp (hoặc thư mục) phù hợp với một tiêu chí và sau đó thực hiện một số thao tác trên các tệp đã chọn.

##  10.1: Tìm kiếm tệp theo tên hoặc extension
* Để tìm các tệp / thư mục có tên cụ thể, liên quan đến pwd:
```bash
$ find . -name "myFile.txt"
./myFile.txt
````

* Để tìm các file có extension cụ thể ta có thể làm như sau:
```bash
$ find . -name "*.txt"
./myFile.txt
./myFile2.txt
```

* Nếu chúng ta muốn tìm file với nhiều loại extension thì sao? Nó cũng tương tự trên tuy nhiên ta sẽ phải kết hợp `or` flag:
```bash
$ find . -name "*.txt" -o -name "*.sh"
```

* Để tìm tệp / thư mục có tên bắt đầu bằng abc và kết thúc bằng một ký tự alpha sau một chữ số:
```bash
$ find . -name "abc[a-z][0-9]"
```
bạn hãy tự liên hệ với những case khác nhé

* Để liệt kê tất cả các tệp / thư mục nằm trong một thư mục cụ thể:
```
$ find /name
```

* Để chỉ tìm kiếm các tệp (không phải thư mục), hãy sử dụng `-type f`:
```bash
find /name -type f
```

* Để chỉ tìm kiếm các thư mục (không phải các tệp thông thường), hãy sử dụng `-type d`: 
```
find /name -type d
```

## 10.2:  Executing commands đối với tệp được tìm thấy

Đôi khi chúng ta sẽ cần chạy các lệnh đối với rất nhiều tệp. Điều này có thể được thực hiện bằng cách sử dụng `xargs`.
```bash
find . -type d -print | xargs -r chmod 770
```
Lệnh trên sẽ tìm một cách đệ quy tất cả các thư mục (-type d) liên quan đến. (Hiện tại của bạn đang làm việc
thư mục) và thực thi chmod 770 trên chúng. Option `-r` chỉ định để xargs không chạy chmod nếu tìm thấy không tìm thấy ất kỳ tệp nào

Nếu tên tệp hoặc thư mục của bạn có ký tự khoảng trắng trong đó, lệnh này có thể bị nghẹt, để không bị trường hợp đó bạn hãy dùng:
```bash
find . -type d -print0 | xargs -r -0 chmod 770
````

Trong ví dụ trên, cờ` -print0` và `-0` chỉ định rằng tên tệp sẽ được phân tách bằng byte null và cho phép sử dụng các ký tự đặc biệt, như dấu cách, trong tên tệp. Đây là một phần mở rộng GNU và có thể không làm việc trong
các phiên bản khác của find và xargs.

Tuy  nhiên cách hay được sử dụng để làm điều này là bỏ qua lệnh xargs và cho phép find gọi chính subprocess:
```bash
find . -type d -exec chmod 770 {} \;
```
Ở đây, {} là một trình giữ chỗ cho biết rằng bạn muốn sử dụng tên tệp tại thời điểm đó. Find sẽ thực thi chmod trên
từng tệp riêng lẻ.

Bạn có thể kết nối với nhau, chuyển tất cả các tên tệp cho một lệnh gọi chmod, bằng cách sử dụng:
```bash
find . -type d -exec chmod 770 {} +
```
Đây cũng là hành vi của các đoạn mã xargs ở trên. (Để gọi từng tệp riêng lẻ, bạn có thể sử dụng xargs -n1).

Tùy chọn thứ ba là cho phép bash lặp qua danh sách các tên tệp để tìm kết quả đầu ra:
```bash
find . -type d | while read -r d; do chmod 770 "$d"; done
```
Đây là cú pháp khó hiểu nhất, nhưng thuận tiện khi bạn muốn chạy nhiều lệnh trên mỗi tệp được tìm thấy.
Tuy nhiên, điều này là không an toàn khi đối mặt với các tên tệp có tên kỳ lạ.

```bash
find . -type f | while read -r d; do mv "$d" "${d// /_}"; done
```

sẽ thay thế tất cả khoảng trắng trong tên tệp bằng dấu gạch dưới. (Ví dụ này cũng sẽ không hoạt động nếu có khoảng trắng trong tên thư mục đầu.)

Vấn đề ở trên là mặc dù read -r mong đợi một mục nhập trên mỗi dòng, nhưng tên tệp có thể chứa các dòng mới (và ngoài ra, read -r sẽ mất bất kỳ khoảng trắng nào ở cuối). Bạn có thể khắc phục điều này bằng cách lặp:

```bash
find . -type d -exec bash -c 'for f; do mv "$f" "${f// /_}"; done' _ {} +
```

Bằng cách này, -exec nhận tên tệp trong một khuôn mẫu hoàn toàn chính xác và có thể di chuyển; bash -c nhận chúng dưới dạng một số đối số, sẽ được tìm thấy trong $ @, được trích dẫn chính xác, v.v. (Tập lệnh sẽ cần xử lý những tên này một cách chính xác; mọi biến có chứa tên tệp cần phải được đặt trong dấu ngoặc kép.)


 mysterious ` _ ` là cần thiết vì đối số đầu tiên cho bash -c'script 'được sử dụng để điền $ 0.
 
 ## 10.3: Tìm tệp theo thời gian truy cập / sửa đổi
 Trên ext filesystem, mỗi tệp có Quyền truy cập, Sửa đổi và (Trạng thái) Thay đổi được lưu trữ thời gian liên quan đến nó. Để xem thông tin này, bạn có thể sử dụng `stat` myFile.txt; bằng cách sử dụng cờ trong `find`, chúng ta có thể tìm kiếm các tệp đã được sửa đổi trong một khoảng thời gian nhất định.
 
 * Để tìm các tệp đã được sửa đổi trong vòng 2 giờ qua:
```bash
$ find . -mmin -120
```

* Để tìm các tệp chưa được sửa đổi trong vòng 2 giờ qua:
```bash
$ find . -mmin +120
```

* Ví dụ trên chỉ tìm kiếm trên thời gian truy cập. Thời gian tìm kiếm 'a 'được sửa đổi, hoặc
'c' thời gian thay đổi , bạn hãy sử dụng a hoặc c cho phù hợp.

```bash
$ find . -amin -120
$ find . -cmin +120
```

* Định dạng chung sẽ thế này:

```
-mmin n: Tệp đã được sửa đổi n phút trước
-mmin -n: Tệp đã được sửa đổi chưa đầy n phút trước
-mmin + n: Tệp đã được sửa đổi hơn n phút trước
```

* Tìm các tệp đã được sửa đổi trong vòng 2 ngày qua:
```bash
find . -mtime -2
```

* Tìm các tệp chưa được sửa đổi trong vòng 2 ngày qua
```bash
find . -mtime +2
```

**Sử dụng -atime và -ctime cho thời gian truy cập và thời gian thay đổi trạng thái tương ứng.**

Cấu trúc chung sẽ thế này:

```
-mtime n: Tệp đã được sửa đổi nx24 giờ trước
-mtime -n: Tệp đã được sửa đổi ít hơn nx24 giờ trước
-mtime + n: Tệp đã được sửa đổi hơn nx24 giờ trước
```

* Tìm các tệp được sửa đổi trong một phạm vi ngày, từ 2021-06-07 đến 2021-06-08:
```bash
find . -type f -newermt 2021-06-07 ! -newermt 2021-06-08 
```


## 10.4: Tìm kiếm files theo size
* Tìm file lớn hơn 15Mb:
```bash
find -type f -size +15M
```

* Tìm file nhỏ hơn 12kb
```bash
find -type f -size -12k
```

* Tìm file có kích thước đúng bằng 12kb
```bash
find -type f -size 12k
```
hoặc 

```bash
find -type f -size 12288c
```

hoặc
```bash
find -type f -size 24b
```
hoặc
```bash
find -type f -size 24
```
Mấy cái đầu có vẻ dễ hiểu nhưng sau sao lại có số 12288cc, 24b, 24 nhỉ? Nó là do thế này:

Cấu trúc chung của việc tìm find theo size sẽ là 
```bash
find [options] -size n[cwbkMG]
```

Tìm tệp có kích thước n-block, trong đó + n có nghĩa là nhiều hơn n-block, -n có nghĩa là nhỏ hơn n-block và n (không có bất kỳ dấu hiệu nào) có nghĩa chính xác là khối n.
Block size:
1. c: bytes
2. w: 2 bytes
3. b: 512 bytes (default)
4. k: 1 KB
5. M: 1 MB
6. G: 1 GB

## 10.5: Filter path
Tham số -path cho phép chỉ định một mẫu để khớp với đường dẫn của kết quả. Pattern cũng có thể phù hợp với
tên của chính nó.

* Để chỉ tìm các file chứa log ở bất kỳ đâu trong path của chúng (thư mục hoặc tên):
```bash
find . -type f -path '*log*'
```

* Để chỉ tìm các tệp trong thư mục được gọi là log (ở bất kỳ cấp nào):
```bash
find . -type f -path '*/log/*'
```

* Để chỉ tìm các tệp trong một thư mục được gọi là `log` hoặc `data`:
```bash
find . -type f -path '*/log/*' -o -path '*/data/*'
```

* Để tìm tất cả các tệp ngoại trừ những tệp được chứa trong một thư mục có tên `bin`:
```bash
find . -type f -not -path '*/bin/*'
```
## 10.6: Tìm file với định dạng cụ thể

* Để tìm tất cả các tệp của một extention nhất định trong đường dẫn hiện tại, bạn có thể sử dụng cú pháp tìm kiếm sau. 
```bash
find /directory/to/search -maxdepth 1 -type f -name "*.extension"
```
* Để tìm tất cả các tệp loại .txt chỉ từ thư mục hiện tại, hãy làm kiểu này
```bash
find . -maxdepth 1 -type f -name "*.txt"
```

# 11. Sử dụng sort
## 11.1 Sort command output
`sort` command  được sử dụng để sắp xếp một danh sách các dòng.
**Input from a file**
```bash
sort file.txt 
```

**Input from a command**
Bạn có thể sắp xếp bất kỳ lệnh đầu ra nào. Trong ví dụ, danh sách tệp theo sau một pattern.
```bash
find * -name pattern | sort
```

## 11.2: Làm cho output unique
Nếu mỗi dòng của output cần phải là unique, hãy thêm tùy chọn -u.
Để hiển thị chủ sở hữu của các tệp trong thư mục:
```bash
ls -l | awk '{print $3}' | sort -u
```

## 11.3: Numeric sort
Ví dụ ta có một file
```bash
test>>cat file
10.Gryffindor
4.Hogwarts
2.Harry
3.Dumbledore
1.The sorting hat
```

Để sắp xếp tệp này theo số, hãy sử dụng tùy chọn sắp xếp với -n:
```bash
test>>sort -n file 
```

Kết quả thu được sẽ là:
```
1.The sorting hat
2.Harry
3.Dumbledore
4.Hogwarts
10.Gryffindor
```

Vậy  muốn ngược lại thì làm sao? Chúng ta sử dụng -r option. Nó sẽ như này:
```bash
sort -rn file
```
Và kết quả là:
```
10.Gryffindor
4.Hogwarts
3.Dumbledore
2.Harry
1.The sorting hat
```

# Kết luận
Bài viết hướng dẫn bạn một số lệnh file, sort thường được sử dụng trong thực tế lúc làm việc, mong rằng bạn có thể sử dụng, kết hợp chúng tốt nó vào từng trường hợp cụ thể.
Bài viết được tham khảo từ:

**[Bash Reference Manual](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html)**


[**BashNotes for Professionals**](https://books.goalkicker.com/BashBook/)