# Mở đầu
Khi lưu trữ các tệp trong Rails, bộ công cụ đầu tiên mà ta tiếp cận là các gem của bên thứ 3 như: CarrierWave hoặc Paperclip (trước khi không dùng nữa để thay thế cho Active Storage). Active Storage được giới thiệu với Rails 5.2.

Active Storage tạo điều kiện tải tệp lên dịch vụ lưu trữ đám mây như Amazon S3, Google Cloud Storage hoặc Microsoft Azure Storage và đính kèm các tệp đó vào các đối tượng Active Record. Nó đi kèm với một dịch vụ local disk-based để phát triển và thử nghiệm, đồng thời hỗ trợ sao chép tệp tới các dịch vụ cấp dưới để sao lưu và di chuyển.

Sử dụng Active Storage, một ứng dụng có thể chuyển đổi các tệp tải lên hình ảnh với ImageMagick, tạo các bản trình bày hình ảnh của các tệp tải lên không phải hình ảnh như PDF và video cũng như trích xuất siêu dữ liệu từ các tệp tùy ý.
# Thực hiện
Vào terminal và tạo một ứng dụng rails mới
> rails new app

Tạo ứng dụng, tạo blog app đơn giản với scaffold command.
> rails g scaffold Post title:string content:text

Sau khi quá trình hoàn thành, chạy migrate 
> rails db:migrate

Sau đó vào tùy chỉnh routes
```ruby
Rails.application.routes.draw do
  resources :posts
  root to: 'posts#index'
end
```

Bây giờ ta sẽ thêm ảnh vào bài đăng của mình.
Đầu tiên ta cần cài đặt active storage vào bài đăng của mình.

> rails active_storage:install

Sau khi chạy lệnh này, Rails sẽ tạo một file migration cho bạn. Khi kiểm tra sẽ thấy tạo 2 bảng khác nhau: active_storage_blobs và active_storage_attachments.

Sau đó ta chạy file migrate

> rails db:migrate

Tiếp theo ta thêm vào model như sau:
```ruby
class Post < ApplicationRecord
  has_one_attached :image
end
```

Một lần nữa, chúng ta sẽ cần thêm image vào controller của mình ở cuối method post_params, thêm image vào các thuộc tính của modle.
```ruby
def post_params
  params.require(:post).permit(:title, :content, :image)
 end
 ```
 
 Trong app/view/posts/_form.html.erb, chúng ta sẽ chỉnh sửa tệp bằng cách thêm input thêm image.
 
 ```ruby
 <div class="field">
  <%= form.label :image %>
  <%= form.file_field :image %>
</div>
```

Bây giờ chúng ta cần tải hình ảnh trong index và show
```ruby
#app/views/posts/index.html.erb

<% if post.image.attached? %>
  <td><%= image_tag post.image %></td>
<% end %>
```

```ruby
#app/views/posts/show.html.erb

<p>
  <% if @post.image.attached? %>
    <%= image_tag @post.image %>
  <% end %>
</p>
```

Bây giờ ta hoàn toàn có thể đăng ảnh kèm trong bài post, tuy nhiên bây giờ chúng ta muốn khi đăng bài post bắt buộc phải có ảnh kèm theo, ta sử dụng gem active_storage_validations. Ta thêm gem "active_storage_validations" vào trong gem file và bundle install.
Sau đó :
 ```ruby
 # app/models/post.rb

validates :image, attached: true, content_type: %i[png jpg jpeg]
 ```   
 
 Với validation trên ta chỉ chấp nhận những ảnh có đuôi png, jpg và jpeg kèm theo đó khi tạo post cần phải có ảnh đính kèm khi tạo post.
 Như vậy là ta có thể đăng post có kèm theo file ảnh.
 
#  Nguồn tham khảo:
https://hackernoon.com/uploading-files-into-ruby-on-rails-activestorage-gv1r3ukr