Có rất nhiều trường hợp chúng ta cần thêm một loạt bản ghi ví dụ như khi có một danh sách các user bằng CSV và cần phải import vào ứng dụng  của chúng ta.

Rails có những methods như `delete_all` hay `update_all` để xóa hay cập nhật một laotj các bản ghi tương ứng. Nhưng các method để thêm nhiều bản ghi một lúc thì lại không có cho đển bản Rails 6.

Rails 6 đã thêm 3 method `insert_all`, `insert_all!` và `upsert_all` vào `ActiveRecord::Persistence`, để giải quyết vấn đề trên.

### **Trước Rails 6**

Trước Rails 6, để insert nhiều bản ghi có thể sử dụng 1 trong các cách sau

- Sử dụng gem `activerecord-import`

```
users = []
10.times do |i|
  users << User.new(name: "user #{i}")
end
User.import users
```
 - Tạo lần lượt từng bản ghi

```
10.times do |i|
  User.create!(name: "user #{i}")
end
```

### **Trong Rails 6**

***insert_all và insert_all!***

Sử dụng insert_all có thể thêm 1 loạt bản ghi:
```
result = User.insert_all(
  [
    {
      name: "User1",
      email: "user1@example.com"
    },
    {
      name: "User2",
      email: "user2@example.com"
    }
  ]
)

# User Bulk Insert (85.1ms)  
# INSERT INTO `users` (`name`,`email`) VALUES ('User1', 'user1@example.com'), ('User2', 'user2@example.com') 
# ON DUPLICATE KEY UPDATE `name`=`name`
```

Trong câu lệnh query chúng ta có thể thấy mệnh đề `ON DUPLICATE KEY UPDATE 'name'='name'`, mệnh đề này xuất hiện nếu như sử dụng CSDL MySQL, nếu như sử dụng CSDL SQLite hay PostgreSQL chúng ta sẽ thấy một mệnh đề khác `ON CONFLICT DO NOTHING`. Hai mệnh đề này thực chất là giống nhau, sẽ thực hiện việc khi xảy ra xung đột hoặc vi phạm ràng buộc khóa duy nhất sẽ bỏ qua bản ghi xung đột và thực hiện insert bản ghi tiếp theo.

Ví dụ:
```
result = User.insert_all!(
  [
    {
      id: 1,
      name: "User1",
      email: "user1@example.com"
    },
    {
      id: 1,
      name: "User1",
      email: "user2@example.com"
    }
  ]
)

puts User.all
# User Load (0.3ms)  SELECT `users`.* FROM `users`
# [#<User:0x000055f50dbe4e68 id: 1, name: "User1", email: "user1@example.com">]
```

Nếu như muốn chắc chắn các bản ghi được insert thì chúng ta có thể sử dụng `insert_all!`, khi xảy ra xung đột thì exception sẽ được raise lên

Ví dụ:

```
result = User.insert_all!(
  [
    {
      id: 1,
      name: "User1",
      email: "user1@example.com"
    },
    {
      id: 1,
      name: "User1",
      email: "user2@example.com"
    }
  ]
)

# ActiveRecord::RecordNotUnique: Mysql2::Error: Duplicate entry '1' for key 'PRIMARY'
```

***upsert_all***

Nếu như một bản ghi đã tồn tại nhưng muốn cập nhật bản ghi hay muốn tạo 1 bản ghi mới thì chúng ta có thể sử dụng `upsert_all`

```
result = User.upsert_all(
  [
    {
      id: 1,
      name: "User1",
      email: "user1@example.com"
    },
    {
      id: 1,                        # duplicate id
      name: "User1",
      email: "user1@example.com"
    },
    {
      id: 2,
      name: "User2",                # new entry
      email: "User2@example.com"
    },
    {
      id: 3,                        # name update
      name: "NewUser3",
      email: "user3@example.com"
    }
  ]
)

puts User.all
# User Load (0.4ms)  SELECT `users`.* FROM `users`
# [#<User:0x00007f0300315bc8 id: 1, name: "User1", email: "user1@example.com">,
     #<User:0x00007f0300315b00 id: 2, name: "User2", email: "User2@example.com">,
     #<User:0x00007f0300315a38 id: 3, name: "NewUser3", email: "user3@example.com">]
```

Trong ví dụ trên, có 2 bản ghi có id trùng lập là `id='1'` và chỉ có 1 bản ghi được thêm vào, bản ghi có `id='2'` hoàn toán mới nên cũng được thêm vào mà không gặp vấn đề gì, bản ghi có `id='3'`là bản ghi có id đã tồn tại thì được cập nhật tên mới.

***Hiệu suất***

Việc insert hoặc update nhiều bản ghi liên tục có hiệu suất không được tốt

Ví dụ thử insert 1000 bản ghi liên tục:

```
print Benchmark.measure { 1000.times {|t| User.create(name: "name - #{t}")} }
 2.947885   0.260736   3.208621 (  6.043582)
=> nil
```

1000 User tạo mất 6.04s với 1000 transaction thực hiện 1000 câu query insert

Nếu như sử dụng câu lệnh insert_all chúng ta có thể import 1000 bản ghi với chỉ 1 câu query insert

```
users = 1000.times.map { |t| { name: "name - #{t}" } }
print Benchmark.measure { User.insert_all(users) }
0.008273   0.000029   0.008302 (  0.029733)
```
Chúng ta có thể thấy hiệu suất được cải thiện một cách đáng kể, giảm từ 6.04s chỉ còn 0.03s

### Tham khảo
https://blog.saeloun.com/2019/11/26/rails-6-insert-all.html