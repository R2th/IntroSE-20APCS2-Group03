- Bài viết được dịch từ bài [Ruby Struct](https://longliveruby.com/articles/ruby-struct) của tác giả [Paweł Dąbrowski]().
-----

![](https://longliveruby.com/assets/images/struct.svg)

-----
*Nói một cách dễ hiểu, Ruby Struct là một class tích hợp cung cấp các chức năng và shortcut hữu ích. Bạn có thể sử dụng nó cho cả code logic và unit tests. Ta sẽ nhanh chóng xem qua các tính năng của nó, so sánh với những thứ tương tự khác và chỉ ra một số thông tin ít được biết đến nhưng vẫn hữu ích về nó.*

---
## Cách sử dụng cơ bản
```ruby
Employee = Struct.new(:first_name, :last_name)
employee = Employee.new("John", "Doe")
employee.first_name # => "John"
employee.last_name # => "Doe"
```
Như bạn có thể thấy, nó hoạt động giống như một class Ruby đơn giản. Đoạn mã trên tương đương với:
```ruby
class Employee
  attr_reader :first_name, :last_name

  def initialize(first_name, last_name)
    @first_name = first_name
    @last_name = last_name
  end
end

employee = Employee.new("John", "Doe")
...
```
Điều gì sẽ xảy ra nếu chúng ta muốn define tên `#full_name` trên class `Employee` của mình? Điều đó với Struct chỉ là dễ như ăn cháo:
```ruby
Employee = Struct.new(:first_name, :last_name) do
  def full_name
    "#{first_name} #{last_name}"
  end
end

employee = Employee.new("John", "Doe")
employee.full_name # => "John Doe"
```
---
## Khi nào sử dụng Struct
Struct thường được sử dụng để làm cho code sạch hơn, định dạng dữ liệu có cấu trúc hơn từ hash hoặc thay thế cho các class trong thế giới thực trong các unit test(stub).
> **Cấu trúc dữ liệu tạm thời** - ví dụ phổ biến nhất là phản hồi vị trí mã hóa địa lý trong đó bạn muốn tạo đối tượng Address với các thuộc tính thay vì hash với dữ liệu được mã hóa địa lý.
> Cleaner code
> Tests - miễn là Struct đáp ứng các method tương tự như đối tượng được sử dụng trong các test case, bạn có thể thay thế nó nếu nó có ý nghĩa. Bạn có thể cân nhắc sử dụng nó khi đang test dependency injection(1 khái niệm trong viết test).
---
## Khi nào không sử dụng Struct
Tránh kế thừa từ Struct. Tôi đã cố ý gán Struct là 1 hằng số trong các ví dụ trên thay vì thực hiện kế thừa kiểu này:
```ruby
class Employee < Struct.new(:first_name, :last_name)
  def full_name
    "#{first_name} #{last_name}"
  end
end
```
Khi class của bạn kế thừa từ Struct, bạn có thể không nhận ra rằng:
> **Đối số là không bắt buộc** - nếu một trong các đối số được truyền là một đối tượng, thì việc gọi một phương thức trên đối tượng(đối số) đó sẽ gây ra lỗi.

> **Các thuộc tính luôn ở chế độ public** - còn lâu mới có thể đóng gói hoàn hảo trong lập trình OOP trừ khi bạn mong muốn hành vi như vậy.

> **Các Instances *bằng nhau* nếu thuộc tính của chúng *bằng nhau*** - ```Employee.new == Employee.new```.

> Các Struct không muốn được xếp vào class con - vì nó tạo ra một class anonymous không được sử dụng và nó được đề cập trong [tài liệu của ruby](https://ruby-doc.org/core-2.7.3/Struct.html#method-c-new)

---
## Nghịch 1 tí xem nào
Truy cập các class attributes theo cách bạn muốn:
```ruby
person = Struct.new(:first_name).new("John")
person.first_name # => "John"
person[:first_name] # => "John"
person["first_name"] # => "John"
```
Sử dụng toán tử `==`:
```ruby
Person = Struct.new(:first_name)
Person.new("John") == Person.new("John") # => true
```
Lặp lại các giá trị hoặc cặp key-value:
```ruby
Person = Struct.new(:first_name, :last_name)
person = Person.new("John", "Doe")
# Values

person.each do |value|
  puts value
end
# >> "John"
# >> "Doe"

# Pairs

person.each_pair do |key, value|
  puts "#{key}: #{value}"
end
# >> "first_name: John"
# >> "last_name: Doe"
```
Dig:
```ruby
Address = Struct.new(:city)
Person = Struct.new(:name, :address)
address = Address.new("New York")
person = Person.new("John Doe", address)

person.dig(:address, :city) # => "New York"
```
---
## Giải pháp thay thế
### Hash
Hash cũng được coi là một giải pháp thay thế cho Struct. Nó nhanh hơn để sử dụng nhưng có hiệu suất kém hơn đối thủ của nó (sẽ kiểm tra điều này một chút sau 1 lát nữa trong bài viết này).
### OpenStruct
penStruct là giải pháp thay thế chậm hơn nhưng **linh hoạt hơn**. Sử dụng nó, bạn có thể gán thuộc tính động và nó không yêu cầu các thuộc tính được define trước. Tất cả những gì bạn phải làm là chuyển một hash với các thuộc tính:
```ruby
employee = OpenStruct.new(first_name: "John", last_name: "Doe")
employee.first_name # => "John"
employee.age = 30
employee.age # => 30
```
### Standard boilerplate (tạm dịch là hình thức tiêu chuẩn của class)
```ruby
class Employee
  def initialize(first_name, last_name)
    @first_name = first_name
    @last_name = last_name
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end
```
---
## So sánh các giải pháp thay thế

| Name | Non existing attributes | Dynamically add attribute | Performance (lower is better) |
| -------- | -------- | -------- | -------- |
| Struct     | raises error     | No     | 1 |
| OpenStruct    | return nil   | Yes     | 3 |
| Hash     | return nil     | Yes     | 2 |

### Benchmarks:
Tôi(là máy của tôi - người dịch chứ ko phải blogger nha, máy tác giả yếu vc) đã sử dụng code sau để đo hiệu suất của các giải pháp trên:
```ruby
Benchmark.bm 10 do |bench|
  bench.report "Hash: " do
    10_000_000.times do { name: "John Doe", city: "New York" } end
  end

  bench.report "Struct: " do
    klass = Struct.new(:name, :age)
    10_000_000.times do klass.new("John Doe", "New York") end
  end

  bench.report "Open Struct: " do
    10_000_000.times do OpenStruct.new(name: "John Doe", city: "New York") end
  end
end
```
Kết quả
|  _             | user     | system      | total        | real |
|  -------     | -------- | -------- | -------- | -------- |
| Hash:        | 1.333417   | 0.004080   | 1.337497 | (  1.351830)
| Struct:      | 2.304979   | 0.003783   | 2.308762 | (  2.334882)
| Open Struct:   | 5.938863   | 0.003962   | 5.942825 | (  5.990706)
### kết luận:
Open Struct là giải pháp chậm nhất và linh hoạt nhất trong phép so sánh trên. Struct có vẻ là sự lựa chọn tốt nhất. => nên dùng Struct nếu có thể.