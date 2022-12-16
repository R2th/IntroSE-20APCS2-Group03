## Xin chào mọi người, phiên bản Python 3.8 cũng đã ra mắt được 1 thời gian rồi. Hôm nay mình xin được liệt kê 1 số tính năng mới ở phiên bản này. 

### I. Walrus Operator
Đây là một loại toán tử mới trong Python, cú pháp rất đơn giản. 
```go
:=
```
Sở dĩ gọi là Walrus Operator vì nhìn ngang trông nó giống mặt con hải mã. Với toán tử này, bạn có thể gán biến trong lệnh thay vì phải viết thêm 1 số dòng.

**Không dùng Walrus Operator:**
```python
>>> a = 4
>>> if (a < 5):
...     print("a < 5")
... 
a < 5
```
**Dùng Walrus Operator:**
```python
>>> if (a := 4 < 5):
...     print("a < 5")
... 
a < 5
```
Walrus Operator trông có vẻ là sẽ làm code của bạn gọn hơn. Nhưng trong cộng đồng Python cũng có nhiều tranh cãi về độ rõ ràng và tính dễ đọc của nó. Trách nhiệm của bạn - người dùng là cân bằng giữa sự ngắn gọn và sự rõ ràng. 

### II. Positional Only Arguments
Đây là một tính năng mới khi bạn định nghĩa hàm, cú pháp là bạn thêm một dấu `/` vào cuối phần định nghĩa tham số của 1 hàm.
```python
def foo(a, b, c, /):
    ...
```
Tác dụng của của ký tự này có nghĩa là: nếu bạn truyền các tham số ở bên trái ký tự `/` vào hàm `foo` ở trên, bạn bắt buộc phải truyền tham số theo thứ tự chứ không được truyền vào tham số theo từ khóa. 
Ví dụ :
```html
>>> def foo(a, b, c, /):
...     print(f"a: {a}, b: {b}, c: {c}")
...
```
**Sai :**
```python
>>> foo(a=1, b=2, c=3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: foo() got some positional-only arguments passed as keyword arguments: 'a, b, c'
```
**Đúng :**
```javascript
>>> foo(1, 2, 3)
a: 1, b: 2, c: 3
```

### III. f-string đã hỗ trợ thêm toán tử "="
Nếu bạn chưa biết f-string, nó là một tính năng hữu ích giúp xử lý chuỗi cực kỳ thuận tiện. Thay vì phải dùng các hàm như `string.format()` hay `%s %d` thì bạn có thể nhúng trực tiếp biến vào chuỗi như sau:
```html
>>> name = "Tony Teo"
>>> print(f"my name is {name}")
my name is Tony Teo
```
Điều này thực sự rất tiện và khiến làm việc với chuỗi ký tự khá đơn giản. Với phiên bản release của Python 3.8, f-string đã hỗ trợ thêm toán tử `=`.  Cú pháp là  f"{expression=}".
Giả dụ, bạn đang debug code của mình, và cần in ra rất nhiều biến như sau:
```erlang
>>> name = "Tony Teo"
>>> age = 43
>>> nationality = "American"
>>> print(f"name={name}, age={age}, nationality={nationality})")
name=Tony Teo, age=43, nationality=American)
```
Có thể thấy việc này sẽ nhanh chóng trở nên dề dà và loằng ngoằng. Bạn có thể rút gọn bằng cách sử dụng toán tử `=` như sau:
```erlang
>>> print(f"{name=}, {age=},{nationality=})")
name='Tony Teo', age=43,nationality='American')
```
Tính năng của toán tử này là thêm 1 dấu bằng đằng sau tên biến hay lệnh của bạn và in ra kết quả. Rất hữu dụng cho những ai hay dùng `print ` để debug

### IV. Hàm `reversed()` đã có thể được áp dụng cho kiểu dữ liệu `dict`
Từ phiên bản 3.7, kiểu dữ liệu dict giữ nguyên thứ tự các key được thêm vào. Ở phiên bản mới bạn có thể dùng hàm reversed để truy cập một dict theo thứ tự đảo ngược của các key.
```python
>>> mah_dict = {'a':1, 'b':2, 'c': 3, 'd': 4}
>>> list(mah_dict)
['a', 'b', 'c', 'd']
>>> list(reversed(mah_dict))
['d', 'c', 'b', 'a']
```

### V. Sửa lỗi unpack cho `return` và `yield`
Với phiên bản 3.8 của Python, bạn đã có thể unpack  ("giải nén ") các biến ngay ở `return`  mà không cần bọc trong ngoặc `()`
```c
temp_list = [1, 2, 3]
>>> def foo():
...     return *temp_list, 4, 5, 6
... 
>>> foo()
(1, 2, 3, 4, 5, 6)
```

### VI. Cảnh báo sai cú pháp mới
Ở trong các phiên bản cũ của Python, nếu bạn mắc lỗi cũ pháp, trình dịch sẽ báo lỗi cho bạn nhưng thường không giúp ích lắm. 

**Ví dụ :**
```html
>>> data = [(1, 2, 3) (4, 5, 6)]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object is not callable
```
Tin nhắn lỗi `TypeError: 'tuple' object is not callable`  không thực sự giúp ích nhiều trong việc xác định lỗi. Tuy nhiên với phiên bản 3.8, Python có thể gợi ý lỗi cho bạn trong 1 số trường hợp. 
```html
>>> data = [(1, 2, 3) (4, 5, 6)]
<stdin>:1: SyntaxWarning: 'tuple' object is not callable; perhaps you missed a comma?
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object is not callable
```
Có thể thấy trình dịch của Python đã gợi ý là người viết có thể đã thiếu 1 dấu phẩy. 

Như vậy đây là những tính năng mới phổ biến nhất của Python 3.8 Hy vọng bạn có thể áp dụng những tính năng này vào dự án của mình. Xin cảm ơn vì đã đọc.  Bạn có thể tham khảo thêm tại [đây](https://deepsource.io/blog/python-3-8-whats-new/)