Trong bài viết này, mình xin giới thiệu 1 số thủ thuật hay mà mình biết trong Python
### 1. swap 2 biến
với một vài ngôn ngữ thì việc swap giá trị của 2 biến có thể coi là đơn giản nhưng không về ngắn gọn, với python ta hoàn toàn có thể swap giá trị của 2 biến chỉ bằng  một lệnh gán
```
>>> x, y = 10, 20
>>> print(x, y)
>>> x, y = y, x
>>> print(x, y)
```
kết quả sẽ là `(10,20)` và (20,10)`
dự vào đây t sẽ có 1 cách rất cool để tìm ra giá trị ở vị trí thứ n trong dãy Fibonaci
```
a, b = 0, 1
for i in range(n):
	a, b = b, a + b
```

### 2. so sánh kép
```
>>> n = 10
>>> result = 1 < n < 20
>>> print(result)
True
>>> result = 1 > n <= 9
>>> print(result)
False
```
### 3. phép gán 1 biến đi kèm với điều kiện
```
def small(a, b, c):
    return a if a <= b and a <= c else (b if b <= a and b <= c else c)

>>> print(small(1, 0, 1))
0
>>> print(small(1, 2, 2))
1
>>> print(small(2, 2, 3))
2
>>> print(small(5, 4, 3))
3
```
### 4. toán tử `_`

toán từ `_1 sẽ trả về kết quả của biểu thức cuối cùng được thực hiện
```
>>> 2 + 1
3
>>> _
3
>>> print _
3
```
### 5. đơn giản hóa điều kiện `if`

khi viết một điều kiện if thay vì viết 
```
if m==1 or m==3 or m==5 or m==7:
```
ta có thể viết thành
```
if m in [1,3,5,7]:
```
đối với `in` ta cũng có thể dùng `{1,3,5,7}` thay vì `[1,3,5,7]`

### 6.Reverse

Trong python ta có thể dễ dàng reverse một string hoặc một list
```
>>> "Python2.7"[::-1]
7.2nohtyP
>>> [1, 3, 5][::-1]
[5, 3, 1]
```
### 7. enum trong python

Trong python có 1 cách rất đơn giản để sử dụng enum
```
class Shapes:
    Circle, Square, Triangle, Quadrangle = range(4)
    
>>> print(Shapes.Circle)
0
>>> print(Shapes.Square)
1
>>> print(Shapes.Triangle)
2
>>> print(Shapes.Quadrangle)
3
```
### 8. Tìm giá trị lặp lại nhiều lần nhất trong list
```
>>> test = [4,1,2,3,2,2,3,1,4,4,4]
>>> print(max(set(test), key=test.count))
4
```
trong trường hợp list có 2 giá trị có số lần lặp lại nhiều nhất thì hàm trên sẽ trả lại giá trị nhỏ hơn
```
>>> test = [4,1,2,3,2,2,3,1,4,4,4,1,1]
>>> print(max(set(test), key=test.count))
1
```
### 9. đếm số lần xuất hiện trong list
```
>>> from collections import Counter
>>> myList = [1,1,2,3,4,5,3,2,3,4,2,1,2,3]
>>> print(Counter(myList))
Counter({2: 4, 3: 4, 1: 3, 4: 2, 5: 1})
```
### 10. Boolean 

Boolean cũng có thể được truyền như một số int
```
>>> a = [5,6,7,8,9]
>>> print(a[True])
6
>>> print(a[False])
5
```
Với python 2.7 ta thậm chí có thể gán giá trị cho `True/False`
```
>>> True = False
>>> False
False
>>> True
False
>>> True == False
True
```


### 11.  XKCD Comics
```
>> import antigravity
```
khi bạn type cmd này trong  terminal, bạn sẽ nhận được 1 comic trong trình duyệt như link này https://xkcd.com/353/

### 12. enumerate
```
  for i, item in enumerate(iterable):
    print i, item
```
```
>>> list(enumerate('abc')) 
[(0, 'a'), (1, 'b'), (2, 'c')] 
 
>>> list(enumerate('abc', 1)) 
[(1, 'a'), (2, 'b'), (3, 'c')]
```
### 13. Kiểm tra 2 từ là anagram (đổi chữ)
```
from collections import Counter
def is_anagram(str1, str2):
     return Counter(str1) == Counter(str2)
     
>>> is_anagram('abcd','dbca')
True
>>> is_anagram('abcd','dbaa')
False
```
### 14. switch
Trong python không có `switch..case` nhưng ta có thể dùng dictionary để giải quyết vấn đề này
```
>>> stdcalc = {'sum': lambda x, y: x + y, 'subtract': lambda x, y: x - y}
>>> print(stdcalc['sum'](9,3))
12
>>> print(stdcalc['subtract'](9,3))
6
```
### 15. Float
```
>>> 0.1 + 0.2
0.3000000000004
```
Đây có thể không phải là 1 thủ thuật tuy nhiên đây là một điều cần lưu ý là số hữu tỷ không được biểu diễn chính xác trên máy tính và khi ta thấy một giá trị có kiểu float thì đa phần đây là một giá trị xấp xỉ chứ không phải là một giá trị chính xác, để giải thích rõ thì bạn có thể xem tại https://docs.python.org/3/tutorial/floatingpoint.html#tut-fp-issues