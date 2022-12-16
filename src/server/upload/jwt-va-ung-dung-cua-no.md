## Khái niệm
JSON Web Token (JWT) là 1 tiêu chuẩn mở (RFC 7519) định nghĩa cách thức truyền tin an toàn giữa bên bằng 1 đối tượng JSON. Thông tin này có thể được xác minh và đáng tin cậy vì nó được ký điện tử. JWT có thể được ký bằng cách dùng một secret (sử dụng thuật toán HMAC) hoặc cặp khóa public/private bằng thuật toán RSA hoặc ECDSA 
## JWT nên được sử dụng trong trường hợp nào?

### Một ứng dụng phổ biến nhất của JWT đó là xác thực API:
Sau khi user login phía client sẽ nhận response bao gồm jwt, ở mỗi request sau đó sẽ gửi kèm JWT. server sẽ xác minh token đó và user có thể truy cập resouce, routes được phép với token đó.
### Làm thế nào để expire một token
Nếu bạn muốn expire một token bạn có thể thêm một trường trong cơ sở dữ liệu (vd: created_at). Trường này sẽ ánh xạ thời gian tạo của token. Khi token được tạo ra một claims iat sẽ được sinh ra, claims này sẽ lưu thời gian token được tạo và khi token được gửi lên server sẽ so sánh iat của token đó với created_at. Vậy nếu bạn muốn expire một token thì đơn giản là chỉ việc update trường created_at. 

### Trao đổi thông tin
JWT có thể được sử dụng để trao đổi thông tin giữa các bên một cách an toàn. Bởi vì jwt có thể được ký bằng cách sử dụng cặp private/public key - bạn có thể chắc chắn rằng người gửi là ai và họ nói điều gì. Ngoài ra, vì jwt xác minh bằng header, payload nên bạn có thể xác minh thông tin không bị giả mạo.

### Sử dụng JWT để xác thực SPA
JWT có thể được sử dụng như một cơ chế xác thực không yêu cầu cơ sở dữ liệu. Server có thể tránh sử dụng cơ sở dữ liệu vì dữ liệu trong JWT được gửi đến client là an toàn.

### Sử dụng JWT để ủy quyền hoạt động trên các server
Giả sử bạn đăng nhập vào server 1. sau khi đăng nhập sẽ được redirect sang server 2 để thực hiện một số hoạt động. Trong trường hợp này server 1 có thể cấp cho bạn một JWT cho phép bạn sử dụng server 2. Hai server không cần thiết phải sử dụng bất cứ phương thức xác thực nào khác.
## Cấu trúc của JWT
JSON Web Tokens bao gồm 3 phần được phân tách bằng dấu chấm (.) đó là:
*  Header
*  Payload
*  Signature

=>  JWT có cấu trúc như sau: xxxxx.yyyyyy.zzzzzz
### Header
Header thường bao gồm hai phần: loại token, là JWT và thuật toán ký đang được sử dụng, chẳng hạn như HMAC SHA256 hoặc RSA.
Ví dụ:
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```
### Payload
Phần thứ 2 của token là payload, nó chứa các the claims. Claims thường chứa các thông tin entity (thông tin user) và các dữ liệu bổ sung. Có 3 loại claims: registered, public, và private claims.
* Registered claims: Đây là một tập hợp các claims được xác định trước không bắt buộc nhưng được khuyến nghị. Ví dụ: iss (issuer), exp (expiration time), sub (subject), aud (audience)...
* Public claims: Được định nghĩa bởi người dùng. Nhưng để tránh xung đột, chúng phải được xác định trong I[ANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml) hoặc được định nghĩa là URI chứa namespace chống xung đột.
* Private claims: Đây là các custom clams được tạo để trao đổi thông tin giữa các bên và thỏa thuận sử dụng chúng
### Signature
Để tạo phần chữ ký, bạn phải lấy header được mã hóa,payload được mã hóa, một secret, thuật toán được chỉ định trong header và sign.
Ví dụ nếu sử dụng thuật toán HMAC SHA256 signature được tạo bằng cách:
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

## Làm sao để lưu trữ JWT an toàn.
* Như đã giới thiệu ở trên một ứng dụng phổ biến nhất của JWT là xác thực API và để có thể làm được việc này cần lưu lại jwt. Vậy jwt cần lưu ở đâu cho an toàn. Nếu lưu trữ nó bên trong localStorage, nó có thể truy cập bằng bất kỳ script nào trong trang của bạn (một cuộc tấn công XSS có thể cho phép kẻ tấn công bên ngoài lấy được token).
* JWT cần được lưu trữ bên trong cookie httpOnly, một loại cookie đặc biệt chỉ được gửi trong các yêu cầu HTTP đến máy chủ và không bao giờ có thể truy cập được (cả để đọc hoặc ghi) từ JavaScript đang chạy trong trình duyệt.
## JWT làm việc như thế nào?
* Trong xác thực API khi user login server sẽ trả về cho client một JWT. Ở các request sau để có thể truy cập vào tài nguyên người dùng đó thì cần gửi token này lên. Token này sẽ được gửi trong header với key là Authorization và value có dạng `Bearer <token>` token ở đây là JWT.
* Sơ đồ dưới đây cho thấy hoạt động xác thực API bằng JWT
![](https://images.viblo.asia/2e9c9fae-7ccb-4c71-a0b7-bc8bbc0dd50c.png)
1.  Ứng dụng hoặc máy client yều cầu ủy quyền đến authoriztion server
2.  Khi yêu cầu ủy quyền được xác nhận. authorization server sẽ trả về một access token cho ứng dụng (client)
3.  ứng dụng (client) sử dụng access token để truy cập vào resource được bảo vệ
* Lưu ý rằng với các mã thông báo đã ký, tất cả thông tin có trong mã thông báo sẽ được hiển thị cho người dùng hoặc các bên khác, mặc dù họ không thể thay đổi nó. Điều này có nghĩa là bạn không nên đặt thông tin bí mật trong mã thông báo.
## Tại sao bạn nên sử dụng JWT

* Để có thể nêu rõ được ưu điểm của JWT chúng ta sẽ so sánh nó với Simple web token(SWT) và Security Assertion Markup Language Tokens (SAML). 
* Vì JSON nhỏ gọn hơn XML nên kích thước của nó sau khi mã hóa cũng nhỏ gọn hơn, làm cho JWT nhỏ gọn hơn SAML. Điều này làm cho JWT là một lựa chọn tốt cho môi trường HTML, HTTP.
* Về mặt bảo mật JWT chỉ có thể được ký bằng một secret được chia sẻ bằng thuật toán HMAC. Tuy nhiên, JWT và SAML có thể sử dụng cặp public/private dựa trên chứng chỉ X.509 để ký
* JSON parsers là phổ biến với hầu hết các ngôn ngữ lập trình vì chúng ánh xạ trực tiếp đến đối tượng. JWT, XML không có ánh xạ tài liệu sang đối tượng. Điều này giupws làm việc với JWT dễ dàng hơn với SAML.
## TÀI LIỆU THAM KHẢO
* https://jwt.io/introduction
* https://blog.logrocket.com/jwt-authentication-best-practices/