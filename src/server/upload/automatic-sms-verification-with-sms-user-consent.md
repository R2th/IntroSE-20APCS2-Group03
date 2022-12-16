Nếu bạn thực hiện xác minh SMS bằng cách sử dụng one-time-codes vào ứng dụng của mình, hãy xem SMS User Consent API mới.
SMS Verification là một cách phổ biến để thêm hình thức xác minh thứ hai vào các ứng dụng. Bằng cách gửi tin nhắn SMS chứa mã một lần như 1234, hoặc 481236, đến số điện thoại của người dùng, sau đó họ có thể nhập mã vào ứng dụng của bạn để xác nhận rằng họ đã nhận được tin nhắn SMS.

```
From: SMS
Message: Your one-time code is 1234.
```

Nhưng không ai thực sự thích gõ one-time-codes. Nó tẻ nhạt và dễ bị lỗi. Vì vậy, trong khi nó giúp xác minh cho ứng dụng của bạn, thì điều quan trọng là làm cho trải nghiệm trở nên liền mạch nhất có thể.
The SMS User Consent API cho phép ứng dụng của bạn nhắc người dùng cho phép đọc văn bản của một tin nhắn SMS có chứa mã một lần. Ứng dụng của bạn sau đó có thể phân tích tin nhắn và tự động hoàn thành luồng xác minh SMS!

Hiển thị tin nhắn văn bản one-time-code
Yêu cầu người dùng đọc một tin nhắn văn bản có chứa mã one-time-code.

Nếu bạn đã sử dụng SMS Retriever API - SMS User Consent API không deprecate hoặc thay thế nó. Chúng ta có thể thêm API thứ hai vì đôi khi các ứng dụng có thể sửa đổi thông báo để hỗ trợ SMS retriever API.

Bạn nên kiểm tra SMS retriever API trước khi triển khai SMS User Consent API để xem nó có hoạt động cho ứng dụng của bạn không. Nếu bạn có thể sử dụng nó, nó cung cấp trải nghiệm người dùng tốt hơn vì người dùng có thể bỏ qua lời nhắc!

### API Overview
Bài đăng này trình bày những điều cơ bản để sử dụng API - vừa đủ để bạn định hướng. Để có hướng dẫn đầy đủ về API (bao gồm triển khai mẫu), hãy xem tài liệu!
SMS User Consent API là một phần của Dịch vụ Google Play. Để sử dụng nó, bạn sẽ cần ít nhất phiên bản 17.0.0 của các thư viện này:

```
implementation "com.google.android.gms:play-services-auth:17.0.0"
implementation "com.google.android.gms:play-services-auth-api-phone:17.1.0"
```

### Bước 1: Lắng nghe tin nhắn SMS
SMS User Consent sẽ lắng nghe các tin nhắn SMS đến có chứa mã một lần trong tối đa năm phút. Nó đã thấy bất kỳ tin nhắn nào được gửi trước khi nó được bắt đầu.

SMS User Consent sẽ không bao giờ nhắc cho các tin nhắn không chứa mã một lần (4 đến 10 ký tự và có ít nhất một số) hoặc từ các danh bạ của người dùng.

Nếu bạn biết số điện thoại sẽ gửi mã one-time-code, bạn có thể chỉ định ***senderPhoneNumber***, nếu không thì giá trị ***null*** sẽ khớp với bất kỳ số nào.

Để bắt đầu SMS User Consent, bạn sử dụng đối tượng SmsRetriever:

`smsRetriever.startSmsUserConsent(senderPhoneNumber /* or null */)`

### Bước 2: Yêu cầu đồng ý đọc tin nhắn
Khi ứng dụng của bạn nhận được tin nhắn chứa mã one-time-code, nó sẽ được thông báo bằng một broadcast. Tại thời điểm này, bạn không đồng ý đọc tin nhắn - thay vào đó, bạn nhận được một *Intent* mà bạn có thể mở hộp thoại để người dùng đồng ý.
![](https://miro.medium.com/max/829/0*Bgiuf3q78lBKX6Aw)

trong ***BroadcastReceiver*** , bạn hiển thị lời nhắc bằng cách sử dụng ***Intent*** trong ***extras***.

Khi bạn start ***Intent*** đó , nó sẽ nhắc người dùng cho phép đọc một tin nhắn.

Nó sẽ hiển thị toàn bộ văn bản chia sẻ với ứng dụng của bạn.

```
val consentIntent = extras.getParcelable<Intent>(SmsRetriever.EXTRA_CONSENT_INTENT)
startActivityForResult(consentIntent, SMS_CONSENT_REQUEST)
```

### Bước 3: Phân tích mã one-time-code và hoàn tất Xác minh SMS
Khi người dùng nhấp vào ***Allow*** - đó là lúc để đọc tin nhắn!

Bên trong onActivityResult bạn có thể nhận được toàn bộ tin nhắn SMS từ dữ liệu:
```
val message = data.
    getStringExtra(
        SmsRetriever.EXTRA_SMS_MESSAGE)
```
Sau đó, bạn phân tích tin nhắn SMS và chuyển mã one-time-code đến backend của bạn!