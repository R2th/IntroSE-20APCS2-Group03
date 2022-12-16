# 1. Tạo hash từ danh sách các giá trị
Bạn có thể tạo 1 hash từ 1 danh sách các giá trị bằng cách sử dụng `Hash[]` :

```Ruby
Hash['key1', 'value1', 'key2', 'value2']

# => {"key1"=>"value1", "key2"=>"value2"}
```

# 2. Lambda Literal ->
Một cách mới để định nghĩa scope  trong Rails:

```Ruby
a = -> { 1 + 1 }
a.call
# => 2

a = -> (v) { v + 1 }
a.call(2)
# => 3
```

# 3. Double star (**)
2 dấu * là một mẹo nhỏ khá gọn trong Ruby.

```Ruby
def my_method(a, *b, **c)
  return a, b, c
end
```

`a` là tham số thông thường. `*b` sẽ lấy tất cả các tham số sau tham số đâu tiên (đã được sử dụng dành cho a) và đặt chúng vào 1 mảng. `c**` sẽ lấy tất cả các tham số có format key: value và tạp thành hash.

Ví dụ:

```Ruby
my_method(1)
# => [1, [], {}]
```

```Ruby
my_method(1, 2, 3, 4)
# => [1, [2, 3, 4], {}]
```

```Ruby
my_method(1, 2, 3, 4, a: 1, b: 2)
# => [1, [2, 3, 4], {:a=>1, :b=>2}]
```

# 4. Xử lý một đối tượng và một mảng theo cùng cách
Đôi khi bạn muốn cung cấp một tùy chọn phù hợp với cả một object hoặc một mảng. Thay vì kiểm tra loại đội tượng bạn nhận được, bạn có thể sử dụng `[*something]` hoặc `Array(something)`

Giả sử có 2 biến như sau:

```Ruby
stuff = 1
stuff_arr = [1, 2, 3]
```

Sử dụng `[*...]`:

```Ruby
[*stuff].each { |s| s }
[*stuff_arr].each { |s| s }
```

Tương tự khi sử dụng `Array(...)`:

```Ruby
Array(stuff).each { |s| s }
Array(stuff_arr).each { |s| s }
```

# 5. Double Pipe Equals ||=
Đây là 1 công cụ tuyệt vời để rút gọn code.

Nó tương đương với:

```Ruby
a || a = b # Correct
```

Chứ không phải:

```Ruby
a = a || b # Wrong
```

Ví dụ:

```Ruby
def total
  @total ||= (1..100000000).to_a.inject(:+)
end
```

Bây giờ dù bạn có một phương thức `total` khác để lấy tổng giá trị thì nó cũng chỉ lấy giá trị của lần gọi đầu tiên.

# 6. Tham số bắt buộc
Thay vì chỉ xác định một phương thức có hash là tham số như thế này:

```Ruby
def my_method({})
end
```

Bạn có thể chỉ định các key mà bạn mong muốn, thậm chí là xác định giá trị mặc định cho chúng. Ví dụ với `a` và `b` là các tham số bắt buộc.

```Ruby
def my_method(a:, b:, c: 'default')
  return a, b, c
end
```

Nếu chúng ta gọi hàm mà không truyền `b` vào thì nó sẽ không hoạt động:

```Ruby
my_method(a: 1)
# => ArgumentError: missing keyword: b
```

Vì `c` có giá trị mặc định nên chúng ta có thể gọi hàm chỉ với `a` và `b`

```Ruby
my_method(a: 1, b: 2)
# => [1, 2, "default"]
```

Hoặc tất cả chúng, khi đó giá trị của `c` truyền vào sẽ thay thế cho giá trị "default"

```Ruby
my_method(a: 1, b: 2, c: 3)
# => [1, 2, 3]
```

Bạn cũng có thể khai báo sẵn 1 hash rồi truyền vào hàm như một tham số.

```Ruby
hash = { a: 1, b: 2, c: 3 }
my_method(hash)
# => [1, 2, 3]
```

# 7. Tạo mảng của bảng chữ cái hoặc chữ số

Bạn có thể tạo một danh sách các số hoặc đặt toàn bộ bảng chữ cái trong một mảng. 

A to Z

```Ruby
('a'..'z').to_a
# => ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
```

1 to 10

```Ruby
(1..10).to_a
# => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

# 8. Tap
`Tap` là một hàm nhỏ để cải thiện khả năng đọc code. Ví dụ ta có một class sau:

```Ruby
class User
  attr_accessor :a, :b, :c
end
```

Giả sử bạn muốn tạo một người dùng mới và gán các giá trị cho mỗi attributes của nó.

```Ruby
def my_method
  o = User.new
  o.a = 1
  o.b = 2
  o.c = 3
  o
end
```

Ta cũng có thể dùng `tap` để làm điều này:

```Ruby
def my_method
  User.new.tap do |o|
    o.a = 1
    o.b = 2
    o.c = 3
  end
end
```

# Nguồn
https://devblast.com/b/ruby-tricks-improve-code