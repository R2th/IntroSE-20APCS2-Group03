## 1. Giớ thiệu
Nếu như trước phiên bản Rails 5.2, để thực hiện việc upload file thì hầu hết ta luôn cần đến thư viện bên thứ 3, một trong số đó nổi tiếng nhất là gem **CarrierWave** - đó là một gem rất bền vững và được cộng đồng tin dùng nhiều nhất. Nhưng từ Rails 5.2 trở đi thì ta có thêm một lựa chọn khác là **Active Storage**. Không giống như CarrierWave,  Active Storage được tích hợp sẵn trong Rails hay nói cách khác nó được phát triển bỡi Rails, vì vậy ta hoàn toàn yên tâm khi sử dụng :D

## 2. Cài đặt
###   Migration
Mặc dù **Active Storage** được tích hợp sẵn trong Rails nhưng default nó chưa được install khi chạy rails new. Để install Active Storage ta chạy câu lênh sau: 
```ruby
rails active_storage:install
rails db:migrate
```
Sau khi chạy hai câu lệnh trên thì nó sẽ tạo cho ta hai table trong DB có tên **active_storage_blobs** và **active_storage_attachments**. Về mặc lưu trữ dữ liệu thực chất Active Storage sữ dụng quan hệ **Polymorphic** trong rails, active_storage_blobs chứa thông tin của files, còn active_storage_attachments là một join table polymorphic lưu class name của model.
```ruby
class CreateActiveStorageTables < ActiveRecord::Migration[5.2]
  def change
    create_table :active_storage_blobs do |t|
      t.string   :key,        null: false
      t.string   :filename,   null: false
      t.string   :content_type
      t.text     :metadata
      t.bigint   :byte_size,  null: false
      t.string   :checksum,   null: false
      t.datetime :created_at, null: false

      t.index [ :key ], unique: true
    end

    create_table :active_storage_attachments do |t|
      t.string     :name,     null: false
      t.references :record,   null: false, polymorphic: true, index: false
      t.references :blob,     null: false

      t.datetime :created_at, null: false

      t.index [ :record_type, :record_id, :name, :blob_id ], name: "index_active_storage_attachments_uniqueness", unique: true
      t.foreign_key :active_storage_blobs, column: :blob_id
    end
  end
end

```
### Setting

Chúng ta thực hiện Khai báo các dịch vụ Active Storage trong **config/storage.yml**. Đối với mỗi dịch vụ mà ứng dụng của ta sử dụng, hãy cung cấp tên và cấu hình cần thiết. Ví dụ dưới đây khai báo ba dịch vụ có tên **local, test và amazon**:
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
  bucket: ""
  region: "" # e.g. 'us-east-1'

```
Để cho **Active Storage** biết dịch vụ nào được sử dụng bằng cách thiết lập **Rails.application.config.active_storage.service** tương ứng với mỗi môi trường bởi vì mỗi môi trường có thể sẽ sử dụng một dịch vụ khác nhau.<br>
Ví dụ để sử dụng dịch vụ **Disk** trong môi trường **development**, ta sẽ thêm phần sau vào **config/environment/development.rb**:
```ruby
config.active_storage.service = :local
```
Hay sữ dụng **s3** ở **production** thì ta thiết lập ở **config/environments/production.rb**:
```ruby
config.active_storage.service = :amazon
```

## 3. Sử dụng
Active Storage cho phép chúng ta có thể attach một hoặc nhiều files cho một record bằng cách sử dụng các macro tương ứng là **has_one_attached** và **has_many_attached**. <br>
Để minh họa ta xét ví dụ sau, một user chỉ có 1 avatar hoặc một product có nhiều image. Để thực hiện ví dụ đó ta cần tạo các model User và Product như sau:
```ruby
rails g model User name:string email:string
rails g model Product name:string price:integer
rails db:migrate
```

### has_one_attached
Bên trong User model:
```ruby
class User < ApplicationRecord
  has_one_attached :avatar
end
```
Bên trong controller và view 
```ruby
class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.create params.require(:user).permit(:name, :email, :avatar)
    redirect_to user
  end

  def show
    @user = User.find params[:id]
  end
end
```

``` ruby
# views/users/new.html.erb
<%= form_for(@user) do |f| %>
  <div class="field">
    <%= f.label "Name" %><br />
    <%= f.text_field :name %>
  </div>

  <div class="field">
    <%= f.label "Email" %><br />
    <%= f.email_field :email %>
  </div>

  <div class="field">
    <%= f.label "Avatar" %><br />
    <%= f.file_field :avatar %>
  </div>
  <%= f.submit "submit" %>
<% end %>
```
```ruby
# views/users/show.html.erb
Name: <%= @user.name %><br>
Email: <%= @user.email %><br>
Avatar: <%= image_tag @user.avatar %>
```
Như vậy là ta có thể tạo avatar cho user mà ko cần tạo thêm field avatar trong bảng users hoặc bảng nào khác. Ngoài ra, để attach một avatar tới một user đã tồn tại trước đó ta có thể dùng **user.avatar.attach(params[:avatar])** hoặc kiểm tra user đã được attach avatar chưa bằng cách **user.avatar.attached?**
### has_many_attached
Product có nhiều images:
```ruby
class Product < ApplicationRecord
  has_many_attached :images
end
```
```ruby
class ProductsController < ApplicationController
  def new
    @product = Product.new
  end

  def create
    product = Product.create!(params.require(:product).permit(:name, images: []))
    redirect_to product
  end

  def show
    @product = Product.find params[:id]
  end
end
```
```ruby
# views/products/new.html.erb
<%= form_for(@product) do |f| %>
  <div class="field">
    <%= f.label "Name" %><br />
    <%= f.text_field :name %>
  </div>

  <div class="field">
    <%= f.label "Image" %><br />
    <%= f.file_field :images, multiple: true %>
  </div>
  <%= f.submit "submit" %>
<% end %>
```
```ruby

# views/products/show.html.erb
Name:
<%= @product.name %><br>
Images:<br>
<% @product.images.each do |image| %>
 <%= image_tag image %> <br>
<% end %>
```
Chỉ cần thực hiện như trên là ta có thể attach multi files cho một record rồi.
## 4. kết
Bài viết chỉ mang tính giới thiệu đến mọi người cách cài đặt cũng như cách dùng cơ bản của Active Storage trong Rails, nếu mọi người muốn hiểu rõ hơn có thể tham khảo doc của nó ở [đây](https://edgeguides.rubyonrails.org/active_storage_overview.html).