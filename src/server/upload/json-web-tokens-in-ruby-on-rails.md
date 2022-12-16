# **JSON Web Tokens**
Đối với một bài viết này của mình, Mình xin giời thiệu một cách mã hóa cho JSON đang nội tiếng nhất trong những mã hóa hiện này. Đố là [***JSON Web Token***](https://jwt.io/). Nếu bạn đang viết một api để trả về thông tin và để  dùng cái token để bảo mất. Mình nền quyết các bạn lựa chọn ***JWT***.

![](https://images.viblo.asia/0d1034cf-6d5e-4c13-bf8c-fa0bca84e063.png)
## **JSON Web Token là gì ?**
JSON Web Token (JWT) là một chuẩn của nhà khóa học ([RFC 7519](https://tools.ietf.org/html/rfc7519)) được sáng tạo ra trong mục tiệu mã hóa và bảo mất thông tin chuyển trong JSON. Sự bảo mất và mã hóa đó được xác thực bởi một chuẩn hóa dữ liệu được gọi là thuật toán mã hóa ([HMAC](https://en.wikipedia.org/wiki/HMAC)) hoặc sử dụng thuật toàn khóa ngoài và khóa trong (public và private key) để chuẩn hóa theo thuật toàn [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) hoặc [ECDSA](https://en.bitcoin.it/wiki/Elliptic_Curve_Digital_Signature_Algorithm).

Theo JWT chung ta cùng có thể mã hóa dữ liệu giữa 2 bên khác nhau, nhưng chúng ta phải quan tâm tới token của chữ ký. Token của chữ ký giúp chung ta có thể bảo mất được cách mã hóa của một bên này sáng bên khác, có nghĩa là có 2 bên theo đối với nhau do việc chuẩn hóa khóa ngoài và trong.
 ![](https://images.viblo.asia/38c1c4e0-57a5-4db5-8293-796c0cb17df9.png)
 
 ## **Lúc nào bạn cần phải dùng JSON Web Token ?**

Có 2 điều bạn cần phải chú ý nghĩ tới nếu dịch vụ của bạn đang làm có liên quan đến cái đó.

- Xác thực (Auhtorization):  Đó là phổ biến nhất đối với JWT. Bạn cần tạo một service phần quyền cho từng người sử dùng dịch vụ của bạn, sau khi một người dùng của bạn đăng nhập xong vào hệ thống của bạn, bạn có thể trả về lại cho người dùng với token chữ kỳ. Thông qua chữ kỳ của token đó bạn có thể cho phép người dùng sử dụng service mà bạn k cần phải bắt người dùng đăng nhập một lần nữa.
- Trao đối  thông tin dữ liệu (Information Exchange): Đối với sự trao đối thông tin dữ liệu JWT đó là một cách tốt nhất và bảo mất cao để trao đổi thông tin dữ liệu giữ 2 bên. Bởi vì (đã từng nói bên trên) JWT có thể sử dụng khóa ngoài và trong giữa người gửi và người nhận để xác thực với nhau. Và chữ kỳ token đó thường xuyên đặt ở trong header và 2 người gửi và nhận có thể đặt giời hạn cho chữ kỳ token đó được.

## **Cấu trúc của JSON Web Token**
Đối với JSON web token có 3 cấu trúc thật là đơn giản đó là:
- Header
- Payload
- Signature
Một cách đơn giản bạn có thể nhìn lai jwt có dạng như thế này:
```
xxxxxxxx.yyyyyyyyy.zzzzzzzzz
```
## **With Ruby on Rails**
Đối với Ruby on Rails mình xin giời thiệu các một cách đơn giản để apply jwt trong dự án. Trước mặt để bắt đâu với mình, bạn phải khởi tạo một project trong Ruby on Rails bằng câu lệnh sau:
```
$ rails new jwt
$ cd jwt
```
Đối với ruby on rails mình xin giời thiệu một Gem của Rails đc dùng để tạo json web token đó là ```gem 'jwt'```, Ok để tiếp tục , add gem này vào ```Gem``` File xong rồi chạy ```bundle install```. Gem này hộ trỡ những thuật toàn như sau NONE, HMAC, RSASSA, ECDSA, và RSASSA-PSS, nhưng bạn cần phải tự lựa trong lúc bạn dùng gem này. Trong bài viết này mình xin giời thiệu  các bạn về cách dùng gem này với thuật toàn [HMAC](https://en.wikipedia.org/wiki/HMAC).  Đối với thuật toàn HMAC bạn có thể lựa chọn thuật toàn mã hòa sau này:

- HS256 - HMAC dùng   SHA-256 hash 
- HS512256 - HMAC dùng SHA-512-256.
- HS384 - HMAC dùng SHA-384 hash 

    Mình sẽ tạo một file trong folder được gọi là ```services``` đó là ```jwt_web.rb```  và trong file ```jwt_web.rb``` Mình sẽ viết nội dụng như sau:
    ```
    class JwtWeb
          JWT_SECRET = "my_secret_key"

      def self.encode payload
        JWT.encode(payload, JWT_SECRET, "HS256")
      end

      def self.decode token
        body = JWT.decode(token, JWT_SECRET)[0]
        HashWithIndifferentAccess.new body
      rescue JWT::ExpiredSignature, JWT::VerificationError => e
        raise ExceptionHandler::ExpiredSignature, e.message
      rescue JWT::DecodeError, JWT::VerificationError => e
        raise ExceptionHandler::DecodeError, e.message
      end
    end
    ```
    - Cách sử dụng:
    ```
    data = {email: "test@test.com"}
    # mã hóa
    token = JwtWeb.encode(data)
    =>  eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.jvJBsE_pJrDaaJszJGwlEoI9-Zuj8NpI5mkRpD8DkbY
    # giải mă
    decode_token = JwtWeb.decode(token)
     => {"email"=>"test@test.com"}
    ```
    ## Kết luận
    - Mình hỳ vọng rằng một bài viết này có thể giúp các bạn hiểu rõ một chút về jwt, như thực tế lúc bạn làm về JWT token bạn cùng cần phải chú ý thêm giờ hạn của token, cách mã hóa của thuật toàn nào hợp lý nhất đối với project của bạn và có thể xây dựng được một cơ sở hệ thông xác thực đơn giản hơn.
    ## Tài liệu:
    - [GEM JWT](https://www.rubydoc.info/gems/jwt/2.1.0)
    - [Ruby on Rails với jWT](https://engineering.musefind.com/building-a-simple-token-based-authorization-api-with-rails-a5c181b83e02)