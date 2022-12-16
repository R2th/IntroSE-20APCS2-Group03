Ruby là một ngôn ngữ lập trình chỉ cho phép đơn kế thừa. Điều này có nghĩa là một class chỉ có thể kế thừa từ một class cha.

Tuy nhiên, nó có tác dụng kế thừa các function từ nhiều nơi mà không cần phải viết lại. Ruby cung cấp chức năng này dưới dạng Mixin. Trong bài viết này, mình sẽ hướng dẫn cách sử dụng Mixins, tại sao bạn nên sử dụng chúng và khi nào bạn nên sử dụng chúng so với việc dùng kế thừa.

# Mixin là gì? 
Mixin về cơ bản chỉ là một Module được đưa vào class. Khi bạn include một Module vào một class, class đó sẽ có quyền truy cập vào các method của Module.

Các phương thức của Module được include vào một class có thể là Class Method hoặc Instance Method tùy thuộc vào cách bạn thêm Mixin vào class đó.

# Sử dụng các phương thức của Module như Instance Method

Để thêm các phương thức Module làm instance method trên class, bạn nên đưa Mixin làm một phần của class đó.

Ví dụ, hãy tưởng tượng bạn có Module này cực kỳ hữu ích:

``` ruby
module Greetings  
  def hello  
    puts "Hello!"  
  end

  def bonjour  
    puts "Bonjour!"  
  end

  def hola  
    puts "Hola!"  
  end  
end  
```

Để thêm các method này làm instance method trên một class, bạn chỉ cần làm điều này:
``` ruby
class User  
  include Greetings  
end  
```

Bây giờ bạn sẽ có quyền truy cập vào các method trên bất kỳ instance nào của Class đó:
``` ruby
philip = User.new  
philip.hola  
=> Hola!  
```

Nhưng nếu bạn cố gọi các method là Class method, bạn sẽ gặp lỗi:
``` ruby
User.hola  
=> undefined method ‘hola’ for User:Class (NoMethodError)  
```

# Sử dụng các phương thức của Module như Class Method
Để thêm các method của Module làm Class method, thay vì sử dụng `include` bạn sẽ sử dụng `extend`
```ruby
class User  
  extend Greetings  
end  
```

Bây giờ bạn có thể gọi các phương thức trên Class:
```ruby
User.hola!  
=> Hola! 
```
Nhưng không phải trên một instance method của Class:
```ruby
philip = User.new  
philip.hola  
=> undefined method ‘hola’ for #<User:0x007fbd5b9ae438> (NoMethodError)  
```

# Sử dụng cả Instance method và Class method trong 1 module
Khi bạn tạo một instance method của Class, phương thức `initialize` sẽ tự động được gọi.

Khi bạn `include` Module vào Class, phương thức `include`  sẽ được gọi trên Module.

Điều này giúp dễ dàng thêm cả instance method  và class method bằng cách sử dụng pattern mà bạn sẽ thấy rất nhiều trong code Ruby dưới đây.

Ví dụ: hãy tưởng tượng chúng ta có module `Utilities` sau:
```ruby
module Utilities  
  def method_one  
    puts "Hello from an instance method"  
  end

  module ClassMethods  
    def method_two  
      puts "Hello from a class method"  
    end  
  end  
end  
```

Trong ví dụ này, mình đã tách các Class Method thành module lồng nhau. 

Tiếp theo, chúng ta có thể thực hiện` self.included` nó sẽ được gọi tự động bất cứ khi nào module này được included trong class nào đó

```ruby
 def self.included(base)  
   base.extend(ClassMethods)  
  end  
end  
```
Phương thức này sẽ nhận được instance của Class đang được khởi tạo. Bên `included` method đi kèm, chúng ta sử dụng `extend` method để thêm module `ClassMethods`

Bây giờ khi include module này vào Class, chúng ta có quyền truy cập vào cả instance method và class method:

```ruby
class User  
  include Utilities  
end

User.new.method_one  
=> Hello from an instance method

User.method_two  
=> Hello from a class method  
```
# Tại sao bạn nên sử dụng Mixin?

Mixins là hoàn hảo khi bạn muốn chia sẻ method giữa các class khác nhau. Thay vì lặp đi lặp lại cùng một code, bạn có thể đơn giản nhóm chức năng chung vào một module và sau đó đưa nó vào từng class yêu cầu.

Mixin có thể xem như interface trong các ngôn ngữ C#, Java… chỉ có điều các method của nó đã được định nghĩa.

Khi nào bạn sử dụng Mixin so với Thừa kế thông thường?

Kế thừa là một đối tượng kế thừa từ một đối tượng khác. Điều này có nghĩa là nó có được các thuộc tính và phương thức tương tự của đối tượng cha. Ví dụ, một đối tượng Pikachu là một loại Pokemon và do đó, nó có ý nghĩa để kế thừa từ lớp Pokemon và có các đầy đủ các method của class Pokemon

Khi một lớp nên có khả năng gì đó, bạn nên sử dụng Mixin. Ví dụ, các lớp DVD, MP3 và Bluray đều có phương thức `play`, nhưng chỉ vì tất cả chúng đều có khả năng thực hiện cùng một hành động, không có nghĩa là tất cả chúng nên được kế thừa từ cùng một đối tượng.

# Kết luận
Các module là một phần quan trọng của ngôn ngữ lập trình Ruby và chúng là thứ mà bạn sẽ thấy được sử dụng rộng rãi.

Khái niệm và triển khai module thực sự rất dễ dàng một khi bạn hiểu mục đích của module và những lợi ích mà module mang lại.