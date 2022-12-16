Hi there!

Mình là newbie Rails dev, đến với framework này, mình rất ấn tượng với khả năng cũng như những tiện ích mà Active Record đem lại.
Có hàng trăm methods mà nó cung cấp, nhưng... "Làm thế nào để sử dụng Active Record một cách hiệu quả nhất?! Tối ưu hiệu suất hệ thống nhất?!" là một ý mà mình nghĩ nhiều bạn cũng sẽ rất quan tâm.

Vô tình "lượm được" bí kíp =)) nên mình muốn chia sẻ ngay trong bài viết này. Các bạn cùng xem và kiểm chứng nhé! 

### Load-tất (eager-load) với includes để tránh n+1 query
Giả sử, chúng ta có `n` record trong bảng `users`, cách dùng **ActiveRecord**  dưới đây sẽ sinh ra `n+1` query
*Ở vòng lặp `.each` với mỗi user, nó sinh ra 1 query để tìm posts cho user đó.
```ruby
# Giả sử User có quan hệ như sau
class User
  has_many :posts
end

# Khi chúng ta chạy lệnh activerecord này
users = User.all

user.each do |user|
  user.posts
end

# sẽ sinh ra n+1 query, trong đó n là số lượng users
# SELECT * FROM users;
# SELECT * FROM posts WHERE posts.user_id = 1;
# SELECT * FROM posts WHERE posts.user_id = 2;
# SELECT * FROM posts WHERE posts.user_id = 2;
#   .....
# SELECT * FROM posts WHERE posts.user_id = n;
```

Tuy nhiên, sử dụng `includes` sẽ chỉ sinh ra 2 query. Một là load tất cả `users`, hai là load các `posts` có quan hệ với tập `users` đó.
*Nên khi đến vòng lặp `each`, không cần phải truy vấn DB nữa, vì mọi posts đã được lấy ra từ trước đó.

```ruby
# load-tất all users' posts with `includes`
users = User.includes(:posts)

users.each do |user|
  user.posts
end

# This will only run 2 queries.
# SELECT * FROM users;
# SELECT * FROM posts WHERE posts.user_ids IN (1,2,3,4,....,n);
```

### Sử dụng find_each khi cần query một lượng record khổng lồ.

Thực tế, cách làm này sẽ làm tăng số lượng query, nhưng bù lại lượng data load vào memory sẽ được giảm tải!

```ruby
# Lấy ra tất cả các users trong 1 lần gọi
User.all.each do |user|
  notify(user)
end

# Query được sinh ra:
# SELECT * FROM users;

# Với `find_each`, ta sẽ lấy ra users theo từng batch (nhóm theo số lượng)
# lượng record trong batch được xác định bởi option: batch_size  (mặc định là 1000)
User.all.find_each(batch_size: 5000) do |user|
  notify(user)
end

# Query được sinh ra:
# SELECT * FROM users ORDER BY users.id ASC LIMIT 5000;
# SELECT * FROM users WHERE users.id > 5000 ORDER BY users.id ASC LIMIT 5000;
# SELECT * FROM users WHERE users.id > 10000 ORDER BY users.id ASC LIMIT 5000;
# ....
```

Thay vì "nhồi" một lượng lớn record trong 1 lần vào memory (điều này có nguy cơ làm tèo server t/hợp ta có lượng record lớn)
ta sẽ query lần lượt từng batch, memory sẽ giải phóng batch cũ trước khi xử lý batch tiếp theo.

### Chỉ select hoặc pluck những attribute mà ta cần

Nhiều lúc, chúng ta không cần tất cả các attribute của model, mà chỉ cần một vài trong số chúng mà thôi.
Lúc này hãy dùng:
* `pluck` khi bạn muốn lấy ra 1 (hoặc nhiều) attribute và bỏ nó vào mảng của các string thay vì mảng của các `ActiveRecord_Relation`
* `select` khi bạn cần `ActiveRecord_Relation`

```ruby

# Cách làm dưới đây sẽ load tất cả user record vào các object 'User', chỉ để lấy ra 1 attribute 'email', 
# Cách làm này gây lãng phí tài nguyên, vì load ra hết columns, mà chỉ lấy 1 attribute.
user_emails = User.where(status: "active").map(&:email)
# SELECT * FROM users;

# Thay vào đó, dùng `pluck` sẽ tạo ra query chỉ select mỗi attribute mà chúng ta cần và gán các value đó vào mảng
# thay vì gán cả các object, làm giảm lượng memory sử dụng.
user_emails = User.where(status: "active").pluck(:email)
# Select users.email FROM users;

# Nhưng nếu bạn vẫn cần kết quả trả về là các `ActiveRecord_Relation` của object `User` (cho việc chain query chẳng hạn..)
# thì hãy dùng `select`. 
user_emails = User.where(status: "active").select(:email)
# Select users.email FROM users;

# Chỉ khi nào bạn cần TẤT attribute của model thì đừng dùng `pluck` or `select`
users = User.where(status: "active")
```

### Dùng "exist?" thay vì "present?" khi check sự tồn tại của record
Khi bạn đơn thuần chỉ muốn check sự tồn tại của một record, mà không thao tác gì thêm với record đó, thì hãy dùng "exist?".

```ruby
# Sử dụng `present?`: load toàn bộ attributes vào memory
if User.where(email: "teemo@shrooms.net").present?
  puts "There is a user with email address teemo@shrooms.net"
else
  puts "There is no user with email address teemo@shrooms.net"
end
# SELECT * FROM users WHERE email` = 'teemo@shrooms.net';

# `exists?`: không select bất kì column nào, cũng như giới hạn 1 record tìm được.
if User.where(email: "teemo@shrooms.net").exists?
  puts "There is a user with email address teemo@shrooms.net"
else
  puts "There is no user with email address teemo@shrooms.net"
end
# SELECT 1 FROM users WHERE email` = 'teemo@shrooms.net' LIMIT 1;
```

### Delete hàng loạt với "delete_all"
Nếu bạn muốn delete một lúc nhiều record mà không muốn kích hoạt`ActiveRecord Callbacks`, hãy dùng `delete_all`

```ruby
# Delete lượng lớn records bằng `destroy` sẽ tốn một lần truy vấn cho mỗi record
deadbeat_users = User.where(payment_status: "deadbeat")
deadbeat_users.each do |deadbeat|
  deadbeat.destroy
end
# DELETE FROM users WHERE id = 13;
# DELETE FROM users WHERE id = 42;
# DELETE FROM users WHERE id = 49;
# DELETE FROM users WHERE id = 420;
# DELETE FROM users WHERE id = 666;
# ...

# Nếu bạn không cần sử dụng đến callbacks `after_destroy` sau khi delete thì hãy dùng `delete_all`
deadbeat_users.delete_all
# DELETE FROM users WHERE users.status = 'deadbeat';
```

### Create hàng loạt 
Có thể bạn chưa biết: "Một số DB engine cho phép `ActiveRecord::Base#create` chấp nhận việc tạo một lúc hàng loạt record! :v
Vậy là chỉ cần 1 query để giải quyết vấn đề, chứ không phải `n` query nữa.

```ruby
# Tạo một loạt record từ mảng hash
new_users = [
  {name: "Teemo", email: "teemo@shrooms.net"},
  {name: "Heim", email: "heim@turrets.com"},
  ...
  {name: "Volli", email: "volli@woods.biz" },
]

# Cách này sẽ khiến tạo 1 query cho 1 record
new_users.each do |user_hash|
  User.create(user_hash)
end
# INSERT INTO users (name, email) VALUES ('Teemo', 'teemo@shrooms.net');
# INSERT INTO users (name, email) VALUES ('Heim', 'heim@turrets.com');
# ...
# INSERT INTO users (name, email) VALUES ('Volli', 'volli@woods.biz');

# Thay vào đó bạn có thể truyền cả mảng hash của users để tạo trong 1 query mà thôi.
# Lưu ý: chỉ chạy được khi DB engine của bạn support.
User.create(new_users)
# INSERT INTO users (name, email) 
# VALUES 
#   ('Teemo', 'teemo@shrooms.net'),
#   ('Heim', 'heim@turrets.com'),
#   ....
#   ('Volli', 'volli@woods.biz');
```

Tương tự, ta cũng có `update_all`

```ruby
User.where(payment_status: "on_time").update_all(awesome: true)
```

### Đôi khi xử lý trong Memory ngon hơn là cứ query

Cùng xem ví dụ sau
```ruby
# Bài toán: bạn muốn lấy các email không nằm trong bảng `users`

emails = [
  "teemo@shrooms.net",
  "heim@turrets.org",
  "annie@tibbers.gov",
  ...
  "volli@jungle.com"
]

new_emails = []

emails.each do |email|
  unless User.where(email: email).exists?
    new_emails << email
  end
end
# Cách làm này sẽ truy vấn db n lần để kiểm tra n email trong mảng `emails`
# SELECT 1 FROM users WHERE email` = 'teemo@shrooms.net' LIMIT 1;
# SELECT 1 FROM users WHERE email` = 'heim@turrets.org' LIMIT 1;
# SELECT 1 FROM users WHERE email` = 'annie@tibbers.gov' LIMIT 1;
# ...
# SELECT 1 FROM users WHERE email` = 'volli@jungle.net' LIMIT 1;

# Cách làm tinh tế hơn là lấy tất cả emails trong db, sau đó kiểm tra
existing_emails = Set.new(User.pluck(:email))
# SELECT users.email from users;

new_emails = []

emails.each do |email|
  unless existing_emails.include?(email)
    new_emails << email
  end
end
```

### Bullet gem

Bạn có thể sài `bullet gem` để xác định xem mình có đang bị dùng `load-tất` (eager-loading) một cách bừa bãi không.
Và nó cũng sẽ báo cho bạn biết chỗ bạn nên dùng `load-tất`

Để sử dụng, hãy `enable` nó trong môi trường `test`

```ruby
# config/environments/test.rb

config.after_initialize do
  Bullet.enable = true
  Bullet.bullet_logger = true
  Bullet.raise = true # Báo error khi xảy ra n+1 truy vấn.
end
```

Sau đó `bundle exec rspec` để xem các issue `n+1` nếu có. 

### Tính toán hiệu suất

Băn khoăn hiệu năng của query? Đã có benchmark.realtime

```ruby
require "benchmark"

user = User.find_by_name("Teemo")

# Xem thời gian tiêu tốn để đếm các comments của một post trong n+1 query 
puts Benchmark.realtime { user.posts.each { |post| puts post.comments.count } }

# Xem kết quả khi dùng eager-loading
# Ta hi vọng một kết quả tốt hơn :D
puts Benchmark.realtime { user.includes(:posts).posts.each { |post| puts post.comments.count } }
```

Chú ý MýSQL sẽ lưu query vào `cache`, nên lần query sau sẽ nhanh hơn.
Vì thế để không làm ảnh hưởng kết quả benchmark, hãy nhớ clear cache với 

```ruby
RESET QUERY CACHE;
```

*Bài viết sử dụng tư liêu trên [medium.com](https://medium.com/@User3141592/active-record-query-performance-tips-a3c3947b968)