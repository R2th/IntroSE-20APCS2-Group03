Xin chào mọi người, hôm nay mình xin giới thiệu 1 số convention nhằm giúp bạn viết code Python đẹp hơn, hay theo cách gọi của các lập trình viên Python: Pythonic hơn.

Tiêu chuẩn viết code Python chính thức là PEP 8 (Python Enhancements Proposal 8 ) - style guide. Các chuẩn này thì khá nhiều, mình xin tóm tắt ở dưới một số chuẩn tiêu biểu như sau:


### 1. Cách dòng và thụt vào
Bạn nên dùng 4 ký tự space ở mỗi tầng indent. Nếu dòng của bạn quá dài (>79 hoặc >119 ký tự tùy nơi), bạn có thể tách dòng đó thành nhiều dòng khác. Chú ý, các thành phần được xuống dòng nên được sắp xếp thẳng đứng với các thành phần ở dòng trên:

Ví dụ: 

Đúng
```python
func = this_is_a_long_function(horse, unicorn,
                               beetle_bug, giant_whale)
                                                                        
                                                               
```
Sai
```python
func = this_is_a_long_function(horse, unicorn,
                       beetle_bug, giant_whale)
                                                                                                                   
```

Bạn cũng có thể thêm 4 ký tự space (tương đương với 1 lần thụt vào nữa) để phân biệt các tham số với các thành phần khác trong hàm
Ví dụ: 

Đúng
```python
def this_is_a_long_function(horse, unicorn,
                            beetle_bug,
                            giant_whale):
    pass              
                                                                        
                                                               
```
Sai
```python
def this_is_a_long_function(
    horse, unicorn,
    beetle_bug, giant_whale):
    pass                       
                                                                                                                   
```

### 2. Dùng Tab hay Space ?

Trong Python thì Space (dấu cách) được ưu tiên hơn. Còn dấu Tab nên sử dụng trong các trường hợp mà code đã sử dụng sẵn Tab rồi. 
*Lưu ý: Python 3 không cho phép sử dụng Tab và Space lẫn lộn trong cùng 1 file.

### 3. Xuống dòng trước hay sau toán tử?


Điều này thực ra vẫn còn gây ra tranh cãi, nhưng một số lập trình viên Python thích xuống dòng sau toán tử để phù hợp với các cách biểu diễn trong toán học:

```Python
sum = (number_1
       + number_2
       + number_3
       + number_4
      )
```

### 4. Dòng trống
Bạn nên tách định nghĩa của `def` và` Class` với các phần trên bằng 2 dòng trống, và các method trong `Class` cách nhau 1 dòng trống. 

### 5. Import
Mỗi dòng chỉ nên import 1 thư viện.

Ví dụ:

Đúng:
```Python
import flask
import app
```

Sai:
```Python
import flask, app
```

Tuy nhiên, nếu import 2 module con từ 1 thư viện, bạn có thể import trong 1 dòng.
```Python
from Flask import flask, app
```

Các lệnh `import` nên được đặt ở đầu file, trước khi bạn khai báo các module và biến/hằng số.

Bạn nên nhóm các lệnh import theo thứ tự sau:
1. Các thư viện tiêu chuẩn như os, sys
2. Các thư viện bên thứ 3
3. Các module/thư viện local

### 6. Sử dụng dấu cách
Bạn nên tránh các dấu cách thừa trong các trường hợp sau:

- Ngay bên trong ngoặc.

Đúng:

```Python
foo = (bar, buz)
```

Sai:

```Python
foo = (bar, buz )
```

- Ở sau dấu phẩy và trước ngoặc đóng

Đúng:
```Python
foo = (bar,)
```

Sai:

```Python
foo = (bar, )
```

- Ngay trước dấu phẩy, chấm phẩy, hoặc hai chấm

Đúng:
```Python
if a is True: print(1, 2); x, y = 1, 2
```

Sai:

```Python
if a is True : print(1 , 2); x , y = 1 , 2
```

Mỗi lần gán biến,  chỉ cần một dấu cách

Đúng:
```Python
foo = 1
bar = 2
this_is_a_really_long_name = 3
```

Sai:

```Python
foo                        = 1
bar                        = 2
this_is_a_really_long_name = 3
```

### 7. Cách đặt tên
- Tên Class và Exception nên viết hoa mỗi chữ cái đầu tiên của từ
```
Class SomeExampleClass
```
- Tên hàm và biến nên viết thường và tách từ bằng ký tự _
```
def some_example_function
```
- Tên hằng số nên viết hoa toàn bộ
```
CONSTANT_STRING = "STRING"
```

Đó là một số convention cơ bản nhất giúp bạn viết code Python, cảm ơn các bạn đã đọc. Chúng ta sẽ quay lại chủ đề này trong 1 bài viết tương lai. Nếu muốn, bạn có thể đọc thêm ở [đây](https://www.python.org/dev/peps/pep-0008/).