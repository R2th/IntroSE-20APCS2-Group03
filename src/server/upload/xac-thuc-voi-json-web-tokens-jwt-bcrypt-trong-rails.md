![](https://images.viblo.asia/fc144722-b6fb-47f8-9af6-7d451d4c4641.jpeg)
Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu cách thiết lập xác thực người dùng trong backend bằng cách tạo JWT để lưu trữ trong đối tượng của trình duyệt `localStorage`. Xin lưu ý rằng đây có thể không phải là phương pháp tốt nhất cho ứng dụng yêu cầu bảo mật cao cho dữ liệu nhạy cảm. Trong trường hợp đó, vui lòng xem xét sử dụng `session / cookie`. Tuy nhiên, lợi ích của `localStorage` là nó chạy độc lập với máy chủ của bạn và do đó, khá hữu ích trong việc xây dựng Ứng dụng Trang đơn (SPA). Vì vậy, nếu bạn chọn sử dụng `localStorage`, đặt thời hạn sử dụng ngắn là một cách để tăng tính bảo mật. 

Tạo dự án Rails API của bạn bằng cách chạy như sau (chúng ta sẽ sử dụng PostgreSQL, bạn có thể cần phải cài đặt nó trên hệ thống của riêng bạn).
```
rails new project-name --api --database=postgresql
```
Thêm phần sau vào Gemfile của bạn (thông qua terminal) :
```
bundle add jwt && bundle add active_model_serializers && bundle add faker
```
Theo kinh nghiệm của tôi, tốt nhất là thêm chúng qua terminal thay vì nhập chúng thủ công vào Gemfile của bạn vì terminal sẽ lấy phiên bản chính xác và chỉ định phiên bản nào trong Gemfile của bạn. Bạn cũng sẽ cần bỏ comment (trong Gemfile): `gem "bcrypt"` và chạy `bundle install`.

Trong bài học này tôi sẽ giả sử bạn sẽ tự mình thiết lập cấu hình CORS, vì vậy chúng ta có thể tiếp tục với xác thực

Hãy tiếp tục và thiết lập model `User`, controller và serializer (không bắt buộc) của bạn. Đảm bảo bao gồm `username` hoặc `email` (để đăng nhập) và thuộc tính `password_digest` trên bảng `users` của bạn. Tôi sẽ thiết lập của tôi như sau:
```
rails g model User username name password_digest
rails g controller users
```

Chạy `migrations` và thêm `has_secure_password` vào model `User`. Xác thực này được cung cấp bởi `BCrypt` và sẽ đảm bảo mật khẩu có mặt khi tạo `user` mới. Thêm `has_secure_password` cũng sẽ cung cấp cho chúng ta các phương thức để thiết lập và xác thực mật khẩu `BCrypt`. Tôi cũng sẽ xem xét thêm xác nhận vào `username / email` (những điều này không được cung cấp qua `BCrypt`).

Bây giờ chúng ta cần thêm một phương thức `create` trong `UsersController` của bạn.
```
class UsersController < ApplicationController
   def create
      @user = User.create(user_params)
      if @user.valid?
         render json: @user, status: :created
      else
         render json: { error: 'Failed to create user' }, 
            status: :not_acceptable
      end
   end
 
   private
 
   def user_params
      params.require(:user).permit(:username, :name, :password)
   end
end
```
Và thêm vào tập tin `routes.rb` của bạn:
```
Rails.application.routes.draw do
   resources :users, only: [:create]
   post '/login', to: 'auth#create'
end
```
Tại thời điểm này, bây giờ bạn có thể thử tạo một người dùng mới thông qua yêu cầu POST! (Hãy nhớ rằng bạn cần kích hoạt quyền truy cập CORS.)

Thật tuyệt, giờ chúng ta đã mã hóa mật khẩu, chúng ta không phải lo lắng về việc lưu trữ mật khẩu User trên cơ sở dữ liệu dưới dạng chuỗi.

Về cơ bản, chúng ta sẽ làm tương tự với users và tokens của chúng ta, nhưng lưu trữ chúng trên trình duyệt phía máy khách hơn là trong cơ sở dữ liệu của chúng ta.
![](https://images.viblo.asia/33e8386b-46ef-4ad8-9c46-12656426d85f.png)
Hãy viết một số phương thức trong `ApplicationController` của chúng ta, để chúng ta có thể sử dụng chúng trong cả `UsersController` và `AuthController` của chúng ta.
```
class ApplicationController < ActionController::API
   before_action :authorized
   
   def authorized
      render json: { message: 'Please log in' }, 
         status: :unauthorized unless logged_in?
   end
   
   def logged_in?
      !!current_user
   end
   
   def current_user
      if decoded_token()
         user_id = decoded_token[0]['user_id']
         @user = User.find_by(id: user_id)
      end
   end
   
   def decoded_token
      if auth_header()
         token = auth_header.split(' ')[1]
         begin
            JWT.decode(token, '<secret_key_here>', true, 
               algorithm: 'HS256')
         rescue JWT::DecodeError
            nil
         end
      end
   end
   
   def auth_header
      request.headers['Authorization']
   end
   
   def encode_token(payload)
      JWT.encode(payload, '<secret_key_here>')
   end
end
```
Lưu ý: `<secret_key_here>` được thay thế bằng key bí mật của bạn. Đừng quên lưu trữ key của bạn trong tệp `.env` và thêm tệp vào `.gitignore!`

Chuỗi phương thức này hiện đang mong đợi một tiêu đề ‘Ủy quyền hóa' đi kèm với các yêu cầu tìm nạp đến các tuyến hoặc tài nguyên được bảo vệ, cụ thể là phương thức `auth_header` của chúng ta.

Cú pháp của tiêu đề này là `Authorization: Bearer <token>` và trong yêu cầu JavaScript ở mặt trước, cuối cùng nó sẽ trông như sau:
```
headers: {
   'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```
Nếu không có tiêu đề này và mã thông báo được cung cấp, máy chủ của bạn sẽ không thể xác định người dùng và sẽ không cung cấp ủy quyền. Phản hồi bạn sẽ nhận được từ một yêu cầu, như đã nêu trong phương thức `authorized` của chúng ta, sẽ là ‘Vui lòng đăng nhập'.

![](https://images.viblo.asia/d6ab3944-5c90-4dc9-9ec1-d7a8903c0f3a.png)
JWT cũng có một cú pháp của riêng họ. Với ba phần, mỗi phần cách nhau bởi một dấu chấm ("."). Một ví dụ trông như sau:
```
eyJbhGciOiJIUzI1Ni9J.eyJ2c1VyX2klIjxfoQ.g0U5SAOLozk3dz0mNUrvBSR-0CSewJ5ePraRWg_akVb
```
Mỗi phần này dịch sang mã thông báo: `header.payload.signature`

Đây chính xác là những gì phương thức `decoded_token` của chúng ta đang tìm kiếm, trước khi giải mã mã thông báo. Phương thức `encode_token` sẽ làm ngược lại, lấy thông tin của người dùng và mã hóa nó bằng key bí mật của bạn và thuật toán tùy chọn để tạo mã thông báo.

![](https://images.viblo.asia/de0d6377-a009-4702-b739-f7015a834e62.png)
Vì vậy, bây giờ khi `ApplicationContoder` của chúng ta được thiết lập, hãy hoàn thành `UsersController`
```
class UsersController < ApplicationController
   skip_before_action :authorized, only: [:create]
   
   def create
      @user = User.create(user_params)
      if @user.valid?
         @token = encode_token(user_id: @user.id)         
         render json: { user: @user, jwt: @token }, status: :created
      else
         render json: { error: 'Failed to create user' }, 
            status: :not_acceptable
      end
   end
   
   private  
   
   def user_params
      params.require(:user).permit(:username, :name, :password)
   end
end
```
Ở trên, chúng ta đã thêm vào dòng để tạo và mã hóa mã thông báo bằng id người dùng. Sau khi điều này xảy ra, Rails sẽ kết xuất hoặc trả lại cả người dùng và mã thông báo mới được tạo. Chúng ta cũng đã thêm `skip_before_action` vì nó được kế thừa từ `ApplicationController` của chúng ta, nhưng chúng ta không cần phải ủy quyền cho người dùng trước khi chúng được tạo trong cơ sở dữ liệu của chúng ta.

Tại thời điểm này, bạn sẽ có thể tạo lại một người dùng mới thông qua yêu cầu POST, nhưng lần này sẽ nhận được mã thông báo với phản hồi của bạn.

Chúng ta cần hoàn thành `AuthController` của mình để xác thực người dùng khi họ quay lại đăng nhập (so với ủy quyền cho người dùng khi họ lần đầu tạo tài khoản). `AuthController` cũng sẽ phát hành mã thông báo, vì vậy người dùng có thể điều hướng ứng dụng của bạn mà không cần phải đăng nhập trên mỗi trang hoặc với mọi yêu cầu sau đến máy chủ.

Đầu tiên, tạo `AuthController` với:
```
rails g controller Auth
```
`AuthController` sau đó sẽ chứa các mục sau:
```
class AuthController < ApplicationController
   skip_before_action :authorized, only: [:create]
   
   def create
      @user = User.find_by(username: user_login_params[:username])
      if @user && @user.authenticate(user_login_params[:password]
         token = encode_token({ user_id: @user.id })
         render json: { user: @user, jwt: token }, status: :accepted
      else
         render json: { message: 'Invalid username or password' }, 
            status: :unauthorized
      end
   end
   
   private
   
   def user_login_params
      params.require(:user).permit(:username, :password)
   end
end
```
Action `create` trong `AuthController` trông rất giống với hành động trong `UsersController`. Tuy nhiên, `AuthController` của chúng ta sẽ gọi `@user.authenticate` (một phương thức được cung cấp bởi BCrypt) trên mật khẩu được nhập khi đăng nhập trước khi cung cấp mã thông báo được mã hóa từ id người dùng của chúng ta.

Vậy là bạn đã có nó, làm thế nào để xác thực với JSON Web Tokens (JWT) & BCrypt trong Rails. Chúng ta đã tạo model User, controller và chạy migration. Chúng ta đã thiết lập BCrypt để mã hóa mật khẩu người dùng của chúng ta (một lần nữa, xin vui lòng không bao giờ lưu trữ dưới dạng văn bản thuần túy!). Chúng ta đã xây dựng `ApplicationController` để mã hóa / giải mã mã thông báo người dùng của chúng ta và ủy quyền cho người dùng của chúng ta. Và chúng ta đã xây dựng `UsersController` và `AuthController` để phát hành các mã thông báo này cho người dùng mới hoặc người dùng hiện tại.

![](https://images.viblo.asia/0b68444a-769f-4199-b19b-762b83d17724.png)