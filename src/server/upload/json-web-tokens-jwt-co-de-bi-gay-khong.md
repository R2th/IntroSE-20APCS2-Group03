# I. Tổng quan về JWT
Phần này đã có một bài viết trên Viblo khá chi tiết mình xin phép được dẫn nguồn [tại đây](https://viblo.asia/p/tim-hieu-ve-json-web-token-jwt-7rVRqp73v4bP). Ở bài viết này mình sẽ tập trung vào việc phân tích việc sử dụng JWT không an toàn sẽ có thể bị lợi dụng để tấn công và khai thác như thế nào.
Để bạn đọc dễ hình dung  về JWT Token mình xin phép tóm lược lại một số nội dung chính:
## 1. JSON Web Token là gì?
### 1.1 Định nghĩ JWT Token
JSON Web Token (JWT) là một tiêu chuẩn mở (RFC 7519) nhằm xác minh thông tin an toàn giữa các bên Client-Server dưới dạng JSON object. Thông tin này có thể được xác minh và tin cậy vì nó được ký điện tử - digitally signed. JWT có thể được ký bằng cách sử dụng một secret (với thuật toán HMAC) hoặc cặp public/private key dùng chuẩn RSA hoặc ECDSA.
### 1.2 Cấu trúc của JWT Token
JWT token gồm 3 thành phần đó là: `header`, `payload` và `signature` có cấu trúc như sau:

![image.png](https://images.viblo.asia/afca635f-f7f7-4654-8d19-cdfb27ef2482.png)

Mỗi thành phần được thực hiện base64-encoded và được ngăn cách nhau bởi dấu chấm

**Header**

Trong header gồm có 2 phần, đó là: loại mã token, đó là JWT; và thuật toán được sử dụng, chẳng hạn HMAC SHA256 hoặc RSA.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload**

Trong Payload chứa các the claims. Claims thường chứa các thuộc tính như :typically, thông tin user và các dữ liệu bổ sung. Có 3 loại claims: registered, public, và private claims.
```json
{
      "sub": "1234567890",
      "name": "John Doe",
      "admin": true
}
```
**Signature**

Để tạo signature bạn phải lấy header được mã hóa, payload được mã hóa, một secret, thuật toán được chỉ định trong header và sign. Ví dụ bạn dùng thuật toán HMAC SHA256, signature sẽ được tạo như sau:
```json
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

**Ví dụ về JWT Token**

Dạng base64-encoded:

![image.png](https://images.viblo.asia/74e3b3a4-b518-448b-8bb6-bbcc59f7ffd1.png)

Dạng decoded (bản rõ):

![image.png](https://images.viblo.asia/f7116bf0-d65e-4b6d-8c0f-e8b4fb10b7f9.png)


### 1.3 Mục đích của JWT Token
- **Authentication**: Xác thực người dùng
- **Information Exchange**: Trao đổi thông tin một cách bí mật giữa client và server
### 1.4 JWT hoạt động như thế nào
![image.png](https://images.viblo.asia/4e081183-d444-4a76-9de7-5ddda6ad9db4.png)

1. Application hoặc client requests authorization đến authorization server. Điều này được thực hiện thông qua một trong các luồng authorization khác nhau. Ví dụ: một ứng dụng web tuân thủ OpenID Connect điển hình sẽ đi qua / oauth / ủy quyền điểm cuối bằng cách sử dụng luồng mã authorization.
1. Khi authorization được cấp, authorization server sẽ trả lại access token cho application.
1. Application sẽ sử dụng access token để truy cập vào resource (như API).

### 1.5 JWT vs JWS vs JWE
![image.png](https://images.viblo.asia/6000a615-03e7-4260-aad2-a1dabc01df80.png)



JWT thực sự rất hạn chế. Nó chỉ xác định một định dạng để biểu diễn thông tin ("yêu cầu") như một đối tượng JSON được giao tiếp giữa client và server. Trong thực tế, JWT không thực sự được sử dụng như một thực thể độc lập. JWT được mở rộng thêm JSON Web Signature (JWS) và JSON Web Encryption  (JWE) nhằm xác định các cách cụ thể để thực sự triển khai JWT.

Nói một cách đơn giản, đa số chúng ta nói đến "JWT" là đang đề cập tới "JWS". Khi cần mã hóa token chúng ta sẽ kết hợp và sử dụng thêm "JWE"

# Một số công cụ thao tác với JWT Token
Phần này mình sẽ giới thiệu tới mọi người một công cụ giúp chúng ta đọc dữ liệu JWT Token một cách dễ dàng. Công cụ cũng hỗ trợ một số hình thức tấn công vào JWT.

## 1. JWT  Editor (Extension BurpSuite)
Cài đặt từ BApp Store của BurpSuite
Để biết cách sử dụng BurpSuite mọi người tham khảo bài viết: [Burp Suite - "trợ thủ đắc lực" cho tester và pentester trong kiểm tra ứng dụng web
](https://viblo.asia/p/burp-suite-tro-thu-dac-luc-cho-tester-va-pentester-trong-kiem-tra-ung-dung-web-E375z4GWZGW)

**Cài đặt:**

![image.png](https://images.viblo.asia/23420b89-07c2-4208-aea6-a473498c12ec.png)

**Sử dụng:**

BurpSuite sẽ tạo thêm 1 tab có tên JSON Web Token.
Tại đây chúng ta có thể xem dữ liệu JWT Token dưới dạng encoded, cleartext và sửa đổi dữ liệu JWT Token.

![image.png](https://images.viblo.asia/54ddec72-fec0-489c-9ed5-c887569725ce.png)

**Hỗ trợ attack**
Công cụ còn hỗ trợ một số hình thức tấn công phổ biến (Có tại phần demo), Sign JWT Token, Encrypt Token
![image.png](https://images.viblo.asia/c148cda6-0a17-41f4-aaf0-4709917b2c65.png)
## 2. JWT.io (https://jwt.io/)
Website cho phép view dữ liệu JWT Token oline:

![image.png](https://images.viblo.asia/3bd56093-e4c3-492f-b9df-c8c9068ceef2.png)
# III. Một số hình thức tấn công JWT
## 1. Accepting arbitrary signatures (Chấp nhận chữ ký không hợp lệ)
Đây là hình thức tấn công vào tính toàn vẹn của JWT token. Thư viện JWT thường cung cấp một phương pháp để xác minh tính toàn vẹn của token (chống lại việc sửa đổi dữ liệu JWT Token trong request) và một phương pháp khác để giải mã chúng. Ví dụ, Node.js có thư viện jsonwebtoken sử dụng hàm verify() để xác minh tính toàn vẹn token và decode() để giải mã token.

Cơ chế verify chữ ký để đảm bảo dù người dùng biết thông tin được gửi lên là gì nhưng không thể tùy ý thay đổi dữ liệu vì server sẽ kiểm tra và từ chối yêu cầu nếu người dùng sửa đổi JWT Token không hợp lệ.

Đôi khi, lập trình viên nhẫm lẫn giữa hai phương pháp này và chỉ truyền các token vào hàm deocde() để tiến hành giải mã mà bỏ qua bước verfy() để xác minh chữ ký. 

Điều này cho phép tấn công vào JWT Token thông qua việc thay đổi dữ liệu và tự ký lại, vì server không tiến hành verify() nên dữ liệu là hợp lệ và hacker thành công trong việc sửa đổi dữ liệu và gửi lên server để tấn công.
### 1.1 Demo tấn công
Source: https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-unverified-signature

Sau khi đăng nhập và truy cập vào trang `My account` ta thấy giá trị JWT Token

Quan sát request được gửi lên
Ở đây có 2 thông tin đáng chú ý:

`"alg": "RS256"`: Thuật toán được sử dụng 

`"sub": "wiener"`: user đang đăng nhập hệ thống

![image.png](https://images.viblo.asia/b3709c25-4497-4c65-8540-9125808ac4d2.png)

Khi trử truy cập vào /admin. Trang web sử dụng JWT Token để xác thực và phân quyền user, user không có quyền không thể truy cập vào /admin

![image.png](https://images.viblo.asia/56573e21-59f1-4998-80c4-3d62f8015908.png)


Ở đây, chúng ta đoán rằng có thể hệ thống đang phân quyền theo user được truyền lên trong JWT Token. Chúng ta tiến hành sửa đổi dữ liệu trường `"sub": "wiener"` thành `"sub": "administrator"`và quan sát kết quả:
Và BOOM, Kết quả truy cập được trang admin thành công.

![image.png](https://images.viblo.asia/1e2931bd-30e9-46a1-9e30-cbb32f4913a6.png)

Giao diện admin cho phép quản trị users:

![image.png](https://images.viblo.asia/ae710b69-9560-45a6-9165-a34621bb8c65.png)



### 1.2 Nguyên nhân
Do developer không tiến hành verify chữ ký số ở phía server nên người dùng có thể thoải mái sửa đổi dữ liệu và gửi lên server.

### 1.3 Phương án 
Tiến hành verify JWT Token trên phía server để đảm bảo người dùng không thể thay đổi dữ liệu trái phép trong JWT Token

## 2. Accepting tokens with no signature (Chấp nhận token không có chữ kí)
Đây là hình thức tấn công vào thuật toán sử dụng để ký token.
JWT header chứa một tham số `alg`. Điều này cho máy chủ biết thuật toán nào đã được sử dụng để ký token và từ đó yêu cầu server cần sử dụng thuật toán nào khi verify chữ ký. 
Ví dụ:

```json
{
    "alg": "HS256",

    "typ": "JWT"
}
```

Khi người dùng truyền dữ liệu lên, server sẽ sử dụng thông tin này để tiến hành verify chữ ký số.
JWT có thể được ký bằng nhiều thuật toán khác nhau (chẳng hạn HMAC SHA256 hoặc RSA) và cũng có thể không được ký.
Trong trường hợp không được ký, giá trị của trường alg sẽ là `none`:
```json
{
    "alg": "none",

    "typ": "JW"
}
```
### 2.1 Demo tấn công
Source: https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-flawed-signature-verification

Một trang web sử dụng JWT Token để xác thực và phân quyền user, user không có quyền không thể truy cập vào /admin

![image.png](https://images.viblo.asia/b9500620-9970-4f1f-975b-9f2a06d71dc7.png)

Quan sát request được gửi lên
Ở đây có 2 thông tin đáng chú ý:

`"alg": "RS256"`: Thuật toán được sử dụng 

`"sub": "wiener"`: user đang đăng nhập hệ thống

![image.png](https://images.viblo.asia/87c8ba4e-36d8-4700-a6e3-3f3ad37e6eca.png)

Tấn công sử dụng kỹ thuật thay đổi dữ liệu `alg` thành `none` để server không tiến hành verify token
Sử dụng chức năng Attack trong JSON Web Token
![image.png](https://images.viblo.asia/27139824-142e-4247-bd34-0d6f8c9ec47d.png)

Thay đổi giá trị `"sub": "administrator"`
![image.png](https://images.viblo.asia/b58734d8-6946-4c5d-82f0-710813ae43f4.png)

Và kết quả:.. Truy cập thành công trang /admin:
![image.png](https://images.viblo.asia/bd9b4b85-f3b2-464b-82e2-52325f13ec5b.png)

Giao diện admin cho phép quản trị users:
![image.png](https://images.viblo.asia/b5142386-df16-452c-a6de-4fe70bfb79ad.png)
### 2.2 Nguyên nhân
Do developer tin tưởng vào dữ liệu người dùng gửi lên dẫn đến không sử dụng thuật toán để verify chữ ký trên server.

### 2.3 Phương án 
Tiến hành verify JWT Token trên phía server để đảm bảo luôn sử dụng thuật toán để verify token, không chấp nhận việc không sử dụng thuật toán.
# III. Lời kết
Các lỗ hổng JWT Token trong bài viết chủ yếu nằm ở việc triển khai JWT Token thiếu an toàn trên phía server nên kẻ tấn công có thể lợi dụng để tấn công vào JWT Token. Mình sẽ quay lại phần 2 với một số kỹ thuật tấn công khác. Các bạn chờ đợi nhé