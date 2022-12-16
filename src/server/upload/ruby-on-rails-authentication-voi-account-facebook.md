Hiện nay, hầu hết các ứng dụng đều cho phép chúng ta login thông qua tài khoản của những ưng dụng phổ biến khác như facebook, gooogle,..

Chắc mình không cần giới thiệu hay mô dài dòng về lợi ích hay tính ứng dụng cái này nữa vì chắc mọi người biết cả rồi. Nào, bây giờ chúng ta cùng tìm hiểu làm sao để implement nó vào ứng dụng Rails nhé

Đầu tiên chúng ta cần những thứ sau:
 - Rails 6+
 - Gem omniauth-facebook
 - Gem devise
 - Và tất nhiên là một tài khoản facebook
 
 # Facebook Authentication :japanese_goblin:
 Đầu tiên, ta cần tạo một app trên facebook. Mấu chốt ở đây là chúng ta cần APP_ID và APP_SECRET 
 
 Các bạn vào [ link này](https://developers.facebook.com/). Sau đó click 'Ứng dụng của tôi'  >  'Tạo ứng dụng'
 
Tiếp theo 1 modal loại ứng dụng sẽ hiện ra, ở đay bạn chọn cái cuối cùng như hình bên dưới nhé

![](https://images.viblo.asia/9ea16731-c975-45c6-b307-83d178975961.png)

Sau đó bạn điền tên và những mục yêu cầu rồi nhấn tiếp tục. 

Sau khi nhập mật khẩu, App của bạn đã được tạo thành công. Ở menu bên trái chọn Cài đặt > Thông tin cơ bản

Ở ô Miền ứng dụng các bạn điền domain app Rails vào. Ở đây mình đang chạy trên local nên sẽ để là localhost
![](https://images.viblo.asia/aae41c2f-c519-4fe5-96f7-3f9255826aa5.png)

*Lưu ý: ID ứng dụng và Khóa bí mật chính là  APP_ID và APP_SECRET. Mình sẽ dùng nó để config trong Rails 

Kéo xuống dưới sẽ có button Thêm nền tảng. Ở đây mình làm web app nên sẽ chọn Website. Điền vào URL là "http://localhost:3000" như VD. Sau đó lưu lại là xong nhé 
![](https://images.viblo.asia/d8a5c35e-408a-446b-8544-b3ecac3ae60b.png)
![](https://images.viblo.asia/f67562a7-bbe2-42c2-8d6b-1ae250da2595.png)

# Triển khai trên Rails :smiley:
Như ban đầu mình đã nói, chúng ta cần 2 gem. Trong gem file thêm 2 gem này vào rồi đọc thần chú `bundle install` nhé
```
gem "omniauth-facebook"
gem "devise"
```

Tiếp theo, ta cần tạo 2 column provider và uid trong bảng User. Hai column này sẽ dùng để lưu thông tin xác thực của người dùng khi họ dùng facebook để authen vào Rails 

`rails g migration AddProviderUidToUsers provider:string uid:string`

Và tất nhiên, chạy `rails db:migrate` để tạo 2 column vào DB

Trong file config/initializers/devise.rb chúng ta sẽ đặt APP_ID và APP_SECRET vào

 ```config.omniauth :facebook, ENV["APP_ID"], ENV["APP_SECRET"]```
 
 *Thay vì điền thằng APP_ID và APP_SECRET thì mình sử dụng biến mỗi trường để đảm bảo về bảo mật. Nếu bạn chưa biết thì tìm hiểu [gem Firago](https://github.com/laserlemon/figaro) nhé.
 
 Trong model user.rb:
 
 ```devise :omniauthable, omniauth_providers: %i[facebook]```
 
 Ta tạo một controller với đườn dẫn app/controllers/users/omniauth_callbacks_controller.rb 
 
 Controller này sẽ đảm nhiệm việc phản hồi xác thực với Facebook
 
```
 class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"]) #Hàm callback from_omniauth này sẽ viết ở model, input chính là thông tin của tài khoản facebook 

    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication #Trong trường hợp tài khoản inactived thì sẽ quăng exception ở đây
      set_flash_message(:notice, :success, kind: "Facebook") if is_navigational_format?
    else
      redirect_to new_user_registration_url
    end
  end
end
```

Quay lại với Model User, ta thêm đoạn code bên dưới

```
def self.from_omniauth(auth) 
  name_split = auth.info.name.split(" ")
  user = User.where(email: auth.info.email).first
  user ||= User.create!(        # Nếu tài khoản facebook chưa từng đăng nhập trước đó thì sẽ tạo mới bằng thông tin của facebook đó (thông qua gem omniauth lấy được)
      provider: auth.provider, 
      uid: auth.uid, 
      last_name: name_split[0], 
      first_name: name_split[1], 
      email: auth.info.email, 
      password: Devise.friendly_token[0, 20]
  )
    user
end
```

Ở config/routes.rb:

```devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }```

Bước cuối cùng, ta thêm một button Đăng nhập ở view là xonggggg. Đường dẫn của file mình là app/views/devise/sessions/new.html.erb

```
<div class="login">
  <%= link_to "Sign in with Facebook", user_facebook_omniauth_authorize_path %>
</div>
```

# Kết 
Tất cả là những bước cơ bản nhất để có thể authen vào app Rails thông qua Facebook. Tuy nhiên, để chạy một cách trơn tru và tối ưu nhất thì các bạn nên custom nó sao cho phù hợp với tính chất của từng dự án ha :D
Ngoài Facebook ra thì Devise cũng hỗ trợ Authen thông qua Google, twitter,... các bạn cùng tham khảo thêm nhé



*Tham khảo tại :

https://stackoverflow.com/questions/38868738/devise-with-omniauth-facebook

https://github.com/simi/omniauth-facebook