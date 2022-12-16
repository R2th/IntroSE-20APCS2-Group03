Tiếp nối [phần 1](https://viblo.asia/p/ruby-on-rails-xay-dung-api-template-hoan-chinh-part-1-Az45bowQKxY), hôm nay mình lại tiếp tục phần 2 nhé! <br>
Lưu ý: phần 2 là bài viết đi sâu hơn phần 1, bạn mới bắt đầu thì đọc phần 1 sẽ dễ hiểu hơn phần này =))

### **VII. Enabling CORS (Cross-origin resource sharing)** <br>
   Khi xây dựng API public, thì chúng ta sẽ muốn một domain khác có thể lấy dữ liệu từ domain của mình.
Như vậy cần thiết enable Cross-Origin Resource Sharing (CORS), để có thể thực hiện AJAX request chéo (cross-origin HTTP request)

   Add Gemfile:
```
gem "rack-cors"
```
<br>

#### 1. Rails Configuration
   Thêm một số config sau vào `config/application.rb`

```ruby
module YourApp
  class Application < Rails::Application

  # ...

    config.middleware.insert_before 0, "Rack::Cors" do
      allow do
      origins '*'
      resource '*', :headers => :any, :methods => [:get, :post, :options]
      end
    end

  end
end
```
Rồi chạy
```
bundle exec rake middleware
```
<br>

#### 2. Rack Configuration
   Lưu ý: Nếu đang chạy Rails, cập nhật trong config/application.rb. bỏ qua phần cập nhật `config.ru`  <br>
   Trong `config.ru`, cấu hình `Rack::Cors` như sau:
```ruby
use Rack::Cors do
  allow do
    origins 'localhost:3000', '127.0.0.1:3000',
            /\Ahttp:\/\/192\.168\.0\.\d{1,3}(:\d+)?\z/
            # regular expressions can be used here

    resource '/file/list_all/', :headers => 'x-domain-token'
    resource '/file/at/*',
      methods: [:get, :post, :delete, :put, :patch, :options, :head],
      headers: 'x-domain-token',
      expose: ['Some-Custom-Response-Header'],
      max_age: 600
      # headers to expose
  end

  allow do
    origins '*'
    resource '/public/*', headers: :any, methods: :get

    # Only allow a request for a specific host
    resource '/api/v1/*',
      headers: :any,
      methods: :get,
      if: proc { |env| env['HTTP_HOST'] == 'api.example.com' }
  end
end
```

Explain:
* methods(string/array/`:any`): là phương thức HTTP cho phép thực hiện với resource.
* headers(string/array/`:any`): là headers của HTTP được cho phép trong request của CORS request.
Sử dụng `:any` để cho phép cho bất kì headers trong request thực tế
* expose (string/array): Các HTTP headers trong response resource có thể được hiển thị tới client.
* credentials (boolean, default: `false`): Thiết lập `Access-Control-Allow-Credentials` response header.
Đọc chi tiết hơn về  [security article](http://web-in-security.blogspot.de/2017/07/cors-misconfigurations-on-large-scale.html)
* max_age (number): Thiết lập `Access-Control-Max-Age` response header.
* if (Proc): Nếu kết quả của proc là true, sẽ xử lý yêu cầu như 1 CORS request hợp lệ.
* vary (string/vary): 1 danh sách HTTP headers để thêm vào 'Vary' header.

   Tìm hiểu rõ hơn về các options khác tại [đây](https://github.com/cyu/rack-cors)

### **VIII. Versioning Your API** <br>
  Để tiện cho việc maintain hay phát triển thêm mà ko ảnh hưởng đến quá trình sử dụng của người dùng, ta cần cân nhắc việc thêm version cho app cho mỗi lần release. Việc thêm phiên bản này sẽ chia API của mình thành nhiều namespaces, như v1 và v2. <br>
  Hướng dẫn này sẽ setup version theo URL format như sau:
```
GET http://api.mysite.com/v1/users/
```
   hoặc nếu muốn có thể chia theo cách theo subdomain như `/api/v1/user`. <br>
   Mình sẽ cấu trúc thư mục như sau để giúp code gọn gàng hơn bằng cách thêm namespace `API::V1` vào các controller trong `v1`
```
app/controllers/
.
|-- api
|   |-- v1
|       |-- api_controller.rb
|       |-- users_controller.rb
|-- application_controller.rb
```
   Và đây là những gì bên trong controller:
```ruby
# app/controllers/api/v1/api_controller.rb

module Api::V1
  class ApiController < ApplicationController
    # Generic API stuff here
  end
end
```
```ruby
# app/controllers/api/v1/users_controller.rb

module Api::V1
  class UsersController < ApiController

    # GET /v1/users
    def index
      render json: User.all
    end
  end
end
```
<br>
   Trong file config/routes, viết như sau:
```ruby
constraints subdomain: "api" do
  scope module: "api" do
    namespace :v1 do
      resources :users
    end
  end
end
```
`scope module: "api"` cho phép chúng ta định tuyến đến controller trong API module mà ko show nó lên url. Tuy nhiên, version `v1/` là 1 phần trong url, nên ta đặt nó trong `namespace`.

Còn 1 cách viết nữa trong file config/routes.rb
```ruby
class ActionDispatch::Routing::Mapper
  def draw routes_name
    instance_eval File.read(Rails.root.join("config/routes/#{routes_name}.rb"))
  end
end

Rails.application.routes.draw do
  namespace :api, format: :json do
    draw :v1
  end
end
```
Trong file config/routes/v1.rb
```ruby
namespace :v1 do
  resources :users
end
```

### **IX. Rate Limiting and Throttling**
Để bảo vệ API của chúng ta khỏi các cuộc tấn công DDoS, brute force attacks, smurf attack hoặc là muốn giới hạn lượt truy cập của người dùng, chúng ta có thể sử dụng một rack middleware là Rack::Attack. <br>
Gem rack-attack cung cấp cho chúng ta những phương thức bảo vệ như sau:

* **whitelist**: cho phép truy cập bình thường nếu thỏa mãn điều kiện mà chúng ta đặt ra.
* **blacklist**: gửi thông báo từ chối truy cập cho một request nào đó.
* **throttle**: kiểm tra "ngưỡng" truy cập của người dùng, tức là số lượng request chỉ có mức nhất định.
* **track**: theo dõi các request, không ảnh hưởng gì đến request, mà chỉ hỗ trợ lưu log về các request lên hệ thống xử lý.

Add into Gemfile:
```ruby
gem "rack-attack"
```

Chạy `bundle`, ta tiến hành include middleware vào file **config/application.rb**
```
module YourApp
  class Application < Rails::Application
  # ...
    config.middleware.use Rack::Attack
  end
end
```
Tạo một initializer file mới trong `config/initializers/rack_attack.rb` để thêm các quy định về `Rack::Attack`.

Các options có thể tham khảo thêm tại trang chủ [rack-attack](https://github.com/kickstarter/rack-attack) và [example configuration](https://github.com/kickstarter/rack-attack/wiki/Example-Configuration) và [advanced configuration](https://github.com/kickstarter/rack-attack/wiki/Advanced-Configuration)

Dưới đây là 1 ví dụ:
```ruby
class Rack::Attack
  # Theo mặc định thì Rack::Attack sử dụng Rails.cache để lưu trữ thông tin của requests
  # nhưng bạn cũng có thể config bộ nhớ lưu trữ riêng cho nó, như dùng Redis, Memory như sau:
  # redis_client = Redis.connect(url: ENV["REDIS_URL"])
  # Rack::Attack.cache.store = Rack::Attack::StoreProxy::RedisStoreProxy.new(redis_client)
  Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

  # Luôn luôn cho phép truy cập từ localhost
  # (blocklist & throttle sẽ được bỏ qua, không phải kiểm tra)
  whitelist('allow-localhost') do |req|
    # những request từ local host sẽ trả giá trị true
    '127.0.0.1' == req.ip || '::1' == req.ip
  end

  # từ chối các request có địa chỉ ip là 1.2.3.4
  blocklist('block 1.2.3.4') do |req|
    '1.2.3.4' == req.ip
  end

  # từ chối request logins từ các bad user agent
  blocklist('block bad UA logins') do |req|
    req.path == '/login' && req.post? && req.user_agent == 'BadUA'
  end

  # cho phép 1 IP request thực hiện 5 requests mỗi 5 giây
  throttle('req/ip', limit: 5, period: 5) do |req|
    req.ip
  end

  # Ở đây có 1 nhược điểm là sau 1 phút query vẫn được request lên server bình thường => chúng ta có thể mở rộng phạm vi xử lý request lên, ví dụ 4 phút được request bao nhiêu lần, 8 phút được bao nhiêu lần
  (2..4).each do |level|
    throttle("login/ip/#{level}", limit: (20 * (2 ** level)),
    period: (2 ** level))
  end

  # ngưỡng login cho email parameter giới hạn 6 reqs/phút
  # trả về giá trị email nếu đường dẫn là login và kiểu request là post
  Rack::Attack.throttle('logins/email', :limit => 6, :period => 60.seconds) do |req|
    req.params['email'] if req.path == '/login' && req.post?
  end

  # Bạn có thể cài đặt giới hạn theo proc như sau
  limit_proc = proc {|req| req.env["REMOTE_USER"] == "admin" ? 100 : 1} # giới hạn 100 lần
  period_proc = proc {|req| req.env["REMOTE_USER"] == "admin" ? 1.second : 1.minute} # giới hạn trong 1 phút
  Rack::Attack.throttle('req/ip', :limit => limit_proc, :period => period_proc) do |req|
    req.ip
  end

  # Gửi response sau đây tới clients đã đạt ngưỡng
  self.throttled_response = ->(env) {
    retry_after = (env['rack.attack.match_data'] || {})[:period]
    [
      429,
      {'Content-Type' => 'application/json', 'Retry-After' => retry_after.to_s},
      [{error: "Throttle limit reached. Retry later."}.to_json]
    ]
  }

  Rack::Attack.throttled_response = lambda do |env|
    #  Lưu ý: ở dây bạn có thể lấy thêm các thông tin trong dữ liệu như
    #  env['rack.attack.matched'],
    #  env['rack.attack.match_type'],
    #  env['rack.attack.match_data']

    # Sử dụng lỗi 503 để khiến kẻ tấn công tưởng rằng hắn đã DOS trang web thành công
    # Mặc định Rack::Attack trả về 429 nếu truy cập quá ngưỡng - thorttled
    [ 503, {}, ["Server Error\n"]]
  end

  self.blocklisted_response = lambda do |env|
    [503, {}, ['Blocked']]
  end
end
```

**Lưu ý:** throttle thường yêu cầu kiểm tra với cache nên để tối ưu hiệu năng của máy chủ, hãy kiểm tra bằng thorttle hạn chế nhất có thể.

### **X. Authenticating Your API**
Ở đây ta sẽ dùng HTTP Token để lo việc xác thực, việc này sẽ yêu cầu client kèm theo 1 API key `Authorization` ở HTTP header mỗi khi gửi request lên, trông sẽ như thế này:
```ruby
Authorization: Token token="tZh0LKSBubkkTX9CL8MNKwtt"
```

Đầu tiên cần khởi tạo 1 migration để thêm `api_key` vào model `User`
```
rails g migration AddApiKeyToUsers api_key:string
```

Và update code ở model `User`, thêm method sau:
```ruby
class User < ApplicationRecord

  # Assign an API key on create
  before_create do |user|
    user.api_key = user.generate_api_key
  end

  # Generate a unique API key
  def generate_api_key
    loop do
      token = SecureRandom.base64.tr('+/=', 'Qrt')
      break token unless User.exists?(api_key: token)
    end
  end
end
```
Phía controller ta sẽ implement việc xác thực bằng cách sử dụng built-in `authenticate_or_request_with_http_token`
```ruby
class ApplicationController < ActionController::Base
  include ActionController::HttpAuthentication::Token::ControllerMethods

  # Add a before_action to authenticate all requests.
  # Move this to subclassed controllers if you only
  # want to authenticate certain methods.
  before_action :authenticate

  protected

  # Authenticate the user with token based authentication
  def authenticate
    authenticate_token || render_unauthorized
  end

  def authenticate_token
    authenticate_with_http_token do |token, options|
      @current_user = User.find_by(api_key: token)
    end
  end

  def render_unauthorized(realm = "Application")
    self.headers["WWW-Authenticate"] = %(Token realm="#{realm.gsub(/"/, "")}")
    render json: 'Bad credentials', status: :unauthorized
  end
end
```
Giờ thì dùng `curl` để test thử:
```ruby
rails c

>> User.create name: "Jane", email: "jane@gmail.com"
=> #<User id: 1, name: "Jane", email: "jane@gmail.com", created_at: "2019-11-08 08:50:22", updated_at: "2019-11-08 08:50:22", api_key: "fVYn7HCuFtzfpotyNaReVQtt">

>> curl -H "Authorization: Token token=jkBhNW5uhFPxgZUNs8ECVgtt" http://localhost:3000/api/v1/users
=> [{"id":1,"name":null},{"id":2,"name":null},{"id":3,"name":"Jane"}]
```

### **XI. Documenting Rails-based REST API using Swagger UI**
Khi built 1 REST API server chúng ta cần 1 document mô tả để có thể test các endpoints.

Giả sử ta có:
> REST endpoint: `/api/v1/posts` <br>
> Rails controller: `app/controllers/api/v1/posts_controller.rb`

Steps:

1. Install
Add into Gemfile
```ruby
gem "rswag"
```

then
```
bundle
```

2. Controller
```ruby
class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all

    render json: @users
  end
end
```

Generate Swagger JSON file
```
rake rswag:specs:swaggerize
```

hoặc alias:
```
rake rswag
```

Kiểm tra docs tại `/api-docs/index.html`

### **XII. Rate Limiting per token** <br>
Tạo file `config/initializers/throttle.rb`
```ruby
# config/initializers/throttle.rb

require "redis"

redis_conf  = YAML.load(File.join(Rails.root, "config", "redis.yml"))
REDIS = Redis.new(:host => redis_conf["host"], :port => redis_conf["port"])

# Chúng ta sẽ cho phép 1 khách hàng maximum 60 requests trong 15 phút. Ta định nghĩa điều này tron throttle.rb
THROTTLE_TIME_WINDOW = 15 * 60
THROTTLE_MAX_REQUESTS = 60
```

Ở controllers/application_controller.rb
```ruby
class ApplicationController < ActionController::API
  include ActionController::Serialization
  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :authenticate
  before_filter :throttle_token

  protected

  def authenticate
    authenticate_token || render_unauthorized
  end

  def authenticate_token
    authenticate_with_http_token do |token, options|
      @current_user = User.find_by(api_key: token)
      @token = token
    end
  end

  def render_unauthorized(realm = "Application")
    self.headers["WWW-Authenticate"] = %(Token realm="#{realm.gsub(/"/, "")}")
    render json: {message: 'Bad credentials'}, status: :unauthorized
  end

  def throttle_ip
    client_ip = request.env["REMOTE_ADDR"]
    key = "count:#{client_ip}"
    count = REDIS.get(key)

    unless count
      REDIS.set(key, 0)
      REDIS.expire(key, THROTTLE_TIME_WINDOW)
      return true
    end

    if count.to_i >= THROTTLE_MAX_REQUESTS
      render :json => {:message => "You have fired too many requests. Please wait for some time."}, :status => 429
      return
    end
    REDIS.incr(key)
    true
  end

  def throttle_token
    if @token.present?
      key = "count:#{@token}"
      count = REDIS.get(key)

      unless count
        REDIS.set(key, 0)
        REDIS.expire(key, THROTTLE_TIME_WINDOW)
        return true
      end

      if count.to_i >= THROTTLE_MAX_REQUESTS
        render :json => {:message => "You have fired too many requests. Please wait for some time."}, :status => 429
        return
      end
      REDIS.incr(key)
      true
    else
      false
    end
  end
end
```

run file này để test test_thrott.rb

```ruby
require 'net/http'
require 'uri'
require 'json'

for i in 1..300
  p "\n------------------\n"
  print "Welcome $i times"
  p "\n"

  uri = URI.parse("http://localhost:3000/api/v1/users")
  request = Net::HTTP::Get.new(uri)
  request["Authorization"] = "Token token=cF34T1et0TVLNu9z77Tvrwtt"

  req_options = {
    use_ssl: uri.scheme == "https",
  }

  response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
    http.request(request)
  end

  p response.code
  p JSON.parse response.body
end
```

Vậy mình đã chia sẻ hầu hết các bước trong xây dựng một app API. Chúc các bạn thành công!

Nếu có gì thiếu sót hoặc thắc mắc, bạn comment bên dưới nhé! Peace!