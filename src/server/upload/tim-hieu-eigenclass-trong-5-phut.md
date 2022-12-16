## Mở đầu
Khi truy vấn data thông qua Activerecord trong rails sẽ nhận được những object không phải instance trực tiếp của Model. Vậy đó là gì? Trong bài viết này, chúng ta sẽ khám phá các chủ đề sau:
- Eigenclass là gì?
- Bản chất của eigenclass
## Giới thiệu
Trong Ruby, một lớp là một đối tượng.

Trong thực tế, một lớp theo nghĩa đen là một thể hiện của lớp tên là **Class**.
> Vui lòng xem cách các Class hoạt động trong [bài viết của **rubyfleebie**](https://medium.com/rubycademy/understanding-the-eigenclass-in-less-than-5-minutes-dcb8ca223eb4) nếu bạn không quen thuộc với lớp Class.
> 
**Vậy thì, làm thế nào một lớp tạo ra sự khác biệt giữa các phương thức, biến và hằng của lớp so với đối tượng?**

Bằng cách sử dụng **eigenclass** (meta-class, shadow-class, singleton-class, v.v.).
## Eigenclass là gì?
Trong Ruby, các phương thức có thể được gọi bằng ba cách:
- method được gọi bởi một class: *MyClass.my_method*
- method được gọi bởi một object: *myobject.mymethod*
- gọi method ngầm: *puts('puts is an implicit call to self.puts')*

Theo mặc định, khi một phương thức được định nghĩa trong một lớp thì phương thức này trở thành một *instance method*.

*instance method* này có thể truy cập được bởi tất cả các thể hiện(đối tượng) của lớp này
```ruby
class Greeting
  def hello
    'hello guys'
  end
end

Greeting.instance_methods.include?(:hello) # => true

hey  = Greeting.new
hola = Greeting.new

hey.hello  # => "hello guys"
hola.hello # => "hello guys"
```
Ở đây, chúng ta có thể thấy rằng phương thức *Greeting#hello* được coi là một *instance method*.

Phương thức này được chia sẻ giữa tất cả các instances của *Greeting*.

Bây giờ, hãy thử thêm một phương thức lớp vào lớp *Greeting* của chúng ta
```ruby
class Greeting
  def Greeting.hello
    'Hello guys'
  end
end

Greeting.instance_methods.include?(:hello)  # => false
Greeting.singleton_methods.include?(:hello) # => true

Greeting.hello # => "Hello guys"
```
Ở đây, phương thức *Greeting.hello* được xác định ở class-level.

Đó là lý do tại sao chúng ta có thể gọi ra phương thức này bằng cách sử dụng lớp *Greeting* làm vai trò của *caller*.

Ngoài ra, chúng ta có thể thấy rằng phương thức được định nghĩa như là một *singleton method*.

Để đơn giản - và liên quan đến bài viết này - hãy giả sử rằng các *phương thức singleton* là các *phương thức lớp*.

**Nhưng nếu tôi nói với bạn rằng một phương thức singleton cũng là một phương thức instance thì sao?**

Ái chà, điều này có ý nghĩa vì (hầu như) mọi thứ trong Ruby là một đối tượng (theo tôi thì ngoại trừ block ra cái gì viết trong ruby code cũng là object).

Cái mà bạn thường gọi là một phương thức lớp là: đằng sau ngữ cảnh đó - một *instance method* của **eigenclass**
> Tiện thể, ***eigenclass*** còn được gọi là ***singleton class*** nhá.
> 
Hãy truy cập vào **eigenclass** và *inspect* "nội tạng" bên trong ra ra xem nào:
```ruby
class Greeting
  def self.hello
    'hello world!'
  end

  def self.eigenclass
    class << self
      self
    end
  end
end

Greeting.eigenclass      # => #<Class:Greeting>
Greeting.eigenclass.name # => nil

Greeting.singleton_methods                  # => [:hello, :eigenclass]
Greeting.eigenclass.instance_methods(false) # => [:hello, :eigenclass]
```
Đầu tiên, chúng ta định nghĩa một phương thức *Greeting.eigenclass*.

Phương thức này trả về *self* trong ngữ cảnh của **eigenclass** - bằng cách sử dụng cú pháp *class << self ... end*

*Greeting.eigenclass* trả về một instance của lớp *Class* (anonymous class).

*Lớp ẩn danh* này ánh xạ với lớp mà nó được đính kèm - trong trường hợp này là *Greeting class*.

Sau đó, chúng ta có thể thấy rằng các **phương thức singleton** của lớp *Greeting* là các phương thức  instance của *Greeting* ***eigenclass***.
> Lưu ý rằng việc xác định phương thức singleton của chúng ta bằng *self.hello* hoặc *Greeting.hello* tạo ra kết quả tương tự.
> 
Điều đó thật tuyệt. Bây giờ chúng ta đã hiểu những mục đích của **eigenclass**.

Chúng ta cũng biết rằng nó là một lớp ẩn danh.

Vì vậy, bây giờ hãy cần có một cái nhìn sâu hơn về các thuộc tính của lớp ẩn danh này.
## Đằng sau eigenclass
Hãy tìm hiểu chi tiết hơn nữa về cách thức eigenclass được xây dựng phía sau ngữ cảnh
```ruby
class Greeting
  def self.eigenclass
    class << self
      Module.nesting # => [#<Class:Greeting>, Greeting]
      self
    end
  end
end

greeting_eigenclass = Greeting.eigenclass

greeting_eigenclass            # => #<Class:Greeting>
greeting_eigenclass.superclass # => #<Class:Object>
greeting_eigenclass.ancestors  # => [#<Class:Greeting>, #<Class:Object>, #<Class:BasicObject>, Class, Module, Object, Kernel, BasicObject]
```
**1. Như đã thấy trong phần trước, eigenclass là một instance chưa được đặt tên của lớp *Class*.**

Lớp ẩn danh này được định nghĩa trong *Greeting*.

Để chắc chắn, chúng ta có thể kiểm tra giá trị trả về của phương thức *Module.nesting*.

Phương thức này trả về danh sách các modules & classes nested tại điểm gọi.
**2. Chúng ta có thể thấy rằng eigenclass kế thừa từ Object eigenclass - *# <Class: Object>*.**

Thật vậy, vì một lớp kế thừa từ *Object* theo mặc định, nên có vẻ tự nhiên rằng ***eigenclass*** đã cho thừa hưởng từ ***eigenclass*** của *Object* theo mặc định.
> Vui lòng xem bài viết [Mô hình đối tượng Ruby](https://medium.com/rubycademy/ruby-object-model-part-1-4d06fa486bec) nếu bạn không quen thuộc với ancestor chain và Object class trong Ruby.
> 
## Kết luận
Các **eigenclass** có xu hướng là một khái niệm khá khó để nắm bắt.

Nhưng, trên thực tế, nó đã được thiết kế rất tốt trong bối cảnh của Ruby.

Thật vậy, khi bạn biết một chút về Ruby - đặc biệt là về [Mô hình đối tượng Ruby](https://medium.com/rubycademy/ruby-object-model-part-1-4d06fa486bec) - sự hiểu biết về khái niệm này trở nên tự nhiên.

Cuối cùng, hãy để Lôi cố gắng đưa ra một định nghĩa đúng về eigenclass trong Ruby:
> ***Eigenclass là một instance chưa được đặt tên của lớp Class được gắn vào một đối tượng và instance methods mà được sử dụng dưới dạng singleton methods của đối tượng được xác định.***
## Tham khảo
https://medium.com/rubycademy/understanding-the-eigenclass-in-less-than-5-minutes-dcb8ca223eb4