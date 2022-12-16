Sau khi triển khai ứng dụng lên production, mặc dù đã code và test rất kĩ nhưng không thể tránh khỏi phát sinh những lỗi ngoài ý muốn. Để team có thể biết và xử lý kịp thời, tránh để lỗi trở nên nghiêm trọng hơn thì sử dụng **exception notification** là điều hết sức cần thiết. Trong bài viết này mình sẽ hướng dẫn sử dụng gem **exception_notification** để gửi thông báo đến ứng dụng google chat (một nền tảng team chat rất bảo mật của google).

# Giới thiệu về Google Chat
### Một nền tảng nhắn tin được xây dựng cho các nhóm
Hangouts Chat giúp các nhóm có thể dễ dàng hoàn tất công việc của mình ở một nơi. Từ tin nhắn trực tiếp cho đến các cuộc trò chuyện nhóm, ứng dụng Chat giúp các nhóm cộng tác dễ dàng và hiệu quả. Với các phòng ảo chuyên biệt để lưu trữ dự án theo thời gian — cộng thêm các cuộc trò chuyện theo chuỗi — ứng dụng Chat giúp bạn dễ dàng theo dõi tiến độ và việc cần làm tiếp theo. Ứng dụng này hiện hỗ trợ 28 ngôn ngữ và mỗi phòng có thể hỗ trợ tối đa 8.000 thành viên.

### Được tích hợp sâu với G Suite.
Khách hàng của G Suite có thể sử dụng Hangouts Chat mà không mất thêm phí. Tải các mục lên từ Drive, cộng tác trên Tài liệu, Trang tính hoặc Trang trình bày, tham gia các cuộc họp trực tuyến qua Hangouts Meet hay sử dụng tính năng tìm kiếm mạnh mẽ của Google để tìm các thành viên trong phòng, các cuộc trò chuyện trước đây và các tệp được chia sẻ. Bot Drive sẽ thông báo cho bạn mỗi khi có tệp được chia sẻ với bạn, có nhận xét hoặc có người yêu cầu quyền truy cập vào tài liệu của bạn. Ngoài ra, bot Meet còn tích hợp trực tiếp với Lịch để lên lịch họp cho bạn.

### Yên tâm nhờ tính năng bảo mật được nhúng sẵn
Chat được xây dựng dựa trên hệ sinh thái security-first của G&nbspSuite và mang đến một giải pháp cấp doanh nghiệp vừa đáng tin cậy, lại vừa đảm bảo tính tuân thủ. Với tính năng hỗ trợ tích hợp sẵn dành cho Vault, quản trị viên có thể lưu trữ, bảo vệ, tìm kiếm và xuất dữ liệu dành riêng cho ứng dụng Chat. Ứng dụng này cũng có khả năng bảo mật cấp doanh nghiệp hàng đầu bao gồm tính năng quản lý thiết bị di động, đăng nhập một lần, xác thực hai yếu tố, cài đặt quản trị viên, tuân thủ và lưu giữ, yêu cầu lưu giữ dữ liệu, tìm kiếm và xuất dữ liệu trong Vault.

# Tạo Room Test
Sau khi tạo một room ta chọn Configure webhooks
![](https://images.viblo.asia/415b59de-17f3-4576-bfd5-cc1485171a70.png)

![](https://images.viblo.asia/bae86aeb-1f72-4f47-8efc-5623ecbf364b.png)

Sau khi save ta sẽ nhận được một webhooks url có dạng: 
``` 
https://chat.googleapis.com/v1/spaces/AAAA_FOiHF0/messages?key=XXXXXXXX&token=XXXXXXX
```

# Tạo exception notification cho rails app
thêm vào Gemfile:
```
gem 'exception_notification'
```
=> bundle install
Tạo một custom notifier: lib/exception_notifier/google_notifier :
```ruby
module ExceptionNotifier
  class GoogleNotifier
    require "net/http"
    def initialize(options)
      @webhook_url = <webhook_url>
      @mention_id = <mention_id>
    end

    def call(exception, options={})
      mention_tag = "<users/#{@mention_id}>\n"
      messages = mention_tag + exception.to_s
      url = URI.parse(@webhook_url)
      request = Net::HTTP::Post.new(url.to_s)
      request["Content-Type"] = "application/json; charset=UTF-8"
      request.body = {text: messages}.to_json
      Net::HTTP.start(url.host, url.port, use_ssl: true){|http| http.request(request)}
    end
  end
end
```

Eager load folder lib:
```ruby
#config/application.rb

config.eager_load_paths << Rails.root.join("lib")
```

Thêm middleware ExceptionNotification::Rack như sau:
```ruby
#config/environments/production.rb

config.middleware.use ExceptionNotification::Rack, google: {}
```

Mention id có thể lấy bằng cách inspect tên của người muốn mention (ở đây mention_id là 106701036335806411890):
![](https://images.viblo.asia/1ae8450e-12be-41ee-881b-de7755ae7fb8.png)

Thành quả:
![](https://images.viblo.asia/279a391c-4b0a-4ebd-a1b8-00a15ccc6494.png)

Các bạn có thể tìm hiểu thêm vê gem **exception_notification** tại đây: https://github.com/smartinez87/exception_notification

Cảm ơn các bạn đã theo dõi :innocent: