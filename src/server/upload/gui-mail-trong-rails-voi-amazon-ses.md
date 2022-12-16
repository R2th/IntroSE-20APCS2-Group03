###  Giới thiệu
 Bạn đang tìm một dịch vụ gửi mail phải không? Mình xin giới thiệu cho mọi người một dịch vụ gửi mail của Amazon. Amazon SES(Amazon Simple Email Service) là một dịch vụ gửi mail giá rẻ với số lượng mail gửi miễn phí đến tận 62,000 mail trong một tháng. Dưới đây là so sánh giá dịch vụ của Amazon SES và dịch vụ khác với số lượng 40,000 mails. 

| Dịch vụ | Giá | 
| -------- | -------- |
| AmazonSES     | \$4     |
| Mailgun     | \$15     |
| MailJet     | \$17     |
| Postmark     | \$30     |
| SendinBlue     | \$7.5     |
| SendGrid     | \$10     |
### Cách sử dụng
* **Generate mailer cho app của bạn**
```
rails generate mailer my_mailer
```

```
class MyMailer < ApplicationMailer
  def send_email(params)
    @name = params[:name]
    @email = params[:email]
    @message = params[:message]
    mail(:to=> @email, :subject=>"Amazon SES Email")
  end
end
```
* Config trong file `config/environments/development.rb`
```
config.action_mailer.perform_deliveries = true
config.action_mailer.raise_delivery_errors = true
```
* **Config Amazon SES**
1. Login vào AWS management console
2. Tìm từ khoá Simple Email Service
![](https://images.viblo.asia/ab703e20-d5bc-4f1c-9110-b3c8e38a8682.png)
3. Trong trang SES Home, vào `Email Addresses`, click Verify a New Email Address
![](https://images.viblo.asia/ab0cba71-3037-4814-800b-322f817a0fe8.png)
4. Sau khi confirm email xong. Vào trong tap SMTP Settings và Create SMTP Credentials 
![](https://images.viblo.asia/0378f538-52e8-4986-b8a6-5ec1be1da4ba.png)
6. Điền các thông tin vào trong file `config/environments/development.rb`
```
config.action_mailer.smtp_settings = {
  :address => "...",
  :port => 587,
  :user_name => ENV["SES_SMTP_USERNAME"]
  :password => ENV["SES_SMTP_PASSWORD"]
  :authentication => :login,
  :enable_starttls_auto => true
}
```

address = Server Name

SES_SMTP_USERNAME và SES_SMTP_PASSWORD lấy được từ SMTP Credentials vừa tạo ở bước trên.
* **Gửi mail**

Để gửi mail chỉ cần gọi lệnh
```
MyMailer.send_email(name: "test SES", email: "testses@gmail.com", message: "Test SES").deliver
```

**Tài liệu tham khảo**
* https://aws.amazon.com/getting-started/tutorials/send-an-email/
* https://deliciousbrains.com/amazon-ses-tutorial/
* https://robots.thoughtbot.com/deliver-email-with-amazon-ses-in-a-rails-app
* https://www.sitepoint.com/deliver-the-mail-with-amazon-ses-and-rails/