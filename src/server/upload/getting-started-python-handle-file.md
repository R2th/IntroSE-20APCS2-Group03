# Lời nói đầu.
Xin chào mọi người  đã quay trở lại seria bài viết về python của mình :D . Ai cần đọc về bài viết về python phần 1, 2 và 3 của mình thì click vào link bên dưới nhé :D
- [Getting started Python - P1](https://viblo.asia/p/getting-started-python-V3m5WBWWlO7)
-  [Getting started Python - P2](https://viblo.asia/p/getting-started-python-p2-3Q75wkz25Wb)
-  [Getting started Python - P3](https://viblo.asia/p/getting-started-python-p3-maGK7mOAlj2)


Ở các bài viết đầu trước mình đã giới thiêu sơ lược cho các bạn về  những điều chung nhất của Python: Những điều cần biết đầu tiên, Cú pháp , Biến và các loại kiểu dử liệu, các toán tử, cấu trúc `If ELES`, `FOR`, `WHILE` .
Ngày hôm nay chúng ta sẽ bắt đầu vào các phần nâng cao hơn nhé . . . Let GO :D 

# Nội dung.
## I:Python và xử lý File
Xử lý file là một trong những phần rất quan trọng của tất các các ứng dụng web và đương nhiên thì  `Python` cũng có chứa các `funtion` dành cho việc :

* Mở File
* Tạo File
* Đọc File
* Chỉnh sửa File
* Xóa file

### 1 : Mở File
 `function` trợ giúp cũng ta làm việc với file trong Python là  `open()`  function.
 
  `open()`  function cần 2 tham số truyền vào đó là `đường dẫn file` và `mode`. 
 
 Có 4 phương thức khác nhau tham số  `mode` để mở file. Cụ thể là :
 
* "r" - Read - Giá trị mặc định của hàm. Mở 1 file chỉ để đọc và sẽ báo lỗi nếu file đó không tông tại

* "a" - Append - Mở 1 file chỉ để đọc và chỉnh sửa . Nếu file không tồn tại thì tạo 1 file mới

* "w" - Write - Mở 1 file  để đọc và chỉnh sửa  và sẽ báo lỗi nếu file đó không tông tại

* "x" - Create - Tạo thêm một file chỉ định và sẽ báo lỗi nếu file đó đã tồn tại rồi

Ví dụ : 
```
f = open("demofile.txt")
```

Ngoài ra, sau các phương thức trên bạn có thể têm vào các hậu tố đề chỉ rõ file bạn muốn làm việc là file dạng nào . 

* "t" - Text - Default value. Dữ liệu dạng text
* "b" - Binary - Binary mode (e.g. images)

Ví dụ : 
```
f = open("demofile.txt", "rt")
```

Chú ý : Hãy xác định rõ file của bạn muốn mở có chắc chắn tồn tại hay không và bạn muốn làm gì với nó để có những điều chỉnh thích hợp nhé.

### 2 : Đọc File

Giả sử chúng ta có file sau :
```
Hello! Welcome to demofile.txt
This file is for testing purposes.
Good Luck!
```

Đầu tiên bạn cần chắc chắn rằng đã phải mở file bằng cách sử dụng hàm `open()`.

Function `open()` trả ra cho chúng ta một đối tượng file, và chúng ta có phương thức `read()` để đọc nội dung file đó :

```
f = open("demofile.txt", "r")
print(f.read())
```

Với đoạn code trên, chúng ta sẽ show ra ngoài màn hình tất cả nôi dung file text bên trên. Tuy nhiên , nếu bạn muốn chỉ show 1 phần nội dung của file, `python` cũng cũng cấp function giúp bạn đọc đến đoạn nạo bạn muốn. Cụ thể như sau :

```
f = open("demofile.txt", "r")
print(f.read(5)) // Print : Hello
```

==> show ra màn hình 5 kí tự đầu tiên của file

Nếu bạn muôn đọc file theo từng line 1 , cũng có fucntion đọc từng dòng 1 nhé :

```
f = open("demofile.txt", "r")
print(f.readline()) // Print : Hello! Welcome to demofile.txt
```

Và nếu ban gọi hàm `readline()` lần thứ 2, thì có thể đọc dòng thứ 2 của file . Cụ thể 

```
f = open("demofile.txt", "r")
print(f.readline())// Print : Hello! Welcome to demofile.txt
print(f.readline())// Print : This file is for testing purposes.
```

Còn đương nhiên nếu bạn muốn đọc từng dòng của của file thì ta có thể dùng `for` như sau :

```
f = open("demofile.txt", "r")
for x in f:
  print(x)
```

### 3 : Chỉnh sửa File

Để chỉnh sửa file thì điều đầu tiên cần phải mở file và xem file đó có tồn tại hay không để sử dụng hàm `open()` hợp lí :

* "a" - Nếu file bạn sử dụng chưa chắc chắn đã tồn tại (nếu không tồn tại thì tạo file mới)

```
f = open("demofile.txt", "a")
f.write("Now the file has one more line!")

// Nếu file "demofile.txt" không tồn tại thì tạo ra file mới và tạo thêm dòng mới. Nếu file tồn tại thì sẽ tạo thêm dòng mới vào file đã tồn tại
```
    

* "w"  - Nếu file bạn sử dụng  chắc chắn đã tồn tại thì sử dụng `mode` này là ok 
```
f = open("demofile.txt", "w")
f.write("Woops! I have deleted the content!")

// Ghi đè nội dung mới vào file đã tồn tại
```
    
Nếu bạn muốn tạo file mới  bằng Python, bạn có thể dùng hàm `open` và sử dụng một trong những cách sau :


* "a" - Append - Mở 1 file chỉ để đọc và chỉnh sửa . Nếu file không tồn tại thì tạo 1 file mới

* "w" - Write - Mở 1 file  để đọc và chỉnh sửa  và sẽ báo lỗi nếu file đó không tông tại

* "x" - Create - Tạo thêm một file chỉ định và sẽ báo lỗi nếu file đó đã tồn tại rồi


### 4 : Xóa File

Để xóa được file thông quá `Python` thì cần sử dụng `OS` Module và chạy `os.remove()` function. Cụ thể như sau :

```
import os
os.remove("demofile.txt")
```

Với hàm trên , bạn có thể nhận được về lỗi nếu file `demofile.txt` không tồn tại . Vì vậy để tránh khỏi việc xuất hiện lỗi chúng ta có thể check file có tồn tại hay không rồi xóa. Cụ thể như sau :

```
import os
if os.path.exists("demofile.txt"):
  os.remove("demofile.txt")
else:
  print("The file does not exist")
```

Đôi khi, chúng ta cần xóa toàn bộ thư mục , điều này hoàn toàn có thể với Python. Và để là được điều này sử dụng phương thức `os.rmdir()` . Cụ thể như sau :

```
import os
os.rmdir("myfolder")
```

Ok, chúng ta đã tìm hiểu xong về việc xử lý file trong Python. Mình xin kết thúc bài viết ở đây, hẹn gặp lại các bạn trong bài viết sau.
# Tài liệu tham khảo
[https://www.w3schools.com/python/default.asp](https://www.w3schools.com/python/default.asp)