Mục đích của bài này là hướng dẫn cho bạn làm thế nào để bắt đầu với việc xây dựng API tốt trong Rails. 

Để xây dụng tốt API, bạn cần biết và tìm hiểu những cái cần thiết như sau:

## Tạo project API mới
Với Rails, từ phiên bản 5 trở lên thì Rails có hỗ trợ mình tạo project API , không liên quan đến View.
Để tạo project API mới, bạn chỉ cần thêm --api như sau:
```
rails new api_app_name --api
```
Command này sẽ tạo project API mới để bạn có thể bắt đầu với API một cách nhanh chống và dễ dàng.

## Sử dụng RSpec cho việc testing API
Rails thì có sẵn unit test để mình có thể dùng luôn không cần dùng gem ở ngoài. Tuy nhiên, nó không flexible để dùng lắm, vậy người ta thường dùng gem khác để hỗ trợ viêc viết test một cách dễ dàng, nó là 
`gem "rspec-rails"` và `gem "factory_girl_rails"` để tạo test data

```ruby
group :development, :test do

  # Use RSpec for specs
  gem "rspec-rails"

  # Use Factory Girl for generating random test data
  gem "factory_girl_rails"
end
```
```ruby
bundle install
# generate các file và folder cần thiết để viết RSpec
rails g rspec:install  
```

## Serializing API Output
Kết quả trả về của API là rất quan trọng. Vậy để hỗ trợ việc format kết quả trả về hiêu quả và dễ dàng, ở đây gem "active_model_serializers" sẽ giúp bạn việc này.

```ruby
gem "active_model_serializers"

bundle install
```

Sau đó bạn có thể tạo serializer cho model nào đó như sau
```
rails g serializer user
```

Nó sẽ generate ra file như sau:
```ruby
# app/serializers/user_serializer.rb

class UserSerializer < ActiveModel::Serializer
  attributes :id
end
```

Ngoài id, bạn có thể thêm các attributes khác mình cần. 
Để xem chi tiết hơn cách sử dụng nó, bạn xem ở đây https://github.com/rails-api/active_model_serializers

## Enabling CORS
Nếu bạn đang xây dựng public API, bạn cần phải enable `Cross-Origin Resource Sharing (CORS)` để có thể cho phép các cross-origin AJAX requests khác gọi đưọc. 

Ví dụ cụ thể hơn, bạn viết project sử dụng ReactJs ở domain khác, và API thì lại ở domain khác. Vậy để ReactJs gọi API đó được thì phải enable CORS.
```
gem "rack-cors"
```
```
bundle install
```

Bổ sung code trong `config/application.rb` như sau

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

Code trên có nghĩa là nó sẽ cho phép requests :get, :post, :options từ các origin bất kỳ.

Chi tiết hơn bạn xem ở đây https://github.com/cyu/rack-cors

## Versioning API
Cái này là rất quan trọng đối với bất kỳ project API nào. Trước khi code, bạn phải chuẩn bị cấu trúc folder và files cho API. 

Versioning API có nghĩa là bạn sẽ tạo namespace API cho từng version như v1, v2, ... 
Với cách như thế này, khi bạn cần implement version mới cho API, nhưng bạn vẫn giữa được version API cũ mà không ảnh hưởng đến những Clients đang sử dụng.

Cấu trúc như sau:

```
app/controllers/
.
|-- api
|   `-- v1
|       |-- api_controller.rb
|       `-- users_controller.rb
|-- application_controller.rb
```

**Controller có code nư sau:**

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

**Routes có code như sau:**
```ruby
# config/routes.rb

  scope module: "api" do
    namespace :v1 do
      resources :users
    end
  end

```

## Authenticating API
Khi code API, việc authenticate thì không có cookies hoặc sessions.
Vậy để xây dựng authenticate trong API thì bạn cần sử dụng HTTP Token. 

Khi client gọi vào thì phải kèm thêm `HTTP Authorization` trong header có dạng như sau:
```
Authorization: Token token="WCZZYjnOQFUYfJIN2ShH1iD24UHo58A6TI"
```

Nếu bạn không muốn dùng gem khác, bạn cũng có thể tự viết. 

* Đầu tiên, thêm column `api_key` vào bảng user
```
rails g migration AddApiKeyToUsers api_key:string
```

Trong mode User thì update code như sau:

```ruby
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

Trước khi tạo user, mình sẽ generate ra một api_key / token cho user đó. 

* Sử dụng method sẵn của Rails `authenticate_or_request_with_http_token` trong controllers để implement việc authentication

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
    self.headers["WWW-Authenticate"] = %(Token realm="#{realm}")
    render json: 'Bad credentials', status: :unauthorized
  end
end
```

Bây giờ, nếu bạn muốn request đến API nào đó, bạn phải kèm theo `Authorization: Token token=:token` trong header. Nếu không có, nó sẽ return unauthorized.

Ngoài ra, nếu bạn không muốn tự viết, bạn có thể dùng gem khác để cho việc phát triên của mình dễ dàng và hiêu quả hơn.
```
gem 'doorkeeper'
```
Chi tiết: https://github.com/doorkeeper-gem/doorkeeper

## API Documenting
Sau khi bạn code xong các model, controllers, ... bạn cũng phải có tài liệu để đặc tả các API của mình để cho người khác xem và biết các sử dụng API đó.

Có những gem sau đây, bạn có thể chọn để sử dụng:
* gem 'apipie-rails' : https://github.com/Apipie/apipie-rails
* gem 'swagger-docs' : https://github.com/richhollis/swagger-docs

## Tool để request API
Cách đơn giản nhất là sử dụng `curl` command, nhưng nó khá mất nhiều thời gian.
Mình recommend bạn sử dụng phần mêm postman, là tool hỗ trợ rất nhiều chức năng khi làm việc với API.
https://www.getpostman.com/

## References
https://ntam.me/building-the-perfect-rails-5-api-only-app/

https://sourcey.com/articles/building-the-perfect-rails-api