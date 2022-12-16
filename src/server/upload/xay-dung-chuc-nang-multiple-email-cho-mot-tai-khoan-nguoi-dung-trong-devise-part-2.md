Chào mí bạn. Hôm nay mình sẽ tiếp tục giải quyết 1 vấn đề mà ở bài viết trước còn tồn đong (link bài trước [click here](https://viblo.asia/p/xay-dung-chuc-nang-multiple-email-cho-mot-tai-khoan-nguoi-dung-trong-devise-bJzKmX4O59N)). Đó là xử lí login với Omniauthen như login bằng tài khỏa google hoặc facebook chẳng hạn.
Bây giờ mình sẽ đi giải quyết từng vấn đề 1 nhé.
### Omniauth integration
Một trong những điều khiến cho devise là gem hầu như được các dev ruby sử dụng cho ứng dựng web của mình đó chính là sự tích hợp tuyệt vời với omniauth, giúp cho việc kết nối với các dịch vụ mạng xã hội khác 1 cách dễ dàng. Tuy nhiên, vì hiện tai chúng ta đã có một số chỉnh sửa so với mặc định của devise, cho nên để đòi hỏi việc tích hợp với omniauth thành công thì chúng ta phải thực hiện một số chỉnh sửa sau.
Mình thực hiện chức năng login bằng tài khoản Facebook để làm 1 ví dụ cụ thể.
Điều đầu tiên, hiển nhiên là chúng ta cần tạo một ứng dụng trên facebook ở đường dẫn [https://developers.facebook.com](https://developers.facebook.com), sau khi tạo xong thì sẽ được API key và secret, chúng ta sẽ sử dụng chúng để tiến hành config cho devise omniauth. Sau đó tiến hành làm như các bước dưới.
Trong Gemfile
```
#Gemfile
gem 'omniauth'
gem 'omniauth-facebook'
```
Sử dụng API key và API secret vừa lấy được ở ứng dụng facebook để config trong file config/initializers/devise.rb và file config/secrets.yml như bên dưới:
```
#config/initializers/devise.rb
Devise.setup do |config|
  ...
  config.omniauth :facebook, Rails.application.secrets.fb_app_id, Rails.application.secrets.fb_app_secret
  ...
end
```
File config/secrets.yml
```
#config/secrets.yml
development:
  fb_app_id: <add api key here>
  fb_app_secret: <add api secret here>
```
Trong file model, chúng ta tiến hành khai báo để có thể sử dụng được omniauth trong devise như sau:
```
#app/models/user.rb
class User < ActiveRecord::Base
  ...
  devise :omniauthable, omniauth_providers: [:facebook]
  ...
end
```
Trong file config/routes.rb, chúng ta sẽ định nghĩa lại một controller, nơi mà facebook sẽ redirect đến và xử lí việc login vào hệ thống sau khi tiến hành authenticate ứng dụng của chúng ta.
```
#config/routes.rb
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
```
Nếu như bạn đã từng sử dụng omniauth với devise trước đó, thì các bứơc config trên hẳn là chả có gì xa lạ cả.
Tương tự như việc cho phép người dùng đăng kí nhiều email để đăng nhập, thì ở đây mình cũng muốn cho phép người dùng sử dụng nhiều mạng xã hội hoặc bên thứ ba khác để đăng nhập vào hệ thống. Người dùng có thể đăng nhập vào hệ thống khi sử dụng nhiều mạng xã hội khác nhau với email khác nhau. Cách đơn giản và dễ thực hiên nhất để có thể khởi tạo một người dùng ở bên thứ ba vào hệ thống đó là thông qua một model riêng biệt, mình đặt tên cho nó là UserIdentity. Tiến hành khởi tạo model như bên dưới.
```
rails g model UserIdentity user_id:integer email_id:integer uid:string provider:string
```
```
class UserIdentity < ActiveRecord::Base
  belongs_to :user
  belongs_to :email
  validates :user, :email, :uid, :provider, presence: true
end
```
Ở trong callback controller, tùy thuộc vào các trường hợp sử dụng của bạn, có thể tạo mới user và tiến hành login và redirect đến một trang nào đó.
```
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])
    sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
  end
end
```
Ở class method ***from_omniauth*** của model User, chúng ta cần khởi tạo một user mới dựa trên các auth parameters mà facebook trả về sau khi tiến hành authenticate ứng dụng. May mắn thay, facebook cung cấp cho chúng ta email của user sau khi authenticate, cho nên chúng ta có thể sử dụng để khởi tạo một user.
Lúc này chúng ta có 4 khả năng có thể xảy ra như sau:
1. User login lần đầu thông qua facebook, và email của user đó chưa tồn tại trong bất cứ account nào của hệ thống. Trong trường hợp này, chúng ta đơn giản là sử dụng email của user được facebook cung cấp làm email mặc định và tiến hành khởi tạo user mới.
2. Emai của user đã tồn tại trong hệ thống và người dùng sử dụng chức năng thông qua facebook lần đầu. Trường hợp này nghĩa là email của user đã tồn tại trong hệ thống trước đây trùng với email user mà facebook trả về, cho nên chúng ta sẽ tiến hành tạo mới một UserIdentity cho user đã tồn tại.
3. Trường hợp thứ ba là người dùng đã tiến hành login bằng facebook trước đó, giá trị user email không đổi. Lúc này không có gì cần phải khởi tạo, chỉ đơn giản là cho người dùng login vào.
4. Cuối cùng là người dùng đã login bằng facebook trước đó, nhưng với giá trị email khác (tương tự như chức năng mà chúng ta đang xây dựng thì ở facebook cũng cho phép người dùng sử dụng nhiều email khác nhau để đăng nhập, cho nên có thể dùng 1 uid nhưng các giá trị email trả về từ facebook có thể khác nhau nếu như người dùng thay đổi default email ở facebook). Chúng ta sẽ giữ lại email đã tồn tại trước đó, nhưng liên kết với bảng user identity sẽ được chuyển sang email mới.

Dưới đây là những gì mà mình đã tiến hành implement dựa vào 4 trường hợp đã liệt kê ở trên.
```
class User < ActiveRecord::Base
...
  def self.from_omniauth auth
    email = Email
      .includes(:user)
      .where(email: auth.info.email)
      .first_or_initialize

    ui = UserIdentity
      .where(provider: auth.provider, uid: auth.uid)
      .first_or_initialize

    if ui.persisted?
      # Existing user, Existing social identity
      if ! email.persisted?
        # Email changed on third party site
        email.user = ui.user
        email.save!
        ui.email = email
      elsif email.user == ui.user
        ui.user
      else
        raise ActiveRecord::RecordNotUnique
      end
    elsif email.persisted?
      # Existing User, new identity
      ui.user = email.user
      ui.email = email
      ui.save!
      ui.user
    else
      # New user new identity
      email.save!
      user = User.new(
        password: Devise.friendly_token[0,20],
        default_email: email
      )
      user.save!
      ui.user = user
      ui.email = email
      ui.save!
    end

    ui.user
  end
...
end
```
Ở trên mình đã liệt kê và tiến hành implement theo các kịch bản xảy ra, đây cũng là các khả năng có thể xảy ra khi bạn login bằng một tài khoản mạng xã hội có cung cấp email sau khi authen như github hoặc facebook. Tuy nhiên không phải bên thứ ba nào cũng trả về cho chúng ta đia chỉ email, ví dụ như twiter chẳng hạn. Vì đây không phải đi sâu quá chi tiết về omniauth, cho nên mình sẽ không implement nó ở đây. Tuy nhiên, hướng xử lí trong trường hợp đó là redirect người dùng đến trang hoàn thiện profile của họ sau khi login lần đầu bằng tài khoản twiter để người dùng nhập vào email của họ, đưa ra cảnh báo nếu email mà người dùng nhập đã tồn tại trong hệ thống.

Như vậy qua hai bài viết mình đã giới thiệu cho các bạn cách sử dụng multiple email với gem devise. Ngoài việc tự viết lại để hiểu cơ chế hoạt động của nó, thì để sử dụng nhanh thì bạn có thể sử dụng [gem devise-multi_email](https://github.com/allenwq/devise-multi_email). 
Nếu có bất cứ thắc mắc hoặc ý kiến nào thì hãy để lại comment, mình sẽ support cho bạn sớm nhất.