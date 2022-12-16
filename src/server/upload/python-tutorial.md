**Python** là một ngôn ngữ lập trình bậc cao, code python thường được cho là gần giống như các mã giả, vì thế nó cho phép bạn thể hiện những ý tưởng mạnh mẽ với ít dòng mã và nó cũng dễ đọc hiểu . Python có nhiều thư viện phổ biến như numpy, scipy, matplotlib,... vì thế nó trở thành một môi trường rất mạnh mẽ cho các ngành khoa học dữ liệu, trí tuệ nhân tạo.

Trong bài viết này, mình sẽ tóm tắt các cấu trúc chính trong **Python**, sử dụng các ví dụ ngắn để cho các bạn có cái nhìn tổng quan. Nếu bạn có kinh nghiệm học các ngôn ngữ khác thì cũng dễ học ngôn ngữ mới này .Mình cũng khuyến khích các bạn thử tất cả các ví dụ vào máy tính riêng của bạn. 

# Cài đặt môi trường
 Mình khuyên bạn nên sử dụng [Anaconda](https://www.anaconda.com/distribution/), là một cách dễ dàng để quản lý nhiều môi trường khác nhau, mỗi môi trường có các phiên bản và phụ thuộc Python riêng. Cài đặt như nào thì bạn có thể vào trang chủ để biết thêm chi tiết. :laughing:. 
 
 Còn nếu bạn không muốn cài đặt nhiều thứ trên máy tính của mình bạn có thể dùng colab của google. 

# Sử dụng Interpreter
**Python** có thể chạy 1 trong 2 chế độ. Nó thể tương tác thông qua một interpeter, hoặc nó có thể được gọi từ một dòng lệnh để thực hiện một tập lệnh. Trước tiên chúng ta sẽ sử dụng trình thông dịch của Python.

Bạn có thể gọi trình thông dịch bằng lệnh `Python` trên Unix  command prompt, còn trên window bạn có thể sử dụng trên **Command Prompt (Admin)**.  Và nó chạy sẽ có kết quả như sau: 

![](https://images.viblo.asia/3d58e13d-1cd1-4896-8816-19d789c571be.png)
 
 Nó sẽ hiện ra version hiện tại bạn đang dùng. Bạn cũng có thể xem bằng câu lệnh `Python --version`

# Các kiểu dữ liệu cơ bản
Trình thông dịch của **Python** có thể sử dụng để đánh giá các biểu thức. Ví dụ các biểu thức số học đơn giản. Nếu ta nhập biểu thức tại dấu nhắc (`>>>`) rồi ấn enter thì ta sẽ được kết quả ở dòng tiếp theo.
``` bash
>>> 1 + 1
2
>>> 2 * 3
6
```

## Kiểu dữ liệu số 
Kiểu dữ liệu số nguyên và số thực `float` hoạt động như các ngôn ngữ khác, và trong Python sẽ tự ép kiểu dữ liệu cho bạn mà không cần khai báo kiểu như `int, float` trong C, C++.

``` bash
>>> x = 3 
>>> print(type(x))
<class 'int'>
>>> print(x)
3
>>> print(x+1)
4
>>> print(x-1)
2
>>> print(x * 2)
6
>>> print(x ** 2)
9
>>> x += 1
>>> print(x)
4
>>> x *= 2
>>> print(x)
8
>>> y = 2.5
>>> print(type(y))
<class 'float'>
>>> print(y, y+1, y * 2, y**2)
2.5 3.5 5.0 6.25
```
>  Lưu ý: không giống như nhiều ngôn ngữ khác, Python không có toán tử tăng một đơn vị ( **x++**) hoặc giảm một đơn vị (**x--**) mà thay vào đó bạn có thêm nhìn ví dụ.
 **Python** cũng cung cấp kiểu dựng sẵn cho các số phức, bạn có thể tìm thấy tất cả tài liệu chi tiết [trong tài liệu](https://docs.python.org/3.5/library/stdtypes.html#numeric-types-int-float-complex).
 
 ## Boolean
 **Python** cũng tồn tại toán tử `Boolean` để thao tác các giá trị nguyên thủy `True` và `False` nhưng sử dụng tiếng Anh chứ không sử dụng các ký hiệu (`&&`, `||`, `!`, ...) như ở các ngôn ngữ khác.
 ```bash
 >>> 1 == 0
False
>>> not (1 == 0)
True
>>> (2 == 2) and (2 ==3)
False
>>> ( 2 == 2) or ( 2== 3)
True
>>> t = True
>>> f = False
>>> print(type(t))
<class 'bool'>
>>> print(t and f)
False
>>> print(t or f)
True
>>> print(not t)
False
>>> print(t != f)
True
 ```
 ## String
 Giống như Java, Python có kiểu chuỗi.  Toán tử `+` sẽ cộng các chuỗi lại với nhau.
 ```bash
 >>> 'hello' + 'world'
'helloworld'
 ```
 Có nhiều phương thức thích hợp cho phép ta thao tác với chuỗi:
 ```bash
 >>> 'hello' + 'world'
'helloworld'
>>> 'hello world'.upper()
'HELLO WORLD'
>>> 'HELP'.lower()
'help'
>>> len('Help')
4
 ```
>  Lưu ý rằng chúng ta có thể sử dụng dấu ngoặc đơn `' '` hoặc dấu ngoặc đơn `" "` để bao quanh chuỗi. Điều này cho phép dễ dàng lông các chuỗi.

Chúng ta cũng có thể lưu trữ các chuỗi thành các biến như ví dụ sau:
```bash
>>> s = 'hello world'
>>> print(s)
hello world
>>> s.upper()
'HELLO WORLD'
>>> len(s.upper())
11
>>> hw  = '%s %s %d' % ('hello', 'world', 12) # Viết theo định dạng như trong C
>>> print(hw)
hello world 12
```
 Các đối tượng String có một loạt các phương thức hữu ích, ví du:
 ```bash
 >>> s = "hello"
>>> s.rjust(7)
'  hello'
>>> s.center(7)
' hello '
>>> s.replace('l', '(ell)') # Thay thế một ký tự
'he(ell)(ell)o'
>>> '  world '.strip() # Loại bỏ khoảng trắng đầu và cuối của chuỗi
'world'
 ```
 Bạn có thể xem danh sách các phương thức của chuỗi [trong tài liệu](https://docs.python.org/3.5/library/stdtypes.html#string-methods)
 
 # Cấu trúc dữ liệu tích hợp (Built-in DATA structure)
 **Python** được trang bị một số cấu trúc dữ liệu tích hợp hữu ích, tương tự collections package trong Java. Nó bao gồm: lists, dictionaries, sets, và tuples
 
## Lists
Một list trong Python tương đương với một mảng, nhưng nó có thể thay đổi kích thước và có thể chưa nhiều thành phần thuộc nhiều kiểu khác nhau. Ví dụ 1 list chứa một chuỗi các items có thể thay đổi: 
```bash
>>> fruits = ['apple', 'orange', 'pear', 'banana']
>>> fruits[0]
'apple'
```
Chúng ta có thể sử dụng toán từ `+` để nối vào list:
```bash
>>> otherFruits = ['kiwi', 'strawberry']
>>> fruits + otherFruits
>>> ['apple', 'orange', 'pear', 'banana', 'kiwi', 'strawberry']
```
Python cũng cho phép negative-indexing từ cuối của list. Ví dụ, `fruist[-1]` sẽ truy cập vào phần tử cuối cùng `banana`: 
```bash
>>> fruits[-2]
'pear'
>>> fruits.pop() # Xóa và trả về phần tử cuối cùng trong list
'banana'
>>> fruits
['apple', 'orange', 'pear']
>>> fruits.append('grapefruit') # Thêm 1 phần tử vào cuối của list
>>> fruits
['apple', 'orange', 'pear', 'grapefruit']
>>> fruits[-1] = 'pineapple'
>>> fruits
['apple', 'orange', 'pear', 'pineapple']
```
Như thường lệ, bạn có thể tìm thấy tất cả thông tin chi tiết về list [trong tài liệu](https://docs.python.org/3.5/tutorial/datastructures.html#more-on-lists)

**Slicing**: Ngoài việc truy cập từng phẩn tử trong danh sách, Python cung cấp cú pháp ngắn gọn để truy cập danh sách con, nó được hiểu như `slicing (cắt lát)`. Chẳng hạn, `fruits[1:3]` trả về một danh sách chứa các phần tử ở vị trí 1 và 2 (trong python thì các phần tử bắt đầu từ vị trí 0). Nói chung, `fruits[start:stop]` sẽ lấy các phần từ trong `start, start+1, ..., stop-1`. Chúng ta cũng có thể viết `fruits[start:]` trả về tất cả các giá trị từ vị trí `start`, hoặc `fruits[:end]` trả về tất cả phần tử trước vị trí `end`.
```bash
>>> fruits[0:2]
['apple', 'orange']
>>> fruits[:3]
['apple', 'orange', 'pear']
>>> fruits[2:]
['pear', 'pineapple']
>>> len(fruits)
4
```
> Chúng ta sẽ gặp lại nội dung `slicing` trong thư viện numpy.

Như đã nói ở trên, các dữ liệu được lưu trữ trong list có thể là bất kỳ dữ liệu Python nào. Ví dụ, chung ta có thể có 1 list của các list:
```bash
>>> lstOfLsts = [['a', 'b', 'c'], [1, 2, 3], ['one', 'two', 'three']]
>>> lstOfLsts[1][2]
3
>>> lstOfLsts[0].pop()
'c'
>>> lstOfLsts
[['a', 'b'], [1, 2, 3], ['one', 'two', 'three']]
```
## Tuples
Một cấu trúc dữ liệu tương tự như `list` là `tuples`, giống như `list` ngoại trừ việc nó bất biến một khi nó được tạo ra (tức là ta không thể thay đổi giá trị của nó một khi ta đã tạo ra). Lưu ý rằng `tuples` được bao quanh bằng dấu ngoặc đơn trong khi `list` có dấu ngoặc vuông.
```bash
>>> pair = (3, 5)
>>> pair[0]
3
>>> x, y = pair
>>> x
3
>>> y
5
>>> pair[1] = 6
TypeError: object does not support item assignment
```
Nỗ lực sửa đổi một cấu trúc bất biến sẽ trả ra 1 exception. Exception chỉ ra các lỗi:  index out of bounds errors, type error, ... tất cả sẽ báo cáo các exception ngoại lệ theo cách như trên (viết ra màn hình).

[Tài liệu](https://docs.python.org/3.5/tutorial/datastructures.html#tuples-and-sequences) để bạn có thể tìm hiểu thêm về `tuples`
## Sets
Một `set` là một cấu trúc dữ liệu khác như 1 `list` nhưng không có thứ tự tự và không có giá trị nào trùng lặp. Dưới đây, mình trình bày một cách tạo `set`:
```bash
>>> shapes = ['circle', 'square', 'triangle', 'circle']
>>> setOfShapes = set(shapes)
>>> print(setOfShapes)
{'square', 'circle', 'triangle'}
```
Một cách khác để tạo một `set` được hiện thị bên dưới:
```bash
>>> setOfShapes = {‘circle’, ‘square’, ‘triangle’, ‘circle’}
```
Tiếp theo, mình sẽ trình bày cách thêm thêm tử vào `set`, kiểu tra một phần tử có thuộc `set' không và thực hiện các phép toán trên tập hợp (difference, intersection, union):
```bash
>>> setOfShapes
set(['circle', 'square', 'triangle'])
>>> setOfShapes.add('polygon')
>>> setOfShapes
set(['circle', 'square', 'triangle', 'polygon'])
>>> 'circle' in setOfShapes
True
>>> 'rhombus' in setOfShapes
False
>>> favoriteShapes = ['circle', 'triangle', 'hexagon']
>>> setOfFavoriteShapes = set(favoriteShapes)
>>> setOfShapes - setOfFavoriteShapes
set(['square', 'polygon'])
>>> setOfShapes & setOfFavoriteShapes # giao giữa 2 set
set(['circle', 'triangle'])
>>> setOfShapes | setOfFavoriteShapes # hợp giữa 2 set
set(['circle', 'square', 'triangle', 'polygon', 'hexagon'])
```
Như thường lệ, bạn có thể tìm hiểu về `set` trong [tài liệu](https://docs.python.org/3.5/library/stdtypes.html#set)

>  Lưu ý rằng: các đối tượng trong **set** không có thứ tự, vì vậy bạn không thể cho rằng thứ tự in và in của chúng sẽ giống nhau ở trên các máy tính!

## Dictionaries (từ điển)
Một từ điển lưu trữ các cặp (key, value) tương tự **map** trong Java hoặc một đối tượng trong Javascript. Bạn có thể sử dụng nó như sau: 
``` bash
>>> d = {'cat': 'cute', 'dog': 'furry'}  # Create a new dictionary with some data
>>> print(d['cat'])       # Get an entry from a dictionary
cute
>>> print('cat' in d)     # Check if a dictionary has a given key
True
>>> d['fish'] = 'wet'     # Set an entry in a dictionary
>>> print(d['fish'])      # Prints "wet"
wet
>>> # print(d['monkey'])  # KeyError: 'monkey' not a key of d
>>> print(d.get('monkey', 'N/A'))  # Get an element with a default
N/A
>>> print(d.get('fish', 'N/A'))    # Get an element with a default
wet
>>> del d['fish']         # Remove an element from a dictionary
>>> print(d.get('fish', 'N/A')) # "fish" is no longer a key
N/A
```
Bạn có thể đọc thêm về dictionaries [trong tài liệu](https://docs.python.org/3.5/library/stdtypes.html#dict).
# Viết scripts
Ơ trên ta đã làm quen với trình biên dịch của Python, nó dễ dàng nếu bạn thực hiện các câu lệnh đơn không dài. Chúng ta sẽ làm quen với viết một chương trình python và chạy nó. Ví dụ chúng ta viết một tập lệnh (scripts) Python đơn giản thể hiện vòng lặp `for` trong python. Bạn sẽ viết vào text editor bất kỳ rồi lưu nó dưới dạng có duôi là `.py`, ở đây mình sẽ lưu thành file `foreach.py`. Nó sẽ chứa các mã như sau: 
```python
# đây là phần comment của các bạn dành cho 1 dòng bắt đầu bằng '#'
'''
Nếu bạn muốn comment nhiều dòng
'''
fruits = ['apples', 'oranges', 'pears', 'bananas']
for fruit in fruits:
    print(fruit + ' for sale')

fruitPrices = {'apples': 2.00, 'oranges': 1.50, 'pears': 1.75}
for fruit, price in fruitPrices.items():
    if price < 2.00:
        print('%s cost %f a pound' % (fruit, price))
    else:
        print(fruit + ' are too expensive!')
```
Tại dòng lệnh, sử dụng câu lệnh sau trong thư mục chứa `foreach.py`:
![](https://images.viblo.asia/526f4e24-a614-4619-bbb9-e6fc86524253.png)

Nếu bạn thích `functional programming` bạn có thể thích `map` và `filter` :
```bash
>>> list(map(lambda x: x * x, [1, 2, 3]))
[1, 4, 9]
>>> list(filter(lambda x: x > 3, [1, 2, 3, 4, 5, 4, 3, 2, 1]))
[4, 5, 4]
```
## Loops
Ta có thể lặp các phần tử trong list như sau: 
```python
animals = ['cat', 'dog', 'monkey']
for animal in animals:
    print(animal)
# kết quả in "cat", "dog", "monkey" trên mỗi dòng
```
Nếu bạn muốn truy cập vào số thứ tự của từng phần tử trong thân vòng lặp, hãy sử dụng `enumerate`:
```python
animals = ['cat', 'dog', 'monkey']
for idx, animal in enumerate(animals):
    print('#%d: %s' % (idx + 1, animal))
# Prints "#1: cat", "#2: dog", "#3: monkey" trên từng dòng
```
Ta cũng có thể lặp các giá trị trong dictionary:
```python
d = {'person': 2, 'cat': 4, 'spider': 8}
for animal in d:
    legs = d[animal]
    print('A %s has %d legs' % (animal, legs))
# Prints "A person has 2 legs", "A cat has 4 legs", "A spider has 8 legs"
```
Nếu bạn muốn truy cập vào các khóa và giá trị tương ứng của chúng, hãy sử dụng phương thức `itém`: 
```python
d = {'person': 2, 'cat': 4, 'spider': 8}
for animal, legs in d.items():
    print('A %s has %d legs' % (animal, legs))
# Prints "A person has 2 legs", "A cat has 4 legs", "A spider has 8 legs"
```
## Comprehensions
Mình sẽ đưa các bạn đến phần nâng cao hơn, sẽ tìm hiểu về comprehensions làm cho code ngắn gọn, dễ hiểu hơn. 

Comprehensions (bao hàm) là các cấu trúc cho phép các chuỗi được xây dựng từ các chuỗi khác. Python 2.0 đã giới thiệu cho chúng ta khái niệm về list comprehensions và Python 3.0 đã đưa nó đi xa hơn bằng cách bao gồm từ dict comprehensions và set comprehensions.

### List comprehensions
Khi lập trình, ta thường xuyên muốn chuyển đổi một loại dữ liệu sang loại khác. Ví dụ đơn giản, hãy xem xét đoạn mã sau để tính bình phương của từng số trong list:
```python
nums = [0, 1, 2, 3, 4]
squares = []
for x in nums:
    squares.append(x ** 2)
print(squares)  
# Prints [0, 1, 4, 9, 16]
```
Bạn có thể làm cho mã này đơn giản hơn bằng cách list comprehension: 
```
nums = [0, 1, 2, 3, 4]
squares = [x ** 2 for x in nums]
print(squares)   # Prints [0, 1, 4, 9, 16]
```
List comprehension cũng có thể chứa các điều kiện:
```python
nums = [0, 1, 2, 3, 4]
even_squares = [x ** 2 for x in nums if x % 2 == 0]
print(even_squares)  # Prints "[0, 4, 16]"
```
### Dictionary comprehensions
Tương tự như list comprehensions, nhưng cho phép bạn dễ dàng xây dựng từ điển. Ví dụ :
```python
nums = [0, 1, 2, 3, 4]
even_num_to_square = {x: x ** 2 for x in nums if x % 2 == 0}
print(even_num_to_square)  
# Prints "{0: 0, 2: 4, 4: 16}"
```
### Set comprehensions
Tương tự lists and dictionaries, ta có thể xây dựng `sets` bằng set comprehensions:
```python
from math import sqrt
nums = {int(sqrt(x)) for x in range(30)}
print(nums) 
# Prints "{0, 1, 2, 3, 4, 5}"
```
## Cẩn thận với sự thay đổi
Không giống như nhiều ngôn ngữ khác, Python sử dụng thụt lề trong mã nguồn để diễn dịch. Ví dụ, đối với tập lệnh dưới đây: 
```python
if 0 == 1:
    print('We are in a world of arithmetic pain')
print('Thank you for playing')
```
sẽ cho ra output là `Thank you for playing`

Nhưng nếu bạn viết tập lệnh như sau: 
```
if 0 == 1:
    print('We are in a world of arithmetic pain')
    print('Thank you for playing')
```
Nó sẽ không ra kết quả gì. Nội dung chính ở đây là hãy cẩn thận với thụt lề, tốt nhất sử dụng 4 khoảng trắng để thụt lề
# Hàm 
Các hàm Python được định nghĩa bằng cách sử dụng từ khóa `def`. Ví dụ:
```python
def sign(x):
    if x > 0:
        return 'positive'
    elif x < 0:
        return 'negative'
    else:
        return 'zero'

for x in [-1, 0, 1]:
    print(sign(x))
# Prints "negative", "zero", "positive"
```
Chúng ta cũng có thể truyền các tham số tùy chọn vào hạm, ví dụ như :
```python
def hello(name, loud=False):
    if loud:
        print('HELLO, %s!' % name.upper())
    else:
        print('Hello, %s' % name)

hello('Bob') # Prints "Hello, Bob"
hello('Fred', loud=True)  # Prints "HELLO, FRED!"
```
Để biết thêm chi tiết về các hàm Python thì bạn có thể đọc [trong tài liệu](https://docs.python.org/3.5/tutorial/controlflow.html#defining-functions)

# Classes
Cú pháp để xác định các lớp trong Python rất đơn giản, mình sẽ không đi chi tiết về phần này chỉ mang tính chất giới thiệu:
```python
class Greeter(object):

    # Constructor
    def __init__(self, name):
        self.name = name  # Create an instance variable

    # Instance method
    def greet(self, loud=False):
        if loud:
            print('HELLO, %s!' % self.name.upper())
        else:
            print('Hello, %s' % self.name)

g = Greeter('Fred')  # Construct an instance of the Greeter class
g.greet()            # Call an instance method; prints "Hello, Fred"
g.greet(loud=True)   # Call an instance method; prints "HELLO, FRED!"
```
Bạn có thể đọc thêm về các lớp Python [trong tài liệu](https://docs.python.org/3.5/tutorial/classes.html)
# Tài liệu tham khảo
- Cs 188: [Project 0: Unix/Python/Autograder Tutorial](https://inst.eecs.berkeley.edu/~cs188/su19/project0/#advanced-exercise)
-  Cs 231n: [Python Numpy Tutorial](http://cs231n.github.io/python-numpy-tutorial/#python-functions)
- Nếu bạn muốn luyện tập nhiều hơn, thì có thể tham khảo [Learn python the hard way](https://learncodethehardway.org/more-python-book/)
- [30-Days-Of-Python](https://github.com/Asabeneh/30-Days-Of-Python)
- [Python cheatsheet](http://datasciencefree.com/python.pdf)
# TL;DR
Cảm ơn bạn đã đọc đến dòng này, nếu có chỗ nào chưa hiểu hoặc mình sai chỗ nào, các bạn có thể comment bên dưới. Hẹn gặp lại các bạn ở các bài tiếp theo.