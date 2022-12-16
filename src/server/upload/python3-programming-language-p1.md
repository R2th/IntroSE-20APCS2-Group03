- https://www.tutorialspoint.com/python3

- https://drive.google.com/drive/u/1/folders/1hNnSd9FiUHSViVA0qo5_g7XSuX5NGCeP
- https://www.codecademy.com/learn/learn-python-3
- https://www.udemy.com/course/try-django-2-2-python-web-development/
- https://docs.python.org/3.7/tutorial/
---
## 1. Introduction
* Overview
    - **Interpreted**: Python được trình thông dịch xử lý trong thời gian chạy.
    - **Interactive**: Có thể tương tác trực tiếp với trình thông dịch thông qua command line shell
    - **Object-Oriented**: Hỗ trợ lập trình hướng đối tượng
    - **Beginner's Language**: dễ học ngay cả với người mới bắt đầu lập trình
* Environment setup (Ubuntu)
    - Nên cài đặt python version > 3.5 (để sau đó học luôn framework Django 3.0)
    - Trên Ubuntu Linux, python3 được cài chỉ bằng 1 command line: `sudo apt-get install python3.7` (python 3.6 có sẵn trên ubuntu 18.04).
    - Chú ý khi cài python3.7 trên máy ubuntu sẽ có nhiều version của python2, python3.6, để mặc định sử dung version 3.7 cần tìm hiểu `sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.6 1`, `sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.7 2`, mặc định sẽ tự động chọn 3.7 khi dùng lệnh `python3`. Tương tự nếu muốn lệnh `python` mặc định là 3.7 cần `sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.7 1`
    - Để có thể cài đặt thêm các thư viện cho python3, cần cài thêm package manager là pip3: `sudo apt install -y python3-pip`
    - Vậy là đã có thể lập trình python3, muốn sử dụng package nào chỉ cần cài vào là xong theo format: `pip3 install package_name`
 * “Hello, World” Program
     
     -  `sudo pip3.7 install virtualenv`:  Cài đặt package này giúp tạo môi trường ảo. Từ đây, tất cả những packages được cài đặt mới sẽ đặt nằm trong thư mục mới thay vì `/usr/lib/python3/package_name` .
     -  sau khi tạo thư mục bạn muốn(thư mục để code python), `virtualenv -p python3.7 venv` sẽ tạo thư mục môi trường `venv`,  sẽ không phải lo lắng vấn đề môi trường và chỉ cần tập trung vào ngôn ngữ python.
     -  activate môi trường: `source venv/bin/activate`.
---
## 2. Basic Syntax
* Cú pháp dễ đọc: `print ("Hello, Python!")`
* Có thể tương tác trực tiếp bằng command line hoặc chạy file execute có đuôi *.py, vd: `python test.py`
* python sử dụng Indentation để xác định block code, tất cả các câu lệnh trong cùng một khối phải được thụt vào cùng một lượng.
* Dòng tiêu đề cho các câu lệnh ghép, chẳng hạn như if, while, def và class nên được kết thúc bằng dấu hai chấm (:)
* Dấu chấm phẩy `;` là tùy chọn ở cuối câu lệnh. `import sys; x = 'foo'; sys.stdout.write(x + '\n')`
* comment bằng dấu `#` hoặc cặp `'''` `'''`
```python
# python comment first
'''
Python comment on
multiple lines
'''
if True:
  print ("Answer")
  print ("True")
else:
  print("Answer")
  print ("False")
```
---
## 3. Datatypes and Objects
* Number gồm số nguyên, số thực và số phức: 
    * `import math; x = 16; print(math.sqrt(x)) # => 4`
    * `import math; y = 4; print(math.pow(y, 2)) # => 16`
    * `print(complex(2,3)) # => (2 + 3j)`
* String:    

Truy xuất
```python
#!/usr/bin/python3

var1 = 'Hello World!'
var2 = "Python Programming"

print ("var1[0]: ", var1[0]) # var1[0]:  H
print ("var2[1:5]: ", var2[1:5]) # var2[1:5]:  ytho
```
Cập nhật: chuỗi là immutable, nên ko thể thay đổi, được bao bởi nháy đơn `'`, nháy kép `"` hoặc nháy 3 `'''`
```python
>>> str = "Strings are immutable"
>>> str[0]
'S'
>>> str[0] = "1"
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'str' object does not support item assignment
```
* List: Tương tự kiểu dữ liệu mảng trong các ngôn ngữ khác
```python
list = ['physics', 'chemistry', 1997, 2000]
print ("Value available at index 2 : ", list[2]) # Value available at index 2 :  1997

list[2] = 2001
print ("New value available at index 2 : ", list[2]) # New value available at index 2 :  2001
```
* Tuple: Tương tự cấu trúc list chỉ khác khai báo trong `()` và immutable (giống string). (khá giống `.freeze` trong ruby)
```python
t = (3,); print (t) # (3,)

(1,2,3)[0] = 2 ; print(v) # TypeError: 'tuple' object does not support item assignment
```
* Dictionary: Tương tự mảng kết hợp trong php, java, hay hash trong ruby
```python
#!/usr/bin/python3

dict = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}
dict['Age'] = 8; # update existing entry
dict['School'] = "DPS School" # Add new entry

print ("dict['Age']: ", dict['Age'])
print ("dict['School']: ", dict['School'])
```
*  I/O: input và output với python shell interface
```python
>>> x = input("enter your name:\n")
enter your name:
Nguyễn Phi Việt
>>> print( x )
Nguyễn Phi Việt
>>> print(f"welcome to python3, {input()}")
VietNP
welcome to python3, VietNP
>>> 
```
---
## 4. Expressions and Operators
* Basic Operators
Các kiểu toán tử trong python3:
    - Toán tử số học `+`, `-`, `*`, `/`, `%` chia lấy dư, `**` luỹ thừa, `//` chia làm tròn
    - Toán tử so sánh (quan hệ): `==`, `!=`, `<`, `>`, `<=`, `>=`
    - Toán tử gán: `+=`, `-=`,  `*=`, `/=`, `%=`, `**=`, `//=`
    - Toán tử logic `and`, `or`, `not`
    - Toán tử thao tác bit.
    - Toán Tử thành viên: `print(1 in [1,2,3,4]) # True`
    - Toán tử nhận định (con trỏ): `is`, `is not`
```python
a = [1,2,3,4]
b = a
c = a
print(a is [1,2,3,4]) # False
print(b is a) # True
print(b is c) # True
d = 1
e = 1
print(d is 1) # True
print(e is d) # True
```
* Regular Expressions
    - Cú pháp sử dụng biểu thức chính quy trong python có dạng: `re.match(pattern, string, flags = 0)`, string là chuỗi cần xử lý, pattern là biểu thức chính quy dùng để so khớp.
    - Các phương thức cơ bản: `match`, `search`, `sub` và `split`

**1. Macth:** so khớp
```python
#!/usr/bin/python3
import re

line = "Cats are smarter than dogs"

matchObj = re.match( r'(.*) are (.*?) .*', line, re.M|re.I)

if matchObj:
   print ("matchObj.group() : ", matchObj.group())
   print ("matchObj.group(1) : ", matchObj.group(1))
   print ("matchObj.group(2) : ", matchObj.group(2))
else:
   print ("No match!!")
```
kết quả là:
```
matchObj.group() :  Cats are smarter than dogs
matchObj.group(1) :  Cats
matchObj.group(2) :  smarter
```
**2. match vs search:** so khớp và tìm kiếm
```python
#!/usr/bin/python3
import re

line = "Cats are smarter than dogs";

matchObj = re.match( r'dogs', line, re.M|re.I)
if matchObj:
   print ("match --> matchObj.group() : ", matchObj.group())
else:
   print ("No match!!")

searchObj = re.search( r'dogs', line, re.M|re.I)
if searchObj:
   print ("search --> searchObj.group() : ", searchObj.group())
else:
   print ("Nothing found!!")
```
kết quả là:
```
No match!!
search --> matchObj.group() :  dogs
```
**3. Search and Replace:**  tìm kiếm và thay thế
```python
#!/usr/bin/python3
import re

phone = "2004-959-559 # This is Phone Number"

# Delete Python-style comments
num = re.sub(r'#.*$', "", phone)
print ("Phone Num : ", num)

# Remove anything other than digits
num = re.sub(r'\D', "", phone)    
print ("Phone Num : ", num)
```
kết quả là:
```
Phone Num :  2004-959-559
Phone Num :  2004959559
```
**3. Split:**  Tách chuỗi 
```python
txt = "welcome to the jungle"

x = txt.split()

print(x)
```
kết quả
```
['welcome', 'to', 'the', 'jungle']
```
---
## 5. Statements and Control Structures 
* Condition - Decision Making

**Cú pháp** tổng quát
```python
if expression1:
   statement(s)
   if expression2:
      statement(s)
   elif expression3:
      statement(s)
   else
      statement(s)
elif expression4:
   statement(s)
else:
   statement(s)
```
**Ví dụ**
```python
# !/usr/bin/python3

num = int(input("enter number"))
if num%2 == 0:
   if num%3 == 0:
      print ("Divisible by 3 and 2")
   else:
      print ("divisible by 2 not divisible by 3")
else:
   if num%3 == 0:
      print ("divisible by 3 not divisible by 2")
   else:
      print  ("not Divisible by 2 not divisible by 3")
```
kết quả:
```python
enter number8
divisible by 2 not divisible by 3

enter number15
divisible by 3 not divisible by 2

enter number12
Divisible by 3 and 2

enter number5
not Divisible by 2 not divisible by 3
```
---
* Loop

**Cú pháp** 
Với `for`:
```python
for iterating_var in sequence:
   for iterating_var in sequence:
      statements(s)
   statements(s)
```
Với `while`:
```python
while expression:
   while expression:
      statement(s)
   statement(s)
```
**Ví dụ**
```python
#!/usr/bin/python3

import sys
for i in range(1,11):
   for j in range(1,11):
      k = i*j
      print (k, end=' ')
   print()
```
kết quả:
```python
1 2 3 4 5 6 7 8 9 10 
2 4 6 8 10 12 14 16 18 20 
3 6 9 12 15 18 21 24 27 30 
4 8 12 16 20 24 28 32 36 40 
5 10 15 20 25 30 35 40 45 50 
6 12 18 24 30 36 42 48 54 60 
7 14 21 28 35 42 49 56 63 70 
8 16 24 32 40 48 56 64 72 80 
9 18 27 36 45 54 63 72 81 90 
10 20 30 40 50 60 70 80 90 100
```
**Ví dụ 2**: với range
```python
>>> a = ['Mary', 'had', 'a', 'little', 'lamb']
>>> for i in range(len(a)):
...     print(i, a[i])
...
0 Mary
1 had
2 a
3 little
4 lamb
```
---
## 6. Functions
**khai báo và sử dụng**
```python
#!/usr/bin/python3

# Function definition is here
def changeme( mylist ):
   "This changes a passed list into this function"
   mylist = [1,2,3,4] # This would assi new reference in mylist
   print ("Values inside the function: ", mylist)
   return

# Now you can call changeme function
mylist = [10,20,30]
changeme( mylist )
print ("Values outside the function: ", mylist)
```
kết quả:
```
Values inside the function:  [1, 2, 3, 4]
Values outside the function:  [10, 20, 30]
```
---
**Sử dụng tham số**

VD 1
```python
#!/usr/bin/python3

# Function definition is here
def printinfo( name, age = 35 ):
   "This prints a passed info into this function"
   print ("Name: ", name)
   print ("Age ", age)
   return

# Now you can call printinfo function
printinfo( "miki" )
printinfo( name = "miki" )
printinfo( age = 50, name = "miki" )
```
kết quả:
```
Name:  miki
Age  35
Name:  miki
Age  35
Name:  miki
Age  50
```
VD 2
```python
#!/usr/bin/python3

# Function definition is here
def printinfo( arg1, *vartuple ):
   "This prints a variable passed arguments"
   print ("Output is: ")
   print (arg1)
   
   for var in vartuple:
      print (var)
   return

# Now you can call printinfo function
printinfo( 10 )
printinfo( 70, 60, 50 )
```
kết qủa:
```
Output is:
10
Output is:
70
60
50
```
---
**Hàm nặc danh**
    * Hàm lamda không có tên, nó sẽ gọi đến thêm 1 hàm khác. Các biểu mẫu Lambda có thể nhận bất kỳ số lượng đối số nào nhưng chỉ trả về một giá trị dưới dạng biểu thức. Chúng không thể chứa các lệnh hoặc nhiều biểu thức.
    * Một hàm ẩn danh không thể gọi trực tiếp `print` vì lambda yêu cầu `một biểu thức`.
* Cú phaps: `lambda [arg1 [,arg2,.....argn]]:expression`
* Ví dụ:
```python
#!/usr/bin/python3

# Function definition is here
sum = lambda arg1, arg2: arg1 + arg2

# Now you can call sum as a function
print ("Value of total : ", sum( 10, 20 ))
print ("Value of total : ", sum( 20, 20 ))
```
kết qủa:
```
Value of total :  30
Value of total :  40
```
**Global vs. Local variables**
```python
#!/usr/bin/python3

total = 0   # This is global variable.
# Function definition is here
def sum( arg1, arg2 ):
   # Add both the parameters and return them."
   total = arg1 + arg2; # Here total is local variable.
   print ("Inside the function local total : ", total)
   return total

# Now you can call sum function
sum( 10, 20 )
print ("Outside the function global total : ", total )
```
kết quả:
```
Inside the function local total :  30
Outside the function global total :  0
```
---
## 7. Modules
Đơn giản, một module là một file bao gồm code Python. Một module có thể định nghĩa các function, các clas và các variable (mọi thứ trong python đều là đối tượng). Một module cũng có thể chạy như một scripts;
VD, với file có tên `fibo.py`:
```python
# Fibonacci numbers module

def fib(n):    # write Fibonacci series up to n
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

def fib2(n):   # return Fibonacci series up to n
    result = []
    a, b = 0, 1
    while a < n:
        result.append(a)
        a, b = b, a+b
    return result

if __name__ == "__main__":
    import sys
    fib(int(sys.argv[1]))
    print("module ran as a script")

```
thì cách sử dụng module như sau:
```
>>> from fibo import fib, fib2
>>> fib(100)
0 1 1 2 3 5 8 13 21 34 55 89 
>>> print( fib2(50) )
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
>>>
```
Với việc kiểm tra biến global `__name__` ở cuối module, có thể tương tác trực tiếp với file `fibo.py` để thực thi shell scripts:

`Ubuntu/environments$ python fibo.py 10` cho kết quả:
```
0 1 1 2 3 5 8 
module ran as a script
```
**Có thể kiểm tra các function và biến toàn cụ hay cục bộ** `dir()`, `global()`, `local()`:
với module `fibo.py` như sau:
```python
def fib(n):    # write Fibonacci series up to n
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print("---")
    print(locals())
    print("---")
    print("n=", n, "a=", a, "b=", b)
```
kết quả:
```
>>> from fibo import fib
>>> fib(100)
0 1 1 2 3 5 8 13 21 34 55 89 ---
{'n': 100, 'a': 144, 'b': 233}
---
n= 100 a= 144 b= 233
>>> dir(fib)
['__annotations__', '__call__', '__class__', '__closure__', '__code__', '__defaults__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__get__', '__getattribute__', '__globals__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__kwdefaults__', '__le__', '__lt__', '__module__', '__name__', '__ne__', '__new__', '__qualname__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__']
>>> 
```
---
**Gộp các submodule lại thành Packages**:
Giẳ sử có thư mục `Phone` với cấu trúc module như sau:
* `Phone/Pots.py`:
```python
def Pots():
  print ("I'm Pots Phone")
```
* `Phone/Isdn.py`: tương  tự Pots
* `Phone/G3.py`: tương  tự Pots
* `Phone/__init__.py`:
```python
from .Pots import Pots
from .Isdn import Isdn
from .G3 import G3
```
* `hello.py`:
```python
import Phone

Phone.Pots()
Phone.Isdn()
Phone.G3()
```
hoặc
```python
from Phone import Pots, Isdn, G3

Pots()
Isdn()
G3()

```
kết qủa: `python hello.py`
```
I'm Pots Phone
I'm Isdn Phone
I'm G3 Phone
```

---
continue P2:
+ 8. Classes
+ 9. File Handling
+ 10. Exceptions Handling
+ 11. Thematic