# Giới thiệu
Action text là tình năng mới trong Rails 6 được sử dụng để tạo Rich text. Action text này dựa trên Trix editor là WYSIWYG editors chứa đầy đủ chức năng của editor bao gồm text formatting, tạo lists, embedded images, attachments ...

Content tạo ra từ Action text này sẽ được lưu trong RIchText model riêng và các embedded images là tự động lưu sử dụng Active Storage và có quan hệ với RichText model.

# Cài đặt
* Run rails action_text:install để add Yarn package và tạo migration cần thiết.
```
rails action_text:install
```
* Cài đặt Active Storage : dùng cho images và các attachments khác
```
rails active_storage:install
```

* Run migration
```
rails db:migrate
```

* trong application.js, add code dưới:
```js
// application.js

require("trix")
require("@rails/actiontext")
```

trong actiontext.scss, add code dưới :
```scss
@import "trix/dist/trix";
```

* trong application.scss, add code dưới :

```scss
// application.scss

@import "./actiontext.scss";
```

Đến đây là xong bước cài đặt. Tiếp theo sẽ là ví dụ để demo cách sử dụng Action Text
# Ví dụ Demo
Ví dụ này chỉ đơn giản là đăng một bài post (title và content).

* Generate model
```
rails g model Post title:string 
rails db:migrate
```
**Note**: Chúng ta chỉ cần add column title cho Post model thôi, còn column content sẽ handle bởi action text. 

* Modify Post model như sau
```ruby
# app/models/post.rb
class Post < ApplicationRecord
  has_rich_text :content
end
```

* Helper rich_text_area sẽ dùng để render editor. Từ đó sẽ tạo được form như sau:


```ruby
# <% app/views/post/_form.html.erb %>

<div class="col-md-6">
  <%= form_with(model: @post, class: "form form-horizontal") do |form| %>
    <div class="form-group">
      <%= form.label :title %>
      <%= form.text_field :title, class: "form-control" %>
    </div>

    <div class="form-group">
      <%= form.label :body %>
      <%= form.rich_text_area :content %>
    </div>

    <div class="form-group">
      <%= form.submit "Save", class: "btn btn-success" %>
    </div>
  <% end %>
</div>
```

![](https://images.viblo.asia/081fdd94-be93-4b67-9c8c-6ddd70bb1e2a.png)


* Hiện thị rich text đó như sau:
```ruby
<%= @post.content %>
```

* Để lưu rich text content, params sẽ phải permit attribute :content : 

```ruby
class PostsController < ApplicationController
  def create
    post = Post.create! params.require(:post).permit(:title, :content)
    redirect_to post
  end
end
```

Đến đây là chúng ta đã hiểu được về cách sử dụng basic nhất của actiion text rồi. Để tìm hiểu sâu hơn, hãy tìm hiểu links sau:

https://edgeguides.rubyonrails.org/action_text_overview.html

https://gorails.com/episodes/how-to-use-action-text

https://www.freecodecamp.org/news/quick-look-at-action-text-in-rails-6-0-12a8f9f7597f/

https://medium.com/@abhishek.kanojia/action-text-for-rails-6-92a9be7498bd