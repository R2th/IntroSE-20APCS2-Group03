Chắc hẳn trong các bạn đã nhiều lần sử dụng bảo mật 2 lớp cho rất nhiều tài khoản. Hôm nay mình xin hướng dẫn tạo bảo mật 2 lớp cho tài khoản. Như ở [Phần 1](https://viblo.asia/p/twilio-sms-p1-L4x5xwvglBM) mình đã hướng dẫn các bạn cách gửi SMS thông qua twilio, giờ bối cảnh sẽ là khi người dùng đăng kí, nhập số điện thoại, sẽ gửi code dưới dạng sms về số điện thoại bạn vừa đăng kí, nhập code, login thành công, twilio gửi tin nhắn về điện thoại thông báo bạn đã hoàn thành việc tạo tài khoản. Bây giờ chúng ta cùng bắt đầu nhé.

## 1. Tạo project, cài đặt môi trường
1.1 Tạo project, thêm 1 số gem cần thiết 
Ở đây mình sẽ tập trung nói vào những phần chính nên những phần cơ bản như tạo project, tạo view các kiểu mình sẽ không nói quá sâu. Sau khi khởi tạo project xong các bạn thêm 2 gem dưới đây:

```
gem 'twilio-ruby', '~>5.0.0'
gem 'authy'
```

1.2 Thêm file .env
Để phục vụ việc authen thì các bạn cần thêm một số biến vào file env hoặc vào rails c export các file này vào
- `export AUTHY_API_KEY=***************************`
api key này mình sẽ lấy ở trên trang web https://dashboard.authy.com trang web này sẽ thống kê các tin nhắn auth mà bạn đã gửi, nếu bạn chưa có tài khoản thì tạo 1 tài khoản, hoặc nếu bạn đã có tài khoản twilio thì đăng nhập bằng twilio nhé. Sau khi đăng nhập thành công chúng ta sẽ lấy được API KEY ở đây:

![](https://images.viblo.asia/1e9c7839-3c6a-4977-b78d-62e16b95a7ca.png)

## 2. Thiết lập routes
```
Rails.application.routes.draw do

  get "users/verify", to: 'users#show_verify', as: 'verify'
  post "users/verify"
  post "users/resend"

  # Create users
  resources :users, only: [:new, :create, :show]

  # Home page
  root 'main#index'

end
```

## Tạo view đăng kí User
```
<h1>We're going to be *BEST* friends</h1>
<p> Thanks for your interest in signing up! Can you tell us a bit about yourself?</p>

<% if @user.errors.any? %>
  <h2>Oops, something went wrong!</h2>

  <ul>
    <% @user.errors.full_messages.each do |error| %>
      <li><%= error %></li>
    <% end -%>
  </ul>
<% end -%>

<%= form_for @user do |f| %>
  <div class="form-group">
    <%= f.label :name, "Tell us your name:" %>
    <%= f.text_field :name, class: "form-control", placeholder: "Zingelbert Bembledack" %>
  </div>
  <div class="form-group">
    <%= f.label :email, "Enter Your E-mail Address:" %>
    <%= f.email_field :email, class: "form-control", placeholder: "me@mydomain.com" %>
  </div>
  <div class="form-group">
    <%= f.label :password, "Enter a password:" %>
    <%= f.password_field :password, class: "form-control" %>
  </div>
  <div class="form-group">
    <%= f.label :country_code %>
    <%= f.text_field :country_code, class: "form-control", id: "authy-countries" %>
  </div>
  <div class="form-group">
    <%= f.label :phone_number %>
    <%= f.text_field :phone_number, class: "form-control", id: "authy-cellphone" %>
  </div>
  <button class="btn btn-primary">Sign up</button>
<% end -%>
```
## 3. Tạo controller đăng kí User
Để phục vụ cho việc đăng kí User các bạn tạo UsersController nhé. Ở method create code sẽ như sau:

```
def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      authy = Authy::API.register_user(
        email: @user.email,
        cellphone: @user.phone_number,
        country_code: @user.country_code
      )
      @user.update(authy_id: authy.id)
      Authy::API.request_sms(id: @user.authy_id, :force => true)

      redirect_to verify_path
    else
      render :new
    end
  end
```

Ở đây thằng Authy::API sẽ tạo ra một user dựa trên email, phone_number và khi register thành công sẽ trả ra một id, mình sẽ lưu lại id vào column authy_id của bảng user. Tiếp theo sau khi create cũng như lấy đc `authy_id`, Authy::API sẽ gọi đến method gửi sms, và nếu thành công 1 sms chứa code sẽ được gửi về số điện thoại mà bạn đã đăng kí.
Bây giờ bạn cần phải config biến môi trường trong file `secrets.yml` 
```
development:
  secret_key_base: 2995cd200a475082070d5ad7b11c69407a6219b0b9bf1f747f62234709506c097da19f731ecf125a3fb53694ee103798d6962c199603b92be8f08b00bf6dbb18
  authy_key: <%= ENV["AUTHY_API_KEY"] %>
```
Để lấy được AUTHY_API_KEY bạn cần đăng nhập vào Authy tại [đây](https://www.twilio.com/console/authy/applications). Sau khi bạn đã đăng nhập thành công bạn lấy Key authy như dưới
![](https://images.viblo.asia/abd11f0a-bf31-460d-97c3-90ca994bb1a5.png)https://images.viblo.asia/abd11f0a-bf31-460d-97c3-90ca994bb1a5.png

Tiếp theo sau khi đã gửi sms thành công, thì mình sẽ redirect đến trang để nhập mã code sẽ gửi về số điện thoại, view nhập code như bên dưới
```
<p>
    Your account has been created, but we need to make sure you're a human
    in control of the phone number you gave us. Can you please enter the 
    verification code we just sent to your phone?
</p>
<%= form_tag users_verify_path do %>
  <div class="form-group">
    <%= label_tag :code, "Verification Code:" %>
    <%= text_field_tag :token, '', class: "form-control" %>
  </div>
  <button type="submit" class="btn btn-primary">Verify Token</button>
<% end -%>

<hr>
<%= form_tag users_resend_path do %>
  <button type="submit" class="btn">Resend code</button>
<% end -%>
```

## 5. Verify code
Sau khi bạn đoạn code được gửi về tin nhắn của bạn, bạn sẽ cần phải quay lại view ở trên nhập đoạn code đó vào. Và Authy sẽ phải verify đoạn code này
```
def verify
    @user = current_user

    # Use Authy to send the verification token
    token = Authy::API.verify(id: @user.authy_id, token: params[:token])

    if token.ok?
      # Mark the user as verified for get /user/:id
      @user.update(verified: true)

      # Send an SMS to the user 'success'
      send_message("You did it! Signup complete :)")

      # Show the user profile
      redirect_to user_path(@user.id)
    else
      flash.now[:danger] = "Incorrect code, please try again"
      render :show_verify
    end
  end
```
Như bạn thấy ở trên Authy sẽ gọi method verify để kiểm tra authy_id của user cũng như code mình nhập vào `token = Authy::API.verify(id: @user.authy_id, token: params[:token])`.
Nếu thành công thì nó sẽ gửi tin nhắn về cho bạn ` send_message("You did it! Signup complete :)"`
Hàm `send_message` thì cũng tương tự như mình đã trình bày ở phần 1:
```
def send_message(message)
    @user = current_user
    twilio_number = ENV['TWILIO_NUMBER']
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    @client = Twilio::REST::Client.new account_sid, ENV['TWILIO_AUTH_TOKEN']
    message = @client.api.accounts(account_sid).messages.create(
      :from => twilio_number,
      :to => @user.country_code+@user.phone_number,
      :body => message
    )
  end
```
Ngoài ra khi bấm resend, thì Authy cũng gửi lại về cho bạn 1 đoạn code để bạn xác minh lại từ đầu. Đoạn code resend sẽ như sau:
```
def resend
    @user = current_user
    Authy::API.request_sms(id: @user.authy_id)
    flash[:notice] = 'Verification code re-sent'
    redirect_to verify_path
  end
```

Vậy là mình đã kết thúc bài viết giới thiệu về gửi tin nhắn tự động thông qua Twllio cũng như bảo mật 2 lớp bằng số điện thoại. Các bạn có thắc mắc gì có thể để lại comment bên dưới nhé