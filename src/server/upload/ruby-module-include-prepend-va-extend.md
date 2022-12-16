Module hẳn là một tính năng thú vị và quen thuộc với Ruby developer, bạn có thể sử dụng chúng để tổ chức các chức năng đặc biệt và đính kèm class thay vì sử dụng kế thừa.

```ruby
module MyModule
  def my_method
    # do something
  end
end

class MyClass
  include MyModule
end

obj = MyClass.new
obj.my_method
```

`include` là cách phổ biến nhất để import code từ module vào một class, ngoài ra Ruby còn cung cấp 2 cách khác để làm điều này là `extennd` và `prepend`. Bài viết hôm nay mình sẽ phân biệt sự khác nhau khi sử dụng 3 cách để import code của module vào class.

### Ancestors chain

Tạm dịch là chuỗi tổ tiên (nghe hơi chuối nên mình xin được sử dụng cụm từ ancestors chain)

Khi một class được tạo ra, nó sẽ có một list ancestors - là tên của class mà nó kế thừa, và những module mà nó import vào. Ví dụ:

```ruby
module MyModule
end

class MyClass
  include MyModule
end

> MyClass.ancestors
=> [MyClass, MyModule, Object, Kernel, BasicObject]
```

Như ta thấy ancestor chain này nó sẽ đi theo thứ tự kế thừa và include. Đầu tiên sẽ là class MyClass, và kết thúc là BasicObject - là class tổ tiên của Ruby. Khi tìm kiếm một method được gọi, Ruby sẽ thực hiện tìm kiếm qua từng class theo thứ tự trong list này, cho đến khi tìm thấy thì dừng lại, hoặc trả về `method missing` nếu đã tìm tới BasicObject mà không thấy.

Hiểu được cơ bản về ancestors chain của Ruby class, bây giờ chúng ta có thể so sánh sự khác nhau giữa 3 cách import module.

### include

`include` là cách đơn giản nhất và thường được sử dụng khi muốn import một module. Khi include một module vào một class, Ruby sẽ add module này vào ancestors chain của class đó, ngay sau class đó, và trước superclass của class đó.

Với ví dụ bên trên, ta có thể thấy MyModule được insert vào ancestors chain của MyClass ngay phía sau MyClass và phía trước Object - superclass của MyClass.

Ví dụ: 

```ruby
module M1
  def run
      puts "I am M1"
  end
end

class C1
  include M1
  def run
      puts "I am C1"
  end
end

> C1.ancestors
=> [C1, M1, Object, Kernel, BasicObject]

> obj = C1.new
> obj.run
=> "I am C1"
```

Khi ta gọi `obj.run`, Ruby sẽ thực hiện tìm kiếm method `my_method` trong ancestors chain của class của `obj` là C1. Nó sẽ tìm kiếm từ dưới lên trên và thực thi method đầu tiên tìm thấy.

### prepend

`prepend` được available từ Ruby 2.0, tuy nhiên nó có vẻ ít được sử dụng hơn so với `include` và `extend`. 

`prepend` hoạt động tương tự như `include`, tuy nhiên có điểm khác biệt là vị trí nó được import vào ancestors chain. Khi ta thực hiên `prepend` một module vào class, module này sẽ được import vào trước class đó trong ancestors chain.

```ruby
module M1
  def run
      puts "I am M1"
  end
end

class C1
  prepend M1
  def run
      puts "I am C1"
  end
end

> C1.ancestors
=> [M1, C1, Object, Kernel, BasicObject]

> obj = C1.new
> obj.run
=> "I am M1"
```


### extend

Khác với `include` và `prepend`, khi sử dụng `extend` trong một class các method sẽ được import vào như là những class method chứ không phải là instance method.

Nếu ta sử dụng `extend` thì module được extend vào class sẽ không được add vào ancestors chain của class đó. Vì vậy chúng ta không thể gọi những method trong module bằng object của class đó được.

```ruby
module M1
  def run
    puts "I am M1"
  end
end

class C1
  extend M1
end

> C1.ancestors
# => [C1, Object, Kernel, BasicObject]
> C1.new.run
# => undefined method `run' for #<C1:....>
```

Vậy thì khi sử dụng extend, module và class sẽ liên kết với nhau như thế nào? Khi sử dụng `extend` Ruby sẽ import những method của module vào ancestors chain của `singleton class` của class đó. Singleton class là những class chứa các singleton method và class method của một object (hoặc một class). Để hiểu về định nghĩa singleton class, singleton method, các bạn có thể tìm kiếm trong Viblo.

Khi các method được import vào singleton class, ta có thể gọi các method đó như là class method:

```ruby
> C1.run
# => I am M1
```

Một cách thông thường để bạn có thể sử dụng 1 module mà có thể import cả class methods và instance methods là sử dụng `included`

```ruby
module M1
  module ClassMethods
    def my_class_method
    end
  end
  
  def self.included(base)
    base.extend(ClassMethods)
  end
  
  def my_instance_method
  end
end

class C1
  include M1
end

> C1.my_class_method
> C1.new.my_instance_method
```

Qua bài viết hi vọng các bạn hiểu được sự khác nhau của 3 cách import module vào class mà mình đã đề cập.

Thank for your reading!

Bài viết tham khảo từ: https://medium.com/@leo_hetsch/ruby-modules-include-vs-prepend-vs-extend-f09837a5b073