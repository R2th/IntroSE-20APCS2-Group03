CRUD là cách viết tắt cho bốn hành động được sử dụng để thao tác với data: Create, Read, Update và Delete. Trong Rails, Active Record sẽ tự động tạo ra các method cho phép bạn thao tác với dữ liệu trong cơ sở dữ liệu mà không cần phải viết các câu query thông thường. Tất cả công việc bạn cần làm chỉ là gọi các method tương ứng và Active Record sẽ giúp bạn thực thi các truy vấn với cơ sở dữ liệu.
## 1. Create
`Active Record objects` có thể được tạo từ một hash, một block, hoặc là có thể truyền trực tiếp các giá trị của các thuộc tính của object khi gọi hàm `create`. `new` method sẽ chỉ trả về một object mới mà không lưu vào database, nếu muốn lưu bạn phải gọi thêm method `save`, trong khi đó `create` sẽ trả về một object mới và lưu luôn vào database. Như vậy bạn có thể hiểu `create` là tổng hợp của hai method `new` và `save`.
Ví dụ, có một model `User` với hai trường: name và occupation, khi method `create` được gọi thì một record mới sẽ được tạo mới và lưu vào trong database.
```
user = User.create(name: "Rose", occupation: "Code Artist")
```
Còn đối với `new` chúng ta sẽ phải gọi thêm method `save` để record mới được lưu vào database.
```
user = User.new(name: "Rose", accupation: "Code Artist")
user.save
```
## 2. Read
Active Record cung cấp rất nhiều API để có thể truy cập đến dữ liệu trong database. Dưới đây là một vài ví dụ đơn giản về một số method mà Active record cung cấp.
```
# return a collection with all users
users = User.all
```
```
# return the first user
user = User.first
```
```
# return user with id = 10
user = User.find(10)
```
```
# return the first user named Rose
user = User.find_by(name: "Rose")
```
```
# find all users named Rose who are Code Artists and sort by created_at in reverse chronological order
users = User.where(name: "Rose", occupation: "Code Artist").order(created_at: :desc)
```
Bạn có thể tìm hiểu các method mà Active Record cung cấp ở đây [Active Record Query Interface](https://guides.rubyonrails.org/active_record_querying.html)
## 3. Update
Một khi một Active Record object đã được tạo mới thì bạn có thể thay đổi các thuộc tính của nó và lưu vào database.
```
user = User.find_by(id: 10)
user.name = "Rose"
user.save
```
Một cách viết ngắn gọn hơn:
```
user = User.find_by(id: 10)
user.update(name: "Rose", accupation: "Code Artist")
```
Nếu bạn muốn update nhiều record một lúc, bạn có thể sử dụng method `update_all`
```
User.update_all "max_login_attempts = 3, must_change_password = 'true'"
```
## 4. Delete
Một Active Record object cũng có thể bị destroy và nó sẽ bị xóa ngay trong database
```
user = User.find_by(name: "Rose")
user.destroy
```
Bạn cũng có thể xóa nhiều records một lúc với method `destroy_by` và `destroy_all`
```

# find and delete all users named Rose
User.destroy_by(name: "Rose")
 
# delete all users
User.destroy_all
```
Nguồn tham khảo: https://guides.rubyonrails.org/active_record_basics.html