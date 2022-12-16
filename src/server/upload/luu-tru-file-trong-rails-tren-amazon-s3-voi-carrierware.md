## Với một ứng dụng web đòi hỏi lưu trữ lượng data lớn. Thì chúng ta không thể lưu trữ trên server vì giới hạn bộ nhớ. Vì vậy việc lưu trữ dữ liệu với 1 service như amazon s3 là 1 điều cần thiết. Giúp giảm tải cho server và việc lưu trữ cũng không bị giới hạn. Và đương nhiên thì chúng ta sẽ phải trả phí cho việc lưu trữ đó. 

## Amazon s3, IAM là gì?
- Amazon Simple Storage Service (Amazon S3) là một dịch vụ lưu trữ đối tượng cung cấp khả năng thay đổi theo quy mô, tính khả dụng của dữ liệu, bảo mật và hiệu năng. Dịch vụ này để lưu trữ và bảo vệ bất kỳ lượng dữ liệu nào cho nhiều trường hợp sử dụng khác nhau, chẳng hạn như trang web, ứng dụng di động, sao lưu và khôi phục, lưu trữ, ứng dụng doanh nghiệp, thiết bị IoT và phân tích dữ liệu hớn. Amazon S3 cung cấp các tính năng quản lý dễ sử dụng, nhờ đó, bạn có thể tổ chức dữ liệu và cấu hình các kiểm soát truy cập được tinh chỉnh để đáp ứng yêu cầu cụ thể của doanh nghiệp, tổ chức và yêu cầu về tuân thủ.

- AWS Identity and Access Management (IAM) cho phép bạn quản lý truy cập vào các dịch vụ và tài nguyên AWS một cách bảo mật. Khi sử dụng IAM, bạn có thể tạo, quản lý người dùng và nhóm AWS, sử dụng các quyền để cho phép và từ chối quyền truy cập vào tài nguyên. 

- IAM là một tính năng được cung cấp miễn phí của tài khoản AWS. Bạn chỉ phải trả phí cho việc sử dụng các dịch vụ AWS khác bởi người dùng của bạn.
## 1. Chuẩn bị project.
Gem file. 
```ruby
# Env
gem "dotenv-rails"
gem "config"

# Support
gem "aws-sdk", "~> 3"
gem "carrierwave", "~> 2.0"
gem "carrierwave-aws"
```
migrate mình tạo avatar để upload.
```ruby
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
    	t.string :name
    	t.string :avatar

      	t.timestamps
    end
  end
end
```
Chạy lệnh ```rails generate uploader Avatar``` để tạo avatar_uploader.rb
```
class AvatarUploader < CarrierWave::Uploader::Base
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{model.id}"
  end
end
```
Mount upload avatart cho user.
```ruby
class User < ApplicationRecord
	mount_uploader :avatar, AvatarUploader
end
```
Chuẩn bị form html để create user.
```html
<div class="col-md-6">  
  <%= form_for @user, class: "form-horizontal form-bordered" do |f| %>
    <div class="form-group">
      <label for="name">Name:</label>
      <%= f.text_field :name, class: "form-control" %>
    </div>
      <div class="form-group">
        <label for="avatar">Avatar:</label>
      <%= f.file_field :avatar, accept: "image/png, image/jpg, image/jpeg", class: "form-control-file border" %>
    </div>

    <%= f.button "Save", class: "btn btn-primary" %>
  <% end %>
</div>
```
Config initializers/carrierware.rb
```ruby
CarrierWave.configure do |config|
  config.storage = :aws
  config.aws_bucket = Settings.aws.s3.bucket_name
  config.aws_acl = Settings.aws.s3.acl

  config.aws_authenticated_url_expiration = 60 #thời gian url resource tồn tại.

  config.aws_attributes = {
    expires: 1.week.from_now.httpdate,
    cache_control: 'max-age=604800'
  }

  config.aws_credentials = {
  	region: Settings.aws.region,
  	access_key_id: ENV['AWS_ACCESS_KEY_ID'],
    secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
  }
end
```
## 2. Tạo bucket lưu trữ dữ liệu.
Đầu tiên thì chúng ta sẽ truy cập vào trang [amazon s3](https://s3.console.aws.amazon.com/s3/home) để tạo 1 bucket. Nó cũng giống như folder. Và mình sẽ lưu trữ dữ liệu ở bucket này. 
![](https://images.viblo.asia/3576c3c6-aacb-4667-866e-a3af3f5d77aa.png)

Nhấn create bucket. Nhập bucket name và chọn region. Lưu ý region để có thể setting region trong ứng dụng của chúng ta. 
![](https://images.viblo.asia/3fdfce0f-afc8-444b-80d5-579198f3fd17.png)

Next. Ở phần này sẽ setting 1 số chỗ chư tạo log, version, encrypt. Mình chỉ lưu ảnh bình thường nên ở phần này mình không chọn gì cả.
![](https://images.viblo.asia/72ccc47e-285f-467a-997b-68e0c3adaf9f.png)

Ở phần cuối thì bỏ chọn phần Block public access to buckets and objects granted through new access control lists (ACLs) để server của chúng ta có thể access vào bucket này.
![](https://images.viblo.asia/38dbb9d2-6114-40c3-8808-d25fc6c45e99.png)

MÌnh đã tạo được 1 bucket với name là ```deploy-app-development```, region mình chọn Singapore(ap-southeast-1) và để lấy được region name thì các bạn có thể check ở [đây](https://docs.aws.amazon.com/general/latest/gr/rande.html).
Thêm setting.local.yml
```ruby
aws:
  region: "ap-southeast-1"
  s3:
    bucket_name: "deploy-app-development"
    acl: "private"
    folder: "upload"
```
## 3. Tạo user IAM.
Đầu tiên thì chúng ta sẽ tạo user ở trang này: https://console.aws.amazon.com/iam/home?#/users
![](https://images.viblo.asia/90ab9031-013a-4135-9e07-9337d9b66a68.png)

Click vào add user. Mình sẽ tạo 1 user mới là dao.van.nam. Và user này mình chỉ cho quyền sử dụng access key id và secret để truy cập. Không cho phép đăng nhập.
![](https://images.viblo.asia/3ed858c6-0be3-48ad-81df-7337ae566840.png)

Tiếp theo thì sẽ tới bước chọn group quyền cho user. Mình chưa có nên sẽ tạo mới group.
![](https://images.viblo.asia/a9903a25-ba66-4a09-af96-94426eb0d9ca.png)

Group này thì mình đang sử dụng s3 để lưu trữ. Mình sẽ cấp quyền S3FullAccess.
![](https://images.viblo.asia/4b8afbe2-42c7-4527-8112-e3511af51166.png)

Sau khi create group thì sẽ trở lại màn hình tạo user. Ấn next tiếp cho tới màn hình
![](https://images.viblo.asia/7cded908-5184-424f-b8f5-9c5b80f0f5a7.png)

Sau khi tạo xong thì chúng ta nhận được 1 access id và access key. 2 Key này sử dụng để config vào carrierware. Ở trên mình đã config là
```
access_key_id: ENV['AWS_ACCESS_KEY_ID'],
secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
```
Do đó mình sẽ tạo file .env để lưu vào. Đây là file chưa biến môi trường. (gem dotenv)
```ruby
AWS_ACCESS_KEY_ID=your access key id
AWS_SECRET_ACCESS_KEY=your secret access key
```

### Config vậy là xong. Khi chúng ta upload avatar thì dữ liệu avatar sẽ tự động được đưa đến lưu trữ ở bucket. Và khi chúng ta get thì sẽ get ở bucket.
Cuối cùng là tạo mới 1 user ở phía local và kiểm tra.
![](https://images.viblo.asia/915c7ae8-4b28-415c-b350-149b8e85cdbd.png)
![](https://images.viblo.asia/119f25fd-2e8d-46b5-a93e-07dc63df9015.png)
Source: https://github.com/namdv-1352/deploy-ec2