Như bài trước thì mình đã đi tìm hiểu qua cơ bản về biến và kiểu dữ liệu trong python. Nếu bạn nào chưa xem thì xem [tại đây](https://viblo.asia/p/variable-trong-python-63vKjbXMK2R). Còn phần này mình sẽ đi qua về OOP (Object Oriented Programming) trong python. Let's go.

**Khái niệm**

Python là một ngôn ngữ hướng đối tượng. Vì vậy hầu hết mọi thứ trong Python đều là những đối tượng với những thuộc tính (properties) và phương thức (methods). 

OOP là một kĩ thuật lập trình cho phép tạo ra các đối tượng để trừu tượng hóa 1 đối tượng thực tế (đưa các đối tượng trong thực tế vào trong code). Cho phép lập trình viên tương tác với các đối tượng này.

Một đối tượng bao gồm: thuộc tính (attributes) và phương thức (methods).
* Thuộc tính (attributes) chính là những thông tin, đặc điểm của đối tượng. VD: Con mèo (màu sắc, có đuôi, 2 tai, bốn chân, ...)
* Phương thức (methods) là những thao tác, hành động mà đối tượng đó có thể thực hiện. VD: Con mèo (ăn, chạy nhảy, cắn, gào, rên, ....)

Lớp có thể hiểu là một bản thiết kế để tạo ra một thực thể nào đó, là tập hợp nhiều thuộc tính đặc trưng cho đối tượng được tạo ra từ lớp này. VD: Con mèo (tên, màu sắc, có đuôi, tai, chân, ...)

Đối tượng là một thực thể của 1 lớp nào đó, được tạo ra từ lớp đó. VD: Mèo mun (tên là mèo mun, màu đen, có đuôi dài, 2 tai, 4 chân, ....)

OOP tuân theo một số nguyên lý cơ bản, gồm có 4 nguyên lý: TÍnh đóng gói, Tính kế thừa, TÍnh bao đóng, Tính đa hình.

**Các nguyên lý cơ bản của OOP**
* Tính đóng gói (Encapsulation): Các dữ liệu và phương thức có liên quan với nhau được đóng gói thành 1 lớp. Tức là mỗi lớp được xây dựng để thực hiện một nhóm chức năng đặc trưng của riêng lớp đó. Che giấu các thông tin của lớp đó đối với bên ngoài thể hiện ở public, protected, private đối với từng thuộc tính và phương thức.
* TÍnh kế thừa (Inheritance): Nguyên tắc này cho phép xây dựng một lớp mới dựa trên 1 lớp đã khai báo từ trước. Lớp con có thể sử dụng lại các thuộc tính và phương thức của lớp cha mà không cần khai báo lại. Tùy thuộc vào từng ngôn ngữ cho phép việc kế thừa 1 hoặc nhiều class cha.
* TÍnh trừu tượng (Abstraction): tổng quát hóa phương thức của đối tượng không quan tâm phương thức thực hiện như thế nào, được thể hiện bởi interface (có các tên phương thức nhưng ko có body của phương thức, khi class nào impliment interface thì thực hiện nó).
* Tính đa hình (Polymorphism): Tính đa hình được thể hiện bởi một phương thức, hành động có thể thực hiện theo nhiều cách khác nhau. VD: chó mèo cùng là động vật nhưng khi thực hiện phương thức 'sủa' thì chó sủa 'gogo', mèo sủa 'méo mèo'.  =)

Python là một ngôn ngữ hướng đối tượng nên cũng tuân theo các nguyên lý cơ bản của OOP.

**Class, methods, attributes**

-Trong python có nhiều lớp đã được định nghĩa sẵn. Do mọi thứ trong python đều là đối tượng ví dụ như list, tuple, dictionary, string, int… là các lớp. Khi chúng ta khai báo biến thuộc các lớp này thì chúng là các đối tượng, nếu các bạn không tin thì có thể sử dụng hàm `type()`

![](https://images.viblo.asia/f50dc05c-052c-4f96-a8c2-1be210bcdc51.png)

Ngoài các class có sẵn thì chúng ta có thể định nghĩa ra các lớp riêng biệt sử dụng từ khóa class:
```
class helloWorld:
    pass

hl = helloWorld()
print type(helloWorld)
print type(hl)
```

![](https://images.viblo.asia/0e0ab6f4-8ad2-4000-90e0-8fa50c0f1464.png)

Trong ví dụ trên chúng ta đã tạo một đối tượng mới là hl nên type của nó là instant - 1 thể hiện của lớp helloWorld, còn helloWorld là một lớp - class. Bên trong lớp pass - cú pháp cho việc chưa biết nên xây dựng nó như thế nào, chưa biết nên code sao cho tối ưu và muốn để lại làm sau. Nhưng hàm, lệnh đó không thể có một khối lệnh rỗng, trình biên dịch sẽ báo lỗi, vì thế, chỉ cần sử dụng lệnh pass để xây dựng một khối lệnh rỗng, lúc này trình biên dịch sẽ hiểu và bỏ qua. Thay thế cho pass chúng ta có thể khai báo các thuộc tính và phương thức ở đây.

-Thuộc tính có thể hiểu là một biến trong class, thuộc tính mô tả các đặc tính của một đối tượng. Trong Python có một phương thức đặc biệt gọi là  `__init__()` dùng để khởi tạo giá trị cho các thuộc tính của một đối tượng.

```
class dog:
    legs = 4;
    
    def __init__(self, name):
        self.name = name

pug = dog('bug')
print pug.name
print pug.legs

husky = dog('husky')
print husky.name
print husky.legs
```

Phương thức `__init__()` là phương thức khởi tạo của tất cả các lớp, mỗi khi tạo một đối tượng phương thức này sẽ tự động được gọi. Bất cứ phương thức nào của Python cũng đều phải có tham số đầu tiên là self rồi mới đến các tham số khác. self ám chỉ đối tượng đã được gọi đó. Chẳng hạn trong ví dụ trên khi chúng ta gọi pug = dog('bug') thì self chính là đối tượng pug.

Ngoài những thuộc tính phải khai báo khi tạo 1 đối tượng mới thì chúng ta có thể khai báo các thuộc tính có sẵn với mọi class được tạo ra và ko cần phải gán khi khai báo. VD: legs

![](https://images.viblo.asia/0e0ab6f4-8ad2-4000-90e0-8fa50c0f1464.png)

-Phương thức thực chất là các các hàm trong class, thực hiện các công việc cụ thể:

```
class dog:
    legs = 4;
    
    def __init__(self, name):
        self.name = name
        
    def eat(self):
        print 'an an an ....'

pug = dog('bug')
print pug.name
print pug.legs
pug.eat()
```

![](https://images.viblo.asia/09d68832-066f-45e0-987c-1c0e53e49180.png)

**Các phương thức có sẵn được kế thừa từ lớp gốc - magic method**

-Phương thức `__init__()` như trên đã trình bày, khởi tạo các tham số, thuộc tính của class

-Ngoài ra còn có  `__repr__()`, `__str__()`, `__del__()`, `__format__()`, `__bytes__()`, `__hash__()`, `__len__()`, `__add__()`, `__call__()`, ... Hiểu thêm về magic method [ở đây](https://www.codesansar.com/python-programming/dunder-magic-double-underscore-or-data-models.htm)

**Tính bao đóng**

Về bản chất trong python thì các khái niệm về private, protected, public không có, trong code chúng ta chỉ ám chỉ điều này cho việc truy cập cho đúng:
- với public thì có thể truy cập được ở mọi nơi, nên cách khai báo như hàm bình thường
- Với protected thì chỉ lớp con có thể truy cập được, cách khai báo bằng cách bắt đầu bằng một dấu gạch ngang "_", VD: _age. Chúng ta sẽ ngầm hiểu là ko sử dụng nếu không phải là class con
-  Với private thì chỉ class đó có quyền truy cập, cách khai báo bằng cách bắt đầu bằng 2 dấu gạch ngang "__", VD: __age. 

```
class Foo:
    __name = "Foo"

    def __getName(self):
        print(self.__name)

    def get(self):
        self.__getName()

print(Foo().__name) #error
Foo().__getName() #error
Foo().get() 
```

![](https://images.viblo.asia/fedb47e4-3e81-47c3-91bd-d1ec81887633.png)


**Kế thừa trong python**

-Cú pháp kế thừa: `class childClass(baseClass):`

```
class Animal:
   legs = '0'

   def __init__(self):
      pass

   def whoAmI(self):
      print ("Animal")
 
   def eat(self):
      print ("Eating")
 
 
class Dog(Animal):
   def __init__(self):
      Animal.__init__(self)
      print ("Dog created")
      self.legs = '4';
 
   def whoAmI(self):
      print ("Dog go go")
 
   def eat(self):
      print ("eat eat eat .....")

   def run(self):
      print ("legs: " + self.legs + " run run run .....")
 
 
d = Dog()
d.whoAmI()
d.eat()
d.run()
```

![](https://images.viblo.asia/70e81c2d-06a3-4968-bbf0-602bc2f16d7e.png)

Trong ví dụ trên chúng ta định nghĩa hai lớp là là Animal và lớp Dog. Lớp Dog kế thừa từ lớp Animal, sử dụng lại một số phương thức, thuộc tính của lớp Animal và có các phương thức của riêng nó. Ở trên lớp Dog kế thừa phương thức eat(), kế thừa và thay đổi phương thức whoAmI(), ngoài ra lớp Dog còn có phương thức của riêng nó là phương thức run(). Ta có thể thấy lớp dog đã sử dụng lại thuộc tính legs và thay đổi giá trị của thuộc tính này là 4.

Để kế thừa một lớp thì chúng ta đặt tên lớp đó bên trong cặp dấu ngoặc tròn () ngay phía sau phần định nghĩa tên lớp. Như ví dụ trên là đơn kế thừa - kế thừa từ một class. Trong python thì chúng ta có thể đa kế thừa - cho phép từ 1 class con có thể kế thừa từ nhiều class cha.

```
class Animal:
   legs = '0'

   def __init__(self):
      pass

   def whoAmI(self):
      print ("Animal")
 
   def eat(self):
      print ("Eating")

class Entity:
   def __init__(self):
      pass

   def weight(self):
      print 'weight 88';
 
class Dog(Entity, Animal):
   def __init__(self):
      Animal.__init__(self)
      Entity.__init__(self)
      print ("Dog created")
      self.legs = '4';
 
   def whoAmI(self):
      print ("Dog go go")
 
   def eat(self):
      print ("eat eat eat .....")

   def run(self):
      print ("legs: " + self.legs + " run run run .....")
 
 
d = Dog()
d.whoAmI()
d.eat()
d.run()
d.weight()
```

![](https://images.viblo.asia/bc82efc9-d035-4090-aefd-c44a24c49c14.png)

Ở ví dụ trên thì lớp Dog đã kế thừa từ 2 lớp cha là Animal và Entity.

**Interface, abstract class**

-abstract class: Các Abstract class cho phép bạn cung cấp chức năng mặc định cho các class con. Bằng cách định nghĩa một abstract base class (lớp cơ sở trừu tượng), bạn có thể xây dựng nên một mô hình chung cho một nhóm các class con. Mặc định trong Python sẽ không cung cấp Abstract class cho chúng ta sử dụng. Nhưng Python có một mô-đun gọi là Abstract Base Classes (ABC) để giúp chúng ta làm điều đó. Mô-đun này nằm trong package abc nên chúng ta cần import vào trước khi sử dụng.

```
from abc import ABC
```

-Từ khóa @ abstractmethod: để khai báo rằng phương thức phía dưới là phương thức abstract
```
form abc import ABC, abstractmethod

# abstract class
class abstractClassName(ABC):
    @abstractmethod
    def methodName(self):
        pass

# tạo class implement từ abstractClassName
class normalClass(abstractClassName):
    # khai báo thuộc tính, phương thức class ở đây
    def methodName(self):
        pass
```

-Interface: Trong python không biết có đúng không nhưng thấy ít tài liệu nói về cái này trong python, có ý nói rằng interface thực sự không cần thiết bởi vì trong python có đa kế thừa. Nhưng bạn vẫn có thể tạo Interface từ lớp ABC tương tự ở trên.
```
form abc import ABC, abstractmethod

class InformalParserInterface:
    @abstractmethod
    def load_data_source(self):
        pass

    def extract_text(self):
        pass
```
-----
Bài này cũng dài rồi, mình chỉ đi qua các phần cơ bản của OOP còn chi tiết chắc cần tìm hiểu từng phần và kĩ hơn. Cảm ơn bạn đã quan tâm