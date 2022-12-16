Sau đây, mình xin hướng dẫn các bạn một vài típ có thể tối ưu hóa query khi sử dụng Active Record nhé

#### 1.  Sử dụng Eager Loading với `includes` để tránh n+1 query
```ruby
class Post
  has_many :comments
end
```
- Ví dụ, nếu bạn có `n` rows của bảng `Post` nếu gọi như bình thường sẽ khi gọi tất cả bản ghi `comments` của `Post` ra thì nó sẽ tạo ra các câu query như sau:
```ruby
posts = Post.all

posts.each do |post|
  post.comments
end

# Nó sẽ tạo ra N+1 query như thế này:

# SELECT * FROM posts;
# SELECT * FROM comments WHERE comments.post_id = 1;
# SELECT * FROM comments WHERE comments.post_id = 2;
# SELECT * FROM comments WHERE comments.post_id = 3;
#   .....
# SELECT * FROM comments WHERE comments.post_id = n;
#-> Điều này là sẽ ảnh hưởng đến performance của hệ thống
```
- Tuy nhiên, nếu ở đây ta sử dụng `includes` thì chúng ta chỉ mất 2 query là có thể lấy ra dữ liệu mà chúng ta cần:
```ruby
# Sử dụng Eager-load
posts = Post.includes(:comments)

posts.each do |post|
  post.comments
end

# Sẽ tạo ra 2 query:
# SELECT * FROM posts;
# SELECT * FROM comments WHERE comments.post_id IN (1,2,3,4,....,n);
#-> Như vậy, performance của bạn có thể cải thiện hơn nhiều rồi :)
```

<hr>

#### 2. Sử dụng `find_each` khi load một lượng lớn các bản ghi
- Nếu sử dụng cách này nó sẽ khiến ta sẽ tăng số lượng truy vấn được thực hiện, nhưng nó sẽ giảm lượng bộ nhớ mà ta sử dụng khi tải một lượng lớn bản ghi.
```ruby
# 1. Sử dụng truy vấn bình thường

Post.all.each do |post|
  ...
end
# -> Sẽ sinh ra câu query như sau:
# SELECT * FROM posts;

# 2. Sử dụng find_each sẽ query theo batch của size 
# với tùy chọn :batch_size option (default là 1000)

Post.all.find_each(batch_size: 5000) do |post|
  ...
end

# -> Sẽ sinh ra câu query như sau:
# SELECT * FROM posts ORDER BY posts.id ASC LIMIT 5000;
# SELECT * FROM posts WHERE posts.id > 5000 ORDER BY posts.id ASC LIMIT 5000;
# SELECT * FROM posts WHERE posts.id > 10000 ORDER BY posts.id ASC LIMIT 5000;
# ....
```
- Ở đây, thay vì tải một lượng lớn các bản ghi vào bộ nhớ để xử lý (điều này, có thể làm sập máy chủ nếu có quá nhiều bản ghi) thì `find_each` tải từng batch một lần và sẽ thu thập chúng lại sau khi sử dụng.

<hr>

#### 3. Sử dụng `Select` và `Pluck` cho attributes
- Đôi khi, chúng ta không cần lấy tất cả các thuộc tính của model, mà chỉ lấy một vài thuộc tính của model đó thôi thì ta có thể sử dụng `pluck` để truy vấn các thuộc tính cần thiết và trả về chúng dưới dạng một `Array` thay vì `ActiveRecord_Relation`.
- Tuy nhiên, nếu ta cần trả về dưới dạng `ActiveRecord_Relation`, ta có thể sử dụng `select`.
```ruby
# 1. Ví dụ ta muốn lấy tất cả các bản ghi Post

post_names = Post.where(type: "js").map(&:name)
# SELECT * FROM posts;

# -> Như thế ta sẽ phải load tất cả thuộc tính từ CSDL và tải tất cả chúng vào trong bộ nhớ.

# 2. Thay vì thế, chúng ta có thể sử dụng pluck để  truy vấn với
# các thuộc tính mà chúng ta cần. Nó cũng trả về các thuộc tính dưới dạng một Array
# thay vì các ActiveRecord_Relation Post. Điều này sẽ giảm việc sử dụng bộ nhớ lại

post_names = Post.where(type: "js").pluck(:name)
# Select posts.name FROM posts;

# 3. Tương tự như pluck nhưng nếu ta muốn trả về 
# theo dạng ActiveRecord_Relation thì ta có thể sử dụng select:

post_names = Post.where(type: "js").select(:name)
# Select posts.name FROM posts;
```

<hr>

#### 4. Sử dụng  `exists?` để kiểm tra sự tồn tại của bản ghi
- Đôi khi, chúng ta chỉ muốn biết bản ghi có tồn tại hay không, mà không cần phải làm gì với bản ghi đó. Ta có thể sử dụng `exists?`
```ruby
# Nếu chúng ta chỉ muốn biết một bản ghi tồn tại hay ko mà không thực hiện gì với bản ghi đó như này:

if Post.where(type: "ruby").present?
  puts "Good"
else
  puts "Bad"
end

# -> Như vậy, nó sẽ lại giống với việc ta sử dụng ở phần 3.
# Đó là, ta sẽ phải load tất cả thuộc tính từ CSDL và tải tất cả chúng vào trong bộ nhớ.

# Nếu sử dụng exists?

if Post.where(type: "ruby").exists?
  puts "Good"
else
  puts "Bad"
end

# Như vậy nó sẽ giới hạn truy vấn tương ứng với việc chỉ có 1 bản ghi được truy vấn
# và nó không select bất kỳ atrribute nào.

# SELECT 1 FROM posts WHERE type = "ruby" LIMIT 1;
```

<hr>

#### 5. Sử dụng  `ActiveRecord::Relation#size` thay vì  `ActiveRecord::Calculations#count`
- Ví dụ ta có `ActiveRecord :: Relation Post`, khi sử dụng `posts.count` và `posts.size` thì nó đều trả về số lượng `posts`. Tuy nhiên, `posts.count` sẽ luôn chạy truy vấn như `SELECT COUNT(*) FROM posts WHERE ...` ngay cả khi các mối quan hệ đã được tải.
- Còn `size` sẽ thông minh hơn ở chỗ nó sẽ gọi `length` nếu mối quan hệ nếu nó đã được tải nhưng nó sẽ gọi `count` nếu mối quan hệ chưa được tải.
```ruby
# File activerecord/lib/active_record/relation.rb, line 210
def size
  loaded? ? @records.length : count(:all)
end
```

<hr>

#### 6. Sử dụng  `delete_all` số lượng lớn các bản ghi
- Khi muốn xóa một số lượng lớn các bản ghi không require `Active Record callback`, hãy sử dụng `delete_all` hoặc thay vì gọi `destroy` cho các đối tượng riêng lẻ.
```ruby
# 1. Xóa một lượng lớn các bản ghi sử dụng destroy
# -> dẫn đến việc nó sẽ sinh ra N query như này:

destroy_posts = Post.where(type: "js")
destroy_posts.each do |dp|
  dp.destroy
end

# DELETE FROM posts WHERE id = 6;
# DELETE FROM posts WHERE id = 10;
# DELETE FROM posts WHERE id = 23;
# DELETE FROM posts WHERE id = 50;
# ...

# 2. Sử dụng delete_all để xóa hàng loạt các bản ghi này bằng một truy vấn:
destroy_posts.delete_all
# DELETE FROM posts WHERE posts.type = "js";
```

<hr>

#### 7. Sử dụng  `create` cho array chứa hash
- `ActiveRecord::Base#create` có thể chấp nhận array chứa các hash bên trong để tạo các bản ghi. Nó sẽ chạy một query thay vì N query như bình thường. Tuy nhiên, điều kiện ở đây là CSDL của chúng ta phải hỗ trỡ việc insert hàng loạt như thế này. Ví dụ:
```ruby
# Ta có một array chứa hash

new_posts = [
  {name: "Ruby", type: "ruby"},
  {name: "Python", type: "pyp"},
  {name: "JS", type: "js" },
  ...
  {name: "Java", type: "java" }
]

# 1. Đối việc việc insert vào DB như bình thường như thế này nó sẽ sinh ra N query:

new_posts.each do |post|
  Post.create(post)
end

# INSERT INTO posts (name, type) VALUES ("Ruby", "ruby)
# INSERT INTO posts (name, type) VALUES ("Python", "pyp")
# INSERT INTO posts (name, type) VALUES ("JS", "js")
# ...
# INSERT INTO posts (name, type) VALUES ("Java, "java")

# 2. Thay vào đó, ta sẽ truyền mảng vào create, nó sẽ tạo

# tất cả các bản ghi trong một truy vấn nếu CSDL hỗ trợ tính năng này:

Post.create(new_posts)
# INSERT INTO posts (name, type) 
# VALUES 
#   ("Ruby", "ruby),
#   ("Python", "pyp"),
#   ("JS", "js"),
#   ....
#   ("Java, "java");
```

<hr>

#### 8. Sử dụng  `update` cho nhiều bản ghi cùng lúc
- Tương tự, cũng có thể  `update` nhiều bản ghi trong một truy vấn
```ruby
posts = Post.where(category_id: 2)

# Sử dụng update bình thường:
posts.each do |post|
  post.update(status: 3)
end

# Sử dụng update tất cả trong một query
Post.where(category_id: 2).update_all(status: 3)
```
<hr>

##### Cảm ơn các bạn đã đọc bài viết của mình!
<br>

###### Tà liệu tham khảo: [Medium](https://medium.com)