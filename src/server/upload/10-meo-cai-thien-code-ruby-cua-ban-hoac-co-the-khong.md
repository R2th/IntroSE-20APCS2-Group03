Bài viết dưới đây tôi sẽ giới thiệu cho các bạn 10 tính năng thú vị có trong Ruby code mà có thể các bạn đã biết hoặc không (nếu không thì nhớ upvote nhé=)) ).
## 1. Create a hash from a list of values: 
Để tạo được 1 Hash thì có rất nhiều cách rồi, tuy nhiên vẫn có một mẹo tạo nhanh 1 Hash từ 1 Array có sẵn bằng cách sử dụng Hash[....], nó sẽ tạo ra một Hash như sau:
```
Hash['key1', 'value1', 'key2', 'value2']

# => {"key1"=>"value1", "key2"=>"value2"}
```
## 2. Lambda Literal ->
Lambda có thể được khai báo dễ dàng với kí tự "->"
```
a = -> { 1 + 1 }
a.call
# => 2

a = -> (v) { v + 1 }
a.call(2)
# => 3
```
## 3. Double Star (**)

Đây là một mẹo nhỏ ở Ruby, hãy nhìn xem:
```
def my_method(a, *b, **c)
  return a, b, c
end
```
a là tham số thông thường. * b sẽ lấy tất cả các tham số được truyền sau giá trị đầu tiên và đặt chúng vào một mảng. ** c sẽ lấy bất kỳ tham số nào được đưa ra trong khóa định dạng key: value ở cuối cuộc gọi phương thức.
Xem thêm ví dụ, với 1 tham số truyền vào
```
my_method(1)
# => [1, [], {}]
```
Với nhiều hơn 1 tham số truyền vào
```
my_method(1, 2, 3, 4)
# => [1, [2, 3, 4], {}]
```
Với nhiều hơn 1, kèm theo tham số dạng hash
```
my_method(1, 2, 3, 4, a: 1, b: 2)
# => [1, [2, 3, 4], {:a=>1, :b=>2}]
```
## 4. Handle single object and array in the same way
Đôi khi bạn có thể muốn cung cấp tùy chọn chấp nhận một đối tượng hoặc một mảng đối tượng. Thay vì kiểm tra loại đối tượng bạn đã nhận được, bạn có thể sử dụng [* something] hoặc Array (something).
Hãy gán hai biến. Cái đầu tiên là một chữ số và chữ số thứ hai là một dãy số.
```
stuff = 1
stuff_arr = [1, 2, 3]
```
Trong ví dụ này, tôi sẽ sử dụng [*...] để lặp qua chúng.
```
[*stuff].each { |s| s }
[*stuff_arr].each { |s| s }
```
Tương tự như vậy nhưng sử dụng Array(...)
```
Array(stuff).each { |s| s }
Array(stuff_arr).each { |s| s }
```
## 5. Double Pipe Equals ||=
Kí tự ||= là một cách thật tốt để làm cho đoạn mã chúng ta trở nên ngắn gọn :
Nó tương đương với :
```
a || a = b # Correct
```
và dĩ nhiên khác với một số người thường nghĩ:
```
a = a || b # Wrong
```
Toán tử này có thể được sử dụng để tạo các phương thức như thế này trong các lớp của bạn. Tôi thích sử dụng nó để tính toán.
```
def total
  @total ||= (1..100000000).to_a.inject(:+)
end
```
## 6. Mandatory hash parameters
Điều này đã được định nghĩa từ Ruby 2.0, thay vì cố gắn định nghĩa một phương thức chấp nhận tham số là 1 Hash
```
def my_method({})
end
```
Bạn có thể chỉ định các Keys bắt buộc, hoặc có thể xách định giá trị mặc định cho chúng :
```
def my_method(a:, b:, c: 'default')
  return a, b, c
end
```
Chúng ta có thể thử gọi phương thức trên mà không cung cấp giá trị cho b, tuy nhiên nó sẽ không hoạt động :
```
my_method(a: 1)
# => ArgumentError: missing keyword: b
```
và vì c đã có giá trị "default" nên chúng ta hoàn toàn có thể gọi phương thức trên chỉ bằng a và b
```
my_method(a: 1, b: 2)
# => [1, 2, "default"]
```
hoặc bằng cả a b c
```
my_method(a: 1, b: 2, c: 3)
# => [1, 2, 3]
```
Còn 1 cách nữa, bạn có thể gói chúng lại thành 1 Hash rồi truyền vào
```
hash = { a: 1, b: 2, c: 3 }
my_method(hash)
# => [1, 2, 3]
```
## 7. Generate array of alphabet or numbers
Với Ruby, bạn có thể tạo nhanh 1 mảng bằng số hoặc chữ cái. chỉ với 1 dòng lệnh đơn giản, ví dụ
tạo mảng chứa các kí tự từ a -> z:
```
('a'..'z').to_a
# => ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
```
hay tạo mảng các số từ 1->10:
```
(1..10).to_a
# => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
## 8. Tap
Tap là một cách để chúng ta viết code clear hơn . Ví dụ chúng ta có 1 Class như này
```
class User
  attr_accessor :a, :b, :c
end
```
Và bây giờ giả sử chúng ta muốn tạo một người dùng mới và gắn các giá trị cho nó, chúng ta sẽ làm thế này :
```
def my_method
  o = User.new
  o.a = 1
  o.b = 2
  o.c = 3
  o
end
```
Nhưng nếu dùng Tap, nó sẽ là :
```
def my_method
  User.new.tap do |o|
    o.a = 1
    o.b = 2
    o.c = 3
  end
end
```
Về cơ bản, Tap tạo ra một cuộc gọi từ đối tượng đến một block và trả về chính nó
## 9. Default value for hash (Bad trick)
Trong một vài trường hợp, khi bạn cố gắn lấy một giá trị trong Hash chưa được định nghĩa trước đó, cái bạn nhận được sẽ là một giá trị nil. Bạn có thể thay đổi điều này trong lúc khởi tạo Hash
*Note: đừng áp dụng điều này nếu bạn chưa thực sự biết bạn đang làm gì.
Trong ví dụ đầu tiên này, chúng ta khai báo một Hash có giá trị mặc định đầu tiên là 0, vì vậy khi có một ai đó gọi a[:a], giá trị chúng ta nhận được sẽ là 0 chứ không phải là nil
```
a = Hash.new(0)
a[:a]
# => 0
```
Chúng ta cũng có thể thêm bất cứ gì chúng ta muốn lúc khởi tạo:
```
a = Hash.new({})
a[:a]
# => {}
```
Hay thậm chí đó là một String
```
a = Hash.new('blablabla')
a[:a]
# => "'blablabla"
```
## 10. Heredocs
Khi sử dụng EOT, nó sẽ kiểm soát các space đầu mỗi dòng code của bạn, điều đó khiến bạn phải kéo tất cả các dòng code về đầu dòng, và dĩ nhiên làm code mình trở nên xấu đi
```
def my_method
  <<-EOT
Some
Very
Interesting
Stuff
  EOT
end
```
Nhưng chúng ta vẫn có thể thay đổi được điều này bằng cách sau:
```
def my_method
  <<-EOT.gsub(/^\s+/, '')
    Some
    Very
    Interesting
    Stuff
  EOT
end
```

Trên đây là 10 mẹo nhỏ giúp các bạn hoàn thiện hơn trong các đoạn mã Ruby của mình. Tuy ko có gì to tát nhưng chắc sẽ có nhiều bạn chưa biết hết về chúng. hy vọng có thể giúp được các bạn ít hoặc nhiều.
Chúc một ngày tốt lành!

Bài viết được dịch từ diễn đàn [DevBlast](https://devblast.com/b/ruby-tricks-improve-code)