Với lập trình viên Ruby on Rails, việc sử dụng gem *devise* trong việc xác thực hẳn là không còn xa lạ với mọi người. Một gem vô cùng mạnh mẽ, linh hoạt với nhiều chiến lược xác thực khác nhau được hỗ trợ. Bài này của mình sẽ không đi sâu về gem này mà chỉ đơn giản là một chút nho nhỏ tìm hiểu về 1 trong các chiến lược đó của *devise* - *timeoutable*.

![](https://images.viblo.asia/3dd9111c-0afe-4592-9805-dce3ac263237.png)

## I. Giới thiệu về timeoutable
### 1. Giới thiệu
Đầu tiên, hãy xem qua phần mô tả của model này
>Timeoutable takes care of verifying whether a user session has already expired or not. When a session expires after the configured time, the user will be asked for credentials again, it means, they will be redirected to the sign in page

Có thể tạm hiểu đơn giản, nếu sử dụng *timeoutable*, devise sẽ kiểm tra việc user session đã hết hạn hay chưa. Nếu như session hết hạn sau một khoảng thời gian (được set trong cài đặt) thì người dùng sẽ cần đăng nhập lại (điều hướng về trang đăng nhập).
### 2. Sử dụng
Ở đây mình code một đoạn nho nhỏ demo cho chiến lược này. Đầu tiên cần thêm devise vào dự án

```yaml
gem 'devise'
```

Thực hiện cài đặt gem với bundler

```bash
bundle install
```

Tiếp theo là cài đặt phần khởi tạo devise

```bash
rails generate devise:install
```

Lệnh này sẽ tạo ra 2 file
- `config/initializers/devise.rb`: khởi tạo và setup cho devise
- `config/locales/devise.en.yml`: hỗ trợ cho i18n của devise

Tạm thời chúng ta chưa quan tâm nhiều tới các file này. Sau khi đã có các file generator, chúng ta cần một model để sử dụng cho xác thực với devise

```bash
rails generate devise User
```

Thực hiện migrate db

```bash
rails db:migrate
```

Để đảm bảo xác thực thì trong `app/controllers/application_controller.rb` chúng ta sẽ kiểm tra xác thực trước mỗi action

```ruby
class ApplicationController < ActionController::Base
  before_action :authenticate_user!
end
```

Tạm thời như vậy, khởi động server nào

```bash
rails s -p 3000
```

Mặc định, model được tạo ra sẽ như sau

```ruby
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
```

Trước tiên cứ khởi tạo một user đã

```ruby
User.create(email: 'test@example.com', password: '12345678', password_confirmation: '12345678')
```

Khi thực hiện đăng nhập, session của user sẽ là kiểu session

![](https://images.viblo.asia/3260c0d4-067f-4853-aea4-c31dfb9fd5d7.png)

Do model hiện tại không có *timeoutable*, session này sẽ không bị kiểm tra thời gian hết hạn. Vậy có vấn đề gì với một session không hết hạn? Với ý này, chúng ta có thể tham khảo qua phần security của ruby on rails:

>Sessions that never expire extend the time-frame for attacks such as cross-site request forgery (CSRF), session hijacking, and session fixation.

Có thể hiểu đơn giản, một session khi nó không bị hết hạn thì các tấn công vào trang web có rất nhiều thời gian để có thể thực hiện. Việc giới hạn thời gian tồn tại của session sẽ hạn chế khoảng thời gian mà hacker có thể khai thác với 1 session hắn có được (bằng nhiều cách khác nhau).
### 3. Timeoutable
Với devise để có thể hạn chế thời gian tồn tại của một session, chúng ta sẽ bổ sung thêm chiến lược *timeoutable*:

```ruby
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :timeoutable
end
```

Tiếp theo, ta có thể khai báo khoảng thời gian tồn tại của session.

Nếu dùng cho riêng 1 model, ta thêm trực tiếp trong model:

```ruby
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :timeoutable, timeout_in: 1.minutes
end
```

Nếu muốn dùng chung cho các model, có thể khai báo trong file `config/initializers/devise.rb`

```ruby
config.timeout_in = 1.minutes
```

Khi này, các session sẽ có thời hạn là 1 phút tính từ request cuối cùng mà session này thực hiện. 

Video demo:

{@embed: https://www.youtube.com/watch?v=n7oAczwtClk}


## II. Magic behind the scene
Vậy devise đã làm như thế nào để có thể kiểm tra nhưng điều này?

Trước tiên, ta sẽ xem xét cách mà devise thực hiện hook vào quá trình xác thực tại [đây](https://github.com/heartcombo/devise/blob/main/lib/devise/hooks/timeoutable.rb). 

```ruby
Warden::Manager.after_set_user do |record, warden, options|
  scope = options[:scope]
  env   = warden.request.env

  if record && record.respond_to?(:timedout?) && warden.authenticated?(scope) &&
     options[:store] != false && !env['devise.skip_timeoutable']
    last_request_at = warden.session(scope)['last_request_at']

    if last_request_at.is_a? Integer
      last_request_at = Time.at(last_request_at).utc
    elsif last_request_at.is_a? String
      last_request_at = Time.parse(last_request_at)
    end

    proxy = Devise::Hooks::Proxy.new(warden)

    if !env['devise.skip_timeout'] &&
        record.timedout?(last_request_at) &&
        !proxy.remember_me_is_active?(record)
      Devise.sign_out_all_scopes ? proxy.sign_out : proxy.sign_out(scope)
      throw :warden, scope: scope, message: :timeout
    end

    unless env['devise.skip_trackable']
      warden.session(scope)['last_request_at'] = Time.now.utc.to_i
    end
  end
end
```

Đầu tiên, devise sẽ hook vào trong quá trình xác thực của warden (gem thực hiện xác thực), lấy ra giá trị `last_request_at` của session hiện tại. Nếu như không có option skip timeout cũng như chọn `remember me`, việc kiểm tra timeout `record.timedout?(last_request_at)` trả về đúng thì sẽ thực hiện đăng xuất. 

Vậy cùng xem qua trong hàm `timedout?` sẽ kiểm tra những gì

```ruby
def timedout?(last_access)
    !timeout_in.nil? && last_access && last_access <= timeout_in.ago
end
```
Quá trình kiểm tra sẽ có các điều kiện
- `timeout_in` đã được khai báo
- `lass_access` không null
- `lass_access` xảy ra trước `timeout_in` tính từ thời điểm hiện tại

Như vậy, *timeoutable* sẽ tính timeout của một session từ request cuối cùng mà session này được sử dụng.
## III. Final
Bài này chỉ đơn giản là note lại của bản thân trong quá trình tìm hiểu và học về devise.
## IV. References
[](https://github.com/heartcombo/devise)