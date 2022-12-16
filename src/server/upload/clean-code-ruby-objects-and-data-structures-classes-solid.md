Tiếp nối chuối series clean code ruby, kỳ này là phần nói về làm thế nào để clean Objects and Data Structures, Classes, SOLID. Mời các bạn đón đọc nhé
# Objects and Data Structures
## Sử dụng getters và setters

Sử dụng getters và setters để truy cập dữ liệu trên các đối tượng có thể tốt hơn là chỉ đơn giản là tìm kiếm một thuộc tính trên một đối tượng. Dưới đây là những lý do tại sao:
* Khi bạn muốn làm nhiều hơn ngoài việc chỉ có một thuộc tính đối tượng, bạn không phải tìm kiếm và thay đổi mọi truy cập trong cơ sở mã của bạn.
* Làm cho việc xác nhận đơn giản hơn.
* Đóng gói các đại diện nội bộ.
* Dễ dàng thêm ghi log và xử lý lỗi khi getting và setting.
* Bạn có thể lười tải các thuộc tính của đối tượng, thì có thể lấy nó từ máy chủ.

```ruby
def make_bank_account
  # ...

  {
    balance: 0
    # ...
  }
end

account = make_bank_account
account[:balance] = 100
account[:balance] # => 100
```

**Good:**

```ruby
class BankAccount
  def initialize
    # this one is private
    @balance = 0
  end

  # a "getter" via a public instance method
  def balance
    # do some logging
    @balance
  end

  # a "setter" via a public instance method
  def balance=(amount)
    # do some logging
    # do some validation
    @balance = amount
  end
end

account = BankAccount.new
account.balance = 100
account.balance # => 100
```

Ngoài ra, nếu getters và setters của bạn xử lý hoàn toàn bình thường, bạn nên sử dụng attr_accessor để định nghĩa chúng. Điều này đặc biệt thuận tiện cho việc triển khai các đối tượng, giống như việc hiển thị dữ liệu cho các phần khác của hệ thống.

**Good:**

```ruby
class Toy
  attr_accessor :price
end

toy = Toy.new
toy.price = 50
toy.price # => 50
```
Tuy nhiên, bạn phải lưu ý rằng trong một số tình huống, sử dụng attr_accessor khiến code của bạn bốc mùi, hãy đọc thêm [tại đây](https://solnic.codes/2012/04/04/get-rid-of-that-code-smell-attributes/).

# Classes
## Tránh Fluent interface

[Fluent interface](https://en.wikipedia.org/wiki/Fluent_interface) là một API hướng đối tượng nhằm cải thiện khả năng đọc mã nguồn bằng cách sử dụng [chuỗi phương thức.](https://en.wikipedia.org/wiki/Method_chaining).

Mặc dù có thể trong một số trường hợp, các đối tượng xây dựng thường xuyên, trong đó mẫu này làm giảm tính dài dòng của mã (ví dụ: các truy vấn ActiveRecord), thường thì nó có chi phí:

* Phá vỡ [tính đóng gói](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming))
* Phá vỡ [Decorators](https://en.wikipedia.org/wiki/Decorator_pattern)
* [Mock object](https://en.wikipedia.org/wiki/Mock_object) trong một bộ kiểm thử
* Làm diffs của commits khó đọc hơn.
 
Để biết thêm thông tin, bạn có thể đọc toàn bộ bài đăng trên [blog](https://ocramius.github.io/blog/fluent-interfaces-are-evil/) về chủ đề này được viết bởi Marco Pivetta.

**Bad:**

```ruby
class Car
  def initialize(make, model, color)
    @make = make
    @model = model
    @color = color
    # NOTE: Returning self for chaining
    self
  end

  def set_make(make)
    @make = make
    # NOTE: Returning self for chaining
    self
  end

  def set_model(model)
    @model = model
    # NOTE: Returning self for chaining
    self
  end

  def set_color(color)
    @color = color
    # NOTE: Returning self for chaining
    self
  end

  def save
    # save object...
    # NOTE: Returning self for chaining
    self
  end
end

car = Car.new('Ford','F-150','red')
  .set_color('pink')
  .save
```

**Good:**

```ruby
class Car
  attr_accessor :make, :model, :color

  def initialize(make, model, color)
    @make = make
    @model = model
    @color = color
  end

  def save
    # Save object...
  end
end

car = Car.new('Ford', 'F-150', 'red')
car.color = 'pink'
car.save
```

## Thích các thành phần hơn thừa kế

Như đã nêu trong cuốn sách nổi tiếng Mẫu thiết kế của Gang of Four, bạn nên thích sáng tác hơn là kế thừa nơi bạn có thể. Có rất nhiều lý do tốt để sử dụng thừa kế và rất nhiều lý do tốt để sử dụng thành phần. Điểm chính của câu châm ngôn này là nếu tâm trí của bạn theo bản năng đi theo sự kế thừa, hãy thử nghĩ xem liệu bố cục có thể mô hình hóa vấn đề của bạn tốt hơn không. Trong một số trường hợp, nó có thể.

Sau đó, bạn có thể tự hỏi, "khi nào tôi nên sử dụng thừa kế?" Nó phụ thuộc vào vấn đề của bạn, nhưng đây là một danh sách hợp lý khi kế thừa có ý nghĩa hơn thành phần:

* Các class của bạn đại diện cho mối quan hệ "is-a" chứ không phải mối quan hệ "has-a" (Human->Animal vs. User->UserDetails).
* Bạn có thể sử dụng lại mã từ các lớp cơ sở (Con người có thể di chuyển như tất cả các loài động vật).
* Bạn muốn thực hiện các thay đổi cho các lớp con bằng cách thay đổi một lớp cơ sở. (Thay đổi chi phí calo của tất cả các động vật khi chúng di chuyển).

**Bad:**

```ruby
class Employee
  def initialize(name, email)
    @name = name
    @email = email
  end

  # ...
end

# Bad because Employees "have" tax data. EmployeeTaxData is not a type of Employee
class EmployeeTaxData < Employee
  def initialize(ssn, salary)
    super()
    @ssn = ssn
    @salary = salary
  end

  # ...
end
```

**Good:**

```ruby
class EmployeeTaxData
  def initialize(ssn, salary)
    @ssn = ssn
    @salary = salary
  end

  # ...
end

class Employee
  def initialize(name, email)
    @name = name
    @email = email
  end

  def set_tax_data(ssn, salary)
    @tax_data = EmployeeTaxData.new(ssn, salary)
  end
  # ...
end
```
# SOLID
## Nguyên tắc đơn nhiệm (SRP)

Như đã nêu trong Clean Code, "Không bao giờ nên có nhiều hơn một lý do để một lớp thay đổi". Thật hấp dẫn khi đóng gói một lớp học với rất nhiều chức năng, như khi bạn chỉ có thể mang theo một chiếc vali trên chuyến bay của mình. Vấn đề với điều này là lớp của bạn sẽ không gắn kết về mặt khái niệm và điều đó sẽ cho nó nhiều lý do để thay đổi. Giảm thiểu số lần bạn cần thay đổi một lớp là rất quan trọng vì nếu có quá nhiều chức năng trong một lớp, khi bạn sửa đổi một phần của nó, có thể làm ảnh hưởng đến các mô-đun phụ thuộc khác trong cơ sở mã của bạn.

**Bad:**

```ruby
class UserSettings
  def initialize(user)
    @user = user
  end

  def change_settings(settings)
    return unless valid_credentials?
    # ...
  end

  def valid_credentials?
    # ...
  end
end
```

**Good:**

```ruby
class UserAuth
  def initialize(user)
    @user = user
  end

  def valid_credentials?
    # ...
  end
end

class UserSettings
  def initialize(user)
    @user = user
    @auth = UserAuth.new(user)
  end

  def change_settings(settings)
    return unless @auth.valid_credentials?
    # ...
  end
end
```
## Nguyên tắc mở / đóng (OCP)

Như [Bertrand Meyer](https://en.wikipedia.org/wiki/Bertrand_Meyer) đã nêu ra, "các thực thể phần mềm (lớp, mô-đun, hàm, v.v.) nên được mở để mở rộng, nhưng đóng để sửa đổi." Điều đó có nghĩa là gì? Nguyên tắc này về cơ bản nói rằng bạn nên cho phép người dùng thêm các chức năng mới mà không thay đổi mã hiện có.

**Bad:**

```ruby
class Adapter
  attr_reader :name
end

class AjaxAdapter < Adapter
  def initialize
    super()
    @name = 'ajaxAdapter'
  end
end

class NodeAdapter < Adapter
  def initialize
    super()
    @name = 'nodeAdapter'
  end
end

class HttpRequester
  def initialize(adapter)
    @adapter = adapter
  end

  def fetch(url)
    case @adapter.name
    when 'ajaxAdapter'
      make_ajax_call(url)
    when 'nodeAdapter'
      make_http_call(url)
    end
  end

  def make_ajax_call(url)
    # ...
  end

  def make_http_call(url)
    # ...
  end
end
```

**Good:**

```ruby
class Adapter
  attr_reader :name
end

class AjaxAdapter < Adapter
  def initialize
    super()
    @name = 'ajaxAdapter'
  end

  def request(url)
    # ...
  end
end

class NodeAdapter < Adapter
  def initialize
    super()
    @name = 'nodeAdapter'
  end

  def request(url)
    # ...
  end
end

class HttpRequester
  def initialize(adapter)
    @adapter = adapter
  end

  def fetch(url)
    @adapter.request(url)
  end
end
```

## Nguyên tắc thay thế Liskov (LSP)

Đây là một thuật ngữ đáng sợ cho một khái niệm rất đơn giản. Nó được định nghĩa chính thức là "Nếu S là một kiểu con của T, thì các đối tượng thuộc loại T có thể được thay thế bằng các đối tượng loại S (nghĩa là các đối tượng loại S có thể thay thế các đối tượng thuộc loại T) mà không làm thay đổi bất kỳ thuộc tính mong muốn nào của chương trình đó (tính đúng đắn, nhiệm vụ được thực hiện, v.v.). " Đó là một định nghĩa thậm chí còn đáng sợ hơn.

Giải thích tốt nhất cho điều này là nếu bạn có một lớp cha và một lớp con, thì lớp cơ sở luôn có thể được thay thế bởi lớp con mà không nhận được kết quả không chính xác. Điều này có thể vẫn còn gây nhầm lẫn, vì vậy hãy xem ví dụ về Hình chữ nhật vuông cổ điển. Về mặt toán học, hình vuông là một hình chữ nhật, nhưng nếu bạn mô hình hóa nó bằng cách sử dụng mối quan hệ "is-a" thông qua thừa kế, bạn sẽ nhanh chóng gặp rắc rối.

**Bad:**

```ruby
class Rectangle
  def initialize
    @width = 0
    @height = 0
  end

  def color=(color)
    # ...
  end

  def render(area)
    # ...
  end

  def width=(width)
    @width = width
  end

  def height=(height)
    @height = height
  end

  def area
    @width * @height
  end
end

class Square < Rectangle
  def width=(width)
    @width = width
    @height = width
  end

  def height=(height)
    @width = height
    @height = height
  end
end

def render_large_rectangles(rectangles)
  rectangles.each do |rectangle|
    rectangle.width = 4
    rectangle.height = 5
    area = rectangle.area # BAD: Returns 25 for Square. Should be 20.
    rectangle.render(area)
  end
end

rectangles = [Rectangle.new, Rectangle.new, Square.new]
render_large_rectangles(rectangles)
```

**Good:**

```ruby
class Shape
  def color=(color)
    # ...
  end

  def render(area)
    # ...
  end
end

class Rectangle < Shape
  def initialize(width, height)
    super()
    @width = width
    @height = height
  end

  def area
    @width * @height
  end
end

class Square < Shape
  def initialize(length)
    super()
    @length = length
  end

  def area
    @length * @length
  end
end

def render_large_shapes(shapes)
  shapes.each do |shape|
    area = shape.area
    shape.render(area)
  end
end

shapes = [Rectangle.new(4, 5), Rectangle.new(4, 5), Square.new(5)]
render_large_shapes(shapes)
```
## Nguyên tắc phân chia giao diện (ISP)

Ruby không có giao diện nên nguyên tắc này không áp dụng nghiêm ngặt như các ngôn ngữ khác. Tuy nhiên, nó quan trọng và phù hợp ngay cả với hệ thống thiếu loại của Ruby.

ISP tuyên bố rằng "Khách hàng không nên bị buộc phải phụ thuộc vào các giao diện mà họ không sử dụng."

Khi một máy khách phụ thuộc vào một lớp có chứa các giao diện mà máy khách không sử dụng, nhưng các máy khách khác sử dụng, thì máy khách đó sẽ bị ảnh hưởng bởi những thay đổi mà các máy khách khác thay đổi đối với lớp đó.

Bạn có thể tham khảo ở ví dụ [sau đây](http://geekhmer.github.io/blog/2015/03/18/interface-segregation-principle-in-ruby/)

**Bad:**

```ruby
class Car
  # used by Driver
  def open
    # ...
  end

  # used by Driver
  def start_engine
    # ...
  end

  # used by Mechanic
  def change_engine
    # ...
  end
end

class Driver
  def drive
    @car.open
    @car.start_engine
  end
end

class Mechanic
  def do_stuff
    @car.change_engine
  end
end
```
**Good:**

```ruby
# used by Driver only
class Car
  def open
    # ...
  end

  def start_engine
    # ...
  end
end

# used by Mechanic only
class CarInternals
  def change_engine
    # ...
  end
end

class Driver
  def drive
    @car.open
    @car.start_engine
  end
end

class Mechanic
  def do_stuff
    @car_internals.change_engine
  end
end
```

## Nguyên tắc đảo ngược phụ thuộc (DIP)

Nguyên tắc này nêu hai điều thiết yếu:
* Các mô-đun cấp cao không nên phụ thuộc vào các mô-đun cấp thấp. Cả hai nên phụ thuộc vào trừu tượng.
* Trừu tượng không nên phụ thuộc vào chi tiết. Chi tiết nên phụ thuộc vào trừu tượng.

Nói một cách đơn giản, DIP giữ cho các mô-đun cấp cao không biết chi tiết về các mô-đun cấp thấp và thiết lập chúng. Một lợi ích rất lớn của việc này là nó làm giảm sự khớp nối giữa các mô-đun. Khớp nối là một mô hình phát triển rất tệ vì nó làm cho mã của bạn khó tái cấu trúc.

Như đã nói ở trên, Ruby không có giao diện nên các khái niệm trừu tượng phụ thuộc vào các hợp đồng ngầm. Điều đó có nghĩa là, các phương thức và thuộc tính mà một đối tượng / lớp tiếp xúc với một đối tượng / lớp khác. Trong ví dụ dưới đây, hợp đồng ngầm định là bất kỳ mô-đun Yêu cầu nào cho InventoryTracker sẽ có phương thức request_items.

**Bad:**

```ruby
class InventoryRequester
  def initialize
    @req_methods = ['HTTP']
  end

  def request_item(item)
    # ...
  end
end

class InventoryTracker
  def initialize(items)
    @items = items

    # BAD: We have created a dependency on a specific request implementation.
    @requester = InventoryRequester.new
  end

  def request_items
    @items.each do |item|
      @requester.request_item(item)
    end
  end
end

inventory_tracker = InventoryTracker.new(['apples', 'bananas'])
inventory_tracker.request_items
```

**Good:**

```ruby
class InventoryTracker
  def initialize(items, requester)
    @items = items
    @requester = requester
  end

  def request_items
    @items.each do |item|
      @requester.request_item(item)
    end
  end
end

class InventoryRequesterV1
  def initialize
    @req_methods = ['HTTP']
  end

  def request_item(item)
    # ...
  end
end

class InventoryRequesterV2
  def initialize
    @req_methods = ['WS']
  end

  def request_item(item)
    # ...
  end
end

# By constructing our dependencies externally and injecting them, we can easily
# substitute our request module for a fancy new one that uses WebSockets.
inventory_tracker = InventoryTracker.new(['apples', 'bananas'], InventoryRequesterV2.new)
inventory_tracker.request_items
```

# Link Tham khảo
https://github.com/uohzxela/clean-code-ruby#objects-and-data-structures
https://github.com/uohzxela/clean-code-ruby#classes
https://github.com/uohzxela/clean-code-ruby#solid