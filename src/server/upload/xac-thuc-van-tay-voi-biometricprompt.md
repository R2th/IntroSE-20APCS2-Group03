# Mở đầu
Team Android Framework and Security mới đây đã phát hành thư viện **AndroidX Biometric** - một thư viện hỗ trợ thay thế tất cả các thư viện trước đó của API nhận diện sinh trắc học. Thư viện này mang tới những tính năng có sẵn trên Android 10 (API level 29) trở lại Android 6 (API level 23). Nó có các ưu điểm chính sau:
* Các nhà phát triển không cần phải dự đoán các API khác nhau bởi vì thư viện xử lý tất cả các sự kết hợp giữa các phương pháp sinh trắc. Ví dụ, thư viện này sử dụng `FingerprintManager` từ API level 23 đến 27 và  `BiometricPrompt` từ API level 28 trở lên.
* Các nhà phát triển không cần phải tạo các thành phần hiển thị UI xác thực của riêng họ. Thư viện cung cấp một giao diện người dùng chuẩn và quen thuộc, phù hợp với yếu tố hình thức xác thực sinh trắc học của người dùng, như xác thực vân tay hay nhận diện khuôn mặt.
* Các nhà phát triển có thể kiểm tra xem một thiết bị có hỗ trợ xác thực sinh trắc học hay không bằng cách gọi đến các phương thức đơn giản.

Tiện ích mà thư viện này mang lại rất nhiều, bạn có thể truy cập chúng thông qua class `BiometricPrompt` và `BiometricManager`. Nếu ứng dụng của bạn chưa sử dụng **AndroidX Biometric**, bài viết này sẽ chỉ cho bạn biết cách sử dụng nó.

# Cải thiện bảo mật cho xác thực
Theo **Android Compatibility Definition Document** (Android CDD), cảm biến sinh trắc học có thể được phân loại thành mạnh hoặc yếu tùy thuộc vào các yếu tố như cảm biến giả mạo cảm biến và tỷ lệ chấp nhận mạo danh. Điều này có nghĩa là code của bạn không cần phải xác định mức độ xác thực sinh trắc học mạnh đến mức nào - việc implement OEM sẽ thực hiện điều đó cho bạn. 

Do đó, để cải thiện bảo mật xác thực, thông thường các ứng dụng chỉ định một `CryptoObject` khi sử dụng xác thực sinh trắc học. Bởi vì `CryptoObjects` làm việc với `KeyStore` để cung cấp một lớp bảo mật bổ sung. Chẳng hạn, một ứng dụng ngân hàng có thể yêu cầu `CryptoObject` giả mạo để giải mã các dữ liệu nhạy cảm. Sử dụng `CryptoObject` sẽ đảm bảo độ sinh trắc học mạnh để xác thực vào ứng dụng của bạn. Hơn nữa, sử dụng `CryptoObject` mang đến sự an tâm hơn vì nó tích hợp với `KeyStore`, cung cấp khả năng phục hồi chống lại các cuộc tấn công vào các hệ thống bị xâm nhập, chẳng hạn như các thiết bị đã root.

Do đó, một ứng dụng có 2 cách triển khai có thể thực hiện:
* Xác thực sinh trắc học với `CryptoObject` (được khuyến nghị).
* Xác thực sinh trắc học mà không cần `CryptoObject`.

# Chuyển sang BiometricPrompt với mã crypto

Thông thường, một ứng dụng phải tạo các đối tượng sau để hỗ trợ quy trình làm việc `FingerprintManager`:
* Nút **Login** mà người dùng sẽ nhấp vào để khởi chạy giao diện xác thực dấu vân tay.
* Một `DialogFragment` và tập tin bố trí liên quan của nó. Điều này thể hiện UI xác thực vân tay tùy chỉnh của bạn.
* Logic tùy chọn để cho phép người dùng xác thực bằng mật khẩu tài khoản thay vì `FingerprintManager`. Bạn có thể cung cấp tùy chọn này vì các lý do khác nhau: có thể xác thực dấu vân tay không được hỗ trợ trên thiết bị, có thể người dùng quên thiết lập xác thực dấu vân tay hoặc có thể người dùng chỉ thích xác thực mật khẩu tài khoản.

Để di chuyển từ `FingerprintManager` sang `BiometricPrompt`, hãy hoàn thành các bước sau:

## 1. Delete custom fingerprint UI
Ngay lập tức, bạn có thể bỏ hộp thoại UI `FragmentDialog` trong tệp layout. Thư viện `AndroidX Biometric` đi kèm với giao diện người dùng được tiêu chuẩn hóa.

## 2. Add the Gradle dependency to your app module
```php
def biometric_version = '1.0.0'
implementation "androidx.biometric:biometric:$biometric_version"
```

## 3. Tạo instance của BiometricPrompt
Bạn nên khởi tạo `BiometricPrompt` sớm trong vòng đời Activity/Fragment của mình, tốt nhất là bên trong `onCreate()` hoặc `onCreateView()`. Đây là một sự khác biệt chính giữa `FingerprintManager` và `BiometricPrompt`. Bạn có thể khởi tạo `FingerprintManager` ngay khi gọi `authenticate()`. Nhưng để `BiometricPrompt` gửi các `callback` đến hoạt động thích hợp, giả sử trong trường hợp thay đổi cấu hình, bạn phải khởi tạo nó một chút trước khi bạn cần gọi `authenticate()`.

```php
private lateinit var biometricPrompt: BiometricPrompt

override fun onCreate(savedInstanceState: Bundle?) {
   super.onCreate(savedInstanceState)
   setContentView(R.layout.activity_main)
   setSupportActionBar(findViewById(R.id.toolbar))
   // ...   
   biometricPrompt = createBiometricPrompt()
}

private fun createBiometricPrompt(): BiometricPrompt {
   val executor = ContextCompat.getMainExecutor(this)

   val callback = object : BiometricPrompt.AuthenticationCallback() {
       override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
           super.onAuthenticationError(errorCode, errString)
           Log.d(TAG, "$errorCode :: $errString")
           if (errorCode == BiometricPrompt.ERROR_NEGATIVE_BUTTON) {
               loginWithPassword() // Because in this app, the negative button allows the user to enter an account password. This is completely optional and your app doesn’t have to do it.
           }
       }

       override fun onAuthenticationFailed() {
           super.onAuthenticationFailed()
           Log.d(TAG, "Authentication failed for an unknown reason")
       }

       override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
           super.onAuthenticationSucceeded(result)
           Log.d(TAG, "Authentication was successful")
           // Proceed with viewing the private encrypted message.
           showEncryptedMessage(result.cryptoObject)
       }
   }

   val biometricPrompt = BiometricPrompt(this, executor, callback)
   return biometricPrompt
}
```

## 4. Build a PromptInfo object
`BiometricPrompt.PromptInfo` là một tham số bắt buộc để xác thực với **API BiometricPrompt**. Nó cung cấp các hướng dẫn quan trọng cho lời nhắc, chẳng hạn như có yêu cầu xác nhận người dùng rõ ràng không (lưu ý: xác nhận rõ ràng là hành vi mặc định và phải luôn được áp dụng nếu API đang được sử dụng cho thanh toán hoặc giao dịch - để sử dụng với ứng dụng hoặc tài khoản đăng nhập, xác nhận rõ ràng có thể được đặt thành false để cho phép trải nghiệm hợp lý hơn).  `BiometricPrompt.PromptInfo` cũng cho phép ứng dụng của bạn cung cấp ngữ cảnh bổ sung cho giao dịch đang diễn ra bằng cách đặt tiêu đề, phụ đề và văn bản mô tả khác xuất hiện trên dấu nhắc.
`BiometricPrompt.PromptInfo` của bạn có thể trông như thế này:

```php
private fun createPromptInfo(): BiometricPrompt.PromptInfo {
   val promptInfo = BiometricPrompt.PromptInfo.Builder()
           .setTitle(getString(R.string.prompt_info_title))
           .setSubtitle(getString(R.string.prompt_info_subtitle))
           .setDescription(getString(R.string.prompt_info_description))
           // Authenticate without requiring the user to press a "confirm"
           // button after satisfying the biometric check
           .setConfirmationRequired(false)
           .setNegativeButtonText(getString(R.string.prompt_info_use_app_password))
           .build()
   return promptInfo
}
```

## 5. Create a CryptoObject
Vì bạn đang di chuyển từ một triển khai `FingerprintManager` bao gồm `CryptoObject`, nên tại một thời điểm nào đó trong code cũ của bạn, bạn đã tạo một phiên bản của `FingerprintManager.CryptoObject()` để qua được xác thực vân tay. Khi di chuyển sang `BiometricPrompt`, bạn vẫn có thể sử dụng các tham số tương tự để tạo `CryptoObject` của mình, ngoại trừ `CryptoObject` của bạn hiện là `BiometricPrompt.CryptoObject`.

## 6. Set up View.OnClickListener
```php
// Callback for the "authenticate" button in your app's UI.
override fun onClick(view: View) {
   val promptInfo = createPromptInfo()
   if (BiometricManager.from(context)
               .canAuthenticate() == BiometricManager.BIOMETRIC_SUCCESS) {
       biometricPrompt.authenticate(promptInfo, cryptoObject)
   } else {
       loginWithPassword()
   }
}
```

# Chuyển sang BiometricPrompt không có cryptography
```php
override fun onClick(view: View) {
   val promptInfo = createPromptInfo()
   if (BiometricManager.from(context)
               .canAuthenticate() == BiometricManager.BIOMETRIC_SUCCESS) {
       biometricPrompt.authenticate(promptInfo)
   } else {
       loginWithPassword()
   }
}
```

```php
override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
   super.onAuthenticationSucceeded(result)
   Log.d(TAG, "Authentication was successful")
   showMessage()
}
```

# Tổng kết
Ta đã hoàn thành việc chuyển đổi từ `FingerprintManager` sang  `BiometricPrompt`. Hi vọng với bài viết này, các bạn có thể triển khai các phương pháp xác thực sinh trắc học trong ứng dụng của mình đơn giản và bảo mật hơn, giúp nâng cao chất lượng sản phẩm cũng như level coding của bạn.

# Nguồn tham khảo
[Migrating from FingerprintManager to BiometricPrompt](https://medium.com/androiddevelopers/migrating-from-fingerprintmanager-to-biometricprompt-4bc5f570dccd)