Trong bài viết này mình sẽ tạo một ứng xác thực cho Rails API bằng cách sử dụng gem [devise_token_auth](https://github.com/lynndylanhurley/devise_token_auth), nó sử dụng token. Nói một cách đơn giản, đây là cách nó hoạt động: khi bạn gửi HTTP requests để đăng ký hoặc đăng nhập, API sẽ cung cấp cho bạn token dùng để xác thực trong các request tiếp theo.

Mặc dù tài liệu cung cấp hầu hết các thông tin bạn cần, có một vài điểm mà mình thấy khó hiểu nên mình sẽ để lại bài viết này để tham khảo trong tương lai. Hy vọng nó sẽ giúp được các bạn!

### Install devise_token_auth

Thêm dòng sau vào `Gemfile`, sau đó chạy `bundle` trong command line:

``` ruby
gem 'devise_token_auth'
```

### Generate necessary files

Chạy lệnh sau trong command line:

``` shell
rails g devise_token_auth:install User auth
```

Lệnh này giúp ta làm được nhiều việc, bao gồm:
* Tạo model `User`, nơi lưu trữ thông tin như địa chỉ email của người dùng, và file migration tương ứng.
* Thêm một dòng trong file `config/route.rb` định tuyến cho các endpoints xác thực như đăng nhập và đăng ký(Nếu bạn muốn nó được định tuyến ở đâu đó ngoài `auth`, hãy đổi `auth` bằng namespace khác)

### Migrate your database

Chạy `rails db:migrate` trong command line để áp dụng các migration đã tạo ở bước trước, file migration có đường dẫn giống như sau: 
`db/migrate/YYYYMMDDTTTT_devise_token_auth_create_users.rb`

### Configure your initializer file

Đi đến file `config/initializers/devise_token_auth.rb` (file này được tạo ở bước gererate file)

Trong [document](https://devise-token-auth.gitbook.io/devise-token-auth/config/initialization) có đầy đủ các cấu mình mà bạn có thể thực hiện, mình sẽ đưa ra một ví dụ:

``` ruby
config.change_headers_on_each_request = false
```

Mặc định, các authorization headers sẽ thay đổi theo từng request. Điều này có nghĩa bạn sẽ nhận lại token mới mỗi khi gửi request, và bạn sẽ phải gửi lại token khác nhau mỗi khi gửi request kèm theo token. Nếu không muốn điều này xảy hãy sửa config trên bằng false. 
Sử dụng lại token không phải là cách bảo mật tốt, vì vậy chúng ta nên sử dụng token mới mỗi lần request.

### Disable forgery protection for JSON requests

Rails controller cung cấp các biện pháp để chống lại các cuộc tấn công Cross-Site Request Forgery (CSRF). Đối với API chúng ta không sử dụng session và sẽ sử dụng token nên nó không cần thiết.

> Điều quan trọng cần nhớ là các request `XML` hoặc `JSON` cũng bị ảnh hưởng và nếu bạn đang xây dựng API thì bạn nên thay đổi phương thức bảo vệ trong `ApplicationController` (mặc định là :exception)

Để làm điều đó hãy thêm dòng sau trong `app/controllers/application_controller.rb`

Note: Chỉ thực hiện điều này khi tất cả request của bạn đều thông qua API.

``` ruby
class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
end
```

### Try signing up a user

Bây giờ chúng ta có ta có thể tạo user test. Khởi động Rails server, và gửi HTTP POST request đến `localhost:3000/auth/` với params như sau

``` ruby
{
  "email": "test@email.com",
  "password": "password",
  "password_confirmation": "password"
}
```

Nó sẽ trả về status 200 - success. Bây giờ hệ thống xác thực của bạn đã hoạt động.

### Add authentication to your controller

Tiếp theo, thêm một dòng trong file controller tương ứng để xác thực. VD: xây dựng 1 API cho cơ sở dữ liệu lưu trữ thông tin sách, có file controller `BooksController` để thêm hoặc xóa khỏi cơ sở dữ liệu và muốn xác thực khi thêm hoặc xóa sách 

``` ruby
class BooksController < ApiController
  before_action :authenticate_user!

  # Code for methods such as create and delete should come here.
end
```

Bây giờ bất cứ khi nào bạn gửi request đến bất kỳ phương thức nào trong `BooksController`, một lỗi sẽ trả về khi xác thực. Để có thể thêm hay xóa sách thì bạn hãy gửi request kèm theo token ở bước trước.

Nguồn: https://dev.to/risafj/guide-to-devisetokenauth-simple-authentication-in-rails-api-pfj