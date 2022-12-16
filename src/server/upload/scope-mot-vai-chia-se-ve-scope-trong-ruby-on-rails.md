## Scope là gì? Nó dùng để làm gì? Định nghĩa nó như thế nào?
Đầu tiên **scope** bản chất là **class method**, scope dùng để tạo ra các class method khác dùng để truy xuất dữ liệu.
<br>
Vậy, định nghĩa một scope như thế nào?

<br>
Một ví dụ:
<br>

```ruby
class Product < ActiveRecord::Base
  scope :latest_product, ->{order(created_at: :desc).limit 3}
end
```

Cách gọi một scope như 1 class method:
```ruby
Product.latest_product
# SELECT  `products`.* FROM `products` ORDER BY `products`.`created_at` DESC LIMIT 3
```

Như các bạn thấy trong ví dụ trên một scope gồm 3 phần:<br>
    1. scope keyword<br>
    2. tên method<br>
    3. 1 block<br>
<br>
Để hiểu chi tiết hơn các bạn có thể xem ở [**đây**](https://github.com/rails/rails/blob/fc5dd0b85189811062c85520fd70de8389b55aeb/activerecord/lib/active_record/scoping/named.rb#L163)
<br>
## Scope và class method
Từ ví dụ trên, ta có thể thấy scope là class method. Vậy thì scope khác gì class method thông thường?
### 1. scope gọi liên tiếp được(chainable)
Ví dụ:
```ruby
class User < ActiveRecord::Base
  scope :scope_id, ->(id){where(id: id)}
  scope :scope_email, ->{where(email: "abc@gmail.com")}
  
  class << self
    def class_method_id(id)
      where(id: id)
    end
    
    def class_method_email
      where(email: "abc@gmail.com")
    end
  end
end
```
Ta cùng thử nghiệm tính chainable của scope và class method:

```ruby
# scope
User.scope_id(1).scope_email
# SELECT  1 AS one FROM `users` WHERE `users`.`id` = 1 AND `users`.`email` = 'abc@gmail.com' LIMIT 1

User.scope_id(1).class_method_email
# SELECT  1 AS one FROM `users` WHERE `users`.`id` = 1 AND `users`.`email` = 'abc@gmail.com' LIMIT 1
----------------------------------------------------------------------------------------------------
# class method
User.class_method_id(1).class_method_email
# SELECT  1 AS one FROM `users` WHERE `users`.`id` = 1 AND `users`.`email` = 'abc@gmail.com' LIMIT 1

User.class_method_id(1).scope_email
# SELECT  1 AS one FROM `users` WHERE `users`.`id` = 1 AND `users`.`email` = 'abc@gmail.com' LIMIT 1
```
Hmm, ta có thể thấy cả scope và class method đều ra kết quả giống nhau. Vậy ta thử vs input đặc biệt như **nil/blank** xem sao:
```ruby
# scope
User.scope_id("").scope_email
# SELECT  1 AS one FROM `users` WHERE `users`.`id` IS NULL AND `users`.`email` = 'abc@gmail.com' LIMIT 1

User.scope_id(nil).scope_email
# SELECT  1 AS one FROM `users` WHERE `users`.`id` IS NULL AND `users`.`email` = 'abc@gmail.com' LIMIT 1
--------------------------------------------------------------------------------------------------------
#class method
User.class_method_id("").class_method_email
# SELECT  1 AS one FROM `users` WHERE `users`.`id` IS NULL AND `users`.`email` = 'abc@gmail.com' LIMIT 1

User.class_method_id(nil).class_method_email
# SELECT  1 AS one FROM `users` WHERE `users`.`id` IS NULL AND `users`.`email` = 'abc@gmail.com' LIMIT 1
```
Mọi thứ vẫn chạy tốt .... Thử thay đổi một chút xem sao:
```ruby
classs User < ActiveRecord::Base
  scope :scope_id, ->(id){where(id: id).first}
  
  def self.class_method_id(id)
    where(id: id).first
  end
end
```
Và cho input là **nil/blank**:
```ruby
# scope
User.scope_id(nil)
# SELECT  `users`.* FROM `users` WHERE `users`.`id` IS NULL ORDER BY `users`.`id` ASC LIMIT 1
# SELECT `users`.* FROM `users`
=> all User
---------------------------------------------------------------------------------------------
# class method
User.class_method_id(nil)
# SELECT  `users`.* FROM `users` WHERE `users`.`id` IS NULL ORDER BY `users`.`id` ASC LIMIT 1
=> nil
```
Ta đã thấy sự khác biệt, vậy sự khác biệt này từ đâu mà có?
<br>
Thử đọc lại [**doc**](https://github.com/rails/rails/blob/fc5dd0b85189811062c85520fd70de8389b55aeb/activerecord/lib/active_record/scoping/named.rb#L163) xem sao. Có thể thấy trong [**doc**](https://github.com/rails/rails/blob/fc5dd0b85189811062c85520fd70de8389b55aeb/activerecord/lib/active_record/scoping/named.rb#L163) trong hàm định nghĩa **scope** có rất nhiều **if .. else** condition. Vậy nếu ta bắt **exception** trong **class method** thì có thể làm cho nó có tính năng chainable được không:
```ruby
class User < ActiveRecord::Base
  def self.class_method_id(id)
    return if where(id: id).first
    all
  end
end
```
Và kết quả:
```ruby
User.class_method_id(nil)
# SELECT  `users`.* FROM `users` WHERE `users`.`id` IS NULL ORDER BY `users`.`id` ASC LIMIT 1
# SELECT `users`.* FROM `users`
```
### 2. Scope mở rộng được(extensible)
Ví dụ:
```ruby
class User < ActiveRecord::Base 
  scope :scope_id, ->{where(id: 1)} do
    def print_text
      "say oh yeah"
    end
  end
  
  def self.class_method_id
    where(id: 1) do
      def print_text 
        "I believe I can fly"
      end
    end
  end
end

# scope
User.scope_id.print_text
=> "say oh yeah"
---------------------------
# class method
User.class_method_id.print_text
=> NoMethodError
User.print_text
=> NoMethodError
```
Chúng ta có thể thấy khi viết scope, chúng ta có thể thêm các thành phần mở rộng bên trong scope và những thành phần mở rộng này chỉ có tác dụng với object nếu như scope được gọi.<br>
Chúng ta cũng có thể làm tương tự với **class method** bằng việc sử dụng **module**:
```ruby
class User < ActiveRecord::Base
  def self.class_method_id
    where(id: 1).extend Pritable
  end
  
  module Printable
    def print_text
      "I believe I can fly"
    end
  end
end

User.class_method_id.print_text
=> "I believe I can fly"
```
## Một vài điều cần lưu ý khi sử dụng scope
### 1. default_scope is DEVIL
Không nên sử dụng default_scope vì:
<br>
**default_scope không thể bị ghi đè** 
Nếu định nghĩa default_scope thì mọi câu query đều phải chạy qua default_scope từ đó trả về kết quả không như mong muốn:
```ruby
class User < ActiveRecord::Base
  default_scope {where(admin: true)}
  scope :sort_by_created, ->{order(created_at: :desc)}
end

User.sort_by_created
# SELECT `users`.* FROM `users` WHERE `users`.`admin` = TRUE ORDER BY `users`.`created_at` DESC
```
Khi gọi scope **:sort_by_created** câu query trả về tự động thêm điều kiện của default_scope. Điều này rất nguy hiểm khi nhiều người làm chung một dự án mà không rõ được hành vi của code.
**default_scope còn ảnh hưởng đến khi khởi tạo instance của một model**
<br>
Vẫn với ví dụ trên:
```ruby
User.new
#<User:0x00005625eecc9f10> {
  :address         => nil,
  :admin           => true,
  :created_at      => nil,
  :email           => nil,
  :id              => nil,
  :name            => nil,
  :password_digest => nil,
  :updated_at      => nil
}
```
Ta có thể thấy rằng default_scope tự động thêm giá trị vào trường admin khi khởi tạo instance.
### 2. Vậy khi nào thì chúng ta nên sử dụng scope?
Theo quan điểm của tôi chúng ta dùng scope khi:
* Sử dụng một câu query nhiều lần
* Khi logic không quá phức tạp
* Khi code cần đến khả năng chainable hoặc extensible
## Kết luận
Trên đây là một vài chia sẻ của tôi về **scope** trong khi học tập về Rails. Tùy vào mục đích để các bạn có thể sử dụng scope hoặc class method sao cho hợp lí và dễ maintain code nhất có thể.

<br>
Thank for reading and happy coding!