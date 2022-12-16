# Singleton methods, Singleton class
## Lớp ẩn danh
Cùng xem ví dụ sau:
```ruby

foo = String.new
foo.class      # String
foo.length     # 0
foo.bar        # NoMethodError
```

Ở đây ta tạo một đối tượng foo thuộc lớp String, và gọi phương thức length của lớp String ra. Với foo.bar thì trình thông dịch của ruby không tìm thấy phương thức này lên báo lỗi NoMethodError.

Ta xem tiếp ví dụ sau:
```ruby
foo = String.new
def foo.bar
  puts "xin chao!"
end
foo.bar    # "xin chao!"
```
Ở đây ruby đã tìm thấy phương thức bar và trả về giá trị. Nhưng câu hỏi đặt ra là phương thức bar này là của lớp nào? Là của lớp String hay một lớp tên là foo?

Đầu tiên để xem một method có thuộc một lớp không ta có thể thử cách sau:
```ruby
String.instance_methods.include? :length  => true
```

Thử với phương thức bar:

```ruby
String.instance_methods.include? :bar => false
foo.instance_methods.include? :bar  => undefined method `instance_methods'
```


Đối với phương án một lớp tên foo thậm chí còn bị lỗi NoMethodError với chính hàm instance_methods, vì vậy foo không phải là tên lớp, nó vẫn là một biến String.
Vậy phương thức bar của chúng ta ở đâu ra, câu trả lời theo mình chính là ở một lớp ẩn danh hay Ruby còn gọi là Singleton Class.

## Singleton Class & Singleton Method
Singleton Class, eigen class, anonymous class. là một trong những cách mà ta có thể gọi nó. 
Thử với ví dụ trước xem nào:

```ruby
foo.singleton_class.instance_methods.include? :bar   => true
```

Vậy là ta đã biết phương thức bar của chúng ta nằm ở đâu, nó nằm ở Singleton Class của đối tượng foo. Và bar được gọi là một Singleton Method.

Singleton class không có tên, không thể khởi tạo đối tượng mới từ nó. Nó chỉ xuất hiện khi bạn tạo các singleton method, và ruby sẽ tạo các singleton class như một cách để chứa các singleton method, và kế thừa lớp của đối tượng mà bạn tạo singleton method.
## Một số cách để tạo singleton method
### Với module
```ruby
module Cin
  def cin
    "Tam biet!"
  end
end

foo = String.new
foo.extend Cin
foo.cin    => "Tam biet!"
```
### Mở singleton class
```ruby
foo = String.new
class << foo
  def cin
    "Tam biet!"
  end
end
foo.cin   => "Tam biet!"
```
### Đặt tên trực tiếp
Đây chính là cách ta làm ở phần 1
```ruby
foo = String.new
def foo.cin
   "Tam biet!"
end
foo.cin	=> "Tam biet!"
```
## Sử dụng singleton method như thế nào?
Mình cũng chưa nghĩ ra được nhiều cách ứng dụng, nhưng dễ thấy nhất là các class method mà chúng ta hay sử dụng.
### Class Method
```ruby
Class sinhvien
  def sinhvien.all
    all
  end
  # hoặc
  Class << self
    def all
      all
    end
  end
end
```
### Test với private method
```ruby
class Sinhvien
  attr_accessor :name
  def initialize name
    @name = name
  end

  def downcase?
    name_downcase?
  end

  private

  def name_downcase?
    @name == @name.downcase
  end
end
sv1 = Sinhvien.new "hung"
sv2 = Sinhvien.new "Hung"

def Sinhvien.test_name_downcase? name
  name == name.downcase
end
p Sinhvien.test_name_downcase? sv1.name => true
p Sinhvien.test_name_downcase? sv2.name => false
p sv1.downcase? => true
p sv2.downcase? => false
```