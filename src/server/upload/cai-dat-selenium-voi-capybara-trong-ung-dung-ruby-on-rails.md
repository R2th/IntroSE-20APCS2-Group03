> Bài viết gốc: https://hackernoon.com/how-to-integrate-selenium-with-capybara-iq2n30dg

Đôi khi bạn muốn biết các test case `capybara` của bạn tương tác với trang của bạn như thế nào, đôi khi việc xem log trên console để tìm hiểu tại sao các test case không hoạt động là không đủ, đó là lý do tại sao bạn muốn làm cho nó hiển thị các bước trên trình duyệt trong thời gian thực. Bạn có thể thực hiện việc này thực sự dễ dàng với việc sử dụng Selenium, nó cung cấp cho chúng ta các chức năng cần thiết để tương tác với giao diện của tất cả các trình duyệt  phổ biến.

Hãy bắt đầu bằng cách xem những gì chúng ta sẽ sử dụng trong bài viết này, bạn có thể sử dụng các phiển bản của riêng mình nhưng sẽ tốt hơn nếu chúng là:

```
$ lsb_release -a
Ubuntu 18.04.4 LTS
$ rails -v
Rails 6.0.3.1
$ ruby --version
ruby 2.6.5p114 (2019–10–01 revision 67812) [x86_64-linux]
```

Ok, giờ chúng ta có thể bắt đầu tạo dự án mới:

```
$ rails new myApp -T
```

chúng ta sử dụng cờ -T để không khởi tạo dự án cùng các file test bởi vì chúng ta sẽ tạo các file này theo cách thủ công. Sau khi lệnh chạy xong, chúng ta cần vào trong folder của dự án:

```
$ cd myApp
```

Tôi luôn kiểm tra xem server có thể chạy hay không để đảm bảo mọi thứ hoạt động chính xác, nếu có lỗi nào hiện nên trên console thì cũng có thể biết được.

```
$ rails s
```

Nếu mọi thứ đều ổn, chúng ta có thể tiếp tục.

Để tuân theo TDD,  đầu tiên, chúng ta cần tạo các test case với RSpec và Capybara, vì thế hãy bắt đầu bằng việc thêm các Gem cần thiết trong nhóm development và test trong Gemfile:

```ruby
group :development, :test do
  .
  .
  .
  gem 'rspec-rails', '~> 4.0', '>= 4.0.1'
  gem 'capybara', '~> 3.32', '>= 3.32.2'
  gem 'selenium-chúng tabdriver', '~> 3.142', '>= 3.142.7'
end
```

Chú ý, 3 dấu dấu chấm ở trên là để biểu thị các gem đã có sẵn trong dự án của bạn.
Giờ chúng ta có thể cài đặt các gem trên (bạn có thể sử dụng lệnh `bundle install` cũng được, hai lệnh này giống nhau):

```
$ bundle
```

Nếu mọi thứ đã cài đặt thành công, chúng ta cần cài đặt, và thiết lập cho các gem trên, Để cài đặt RSpec, chúng ta chỉ cần chạy lệnh sau:

```
rails g rspec:install
```

 Người bạn gặm nhấm nhỏ bé của chúng ta, Capybara sẽ cần nhiều công sức hơn một chút. Đầu tiên, chúng ta cần đặt đoạn mã sau vào dòng đầu tiên của file `/spec/rspec_helper.rb`:

```rb
require 'capybara/rspec'
```

 Trong file `/spec/rails_helper.rb`:

```rb
Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.javascript_driver = :selenium_chrome
```

chúng ta cũng cần đổi tham số `use_transactional_fixtures` thành `false`:

```rb
config.use_transactional_fixtures = false
```

Đây là đoạn code cho thấy file `rails_helper.rb` sẽ trông như thế nào sau tất cả các thay đổi, và xoá đi các bình luận:

```rb
require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)
abort('The Rails environment is running in production mode!') if Rails.env.production?
require 'rspec/rails'
require './spec/support/factory_bot'

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
    puts e.to_s.strip
    exit 1
end

Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.javascript_driver = :selenium_chrome

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
```

Ngoài ra, chúng ta cũng cần phải cài đặt chromium chrome driver, Nếu bạn vẫn chưa cài đặt nó. Với Ubuntu, bạn chỉ cần chạy lệnh sau:

```
sudo apt-get update
sudo apt-get install chromium-chromedriver
```

Nếu bạn sử dụng hệ điều hành khác, bạn có thể truy cập vào trang chủ của chromedriver và thực hiện theo hướng dẫn https://chromedriver.chromium.org/downloads.

Được rồi, vì chúng ta đã làm khá nhiều việc mà thậm chí chưa viết một test case nào, cuối cùng chúng ta có thể viết nó. Chúng ta cần tạo một folder tên là `features` bên trong thư mục `/spec`, và bên trong nó, chúng ta tạo file `posts_spec.rb` bao gồm test case của chúng ta.

`/spec/features/posts_spec.rb`:
```rb
require 'rails_helper'
RSpec.describe Post, driver: :selenium_chrome, js: true do
describe 'the create posts process' do
    it 'should create a post' do
      visit new_post_path
    
      fill_in 'Title', with: 'Post title'
      fill_in 'Content', with: 'Post content'
    
      click_button 'Create Post'
      expect(page).to have_content 'Post was successfully created.'
    end
  end
end
```

Dòng đầu tiên yêu cầu file `rails_helper` và nạp các đoạn code trong nó, sau đó, như được mô tả trong tài liệu của RSpec, ta sử dụng `RSpec.describe` để gói gọn các đoạn code của bạn theo test case, điều quan trọng là chỉ ra việc sử dụng driver cụ thể nào, trong trường hợp này, là `:selenium_chrome` driver. Ngoài ra, chúng ta cần cho phép sử dụng JavaScript với `js: true` bởi vì đôi khi selenium gặp vấn đề nếu không có nó.

Và test case của chúng ta đã hoàn thành!

![](https://images.viblo.asia/bb695b8d-da46-4289-ac29-19681a118e61.gif)


Tuy nhiên, nó sẽ thất bại, như mong đợi.

![](https://images.viblo.asia/519b8bbc-55ee-44d4-8851-a76f137d3ce6.gif)


Bởi vì chúng ta vẫn chưa triển khai tính năng này trong dự án của chúng ta. Nhưng đừng lo lắng, chúng ta sẽ làm nó ngay bây giờ.
Để có thể đạt được mục tiêu của chúng ta một cách trực tiếp, tôi sẽ bỏ qua các cấu trúc cần thiết thường thấy, ví dụ như là liên quan đến post thì sẽ là một user. Trong ứng dụng của chúng ta, một post sẽ được tạo ẩn danh, nghĩa là, nó không thuộc sở hữu của user nào cả.
Và để tiết kiệm thời gian, tôi sẽ sử dụng `scaffold` để tạo một module CRUD đơn giản, chỉ việc sử dụng câu lệnh sau: 

```
$ rails g scaffold Post title content:text
```

Sau đó chạy migrate database:

```
$ rails db:migrate
```

Hiện giờ, chúng ta có thể truy cập vào đường dẫn `localhost:3000/posts` trên trình duyệt, là nơi liệt kê tất cả các post được tạo trong ứng dụng của tôi.
chúng ta vẫn chưa có post nào được tạo, nhưng chúng ta có thể tiến hành tạo một cái với `capybara test`, chỉ cần chạy lệnh sau:

```
$ rspec spec/features/posts_spec.rb
```

Trình duyệt của bạn sẽ tự động mở và điền vào form.

![](https://images.viblo.asia/ba3f998c-7be2-4d78-974e-fd9d7d3724df.gif)

Bây giờ chúng ta có thể ăn mừng vì test case đã thành công!

![](https://images.viblo.asia/424b7b91-7c25-47df-8746-66e2c2cf2b47.gif)

Một chú ý cuối cùng: đảm bảo điều này hoạt động chỉ với ứng dụng ruby on rails của bạn, nếu không thì, không phải `Capybara` đang chạy trên trang web của bạn :))
Và đó là tất cả cho bài viết này. Tôi hy vọng nó sẽ hữu ích cho bạn.