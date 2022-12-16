Mỗi khi học một ngôn ngữ mới chúng ta thường chỉ để ý đến cú pháp, câu lệnh hay đơn giản là viết làm sao để có thể chạy đúng yêu cầu, chạy có kết quả mà lại ít khi để ý đến convention, coding style. Việc bỏ qua những thứ nhỏ nhặt đó lại mang đến hậu quả khá lớn về sau khi mà chúng ta đã thông thạo, đã quen với một cách viết cẩu thả, tự do mang phong cách freestyle. Có thể hình dung những đoạn code bạn viết ra sau một thời gian nó sẽ như một mớ hỗn độn, không theo một nguyên tắc chung nào cả lúc thì viết thế này, lúc khác lại viết thế nọ. Điều đó làm cho chúng ta khó có thể đọc lại để maintain, thay đổi hoặc phát triển mở rộng. Vấn đề đáng quan ngại hơn là khi làm việc teamwork mà mỗi người đều viết code theo kiểu freestyle như vậy thì chả khác gì project mà chúng ta vẫn thường làm khi đang ngồi trên ghế giảng đường cả, code như vậy sẽ không mang lại nhiều giá trị cho cộng đồng hay cho chính sự phát triển của bản thân bạn. 

Đối với mình viết code cũng như học chính tả vậy, ngay từ ngày đầu học cú pháp của một ngữ chúng ta cũng nên tìm hiểu xem coding style của nó hay viết một cách ngắn gọn, dễ đọc, dễ hiểu mà lại mạch lạc đảm bảo chặt chẽ logic. Sau mỗi hàm, mỗi class chúng ta lại dừng lại review xem những dòng code của mình viết ra đã thật sự tự nhiên, gần gũi như đang đọc một cuốn sách từ trên xuống dưới chưa vậy. 

Bài viết dưới đây mình sẽ chia sẻ về một số coding style trong ngôn ngữ Ruby, mọi người cùng tham khảo nhé

# Style Guide
Các bạn nên để ý một số điểm cơ bản hay convention cần lưu ý sau:
* Sử dụng soft-tab với 2 space indent.
* Các dòng code nên viết với chiều dài sao cho dễ đọc nhất trừ khi có lý do đặc biệt. Nên để các dòng code ít hơn 100 characters.
* Không để lại các khoảng trắng.
* Kết thúc file bằng một [newline](https://github.com/rubocop-hq/ruby-style-guide#newline-eof).
* Sử dụng space xung quanh các phương thức, sau dấu `{` trước dấu `}` và sau các dấu `.` `,` `;`.
```
sum = 1 + 2
a, b = 1, 2
1 > 2 ? true : false; puts "Hi"
[1, 2, 3].each { |e| puts e }
```
* Không sử dụng space đối với `(` `[` `]` `)` `!`.
```
some(arg).other
[1, 2, 3].length
!array.include?(element)
```
* Indent `when` tương tự như `case`.
```
case
when song.name == "Misty"
  puts "Not again!"
when song.duration > 120
  puts "Too long!"
when Time.now.hour > 21
  puts "It's too late"
else
  song.play
end

kind = case year
       when 1850..1889 then "Blues"
       when 1890..1909 then "Ragtime"
       when 1910..1929 then "New Orleans Jazz"
       when 1930..1939 then "Swing"
       when 1940..1950 then "Bebop"
       else "Jazz"
       end
```
* Sử dụng dòng trống để ngăn cách các hàm thành các khối logic độc lập.
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

## Classes
* Tránh sử dụng biến toàn cục (@@) đối với các lớp kế thừa.
```
class Parent
  @@class_var = "parent"

  def self.print_class_var
    puts @@class_var
  end
end

class Child < Parent
  @@class_var = "child"
end

Parent.print_class_var # => will print "child"
```
Có thể thấy tất cả các classes trong một class hierarchy chia sẻ chung biến toàn cục (class variable). Nến sử dụng instance variable (@) thay vì class variable (@@).
* Sử dụng `def self.method` để định nghĩa singleton methods. Với kiểu định nghĩa như này khi thay đổi class name chẳng hạn chúng ta sẽ không cần sửa lại method name.
```
class TestClass
  # bad
  def TestClass.some_method
    # body omitted
  end

  # good
  def self.some_other_method
    # body omitted
  end
```
* Tránh sử dụng `class << self` nếu không cần thiết, ví dụ single accessors và aliased attributes
```
class TestClass
  # bad
  class << self
    def first_method
      # body omitted
    end

    def second_method_etc
      # body omitted
    end
  end

  # good
  class << self
    attr_accessor :per_page
    alias_method :nwo, :find_by_name_with_owner
  end

  def self.first_method
    # body omitted
  end

  def self.second_method_etc
    # body omitted
  end
end
```
* Indent `public`, `protected` và `private` methods.
```
class SomeClass
  def public_method
    # ...
  end

  private
  def private_method
    # ...
  end
end
```

## Collections
* Sử dụng `%w` để định nghĩa mảng chứa các string.
```
# bad
STATES = ["draft", "open", "closed"]

# good
STATES = %w(draft open closed)
```
* Sử dụng Set thay vì Array khi làm việc với unique elements.
* Dùng symbol thay thế cho string đối với các hash keys.
```
# bad
hash = { "one" => 1, "two" => 2, "three" => 3 }

# good
hash = { one: 1, two: 2, three: 3 }
```
## Documentation
* Thao khảo [TomDoc](http://tomdoc.org/) đối với document.

## Dynamic Dispatch
* Metaprogramming thực sự mạnh mẽ và hữu ích nhưng trong nhiều trường hợp chúng ta nên viết code một cách rõ ràng.
```
# avoid 
unless [:base, :head].include?(base_or_head)
  raise ArgumentError, "base_or_head must be either :base or :head"
end

repository = pull.send("#{base_or_head}_repository")
branch = pull.send("#{base_or_head}_ref_name")

# prefer
case base_or_head
when :base
  repository = pull.base_repository
  branch = pull.base_ref_name
when :head
  repository = pull.head_repository
  branch = pull.head_ref_name
else
  raise ArgumentError, "base_or_head must be either :base or :head"
end
```
## Exceptions
* Không sử dụng exception đối với các flow of control.
```
# bad
begin
  n / d
rescue ZeroDivisionError
  puts "Cannot divide by 0!"
end

# good
if d.zero?
  puts "Cannot divide by 0!"
else
  n / d
end
```
* Rescue các exception cụ thể, không nên viết kiểu StandardError hay các superclasses.
```
# bad
begin
  # an exception occurs here
rescue
  # exception handling
end

# still bad
begin
  # an exception occurs here
rescue Exception
  # exception handling
end
```
## Hashes
* Sử dụng cú pháp của Ruby 1.9 với hash chứa tất cả các key là symbol.
```
# good
user = {
  login: "defunkt",
  name: "Chris Wanstrath"
}

# bad
user = {
  :login => "defunkt",
  :name => "Chris Wanstrath"
}
```
```
# good
user = User.create(login: "jane")
link_to("Account", controller: "users", action: "show", id: user)

# bad
user = User.create(:login => "jane")
link_to("Account", :controller => "users", :action => "show", :id => user)
```
* Nếu hash chứa các kiểu key khác nhau, sử dụng legacy hashrocket style để tránh bị nhầm lần giữa các key trong cùng 1 hash.
```
# good
hsh = {
  :user_id => 55,
  "followers-count" => 1000
}

# bad
hsh = {
  user_id: 55,
  "followers-count" => 1000
}
```
## Keyword Arguments
* Nên sử dụng keyword arguments khi các đối số là không rõ ràng.

Thay vì viết:
```
def remove_member(user, skip_membership_check=false)
  # ...
end

# Elsewhere: what does true mean here?
remove_member(user, true)
```
Nên viết thế này sẽ rõ ràng hơn:
```
def remove_member(user, skip_membership_check: false)
  # ...
end

# Elsewhere, now with more clarity:
remove_member user, skip_membership_check: true
```
## Naming
* Sử dụng kiểu `snake_case` đối với methods và variables
* Sử dụng kiểu CamelCase đối với classes và modules (Viết hoa cho các từ viết tắt như HTTP, RFC, XML,... )
* Sử dụng kiểu `SCREAMING_SNAKE_CASE` đối với các constants
* Tên các predicate methods nên kết thúc với dấu hỏi (Array#empty?) 
* Tên các potentially "dangerous" methods nên kết thúc với dấu chấm than

## Strings
* Nên dùng string interpolation thay vì string concatenation.
```
# bad
email_with_name = user.name + " <" + user.email + ">"

# good
email_with_name = "#{user.name} <#{user.email}>"
```
* Dùng double-quoted cho strings.
```
# bad
name = 'Bozhidar'

# good
name = "Bozhidar"
```
* Tránh sử dụng String#+ khi cần xây dựng khối data lớn vì nó khởi tạo new objects.
```
# good and also fast
html = ""
html << "<h1>Page title</h1>"

paragraphs.each do |paragraph|
  html << "<p>#{paragraph}</p>"
end
```
## Syntax
* Chỉ dùng ngoặc đơn đối với các method có đối số.
```
def some_method
  # body omitted
end

def some_method_with_arguments(arg1, arg2)
  # body omitted
end
```
* Không dùng `then` cho multi-line if/unless.
```
# bad
if some_condition then
  # body omitted
end

# good
if some_condition
  # body omitted
end
```
* Dùng `if/else` hay `?:`.
```
# bad
result = if some_condition then something else something_else end

# good
result = some_condition ? something : something_else
```
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
```
# bad
if some_condition
  do_something
end

# good
do_something if some_condition
```
* Hạn chết viết `unless with else` thay vì vậy ta có thể đưa positive case lên đầu.
```
# bad
unless success?
  puts "failure"
else
  puts "success"
end

# good
if success?
  puts "success"
else
  puts "failure"
end
```
* Không sử dụng ngoặc đơn với `if/unless/while`.
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
* Nên dùng `{...}` thay vì `do...end` đối với các single-line blocks.
```
names = ["Bozhidar", "Steve", "Sarah"]

# good
names.each { |name| puts name }

# bad
names.each do |name|
  puts name
end

# good
names.select { |name| name.start_with?("S") }.map { |name| name.upcase }

# bad
names.select do |name|
  name.start_with?("S")
end.map { |name| name.upcase }
```
* Tránh dùng return khi không cần thiết

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
* Sử dụng `_` cho các param không cần thiết

```
# bad
result = hash.map { |k, v| v + 1 }

# good
result = hash.map { |_, v| v + 1 }
```
Trên đây mình đã giới thiệu cho các bạn một số ruby style cơ bản. Chúng ta hãy cùng luyện tập để những dòng code của mình thật gọn gàng và sạch sẽ nhé. Chúc mọi người một ngày làm việc vui vẻ. 
Bài viết được tham khảo từ nguồn: [Ruby Style Guide
](https://github.com/github/rubocop-github/blob/master/STYLEGUIDE.md)