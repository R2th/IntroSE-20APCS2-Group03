Chúng ta thương thấy khi upload một ảnh (thường là avatar có kích thước quá lớn) các trang web thường cung cấp tùy chỉnh ảnh hay còn gọi là copping.
Kỹ thuật cropping được áp dụng rất nhiều trong thực tế, vậy trong rails chúng ta làm thế nào?
Sau đây là bài hướng dẫn cropping images trong rails thông qua thư viện Jcrop.
Trước tiên chúng ta phải thêm gem  rmagick và carrierwave vào trong gem file:
```ruby
gem 'rmagick'
gem 'carrierwave'
```
Tạo model User với hai trường name và avatar đều để dạng string:
```ruby
rails g model user name:string avatar:string
rails db:migrate
```
Tạo file uploader của gem carrierwave bằng câu lệnh sau:
```ruby
rails generate uploader Avatar
```
Cài đặt carrierwave uploader cho trường avatar trong User model:
```ruby
class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
end
```
Tạo users_controller:
```ruby
rails g controller users
```
Định nghĩa các action trong routes:
```ruby
Rails.application.routes.draw do
  resources :users
  root to: 'users#index'
end
```
Tại file uploaders/avatar_uploader.rb thêm các phiên bản kích cỡ của ảnh mà bạn muốn tùy chỉnh:
```ruby
class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick

  storage :file

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  version :large do
    resize_to_limit(600, 600)
  end

  version :thumb do
    process :crop
    resize_to_fill(100, 100)
  end
  
  def crop
    if model.crop_x.present?
      resize_to_limit(600, 600)
      manipulate! do |img|
        x = model.crop_x.to_i
        y = model.crop_y.to_i
        w = model.crop_w.to_i
        h = model.crop_h.to_i
        img.crop!(x, y, w, h)
      end
    end
  end
end
```
Thêm file crop.html.erb vào trong thư mục app/views/users  nhằm mục đích tùy chỉnh images sau khi user tạo avatar:
```ruby
<h1>Crop Avatar</h1>
<%= image_tag @user.avatar_url(:large), id: "cropbox" %>
<h4>Preview</h4>
<div style="width:100px; height:100px; overflow:hidden">
  <%= image_tag @user.avatar.url(:large), :id => "preview" %>
</div>
<%= form_for @user do |f| %>
  <% %w[x y w h].each do |attribute| %>
    <%= f.hidden_field "crop_#{attribute}" %>
  <% end %>
  <div class="actions">
    <%= f.submit "Crop" %>
  </div>
<% end %>
```
Thêm action: create, update trong users_controller nhằm mục đích xử lý việc cắt ảnh:
```ruby
def update
  @user = User.find(params[:id])
  if @user.update_attributes(allowed_params)
    if params[:user][:avatar].present?
      render :crop
    else
      redirect_to @user, notice: "Successfully updated user."
    end
  else
    render :new
  end
end

def create
  @user = User.new(allowed_params)
  if @user.save
    if params[:user][:avatar].present?
      render :crop
    else
      redirect_to @user, notice: "Successfully created user."
    end
  else
    render :new
  end
```
Để cắt ảnh chúng ta sẽ sử dụng một thư viện của js có tên là Jcop, bạn có thể download jcop [tại đây](http://deepliquid.com/content/Jcrop.html).
Copy jquery.Jcrop.css vào thư mục vendor/assets/stylesheets và jquery.Jcrop.js vào thư mục vendor/assets/javascripts. Tại application.js, thêm dòng:
```ruby
//= require jquery.Jcrop
```
Tại application.css, thêm dòng:
```ruby
*= require jquery.Jcrop
```
Tại file crop.js nhằm tùy chỉnh lại giao diện cắt ảnh:
```ruby
var AvatarCropper,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
jQuery(function() {
  return new AvatarCropper();
});
AvatarCropper = (function() {
  function AvatarCropper() {
    this.updatePreview = bind(this.updatePreview, this);
    this.update = bind(this.update, this);
    $('#cropbox').Jcrop({
      aspectRatio: 1,
      setSelect: [0, 0, 600, 600],
      onSelect: this.update,
      onChange: this.update
    });
  }
  AvatarCropper.prototype.update = function(coords) {
    $('#user_crop_x').val(coords.x);
    $('#user_crop_y').val(coords.y);
    $('#user_crop_w').val(coords.w);
    $('#user_crop_h').val(coords.h);
    return this.updatePreview(coords);
  };
  AvatarCropper.prototype.updatePreview = function(coords) {
    return $('#preview').css({
      width: Math.round(100 / coords.w * $('#cropbox').width()) + 'px',
      height: Math.round(100 / coords.h * $('#cropbox').height()) + 'px',
      marginLeft: '-' + Math.round(100 / coords.w * coords.x) + 'px',
      marginTop: '-' + Math.round(100 / coords.h * coords.y) + 'px'
    });
  };
  return AvatarCropper;
})();
```
Và đây là thành quả của chúng ta:
![](https://images.viblo.asia/ac9130f5-9b75-4e0c-a6ee-1ff745758bfc.png)
## Link tham khảo:
https://rubyplus.com/articles/3951-Cropping-Images-using-jCrop-jQuery-plugin-in-Rails-5