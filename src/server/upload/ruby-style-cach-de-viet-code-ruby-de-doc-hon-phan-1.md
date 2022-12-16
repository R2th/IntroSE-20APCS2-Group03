## Bố cục trình bày khi viết code
*  Sử dụng chuẩn mã hóa UTF8 khi code
*  Dùng 2 khoảng trắng (space) cho mỗi tầng thụt đầu dòng, không sử dụng tab cứng
```
# bad - four spaces
def some_method
    do_something
end

# good
def some_method
  do_something
end
```
*  Sử dụng dấu cuối dòng theo UNIX style
Nếu đang sử dụng GIT, nên cấu hình như sau để chặn các dấu cuôi dòng của window
```
git config --global core.autocrlf true
```
* Không dùng dấu `(;)` để ngăn cách câu lệnh và biểu thức, mà hãy viết mỗi câu trên 1 dòng
```
# bad
puts 'foobar'; # Thừa dấu chấm phẩy

puts 'foo'; puts 'bar' # hai câu lệnh trên cùng 1 dòng

# good
puts 'foobar'

puts 'foo'
puts 'bar'

puts 'foo', 'bar' # câu lệnh này sẽ tự tách làm hai lệnh `puts`
```
* Nếu class không có nội dung hãy viết trên 1 dòng
```
# bad
class FooError < StandardError
end

# okish
class FooError < StandardError; end

# good
FooError = Class.new(StandardError)
```
* Tránh viết gom phương thức vào 1 dòng, nên viết mỗi câu lệnh trên 1 dòng
```
# bad
def too_much; something; something_else; end

# okish - dấu ; ngay sau tên hàm bắt buộc phải có
def no_braces_method; body end

# okish - dấu ; sau body thì không bắt buộc
def no_braces_method; body; end

# okish - đúng cú pháp, nhưng không có ; sau tên hàm khiến khó đọc hơn
def some_method() body end

# good
def some_method
  body
end
```
Nhưng cũng có ngoại lệ, phương thức không có body thì nên viết trên 1 hàng
```
# good
def no_op; end
```
* Đặt khoảng trắng trước và sau toán tử, sau dấu phẩy, dấu hai chấm, dấu chấm phẩy, để code của bạn dễ đọc hơn
```
sum = 1 + 2
a, b = 1, 2
class FooError < StandardError; end
```
* KHÔNG DÙNG khoảng trắng sau (, [ hay trước ], ). DÙNG khoảng trắng quanh { và trước }
```
# bad
some( arg ).other
[ 1, 2, 3 ].each{|e| puts e}

# good
some(arg).other
[1, 2, 3].each { |e| puts e }
```
* Không sử dụng khoảng trắng sau dấu `!`
```
# bad
! something

# good
!something
```
* Không dùng khoảng trắng khi khai báo khoảng (range)
```
# bad
1 .. 3
'a' ... 'z'

# good
1..3
'a'...'z'
```
* when và case thụt đầu dòng cùng cấp
```
# bad
case
  when song.name == 'Misty'
    puts 'Not again!'
  when song.duration > 120
    puts 'Too long!'
  when Time.now.hour > 21
    puts "It's too late"
  else
    song.play
end

# good
case
when song.name == 'Misty'
  puts 'Not again!'
when song.duration > 120
  puts 'Too long!'
when Time.now.hour > 21
  puts "It's too late"
else
  song.play
end
```
* Gán kết quả của một biểu thức cho một biến, cặp case, when hay if,else cũng phải cùng cấp
```
# bad - pretty convoluted
kind = case year
when 1850..1889 then 'Blues'
when 1890..1909 then 'Ragtime'
when 1910..1929 then 'New Orleans Jazz'
when 1930..1939 then 'Swing'
when 1940..1950 then 'Bebop'
else 'Jazz'
end

result = if some_cond
  calc_something
else
  calc_something_else
end

# good - it's apparent what's going on
kind = case year
       when 1850..1889 then 'Blues'
       when 1890..1909 then 'Ragtime'
       when 1910..1929 then 'New Orleans Jazz'
       when 1930..1939 then 'Swing'
       when 1940..1950 then 'Bebop'
       else 'Jazz'
       end

result = if some_cond
           calc_something
         else
           calc_something_else
         end

# good (and a bit more width efficient)
kind =
  case year
  when 1850..1889 then 'Blues'
  when 1890..1909 then 'Ragtime'
  when 1910..1929 then 'New Orleans Jazz'
  when 1930..1939 then 'Swing'
  when 1940..1950 then 'Bebop'
  else 'Jazz'
  end

result =
  if some_cond
    calc_something
  else
    calc_something_else
  end
```
* Thêm một dòng trống giữa các phương thức, và các nhóm xử lý logic.
```
def some_method
  data = initialize(options)

  data.manipulate!

  data.result
end

def some_method
  result
end
```
* Không dùng dấu `,` sau tham số cuối cùng khi khai báo phương thưc
```
# bad - cách làm này giúp dễ thêm/xóa/di chuyển tham số,
# nhưng không khuyến khích dùng
some_method(
             size,
             count,
             color,
           )

# bad
some_method(size, count, color, )

# good
some_method(size, count, color)
```
* Dùng khoảng trắng quanh toán tử `=` khi gán giá trị mặc định
```
# bad
def some_method(arg1=:default, arg2=nil, arg3=[])
  # do something...
end

# good
def some_method(arg1 = :default, arg2 = nil, arg3 = [])
  # do something...
end
```
*  gọi phương thức có nhiều đối số, nên xuống dòng, và các đối số này cần thụt đầu dòng bằng nhau và ở cùng cấp với đối số đầu tiên
```
# mẫu (dòng quá dài)
def send_mail(source)
  Mailer.deliver(to: 'bob@example.com', from: 'us@example.com', subject: 'Important message', body: source.text)
end

# bad (thụt đầu dòng hai lần)
def send_mail(source)
  Mailer.deliver(
      to: 'bob@example.com',
      from: 'us@example.com',
      subject: 'Important message',
      body: source.text)
end

# good
def send_mail(source)
  Mailer.deliver(to: 'bob@example.com',
                 from: 'us@example.com',
                 subject: 'Important message',
                 body: source.text)
end

# good (thụt đầu dòng bình thường)
def send_mail(source)
  Mailer.deliver(
    to: 'bob@example.com',
    from: 'us@example.com',
    subject: 'Important message',
    body: source.text
  )
end
```
* Với số lớn, thêm dấu gạch dưới `_` cho dễ đọc
```
# bad - có bao nhiêu số `0`?
num = 1000000000

# good - dễ đọc hơn hẳn đúng không :P
num = 1_000_000_000
```
## Cú pháp / Syntax
* CHỈ sử dụng `::` cho hằng số (của cả classes và modules) và các hàm khởi tạo (constructors) (vd: Array() hoặc Nokogiri::HTML()). KHÔNG sử dụng `::` cho các lời gọi hàm thông thường.
```
# bad
SomeClass::some_method
some_object::some_method

# good
SomeClass.some_method
some_object.some_method
SomeModule::SomeClass::SOME_CONST
SomeModule::SomeClass()
```
* Chỉ dùng `()` khi khai báo phương thức có tham số
```
# bad
def some_method()
  # body omitted
end

# good
def some_method
  # body omitted
end

# bad
def some_method_with_parameters param1, param2
  # body omitted
end

# good
def some_method_with_parameters(param1, param2)
  # body omitted
end
```
* Nếu phương thức có tham số mặc định, đặt nó ở cuối cùng
```
# bad
def some_method(a = 1, b = 2, c, d)
  puts "#{a}, #{b}, #{c}, #{d}"
end

some_method('w', 'x') # => '1, 2, w, x'
some_method('w', 'x', 'y') # => 'w, 2, x, y'
some_method('w', 'x', 'y', 'z') # => 'w, x, y, z'

# good
def some_method(c, d, a = 1, b = 2)
  puts "#{a}, #{b}, #{c}, #{d}"
end

some_method('w', 'x') # => '1, 2, w, x'
some_method('w', 'x', 'y') # => 'y, 2, w, x'
some_method('w', 'x', 'y', 'z') # => 'y, z, w, x'
```
* TRÁNH khai báo biến song song, sẽ gây khó khăn khi đọc
```
# bad
a, b, c, d = 'foo', 'bar', 'baz', 'foobar'

# good
a = 'foo'
b = 'bar'
c = 'baz'
d = 'foobar'

# good - hoán đổi giá trị hai biến
a = 'foo'
b = 'bar'

a, b = b, a
puts a # => 'bar'
puts b # => 'foo'

# good - method return
def multi_return
  [1, 2]
end

first, second = multi_return

# good - dùng với splat
first, *list = [1, 2, 3, 4] # first => 1, list => [2, 3, 4]

hello_array = *'Hello' # => ["Hello"]

a = *(1..3) # => [1, 2, 3]
```
* Đừng dùng `for`, trừ khi có lý do chính đáng. Thay vào đó hãy dùng vòng lặp. `for` là một dạng của `each`, nhưng `for` không hỗ trợ `scope` (`each` thì có) và biến trong `for` thì có thể truy cập từ bên ngoài `block`.
```
arr = [1, 2, 3]

# bad
for elem in arr do
  puts elem
end

# ra khỏi vòng `for` ta vẫn truy cập biến `elem` được
elem # => 3

# good
arr.each { |elem| puts elem }

elem # => NameError: undefined local variable or method `elem'
```
* NÊN dùng toán tử ba ngôi `(?:)` hơn là cấu trúc` if/then/else/end`
```
# bad
result = if some_condition then something else something_else end

# good
result = some_condition ? something : something_else
```
* KHÔNG nên dùng toán tử ba ngôi lồng nhau
```
# bad
some_condition ? (nested_condition ? nested_something : nested_something_else) : something_else

# good
if some_condition
  nested_condition ? nested_something : nested_something_else
else
  something_else
end
```
* KHÔNG dùng từ khóa `and` và `or`. Thay vào đó hãy dùng `&&` và `||`
```
# bad
# boolean expression
if some_condition and some_other_condition
  do_something
end

# control flow
document.saved? or document.save!

# good
# boolean expression
if some_condition && some_other_condition
  do_something
end

# control flow
document.saved? || document.save!
```
* Dùng `if/unless` cho single-line body
```
# bad
if some_condition
  do_something
end

# good
do_something if some_condition

# another good option
some_condition && do_something
```
* KHÔNG dùng `unless` cùng với `else`. Thay vào đó hãy viết với biểu thức `true`
```
# bad
unless success?
  puts 'failure'
else
  puts 'success'
end

# good
if success?
  puts 'success'
else
  puts 'failure'
end
```
* KHÔNG dùng cặp ngoặc tròn` () `với `if/unless/while/until`
```
# bad
if (x > 10)
  # body omitted
end

# good
if x > 10
  # body omitted
end
```
* Với các phương thức mặc định của DSL (vd: Rake, Rails, RSpec), hay các phương thức có chứa "từ khóa" trong Ruby (vd: `attr_reader`, `puts`) và các phương thức truy cập thuộc tính thì không dùng `()`
```
class Person
  # bad
  attr_reader(:name, :age)
  # good
  attr_reader :name, :age

  # body omitted
end

# bad
temperance = Person.new 'Temperance', 30
# good
temperance = Person.new('Temperance', 30)

# bad
puts(temperance.age)
# good
puts temperance.age

# bad
x = Math.sin y
# good
x = Math.sin(y)

# bad
array.delete e
# good
array.delete(e)

# bad
expect(bowling.score).to eq 0
# good
expect(bowling.score).to eq(0)
```
* Nếu block chỉ làm một việc thì ưu tiên dùng shorthand
```
# bad
names.map { |name| name.upcase }

# good
names.map(&:upcase)
```
* Ưu tiên` {...}` hơn `do...end` cho block một dòng
```
names = %w(Bozhidar Steve Sarah)

# bad
names.each do |name|
  puts name
end

# good
names.each { |name| puts name }

# bad
names.select do |name|
  name.start_with?('S')
end.map { |name| name.upcase }

# good
names.select { |name| name.start_with?('S') }.map(&:upcase)
```
* Tránh dùng `self` khi không bắt buộc. Chỉ dùng nó khi cần ghi giá trị vào biến
```
# bad
def ready?
  if self.last_reviewed_at > self.last_updated_at
    self.worker.update(self.content, self.options)
    self.status = :in_progress
  end
  self.status == :verified
end

# good
def ready?
  if last_reviewed_at > last_updated_at
    worker.update(content, options)
    self.status = :in_progress
  end
  status == :verified
end
```
* Dùng kiểu gán rút gọn khi có thể
```
# bad
x = x + y
x = x * y
x = x**y
x = x / y
x = x || y
x = x && y

# good
x += y
x *= y
x **= y
x /= y
x ||= y
x &&= y
```
* Dùng `||= `để khởi tạo giá trị khi biến đó chưa được khởi tạo
```
# bad
name = name ? name : 'Bozhidar'

# bad
name = 'Bozhidar' unless name

# good - set name to 'Bozhidar', only if it's nil or false
name ||= 'Bozhidar'
```
* Dùng cú pháp `lambda` mới cho `block` có một dòng. Nếu nhiều dòng thì dùng từ khóa `lambda`
```
# bad
l = lambda { |a, b| a + b }
l.call(1, 2)

# correct, but looks extremely awkward
l = ->(a, b) do
  tmp = a * 7
  tmp * b / 50
end

# good
l = ->(a, b) { a + b }
l.call(1, 2)

l = lambda do |a, b|
  tmp = a * 7
  tmp * b / 50
end
```
* Khi dùng lambda với biến, nên đặt biến trong ngoặc tròn.
```
# bad
l = ->x, y { something(x, y) }

# good
l = ->(x, y) { something(x, y) }
```
lambda không có tham số thì bỏ ngoặc tròn đi
```
# bad
l = ->() { something }

# good
l = -> { something }
```
* Dùng tiền tố `_` cho biến không dùng trong block và biến cục bộ
```
# bad
result = hash.map { |k, v| v + 1 }

def something(x)
  unused_var, used_var = something_else(x)
  # some code
end

# good
result = hash.map { |_k, v| v + 1 }

def something(x)
  _unused_var, used_var = something_else(x)
  # some code
end

# good
result = hash.map { |_, v| v + 1 }

def something(x)
  _, used_var = something_else(x)
  # some code
end
```
* Ưu tiên dùng Array#join hơn là Array#* với tham số là string
```
# bad
%w(one two three) * ', '
# => 'one, two, three'

# good
%w(one two three).join(', ')
# => 'one, two, three'
```
## Kết
Trên đây mình giới thiệu với mọi người cách bố cục, trình bày và cú pháp khi viết code trong ruby để code của bạn dễ nhìn, dễ đọc hơn.
Ở bài viết sau mình sẽ trình bày về cách đặt tên.

Nguồn tham khảo: [https://github.com/CQBinh/ruby-style-guide](https://github.com/CQBinh/ruby-style-guide)