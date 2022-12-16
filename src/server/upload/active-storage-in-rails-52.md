Active Storage là 1 cập nhật mới của rails, được tích hợp sẵn trong phiên bản rails 5.2,  hỗ trợ cho việc tải tệp lên các dịch vụ lưu trữ như Amazon S3, Google Cloud Storage hoặc Microsoft Azure và đính kèm các tệp đó vào đối tượng Active Record, nó có thể thay thế cho các gem trước đây chúng ta thường sử dụng như Paperclip, Carrierwave, Dragonfly.
## Setup
```
bin/rails active_storage:install:migrations
bin/rails db:migrate
```
Đoạn migration này sẽ tạo cho chúng ta 2 bảng active_storage_blobs và active_storage_attachments dành cho 2 model đó là blog và tiệp đính kèm. Blog là nơi lưu trử những dữ liệu như tên file, loại, kích thước byte.... các tập tin thực tế sẽ được lưu trử trên dịch vụ lưu trữ của bạn hoặc ổ cứng tình thuộc vào chúng ta setting thế nào. một Blog có thể gán một hoặc nhiều đối tượng Active Record thông qua mô hình join Attachment.

Config để sử dụng active storage upload file đính kèm lên các dịch vụ mà bạn muốn sử dụng trong file `config/storage.yml`:
```
local: //lưu cùng nơi với ứng dụng của bạn
  service: Disk
  root: <%= Rails.root.join("storage") %>
 
test:
  service: Disk
  root: <%= Rails.root.join("tmp/storage") %>
 
amazon: //sử dụng dịch vụ lưu trữ S3
  service: S3
  access_key_id: ""
  secret_access_key: ""
  bucket: ""
  region: "" # e.g. 'us-east-1'
```
để sử dụng dịch vụ như đã config ở trên, ta cần thêm khai báo ở các file cấu hình của từng môi trường:
```
# Store files on Amazon S3.
config.active_storage.service = :amazon
```
lưu ý: để sử dụng dịch vụ S3 cần thêm gem "aws-sdk-s3"

## Attaching Files to Records
### has_one_attached
ví dụ ta có model user, mỗi user có 1 file ảnh:
```
class User < ApplicationRecord
  has_one_attached :image
end
```
Tạo user với ảnh đính kèm:
```
<%= f.file_field :image %>
```

Trên controller bạn chỉ cần permit params :image là có thể đính ảnh trong khi tạo user.
Đính kèm ảnh đến user đã có: 
```
user.image.attach(params[:image])
```
Kiểm tra xem user đã có đính kèm chưa:
```
user.image.attached?
```
### has_many_attached
Ví dụ 1 user có thể có nhiều file ảnh:
```
class User < ApplicationRecord
  has_many_attached :images
end
```
Cách tạo user có đính kèm nhiều ảnh cũng tương tự như trên, chỉ khác permit params cần thêm `images: []`
## Removing Files
Xóa ảnh đính kèm với user, đồng thời xóa luôn file đã upload: `user.avatar.purge`

Xóa ảnh đính kèm với user, đồng thời xóa luôn file đã upload thông qua Active Job: `user.avatar.purge_later`
## Linking to Files
Để download file từ view, cần sử dụng  `rails_blob_{path|url}` helper, và đặt option disposition:
```
link_to user.image.filename, rails_blob_path(@user.image, disposition: 'attachment')
```
Để xem trước file, thay đổi option: `disposition: 'preview'`
## Validates
Active Storage không hỗ trợ việc validate nên bạn có thể tự tạo ra các validate để truớc khi lưu nó, hoặc sử dụng gem active_storage_validations, có thể tham khảo [tại đây](https://github.com/igorkasyanchuk/active_storage_validations)

Ngoài ra active storage còn có thêm thư viện javascript để hỗ trợ việc upload file từ client lên dịch vụ sử dụng như hình dưới:
![](https://images.viblo.asia/e8d796ca-61e6-4b18-a07f-4ce4f6317633.gif)
Bạn có thể tham khảo thêm [tại đây](https://edgeguides.rubyonrails.org/active_storage_overview.html#direct-uploads)
## Kết Luận
Active Storage làm cho việc upload file đính kèm lên các dịch vụ lưu trữ trở nên dễ dàng, được tích hợp sẵn trong rails. Hy vọng việc làm quen với gem mới này sẽ suôn sẻ với mọi người :D

Nguồn tham khảo: https://edgeguides.rubyonrails.org/active_storage_overview.html