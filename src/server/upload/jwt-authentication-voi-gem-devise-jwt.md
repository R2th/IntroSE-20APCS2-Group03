###  Mở đầu 
Trong bài viết này mình sẽ giới thiệu gem devise-jwt và build demo app with Rails 6 . Đi thôi nào !!

Nếu bạn chưa sử dụng gem devise bao giờ bạn nên đọc qua trước để khỏi bỡ ngỡ. Đây là trang chủ của devise : https://github.com/heartcombo/devise

### Giới thiệu gem devise-jwt

[Devise-jwt](https://github.com/waiting-for-dev/devise-jwt) được mở rộng dựa trên gem [Devise](https://github.com/heartcombo/devise) bằng cách sự dung JWT để xác thực người dùng. 

Theo như tác giả viết thì gem devise-jwt chỉ thay thế cookies khi chúng không thể được sử dụng với Rest API. Nếu bạn làm việc với gem devise thì bạn sẽ không lạ gì nếu chuyển sang devise-jwt, các module vẫn sử dụng giống như devise khác chút là với gem devise thì bạn làm việc với 

session còn devise-jwt bạn dùng jwt để xác thực giữa client-server.

Sơ đồ hoạt động của authentication devise-jwt

![](https://images.viblo.asia/7060d4a5-9c88-486a-9a43-b2dde50a2793.jpg)


Trình tự diễn ra như sau: 

1. Người dùng nhập thông tin (email, password..) gửi lên server, server sẽ kiểm tra thông tin có chính xác hay không nếu đúng mặc định devise-jwt sẽ trả ra một token thông qua header response có tên `Authorization` 
2. Client sẽ lưu token vào trong local storage, sesion cookie.. để phục vụ cho request kế tiếp. 
3. Request kế tiếp phía client gắn token đó vào Header gửi lên server, server sẽ kiểm tra token có hợp lệ hay không (đã hết hạn chưa, có đúng chưa) nếu đúng trả về tài nguyên nếu sai trả ra `401` .

Cách mà devise-jwt kiểm tra token từ client gửi đến :

Có 2 cách triển khai kiểm tra token:

1. **JTIMatcher**

Về ý tưởng: 

Lưu thêm một cột string có tên `jti` vào model chuỗi này đại diện cho JWT ID duy nhất .

Nó hoạt động như sau: 

* Mỗi khi token được dispatchm  `jti` xác nhận quyền sở hữu được lấy từ `jti` cột trong model (column này đã được khởi tạo khi bản ghi đã được tạo).
* Ở mỗi hành động được xác thực, `jti` xác nhận quyền sở hữu token đến được khớp với `jti` cho người dùng đó. Việc xác thực chỉ thành công nếu chúng giống nhau.
* Khi người dùng yêu cầu đăng xuất, `jti`  của nó sẽ thay đổi, do đó, token đã cung cấp đó sẽ không còn hợp lệ nữa.

Để sử dụng chúng ta phải khai báo loại revovation trong model 

```ruby
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
end
```

Thêm Jit column vào model 

```ruby
def change
  add_column :users, :jti, :string, null: false
  add_index :users, :jti, unique: true
  # If you already have user records, you will need to initialize its `jti` column before setting it to not nullable. Your migration will look this way:
  # add_column :users, :jti, :string
  # User.all.each { |user| user.update_column(:jti, SecureRandom.uuid) }
  # change_column_null :users, :jti, false
  # add_index :users, :jti, unique: true
end
```

2. Denylist

Ở cách này chúng ta sẽ có một bảng lưu một danh sách các token đã bị hủy và thời gian để active token trở lại 

Các hoạt động:

Mỗi khi người dùng đăng xuất nó sẽ lưu token hiện tại vào bảng `jwt_denylist`, mỗi khi user gửi token yêu cầu tài nguyên server sẽ check token đó có nằm trong bảng `jwt_denylist` hay không nếu có có nghĩa là token đó chưa bị hủy.

Các triển khai: 

Khai báo loại revovation trong model: 

```ruby
class User < ApplicationRecord
  devise :database_authenticatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
end
```

Tạo bảng `jwt_denylist` để lưu token mỗi khi đăng xuất 

```ruby
def change
  create_table :jwt_denylist do |t|
    t.string :jti, null: false
    t.datetime :exp, null: false
  end
  add_index :jwt_denylist, :jti
end
```

Trong model `JwtDenylist` khai báo  tên bảng mà mình muốn lưu: 

```ruby
class JwtDenylist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Denylist

  self.table_name = 'jwt_denylist'
end
```

### Demo

Add devise-jwt vào gem file

`gem 'devise-jwt'`

`$ bundle`

Trong file `config/initializers/devise.rb`

1. Config secret key 

```ruby
Devise.setup do |config|
  config.jwt do |jwt|
    jwt.secret = ENV['DEVISE_JWT_SECRET_KEY']
  end
end
```

2. Config model 

Cũng giống như gem devise chúng ta sử dụng `database_authenticatable` để xác thực email, password 

Thêm module `jwt_authenticatable` để khi mà xác thực thành công một JWT sẽ được dispatch tới client thông qua Header có tên là `Authorization` với format `Bearer #{token}`

 Khi mà client gửi request đến thì phải gắn token `Authorization`  kèm theo bên trong Header
 
 Để xử lý việc logout ở đây mình dùng `Denylist revocation`

Trong model định nghĩa thêm 

```ruby
class User < ApplicationRecord
  devise :database_authenticatable,
         :jwt_authenticatable, jwt_revocation_strategy: UserJwtDenylist
end
```


Do mình sử dụng `Denylist` nên mình sẽ tạo thêm một bảng 

```ruby
def change
  create_table :user_jwt_denylist do |t|
    t.string :jti, null: false
    t.datetime :exp, null: false
  end
  add_index :jwt_denylist, :jti
end
```

Sau khi tạo xong bảng `user_jwt_denylist` trong model `UserJwtDenylist` ta config tên bảng mà chúng ta dùng `denylist`

```ruby
class UserJwtDenylist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Denylist

  self.table_name = "user_jwt_denylist"
end

```

Config rackcors, nếu chúng ta muốn mọi request cần token để xác thực

```
config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://your.frontend.domain.com'
    resource '/api/*',
      headers: %w(Authorization),
      methods: :any,
      expose: %w(Authorization),
      max_age: 600
  end
end
```

Nếu bạn không muốn dùng dùng session nữa : 

Trong file `config/initializers/session_store.rb`

```ruby
Rails.application.config.session_store :disabled
```

Nếu bạn vẫn muốn dùng session cho mục đích khác disable `:database_authenticatable` trong file `config/initializers/devise.rb` 

```ruby
config.skip_session_storage = [:http_auth, :params_auth]
```

Một số options config thêm:

- Để giới hạn thời gian token: 

Ở đây mình để 1 ngày

` jwt.expiration_time = 1.days.to_i`

- Khi muốn dispatch token sau request chỉ định nào đó, ví dụ mình muốn dispatch token mỗi khi login 

```ruby
jwt.dispatch_requests = [
      ["POST", %r{^/login$}]
    ]
```

Nếu không config điều trên thì respond trả về không kèm theo token 

- Thu hồi lại token, giả sử khi chúng ta gửi request logout thì token bị thu hồi 

```ruby
jwt.revocation_requests = [
      ["DELETE", %r{^/admin/logout$}], ["DELETE", %r{^/manager/logout$}],
      ["DELETE", %r{^/user/logout$}]
    ]
```

Sau khi logout thì có 1 bản ghi được lưu vào bảng `user_jwt_denylist` bảng này chứa những token đã bị thu hồi, ở mọi request cần xác thực nó sẽ check token có ở bảng này không, nếu có thì token không hợp lệ 


Ở đây mình có test trên postman với login

![image.png](https://images.viblo.asia/d1cda7a1-32b7-4f06-a57a-829b3c9fcfc0.png)

Như bạn thấy trong header có trả ra một key-values `Authorization` với token tương ứng mà server trả ra.


Bài viết của mình đến đây là hết, do mới tìm hiểu nên còn thiếu sót rất mong mọi người góp ý .

Tài liệu tham khảo:  https://github.com/waiting-for-dev/devise-jwt