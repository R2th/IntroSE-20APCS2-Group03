Bài viết này sẽ cung cấp thông tin chi tiết về Authorization header.
# 1. Định nghĩa
API sử dụng Authorization để đảm bảo rằng người dùng truy cập dữ liệu một cách an toàn. Đây là tiền đề để nhận biết người gửi yêu cầu và quyền truy cập dữ liệu của họ.

Có nhiều kiểu xác thực khác nhau. Dữ liệu xác thực có thể được bao gồm trong **header**, **body** hoặc **parameter** khi gửi yêu cầu.

Với Authorization header, thông tin để xác thực người dùng được gửi kèm trong **header**.
# 2. Danh sách
### a. Basic Auth
![](https://images.viblo.asia/bd7e6a55-ec09-490c-93c2-9ad6527f618e.png)

Basic Auth là một kiểu xác thực đơn giản được tích hợp trong giao thức HTTP.

Authorization header sẽ chứa một chuỗi base64-encoded, là giá trị username và password người dùng, được thêm vào header như sau:
```
Authorization: Basic <Base64 encoded username and password>
```
Base64-encoded không phải là encryption hoặc hashing. Base64 có thể dễ dàng được decoded. Phương pháp này tương đương với việc gửi thông tin đăng nhập dưới dạng văn bản rõ ràng. Do đó nên dùng HTTPS kết hợp với Basic Auth.
### b. Bearer Token
![](https://images.viblo.asia/6a080d0c-2384-454e-ab36-ad98d58393b7.jpg)

Thường được gọi là Token authentication. Đây là một hình thức xác thực HTTP liên quan đến token có tên là Bearer token. Như tên mô tả Bearer Token cấp quyền truy cập cho người dùng khi có token hợp lệ.

Bearer token là một chuỗi văn bản, thường được tạo bởi server và trả về sau yêu cầu đăng nhập. Client phải thêm token này ngay sau `Bearer` và gửi đi trong Authorization header khi yêu cầu các tài nguyên được bảo vệ như sau:
```
Authorization: Bearer <token>
```
Tương tự như Basic Auth, Bearer Token chỉ nên được sử dụng qua HTTPS (SSL). JSON Web Token (JWT) được khuyến khích cho Bearer Token
### c. API Key
![](https://images.viblo.asia/266fb212-ad2c-4566-b78a-d42851a3b0dd.jpg)

Với API Key, một cặp key-value được bao gồm trong header hoặc query parameter sẽ gửi tới server khi gọi API.

Key-value trong query string:
```
GET /endpoint?api_key=api_value
```
Hoặc trong request header:
```
Api-Key: api_value
```
### d. Digest Auth
![](https://images.viblo.asia/e4fc18c0-d988-4ee1-ae57-62d2dee53fba.jpg)

Digest Auth truyền thông tin đăng nhập ở dạng mã hóa, bằng cách áp dụng hash algorithm cho username và password để chuyển đổi thành giá trị của response, sau đó gửi đến server sau khi server cung cấp: `nonce`, phương thức HTTP, URI đã yêu cầu...

HTTP Digest Auth là hoạt động như sau:
1. Client gửi request đầu tiên đến server.
2. Server phản hồi với `nonce`, `Realm`, một vài thành phần khác với HTTP code là `404 unauthorized` yêu cầu xác thực.
3. Client phản hồi lại với những dữ liệu nhận được phía trên kết hợp thêm `username`, `response`.
4. Nếu `response` hợp lệ, server sẽ phản hồi với thông tin đã yêu cầu. Nếu không, sẽ thông báo lỗi.
```
Authorization: Digest username="admin" Realm="abcxyz" nonce="1357908642", uri="/uri" response="qwertyuiopasdfghjklzxcvbnm"
```
**Lưu ý:**
- `nonce`: Một chuỗi duy nhất được chỉ định bởi server, chỉ dùng 1 lần duy nhất.
- `Realm`: Một chuỗi được chỉ định bởi server, là 1 hash.
- `response`: Là kết quả sau khi mã hóa username, password, `Realm`.
### e. OAuth2.0
![](https://images.viblo.asia/75c455fe-5d49-43d5-ac88-95c446f9863c.jpg)

Với OAuth 2.0, trước tiên cần truy xuất access token cho API, sau đó sử dụng token đó để xác thực các yêu cầu sau đó. Truy cập thông tin qua luồng OAuth 2.0 khác nhau rất nhiều giữa các nhà cung cấp dịch vụ API, nhưng thường liên quan đến một số yêu cầu qua lại giữa client, user và API.

Luồng OAuth 2.0 hoạt động như sau:
1. Client yêu cầu người dùng cấp quyền truy cập vào dữ liệu của họ.
2. Nếu người dùng cấp quyền truy cập, ứng dụng gửi request với chi tiết xác thực đã nhận được đến nhà cung cấp dịch vụ để lấy access token.
3. Nhà cung cấp dịch vụ xác nhận các chi tiết được gửi lên, nếu hợp lệ thì trả lại access token.
4. Client sử dụng access token để yêu cầu dữ liệu người dùng thông qua nhà cung cấp dịch vụ.
```
Authorization: Bearer <access_token>
```
### f. Hawk Authentication
![](https://images.viblo.asia/3dcb92b5-dbe5-4833-ae96-06a9a6d5e437.jpg)

Hawk authentication cho phép bạn ủy quyền các yêu cầu bằng cách sử dụng partial cryptographic verification.

Các thông số Hawk Authentication như sau:
- **Hawk Auth ID**: Giá trị ID xác thực API.
- **Hawk Auth Key**: Giá trị khóa xác thực API.
- **Algorithm**: Là một hash algorithm (sha266, sha1) được sử dụng để tạo message authentication code (MAC).
- Các thông số nâng cao:
    - `user`: Username.
    - `nonce`: Một chuỗi ngẫu nhiên được tạo bởi client.
    - `ext`: Thông tin đặc biệt của ứng dụng sẽ được gửi cùng với request.
    - `app`: Ràng buộc giữa thông tin đăng nhập và ứng dụng để ngăn kẻ tấn công sử dụng thông tin đăng nhập.
    - `dlg`: ID của ứng dụng mà thông tin đăng nhập đã được cấp.
    - `timestamp`: Timestamp của server sử dụng để ngăn chặn *replay attacks* bên ngoài time window.

Trong request header, Hawk Authentication giống như sau:
```
Authorization: Hawk id="abcxyz123", ts="1234567890", nonce="zxcvbnm", mac="qwertyuiopasdfghjkl"
```
### g. AWS Signature
![](https://images.viblo.asia/e8af3172-b5b6-4c90-96ac-659a9b61d128.jpg)

AWS là quy trình cấp phép cho các request của Amazon Web Services (AWS). AWS sử dụng HTTP scheme tùy chỉnh dựa trên keyed-HMAC (Hash Message Authentication Code) để xác thực.

Nếu dùng request header , `Authorization` và `X-Amz-` cần được ghép phía trước chi tiết xác thực và thêm vào header. Còn dùng request URL, chi tiết xác thực theo sau `X-Amz-` cần được thêm trong params.

Các thông số AWS Signature như sau:
- **AWS Region**: Khu vực nhận yêu cầu (Mặc định là `us-east-1`).
- **Service Name**: Dịch vụ tiếp nhận yêu cầu.
- **Session Token**: Chỉ bắt buộc khi sử dụng thông tin xác thực bảo mật tạm thời.

Có thể xem thêm về AWS Signature tại:
- [Signing and authenticating REST requests](https://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html)
- [Use Postman to call a REST API](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-use-postman-to-call-api.html)