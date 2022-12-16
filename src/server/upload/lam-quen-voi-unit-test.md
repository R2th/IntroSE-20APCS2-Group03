## Unit Test là gì?
Là một loại kiểm thử phần mềm sẽ kiểm tra những thành phần nhỏ nhất trong dự án như Function, Procedure, Class hoặc các Method...Việc viết Unit test trước khi bàn giao cho QA nhằm hạn chế bug xảy ra, do thực hiện test trên từng đơn vị của các module riêng rẽ nên khi phát hiện lỗi cũng dễ dàng khoanh vùng và sửa chữa hơn. <br>

Rails có rất nhiều gem support việc viết Unit Test, ở bài viết này mình cũng sẽ giới thiệu 1 số gem cần thiết để viết và quản lý test một cách dễ dàng, hiệu quả.
## Gems
### 1.   [rspec-rails](https://github.com/rspec/rspec-rails)
Là 1 mở rộng của RSpec, là một gem cần thiết để viết Unit Test, nó mang [RSpec](https://rspec.info/) testing framework vào ứng dụng của bạn, cho phép bạn viết unit tests cho Model, Controller, Views và Helpers.
```
group :test do
  gem "rspec-rails"
end
```
Nó sẽ cài đặt những gems sau: **rspec**, **rspec-core**, **rspec-expectations**, **rspec-mocks** và **rspec-rails**. Các bạn có thể đọc thêm Doc của chúng ở đây https://rspec.info/documentation/

Khởi tạo thư mục `spec/`:
```
rails generate rspec:install
```

### 2. [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers)
Giúp cho bạn có thể viết Unit Test 1 cách ngắn gon, rõ ràng và nhanh hơn ít gặp lỗi hơn so với viết tay.
```
group :test do
  gem "rspec-rails"
  gem "shoulda-matchers"
end
```
Ở `spec/rails_helper.rb`
```
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
```

**Shoulda Matchers** cung cấp nhiều phương thức dùng để test với **ActiveModel, ActiveRecord, ActionController, Independent Matchers**
EX:
```
  describe "associations" do
    it { should have_many :posts }
  end
  
  describe "validations" do
    it { should validate_presence_of(:name) }
  end
```

### 3. [database_cleaner](https://github.com/DatabaseCleaner/database_cleaner)
Dùng để dọn dẹp database test, bảo đảm trạng thái clean trong quá trình test. Có thể chạy trước hoặc sau mỗi case test.
```
group :test do
  gem "rspec-rails"
  gem "shoulda-matchers"
  gem "database_cleaner"
end
```
Chạy `bundle install`. Sau đó ở `spec/rails_helper.rb`
```
RSpec.configure do |config|

  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, :js => true) do
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end
```
### 4.  [Faker](https://github.com/faker-ruby/faker)
Dùng để tạo dữ liệu giả ngẫu nhiên, vd: tên, avartar, địa chỉ, email, barcode,...
```
group :development, :test do
  gem "faker"
end
```
**VD: **
```
Faker::Name.name      #=> "Christophe Bartell"

Faker::Internet.email #=> "kirsten.greenholt@corkeryfisher.info"
```

### 5. [factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails)
Dùng để tại data khi test 
```
group :development, :test do
  gem "faker"
  gem "factory_bot_rails"
end
```
Giả sử ta có **Model User** gồm columns **name, role, address** trong đó có `enum role: {admin: 0, pic: 1}` <br>
Ở spec/factories/user.rb.
```
FactoryBot.define do
  factory :user do
    name     { Faker::Name.name }
    role         { "admin" }
    address       { Faker::Address.street_address }
    
    factory :user_pic do
      role { "pic" }
    end
  end
end
```

Như vậy khi viết Unit Test ta có thể gọi ntn để tạo admin tương ứng với role mà mình muốn:
```
let(:admin) { create :admin }
let(:admin_pic) { create :admin_pic}
```

### 6.[simplecov](https://github.com/simplecov-ruby/simplecov)
Dùng để thống kê phần trăm coverage code Unit Test, mức độ hòan thiện test của từng file, phân biệt đoạn code nào đã test và đoạn code nào chưa viết test.
```
group :test do
  ...
  gem "simplecov"
  gem "simplecov-rcov" // style formatter for the ruby 1.9+ coverage gem: SimpleCov.
  gem "simplecov-json" // JSON formatter for the ruby 1.9+ code coverage gem SimpleCov
end
```
Tiếp theo thêm vào `spec/spec_helper.rb`
```
require "simplecov"
require "simplecov-json"
require "simplecov-rcov"

SimpleCov.formatters = [
  SimpleCov::Formatter::HTMLFormatter,
  SimpleCov::Formatter::JSONFormatter,
  SimpleCov::Formatter::RcovFormatter
]
SimpleCov.start do
  coverage_dir "tmp/coverage"
end
```

Sau khi chạy Unit Test, chọn mở `coverage/index.html` bẳng trình duyệt bạn sẽ thấy một file mẫu như thế này, nó hiển thị đầy đủ thông tin covarage Unit Test của bạn.
https://cloud.githubusercontent.com/assets/137793/17071162/db6f253e-502d-11e6-9d84-e40c3d75f333.png
https://cloud.githubusercontent.com/assets/137793/17071163/db6f9f0a-502d-11e6-816c-edb2c66fad8d.png

### Kết Luận
Trên đây là những gem mình hay sử dụng để viết Unit Test sẽ còn thiếu sót rất nhiều nhưng cơ bản sẽ giúp bạn có thể viết làm quen được với Unit Test dễ dàng hơn. Và tùy vào mục đích và như cầu của bạn cũng còn rất nhiều gem khác có thể hỗ trợ thêm và tốt hơn nữa như:
```
//
gem "capybara"
gem "selenium-webdriver"
gem "webdrivers"

gem "rails-controller-testing"
gem "action-cable-testing"
gem "rspec-collection_matchers"
...
```