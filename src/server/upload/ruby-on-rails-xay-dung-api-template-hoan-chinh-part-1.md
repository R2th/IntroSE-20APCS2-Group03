Bài viết này mình gồm 2 nội dung chính: <br>
1. Cách xây dựng API app theo template (mình đã làm)
2. Ý nghĩa các gem được cài đặt

### **I. Setting up API Rails App**
Đầu tiên, khởi tạo project với API với option **--api** <br>
Lưu ý option này chỉ hỗ trợ từ phiên bản Ruby >= 2.2.2 và Rails >= 5.0.0. <br>
Trong bài viết này mình sử dụng rails 6.0.1
```
rails _6.0.1_ new api_app_name --api -T -d mysql
```

### **II. Using RSpec for Testing**
#### 1. Cài RSpec & Simplecov: <br>
- Lý do cài đặt RSpec đầu tiên vì nó sẽ giúp chúng ta tiết kiệm thời gian bằng cách sử dụng bộ RSpec generator, thì nó sẽ tiến hành generate tự động các file test controller và model khi ta sử dụng câu lệnh **rails g scaffold** để tự tạo các resoures nhanh chóng.
- Để cài đặt RSpec, thêm gem `rspec-rails` vào Gemfile trong group **:development**, **:test**
```ruby
group :development, :test do
  gem "rspec-rails"
  gem "factory_bot_rails"
  gem "shoulda-matchers"

  gem "simplecov"
  gem "simplecov-rcov"
  gem "simplecov-json"

  gem "ffaker"
end
```
Gem `factory_bot_rails` giúp mình tạo object cần thiết để test.
Kết hợp với gem `ffaker` để tạo object với giá trị ngẫu nhiên. <br>
Gem `shoulda-matchers` cung cấp phương thức giúp viết test case ngắn gọn.
Xem thêm cú pháp tại [đây](https://github.com/thoughtbot/shoulda-matchers) <br>
Gem `simplecov` giúp thống kê % coverage của unit test mà mình viết. <br>

Tiến hành update bundle, sau đó cài đặt RSpec
```
bundle
rails g rspec:install
```

#### 2. Config factory_bot

- Để sử dụng các phương thức của factory_bot, cần phải cấu hình rspec để nhận syntax của factory_bot. <br>
  Ở file spec/rails_helper.rb:
  ```ruby
    RSpec.configure do |config|
      config.include FactoryBot::Syntax::Methods
    end
  ```

#### 3. Config shoulda-matchers <br>
   Ở `ngay đầu` file spec/rails_helper.rb thêm:
   
```ruby
require "shoulda/matchers"
```

Ở `cuối` file spec/rails_helper.rb thêm:
```ruby
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
```

#### 4. Config simplecov <br>
Ở `ngay đầu` file spec/spec_helper.rb thêm:
```ruby
require "simplecov"
SimpleCov.start "rails"
require "factory_bot"
```

#### 5. Config ffaker

Ở thư mục spec/factories/ tạo file có tên tương ứng với object cần tạo. <br>
Ví dụ tạo file users.rb theo format sau: <br>
```ruby
FactoryBot.define do
  factory :user do
    name {FFaker::Name.name}
    email {FFaker::InternetSE.safe_email}
  end
end
```

Sau khi chạy xong test, có thể mở file `coverage/index.html` bằng trình duyệt để xem. <br>
Đưa thư mục coverage vào `.gitignore` 
```
echo "coverage" >> .gitignore
```

### **III. Integration Rubocop & CI**
#### 1. Thiết lập Rubocop: <br>
1.1. Cài đặt gem `rubocop` vào Gemfile
> Với Ruby 2.5.x trở về trước
```ruby
group :development, :test do
  gem "rubocop"
end
```

> Với Ruby 2.6.x trở đi
```ruby
group :development, :test do
  gem "rubocop", require: false
  gem "rubocop-checkstyle_formatter", require: false
end
```

1.2. Tải tệp nén tương ứng với phiên bản rubocop đã cài đặt ở bước 1:
> Với Ruby 2.5.x trở về trước
Tải [file](https://github.com/framgia/Training-Guideline/blob/master/Rails/rubocop_config-0.54.0.tar.gz) <br>
> Với Ruby 2.6.x trở đi
Tải [file](https://github.com/framgia/Training-Guideline/blob/master/Rails/rubocop_config-0.74.0.tar.gz)

Sau đó copy 3 file trong tệp nén vừa tải về:
```
.rubocop.yml
.rubocop_disabled.yml
.rubocop_enabled.yml
```
Paste vào thư mục dự án, ngang hàng với Gemfile.

1.3. Chạy rubocop trước mỗi lần commit gửi pull bằng lệnh:
```
rubocop
```
<br>

#### 2. Thiết lập CI
Tùy vào yêu cầu CI riêng ở mỗi công ty, các bạn cài đặt theo yêu cầu của công ty đó nhé <br>
2.1. Tiến hành chạy kiểm tra CI <br>
2.2. Cấp quyền cho file report CI <br>
2.3. Xem lại reports của CI vừa chạy ở thư mục report tương ứng với CI vừa cài đặt: <br>
2.4. Đưa một số file Ci report vào .gitignore
```
echo "<file>" >> .gitignore
```

### **IV. SETUP DATABASE**
Thêm gem `dotenv-rails` để thiết lập biến môi trường `.env` <br>
Trong database.yml, config như sau:
```ruby
default: &default
  adapter: mysql2
  encoding: utf8mb4
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  host: <%= ENV.fetch("DATABASE_HOST", "localhost") %>
  username: <%= ENV.fetch("DATABASE_USERNAME", "root") %>
  password: <%= ENV["DATABASE_PASSWORD"] %>
  socket: <%= ENV.fetch("DATABASE_SOCKET", "/var/run/mysqld/mysqld.sock") %>
```

Rồi tạo DB
```
rails db:create
```

### **V. Building Your API**
Khi app được khởi tạo với option **--api**, ta có thể dùng generator scaffold mặc định để generate API resources như thông thường mà không cần thêm tham số đặc biệt nào
```
rails g scaffold user name email
```
Khi chạy xong nó sẽ tạo ra các file có cấu trúc như sau:
```
invoke  active_record
create    db/migrate/20191107015736_create_users.rb
create    app/models/user.rb
invoke    rspec
create      spec/models/user_spec.rb
invoke      factory_girl
create        spec/factories/users.rb
invoke  resource_route
  route    resources :users
invoke  scaffold_controller
create    app/controllers/users_controller.rb
invoke    rspec
create      spec/controllers/users_controller_spec.rb
create      spec/routing/users_routing_spec.rb
invoke      rspec
create        spec/requests/users_spec.rb
```
Tiến hành migrate DB và chạy app:
```
rails db:migrate
```

### **VI. Serializing API Output**
Ở view chúng ta thường dùng **jbuilder** để quản lý dữ liệu trả về dưới dạng JSON,
nhưng ở app API ta sẽ dùng **AMS(Active Model Serializers)** để quản lý việc này. AMS cung cấp layer giữa model và controller bằng cách gọi `to_json` hoặc `as_json` cho object/collection ActiveRecord, trong khi vẫn xuất ra định dạng mà API mong muốn.

Add Gemfile:
```
gem "active_model_serializers"
```
Update bundle:
```
bundle
```
Tạo một serializer cho User model:
```
rails g serializer user
```
Nó sẽ tạo ra file:
```ruby
class UserSerializer < ActiveModel::Serializer
  attributes :id
end
```
mặc định sẽ có sẵn attr **:id**, thêm attr nếu muốn hiển thị thêm attributes của object/collection ở API như sau:
```ruby
class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
end
```

Phần này khá dài nên mình chia làm 2 phần, hẹn gặp lại các bạn ở phần sau

Nếu có gì thiếu sót hoặc góp ý thêm, bạn đọc hãy cứ comment để mình có thể hoàn thiện hơn nhé. Peace!