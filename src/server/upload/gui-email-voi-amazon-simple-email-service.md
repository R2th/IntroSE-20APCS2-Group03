### Amazon Simple Email Service (Amazon SES) là một dịch vụ có quy mô cực kỳ linh hoạt và tiết kiệm chi phí dùng để gửi và nhận email. Amazon SES loại bỏ sự phức tạp cũng như chi phí của việc xây dựng một giải pháp email nội bộ hoặc việc cấp phép, cài đặt và vận hành một giải pháp email của bên thứ ba.

### 1. Giới thiệu về Amazon SES.
Amazon Simple Email Service (Amazon SES) là dịch vụ gửi email trên nền tảng đám mây được thiết kế để giúp các chuyên gia marketing kỹ thuật số và nhà phát triển ứng dụng gửi email marketing, thông báo và giao dịch. Đây là dịch vụ tin cậy, tiết kiệm chi phí dành cho các doanh nghiệp thuộc đủ mọi quy mô sử dụng email để giữ liên lạc với khách hàng của mình.

Bạn có thể sử dụng giao diện SMTP hoặc một trong các SDK của AWS để tích hợp Amazon SES trực tiếp vào các ứng dụng hiện có của bạn. Bạn cũng có thể tích hợp tính năng gửi email của Amazon SES vào trang web đang sử dụng.
### 2. Config và sử dụng. 
1. Đi tới trang service ses của amazon. Và tìm kiếm dịch vụ Simple email service.
2. Click chọn Email Address và verify email 2 email dùng để gửi và nhận.
Lưu ý dùng đúng email vì amazon sẽ gửi 1 email để confirm.
 ![](https://images.viblo.asia/3e24b58a-d518-425f-b325-045a923054e5.png)

#### Add config 
Ở đây mình sử dụng aws-sdk.
gem_file
```ruby
gem "aws-sdk", "~> 3"
```
create config/initalizes/amazon_aws.rb
```ruby
require "aws-sdk"

Aws.config.update({
  credentials: Aws::Credentials.new(
    ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY']
  )
})
```
Ở [bài trước](https://viblo.asia/p/luu-tru-file-trong-rails-tren-amazon-s3-voi-carrierware-4P856kd9KY3) mình có hướng dẫn tạo user IAM, Giờ mình chỉ cần vào group_có user đó và add quyền AmazonSESFullAccess cho group đó.
![](https://images.viblo.asia/14f6d07b-6250-4911-87cf-c4c82ede69f1.png)
create config/initalizes/amazon_ses.rb
```ruby
require "aws-sdk"

AMAZON_SES = Aws::SES::Client.new({
  region: Settings.aws.ses.region,
  raise_response_errors: true
})
```
setting.yml
```
aws:
  ses:
    region: "ap-south-1"
    sender_name: "NamDV"
```
#### Tiếp theo là phần gửi email.
Ở application_mailer mình sẽ define 1 số method dùng để gửi email bằng dịch vụ của amazon.
```ruby
class ApplicationMailer < ActionMailer::Base
  after_action :amazon_send_email

  default from: "vannam051096@gmail.com"
  layout "mailer"

  private
  def amazon_send_email
    mail.perform_deliveries = false
    ses_params = {
      destination: {
        to_addresses: mail.to_addrs
      },
      message: {
        body: body_type(mail.mime_type, mail.body.raw_source, mail.charset),
        subject: {
          charset: mail.charset,
          data: mail.subject
        }
      },
      source: "<#{mail.from.join}>"
    }

    begin
      ses_response = AMAZON_SES.send_email ses_params
      p "FINISHED"
    rescue StandardError => e
      p "FAILED: #{e.message}"
    end
  end

  def body_type mime_type, body, mail_charset
    type = mime_type == "text/plain" ? :text : :html

    {
      type => {
        charset: mail_charset,
        data: body
      }
    }
  end
end
```
Tạo UserMailer
```ruby
class UserMailer < ApplicationMailer

  def send_mail_demo email
    mail(to: email, subject: "Amazon Simple Email Service") do |format|
      format.text
    end
  end
end
```
send_mail_demo.text.erb
```ruby
Amazon Simple Email Service (Amazon SES) is a cloud-based email sending service designed to help digital marketers and application developers send marketing, notification, and transactional emails. It is a reliable, cost-effective service for businesses of all sizes that use email to keep in contact with their customers.

You can use our SMTP interface or one of the AWS SDKs to integrate Amazon SES directly into your existing applications. You can also integrate the email sending capabilities of Amazon SES into the software you already use, such as ticketing systems and email clients.
```
#### Test gửi email
Mình sẽ gửi tới địa chỉ được verify ở trên. 
```ruby
UserMailer.send_mail_demo("dao.van.nam@sun-asterisk.com").deliver_now
```
và email nhận được
![](https://images.viblo.asia/02e09a13-babf-460f-b068-b6be9ff2dffc.png)

### Các bạn có thể tham khảo thêm 1 số method khác của aws sdk ses tại [đây](https://docs.aws.amazon.com/sdkforruby/api/Aws/SES/Client.html)
Source code [github](https://github.com/vannam0510/demo-app)