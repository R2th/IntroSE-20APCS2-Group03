Facebook Account Kit giúp mọi người đăng ký và đăng nhập ứng dụng một cách nhanh chóng và dễ dàng bằng số điện thoại hoặc địa chỉ email của họ làm thông tin đăng nhập không cần mật khẩu. Account Kit được cơ sở hạ tầng gửi SMS và email của Facebook hỗ trợ mang lại hiệu quả tin cậy có thể mở rộng với phạm vi tiếp cận toàn cầu. Do sử dụng xác thực bằng email và số điện thoại, Account Kit không yêu cầu tài khoản Facebook và là phương thức thay thế lý tưởng để đăng nhập vào ứng dụng của bạn.

Account Kit được xây dựng cho thế giới di động, quản lý tài khoản dễ dàng và không cần nhớ mật khẩu. Khi một người bắt đầu đăng nhập bằng địa chỉ email của họ, Account Kit sẽ gửi liên kết một lần đến địa chỉ email của người đó. SDK sẽ phát hiện thời điểm địa chỉ email được xác minh. Khi một người bắt đầu đăng nhập bằng số điện thoại của họ, Account Kit sẽ gửi mã xác nhận qua SMS đến số đó để xác thực hoặc xác minh số trực tiếp (xem xác minh nhanh).

Luồng đăng nhập của Account Kit kết hợp cả đăng ký tài khoản và đăng nhập tài khoản. Không cần kiểm tra xem tài khoản đã tồn tại hay chưa hoặc không cần tạo luồng riêng để đăng ký người dùng mới. Sau khi đăng nhập hoặc đăng ký thành công, Account Kit sẽ cung cấp cho ứng dụng của bạn thông tin đăng nhập xác thực của người đăng nhập.

![Authentication Sequence](https://images.viblo.asia/a216fc7e-e636-4dd8-bbda-a9e1b053d473.jpeg)


## Create a New App
Sau khi đăng nhập vào Facebook develop bạn thêm ứng dụng hoặc tạo mới ứng dụng tại đây [facebook developer account.](https://developers.facebook.com/docs/accountkit/ios)
## Choose Your App Settings
Chọn xem có cho phép đăng nhập email và SMS không rồi chọn cài đặt bảo mật cho [ứng dụng của bạn](https://developers.facebook.com/apps/).
## Set up Your Developer Environment
Setup developer evironment sử dụng Cocoapods:
Nếu project của bạn chưa có [cocoapod](https://guides.cocoapods.org/using/using-cocoapods) thì đầu tiên bạn phải install và init pod cho project của bạn:
```
$ sudo gem install cocoapods
$ pod init
```
Sau khi chạy lện pod init. Cocoapod sẽ generate ra cho bạn một file Podfile Mở podfile thêm dòng lệnh sau:
```
pod 'AccountKit'
```
Sau đó bạn chạy pod install để syn data từ server về. Sau khi install xong project của bạn sẽ được tích hợp thêm một project pods. Cocoapod sẽ generate ra Your_Project.xcworkspace. Mở project của bạn lên và thực hiện config login sử dụng Facebook AccountKit.

Thêm cả ID ứng dụng Facebook và Mã ứng dụng Account Kit vào tệp Info.plist dưới dạng chuỗi. Đảm bảo bạn đã bật Account Kit trong bảng điều khiển ứng dụng. Bạn sẽ tìm thấy mã ứng dụng Account Kit trong phần Account Kit của bảng điều khiển ứng dụng. Tên ứng dụng sẽ được dùng trong giao diện người dùng của màn hình đăng nhập.
```
  <key>FacebookAppID</key>
  <string>{your-app-id}</string>
  <key>AccountKitClientToken</key>
  <string>{your-account-kit-client-token}</string>
```

```
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>ak{your-app-id}</string>
      </array>
    </dict>
```

## Configure Login View Controller
Trước tiên bạn thêm một LoginViewController update UI. Sau khi đã hoàn thành bạn cần implement Facebook AccountKit. Đầu tiên bạn cần thêm AKFViewControllerDelegate cho LoginViewController
```
import AccountKit
class LoginViewController: UIViewController, AKFViewControllerDelegate{
    //...
}
```
Đồng thời emplement một số phương thức của AKFViewControllerDelegate. 

```
func prepareLoginViewController(loginViewController: AKFViewController) {
    loginViewController.delegate = self
    //UI Theming - Optional
    loginViewController.uiManager = AKFSkinManager(skinType: .classic, primaryColor: UIColor.blue)
}
```

## Handle Different Login States
Sau khi load LoginViewController bạn thực hiện khởi tạo Facebook Account Kit. Sau đó set delegate cho Account Kit bằng LoginViewController. 
```
var _accountKit: AKFAccountKit!
override func viewDidLoad() {
     super.viewDidLoad()
     // initialize Account Kit
     if _accountKit == nil {
          _accountKit = AKFAccountKit(responseType: .accessToken)
     }
}
```

Đồng thời check trạng thái của accountKit. Nếu bạn đã login trước đó và accesstoken của bạn vẫn active thì không cần lặp lại việc login nữa và break qua bước login.
```
override func viewWillAppear(_ animated: Bool) {
     super.viewWillAppear(animated)
     if _accountKit?.currentAccessToken != nil {
        // if the user is already logged in, go to the main screen
        // ...
     }
     else {
        // Show the login screen
     }
}
```

## Initiate a Login Flow
Thêm function loginWithPhone:
- Login bằng SMS:
```
func loginWithPhone(){
     let inputState = UUID().uuidString
     let vc = (_accountKit?.viewControllerForPhoneLogin(with: nil, state: inputState))!
     vc.enableSendToFacebook = true
     self.prepareLoginViewController(loginViewController: vc)
     self.present(vc as UIViewController, animated: true, completion: nil)
}
```
Trong đó:
* preFillPhoneNumber - nullable NSString: Thông số này để điền sẵn trường số điện thoại trong quy trình đăng nhập bằng điện thoại. Sử dụng nil để bỏ qua (Để trống). TH nếu bạn đã login trước đó thì bạn có thể lưu lại số điện thoại đó sau khi logout thì login lại số đt đó sẽ được fill vào. Giảm thao tác người dùng.
* inputState - nullable NSString: Là một chuỗi string được tạo ngẫu nhiên. Nó dùng để xác định request trả về có đúng là request bạn đã gửi đi trước đó hay không (Nó được gửi về khi didLogin). 
-  Login bằng email:
```
func loginWithEmail() {
     let inputState = NSUUID().uuidString
     let vc = _accountKit!.viewControllerForEmailLogin(withEmail: nil, state: inputState)
     self.prepareLoginViewController(loginViewController: vc)
     self.present(vc as UIViewController, animated: true, completion: nil)
}
```
Trong đó:
* preFillEmailAddress - nullable NSString: Tương tự như login bằng SMS trường này cho phép bạn fill email trước đó đã login hoặc fill một email default vào khung login. TH bạn để trống thì set nó bằng nil.
* inputState - nullable NSString: Giống login bằng SMS.

## Handle Login Callback
Sau khi login thành công Facebook sẽ gửi lại cho ứng dụng của bạn một chuỗi token thông qua AKFViewControllerDelegate.
```
func viewController(viewController: UIViewController!, didCompleteLoginWithAccessToken accessToken: AKFAccessToken!, state: String!) {
    print("did complete login with access token \(accessToken.tokenString) state \(state)")
}
```
Trường hợp trong quá trình login có phát sinh lỗi hoặc bạn cancel Facebook Account Kit sẽ callback lại cho Application bạn thông qua delegate bạn chỉ việc implement function sau:
```
func viewController(_ viewController: (UIViewController & AKFViewController)!, didFailWithError error: Error!) {
    // ... implement appropriate error handling ...
    print("\(viewController) did fail with error: \(error.localizedDescription)")
}

func viewControllerDidCancel(_ viewController: (UIViewController & AKFViewController)!) {
    // ... handle user cancellation of the login process ...
}
```
## Access Account Information
Sau khi đã đăng nhập thành công, bạn có thể truy cập thông tin tài khoản. 
```
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

Để logout: 
```
accountKit.logOut()
```

## Kết luận
Mình vừa mới giới thiệu cho các bạn về Facebook Account Kit nó là công cụ khá tốt để bạn có thể sử dụng cho việc login vào ứng dụng của bạn. Ngoài ra nó còn là công cụ khá tốt để validate số điện thoại của user :D.

Xem thêm:
https://medium.com/flawless-app-stories/facebook-account-kit-using-swift-1dfee31ce9dd
https://code.tutsplus.com/tutorials/quick-tip-passwordless-authentication-with-account-kit--cms-28033