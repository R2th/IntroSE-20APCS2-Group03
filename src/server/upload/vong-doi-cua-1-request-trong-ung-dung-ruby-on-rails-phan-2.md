Tiếp theo phần trước, chúng ta sẽ cũng nhau đi tìm lời giải cho mối quan hệ giữa App Server, Web Server và Rails nhé ^^

## Rack là cái gì?

Rack là đáp án cho câu hỏi lần trước. Rack có thể hiểu là 1 quy ước chung (1 giao thức) để các App Server giao tiếp với các Ruby Web Framework (như Rails, Sinatra hay Padrino) và ngược lại. 

Ví dụ App server (Puma) nhận được request từ Web Server (Nginx) - chính là bài toán Blog ở phía trên chẳng hạn. Puma sẽ đưa request đó cho Rack và Rack sẽ giao tiếp với Web Framework (Rails). Rails sẽ xử lý bài toán đó bằng ngôn ngữ Ruby và phản hổi lại (theo 1 đường khác)

Cơ bản 1 vòng đời khi đó sẽ như thế này

> Request HTTP -> Web Server (Nginx) -> App Server (Puma) -> Rack -> Ruby Web Framework (Rails) 

 
Kết quả cuối cùng nhận được sẽ như thế này: 
 
 ```
 env = {
  'REQUEST_METHOD' => 'GET',
  'PATH_INFO' => '/blog',
  'HTTP_HOST' => 'viblo.asia,
  # ...
}

status, headers, body = app.call(env)

status  # => 200
headers # => { 'Content-Type' => 'text/plain' }
body    # => ['Blog']
 ```
 
Trước khi đi sâu vào Rails, húng ta hãy thử xây dựng 1 ứng dụng Rack đơn giản

```Ruby
# app.rb

class Blog
  def call(env)
    if env['PATH_INFO'] == '/blog'
      [200, {'Content-Type' => 'text/plain'}, ['Blog']]
    else
      [404, {'Content-Type' => 'text/plain'}, ['Not Found']]
    end
  end
end
```

Đây có thể hiểu là 1 ứng dụng Rack đơn giản nhất mà chúng ta có thể xây dựng. Nó không có 1 class hay bất kỳ điều gì liên quan cả, chỉ đơn giản là class khai báo phương thức `call`. Nó sẽ kiểm tra đường dân yêu cầu từ `env`, nếu nó khớp với đường dẫn `/blog` thì sẽ phản hồi lại văn bản đơn giản `Blog`, nếu không sẽ phải hồi lại 404 và text `Not Found`

Được rồi, bây giờ chúng ta đã viết ứng dụng của mình, làm thế nào để chúng ta sử dụng nó? Làm thế nào để chúng ta kết nối mọi thứ? Hãy nhớ lại rằng Rack chỉ là một giao thức mà các máy chủ web có thể thực hiện, vì vậy chúng tôi sẽ cần kết nối ứng dụng của chúng tôi với một máy chủ web nhận biết Rack.

May mắn, trong Ruby chúng ta có sẵn cá thư viện gọi là `Gem`. Đó chính `Rack` gem - một thư viện tập hợp tất cả các tiện ích để thực hiện và sử dụng Rack. Cấu hình gọi đến `class` trên sẽ như sau

```
# config.ru

require_relative 'app'

run HelloWorld.new
```

Đây về cơ bản là một tệp Ruby với một số DSL cấu hình bổ sung. Ở đây, chúng ta yêu cầu xây dựng và sử dụng một phiên bản của ứng dụng `Blog` và chuyển nó đến máy chủ `rackup` bằng phương thức DSL `run`

Cùng với đó, chúng ta có thể chạy lệnh `rackup` từ trong thư mục của tệp `config.ru` và nó sẽ gắn máy chủ vào cổng 9292 theo mặc định. Nếu chúng tôi truy cập `http://localhost:9292/blog`, chúng tôi sẽ thấy "Blog" và nếu chúng tôi điều hướng đến `http://localhost:9292/xxx`, chúng ta sẽ thấy lỗi "Not Found".

Giờ chúng ta sửa 1 chút để chỉ định đường dẫn root `/` đến với `/blog` như sau:

```Ruby
# app.rb

class Blog
  def call(env)
    if env['PATH_INFO'] == '/'
      [301, {'Location' => '/blog'}, []]
    elsif env['PATH_INFO'] == '/blog'
      [200, {'Content-Type' => 'text/plain'}, ['Blog']]
    else
      [404, {'Content-Type' => 'text/plain'}, ['Not Found']]
    end
  end
end
```

Chạy thử lại xem nào ... tất nhiên nó chạy ổn rồi, tuy nhiên ngon thì chưa. Nếu chúng ta thêm thật nhiều path ở đây thì cứ `if`. `elsif`. `else` mãi đến vô tận à ???

`Redirect` là 1 công việc cơ bản do đó chúng ta cần viết nó lại tốt hơn để sử dụng cho nhiều chỗ trong ứng dụng của mình.  Do đó chúng ta sẽ tìm cách viết lại nó trong 1 `module` và có thể tái sử dụng chúng ở khắp mọi nơi. 

```Ruby
class Redirect
  def initialize(app, from:, to:)
    @app = app
    @from = from
    @to = to
  end

  def call(env)
    if env["PATH_INFO"] == @from
      [301, {"Location" => @to}, []]
    else
      @app.call(env)
    end
  end
end

class Blog
  def call(env)
    if env["PATH_INFO"] == '/blog'
      [200, {"Content-Type" => "text/plain"}, ["Blog"]]
    else
      [404, {"Content-Type" => "text/plain"}, ["Not Found!"]]
    end
  end
end
```

Ở cách viết trên, về cơ bản chúng ta  vẫn giữ logic cũ như `class` Blog. Tuy nhiên, chúng ta sẽ thêm 1 `class` Redirect để xử lý chung các request. Nếu request matching với đường dẫn nó sẽ đưa ra phản hồi chuyển hướng và kết thúc. Nếu không, nó sẽ ủy quyền cho ứng dụng tiếp theo mà chúng ta đã viết.

Tiếp theo chúng ta thay đổi `config.ru` như sau

```Ruby
require_relative 'app'
    
run Redirect.new(
  Blog.new,
  from: '/',
  to: '/blog'
)
```

Chúng ta xây dựng 1 instance của ứng dụng `Blog` và chuyển nó cho ứng dụng `Redirect`. Với cách làm này, chúng ta đã triển khai 1 phần trung gian gọi là `Rack middleware`. Tuy nhiên ở đây middleware không phải là 1 phần kỹ của thuật của Rack - nó chỉ là 1 phần của app chúng ta viết ở trên (Redirect). Nó chỉ "tình cờ" gọi 1 ứng dụng Rack khác như 1 phần của phương thức `#call`, và web server không cần phải biết điều này.

Mẫu `pattern` middleware phổ biến đến mức `config.ru` có 1 từ khóa `DSL` dành riêng cho nó

```Ruby
require_relative 'app'
    
use Redirect, from: '/', to: '/blog'

run Blog.new
```

Các mẫu `middleware pattern` thực sự rất "mạnh". Chúng ta không cần viết thêm bất kỳ dòng code nào ở đây, chỉ đơn giản là thêm 1 vài `config` middleware từ `rack` gem:

```
require_relative 'app'

use Rack::Deflater
use Rack::Head
use Rack::ConditionalGet
use Rack::ETag

use Redirect, from: '/', to: '/blog'

run Blog.new
```

Đây là cách chúng ta xây dựng 1 ứng dụng Redirect

## Rails <3 Rack

Cuối cùng chúng ta đã sẵn sàng với Rails.

Tất nhiên, Rails sẽ triển khai sẵn Rack rồi. Nếu bạn nhìn vào 1 ứng dụng Rails của mình, nó sẽ đi kèm 1 tệp config.ru trông như thế này:

```Ruby
require_relative 'config/environment'

run Rails.application
```

Mặc dù `config.ru` có nguồn gốc từ `rackup`, tuy nhiên nó cũng được hiểu bởi một số máy chủ và dịch vụ web khác như Heroku, do đó, Rails có thể bao gồm nó theo mặc định.

Như đã tìm hiểu phần đầu bài viết, chúng ta phải chuyển 1 ứng dụng `Rack` cho từ khóa `run`, vì vậy `Rails.application` phải là 1 ứng dụng `Rack` phản hồi với `#call`. Chúng ta sẽ thử 1 chút với rails console

```
2.5.1 :001 > env = Rack::MockRequest.env_for('http://localhost:3000/blog')
 => {"rack.version"=>[1, 3], "rack.input"=>#<StringIO:0x0000000005c96a58>, "rack.errors"=>#<StringIO:0x0000000005c96b20>, "rack.multithread"=>true, "rack.multiprocess"=>true, "rack.run_once"=>false, "REQUEST_METHOD"=>"GET", "SERVER_NAME"=>"localhost", "SERVER_PORT"=>"3000", "QUERY_STRING"=>"", "PATH_INFO"=>"/blog", "rack.url_scheme"=>"http", "HTTPS"=>"off", "SCRIPT_NAME"=>"", "CONTENT_LENGTH"=>"0"} 
```

Thay vì viết lại 1 `env` hash bằng tay  thì chúng ta có thể sử dụng `Rack::MockRequest.env_for` - 1 method thừ `rack` gem.

Một điều nổi bật từ file `config.ru` trong ứng dụng Rails của chúng tôi là nó không có bất kỳ câu lệnh sử dụng nào. Rails không sử dụng bất kỳ phần mềm trung gian? Không! Trong thực tế, có một lệnh tiện dụng mà bạn có thể chạy để xem tất cả các phần mềm trung gian trong ứng dụng của mình bằng cú pháp `config.ru` quen thuộc:

```
$ bin/rails middleware

use Rack::Sendfile
use ActionDispatch::Executor
use ActiveSupport::Cache::Strategy::LocalCache::Middleware
use Rack::Runtime
use Rack::MethodOverride
use ActionDispatch::RequestId
use ActionDispatch::RemoteIp
use Rails::Rack::Logger
use ActionDispatch::ShowExceptions
use ActionDispatch::DebugExceptions
use ActionDispatch::Callbacks
use ActionDispatch::Cookies
use ActionDispatch::Session::CookieStore
use ActionDispatch::Flash
use ActionDispatch::ContentSecurityPolicy::Middleware
use Rack::Head
use Rack::ConditionalGet
use Rack::ETag
use Rack::TempfileReaper
run Blorgh::Application.routes
```

Chúng ta có thể thấy rằng Rails đã triển khai rất nhiều chức năng của nó trong các phần mềm trung gian, chẳng hạn như xử lý cookie. Điều này thật tuyệt, bởi vì nếu chúng tôi đang triển khai một máy chủ API, chúng tôi có thể loại bỏ các phần mềm trung gian không cần thiết này. Nhưng bằng cách nào?

Hãy nhớ lại rằng tuyên bố sử dụng chỉ là một sự thuận tiện trong việc xây dựng ứng dụng của bạn trong `config.ru`, máy chủ web chỉ "nhìn thấy" ứng dụng bên ngoài nhất. Rails có một sự tiện lợi khác nhau cho việc quản lý phần mềm trung gian trong `config/application.rb`:

```Ruby
# config/application.rb

require_relative 'boot'
require 'rails/all'

Bundler.require(*Rails.groups)

module Blorgh
  class Application < Rails::Application

    # Disable cookies
    config.middleware.delete ActionDispatch::Cookies
    config.middleware.delete ActionDispatch::Session::CookieStore
    config.middleware.delete ActionDispatch::Flash

    # Add your own middleware
    config.middleware.use CaptchaEverywhere

  end
end
```

## Cuối cùng ...

Vì vậy, chúng tôi đã xem xét các phần mềm trung gian, nhưng "ứng dụng" của chúng tôi ở đâu? Câu trả lời là từ đầu ra của `bin/rails middleware`, và chúng ta cần biết cách để sử dụng và chạy middleware này cho ứng dụng của mình. Và `Blorgh:Application.routes` ra đời.

Ứng dụng Rack sẽ xem xét requets URL, khớp với 1 loạt quy tắc định tuyến được yêu cầu để tìm `controller` hay `action` phù hợp được gọi. Rails tạo cho bạn 1 nơi để khai báo những điều này, nó được viết trong `config.routes.rb`.

```Ruby
# config/routes.rb

Rails.application.routes.draw do
  resources :blogs
end
```

Các resources `DSL` trông khá quen thuộc với các nhà phát triển ứng dụng Rails. Nó là 1 `syntax` ngắn gọn để định nghĩa hàng loạt các routes cùng 1 lúc. Viết đầy đủ, nó sẽ gồm 7 routes như sau

```Ruby
# config/routes.rb

Rails.application.routes.draw do
  # resources :blogs becomes...
  get '/blogs' => 'blogs#index'
  get '/blogs/new' => 'blogs#new'
  post '/blogs' => 'blogs#create'
  get '/blogs/:id' => 'blogs#show'
  get '/blogs/:id/edit' => 'blogs#edit'
  put '/blogs/:id' => 'blogs#update'
  delete '/blogs/:id' => 'blogs#destroy'
end
```

Ví dụ: khi bạn thực hiện một yêu cầu GET tới `/blogs`, nó sẽ gọi phương thức `BlogsController#index`, nếu bạn thực hiện một yêu cầu `PUT` tới `/blogs/:id`, nó sẽ chuyển đến `BlogsController#update`.

Vậy ... chuỗi `blogs#index` là gì? Nó chỉ đơn giản là cách viết tắt của `action` index trong `BlogsController`. Nếu bạn tìm hiểu `code` của Rails, bạn sẽ thấy rằng cuối cùng nó sẽ mở rộng thành `BlogsController.action(:index)`. 

```Ruby
class ActionController::Base
  def self.action(name)
    ->(env) {
      request = ActionDispatch::Request.new(env)
      response = ActionDispatch::Response.new(request)
      controller = self.new(request, response)
      controller.process_action(name)
      response.to_a
    }
  end

  attr_reader :request, :response, :params

  def initialize(request, response)
    @request = request
    @response = response
    @params = request.params
  end

  def process_action(name)
    event = 'process_action.action_controller'
    
    payload = {
      controller: self.class.name,
      action: action_name,
      # ...
    }

    ActiveSupport::Notifications.instrument(event, payload) do
      self.send(name)
    end
  end
end
```

Cuối cùng, đặt mọi thứ lại với nhau, bạn có thể tưởng tượng ứng dụng định tuyến là một ứng dụng rack trông giống như thế này:

```Ruby
class BlorghRoutes
  def call(env)
    verb = env['REQUEST_METHOD']
    path = env['PATH_INFO']

    if verb == 'GET' && path == '/blogs'
      BlogsController.action(:index).call(env)
    elsif verb == 'GET' && path == '/blogs/new'
      BlogsController.action(:new).call(env)
    elsif verb == 'POST' && path == '/blogs'
      BlogsController.action(:create).call(env)
    elsif verb == 'GET' && path =~ %r(/blogs/.+)
      BlogsController.action(:show).call(env)
    elsif verb == 'GET' && path =~ %r(/blogs/.+/edit)
      BlogsController.action(:edit).call(env)
    elsif verb == 'PUT' && path =~ %r(/blogs)
      BlogsController.action(:update).call(env)
    elsif verb == 'DELETE' && path = %r(/blogs/.+)
      BlogsController.action(:destroy).call(env)
    else
      [404, {'Content-Type': 'text-plain', ...}, ['Not Found!']]
    end
  end
end
```

Nó phù hợp với đường dẫn yêu cầu đã cho và các "động từ" http so với các quy tắc được xác định trong config `routes` của bạn và ủy quyền cho ứng dụng Rack thích hợp trên `controller`. Điều tốt là bạn không phải viết mọi thứ trên bằng tay. Cảm ơn Rails!

## Tổng kết

Tren đây mình đã giới thiệu 1 cách cơ bản vòng đời của 1 request trong ứng dụng Rails, từ lúc nhận request của end-user trên trình duyệt, đến cách mà request được gửi đến xử lý trong `controller` của Rails

Cảm ơn các bạn đã quan tâm theo dõi

Bài viết được dịch và tham khảo từ:  

https://blog.skylight.io/the-lifecycle-of-a-request/