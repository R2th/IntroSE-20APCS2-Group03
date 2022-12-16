# I. Giới thiệu 
Delegate giúp dễ dàng gọi các public method của các object khác giống như là public method của chính mình. Hiểu một cách đơn giản là thông qua delegate, bạn có thể sử dụng các public method của object khác một cách trực tiếp.
# II.Options
* :to  -  Chỉ định object mà bạn muốn sử dụng public methods.
* :prefix - Dùng để quy định tên method của đối tượng delegate tới.
* :allow_nil -  Nếu được set bằng true, trả về nil thay vì NoMethodError khi target của method là nil

Macro (tiền tố) nhận một hay nhiều tên phương thức (định dạng là symbols hoặc string) và tên của đối tượng nhắm đến thông qua tùy chọn :to (định dạng là symbols hoặc string).
Delegation đặc biệt hữu ích với liên kết Active Record.
```
class Greeter < ActiveRecord::Base
  def hello
    'hello'
  end

  def goodbye
    'goodbye'
  end
end

class Foo < ActiveRecord::Base
  belongs_to :greeter
  delegate :hello, to: :greeter
end

Foo.new.hello   # => "hello"
Foo.new.goodbye # => NoMethodError: undefined method `goodbye' for #<Foo:0x1af30c>
```
Cho phép delegates cho nhiều phương thức của đối tượng mình nhắm tới.
```
class Foo < ActiveRecord::Base
  belongs_to :greeter
  delegate :hello, :goodbye, to: :greeter
end

Foo.new.goodbye # => "goodbye"
```
Một Method có thể được gọi delegate với biến instance, biến class hoặc hằng số.
```
class Foo
  CONSTANT_ARRAY = [0,1,2,3]
  @@class_array  = [4,5,6,7]

  def initialize
    @instance_array = [8,9,10,11]
  end
  delegate :sum, to: :CONSTANT_ARRAY
  delegate :min, to: :@@class_array
  delegate :max, to: :@instance_array
end

Foo.new.sum # => 6
Foo.new.min # => 4
Foo.new.max # => 11
```
Có thể gọi delegate 1 method của class bằng cách sử dụng :class
```
class Foo
  def self.hello
    "world"
  end

  delegate :hello, to: :class
end

Foo.new.hello # => "world"
```
Sử dụng tiền tố :prefix để quy định tên method của đối tượng delegate tới.  Nếu sử dụng prefix: true tên của phương thức bao gồm tên của cả đối tượng được delegate.
```
Person = Struct.new(:name, :address)

class Invoice < Struct.new(:client)
  delegate :name, :address, to: :client, prefix: true
end

john_doe = Person.new('John Doe', 'Vimmersvej 13')
invoice = Invoice.new(john_doe)
invoice.client_name    # => "John Doe"
invoice.client_address # => "Vimmersvej 13"
```
Bạn cũng có thể custom prefix:
```
class Invoice < Struct.new(:client)
  delegate :name, :address, to: :client, prefix: :customer
end

invoice = Invoice.new(john_doe)
invoice.customer_name    # => 'John Doe'
invoice.customer_address # => 'Vimmersvej 13'
```
Nếu đối tượng hướng đến mà nil và không trả về  kết quả cho phương thức ủy thác (delegated method) thì một NoMethodError được gây lên, với không bất cứ giá trị nào trả về . Tuy nhiên, đôi khi, nó có ý nghĩa vào trường hợp nào đó và đây là mục đích của tùy chọn :allow_nil, nếu đối tượng hướng hướng đến không nil, hoặc có dữ liệu trả về, thì vẫn hoạt động một cách bình thường. Nhưng nếu nó nil và không có kết quả trả về thì delegated method sẽ trả về nil.
```
class User < ActiveRecord::Base
  has_one :profile
  delegate :age, to: :profile
end

User.new.age # raises NoMethodError: undefined method `age'
```
Trả về nil thay vì lỗi NoMethodError khi thêm allow_nil: true.
```
class User < ActiveRecord::Base
  has_one :profile
  delegate :age, to: :profile, allow_nil: true
end

User.new.age # nil
```
Ghi chú đối tượng hướng đến không nil dù có chọn tùy chọn :allow_nil, thì một lỗi vẫn được gây lên nếu không có giá trị trả về.
```
class Foo
  def initialize(bar)
    @bar = bar
  end

  delegate :name, to: :@bar, allow_nil: true
end

Foo.new("Bar").name # raises NoMethodError: undefined method `name'
```
Phương thức được gọi phải là public method nếu không sẽ show ra lỗi NoMethodError.
# Tổng kết
Bài viết được dịch từ nguồn sau: https://apidock.com/rails/Module/delegate