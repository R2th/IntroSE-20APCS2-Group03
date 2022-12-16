Sau đây chúng ta sẽ tham gia hành trình của một Request trong một ứng dụng rails, bắt từ máy chủ web đến phương thức của controller và ngược dòng trở lại với response. Điều này sẽ cho bạn một cái nhìn thoáng qua về cách Rails hoạt động ngầm, chúng ta cũng sẽ thấy một số thiết kế/kiến trúc cốt lõi của Rails.

### Tiền điều kiện: Rack

Nếu bạn đã hiểu về Rack, bạn có thể bỏ qua phần này.

Bởi vì Rails được xây dựng bọc ngoài Rack, bài viết này sẽ không có ý nghĩa gì trừ khi bạn biết Rack. Tôi đặc biệt khuyên bạn nên [đọc tài liệu chính thức](https://www.rubydoc.info/github/rack/rack/master/file/SPEC) (nó khá ngắn) nhưng tôi vẫn sẽ giải thích qua về rack ở đây:

Rack cung cấp một interface gọn nhất, dưới dạng module và dễ thích ứng để phát triển các ứng dụng web bằng Ruby. Bằng cách gói các HTTP request và response theo cách đơn giản nhất có thể, nó hợp nhất và chắt lọc API cho các máy chủ web, web framework và phần mềm ở giữa (cái gọi là phần mềm trung gian) vào một lần gọi method duy nhất.

Ứng dụng Rack là đối tượng xử lý các yêu cầu web và trả lời phản hồi. Đây là một lớp ứng dụng Rack đơn giản:

```ruby

class ComplimentApp
  def call(env)
    [200, {'Content-Type' => 'text/plain'}, ["I like your shoes"]]
  end
end
```

Chỉ có một phương thức mà ứng dụng rack phải thực hiện: phương thức #call. Phương thức này nhận request dưới dạng đối số và trả về một mảng làm kết quả phản hồi.

Web request được thể hiện dưới dạng hash. Chuỗi hash này được gọi là “request environment", thường được viết tắt là "env" , nó chứa tất cả thông tin về yêu cầu, như phương thức HTTP, tên host của máy chủ, đường dẫn URL, v.v.

Response được biểu diễn dưới dạng mảng ba phần tử. Phần tử đầu tiên là mã trạng thái HTTP. Phần tử thứ hai là một hàm băm của các tiêu đề HTTP. Phần tử thứ ba là phần thân của response, có thể là bất kỳ đối tượng nào trả lời #each, chỉ nhận dạng chuôi. Trong ví dụ trên, phần thân phản hồi là một mảng có một chuỗi hợp lệ.

Đây là cách Rails và hầu hết các Ruby web framework khác tương tác với các máy chủ. Khi máy chủ nhận được yêu cầu HTTP, nó sẽ chuyển đổi yêu cầu đó thành hash env và gọi ứng dụng rack của bạn. Ứng dụng rack trả về một response mà máy chủ sẽ gửi lại cho trình duyệt.

### The Rack Entry Point

Các ứng dụng Rack xác định điểm vào của chúng trong tệp config.ru và Rails cũng không có gì khác biệt. Nhìn vào tập tin config.ru, chúng ta sẽ thấy điều này:

```ruby

require_relative 'config/environment'
run Rails.application
```

run Rails.application trả về một instance của các lớp trong ứng dụng của bạn, được định nghĩa trong config/application.rb. Tôi đặt tên cho ứng dụng của mình là Endoscopy, vì vậy đối tượng của tôi là một instance của Endoscopy::Application.

Tương tự với tất cả các ứng dụng rack, instance của ứng dụng này phải đáp trả phương #call. Điều này được triển khai trong lớp Rails::Engine, nó trông như thế này:

```ruby

def call(env)
  req = build_request env
  app.call req.env
end
```

Việc chạy build_request sẽ hợp nhất một loạt các giá trị vào env. Những giá trị này có thể truy cập được đối với tất cả các phần mềm trung gian và bộ điều khiển. Dưới đây là danh sách các khóa được thêm vào:

*     action_dispatch.parameter_filter
*     action_dispatch.redirect_filter
*     action_dispatch.secret_token
*     action_dispatch.secret_key_base
*     action_dispatch.show_exceptions
*     action_dispatch.show_detailed_exceptions
*     action_dispatch.logger
*     action_dispatch.backtrace_cleaner
*     action_dispatch.key_generator
*     action_dispatch.http_auth_salt
*     action_dispatch.signed_cookie_salt
*     action_dispatch.encrypted_cookie_salt
*     action_dispatch.encrypted_signed_cookie_salt
*     action_dispatch.cookies_serializer
*     action_dispatch.cookies_digest
*     action_dispatch.routes
*     ROUTES_70198900278360_SCRIPT_NAME
*     ORIGINAL_FULLPATH
*     ORIGINAL_SCRIPT_NAME

Các đối tượng của ứng dụng cũng là một loại rack middleware. Nó thêm mọi thứ vào hash env, và sau đó chuyển nó sang ứng dụng rack tiếp theo. Trong trường hợp này, ứng dụng tiếp theo là một instance của Rack::Sendfile, đây là dấu hiệu cho biết dòng chảy ứng dụng đang đi vào vùng chứa middleware.

### Middleware

Rack middleware là các application object có chức năng gọi tới các application object khác. Điều này cho phép  thực hiện hai điều:

*      Sửa đổi env trước khi nó được chuyển sang ứng dụng tiếp theo
*      Sửa đổi phản hồi trả về từ ứng dụng tiếp theo

Rails cung cấp một loạt các middleware được mặc định sử dụng. Dưới đây là danh sách được sắp xếp của tất cả các middleware trong môi trường phát triển:


    Rack::Sendfile – Makes responses from files on disk
    ActionDispatch::Static – Responds to requests for static files
    ActionDispatch::Executor – Undocumented ¯\_(ツ)_/¯
    ActiveSupport::Cache::Strategy::LocalCache::Middleware – Response caching
    Rack::Runtime – Response time measurement
    Rack::MethodOverride – Overrides the HTTP request method based on the _method param
    ActionDispatch::RequestId – Gives each request a unique id
    Sprockets::Rails::QuietAssets – Silences logging on requests for sprockets assets
    Rails::Rack::Logger – Request logging
    ActionDispatch::ShowExceptions – Makes responses for unhandled exceptions
    WebConsole::Middleware – Interactive console for running code on the server
    ActionDispatch::DebugExceptions – Logging and debug info pages for unhandled exceptions
    ActionDispatch::RemoteIp – Determines the IP address of the client
    ActionDispatch::Callbacks – Runs callbacks before/after/around each request
    ActiveRecord::Migration::CheckPending – Raises an exception if there are pending migrations
    ActionDispatch::Cookies – Cookie serialization and encryption
    Rack::Session::Abstract::Persisted – Session management
    Rack::Head – Removes response body from HEAD requests
    Rack::ConditionalGet – HTTP caching
    Rack::ETag – HTTP caching

Khi yêu cầu đã được chuyển qua tất cả 20 đối tượng middleware, nó sẽ đi vào route.

### Routing

Tất cả các route của bạn được lưu trữ bên trong một phiên bản ActionDispatch::Routing::Routeset khi chạy. Đối tượng này cũng có chức năng như một ứng dụng rack gửi các yêu cầu đến controller. Đây là ứng dụng được gọi sau tất cả các middleware đã thực hiện xong.

Điều đầu tiên xảy ra là env request được chuyển đổi thành đối tượng ActionDispatch::Request. Trong khi hash env là các biểu diễn chung của một request, các đối tượng request này chứa chức năng dành riêng cho Rails.

Đối tượng request sau đó được sử dụng để tìm route chính xác để gửi đến, bao gồm controller và action method tương ứng.

Tiếp theo, một đối tượng response trống được tạo, đó là một thể hiện của ActionDispatch::Feedback.

Cuối cùng, bộ điều khiển được gọi thông qua phương thức lớp #dispatch, như sau:

control_group.dispatch (hành động, yêu cầu, phản hồi)

Route được thực hiện theo cách tương tự như Rack middleware, nhưng không hoàn toàn giống nhau. Các bộ route không gửi đến các ứng dụng rack khác, nó gửi đến các class controller. Các class controller không phải là ứng dụng rack - chúng trả về các phản hồi tương thích với Rack, nhưng được gọi thông qua một API khác.

### The Controller

Điểm vào controller là class method #dispatch, được triển khai trong ActionContoder::Metal. Đây là cách thực hiện:

```ruby

def self.dispatch(name, req, res)
  if middleware_stack.any?
    middleware_stack.build(name) { |env| new.dispatch(name, req, res) }.call req.env
  else
    new.dispatch(name, req, res)
  end
end
```

Ngoài các middleware mà chúng ta đã thấy ở trên, mỗi class controller có thể có các middleware riêng.

Có middleware hay không, class controller vẫn sẽ tạo một thể hiện mới của chính nó và chuyển tiếp các đối số sang phương thức #dispatch. Điều này có nghĩa là mỗi yêu cầu được xử lý bởi một đối tượng điều khiển mới.

Đây là cách triển khai phương thức cá thể #dispatch, từ ActionControll :: Metal:

```ruby

def dispatch(name, request, response)
  set_request!(request)
  set_response!(response)
  process(name)
  request.commit_flash
  to_a
end
```

Điều đầu tiên mà controller object thực hiện là lưu trữ các đối tượng request và response. Điều này có lý vì hai cái này có thể được truy cập từ bất kỳ phương thức nào trong bộ điều khiển.

Sau đó sẽ đến lượt gọi process(name), cuối cùng gọi method chính xác - mã mà bạn đã tự viết.

Dưới đây là danh sách cuộc gọi giữa phương thức #dispatch và action method. Hãy nhớ rằng đây là tất cả các phương thức được gọi trên một controller object duy nhất.

    ActionView::Rendering#process – Sets/restores global I18n config
    AbstractController::Base#process – Resets @_action_name and @_response_body, and raises an exception if the action is not found.
    ActiveRecord::Railties::ControllerRuntime#process_action – Resets runtime measurements for ActiveRecord query logging
    ActionController::ParamsWrapper#process_action – Wraps params inside a hash
    ActionController::Instrumentation#process_action – Per-request instrumentation
    ActionController::Rescue#process_action – Calls rescue_from blocks when exceptions are raised.
    AbstractController::Callbacks#process_action – Runs callbacks before/after/around the action method
    ActionController::Rendering#process_action – Sets self.formats
    AbstractController::Base#process_action – Does nothing except call #send_action
    ActionController::BasicImplicitRender#send_action – Renders the implicit view, if nothing was explicitly rendered in the action method

Sau tất cả, action method cuối cùng được gọi. Tiếp đến là rendering.

### Rendering

Đây là các thực hiện render trong một controller:

```ruby

class ExampleController < ApplicationController
  def index
    render plain: 'Hello, world!'
  end
end
```

Tôi sẽ bỏ qua các chi tiết về rendering - riêng chủ đề này có thể viết một bài viết riêng cho nó.

Bất kể bạn render cái gì, kết quả cuối cùng được lưu trữ trong answer.body. Nó cũng đặt Content-Type HTTP trên response object, thành text/plain trong trường hợp này.

### Leaving The Controller

Sau khi điều khiển rời khỏi action method, dòng chảy cuộc gọi sẽ quay ngược lại heo thứ tự:

     callback after_action được chạy.
     Instrumentation kết thúc.
     Cấu hình I18n toàn cầu được khôi phục về giá trị ban đầu.
     Tin nhắn flash được lưu trữ trong session.

Cuối cùng, controller cung cấp một giá trị trả về bằng cách gọi answer.to_a. Điều này chuyển đổi response object thành Rack-compatible response array, sau đó chảy ngược lại qua bộ định tuyến và tất cả các middleware.

###  Leaving Routing

Routing đơn giản là chuyển giá trị trả về của controller trở lại middleware, trừ khi HTTP response có chứa X-Cascade: pass. Khi controller trả lại tiêu đề này, về cơ bản nó nói rằng yêu cầu đó không phải rành cho nó, vì vậy hãy thử tìm thằng để xử lý nó. Sau đó, bộ định tuyến cố gắng tìm một tuyến phù hợp khác và gửi lại yêu cầu. Đây dường như là một tính năng ít được biết đến và hiếm khi được sử dụng.

### Leaving Middleware

Sau khi rời khỏi route,  Rack-compatible response array được trả về thông qua tất cả các middleware. Trong giai đoạn này, middleware có cơ hội sửa đổi mã trạng thái, tiêu đề và phần phản hồi. Tất cả các phần mềm trung gian được giải thích ở trên, nhưng các sửa đổi đáng chú ý là:

1.      Tiêu đề ETag được đặt, dựa trên phần phản hồi
2.      Phần thân phản hồi có thể bị xóa hoàn toàn, dựa trên các tiêu đề bộ đệm HTTP
3.      Phiên này  “committed", có nghĩa là được tuần tự hóa và được lưu trữ trong cookie
4.      Cookies được tuần tự hóa và được thêm vào tiêu đề phản hồi
5.      Thông tin về yêu cầu được đăng xuất

Sau tất cả các phần mềm trung gian, Rack-compatible response được trả lại từ ứng dụng của bạn đến máy chủ web. Ở đó, nó được tuần tự hóa thành chuỗi HTTP response và được gửi lại cho máy khách.

- Tài liệu tham khảo:
- https://www.rubypigeon.com/posts/examining-internals-of-rails-request-response-cycle/
- https://guides.rubyonrails.org/rails_on_rack.html
- http://tutorials.jumpstartlab.com/topics/routes/request_cycle.html