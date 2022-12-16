# Introduction
Sau khi ứng dụng Web của bạn đã deploy lên production cho người dùng ít hoặc nhiều sẽ có trường hợp nào đó xảy ra lỗi mà chúng ta sẽ không biết được. Như vậy, người phát triển phải có gì đó dùng để biết khi có lỗi xảy ra. Có nhiều library/tool bạn có thể dùng để biết các exception xảy ra. Trong bài này, mình sẽ hướng dẫn sử dụng `gem exception_notification ` .

# Usage
thêm vào Gemfile:
```
gem 'exception_notification'
```
trong demo này, khi có exception mình sẽ gửi vào email, và chatwork. Vậy mình sử dụng gem chatwork:
```
gem 'chatwork'
```
=> `bundle install`

Gem này đã hỗ trợ sắn 7 loại notifier như sau:
1. Campfire notifier
1. Email notifier
1. HipChat notifier
1. IRC notifier
1. Slack notifier
1. Mattermost notifier
1. WebHook notifier

Bạn có thể chọn loại này tùy mình thích. Tuy nhiên bạn cũng có thể tạo `custom notifier` riêng cho ứng dụng web của mình. Ở đây mình sẽ tạo `custom notifier` gửi đến chatwork.

### Email notifier
Thêm config vào trong environment mình muốn theo dõi exception. (development/staging/production ...).

`config/environments/production.rb`
```
config.middleware.use ExceptionNotification::Rack,
  email: {
    :email_prefix => "[PREFIX] ",
    :sender_address => %{"notifier" <notifier@example.com>},
    :exception_recipients => %w{exceptions@example.com}
}
```
Bạn cần phải config thêm email để gửi như bình thường.  

```
  config.action_mailer.default_url_options = { :host => 'localhost:3000' }
  config.action_mailer.perform_deliveries = true
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address:  ENV["MAIL_ADDRESS"],
    port: 587,
    authentication: "plain",
    enable_starttls_auto: true
    user_name: ENV["MAIL_USERNAME"],
    password: ENV["MAIL_PASSWORD"]
  }
```
Khi có bất kỳ exception nào đó, bạn sẽ nhận được email về tất cả thông tin về exception đó.

### custom notifier with chatwork
Mình cũng muốn gửi exception đến chatwork của mình. Vậy chúng ta cần tạo custom notifier như sau:

` notifier class` phải nằm trong namespace `ExceptionNotifier` và thêm đuôi là `Notifier`

 ví dụ: `ExceptionNotifier::SimpleNotifier`
 
 Tạo file `lib/exception_notifier/simple_notifier` :
 
```
 module ExceptionNotifier
  class SimpleNotifier
    def initialize(options)
      # do something with the options...
    end

    def call(exception, options={})
      ChatWork.api_key = "YOUR_API_KEY"
      ChatWork::Message.create(room_id: ROOM_ID, body: exception)
    end
  end
end
```
Bây giờ mình có 1 custom notifier rồi (SimpleNotifier). Chúng ta chỉ cần thêm vào trong middleware `ExceptionNotification::Rack `như sau:

`config/environments/production.rb`
```
config.middleware.use ExceptionNotification::Rack,
  email: {
    :email_prefix => "[PREFIX] ",
    :sender_address => %{"notifier" <notifier@example.com>},
    :exception_recipients => %w{exceptions@example.com}
},
simple: {
    # bạn có thể thêm options ở đây nếu cần
  }
```

Done. :). Khi có exception, bạn sẽ nhận được vào trong email và chatwork.
Trong bài này, mình hướng dẫn cách làm như thế nào. Tuy nhiên, gem này có rất nhiều options nữa bạn có thể tìm hiểu thêm.

https://github.com/smartinez87/exception_notification

https://github.com/asonas/chatwork-ruby

https://viblo.asia/p/su-dung-gem-chatwork-DbmvmVArGAg

https://www.youtube.com/watch?v=Xn5tcR3N_yQ