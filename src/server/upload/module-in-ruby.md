# Module trong ruby là gì?
Module là một tập các lớp, phương thức, hằng số do đó module cũng giống như các class. Chỉ khác là module không thể tạo các đối tượng và không thể kế thừa. 
Module là một trong những công cụ mạnh nhất của ruby on rails, nó được sử dụng như namespace của class trong ruby. 
Thường thì chúng ta sẽ gộp các lớp, phương thức và hằng số có liên quan đến nhau vào một module để tránh xung đột tên.
# Cách khai báo và sử dụng
## Khai báo
Cách mà chúng ta tạo ra một module trong ruby thực sự rất đơn giản
```
module MyFirstModule
  def say_hello
    “Hello, My name's Hai Ninh”
  end
end
```
## Cách sử dụng method trong module
Trong ruby có 2 cách sử dụng method của module. Cách thứ nhất là "nhúng" (mixin) và dùng như instance method và cách thứ hai là dùng theo kiểu module function.
### Cách 1: Mixin và dùng như instance method
```
class Hello
  include MyFirstModule
end

Hello.new.say_hello # => Hello, My name's Hai Ninh
```
### Cách 2: Dùng theo kiểu module function
```
module MyFirstModule
  def self.say_hello
    puts “Hello, My name's Hai Ninh”
  end
end
MyFirstModule.say_hello # => Hello, My name's Hai Ninh
```
Ngoài ra  bạn có thể kết hợp cả 2 cách:
```
module MyFirstModule
  def say_hello
    “Hello, My name's Hai Ninh”
  end
  
  module_function :say_hello
end

class Hello
  include MyFirstModule
end

Hello.new.MyFirstModule # => Hello, My name's Hai Ninh
Hello.MyFirstModule # => Hello, My name's Hai Ninh
```
## Cách sử dụng module trong class
Đế sử dụng được các module trong class chúng ta thường có 2 cách đó là "include" hay "extend" những module này vào trong class đó. Khi đó các class có thể truy cập các phương thức ở trong module.
* include: khi ta sử dụng include module vào trong class thì các phương thức trong module sẽ được xem như là các instance method trong class.
* extend: khi ta sử dụng extend module vào trong class thì các phương thức trong module sẽ được xem như là các class method trong class.

```
class A
  include  MyFirstModule
end

class B
  extend  MyFirstModule
end

=> call method of module
A.new.say_hello
B.say_hello
```
# So sánh sự khác nhau giữa class method và instance method
Để hiểu rõ hơn cách sử dụng module trong class chúng ta sẽ tìm hiểu thêm về sự khác nhau giữa class method và instance method.
Class method là method mà được gọi trên một lớp, còn instance method là method mà được gọi trên thể hiện của một lớp.
```
class Foo
  def self.bar
    puts 'class method'
  end
  
  def baz
    puts 'instance method'
  end
end

Foo.bar # => "class method"
Foo.baz # => NoMethodError: undefined method ‘baz’ for Foo:Class

Foo.new.baz # => instance method
Foo.new.bar # => NoMethodError: undefined method ‘bar’ for #<Foo:0x1e820>
```
Qua ví dụ đơn giản trên, ta thấy sự khác biệt giữa 2 phương thức bar và baz. bar là một class method nên khi ta gọi Foo.bar thì nó hoạt động tốt nhưng baz lại là một instance method dó đó khi ta gọi Foo.baz thì lập tức ruby sẽ bắn ra một exception là NoMethodError.

Tiếp theo ta sẽ gọi hai method trên trên một thể hiện của lớp (Foo.new) thì ta sẽ thấy kết quả ngược lại với khi ta gọi chúng ngay trên lớp đó.
# Tổng kết
Bài viết trên chỉ là hiểu biết cơ bản của mình về module, mong là có thể giúp ích một phần nhỏ cho các bạn
Tham khảo: http://tutorials.jumpstartlab.com/topics/models/modules.html