Đôi lúc chúng ta muốn thay đổi thuộc tính của một bản ghi nhưng vẫn muốn tạo một bản sao có chứa các thông tin thuộc tính cũ của bản gốc. Trong ruby có 2 phương thức #clone và #dup đều giúp chúng ta tạo ra shallow copies(chỉ copy instance của object). Vậy thì chúng khác nhau ở điểm nào?

### #clone copy cả trạng thái frozen còn #dup thì không
Trong ruby kể cả **constants** cũng có thể thay đổi được:
```ruby
CONST = "a"
CONST << "b"
CONST #=> "ab"
```
Bằng việc sử dụng method #freeze chúng ta có thể đưa một constant, một object, ... về trạng thái frozen và không thể thay đổi được:
```ruby
CONST = "foo".freeze
CONST << "bar" #=> FrozenError
```
Object #clone vẫn duy trì trạng thái frozen của object gốc còn object #dup thì không.
Ví dụ: 
```ruby
class Animal
end

a = Animal.new
a.freeze
a.clone.frozen? #=> true
a.dup.frozen? #=> false
```
### khi lưu object #clone và object #dup
Ví dụ:
```ruby
user_clone = User.first.clone
#=> #<User id: 1, name: "user 01", email: nil, created_at: "2018-12-27 07:26:28", updated_at: "2018-12-27 07:26:28">
user_dup = User.first.dup
#=>  #<User id: nil, name: "user 01", email: nil, created_at: nil, updated_at: nil>
```
Trong ví dụ trên, #clone object chia sẻ toàn bộ các thuộc tính của object gốc(bao gồm các trường thuộc tính đặc biệt như **id, created_at, updated_at, ...**) còn #dup object được coi như một bản ghi mới và nó chỉ chia sẻ các liên kết trong object gốc. Điều đó có nghĩa là nếu chúng ta thay đổi thuộc của #clone object thì sẽ thay đổi thuộc tính của object gốc còn #dup object sẽ tạo ra một bản ghi mới hoàn toàn độc lập.<br>
Với #clone:
```ruby
u = User.first
#=> #<User id: 1, name: "user 01", email: nil, created_at: "2018-12-27 07:26:28", updated_at: "2018-12-27 07:26:28">
u.clone.update_attribute(name: "new user")
#=>  UPDATE `users` SET `name` = 'new user', `updated_at` = '2019-01-18 07:31:39' WHERE `users`.`id` = 1
u.name
#=> "new user"
```
Với #dup:
```ruby
u = User.first
#=> #<User id: 1, name: "user 01", email: nil, created_at: "2018-12-27 07:26:28", updated_at: "2018-12-27 07:26:28">
u.dup.update_attribute(name: "new user")
#=>  INSERT INTO `users` (`name`, `email`, `created_at`, `updated_at`) VALUES ('new user', nil, '8gkHg+VRPaWJMzsFDH3RIYK6Ffg=', '2019-01-18 07:36:22', '2019-01-18 07:36:22', TRUE)
u.name
#=> "user 01"
User.last.name
#=> "new user"
```
### singleton method
#clone object có khả năng copy singleton methods của object gốc còn #dup object thì không thể.
Ví dụ:
```ruby
class Dog
end

dog = Dog.new

def dog.bark
    "woff woff"
end

dog1 = dog.clone
dog1.bark #=> "woff woff"

dog2 = dog.dup
dog2.bark #=> NoMethodError
```
### Tổng kết
Nói chung, #clone và #dup có ngữ nghĩa khác nhau trong các lớp con cháu. Trong khi #clone được sử dụng để sao chép một đối tượng, bao gồm cả trạng thái, method bên trong của nó, #dup thường sử dụng lớp của đối tượng con cháu để tạo ra bản ghi mới.<br><br>

*Thanh for reading and happy coding!*