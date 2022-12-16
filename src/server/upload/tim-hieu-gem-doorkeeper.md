**Mình xin chia sẻ về gem Doorkeeper mà mình biết:**

Đầu tiên chúng ta tạo project có tên gem_doorkeeper bằng lệnh:
```
rails new gem_doorkeeper
```
tiếp theo add vào gemfile:
```
gem 'doorkeeper'
```
sau đó:
```
bundle install
```
Sau đó chúng ta chạy lệnh generate để tạo ra các file config và local:
```
rails generate doorkeeper:install 
```
## Cấu hình:
## Active Record

Mặc định doorkeeper được thiết lập để sử dụng cho active record, để bắt đầu, hãy chạy lệnh migration (chỉ hỗ trợ Rails >= 5)
chúng ta chạy lệnh:
```
rails generate doorkeeper:migration
```
Nếu chúng ta muốn gán foreign keys cho migration của chúng ta, thêm dòng sau vào file migrate vừa mới được tạo ra
```
add_foreign_key :table_name, :users, column: :resource_owner_id
```
## ROUTES

Khi chạy lệnh rails generate doorkeeper:install, use_doorkeeper sẽ được tự động thêm vào routes
```
Rails.application.routes.draw do
  use_doorkeeper
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
```
sau đó chúng ta rake routes sẽ thấy các routes sau:
```
GET       /oauth/authorize/:code
GET       /oauth/authorize
POST      /oauth/authorize
DELETE    /oauth/authorize
POST      /oauth/token
POST      /oauth/revoke
resources /oauth/applications
GET       /oauth/authorized_applications
DELETE    /oauth/authorized_applications/:id
GET       /oauth/token/info
```
## Authenticating

Chúng ta cần configure Doorkeeper để có thể dử dụng cho resource_owner và authentication:
vào thu mục config/initializers/doorkeeper.rb
```
Doorkeeper.configure do
  resource_owner_authenticator do
    User.find_by_id(session[:current_user_id]) || redirect_to(login_url)
  end
end
```

## Rake Tasks
 Nếu chúng ta đang sử dụng rake, chúng ta có thể tải các tác vụ rake được cung cấp bởi gem này, bằng cách thêm dòng sau vào Rakefile:
 ```
 Doorkeeper::Rake.load_tasks
 ```
 Protecting resources with OAuth:
 Để có thể bảo vệ API của chúng ta với OAuth , chỉ cần đặt before_action cho tất cả các action mà chúng ta muốn bảo vệ:  example:
 Ruby on Rails controllers:
 ```
 class Api::V1::ProductsController < Api::V1::ApiController
  before_action :doorkeeper_authorize! # Sẽ yêu cầu access token cho tất cả các action

  # các action của chúng ta
end
 ```
 Khi đã có before_action :doorkeeper_authorize!, mỗi request của chúng ta trong Header cần phải có Authorization: access token
 
##  Access Token Scopes
 chúng ta có thể yêu cầu  access token để có phạm vi cụ thể trong một số action nhất định: 

Đầu tiên cấu hình scope trong trình khởi chạy / doorkeeper.rb
```
Doorkeeper.configure do
  default_scopes :public # if no scope was requested, this will be the default
  optional_scopes :admin, :write
end
```
Và ở controller:
```
class Api::V1::ProductsController < Api::V1::ApiController
  before_action -> { doorkeeper_authorize! :public }, only: :index
  before_action only: [:create, :update, :destroy] do
    doorkeeper_authorize! :admin, :write
  end
end
```
Ở đây có 1 chú ý phân biệt giữa:

```doorkeeper_authorize! :admin, :write ```
và
```
doorkeeper_authorize! :admin
doorkeeper_authorize! :write
```
Trường 1 là access token sẽ được yêu cầu sopce :admin hoặc scope :write, trường hợp 2 là yêu cầu cả 2 scope

## Custom Access Token Generator

Theo mặc định, mã thông báo truy cập 128 bit sẽ được tạo. Nếu chúng ta yêu cầu token tùy chỉnh, chẳng hạn như JWT, hãy chỉ định object phản hồi .generate (options = {}) và trả về một chuỗi được sử dụng làm mã thông báo.

```
Doorkeeper.configure do
  access_token_generator "Doorkeeper::JWT"
end
```
WT token hỗ trợ Doorkeeper-JWT (https://github.com/chriswarren/doorkeeper-jwt)

## Custom Base Controller
Theo mặc định Doorkeeper's main controller Doorkeeper::ApplicationController kế thừa từ ActionController::Base. 
Chúng ta có thể muốn sử dụng bộ own controller để kế thừa từ, để giữ cho Doorkeeper controller trong cùng một bối cảnh so với phần còn lại ứng dụng của chúng ta:
```
Doorkeeper.configure do
  base_controller 'ApplicationController'
end
```
## Authenticated resource owner
Nếu chúng ta muốn trả lại dữ liệu dựa trên current resource owner, nói cách khác là access token owner, chúng ta có thể muốn định nghĩa một method trong controller của chúng ta trả về resource owner instance
```
class Api::V1::CredentialsController < Api::V1::ApiController
  before_action :doorkeeper_authorize!
  respond_to    :json

  # GET /me.json
  def me
    respond_with current_resource_owner
  end

  private

  # Tìm ra user là chủ của access token
  def current_resource_owner
    User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end
end
```
Vậy là chúng ta đã có thể tìm ra được current_resource_owner(chính xác là 1 user) thông qua access token được gửi kèm lên từ Header

Link tham khảo: (https://github.com/doorkeeper-gem/doorkeeper#protecting-resources-with-oauth-aka-your-api-endpoint)