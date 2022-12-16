# 1.  Json Web Token là gì?
Giả sử để truyền tin mật từ anh A sang người trong tổ chức A, vậy làm thế nào để nhận biết người B cũng thuộc tổ chức A? Khi đó, tổ chức A nảy ra một ý tưởng, cho anh A một mật mã để trước khi tiếp nhận hay truyền đi thông tin sẽ đưa ra mật mã để định danh đó là anh A. Thông qua ví dụ trên, giống như mối quan hệ giữa server và client, anh A sẽ đại diện cho server, tổ chức A tương tự như client và mật mã để định danh anh A gọi là ***Jwt***.

![](https://images.viblo.asia/6feb7474-21f4-479d-8d3a-70d052e31c03.png)

## Về cơ chế hoạt động của access token
1. Khi đăng nhập thành công server sẽ gửi về cho client 1 access token dưới dạng Jwt.
2. Client lưu token và trong mỗi request tiếp theo sẽ gửi kèm token trên header - tùy vào mỗi cách viết sẽ có cách đặt tên header khác nhau (Jwt-Authorization, JwtAuthorization, ...).
3. Server verify lại access token và trả về response cho client nếu token hợp lệ.
# 2.  Jwt gồm những gì?
Theo [định nghĩa của Jwt được tạo bởi Auth0](https://jwt.io/), một Jwt token hợp lệ gồm 3 phần: header, payload và signature được phân cách bởi dấu chấm "."                                
(header.payload.signature) .
## Header
Thông thường gồm có 2 phần chính, 1 là dạng token - Jwt và thuật toán giải mã được sử dụng. 
```
{
    "alg": "HS256",
    "typ": "JWT
}
```
Thông tin sẽ được encode bằng Base64url tạo ra 1 header hoàn chỉnh:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```
## Payload
Là nơi sẽ chứa những thông tin cần thiết để định danh user và thời hạn được access như  ***user_id, role, login_token, exp, ...***
```
{
    "user_id": "1",
    "role": "admin",
    "exp": 1000,
    "iat": 800,
    "login_token": "adsadlasd"
}
```
những giá trị như ***iat, exp, iss ...*** chúng ta gọi là claims và có 3 loại chính:
*  Register claims: Là set các [giá trị](https://tools.ietf.org/html/rfc7519) được định nghĩa từ trước bởi Jwt - chúng không phải bắt buộc nhưng được *recommended*, ví dụ:
    * exp: đại điện cho expiration_time.
    * iat: thời gian user request đăng nhập.

Hiệu số của exp và iat sẽ là khoảng thời gian mà token có hiệu lực (trong ví dụ trên exp - iat = 200). 
* Public claims: Được xác định bởi cộng đồng sử dụng Jwt - để tránh sự trùng lặp, việc defined các claim được public ở trang [IANA JSON Web Token Registry.](https://www.iana.org/assignments/jwt/jwt.xhtml)
* Private claims: Được tạo riêng cho một tổ chức, hay một dự án cụ thể được chấp nhận bởi người trong cuộc (Ex: login_token).

Cũng tương tự như header,  payload được encode bằng Base64Url để tạo thành phần thứ 2 trong Jwt.
```
eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTAwMCwiaWF0Ijo4MDAsImxvZ2luX3Rva2VuIjoiYWRzYWRsYXNkIn0
```

Note: Header và payload chỉ được encode bằng Base64Url, nên hạn chế để các thông tin nhạy cảm trừ khi thông tin đó đã được mã hóa (email, password, ...)
## Signature
Công cụ giúp chúng ta bảo mật token từ client gửi về server là hợp lệ, được tạo ra từ 3 phần: 
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

HMACSHA256 là thuật toán, 2 phần encode của header và payload + 1 secret key được tạo ra từ dự án. Vì signature bao gồm cả header và payload, nhờ vào đó ta xác định được nội dụng message không thay đổi và ai là người gửi đi message đó.

Đặt tất cả vào chung với nhau ta được một Jwt hoàn chỉnh:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTAwMCwiaWF0Ijo4MDAsImxvZ2luX3Rva2VuIjoiYWRzYWRsYXNkIn0.aIp-Pciwrh23ATqU1CpH8PIZ6_sa7IRZ5hhxUw-iQIM
```

# 3. Kết luận
Thông qua bài viết này hi vọng mọi người có cái nhìn tổng quan hơn về Jwt hay cách hoạt động của một access_token giữa client và server, ở bài viết tiếp theo mình sẽ giới thiệu về việc implement Jwt trong rails. Chúc mọi người một ngày làm việc vui vẻ! Happy coding!