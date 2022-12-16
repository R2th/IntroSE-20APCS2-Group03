Chúng ta sẽ tạo một ứng dụng Rails và Angular (2+) đơn giản cho phép người dùng tạo một account, login với nó và view profile sử dụng Devise và token authentication, trong bài viết này, chúng ta sẽ đi vào phần backend, tức là xây dựng ứng dụng Rails API Authentication. Frontend và backend sẽ chạy trên các máy chủ riêng biệt, giao tiếp với nhau thông qua một REST API.

### Setup
Trước tiên, hãy khởi tạo dự án Rails mới trong chế độ API và cấu hình cơ sở dữ liệu Postgres (DB):
```
rails new rails_devise_token_auth --api --database=postgresql
```
Tiếp theo, chúng ta sẽ add một số gem trong Gemfile:
```
gem 'devise_token_auth'
gem 'rack-cors', :require => 'rack/cors'
```
Chúng ta cần `rack-cors`, cho phép chúng ta thực hiện các yêu cầu Cross-domain Ajax, bởi vì chúng ta đang chạy trong chế độ API, vì thế backend chắc chắn sẽ chạy trên một máy chủ và domain riêng biệt.

Hãy cấu hình cors, chỉnh sửa tệp `./config/initializers/cors.rb`, thay thế nội dung của nó bằng các nội dung sau:
```
Rails.application.config.middleware.use Rack::Cors do
  allow do
    origins '*'
    resource '*',
    :headers => :any,
    :expose  => ['access-token', 'expiry', 'token-type', 'uid', 'client'],
    :methods => [:get, :post, :options, :delete, :put]
  end
end
```
### Initialise Devise User Model
Tạo một User model với DeviseTokenAuth:
```
rails generate devise_token_auth:install User auth
```
Kết quả của lệnh này sẽ trông giống như sau:
```
create  config/initializers/devise_token_auth.rb
create  db/migrate/20170131161242_devise_token_auth_create_users.rb
create  app/models/user.rb
insert  app/controllers/application_controller.rb
gsub  config/routes.rb
```
### Config routes
Lúc này, routes của chúng ta cần phải thay đổi như sau: 
```
Rails.application.routes.draw do
  root "application#root"
  namespace :api do
    namespace :v1, defaults: {format: :json} do
      mount_devise_token_auth_for "User", at: "auth"
    end
  end
  get "*path", to: "application#root"
end
```
Bây giờ hãy thử chạy `rails routes`, chúng ta sẽ có kết quả như sau: 
```

                  Prefix Verb   URI Pattern                    Controller#Action
        new_user_session GET    /auth/sign_in(.:format)        devise_token_auth/sessions#new
            user_session POST   /auth/sign_in(.:format)        devise_token_auth/sessions#create
    destroy_user_session DELETE /auth/sign_out(.:format)       devise_token_auth/sessions#destroy
       new_user_password GET    /auth/password/new(.:format)   devise_token_auth/passwords#new
      edit_user_password GET    /auth/password/edit(.:format)  devise_token_auth/passwords#edit
           user_password PATCH  /auth/password(.:format)       devise_token_auth/passwords#update
                         PUT    /auth/password(.:format)       devise_token_auth/passwords#update
                         POST   /auth/password(.:format)       devise_token_auth/passwords#create
cancel_user_registration GET    /auth/cancel(.:format)         devise_token_auth/registrations#cancel
   new_user_registration GET    /auth/sign_up(.:format)        devise_token_auth/registrations#new
  edit_user_registration GET    /auth/edit(.:format)           devise_token_auth/registrations#edit
       user_registration PATCH  /auth(.:format)                devise_token_auth/registrations#update
                         PUT    /auth(.:format)                devise_token_auth/registrations#update
                         DELETE /auth(.:format)                devise_token_auth/registrations#destroy
                         POST   /auth(.:format)                devise_token_auth/registrations#create
     auth_validate_token GET    /auth/validate_token(.:format) devise_token_auth/token_validations#validate_token
```
Chúng ta có thể tùy chỉnh để custom controller hoặc skip những chức năng không sử dụng, các bạn có thể tìm hiểu chi tiết về gem `devise-token-auth` tại [đây](https://github.com/lynndylanhurley/devise_token_auth).
### Config model User
Đối với hướng dẫn này, chúng ta sẽ disable xác thực tài khoản email. Mở file model User (./app/models/user.rb) và xóa mô-đun `confirmable` trong cấu hình devise, model User sẽ trông giống như sau:
```
class User < ActiveRecord::Base

  devise :database_authenticatable, 
         :registerable,
         :recoverable, 
         :rememberable, 
         :trackable,  
         :validatable
  include DeviseTokenAuth::Concerns::User
end
```
### Test API
Trước hết, hãy vào `rails c` và tạo một user để chúng ta có thể test chúng:
```
User.create(email: 'user@example.com', name: 'User One', password: "12345678")
```

Bây giờ chúng ta cuối cùng có thể bắt đầu server backend và kiểm tra API, khởi động server Rails:
```
rails s
```
Chúng ta sẽ đăng nhập bằng user mà chúng ta đã tạo ở trên, để kiểm tra REST API chúng ta sử dụng lệnh curl trong terminal:
```
curl -v -X "POST" "http://localhost:3000/auth/sign_in" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "email": "user@example.com",
  "password": "12345678"
}'
```
Server sẽ trả về dữ liệu user trong response body và auth token trong response headers.

Bây giờ chúng ta đã có một server backend với các chức năng authentication, phần tiếp theo chúng ta sẽ xây dựng frontend với Angular 2+.

Nguồn: https://medium.com/@avatsaev/angular-2-and-ruby-on-rails-user-authentication-fde230ddaed8