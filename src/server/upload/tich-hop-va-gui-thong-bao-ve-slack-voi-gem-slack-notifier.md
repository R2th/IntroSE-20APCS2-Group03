## 1. Mở đầu
- Mình có thằng bạn ở dự án khác kể rằng, hắn làm 1 package để tracking khi có lỗi sẽ gửi thông báo về chatwork cho cá nhân hoặc 1 box chung nào đó => đỡ mất công truy cập vào server rồi xem log => đỡ tốn thời gian và bảo mật hơn server hơn. Ồ, hay đấy bạn êi. Đương nhiên mình nghĩ chỉ nên dùng trên môi trường development, staging thôi nhé, chứ product thì phải xem xét =))
- Cơ mà dự án lại dùng slack thì sao nhỉ ? Vậy trong bài nãy mình sẽ hướng dẫn cơ bản cách tích hợp và sử dụng **gem slack-notifier** để bắn thông báo về slack nhé.

![](https://images.viblo.asia/e75ff594-974b-43c9-8b0c-717a3d3d511d.jpeg)

## 2. Setup
### 2.1 Tạo webhook
- Đăng nhập [slack](https://slack.com/create#email)  
- https://slack.com/create#email
- Tạo webhook (Incoming webhook) ở [đây nè ](https://rubyinrails.slack.com/services/new/incoming-webhook).
 ![](https://images.viblo.asia/60381cb7-e27d-4c22-a71b-1ccbbfc25220.png)
### 2.2 Chọn channel
- Ngay sau khi chọn hook, form select channel sẽ được hiển thị.
- Ở đây bạn muốn notify gửi vào đâu thì chọn channel đó nhé
![](https://images.viblo.asia/092dd194-e008-40c1-99f5-22d9374975cc.png)
- Chọn rồi submit thoai (ví dụ mình chọn #general)
![](https://images.viblo.asia/9d5625e2-45ea-46cd-a986-2f978c4ab204.png)
### 2.3 Webhook URL 
- Sau khi submit form thành công, hệ thống sẽ trả về cho bạn 1 URL. Đó chính là webhook URL để ta sử dụng kết nối đến slack.
- URL có dạng như sau
```
https://hooks.slack.com/services/XXXXXXX/YYYYYYY/ZZZZZZZZZZZZZZZZ
```
- Note: x, y, z là các ký tự ngẫu nhiên.
### 2.4 Setup Rails
- Nếu bạn chưa có project Rails app nào thì hãy tạo nhé, rồi cài đặt gem như sau
```bash:slack-notifier
gem install slack-notifier
```

- Bạn có thể thử gem bằng code như sau.
```ruby:slack-notifier-notification.rb
require "slack-notifier"
notifier = Slack::Notifier.new "https://hooks.slack.com/services/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"
notifier.ping "Hello World from #{Rails.application.class.parent_name}"
```
- Bạn sẽ nhìn thấy dòng chữ "Hello World from AppName" trên box chat slack của mình ngay sau đó
#### Bạn có thể config  gửi thông báo bằng tên khác như sau
```ruby:slack-notification-by-user.rb
require "slack-notifier"
notifier = Slack::Notifier.new "https://hooks.slack.com/services/XXXXX/YYYYY/ZZZZZ"
notifier.username = "letung"
notifier.ping "Hello World from #{Rails.application.class.parent_name}"
```
#### Gửi vào 1 channel nào đó :
```ruby:slack-notification-to-a-channel.rb
require "slack-notifier"
notifier = Slack::Notifier.new "https://hooks.slack.com/services/XXXXX/YYYYY/ZZZZZ"
notifier.channel = "#report"
notifier.ping "Hello World from #{Rails.application.class.parent_name}"
```
#### Thêm link vào message
```ruby:links-in-slack-notification.rb
require "slack-notifier"
notifier = Slack::Notifier.new "https://hooks.slack.com/services/XXXXX/YYYYY/ZZZZZ"

# sending links in message
notifier.ping "<a href='https://viblo.asia'>Viblo</a> has some errors"
```
### 2.5 Format message
- Để message trở nên dễ nhìn hơn thì chúng ta cần format cho nó đẹp như là in hoa, gạch chữ, liệt kê theo danh sách, ...
- Mình đưa ra một số ví dụ nhé:
```ruby:format_message.rb
require "slack-notifier"
notifier = Slack::Notifier.new "https://hooks.slack.com/services/XXXXX/YYYYY/ZZZZZ"

# in hoa
notifier.ping "bold text: *in hoa nè*"

# kiểu danh sách liệt kê
notifier.ping "Here is the list below
- undefined some variables
- undefined some method
- code như *beep
- ...
"

#Blockquotes
notifier.ping "> Leader said OTTTTTTTTTT
What is your opinion?
"

#Code Blocks
notifier.ping "Some `formatted code` displayed"
notifier.ping "Some ```
multiline formatted code
Another line```
was just displayed"
```
## 3. Gửi thông báo khi có exception về slack
- Cài đặt gem
```bash:GemFile
gem "exception_notification"
```
```bash:install_gem
bundle install
```

- Ở đây mình sẽ config gửi về channel **#exceptions** nhé
- Config cơ bản sẽ như sau:
```ruby:development.rb/staging.rb(production.rb)
Rails.application.config.middleware.use ExceptionNotification::Rack,
  email: {
    email_prefix: "[PREFIX] ",
    sender_address: %{"notifier" <notifier@example.com>},
    exception_recipients: %w{exceptions@example.com}
  },
  slack: {
    webhook_url: "https://hooks.slack.com/services/XXXXX/YYYYY/ZZZZZ", #  webhook URL
    channel: "#exceptions",
    additional_parameters: {
      icon_url: "https://image.jpg",
      mrkdwn: true
    }
  }
```

- Oke ngon rồi, giờ bạn có thể thử tạo 1 lỗi và check message ở slack nhé.
- Ngoài ra bạn có thể tham khảo thêm về cách tích hợp API ở đây:
- Slack API - https://api.slack.com
- Slack - [Incoming WebHooks](https://api.slack.com/incoming-webhooks)