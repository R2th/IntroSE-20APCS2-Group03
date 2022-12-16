## Vấn đề
 Cho phép người dùng tải lên tập tin lớn lên server. Việc tải lên 1 file trong rails rất dễ dàng, nhưng chỉ khi tệp nhỏ. Hãy thử tải lên tệp có dung lượng trên 1 GB web của bạn sẽ treo trong một thời gian dài, điều này sẽ gây khó chịu cho người dùng, họ không hiểu chuyện gì đang xảy ra. Đó là bởi vì thời gian để chuyển tệp từ client sang server qua http quá dài. Một cách để giải quyết vấn đề này là tải lên tệp ở kích thước nhỏ hơn và kết hợp các tệp tin tải lên nhỏ trở lại khi quá trình tải lên hoàn tất. Để làm được điều đó, chúng ta cần một cách để chia tệp thành nhiều phần nhỏ hơn và gửi lên máy chủ. Và jQuery có một plugin hỗ trợ việc này.
## 1. Cài đặt.
Ở đây mình sử dụng gem để cài đặt plugin.
```ruby 
gem "jquery-fileupload-rails"
```
application.js
```ruby
# require tất cả
//= require jquery-fileupload

# require chỉ những cái mình sử dụng để upload video
//= require jquery-fileupload/basic
//= require jquery-fileupload/jquery.fileupload
//= require jquery-fileupload/jquery.fileupload-process
//= require jquery-fileupload/jquery.fileupload-video
```
application.css
```ruby
*= require jquery.fileupload
*= require jquery.fileupload-ui
```
## 2. Sử dụng.
### a. tạo form.
đầu tiên thì phải tạo form để người dùng có thể chọn 1 file.
```ruby
<%= form_for @video class: "form-horizontal form-bordered" do |f| %>
    <%= f.file_field :path, class:"upload-video",  accept: "video/mp3, video/mp4, video/3gp" %>
    
    <div id="progress">
      <div class="bar bar-upload"></div>
    </div>
    
    <%= f.button "upload", class: "btn btn-sm btn-primary" %>
  <% end %>
```
progess sẽ là phần hiển thị phần trăm file đã được tải lên.
### b. Client.
Bây giờ chúng ta sẽ chia file ra nhiều phần nhỏ hơn và tiến hành upload.
```jquery
$(document).ready(function () {
  var files = [];
  $('#new_video').on('submit', function(e) {
    e.preventDefault();
    if (files.length < 1) return;
    $.each(files, function(index, file) {
      file.submit();
    });
    files = [];
  });
  $('#new_video').fileupload({
    dataType: 'json',
    method: 'post',
    url: '/videos/upload',
    maxChunkSize: 10000000,  //KB mỗi lần tải lên. 10MB
    add: function(e, data) {
        $.each(data.files, function(index, file) {
          $('#name-file').text(file.name);
          $.ajax({
            method: 'post',
            dataType: 'json',
            url: '/videos',
            data: {filename: file.name},
            success: function(res) {
              data.formData = res;
              files = [];
              files.push(data);
          }
        });
      });
    },
    // function này sẽ tính toán và hiển thị % upload
    progressall: function(e, data) {
      var done = parseInt(data.loaded * 100) / data.total
      $('#progress .bar').css({ width: done + '%'});
    }
  });
});
```
Đầu tiên thì phía client sẽ thực hiện 1 post request lên controller để create record. Và sau đó sẽ post từng phần của file lên server.
### c. Controller
Server.
Tạo record trong db của chúng ta.
```ruby
def create
    filename = params[:filename]
    uuid = SecureRandom.uuid
    ext  = File.extname(filename)
    dir  = Rails.root.join('public', 'uploads').to_s
    FileUtils.mkdir_p(dir) unless File.exist?(dir)
    @video = Video.new name: filename,
      path: File.join(dir, "#{uuid}#{ext}")
    if @video.save
      render json: {id: @video.id, uploaded_size: @video.uploaded_size}
    else
      render json: {error: @video.errors}
    end
  end
```
Tiếp theo thì chúng ta sẽ nhận được dữ liệu từ client gửi lên. Dữ liệu sẽ được gửi liên tục đến khi hết file. ở đây chúng ta sẽ thực hiện nối file. tương tự dữ liệu trả về sẽ là id và size đã upload được để chúng ta có thể tính toán và hiển thị % upload
```ruby
def upload
     @video = Video.find_by id: params[:id]
    if @video && params[:video][:path]
      file = params[:video][:path]
      @video.uploaded_size += file.size
      if @video.save
        File.open(Rails.root.to_s + '/public/uploads' + @video.path,
         'ab'){|f| f.write(file.read)}
        render json: {id: @video.id, uploaded_size: @video.uploaded_size}
      else
        render json: {error: @video.errors}
      end
    end
  end
  ```