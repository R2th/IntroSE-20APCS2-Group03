Ở trong 1 bài viết trước mình đã giới thiệu với các bạn cách mà [Ruby tìm kiếm và thực thi method](https://viblo.asia/p/dieu-gi-xay-ra-khi-ban-goi-mot-method-trong-ruby-3P0lPa4p5ox) 

Hẳn các bạn đã biết trong Ruby, khi bạn gọi 1 method, Ruby sẽ thực hiện việc tìm kiếm method đó trong ancestors chain của object mà bạn gọi method rồi thực thi method đó

```ruby
str1 = "a"
str2 = "b"

String.ancestors
# => [String, Comparable, Object, Kernel, BasicObject]
```

Cũng có thể bạn đã biết, method sẽ được lưu trữ trong class hoặc module. Ở ví dụ trên, cả `str1` và `str2` đều là object của String nên chúng sẽ có cùng ancestors chain của class String, điều đó có nghĩa là `str1` gọi được method nào thì `str2` cũng tương tự như vậy.

Tuy nhiên, trên đường đời tấp nập, ta vô tình bắt gặp đoạn code sau:

```ruby
def str1.title?
  self.upcase == self
end

str1.title? # => false
str2.title? # => NoMethodError
```

`.title?` này là gì? Sao `str1` gọi được mà `str2` thì lại không gọi được? Nó sẽ được lưu ở đâu? 

Trong Ruby, những hàm như `.title?` được gọi là **singleton methods**

### Singleton methods, singleton class

**Singleton methods** là những methods được định nghĩa riêng cho object. 

Như ví dụ trên, chúng ta có thể thấy `.title?` nó được định nghĩa cho `str1`, còn `str2` cũng là 1 object của String như `str1` nhưng lại không gọi được `.title?`. 

Các methods như `upcase`, `downcase` nó được lưu trong class String thì tất cả object của class String đều gọi được. Vậy thì `title?` này nó sẽ lưu ở đâu để chỉ phục vụ cho `str1`, tất cả các object khác đều không gọi được. Câu trả lời đó là singleton class

Thông thường, các methods sẽ được lưu trong class. Vậy thì singleton methods sẽ được lưu trong **singleton class** - đây là 1 hidden class, và mỗi object đều sẽ có 1 singleton class.

```ruby
str1.singleton_class # => #<Class:#<String:0x0000000002a89628>>
str2.singleton_class # => #<Class:#<String:0x0000000002a51fe8>>
```

Ta có thể thấy `str1` và `str2` sẽ có 2 singleton class khác nhau, lúc này `.title?` sẽ được lưu trong `#<Class:#<String:0x0000000002a89628>>`, và rõ ràng Ruby sẽ không thể tìm thấy `.title?` cho `str2`.

Vậy thì giờ đây, ancestors chain của `str1` nó sẽ như thế nào? Rõ ràng nó sẽ phải có thêm singleton class chứ không đơn giản chỉ là `[String, Comparable, Object, Kernel, BasicObject]` như ban đầu đã đề cập nữa. Hãy cùng lần theo super class của str1 đề tìm ancestors chain của nó

```ruby
str1.singleton_class # => #<Class:#<String:0x0000000002a89628>>
str1.singleton_class.superclass # => String
```

Tới đây ta có thể thấy superclass của 1 singleton class của 1 object chính là class của object đó. Vì vậy ta có ancestors chain của `str1` và `str2` nó sẽ khác nhau ở singleton class

```ruby
str1.singleton_class.ancestors # => [#<Class:#<String:0x0000000002a89628>>, String, Comparable, Object, Kernel, BasicObject]
str2.singleton_class.ancestors # => [#<Class:#<String:0x0000000002a51fe8>>, String, Comparable, Object, Kernel, BasicObject]
```

Bây giờ ta đã có thể giải thích được cách tổ chức các singleton methods của Ruby trong ancestors chain

### Class methods

Trở lại thuở thơ ấu khi chúng ta bắt đầu với Ruby, chúng ta sẽ được tiêm nhiễm câu khẩu dụ "Tất cả mọi thứ trong Ruby đều là object", tất nhiên chúng ta vẫn biết vẫn có một số thứ không phải là object, tuy nhiên chúng ta sẽ không bàn tới điều này.

Chúng ta biết bản thân mỗi class trong Ruby đều là object của class `Class`, và mỗi object sẽ có 1 singleton class, điều này đồng nghĩa với mỗi class cũng sẽ có 1 singleton class tương ứng

```ruby
String.singleton_class # => #<Class:String>
Object.singleton_class # => #<Class:Object>
```

Một lần nữa trở lại với thở mới học Ruby, ta biết răng Ruby có 2 loại methods là instance methods và class methods. instances methods thì nó quá dễ hiểu rồi, nó được lưu trong class, trong module và được gọi bằng object của class đó. Vậy thì class methods nó lưu ở đâu?

Hãy xem qua cách chúng ta định nghĩa một class method

```ruby
def MyClass.a_class_method
end

class MyClass
  def self.a_class_method
  end
end

class MyClass
  class << self
    def a_class_method
    end
  end
end
```

`MyClass` bản chất nó cũng chỉ là 1 object, vậy thì bạn có thấy nó giống với cách chúng ta định nghĩa singleton method chứ? Và để không còn nhập nhằng nữa thì sự thật các class methods mà chúng ta hay dùng thực chất chính là các singleton methods của chính class đó. Và rõ ràng nó sẽ được lưu trong sington class của class đó.

Tuy class là 1 object nhưng nó cũng không phải là object bình thường, class nó có tính kế thừa có superclass của nó, và sington class tương ứng của nó cũng vậy. Không như object bình thường *superclass của 1 singleton class của 1 object chính là class của object đó*, thì với class **superclass của 1 singleton class của 1 class chính là singleton class của class cha của class đó**. Đọc thì thấy hoa mắt chóng mặt nhưng nhìn vào sơ đồ sau đây bạn sẽ thấy dễ hiểu hơn

![](https://images.viblo.asia/b0df03bc-85b8-417a-b7c4-20a835ea248e.png)

Khi bạn gọi 1 method, Ruby sẽ thực hiện tìm kiếm method trên ancestors chain của object mà bạn gọi, ancestors chain sẽ luôn bắt đầu với singleton class của object đó, sau đó lần theo từng superclass cho đến BasicObject

Hãy thử gọi một class method của class D trên sơ đồ trên, Ruby sẽ bắt đầu tìm kiếm class đó trong singleton class của D là `#<Class:D>`, nếu không có thì tiếp tục tìm kiếm đến superclass của `#<Class:D>` là `#<Class:C>`, tiến tục leo đến `#<Class:BasicObject>`, superclass của `#<Class:BasicObject>` chính là `Class` và superclass cuối cùng không ai khác chính là `BasicObject`.

```ruby
D.singleton_class.ancestors
# => [#<Class:D>, #<Class:C>, #<Class:Object>, #<Class:BasicObject>, Class, Module, Object, Kernel, BasicObject]
```

Qua bài viết, hi vọng các bạn có thể hiểu được về sington methods, sington class và class methods trong Ruby cũng như cách mà Ruby tổ chức lưu trữ và tìm kiếm các methods này cũng như các methods thông thường khác.