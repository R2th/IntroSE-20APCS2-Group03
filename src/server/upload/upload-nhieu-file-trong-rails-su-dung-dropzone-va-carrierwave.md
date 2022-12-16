![](https://images.viblo.asia/54e4fb5b-ca24-4cff-9a75-4fc92185cc9e.png)

[DropzoneJS](https://www.dropzonejs.com/) là 1 thư viện mã nguồn mở cho phép bạn tải các tệp lên bắng cách kéo thả có ảnh thumnail hiển thị. So với các input file bình thường thì giao diện cũng khá xấu và chức năng của nó cũng hạn chế thì thư viện dropzone có khả năng tùy biến mạnh. Bài viết này mình xin giới thiệu cách cài đặt dropzone và làm upload ảnh cơ bản sử dụng carrierwave.

# Cài đặt dropzonejs
Với Rails chúng ta sử dụng gem [dropzonejs-rails](https://github.com/ncuesta/dropzonejs-rails) để cung cấp các file js của dropzone 1 cách nhanh chóng vào ứng dụng của bạn

```
gem 'dropzonejs-rails'
```
```
$ bundle install
```

Sau đó, bạn cần add `dropzone.js` vào file `application.js`:
```
//= require dropzone
```

Nếu bạn muốn sử dụng style của dropzone, add vào `application.css`:
```
*= require dropzone/basic
```
hoặc:
```
*= require dropzone/dropzone
```

Như vậy chúng ta đã cài đặt xong dropzone vào ứng dụng Rails của mình. :D 

# Tạo form upload
Mình sử dụng [CarrierWave](https://github.com/carrierwaveuploader/carrierwave) để upload file. Để sử dụng ta add thêm nó vào gemfile:
```
gem 'carrierwave'
```
Tạo uploader cho Media:
```
rails g uploader media
```
Tạo model Media:
```
rails g model media file_name:string

class Medium < ApplicationRecord
  mount_uploader :file_name, MediaUploader
end

```

Tạo mới 1 controller xử lý khi upload:

```
rails g controller media_contents


class MediaContentsController < ApplicationController
  def create
    @media = Medium.new(file_name: params[:file])
    if @media.save!
      respond_to do |format|
        format.json{ render :json => @media }
      end
    end
  end
end
```
Thêm vào routes:
```
resources :media_contents, only: [:new, :create]
```

Tại view, `media_contents/new.html.erb`:
```
<%= form_tag '/media_contents', method: :post, class: "dropzone", id: "media-dropzone" do %>
  <div class="fallback">
    <%= file_field_tag "media", multiple: true %>
  </div>
<% end %>
```

Khi form được submit, file sẽ được save. Sau đó ta nhận dữ liệu dưới dạng json trả về:

```
respond_to do |format|
 format.json{ render :json => @media }
end
```

Ở client: Ta có thể bắt sự kiện khi save thành công sẽ trả về thông tin của medium
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

Như vậy ta đã xây dựng xong upload cơ bản sử dụng dropzone.
![](https://images.viblo.asia/de7994a7-a414-4fd7-acd4-115bc017a94f.png)

Bạn có thể kéo code về và chạy thử :D
https://github.com/ngocvu3010/dropzone
# Các event của dropzone
Dropzone trigger nhiều event khi xử lý file, chúng ta có thể bắt các event 1 cách dễ dàng bằng cách gọi `.on(eventName, callbackFunction)` trên instance mình khai báo. Ví dụ:
```
$(function() {
  // Now that the DOM is fully loaded, create the dropzone, and setup the
  // event listeners
  var myDropzone = new Dropzone("#my-dropzone");
  myDropzone.on("addedfile", function(file) {
    /* Maybe display some more file information on your page */
  });
})
```
Bạn có thể tham khảo danh sách các event mà dropzone cung cấp tại [dropzone events](https://www.dropzonejs.com/#event-drop)

# Các config dropzone
Bạn có thể thêm các config bằng cách thêm vào đối tượng `Dropzone.options`. Ví dụ:

```
// "myAwesomeDropzone" is the camelized version of the HTML element's ID
Dropzone.options.myAwesomeDropzone = {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 2, // MB
  accept: function(file, done) {
    if (file.name == "justinbieber.jpg") {
      done("Naha, you don't.");
    }
    else { done(); }
  }
};
```
Bạn có thể tham khảo danh sách các config có thể setting tại [Configuration](https://www.dropzonejs.com/#configuration)

Bài viết cung cấp các bước cơ bản để cài đặt và sử dụng Dropzone. Hi vọng có thể giúp ích được cho bạn :D 

**Nguồn tham khảo**:

https://medium.com/rails-ember-beyond/ajax-file-upload-in-rails-using-dropzone-and-carrierwave-6f5436fdfdb0

https://www.dropzonejs.com/