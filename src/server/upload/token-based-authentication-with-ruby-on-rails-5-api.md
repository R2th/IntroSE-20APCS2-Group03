### I. Giới thiệu
Các ứng dụng phát triển sử dụng **API** ngày cảng trở nên phổ biến thì các phương thức xác thực ưa chuộm nhất hiện nay là sử dụng **token-based** :+1::+1::+1:. Trong hướng dẫn này, tôi sẽ cung cấp tóm lược tổng quan về xác thực dựa trên **token-based** và cách triển khai trong ứng dụng API trong Rails 5.

### II. Thế nào là Token-based authentication?
**Token-based authentication** còn được biết dưới một cái tên khác(**JON WEB TOKEN authentication**) là một cách để xử lý xác thực người dùng trong các ứng dụng. Nó là một lựa chọn thay thế cho việc** session-base authentication** (Xác thực theo phiên làm việc)

- Sự khác biệt đáng chú ý nhất của **token authentication** và **session authentication** là session authentication bị phụ thuộc vào máy chủ. Một bản nghi sẽ được tạo chứa thông tin đăng nhập của người dùng. Toàn bộ thôn tin của đăng nhập sẽ được **lưu trữ** trên máy chủ. Còn token authentication **không lưu bất cứ thứ gì** trên máy chủ nhưng sẽ tạo ra những token **duy nhất** và sự dụng nó để kiểm tra mỗi khi có một yêu cầu dược gửi lên từ người dùng.
Không giống sư session authentication, sử dụng token sẽ không liên kết người dùng với thông tin đang đăng nhập.  Nhiều ứng dụng như **Facebook, Google, Github** đã  tiếp cận với phương pháp này.

### III. Những lợi ích khi sử dụng phương pháp này.
- **Cross-domain / CORS**
Cookie và CORS **không bị lẫn lộn** với nhau. Cách tiếp cận này cho phép bạn thực hiện gọi **AJAX tới bất kì máy chủ nào** bạn sử dụng HTTP header để truyền thông tin người dùng.

- **Stateless** (nó là một thiết kế để giao tiếp giữa client và server và không lưu lại vết. Sau khi người dùng gửi yêu cầu thì server sử lý rồi trả về dữ liệu. Ngay sau đó thì kết nối này sẽ bị cắt đứt.)
Làm giảm tải việc lưu trữ thông tin người dùng trên server.

- **Tách biệt** Không bị ràng buộc với một chương trình xác thực cụ thể. Token có thể được tạo ở bất cứ đâu, vì thế API cũng có thể được gọi từ bất cứ đâu bằng một lệnh xác thực duy nhất thay vì nhiều lệnh được gọi để xác thực.

- **Sẵn sàng** cho các thiết bị di động.
Cookies là vấn để khi lưu trữ thông tin người dùng trong các ứng dụng di động. Việc sử dụng token đã đơn giản hóa đáng kể quá trình này.

- **CSRF** (Cross Site Request Forgery)
Bởi vì ứng dụng không dựa vào cookie để xác thực nên nó không thể bị tấn công bởi bởi kĩ thuật CSRF. (kỹ thuật tấn công bằng cách sử dụng quyền chứng thực của người dùng đối với một website)

- **Hiệu xuất** Về mặt tải phía máy chủ việc tìm kiếm thông tin người dùng trong CSDL bằng thông tin người dùng gửi lên thì việc xác thực token sẽ tốn ít thời gian hơn. Điều này làm cho việc xác thực bằng token nhanh hơn so với phương pháp truyền thống.

### IV. Token authentication hoạt động như thế nào ?
Cách thức xác thực dựa trên mã thông báo rất đơn giản. Người dùng nhập thông tin đăng nhập của mình và gửi yêu cầu đến máy chủ. Nếu thông tin đăng nhập là chính xác, máy chủ sẽ **tạo token** được mã hóa bằng thuật toán được quy đinh sẵn VD: **HMACSHA256**, còn được gọi là JSON web token (JWT). Máy khách lưu trữ JWT và thực hiện tất cả các yêu cầu tiếp theo đến máy chủ có token được đính kèm. Máy chủ xác thực người dùng bằng cách so sánh JWT được gửi với yêu cầu với yêu cầu mà nó đã lưu trong cơ sở dữ liệu. Đây là một sơ đồ đơn giản của quá trình:

![](https://images.viblo.asia/112177fc-3933-46a6-a7b1-49dced10d738.jpg)

### V. JWT token chứa thông tin gì ?

**Header** :scream::scream::scream:
Bao gồm loại mã thông báo (JWT) và loại thuật toán mã hóa (HS256) được mã hóa trong cơ sở-64. 

**Payload** :heart_eyes::heart_eyes::heart_eyes:
Chứa thông tin về người dùng và vai trò của người đó. Ví dụ: payload của token có thể chứa e-mail và mật khẩu.

**Signature** :collision::collision::collision:
Chữ ký là một khóa duy nhất xác định dịch vụ tạo tiêu đề. Trong trường hợp này, chữ ký của mã thông báo sẽ là phiên bản được mã hóa cơ sở 64 của khóa bí mật của ứng dụng Rails ( Rails.application.secrets.secret_key_base). Vì mỗi ứng dụng có một khóa cơ sở **duy nhất**, khóa bí mật này đóng vai trò là **chữ ký của token**.

### VI. Sử dụng token authentication với Rails 5.
Đã đến lúc thực hành. Bước đầu tiên là tạo một ứng dụng chỉ API Rails 5 mới:

`rails new api-app --api` 

Bằng cách nối thêm **--api** vào cuối trình tạo, một ứng dụng  only-API sẽ được tạo. Các ứng dụng chỉ dành cho API là những bổ sung gần đây cho nền tảng Rails. :kissing:

Có một số yêu cầu **cần phải được đáp ứng** trước khi chúng tôi có thể sử dụng phương pháp dự trên token:
- Một cách mã hóa và giải mã mã thông báo JWT phải được thực hiện.
- Chúng ta cần các phương pháp để kiểm tra nếu người dùng được xác thực.
- Chúng ta cần có model
- Controller để tạo và đăng nhập người dùng.
- Chúng ta cần các route để điều hướng cho dứng dụng.

**1. Tạo User Model** :grin:
```
rails g model User name email password_digest
```

chạy migrations.
```
 rails db:migrate
```

Bằng cách chạy các phương thức này, chúng ta đã tạo ra model **User** với các trường tên, e-mail và mật khẩu trong cơ sở dữ liệu.
Phương thức **has_secure_password** phải được thêm vào mô hình để đảm bảo mật khẩu được mã hóa chính xác vào cơ sở dữ liệu. Has_secure_password là một phần của bcrypt ruby, vì vậy chúng ta phải cài đặt nó trước.

Thêm nó vào gemfile:
```
#Gemfile.rb
gem 'bcrypt', '~> 3.1.7'
```

cài đặt nó
```
 bundle install
```

Với gem đã được cài đặt, thêm phương thức **has_secure_password** vào trong model **User**:
```
#app/models/user.rb

class User < ApplicationRecord
 has_secure_password
end
```

**2. Mã hóa và giải mã JWT token**
Khi mô hình người dùng được thực hiện, việc triển khai tạo JWT token có thể bắt đầu. Gem jwt  sẽ giúp mã hóa và giải mã token sử dụng thuật toán **HMACSHA256** có sẵn trong ứng dụng Rails.

Thêm gem jwt.
```
gem 'jwt'
```

cài đặt nó
```
bundle install
```

Khi gem được cài đặt, nó có thể được truy cập thông qua biến toàn cục JWT. Bởi vì các phương thức sẽ được sử dụng để yêu cầu đóng gói.

Khởi tạo một class **JsonWebToken** chứa singleton class để **mã hóa và giải mã token**.

```
# lib/json_web_token.rb

class JsonWebToken
 class << self
   def encode(payload, exp = 24.hours.from_now)
     payload[:exp] = exp.to_i
     JWT.encode(payload, Rails.application.secrets.secret_key_base)
   end

   def decode(token)
     body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
     HashWithIndifferentAccess.new body
   rescue
     nil
   end
 end
end
```

Phương thức đầu tiên: **encode**, lấy ba tham số: ID người dùng, thời gian hết hạn (1 ngày) và khóa cơ sở duy nhất của ứng dụng Rails của bạn để tạo mã thông báo duy nhất.
Phương thức thứ hai: **decode**, lấy token và sử dụng khóa bí mật của ứng dụng để giải mã nó.

Hai trường hợp mà các phương thức này sẽ được sử dụng:
- Để **xác thực người dùng và tạo mã thông báo** cho người dùng bằng cách sử dụng **encode**.
- Để **kiểm tra xem token** của người dùng được thêm vào trong mỗi yêu cầu có chính xác hay không bằng cách sử dụng **decode**.

Để đảm bảo mọi thứ sẽ hoạt động, nội dung của thư mục **lib** phải được đưa vào khi tải ứng dụng Rails.
```
#config/application.rb
module ApiApp
  class Application < Rails::Application
    #.....
    config.autoload_paths << Rails.root.join('lib')
    #.....
    end
  end
end
```

**3. Xác thực người dùng.**
Thay vì sử dụng các phương pháp điều khiển riêng, simple_command đã được sử dụng. Để biết thêm thông tin về cài đặt hãy xem bài viết [Simple_command](https://github.com/nebulab/simple_command) .
Thêm chung vào gem file.

```
gem 'simple_command'
```

cài đặt nó
```
bundle install
```

Sau đó, các phương thức alias của simple_command có thể dễ dàng được sử dụng trong một lớp bằng cách thêm prepend SimpleCommand. vào class AuthenticateUser
```
class AuthenticateUser
   prepend SimpleCommand

  def initialize()
   #this is where parameters are taken when the command is called
  end

  def call
   #this is where the result gets returned
  end

end
```

Lệnh lấy e-mail và mật khẩu của người dùng sau đó trả về người dùng, nếu thông tin đăng nhập khớp.
```
# app/commands/authenticate_user.rb

class AuthenticateUser
  prepend SimpleCommand

  def initialize(email, password)
    @email = email
    @password = password
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  attr_accessor :email, :password

  def user
    user = User.find_by_email(email)
    return user if user && user.authenticate(password)

    errors.add :user_authentication, 'invalid credentials'
    nil
  end
end
```

Lệnh lấy các tham số và khởi tạo một thể hiện của lớp với email và password các thuộc tính có thể truy cập được trong lớp. **private method user** sử dụng thông tin đăng nhập để kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu hay không bằng **User.find_by_email**.
Nếu người dùng được tìm thấy, sử dụng kèm phương thức authenticate. Phương thức này đã được tích hợp bằng cách cài đặt gem has_secure_password. Nó dùng để kiểm tra xem mật khẩu của người dùng có đúng không. Nếu mọi thứ là đúng, thông tin **user sẽ được trả về**. Nếu không, phương thức sẽ **trả về nil**. :collision::+1:
 
**4 Kiểm tra ủy quyền người dùng.**
Việc tạo token đã được thực hiện, nhưng không có cách nào để kiểm tra xem mã thông báo đã được thêm vào yêu cầu có hợp lệ hay không. Lệnh ủy quyền phải lấy headers và yêu cầu và giải mã mã thông báo bằng phương thức decode trong singleton class JsonWebToken.

```
# app/commands/authorize_api_request.rb

class AuthorizeApiRequest
  prepend SimpleCommand

  def initialize(headers = {})
    @headers = headers
  end

  def call
    user
  end

  private

  attr_reader :headers

  def user
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
    @user || errors.add(:token, 'Invalid token') && nil
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    if headers['Authorization'].present?
      return headers['Authorization'].split(' ').last
    else
      errors.add(:token, 'Missing token')
    end
    nil
  end
end
```
Giải thích từng method trong class. :clap::clap::clap:
- method **http_auth_header**
lấy token từ headers khi class được khởi tạo.
- method **decoding_auth-token**
giải mã token nhận được từ http_auth_header và lấy ID người dùng.
- method **user** ta sẽ đi qua từng dòng một.
+ Trong dòng đầu tiên, Về cơ bản, nếu User.find() trả về một tập hợp trống hoặc decoded_auth_token trả về false thì @usersẽ là nil.
+ Dòng thứ hai, phương thức user sẽ trả về user hoặc đưa ra lỗi. Trong Ruby, dòng cuối cùng của hàm được trả về hoàn toàn, do đó lệnh kết thúc trả về đối tượng người dùng.

**5 Thực hiện các Helper Methods trong Controllers**
Tất cả logic để xử lý token JWT đã được đặt ra. Đã đến lúc triển khai nó trong Controller và đưa nó vào sử dụng thực tế. Hai phần thiết yếu nhất để thực hiện là xác định người dùng đăng nhập và tham chiếu người dùng hiện tại.

- **Login Users**
Đầu tiên, hãy bắt đầu với thông tin đăng nhập của người dùng:
```
# app/controllers/authentication_controller.rb

class AuthenticationController < ApplicationController
 skip_before_action :authenticate_request

 def authenticate
   command = AuthenticateUser.call(params[:email], params[:password])

   if command.success?
     render json: { auth_token: command.result }
   else
     render json: { error: command.errors }, status: :unauthorized
   end
 end
end
```

Method authen sẽ lấy thông tin người dùng sau đó xác thực nếu kết quả thành công sẽ trả về token để gọi các hành động sau này. Ngược lại nếu không thành công sẽ trả về mã lỗi.

- **Authorizing Requests**
phải có một phương thức **current_user** để duy trỳ đăng nhập của người dùng. Để sử dụng nó bạn phải được** khai báo** trong **ApplicationController**:

```
#app/controllers/application_controller.rb
class ApplicationController < ActionController::API
 before_action :authenticate_request
  attr_reader :current_user

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
```

**5 Nó có hoạt động không ?**
Hãy xem mọi thứ hoạt động như thế nào. Mở console trong ứng dụng của bạn.
```
rails c
```

Tạo thông tin người dùng trên rails console.
```
User.create!(email: 'example@mail.com' , password: '123123123' , password_confirmation: '123123123')
```

Để xem cách ủy quyền hoạt động, cần phải có một **resouce** để gửi yêu cầu tới.  Mở console trên ứng dụng của bạn.
```
rails g scaffold Item name:string description:text

và chạy 

rails db:migrate
```

Thực hiện **gửi yêu cầu** đăng nhập
```
curl -H "Content-Type: application/json" -X POST -d '{"email":"example@mail.com","password":"123123123"}' http://localhost:3000/authenticate
```

**Kết quả** trả về là token sử dụng cho các lần gửi request sau. 
```
{"auth_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE0NjA2NTgxODZ9.xsSwcPC22IR71OBv6bU_OGCSyfE89DvEzWfDU0iybMA"}
```

Chạy thử
```
curl http://localhost:3000/items
{"error":"Not Authorized"}
```
Một mã lỗi được trả về vì token không tồn tại trong header của bạn. Thêm token vào và chạy lại.

```
curl -H "Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE0NjA2NTgxODZ9.xsSwcPC22IR71OBv6bU_OGCSyfE89DvEzWfDU0iybMA" http://localhost:3000/items
```

Một mảng trống được trả về có nghĩa là bạn đã thành công! Ứng dụng đã hoạt động. =))
Bạn có thể tham khảo ứng dụng [tại đây](https://github.com/hggeorgiev/rails-jwt-auth-tutorial)

### VI. Tài liệu tham khảo.
- https://www.pluralsight.com/guides/token-based-authentication-with-ruby-on-rails-5-api
- https://topdev.vn/blog/stateless-la-gi-stateful-la-gi/
- https://topdev.vn/blog/json-web-token-jwt-la-gi/