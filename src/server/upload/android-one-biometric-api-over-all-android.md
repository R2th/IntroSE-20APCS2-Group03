# I. Tổng quan
Xác thực sinh trắc học ngày nay đã trở nên càng phổ biến, và dần trở thành 1 phần không thể thiếu của Android trong những năm trở lại đây. Công nghệ càng phát triển và cách chúng ta đăng nhập vào điện thoại cũng vậy, từ đăng nhập bằng vân tay, mống mắt, cho tới nhận diện bằng khuôn mặt... Tuy nhiên, do sự phân mảnh của các thiết bị Android, không phải thiết bị nào cũng được tích hợp đầy đủ hoặc không được tích hợp các tính năng xác thực bằng sinh trắc học. Mặt khác, không phải phiên bản Android nào cũng hỗ trợ xác thực sinh trắc học. Do vậy, việc tích hợp đầy đủ các xác thực bằng sinh trắc học khá là khó khăn và mất thời gian. Ví dụ với `FingerprintManager`, API cung cấp hỗ trợ cho cảm biến vân tay, nhưng không có UI.  Vì vậy muốn triển khai đăng nhập vân tay, các devloper phải tự xây dựng giao diện đăng nhập vân tay của riêng họ. **Liệu rằng có 1 API nào đó có thể tích hợp đầy đủ các xác thực bằng sinh trắc học cho tất cả các thiết bị Android???**

Với sự ra mắt của Android 10 (API 29), các developer giờ đây có thể sử dụng `Biometric API` (1 phần của thư viện `AndroidX Biometric`) cho tất cả các nhu cầu xác thực người dùng trên thiết bị của người dùng. Ngoài việc hỗ trợ nhiều yếu tố hình thức xác thực sinh trắc học, API còn giúp các developer dễ dàng hơn trong việc kiểm tra xem device đó có hỗ trợ cảm biến sinh trắc học hay không. Và nếu không có cảm biến sinh trắc học, API cho phép các developer chỉ định liệu họ có muốn sử dụng thông tin đăng nhập thiết bị trong ứng dụng của họ hay không (Ví dụ mã PIN, mẫu hình, mật khẩu).

Android Team hiện đã đóng gói mọi tính năng sinh trắc học mà bạn có trong Android 10 vào phần phụ thuộc Gradix `androidx.biometric `để có giao diện duy nhất, nhất quán, có sẵn cho đến tận Android 6.0 (API cấp 23). 

Và ta đã có câu trả lời cho câu hỏi trước đó, đó chính là **AndroidX Biometric**
# II. Tạo Project
## 1. Tích hợp Biometric
```
def biometric_version= '1.0.0-rc02'
implementation "androidx.biometric:biometric:$biometric_version"
```
## 2. Kiểm tra thiết bị có hỗ trợ xác thực sinh trắc học không
`BiometricPrompt` cần được tạo lại mỗi khi `Activity / Fragment` được tạo. Điều này nên được thực hiện bên trong `onCreate() `hoặc `onCreateView ()` để `BiometricPrompt.AuthenticationCallback` có thể bắt đầu nhận cuộc gọi lại đúng cách.
```
val biometricManager = BiometricManager.from(context)
if (biometricManager.canAuthenticate() == BiometricManager.BIOMETRIC_SUCCESS){
   // TODO: show in-app settings, make authentication calls.
}
```

## 3. Khởi tạo BiometricPrompt
Hàm khởi tạo `BiometricPrompt` yêu cầu cả `Executor` và `AuthenticationCallback`. 
`Executor` cho phép bạn chỉ định một luồng mà cuộc gọi lại của bạn sẽ được chạy.
`AuthenticationCallback` gồm 3 methods:
* onAuthenticationSucceeded(): được gọi khi người dùng đã được xác thực bằng thông tin xác thực mà thiết bị nhận ra.
* onAuthenticationError() được gọi khi gặp các mã lỗi được định nghĩa [tại đây](https://developer.android.com/reference/androidx/biometric/BiometricPrompt.html#constants_2)
* onAuthenticationFailed(): được gọi khi người dùng bị từ chối, ví dụ: khi đặt dấu vân tay không đăng ký trên cảm biến, nhưng không giống như `onAuthenticationError()`, người dùng có thể tiếp tục cố gắng xác thực.

Đoạn code sau đây cho thấy một cách triển khai `Executor` và cách khởi tạo `BiometricPrompt`:
```
private fun instanceOfBiometricPrompt(): BiometricPrompt {
   val executor = ContextCompat.getmainExecutor(context)

   val callback = object: BiometricPrompt.AuthenticationCallback() {
       override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
           super.onAuthenticationError(errorCode, errString)
           showMessage("$errorCode :: $errString")
       }

       override fun onAuthenticationFailed() {
           super.onAuthenticationFailed()
           showMessage("Authentication failed for an unknown reason")
       }

       override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
           super.onAuthenticationSucceeded(result)
           showMessage("Authentication was successful")
       }
   }

   val biometricPrompt = BiometricPrompt(context, executor, callback)
   return biometricPrompt
}
```

> Khởi tạo `BiometricPrompt` nên được thực hiện sớm trong vòng đời của fragment hoặc activity của bạn (ví dụ: trong `onCreate` hoặc `onCreateView`). Điều này đảm bảo rằng phiên bản hiện tại sẽ luôn nhận được các cuộc gọi lại xác thực.
> 
## 4. Khởi tạo PromptInfo
Khi bạn có một đối tượng `BiometricPrompt`, bạn yêu cầu người dùng xác thực bằng cách gọi `biometricPrompt.authenticate(promptInfo)`. Nếu ứng dụng của bạn yêu cầu người dùng xác thực bằng [sinh trắc học mạnh](https://source.android.com/compatibility/android-cdd#7_3_10_biometric_sensors) hoặc cần thực hiện các hoạt động mã hóa trong KeyStore, bạn nên sử dụng `authenticate(PromptInfo, CryptoObject)` để thay thế.
> Sau khi gọi method `authenticate` ứng dụng sẽ hiển thị cho người dùng giao diện phù hơp, dựa trên loại thông tin sinh trắc học được sử dụng để xác thực - chẳng hạn như dấu vân tay, khuôn mặt hoặc mống mắt. Là một nhà phát triển, bạn không cần phải biết loại thông tin xác thực nào đang được sử dụng để xác thực; API xử lý tất cả điều đó cho bạn và sẽ hiển thị cho người dùng giao diện phù hợp dựa trên loại thông tin sinh trắc học được sử dụng để xác thức 
>
`PromptInfo`: Nơi định nghĩa các văn bản xuất hiện trong hộp thoại nhắc nhở (vd: Tiêu đề, phụ đề, mô tả...). Nếu không có `PromptInfo` người dùng cuối sẽ không biết ứng dụng nào đang yêu cầu thông tin sinh trắc học của họ. PromptInfo cũng cho phép bạn chỉ định liệu nó có đồng ý hay không đối với các thiết bị không hỗ trợ xác thực sinh trắc học để cấp quyền truy cập thông qua thông tin đăng nhập của thiết bị, như mật khẩu, mã PIN hoặc mẫu được sử dụng để mở khóa thiết bị
```
private fun getPromptInfo(): BiometricPrompt.PromptInfo {
   val promptInfo = BiometricPrompt.PromptInfo.Builder()
       .setTitle("My App's Authentication")
       .setSubtitle("Please login to get access")
       .setDescription("My App is using Android biometric authentication")
              .setDeviceCredentialAllowed(true)
       .build()
   return promptInfo
}
```
> Đối với các hành động yêu cầu bước xác nhận, chẳng hạn như giao dịch và thanh toán, chúng tôi khuyên bạn nên sử dụng tùy chọn mặc định - setConf ConfirmationRequired (true) - sẽ thêm nút xác nhận vào UI
>
![](https://images.viblo.asia/f2fcbd5e-fae2-4b5d-aed7-b68070623291.png)
*Ví dụ về luồng xác thực khuôn mặt bằng BiometricPrompt với `setConfirmationRequired(false).`*

![](https://images.viblo.asia/aab676c9-f97c-48a3-8a91-7c1204037f15.png)
*Ví dụ về luồng xác thực khuôn mặt bằng BiometricPrompt với `setConfirmationRequired(true).`*

## Yêu cầu xác thực
```
val canAuthenticate = biometricManager.canAuthenticate()
if (canAuthenticate == BiometricManager.BIOMETRIC_SUCCESS) {
   biometricPrompt.authenticate(promptInfo)
} else {
   Log.d(TAG, "could not authenticate because: $canAuthenticate")
}
```
> Bây giờ bạn có thể thực hiện xác thực, sử dụng thông tin sinh trắc học, trên bất kỳ thiết bị nào chạy Android 6.0 (API cấp 23) trở lên.
>

# III. Demo
1 số hình ảnh demo xác thực sinh trắc học bằng vân tay, mống mắt, khuôn mặt
![](https://images.viblo.asia/82d7feda-bd32-4bb6-bcbc-1aa4f4402d49.png)


Link tham khảo: https://android-developers.googleblog.com/2019/10/one-biometric-api-over-all-android.html

Project Demo: https://github.com/oNguyenDucManh/BiometricDemo