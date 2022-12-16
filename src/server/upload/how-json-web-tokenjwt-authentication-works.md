#### 1. JWT (JSON Web Token) là gì ?
- JSON Web Token (JWT) là một tiêu chuẩn mở [(RFC7519)](https://tools.ietf.org/html/rfc7519) nhằm đảm bảo an toàn thông tin được truyền đi giữa các bên dưới dạng đối tượng JSON
- Thông tin này có thể xác minh và đáng tin cậy vì nó là chữ ký điện tử . Jwt có thể được đăng ký băng cách sử dụng bí mật (với  thuật toán **HMAC**) hoặc cặp khóa public/private bằng **RSA**   
- Nó có kích  thước nhỏ gọn:   có thể gửi qua URL, tham số POST hoặc bên trong Header, quá trình truyền đi của nó cũng rất nhanh.
- Nó có tính khép kín :  payload chưa tất cả các thông tin của người dùng, để tránh truy vấn cơ sở dữ liệu nhiều lần.
- Mục đích sử dụng **JWT**   không phải để ẩn dữ liệu  mà để đảm bảo tính xác thực của dự liệu . 
- JWT là một cơ chế  xác thực không trạng thái  dựa trên mã thông  báo. Vì là phiên không trạng thái dựa trên phía client, server không phải hoàn toàn dựa vào  kho dữ liệu (DataBase) để lưu thông tin phiên làm việc (session).


![](https://images.viblo.asia/a983b6f6-db22-4657-9e39-dd43c75f0a89.png)


#### 2. Kiến trúc của JWT
- Một JSON Web Token bao gồm có 3 phần phân tách nhau bằng dấu chấm.

```
header.payload.signature

xxxxx.yyyyy.zzzzz

```

![](https://images.viblo.asia/e8a60783-3c1d-47a4-b3df-eca49c1a371b.png)


#### Header
- JWT header bao gồm loại mã thông báo và thuật toán dùng cho chữ ký và mã hóa. Thuật toán có thể **HMAC**, **SHA256**, **RSA**, **HS256** hoặc **RS256**.

```
{
  "typ": "JWT",
  "alg": "HS256"
}
```

#### Payload
 - Payload bao gồm dữ liệu phiên làm việc được gọi là xác nhận quyền sở hữu. Dưới đây làm một số quyền tiêu chuẩn mà chúng tôi có thể sư dụng :

1. Issuer (iss)
2. Subject (sub)
3. Audience (aud)
4. Expiratuib tine (exp)
5. Issused at (iat)



```
{
    "sub": "user10001",
    "iat": 12456321321
}
```
chúng ta có thể tùy chỉnh các  quyền xác nhận để có thể. Khi tùy chỉnh quyền xác nhận được thiết lập.

- Không đặt dữ liệu lớn trong các nhóm xác nhận quyền sở hữu. Bộ xác nhận quyền sở hữu phải nhỏ gọn.
- Không đặt thông tin nhạy cảm vì JWT có thể được giải mã dễ dàng.

```
    {
         "sub": "user10001",
         "iat": 156721827,
         "role": "admin",
         "user_id": "user10001"
    }
```

#### Signature
- Chữ ký được sử dụng để xác minh rằng người  gửi JWT là đúng người gửi và để đảm bảo nội dung  không bị thay đổi trong quá trình gửi giữa các bên.
- Để tạo chữ ký , header được mã hóa base64 và payload, cùng với một số bí mật và chữ ký được chỉ định thuật toán trong header.

ví dụ : nếu bạn đang tạo chữ ký cho mã thông báo bằng thuật toán HMAC, SHA256 :
```
     HMACSHA256(
      base64UrlEncode(header) + "." +
      base64UrlEncode(payload),
      secret)
```
- Chữ ký là một phần rất quan trọng nhất  của JSON Web Token(JWT). Chữ ký được tính toán bằng cách mã hóa header và payload sử dụng **Base64url** để mã hóa và nối chúng cùng dấu phân cách. Sau đó được đưa cho thuật toán mã hóa.

```
// signature algorithm
data = base64urlEncode(header) + "." + base64urlEncode(payload)
signature = HMAC-SHA256(data, secret_salt)
```
Vì vậy, khi header hoặc payload thay đổi, chữ ký phải tính toán lại. chỉ nhà cung cấp danh tính (Identity Provider(IdP)) mới có private key để tính toán chữ ký nhằm ngăn chặn việc giả mạo mã thông báo
#### 2. Nó  hoạt động như thế nào ?
- Cách thức hoạt động của xác thực dựa trên mã thông báo cũng khá đơn giản. Người dùng nhập thông tin đăng nhập của mình và gửi đến serrver. Nếu thông tin xác thực là chính xác , server sẽ tạo mã thông báo được  mã hóa là suy nhất với thuật toán HMACSHA256 và còn được gọi là JSON Web Token (JWT). Bên phía client sẽ lưu trữ và thực hiện đính kém mã này với các yêu cầu tiếp theo  tới server.
- Server xác thực người dùng bằng cách nó sẽ lấy jwt được gửi từ bên client sang giải mã ròi so sanh với mã trong cơ sở dữ liệu.
- 
Trong xác thực, khi người  dùng đăng nhập thành công bằng thông tin đăng ký của người dùng, bên server sẽ trả lại Jwt (đoạn string gọi là mã token). Đoạn mã này đã được mã hóa

Vì mã thông báo là thông tin xác thực nên cần hết sức cẩn thận  ngăn chặn các vấn đề bảo mật an ninh. Nói chung bạn không nên giữ mã thông lâu khi không yêu cầu.
- Bạn cũng không nên lưu trữ trên session hay bộ nhớ trình duyệt do thiếu bảo mật.
- Bất cứ khi nào người dùng muốn truy cập vào routes  nó se gửi jwt, thương là trong header để ủy quyền băng cách sử dụng lược đồ **Bearer**. Nội dung header như sau:

    ```
        Authorization: Bearer <token>
    ```


- Đây là một cơ chế xác thực không trạn thái. Vì trạng thái người dùng không báo giờ được lưu ở bộ nhớ  server. các router của server sẽ được bảo vệ, nếu như server kiểm tra jwt trong header là valid thì sẽ cho phép truy cập. vì các jwt là khép kín nên tất cả các thông tin cần thiết đều có, giảm việc phải truy vấn vào cơ sở dữ liệu.

- Điều này cho phép hoàn toàn dựa vào  các API dữ liệu không trạng thái và thấm chí đưa ra các yêu cầu đối với các dịch vụ . Không quan trong là các domain nào phục vụ API, vì chia sẻ tài nguyên  nguồn gôc ( Cross-Origin Resource Sharing (CORS)) vì không sử dụng cookies.

![](https://images.viblo.asia/8afeafaa-f1ed-4a33-8e27-c7318a0920cd.jpeg)




#### 3. Bảo mật

Cũng giống như cơ chế xác thực khác, JWT cũng có ưu nhược điểm riêng.
- Phải sử dụng HTTPS để đảm bảo xác thực headers.
- Xác thực tên thuật toán một cách rõ ràng. Không hoàn toàn dựa vào một thuật toán được đề cập trong header của JWT. Có một số cuộc tấn công được biết đén dựa trên header như tân công không có bí danh, header stripping.
- Việc thu hồi phiên ngươi dùng từ server là rấ khó. Vì JWT được thiết lập để tự động hết hạn, nếu kẻ tấn công lấy được mã thông báo trước khi nó hết hạn , nó sẽ dẫn đến nhiều cách khai thác khác nhau. Xây dựng danh sách thu hồi mã thông báo trên server của bạn để làm mất hiệu lực mã thông báo có thể là cách tốt nhất để giảm thiểu.
-  Nếu JWT tồn tại trên cookies, chúng ta cần tạo cookies HTTPOnly . Điêu này sẽ hạn chế javascript của bên thứ ba đọc mã thông báo jwt từ cookies.
-  CSRF -- Nếu JWT vẫn tôn tại trên cookies, các cuộc tấn công CSRF có thể xay ra. Chúng tôi có thể giảm thiểu CSRF băng cách sử dụng request gôc và request header đặc biệt.
-  XSS -- về phía server phải luôn đảm bảo dữ liệu người dùng tạo ra phải không chưa những dữ liệu  tiềm ấn nguy cơ chữ mã độc
-
#### 4. Khi nào thì nên sử dụng JWT
Đây là một số trường hợp mà JWT sẽ hữu ích :
- **Authentication**:  Đây là một trường hợp điển hình sử dụng JWT.  Mỗi khi người dùng đăng nhập, mỗi yêu cầu tiếp theo sẽ bao gồm JWT, cho phép nguời dùng truy cập routes và tài nguyên được phép truy cập với mã thông báo đó. Đăng nhập một lần là mọt tính năng được sử dụng rộng rãi  của JWT ngày nay, chi phí nhỏ việc sử dụng giữa các hệ thống có tên miền khác nhau.
- **Information Exchange**  : là cách tốt để truyền thông tin an toàn giưa các bên, vì chúng có thể được ký . Chắng hạn như sử dụng public key / private key. Bạn có thể chăc chắn răng người gửi là ai. Ngoài ra , chữ ký  được tính toán bằng cách sử dụng header và payload bạn có thể xác minh răng nội dung không thay đổi.

#### 5. JWT có thể được sử dụng theo nhiều cách khác nhau:
- Authentication: Khi người dùng đăng nhập thành công với thông tin đăng ký, ID token sẽ được trả lại. Theo thông số ký thuật của OpenIDconnect (OIDC) , ID token luôn là JWT.

- Authentication: Sau khi người dùng đăng nhập thành công, ứng dụng có thể yêu cầu truy cập các routes, dịch vụ hoặc tài nguyên khác (ví dụ API) thay mặt cho người đó. Để làm như vậy , mọi yêu cầu nó phải có access token, có dạng JWT. Đăng nhập một lần (SSO) sử dụng rộng rãi JWT vì chi phí nhỏ của định dạng và khả năng dễ dàng được sử dụng trên các domain khác nhau.

- Information Exchange:  ách tốt để truyền thông tin giữa các bên một cách an toàn vì có chữ ký. có nghĩa là bạn chăc chắn rằng người gửi đúng như họ nói.

link tham khảo :

https://www.pluralsight.com/guides/token-based-authentication-with-ruby-on-rails-5-api

https://medium.com/@sureshdsk/how-json-web-token-jwt-authentication-works-585c4f076033

https://auth0.com/docs/tokens/json-web-tokens/json-web-token-structure