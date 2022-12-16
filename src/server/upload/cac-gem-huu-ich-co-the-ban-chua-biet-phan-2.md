# **1. pry-byebug**

Các lỗi luôn xảy ra khi bạn viết code. Để loại bỏ chúng, có 1 vài công cụ xử lý bằng tay sử dụng để debug lỗi trong ruby. 1 trong số đó là pry-byebug. Nó thực ra là gem mở rộng của Pry và Byebug. Với pry-byebug, bạn có thể triển khai từng bước của việc debug bằng việc set các breakpoint. Pry-byebug cho phép bạn thiết lập console breakpoint vậy nên bạn có thể kiểm tra từng đoạn code đươc thực hiện.

### * **Cài đặt**

- Thêm vào file Gem:

```
gem 'pry-byebug'
```
và chạy 
```
gem 'pry-byebug'
```

### * Câu lệnh

break: Quản lý breakpoint

step: chuyển việc thực hiện đến dòng kế hoặc phương thức tiếp theo

next: Chuyển qua dòng kế tiếp với cùng 1 khung

finish: thực thi cho đến khi khung hiện tại trả về

continue: tiếp tục thực hiện chương trình và kết thúc Pry session


### * **Breakpoint**

Bạn có thể thiết lập và điều chỉnh breakpoint trực tiếp từ Pry session bằng cách sử dụng câu lệnh `break`

```
break SomeClass#run            # Dừng tại ví trí bắt đầu của `SomeClass#run`.
break Foo#bar if baz?          # Dừng tại `Foo#bar` chỉ khi nếu `baz?`.
break app/models/user.rb:15    # Dừng tại dòng 15 trong user.rb.
break 14                       # Dừng tại dòng 14 trong file hiện tại.

break --condition 4 x > 2      # Thay đổi điều kiện trên breakpoint #4 đến 'x > 2'.
break --condition 3            # Xóa bỏ điều kiện tại breakpoint số #3.

break --delete 5               # Xóa breakpoint #5.
break --disable-all            # Disable tất cả breakpoint.

break                          # Liệt kê tất cả breakpoints.
break --show 2                 # HIển thị chi tiết về breakpoint #2.
```

link: https://github.com/deivid-rodriguez/pry-byebug
# **2. Devise**

Khi bạn xây dựng 1 mạng xã hội, 1 hệ thương mại điện tử hay bất kì ứng dụng nào liên quan, bạn cần có chức năng đăng nhập, điều đó có nghĩa là bạn cần có chức năng xác thực và cấp quyền. 1 vài lập trình viên có thể sẽ muốn tự viết những chức năng đó, nhưng 1 số khác muốn sử dụng những gem có sẵn để giúp họ tiết kiệm thời gian và công sức. Một trong số đó là gem Devise. Hiếm có lập trình viên ruby nào chưa từng nghe qua về Devise gem. Nó được xây dựng dựa trên Rails MVC stack, cùng với hỗ trợ của [ OmniAuth](https://github.com/omniauth/omniauth) để xác thực người dùng, reset password nếu cần thiết, và lưu password trong database với xác thực đơn giản. Hơn nữa, Devise theo dõi các số liệu bao gồm địa chỉ IP và nhãn thời gian, phiên người dùng hết hạn sau 1 khoảng thời gian nhất định và khóa tài khoản trong trường hợp đăng nhập thất bại nhiều lần. 

### * **Cài đặt**

- Thêm vào Gemfile:

```
gem "devise"
```

- Chạy `bundle install`

- Chạy generator: `$ rails generate devise:install`

Tại thời điểm này, 1 vài hướng dẫn sẽ xuất hiện trên console. Giữa những hướng dẫn này, bạn phải thiết lập URL option mặc định cho Devise mailer trong mỗi môi trường. Đây là 1 thiết lập cho `config/environments/development.rb`:

```
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```


Trong câu lệnh tiếp theo, bạn thay thế `MODEL` với tên class sử dụng cho ứng dụng người dùng. Model sẽ được tạo và thiết lập nó với Devise module mặc định.

```
$ rails generate devise MODEL
```

Sau đó chạy `Then run rails db:migrate` và restart ứng dụng sau khi thay đổi các thiết lập tùy chọn của Devise

### * Controller filters and helpers

Devise sẽ tạo 1 vài helper để sử dụng bên trong controllers và views. Để thiết lập controller với xác thực người dùng, chỉ cần thêm before_action:


```
before_action :authenticate_user!
```

Để xem người dùng đã đăng nhập chưa ta sử dụng:
```
user_signed_in?
```

Với người dùng đã đăng nhập hiện tại:

```
current_user
```

### * **Cấu hình Model**

Phương thức Devise trong Model cũng chấp nhận 1 vài tùy chọn để cấu hình module của nó. Ví dụ như:

```
devise :database_authenticatable, :registerable, :confirmable, :recoverable, stretches: 12
```

Ngoài ra bên cạnh :stretches, bạn có thể định nghĩa :pepper, :encryptor, :confirm_within, :remember_for, :timeout_in, :unlock_in giữa những tùy chọn khác.

### * Cấu hình Views

Do views là 1 engine, bản thân nó nằm trong gem. Những views này giúp bạn bắt đầu, tuy nhiên sau 1 thời gian bạn sẽ muốn thay đổi nó. Trong trường hợp này hãy gọi generator dưới đây: 

```
$ rails generate devise:views
```

Bạn cũng có thể dùng generator để sinh ra các scoped views:

```
$ rails generate devise:views users
```

### * Cấu hình Controllers

Nếu tùy chỉnh trong views chưa đủ, bạn có thể tùy chỉnh trong controllers theo các bước dưới đây: 
1. Tạo controller sử dụng generator 

```
$ rails generate devise:controllers [scope]
```

2. Code để router sử dụng controller này

```
devise_for :users, controllers: { sessions: 'users/sessions' }
```

3. Copy views từ devise/sessions sang users/sessions. Do controller được thay đổi , nó sẽ không sử dụng views mặc định đặt trong devise/sessions.

4. Thay đổi hoặc mở rộng các hành động của controller nếu muốn.

Bạn có thể ghi đè như dưới đây:

```
class Users::SessionsController < Devise::SessionsController
  def create
    # custom sign-in code
  end
end
```

Hoặc thêm vào: 

```
class Users::SessionsController < Devise::SessionsController
  def create
    super do |resource|
      BackgroundWorker.trigger(resource)
    end
  end
end
```

Link: https://github.com/plataformatec/devise

# **3. Elasticsearch** 

Elasticserach là 1 công cụ tìm kiếm phổ biến cho doanh nghiệp. Bằng cách tận dụng Elasticsearch, bạn có thể triển khai tìm kiếm trên trang web, chỉ mục hàng hóa, chèn dữ liệu tự động, phát triển giải pháp thông báo giá, lưu trữ các giao dịch và hành động, phân tích và lấy dữ liệu để có được thống kê toàn diện.

### * **Cài đặt**

Cài đặt elasticsearch package từ Rubygems:

```
gem install elasticsearch
```

### * **Sử dụng**

elasticsearch được chia thành 2 thư viện:

[elasticsearch-transport](https://github.com/elastic/elasticsearch-ruby/tree/master/elasticsearch-transport) cung cấp người dùng cấp thấp để kết nối vào một  Elasticsearch cluster

[elasticsearch-api](https://github.com/elastic/elasticsearch-ruby/tree/master/elasticsearch-api) cung cấp 1 Ruby API cho Elasticsearch RESTful API

```
require 'elasticsearch'

client = Elasticsearch::Client.new log: true

client.transport.reload_connections!

client.cluster.health

client.search q: 'test'

# etc.
```

link: https://github.com/elastic/elasticsearch-ruby