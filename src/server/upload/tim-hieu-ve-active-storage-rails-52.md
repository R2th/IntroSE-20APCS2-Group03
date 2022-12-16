***Active Storage***

Active Storage hỗ trợ việc upload file cho Rails (trước đây sử dụng các gem như paperclip, carrierware) được bổ sung vào Rails 5.2, hỗ trợ việc upload file lên các dịch vụ lưu trữ như Amazon S3, Microsoft Azure, Google Cloud và đính kèm vào các object Active Record.

**Cấu hình**

Mặc định khi tạo 1 project Rails bằng Rails 5.2 thì Active Storage đã được cấu hình sẵn:

```
# config/storage.yml
local:
  service: Disk
  root: <%= Rails.root.join("storage") %>

# Use rails credentials:edit to set the AWS secrets (as aws:access_key_id|secret_access_key)
# amazon:
#   service: S3
#   access_key_id: <%= Rails.application.credentials.dig(:aws, :access_key_id) %>
#   secret_access_key: <%= Rails.application.credentials.dig(:aws, :secret_access_key) %>
#   region: us-east-1
#   bucket: your_own_bucket
```

Đối với môi trường develop hoặc test thì việc cấu hình lưu ở local đơn giản chỉ xác định nơi sẽ lưu file. trong khi môi trường product nếu muốn lưu ở các dịch vụ lưu trữ thì ta phải cung cấp thêm thông tin để truy cập vào dịch vụ. Tùy những dịch vụ khác nhau mà ta phải cung cấp các thông tin khác nhau, như ví dụ ở trên đối với service S3 thì yêu cầu access_key_id, secret_access_key, region, bucket. Và tất nhiên phải sư dụng thêm SDK của service (ví dụ như với s3 là gem "aws-sdk-s3")


```
  # config/environments/development.rb
  # Store uploaded files on the local file system (see config/storage.yml for options)
  config.active_storage.service = :local
```
Trong từng file cấu hình môi trường thì đã cấu hình sẵn các dịch vụ sẽ dùng để upload file

Tiếp theo thì run migration để thêm 2 bảng active_storage_attachments, active_storage_blobs vào database để sử dụng cho việc upload và storage file

```
  rails active_storage:install:migrations
```

Cấu trúc file migration: 

```
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
    end
  end
end
```

* key: chính là file name đã được lưu lại trong storage.
* content_type: Loại file đã được upload.
* filename: tên file upload.
* checksum: Mã MD5 kiểm tra việc upload thành công.


**Sử dụng**

Thêm quan hệ has_one_attached hoặc has_many_attached đối với quan hệ một-một và một-nhiều giữa record file 

```
class User < ApplicationRecord
  has_one_attached :avatar
end
```

Sau đó bổ sung params vào action controller

```
class SignupController < ApplicationController
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    redirect_to root_path
  end
 
  private
    def user_params
      params.require(:user).permit(:email_address, :password, :avatar)
    end
end
```

hoặc sử dụng attached đối với object đã có sẵn.

```
user.avatar.attach(params[:avatar])
```

Củng có thể attached với file đã có sẵn hoặc được download về.

```
user.avatar.attach(io: File.open('/path/to/file'), filename: 'file.pdf', content_type: 'application/pdf')
```

Để remove attached. ta sử dụng purse hoặc purse_late (thông qua Active Job)

```
user.avatar.purge
 
user.avatar.purge_later
```

Các helper
* Link file

```
url_for(user.avatar)
```

* Download file

```
rails_blob_path(user.avatar, disposition: "attachment")
```