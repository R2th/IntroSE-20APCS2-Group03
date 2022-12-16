# I, Giới thiệu về Amazon S3
> Amazon S3 là dịch vụ lưu trữ đối tượng được xây dựng để lưu trữ và truy xuất dữ liệu với khối lượng bất kỳ từ bất cứ nơi nào trên Internet. Đây là dịch vụ lưu trữ đơn giản cung cấp hạ tầng lưu trữ dữ liệu có độ bền cực cao, độ khả dụng cao và quy mô vô cùng linh hoạt với chi phí rất thấp.

Đây là định nghĩa về Amazon S3 được ghi trên trang chủ của Amazon, qua đó ta có thể thấy được ý nghĩa của Amazon S3, cũng như lý do vì sao ta nên sử dụng S3 để làm nền tảng lưu trữ, đặc biệt là ảnh.

# II, Tích hợp S3 và Paperclip
Các bạn có thể xem qua về gem Paperclip tại đây: https://github.com/thoughtbot/paperclip

## 1, Cài đặt gem paperclip

Thêm dòng sau vào Gemfile và chạy lệnh `bundle install`

```ruby
gem "paperclip", "~> 6.0.0"
```

Trong model cần đính kèm ảnh (Ví dụ ở đây là model User với trường lưu ảnh là avatar):

```ruby
class User < ActiveRecord::Base
  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/
  
  ...
end
```

Trong file migration:

```ruby
class AddAvatarColumnsToUsers < ActiveRecord::Migration
  def up
    add_attachment :users, :avatar
  end

  def down
    remove_attachment :users, :avatar
  end
end
```

Hoặc các bạn có thể chạy lệnh `rails generate paperclip user avatar`

Trong Views:

```ruby
<%= form_for @user, url: users_path, html: { multipart: true } do |form| %>
  <%= form.file_field :avatar %>
  <%= form.submit %>
<% end %>
```

Trong file Controller:

```ruby
def create
  @user = User.create(user_params)
end

private

# Use strong_parameters for attribute whitelisting
# Be sure to update your create() and update() controller methods.

def user_params
  params.require(:user).permit(:avatar)
end
```

Và trong View helper:

```ruby
<%= image_tag @user.avatar.url %>
<%= image_tag @user.avatar.url(:medium) %>
<%= image_tag @user.avatar.url(:thumb) %>
```

## 2, Tích hợp Amazon S3 và Paperclip

### Lấy thông tin tài khoản từ Amazon:

Đầu tiên các bạn hãy vào địa chỉ sau và đăng nhập (đăng ký nếu chưa có tài khoản AWS): https://console.aws.amazon.com/iam/home?#security_credential

* Chọn vào Tab "Users" ở bên trái và chọn "Add users", sau đó tạo user với tên tùy chỉnh, nhưng mục "Access type" thì phải chọn "Programmatic access" hoặc cả 2. Click "Next"
* Tạo một group mới, các bạn có thể set cho group đó full access cho đỡ đau đầu. Sau đó thêm user vào group và chọn "Next" cho đến khi tạo được user.
* Click vào user vừa mới tạo, chọn Tab "Security Credentials", sau đó chọn "Create access key" rồi làm theo hướng dẫn để lấy được "ACCESS_KEY_ID" và "SECRET_ACCESS_KEY"
* Tạo bucket của AWS theo hướng dẫn sau: https://docs.aws.amazon.com/en_us/quickstarts/latest/s3backup/step-1-create-bucket.html

### Tích hợp với Paperclip

Ok, vậy là đã chuẩn bị xong thông tin trên AWS, bây giờ ta sẽ tích hợp vào Paperclip !

Ta cần cài đặt gem "aws-sdk-s3":

```
gem "aws-sdk-s3"
```

Sau đó chạy `bundle install`.

Thêm vào file "development.rb" (và file "production.rb" nếu bạn cần deploy) :

```ruby
config.paperclip_defaults = {
  :storage => :s3,
  :s3_host_name => 'REMOVE_THIS_LINE_IF_UNNECESSARY' #Các bạn hãy để là "s3-ap-southeast-1.amazonaws.com",
  :s3_credentials => {
    :access_key_id => AWS_ACCESS_KEY_ID,
    :secret_access_key => AWS_SECRET_ACCESS_KEY,
    :s3_region => "YOUR_S3_REGION_HERE" #Để là "ap-southeast-1" nếu bạn ở VN nhé
  },
  :bucket => 'S3_BUCKET_NAME'
}
```

Tạo file "aws.yml" (sẽ được tự load bởi aws-sdk):

```yml
development:
  access_key_id: AWS_ACCESS_KEY_ID
  secret_access_key: AWS_SECRET_KEY_ID

production:
  access_key_id: AWS_ACCESS_KEY_ID
  secret_access_key: AWS_SECRET_KEY_ID
```

Hãy lấy thông tin từ user mà nãy chúng ta tạo để thay vào 2 trường "AWS_ACCESS_KEY_ID" và "AWS_SECRET_KEY_ID" nhé.

# III, Lời kết

Vậy là mình đã hướng dẫn các bạn cách tích hợp Amazon S3 với Paperclip, chúc mọi người thành công nhé !

## Liên kết tham khảo:

https://github.com/thoughtbot/paperclip/wiki

https://aws.amazon.com/vi/blogs/security/wheres-my-secret-access-key/