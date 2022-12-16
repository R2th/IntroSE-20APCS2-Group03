Chức năng Login với Facebook mình rất thường thấy trong các ứng dụng hiện nay. Lúc mới đầu viết unit test cho nó - 1 third-party framework, mình cảm thấy nó phức tạp để test, cũng may là có cách mock khá đơn giản. Mình có 1 nút Login với Facebook ngay ở đầu tiên của ứng dụng, trong LoginViewController. Đơn giản bạn có thể nghĩ rằng: "hừm, test chức năng này thật dễ dàng, chỉ cần testLoginFails(), testLoginSucceeds() là đủ", nhưng không, nó thực sự phức tạp hơn. Trong bài viết này mình sẽ test các tình huống khác nhau có thể xảy ra như success, cancel và failure bằng cách mocking và chắc chắn rằng ứng dụng sẽ hoạt động phụ thuộc vào response của service thật.

Trong LoginViewModel, mình có hàm login với Facebook như sau:
```
import FBSDKLoginKit

enum LoginFBResult {
    case successAllPermission
    case successNotAllPermission
    case cancelled
    case error
    case none
}

class LoginViewModel {
    let loginManager = FBSDKLoginManager()
    var loginFBResult: LoginFBResult = .none

    func loginToFacebookWithSuccess(viewController: BaseViewController) {
        if FBSDKAccessToken.current() != nil {
            self.loginManager.logOut()
        }
        loginManager.logIn(withReadPermissions: ["public_profile", "email"], from: viewController) { (result, error) in
            if error != nil {
                self.loginFBResult = .error
                self.loginManager.logOut()
            } else if result?.isCancelled == true {
                self.loginFBResult = .cancel
                self.loginManager.logOut()
            } else {
                var allPermsGranted = true
                let grantedPermissions = Array(result?.grantedPermissions ?? [] ).map( {"\($0)"})
                for permission in ["public_profile", "email"] {
                    if !grantedPermissions.contains(permission) {
                        allPermsGranted = false
                        break
                    }
                }
                if allPermsGranted {
                    self.loginFBResult = .successAllPermission
                } else {
                    self.loginFBResult = .successNotAllPermission
                }
            }
        }
    }
}
```

Bây giờ, mình sẽ tạo mock class cho FBSDKLoginManager như sau, vì đó là thành phần phụ thuộc, bằng cách này những chỗ sử dụng FBSDKLoginManager sẽ được thay bằng FBSDKLoginManagerMock để kiểm tra xem app có response đúng không:

```
class FBSDKLoginManagerMock: FBSDKLoginManager {
    var result: FBSDKLoginManagerLoginResult?
    var error: NSError?
    
    func logIn(withReadPermissions: [Any]!, from: UIViewController!, handler: FBSDKLoginManagerRequestTokenHandler!) {
        handler(self.result, self.error)
    }
}
```

Mình setup 2 biến là result và error, result cho kết quả mong đợi và error cho các lỗi có thể xảy ra, các biến này là những biến chúng ta sẽ sử dụng để kiểm tra xem việc handler response có được gọi đúng không. 

Trong file test, định nghĩa 1 số biến như sau:
```
private var viewModel: LogninViewModel?
private var loginManagerMock: FBSDKLoginManagerMock!
private var controller: LoginViewController!
private var fbAccessToken: FBSDKAccessToken!

override func setUp() {
        viewModel = LoginViewModel()
        loginManagerMock = FBSDKLoginManagerMock()
        controller = LoginViewController()
        viewModel?.loginFBResult = .none
        fbAccessToken = FBSDKAccessToken(tokenString: "abc",
                                 permissions: [],
                                 declinedPermissions: [],
                                 appID: "",
                                 userID: "",
                                 expirationDate: Date(),
                                 refreshDate: Date())
    }

    override func tearDown() {
        viewModel = nil
    }
```

Bây giờ mình sẽ viết các hàm test: 
```
extension LoginViewModelTests {
    func testLoginSuccess_All_Permissions() {
        let result = FBSDKLoginManagerLoginResult.init(token: fbAccessToken, isCancelled: false, grantedPermissions: ["public_profile", "email"], declinedPermissions: [""])
        loginManagerMock.result = result
        viewModel?.loginManager = loginManagerMock
        XCTAssertEqual(viewModel?.loginFBResult, LoginFBResult.none)
        viewModel?.loginToFacebookWithSuccess(viewController: viewController)
        XCTAssertEqual(viewModel?.loginFBResult, LoginFBResult.successAllPermission)
    }
    
    func testLoginSuccess_Not_All_Permissions() {
        let result = FBSDKLoginManagerLoginResult.init(token: fbAccessToken, isCancelled: false, grantedPermissions: [""], declinedPermissions: [""])
        loginManagerMock.result = result
        viewModel?.loginManager = loginManagerMock
        XCTAssertEqual(viewModel?.loginFBResult, LoginFBResult.none)
        viewModel?.loginToFacebookWithSuccess(viewController: viewController)
        XCTAssertEqual(viewModel?.loginFBResult, LoginFBResult.successNotAllPermission)
    }
    
    func testLoginCancelled() {
        let result = FBSDKLoginManagerLoginResult.init(token: nil, isCancelled: true, grantedPermissions: [""], declinedPermissions: [""])
        loginManagerMock.result = result
        viewModel?.loginManager = loginManagerMock
        XCTAssertEqual(viewModel?.loginFBResult, LoginFBResult.none)
        viewModel?.loginToFacebookWithSuccess(viewController: viewController)
        XCTAssertEqual(viewModel?.loginFBResult, LoginFBResult.cancelled)
    }
    
    func testLoginError() {
        let result = FBSDKLoginManagerLoginResult.init(token: nil, isCancelled: false, grantedPermissions: nil, declinedPermissions: nil)
        let error = NSError(domain: "", code: 0, userInfo: nil)
        loginManagerMock.result = result
        loginManagerMock.error = error
        viewModel?.loginManager = loginManagerMock
        XCTAssertEqual(viewModel?.loginFBResult, LoginFBResult.none)
        viewModel?.loginToFacebookWithSuccess(viewController: viewController)
        XCTAssertEqual(viewModel?.loginFBResult, LoginFBResult.error)
    }
}
```

Cảm ơn bạn đã đọc bài viết.
Link tài liệu: https://github.com/jvrmed/facebook-login-mock/blob/master/README.md