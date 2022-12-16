Trong bài viết này chúng ta sẽ cùng nhau build 1 app Rails API thuần, sử dụng Rails 5 và Ruby 2.5. Xin được gửi lời cảm ơn đến `rails-api` gem đã được tích hợp sẵn vào Rails 5 core, biến Rails đã và đang trở thành 1 ứng cử viên lý tưởng để xây dựng các API một cách nhanh chóng và dễ dàng.

Cho đến bây giờ, có lẽ lựa chọn tốt nhất để tạo APIs trong Ruby là Grape. Bên cạnh đó, vẫn có nhiều lợi thế khi sử dụng Rails 5 API, ví dụ như ActiveRecord mặc định, 1 cộng đồng developer mạnh mẽ, và có sẵn các tính năng asset pipeline lẫn giao diện người dùng - nếu như bạn cần để phát triển ứng dụng sau này.

### Cài Rails 5

Đầu tiên, cần chắc chắn bạn đã cài Ruby bản 2.2.2 hoặc mới hơn và Rails 5
```
~ ruby -v
ruby 2.5.0p0 (2017-12-25 revision 61468) [x86_64-linux]
~ rails -v
Rails 5.1.6
```

Theo như [Rails guide](https://edgeguides.rubyonrails.org/api_app.html), chúng ta cần tạo 1 app Rails thuần API bằng cách thêm tùy chọn `--api` vào command line khi khởi tạo 1 Rails app mới, như bên dưới:
```
rails new api_app --api
```

OK giờ ta đã có 1 API app mới hoàn toàn. Vào việc nào!
![](https://images.viblo.asia/7133a8db-9f8f-4d5a-b4e0-967e07407f85.png)

### RSpec
Trước tiên cần setup RSpec để test trước. Để cài RSpec, chỉ cần thêm gem `rspec-rails` vào Gemfile trong group `:development, :test`.
```
group :development, :test do

  # Use RSpec for specs
  gem 'rspec-rails', '>= 3.5.0'

  # Use Factory Girl for generating random test data
  gem 'factory_girl_rails'
end
```

Chạy bundle và cài rspec: 
```
bundle
rails g rspec:install 
```
OK!

### Xây dựng API
Bắt đầu từ API controlers.
Khi app được khởi tạo với option `--api`, ta có thể dùng generator scaffold mặc định để generate ra API resources như bình thường mà ko cần thêm đối số đặc biệt nào.
```
rails g scaffold user name email
```

Lệnh này sẽ generate ra cấu trúc file như bên dưới: 
```
invoke  active_record
create    db/migrate/20181001081819_create_users.rb
create    app/models/user.rb
invoke    rspec
create      spec/models/user_spec.rb
invoke      factory_girl
create        spec/factories/users.rb
invoke  resource_route
route    resources :users
invoke  scaffold_controller
create    app/controllers/users_controller.rb
invoke    rspec
create      spec/controllers/users_controller_spec.rb
create      spec/routing/users_routing_spec.rb
invoke      rspec
create        spec/requests/users_spec.rb
```

Lưu ý rằng ko có file views nào được tạo ra khi chạy dưới API mode cả.

OK, giờ migrate lại data và chạy thử app nào :v: 
```
rails db:migrate
rails s
```

Xong phần setup, giờ sang phần quan trọng nào :v: 

### Serializing API output
Chúng ta cần đổ dữ liệu dưới dạng chuổi JSON về các column trong database, vậy làm cách nào để quản lý điều này 1 cách tiện lợi nhất?
Thông thường ta hay dùng các engine như `jbuilder`, tuy nhiên hiện tại app này ko dùng views nên ta sẽ ko chọn jbuilder. Thật may AMS(Active Model Serializers) đã cung cấp sẵn cho chúng ta 1 layer giữa model và controller, từ đây ta có thể gọi `to_json` hay `as_json` trên `ActiveRecord` object/collections như bình thường, trong khi vẫn xuất ra định dạng API như mong muốn.

Việc cần làm là thêm gem `active_model_serializers` và Gemfile: 
```
gem "active_model_serializers"
```
Chạy bundle và tạo serializer mặc định cho model `User`:
```
bundle
rails g serializer user
```

Lênh này sẽ tạo ra file `app/serializers/user_serializer.rb`, ta sẽ thấy code như sau: 
```
class UserSerializer < ActiveModel::Serializer
  attributes :id
end
```

Chú ý rằng chỉ có trường `:id` là được thêm vào mặc định, ta sẽ thêm trường `:name` và `:email` vào cùng:
```
class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
end
```

> Nếu model có các relationships khác, ta cần khai báo thêm vào serializers nếu muốn các thuộc tính này cũng đc serialize ở output

Ta cũng cần include `ActionController::Serialization` vào controller:
```
class ApplicationController < ActionController::API
  include ActionController::Serialization
end
```

OK! Giờ mỗi khi ta cần lấy data gì thì chỉ những thuộc tính đã khai báo trong `UserSerializer` mới được render ra. Tuyệt vời!
Nếu bạn cần thêm các config khác, vui lòng xem hướng dẫn tại [active_model_serializers](https://github.com/rails-api/active_model_serializers).

### Enabling CORS
Nếu muốn xây dựng 1 public API, ta cần quan tâm đến `CORS` (Cross-Orign Resource Sharing), đây là một cơ chế sử dụng các HTTP header bổ sung để báo cho trình duyệt cho phép ứng dụng web đặt tại server(domain ..) này có thể giao tiếp với 1 ứng dụng đặt tại server khác, hay còn gọi là giao tiếp chéo(cross-origin). App của ta sẽ tạo 1 `cross-oringin HTTP request` khi nó request đến một origin khác, hiểu sơ sơ vậy :v: .

Nghe thì có vẻ phức tạp, nhưng mà ta chỉ cần thêm `rack-cors` vào Gemfile:
```
gem "rack-cors"
```
Chạy `bundle`.

Ở file `config/application.rb`, thêm các config cần thiết vào, việc này sẽ cho phép GET, POST hay các OPTIONS requests từ bất cứ origin hay các nguồn khác:
```
module ApiApp
  class Application < Rails::Application
    ...

    config.middleware.insert_before 0, "Rack::Cors" do
      allow do
        origins '*'
        resource '*', :headers => :any, :methods => [:get, :post, :options]
      end
    end
  end
end
```

Với các options khác, bạn có thể tham khảo kĩ hơn ở [đây](https://github.com/cyu/rack-cors) .

### Thêm phiên bản cho API (versioning)
Để tiện cho việc maintain hay phát triển thêm mà ko bị conflict gì một khi app đã chạy, ta cần cân nhắc việc thêm phiên bản cho app. Việc thêm phiên bản này sẽ chia nhỏ API của mình thành nhiều namespaces, như `v1`  và `v2`.

Ta có thể sử dụng cấu trúc như bên dưới để giữ controller code trông dễ nhìn hơn bằng cách dùng namespace `Api::V1`:
```
app/controllers/
.
|-- api
|   `-- v1
|       |-- api_controller.rb
|       `-- users_controller.rb
|-- application_controller.rb
```

Code controllers sẽ trông như thế này: 
```
# app/controllers/api/v1/api_controller.rb

module Api::V1
  class ApiController < ApplicationController
    # Generic API stuff here
  end
end
```

```
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

Tiếp theo, cần setup routes `config/routes.rb` :
```
scope module: 'api' do
  namespace :v1 do
      resources :users
  end
end
```

`scope module: 'api'` cho phép chúng ta định tuyến đến controller trong API module mà ko show nó lên url. Tuy nhiên, version `v1/` là 1 phần trong url, nên ta đặt nó trong `namespace`.

Okie routes trông có vẻ ngon lành rồi. :D 

### Security: Rate limiting and Throttling
Để bảo vệ API khỏi DDoS, các cuộc tấn công brute force, hammering..., ta có thể dùng 1 Rake [middleware](https://guides.rubyonrails.org/rails_on_rack.html) là `Rack::Attack`. Gem [rack-attack](https://github.com/kickstarter/rack-attack) này cho phép chúng ta:
* whitelist: Cho phép xử lý bình thường nếu thỏa điều kiện
* blacklist: Gửi tin nhắn từ chối ngay lập tức đến requests
* throttle: Kiểm tra xem người dùng có nằm trong mức sử dụng được phép của họ hay không
* track: Theo dõi request để ghi lại những log mong muốn

Thêm `rack-attack` vào Gemfile: 
```
gem "rack-attack"
```

Chạy `bundle`.

Cập nhật file `config/application.rb` để include middleware stack:
```
module ApiApp
  class Application < Rails::Application
    # ...

    config.middleware.use Rack::Attack
  end
end
```

Tạo một initializer file mới trong `config/initializers/rack_attack.rb` để thêm các quy định về `Rack::Attack`. Ví dụ bên dưới rất cơ bản, bạn có thể tham khảo thêm.
```
class Rack::Attack

  # `Rack::Attack` is configured to use the `Rails.cache` value by default,
  # but you can override that by setting the `Rack::Attack.cache.store` value
  Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

  # Allow all local traffic
  whitelist('allow-localhost') do |req|
    '127.0.0.1' == req.ip || '::1' == req.ip
  end

  # Allow an IP address to make 5 requests every 5 seconds
  throttle('req/ip', limit: 5, period: 5) do |req|
    req.ip
  end

  # Send the following response to throttled clients
  self.throttled_response = ->(env) {
    retry_after = (env['rack.attack.match_data'] || {})[:period]
    [
      429,
      {'Content-Type' => 'application/json', 'Retry-After' => retry_after.to_s},
      [{error: "Throttle limit reached. Retry later."}.to_json]
    ]
  }
end
```

Các options khác bạn có thể tham khảo thêm ở trang chủ của [Rack::Attack gem](https://github.com/kickstarter/rack-attack).

Bây giờ API của chúng ta đã an toàn đối với các cuộc tấn công brute force, bạn có thể ngủ ngon rồi đấy! :v:

### Authenticating API
Việc này tất nhiên là cần thiết. Ở đây ta sẽ dùng HTTP token để lo việc xác thực, việc này sẽ yêu cầu client kèm theo 1 API key `Authorization` ở HTTP header mỗi khi gửi request lên, trông sẽ như thế này:
```
Authorization: Token token="tZh0LKSBubkkTX9CL8MNKwtt"
```

Đầu tiên cần khởi tạo 1 migration để thêm `api_key` vào model `User`:
```
rails g migration AddApiKeyToUsers api_key:string
```

Và update code ở model `User`, thêm method sau:
```
class User < ActiveRecord::Base

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

Phía controller ta sẽ implement việc xác thực bằng cách sử dụng built-in `authenticate_or_request_with_http_token`.
```
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

OK. Giờ ta có thể dùng `curl` để test thử:
```
~ rails c

irb(main):003:0> User.create name: "Jane", email: "jane@gmail.com"
   (0.2ms)  begin transaction
  User Exists (0.4ms)  SELECT  1 AS one FROM "users" WHERE "users"."api_key" = ? LIMIT ?  [["api_key", "fVYn7HCuFtzfpotyNaReVQtt"], ["LIMIT", 1]]
  SQL (0.5ms)  INSERT INTO "users" ("name", "email", "created_at", "updated_at", "api_key") VALUES (?, ?, ?, ?, ?)  [["name", "Jane"], ["email", "jane@gmail.com"], ["created_at", "2018-10-02 04:30:32.577541"], ["updated_at", "2018-10-02 04:30:32.577541"], ["api_key", "fVYn7HCuFtzfpotyNaReVQtt"]]
   (4.2ms)  commit transaction
=> #<User id: 1, name: "Jane", email: "jane@gmail.com", created_at: "2018-10-02 04:30:32", updated_at: "2018-10-02 04:30:32", api_key: "fVYn7HCuFtzfpotyNaReVQtt">

#Token hợp lệ:
~ curl -H "Authorization: Token token=fVYn7HCuFtzfpotyNaReVQtt" http://localhost:3000/users
[{"id":1,"name":"Jane","email":"jane@gmail.com"},{"id":2,"name":"Wick","email":"wick@gmail.com"},{"id":3,"name":"Jam","email":"jam@gmail.com"}]% 

#Token ko tồn tại:
~ curl -H "Authorization: Token token=abc" http://localhost:3000/users
Bad credentials%
```

### Kết luận
Vậy là chúng ta vừa build xong một API app đơn giản. Hi vọng guide này sẽ hữu ích với bạn đọc. Thanks for reading and happy coding!!!

Nguồn: https://sourcey.com/building-the-prefect-rails-5-api-only-app/

Repo: https://github.com/quynhqtvn/api_app