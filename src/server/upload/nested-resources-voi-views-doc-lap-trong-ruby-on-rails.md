# Giới thiệu 
- Trong [kiến trúc kiểu REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resource chỉ đơn giản là một nguồn thông tin, là tài nguyên bạn muốn lộ ra. Tài nguyên được tham chiếu nhờ một mã định danh toàn cầu, chẳng hạn như [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier).
- Ví dụ: trong PullReview của riêng chúng tôi, code reviews và users là resources với routes và actions liên quan của họ. 
- Khi bạn xử lý cấu trúc thông tin như thành phần, bạn sẽ sử dụng nested resources (tài nguyên lồng nhau). Tham chiếu của tài nguyên nhúng sau đó được xây dựng dựa trên tham chiếu của tài nguyên tổng hợp.
- Ruby on Rails cho phép bạn thiết lập các tài nguyên lồng nhau. Chẳng hạn, trong hướng dẫn ["Getting started"](https://guides.rubyonrails.org/getting_started.html) nơi bạn xây dựng một blog rất đơn giản, **Post** và **Comment** là các nested resources. Thật vậy, không thể xem xét một **Comment** đơn độc mà không có bất kỳ **Post** nào. Một **Comment** thuộc về một **Post**. Các tài nguyên được tham chiếu bởi các URI, việc thiết lập các tài nguyên lồng nhau trong **RoR** được thực hiện thông qua định tuyến như sau:

```
resources :posts do
 resources :comments
end
```

- Nhưng trong ví dụ về hướng dẫn, một **Comment** không có view riêng. Một **Comment** được quản lý thông qua view của **Post**. Nó hoàn toàn phù hợp với một blog, nhưng trong một trường hợp khác, có thể bạn muốn lập trình các tài nguyên lồng nhau với cá views độc lập, tức là mỗi tài nguyên có view riêng của chúng. Đây là mục đích của bài viết này. Tôi bắt đầu từ cùng một ví dụ blog, nhưng lần này tôi sẽ tạo ra cho cả hai mô hình, **Post** và **Comment**.
# Bước đầu tiên: Post model
- Đầu tiên là khởi tạo app blog:

```
rails new blog
cd blog
```

- Tạo Post resources full options: 

```
rails generate scaffold Post name:string title:string content:text
```

- Thêm một số validate cho model (app/models/post.rb):

```
class Post < ActiveRecord::Base
 validates :name, :presence => true
 validates :title, :presence => true, :length => { :minimum => 5 }
end
```

- Cho đến bây giờ, nó hoàn toàn giống với hướng dẫn . Bước tiếp theo sẽ có sự khác biệt.

# Comment model
- Tạo Comment resources:

```
rails generate scaffold Comment commenter:string body:text post:references
```

- Chỉnh sửa file app/models/post.rb để thêm các liên kết với Comment model:

```
class Post < ActiveRecord::Base
  validates :name,  :presence => true
  validates :title, :presence => true, :length => { :minimum => 5 }

  has_many :comments
end
```

- Khởi tạo nested resouces (config/routes.rb):

```
resources :posts do
  resources :comments
end
```

- Thêm một số validate và thiết lập liên kết cho Comment model (app/models/comment.rb):

```
class Comment < ActiveRecord::Base
  validates :commenter, :presence => true
  validates :body, :presence => true

  belongs_to :post
end
```

# Comment controller
- Chỉnh sửa comment controller (app/controllers/comments_controller.rb):

```
class CommentsController < ApplicationController
  # GET /posts/:post_id/comments
  def index
    # Truy vấn Post thông qua params[:post_id]
    post = Post.find(params[:post_id])

    # Lấy tất cả comments của post đó
    @comments = post.comments

    respond_to do |format|
      format.html           # views/comments/index.html.erb

      format.xml  { render :xml => @comments }
    end
  end

  # GET /posts/:post_id/comments/:id
  def show
    # Truy vấn Post thông qua params[:post_id]
    post = Post.find(params[:post_id])

    # Lấy comment cụ thể của post thông qua params[:id]
    @comment = post.comments.find(params[:id])

    respond_to do |format|
      format.html           # views/comments/show.html.erb

      format.xml  { render :xml => @comment }
    end
  end

  # GET /posts/:post_id/comments/new
  def new
    # Truy vấn Post thông qua params[:post_id]
    post = Post.find(params[:post_id])

    # Khởi tạo object comment
    @comment = post.comments.build

    respond_to do |format|
      format.html           # views/comments/new.html.erb

      format.xml  { render :xml => @comment }
    end
  end

  # GET /posts/:post_id/comments/:id/edit
  def edit
    # Truy vấn Post thông qua params[:post_id]
    post = Post.find(params[:post_id])

    # Lấy comment thông qua params[:id]
    @comment = post.comments.find(params[:id])
  end

  # POST /posts/:post_id/comments
  def create
    # Truy vấn Post thông qua params[:post_id]
    post = Post.find(params[:post_id])

    # Tạo comment với params[:comment]
    @comment = post.comments.create(params[:comment])

    respond_to do |format|
      if @comment.save
        format.html { redirect_to([@comment.post, @comment], :notice => 'Comment được tạo thành công') }

        format.xml  { render :xml => @comment, :status => :created, :location => [@comment.post, @comment] }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @comment.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /posts/:post_id/comments/:id
  def update
    # Truy vấn Post thông qua params[:post_id]
    post = Post.find(params[:post_id])

    # Lấy comment thông qua params[:id]
    @comment = post.comments.find(params[:id])

    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        format.html { redirect_to([@comment.post, @comment], :notice => 'Comment đã được chỉnh sửa') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @comment.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/:post_id/comments/1
  def destroy
    # Truy vấn Post thông qua params[:post_id]
    post = Post.find(params[:post_id])

    # Lấy comment thông qua params[:id]
    @comment = post.comments.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to(post_comments_url) }
      format.xml  { head :ok }
    end
  end
end
```

- Có những thay đổi quan trọng sau:

```
# Lấy một comment cụ thể với params[:id]
post = Post.find(params[:post_id])
@comment = post.comments.find(params[:id])
```

```
# Lấy tất cả comments
post = Post.find(params[:post_id])
@comments = post.comments
```

```
# Khởi tạo object comment
post = Post.find(params[:post_id])
@comment = post.comments.build
```

```
# Tạo comment với params[:comment] (comment attribute của Comment model)
post = Post.find(params[:post_id])
@comment = post.comments.create(params[:comment])
```

```
# Trả về view html với notice Tạo comment thành công 
redirect_to([@comment.post, @comment], :notice => 'Comment được tạo thành công')
```

```
# Trả về view list comments
redirect_to(post_comments_url)
```

# Comment views
- Chỉnh sửa views app/views/comments/:
## 1. _form.html.erb (Bỏ :post):

```
<%= form_for([@comment.post, @comment]) do |f| %>
  <% if @comment.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@comment.errors.count, "error") %> prohibited this comment from being saved:</h2>

      <ul>
      <% @comment.errors.full_messages.each do |msg| %>
        <li><%= msg %></li>
      <% end %>
      </ul>
    </div>
  <% end %>

  <div class="field">
    <%= f.label :commenter %><br />
    <%= f.text_field :commenter %>
  </div>
  <div class="field">
    <%= f.label :body %><br />
    <%= f.text_area :body %>
  </div>
  <div class="actions">
    <%= f.submit %>
  </div>
<% end %>
```

## 2. edit.html.erb (Update link)

```
<h1>Editing comment</h1>

<%= render 'form' %>

<!-- /posts/:post_id/comments/:id -->
<%= link_to 'Show', [@comment.post, @comment] %> |
<!-- /posts/:post_id/comments/ -->
<%= link_to 'Back', post_comments_path(@comment.post) %>
```

## 3. index.html.erb (Bỏ :post và update link)

```
<h1>Listing comments</h1>

<table>
  <tr>
    <th>Commenter</th>
    <th>Body</th>
    <th>Post</th>
    <th></th>
    <th></th>
    <th></th>
  </tr>

<% @comments.each do |comment| %>
  <tr>
    <td><%= comment.commenter %></td>
    <td><%= comment.body %></td>

    <!-- /posts/:post_id/comments/:id -->
    <td><%= link_to 'Show', [comment.post, comment] %></td>
    <!-- /posts/:post_id/comments/:id/edit -->
    <td><%= link_to 'Edit', edit_post_comment_path(comment.post, comment)%></td>
    <!-- /posts/:post_id/comments/:id -->
    <td><%= link_to 'Destroy', [comment.post, comment], :confirm => 'Bạn có chắc không?', :method => :delete %></td>
  </tr>
<% end %>
</table>

<br />

<%= link_to 'Thêm comment mới', new_post_comment_path %> <!-- /posts/:post_id/comments/new -->
```

## 4. new.html.erb (Update link)

```
<h1>New comment</h1>

<%= render 'form' %>

<!-- /posts/:post_id/comments/ -->
<%= link_to 'Back', post_comments_path(@comment.post)%>
```

## 5. show.html.erb (Bỏ :post và update link)

```
<p id="notice"><%= notice %></p>

<p>
  <b>Commenter:</b>
  <%= @comment.commenter %>
</p>

<p>
  <b>Body:</b>
  <%= @comment.body %>
</p>

<!-- /posts/:post_id/comments/:id/edit -->
<%= link_to 'Edit', edit_post_comment_path(@comment.post, @comment) %> |
<!-- /posts/:post_id/comments/ -->
<%= link_to 'Back', post_comments_path(@comment.post) %>
```

- Và cuối cùng, thêm một liên kết đến phần hiển thị của Post (app/views/posts/show.html.erb):

```
<p id="notice"><%= notice %></p>

<p>
  <b>Name:</b>
  <%= @post.name %>
</p>

<p>
  <b>Title:</b>
  <%= @post.title %>
</p>

<p>
  <b>Content:</b>
  <%= @post.content %>
</p>

<!-- /posts/:post_id/comments/ -->
<%= link_to 'Comments', post_comments_path(@post) %> |
<%= link_to 'Edit', edit_post_path(@post) %> |
<%= link_to 'Back', posts_path %>
```

# Cuối cùng
- Kiểm tra các định tuyến:

```
rake routes

post_comments     GET    /posts/:post_id/comments(.:format)          {:controller=>"comments", :action=>"index"}
                  POST   /posts/:post_id/comments(.:format)          {:controller=>"comments", :action=>"create"}
new_post_comment  GET    /posts/:post_id/comments/new(.:format)      {:controller=>"comments", :action=>"new"}
edit_post_comment GET    /posts/:post_id/comments/:id/edit(.:format) {:controller=>"comments", :action=>"edit"}
post_comment      GET    /posts/:post_id/comments/:id(.:format)      {:controller=>"comments", :action=>"show"}
                  PUT    /posts/:post_id/comments/:id(.:format)      {:controller=>"comments", :action=>"update"}
                  DELETE /posts/:post_id/comments/:id(.:format)      {:controller=>"comments", :action=>"destroy"}
posts             GET    /posts(.:format)                            {:controller=>"posts", :action=>"index"}
                  POST   /posts(.:format)                            {:controller=>"posts", :action=>"create"}
new_post          GET    /posts/new(.:format)                        {:controller=>"posts", :action=>"new"}
edit_post         GET    /posts/:id/edit(.:format)                   {:controller=>"posts", :action=>"edit"}
post              GET    /posts/:id(.:format)                        {:controller=>"posts", :action=>"show"}
                  PUT    /posts/:id(.:format)                        {:controller=>"posts", :action=>"update"}
                  DELETE /posts/:id(.:format)                        {:controller=>"posts", :action=>"destroy"}
```

- Tạo và migrate database:

```
rake db:create
rake db:migrate
```

- Chạy trên local và test kết quả:

```
rails s
```

- Trên đây là bài viết về nested resources được sử dụng nhiều trong Ruby on Rails. Chúc các bạn thành công!
- Link bài viết gốc: [Nested resources with independent views in Ruby on Rails](http://blog.8thcolor.com/en/2011/08/nested-resources-with-independent-views-in-ruby-on-rails/) của tác giả **Christophe**