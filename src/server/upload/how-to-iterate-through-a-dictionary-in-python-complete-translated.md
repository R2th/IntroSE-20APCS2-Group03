![](https://images.viblo.asia/f2344c05-1304-4dfe-847a-78ca227ec519.jpg)

Dictionary (dict) là một trong những cấu trúc dữ liệu hữu ích và quan trọng bậc nhất của Python. Chúng có thể giúp bạn giải một loạt các bài toán. Tutorial này sẽ cho bạn một cái nhìn sâu sắc về cách lặp một dict.

Sau khi kết thúc tutorial này, bạn sẽ hiểu:

- Dict là gì cũng như một số tính năng chính và chi tiết về việc implement
- Cách lặp một dict sử dụng các công cụ cơ bản mà Python cung cấp
- Kiểu task thực tiễn mà bạn có thể thực hiện thong qua việc lặp một dict
- Cách sử dụng một số kỹ thuật và chiến lược nâng cao để lặp một dict

Để tìm hiểu thêm thông tin về dict, bạn có thể theo dõi các tutorial sau:

- [Dictionaries in Python](https://realpython.com/python-dicts)
- [Itertools in Python 3, By Example](https://realpython.com/python-itertools)
- Document cho [map()](https://docs.python.org/3/library/functions.html#map) và [filter()](https://docs.python.org/3/library/functions.html#filter)

Bạn đã sẵn sàng chưa? Bắt đầu thôi :)

### A Few Words on Dictionaries

Dict là nền tảng của Python. Bản thân ngôn ngữ được xây dựng xung quanh dict. Module, class, object, `globals()`, `locals()`: tất cả chúng đều là dict. Dict là trung tâm của Python ngay từ khi nó xuất hiện.

[Document chính thức của Python](https://docs.python.org/3/index.html) định nghĩa dict như sau (cái này mình không dịch nha):

>An associative array, where arbitrary keys are mapped to values. The keys can be any object with __hash__() and __eq__() methods. ([Source](https://docs.python.org/3/glossary.html#term-dictionary))

Có một vài điểm cần nhớ:

- Dict ánh xạ các key với các value và lưu chúng trong một array hoặc collection
- Các key phải có tính chất "có thể băm" (hashable), nghĩa là chúng phải có một giá trị băm (hash value) không bao giờ thay đổi xuyên suốt vòng đời của key.

Không giống như [sequence](https://docs.python.org/3/glossary.html#term-sequence) , là những [iterable](https://docs.python.org/3/glossary.html#term-iterable) support việc truy cập các element sử dụng chỉ mục nguyên (integer index), dict được đánh chỉ mục bằng các key.

Các key trong một dict rất giống một [set](https://realpython.com/python-sets/) - tập các object duy nhất và hashable. Bởi vì các object phải là hashable, các object [mutable](https://docs.python.org/3/glossary.html#term-mutable) không được sử dụng ở đây.

Ngược lại, các value có thể thuộc bất cứ kiểu dữ liệu nào, cho dù chúng có là hashable hay không. Hoàn toàn không có ràng buộc với value.

Từ Python 3.6 trở đi, các key và value của một dict có thể lặp theo cùng một thứ tự mà chúng được tạo ra. Tuy nhiên, hành vi (behaviour) này có thể khác nhau ở các version khác nhau và nó phụ thuộc vào lịch sử thêm, xóa của dict đó.

Trong Python 2.7, dict là cấu trúc không theo thứ tự. Thứ tự của các item bị **xáo trộn**:

```Python
>>> # Python 2.7
>>> a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
>>> a_dict
{'color': 'blue', 'pet': 'dog', 'fruit': 'apple'}
>>> a_dict
{'color': 'blue', 'pet': 'dog', 'fruit': 'apple'}
```

Tắt trình biên dịch đi và mở một phiên làm việc khác, bạn vẫn sẽ nhận được cùng một thứ tự:

```Python
>>> # Python 2.7. New interactive session
>>> a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
>>> a_dict
{'color': 'blue', 'pet': 'dog', 'fruit': 'apple'}
>>> a_dict
{'color': 'blue', 'pet': 'dog', 'fruit': 'apple'}
```

Trong Python 3.5, dict cũng là cấu trúc không có thứ tự nhưng điều đặc biệt là thứ tự của các item lại ngẫu nhiên. Nghĩa là ở mỗi phiên làm việc, bạn có thể sẽ nhận được một thứ tự khác của các item:

Ở phiên làm việc đầu tiên:

```Python
>>> # Python 3.5
>>> a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
>>> a_dict
{'color': 'blue', 'pet': 'dog', 'fruit': 'apple'}
>>> a_dict
{'color': 'blue', 'pet': 'dog', 'fruit': 'apple'}
```

Và ở phiên làm việc khác, bạn có thể nhận được:

```Python
>>> # Python 3.5. New interactive session
>>> a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
>>> a_dict
{'fruit': 'apple', 'pet': 'dog', 'color': 'blue'}
>>> a_dict
{'fruit': 'apple', 'pet': 'dog', 'color': 'blue'}
```

Bạn thấy đó, đây là lý do mà trong Python 3.5 dict được gọi là cấu trúc dữ liệu ngẫu nhiên.

Từ Python 3.6 trờ đi, dict là cấu trúc dữ liệu có thứ tự:

```Python
>>> # Python 3.6 and beyond
>>> a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
>>> a_dict
{'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
>>> a_dict
{'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
```

Đây là một tính năng mới của dict và nó rất hữu ích. Nhưng nếu bạn đang viết code chạy trên các phiên bản Python khác nhau, hãy quên ngay tính năng này đi bởi vì lỗi không mong muốn có thể sẽ xuất hiện khi sử dụng tính năng này.

Một tính năng quan trọng khác của dict chính là nó có tính chất mutable, nghĩa là bạn có thể thêm, xóa và update các item. Do đó một dict không thể được sử dụng làm key cho một dict khác bởi nó là unhashable.

>**Note**: Tất cả những gì bạn lĩnh hội trong phần này sẽ liên quan đến bản thực thi [Cython](https://www.python.org/about/). Những bản thực thi khác như là [PyPy](https://pypy.org/features.html), [IronPython](http://ironpython.net/) hoặc [Jython](http://www.jython.org/index.html) có thể hỗ trợ các tính năng khác nằm ngoài bài viết này.

### How to Iterate Through a Dictionary in Python: The Basics

Dict là một cấu trúc dữ liệu tuyệt vời và được sử dụng rỗng dãi trong Python. Là một lập trình viên Python, bạn sẽ luôn gặp những trường hợp mà bạn cần lặp một dict để có thể thao tác với các cặp key-value.

Khi lặp một dict, Python cung cấp cho bạn một vài công cụ tuyệt vời sẽ được đề cập đến trong bài viết này.

#### Iterating Through Keys Directly

Dict là [mapping object](https://docs.python.org/3/glossary.html#term-mapping). Điều này có nghĩa là nó kế thừa một số **method đặc biệt** mà Python sử dụng để thực hiện một số thao tác. Các method này được đặt tên sử dụng quy tắc thêm các cặp dấu gạch dưới `__` ở trước và sau tên của method.

Để trực quan hóa các method này và attribute của bất cứ object nào, bạn có sử dụng `dir()` - một hàm built-in của Python. Nếu bạn chạy `dir()` và truyền vào một dict rỗng, bạn sẽ thấy được tất cả các method và attribute mà dict implement:

```Python
>>> dir({})
['__class__', '__contains__', '__delattr__', ... , '__iter__', ...]
```

Nếu bạn để ý kỹ output ở trên, bạn sẽ thấy `__iter__`. Đây là method được gọi khi bạn cần một iterator để lặp.

Với các mapping (giống như dict), `__iter__()` sẽ lặp qua các key. Như vậy, nếu bạn đặt một dict trực tiếp vào một vòng lặp [for](https://realpython.com/python-for-loop/), Python sẽ tự động gọi `.__iter__()` và bạn sẽ nhận được một iterator gồm các key của dict:

```Python
>>> a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
>>> for key in a_dict:
...     print(key)
...
color
fruit
pet
```

Python đủ thông minh để biết `a_dict` là một dict và nó có method `__iter__()`. Trong ví dụ này, Python gọi `.__iter__()` một cách tự động, từ đó cho phép bạn lặp qua các key của `a_dict`.

Đây là cách đơn giản nhất để lặp một dict trong Python - chỉ việc đặt nó vào một vòng lặp `for` và bạn đã đạt được mục đích!

Nếu bạn sử dụng cách tiếp cận này cùng với toán tử chỉ mục (indexing operator) `[]`, bạn có xử lý các key và value của bất cứ dict nào:

```Python
>>> for key in a_dict:
...     print(key, '->', a_dict[key])
...
color -> blue
fruit -> apple
pet -> dog
```

Đoạn code ở trên cho phép bạn truy cập các key và value của `a_dict` cùng một lúc. Bằng cách này, bạn có thể làm bất cứ thao tác gì với cả key và value.

#### Iterating Through `.items()`

Khi bạn làm việc với dict, gần như chắc chắn là bạn muốn làm việc với cả key và value. Một trong những cách tốt nhất để lặp một dict là sử dụng `.item()` - method trả về một [view object](https://docs.python.org/3/library/stdtypes.html#dict-views):

```Python
>>> a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
>>> d_items = a_dict.items()
>>> d_items  # Here d_items is a view of items
dict_items([('color', 'blue'), ('fruit', 'apple'), ('pet', 'dog')])
```

Các view object giống như `d_items` cung cấp một view động về một dict, có nghĩa là khi một dict thay đổi, view đó sẽ cập nhật những thay đổi đó.

Các view có thể lặp để lấy dữ liệu tương ứng, vậy nên bạn có thể lặp một dict bằng cách sử dụng view object trả về bởi `.items()`:

```Python
>>> for item in a_dict.items():
...     print(item)
...
('color', 'blue')
('fruit', 'apple')
('pet', 'dog')
```

View object trả về bởi `.item()` có thể sinh ra các cặp key-value một cách đồng thời và cho phép bạn lặp một dict nhưng theo cách mà bạn có thể truy cập các key và value cùng một lúc.

Nếu bạn để ý một chút, bạn sẽ thấy được là các item thu được từ `.items()` là các tuple:

```Python
>>> for item in a_dict.items():
...     print(item)
...     print(type(item))
...
('color', 'blue')
<class 'tuple'>
('fruit', 'apple')
<class 'tuple'>
('pet', 'dog')
<class 'tuple'>
```

Một khi bạn đã biết được điều này, bạn có thể sử dụng [tuple unpacking](https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences) để lặp qua các key và value của dict mà bạn đang thao tác. Để đạt được điều này, bạn cần unpack (mình để tiếng Anh vì dịch sang tiếng Việt nghe rất khó chịu) các element của mỗi item thành hai biến khác nhau:

```Python
>>> for key, value in a_dict.items():
...     print(key, '->', value)
...
color -> blue
fruit -> apple
pet -> dog
```

Ở đây, các biến `key` và `value` trong header của vòng lặp `for` sẽ thực hiện việc unpack. Mỗi lần vòng lặp chạy, `key` sẽ lưu trữ key còn `value` sẽ lưu trữ value của item đang được xử lý. Bằng cách này, bạn có thể thoải mái lặp qua các item của dict và bạn có thể xử lý các key và value một cách riêng biệt và code của bạn sẽ dễ đọc (readable) và Pythonic hơn.

>**Note**: `.values()` và `.keys()` sẽ trả về các view object giống như `.items()`.

#### Iterating Through `.keys()`

Nếu bạn chỉ cần làm việc với key, bạn có thể sử dụng `.key()` - method trả về một view object chứa danh sách key của một dict:

```Python
>>> a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
>>> keys = a_dict.keys()
>>> keys
dict_keys(['color', 'fruit', 'pet'])
```

Object trả về bởi `.keys()` ở đây cung cấp một dynamic view về các key của `a_dict`. View này có thể sử dụng để lặp các key của `a_dict`.

Để lặp một dict sử dụng `.keys()`, bạn chỉ cần gọi `.keys()` trong phần header của vòng lặp `for`:

```Python
>>> for key in a_dict.keys():
...     print(key)
...
color
fruit
pet
```

Bên cạnh đó, bạn cũng có thể truy cập các value của dict đó:

```Python
>>> for key in a_dict.keys():
...     print(key, '->', a_dict[key])
...
color -> blue
fruit -> apple
pet -> dog
```

#### Iterating Through `.values()`

Cũng giống như `.keys()`, nhiều khi chúng ta chỉ cần lặp qua các value của một dict. Một cách để đạt được mục đích này là sử dụng `.values()`:

```Python
>>> a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
>>> values = a_dict.values()
>>> values
dict_values(['blue', 'apple', 'dog'])
>>>
>>> for value in a_dict.values():
...     print(value)
...
blue
apple
dog
```

Chú ý rằng là các view object hỡ trợ việc kiểm tra membership ([membership tests `in`](https://docs.python.org/3/library/stdtypes.html#typesseq-common)):

```Python
>>> a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
>>> 'pet' in a_dict.keys()
True
>>> 'apple' in a_dict.values()
True
>>> 'onion' in a_dict.values()
False
```

### Modifying Values and Keys

Có những lúc bạn sẽ quan tâm đến việc thay đổi value và key.

Ví dụ, các value có thể được sửa đổi bất cứ khi nào bạn muốn nhưng bạn sẽ cần sử dụng dict ban đầu và key map với value mà bạn muốn sửa:

```Python
>>> prices = {'apple': 0.40, 'orange': 0.35, 'banana': 0.25}
>>> for k, v in prices.items():
...     prices[k] = round(v * 0.9, 2)  # Apply a 10% discount
...
>>> prices
{'apple': 0.36, 'orange': 0.32, 'banana': 0.23}
```

Ở ví dụ trên, để thay đổi value của `prices` và áp dụng mức discount 10%, bạn sử dụng biểu thức `prices[k] = round(v * 0.9, 2)`.

Vậy tại sao bạn cần sử dụng dict ban đầu khi bạn có quyền truy cập key (`k`) và value (`v`) của nó. Liệu chúng ta có thể thay đổi chúng trực tiếp?

Vấn đề là việc thay đổi `k` hay `v` sẽ không được ánh xạ vào dict ban đầu. Nghĩa là, nếu bạn thay đổi `k` hay `v` trong vòng loop, sẽ chẳng có sự thay đổi nào với dict đó.

Mặt khác, key có thể được thêm vào hoặc loại bỏ bằng cách convert view trả về bởi `keys()` thành một object `list`:

```Python
>>> prices = {'apple': 0.40, 'orange': 0.35, 'banana': 0.25}
>>> for key in list(prices.keys()):  # Use a list instead of a view
...     if key == 'orange':
...         del prices[key]  # Delete a key from prices
...
>>> prices
{'apple': 0.4, 'banana': 0.25}
```

Cách tiếp cận này có những hệ quả về mặt performance, chủ yếu liên quan tới việc sử dụng bộ nhớ. Ví dụ, thay vì một view object sinh ra các phần tử theo yêu cầu, bạn sẽ có một `list` mới trong bộ nhớ. Tuy nhiên, đây có thể là một cách an toàn để thay đổi các key khi lặp một dict.

Cuối cùng, nếu bạn muốn loại bỏ một key của `prices` sử dụng `.keys()` một cách trực tiếp, Python sẽ raise lên `RuntimeError` để nhắc nhở bạn rằng kích thước dict bị thay đổi trong khi lặp:

```Python
>>> # Python 3. dict.keys() returns a view object, not a list
>>> prices = {'apple': 0.40, 'orange': 0.35, 'banana': 0.25}
>>> for key in prices.keys():
...     if key == 'orange':
...         del prices[key]
...
Traceback (most recent call last):
  File "<input>", line 1, in <module>
    for key in prices.keys():
RuntimeError: dictionary changed size during iteration
```

Điều này xảy ra vởi vì `.keys()` trả về một object dictionary-view - tức là các key được trả về theo yêu cầu từng phần tử một, và nếu bạn xóa một phần tử (`del prices[key]`), Python sẽ raise lên `RuntimeError` bởi vì bạn đã thay đổi dict trong khi lặp.

>**Note:** Trong Python 2, `.items()`, `.keys()` và `.values()` trả về các object `list`. Nhưng `iteritems()`, `iterkeys()` và `.itervalues()` lại trả về các iterator. Vậy nên, nếu bạn đang sử dụng Python 2, bạn có thể thay đổi các key của một dict bằng cách sử dụng `.keys()` một cách trực tiếp.
>
>Mặt khác, bạn có thể sử dụng `iterkeys()` trong Python 2 và bạn cố thay đổi key của một dict, bạn sẽ nhận được `RuntimeError`.

### Real-World Examples

Đến bây giờ, bạn đã thấy được các cách cơ bản để lặp một dict trong Python. Giờ là lúc xem bạn có thể thao tác với các item của một dict trong khi lặp như thế nào. Hãy cùng xét các ví dụ thực tế.

>**Note:** Ở phần sau của bài viết này, bạn sẽ thấy một cách khác để giải quyết các bài toán khá giống nhau sử dụng các công cụ khác.

#### Turning Keys Into Values and Vice Versa

Giả sử bạn có một dict và vì một lý do nào đó bạn cần đổi các key thành value và ngược lại. Trong trường hợp này, bạn có thể sử dụng vòng lặp `for` lặp qua các item và tạo ra một dict mới sử dụng các key là các value và ngược lại:

```Python
>>> a_dict = {'one': 1, 'two': 2, 'thee': 3, 'four': 4}
>>> new_dict = {}
>>> for key, value in a_dict.items():
...     new_dict[value] = key
...
>>> new_dict
{1: 'one', 2: 'two', 3: 'thee', 4: 'four'}
```

Biểu thức `new_dict[value] = key` đã làm tất cả công việc cho bạn. Để đoạn code trên hoạt động được, dữ liệu của các value ban đầu phải là hashable.

#### Filtering Items

Thi thoảng bạn sẽ rơi vào trường hợp mà ở đó bạn có một dict và bạn muốn tạo ra một dict mới chỉ gồm các dữ liệu thỏa mãn một điều kiện cho trước. Bạn có thể làm điều này với một câu lệnh `if` ở trong vòng lặp `for` như sau:

```Python
>>> a_dict = {'one': 1, 'two': 2, 'thee': 3, 'four': 4}
>>> new_dict = {}  # Create a new empty dictionary
>>> for key, value in a_dict.items():
...     # If value satisfies the condition, then store it in new_dict
...     if value <= 2:
...         new_dict[key] = value
...
>>> new_dict
{'one': 1, 'two': 2}
```

Ở trong ví dụ này, bạn lọc bỏ các item với value lớn hơn `2`. Khi đó, `new_dict` chỉ chứa các item thoả mãn điều kiện `value <= 2`. Đây là giải pháp cho ví dụ này. Ở phần sau, bạn sẽ thấy một giải pháp Pythonic và dễ đọc hơn để đạt được kết quả tương tự.

#### Doing Some Calculations

Thực hiện tính toán trong khi lặp một dict trong Python cũng là việc bài toán rất quen thuộc. Giả sử bạn lưu dữ lưu sale của công ty trong một dict và bây giờ bạn muốn biết tổng doanh thu của năm.

Để giải bài toán này, bạn có thể khai báo một biến với giá trị khởi tạo là `0`. Sau đó bạn cộng dồn mọi value của dict vào biến đó:

```Python
>>> incomes = {'apple': 5600.00, 'orange': 3500.00, 'banana': 5000.00}
>>> total_income = 0.00
>>> for value in incomes.values():
...     total_income += value  # Accumulate the values in total_income
...
>>> total_income
14100.0
```

Ở đây, bạn đã lặp qua `incomes` và sau đó cộng dồn value của nó vào `total_incomes`. Biểu thức `total_income += value` thực hiện việc đó và khi kết thúc vòng lặp, bạn nhận được tổng doanh thu của năm. Chú ý rằng `total_income += value` tương đương với `total_income = total_income + value`.

### Using Comprehensions

Dictionary comprehension (DC) là một cách ngắn gọn để xử lý toàn bộ hoặc một phần các phần tử của một collection và trả về một dict. Trasi ngược với [list comprehension](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions) (LC), chúng cần hai biểu thức riêng biệt với một dấu hai chấm (`:`) theo sau bởi các mệnh đề `for` và `if` (không bắt buộc). Khi một DC được chạy, các cặp key-value được thêm vào một dict mới theo đúng thứ tự chúng được tạo ra.

Ví dụ, giả sử bạn có hai list và bạn muốn tạo một dict mới từ chúng. Trong trường hợp này, bạn có thể sử dụng method `zip(*iterables)` để lặp qua các phần tử của hai list từng đôi một:

```Python
>>> objects = ['blue', 'apple', 'dog']
>>> categories = ['color', 'fruit', 'pet']
>>> a_dict = {key: value for key, value in zip(categories, objects)}
>>> a_dict
{'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}
```

Here, zip() receives two iterables (categories and objects) as arguments and makes an iterator that aggregates elements from each iterable. The tuple objects generated by zip() are then unpacked into key and value, which are finally used to create the new dictionary.

Ở đây, `zip()` nhận hai tham biến iterable (`categories` và `objects`) và tạo ra một iterator tập hợp các phần tử của mỗi iterable. Các object tuple được tạo ra bởi `zip()` được unpack thành `key` và `value` - những giá trị sau đó được dùng để tạo ra dict mới.

DC đem tới những "khả năng mới" và cung cấp cho bạn một công cụ tuyệt vời để lặp một dict trong Python.

#### Turning Keys Into Values and Vice Versa: Revisited

Nếu bạn nhìn nhận lại bài toán chuyển các key thành các value và ngược lại, bạn sẽ thấy rằng bạn có thể đưa ra một giải pháp Pythonic và hiệu quả hơn sử dụng DC:

```Python
>>> a_dict = {'one': 1, 'two': 2, 'thee': 3, 'four': 4}
>>> new_dict = {value: key for key, value in a_dict.items()}
>>> new_dict
{1: 'one', 2: 'two', 3: 'thee', 4: 'four'}
```

Với DC này, bạn đã tạo ra một dict hoàn toàn mới mà ở đó các key và value đã được hoán đổi vị trí cho nhau. Cách tiếp cận mới này giúp bạn có thể viết các đoạn code dễ đọc, ngắn gọn, hiệu quả và Pythonic hơn.

Điều kiện để đoạn code bên trên hoạt động cũng giống như đã được đề cập trong phần trước: các value phải là các object hashable. Nếu không thì bạn sẽ không thể sử dụng chúng như các key của `new_dict`.

#### Filtering Items: Revisited

Để filter các item trong một dict với comprehension, bạn chỉ cần thêm một mệnh đề `if` khai báo điều kiện cần thỏa mãn. Trong ví dụ ở mục **Filtering Items**, điều kiện là `if v <= 2`. Với mệnh đề `if` thêm vào cuối DC, bạn có thể filter các item ccosvalue lớn hơn `2`:

```Python
>>> a_dict = {'one': 1, 'two': 2, 'thee': 3, 'four': 4}
>>> new_dict = {k: v for k, v in a_dict.items() if v <= 2}
>>> new_dict
{'one': 1, 'two': 2}
```

Bây giờ `new_dict` chỉ chứa các giá trị thỏa mãn điều kiện của bạn. So với các giải pháp trước đây, cách này hiệu quả và Pythonic hơn.

#### Doing Some Calculations: Revisited

Bạn còn nhớ ví dụ với doanh thu của công ty? Nếu bạn sử dụng một LC để lặp qua các value thì bạn sẽ thấy đoạn code trở nên ngắn gọn, nhanh và Pythonic hơn:

```Python
>>> incomes = {'apple': 5600.00, 'orange': 3500.00, 'banana': 5000.00}
>>> total_income = sum([value for value in incomes.values()])
>>> total_income
14100.0
```

LC tạo ra một object `list` chưa các value của `incomes`, và sau đó bạn tính tổng chúungswr dụng `sum()` và lưu kết quả vào `total_income`.

Nếu bạn đang làm việc với một dict thực sự lớn, sử dụng bộ nhớ (memory usage) là một vấn đề đối với bạn thì bạn có thể sử dụng [generator exporession](https://docs.python.org/3/glossary.html#term-generator-expression) thay vì LC. **generator exporession** sẽ trả về một iterator. Nó giống như LC nhưng thay vì các ngoặc vuông, bạn cần sử dụng các ngoặc đơn để khai báo:

```Python
>>> total_income = sum(value for value in incomes.values())
>>> total_income
14100.0
```

Đoạn code này đem lại hiệu quả về mặt bộ nhớ bởi vì generator expression trả về các phần tử theo yêu cầu - nghĩa là thay vì tạo và lưu cả một list trong bộ nhớ, bạn chỉ cần lưu một phần tử mỗi lúc.

>**Note:** Nếu generator expression hoàn toàn mới mẻ với bạn, bạn có thể ghé qua bài viết [Introduction to Python Generators](https://realpython.com/introduction-to-python-generators/) để tìm hiểu thêm về chủ đề này.

Cuối cùng, có một cách đơn giản hơn để giải quyết bài toán này bằng cách sử dụng `incomes.values()` trực tiếp như một tham biến của `sum()`:

```Python
>>> total_income = sum(incomes.values())
>>> total_income
14100.0
```

`sum()` nhận một iterable và trả về tổng các phần tử của nó. Ở đây, `incomes.values()` đóng vai trò là một iterable được truyền tới `sum()`. Kết quả là tổng doanh thu mà bạn muốn biết.

#### Removing Specific Items

Bây giờ, giả sử bạn có một dict và cần tạo một dict mới với một số key bị loại bỏ. Liệu bạn còn nhớ các object key-view giống các [set]() ở điểm gì? Well, những điểm tương tự này không chỉ nằm ở việc chúng là các collection gồm object có thể băm và duy nhất. Các object key-view còn hỗ trợ các phép toán quen thuộc của `set`. Ví dụ, chúng ta có thể loại bỏ các item ra khỏi một dict:

```Python
>>> incomes = {'apple': 5600.00, 'orange': 3500.00, 'banana': 5000.00}
>>> non_citric = {k: incomes[k] for k in incomes.keys() - {'orange'}}
>>> non_citric
{'apple': 5600.0, 'banana': 5000.0}
```

Đoạn code này hoạt động bởi các object key-view hỗ trỡ các phép toán quen thuộc như hợp (union), giao (intersection), hiệu (difference). Ở trong ví dụ trên, Python sẽ hiểu `incomes.keys() - {'orange'}` là phép hiệu của hai tập hợp. Nếu bạn cần thực hiện bất cứ thao tác `set` nào với các key, bạn chỉ cần sử dụng object key-view trực tiếp mà không cần convert nó sang `set` trước. Đây là một tính năng ít được biết đến nhưng khá hữu ích trong một số trường hợp của các obect key-view.

#### Sorting a Dictionary

Kể từ Python 3.6, dict là cấu trúc dữ liệu có thứ tự, vậy nên nếu bạn sử dụng Python 3.6 trở về sau, bạn sẽ sử dụng `sorted()` để sắp xếp các item của một đích theo ý muốn với sự giúp đỡ của DC:

```Python
>>> # Python 3.6, and beyond
>>> incomes = {'apple': 5600.00, 'orange': 3500.00, 'banana': 5000.00}
>>> sorted_income = {k: incomes[k] for k in sorted(incomes)}
>>> sorted_income
{'apple': 5600.0, 'banana': 5000.0, 'orange': 3500.0}
```

Đoạn code này cho phép bạn tạo ra một dict mới với key của nó đã được sắp xếp theo thứ tự. Điều này xảy ra bởi `sorted(incomes()` trả về list các key đã được sắp xếp và bạn có thể sử dụng nó để tạo ra dict mới `sorted_dict`.

### Iterating in Sorted Order

Đôi khi bạn có thể cần lặp qua một dict nhưng lại nhưng theo một thứ tự nào đó. Điều nào có thể được hiện nhờ `sorted()`. Khi bạn gọi `sorted(iterable)`, bạn nhận được một `list` với các phần tử của `iterable` đã được sắp xếp.

Hãy cùng xem bạn có thể dùng `sorted()` để lặp một dict như thế nào.

#### Sorted by Keys

Nếu bạn cần lặp một dict và muốn nó được sắp xếp theo key, bạn có thể sử dụng dict đó như một tham biến của `sorted()`. Hàm này sẽ trả về một `list` chứa các key đã được sắp xếp, sau đó bạn có thể lặp qua chúng:

```Python
>>> incomes = {'apple': 5600.00, 'orange': 3500.00, 'banana': 5000.00}
>>> for key in sorted(incomes):
...     print(key, '->', incomes[key])
...
apple -> 5600.0
banana -> 5000.0
orange -> 3500.0
```

Trong ví dụ này, bạn đã sắp xếp dict theo thứ tự alphabet bằng các sử dụng `sorted(incomes)` trong header của vòng lặp `for`. Chú ý bạn có thể sử dụng `sorted(incomes.keys())` để thu được kết quả tương tự. Trong cả hai trường hợp, bạn thu được một list chứa các key đã được sắp xếp.

>**Note:** Thứ tự sắp xếp phụ thuộc vào kiểu dữ liệu mà bạn sử dụng cho các key hoặc value và các quay tắc nội tại mà Python sử dụng để sắp xếp các kiểu dữ liệu đó.

#### Sorted by Values

Bạn cũng có thể cần lặp qua một dict với các item được được sắp xếp theo value. Bạn cũng có thể sử dụng `sorted()`, nhưng với tham biến thứ hai là `key`.

Để sắp xếp các  item của một dict theo value, bạn có thể viết một hàm trả về giá trị của mỗi item và sử dụng hàm này như là tham biến `key` của hàm `sorted()`:

```Python
>>> incomes = {'apple': 5600.00, 'orange': 3500.00, 'banana': 5000.00}
>>> def by_value(item):
...     return item[1]
...
>>> for k, v in sorted(incomes.items(), key=by_value):
...     print(k, '->', v)
...
('orange', '->', 3500.0)
('banana', '->', 5000.0)
('apple', '->', 5600.0)
```

Trong ví dụ này, bạn đã định nghĩa hàm `by_value()` và sử dụng nó để sắp xếp item của `incomes` theo value. Sau đó bạn lặp dict theo thứ tự sử dụng `sorted()`. Hàm key `by_value()` yêu cầu `sorted()` sắp xếp `incomes.items()` theo phần tử thứ hai của mỗi item, tức là theo value `item[1]`.

Bạn có thể chỉ muốn lắp quá các giá trị của một dict theo thứ tự đã được sắp xếp mà không cần quan tâm đến key. Trong trường hợp đó, bạn có thể sử dụng `.values()` như sau:

```Python
>>> for value in sorted(incomes.values()):
...     print(value)
...
3500.0
5000.0
5600.0
```

`sorted(incomes.values())` trả về các giá trị của dict theo thứ tự mong muốn. Các key không thể bị truy cập nếu bạn sử dụng `incomes.values()` nhưng thi thoảng bạn thực sự không cần tới các key mà chỉ cần các value và đây là cách nhanh nhất để truy cập chúng.

#### Reversed

Nếu bạn cần đảo ngược thứ tự dict, bạn có thể thêm tham biến `reverse=True` cho hàm `sorted()`. Tham biến `reverse` chấp nhận giá trị boolean. Nếu nó được set là `True` thì các phần tử sẽ được đảo ngược:

```Python
>>> incomes = {'apple': 5600.00, 'orange': 3500.00, 'banana': 5000.00}
>>> for key in sorted(incomes, reverse=True):
...     print(key, '->', incomes[key])
...
orange -> 3500.0
banana -> 5000.0
apple -> 5600.0
```

Ở đây, bạn lặp qua các key của `incomes` theo thứ tự ngược bằng cách sử dụng `sorted(incomes, reverse=True)` trong header của vòng lặp `for`.

Cuối cùng, cần thiết phải ghi chú rằng `sorted` không hề thay đổi thứ tự của dict đầu vào. Điều thực sự xảy ra `sorted()` tạo ra một list khác với các phần tử được đã sắp xếp, vậy nên `incomes` vẫn giữ nguyên:

```Python
>>> incomes
{'apple': 5600.0, 'orange': 3500.0, 'banana': 5000.0}
```

### Iterating Destructively With `.popitem()`

Thi thoaarng bạn cần lặp một dict và lần lượt xóa các item của nó. Để thực hiện việc này, bạn có thể sử dụng `.popitem()`. Chú ý khi bạn gọi `popitem()` với dict rỗng, exception `KeyError` sẽ được raise lên:

```Python
# File: dict_popitem.py

a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}

while True:
    try:
        print(f'Dictionary length: {len(a_dict)}')
        item = a_dict.popitem()
        # Do something with item here...
        print(f'{item} removed')
    except KeyError:
        print('The dictionary has no item now...')
        break
```

Ở đây, bạn sử dụng vòng lặp `while` thay vì vòng lặp `for`. Lý do ở đây là việc lặp một dict và thêm, xóa các item của nó theo cách này thực sự không an toàn.

Ở trong vòng lặp `while`, bạn khai báo một khối `try ... except ...` để bắt lỗi `KeyError` raise lên bởi `.popitem()` khi `a_dict` trả về rỗng. Trong khối `try ... except ...`, bạn xử lý dict - xóa một item sau mỗi bước lặp. Biến `item` tham chiếu tới các item và cho phép bạn thao tác với chúng.

Nếu bạn chạy script trên từ command line, bạn sẽ thu được kết quả sau:

```Shell
$ python3 dict_popitem.py
Dictionary length: 3
('pet', 'dog') removed
Dictionary length: 2
('fruit', 'apple') removed
Dictionary length: 1
('color', 'blue') removed
Dictionary length: 0
The dictionary has no item now...
```

Ở đây, `.popitem()` lần lượt xóa các item của `a_dict`. Vòng lặp kết thúc khi `a_dict` rỗng và `.popitem()` raise lên exception `KeyError`.

### Using Some of Python’s Built-In Functions

Python cung cấp các hàm có sẵn hữu ích khi bạn làm việc với các collection giống như dict. Những hàm này giống như kiểu một iteration tool cung cấp cho bạn một cách khác để lặp qua một dict. Hãy cùng điểm qua một số hàm đó.

#### `map()`

`map()` trong Python được khai báo là `map(function, iterable, ...)` và trả về một iterator gọi `function` với mỗi phần tử của `iterable`, thu được kết quả ngay lập tức. Vậy nên `map()` có thể được xem như một iteration tool mà bạn có thể dùng để lặp một dict.

Giả sử bạn có một dict chứa giá của một số sản phẩm và bạn cần áp dụng discount (chiết khấu) với chúng. Trong trường hợp này, bạn cần định nghĩa một hàm quản lý discount và sau đó sử dụng chúng làm tham biến đầu tiên của `map()`. Tham biến thứ hai là `prices.items()`:

```Python
>>> prices = {'apple': 0.40, 'orange': 0.35, 'banana': 0.25}
>>> def discount(current_price):
...     return (current_price[0], round(current_price[1] * 0.95, 2))
...
>>> new_prices = dict(map(discount, prices.items()))
>>> new_prices
{'apple': 0.38, 'orange': 0.33, 'banana': 0.24}
```

Ở đây, `map()` lặp qua các item của dict (`prices.items()`) để áp dụng discount 5% với mỗi loại hoa quả sử dụng `discount()`. Trong trường hợp này, bạn cần sử dụng `dict()` để tạo dict `new_prices` từ iterator trả về bởi `map()`.

Chú ý rằng `discount()` trả về một `tuple` dạng `(key, value)` trong đó `current_price[0]` biểu diễn key và `round(curent_price[1] * 0.95, 2)` là value mới.

#### `filter()`

`filter()` là một hàm có sẵn mà bạn có thể sử dụng để lặp một dict và lọc ra một số phần tử. Hàm này được khai báo là `filter(function, iterable)` và trả về một iterator từ các phần tử của `iterable` mà hàm `function` trả về `True`.

Giả sử bạn muốn biết các sản phẩm với giá dưới `0.40`, khi đó bạn cần định nghĩa một hàm xác định xem giá có thỏa mãn điều kiện và truyền nó như là tham biến đầu tiên của `filter()`. Tham biến thứ hai có thể là `prices.keys()`:

```Python
>>> prices = {'apple': 0.40, 'orange': 0.35, 'banana': 0.25}
>>> def has_low_price(price):
...     return prices[price] < 0.4
...
>>> low_price = list(filter(has_low_price, prices.keys()))
>>> low_price
['orange', 'banana']
```

Ở đây, bạn lặp qua các key của `prices` với `filter()`. Sau đó `filter()` áp dụng `has_low_price()` với mỗi key của `prices`. Cuối cùng, bạn cần sử dụng `list()` để tạo ra list các sản phẩm với giá thấp, bởi vì `filter()` trả về một iterator, và bạn thực sự cần một object `list`.

### Using `collections.ChainMap`

`collections` là một module hữu ích từ thư viện Python chuẩn cung cấp các kiểu dữ liệu chứa (container) chuyên biệt. Một trong những kiểu dữ liệu này là `ChainMap`, một class giống dict dùng để tạo một view các mapping. Với `ChainMap`, bạn có thể nhóm các dict lại với nhau để tao ra một view đơn, có thể update được.

Bây giờ, giả sử bạn có hai (hoặc nhiều hơn) dict và bạn cần lặp qua chúng như là một. Để đạt được điều này, bạn có thể tạo ra một `ChainMap` và khởi tạo nó với các dict của bạn:

```Python
>>> from collections import ChainMap
>>> fruit_prices = {'apple': 0.40, 'orange': 0.35}
>>> vegetable_prices = {'pepper': 0.20, 'onion': 0.55}
>>> chained_dict = ChainMap(fruit_prices, vegetable_prices)
>>> chained_dict  # A ChainMap object
ChainMap({'apple': 0.4, 'orange': 0.35}, {'pepper': 0.2, 'onion': 0.55})
>>> for key in chained_dict:
...     print(key, '->', chained_dict[key])
...
pepper -> 0.2
orange -> 0.35
onion -> 0.55
apple -> 0.4
```

Sau khi import `ChainMap` từ `collections`, bạn cần tạo ra một object `ChainMap` với các dict cần nối và sau đó bạn có thể tự do lặp qua object trả về như khi làm việc với dict thông thường.

Các object `ChainMap` cũng được implement phương thức `.keys()`, `.values()` và `.items()` như dict chuẩn và bạn có thể sử dụng những phương thức này để lặp qua object tạo ra bởi `ChainMap`:

```Python
>>> for key, value in chained_dict.items():
...     print(key, '->', value)
...
apple -> 0.4
pepper -> 0.2
orange -> 0.35
onion -> 0.55
```

Trong trường hợp này, bạn đã gọi `.items()` với object `ChainMap`. Object `ChainMap` hoạt động như là một dict thông thường và `.items()` trả về một object dict view mà chúng ta có thể lặp như bình thường.

### Using `itertools`

`itertools` là một module cung cấp một số tool hữu dụng để thực hiện các công việc với vòng lặp. Hãy cùng xem cách bạn có thể sử dụng một vài trong số chúng để lặp một dict trong Python.

#### Cyclic Iteration With `cycle()`

Giả sử bạn muốn lặp một dict, bạn cần lặp nó nhiều lần trong một vòng lặp đơn. Để hoàn thành công việc này, bạn có thể sử dụng `itertools.cycle(iterable)`:

```Python
>>> from itertools import cycle
>>> prices = {'apple': 0.40, 'orange': 0.35, 'banana': 0.25}
>>> times = 3  # Define how many times you need to iterate through prices
>>> total_items = times * len(prices)
>>> for item in cycle(prices.items()):
...     if not total_items:
...         break
...     total_items -= 1
...     print(item)
...
('apple', 0.4)
('orange', 0.35)
('banana', 0.25)
('apple', 0.4)
('orange', 0.35)
('banana', 0.25)
('apple', 0.4)
('orange', 0.35)
('banana', 0.25)
```

Đoạn code trên cho phép bạn lặp qua `prices` 3 lần. Bạn có thể kéo dài chu kỳ này đến bao lâu cũng được. Điều kiện `if` sẽ kết thúc chu trình khi `total_items` trở về 0.

#### Chained Iteration With `chain()`

`itertools` cũng cung cấp `chain(*iterables)` - method nhận các `iterables` như các tham trị và tạo ra một iterator trả về các phần tử từ iterable đầu tiên cho đến khi không còn phần tử nào nữa rồi lặp qua iterable tiếp theo, v.v.

Method này cho phép bạn lặp qua một chuỗi các dict giống như bạn đã làm với `collections.ChainMap`:

```Python
>>> from itertools import chain
>>> fruit_prices = {'apple': 0.40, 'orange': 0.35, 'banana': 0.25}
>>> vegetable_prices = {'pepper': 0.20, 'onion': 0.55, 'tomato': 0.42}
>>> for item in chain(fruit_prices.items(), vegetable_prices.items()):
...     print(item)
...
('apple', 0.4)
('orange', 0.35)
('banana', 0.25)
('pepper', 0.2)
('onion', 0.55)
('tomato', 0.42)
```

Ở đoạn code bên trên, `chain()` trả về một iterable tập hợp các item từ `fruit_prices` và `vegetable_prices`.

Bạn cũng có thể sử dụng `.keys()` hay `.values()` tùy vào nhu cầu nhưng với điều kiện là phải đồng nhất: tức là nếu bạn sử dụng `.keys()` cho một tham trị thì bạn cũng cần sử dụng `.keys()` cho các tham trị còn lại.

### Using the Dictionary Unpacking Operator (**)

Python 3.5 mang đến một tính năng mới và thú vị. [PEP 448 - Additional Unpacking Generalizations](https://www.python.org/dev/peps/pep-0448) có thể khiến bạn dễ thở hơn khi nó xuất hiện để giúp đỡ bạn trong việc lặp nhiều dict. Hãy xem tính năng này hoạt động như thế nào với một ví dụ ngắn:

Giả sử bạn có hai hay nhiều dict, bạn cần lặp chúng cùng nhau mà không sử dụng `collections.ChainMap` hay `itertools.chain()` như trong các phần trước. Trong trường hợp này, bạn có thể sử dụng toán tử unpack dict (dictionary unpacking operator `**` - DUO) để merge hai dict thành một và lặp:

```Python
>>> fruit_prices = {'apple': 0.40, 'orange': 0.35}
>>> vegetable_prices = {'pepper': 0.20, 'onion': 0.55}
>>> # How to use the unpacking operator **
>>> {**vegetable_prices, **fruit_prices}
{'pepper': 0.2, 'onion': 0.55, 'apple': 0.4, 'orange': 0.35}
>>> # You can use this feature to iterate through multiple dictionaries
>>> for k, v in {**vegetable_prices, **fruit_prices}.items():
...     print(k, '->', v)
...
pepper -> 0.2
onion -> 0.55
apple -> 0.4
orange -> 0.35
```

DUO thực sự là tính năng tuyệt vời trong Python. Nó cho phép bạn merge nhiều dict thành một dict mới (trong ví dụ bên trên là `vegetable_prices` và `fruit_prices`). Một khi bạn đã merge các dict với DUO, bạn có thể lặp dict mới như bình thường:

Chú ý rằng nếu các dict bạn định merge có các key trùng nhau, các giá trị thuộc dict sau cùng trong list sẽ được lựa chọn:

```Python
>>> vegetable_prices = {'pepper': 0.20, 'onion': 0.55}
>>> fruit_prices = {'apple': 0.40, 'orange': 0.35, 'pepper': .25}
>>> {**vegetable_prices, **fruit_prices}
{'pepper': 0.25, 'onion': 0.55, 'apple': 0.4, 'orange': 0.35}
```

Key `pepper` xuất hiện trong cả hai dict. Sau khi bạn merge chúng, giá trị `0.25` (từ dict `fruit_prices`) sẽ được lựa chọn cho key `pepper` bởi `fruit_prices` đứng ở vị trí "phải nhất" (right most).

### Conclusion

Bây giờ thì bạn đã có hiểu biết cơ bản về cách lặp qua một dict trong Python cũng như là một kỹ thuật và chiến lược nâng cao!

Bạn đã học:
- Dict là gì cũng như là một vài feature chính và chi tiết về implement của nó
- Các cách cơ bản để lặp qua một dict
- Các công việc mà bạn có thể hoàn thành thông qua việc lặp dict
- Cách sử dụng một số kỹ thuật và chiến lược tinh vi để lặp dict

Nguồn: https://realpython.com/iterate-through-dictionary-python/