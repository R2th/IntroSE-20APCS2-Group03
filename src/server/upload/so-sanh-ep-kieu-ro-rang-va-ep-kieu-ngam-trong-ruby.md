> Ép kiểu là việc thay đổi một loại đối tượng thành một loại khác, cùng với giá trị của nó. Ví dụ: thay đổi số nguyên thành chuỗi bằng `#to_s` hoặc số thực thành số nguyên với `#to_i`. Các phương thức `#to_str` và `#to_int` có lẽ ít được biết đến hơn mà một số đối tượng triển khai thực hiện tương tự ép kiểu, nhưng có một số khác biệt.

Chúng ta sẽ đi sâu vào việc ép kiểu rõ ràng và ép kiểu ngầm trong Ruby. Chúng ta sẽ đề cập đến sự khác biệt giữa cả hai phương pháp và thảo luận về cách chúng được sử dụng.
Trước tiên, hãy nhìn vào cách chúng ta thường ép kiểu với các loại khác nhau trong Ruby với các phương thức trợ giúp chuyển đổi
## Phương thức trợ giúp ép kiểu rõ ràng
Các phương thức trợ giúp chuyển đổi phổ biến nhất là `#to_s`, `#to_i`, `#to_a` và `#to_h`. Đây là những phương thức trợ giúp ép kiểu rõ ràng. Chúng giúp chúng ta dễ dàng chuyển đổi một giá trị từ loại này sang loại khác.

Những phương thức trợ giúp rõ ràng đi kèm với một lời hứa rõ ràng. Bất cứ khi nào `#to_s` được gọi trên một đối tượng, nó sẽ luôn trả về một chuỗi, ngay cả khi đối tượng không thực sự chuyển đổi thành một chuỗi

Ruby cung cấp các phương thức trợ giúp này trên hầu hết mọi đối tượng cơ bản trong thư viện chuẩn Ruby.
```
:foo.to_s # => "foo"
10.0.to_i # => 10
"10".to_i # => 10
```
Các phương thức này, đặc biệt là `#to_s`, được triển khai trên hầu hết các loại cơ bản trong Ruby. Mặc dù việc truyền gần như luôn trả về một giá trị, kết quả cũng có thể không như chúng ta mong đợi.
```
"foo10".to_i          # => 0
[1, 2, 3].to_s        # => "[1, 2, 3]"
{ :foo => :bar }.to_s # => "{:foo=>:bar}"
{ :foo => :bar }.to_a # => [[:foo, :bar]]
Object.to_s           # => "Object"
Object.new.to_s       # => "#<Object:0x00007f8e6d053a90>"
```
Gọi các phương thức trợ giúp `#to_s`, `#to_i`, `#to_a` và `#to_h` buộc bất kỳ giá trị nào cho loại đã chọn. Nó trả lại một đại diện của loại mà nó cưỡng chế bất kể điều gì xảy ra với giá trị.
## Ép kiểu ngầm
Gọi các phương thức chuyển đổi trên làm cho các giá trị không hoạt động như kiểu chúng ta đang truyền có thể gây ra lỗi hoặc mất dữ liệu. Ruby cũng cung cấp các phương thức ép kiểu ngầm chỉ trả về một giá trị khi các đối tượng hoạt động tương tự nhau. Bằng cách này, chúng ta có thể chắc chắn rằng giá trị hoạt động như loại chúng tôi muốn. Các phương thức ép kiểu ngầm này là `#to_str`, `#to_int`, `#to_ary` và `#to_hash`

Phương thức trợ giúp `#to_str` cố gắng chuyển đổi đối tượng thành một chuỗi, nhưng sẽ gây ra `NoMethodError` nếu đối tượng không thực hiện phương thức và có thể bị ép buộc ngầm.
```
10.to_int                           # => 10
10.0.to_int                         # => 10
require "bigdecimal"
BigDecimal.new("10.0000123").to_int # => 10

# Unsuccessful coercions
"10".to_int             # => NoMethodError
"foo10".to_int          # => NoMethodError
[1, 2, 3].to_str        # => NoMethodError
{ :foo => :bar }.to_str # => NoMethodError
{ :foo => :bar }.to_ary # => NoMethodError
Object.to_str           # => NoMethodError
Object.new.to_str       # => NoMethodError
```
Chúng ta có thể thấy rằng Ruby bây giờ nghiêm ngặt hơn một chút trong những gì nó làm và không ép kiểu các loại được yêu cầu. Nếu không thể ép kiểu, phương thức `#to_ *` không được triển khai trên đối tượng và gọi nó sẽ gây ra `NoMethodError`.

Khi sử dụng các ép kiểu ngầm, ví dụ: `#to_str`, chúng ta yêu cầu hàm trả về một đối tượng String, chỉ khi loại ban đầu cũng hoạt động như một chuỗi. Vì lý do này, `#to_str` chỉ được triển khai trên chuỗi trong thư viện chuẩn Ruby.
## Cách Ruby sử dụng ép kiểu ngầm
Ngoài việc chính xác hơn trong những gì chúng ta yêu cầu trong một lần ép kiểu thì sự ép kiểu ngầm có lợi ích gì khác? Hóa ra Ruby sử dụng chính sự ép kiểu ngầm trong một tình huống hợp lý. Chẳng hạn, khi kết hợp các đối tượng với `+`.
```
name = "world!"
"Hello " + name # => "Hello world!"

# Without #to_str
class Name
  def initialize(name)
    @name = name
  end
end
"Hello " + Name.new("world!")
# => TypeError: no implicit conversion of Name into String
```
Ở đây, chúng ta thấy Ruby trả về `TypeError` vì nó có thể thực hiện chuyển đổi ngầm định từ loại tên thành chuỗi. Nếu chúng ta triển khai `#to_str` trên lớp, Ruby sẽ biết cách ép buộc loại tên.
```
# With #to_str
class Name
  def to_str
    @name
  end
end
"Hello " + Name.new("world!") # => "Hello world!"
```
Cách hoạt động tương tự cho mảng và `#to_ary`.
```
class Options
  def initialize
    @internal = []
  end

  def <<(value)
    @internal << value
  end
end

options = Options.new
options << :foo
[:some_prefix] + options
# => TypeError: no implicit conversion of Options into Array

class Options
  def to_ary
    @internal
  end
end
[:some_prefix] + options # => [:some_prefix, :foo]
```
Nhưng `#to_ary` được sử dụng trong nhiều tình huống hơn. Chúng ta có thể sử dụng nó để phá hủy một mảng thành các biến riêng biệt.
```
options = Options.new
options << :first
options << :second
options << :third
first, second, third = options
first  # => :first
second # => :second
third  # => :third
```
Nó cũng chuyển đổi đối tượng thành các tham số `block`.
```
[options].each do |(first, second)|
  first # => :first
  second # => :second
end
```
Có nhiều kịch bản hơn trong đó các phương thức ép kiểungầm được sử dụng, chẳng hạn như `#to_hash` với `**`. Điều này ép kiểu giá trị thành hàm băm bằng `#to_hash` trước khi chuyển nó sang phương thức `parse_options`.
```
class Options
  def to_hash
    # Create a hash from the Options Array
    Hash[*@internal]
  end
end

def parse_options(opts)
  opts
end

options = Options.new
options << :key
options << :value
parse_options(**options) # => {:key=>:value}
```
## Thực thi các kiểu
Ruby cũng cung cấp các phương pháp ép kiểu linh hoạt hơn khi loại đó là loại không xác định và chúng tôi muốn đảm bảo rằng chúng tôi có được loại chính xác. Có một loại cho mọi loại cơ bản (`String(...)`, `Integer(...)`, `Float(...)`, `Array(...)`,` Hash(...)`, v..v...).
```
String(self)       # => "main"
String(self.class) # => "Object"
String(123456)     # => "123456"
String(nil)        # => ""

Integer(123.999)   # => 123
Integer("0x1b")    # => 27
Integer(Time.new)  # => 1204973019
Integer(nil)       # => TypeError: can't convert nil into Integer
```
Phương thức `String (...) `trước tiên cố gắng gọi `#to_str` trên giá trị và khi thất bại, nó gọi phương thức` #to_s` của nó. Không phải tất cả các đối tượng đều xác định phương thức `#to_str`, do đó, kiểm tra bằng cả hai phương thức ép kiểu ngầm (`#to_str`) và phương thức ép kiểu rõ ràng (`#to_s`) sẽ tăng cơ hội chuyển đổi chuỗi sẽ hoạt động và bạn sẽ nhận được giá trị bạn muốn. Bằng cách gọi đầu tiên cho ép kiểu ngầm, chúng tôi có nhiều khả năng nhận được kết quả có cùng giá trị nhưng thuộc loại bị ép buộc, và không phải là `"# <Object: 0x00007f8e6d053a90>"`.
```
class MyString
  def initialize(value)
    @value = value
  end

  def to_str
    @value
  end
end

s = MyString.new("hello world")
s.to_s    # => "#<MyString:0x...>"
s.to_str  # => "hello world"
String(s) # => "hello world"
```
Bạn chỉ nên triển khai các phương thức ép kiểu ngầm cho các đối tượng hoạt động giống như kiểu bị ép buộc, ví dụ: `#to_str` cho lớp string của riêng bạn.

Khác với lần đầu tiên cố gắng ép kiểu ngầm, trình trợ giúp `String (...)` cũng kiểm tra kiểu trả về.` #to_str` chỉ là một phương thức có thể trả về bất kỳ loại giá trị nào, ngay cả không phải là chuỗi. Để đảm bảo chúng ta nhận được giá trị của loại `String (...)` yêu cầu, trả về `TypeError` nếu các loại không phù hợp
```
class MyString
  def to_str
    nil
  end
end

s = MyString.new("hello world")
s.to_s    # => "#<MyString:0x...>"
s.to_str  # => nil
String(s) # => "#<MyString:0x...>"
```
Ở đây, chúng ta có thể thấy rằng Ruby bỏ qua kết quả của `#to_str` vì nó trả về `nil`, không phải là kiểu string. Thay vào đó, nó rơi trở lại kết quả `#to_s`. Nếu `#to_s` cũng trả về `nil` và do đó không phải là loại đúng, `String (...)` sẽ trả về `TypeError`.
```
class MyString
  def to_str
    nil
  end

  def to_s
    nil
  end
end

s = MyString.new("hello world")
s.to_s    # => nil
s.to_str  # => nil
String(s)
# => TypeError: can't convert MyString to String (MyString#to_s gives NilClass)
```
Mặc dù chúng có thể đáng tin cậy hơn trong việc thực thi ép kiểu, lưu ý rằng các phương thức trợ giúp chuyển đổi (`String (...)`,` Integer (...)`, v..v..) thường chậm hơn một chút vì chúng cần thực hiện nhiều kiểm tra hơn đối với các kiểm tra đã cho giá trị.
## Kết luận
Khi bạn muốn chắc chắn rằng bạn đã xử lý đúng loại dữ liệu cho một đối tượng, thì ép kiểu là một quy trình hữu ích. Trong bài đăng này, chúng ta đã làm mới kiến thức của mình về các phương thức trợ giúp ép kiểu rõ ràng như `#to_s`, `#to_i`, `#to_a` và `#to_h`. Chúng ta cũng đã xem xét các trường hợp khi những người ép kiểu ngầm như `#to_str`, `#to_int`, `#to_ary` và `#to_hash` đều hữu ích và cách sử dụng bởi chính Ruby. Mình hy vọng các bạn thấy bài tổng quan về cách ép kiểu này hữu ích.