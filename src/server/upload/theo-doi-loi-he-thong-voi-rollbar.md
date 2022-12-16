Theo dõi lỗi hệ thống với rollbar

Rollbar là một dịch vụ theo dõi lỗi cho Ruby và nhiều ngôn ngữ khác (https://rollbar.com/docs/). Dịch vụ Rollbar sẽ gửi thông báo cho bạn khi hệ thống của bạn gặp lỗi, thống kê lỗi phát sinh trong quá trình hoạt động của trang web ... Tôi nghĩ nó rất đơn giản và hữu ích khi bạn áp dụng vào website của mình.

Hoạt động của Rollbar cũng khá đơn giản, mỗi khi hệ thống có lỗi nó sẽ gửi một thông báo (messages) tới Rollbar server. Rollbar server sẽ thu thập các lỗi để thống kê và gửi thông báo đến cho người quản trị trang web biết.

Dưới đây tôi xin hướng dẫn sử dụng `gem 'rollbar'` cho Ruby. Với các ngôn ngữ khác việc sự dụng của tương tự và khá đơn giản

Đầu tiên bạn cần thêm `rollbar` vào Gemfile

```
gem 'rollbar'
```

Tiếp theo đó bạn cần install lại các Gem cho dự án
```
$ bundle install
```

#### RAILS
Với Rails bạn sẽ chạy lệnh sau để Rollbar sinh ra file cấu hình khởi tạo cho Rollbar

```
$ rails generate rollbar
$ export ROLLBAR_ACCESS_TOKEN=ROLLBAR_ACCESS_TOKEN
```

Lệnh này sẽ tạo ra một file ở `config/initializers/rollbar.rb` dùng để khởi tạo cấu hình cho Rollbar

Việc thêm Rollbar vào dự án Rails như vậy là xong rất đơn giản

Để có ROLLBAR_ACCESS_TOKEN bạn cần đăng kí tài khoản [Rollbar](https://rollbar.com). Sau đó bạn có thể theo dõi thống kê các lỗi hoặc cấu hình địa chỉ mail cho phép Rollbar gửi mail mỗi khi có lỗi xảy ra

Theo mặc định Rollbar sẽ tự động gửi message đến Rollbar server mỗi khi gặp lỗi. Tuy nhiên bạn có thể tùy biến việc gửi các message tới Rollbar server với các lệnh sau

```
Rollbar.log(level, ...)
Rollbar.debug()
Rollbar.info()
Rollbar.warning()
Rollbar.error()
Rollbar.critical()
```


Với các framework khác bạn có thể khởi tạo file cấu hình Rollbar một cách thủ công giống như file `config/initializers/rollbar.rb` trong Rails

```
Rollbar.configure do |config|
  config.access_token = 'ROLLBAR_ACCESS_TOKEN'
  # other configuration settings
  # ...
end
```

#### Grape

Sau khi khởi tạo Rollbar. Chúng ta sẽ sửa lại phần xử lý lỗi mỗi khi có lỗi 500 xảy ra , mỗi khi có lỗi ta sẽ gửi thêm một yêu cầu đến Rollbar server thông qua lệnh `Rollbar.error(e)`

``` ruby
rescue_from :all do |e|
  if Rails.env.development?
    raise e
  else
    Rollbar.error(e)
    error_response(message: "Internal server error", status: 500)
  end
end
```

#### Sinatra

Sau khi khởi tạo Rollbar ta cần thêm `Rollbar::Middleware::Sinatra` vào trong app

```
require 'rollbar/middleware/sinatra'

class MyApp < Sinatra::Base
  use Rollbar::Middleware::Sinatra
  # other middleware/etc
  # ...
end
```
Chú ý: khi bạn dùng Sinatra thì có một conflict nhỏ khi dùng `sinatra/namespace` và `Rollbar.configure` bạn có thể theo dõi chi tiết tại đây (https://github.com/sinatra/sinatra-contrib/issues/111 và https://github.com/rollbar/rollbar-gem/issues/663)

Để giải quyết vấn đề này bạn có thể làm như sau:

```
configure do
  Rollbar.configure do |config|
    ...
  end

  # Redefine :namespace to use Sinatra's :namespace method
  self.instance_eval do
    undef :namespace

    define_singleton_method(:namespace) do |*args, &block|
      Sinatra::Delegator.target.send(:namespace, *args, &block)
    end
  end
end
```
Rollbar còn hỗ trợ cho nhiều ngôn ngữ và framework khác nhau. Sử dụng nó cũng rất dễ dàng bạn có thể tham khảo chi tiết tại đây

Tham khảo
1. [rollbar-gem](https://github.com/rollbar/rollbar-gem)
2. [Rollbar](https://rollbar.com/)