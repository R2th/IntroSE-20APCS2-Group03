Bài viết này mình sẽ hướng dẫn cách login qua facebook trên ứng dụng một cách đơn giản.
Các bước cần thực hiện:
1.  Tạo Facebook App trên trang https://developers.facebook.com/apps/
2.  Tạo Xcode project và thêm Facebook SDK
3.   Chỉnh sửa file  Info.plist

Bây giờ chúng ta sẽ đi từng bước một nhé!

### Bước 1: Tạo Facebook App trên trang https://developers.facebook.com/apps/

Vào trang  https://developers.facebook.com/apps/ và chọn thêm ứng dụng mới. Sau đó sẽ hiện ô cửa sổ để mình tạo AppID (Mỗi một ứng dụng sẽ có 1 app ID riêng)
Để tạo được 1 App ID, mình nhập tên hiển thị app của mình và 1 mail:
![](https://images.viblo.asia/f2bf5c4f-4507-4ec3-8ee6-b4d40298e2ea.png)

Sau khi nhập xong thì nhấp Tạo ID ứng dụng, một màn hình hiện lên các chức năng mình có thể sử dụng với facebook tương ứng với 1 ứng dụng của bạn như sau:
![](https://images.viblo.asia/ac08c7cf-159f-4661-b60f-bcfe8bad558e.png)
Ở đây mình đang dùng chức năng đăng nhập facebook nên mình chọn nút Thiết lập của ô Đăng nhập facebook.

Vậy là đã hoàn thành xong bước 1!!!

### Bước 2:  Tạo Xcode project và thêm Facebook SDK

 Tạo một ứng dụng trên Xcode như bình thường. Ở đây mình đặt tên là LoginFacebookExample và bundle identifier là hoan.LoginFacebookExample như hình
 
 ![](https://images.viblo.asia/62827e86-c614-4910-9c0f-034105b2e959.png)
 
 Sau khi tạo xong project, mình quay lại trang https://developers.facebook.com/apps/ và cài đặt để điện ID gói
 ID gói chính là bundle identifier của mình bên trên đó (hoan.LoginFacebookExample)
 
 ![](https://images.viblo.asia/ce2cb33c-575c-4d48-959e-67c76285a663.png)
 
Vì dùng SDK của Facebook nên mình cài Pod nhé, cài pod như sau:
```
sudo gem install cocoapod
pod init
```

Vậy là đã có PodFile trong project của bạn, vào PodFile để điền thư viện mình cần sử dụng:
```
pod 'FBSDKLoginKit'
```
Mỗi lần thêm 1 thư viện vào PodFile thì phải nhớ gõ lệnh install:
```
pod install
```
Vậy là mình đã add xong thư viện vào project rồi, tiếp theo mình sẽ tạo giao diện ( thực ra là tạo 1 button login thôi)
```
 let loginButton = FBSDKLoginButton.init()
        loginButton.center = self.view.center
        self.view.addSubview(loginButton)
```
Ở file AppDelegate cũng phải chỉnh sửa chút chút
```
 func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        FBSDKApplicationDelegate.sharedInstance()?.application(application, didFinishLaunchingWithOptions: launchOptions)
        return true
    }
    
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        guard let fbDelegate = FBSDKApplicationDelegate.sharedInstance() else {
            return false
        }
        let handled = fbDelegate.application(app, open: url, sourceApplication: (options[UIApplication.OpenURLOptionsKey.sourceApplication] as! String), annotation: [UIApplication.OpenURLOptionsKey.annotation])
        
        return handled
```
### Bước 3:  Chỉnh sửa file  Info.plist
Đây là bước cuối cùng, chú ý điền đầy đủ không là không được đâu :)
```
<key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleURLSchemes</key>
            <array>
                <string>fb979774675551763</string>
            </array>
        </dict>
    </array>
    <key>FacebookAppID</key>
    <string>979774675551763</string>
    <key>FacebookDisplayName</key>
    <string>LoginExample</string>
```
```
 <key>LSApplicationQueriesSchemes</key>
    <array>
        <string>fbapi</string>
        <string>fb-messenger-share-api</string>
        <string>fbauth2</string>
        <string>fbshareextension</string>
    </array>
```

Vậy là đã hoàn thành xong. Chạy thử project nhé!!!
Mình có kèm project demo trên link github để mọi người tham khảo
https://github.com/oHaThiHoan/IOSExample/tree/master/LogInFacebookExample/LogInFacebookExample

Cảm ơn các bạn đã đọc hết bài :) :) <3 <3