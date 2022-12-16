# JWT Authentication là gì?
*JSON Web Token (JWT) Authentication là một cách thức nhỏ gọn và an toàn để thể hiện claims được chuyển giao giữa client và server. Các claims trong JWT được mã hóa dưới dạng JSON và được sử dụng làm trọng tải cho cấu trúc JSON Web Signature (JWS) hoặc là bản rõ của cấu trúc SON Web Encryption (JWE), cho phép các claims được kỹ thuật số hóa hay được bảo vệ toàn vẹn với một Message Authentication Code (MAC) và/hoặc encrypted.*
# JWT Encryption: Cách hoạt động?
JWT tokens sẽ được encrypted thành ba phần:
1. The header: meta-data mô tả thuật toán mã hóa và loại mã thông báo
2. The payload: dữ liệu thực tế liên quan đến người dùng (id, email, v.v.)
3. The signature: sự kết hợp đặc biệt giữa header và payload để đảm bảo xác nhận người gửi là chính xác

Sau đây là một ví dụ đơn giản:

Ta có thông tin như sau:
* {user_id: 1}
* hmac secret: $39asdulawk3j489us39vm9370dmsZ
* encryption algorithm: HS256

Chúng ta có thể mã hóa như sau:

```ruby
require 'jwt'

JWT.encode(
  {user_id: 1}, 
   hmac,
   "H256")
```
Và nó sẽ trả về ba phần JWT như sau:
```
QyJ0asdfjos.ald925lIn0.eyJ0ZXN0Ijas39uZGF0YSJ9.
```

Tương tự, để giải mã thông tin trên, chúng ta có thể làm như sau:
```ruby
JWT.decode(token, hmac, "H256")

=> [
     {"user_id"=>"1"},
     {"typ"=>"JWT", "alg"=>"HS256"}
]
```
Như vậy, có thể thấy nó dễ dàng được triển khai ở trong Ruby, vậy còn Rails thì sao??
# Set Up
Ở trong Rails 5, giả sử rằng chúng ta có một Model User, chúng ta sẽ sử dụng gem bcrypt để băm mật khẩu, do vậy, chúng ta cần thêm `has_secure_password` method vào Model User
# Xây dựng thư viện JWT Auth
Vì chúng ta sử dụng encode và decode JWTs khá nhiều, nên sẽ thuận tiện hơn nếu viết một class bao gồm các chức năng đó. Và để class này (goi là Auth) pr trong thư mục `lib/`
* Đầu tiên chúng ta thêm gem `jwt` vào Gemfile
```ruby
# Gemfile

gem 'jwt'
```
* Tạo một file với đường dẫn `lib/auth.rb`
* Sau đó thêm đường dẫn tự động tải trong `config/application.rb`

```ruby
config.autoload_paths << Rails.root.join('lib')
```
Tại class Auth chúng ta xác định 2 method `.issue` chịu trách nhiệm tạo JWT từ thông tin người dùng nhất định và `.decode` sẽ giải mã JWT
```ruby
require 'jwt'

class Auth

  def self.issue(payload)
  end

  def self.decode(token)
  end

end
```
Chúng ta sẽ bắt đầu với method `.issue`
## Tạo JWT: Auth.issue
Phương pháp này chỉ đơn giản là bọc method `JWT.encode`  mà `gem jwt` tạo sẵn cho chúng ta. Phương thức này có ba đối số:

* Dữ liệu ở dạng băm, chúng ta sẽ mã hóa trong JWT
* Chìa khóa cho thuật toán băm của bạn
* Các loại thuật toán băm

Ví dụ:
```ruby
payload = {name: "sophie"}
secret_key = "masd82348$asldfja"
algorithm = "HS256"

JWT.encode(payload, secret_key, algorithm)
=> "esdiva23euihrusdfcnkjz2snciusdhuihr7480y2qikjh8"
```
Vấn đề đặt ra là làm thế nào chúng ta sẽ tạo ra một khóa bí mật?
### Tạo khóa băm
Chúng ta sẽ sử dụng module Digest có sẵn từ Ruby để tạo khóa bí mật. Chúng ta sẽ tạo khóa trên command, trong bảng điều khiển Pry và thêm nó vào môi trường của chúng ta dưới dạng một biến môi trường. Chúng ta sẽ sử dụng Figaro để đảm bảo rằng biến môi trường không bị đẩy lên GitHub.
```ruby
$ pry 
pry > Digest::SHA256.digest('beyonce')
 => "\x85\x11\xFA\xEF\xF2A\x11\xC7\x90\x9C!
 {\xDC\x11W\xFB\x93\xE5\xA3\xCD\xE3\xC2\x9E#7\xC4\xCDa\xCF\xC9/\xEA"
```
Chúng ta sẽ thêm nó vào `application.yml` như thế này:
```ruby
# config/application.yml
AUTH_SECRET: \x85\x11\xFA\xEF\xF2A\x11\xC7\x90\x9C!
{\xDC\x11W\xFB\x93\xE5\xA3\xCD\xE3\xC2\x9E#7\xC4\xCDa\xCF\xC9/\xEA
```
Bây giờ chúng ta có thể hoàn thiện method `Auth.issue` như sau:
```ruby
# lib/auth.rb
require 'jwt'
class Auth
  ALGORITHM = 'HS256'
  def self.issue(payload)
    JWT.encode(
      payload,
      auth_secret,
      ALGORITHM)
  end
  def self.decode(token)
  end
  def self.auth_secret
    ENV["AUTH_SECRET"]
  end
end
```
Chúng ta đã hoàn thành phương thức mã hóa, bây giờ sẽ đến phương thức giải mã
## Giải mã JWT: Auth.decode
Method `Auth.decode`  là bọc method `JWT.decode` mà `gem jwt` tạo sẵn. Phương thức này có ba đối số:

* JWT muốn giải mã,
* Khóa bí mật của thuật toán băm
* Các loại thuật toán băm

```ruby
# lib/auth.rb
require 'jwt'
class Auth
  ALGORITHM = 'HS256'
  def self.issue(payload)
    JWT.encode(
      payload,
      auth_secret,
      ALGORITHM)
  end
  def self.decode(token)
    JWT.decode(token, 
      auth_secret, 
      true, 
      { algorithm: ALGORITHM }).first
  end
  def self.auth_secret
    ENV["AUTH_SECRET"]
  end
end
```
Giờ chúng ta đã sẵn sàng sử dụng class Auth trong controller
# Authorizing a User in the Sessions Controller
Đầu tiên chúng ta cần thêmmột đường dẫn tới `Sessions#create`
```ruby
# config/routes.rb

...
post '/login', to: "sessions#create"
```
Giờ chúng ta sẽ xây dưng action create trong Session_controller:
```ruby
# app/controllers/sessions_controller.rb
class SessionsController < ApplicationController

  skip_before_action :authenticate

  def create
    user = User.find_by(email: auth_params[:email])
    if user.authenticate(auth_params[:password])
      jwt = Auth.issue({user: user.id})
      render json: {jwt: jwt}
    else
    end
  end

  private
  def auth_params
    params.require(:auth).permit(:email, :password)
  end
end
```
Lưu ý rằng hiện tại chúng ta đang mã hóa ID người dùng, không phải email và mật khẩu. Điều này là do ID người dùng là một định danh duy nhất và không phải là thông tin nhạy cảm (như mật khẩu).

Sau đó, chúng ta sẽ gửi JWT trở lại phía client, dưới dạng JSON, nơi nó sẽ được lưu trữ `localStorage`.
# Xác định phương thức current_user
Nếu ứng dụng phía client của chúng ta được thiết lập đúng, tất cả các yêu cầu tiếp theo đối với API của chúng ta sẽ bao gồm tiêu đề sau:
```ruby
"HTTP_AUTHORIZATION" => "Bearer <super encoded JWT>"
```
Vì vậy, method current_user của chúng ta, được xác định trong Application Controller, sẽ cần giải mã JWT. Let's do it.
```ruby
# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  before_action :authenticate 
  def logged_in?
    !!current_user
  end
  def current_user
    if auth_present?
      user = User.find(auth["user"])
      if user
        @current_user ||= user
      end
    end
  end
  def authenticate
    render json: {error: "unauthorized"}, status: 401 
      unless logged_in?
  end
  private
    def token
      request.env["HTTP_AUTHORIZATION"].scan(/Bearer 
        (.*)$/).flatten.last
    end
    def auth
      Auth.decode(token)
    end
    def auth_present?
      !!request.env.fetch("HTTP_AUTHORIZATION", 
        "").scan(/Bearer/).flatten.first
    end
end
```
Ở đây chúng ta sẽ thấy một số method trông khá quen thuộc: method `current_user` chịu trách nhiệm truy xuất người dùng hiện tại, method logged_in? trả về đúng hoặc sai, tùy thuộc vào sự hiện diện của người dùng hiện tại và method` authenticate` đóng vai trò là người gác cổng, trả về lỗi nếu người dùng chưa đăng nhập.
Hãy đi sâu vào method `current_user` của chúng ta.
* Đầu tiên, chúng ta kiểm tra xem liệu `request` của chúng ta có tiêu đề hay khóa, ["HTTP_AUTHORIZATION"] và liệu giá trị của tiêu đề đó có bao gồm tên gọi `Bearer` hay không.
* Lấy mã thông báo ra khỏi giá trị của tiêu đề đó, sẽ giống như "Bearer <encoded JWT>"

![alt](https://www.thegreatcodeadventure.com/content/images/2016/06/Screen-Shot-2016-06-09-at-10-30-28-AM.png)
  
Sau đó, trong method #auth chúng ta sử dụng thư viện Auth của mình để giải mã mã thông báo:
```ruby
Auth.decode(token)
```
Cuối cùng, chúng ta sử dụng mã thông báo được giải mã, hiện có định dạng bên dưới và chứa ID duy nhất của người dùng
```ruby
{user: 1}
```
Chúc các bạn thành công
#  Link tham khảo
https://www.thegreatcodeadventure.com/jwt-auth-in-rails-from-scratch/
    
https://github.com/plataformatec/devise