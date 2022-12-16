# Khái niệm Pythonic
Pythonic là một Idioms mô tả cách tiếp cận lập trình phù hợp với triết lý sáng lập của ngôn ngữ lập trình Python . Có nhiều cách để viết code tương tự nhau trong Python, nhưng có một cách được ưu thích hơn để thực hiện nó. Cách ưa thích này được gọi là “pythonic.”
Ngược lại, code khó hiểu hoặc đọc giống như một bản phiên âm thô từ một ngôn ngữ lập trình khác được gọi là "unpythonic".
# Triết lý viết code trong Python
* Đẹp đẽ tốt hơn xấu xí
* Minh bạch tốt hơn che đậy
* Đơn giản tốt hơn phức tạp
* Phức tạp tốt hơn rắc rối
* Dễ đọc

Chúng ta hãy cùng tham khảo một vài ví dụ dưới đây.
```python
i = 0
while i < mylist_length:
   do_something(mylist[i])
   i += 1
```
Mặc dù đoạn code trên hoạt động tốt, nhưng nó không được coi là Pythonic. Nó không phải là một idiom mà ngôn ngữ Python khuyến khích. Chúng ta có thể cải thiện nó. Một idiom điển hình trong Python để tạo tất cả các số trong list sẽ là sử dụng hàm range () được tích hợp sẵn:
```python
for i in range(mylist_length):
   do_something(mylist[i])
```
Tuy nhiên, đây vẫn không phải là Pythonic. Đây là cách Pythonic, được chính ngôn ngữ khuyến khích:
```python
for element in mylist:
   do_something(element)
```
# 7 Ví dụ về code pythonic
## 1. Hoán đổi giá trị giữa 2 biến

Bad
```python
tmp = a
a = b
b = tmp
```

Pythonic
```python
a,b = b,a
```

## 2. Sử dụng list

Bad
```python
my_list = []
for i in range(10):
    my_list.append(i*2)
```

Pythonic
```python
my_list = [i*2 for i in range(10)]
```

## 3. Duyệt mảng có đánh thứ tự

Bad
```python
for i in range(len(my_list)):
    print(i, "-->", my_list[i])
```

Pythonic
```python
for i,item in enumerate(my_list):
    print(i, "-->",item)
```

## 4. Unpacking

Pythonic
```python
a, *rest = [1, 2, 3]
# a = 1, rest = [2, 3]

a, *middle, c = [1, 2, 3, 4]
# a = 1, middle = [2, 3], c = 4
```

## 5. Nối các phần tử trong mảng

Bad
```python
letters = ['s', 'p', 'a', 'm']
s=""
for let in letters:
    s += let
```

Pythonic
```python
letters = ['s', 'p', 'a', 'm']
word = ''.join(letters)
```

## 6. Kiểm tra điều kiện

Badpython
```python
if attr == True:
    print 'True!'

if attr == None:
    print 'attr is None!'
```

Pythonic
```python
if attr:
    print 'attr is truthy!'

if not attr:
    print 'attr is falsey!'

if attr is None:
    print 'attr is None!'
```

## 7. Hoạt động của mảng

Bad
```python
a = [3, 4, 5]
b = []
for i in a:
    if i > 4:
        b.append(i)
```

Pythonic
```python
a = [3, 4, 5]
b = [i for i in a if i > 4]
# Or:
b = filter(lambda x: x > 4, a)
```

Bad
```python
a = [3, 4, 5]
for i in range(len(a)):
    a[i] += 3
```

Pythonic
```python
a = [3, 4, 5]
a = [i + 3 for i in a]
# Or:
a = map(lambda i: i + 3, a)
```