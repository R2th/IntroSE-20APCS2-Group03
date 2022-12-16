Ở [bài viết trước](https://viblo.asia/p/tim-hieu-ve-json-web-token-jwt-jvEla9ddlkw) mình đã mô tả về Jwt, tiếp theo đây hãy cùng tạo ra 1 function login đơn giản :v: 

## 1. Gem Jwt
```ruby
gem "jwt"
```
Được recommended trên jwt.io, hỗ trợ đầy đủ mọi tính năng để hoàn thiện đoạn mã Jwt:

![image.png](https://images.viblo.asia/d28d968c-946a-48d8-8de7-b63612933a44.png)

Cơ bản sẽ focus vào 3 yếu tố:
+ payload
+ SECRET_KEY_BASE
+ algorithm

Đến với payload, gửi lên những thông tin để xác thực user Ex: role, email, login_token (tương tự như session mà user đó đang sử dụng) 
```ruby
def payload
    {
      user_id: ...,
      login_token: ...,
      role: ...,
      email: ...,
      iat: ...,
      exp: ...
    }
end
```

Về phần [SECRET_KEY_BASE](https://api.rubyonrails.org/classes/Rails/Application.html) ứng với secret_key của Jwt, chuỗi này sẽ được gen tự động trong Rails app mỗi khi khởi tạo và được sở hữu bởi người dựng app (gồm 1 cặp file master.key và credentials.yml.enc). 

**Lưu ý:**

Tuy nhiên nếu sử dụng function Rails.application.secret_key_base để lấy chuỗi secret_key_base thì lên production sẽ bị lỗi do cặp file nhắc tới trước đó sẽ không tồn tại.

![image.png](https://images.viblo.asia/62f9040a-2dc4-4fc6-9330-0dc6375708ca.png)
Dựa vào function được định nghĩa trên github, secret_key_base sẽ ưu tiên sử dụng biến ENV trước nên sẽ bớt phức tạp và không cần phải config lại production nếu sử dụng biến ENV["SECRET_KEY_BASE"] ở mọi môi trường.

Cuối cùng là algorithm, tùy vào  yêu cầu của mỗi dự án mà chọn 1 algorithm thích hợp Ex: [HS256, ES512, ...](https://curity.io/resources/learn/jwt-best-practices/)

```ruby
def access_token
   JWT.encode payload, ENV["SECRET_KEY_BASE"], Settings.jwt.algorithm
end
```
## 2. Trích xuất Jwt-Authorization từ request headers

JwtAuthorization, Jwt-Authorization hoặc bất kì cái tên nào bạn nghĩ ra và phù hợp (Hạn chế sử dụng Authorization sẽ gây ra nhầm lẫn với Basic Authen). Trong ví dụ dưới đây, key mình chọn là Jwt-Authorization ( [ Rails config exception](https://stackoverflow.com/questions/25892194/does-rails-come-with-a-not-authorized-exception) )

```ruby
def load_jwt_token
    header = request.headers["HTTP_JWT_AUTHORIZATION"] # Header được extract sẽ có dạng HTTP_xxx
    raise UnauthorizedRequest unless header.is_a?(String) 
   
    jwt_authorization = header.split 
    valid_token_type = jwt_authorization.first == "Bearer" # Token type
    jwt_token = jwt_authorization.last # Chuỗi Jwt
    raise UnauthorizedRequest unless valid_token_type && jwt_token.present?

    jwt_token
end
```

Tiếp theo là bước verify lại token mình vừa nhận được và load info định danh của request đó:

```ruby
def decoded_token
    @decoded_token ||= JWT.decode token, ENV["SECRET_KEY_BASE"], true, {algorithm: Settings.jwt.algorithm}
end
```

Trả về của decoded_token sẽ là payload được truyền vào 

```ruby
def load_request_info
    @current_user = User.find_by id: decoded_token[0]["user_id"]
    @current_session = current_user.user_logins.find_by login_token: decoded_token[0]["login_token"] 
    # Ứng với trường hợp login nhiều device -> login_token được lưu ở bảng trung gian gọi là user_login 
    # Bên cạnh đó việc lưu login_token ở bảng trung gian sẽ đơn giản hơn cho việc mở rộng thành login dưới dạng 1 device
    # Tương tự với cách vận hành của gem "doorkeeper", khi user login vào app ta sẽ revoke tất cả các sessions trước đó
end
```

Trong quá trình decode nếu có lỗi xảy ra sẽ được raise lên dưới mã [JWT::DecodeError](https://github.com/jwt/ruby-jwt/blob/master/lib/jwt/error.rb). Trong một vài trường hợp cần phân biệt rõ ràng giữa các lỗi 
như là Jwt::ExpiredSignature, Jwt::DecodeError thì ta rescue như sau:
```ruby
def load_request_info
    ...decoded_token...
    rescue Jwt::ExpiredSignature
       ...
    rescue Jwt::DecodeError
       ...
    end
end
```

**Lưu ý:**

Không thể đặt Jwt::DecodeError lên đầu vì là class cha của Jwt::ExpiredSignature 

## 3. Test với postman 

Call API login với user đã generate từ trước -> 
![image.png](https://images.viblo.asia/cbac31cd-ef1b-474c-ae4f-5fef115397f5.png)

Sau đó mỗi lần client call request thì đính kèm Jwt-Authorization vào header -> 

![image.png](https://images.viblo.asia/fa8b89a2-ed12-404a-bd9c-befb8bd9d840.png)

## 4. Kết luận 

Happy coding! Make awesome thing today :v