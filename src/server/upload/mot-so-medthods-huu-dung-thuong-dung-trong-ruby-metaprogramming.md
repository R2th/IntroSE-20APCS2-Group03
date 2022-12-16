Mời các bạn đọc các concept trước ở trong series [này](https://viblo.asia/s/ruby-metaprogramming-P856j2795Y3)

Còn dưới đây là một số method hay dùng trong Ruby Metaprogramming:

## Sự tự xét(introspection) hay sự phản chiếu (reflection)
**Trong ruby, ta hoàn toàn có thể đọc thông tin về  một *class* hay *object* trong quá trình thực thi  (*runtime*)**. Để làm điều đó, ta có thể sử dụng các method  như là `class()`, `instance_method()`, `instance_variables`. Ví dụ:
```
class Rubyist
  def what_does_he_do
    @person = 'A Rubyist'
    'Ruby programming'
  end
end

an_object = Rubyist.new
puts an_object.class # => Rubyist
puts an_object.class.instance_methods(false) # => what_does_he_do
an_object.what_does_he_do
puts an_object.instance_variables # => @person
```
Method `respond_to?` là một ví dụ khác của *introspection* hay *reflection*. Ta có thể xác định trước (trước khi yêu cầu *object* làm gì đó) liệu *object* có biết làm thế nào để handle message mà mình muốn gửi đi hay không, bằng cách dùng `respond_to?`. Method này tồn tại trên tất cả các *object*, mình có thể hỏi bất cứ object nào rằng nó có respond được cái message này ko.
```
obj = Object.new
if obj.respond_to?(:program)
  obj.program
else
  puts "Sorry, the object doesn't understand the 'program' message."
end
```

## send
`send()` là một *instance method* của `Object` class. Đối số  (argument) đầu tiên của `send()` là tên method mà mình muốn object gọi đến. Tên method đó có thể là string hay symbol, nhưng mà thường thì người ta thích dùng symbol hơn. Các đối số còn lại là các data gửi kèm.
```
class Rubyist
  def welcome(*args)
    "Welcome " + args.join(' ')
  end
end

obj = Rubyist.new
puts(obj.send(:welcome, "famous", "Rubyists"))   # => Welcome famous Rubyists 
```
Bằng cách kết hợp với `respond_to?`, ta có thể để một object tự xử lý khi nó gọi hàm:
```
class Rubyist
end

rubyist = Rubyist.new
if rubyist.respond_to?(:also_railist)
  puts rubyist.send(:also_railist)
else
  puts "No such information available"
end
```

**Bạn có thể gọi bất cứ method nào với `send()`, kể cả *private methods***
```

class Rubyist
  private
    def say_hello(name)
      "#{name} rocks!!"
    end
end
obj = Rubyist.new
puts obj.send( :say_hello, 'Quynh')
```

## define_method
Module `define_method()` là một private instance method của class `Module`. **`define_method()` chỉ được định nghĩa trên class và module**. Ta có thể định nghĩa một *instance method* động ngay trong `receiver` luôn, chỉ cần đưa tên method vào 1 block, block này chính là body của method sắp đc định nghĩa:
```
class Rubyist
  define_method :hello do |my_arg|
    my_arg
  end
end
obj = Rubyist.new
puts(obj.hello('Quynh')) # => Quynh
```

## method_missing
Khi ruby thực thi method `look-up` và ko tìm thấy method phù hợp, nó sẽ gọi `method_missing()` trên receiver. `method_missing()` được gọi kèm theo 1 mảng các đối số được truyền vào và block. Ruby hiểu rằng `method_missing()` ở ngay đó, vì nó là instance method của `Kernel` mà mọi object đều được kế thừa. `Kernel#method_missing()` trả lời lại bằng cách raise lên một `NoMethodError`. Việc overriding lại `method_missing()` cho phép ta gọi những method không tồn tại.
```
class Rubyist
  def method_missing(m, *args, &block)
    puts "Called #{m} with #{args.inspect} and #{block}"
  end
end

Rubyist.new.anything # => Called anything with [] and
Rubyist.new.anything(3, 4) { something } # => Called anything with [3, 4] and #<Proc:0x02efd664@tmp2.rb:7>
```

## remove_method và undef_method
Để remove các method đang tồn tại, ta có thể dùng `remove_method` trong scope của class chứa method đó. Nếu 1 method cùng tên được định nghĩa cho class ancestor(tổ tiên, nằm phía trên trong cây thừa kế) của class đó, thì method trong ancestor class đó sẽ ko được remove. 

`undef_method` thì ngược lại, nó sẽ chặn việc gọi đến method của ancestor class nếu method trong class hiện tại cùng tên với method của ancestor class. Xem ví dụ để hiểu rõ hơn.
```
class A
  def method_missing(m, *args, &block)
    puts "Method Missing: Called #{m} with #{args.inspect} and #{block}"
  end

  def hello
    puts "Hello A"
  end
end

class B < A
  def hello
    puts "Hello B"
  end
end

obj = B.new
obj.hello # => Hello B

class B
  remove_method :hello  # xóa method từ B, nhưng vẫn tồn tại ở A
end
obj.hello # => Hello A

class IndianRubyist
  undef_method :hello   # chặn bất cứ lần gọi nào đến 'hello'
end
obj.hello # => Method Missing: Called hello with [] and
```

## eval
Method `eval()` của module `Kernel` được dùng trong trường hợp thực thi code bên trong string. Method `eval()` có thể  phỏng đoán được các string thậm chí là nhiều dòng, và thực thi các program được nhúng trong string đó. Method này sẽ biên dịch các đoạn code trong string trước khi thực thi, nên nó khá chậm, thậm chí còn khá nguy hiểm. Nếu ai đó tác động từ bên ngoài (giả dụ viết script sử dùng eval method) có mục đích xấu đến ứng dụng của mình, thì nó có thể là 1 lỗ hỏng bảo mật lớn. **Nên việc sử dụng eval() được xem là giải pháp cuối cùng**.
```
str = "hello"
puts eval("str + 'world'") # => "hello world"
```

## instance_eval, module_eval, class_eval
`instance_eval(), module_eval(), class_eval()` và những kiểu đặc biệt của `eval()`.
### instance_eval
Class `Object` có một public method là `instance_eval()` có thể được gọi từ một object cụ thể. Nó cấp quyền truy cập đến các biến instance của object đó. Method này được gọi dưới dạng block hoặc string.
```
class Rubyist
  def initialize
    @geek = "Quynh"
  end
end
obj = Rubyist.new
# instance_eval có thể truy cập các private methods của obj
# và các biến instance

obj.instance_eval do
  puts self # => #<Rubyist:0x2ef83d0>
  puts @geek # => Quynh
end
```
Block mà ta truyền vào `instance_eval()` có thể  giúp ta làm được nhiều việc, ko còn data nào là private nữa :v: 
`instance_eval` còn có thể được dùng để thêm class method nữa:
```
class Rubyist
end
Rubyist.instance_eval do
  def who
    "Geek"
  end
end
puts Rubyist.who # => Geek
```
### module_eval, class_eval
Những methods `module_eval` và `class_eval` được dùng trên các module và class chứ ko phải trên object. `class_eval` là 1 alias của `module_eval`.
Những method này được sử dụng để **thêm/bớt giá trị của các *class variables* từ bên ngoài class đó**.
```
class Rubyist
  @@geek = "someone"
end
puts Rubyist.class_eval("@@geek") # => someone
```
`module_eval` và `class_eval` có thể được dùng để **thêm instance methods vào 1 module hoặc class**. Mặc dù 2 method này có tên khác nhau nhưng chức năng thì giống hệt nhau.
```
class Rubyist
end
Rubyist.class_eval do
  def who
    "Geek"
  end
end
obj = Rubyist.new
puts obj.who # => Geek
```
Lưu ý: **class_eval định nghĩa instance methods, còn instance_eval định nghĩa class_methods.**

## class_variable_get, class_variable_set
Để thêm/bớt giá trị của các class variables, ta có thể sử dụng 2 methods là `class_variable_get`(lấy vào 1 đối số dạng symbol làm tên biến và trả về giá trị của biến) và `class_variable_set`(lấy vào 1 đối số dạng symbol làm tên biến và đối số thứ 2 là giá trị được gán cảu biến đó).
```
class Rubyist
  @@geek = "someone"
end

Rubyist.class_variable_set(:@@geek, "Quynh")
puts Rubyist.class_variable_get(:@@geek) # => Quynh
```

## class_variables
Để lấy danh sách các tên biến class dưới dạng 1 mảng, ta có thể sử dụng method `class_variables`:
```
class Rubyist
  @@geek = "Quynh"
  @@country = "VN"
end

class Child < Rubyist
  @@city = "DN"
end

print Rubyist.class_variables # => [:@@geek, :@@country]
puts
p Child.class_variables # => [:@@city]
```

## const_get, const_set
Ta có thể lấy giá trị hoặc set giá trị mới của hằng số bằng cách dùng `const_get` và `const_set`.

`const_get` trả về giá trị của constant được gọi, ví dụ:
```
puts Float.const_get(:MIN) # => 2.2250738585072e-308
```
`const_set` thiết lập hằng số (đã được đặt tên) cho object, trả về chính object đó. Nó sẽ tạo mới constant neeys constant đó chưa tồn tại. Ví dụ bên dưới:
```
class Rubyist
end

puts Rubyist.const_set("PI", 22.0/7.0) # => 3.14285714285714
```

## Wrapup
Các method vừa kể trên được dùng khá phổ biến trong metaprogramming. Hi vọng bài viết sẽ giúp ích ít nhiều cho đọc giả.

Nguồn: http://ruby-metaprogramming.rubylearning.com/html/ruby_metaprogramming_3.html