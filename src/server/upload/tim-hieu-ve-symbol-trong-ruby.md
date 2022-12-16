Symbol trong Ruby là một khái niệm khá thú vị và được sử dụng rất nhiều trong Ruby. Nếu bạn đã từng làm việc với với Ruby on Rails bạn sẽ thấy trong framework sử dụng rất nhiều symbol. Và có thể một số bạn sẽ nhầm lẫn giữa Symbol với String. Vì vậy hôm nay chúng ta sẽ đi tìm hiểu xem symbol là gì và có điểm giống và khác nhau với string ở điểm nào?
# Symbol là gì?
Symbol là một object mà giá trị của nó thường được dùng để đại diện cho tên (ví dụ như tên của khoá trong mảng, tên phương thức trong đối tượng…).vd:
```ruby
    symbol = :hello
```
```ruby
    attr_reader :title
```
`:title` sau phương thức `attr_reader` là một **symbols** đại diện cho `@title` instance variable.
Ngoài ra chúng ta có thể sử dụng symbols như hash keys.
```ruby 
    hash = {a: 1, b: 2, c: 3}
```

# So sánh symbol với string
- Các symbol không phải là string.
- Symbol có thể được mô tả như là một định danh.
- Symbol giống với String ở chỗ là đều có một số phương thức như: `length`、`upcase`、`downcase`... Nhưng khác với string ở một số điểm sau:
## 1 String có thể thay đổi được, còn symbol thì không
```ruby
#String:
    > str = "hello world!"
    => "hello world!"
    > str[0]
    => "h"
    > str[0] = "H"
    => "H"
    > str
    => "Hello world!"
    
#Symbol:
    > h = :hash 
    => :hash
    > h[0]
    => "h"
    > h[0] = "H"
    NoMethodError: undefined method `[]=' for :hash:Symbol
```
## 2 Hiệu suất xử lý của symbol tốt hơn string
Ta cùng xét một ví dụ sau:
```ruby
#String
    puts "hello world".object_id
    puts "hello world".object_id
    puts "hello world".object_id
    
    # => 3102960
    # => 3098410
    # => 3093860

#Symbol
    puts :"hello world".object_id
    puts :"hello world".object_id
    puts :"hello world".object_id
    
    # => 239518
    # => 239518
    # => 239518
```
 `Object_id` là phương thức trả về định danh của đối tượng. Nếu các đối tượng cùng chung một `object_id` thì giống nhau, nghĩa là cùng trỏ tới 1 đối tượng trong vùng nhớ.<br/>
  Trong ví dụ trên, ta có thể thấy 3 `symbol` có cùng một `object_id` là `239518`, nghĩa là chúng cùng trỏ tới một đối tương trong vùng nhớ. Còn 3 `string` thì có 3 `object_id` khác nhau có nghĩa là chúng tham chiếu tới 3 đối tượng khác nhau trong vùng nhớ. Bất cứ khi nào sử dụng `new string` thì ruby sẽ cấp phát một vùng nhớ mới cho nó.<br/>
  Máy tính sẽ cần ít bộ nhớ hơn nếu sử dụng symbol thay vì string vì thế sẽ tối ưu performance hơn.<br/>
## 3 Thực hiện so sánh symbol nhanh hơn string
Chúng ta có một ví dụ sau:
```ruby
require 'benchmark'

str = Benchmark.measure do
  10_000_000.times do
    "test" == "test"
  end
end.total

sym = Benchmark.measure do
  10_000_000.times do
    :test == :test
  end
end.total

puts "String: " + str.to_s
puts "Symbol: " + sym.to_s

# String: 4.48
# Symbol: 2.39
```
Như ta thấy, so sánh giữa các symbol nhanh hơn nhiều so với chuỗi, đó là bởi vì các symbol chỉ so sánh nếu chúng là cùng một đối tượng (có id đối tượng giống nhau).

# Một số cách khai báo symbol
Ngoài cách khai báo như lúc ban đầu
```ruby
symbol = :hello
```
Thì chúng ta có thể viết
```ruby
symbol = :"hello"
```
Hoặc sử dụng phương thức intern trong lớp String
```ruby
symbol = "hello".intern
```
Nếu bạn muốn khởi tạo một mảng symbol mà không cần ký tự **`:`** thì ta làm như sau
```ruby
symbols = %i(a b c)
[:a, :b, :c]
```
Và đối với string khi chúng ta không cần ký tự **`""`**
```ruby
strings = %w(a b c)
["a", "b", "c"]
```

# Chuyển đổi giữa symbol với string
Để  chuyển đổi từ symbol sang string chúng ta sử dụng method to_s
```ruby
> symbol = :hello
=> :hello
> symbol.to_s
=> "hello" 
```

Để chuyển đổi từ string sang symbol chúng ta sử dụng method to_sym
```ruby
> symbol = "hello"
=> "hello"
> symbol.to_sym
=> :hello 
```

# Kết luận
Bởi vì symbol là chuỗi bất biến, và việc so sánh hiệu suất vốn nhanh hơn so với string nên nó rất thích hợp để làm keys của Hash.<br/>
Mặc dù bạn có thể convert symbol sang string, nhưng sau khi tất cả các symbol không phải là string nên nó sẽ không có các phương pháp nhiều như string. Do đó, nếu bạn muốn sử dụng những phương pháp hữu ích của lớp String, thì nên chọn String.<br/>
Trên đây là bài viết của mình, bài viết còn có nhiều thiết sót, mong mọi người góp ý thêm, mình xin cảm ơn!
# Tham khảo
https://reactive.io/tips/2009/01/11/the-difference-between-ruby-symbols-and-strings
http://www.rubyguides.com/2018/02/ruby-symbols/