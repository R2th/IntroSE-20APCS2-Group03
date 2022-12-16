attr_accessor là sự kết hơp giữa attr_reader và attr_writer, nó là một marco rất hữu ích cung cấp getter và setter cho một instance variable. Nhưng đôi khi bạn muốn đạt được hiệu quả tương tự với các class variable. Có ít nhất ba cách để chúng ta có thể giải quyết vấn đề này là: attr_accessor, cattr_accessor và class_attribute. Về cơ bản thì 3 cách trên hoạt động tương tự nhau nếu chúng ta không sử dụng kế thừa, nhưng nếu chúng ta sử dụng kế thừa thì chúng sẽ có những khác biệt đáng kể.

### attr_accessor

Bạn sử dụng att_accessor trong trường hợp không muốn giá trị bị kế thừa. Trong trường hợp này, chúng ta tận dụng lợi thế thông thường của attr_accessor nhưng ở mức độ class. Sử dụng attr_accessor cho phép chúng ta định nghĩa các biến cho mỗi class con, nhưng giá trị của chúng không được kế thừa nếu được set ở class cha. Với mỗi class con giá trị của attribute được set là nil khi khởi tạo.

```
class Parent
 class << self
   attr_accessor :foo
 end
end

class Child < Parent 
end

Parent.foo = 100
Child.foo #=> nil // Giá trị không được kế thừa từ Parent

Child.foo = 200
Child.foo #=> 200
Parent.foo #=> 100 //Thay đổi giá trị ở class con không làm thay đổi giá trị ở class cha
```

### cattr_accessor

Bạn sử dụng cattr_accessor khi muốn giá trị được chia sẻ ở trên tất cả các class. Trong trường hợp này, chúng ta sử dụng cattr_accessor để kế thừa giá trị của biến từ class cha cho các class con. Không cần thiết chúng ta phải khai báo cattr_accessor trong block class << self. Điều quan trọng cần lưu ý ở đây là việc định nghĩa lại giá trị của biến ở các class con sẽ thay đổi ở các class con khác và class cha.

```
class Parent
  cattr_accessor :foo
end
class Child < Parent
end
class Grandchild < Child
end

Parent.foo = 100
Child.foo #=> 100 // Giá trị được kế thừa

Child.foo = 200
Child.foo #=> 200
Parent.foo #=> 200 // Giá trị được thay đổi
Grandchild.foo #=> 200 // Giá trị được thay đổi

Grandchild.foo = 300
Parent.foo #=> 200 // Giá trị được thay đổi
Grandchild.foo #=> 200 // Giá trị được thay đổi
```

### class_attribute

Bạn sử dụng class_attribute khi bạn muốn giá trị của biến được kế thừa và ghi đè mà không ảnh hưởng đến các class cha. Đây có lẽ là trường hợp phổ biến nhất.

```
class Parent
  class_attribute :foo
end

class Child < Parent
end

class Grandchild < Child
end

Parent.foo = 100
Child.foo #=> 100 // Giá trị được kế thừa

Child.foo = 200 
Child.foo #=> 200
Parent.foo #=> 100 // Thay đổi giá trị không anh hưởng đến class cha
Grandchild.foo #=> 200 // Thay đổi giá trị không anh hưởng đến class con
```

### Tài liệu tham khảo
https://medium.com/selleo/comparison-of-class-level-accessors-in-ruby-on-rails-40605d92a7a