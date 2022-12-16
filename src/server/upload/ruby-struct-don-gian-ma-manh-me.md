## Struct là gì ?
Một `struct` trong Ruby là một trong những class built-in có chức năng và cách sử dụng khá giống với một Class được định nghĩa do người dùng, nhưng vẫn cung cấp một vài tính năng của class mà không cần tạo một class hoàn chỉnh. Chúng ta sẽ đi sâu vào tìm hiểu cách sử dụng `struct`, nhưng trước hết hãy xem xem nó là cái gì và so sánh nó với một class tương ứng đã.

**Sử dụng `struct`:**
```ruby
SelectOption = Struct.new(:display, :value) do
  def to_arr
    [display, value]
  end
end

option_struct = SelectOption.new("Ruby on Rails", :ror)

puts option_struct.display
# Ruby on Rails
puts option_struct.to_arr.inspect
# ["Ruby on Rails", :ror]
```

**Sử dụng `class`:**

```ruby
class SelectOption

  attr_accessor :display, :value

  def initialize(display, value)
    @display = display
    @value   = value
  end

  def to_arr
    [display, value]
  end

end

option_struct = SelectOption.new("Javascript", :js)

puts option_struct.display
# Javascript
puts option_struct.to_arr.inspect
# ["Javascript", :js]
```
Qua hai ví dụ đơn giản thì các bạn có thể thấy được rằng `class` và `struct` đều có các tính năng giống nhau, tuy nhiên `struct` đã giúp ta lược bớt được việc viết 2 method `initialize` và `attr_accessor`. Struct cũng hoàn toàn có thể sử dụng được như một object cơ bản:

```ruby
laptop = Computer.new(‘MacBook’, ‘OS X’)  
=> #<struct Computer name="MacBook", os="OS X">  
```

Truy cập các thuộc tính của Struct: 

```ruby
laptop[:os]
=> "OS X"
```

Thay đổi các thuộc tính:

```ruby
laptop.name = "Dell"  
laptop[:os] = "Winblows"  
```

Và object đó cũng có thể đc trả về dưới dạng Array (to_a) hay Hash (to_h) như 1 object bình thường:

```ruby
laptop.values  
=> ["Dell", "Winblows"]

laptop.to_a  
=> ["Dell", "Winblows"]

laptop.to_h  
=> {:name=>"Dell", :os=>"Winblows"}  
```

## Tại sao nên dùng Struct?
Bạn KHÔNG nhất thiết phải sử dụng `struct`, nhưng trong một số trường hợp bạn có thể dùng `struct` để khiến mọi thứ đơn giản hơn rất nhiều.

### Dữ liệu có nghĩa

Một ưu điểm lớn của Struct so với Hash hay Array đó là dữ liệu của Struct đều có nghĩa. Ví dụ về một list tọa độ dưới dạng Array:
```ruby
locations = [[40.748817, -73.985428], [40.702565, 73.992537]]  
```

Mảng trên không được rõ ràng cho lắm và khá dễ hiểu lầm khi phân biệt giữa kinh độ (longitude) và vĩ độ (latitude) của tọa độ địa lý. 
Thay vào đó chúng ta có thể sử dụng 1 `struct` đơn giản để khiến các giá trị đều có nghĩa

```ruby
Location = Struct.new(:longitude, :latitude)  
```

Bây giờ bạn đã có thể truy cập được vào các thuộc tính của object bằng các accessor method mà không cần sử dụng index của mảng:

```ruby
location = Location.new(40.748817, -73.985428)

location.longitude  
=> 40.748817
```

Các bạn nên dùng Struct khi các dữ liệu của chúng ta có liên hệ mật thiết với nhau. Như ví dụ ở trên, khi nói đến tọa độ thì kinh độ và vĩ độ phải có quan hệ mật thiết với nhau, và chúng phải được đóng gói lại như một object.

### Chỉ chấp nhận thuộc tính của nó

Một ưu điểm nữa khi sử dụng Struct thay vì Hash đó là Struct sẽ yêu cầu chính xác về các thuộc tính, còn Hash thì chấp nhận tất cả mọi thứ.

Lấy ví dụ nào, hãy tưởng tượng chúng ta đang làm việc với một hệ thống dữ liệu có cấu trúc về quản lý sách trong thư viện. Nếu chúng ta dùng Hash thì chúng ta có thể sẽ gặp vấn đề như sau:

```ruby
book = {}  
=> {}

book[:tile] = "Clean Code"  
=> "Clean Code"  
```

Hash này không hề quan tâm là chúng ta đã viết sai attribute `:title` thành `:tile` và vẫn chấp nhận điều đó.
Nếu chúng ta sử dụng Struct, thì chúng ta sẽ được báo lỗi:

```ruby
Book = Struct.new(:title)

book = Book.new  
=> #<struct Book title=nil>

book[:tile] = "Clean Code"  
NameError: no member ’tile’ in struct  
```

Đây là một việc rất quan trọng khi bạn đang xây dựng một hệ thống hoàn chỉnh và mong muốn được báo lỗi khi có một thuộc tính nào đó không chính xác.

### Một cấu trúc dữ liệu tạm thời

Trong một form lọc dữ liệu từ ngày A (`from_date`) đến ngày B (`to_date`), thay vì sử dụng 2 giá trị này ở mọi nơi bạn cần thì bạn cũng có thể sử dụng dữ liệu có cấu trúc bằng cách định nghĩa 1 `struct` FilterRange chứa `from_date` và `to_date` và cũng có thể là thêm một method để đếm số ngày giữa 2 ngày. Bạn hoàn toàn có thể sử dụng một class để làm công việc này nhưng thật sự nó khá là thừa thãi trong khi `struct` lại đơn giản và sạch sẽ hơn.

### Sử dụng trong 1 Class khác

Một cách khác để dùng `struct` đó là sử dụng bên trong một Class khác. Ở ví dụ bên dưới, sau khi 1 object `Person` được khởi tạo, chúng ta có thể làm việc với struct `Address`, bao gốm toàn bộ các thông tin liên quan đến địa chỉ của người dùng.

```ruby
class Person

  Address = Struct.new(:street, :city, :province, :country, :postal_code)

  attr_accessor :name, :address

  def initialize(name, opts)
    @name = name
    @address = Address.new(opts[:street], opts[:city], opts[:province], opts[:country], opts[:postal_code])
  end

end

person = Person.new("Pham Van A", {
  street: "Pham Hung",
  city: "Hanoi",
  province: "Hanoi",
  country: "Vietnam",
  postal_code: "10000"
})

puts person.address.inspect
# <struct Person::Address street="Pham Hung", city="Hanoi", province="Hanoi", country="Vietnam", postal_code="10000">
```

## Vậy khi nào chúng ta không nên dùng Struct ?

Chúng ta đã biết được lúc nào nên sử dụng Struct, nhưng khi nào thì không nên dùng nó ?

Khi bạn định nghĩa 1 Struct, bạn cần biết chính xác tất cả các thuộc tính của nó. Một khi Struct đã được định nghĩa thì các thuộc tính của nó không thể bị thay đổi.

Nó gần như hoàn hảo cho việc dựng lên những thứ không thay đổi trong ứng dụng của chúng ta nhưng lại không hề hữu dụng khi nhưng thuộc tính đó hay thay đổi.

Về mặt khác, nếu dữ liệu của ta vốn không có mối liên hệ mật thiết với nhau như các config hay options ,... thì bạn không nên đóng gói dữ liệu lại dưới dạng Struct, trong trường hợp này thì tốt nhất bạn nên sử dụng Hash.

Một Hash luôn luôn hữu dụng khi dùng trong việc truyền option trong các method, lưu trữ các cài đặt, config, hay làm việc với các dữ liệu không liên quan đến nhau và hay được thay đổi.

Bạn có thể hiểu đơn giản rằng Struct nằm ở giữa Hash và Class về chức năng và cách sử dụng chúng.

## Tổng kết

Struct là một khía cạnh rất hữu ích trong ngôn ngữ Ruby. Bạn có thể thường thấy chúng xử lý các phần code và chức năng cần được đóng gói nhưng không quá cầu kì như 1 Class.

Qua bài viết mình cũng mong muốn rằng các bạn nên hiểu rõ các khía cạnh và cú pháp của một ngôn ngữ để sử dụng chúng một cách tối ưu nhất và sạch đẹp nhất. 

Cảm ơn các bạn đã đọc bài viết này của mình. Xin chào và hẹn gặp lại.

*Nguồn:*
- https://www.culttt.com/2015/04/15/working-with-structs-in-ruby/
- https://www.leighhalliday.com/ruby-struct