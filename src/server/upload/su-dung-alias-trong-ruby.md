#### Trong bài viết này, chúng ta sẽ tìm hiểu các vấn đề sau:
- *alias* **keyword**<br>
- *alias_method* **method**<br>
- *aliases* và *scopes*<br>
### **1. alias keyword**
Ruby cung cấp alias (bí danh) keyword để xử lý các alias của phương thức và thuộc tính<br>
```ruby
class User
  def fullname
     "Nam Dang"
  end

  alias username fullname
  alias name username
end

u = User.new

p u.fullname # => "Nam Dang"
p u.username # => "Nam Dang"
p u.name     # => "Nam Dang"
```
- Ở đây chúng ta định nghĩa một phương thức fullname của User và chúng ta định nghĩa một `username` alias cho phương thức này.<br>
- Tiếp theo, ta đặt cho `username` alias một alias khác là `name` <br>
- Vì vậy, mỗi lần ta gọi đến `name` hay `username` thì nó sẽ gọi lại code trong `User#fullname` method và trả về cùng một kết quả.<br>
### **2. alias_method Method**
`Module#alias_method` method chia sẻ cùng hành vi với `alias` keyword nhưng nó tuân thủ cú pháp method<br>
```ruby
class User
  def fullname
    "Nam Dang"
  end
 
  alias_method :username, :fullname
  alias_method "name",    :username
end

u = User.new

p u.fullname # => "Nam Dang"
p u.username # => "Nam Dang"
p u.name     # => "Nam Dang"
```
- Giống như `alias` keyword, ta đinh nghĩa ```User#fullname``` method và ta định nghĩa `username` alias cho method này.<br>
- Sau đó, `username` alias được đặt lại bằng `name` alias.<br>
- Vì vậy, mỗi lần gọi đến `name`, `username` hay `fullname` thì ta sẽ nhận được cùng một kết quả.<br>
Chúng ta có thể thấy rằng `alias_method` method nhận một `String` hoặc một `Symbol` làm đối số để xác định alias và method alias.<br>
### **3. Aliases and scopes**
Thực tế, `Module#alias_method` hoạt động khác với `alias` keyword trong một phạm vi cụ thể.<br>
```ruby
class Post
  def description
    "I'm a BanKai"
  end

  def self.alias_description
    alias_method :describe, :description
  end
end

class Comment < Post
  def description
    "Hello! Everybody"
  end

  alias_description
end

m = Comment.new

p m.description  # => "Hello! Everybody"
p m.describe     # => "Hello! Everybody"
```
- Ở đây chúng ta có thể thấy rằng, `alias_method` được sử dụng trong phương thức `Device#alias_description ` method và định nghĩa `describe` alias trên `Microwave#description` method chứ không phải `Device#description`.<br>
- Bây giờ ta sẽ thử với `alias` keyword:<br>
```ruby
class Post
  def description
    "I'm a BanKai"
  end

  def self.alias_description
    alias describe description
  end
end

class Comment < Post
  def description
    "Hello! Everybody"
  end

  alias_description
end

m = Comment.new

p m.description  # => "Hello! Everybody"
p m.describe     # => "I'm a BanKai"
```
- Như vậy với việc sử dụng `alias` keyword thì `describe` alias sẽ sử dụng trên `Device#description` method chứ không phải `Microwave#description`.<br>
- Tài liệu tham khảo http://ruby-doc.org/stdlib-2.0.0/libdoc/rdoc/rdoc/RDoc/Alias.html