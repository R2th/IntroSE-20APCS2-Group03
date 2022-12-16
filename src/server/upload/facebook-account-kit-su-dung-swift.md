Account Kit giúp chúng ta nhanh chóng và dễ dàng đăng kí hay đăng nhập vào ứng dụng bằng cách sử dụng số điện thoại hoặc email.
Đây là sản phẩm của Facebook đáng tin cậy và có tầm ảnh hưởng toàn cầu. Bởi vì nó xác thực bằng email hoặc số điện thoại. 
Nó cũng không yêu cầu bạn cần sử dụng tài khoản facebook và cũng là việc thay thế cho login cũ trước kia. 
Các bước để cài đặt: 
### 1. Lựa chọn hoặc tạo 1 App mới:
Bạn cần lựa chọn hoặc tạo mới 1 ứng dụng từ [Facebook developer](https://developers.facebook.com/docs/accountkit/ios)
### 2. Lựa chọn cài đặt cho App:
Lựa chọn liệu app của bạn sẽ cho phép login bằng SMS hay email, và chọn các cài đặt bảo mật cho app bằng cách truy cập [tại đây!](https://developers.facebook.com/apps/)
### 3. Cài đặt môi trường phát triển:
**Sử dụng Cocoapods: **

Bạn cần cài đặt Cocoapod và thêm AccountKit vào podFile của mình
* Tiếp theo hãy thêm FacebookAppId và AccountKitClientToken của bạn vào Info.plist file.

```swift 
<plist version="1.0">
<dict>
  ...
  <key>FacebookAppID</key>
  <string>{your-app-id}</string>
  <key>AccountKitClientToken</key>
  <string>{your-account-kit-client-token}</string>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>ak{your-app-id}</string>
      </array>
    </dict>
  </array>
  ...
</dict>
</plist>
```
### 4. Config LoginViewController
Delegate của LoiginViewControlelr cần phải implement AKFViewControllerDelegate protocol. 
Các phương thức trong đây đều là optional, tuy nhiên bạn cần triển khai phương thức login thành công cho luồng login. 
```swift 
import AccountKit
class LoginViewController: UIViewController, AKFViewControllerDelegate{
    //...
}
```
Chuẩn bị Account Kit loginViewcontroller bằng cácch cài đặt delegate để hiển thị như sau : 
```swift
func prepareLoginViewController(loginViewController: AKFViewController) {
    loginViewController.delegate = self
    //UI Theming - Optional
    loginViewController.uiManager = AKFSkinManager(skinType: .classic, primaryColor: UIColor.blue)
}
```
### 5. Xử lý các trạng thai Login khác nhau
Trước hết là cần khởi tạo AccountKit như sau:
```swift 
class LoginViewController: UIViewController, AKFViewControllerDelegate {
    var accountKit: AKFAccountKit!
    
    override func viewDidLoad() {
     super.viewDidLoad()
     // initialize Account Kit
     if accountKit == nil {
          accountKit = AKFAccountKit(responseType: .accessToken)
     }
}
}
```
Nếu như app của bạn nhận được access token của người dùng ( do đã enable Client Accsexx Token Flow), thì bạn cần check đã có token trong accountKit hay chưa
```swift
override func viewWillAppear(_ animated: Bool) {
     super.viewWillAppear(animated)
     if accountKit?.currentAccessToken != nil {
        // if the user is already logged in, go to the main screen
        // ...
     }
     else {
        // Show the login screen
     }
}
```
### 6. Khởi tạo luồng Login cho SMS
Chúng ta tiến hành tạo phương thức xử lý khi người dùng chạm vào nút Login như đoạn code dưới đây
```swift
func loginWithPhone(){
     let inputState = UUID().uuidString
     let vc = (_accountKit?.viewControllerForPhoneLogin(with: nil, state: inputState))!
     vc.enableSendToFacebook = true
     self.prepareLoginViewController(loginViewController: vc)
     self.present(vc as UIViewController, animated: true, completion: nil)
}
```
### 7. Khởi tạo luồng Login cho email
Tương tự với việc Login bằng SMS : 
```swift
func loginWithEmail() {
     let inputState = NSUUID().uuidString
     let vc = _accountKit!.viewControllerForEmailLogin(withEmail: nil, state: inputState)
     self.prepareLoginViewController(loginViewController: vc)
     self.present(vc as UIViewController, animated: true, completion: nil)
}
```
### 8. Xử lý Login Callback
Việc này được thực hiện trong các phương thức  của ```AKFViewControllerDelegate``` protocol
* Xử lý hoàn thành Login với Access Token
```swift
func viewController(viewController: UIViewController!, didCompleteLoginWithAccessToken accessToken: AKFAccessToken!, state: String!) {
    print("did complete login with access token \(accessToken.tokenString) state \(state)")
}
```
* Xử lý hoàn thành Login với Authorization Code:
```swift
func viewController(_ viewController: (UIViewController & AKFViewController)!, didCompleteLoginWithAuthorizationCode code: String!, state: String!) {
    //...
}
```
* Ngoài ra bạn cũng có thế xử lý được với các trường hợp có lỗi xảy ra: 
``` swift
func viewController(_ viewController: (UIViewController & AKFViewController)!, didFailWithError error: Error!) {
    // ... implement appropriate error handling ...
    print("\(viewController) did fail with error: \(error.localizedDescription)")
}

func viewControllerDidCancel(_ viewController: (UIViewController & AKFViewController)!) {
    // ... handle user cancellation of the login process ...
}
```
### 9. Thông tin Access Account 
Sau mỗi lần Login thành công bạn sẽ nhận được thông tin  của access account. Ví dụ như :
``` swift
if accountKit == nil {
    //specify AKFResponseType.AccessToken
    self.accountKit = AKFAccountKit(responseType: AKFResponseType.accessToken) accountKit.requestAccount {
        (account, error) -> Void in
            if let accountID = account?.accountID{
                self.lblAccountId.text = accountID
            }
        
            if let email = account?.emailAddress {
                self.lblEmailOrPhone.text = email
            }
            else if let phoneNumber = account?.phoneNumber{
                self.lblEmailOrPhone.text = phoneNumber.stringRepresentation()
            }
        }
}
```
### 10. Logout 
Bạn có thể sử dụng phương thức logOut để đăng xuất. 
```accountKit.logOut()
```
Giờ thì hãy build and run Project và trải nghiệm :D

Nguồn: https://medium.com/flawless-app-stories/facebook-account-kit-using-swift-1dfee31ce9dd