# Lời nói đầu

Chào các bạn, mình là một PHP developer và hoàn toàn chưa biết gì về python cả. Tuy nhiên nhiều khi code mãi một ngôn ngữ thì cũng chán nên mình bắt đầu vào một ngôn ngữ mới. Nếu bạn cũng như mình hay đơn giản chỉ là muốn tìm hiểu về một ngôn ngũ mới thì mình bắt đầu nhé ... Let GO !

# Nội dung
## 1: Giới thiệu
Python là một ngôn ngữ lập trình phổ biến. Nó được tạo ra vào năm 1991 bởi Guido van Rossum.

Nó được sử dụng cho :
* Web development
* Software development
* System scripting
* Mathematics


**Python có thể làm gì ?**
* Python có thể được sử dụng trên một máy chủ để tạo các ứng dụng web.
* Python có thể được sử dụng cùng với phần mềm để tạo luồng công việc khác.
* Python có thể kết nối với hệ thống cơ sở dữ liệu. Nó cũng có thể đọc và sửa đổi các tập tin
* Python có thể được sử dụng để xử lý dữ liệu lớn và thực hiện các biểu thức toán học phức tạp.


**Why Python?**

* Python có thể hoạt động trên các nền tảng khác nhau (Windows, Mac, Linux, Raspberry Pi, v.v.).
* Python có một cú pháp đơn giản tương tự như ngôn ngữ tiếng Anh.
* Python có cú pháp cho phép các developer viết các chương trình ngắn gọn và súc tích hơn một số ngôn ngữ lập trình khác.
* Python chạy trên một hệ thống thông dịch , có nghĩa là mã có thể được thực thi ngay sau khi nó được viết.
* Python có thể được xử lý theo cách hướng: hướng đối tượng hoặc hướng chức năng.

**Điều cần biết**
* Phiên bản Python mới nhất nhất là Python 3, mà chúng ta sẽ tìm hiểu trong hướng dẫn này

** Cú pháp Python so với các ngôn ngữ lập trình khác**
* Python được thiết kế để dễ đọc và có một số điểm tương đồng với  tiếng Anh 
* Python có cú pháp trái ngược với các ngôn ngữ lập trình khác thường sử dụng dấu chấm phẩy hoặc dấu ngoặc đơn để kết thúc và thực thi, thay vì đó nó sẽ detect ra xem có dòng mới hay ko để thực thi lệnh đó
* Python dựa vào thụt lề, sử dụng khoảng trống, để xác định phạm vi : như phạm vi của các vòng lặp, các function và class. Các ngôn ngữ lập trình khác thường sử dụng dấu ngoặc nhọn cho mục đích này.

## 2: Những điều đầu tiên
**Cài đặt**

Phần lơn các máy tính các hệ điều hành thường mặc định đã cài đặt python cho . Để check xem máy tính của bạn đã cài đặt hay chưa bạn có thể vào Command Line của hệ điều hành vào chạy lệnh sau :
```
python --version
```

Nếu bạn thấy rằng máy bạn chưa cài đặt python thì  bạn có thể tải nó miễn phí từ trang web sau [https://www.python.org/](https://www.python.org/)

**Python Quickstart**

Cũng như mọi ngôn ngữ khác, bạn có thể viết code python vào 1 file (đuôi .py) , sau đó dung lệnh để chạy nó.

Một ví dụ đơn giản: 
Bạn tạo 1 file helloworld.py có nội dung như sau :
```
print("Hello, World!")
```

Sau đó bạn vào command chạy lệnh :

```
python đường_dẫn/helloworld.py
```

Ok, vậy là xong ... Output ra sẽ là :

```
Hello, World!
```

**Python Command Line**

Những ai đã code laravel chắc hẳn ko lạ gì chức năng `tinker` giúp bạn test các dòng lệnh ngắn gọn xem đúng hay không 1 cách nhanh nhất
Tương tự như vậy `Python` cũng support chức năng này. Bạn chỉ cần vào command line và gõ :
```
python
```
Sau đó gõ các lệnh mà bạn muốn thực hiện . Đơn giản =))

```
C:\Users\Your Name>python
Python 3.6.4 (v3.6.4:d48eceb, Dec 19 2017, 06:04:45) [MSC v.1900 32 bit (Intel)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> print("Hello, World!")
Hello, World!
```

## 3: Cú pháp

**Indentations**

Ở nhiều loại ngôn ngữ khác (cụ thể là `php`) việc Indent chỉ mang tính chất làm code trở nên dễ đọc, dễ nhìn hơn. Tuy nhiên với python thì Indent đóng vai trò rất quan trọng

Python sử dụng Indent để chỉ ra từng khối của mã code. Ví dụ :
```
if 5 > 2:
  print("Five is greater than two!")
```

Python sẽ đẩy ramột lỗi nếu bạn bỏ qua Indent. Ví dụ
```
if 5 > 2:
print("Five is greater than two!")
```
==> IndentationError: expected an indented block

**Comments**

Như mọi ngôn ngữ lập trình khác, Python có khả năng comment các đoạn chú giải trong code bằng cách băt đầu 1 đoạn comment bằng dấu `#`. Ví dụ :

```
#This is a comment.
print("Hello, World!")
```

## 4: Variables

**Khởi tạo biến**
* Khá giống với PHP, Python không có một đoạn mã hay cách khai báo nào để khởi tạo một biến.
* Một biến được khởi tạo ngay khi biến đó được gán giá trị nào đó .
* Các biến không cần phải được khai báo với bất kỳ kiểu cụ thể nào và thậm chí có thể thay đổi kiểu sau khi chúng đã được thiết lập.

```
x = 5
print(x) #ouput : 5
x = "John"
print(x) #ouput : John
```

**Các quy tắc đặt tên biến**
* Tên biến phải bắt đầu bằng một ký tự hoặc ký tự gạch dưới
* Tên biến không thể bắt đầu bằng số
* Tên biến chỉ có thể chứa ký tự chữ và số và dấu gạch dưới (A-z, 0-9 , _)
* Tên biến có phân biệt hoa thường


## 5: Các loại kiểu dữ liệu
### 5.1 : Numbers
Python có 3 loại kiểu dữ liệu số :
* int : là một số nguyên, dương hoặc âm, không có phần thập phân, có độ dài không giới hạn.
* float : là một số, dương hoặc âm, chứa một hoặc nhiều số thập phân. (cũng có thể là số mũ với một "e" và sau đó là chỉ ra số mũ)
* complex : có phần viết bằng chữ "j" làm phần ảo:

Để xác minh kiểu của bất kỳ đối tượng nào trong Python, hãy sử dụng hàm `type ()`:
```
x = 1    
y = 2.8  
z = 1j   
print(type(x)) # int
print(type(y)) # float
print(type(z)) # complex
```

### 5.2 : Strings

Các chuỗi ký tự trong python được bao quanh bởi dấu nháy đơn hoặc dấu ngoặc kép.

Giống như nhiều ngôn ngữ lập trình phổ biến khác, các chuỗi trong Python là các mảng byte biểu diễn các ký tự unicode. Tuy nhiên, Python không có kiểu dữ liệu ký tự, một ký tự đơn giản chỉ là một chuỗi có độ dài 1. Dấu ngoặc vuông có thể được sử dụng để truy cập các phần tử của chuỗi.

```
a = "Hello, World!"
print(a[1]) # Print : e
print(a[2:5]) # Print : llo
```
Ngoài ra, Python cúng support 1 số phương thức sau :
```
a = " Hello, World! "
print(a.strip()) # returns "Hello, World!" (Like trim() function in php)
print(len(a)) # returns 16
print(a.lower()) # returns " hello, world! "
print(a.upper()) # returns " HELLO, WORLD! "
print(a.replace("H", "J")) # returns " Jello, World! "
print(a.split(",")) # returns ['Hello', ' World!']
```

### 5.3 : Python Collections
Trong ngôn ngữ lập trình Python có bốn loại dữ liệu Collections :
* `List ` là một Collections được lưu theo thứ tự  và có thể thay đổi giá trị. Cho phép giá trị có thể trùng lặp.
* `Tuple ` là một Collections được lưu theo thứ tự và không thể thay đổi giá trị. Cho phép giá trị có thể trùng lặp.
* `Set` là một Collections không có thứ tự, không đánh chỉ mục và có thay đổi giá trị. Không cho phép giá trị có thể trùng lặp.
* `Dictionary` là một Collections không có thứ tự, đánh chỉ mục và có thể thay đổi giá trị. Không cho phép giá trị có thể trùng lặp.

Chính vì thế khi chọn một loại Collections, việc hiểu rõ các tính chất của Collections là rất hữu ích. Việc chọn đúng loại  Collections sẽ tăng hiệu quả hoặc tăng tính bảo mật.

**List**
```
thislist = list(("apple", "banana", "cherry")) 
print(thislist) # return ['apple', 'banana', 'cherry']
```

Các được support :


| Method | Description |
| -------- | -------- | 
| [append()](https://www.w3schools.com/python/ref_list_append.asp)     | Thêm phần tử vào cuối danh sách     | 
| [clear()](https://www.w3schools.com/python/ref_list_clear.asp)     | Xóa tất cả các phần tử khỏi danh sách     |
| [copy()](https://www.w3schools.com/python/ref_list_copy.asp)    | Trả về bản sao của danh sách     |
| [count()](https://www.w3schools.com/python/ref_list_count.asp)    | Trả về số lượng phần tử có giá trị      |
| [extend()](https://www.w3schools.com/python/ref_list_extend.asp)    | Thêm mảng phần tử (hoặc 1 phần tử) vào cuối danh sách     |
| [index()](https://www.w3schools.com/python/ref_list_index.asp)     | Trả về chỉ mục phần tử      |
| [insert()](https://www.w3schools.com/python/ref_list_insert.asp)     | Thêm phần tử ở vị trí đã chỉ định      |
| [pop()](https://www.w3schools.com/python/ref_list_pop.asp)     | Xóa phần tử ở vị trí đã chỉ định     |
| [remove()](https://www.w3schools.com/python/ref_list_remove.asp)     | Loại bỏ mục đầu tiên với giá trị được chỉ định     |
| [reverse()](https://www.w3schools.com/python/ref_list_reverse.asp)     | Đảo ngược thứ tự của danh sách     |
| [sort(https://www.w3schools.com/python/ref_list_sort.asp)]()     | Sắp xếp danh sách     |

**Tuple**
```
# Hàm tạo
thistuple = ("apple", "banana", "cherry")
print(thistuple) #return ('apple', 'banana', 'cherry')

# Hoặc dùng cách 
thistuple = tuple(("apple", "banana", "cherry")) 
print(thistuple)  #return ('apple', 'banana', 'cherry')

# Không thể thay đổi giá trị của phần tử
thistuple = ("apple", "banana", "cherry")
thistuple[1] = "blackcurrant" # test changeability
print(thistuple) #return ('apple', 'banana', 'cherry')
```

**Set**

  Cũng có thể sử dụng hàm tạo set () để tạo một `Set`. Bạn có thể sử dụng phương thức `add()` để thêm một mục và phương thức `remove()` để loại bỏ một mục khỏi tập hợp. Hàm len () trả về kích thước của tập hợp.
```
# Hàm tạo
thisset = {"apple", "banana", "cherry", "apple"}
print(thisset) #return {'apple', 'banana', 'cherry'}
# Hoặc dùng cách 
thisset = set(("apple", "banana", "cherry", "apple"))
print(thisset) #return {'apple', 'banana', 'cherry'}
```

**Dictionary**
```
# Hàm tạo
thisdict =	{
  "apple": "green",
  "banana": "yellow",
  "cherry": "red"
}
print(thisdict) #return {'apple': 'red', 'banana': 'yellow', 'cherry': 'red'}

# Hoặc dùng cách 
thisdict =	dict(apple="green", banana="yellow", cherry="red")
print(thisdict) #return {'apple': 'green', 'banana': 'yellow', 'cherry': 'red'}

# Add record
thisdict["damson"] = "purple"
print(thisdict) #return {'apple': 'green', 'banana': 'yellow', 'cherry': 'red', 'damson': 'purple'}

# Remove record
del(thisdict["damson"])
print(thisdict) #return {'apple': 'green', 'banana': 'yellow', 'cherry': 'red'}

#edit record
thisdict["apple"] = "red1"
print(thisdict) #return {'apple': 'red1', 'banana': 'yellow', 'cherry': 'red'}
```

Ok, chúng ta đã tìm hiểu khá nhiều rồi. Mình xin kết thúc bài viết ở đây, hẹn gặp lại các bạn trong bài viết sau.

# Tài liệu tham khảo
[https://www.w3schools.com/python/default.asp](https://www.w3schools.com/python/default.asp)