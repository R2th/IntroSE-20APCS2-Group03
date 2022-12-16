Khi lập trình hướng đối tượng với Python, ta thường bắt gặp các câu lệnh như `super().__init__()` hoặc `super().method()` nhất là khi đọc doc của các thư viện có các lớp kế thừa nhiều lần. Bài viết hôm nay của mình sẽ hướng đến việc giới thiệu hàm `super()` và các trường hợp sử dụng nó.

![Photo by Unsplash](https://images.unsplash.com/photo-1528569937393-ee892b976859?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)

## 1. Kế thừa trong Python
Để hiểu rõ hơn về vai trò của `super()`. Mình sẽ bắt đầu với trường hợp không sử dụng `super()` trong kế thừa trước.
Cho lớp cha `Parent` và được kế thừa bởi lớp con `Children(Parent)`, khi đó lớp `Children` có thể gọi các phương thức hoặc thuộc tính từ lớp cha.
```python
class Parent:
    def self_intro(self):
        print("This is parent class")

    def parent_method(self):
        print("This is parent method")

class Children(Parent):
    def self_intro(self):
        print("This is children class")

c = Children()
c.parent_method()
# >>> This is parent method
```
Tuy nhiên, sẽ xảy ra trường hợp `Children` và `Parent` có phương thức trùng tên với nhau là `self_intro` và ta cần gọi phương thức `self_intro` của `Parent` bên trong phương thức `family_intro` của `Children`.
Trường hợp này vẫn có thể được giải quyết mà không cần dùng đến `super()` bằng cách gọi trực tiếp `Parent.self_intro(self)` bên trong `family_intro()`
```python
class Parent:
    def self_intro(self):
        print("This is parent class")

    def parent_method(self):
        print("This is parent method")

class Children(Parent):
    def self_intro(self):
        print("This is children class")

    def family_intro(self):
        self.self_intro() # Same as Children.self_intro(self)
        Parent.self_intro(self)

c = Children()
c.family_intro()
# >>> This is children class
# >>> This is parent class
```
> Nhiều bạn đã biết về bound method, unbound method có thể sẽ thắc mắc tại sao lại sử dụng tham số `self` cho phương thức `self_intro` dù hàm này không sử dụng thuộc tính hay phương thức của `self`. Vì mình muốn tập trung vào việc giới thiệu phương pháp kế thừa nên đã viết đơn giản hơn thay vì thêm các decorator và thay đổi cách gọi hàm. Bạn nào có nhu cầu biết thêm về bound method, unbound method có thể tham khảo tại [đây](https://www.geeksforgeeks.org/bound-unbound-and-static-methods-in-python/)

Chúng ta cũng có thể giải quyết trường hợp này bằng `super()` thay vì gọi trực tiếp
```python
class Children(Parent):
    def self_intro(self):
        print("This is children class")

    def family_intro(self):
        self.self_intro() # Same as Children.self_intro(self)
        super().self_intro()

c = Children()
c.family_intro()
# >>> This is children class
# >>> This is parent class
```
Hàm `super()` lúc này sẽ trả về một đối tượng thuộc lớp kế thừa từ `Children` lúc này là `Parent` và gọi `self_intro()`. Khác với cách gọi trực tiếp, `super()` không cần viết lại tên lớp `Parent` khi gọi hàm, việc này sẽ giúp tránh bị các lỗi chính tả hoặc bạn có nhu cầu đổi tên lớp cha hoặc kế thừa từ lớp khác.  
Nhưng đấy vẫn chưa phải là tất cả điểm mạnh của `super()`. `super()` được sử dụng linh hoạt trong các trường hợp đa kế thừa đặc biệt là [Diamond Problem](https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem) mà mình sẽ giới thiệu sau đây.
Trước tiên chúng ta cần phải hiểu rõ một vài khái niệm và các tham số của `super()` 
## 2. Method resolution order (MRO)
![Photo by Unsplash](https://images.unsplash.com/photo-1603880921125-88ce2fc04673?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)
MRO có thể hiểu đơn giản là trình tự kế thừa của lớp. MRO của một lớp có thể được truy xuất bằng phương thức [`mro()`](https://docs.python.org/3/library/stdtypes.html#class.mro)  
MRO sẽ được tạo để đảm bảo các lớp chỉ được liệt kê một lần và các lớp con phải được gọi trước lớp cha. Nếu bạn muốn tìm hiểu thêm về thuật toán tạo MRO của Python thì tham khảo [tại đây](https://www.python.org/download/releases/2.3/mro)
```python 
class Parent:
    pass

class Children(Parent):
    pass

Children.mro()
# >>> [__main__.Children, __main__.Parent, object]
```

Khi sử dụng một phương thức với đối tượng thuộc lớp Children, chương trình sẽ tìm kiếm phương thức dựa trên thứ tự MRO như trên, tức là bắt đầu từ Children, nếu không có thì sẽ tìm đến Parent và sau cùng là [object](https://docs.python.org/3/library/functions.html#object) (base class mặc định cho mọi loại dữ liệu Python)
## 3. Tham số của hàm `super()`
Hàm `super(type, object)` sẽ nhận vào hai tham số `type` và `object`:

- `type` sẽ nhận giá trị kiểu lớp để khi tìm kiếm phương thức hoặc thuộc tính, chương trình sẽ tìm các lớp cha sau `type` trong MRO của lớp. Dựa vào `type` ta có thể quyết định phương thức cần gọi được cài đặt trong lớp cha hoặc lớp ông nội.
- `object` sẽ nhận vào một đối tượng để ràng buộc (bound) với phương thức hoặc thuộc tính được gọi bởi `super()`.

Để dễ hình dung, `super(type, object).method()` có thể hiểu là `object.method()` với phương thức `method` được cài đặt trong lớp cha của `type`.

Xét ví dụ trên, hàm `super()` được gọi trong lớp `Children` sẽ có giá trị tham số mặc định là `super(Children, self)`. 

```python
class Grandparent:
    def call_method(self):
        print("This is Grandparent method")

class Parent(Grandparent):
    def call_method(self):
        print("This is Parent method")

class Children(Parent):
    def call_method(self):
        # call call_method of GrandParent
        # class instead of Parent class
        super(Parent, self).call_method()

c = Children()
c.call_method()
# >>> This is Grandparent method
```
Ngoài ra `type` và `object` còn có một số ràng buộc để chương trình chạy không bị lỗi mà bạn có thể tham khảo tại [doc](https://docs.python.org/3/library/functions.html#super) của `super()`
>**Lưu ý:** Nếu trong `call_method()` của lớp `Grandparent` gọi tiếp `super().call_method()`. Hàm sẽ tìm `call_method()` của các lớp phía sau lớp `Grandparent` trong MRO. Ở đây MRO sẽ là `[__main__.Children, __main__.Parent, __main__.Grandparent, object]`, vì `object` không được cài đặt `call_method()` nên sẽ trả về lỗi `AttributeError: 'super' object has no attribute 'call_method'.`


## 4. Giải quyết Diamond Problem bằng super()
![Source: me](https://i.imgur.com/WYcUzvb.png)  
Diamond Problem xuất hiện khi ta thực hiện đa kế thừa trên hai lớp cha cùng kế thừa từ một lớp ông nội.  
Xét trường hợp ta có các lớp sau:
- Lớp `Grandparent` 
- Lớp `ParentA(Grandparent)` và `ParentB(Grandparent)` cùng kế thừa từ lớp `GrandParent` 
- Lớp `Children(ParentA, ParentB)` đa kế thừa từ hai lớp `ParentA` và `ParentB`

Khi đó chúng ta sẽ gặp các vấn đề phát sinh sau:

**`ParentA` và `ParentB` có phương thức trùng tên nhau**

Nếu bạn gọi phương thức bằng `super()`, phương thức của lớp có thứ tự nhỏ hơn trong MRO sẽ được gọi trước. Trong trường hợp này, thứ tự lớp cha trong MRO sẽ là thứ tự liệt kê lớp cha trong lúc khai báo lớp `Children`.
```python
class Grandparent:
    def call_method(self):
        print("This is Grandparent method")

class ParentA(Grandparent):
    def call_method(self):
        print("This is ParentA method")

class ParentB(Grandparent):
    def call_method(self):
        print("This is ParentB method")

class Children(ParentA, ParentB):
    def say_name(self):
        super().say_name()

c = Children()
print(Children.mro())
# >>> [<class '__main__.Children'>, <class '__main__.ParentA'>, 
#      <class '__main__.ParentB'>, <class '__main__.Grandparent'>, <class 'object'>]
c.call_method()
# >>> This is ParentA method
```
Nếu muốn gọi `call_method()` của `ParentB` ta có thể làm như sau:
- Đổi thứ tự khai báo `class Children(ParentB, ParentA)` 
- Gọi trực tiếp `ParentB.say_name(self)`

**Phương thức của lớp `Grandparent` được gọi lại hai lần**

Vấn đề này gặp khi chúng ta muốn gọi phương thức khởi tạo của `ParentA` và `ParentB` trực tiếp bên trong `Children`, nhưng phương thức khởi tạo của `ParentA` và `ParentB` lại gọi phương thức khởi tạo của `GrandParent`. Khi đó sẽ xảy ra việc phương thức khởi tạo của `GrandParent` bị gọi 2 lần.
```python
class Grandparent:
    def __init__(self):
        print("Grandparent Init")

class ParentA(Grandparent):
    def __init__(self):
        print("ParentA Init")
        GrandParent.__init__(self)

class ParentB(Grandparent):
    def __init__(self):
        print("ParentB Init")
        GrandParent.__init__(self)

class Children(ParentA, ParentB):
    def __init__(self):
        print("Children Init")
        ParentA.__init__(self)
        ParentB.__init__(self)

Children()
# >>> Children Init
# >>> ParentA Init
# >>> Grandparent Init
# >>> ParentB Init
# >>> Grandparent Init
```
**Cách giải quyết:** sử dụng hàm `super()` thay vì gọi trực tiếp. Như đã lưu ý ở mục 3. hàm `super()` sẽ tìm các phương thức khởi tạo dựa trên MRO và lớp hiện tại. Vì các lớp chỉ xuất hiện trong MRO duy nhất một lần nên khi gọi `super().__init__()` sẽ tránh được việc gọi nhiều lần, giảm thiểu thời gian chạy và tránh bị ghi đè không cần thiết.
```python
class Grandparent:
    def __init__(self):
        print("Grandparent Init")

class ParentA(Grandparent):
    def __init__(self):
        print("ParentA Init")
        super().__init__()

class ParentB(Grandparent):
    def __init__(self):
        print("ParentB Init")
        super().__init__()

class Children(ParentA, ParentB):
    def __init__(self):
        print("Children Init")
        super().__init__()
        

Children()
# >>> Children Init
# >>> ParentA Init
# >>> ParentB Init
# >>> Grandparent Init
```
Tuy nhiên cách này lại dẫn đến vấn đề sau

**Phương thức khởi tạo của `ParentA` và `ParentB` cần các tham số khác nhau**  
Giả sử ta cần lưu số tuổi của mỗi lớp thông qua các biến `gp_age`, `pb_age`, `pa_age` và `c_age`  
Xét đoạn code sau đây:
```python
class Grandparent:
    def __init__(self, gp_age):
        self.gp_age = gp_age
        print(f"Grandparent age: {self.gp_age}")

class ParentB(Grandparent):
    def __init__(self, pb_age, gp_age):
        self.pb_age = pb_age
        print(f"ParentB age: {self.pb_age}")
        super().__init__(gp_age)

class ParentA(Grandparent):
    def __init__(self, pa_age, pb_age, gp_age):
        self.pa_age = pa_age
        print(f"ParentA age: {self.pa_age}")
        super().__init__(pb_age, gp_age)

class Children(ParentA, ParentB):
    def __init__(self, c_age, pa_age, pb_age, gp_age):
        self.c_age = c_age
        print(f"Children age: {self.c_age}")
        super().__init__(pa_age, pb_age, gp_age)

Children(c_age="15", pa_age="40", pb_age="45", gp_age="70")
# >>> Children age: 15
# >>> ParentA age: 40
# >>> ParentB age: 45
# >>> Grandparent age: 70
```
Mỗi lớp đều cần một tham số khác nhau khi khởi tạo nên theo thứ tự MRO biết trước, chúng ta có thể viết code như trên. Tuy code chạy đúng như ý muốn nhưng mình tin chẳng ai muốn code như trên vì các lí do sau:
- **Sai bản chất:** trừ khi `ParentA` và `ParentB` chỉ được khởi tạo đúng một lần và chỉ dùng để tạo lớp `Children`, với code trên khi tạo đối tượng thuộc lớp `ParentA` hoặc `ParentB` sẽ bị lỗi dư tham số.  
- **Quá cứng nhắc:** Vì tham số truyền vào `__init__` dựa trên MRO nên sẽ phụ thuộc thứ tự khai báo của lớp, nên chỉ cần thay đổi lại thứ tự có thể làm code chạy bị lỗi.
- **Khó tái sử dụng:** Giả sử như chúng ta có thêm lớp `ParentC` và muốn tạo lớp đa kế thừa từ `ParentA` và `ParentC`. Khi đó ta phải viết lại `__init__` của `ParentA` để đa kế thừa, điều này có thể làm ảnh hưởng đến lớp `Children` hiện tại.

**Cách giải quyết:** sử dụng `**kwargs` trong `__init__`. Khi đó chúng ta cần phải thiết kế lại tất cả các phương thức `__init__` của tất cả các lớp:
```python
class Grandparent:
    def __init__(self, gp_age, **kwargs):
        self.gp_age = gp_age
        print(f"Grandparent age: {self.gp_age}")

class ParentB(Grandparent):
    def __init__(self, pb_age, **kwargs):
        self.pb_age = pb_age
        print(f"ParrentB age: {self.pb_age}")
        super().__init__(**kwargs)

class ParentA(Grandparent):
    def __init__(self, pa_age, **kwargs):
        self.pa_age = pa_age
        print(f"ParentA age: {self.pa_age}")
        super().__init__(**kwargs)

class Children(ParentA, ParentB):
    def __init__(self, c_age, **kwargs):
        self.c_age = c_age
        print(f"Children age: {self.c_age}")
        super().__init__(**kwargs)

Children(c_age="15", pa_age="40", pb_age="45", gp_age="70")
# >>> Children age: 15
# >>> ParentA age: 40
# >>> ParentB age: 45
# >>> Grandparent age: 70
```
Code vẫn trả về kết quả như ý nhưng gọn hơn và dễ bảo trì, mở rộng hơn!

Chúng ta vẫn có thể giải quyết trường hợp này bằng cách gọi phương thức khởi tạo trực tiếp nếu bạn đảm bảo không bị ghi đè cho lớp `Grandparent` hoặc việc ghi đè không gây ảnh hưởng gì (nhưng mình vẫn khuyến khích sử dụng `super()` hơn vì lí do bảo trì và mở rộng!)
## 5. Kết bài
Qua bài này mình đã trình bày với các bạn:
- Gọi phương thức từ lớp cha bằng `super()` hoặc trực tiếp
- Khái niệm MRO và ý nghĩa tham số của `super()`
- Diamond Problem và cách giải quyết bằng `super()`

Nếu bài viết có chỗ nào không rõ hoặc sai thì xin hãy cho mình biết. Cảm ơn các bạn đã dành thời gian đọc bài viết này!
## 6. Tham khảo
- [What is super() function? How to use super() function and a mini problem/solution when use super() for multiple inheritance](https://realpython.com/python-super/)
- [`super()` Python document](https://docs.python.org/3/library/functions.html#super)
- [`super()` parameters](https://stackoverflow.com/questions/17575074/why-does-a-classmethods-super-need-a-second-argument)
- [Best practice for `super()` and how to Incorporate a Non-cooperative Class](https://rhettinger.wordpress.com/2011/05/26/super-considered-super/)
- [Diamond inheritance problem](https://www.datacamp.com/tutorial/super-multiple-inheritance-diamond-problem)
- [Bound, unbound, and static methods in Python](https://www.geeksforgeeks.org/bound-unbound-and-static-methods-in-python/)
- [Images source: Unsplash](https://unsplash.com/)