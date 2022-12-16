# Mở đầu
Chắc hẳn một ruby newbie nào cũng đã từng gặp phải cú pháp self.method_name, khi đó chắc các bạn sẽ có một thắc mắc không biết là method này là dạng gì nhỉ. Sau đây mình xin chia sẻ với các bạn về hai method mà chúng ta dùng rất nhiều trong ngôn ruby đó là class method và instance method.
# Sơ lược về class method và instance method
Class method là method mà được gọi trên một lớp, còn instance method là method mà được gọi trên thể hiện của một lớp. Sau đây ta sẽ có một ví dụ nhanh và sau đó sẽ đi vào chi tiết để hiểu rõ hơn về từng method.
```ruby
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

Bây giờ bạn đã có một kiến thức nên tảng về hai phương thức class method và instance method. Sau đây tôi sẽ giới thiệu thêm về cách mà bạn có thể định nghĩa và sử dụng class method và instance method.
# Class method
Ruby rất linh hoạt cho phép chúng ta định nghĩa class method bằng nhiều cách khác nhau. Sau đây là ví dụ về các cách mà chúng ta thường dùng:
```ruby
# Way 1
class Foo
  def self.bar
    puts 'class method'
  end
end

Foo.bar # "class method"

# Way 2
class Foo
  class << self
    def bar
      puts 'class method'
    end
  end
end

Foo.bar # "class method"

# Way 3
class Foo; end
def Foo.bar
  puts 'class method'
end

Foo.bar # "class method"
```
Cách thứ 1 là cách mà tôi hay dùng nhất. Khi tôi thấy self.method_name ngay lập tức tôi có thể biết đây là một class method.

Cách thứ 2 là cách mà rất nhiều người sử dụng trong rails, nhưng nó có một hạn chế là khi bạn có một lớp mà có rất nhiều class method trong khối class << self, khi đó rất khó để phân biệt một method là class method hay instance method bởi vì nó được định nghĩa giống nhau (def bar).

Cách 3 là cách ít được dùng nhất, 3 cách trên không phải là 3 cách duy nhất được dùng để định nghĩa class method, nhưng chúng dường như là ba cách phổ biến nhất mà chúng ta thường gặp.
Class method dùng cho bất kì hành động nào mà không xử lí các thể hiện của một lớp. ActiveRecord::Base # find là một ví dụ
```ruby
module ActiveRecord
  class Base
    # some stuff
    class << self
      def find(...)
        # blah
      end
    end
  end
end
```
Một số cách sử dụng khác cuả class method trong rails là xác nhận hợp lệ  và các liên kết trong ActiveRecord.
```ruby
module ActiveRecord
  class Base
    def self.validates_presence_of(...)
      # make sure present
    end
  end
end

class Foo < ActiveRecord::Base
  validates_presence_of :bar
end
```
Khi bạn gọi validates_presence_of thì class method trong AR::Base là hàm được gọi.
# Instance method
Instance thì đơn giản hơn class method, dưới đây là các cách định nghĩa phổ biến của instance method
```ruby
# Way 1
class Foo
  def baz
    puts 'instance method'
  end
end

Foo.new.baz # "instance method"

# Way 2
class Foo
  attr_accessor :baz
end

foo = Foo.new
foo.baz = 'instance method'
puts foo.baz

# Way 3
class Foo; end

foo = Foo.new
def foo.bar
  puts 'instance method'
end

Foo.new.baz # "instance method"
```
Sự khác biệt chính là các instance method chỉ làm việc trên một thể hiện của một lớp, do đó bạn phải tạo ra một thể hiện của các lớp để sử dụng chúng (Foo.new).
# Kết luận
Class method chỉ có thể được gọi trên các lớp còn instance method chỉ có thể được gọi trên một thể hiện của một lớp. Rất mong bài viết này có thể giúp ích được cho các bạn!