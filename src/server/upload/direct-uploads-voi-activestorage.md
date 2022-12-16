# Active Storage là gì?
Active Storage là tình năng mới được giới thiệu từ Rails 5.2. Nó được dùng để upload các loại files lên các cloud storage như Amazon S3, Google Cloud Storage, Microsoft Azure Storage, ... hoặc lưu trữ trong máy local. Nó sẽ dùng để thay thế cho các gem upload file khác như carrierwave, paperclip, ...

# Sử dụng Active Storage thế nào? 
Active Storage sử dụng 2 tables trong database: `active_storage_blobs` và `active_storage_attachments`. 
Run `rails active_storage:install` để tạo migration để tạo 2 tables trên. 

```ruby
rails active_storage:install
rails db:migrate
```

Vào config trong file: config/storage.yml để config nơi lưu trữ
```ruby
local:
  service: Disk
  root: <%= Rails.root.join("storage") %>
 
test:
  service: Disk
  root: <%= Rails.root.join("tmp/storage") %>
 
amazon:
  service: S3
  access_key_id: ""
  secret_access_key: ""
```
Sau đó thay đổi trong từng environment file theo nhu cầu lưu trữ của bạn.

```ruby
# Store files locally.
# config/environments/development.rb
config.active_storage.service = :local
```

```
# Store files on Amazon S3.
config/environments/production.rb
config.active_storage.service = :amazon
```
Chú ý: khi bạn lưu trữ với amazon, bạn phải thêm 
```ruby
gem "aws-sdk-s3", require: false
```

để cho active storage có thao tác với amazon s3. tương tự với các cloud storage khác, cũng cần sử dụng gem cụ thể của nó, xem thêm: http://guides.rubyonrails.org/active_storage_overview.html#amazon-s3-service

Đến đây là config cho Active Storage đã hoàn thành. Bây giờ mình sẽ tiếp tục vào demo. Demo này là user có thể tạo bài post với nhiều images.

### Tạo model Post
```ruby
rails generate model post
```
```ruby
# db/migration/20180717061744_create_posts.rb
class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :name
      t.text :content
      t.timestamps
    end
  end
end
```

```ruby
# app/models/post.rb
class Post < ApplicationRecord
  has_many_attached :images # method của active storage: 1 post có nhiều images
end
```

### Tạo controller cho Post

```ruby
class PostsController < ApplicationController
  def new
    @post = Post.new
  end

  def create
    post = Post.create post_params
    redirect_to post
  end

  def show
    @post = Post.find params[:id]
  end

  private
    def post_params
      params.require(:post).permit(:name, :content, images: [])
    end
end
```

### Tạo view cho post

```ruby
# app/views/posts/new.html.erb
<%= form_for @post do |f| %>
  <div><%= f.text_field :name %></div>
  <div><%= f.text_area :content %></div>
  <div><%= f.file_field :images, multiple: true %></div>
  <div><%= f.submit "Save" %></div>
<% end %>
```

```ruby
# app/views/posts/show.html.erb
<h1>Post</h1>
<ul>
  <li>Name: <%= @post.name %></li>
  <li>Content: <%= @post.content %></li>
  <li>
    <% @post.images.each do |image| %>
      <div><%= link_to image.filename, image %></div>
    <% end %>
  </li>
</ul>
```

rails server, bạn sẽ có thể tạo bài post với nhiều images. 

# Direct Uploads
Tính năng Direct Uploads này cho phép bạn dùng javascript library có sẵn trong active storage để upload trực tiếp từ client lên cloud. Bạn có thể dùng các event của nó để tạo thành progress bar, hoặc percentage khi đang upload để cho người dùng biết trạng thái của upload.

```js
// application.js
//= require activestorage
```
trong file_field bạn phải thêm attr: `direct_upload: true`

```ruby
# app/views/posts/new.html.erb
<%= form_for @post do |f| %>
  ...
  <div><%= f.file_field :images, multiple: true, direct_upload: true %></div>
  ...
<% end %>
```

### Thêm javascript: 
```js
// direct_uploads.js
addEventListener("direct-upload:initialize", event => {
  const { target, detail } = event
  const { id, file } = detail
  target.insertAdjacentHTML("beforebegin", `
    <div id="direct-upload-${id}" class="direct-upload direct-upload--pending">
      <div id="direct-upload-progress-${id}" class="direct-upload__progress" style="width: 0%"></div>
      <span class="direct-upload__filename">${file.name}</span>
    </div>
  `)
})
 
addEventListener("direct-upload:start", event => {
  const { id } = event.detail
  const element = document.getElementById(`direct-upload-${id}`)
  element.classList.remove("direct-upload--pending")
})
 
addEventListener("direct-upload:progress", event => {
  const { id, progress } = event.detail
  const progressElement = document.getElementById(`direct-upload-progress-${id}`)
  progressElement.style.width = `${progress}%`
})
 
addEventListener("direct-upload:error", event => {
  event.preventDefault()
  const { id, error } = event.detail
  const element = document.getElementById(`direct-upload-${id}`)
  element.classList.add("direct-upload--error")
  element.setAttribute("title", error)
})
 
addEventListener("direct-upload:end", event => {
  const { id } = event.detail
  const element = document.getElementById(`direct-upload-${id}`)
  element.classList.add("direct-upload--complete")
})
```

### Thêm css:
```css
/* direct_uploads.css */
 
.direct-upload {
  display: inline-block;
  position: relative;
  padding: 2px 4px;
  margin: 0 3px 3px 0;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  font-size: 11px;
  line-height: 13px;
}
 
.direct-upload--pending {
  opacity: 0.6;
}
 
.direct-upload__progress {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  opacity: 0.2;
  background: #0076ff;
  transition: width 120ms ease-out, opacity 60ms 60ms ease-in;
  transform: translate3d(0, 0, 0);
}
 
.direct-upload--complete .direct-upload__progress {
  opacity: 0.4;
}
 
.direct-upload--error {
  border-color: red;
}
 
input[type=file][data-direct-upload-url][disabled] {
  display: none;
}
```
Để tìm hiểu thêm về các event của javascript này bạn có xem tại: http://guides.rubyonrails.org/active_storage_overview.html#direct-upload-javascript-events

Đã done. Bạn refresh lại browser và upload lại nhé. :)
Active storage còn có support việc xử lý ảnh với MiniMagic, và nhiều tình năng hay nhiều nữa. 
Chi tiết thêm bạn hãy tham khảo link dưới này.

# References
http://guides.rubyonrails.org/active_storage_overview.html

https://gorails.com/episodes/direct-uploads-with-rails-active-storage?autoplay=1