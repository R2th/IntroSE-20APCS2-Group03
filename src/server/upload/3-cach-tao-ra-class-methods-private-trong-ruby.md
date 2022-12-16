- Bài viết được dịch từ bài [3 ways to make class methods private in Ruby](https://medium.com/rubycademy/3-ways-to-make-class-methods-private-in-ruby-64b970e54613) của tác giả [Mehdi Farsi](https://medium.com/@farsi_mehdi).
-----

![](https://miro.medium.com/max/700/1*7mmWP1eONK28UenTW7lhrA.jpeg)

> Tổng quan về các cách khác nhau để đặt các phương thức lớp ở chế độ riêng tư trong Ruby
-----
### private_class_method
Phương thức này nhận một hoặc nhiều method_ids làm đối số. Một method_id có thể là một String hoặc một Symbol đại diện cho một phương thức lớp hiện có trong ngữ cảnh của chính nó. `private_class_method` làm cho phương thức tương ứng với method_id được truyền dưới dạng đối số private
```ruby
class A
  def self.hello
    puts "Hello, I'm A."
  end

  private_methods(false).include?(:hello) # => false
  private_class_method :hello
  private_methods(false).include?(:hello) # => true
end
```
Ở đây chúng ta có thể thấy rằng bằng cách chuyển `:hello` làm đối số của `private_class_method`, phương thức lớp `A::hello` trở thành private.

Bây giờ chúng ta hãy xem một cách khác để đặt các phương thức lớp ở chế độ private bằng cách sử dụng private_class_method
```ruby
class A
  private_class_method def self.hello
    puts "Hello, I'm A."
  end

  private_methods(false).include?(:hello) # => true
end
```
Ở đây `private_class_method` lấy định nghĩa class method `hello` làm tham số. Sau đó, chúng ta có thể thấy rằng class methods hello của chúng ta là private. 

Để hiểu điều gì xảy ra ở đây, hãy sửa đổi một chút code của chúng ta:
```ruby
class A
  method_id = def self.hello
    puts "Hello, I'm A."
  end

  method_id # => :hello
  private_class_method method_id
  private_methods(false).include?(:hello) # => true
end
```
Ở đây chúng ta lưu trữ giá trị trả về của định nghĩa class method `hello` trong `method_id`. Sau đó, chúng ta chuyển `method_id` (chứa `:hello`) đến `private_class_method`. Tại thời điểm này, class method `hello` trở thành `private`.

Vì vậy, khi một định nghĩa phương thức trả về *định danh phương thức*, chúng ta có thể chuyển trực tiếp định nghĩa phương thức làm đối số của `private_class_method`.

### class << self và private

Cách cổ điển để đặt các phương thức lớp ở chế độ riêng tư là mở class eigenclass và sử dụng từ khóa `private` trên các phương thức cá thể của class eigenclass - cái mà bạn thường gọi là **class methods**.
> Xem thêm về [eigenclass](https://medium.com/rubycademy/understanding-the-eigenclass-in-less-than-5-minutes-dcb8ca223eb4)
```ruby
class A
  def self.hello
    puts "Hello, I'm A."
  end

  class << self
    private :hello
  end

  private_methods(false).include?(:hello) # => true
end
```
Ở đây, chúng ta chỉ cần mở eigenclass và đặt phương thức lớp `hello` ở chế độ private.