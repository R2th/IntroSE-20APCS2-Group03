Như các bạn đã biết, hiện nay có rất nhiều công ty sử dụng sms để gửi thông báo về số điện thoại của bạn để authenticate hoặc một vấn đề gì đó để xác nhận. Nhiều người đặt ra câu hỏi, phải chăng có một nhân viên nào đó, chỉ ngồi và gửi tin nhắn khi được ông chủ giao cho vài số điện thoại. Nhưng không, có rất nhiều trang web hỗ trợ việc tự động gửi tin nhắn, mình chỉ cần nhập số điện thoại là cả thế giới sẽ để nó lo, và cái mình đang đề cập đến là 1 trang rất được ưa chuộng đó chính là [Twilio](https://www.twilio.com/). Hôm nay mình sẽ giới thiệu cho các bạn cách gửi tin nhắn thông qua Twilio nhé.

## 1. Đăng kí tài khoản dùng thử
Twilio cho phép chúng ta đăng kí 1 tài khoản để trải nghiệm việc gửi tin nhắn. Đầu tiên bạn đăng nhập vào trang chủ https://www.twilio.com. 
Các bạn cứ đăng kí như bình thường, trang này khi đăng kí cũng không cần phải xác nhận email, rất là nhanh nhé. Sau khi nhập email, tên, password bạn sẽ chọn ngôn ngữ mà bạn sẽ dùng để gửi tin nhắn, mình làm Ruby nên chọn Ruby nhé.

![](https://images.viblo.asia/6d0bbc51-ea80-4f08-8f66-e5af42b7b7d8.png)
Tiếp theo sẽ hiện màn hình như bên dưới:

![](https://images.viblo.asia/11692fdb-c187-4f2d-a0a7-d8ec9c7dc71e.png)
Màn hình này sẽ dùng để verify số điên thoại của bạn, số điện thoại này chính là số điện thoại mà bạn sẽ dùng để nhận sms. 


## 2. Tạo project trên twilio
Sau khi đã signup thành công, màn hình sẽ hiện lên như sau:

![](https://images.viblo.asia/1b190fc8-ee4b-4e56-a276-817e69385121.png)

Ở đây có khá nhiều mục để bạn lựa chọn, mỗi mục sẽ đáp ứng đúng nhu cầu của bạn như là Two-Factor Authencication, SMS Chatbot, mình thấy cái này khá hay, ngoài việc hỗ trợ gửi tin nhắn, nó còn hỗ trợ bảo mật 2 lớp, blabla, ngoài việc nó mất phí còn lại thi quá hoàn hảo. Vì mình chưa trải nghiệm hết tất cả nên mình sẽ lựa chọn cái mình quen thuộc nhất là **Flex project** nhé. Tiếp theo bạn sẽ setting 1 số thứ cho project của mình, cái nào cần thiết thì nhập, không cần thiết thì bấm **Skip Remainning Steps**.

## 3. Thiết lập để gửi tin nhắn bằng twilio
Đối với Ruby thì có hỗ trợ gem **twilio-ruby** nên các bạn dùng lệnh `gem install twilio-ruby` để cài đặt gem vào máy của mình nhé. 
Sau đó bạn tạo 1 file rb với đoạn code sau:

```
require 'twilio-ruby'

account_sid = 'AC****************************'
auth_token = '0a*****************************'
client = Twilio::REST::Client.new(account_sid, auth_token)

from = '+12489492993' # Your Twilio number
to = '+84973067736' # Your mobile phone number

client.messages.create(
  from: from,
  to: to,
  body: "Test SMS"
)

```

Sau khi đã có đoạn code trên, các bạn truy cập vào trang **https://www.twilio.com/console** để lấy thông tin của `account_sid` và `auth_token`.

![](https://images.viblo.asia/e951d896-80c8-41ec-b56e-bd30916582c7.png)

Ở phía góc phải sẽ lưu **sid** và **auth token** bạn copy paste cái này vào đoạn code của mình nhé.
Bây giờ đến số điện thoại gửi đi, bạn click vào link **https://www.twilio.com/console/phone-numbers/incoming**, vì chúng ta tạo tài khoản trải nghiệm sẽ được cung cấp 1 số điện thoại của USA. 

![](https://images.viblo.asia/d3ba0155-52ea-449c-8105-7a3f60b0f732.png)

Số điện thoại này có đầy đủ mọi tính năng từ call, sms, fax...khá là tiện lợi cho việc test phải không, ban copy sđt và dán vào phần **from** nhé.
Tiếp đến số điện thoại được nhận, bạn truy cập vào link **https://www.twilio.com/console/phone-numbers/verified**

![](https://images.viblo.asia/723563f9-aa9c-40d6-8222-a34bcbbf9fee.png)

Đây chính là số điện thoại mà bạn đã verify lúc đăng kí, hiện tại bạn chỉ gửi được cho duy nhất 1 số này, để thêm số điện thoại, bạn click vào dấu **+**. Tuy nhiên vì là bản trial nên nó sẽ có giới hạn, không thêm được quá nhiều, và mỗi lần bạn sẽ phải nhập số verify code gửi về điện thoại. Vậy đã xong, bạn chạy cái file đó rồi xem log thế nào nhé. 
Nếu gửi thành công, nó sẽ không hiển thị lỗi gì hết, nếu debug vào để chạy từng dòng, khí thành công sẽ hiển thị:

```
 <Twilio.Api.V2010.MessageInstance account_sid: AC114cc7067e7d7a2c8a9f767f82e58028 api_version: 2010-04-01 body: 
 Sent from your Twilio trial account - hey date_created: 2018-11-07 02:39:20 +0000 date_updated: 2018-11-07 02:39:20 +0000 
 date_sent:  direction: outbound-api error_code: 0 error_message:  from: +14065103617 messaging_service_sid:  
 num_media: 0 num_segments: 1 price: 0.0 price_unit: USD sid: SM049f310f3da6485bbceedbe06db84785 
 status: queued subresource_uris: {"media"=>"/2010-04-01/Accounts/AC114cc7067e7d7a2c8a9f767f82e58028/Messages/SM049f310f3da6485bbceedbe06db84785/Media.json"} 
 to: +84973067736 uri: /2010-04-01/Accounts/AC114cc7067e7d7a2c8a9f767f82e58028/Messages/SM049f310f3da6485bbceedbe06db84785.json>

```

Ngoài ra sẽ có một số lỗi như sau:

```
Twilio::REST::RestError: [HTTP 400] 21408 : Unable to create record
Permission to send an SMS has not been enabled for the region indicated by the 'To' number: +8497......
https://www.twilio.com/docs/errors/21408
```

Lỗi này dó bạn chưa đăng kí nhận tin nhắn ở Việt nam, để đăng kí bạn click **https://www.twilio.com/console/sms/settings/geo-permissions**, tiếp tục tìm đến Vietnam và tích chọn. 
Vậy là mình đã giới thiệu cho các bạn cách gửi tin nhắn thông qua Twilio, vì mình chưa nâng cấp tài khoản nên chưa nghịch được tất cả các tính năng của nó. Theo hiện tại mình thấy đối có bất cập nhỏ đối với bản trial là khi muốn gửi tin nhắn đến số điện thoại bất kì, thì bạn phải verify số điện thoại đó, ban đầu mình cứ nghĩ cứ nhập đại thì nó đều gửi được hết. 

Các bạn có thắc mắc gì để lại comment bên dưới nhé