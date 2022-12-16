Ở bài trước, mình cũng đã từng giới thiệu việc authenticate thông quan [warden](https://viblo.asia/p/authentication-with-warden-devise-less-ZnbRlr9oG2Xo). Hôm nay mình sẽ giới thiệu thêm những ứng dụng thực tiễn cho việc sử dụng warden để authentication trong trường hợp phức tạp hơn, thông qua một bảng trung gian để shared thông tin giữa các loại user khác nhau. Việc authen này gần như đối với devise thì việc custom lại rất phức tạp. Nhưng đối với warden thì việc chúng ta hoàn toàn có thể xử lý dễ dàng hơn rất nhiều.

#### Bài toán ví dụ:

- Chúng ta có 1 server và cần implement cho việc authentication thông qua 3 subdomain:
  - http://admin.foo.local được authentication bằng tài khoản admin
  - http://manager.foo.local được authentication bằng tài khoản manager
  - http://foo.local được authentication bằng tài khoản user

Mỗi tài khoản được đăng kí và sử dụng cho những domain khác nhau. Thông thường dùng devise chúng ta hoàn toàn có thể authentication thông qua 3 model khác nhau (`Admin`, `Manager`, `User`)  và điều đó rất dễ dàng để thực thi. Nhưng đối với yêu cầu của bài toán là: Trên domain admin, chúng ta đã đăng kí với 1 email là `nguyen.thi.ngoc@framgia.com` với password: `Aa@123456`, bên manager và user nếu có đăng kí bằng email `nguyen.thi.ngoc@framgia.com` thì cũng sẽ đăng nhập được với password tương tự `admin` và khi admin reset password, thì bên manager, user cũng sẽ đăng nhập được bằng với password mới đó.

#### Cách giải quyết.

Ở đây chúng ta có rất nhiều cách giải quyết, ví dụ:

- Lưu email, password vào 3 model và khi có tài khoản nào đó thay đổi email, password thì chúng ta cũng sẽ gọi callback vào 3 model còn lại một cách làm đơn giản (chúng ta vẫn có thể sử dụng devise) nhưng dữ liệu bị lưu lặp lại vào 3 model, và khách hàng thì không muốn xảy ra việc này.
- Cách thứ 2: Lưu thông tin login chung ra 1 bảng gọi là bảng `Account` với fields: `email`, `encrypted_password` (những field common chung khác nữa) và `Admin`, `Manager`, `User` sẽ chứa `account_id` vậy khi 1 trong 3 tài khoản admin, manager, user mà thay đổi email hay password thì cả 3 tài khoản đều đăng nhập được với thông tin mới thay đổi. Tuy nhiên với trường hợp này có vẻ devise là bất lực (sẽ phải sửa hầu gần như rất rất nhiều thứ) => Sự lựa chọn hợp lý bây giờ chúng là [warden](https://github.com/wardencommunity/warden)

Ở bài trước thì mình có giới thiệu cách authentication đơn giản với model user (có `email` và `encrypted_password`), ở bài này chúng ta sẽ extend thêm việc authentication thông qua 1 model thứ 3 bằng việc sử dụng [Scopes](https://github.com/wardencommunity/warden/wiki/Scopes) để authentication cho 3 subdomain trên.

Đầu tiên ta cần định nghĩa thêm Strategies dùng cho việc authentication `Admin` gọi là `admin_login_strategy.rb` Trong này ta check điều kiện để admin có thể authenticate vào hệ thống và hoàn toàn có thể control nó một cách chủ động. Ở đây chúng ta sẽ authen bằng tài khoản admin thông quan việc check `account` có tồn tại không? admin có tài khoản nào liên kết với `account` đó không và cuối cùng là check passwod nhập vào đã đúng chưa, nếu tất cả thông tin đều đúng thì chúng ta sẽ authetication với admin đó, còn không sẽ báo lỗi.

```ruby
class AdminLoginStrategy < ::Warden::Strategies::Base
  def valid?
    email || password
  end

  def authenticate!
    account = Account.find_by_email email
    admin = account&.admin
    if user && admin && account.password == password
      success! admin
    else
      fail!("Could not log in")
    end
  end

  private
  def email
    params["session"].try :[], "email"
  end

  def password
    params["session"].try :[], "password"
  end
end
```
Trong `config/initializers/warden.rb` chúng ta thêm Strategies vừa mới khai báo
```ruby
require Rails.root.join('lib/strategies/admin_login_strategy')
Warden::Strategies.add(:admin_login, AdminLoginStrategy)
```
Tiếp đến chúng ta cần khai báo thêm session và `default_strategies`, khai báo `scope_defaults` mới để quản lý scope `admin`. Trong `config/application.rb` chúng ta thêm:

```ruby
Warden::Manager.serialize_into_session(:admin) { |a| a.id }
Warden::Manager.serialize_from_session(:admin) { |id| Admin.find_by_id(id) }

manager.default_strategies :admin_login
manager.scope_defaults :admin, strategies:[:admin_login]
```
Tiếp theo là định nghĩa thêm một số helper như là  `current_admin`, `authenticate_admin!` trong `warden_helper` có tính năng tương tự devise
```ruby
def current_admin
    warden.user(:admin)
end

def admin_authenticate!
    warden.authenticate! :admin_login, scope: :admin
end
```

Cuối cùng trong `UnauthorizedController` chúng ta cần định nghĩa lại, đối với những domain khác nhau, thì chúng ta cần redirect về chính xác màn login mà mình mong muốn
```ruby
case request.subdomain
when /^admin/
    redirect_to admin_login_path
when /^manager/
    redirect_to manager_login_path  
 else
    redirect_to new_sessions_path
end
```
Mọi bước setup đã hoàn thành giờ chúng ta chỉ cần dùng, tương tự như với devise. Muốn authentication trước khi access vào 1 màn hình nào đó chúng ta chỉ cần sử dụng
```ruby
before_action :admin_authenticate!
```
Thật dễ dàng đúng không. Và để logout khỏi hệ thống chúng ta có nhiều lựa chọn.
```ruby
warden.logout  # Clear the session.  Logs everyone out
warden.logout(:default) # logout the :default user
warden.logout(:admin)  # logout the :admin user
```
Rất dễ dàng có thể kiểm soát việc login, logout khỏi hệ thống.
Hy vọng bạn sẽ có nhiều lựa chọn hơn trong việc authentication.

#### Demo

https://github.com/nguyenngoc2505/warden-demo