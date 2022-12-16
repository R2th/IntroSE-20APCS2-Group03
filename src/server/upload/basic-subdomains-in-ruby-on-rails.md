Subdomains(Tên miền phụ), chắc hẳn cụm từ này đã quá quen thuộc với bất cứ ai am hiểu công nghệ hiện nay. Tiên miền phụ khá hữu ích cho người dùng ở một số trường hợp khác nhau. Ví dụ, bạn xây dựng một dứng dụng blog đa người dùng. Mỗi người dùng nhận được blog của riêng họ. Việc có thể cung cấp cho mỗi người một tên miền phụ duy nhất cho phép bạn cung cấp người dùng không gian cá nhân của riêng họ. 

Tuy vậy, đối với một số lập trình viên mới vào nghề cụm từ này còn khá mới mẻ, Trong bài viết này mình sẽ xây dưng một ứng dụng blog đơn giản có chứa tính năng này. 

# Rails Application Setup
Đầu tiên, chung ta cần chuẩn bị một số model để phục vụ mục đích lưu trữ dữ liệu cho `subdomains` như sau: 
- Blog: Mỗi một blog chứa nhiều bài đăng, đại diện cho 1 blog cụ thể và chứa thông tin miền phụ tương ứng
- Post: Chứa thông tin của một bài đăng cụ thể như tên, tiêu đề . . 

Các lệnh chạy như sau:
```Ruby
rails g model Blog name subdomain
# Tạo ra model Blog gồm hai trường name và subdomain
rails g model Post title body:text blog:references
# Tạo ra model Post thuộc về một Blog, có hai trường title và body
rake db:migrate
# Lệnh thực thi của rails
```

Tiếp theo, chúng ta khởi tạo controller cho model tương ứng sẽ có `blogs` và `posts` controller.
Chạy các lệnh như sau: 
```Ruby
rails g controller blogs index show
# Tạo ra controller blogs
rails g controller posts show
# Tạo ra controller posts
```

Ok rồi, tới đây là phần quan trong nhất, thay đổi cài đặt routes để ứng dụng có thể hứng được request từ tên miền phụ và hiểu được chúng. 

Cơ bản sẽ có sự thay đổi dưới đây:
```Ruby
SubdomainsExample::Application.routes.draw do
  resources :posts
  resources :blogs

  match '/', to: 'blogs#index', constraints: { subdomain: 'www' }, via: [:get, :post, :put, :patch, :delete]
  match '/', to: 'blogs#show', constraints: { subdomain: /.+/ }, via: [:get, :post, :put, :patch, :delete]

  root to: "blogs#index"
end
```

Trong đó:
- Hai dòng đầu là khai báo đường routes của hai controller `posts` và `blogs` ở tiên miền chính
- Hai dòng sau định nghĩa việc chấp nhận tên miền phụ đi kèm với định dạng http://www.yourdomain.com 

Tiếp theo chúng ta cần một số ít code trong `applications` controller để lấy được blog tương ứng khi request tên miền phụ. 

```Ruby
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_filter :get_blog

private
  def get_blog

    blogs = Blog.where(subdomain: request.subdomain)

    if blogs.count > 0
      @blog = blogs.first
    elsif request.subdomain != 'www'
      redirect_to root_url(subdomain: 'www')
    end
  end
end
```
Nhìn đoạn code trên chắc hẳn chúng ta đã đoán ra được ý đồ.
- Trước khi request được server xử lý sẽ được phân loại riêng của tên miền phụ nào tương ứng.
- Nếu không tìm được tên miền phụ tương ứng sẽ điều hướng tới trang chủ

Tiếp theo, chúng ta cần một số khai báo cơ bản trong `BlogsController`, đây là xử lý riêng cho từng blog nếu đã được chấp nhận từ phía server. 
```Ruby
class BlogsController < ApplicationController
  def index
    @blogs = Blog.all
  end
  # Lấy toàn bộ blogs có trong hệ thống

  def show
    @posts = @blog.posts
  end
  # Lấy toàn bộ bài viết của một blog cụ thể
end
```

Tương tự như `BlogsController` chúng ta cũng cần khai báo một chút code cho `PostsController`
```Ruby
class PostsController < ApplicationController
  def show
    @post = @blog.posts.find(params[:id])
    # Lấy thông tin của bài post được chỉ định từ view
  end
end
```

Tiếp theo, chúng ta cần một số code cho phần view blogs, code phần view khá dễ hiểu nên mình không giải thích gì thêm.
**app/views/layouts/application.html.erb:**
```Ruby
<!DOCTYPE html>
<html>
<head>
  <title>SubdomainsExample</title>
  <%= stylesheet_link_tag    "application", media: "all", "data-turbolinks-track" => true %>
  <%= javascript_include_tag "application", "data-turbolinks-track" => true %>
  <%= stylesheet_link_tag "http://yandex.st/bootstrap/3.0.2/css/bootstrap.min.css", media: "all" %>
  <%= javascript_include_tag "http://yandex.st/bootstrap/3.0.2/js/bootstrap.min.js" %>
  <%= csrf_meta_tags %>
</head>
<body>
<div class="container">
<%= yield %>
</div>
</body>
</html>
```

**app/views/blogs/index.html.erb:**

```Ruby
<h1>Blogs on this Server</h1>

<ul>
  <% @blogs.each do |blog| %>
    <li><%= link_to blog.name, root_url(subdomain: blog.subdomain) %></li>
  <% end %>
</ul>
```

**app/views/blogs/show.html.erb:**

```Ruby
<h1><%= @blog.name %></h1>
<hr />
<% @posts.each do |post| %>

<h3><%= post.title %></h3>
<p><%= truncate post.body, length: 160 %></p>
<%= link_to "Read More", post %>
<% end %>
```

**app/views/posts/show.html.erb:**

```Ruby
<h1><%= @post.title %></h1>
<p>
  <%= @post.body %>
</p>
```

Cuối cùng để có thể test được ứng dụng chúng ta cần tạo ra một số data demo.
**db/seeds.rb:**
```Ruby
Blog.delete_all
Blog.create(id: 1, name: "My Example Blog", subdomain: "example")
Blog.create(id: 2, name: "Awesome Blog", subdomain: "awesome")


Post.delete_all
Post.create(id: 1, blog_id: 1, title: "An Example of a Post", body: "This is a perfect example of a blog post.  Feel free to reference this example in your other applications.  Note that the author of this blog post does not accept responsibility for the contents of this blog post.")
Post.create(id: 2, blog_id: 1, title: "Another Example of a Post", body: "This is yet another example of a blog post.  This one is less perfect than the first one.")
Post.create(id: 3, blog_id: 2, title: "An Utterly Awesome Post", body: "This is a super awesome example of a really good blog post.  You should...like...totally copy this!")
Post.create(id: 4, blog_id: 2, title: "Yet Another Utterly Post", body: "This is yet ANOTHER example of a super awesome blog post.  You should totally copy this one as well!")
```

Chạy lệnh sau để tạo dữ liệu: 
```Ruby
rake db:seed
```

Ok, mọi thứ đã xong chúng ta cùng thử thành quả xem sao. 
Kết quả của trang chủ blog:

![](https://images.viblo.asia/c669a37b-b07c-4713-9886-a396bd2038c9.png)

Chúng ta có thể thấy trên trang chủ hiện có hai blogs cá nhân được khởi tạo ở tên miền chính.
Bây giờ chúng ta xem chi tiết một blogs cá nhân xem sao. 

![](https://images.viblo.asia/fbaeea8d-379d-4251-a9b3-01c10a6ce132.png)

Các bạn để ý nhé, tên miền phụ đã được thay đổi, trên trang này hoàn toàn là không gian riêng của blog cá nhân. 

Mình tạm dừng ở đây nhé, các bạn thấy thật đơn giản phải không? Hy vọng bài viết sẽ giúp ích phần nào các bạn. 

*Thanks for reading !!!*