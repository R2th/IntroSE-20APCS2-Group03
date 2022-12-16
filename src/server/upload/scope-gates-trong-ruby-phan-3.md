- Bài viết được dịch từ bài [Scope gates in Ruby](https://medium.com/rubycademy/scope-gates-in-ruby-flat-scopes-bbf100f8e459) của tác giả [Mehdi Farsi](https://medium.com/@farsi_mehdi).
-----

![](https://miro.medium.com/max/700/0*pYzdDbhQcEKlDJns)

-----
Trong bài viết này, chúng ta sẽ khám phá các chủ đề sau:

* scope & block
* flat scope guard trong class/module

> Trước tiên, hãy thoải mái khi đọc bài [Scope gates trong Ruby: Phần 2](https://viblo.asia/p/scope-gates-trong-ruby-phan-2-924lJqGNZPM) trước khi tiếp tục.

**Trước khi bắt đầu**
Tác giả rất vui khi được chia sẻ với bạn series mới: [Những điều thú vị về Ruby - Tập 1](https://www.rubycademy.com/products/ffar). Xin vui lòng chia sẻ liên kết này!

### Scope & blocks
Trong Ruby, một block có thể truy cập bên ngoài scope
```ruby

def message
  puts yield
end

outer_scope_variable = 'Hello world!'

message do
  outer_scope_variable # => 'Hello world'
end
```
Trong ví dụ này, chúng ta có thể truy cập vào biến `outer_scope_variable` trong block. block có quyền truy cập vào biến này mặc dù biến được khai báo ở phạm vi main level. Trong trường hợp này, chúng ta nói rằng block **flatten** scopes. Đây là lý do tại sao chúng ta thường gọi cơ chế này: **Flat Scope**.

*Mặt khác, block tạo ra một phạm vi scope bị cô lập - ngay cả khi giá trị của self trong block vẫn là đối tượng chính.*

Vì vậy, chúng ta không thể truy cập các biến cục bộ được xác định trong block.

```ruby
def message
  puts yield
end

message do
  block_variable = 42
end

p block_variable # => `<main>': undefined local variable or method `block_variable' for main:Object
```

Tại đây, chúng ta không thể truy cập `block_variable` từ phạm vi bên ngoài. Bây giờ chúng ta đã quen thuộc hơn với khái niệm `flat scope` trong Ruby, hãy xem liệu khái niệm này có ảnh hưởng đến định nghĩa class hay không.


### Class, module và block
Trong Ruby, cái mà bạn thường gọi là `class`, đằng sau nó là một instance của lớp `Class`.
```ruby
class Hello
  def message
    puts 'hello'
  end
end

Greeting = Class.new do
  def say
    puts 'hello'
  end
end
```
Ở đây, chúng tôi tạo các lớp `Hello` và `Greeting` theo hai cách khác nhau:
- sử dụng từ khóa `class`
- bằng cách gán một instance của lớp `Class` cho hằng số `Greeting`

Lưu ý rằng chúng ta đang chuyển một block tới phương thức `Class.new`. block này sẽ được hiểu là nội dung của lớp. Thông thường, một lớp không thể truy cập các biến được xác định trong scope bên ngoài - vì từ khóa `class` thay đổi giá trị của `self` và tạo ra một phạm vi bị cô lập.

Vì vậy, khi chúng ta sử dụng một block để tạo lớp `Greeting` thì chúng ta sẽ có thể sử dụng cơ chế flat scope. Có thật không?
```ruby
outer_variable = 'hello world!'

class Hello
  p self # => Hello

  def message
    puts outer_variable
  end
end

Hello.new.message # => NameError: undefined local variable `outer_variable'

Greeting = Class.new do
  p self # => #<Class:0x9988ff45553>
  
  puts outer_variable # => 'hello world!'

  def message
    puts outer_variable
  end
end

Greeting.new.message # => NameError: undefined local variable `outer_variable'
```
Ở đây chúng ta có thể thấy rằng giá trị của self thay đổi khi sử dụng `class` hoặc `Class.new`.

Ngoài ra, block thông báo `Class#message` của chúng ta vẫn bị cô lập với đối tượng chính vì sử dụng từ khóa `def`. Thật vậy, khi block của chúng ta được thực thi trong ngữ cảnh của phương thức thì block sẽ `làm phẳng phạm vi` (flatten scope) trong đối tượng nhất định - và không phải với phạm vi cao hơn như đối tượng chính.

Đó là lý do tại sao chúng ta không có quyền truy cập vào `external_variable` trong `message`.

Nhưng nếu chúng ta sử dụng `define_method` để xác định `mesage` thì phạm vi sẽ được làm phẳng:
```ruby
outer_variable = 'hello world!'

class Hello
  p self # => Hello

  def message
    puts outer_variable
  end
end

Hello.new.message # => NameError: undefined local variable `outer_variable'

Greeting = Class.new do
  p self # => #<Class:0x9988ff45553>
  
  puts outer_variable # => "hello world!"

  define_method(:message) do
    puts outer_variable
  end
end

Greeting.new.message # => "hello world!"
```
Ở đây, vì `define_method(:message)` nhận một block làm đối số, phạm vi của khối này được làm phẳng và phương thức này có quyền truy cập vào external_variable.

---
Cảm ơn bạn đã dành thời gian đọc bài viết này 🙏