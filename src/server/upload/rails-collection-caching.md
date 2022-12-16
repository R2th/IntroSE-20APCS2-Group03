Sử dụng fragment caching trong Rails,nó giúp cải thiện đáng kể hiệu suất của views bằng cách lưu vào bộ nhớ đệm các phần nhỏ hơn của chúng. Khi ta sử dụng caching partials, ta có thể tái sử dụng chúng ở nơi khác với thời gian ít hơn.
 
Nó giúp các collections nhỏ hơn, nhưng vấn đề phát sinh nhanh chóng trên các collections lớn hơn. Trong bài viết này, chúng ta sẽ xem xét cách bộ nhớ đệm của Rails hoạt động như thế nào và cách chúng ta có thể sử dụng nó để tăng tốc độ hiển thị của collections lớn.

### 1: Rendering a Collection


Hãy bắt đầu với một controller nhỏ tải 100 bài đăng cuối cùng cho trang chỉ mục của blog của chúng tôi.

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.all.order(:created_at => :desc).limit(100)
  end
end
```
Để hiển thị các bài đăng này trong view, chúng ta sử dụng @posts instance variable.
```ruby

app/views/posts/index.html.erb
<h1>Posts</h1>

<div class="posts">
  <% @posts.each do |post| %>
    <div class="post">
      <h2><%= post.title %></h2>
      <small><%= post.author %></small>

      <div class="body">
        <%= post.body %>
      </div>
    </div>
  <% end %>
</div>
```

Khi render trang này,ta thấy các bài đăng được tải xuống từ cơ sở dữ liệu và được hiển thị ra view. Chỉ với 32 milliseconds để load trang này, cũng khá nhanh.

```
Started GET "/posts"
Processing by PostsController#index as HTML
  Rendering posts/index.html.erb within layouts/application
  Post Load (1.5ms)  SELECT  "posts".* FROM "posts" ORDER BY "posts"."created_at" DESC LIMIT ?  [["LIMIT", 100]]
  ↳ app/views/posts/index.html.erb:4
  Rendered posts/index.html.erb within layouts/application (19.4ms)
Completed 200 OK in 37ms (Views: 32.4ms | ActiveRecord: 2.7ms)
```

### 2: Rendering a Collection with Partials

Tiếp theo, chúng ta muốn sử dụng post trong view khác, vì vậy ta sử dụng render partial

```ruby
 app/views/posts/index.html.erb 
<h1>Posts</h1>

<div class="posts">
  <% @posts.each do |post| %>
    <%= render post %>
  <% end %>
</div>

 app/views/posts/_post.html.erb 
<div class="post">
  <h2><%= post.title %></h2>
  <small><%= post.author %></small>

  <div class="body">
    <%= post.body %>
  </div>
</div>
```

```
Started GET "/posts"
Processing by PostsController#index as HTML
  Rendering posts/index.html.erb within layouts/application
  Post Load (1.2ms)  SELECT  "posts".* FROM "posts" ORDER BY "posts"."created_at" DESC LIMIT ?  [["LIMIT", 100]]
  ↳ app/views/posts/index.html.erb:4
...
  Rendered posts/_post.html.erb (0.1ms)
  Rendered posts/_post.html.erb (0.1ms)
  Rendered posts/index.html.erb within layouts/application (205.4ms)
Completed 200 OK in 217ms (Views: 213.8ms | ActiveRecord: 1.7ms)
```

Để render ra view này mất  213 milliseconds.Bạn có thể thấy rằng thời gian hiển thị đã tăng đáng kể. Điều này là do new file (the partial) cần được tải, biên dịch và hiển thị cho mỗi bài post. Để có thể cải thiện thời gian load nhanh hơn chúng ta có thể sử dụng fragment caching.

### 3: Fragment Caching

Chúng ta sẽ sử dụng trình cache helper trong view bên cạnh việc gọi render. Bằng cách này, ta sẽ cache the rendering of the partial cho mỗi post

```ruby
 app/views/posts/index.html.erb
<h1>Posts</h1>

<div class="posts">
  <% @posts.each do |post| %>
    <%= cache post do %>
      <%= render post %>
    <% end %>
  <% end %>
</div>
```
```
Started GET "/posts"
Processing by PostsController#index as HTML
  Rendering posts/index_with_partial_caching.html.erb within layouts/application
  Post Load (1.4ms)  SELECT  "posts".* FROM "posts" ORDER BY "posts"."created_at" DESC LIMIT ?  [["LIMIT", 100]]
  ↳ app/views/posts/index.html.erb:4
...
Read fragment views/posts/index.1ms)
  Rendered posts/_post.html.erb (0.1ms)
Write fragment views/posts/index.1ms)
Read fragment views/posts/index.5ms)
  Rendered posts/_post.html.erb (0.1ms)
Write fragment views/posts/index.1ms)
  Rendered posts/index.html.erb within layouts/application (274.5ms)
Completed 200 OK in 286ms (Views: 281.4ms | ActiveRecord: 2.4ms)
```

Request đầu tiên sẽ không nhanh hơn nhiều, bởi vì nó vẫn cần phải hiển thị từng phần một trong lần đầu và lưu trữ nó trong kho lưu trữ bộ nhớ cache.
```
Started GET "/posts"
Processing by PostsController#index as HTML
  Rendering posts/index.html.erb within layouts/application
  Post Load (2.2ms)  SELECT  "posts".* FROM "posts" ORDER BY "posts"."created_at" DESC LIMIT ?  [["LIMIT", 100]]
  ↳ app/views/posts/index.html.erb:4
...
Read fragment views/posts/index.1ms)
Read fragment views/posts/index.1ms)
  Rendered posts/index.html.erb within layouts/application (63.8ms)
Completed 200 OK in 78ms (Views: 75.5ms | ActiveRecord: 2.2ms)
```

Trong các request tiếp theo, chúng ta thấy rằng thời gian hiển thị view - từ 286 mili giây xuống còn 78 mili giây. Tuy nhiên, nó vẫn còn chậm hơn rất nhiều so với những gì chúng ta nhận được.



**Lưu ý**: Nếu bạn không nhìn thấy các dòng Read/Write fragment trong log, hãy nhớ bật fragment cache logging trong development environment, được đặt thành false theo mặc định trên Rails 5.1 trở lên:

```
# config/environments/development.rb
config.action_controller.enable_fragment_cache_logging = true
```

### 4: Collection Caching

Trong Rails 5, rất nhiều công việc đã được thực hiện để làm collection caching nhanh hơn. Để tận dụng những cải tiến này, chúng tôi cần thay đổi our view code. Thay vì tự gọi bộ nhớ cache, chúng ta có thể yêu cầu Rails hiển thị toàn bộ collection và lưu vào bộ nhớ cache cùng một lúc.

```ruby
 app/views/posts/index.html.erb 
<h1>Posts</h1>

<div class="posts">
  <%= render partial: :post, collection: @posts, cached: true %>
</div>
```

```
Started GET "/posts"
Processing by PostsController#index as HTML
  Rendering posts/index.html.erb within layouts/application
  Post Load (1.4ms)  SELECT  "posts".* FROM "posts" ORDER BY "posts"."created_at" DESC LIMIT ?  [["LIMIT", 100]]
  ↳ app/views/posts/index.html.erb:4
  Rendered collection of posts/_post.html.erb [0 / 100 cache hits] (28.2ms)
  Rendered posts/index.html.erb within layouts/application (46.6ms)
Completed 200 OK in 64ms (Views: 59.9ms | ActiveRecord: 2.0ms)
```

Trong request đầu tiên, chúng ta có thể thấy sự cải thiện lớn về thời gian load view. Điều này là do Rails partial được sử dụng cho toàn bộ collection, thay vì cho mỗi post riêng biệt.

```
Started GET "/posts"
Processing by PostsController#index as HTML
  Rendering posts/index.html.erb within layouts/application
  Post Load (1.3ms)  SELECT  "posts".* FROM "posts" ORDER BY "posts"."created_at" DESC LIMIT ?  [["LIMIT", 100]]
  ↳ app/views/posts/index.html.erb:4
  Rendered collection of posts/_post.html.erb [100 / 100 cache hits] (19.2ms)
  Rendered posts/index.html.erb within layouts/application (26.5ms)
Completed 200 OK in 37ms (Views: 35.7ms | ActiveRecord: 1.3ms)
```

Trong các request tiếp theo, chúng ta thấy cải thiện hơn nữa - từ 64 mili giây xuống còn khoảng 35 mili giây. Một cải thiện tốc độ lớn cho toàn bộ collection được thực hiện tại đây bằng cách tối ưu hóa Rails cho các collection. Thay vì kiểm tra tính khả dụng của bộ nhớ cache cho từng phần, Rails kiểm tra tất cả các cache keys của collection cùng một lúc, tiết kiệm thời gian truy vấn bộ nhớ cache.

Một lợi ích bổ sung của caching helper này là bản ghi tóm tắt của collection. Trong request đầu tiên, không tìm thấy cache keys nào [0/100 cache hits ], nhưng trong request thứ hai, tất cả chúng đều được tìm thấy [100/100 cache hits].

Sau khi cập nhật một số đối tượng trong cơ sở dữ liệu, chúng ta thậm chí có thể thấy số lượng key đã stale.

`Rendered collection of posts/_post.html.erb [88 / 100 cache hits] (13.4ms)`

Có nhiều cách để cải thiện tốc độ và đạt được với optimized collection rendering và caching. Một sự khác biệt lớn hơn nữa sẽ được thực hiện khi render các collection lớn hơn. Trừ khi bạn cần customized views cho collection của mình. 


-----


Nguồn tham khảo: https://dev.to/appsignal/rails-collection-caching-1oed