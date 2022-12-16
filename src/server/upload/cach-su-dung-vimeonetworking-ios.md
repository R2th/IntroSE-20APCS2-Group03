VimeoNetworking là SDK của Vimeo cho phép chúng ta sử dụng các API của Vimeo. (vimeo là trang web chia sẻ video như Youtube nhé.)

## 1. Tạo App trên Vimeo
- Bước 1: truy cập trang web: https://developer.vimeo.com/apps, chọn **Create App**

![](https://images.viblo.asia/53f7b822-a103-47e8-87a7-887a6776e135.png)

Điền đầy đủ thông tin sau đó chọn **Create App** (các bạn nhớ điền thông tin chính xác đầy đủ nhé, bởi vì chứng năng uploads sẽ cần Vimeo Review App mới dùng được)

![](https://images.viblo.asia/e66df431-8eee-420a-9bae-aa26e3c462b1.png)

Sau đó bạn sẽ được app trông như thế này:
![](https://images.viblo.asia/213d40e0-f22c-484e-a4ac-2bebe2bee697.png)

Để app của bạn có thể upload được video bạn cần **Request Upload Access** sau đó chờ vài ngày để Vimeo review nhé (khi bị hỏi *Where will these videos be uploaded?*  thì bên nên chọn My account tức upload nên tài khoản của mình để nó review dễ Approve hơn :D ):
![](https://images.viblo.asia/e611ce86-673f-446a-8735-43cef1aba492.png)


- Bước 2: Set up **Client Identifier, Client Secrets**.
Chọn App bạn vừa tạo, sau đó chọn tab **Authentication** ở đây bạn sẽ thấy các token của app
![](https://images.viblo.asia/f5cdaad0-4bd3-452e-b04a-6f803af4baaa.png)


- Bước 3: Tạo **access token**.
Vẫn ở tab **Authentication**,  kéo xuống mục Generate a new Access Token -> Scope, bạn hay chọn nhưng access mình cần rồi chọn **Generate Token**. Bạn sẽ được kết quả như màn hình dưới, **bạn phải copy các Access token ra nhé**, quên mất là không có chỗ xem lại đâu =))
![](https://images.viblo.asia/0a443437-b558-433a-a84a-6a6bbc3e605a.png)


## 2. Thêm code cho VimeoNetworking
Chắc đây mới là phần các bạn quan tâm nhất

### Bước 1: Tạo Project
- Tạo project: cái này các bạn tự làm nhé :D

### Bước 2: Import VimeoNetworking SDK

Bởi vì VimeoSDK hiện tại chưa có pod chính thức + chưa hoàn toàn support Swift 4 nên chúng ta phải dùng **Development Pods + Swift 3.2** như sau:
- Thêm CocoaPods cho project
- Trong thưc mục project tạo folder: **'Submodules/VimeoNetworking'**, sau đó copy source code của VimeoNetworking vào thư mục đó (bạn có thể dowload .zip về rồi giải nén vào đó hoặc clone code vào thư mục đó đều được nhé)
- Sửa file podfile thêm:
    `pod 'VimeoNetworking', :path => 'Submodules/VimeoNetworking'`
    
- Sửa để cho libs hỗ trợ Swift 3.2 thêm đoạn sau vào cuối podfile nhé:
```
post_install do |installer|
    installer.pods_project.targets.each do |target|
        if ['VimeoNetworking', 'VimeoUpload'].include? target.name
            target.build_configurations.each do |config|
                config.build_settings['SWIFT_VERSION'] = '3.2'
            end
        end
    end
end
```
- Tiếp đó chạy `pod install`

Sau đó bạn mở Workspace lên rồi **CMD + B** xem có build success không đã nhé. Nếu OK rồi thì sang bước tiếp theo :D

### Bước 3: Config Vimeo App cho Project

- Thêm vimeo config với **Client Identifier, Client Secrets** bạn đã tạo ở trên
```
import Foundation
import VimeoNetworking

/// Extend app configuration to provide a default configuration
extension AppConfiguration
{
    /// The default configuration to use for this application, populate your client key, secret, and scopes.
    /// Also, don't forget to set up your application to receive the code grant authentication redirect, see the README for details.
    static let defaultConfiguration = AppConfiguration(clientIdentifier: "a871dd0c8e3411046caa0d225b287f5d5b8d4051", clientSecret: "bAqjHufB5ob7FpEcLg0FKxJj2H2G8ilkgbt4ZtO+CpU3m6AANE4bxnyI0Q0J/BHDNSj0HCo1zNZNU3nGxmTNUJNUjxc5d1Zf89Ax9X6Ns8KlhsSS6rZ0XBTW/MN11M+p", scopes: [.Public, .Private, .Interact], keychainService: "keychainServiceVimeo")
}
```

- Ở AppDelegate: khi didFinishLaunching app bạn cần authentication cho app:
 ```
 import VimeoNetworking
func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        setupVimeoSDK()
        authenticationVimeo()
        return true
    }
    
    func setupVimeoSDK() {
        VimeoClient.configureSharedClient(withAppConfiguration: AppConfiguration.defaultConfiguration)
    }
    
    // authen
    func authenticationVimeo() {
        let authenticationController = AuthenticationController(client: VimeoClient.sharedClient,
                                                                appConfiguration: AppConfiguration.defaultConfiguration)
        if let account = try? authenticationController.loadUserAccount(), let accountSaved = account {
            log("load saved account \(accountSaved)")
        } else {
            let token = "Access token đã tạo được ở trên"
            authenticationController.accessToken(token: token) { account in
                log("authentication account \(account)")
            }
        }
    }
```

### Bước 4: Get video info
Bây giờ bạn có thể sử dụng Request của VimeoNetworking để lấy information của video rồi nhé.

Ví dụ: lấy tất cả videos của mình (notes: có load more ở **response.nextPageRequest**):
```
let request: Request<[VIMVideo]> = Request<[VIMVideo]>(path: "/me/videos")
VimeoClient.sharedClient.request(request) { result in
                switch result {
                case .success(let response):
                    print(response.model)
                case .failure(let error):
                     print(error)
                }
            }
```

Ví dụ: cách lấy các video của 1 chanel (notes: có load more ở **response.nextPageRequest**):
```
let request: Request<[VIMVideo]> = Request<[VIMVideo]>(path: "/channels/staffpicks/videos")
VimeoClient.sharedClient.request(request) { result in
                switch result {
                case .success(let response):
                    print(response.model)
                case .failure(let error):
                     print(error)
                }
            }
```

Ví dụ: cách lấy thông tin của 1 video

```
let videoUri = "/videos/274326489"
            let videoRequest = Request<VIMVideo>(path: videoUri)
            VimeoClient.sharedClient.request(videoRequest, completion: { result in
                switch result {
                case .success(let result):
                    print(result.json)
                case .failure(let error):
                    print(error)
                }
            })
```

## Kết luận
VimeoNetworking là 1 SDK của vimeo giúp chúng ta tương tác với các API của vimeo, nó đã được dựng sẵn khung request, authentication, model.
Mặc dù nó chưa được tối ưu hoá support (chưa có pod chính thức trên cocoapod mà phải dùng Development Pods + chưa hỗ trợ Swift 4) nhưng sau khi setup xong nó cũng rất dễ sử dụng :D.


NOTES: Vimeo chỉ chả về **video files** khi tài khoản của bạn là tài khoản **PRO** còn không là nó không trả về video files đâu :(

Ngoài ra với các video public bạn có thể lấy video info bằng libs sau: https://github.com/lilfaf/YTVimeoExtractor

Tài liệu tham khảo:
- https://developer.vimeo.com/api/start
- https://github.com/vimeo/VimeoNetworking