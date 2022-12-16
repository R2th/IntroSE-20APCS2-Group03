## Mở đầu
Tản mạn về lịch sử 1 chút..

Có lẽ mọi người đã biết, Rails là 1 frame-work tương đôí mạnh mẽ trong việc phát triển 1 web app và thường được phát triển theo mô hình truyền thống MVC.

Cách hoạt động thường là client gửi request tới server, server xử lý request và response cho client. 

Những gì mà client nhận được thường là nội dung của một trang web hoàn chỉnh với HTML, CSS, JS. 

Nói tóm lại, server gần như làm tất cả mọi thứ, Client chỉ việc nhận kết quả.

Tuy nhiên, càng ngày, người ta càng đặt trải nghiệm ngươì dùng lên hàng đầu dẫn đến SSR trở nên không đáp ứng được do SSR là tập trung xử lý ở server, trong khi trải nghiệm người dùng thì tập trung xử lý ở client.

jquery hay Ajax dần được sử dụng rộng rãi vơí khả năng cho phép load những content DOM cần thiết, còn các thành phần khác của page thì vẫn giữ nguyên như cũ. Nhờ đó tốc độ và trải nghiệm của người dùng được tăng lên đáng kể

Kế tiếp đó là sự bùng nổ của SPA vơí sự tách biệt hoàn toàn giữa FE và BE

Tuy nhiên điểm chung của các giaỉ pháp bên trên vẫn là những đoạn code JS dài lê thê. Và 1 số các hạn chế về SEO, đánh index

Vậy có 1 giải pháp thay thế, chúng ta hoàn toàn có thể làm được những điều tương tự vơí code Rails thuần. Bạn gần như không phải code bất kì dòng JS nào vơí Hotwired :D 
![image.png](https://images.viblo.asia/d06eed57-8987-4984-bd9e-f76aac0718a8.png)

## Hotwired
Hotwire là một cách tiếp cận xây dựng web mà không cần code JavaScript bằng cách gửi HTML trực tiếp thay vì JSON

Điều này làm cho lần load trang luôn nhanh chóng, tăng trải nghiệm cả người dùng lẫn người code =)) 

Trái tim của Hotwire là Turbo. 

Nó là một tập hợp các kỹ thuật bổ sung giúp tăng tốc độ điều hướng các trang, chia các trang phức tạp thành các thành phần và render từng phần thông qua WebSocket ( ActionCable, cchannels, streaming data).

Bạn có thể tìm hiểu thêm về Turbo ở đây https://turbo.hotwired.dev/handbook/drive

Hotwire sử dụng server-side-rendering (SSR). Điều này khiên nó không những duy trì được ưu điểm về mặt tốc độ (giống như SPA làm được) mà còn giúp giải quyết một số vấn đề về SEO, ví dụ như lập chỉ mục (index).

## Áp dụng Hotwired 
Mình sẽ implement thử 1 Rails app sử dụng Hotwired để hiểu rõ hơn cách hoạt động của nó (Ở đây mình dùng Rails 6.1 và ruby 2.7.2)

Ở đây chúng ta sẽ demo vơí 1 app nhỏ bao gồm các Post.  Với môĩ Post thì có thể like/ edit Post đó 

### Tạo project 
```shell
rails new hotwire-test

cd hotwire-test
```

### Setup gem file
Add gem to Gemfile
```ruby
# Use Redis adapter to run Action Cable 
gem 'redis', '~> 4.0'

gem "hotwire-rails", "~> 0.1.0"
```
Sau đó bundle
```markdown
bundle install
rails hotwire:install
```
Config actioncable
```
vim config/cable.yml

development:
  adapter: redis
  url: redis://localhost:6379/1
  ```
  ### Generate Model
  ```markdown
  rails g scaffold posts body:text likes_count:integer
```
### Migrate database
```css
rails db:create db:migrate
```
### Implement logic
routes.rb
```ruby
Rails.application.routes.draw do
  resources :posts do
    resource :like
  end
  root to: "posts#index"
end
```
posts_controller
```ruby
class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.all
    @post = Post.new
  end

def show ; end

  def new
    @post = Post.new
  end

  def edit ; end

  def create
    @post = Post.new(post_params)

    @post.save
  end

  def update
    @post.update(post_params)
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:body, :likes_count, :reposts_count)
    end
end
```
post/index.html.erb
```html
<p id="notice"><%= notice %></p>

<h1>Posts</h1>

<%= turbo_stream_from "posts" %>

<%= turbo_frame_tag "post_form" do %>
    <%= form_with(model: post, id: dom_id(post)) do |form| %>
      <div class="field">
        <%= form.label :body %>
        <%= form.text_area :body %>
      </div>

      <div class="actions">
        <%= form.submit %>
      </div>
    <% end %>
<% end %>

<%= turbo_frame_tag "posts" do %>
    <%= turbo_frame_tag dom_id(post) do %>
      <div class="card card-body">
        <div><%= post.body %></div>

        <div class="mt-2">
          <%= button_to "Likes (#{post.likes_count})", post_like_path(post), method: :post %>

          <%= link_to "Edit", edit_post_path(post) %>
        </div>
      </div>
    <% end %>
<% end %>
```
Ở đây chúng ta sử dụng đến kỹ thuật turbo_frame_tag, khi render HTML sẽ dưới dạng tag `<turbo-frame>`. 

Đây là method của Turbo frame helper, sử dụng tham số id để phân biệt các thành phần DOM nào cần update (trong trường hợp này là "posts")

model/post.rb
```ruby
class Post < ApplicationRecord
  after_create_commit { broadcast_prepend_to "posts" }
  after_update_commit { broadcast_replace_to "posts" }

  validates :body, presence: true
end
```
Việc xử lí broadcast mình có thể xử lí trong controller. Phần này ae có thể tìm hiểu thêm nhé. Ở đây thì mình để trong model luôn

### Kết quả
#### View
  ![](https://images.viblo.asia/5004f6e4-4e46-4bb7-8653-91e1d35369a8.gif)

#### Check Log
```perl
Turbo::StreamsChannel transmitting "<turbo-stream action=\"replace\" target=\"post_9\"><template><turbo-frame id=\"post_9\">\n  <div class=\"card card-body\">\n    <div>Hello W GGGGGGGG OKla</div>\n\n    <div class=\"mt-2\">\n      <form class=\"button_to\" method=\"post\" action=\"/posts/9/like\"><input type=\"submit\" value=\... (via streamed from posts)
```

Work Like a Charm (magic) :D

## Tài liệu tham khảo
https://github.com/hotwired/hotwire-rails

https://gorails.com/series/hotwire-rails