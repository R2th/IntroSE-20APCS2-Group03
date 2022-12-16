Bài Viblo này là một câu chuyện hơi dài dòng, cũng lại đến từ một bạn cùng khóa thực tập với mình: 

Ngày mình mới nhận câu hỏi:

![](https://images.viblo.asia/c0a8573a-7e77-4d4e-8f45-dc9587743549.jpg)

Lúc đầu mình thấy game này dễ v l, làm vài tiếng chắc là xong. Thôi bỏ đấy đi chơi, tuần này còn phải xem Dissneeland 7, tuần sau rồi làm, mình để deadline tận một tuần cơ mà.  Sang tuần, bắt tay vào giải quyết vấn đề được một ngày thì:

![](https://images.viblo.asia/cd825583-946e-4ae9-af0b-5f42d9acb1cc.png)

![](https://images.viblo.asia/816811e7-1d67-4932-bebd-08ec15d5dfdf.jpg)

Sau khi xác định lại bài toán, vật lộn thêm tổng cộng 2 ngày thì cũng xong.

Đấy , nên chốt lại là ở bài này, chúng ta sẽ cùng nhau giải quyết bài toán gửi mail chúc mừng sinh nhật khách hàng, từ đó giải thích cho Nhật Vy hiểu được 2 vấn đề:
* Cách mà AcionMailer hoạt động.
* Cách gửi mail dưới dạng background job thông qua việc sử dụng ActiveJob và Sidekiq.


## Part I: Sử dụng ActionMailer để gửi mail trong Rails application?
Phần này mình sẽ trình bày một số khái niệm, cách cấu hình để chúng ta giải quyết một bài toán cơ bản:

> Bài toán 1: Mỗi khi user đăng nhập, ta gửi một email chào mừng đến hòm thư của user (ở đây mình dùng gmail)

### 1.  Mailer là gì, cách khởi tạo?
Chúng ta đều thấy mỗi khi ta tạo một rails app bằng macro `rails new app_name`, nó sẽ tự động làm một loạt các hành động khó hiểu, nhưng cái chúng ta quan tâm nhất thường là thư mục `app ` .
```
create  app
      create  app/assets/config/manifest.js
      create  app/assets/javascripts/application.js
      create  app/assets/javascripts/cable.js
      create  app/assets/stylesheets/application.css
      create  app/channels/application_cable/channel.rb
      create  app/channels/application_cable/connection.rb
      create  app/controllers/application_controller.rb
      create  app/helpers/application_helper.rb
      create  app/jobs/application_job.rb
      create  app/mailers/application_mailer.rb
      create  app/models/application_record.rb
      create  app/views/layouts/application.html.erb
      create  app/views/layouts/mailer.html.erb
      create  app/views/layouts/mailer.text.erb
      create  app/assets/images/.keep
      create  app/assets/javascripts/channels
      create  app/assets/javascripts/channels/.keep
      create  app/controllers/concerns/.keep
      create  app/models/concerns/.keep

```
Khi mới học lập trình với rails ở mức độ cơ bản, chúng ta thường chỉ quan tâm đến `controller`, `assets` , `views` , `helper`. Còn trong bài viết ngày hôm nay, mình sẽ giải thích cho các bạn và Nhật Vy hiểu thêm về `mailer` và `job`, xem hai thư mục này dùng để chứa những thứ gì.

**Đầu tiên, thư mục `mailer` chứa những thứ gì?** . Nó đơn giản là tập hợp của các class kế thừa từ `ActionMailer::Base` , ví dụ: 
```ruby
# app/mailers/application_mailer.rb
class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout 'mailer'
end
 
# app/mailers/user_mailer.rb
class UserMailer < ApplicationMailer
end
```
Các `mailer` có nhiều điểm tương đồng với các `controller` , chúng ta có thể tạo ra `mailer` bằng macro :
```
$ bin/rails generate mailer UserMailer
create  app/mailers/user_mailer.rb
create  app/mailers/application_mailer.rb
invoke  erb
create    app/views/user_mailer
create    app/views/layouts/mailer.text.erb
create    app/views/layouts/mailer.html.erb
invoke  test_unit
create    test/mailers/user_mailer_test.rb
create    test/mailers/previews/user_mailer_preview.rb
```
Như chúng ta đã thấy, macro này tạo ra một class `mailer` (có thể là hai nếu `application_mailer.rb` chưa tồn tại) , một thư mục `views` và một thư mục `test` giống như cách mà `controller`được tạo ra. Ngoài ra, tất nhiên chúng ta có thể tạo `mailer` theo cách thủ công - tạo một class kế thừa `ActionMailer::Base` (Hoặc `ApplicationMailer` )
```ruby
class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout 'mailer'
end
class MyMailer < ActionMailer::Base
end
```

### 2. Edit mailer
Tạo được `mailer` rồi, bây giờ chúng ta cần thêm vào vài dòng code đủ để `mailer` thực hiện đúng vai trò của nó. Đầu tiên, chúng ta cùng tạo ra một `method` `welcome_email`
```ruby
class UserMailer < ApplicationMailer
  def welcome_email
    @user = params[:user]
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end
end
```
Ở đây, chúng ta cần chú ý đến `method` `mail` . Tham số của `method` này là một `hash` chứa các giá trị trong thông điệp mà email truyền tải, ví dụ như `subject:` , `date:`, `content-type:`, ..... Để một email được gửi, chúng ta tối thiểu phải set được hai giá trị tương ứng với hai key:
* `to:` email của người nhận. 
* `from:` Tên của người gửi. 
Nếu một trong hai `key` này không được `set value` , mail sẽ không được gửi. Các bạn không nhất thiết phải set các giá trị này ở đằng sau method `mail`, có thể set nó ở `default` hash cũng được. Ví dụ:
```ruby
class ApplicationMailer < ActionMailer::Base
  default from: 'hieu@example.com', to: "receiver@example.com"
  layout 'mailer'
end
```
Chỉ khác là, `default` hash chứa các giá trị mặc định. Nếu ở sau method `mail` các giá trị này không được set, thì `Rails` sẽ lấy giá trị của `default` hash để thay thế.

### 3. Edit views
Cách `mailer` render view cũng khá giống `controller`. Ở trong Mailer, các `method` cũng được gọi là `action`. Mặc định khi thực hiện một `action` trong `mailer` , `view` được render để gửi đi sẽ có cùng tên với `action` . Tức là với `action` `UserMailer#welcome_email`, `Rails` sẽ tìm đến file `views/user_mailer/welcome_email.html.erb` để `render` . Vậy ta cùng tạo một file `welcome_email.html.erb` như sau:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
  </head>
  <body>
    <%= message.subject = 'This is my subject line' %>
    <h1>Welcome to example.com, <%= @user.name %></h1>
    <p>
      You have successfully signed up to example.com,
      your username is: <%= @user.email %>.<br>
    </p>
    <p>
      To login to the site, just follow this link: <%= @url %>.
    </p>
    <p>Thanks for joining and have a great day!</p>
  </body>
</html>
```
Đó thế là xong cái views.

### 4. Cấu hình biến môi trường với gem figaro.
Để gửi được email từ Mailer, chúng ta phải có cấu hình một hộp thư điện tử dành riêng cho ứng dụng(ở đây mình sử dụng gmail). Từ đó, ứng dụng của chúng ta có thể tự động đăng nhập và gửi thư từ hộp thư được cung cấp. Để làm được điều này, chúng ta phải cấu hình một số biến môi trường chứa các thông tin cần được bảo mật - cụ thể như "username" và "password" của tài khoản gmail. Công việc này vốn là khá phức tạp, nhưng với sự xuất hiện của `gem figaro` mọi chuyện trở lên đơn giản hơn nhiều. 
Đầu tiên, các bạn cần thêm vào `Gemfile` 
```ruby
gem "figaro"
```
sau đó chạy `bundle exec figaro install` .  Điều này tương tự với việc một file `application.yml` được tạo và được bỏ vào `.gitignore` . Sau đó, trong file `application.yml` bạn cấu hình như này:
```ruby
gmail_username: 'username@gmail.com' #Viết địa chỉ mail của bạn vào
gmail_password: 'Gmail password' #Cả password nữa
```
Bạn có thể kiểm tra trong log xem biến mỗi trường của bạn đã được cài đặt chưa. Nào cùng `rails c` một cái: 
```ruby
irb(main):002:0> ENV['gmail_username']
=> "username@gmail.com"
irb(main):002:0> ENV['gmail_username']
=> "Gmail password"
```
Và bước cuối cùng, cấu hình file `application.rb`
```ruby
config.action_mailer.delivery_method = :smtp
# SMTP settings for gmail
  config.action_mailer.smtp_settings = {
   :address              => "smtp.gmail.com",
   :port                 => 587,
   :domain               => "gmail.com",
   :user_name            => ENV['gmail_username'],
   :password             => ENV['gmail_password'],
   :authentication       => "plain",
   :enable_starttls_auto => true
  }
```

Xong thì nhớ reset lại server nhé!.

### 5, Gửi mail thôi!
Gửi mail là một bước vô cùng đơn giản, bạn chỉ cần đặt được câu lệnh dưới đây vào bất kỳ nơi nào mà nó có thể chạy được. Nhanh nhất là để nó ở trong `Rails console`
```ruby
UserMailer.welcome_email.deliver_now
```
Và cùng xem cách nó chạy:
```ruby
irb(main):004:0> UserMailer.welcome_email.deliver_now
UserMailer#welcome_email: processed outbound mail in 0.6ms
Traceback (most recent call last):
        3: from (irb):4
        2: from (irb):4:in `rescue in irb_binding'
        1: from app/mailers/user_mailer.rb:4:in `welcome_email'
NoMethodError (undefined method `[]' for nil:NilClass)
```
Ú ù, nó có cái lỗi gì kỳ thế nhỉ. Sau khi check lại đoạn `Exception` mình đã nhận ra một dòng code có vấn đề ở trong `controller` .
```ruby
def welcome_email
    @user = params[:user] #Là cái dòng này có lỗi nè
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end
```
Cụ thể cái `Exception` `NoMethodError (undefined method "[]" for nil:NilClass)` muốn nói với chúng ta rằng, params hiện tại không có gì hết ( `nil` ) . Đến đây chúng ta sẽ có một câu hỏi khá thú vị , đó là :
> Làm sao để truyền được các giá trị vào params trước khi nhảy đến `action` trong `Mailer` ?

Trước khi nhảy đến `controller` , trong `views` chúng ta có thể dùng các `form helper` để truyền giá trị vào `params` . Còn đối với `mailer`, mình mới chỉ tìm ra một cách, đó là sử dụng `class method` `with` . Cụ thể nếu chúng ta muốn truyền `params[:user] = User.first` , có thể truyền như sau: 
```ruby
UserMailer.with(user: User.first).welcome_email.deliver_now
```
Và cùng xem cách nó chạy: 
```ruby
irb(main):001:0> UserMailer.with(user: User.last).welcome_email.deliver_now
   (0.2ms)  SET NAMES utf8,  @@SESSION.sql_mode = CONCAT(CONCAT(@@sql_mode, ',STRICT_ALL_TABLES'), ',NO_AUTO_VALUE_ON_ZERO'),  @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
  User Load (0.4ms)  SELECT  `users`.* FROM `users` ORDER BY `users`.`id` DESC LIMIT 1
  Rendering user_mailer/welcome_email.html.erb within layouts/mailer
  Rendered user_mailer/welcome_email.html.erb within layouts/mailer (18.0ms)
UserMailer#welcome_email: processed outbound mail in 415.3ms
Sent mail to hieusiphone@gmail.com (3711.4ms)
Date: Tue, 05 Mar 2019 20:10:34 +0700
From: hieu@example.com
To: hieusiphone@gmail.com
Message-ID: <5c7e754abb1f9_f002b09e83b7960618fc@troublehfrom18.mail>
Subject: This is my subject line
Mime-Version: 1.0
Content-Type: text/html;
 charset=UTF-8
Content-Transfer-Encoding: 7bit

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>
      /* Email styles need to be inline */
    </style>
  </head>

  <body>
    <!DOCTYPE html>
<html>
  <head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
  </head>
  <body>
    This is my subject line
    <h1>Welcome to example.com, </h1>
    <p>
      You have successfully signed up to example.com,
      your username is: hieusiphone@gmail.com.<br>
    </p>
    <p>
      To login to the site, just follow this link: http://example.com/login.
    </p>
    <p>Thanks for joining and have a great day!</p>
  </body>
</html>

  </body>
</html>

=> #<Mail::Message:47321592260200, Multipart: false, Headers: <Date: Tue, 05 Mar 2019 20:10:34 +0700>, <From: ahihi@example.com>, <To: hieusiphone@gmail.com>, <Message-ID: <5c7e754abb1f9_f002b09e83b7960618fc@troublehfrom18.mail>>, <Subject: This is my subject line>, <Mime-Version: 1.0>, <Content-Type: text/html>, <Content-Transfer-Encoding: 7bit>>
```
Mail cũng đã đến được hộp thư của mình rồi nè: 

![](https://images.viblo.asia/166ecd4a-cdb9-4b3d-9108-d65b5651b5b5.png)

Giờ thì chúng ta cùng nhớ về bài toán mình đặt ra ở đầu bài, đó là "Mỗi khi người dùng đăng nhập, chúng ta sẽ gửi một email chào mừng". Thế thì bước cuối cùng để giải quyết bài toán này chính là tìm ra vị trí để đặt dòng lệnh dưới đây: (gọi nó là **dòng lệnh (1)**  )
```ruby
UserMailer.with(user: current_user).welcome_email.deliver_now
```
Vị trí đặt **dòng lệnh (1)** của chúng ta phải là nơi mà đáp ứng được hai điều kiện:
* Nơi mà `session` đã được `create` ( log_in thành công) 
* Nơi mà chúng ta có thể truyền được `current_user`  ( hoặc một biến nào đó có giá trị là user vừa đăng nhập)

Đến đây cũng tùy vào việc các bạn làm chức năng `log_in` như thế nào, thường là có hai cách làm chức năng `log_in` với rails : 
* Tự tạo `sessions_controller`
* Sử dụng `gem devise`

Với cách đầu tiên thì quá đơn giản vì các bạn hoàn toàn làm chủ `sourecode` của mình , các bạn có thể đặt **dòng lệnh (1)** trong `action create` . Ví dụ:
```ruby
def create
    user = User.find_by email: params[:session][:email].downcase

    if user&.authenticate params[:session][:password]
      log_in user
      #Thêm vào đây nè
      UserMailer.with(user: user).welcome_email.deliver_now
      params[:session][:remember_me] == "1" ? remember(user) : forget_user(user)
      session[:forwarding_url]
      redirect_back_or user
    else
      flash.now[:danger] = t ".require_login"
      render :new
    end
  end
```
Còn nếu bạn làm `log_in` với `gem devise`, `sourecode` của gem này khá phức tạp nên sẽ làm cho bạn hơi bối rối. Bạn sẽ phải băn khoăn ngồi dò `sourecode` để tìm vị trí mà có thể truyền `current_user` vào trong **dòng lệnh (1)**. Nhưng vì bạn đã đọc đến tận dòng này trong bài viết của mình, nên thôi thì để mình bày cho bạn một cách khá đơn giản. Đó là `override` lại `method` `after_sign_in_path_for user` trong `sourecode` của `devise` . Cụ thể là như này:
```ruby
def after_sign_in_path_for user
    UserMailer.with(user: current_user).welcome_email.deliver_now
    super
 end
```
Cái method nói trên đơn giản là nó trả lại một đường dẫn mà `Rails` sẽ `redirect` đến sau khi đăng nhập. Nó vừa khéo lại đáp ứng đủ 2 điều kiện đặt dòng lệnh (1) của chúng ta. Thực ra cũng còn nhiều cách để đặt dòng lệnh này, ví dụ chúng ta có thể custom lại `session_controllers` của `devise` và sử dụng hàm callback `after_action :current_welcome_mail, only: :create` . Nhưng mà thôi, mình nghĩ cách bên trên là đơn giản nhất rồi. Đến đây là **bài toán 1** đã hoàn toàn được giải quyết, và nó là nền tảng chính để chúng ta giải quyết bài toán chính ở đầu bài:
> Bài toán chính: Gửi mail chúc mừng sinh nhật user dưới dạng background job?

Ở part số 2, mình sẽ trả lời đầy đủ câu hỏi này giúp Nhật Vy nhé! Sau bài viết này, thì ít nhất em đã hiểu cơ bản về cách hoạt động của ActionMailer rồi đúng không nào.

### 6.Lời chúc nhè nhẹ!
À hôm nay ngày 05/03 là ngày sinh nhật của Nhật Vy, cũng phải nói là số em khá là đỏ. Anh viết bài này từ ngày 04/03 và dự kiến 05/03 là xong. Sáng anh mở facebook nên mới biết hôm nay là sinh nhật em, nên thôi thì anh cố đến giờ là 21:10 phải làm xong một bài Viblo trả lời câu hỏi cho em. 
Đấy tóm lại là anh chúc em sang tuổi mới kiu như anh và ra trường đúng hạn, sớm được làm ở chỗ em thích nhé. <3 <3

### 7. Có part 2 rồi mà chả ai xem nhỉ, ít views thế. 
Link part 2 nè: [Part 2](https://viblo.asia/p/rails-question-nhat-vy-part-2-bai-toan-gui-mail-chuc-mung-sinh-nhat-duoi-dang-background-job-trong-rails-naQZRYXQKvx)

----
References:

Devise: https://github.com/plataformatec/devise

ActionMailer: https://guides.rubyonrails.org/action_mailer_basics.html

Figaro: https://github.com/laserlemon/figaro