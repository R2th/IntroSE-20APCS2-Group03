## Giới thiệu
Google cung cấp dịch vụ một dịch vụ xác thực người cho phép một website của bên thứ ba sử dụng thông tin tài khoản của 
Google để phục vụ cho việc đăng ký, đăng nhập.  Ở  bài viết này sẽ giới thiệu Gem "omniauth-google-oauth2" được sử dụng với mục đích nêu trên.
## Chuẩn bị
Tạo mới 1 ứng dụng rails
```
rails new gem_omniauth_google
```
Cài đặt các Gem
```
gem "devise"
gem "omniauth"
gem "omniauth-google-oauth2"
```
Chạy **bundle install**<br>
Tiếp theo config cho gem "devise"
```
rails generate devise:install
rails generate devise User
rails db:migrate
```

config/environments/development.rb:
```
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```

Theo đường dẫn http://localhost:3000/users/sign_in thì ta đã có một form để đăng nhập.

## Bắt đầu Gem "omniauth-google-oauth2
### Google API Setup
Đi đến: https://console.developers.google.com'<br>
Tạo một project<br>
Sau khi tạo project  thì enable cho 2 API  "Contacts API" và "Google+ API"<br>
Tiếp theo đi đến Credentials, chọn "OAuth consent screen" và điền vào Application name sau đó lưu lại.<br>
Tạo Credentials, OAuth clien ID -> click Web application và sẽ nhận được GOOGLE_CLIENT_ID và GOOGLE_CLIENT_SECRET
### Sử dụng: 
### Devise
Cài thêm gem 'dotenv-rails' để thiết lập biến môi trường.
```
gem 'dotenv-rails'
```
ở config/initializers/devise.rb
```
config.omniauth :google_oauth2, ENV["GOOGLE_CLIENT_ID"], ENV["GOOGLE_CLIENT_SECRET"], {
    scope: "userinfo.profile,youtube,userinfo.email",
    access_type: 'offline',
    approval_prompt: 'force'
}
```

Ở 'config/routes.rb' 
```
devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
```

/app/models/user.rb thêm vào:
```
devise :omniauthable, :omniauth_providers => [:google_oauth2]
```

Tiếp theo:
```
rails g controller Users/OmniauthCallbacks
```
```
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
      # You need to implement the method below in your model (e.g. app/models/user.rb)
      @user = User.from_omniauth(request.env["omniauth.auth"])

      if @user.persisted?
        flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
        sign_in_and_redirect @user, :event => :authentication
      else
        session["devise.google_data"] = request.env["omniauth.auth"]
        redirect_to new_user_registration_url
      end
  end
end
```

Chay câu lệnh sau ở terminal
```
 rails g migration AddProviderToUsers provider:string uid:string
 rails db:migrate
```

Trong model user.rb
```
def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email
        user.password = Devise.friendly_token[0,20]
    end
 end
```
Thêm vào màn hình login:
```
<%= link_to "Sign in with Google", user_google_oauth2_omniauth_authorize_path %>
```

Kết quả màn hình login sẽ được như thế này.
![](https://images.viblo.asia/670bcefa-647c-434c-8f1b-3e70cac0f529.png)
Giờ ở user.rb mình sẽ đặt lệnh binding.pry để test kết quả trả về từ google:
```
def self.from_omniauth(auth)
    binding.pry
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email
        user.password = Devise.friendly_token[0,20]
    end
 end
```

Giờ mình thử login, thì ở terminal khi test arguments  **auth** sẽ nhận được một Auth Hash trả về, nghĩa là đã login với Google thành công
```
8: def self.from_omniauth(auth)
 =>  9:   binding.pry
    10:   where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
    11:   user.email = auth.info.email
    12:   user.password = Devise.friendly_token[0,20]
    13:  end
    14: end

[1] pry(User)> auth
```
```
{
    :provider => "google_oauth2",
    :uid => "123456789",
    :info => {
        :name => "John Doe",
        :email => "john@company_name.com",
        :first_name => "John",
        :last_name => "Doe",
        :image => "https://lh3.googleusercontent.com/url/photo.jpg"
    },
    :credentials => {
        :token => "token",
        :refresh_token => "another_token",
        :expires_at => 1354920555,
        :expires => true
    },
    :extra => {
        :raw_info => {
            :sub => "123456789",
            :email => "user@domain.example.com",
            :email_verified => true,
            :name => "John Doe",
            :given_name => "John",
            :family_name => "Doe",
            :profile => "https://plus.google.com/123456789",
            :picture => "https://lh3.googleusercontent.com/url/photo.jpg",
            :gender => "male",
            :birthday => "0000-06-25",
            :locale => "en",
            :hd => "company_name.com"
        },
        :id_info => {
            "iss" => "accounts.google.com",
            "at_hash" => "HK6E_P6Dh8Y93mRNtsDB1Q",
            "email_verified" => "true",
            "sub" => "10769150350006150715113082367",
            "azp" => "APP_ID",
            "email" => "jsmith@example.com",
            "aud" => "APP_ID",
            "iat" => 1353601026,
            "exp" => 1353604926,
            "openid_id" => "https://www.google.com/accounts/o8/id?id=ABCdfdswawerSDFDsfdsfdfjdsf"
        }
    }
}
```

## Nguồn
https://github.com/zquestz/omniauth-google-oauth2