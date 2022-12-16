Chào các bạn, hôm nay mình xin giới thiệu với các bạn cách gửi tin nhắn qua Slack từ ứng dụng Rails.

Slack là một ứng dụng "phòng chat" nổi tiếng, thường được sử dụng cho những người trong nội bộ công ty. Mỗi phòng chat có thể tạo ra các kênh chat khác nhau để phục vụ cho những mục đích công việc khác nhau.

Giả sử, bạn đang xây dựng một ứng dụng Rails app, trong đó có 1 tác vụ chạy ngầm gì đó yêu cầu gửi kết quả vào 1 channel Slack để thông báo cho người quản trị biết.

Để thực hiện yêu cầu trên, trong bài viết của mình sẽ giới thiệu cho các bạn sử dụng **gem "slack-notifier"**.

### Cài đặt

Quá đơn giản là add gem này vào Gemfile

```
# Gemfile
gem "slack-notifier"
```

và run `bundle install`

### Cấu hình

Để tạo một đối tượng kết nối tới Webhook Slack, chỉ cần khai báo:

```
notifier = Slack::Notifier.new "WEBHOOK_URL"
```

Webhook URL này lấy đâu ra? Giả sử bạn đang quản lý 1 workspace trên Slack:

1. Truy cập vào https://slack.com/apps/A0F7XDUAZ-incoming-webhooks

![](https://images.viblo.asia/d496106b-4534-4554-83cf-d2d9a000cc03.png)

2. Nhấn vào **Add Configuration** 

![](https://images.viblo.asia/3b9e199a-4808-463d-848d-add1c8cb7f51.png)

3. Chọn channel, và nhấn **Add Incoming WebHooks integration** 

![](https://images.viblo.asia/6876206b-d64a-4110-96b2-7c53eef3a672.png)

Vậy là các bạn đã lấy được Webhook URL của channel.

### Thử hàng

Xong bây giờ hãy mở console lên và test nào:

```
notifier = Slack::Notifier.new "your_url"
notifier.ping "Hello World"
```

Kết quả, ở channel General bạn sẽ thấy một message 

![](https://images.viblo.asia/9be9f78a-d672-41b7-b1dd-b06c6186d7ab.png)

Tham khảo một số format của message mà bạn có thể gửi lên, các bạn có thể xem [tại đây](https://api.slack.com/docs/message-formatting)

Không chỉ đơn thuần là gửi message, bạn có thể gửi một đống params lên để có được 1 format tin nhắn ưng ý, ví dụ như màu sắc, icon, tên người gửi, thậm chí là avatar người gửi, ...

Để truyền được đống params đó, bạn phải sử dụng method **post**

Ví dụ, mình sẽ gửi một message dưới tên là Boss, và có avatar cho Boss luôn nhé:

```
notifier.post text: "Hello World", username: "Boss", icon_url: "http://static.mailchimp.com/web/favicon.png"
```

![](https://images.viblo.asia/eca23a22-7c93-45b4-b4a8-6814a207806c.png)

Còn rất nhiều parameters các bạn có thể tham khảo [tại đây](https://api.slack.com/incoming-webhooks)

Qua bài viết mình đã giới thiệu với các bạn cách gửi tin nhắn qua Slack trong ứng dụng Rails bằng cách sử dụng **gem "slack-notifier"**

Cảm ơn các bạn đã theo dõi!