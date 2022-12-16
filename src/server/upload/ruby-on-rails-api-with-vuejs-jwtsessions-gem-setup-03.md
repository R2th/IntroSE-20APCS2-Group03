Xin chào, mọi người còn ở đó không ta? (〃＾▽＾〃) Chúng ta tiếp tục với phần tạo API backend cho ứng dụng nào!!

### Getting JWT_Sessions Setup
JSON Web Tokens là cách chúng ta sẽ xử lý xác thực trong ứng dụng này. Các ứng dụng Rails đơn thuần (không sử dụng API) sử dụng các token dựa trên session để xác nhận thông tin đăng nhập/phiên của một người dùng cụ thể. Với ứng dụng sử dụng API, chúng ta không có sẵn session logic để thực hiện điều đó.

Đầu tiên chúng ta cần cài đặt JWTSessions:

```ruby
# app/controllers/application_controller.rb

class ApplicationController < ActionController::API
   include JWTSessions::RailsAuthorization
end
```

Trong file application_controller.rb, thêm *include* như trên (có từ gem đã cài đặt trước đó). Lưu ý rằng controller này kế thừa từ ActionController::API thay vì mặc định ApplicationController. Một lần nữa, điều này là do tác động của API mode đấy!!

Thêm các exception cho các request không hợp lệ, mở rộng file như sau:

```ruby
# app/controllers/application_controller.rb

class ApplicationController < ActionController::API
  include JWTSessions::RailsAuthorization
  rescue_from JWTSessions::Errors::Unauthorized, with :not_authorized

  private

  def not_authorized
    render json: { error: 'Not Authorized' }, status: :unauthorized
  end
end
```

Chúng ta cũng cần một khóa mã hóa (encryption key), Gem JWTSessions mặc định sử dụng HS256 algorithm, và nó cần một khóa mã hóa được cung cấp sẵn.

Gem này sử dụng Redis như là một nơi lưu token mặc định, chúng ta cần một máy chủ redis (redis-server) độc lập đang chạy. Có thể sử dụng local memory để test nhưng chúng ta sẽ sử dụng redis cho ứng dụng này vì nó có thể chạy tốt trên production (đọc thêm [tại đây](https://github.com/tuwukee/jwt_sessions#token-store)).

Trong thư mục initializer tạo file jwt_sessions.rb và thêm nội dung như sau:
```ruby
# config/initializers/jwt_sessions.rb

JWTSessions.encryption_key = 'secret'
```

### Signup
Token có thể được lựa chọn lưu ở cookies phía client hoặc lưu trữ cục bộ (localStorage), việc chọn lưu ở đâu có thể xem xét dựa trên ưu và nhược điểm của chúng, tuy nhiên: cookies dễ bị CFRS, localStorage lại dễ vị tấn công XSS.

Gem JWT_Sessions cung cấp một bộ tokens - truy cập, làm mới và chống CFRS trong các trường hợp cookies được chọn để lưu token. Trong gem này, session được xác định bởi một cặp tokens **access** và **refresh**: *access token* có tuổi thọ 1 giờ, *refresh token* có tuổi thọ dài hơn ~ 2 tuần và cả hai đều có thể cấu hình lại.

Chúng ta sẽ thực hiện khá nhiều logic trong file signup_controller được tạo ra sau đây:
```
$ rails g controller signup create
```

Thêm route trong file config/routes.rb.
```ruby
Rails.application.routes.draw do
    get 'signup/create' # remove this line
    ...
end
```
Tiếp theo là thêm logic cho việc đăng ký tài khoản sử dụng các hàm có sẵn trong gem  JWT_Sessions.
```ruby
# app/controllers/signup_controller.rb

class SignupController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      payload  = { user_id: user.id }
      session = JWTSessions::Session.new(payload: payload, refresh_by_access_allowed: true)
      tokens = session.login

      response.set_cookie(JWTSessions.access_cookie,
                          value: tokens[:access],
                          httponly: true,
                          secure: Rails.env.production?)
      render json: { csrf: tokens[:csrf] }
    else
      render json: { error: user.errors.full_messages.join(' ') }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation)
  end
end
```
Có khá nhiều thứ diễn ra trong controller trên, nhưng chắc cũng không quá khó hiểu phải không? :relieved: Chúng ta sẽ hướng người dùng đến phương thức signup/create, thực hiện những công việc sau:
* Tạo một người dùng mới với các params được permit.
* Chỉ định user_id như một payload.
* Tạo session mới và token, sử dụng payload và JWTSessions.
* Cài đặt một cookie với JWTSession token [:access].
* Render JSON & CSRF  tokens cuối cùng để tránh các request xấu.
* Nếu có lỗi sẽ render các lỗi dưới dạng JSON.

### Signin/Signout
SigninController có vẻ khá giống với Signup, trừ việc tạo người dùng và xử lý khi người dùng không thể đăng nhập thành công. Ở đây cũng có thêm hàm destroy được thực hiện khi người dùng đăng xuất.
```ruby
# app/controllers/signin_controller.rb

aclass SigninController < ApplicationController
  before_action :authorize_access_request!, only: [:destroy]

  def create
    user = User.find_by!(email: params[:email])
    if user.authenticate(params[:password])
      payload = { user_id: user.id }
      session = JWTSessions::Session.new(payload: payload, refresh_by_access_allowed: true)
      tokens = session.login
      response.set_cookie(JWTSessions.access_cookie,
                        value: tokens[:access],
                        httponly: true,
                        secure: Rails.env.production?)
      render json: { csrf: tokens[:csrf] }
    else
      not_authorized
    end
  end

  def destroy
    session = JWTSessions::Session.new(payload: payload)
    session.flush_by_access_payload
    render json: :ok
  end

  private

  def not_found
    render json: { error: "Cannot find email/password combination" }, status: :not_found
  end
end
```

Phương thức not_authorized là một private method từ Application controllernó sẽ được thực hiện nếu đăng nhập không thành công.

### Refresh

Đôi khi việc lưu *refresh tokens* trong web/JS clients vẫn là chưa đủ an toàn. Điều này có thể giải quyết bằng cách thực thi phương thức **refresh_by_access_allowed**, phương thức này sẽ liên kết *access token* với r*efresh token* và làm mới nó.

Tạo file refresh_controller.rb
```ruby
# app/controllers/refresh_controller.rb

class RefreshController < ApplicationController
  before_action :authorize_refresh_by_access_request!

  def create
    session = JWTSessions::Session.new(payload: claimless_payload, refresh_by_access_allowed: true)
    tokens = session.refresh_by_access_payload do
      raise JWTSessions::Errors::Unauthorized, "Somethings not right here!"
    end
    response.set_cookie(JWTSessions.access_cookie,
                        value: tokens[:access],
                        httponly: true,
                        secure: Rails.env.production?)
    render json: { csrf: tokens[:csrf] }
  end
end
```
Chúng ta kỳ vọng *access tokens* hết hạn sẽ được làm mới, do đó cần thêm một exception trong phương thức **refresh_by_access_payload**. Ngoài ra, phần này cũng có thể làm nhiều hơn như gửi thông báo, xóa session hoặc thậm chí là... bỏ qua nó :stuck_out_tongue_winking_eye:

Thư viện JWT kiểm tra các yêu cầu hết hạn một cách tự động, để tránh exception *access token* hết hạn, chúng ta có thể khai thác phương thức **claimless_payload**.

Ở đây, ***before_action :authorized_refresh_by_access_request!*** được sử dụng như một lớp bảo vệ để bảo vệ endpoint (URL cụ thể trong ứng dụng web API).

### Tạm kết

Phần này mình đã tạo các controller và config cho việc xác thực người dùng sử dụng gem JWTSessions, phần sau chúng ta sẽ tạo một chút data và test với Postman trước khi đến với Front-end nhé!!!

Mình cũng hóng frond-end lắm, cơ mà cứ phải bình tĩnh sống  〜(￣▽￣〜) <br><br>

Nguồn tham khảo: https://web-crunch.com/ruby-on-rails-api-vue-js/