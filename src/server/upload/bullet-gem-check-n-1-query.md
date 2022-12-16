# 1. Giới thiệu
## N + 1 Query là gì?
Giả sử chúng ta có 2 model quan hệ `cha-con`, chúng ta cần truy vấn database để load dữ liệu của model `con` thông qua model `cha`. Việc truy vấn này sẽ tìm tới bản ghi `cha` rồi thực hiện từng truy vấn đối với các bản ghi `con`.

Ví dụ: Ta có 2 model `Country` và `City` quan hệ với nhau như sau
```
class Country < ApplicationRecord
  has_many :cities, dependent: :destroy
end
```
```
class City < ApplicationRecord
  belongs_to :country
end
```

Khi ta truy vấn:
```
Country.all.each do |country|
  country.cities
end
```
Thì nó sẽ chạy 1 câu lệnh:  ``` SELECT `countries`.* FROM `countries` ```

Và N câu lệnh:

``` SELECT `cities`.* FROM `cities` WHERE `cities`.`country_id` = 12 ```

``` SELECT `cities`.* FROM `cities` WHERE `cities`.`country_id` = 13 ```

...

``` SELECT `cities`.* FROM `cities` WHERE `cities`.`country_id` = N ```

![](https://images.viblo.asia/795a4965-4022-4833-9aed-93d0f83f1e33.png)

Điều này dẫn đến sẽ thực hiện N+1 truy vấn vào database làm giảm tốc độ load dữ liệu, và có thể làm tràn bộ nhớ. 

Trong bài viết này mình chỉ giới thiệu về cách phát hiện N+1 một cách tự động. Đó là  sử dụng `gem bullet` để đưa ra các cảnh báo đối với query N+1 từ đó dễ dàng phát hiện và fix chúng.

# 2. Gem bullet
## 2.1 Install 
Thêm dòng sau vào Gemfile `gem "bullet", group: "development"`

Sau đó gõ trong console `bundle install`

## 2.2 Configuration
Thêm các config sau vào `config/environments/development.rb`

Lưu ý: Bạn có thể loại bỏ các option không cần thiết
```
config.after_initialize do
  Bullet.enable = true
  Bullet.alert = true
  Bullet.bullet_logger = true
  Bullet.console = true
  Bullet.growl = true
  Bullet.xmpp = { :account  => 'bullets_account@jabber.org',
                  :password => 'bullets_password_for_jabber',
                  :receiver => 'your_account@jabber.org',
                  :show_online_status => true }
  Bullet.rails_logger = true
  Bullet.honeybadger = true
  Bullet.bugsnag = true
  Bullet.airbrake = true
  Bullet.rollbar = true
  Bullet.add_footer = true
  Bullet.stacktrace_includes = [ 'your_gem', 'your_middleware' ]
  Bullet.stacktrace_excludes = [ 'their_gem', 'their_middleware' ]
  Bullet.slack = { webhook_url: 'http://some.slack.url', foo: 'bar' }
end
```

Ý nghĩa các option
Những dòng code dưới đây sẽ enable tất cả 7 các thông báo của Bullet

* `Bullet.enable`: Enable/Disable Bullet gem, nếu bằng false bullet sẽ không làm gì cả.
* `Bullet.alert`: Popup ra JavaScript alert trên trình duyệt.
* `Bullet.bullet_logger`: Lưu lại log của Bullet ra file (Rails.root/log/bullet.log)
* `Bullet.rails_logger`: Thêm các warnings trực tiếp vào rails console log
* `Bullet.honybadger`: Thêm notifications vào Honeybatger
* `Bullet.bugsnag`: Thêm notifications vào bugsnag
* `Bullet.airbrake`: Thêm notifications vào airbrake
* `Bullet.rollbar`: Thêm notifications vào rollbar
* `Bullet.console`: Đưa ra warnings vào console của trình duyệt
* `Bullet.growl`: Popup Growl warnings nếu hệ thống.
* `Bullet.xmpp`: gửi XMPP/Jabber notifications tới người nhận. Chú ý rằng code mặc định sẽ không handle các contracts đã được thêm , bởi vậy bạn cần phải làm cả 2 accounts được xác nhận trước khi bạn nhận bất kì thông báo nào. Nếu bạn set cho show_online_status: false thì bạn vẫn nhận được thông báo nhưng Bullet account sẽ không hiện online status nữa.
* `Bulelt.raise` raise error nếu bạn không tối ưu hóa thì sẽ dễ làm cho hệ thống sai về specs
* `Bullet.add_footer`: thêm thông tim chi tiết vào phía trái bên dưới góc của page
* `Bullet.stacktrace_includes`: thêm đường dẫn với substrings vào stack trace, thậm chí nếu chúng không ở main app
* `Bullet.stacktrace_excludes`: bỏ qua đường dẫn với substrings vào stack trace, thậm chí nếu chúng không ở main app
* `Bullet.slack`: thêm notifications vào slack

Thông thường mình chỉ dùng các option sau:
```
config.after_initialize do
    Bullet.enable = true
    Bullet.alert = true
    Bullet.bullet_logger = true
    Bullet.console = true
    Bullet.rails_logger = true
    Bullet.add_footer = true
end
```

Bullet cũng cho phép bạn disable các chức năng detectors
```
# Each of these settings defaults to true

# Detect N+1 queries
Bullet.n_plus_one_query_enable     = false

# Detect eager-loaded associations which are not used
Bullet.unused_eager_loading_enable = false

# Detect unnecessary COUNT queries which could be avoided
# with a counter_cache
Bullet.counter_cache_enable        = false
```

## 2.3 Whitelist
* Nhưng thỉnh thoảng Bullet có thể thông báo cho bạn về vấn đề queries cái mà bạn không quan tâm fix, hoặc những cái đến từ ngoài code của bạn. Bạn có thể thêm vào whitelist để bỏ qua nó:
* Ví dụ:
    ```
    Bullet.add_whitelist :type => :n_plus_one_query, :class_name => "Post", :association => :comments
    Bullet.add_whitelist :type => :unused_eager_loading, :class_name => "Post", :association => :comments
    Bullet.add_whitelist :type => :counter_cache, :class_name => "Country", :association => :cities
    ```

* Nếu bạn muốn bỏ qua bullet trong các controllers thì bạn có thể làm như thế này:
    ```
    class ApplicationController < ActionController::Base
      around_action :skip_bullet

      def skip_bullet
        Bullet.enable = false
        yield
      ensure
        Bullet.enable = true
      end
    end
    ```
    
# 3. Kết luận
Trong bài viết này mình chỉ giới thiệu về  N+1 cũng là gem hỗ trợ để phát hiện N+1 
Bài viết sau mình sẽ demo kết quả sau khi dùng bullet cũng như là hướng dẫn cách fix N+1

# 4. Tài liệu tham khảo
https://github.com/flyerhzm/bullet