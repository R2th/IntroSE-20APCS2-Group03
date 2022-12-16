# Module trong ngôn ngữ Ruby là gì?
Module là một tập các lớp, phương thức, hằng số do đó module cũng giống như các class. Chỉ khác là module không thể tạo các đối tượng và không thể kế thừa. Module là một trong những công cụ mạnh nhất của ruby on rails, nó được sử dụng như namespace của class trong ruby. Thường thì chúng ta sẽ gộp các lớp, phương thức và hằng số có liên quan đến nhau vào một module để tránh xung đột tên.
# Làm sao để khai báo một Module
Cách mà chúng ta tạo ra một module trong ruby thực sự rất đơn giản
```
module MyFirstModule
  def is_name
    puts "My name is Duc Manh"
  end
end
```
# Cách sử dụng method trong Module
Trong ruby có 2 cách sử dụng method của module. Cách thứ nhất là "nhúng" (mixin) và dùng như instance method và cách thứ hai là dùng theo kiểu module function.
## Cách 1: Mixin và dùng như instance method
```
module MyFirstModule
  def is_name
    puts "My name is Duc Manh"
  end
end

class People
    include MyFirstModule
end

People.new.is_name # => My name is Duc Manh
```
Các bạn có thể thấy là hàm #name được gọi thông qua object của People. Đây là cách phổ biến mà người viết Ruby hay dùng để chia sẻ code giữa các class với nhau.
## Cách 2: Dùng theo kiểu module function
Tương tự như cách sử dụng class methods, module cho phép gọi hàm với receiver là module. Xem ví dụ sau:
```
module MyFirstModule
  def self.is_name
    puts "My name is Duc Manh"
  end
end
MyFirstModule.is_name # => My name is Duc Manh
```
Lưu ý là mình định nghĩa hàm này với từ khoá .self để chỉ ra là hàm này thuộc về module.
### Ngoài ra bạn cũng có thể kết hợp cả hai cách
Nếu bây giờ bạn có một hàm trong module và bạn vừa muốn nó được dùng trong mixin và vừa muốn dùng nó như module function thì làm thế nào? Cách đơn giản nhất là viết như sau:
```
module MyFirstModule
  def is_name
    puts "My name is Duc Manh"
  end

  module_function :is_name
end

class People
  include MyFirstModule
end

People.new.is_name # => My name is Duc Manh
MyFirstModule.is_name # => My name is Duc Manh
```
# Cách sử dụng module trong class
Đế sử dụng được các module trong class chúng ta thường có 2 cách đó là "include" hay "extend" những module này vào trong class đó. Khi đó các class có thể truy cập các phương thức ở trong module.
Đế sử dụng được các module trong class chúng ta thường có 2 cách đó là "include" hay "extend" những module này vào trong class đó. Khi đó các class có thể truy cập các phương thức ở trong module.

* include: khi ta sử dụng include module vào trong class thì các phương thức trong module sẽ được xem như là các instance method trong class. Khi một module được include vào một class, mặc định class đó sẽ access được các instance method được định nghĩa trong module đó nhưng lại không gọi được các class method.
* extend: khi ta sử dụng extend module vào trong class thì các phương thức trong module sẽ được xem như là các class method trong class. extend cũng có thể được dùng để gán các phương thức được định nghĩa trong module như là các singleton methods cho các objects nữa.
```
class A
  include  MyFirstModule
end

class B
  extend  MyFirstModule
end

=> call method of module
A.new.name
B.name
```
# So sánh sự khác nhau giữa class method và instance method
Để hiểu rõ hơn cách sử dụng module trong class chúng ta sẽ tìm hiểu thêm về sự khác nhau giữa class method và instance method. Class method là method mà được gọi trên một lớp, còn instance method là method mà được gọi trên thể hiện của một lớp.
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
Mình cũng vừa mới học ngôn ngữ Ruby, bài viết trên chỉ là hiểu biết cơ bản mà mình đã học và tìm hiểu được về module, mong là có thể giúp ích một phần nhỏ cho các bạn. Cảm ơn các bạn đã xem!!
Tham khảo: http://tutorials.jumpstartlab.com/topics/models/modules.html