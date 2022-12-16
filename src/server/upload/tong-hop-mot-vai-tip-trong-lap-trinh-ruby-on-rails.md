Chào các bạn, hôm nay mình sẽ giới thiệu một vài tips mà mình tổng hợp từ nhiều nguồn khác nhau cũng như từ kinh nghiệm của mình.

Hy vọng bài viết sẽ bổ sung thêm kiến thức cho các bạn lập trình viên ROR.
 
## 1. Helper method trong console

Helper là một công cụ tuyệt vời trong Rails, helper có thể dùng bất kỳ đâu ở ngoài views, nếu bạn muốn dùng nó trong Rails console, hãy gọi nó qua helper object:

```ruby
>> helper.number_to_currency(10)
 => "$10.00"
```

## 2. Chạy Rails console trong sandbox

 Rails console là một công cụ không thể thiếu nếu bạn muốn chạy trực tiếp một method hay object nào đó để view log/ update data.
 
 Tuy tiện lợi nhưng cũng có thể trong trường hợp bạn không muốn update database hay thay đổi gì trên app, khi đó hãy chạy console trong sandbox.
 
 Rails console ROLLBACK mọi transaction sau khi kết thúc sandbox, dữ liệu app sẽ không bị ảnh hưởng gì:
 
 ```ruby
  myapp$ rails c --sandbox
Running via Spring preloader in process 20967
Loading development environment in sandbox (Rails 5.2.3)
Any modifications you make will be rolled back on exit
irb(main):001:0> User.create
   (0.1ms)  SAVEPOINT active_record_1
  User Create (0.4ms)  INSERT INTO "users" ("created_at", "updated_at") VALUES (?, ?)  [["created_at", "2019-03-26 13:39:43.978706"], ["updated_at", "2019-03-26 13:39:43.978706"]]
   (0.1ms)  RELEASE SAVEPOINT active_record_1
=> #<User id: 1, name: nil, created_at: "2019-03-26 13:39:43", updated_at: "2019-03-26 13:39:43">
irb(main):002:0> 
   (0.5ms)  rollback transaction
 ```
 
## 3. Gọi giá trị cuối cùng mà chúng ta vừa gọi

Giả sử bạn vừa query  để gọi  ra một value/ object nào đó mà chưa gán biến cho nó, Rails mặc định lưu giá trị cuối cùng đó vào biến```_```

```ruby
>> Post.find(2)
  Post Load (0.3ms)  SELECT  "posts".* FROM "posts"  WHERE "posts"."id" = $1 LIMIT 1  [["id", 2]]
 => #<Post id: 2, title: "Post title", body: "Post 2 content", created_at: "2019-03-25 03:14:10", updated_at: "2019-03-26 03:14:10">
>> _
 => #<Post id: 2, title: "Post title", body: "Post 2 content", created_at: "2019-03-25 03:14:10", updated_at: "2019-03-26 03:14:10">
>> post = _
 => #<Post id: 2, title: "Post title", body: "Post 2 content", created_at: "2019-03-25 03:14:10", updated_at: "2019-03-26 03:14:10">
```
 
## 4. Reload console! 

Khi bạn đang chạy rails console, nếu muốn cập nhật code mới nhất hãy chạy ```reload!``` thay vì restart lại rails console.

## 5. Query ngày tháng bằng range

Thay vì query dùng phép so sánh với mốc thời gian, chúng ta có thể query ngày tháng trong range nào đó bằng cách sau:

```ruby
User.where(created_at: 1.day.ago..Time.now)
```

Câu lệnh trên sẽ query db như sau:
``` 
 User Load (0.5ms)  SELECT  "users".* FROM "users" WHERE "users"."created_at" BETWEEN ? AND ? LIMIT ?  [["created_at", "2019-03-25 13:09:56.770984"], ["created_at", "2019-03-26 13:09:56.771530"], ["LIMIT", 11]]
```

## 6. Associations với điều kiện tùy chỉnh

Rails cung cấp cách khai báo association mặc định mà chúng ta thường dùng như has_many, belongs_to ...

Chúng ta có thể tùy chỉnh các associations này:

```ruby
has_many :posts
has_many :authorized_posts, ->{ where(approved: true) }, class_name: "Post"
```

Và gọi chúng như cách thông thường chúng ta thường gọi:

```ruby
User.find(1).authorized_posts
```

## 7. Các thao tác với enum 

Enum là một thứ rất quen thuộc và cực kỳ tiện dụng trong Rails.

Theo như mình tìm hiểu định nghĩa về enum thì nó là thứ định nghĩa các value integer trong database bằng text được mapping với nhau qua khai báo enum.

```ruby
# Request.rb
enum status: {pending: 1, approved: 2, rejected: 3}
```
Trong database, field status lưu dạng integer, chúng ta có thể thông qua các dòng text đã mapping để truy xuất chúng.

-  Query những status pending: 
```ruby
Request.pending
```

- Kiểm tra status của đối tượng: 
```ruby
Request.first.approved?
```

- Update status:

```ruby
Request.last.rejected!
```
- Query theo nhiều status:

```ruby
Request.where(status: [:pending, :approved])
```

## 8. Benchmark code

Bạn có thể kiểm tra hiệu năng của đoạn code bằng cách check thời gian thực thi qua Benchmark:

```ruby
Benchmark.ms{User.joins(:posts).where("posts.status in (1, 2)")}
```

## 9. Kiểm tra dòng lệnh generate sẽ sinh ra những file gì 

Trường hợp bạn muốn xem một dòng lệnh generate sẽ sinh ra những file nào, bạn có thể add thêm -p vào sau câu lệnh để kiểm tra:

```ruby
project/myapp$ rails g model user name:text corporation_id:integer -p
Running via Spring preloader in process 19769
      invoke  active_record
      create    db/migrate/20190407130658_create_users.rb
      create    app/models/user.rb
      invoke    test_unit
      create      test/models/user_test.rb
      create      test/fixtures/users.yml
```

Như vậy mình vừa trình bày một vài tips trong Ruby on Rails, hy vọng bài viết sẽ giúp ích cho anh em đang code ruby on rails.
Cảm ơn các bạn đã theo dõi bài viết.