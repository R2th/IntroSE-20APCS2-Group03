Bảo mật đóng vai trò quan trọng trong phát triển phần mềm di động nhiều năm qua. Nhiều nền tảng cho phép người sử dụng có thể dùng vân tay, khuôn mặt. mống mắt,... để xác minh danh tính của người dùng thay cho việc nhập password.

Apple đã giới thiệu TouchID trong iOS 7 và trên iPhone 5s. Đến iOS 8 thì Apple đã cho phép sử dụng TouchID trong các ứng dụng của họ. Năm 2017 Apple giới thiệu iPhone X, với việc thay thế FaceID cho  TouchID trên các thiết bị của họ (tính đến nay là iPhone 12 promax vẫn đang dùng FaceID).

Cùng nhau tìm hiểu nhé

# Bắt đầu
Đầu tiên bạn cần phải import LocalAuthentication. Trong LocalAuthentication framework có chứa 1 class đó là LAContext. 

LAContext hiểu đơn giản là nó dùng để xác thực danh tính của bạn bằng sinh trắc học (cụ thể với iOS là FaceID/TouchID). Cung cấp giao diện xác thực biometric, xử lý xác thực biometric và trả về thành công hoặc thất bại và mỗi trường hợp lỗi sẽ có giải thích cho sự thất bại đó.

Mình xin để tổng quan của LAContext trên trang dev apple:

You use an authentication context to evaluate the user’s identity, either with biometrics like Touch ID or Face ID, or by supplying the device passcode. The context handles user interaction, and also interfaces to the Secure Enclave, the underlying hardware element that manages biometric data. You create and configure the context, and ask it to carry out the authentication. You then receive an asynchronous callback, which provides an indication of authentication success or failure, and an error instance that explains the reason for a failure, if any.

Đầu tiên, tạo một authentication context.

`let myContext = LAContext()`

Chúng ta cần cung cấp policy cho myContext

`myContext.canEvaluatePolicy(.deviceOwnerAuthentication, error: nil)`

LAPolicy có 2 kiểu:
1. **deviceOwnerAuthenticationWithBiometrics**: Nó chỉ sử dụng xác thực sinh trắc học để xác thực chủ sở hữu thiết bị.
2.  **deviceOwnerAuthentication**: Nó sẽ cho phép ứng dụng xác thực chủ sở hữu thiết bị bằng sinh trắc học hoặc mật khẩu thiết bị

# Kiểm tra tính khả dụng của FaceID/TouchID
```
if localAuthenticationContext.canEvaluatePolicy (.deviceOwnerAuthentication, error: & authError) {
     // Code
}
```
Hàm này sẽ trả về true nếu FaceID/TouchID của bạn khả dụng. Trả về false nếu không thành công bởi vì nếu xác thực sinh trắc học không khả dụng hoặc không được đăng ký, đánh giá chính sách không thành công. Một số lỗi nhận được:
* **LAError.biometryNotAvailable**: Không thể bắt đầu xác thực vì thiết bị không hỗ trợ xác thực sinh trắc học.
* **LAError.biometryNotEnrolled**: Không thể bắt đầu xác thực vì người dùng chưa đăng ký xác thực sinh trắc học.
* **LAError.biometryLockout**: Không thể tiếp tục xác thực vì người dùng đã bị khóa xác thực sinh trắc học, do không xác thực quá nhiều lần.

# Yêu cầu xác thực
```
            /// Set title cho các button của giao diện xác thực
            myContext.localizedCancelTitle = "Cancel"
            myContext.localizedFallbackTitle = ""
```
            
```
/// Bắt đầu xác thực vân tay, nếu xác thực sai 3 lần liên tiếp hoặc tổng cộng 5 lần, show màn hình passcode của thiết bị.
myContext.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason) { success, evaluateError in
    DispatchQueue.main.async {
        switch success {
        case true:
            if myContext.evaluatedPolicyDomainState == nil {
                /// Nhập đúng passcode của máy khi sai nhiều lần liên tiếp. OS sẽ show màn hình passcode của thiết bị.
                /// Nếu nhập đúng thì sẽ vào đây và xử lý logic tại đây.
            } else {
                /// Xác thực thành công. Xử lý logic
            }
        case false:
            /// Xác thực thất bại. Xử lý logic thất bại
        }
    }
}
```
Full code  Authen Biometric:

```
private func canAuthenByBioMetrics() -> Bool {
        let context = LAContext()
        var authError: NSError?
        
        if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &authError) {
            return true
        } else {
            return false
        }
 }
```
Hàm này check xem device có hỗ trợ biometric và có khả dụng không?
Dùng trong trường hợp vd như: sau khi đăng ký tài khoản thành công, nếu máy hỗ trợ biometric thì hỏi người dùng có muốn sử dụng biometric như 1 kiểu đăng nhập thứ 2 thay vì nhập mật 

```
private func startAuthentication() {
        let myContext = LAContext()
        let reason = "Unlock"
        var authError: NSError?
        
        /// If biometric avaiable, setup authen biometric
        if myContext.canEvaluatePolicy(.deviceOwnerAuthentication, error: &authError) {
            /// Set title cho các button của giao diện xác thực
            myContext.localizedCancelTitle = "Cancel"
            myContext.localizedFallbackTitle = ""
            
            /// Bắt đầu xác thực vân tay, nếu xác thực sai 3 lần liên tiếp hoặc tổng cộng 5 lần, show màn hình passcode của thiết bị.
            /// reason là message của giao diện xác thực. Ví dụ: "Sử dụng vân tay để đăng nhập vào app"
            myContext.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason) { success, evaluateError in
                DispatchQueue.main.async {
                    switch success {
                    case true:
                        if myContext.evaluatedPolicyDomainState == nil {
                            /// Nhập đúng passcode của máy khi sai nhiều lần liên tiếp. OS sẽ show màn hình passcode của thiết bị.
                            /// Nếu nhập đúng thì sẽ vào đây và xử lý logic tại đây.
                            /// Vì số lần sai sẽ cộng dồn, nên khi nhập đúng passcode của máy sẽ tự động reset số lần sai về 0.
                            /// Khi nhập đúng passcode thì OS cũng coi như bạn đã xác thực thành công.
                        } else {
                            /// Xác thực thành công. Xử lý logic
                        }
                    case false:
                         /// Xác thực thất bại. Xử lý logic thất bại
                    }
                }
            }
        }
  }
```

Đây là hình ảnh ví dụ về giao diện của mình.
Giao diện xác thực TouchID
![](https://images.viblo.asia/278df2fb-311a-4b07-9277-eb482a4152b0.jpg)

Giao diện hiện passcode khi xác thực sai quá nhiều lần
![](https://images.viblo.asia/85732e07-96c1-43ec-b1e3-a5e0237900fd.jpg)

Lưu ý. Khi OS show màn passcode, nếu nhập sai 5 lần passcode thì tính năng authen biometric sẽ bị khoá trong vòng 1 phút.

Chúc các bạn code vui vẻ, nếu có thiếu xót, rất mong nhận được sự góp ý của các bạn.

Thank you!