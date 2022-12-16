Với việc phát hành iOS13, Apple đã giới thiệu một tính năng mới: Sign in with Apple.
Tính năng này cho phép người dùng ứng dụng tạo tài khoản mà không cần chia sẻ thông tin cá nhân. Người dùng chỉ cần xác thực bằng ID Apple mà họ đang sử dụng trên điện thoại của mình và các chi tiết mà ứng dụng yêu cầu có thể được truy xuất từ tài khoản Apple như tên, email..
Đăng nhập bằng Apple là một giải pháp thay thế cho đăng nhập hiện có bằng các tùy chọn Google và Facebook mà các ứng dụng và trang web thường cung cấp. Tùy chọn đăng nhập của Apple bảo vệ quyền riêng tư của bạn và thậm chí cho phép bạn che giấu địa chỉ email của mình.

##### Tích hợp đăng nhập với Apple
Đi tới LoginViewController và import the framework để xác thực. Nó cung cấp các thư viện cần thiết để tích hợp.

```swift    
import AuthenticationServices
 ```
 
 Khởi tạo nút Đăng nhập bằng Apple:
 
 ```swift    
let button = ASAuthorizationAppleIDButton()
 ```
 
 Tiếp theo, thêm một target trên button để nó có thể được sử dụng để call chức năng đăng nhập.
 
 ```swift    
button.addTarget(self, action: #selector(handleAppleIDAuthorization), for: .touchUpInside)
 ```
 
Bạn có thể thêm nút này trực tiếp trong  view hoặc bất kỳ dạng container view nào khác. 
ở đây chúng ta dùng UIStackView.

 ```swift    
loginStackView.addArrangedSubview(button)
 ```
 
 ### Authentication
 
 Hiện tại, bạn sẽ thấy lỗi trong project của mình vì bạn chưa tạo phương thức trong lớp được đề cập trong khi thêm target vào button Đăng nhập bằng Apple. Hãy thêm nó.
 
 Tạo method handleAppleIDAuthorization() ngay sau khi kết thúc hàm trong đó button được thêm vào.
 
 Hãy nhớ rằng hàm này phải có từ khóa @objc được thêm vào đầu vì nó là một selector method có liên quan đến Objective-C-library. Thêm code bên dưới để tạo authorization request.
 
  ```swift    
let request = ASAuthorizationAppleIDProvider().createRequest()
let controller = ASAuthorizationController(authorizationRequests: [request])
controller.delegate = self
controller.presentationContextProvider = self
controller.performRequests()
 ```
 
 
 Summary
 
 1. Đầu tiên, khởi tạo request ID Apple. Đây là tất cả những gì nó yêu cầu để tạo một tài khoản trong hệ thống.
 2. Khởi tạo controller để hiển thị authorization view.
 3. Tiếp theo, chỉ định người được ủy quyền result of authorization
 4.  Cuối cùng, trigger the request
 
 Ngoài ra, theo tùy chọn, nếu bạn require tên người dùng hoặc email, bạn có thể thêm dòng bên dưới sau khi khởi tạo yêu cầu
 
  ```swift    
request.requestedScopes = [.fullName, .email]
 ```
 
 ##### Verification
 
 Phần cuối cùng là nhận phản hồi và xác minh người dùng. Bạn cần mở rộng lớp cho các  authentication delegates để nhận các lệnh callbacks
 Đầu tiên là ASAuthorizationControllerPresentationContextProviding. Khi bạn extend lớp với điều này, bạn sẽ phải override function:
 
   ```swift    
func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor
 ```
 
 Nó trả về một dạng view mà bạn muốn hiển thị cửa sổ authentication. Bạn cần trả lại current controller view window:
 
   ```swift    
return view.window!
 ```
 
 
   ```swift    
func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization)
 ```
 
   ```swift    
func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error)
 ```
 
**1. User ID**
 
 user identifier là duy nhất và chỉ thuộc về một người dùng cụ thể.
 
   ```swift    
let userId = credential.user
 ```
 
**2. Verification data**

user identifier và authorization code. Mã thông báo nhận dạng là mã thông báo tồn tại trong thời gian ngắn có thể được sử dụng để nhận mã thông báo được làm mới.

   ```swift    
let identityToken = credential.identityToken
let code = credential.authorizationCode
 ```
 
**3. Account information**

Nếu bạn đã yêu cầu tên và địa chỉ email, thì những chi tiết này có thể được truy xuất từ credentials object.

   ```swift    
let fullname = credential.fullName
let email = credential.email
 ```