## Giới thiệu vấn đề
Đối với một website thì ngoài việc cho phép khách hàng của mình đăng nhập trên chính website thì còn cho phép khách hàng đăng nhập bằng tài khoản mạng xã hội như Facebook hoặc Google là điều cần thiết. <br>
Bài viết này mình xin hướng dẫn các bạn mới tìm hiểu về Rails cách cài đặt chức năng đăng nhập trên website bằng các tài khoản mạng xã hội phổ biến. 
## Sản phẩm minh họa
Để thực hiện việc giới thiệu các bạn cách cài đặt chức năng này mình đã tạo một project để minh họa các bước thực hiện. <br>
Tạo project mới  <br>
```ruby
rails new login_demo
```
#### Cài một số gem cần thiết cho demo
```ruby
// Gemfile
gem "devise"
gem "omniauth"
gem "omniauth-google-oauth2"
gem "omniauth-facebook"
```
Để thêm sự sinh động cho web, mình đã ghép theme [Sb Admin2](https://startbootstrap.com/themes/sb-admin-2/) vào project. 
### Ghép giao diện
Để tìm hiểu cách tích hợp một theme bất kì vào project Rails bạn hãy theo dõi bài viết 
[Tích hợp theme vào project Rails](https://viblo.asia/p/tich-hop-theme-bat-ky-vao-rails-djeZ10woKWz?fbclid=IwAR2dkACmwOfcsmjVk_G3nBA_r1azousLZ6aMXH9_NeQ_UXqkZ9mkljyVQN0)<br>
Sau khi ghép mình được giao diện như sau
![](https://images.viblo.asia/e262846b-b44c-41fc-bb59-23709c3704d8.PNG)
### Thiết lập controller, views
Để tập trung vào việc giới thiệu đăng nhập với tài khoản Google và Facebook nên mình không trình bày kĩ về cách thiết lập gem "devise" để xác thực người dùng. Các bạn có thể theo dõi hai bài viết dưới đây để tìm hiểu về cách sử dụng nó. <br>
[Cách sử dụng gem "devise"](https://viblo.asia/p/cach-su-dung-gem-devise-bWrZng8Ylxw)<br>
[Đăng nhập bằng user_name với gem"devise"](https://viblo.asia/p/mot-so-ki-thuat-co-ban-trong-rails-phan-2-V3m5WbE8lO7)<br>
Mình đã thiết lập devise để có thể đăng nhập bằng username và email<br>
#### Bắt đầu cấu hình việc đăng nhập bằng Facebook, Google
Sau đây, mình sẽ thêm một số thiết đặt chung cho việc đăng nhập bằng tài khoản mạng xã hội <br>

Ứng dụng của bạn có nhiều cách đăng nhâp Facebook, Google, Gmail, Github để xác định 1 user đăng nhập bằng gì thì mình tạo một cột trong database tên provider, thêm image và uid để lấy avatar id của Facebook, Google....<br>
```ruby
rails g migration AddFieldsToUser provider:string uid:string image:string
```
Chạy migrate nha : `rails db:migrate`<br>

Mở `app/models/user.rb` thêm code sau vào trong nó 
```ruby
def self.from_omniauth(auth)
    result = User.where(email: auth.info.email).first
    if result
      return result
    else
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email
        user.password = Devise.friendly_token[0,20]
        user.fullname = auth.info.name
        user.image = auth.info.image
        user.uid = auth.uid
        user.provider = auth.provider

        #  If you are using confirmable and the provider(s) you use validate emails
        user.skip_confirmation!
      end
    end
  end
```
Tạo tập tin trong `app/controllers/omniauth_callbacks_controller.rb` và thêm các đoạn mã nguồn sau: 
```ruby
class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    generic_callback("facebook")
  end

  def google_oauth2
    generic_callback( "google_oauth2" )
  end

  def generic_callback(provider)
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
      set_flash_message(:notice, :success, kind: provider.capitalize) if is_navigational_format?
    else
      session["devise.#{provider}_data"] = request.env["omniauth.auth"].except("extra")
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to root_path
  end
end
```
Vào `app/models/user.rb` thêm code sau vào devise code được update lúc này sẽ như sau
```ruby
devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable , omniauth_providers: [:facebook, :google_oauth2]
```
### Xác thực với Facebook
Truy cập https://developers.facebook.com/apps/ và bấm vô myapp và tạo một app mới với tên tùy ý
![](https://images.viblo.asia/e94f7966-c8ac-4c5b-9204-a1266b2100be.PNG)<br>
Chọn bỏ qua
![](https://images.viblo.asia/433a92a7-db59-47d2-af41-715fc9939ba8.PNG)<br>
Chọn vào Đăng nhập tài khoản Facebook => OK và bấm next nhé
![](https://images.viblo.asia/0301591d-066b-4a49-ad56-97cd5d61ef40.PNG)<br>
Trong phần Site URL ta điền **localhost:3000**, nếu là ở môi trường product thì điền tên miền mà mình mua.
Cứ tiếp tục Next ....hoặc Ok cho đến hết nhé nhìn bên Widget thấy Facebook Login để tiếp tục cài đặt như sau :
![](https://images.viblo.asia/aae61b10-b0ae-4d9e-a73f-b0d1a7c8d891.PNG)<br>
Mở  `config/initializers/devise.rb,` thêm code sau, thay APP_ID và APP_SECRET  tương ứng với ứng dụng bạn vừa tạo nhé:
```ruby
config.omniauth :facebook, "APP_ID", "APP_SECRET", scope: 'email', info_fields: 'email,name'
```
![](https://images.viblo.asia/8aa5a3ea-2ba3-4dd7-a975-0b9d090ea1b5.PNG)<br>
Tiếp tục chỉnh routes để đăng nhập chính xác vào `config/routes.rb`  thêm code sau, code bên dưới mình sẽ điều chỉnh routes lại đăng nhâp bằng đường dẫn localhost:3000/user/sign_up => localhost:3000/resgistration phù hợp với Facebook, Google.
```ruby
  devise_for :users,
              path: '',
              path_names: {sign_in: 'login' ,sign_out: 'logout' ,edit: 'profile',sign_up: 'resgistration'},
              controllers: {omniauth_callbacks: 'omniauth_callbacks' }
```
Chạy rails server vào localhost xem kết quả đây là kết quả
![](https://images.viblo.asia/ae107ca5-a769-4b36-a905-0f6863150665.PNG)
### Xác thực với Google
**Đăng kí app với google api tại đây chọn select a project màn hình hiện ra như sau** Chọn + để thêm 1 app <br>
![](https://images.viblo.asia/e42cbfc9-c075-4edf-a4eb-23ce0e6ac860.PNG)<br>
Vào link sau để config thư viện API của Google tìm Google+ API để active nó. <br>
[Enable Google+ API](https://console.developers.google.com/apis/library/plus.googleapis.com?q=google%2B%20api&id=98f0e0cd-7dc7-469a-baac-d5ed9a99e403&project=bloggerairbnb1&authuser=0)<br>
**Bấm vào Create Identifiers để chọn Oauth Client ID promt.**<br>
![](https://images.viblo.asia/8316a33f-4e0a-4082-b6a7-e654b981b386.PNG)<br>
Điền thông tin vào rồi bấm What credentials do I need? hiện ra giao diện sau.
![](https://images.viblo.asia/a12c28eb-bc7d-4682-a1c4-df8e03ff20b3.PNG)<br>
Chọn setup hiện ra giao diện sau
![](https://images.viblo.asia/3bd42ea0-275f-4d1a-9f83-f2decf330b66.PNG)<br>
Điền thông tin mình muốn, tiếp tục quay trở lại chọn Oauth Client ID promt lúc này ta có thể chọn Web application lúc này chưa configure nên không thể chọn Web application<br>
![](https://images.viblo.asia/f696af2b-95dd-43f3-b93f-b989595dd437.PNG)<br>
Điền Chỗ uri y như hình nhé  :
http://localhost:3000/auth/google_oauth2/callback. Sau đó nhấn Referesh để tạo key rồi Dowload xuống
![](https://images.viblo.asia/6400157a-ee22-45c7-83b1-b37dd45d5957.PNG)<br>
Key sẽ có dạng
```js
{
 "client_id": APP_ID,
 "client_secret": APP_SECRET
}
```
Truy cập `config/initializers/devise.rb` để thêm code sau (Thay APP_Id , APP_SECRET tương ứng với app bạn vừa tạo nhé)
```ruby
config.omniauth :google_oauth2, "APP_Id", "APP_SECRET", scope: 'email', info_fields: 'email,
```
Chạy rails server vào localhost xem kết quả đây là kết quả
![](https://images.viblo.asia/55053448-f3d0-46a0-bf49-ccdf024f8e41.PNG)
### Vấn đề về ảnh đại diện
Khi ta dùng 1 app với facebook nên để hiển thị avatar thi ta dung graph api của facebook; giờ dùng multi nên ta sẽ code như sau cho tất cả ứng dụng luôn nếu dùng google, twitter, github thì không cần sửa nữa.<br>
Vào `app/helpers/application_helper.rb` thêm
```ruby
module ApplicationHelper
  def avatar_url(user)
      if user.image
        user.image
      else
        gravatar_id = Digest::MD5::hexdigest(user.email).downcase
        "https://www.gravatar.com/avatar/#{gravatar_id}.jpg?d=identical&s=150"
      end
  end
end
```
## Tham khảo
https://viblo.asia/p/mot-so-ki-thuat-co-ban-trong-rails-phan-2-V3m5WbE8lO7 <br>
https://viblo.asia/p/tich-hop-theme-bat-ky-vao-rails-djeZ10woKWz?fbclid=IwAR2dkACmwOfcsmjVk_G3nBA_r1azousLZ6aMXH9_NeQ_UXqkZ9mkljyVQN0<br>
https://coder9s.blogspot.com/2018/02/devise-voi-facebook-google-github-p3.html