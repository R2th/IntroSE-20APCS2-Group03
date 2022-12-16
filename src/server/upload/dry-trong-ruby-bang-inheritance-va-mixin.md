Trong bài viết này mình xin đề cập đến cách cơ bản để giảm thiểu trùng lặp code trong ứng dụng, bạn sẽ hay nghe đến **DRY** - Don't Repeat Yourself.

### Inheritance
Ruby là một ngôn ngữ lập trình hướng đối tượng (**OOP**) nên nó có tính chất **inheritance**, và nó dùng cho các class.
Trong ruby thì chỉ cần khai báo đơn giản bởi ký tự `<`, và thứ tự là con `<` cha. Hãy xem ví dụ đơn giản như sau.

```ruby
class Animal
  attr_accessor :color

  def speak
    "Hello!"
  end
  
  def self.is_human?
    false
  end
end

class Dog < Animal
  attr_accessor :name 
  
  def initialize name
    @name = name
  end
  
  def speak
    "#{self.name} says arf!"
  end
end

class Cat < Animal
end
```
Ở trên khai báo 3 class gồm `Animal`, và `Dog`, `Cat` là 2 class con trực tiếp của `Animal`. Khi đó ta có như sau:

```
2.5.1 :001 > Animal.class
 => Class 
2.5.1 :002 > Dog.class
 => Class 
2.5.1 :003 > Dog.superclass
 => Animal 
 2.5.1 :004 > Cat.superclass
 => Animal 
 ```
  `superclass` của `Dog` và `Cat` đều là `Animal`
 
 ```ruby
2.5.1 :005 > Cat.is_human?
 => false
2.5.1 :010 > cat = Cat.new
 => #<Cat:0x00000000026644a8> 
2.5.1 :011 > cat.color = "grey"
 => "grey" 
2.5.1 :012 > cat
 => #<Cat:0x00000000026644a8 @color="grey"> 
```

`Cat` không cần định nghĩa gì cả nhưng vẫn thực hiện được câu lệnh trên là bởi vì `Cat` thừa hưởng lại tất cả gồm class method, instance method và biến từ cha của nó là class `Animal`. 

```ruby
2.5.1 :005 > Dog.is_human?
 => false 
2.5.1 :006 > dog = Dog.new("Reck")
 => #<Dog:0x000000000254f8d8 @name="Reck"> 
2.5.1 :007 > dog.color = "brown"
 => "brown" 
2.5.1 :008 > dog
 => #<Dog:0x000000000254f8d8 @name="Reck", @color="brown"> 
 2.5.1 :032 > cat.name = "Mimi"
NoMethodError (undefined method `name=' for #<Cat:0x00000000026644a8 @color="grey">)
```
`Dog` cũng được thừa hưởng các method và biến từ `Animal`, ngoài biến `color` từ cha thì nó còn định nghĩa thêm cho mình biến `name`. Cho nên khác `Cat`, `Dog` có thêm biến cho object của mình.

```ruby
2.5.1 :009 > dog.speak
 => "Reck says arf!" 
2.5.1 :013 > cat.speak
 => "Hello!"
```
Trong `Dog` và `Animal` đều có method `speak`, như này nghĩa là `Dog` đang ghi đè lại chính method của cha mà nó kế thừa, còn `Cat` thì không ghi đè method này. Khi gọi `speak` như trên thì `dog` sẽ cho nội dung bên trong method `speak` của class `Dog`, còn với `cat` thì nó lấy luôn method `speak` của class `Animal`. 

Việc ghi đè lại method của cha trong cây kế thừa chính là tính chất `polymorphism` - đa hình - một trong 4 tính chất quan trọng của **OOP**. 



#### `super`

Với tính kế thừa của mình, Ruby cung cấp cho bạn method rất hay đấy là `super`. Khi bạn gọi `super` tại một method trong class hiện tại, nó sẽ tìm ngược lên các class cha trong cây kế thừa để tìm ra method có cùng tên với method kia để thực hiện nó. Hãy xem ví dụ để dễ hình dung:

```ruby
class Animal
  def speak
    "Hello!"
  end
end

class Dog < Animal
  def speak
    super + " from GoodDog class"
  end
end
```

```
2.5.1 :001 > dog = Dog.new
 => #<Dog:0x0000000001e88950> 
2.5.1 :002 > dog.speak
 => "Hello! from Dog class" 
```

Ta thấy, khi gọi `super` trong method `speak` của class `Dog` thì nó đã tìm và thực hiện luôn method `speak` trong class `Animal`.

Một cách quen thuộc để dùng `super` là lúc khởi tạo với method `initialize` như sau:

```ruby
class Animal
  attr_accessor :name

  def initialize(name)
    @name = name
  end
end

class Dog < Animal
  attr_accessor :color

  def initialize(name, color)
    super(name)
    @color = color
  end
end
```

```
2.5.1 :001 > Dog.new("Reck", "brown")
 => #<Dog:0x0000000002a5c718 @name="Reck", @color="brown"> 
 2.5.1 :002 > dog.name
 => "Reck" 
2.5.1 :003 > dog.color
 => "brown" 
```
Như bạn thấy ở trên, class `Dog` không có khởi tạo cho thuộc tính `name`, và thay vào đó nó gọi đến `super` để tìm vào method `initialize` trong class `Animal`. Và thế là sau khi khởi tạo xong thì `dog` có luôn cả `name` và `color`.

### Mixing trong module.

Một cách thường gặp khác để **DRY** code đấy là sử dụng `module`. 
Nhắc lại định nghĩa về module một chút, trong Ruby, module được dùng để gom nhóm các method, biến, hằng số với nhau (khi gom nhóm các class thì từ khóa `module` lúc này đóng vai trò là namespace). Ta **mixin** module vào trong class bằng từ khóa `include`, `prepend` hoặc `extend`.

Ví dụ với một cây kế thừa đơn giản như sau:

![](https://images.viblo.asia/26bd07ab-1765-43ef-8338-35c332355ee7.jpg)

```ruby
module Swimmable
  def swim
    "I'm swimming!"
  end
end

class Animal; end

class Fish < Animal
  include Swimmable # mixing in Swimmable module
end

class Mammal < Animal
end

class Cat < Mammal
end

class Dog < Mammal
  include Swimmable # mixing in Swimmable module
end
```
Chạy thử ta được kết quả:
```
2.5.1 :022 > reck = Dog.new
 => #<Dog:0x0000000000cf3a28> 
2.5.1 :023 > nemo = Fish.new
 => #<Fish:0x0000000000cef798> 
2.5.1 :024 > paws = Cat.new
 => #<Cat:0x0000000000ce37b8> 
2.5.1 :026 > reck.swim
 => "I'm swimming!" 
2.5.1 :027 > nemo.swim
 => "I'm swimming!" 
2.5.1 :028 > paws.swim
NoMethodError (undefined method `swim' for #<Cat:0x0000000000ce37b8>)
```

Ta thấy `reck` và `nemo` có thể gọi đến method `swim` còn `paws` thì không, bởi vì chỉ có class `Dog` và `Fish` đã **mixin** module `Swimmable` ở bên trong nó.


#### Ancestors method

Trên đây là 2 cách để **DRY** code. Phần này mình xin giới thiệu cho các bạn một thủ thuật nhỏ để khi bạn gọi một method từ một class hoặc từ một instance cụ thể của class đó, method `ancestors`.

Giả sử bạn có mô hình kế thừa kết hợp mixin như sau:

```ruby
module Swimmable
  def swim
    "I'm swimming!"
  end
end 

class Animal
  def swim
    "Animal swimmable"
  end
end

class Fish < Animal
  include Swimmable
  
  def swim
    "Fish swimmable"
  end
end
```

```
2.5.1 :021 > Fish.new.swim
 => "Fish swimmable"
```

Ta thấy khi gọi đến method `swim` từ instance của class `Fish`, nó sẽ gọi đến method `swim` trong chính class đó. Mặc dù trong `Animal` và `Swimmable` cũng đều có method này, đó là việc ghi đè đã được nhắc đến bên trên. Nhưng bản chất nó là gì, hãy gọi method `ancestors` để xem nó trả về cho bạn cái gì.

```
2.5.1 :022 > Fish.ancestors
 => [Fish, Swimmable, Animal, Object, Kernel, BasicObject] 
```

Method `ancestors` sẽ trả về danh sách tất cả các class tổ tiên trong cây kế thừa và kể cả các module được mixin bên trong các class của cây đó (`Kernel` là module được mixin trong class `Object`). Và mỗi khi gọi một method từ class hoặc instance của class đó, Ruby sẽ lần lượt đi theo thứ tự từng class và module theo kết quả trả về của method `ancestors` để tìm kiếm method được gọi đến. Như ví dụ trên, method sẽ được tìm kiếm theo thứ tự `Fish` --> `Swimmable` --> `Animal` --> `Object` --> `Kernel` --> `BasicObject`. Tại đâu phát hiện ra có method `swim`, ta sẽ nhảy vào thực hiện và trả ra kết quả, và kết quả trả ra là method `swim` của `Fish`.

Thêm một ví dụ cuối cùng, giả sử mình tạo thêm module `Pree` và mixin nó trong class `Fish` bằng từ khóa `prepend`
```ruby
module Pree
  def swim
    "Prepend swimming!"
  end
end

module Swimmable
  def swim
    "I'm swimming!"
  end
end 

class Animal
  def swim
    "Animal swimmable"
  end
end

class Fish < Animal
  prepend Pree
  include Swimmable
  
  def swim
    "Fish swimmable"
  end
end
```

```
2.5.1 :027 > Fish.ancestors
 => [Pree, Fish, Swimmable, Animal, Object, Kernel, BasicObject] 
```

Với ví dụ này thì method sẽ được tìm kiếm theo thứ tự `Pree` --> `Fish` --> `Swimmable` --> `Animal` --> `Object` --> `Kernel` --> `BasicObject`. Bạn có thể để ý, `prepend` sẽ chèn module lên trước, còn `include` sẽ chèn module ngay sau class đó.

### Inheritance vs Modules
Phần cuối cùng trong bài viết này, mình xin đưa ra một vài so sánh giữa inheritance và module
- Ruby không cung cấp đa kế thừa kiểu một con có nhiều cha, nhưng có thể mixin thoải mái nhiều module trong class.
- Không thể tạo một instance của module, module chỉ dùng nhóm các method, biến, hằng và làm namespace
- Với quan hệ `is-a`, hãy dùng kế thừa, ex: `Dog` `is-a` `Animal`. Với quan hệ `has-a`, hãy dùng mixin, ex: `Dog` `has-a` khả năng `swim`

### Tham khảo
https://launchschool.com/books/oo_ruby/read/inheritance#classinheritance
https://www.oreilly.com/learning/ruby-cookbook-modules-and-namespaces

***

Cám ơn bạn đã theo dõi bài viết.