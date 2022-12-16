**Mục đích của gem CKEditor**

Để tạo các văn bản đẹp mắt khi soạn thảo như bài Report, các bài báo, hay những comment 
![](https://images.viblo.asia/2d4f424c-9310-4487-8a03-36fa97c66453.png)

**Thêm GEM vào Gemfile để sử dụng**

```html
gem "ckeditor"
```
Hoặc có thể cài phiên bản mới nhất từ github
```javascript
gem 'ckeditor', github: 'galetahub/ckeditor'
```
Thêm dòng này vào config/initializers/assets.rb:
```markdown
Rails.application.config.assets.precompile += %w[ckeditor/config.js]
```
Sau cùng chạy bundle để hoàn thành cài gem vào app

**Tạo một model để chứa file được upload lên**

Ở đây mình dùng gem 'carrierwave' và gem 'mini_magick'
Sau đó chạy terminal bên trong app của bạn để tạo model chứa file
```shell
rails generate ckeditor:install --orm=active_record --backend=carrierwave
```
sẽ tạo cho chúng ta cách file sau
![](https://images.viblo.asia/e8350a83-744f-4cbf-973e-1d8125435ea8.png)

bước tiếp theo load model đã được tạo
```ruby
config.autoload_paths += %w(#{config.root}/app/models/ckeditor)
```

**Sử dụng**

Trên template view ta include ckeditor CDN:
```ruby
= javascript_include_tag Ckeditor.cdn_url
```

Để gọi được ckeditor trên view ta dùng cách helper sau
```ruby
= form_for @page do |form|
  = form.cktext_area :notes, class: 'someclass', ckeditor: { language: 'uk'}
  = form.cktext_area :content, value: 'Default value', id: 'sometext'
  = cktext_area :page, :info, cols: 40, ckeditor: { uiColor: '#AADC6E', toolbar: 'mini' }
```
ví dụ ở đây mình gọi ckeditor
```html
<% provide(:title, t(".title")) %>
<%= javascript_include_tag Ckeditor.cdn_url %>
<h1><%= t ".title" %></h1>
<div class="row">
  <div class="col-md-6 col-md-offset-3">
    <%= form_for(:review, url: tour_reviews_path, html: {multipart: true }  ) do |f| %>
      <%= f.text_area :content,cols: Settings.cols,
        rows: Settings.rows, class: "form-control" %> -->
      <%= f.file_field :image, multiple: true,
        accept: Settings.accept_image %>
      <%= f.cktext_area :content, value: 'Default value', id: 'sometext' %>
      <%= f.submit t(".post"), class: "btn btn-primary" %>
    <% end %>
  </div>
</div>
```
**Custom các chức năng trên toolbar của ckeditor**

Để custom các chức năng trên toolbar của ckeditor
Vào app/assets/javascripts/ckeditor/config.js
thêm những config ta mong muốn. Như ở đây mình thêm chức năng upload ảnh
![](https://images.viblo.asia/9fe49eab-fd60-49aa-b932-11209f26d8cc.png)
Đây là config để hiện thị nút duyệt máy chủ.
Trong đó '/ckeditor/attachment_files'  là đường dẫn đến model attachment_files.rb bên trong model/ckeditor
```sql
config.filebrowserBrowseUrl = '/ckeditor/attachment_files';
```

Vị trí của trình duyệt tệp bên ngoài sẽ được khởi chạy khi nhấn nút Duyệt máy chủ trong cửa sổ hộp thoại Flash.
```sql
 config.filebrowserFlashBrowseUrl = '/ckeditor/attachment_files';
```

Vị trí của tập lệnh xử lý tải lên tệp trong cửa sổ hộp thoại Flash.
```sql
config.filebrowserFlashUploadUrl = '/ckeditor/attachment_files';
```

Vị trí của trình quản lý tệp bên ngoài sẽ được khởi chạy khi nhấn nút Duyệt máy chủ trong tab Liên kết của cửa sổ hộp thoại Hình ảnh.
```sql
config.filebrowserImageBrowseLinkUrl = '/ckeditor/pictures';
```

Vị trí của trình quản lý tệp bên ngoài sẽ được khởi chạy khi nhấn nút Duyệt máy chủ trong cửa sổ hộp thoại Hình ảnh.
```sql
config.filebrowserImageBrowseUrl = '/ckeditor/pictures';
```

Vị trí của tập lệnh xử lý tải lên tệp trong cửa sổ Hộp thoại hình ảnh.
```sql
config.filebrowserImageUploadUrl = '/ckeditor/pictures';
```

Vị trí của tập lệnh xử lý tải lên tập tin. Nếu được đặt, tab Tải lên sẽ xuất hiện trong cửa sổ hộp thoại Liên kết, Hình ảnh và Flash.
```sql
config.filebrowserUploadUrl = '/ckeditor/attachment_files';
```

Để xem thêm config ta có thể tham khảo tại
https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

**Kết luận**
Như vậy là mình đã giới thiệu xong với các bạn về Gem Ckeditor.một gem rất hữu ích trong việc editor một đoạn văn bản.Các bạn có thể sử dụng thêm các chức năng upload file ...Chúc các bạn thành công trong việc cài đặt và sử dụng gem ckeditor. Tất cả thông tin về gem ckeditor được cung cấp tại đây: https://github.com/galetahub/ckeditor