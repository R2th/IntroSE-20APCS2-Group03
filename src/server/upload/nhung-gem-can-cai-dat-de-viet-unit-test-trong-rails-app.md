# Đặt vấn đề
Đầu tiên, chúng ta cần hiểu: Tại sao lại cần phải viết unit test?  Unit test có thể làm tăng đáng kể chất lượng dự án của chúng ta, khiến code của bạn chạy một cách chính xác nhất. Trước khi đến tay QA mà unit test đã pass hết các case khi đó lượng bug sẽ giảm một cách đáng kể. 
Đối với những hệ thống phát triển dựa trên dựa trên framework Ruby on rails thì có rất nhiều gem có thể hỗ  trợ việc viết unit test: rspec, capybara,...Sau đây mình xin giới thiệu các gem cần thiết cài đặt để viết unit test cho project rails.
# Các gem cần thiết để viết unit test
## Gem  rspec-rails
Đây là một gem rất mạnh trong ruby on rails nhằm mục đích kiểm thử các chức năng được viết bởi ruby on rails
### Cài đặt
Thêm dòng sau vào Gemfile và chạy lệnh bundle install :
```
group :development, :test do
  gem 'rspec-rails', '~> 3.8'
end
```
Khởi tạo thư mục spec, chạy lệnh sau:
```
rails generate rspec:install
```
## Gem database_cleaner
Gem này dùng để cleaning database giữa mỗi test, tức là sau khi chạy xong một test nó sẽ rollback database lại trạng thái trước khi chạy test, đảm bảo database luôn nhất quán trong suốt quá trình thực hiện tất cả các test case.
### Cài đặt
Thêm dòng sau vào Gemfile và chạy lệnh bundle install:
```
group :test do
  gem 'database_cleaner'
end
```
Trong file rails_helper ta thêm dòng sau:
```
config.use_transactional_fixtures = false
```
Trong thư mục spec, tạo thư mục support, trong đây thêm tạo thêm file database_cleaner.rb và paste thêm đoạn code sau:
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
Như vậy  database_cleaner đã được thiết lập. Và từ đây nó sẽ dọn dẹp database mỗi lần chạy unit test
## Gem faker
Gem này dùng để tạo dữ liệu giả như tên, địa chỉ, số điện thoại,.. một cách ngẫu nhiên để phục vụ cho việc viết test.
### Cài đặt
Thêm dòng sau vào Gemfile sau đó chạy lệnh bundle install:
```
group :test do
  gem 'faker'
end
```
Một vài ví dụ sử dụng faker để tạo dữ liệu test:
```
Faker::Name.name      #=> "Christophe Bartell"

Faker::Internet.email #=> "kirsten.greenholt@corkeryfisher.info"
```
## Gem factory_bot_rails
Cho phép chúng ta tạo ra các object cần thiết cho việc test với các giá trị mặc định, kết hợp cùng với Faker chúng ta có thể tạo ra các object(factory) với gía trị ngẫu nhiên thay vì chỉ sử dụng giá trị mặc định.
### Cài đặt
Thêm dòng sau vào Gemfile và chạy lệnh bundle install:
```
group :development, :test do
  gem 'factory_bot_rails'
end
```
Ví dụ: tạo dữ liệu test cho model User gồm các thuộc tính name, address, email sử dụng factory_bot_rails và faker
```
FactoryBot.define do
  factory :contact do
    name     { Faker::Name.name }
    email         { Faker::Internet.email }
    address       { Faker::Address.street_address }
  end
end
```
## Gem shoulda-matchers
Gem này giúp chúng ta viết test dễ dàng hơn, tiết kiệm được thời gian khi viết các test dài và phức tạp, code ngắn gọn, dễ đọc. Ví dụ khi test các validate hay association.
### Cài đặt
Thêm dòng sau vào Gemfie và chạy lệnh bundle install:
```
group :test, :development do
  gem 'rspec-rails'
  gem 'shoulda-matchers'
end
```
Shoulda Matchers cùng cấp cho ta rất nhiều phương thức dùng để test.
###  Những phương thức dùng để test ActiveModel:
```
allow_value tests
have_secure_password
validate_absence_of
validate_acceptance_of
validate_confirmation_of
validate_exclusion_of
validate_inclusion_of
validate_length_of
validate_numericality_of
validate_presence_of

```
###  Những phương thức dùng để test ActiveRecord:
```
accept_nested_attributes_for
belong_to
define_enum_for
have_and_belong_to_many
have_db_column
have_db_index tests
have_many
have_one
have_readonly_attribute
serialize
validate_uniqueness_of
```
# Tổng kết
Trên đây là các gem cần thiết dùng để có thể viết unit test trong project ruby on rails. Bài viết có tham khảo ở các nguồn sau:
https://github.com/rspec/rspec-rails
https://github.com/thoughtbot/shoulda-matchers
https://github.com/DatabaseCleaner/database_cleaner
https://github.com/thoughtbot/factory_bot_rails
https://github.com/stympy/faker