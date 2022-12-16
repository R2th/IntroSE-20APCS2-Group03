### Một sự khó hiểu nhẹ?(các bạn có thể skip phần này - phần chính của bài viết nằm ở II.)
Sau khi làm xong bài toán ngày hôm trước, mình nhận ra một điều kỳ lạ. Các bạn chịu khó xem lại [phần 5 của bài viết tại đây!](https://viblo.asia/p/rails-question-nhat-vy-part-1-bai-toan-gui-mail-chuc-mung-sinh-nhat-duoi-dang-background-job-trong-rails-gDVK29Gv5Lj) . Chúng ta hãy cùng nhìn vào phần 

![](https://images.viblo.asia/03ddb542-a56d-4e0c-b834-5336c4943c8a.png)

Rõ ràng trong `console` chúng ta có thấy phần `Header` có địa chỉ tên người gửi là `From: hieu@example.com` , nhưng ở hộp thư của mình, người gửi lại là `hoangtronghieu1812@gmail.com`  - hay chính là giá trị của biến môi trường `ENV['gmail_username']` . Theo cách nghĩ của mình, có lẽ khi sử dụng tài khoản gmail, thì giá trị `:from` của `:header` sẽ bị `override` bởi chính tài khoản gmail đó. Tuy nhiên đấy chỉ là mình suy đoán, có bạn nào giỏi giỏi giải thích phần này giúp mình với nhé.

## Part II: Sử dụng ActionMailer + SideKiq để gửi mail chúc mừng sinh nhật dưới dạng background job. 
Với hiểu biết cơ bản về `ActionMailer` ở phần trước , chúng ta hoàn toàn có thể đến với bài toán chính được rồi:
> Bài toán chính: Gửi mail chúc mừng sinh nhật user dưới dạng background job?

Đến đây, chúng ta sẽ chia bài toán thành 2 câu hỏi:
* Background job là gì? Lợi ích của việc gửi email dưới dạng background job? Nếu nó thực sự có lợi thì làm sao để thực hiện nó?
* Làm sao để `rails` biết khi nào là sinh nhật thằng `User` mà gửi mail?

Đấy, thế nên là bây giờ mình sẽ vừa làm vừa trả lời từng câu hỏi một.

### 1. Background job là gì? Tại sao phải sử dụng nó?
Chúng ta cùng nhìn lại `console` ở bài trước khi mình gửi **một cái mail** chào mừng đến người dùng vừa đăng nhập bằng `ActionMailer` :
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
Các bạn thấy đấy, cách mà `Rails` xử lý trong `console` thực sự rất dài dòng. Giờ bạn tưởng tượng chỉ cần có tầm 1triệu `User` thi nhau đăng nhập, thì chắc chắn là con server của bạn sẽ chết bất đắc kỳ tử. Giờ mình nghĩ ra hai cách để giải quyết vấn đề, cũng còn tùy vào điều kiện của bạn:
* Một là nếu bạn giàu vờ lờ, thì cứ bỏ tiền ra mông má cho con server của bạn. Người có tiền là không phải nghĩ nhiều. 
* Hai là nếu bạn nghèo như mình, thì có thể thử `gửi email dưới dạng background job` .

Tất nhiên là nếu bạn đang đọc bài viết này thì bạn sẽ chọn cách thứ hai. Vậy tại sao cách này lại có lợi hơn so với việc gửi email thông thường? Để trả lời câu hỏi này chúng ta phải hiểu được khái niệm `background job`. Một `background job` đơn giản là **một tiến trình chạy ngầm**, tức là nó được **xử lý ở một luồng riêng biệt** so với tiến trình request/response thông thường. 

Câu chuyện về tiến trình request/response thông thường là như này:
```
"Gửi 1 request" -> "Xử lý phức tạp các thứ" -> "Trả lại một response"
```
Và một ví dụ cụ thể, chính là ví dụ về gửi email bằng `mailer` mà mình đã nói ở trên.  Nó giết quá nhiều công sức của `Server` và đem lại trải nghiệm chậm chạp ở phía `Client` . Ngoài ra, hãy thử tưởng tượng đến trường hợp email của bạn gửi bị lỗi gì đó, rồi bạn lại phải xử lý thủ công để nó gửi lại email cho đến khi người dùng nhận được. Ối xời, bạn cần phải có tay như Lý Đức và não nhăn gấp 1000 lần da mặt của Arsene Wenger thì mới xử lý được. Vì vậy, với những công việc có độ ưu tiên thấp (như gửi email chào mừng đăng nhập chẳng hạn) chúng ta nên để nó **chạy ở một luồng riêng** dưới dạng `backgroundjob`. 

### 2. Sidekiq
Sau khi hiểu về `backgroundjob`, câu chuyện là làm sao để email của bạn gửi được dưới dạng này. Câu trả lời là bạn có thể học cách sử dụng các `backgroundjob` framework . Ở đây thì mình khuyến khích bạn dùng `sidekiq` vì sếp mình khuyến khích vậy(sếp mình 13 năm kinh nghiệm làm web rồi nên bạn cứ tin đi). 

Sidekiq rất mạnh, nó được hỗ trợ bởi Redis - một bộ nhớ lưu trữ dữ liệu rất nổi tiếng về tốc độ và hiệu năng làm việc của nó. Bạn chỉ cần biết `sidekiq` rất mạnh là được, giờ mình sẽ hướng dẫn các bạn cách cấu hình và sử dụng nó để giải quyết bài toán "gửi mail sinh nhật" với rails app.

Để mà dùng được Sidekiq, **trước hết bạn phải cài Redis đã nhé.** Xem hướng dẫn cài Redis [tại đây.](https://viblo.asia/p/redis-huong-dan-cai-dat-mot-server-redis-3P0lPyJn5ox)

Cài xong thì nhớ bật Redis lên và kiểm tra xem nó đã chạy hay chưa bằng 2 câu lệnh này.
```
sudo systemctl start redis
sudo systemctl status redis
```
Nó hiện ra thế này thì là chạy rồi nè:
```
● redis.service - Redis In-Memory Data Store
   Loaded: loaded (/etc/systemd/system/redis.service; disabled; vendor preset: enabled)
   Active: active (running) since Tue 2019-03-12 10:08:03 +07; 6s ago
 Main PID: 6963 (redis-server)
    Tasks: 4 (limit: 4915)
   CGroup: /system.slice/redis.service
           └─6963 /usr/local/bin/redis-server 127.0.0.1:6379

Thg 3 12 10:08:03 troublehfrom18 redis-server[6963]:  |    `-._`-._        _.-'_.-'    |
Thg 3 12 10:08:03 troublehfrom18 redis-server[6963]:   `-._    `-._`-.__.-'_.-'    _.-'
Thg 3 12 10:08:03 troublehfrom18 redis-server[6963]:       `-._    `-.__.-'    _.-'
Thg 3 12 10:08:03 troublehfrom18 redis-server[6963]:           `-._        _.-'
Thg 3 12 10:08:03 troublehfrom18 redis-server[6963]:               `-.__.-'
Thg 3 12 10:08:03 troublehfrom18 redis-server[6963]: 6963:M 12 Mar 2019 10:08:03.835 # WARNING: The TCP backlog setting of 511 cannot be enfor
Thg 3 12 10:08:03 troublehfrom18 redis-server[6963]: 6963:M 12 Mar 2019 10:08:03.835 # Server initialized
Thg 3 12 10:08:03 troublehfrom18 redis-server[6963]: 6963:M 12 Mar 2019 10:08:03.835 # WARNING overcommit_memory is set to 0! Background save 
Thg 3 12 10:08:03 troublehfrom18 redis-server[6963]: 6963:M 12 Mar 2019 10:08:03.835 # WARNING you have Transparent Huge Pages (THP) support e
Thg 3 12 10:08:03 troublehfrom18 redis-server[6963]: 6963:M 12 Mar 2019 10:08:03.835 * Ready to accept connections
```
Đó xong rồi, giờ thì đi cấu hình `sidekiq`.

Khi sử dụng Rails, thì bạn sẽ được dùng `sidekiq` như một gem, thế thì câu chuyện rất quen thuộc, ta thêm vào `Gemfile` dòng sau:
```ruby
gem "sidekiq"
```
Rồi `bundle install` .
Sau đó, chạy `bundle exec sidekiq`  để khởi động server sidekiq và bạn nhìn thấy trong console như này là được:
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
Một trong những điều bạn cần biết thêm về `sidekiq` , đó là nó quản lý các `job` dưới dạng hàng đợi. Các `job` làm thất bại sẽ được đẩy xuống cuối hàng đợi và retry, tất cả theo thứ tự để việc quản lý các `job` trở lên dễ dàng. Vậy các `job` ở đây là gì? Hãy cùng đến với phần tiếp theo
### 3 Tạo một cái Job (ActiveJob)
Active Job lần đầu tiên được giới thiệu trong Rails 4.2 như là một cách để chuẩn hóa giao diện cho một số **tùy chọn hàng đợi** đã có. **Tùy chọn hàng đợi** mà mình dùng ở đây chính là `sidekiq` . Giờ ta cần cấu hình để `Active Job` có thể tương tác với `sidekiq` (nếu bạn muốn hiểu thêm về Active Job, vui lòng đọc ở [đây](https://edgeguides.rubyonrails.org/active_job_basics.html) ) .
Trong file `config/application.rb` :
```ruby
class Application < Rails::Application
  # ...
  config.active_job.queue_adapter = :sidekiq
end
```
Bây giờ ta sẽ tạo một cái `job` `HappyBirthday` để xử lý việc gửi email sinh nhật ở một luồng riêng. Dùng macro sau:
```
rails generate job HappyBirthday
```
Nó sẽ ra một cái file `app/jobs/happy_birthday_job.rb` và chúng ta sẽ cấu hình nó như này:
```ruby
class HappyBirthdayJob < ApplicationJob
  queue_as :default

  def perform user
    UserMailer.with(user: user).welcome_email.deliver_now
  end
end

```
Phần `mailer` thì mình không nói lại cách hoạt động và custom nữa, các bạn chịu khó xem ở [bài trước](https://viblo.asia/p/rails-question-nhat-vy-part-1-bai-toan-gui-mail-chuc-mung-sinh-nhat-duoi-dang-background-job-trong-rails-gDVK29Gv5Lj) . Còn về cái `job` vừa tạo, các bạn có thể xử lý nó bằng method `perform `như sau :
```ruby
###Cách 1: xử lý job ngay lập tức
HappyBirthdayJob.perform_now user
##cách 2: Push nó lên hàng đợi của Sidekiq, chờ một khoảng thời gian rồi thực hiện.
HappyBirthdayJob.perform_later user
```
Như vậy tóm lại, việc tạo một` job` hoạt động tích hợp với `sidekiq` giúp chúng ta thực hiện `job` ấy ở một luồng riêng biệt. Chúng ta biết xử lý ở luồng riêng rồi, biết làm sao để gửi được email rồi, nên câu hỏi tiếp theo là:  **"Làm sao để email được gửi đúng vào ngày sinh nhật của user?"**

### 4. Đặt thời gian thực hiện job.
Để giải quyết câu hỏi vừa nói trên, mình đã tìm ra được một class `method` khá hay hỗ trợ cho các lớp kế thừa từ `ActiveJob::Base` . Đó là:
```ruby
HappyBirthdayJob.set(wait: 5.minutes).perform_later
```
Với method `set` này , chúng ta có thể lập lịch cho một `job` chờ đến thời điểm nhất định mới thực hiện. Thời điểm mà bài toán của chúng ta cần là **ngày sinh nhật** của `User` trong ít nhất là năm nay. Giả sử, `User` của chúng ta có một `attribute` là `dob` - kiểu `Date` , lưu lại ngày tháng năm sinh của user này. Thế thì bây giờ chúng ta cần có một `method` để có thể lấy ra ngày sinh nhật của User trong năm nay. Mình đã viết một `instance method` để lấy ra ngày sinh nhật của user trong 3 năm tới:
```ruby
# model/User.rb
class User < ApplicationRecord
#.......
def three_next_birthdays
    a = [0,1,2]
    a.each do |i|
      a[i] = Date.new Date.current.year + i, dob.month, dob.day
    end
  end
```
Và chúng ta có dòng lệnh thực thi `job` cho một `user` giả sử là `User.first` :
```ruby
user = User.first
user.three_next_birthdays.each do |day|
        HappyBirthdayJob.set(wait_until: (day - Date.current)
          .days.from_now).perform_later user
      end
```
Vậy, câu hỏi cuối cùng của bài toán là: "Đặt dòng lệnh nói trên ở đâu?" . Theo logic, thì các bạn nên set câu lệnh này ngay sau khi `User` được tạo - tức là sau `action` `User#create` . Thế thì đến đây lại phục thuộc vào cách bạn tạo `User`. Nếu các bạn có `userscontroller` tự tạo thì câu chuyện đơn giản. Còn mình thì dùng `devise` cho hoạt động `registration`, nên mình phải custom lại controller `registrations` của devise một tý. Giờ mình phải tạo ra cái class `Users::RegistrationsController` để `override` qua việc sử dụng macro sau:
```
rails g devise:controllers users -c=registrations
```
Thêm route cho nó nà:
```ruby
devise_for :users, controllers: { registrations: 'users/registrations' }
```
Xong rồi mình custom file mới tạo ra app/controllers/users/registration như thế này:
```ruby
class Users::RegistrationsController < Devise::RegistrationsController
  after_action :add_hpbd_jobs_for_user, only: :create

  private

  def add_hpbd_jobs_for_user
    user = User.find_by email: params[:user][:email]
    if user
      user.three_next_birthdays.each do |day|
        HappyBirthdayJob.set(wait_until: (day - Date.current)
          .days.from_now).perform_later user
      end
    end
  end
end

```
Đấy, toàn bộ bài toán đến đây là hoàn thành. Giờ mình thử sign_up và chờ đợi kết quả. Trong console nó chạy như này:
```
Started POST "/users" for 127.0.0.1 at 2019-03-11 10:03:26 +0700
Processing by Users::RegistrationsController#create as HTML
  Parameters: {"utf8"=>"✓", "authenticity_token"=>"qFxZtOotmb9gY26lz/cz5X3YUW0dwNrUDEGf8H5/PzLKt0EcFk4x6MSDI5GKrlHM4THeIDIjnUHf1jVYfUBSQQ==", "user"=>{"email"=>"hoangtronghieu1812@gmail.com", "dob(1i)"=>"2019", "dob(2i)"=>"3", "dob(3i)"=>"11", "password"=>"[FILTERED]", "password_confirmation"=>"[FILTERED]"}, "commit"=>"Sign up"}
   (0.2ms)  BEGIN
  ↳ /home/troublehfrom18/.rbenv/versions/2.6.0/lib/ruby/gems/2.6.0/gems/activerecord-5.2.2/lib/active_record/log_subscriber.rb:98
  User Exists (0.5ms)  SELECT  1 AS one FROM `users` WHERE `users`.`email` = BINARY 'hoangtronghieu1812@gmail.com' LIMIT 1
  ↳ /home/troublehfrom18/.rbenv/versions/2.6.0/lib/ruby/gems/2.6.0/gems/activerecord-5.2.2/lib/active_record/log_subscriber.rb:98
  User Create (0.3ms)  INSERT INTO `users` (`created_at`, `updated_at`, `email`, `encrypted_password`, `dob`) VALUES ('2019-03-11 03:03:27', '2019-03-11 03:03:27', 'hoangtronghieu1812@gmail.com', '$2a$11$Id1ICEfsxqIVbiB.CV11Ou/L6KNrWGAOpWI1d4ybKkcLOGvkAR.6u', '2019-03-11')
  ↳ /home/troublehfrom18/.rbenv/versions/2.6.0/lib/ruby/gems/2.6.0/gems/activerecord-5.2.2/lib/active_record/log_subscriber.rb:98
   (37.0ms)  COMMIT
  ↳ /home/troublehfrom18/.rbenv/versions/2.6.0/lib/ruby/gems/2.6.0/gems/activerecord-5.2.2/lib/active_record/log_subscriber.rb:98
Redirected to http://0.0.0.0:3000/
  User Load (0.3ms)  SELECT  `users`.* FROM `users` WHERE `users`.`email` = 'hoangtronghieu1812@gmail.com' LIMIT 1
  ↳ app/controllers/users/registrations_controller.rb:9
[ActiveJob] Enqueued HappyBirthdayJob (Job ID: b13ed7ff-2255-4120-98b3-339f387ceb85) to Sidekiq(default) at 2019-03-11 03:03:27 UTC with arguments: #<GlobalID:0x00007ff69a3a0758 @uri=#<URI::GID gid://fels20190104/User/15>>
[ActiveJob] Enqueued HappyBirthdayJob (Job ID: 5d317048-52d1-478c-8afc-bec9cf484d54) to Sidekiq(default) at 2020-03-11 03:03:27 UTC with arguments: #<GlobalID:0x00007ff69a3bdec0 @uri=#<URI::GID gid://fels20190104/User/15>>
[ActiveJob] Enqueued HappyBirthdayJob (Job ID: 1d659011-12fc-440b-a00a-a0e32f4222bb) to Sidekiq(default) at 2021-03-11 03:03:27 UTC with arguments: #<GlobalID:0x00007ff69a403650 @uri=#<URI::GID gid://fels20190104/User/15>>
```
Bạn thấy đấy, 3 cái job đã được set thể hiện ở các dòng cuối console. Giờ chúng ta vào trang local của ứng dụng và xem giao diện sidekiq ở url: http://0.0.0.0:3000/sidekiq
Kết quả ta thấy như này:

![](https://images.viblo.asia/5a09ada6-b04d-4a33-bbf4-688a167b6c3a.png)

Vì mình set ngày sinh nhật của user là ngày hôm nay, nên cái `job` đầu tiên 5 phút nữa nó sẽ gửi. Cái `job` thứ 2 và thứ 3 thì vào ngày này của 1 năm và 2 năm nữa nó sẽ gửi. Hjhj. Thế là xong bài toán cho Nhật Vy nhé.


-----

References:

Sidekiq: https://github.com/mperham/sidekiq

ActiveJob: https://edgeguides.rubyonrails.org/active_job_basics.html