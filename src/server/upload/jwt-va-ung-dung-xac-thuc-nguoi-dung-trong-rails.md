# JWT
Thời gian gần đây mình có init API thì mình có ứng dụng Json Web Token (JWT) để xây dựng xác thực người dùng. Nó có support những gì và ứng dụng của nó ra sao thì mình xin chia sẻ trong bài viết
## Nó là gì?
Hiểu một cách cơ bản thì nó là một chuỗi Json gốc được mã hóa và giải mã được theo một quy tắc nhất định, gồm 3 thành phần là header, payload và signature. Mỗi phần sẽ được mã hóa và thực hiện những chức năng khác nhau, để đảm bảo được nó là nó, không thằng nào có thể là nó =))

Hoặc có thể hiểu một cách định nghĩa như là, JWT là một chuẩn (RFC 7519) được định nghĩa để giao tiếp một cách an toàn thông tin giữa các bên(Client-Server) dưới dạng một đoạn thông tin được mã hóa từ thông tin một chuỗi Json gốc. Thông tin được mã hóa này có thể được xác minh và đáng tin cậy vì nó có chứa chữ ký số. JWT có thể được mã hóa bằng một thuật toán bí mật (với thuật toán HMAC) hoặc một public/private key sử dụng mã hoá RSA. :)
## Cấu trúc
 ![](https://images.viblo.asia/f6376e4a-0b34-4490-ab76-b74732174441.png)

Thì cơ bản cấu trúc của JWT bao gồm 3 phần, mỗi phần sẽ thực hiện chức năng riêng biệt và có sự liên kết với nhau. Nhìn chung chuỗi nó như này
```
"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.OP1itXwb_NH00i92BvSNyOX3LZ3vXVUWe6XRTZuq3tQ"
```
thì cấu trúc nó là như này
```
<base64-encoded header>.<base64-encoded payload>.<HMACSHA256(base64-encoded signature)>
```
Với chi tiết từng phần thì nó có gì :v
 ### Header
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```
* alg: Kiểu mã hóa(HMAC SHA256 hoặc RSA)
* typ: Cho biết nó là 1 chuỗi mã hóa json web token
### Payload
Là nơi để lưu thông tin chuỗi cần mã hóa

Ví dụ mã hóa một chuỗi thông tin dạng json `payload = {user_id:1}` thì có những key mình tự định nghĩa như là user_id. Bên cạnh đó có những key mà JWT đã default cho chúng ta như:
* iss (issuer): tổ chức phát hành token
* sub (subject): chủ đề của token
* aud (audience): đối tượng sử dụng token
* exp (expired time): thời điểm token hết hạn
* nbf (not before time): đến thời điểm này token mới hợp lệ
* iat (issued at): thời điểm token được tạo ra
* jti: JWT ID
### Signature
Phần signature được tạo bằng cách kết hợp 2 phần Header + Payload và một secret_key bí mật, rồi mã hóa ví dụ như HMAC SHA-256. Cơ bản thì nếu thông tin chuỗi json giống nhau và khóa bí mật giống nhau thì sẽ gen ra một chuỗi signature giống nhau, secret_key sẽ là khóa bí mật để đảm bảo jwt không thể fake được nếu biết được những thông tin cần mà hóa
# Xác thực người dùng trong Rails
## Gem
 Thêm [Gemfile](https://github.com/jwt/ruby-jwt)
```
gem "jwt"
```
chạy `bundle install`
## Flow xác thực
![](https://images.viblo.asia/5770b6b1-21c1-4da8-a8ab-5abca4699278.png)
1. Từ Client truyền lên thông tin cần thiết để thực hiện tạo chuỗi mã hóa
2. Server thực hiện kiểm tra dữ liệu và build access token(chuỗi jwt)
3. Trả kết quả về cho Client
4. Client thực hiện các action với header truyền lên là access token
5. Thực hiện xác thực chuỗi access_token và user tương ứng
6. Trả kết quả
 ## Triển khai
 Tạo file thực hiện encode và decode token, set khoảng thời gian hết hạn là 1 ngày
 ```
 # lib/json_web_token.rb
 class JsonWebToken
  HMAC_SECRET = Rails.application.secrets.secret_key_base

  class << self
    def encode payload
      payload[:exp] = 24.hours.from_now.to_i
      JWT.encode(payload, HMAC_SECRET)
    end

    def decode token
      body = JWT.decode(token, HMAC_SECRET)[0]
      HashWithIndifferentAccess.new body
    rescue JWT::ExpiredSignature, JWT::VerificationError => e
      raise ExceptionHandler::ExpiredSignature, e.message
    end
  end
end
 ```
 * Login: 
 
 Generate token, mình thực hiện mã hóa access_token bằng 2 thông tin là user_id và login_token(một đoạn mã được gen ra ngẫu nhiên)
 ```
 def create
    generate_token @current_user
    render json: {message: "Login successfully", success: true, data: @data}, status: 200
  end
  
 def generate_token user
    user.update_attributes login_token: SecureRandom.hex
    access_token = JsonWebToken.encode(user_id: user.id, login_token: user.login_token)

    @data = {
      access_token: access_token,
      token_type: "Bearer"
    }
  end
  ```
  Tinh thần của việc lưu token ngay trong user thì sẽ là đăng nhập cho 1 thiết bị tại một thời điểm. Nếu muốn có thể login đồng thời nhiều thiết bị cùng lúc thì chúng ta có thể tạo 1 bảng tokens để lưu các token riêng biệt.
  
  Thực hiện call api với dữ liệu là email truyền lên, chúng ta nhận được 1 cục data có access_token trả về, đó chính là chuỗi token mà chúng ta cần để xác thực mỗi lần gọi những api khác lên hệ thống :v
   ![](https://images.viblo.asia/8115732d-0f21-45a6-9527-2805b772147a.png)

  * Thực hiện xác thực access_token(chuỗi jwt): Kiểm tra các thông tin bên trong khi thực hiện những action cần xác thực
  ```
  def authenticate
    access_token = request.headers["JWTAuthorization"]
    @decoded = JsonWebToken.decode access_token&.split(" ")&.last
    @current_user = User.find @decoded.try(:[], :user_id)
    return if (@decoded.nil? || @current_user.login_token != @decoded.try(:[], :login_token))
    
    render json: {success: false , data: nil}, status: 400
  end
  ```
  * Đăng xuất: Thực hiện hủy tính hiệu lực của thông tin mấu chốt trong chuỗi mã hóa
  ```
  def destroy
    @current_user.update_attributes login_token: nil
    render json: {message: "Logout successfully",success: true, data: nil}, status: 200
  end
  ```
  Thực hiện hủy tính hiệu lực của access_token bằng cách hủy login_token của user ứng với sự xác thực đó
   ![](https://images.viblo.asia/3adce761-90ce-4f38-9113-498e35eeccb4.png)

  Trên đây cơ bản là mình xây dựng demo một chức năng login/logout(tạo và hủy token dùng jwt để mã hóa) để thể hiện được tính chất trao đổi dữ liệu xác thực người dùng
 
[Source](https://github.com/loctx-2273/json-web-token) mình đã Demo
# Kết
 Cơ bản mình trên đây là trải nghiệm về JWT khi sử dụng nó để áp dụng vào cơ chế xác thực người dùng trong ứng dụng API của mình. Có những kiến thức sử dụng chưa đúng hoặc chưa hợp lí, hay có bất cứ vấn đề gì vui lòng bạn đọc để lại lời bình tại phần comments để mình hoàn thiện hơn cho bạn đọc sau. Thân ái!