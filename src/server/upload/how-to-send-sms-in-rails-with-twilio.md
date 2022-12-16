## Introduction
Twilio is kind of service that relate to building a communication services. Before Twilio, if we wanted to send text messages or place phone calls from our web application, we would have had to connect with different carriers and operators and pay much money to their service. Twilio have many services such as SMS, MMS, Voice call ... And the price also depending on the location and the service that you use. You can go to visit page Twilio to know clearly https://www.twilio.com/pricing . 

Now, I going to introduce all of you to use gem twilio-ruby for sending SMS.

### Config twilio
- If you do not have a twilio account, you need a new account at this link https://www.twilio.com/try-twilio
![](https://images.viblo.asia/2dfc96c1-60ac-43f7-b69d-5a2668656d22.PNG)
- After entering the full information and clicking get started you will need to verify your phone number. The verification code will be sent to the phone number you use.
![](https://images.viblo.asia/335e1159-6b40-494d-9ec5-38fb7bf49ba3.PNG)
- Go to the Twilio console to get `ACCOUNT SID` and `AUTH TOKEN`. These parameters will be needed when you call the send SMS function from within the rails project.
![](https://images.viblo.asia/1dbee0d9-a598-4d0a-917b-7af6e7110867.PNG)
### Gem twilio-ruby
Add twilio gem to the project and run `bundle install`
```
gem "twilio-ruby"
```
Using twilio gem, it is very easy, in controller need to handle sending sms that you want to send as my code below:
```
class SmsController < ApplicationController

  def send_sms
    twilio_sid = "ACCOUNT SID"
    twilio_token = "AUTH TOKEN"

    @twilio_client = Twilio::REST::Client.new twilio_sid, twilio_token

    @twilio_client.account.sms.messages.create(
      from: '+15005550006',
      body: 'body',
      to: '+85586743566'
    )
  end
end
```
* `twilio_sid` value get from twilio after we create account
* `twilio_token` value get from twilio after we create account
* `from` sender phone number
* `body` content sending
* `to` reciever phone number