##  Naming
#### Tên định danh tiếng anh
```
# bad - identifier using non-ascii characters
заплата = 1_000

# bad - identifier is a Bulgarian word, written with Latin letters (instead of Cyrillic)
zaplata = 1_000

# good
salary = 1_000
```

#### Sử dụng snake_case cho symbols, methods và variables.
```
# bad
:'some symbol'
:SomeSymbol
:someSymbol

someVar = 5

def someMethod
  ...
end

def SomeMethod
 ...
end

# good
:some_symbol

def some_method
  ...
end
```
#### Sử dụng CamelCase cho class và module
```
# bad
class Some_Class
  ...
end

class SomeXml
  ...
end

# good
class SomeClass
  ...
end

class SomeXML
  ...
end
```
#### Sử dụng SCREAMING_SNAKE_CASE cho hằng số
```
# bad
SomeConst = 5

# good
SOME_CONST = 5
```
#### sử dụng reverse_each thay cho reverse.each. reverse_each nó không tạo ra một mảng mới
```
# bad
array.reverse.each { ... }

# good
array.reverse_each { ... }
```

## Comment
- Viết comment bằng tiếng anh
- Sử dụng 1 khoảng trắng sau ký tự # và nội dung comment
- Tránh bình luận thừa
- Giữ cho các comment hiện có được cập nhập, mỗi khi thay đổi code nội dung
- Tránh viết bình luận để giải thích mã xấu. Hãy cấu trúc lại code để người đọc có thể tự hiểu
- Comment phải được viết ngay phía trên đoạn mã liên quan
- Nếu có nhiều dòng để mô tả. Thì từ dòng thứ 2 phải dc thụt lề 2 khoảng trắng sau dấu #
- Sử dụng `TODO` để ghi chú những tính năng, chức năng còn thiếu cần được bổ sung sau đó
- Sử dụng `FIXME` để ghi chú mã hỏng cần phải sữa chữa
- Sử dụng `OPTIMIZE` để ghi chú mã chậm, không hiệu quả, có thể gây ra sự cố về hiệu suất
- Sử dụng `HACK` để ghi lại nơi có phương pháp mã hóa có vấn đề, cần được cấu trúc lại
- Sử dụng `REVIEW` để ghi chú bất cứ điều gì cần xem xét để xác nhận nó hoạt động như dự định

## Class và module
#### Sử dụng cấu trúc nhất quán trong định nghĩa class
```
class Person
  # extend and include go first
  extend SomeModule
  include AnotherModule

  # constants are next
  SOME_CONSTANT = 20

  # afterwards we have attribute macros
  attr_reader :name

  # followed by other macros (if any)
  validates :name

  # public class methods are next in line
  def self.some_method
  end

  # followed by public instance methods
  def some_method
  end

  # protected and private methods are grouped near the end
  protected

  def some_protected_method
  end

  private

  def some_private_method
  end
end
```
#### Ưu tiên sử dụng module cho những class chỉ có class method
```
# bad
class SomeClass
  def self.some_method
    # body omitted
  end

  def self.some_other_method
  end
end

# good
module SomeClass
  module_function

  def some_method
    # body omitted
  end

  def some_other_method
  end
end
```
#### Sử dụng các function thuộc attr để khai báo khởi tạo
```
# bad
class Person
  def initialize(first_name, last_name)
    @first_name = first_name
    @last_name = last_name
  end

  def first_name
    @first_name
  end

  def last_name
    @last_name
  end
end

# good
class Person
  attr_reader :first_name, :last_name

  def initialize(first_name, last_name)
    @first_name = first_name
    @last_name = last_name
  end
end
```
#### Tránh sử dụng attr. Hãy sử dụng  attr_reader và attr_accessor.
```
# bad - creates a single attribute accessor (deprecated in 1.9)
attr :something, true
attr :one, :two, :three # behaves as attr_reader

# good
attr_accessor :something
attr_reader :one, :two, :three
```
#### Hãy xem xét sử dụng Struct.new, để định nghĩa các toán tử truy cập
```
# good
class Person
  attr_accessor :first_name, :last_name

  def initialize(first_name, last_name)
    @first_name = first_name
    @last_name = last_name
  end
end

# better
Person = Struct.new(:first_name, :last_name) do
end
```
#### Sử dụng self.method khi khai báo singleton methods
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

  # Also possible and convenient when you
  # have to define many singleton methods.
  class << self
    def first_method
      # body omitted
    end

    def second_method_etc
      # body omitted
    end
  end
end
```

## Kết 
Trên đây là những hướng dẫn để các bạn có thể viết code tốt hơn, dễ đọc, dễ bảo trì hơn.<br>
Ở phần tiếp theo mình sẽ giới thiệu đến các bạn cách viết code tốt hơn trong **Exceptions**, **Collections** và **Strings**