Có thể các bạn chưa biết, Paperclip hiện nay đã ngừng cập nhật, và những nhà phát triển của sản phẩm này cũng đang khuyến khích các dev chuyển hướng qua sử dụng ActiveStorage, một gem built-in vừa được merge vào Rails 5 cuối năm vừa qua.
Mình viết bài này hy vọng rằng sẽ giúp được những bạn đã quá quen với những gem upload cũ và cảm thấy lạ lẫm với ActiveStorage có bước tiếp cận dễ dàng hơn.

## 1. Giới thiệu về ActiveStorage

ActiveStorage là một gem được đính kèm vào Rails 5.2 dùng để xử lý việc upload  đến các dịch vụ lưu trữ như Amazon, Google và Microsoft. Tất nhiên là chúng ta có thể lưu ở local để phục vụ cho việc phát triển hay test.

Gem này sẽ thay thế cho Paperclip, Carrierwave, Dragonfly

## 2. Tạo ứng dụng mới và migration
Đầu tiên chúng ta tạo ứng dụng:
```
install the rails 5.2 beta gem 
gem install rails -v 5.2.0.beta2

rails new storageapp
```
Migration được tạo tự động cho ứng dụng mới, nhưng nếu bạn muốn làm thủ công thì: 
```
bin/rails active_storage:install:migrations
bin/rails db:migrate
```
Việc migrate này giúp chúng ta tạo ra 2 bảng: active_storage_blobs và active_storage_attachments. Đây là 2 model Blob và Attachment. 

Blob lưu trữ các metadata như filename, content-type, byte size và checksum.

File thực thì được lưu ở dịch vụ lưu trữ hoặc local tùy thuộc setting của dev.

Blob có thể được gắn với 1 hoặc nhiều Active Record object thông qua việc join Attachment model.

Sau khi migrate xong thì chúng ta tạo model :

```
rails g resource comment content:text
```
## 3. Đối với một Attachment

Chúng ta không cần thiết phải dùng trực tiếp Blob và Attachment.
Để đính 1 ảnh vào Comment, ta sử dụng  has_one_attached
```
class Comment < ApplicationRecord
  has_one_attached :image
end
```
Bạn cũng không cần phải tạo Image model, Active Storage sử dụng bộ đôi Blob và Attachment và cung cấp cho chúng ta comment.image
Thử một đoạn code nhỏ nào:
```
#controller
class CommentController < ApplicationController
  def new
    comment = Comment.new
  end

  def create
    comment = Comment.create! params.require(:comment).permit(:content)
    comment.image.attach(params[:comment][:image])
    redirect_to comment    
  end

  def show
    comment = Comment.find(paramd[:id])
  end
end
# new.html.erb
<%= form_with model: @comment, local: true  do |form| %>
  <%= form.text_area :content %><br><br>
  <%= form.file_field :image, %><br>
  <%= form.submit %>
<% end %>
# show.html.erb
<%= image_tag @comment.image %>
```
Active Storage làm phần việc 
```
comment.image.attach(params[:comment][:images])
```
trong action create 
Và để hiện ảnh thì chỉ cần đưa @comment.image ra image_tag.

## 4. Trường hợp có nhiều Attachment

Chúng ta cũng chỉ cần modify 1 ít so với trường hợp ở trên
```
has_many_attached thay cho of has_one_attached
comment.images thay cho of comment.image
multiple: true ở file_field để cho phép chọn nhiều file
```

Cụ thể chúng ta có:

```
class Comment < ApplicationRecord
  has_many_attached :image
end
class CommentController < ApplicationController
  def new
    comment = Comment.new
  end

  def create
    comment = Comment.create! params.require(:comment).permit(:content)
    comment.images.attach(params[:comment][:images])
    redirect_to comment    
  end

  def show
    comment = Comment.find(paramd[:id])
  end
end
# new.html.erb
<%= form_with model: @comment, local: true  do |form| %>
  <%= form.text_area :content %><br><br>
  <%= form.file_field :images, multiple: true %><br>
  <%= form.submit %>
<% end %>
# show.html.erb
<% @comment.images.each do |image| %>
  <%= image_tag image %> <br />
<% end %>
```

## 5. Một ít config

Mặc định Active Storage sẽ được sử dụng khi bạn tạo mới 1 Rails app.

config/active_storage.yml sẽ được tạo và config.active_storage.service được đặt là :local ở cả development.rb và production.rb.
local được set để sử dụng ổ cứng  hay bất cứ phân vùng lưu trữ nào được sử dụng
```
local:
  service: Disk
  root: <%= Rails.root.join("storage") %>
```
Để thay đổi nó, bạn chỉ việc vào config.active_storage.service và đưa nó về :amazon, :google, hay :microsoft và thiết lập các thông số tương ứng với từng dịch vụ lưu trữ ở config/storage.yml.

Đối với Amazon S3, bạn cần điền access_key_id, secret_access_key, region, và bucket.

Với Google Cloud Storage, bạn cần điền project, keyfile, và bucket. 

Với Microsoft Azure Storage, bạn sẽ cần path, storage_account_name, storage_access_key, cũng như container.

Ngoài ra bạn cũng cần cài đặt gem tương ứng với dịch vụ lưu trữ đã chọn: aws-sdk-s3, google-cloud-storage, hay azure-storage.

## 6. Kết luận

Active Storage làm cho việc kiểm soát upload đến các dịch vụ lưu trữ trở nên dễ dàng hơn, hy vọng bạn sẽ có bước đầu làm quen suôn sẻ với người bạn mới này. Peace!

Nguồn tham khảo: https://www.engineyard.com/blog/active-storage