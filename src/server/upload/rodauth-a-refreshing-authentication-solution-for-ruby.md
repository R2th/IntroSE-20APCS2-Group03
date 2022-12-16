Chắc hẳn, nếu bạn làm việc với rails thì rất nhiều app của bạn có sử dụng một số framework xác thực người dùng như Devise, , Sorcery, Clearance, or Authlogic. Điểm chung của những framework này là chúng được xây dựng dựa trên Rails. Ngoài việc kế thừa những điểm tốt của rails thì chúng cũng kế thừa một số hạn chế như mô hình cồng kềnh, lạm dụng Active Record. Một lựa chọn đáng kể tới đó là sử dụng Rodauth. Khác với những framework khác được xây dựng dựa trên rails và Active Record, Rodauth được xây dựng dựa trên 2 gem là Roda và Sequel.

## Logic xác thực mang tính bao đóng
Với Rodauth, tất cả các hành vi nhằm xác thực người dùng đều mang tính bao đóng trong một đối tượng Rodauth::Auth được tạo ra bên trong middleware của Roda và có quyền truy cập với các request.
```ruby
class RodauthMiddleware < Roda
  # define your Rodauth configuration
  plugin :rodauth do
    # load authentication features you need
    enable :login, :logout, :create_account, :verify_account, :reset_password
    # change default settings
    password_minimum_lenth 8
    login_return_to_requested_location? true
    reset_password_autologin? true
    logout_redirect "/"
    # ...
  end
  # handles requests before they reach the main app
  route do |r|
    # handle Rodauth paths (/login, /create-account, /reset-password, ...)
    r.rodauth
    # require authentication for certain routes
    if r.path.start_with?("/dashboard")
      rodauth.require_authentication
    end
  end
end
```
Khi thêm app Roda trên vào middleware stack, block route sẽ được gọi với mỗi request trước khi nó đi tới app chính.  R.rodauth sẽ xử lí các route, rodauth.require_authentication sẽ chuyển hướng tới trang đăng nhập nếu người dùng chưa đăng nhập. Tới cuối block, request sẽ được chuyển tới app chính. Các instance của Rodauth vẫn sẽ tồn tại trong controller và view, vì vậy bạn có thể yêu cầu xác thực ở trong controller nếu bạn muốn:
```ruby
class PostsController < ApplicationController
  before_action -> { rodauth.require_authentication }
  # ...
end
```
hoặc render ra link xác thực ở trong view:
```ruby
<% if rodauth.authenticated? %>
  <%= link_to "Sign out", rodauth.logout_path, method: :post %>
<% else %>
  <%= link_to "Sign in", rodauth.login_path %>
  <%= link_to "Sign up", rodauth.create_account_path %>
<% end %>
```

## Một số chức năng chính 
Rdauth có tất cả các chức năng chính của một framework xác thực:
* Login/logout, nhớ mật khẩu.
* Tạo tài khoản với xác thực email.
* Đổi mật khẩu, reset mật khẩu.
* Đổi email với xác thực email.
* Khóa hoặc hủy tài khoản.

Bạn cũng sẽ thấy Rodauth có cả những tính năng bảo mật chuyện nghiệp như:
* Đặt thời hạn dùng cho mật khẩu, không cho dùng lại mật khẩu cũ.
* Kiểm tra độ phức tạp của mật khẩu, không cho dùng mật khẩu sơ sài.
* Đặt thời hạn sử dụng cho tài khoản và phiên đăng nhập.

Một số các tính năng khác:
* Xác thực qua HTTP
* Xác thực qua email
* Ghi nhật kí đăng nhập
* ...

## Uniform configuration DSL
Đối với Devise, có một số layer khác mà bạn có thể tùy chỉnh cách xác thực như: cài đặt global , cài đặt model , cài đặt controller và cài đặt routing . Một số cài đặt trên có thể tùy chỉnh động (dựa vào trạng thái của model hoặc controller), trong khi số còn lại chỉ có thể tùy chỉnh cứng. Và một số Hooks được kích hoạt ở model, trong khi số còn lại thì bạn phải ghi đè vào controller.
Đối với Rodauth, nó cung cấp một tùy chỉnh DSL đồng nhất cho phép thay đổi hầu như mọi hành vi xác thực được khai báo trong class Rodauth::Auth. Bạn có thể ghi đè một phương thức tùy chỉnh bằng cách tạo một giá trị tĩnh, hoặc truyền một block động.
```ruby
class RodauthApp < Roda
  plugin :rodauth do
    # each feature adds its own set of configuration methods
    enable :login, :create_account, :verify_account_grace_period, :reset_password

    # examples of static values:
    login_redirect "/dashboard"        # redirect to /dashboard after logging in
    verify_account_grace_period 3.days # allow unverified access for 3 days after registration
    reset_password_autologin? true     # automatically log the user in after password reset

    # examples of dynamic blocks:
    password_minimum_length { MyConfig.get(:min_password_length) } # change minimum allowed password length
    login_valid_email? { |login| TrueMail.valid?(login) }          # override email validation logic
    verify_account_redirect { login_redirect }                     # after account verification redirect to wherever login redirects to
  end
end
```
Rodauth cung cấp một DSL cho việc phát triển các tính năng mới, giúp hợp lý hóa việc thêm các phương thức tùy chỉnh mới và tạo ra các hành vi xác thực linh hoạt nhất có thể
## Một số tính năng khác
### Các tính năng xác thực đã khai thác
Rodauth đã làm rất tốt trong việc làm các tính năng xác thực trở nên độc lập với nhau. Mỗi một tính năng đều được chứa trong một file duy nhất, code chỉ được load khi tính năng được kích hoạt. Điều này làm cho việc tìm hiểu các tính năng trở nên dễ dàng.
```ruby
enable :create_account,              # create account and automatically login                -- lib/features/rodauth/create_account.rb
       :verify_account,              # require email verification after account creation     -- lib/features/rodauth/verify_account.rb
       :verify_account_grace_period, # allow unverified login for a certain period of time   -- lib/features/rodauth/verify_account_grace_period.rb

       :change_login,                # change email immediately                              -- lib/features/rodauth/change_login.rb
       :verify_login_change,         # require email verification before change is applied   -- lib/features/rodauth/verify_login_change.rb

       :password_complexity,         # add password complexity requirements                  -- lib/features/rodauth/password_complexity.rb
       :disallow_common_passwords,   # don't allow using a weak common password              -- lib/features/rodauth/disallow_common_passwords.rb
       :disallow_password_reuse,     # don't allow using a previously used password          -- lib/features/rodauth/disallow_password_reuse.rb
```
### Mỗi tính năng có một bảng cơ sở dữ liệu
Rodauth features are decoupled not only in code, but also in the database. Instead of adding all columns to a single table, in Rodauth each feature has a dedicated table. This makes it more transparent which database columns belong to which features.
Các tính năng của Rodauth đều độc lập không chỉ trong code mà còn trong cơ sở dữ liệu, thay vì thêm các cột trong một bảng thì mỗi tính năng của Rodauth lại có một bảng riêng. Điều này giúp phân biệt rõ các cột nào, bảng cơ sở dữ liệu nào thuộc về tính năng nào.
```ruby
create_table :accounts do ... end                    # used by base feature
create_table :account_password_reset_keys do ... end # used by reset_password feature
create_table :account_verification_keys do ... end   # used by verify_account feature
create_table :account_login_change_keys do ... end   # used by verify_login_change feature
create_table :account_remember_keys do ... end       # used by remember feature
# ...
```
## Kết luận
Rodauth là một trong những framework đem lại sự mới mẻ trong cách lập trình Ruby, cung cấp các thiết kế tiên tiến và dễ hiểu của các tính năng, được hỗ trợ bởi tính năng tùy chỉnh mạnh mẽ với DSL giúp tạo ra độ linh hoạt cao cho framework.