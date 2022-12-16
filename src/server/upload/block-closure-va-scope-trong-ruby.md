Bài viết lần này mình xin được giới thiệu 1 cách cơ bản về Block, Closure và cách Ruby quản lý Scope.

## Cơ bản về Block

- Block được định nghĩa trong cặp dấu `{}` hoặc `do...end`. Một convention cơ bản thì sử dụng `{}` khi viết block trên 1 hàng và `do...end` khi viết block trên nhiều hàng.
- Block chỉ được định nghĩa khi gọi một method và method gọi block thông qua từ khóa `yield`
- Bên trong method, bạn có thể kiểm tra lời gọi method hiện tại có tồn tại block hay không bằng hàm `Kenel#block_given?`

```ruby
def a_method
  return yield if block_given?
  "no block"
end

a_method                     # => "no block"
a_method {"this is a block"} # => "this is a block"
```

## Closures

Khi run một đoạn code, nó cần một môi trường chứa: local variables, instance variables, self, .... Toàn bộ những thành phần này được bao bọc trong object, nên chúng ta có thể gọi chúng là `bindings`.

Một đoạn code thực thi thực sự sẽ cần 2 thứ: đoạn code đó và bộ `bindings`

![](https://images.viblo.asia/37e04bf2-cc58-431e-a2a9-ddac668dc72c.jpg)

Block sẽ bao gồm cả 2 thành phần trên và sẵn sàng để thực thi. Vì block không phải là object nên bạn sẽ tự hỏi rằng block sẽ lấy `bindings` ở đâu. Khi bạn định nghĩa block, nó sẽ lấy `bindings` tại thời điểm hiện tại, và mang chúng theo khi bạn truyền một block vào method

```ruby
def my_method
  x = "Good bye"
  yield("Tom")
end

x = "Hello"
my_method {|y| "#{x}, #{y}!"}
# => "Hello, Tom!"
```

Khi bạn define một block, nó sẽ lấy `bindings` hiện tại, như ví dụ trên là biến local `x`. Sau đó, bạn truyền block này vào một method với bộ `bindings` của method đó. Trong ví dụ trên, bộ `bindings` của `my_method` có biến local cũng tên là `x`. Nhưng block chỉ có thể nhìn thấy biến `x` xung quanh nơi nó định nghĩa, không thể nhìn thấy biến `x` của method mà nó được truyền vào.

Mặt khác, bạn cũng có thể định nghĩa thêm `bindings` bên trong block, nhưng những biến này sẽ biến mất sau khi kết thúc block

```ruby
def just_yield
  yield
end

top_var = 1

just_yield do
  top_var += 1
  local_var = 1
end

top_var   # => 2
local_var # => Error
```

Bởi vì những tính chất trên nên có thể gọi block là một bao đóng (Closures). Để hiểu thêm về closures, chúng ta cùng tìm hiểu về phạm vi của `bindings`, đó là `scope`.

## Scope

Hãy tưởng tượng bạn đặt một debugger trong chương trình Ruby. Bạn được chương trình thực thi đưa tới điểm breakpoint , khung cảnh xung quanh mà bạn nhìn thấy chính là scope.

Bạn có thể nhìn thấy `bindings` trong scope. Đó là các local variables, là các instance variables, methods của current object mà bạn đang đứng. Xa hơn bạn có thể nhìn thấy các constants, các global variables.

### Changing scope

Ví dụ sau sẽ cho thấy scope thay đổi như thế nào khi chương trình thực thi, tracking thông qua `Kenel#local_variables`

```ruby
v1 = 1

class MyClass
  v2 = 2
  local_variables # => [:v2]

  def my_method
    v3 = 3
    local_variables
  end

  local_variables # => [:v2]
end

obj = MyClass.new
obj.my_method   # => [:v3]
obj.my_method   # => [:v3]
local_variables # => [:v1, :obj]
```

Chương trình bắt đầu trong scope Top-Level và định nghĩa biến local `v1`. Sau đó chương trình tiếp tục vào scope `MyClass`. Ở đây, chương trình định nghĩa `v1` và `my_method`, nhưng đoạn code trong `my_method` thực sự chưa được thực thi. Kết thúc class, chương trình trở lại với scope Top-Level. Lúc này, chương trình định nghĩa một object của `MyClass` trong biến `obj`. Khi `my_method` được gọi, chương trình sẽ mở ra một scope mới và định nghĩa biến local `v3`, sau khi method kết thúc, biến v3 sẽ biến mất. Điều gì xảy ra khi `my_method` được gọi thêm 1 lần nữa? Lúc đó một scope mới sẽ được mở ra và một biến `v3` mới được định nghĩa và biến mất sau khi kết thúc method. Cuối cùng, chương trình trở về với scope Top-level, nơi đang có 2 biến `v1` và `obj`.

Có thể thấy rằng, khi chương trình thay đổi scope, một số `bindings` sẽ được thay thế bằng một bộ `bindings` mới. Nó không phải thay thế tất cả. Ví dụ instance variables sẽ vẫn tồn tại qua các method được gọi bởi một object. Nói một cách dễ hiểu, local variables sẽ thay đổi khi scope thay đổi.

### Scope Gates

Có 3 nơi mà chương trình sẽ thay đổi scope:
- Định nghĩa Class `class`
- Định nghĩa Module `module`
- Methods `def`

Scope sẽ thay đổi scope khi chương trình đi vào hoặc kết thúc những thành phần trên. Tại mỗi điểm bắt đầu và kết thúc như vậy gọi là một `Scope Gate`.

Có một chút khác biệt là `class` và `module` sẽ thực thi và thay đổi scope ngay lập tức, trong khi `def` chỉ thực thi và thay đổi scope khi bạn gọi đến chúng.

Nhưng bạn sẽ phải làm gì khi muốn pass 1 biến qua những điểm này? Hãy trở lại với Block

### Scope Flat và Shared Scope

```ruby
my_var = "My var"

class MyClass
  # how to print my_var here

  def my_method
    # and here
  end
end
```

Như đã đề cập ở phần Scope, biến local sẽ không thể đi qua Scope Gates. Vậy muốn thực hiện yêu cầu trên thì chúng ta phải định nghĩa class, và method mà không cần Scope Gates.

Nếu nghĩ lại, chúng ta có thể biết rằng MyClass thực chất là một object của class `Class`. Vì vậy chúng ta hoàn toàn có thể định nghĩa MyClass thông qua Class mà không cần Scope Gates. Với method thì chúng ta đã biết đến `Module#define_method`

```ruby
my_var = "My var"

MyClass = Class.new do
  puts "#{my_var} is in class"

  define_method :my_method do
    puts "#{my_var} is in method"
  end
end
# => "My var is in class"

MyClass.new.my_method
# => "My var is in method"
```

Tương tự với class, bạn có thể định nghĩa một module bằng `Module.new`

Nếu bạn replace Scope Gates và cho phép một scope có thể nhìn thấy variables từ những scope khác, kỹ thuật này gọi là "Flattening the scope", hay nói ngắn gọn là **Flat Scope**

Tuy nhiên, đôi lúc bạn chỉ muốn share variables cho một số methods nhất định. Lúc này, hãy định nghĩa những method đó trong một Flat Scope, kỹ thuật này gọi là **Shared Scope**

```ruby
def my_method
  shared = 0

  define_method :counter do
    shared
  end

  define_method :inc do |x|
    shared += x
  end
end

my_method
counter # => 0
inc(2)
counter # => 2
```

Qua bài viết, hi vọng các bạn hiểu được cơ bản về Closure và cách Ruby quản lý Scope. 

Bài viết tham khảo từ cuốn sách **Metaprogramming Ruby 2**