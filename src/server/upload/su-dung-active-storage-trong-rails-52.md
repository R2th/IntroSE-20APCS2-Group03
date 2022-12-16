![](https://images.viblo.asia/c40ee495-2daa-45c8-b95c-bd018da35cbf.png)

Như chúng ta đã biết, khi làm việc với upload ảnh gần như mặc định sử dụng gem carrierwave.

Trong phiên bản Rails 5.2 chúng ta có thêm 1 lựa chọn nữa là Active Storage. Với Active Storage việc upload ảnh lên cloud như Amazon S3, Google Cloud Storage, hoặc Microsoft Azure Storage,... chưa bao giờ dễ dàng đến thế.

### Cài đặt
Active Storage sử dụng 2 table trong databases là **active_storage_blobs** và **active_storage_attachments**.
Chạy lệnh
```
rails active_storage:install
```
Để generate ra migration của 2 table nói ở trên:
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

      t.index [:key], unique: true
    end

    create_table :active_storage_attachments do |t|
      t.string     :name,     null: false
      t.references :record,   null: false, polymorphic: true, index: false
      t.references :blob,     null: false

      t.datetime :created_at, null: false

      t.index [:record_type, :record_id, :name, :blob_id], name: "index_active_storage_attachments_uniqueness", unique: true
    end
  end
end
```
Tiếp theo chạy 
```
rake db:migrate
```
Bước tiếp theo là config active_storage. Vào file **config/storage.yml**.

Ở đây, chúng ra sẽ config cho các môi trường: test, development, amazon, azure(Microsoft Azure), google(Google Cloud)...

Ở VD này mình sử dụng **amazon**(Lưu ý cài gem **aws-sdk-s3** để connect tới amazon)
```
test:
  service: Disk
  root: <%= Rails.root.join("tmp/storage") %>

local:
  service: Disk
  root: <%= Rails.root.join("storage") %>

amazon:
  service: S3
  access_key_id: <%= ENV['ACCESS_KEY_ID'] %>
  secret_access_key: <%= ENV['SECRET_ACCESS_KEY'] %>
  region: <%= ENV['REGION'] %>
  bucket: <%= ENV['BUCKET'] %>
  endpoint: <%= ENV['ENDPOINT'] %>
```

Như các bạn thấy, ở môi trường local và test mình lưu ảnh trực tiếp vào thử mục storage.


Config môi trường development sử dụng trực tiếp amazon cloud **config/environments/development.rb**:
```
Rails.application.configure do
  --------------------------------------
  config.active_storage.service = :amazon
end
```

### Sử dụng
Giả sử 1 user **has_one** avatar:
```
class User < ApplicationRecord
  has_one :avatar
  has_one_attached :avatar
end
```
Macro has_one_attached mapping giữa 1 user với 1 file.
Tạo 1 form upload avatar:
```
<%= form_for (@user), url: :profile_setting, html: {method: :put} do |f| %>
    <div class="user-avatar__image">
      <%= image_tag get_user_avatar_image(@user), alt: @user.name %>
    </div>
    <div class="form-group">
      <%= f.label :avatar %>
      <%= f.file_field :avatar, id: "user_change_avatar", size: 270,
        accept: ".jpg,.jpeg,.gif,.png" %>
    </div>
    <%= f.submit t("info_settings.save"), class: "btn btn-primary"%>
  <% end %>
```
Controller:
```
class UsersController < ApplicationController
  def profile
    if @user.update_attributes(params[:user][:avatar])
      flash[:success] = t("info_settings.tab_pane.account.update_success")
      redirect_to user_setting_path
    else
      flash.now[:danger] = t("info_settings.tab_pane.account.update_failure")
      render :edit
    end
  end
end
```
Và khi thực hiện thành công, avatar sẽ được upload trực tiếp lên cloud:
![](https://images.viblo.asia/cf94b2e7-d118-4813-b921-f3bd1edc53f0.png)

**Xóa File**

Để xóa 1 file từ model, sử dụng **purge** trên file đó. Việc xóa có thể chạy background thông qua Job:
```

# Synchronously destroy the avatar and actual resource files.
user.avatar.purge
 
# Destroy the associated models and actual resource files async, via Active Job.
user.avatar.purge_later
```

**Linking to Files**
1 helper được cung cấp để trả lại link images:
```
url_for(@user.avatar)
```

Kết quả:
```
https://main-domain.sgp1.digitaloceanspaces.com/7jCenr9NLzmRdKqqoEp51e2Y?response-content-disposition=inline%3B%20filename%3D%22vampire-clipart-cartoon-18.png%22%3B%20filename%2A%3DUTF-8%27%27vampire-clipart-cartoon-18.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=VDEXDFRTXL3L7BEHZAUB%2F20181021%2Fsgp1%2Fs3%2Faws4_request&X-Amz-Date=20181021T041357Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=2cb6f17672f43b834e8f53fe98024994de7e60ba862c6cc59dd9ce42a7a5244f
```


Ở bài này mình chỉ hướng dẫn cơ bản về upload image lên clound. Ngoài ra Active Storage còn hỗ trợ multiple upload, download, preview files...
Các bạn có thể tham khảo Document tại: [https://edgeguides.rubyonrails.org/active_storage_overview.html](https://edgeguides.rubyonrails.org/active_storage_overview.html)