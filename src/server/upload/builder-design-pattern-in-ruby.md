Theo GoF và cuốn sách tuyệt vời của họ "Design Patterns: Elements of Reusable Object-Oriented Software", builder pattern:

"*Tách riêng việc xây dựng một vật thể phức tạp từ biểu tượng của nó sao cho cùng một quá trình xây dựng có thể tạo ra các đại diện khác nhau."
và nó là một phần của một mẫu thiết kế đối tượng sáng tạo*.

Builder pattern rất hữu ích khi xây dựng một đối tượng gì đó độc lập với các bộ phận tạo thành nó (các methods xây dựng đối tượng). Điều đó cũng định nghĩa một ứng dụng khác của builder pattern: hữu ích khi có nhiều cách để xây dựng các đối tượng phức tạp.

Hãy bắt đầu với một số ví dụ và xem chúng ta có thể cải tiến / refactor nó bằng cách sử dụng patter builder.

Giả sử chúng ta có cách tạo ra users:

```
class User
  attr_accessor :first_name, :last_name, :birthday, :gender, :roles, :status, :email, :password

  def initialize(first_name=nil, last_name=nil, birthday=nil, gender=nil, roles=[], status=nil, email=nil, password=nil)
    @first_name = first_name
    @last_name = last_name
    @birthday = birthday
    @gender = gender
    @roles = roles
    @status = status
    @email = email
    @password = password
  end
end

User.new('John', 'Doe', Time.new('1999-03-02'), 'm', ['admin'], 'active', 'test@test.com', 'abcdef')
```

Có vài vấn đề với cách tiếp cận đó:

* Nó không có vẻ chuyên nghiệp
* Chúng ta có danh sách rất dài của params với cách chúng ta có thể nhanh chóng một người dùng mới. Để làm điều này, bạn có thể gửi nil cho params nhất định, nhưng nó có thể trông rất lộn xộn,
* Thêm params mới sẽ chỉ làm cho tình hình tồi tệ hơn,
* Logic cách đối tượng được xây dựng được ẩn trong sự khởi tạo của nó.


Để trích xuất logic user được xây dựng như thế nào, chúng ta có thể sử dụng builder pattern ở đây.

Class user của chúng ta trở nên đơn giản:

```
class User
  attr_accessor :first_name, :last_name, :birthday, :gender, :roles, :status, :email, :password
end
```

và chúng ta muốn tạo nhanh chóng user mới bằng cách làm điều này:

```
UserBuilder.build do |builder|
  builder.set_name('John', 'Doe')
  builder.set_birthday('1999-03-02')
  builder.set_as_on_hold
  builder.set_as_men
  builder.set_as_admin
  builder.set_login_credentials('test@test.com', 'abcdef')
end
```

Chúng ta đang nói với buidler (UserBuilder) làm thế nào để xây dựng user mới bằng cách cung cấp cho nó kế hoạch chính xác (đại diện bởi khối trong ví dụ đó).

Hai lợi ích rõ ràng ở đây: không có danh sách dài các tham số và thuật toán người dùng đang xây dựng là gì ngoài lớp User.

Hãy thực hiện lớp UserBuilder.

```
class UserBuilder
  def self.build
    builder = new
    yield(builder)
    builder.user
  end

  def initialize
    @user = User.new
  end

  def set_name(first_name, last_name)
    @user.first_name = first_name
    @user.last_name = last_name
  end

  def set_birthday(birthday)
    @user.birthday = Time.new(birthday)
  end

  def set_as_active
    @user.status = 'active'
  end

  def set_as_on_hold
    @user.status = 'on_hold'
  end

  def set_as_men
    @user.gender = 'm'
  end

  def set_as_women
    @user.gender = 'f'
  end

  def set_as_admin
    @user.roles = ['admin']
  end

  def set_login_credentials(email, password)
    @user.email = email
    @user.password = password
  end

  def user
    @user
  end
end
```

UserBuilder có kiến thức làm thế nào để xây dựng các bộ phận của người sử dụng. Nó cho chúng ta một số cách dễ tiêu hóa nhất của việc xây dựng các đối tượng mới (set_name, set_as_active, ...) hơn là chỉ là sự khởi tạo của User từ ví dụ đầu tiên (chúng ta không cần phải biết về một số chi tiết ở mức độ thấp của những phần nào đó xây dựng một đối tượng người dùng).

Bạn có thể có các kế hoạch khác nhau như thế nào để tạo một người dùng mới (các khối được truyền vào phương thức UserBuilder.build) và bạn có thể luôn chắc chắn rằng người xây dựng của bạn (UserBuilder) sẽ biết cách sử dụng kế hoạch của bạn để xây dựng đối tượng mới.

*Tham khảo*:
https://medium.com/kkempin/builder-design-pattern-in-ruby-dfa2d557ff1b