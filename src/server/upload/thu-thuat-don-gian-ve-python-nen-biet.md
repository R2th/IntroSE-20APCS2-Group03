Sau đây mình xin giới thiệu một số mẹo Python tương đối phổ biến và rất hữu ích.
# 1.Swapping values (Trao đổi giá trị)
```
In [1]: a , b = 5, 10

In [2]: print(a, b)
(5, 10)

In [3]: a, b = b, a

In [4]: print (a, b)
(10, 5)

```
cách trao đổi giá trị cơ bản
# 2. Tạo một chuỗi đơn từ các phần tử của 1 list
```
a = ["python", "is", "awesome"]
print(" ".join(a))
---------------------
python is awesome
```
# 3. Tìm giá trị xuất hiện nhiều nhất trong list
```
In [9]: list=[1,2,3,1,2,3,2,2,4,5,1]

In [10]: print(max(set(list),key = list.count))
2
```
hoặc sự dụng plugin Counter
```
In [10]: from collections import Counter

In [11]: cnt = Counter(list)

In [12]: print(cnt)
Counter({2: 4, 1: 3, 3: 2, 4: 1, 5: 1})
```
tức 2 xuất hiện 4 lần , 1 xuất hiện 3 lần ,và tương tự 
# 4. Kiểm tra 2 chuỗi có phải chuỗi đảo chữ hay không?
```
In [14]: Counter("321") == Counter('123')
Out[14]: True

In [15]: Counter("321") == Counter('12x')
Out[15]: False
```
# 5. Đảo chuỗi, đảo list
```
In [16]: a = 'qwertyuiopasdfghjklzxcvbnm'

In [17]: print(a[::-1])
mnbvcxzlkjhgfdsapoiuytrewq
```
```
In [18]: for char in reversed(a):
    ...:     print(char)
    ...:     
m
n
b
v
c
x
z
l
k
j
h
g
f
d
s
a
p
o
i
u
y
t
r
e
w
q
```
```
với number:
In [19]: num = 1234567890

In [20]: print(int(str(num)[::-1]))
987654321
```
```
In [21]: a = [5,6, 7,3]

In [22]: print(a[::-1])
[3, 7, 6, 5]
```
# 6. Đổi chỗ mảng 2 chiều 
```

In [23]: original = [['a','b'], ['c','d'],['e','f']]

In [24]: transposed = zip(*original)

In [25]: transposed

Out[26]: [('a', 'c', 'e'), ('b', 'd', 'f')]
```
# 7. So sánh kép
```
In [27]: z = 6

In [28]: 4 < z < 7
Out[28]: True

In [30]: 1 == z < 30
Out[30]: False
```
# 8. Lồng nhiều hàm
```
In [32]: def product(a, b):
    ...:     return a *b
    ...: 

In [33]: def add (a,b):
    ...:     return a +b
    ...: 

In [34]: b = True

In [35]: (product if b else add)(5, 7)
Out[35]: 35
```
# 9. Coppying list
```
In [37]: a = [1,2,3,4,5]

In [38]: b = a

In [39]: b[0] = 10

In [40]: b
Out[40]: [10, 2, 3, 4, 5]
*cả a và b đều cùng thay đổi *

In [41]: b = a[:]

In [42]: a
Out[42]: [10, 2, 3, 4, 5]

In [43]: b[0] = 11

In [44]: b
Out[44]: [11, 2, 3, 4, 5]

In [45]: a
Out[45]: [10, 2, 3, 4, 5]
*chỉ b thay đổi , a ko thay đổi*
```



nguồn: https://hackernoon.com/python-tricks-101-2836251922e0