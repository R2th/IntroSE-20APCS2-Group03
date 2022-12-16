Bạn cần dictionary, map hay hash table (bảng băm) để implement một giải thuật trong chương trình của bạn? Vậy hãy tiếp tục đọc để thấy được thư viện chuẩn Python có thể giúp bạn những gì.

![](https://images.viblo.asia/302934e5-3cb2-49b3-846a-9442575228e8.png)

Trong Python, dictionary (dict) là một cấu trúc dữ liệu quan trọng:

Dict lưu một số tùy ý các đối tượng, mỗi đối tượng được xác định bởi một *key* duy nhất. Dict cũng thường được gọi là *map*, *hashmap*, *lookup table* hoặc *associative array*. Chúng cho phép tìm kiếm, thêm, xóa bất kỳ đối tượng nào gắn với một key cho trước một cách hiệu quả.

Để đưa ra một lời giải thích thực tiễn hơn - *danh bạ điện thoại* là một ví dụ thực tế cho dict:

> Danh bạ điện thoại cho phép bạn tra cứu thông tin (số điện thoại) gắn với một key cho trước (tên người). Thay vì phải đọc một danh bạ theo thứ tự để tìm số của một ai đó, bạn có thể nhảy cóc đến một cái tên và tìm số điện thoại tương ứng với nó.

### Python Dictionaries, Hashmaps, and Hash Tables

Kiểu dữ liệu trừu tượng dictionary là một trong những cấu trúc dữ liệu quan trọng và được sử dụng nhiều nhất trong khoa học máy tính. Bởi vì tính chất quan trọng này, Python đã cung cấp một bản thực thi mạnh mẽ về loại cấu trúc dữ liệu này.

Python thậm chí còn cung cấp các cú pháp dễ hiểu (syntactic sugar) để làm việc với dict trong chương trình của bạn. Ví dụ, cú pháp ngoặc nhọn và dictionary comprehension cho phép bạn định nghĩa các dict một cách tiện lợi:

```Python
phonebook = {
    'bob': 7387,
    'alice': 3719,
    'jack': 7052,
}

squares = {x: x * x for x in range(10)}
```

Dict trong Python được đánh index bởi các key có kiểu dữ liệu băm được (hashable). Một hashable object có giá trị băm không bao giờ thay đổi và nó có thể được so sánh với các đối tượng khác.

Hơn nữa, các hashable object bằng nhau phải có cùng giá trị băm. Các kiểu dữ liệu không thay đổi được string và number có thể dùng làm key cho dictionary. Bạn cũng có thể sử dụng các tuple làm key chỉ cần chúng chỉ chứa các kiểu dữ liệu có thể băm.

#### Built-in dict type

Trong hầu hết các trường hợp, built-in dict sẽ đáp ứng được nhu cầu của bạn. Dict được tối ưu mạnh mẽ và làm nền tảng cho rất nhiều phần khác của ngôn ngữ, ví dụ các class attribute và class variable trong stack frame (khung stack) đều được lưu trữ nội tại trong các dict.

Các Python dict cung cấp đặc tính hiệu năng mà bạn mong muốn: độ phức tạp *O(1)* cho các thao tác tìm kiếm, insert, update và delete.

Thú vị thay, Python cung cấp cho bạn một số bản thực thi dictionary chuyên dụng trong thư viện chuẩn của nó. Các dict chuyên dụng này dựa vào bản thực thi chuẩn nhưng thêm một số tính năng.

#### [collections.OrderedDict](https://docs.python.org/3/library/collections.html#collections.OrderedDict) – Remember the insertion order of keys

Một subclass dictionary nhớ được thứ tự insert của các key.

`OrderedDict` không phải là phần built-in của ngôn ngữ và bắt buộc phải được import từ module `collections` trong thư viện chuẩn.

```Python
>>> import collections
>>> d = collections.OrderedDict(one=1, two=2, three=3)

>>> d
OrderedDict([('one', 1), ('two', 2), ('three', 3)])

>>> d['four'] = 4
>>> d
OrderedDict([('one', 1), ('two', 2), ('three', 3), ('four', 4)])

>>> d.keys()
odict_keys(['one', 'two', 'three', 'four'])
```

#### [collections.defaultdict](https://docs.python.org/3/library/collections.html#collections.defaultdict) – Return default values for missing keys

Một subclass dictionary chấp nhận kiểu giá trị mặc định (trong constructor của nó). Giá trị phù hợp sẽ được trả về nếu key yêu cầu không được tìm thấy trong đối tượng `defaultdict`. Điều này giúp tiết kiệm "typing" và làm cho mục đích của lập trình viên rõ ràng hơn so với việc sử dụng phương thức `get()` hoặc bắt exception `KeyError`.

```Python
>>> from collections import defaultdict
>>> dd = defaultdict(list)

# Accessing a missing key creates it and initializes it
# using the default factory, i.e. list() in this example:
>>> dd['dogs'].append('Rufus')
>>> dd['dogs'].append('Kathrin')
>>> dd['dogs'].append('Mr Sniffles')

>>> dd['dogs']
['Rufus', 'Kathrin', 'Mr Sniffles']

>>> dd['dogss']
[]
```

#### [collections.ChainMap](https://docs.python.org/3/library/collections.html#collections.ChainMap) – Search multiple dictionaries as a single mapping

Cấu trúc dữ liệu này nhóm nhiều dict thành một mapping đơn. Việc tìm kiếm sẽ duyệt theo thứ tự sắp xếp của các dict. Insert, update, delete chỉ ảnh hưởng đến dict đầu tiên được thêm vào chuỗi (chain).

```Python
>>> from collections import ChainMap
>>> dict1 = {'one': 1, 'two': 2}
>>> dict2 = {'one': 4, 'three': 3}
>>> chain = ChainMap(dict1, dict2)

>>> chain
ChainMap({'one': 1, 'two': 2}, {'one': 4, 'three': 3})

# ChainMap searches each collection in the chain
# from left to right until it finds the key (or fails):
>>> chain['one']
1
>>> chain['two']
2
>>> chain['three']
3
>>> chain['missing']
KeyError: 'missing'
>>> chain['one'] = 10
>>> chain['four'] = 4
>>> chain
ChainMap({'one': 10, 'two': 2, 'four': 4}, {'one': 4, 'three': 3})
>>> del chain['one']
>>> chain
ChainMap({'two': 2, 'four': 4}, {'one': 4, 'three': 3})
```

#### [types.MappingProxyType](https://docs.python.org/3/library/types.html#types.MappingProxyType) – A wrapper for making read-only dictionaries

Class này được dùng để tạo ra các read-only dict.

```Python
>>> from types import MappingProxyType
>>> read_only = MappingProxyType({'one': 1, 'two': 2})

>>> read_only['one']
1
>>> read_only['one'] = 23
TypeError: "'mappingproxy' object does not support item assignment"
```

### Using Dictionaries in Python: Conclusion

- Nếu chương trình của bạn không có đòi hỏi gì đặc biệt, bạn nên sử dụng kiểu dữ liệu built-in `dict`. Nó linh hoạt và đã được tối ưu tốt.

- Chỉ khi bạn có yêu cầu đặc biệt, tôi mới khuyến khích bạn dùng các kiểu dữ liệu khác được liệt kê ở trên. Các lập trình viên khác sẽ dễ dàng hiểu và maintain code của bạn nếu như nó chỉ làm việc với dict chuẩn của Python.