Tư tưởng chính của Ruby là *khiến lập trình viên cảm thấy hạnh phúc*. Và để hiện thực hoá tư tưởng đó, Ruby đã cung cấp rất nhiều thứ cho chúng ta. Metaprogramming cho phép lập trình viên sinh code động trong lúc thực thi chương trình, threading cho phép lập trình viên viết ra những chương trình chạy đa luồng, và hook methods cho phép lập trình viên mở rộng hành vi của chương trình trong lúc thực thi.

Các tính năng nói trên, cùng với một số khía cạnh khác của Ruby, làm cho nó trở thành một trong những lựa chọn được ưu tiên để code. Trong bài viết này, chúng ta sẽ cùng khám phá một số hook methods quan trọng trong Ruby. Chúng ta sẽ thảo luận các khía cạnh khác nhau về hook methods, chẳng hạn như chúng là gì, chúng được sử dụng như thế nào và cách chúng ta có thể sử dụng chúng để giải quyết các vấn đề khác nhau. Chúng ta cũng sẽ xem cách mà các framework / thư viện Ruby phổ biến sử dụng chúng để cung cấp các tính năng khá là thú vị.

Bắt đầu nào!

# Hook methods là gì?
Hook methods cung cấp một cách để mở rộng hành vi của các chương trình trong thời gian chạy. Hãy tưởng tượng bạn có thể nhận được thông báo bất cứ khi nào một lớp con kế thừa một số lớp cụ thể nào đó, hoặc xử lý các phương thức không gọi được trên các đối tượng một cách tự nhiên mà không khiến trình biên dịch đưa ra các ngoại lệ. Đây là một số trường hợp sử dụng cho các hook methods, nhưng việc sử dụng chúng không chỉ giới hạn ở đó. Các framework / thư viện khác nhau đã sử dụng các hook methods khác nhau để đạt được chức năng mong muốn của chúng.

Trong bài này, chúng ta sẽ cùng thảo luận về các hook methods sau nhé:
* included
* extended
* prepended
* inherited
* method_missing

# Included
Ruby cung cấp cho chúng ta một cách để viết code theo mô-đun sử dụng các `module` (hay còn gọi là `mixins` ở các ngôn ngữ khác) mà có thể được sử dụng sau trong các module hay class khác. Ý tưởng nằm phía sau `module` khá là đơn giản, nó là 1 đoạn code mà có thể sử dụng lại được ở những chỗ khác.

Ví dụ, nếu chúng ta muốn viết code để trả về cùng một chuỗi bất kì khi nào một phương thức, tạm gọi là phương thức `name`, được gọi đến, và bạn cũng muốn sử dụng lại đoạn code y hệt thế này ở những chỗ khác nữa. Và đây là cơ hội cho `module` toả sáng...

![](https://images.viblo.asia/3806726f-d8d4-49ed-ad2e-280c006bb720.gif)

Trước tiên, mình sẽ tạo ra module `Person`:
```ruby
module Person
  def name
    "Person name"
  end
end
```

Đây là một module khá đơn giản với duy nhất 1 phương thức `name` có nhiệm vụ luôn trả về 1 chuỗi. Và ta sẽ thử sử dụng đến module đó:
```ruby
class User
  include Person
end
```

Ruby cung cấp vài cách khác nhau để sử dụng đến module, một trong số đó là `include`. Khi bạn sử dụng `include` trong một class, những phương thức được định nghĩa trong module được gọi sẽ trở thành instance method của class đó. Như trong ví dụ trên thì phương thức `name` được định nghĩa trong module `Person` sẽ trở thành instance method của class `User`. Ta có thể sử dụng phương thức đó như là một phương thức bình thường được định nghĩa trong class `User`:
```ruby
puts User.new.name
# => Person name
```

Bây giờ, hãy xem hook method khi sử dụng `include`, đó chính là `included`. Nó là một hook method được cung cấp bởi Ruby, sẽ tự động được gọi ra bất cứ khi nào bạn include một module trong 1 module hoặc class khác. Sửa lại module `Person` bên trên một chút như sau:
```ruby
module Person
  def self.included base
    puts "#{base} included #{self}"
  end
  ...
end
```

Bạn có thể thấy, phương thức `included` được định nghĩa như là 1 class method của module `Person`. Phương thức này sẽ được gọi ra bất cứ khi nào bạn sử dụng `include Person` trong một module hay class khác. Nó nhận một tham số chính là module hoặc class đang `include` module Person.

Và khi chạy lại đoạn code ví dụ bên trên, kết quả sẽ như sau:
```
User included Person
Person name
```

Bạn có thể thấy, `base` trả về chính lớp đang include module của chúng ta. Như vậy, chúng ta có thể sử dụng metaprogramming để đạt được chức năng mong muốn của mình. Hãy xem Devise tận dụng `included` hook như thế nào nhé

## included trong Devise
Devise là một trong những thư viện xác thực được sử dụng rộng rãi nhất. Nó cung cấp cho chúng ta các tính năng từ đăng ký đến đăng nhập, từ quên mật khẩu đến khôi phục mật khẩu,... Devise cho phép chúng ta cài đặt nhiều modules mà nó cung cấp bằng cách sử dụng cú pháp vô cùng đơn giản trong model:
```ruby
devise :database_authenticatable, :registerable, :validatable
```

Phương thức `devise` mà chúng ta sử dụng trong models được định nghĩa như sau:
```ruby
def devise(*modules)
  options = modules.extract_options!.dup

  selected_modules = modules.map(&:to_sym).uniq.sort_by do |s|
    Devise::ALL.index(s) || -1  # follow Devise::ALL order
  end

  devise_modules_hook! do
    include Devise::Models::Authenticatable

    selected_modules.each do |m|
      mod = Devise::Models.const_get(m.to_s.classify)

      if mod.const_defined?("ClassMethods")
        class_mod = mod.const_get("ClassMethods")
        extend class_mod

        if class_mod.respond_to?(:available_configs)
          available_configs = class_mod.available_configs
          available_configs.each do |config|
            next unless options.key?(config)
            send(:"#{config}=", options.delete(config))
          end
        end
      end

      include mod
    end

    self.devise_modules |= selected_modules
    options.each { |key, value| send(:"#{key}=", value) }
  end
end
```

Tạm hiểu thì phương thức này sẽ include từng module tương ứng với danh sách mà ta truyền vào từ model. Bạn có thể thấy dòng code `include mod` trong vòng lặp ở phía trên. Ví dụ với module `Validatable`, có phương thức `included` được định nghĩa như sau:
```ruby
def self.included(base)
  base.extend ClassMethods
  assert_validations_api!(base)

  base.class_eval do
    validates_presence_of   :email, if: :email_required?
    if Devise.activerecord51?
      validates_uniqueness_of :email, allow_blank: true, if: :will_save_change_to_email?
      validates_format_of     :email, with: email_regexp, allow_blank: true, if: :will_save_change_to_email?
    else
      validates_uniqueness_of :email, allow_blank: true, if: :email_changed?
      validates_format_of     :email, with: email_regexp, allow_blank: true, if: :email_changed?
    end

    validates_presence_of     :password, if: :password_required?
    validates_confirmation_of :password, if: :password_required?
    validates_length_of       :password, within: password_length, allow_blank: true
  end
end
```

Ta có thể thấy, Devise sử dụng `class_eval` cho `base` (trong trường hợp này chính là model của chúng ta) để bổ sung thêm tính năng cho nó. Bạn có thể hiểu rằng, khi viết code trong `class_eval` gọi từ 1 class cũng giống như bạn mở class đó ra và viết thêm code vào vậy. Devise sử dụng `class_eval` để bổ sung thêm validations cho module. Bạn sẽ thấy những validations này khi đăng ký, đăng nhập sử dụng Devise, mà rõ ràng bạn không cần phải tự viết ra những validations đó.

# extended
Ruby cũng cho phép lập trình viên `extend` một module, hơi khác một chút so với `include`, đó là thay vì áp dụng các phương thức được định nghĩa trong module cho các instances của 1 class, khi sử dụng `extend` trong class sẽ áp dụng những phương thức đó cho chính class luôn (tạo ra các class methods). Ví dụ:
```ruby
module Person
  def name
    "Person name"
  end
end

class User
  extend Person
end

puts User.name # => Person name
```

Tuy nhiên, `extend` cũng có thể được dùng để gán các phương thức được định nghĩa trong module như là các singleton methods cho các objects nữa. Ví dụ với cùng class User và module Person ở trên:
```ruby
u1 = User.new
u2 = User.new

u1.extend Person

puts u1.name # => Person name
puts u2.name #=> báo lỗi "undefined method `name'"
```
như vậy, phương thức `name` là singleton method của object `u1`, còn các instances khác của User, ví dụ như object `u2`, thì lại không không có phương thức đó.
Cũng giống như `included`, có một phương thức là `extended` là hook method khi sử dụng `extend`. Phương thức này sẽ tự động được gọi ra khi mà module được extend bởi 1 class hoặc 1 module khác. Ví dụ:
```ruby
module Person
  def self.extended(base)
    puts "#{base} extended #{self}"
  end

  def name
    "My name is Person"
  end
end

class User
  extend Person
end
```

Khi chạy đoạn code trên, kết quả là dòng chữ `User extended Person` sẽ được in ra.
Vậy `extended` được áp dụng như thế nào? Hãy khám phá với `ActiveRecord` nhé.

## extended trong ActiveRecord
Chúng ta có thể thấy ActiveRecord extend module ActiveRecord::Models như sau:
```ruby
extend ActiveModel::Callbacks
```

Và đoạn callback của chúng ta ở đây, trong module ActiveModel::Callbacks
```ruby
def self.extended(base)
  base.class_eval do
    include ActiveSupport::Callbacks
  end
end
```

Như vậy, khi extend module này, nó lại mở class ra và include thêm module `ActiveSupport::Callbacks` vào cho class.

# prepended
Có một cách khác để sử dụng các phương thức được định nghĩa trong các module,  cách đó là sử dụng `prepend`. `prepend` được giới thiệu từ Ruby 2.0 và nó hoàn toàn khác với `include` và `extend`. Các phương thức được sử dụng bởi `include` và `extend` có thể được ghi đè bằng các phương thức được định nghĩa trong module/class đích. Ví dụ, nếu chúng ta đã định nghĩa một phương thức trong một số module và cũng định nghĩa một phương thức cùng tên như thế trong module/class đích, thì phương thức được định nghĩa trong module / lớp của chúng ta sẽ ghi đè cái từ module được `include` hay `extend`. `prepend` thì khá là khác vì nó ghi đè các phương thức được định nghĩa trong module/class đích với các phương thức được định nghĩa trong module được `prepend`. Hãy xem ví dụ sau nhé:
```ruby
module Person
  def name
    "My name belongs to Person"
  end
end

class User
  def name
    "My name belongs to User"
  end
end

puts User.new.name 
# => My name belongs to User
```

Bây giờ thử sử dụng `prepend` nhé:
```ruby
module Person
  def name
    "My name belongs to Person"
  end
end

class User
  prepend Person
  def name
    "My name belongs to User"
  end
end

puts User.new.name 
# => My name belongs to Person
```

Khi thêm `prepend Person`, phương thức được định nghĩa trong `Person` sẽ ghi đè các phương thức cùng tên được định nghĩa trong class `User`. Và bạn hoàn toàn có thể gọi hàm được định nghĩa trong class `User` từ module `Person` bằng cách sử dụng `super`.

Khi sử dụng `prepend`, sẽ có 1 hook method đi kèm với nó đó là `prepended`, được gọi ra mỗi khi module được `prepend` vào 1 module/class khác. Thử sửa lại module Person ở ví dụ trên như sau nhé:
```ruby
module Person
  def self.prepended(base)
    puts "#{self} prepended to #{base}"
  end
  ...
end
```

Và khi bạn chạy thử lại đoạn code trên, kết quả sẽ thay đổi 1 chút:
```
Person prepended to User
My name belongs to Person
```

# inherited
Thừa kế là một trong những khái niệm quan trọng nhất của lập trình hướng đối tượng. Ruby là một ngôn ngữ hướng đối tượng và cung cấp khả năng kế thừa một lớp con từ một số lớp cơ sở. Hãy cùng xem ví dụ sau:
```ruby
class Person
  def name
     "My name is Person"
  end
end

class User < Person
end

puts User.new.name # => My name is Person
```

Chúng ta đã tạo ra một lớp Person và một lớp con User. Các phương thức được định nghĩa trong Person trở thành một phần của User. Đó chính là tính kế thừa. Nhưng bạn có biết có cách nào để thông báo khi một lớp được kế thừa từ một lớp khác hay không? Đây chính là lúc dùng đến hook method `inherited`:
```ruby
class Person
  def self.inherited(child_class)
    puts "#{child_class} inherits #{self}"
  end

  def name
    "My name is Person"
  end
end

class User < Person
end

puts User.new.name
```

phương thức `inherited` sẽ được gọi mỗi khi có 1 lớp kế thừa từ lớp Person. Khi chạy đoạn code trên sẽ cho ra kết quả:
```
User inherits Person
My name is Person
```

# method_missing
`method_missing` có lẽ là hook Ruby được sử dụng rộng rãi nhất. Nó có thể được tìm thấy trong nhiều framework / thư viện Ruby phổ biến. Nó được gọi khi code của chúng ta cố gắng gọi một phương thức không tồn tại trên một đối tượng. Hãy xem ví dụ sau nhé:
```ruby
class Person
  def name
    "My name is Person"
  end
end

p = Person.new

puts p.name     # => My name is Person  
puts p.address  # => undefined method `address' for #<Person:0x007fb730a2b450> (NoMethodError)
```

Chúng ta đã khai báo một lớp `Person` đơn giản chỉ với một phương thức `name`. Sau đó, tạo một cá thể của `Person` và gọi hai phương thức `name` và `address`. Vì `name` đã được định nghĩa trên `Person` nên sẽ chạy trơn tru. Tuy nhiên `address` không được định nghĩa nên sẽ đưa ra một ngoại lệ. Hook method `method_missing` có thể giúp chúng ta tránh hiển thị các loại ngoại lệ này, nó sẽ xử lý các phương thức chưa được định nghĩa một cách gọn gàng. Hãy viết lại lớp Person một chút như sau:
```ruby
class Person
  def method_missing(sym, *args)
     "#{sym} not defined on #{self}"
  end

  def name
    "My name is Person"
  end
end

p = Person.new

puts p.name     # => My name is Person
puts p.address  # => address not defined on #<Person:0x007fb2bb022fe0>
```

`method_missing` nhận hai tham số: tên của phương thức được gọi và các đối số được truyền vào cho phương thức đó. Đầu tiên, Ruby sẽ tìm phương thức mà chúng ta đang cố gắng gọi, nếu phương thức không được tìm thấy, nó sẽ tìm đến phương thức `method_missing`. Do chúng ta đã ghi đè phương thức `method_missing` trên class `Person`, vì vậy Ruby sẽ gọi nó và sẽ không đưa ra bất kỳ ngoại lệ nào như mặc định.

*Tham khảo: https://www.sitepoint.com/rubys-important-hook-methods/*