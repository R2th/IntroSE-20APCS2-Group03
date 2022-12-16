## The class Class
![](https://images.viblo.asia/ecb3c9d1-362d-4d2d-8c26-46d730cab38f.png)

Lớp *Class* kế thừa trực tiếp từ *Module* và bao gồm tất cả hành vi của instance. Nói ngắn gọn thì, *Module* thường là nơi chứa các method của một hoặc nhiều *Class*,  và *Class* thường được dùng để quản lí các properties của object.

## Classes and ancestors
Để xem lớp cha mà Class kế thừa, ta có thể dùng `superclass` method:
```ruby
>> Class.superclass
=> Module

>> Module.superclass
=> Object
```
Hoặc xem tất cả các lớp kế thừa theo danh sách tuần tự, ta dùng `ancestors`:
```ruby
>> Class.ancestors
=> [Class, Module, Object, Kernel, BasicObject]
```
## Classes are constants
Trong ruby, khi một Class mới được định nghĩa, thực chất chúng ta đang tạo một instance của lớp *Class*:
```ruby
class Foo
end

>> Foo.class
=> Class
```
Ở vd trên chúng ta vừa định nghĩa một class là `Foo`, đồng nghĩa với việc nó chính là instance của lớp *Class* và chúng ta có thể dùng instance này qua constant `Foo`.

Theo logic này thì chúng ta có thể dùng cách khai báo khác, đó là tạo `Foo` như tạo một object bình thường:
```ruby
Foo = Class.new

>> Foo.class
=> Class
```
## How does Ruby looks for a method ?
```ruby
class MyExample   
 def say_hello
   puts 'hello world'
 end
end

>> MyExample.ancestors
=> [MyExample, Object, Kernel, BasicObject]

>> MyExample.new.say_hello
=> hello world

>> MyExample.new.say_good_bye
=> NoMethodError
```
Khi gọi instance method `say_hello` từ instance của class `MyExample`, ruby sẽ tìm trong class `MyExample` method trùng tên, nếu có thì trả về kết quả phù hợp.

Tương tự khi gọi instance method `say_good_bye`, ruby trước tiên sẽ tìm method với tên tương ứng trong class `MyExample`, trường hợp này không tìm thấy nó sẽ tiếp tục tìm ngược lên các ancestors class khác đến tận class `BasicObject`, nếu vẫn không tìm thấy, kết quả trả về sẽ là `NomethodError`.
## Include and Extend your Classes
Để dùng chung các method ở *Module* cho Class, ta có thể dùng `include`, `extend`, `prepend` methods. Bài viết này chúng ta sẽ chỉ tập trung vào 2 method đầu tiên, vì chúng phổ biến hơn method còn lại.
### Include
Khi một Class include một Module, tất cả instance methods của Module đó sẽ trở thành instance methods của Class:
```ruby
module RandomModule
  def say_thank_you
    puts 'thank you'  
  end
end

class RandomClass   
 include RandomModule
end

>> RandomClass.ancestors
=> [RandomClass, RandomModule, Object, Kernel, BasicObject]

>> RandomClass.new.say_thank_you
=> thank you
```
Như vd ở trên ta có thể thấy ancestors class của `RandomClass` đã bao gồm `RandomModule`.  Khi gọi method `say_thank_you` ở instance của `RandomClass`, ruby sẽ vào `RandomClass` để check method tương ứng, không có thì sẽ tiếp tục tìm lần lượt các class mà `RandomClass` kế thừa, đầu tiên là `RandomModule`. Ở đây method tương ứng đã được tìm thấy và trả về kết quả mong muốn.
### Extend
Dù chung mục đích là dùng chung method giữa Class và Module, nhưng `extend` lại khác hoàn toàn `include`. Nếu như `include` dùng để thêm các instance method, thì `extend` có nhiệm vụ thêm các class method:
```ruby
module RandomModule
  def say_thank_you
    puts 'thank you'  
  end
end

class RandomClass   
 extend RandomModule
end

>> RandomClass.new.say_thank_you
=> NoMethodError

>> RandomClass.say_thank_you
=> thank you

>> RandomClass.ancestors
=> [RandomClass, Object, Kernel, BasicObject]
```
Sau khi extend `RandomModule` vào `RandomClass`, chúng ta có thể dùng method `say_thank_you` như là một class method. Khi gọi method `say_thank_you` từ instance của `RandomClass`, ta nhận được kết quả `NoMethodError`. Nhưng khi gọi trực tiếp từ class `RandomClass`, kết quả trả về hoàn toàn phù hợp.

Chúng ta cũng có thể dùng `extend` cho duy nhất một class instance cụ thể:
```ruby
module RandomModule
  def say_thank_you
    puts 'thank you'  
  end
end

class RandomClass
end

>> RandomClass.new.say_thank_you
=> NoMethodError

>> new_instance = RandomClass.new
>> new_instance.extend RandomModule
>> new_instance.say_thank_you
=> thank you
```
## Classes are open
Chúng ta hoàn toàn có thể thêm hoặc sửa các method của các ancestor class, của riêng chúng ta hay thậm chí là class có sẵn của Ruby:
```ruby
class String
  def tell_my_size
    self.size
  end

  def reverse
    self.size
  end
end

>> my_string = 'hello world'
>> my_string.tell_my_size
=> 11

>> my_string.reverse
=> 11
```
Ở vd này chúng ta đã tạo mới một instance method `tell_my_size` và override lại method có sẵn `reverse` của Class `String` của Ruby. Mặc dù cách làm này khá hữu dụng trong 1 số trường hợp, nhưng chúng ta không nên lạm dụng và thật thận trọng trước khi thêm mới hoặc override lại các method có sẵn của Ruby.

## Summary
Bài viết nhằm chia sẻ một vài kiến thức basic khá thú vị của Class trong Ruby, bài viết còn nhiều thiếu sót, cảm ơn bạn đã dành thời gian theo dõi.

Nguồn: https://dev.to/olivdums/what-i-didn-t-know-about-ruby-classes-48bd