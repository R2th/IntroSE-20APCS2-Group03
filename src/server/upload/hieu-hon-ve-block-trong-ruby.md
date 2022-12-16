![](https://images.viblo.asia/96f1ffc9-8ec7-480f-aebc-f2d4ee3e435b.jpg)

`Block` là một trong những tính năng mạnh mẽ nhất và thường bị bỏ qua của ruby.  Phải thú nhận rằng mình đã mất một thời gian để tìm ra cách các `block` ruby hoạt động và làm thế nào chúng có thể hữu ích trong thực tế.

Có một cái gì đó về `yield` làm cho các `block` rất khó hiểu cho người mới bắt đầu. Mình sẽ nói về một số khái niệm và cung cấp một vài ví dụ để đến cuối bài này, bạn sẽ có một sự hiểu biết vững chắc hơn về các `block` ruby.

### Ruby `block` là gì?

Rất đơn giản, một `block` là một đoạn code nằm bên trong cặp `do` - `end` hoặc `{` - `}` (nếu khai báo trên một dòng). Hãy xem ví dụ sau:

```ruby
[1, 2, 3].each do |n|
  # Prints out a number
  puts "Number #{n}"
end
```

Ví dụ trên tương đương với:

```ruby
[1, 2, 3].each{|n| puts "Number #{n}"}
```

Bên trong `||`, `n` được gọi là tham số của `block` đó và giá trị của nó trong trường hợp này sẽ lần lượt là từng số trong mảng `[1, 2, 3]`. Kết quả in ra thì dễ dàng thấy được như sau:

```
Number 1
Number 2
Number 3
```

Chú ý là bất kỳ một method nào cũng có thể nhận một `block`, không quan trọng là có sử dụng nó hay không, ví dụ:

```ruby
def my_method
  puts "something"
end

my_method{"hello"} # => "something"
```
Ở ví dụ trên thì `block` đã bị bỏ qua nhưng bạn vẫn có thể gọi nó.

### `yield` hoạt động như nào?

Đây là điều mà bạn sẽ rất dễ nhầm lẫn xoay quanh ruby `block`. Cùng xem một ví dụ sau:

```ruby
def my_method
  puts "reached the top"
  yield
  puts "reached the bottom"
end

my_method do
  puts "reached yield"
end

# output
reached the top
reached yield
reached the bottom
```

Cơ bản, khi gọi đến `my_method`, đến dòng `yield` thì đoạn code bên trong `block` sẽ được thực hiện. Đến khi thực hiện xong hành động bên trong `block` kia, dòng tiếp theo trong `my_method` mới được thực hiện tiếp. Xem hình bên dưới để hiểu rõ hơn:

![](https://images.viblo.asia/a095a60a-3226-4975-83a0-ed3a8d3a1de1.png)

Cũng dễ hiểu phải không nào. 

#### Truyền `block` đến method

Nếu bạn gọi `yield` bên trong một method, khi đó thì tham số `block` trở thành bắt buộc và method đó sẽ trả ra exception nếu như nó không nhận được một `block`.
 
Nếu muốn việc truyền `block` không còn bắt buộc nữa, bạn có thể sử dụng method `block_given?` - method này sẽ trả vể `true/false` phụ thuộc vào việc bạn có truyền `block` lên hay không?

```ruby
def my_method
  puts "reached the top"
  if block_given?
    yield
  else
    puts "no block"
  end
  puts "reached the bottom"
end
```

#### `yield` cũng nhận vào tham số

Bất kỳ tham số nào được truyền cho `yield` sẽ đóng vai trò là tham số cho `block`. Do đó, khi `block` chạy, nó có thể sử dụng các tham số được truyền lên đó. Các tham số này có thể là cácc biến cục bộ trong method có chứa `yield`.

Chú ý một điều là `thứ tự` các đối số là quan trọng bởi vì nó sẽ quyết định thứ tự các tham số mà `block` sẽ nhận được. Hãy xem ví dụ như hình bên dưới.

![](https://images.viblo.asia/440d30db-bd48-4d9b-98c1-681dfb1898b9.png)

Một điều chú ý nữa, các tham số bên trong `block` (ví dụ trên là `name` và `age`) chỉ là phạm vi `cục bộ` bên trong `block` đó mà thôi. Bạn không thể sử dụng bên ngoài `block`. Ví dụ:

```ruby
def my_method
  yield("John", 2)
  puts "Hi #{name}"
end

my_method{|name, age| puts "#{name} is #{age} years old"}

# output
John is 2 years old
NameError: undefined local variable or method `name' for #<IRB::...>
```

### Giá trị trả về

`yield` trả về biểu thức cuối cùng bên trong `block`, hay có thể nói giá trị trả về của `yield` chính là giá trị trả về cuả `block`.

```ruby
def my_method
  value = yield
  puts "value is: #{value}"
end

my_method{2}

value is 2
```

### Ý nghĩa của `&block`(ampersand parameter)

`&object` sẽ thực hiện dựa vào object đó:
* Nếu là `block`, nó chuyển object thành một `Proc`
* Nếu là `Proc`, nó chuyển object thành một `block`
* Nếu trường hợp khác, nó gọi `to_proc` trong nó và sau đó chuyển object thành `block`

Hãy xem xét ví dụ đầu tiên với object là một `block`:

```ruby
def a_method(&block)
  block
end

a_method{"x"} # => #<Proc:...>
```

Nếu object là một `Proc` thì sao?

```ruby
a_proc = Proc.new{"x"}
a_method(&a_proc) # => #<Proc:...>
```

Vì đối số đã là một `Proc` nên nó được chuyển thành một `block`.

Lưu ý nhỏ, nếu object là một `Proc`, nó được duy trì trạng thái `lambda?`. Cụ thể là kiểm tra đối số và có các kết quả trả về của chúng.

```ruby
a_lambda = ->() {"x"} => #<Proc:... (lambda)>
a_method(&a_lambda) # => #<Proc:... (lambda)>
```

Với trường hợp truyền lên đối số không phải là `block` hoặc `Proc`.

```ruby
a_method(&:even?) # => #<Proc:...>
```

Có điều này là vì lời gọi `Symbol#to_proc` trả về một `Proc` có thể lấy một đối tượng và gọi phương thức bạn đã chỉ định trên đó. Có vẻ hơi khó hiểu chút, hãy cùng xem ví dụ bên dưới:

```ruby
a_proc = :foobar.to_proc
a_proc.call("some string")
# => NoMethodError: undefined method `foobar' for "some string":String
```

Đoạn code trên sẽ thực hiện:
1. Gọi `to_proc` trên `:foobar` sẽ trả về một `Proc`. trong trường hợp này là `a_proc`
2. `a_proc` sẽ gọi method `foobar`trên bất kỳ đối tượng nào bạn gửi nó

Nếu bạn định nghĩa lại `to_proc` trong Ruby, trông nó sẽ như này:

```ruby
class Symbol
  def to_proc
    Proc.new { |obj, *args| obj.send(self, *args) }
  end
end
```

### `.map(&:something)` hoạt động như nào?

`map` là một ví dụ hay để hiểu hơn về ký hiệu `&` này. Nó lấy một đối tượng đếm được (vd `[1, 2, 3]`) và một `block`. Sau đó, với từng phần tử, nó thực thi `block` với các phần tử đó chính là các đối số. Kết quả trả về của `block` được sử dụng để xây dựng mảng kết quả cuối cùng

```ruby
[1, 2, 3].map {|n| n.even?}

# could be written as

[1, 2, 3].map(&:even?)

# output 
[false, true, false]
```

### Gọi `yield` nhiều lần

Bạn có thể gọi đến `yield` nhiều lần bên trong một method. Hãy xem cách bạn có thể viết một method tương tự `map` method sau:

```ruby
def my_map(array)
  new_array = []

  for element in array
    new_array.push yield(element)
  end

  new_array
end

my_map([1, 2, 3]) do |number|
  number * 2
end

# output
[2, 4, 6]
```

### Khởi tạo đối tượng với giá trị mặc định

Một mô hình thú vị mà bạn có thể sử dụng với các block ruby là khởi tạo một đối tượng với các giá trị mặc định.

```ruby
class Car
  attr_accessor :color, :doors

  def initialize
    yield(self)
  end
end

car = Car.new do |c|
  c.color = "Red"
  c.doors = 4
end

puts "My car's color is #{car.color} and it's got #{car.doors} doors."

# output

My car's color is Red and it's got 4 doors.
```

Cách thức hoạt động ở đây là bạn có một trình khởi tạo gọi `yield(self)`, và `self` ở đây là đối tượng được khởi tạo.

### Ví dụ về `block` trong Ruby
Hãy cùng xem xét một số ví dụng gần gũi với thực thế.

#### Đóng gói text trong thẻ `html`

`Block` là một cách hoàn hảo khi bạn muốn đóng gói một đoạn code động vào bên trong một số code tĩnh. Nên nếu bạn muốn tạo một thẻ `html` cho một số text, text thì động và thẻ bao bọc bên ngoài thì tĩnh, không thay đổi. Ta có thể làm như sau:

```ruby
def wrap_in_h1
  "<h1>#{yield}</h1>"
end

wrap_in_h1{"Here's my heading"}
# => "<h1>Here's my heading</h1>"

wrap_in_h1{"Ha" * 3}
# => "<h1>HaHaHa</h1>"
```

Và khi bạn muốn tái sử dụng lại một số hành vi nhưng cần làm gì đó hơi khác với nó. Xem ví dụ sau:

```ruby
def wrap_in_tags(tag, text)
  html = "<#{tag}>#{text}</#{tag}>"
  yield html
end

wrap_in_tags("title", "Hello"){|html| Mailer.send(html)}
wrap_in_tags("title", "Hello"){|html| Page.create(body: html)}
```

Ở trên, bạn đang gửi `<title>Hello</title>` qua email, còn ở dưới thì bạn đang tạo ra bản ghi `Page`. Cả 2 đều đang gọi method `wrap_in_tags` nhưng lại có hành vi khác nhau.

#### Ghi chú

Giả sử bạn muốn xây dựng cách để lưu nhanh các idea vào bảng trong database. Để làm việc đó, bạn cần đưa idea vào ghi chú vào phải có method xử lý các kết nối đến database.

```ruby
class Note
  attr_accessor :note

  def initialize(note=nil)
    @note = note
    puts "@note is #{@note}"
  end

  def self.create
    self.connect
    note = new(yield)
    note.write
    self.disconnect
  end

  def write
    puts "Writing \"#{@note}\" to the database."
  end

private

  def self.connect
    puts "Connecting to the database..."
  end

  def self.disconnect
    puts "Disconnecting from the database..."
  end
end

Note.create { "Foo" }

# output

Connecting to the database...
@note is Foo
Writing "Foo" to the database.
Disconnecting from the database...
```

Gọi `Note.create { "Foo" }` và không cần lo lắng về mở và đóng kết nối đến database.

#### Tìm các phần tử chia hết trong mảng

Giả sử bạn muốn tìm ra các phần tử chia hết cho 3 trong một mảng, hãy xem làm với `block` trong ruby như nào:

```ruby
class Fixnum
  def to_proc
    Proc.new do |obj, *args|
      obj % self == 0
    end
  end
end

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].select(&3)
puts numbers

# output

3
6
9
```

### Kết

Kết lại thì bạn có thể hiểu đơn giản `block` nó là một đoạn code, và `yield` sẽ cho phép bạn đưa đoạn code đó vào một chỗ nào đó trong method của bạn. Điều đó có nghĩa là bạn có thể có một method hoạt động với nhiều cách khác nhau, bạn sẽ không phải viết nhiều method mà có thể sử dụng lại nó.

Cám ơn bạn đã theo dõi bài viết.

***

### Tham khảo

- https://mixandgo.com/learn/mastering-ruby-blocks-in-less-than-5-minutes
- https://mixandgo.com/learn/how-to-use-the-ruby-map-method