## Giới thiệu
Mailgun là một email service được cung cấp bởi Rackspace, dựa trên cloud để  gửi, nhận và theo dõi email được gửi qua các ứng dụng web. Các tính năng của Mailgun có sẵn thông qua API RESTfull hoặc gửi truyền thống như SMTP. Bài viết này là hướng dẫn để xây dựng chức năng gửi email trong Rails và làm việc với Mailgun.
## Tạo tài khoản Mailgun
Để bắt đầu test ta cần phải có 1 tài khoản Mailgun (điều kiện là phải có thẻ visa để active tài khoản), ban đầu thì chúng ta chỉ cần 1 tài khoản free thôi. [đăng ký tại đây](https://signup.mailgun.com/new/signup_addons). <br>
Sau khi đăng ký vì tài khoản là tài khoản free bị giới hạn email gửi nên ta cần phải thêm địa chỉ email nhận trước để test. <br> Vào 
**Dashboard** -> **click vào domain có dạng sandbox...mailgun.org** -> **và nhập email nhận ở Authorized Recipients** <br>
![](https://images.viblo.asia/4ba8104a-798b-43dc-84b5-57160ef83c42.png)

Sau khi click **Save Recipient** ở hộp thư của email vừa nhập sẽ có thông báo như thế này:
![](https://images.viblo.asia/cf1fd930-3c73-4aca-bf68-f8e0ce76ea05.png) <br>
Click đồng ý thì có thể nhận email từ domain test này. 

**Chú ý**: Ở hình trên ta click vào **API keys** để xem **Private API key** sau này sẽ dùng để config cho ứng dụng rails của chúng ta:

## Thêm vào ứng dụng của bạn

**Tiếp theo là tạo ứng dụng rails của bạn:**
```
rails g demo_mailgun -d mysql
rails db:create
rails g scaffold user name:string email:string
rails db:migrate
```

**Thêm vào Gemfile:**
```
gem "mailgun-ruby"
gem "dotenv-rails"
```
Chạy bundle install, sau đó tạo file **.env** ở thư mục root,  thêm vào:
```
MAILGUN_API_KEY= "xxx" // là Private API key mình đã note ở trên.
MAILGUN_DOMAIN = "sandbox....mailgun.org" // là domain trên mailgun
```

**Tiếp theo là config trên rails**: <br>
**config/initializers/mailgun.rb**
```
Mailgun.configure do |config|
  config.api_key = ENV["MAILGUN_API_KEY"]
end
```
**config/environments/development.rb**
```
  config.action_mailer.default_url_options = {host: "localhost:3000"}
  config.action_mailer.perform_deliveries = true
  config.action_mailer.delivery_method = :mailgun
  config.action_mailer.mailgun_settings = {
	api_key: ENV["MAILGUN_API_KEY"],
    domain: ENV["MAILGUN_DOMAIN"],
  }
```

**Tiếp theo:** <br>
`rails g mailer user_mailer `<br>
Vào **app/mailers/application_mailer.rb** thay đổi địa chỉ email mặc định thành địa chỉ email bạn muốn sử dụng để làm địa chỉ người gửi.
```
class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout "mailer"
end
```
Tiếp theo tạo một method trong **app/mailers/user_mailer.rb** để có thể tùy chỉnh việc gửi email:
```
def welcome_user user
  @user = user
  mail to: @user.email,
       subject: "Welcome #{user.name}"
end
```

Bước tiếp theo viết nội dung muốn gửi đến User
**app/views/example_mailer/welcome_user.text.erb**
```
Hi <%= @user.name %>
You have successfully registered
Welcome to us.
```

Cuối cùng là gọi event gửi email sau khi User được tạo thành công:
```
def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
      
        UserMailer.welcome_user(@user).deliver
       
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
 end
```

Giờ thì test thử xem việc gửi email có hoạt động hay chưa. Ở form http://localhost:3000/users/new 
<br>
![](https://images.viblo.asia/480c7075-a50a-452b-89d0-9198562de053.png) <br>
<br>
Điền thông tin name và email và bấm submit thì đây là kết quả:
![](https://images.viblo.asia/419099dc-6ee1-4956-872f-e4cbf8e11ef9.png)

Như vậy là việc gửi email bằng ActionMailer và Mailgun thông qua Mailgun’s APIs đã hoạt động tốt, hy vọng bài viết giúp bạn phần nào làm việc với gửi email trên ứng dụng Rails và làm quen được với Mailgun.
## Nguồn
- https://support.rackspace.com/how-to/introduction-to-mailgun-email-automation/
- https://launchschool.com/blog/handling-emails-in-rails
- https://github.com/mailgun/mailgun-ruby