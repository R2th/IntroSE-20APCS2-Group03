## Giới thiệu
Trong các ứng dụng web hiện nay, hình ảnh là một phần không thể thiếu được. Mối ứng dụng web có nhiều đối tượng cần lưu trữ ảnh, một cách thông thường ta sẽ thêm trường image vào bảng cơ sở dữ liệu của model tương ứng hoặc tạo riêng từng bảng trung gian để liên kết model Image với model đó.
<br>Tuy nhiên, cách làm này làm cho cơ sở dữ liệu thêm rườm rà và gây ra lặp code. Một cách đơn giản để giải quyết vấn đề này, ta áp dụng polymorphic để tạo bảng image dùng chung cho nhiều model khác nhau với chỉ một bảng duy nhất. Mình sẽ giới thiệu với các bạn phương pháp này bằng một ứng dụng demo dưới đây.
<br>Mình sử dụng ứng dụng demo của bài viết [này](https://viblo.asia/p/mot-so-ki-thuat-co-ban-trong-rails-phan-2-V3m5WbE8lO7) của mình để áp dụng kĩ thuật này.
## Upload ảnh áp dụng polymorphic
Đầu tiên, chúng ta tạo uploader bằng lệnh sau:
```ruby
rails g uploader Image
```
Sau khi chạy lệnh trên, nó sẽ tạo ra file  `app/uploaders/image_uploader.rb`
```ruby
class ImageUploader < CarrierWave::Uploader::Base
  storage :file
end
```
Để áp dụng polymorphic, sử dụng một bảng chung để lưu đường dẫn của ảnh, ta tạo model Image với các trường sau:
```ruby
class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.text :image_url
      t.integer :imageable_id
      t.string :imageable_type

      t.timestamps
    end
  end
end
```
Trong file `app/model/image.rb` ta viết nội dung như sau:
```ruby
class Image < ApplicationRecord
  belongs_to :imageable, polymorphic: true
  /*  Mở chế độ polymorphic */
  mount_uploader :image_url, ImageUploader
  /*  Lấy đường dẫn ảnh lưu vào bảng trong cột image_url */
end
``` 
Trong các model cần có trường ảnh, ta áp dụng `nested attribute`: thêm các dòng sau vào model đó.
```ruby
class Post < ApplicationRecord
 ...
  has_one :image, as: :imageable, dependent: :destroy
  accepts_nested_attributes_for :image, reject_if: proc {|attributes|
    attributes['image_url'].blank?}
...
end
```
Trong controller, ta thêm image_attributes vào params để lưu ảnh cùng lúc với lúc tạo một bài Post.
```ruby
class PostsController < ApplicationController
    ...
    def post_params
      params.require(:post).permit :title, :content, image_attributes: [:id,
      :image_url, :imageable_id, :imageable_type, :_destroy]
    end
end
```
Trong form tạo post ta thêm trường ảnh vào như sau:
```ruby
<%= form_for @post do |f| %>
  <div class="form-group">
    <div class="fix-bot-pic upload-pic pic-profile">
      <%= f.fields_for :image_attributes do |image_f| %>
        <%= image_f.file_field :image_url, class: "input-file previewIMG" %>
        <%= image_f.hidden_field :imageable_id, value: @post.id %>
        <%= image_f.hidden_field :imageable_type, value: "image" %>
      <% end %>
      <label tabindex="0" class="input-file-trigger">
        <%= t ".avatar" %> <i class="fa fa-camera"></i>
      </label>
    </div>
    <%= image_tag get_image(@post), class: "image_cm preview-img" %>
  </div>
<% end %>
```
## Lưu trữ ảnh trên Cloud với  gem "cloudinary" và gem "carrierwave"
### Tại sao nên sử dụng phương pháp này?
Khi chúng ta tạo một ứng dụng Web bằng Rails và deploy lên Heroku, có một vấn đề mà chúng ta hay gặp phải đó là làm thế nào để tải ảnh lên Heroku mà khi reload trang không bị mất ảnh. Một giải pháp đó là dùng `gem "cloudinary"`.
<br>Cloudinary cung cấp dịch vụ quản lý ảnh dựa trên cloud một cách toàn diện. Vì vậy bạn có thể upload, lưu trữ, sửa ảnh và đưa nó lên ứng dụng Web của mình một cách dễ dàng.
<br>Cloudinary còn được tích hợp rất tốt với nhiều ngôn ngữ và framework khác nhau, trong đó có Ruby on Rails.
<br>Cloudinary có nhiều gói dịch vụ khác nhau, trong đó gói free cho phép upload khoảng 75000 ảnh.
### Cài đặt
Chúng ta thêm 2 gem vào trong Gemfile, lưu ý cần cài carrierwave trước cloudinary
```ruby
gem "carrierwave"
gem "cloudinary"
```
Chạy `bundle` để cài đặt hai gem này
### Tạo tài khoản và cấu hình Cloudianary 
Đầu tiên bạn cần đăng ký tài khoản và đăng nhập tại [đây](https://cloudinary.com/users/register/free).
<br>Sau khi đăng nhập vào dashboard, bạn hãy download file ` cloudinary.yml` tại [đây](https://cloudinary.com/console/lui/cloudinary.yml) 
<br>Sau đó, bạn copy file này vào trong thư mục config.
<br>File `cloudinary.yml` có dạng như sau:
```bash
development:
  cloud_name: your_name
  api_key: your_api_key
  api_secret: your_api_secret
  enhance_image_tag: true
  static_file_support: false
production:
  cloud_name: your_name
  api_key: your_api_key
  api_secret: your_api_secret
  enhance_image_tag: true
  static_file_support: true
test:
  cloud_name: your_name
  api_key: your_api_key
  api_secret: your_api_secret
  enhance_image_tag: true
  static_file_support: false
```
### Cách sử dụng
#### Thiết đặt môi trường
Trong file Uploader bạn cần `include Cloudinary::CarrierWave.`
```ruby
class ImageUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave
	....
end
```
Cài môi trường upload trực tiếp
<br>
Trong `application.js`, ta thêm dòng sau:
```ruby
//= require cloudinary
```
#### Upload ảnh
Trong form upload, ta thêm một trường hidden là :picture_cache để khi mà page reloading hay validation errors thì sẽ không mất image đã upload.
```ruby
<%= f.fields_for :image_attributes do |image_f| %>
  <%= image_f.hidden_field :image_cache %>
   ...
<% end %>
```
#### Hiển thị ảnh đã upload
Mỗi image update sẽ có một public ID, bạn hoàn toàn có thể sử dụng public ID của image để hiện thị ảnh đó.
Ví dụ một ảnh có image id là "user8" ta có thể hiện thị ảnh như sau:
```ruby
cl_image_tag("user8.png", :alt => "Default Image")
```
Hoặc có thể dùng địa chỉ tuyệt đói của bức ảnh đó để hiện thị như sau
```ruby
image_tag(
  "http://res.cloudinary.com/demo/image/upload/w_100,h_150,c_fill/sample.jpg",
  :width => 100, :height => 150)
```
Hoặc ta có thể hiện thị ảnh bình thường như sau
```ruby
<%= image_tag @post.image.url, alt: @post.name %>
```
Lưu ý: Bạn chạy lệnh sau để upload các ảnh trên các trang tĩnh lên cloud để tránh tính trạng mất ảnh khi reload
```bash
rake cloudinary:sync_static
```
Các bạn có thể tham khảo mã nguồn tại [đây](https://github.com/devtuananh/rails_admin_demo). 
<br>Cảm ơn mọi người đã dành thời gian đọc bài viết, mong nhận được các ý kiến góp ý từ các bạn để bài viết được đầy đủ hơn.
### Tham khảo
[Ruby On Rails Guide](https://cloudinary.com/documentation/rails_carrierwave)
<br>[Cloudinary](https://github.com/cloudinary/cloudinary_gem)
<br>[Rails & CarrierWave Guide](https://cloudinary.com/documentation/rails_integration#getting_started_guide)