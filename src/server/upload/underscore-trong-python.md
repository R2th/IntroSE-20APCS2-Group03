Khi lập trình với Python, bạn thi thoảng sẽ gặp case sử dụng Single Underscore (_) và Double Underscores (__).

Vậy điều mà newbie sẽ gặp phải là sử dụng underscore như thế nào?

Bài viết này chia sẽ về cách sử dụng underscore sao cho hợp lý dựa vào:

- Python syntax
- Code convention

## Using in interpreters

Trong Cpython và một vài Python interpreters khác, last expression value sẽ được store vào một special variable được gọi là '_'.

Exp:

```py
$ python
Python 3.6.5 (default, Jan  9 2019, 14:12:28)
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 1
1
>>> _ + 2
3
>>> _ + 3
6
```

## Ignoring the values

Giả sử ta nhận được một value là một tuple.
Exmp:

```py
>>> tuple_exm = (10, range(1, 10), "Hello")
```

Để lấy được `range(1, 10)` sẽ có 2 cách:

C1: Đơn giản là lấy dựa vào index.

```py
>>> print(tuple_exm[1])
range(1, 10)
```

Hoặc: Nếu value nhận được mình chỉ muốn xử lý là `range(1, 10)` thì ta sẽ có cách khác:

```py
>>> _, range_exm, _ = tuple_exm
>>> print(tuple_exm[1])
range(1, 10)
```

Một ví dụ khác:

```py
for _ in range(1, 10):
    do_something()
```

Chốt lại, `underscore` được sử dụng để ignoring specific values nếu specific values đó không được sử dụng.

## Declaring variable and function

### Code convention

Naming Styles trong PEP8 sử dụng rất nhiều `underscore`. Cụ thể là:

- Variable
- Method
- Constant
- Module

Trích dẫn từ PEP8: https://www.python.org/dev/peps/pep-0008/

> The following naming styles are commonly distinguished:
> 
> ...
> - lower_case_with_underscores
>
> ...
> - UPPER_CASE_WITH_UNDERSCORES
>

Tất nhiêu nếu bạn không tuân thủ code theo PEP8 thì cũng chả sao :rofl:. Code bạn vẫn sẽ chạy bình thường.

### Non-public

Nếu như các bạn đã học Java hay C++ chắc hẳn sẽ biết về access medifiers: `private`, `public` hay `protected`. `Nhưng` Python không có điều đó.

Thay vào đó, những methods và instance variables non-public sẽ cần sử dụng `one leading underscore`.

Giả sử ta có 1 class parent:

```py
>>> class Parent(object):
...     def public(self):
...         pass
...     def _protected(self):
...         pass
...     def __private(self):
...         pass
...
```

Tiếp tục tạo 1 class child  extend class parent bên trên và tạo một method method_one:

```py
>>> class Child(Parent):
        def method_one(self):
            pass
```

Với method `public` và `_protected` ở class parent ta dễ dàng gọi nó trong `method_one` bằng cách:

```py
>>> def method_one(self):
        self.public()
        self._protected()
>>> x = Child()
>>> x.method_one() # Không có lỗi
```

Nhưng sẽ lỗi nếu làm tương tự với method `__private`.

```py
>>> def method_one(self):
        self.__private()
>>> x = Child()
>>> x.method_one()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 3, in method_one
AttributeError: 'Child' object has no attribute '_Child__private'
```

Đây là câu thần chú mà bạn cần lúc này:

> _ClassName__method_name

App dụng vào ví dụ của trên của mình:

```py
>>> def method_one(self):
        self._Parent__private()
>>> x = Child()
>>> x.method_one()
```

Vi diệu chưa :laughing::laughing::laughing::laughing:

### Avoiding conflict with Python keywords or built-ins.

Cái này có thể hiểu đơn giản là giả sử bạn muốn sử dụng từ `list`. Nhưng từ này phạm húy nên bạn sẽ cần chỉnh là một xíu là `list_` là ok

### Declaring special methods

Bạn sẽ thường xuyên gặp các method kiểu như:

```py
>>> def __init__(self):
        do_something()
```

hay

```py
>>> def __next__(self):
        do_something()
```
Thường những method này sẽ có những features đặc biệt.

## i18n/l10n function

Đây thuộc về convention. Ở đây, underscore bind i18n/l10n to underscore variable.

Thông tin nhiều hơn các bạn có thể tham khảo ở đây:


https://docs.python.org/3/library/gettext.html

## Separate digits

Đây là tính năng được added vào từ bản Python 3.6.

```py
>>> dec_base = 1_000_000
>>> print(dec_base)
1000000
```

## Conclusion

Nếu bạn đã đọc hết tới đây, bạn sẽ thấy có vài điểm mấu chốt. Khi sử dụng `underscore` thì có những thứ thuộc về syntax phải bắt buộc phải làm theo. Có những thứ thuộc về convention thì tùy bạn =)).

Source: https://hackernoon.com/understanding-the-underscore-of-python-309d1a029edc