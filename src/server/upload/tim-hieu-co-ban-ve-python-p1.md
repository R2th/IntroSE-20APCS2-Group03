Hello, xin  chào mọi người, mình là một dev FE, nhưng mấy hôm nay thấy hứng thú với ``python`` nên quyết định làm 1 series về những gì mà mình học được. Lưu ý là những chia sẽ của mình cũng là một thằng bắt đọc học `python` thôi nhé. Mục đích là sau nàyy, mình có thể  tự  đọc lại những gì  mình tìm hiểu được mà không cần mất nhiều thời gian đọc docs. Mình có  search và biết có web này  học  `python` cơ bản: [Learn  python](https://www.learnpython.org/en/), nên mình sẽ dựa vào website này để  tìm hiểuu. Cùng tìm  hiều  `python` với  mình  nhé.
## Mở đầu
`python` là một ngôn ngữ hướng đối tượng, cao cấp, mạnh mẽ. Python có cấu trúc dữ liệu cấp cao mạnh mẽ và cách tiếp cận đơn giản nhưng hiệu quả đối với lập trình hướng đối tượng. Cú pháp lệnh của Python là điểm cộng vô cùng lớn vì sự rõ ràng, dễ hiểu và cách gõ linh động làm cho nó nhanh chóng trở thành một ngôn ngữ lý tưởng để viết script và phát triển ứng dụng trong nhiều lĩnh vực, ở hầu hết các nền tảng. 

Có 2 phiên bản chính, đó là  `python 2` và  `python 3`.  Theo như tài liệu thì  2 phiên bản khá khác nhau và trong  tutorial sử dụn `python  3` nên mình cũng làm theo luôn (Chứ có biết nó khác nhau cái gì  đâu, cứ mới nhất mà "nã" :D)
## Learn basic
### Hello, worlld!
``Hello, world!`` bài học vỡ lòng của mọi ngôn ngữ lập trình nhỉ  :D. Để in một chuỗi, số,... trong  python, chúng ta sử  dụng cú pháp `print`.
```python
print("This line will be printed.");
print(4);
```
Nếu là `javascript` thì sẽ là `console.log` đấy. Trong `javascript` các bạn biết rằng  các block của function, classs, vòng lặp sẽ  là `{}`, nhưng trong  `python` thì sẽ là các  `indentation` (thụt  lề) sừ dụng ``tab`` hoặc  ` ` (dấu cách) đều được. Theo chuẩn python thì  sẽ là 4 dấu cách.
```python
if x == 1:
    # indented four spaces
    print("x is 1.")
```
Tiếp theo, chúng ta sẽ đến với `variables và type`
## Variables and Types
### Number
Python hỗ trợ 2 kiểu: `Int` và `Float`.
Để khai báo integer, chúng ta dùng syntax sau:
```python
int = 4;
print(int);
```
Khai báo floating
```python
myfloat = 7.5;
print(myfloat);
```
### Strings
`String` được khai báo trong dấu nháy đơn hoặc dấu nháy kép
```python
mystring = 'Hello'
print(mystring)
mystring = "hello"
print(mystring)
```
Việc dùng dấu nháy kép có thể bao gồm một hoặc nhiều dấu nháy đơn bên trong nó
```python
mystring = "Don't worry about apostrophes";
print(mystring);
```
Gán biến trong một line code
```python
a, b = 3, 4
print(a,b)
```
### Lists
`List` cũng tương tự như ``array``, List có thể chứa nhiều loại biến và truy cập các phần tử một cách dễ dàng.
```python
mylist = []
mylist.append(1)
mylist.append(2)
mylist.append(3)
print(mylist[0]) # prints 1
print(mylist[1]) # prints 2
print(mylist[2]) # prints 3

# prints out 1,2,3
for x in mylist:
    print(x)
```
Truy cập một index không tồn tại trong `List` sẽ gây ra `error`
```python
mylist = [1,2,3]
print(mylist[10]) // An error
```
## Basic operators
### Arithmetic Operators
Cũng giống như các ngôn ngữ khác, các toán tử cộng, trừ, nhân, chia cũng sẽ được dùng trên các type numbers
```python
number = 1 + 2 * 3 / 4.0
print(number)
```
Một toán tử khác cũng được sử dụng là `%` (chia lấy dư)
```python
remainder = 11 % 3
print(remainder)
```
Khác với Javascript một số syntax về Math cũng đơn giản hơn, ví dụ như luỹ thừa của một số
```python
squared = 7 ** 2
cubed = 2 ** 3
print(squared)
print(cubed)
```
### Operators with Lists
Việc nối 2 lists với nhau cũng khá dễ dàng và tường minh
```python
even_numbers = [2,4,6,8]
odd_numbers = [1,3,5,7]
all_numbers = odd_numbers + even_numbers
print(all_numbers)
```

Cũng như với String, Python cũng hỗ trợ tạo `list` mới với các phần tử lặp bằng toán tử nhân
```python
print("hello" * 3) // "hellohellohello
print([1,2,3] * 3) // [1,2,3,1,2,3,1,2,3]
```
## String Formatting
Python sử dụng định dạng chuỗi kiểu C để tạo chuỗi mới. Toán tử "%" được sử dụng để định dạng một tập hợp các biến nằm trong một "tuple" (danh sách kích thước cố định), cùng với một chuỗi định dạng, chứa văn bản bình thường cùng với "ký hiệu đối số", các ký hiệu đặc biệt như "% s" và "% d".
```python
# This prints out "Hello, John!"
name = "John"
print("Hello, %s!" % name)
```
Để dùng 2 hoặc nhiều đối số đặc biệt.
```python
# This prints out "John is 23 years old."
name = "John"
age = 23
print("%s is %d years old." % (name, age))
```
Có một vài đối số đặc biệt như:
%s - String (or any object with a string representation, like numbers)

%d - Integers

%f - Floating

%.<number of digits>f - Floating : Số chữ số sau dấu thập phân

%x/%X - Integers (hệ hex) (lowercase/uppercase)
#### Continue...
    
 Hôm nay đến đây thôi, cảm ơn mn đã theo dõi, vì là một người mới dấn thân vào python nên những kiến thức mình học được khá basic. Trong bài viết chỗ nào còn thiếu sót mn cứ cmt để mình học hỏi thêm nhé. (bow)