Ngoài cách xác nhận tài khoản hay gửi thông báo bằng email thì hôm nay mình sẽ hướng dẫn các bạn 1 cách nữa là thông qua SMS/Voice
Công cụ sử dụng sẽ là gem Twilio
# Installation
Để cài đặt bằng Bundler, hãy lấy phiên bản mới nhất:
`gem 'twilio-ruby', '~> 5.47.0'`

Để cài đặt thủ công twilio-ruby thông qua Rubygems, bạn chỉ cần cài đặt gem:
`gem install twilio-ruby -v 5.47.0`

Để tự xây dựng và cài đặt nhánh phát triển từ nguồn mới nhất:
```
git clone git@github.com:twilio/twilio-ruby.git
cd twilio-ruby
make install
```

# Getting Started
## Get API key
Truy cập https://www.twilio.com/ để đăng kí tài khoản và chọn các option phù hợp
![](https://images.viblo.asia/917dda07-7f5d-473a-932c-1de81842c2d0.PNG)

Vào dashboard để lấy api key cần thiết cho bước tiếp theo
![](https://images.viblo.asia/3b9155f3-3320-40e4-9bb7-e69d1cc787ba.PNG)

## Setup Work

```
require 'twilio-ruby'
# put your own credentials here
account_sid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
auth_token = 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'

# set up a client to talk to the Twilio REST API
@client = Twilio::REST::Client.new account_sid, auth_token
```

## Use An API Key
```
require 'twilio-ruby'

# put your own credentials here
account_sid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
api_key_sid = 'zzzzzzzzzzzzzzzzzzzzzz'
api_key_secret = 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'

# set up a client to talk to the Twilio REST API using an API Key
@client = Twilio::REST::Client.new api_key_sid, api_key_secret, account_sid
```
## Specify a Region and/or Edge
Để tận dụng Cơ sở hạ tầng toàn cầu của Twilio, hãy chỉ định Region hoặc Edge cho client:
https://www.twilio.com/docs/global-infrastructure
```
# set up a client to talk to the Twilio REST API over a specific region and edge
@client = Twilio::REST::Client.new account_sid, auth_token, nil, 'au1'
@client.edge = 'sydney'

# you may also specify the region and/or edge after client creation
@client = Twilio::REST::Client.new account_sid, auth_token
@client.region = 'au1'
@client.edge = 'sydney'
```

## Enable Debug logging
```
@client = Twilio::REST::Client.new account_sid, auth_token
myLogger = Logger.new(STDOUT)
myLogger.level = Logger::DEBUG
@client.logger = myLogger

@client = Twilio::REST::Client.new account_sid, auth_token
myLogger = Logger.new('my_log.log')
myLogger.level = Logger::DEBUG
@client.logger = myLogger
```

## Make a Call
Trước tiên hãy chọn 1 trial phone number
![](https://images.viblo.asia/6d75752e-21de-4cbe-b70f-f6fa15f242a6.PNG)

```
@client.calls.create(
  from: '+14704358494',
  to: '+84987113442',
  url: 'http://example.com'
)
```

Sẽ nhận được cuộc gọi từ số mình vừa chọn ở trên từ Hoa Kỳ bắt mình upgrade account =))
![](https://images.viblo.asia/2305f345-bdeb-42fe-911f-a7da4ce6eaf2.PNG)

## Send an SMS
```
@client.messages.create(
    from: '+14704358494',
    to: '+84987113442',
    body: 'Vuong oi! Test Twilio ne :D'
)
```

Nhận được tin nhắn rồi nè :P
![](https://images.viblo.asia/e214cf99-61f8-4ec2-a056-52dcd0141667.PNG)

## List your SMS Messages
`@client.messages.list(limit: 20)`

## Handling Errors
```
begin
  messages = @client.messages.list(limit: 20)
rescue Twilio::REST::RestError => e
  puts e.message
end
```

Lưu ý to bự là Twilio sẽ cho dùng thử với **Trial Balance  = $15.50**

References: 
* https://github.com/twilio/twilio-ruby
* https://www.twilio.com/docs