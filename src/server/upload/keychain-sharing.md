# 1. Keychain là gì?
Keychain là một lưu trữ bảo mật với những dữ liệu nhỏ gọn, nhạy cảm ví dụ như mật khẩu, số tài khoản ngân hàng hay một vài thông tin khác mà ta muốn bảo mật không cho người khác biết hoặc hack được.

Thông thường với những thông tin cần bảo mật ở trên ta chỉ sử dụng được trong cùng một ứng dụng và không thể sử dụng ở các ứng dụng khác. Trong một số trường hợp có nhiều ứng dụng do cùng một nhà phát triển ví dụ như Facebook và Messenger. Nếu ta đăng nhập ở Facebook với tài khoản đã đăng ký, liệu ta có thể đăng nhập với account này với Messenger không? Nếu đăng nhập được thì thông tin account có được bảo mật tốt hay không. Keychain Sharing chính là cái chúng ta cần khi sử dụng trong trường hợp này.

Chúng ta có thể chia sẻ Keychain đã được lưu trữ giữa nhiều ứng dụng khác nhau trên cùng một thiết bị và tất nhiên với chung một nhà phát triển với cùng Apple Developer Account.

# 2. Cài đặt sử dụng Keychain Sharing
Để sử dụng Keychain Sharing với nhiều ứng dụng, chúng ta cần tạo hai ứng dụng trở lên để Demo chức năng này. Trong Xcode chúng ta bật Keychain Sharing ở trong Capabilities theo hình sau:
![](https://images.viblo.asia/8f0ad651-078e-4f02-a6ca-55bd8f8033e0.png)

Trong đó Keychain Groups là tên được dùng để các ứng dụng khác dựa vào lấy ra giá trị của phần tử Keychain đã được lưu trữ. Tên này chúng ta có thể đặt tuỳ ý nhưng thông thường chúng ta đặt tên gợi nhớ chung về các ứng dụng sử dụng Keychain này. Sau khi turn on Keychain Sharing sẽ sinh ra file .entitlements.
![](https://images.viblo.asia/a50787e3-eabe-47da-8142-5efdc471d4a7.png)

Trong file trên có trường {AppIdentifierPrefix}, trường này chính là Prefix được lấy ở App ID mà chúng ta đã tạo ra trong Apple Developer Account.
![](https://images.viblo.asia/7cfed109-9797-47bd-b6ca-02a9c8b831e1.png)

Để sử dụng lưu trữ Keychain trên iOS có rất nhiều thư viện hỗ trợ hoặc chúng ta có thể tự code. Để cho đơn giản và nhanh chóng chúng ta sẽ sử dụng thư viện KeychainSwift với CocoaPods:
```
    pod 'KeychainSwift'
```
Vậy là ta đã có các cài đặt và giá trị cần thiết để xây dựng ứng dụng sử dụng Keychain Sharing.

# 3. Xây dựng ứng dụng sử dụng Keychain Sharing
Để cho đơn giản chúng ta sẽ sử dụng chức năng login ở ứng dụng này và lưu account lại để đăng nhập vào ứng dụng khác. Ứng dụng đầu tiên (tạm gọi là Demo) sẽ có chức năng login bằng username và password. Ta có thể design sơ bộ như thế này.
![](https://images.viblo.asia/6ccd4184-f950-4ddb-b393-517b649e3f7e.png)

Với ứng dụng này khi ta login thành công sẽ lưu acount vào keychain bằng đoạn code sau:
```
    // MARK: - Action
    @IBAction func loginButtonAction(_ sender: Any) {
        guard let userName = self.userNameTextField.text, !userName.isEmpty else {
            self.setErrorHidden(isHidden: false, message: "Username is incorrect.")
            return
        }
        guard let pass = self.passwordTextField.text, !pass.isEmpty, pass.count >= 6 else {
            self.setErrorHidden(isHidden: false, message: "Password is incorrect.")
            return
        }
        self.setErrorHidden(isHidden: true)
        let keychain = KeychainSwift()
        keychain.accessGroup = "23S5TA2YQC.KeychainSharingDemo"
        keychain.set(userName, forKey: "userName")
        keychain.set(pass, forKey: "password")
        if let homeViewController = self.storyboard?.instantiateViewController(withIdentifier: "HomeViewController") {
            self.navigationController?.pushViewController(homeViewController, animated: true)
        }
    }
```

Chúng ta có thể thấy đoạn code:
```
    keychain.accessGroup = "23S5TA2YQC.KeychainSharingDemo"
```
rất cần thiết để chúng ta có thể share keychain giữa các ứng dụng với nhau.
Ứng dụng thứ hai (tạm gọi là Demo1) sẽ được bật ra từ ứng dụng Demo bằng button Continue with Demo1.
Để bật ra được ứng dụng này từ ứng dụng khác ta sử dụng Schemes, trong ứng dụng Demo ta thêm LSApplicationQueriesSchemes vào Info.plist như sau:
![](https://images.viblo.asia/726e9df9-ab5d-4591-a1ab-435318ff6eb3.png)

Trong ứng dụng Demo1 ta thêm vào Info.plist như sau:
![](https://images.viblo.asia/5b894f74-ef3b-4293-a0ea-7e70ba63a263.png)

Sau đó ta nhấn vào button Continue with Demo1. để mở ứng dụng Demo1.
```
    // MARK: - Action
    @IBAction func continueWithDemo1Action(_ sender: Any) {
        guard let appURL = URL(string: "OpenDemo1://") else {
            return
        }
        if UIApplication.shared.canOpenURL(appURL) {
            UIApplication.shared.open(appURL)
        }
    }
```
Ở ứng dụng Demo1 ta muốn xem có lấy được keychain đã lưu được ở ứng dụng Demo không, chúng ta sử dụng đoạn code sau:
```
    let keychain = KeychainSwift()
    keychain.accessGroup = "23S5TA2YQC.KeychainSharingDemo"
    if let userName = keychain.get("userName"), let password = keychain.get("password") {
       print("userName = \(userName) password = \(password)")
    } else {
      // Do something
    }
```
Vậy chúng ta đã lấy được thông tin lưu trữ bằng Keychain giữa hai ứng dụng Demo và Demo1 bằng cách sử dụng Keychain Sharing.