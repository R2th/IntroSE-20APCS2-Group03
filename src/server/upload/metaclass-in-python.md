Trong những năm trở lại đây, khái niệm meta-programming đã không còn quá xa lạ với giới lập trình viên. Meta-programming có thể hiểu đơn giản là program tạo ra program. Trong bài viết này, chúng ta sẽ làm quen với feature trong Python, có chức năng tương tự như vậy. Hôm nay chúng ta sẽ cùng nghiên cứu qua `metaclass` trong Python, một cách ngắn gọn nhất, **metaclass** là **class** tạo ra **class**.
# Type and Class

```py
>>> class Foo:
...   pass
... 
>>> x = Foo()
  
>>> type(x)
<class '__main__.Foo'>
  
>>> type(Foo)
<class 'type'>
 ```

*type* của `x` là `Foo`, nhưng *type* của `Foo` là `type`. Một cách tổng quát, type của tất cả các class đều là `type`. type của các built-in classes cũng là `type`:

```py
>>> for t in int, float, dict, list, tuple:
...     print(type(t))
...
<class 'type'>
<class 'type'>
<class 'type'>
<class 'type'>
<class 'type'>
```

Và cuối cùng, type của `type` cũng là `type`:
```py
>>> type(type)
<class 'type'>
```

`type` là một **metaclass**, và tất cả các classes là instances. Giống như một object thông thường là instance của một class, tất cả class trong Python, đều là instance của `type` metaclass.

Như ví dụ dưới đây:
* x là một instance của class Foo
* Foo là một instance của `type` **metaclass**
* `type` cũng đồng thời là instance của `type` metaclass, và nó cũng là instane của chính nó.

![](https://images.viblo.asia/7180f96b-50aa-428d-a1bc-207f7305ae11.jpg)

# Defining a Class Dynamically
built-in [type()](https://docs.python.org/3/library/functions.html#type) function, khi được truyền vào 1 tham số, sẽ trả về `type` của object. Kết quả trả về cũng chính là [instance.__class__](https://docs.python.org/3/library/stdtypes.html#instance.__class__)

```py
>>> type(3)
<class 'int'>

>>> type(['foo', 'bar', 'baz'])
<class 'list'>

>>> t = (1, 2, 3, 4, 5)
>>> type(t)
<class 'tuple'>

>>> class Foo:
...     pass
...
>>> type(Foo())
<class '__main__.Foo'>
```



Khi được truyền 3 tham số - type(name, base, dct):

* name sẽ chỉ định class name. Nó sẽ trở thành `__name__` attribute của class.
 
* bases chỉ định một tuple của các base classes để thừa kế. Nó sẽ trở thành `__bases__` attribute của class.

* dct chỉ định namespace dictionary sẽ chứa các definition của class body. Nó sẽ trở thành `__dict__` attribute của class.

Khi `type` được gọi với 3 tham số, nó sẽ tạo ra một instance của `type` metaclass, cũng giống như khi ta dùng từ khóa `class` để tạo class.  Nói một cách khác, nó **dynamically** tạo class.

Trong các ví dụ tiếp theo, đoạn code ở trên sẽ **dynamically** định nghĩa class với `type()`, đoạn code ở dưới sẽ định nghĩa class theo cách thông thường,  sử dụng `class` keyword. Với mỗi ví dụ, cả hai đoạn code sẽ cho ra kết quả như nhau:

## Example 1

Trong ví dụ đầu tiên này, `<bases>` và `<dct>` được truyền vào `type()` là rỗng. Sẽ không có kế thừa từ lớp cha, và không có giá trị khởi tạo mặc định nào. Đây sẽ là một định nghĩa class đơn giản nhất có thể:

```py
>>> Foo = type('Foo', (), {})

>>> x = Foo()
>>> x
<__main__.Foo object at 0x04CFAD50>
```

```py
>>> class Foo:
...     pass
...
>>> x = Foo()
>>> x
<__main__.Foo object at 0x0370AD50>
```

## Example 2
Ở ví dụ 2 này, `<bases>` là một type chứa duy nhất một phần từ `Foo`, chỉ định lớp cha mà `Bar` sẽ kế thừa. Và một attribute, `attr`, được mặc định định vào namespace dictionary:

```py
>>> Bar = type('Bar', (Foo,), dict(attr=100))

>>> x = Bar()
>>> x.attr
100
>>> x.__class__
<class '__main__.Bar'>
>>> x.__class__.__bases__
(<class '__main__.Foo'>,)
```

```py
>>> class Bar(Foo):
...     attr = 100
...

>>> x = Bar()
>>> x.attr
100
>>> x.__class__
<class '__main__.Bar'>
>>> x.__class__.__bases__
(<class '__main__.Foo'>,)
```

## Example 3
Lần này, `<bases>` sẽ rỗng. Hai object sẽ được đặt vào namespace dictionary thông qua tham số `<dct>`. Tham số thứ nhất sẽ là attribute có tên là `attr` và tham số thứ hai sẽ là function tên là `attr_val`, nó sẽ trở thành method của class:

```py
>>> Foo = type(
...     'Foo',
...     (),
...     {
...         'attr': 100,
...         'attr_val': lambda x : x.attr
...     }
... )

>>> x = Foo()
>>> x.attr
100
>>> x.attr_val()
100
```

```py
>>> class Foo:
...     attr = 100
...     def attr_val(self):
...         return self.attr
...

>>> x = Foo()
>>> x.attr
100
>>> x.attr_val()
100
```

## Example 4
Sữ chỉ có những function đơn giản được định nghĩa với lambda trong python. Trong ví dụ này, một function tương đối phức tạp sẽ được định nghĩa riêng, rồi gán cho biến attr_val trong namespace dictionary:

```py
>>> def f(obj):
...     print('attr =', obj.attr)
...
>>> class Foo:
...     attr = 100
...     attr_val = f
...

>>> x = Foo()
>>> x.attr
100
>>> x.attr_val()
attr = 100
```

# Custom Metaclasses
Chúng ta cùng xem lại ví dụ này:

```py
>>> class Foo:
...     pass
...
>>> f = Foo()
```

Biểu thức `Foo()` sẽ tạo một instance mới của class Foo. Khi trình thông dịch gặp biểu thức `Foo()`, những xử lý sau sẽ xảy ra:

* Foo là instance của class `type`, cho nên, phương thức `__call__()` ở class `type` sẽ được gọi. 
* Function `__call__()` sẽ thực thi lần lượt:
    * `__new__()`
    * `__init__()`
  
Nếu `Foo` không định nghĩa `__new__()` và `__init__()`, chúng sẽ được thừa kế từ lớp cha của `Foo`. Trường hợp tại `Foo` có định nghĩa, thì chúng sẽ override các thuộc tính này ở lớp cha, cho phép chúng ta tùy biến behavior khi khởi tạo Foo instance.

Trong ví dụ sau đây, một custom method gọi là `new()` sẽ được định nghĩa và gán cho `__new__()` method của Foo.

```py
>>> def new(cls):
...     x = object.__new__(cls)
...     x.attr = 100
...     return x
...
>>> class Foo:
...     pass
..
>>> Foo.__new__ = new

>>> f = Foo()
>>> f.attr
100

>>> g = Foo()
>>> g.attr
100
```

Như vậy, mỗi khi một instance của class Foo tạo ra, nó sẽ mặc định có một thuộc tính `attr`, giá trị là 100. (thông thường để thực hiện behavior này, chúng ta sẽ đặt nó vào `__init__()`)

Như chúng ta đã biết thì trong Python, mọi thứ đều là objects, và classes cũng là objects (classes là instance của metaclass type). Trường hợp ta muốn can thiệp và chỉnh sửa quá trình tạo ra một class. Ta có thể làm như sau: 
 
 ```py
 >>> class Meta(type):
...     def __new__(cls, name, bases, dct):
...         x = super().__new__(cls, name, bases, dct)
...         x.attr = 100
...         return x
...
```
Dòng đầu tiên, `class Meta(type):` có nghĩa class Meta sẽ kế thừa từ **metaclass** `type`. Điều đó cũng có nghĩa, Meta lúc này cũng là một metaclass. (Metaclass là class được dùng để tạo ra class).

Chú ý ở phương thức `__new__()` được định nghĩa trong lớp Meta. Khi được sử dụng như vậy, nó sẽ override phương thức `__new__()` này ở lớp `type`.  Phương thức này sẽ làm những việc sau đây:
* Delegate thông qua `super()` tới phương thức `__new__()` của lớp metaclass cha (type) để nó tạo ra class.
* Gán một thuộc tính *attr* cho class, với giá trị 100
* Trả về lớp vừa được tạo ra.

Nào, bây giờ chúng ta hãy cùng nhau sử dụng **metaclass** vừa định nghĩa:

```py
>>> class Foo(metaclass=Meta):
...     pass
...
>>> Foo.attr
100
```

Voila! class `Foo` tự động có thuộc tính `attr` từ `Meta` metaclass.

Cúng tương tự như việc, các class functions sẽ là template để tạo ra các objects, các metaclass functions sẽ là template để tạo ra các classes. Metaclass thỉnh thoảng còn được gọi là "class factories".

Hãy thử so sánh 2 ví dụ sau đây:

### Object Factory:

```py
>>> class Foo:
...     def __init__(self):
...         self.attr = 100
...

>>> x = Foo()
>>> x.attr
100

>>> y = Foo()
>>> y.attr
100

>>> z = Foo()
>>> z.attr
100
```

### Class Factory

```py
>>> class Meta(type):
...     def __init__(
...         cls, name, bases, dct
...     ):
...         cls.attr = 100
...
>>> class X(metaclass=Meta):
...     pass
...
>>> X.attr
100

>>> class Y(metaclass=Meta):
...     pass
...
>>> Y.attr
100

>>> class Z(metaclass=Meta):
...     pass
...
>>> Z.attr
100
```

# Is This Really Necessary?
Sau khi đã tìm hiểu qua về **metaclass**, cũng như cách tạo một **custome metaclass**, thứ mà chúng ta quan tâm bây giờ là, tính năng này có thực sự cần thiết không ?

Metaclass, nó cũng đơn giản như là ví dụ về class factory ở trên vậy, nó chính là bản chất của cách mà metaclass hoạt động. Tất cả những gì nó làm là customize quá trình tạo ra class.

Nếu chỉ đơn thuần là thêm một custom attribute *attr* vào cho cái class mới, thì có nhiều kỹ thuật khác cũng cho ra behavior tương tự.

### Simple Inheritance
```py
>>> class Base:
...     attr = 100
...

>>> class X(Base):
...     pass
...

>>> class Y(Base):
...     pass
...

>>> class Z(Base):
...     pass
...

>>> X.attr
100
>>> Y.attr
100
>>> Z.attr
100
```
### Class Decorator
```py
>>> def decorator(cls):
...     class NewClass(cls):
...         attr = 100
...     return NewClass
...
>>> @decorator
... class X:
...     pass
...
>>> @decorator
... class Y:
...     pass
...
>>> @decorator
... class Z:
...     pass
...

>>> X.attr
100
>>> Y.attr
100
>>> Z.attr
100
```

Vậy thì, quay lại câu hỏi của chúng ta, **metaclass** có thực sự cần thiết ? Đây thực sự là một câu hỏi mở và không có câu trả lời chính xác, nên ta có thể tạm kết ở đây là một câu nói của một người khá nổi tiếng trong cộng đồng Python, Tim Peters, tác giả của [Zen of Python](https://www.python.org/dev/peps/pep-0020)

> “Metaclasses are deeper magic than 99% of users should ever worry about. If you wonder whether you need them, you don’t (the people who actually need them know with certainty that they need them, and don’t need an explanation about why).”
> 
> — Tim Peters

# Reference
1. https://realpython.com/python-metaclasses/