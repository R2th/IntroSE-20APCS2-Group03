## Exceptions
### - Không sử dụng các `Exception` cho dòng điều khiển
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
### - Không sử dụng ngoại lệ `Exception`
```
# bad
begin
  # an exception occurs here
rescue Exception
  # exception handling
end

# good
begin
  # an exception occurs here
rescue StandardError
  # exception handling
end

# acceptable
begin
  # an exception occurs here
rescue
  # exception handling
end
```
### - Cung cấp một lớp ngoại lệ và một tin nhắn như hai đối số riêng cho `raise`
```
# bad
raise SomeException.new('message')
# Note that there is no way to do `raise SomeException.new('message'), backtrace`.

# good
raise SomeException, 'message'
# Consistent with `raise SomeException, 'message', backtrace`.
```
### - Sử dụng `implicit begin blocks` nếu có thể
```
# bad
def foo
  begin
    # main logic goes here
  rescue
    # failure handling goes here
  end
end

# good
def foo
  # main logic goes here
rescue
  # failure handling goes here
end
```
### - Đặt các `exceptions` cụ thể lên cao hơn để có thể bắt được lỗi
```
# bad
begin
  # some code
rescue Exception => e
  # some handling
rescue StandardError => e
  # some handling
end

# good
begin
  # some code
rescue StandardError => e
  # some handling
rescue Exception => e
  # some handling
end
```
### - Giải phóng tài nguyên mà bạn sử dụng trong block `ensure`
```
f = File.open('testfile')
begin
  # .. process
rescue
  # .. handle error
ensure
  f.close unless f.nil?
end
```
## Collections
### - Sử dụng khai báo rút gọn cho `array` và `hash`
```
# bad
arr = Array.new
hash = Hash.new

# good
arr = []
hash = {}
```
### - Sử dụng `%w` khi khai báo `array` cho `string`
```
# bad
STATES = ['draft', 'open', 'closed']

# good
STATES = %w(draft open closed)
```
### - Sử dụng `%i` khi khai báo `array` cho `symbol`
```
# bad
STATES = [:draft, :open, :closed]

# good
STATES = %i(draft open closed)
```
### - Tránh dấu chấm phẩy sau mục cuối cùng của `Array` và `Hash`
```
# bad - easier to move/add/remove items, but still not preferred
VALUES = [
           1001,
           2020,
           3333,
         ]

# bad
VALUES = [1001, 2020, 3333, ]

# good
VALUES = [1001, 2020, 3333]
```
### - Tránh tạo ra các khoảng trống lớn trong mảng
```
arr = []
arr[100] = 1 # Bây giờ bạn có 1 mảng với rất nhiều giá trị nil
```
### - Khi lấy giá trị đầu tiên hoặc cuối cùng của mảng, ưu tiên sử dụng `first` và `last` hơn `[0]` hoặc `[-1]`
### - Ưu tiên sử dụng `symbol` thay vì string làm hash key
```
# bad
hash = { 'one' => 1, 'two' => 2, 'three' => 3 }

# good
hash = { one: 1, two: 2, three: 3 }
```
### - Sử  dụng `Hash.key?` thay cho `Hash.has_key?` và `Hash.value?` thay cho `Hash.has_value?`
```
# bad
hash.has_key?(:test)
hash.has_value?(value)

# good
hash.key?(:test)
hash.value?(value)
```
### - Sử dụng `Hash.fetch` để lấy các giá trị có sẵn
```
heroes = { batman: 'Bruce Wayne', superman: 'Clark Kent' }
# bad - if we make a mistake we might not spot it right away
heroes[:batman] # => "Bruce Wayne"
heroes[:supermann] # => nil

# good - fetch raises a KeyError making the problem obvious
heroes.fetch(:supermann)
```
### - Ưu tiển sử dụng block thay vì các giá trị mặc định trong `Hash.fetch`
```
batman = { name: 'Bruce Wayne' }

# bad - if we use the default value, we eager evaluate it
# so it can slow the program down if done multiple times
batman.fetch(:powers, get_batman_powers) # get_batman_powers is an expensive call

# good - blocks are lazy evaluated, so only triggered in case of KeyError exception
batman.fetch(:powers) { get_batman_powers }
```
### - Không bao giờ thay đổi collection khi duyệt qua nó
## Strings
### - Thêm vào chuỗi thay vì nối chuỗi
```
# bad
email_with_name = user.name + ' <' + user.email + '>'

# good
email_with_name = "#{user.name} <#{user.email}>"
```
### - Thêm chuỗi vào với khoảng trắng, nó sẽ rõ ràng hơn
```
"#{ user.last_name }, #{ user.first_name }"
```
### - Sử dụng `single-quoted` với các chuỗi đơn
```
# bad
name = "Bozhidar"

# good
name = 'Bozhidar'
```
### - Không sử dụng cú pháp chữ ký tự `?x`
```
# bad
char = ?c

# good
char = 'c'
```
### - Đừng quên `{}` xung quanh `instance`, `global variable` được thêm vào chuỗi
```
class Person
  attr_reader :first_name, :last_name

  def initialize(first_name, last_name)
    @first_name = first_name
    @last_name = last_name
  end

  # bad - valid, but awkward
  def to_s
    "#@first_name #@last_name"
  end

  # good
  def to_s
    "#{@first_name} #{@last_name}"
  end
end

$global = 0
# bad
puts "$global = #$global"

# good
puts "$global = #{$global}"
```
### - Tránh sử dụng `String#+` khi cần tạo dữ liệu lơn, thay vào đó hãy dùng `String#<<`
```
# good and also fast
html = ''
html << '<h1>Page title</h1>'

paragraphs.each do |paragraph|
  html << "<p>#{paragraph}</p>"
end
```
### - Khi sử dụng `heredocs` cho nhiều dòng, hãy giữ nguyên khoảng trắng ở đầu
```
code = <<-END.gsub(/^\s+\|/, '')
  |def test
  |  some_method
  |  other_method
  |end
END
#=> "def test\n  some_method\n  other_method\nend\n"
```
## Kết
Phần này tới đây là kết thúc, ở phần sau mình sẽ giới thiệu với các bạn về `Regular Expressions`,  `Percent Literals`,  `Metaprogramming` .

Cảm ơn mọi người đã đọc bài viết

**Lưu ý :** <br>
Những style ruby này là tham khảo để có thể viết code clear hơn, và dễ hiễu hơn thôi, không nhất thiết phải áp dụng theo như thế này. Vì mỗi cty sẽ áp dụng ruby conversion khác nhau, phù hợp với cty đó.