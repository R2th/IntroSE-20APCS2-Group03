Tiếp nối phần một về Variables bài viết hôm nay sẽ trình bày về việc làm sao để clean code trong method. Mời các bạn đón đọc nhé

## Tham số truyền vào (lý tưởng nhất là 2 hoặc ít hơn)
Hạn chế số lượng các tham số truyền vào là vô cùng quan trọng vì nó làm cho test lại phương thức của bạn dễ dàng hơn. Có nhiều hơn ba tham số sẽ dẫn đến một vụ nổ tổ hợp trong đó bạn phải kiểm tra hàng tấn các trường hợp khác nhau với mỗi đối số riêng biệt.

Một hoặc hai đối số là trường hợp lý tưởng vì vậy nên tránh ba đối số nếu có thể. Bất cứ hàm nào nhiều hơn thế nên được xem xét lại. Thông thường, nếu bạn có nhiều hơn hai đối số thì phương thức của bạn đang cố gắng xử lý quá nhiều logic. Trong trường hợp không phải như vậy, hầu hết các trường hợp chúng ta có thể dùng một đối tượng cấp cao hơn làm đối số. Hoặc bạn có thể truyền dữ liệu cho phương thức bằng các instance variables.

Vì Ruby cho phép bạn tạo các đối tượng một cách nhanh chóng, không cần nhiều lớp soạn sẵn, bạn có thể sử dụng một đối tượng nếu bạn thấy mình cần nhiều đối số. Mẫu phổ biến trong Ruby là sử dụng hàm băm đối số.

Để làm rõ các thuộc tính mà phương thức mong đợi, bạn có thể sử dụng cú pháp đối số từ khóa (được giới thiệu trong Ruby 2.1). Phương pháp này có một vài ưu điểm:

1. Khi ai đó nhìn vào chữ ký phương thức, sẽ ngay lập tức biết rõ các thuộc tính nào đang được sử dụng.
2. Nếu thiếu một đối số từ khóa bắt buộc, Ruby sẽ đưa ra một ArgumentError hữu ích cho chúng ta biết chúng ta phải truyền vào các đối số nào.

**Bad:**

```ruby
def create_menu(title, body)
  # ...
end
```
**Good:**

```ruby
def create_menu(title:, body:)
  # ...
end

create_menu(title: 'Foo', body: 'Bar')
```
## Phương thức chỉ nên làm một việc
Đây là quy tắc quan trọng nhất trong công nghệ phần mềm. Khi các phương thức làm nhiều hơn một thứ, chúng khó soạn và kiểm tra hơn. Khi bạn có thể cô lập một phương thức với chỉ một hành động, chúng có thể được cấu trúc lại dễ dàng và mã của bạn đọc sẽ sạch hơn nhiều.

**Bad:**

```ruby
def email_clients(clients)
  clients.each do |client|
    client_record = database.lookup(client)
    email(client) if client_record.active?
  end
end

email_clients(clients)
```

**Good:**

```ruby
def email_clients(clients)
  clients.each { |client| email(client) }
end

def active_clients(clients)
  clients.select { |client| active_client?(client) }
end

def active_client?(client)
  client_record = database.lookup(client)
  client_record.active?
end

email_clients(active_clients(clients))
```
## Tên của phương thức phải gợi tả tác dụng của nó.

Các phương thức được đặt tên lởm sẽ thêm vào khiến người review khó đánh giá công dụng của methods một cách tốt nhất và có thể đánh lừa người review ở trường hợp tồi tệ nhất. Cố gắng nắm bắt ý định chính xác khi đặt tên phương thức.

**Bad:**

```ruby
def add_to_date(date, month)
  # ...
end

date = DateTime.now

# It's hard to tell from the method name what is added
add_to_date(date, 1)
```

**Good:**

```ruby
def add_month_to_date(date, month)
  # ...
end

date = DateTime.now
add_month_to_date(date, 1)
```

## Phương thức chỉ nên có một mức độ trừu tượng

Khi bạn có nhiều hơn một mức độ trừu tượng, phương thức của bạn thường làm quá nhiều. Việc chia nhỏ các phương thức dẫn đến khả năng sử dụng lại và kiểm tra dễ dàng hơn. Hơn nữa, các phương thức nên giảm theo mức độ trừu tượng: một phương thức rất trừu tượng sẽ gọi các phương thức ít trừu tượng hơn, v.v.

**Bad:**

```ruby
def interpret(code)
  regexes = [
    # ...
  ]

  statements = code.split(' ')
  tokens = []
  regexes.each do |regex|
    statements.each do |statement|
      # ...
    end
  end

  ast = []
  tokens.each do |token|
    # lex...
  end

  result = []
  ast.each do |node|
    # result.push(...)
  end

  result
end
```

**Good:**

```ruby
def interpret(code)
  tokens = tokenize(code)
  ast = lex(tokens)
  parse(ast)
end

def tokenize(code)
  regexes = [
    # ...
  ]

  statements = code.split(' ')
  tokens = []
  regexes.each do |regex|
    statements.each do |statement|
      # tokens.push(...)
    end
  end

  tokens
end

def lex(tokens)
  ast = []
  tokens.each do |token|
    # ast.push(...)
  end

  ast
end

def parse(ast)
  result = []
  ast.each do |node|
    # result.push(...)
  end

  result
end
```

## Xóa mã trùng lặp

Làm mọi thứ tốt nhất của bạn để tránh việc trùng lặp mã. Mã trùng lặp là cực xấu vì điều đó có nghĩa là có nhiều hơn một nơi phải thay đổi nếu bạn cần thay đổi một số logic.

Hãy tưởng tượng nếu bạn điều hành một nhà hàng và bạn theo dõi hàng tồn kho của mình: tất cả cà chua, hành tây, tỏi, gia vị, v.v ... Nếu bạn có nhiều danh sách mà bạn giữ nó, thì tất cả phải được cập nhật khi bạn phục vụ một món ăn với cà chua trong chúng. Nếu bạn chỉ có một danh sách, chỉ có một nơi để cập nhật!

Thông thường, bạn có mã trùng lặp vì bạn có hai hoặc nhiều thứ hơi khác nhau, có nhiều điểm chung, nhưng sự khác biệt của chúng buộc bạn phải có hai hoặc nhiều phương thức riêng biệt thực hiện nhiều việc giống nhau. Loại bỏ mã trùng lặp có nghĩa là tạo ra một sự trừu tượng có thể xử lý tập hợp các thứ khác nhau này chỉ bằng một phương thức / mô-đun / lớp.

Trừu tượng hóa đúng là rất quan trọng, đó là lý do tại sao bạn nên tuân theo các nguyên tắc SOLID được nêu trong phần Classes. Trừu tượng sai có thể tồi tệ hơn mã trùng lặp, vì vậy hãy cẩn thận!

**Bad:**

```ruby
def show_developer_list(developers)
  developers.each do |developer|
    data = {
      expected_salary: developer.expected_salary,
      experience: developer.experience,
      github_link: developer.github_link
    }

    render(data)
  end
end

def show_manager_list(managers)
  managers.each do |manager|
    data = {
      expected_salary: manager.expected_salary,
      experience: manager.experience,
      portfolio: manager.mba_projects
    }

    render(data)
  end
end
```
**Good:**

```ruby
def show_employee_list(employees)
  employees.each do |employee|
    data = {
      expected_salary: employee.expected_salary,
      experience: employee.experience
    }

    case employee.type
    when 'manager'
      data[:portfolio] = employee.mba_projects
    when 'developer'
      data[:github_link] = employee.github_link
    end

    render(data)
  end
end
```

## Không sử dụng flags làm tham số phương thức

Flags nói cho người dùng của bạn biết rằng phương thức này thực hiện nhiều hơn một điều. Phương thức chỉ nên làm một việc. Tách các phương thức của bạn ra nếu chúng theo các đường dẫn mã khác nhau dựa trên boolean.

**Bad:**

```ruby
def create_file(name, temp)
  if temp
    fs.create("./temp/#{name}")
  else
    fs.create(name)
  end
end
```

**Good:**

```ruby
def create_file(name)
  fs.create(name)
end

def create_temp_file(name)
  create_file("./temp/#{name}")
end
```

## Tránh tác dụng phụ (phần 1)
Một phương thức tạo ra các hiệu ứng phụ nếu nó làm bất cứ điều gì nhiều hơn là lấy các giá trị và / hoặc trả về các giá trị. Một tác dụng phụ có thể là ghi vào một tệp, sửa đổi một số biến toàn cục hoặc vô tình chuyển tất cả tiền của bạn cho một người lạ.

Điểm chính là để tránh những cạm bẫy phổ biến như chia sẻ trạng thái giữa các đối tượng mà không có bất kỳ cấu trúc nào, sử dụng các loại dữ liệu có thể thay đổi có thể được ghi vào bất cứ điều gì và không tập trung vào nơi xảy ra tác dụng phụ của bạn. Nếu bạn có thể làm điều này, bạn sẽ hạnh phúc hơn đại đa số các lập trình viên khác.

**Bad:**

```ruby
# Global variable referenced by following method.
# If we had another method that used this name, now it'd be an array and it could break it.
name = 'Ryan McDermott'

def split_into_first_and_last_name
  name = $name.split(' ')
end

split_into_first_and_last_name()

puts name # ['Ryan', 'McDermott']
```

**Good:**

```ruby
def split_into_first_and_last_name(name)
  name.split(' ')
end

name = 'Ryan McDermott'
first_and_last_name = split_into_first_and_last_name(name)

puts name # 'Ryan McDermott'
puts first_and_last_name # ['Ryan', 'McDermott']
```

## Tránh tác dụng phụ (phần 2)

Trong Ruby, mọi thứ đều là một đối tượng và mọi thứ đều được truyền qua giá trị, nhưng các giá trị này là tham chiếu đến các đối tượng. Trong trường hợp đối tượng và mảng, nếu phương thức của bạn thực hiện thay đổi trong mảng giỏ hàng, chẳng hạn, bằng cách thêm một mặt hàng để mua, thì bất kỳ phương thức nào khác sử dụng mảng giỏ hàng đó cũng sẽ bị ảnh hưởng bởi sự bổ sung này. Hãy tưởng tượng một tình huống xấu:

Người dùng nhấp vào "Mua", nút đó gọi một phương thức purchase và sinh ra một yêu cầu và gửi các mảng giỏ hàng đến máy chủ. Do kết nối mạng không tốt, phương thức purchase phải tiếp tục thử lại yêu cầu. Bây giờ, điều gì sẽ xảy ra nếu trong lúc đó, người dùng vô tình nhấp vào nút "Thêm vào giỏ hàng" trên một mặt hàng mà họ không thực sự muốn trước khi yêu cầu mạng bắt đầu? Nếu điều đó xảy ra và yêu cầu mạng bắt đầu, thì phương thức mua đó sẽ gửi mục vô tình được thêm vào vì nó có tham chiếu đến mảng giỏ hàng mà phương thức add_item_to_cart đã sửa đổi bằng cách thêm một mục không mong muốn.

Một giải pháp tuyệt vời là cho add_item_to_cart luôn tạo bản sao của cart, chỉnh sửa nó, và trả lại bản sao. Điều này đảm bảo rằng không có phương thức nào khác đang tham chiếu vào giỏ hàng sẽ bị ảnh hưởng bởi bất kỳ thay đổi nào.

Có hai lưu ý để đề cập đến phương pháp này:

1. Có thể có trường hợp bạn thực sự muốn thay đổi các đối tượng đầu vào, nhưng khi bạn áp dụng và thực hành phương pháp lập trình này, bạn sẽ thấy rằng những trường hợp đó là khá hiếm. Hầu hết mọi thứ có thể được refactored không có tác dụng phụ!
2. Nhân bản đối tượng lớn có thể rất tốn kém về hiệu suất. May mắn thay, đây không phải là một vấn đề lớn trong thực tế bởi vì có những [gem](https://github.com/hamstergem/hamster) tuyệt vời cho phép phương pháp lập trình này nhanh và không tốn nhiều bộ nhớ như bạn có thể sao chép thủ công các đối tượng và mảng.

**Bad:**

```ruby
def add_item_to_cart(cart, item)
  cart.push(item: item, time: Time.now)
end
```
**Good:**

```ruby
def add_item_to_cart(cart, item)
  cart + [{ item: item, time: Time.now }]
end
```
## Ưu tiên lập trình chức năng hơn lập trình mệnh lệnh

Ruby không phải là ngôn ngữ chức năng theo cách của Haskell, nhưng nó có khả năng làm điều đó. Ngôn ngữ chức năng sạch hơn và dễ kiểm tra hơn. Ủng hộ phong cách lập trình này khi bạn có thể.

**Bad:**

```ruby
programmer_output = [
  {
    name: 'Uncle Bobby',
    lines_of_code: 500
  }, {
    name: 'Suzie Q',
    lines_of_code: 1500
  }, {
    name: 'Jimmy Gosling',
    lines_of_code: 150
  }, {
    name: 'Grace Hopper',
    lines_of_code: 1000
  }
]

total_output = 0

programmer_output.each do |output|
  total_output += output[:lines_of_code]
end
```

**Good:**

```ruby
programmer_output = [
  {
    name: 'Uncle Bobby',
    lines_of_code: 500
  }, {
    name: 'Suzie Q',
    lines_of_code: 1500
  }, {
    name: 'Jimmy Gosling',
    lines_of_code: 150
  }, {
    name: 'Grace Hopper',
    lines_of_code: 1000
  }
]

INITIAL_VALUE = 0

total_output = programmer_output.sum(INITIAL_VALUE) { |output| output[:lines_of_code] }
```

## Đóng gói các điều kiện

**Bad:**

```ruby
if params[:message].present? && params[:recipient].present?
  # ...
end
```
**Good:**

```ruby
def send_message?(params)
  params[:message].present? && params[:recipient].present?
end

if send_message?(params)
  # ...
end
```
## Tránh các điều kiện ngược
**Bad:**

```ruby
if !genres.blank?
  # ...
end
```
**Good:**

```ruby
unless genres.blank?
  # ...
end

# or

if genres.present?
  # ...
end
```

## Tránh các điều kiện
Đây dường như là một nhiệm vụ bất khả thi. Khi nghe điều này lần đầu tiên, hầu hết mọi người nói, "làm thế nào tôi có thể làm bất cứ điều gì mà không có if?" Câu trả lời là bạn có thể sử dụng đa hình để đạt được cùng một nhiệm vụ trong nhiều trường hợp. Câu hỏi thứ hai thường là "thật tuyệt vời nhưng tại sao tôi lại muốn làm điều đó?" Câu trả lời là một khái niệm mã sạch trước đây mà chúng ta đã học: một phương thức chỉ nên làm một việc. Khi bạn có các lớp và phương thức có câu lệnh if, bạn đang nói với người dùng của bạn rằng phương thức của bạn thực hiện nhiều hơn một điều. Hãy nhớ, chỉ cần làm một điều.

**Bad:**

```ruby
class Airplane
  # ...
  def cruising_altitude
    case @type
    when '777'
      max_altitude - passenger_count
    when 'Air Force One'
      max_altitude
    when 'Cessna'
      max_altitude - fuel_expenditure
    end
  end
end
```

**Good:**

```ruby
class Airplane
  # ...
end

class Boeing777 < Airplane
  # ...
  def cruising_altitude
    max_altitude - passenger_count
  end
end

class AirForceOne < Airplane
  # ...
  def cruising_altitude
    max_altitude
  end
end

class Cessna < Airplane
  # ...
  def cruising_altitude
    max_altitude - fuel_expenditure
  end
end
```

## Tránh type-checking (phần 1)

Ruby là một ngôn ngữ động, có nghĩa là các phương thức của bạn có thể nhận bất kỳ loại đối số nào. Đôi khi bạn gặp khó bởi sự tự do này và việc kiểm tra kiểu trong phương pháp của bạn trở nên hấp dẫn. Có nhiều cách để tránh phải làm điều này. Điều đầu tiên cần xem xét là các API nhất quán.

**Bad:**

```ruby
def travel_to_texas(vehicle)
  if vehicle.is_a?(Bicycle)
    vehicle.pedal(@current_location, Location.new('texas'))
  elsif vehicle.is_a?(Car)
    vehicle.drive(@current_location, Location.new('texas'))
  end
end
```
**Good:**

```ruby
def travel_to_texas(vehicle)
  vehicle.move(@current_location, Location.new('texas'))
end
```

## Tránh type-checking (phần 2)

Nếu bạn đang làm việc với các giá trị cơ bản như chuỗi và số nguyên và bạn không thể sử dụng đa hình nhưng bạn vẫn cảm thấy cần phải kiểm tra loại, bạn nên xem xét sử dụng [contracts.ruby](https://github.com/egonSchiele/contracts.ruby). 

**Bad:**

```ruby
def combine(val1, val2)
  if (val1.is_a?(Numeric) && val2.is_a?(Numeric)) ||
     (val1.is_a?(String) && val2.is_a?(String))
    return val1 + val2
  end

  raise 'Must be of type String or Numeric'
end
```
**Good:**

```ruby
def combine(val1, val2)
  val1 + val2
end
```

## Xóa code không sử dụng

Mã chết cũng tệ như mã trùng lặp. Không có lý do để giữ nó trong cơ sở mã của bạn. Nếu nó không được gọi, hãy loại bỏ nó! Nó vẫn sẽ an toàn trong lịch sử phiên bản của bạn nếu bạn vẫn cần nó.

**Bad:**

```ruby
def old_request_module(url)
  # ...
end

def new_request_module(url)
  # ...
end

req = new_request_module(request_url)
inventory_tracker('apples', req, 'www.inventory-awesome.io')
```

**Good:**

```ruby
def new_request_module(url)
  # ...
end

req = new_request_module(request_url)
inventory_tracker('apples', req, 'www.inventory-awesome.io')
```

# TÀI LIỆU THAM KHẢO
https://github.com/uohzxela/clean-code-ruby#methods