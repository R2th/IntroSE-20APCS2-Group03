# Mở đầu
`rails` là một web framework phổ biến, dựa trên nền ngôn ngữ `ruby`  giúp việc phát triển web trở nên đơn giản và dễ dàng.

`rails` được xây dựng dựa trên nguyên tắc [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
, hiểu đơn giản rằng mọi thứ sẽ hoạt động `auto-magically` mà không cần nhiều code nếu ta tuân theo những convention chuẩn của `rails` (như naming, code structure, ...)

Bởi vì `rails magic` mà mọi thứ được làm một cách tự động  và được che dấu (`magic`?), đôi khi sẽ có những lỗi phát sinh mà ta không thể hiểu rõ nếu không biết rõ cách `rails magic` hoạt động. `rails` dễ sử dụng, nhưng đồng thời cũng dễ dàng sử dụng sai chúng.

Dưới đây ta sẽ tìm hiểu những sai lầm hay mắc phải khi làm việc với `rails` 

:eyes:
---
# Đưa quá nhiều logic vào trong controller
Ta có thể đưa các view logic, model logic trong controller, khi đó sẽ vi phạm nguyên tắc [single responsibility](https://www.oodesign.com/single-responsibility-principle.html)
, khi mà nó có thể dẫn tới code khó hiểu và dễ phát sinh lỗi.

Chỉ nên đưa những logic sau:
1. Session and cookie handling: bao gồm các logic xử lý đăng nhập/đăng ký, phân quyền hay làm việc với cookie
2. Request parameter management: lấy request params
3. Model selection: tìm model object ứng với request params nhận được
4. Rendering/redirecting. Render/redirect kết quả (html, xml, json, etc.) phù hợp
---
# Đưa quá nhiều logic vào trong view
Trong `rails` sử dụng erb template để tạo các file html  view với `ruby` code embed. 

Nếu sử dụng không cẩn thận có thể dẫn đến những file khó để quản lý và bảo trì. Cũng có thể dẫn đến vi phạm quy tắc [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
(Don't repeat yourself) với quá nhiều phần bị lặp lại

Lấy ví dụ, giả sử ta có method `current_user` trả về user hiện tại, logic của view file có thể sẽ như sau:
```ruby
<h3>
  Welcome,
  <% if current_user %>
    <%= current_user.name %>
  <% else %>
    Guest
  <% end %>
</h3>
```
Một cách để handle là để method `current_user` luôn trả về 1 object khác nil:
```ruby
def current_user
  @current_user ||= User.find session[:user_id] if session[:user_id]
  if @current_user
    @current_user
  else
    OpenStruct.new(name: 'Guest')
  end
end
```
Do đó ta có thể thay đổi logic view:
```ruby
<h3>Welcome, <%= current_user.name %></h3>
```

Ngoài ra nên sử dụng layout và partial để render những code trùng lặp

---
# Đưa quá nhiều logic trong model
Những chức năng như tạo email thông báo, tương tác với external service, convert data format không phải là việc có thể đưa vào `ActiveRecord` model (nơi chỉ làm những thứ như truy xuất, ghi các bản ghi vào database)

Vậy logic không nên để trong controller, view hay model thì nó nên để ở đâu?

Sử dụng [plain old Ruby object](http://blog.steveklabnik.com/posts/2011-09-06-the-secret-to-rails-oo-design)
(POROs) tạo những class bên ngoài `rails`, ta có thể đưa các chức năng trên vào class này, thay vì đưa chúng trong model

Những login nên đưa vào model:

1.  Configuration: các marco quan hệ, validations
2.  Access wrappers: method che dấu thông tin (ví dụ method `full_name` trả về họ tên đầy đủ từ 2 trường `first_name` và `last_name` trong model)
3.  Sophisticated queries: có thể define class method qua scope (ví dụ scope :active ->{where(active: true)}), không nên sử dụng `where` bên ngoài model

---
# Sử dụng nhiều gem
`rails` được hỗ trợ bởi [rich ecosystem of gems](https://rubygems.org/)
giúp việc xây dựng những hệ thống phức tập một cách nhanh chóng. Tuy nhiên không nên lạm dụng quá nhiều vào nó.

Sử dụng nhiều gem làm tăng kích thước của Rails `process`, làm chậm hiệu suất ứng dụng, tăng chi phí vận hành

Hơn nữa, mỗi gem được đưa vào ứng dụng có thể cần cài đặt thêm những gem khác, ví dụ thêm gem `rails_admin` sẽ phải thêm 11 gem nữa vào ứng dụng.

---
# Bỏ qua log files
Chúng  ta thường không chú ý tới những dòng log trên server. Để ý tới chúng sẽ dễ dàng hơn trong việc debug khi chạy ứng dụng

Lấy vi dụ, ta định nghĩa những quan hệ trong database ở model, những method trong model cần tới những truy vấn tới database. Nếu ta để tới log file thì dễ dàng nhìn ra những dòng truy vấn SQL thường xuyên được thực hiện.

Giả sử ta muốn kiểm tra [N+1](https://www.sitepoint.com/silver-bullet-n1-problem/)
problem, điều này có thể thưc hiện dễ dàng khi check log file

Ví dụ, ta có `Posts` has_many `Comments`, method `comments_for_top_three_posts` đưa ra tất cả comments của 3 posts: 
```ruby
def comments_for_top_three_posts
  posts = Post.limit(3)
  posts.flat_map do |post|
    post.comments.to_a
  end
end
```
Check log file khi có request gọi method này:
```ruby
Processing by PostsController#some_comments as HTML
  Post Load (0.4ms)  SELECT "posts".* FROM "posts" LIMIT 3
  Comment Load (5.6ms)  ELECT "comments".* FROM "comments" WHERE "comments"."post_id" = ?  [["post_id", 1]]
  Comment Load (0.4ms)  SELECT "comments".* FROM "comments" WHERE "comments"."post_id" = ?  [["post_id", 2]]
  Comment Load (1.5ms)  SELECT "comments".* FROM "comments" WHERE "comments"."post_id" = ?  [["post_id", 3]]
  Rendered posts/some_comments.html.erb within layouts/application (12.5ms)
```
Dễ thấy có 4 SQL query được thực hiện ( 1 để lấy 3 posts, 3 còn lại lấy từng comments của từng posts )

[Eager loading](https://guides.rubyonrails.org/active_record_querying.html#eager-loading-associations) 
giúp giảm thiểu số query:
```ruby
def comments_for_top_three_posts
  posts = Post.includes(:comments).limit(3)
  posts.flat_map do |post|
    post.comments.to_a
  end
end
```
Và khi check log file:
```ruby
Processing by PostsController#some_comments as HTML
  Post Load (0.5ms)  SELECT "posts".* FROM "posts" LIMIT 3
  Comment Load (4.4ms)  SELECT "comments".* FROM "comments" WHERE"comments "."post_id" IN (1, 2, 3)
  Rendered posts/some_comments.html.erb within layouts/application (12.2ms)
```
Ở đây chỉ có 2 query được thực hiện (Các bạn có thể tìm hiểu thêm về [Eager loading](https://guides.rubyonrails.org/active_record_querying.html#eager-loading-associations) 
.)

---
Hi vọng với những ví dụ trên có thể giúp các bạn tránh được những sai lầm khi làm việc với `rails`, cảm ơn mọi người đã đọc bài viết của mình :headphones: