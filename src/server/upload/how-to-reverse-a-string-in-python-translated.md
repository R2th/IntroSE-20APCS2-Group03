Một cái nhìn tổng quan về ba cách chính để đảo ngược một string trong Python, bao gồm cả các vấn đề về hiệu năng.

![](https://images.viblo.asia/24c81103-0f9c-424e-bfa1-2e94cb123c1b.jpg)

Đâu là cách tốt nhất để đảo ngược một string trong Python? Dù trong thực tế việc đảo ngược một string chẳng được sử dụng thường xuyên, nó vẫn luôn là một câu hỏi phổ biến trong các buổi phỏng vấn:

```Python
# You have this:
'TURBO'

# And you want that:
'OBRUT'
```

Một biến thể của câu hỏi này chính là viết một hàm check xem một string có là *palindrome* hay không. Tức là dù đọc xuôi hay đọc ngược, nó cùng là một string:

```Python
def is_palindrome(string):
    reversed_string = # ???
    return string == reversed_string

>>> is_palindrome('TACOCAT')
True
>>> is_palindrome('TURBO')
False
```

Rõ ràng chúng ta cần tìm ra cách để đảo ngược một string để implement hàm `is_palindrome`... Vậy bằng cách nào?

Đối tượng `str` trong Python không có sẵn phương thức `.reverse()` như bạn có thể mong chờ nếu bạn đến với Python từ một ngôn ngữ khác như Java hoặc C# - tức là cách tiếp cận sau sẽ thất bại:

```Python
>>> 'TURBO'.reverse()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'str' object has no attribute 'reverse'
```

Trong tutorial này, bạn sẽ học ba cách chính để đảo ngược string trong Python:

### Option 1: Reversing a Python String With the `[::-1]` Slicing Trick

String tuân theo quy chuẩn sequence (chuỗi) trong Python. Và tất cả các sequence hỗ trợ một feature thú vị được gọi là *slicing*. Bạn có thể xem slicing như là phần mở rộng của cú pháp chỉ mục ngoặc vuông (square-brackets indexing syntax).

Nó bao gồm một trường hợp đặc biệt mà ở đó slicing một sequence với `[::-1]` sẽ tạo ra một bản copy đảo ngược (reversed copy). Bởi vì string là sequence, đây là một cách nhanh và dễ để thu được kết quả chúng ta mong muốn:

```Python
>>> 'TURBO'[::-1]
'OBRUT'
```

Tất nhiên, bạn có thể wrap biểu thức slicing này vào trong một hàm để làm cho mọi thứ trở nên rõ ràng hơn:

```Python
def reverse_string1(s):
    """Return a reversed copy of `s`"""
    return s[::-1]

>>> reverse_string1('TURBO')
'OBRUT'
```

Bạn thích giải pháp này đến nhường nào?

Nó ngắn và ngọt ngào - nhưng, theo suy nghĩ của tôi, điểm trừ lớn nhất của việc đảo ngược một string với slicing chính là nó sử dụng một feature cao cấp của Python mà một số nhà phát triển gọi là "arcane".

Tôi không trách họ - list slicing có thể gây khó hiểu khi bạn bắt gặp cú pháp kỳ quái của nó những lần đầu tiên.

Khi tôi đọc code Python có sử dụng slicing, tôi thường phải giảm tốc độ và tập trung dịch câu lệnh để chắc chắn rằng tôi hiểu những gì đang diễn ra.

Phàn nàn lớn nhất ở đây chính là cú pháp slicing `[::-1]` không nói rõ ràng cho ta thấy rằng nó sẽ tạo ra một bản copy đảo ngược của string ban đầu.

Vì lý do này, tôi có cảm giác việc sử dụng feature slicing để nghịch đảo một string là một giải pháp chấp nhận được nhưng nó có thể là trở ngại với người không thạo.

### Option 2: Reversing a Python String Using `reversed()` and `str.join()`

Đảo ngược string sử dụng *reverse iteration* với hàm có sẵn `reversed()` là một lựa chọn khác. Khi nhận được một reverse iteration, bạn có thể lặp các phần tử trong string theo thứ tự đảo ngược:

```Python
>>> for elem in reversed('TURBO'):
...     print(elem)
O
B
R
U
T
```

Sử dụng `reversed()` không thay đổi string ban đầu. Điều xảy ra là bạn nhận được một "view" vào string đó mà bạn có thể sử dụng để thấy các phần tử theo thứ tự đảo ngược.

Đây là một kỹ thuật mạnh mẽ tận dụng sức mạnh của quy chuẩn iterator ([iterator protocol](https://dbader.org/blog/python-iterators)).

Cho đến bây giờ, tất cả những gì bạn thấy là cách lặp các ký tự của một string theo thứ tự đảo ngược. Nhưng làm thế nào bạn có thể sử dụng kỹ thuật này để tạo ra một bản copy đảo ngược của một string với hàm `reversed()`?

Đây:

```Python
>>> ''.join(reversed('TURBO'))
'OBRUT'
```

Đoạn code này sử dụng phương thức `.join()` để gộp tất cả các ký tự thu được từ reversed iteration thành một string mới. Khá ngắn gọn?

Tất nhiên, bạn có thể một lần nữa tách đoạn code này thành một hàm cho dễ đọc:

```Python
def reverse_string2(s):
    """Return a reversed copy of `s`"""
    return "".join(reversed(s))

>>> reverse_string2('TURBO')
'OBRUT'
```

Tôi thực sự thích cách tiếp cận này.

Mọi thứ trở nên rõ ràng hơn, và kể cả người mới tiếp cận Python cũng có thể hiểu một cách trực quan những gì đang diễn ra.

Một cách tiếp cận nữa bạn nên biết:

### Option 3: The “Classic” In-Place String Reversal Algorithm Ported to Python

Đây là giải thuật đảo ngược string cổ điển trong các giáo trình. Bởi vì string Python là immutable (không thể thay đổi), đầu tiên bạn cần convert string đầu vào thành một mutable list các ký tự. Sau đó bạn có thể thực hiện việc hoán đổi các ký tự tại chỗ (in-place):

```Python
def reverse_string3(s):
    """Return a reversed copy of `s`"""
    chars = list(s)
    for i in range(len(s) // 2):
        tmp = chars[i]
        chars[i] = chars[len(s) - i - 1]
        chars[len(s) - i - 1] = tmp
    return ''.join(chars)

>>> reverse_string3('TURBO')
'OBRUT'
```

Như bạn có thể thấy, giải pháp này hoàn toàn unpythonic. Nó không tận dụng được sức mạnh của Python.

Và hơn thế nữa, nó còn là giải pháp tồi nhất về mặt hiệu năng. Bạn sẽ thấy rõ điều này trong phần tiếp theo.

### Performance Comparison

Sau khi implement các cách đảo ngược string trong tutorial này, tôi lại hiếu kỳ về hiệu năng của chúng.

```Python
>>> import timeit
>>> s = 'abcdefghijklmnopqrstuvwxyz' * 10

>>> timeit.repeat(lambda: reverse_string1(s))
[0.6848115339962533, 0.7366074129968183, 0.7358982900041156]

>>> timeit.repeat(lambda: reverse_string2(s))
[5.514941683999496, 5.339547180992668, 5.319950777004124]

>>> timeit.repeat(lambda: reverse_string3(s))
[48.74324739299482, 48.637329410004895, 49.223478018000606]
```

Well, thật thú vị... Đây là kết quả thu được ở dạng bảng:

![](https://images.viblo.asia/996bb413-0a89-4cfd-aa43-4c48eeb7fec9.png)

### Summary: Reversing Strings in Python

Nguồn: https://dbader.org/blog/python-reverse-string