Sử dụng một block là quy trình gồm 2 bước: Một là viết code vào đó, hai là thực thi code đó. Định nghĩa "Đóng gói code trước, thực thi nó sau" không phải là duy nhất với block. Trong Ruby có ít nhất 3 nơi bạn có thể đóng gói code:
- `proc`, là một block object
- `lambda`, tương tự như proc
- `method`

### Proc objects

Hầu hết mọi thứ trong Ruby đều là object, nhưng block thì không phải. Nhưng tại sao bạn phải quan tâm về điều đó? Hãy tưởng tượng bạn muốn lưu trữ một block và thực thi chúng sau, để làm được điều này bạn phải cần 1 object.

Ruby cung cấp một class là `Proc`, cho phép một block được trở thành một object.
Khai báo một proc với `Proc.new` và thực thi nó với `Proc#call`

```ruby
inc = Proc.new {|x| x + 1}
inc.class # => Proc
inc.call(2) # => 3
```

Ruby cung cấp 2 method để convert block thành Proc là `proc` và `lambda`

```ruby
# use proc
inc = proc {|x| x + 1}

# use lambda
inc = lambda {|x| x + 1}
# hoặc 1 cách viết khác của lambda
inc = ->(x) {x + 1}
```

**Toán tử &**

Một block giống như là một argument vô danh của method. Bạn có thể thực thi block trong method bằng cách sử dụng `yield`. Tuy nhiên, trong 2 trường hợp sau thì `yield` không thể:
- Bạn muốn pass một block của method này vào một method khác (thậm chí là vào block khác)
- Bạn muốn convert block thành một object Proc

Để làm được điều này, đầu tiên bạn cần 1 cái tên cho block. Để đính kèm một `bindings` với block, bạn có thể thêm một argument đặc biệt vào method, nó nằm cuối cùng của list arguments và có thêm tiền tố `&`

```ruby
def math(a, b)
  yield(a, b)
end

def do_math(a, b, &op)
  math(a, b, &op)
end

do_math(2, 3) {|x, y| x * y} # => 6
```

Ở ví dụ trên, toán tử `&` cũng đã đồng thời convert block thành một object Proc.

```ruby
def my_method &pr
  pr
end

a = my_method {"Hello"}
a.class # => Proc
a.call # => "Hello"
```
Bạn có thể convert block thành Proc bằng toán tử `&`, vậy nếu bạn muốn làm ngược lại convert Proc thành block thì làm thế nào? Vẫn là toán tử `&`:

```ruby
def my_method
  "Hello #{yield}"
end

p = Proc.new {"Canh"}
my_method(&p)
# => "Hello Canh"
```

### procs vs lambdas

Chúng ta có nhiều cách để tạo ra một Proc: Proc.new, lambda, toán tử `&`. Tất cả object tạo ra đều là Proc. Tuy nhiên, có một chút khác biệt giữa lambda với phần còn lại - gọi chung là `procs`. Khác biệt tuy ít nhưng khá quan trọng để chúng ta định nghĩa thành 2 loại của Proc là `procs` và `lambdas` (bạn cũng có thể dùng method `Proc#lambda?` để kiểm tra xem Proc object đó có phải là lambda hay không).
Hai điểm khác biệt giữa procs và lambdas là từ khóa `return` và việc check arguments

**procs, lambdas with return keyword**

Trong 1 lambda, `return` sẽ returns từ lambda đó

```ruby
def double(callable_obj)
  callable_obj.call * 2
end

l = lambda {return 10}
double(l) # => 20
```

Trong 1 proc, `return` sẽ returns từ scope mà proc đó được định nghĩa:

```ruby
def another_double
  p = Proc.new {return 10}
  result = p.call
  # Method sẽ được return tại đây, những dòng code sau không thực thi
  puts "Hello"
  return result * 2
end

another_double # => 10
```

Trở lại với hàm `double` ở trên, nếu thay lambda bằng proc

```ruby
p = Proc.new {return 10}
double(p) # => LocalJumpError
```

Chương trình sẽ return từ scope mà proc được định nghĩa, chính là Top-Level. Nhưng bạn không thể return từ scope Top-Level. Để fix lỗi trên bạn có thể remove từ khóa `return` trong proc

**procs, lambdas with arguments**

Điểm khác nhau thứ 2 giữa procs và lambdas chính là cách nhận arguments truyền vào.

procs sẽ không quan tâm tới việc block muốn nhận bao nhiêu arguments

```ruby
p = Proc.new {|a, b| [a, b]}
p.call(1, 2, 3) # => [1, 2]
p.call(1)       # => [1, nil]
```

Trong khi lambdas sẽ raise error khi bạn truyền vào không đúng tham số mà block mong muốn

```ruby
l = lambda {|a, b| [a, b]}
l.call(1, 2, 3) # => ArgumentError
l.call(1)       # => ArgumentError
l.call(1, 2)    # => [1, 2]
```

Một cách thông thường chúng ta có thể thấy lambdas khá giống với method, nghiêm ngặt với tham số truyền vào, exists khi return. Chính vì vậy nếu không có lí do đặc biệt, chúng ta sẽ sử dụng lambdas thay vì procs.

### Method objects

Thành viên cuối cùng trong gia đình callable objects là method objects.
```ruby
class MyClass
  def initialize x
    @x = x
  end

  def my_method
    @x
  end
end

obj = MyClass.new(1)
m = obj.method :my_method
m.call # => 1
````

Bằng cách gọi hàm `Kenel#method` bạn có thể biến method đó thành một object của class Method, và thực thi sau với `Method#call`

Một Method object tương tự như một block hoặc một lambda. Bạn có thể convert một Method thành một proc bằng `Method#to_proc`. Hoặc bạn cũng có thể convert 1 block thành 1 method bằng `define_method`.

Tuy nhiên, có một sự khác biệt quan trọng giữa lambdas và methods đó là: lambdas thì được đánh giá bên trong scope nó định nghĩa (nó là một bao đóng), còn methods thì được đánh giá bên trong object gọi nó.

Bài viết tham khảo từ cuốn sách **Metaprogramming Ruby 2**