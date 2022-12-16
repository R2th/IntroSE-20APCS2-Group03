Khi mình được leader giao cho task "Config mailer". Ban đầu chỉ nghĩ đơn giản là config môi trường, [cấu hình Action Mailer](https://viblo.asia/p/action-mailer-trong-rails-L4x5xQYmKBM) như những gì mà Rails Tutorial đã làm. Nhưng thực tế thì có rất nhiều cách để có thể gửi được email tới người dùng, tùy thuộc vào quy mô và tầm quan trọng của của việc gửi mail trong ứng dụng.

  Action Mailer là thứ căn bản nhất bạn cần hiểu rõ để có thể nắm được các bước khi gửi mail. Ngoài ra có một vài dịch vụ giúp cho việc gửi mail thuận tiện và hiệu quả hơn như SendGrid’s Web API hoặc SMTP Relay, hay là Mandrill, Active Jobs and Delayed Job, Mailgun through Mailgun’s APIs, Mailgun through SMTP ... Nói chung là có rất nhiều các dịch vụ hỗ trợ gửi mail. Sendgrid chỉ là 1 trong số các cách đó, sau đây mình xin được tóm tắt lại quá trình mà mình đã tìm hiểu và áp dụng Sendgrid vào trong dự án của mình.
# Sendgrid là gì?
Thông thường, chúng ta sử dụng luôn thông tin SMTP của Hosting để gửi mail notification. Tuy nhiên, do IP Hosting dùng chung với hàng trăm website khác nên khả năng rất cao bị blacklist, gửi mail bị chuyển vào Spam. Thậm chí tồi tệ hơn, một số nhà cung cấp còn chặn gửi mail để bảo vệ server, nếu không để ý bạn sẽ không thể biết được thông tin này.

SMTP Server (server dùng để gửi mail) là một dịch vụ cho phép gửi email với số lượng lớn, vào chuẩn Inbox luôn mà không lạc vào Spam, tốc độ nhanh mà không bị giới hạn như các hòm mail miễn phí của Gmail hoặc mail đi kèm hosting.

SendGrid là 1 trong những dịch vụ nổi tiếng trong việc cung cấp email giao dịch (transaction email). Sendgrid cung cấp giải pháp email dựa trên nền tảng đám mây thay thế cho hệ thống email truyền thống của bạn, do đó bạn không cần phải xây dựng, quy mô và duy trì các hệ thống mail server. Tóm lại SendGrid là một dịch vụ gửi email, nó đảm nhiệm vai trò là server cho việc gửi mail của bạn. 

# Sendgrid có phải trả tiền để dùng không?
SendGrid có nhiều gói với giá khác nhau. Gói giá càng cao thì gửi được càng nhiều, quản lý nhiều contact và tỉ lệ vào INBOX càng cao.
Trước đây, SendGrid cho phép sử dụng hoàn toàn miễn phí với giới hạn 12,000 email/tháng nhưng hiện tại chúng ta chỉ có thể dùng thử FREE 1 tháng mà thôi. Gửi được tối đa 40,000 email trong vòng 30 ngày đầu. Sau đó, phí mỗi tháng sẽ từ 9.95$, phụ thuộc vào số lượng email muốn gửi đi.

Với chất lượng ổn định, khả năng delivery cao của SendGrid nên được rất nhiều blogger lớn và doanh nghiệp tin tưởng sử dụng.

# Dùng Sendgrid để gửi mail như thế nào?

SendGrid cung cấp hai cách để gửi email: thông qua SMTP relay hoặc thông qua API Web. Mỗi loại đều có những ưu điểm riêng. 

Bạn có thể tích hợp SendGrid với một ứng dụng hiện có, việc thiết lập ứng dụng để sử dụng relay SMTP của SendGrid là dễ nhất, vì nó chỉ yêu cầu sửa đổi cấu hình SMTP ([chi tiết](https://sendgrid.com/docs/for-developers/sending-email/rubyonrails/)). Tuy nhiên Sendgrid API cũng có rất nhiều hỗ trợ. Tham khảo thêm về so sánh ưu nhược điểm của 2 loại hình gửi mail này [tại đây](https://sendgrid.com/blog/web-api-or-smtp-relay-how-should-you-send-your-mail/). 

# Các bước thiết lập Sendgrid thông qua API Web
### Tạo tài khoản gửi Sender Email
Trước tiên bạn cần truy cập SendGrid để đăng ký một tài khoản miễn phí. *(Hiện tại đăng ký tài khoản SendGrid ở Việt Nam khá khó khăn, nhất là khi bạn dùng email thông thường như @gmail.com, @yahoo.com…, thường sẽ gặp thông báo account high risk. Lúc này cần gửi email tới support chờ xác thực và kích hoạt thủ công).*

Nhấn vào Try for Free.

![](https://images.viblo.asia/40124cf1-b081-4de3-8451-19fafc260635.jpg)

Sau đó điền các thông tin của bạn và nhấn Create Account.
Nên sử dụng email tên miền riêng, khả năng thành công cao hơn và tài khoản của bạn sẽ được active tự động trong vòng vài phút. Nếu đăng ký thành công ngay thì tiếp tục đọc phần hướng dẫn bên dưới nha.

Ngay sau đó bạn sẽ nhận được một email yêu cầu xác nhận, nhấn Confirm Email Address.

![](https://images.viblo.asia/16bd0de8-a5f8-42f7-ab8a-842983d9edbf.png)

Sau đó bạn sẽ được chuyển đến trang About You. Tại đây bạn nhập các thông tin cá nhân của bạn nhé. Bổ sung thông tin, lưu ý 2 dữ liệu là domain (điền domain bạn sỡ hữu để tiện xác minh sau này) và check 2 ô sử dụng dịch vụ bằng API và ứng dụng tạo chiến dịch trên web. Các thông tin còn lại điền đúng theo thông tin của bạn.

![](https://images.viblo.asia/48f082c6-dbc3-474b-baba-c3c9c2cc3808.png)

### Tạo API Key

API Key là một chuỗi xác thực thay mặt cho tài khoản (tên đăng nhập và mật khẩu) để sử dụng một số tính năng của SendGrid. API Key thường dùng trong các phần mềm bên thứ ba giúp phần mềm kết nối tới SendGrid. Bạn có thể tạo API Key, cài đặt quyền hạn cho API Key.

Sau khi đăng ký thành công tài khoản SendGrid, đăng nhập tài khoản và vào ứng dụng với link: https://app.sendgrid.com/

Tại trang Dashboard của Sendgrid bạn chọn mục API keys -> ở góc phải màn hình bạn chọn Create API key.
Click vào General API key.
![](https://images.viblo.asia/3f5c2d32-c6d0-4aa0-8e7c-3d32f3f7e386.png)

API Key được tạo là một chuỗi, chuỗi này không được hiện nữa vì vậy bạn cần lưu trữ lại một nơi an toàn và không chia sẻ với người khác.

### Xác thực tên miền

Xác thực domain (tên miền) tức là khai báo Whitelabels trong SendGrid. Xác thực domain cho phép bạn gửi qua tên miền của của bạn thay vì SendGrid (mặc định). Điều này cải thiện gắn kết giữa thông tin gửi (header email) và nội dung gửi vì vậy nó cũng cải thiện khả năng phân phát email của bạn. Phần này mình chưa tìm hiểu được kĩ lắm nên các bạn đọc thêm về cách làm tại đây nhé: [Chi tiết](http://seoiclick.com/huong-dan/huong-dan-kich-hoat-xac-minh-tai-khoan-sendgrid-t1391.html)

# Sử dụng SendGrid API Web trong ruby
Để sử dụng SendGrid trong ruby chúng ta sẽ dùng gem sendgrid-ruby: 
`gem "sendgrid-ruby"`

Sau khi cài đặt xong gem sendgrid-ruby chúng ta sẽ bắt đầu sử dụng những tiện ích mà SendGrid API đem lại. 
Một ví dụ về cách dùng: 
```ruby
require "sendgrid-ruby"

class UserMailer < ApplicationMailer
  def send_mail(user, subject, content_value)
    from = SendGrid::Email.new(email: "emres@framgia.com")
    to = SendGrid::Email.new(email: user.email)
    
    #TODO setting content full later
    content = SendGrid::Content.new(type: "text/plain", value: content_value)
    mail = SendGrid::Mail.new(from, subject, to, content)
    
    unless Rails.env.production?
      mail_settings = SendGrid::MailSettings.new
      mail_settings.sandbox_mode = SendGrid::SandBoxMode.new(enable: true)
      mail.mail_settings = mail_settings
    end
    
    sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
    response = sg.client.mail._("send").post(request_body: mail.to_json)
  end
end
```
Trong ví dụ trên mình có sử dụng "SandBoxMode", để thiết lập chế độ gửi mail. Nếu trong môi trường production thì hệ thống sẽ gửi mail thật tới người dùng, còn trong môi trường dev và test thì SandBoxMode: true, sẽ không có mail gửi đi. 

> Sandbox mode is only used to validate your request. The email will never be delivered while this feature is enabled!

Để hiểu hơn về SandBox mời các bạn tham khảo thêm tại [đây](https://sendgrid.com/docs/for-developers/sending-email/sandbox-mode/)


Sendgrid còn hỗ trợ config về phía content mail, template mail, ... để tham khảo rõ hơn mời các bạn đọc tại [đây](https://sendgrid.com/docs/API_Reference/api_v3.html)

Cảm ơn bạn đã quan tâm và theo dõi bài viết!
# Tài liệu tham khảo
- https://sendgrid.com/blog/web-api-or-smtp-relay-how-should-you-send-your-mail/
- https://sendgrid.com/docs/glossary/web-api/
- https://github.com/sendgrid/sendgrid-ruby
- https://sendgrid.com/docs/API_Reference/api_v3.html
- https://www.linkedin.com/pulse/huong-dan-dang-ky-tai-khoan-sendgrid-de-gui-email-marketing-seo
- https://canhme.com/kinh-nghiem/smtp-server-mien-phi/
- https://viblo.asia/p/tim-hieu-ve-sendgrid-3wjAM7mgvmWe
- https://viblo.asia/p/sendgrid-dich-vu-mail-6J3ZgBnEKmB