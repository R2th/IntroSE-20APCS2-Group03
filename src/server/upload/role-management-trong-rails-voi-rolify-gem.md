# Giới thiệu
Rolify là gem trong Rails dùng để hỗ trợ việc quản lý các Roles trong Rails một cách dễ dàng và nhanh chống. 

Nó hỗ trợ cả scope trên resource object nào đó.
Ví dụ:
```ruby
user.has_role?(:moderator, @forum)
=> false # check user đó có phải là role moderator cho đối tượng forum nào đó không
```

# Cài đặt
```
gem "rolify"
```
=> bundle install

# Cách sử dụng
### 1. Tạo Role Model

Đầu tiên, mình phải sử dụng generator của nó để setup cho Rolify. Model Role và User là tên default. Tuỳ nhiên, bạn cũng có thể dùng tên khác tuỳ thuộc vào project thực tế của bạn.
```
rails g rolify Role User
```

The generator will create your Role model, add a migration file, and update your User class with new class methods.

Generator này sẽ:
+ tạo model Role
+ tạo file migration mới
+ cập nhật model User với class method mới

```
rake db:migrate
```

### 2. Configure resource models
Trong những model bạn muốn apply role vào, bạn chỉ cần add method `resourcify` như sau:

```ruby
class Forum < ActiveRecord::Base
  resourcify
end
```

### Tạo role cho User
Tạo global Role: Role cho tất cả resource object

```ruby
user = User.find(1)
user.add_role :admin
```

Tạo role cho một resource instance nào đó:
```ruby
user = User.find(2)
user.add_role :moderator, Forum.first
```

Tạo role cho resource class nào đó:
```ruby
user = User.find(3)
user.add_role :moderator, Forum
```
Xoá role:
```ruby
user = User.find(3)
user.remove_role :moderator
```

### Role queries

Kiểm tra user đó có global role hay không:
```ruby
user = User.find(1)
user.add_role :admin # tạo global role
user.has_role? :admin
=> true
```

Kiểm tra user đó có role trên resource instance đó hay không:
```ruby
user = User.find(2)
user.add_role :moderator, Forum.first # tạo role cho resource instance
user.has_role? :moderator, Forum.first
=> true
user.has_role? :moderator, Forum.last
=> false
```

Kiểm tra user đó có role trên resource class đó hay không:
```ruby
user = User.find(3)
user.add_role :moderator, Forum # tạo role cho resource class
user.has_role? :moderator, Forum
=> true
user.has_role? :moderator, Forum.first
=> true
user.has_role? :moderator, Forum.last
=> true
```


Nếu bạn tạo global role cho user, gloabl role sẽ overrides toàn bộ các role cho resource:
```ruby
user = User.find(4)
user.add_role :moderator # tạo global role
user.has_role? :moderator, Forum.first
=> true
user.has_role? :moderator, Forum.last
=> true
```


Để kiểm tra user đó có role cụ thể cho resource nào đó hay không: 
```ruby
user = User.find(5)
user.add_role :moderator # tạo a global role
user.has_role? :moderator, Forum.first
=> true
user.has_strict_role? :moderator, Forum.last
=> false
```

Ở trên là các method cần thiết để sử dụng Roliy, tuỳ nhiên còn có các method khác nữa. Để chi tiết hơn bạn tham khảo tài liệu của nó ở đây. 

https://github.com/RolifyCommunity/rolify