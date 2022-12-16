![](https://images.viblo.asia/a32f65b4-ee22-4786-a400-2e96149043a0.jpeg)
###### Dưới đây là những cách viết sao cho code mình có thể clean nhất mà mình đọc được:<br>
##### 1. Variables:
######  1.1 Sử dụng tên biến có ý nghĩa :<br>
**Bad:**
```ruby
yyyymmdstr = Time.now.strftime('%Y/%m/%d')
```
**Good:**
```ruby
current_date = Time.now.strftime('%Y/%m/%d')
```
Chọn một từ cho việc định nghĩa biến và bám sát nghĩa của nó:<br>
**Bad:**
```ruby
user_info
user_data
user_record

starts_at
start_at
start_time
```
**Good:**
```ruby
user

starts_at
```
###### 1.2. Sử dụng tên có thể tìm kiếm và sử dụng biến CONSTANT
**Bad:**
```ruby
status = Timeout::timeout(360000) do
  # ...
end
```
**Good:**
```ruby
SECONDS_IN_A_DAY = 360000

status = Timeout::timeout(SECONDS_IN_A_DAY) do
  # ...
end
```
###### 1.3. Không lặp lại tên biến trùng với tên của class hay đổi tượng khởi tạo nó:
**Bad:**
```ruby
car = {
  car_make: 'Honda',
  car_model: 'Yamaha',
  car_color: 'Toyota'
}

def paint_car(car)
  car[:car_color] = 'Red'
end
```
**Good:**
```ruby
car = {
  make: 'Honda',
  model: 'Yamaha',
  color: 'Toyota'
}

def paint_car(car)
  car[:color] = 'Red'
end
```
##### 2. Method
###### 2.1. Một hàm chỉ nên làm một việc
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
###### 2.2 Tên hàm nên nói những gì chúng làm
**Bad:**
```ruby
def add_to_date(date, year)
  # ...
end

date = DateTime.now
add_to_date(date, 1995)
```
**Good:**
```ruby
def add_year_to_date(date, year)
  # ...
end

date = DateTime.now
add_year_to_date(date, 1995)
```
###### 2.3 Xóa các code trùng lặp
Nên hạn chế việc viết code trùng lặp nhau để có thể cải thiện  về performance cũng như về mặt logic sao cho hiệu quả nhất<br>
**Bad:**
```ruby
def show_developer_list(developers)
  developers.each do |developer|
    data = {
      expected_salary: developer.expected_salary,
      experience: developer.experience,
      github_link: developer.github_link
    }

   puts data
  end
end

def show_manager_list(managers)
  managers.each do |manager|
    data = {
      expected_salary: manager.expected_salary,
      experience: manager.experience,
      portfolio: manager.mba_projects
    }
    
    puts data
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
    
    puts data
  end
end
```
###### 2.4 Không sử dụng flag làm tham số cho hàm
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
##### 3. Đối tượng và cấu trúc dữ liệu
##### Sử dụng getters and setters
Sử dụng getters và setters để truy cập dữ liệu trên các đối tượng sẽ tốt hơn là chỉ tìm kiếm một thuộc tính trên một đối tượng<br>
**Bad:**
```ruby
def make_bank_account
  # ...

  {
    balance: 0
    # ...
  }
end

account = make_bank_account
account[:balance] = 1000000
account[:balance] # => 1000000
```
**Good:**
```ruby
class BankAccount
  def initialize
    @balance = 0
  end

  def balance
    #...some logging
    @balance
  end

  def balance=(amount)
    #...some logging
    #...some validate
    @balance = amount
  end
end

account = BankAccount.new
account.balance = 1000000
account.balance # => 1000000
```
Hoặc bạn có thể dùng `attr_accessor` để định nghĩa chúng, ví dụ:
```ruby
class Book
  attr_accessor :price
end

book = Book.new
book.price = 50
book.price # => 50
```
Tuy nhiên, bạn phải lưu ý rằng trong một số tình huống, sử dụng `attr_accessor` là sẽ không ổn chút nào, bạn có thể tìm hiểu thêm [tại đây](http://solnic.eu/2012/04/04/get-rid-of-that-code-smell-attributes.html)<br>
#### 4. Classes
**Bad:**
```ruby
class Moto
  def initialize(make, model, color)
    @make = make
    @model = model
    @color = color
    self
  end

  def set_make(make)
    @make = make
    self
  end

  def set_model(model)
    @model = model
    self
  end

  def set_color(color)
    @color = color
    self
  end

  def save
    # save object...
    self
  end
end

moto = Moto.new('Ducati','F-150','red')
  .set_color('red')
  .save
```
**Good:**
```ruby
class Moto
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

moto = Moto.new('Ducati', 'F-150', 'red')
moto.color = 'red'
moto.save
```
###### Trên đây là một số cách viết sao cho code có thể clean nhất, để cải thiện hiệu suất cũng như logic và làm cho người khác nhìn vào có thể hiểu được mình đang làm cái gì.
#### Tài liệu tham khảo:
[Git-Clean-Code-Ruby](https://github.com/uohzxela/clean-code-ruby#variables)<br>
[Book Clean Code](https://www.investigatii.md/uploads/resurse/Clean_Code.pdf)