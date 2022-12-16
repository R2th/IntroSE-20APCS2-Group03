Như chúng ta đã biết, Google ngày càng thắt chặt bảo mật dữ liệu người dùng, bằng chứng là ở các version gần đây google đã hạn chế và gỡ bỏ 1 số quyền nhạy cảm như yêu cầu nhật ký cuộc gọi và tin nhắn SMS
Chính vì vậy Google đã cung cấp cho developer 2 API để xác minh OTP qua SMS:
- SMS Retriever API 
- SMS User Consent API

Về SMS Retriever API các bạn có thể tham khảo  [tại đây](https://viblo.asia/p/android-xac-minh-sms-tu-dong-voi-sms-retriever-api-XL6lANrJ5ek). Ở bài viết này mình xin giới thiệu về SMS User Consent API
# I. Overview
**SMS User Consent API** là API vừa được Google service tung ra nhằm bổ sung cho SMS Retriever API  trước đó. Ở SMS Retriever API quá trình xác minh được diễn ra tự động dựa trên SMS, nên SMS Retriever API sẽ có trải nghiệm tốt nhất. Tuy nhiên, có những tình huống bạn không kiểm soát được format của message SMS hoặc ko thể support SMS Retriever API hoặc đơn giản là bạn ko thích hoặc người dùng phản đối  thì SMS User Consent API chính là giải pháp dành cho bạn
SMS User Consent API cho phép ứng dụng của bạn gợi ý cho user cấp quyền truy cập vào nội dung của 1 tin nhắn SMS. Khi người dùng đồng ý, ứng dụng sẽ có quyền truy cập vào toàn bộ nội dung message sau đó sẽ phân tích và hoàn tất luồng xác minh SMS

![](https://images.viblo.asia/0c579ad9-7ece-4fc3-8192-031a198fdae1.gif)


# II. User Flow
Khi sử dụng SMS User Consent API để tự động điền mã OTP, người dùng sẽ được nhắc cho phép ứng dụng của bạn có quyền đọc một tin nhắn SMS. Người dùng sẽ thấy các màn hình sau
![](https://images.viblo.asia/cf7eb02a-d66f-4587-a918-db57a67b546e.png)
Do có nhiều trường hợp, người dùng chạy ứng dụng trên 1 thiết bị, song lại nhận SMS ở thiết bị khác nên khi bắt đầu luồng xác minh SMS, người dùng sẽ được nhắc nhập mã OTP bằng bàn phím
Sau đó nếu ứng dụng của bạn đã yêu cầu SMS User Consent, một tin nhắn SMS đến chứa mã OTP sẽ được hiển thị cho người dùng với tùy chọn chia sẻ toàn bộ nội dung của một tin nhắn SMS. Điều này sẽ chỉ xảy ra nếu ứng dụng của bạn đã yêu cầu SMS User Consent và đang chạy trên thiết bị nhận được tin nhắn SMS. Nó sẽ không bao giờ hiển thị các tin nhắn được gửi từ danh bạ của người dùng.

Nếu người dùng chọn cung cấp nội dung của tin nhắn SMS cho ứng dụng của bạn, toàn bộ nội dung của tin nhắn SMS sẽ được chia sẻ. Người dùng sẽ thấy luồng xác minh SMS tự động hoàn tất.

Nếu người dùng quyết định không chia sẻ, thì người dùng sẽ nhập mã một lần theo cách thủ công để hoàn thành luồng xác minh SMS.

# III. Developer Flow
Để thực hiện luồng xác minh SMS đầy đủ bằng SMS User Consent API, bạn cần tương tác với cả backend server để gửi SMS cũng như SMS User Consent AP để nhắc người dùng truy cập vào một tin nhắn có chứa mã OTP.
Ứng dụng và server của bạn phải thực hiện các thao tác sau để triển khai luồng xác minh SMS bằng SMS User Consent API:
1. Ứng dụng của bạn gọi tới SMS User Consent API để bắt đầu lắng nghe response từ server, nếu có 1 tin nhắn SMS nhận được trước khi SMS User Consent API được khởi động thì tin nhắn đó sẽ không được chuyển tiếp đến ứng dụng của bạn.
2. Sau khi SMS User Consent API được khởi động, ứng dụng của bạn sẽ yêu cầu máy chủ xác minh số điện thoại của người dùng bằng xác minh SMS.
3. Khi thiết bị của người dùng nhận được tin nhắn SMS chứa mã OTP, Google Play Service sẽ hiển thị nội dung của tin nhắn cho người dùng và yêu cầu đồng ý cung cấp văn bản đó cho ứng dụng của bạn.
4. Nếu người dùng đồng ý, toàn bộ message SMS sẽ được cung cấp cho ứng dụng của bạn.
5. Ứng dụng của bạn phân tích mã OTP từ message SMS và gửi nó đến server.

# IV. Code
Sau đây mình sẽ hướng dẫn các bạn cách sử dụng SMS User Consent API
### Install dependencies
```
implementation 'com.google.android.gms:play-services-auth:17.0.0'
implementation 'com.google.android.gms:play-services-auth-api-phone:17.1.0'
```
### 1. Lấy số điện thoại của người dùng
Bạn có thể lấy số điện thoại của người dùng theo bất kỳ cách nào phù hợp với ứng dụng của bạn. Thông thường, đó là trải nghiệm người dùng tốt nhất để sử dụng trình chọn gợi ý để nhắc người dùng chọn từ các số điện thoại được lưu trên thiết bị và do đó tránh phải nhập số điện thoại theo cách thủ công. Để sử dụng công cụ chọn gợi ý:

```
private val CREDENTIAL_PICKER_REQUEST = 1  // Set to an unused request code

// Construct a request for phone numbers and show the picker
private fun requestHint() {
    val hintRequest = HintRequest.Builder()
        .setPhoneNumberIdentifierSupported(true)
        .build()
    val credentialsClient = Credentials.getClient(this)
    val intent = credentialsClient.getHintPickerIntent(hintRequest)
    startIntentSenderForResult(
        intent.intentSender,
        CREDENTIAL_PICKER_REQUEST,
        null, 0, 0, 0
    )
}

public override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    when (requestCode) {
        CREDENTIAL_PICKER_REQUEST ->
            // Obtain the phone number from the result
            if (resultCode == Activity.RESULT_OK && data != null) {
                val credential = data.getParcelableExtra<Credential>(Credential.EXTRA_KEY)
                // credential.getId();  <-- will need to process phone number string
            }
        // ...
    }
}
```
### 2. Bắt đầu nghe tin nhắn đến
Tiếp theo, hãy gọi phương thức `startSmsUserConsent () `của **SMS User Consent API** để bắt đầu nghe tin nhắn đến. Nếu bạn biết số điện thoại mà tin nhắn SMS sẽ xuất phát, hãy chỉ định nó (nếu không, hãy chuyển `null`). Bằng cách này, SMS User Consent API sẽ chỉ kích hoạt các tin nhắn từ số này.
```
// Start listening for SMS User Consent broadcasts from senderPhoneNumber
// The Task<Void> will be successful if SmsRetriever was able to start
// SMS User Consent, and will error if there was an error starting.
val task = SmsRetriever.getClient(context).startSmsUserConsent(senderPhoneNumber /* or null */)
```

Khi bạn đang nghe tin nhắn SMS đến, bạn có thể yêu cầu hệ thống xác minh của bạn gửi mã xác minh đến số điện thoại của người dùng mà bạn đã nhận được trong bước đầu tiên.
Trong năm phút tiếp theo, khi thiết bị nhận được tin nhắn SMS chứa mã OTP, Play services sẽ phát đến ứng dụng của bạn nhằm nhắc nhở người dùng cho phép đọc tin nhắn. Một thông báo kích hoạt broadcast chỉ khi nó đáp ứng các tiêu chí sau:
* Tin nhắn có chứa 4-10 ký tự gồm chữ và số và có ít nhất 1 số
* Tin nhắn được gửi bởi một số điện thoại không có trong danh bạ của người dùng.
* Nếu bạn đã chỉ định số điện thoại của người gửi, tin nhắn đã được gửi bởi số đó

Lắng nghe và xử lý tại onReceive của BroadcastReceiver với action intent `SMS_RETRIEVED_ACTION`
```
private val SMS_CONSENT_REQUEST = 2  // Set to an unused request code
private val smsVerificationReceiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (SmsRetriever.SMS_RETRIEVED_ACTION == intent.action) {
            val extras = intent.extras
            val smsRetrieverStatus = extras?.get(SmsRetriever.EXTRA_STATUS) as Status

            when (smsRetrieverStatus.statusCode) {
                CommonStatusCodes.SUCCESS -> {
                    // Get consent intent
                    val consentIntent = extras.getParcelable<Intent>(SmsRetriever.EXTRA_CONSENT_INTENT)
                    try {
                        // Start activity to show consent dialog to user, activity must be started in
                        // 5 minutes, otherwise you'll receive another TIMEOUT intent
                        startActivityForResult(consentIntent, SMS_CONSENT_REQUEST)
                    } catch (e: ActivityNotFoundException) {
                        // Handle the exception ...
                    }
                }
                CommonStatusCodes.TIMEOUT -> {
                    // Time out occurred, handle the error.
                }
            }
        }
    }
}

override fun onCreate(savedInstanceState: Bundle?) {
    // ...

    val intentFilter = IntentFilter(SmsRetriever.SMS_RETRIEVED_ACTION)
    registerReceiver(smsVerificationReceiver, intentFilter)
}
```

### 3. Nhận mã xác minh từ tin nhắn
Trong phương thức `onActivityResult ()`, xử lý response của người dùng đối với yêu cầu cấp phép của bạn. Nếu resultCode = RESULT_OK, người dùng được cấp quyền đọc nội dung của tin nhắn và bạn có thể nhận được tin nhắn văn bản từ intent.
```
public override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    when (requestCode) {
        // ...
        SMS_CONSENT_REQUEST ->
            // Obtain the phone number from the result
            if (resultCode == Activity.RESULT_OK && data != null) {
                // Get SMS message content
                val message = data.getStringExtra(SmsRetriever.EXTRA_SMS_MESSAGE)
                // Extract one-time code from the message and complete verification
                // `message` contains the entire text of the SMS message, so you will need
                // to parse the string.
                val oneTimeCode = parseOneTimeCode(message) // define this function

                // send one time code to the server
            } else {
                // Consent denied. User can type OTC manually.
            }
    }
}
```

Khi bạn có message text, bạn có thể phân tích mã xác minh và tự động điền vào biểu mẫu hoặc hoàn thành quy trình xác minh.

# V. Which API should I use?
Như trên chúng ta đã biết, Google play service cung cấp 2 API để xác minh SMS là SMS Retriever API và SMS User Consent API
API Retriever SMS cung cấp trải nghiệm người dùng hoàn toàn tự động và nên được sử dụng khi có thể. Tuy nhiên, nó yêu cầu bạn đặt mã băm tùy chỉnh trong phần thân thông báo và điều này có thể khó thực hiện nếu bạn không phải là người gửi tin nhắn đó.
> Ví dụ: Với trường hợp bạn không kiểm soát nội dung của tin nhắn. Giả sử ứng dụng của bạn hoạt động với tổ chức tài chính, và họ muốn xác minh số điện thoại của người dùng trước khi phê duyệt giao dịch thanh toán bên trong ứng dụng của bạn thì bạn có thể sử dụng SMS User Consent API không yêu cầu mã băm tùy chỉnh. Tuy nhiên, nó yêu cầu người dùng chấp thuận yêu cầu của ứng dụng của bạn để truy cập SMS có chứa mã xác minh. Để giảm thiểu khả năng phát thông báo sai cho người dùng, SMS User Consent API sẽ kiểm tra xem tin nhắn có hợp lệ không? (mã gồm 4-10 ký tự có chứa chữ và số và ít nhất một số). Nó cũng sẽ lọc các tin nhắn từ người gửi trong danh sách Liên hệ của người dùng.

Sự khác biệt được tóm tắt trong bảng dưới đây:
![](https://images.viblo.asia/bba720f9-6d72-40c9-a368-289569fd5bf7.png)

Do vậy, tuỳ với mục đích sử dụng, bạn có thể chọn API phù hợp với ứng dụng của mình để nâng cao trải nghiệm người dùng

**Các bạn có thể tham khảo thêm tại**

https://developers.google.com/identity/sms-retriever/choose-an-api
https://developers.google.com/identity/sms-retriever/user-consent/overview
https://medium.com/androiddevelopers/automatic-sms-verification-with-sms-user-consent-da8c16135e25