Là một Ruby developer, đôi khi bạn thường nghe nói đến cụm từ Rack application, hoặc trong các dự án của mình, ít nhiều các bạn cũng đã từng tiếp xúc với Rack, vậy Rack là cái gì, tại sao chúng ta nên hiểu rõ về nó, bài viết này sẽ giúp chúng ta trả lời các câu hỏi dưới đây:

1, Rack là gì?

2, Rack middleware là gì?

3, Sử dụng nó Rack ở đâu?

# What is Rack?

Với Rack, nó cung cấp một giao diện tối giản giữa các webserver và các framework support Ruby. Hiểu theo nghĩa đơn giản, Rack đứng ở giữa một ứng dụng Ruby và các web server để giúp chúng tương tác được với nhau.

## Creating Rack application

Rack application, thực ra chả có gì ngoài đối tượng, những đối tượng response lại method call:

```
class Hello
  def call(env)
    [200, {"Content-Type" => "text/html"}, ["Hello there!"]]
  end
end

run Hello.new
```

Để chạy đoạn code trên, bạn chỉ cần chạy lệnh rackup config.ru trong đó config.ru là tên file lưu đoạn code trên. Sau đó đến URL: http://localhost:9292 để view ứng dụng vừa mới viết trên.

Khi bạn đánh vào URL trên, trong server chạy command trên sẽ gọi ra và gọi method call trên đối tượng Hello.new

Nếu bạn nhìn vào method call, method này nhận vào một hash env chứa thông tin về request HTTP gửi đến và môi trường mà ứng dụng đang chạy như là argument, sau đó trả về một mảng chính xác 3 giá trị: trạng thái, headers và body

Bây giờ, chúng ta sẽ tìm hiểu một vài điều về Rack:

* run: Khi chạy, nó nhận một đối tượng Ruby, cái mà sẽ chạy method call trên nó
* map: Nó nhận vào một string như là một params và map những request đến lại với nó, sau đó nếu chúng match với nhau, nó sẽ chạy đoạn đoạn code để handle chúng
* Use: Chúng bao gồm các middleware trong ứng dụng Rack

# What is Rack Middleware?

## Middleware

Bạn có thể coi middleware như là một thành phần nhỏ nhằm hỡ trợ thực hiện một tác vụ nào đó. Ví dụ: như các phần mềm trung gian khác nhau thực hiện các quy trình khác nhau như đăng nhập, lưu trữ...

Nó có thể chỉnh sửa hoặc tạm dừng các request trước khi chính đến các middleware cuối cùng.

## Middleware Stack

Khi bạn include nhiều hơn một middleware, nó sẽ gọi middleware stack. Nó thực thi tương tự như pipeline design pattern cho một web server sử dụng Rack. Điều đó có nghĩa rằng, với mỗi request gửi đến cần phải pass qua mỗi middleware trong stack, thứ tự của chính được sắp xếp lần lượt ngay khi chúng được định nghĩa.

## Built-in middlewares

Hiện tại, có rất nhiều các middleware đã được tích hợp sẵn trong các ứng dụng Rack, chi tiết các bạn có thể tham khảo theo link: https://github.com/rack/rack/wiki/List-of-Middleware

# Creating custom Middleware and using it in Rack Application

Chúng ta sẽ tạo một custom middleware Cookie, làm nhiệm vụ add cookies đến response trả về

```
class Cookie
  def initialize(app, expiry)
    @app = app
    @expiry = expiry
  end

  def call(env)
    status, headers, body = @app.call(env)
    headers = headers.dup
    opts = {
        expires: Time.now + @expiry,
        value: 'value',
        path: '/',
    }
    Rack::Utils.set_cookie_header!(headers, "mycookie", opts)
    [ status, headers, body ]
  end
end
```

Đầu tiên, hãy bắt đầu từ method khởi tạo, và chú ý params app trong nó. App ở đây chính là middleware tiếp theo và mỗi middleware nên include nó trong hàm khởi tạo.

Middleware này gọi @app.call(env) đầu tiên, sẽ gọi middleware tiếp theo trong stack, trong trường hợp của chúng ta thì đó là Hello và return response của nó. Sau đó Cookie middleware sẽ thêm cookie vào response và  return nó trong response trả về ứng dụng

```
require './cookie'
class Hello
  def call(env)
    [200, {"Content-Type" => "text/html"}, ["Hello there!"]]
  end
end

use Cookie, 24 * 60 * 60 # one day

run Hello.new
```

Như giải thích ở trên, command use được sử dụng để add middleware vào stack, chúng ta có thể sử dụng middleware Cookies trong ứng dụng Rack của chúng ta như trên.

# Rails and Rack

Trong một project sử dụng Rails, nếu bạn chạy lệnh: rake middleware, nó sẽ list ra danh sách các middleware đang được sử dụng trong rails như sau:

```
use Rack::Sendfile
use ActionDispatch::Static
use ActionDispatch::Executor
use ActiveSupport::Cache::Strategy::LocalCache::Middleware
use Rack::Runtime
use Rack::MethodOverride
use ActionDispatch::RequestId
use ActionDispatch::RemoteIp
use Sprockets::Rails::QuietAssets
use Rails::Rack::Logger
use ActionDispatch::ShowExceptions
use WebConsole::Middleware
use ActionDispatch::DebugExceptions
use ActionDispatch::Reloader
use ActionDispatch::Callbacks
use ActiveRecord::Migration::CheckPending
use ActionDispatch::Cookies
use ActionDispatch::Session::CookieStore
use ActionDispatch::Flash
use ActionDispatch::ContentSecurityPolicy::Middleware
use Rack::Head
use Rack::ConditionalGet
use Rack::ETag
use Rack::TempfileReaper
run RailsRakeDemoApp::Application.routes
```

Với mỗi request được gửi đến app của bạn, sẽ phải pass qua lần lượt các middleware trên trong stack này từ trên xuống dưới và cuối cùng nó mới được điều hướng đến routes, route sẽ dispatch request đến controller, controller xử lý chúng và return lại response. Response này sẽ lại phải pass lần lượt qua các middleware ở trên trong stack lần lượt từ dưới lên trên.

Vậy đâu là nơi trong Rails định nghĩa và chạy chúng?
Mỗi project Ruby on Rails có 1 file tên config.ru trong thư mục root cuả project và nó thường có nội dung:

```
# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

run Rails.application
```

File config.ru này load file config/environment.rb và chạy lệnh Rails.application. Lệnh này sẽ gọi Application được định nghĩa trong config/application.rb.

Bây giờ chúng ta sẽ xem file application.rb có gì?

```
require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DemoApp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
```

Ở đây, application được kế thừa từ Rails::Application, Rails::Application lại được kế thừa từ Engine. Engine này là một Rack app, nó gọi method call được định nghĩa trong nó và nó sẽ được chạy khi config.ru gọi Rails.application

# How can I use it?

Rails cho phép chúng ta config middleware stack như add thêm, xóa, thay đổi vị trí middleware bất kì trong stack.


Source:

https://blog.solutelabs.com/rack-an-interface-b-w-ruby-based-application-and-web-server-cb9d6ee757d1