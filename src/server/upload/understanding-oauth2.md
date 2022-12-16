![](https://images.viblo.asia/808dd625-6cc0-4b49-8ee4-799df8a4d103.png)
:boom:
# Cookie authentication
Việc xác thực người dùng bằng cookie (`cookie-based authentication`) mặc định đã được sử dụng trong khoảng thời gian dài trước đây.

Do `cookie-based authentication`  đơn giản và hiệu quả nên hiện nay rất nhiều web app vẫn còn sử dụng cơ chế xác thực này:

1. User nhập thông tin đăng nhập và gửi lên server
2. Server xác thực thông tin là đúng và tạo `session` được lưu trữ trong database
3. Cookie với `sessionID` được lưu ở `browser` của user
4. `sessionID` được gửi kèm trong các lần request tiếp theo và được server kiếm tra lại trong database, nếu thành công, user được xác thực

Tuy vậy,  `cookie-based authentication` cũng có một vài nhược điểm :

* `Cookie-based authentication` là giao thực lưu trữ trạng thái (`stateful`). Server phải lưu giữ `active session` và query tới database mỗi khi có request tới
* `Cookie` được gắn liến với một tên miền cố định, phải thêm configuration nếu muốn tương tác với nhiều domain khác nhau
* `Cookie-based authentication` không hỗ trợ trong một vài trường hợp người dùng muốn cho phép ứng dụng bên thứ 3 truy cập thông tin của họ (e.g đăng nhập bằng facebook, google, twitter, ...)
---
# OAuth2
`OAuth2` là một framework hộ trỡ việc phân quyền cho phép các ứng dụng web  có thể sử dụng được các thông tin của người dùng đã được người dùng cho phép.

## Roles
`OAuth` định nghĩa 4 role:
* `resource owner`: User cấp quyền cho phép các ứng dụng có thể truy cập thông tin của mình
* `resource server`: server nơi lưu trữ thông tin được cấp, cung cấp thông tin nếu nhận được `access token` hợp lệ từ `client`
* `client`: ứng dụng bên thứ 3 được cấp quyền truy cập thông tin của user
* `authorization server`: server thực hiện công việc xác thực với người dùng (`resource owner`), cung cấp `access token` (`refresh token`) nếu user xác thực thành công

## Protocol flow
![](https://images.viblo.asia/30c09e23-555f-411a-9468-3c3d2be2c628.png)

`client` yêu cầu `authorization` từ `resource owner` (người dùng). `authorization request` thường được  gửi tới `authorization server`

Sau khi người dùng nhập thông tin xác thực (`authorization giant`: username, password) thì được gửi tới `authorization server`. `authorization server` xác thực thông tin, nếu thành công trả về `access token` (có thể thêm `refresh token`) cho `client`

`client` sử dụng `access token` nhận được để request `protected resource` từ `resource server`(thường thì `authorization server` và `resource server` là một)

## Authorization Grant
`Authorization Grant`là thông tin xác thực đại diện cho sự cho phép của người dùng (truy cập thông tin của người dùng), `authorization grant` `client` sử dụng để lấy `access token` từ `authorization server`

OAuth có 4 `grant type`: `Authorization Code`, `Implicit`, `Resource Owner Password Credentials`, `Client Credentials` ( [Authorization Grant](https://tools.ietf.org/html/rfc6749#section-1.3) )
### Authorization Code
![](https://images.viblo.asia/77b31507-5645-4f24-acbb-a4b9ee642ee6.png)

1. `client` chuẩn bị một link tới `authorization server`. người dùng được dẫn tới theo đường dẫn này
2. Người dùng nhập thông tin đăng nhập
3. Trình duyệt gửi thông tin vừa nhập đến `authorization server` để xác thực
4.  `authorization server` xác thực người dùng và redirect tới `client` với `authorization code`
5.  `client` sử dụng `authorization code` gửi lại tới `authorization server` để lấy `access token`(và có thể có thêm `refresh token`)
6.  `client` sử dụng `access token` nhận được để truy cập thông tin của người dùng

-----


# JSON Web Token (JWT)
`access token` được `client` lưu trữ và gửi kèm ở những lần request kế tiếp trong `Authorization` header,  trong đó `JWT` được sử dụng rộng rãi

`JWT` bao gồm 3 phần :
* `header`: mô tả loại token và thuật toán mã hóa
* `payload`: chứa thông tin cần truyền nhận (`user_id`, ...)
* `signature`: dùng để xác thực token

Cả 3 phần đều được `Base64URL` mã hóa.

Mỗi lần server nhận được request kèm theo `jwt`, server decoded `jwt`, check xem thuật toán mã hóa có được hỗ trỡ, check trường `signature` đảm bảo token hợp lệ, check trường `exp` trong `payload` để đảm bảo token chưa hết hạn


## Refresh token
`access token` sẽ hết hạn trong một khoảng thời gian, lúc này ta sẽ cần `refresh token` để request `access token` mới

![](https://images.viblo.asia/4e3ba1ff-6d27-4764-b81b-0da161d2e55b.png)

Khi `access token` hết hạn (invalid), `refresh token` sẽ được `client` gửi tới `authorization server` request `access token` mới.

> Refresh token cũng có thời gian hết hạn, khi refresh token hết hạn, client sẽ bị logout và cần thực hiện đăng nhập lại

-----

Trên đây là một số tìm hiểu của mình về OAuth, bài viết tiếp theo ta sẽ tìm hiểu cách áp dụng OAuth vào trong `rails` :grin:. Cảm ơn mọi người đã quan tâm !

:blue_car:
# Tham khảo
[RFC 6749 - The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)

[Understanding OAuth2 and Building a Basic Authorization Server of Your Own: A Beginner’s Guide](https://medium.com/google-cloud/understanding-oauth2-and-building-a-basic-authorization-server-of-your-own-a-beginners-guide-cf7451a16f66)