Biometric Authentication (xác thực sinh trắc học) là một phần mở rộng của xác thực dấu vân tay. Biometric API tiên tiến hơn và đơn giản hơn để tích hợp khi so sánh với những phiên bản trước. Trong bài viết này, bạn sẽ tìm hiểu cách tích hợp Biometric API và cách sử dụng nó.
# I. Giới thiệu
Trong những năm gần đây, nhóm phát triển Android tập trung chủ yếu vào việc cải thiện bảo mật và quyền riêng tư. Pattern/pin lock đã xuất hiện từ nhiều năm nay trên các thiết bị Android, khoảng vài năm trước thì xác thực dấu vân tay đã được giới thiệu như một sự cải tiến. Còn bây giờ xác thực dấu vân tay được nâng cấp và được gọi là xác thực sinh trắc học.
Xác thực sinh trắc học an toàn hơn và dễ sử dụng hơn, có ích trong nhiều tình huống, chẳng hạn như ủy quyền thanh toán, đăng nhập an toàn và đơn giản, xác thực trong khi truy cập dữ liệu nhạy cảm và hơn thế nữa.
Ngoài ra, Biometric API cũng cung cấp một cách để xác thực bằng mật khẩu thiết bị hoặc mã pin mà không cần thêm bất kỳ công việc nào cho các nhà phát triển.

# II. Kiểm tra tương thích hệ thống
Như mình đã nói ở trên, hệ thống bảo mật Android bắt đầu với khóa mật khẩu và khóa pin, vì vậy một số thiết bị không có khả năng mở khóa bằng vân tay hoặc mở khóa bằng khuôn mặt. Trước khi kích hoạt loại xác thực này cho người dùng, bạn nên thực hiện bước kiểm tra xem thiết bị có tương thích với xác thực sinh trắc học hay không.
Để kiểm tra tính khả dụng, trước tiên chúng ta cần lấy instance của lớp BiometricManager của hệ thống:
```
val biometricManager = BiometricManager.from(this)
```
Với đối tượng BiometricManager, chúng ta cần truy cập hàm canAuthenticate (), kết quả trả về của hàm này là một số nguyên và có thể xảy ra 4 kết quả dưới đây:
* **BIOMETRIC_SUCCESS**: Thiết bị có thể hoạt động với xác thực sinh trắc học.
* **BIOMETRIC_ERROR_NO_HARDWARE**: Không có tính năng sinh trắc học nào có sẵn trên thiết bị này.
* **BIOMETRIC_ERROR_HW_UNAVAILABLE**: Các tính năng sinh trắc học hiện không khả dụng trong thiết bị.
* **BIOMETRIC_ERROR_NONE_ENROLLED**: Người dùng không liên kết bất kỳ thông tin sinh trắc học nào trong thiết bị.

Sử dụng when trong Kotlin để giải quyết các trường hợp sử dụng khác nhau:
```
private fun verfiyingBioMetricExistence() {
    when (biometricManager.canAuthenticate()) {
        BiometricManager.BIOMETRIC_SUCCESS ->
            "App can authenticate using biometrics.".print()
        BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE ->
            "No biometric features available on this device.".print()
        BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE ->
            "Biometric features are currently unavailable.".print()
        BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED ->
            "The user hasn't associated any biometric credentials with their account.".print()
    }
}
```

# III. Tích hợp
Tích hợp thư viện sinh trắc học không hề khó, chúng ta cần thêm dòng sau vào trong file build.gradle(app) :
```
dependencies {
    implementation 'androidx.biometric:biometric:1.0.1'
}
```
Kiểm tra version mới nhất tại https://developer.android.com/training/sign-in/biometric-auth

# IV. Làm việc với Biometric Library
Đây là phần thú vị nhất, chúng ta bắt tay vào code thôi. Đầu tiên cần tạo 1 instance của Executor:
```
val executor = ContextCompat.getMainExecutor(this)
```
Hàm getMainExecutor trả về một đối tượng Executor chạy các tác vụ được xử lý trên main thread liên kết với context. Đây là luồng được sử dụng để gọi đến các thành phần ứng dụng (activities, services, ...) . Executor này được sử dụng để tạo cầu nối giữa các dịch vụ sinh trắc học và các thành phần ứng dụng của bạn.

Tiếp theo, chúng ta cần tạo một instance của BiometricPrompt như bên dưới, để nhắc người dùng xác thực. Nó có ba đối số.
+ Instance của Android Component (activity/fragment)
+ Executor chúng ta đã khởi tạo ở trên
+ Biometric.AuthenticationCallback

```
biometricPrompt = BiometricPrompt(this, executor,
                object : BiometricPrompt.AuthenticationCallback() {
                    override fun onAuthenticationError(errorCode: Int,
                                                       errString: CharSequence) {
                        super.onAuthenticationError(errorCode, errString)
                        Toast.makeText(applicationContext,
                                "Authentication error: $errString", Toast.LENGTH_SHORT)
                                .show()
                    }

                    override fun onAuthenticationSucceeded(
                            result: BiometricPrompt.AuthenticationResult) {
                        super.onAuthenticationSucceeded(result)
                        Toast.makeText(applicationContext,
                                "Authentication succeeded!", Toast.LENGTH_SHORT)
                                .show()
                    }

                    override fun onAuthenticationFailed() {
                        super.onAuthenticationFailed()
                        Toast.makeText(applicationContext, "Authentication failed",
                                Toast.LENGTH_SHORT)
                                .show()
                    }
                })
```

Giờ là lúc đăng những thông tin cần thiết lên lời nhắc thông qua PromptInfo Builder :

```
promptInfo = BiometricPrompt.PromptInfo.Builder()
       .setTitle("Biometric login for my app")
       .setSubtitle("Log in using your biometric credential")
       .build()
```

Sau đó chúng ta hiển thị hộp thoại sinh trắc học bằng cách sử dụng hàm authenticate của BiometricPrompt bằng cách gửi promptInfo làm tham số :

```
biometricPrompt.authenticate(promptInfo)
```

Đó là tất cả, phần còn lại của công việc sẽ được API sinh trắc học xử lý rồi cung cấp kết quả phù hợp thông qua các Callback.
Để hiểu rõ hơn một chút, hãy xem đoạn mã sau, nơi tất cả các phần trên được ghép lại với nhau:

```
private lateinit var executor: Executor
private lateinit var biometricPrompt: BiometricPrompt
private lateinit var promptInfo: BiometricPrompt.PromptInfo
private fun showBiomertricDialog(){
    executor =
           ContextCompat.getMainExecutor(this)
    biometricPrompt = BiometricPrompt(this, executor,
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationError(errorCode: Int,
                                                   errString: CharSequence) {
                    super.onAuthenticationError(errorCode, errString)

                    Toast.makeText(applicationContext,
                            "Authentication error: $errString", Toast.LENGTH_SHORT)
                            .show()
                }

                override fun onAuthenticationSucceeded(
                        result: BiometricPrompt.AuthenticationResult) {
                   super.onAuthenticationSucceeded(result)
                   Toast.makeText(applicationContext,
                            "Authentication succeeded!", Toast.LENGTH_SHORT)
                            .show()
                }

                override fun onAuthenticationFailed() {
                    super.onAuthenticationFailed()
                    Toast.makeText(applicationContext, "Authentication failed",
                            Toast.LENGTH_SHORT)
                            .show()
                }
            })

    promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Biometric login for my app")
            .setSubtitle("Log in using your biometric credential")
            .build()
    biometricPrompt.authenticate(promptInfo)

}
```

# V. Bật tùy chọn sử dụng mật khẩu
Sẽ có lúc xác thực vân tay hoặc nhận diện khuôn mặt của bạn có thể có vấn đề. Chẳng hạn, khi không có đủ ánh sáng để nhận diện khuôn mặt nó có thể không hoạt động như yêu cầu. Trong các tình huống như thế này, người dùng sẽ có thể sử dụng các chế độ xác thực khác, như pin / password / pattern.
Để cho phép điều đó, Biometric library cung cấp hàm setDeviceCredentialALLowed() trong đối tượng BiometricPrompt.PromptInfo bằng cách chuyền tham số true :
```
promptInfo = BiometricPrompt.PromptInfo.Builder()
        .setTitle("Biometric login for my app")
        .setSubtitle("Log in using your biometric credential")
        // Allows device pin
        .setDeviceCredentialAllowed(true)
        .build()
```

# VI. Tài liệu tham khảo
Để đọc thêm về bảo mật trong android, các bạn có thể tham khảo tại đây:
https://medium.com/better-programming/secure-communication-with-the-server-from-your-android-client-with-certificate-pinning-5f53cea55972
https://medium.com/better-programming/how-to-set-up-biometric-authentication-in-android-672688afcaae