Dạo gần đây loanh quanh với Node.js mãi. Nay mình đổi gió sang RoR làm bài demo về JWT (JSON Web Tokens).<br>
JWT thực ra không mới, các bạn có thể tìm hiểu trên Viblo có rất nhiều bài viết về JWT. Mình cũng đọc qua nhiều bài mà chưa có thực hành cái nào cho ra hồn nên nay quyết định thực hành một vài bài về JWT theo từng chủ đề mà mình tìm hiểu được hoặc nghĩ ra (maybe :v: ). <br>
Vì là bài đầu tiên nên mình sẽ đi từ cấp độ gà con lên nhé. <br>
# 1. Tổng quan project demo
**Project name:** Kho sách Faker <br>
**Project Function:** API only <br>
  + Người dùng có thể tự tạo account; <br>
  + Người dùng dùng đăng nhập và nhận token để truy xuất resources; <br>
  + Người dùng có thể xem list Sách (không content) mà không cần đăng nhập, nhưng muốn xem chi tiết 1 quyển sách (có content) thì phải đăng nhập.<br>

Project được thực hiện trên:
  + Ruby On Rails phiên bản 6.0.3.4
  + Ruby versiion 2.5.1
# 2. Thực hành
## 2.1. Khởi tạo User API:
Đầu tiên, dĩ nhiên tạo project rails thôi nào. Vì mình chỉ dùng API nên không cần tạo views làm gì.
```
rails new testjwtapi --database=mysql --api
```
Sau đó, thêm vào *Gemfile* các gem sau và chạy *bundle*:
```
gem 'rack-cors'
gem 'bcrypt', '~> 3.1.7'
gem 'jwt'
gem 'faker'
```
Mục đích sử dụng các gem (libs) này như sau: <br>
  + **rack-cors:** cho phép quản lý Cross Origin Resource Sharing (CORS), chỉ định URLs nào được phép thực hiện request đến server của mình; <br>
  + **bcrypt:** dùng để encrypt chuỗi. Cụ thể, ở đây sẽ sử dụng để encrypt password và verify password lúc login có khớp với encrypted password của tài khoản mà người dùng đã đăng ký hay không? <br>
  + **JWT:** dùng tạo token sau khi user login thành công. Lúc này, server trả về token cho người dùng. Người dùng sử dụng token này truy xuất vào tài nguyên được phép. <br>
  + **faker:** thì đúng như tên gọi của nó. Trong project này mình dùng để fake thông tin sách. <br>
Bước tiếp theo, mình sẽ config ***config/initializers/cors.rb***. Tạm thời sẽ để thuộc tính origin và resource là *'*'* để cho phép mọi nguồn đều có thể thực hiện request đến server của mình. Config như sau:
```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```
Tiếp theo mình sẽ tạo các ***routes*** ban đầu cho api server:
```
resource :users, only: :create
post "/login", to: "users#login"
get "/auto_login", to: "users#auto_login"
```
Tạo ***model User***:
```
rails g model User username:string password_digest:string age:integer
```
Thêm vào *model User* *has_secure_password* để thông báo cho *bcrypt* cần thực hiện công việc nó phải làm. <br>
Tiếp theo tạo ***Users controller***
```
rails g controller Users
```
Các bạn thực hiện config ***config/database.yml*** để kết nối  đến database của các bạn trước khi thực hiện việc migration nha. <br>
***Tạo, migrate và fake ít database để test***
```
#seed.rb
if !User.exists?
  puts "Create Users"

  5.times do
    User.create username: Faker::Name.name.downcase.gsub(" ", ""),
      password: "123456", age: [*18..40].sample
  end
end
```
```
rails db:create && rails db:migrate && rails db:seed
```
Vì chúng ta cần xác thực mọi request đến api server trừ (tạo user và login) nên cần một method xác thực cho mọi request đến. Trong *application_controller* thực hiện như sau:
```
class ApplicationController < ActionController::API
  before_action :authorized

  def encode_token payload
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def auth_header
    # Authorization: 'Bearer <token>'
    request.headers['Authorization']
  end

  def decode_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def logged_in_user
    if decode_token
      user_id = decode_token[0]["user_id"]
      @user = User.find_by id: user_id
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authorized
    render json: {message: "Please log in"}, status: :unauthorized unless logged_in?
  end
end
```
**encode_token:** nhận tham số đầu vào là payload. Payload thực ra là một hash (key/value) mà chúng ta muốn lưu lại trong token và chúng được sign bằng key bí mật. Ở đây mình sử dụng luôn secret_key_base của Rails theo môi trường.<br>
**auth_header:** nhằm đảm bảo các request đến luôn có *header authorization*<br>
**before_action: authorized** cho Rails biết rằng cần thực hiện method *authorized* trước khi bất kỳ request nào đến API. Ở đây, chính là đảm bảo người dùng đã logged in. <br>
**decode_token:** Nếu header xác thực đúng, method này sẽ parse string token, xác thực và lấy các key/value trong payload. Nếu xác thực thất bại sẽ trả về nil <br>
**logged_in_user** Nếu việc decode token thành công, method này sẽ lấy username từ payload và tìm kiếm user tương ứng trong database. <br>
**logged_in:** trả về true nếu user đã logged in.<br>
**authorized** trả về message nếu user chưa log in. <br>
Tiếp đến, trong ***app/controllers/user_controller.rb***, thực hiện xử lý như sau:
```
class UsersController < ApplicationController
  before_action :authorized, only: :auto_login

  def create
    @user = User.create user_params
    if @user.valid?
      token = encode_token user_id: @user.id
      render_json_token token
    else
      render json: {error: "Invalid username or password"}
    end
  end

  def login
    @user = User.find_by username: params[:username]

    if @user && @user.authenticate(params[:password])
      token = encode_token user_id: @user.id
      render_json_token token
    end
  end

  def auto_login
    render json: @user.as_json(only: :username)
  end

  private

  def user_params
    params.permit(:username, :password, :age)
  end

  def render_json_token token
    render json: {user: @user.username, token: token}
  end
end
```
**before_action :authorized, only: :auto_login**  chỉ yêu cầu thực hiện method xác thực *authorized* (ở Application Controller) khi thực hiện auto_login. <br>
**create** tạo mới user. Nếu tạo mới thành công sẽ tạo mới JWT token kèm thông tin user_id và trả về trong response. <br>
**login** tìm kiếm và xác thực user dựa trên username và password. Nếu chính xác, trả về JWT token có chứ kèm thông tin user_id trong response.<br>
**auto_login:** nếu user đã logged in sẽ trả về username của user. <br>
Giờ đến lúc Test thử API server rồi: 
```
-------
curl -XPOST -H 'Content-Type: application/json' localhost:3000/users -d '{"username": "christmas", "password": "123456"}' |json_pp 
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   161    0   114  100    47    333    137 --:--:-- --:--:-- --:--:--   333
{
   "user" : "christmas",
   "token" : "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2fQ.wnJcQQ1dOD5gLN1f6yx_olqFmSCXItSX70iVlVhTnfU"
}
---------
curl -XGET -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.eqLxff7uXl8Xmo-Jc7aVrLKJU7ICdjAeCmWD3Mkahrs' localhost:3000/auto_login |json_pp 
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    27    0    27    0     0   2747      0 --:--:-- --:--:-- --:--:--  3000
{
   "username" : "freddieadams"
}
```
Như vậy, bước đầu API đã ổn phải không nào. Và chức năng tạo được account cho người dùng và sử dụng token để đăng nhập đã hoạt động được nha.
## 2.2. Thêm Book API:
Giờ chúng ta thêm phần xử lý cho **Book API** nào. <br>
Khởi tạo ***Book Model***:
```
rails g model Book title:string author:string genre:string content:string
```
Khởi tạo ***Books Controller***
```
rails g controller books index show
```
**Migrate cho books**:
```
rail db:migrate
```
Tạo **dữ liệu mẫu** cho Books bằng cách thêm vào *seeds.rb* như sau (hoặc tùy bạn nha):
```
if !Book.exists?
  puts "Create Book"

  50.times do
    Book.create title: Faker::Book.title, author: Faker::Book.author,
      genre: Faker::Book.genre, content: Faker::Lorem.paragraph(sentence_count: [*5..10].sample)
  end
end
```
Theo yêu cầu thì có thể xem được list danh sách khi chưa cần đăng nhập, nhưng muốn xem nội dung thì phải đăng nhập, nên trong *books controller* xử lý như sau:
```
class BooksController < ApplicationController
  skip_before_action :authorized, only: :index

  def index
    render json: Book.all.as_json(except: [:created_at, :updated_at, :content])
  end

  def show
    render json: Book.find_by(id: params[:id]).as_json(except: [:created_at, :updated_at])
  end
end
```
Vì trong *Application Controller* đã thiết lập *before_action :authorized*, nên mặc định các method trong *books controller* trước khi được thực hiện thì phải *authorized*. Do đó, sử dụng *skip_before_action :authorized, only: :index* để không thực hiện *authorized*, tức là không yêu cầu đăng nhập cho việc list danh sách books. Còn việc xem chi tiết 1 quyển sách cụ thể thì vẫn phải yêu cầu đăng nhập.<br>
Cùng thử thực hiện việc gọi lần lượt đến các API nào:
```
-----------
curl -XGET localhost:3000/books |json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  4394    0  4394    0     0   181k      0 --:--:-- --:--:-- --:--:--  186k
[
   {
      "author" : "John Pfeffer",
      "title" : "For a Breath I Tarry",
      "id" : 1,
      "genre" : "Mythopoeia"
   },
   {
      "title" : "The Way of All Flesh",
      "author" : "Jarred Schmidt",
      "genre" : "Classic",
      "id" : 2
   },
   {
      "author" : "Dr. Lavone VonRueden",
      "title" : "As I Lay Dying",
      "id" : 3,
      "genre" : "Metafiction"
   },
...
]
-----------

-----------
curl -XGET localhost:3000/books/1 |json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    27    0    27    0     0   4234      0 --:--:-- --:--:-- --:--:--  4500
{
   "message" : "Please log in"
}

-----------

-----------
curl -XGET -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.eqLxff7uXl8Xmo-Jc7aVrLKJU7ICdjAeCmWD3Mkahrs' localhost:3000/books/1 |json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   192    0   192    0     0  20280      0 --:--:-- --:--:-- --:--:-- 21333
{
   "genre" : "Mythopoeia",
   "title" : "For a Breath I Tarry",
   "author" : "John Pfeffer",
   "content" : "Repudiandae aut nobis. Fugit magni et. Vel in quibusdam. Quia rerum soluta. Mollitia atque sit.",
   "id" : 1
}
-----------
```
Như vậy, Book API xử lý đúng yêu cầu rồi. Yeah! :v: 
# 3. Nguồn tham khảo
Trong bài này, còn một số vấn đề mình chưa xử lý. Các vấn đề này sẽ được tiếp tục xử lý ở các bài viết sau. <br>
Chân thành cảm ơn các bạn đã đọc hết bài viết của mình. <br>
Bài viết không thể tránh khỏi thiếu xót hoặc sai chính tả, câu chữ. <br>
Trong bài viết mình dựa chỉ yếu vào các  nguồn tham khảo sau: <br>

**Sitepoint:** https://www.sitepoint.com/introduction-to-using-jwt-in-rails/ <br>
Bản thân mình thấy bài viết này cung cấp đủ thông tin cơ bản để có thể hiểu về JWT. <br>

**Bài viết: Ruby on Rails API with JWT Auth Tutorial** https://dev.to/alexmercedcoder/ruby-on-rails-api-with-jwt-auth-tutorial-go2 <br>
Mình thấy bài viết này đủ tốt để khởi đầu với JWT. <br>
Project demo của mình được thực hiện dựa trên bài viết này. 

**Các bài viết của nhiều tác giả trên Viblo giúp mình hiểu hơn về JWT** <br>
**Source code:**
https://github.com/dtmhdev89/testjwtapi