![](https://images.viblo.asia/35af4025-658b-45f4-8a90-5753567f9489.jpg)
Photo by <a href="https://unsplash.com/@max_duz?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Max Duzij</a> on <a href="https://unsplash.com/s/photos/code?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>

Từ khóa "code introspection" này mình vô tình tìm thấy trong một bài viết trên Medium. Sau một hồi tìm hiểu, mình mới biết "code introspection" chính là việc khai thác thông tin về class, method, module ...  ngay tại thời điểm runtime.  Python cung cấp cho chúng ta một số built-in methods để hỗ trợ cho việc này, nhờ đó chúng ta có thể hiểu chương trình hơn, nắm rõ các objects mà mình đang làm việc hơn (nó là gì, nó có thể làm được những gì, ...) qua đó có thể xử lý logic một cách đúng đắn hoặc debugging một cách hiệu quả hơn.  Có lẽ đó cũng chính là lý do xuất hiện từ "introspection" (sự tự suy xét nội tâm ?).

Trong quá trình làm việc, mình cũng đã thử sử dụng một số phương thức trên và thấy rất hữu dụng. Chính vì thế, mình muốn tổng hợp lại một lần nữa để khiến bản thân nhớ lâu hơn, và hi vọng có thể chia sẻ cho bạn nào muốn tìm hiểu về Python, thêm một vài kiến thức mới thú vị. Nếu mọi người có gì góp ý thì bảo với mình nhé!  

Sau đây mình sẽ giới thiệu một số hàm intropection phổ biến:

### type()

Để minh họa cho phương thức này, mình xin phép lấy lại ví dụ trong một bài Medium (link ở cuối bài):

> Làm thế nào để lưu trữ giá trị 1?

 Chúng ta có thể liệt kê những cách sau đây:

 

```python
import numpy as np
import pandas as pd

a = 1
b = 1.0
c = [1]
d = (1,)
e = np.int64(1)
f = pd.DataFrame([1])
g = '1'
h = 'one'
```

Có nhiều cách hơn bạn nghĩ đúng không? Bây giờ chúng ta sẽ kiểm tra type của các variables trên: 

```python
>>> print([type(x) for x in [a, b, c, d, e, f, g, h]])

... [<class 'int'>, <class 'float'>, <class 'list'>, <class 'tuple'>, <class 'numpy.int64'>, <class 'pandas.core.frame.DataFrame'>, <class 'str'>, , <class 'str'>]
```

Gần như mỗi biến đều là một *data type* khác nhau (trừ hai biến ở cuối). Cơ mà ***data type* có quan trọng không**? 

**Có.** Vì nó sẽ xác định các operations có thể sử dụng, và đảm bảo kết quả ra đúng như kỳ vọng. 

Tiếp tục ví dụ trên, khi thực hiện phép cộng (toán tử +) trên các data types khác nhau, chúng ta sẽ nhận được các output hoàn toàn khác nhau:

```python
def add(m, n):
	return m + n

>>> print(add(a, b))
... 2.0

>>> print(add(g, h))
... one1

>>> print(add(a, g))
... TypeError: unsupported operand type(s) for +: 'int' and 'str'  # ==> Opps!
```

Cùng là làm việc trên những biến "lưu giữ giá trị 1", nhưng ở phép toán đầu tiên thì ta đang cộng số học, phép toán thứ hai thì cộng chuỗi, còn phép toán cuối cùng thì lại gặp lỗi!

Cá nhân mình thường sử dụng phương thức `type()` trong quá trình debugging. Đối với mình, data types thực sự là **ác mộng,** vì mỗi thư viện, mỗi team làm việc, hay mỗi cá nhân đôi khi sẽ có những convention và cách tiếp cận vấn đề khác nhau.  Trong một project về xử lý ảnh ở team của mình, ma trận ảnh có thể gặp dưới dạng `np.uint8` hoặc `np.float32`; tọa độ điểm có thể gặp dưới dạng `Tuple` của hai số nguyên, `List` chứa hai số nguyên, hoặc `np.ndarray` chứa hai số nguyên; v.v ... Nếu không cẩn thận, chúng ta có thể gặp những lỗi ngoài ý muốn như ví dụ ở trên.   

Như vậy, việc kiểm tra data types và thống nhất một quy chuẩn chung khi làm việc rất quan trọng. Mình thường thực hiện bằng cách sử dụng **type hint** khi khai báo hàm và sử dụng `assert` kết hợp với `isinstance()` để validate inputs đầu vào trước khi thực hiện xử lí logic tiếp theo. Hàm ở trên có thể viết lại như sau:

```python
from typing import Union

def add_num(m: Union[int, float], n: Union[int, float]):
    assert isinstance(m, (int, float)), "m is not a type of int or float."
    assert isinstance(n, (int, float)), "n is not a type of int or float."
    return m + n
```

### isinstance()

Như đã thấy ở ví dụ trên, phương thức `isintance()` có tác dụng kiểm tra xem một *object* có phải là một thể hiện (*instance*) của *class* hay không. Nếu đúng, `isinstance()` sẽ trả về `True`, ngược lại trả về `False`.

Chúng ta có thể tham khảo thêm một ví dụ dưới đây:

```python
class Bird:
    def __init__(self, name):
        self.name = name

    def fly(self):
        print(f" I'm {self.name}. I'm flying!")

class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f" I'm {self.name}. I'm barking! Gau Gau!")

animal = Dog(name="Pluto")

if isinstance(animal, Bird):
    print("This is a bird.")
    animal.fly()
elif isinstance(animal, Dog):
    print("This is a lovely dog.")
    animal.bark()
else:
    print("I don't know who I am")

>>> This is a lovely dog.
... I'm Pluto. I'm barking! Gau Gau!
```

Nhờ vào việc xác định class của từng object mà ta đã có các actions phù hợp cho từng class cụ thể. Trong ví dụ trên, `animal` là một *thể hiện* của `Dog` nên nó sẽ thực hiện phương thức `bark()` thay vì `fly()`. Điều này giúp giảm thiểu rủi ro trong quá trình thực thi chương trình. 

### hasattr()

Phương thức này nhằm xác định xem *object* có tồn tại *attribute* nào đó hay không. 

Tiếp tục ví dụ ở trên, ta thử khiến chú chó Pluto bay như chim xem sao:

```python
animal.fly()

>>> Traceback (most recent call last):
... File "<input>", line 1, in <module>
... AttributeError: 'Dog' object has no attribute 'fly'
```

Như vậy, Pluto không hề có attribute `fly`. Tuy nhiên đâu có điều gì  là "chắc chắn mọi con chó đều không biết bay"? Giả sử chúng ta khai báo một chú chó ngoài hành tinh chẳng hạn:

```python
class AlienDog(Dog):
    """
    This class is inherited from Dog class.
    """
    def fly(self):
        print(f"I'm {self.name}. I'm a special dog. I'm flying!")

alien_animal = AlienDog(name="Woola")

```

Để tránh gặp lỗi `AttributeError` như ở trên, chúng ta có thể giải quyết bằng cách:

```python
if hasattr(animal, "fly"):
    animal.fly()

if hasattr(alien_animal, "fly"):
    alien_animal.fly()

>>> I'm Woola. I'm a special dog. I'm flying!
```

Vì `animal` không có attribute `fly()` nên điều kiện trở nên sai, phương thức `animal.fly()` sẽ không được thực hiện. Tuy nhiên, ở `alien_animal` lại tồn tại phương thức này nên điều kiện trở nên đúng, và chú chó này đã bay thật. 

*(Tiếc thay, Woola thực sự trong phim John Carter không biết bay.)*

### dir()

Phương thức này liệt kê tất cả các thuộc tính và phương thức của bất cứ *object* nào.

 

Có một sự thật là, tất cả mọi thứ trong Python hầu hết đều là object. Chúng ta có thể dễ dàng kiểm chứng với `isinstance()` :

```python
>>> isinstance(1, object)
True
>>> isinstance(list, object)
True
>>> isinstance(None, object)
True
>>> ...
```

(Chỉ riêng về object trong Python thôi mà mình đã thấy rất nhiều điều thú vị. Mình sẽ tổng hợp và chia sẻ cho mọi người trong những phần tiếp theo.)

*Object* sẽ có những thuộc tính và phương thức nhất định. `dir()` chính là hàm quyền lực liệt kê ra tất cả những phương thức và thuộc tính của *object* đó, ngay cả các thuộc tính mặc định. 

```python
dir(animal)  # animal is an instance of the Dog class as the previous example.

>>> ['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', 
'__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', 
'__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'bark', 'name']
```

Output này giúp chúng ta có cái nhìn tổng quát về *object* `animal` khi nãy hơn, xác định được `animal` có những thuộc tính gì và có thể thực thi được những phương thức gì. Ngoài phương thức `bark` và thuộc tính `name` ở cuối mảng, các phương thức mặc định còn lại được gọi là *magic methods* (mình sẽ bàn về vấn đề này ở bài khác). 

### id()

Phương thức này trả về định danh (duy nhất) của *object* ở vòng đời chương trình hiện tại, trong C có thể hiểu như là địa chỉ bộ nhớ mà biến đó tham chiếu tới.  Giá trị này sẽ thay đổi ở mỗi lần chạy chương trình. 

```python
>>> a = [1, 2]
>>> b = a 
>>> id(a)
140210586664328
>>> id(b)
140210586664328

```

Như kết quả ở trên, `a` và `b` đang cùng tham chiếu tới một vùng nhớ chung. Bây giờ ta thử khiến `b` trở thành một shallow copy của `a` xem sao:

```python
>>> b = a.copy()  # Create a shallow copy

>>> id(a)
140210586664328
>>> id(b)
140210586663880
```

Lúc này, hai biến `a` và `b` đã không còn chung một *id*, hay có thể hiểu là không còn trỏ tới cùng một vùng nhớ nữa. Chúng ta có thể dùng từ khóa `is` để kiểm tra:

```python
>>> a is b 
False

>>> a == b
True 
```

Lưu ý rằng khi sử dụng `==` vẫn trả về `True` vì đang lúc này đang so sánh về giá trị, không phải về *id*. 

### help()

Khi debug, chúng ta có thể dùng phương thức này để hiển thị documentation về một function, class, module hay biến nào đó. 

```python
help(AlienDog)

Help on class AlienDog in module __main__:
class AlienDog(Dog)
 |  This class is inherited from Dog class.
 |  
 |  Method resolution order:
 |      AlienDog
 |      Dog
 |      builtins.object
 |  
 |  Methods defined here:
 |  
 |  fly(self)
 |  
 |  ----------------------------------------------------------------------
 |  Methods inherited from Dog:
 |  
 |  __init__(self, name)
 |      Initialize self.  See help(type(self)) for accurate signature.
 |  
 |  bark(self)
 |  
 |  ----------------------------------------------------------------------
 |  Data descriptors inherited from Dog:
 |  
 |  __dict__
 |      dictionary for instance variables (if defined)
 |  
 |  __weakref__
 |      list of weak references to the object (if defined)

```

### Các phương thức khác

Ngoài ra còn có một số phương thức khác như: `repr()`, `getattr()`, `sys()` hoặc `issubclass()` để kiểm tra xem một *class* có là thừa kế của một *class* khác không, `callable()` dùng để kiểm tra xem đó có phải là một hàm không.

```python
>>> issubclass(AlienDog, Dog)
True
>>> callable(AlienDog.fly)
True
```

### Nếu như bạn quá lười để thực hiện từng phương thức trên cho một *object* nhất định?

May mắn thay, chúng ta có thể viết một function tổng hợp để dùng trong một lần gọi:

```python
>>> def introspect(obj):
...   for func in [type, id, dir, vars, callable]:
...         print("%s(%s):\t\t%s" % (func.__name__, introspect.__code__.co_varnames[0], func(obj)))
        

>>> introspect(Bird)

type(obj):		<class 'type'>
id(obj):		42333256
dir(obj):		['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'fly']
vars(obj):		{'__module__': '__main__', '__init__': <function Bird.__init__ at 0x7f855108d2f0>, 'fly': <function Bird.fly at 0x7f855108d378>, '__dict__': <attribute '__dict__' of 'Bird' objects>, '__weakref__': <attribute '__weakref__' of 'Bird' objects>, '__doc__': None}
callable(obj):		True
```

Quá tiện khi chỉ cần gọi một dòng là hiện ra được bao nhiêu là điều huyền bí về object nhỉ? 

### Tổng kết

Qua phần tổng hợp vừa rồi, mình đã giới thiệu được khái niệm "code introspection" và cách sử dụng cơ bản các built-in functions của Python. Hi vọng các bạn thấy nó hữu ích. Ngoài những phương thức ở trên, chúng ta còn có thể dùng package `inspect`  với những tùy biến "xịn xò" hơn, giúp các bạn trở nên quyền lực hơn khi thực hiện code introspection. Các bạn có thể dành thời gian tìm hiểu thêm. 

Cuối cùng, mình tin rằng bài viết có lẽ vẫn còn nhiều thiếu sót. Chính ví thế, mình rất mong nhận được sự góp ý của mọi người để bài viết được hoàn thiện hơn. Mình xin cảm ơn và hẹn gặp lại mọi người ở bài viết tới! ^^

Enjoy coding!

### Link gốc
https://nguyendhn.wordpress.com/2020/09/10/code-introspection-trong-python/

### Tài liệu tham khảo

 [https://towardsdatascience.com/4-easy-to-use-introspection-functions-in-python-49bd5ee3a2](https://towardsdatascience.com/4-easy-to-use-introspection-functions-in-python-49bd5ee3a2e8)

[https://medium.com/better-programming/python-reflection-and-introspection-97b348be54d8](https://medium.com/better-programming/python-reflection-and-introspection-97b348be54d8).