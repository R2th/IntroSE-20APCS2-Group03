Hi, trong phần [trước](https://viblo.asia/p/python-mot-so-tips-khi-code-phan-1-V3m5W0RQKO7) mình đã giới thiệu đến các bạn 9 tips khi các bạn code Python. Trong phần này mình sẽ tiếp tục gửi đến các bạn một số tips hữu dụng khác nhé. Let's go.

# 1. Reverse string
Để reverse một đoạn string, chúng ta dùng var[::-1] 
```python
text = 'Hello World'
print(text[::-1])

# Output
dlroW olleH
```

# 2. Split string 
Sau khi tách một string thì chúng ta được một list gồm các string.
```python
sentence = 'Hi, my name is Hai'
new_string = sentence.split()
print(new_string)

# Output 
['Hi,', 'my', 'name', 'is', 'Hai']
```

# 3. Tạo một chuỗi đơn
Bằng cách ghép các tử trong một list vào thành 1 string thì chúng ta có thể đặt cho chúng phần tử để ghép là gì. Ví dụ ở đây mình đặt cho chúng là dấu cách.
```python
original = ['Hi,', 'my', 'name', 'is', 'Hai']
print(' '.join(original))

# Output
Hi, my name is Hai
```
hoặc dấu `-`
```python
original = ['My', 'name', 'is', 'Hai']
print('-'.join(original))

# Output
My-name-is-Hai
```
# 4. Kiểm tra các chữ cái của 1 string có giống nhau (đảo chữ cái)
```python
from collections import Counter
Counter('bike') == Counter('ekbi')  # True
Counter('bike') == Counter('ekbj')  # False
```

# 5. Format string 
```python
def say_hello(name)
    print(f"Hello {name}"

say_hello('Hai')
say_hello('Tokuda')

# Output
Hello Hai
Hello Tokuda
```

# 6. Hợp nhất các phần tử trong list 
```python
import itertools
original = [[1, 2], [3, 4], [5, 6]]
handled = list(itertools.chain.from_iterable(a))
print(handled)

# Output
[1, 2, 3, 4, 5, 6]
```
# 7. Reverse list
Có 2 cách để reverse một list:
```python
original = ['a', 'b', 'd', 'e', '3']
# Cách 1 
original.reverse()

# Cách 2
original[::-1]
```

# 8. Kết hợp 2 lists 
```python
list_1 = ['a', 'b', 'c', 'd']
list_2 = ['e', 'f', 'g', 'h']

for x, y in zip(a, b):
    print(x, y)
    
# Output
a e
b f
c g
d h
```

# 9. Negative Indexing List
```python
original = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
original[-3:-1] 

Output
[8, 9]
```

# 10. Phần tử lặp lại nhiều lần nhất trong list
```python
original = [1, 2, 3, 4, 2, 2, 3, 1, 4, 4, 4]
print(max(set(original), key = original.count))

# Output
4 
```

# 11. Unpack list
```python
one, two, three = ['Car', 'Bike', 'Plane']
print(one)
print(two)
print(three)

# Output
Car
Bike
Plane
```

# 12. Phần tử trùng / khác nhau giữa 2 Sets
```python
set_a = {1,2,3}
set_b = {3,4,5}
intersect = set_a.intersection(set_b)
difference = set_a.difference(set_b)
print(intersect)
print(difference)

# Output
{3}
{1, 2}
```
# 13. Tạo giá trị cho nhiều biến 
```python
a = b = c = 'sample'
print(a, b, c)

# Output
sample sample sample
```

# 14. So sánh theo chuỗi
```python
x = 10
5 < x < 15  # True
5 > x < 15  # False
```

Cảm ơn các bạn đã đọc bài viết. Nếu bài viết có ích đừng ngại ngần cho mình xin 1 upvote và đừng quên để lại 1 comment nếu bạn cảm thấy chưa hài lòng về bài viết này để mình cải thiện trong những bài viết tới nha.

#### Thanks for reading !