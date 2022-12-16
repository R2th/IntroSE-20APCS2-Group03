Firebase là một service khá nổi tiếng nên có lẽ mình sẽ không cần phải giới thiệu nữa. Firebase cung cấp khá nhiều dịch vụ Backend mạnh mẽ. Bài viết hôm nay, mình xin được giới thiệu một chức năng nhỏ của Firebase, là Custom token to Authentication.

### Đặt vấn đề

Bạn xây dựng một ứng dụng Rails, muốn sử dụng dịch vụ Realtime Database hoặc Cloud Firestore để cung cấp dịch vụ chat cho user thay vì mở websocket sẽ rất tốn tài nguyên cho server.

Để được vào Room chat thì chắc chắn rồi, user sẽ phải đăng nhập. Firebase cung cấp dịch vụ Authentication để xác thực user với Firebase ([https://firebase.google.com/docs/auth/](https://firebase.google.com/docs/auth/)), nhưng hệ thống của bạn đã bắt buộc đăng nhập trước đó, không lẽ muốn vào chat thì phải đăng nhập thêm 1 lần nữa để xác thực với Firebase? Giải quyết vấn đề này, Firebase cung cấp cho bạn 2 giải pháp: Một là bỏ qua xác thực user, tuy nhiên cách này quá nguy hiểm; Hai là phía Backend sẽ xử lý gửi custom token cho Firebase để xác thực user.

Firebase cho phép bạn toàn quyền kiểm soát việc xác thực user với Firebase sử dụng JWT. Bạn sẽ tạo ra một token trong ứng dụng của bạn, gửi nó cho client và client sẽ dùng token này để xác thực với Firebase thông qua phương thức `signInWithCustomToken()`

### Trước khi bắt đầu

- Giả sử bạn đã có một hệ thống trong đó có chức năng đăng nhập và đang xây dựng chức năng ChatRoom.
- Giả sử bạn cũng đã tạo được một Firebase Project và đang có ý định sử dụng Realtime Database để xây dựng chức năng ChatRoom của bạn.

Đầu tiên, bạn truy cập vào Console của Firebase tải JSON private key file của Project về máy (Project Overview > Project Settings > Service Account > Generate new private key)

![](https://images.viblo.asia/a1410af8-f900-4c34-a9b4-493c0a52dac4.png)

Không public file này, vì nó chứa thông tin để đăng nhập vào Firebase Project của bạn.

### Tạo token sử dụng JWT

Vì Ruby là ngôn ngữ không được hỗ trợ Firebase Admin SDK chính thức, nên việc tạo custom token sẽ được làm thủ công.

Tạo ra một JWT bao gồm các thông tin bắt buộc sau:

| Key | Viết tắt của | Ý nghĩa |
| -------- | -------- | -------- |
| alg | Algorithm | Giá trị = "RS256" |
| iss | Issuer | Địa chỉ email của tài khoản chủ Project |
| sub | Subject | Địa chỉ email của tài khoản chủ Project |
| aud | Audience | Giá trị = "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit" |
| iat | Issued-at time | Thời gian hiện tại (in seconds since the UNIX epoch) |
| exp | Expiration time | Thời gian hết hạn (in seconds since the UNIX epoch), tối đa 3600s kể từ Issued-at time |
| uid |  | Mã định danh duy nhất của user trong ứng dụng Rails của bạn, chuỗi string 1-36 ký tự |
| claims (optional) | | |

Có 1 lưu ý là mặc dù config thời gian hết hạn của Token là 1h, nhưng khi Client sử dụng phương thức `signInWithCustomToken()` nhưng họ vẫn sẽ được giữ phiên làm việc cho đến khi người dùng đăng xuất mà không cần phải refresh lại để lấy token mới.

Với Rails, bạn có thể tạo 1 file Lib hoặc Service để generate token theo yêu cầu của Firebase như sau:

```ruby
class FirebaseAdmin
  def initialize
    @private_key_json = File.open(ENV["FIREBASE_KEY_FILE_PATH"]).read
    @firebase_email = ENV["FIREBASE_EMAIL"]
  end

  def create_custom_token uid
    now_seconds = Time.now.to_i
    payload = {
      iss: firebase_email,
      sub: firebase_email,
      aud: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
      iat: now_seconds,
      exp: now_seconds + 3600,
      uid: uid,
      claims: {}
    }
    JWT.encode payload, private_key, "RS256"
  end

  private
  attr_reader :private_key_json, :firebase_email

  def firebase_info
    JSON.parse(private_key_json, symbolize_names: true)
  end

  def private_key
    OpenSSL::PKey::RSA.new firebase_info[:private_key]
  end
end
```

Việc xác thực user với Firebase thế là xong, việc cuối cùng là bạn cầm cái key tương ứng với user trả về cho client. 

```ruby
class Api::V1::Firebase::AuthenticationsController < Api::V1::BaseController
  before_action :doorkeeper_authorize!, only: :show

  def show
    jwt_token = FirebaseAdmin.new.create_custom_token current_user.id
    render json: {token: jwt_token}
  end
end
```

Client dùng key này xác thực với Firebase và có thể sử dụng các dịch vụ của Firebase như Reatime Database, ....

Bài viết của mình đã giới thiệu với các bạn cách xác thực user của hệ thống với Firebase sử dụng Rails app. Chúc các bạn thành công!

Tham khảo: [https://firebase.google.com/docs/auth/admin/create-custom-tokens](https://firebase.google.com/docs/auth/admin/create-custom-tokens)