## Method trong ruby: instance_variable_set & instance_variable_get
Ruby là ngôn ngữ linh hoạt. Nghĩa là chúng ta có thể tạo được class hay method ngay trong lúc thực thi. Hơn nữa trong ruby chúng ta cũng có thể truy cập đến các method private và protected ở mọi nơi mà mình muốn. Tuy nhiên chúng ta vẫn nên cẩn thận khi sử dụng chúng. Đây không phải là tất cả những thứ mà Ruby có thể làm về mặt linh hoạt. Ruby có thể linh hoạt như thế nào sẽ phụ thuộc vào việc bạn sử dụng nó ra sao.

Có câu hỏi đặt ra là, ngoài các phương thức và class được tạo tự động thì Ruby còn có thể làm gì ?

Trong ruby chúng ta có thể truy cập biến instance sử dụng instance từ bất kỳ nơi nào. Bạn có thể nghĩ đến việc tạo accessor để làm việc này :smiley: . Tuy nhiên, bạn không nhất thiết phải sử dụng accessor để truy cập đến biến instance.

Trong Ruby đã có sẵn method để giúp chúng ta thay thế việc sử dụng accessor: instance_variable_get giúp bạn có thể gọi được biến instance, bên cạnh đó có method instance_variable_set cho phép bạn set biến instance thành bất kỳ một giá trị nào.

Giờ chúng ta đi vào hiểu cài đặt cụ thể của từng method.
### instance_variable_set
`instance_variable_set(p1, p2)`

Tên của biến instance (p1) được đặt bằng symbol, nếu sử dụng string để đặt tên biến string sẽ được chuyển thành symbol.
```ruby
class Persion
  def initialize name
    @name = name
  end
end
sleepy = Persion.new("SleepyAsh")  #=>  #<Persion:0x0000563d05c0b3e8 @name="SleepyAsh">
nar = sleepy.instance_variable_set(:@nar, "Naruto")  #=> Naruto
sleepy.inspect   #=> "#<Persion:0x0000563d05c0b3e8 @name=\"SleepyAsh\", @nar=\"Naruto\">"
```
sử dụng instance_variable_set chúng ta đã thiết lập thêm được một biến cho sleepy, để gọi được chúng ta sẽ sử dụng đến method `instance_variable_get`.
### instance_variable_get
`instance_variable_get(p1)`

Trả ra giá trị của biến thực thể được đưa vào (p1). Phần @ của tên biến nên được bao gồm trong các biến instance thường xuyên. Bắt ngoại lệ với `NameError` nếu tên biến không hợp lệ. Nếu đối số truyền vào (p1) là String nó sẽ được convert sang Symbol
```ruby
class Persion
  def initialize name
    @name = name
  end
end
sleepy = Persion.new("SleepyAsh")      #=>  #<Persion:0x0000563d05c0b3e8 @name="SleepyAsh">
name = sleepy.instance_variable_get(:@name)  #=> SleepyAsh
nar = sleepy.instance_variable_get(:@nar)    #=> Naruto
```
như vậy là sử dụng instance_variable_get chúng ta đã gọi được biến instance @nar được set ngay cả khi nó chưa được khởi tạo trong class :smiley: .

### Example
VD:
```ruby
class A; end

a = A.new
a.instance_variable_get(:@var) #=> nil
a.instance_variable_set(:@var, 'Hi')
a.instance_variable_get(:@var) #=> Hi
```
Biến instance @var đã được khởi tạo thông qua method instance_variable_set.
Để lấy được giá trị của biến @var ta sử dụng method instance_variable_get.

Bài tìm hiểu của mình còn nhiều sai sót rất mong các bạn sẽ góp ý :sweat_smile:

Tài liệu tham khảo

[https://blog.kiprosh.com/dynamic-ruby/](https://blog.kiprosh.com/dynamic-ruby/)

[https://apidock.com/ruby/Object/instance_variable_set](https://apidock.com/ruby/Object/instance_variable_set)

[https://apidock.com/ruby/Object/instance_variable_get](https://apidock.com/ruby/Object/instance_variable_get)