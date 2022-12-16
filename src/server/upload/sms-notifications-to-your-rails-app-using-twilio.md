Bài toán đặt ra là: User muốn change số điện thoại của mình thì phải xác thực số điện thoại đó bằng cách nhập mã code được gửi đến số điện thoại thay đổi.

Với Rails để làm được điều này thuận tiện nhất ta sử dụng [Twilio](https://github.com/twilio/twilio-ruby).  Vậy Twilio là gì?
> Twilio (/ˈtwɪlioʊ/) is a cloud communications platform as a service (CPaaS) company based in San Francisco, California. Twilio allows software developers to programmatically make and receive phone calls, send and receive text messages, and perform other communication functions using its web service APIs.

Nếu bạn sử dụng Lyft, Airbnb hay Netflix thì bạn đã sử dụng Twilio. Twilio đã được dùng trên 40.000 doanh nghiệp trên thế giới.  Twilio là một platform phát triển cho truyền thông. Các developer có thể sử dụng Twilio API để có thể sử dụng các chức năng như cuộc gọi thoại, video và nhắn tin cho ứng dụng của mình. Đằng sau Twilio API là 1 super network, một lớp phần mềm kết nối và tối ưu hóa các mạng truyền thông trên toàn thế giới. Chính vì thế nó cho phép bạn có thể gọi và nhắn tin cho bất kì ai ở bất cứ đâu

Twilio đã dùng mạng viễn thông toàn cầu và biến nó thành 1 nền tảng truyền thông đám mây với những khả năng:

1. [Voice](https://www.twilio.com/voice)
2. [Video](https://www.twilio.com/video)
3. [Messaging](https://www.twilio.com/messaging)
4. [Authentication](https://www.twilio.com/authy)
5. Connectivity
6. Monitoring and Support

Vậy chúng ta đã biết sơ qua về Twilio. Giờ chúng ta sẽ thực hành để giải quyết bài toán trên nhé :D

## Tạo Project trên Twilio
Đầu tiên để sử dụng Twilio bạn phải tạo 1 tài khoản trên https://www.twilio.com . Sau khi tạo thành công bạn chọn tạo 1 project:

![](https://images.viblo.asia/2a57962e-7f39-4070-9703-4ed0f97dcfa1.png)

Ở đây bạn có nhiều option để lựa chọn, mỗi option sẽ đáp ứng nhu cầu của bạn. Mặc định mình chọn Flex . Sau đó ta đặt tên cho project của mình:

![](https://images.viblo.asia/e95ec425-16bd-4b52-ba99-e5179bd429b7.png)

Next qua bước Invite a teamates. Vậy là ta đã tạo project Viblo thành công

## Cài đặt để gửi tin nhắn trên Rails
Bước đầu tiên ta cần add gem twilio vào ứng dụng:
```
gem "twilio-ruby", "~> 5.20.0"
```

Sau đó bundle install. 


User sẽ có 2 trường đó là pin: lưu pin xác nhận, và pin_sent_at: thời gian pin gửi đi (Cái này dùng để nếu pin gửi đi sau 1 khoảng time mà không xác nhận ta sẽ unable pin đó, người dùng nhập đúng pin cũng không được tính)

Tại model user.rb:
```
def generate_pin new_telephone
    verify_code = rand(11_111..99_999)
    # Tại đây mình muốn sinh ra 1 pin random có 5 chữ số từ 11111 đến 99999
    update_columns(pin: verify_code, pin_sent_at: Time.zone.now)
    MessageSenderService.send_pin(new_telephone, verify_code)
end
```

Tại file settings.local.yml: (File này lưu các setting tại local) ta khai báo các secret key liên quan đến Twilio:
```
message_sender:
  twilio:
    account_sid: "twilio sid"
    auth_token: "twilio auth token"
    from_tel: "from tel"
    country_code: "+84"
```

account_sid và auth_token ta sẽ thấy ở detail project ở góc bên phải màn hình ở https://www.twilio.com/console
![](https://images.viblo.asia/0c087d60-925c-4b17-bc51-f5c9847dfeec.jpg)

from_tel:  Số điện thoại gửi đi ta vào link https://www.twilio.com/console/phone-numbers/incoming tại đây ta sẽ được cung cấp 1 số điện thoại của Mỹ có đầy đủ tính năng như gọi, gửi message vv..vv

![](https://images.viblo.asia/ebd86808-83e3-4f16-a5af-568fa5815967.png)


Số điện thoại nhận message vì do chúng ta đang ở tài khoản dùng thử, muốn nhận được sms bắt buộc phải verify tại 
https://www.twilio.com/console/phone-numbers/verified

![](https://images.viblo.asia/1ba6b71c-55da-459b-9c87-107f551c90e0.png)


Cuối cùng ta đăng kí nhận tin nhắn ở Việt Nam (+84) bằng cách vào link:
https://www.twilio.com/console/sms/settings/geo-permissions
![](https://images.viblo.asia/d7ef486f-a72f-4645-b767-e9ffdc96c36c.png)

Mình định nghĩa 1 service chuyên để gửi message: 
```
class MessageSenderService
  class << self
    def send_pin tel, pin
      twilio_config = Settings.message_sender.twilio
      client = Twilio::REST::Client.new(twilio_config.account_sid, twilio_config.auth_token)
      tel = tel.sub(/^./, twilio_config.country_code)
      # Số điện thoại mặc định sẽ có số 0 ở đầu do vậy mình sẽ cắt số 0 ở đầu đi thay vào đó là country_code tương ứng với số điện thoại. Ví dụ: Ở việt nam là +84, ở japan là +81. Nếu không có country code thì sẽ k gửi được tin nhắn.
      client.messages.create(
        from: twilio_config.from_tel,
        to: tel,
        body: "Your pin is #{pin}"
      )
    end
  end
end
```

Vào console
```
User.first.generate_pin("0988534222")
```

Là ta đã tạo và gửi mã pin thành công đến số điện thoại 0988534222.

Đơn giản đúng không? :D Hi vọng bài viết sẽ giúp ích cho bạn. 


**Nguồn tham khảo**

https://www.twilio.com/learn/twilio-101/what-is-twilio

https://www.twilio.com/docs/sms/quickstart/ruby