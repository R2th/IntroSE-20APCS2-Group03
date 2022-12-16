Xin chào các bạn hôm nay thủ thuật lập trình sẽ giới thiệu cho các bạn json web token, đây là một vấn đề thường gặp trong lập trình web, để làm được vấn đề này các bạn phải tìm hiểu json web token là gì, công dụng thế nào, vai trò của nó như thế nào, những tác hại và lợi ích jwt mang đến cho bạn.
Json web token là gì?
JSON Web Token (JWT) là một chuẩn mở (RFC 7519) định nghĩa một cách nhỏ gọn và khép kín để truyền một cách an toàn thông tin giữa các dạng đối tượng JSON. Thông tin này có thể được xác minh và đáng tin cậy vì nó có chứa chữ ký số.
JWTs có thể được ký bằng một thuật toán bí mật (với thuật toán HMAC) hoặc một public / private key sử dụng mã hoá RSA, hiện nay có rất nhiều trang web sử dụng jwt bởi những lợi ích và sự bảo mật nó mang đến.
Sau đây là một ví dụ JWT.
> eyeJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2bncwMDEzNzM2Iiwicm9sZSI6Ik1hbmFnZXIiLCJ0b2tlbl91c2FnZSI6ImFjY2Vzc190b2tlbiIsImp0aSI6IjY4OTA4MjBlLTc3MWItNDY0YS04MGQ2LTg3NGMxM2E1ZTgyNCIsInNjb3BlIjoib3BlbmlkIiwiYXpwIjoid2VhdGhlciIsIm5iZiI6MTU2Njc4NDEyMCwiZXhwIjoxNTY2Nzg3NzIwLCJpYXQiOjE1NjY3ODQxMjAsImlzcyI6Imh0dHA6Ly9maHMuc3NvLmNvbS52bi8ifQ.3ruHPIc1KQ-qCRhP84JmD8iu05YMcVmK2gyqAKVnqiw
> 
Các bạn nếu nhìn vào token trên thì thấy rất phức tạp như vậy nhưng thực ra khá đơn giản sau đây mình sẽ giải thích cụ thể như sau :
<base64-encoded header>.<base64-encoded payload>.<base64-encoded signature>
    Nói một cách khác, JWT là sự kết hợp (bởi dấu .) một Object Header dưới định dạng JSON được encode base64, một payload object dưới định dạng JSOn được encode base64 và một Signature cho URI cũng được mã hóa base64.
    Tìm hiểu về 3 thành phần của JWT
Header jwt:
Header bao gồm hai phần chính: loại token (mặc định là JWT - Thông tin này cho biết đây là một Token JWT) và thuật toán đã dùng để mã hóa (HMAC SHA256 - HS256 hoặc RSA).
    {
  "alg": "HS256",
  "typ": "JWT"
}
    Payload jwt:
Payload chứa các claims. Claims là một các biểu thức về một thực thể (chẳng hạn user) và một số metadata phụ trợ. Có 3 loại claims thường gặp trong Payload: reserved, public và private claims.
Reserved claims: Đây là một số metadata được định nghĩa trước, trong đó một số metadata là bắt buộc, số còn lại nên tuân theo để JWT hợp lệ và đầy đủ thông tin: iss (issuer), iat (issued-at time) exp (expiration time), sub (subject), aud (audience), jti (Unique Identifier cho JWT, Can be used to prevent the JWT from being replayed. This is helpful for a one time use token.
>     {
>     "iss": "jira:1314039",
>     "iat": 1300819370,
>     "exp": 1300819380,
>     "qsh": "8063ff4ca1e41df7bc90c8ab6d0f6207d491cf6dad7c66ea797b4614b71922e9",
>     "sub": "batman",
>     "context": {
>         "user": {
>             "userKey": "batman",
>             "username": "bwayne",
>             "displayName": "Bruce Wayne"
>         }
>     }
> }
>
Các bạn có thể tham khảo bài viết **[tìm hiểu json web token](https://tienanhvn.blogspot.com/2019/08/tim-hieu-json-web-token.html)** tại đây nhé.