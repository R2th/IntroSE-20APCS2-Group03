## Postman authorization
Để người dùng truy cập một cách an toàn thì các APIs đều có các tính năng ủy quyền, sẽ cho phép một cá nhân sử dụng hệ thống và dữ liệu lưu trữ trên hệ thống đó. Các ủy quyền này được cấp và quản lý tùy thuộc vào mỗi hệ thống. Truy cập một số APIs với Postman cần có các thông số này vậy cần tích hợp như thế nào?

Postman cung cấp các yêu cầu ủy quyền sẵn có mà người dùng có thể sử dụng (tùy thuộc vào từng hệ thống yêu cầu) các authorization này sẽ được thêm vào Headers hay Body của request : 
![](https://images.viblo.asia/5a06fabd-3b18-4583-9ec2-5c876d66876e.PNG)

- Inheriting auth
- No auth
- API key
- Bearer token
- Basic auth
- Digest auth
- OAuth 1.0
- OAuth 2.0
- Hawk authentication
- AWS Signature
- NLTM authentication
- Akamai EdgeGrid

Ví dụ mình sẽ thực hành với API:  https://api.github.com/user/repos  của github với một số cách xác thực ủy quyền trên:

Đầu tiên thì cần có "giấy ủy quyền" cái này có thể đăng ký ở nhiều chỗ khác nhau tùy thuộc yêu cầu của bạn.
- Đăng ký bằng username và password
- Đăng ký token: [Personal access tokens](https://github.com/settings/tokens) - token bạn đã tạo có thể được sử dụng để truy cập API GitHub.
- Đăng ký oauth app: [OAuth Apps](https://github.com/settings/developers) - Đây là những ứng dụng bạn đã đăng ký để sử dụng API GitHub.
- ...
### Sử dụng với API key
![](https://images.viblo.asia/49598f2a-4244-44c6-a7c4-03a7374211c7.PNG)

Cách sử dụng này rất giống với cách thêm key 'Authorization' trên Headers (giống quá vì nó là một mà). Nhưng ở đây thì có thể thêm nó vào Query Params. Mình đã dùng Authorization với value là: Bearer <`Personal access tokens`>

### Sử dụng với Bearer token
:rofl: Như cái trên thôi nhưng ở đây không cần thêm Bearer ở trước nữa vì đã chọn loại authorization là `Bearer token` rồi:
![](https://images.viblo.asia/7806f8f2-b0e1-4d42-8561-f3b9b466e926.PNG)


### Sử dụng với Basic auth
![](https://images.viblo.asia/ffdd0e8a-e9bf-4c5f-a6c4-b6f9f7f28ce1.PNG)

Cách này thì đúng là Basic rồi :stuck_out_tongue_winking_eye: chỉ cần đăng nhập với  bằng username và password, hầu hết các APIs đều có thể sử dụng cách này :+1: nhưng với điều kiện là bạn không bật xác thực bảo mật 2 yếu tố (`two-factor authentication`) cho tài khoản của mình hay bất cứ thứ gì tương tự thế. Nó chỉ tương tự với trang login với username và password thôi không hơn!!

Nhưng tôi vẫn muốn đăng nhập với `Basic auth` và `Xác thực 2 yếu tố` thì làm như thế nào?
Đơn giản bạn chỉ cần gửi thêm mã xác thực 2 lớp theo trên Header thôi: 
`X-GitHub-OTP: ******`    

![](https://images.viblo.asia/17b757dc-7abe-4ba7-b770-4bacb4bc1759.PNG)
### Sử dụng với OAuth 2.0 

Cách này thì cần có OAuth App được đăng ký trước với `Client ID` và `Client Secret`, và ngoài ra bạn cần có  `Callback url` (tự đăng ký trên oauth),  `Auth URL`,  `Access Token URL` (2 cái này do hệ thống cung cấp) ví dụ:
![](https://images.viblo.asia/efbaf4ee-a4ec-4a04-a1df-2a7305604a56.PNG)
## Tổng kết
Còn một số cách nữa mình vẫn chưa có thử qua :yum: mong nhận được gợi ý từ mọi người.
Cảm ơn mọi người đã đọc bài viết của mình :white_flower::white_flower::white_flower: