# Introduction
Trước đây (hiện tại vẫn còn), khi lưu trữ các tệp tĩnh trong Rails chúng ta sẽ nghĩ ngay đến gem CarrierWave, Paperclip thì từ Rails 5.2, Active Storage được tích hợp vào để thay thế các gem này. 
# Setup
Đầu tiên, chúng ta cần cài đặt Active Storage vào project.
``` ruby
rails active_storage:install
rails db:migrate
```
Nó sẽ tạo cho chúng ta 2 bảng là active_storage_blobs và active_storage_attachments. active_storage_blobs là nơi chứa những thông tin về files như metadata, filename, checksum, v.v.... Bảng tiếp theo là active_storage_attachments chứa name và record của các file đính kèm, và nó cũng là polimophic association.  
Bạn sẽ tìm thấy các cài đặt trong file `config/storage.yml`
```ruby
test:
 service: Disk
 root: <%= Rails.root.join("tmp/storage") %>

local:
 service: Disk
 root: <%= Rails.root.join("storage") %>
```
Các tập tin thực tế sẽ được lưu trử trên dịch vụ lưu trữ của bạn hoặc ổ cứng tình thuộc vào chúng ta setting thế nào. 
# Model Generation and Configuration
Để cho nhanh thì mình sẽ generate scaffold 1 cái blog:
```ruby
rails generate scaffold Post title body:text posted_at:datetime
rails db:migrate
```
Lệnh này sẽ tạo ra Model, Controller actions, views, tests, ... cho Post, Một post sẽ có title, body, và posted date.
Giờ ta thêm relationships cho Post:
```ruby
# app/models/post.rb

class Post < ApplicationRecord
  attr_accessor :remove_main_image

  has_rich_text :content
  has_one_attached :main_image
  has_many_attached :other_images
end
```
Mình dùng `attr_accessor :remove_main_image` để xóa main image từ post mà không cần lưu thuộc tính đó vào cơ sở dữ liệu.

`main_image` và `other_images` đến từ Active Storage và liên kết trực tiếp cơ chế lưu trữ tệp.

# Views and Controllers

Trong file `app/views/posts/_form.html.erb` ta thêm image vào: 
```ruby
<div class="field">
  <%= form.label :main_image %>
  <%= form.file_field :main_image %>
</div>

<div class="field">
  <%= form.label :other_images %>
  <%= form.file_field :other_images, multiple: true %>
</div>
```
`multiple: true` cho phép chúng ta upload nhiều file 
Sau đó thêm params vào controller:
```ruby
def post_params
  params.require(:post).permit(:title, :body, :posted_at, :content, :remove_main_image, :main_image, other_images: [])
end
```
Test thử phát:
```ruby
ActiveStorage::Blob Create (4.3ms)  INSERT INTO "active_storage_blobs" ("key", "filename", "content_type", "metadata", "byte_size", "checksum", "created_at") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "id"  [["key", "6DnDrfSK5uyaoNeP9FmCoHng"], ["filename", "IMG_20190227_105022.jpg"], ["content_type", "image/jpeg"], ["metadata", "{\"identified\":true}"], ["byte_size", 240301], ["checksum", "BL64P3lrskB+Fw68Yim94g=="], ["created_at", "2019-03-01 20:57:14.212316"]]

...

ActiveStorage::Attachment Create (1.5ms)  INSERT INTO "active_storage_attachments" ("name", "record_type", "record_id", "blob_id", "created_at") VALUES ($1, $2, $3, $4, $5) RETURNING "id"  [["name", "main_image"], ["record_type", "Post"], ["record_id", 1], ["blob_id", 1], ["created_at", "2019-03-01 20:57:14.250964"]]

...

Post Update (0.5ms)  UPDATE "post" SET "updated_at" = $1 WHERE "post"."id" = $2  [["updated_at", "2019-03-01 20:57:14.253611"], ["id", 1]]
```
Như chúng ta thấy, nó chèn dữ liệu blob, sau đó là tệp đính kèm và cuối cùng cập nhật mô hình Post.

Giờ ta sửa file `app/views/posts/show.html.erb` để xem kết quả:
```ruby
# app/views/posts/show.html.erb
# main_image
<% if @post.main_image.attached? %>
 <%= image_tag @post.main_image %>
<% end %>

# other_images
<% @post.other_images.each do |other| %>
  <%= image_tag other %>
<% end %>
```

# SQL Optimization
Bây giờ khi load bài viết sẽ sinh ra N+1 query do load ảnh, để tránh việc này, ta update method `set_post` trong controller:
```ruby
# app/controllers/posts_controller.rb

def set_post
  @post = Post.with_attached_other_images.find(params[:id])
end
```
`with_attached_other_images` là method được viết tắt của một cái gì đó tương tự như: 
```ruby
Post.includes("#{self.other_images}"_attachment: :blob)
```

**Cảm ơn các bạn đã đọc :D**