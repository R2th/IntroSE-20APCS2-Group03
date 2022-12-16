Ngày nay việc mọi người mua những sản phẩm điện tử trên mạng diễn ra rất thường xuyên như hình ảnh, âm thanh, phần mềm, ... . Và tất nhiên không phải ai muốn mình upload lên cái gì thì người khác cũng có thể tự do download file đó mà không ràng buộc có gì. Ví dụ như các trang web mua bán hình ảnh, âm thanh, ... <br>

Ví dụ chúng ta có 1 website bán tranh chẳng hạn, với các yêu cầu cơ bản như sau:
* Người dùng có thể upload ảnh lên để bán
* Người dùng có thể mua ảnh từ người khác
* Người dùng có thể xem lại và download ảnh mà họ đã đã mua

Chúng ta sẽ xây dựng database với mối quan hệ như sau:
![](https://images.viblo.asia/80f68b4f-766e-477d-861d-01f17dd553f6.png)

Trong ví dụ này chúng ta sẽ dùng `paperclip` cho việc upload file:
```ruby
# Gemfile
gem 'paperclip', '~> 5.0.0'
```
sau đó chạy `bundle install`.

Chúng ta sẽ đi nhanh các phần khởi tạo migration, và model:
### Migration
```ruby
# Migration for create_users.rb 
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email, :name
      t.timestamps
    end
  end
end
```
```ruby
# Migration for create_images.rb
class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.integer :user_id
      t.timestamps
    end
  end
end
```
```ruby
# Migration for Paperclip attachments
class AddAttachmentToImages < ActiveRecord::Migration[5.1]
  def up
    add_attachment :images, :asset
  end

  def down
    remove_attachment :images, :asset
  end
end
```
```ruby
# Migration for create_purchased_images.rb
class CreatePurchasedImages < ActiveRecord::Migration[5.1]
  def change
    create_table :purchased_images do |t|
      t.integer :user_id, :image_id
      t.timestamps
    end
  end
end
```

Đừng quên chạy lệnh `rails db:migrate`
### Model
```ruby
# app/models/user.rb
class User < ApplicationRecord

  has_many :images
  has_many :purchased_images

end
```
```ruby
# app/models/image.rb
class Image < ApplicationRecord

  belongs_to :user

  has_attached_file :asset, styles: { thumb: "200x200>" }
  validates_attachment_content_type :asset, content_type: /\Aimage\/.*\z/

end
```
```ruby
# app/models/purchased_image.rb
class PurchasedImage < ApplicationRecord

  belongs_to :user
  belongs_to :image

end
```
### Upload Ảnh
Trước khi người dùng có thể bán thì tất nhiên họ phải tải ảnh lên
```ruby
# config/routes.rb
resources :users do
  resources :images
end
```
```ruby
# app/controllers/images_controller.rb
class ImagesController < ApplicationController

  def new
    @image = Image.new
  end

end
```
```ruby
# app/views/images/new.html.erb
<h1>New Image for <%= current_user.name %></h1>

<%= form_for [current_user, @image], html: { multipart: true } do |f| %>
  <p><%= f.file_field :asset %></p>
  <p><%= f.submit %></p>
<% end %>
```
### Danh sách ảnh đã upload của người dùng
```ruby
# app/controllers/users_controller.rb
class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

end
```
```ruby
# app/views/users/index.html.erb
<h1>Users</h1>

<ul>
  <% @users.each do |user| %>
    <li>
      <%= link_to "#{user.name}, #{user.images.size} images", user_path(user) %>
      <%= link_to 'Upload Image', new_user_image_path(user) if current_user == user %>
    </li>
  <% end %>
</ul>
```
```ruby
# app/views/users/show.html.erb
<h1>Images offered by <%= @user.name %></h1>

<% @user.images.each do |image| %>
  <%= image_tag image.asset.url(:thumb) %>
<% end %>
```
### Mua hàng
```ruby
# config/routes.rb
resources :users do
  resources :images do
    post :purchase
  end
end
```
Chúng tra cần tạo bản ghi `PurchasedImage` mới
```ruby
# app/views/images/show.html.erb
<h1><%= @image.asset_file_name %> offered by <%= @image.user.name %></h1>

<% unless @image.user == current_user %>
  <%= form_for [current_user, @image], url: user_image_purchase_path, method: :post do |f| %>
    <%= f.submit "Purchase" %>
  <% end %>
<% end %>

<%= image_tag @image.asset.url(:thumb) %>
```
```ruby
# app/controllers/images_controller.rb
class ImagesController < ApplicationController
  # code omitted

  def purchase
    image = Image.find(params[:image_id])
    PurchasedImage.create(user: current_user, image: image)
    redirect_to users_path
  end

end
```
### Purchases Link
Chúng ta muốn xem những giao dịch mua hàng nào đã được thực hiện bởi người dùng
```ruby
# config/routes.rb
Rails.application.routes.draw do
  resources :users do
    get :purchases
    resources :images do
      post :purchase
    end
  end
end
```
```ruby
# app/views/users/index.html.erb
<h1>Users</h1>

<ul>
  <% @users.each do |user| %>
    <li>
      <%= link_to "#{user.name}, #{user.images.size} images", user_path(user) %>
      <%= link_to 'Upload Image', new_user_image_path(user) if current_user == user %>
      <%= link_to "#{user.purchased_images.size} Purchased Images", user_purchases_path(user) %>
    </li>
  <% end %>
</ul>
```
```ruby
# config/routes.rb
Rails.application.routes.draw do
  resources :users do
    get :purchases
    resources :images do
      post :purchase
      get :download
    end
  end
end
```
```ruby
# app/controllers/users_controllers.rb
class UsersController < ApplicationController
  # code omitted

  def purchases
    @user = current_user
  end
end
```
```ruby
<% # app/view/users/purchases.html.erb %>
<h1>Images purchased by <%= current_user.name %></h1>

<% current_user.purchased_images.each do |purchase| %>
  <%= link_to image_tag(purchase.image.asset.url(:thumb)), user_image_download_path(current_user, purchase.image) %>
<% end %>
```
Vậy là chúng ta đã dựng xong phần khung của website. Và giờ người dùng có thể truy cập vào những hình ảnh họ đã mua. Đã đến lúc chúng ta thêm chức năng tải xuống được kích hoạt bởi liên kết đó. Theo mặc định, Paperclip sẽ lưu trữ tệp đính kèm của bạn trong thư mục `public/system` trong cấu trúc tệp của ứng dụng. Điều đó có nghĩa là chỉ cần click vào link là tải xuống. Tất nhiên, chúng ta muốn bảo mật các file, để chúng chỉ có thể được tải xuống bởi những người có quyền truy cập vào chúng sau khi mua.
### Bản mật và download
Với `paperclip`, khi khai báo file đính kèm ta làm như sau:
```ruby
# app/models/image.rb
class Image < ApplicationRecord

  belongs_to :user

  has_attached_file :asset, styles: { thumb: "200x200>" }
  validates_attachment_content_type :asset, content_type: /\Aimage\/.*\z/
end
```
Đường dẫn mặc định để lưu file như sau: `:rails_root/public/system/:class/:attachment/:id_partition/:style/:filename`. Folder public chúng ta thường để những gì dùng chung và mọi người đều có thể dùng, tất nhiên là chúng ta không muốn vậy,  vì vậy chúng ta cần config 1 xíu trong model: 
```ruby
# app/models/image.rb
class Image < ApplicationRecord

  belongs_to :user

  has_attached_file :asset, styles: { thumb: "200x200>" },
                      path: ":rails_root/secure_files/:class/:attachment/:id_partition/:style/:filename.",
  validates_attachment_content_type :asset, content_type: /\Aimage\/.*\z/
end
```
Giờ thì chúng ta đã có địa chỉ mới để lưu file được upload 
### Serving the secure images
Nôn na là chúng ta sẽ hiển thị thumbnail thay vì ảnh full size
```ruby
# config/routes.rb
Rails.application.routes.draw do

  resources :users do
    get :purchases
    resources :images do
      post :purchase
      get :download
    end
  end

  get '/images/:id/display', to: "images#display", as: "secure_image_display"

end
```
```ruby
# app/models/image.rb
class Image < ApplicationRecord

  belongs_to :user

  has_attached_file :asset, styles: { thumb: "200x200>" },
                      path: ":rails_root/secure_files/:class/:attachment/:id_partition/:style/:filename.",
                      url: "/images/:id/display"
  validates_attachment_content_type :asset, content_type: /\Aimage\/.*\z/
end
```
```ruby
# app/controllers/images_controller.rb
  def display
    @image = Image.find(params[:id])
    send_file @image.asset.path(:thumb)
  end
```
### Downloading Purchases
Cuối cùng nhưng không kém quan trọng là download 
```ruby
# app/controllers/images_controller.rb
def download
  image = Image.find(params[:id])
  send_file image.asset.path
end
```
Khá giống với hàm display phía trên ngoại trừ việc ảnh được tải xuống sẽ là full size như ban đầu nó được upload lên
### Tài liệu tham khảo 
https://chrisherring.co/posts/how-can-i-protect-a-user-s-file-uploads-in-rails