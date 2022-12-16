# Giới thiệu
Devise cung cấp tính năng xác thực người dùng trong Rails. Hoạt động theo mô hình MVC, dựa trên khái niệm modules. 

Bao gồm tất cả 10 modules:
* Database Authenticable: mã hóa và lưu mật khẩu trên database để xác thực người dùng.
* Omniauthable: Hỗ trợ đăng nhập bên thứ 3 (google, facebook,...)
* Confirmable: Gửi email để xác thực khi đăng kí, hoặc thay đổi email tài khoản, mật khẩu...
* Recoverable: Tạo lại mật khẩu mới phục vụ trường hợp quên mật khẩu người dùng.
* Registerable: Xử lí việc đăng kí người dùng mới, đồng thời cho phép họ chỉnh sửa và hủy tài khoản chính mình.
* Rememberable: Quản lí việc tạo và xóa token ghi nhớ tài khoản bằng cookie.
* Trackable: Theo dõi số lần đăng nhập, thời gian đăng nhập và địa chỉ IP.
* Timeoutable: Kiểm soát thời gian phiên hoạt động.
* Validatable: Cung cấp xác thực email và mật khẩu. Có thể chỉnh sửa theo ý muốn của mình.
* Lockable: Khóa tài khoản sau một vài lần đăng nhập thất bại. Có thể mở  khóa thông qua email hoặc khoảng thời gian nhất định.
# Sử dụng
Thêm `gem devise` trong file Gemfile.

Chạy `bundle install` như thường lệ.

Tiếp đó chạy lệnh:
`rails generate devise:install`

Sau đó chạy câu lệnh sau để tạo model sử dụng devise:
`rails generate devise MODEL`

`MODEL` là tên model sử dụng devise.

Ví dụ ta sử dụng model User hoặc Admin thì thay `MODEL` với tên tương ứng cần sử dụng.
Sau khi chạy câu lệnh xong, sẽ tạo ra model tương ứng (nếu model chưa tồn tại) và cấu hình với các module Devise mặc định.

Và nó cũng tạo ra resource tương ứng cho model. Bạn có thể thấy trong file `config/routes.rb`.

Để thấy chi tiết hơn ta gõ lệnh `rails routes` để kiểm tra.

Ta có thể chỉnh sửa lại đường dẫn đó theo ý muốn bằng cú pháp:
```
devise_for :users, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout', password: 'secret', confirmation: 'verification', unlock: 'unblock', registration: 'register' }
```

####  Validate
Mọi config devise sẽ nằm trong file `config/initializers/devise.rb`. Ta có thể tùy chỉnh theo ý muốn như là: validate email, password,.. trong file này.

Ví dụ:

`config.email_regexp = /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i` - để validate email.

`config.password_length = 6..128` - validate độ dài mật khẩu.

`config.confirm_within = 2.days` - thiết lập thời gian confirm email.

#### Lockable & Recoverable
Khi xử lí việc 1 tài khoản nào đó đăng nhập thất bại nhiều lần, ta cấu hình trong file `devise.rb` như sau:
```
  # ==> Configuration for :lockable
  # 5 là số lần đăng nhập thất bại
  config.lock_strategy = 5

  # Định nghĩa email là trường được dùng để mở khóa tài khoản
  config.unlock_keys = [:email]

  # Định nghĩa xác thực trường email để mở khóa tài khoản.
  # :email = Gửi đường dẫn mở khóa vào email người dùng
  # :time  = Cho phép đăng nhập lại sau khoảng thời gian nào đó được thiết lập ở dưới
  # :both  = Cho phép cả 2 cách để mở khóa
  config.unlock_strategy = :both

  # Số lần xác thực tối đa khi mở khóa tài khoản
  # config.maximum_attempts = 20

  # Set thời gian mở khóa tài khoản nếu như :time được cấp nạp
  # config.unlock_in = 1.hour

  # Warn on the last attempt before the account is locked.
  # config.last_attempt_warning = true

  # ==> Configuration for :recoverable
  #
  # Xác định trường email sẽ được sử dụng khi khôi phục mật khẩu cho tài khoản
  # config.reset_password_keys = [:email]
```

#### Devise cung cấp một số helper phục vụ cho view và controller.

Ví dụ để xác thực người dùng trước khi vào một controller thì ta dùng cấu trúc sau:
`before_action :authenticate_user!` với model tên là User. 
Trường hợp model sử dụng devise có tên là Admin thì ta thay `_user` bằng `_admin`.

Login trên cũng tương tự với các helper sau:

`user_signed_in?` : xác minh người dùng đã đăng nhập hay chưa?

`current_user`: Trả về người dùng đăng nhập hiện tại.

`user_session`: Để truy cập phiên làm việc.

Ta chạy câu lệnh sau để tạo ra các view cho Devise
`rails generate devise:views` để tùy chỉnh lại các view cho thích hợp.

Devise sử dụng strong params để truyền vào model nên khi ta tùy chỉnh view khi đăng kí hoặc đăng nhập thì ta phải cấu hình như sau để truyền các param khác vào.

Ví dụ, khi đăng kí và chỉnh sửa thông tin cá nhân yêu cầu người dùng nhập vào họ tên, số điện thoại, email và mật khẩu, ta sẽ cấu hình như sau:

Vào `application_controller.rb` thêm các câu lệnh sau:
```
before_action :configure_permitted_parameters, if: :devise_controller?

protected

def config_permitted_parameters
    added_attrs = [:name, :phone, :email, :password, :password_confirmation]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
end
```

#### OmniAuth
Devise hỗ trợ cho phép đăng nhập bên thứ 3 như là facebook, github, google,...

Ví dụ, để đăng nhập bằng facebook. Trước tiên ta thêm `gem 'omniauth-facebook'` vào Gemfile.

Sau đó config trong file `config/initializers/devise.rb`:
```
config.omniauth :facebook, 'APP_ID', 'SECRET_KEY'
```
Để biết thêm chi tiết các bạn có thể tham khảo [https://github.com/plataformatec/devise/wiki/OmniAuth:-Overview](https://github.com/plataformatec/devise/wiki/OmniAuth:-Overview) để nắm rõ hơn.

Ở ví dụ trên, APP_ID và SECRET_KEY là của ứng dụng tạo trên developer facebook. Các bạn có thể tham khảo cách tạo ứng dụng trên facebook qua đường link này [https://developers.facebook.com/docs/apps/](https://developers.facebook.com/docs/apps/) để lấy APP_ID và SECRET_KEY


#### I18n
Devise gửi các message qua flash nên ta có thể dễ dàng config lại theo ý muốn trong file `devise.en.yml` hoặc `devise.vi.yml`
```
en:
  devise:
    sessions:
      signed_in: 'Signed in successfully.'
```
```
vi:
  devise:
    sessions:
      signed_in: 'Đăng nhập thành công.'
```

#### Cấu hình nhiều devise model
Devise cho phép ta sử dụng nhiều devise model.

Ví dụ ta muốn dùng cả user devise và admin devise thì ta cấu hình tương tự như các bước ở trên, nhưng thay cho MODEL `user` là MODEL `admin`. Cụ thể:
```
# Trong file routes.rb
devise_for :admins

# Trong controller muốn gọi đến admin devise
before_action :authenticate_admin!

# Các helper tương tự
admin_signed_in?
current_admin
admin_session
```
Ở các trường hợp này người ta khuyến khích sử dụng [gem cancancan](https://github.com/CanCanCommunity/cancancan) - một loại gem chuyên dụng cho phân quyền chức năng.
# Tổng kết
Gem devise là một gem rất hữu ích, giúp chúng ta quản lí người dùng, với rất nhiều tính năng đa dạng như mình đã kể trên.
Còn rất nhiều tính năng khác các bạn có thể tham khảo trên [https://github.com/plataformatec/devise](https://github.com/plataformatec/devise)