Cũng có khá nhiều bài viết về login google, trong bài viết này mình sẽ dùng gem 'omniauth-google-oauth2' và sử dụng database mysql. Nhiều bạn follow theo các bài viết mà chưa áp dụng được. Hôm nay mình xin trình bày chi tiết về cách tạo demo nhỏ sử dụng gem này.

### 1. Khởi tạo project

Mở terminal: 

```
rails new oauth2-login-google -d mysql
```

Thêm các gem sau vào file Gemfile

```
gem "devise"
gem "omniauth"
gem "omniauth-google-oauth2"
```

Cài đặt các gem vừa thêm vào ở trên bằng cách chạy lệnh:
```
bundle install
```

Tiếp đến bạn cài đặt devise:

```
rails generate devise:install
```

Thêm dòng sau vào file: config/ environments/ development.rb

```
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```

chạy lệnh generate ra views bằng lệnh:

```
rails g devise:views
```

Để sử dụng mysql: bạn phải cài đặt mysql, mở terminal và khởi động nó lên

*mysql.server start* với hdh os, và *sudo service mysql start* với ubuntu.

Check xem mysql:

```
mysql -u root –p
```

nhập password: *****

![](https://images.viblo.asia/31576264-2ecb-48e9-8a20-66cf61826c44.png)

Tiếp theo tạo model User trong devise ta dùng lệnh

```
rails generate devise User
```

Thêm các trường trong csdl để lưu lại thông tin của người đăng nhập và sử dụng chức năng đăng nhập của google.

```
rails g migration AddProviderToUsers provider:string uid:string
```

file database.yml
```
adapter: mysql2
  encoding: utf8
  pool: 5
  username: root
  password: ******
  socket: /tmp/mysql.sock

development:
  <<: *default
  database: oauth2-login-google_development
test:
  <<: *default
  database: oauth2-login-google_test
production:
  <<: *default
  database: oauth2-login-google_production
  username: oauth2-login-google
  password: ******
```

dùng lệnh tạo cơ sở dữ liệu
```
rails db:create
rails db:migrate
```

Trong router: thêm dòng sau: 

```
devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks'
 } 
```

Trong model user: 

```
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :omniauthable, :omniauth_providers => [:google_oauth2]

  def self.from_omniauth auth
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.password_confirmation = Devise.friendly_token[0,20]
    end
  end
end
```

Tiếp theo trong *app/controllers/user/omniauthcallbackscontroller.rb* , thêm đoạn code sau

```
class Users::OmniauthCallbacksController < ApplicationController
    def google_oauth2
        @user = User.from_omniauth request.env["omniauth.auth"]
        if @user.persisted?
          flash[:notice] = I18n.t "devise.omniauth_callbacks.success", kind: "Google"
          sign_in_and_redirect @user, event: :authentication
        else
          session["devise.google_data"] = request.env["omniauth.auth"].except :extra
          redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
        end
      end    
end
```

### 2. Các bước lấy client_id và client_secret

- 	Truy cập https://console.developers.google.com và tạo mới 1 project.

-	Chọn mục identifiants => select:  create identifiants 

![](https://images.viblo.asia/cc50315f-4023-473a-816b-990f7063057c.png)

-	Chọn ID and Oauth (ở tab Oauth authorization screen nhập tên application => và chọn save).

![](https://images.viblo.asia/2afd429e-f157-4109-9e01-546348cb27c1.png)

Tiếp tục chọn web application và nhập:

```
http://localhost:3000/users/auth/google_oauth2/callback
```
![](https://images.viblo.asia/aa6a369b-ad0d-40a5-8232-890d0f70d021.png)

kết quả: 
![](https://images.viblo.asia/a1af3af8-e638-4856-ac34-dc2c51400cfe.png)

Để lấy client_id và client_secret: <br>
Click nút sửa : sẽ thấy customer ID và customer secret code chính là 2 cái cần tìm.

![](https://images.viblo.asia/84b3b514-f1d6-4e17-885b-9ad2acfbdc79.png)

Thêm đoạn code sau vào config/initializers/devise.rb

```
#config.omniauth :google_oauth2,  ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'], {}
config.omniauth :google_oauth2,  "282298230576-tikd204oco17codhobj9h6v8a1qtj3sr.apps.googleusercontent.com", "mHkTJfG_mmaOVJlUBKURK7J8", {}
```

Để enable apis làm theo các bước: https://support.google.com/googleapi/answer/6158841?hl=en

Run server: rails s => vào link: 

```
localhost:3000/users/sign_in
```

![](https://images.viblo.asia/71e18566-e64d-4f7b-8233-ff78434d5c17.png)

Chọn đăng nhập với google: 
![](https://images.viblo.asia/e5cdcce5-0b95-446d-be41-65ee9755226a.png)

đăng nhập thành công sẽ redirect về root_path.<br>
Kiểm tra user lần đầu đăng nhập sẽ được thêm vào database: <br>
Mở terminal cd đến project đang chạy => chạy rails c => User.last <br>

![](https://images.viblo.asia/2b6ed49f-e2fc-4acf-990a-68e9e283ec3a.png)

code github: https://github.com/buitiendo/oauth2-login-google  <br> các bạn có thể clone code về sửa file database.yml và chạy thử.