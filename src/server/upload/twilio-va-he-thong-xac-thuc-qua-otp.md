## Giới thiệu
Twilio là một nền tảng truyền thông đám mây. Twilio cho phép các nhà phát triển phần mềm thực hiện và nhận cuộc gọi điện thoại, gửi và nhận tin nhắn văn bản theo chương trình và thực hiện các chức năng giao tiếp khác bằng cách sử dụng các API dịch vụ web của mình.

Trong bài chia sẻ ngày hôm nay, mình sẽ sử dụng chức năng gửi sms của Twilio để thực hiện xác thực người dùng. Sau đây là cách mình đã thực hiện nó trong Ruby on Rails
## Đăng kí tài khoản
Trước tiên [vào đây](https://www.twilio.com/try-twilio) để đăng kí tài khoản

Lưu ý: Dùng số điện thoại của nhà mạng Viettel(các nhà mạng khác khi sử dụng, trong quá trình **Free Trial** sẽ bị lỗi)

* Get a trial phone number
* ACCOUNT SID
* AUTH TOKEN
![](https://images.viblo.asia/2c3260d9-031a-41da-98e7-8a2003f4975f.png)
* Sender phone number: +15023092048

![](https://images.viblo.asia/bb4d8e3b-ac58-42a5-bbf6-bacc31588791.png)


## Chuẩn bị và thực hiện thử nghiệm
* Tạo repo mới, hoặc thực hiện lệnh sau(mình dùng lại repo của bài viết trước)
```
git clone git@github.com:loctx-2273/upload-file-with-carrierwave.git
```
* Chạy seed
```
rails db:seed
```
* Thêm 3 gem mới
```
gem "config" # settings.yml
gem "figaro" # env application.yml (mình có để file application.sample.yml)
gem "twilio-ruby" # twilio service
```
```
bundle install
bundle exec figaro install
rails g config:install
```
* rails c
```
client = Twilio::REST::Client.new Settings.twilio.account_sid, Settings.twilio.auth_token
client.messages.create from: Settings.twilio.sender_phone_number, to: "+84865787769", body: "This is otp code"
```
Settings.twilio.account_sid, 
Settings.twilio.auth_token, 
 và Settings.twilio.sender_phone_number: Tương ứng với các thông tin get được phía trên.

Lưu ý: to: "+84865787769", các bạn sử dụng chính số điện thoại vừa verify Twilio system phía trên
![](https://images.viblo.asia/a7d3cdb5-7bae-42f4-afcd-9a52fb5796f8.png)

Thấy có vẻ khả quan rồi, chúng ta qua phần coding :point_down:

## Coding và kết quả
Ở phần này, mình sẽ thực hiện chức năng cập nhật số điện thoại cho user trong hệ thống:

* B1: Gửi yêu cầu đổi số điện thoại(cần xác thực người dùng)
* B2: Verify one time pasword và cập nhật số điện thoại mới

Với yêu cầu trên, mình dự định sẽ tạo ra 3 service: Xử lý yêu cầu cập nhật số điện thoại, Gửi OTP tới người dùng, Xác thực và cập nhật số điện thoại mới.

* Add field mới:
```
rails g migration add_field_to_use
```
```
class AddFieldToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :otp_code, :integer
    add_column :users, :otp_code_sent_at, :datetime
    add_column :users, :phone_number, :string
  end
end
```
* routes.rb 
```
post "users/send_sms_verification"
post "users/update_phone_number"
```
* user_controller.rb
```
def send_sms_verification
  SendOtpVerificationService.call current_user
  render json: {status: :ok, message: "Send otp verification successful"}, status: :ok
end

def update_phone_number
  service = UpdatePhoneNumberService.new current_user, params
  service.call
  if service.error
    render json: {status: :unprocessable_entity, message: "Update phone number fails, otp code incorrect"}, status: :unprocessable_entity
  else
    result_data = {phone_number: current_user.phone_number}
    render json: {status: :ok, message: "Update phone number successful", data: result_data}, status: :ok
  end
end
```
* SendOtpVerificationService: Xử lý yêu cầu cập nhật số điện thoại
```
class SendOtpVerificationService < ApplicationService
  attr_reader :user

  def initialize user
    @user = user
  end

  def call
    user.update otp_code: otp_code, otp_code_sent_at: Time.zone.now
    SendSmsService.call user.phone_number, otp_code
  end

  private

  def otp_code
    @otp_code ||= SecureRandom.random_number(10**6).to_s
  end
end
```
Ở service này, thực hiện update otp_code random(6 số) vào db và send otp code tới phone_number của current_user

* SendSmsService: Gửi OTP tới người dùng
```
class SendSmsService < ApplicationService
  attr_reader :client, :phone_number, :message

  def initialize phone_number, message
    @client = Twilio::REST::Client.new Settings.twilio.account_sid, Settings.twilio.auth_token
    @phone_number = phone_number
    @message = message
  end

  def call
    client.messages.create from: Settings.twilio.sender_phone_number, to: receive_phone_number, body: message
  rescue Twilio::REST::RestError
    false
  end

  private

  def receive_phone_number
    "+84" + phone_number.delete_prefix("0")
  end
end
```
Ở service này, khởi tạo một Twilio service. Gửi message tới phone_number input(message cụ thể ở đây là otp code)

Thử nghiệm kết quả bằng Postman:
![](https://images.viblo.asia/48f96bcb-9c54-4797-aa19-358294806ad9.png)

1 otp code đã được gửi tới số điện thoại tương của current_user:
![](https://images.viblo.asia/72fb40ce-7e73-4927-afeb-0ca0413ef964.png)
```
2.7.2 :005 > User.first.otp_code
  User Load (0.3ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]
 => 612927 
2.7.2 :006 >
```
Có vẻ uy tín :100:
* UpdatePhoneNumberService: Xác thực và cập nhật số điện thoại mới
```
class UpdatePhoneNumberService < ApplicationService
  attr_reader :user, :params, :error

  def initialize user, params
    @user = user
    @params = params
    @error = false
  end

  def call
    return @error = true if params[:otp_code].to_i != user.otp_code

    user.update phone_number: params[:phone_number], otp_code: nil, otp_code_sent_at: nil
  end
end
```
Thực hiện check otp được gửi <-> otp người dùng nhập, cập nhật số điện thoại mới, và reset otp_code

Chạy thử:
![](https://images.viblo.asia/7e6dac15-2e6e-40ee-a78a-7ee14f993d88.png)
```
2.7.2 :007 > User.first.phone_number
  User Load (0.3ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]
 => "0978171197" 
2.7.2 :008 >
```

## Kết
[Source Demo](https://github.com/loctx-2273/upload-file-with-carrierwave/pull/1)

Trên đây là cách sử dụng Twilio để thực hiện xác thực bằng OTP cho hệ thống mà mình đã thực hiện. 
Tất nhiên sẽ không tránh khỏi những thiếu sót về hình thức cũng như nội dung, mong bạn đọc góp ý để mình hoàn thiện hơn cho bạn đọc sau.

Cám ơn đã dành thời gian đọc bài chia sẻ của mình :heart_eyes::heart_eyes::heart_eyes: