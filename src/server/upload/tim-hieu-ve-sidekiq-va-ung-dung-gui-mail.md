## 1. Giới thiệu
Trong cuộc sống ngày nay với hàng ngàn tác vụ được xử lý trong một trang web ở một thời điểm nào đó. Nếu như chúng ta không có những giải pháp để giải quyết những tác vụ này sẽ dẫn tới một trải nghiệm khá tệ với khách hàng khi server của chúng ta xử lý quá chậm. hay thậm chí có thể dẫn tới chết server. Giả sử bạn muốn gửi email tới các user sau khi đăng ký tài khoản ở trang web của bạn, sau đó bạn muốn gửi email tới những người này để xác nhận tài khoản. Nếu như đồng tới có tới hàng ngàn user cùng đăng ký tại một thời điểm, bạn sẽ phải đồng thời gửi tới hàng ngàn cái email với nội dung xác thực tài khoản, điều này sẽ dẫn tới việc phản hồi giữa server và client bị ảnh hưởng đáng kể. Chúng ta cần phải tìm ra một giải pháp làm sao để xử lý riêng biệt giữa các tác vụ, thì `background job` sẽ giúp chúng ta trong việc thực hiện các tác vụ theo một luồng riêng biệt và không ảnh hưởng tới trải nghiệm của người dùng mà các công việc sẽ đều được xử lý hết.
<br>
<br>
Nghe đến đây sẽ nhiều bạn newbie có thể sẽ thắc mắc là `background job` là gì. Thì ở bài này mình sẽ giới thiệu cho các bạn biết `background job` là gì, và các xử lý chúng ở trong ứng dựng Ruby on Rails, trong bài này mình sẽ sử dụng gem `sidekiq` để giới thiệu.
<br>
<br>
Ở bài viết này mình sẽ cùng các bạn tìm hiểu về những vấn đề sau:
* Background Job là gì?
* Sidekiq là gì ?
* Cấu trúc trong sidekiq
* Vòng đời 1 job trong Sidekiq
* Ứng dụng gửi email trong Ruby on Rails.

## 2. Background Job là gì?
- Các bạn có thể hiểu chúng được thực hiện như tên tiếng anh của chúng là “các công việc phía sau”, là những công việc hay tác vụ dược xử lý ngoài luồng request-response thông thường trong các ứng dụng web.
- Bình thường thì các trang web nhận request từ người dùng và trả về một response nhưng background job thì khác, nó bắt đầu từ một request đến website nhưng đòi hỏi thời gian thực thi lâu hơn so với bình thường, vì những request này không thể xử lý ngay lập tức và trả về response cho người dùng nên gọi là xử lý bất đồng bộ. Xử lý này không ảnh hưởng đến trang web vì các tiến trình xử lý này được thực hiện trên một luồng riêng biệt.

Ở đây mình có tìm được hai hình ảnh mà mình lấy được từ internet, trong bài này mình xin phép xử dụng chúng để mô tả cho các bạn xem quá trình của việc không dùng background job và việc sử dụng background job
![](https://images.viblo.asia/7e68f0ad-684b-4c3e-93f1-925429ef32d6.jpg)

Hình ảnh trên mô tả những tác vụ mà một trang web phải xử lý khi mà một người dùng submit một cái form. Nó tốn đến 3.7s cho tất cả các tác vụ trên, khá mất thời gian đúng không nào. GIờ   ta cùng xem tiếp một hình ảnh khác về việc trang web sử dụng `background job`
<br>

![](https://images.viblo.asia/aecacd3f-00b8-4519-9850-e496532c68bb.jpg)

Như các bạn cũng có thể thấy thì với việc lần này trang web xử dụng `background job` thì nó chỉ tốn có 0.3s để phản hồi lại cho người dùng. Giải thích qua một chút về quá trình trên thì người dùng chỉ cần cập nhật dữ liệu và server sẽ response lại cho người dùng, các công việc khác sẽ được đưa vào background job để xử lý lần lượt theo thứ tự.

**Tóm lại khi nào nên dùng background job :** Có thể tóm tắt lại là đối với những tác vụ cồng kềnh, phức tạp thì chúng ta nên sử dụng `backgroup job` để giải quyết các tác vụ mà tốn nhiều thời gian mà ảnh hưởng đến trải nghiệm của người dùng.
## 3. Sidekiq là gì?
* Sidekiq là một gem để xử lý background jobs trong Rails.
* Sidekiq được đánh giá cao hơn các gem khác trong việc xử lý background jobs như Resque, Delayed Jobs vì Sidekiq xử lý đa luồng và sử dụng Redis để thực hiện nhiều jobs.
* Redis được sử dụng để lưu trữ các jobs. Mặc định sidekiq kết nối với Redis server thông qua địa chỉ localhost:6379 trong môi trường development.
* Một trong những điều bạn cần biết thêm về sidekiq , đó là nó quản lý các job dưới dạng hàng đợi. Các job làm thất bại sẽ được đẩy xuống cuối hàng đợi và retry, tất cả theo thứ tự để việc quản lý các job trở lên dễ dàng.
## 4. Cấu trúc của sikekiq
Cấu trúc của nó gồm 3 phần chính :
### Sidekiq client
*  Đẩy jobs vào hàng đợi qua Redis như LPUSH..
*  Dùng hàm JSON.dump dể convert dữ liệu của 1 job thành hash
*  Các tham số của worker phải là các kiểu dữ liệu đơn giản như number, string, boolean, array, hash
*  Lưu trữ trong RAM

### Redis
*  Lưu trữ dữ liệu các jobs
*  Kết nối với Sidekiq tại localhost:6379 trong môi trường development
*  Lưu trữ dữ liệu trong RAM nên có tốc độ nhanh
### Sidekiq server
* Có trách nhiệm lấy jobs từ hàng đợi trong Redis để xử lý
* Sử dụng lệnh BRPOP của Redis để lấy jobs
* Server sẽ khởi động worker và gọi tới method perform với các tham số được truyền

## 5. Vòng đời của một job
![](https://images.viblo.asia/b6e8b3d8-20a7-453b-ac8a-a1c1a0d08bc5.png)
* Scheduled: Hàng đợi này gồm các jobs lập lịch được xếp theo thứ tự thời gian
* Enqueued: Chờ đến lượt trong processing queue (theo thứ tự thời gian trong hàng đợi)
* Busy: Đang thực thi job
* Processed: Thực thi thành công và không có hành động nào nữa
* Failed: Số lần các job thực hiện bởi Sidekiq và phát sinh lỗi (default 25). 
* Retries: Thất bại và sẽ tự động được thực thi lại trong tương lai(theo thứ tự thời gian), các job lỗi thì được chuyển về hàng đợi Retry
* Dead: Không được thực thi lại mà được lưu trữ lại để có thể thực thi bằng cách thủ công tại 1 thời điểm nào đó.
## 6. Ứng dụng gửi email trong Rails.
Đầu tiên mình sẽ tạo mới một project, trong bài này mình dùng rails 5.
```ruby
# đây là cú pháp để tạo chính xác cái version rails mà bạn mong muốn.
rails _5.2.1_ new sidekiq_demo 
```
TIếp theo tạo model User
```
rails g model user name:string email:string
```
sau đó migrate để tạo bảng user
```
rails db:migrate
```
giờ tạo thêm 1 controller để thêm mới user
```
rails g controller users new
```
Thêm code trong `routes.rb`
```ruby
Rails.application.routes.draw do
  resources :users
end
```
Thêm code trong `users/new.html.erb`. Ở đây mình chỉ làm tượng trưng đơn giản giao diện thôi nhé các bạn.
```ruby
<%= form_for @user, method: :post do |f| %>
  <%= f.text_field :name %>
  <%= f.submit %>
<% end %>
```
Trong `users_controller.rb`
```ruby
class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(name: params[:user][:name], email: params[:user][:email])
    if @user.save
      flash[:success] = "Register success"
      redirect_to new_user_path
    else
      flash[:danger] = "Register fail"
      render :new
    end
  end
end
```
Ok vậy là chúng ta đã hoàn thành xong việc tạo mới. Giờ chúng ta sẽ làm chức năng khi tạo mới users và sẽ gửi email đến email người dùng đăng ký.
<br>
Bước tiếp theo chúng ta sẽ gửi email đến người dùng vừa đăng ký. Đầu tiên tạo một mailer
```ruby
rails generate mailer UserMailer
```
File được sinh ra trong `app/mailers/user_mailer.rb`. Các bạn thêm đoạn code sau với nội dung
```ruby
class UserMailer < ApplicationMailer
  def welcome_email user
    @user = user
    mail(to: @user.email, subject: 'Welcome to Website')
  end
end
```
Ở trong Mailer, các method cũng được gọi là action. Mặc định khi thực hiện một action trong mailer , view được render để gửi đi sẽ có cùng tên với action . Tức là với action UserMailer#welcome_email, Rails sẽ tìm đến file views/user_mailer/welcome_email.html.erb để render . Vậy ta cùng tạo một file welcome_email.html.erb với nội dung:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
  </head>
  <body>
    <h1>Hello, welcome to my site</h1>
  </body>
</html>
```
Tiếp theo chúng ta cần phải cấu hình để gửi mail, các bạn vào `application.rb` thêm
```ruby
config.action_mailer.delivery_method = :smtp
# SMTP settings for gmail
  config.action_mailer.smtp_settings = {
   :address              => "smtp.gmail.com",
   :port                 => 587,
   :domain               => "gmail.com",
   :user_name            => ENV['your_email'],
   :password             => ENV['your_password'],
   :authentication       => "plain",
   :enable_starttls_auto => true
  }
```
để cài đặt biến môi trường cách bạn cần thêm gem `figaro`.  Các bạn có thể tìm hiểu ở [đây](https://github.com/laserlemon/figaro).
Ok giờ thì thêm một chút vào `users_controller.rb` để gửi mail nhé.
```ruby
class UsersController < ApplicationController
    ...
  def create
    @user = User.new(name: params[:user][:name], email: params[:user][:email])
    if @user.save
      flash[:success] = "Register success"
      UserMailer.welcome_email(@user).deliver_now 
      redirect_to new_user_path
    else
      flash[:danger] = "Register fail"
      render :new
    end
  end
end
```
Ok zậy là đã gửi mail thành công.
### Gửi email sử dụng background job
Trước tiên để sử dụng `sidekiq` chúng ta cần thêm vào `Gemfile`.
> Lưu ý để sử dụng sidekiq chúng ta cần cài redis vào máy, bạn có thể tham khảo cách cài ở bài viết này [tại đây](https://viblo.asia/p/redis-huong-dan-cai-dat-mot-server-redis-3P0lPyJn5ox)
```
gem "sidekiq", '5.2.7'
```
sau đó 
```
bundle install
```
để khởi động `sidekiq` chạy lệnh
```
$ bundle exec sidekiq


         m,
         `$b
    .ss,  $$:         .,d$
    `$$P,d$P'    .,md$P"'
     ,$$$$$bmmd$$$P^'
   .d$$$$$$$$$$P'
   $$^' `"^$$$'       ____  _     _      _    _
   $:     ,$$:       / ___|(_) __| | ___| | _(_) __ _
   `b     :$$        \___ \| |/ _` |/ _ \ |/ / |/ _` |
          $$:         ___) | | (_| |  __/   <| | (_| |
          $$         |____/|_|\__,_|\___|_|\_\_|\__, |
        .d$$                                       |_|

2019-03-11T02:50:33.982Z 11537 TID-gthd8hs39 INFO: Running in ruby 2.6.0p0 (2018-12-25 revision 66547) [x86_64-linux]
2019-03-11T02:50:33.982Z 11537 TID-gthd8hs39 INFO: See LICENSE and the LGPL-3.0 for licensing details.
2019-03-11T02:50:33.982Z 11537 TID-gthd8hs39 INFO: Upgrade to Sidekiq Pro for more features and support: http://sidekiq.org
2019-03-11T02:50:33.982Z 11537 TID-gthd8hs39 INFO: Booting Sidekiq 5.2.5 with redis options {:id=>"Sidekiq-server-PID-11537", :url=>nil}
2019-03-11T02:50:33.984Z 11537 TID-gthd8hs39 INFO: Starting processing, hit Ctrl-C to stop
```
OK, vậy là là đã cài sidekiq. 
### Tạo một cái job (Active Job)
Active Job như là một cách để chuẩn hóa giao diện cho một số tùy chọn hàng đợi đã có. Tùy chọn hàng đợi mà mình dùng ở đây chính là sidekiq . Giờ ta cần cấu hình để Active Job có thể tương tác với sidekiq  Trong file `config/application.rb`:
```ruby
class Application < Rails::Application
 #...
  config.active_job.queue_adapter = :sidekiq
end
```
Để tạo 1 job chúng ta chạy lệnh
```
rails generate job SendEmail
```
Một file sẽ được sinh ra trong `app/jobs/send_email_job.rb` và các bạn sửa với nội dung sau
```ruby
class SendEmailJob < ApplicationJob
  queue_as :default

  def perform user
     UserMailer.welcome_email(user).deliver_now
  end
end
```
Ok giờ thay vì chúng ta gọi trực tiếp `UserMailer` trong controller thì chúng ta sẽ gọi đến một `job` để thực hiện chức năng này. Mở `users_controller.rb`
```ruby
class UsersController < ApplicationController
  #....
  def create
    @user = User.new(name: params[:user][:name], email: params[:user][:email])
    if @user.save
      flash[:success] = "Register success"
      # UserMailer.welcome_email.deliver_now @user
      SendEmailJob.set(wait: 5.minutes).perform_later @user
      redirect_to new_user_path
    else
      flash[:danger] = "Register fail"
      render :new
    end
  end
end
```
Ok vậy là chúng ta đã hoàn thành xong chức năng gửi email rồi. Trong demo nhỏ lần này mình không chú trọng vào giao diện hay convention lúc code lắm, mục đích chính là để chia sẻ hướng làm cho những bạn mới khi tiếp xúc với gem `sidekiq` nói riêng hay `background job` nói chung để làm quen và hiểu được luồng hoạt động của nó là chính.
<br>
Bài viết nếu có thiếu xót mong các bạn comment góp ý hoặc gặp vấn đề nào trong quá trình làm để chúng ta cùng giải quyết nhé.