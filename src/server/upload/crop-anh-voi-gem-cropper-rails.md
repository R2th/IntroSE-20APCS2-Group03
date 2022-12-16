## Giới thiệu
Việc cắt ảnh khi tải lên đối với mọi ứng dụng là rất cần thiết. Việc ứng dụng của chúng ta có tính hợp tính năng này sẽ giúp cho người dùng có thể chọn vị trí ảnh để hiển thị lên avatar, hay ảnh nền. Hôm nay mình xin giới thiệu 1 plugin khá là hay của jQuery về việc xử lý ảnh khi tải lên. Nó hỗ trợ nhiều tính năng trong việc xử lý hình ảnh.
## I. Cài đặt.
Chức năng trong plugin này các bạn có thể tham khảo qua https://fengyuanchen.github.io/cropper
Cách cài thì có thể cài bằng gem cropper-rails hoặc npm
Ở đây mình cài bằng gem cho dễ dùng.
```ruby
gem 'jquery-rails'
gem 'cropper-rails'
```
Và require
```ruby
# application.js
//= require jquery
//= require cropper
```
```ruby
# application.css
 *= require jquery
 *= require cropper
```
## II. Cách sử dụng. 
### a. Model.
```ruby
# user.rb
attr_accessor :avatar_crop_x, :avatar_crop_y, :avatar_crop_w, :avatar_crop_h
CROP_IMAGE = [:avatar_crop_x, :avatar_crop_y, :avatar_crop_w, :avatar_crop_h]
mount_uploader :avatar, AvatarUploader
```
### b. Tạo form.
```ruby
<%= form_for @user do |f| %>
    <%= f.file_field :avatar, id: "js-avatar-input" %>
    <%= image_tag @user.avatar, id: "js-avatar-tag" %><hr/>
    <% User::CROP_IMAGE.each do |attr| %>
      <%= f.hidden_field attr.to_sym, id: "user_#{attr}" %>
    <% end %>
    <%= f.submit "update" %>
<% end %>
```

### c. Js
```jquery
$(document).on('change', 'input#js-avatar-input', function(event){
  $('#js-avatar-tag').cropper('destroy');
  var input = this;
  var target = $(event.currentTarget);
  var file = target[0].files[0];
  var reader = new FileReader();
    reader.onload = function(e){
      var img = new Image();
      img.src = e.target.result;
      $('#js-avatar-tag').attr('src', img.src);
      $('.cropper-canvas img, .cropper-view-box img').attr('src', img.src);
      cropImage();
    };
  reader.readAsDataURL(file);
});

function cropImage(){
  var $crop_x = $('input#user_avatar_crop_x'),
    $crop_y = $('input#user_avatar_crop_y'),
    $crop_w = $('input#user_avatar_crop_w'),
    $crop_h = $('input#user_avatar_crop_h');
  $('#js-avatar-tag').cropper({
    viewMode: 1,
    aspectRatio: 1,
    background: false,
    zoomable: false,
    getData: true,
    aspectRatio: 2.9,
    built: function () {
      var croppedCanvas = $(this).cropper('getCroppedCanvas', {
        width: 100,
        height: 100
      });
      croppedCanvas.toDataURL();
    },
    crop: function(data) {
      $crop_x.val(Math.round(data.x));
      $crop_y.val(Math.round(data.y));
      $crop_h.val(Math.round(data.height));
      $crop_w.val(Math.round(data.width));
    }
  });
}
```
Đơn giản phải không nào. mình nói sơ 1 chút về function này nhé, khi ta input file vào thi js sẽ đọc file và đưa vào image tag, plugin sẽ hỗ trợ chúng ta tạo crop box. và khi chúng ta di chuyển crop box. các input avatar_crop_x, avatar_crop_y ... sẽ thay đổi theo. đây là tọa độ mà ảnh sẽ được cắt. chúng sẽ được gửi lên controller cùng với file khi ta submit form. tới đây công việc cắt ảnh trở nên dễ hơn rồi đấy.
  ### d. Controller
Trước khi update thì chúng ta gán avatar_crop_x, avatar_crop_y, avatar_crop_w, avatar_crop_h vào @user đã nhé
  ```ruby
@user.avatar_crop_x = params[:user][:avatar_crop_x]
@user.avatar_crop_y = params[:user][:avatar_crop_y]
@user.avatar_crop_w = params[:user][:avatar_crop_w]
@user.avatar_crop_h = params[:user][:avatar_crop_h]
```
### e. AvatarUploader
Chúng ta sẽ lưu trữ 2 phiên bản đó là bản gốc chưa cắt và bản đã cắt rồi nhé.
``` ruby
avatar_uploader.rb
version :thumb do
    process :crop_image
  end
def crop_image
    if model.avatar_crop_x.present?
      manipulate! do |img|
        x = model.avatar_crop_x.to_i
        y = model.avatar_crop_y.to_i
        w = model.avatar_crop_w.to_i
        h = model.avatar_crop_h.to_i
        img.crop "#{w}x#{h}+#{x}+#{y}"
      end
    end
  end
  ```
  Vậy là xong các bước để có thể cắt một bức ảnh và lưu nó thành 1 phiên bản khác.
  
 Tham khảo
 [Cropper-rails](https://github.com/cristianbica/cropper-rails)
 [cropping plugin](https://github.com/fengyuanchen/cropper#getting-started)