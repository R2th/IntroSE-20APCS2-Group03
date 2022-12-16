## Đăng ký tài khoản
**Để bắt đầu thực hiện cần phải có một tài khoản Twilio**: https://www.twilio.com/docs/sms/tutorials/two-factor-authentication-ruby-rails

**Sau khi đăng ký thành công:**
* Nhớ bật Geo-permission (Quyền địa lý) cho Việt Nam.
* Cần chú ý đến giá trị của: 
     * ACCOUNT SID <br>
    * AUTH TOKEN <br>
    * NUMBER (https://www.twilio.com/console/phone-numbers/incoming): số điện thoại người gửi.


> **Vì đây là tài khoản free nên chỉ có thể gửi cho một vài số điện thoại mà bạn đã xác thực trước, click vào link xác thực số điện thoại để có thể test:** https://www.twilio.com/console/phone-numbers/verified

## Thiết lập ứng dụng

**New 1 project mới:**
```
rails new sms-two-factor-Authentication
```

**Cài đặt gem:**
```
gem "twilio-ruby"
gem "dotenv-rails"
```

**Thiết lập biến môi trường bằng gem "dotenv-rails"**: tạo file **.env**   ở thư mục root:
```
TWILIO_ACCOUNT_SID: "xxx"
TWILIO_AUTH_TOKEN: "xxx"
TWILIO_NUMBER: "xxx"
```

## Thực hiện
Sau khi đã chuẩn bị các thiết lập môi trường, thì tiếp đến thực hành: <br>
**Tạo Scaffold User:** để xây dựng trước form đăng ký.
```
rails g scaffold User email:string phone_number:string
```
**Thêm vào bảng User 3 cột sau:** để lưu mã OTP và active User
```
rails g migration add_verification_code_to_users verification_code:string activated:boolean activated_at:datetime
```

**Tiếp theo tạo 3 file sau ở thư mục lib:** <br>
lib/confirmation_sender.rb
```
module ConfirmationSender
  def self.send_confirmation_to(user)
    verification_code = CodeGenerator.generate
    user.update(verification_code: verification_code)
    MessageSender.send_code(user.phone_number, verification_code)
  end
end
```

lib/code_generator.rb
```
module CodeGenerator
  def self.generate
    rand(100000...999999).to_s
  end
end
```
lib/message_sender.rb
```
module MessageSender
  def self.send_code(phone_number, code)
    account_sid = ENV["TWILIO_ACCOUNT_SID"]
    auth_token  = ENV["TWILIO_AUTH_TOKEN"]
    client = Twilio::REST::Client.new(account_sid, auth_token)

    message = client.messages.create(
      from:  ENV["TWILIO_NUMBER"],
      to:    phone_number,
      body:  code
    )

    message.status == "queued"
  end
end
```

**Thêm dòng sau vào config/application.rb để có thể sử dụng các file thư viện vừa tạo:**
```
config.autoload_paths << Rails.root.join("lib")
```

**Tiếp theo tạo confirmations_controller.rb**
```
rails g controller confirmations new create
```
**config routes**
```
Rails.application.routes.draw do
  resources :users do
    resources :confirmations, only: %i|new create|
  end
end
```
**Ở users_controller.rb #create**
```
def create
    @user = User.new(user_params)
    if @user.save
      ConfirmationSender.send_confirmation_to(@user)
      flash[:success] = "User was successfully created."
      redirect_to new_user_confirmation_path(@user)
    else
      flash.now[danger] = "Create user failed."
      render :new
    end
  end
```
**Ở confirmations_controller.rb**
```
class ConfirmationsController < ApplicationController
  def new; end

  def create
    @user = User.find_by id: params[:user_id]
    if @user.verification_code == verification_params[:verification_code]
      @user.update_attributes(activated: true, activated_at: Time.zone.now)
      flash[:success] = "Authenticated user successfully"
      redirect_to @user
    else
      flash[:danger] = "Authenticated user failed"
      redirect_to :new
    end
  end

  private

  def verification_params
    params.require(:confirm).permit :verification_code
  end
end
```

**Tiếp theo là tạo form để nhập mã xác thực app/views/confirmations/new.html.erb**
```
<%= form_for :confirm, url: user_confirmations_path, method: :POST do |f|%>
  <%= f.label :verification_code %>
  <%= f.text_field :verification_code %>

  <%= f.submit "Submit"%>
<% end %>
```

## Bước cuối cùng là chạy server và test:
![](https://images.viblo.asia/a60c0382-0ad8-4472-86d7-ab4d89044016.png)
![](https://images.viblo.asia/18b67fdb-3522-48a2-9f4f-d5858fabef23.png)<br>
**Ở điện thoại mình cũng nhận được mã xác thực.** <br><br>
![](https://images.viblo.asia/e3d8661a-6ddb-4a6b-a059-1859c8038862.png)<br>
![](https://images.viblo.asia/d4409cdd-3c7f-41b0-9c1b-2536d5eba546.png)<br>
**Kết quả:**<br><br>
![](https://images.viblo.asia/6a3cb7cd-75ce-44e7-a823-157b177964c9.png)

**Trên là hướng dẫn cơ bản để xác thực User bằng cách gửi mã OTP qua số điện thoại sử dụng Twilio. Trên trang tutorials của Twilio còn nhiều hướng dẫn khác, những ai là người mới làm quen với Twilio có thể tham khảo thêm ở đây https://www.twilio.com/docs/tutorials**
## Nguồn
https://www.twilio.com/docs/sms/tutorials/two-factor-authentication-ruby-rails