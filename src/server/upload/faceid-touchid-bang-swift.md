FaceID và TouchID có thể được sử dụng trong các ứng dụng để xác thực người dùng, khi giao dịch trong ứng dụng hoặc truy cập thông tin cá nhân. Xác minh thông tin trong ứng dụng ví điện tử, hầu như tất cả chúng đều được bật TouchID. 

Chúng ta có thể xem cụ thể đoạn miêu tả của Apple về cơ chế này:

[Ask users to authenticate only in exchange for value, such as personalizing the experience, accessing additional features, purchasing content, or synchronizing data. If your app requires authentication, keep the sign-in process quick, easy, and unobtrusive, so it doesn’t detract from the enjoyment of your app.](https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/authentication/)

Bất cứ khi nào bạn có thể, hãy hỗ trợ người dùng xác thực thông tin qua xác thực sinh trắc học. Face ID và Touch ID là các phương thức xác thực an toàn, quen thuộc mà mọi người tin tưởng. Hãy xem cách chúng ta có thể thêm TouchID và FaceID vào ứng dụng.

Đầu tiên, trong dự án của bạn, import **LocalAuthentication** vào ứng dụng. Sau đó, chúng ta  tạo một đối tượng **LAContext**, đối tượng này sẽ cung cấp giao diện người dùng để đánh giá các chính sách xác thực và kiểm soát truy cập, quản lý thông tin xác thực.


Đừng quên thêm **#av Available (iOS 8.0, macOS 10.12.1, *)**   trước khi thêm bất kỳ mã nào để xác thực TouchID / FaceID. Chúng không được hỗ trợ dưới iOS 8. Sau khi thêm điều kiện sử dụng, chúng ta phải kiểm tra xem quyển sử dụng FaceID / TouchID của ứng dụng. Khi công việc đó hoàn thành, chúng ta có thể chạy AssessmentPolicy để có được xác thực / đồng ý của người dùng. Khi người dùng xác thực, hãy tiếp tục và sửa đổi giao diện người dùng hoặc thực hiện hành động của bạn.

Sau khi xác thực thành công nếu bạn cập nhật phần UI, hãy nhớ, luôn sử dụng **DispatchQueue.main.async** để chạy các tác vụ đó. Thay đổi giao diện người dùng phải chạy trong main thread.


Đoạn mã ví dụ:

```
//This framework contains authentication helper codes
import LocalAuthenticationclass ViewController: UIViewController {    @IBAction func touchIdAction(_ sender: UIButton) {
        
        print("hello there!.. You have clicked the touch ID")
        
        let myContext = LAContext()
        let myLocalizedReasonString = "Biometric Authntication testing !! "
        
        var authError: NSError?
        if #available(iOS 8.0, macOS 10.12.1, *) {
            if myContext.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &authError) {
                myContext.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: myLocalizedReasonString) { success, evaluateError in
                    
                    DispatchQueue.main.async {
                        if success {
                            // User authenticated successfully, take appropriate action
                            self.successLabel.text = "Awesome!!... User authenticated successfully"
                        } else {
                            // User did not authenticate successfully, look at error and take appropriate action
                            self.successLabel.text = "Sorry!!... User did not authenticate successfully"
                        }
                    }
                }
            } else {
                // Could not evaluate policy; look at authError and present an appropriate message to user
                successLabel.text = "Sorry!!.. Could not evaluate policy."
            }
        } else {
            // Fallback on earlier versions
            
            successLabel.text = "Ooops!!.. This feature is not supported."
        }        
    }}
```

Chạy thử đoạn mã trên, trong trường hợp bạn không có thiết bị, đừng lo lắng, bạn hoàn toàn có thể sử dụng Simulator.    
    ![Simulator](https://images.viblo.asia/84ee0f5f-81c8-41f7-be13-6838f6dfe529.png)    
Bạn có thể tìm thấy project demo tại [đây](https://github.com/AnanthaKrish/FaceId-TouchId)
    
Bài viết đến đây xin tạm kết. Cảm ơn sự quan tâm của các bạn!

*Bài viết được tham khảo từ [ANANTHA KRISHNAN K G](https://medium.com/anantha-krishnan-k-g/how-to-add-faceid-touchid-using-swift-4-a220db360bf4)*