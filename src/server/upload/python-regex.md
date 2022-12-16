*RegEx hay biểu thức chính quy (Regular Expression) là một chuỗi ký tự tạo thành một biểu mẫu tìm kiếm (search pattern). RegEx được sử dụng để kiểm tra xem một chuỗi có chưa mẫu tìm kiêms được chỉ định hay không.*

### RegEx module
Trong python, có một gói tích hợp có tên `re` có khả năng sử dụng để làm việc với biểu thức chính quy.
Để import module `re`
```python
import re
```

### RegEx trong python
Sau khi import module `re` thì chúng ta có thể sử dụng biểu thức chính quy. Ví dụ: Tìm kiễm chuỗi bắt đầu bằng 'The' và kết thúc bằng 'Spain':
```objectivec
import re

txt = "The rain in Spain"
x = re.search("^The.*Spain$", txt)
```

### Các hàm xử lý RegEx
Module `re` cung cấp cho chúng ta các hàm tìm kiếm một chuỗi phù hợp với biểu thức.

| Hàm | Mô tả |
| -------- | -------- |
| findall     | Trả về một list các kết quả phù hợp     |
| search     |Trả về một `Match` object nếu có bất kỳ vị trị nào trong chuỗi phù hợp     |
| split     | Trả về một list chuỗi đã được phân chia ở vị trí match     |
| sub     | Thay thế các vị trí match với biểu thức bằng một chuỗi khác    |
<br>

#### 1. Hàm findall()
In ra tất cả những đoạn phù hợp:
```python
In [11]: import re 
    ...:  
    ...: str = "The rain in Spain" 
    ...: x = re.findall("ai", str) 
    ...: print(x)                                                                                                  
['ai', 'ai']
```
Hoặc nếu không tìm thấy kết quả nào phù hợp thì trả về một danh sách rỗng
```python
In [12]: import re 
    ...:  
    ...: str = "The rain in Spain" 
    ...: x = re.findall("Portugal", str) 
    ...: print(x)                                                                                                  
[]
```
#### 2. Hàm  search()
Tìm kiếm khoảng trắng đầu tiên trong chuỗi:
```python
In [13]: import re 
    ...:  
    ...: str = "The rain in Spain" 
    ...: x = re.search("\s", str) 
    ...:  
    ...: print("The first white-space character is located in position:", x.start())                               
The first white-space character is located in position: 3
```
Hoặc sẽ trả về None nếu không tìm thấy
```python
In [15]: import re 
    ...:  
    ...: str = "The rain in Spain" 
    ...: x = re.search("\d", str) 
    ...:  
    ...: print(x)                                                                                                  
None
```
#### 3. Hàm split()
Tách các từ trong câu:
```python
In [16]: import re 
    ...:  
    ...: str = "The rain in Spain" 
    ...: x = re.split("\s", str) 
    ...: print(x)                                                                                                  
['The', 'rain', 'in', 'Spain']
```
Chúng ta có thể chỉ định số lần xuất hiện qua tham số `maxsplit`. Ví dụ tách chuỗi ở lần xuất hiện đầu tiên của khoảng trắng:
```python
In [17]: import re 
    ...:  
    ...: str = "The rain in Spain" 
    ...: x = re.split("\s", str, 1) 
    ...: print(x)                                                                                                  
['The', 'rain in Spain']
```

#### 4. Hàm sub()
Thay thế mọi khoảng trắng bằng số 9:
```python
In [18]: import re 
    ...:  
    ...: str = "The rain in Spain" 
    ...: x = re.sub("\s", "9", str) 
    ...: print(x)                                                                                                  
The9rain9in9Spain
```
Hoặc có thể hạn chế số lần thay thế qua tham số `count`:
```swift
In [19]: import re 
    ...:  
    ...: str = "The rain in Spain" 
    ...: x = re.sub("\s", "9", str, 2) 
    ...: print(x)                                                                                                  
The9rain9in Spain
```

### Metacharacters
Metacharacters là những ký tự có ý nghĩa đặc biệt
| Ký tự | Mô tả | Ví dụ |Chuỗi phù hợp|
| -------- | -------- | -------- | -------- |
| []     | Một tập hợp các ký tự     | "[a-e]"     | "adbc" |
| \     | Tín hiệu thể hiện một chuỗi đặc biệt (hoặc sử dụng để thoát các ký tự đặc biệt)     | "\d"     | "123" |
| .     | Bất kỳ ký tự nào (ngoại trừ ký tự dòng mới)    | "he..o"     | "henno"
| ^     | Bắt đầu chuỗi     | "^hello"     | "hello gua"
| $     | Kết thúc chuỗi     | "world$"     | "helo world"
| *     | Không hoặc nhiều lần xuất hiện    | "aix*"     | "ai"
| +     | Xuất hiện ít nhất một lần     | "aix+"     | "aixxxx"
| {}     | Chính xác số lần xuất hiện     | "aix{2}"     | "aixx"
| \|     | Hoặc     | "a\|b"     | "a"
| ()     | Nhóm ký tự     | "(hello)"     | "hello"

### Special Sequences
Special Sequences là chuỗi đặc biệt và được bắt đầu bằng ký tự `\`, nó có ý nghĩa đặc biệt và thường trợ giúp cho việc mô tả biểu thức chính quy được gọn gàng hơn

| Ký tự | Mô tả | Ví dụ| Chuỗi phù hợp
| -------- | -------- | -------- | -------- |
| \A     | Bắt đầu chuỗi bằng ký tự chỉ định     | "\AThe"     | "The world"
| \b	     | Bắt đầu hoặc kết thúc của một từ bằng ký tự chỉ định    | r"\bSpa"<br>r"ain\b"    | "The rain in Spain"<br>"He is Bi Rain"
| \B     | Khớp với các ký tự chỉ định nhưng không nằm ở đầu hoặc cuối từ     |  r"\BSpa"<br>r"ain\B"     | "This is GSpan company"<br>"No words are rains"
| \d     | Chuỗi chứa ký tự là chữ số     | "\d"     | "he1lo"
| \D     | Chuỗi không chứa ký tự là số     | "\D"     | "Hello"
| \s     | Chuỗi chứa khoảng trắng     | "\s"     | "Hello world"
| \S     | Chuỗi không chứa khoảng trắng     | "\S"     | "HelloWorld"
| \w     | Chuỗi chứa bất kỳ ký tự nào trong nhóm từ a tới Z, từ 0 tới 9 và dấu _ (underscore)     | "\w"     | "This is global_variable"
| \W     | Ngược lại với `\w`     | "\W"     | "\*& ^ !"
| \Z     | Kết thúc chuỗi bằng các ký tự được chỉ định     | "Spain\Z"     | "The Spain"

### Sets
Sets là tập hợp các ký tự bên trong dấu `[]` với ý nghĩa đặc biệt:

| Set | Mô tả | 
| -------- | -------- |
| [arg]     | Chuỗi chứa một trong các ký tự `a`, `r` hoặc `g`     |
| [a-n]     | Chuỗi chứa một trong các ký tự nằm giữa `a` và `n` trong bảng chữ cái `alphabet`     |
| [^arg]     | Chuỗi không chứa bất kỳ ký tự `a`, `r` và `g`     |
| [0124]     | Chuỗi chứa bất kỳ chữ số nào trong nhóm `0`, `1`, `2` hoặc `4`     |
| [0-9]     | Chuỗi chứa ký tự chữ số (tương đương sử dụng `\d`)     |
| [0-5][0-9]     | Chuỗi chứa 2 ký tự số liên tiếp, số đầu tiên trong khoảng từ 0->5, số thứ 2 trong khoảng 0->9     |
| [a-zA-Z]     | Chuỗi chứa ký tự là chữ cái không phân biệt hoa và thường     |
| [+]     | Trong sets, các  `Special Sequences` không mang ý nghĩa đặc biệt nữa, chúng chỉ là các ký tự thông thường. Biểu thức bên là chuỗi chứa ký tự `+`   |

### Đối tượng Match
Match là đối tượng chứa thông tin về tìm kiếm phù hợp và kết quả của chúng. Nếu không có tìm kiếm nào phù hợp thì sẽ trả về `None` chứ không phải là đối tượng `Match`
Các thuộc tính và phương thức của `Match`

*.string* trả về chuỗi được truyền vào hàm
*.span()* trả về một tuple chứa điểm bắt đầu và kết thúc của vị trí phù hợp
*.group()* trả về phần chuỗi phù hợp

In ra vị trị bắt đầu và kết thúc của lần xuất hiện đầu tiên của từ bắt đầu bằng chữ `S`:
```python
In [20]: import re 
    ...:  
    ...: str = "The rain in Spain" 
    ...: x = re.search(r"\bS\w+", str) 
    ...: print(x.span())                                                                                           
(12, 17)
```

In ra chuỗi đã được truyền vào hàm:
```python
In [22]: import re 
    ...:  
    ...: str = "The rain in Spain" 
    ...: x = re.search(r"\bS\w+", str) 
    ...: print(x.string)                                                                                           
The rain in Spain
```

In ra đoạn phù hợp với biểu thức trong chuỗi cho trước:
```python
In [23]: import re 
    ...:  
    ...: str = "The rain in Spain" 
    ...: x = re.search(r"\bS\w+", str) 
    ...: print(x.group())                                                                                          
Spain
```

### Tổng kết
RegEx thật sự rất mạnh mạnh mẽ và nó sẽ giúp các bạn xử lý được rất nhiều bài toán khó, phức tạp nếu áp dụng cách thông thường. Nhưng nó cũng thực sự khá rối rắm với nhưng người chưa tìm hiểu kỹ về nó. Hy vọng các bạn sẽ tìm được niềm vui khi sử dụng RegEx