Khi nói đến xác thực trong Rails ta hay nghĩ đến gem [Devise](https://github.com/plataformatec/devise): 
> Devise is a flexible authentication solution for Rails based on Warden

> Devise là một giải pháp authentication linh hoạt cho Rails dựa trên Warden

Nhưng đôi khi những hỗ trợ của Devise sẽ k cần thiết do yêu cầu thay đổi, Devise không phải là một sự lựa chọn tối ưu nữa. Như dự án mình làm không thể sử dụng Devise được do spec thay đổi.
Vậy trong trường hợp này ta lên làm gì để phù hợp, tối ưu??
Để giải quyết vấn đề này thì ta có thể làm việc trực tiếp ở tầng sâu hơn đó là  [Warden](https://github.com/wardencommunity/warden)

Warden thực hiện xác thực ở  middleware level. Nó thực hiện bằng cách sử dụng [Strategies](https://github.com/wardencommunity/warden/wiki/Strategies)

**Các tính năng của Devise**: 
Trước khi lọai bỏ Devise ra khỏi ứng dụng của bạn. chúng ta cùng xem những gì sẽ phải làm để thay thế các support của Devise:

1.  Một vài Strategy có tính năng giống với `DatabaseAuthenticatable,  Rememberable`...
2.  Controller filters và helpers như: `authenticate, user_signed_in?, current_user, user_session`...
# Cài đặt
Ta bắt đầu với ứng dụng  [rails-api](https://github.com/rails-api/rails-api) hiển thị thời gian:
```
 rails g controller Welcome index
```
Thêm vào routes:
```
# config/routes.rb
Rails.application.routes.draw do
  get 'welcome/index'.
  root 'welcome#index'
end
```

```
# app/controllers/welcome_controller.rb
class WelcomeController < ApplicationController
  def index
    render text: "Welcome guest, it's #{Time.now}"
  end
```
Sau đó ta add gem `warden` và `bcrypt` (Để sử dụng `has_secure_password` mã hóa password)
```
# Gemfile
gem 'warden'
gem 'bcrypt'
```
# User Model
Ta tạo 1 model User chứa `authentication_token`, `password_digest`
```
class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :authentication_token
      t.string :password_digest

      t.timestamps null: false

      t.index :authentication_token, unique: true
    end
  end
end
```
Ở model `user.rb`:
```

# app/models/user.rb
class User < ActiveRecord::Base
  after_create :generate_authentication_token!

  has_secure_password

  private
  # Generate a session token
  def generate_authentication_token!
    self.authentication_token = Digest::SHA1.hexdigest("#{Time.now}-#{self.id}-#{self.updated_at}")
    self.save
  end
end
```
# Add Warden to the Rack Middleware stack
Chúng ta cần phải thêm Warden vào middleware stack của ứng dụng

Nhìn vào middleware stack hiện tại:
```
$ rake middleware

use ActionDispatch::Static
use Rack::Lock
use #<ActiveSupport::Cache::Strategy::LocalCache::Middleware:0x000000052979d0>
use Rack::Runtime
use ActionDispatch::RequestId
use Rails::Rack::Logger
use ActionDispatch::ShowExceptions
use ActionDispatch::DebugExceptions
use ActionDispatch::RemoteIp
use ActionDispatch::Reloader
use ActionDispatch::Callbacks
use ActiveRecord::Migration::CheckPending
use ActiveRecord::ConnectionAdapters::ConnectionManagement
use ActiveRecord::QueryCache
use ActionDispatch::ParamsParser
use Rack::Head
use Rack::ConditionalGet
use Rack::ETag
run RailsApiWarden::Application.routes
```
Như ở phần hướng dẫn cài đặt Warden có nhắc đến: *Warden must be downstream of some kind of session middleware.*. 

Chúng ta sẽ thêm Warden sau `ActionDispatch::ParamsParser`
```
# config/application.rb
# Add Warden in the middleware stack
config.middleware.insert_after ActionDispatch::ParamsParser, Warden::Manager do |manager|
end
```
Sau đó kiểm tra xem Warden đã thực sự trong stack:
```
$ rake middleware

use ActionDispatch::Static
use Rack::Lock
use #<ActiveSupport::Cache::Strategy::LocalCache::Middleware:0x000000037c80f0>
use Rack::Runtime
use ActionDispatch::RequestId
use Rails::Rack::Logger
use ActionDispatch::ShowExceptions
use ActionDispatch::DebugExceptions
use ActionDispatch::RemoteIp
use ActionDispatch::Reloader
use ActionDispatch::Callbacks
use ActiveRecord::Migration::CheckPending
use ActiveRecord::ConnectionAdapters::ConnectionManagement
use ActiveRecord::QueryCache
use ActionDispatch::ParamsParser
use Warden::Manager
use Rack::Head
use Rack::ConditionalGet
use Rack::ETag
run RailsApiWarden::Application.routes
```
Như vậy là đã thành công!
# Strategy – Authentication Token
Ta sẽ định nghĩa 1 strategy để authenticate user thông qua params `authentication_token` 
```

# lib/strategies/authentication_token_strategy.rb
class AuthenticationTokenStrategy < ::Warden::Strategies::Base
  def valid?
    authentication_token
  end

  def authenticate!
    user = User.find_by_authentication_token(authentication_token)
    user.nil? ? fail!('strategies.authentication_token.failed') : success!(user)
  end

  private
  def authentication_token
    params['authentication_token']
  end
end
```
`authenticate!` sẽ tìm kiếm `user` mà match với `authentication_token`
Chúng ta có thể nhìn thấy method `authenticate!` gọi `fail!` hoặc `success!`. Đây là các method helper được cung cấp bởi Warden. 

`Strategy` đã được cài đặt, Ta thêm nó vào `Warden` bằng cách:

````
# config/application.rb
# Add Warden in the middleware stack
config.middleware.insert_after ActionDispatch::Flash, Warden::Manager do |manager|
  manager.default_strategies :authentication_token
end
````

```

#config/initializers/warden.rb
require Rails.root.join('lib/strategies/authentication_token_strategy')

Warden::Strategies.add(:authentication_token, AuthenticationTokenStrategy)
```
# Controller
Ta sẽ add thêm các method giống với các helper của Devise cung cấp như: `current_user`, `signed_in?`
```
# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include WardenHelper
end
```

```
# app/controllers/concerns/warden_helper.rb
module WardenHelper
  extend ActiveSupport::Concern

  included do
    helper_method :warden, :signed_in?, :current_user

    prepend_before_filter :authenticate!
  end

  def signed_in?
    !current_user.nil?
  end

  def current_user
    warden.user
  end

  def warden
    request.env['warden']
  end

  def authenticate!
    warden.authenticate!
  end
end
```
Như vậy đã xong, giờ ta test thử:

Trường hợp authenticate thành công:

 ![](https://images.viblo.asia/ee3decdb-710c-41dc-8f32-8fd2d9f5f9d1.png)
 
 Trường hợp authenticate thất bại: Nhập bừa 1 authenticate_token và sẽ thấy 1 trang thông báo khá xấu
 
 ![](https://images.viblo.asia/24b63dd2-5e55-4b02-a76d-9915f7ff1ab5.png)
 
 Ta có thể thay thế trang lỗi bằng cách thêm `failure_app`:
```
# config/application.rb
config.middleware.insert_after ActionDispatch::Flash, Warden::Manager do |manager|
  manager.default_strategies :authentication_token
  manager.failure_app = UnauthorizedController
end
```

```
# app/controllers/unauthorized_controller.rb
class UnauthorizedController < ActionController::Metal
  def self.call(env)
    @respond ||= action(:respond)
    @respond.call(env)
  end

  def respond
    self.response_body = "Unauthorized Action"
    self.status = :unauthorized
  end
```

![](https://images.viblo.asia/91bfca97-ffce-41f9-b865-55567e5bbce0.png)

Như vậy đã hoàn thành. Hi vọng bài viết sẽ giúp ích cho bạn trong tương lai :D 

**Nguồn Tham Khảo**:

http://blog.maestrano.com/rails-api-authentication-with-warden-without-devise/