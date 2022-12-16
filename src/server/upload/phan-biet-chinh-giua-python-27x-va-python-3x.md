Nhiều người dùng Python bắt đầu tự hỏi họ nên bắt đầu phiên bản Python nào. Câu trả lời của tôi cho câu hỏi này thường là bạn cứ dùng cái nào cũng được hoặc bạn đã quen thuộc, sau đó tìm hiểu xem sự khác biệt giữa các phiên bản với nhau như thế nào sẽ thú vị hơn. Cả Python 2.7.x và Python 3.x đều có các thư viện hỗ trợ mà bạn dự định sử dụng. Tuy nhiên, bạn nên xem xét sự khác biệt chính giữa hai phiên bản phổ biến nhất của Python này để tránh những lỗi phổ biến khi viết code, và cũng là những chú ý để nhận biết dự án của bạn sử dụng phiên bản python nào?

# 1. hàm 'print':
Python 2 không có vấn đề với các lệnh bổ sung, nhưng ngược lại, Python 3 sẽ tăng cú pháp SyntaxError nếu chúng ta gọi hàm in mà không có dấu ngoặc đơn.

Python 2: 
```
print 'Python', python_version()
print 'Hello, World!'
print('Hello, World!')
print "text", ; print 'print more text on the same line' 
```
```
Python 2.7.6
Hello, World!
Hello, World!
text print more text on the same line 
```
Python 3 :
```
print('Python', python_version())
print('Hello, World!')

print("some text,", end="")
print(' print more text on the same line') 
print 'Hello, World!'
```

```
result :
Python 3.4.1
Hello, World!
some text, print more text on the same line   
 File "<ipython-input-3-139a7c5835bd>", line 1
    print 'Hello, World!'
                        ^
SyntaxError: invalid syntax|
```

# 2. chia số nguyên

Thay đổi này đặc biệt nguy hiểm nếu bạn đang thực thi code Python 3 trong Python 2, vì thay đổi trong hành vi phân chia số nguyên thường có thể không được chú ý (nó không làm tăng cú pháp SyntaxError).

Python 2
```
print 'Python', python_version()
print '3 / 2 =', 3 / 2
print '3 // 2 =', 3 // 2
print '3 / 2.0 =', 3 / 2.0
print '3 // 2.0 =', 3 // 2.0
```
```
Python 2.7.6
3 / 2 = 1
3 // 2 = 1
3 / 2.0 = 1.5
3 // 2.0 = 1.0
```
python 3:
```
print('Python', python_version())
print('3 / 2 =', 3 / 2)
print('3 // 2 =', 3 // 2)
print('3 / 2.0 =', 3 / 2.0)
print('3 // 2.0 =', 3 // 2.0)
```
```
Python 3.4.1
3 / 2 = 1.5
3 // 2 = 1
3 / 2.0 = 1.5
3 // 2.0 = 1.0
```

# 3.Unicode:

Python 2 có các kiểu str () kiểu ASCII, riêng biệt unicode (), nhưng không có kiểu byte. Bây giờ, trong Python 3, cuối cùng chúng ta có các chuỗi Unicode (utf-8) và 2 lớp byte: byte và bytearrays.

python 2:
```
print type(unicode('this is like a python3 str type'))
<type 'unicode'>
print type(b'byte type does not exist')
<type 'str'>
print 'they are really' + b' the same'
they are really the same
print type(bytearray(b'bytearray oddly does exist though'))
<type 'bytearray'>
```
python 3:
```
print('Python', python_version(), end="")
print(' has', type(b' bytes for storing data'))
Python 3.4.1 has <class 'bytes'>
print('and Python', python_version(), end="")
print(' also has', type(bytearray(b'bytearrays')))
and Python 3.4.1 also has <class 'bytearray'>
'note that we cannot add a string' + b'bytes for data'
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)

<ipython-input-13-d3e8942ccf81> in <module>()
----> 1 'note that we cannot add a string' + b'bytes for data'


TypeError: Can't convert 'bytes' object to str implicitly
```

# 4.xrange

Việc sử dụng xrange () rất phổ biến trong Python 2.x để tạo một đối tượng có thể lặp lại, ví dụ: trong vòng lặp for hoặc list / set-dictionary-comprehension. xrange-iterable không phải hoàn toàn có nghĩa là bạn có thể lặp lại nó vô hạn.

Trong Python 3, range () đã được thực hiện giống như hàm xrange () sao cho hàm xrange () chuyên dụng không còn tồn tại nữa (xrange () tăng một NameError trong Python 3).

```
import timeit

n = 10000
def test_range(n):
    return for i in range(n):
        pass

def test_xrange(n):
    for i in xrange(n):
        pass  
 ```
 
 Python 2
```
print '\ntiming range()'
%timeit test_range(n)

print '\n\ntiming xrange()'
%timeit test_xrange(n)
--------------------------------
timing range()
1000 loops, best of 3: 433 µs per loop

timing xrange()
1000 loops, best of 3: 350 µs per loop
```
Python 3
```

print('\ntiming range()')
%timeit test_range(n)
--------------------------------
timing range()
1000 loops, best of 3: 520 µs per loop
print(xrange(10))
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)

<ipython-input-5-5d8f9b79ea70> in <module>()
----> 1 print(xrange(10))

NameError: name 'xrange' is not defined
 ```

# 5.The next() function and .next() method:

next() hay (.next ()) là một hàm thường được sử dụng (method), đây là một thay đổi cú pháp khác (hay đúng hơn là thay đổi trong thực thi) sử dụng tốt trong python 2 nhưng bị loại bỏ trong python3

python 2:
```
my_generator = (letter for letter in 'abcdefg')

next(my_generator)
my_generator.next()
--------------------------------
result: 
'a'
'b'
```
python3:
```
my_generator = (letter for letter in 'abcdefg')

next(my_generator)

--------------------------------
'a'

my_generator.next()

---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)

<ipython-input-14-125f388bb61b> in <module>()
----> 1 my_generator.next()


AttributeError: 'generator' object has no attribute 'next'
```
# 6.Các biến vòng lặp và rò rỉ namespace chung:

Trong Python 3.x cho các biến vòng lặp không bị rò rỉ vào không gian tên chung nữa
List comprehensions không còn hỗ trợ mẫu cú pháp [... for var in item1, item2, ...]. Sử dụng [... for var in (item1, item2, ...)] thay thế. Cũng lưu ý rằng việc hiểu danh sách có ngữ nghĩa khác nhau: chúng gần với cú pháp cho biểu thức máy hiểu bên trong một hàm tạo danh sách (và đặc biệt là các biến điều khiển vòng lặp không còn bị rò rỉ ra ngoài phạm vi. ”

Python 2
```
i = 1
print 'before: i =', i

print 'comprehension: ', [i for i in range(5)]

print 'after: i =', i
--------------------------------
before: i = 1
comprehension:  [0, 1, 2, 3, 4]
after: i = 4
```
python 3:
```
i = 1
print('before: i =', i)

print('comprehension:', [i for i in range(5)])

print('after: i =', i)
--------------------------------

before: i = 1
comprehension: [0, 1, 2, 3, 4]
after: i = 1
```
# 7. So sánh khác loại 
ở python 2 ,có thể so sánh list với string,... nhưng ở python 3 thì không

python 2 
```
print "[1, 2] > 'foo' = ", [1, 2] > 'foo'
print "(1, 2) > 'foo' = ", (1, 2) > 'foo'
print "[1, 2] > (1, 2) = ", [1, 2] > (1, 2)
--------------------------------
[1, 2] > 'foo' =  False
(1, 2) > 'foo' =  True
[1, 2] > (1, 2) =  False
```
python 3
```
print("[1, 2] > 'foo' = ", [1, 2] > 'foo')
print("(1, 2) > 'foo' = ", (1, 2) > 'foo')
print("[1, 2] > (1, 2) = ", [1, 2] > (1, 2))
--------------------------------
TypeError                                 Traceback (most recent call last)

<ipython-input-16-a9031729f4a0> in <module>()
      1 print('Python', python_version())
----> 2 print("[1, 2] > 'foo' = ", [1, 2] > 'foo')
      3 print("(1, 2) > 'foo' = ", (1, 2) > 'foo')
      4 print("[1, 2] > (1, 2) = ", [1, 2] > (1, 2))
      TypeError: unorderable types: list() > str()
```
# 8.Phân tích cú pháp đầu vào của người dùng thông qua input()

hàm input () được cố định trong Python 3 để nó luôn lưu trữ đầu vào của người dùng làm các đối tượng str. Để tránh hành vi nguy hiểm trong Python 2 để đọc trong các loại khác so với chuỗi, chúng ta phải sử dụng raw_input () để thay thế.

Python 2
```
Python 2.7.6
[GCC 4.0.1 (Apple Inc. build 5493)] on darwin
Type "help", "copyright", "credits" or "license" for more information.

>>> my_input = input('enter a number: ')

enter a number: 123

>>> type(my_input)
<type 'int'>

>>> my_input = raw_input('enter a number: ')

enter a number: 123

>>> type(my_input)
<type 'str'>
```
Python 3
```
Python 3.4.1
[GCC 4.2.1 (Apple Inc. build 5577)] on darwin
Type "help", "copyright", "credits" or "license" for more information.

>>> my_input = input('enter a number: ')

enter a number: 123

>>> type(my_input)
<class 'str'>
```
Trả về các đối tượng có thể lặp lại thay vì danh sách

# 9 . Một số hàm và phương thức trả về các đối tượng có thể lặp lại trong Python 3 ngay - thay vì các danh sách trong Python 2.
Python 2

```
print range(3)
print type(range(3))
--------------------------------
[0, 1, 2]
<type 'list'>
```
Python 3
```
print(range(3))
print(type(range(3)))
print(list(range(3)))
--------------------------------
range(0, 3)
<class 'range'>
[0, 1, 2]
```
Một số hàm và phương thức thường được sử dụng không trả về danh sách nữa trong Python 3:
```
zip()

map()

filter()

dictionary’s .keys() method

dictionary’s .values() method

dictionary’s .items() method
```
nguồn: http://sebastianraschka.com/Articles/2014_python_2_3_key_diff.html#sections