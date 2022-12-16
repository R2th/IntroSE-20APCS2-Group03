## Refresh token là gì?
Khi sử dụng refresh token, data nhận được khi request access token sẽ có dạng tương tự như sau
```
{
  "access_token": "AYjcyMzY3ZDhiNmJkNTY",
  "refresh_token": "RjY2NjM5NzA2OWJjuE7c",
  "token_type": "bearer",
  "expires": 3600
}
```
* ` access token` là 1 chuỗi được mã hóa, nó claim các thông tin của user, nếu để mất access token thì nó giống như trường hợp bị lộ password vậy. Vì vậy access token thường phải được đặt `expires` ngắn (~30 minutes).
*  Nếu trong trường hợp người dùng đăng xuất nhưng access token được đặt dài hạn, thì access token này cần được revoke bằng cách lưu lại vào blacklist access token.

-> Và theo mình đấy cũng là lý do cần sử dụng refresh token:
*  Access token là ngắn hạn, vì vậy refresh token(dài hạn) đảm nhiệm việc lấy lại access token khi hết hạn mà không bắt buộc user phải xác thực lại.
* Khi user đăng xuất, đơn giản chỉ việc xóa refresh token, việc lấy 1 access token mới khi dùng refresh token sẽ không được cho phép nữa.

## Refresh Tokens and Clients
* Khi sử dụng refresh token, chúng ta cần ràng buộc nó với client, client ở đây là các thiết bị đang giao tiếp với server API. Mỗi user khi xác thực với ứng dụng server sẽ lưu lại thông tin client của user, như là client_id, client_secret. 
* Client_id là thông tin unique và public để xác định ứng dụng của bạn trong số các ứng dụng khác sử dụng api. Client id được phép nằm trong source code ứng dụng, còn client_secret thì không, nó cần được bảo mật. Vì vậy khi build ứng dụng javascript, không cần thiết cho client_secret vào source code. Trong trường hợp này, client chỉ cần đưa client_id để ràng buộc với refresh token.
* Việc ràng buộc này cực kỳ quan trọng, giúp refresh token chỉ sử dụng được trên client đã xác thực user. Nghĩa là dù refresh token có bị đánh cắp thì nó cũng sẽ khó sử dụng được ở các thiết bị khác.

* Đây là mô hình thể hiện việc authentication.
![](https://images.viblo.asia/5e7432df-fb02-44e7-8cbd-5b96924b9aae.png)

Lưu ý: Để tránh trường hợp dù vẫn request hằng ngày nhưng refresh token hết hạn -> buộc user phải xác thực lại, thì khi dùng refresh token để tạo ra access token mới cũng sẽ tạo ra 1 refresh token mới, còn nếu lâu ngày không sử dụng ứng dụng (không request server) đến thời điểm refresh token hết hạn thì user sẽ bị logout.