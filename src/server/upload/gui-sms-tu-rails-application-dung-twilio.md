Twilio có cung cấp nhiều cái dịch vụ như SMS, MMS, Voice call.... Giá dịch vụ của nó tuy theo từng địa điểm và dịch vụ bạn sử dụng. Bạn có thể tham khảo giá dịch vụ của nó ở đây https://www.twilio.com/pricing . Dưới đây mình sẽ giới thiệu cách dùng twilio và ruby để gửi SMS.
### Config twilio
1. Nếu bạn chưa có tài khoản twilio thì bạn cần tài khoản mới theo link này https://www.twilio.com/try-twilio.
![](https://images.viblo.asia/71185334-94a6-40a9-9914-5cb9e0da19d0.png)
2. Sau khi nhập thông tin đầy đủ và click get started bạn sẽ cần verify số điện thoại của bạn. Mã verify sẽ gửi vào số điện thoại bạn sử dụng.
![](https://images.viblo.asia/f4e406d1-292e-452f-8be3-2bf512d09fe6.png)
![](https://images.viblo.asia/93c66ab4-d142-4659-aa9a-83d5b5506330.png)
3. Vào [Twilio console](https://www.twilio.com/console) để lấy ACCOUNT SID và AUTH TOKEN. Các thông số này sẽ cần khi bạn gọi hàm send SMS từ trong rails project.
### Install gem
Thêm gem twilio vào project và run `bundle install`
```
gem "twilio-ruby"
```
Để gửi tin nhắn bạn chỉ cần viết service như dưới.
```
class TwilioService
  def send_sms
    account_sid = 'ACCOUNT SID'
    auth_token = 'AUTH TOKEN'
    @client = Twilio::REST::Client.new(account_sid, auth_token)

    message = @client.messages.create(
      from: '+15005550006',
      body: 'body',
      to: '+855962401306'
    )
  end
end
```
* ACCOUNT SID và AUTH TOKEN bạn sẽ lấy được từ trong Twilio console.
* tham số `from` là số điện thoại dùng để gửi tin nhắn
* tham số `body` là nội dung tin nhắn
* tham số `to` là số điện thoại bạn muốn gửi tin nhắn
### Tài liệu tham khảo
* https://github.com/twilio/twilio-ruby
* https://www.twilio.com/docs/libraries/ruby
* https://www.twilio.com/blog/2017/12/send-sms-ruby-rails-5-coffee.html
* https://www.twilio.com/docs/sms/send-messages