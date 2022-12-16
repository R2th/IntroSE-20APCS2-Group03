Trong bài viết này, mình muốn giới thiệu 6 tính năng hay của Ruby có thể bạn chưa biết. Hãy cùng bắt đầu thôi nào :D
# Tip 1: Tạo hash từ 1 mảng giá trị
Bạn có thể tạo ra 1 Hash từ 1 mảng giá trị với `Hash[...]`. Ví dụ cụ thể như sau:
![](https://images.viblo.asia/821713d0-06f6-49cb-a649-89d15266a86c.png)
# Tip 2: Lambda Literal
Dấu -> (Lambda Literal) cho phép bạn tạo 1 lambda một cách dễ dàng.
```ruby
a = -> { 1 + 1 }
a.call
# => 2

a = -> (v) { v + 1 }
a.call(2)
# => 3
```
# Tip 3: Double star (**)

Double star là 1 mẹo nhỏ giúp code ruby gọn gàng hơn. Hãy xem ví dụ dưới đây:
```ruby
def my_method(a, *b, **c)
  return a, b, c
end
```
`a` là 1 param bình thường, `*b` sẽ lấy tất cả param được truyền sau `a` và truyền vào 1 mảng, `**c` sẽ lấy các giá trị được truyền vào dạng `key: value` ở cuổi method.
Cụ thể:

```ruby
# 1 tham số:
my_method(1)
# => [1, [], {}]
```

```ruby
# Nhiều hơn 1 tham số
my_method(1, 2, 3, 4)
# => [1, [2, 3, 4], {}]
```

```ruby
# Nhiều hơn 1 tham số + hash-style params
my_method(1, 2, 3, 4, a: 1, b: 2)
# => [1, [2, 3, 4], {:a=>1, :b=>2}]
```

# Tip 4: Double Pipe Equals
Double Pipe Equals là cách tốt để viết code ngắn gọn.
Cách viết:
`a ||= b`  tương đương với `a || a = b`
Xét method sau:
```
def total
  @total ||= (1..100000000).to_a.inject(:+)
end
```
Biến @total sẽ chỉ được tính toán trong lần đầu tiên được gọi, rất phù hợp cho method tính toán.
# Tip 5: Tạo 1 mảng chữ cái và số
Bạn có thể tạo ra 1 mảng chữ cái hoặc số chỉ trong 1 nốt nhạc :D

A - Z
```ruby
('a'..'z').to_a
# => ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
```

1 - 10
```ruby
(1..10).to_a
# => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
# Tip 6: Tap
Tap là một method hay làm cho code dễ đọc hơn. Xét ví dụ sau:
```ruby
class User
  attr_accessor :a, :b, :c
end
```
Bây giờ, giả sử bạn muốn khởi tạo User mới và gán một giá trị cho từng thuộc tính của User đó. Bạn có thể làm như sau:
```ruby
def my_method
  o = User.new
  o.a = 1
  o.b = 2
  o.c = 3
  o
end
```
Hoặc là dùng Tap như sau:
```ruby
def my_method
  User.new.tap do |o|
    o.a = 1
    o.b = 2
    o.c = 3
  end
end
```
Hy vọng rằng bài viết này có thể giúp ích cho bạn. Hẹn gặp lại trong các bài viết sắp tới :D
# Tài liệu tham khảo
https://devblast.com/b/ruby-tricks-improve-code