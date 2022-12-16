Đây là bài dịch từ của một chia sẻ trên trang [medium](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/@abhimuralidharan/strong-password-suggestion-in-ios-12-a745d9ddf999

Bài viết này sẽ giải thích cách kích hoạt đề xuất một mật khẩu mạnh trong iOS 12.

![](https://images.viblo.asia/f268e848-ebf7-4246-8aea-f6c2f4c81781.png)
Bài viết này là một phiên bản ngắn gọn của [video WWDC](https://developer.apple.com/videos/play/wwdc2018/204/) này.
Bạn vui lòng đọc bài viết của tôi về [tự động điền mật khẩu](https://medium.com/@abhimuralidharan/password-autofill-for-ios-apps-for-faster-login-ios-11-1d9f77deb35a) trước khi tiếp tục 🔥🔥🔥🔥.
Từ iOS 12, bạn có thể  thấy iOS gợi ý mật khẩu mạnh khi bạn đăng ký vào một ứng dụng nào đó. Đây là một tính năng mới trong iOS được giới thiệu trong WWDC 2018. Tôi sẽ giải thích cách nó hoạt động trong iOS.
![](https://images.viblo.asia/1c0a19f5-0989-464f-b782-f36c65293ce4.png)

### Làm cách nào để bật tính năng tự động điền mật khẩu mạnh trong iOS?
Kích hoạt tính năng này rất dễ dàng. Tất cả những gì bạn cần làm là đặt thuộc tính *textContentType* thành *.newPassword*:
```
newPasswordTextField.contentType = .newPassword
```
Mặc định, mật khẩu được tao ra sẽ có 20 ký tự. Chúng bao gồm các **chữ viết hoa**, **chữ số**, **gạch nối** và **chữ thường**. Điều này cung cấp cho bạn một mật khẩu mạnh với hơn 71 bits entropy. Apple đã thiết kế điều này để các mật khẩu trở nên mạnh mẽ, nhưng vẫn tương thích với hầu hết các dịch vụ. Tất nhiên, ứng dụng của bạn vẫn có thể tự định nghĩa các quy tắc mật khẩu tùy chỉnh của riêng mình. Như đã đề cập ở trên, trong hầu hết các trường hợp, bạn không cần phải làm điều này vì định dạng mặc định của Mật khẩu mạnh tự động có độ tương thích cao với các hệ thống.
Dưới đây là một ví dụ mật khẩu mặc định được tạo nếu chúng ta không cung cấp bất kỳ quy tắc mật khẩu mạnh nào.
```
tobzi2-cyczyz-sesSyt
dekdiq-nYtwa2-magjic
remniT-xyrte1-wevsev
```
> Chúng bao gồm các **chữ viết hoa**, **chữ số**, **gạch nối** và **chữ thường**.

Tuy nhiên, nếu phía backend của ứng dụng của bạn yêu cầu một bộ quy tắc riêng không tương thích với định dạng mặc định của Mật khẩu mạnh tự động, bạn có thể định nghĩa quy tắc của riêng mình. Để làm như vậy, hãy sử dụng ngôn ngữ quy tắc mật khẩu mới trong iOS 12. Apple không có quyền truy cập vào thông tin đăng nhập được lưu trữ trong Keychain, vì vậy, quyền riêng tư của người dùng cũng sẽ được đảm bảo.
### Làm cách nào để tùy chỉnh Quy tắc tự động điền mật khẩu?
Giả sử bạn muốn yêu cầu mật khẩu có ít nhất 8 ký tự bao gồm hỗn hợp chữ hoa và chữ thường, ít nhất một số và nhiều nhất là hai ký tự liên tiếp. Bạn sẽ phải thực hiện như sau:
```
let newPasswordTextField = UITextField()
newPasswordTextField.passwordRules = UITextInputPasswordRules(descriptor: "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;")
```

Tham khảo [bài viết này](https://developer.apple.com/documentation/security/password_autofill/customizing_password_autofill_rules) để biết thêm các cách để tùy chỉnh quy tắc sinh mật khẩu.

Bạn có thể sử dụng [Công cụ xác thực quy tắc mật khẩu](https://developer.apple.com/password-rules/) để tạo, xác thực và tải xuống mật khẩu mẫu cho mục đích thử nghiệm, v.v.
![](https://images.viblo.asia/8b40b282-7fd4-49ec-9046-0616ef25b090.png)