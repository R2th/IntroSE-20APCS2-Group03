# Mở đầu
Trong dự án chúng ta thường xuyên đá động đến chức năng upload ảnh, như làm cho tạo bài viết, hay cập nhật ảnh đại diện. Ngày hôm nay mình sẽ giới thiệu cho các bạn về cách kết hợp thư viện dropzone và carrierwave gem trong rails để làm cho chức năng đó trở nên đẹp đẽ hơn.
# Giới thiệu và sử dụng Dropzone Js
Dropzone js là thư viện js cho phép chúng ta tạo ra vùng có thể "kéo" và "thả" ảnh để upload, hoặc click băng tay theo cách truyền thống cũng được, dĩ nhiên rồi.
Chúng ta có thể download thư viện nó trên github về [tại đây](http://www.dropzonejs.com/)  để nghiên cứu và gắn vào project. Hoặc dễ chơi hơn là sử dụng Gem [DropzoneJS](https://github.com/ncuesta/dropzonejs-rails)
Thêm nó vào Gemfile:
```
gem 'dropzonejs-rails'
```
Đừng quên thêm vào application.js:
```
//= require dropzone
```
Và cả application.css nữa:
```
*= require dropzone/dropzone
```
Xong phần require, giờ tới sử dụng nó nhé.
Tham khảo trên [trang chủ](http://www.dropzonejs.com/) của Dropzonejs cách đưa nó vào hoạt động trong dự án của bạn, và đây là một ví dụ điển hình :
```
<form action="/media-upload" class="dropzone">
  <div class="fallback">
    <input name="file" type="file" />
  </div>
</form>
```
Phần không thể thiếu cho chức năng upload đó là gem Carrierwave:
Nếu bạn chưa cài đặt Carrierware bao giờ thì tôi khuyên các bạn nên sử dụng nó ngay bây giờ, vì nó hổ trợ rất tốt cho các tiến trình upload file trong dự án Rails.
```
gem 'carrierwave'
```
Tìm hiểu về cách cài đặt carrierwave [ở đây](https://github.com/carrierwaveuploader/carrierwave) nhé.
# Demo
Hãy bắt đầu với dropzonejs bằng một demo nhỏ. Ở đây mình sẽ tạo ra 1 project mới nhé:
```
rails new demo_dropzonejs
```
Và sau khi tạo xong project, chúng ta tạo cho nó model Media
```
rails g model media file_name:string
class Media < ActiveRecord::Base
  mount_uploader :file_name, MediaUploader
end
```
Đưa uploader của carrierwave vào:
```
rails g uploader media
```
*chú thích nhẹ: mount_uploader :file_name, MediaUploader và cú pháp rails g uploader media là của thằng carrierwave nhé, các bạn nên tìm hiểu về cách thức nó hoạt động trước.*

Có Model rồi thì đến Controller 
```
rails g controller media_contents
class MediaContentsController < ApplicationController
  def create
    @media = Media.new(file_name: params[:file])
    if @media.save!
      respond_to do |format|
        format.json{ render :json => @media }
      end
    end
  end
end
```
Rồi cài đặt Routes
```
resources :media_contents, only: [:create]
```
Tiếp đến là view, bạn có thể sử dụng form_for/form_tag tùy mục đích sử dụng của bạn nhé.
```
<form action="/media_contents" id="media-dropzone" class="dropzone" enctype="multipart/form-data">
  <input name="authenticity_token" type="hidden" value="<%= form_authenticity_token %>" />
  <div class="fallback">
    <input name="media" type="file" multiple />
  </div>
</form>
```
Còn đây là sử dụng form_tag helper:
```
<%= form_tag '/media_contents', method: :post, class: "dropzone", id: "media-dropzone" do %>
  <input name="authenticity_token" type="hidden" value="<%= form_authenticity_token %>" />
  <div class="fallback">
    <%= file_field_tag "media", multiple: true%>
  </div>
<% end %>
```
Cơ bản thế là ổn, bây giờ chúng ta Handling Callbacks nhé.
Sau khi submit form, file sẽ được upload lên server và lưu tại một địa chỉ cố định, để có thể lấy được địa chỉ lưu và các trạng thái của nó chúng ta trả về một json
```
respond_to do |format|
 format.json{ render :json => @media }
end
```
và đón nó ở client
```
$(function() {
  var mediaDropzone;
  mediaDropzone = new Dropzone("#media-dropzone");
  return mediaDropzone.on("success", function(file, responseText) {
    var imageUrl;
    imageUrl = responseText.file_name.url;
  });
});
```
Thế là xong rồi đó, ngoài ra bạn có thể thêm các params tùy ý, dropzone cũng cung cấp nhiều tùy chỉnh hay ho, vào tìm hiểu thêm nhé.

Checkout https://shrouded-beyond-2562.herokuapp.com/[](https://shrouded-beyond-2562.herokuapp.com/) and [source code](https://github.com/scaffeinate/dropzone-rails-demo) . Happy Hacking!