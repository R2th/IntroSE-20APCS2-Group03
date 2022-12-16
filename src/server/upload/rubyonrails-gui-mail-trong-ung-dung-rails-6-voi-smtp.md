Bài viết này là hướng dẫn cơ bản để xây dựng chức năng gửi mail đơn giản trong ứng dụng rails 6
# Google security
>Sau ngày 30 tháng 5 năm 2022, bạn không thể đăng nhập chỉ bằng tên người dùng và mật khẩu vào Gmail. Quyền truy cập ứng dụng kém an toàn hơn sẽ không khả dụng nữa trừ khi bạn có Google Workspace hoặc Google Cloud Identity. [Tham khảo](https://support.google.com/accounts/answer/6010255)

Hiểu một cách đơn giản google đã tăng tính bảo mật hơn cho tài khoản người dùng. Chúng ta sẽ không thể đăng nhập ứng dụng khác chỉ bằng `email` và `password`

Trước kia chỉ cần config như thế này là chúng ta đã có thể sử dụng dịch vụ mail dễ dàng =))

`config/environments/development.rb`
```
  host = 'http://localhost:3000/'
  config.action_mailer.default_url_options = { host: host }
 
  # SMTP settings for gmail
  config.action_mailer.smtp_settings = {
    :address              => "smtp.gmail.com",
    :port                 => 587,
    :user_name            => ENV['GMAIL_USERNAME'],
    :password             => ENV['GMAIL_PASSWORD'],
    :authentication       => "plain",
    :enable_starttls_auto => true
  }
```

Thay vào đó bây giờ chúng ta sẽ cần xác thực 2FA và tạo mật khẩu riêng cho ứng dụng.
Để hiểu rõ hơn hãy cùng mình xây dựng 1 ứng dụng rails đơn giản để mô tả lại chức năng gửi mail sử dụng ActionMailer. 

> Cách hoạt động của `ActionMailer` và cách tương tác gửi mail chắc hẳn mọi người đều nắm rõ rồi, trên google cũng rất nhiều bài hướng dẫn gửi mail trong ứng dụng rails. Nên mình đi vào vấn đề chính luôn.

# Khởi tạo
Trước tiên ta cần setup 1 ứng dụng rails đơn giản, ở đây mình sử dụng `scaffold` cho tiện nhé :)

```
rails new mailer -d postgresql
rails g scaffold user name:string email:string
rake db:migrate
```

sau đó chúng ta tạo một `ActionMailer`
```
rails g mailer example_mailer sample_email
```
![](https://images.viblo.asia/b3d35012-eaae-4b22-a20b-9f0d249c390f.png)

trong thư mục `app/mailers/application_mailer.rb` hãy thay đổi `default from: "xxx@gmail.com"` thành địa chỉ email của bạn

Tiếp theo bạn sửa lại nội dung mail 1 chút trong `app/views/example_mailer/sample_email.html.erb`
 cho dễ nhìn :)
 
 ```
 <!DOCTYPE html>
<html>
  <head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
  </head>
  <body>
    <h1>Hi <%= @user.name %></h1>
    <p>
       Xin chao minh la truong
    </p>
  </body>
</html>
 ```
 Vậy là xong bước chuẩn bị, tiếp theo chúng ta đi vào xây dựng chức năng gửi mail.
 
 vào `app/controllers/users_controller.rb` sửa lại action `create` user .
 Sau khi tạo thành công user thì gửi mail về địa chỉ email của user đó
 ` ExampleMailer.sample_email(@user).deliver`
 
 ```
 def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        ExampleMailer.sample_email(@user).deliver
        
        format.html { redirect_to user_url(@user), notice: "User was successfully created." }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end
 ```
 
# Gửi mail
Đầu tiên chúng ta cần config lại môi trường `development` để có thể gửi mail thành công với SMTP

`/config/environments/development.rb`
```
 config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp
  host = 'http://localhost:3000/'
  config.action_mailer.default_url_options = { host: host }
 
  # SMTP settings for gmail
  config.action_mailer.smtp_settings = {
    :address              => "smtp.gmail.com",
    :port                 => 587,
    :user_name            => ENV['GMAIL_USERNAME'],
    :password             => ENV['GMAIL_PASSWORD'],
    :authentication       => "plain",
    :enable_starttls_auto => true
  }
```

Biến môi trường: mình sử dụng gem `gem "figaro"` để setup các biến môi trường.
Đại khái sau khi install gem này thì sẽ cho chúng ta 1 file `application.yml` chúng ta chỉ cần thêm các biến môi trường tương ứng

`config/application.yml`

```
# Add configuration values here, as shown below.

GMAIL_USERNAME: "your_email@gmail.com"
GMAIL_PASSWORD: "xxx-xxx-xxx"
```
hoặc lười thì cũng có thể viết inline luôn như này :))
(`)
```
config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp
  host = 'http://localhost:3000/'
  config.action_mailer.default_url_options = { host: host }
 
  # SMTP settings for gmail
  config.action_mailer.smtp_settings = {
    :address              => "smtp.gmail.com",
    :port                 => 587,
    :user_name            => 'your_email@gmail.com',
    :password             => 'xxx-xxx-xxx',
    :authentication       => "plain",
    :enable_starttls_auto => true
  }
```
# xxx-xxx-xxx password ?
> Như mình đã nêu vấn đề ở đầu bài viết về việc google nâng cấp bảo mật. Vì vậy để gửi được mail với SMTP chúng ta cần phải xác thực 2FA cho tài khoản và tạo mới một mật khẩu ứng dụng.

## Bật 2FA
vào link: https://myaccount.google.com/signinoptions/two-step-verification/enroll-welcome để tiến hành bật 2FA

Kết quả sau khi hoàn thành: 
![](https://images.viblo.asia/83f250b9-c625-45d6-ae2e-ba34ca05b996.png)


## Tạo mật khẩu ứng dụng
vào link: https://myaccount.google.com/apppasswords để tạo mật khẩu ứng dụng chính là `xxx-xxx-xxx` sử dụng để config phía trên

Kết quả sau khi hoàn thành
![](https://images.viblo.asia/09d765fb-6d48-4c28-9e99-41fa818c2112.png)

`xxx-xxx-xxx` chúng ta cần chính là đoạn được tô màu vàng.

# Test
tạo mới user với email: `6789tyh@gmail.com`
![](https://images.viblo.asia/c9afa699-bc43-48d6-a4e1-757d5553f8de.png)

kết quả: ![](https://images.viblo.asia/d671601c-e239-4faf-882e-26776ec1ff45.png)

Vậy là đã nhận được mail.


# Kết luận
Trên đây là toàn bộ hiểu biết của mình về việc gửi mail trong ứng dụng rails. Các bạn có thể tham khảo và vận dụng vào dự án của mình. Mong nhận được nhận xét và ý kiến đóng góp từ phía bạn đọc.

# Tài liệu tham khảo
https://stackoverflow.com/questions/23137012/535-5-7-8-username-and-password-not-accepted

https://guides.rubyonrails.org/command_line.html