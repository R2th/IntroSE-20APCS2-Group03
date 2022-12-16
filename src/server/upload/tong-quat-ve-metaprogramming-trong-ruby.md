### 1. Metaprogramming trong Ruby là gì
Metaprogramming trong Ruby là viết các dòng code có thể thay đổi và tự vận hành cấu trúc ngôn ngữ (như `Classes`, `Modules` và `Instance variables`) trong lúc code đang chạy (runtime). Thậm chí có thể chèn thêm các đoạn code mới trong runtime và chạy các đoạn đó mà không cần khởi động lại chương trình.

Sau đây mình sẽ giới thiệu một vài thuật ngữ cơ bản để chúng ta hiểu rõ về metaprogramming hơn
### 2. Instance variables, Methods và Classes
#### 2.1  Instance variable và method của một Object
Một object cơ bản chỉ chứa các  `instance variable` và sự liên kết tới class của nó. Do đó, `instance variable` của một object chỉ tồn tại trong object đó, và các methods của object đó  tồn tại trong class của object đó (hay còn được gọi là `instance method` của class). Đó chính là lý do vì sao mà các object của cùng một class có thể dùng chung các method nhưng lại không dùng chung  `instance variable`.
#### 2.2 Class
* Class chính là Object
* Vì Class là một  Object nên mọi thứ áp dụng cho object đều áp dụng được lên class. Các Class đều giống như mọi object, đều có class của nó, ở đây là `Class` 
* Cũng như object, class cũng có các method, các method của object cũng là các `instance method` của  class của nó. Các method của class cũng chính là các `instance method` của nó.
* Tất cả các class đều kế thừa từ class `Object`, và class này lại kế thừa từ class `BasicObject` - root của các class trong Ruby.
* Tên của class chỉ là một hằng
#### 2.3 Open Class
Trong Ruby, các class không bao giờ đóng, bạn luôn có thể mở lại các class đó và chỉnh sửa, ghi đè chúng bất cứ lúc nào, thậm chí cả những class thư viện như `String` hay `Array`:

```ruby
class String
  def write_size
    self.size
  end
end
puts "Show me the size!".write_size
```

**Chú ý:** Hết sức cẩn thận với Open Class, bạn rất có thể sẽ ghi đè lên một method nào đó của class gốc và có thể gây ra các bug khó lường.
#### 2.4 Nhiều method `initialize`
Sau đây là một ví dụ về việc Overloading (nạp chồng) class. Mình viết một class Rectangle thể hiện việc hiển thị một hình chữ nhật. Bạn có thể khởi tạo 1 object Rectangle bằng 2 cách: truyền vào tọa độ của góc trên bên trái và góc dưới phải, hoặc truyền vào tọa độ góc trên trái và độ dài 2 cạnh. Trong Ruby chỉ có một method `initialize`, nhưng trong trường hợp này chúng ta có thể coi như là có 2 method đó.
```ruby
#   Rectangle chấp nhận 2 kiểu tham số truyền vào theo dạng:
#   Rectangle.new([x_top, y_left], length, width)
#   Rectangle.new([x_top, y_left], [x_bottom, y_right])
class Rectangle
  def initialize(*args)
    if args.size < 2  || args.size > 3
      puts 'Invalid nummber of arguments, expected 2 or 3'
    else
      puts 'Correct number of arguments.'
    end
  end
end
Rectangle.new([10, 23], 4, 10)
Rectangle.new([10, 23], [14, 13])
```

Việc  overload giúp ta có thể cho phép hàm `initialize`  nhận nhiều kiểu tham số cũng như số lượng tham số khác nhau. Điều này áp dụng cho tất cả các method, không chỉ `initialize`.
#### 2.5 Class vô danh
Một class vô danh có thể được biết đến như là 1 `singleton class`,   `eigenclass`,  `ghost class`, `metaclass` hay một `uniclass`.

Mỗi object trong Ruby đều có  các class vô danh riêng, một class chứa các method, nhưng chỉ gắn tới chính object đó: Khi ta thêm một method vào một object nhất định, Ruby thêm một class vô danh mới để chứa những loại method như thế này. Hiểu đơn giản thì class vô danh là một class bình thường nhưng được ẩn đi. Nó không có tên cũng như được truy cập bằng tên như các class khác, và bạn cũng không thể khởi tạo một object mới từ nó.

Có một vài cách bạn có thể define một anonymous class:

```ruby
# 1
class Company
  def self.name
    "Framgia VN"
  end
end

# 2
class Company
  class << self
    def name
       "Framgia VN"
    end
  end
end

# 3
class Company
end
def Rubyist.name
   "Framgia VN"
end

#4
class Company
end
Rubyist.instance_eval do
  def name
     "Framgia VN"
  end
end
puts Rubyist.who # => Geek

# 5
class << Company
  def name
     "Framgia VN"
  end
end
```

Cả 5 đoạn code trên đều define một method `Company.name` trả về `"Framgia VN"`
### 3. Gọi method
Khi bạn gọi tới một method, Ruby sẽ làm hai việc sau:
* Tìm method đó, việc này gọi là `method lookup`.
* Thực thi method. Để làm được điều đó, Ruby cần một thứ gọi là `self`.
#### 3.1  `method lookup`
Khi bạn gọi tới 1 method, Ruby sẽ tìm hàm đó trong class của Object hiện tại. Chúng ta cần biết về hai thuật ngữ mới đó là: `receiver` và 
`ancestors chain`.  `receiver` chính là object mà bạn gọi method để dùng. 

Ví dụ, bạn viết một method Company.name(), thì object Company chính là `receiver`. Còn để hiểu về thuật ngữ `ancestors chain` hay chuỗi kế thừa thì  đơn giản nó là đường dẫn để đi từ Object đó tới class root Ruby (BasicObject) (từ con đi tới cha, rồi từ cha đi tới cha của cha),  chuỗi này tính cả việc include các module.

Do đó, để tìm một method, Ruby đầu tiên sẽ đi tới class của receiver, và từ đó tìm dọc theo chuỗi kế thừa cho đến khi tìm thấy method. Khi bạn include 1 module vào class (hoặc trong một module khác), Ruby sẽ tự tạo một class vô danh chứa module đó và thêm class vô danh đó vào chuỗi kết thừa.
#### 3.2 `self`
Trong Ruby, `self` là một biến đặc biệt, luôn luôn trỏ đến object hiện tại.

`self` là `receiver` mặc định cho mọi việc gọi method. Việc này có nghĩa là nếu mình gọi một method mà ko chỉ định cho nó một `receiver` cụ thể (Không có `.` từ bất cứ Object nào khác) thì Ruby sẽ tự động tìm kiếm method trong Object hiện tại

`self` cũng là nơi chứa các `instance variable`. 

Khi ta chạy đoạn sau, Ruby sẽ lần lượt chạy qua 3 bước: 

```ruby
obj.do_method(param)
 ```
 
1.  Chuyển `self` thành `receiver` (`obj`)
2. Tìm method `do_method(param)` trong class của self
3. Thực thi method `do_method(param)`

### 4. Một số method hữu dụng trong Metaprogramming
#### 4.1 Inspect một object
Trong Ruby ta có thể xem thông tin của một Class hay Object trong khi chương trình đang chạy, chúng ta có thể sử dụng một số method như `class()`, `instance_methods()`, `instance_variables()` để làm các việc như vậy: 
```ruby
class Company
  def name
    @company_name = 'Framgia'
    'Framgia VN'
  end
end
obj = Company.new
puts obj.class # => Company
puts obj.class.instance_methods(false) # => name
obj.name # => Framgia VN
puts obj.instance_variables # => @company_name
```
#### 4.2  `send()`
 `send()` là một instance method của class `Object`. Tham số đầu tiền truyền vào hàm là tên của 1 method. Có thể truyền vào cả Sting hoặc Symbol. Tất cả các tham số còn lại đều lần lượt  là các tham số truyền vào method đó. 
 
 ```ruby
 class Hello
  def welcome(*args)
    "Welcome " + args.join(' ')
  end
end
obj = Hello.new
puts(obj.send(:welcome, "John", "Doe"))   # => Welcome John Doe
 ```

`send()` có thể gọi được các private method

```ruby
 class Hello
 private
  def welcome(*args)
    "Welcome " + args.join(' ')
  end
end
obj = Hello.new
puts(obj.send(:welcome, "John", "Doe"))   # => Welcome John Doe
 ```

#### 4.3 `define_method`
`Module#define_method()`  là một private instance method của class Module. Bạn có thể define một  instance method trong `receiver` với `define_method()`. Bạn chỉ cần truyền vào tên method và một block, block này sẽ trở thành body cho method đó.

```ruby
class Person
  define_method :name do |arg|
    arg
  end
end
obj = Person.new
puts(obj.name('John Doe')) # => John Doe
```

#### 4.4 `method_missing`
Khi Ruby ko tìm ra 1 method nhất định thì nó gọi đến method `method_missing()` trên `receiver` gốc. 
Method  `method_missing()` nhận 3 tham số: 
1. Tham số đầu tiên là tên của phương thức mà bạn đang cố gọi tới
2. Tham số thứ hai là những đối số  (*args) được truyền khi gọi tới phương thức đó
3. Tham số thứ ba là một block (&block) những tham số của phương thức. Tham số thứ hai và ba có thể rỗng nếu phương thức gọi tới không tryền tham số
```ruby
def method_missing(m, *args, &block)
end
```
`method_missing()` là một instance method của class `Kernel`, class mà mọi object đều kế thừa. `Kernel#method_missing()` phản hồi bằng việc raise lên exception `NoMethodError`. Ghi đè method `method_missing()` sẽ cho phép bạn gọi tới các method không tồn tại.
```ruby
class Test
  def method_missing(m, *args, &block)
    puts "Called #{m} with #{args.inspect} and #{block}"
  end
end
Test.new.anything # => Called anything with [] and
Test.new.anything(3, 4) { something } # => Called anything with [3, 4] and #<Proc:0x02efd664@tmp2.rb:7>
```
#### 4.5 `remove_method` và `undef_method`
Để loại bỏ các methods nhất định, bạn có thể sử dụng `remove_method`, nếu có tồn tại một method có cùng tên được khai báo ở các class cha thì các method ở các class cha đều không bị loại bỏ. Còn về `undef_method` thì ngược lại, nó chặn việc gọi method đó cho dù method có có trùng tên với một method ở các class cha.
```ruby
class Person
  def name
    puts "person"
  end
end

class Student < Person
  def name
    puts "student"
  end
end

obj = Student.new
obj.name # => student

class Student
  remove_method :name  # loại bỏ khỏi Student, nhưng vẫn có trong Person
end
obj.name # => person

class Student
  undef_method :name   # chặn việc gọi method 'name'
end
obj.name # => NoMethodError
```
#### 4.6 `eval`
Module `Kernel` có một method `eval()` giúp thực thi code trong một đoạn String. Method `eval()` có thể xử lý các String có nhiều dòng, có thể thực thi toàn bộ chương trình nằm trong một string. `eval()` khá chậm - vì gọi đến `eval()` đồng nghĩa với việc Ruby sẽ phải biên dịch đoạn code trong string trước khi thực thi nó. Không chỉ có vậy, `eval()` còn rất nguy hiểm, có thể gây ra các lỗi bảo mật nghiêm trọng do code của chương trình có thể bị can thiệp từ bên ngoài, do đó `eval()` thường được coi là phương án cuối cùng để giải quyết vấn đề.

```ruby
str = "Hello"
puts eval("str + ' Framgia'") # => "Hello Framgia"
```
#### 4.7 `instance_eval`, `module_eval`, `class_eval`
##### `instance_eval`
`Object#instance_eval()` có thể được gọi từ một object nhất định, và cung cấp quyền truy cập vào các private method cũng như là các instance variables của object. Nó có thể được gọi bằng string hoặc một block.
```ruby
class Company
  def initialize
    @name = "Framgia"
  end
end
obj = Company.new
obj.instance_eval do
  puts self # => #<Company:0x2ef83d0>
  puts @name # => Framgia
end
```
***Chú ý**: Chiếc Block bạn truyền vào method `instance_eval()` giúp bạn truy cập vào bên trong object để thực thi đủ thứ ở trong đó. Do đó đã phá vỡ tính đóng gói của OOP và data ở đây đã không còn là private nữa !*

`Object#instance_eval()` còn có thể dùng để thêm class method, ví dụ: 
```ruby
class Company
end
Company.instance_eval do
  def name
    "Framgia"
  end
end
puts Company.name # => Framgia
```
##### `module_eval`, `class_eval` 
`module_eval` và `class_eval` được thực thi trên module và class. `class_eval` được khai báo là một alias của `module_eval`. Chúng được dùng để thêm hoặc lấy về giá trị của class variable từ bên ngoài class.

```ruby
class Company
  @@name = "Framgia"
end
puts Company.class_eval("@@name") # => Framgia
```

Chúng cũng có thể dùng để thêm instance method vào một module hay class. Tuy khác tên nhưng chúng vận hành y hệt nhau và có thể sử dụng co bất kể module hay class nào.

```ruby
class Company
end
Company.class_eval do
  def name
    "Framgia"
  end
end
obj = Company.new
puts obj.name # => Framgia
```
 ***Chú ý:** `class_eval` khai báo  instance method còn `instance_eval` khai báo class method*
#### 4.8 `class_variable_get`, `class_variable_set`
Để thêm hoặc lấy về giá trị của class variable.
* `class_variable_get` nhận 1 tham số symbol biểu thị tên của biến
* `class_variable_set` nhận tham số đầu tiền là symbol biểu thị tên của biến và tham số thứ 2 là giá trị mong muốn gán vào biến đó. 
```ruby
class Company
  @@name = "Framgia"
end
Company.class_variable_set(:@@name, 'Framgia VN')
puts Company.class_variable_get(:@@name) # => Framgia VN
```
#### 4.9 `class_variables`
Method này trả về danh sách tên các class variable dưới dạng mảng các string
```ruby
class Company
  @@name = "Framgia"
  @@country = "VN"
end

class Employee < Company
  @@employee_name = "John Doe"
end

p Company.class_variables # => [:@@name, :@@country]
p Employee.class_variables # => [:@@employee_name]
```

`Employee.class_variables` sẽ chỉ trả về class variable `@@employee_name` vì class variable ko được kế thừa từ `Company`
#### `instance_variable_get`, `instance_variable_set`
 `instance_variable_get` dùng để lấy giá trị của biến instance:
```ruby
class Company
  def initialize(name, country)
    @name, @country = name, country
  end
end

obj = Company.new('Framgia', 'VN')
puts obj.instance_variable_get(:@name) # => Framgia
puts obj.instance_variable_get(:@country) # => VN
```
`instance_variable_set` có thể dùng để thêm biến khởi tạo vào class và object sau khi chúng được tạo.
```ruby
class Company
  def initialize(name, country)
    @name, @country = name, country
  end
end

obj = Company.new('Framgia', 'VN')
puts obj.instance_variable_get(:@name) # => Framgia
puts obj.instance_variable_get(:@country) # => VN
obj.instance_variable_set(:@country, 'Japan')
puts obj.inspect # => #<Company:0x2ef8038 @country="Japan", @name="Framgia">
```

#### `const_get`, `const_set`
`const_get` trả về giá trị của constant: 
```ruby
puts Float.const_get(:MIN) # => 2.2250738585072e-308
```
`const_set` gán giá trị cho một constant và trả về constant đó. Nếu tên constant được truyền vào method không tồn tại thì nó sẽ được tạo mới
```ruby
class Company
end
puts Company.const_set("NAME", "Framgia") # => Framgia
```


### Kết
Ở bài trên mình đã giới thiệu cho các bạn về một số thuật ngữ và các method thường dùng cho việc metaprogramming trong Ruby. Cảm ơn các bạn vì đã theo dõi. (bow)

*Nguồn: *
* http://ruby-metaprogramming.rubylearning.com/
* https://ruby-doc.org