# I. Mở đầu
- Google đã hạn chế các ứng dụng của bạn truy cập SMS không cần thiết, các nhóm quyền Nhật ký cuộc gọi từ người dùng.
- Google đã xem xét quyền riêng tư của ngừoi dùng một cách nghiêm túc. Bắt đầu từ Android Marshmallow nó đã tách riêng các quyền nguy hiểm và được đưa vào Runtime permissions. Với Android Pie, các ứng dụng không hoạt động thì không thể truy cập microphone, camera và cảm biến. Hiện tại, Google đã cập nhật Chính sách nhà phát triển Google Play của mình nhằm hạn chế SMS, CALL_LOG và chỉ truy cập vào các ứng dụng mặc định.

# II. Đối ứng
Thật vậy. Nếu bạn có một ứng dụng trên google play, ứng dụng của bạn yêu cầu quyền SMS hoặc CALL_LOG và ứng dụng của bạn không thực sự yêu cầu các quyền này, bạn nên xóa nó khỏi tệp AndroidManifest và nên cập nhật ứng dụng trong google play.

Nếu ứng dụng của bạn thật sự cần thiết đến quyền để có thể đáp ứng chức năng cho ứng dụng của bạn thì bạn nên điền đầy đur 6 trang [Permission Declaration Form](https://docs.google.com/forms/d/e/1FAIpQLSfCnRaa4b1VuHhE4gVekWJc_V0Zt4XiTlsKsTipTlPg5ECA7Q/viewform) và submit để Google play review

# III. Lựa chọn thay thế
Có khá nhiều lựa chọn. Hãy bắt đầu với những sự thay thế đơn giản.

## 1. Thực hiện cuộc gọi
Không sử dụng CALL_PHONE permission, sử dựng Intent

```
val intent = Intent().apply {
    action = Intent.ACTION_DIAL
    data = Uri.parse("tel:0123456789")
}
startActivity(intent)
```

## 2. Chia sẻ nội dung
Không cần quyền nhạy cảm
```
val sendIntent: Intent = Intent().apply {
    action = Intent.ACTION_SEND
    putExtra(Intent.EXTRA_TEXT, "This is my text to send.")
    type = "text/plain"
}
startActivity(sendIntent)
```

## 3. Gửi tin nhắn
Sử dụng intent
```
val intent = Intent().apply {
    action = Intent.ACTION_SENDTO
    data = Uri.parse("smsto:0123456789")
    putExtra("sms_body", "text message")
}
if (intent.resolveActivity(packageManager) != null) {
    startActivity(intent)
}
```

## 4. Đọc OTP trong app
Bây giờ, muốn đọc OTP trong app và xác thực người dùng. Phải làm sao? Đừng lo, với [SMS Retriever API](https://developers.google.com/identity/sms-retriever/overview), ứng dụng của bạn có thể tự động truy xuất mã verification mà ko cần quyền Runtime permission nào.

# IV. OTP verification với SMS retriever API
## 1. Điều kiện 
- Điện thoại Android của bạn với số điện thoại và chạy Google Service 10.2.x trở lên
- Server có thể gửi OTP theo định dạng được xác định trước

## 2. Android Implementation
- B1. Thêm `play-services-auth` vào `build.gradle` 
```
implementation "com.google.android.gms:play-services-auth:16.0.1"
```
- B2. Lấy số điện thoại từ người dùng để gửi đến server Ngoài ra, bạn có thể triển khai trình chọn gợi ý để nhắc người dùng chọn từ các số điện thoại được lưu trên thiết bị và do đó tránh phải nhập số điện thoại theo cách thủ công.
- B3. Khởi tạo `SmsRetrieverClient` và lắng nghe callback Success/Failure như sau:
```
val client: SmsRetrieverClient = SmsRetriever.getClient(this)

val task = client.startSmsRetriever()

task.addOnSuccessListener {
    // Successfully started retriever, expect broadcast intent
}

task.addOnFailureListener {
    // Failed to start retriever, inspect Exception for more details
}
```
Lưu ý: Khi SmsRetrieverClient chạy, nó sẽ đợi MỘT SMS phù hợp cho đến khi hết thời gian 5 phút.

- B4. Ngay khi addOnSuccessListener được kích hoạt, bạn có thể gửi số điện thoại đến server (thông qua API REST) để nhận thông báo OTP trở lại thiết bị từ server

## 3. Server-side implementation

Để làm cho SmsRetrieverClient hoạt động, một format cụ thể được tuân theo ở phía máy chủ trong khi tạo thông báo OTP.
1. Message được bắt đầu bằng tiền tố `<#>`
2. Message khôgn được lớn hơn 140 bytes
3. Message sẽ kết thúc bằng chuỗi băm 11 ký tự xác định ứng dụng của bạn.
> Google Play services use the hash string to determine which verification messages to send to your app. The hash key is made of the app’s package name and app’s public key certificate. You can refer official site for more info or use AppSignatureHelper to generate the hash string programatically. Generating hash string is a one time process.
4. Message nhận được ở ứng dụng client của bạn sẽ có dạng như sau:
```
<#> Your ExampleApp code is: 123ABC78
FA+9qCX9VSu
```

## 4. Quay trở lại ứng dụng của bạn

5. Bây giờ server gửi SMS xác minh đến điện thoại di động của chúng ta, chúng ta cần BroadcastReceiver để nghe và đọc nội dung tin nhắn như bên dưới.
```
class SmsBroadcastReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context?, intent: Intent?) {

        if (SmsRetriever.SMS_RETRIEVED_ACTION == intent?.action) {
            val bundle = intent.extras
            val status = bundle?.get(SmsRetriever.EXTRA_STATUS) as Status

            when (status.statusCode) {
                CommonStatusCodes.SUCCESS -> {
                    val msg = bundle.get(SmsRetriever.EXTRA_SMS_MESSAGE) as String
                    print("Received message : $msg")
                }
                CommonStatusCodes.TIMEOUT -> {
                    // Handle Timeout error
                }
            }
        }
    }
}
```

6. Thêm receiver trong `AndroidManifest.xml`
```
<receiver android:name=".SmsBroadcastReceiver" android:exported="true">
    <intent-filter>
        <action android:name="com.google.android.gms.auth.api.phone.SMS_RETRIEVED"/>
    </intent-filter>
</receiver>
```

Khi nhận được tin nhắn server ứng dụng của chúng ta sẽ được chọn. Bạn có thể trích xuất OTP và sử dụng nó để xác minh.

# V. Kết luận
Chúng ta đã tạo thành công chức năng truy xuất OTP mà không cần sự cho phép SMS

Đây là một vài lựa chọn thay thế mà tôi có thể giải quyết ngay bây giờ. Nhưng nó chưa phải giải quyết được bao gồm tất cả mọi thứ. Ví dụ: CALL_LOG, tôi đã không tìm thấy bất kỳ giải pháp thay thế nào cho đến nay. Nếu bạn phát hiện ra giải pháp nào có thể để lại bình luận.
Để có thể hiểu chi tiết thêm về các hạn chế và cách giải quyết. Bạn có thể xem thêm [tại đây](https://support.google.com/googleplay/android-developer/answer/9047303?source=post_page---------------------------)

Nguồn: [medium](https://proandroiddev.com/no-more-sms-call-log-permissions-now-what-9b8226de7827)