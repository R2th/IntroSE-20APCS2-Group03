# 1, Gem devise là gì
Gem devise là một thư viện rất phổ biến trong ruby on rails. Đây là một gem rất linh hoạt trong việc hỗ trợ xác thực người dùng. Nó hỗ trợ hầu hết tất cả mọi việc bạn cần trong việc quản lí và xác thực người dùng trong hệ thống của bạn.
Việc login bằng facebook, twitter, google... thì thư viện này cũng hỗ trợ, rất dễ để sử dụng chức năng login qua các mạng xã hội. Trong bài viết này mình sẽ hướng dẫn các bạn tạo một app nho nhỏ để login thông qua google.
# 2, Cài đặt devise
Tạo mới project bằng cửa sổ console
<br>
```rails new demo_login_google -d mysql```
<br>
Tiếp theo ta chạy: ```rails db:create``` để tạo database trong MySQL
<br>
Sau đó chúng ta sẽ cấu hình lại trong ```database.yml``` bằng cách đánh mật khẩu của root vào trong file này
<br>
```ruby
default: &default
  adapter: mysql2
  encoding: utf8
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: root
  password: YOUR PASSWORD
  socket: /var/run/mysqld/mysqld.sock

development:
  <<: *default
  database: demo_login_google_development
test:
  <<: *default
  database: demo_login_google_test

production:
  <<: *default
  database: demo_login_google_production
  username: demo_login_google
  password: <%= ENV['DEMO_LOGIN_GOOGLE_DATABASE_PASSWORD'] %>
```
<br>
Chạy thử lên, ta sẽ khởi tạo xong project rails
<br>
Tiếp theo, thêm vào Gemfile các gem sau:

````gem "devise"````

````gem "omniauth" ````

````gem "omniauth-google-oauth2" ````

Sau đó ta bundle lại: ```bundle``` và chạy lệnh` rails generate devise:install`

Tiếp theo, bạn cần phải thiết lập các tùy chọn URL mặc định cho Devise mailer. Dưới đây là một cấu hình trong file `config/environments/development.rb`

`config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }`

Sau khi add gem devise vào bước tiếp theo cần generate model sử dụng dem devise cho hệ thống. Ở bài viết lần này mình quản lý User nên mình sẽ đánh lệnh

`rails generate devise User`

Đây là các file sau khi chạy xong lệnh trên
```ruby
invoke  active_record
      create    db/migrate/20190615092748_devise_create_users.rb
      create    app/models/user.rb
      invoke    test_unit
      create      test/models/user_test.rb
      create      test/fixtures/users.yml
      insert    app/models/user.rb
       route  devise_for :users
```
Trong route sẽ tự động sinh ra
```ruby
Rails.application.routes.draw do
  devise_for :users
end
```
Ta có thể chạy rails routes lên để kiểm tra đường dẫn đã được thành công hay chưa.
<br>
Ta sẽ tạo ra các view cho User bằng lệnh

`rails generate devise:views`

Để tạo các controller trong devise ta dùng lệnh

`rails generate devise:controllers users`

Các thư mục controllers của user sẽ được sinh ra trong `controllers/users/`

```bash
create  app/controllers/users/confirmations_controller.rb
create  app/controllers/users/passwords_controller.rb
create  app/controllers/users/registrations_controller.rb
create  app/controllers/users/sessions_controller.rb
create  app/controllers/users/unlocks_controller.rb
create  app/controllers/users/omniauth_callbacks_controller.rb
```

OK vậy là chúng ta đã cài đặt xong các phần cơ bản trong devise, tiếp theo ta sẽ cài đặt google app

# 3, Cài đặt google app

Đầu tiên bạn vào đường link sau  https://console.developers.google.com
Tạo mới một project
Sau khi đã có project của mình, thì bạn cần lựa chọn api để đẳng nhập trên trang web của mình. Bạn enable 2 thứ đó là `Gmail API` và `Contact API`
Tiếp theo bạn create credentials oauth client id và điền những thông tin sau:
`	http://localhost:3000/users/auth/google_oauth2/callback`
![](https://images.viblo.asia/1ed033a5-8c1d-48c0-a967-183384d83a36.png)

Ok bạn create và bạn sẽ nhận được client ID và client secret, bạn nên sao chép 2 mã trên để sử dụng.

![](https://images.viblo.asia/20ed691a-c19d-41bb-b9b6-e432fa880516.png)

Vậy là đã tạo xong được google app ^^

# 4, Sử dụng omniauth để đăng nhập bằng google

Bạn vào `config/initializers/devise.rb` và ghi cho mình đoạn code sau

`config.omniauth :google_oauth2, ENV["google_client_id"], ENV["google_client_secret"]`

Trong đó `ENV["google_client_id"],  ENV["google_client_secret"]` là hai biến môi trường mình đã khởi tạo, tương ứng với mỗi biến môi trường kia là 2 đoạn mã mà mình đã lấy được ở phần 3.

Để cài đặt biến môi trường bạn hãy tìm hiểu `gem figaro`

Trong routes.rb thêm dòng sau

`devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }`

Trong `/app/models/user.rb`

```ruby
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: [:google_oauth2]

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(email: data['email']).first
    if user
      user
    else
      user = User.create(username: data['name'],
         email: data['email'],
         password: Devise.friendly_token[0,20],
         uid: access_token[:uid],
         provider: access_token[:provider]
      )
    end
  end
end
```

Tiếp theo ta trong `app/controllers/user/omniauth_callbacks_controller.rb` , thêm đoạn code sau

```ruby
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
      @user = User.from_omniauth(request.env['omniauth.auth'])

      if @user.persisted?
        flash[:notice] = I18n.t 'devise.omniauth_callbacks.success', kind: 'Google'
        sign_in_and_redirect @user, event: :authentication
      else
        session['devise.google_data'] = request.env['omniauth.auth'].except(:extra) # Removing extra as it can overflow some session stores
        redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
      end
  end
end
```

Tiếp theo ta sử dụng một đường link để đăng nhập bằng google. Trong `views/devise/sessions/new.html.erb` thêm dòng sau

`<%= link_to "Login by google", user_google_oauth2_omniauth_authorize_path %>`

Thêm các trường trong csdl để lưu lại thông tin của người đăng nhập và sử dụng chức năng đăng nhập của google

`rails generate migration add_omniauth_to_users provider:string uid:string`

`rails db:migrate`

Ok vậy là ta đã hoàn thành tạo app nho nhỏ về việc login google thông qua gem omniauth. Giờ chỉ cần `rails s` lên và cảm nhận nhé
# Tài liệu tham khảo
https://github.com/plataformatec/devise
<br>
https://github.com/zquestz/omniauth-google-oauth2
<br>
https://medium.com/@_benrudolph/end-to-end-devise-omniauth-google-api-rails-7f432b38ed75