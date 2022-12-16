Hôm nay mình muốn nói về `self`. Nếu bạn đã lập trình Ruby được một thời gian, có thể bạn đã từng thắc mắc về `self`. Bất cứ khi nào bạn đọc hoặc viết một chương trình, bạn sẽ bắt gặp hoặc sẽ dùng đến `self`. 

Nhưng nếu bạn là người mới làm quen với Ruby, hoặc có ít kinh nghiệm về Ruby, đôi khi `self` có thể gây khó khăn cho bạn. Nó luôn luôn thay đổi, nhưng nó không bao giờ được hiển thị rõ ràng trong code. `self` có mặt trong rất nhiều ngôn ngữ và thân thuộc với các developer, nhưng không phải ai cũng hiểu rõ về nó.

Có rất nhiều vấn đề mà một người mới bắt đầu phải đối mặt là do không hiểu về `self`. Nếu bạn đã từng "mất" một biến đối tượng (instance variable) hoặc bối rối về dữ liệu nào được hiển thị cho một mixin, thì đó là vì bạn không hiểu `self` trong bối cảnh đó.

Trong bài đăng này, chúng ta sẽ xem xét `self` trong nhiều tình huống thường gặp.
# self là gì?
Bạn có thể đã nghe người ta nói rằng mọi thứ trong Ruby là một đối tượng. Nếu đó là sự thật thì có nghĩa là mọi đoạn mã bạn viết đều "thuộc về" đối tượng nào đó.

`self` là một biến đặc biệt trỏ đến đối tượng "sở hữu" mã hiện đang thực thi. Ruby sử dụng `self` ở mọi nơi:

* Đối với instance variables: `@myvar`
* Đối với method và constant lookup
* Khi khai báo methods, classes and modules.

Về lý thuyết,`self` khá rõ ràng. Nhưng trong thực tế, ta rất dễ gặp khó khăn và không khỏi cảm thấy bối rối. Đó là lý do tại sao mình viết bài này.
# Ví dụ về self
Bây giờ chúng ta sẽ bước qua một số ví dụ. Nếu những cái đầu tiên có vẻ quá cơ bản đối với bạn, hãy tiếp tục đọc. Chúng sẽ được nâng cao hơn ở phần sau.
## self trỏ đến một đối tượng
Trong đoạn code dưới đây, `reflect` là một instance method. Nó thuộc về đối tượng chúng ta tạo thông qua `Ghost.new`. Vì vậy `self` trỏ vào đối tượng đó.
```
class Ghost
  def reflect
    self
  end
end

g = Ghost.new
g.reflect == g # => true
```

## self trỏ đến một lớp
Trong ví dụ này, `reflect` là một class method của `Ghost`. Với các class method, chính lớp đó "sở hữu" phương thức. `self` trỏ đến lớp đó.
```
class Ghost
  def self.reflect
    self
  end
end

Ghost.reflect == Ghost # => true
```
Nó hoạt động tương tự với các class method bên trong các module. Ví dụ:
```
module Ghost
  def self.reflect
    self
  end
end 
Ghost.reflect == Ghost # => true
```
Hãy nhớ rằng, các class and module được coi là các đối tượng trong Ruby. Vì vậy, hành vi này không khác với hành vi của instance method mà chúng ta đã thấy trong ví dụ đầu tiên.

Một tính năng của Ruby làm cho nó phù hợp với các framework như Rails là bạn có thể thực thi mã tùy ý bên trong các khai báo class and module. Khi bạn đặt mã bên trong class / module, nó sẽ chạy giống như bất kỳ mã Ruby nào khác. Sự khác biệt thực sự duy nhất là giá trị của `self`.

Như bạn có thể thấy bên dưới, `self` trỏ đến lớp hoặc module đang trong quá trình khai báo.
```
class Ghost
  self == Ghost # => true
end 

module Mummy
  self == Mummy # => true
end 
```
## Các ví dụ khác
Các phương thức hỗn hợp (mixed-in) hoạt động giống như các instance method hoặc class method bình thường khi nói đến `self`. Điều này thật ý nghĩa. Nếu không, mixin sẽ không thể tương tác với lớp bạn đã trộn nó vào.
### Instance methods
Mặc dù phương thức `reflect` đã được định nghĩa trong module, nhưng `self` là thể hiện của lớp mà nó được trộn vào.
```
module Reflection
  def reflect
    self
  end
end 

class Ghost
  include Reflection
end

g = Ghost.new
g.reflect == g # => true
```
### Class methods
Khi chúng ta `extend` một lớp để trộn trong các phương thức lớp, `self` hoạt động giống như nó làm trong các phương thức lớp bình thường.
```
module Reflection
  def reflect
    self
  end
end 

class Ghost
  extend Reflection
end

Ghost.reflect == Ghost # => true
```
### Nhiều hơn nữa
Có thể bạn đã thấy cách phổ biến này để định nghĩa nhiều phương thức lớp cùng một lúc.
```
class Ghost
  class << self 
    def method1
    end

    def method2
    end
  end
end
```
Cú pháp `class << foo` thực sự khá thú vị. Nó cho phép bạn truy cập metaclass của một đối tượng - còn được gọi là "singleton class" hoặc "eigenclass". Ta có thể hiểu "metaclass" là nơi Ruby lưu trữ các phương thức duy nhất cho một đối tượng cụ thể.
Nếu bạn truy cập vào `self` từ bên trong khối `class << foo`, bạn sẽ nhận được metaclass.
```
class << "test"
  puts self.inspect
end

# => #<Class:#<String:0x007f8de283bd88>
```
Nếu bạn đang chạy mã bên ngoài bất kỳ lớp nào, Ruby vẫn cung cấp `self`. Nó trỏ đến "main", là một thể hiện của Object:
```
puts self.inspect # => main
```
# Tổng kết
Mình hi vọng qua bài viết này các bạn sẽ hiểu thêm được thêm về ngôn ngữ ruby để có 1 cái nhìn đúng đắn hơn về ruby cũng như áp dụng được nó trong công việc, cảm ơn vì đã dành thời gian đọc bài viết của mình.