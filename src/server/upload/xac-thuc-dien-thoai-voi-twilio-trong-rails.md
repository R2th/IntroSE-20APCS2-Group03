1. Giới thiệu
2. Cài đặt xác thực số điện thoại với Twilio trong Rails
3. Kết luận
## 1. Giới thiệu
- Hiện nay các tính năng như đăng kí tài khoản mới, cập nhật email, số điện thoại... còn thiếu bảo mật và dễ dàng cập nhật khiến hệ thống dễ bị dính spam và dữ liệu rác.
- Ở bài viết này mình giới thiệu tính năng xác thực số điện thoại với Twillio trong Ruby on Rails cho phép nhận mã xác thực về số điện thoại để tránh những vấn đề có thể gặp phải trên.
- Dự án bọn mình đang phát triển gặp phải một vấn đề là việc đăng kí tài khoản chỉ cần sử dụng email vì vậy người dùng dễ dàng tạo tài khoản với các email khác nhau dẫn tới dữ liệu bị rác và khó kiểm soát. Vì vậy bọn mình dự kiến sử dụng việc xác thực mã OTP qua số điện thoại để giảm thiểu tối đa vấn đề này.
## 2. Cài đặt xác thực số điện thoại với Twilio trong Rails
- Đây là một service thứ 3 tích hợp vào hệ thống web của chúng ta, với Ruby on Rails Twilo đã hỗ trợ cả gem và api vì vậy việc cài đặt trở nên dễ dàng hơn rất nhiều.
- Trước tiên chúng ta có thể đăng kí tài khoản miễn phí trên Twilio tại [đây](https://www.twilio.com/try-twilio)
 - Với tài khoản miễn phí chúng ta chỉ có thể gửi mã tới một vài số điện thoại.
- Sau khi đăng kí thành công, Twilio sẽ cung cấp 3 giá trị cho chúng ta để tích hợp vào rails là **ACCOUNT SID, AUTH TOKEN và NUMBER (Số điện thoại dùng để gửi mã xác minh)**.
- Về bảng giá với mỗi service các bạn có thể xem tại [đây](https://www.twilio.com/pricing)
- Lưu ý nếu bạn chỉ sử dụng mã xác thực cho một quốc gia thì nên lựa chọn gói phù hợp để tránh mất thêm phí
***Các bước cài đặt Twilio trong hệ thống Rails***

**Bước 1:** Cài đặt 2 gem sau:

```
gem 'twilio-ruby'
gem 'phonelib' (Sử dụng thế validate số điện thoại)
```

- Chạy lại bundle để cập nhật thư viện mới.
- Gem twilio-ruby chỉ sử dụng để gửi tin nhắn văn bản tới số điện thoại đã đăng kí
- Lưu ý khi sử dụng bản miễn phí chúng ta chỉ nhận được phản hồi từ API, không nhận được tin nhắn văn bản.

**Bước 2:**

- Tạo model User bổ sung các trường sau:
```
t.string   :mobile_number
t.string   :verification_code
t.boolean  :is_verified
```
- trường mobile_number là số điện thoại user dùng để đăng kí xác thực
- trường verification_code là mã code sau khi người dùng nhấn nút gửi mã từ hệ thống
- trường is_verified là trạng thái xác thực mà người dùng nhập mã sau khi nhận được tin nhắn văn bản

**Bước 3:**

- Tạo function xác thực số điện thoại trong models
```
def needs_mobile_number_verifying?
    if is_verified
      return false
    end
    if mobile_number.empty?
      return false
    end
    return true
  end
```
-  Nếu người đã xác minh hoặc số điện thoại không tồn tại thì sẽ trả về false ngược lại trả về true

**Bước 4:**

- Tạo function để sinh mã gửi tới người dùng
```
def create
  current_user.verification_code =  1_000_000 + rand(10_000_000 - 1_000_000) //Tạo một mã xác minh với 6 chữ số ngẫu nhiên
  current_user.save

  to = current_user.mobile_number
  if to[0] = "0"
    to.sub!("0", '+84') 
  end

  @twilio_client = Twilio::REST::Client.new ENV['TWILIO_SID'], ENV['TWILIO_TOKEN']
  @twilio_client.account.sms.messages.create(
    :from => ENV['TWILIO_PHONE_NUMBER'],
    :to => to,
    :body => "Mã xác thực của bạn là #{current_user.verification_code}."
  )
  redirect_to edit_user_registration, :flash => { :success => Một mã xác thực sẽ được gửi tới số điện thoại của bạn" }
  return
end
```

**Bước 5:** 

- Tạo function để xác thực 
```
# app/controllers/verifications_controller.rb
def verify
      if current_user.verification_code == params[:verification_code]
      current_user.is_verified = true
      current_user.verification_code = ''
      current_user.save
      redirect_to edit_user_registration_path, :flash => { :success => "Cảm ơn bạn đã xác thực số điện thoại thành công." }
      return
    else
      redirect_to edit_user_registration_path, :flash => { :errors => "Mã xác thực không hợp lệ." }
      return
    end
end
```

**Bước 6:** 

- Tạo biểu mẫu để người dùng nhập mã xác thực
```
# app/helpers/acme/registrations_helper.rb
  def verify_mobile_number_form
    return '' if current_user.verification_code.empty?
    p current_user.verification_code.empty?
    html = <<-HTML
      <h3>Enter Verification Code</h3>
      #{form_tag(verifications_path, method: "patch")}
      #{text_field_tag('verification_code')}
      #{button_tag('Gửi mã xác thực', type: "submit")}
      </form>
    HTML
    html.html_safe
  end
```
*Đây là ví dụ về form xác thực sau khi đã cài đặt:*
- Form nhập số điện thoại để xác thực:
![](https://images.viblo.asia/9a9df1b7-254e-4b42-84d9-10efe1f66522.png)
- Form để nhập mã xác thực: 
![](https://images.viblo.asia/20a598db-b60c-4424-8cf2-b3ca47d66fb4.png)
## 3. Kết luận
- Một ví dụ khác khi sử dụng Resque cho công việc này 
```
#  controller 
SendVerificationCodeJob.perform_later(user)

# app/jobs/send_verification_code_job.rb
class SendVerificationCodeJob < ActiveJob::Base
  queue_as :default

  def perform(user)
    # generate verification code

    user.verification_code =  100_000 + rand(1_000_000 - 100_000)

    user.save
    to = user.mobile_number
    if to[0] = "0"
      to.sub!("0", '+44')
    end

    # twilio send 
    @twilio_client = Twilio::REST::Client.new ENV['TWILIO_SID'], ENV['TWILIO_TOKEN']

    @twilio_client.account.sms.messages.create(
      :from => ENV['TWILIO_PHONE_NUMBER'],
      :to => to,
      :body => "Your verification code is #{user.verification_code}."
    )
  end
end
``` 
- Trên đây là hướng dẫn để xác thực số điện thoại bằng tin nhắn văn bản các bạn có thể tham khảo về áp dụng cho dự án của mình. 
- Tài liệu tham khảo: https://www.twilio.com/docs/verify/quickstarts/ruby-rails