## Mở đầu
Nếu bạn là một Ruby developer, cụ thể là từng sử dụng rails để phát triển ứng dụng web thì bạn đã từng thắc mắc tại sao Rails lại có thể làm được những thứ rất vi diệu mà không hiểu tại sao. Thực chất, đó đều là những library, package, hay như trong giới ruby thì gọi là "gem" được cài đặt mặc định kèm theo framework rails (cũng là 1 ruby gem!) để xử lý các dòng code của developer. Riêng tác giả thì từng bối rối khi không biết hệ thống networking trong rails hoạt động như thế nào. Để làm rõ hơn về vấn đề này, chúng ta hãy cùng tìm hiểu cách thức một rails server hoạt động, bắt đầu từ lúc người dùng gửi request từ browser cho đến khi response được trả về phía browser cho người dùng 

## Chuyện gì xảy ra ở bên ngoài ứng dụng rails ? 

Nếu sử dụng framework rails thì bạn có lẽ đã hiểu được luồng hoạt động của mô hình MVC bên trong rails. Toàn bộ những phần liên quan đến routing, controller, render view đều là "magic" mà rails đem lại cho developer, và chúng ta sẽ gói chung lại những thứ này với tên gọi **application server**. Tác gỉa trong bài viết này sẽ đề cập đến cách thức hoạt động của **web server**, là những việc được thực hiện bên ngoài ứng dụng rails. Cụ thể là như sau: 

- Người dùng truy cập vào DNS trang web của bạn, lúc này browser sẽ gửi request được tạo ra bởi người dùng đến các dịch vụ web server mà bạn đã thiết lập lúc deploy
- Sau đó tầng web server sẽ thực hiện nhận các request đến từ người dùng, nhưng chưa lập tức xử lý logic cho các request này. Những công cụ điển hình dùng cho việc này như nginx hay apache. 
- Tầng app server (chạy trên chính ứng dụng rails của bạn) sẽ tiếp nhận nhưngc request đã được xử lý tại web server để thực hiện các business logic. 
### Web server và load balancing

  Web server là lớp xử lý http request, có thể là nginx hoặc apache, cũng có thể là cả passenger (kết hợp cả web server lẫn app server). Web Server thường xử lý những **static content**, là những file image, css, javascript tĩnh, không cần phải render content từ phía rails nên có thể trực tiếp trả response về cho người dùng mà không cần phải thông qua ứng dụng rails của bạn. Nguyên lý hoạt động của nginx dưới vai trò một web server là sẽ chia thành master process, worker process và caching helper
  - Master process thực hiện xử lý các công việc liên quan đến việc quản lý như đọc file config và bind kết nối tới port server, sau đó tạo ra một số process con dựa trên file config đã đọc.
  - Cache loader process sẽ chạy lúc khởi động để load cache từ ổ đĩa vào bộ nhớ, sau đó tự động down. 
  - Cache manager process được chạy theo chu kỳ (có thể setting) và bỏ bớt những dữ liệu thừa trong ổ đĩa.
  - Worker process sẽ đảm nhiệm toàn bộ vai trò trong việc xử lý request, bao gồm network connections, đọc và ghi dữ liệu ra ổ đĩa và thực hiện liên lạc với các server đang chạy. Setting mặc định và được khuyết khích cho nginx là chạy một worker process cho mỗi CPU, nhằm đảm bảo hiệu quả của phần cứng.
  
![](https://images.viblo.asia/ae040257-d0c3-4839-a32a-7cedba6888de.png)


  Ngoài ra, trong nginx có một tính năng được các app server sử dụng khá nhiều, đó là **load balancing**. Nếu như những request từ người dùng thực sự cần đến xử lý logic ở tầng app server thì các dự án thường sử dụng load balancer cho ứng dụng production của mình 

  Load balancing có nhiệm vụ xử lý các request đồng thời từ người dùng (concurrent request).. Cụ thể, trước khi request được gửi đến rails server, nginx load balancer sẽ nhận toàn bộ request này trước khi phân bổ tới các server của bạn, nhằm đáp ứng nhu cầu tốc độ xử lý nhanh và sử dụng hợp lý các tài nguyên (CPU, RAM) để cải thiện hiệu năng của các server, không để cho server bị quá tải. Nginx đảm bảo rằng nếu như có một server bị down, toàn bộ traffic tới server đó sẽ được redirect tới một server khác còn online và hoạt động bình thường. 
  Tương tự như Nginx trong vai trò là một web server, Apache cũng sẽ xử lý các request mà chỉ yêu cầu static content, từ đó trả ra response bao gồm css, javascript, images,... về cho browser của người dùng.
  
## Application Server 
   Request sau khi được lớp web server xử lý thì sẽ được đưa vào application server. Server ở đây có thể sử dụng thin, puma, unicorn hay passenger. Nhưng nhìn chung thì các server này đều dựa trên nền tảng rack của ruby. Trước hết chúng ta sẽ tìm hiểu cách thức hoạt động của rack 

### Rack 
Khi web server không thể đáp ứng nhu cầu về content cho người dùng, cụ thể là **dynamic content** (những thông tin cần tương tác với ứng dụng, xử lý logic bởi server, database), Rack sẽ đóng vài trò là một **application server** và thực thi những công việc này. Chỉ với Rack thì bạn có thể build một server đơn giản với vài dòng code, và sau đó có thể chạy server đó qua những ruby server như WEBrick, Mongrel, Thin, Puma. 
Để sử dụng rack, bạn cần trả về một object có thể gọi method `call`, và chúng ta sẽ gọi đây là rack server object
```
object.respond_to? :call # => returns true
```

Một số method của Rack bạn có thể sử dụng để boot up một server bằng rack: 

- `run` sẽ nhận một arguement, là một object có thể gọi method `call` (object.respond_to(:call) => returns true). 
```
 run Proc.new( |env| ['200']. {'Content-Type' => 'text/html'}, ['get rack\'d]] })
```
 
 - `map` sẽ cần truyền một biến dạng string, là đường dẫn được xử lý, và một block chứa application code của Rack.
```
 map '/post' do 
   run Proc.new { |env| ['200', {'Content-Type' => 'text/html'}, ['first_post', 'second_post', 'third_post']] end
```
 
 
 - `use` sẽ chỉ định middleware rack sử dụng 

Environment Hash:
Object rack server của bạn (có thể sử dụng method call) sẽ nhận argument là một environment hash. Đây là những nội dung chính cần chú ý trong environment hash này

`SERVER_NAME`: DNS của server, ví dụ: wwư.example.com

`REQUEST_METHOD`:  các method của HTTP (GET, POST, PUT, PATCH, DELETE)

`PATH_INFO`: đường dẫn tương đối của ứng dụng web - sau dấu "/" sau DNS. Ví dụ dns của bạn là www.example.com thì PATH_INFO = "/posts" sẽ dẫn đến url www.example.com/posts

`QUERY_STRING`: những cặp name, value sau dấu ? của url, ngăn cách nhau bằng dấu "&". Ví dụ: www.example.com/posts?search=latest&page=5

`SERVER_PORT`:  như tên gọi, thường là 80 hoặc 443, ví dụ : www.example.com:80

rack.url_scheme: phương thức http hay https 

Một vài framework sử dụng rack (trong đó có rails) sẽ đưa hết env này vào trong một Rack::Request object. Object này cung cấp những method helper để developer có thể tiện sử dụng như request_method, query_string,... tương tự như những biến được định nghĩa ở trên. Ngoài ra dev có thể kiểm tra một số thông tin khác như parameters, HTTP scheme, hoặc check xem ứng dụng có sử dụng ssl hay không.

Response Array:
Đối với response array, chỉ cần trả ra 3 giá trị như sau:
`STATUS`: status code, 200 hoặc 404

`HEADERS`: response headers

`BODY`: response body

Tương tự như request, rack hỗ trợ Rack::Response object để giúp cho dev sửa cookies, sửa thông tin response và thao tác với headers, body với một số built in methods

Như vậy là chúng ta đã hiểu sơ qua về rack là gì,  vậy những web server được xây dựng dựa trên Rack sẽ có những đặc điểm như thế nào:

### Rack-based server 

Như đã nói ở trên, sau khi request được xử lý bởi các HTTP web server ngoài ứng dụng Rails (apache và nginx), ruby app server sẽ nhận các request này và thực hiện nhiệm vụ của mình. Hãy xét đến trường hợp sử dụng Unicorn:

![](https://images.viblo.asia/cc765304-2339-42e6-bd0b-10d009800ceb.png)

  Nginx sẽ gửi request trực tiếp tới shared socket - một worker pool của unicorn qua phương thức Unix Domain Socket. Master worker của unicorn sẽ quản lý các workers trong khi hệ điều hành xử lý việc balancing, nên master worker không phải handle requests. Unicorn master khi khởi động sẽ load ứng dụng của bạn vào bộ nhớ, ngay khi sẵn sàng thì nó sẽ forks một số lượng workers nhất định về (trong trường hợp này là unicorn workers). Và các workers sẽ chủ động lựa chọn request phù hợp nhất trong shared socket để xử lấy.
Mỗi worker unicorn sẽ unpack các thông tin từ request (giống như một payload) để gửi toàn bộ về cho rails. Lúc này phần **Router** của controller đã bắt đầu nhận request và mô hình MVC của rails được tiến hành. 
  Cụ thể hơn về việc đọc request của client, unicorn thực hiện trong hàm `process_client` như sau: 
  ```
 # unicorn/lib/unicorn/http_server.rb

def process_client(client)
  status, headers, body = @app.call(env = @request.read(client))

  ...

  http_response_write(client, status, headers, body,
                      @request.response_start_sent)

  client.shutdown
  client.close
rescue => e
  handle_error(client, e)
end
```
  Trong method trên, unicorn sử dụng một rack server object (như đã nói ở trên, có thể gọi được method `call` và nhận một env hash là một argument, sau đó return một response array bao gồm status, headers, body). @app chính là một rack server object, cũng là một object của class Rails::Application, kế thừa từ Rails::Engine
  ```
# sample_app/config/application.rb
module Post
  class Application < Rails::Application
    ...
  end
end

# rails/railties/lib/rails/application.rb
module Rails
  class Application < Engine

    # Implements call according to the Rack API. It simply
    # dispatches the request to the underlying middleware stack.
    def call(env)
      env["ORIGINAL_FULLPATH"] = build_original_fullpath(env)
      env["ORIGINAL_SCRIPT_NAME"] = env["SCRIPT_NAME"]
      super(env)
    end

    ...

  end
end
```

Có thể thấy lại method call lại gọi từ super, tiếp tục đào sâu hơn thì class Rails::engine, tiếp tục kế thừa từ Rails::Railitie
```
# rails/railties/lib/rails/engine.rb

module Rails
  class Engine < Railtie

    def call(env)
      env.merge!(env_config)
      if env['SCRIPT_NAME']
        env.merge! "ROUTES_#{routes.object_id}_SCRIPT_NAME" => env['SCRIPT_NAME'].dup
      end
      app.call(env)
    end

    ...

  end
end
```

Trong method call, chúng ta có thể thấy bên trong lại gọi tới một method khác là `app`, vậy method này là như thế nào? 
```
# rails/railties/lib/rails/engine.rb

# Returns the underlying rack application for this engine.
def app
  @app ||= begin
    config.middleware = config.middleware.merge_into(default_middleware_stack)
    config.middleware.build(endpoint)
  end
end
```


Rails engine build một middleware stack dựa trên nền tảng ứng dụng Rack, nơi mà các endpoint trong ứng dụng trỏ đến (route to). Trước khi tiến hành xử lý route, request được qua một loạt các middleware xử lý trước.
Bạn hãy thử chạy câu lệnh `rake middleware` trong terminal (cd tới thư mục rails app) và sẽ thấy kết quả như sau: 
```
$ RAILS_ENV=production rake middleware
use Rack::Sendfile
use #<ActiveSupport::Cache::Strategy::LocalCache::Middleware:0x007f7ffb206f20>
use Rack::Runtime
use Rack::MethodOverride
use ActionDispatch::RequestId
use Rails::Rack::Logger
use ActionDispatch::ShowExceptions
use ActionDispatch::DebugExceptions
use ActionDispatch::RemoteIp
use ActionDispatch::Callbacks
use ActiveRecord::ConnectionAdapters::ConnectionManagement
use ActiveRecord::QueryCache
use ActionDispatch::Cookies
use ActionDispatch::Session::CookieStore
use ActionDispatch::Flash
use ActionDispatch::ParamsParser
use Rack::Head
use Rack::ConditionalGet
use Rack::ETag
run App::Application.routes
```

Chú ý vào dòng cuối cùng, có thể thấy sau khi request đến được đây (sau khi qua web server, được rack-based server unpack) thì còn phải qua một loạt các middleware này rồi mới đến nơi cuối cùng là `App::Application.routes`. Đến lúc này thì request mới thực sự vào trong các ứng dụng rails logic mà bạn xử lý. Toàn bộ những phần sau là những phần mà có thể bạn đã nắm được rõ khi học mô hình MVC của Rails nên tác giả sẽ không đề cập đến ở đây.


## Kết luận
  Như vậy, bài viết đã đề cập đến luồng chạy thông dụng nhất của request trên môi trường production của rails. Phần lớn những sự kiện xảy ra bên ngoài rails chưa được đề cập đến trong documentation nên bài viết này hi vọng có thể giúp bạn nắm được những lý thuyết căn bản về ứng dụng rails ở môi trường production. Xin cảm ơn!
  
  Tham khảo: 
  - http://andrewberls.com/blog/post/rails-from-request-to-response-part-1--introduction
  - nginx.org
  - stackoverflow