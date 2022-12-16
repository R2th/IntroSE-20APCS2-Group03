### 17. Tạo bản ghi mới với *.new* và *.create*
Hai phương thức này đều giúp bạn tạo ra một đối tượng bản ghi mới. Bạn có thể sử  dụng một trong hai tùy thích
> Tạo một Post mới bằng phương thức ***.new***
```ruby
post = Post.new
=> #<Post id: nil, title: nil, content: nil, created_at: nil, updated_at: nil>
post.title = "New post"
post.content = "This is a new post created by .new method"
 ```
 
 > Tạo một Post mới bằng phương thức ***.create***
 ```ruby
 post = Post.create(title: "New post 2", content: "This is a new post created by .create method")
 ```
 
 Như vậy, ta thấy phương thức ***.create*** có cú pháp nhanh gọn hơn so với ***.new***. Tuy nhiên, trong trường hợp bạn không nhớ rõ các trường của một model, thì phương thức ***.new*** sẽ có lợi cho bạn vì khi dùng phương thức này, nó sẽ sinh ra 1 dòng liệt kê các trường hiện có của model tương ứng
 ```ruby
 post = Post.new
=> #<Post id: nil, title: nil, content: nil, created_at: nil, updated_at: nil>
 ```
 
 ### 18. Lưu bản ghi với ***.save***
 Ta đã biết cách tạo ra một đối tượng bản ghi mới với ***.new*** với ***.create***
 Tuy nhiên, khi dùng phương thức ***.new*** thì ta phải kết hợp với phương thức ***.save*** để lưu được record mới vào Model
 > Tạo một bài Post mới và lưu vào Model
 ```ruby
 post = Post.new
=> #<Post id: nil, title: nil, content: nil, created_at: nil, updated_at: nil>
post.title = "New post"
post.content = "This is a new post created by .new method"
post.save
 ```
 Nếu sử dụng phương thức ***.create*** thì ta không cần kết hợp với lệnh ***.save***. Phương thức này tự động lưu vào Model khi tạo mới thành công
 
 ### 19. Cập nhật bản ghi hiện có với ***.update***
> Giả sử ta có bản ghi đầu tiên trong model Post như sau
 ```ruby
 post = Post.first
 => #<Post id: 1, title: "First Post, content: "This is first post", created_at: "2019-01-09 06:40:36", updated_at: "2019-01-09 06:40:36">
 ```
 
> Bây giờ, ta sẽ update trường title thành "One Post" và trường content của bản ghi này thành "This is post before second post"
```ruby
post = Post.first
post.update(title: "One Post", content: "This is post before second post")
```
Sau câu lệnh này, 2 trường title và content của Post đầu tiên sẽ được thay đổi như giá trị các bạn thiết lập. Đồn thời, trường ***.updated_at*** cũng sẽ thay đổi thành thời điểm bạn update giá trị của bản ghi này

Ngoài ra, ta cũng có thể làm như sau
```ruby
post = Post.first
post.title = "One Post"
post.content = "This is post before second post"
post.save
```
Như vậy, cách làm này kết hợp thêm phương thức ***.save*** để update cho bản ghi. Ta thấy nó cũng khá dài dòng, do đó, mình vẫn khuyến khích các bạn sử dụng phương thức ***.update***

### 20. Cập nhật toàn bộ bản ghi với ***.update_all***
Khi bạn muốn update một hay nhiều trường của tất cả các bản ghi hiện có với cùng một giá trị, thay vì phải dùng vòng duyệt qua từng phần tử rồi ***.update***, thì ta có thể dùng phương thức ***.update_all*** để thực hiện nhanh hơn, ngắn gọn hơn

> Cập nhật trường content của toàn bộ bản ghi trong model Post thành "All Post has same content"
```ruby
Post.update_all(content: "All Post has same content")
# UPDATE "posts" SET "content" = 'All Post has same content' 
```

### 21. Xóa một bản ghi nào đó với ***.delete***
Ở [phần 1](https://viblo.asia/p/activerecord-query-interface-trong-ruby-on-rails-phan-1-eW65GeRLZDO) của chuỗi bài viết về ActiveRecord, ta đã biết cách xóa toàn bộ record trong Model với phương thức ***.delete_all***. Vậy nếu muốn xóa một hay một vài bản ghi nào đó thì ta phải làm thể nào? Câu trả lời chính là phương thức ***.delete*** cho một bản ghi, và ***.delete_all*** với nhiều bản ghi. 

> Xóa User có email là "delete_user@gmail.com"
```ruby
u = User.find_by(email: "delete_user@gmail")
u.delete
# hoặc ta có thể gộp như sau
User.find_by(email: "delete_user@gmail").delete
```

Ta sẽ sử dụng ***.delete_all*** trong một ví dụ sau đây khi muốn xóa ***một số*** bản ghi nhất định
> Xóa tất cả các bài Post có content là "All post has this content will be deleted"
```ruby
User.where(content: "All post has this content will be deleted").delete_all
```

Trong trường hợp này, ta không thể dùng ***.find_by*** để tìm kiếm các bản ghi và xóa. Vì ***.find_by*** chỉ trả về record đầu tiên khớp với dữ liệu tìm kiếm. Điều này mình đã nói ở [phần 1](https://viblo.asia/p/activerecord-query-interface-trong-ruby-on-rails-phan-1-eW65GeRLZDO) của chuỗi bài viết về ActiveRecord   

Ngoài ra, bạn cũng có thể kết hợp phương thức ***.delete*** với các phương thức như ***.where*** hay ***.find*** để xóa một hay nhiều bản ghi nào đó. Những phần này bạn hãy tự trải nghiệm nhé!!! :)

### 22. Nối các bảng với ***.join***
> Liệt kê các User đã có bài Post cho mình
```ruby
User.joins(:posts)
# "SELECT "users".* FROM "users" INNER JOIN "posts" ON "posts"."user_id" = "users"."id""
```

> Liệt kê các User đã có bài Post với title là "Hello world"
```ruby
User.joins(:posts).where(posts: { title: "Hello world" })
```

Như vậy, qua 3 phần về ActiveRecord, mình đã giới thiệu với các bạn 22 phương thức thường sử dụng. Nếu có bất kỳ thắc mắc gì, hãy comment nhé!!!

Hẹn gặp lại các bạn trong các bài viết tiếp theo trong [Chuỗi series về Lập trình Ruby căn bản](https://viblo.asia/s/lap-trinh-voi-ruby-on-rails-co-ban-ror-bq5QL7nXlD8). Các bạn có thể Clip chuỗi series này hoặc follow mình để nhận bài viết mới nhé!!!

Thanks for reading!!!! :)