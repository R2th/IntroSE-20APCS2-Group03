**Python** là một trong những ngôn ngữ phổ biến và được yêu thích nhất hiện nay. 
Với tính ngắn gọn và dễ tiếp nhận của Python làm cho nó trở nên phổ biến đối với tất cả các lập trình viên. 
Dưới đây là một số mẹo và thủ thuật bạn có thể sử dụng để trong quá trình lập trình Python của mình.

**1. Hoán đổi tại chỗ của hai số**
```
>>> x, y = 50, 100
>>> print(x, y)
>>> x, y = y, x
>>> print(x, y)
```
Output
```
50 100
100 50
```

**2. Đảo ngược một chuỗi**
```
>>> name = "Eminem"
>>> print(name[::-1], "is the best rapper of all time")
```
Output
```
menimE is the best rapper of all time
```

**3. Tạo một chuỗi từ tất cả các phần tử trong danh sách**
```
>>> list = ["My", "name", "is", "NoName"]
>>> print(" ".join(list))
```
Output
```
My name is NoName
```

**4. Kết hợp những điều kiện so sánh**
```
>>> number = 22
>>> result = 8 < number < 94
>>> print(result)
>>> result = 16 > number <= 21
>>> print(result)
```
Output
```
True
False
```

**5. Sử dụng Enums trong Python**
```
>>> class Number:
>>>     One, Two, One = range(3)
>>>
>>> print(Number.One)
>>> print(Number.Two)
>>> print(Number.One)
```
Output
```
2
1
2
```

**6. Trả lại nhiều giá trị từ các hàm**
```
>>> def x():
>>>     return 1, 2, 3, 4
>>> a, b, c, d = x()
>>> 
>>> print(a, b, c, d)
```
Output
```
1 2 3 4
```

**7. Tìm giá trị xuất hiện nhiều nhất trong danh sách**
```
>>> arr = [1, 2, 3, 4, 5, 1, 2, 1, 1]
>>> print(max(set(arr), key = arr.count))
```
Output
```
1
```

**8. Kiểm tra việc sử dụng bộ nhớ của một đối tượng**
```
>>> import sys
>>> x = 1
>>> print(sys.getsizeof(x))
```
Output
```
28
```

**9. In chuỗi N lần**
```
>>> n = 3
>>> vn = "VietNamVoDich! "
>>> print(vn * n)
```
Output
```
VietNamVoDich! VietNamVoDich! VietNamVoDich! 
```

**10. Kiểm tra xem hai từ có phải là đảo ngữ không**
```
>>> # Cach 1
>>> from collections import Counter
>>> def is_anagram(str1, str2):
>>>     return Counter(str1) == Counter(str2)
  
>>> # Cach 2
>>> def is_anagram(str1, str2): 
>>>    return sorted(str1) == sorted(str2) 
>>> 
>>> print(is_anagram('yeuthuong', 'thuongyeu'))
>>> print(is_anagram('yeuthuong', 'thuongyek'))   
```
Output
```
True
False
```