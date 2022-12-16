Trong bài viết này mình muốn chia sẻ với các bạn một số tính năng của Ruby và Rails có thể bạn đã biết hoặc chưa biết. Một số nội dung chỉ là những thay đổi mới xuất hiện với các phiên bản Ruby hoặc Rails mới. Hãy cùng tìm hiểu nhé
## Tạo Hash với list các values
Bạn có thể tạo một Hash từ danh sách các giá trị bằng cách sử dụng Hash [...]. Nó sẽ tạo ra một Hash như dưới đây:
```
Hash['key1', 'value1', 'key2', 'value2']

=> {"key1"=>"value1", "key2"=>"value2"}
```
## Lambda viết tắt là ->
Dấu -> được sử dụng thường xuyên để thay thế cho Lambda.
```
a = -> { 1 + 1 }
a.call
# => 2

a = -> (v) { v + 1 }
a.call(2)
# => 3
```
## Double star (**)

Double star là một mẹo nhỏ trong Ruby. Mời các bạn xem ví dụ sau để hiểu thêm chi tiết:
```
def my_method(a, *b, **c)
  return a, b, c
end
```
a sẽ là tham số thông thường, b sẽ lấy tất cả các tham số được truyền vào sau giá trị đầu tiên và đặt chúng vào một mảng, c sẽ lấy bất kỳ tham số nào có định dạng key: value ở cuối phương thức.

Hãy quan sát ví dụ dưới đây:

Truyền vào một tham số:
```
my_method(1)
# => [1, [], {}]
```

Truyền vào nhiều tham số:
```
my_method(1, 2, 3, 4)
# => [1, [2, 3, 4], {}]
```

Truyền vào nhiều tham số + tham số dạng hash:
```
my_method(1, 2, 3, 4, a: 1, b: 2)
# => [1, [2, 3, 4], {:a=>1, :b=>2}]
```

## Xử lý đối tượng đơn lẻ và mảng theo cùng một cách
Đôi khi bạn có thể muốn cung cấp tùy chọn chấp nhận một đối tượng hoặc một mảng đối tượng. Thay vì kiểm tra loại đối tượng bạn đã nhận được, bạn có thể sử dụng [* something] hoặc Array (something).

Hãy gán hai biến. Biến đầu tiên là một số và biến thứ hai là một dãy số.
```
stuff = 1
stuff_arr = [1, 2, 3]
```
Ví dụ sau sử dụng [* ...] để lặp qua bất kỳ thứ gì được đưa ra.
```
[*stuff].each { |s| s }
[*stuff_arr].each { |s| s }
```
Tương tự như vậy nhưng sử dụng Array (...).
```
Array(stuff).each { |s| s }
Array(stuff_arr).each { |s| s }
```
## Double Pipe Equals ||=
Double Pipe Equals là một công cụ tuyệt vời để viết mã ngắn gọn và súc tích.

Khi viết a ||= b thì nó tương đương với:
```
a || a = b # Correct
```
Chứ không phải như nhiều người nghĩ là:
```
a = a || b # Wrong
```
Toán tử này có thể được sử dụng để tạo các phương thức như thế này trong các class của bạn như là sử dụng nó để tính toán.
```
def total
  @total ||= (1..100000000).to_a.inject(:+)
end
```
Bây giờ bạn có thể có gọi phương thức total để nhận được tổng giá trị, nhưng nó sẽ chỉ được tính duy nhất vào lần đầu tiên.

## Tham số Hash bắt buộc
Điều này đã được giới thiệu từ Ruby 2.0. Thay vì chỉ định nghĩa một phương thức nhận tham số là Hash như sau:
```
def my_method({})
end
```
Bạn có thể chỉ định các keys mà bạn mong muốn và thậm chí có thể định nghĩa giá trị mặc định cho chúng! a và b là các khóa bắt buộc, c là từ khóa mặc định.
```
def my_method(a:, b:, c: 'default')
  return a, b, c
end
```
Chúng ta có thể thử gọi nó mà không truyền giá trị cho tham số b, nó sẽ không hoạt động.
```
my_method(a: 1)
# => ArgumentError: missing keyword: b
```
Vì c có giá trị mặc định, nên chúng ta có thể gọi phương thức với a và b mà k cần truyền tham số c.
```
my_method(a: 1, b: 2)
# => [1, 2, "default"]
```
Hoặc với toàn bộ tham số:
```
my_method(a: 1, b: 2, c: 3)
# => [1, 2, 3]
```
Và đương nhiên chúng ta có thể truyền trực tiếp 1 Hash trực tiếp vào phương thức này:
```
hash = { a: 1, b: 2, c: 3 }
my_method(hash)
# => [1, 2, 3]
```
## Tạo mảng bảng chữ cái hoặc số
Bạn có thể muốn tạo một danh sách các số hoặc đặt toàn bộ bảng chữ cái bên trong một mảng. Trong Ruby bạn có thể sử dụng ranges để làm điều đó.
A to Z
```
('a'..'z').to_a
# => ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
```
1 đến 10
```
(1..10).to_a
# => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
## Tap
Tap là một phương thức nhỏ giúp code của bạn dễ đọc hơn cũng như tránh trùng lặp code. Hãy theo dõi ví dụ dưới đây để biết thêm chi tiết:
```
class User
  attr_accessor :a, :b, :c
end
```
Bây giờ, giả sử bạn muốn khởi tạo một người dùng mới và chỉ định giá trị cho từng thuộc tính của người dùng đó. Bạn có thể làm như sau:
```
def my_method
  o = User.new
  o.a = 1
  o.b = 2
  o.c = 3
  o
end
```
Hoặc bạn có thể sử dụng Tap để làm điều đó như thế này.
```
def my_method
  User.new.tap do |o|
    o.a = 1
    o.b = 2
    o.c = 3
  end
end
```
## Giá trị mặc định cho Hash (Bad trick)
Theo mặc định, khi cố gắng truy cập một giá trị không được định nghĩa trong một Hash, bạn sẽ nhận được nil. Bạn có thể thay đổi điều này khi khởi tạo Hash.

Đừng bao giờ làm điều này trừ khi bạn biết chính xác mình điều đang làm là cần thiết.

Trong ví dụ đầu tiên, a xác định giá trị mặc định là 0 vì vậy khi a[:a] được gọi, chúng ta sẽ lấy được giá trị là 0 chứ không phải nil.
```
a = Hash.new(0)
a[:a]
# => 0
```
Chúng ta có thể truyền bất cứ thứ gì khi khởi tạo Hash. Hãy thử với một Hash!
```
a = Hash.new({})
a[:a]
# => {}
```
Hoặc một chuỗi:
```
a = Hash.new('lolcat')
a[:a]
# => "lolcat"
```
## Hash#dig
Đã bao nhiêu lần bạn làm một cái gì đó tương tự như thế này:
```
... if params[:user] && params[:user][:address] &&
    params[:user][:address][:somewhere_deep]
```
Dig tương tự như &. cho Hash Object. Vì vậy, bạn có thể viết lại đoạn code phức tạp trên thành:
```
... if params.dig(:user, :address, :somewhere_deep)
```
## Object#presence_in
Nó cho phép bạn thay thế các điều kiện (thường là ternary) bằng cách gọi một phương thức đơn giản. Ví dụ: Code của bạn trông như sau:
```
sort_options = [:by_date, :by_title, :by_author]
...
sort = sort_options.include?(params[:sort]) ? params[:sort] : :by_date
# Another option
sort = (sort_options.include?(params[:sort]) && params[:sort]) || :by_date
```
Chuyển thành thế này nhìn có tuyệt hơn không?
```
params[:sort].presence_in(sort_options) || :by_date
```
Trên đây là những mẹo nhỏ khi code ruby và rails hi vọng giúp ích được cho các bạn trong quá trình lập trình.
## NGUỒN THAM KHẢO
https://devblast.com/b/ruby-tricks-improve-code

https://hackernoon.com/5-ruby-on-rails-tips-you-probably-dont-know-8b80b4a0890f