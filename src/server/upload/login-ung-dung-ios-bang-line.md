## Giới thiệu
Rút ngắn quá trình đăng ký đăng nhập làm tăng trải nghiệm người dùng là xu thế chung của các ứng dụng hiện nay. Việc sử dụng các nền tảng SNS để xác thực trở nên phổ biến và được hỗ trợ nhiều từ phía các nền tảng như Facebook, Line, Twitter, Apple, ...


Trong bài viết hôm nay, mình sẽ hướng dẫn các bước để thêm tính năng xác thực qua LINE trong project iOS
## Cấu hình LINE 
Bước 1: Truy cập Link developers.line.biz và đăng nhập bằng tài khoản LINE 
![](https://images.viblo.asia/ddcb0acb-8f3b-4f07-bb33-4c83234c1fe8.png)
Bạn có thể sử dụng tài khoản LINE cá nhân hoặc đăng ký  tài khoản LINE Business cho ứng dụng của mình

Bước 2: Tạo một Provider
Provider có thể là một cá nhân, công ty hay tổ chức cung cấp dịch thông qua LINE platform. Ở đây mình sẽ tạo ra provider có tên là DemoLogin
![](https://images.viblo.asia/e7981752-f38d-4281-a782-d721f0699928.png)

Giao diện sau khi tạo và chọn Provider 
![](https://images.viblo.asia/33ac7c15-2603-44b1-a390-48b163d04eaa.png)

Trong Provider có một vài Setting nhưng với ví dụ này chúng ta sẽ chưa cần quan tâm đến

Bước 3: Tạo và cấu hình cho Channel
Channel là kênh giao tiếp giữa các phương thức được cung cấp bởi LINE Platform và dịch vụ của Provider



Chọn "Create a LINE Login Channel"

Mình sẽ tạo ra một Channel có tên DemoLoginApp, lựa chọn App types là "Mobile App" và thêm description cho Channel (Bắt buộc)
![](https://images.viblo.asia/a30d7069-6e00-4d9b-9aaf-f6e489f9b8fe.png)

Lưu ý khi tạo tên Channel không được bao gồm chữ "LINE"

Đây là giao diện sau khi tạo xong Channel
![](https://images.viblo.asia/e46b80f2-1435-4640-965e-f0c5f57ecc14.png)


Ở đây các bạn cần để ý Channel ID. Lát chúng ta sẽ sử dụng để config cho App

Chuyển sang tab LINE Login và điền BundleID của App vào mục iOS bundle ID. BundleID của App các bạn có thể tìm trong mục General Setting của project trong XCode

![](https://images.viblo.asia/32b57e5a-c515-4b38-92e7-3de66653f279.png)

Trường iOS universal link có thể bỏ trống vì là optional. LINE khuyến khích các bạn sử dụng Universal Link để tăng tính bảo mật khi giao tiếp giữa LINE và ứng dụng. Trong ví dụ này mình sẽ chỉ sử dụng bundle ID để kết nối với App

## Cấu hình ứng dụng
Bước 1: Thêm LINE SDK vào trong Project. Mình sẽ sử dụng Cocoapods trong demo này
![](https://images.viblo.asia/56ccb88d-ddc2-421f-90bf-beedaeddce1b.png)

Ngoài ra LINE cũng hỗ trợ các phương thức khác để thêm SDK vào Project. Mọi người có thể tham khảo https://developers.line.biz/en/docs/ios-sdk/swift/setting-up-project/#installation

Bước 2: Mở file Info.plist dưới dạng Source Code và thêm đoạn mã này vào trước thẻ </dict> cuối cùng
```swift
    <key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleTypeRole</key>
            <string>Editor</string>
            <key>CFBundleURLSchemes</key>
            <array>
                <!-- Specify URL scheme to use when returning from LINE to your app. -->
                <string>line3rdp.$(PRODUCT_BUNDLE_IDENTIFIER)</string>
            </array>
        </dict>
    </array>
    <key>LSApplicationQueriesSchemes</key>
    <array>
        <!-- Specify URL scheme to use when launching LINE from your app. -->
        <string>lineauth2</string>
    </array>
```

Bước 3: Cấu hình LINE SDK trong App Delegate và Scence Delegate
Ở bước này chúng ta sẽ sử dụng tới Channel ID mình đã nhắc ở trên

import LineSDK và thêm câu lệnh như trong hình để set up, thay "YOUR_CHANNEL_ID" bằng id của Channel nãy vừa tạo\
LINE khuyến khích chúng ta sử dụng universal link để mở App sau khi hoàn thành Login. Cách này bảo mật hơn so với việc mở App trực tiếp từ Bundle ID được đăng kí. Cài đặt universal link cần server và domain cũng như setup tương đối phức tạp nên trong ví dụ này mình sẽ chưa sử dụng tới. Do đó trường universalLinkURL sẽ set nil
```swift
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        LoginManager.shared.setup(channelID: "YOUR_APP_ID", universalLinkURL: nil)
        return true
    }
    
 }
   ```

Để xử lý response trả về từ LINE, chúng ta cẩn bổ sung thêm phương thức sau trong AppDelegate
```swift
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        return LoginManager.shared.application(app, open: url)
    }
```
Với iOS 13 trở lên, URL trả về sẽ được gọi bởi UISceneDelegate. Do đó ta cần thêm đoạn mã sau trong Scene Delegate
```swift
// SceneDelegate.swift
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    _ = LoginManager.shared.application(.shared, open: URLContexts.first?.url)
}
```

Bước 4: Tạo giao diện\
Giao diện mình sẽ tạo một Button. Chúng ta có thể sử dụng sẵn đối tượng được cung cấp bởi LINE là LoginButton và implement LoginButtonDelegate cho controller để nhận được data reponse

Ngoài ra chúng ta có thể tạo button như bình thường và gọi hàm login bằng code
![](https://images.viblo.asia/5b0af151-7500-4c70-8b11-4a091d2bc314.png)

Bổ sung đoạn code sau 
```swift
    @IBAction func loginWithLineAccount(_ sender: Any) {
        LoginManager.shared.login(permissions: [.profile], in: self) {
            result in
            switch result {
            case .success(let loginResult):
                print(loginResult.accessToken.value)
                if let profile = loginResult.userProfile {
                    print("User ID: \(profile.userID)")
                    print("User Display Name: \(profile.displayName)")
                    print("User Icon: \(String(describing: profile.pictureURL))")
                }
            case .failure(let error):
                print(error)
            }
        }
        
    }
```

Run Project và chúng ta sẽ thu được kết quả
![](https://images.viblo.asia/69310a9d-4b03-42ba-97c3-ff5f8ace4f20.png)

Response trả về
![](https://images.viblo.asia/75d2ec4f-e839-4c59-8b00-92dda7cdf314.png)

### Tham khảo
https://developers.line.biz/en/

### Source Code Demo
https://github.com/buixuanhuy5798/DemoLoginLine