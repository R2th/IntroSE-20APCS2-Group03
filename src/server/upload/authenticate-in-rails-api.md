# 1. Khởi tạo dự án :
`rails new project_name --api`: tạo một dự án mới
# 2. Tạo cơ sở dữ liệu :
**gemfile :**
```
source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.5.1"
..........
gem "active_model_serializers" dùng để customize lại dữ liệu mà ta muốn lấy ra

gem "mysql2" cơ sở dữ liệu chúng ta sẽ không dùng sqlite3 mà dùng mysql
..........
gem "figaro" dùng để customize lại dữ liệu mà ta muốn lấy ra
group :development, :test do
gem "faker" dùng để tạo dữ liệu cho seed
end

database.yml :
default: &default
adapter: mysql2
encoding: utf8
username: <%= ENV["USERNAME"] %>
password: <%= ENV["PASSWORD"] %>
host: localhost
pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
timeout: 5000

development:
<<: *default
database: vim

test:
<<: *default
database: vim_test

production:
<<: *default
database: vim
```

**Lưu ý: **

* `rails db:creat`e (Tạo Database)
* `bundle exec figaro install `(tạo file `application.yml` để authentication DB)

**application.yml**

```
USERNAME: ABC
PASSWORD: ABC
```
# 3. Khởi tạo model :
**Tạo model user :**
`rails g model User name:string date_of_birth:datetime gender:boolean pasword_digest:string`
thêm `has_secure_password` vào model

**Tạo mã hóa password :**
`gem 'bcrypt', '~> 3.1.7'`

**Khởi tạo dữ liệu seed cho User model :**
```
20.times do |n|
 name  = Faker::Name.name
 User.create!(
   name: name,
   date_of_birth: "1997-12-09",
   gender: 0,
   password: "123123",
   password_confirmation: "123123"
 )
end
```
`rails db:seed `(tạo dữ liệu seed)
# 4. Khởi tạo controller :
`rails g controller api/v1/users`
# 5. Khởi tạo Serialize :
Tạo serialize for user: `rails g serializer user`
```
class UserSerializer < ActiveModel::Serializer
 attributes :id, :name, :gender #trả về cái mà chúng ta muốn
end
```
# 6. Khởi tạo token :
**Tạo file json_web_token.rb :**
```
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
Thực sự thì mình đọc tiếng anh như thế này nó sẽ dễ hiểu hơn là dịch qua tiếng viêt, vì dịch xong đọc khá là cục xúc =))

The first method, encode, takes three parameters -- the user ID, the expiration time (1 day), and the unique base key of your Rails application -- to create a unique token.

The second method, decode, takes the token and uses the application's secret key to decode it.

Here are the two cases in which these methods will be used:
For authenticating the user and generating a token for him/her using encode.
To check if the user's token appended in each request is correct by using decode.

**Application.rb :**
		#nó sẽ chạy cùng khi applications load
	`config.autoload_paths << Rails.root.join('lib')`
## 6.1 Xác thực người dùng (Authenticate User) :
add `gem "simple-command"`
* là một cách đơn giản để tạo các service, nó tương tự như một helper, nhưng nó làm tăng sự kết nối giữa controller và model hơn là giữa controller và view.
		Sau đó, chúng ta chạy `bundle`.
        
**how a command is structured :**
```
class AuthenticateUser
 prepend SimpleCommand

 def initialize()
   #đây là nơi lấy parameter khi command được gọi
 end

 def call
   #trả về kết quả
 end
end
```


**Service/authenticate_user.rb :**

```
class AuthenticateUser
 prepend SimpleCommand

 def initialize(name, password)
   @name = name
   @password = password
 end

 def call
   JsonWebToken.encode(user_id: user.id) if user
 end

 private

 attr_accessor :name, :password

 def user
   user = User.find_by name: name
   return user if user && user.authenticate(password)

   errors.add :user_authentication, 'invalid credentials'
   nil
 end
end
```
* command lấy name và password trả về về user, nếu như nó match.

## 6.2 Kiểm tra ủy quyên (checking User authorization) :
**service/authorize_api_request.rb:**
```
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

* http_auth_header: extract token nhận được từ authorization trong header lúc initial
* ngược lại, thì decoded_auth_header thì đúng như cái tên của nó, dùng để decodes cái token từ cái trên.

# 7. Sử dụng
Hiện tại thì chúng ta đã xong phần tạo token cho User, nhưng mà để chạy được thì phải tạo đăng nhập thì chúng ta mới nhân được token nó trả về khi đăng nhập.

**Sessions_controller.rb**
```
class Api::V1::SessionsController < ApplicationController
 skip_before_action :authenticate_request, only: :login

 def login
   authenticate params[:name], params[:password]
 end

 private
  def authenticate(name, password)
   command = AuthenticateUser.new(name, password).call
   if command
     render json: {
       data: loadUser(name),
       access_token: command.result
     }
   else
   end
 end

 def loadUser name
   @user = User.find_by! name: name
 end
end
```
**Lưu ý :**
* chúng ta phải skip_before_action vì lúc này chưa có token nên phải skip.
* chúng ta đều trả về (render) json.
* đăng nhập thì chúng ta lấy thêm token ra.