## Giới thiệu vấn đề
Hôm nay mình xin giới thiệu tới các bạn một gem trong Ruby on Rails mà được rất nhiều lập trình viên Rails sử dụng, đó là gem devise<br>
Devise là một gem rất linh hoạt được sử trong quá trình xác thực người dùng. Nó hỗ trợ hầu hết tất cả mọi việc bạn cần trong việc quản lí và xác thực người dùng trong hệ thống của bạn. Nó được sử dụng rộng rãi hầu hết ở mọi project.
## Tổng quan về gem devise
Devise là một giải pháp xác thực cho Rails được tích hợp với Warden và được cung cấp bởi những người tuyệt vời tại Plataformatec. <br>
Devise cung cấp 10 mô-đun khác nhau, tùy vào sự cần thiết cho ứng dụng của bạn, bạn có thể chọn 1 vài mô-đun: <br>
| Module | Mô tả chung |
| -------- | -------------------------------------------------------- |
|Database Authenticatable|Điều này mã hóa và lưu trữ một mật khẩu vào cơ sở dữ liệu để xác nhận tính xác thực của người dùng trong khi đăng nhập.|
|Omniauthable|Điều này giúp cho OmniAuth có thể hỗ trợ cho Devise. <br> Người dùng ứng dụng của bạn sẽ có thể đăng nhập bằng tài khoản như Facebook, Twitter và Google|
|Confirmable|Điều này cho phép việc gởi các email với các chỉ dẫn sẽ giúp xác nhận một tài khoản.|
|Recoverable|Mô-đun này giúp những khi người dùng quên mật khẩu và cần phải khôi phục nó. <br>Với điều này, thì người dùng sẽ có thể thiết lập lại mật khẩu.|
|Registerable|Điều này xử lý quá trình đăng ký của người dùng. <br>Nó cũng cho phép người dùng chỉnh sửa và xoá các tài khoản của họ.|
|Rememberable|Mô-đun này làm cho ứng dụng của bạn có thể nhớ một người dùng đã đăng nhập bằng cách lưu trữ một cookie.|
|Trackable|Mô-đun này giúp theo dõi tài khoản đăng nhập, mốc thời gian, và địa chỉ IP.|
|Timeoutable|Mô-đun này chịu trách nhiệm cho một phiên hết thời hạn mà đã không được kích hoạt trong một khoảng thời gian.|
|Validatable|Với mô-đun này, email và mật khẩu sẽ được kiểm tra tính hợp lệ.|
|Lockable|Điều này cung cập một lớp phụ của bảo mật, khi được kích hoạt, một tài khoản có thể bị khoá sau một số lần cố gắng đăng nhập thất bại.|
## Cách sử dụng
 Truy cập đến thư mục ứng dụng của bạn và thả các gem sau đây vào Gemfile của bạn.
```ruby
#Gemfile
gem "devise", "~> 4.1"
```
Bây giờ cài đặt Devise và các gem Bootstrap mà bạn vừa mới thêm vào.
```ruby 
bundle install
```
Tiếp theo, bạn cần phải chạy lệnh Rails để cài đặt các tập tin cấu hình cho Devise:
```ruby 
rails generate devise:install
```
Màn hình cmd sẽ hiện ra kết quả sau:
```ruby 
create  config/initializers/devise.rb
create  config/locales/devise.en.yml

Some setup you must do manually if you haven't yet:
 
 1. Ensure you have defined default url options in your environments files. Here
    is an example of default_url_options appropriate for a development environment
    in config/environments/development.rb:
 
      config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
 
    In production, :host should be set to the actual host of your application.
 
 2. Ensure you have defined root_url to *something* in your config/routes.rb.
    For example:
 
      root to: "home#index"
 
 3. Ensure you have flash messages in app/views/layouts/application.html.erb.
    For example:
 
      <p class="notice"><%= notice %></p>
      <p class="alert"><%= alert %></p>
 
 4. If you are deploying on Heroku with Rails 3.2 only, you may want to set:
 
      config.assets.initialize_on_precompile = false
 
    On config/application.rb forcing your application to not access the DB
    or load models when precompiling your assets.
 
 5. You can copy Devise views (for customization) to your app by running:
 
      rails g devise:views
```
Điều hướng đến layout ứng dụng của bạn, `app/views/layouts/application.html.erb`, và thêm vào thẻ body đoạn mã dưới đây:
```html
  <div class="container-fluid">
    <p class="notice"><%= notice %></p>
    <p class="alert"><%= alert %></p>
  </div>
```
Bạn cần phải định nghĩa tùy chọn URL mặc định cho môi trường phát triển của bạn. Thêm code ở dưới vào `config/environments/development.rb`.
```ruby
config.action_mailer.default_url_options = {host: "localhost", port: 3000}
```
### Tạo model
Bây giờ bạn cần tạo ra một model User cho Devise. Bạn có thể làm điều này bằng cách sử dụng terminal của bạn.
```ruby
rails generate devise User
```

Việc này sẽ tạo ra một tập tin `user.rb` trong thư mục `app/models` của bạn, được cấu hình như sau:
```ruby
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
```
Lệnh mà bạn chạy cũng sửa đổi tập tin `config/routes.rb` của bạn bằng cách thêm một route cho Devise.
```ruby
Rails.application.routes.draw do
  root "static_pages#home"
  devise_for :users
end
```
Bạn kiểm tra các route được tạo ra, chạy lệnh `rake routes`
```ruby
# Session routes for Authenticatable (default)
     new_user_session GET    /users/sign_in                    {controller:"devise/sessions", action:"new"}
         user_session POST   /users/sign_in                    {controller:"devise/sessions", action:"create"}
 destroy_user_session DELETE /users/sign_out                   {controller:"devise/sessions", action:"destroy"}

# Password routes for Recoverable, if User model has :recoverable configured
    new_user_password GET    /users/password/new(.:format)     {controller:"devise/passwords", action:"new"}
   edit_user_password GET    /users/password/edit(.:format)    {controller:"devise/passwords", action:"edit"}
        user_password PUT    /users/password(.:format)         {controller:"devise/passwords", action:"update"}
                      POST   /users/password(.:format)         {controller:"devise/passwords", action:"create"}

# Confirmation routes for Confirmable, if User model has :confirmable configured
new_user_confirmation GET    /users/confirmation/new(.:format) {controller:"devise/confirmations", action:"new"}
    user_confirmation GET    /users/confirmation(.:format)     {controller:"devise/confirmations", action:"show"}
                      POST   /users/confirmation(.:format)     {controller:"devise/confirmations", action:"create"}
```
Sử dụng lệnh trên cũng tạo ra một file migrate: `db/migrate/20151228154229_devise_create_users.rb`
```ruby
class DeviseCreateUsers < ActiveRecord::Migration
  def change
    create_table(:users) do |t|
      ## Database authenticatable
      t.string :email, null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip

      ## Confirmable
      # t.string   :confirmation_token
      # t.datetime :confirmed_at
      # t.datetime :confirmation_sent_at
      # t.string   :unconfirmed_email # Only if using reconfirmable

      ## Lockable
      # t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
      # t.string   :unlock_token # Only if unlock strategy is :email or :both
      # t.datetime :locked_at

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :reset_password_token, unique: true
    # add_index :users, :confirmation_token, unique: true
    # add_index :users, :unlock_token, unique: true
  end
end
```
Tại thời điểm này, bạn cần phải cập nhật cấu trúc cơ sở dữ liệu
```ruby
rake db:migrate
```
### Thêm các trường khác cho model User
Theo mặc đinh đăng nhập vào devise sử dụng email và mật khẩu, nhưng nếu bạn muốn người dùng đăng nhập với username duy nhất của họ thì sao?<br>
Nếu đó là những gì bạn muốn, thì bạn hoàn toàn có thể. Chúng ta hãy xem cách làm thế nào. <br>
Chạy lệnh dưới đây để thêm một số trường vào model User mà bạn cần:
```ruby
rails generate migration AddFieldsToUSers
```
Điều này sẽ thêm một số cột mới, trong đó có username vào bảng users của bạn. Cập nhật cơ sở dữ liệu của bạn:
```ruby
rake db:migrate
```
### Cấu hình view
Trong file config/initializers/devise.rb bạn cần cấu hình lại
```ruby
config.scoped_views = true
```
Bạn có thể generate ra toàn bộ view cho devise bằng cách gõ lệnh.
```ruby
rails generate devise:views
```
hoặc bỏ bớt đi các view không cần thiết bằng các thêm -v vào sau.
```ruby
rails generate devise:views -v registrations confirmations
```
Câu lệnh trên cũng tạo ra một file `config/locates/devise.yml` cài đặt I18n để hiển thị ra màn hình khi thực hiện các thao tác, bạn có thể thay đổi nó theo ý các bạn.<br>
Để thêm các trường mà bạn đã tạo ở bước trước, chúng ta phải chỉnh sửa trang đăng nhập, đăng ký và cập nhật thông tin người dùng. <br>
Ở đây mình đang muốn đăng nhập bằng username nên ta chỉnh sửa như sau: <br>
**Đăng ký** <br>
`app/views/devise/registrations/new.html.erb`
```ruby 
<h2>Sign up</h2>
 
<%= form_for(resource, as: resource_name, url: registration_path(resource_name)) do |f| %>
  <%= devise_error_messages! %>
 
  <div class="form-group">
    <%= f.label :email %><br />
    <%= f.email_field :email, autofocus: true, class: "form-control" %>
  </div>
 
  <div class="form-group">
    <%= f.label :username %>
    <%= f.text_field :username, class: "form-control" %>
  </div>
 
  <div class="form-group">
    <%= f.label :password %>
    <% if @minimum_password_length %>
    <em>(<%= @minimum_password_length %> characters minimum)</em>
    <% end %><br />
    <%= f.password_field :password, autocomplete: "off", class: "form-control" %>
  </div>
 
  <div class="form-group">
    <%= f.label :password_confirmation %><br />
    <%= f.password_field :password_confirmation, autocomplete: "off", class: "form-control" %>
  </div>
 
  <div class="actions">
    <%= f.submit "Sign up", class: "btn btn-primary" %>
  </div>
<% end %>
 
<%= render "devise/shared/links" %>
```
**Chỉnh sửa** <br>
`app/views/devise/registrations/edit.html.erb`
 
```ruby
<h2>Edit <%= resource_name.to_s.humanize %></h2>
 
<%= form_for(resource, as: resource_name, url: registration_path(resource_name), html: { method: :put }) do |f| %>
  <%= devise_error_messages! %>
 
  <div class="form-group">
    <%= f.label :email %><br />
    <%= f.email_field :email, autofocus: true, class: "form-control" %>
  </div>
 
  <% if devise_mapping.confirmable? && resource.pending_reconfirmation? %>
    <div>Currently waiting confirmation for: <%= resource.unconfirmed_email %></div>
  <% end %>
 
  <div class="form-group">
    <%= f.label :username %>
    <%= f.text_field :username, class: "form-control" %>
  </div>
 
  <div class="form-group">
    <%= f.label :password %> <i>(leave blank if you don't want to change it)</i><br />
    <%= f.password_field :password, autocomplete: "off", class: "form-control" %>
  </div>
 
  <div class="form-group">
    <%= f.label :password_confirmation %><br />
    <%= f.password_field :password_confirmation, autocomplete: "off", class: "form-control" %>
  </div>
 
  <div class="form-group">
    <%= f.label :current_password %> <i>(we need your current password to confirm your changes)</i><br />
    <%= f.password_field :current_password, autocomplete: "off", class: "form-control" %>
  </div>
 
  <div class="actions">
    <%= f.submit "Update", class: "btn btn-primary" %>
  </div>
<% end %>
 
<h3>Cancel my account</h3>
 
<p>Unhappy? <%= button_to "Cancel my account", registration_path(resource_name), data: { confirm: "Are you sure?" }, method: :delete %></p>
 
<%= link_to "Back", :back %>
```
**Đăng nhập** <br>
`app/views/devise/sessions/new.html.erb`
 
```ruby
<h2>Log in</h2>
 
<%= form_for(resource, as: resource_name, url: session_path(resource_name)) do |f| %>
  <div class="form-group">
    <%= f.label :username %><br />
    <%= f.text_field :username, autofocus: true, class: "form-control" %>
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
Điều hướng đến tập tin `app/controllers/application_controller.rb`. Bạn cần phải sửa đổi nó để cho phép việc sử dụng username hoặc các trường bạn cần. Sửa đổi nó thành như sau: <br>
```ruby
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
 
  before_action :configure_permitted_parameters, if: :devise_controller?
 
  protected
 
  def configure_permitted_parameters
    added_attrs = [:username, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
end
```
### Cấu hình controller và route
Mặc định, các route sign_in và sign_out khi sử dụng Devise trông giống như thế này:
<br>sign_in: http://localhost:3000/users/sign_in
<br>sign_out: http://localhost:3000/users/sign_out
<br>Để thay đổi nó, hãy vào `config/routes.rb` và thêm những thứ sau đây:
```ruby
  as :user do
    get "signin" => "devise/sessions#new"
    post "signin" => "devise/sessions#create"
    delete "signout" => "devise/sessions#destroy"
  end
```
### Một số phương thức helper hữu ích
**authenticate_user!:** 
authenticate_user! là method ở trong controller. đảm bảo người dùng đã đăng nhập. Hàm này được gọi thông qua `before_filter`. Ví dụ:
```ruby
class UserController < ApplicationController
  before_filter :authenticate_user!
end
```
Nếu như user chưa đăng nhập, như mặc dịnh nó sẽ bị redirect về trang login page. Nếu như user đăng nhập thành công, nó sẽ về trang root mà bạn đã cài đặt trong routes. <br>
**user_signed_in?** <br>
Dùng để kiểm tra người dùng đã đăng nhập hay chưa, bạn có thể dùng ở controller và views. Nếu người dùng chưa đăng nhập sẽ chuyển hướng về trang đăng nhập báo yêu cầu người dùng đăng nhập để tiếp tục. <br>
**current_user** <br>
Trả về người dùng đang đăng nhập<br>
**user_session** <br>
Trả về dữ liệu người dùng login<br>
## Giới thiệu chi tiết về từng Modules
**1. database_authenticatable**: Đảm bảo mật khẩu được nhập chính xác và mã hóa chúng trước khi lưu vào CSDL <br>
**2. confirmable**: Đảm bảo người dùng đăng kí tài khoản sẽ xác nhận tài khoản qua mail mà devise gửi. Đây là 1 biện pháp để tránh tạo các tài khoản fake. Các option <br>
`allow_unconfirmed_access_for`: Thời gian bạn muốn cho phép người dùng truy cập vào tài khoản của họ trước khi xác nhận. Sau thời gian này, quyền truy cập của người dùng bị từ chối <br>
`confirm_within`: Thời gian có thể confirm. <br>
Bạn có thể sử dụng điều này để buộc người sử dụng phải xác nhận trong một khoảng thời gian nhất định.<br>
Xác nhận sẽ không tạo mã thông báo mới nếu yêu cầu xác nhận lặp lại. <br>
Sử dụng điều này để cho phép người dùng của bạn truy cập một số tính năng của ứng dụng mà không cần xác nhận tài khoản. <br>
`reconfirmable`: Yêu cầu bất kỳ thay đổi email nào đều được xác nhận (chính xác theo cách như xác nhận tài khoản ban đầu) sẽ được áp dụng.<br>
**3. recoverable**: Xử lí quên mật khẩu <br>
`reset_password_keys`: Các phím bạn muốn sử dụng khi khôi phục lại mật khẩu cho một tài khoản <br>
`reset_password_within`: Khoảng thời gian trong đó mật khẩu phải được đặt lại hoặc token hết hạn. <br>
`sign_in_after_reset_password`: Có hoặc không đăng nhập người dùng tự động sau khi đặt lại mật khẩu.<br>
**4. registerable** : Cho phép người dùng đăng kí và sau đó thay đổi thông tin tài khoản <br>
**5. rememberable**: Khi chọn `Remember me` trên form login. Dùng cookie lưu mật khẩu kể từ lần đăng nhập sau <br>
**6. trackable**: Lưu trữ thông tin đăng nhập (địa chỉ IP máy người dùng, thời gian đăng nhập, tổng số lần đăng nhập)<br>
Các thông tin được lưu vào các cột: <br>
`sign_in_count`: Tăng sau mỗi lần đăng nhập<br> 
`current_sign_in_at`: Đánh dấu thời gian khi người dùng đăng nhập <br>
`last_sign_in_at`: Thời gian đăng nhập trước đó <br>
`current_sign_in_ip`: IP truy cập khi người dùng đăng nhập <br>
`last_sign_in_ip`: IP truy cập lần trước đăng nhập<br>
**7. validatable** : Đảm bảo email, mật khẩu phù hợp với một định dạng cụ thể. Có các option tương ứng là <br>
`email_regexp`: Biểu thức chính quy để xác nhận tính hợp lệ của email <br>
`password_length`: Xác định độ dài của mật khẩu. <br>
**8. lockable**: Giới hạn số lần đăng nhập sai. Hạn chế truy cập tài khoản trong 1 khoảng thời gian và gửi email bao gồm link để mở khóa tài khoản. Có các options để tùy biến như: <br>
`maximum_attempts`: Số lần nhập sai chấp nhận trước khi khóa người dùng.<br> 
`lock_strategy`: khóa người dùng bằng `:failed_attempts` hoăc `:none` <br>
`unlock_strategy`: Bỏ khóa tài khoản bằng cách dùng `:time`, `:email`, `:both` hoặc `:none`.<br> 
`unlock_in`: thời gian khóa tài khoản sau khi bị khóa. Chỉ khả dụng khi `unlock_strategy` là `:time` hoặc `:both`.<br>
`unlock_keys`: key sử dụng khi khóa và mở khóa tài khoản. 
<br> Để tìm hiểu rõ hơn về các option này các bạn có thể tham khảo ở [đây](https://www.rubydoc.info/github/plataformatec/devise/Devise/Models/Lockable)
## Tổng kết
Trên đây là những điều mà mình đã tìm hiểu được về gem devise, với bài viết này mong rằng các bạn mới nghiên cưu về Rails sẽ biết các sử dụng gem hữu ích này. Mình rất mong nhận đước sự góp ý và bổ sung từ các bạn. 
<br>Cảm ơn mọi người đã dành thời gian đọc bài viết. Chúc mọi người học tập hiệu quả.
## Tham khảo
Một số bài viết về gem Devise trên Viblo <br>
https://code.tutsplus.com/vi/tutorials/exploring-devise-part-1--cms-26587 <br>
https://code.tutsplus.com/vi/tutorials/exploring-devise-part-2--cms-27390 <br>
https://github.com/plataformatec/devise <br>
https://www.rubydoc.info/devise/Devise