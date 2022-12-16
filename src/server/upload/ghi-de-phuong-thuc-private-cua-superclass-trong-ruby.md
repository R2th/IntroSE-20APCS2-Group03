- Bài viết được dịch từ bài [Overriding private methods of superclass in Ruby](https://medium.com/rubycademy/overriding-private-superclass-methods-in-ruby-82ee4789c8f2) của tác giả [Mehdi Farsi](https://medium.com/@farsi_mehdi).
-----

![](https://miro.medium.com/max/700/0*TjnlmxzSQNYnVeqB)

-----

Điều gì xảy ra khi một phương thức private của lớp cha bị ghi đè trong Ruby?

Vì Ruby là một ngôn ngữ OOP, một class có thể kế thừa từ một class khác. Trong Ruby, class được kế thừa thường được gọi là lớp cha - Tên này xuất phát từ phương thức `Class#superclass` trả về lớp cha trực tiếp của class hiện tại.

```ruby
class Parent
  def role
    'parent'
  end
end

class Child < Parent
end

Child.superclass # => Parent
Child.new.role   # => "parent"
```

Ở đây, lớp `Parent` định nghĩa phương thức `role`. Lớp `Child` kế thừa trực tiếp từ `Parent`, có thể gọi phương thức này. Điều này là do cơ chế `Method Lookup Path`.

> Có thể bạn muốn đọc bài viết [Ruby Object Model](https://medium.com/rubycademy/ruby-object-model-part-1-4d06fa486bec) nếu bạn chưa quen với cơ chế này

---

## Kế thừa và phương thức private
Trong Ruby, một phương thức private là một phương thức chỉ có thể được gọi ngầm định - hoặc với  `self` là kể từ **Ruby 2.7**.
```ruby
class Parent
  private

  def role
    'parent'
  end
end

class Child < Parent
  def initialize
    self.role # => "parent"
  end
end

Child.new
```
Ở đây, phương thức private `role` có thể truy cập được trong lớp `Child` kế thừa. Vì vậy, trạng thái của một phương thức kế thừa được giữ thông qua kế thừa.

Bây giờ, điều gì sẽ xảy ra nếu chúng ta ghi đè phương thức `role` private?


## Ghi đè một phương thức private
```ruby
class Parent
  private

  def role
    'parent'
  end
end

class Child < Parent
  def get_role
    role
  end
end

Child.new.get_role # => "parent"

Child.new.private_methods.include?(:role) # => true
Child.new.public_methods.include?(:role)  # => false

class Child < Parent
  def role
    'child'
  end
end

Child.new.get_role # => "child"

Child.new.private_methods.include?(:role) # => false
Child.new.public_methods.include?(:role)  # => true
```
Ở đây, lớp `Child` ghi đè phương thức private của `Parent#role`. Trong trường hợp này, chúng ta có thể thấy rằng `role` được định nghĩa là phương thức `public` sau khi ghi đè. Ngoài ra, `private_methods` không bao gồm `#role` mặc dù phương thức này là private trong *ancestor chain(chuỗi tổ tiên)* của `Child` - thông qua phương thức `Parent#role`.

Thật vậy, `private_methods` biết rằng `Child` định nghĩa một phương thức `role`. và vì `Child` là mục *input đầu tiên của ancestor chain* (và trình xử lý thông báo trong *Method Lookup Path* cho lệnh gọi đến `Child#role`), nên nó sẽ được coi là *phiên bản phù hợp* của `#role` để kiểm tra theo quy trình `* _methods`. Vì vậy, vì `Child#role` không được xác định là private nên trạng thái private của `Parent#role` không được kế thửa bởi `Child#role` nữa.

## Phần kết luận
Vì vậy, hãy luôn cẩn thận khi ghi đè các phương thức được xác định bằng một access control cụ thể. Thật vậy, trạng thái này sẽ không được chia sẻ giữa các phiên bản khác nhau của `method`.