# Khái niệm
Active storage là 1 tính năng được tích hợp sẵn trong rails kể từ phiên bản 5.2, giúp tải và lữu trữ tệp và file đính kèm khi sử dụng service của các đám mây như Amazon S3, Microsoft Azure Storage,... Đi kèm với phương thức lưu trữ cục bộ ở Local disk để phục vụ cho quá trình phát triển và thử nghiệm.

Trước đây khi rails chưa ra mắt và tích hợp tính năng Active storage này thì việc sử dụng những gem upload và lưu trữ file như : CarrierWave, PaperClip,...là rất phổ biến. Vì đơn giản, chúng ta cần một thư viện để việc xử lý những logic phức tạp trở nên đơn giản hơn, nhưng kể từ phiên bản Rails 5.2 trở đi, chúng ta đã có thêm một sự lựa chọn thay thế cho việc sử dụng những gem trên. Bằng cách sử dụng Active Storage, một ứng dụng có thể chuyển đổi các hình ảnh tải lên với ImageMagick, tạo ảnh đại diện cho các tệp tải lên, đồng thời trích xuất siêu dữ liệu từ các tệp tùy ý.

# So sánh Active storage với Carrierwave

| Tiêu chí | Active storage | Carrierwave
| -------- | -------- | -------- |
| Set up và sử dụng | Setup đơn giản với vài thao tác, dễ sử dụng hơn kể cả đối với những người mới | Setup cần nhiều thao tác hơn so với active storage |
|Hỗ trợ imagemagick| Hỗ trợ | Hỗ trợ |
| Config đường dẫn | Tất cả file đều được lưu theo một folder config sẵn duy nhất. | Hỗ trợ config đường dẫn cho từng phần riêng biệt, ví dụ 2 folder dành riêng cho lưu avatar và dành riêng cho lưu ảnh sản phẩm |
| vaidate |Chưa tích hợp sẵn, muốn validate ta cần custom hoặc sử dụng gem "active_storage_validations" | Hỗ trợ |
| URL | Url chưa được thân thiện với CEO do tự generate random key rồi sử dụng làm đường dẫn, tuy nhiên có thể set prefix cho đường dẫn | Dễ dàng chỉnh sửa URL theo ý muốn, thân thiện với CEO hơn |
| Lưu trữ trên DB | Tạo ra 2 bảng "**active_storage_attachments**" và "**active_storage_blobs**" cùng với việc sử dụng **Porlymophic** để đánh dấu lưu trữ file theo ActiveRecord record => Tất cả đều được lưu trữ trên 2 bảng này nên việc quản lý cũng dễ dàng hơn, khi mở rộng cũng chỉ cần thêm Polymorphic vào model thay vì tạo ra field mới | Tạo thêm field và lưu trực tiếp, ví dụ : lưu thông tin file upload thẳng vào field avatar trong bảng User |
| Cache file |Chưa hỗ trợ| Hỗ trợ |

Nhìn vào bảng so sánh này thì chúng ta cũng có thể nhận thấy ưu và nhược điểm của từng loại để rồi cân nhắc được việc sử dụng công nghệ nào phục vụ cho việc upload file rồi đúng không nào.

# Sử dụng Active storage như thế nào ?
## Setup cho Active Storage
Như ở bảng so sánh trên thì việc setup và sử dụng Active storage rất đơn giản. Giả sử như chúng ta đã set up cho project sử dụng MySql và có 2 Model đó là : User (name: string email: string) và Product (name: string, price: string)
Đầu tiên rất đơn giản, chúng ta chỉ cần chạy lệnh
`rails active_storage:install`
Sau khi chạy lệnh này thì rails sẽ tạo ra cho chúng ta 2 file migration, tiếp đó chúng ta sẽ chạy lệnh
`rails db:migrate`
Đến đây, khi kiểm tra trong database chúng ta sẽ thấy có 2 bảng mới được tạo ra có tên là  **active_storage_attachments**  và **active_storage_blobs**.

Tiếp đến đối với model ta muốn sử dụng Active storage để upload file thì ta sẽ khai báo như sau

Đối với quan hệ 1 - 1 (VD: 1 user có 1 ảnh avatar)
```ruby
class User < ApplicationRecord
  has_one_attached :avatar
end
```

Đối với quan hệ 1 - n (VD: 1 sản phẩm có nhiều ảnh)
```ruby
class Product < ApplicationRecord
  has_many_attached :images
end
```

OK, vậy là set up cho phần active storage đến đây là xong rồi đó, thực sự đơn giản phải không. Phần tiếp theo mình nói đến sẽ là những phần khác không thuộc trong active storage, vì vậy mình sẽ tua nhanh đoạn này nhé.

## Controller
```ruby
// app/controllers/users_controller.rb

class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      redirect_to users_path
    else
      render :new
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :avatar)
  end
end
```

```ruby
// app/controllers/products_controller.rb

class ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def new
    @product = Product.new
  end

  def create
    product = Product.new product_params
    if product.save
      redirect_to products_path
    else
      render :new
    end
  end

  def show
    @product = Product.find_by(id: params[:id])
  end

  private

  def product_params
    params.require(:product).permit(:name, :price, :images => [])
  end
end
```
##### NOTE: Ở params của record có quan hệ 1 nhiều, ta sẽ để ở dạng mảng. Như ví dụ trên thì mình cho params[:images] là 1 mảng.

## View
```ruby
//  app/views/users/index.html.erb

<% @users.each do |user| %>
  <%= image_tag(user.avatar, width: 50) if user.avatar.present? %>
  <%= user.name %>
  <%= user.email %>
  <br/>
<% end %>
```

```ruby
// app/views/users/new.html.erb

<%= form_for @user do |f| %>
  <%= f.text_field :name %>
  <%= f.email_field :email %>
  <%= f.file_field :avatar %>
  <%= f.submit "submit" %>
<% end %>
```

```ruby
// app/views/products/index.html.erb

<% @products.each do |product| %>
  <%= product.name %>
  <%= product.price %>
  <% product.images.each do |image| %>
    <%= image_tag image, width: 50 %>
  <% end %>
  <br/>
<% end %>
```

```ruby
// app/views/products/new.html.erb

<%= form_for @product do |f| %>
  <%= f.text_field :name %>
  <%= f.text_field :price %>
  <%= f.file_field :images, multiple: true %>
  <%= f.submit "submit" %>
<% end %>
```
##### "<%= f.file_field :images, multiple: true %>" là lí do tại sao bên controller param lại là mảng các bạn nhé.

```ruby
Rails.application.routes.draw do
  resources :users, only: %i(index show new create update)
  resources :products, only: %i(index show new create)
end
```

OK , giờ chỉ cần vào và trải nghiệm thôi.
Sau khi upload file cho 1 bản ghi, chúng ta sẽ thấy file được upload trong 1 folder có tên là **storage/**, tại thư mục này, tất cả bản ghi sẽ được lưu trữ theo phương thức mặc định của active storage, trước khi xem nó là gì, chúng ta sẽ cùng vào trong database xem cấu trúc lưu trữ như thế nào nhé.

![](https://images.viblo.asia/6ee01783-4881-49a8-bbb0-e36d61ece531.png)

ở bảng này ta sẽ thấy các field:

* name: Lưu tên của params (tên input field)
* record_type và record_id: Đây là cấu trúc của Polymorphic, record_type sẽ lưu tên model ( tên bảng ) và record_id sẽ lưu id của bản ghi ở bảng tương ứng với model đó.
* blob_id: Lưu id của bản ghi bên bảng **active_storage_blobs**

![](https://images.viblo.asia/069f1544-f796-41ee-a3bd-5a58eb28e9d0.png)

* key: Chuỗi random để định danh file
* filename: Tên file upload
* content_type: Định dạng ảnh
* byte-size: Kích cỡ file
* ... còn vài field kia chúng ta sẽ chưa nói đến

Từ thông tin từ 2 bảng này, chúng ta sẽ đánh dấu lưu trữ của file vào với từng active record.
Quay trở lại với folder **storage/**, ta sẽ thấy những file được upload lên lưu dưới cấu trúc
dạng như :
```ruby
5b/
    7c/
        5b7cnlo96yd4tqkkvec8hy3ga0g2
 9t/
     yc/
         9tycz5lpf8y9f3ud18kpc6kugalr
 ...
```
Theo như ấn tượng ban đầu, ta sẽ nhận thấy 2 folder ngoài của file là 4 chữ cái đầu của tên file (cũng chính là field "key" được lưu trong bảng active_storage_blobs).
Khi inspect ảnh ở web lên ta sẽ thấy đường dẫn:
`http://localhost:3000/duong041099/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--768923ca5225c629077bb2baf767653c31c4caa4/ttd.png`
Công bằng mà nói thì đường dẫn này quả thực không thân thiện cho lắm đối với CEO phải không :+1:

## Remove attachments
Nãy giờ chúng ta chỉ mới thực hiện phần store attachment mà thôi, vậy câu hỏi ở đây là nếu cứ lưu trữ như vậy mà không xử lý những file, tệp dư thừa thì sao? Tất nhiên là sẽ dẫn đến phình bộ nhớ rồi đúng không. Vậy giờ chúng ta sẽ xem làm thế nào để xử lý chúng nhé, rất đơn giản thôi

```ruby
// app/views/users/index.html.erb

<% @users.each do |user| %>
  <%= image_tag(user.avatar, width: 50) if user.avatar.present? %>
  <%= user.name %>
  <%= user.email %>
  <%= link_to "delete avatar", user_path(user), method: :patch %>
  <br/>
<% end %>
```

```ruby
// app/controllers/users_controller.rb
#chúng ta sẽ bổ sung thêm hàm update

  def update
    user = User.find_by(id: params[:id])
    user.avatar.purge          # thực hiện việc remove
    redirect_to users_path
  end
```
Đến đây rồi thì chỉ việc click vào rồi xem kết quả thôi.

## Download and preview file
Làm việc với file thì tất nhiên download cũng là nhu cầu đúng không các bạn, điều này đối với active storage cũng thật dễ dàng
```ruby
// app/views/users/index.html.erb

# Thêm dòng này vào và trải nghiệm nhé
 <%= link_to "download avatar", rails_blob_path(user.avatar, disposition: 'attachment') if user.avatar.present? %>
```

Chúng ta cũng có thể sử dụng tính năng preview (xem trước) khi chưa muốn tải về, để làm được điều đó ta sẽ thay `disposition: 'attachment'` thành `disposition: 'preview'`. Tuy nhiên tính năng này sẽ chỉ hỗ trợ cho 1 số định dạng như video, PDF,...
# Option config
### Location storage
Sau khi đẩy lên server chúng ta cũng cần config cho project một vài thông tin như sau
```ruby
// config/storage.yml

local:
  service: Disk
  root: <%= Rails.root.join("storage") %>       # đặt đường dẫn lưu trữ file, có thể thay đổi nếu cần

test:
  service: Disk
  root: <%= Rails.root.join("tmp/storage") %>
```

### Kết hợp với service Computing Cloud
```ruby
// config/storage.yml

// S3 AWS
amazon:
  service: S3               # tên service của cloud computing
  access_key_id: ""         # thêm 1 vài thông tin phụ thuộc
  secret_access_key: ""
  bucket: ""
  region: "" # e.g. 'us-east-1'
  
// AzureStorage của Microsoft
# microsoft:
#   service: AzureStorage
#   storage_account_name: your_account_name
#   storage_access_key: <%= Rails.application.credentials.dig(:azure_storage, :storage_access_key) %>
#   container: your_container_name

// GCS của Google cloud
# google:
#   service: GCS
#   project: your_project
#   credentials: <%= Rails.root.join("path/to/gcs.keyfile") %>
#   bucket: your_own_bucket
```

```ruby
// config/environments/production.rb

# Store files on Amazon S3. (Cấu hình cho môi trường production)
config.active_storage.service = :amazon
```

Cảm ơn các bạn đã theo dõi bài viết !

Tài liệu tham khảo:

* https://edgeguides.rubyonrails.org/active_storage_overview.html
* https://github.com/rails/rails/tree/main/activestorage
* https://github.com/igorkasyanchuk/active_storage_validations
* https://www.botreetechnologies.com/blog/change-default-file-path-of-active-storage-in-ruby-on-rails-5/
* https://github.com/carrierwaveuploader/carrierwave