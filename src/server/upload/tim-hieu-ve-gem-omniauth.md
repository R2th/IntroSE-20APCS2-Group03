### Giới thiệu
   Gem omniauth giúp người dùng đăng nhập bằng các tài khoản mạng xã hội như: facebook, gmail, twitter, instagram,...
   Giúp người dùng có thể sử dụng các tài khoản trên để đăng nhập vào trang web mà ko cần phải đăng ký tài khoản. Giúp người dùng đăng nhập một cách nhanh chóng và tiện lợi hơn.
   Trong bài viết này, tôi xin hướng dẫn các bạn thiết lập chức năng login trên website bằng mạng xã hội facebook.
### Cài đặt và tạo app
   Đầu tiên để thực hiện chức năng login, bạn phải cài đặt và tạo một Facebook Apps.
   
   Facebook Applications: là những chương trình được tạo ra nhằm tương tác với người dùng trên Facebook. Các chương trình này sử dụng giao diện lập trình ứng dụng (Application Programming Interface – viết tắt là API) của nền tảng Facebook (Facebook Platform) nhằm tương tác với người dùng Facebook.
   
   Cách tạo và cài đặt tham khảo [tại đây](http://www.hiepb.com/2016/08/facebook-apps-la-gi-cach-tao-facebook.html)
   
   Sau khi tạo xong, bạn sẽ lấy App ID, Secret Key dùng để cấu hình trong bước tiếp theo.
### Cài đặt gem và cấu hình
Đầu tiên, ta cài đặt gem trong file Gemfile:

```
gem "devise"
gem "omniauth"
gem "omniauth-facebook"
```

Sau khi cài gem xong, thêm các columns sau vào User model:
```
rails g migration AddOmniauthToUsers provider:string uid:string name:string image:text
```
Thiết lập khai báo trong file: config/initializers/devise.rb
```
config.omniauth :facebook, ENV["FACEBOOK_APP_ID"], ENV["FACEBOOK_APP_SECRET"], { scope: "email" }
```
Trong đó, FACEBOOK_APP_ID và FACEBOOK_APP_SECRET là 2 biến môi trường nên cài đặt trong config/application.yml.
Còn với FACEBOOK_APP_ID và FACEBOOK_APP_SECRET là ID và SECRET mà vừa tạo app.

Lưu lý: Những giá trị như vậy bạn nên để vào trong biến môi trường của server. Tham khảo để cài đặt biến môi trường [tại đây.](https://github.com/laserlemon/figaro)

Để kết nối Devise và Omniauth, thêm vào các trường sau trong Model User:
```
devise :omniauthable, omniauth_providers: [:facebook]
```

### Thực hiện
Sau khi cài đặt và cấu hình xong, tiếp theo ta tiến hành xử lý để có thể đăng nhập vào trang web bằng tài khoản facebook.

Để thực hiện Callback, cài đặt trong config/routes.rb giúp điều hướng controller thực hiện Omniauth callbacks:
```
devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
```
Tiếp theo, thêm file trong controller: app/controllers/users/omniauth_callbacks_controller.rb
```
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    generic_callback :facebook
  end

  def generic_callback provider
    @identity = User.from_omniauth(request.env["omniauth.auth"])

    @user = @identity || current_user
    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
      set_flash_message :notice, :success, kind: provider.capitalize if
        is_navigational_format?
    else
      session["devise.#{provider}_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to root_path
  end
end
```
 Trong đó,
 
* Tất cả thông tin được truy xuất từ Facebook bởi OmniAuth có sẵn dưới dạng băm tại request.env ["omniauth.auth"].
* Khi tìm thấy người dùng hợp lệ, họ có thể đăng nhập bằng một trong hai phương thức Devise: sign_in hoặc sign_in_and_redirect. Thông qua event: : authentication là tùy chọn, không bắt buộc. 
* set_flash_message: là thông báo mặc định của devise.
* Trong trường hợp người dùng không còn tồn tại, sẽ lưu trữ dữ liệu OmniAuth trong session.
* Cuối cùng, sẽ chuyển hướng user trở lại form đăng ký.

Sau khi xử lý trong controller, thực hiện triển khai method from_omniauth trong Model User:
```
def self.from_omniauth(auth)
  where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
    user.email = auth.info.email
    user.password = Devise.friendly_token[0,20]
    user.name = auth.info.name  
    user.image = auth.info.image
    user.skip_confirmation!
  end
end
```
Method này sẽ tìm một người dùng hiện có bởi provider và các trường uid. Nếu không tìm thấy người dùng, một người mới được tạo bằng mật khẩu ngẫu nhiên và một số thông tin bổ sung.

Trong RegistrationsController của Devise theo mặc định gọi User.new_with_session trước khi building a resource. Trong Model User thêm:
```
def self.new_with_session params, session
    super.tap do |user|
      if data = session["devise.#{provider}_data"] &&
        session["devise.#{provider}_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
 end
```
### Tổng kết
Bài viết trên, mình đã giới thiệu về gem omniauth và cách sử dụng của nó trong chức năng đăng nhập bằng facebook. Ngoài ra, bạn có thể xây dựng chức năng login với các mạng xã hội khác tương tự như trên. Và với mỗi một mạng xã hội sẽ có các gem tương ứng với nó.
### Tham khảo
[https://dev.mikamai.com/2017/06/06/devise-facebook-omniauth-login-with-connect-and-disconnect-functionality/]