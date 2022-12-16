## **I. Giới thiệu**

Bài viết này trình bày cách tải ảnh trực tiếp lên amazon s3 bằng ứng dụng ruby on rails kết hợp với thư viện Jquey Fileupload. Mặc dù có rất nhiều giải pháp tải ảnh lên S3 phổ biến cho Ruby on rails như Paperclip hoặc CarrierWave, nhưng các cách này đều sử dụng bộ nhớ cache của server.

Họ thường tải tệp lên server sau đó tệp được truyền đến S3. Mặc dù nó hoạt động tốt đối với các tệp nhỏ nhưng các tệp lớn hơn có thể bị xóa khỏi dyno trước khi chúng được tải lên S3.

Một giải pháp thay thế việc trên, nó ổn định hơn nhờ việc tải trực tiếp ảnh lên S3 từ phía client. Khi hình ảnh được tải lên, chỉ việc lưu URL tham chiếu trong cơ sở dữ liệu.

Nhược điểm duy nhất của cách này là logic sẽ được thực hiện ở trên client.

## **II. Thực hiện**

Bài viết này sử dụng thư viện Jquery-File-Upload và gem aws. Có nhiều thư viện khác như carrierwave cũng có thể cho phép bạn tải trực tiếp hình ảnh lên S3, tuy nhiên nếu kiến thức hạn chế về cách thực hiện ở bên client cũng có thể gây cho bạn gặp chút khó khăn.

Bằng cách sử dụng Jquery-File-Upload chúng ta sẽ tạp ra 1 đoạn mã javascript tương đối dễ đọc và hiểu và nó có thể được tái sử dụng tại bất kì chỗ nào bằng cách sử dụng 1 đầu vào là 1 input file ảnh.
Giao diện người dùng cũng có thể được tùy biến, hành vi từ góc độ người dùng cũng rất đơn giản. Về phía Rails sẽ tạo ra 1 AWS presigned-post và lưu URL hình ảnh trong cơ sở dữ liệu.

## **III. Ví dụ**

Giả sử bạn đã có 1 model User trong ứng dụng rails của mình và bạn muốn lưu hình đại diện (avatar) cho mỗi user ở trên S3. Nếu bạn chưa có, hãy tạo chúng bằng các lệnh sau:

```
rails new direct-s3-example
cd direct-s3-example
rails generate scaffold user name avatar_url
      invoke  active_record
      create    db/migrate/20140519195131_create_users.rb
      create    app/models/user.rb
      invoke    test_unit
      create      test/models/user_test.rb
      create      test/fixtures/users.yml
      # ...
```

Migrate DB để có bảng dữ liệu User trong database của bạn:
```
rake db:migrate
```

## **IV. S3**

Trước khi bạn có thể gửi file lên S3 thì bạn cần phải có 1 tài khoản S3 và cấu hình của 1 bucket. Nếu chưa có bạn hãy theo dõi [ở đây](https://devcenter.heroku.com/articles/s3) .

## **V. S3 sdk**

Chúng ta sẽ sử dụng Amazon Ruby SDK cho việc tích hơp S3. Thêm vào trong file Gemfile:
```
gem 'aws-sdk', '~> 2'
```

Sau đó chạy `bundle install` để cài đặt. Về phía local development chúng ta sẽ sử dụng .env file để lưu trữ các biến và các key dùng cho S3.
```
cat .env
S3_BUCKET=my-s3-development
AWS_ACCESS_KEY_ID=EXAMPLEKVFOOOWWPYA
AWS_SECRET_ACCESS_KEY=exampleBARZHS3sRew8xw5hiGLfroD/b21p2l
```

Khi bạn đã có đầy đủ các biến môi trường bạn cần tạo 1 S3 object để dùng trong controller. Tạo nó ra ở trong file `config/initializers/aws.rb`. Ở đây chúng ta sẽ cấu hình AWS và tạo ra biến S3.

```
Aws.config.update({
  region: 'us-east-1',
  credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY']),
})

S3_BUCKET = Aws::S3::Resource.new.bucket(ENV['S3_BUCKET'])
```

## **VI. Cross origin support**

Theo mặc định, trình duyệt sẽ không cho phép bạn thực hiện bất kì đoạn mã javascript nào đến các dịch vụ khác ngoài trang được hiển thị. Nếu việc bảo vệ này không tồn tại, khi bạn đăng nhập bất kì trang web nào họ có thể gửi yêu cầu tới các dịch vụ khác (như Facebook hoặc Github), và nếu như bạn đã đăng nhập, họ có thể nhận được giữ liệu riêng tư. May mắn thay cơ chế này được xấy dựng theo mặc định nhưng nó cũng ngăn cho chúng ta gửi tệp đến bất kì url nào khác với url chúng ta đang truy cập. Vì vậy, theo mặc định chúng ta không thể sử dụng javascript để gửi tệp từ trang web của chúng ta tới S3. Để kích hoặt chức năng này, chúng ta phải sử dụng CORS.

CORS là viết tắt của Cross Origin Resource Sharing và về cơ bản cho phép bạn đưa vào danh sách nơi request HTTP có thể đến. Vì vậy chúng ta phải nói với S3 bucket sẽ chấp nhận tệp từ javascript được gửi từ máy chủ của chúng ta. 

Chúng ta cần 2 bucket khác nhau cho sản phẩm và cho việc phát triển. Ở bucket develop, bạn cần sửa đổi cài đặt CROS của bạn. Dưới đây là cách sửa để cho phép máy tính của bạn chạy ở địa chỉ localhost:3000 gửi tệp tới AWS:

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <CORSRule>
    <AllowedOrigin>http://localhost:3000</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
  </CORSRule>
</CORSConfiguration>
```

## **VII. Pre-signed post**

Chúng ta sẽ sử dụng một pre-signed POST được tạo trước cho chúng ta từ gem AWS. Pre-signed URLs rất hữu ích nếu bạn muốn người dùng/khách hàng của bạn có thể tải lên một đối tượng cụ thể vào bucket của bạn, nhưng bạn không yêu cầu họ phải có quyền/ủy quyền bảo mật của AWS. 

Mở `app/controllers/users_controller.rb`, nó sẽ trông giống như thế này:

```
class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

...

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

end
```

Chúng ta muốn biến `@s3_direct_post` khi tạo và chỉnh sửa user, hãy thiết lập nó ở trong before_action:

```
class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :set_s3_direct_post, only: [:new, :edit, :create, :update]

...

private
  def set_s3_direct_post
    @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
  end
end
```

Có khá nhiều thứ đang xảy ra ở đây, do đó, đây là bảng phân tích các tùy chọn cho phương thức presigned_post:

Điều quan trọng ở đây là nơi mà đối tượng sẽ tồn tại trong S3. Trong S3 bạn không thể có các khóa trùng lặp. AWS hỗ trợ ${filename} tùy chỉnh. Trong khi cú pháp trông giống như chuỗi được chèn vào mã Ruby thì đây là chuỗi mà AWS hiểu nó có ý nghĩa đặc biệt. Chỉ thị ${filename} này cho S3 biết rằng nếu người dùng tải lên 1 tệp có tên là pic.png, sau đó S3 sẽ lưu trữ tập tin cuối cùng có cùng tên là pic.png. Chúng ta muốn đảm bảo rằng 2 người khác nhau có cùng tên tệp có thể lưu trữ hình đại diện của họ bằng cách thêm SecureRandom.uuid. 

## **VIII. Client side code**

Bây giờ chúng ta đã có pre-signed post, chúng ta có thể sử dụng thông tin trong đối tượng để gửi ảnh tới S3 từ phía máy khách.

Vì chúng ta không thể dựa vào việc máy chủ của chúng ta giống như bộ đệm cache, mà chúng ta phải sử dụng javascript từ phía máy khách để tải ảnh tới S3. HTML5 giới thiệu cho chúng ta một API về file, tiếc là nó không được hỗ trợ cho IE dưới phiên bản 10. Để giải quyết vấn đề này chúng ta sẽ sử dụng [JqueryFile Upload plugin](https://github.com/blueimp/jQuery-File-Upload).

## **IX. Prepare the view**

Để hoàn tất quá trình tải lên S3, trước tiên chúng ta phải gửi tệp đến S3, sau đó lưu trữ URL trong cơ sở dữ liệu. Chúng ta cần 1 trường avatar_url trong model User.

Trong Javascript, chúng ta sẽ cần 1 số cách để xác định các trường có chứa hình ảnh mà chúng ta muốn tải lên S3. Trước tiên chúng ta cần mở form mà có trường tải tệp lên:

```
<%= form_for(@user, html: { class: "directUpload" }) do |f| %>
  <% if @user.errors.any? %>
    <div id="error_explanation">
  <!-- ... -->
```

Chúng ta cần gửi 1 số dữ liệu S3 cụ thể khi tải tệp. Và chúng ta sẽ đặt dữ liệu này vào form và sẽ dùng chúng trong javascript:

```
<%= form_for(@user, html: { class: 'directUpload', data: { 'form-data' => (@s3_direct_post.fields), 'url' => @s3_direct_post.url, 'host' => URI.parse(@s3_direct_post.url).host } }) do |f| %>
```

Thêm trường avatar_url trong form phải là file_field:

```
<div class="field">
  <%= f.label :avatar_url %><br>
  <%= f.file_field :avatar_url %>
</div>
```

## **X. Detecting file field on the client side**

Tại thời điểm này, chúng ta đã có thư việc javascript để tải ảnh lên S3, chúng ta đã có 1 bucket S3 và 1 pre-signed post, một đội tượng hợp lệ được đăng kí trước, model User với trường avatar_url. Chúng ta cần đưa hình ảnh của user lên S3 và lưu trữ Url trở thành hình đại diện, đây sẽ là 1 quá trình rất thủ công, chủ yếu thông qua javascript:

```
$(function() {
  $('.directUpload').find("input:file").each(function(i, elem) {
    var fileInput    = $(elem);
    var form         = $(fileInput.parents('form:first'));
    var submitButton = form.find('input[type="submit"]');
    var progressBar  = $("<div class='bar'></div>");
    var barContainer = $("<div class='progress'></div>").append(progressBar);
    fileInput.after(barContainer);
  });
});
```

Thêm 1 chút css:

```
.progress {
  max-width: 600px;
  margin:    0.2em 0 0.2em 0;
}

.progress .bar {
  height:  1.2em;
  padding-left: 0.2em;
  color:   white;
  display: none;
}
```

## **XI. Finished jquery-file-upload code**

Bây giờ chúng ta đã có tất cả các yếu tố cần thiết, có thể gọi `fileInput.fileupload({})` trên mỗi đầu vào của tập tin và truyền vào các tùy chọn. Chúng ta thêm các callback sau:

```
$(function() {
  $('.directUpload').find("input:file").each(function(i, elem) {
    var fileInput    = $(elem);
    var form         = $(fileInput.parents('form:first'));
    var submitButton = form.find('input[type="submit"]');
    var progressBar  = $("<div class='bar'></div>");
    var barContainer = $("<div class='progress'></div>").append(progressBar);
    fileInput.after(barContainer);
    fileInput.fileupload({
      fileInput:       fileInput,
      url:             form.data('url'),
      type:            'POST',
      autoUpload:       true,
      formData:         form.data('form-data'),
      paramName:        'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
      dataType:         'XML',  // S3 returns XML if success_action_status is set to 201
      replaceFileInput: false
    });
  });
});
```

Đây là tất cả mọi thứ bạn cần để gửi trực tiếp tệp lên S3 từ phía client. Cảm ơn các bạn đã theo dõi bài viết này. Trong bài viết lần sau tôi sẽ giải thích cách mà JqueryFile-Upload hoạt động và các hàm tiện ích có trong Jquery FileUpload.