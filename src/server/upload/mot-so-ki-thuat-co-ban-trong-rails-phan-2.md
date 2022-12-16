## Giới thiệu
Xin chào các bạn, hôm nay mình sẽ giới thiệu cách sử dụng một số kỹ thuật cơ bản trong Rails dành cho các bạn mới bắt đầu tìm hiểu về Rails. <br>
Đầu tiên chúng ta tạo một project để demo <br>
```ruby
rails new rails_admin_demo
```
Thêm một số gem cơ bản vào Gemfile <br>
```ruby
gem "bootsnap", ">= 1.1.0", require: false
gem "coffee-rails", "~> 4.2"
gem "jbuilder", "~> 2.5"
gem "jquery-rails"
gem "mini_racer"
gem "puma", "~> 3.0"
gem "rails", "~> 5.2.1"
gem "sass-rails", "~> 5.0"
gem "turbolinks", "~> 5"
gem "uglifier", ">= 1.3.0"
```
## Đăng nhập bằng user_name với gem"devise"
Đầu tiên, các bạn hãy thêm gem "devise" vào Gemfile và thực hiện như bài viết này của mình
[Cách sử dụng gem "devise"](https://viblo.asia/p/cach-su-dung-gem-devise-bWrZng8Ylxw)
<br> Để thực hiện đăng nhập bằng cả username và email, ta thêm các dòng sau vào `app/models/user.rb`
<br> Đầu tiên, khởi tạo 1 biến login, thêm biến này làm `authentication_keys`
<br> Định nghĩa hàm login cho phép đăng nhập bằng cả username và email
```ruby
attr_writer :login

devise :database_authenticatable, :registerable, :recoverable, :rememberable,
  :validatable, authentication_keys: [:login]

def login
  @login || self.username || self.email
end
```
Tiếp theo ta thêm một số validate tính hợp lệ của username. Username phải được bắt buộc nhập khi đăng ký, không trùng nhau, username chỉ chứa chữ và số.
<br> Hàm validate_username để kiểm tra sự tồn tại của username
```ruby
validate :validate_username

VALID_USER_NAME_REGEX = /^[a-zA-Z0-9_\.]*$/
validates :username, presence: :true, uniqueness: {case_sensitive: false},
  format: {with: VALID_USER_NAME_REGEX}

def validate_username
  if User.where(email: username).exists?
    errors.add(:username, :invalid)
  end
end
```
Cuối cùng và quan trọng nhất là hàm xử lý cấu hình lại devise để đăng nhập bằng username được
```ruby
def self.find_for_database_authentication(warden_conditions)
  conditions = warden_conditions.dup
  if login = conditions.delete(:login)
    where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value",
    {value: login.downcase}]).first
  elsif conditions.has_key?(:username) || conditions.has_key?(:email)
    where(conditions.to_h).first
  end
end
```
Trong views/devise/sessions/new.html.erb, bạn sửa đổi thành như sau:
```ruby
<h2>Log in</h2>

<%= form_for(resource, as: resource_name, url: session_path(resource_name)) do |f| %>
   <div class="form-group">
    <%= f.label :login %><br />
    <%= f.text_field :login, autofocus: true, class: "form-control" %>
  </div>
  
  <div class="form-group">
    <%= f.label :password %><br />
    <%= f.password_field :password, autocomplete: "off", class: "form-control" %>
  </div>

  <% if devise_mapping.rememberable? -%>
    <div class="form-group">
      <%= f.check_box :remember_me %>
      <%= f.label :remember_me %>
    </div>
  <% end -%>

  <div class="actions">
    <%= f.submit "Log in", class: "btn btn-primary" %>
  </div>
<% end %>

<%= render "devise/shared/links" %>
```
## Sử dụng gem "rails_admin" để tạo trang quản trị
Thêm gem "rails_admin" vào Gemfile, cài đặt bằng lệnh `bundle install` trên cmd.
Tiếp theo, sau đó chạy lệnh
```ruby
rails g rails_admin:install
```
Nó sẽ tạo ra file `config/initializers/rails_admin.rb`, các action trong giao diện admin sẽ phụ thuộc vào file này.
```ruby
config/initializers/rails_admin.rb
RailsAdmin.config do |config|
  ### Popular gems integration
  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
end
```
Trong routes.rb bạn hãy thêm dòng sau: 
```ruby
mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
 ```
Tiếp theo chúng ta sẽ cấu hình một vài thứ để demo:
<br> Tạo home_page
<br>Trong config/routes.rb, thêm 2 dòng sau:
```ruby
root "static_pages#show", page: "home"
get "/static_pages/:page", to: "static_pages#show"
```
Tạo Controller StaticPages và thêm nội dung như sau:
```ruby
class StaticPagesController < ApplicationController
  def show
    render template: "static_pages/#{params[:page]}"
  end
end
```
Thêm một số bảng để quản lý, thêm bảng Post liên kết với User<br> 
`rails g scaffold Post title:string content:text user:references`
<br> Thêm bảng Comment liên kết với User và Post<br> 
`rails g scaffold Comment content:text user:references post:references`
<br>
Thêm trường role vào bảng User `rails g migration AddRoleToUsers`
```ruby
class AddRoleToUsers < ActiveRecord::Migration
  def change
    add_column :users, :role, :integer, default: 0
  end
end
```
Trong model user.rb, thêm `enum role: [:user, :admin]`
<br>Để điều hướng sau khi đăng nhập, nếu user là admin thì vào rails_admin_path
```ruby
def after_sign_in_path_for(resource)
  if current_user.admin?
    rails_admin_path
  else
    root_path
  end
end
```
Tiếp theo là đến bước quan trọng nhất khi sử dụng rails admin đó là thiết đặt nó theo yêu cầu của chúng ta trong `config/initializers/rails_admin.rb`
<br> Khi sử dụng kết hợp gem devise, ta thêm thiết đặt sau: 
```ruby
  ## == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)
```
Thiết lập quyền truy cập trang admin 
```ruby
config.parent_controller = "::ApplicationController"
config.authorize_with do |controller|
  unless current_user && current_user.admin?
    redirect_to(
      main_app.root_path,
      alert: "You are not permitted to view this page"
    )
  end
end
```
Thiết đặt tên trang hiển thị trên DashBoard 
```ruby
config.main_app_name = ["Experiment With Rails Admin", ""]
```
Thiết lập các model cần quản lý. Nếu không có thiết đặt này, tất cả model đều được quản lý
```ruby
config.included_models = ["User", "Post", "Comment"]
```
Thiết lập các action mà mỗi model cần có
```ruby
dashboard                     # Bắt buộc phải có
index                         # Bắt buộc phải có
new                           # Tính năng tạo mới record có với mọi model
export do
  only ["User", "Post"]       # Tính năng export dữ liệu chỉ có với model User và Post
end
bulk_delete
show
edit do
  only ["User", "Post"]       # Tính năng edit chỉ có với model User và Post
end
delete do
  only ["Post", "Comment"]    # Tính năng delete chỉ có với model Comment và Post
end
show_in_app
```
Theo mặc định, với mỗi modal rails_admin sẽ lấy tất cả các trường để hiển thị.
<br> Để cấu hình chỉ hiển thị các trường cần thiết, thêm đoạn mã sau vào trong block cha `RailsAdmin.config do |config|`
```ruby
RailsAdmin.config do |config|
  .....
  .....
  RailsAdmin.config do |config|
    # Model cần config
    config.model "User" do
      # Danh sách các trường có trong bảng quản lý User
      list do
        exclude_fields :id, :created_at
        
        fields :username do
          label "User name"
        end
        fields :email do
          label "Email"
        end
        fields :password do
          label "Password"
        end

        fields :address do
          label "Address"
        end

        fields :phone do
          label "Phone"
        end
      end
       # Danh sách các trường cần có trong form tạo và sửa User
      fields :username do
        label "User name"
      end

      fields :email do
        label "Email"
      end
      
      fields :password do
        label "Password"
      end

      fields :address do
        label "Address"
      end

      fields :phone do
        label "Phone"
      end
    end
    ....
    ....
end
```
## Tổng kết
Trên đây là quá trình mình tạo một app demo sử dụng rails admin để xây dựng trang quản lý của admin, các bạn có thể xem mã nguồn tại [Source Code](https://github.com/devtuananh/rails_admin_demo). 
<br>Cảm ơn mọi người đã dành thời gian đọc bài viết. Chúc mọi người học tập hiệu quả.
## Tham khảo
https://viblo.asia/p/tim-hieu-gem-rails-admin-ZabG9zkdvzY6
<br>https://github.com/sferik/rails_admin
<br>https://github.com/sferik/rails_admin/wiki