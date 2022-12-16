Khi nói về việc upload file trong một ứng dụng web, cách mà hầu như chúng ta đều nghĩ đến là sử dụng form với một thẻ `<input type="file">` :
```
<form action="/action_page.php">
  <input type="file" name="pic" accept="image/*">
  <input type="submit">
</form>
```
Cách làm trên tạo ra một trải nghiệm upload file khá tẻ nhạt như thế này:
![](https://images.viblo.asia/c3f7fe6d-fd73-471c-a000-4da963c752a1.gif)

So với cách làm trên, thư viện Dropzone.js cung cấp cho người dùng một trải nghiệm upload file thân thiện hơn rất nhiều như thế này:

![](https://images.viblo.asia/830b0cd0-9d83-4482-b476-d6c34c2f62d9.gif)

Thư viện này cung cấp một hệ thống settings rất rõ ràng và dễ để config lại từ view template, quá trình upload fiile, validate file, .... Các bạn có thể nghiên cứu cách sử dụng nó [tại đây](https://www.dropzonejs.com) .
Còn ở bài viết lần này, mình sẽ hướng dẫn các bạn sử dụng dropzone.js và carrierwave để tạo một media gallery(lưu trữ file video, audio và image) cơ bản dựa trên framework rails. 

### Tạo rails app
Mình sẽ tạo một rails app đơn giản với thông tin như sau:
* Có một bảng Media để lưu lại thông tin các file tải lên.
* Có một trang để thực hiện tải file lên.
* Có một trang để hiển thị tất cả các file đã tải lên.

Đầu tiên, các bạn tạo một rails app cơ bản có cài 2 gem sau
```ruby
#Gemfile
gem 'carrierwave', '~> 2.0'
gem 'dropzonejs-rails'
```
Tạo model Media và một FileUploader
```ruby
class ImageUploader < CarrierWave::Uploader::Base
  storage :file
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end

```
```
class CreateSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :medias do |t|
      t.string :data
      t.timestamps
    end
  end
end
```
```ruby
class Media < ApplicationRecord
  mount_uploader :data, FileUploader
end
```
Bây giờ mình sẽ bắt đầu tạo trang tải file lên. Tạo đường dẫn cho trang đó trước trong file `routes.rb` :
```
resoure :medias, only: [:index, :new]
```
Tạo controller với `action new` tương ứng cho trang tải file lên:
```ruby
class MediasController < ApplicationController  
  def new
  end
end
```
Tạo view cho trang tải file: `new.html.erb`
```html
<div id="mydropzone" class="dropzone col-md-8">
   <p class="row text-center">Kéo, thả file vào đây hoặc</p>
   <div class="text-center"><button type="button" id="upload_button" class="row">chọn nút này để tải file lên</button></div>
</div>
```
Và chúng ta sẽ được 1 cái view như thế này.

![](https://images.viblo.asia/f80ae260-1b00-4b46-bfc4-bd2410776f89.png)

Bây giờ chúng ta sẽ xử lý upload file thông qua các hàm của thư viện dropzone trong 1 file javascript, mình đêt tên nó là `upload.js`.
Đầu tiên, thêm file `upload.js` vào asset pipelines:
```
//= require upload
```
Tạo file `app/assets/javascripts/upload.js`
```javascript
var dropzone = new Dropzone ("#mydropzone", {
  dictDefaultMessage: "",
  uploadMultiple: true,
  url: "/medias",
});
```
Ở file js trên, ta khởi tạo một đối tượng Dropzone với các thuộc tính:
* `dictDefaultMessage`: Là message hiển thị trong các element có class là .dropzone. Ở đây mình để trống để custom lại view.
* `uploadMultiple: true` .  Cho phép bạn lựa chọn upload nhiều file. 
* `url:` là đường dẫn để thực hiện POST request sau khi file tải lên.
Hiện tại khi click vào `div#mydropzone` sẽ có cửa sổ upload file hiện lên như thế này:
![](https://images.viblo.asia/11c8454c-c78a-4b69-88e3-f8ee9250e12a.gif)
Nhưng mình muốn **chỉ khi** click vào `button` `chọn nút này để tải file lên`thì mới có cửa sổ chọn file hiện lên, nên mình sẽ custom thêm 1 thuộc tính `clickable` :
```javascript
var dropzone = new Dropzone ("#mydropzone", {
  dictDefaultMessage: "",
  uploadMultiple: true,
  clickable: "#upload_button",
  url: "/medias",
});
```
Giờ thì có vẻ nó đã hoạt động theo đúng ý mình :
![](https://images.viblo.asia/cac1bae1-eaad-4924-9d60-6e1ace0163d1.gif)

Bây giờ, mặc định khi bạn chọn file trong cửa sổ vừa hiện lên hoặc kéo/thả file vào `div#dropzone` như thế này thì một request `POST /medias` sẽ được thực hiện:
![](https://images.viblo.asia/4b7ee330-11ba-4203-abd6-52526e3a334c.gif)
Và dữ liệu mà nó truyền lên server trong params sẽ như thế này:
```
 Parameters: {"file"=>{"0"=>#<ActionDispatch::Http::UploadedFile:0x00007f04db706b10 @tempfile=#<Tempfile:/tmp/RackMultipart20191120-8117-eh06il.png>, @original_filename="2.png", @content_type="image/png", @headers="Content-Disposition: form-data; name=\"file[0]\"; filename=\"2.png\"\r\nContent-Type: image/png\r\n">, "1"=>#<ActionDispatch::Http::UploadedFile:0x00007f04db7068e0 @tempfile=#<Tempfile:/tmp/RackMultipart20191120-8117-1qp6iy5.png>, @original_filename="3.png", @content_type="image/png", @headers="Content-Disposition: form-data; name=\"file[1]\"; filename=\"3.png\"\r\nContent-Type: image/png\r\n">, "2"=>#<ActionDispatch::Http::UploadedFile:0x00007f04db7067c8 @tempfile=#<Tempfile:/tmp/RackMultipart20191120-8117-pgbwmo.png>, @original_filename="4.png", @content_type="image/png", @headers="Content-Disposition: form-data; name=\"file[2]\"; filename=\"4.png\"\r\nContent-Type: image/png\r\n">, "3"=>#<ActionDispatch::Http::UploadedFile:0x00007f04db706700 @tempfile=#<Tempfile:/tmp/RackMultipart20191120-8117-1d6xdsn.png>, @original_filename="5.png", @content_type="image/png", @headers="Content-Disposition: form-data; name=\"file[3]\"; filename=\"5.png\"\r\nContent-Type: image/png\r\n">}}
```
Bây giờ mình sẽ xử lý phía server để có thể lưu dữ liệu này vào trong db
```ruby
class MediasController < ApplicationController  
  def new
  end
  
  def create
    params[:file].each do |key, file|
      Media.create data: params[:file]
    end
  end
end
```
Như vậy là dữ liệu, sau khi được upload sẽ được lưu trực tiếp vào database. Giờ mình muốn xử lý , để ngay sau khi upload tất cả các file thành công thì redirect đến trang hiển thị list tất cả các ảnh . 
Đầu tiên, ta xử lý sự kiện `successmultiple` cho biến `dropzone` như sau:
```
var dropzone = new Dropzone ("#mydropzone", {
  dictDefaultMessage: "",
  uploadMultiple: true,
  url: "/medias",
  successmultiple: {
      window.location.href = '/medias';
  }
});
```
Với việc xử lý như trên, sau khi tất cả các file được upload thành công, trình duyệt sẽ tự động redirect sang trang hiển thị list `/medias`.
Ta tạo cho trang hiển thị list:
```ruby
class MediasController < ApplicationController  
  def new
  end
  
  def index
    @medias = Media.all
  end
  
  def create
    params[:file].each do |key, file|
      Media.create data: params[:file]
    end
  end
end
```
```ruby
#medias/index.html.erb
<% @medias.each do |media| %>
<%= image_tag media.url, size: "100x100"%>
<% end %>
```
Và cùng xem phần xử lý:
![](https://images.viblo.asia/a31d183d-b5d7-4c1f-9473-130dfdad4032.gif)

### Validate ở client_size với dropzone.js
Ở đây, mình chỉ muốn upload các file với định dạng `".jpg, .png, .mp4, .mp3"` và file có size nhỏ hơn 10Mb thì có thể thêm 2 thuộc tính vào biến dropzone là `acceptedFiles` và `maxFilesize`
```javascript
var dropzone = new Dropzone ("#mydropzone", {
  dictDefaultMessage: "",
  uploadMultiple: true,
  url: "/medias",
  acceptedFiles: ".jpg, .png, .mp4, .mp3",
  maxFilesize: 10,
  successmultiple: {
      window.location.href = '/medias';
  }
});
```

Và error message sẽ được hiển thị như sau:
![](https://images.viblo.asia/35e400a8-6f23-45f8-b708-19e32569a248.gif)

Ngoài ra, còn rất nhiều thuộc tính và sự kiện khác mà bạn có thể custom [tại đây](https://www.dropzonejs.com) .
Bài viết của mình tạm dừng ở đây. 



-----

Tài liệu tham khảo: https://www.dropzonejs.com/