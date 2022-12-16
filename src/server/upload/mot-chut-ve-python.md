Python dùng indent để đánh dấu đó là một block code nếu chúng cùng indentation, ruby sử thì sử dụng `{}` hoặc từ khóa `do ... end`

# Biểu thức điều kiện

```
if 1 > 2:
  print("1 is greater than 2")
elif 2 > 1:
  print("1 is not greater than 2")
else:
  print("1 is equal to 2")
```

Biểu thức điều kiện của Python không giống với ruby nó kết thúc với dấu `:`
đối với ruby biểu thức như sau

```
if true
  puts “Hello Ruby If”
```
Ruby dùng câu lệnh puts để in ra màn hình chứ không dùng print
Looping / Iterator

# Python sử dụng while và for cho việc lặp 

```
loop_condition = True
while loop_condition:
    print("Loop Condition keeps: %s" %(loop_condition))
    loop_condition = False
```

```
for i in range(1, 11):
  print(i)

```
List: Collection | Array | Data Structure
Array và list trong Python có thể lưu trữ bất kỳ một kiểu dữ liệu nào, có thể lặp qua các phần tử của List hoặc array hầu như chúng không có sự khác biệt nhiều, điểm khác biệt chính đó là phương thức thực thi List or Array ví dụ bạn có thể dùng phép chia đối với Array nhưng với List thì Python sẽ báo lỗi 
Array:
```
x = array([3, 6, 9, 12])
x/3.0
print(x)
```
List:
```
y = [3, 6, 9, 12]
y/3.0
print(y)
```
Để sử dụng được Array thì bạn phải thêm import array và khai báo khi sử dụng nó `array`
Nhưng với list thì không (List của Python khai báo giống với Array của ruby)
Có một lưu ý đó là việc sử dụng Array của Python nhanh hơn và hiệu quả hơn đối với việc dùng List nếu bạn lưu trữ data với số lượng lớn.

```

my_integers = [5, 7, 1, 3, 4]
print(my_integers[0]) # 5
```

Data Structure
```
dictionary_example = {
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}
```
Key là index trỏ vào value 
Truy cập vào Data Structure value :

```
dictionary_example[“value1”]
```

Nó tương tự với Hash trong ruby cả về khai báo và cách truy cập vào giá trị
Để lặp qua data structure của Python ta có thể dùng các cách khác nhau

```
dictionary = { "some_key": "some_value" }

for key in dictionary:
    print("%s --> %s" %(key, dictionary[key]))
    
# some_key --> some_value
```

Ta cũng có thể dùng cách khác thông qua method items

```
for attribute, value in dictionary.items():
    print("My %s is %s" %(attribute, value))
```

# Python Object-Oriented

Python là ngôn ngữ lập trình hướng đối tượng, nó có class và object như những ngôn ngữ khác
Khai báo một class trong Python
```
class Vehicle:
    pass
```

```
car = Vehicle()
print(car) # <__main__.Vehicle instance at 0x7fb1de6c2638>
```
`car` là một instance hay một object của class `Vehicle`

Định nghĩa hàm khởi tạo hay các phương thức bên trong class

```
class Vehicle:
    def __init__(self, number_of_wheels):
        self.number_of_wheels = number_of_wheels
 
    def number_of_wheels(self):
        return self.number_of_wheels
```
```
car = Vehicle(4)
car.number_of_wheels #4
```
Khai báo và sử dụng hàm khởi tạo cũng có chút khác với Ruby

```
class Vehicle
  def initialize(number_of_wheels)
    self.number_of_wheels =number_of_wheels
  end
end
```

```
   car = Vehicle.new(4)
   ca.number_of_wheels #4
```

# Getter and setter method

```
class P:

    def __init__(self,x):
        self.x = x

    @property
    def x(self):
        return self.__x

    @x.setter
    def x(self, x):
      self.__x = x
```
Python sử dụng `@property`, `@var.setter` để lấy và gán giá trị cho attributes
Cũng có một cách khác để get và set value cho attributes
```
class P:

    def __init__(self,x):
        self.__set_x(x)

    def __get_x(self):
        return self.__x

    def __set_x(self, x):
       self.__x = x

    x = property(__get_x, __set_x)

```
Khác với Python ruby cũng có syntax riêng

```
#getter 
def baz
  @baz
end
#setter
def baz=(value)
  @baz = value
end

```
Một cách khác nữa là sử dụng
```
attributes_accessible :baz
#or
attributes_accessor: baz
```
lúc này getter và setter sẽ được định nghĩa một cách tự động 


# Public Instance Variables
Ta có thể khởi tạo các biến instance public bên trong hàm khởi tạo hoặc trong class 
Đưa giá trị của biến vào tham số của hàm khởi tạo 
```
class Person:
    def __init__(self, first_name):
        self.first_name = first_name
```
```
tk = Person('TK')
print(tk.first_name) # => TK
```
Tạo public instance variable bên trong class
```
class Person:
    first_name = 'TK'
```
Như thế này thì mọi instance variable của class Person đều có giá trị khởi tạo giống nhau `TK`

# Non-public Instance Variable
Cũng giống như public instance variable ta có thể khởi tạo biến Non-public instance variable bên trong hàm khởi tạo hoặc bên trong class. Nhưng chúng có sự khác nhau về mặt syntax

Non-public instance variable sử dụng dấu `_` khai báo một biến non-public 
```
class Person:
    def __init__(self, first_name, email):
        self.first_name = first_name
        self._email = email
```


```
tk = Person('TK', 'tk@mail.com')
print(tk._email) # tk@mail.com
```
Ta cũng có thể thay đổi được giá trị của non-public variable thông qua method 
```
class Person:
    def __init__(self, first_name, email):
        self.first_name = first_name
        self._email = email

    def update_email(self, new_email):
        self._email = new_email

    def email(self):
        return self._email

```

```

tk = Person('TK', 'tk@mail.com')
print(tk.email()) # => tk@mail.com
tk._email = 'new_tk@mail.com'
#gán trực tiếp giá trị mới cho non-public variable nhưng không thay đổi được giá trị của nó
print(tk.email()) # => tk@mail.com
tk.update_email('new_tk@mail.com')
#thông qua method update_email ta đã thay đổi được giá trị của nó 
print(tk.email()) # => new_tk@mail.com
```

# Public method :
```
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self._age = age

    def show_age(self):
        return self._age
```
các public method có thể được sử dụng bên ngoài class
```

tk = Person('TK', 25)
print(tk.show_age()) # => 25
```

# Non-public method 
Đối với non-public method cũng có syntax giống với non-public variable đó là phải sử dụng `_` trước tên biến hoặc method

```
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self._age = age

    def _show_age(self):
        return self._age
```
Non-public method chỉ có thể sử dụng bên trong class định nghĩa nó nhưng ta cũng có thể treat để sử dụng được ở bên ngoài thông qua public method 

```
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self._age = age

    def show_age(self):
        return self._get_age()

    def _get_age(self):
        return self._age

tk = Person('TK', 25)
print(tk.show_age()) # => 25

```
`_get_age`non-public đã được gọi thông qua hàm public  `show_age` 


### Nguồn tham khảo
https://www.python-course.eu/python3_properties.php

https://www.pythoncentral.io/the-difference-between-a-list-and-an-array/

https://medium.com/the-renaissance-developer/learning-python-from-zero-to-hero-8ceed48486d5