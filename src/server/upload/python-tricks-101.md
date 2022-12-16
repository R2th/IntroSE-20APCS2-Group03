> Đây là một vài mẹo nhỏ khi làm việc với python, hy vọng nó sẽ giúp ích cho công việc của bạn
> 
# Hoán đổi giá trị của hai biến:
```
a, b = 10
print(a, b)
a, b = b, a
print(a, b)
```
# Tạo một chuỗi từ tất cả các phần tử có trong danh sách:
```
list = ["Make", "F33", "Great", "Again"]
print(" ",join(list))
```
# Tìm gá trị xuất hiện nhiều nhất trong mảng:
```
Cách 1:
array = [1,2,3,1,2,3,2,2,4,5,1]
most_frequent = max(set(array, key=array.count))
print(most_frequent)

Cách 2:
from collections import Counter as cnt
most_frequent = cnt(a).most_common(3)
print(most_frequent)
```
# Đảo ngược một chuỗi:
```
string_origin = 'python'

Cách 1:
string_reverse = string_origin[::-1]
print(string_reverse)

Cách 2:
for char in reversed(string_origin):
    print(char)
```

# Đảo ngược một danh sách:
```
list = ["awesome", "is", "python"]

Cách 1:
print(list[::-1])

Cách 2:
for element in reversed(list):
    print(element)
```

# Tìm ra ma trận chuyển vị của mảng 2 chiều:
```
array_2d = [['a', 'b'], ['c', 'd'], ['e', 'f']]
matrix_transpose = zip(*array_2d)
print(matrix_transpose)
```

# Chained Comparison:
```
number = 10
print(5<number<20)
print(1==number<20)
```

# Chained function call:
Dựa vào điều kiện sẽ gọi những hàm khác nhau, tuy nhiên hai hàm này phải có cùng tham số.
```
def product(a, b):
    return a+b
    
def add(a, b):
    return a+b
    
condition = True
print((product if condition else add)(10, 10))
```

# Sao chép một danh sách:
```
array = [1,2,3,4,5,6]
array_copy = array.copy()
print(array_coppy)

from copy import deepcopy
list = [[1,2], [3,4]]
list_copy = deepcopy(list)
print(list_copy)
```

# Sắp xếp giá trị trong dictionary theo giá trị:
```
dictionary = {'apple':1, 'orange':20, 'lemon':5, 'coconut': 10}

Cách 1:
dict_sorted = sorted(dictionary.items(), key=lambda x: x[1])
print(dict_sorted)

Cách 2:
from operator import itemgetter
dict_sorted = sorted(dictionary.items(), key=itemgetter[1])
print(dict_sorted)

Cách 3:
dict_sorted = sorted(dictionary, key=dictionary.get)
print(dict_sorted)
```

# For else
```
array = [1,2,3,4,5,6]
for item in array:
    if item == 0:
        break
else:
    print("did not break out of for loop ")
```

# Gộp dictionary:
```
dic_1 = {a:1}
dic_2 = {b:3}

print(**dic_1, **dic_2)
print(dict(dic_1.item() | dic_2.item() ))

another way:
dic_1.update(dict_2)
print(dict_1)
```

Và còn rất nhiều tips nữa, bạn đọc có thể check out tại đây https://github.com/brennerm/PyTricks