- Bài viết được dịch từ bài [Secure your SMTP logs in Rails application](https://jadhavkavita.medium.com/secure-your-smtp-logs-in-rails-application-c50d8fa6838e) của tác giả [Kavita Jadhav](https://jadhavkavita.medium.com).
-----

> Tất cả chúng ta đều biết lợi ích của việc ghi log. Nó cho phép các nhà phát triển nhanh chóng khắc phục sự cố ngay cả trước khi tái hiện nó.
-----
### Vấn đề
- Trong các hệ thống phân tán, log được lưu trữ trong bộ nhớ dùng chung hoặc đôi khi trên chính các máy chủ phân tán. Sau đó, các bản ghi này được tổng hợp trong các công cụ như [Splunk](https://www.splunk.com/), [LogDNA](https://www.logdna.com), [Logstash](https://www.elastic.co/logstash) để làm cho chúng có thể truy cập ở một nơi duy nhất và cho phép người dùng tìm kiếm / đọc log.

- Vì các công cụ này không được quản lý bởi tổ chức của bạn nên bạn có đang đẩy các thông tin nhạy cảm như thông tin cá nhân của khách hàng, chi tiết xác thực, thông tin thanh toán lên các công cụ này không? Câu trả lời rõ ràng là KHÔNG! Vì vậy, các chi tiết này được che trong hầu hết các ứng dụng trước khi tạo log ứng dụng. Nói ngắn gọn thì ở đây vẫn ổn.

Nhưng bây giờ tôi có một câu hỏi nữa. Còn các bản ghi do ứng dụng của bạn tạo ra trong khi gửi email cho người dùng ứng dụng thì sao? Bạn có cần bảo mật những thông tin đó nữa không🤔?

Email của bạn có thể đã đặt lại liên kết mật khẩu, OTP xác thực hoặc biên lai thanh toán có thể bị xâm phạm nếu bạn không bảo mật log tạo email của mình.

Hãy xem ví dụ dưới đây.

Tại đây trong ứng dụng Rails của tôi, tôi sẽ gửi email xác nhận thanh toán cho khách hàng khi khách hàng gia hạn đăng ký. Chúng ta hãy xem xét Mailer và file html template.

Có file `app/mailers/application_mailer.rb` như sau:
```ruby
class ApplicationMailer < ActionMailer::Base
  default from: 'mehtacables@gmail.com'
  layout 'mailer'

  def notify_payment_success(user_id)
    @user = User.find(user_id)
    @subscription = @user.subscription
    mail(to: @user.email, subject: 'We acknowledge your payment')
  end
end
```
Còn đây là file:
```notify_payment_success.html.erb
<p> Dear <%= @user.username %>,

<p> Your payment of INR 1000.00 is successful for account_id: <%= @user.account_id %>
<p> Your revised payment date is <%= @subscription.end_date %>

<p> Warm regards,
<p> Mehta Cable TV
```
Bây giờ, hãy tạo email từ bảng `rails c` với lệnh: `ApplicationMailer.notify_payment_success(1).deliver`

Oa! chúng ta có ngay lập tức một mail mới!
![](https://miro.medium.com/max/700/1*bO-Po7ggd0CwYASnkKedQg.png)
Bây giờ chúng ta cũng hãy xem log.

![Application logs](https://miro.medium.com/max/700/1*SY7RGZDbZ53YISq13jbv-g.png)

Chờ đã! Account_id là thông tin nhạy cảm của khách hàng. Nó đang làm gì trong log😳? Nó cũng được đẩy lên Splunk. Bây giờ sao 🤨?

Đừng hoảng sợ. Điều này có thể được sửa chữa! Tất cả những gì bạn cần để kiểm tra xem email đã được gửi đến người dùng chưa? Bạn có cần nội dung email không? Chúng ta không cần nó trong hầu hết các trường hợp. Vì vậy, chúng ta hãy ngừng thêm nó vào log.

Theo mặc định `ActiveSupport::LogSubscriber` in toàn bộ nội dung email ở chế độ debug. Chúng ta cần **ghi đè** hành vi này. Bây giờ, hãy chỉ ghi ngày, chủ đề, người gửi và người nhận.

Tạo tệp `log_subscriber.rb` trong thư mục `config/initializers` và thêm code bên dưới vào đó.
```ruby
module ActionMailer
  class LogSubscriber < ActiveSupport::LogSubscriber
    def deliver(event)
      info {"Email date : #{DateTime.now}"}
      info {"Email subject : #{event.payload[:subject]}"}
      info {"Email from : #{event.payload[:from]}"}
      info {"Email to : #{event.payload[:to]}"}
    end
  end
end
```
Bây giờ khởi động lại rails console của bạn và tạo một email mới. Hãy xem logs.
![](https://miro.medium.com/max/700/1*MJDjrC0IJKIeoaeNFZNhEw.png)

Chúng ta chỉ thấy thông tin chi tiết cần thiết được ghi trong log 🤗…

Tôi hy vọng điều này sẽ giúp ích cho bạn vào lần tới khi bạn thêm một email mới vào ứng dụng Rails của mình.