## Giới thiệu 
JSON Web Token (JWT) là một tiêu chuẩn mở ([RFC 7519](https://tools.ietf.org/html/rfc7519)) nhằm xác minh thông tin an toàn giữa các bên Client-Server dưới dạng JSON object. Thông tin này có thể được xác minh và tin cậy vì nó được ký điện tử - digitally signed. JWT có thể được ký bằng cách sử dụng một secret (với thuật toán HMAC) hoặc cặp public/private key dùng chuẩn RSA hoặc ECDSA.

Signed tokens có thể xác minh tính toàn vẹn của các claim có trong đó, trong khi encrypted tokens ẩn các claim từ các bên khác. Khi token được đăng ký bởi các cặp public/private keys, signature cũng xác nhận rằng chỉ có bên giữ private key là nơi đã đăng ký nó.

## Khi nào ta nên dùng JSON Web Tokens?
Dưới đây là các lợi ích của việc sử dụng JWT:

* Ủy quyền - Authorization: Đây là trường hợp nên sử dụng JWT. Khi người dùng đã đăng nhập, mỗi request tiếp theo được gởi từ Client sẽ bao gồm JWT, cho phép người dùng access vào routes, services, and resources được phép với token đó. Single Sign ON là tính năng sử dung JWT rộng rãi hiện nay, vì chi phí thấp và dễ dàng sử dụng trên các domains khác nhau.
* Trao đổi thông tin - Information Exchange: JSON Web Tokens là một cách tốt để truyền thông tin an toàn giữa các bên Client và Server. Vì JWT có thể signed. Ví dụ, sử dụng các cặp public/private key, bạn có thể biết chắc người gửi. Ngoài ra, vì signature được xác định dựa vào header và payload, bạn cũng có thể xác minh rằng nội dung chưa bị giả mạo.

## Cấu trúc JSON Web Token
JSON Web Tokens  bao gồm 3 phần được phân tách bằng dấu chấm (.):

Header
Payload
Signature

Do đó, JWT thường trông như sau:

`xxxxx.yyyyy.zzzzz`

Hãy cùng mình tìm hiểu từng phần nhé!

### Header
Trong header gồm có 2 phần, đó là: loại mã token, đó là JWT; và thuật toán được sử dụng, chẳng hạn HMAC SHA256 hoặc RSA.

Ví dụ:

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Sau đó, JSON này được mã hóa Base64Url để tạo thành phần đầu tiên của JWT.

### Payload

Phần thứ 2 của token là payload, nó chứa các the claims. Claims thường chứa các thuộc tính như :typically, thông tin user và các dữ liệu bổ sung. Có 3 loại claims: registered, public, và private claims.

* Registered claims:  Đây là một tập hợp các claims được xác định trước không bắt buộc nhưng được khuyến nghị, để cung cấp một tập hợp các claims hữu ích, có thể tương tác. Thường là: iss (nhà phát hành), exp (thời gian hết hạn), sub (chủ đề), aud (audience) và những thứ khác.

> Lưu ý là claim names thường chỉ chứa 3 ký tự.

* Public claims: Chúng có thể được xác định theo ý muốn của những người sử dụng JWT. Nhưng để tránh xung đột, chúng phải được xác định trong IANA JSON Web Token Registry hoặc được định nghĩa là URI chứa namespace chống xung đột.

* Private claims: Đây là các claims tùy chỉnh được tạo để chia sẻ thông tin giữa các bên đồng ý sử dụng chúng và không phải là các registered hay public claims.

Ví dụ payload có thể như sau:

```
{
      "sub": "1234567890",
      "name": "John Doe",
      "admin": true
}
```
Payload sau đó được mã hóa Base64Url để tạo thành phần thứ 2 của JSON Web Token.

> Xin lưu ý rằng đối với các signed tokens, thông tin này, mặc dù được bảo vệ chống giả mạo, nhưng mọi người đều có thể đọc được. Không được đưa thông tin bảo mật vào các phần tử payload hoặc header của JWT trừ khi được mã hóa.

### Signature
Để tạo signature bạn phải lấy header được mã hóa, payload được mã hóa, một secret, thuật toán được chỉ định trong header và sign.
Ví dụ bạn dùng thuật toán HMAC SHA256, signature sẽ được tạo như sau:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```
Signature được sử dụng để xác minh tin nhắn không bị thay đổi trên đường truyền và trong trường hợp token được ký bằng private key, nó cũng có thể xác minh người gửi JWT.

## JSON Web Tokens hoạt động như thế nào?
Trong xác thực, khi người dùng đăng nhập thành công bằng thông tin đăng nhập của họ,  JSON Web Token sẽ được trả về. Vì token là thông tin xác thực, cần phải hết sức cẩn thận để ngăn chặn các vấn đề bảo mật. Nói chung, bạn không nên giữ token lâu hơn yêu cầu.

Bạn cũng không nên lưu trữ dữ liệu nhạy cảm trên session trong bộ nhớ trình duyệt do thiếu bảo mật.

Bất cứ khi nào người dùng muốn truy cập route hoặc resource được bảo vệ, tác nhân người dùng nên gửi JWT, thêm Authorization trong header với nội dung là Bearer + token. Nội dung của header sẽ trông như sau:

`Authorization: Bearer <token>`

Máy chủ server sẽ kiểm tra tính hợp lệ của JWT trong header mỗi khi nhận request, nếu hợp lệ người dùng sẽ được phép truy cập các resource được bảo vệ. Nếu JWT chứa dữ liệu cần thiết, nhu cầu truy vấn cơ sở dữ liệu cho các hoạt động nhất định có thể bị giảm, mặc dù điều này có thể không phải luôn luôn như vậy.

Nếu token được gửi trong Authorization header, Chia sẻ tài nguyên nguồn gốc chéo ( Cross-Origin Resource Sharing - CORS) sẽ không thành vấn đề vì nó không sử dụng cookie.

Sơ đồ sau đây cho thấy cách JWT được lấy và sử dụng để truy cập API hoặc resource:
![](https://images.viblo.asia/36f83306-2f90-4b34-ae0e-18b6e2956b37.png)

1. Application hoặc client requests authorization đến authorization server.  Điều này được thực hiện thông qua một trong các luồng authorization khác nhau. Ví dụ: một ứng dụng web tuân thủ OpenID Connect điển hình sẽ đi qua / oauth / ủy quyền điểm cuối bằng cách sử dụng luồng mã authorization.
2. Khi authorization được cấp, authorization server sẽ trả lại access token cho application.
3. Application sẽ sử dụng access token để truy cập vào resource (như API).

> Xin lưu ý rằng với các signed tokens, tất cả thông tin trong token vẫn được hiển thị cho người dùng hoặc các bên khác, mặc dù họ không thể thay đổi thông tin đó. Điều này có nghĩa là bạn không nên đặt thông tin bảo mật trong token.

Trên đây là phần tìm hiểu về JSON Web Token mà mình tham khảo từ bài [Introduction to JSON Web Tokens](https://jwt.io/introduction/) hy vọng sẽ giúp ích cho các bạn. :D