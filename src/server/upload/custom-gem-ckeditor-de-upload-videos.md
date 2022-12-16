Nếu bạn đã từng sử dụng [gem ckeditor](https://github.com/galetahub/ckeditor) , có thể các bạn cũng đã biết gem này chỉ hỗ trợ ckeditor 4, đồng nghĩa với việc rất nhiều tính năng của các phiên bản [ckeditor](https://ckeditor.com/ckeditor-5/) mới ko được cung cấp trong `gem` này . Một trong số đó là việc ko tích hợp trực tiếp CKFinder - một tính năng quản lý files upload dưới dạng media library rất thân thiện : 

![](https://images.viblo.asia/1bb8f61d-0ee6-4a64-8d15-12eddfec5f82.gif)

Đến thời điểm hiện tại, mình vẫn chưa tìm được cách tích hợp CKFinder cùng với `gem ckeditor` , nên mình đành phải sử dụng các plugin upload ảnh, videos, audio sẵn có trên ckeditor. Và vấn đề thực sự nằm ở các **thư mục lưu files upload của ckeditor** . Mặc định `gem ckeditor` sẽ chỉ chia cho bạn 2 thư mục :` pictures, attachment_files`  tương ứng với 2 trang xử lý upload.

```ruby
#ckeditor-4.2.4/routes.rb
Ckeditor::Engine.routes.draw do
  resources :pictures, only: [:index, :create, :destroy]
  resources :attachment_files, only: [:index, :create, :destroy]
end
```
Như vậy, khi bạn dùng plugin upload `video`, `audio` , các định dạng khác ngoài pictures thì `gem ckeditor` sẽ dùng chung trang `/attachment_files` để xử lý upload . 
![](https://images.viblo.asia/6c03f847-cfe2-4864-9ddb-95c7e67130c2.gif)


Đồng nghĩa với việc, file video, audio, pdf , ... sẽ cùng lưu vào một thư mục ; đây là điều không tốt trong nhiều trường hợp. Vì vậy, trong bài viết này, mình sẽ hướng dẫn các bạn custom `gem ckeditor` để có thể tạo ra một trang xử lý riêng cho audio files (áp dụng tương tự cho một file types khác với pictures).

### 1. Tạo project rails và cài gem ckeditor
Đầu tiên, các bạn tạo một Rails application bằng lệnh này(demo này chỉ sử dụng Rails 5, cụ thể là phiên bản 5.2.1 nhé ) :

```
rails _5.2.1_ new ckeditor_demo
```
trong `Gemfile` các bạn cài đặt gem ckeditor và các dependencies của nó : 
```ruby
gem 'ckeditor', '4.2.4'
gem 'carrierwave', '1.1.0'
gem 'mini_magick', '4.7.0'
```
sau đó chạy:
```
bundle install 
rails generate ckeditor:install --orm=active_record --backend=carrierwave
```
Các bạn tải file `ckeditor_custom.js` bản 4.6.1 trên cdn về[ ở đây](http://cdn.ckeditor.com/4.6.1/basic/ckeditor.js)  . Sau đó, tạo một file `config.js` như sau :
```ruby
CKEDITOR.editorConfig = function( config ) {
  config.validateSize = 100;
  config.filebrowserImageUploadUrl = "/ckeditor/pictures";
  config.filebrowserImageBrowseUrl = "/ckeditor/pictures";
  config.toolbar_Pure = [
    {name: 'clipboard', items: ['-','Undo','Redo' ]},
    {name: 'tools', items: [ 'Maximize']},
    {name: 'basicstyles', items: [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ]},
    {name: 'paragraph', items: [ 'NumberedList','BulletedList','-','Outdent','Indent','-','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ]},
    {name: 'links', items: [ 'Link','Unlink' ]},
    {name: 'styles', items: [ 'Styles','Format','Font','FontSize' ]},
    {name: 'colors', items: [ 'TextColor','BGColor' ]},
    {name: 'insert', items: [ 'Image','Video','Iframe','Audio']},
  ];
  config.toolbar = 'Pure';
  config.toolbar_mini = [
    {name: 'tools', items: [ 'Maximize']},
    {name: 'basicstyles', items: [ 'Bold','Italic','Underline','Strike','Subscript','Superscript']},
    {name: 'paragraph', items: [ 'NumberedList','BulletedList']},
    {name: 'links', items: [ 'Link','Unlink' ]},
    {name: 'styles', items: [ 'Styles','Format','Font','FontSize' ]},
  ];
};
```
Các bạn đặt 2 file nói trên vào 2 thư mục : `app/assets/javascripts/ckeditor_custom.js ` , `app/assets/javascripts/ckeditor/config.js`và cho nó vào trong `application.js`
```ruby
//= require ckeditor/config
//= require ckeditor/init
//= require ckeditor_custom
```
Bây giờ ta tạo một trang tạo bài báo như sau:
```ruby
#routes.rb
Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  resource :articles
end
```
```ruby
#articles_controller.rb
class ArticlesController < ApplicationController
  def new
    @article = Article.new
  end
end
```
```html
#views/new.html/erb
<div class="col-md-4" style="padding: 88px 0 0 85px;">
  <%= form_for @article  do |f|%>
    <div class="form-group">
      <%= f.label :title, "Title: " %>
      <%= f.text_field :title, class: "form-control" %>
      <%= render "error_field", field: :title %>
    </div>
    <div class="form-group">
      <%= f.label :content, "Content: " %>
      <%= f.cktext_area :content, class: "form-control", ckeditor: { toolbar: 'Pure' } %>
      <%= render "error_field", field: :content %>
    </div>
    <%= f.submit "Submit" %>
  <% end %>
</div>
```
Ok thế là xong, giờ đại loại chúng ta sẽ có một cái views như thế này : 
![](https://images.viblo.asia/accd16e7-8bd5-4bfc-aaf2-41341da40e08.gif)
Như các bạn thấy, trên toolbar ckeditor đã có sẵn nút insert images nên chúng ta không cần phải tải plugin nữa. Bây giờ mình sẽ tích hợp plugin `video` và tạo cho nó 1 trang xử lý upload riêng.

### 2.  Tích hợp plugin video lên toolbar của ckeditor
Đầu tiên các bạn tải plugin video về [tại đây](https://ckeditor.com/cke4/addon/video) và giải nén nó vào trong thư mục `app/assets/javascripts/ckeditor/plugins/` . Sau đó thêm dòng này file `config.js` :
```js
  config.extraPlugins = 'video';
```
Trong thanh toolbar của file `config.js` nhớ thêm item `Video` ví dụ :
```js
config.toolbar_Pure = [
  {name: 'insert', items: [ 'Image','Video']},
]
```
Âu kay, bây giờ chúng ta đã có một chiếc nút upload video như này :
![](https://images.viblo.asia/e231a742-245b-45fb-a0aa-9b1a8df7c100.gif)
Các bạn có thể thấy, nó chưa có nút `Browse Server` để upload file lên, vì mình chưa config đường dẫn server cho plugin `video` . Giờ mình thử thêm 2 dòng này vào file `config.js` :
```js
  config.filebrowserVideoUploadUrl = "/ckeditor/attachment_files";
  config.filebrowserVideoBrowseUrl = "/ckeditor/attachment_files";
```
Và giờ chúng ta đã có thể upload video vào `content` của bài báo, tuy nhiên vẫn có một điều không ổn :
![](https://images.viblo.asia/d9d20788-9c7a-4944-8c7b-b1f04b5aefea.gif)
Như các bạn đã thấy , mình đã thêm đường dẫn `/ckeditor/attachment_files` để làm đường dẫn server upload video. Tuy nhiên server này vốn dùng để upload các file `doc, docx, xls, odt, ods, pdf, rar, zip, tar, tar.gz, sw` nên nó đã thực hiện validate extension khiến file `.mp4` không tải lên server được .
Vậy chúng ta thử thay 2 đường dẫn nói trên bằng `/ckeditor/videos` xem. 
```js
  config.filebrowserVideoUploadUrl = "/ckeditor/videos";
  config.filebrowserVideoBrowseUrl = "/ckeditor/videos";
```
Kết quả là : 
![](https://images.viblo.asia/0bc1da9d-6e81-4228-9e95-4a996add3114.gif)

Như các bạn đã thấy, Rails báo rằng ứng dụng của chúng ta chưa có trang `/ckeditor/videos` . Vậy ở phần 3, mình sẽ hướng dẫn các bạn tạo trang này. 

### 3. Tạo trang upload videos dựa trên gem ckeditor . 
Ý tưởng rất đơn giản, trang upload video giống hệt các trang upload `images` hay `attachment_files` có sẵn trong `gem ckeditor` .Việc các bạn cần làm chỉ là mở `sourecode` của nó ra và copy code của trang upload `images`  về thư mục `app`, chỗ nào cần sửa `images` thành `video` thì chúng ta sửa.

Đầu tiên, thêm `routes` cho trang upload video, ở file `routes.rb` :
```ruby
Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  resource :articles
  Ckeditor::Engine.routes.draw do
    resources :videos, only: [:index, :create, :destroy]
  end
end
```
Các file upload trong content của `Ckeditor` được lưu vào database nhờ model `Ckeditor:Asset`. Các model `Ckeditor:Picture` và `Ckeditor:AttachmentFile` đều kế thừa từ model  `Ckeditor:Asset`, nên ta tạo một model `Ckeditor:Video` tương tự như sau :
```ruby
#models/asset.rb
class Ckeditor::Asset < ActiveRecord::Base
  include Ckeditor::Orm::ActiveRecord::AssetBase

  delegate :url, :current_path, :content_type, to: :data
  validates :data, presence: true
end
```
```ruby
class Ckeditor::Video < Ckeditor::Asset
  mount_uploader :data, CkeditorVideoUploader, mount_on: :data_file_name
  def url_thumb
    @url_thumb ||= ActionController::Base.helpers.asset_path("video.png")
  end
end
```
Tạo một file thumbnail `app/assets/images/video.png.` để hiển thị trên màn hình list video upload . Các bạn có thể tải file[ tại đây.](https://www.geirangerfjord.no/upload/images/2018_general/film-and-vid.jpg)
Tạo thêm một `uploader` cho model nói trên :
```ruby
# frozen_string_literal: true

require 'carrierwave'

class CkeditorVideoUploader < CarrierWave::Uploader::Base
  include Ckeditor::Backend::CarrierWave

  # Include RMagick or ImageScience support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick
  # include CarrierWave::ImageScience

  # Choose what kind of storage to use for this uploader:
  storage :file
  def store_dir
    "uploads/ckeditor/videos/#{model.id}"
  end

  def extension_white_list
    Ckeditor.video_types
  end
end
```
Thêm extension type cho video trong file `ckeditor.rb`
```ruby
require 'active_support/json/encoding'

Ckeditor.module_eval do
  mattr_accessor :video_file_types, :audio_file_types
end

Ckeditor.setup do |config|
  require 'ckeditor/orm/active_record'
  config.video_file_types = %w(mp4 avi webm)
end

Ckeditor::Utils.module_eval do
  class JavascriptCode < String
    def as_json(_options = nil)
      self
    end

    def encode_json(_encoder)
      self
    end
  end

  class << self
    def js_fileuploader(uploader_type, options = {})
      options = { multiple: true, element: 'fileupload', sizeLimit: 1000000000 }.merge!(options)

      case uploader_type.to_s.downcase
      when 'image' then
        options[:action] = JavascriptCode.new('EDITOR.config.filebrowserImageUploadUrl')
        options[:allowedExtensions] = Ckeditor.image_file_types
      when 'flash' then
        options[:action] = JavascriptCode.new('EDITOR.config.filebrowserFlashUploadUrl')
        options[:allowedExtensions] = Ckeditor.flash_file_types
      when 'video' then
        options[:action] = JavascriptCode.new('EDITOR.config.filebrowserVideoUploadUrl')
        options[:allowedExtensions] = Ckeditor.video_file_types
      else
        options[:action] = JavascriptCode.new('EDITOR.config.filebrowserUploadUrl')
        options[:allowedExtensions] = Ckeditor.attachment_file_types
      end

      js_options = ActiveSupport::JSON.encode(options)
      js_options.gsub!(/"(EDITOR\.config\.filebrowser(Image|Flash|Video|Audio|)UploadUrl)"/, '\1')

      "(function() { new qq.FileUploaderInput(#{js_options}); }).call(this);".html_safe
    end
  end
end

```
Thêm controller xử lý upload:
```ruby
#app/controllers/ckeditor/application_controller.rb
class Ckeditor::ApplicationController < Ckeditor.parent_controller.constantize
  layout Ckeditor.controller_layout

  before_action :find_asset, only: [:destroy]
  before_action :ckeditor_authorize!
  before_action :authorize_resource

  protected

  def respond_with_asset(asset)
    asset_response = Ckeditor::AssetResponse.new(asset, request)

    if asset.save
      render asset_response.success(config.relative_url_root)
    else
      render asset_response.errors
    end
  end

  def check_role_type
    return redirect_to root_path if current_admin.just_can_view?
  end
end

```
```ruby
#app/controllers/ckeditor/videos_controller.rb
class Ckeditor::VideosController < Ckeditor::ApplicationController
  skip_before_action :verify_authenticity_token, only: :create, raise: false

  def index
    @videos = Ckeditor::Video.to_adapter.find_all(ckeditor_filebrowser_scope)
    @videos = Ckeditor::Paginatable.new(@videos).page(params[:page])

    respond_to do |format|
      format.html { render layout: @videos.first_page? }
    end
  end

  def create
    @video = Ckeditor::Video.new
    respond_with_asset(@video)
  end

  def destroy
    @video.destroy

    respond_to do |format|
      format.html { redirect_to videos_path }
      format.json { render json: @video, status: 204 }
    end
  end

  protected

  def find_asset
    @video = Ckeditor::Video.to_adapter.get!(params[:id])
  end

  def authorize_resource
    model = (@video || Ckeditor::Video)
    @authorization_adapter.try(:authorize, params[:action], model)
  end
end

```
Thêm view cho trang upload: 
```html

#views/ckeditor/videos/index.html.erb
<div id="fileupload" class="gal-holder">
  <div class="gal-item">
    <div class="fileupload-button gal-upload-holder" style="height: 150px;">
      <%= link_to I18n.t(:upload, scope: [:ckeditor, :buttons]), 'javascript:void(0)', class: "add" %>
    </div>
  </div>

  <div class="fileupload-list">
    <%= render partial: 'ckeditor/shared/asset', collection: @videos %>
  </div>

  <% unless @videos.last_page? %>
    <div class="pagination">
      <%= link_to I18n.t("ckeditor.buttons.next"), ckeditor.videos_path(page: @videos.next_page), class: "next", rel: "next" %>
    </div>
  <% end -%>

  <script type="text/javascript">
    <%= Ckeditor::Utils.js_fileuploader('video') %>
  </script>
</div>

```
```html
#views/ckeditor/shared/_asset_tmpl.html.erb
<script id="fileupload_tmpl" type="text/x-jquery-tmpl">
<div id="asset_${id}" class="gal-item" data-url="${url_content}">
  <div class="fileupload-file gal-inner-holder" style="height: 150px;">
    <div class="img"><img src="${url_thumb}" title="${filename}" width="100%" height="100%"></div>
    <div class="img-data">
      <div class="img-name">${filename.substring(0, 14) + '...'}</div>
      <div class="time-size">
        <div class="time">${format_created_at}</div>
        <div class="fileupload-size size">${size}</div>
      </div>
    </div>
  </div>
</div>
</script>
```
```html
<%= content_tag(:div, id: dom_id(asset), class: "gal-item", data: { url: image_path(asset.url_content) }) do %>
  <div class="fileupload-file gal-inner-holder" style="height: 150px;">
    <div class="img"><%= image_tag(asset.url_thumb, title: asset.filename, style: "width:100%;height: 100%;") %></div>
    <div class="img-data">
      <div class="img-name"><%= truncate(asset.filename, length: 17) %></div>
      <div class="time-size">
        <div class="time"><%= asset.format_created_at %></div>
        <div class="fileupload-size size"><%= number_to_human_size(asset.size) if asset.size %></div>
      </div>
    </div>
  </div>
<% end %>
```

Thế là xong, và giờ chúng ta đã có thể upload những chiếc video xinh xắn vào content :
![](https://images.viblo.asia/b9fec369-f1a9-4af4-813a-14fa92f2d835.gif)
Các bạn hoàn toàn có thể làm điều tương tự với các plugin audio, link,.... 
Bài viết đến đây là kết thúc, hy vọng nó có ích với các bạn. 




-----

References:
https://github.com/galetahub/ckeditor