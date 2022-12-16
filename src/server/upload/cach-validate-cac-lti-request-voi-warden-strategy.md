> Bài viết gốc [How to Validate LTI Requests with a Custom Warden Strategy ](https://medium.com/flatiron-labs/how-to-validate-lti-requests-with-a-custom-warden-strategy-cac1d8dd1a9c)

Các bạn có từng tìm một số cách để xác thực các incoming request dựa vào một điều kiện nào cụ thể trong một ứng dụng Rails chưa?

Chắc nhiều bạn cũng chưa tìm hiểu sâu về `Warden` nhưng qua bài viết này sẽ cho thêm một chút kiến thức về cách validate incoming request với warden.

Hãy tưởng tự một số trường hợp sử dụng cho việc hỗ trợ xác thực bằng nhiều chiến thuật (multiple authorization strategies) với trường hợp cần xử lý xác thực cho một số API endpoints khác cái còn lại hoặc cần xử lý xác thực dựa vào các params đã cung cấp hay là thay đổi cơ chế xác thực dựa vào mội trường của ứng dụng.

Khi có yêu cầu mới mà tất cả các incoming request với một số môi trường cụ thể chỉ có thể theo tiêu chuẩn LTI. Các môi trường còn lại vẫn sử dụng thông tin xác thực với flow xác thực mật khẩu chẳng hạn, bởi vậy không thể thay thể cho tất cả. Thay vì đó cần hỗ trợ bởi 2 flow xác thực side-by-side tạm gọi *Warden Strategies enter stage right*

## Tổng quan về Warden Strategies
Đối với chúng ta việc tìm hiểu về Warden Strategies chắc không có giá trị mấy. Tiếp đến Warden là thứ gì vậy ta?

*Warden* là một gem có thể dùng trong ứng dụng Ruby Rack-based để đêm ra dùng hệ thống xác thực trong app middleware. Warden cung cấp xử lý session và dùng một rack object để set thông tin xác thực(bao gồm cả user object).

Một *Warden Strategy* chứa logic cho request xác thực. Chiến thuật đa tầng có thể dùng trong một ứng dụng. Warden sẽ chạy qua tất cả các chiến thụật cho đến khi tìm thấy kết quả thành công, thất bại hoặc không tìm thấy cái nào thích hợp cho một request cụ thể. Một warden strategy thường chứa ít nhất 2 methods:

- `valid?` (**optional method**) kiểm tra chiến thuật có phù hợp hay không và cho kết quả `true` hoặc `false`. Nếu `true` chiến thuật sẽ được chạy ngược lại `false` sẽ không chạy. Mặc định chạy nếu không có hàm này.

- `authenticate!` (**required method**) thực thi logic xác thực. Có thể tạm ngừng chiến thuật stack hoặc chuyển tiếp chiến thuật tiếp theo(mặc định chuyển tiếp khi `halt!` không được gọi)

Tất cả các chiến thuật có các request-related method và các action method kế thừa từ `Warden::Strategies::Base` có thể dùng trong chiến thuật. các method có thể gọi đến tạm ngừng chiến thuật stack hoặc login một user nếu xác thực thành công. Hãy xem ví dụ dưới này

```
Warden::Strategies.add(:signature) do
  def valid?  
    params["signature"]
  end
  
  def authenticate!
    user = user_from_decoded_signature params["signature"]
    user.present? ? halt! : pass
  end
end
```

## Tùy chọn LTI Warden Strategy

Đến đây chúng ta đã hiểu sơ sơ về Warden Strategies, tiếp đến sẽ đi đến tùy chọn chiến thuật để validate các LTI request. Trước tiên, LTI là một protocol cho phép `learning tools`(ứng dụng) đảm bảo liên lạc bảo mật giữa chúng. Một LTI request chỉ là một POST request với các params được định nghĩa trước bao gồm một OAuth signature, shared key và thông tin OAuth/request khác. Với trường hợp đang làm cụ thể chỉ các LTI request mới được lọc ra. Vậy chiến thuật xác thực cho các request có thể là chiến thuật `first` và `only`. Chiến thuật sẽ thêm vào và đảm bảo được check trước trong stack:

```
warden_strategies.add(:lti_auth, LtiAuth::WardenStrategy)
warden_config.default_strategies(scope: :user).unshift(:lti_auth)
```

Code dưới này sẽ thêm chiến thuật và muốn đảm bảo chỉ chạy với môi trường cụ thể:

```
module LtiAuth
  class WardenStrategy < Warden::Strategies::Base
    def valid?
      LtiAuth.on?
    end
... (code continued)
```

Ở đây cần dùng method `#valid?` trong đó chỉ khi `LtiAuth.on?` là true chiến thuật mới chạy ngược lại không chạy.

Nếu trong một môi trường mà trong đó chiến thuật cần dung thì method tiếp theo `#authenticate!` sẽ được gọi và ở đây là logic xác thực thực thi. Như nói trên các parameters LTI request bao gồm một OAuth signature. Bởi Warden cung cấp truy cấp các request method, có thể truyền các thông tin request cho `LtiAuth::RackOauthVerifier` để validate tính xác thực của signature(kết hợp mã hóa của request method, url, params, một shared key và secret). Cần đảm bảo rằng cung cấp đầy đủ thông tin xác thức của user. Nếu LTI signature valid và user param tồn tại sẽ điều khoản user.

```
...
    def authenticate!
      return handle_failure(forbidden) unless valid_credentials?
      provision_user
    end
private
   def provision_user
      user = Provisioning::LtiUser.find_or_create_by(email: email,  user_id: user_id)
      return handle_failure(not_found) if user.blank?
      success!(user)
    end
    def handle_failure(response)
      custom!(response)
    end
    def valid_credentials?
      valid_lti? && valid_params?
    end
    def valid_lti?
      LtiAuth::RackOauthVerifier.validate_signature(request.url, request.request_parameters)
    end
    def valid_params?
      user_id.present? && email.present?
    end
... (code continued)
```

Đến đây là tất cả những gì cần làm nhưng làm sao để chặn các chiến thuật tiếp theo thực thi và làm sao để có thể logged in? 

Như trên Warden cung cấp action methdo `halt!` đó là method sẽ là việc chặn. Với code trên có dùng đến `#success!` và `#custom!` kích hoạt mehtdo `#halt!`. Nếu validate thành công, mehtod `#success!`nhận user object đã xác thực và set session và thông tin user trong warden rack object.

Nếu như xác thực thật bại method `#custom!` sẽ nhận custom rake array và gửi array này là response cho request mà không thể đi tiếp vào ứng dụng. Để tìm hiểu thêm về các action `#fail!, #redirect!, và #pass` hãy xem [Warden Wiki](https://github.com/wardencommunity/warden/wiki/strategies).

Đó là về xác thực request và logged in user. Đã xong rồi? chưa phải nhé.

Với một tập session Warden sẽ bỏ qua tất cả chiến thuật theo các yêu cầu tiếp theo. Tùy nhiên nếu muốn xác minh session user là user thích hợp và OAuth signature vẫn valid thì làm thế nào ?  đáp án là **#after_set_user**

```
warden_manager.after_set_user do |user, auth, opts|
  LtiAuth::WardenAfterSetUser.new(user, auth, opts).execute
end
```

Warden cung cấp thêm một object là `warden_object`, object này cung cấp một method `#after_set_user` sẽ được gọi mọi khi user được set hoặc khi một user set theo session data có sẵn của các request tiếp theo.

`LtiAuth::WardenAfterSetUSer` class sẽ giúp validate user và cung cấp signature.
```
module LtiAuth
  class WardenAfterSetUser
    attr_reader :user, :auth, :opts, :request
    def initialize(user,auth,opts)
      @user = user
      @auth = auth
      @opts = opts
      @request = Rack::Request.new(auth.session_serializer.env)
    end
    def execute
      return false unless LtiAuth.on?
      auth.logout if logged_in_auth_failure?
    end
private
    def logged_in_auth_failure?
      invalid_user? ||  invalid_signature?
    end
    def invalid_user?
      user.learn_uuid != request.params["user_id"]
    end
    def invalid_signature?
      !LtiAuth::RackOauthVerifier.validate_signature(request.url, request.params)
    end
  end
end
```

Nếu cả hả đều đúng sẽ được chạy bình thường, trường hợp user không valid hoặc signature không valid user sẽ bị logout. Logout user sẽ chạy lại stack chiến thuật một lần nữa. 

Dưới đây là các sơ đồ để giúp hiểu hơn về flow xác thực.
![](https://images.viblo.asia/5728cdd9-579a-4623-b587-0c4b5e4ab841.png)

> User gửi một request với signature và user params hợp lệ. Request vào đến Warden strategy và thông tin đăng nhập được xác thực, thiết lập người dùng. Sau khi thiết lập user kích hoạt và tất cả các kiểm tra về thông tin user vượt qua, cho phép request đi đến controller.

![](https://images.viblo.asia/66f88e12-c7b8-4227-bbc2-a43957e0b258.png)
> User gửi một request với signature không hợp lệ hoặc không có/ không hợp lệ params. Request đi đến Warden strategy và validate thất bại. Lỗi phản hồi sẽ gửi lại cho client mà không đi tới ứng dụng.

![](https://images.viblo.asia/5728cdd9-579a-4623-b587-0c4b5e4ab841.png)

> User gửi các request tiếp theo. Request bỏ qua Warden strategy và một user được set dựa vào session data sẵn có. Sau khi kích hoạt set user, khi OAuth signature được xách thực và yêu cầu user và session user giống nhau, request thành công và đi tới ứng dụng.

![](https://images.viblo.asia/1a840db6-20dd-4157-b4c6-348ffb0e7387.png)

> User gửi các request tiếp theo. Request bỏ qua Warden strategy và một user được set dựa vào session data sẵn có. Sau khi kích hoạt set user, khi OAuth signature không hợp lệ user đó sẽ logout session. Sau khi logout Warden strategy sẽ kích hoạt và fail do signature không hợp lệ và cuối cùng trả về 403. 

![](https://images.viblo.asia/d7035e5b-b8d9-4fa1-894c-ded2deeb9f65.png)

> User gửi các request tiếp theo. Request bỏ qua Warden strategy và một user được set dựa vào session data sẵn có. Sau khi kích hoạt set user, khi OAuth signature hợp lệ nhưng session user và yêu cầu user khác, session user logout. Sau khi logout Warden Strategy được kích hoạt, signature hợp lệ và yêu cầu user được set user mới, khi thành công Warden Strategy After Set User và đi tới ứng dụng.

Cảm ơn các bạn đã đọc bài viết!

#### Tham khảo
- https://medium.com/flatiron-labs/how-to-validate-lti-requests-with-a-custom-warden-strategy-cac1d8dd1a9c
- https://github.com/wardencommunity/warden/wiki/Overview
- https://github.com/plataformatec/devise/wiki
- https://insights.kyan.com/devise-authentication-strategies-a1a6b4e2b891
- https://medium.com/flatiron-labs/whitelabeling-learn-ccb5a0189f1d