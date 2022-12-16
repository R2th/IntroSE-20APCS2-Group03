![](https://images.viblo.asia/e904d6da-708e-4236-858c-e32d7756f2e1.png)
<br>
Một đối tượng Ruby có các phương thức mặc định public nếu không được khai báo phạm vi truy cập , nhưng dữ liệu của nó thì private . Vì vậy, nếu chúng ta cần truy cập dữ liệu, để đọc hoặc viết, chúng ta cần phải public nó bằng cách nào đó.<br>
Và đó là khi  `attr_reader, attr_writer`, và `attr_accessor` lên tiếng thể hiện mình. 
## What is attr_reader?
Hãy cùng xem một ví dụ đơn giản về định nghĩa lớp Ruby.
``` ruby
# person.rb
class Person
  def initialize(name)
    @name = name
  end
end

john = Person.new("John")
puts john.name # => undefined method `name'
```
(À quên chúng ta chưa nói đến Rails và ORM nên mọi người đừng thắc mặc tại sao trong dự án của mình vẫn chạy ngon nhé ;) )<br>
Chúng ta không thể lấy dữ liệu từ trường name của đối tượng Person vì nó là private. Vậy nếu chúng ta vẫn cứ muốn lấy thì chúng ta sẽ cần 1 phương thức. Như mình đã nói ở đầu nếu không được khái báo phạm vi truy cập , thì các phương thức sẽ mặc định public 
``` ruby
class Person
  def initialize(name)
    @name = name
  end

  def name
    @name
  end
end

john = Person.new("John")
puts john.name # => John
```
Bằng cách định nghĩa phương thức `name` giừ chúng ta có thể đọc được dữ liệu, loại phương thức này được gọi là `getter method `<br>
Nhưng không , Person thì phải có nhiều hơn 1 thuộc tính name chẳng hạn age, email, sex, ... Nếu cứ mỗi thuộc tính đó chúng ta lại phải định nghĩa 1 phương thức thì sẽ rất mệt . Nhưng rất may là Ruby cung cấp cho chúng ta 1 cách khác ngắn gọn hơn rất nhiều mà hiệu quả thì không khác gì đó là `attr_reader`
``` ruby
class Person
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

john = Person.new("John")
puts john.name
```
Vậy nếu chúng ta cần lấy thêm thuộc tính chúng ta chỉ cần viết tiếp sau thuộc tính `:name` là có thể gọi ra bình thường
``` ruby
 attr_reader :fname, :lname, :age, :sex, :email
```
## What is attr_writer?
Tiếp đến , chúng ta không muốn đọc nữa mà lại muốn thay đổi hoặc thêm mới dữ liệu. Thì như mình đã nói dữ liệu private và phương thức public . Vậy chúng ta cần các `setter method`
``` ruby
class Person
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def name=(name)
    @name = name
  end
end

john = Person.new("John")
john.name = "Jim"
puts john.name # => Jim
```
Cúng giống vấn đề với `attr_reader` , nếu có nhiều thuộc tính thì rất phiền, và Ruby đã giải quyết vấn đề đó với `attr_writer`
``` ruby
class Person
  attr_reader :name
  attr_writer :name

  def initialize(name)
    @name = name
  end
end

john = Person.new("John")
john.name = "Jim"
puts john.name # => Jim
```
Nghe vẻ gọn rồi nhỉ, mà khoan nếu vậy code sẽ phải gõ 2 dòng code giông giống nhau như sau
``` ruby
class Person
  attr_reader :name, :age, :sex, :email
  attr_writer :name, :age, :sex, :email

  def initialize(name)
    @name = name
  end
end
```
Nhà phát triển ngôn ngữ lập trình Ruby nghe vẻ không ưng lắm về cách viết này nên `attr_accessor` ra đời
## What is attr_accessor?
Cơ bản là khi bạn muốn cả `attr_reader` và `attr_writer` của các thuộc tính chúng ta chỉ cần sử dụng `attr_accessor`
``` ruby
class Person
  attr_accessor :name, :age, :sex, :email

  def initialize(name)
    @name = name
  end
end
```
## Define method
Và còn 1 cách khác để có thể tạo các setter , getter method tương tự như  `attr_accessor` nhưng chỉ biết đển tham khảo thôi nhé . Đó là dùng `define_method`
``` ruby
class Person
  def initialize(name)
    @name = name
  end

  def self.define_attr(attr)
    define_method(attr) do
      instance_variable_get("@#{attr}")
    end

    define_method("#{attr}=") do |val|
      instance_variable_set("@#{attr}", val)
    end
  end
end

john = Person.new("John")
Person.define_attr(:name)
john.name = "Jim"
puts john.name # => Jim
```
## Tài liệu tham khảo
https://mixandgo.com/learn/ruby_attr_accessor_attr_reader_attr_writer