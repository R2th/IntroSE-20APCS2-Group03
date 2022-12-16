# Lời nói đầu.
Xin chào mọi người đã quay trở lại seria bài viết về python của mình :D  . Ai cần đọc về bài viết về python  của mình thì click vào link bên dưới nhé :
* [Getting started Python - P1](https://viblo.asia/p/getting-started-python-V3m5WBWWlO7)
* [Getting started Python - P2](https://viblo.asia/p/getting-started-python-p2-3Q75wkz25Wb)

Ở bài viết trước mình đã giới thiêu cho các bạn những cú pháp, toán tử cũng như cấu trúc cơ bản được sử dụng vô cùng nhiều trong Python. Ngày hôm nay chúng ta sẽ tiếp tục tìm hiểu tiếp nhé ! Let go :D  

# Nội dung.
## I : Python Functions
Cũng như các ngôn ngữ khác. Một Function là 
* một khối mã được chạy khi nó được gọi đến
* Bạn có thể truyền dữ liệu qua các Function qua các tham số
* Một hàm có thể trả về dữ liệu hoặc không .


### 1: Creating a Function
Trong python, người ta sử dụng từ khóa `def` để khai báo 1 function :
```
def my_function():
  print("Hello from a function")
```

### 2: Calling a Function
Đê gọi một hàm, chúng ta sử dụng cấu trúc sau :
```
def my_function():
  print("Hello from a function")

my_function()
```

### 3 : Parameters
Cũng như các ngôn ngữ khác, chúng ta có thể truyền biến và hàm thông qa các tham số. Và đương nhiên bạn có thể thêm bao nhiêu tham số tùy thích bằng cách định nghĩa cho chúng và phân cách nhau bằng dấu `,` . Cụ thể như sau :

```
def my_function(fname):
  print( " Hello "  + fname)

my_function("Viet Anh")
my_function("Tai")
my_function("Thao")
```

### 3 : Default Parameter Value
Đây là 1 điểm khá giống `php` , khi bạn muốn có 1 hàm tùy biến tham số  (Khi mà gọi biến ko truyền dữ liệu vào cũng có giá trị). Thì chúng ta có thể sử dụng cách sau :
```
def my_function(country = "Viet Nam"):
  print("I am from " + country)

my_function("HY")
my_function("HN")
my_function()
my_function("BG")
```

## II : Python Lambda
Như nhiều loại ngôn ngữ khác, trong `Python` cũng support các `anonymous function` và chúng được gọi là `Lambda`.

Trong `Python` chúng được khởi tạo vào call như sau :
```
x = lambda a, b, c : a + b + c
print(x(5, 6, 2))
```

Thực sự thì mình thấy `Lambda` là một khái niệm khá thú vị trong Python. Đặc biệt là khi nó được dùng lồng ghép với các hàm bình thường khác . Ví dụ :

```
def myfunc(n):
  return lambda a : a * n

mytripler = myfunc(3)
mydoubler = myfunc(2)

print(mytripler(11)) // return 33
print(mytripler(11)) // return 22
```

## III : Python Classes and Objects
Python là một ngôn ngữ lập trình hướng đối tượng cho nên hầu hết mọi thứ trong Python là hướng đối tượng, với các thuộc tính và phương thức của nó.

Một class thì giống như một khuôn mẫu chung của đối tượng. Từ đó chúng ta có thể gọi ra các lớp đối tượng và setup cho chúng các giá trị thuộc tính khác nhau .

### 1: Create a Class

```
class Person:
  name = 'Viet Anh'
  age = '26'
  
```

Tạo một Class người dùng Person với `name` = 'Viet Anh' và 26 tuổi.
```
person = Person();
```

Tạo một Object người dùng Person với `name` = 'Viet Anh' và 26 tuổi.

### 2: `__init__()` Function
Đúng như cái tên của nó, hàm này là hàm được gọi khi chúng ta khơi tạo một object. Điều này cũng tương tự như các ngôn ngữ khác. Nên có lẽ mình không cần nói gì thêm các bạn cũng có thể hiểu được . 

```
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

p1 = Person("VA", 25)

print(p1.name)
print(p1.age)
```

**Modify Object Properties**

```
# Update Age
p1.age = 40

# Delete Age
del p1.age

# Delete Object
del p1
```

### 3: Object Methods
```
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def myfunc(self):
    print("Hello my name is " + self.name)

p1 = Person("John", 36)
p1.myfunc()
```

NOTE : Tham số `self` là tham số để tham chiếu đến chính bản thân class và được sử dụng để truy cập các thuộc tính của class.

## IV : Python Modules
### 1: What is a Module?

Nói 1 cách khá khái quát thì `Modules` có thể coi là một thư viện dành cho các nhà phát triển. Một file mà trong đó chúng ta viết các hàm mà developer muốn sử dụng trong ứng dụng của mình.

### 2: Create a Module?
Tạo 1 file có tên là `MyModole.py` như sau :
```
def MyModole(name):
  print("Hello, " + name)
```

### 3: Use a Module?
Và bây giờ để sử dụng `module` vừa tạo, chúng ta cần sử dụng keyword `import` . Cụ thể như sau :

```
import MyModule

MyModole.MyModole("Viet Anh")
```

Note : Nếu `module` của bạn không nằm cùng forder với file mà bạn phải chạy , để `import` được sử dụng cú pháp sau :

```
from ModulePath import firstmodule

firstmodule.greeting("Viet Anh ! How are u ?")
```

Một điều khá thú vị, bạn có thể import một phần `module` . Cụ thể như sau :

```
def MyModule(name):
  print("Hello, " + name)

person1 = {
  "name": "John",
  "age": 36,
  "country": "Norway"
}
```
Và nếu bạn chỉ muốn sử dụng phần `person1` của `module` thì ta có thể làm theo cách sau :
```
from MyModule import person1

print (person1["age"]) #print 36
```

Ok, chúng ta đã tìm hiểu khá nhiều rồi. Mình xin kết thúc bài viết ở đây, hẹn gặp lại các bạn trong bài viết sau.

# Tài liệu tham khảo
[https://www.w3schools.com/python/default.asp](https://www.w3schools.com/python/default.asp)