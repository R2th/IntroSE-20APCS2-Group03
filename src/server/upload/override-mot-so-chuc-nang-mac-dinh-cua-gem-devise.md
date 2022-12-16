![](https://images.viblo.asia/2d03586f-900a-45c8-8e09-bd358a6e1d74.png)
Chắc hẳn với mỗi ROR developer đều đã nghe, đã sử dụng gem Devise ít nhất 1 lần rồi đúng không nào. Nhưng nếu chỉ dùng lại ở mức sử dụng những chức năng mặc định của Devise thì sẽ không có gì để bàn nhiều.

**Login, reset password, gửi mail reset password...** đều là những chức năng mà Devise hỗ trợ mà chỉ cần:
```
rails generate devise:install
rails generate devise admin
```
là đã có thể sử dụng current_admin rồi (tất nhiên là phải qua mấy bước config authentication nữa!).

Hôm nay mình sẽ chia sẻ một bài viết ngắn về kinh nghiệm thực tế mình mới sử dụng trong dự án vừa rồi khi làm việc với Login sử dụng Devise.

Requirement cũng chỉ như các dự án bình thường trừ đoạn:

`Mỗi lần login lỗi lưu vào bảng LoginLog thông tin tài khoản login đó. Nếu login lỗi 5 lần liên tiếp thì khóa tài khoản trong 10 phút và gửi email về cho Super Admin thông tin admin login lỗi. ` 

Thoạt nhìn thì dường như chẳng có vấn đề gì cho đến khi mình bắt tay vào làm.
Bình thường chỉ cần enable config trong `/config/initializers/devise.rb`
```
  # ==> Configuration for :lockable
  # Defines which strategy will be used to lock an account.
  # :failed_attempts = Locks an account after a number of failed attempts to sign in.
  # :none            = No lock strategy. You should handle locking by yourself.
  config.lock_strategy = :failed_attempts

  # Defines which key will be used when locking and unlocking an account
  config.unlock_keys = [:email]

  # Defines which strategy will be used to unlock an account.
  # :email = Sends an unlock link to the user email
  # :time  = Re-enables login after a certain amount of time (see :unlock_in below)
  # :both  = Enables both strategies
  # :none  = No unlock strategy. You should handle unlocking by yourself.
  # config.unlock_strategy = :both

  # Number of authentication tries before locking an account if lock_strategy
  # is failed attempts.
  config.maximum_attempts = 5

  # Time interval to unlock the account if :time is enabled as unlock_strategy.
  config.unlock_in = 10.minutes

  # Warn on the last attempt before the account is locked.
  config.last_attempt_warning = false
  ```
  
  Theo dõi các dòng enable ở trên:
* failed_attempts: số lần login lỗi(nếu failed_attempts = 5 sẽ khóa tài khoản).
* config.unlock_keys = [:email] : key để đếm số lần login lỗi là email.
* config.maximum_attempts = 5: Số lần login lỗi tối đa trước khi khóa tài khoản.
* config.unlock_in = 10.minutes: Thời gian khóa tài khoản.
* config.last_attempt_warning = false: Mặc định là true, false là giá trị ignore warning  message trước khi khóa tài khoản (login lỗi lần 4).

=> Rồi xong, còn phần gửi mail, chúng ta sẽ override function **lock_access!** trong [Lockable Module](https://github.com/plataformatec/devise/blob/master/lib/devise/models/lockable.rb)
Ở đây mình tạo thêm 1 Module Lockable trong `/config/initializers/lockable.rb`
```
require "devise/hooks/lockable.rb"

module Devise
  module Models
    module Lockable
      extend  ActiveSupport::Concern
      def lock_access!(opts = { })

        if self.failed_attempts == 5
          send_email_login_failure
        else
          save(validate: false)
        end
      end
    end
  end
end
```
Chúng ta đã override lại hàm **lock_access!**
Khi số lần login lỗi là 5 sẽ khóa tài khoản đồng thời gửi mail thông qua hàm send_email_login_failure.

`Vấn đề`: Requirement yêu cầu login kể cả những email không tồn tại trong hệ thống cũng có cơ chế lock như những email tồn tại (Devise không hỗ trợ do Devise authentication trước khi chạy vào Module Lockable).

Cách giải quyết: tạo 1 hook bắt lỗi khi login fail. `config/initializers/devise_hooks.rb`
```
Warden::Manager.before_failure do |env, _opts|
  request = Rack::Request.new(env)
  if request.params.present?
    email = request.params["admin"]["email"]
    admin = Admin.find_by(email: email)
    LoginLog.create_by(email, 10)
    if LoginLog.in_expired_time(email).count == 5
      AdminMailer.send_email_login_failure(admin).deliver_now
    end
  end
end
```
Cơ chế: Đếm tất cả các record LoginLog trong 10 phút bởi email, nếu LoginLog = 5 sẽ lock email đó và gửi mail thông báo cho super admin.
Xử lý controller `app\controllers\admin\sessions_controller.rb`
```
if LoginLog.in_expired_time(email).count == 5
      flash[:danger] = t("devise.failure.locked")
      return redirect_to admin_session_path
 end
 ```
 Ngoài ra nếu yêu cầu dự án không muốn lưu log bạn cũng có thể lưu vào một số storage có sẵn như redis-server, google-storage...
 Trên đây là một số chia sẻ nhỏ thực tế của mình, ở bài viết tiếp theo mình sẽ viết thêm các override vài Module của Devise nữa.
 Các bạn có thể xem ở đây: [Devise Module](https://github.com/plataformatec/devise/tree/master/lib/devise/models)