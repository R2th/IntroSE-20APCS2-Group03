# Introduction reCAPTCHA

Spam là 1 vấn đề lớn đối với các website. Các robot đã được viết sẵn lệnh tạo ra để spam thu thập thông tin trên web, cố gắng spam các form field với hi vọng nhận dc thư spam từ chủ các website. May mắn thay là có 1 cách dễ dàng để chống lại các kẻ spam này bằng cách sử dụng service reCAPTCHA. reCAPTCHA là 1 dịch vụ miễn phí bởi google giúp phát hiện khách truy cập hợp pháp sử dụng 1 số kĩ thuật luôn thay đổi. Nếu nó không thể xác định liệu khách đang truy cập là hợp pháp thì nó sẽ yêu cầu người dùng giải quyết 1 số câu đố đơn giản để chứng minh họ là con người

Ví dụ:
![](https://images.viblo.asia/e16b8f76-272e-47df-8fc5-8704102f5c69.png)

# Setup reCAPTCHA
Trước khi sử dụng chúng trong ứng dụng của bạn chúng ta phải cài đặt chúng. Đăng nhập Google và tới link [the reCAPTCHA admin page](https://www.google.com/recaptcha/admin)


![](https://images.viblo.asia/128a46f8-7002-420a-938f-5dffb156b65b.png)

bạn sẽ nhìn thấy 1 trang hình ảnh giống trên. Chọn Register a new site để đăng kí.Với domain, list tất cả các domain bạn sẽ sử dụng reCAPTCHA. Ví dụ, nếu website của bạn là example.com, đảm bảo rằng example.com có ở trong list. Chúng ta cũng có thể include localhost cho development.  Sau đó ta click vào Register button

![](https://images.viblo.asia/c57b73b5-78a1-4358-9313-03ecaaa48849.png)

Sa đó ta sẽ nhận dc 1 site key và secret key để add vào ứng dụng của bạn

![](https://images.viblo.asia/952935f9-8c8f-480b-9099-ffe9af4d26b4.png)

# Setup trong ứng dụng Rails
Ví dụ sẽ là 1 form đăng kí user cho phép người dùng nhập name, email, password để tạo 1 account mới. Ở form signup chúng ta có reCAPTCHA checkbox để xác định đúng là người dùng thật. Để thuận lợi ta dùng gem `recaptcha` cung cấp các helper giúp viêc cài đặt trở nên dễ dàng
```
gem 'recaptcha', require: 'recaptcha/rails'
gem 'bcrypt'
```

Sau đó bundle install gem
Sau đó chúng ta configure gem `recaptcha`. Tạo 1 file mới trong config/initializers là `recaptcha.rb` . Sau đó thêm giống như dưới đây:

```
Recaptcha.configure do |config|
  config.site_key  = Rails.application.secrets.recaptcha_site_key
  config.secret_key = Rails.application.secrets.recaptcha_secret_key
end
```
Để bảo mật Chúng ta set site key và secret key trong file `config/secrets.yml`

```
# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rails secret` to generate a secure secret key.

# Make sure the secrets in this file are kept private
# if you're sharing your code publicly.

development:
  secret_key_base: 2f94601049a14193ca603923d770a0189c82d3746fbdb3aa472780791dc1e0c4048f473a1004a829a10d0aaa0abfc0f061282a51eba05af926849d772bac022a
  recaptcha_site_key: <%= ENV["RECAPTCHA_SITE_KEY"] %>
  recaptcha_secret_key: <%= ENV["RECAPTCHA_SECRET_KEY"] %>

test:
  secret_key_base: 58150241e15c621ffba28e32cd67928e54a78dfe722371c3e52b740eb7ebb5c05a02cd10071b3661af6771d1aca8f41453f6315e807c61d3f8c5e8e1b8c7adb7

# Do not keep production secrets in the repository,
# instead read values from the environment.
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
  recaptcha_site_key: <%= ENV["RECAPTCHA_SITE_KEY"] %>
  recaptcha_secret_key: <%= ENV["RECAPTCHA_SECRET_KEY"] %>
  </code>
```

Đã setting xong. giờ chúng ta cùng build lên ứng dụng. Tạo 1 model User chứa các thông tin trên. 
```
rails g model user name email password_digest
rake db:migrate
```

Ở model:
```
class User < ApplicationRecord
  has_secure_password
  validates_presence_of :password, on: :create
  validates :email, uniqueness: true, presence: true
end
```

```
Rails.application.routes.draw do
  resources :users, only: [:new, :create]
  root to: 'users#new'
end
```

Ở view:
```
<h3>New User Sign Up</h3>
<% if !@user.errors.empty? %>
  <ul>
    <% @user.errors.full_messages.each do |message| %>
      <li><%= message %></li>
    <% end %>
  </ul>
<% end %>
<%= form_for User.new do |f| %>
<div>
  <%= f.label :name %>
  <%= f.text_field :name %>
</div>
<div>
  <%= f.label :email %>
  <%= f.text_field :email %>
</div>
<div>
  <%= f.label :password %>
  <%= f.password_field :password %>
</div>
<div>
  <%= f.label :password_confirmation %>
  <%= f.password_field :password_confirmation %>
</div>
<div>
  <br />
  <%= recaptcha_tags %>
  <br />
</div>
<div>
  <%= f.submit "Sign Up" %>
</div>
<% end %>
```

Ở controller:
```
class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if !verify_recaptcha(model: @user) || !@user.save
      render "new"
    end
  end

private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
```

`verify_recaptcha` là 1 helper method của gem `recaptcha`. Kiểm tra nếu thông tin recaptcha có valid hay không, nếu không valid sẽ render lại form new và 1 lỗi do gem `recaptcha` cung cấp. nếu thành công thì user sẽ được tạo

Kết quả:

![](https://images.viblo.asia/f8403597-fdf6-4a4a-93d2-4943bd949c0b.png)


![](https://images.viblo.asia/dc078994-a20a-4032-a3ef-243301d81d91.png)

Hi vọng bài viết sẽ giúp ích cho bạn trong cv sau này :D 

Link github: https://github.com/ngocvu3010/recaptcha

Link tham khảo: https://richonrails.com/articles/adding-recaptcha-to-your-rails-application