Metaprogramming - là một khái niệm trừu tượng. Ta tạm hiểu nó là kỹ thuật viết "những đoạn code mà sinh ra những đoạn code khác" trong thời gian chạy của chương trình. Kỹ thuật này được sử dụng trong nhiều ngôn ngữ lập trình phổ biến thông qua các khái niệm: [Reflection trong C và Java](https://en.wikipedia.org/wiki/Reflection_(computer_programming)),  [Homoiconicity trong Lisp](https://en.wikipedia.org/wiki/Homoiconicity) , ... 
Nó là một khái niệm rất khó hiểu, nhưng mình sẽ cố gắng trả lời 2 câu hỏi:
> Với ngôn ngữ Ruby, metaproramming hoạt động như thế nào? Lợi ích của nó là gì?
 
 Trong bài viết lần này, mình sẽ nói về 3 hành động liên quan đến metaprogramming trong Ruby :
*  Định nghĩa class và method để tạo ra các class và method khác. 
*  Mở và sửa lại các class đã định nghĩa.
*  Sử dụng method #send và #define_method để tránh lặp lại code trong 1 số bài toán.

## 1. Định nghĩa 1 class có đơn giản chỉ tạo ra 1 class?
### 1.1 Singleton method và singleton class trong ruby. 
Trong ruby, mọi thứ đều là đối tượng. Một đối tượng có thể gọi ra các `instance_method` được định nghĩa trong class của nó, ví dụ:
```ruby
class Person
  def hello
    p "Xin chao moi nguoi"
  end
end

hieu = Person.new.hello
#=> "Xin chao moi nguoi" 
```
Ngoài ra, chúng ta có thể định nghĩa các method mà chỉ một đối tượng duy nhất có thể sử dụng, ví dụ:
```ruby
class Person
  def hello
    p "Xin chao moi nguoi"
  end
end

hieu = Person.new.hello
#=> "Xin chao moi nguoi"

def hieu.xinchao
  p "Xin chao bang singleton_method xinchao"
end

hieu.xinchao
#=> "Xin chao bang singleton_method xinchao"
```
Method `xinchao` mà mình định nghĩa ở trên được gọi là `singleton_method` .  Các `singleton_method` được lưu bởi `singleton_class` và hãy nhớ rằng :
> - Trong Ruby, một đối tượng được tạo ra cùng với singleton_class duy nhất của nó. 
> - Singleton class này được dùng để lưu các singleton_method.
> - Singleton class không thể khởi tạo instance của nó. (nó không được định nghĩa `method new` )

Ta có thể chứng minh sự tồn tại của `singleton_class` với đối tượng `hieu` như sau:
```ruby
class Person
end
hieu = Person.new
=> #<Person:0x000055e8ec07eb28>
hieu.class
=> Person
hieu.singleton_class
=> #<Class:#<Person:0x000055e8ec07eb28>>
```
Và nói `singleton_method` được gói trong `singleton_class` cũng cần có bằng chứng:
```ruby
class Person
  def hello
    p "Xin chao moi nguoi"
  end
end

hieu = Person.new.hello
#=> "Xin chao moi nguoi"

def hieu.xinchao
  p "Xin chao bang singleton_method xinchao"
end

 hieu.class.instance_methods false
#=> [:hello]

hieu.singleton_class.instance_methods false
#=> [:xinchao]
```
Bạn thấy đấy, đoạn code trên nói rằng `method :xinchao` là `instance_method` của `hieu.singleton_class` .

Từ đầu ví dụ, mình luôn sử dụng `method new` để khởi tạo `instance` của 1 `class`
```
Class Person
end
hieu = Person.new
=> #<Person:0x000055e8ec07eb28>
```
Chúng ta đều biết, `method new` được gọi là `class method`. Nó là một `method` được tạo ngay khi chúng ta khởi tạo 1 `class`  và được gọi trực tiếp từ `class` . Vậy câu hỏi là:
> Các class method giống như `Person#new` được lưu ở đâu?
 

Với việc hiểu về 2 khái niệm `singleton_method` và `singleton_class` , mình sẽ giải thích về bản chất thật sự của khái niệm `class_method`.

### 1.2 Class method chính là singleton method.
Mình nhắc lại : "Mọi thứ trong Ruby đều là đối tượng". Các `class` cũng vậy. Ví dụ:
```ruby
Class Person
end

Person.class
#=> Class
```
`class Person` ở đây cũng chỉ là một đối tượng - một thể hiển của lớp `Class`.Và như đã nói ở **phần 1.1** :
> Trong Ruby, một đối tượng được tạo ra cùng với singleton_class duy nhất của nó. 

Vậy `Person` cũng có `singleton_class` của nó :
```ruby
Class Person
end

Person.singleton_class
# => #<Class:Person>
```
Vậy chúng ta cũng có thể định nghĩa `singleton_method` của `Person`.
```ruby
class Person
end

def Person.dance
   p "Let your body move!"
end

Person.dance
# => "Let your body move!"
```
Và những method như`method Person.dance` được gọi là `class method` .
Như vậy, sau khi hiểu về khái niệm `singleton_method`, chúng ta có thể hiểu về `class method `như sau:
> Class method chính là `singleton_method` của đối tượng class

### 1.3 Tạo một class chính là metaprogramming
Cái gọi là **"code sinh ra code"** luôn được thực hiện vô hình khi chúng ta sử dụng ngôn ngữ Ruby. Với phần giải thích `1.1` và `1.2` chúng ta đều thấy rằng đoạn code sau đây không đơn giản chỉ là khởi tạo `class Person`. Nó còn tạo ra `singleton_class` và 1 loạt các `class method` của `Person`
```
class Person
end
Person.singleton_class
# => #<Class:Person>
Person.singleton_class.instance_methods
# => [:allocate, :superclass, :new, :<=>, :<=, :>=, :==, :===, :included_modules, :include?, :name, :ancestors, :attr, :attr_reader, :attr_writer, :attr_accessor, :instance_methods, :public_instance_methods, :protected_instance_methods, :private_instance_methods, :constants, :const_get, :const_set, :const_defined?, :class_variables, :remove_class_variable, :class_variable_get, :class_variable_set, :class_variable_defined?, :freeze, :inspect, :private_constant, :public_constant, :const_missing, :deprecate_constant, :include, :singleton_class?, :prepend, :module_exec, :module_eval, :class_eval, :remove_method, :<, :>, :undef_method, :class_exec, :method_defined?, :alias_method, :to_s, :private_class_method, :public_method_defined?, :private_method_defined?, :protected_method_defined?, :public_class_method, :instance_method, :public_instance_method, :define_method, :autoload, :autoload?, :instance_variable_defined?, :remove_instance_variable, :instance_of?, :kind_of?, :is_a?, :tap, :instance_variable_set, :protected_methods, :instance_variables, :instance_variable_get, :private_methods, :public_methods, :public_send, :method, :public_method, :singleton_method, :define_singleton_method, :extend, :to_enum, :enum_for, :=~, :!~, :eql?, :respond_to?, :object_id, :send, :display, :nil?, :hash, :class, :singleton_class, :clone, :dup, :itself, :yield_self, :then, :taint, :tainted?, :untaint, :untrust, :untrusted?, :trust, :frozen?, :methods, :singleton_methods, :equal?, :!, :instance_exec, :!=, :instance_eval, :__id__, :__send__]
```
Theo nghĩa đen, đây rõ ràng là **code sinh ra rất nhiều code** trong thời gian chạy của trình thông dịch. 

Đến đây, các bạn có lẽ đã hiểu hơn một chút về cái gọi là metaprogramming. Ở phần tiếp theo, mình sẽ giải thích nó thực sự có ích khi nào?.

## 2. Khởi tạo, sửa lại các class và method ở bất cứ đâu
Một trong những lợi ích của metaprogramming là bạn có thể **khởi tạo và sửa lại các method bất kỳ lúc nào**. Ví dụ, nếu mình muốn định nghĩa lại `class_method #new` của `class Person` chỉ cần làm đơn giản như sau:
```ruby
class Person
end
Person.new
# => #<Person:0x00005629d932c658>

def Person.new
  p "Tao 1 person mới nè!"
end

Person.new
# => "Tao 1 person mới nè!"
```
Với cách làm này, chúng ta có thể sửa các `class_method` ở bất kỳ đâu, thậm chí là ở ngoài phần code định nghĩa class. Với `instance_method`, ta cũng có thể làm điều tương tự với `method class_eval` .
```ruby
class Person
  def hello
    p "Xin chao"
  end
end

Person.new.xinchao
# => "Xin chao"

Person.class_eval do
  def xinchao
    p "Van la xin chao nhung duoc dinh nghia lai!"
  end
end

Person.new.xinchao
# => "Van la xin chao nhung duoc dinh nghia lai!"
```
Bình thường, với các class được tích hợp sẵn trong `ruby` như `Array`, `String`, .... chúng ta thường không biết nó được lưu ở đâu trong `sourecode` . Tuy vậy, với ứng dụng của metaprogramming, chúng ta có thể sửa lại các class này ở bất kỳ file nào trong `sourecode`. 
Ví dụ:
```ruby
Array.class_eval do
  def vi_length
     "Mảng này gồm: " + length.to_s + " phần tử " 
  end
end

[1,1,1].vi_length
=> "Mảng này gồm: 3 phần tử "
```

## 3. Viết code không bị lặp (DRY)
### 3.1 Định nghĩa các method lặp với #define_method
Với trường hợp chúng ta cần định nghĩa những `instance_method` như sau:
```ruby
class Person
  def hello_dad
    p "Hi Dad!"
  end
  
  def hello_mom
    p "Hi Mom!"
  end
  
  def hello_sister
    p "Hi Sister!"
  end
end
```
Chúng ta thấy rằng phần code định nghĩa 3 method `Person#hello_dad`, `Person#hello_mom`, `Person#hello_sister` có nhiều điểm tương đồng. Chúng ta có thể viết ngắn lại như sau:
```ruby
class Person
  ["mom", "dad", "sister"].each do |member|
    define_method "hello_#{member}" do
      p "Hi #{member.capitalize}!"
    end
  end
end
```
Với `method` `#define_method` của `class Module`, chúng ta có thể định nghĩa các `method` lặp một cách ngắn gọn.

### 3.2 Ma thuật của method #send
Method `#send` của `class Object` được dùng như sau:
```ruby
Array.new 3, 3
# => [3, 3, 3]
Array.send "new", 3, 3
# => [3, 3, 3]
```
Nó đơn giản là một `trick` để bạn biến phần `tên của method` khi gọi thành `parameters` dạng `String` hoặc `Symbol` .  Có nghĩa là với hàm `#send`, phần tên gọi của method cũng có thể truyền vào được. Điều này có ích trong 1 số bài toán. 
Ví dụ:
```ruby
class Person
  def initialize name
     @name = name
  end
  
  def hello
    if @name == "dad"
      hello_dad
    elsif @name == "mom"
      hello_mom
    elsif @name == "sister"
      hello_sister
    else
      p "Hello"
    end
  end
  
  private
  
    def hello_dad
      p "Hi Dad!"
    end
  
    def hello_mom
      p "Hi Mom!"
    end
  
    def hello_sister
      p "Hi Sister!"
    end
end

Person.new("dad").hello
# => "Hi Dad!"
```

Với method `#send`, mình sẽ viết method `Person#hello` gọn lại như thế này:
```ruby
class Person
  def initialize name
     @name = name
  end
  
  def hello
    if !@name
      puts "Hello"
    else
      send "hello_#{@name}"
    end
  end
  
  private
  
    def hello_dad
      p "Hi Dad!"
    end
  
    def hello_mom
      p "Hi Mom!"
    end
  
    def hello_sister
      p "Hi Sister!"
    end
end

Person.new("dad").hello
# => "Hi Dad!"
```
### 3.3 Gọi và định nghĩa đồng thời một method chưa tồn tại. 
Trong ruby, `Kernel#method_missing` là `method` sẽ được gọi khi ta chạy một method chưa được định nghĩa: 
```
"Hieu".method_nay_chua_dinh_nghia
# => NoMethodError (undefined method `method_nay_chua_dinh_nghia' for "Hieu":String)
```
Với việc định nghĩa lại `Kernel#method_missing`, chúng ta có thể định nghĩa và gọi 1 method chưa từng tồn tại. 
Cụ thể, trong class `Person`:
```ruby
class Person
  def hello_dad
    p "Hi Dad!"
  end
  
  def hello_mom
    p "Hi Mom!"
  end
  
  def hello_sister
    p "Hi Sister!"
  end
end
```
Mình muốn gọi định nghĩa tất cả các method có dạng `hello_dad, hello_mom, hello_sister, hello_#{name}` tồn tại ngay khi gọi nó ra. Mình sẽ làm điều này như sau:
```ruby
class Person
  def method_missing method, *args, &block
 # Xử lý bình thường với các method không có dạng "hello_#{member}"
    return super method, *args, &block unless method.to_s =~ /^hello_\w+/
  # Define method dạng hello_#{member} nếu nó chưa tồn tại
    self.class.send(:define_method, method) do
      p "Hello #{method.to_s.gsub(/^hello_/, '').to_s.capitalize}!"
    end
   # Gọi method vừa tạo ra luôn
    self.send method, *args, &block
  end
end
```
Bây giờ mình sẽ thử gọi các `method Person#hello_hieu` vốn không tồn tại:
```ruby
class Person
  def method_missing method, *args, &block
    return super method, *args, &block unless method.to_s =~ /^hello_\w+/
    self.class.send(:define_method, method) do
      p "Hello #{method.to_s.gsub(/^hello_/, '').to_s.capitalize}!"
    end
    self.send method, *args, &block
  end
end

Person.hello_hieu
# => Hello Hieu!
```
Với metaprogramming, mình có thể **tạo và định nghĩa một method chưa tồn tại, ngay trong lúc gọi nó ra.** 

Bài viết của mình đến đây là kết thúc. Mong các bạn có thể hiểu thêm được phần nào khái niệm metaprogramming, và vui vẻ với việc nghịch nó. 



-----
References:
https://www.toptal.com/ruby/ruby-metaprogramming-cooler-than-it-sounds

https://rubymonk.com/learning/books/2-metaprogramming-ruby