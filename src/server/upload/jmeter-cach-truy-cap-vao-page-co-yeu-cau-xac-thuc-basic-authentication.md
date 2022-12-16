Bạn thường phải đối mặt với ứng dụng web yêu cầu người dùng xác thực (AUTHENTICATION). 

Xác thực truy cập cơ bản (Basic Access Authentication) là một trong những phương pháp xác thực đơn giản nhất:

1) Client bao gồm một HTTP Header như `Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=`, với Base64 mã hóa tên truy cập và mật khẩu `(username:password tương đương dXNlcm5hbWU6cGFzc3dvcmQ=trong Base64)` trong từng request

2) Server cấp quyền truy cập bất cứ khi nào username và password được cung cấp là chính xác 

Hướng dẫn này sẽ dạy cho bạn 3 cách khác nhau để xử lý xác thực cơ bản:

* Sử dụng HTTP Authorization Manager 
* Sử dụng  JSR223 PreProcessor với script tùy chỉnh *(ko hướng dẫn chi tiết)*
* Hoặc sử dụng base64Encode chức năng từ Custom Functions Plugin *(ko hướng dẫn chi tiết)*

## 1. Ví dụ
Hãy sử dụng HTTPBin.org làm ứng dụng ví dụ

`/basic-auth/:user/:passwd` Yêu cầu xác thực HTTPBasic
`/hidden-basic-auth/:user/:passwd` 404'd BasicAuth
`/digest-auth/:qop/:user/:passwd/:algorithm` Yêu cầu HTTP Digest Auth
`/digest-auth/:qop/:user/:passwd` Yêu cầu HTTP Digest Auth

HTTPBin là một ứng dụng demo tiện lợi, nó cung cấp các điểm cuối mẫu để gọi tới các tham số có thể cấu hình được

Ví dụ: khi nhấp vào `/basic-auth/:user/:passwd` liên kết, trình duyệt của bạn (ở đây tôi sử dụng Google Chrome) sẽ nhắc bạn nhập một username và password

![](https://images.viblo.asia/a352b519-12ee-4bef-a26f-35a4c5233d45.png)

Lời nhắc xác thực cơ bản của Chrome

Tên người dùng mặc định user và mật khẩu mặc định là passwd. Server sẽ phản hồi với json dưới đây:
```
{
  "authenticated": true,
  "user": "user"
}
```

**Lỗi xác thực Chrome**

Nếu bạn không cung cấp tên người dùng và mật khẩu đúng, máy chủ sẽ từ chối quyền truy cập vào tài nguyên được bảo vệ bằng lỗi HTTP 401: Lỗi trái phép

Xem chi tiết bằng cách nhấn F12 trong Chrome để mở nó, sau đó chọn Networktab

*Không có Authorizationtiêu đề trong yêu cầu*

![](https://images.viblo.asia/9ab5d59a-080f-4b00-b95f-1c345da4c478.png)

**Thành công xác thực Chrome**

Khi cung cấp thông tin đăng nhập và mật khẩu phù hợp, máy chủ sẽ phản hồi ngay lập tức với một HTTP 200: OK

Và có thể thấy rõ ràng trình duyệt gửi `Authorization: Basic dXNlcjpwYXNzd2Q=` tiêu đề http trong yêu cầu

![](https://images.viblo.asia/fb0b7478-26a1-4e03-a61d-e2b8d9ddf028.png)

**Hãy xem làm thế nào chúng ta có thể làm điều này với JMeter!**

## 2. Http Authorization Manager

### 2.1. Cấu hình:

![](https://images.viblo.asia/48a35c4a-8e74-41d0-b751-3df8b7d2ef50.png)

Thành phần JMeter chính để sử dụng là HTTP Authorization Manager:

Authorization Manager cho phép bạn chỉ định một hoặc nhiều thông tin đăng nhập của người dùng cho các trang web bị hạn chế sử dụng xác thực từ server

Nó cung cấp khả năng tự động thêm Authorization tiêu đề http có liên quan vào các yêu cầu http tiếp theo

![](https://images.viblo.asia/0e885f04-e25e-47a9-bbd5-e6e940551194.png)

Cấu hình xác thực demo vào HTTPBin

Thêm dòng sau vào bảng:

* Xóa Auth trên mỗi Iteration: có thể giữ nguyên
* Base URL: https://httpbin.org/basic-auth/user/passwd
* User: user
* Password: passwd
* Domain and Realm: empty
* Mechanism: BASIC_DIGEST

Bây giờ hãy tạo một yêu cầu HTTP 

### 2.2. HTTP Request

![](https://images.viblo.asia/3a5f00e5-809c-4b00-9e00-74c4ec4a76dd.png)

HTTP Request được định cấu hình với các cài đặt sau:

* Protocol: https
* Server name: httpbin.org
* Method: GET request
* Path: /basic-auth/user/passwd

Tất cả các cài đặt khác có thể được giữ nguyên. Cuối cùng, sử dụng  View Results Tree UI Listener để xem kết quả.

### 2.3. Chạy thử nghiệm

![](https://images.viblo.asia/f360c496-6146-4404-aea5-5bc33f215676.png)

**Http Authorization manager bị tắt**

Trước tiên, hãy chạy thử nghiệm với Http Authorization manager bị tắt. Máy chủ trả lại HTTP `401 Unauthorized` như mong đợi. 

Bây giờ hãy kích hoạt nó và so sánh chạy thử nghiệm.

![](https://images.viblo.asia/ccf8b16d-8fc8-407a-9b22-2c200817b94f.png)

**Http Authorization manager được bật**

Bây giờ máy chủ cấp quyền truy cập và trả về một HTTP 200 OK. 

Kiểm tra kĩ hơn các inspection của request cho thấy:

```
Request Headers:
Connection: keep-alive
Host: httpbin.org
User-Agent: Apache-HttpClient/4.5.5 (Java/1.8.0_161)
Authorization: Basic dXNlcjpwYXNzd2Q=
```

## 3. JSR223 PreProcessor
Còn tiếp >>>
## 4. Custom Functions Plugin
Còn tiếp >>>
## 5. JMeter Digest Auth
Còn tiếp >>>



*Nguồn tham khảo: https://octoperf.com/blog/2018/04/24/jmeter-basic-authentication/*