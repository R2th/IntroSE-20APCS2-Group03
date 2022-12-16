## Mở đầu
Ngày này,hầu hết các website đều cho phép người dùng có thể đăng nhập thông qua tài khoản mạng xã hội như facebook,google,github.....

Chức năng này khá hữu ích và tiện lợi với người dùng.

Trong bài hôm nay,mình sẽ giới thiệu mọi người cách tạo chức năng đăng nhập google trong ứng dụng Ruby on Rails sử dụng gem devise và gem omniauth-google-oauth2

## Cài đặt gem devise

Tại gemfile thêm:
```
gem 'devise
```


Run `bundle install`
Tiếp theo run: 	`rails generate devise:install`

Tại `config/environments/development.rb` .Thêm dòng sau:

`config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }`

Tiếp tục run: `rails generate devise User`

Và cuối cùng run : `rails db:migrate`

**Cấu hình view devise**
`rails generate devise:views users`

**Cấu hình controller :**
`rails generate devise:controllers`

## Cài đặt gem omniauth-google-oauth2

### Bước 1: Cài đặt gem
Tại Gemfile thêm:

`gem 'omniauth-google-oauth2'  `

Run `bundle install`

### Bước 2: Config devise.rb

Trong `config/initializers/devise.rb` .Thêm:

```ruby
config.omniauth :google_oauth2, ENV["GOOGLE_OAUTH_CLIENT_ID"], ENV["GOOGLE_OAUTH_CLIENT_SECRET"]
```

Trong đó 
```
ENV["GOOGLE_OAUTH_CLIENT_ID"], ENV["GOOGLE_OAUTH_CLIENT_SECRET"]
```

Thì các bạn phải cài đặt **gem figaro** để đặt các biến môi trường tại **config/application.yml**

Mình sẽ hướng dẫn mọi người các lấy được giá trị của 2 biến này:


Đầu tiên,các bạn vào link sau:

https://console.developers.google.com

Và chọn **create project**

![](https://images.viblo.asia/b96eec89-bf04-47c1-ae59-2feb1559a646.png)

Chọn project mới vừa được tạo và chọn **Oauth consent screen**.Điền các thông tin cần thiết theo yêu cầu.

Tiếp theo, chọn Credentials => CREATE CREDENTISLS => Oauth client ID

![](https://images.viblo.asia/712c96b3-d85a-45dd-be7b-16e1e33c372f.png)

Tiếp theo tại "**application type**" chọn **Web application**.

![](https://images.viblo.asia/e67d6158-4333-43b7-93ce-d76a4e5caabd.png)

Tạo xong sẽ hiện form với :

**Your Client ID** là giá trị của ENV["GOOGLE_OAUTH_CLIENT_ID"] 

**Your Client Secret** là giá trị của ENV["GOOGLE_OAUTH_CLIENT_SECRET"]

![](https://images.viblo.asia/7b412df9-367e-4c4c-8662-630e0dd2524e.png)


### Bước 3: Thêm trường uid và provider vào bảng User
Run : 
```ruby
rails generate migration AddOmniauthToUsers
```
![](https://images.viblo.asia/6e431d39-b220-4d40-ad27-858b90aa3004.png)

Và run : `rails db:migrate`

### Bước 4. Cấu hình routes như sau:
![](https://images.viblo.asia/2e81f9aa-94be-4a3e-a0fb-2ddafbd7740d.png)

### Bước 5.Cấu hình Controller
Tại `app/controllers/users/omniauth_callbacks_controller.rb:`

![](https://images.viblo.asia/87ff5c18-30d2-400d-bc8a-69a4f67aad7c.png)

### Bước 6. Cấu hình Model

![](https://images.viblo.asia/d3cb6e86-140b-43bf-afc4-66db8ef6552f.png)

### Bước 7. Cấu hình view
Tại app/view/users/sessions/new.html.erb . Thêm 
```ruby
<%= link_to "Sign in with Google", user_google_oauth2_omniauth_authorize_path %>
```


## Lời Kết
Trong bài này,mình đã giới thiệu với mọi người về cách tạo chức năng đăng nhập google trong ứng dụng Ruby on Rails.

Cảm ơn mọi người đã đọc !

### Tài liệu tham khảo

https://github.com/heartcombo/devise

https://github.com/zquestz/omniauth-google-oauth2

https://medium.com/@adamlangsner/google-oauth-rails-5-using-devise-and-omniauth-1b7fa5f72c8e