# Giới thiệu firebase
Firebase là một nền tảng di động giúp developer phát triển các ứng dụng chất lượng cao, nhanh chóng, phát triển các ứng dụng cho người dùng lớn cũng như các ứng dụng đơn giản.
- Điển hình firebase hỗ trợ xây dựng một hệ thống backend di động mà chúng ta không cần phải code với các tính năng vượt trội như: Authenticate, storage, realtime, analystics  vân vân và mây mây ...

Để tìm hiểu thêm thì các bạn có thể tìm hiểu thêm tại DOCX của Firebase google. [Firebase](https://firebase.google.com/docs)

![](https://images.viblo.asia/b579aa46-1425-4e1e-a881-7c8247cf38a3.png)
# Start with IOS
Chúng ta cần chuẩn bị một số điều kiện cần thiết gồm:
> Xcode 8.0 or later
> Một project với IOS > 8
> Chúng ta có thể sử dụng Swift 3 hoặc hơn
> The bundle identifier app của bạn
> CocoaPods 1.4.0 or later
> Một device IOS
> Một account Apple nếu muốn sử dụng Push Notification
> In Xcode, bật Push Notifications thì chúng ta vào: App > Capabilities

# Add firebase vào app
1. Chúng ta phải tạo 1 app firebase theo link [Console](https://console.firebase.google.com)
2. Chúng ta vào trong trang quản lý và add Bundle identifier app và download file GoogleService-Info.plist về vứt vào project của chúng ta.
# Add cocoapod
1. Trước tiên project của bạn phải được cài cocoapod. Nếu bạn chưa cài thì có thể vào [Cocoapods](https://cocoapods.org/) để cài.
2. Sau khi thực hiện **pod init** để cài pod vào ứng dụng
3. Chúng ta add thư viện vào trong podfile
```
pod 'Firebase/Core'
```
4. Thực hiện lệnh dưới để chạy thư viện 
```
pod install
```
# Cấu hình trong AppDelegate
1. Import thư viện
```
# appdelegate.swift
import Firebase
class {
...
}
```
2. Config Firebase
```
Trong hàm: application:didFinishLaunchingWithOptions chúng ta add thêm

// Use Firebase library to configure APIs
FirebaseApp.configure()
```

Như vậy là chúng ta đã có thể sử dụng thư viện firebase để code rồi. Tiếp theo hãy xem authenticate với nó nhé.

# Authenticate with Firebase
Để authenticate chúng ta phải add thêm 1 thư viện và podfile là pod 'Firebase/Auth'
```
# Podfile
pod 'Firebase/Core'
pod 'Firebase/Auth'
```
## Lắng nghe trạng thái authenticate
Với mỗi views trong ứng dụng chúng ta cần thông tin của người dùng, chúng ta sẽ thực hiện một "người lắng nghe" FIRAuth object.

Trong wilAppear chúng ta sẽ lắng nghe sự kiện. Hàm sẽ trả về user và trạng thái authenticate.
```
# MainViewController
func viewWillAppear
    handle = Auth.auth().addStateDidChangeListener { (auth, user) in
  // ...
    }
end
```

Chúng ta phải remove nó khi viewController kết thúc

```
# MainViewController
func viewWillDisappear 
    Auth.auth().removeStateDidChangeListener(handle!)
end
```
## Đăng kí user mới
Để đăng kí mới một tài khoản. Chúng ta thực hiện
```
Auth.auth().createUser(withEmail: email, password: password) { (authResult, error) in
  // ...
}
```

Nếu đăng kí ô tô kê thì hàm sẽ trả về thông tin trong *authResult* nếu không lỗi sẽ được trả về trong *error*

## Đăng nhập
Chúng ta thử đăng nhập với user đã đăng kí xem sao nhé =))
```
Auth.auth().signIn(withEmail: email, password: password) { (user, error) in
  // ...
}
```
Với email và password chúng ta đã đăng kí. Bạn có thể sử dụng function này để đăng nhập. 
## Get User info
Đương nhiên rồi. user_info luôn là cần thiết trong một số trường hợp
```
if let user = user {
  //  Trả về userID là duy nhất
  // Không sử dụng userID này cho 1 backend khác.
  // Nếu cần thiết bạn có thể sử dụng. Use getTokenWithCompletion:completion:thay thế.
  let uid = user.uid
  let email = user.email
  let photoURL = user.photoURL
  // ...
}
```
## Các kiểu authenticate khác.

Còn rất nhiều kiểu Authenticate khác cho bạn tùy chọn trong từng ứng dụng cụ thể bạn có thể tham khảo
1. [Google Auth](https://firebase.google.com/docs/auth/ios/google-signin)
2. [Facebook Auth](https://firebase.google.com/docs/auth/ios/facebook-login)
3. [Twitter Auth](https://firebase.google.com/docs/auth/ios/twitter-login)
4. [Github Auth](https://firebase.google.com/docs/auth/ios/github-auth)
5. [Hay đơn giản là đăng nhập một cách ẩn danh](https://firebase.google.com/docs/auth/ios/anonymous-auth)

# Push Notification (Message Clound)
Các bạn chắc hẳn đã quen thuộc với các thông báo của các ứng dụng ngay cả khi không bật app như tin nhắn facebook hay zalo hay một event của app.
## CocoaPod chứ còn gì nữa ^^!
```
pod 'Firebase/Core'
pod 'Firebase/Messaging'
```
## Trước tiên bạn cần một account apple để có thể tài APNs lên Firebase. 
> Tức là phải có 99$ đó =)) Mình đã hỏi thì Account free k push được thì phải .

Bạn có thể vào [Hướng dẫn](https://firebase.google.com/docs/cloud-messaging/ios/certs) để có thể xem hướng dẫn cài đặt. 
## Config
1. Vào [Firebase Console của bạn](https://console.firebase.google.com), Chọn biểu tượng bánh răng (setting), Chọn  Project Settings, và sau đó chọn Cloud Messaging tab.

![](https://images.viblo.asia/569550ef-abfc-4fc4-bd2c-facbd7022630.png)


2. Chúng ta kéo xuống ở mục iOS app configuration chúng ta sẽ upload APNS đã download ở bước 2 vào đây.
![](https://images.viblo.asia/f22bdb25-6eff-467d-ab36-bd6258e6fd29.png)

3. kéo xuống vị trí bạn lưu **key**, Chọn nó và click **Open**. Thêm **key ID cho key** (có sẵn bên trong Certificates, Identifiers & Profiles in the Apple Developer Member Center) và click **Upload**

> Xong bước config cần thiết. Nếu vẫn chưa rõ bạn có thể vào [Config Helper](https://firebase.google.com/docs/cloud-messaging/ios/client) docx của firebase đọc thêm

4. Đăng kí nhận thông báo từ xa.
```
if #available(iOS 10.0, *) { // Kiểm tra có phải là ios phiên bản 10.0 hay không
  // For iOS 10 display notification (sent via APNS)
  UNUserNotificationCenter.current().delegate = self

  let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
  UNUserNotificationCenter.current().requestAuthorization(
    options: authOptions,
    completionHandler: {_, _ in })
} else {
  let settings: UIUserNotificationSettings =
  UIUserNotificationSettings(types: [.alert, .badge, .sound], categories: nil)
  application.registerUserNotificationSettings(settings)
}
application.registerForRemoteNotifications()
```
## Lấy FCM (Firebase Cloud message) token
> Mặc định  FCM SDK sẽ tự động tạo ra một token cho client app khi chúng ta start. Tương tự như APNs device token cho phép chúng ta push thông báo đến app đúng mục tiêu.
> FCM hỗ trợ để đăng kí một token trong **messaging:didReceiveRegistrationToken** là callback của **FIRMessaging delegate**. Mỗi khi bạn start app thì token này sẽ được thay đổi. 
> Để sử dụng bạn kế thừa **FIRMessageDelegate ** 

Bên trong **application:didFinishLaunchingWithOptions** các bạn thêm.
```
// application:didFinishLaunchingWithOptions
Messaging.messaging().delegate = self
```

Bên trong **messaging:didReceiveRegistrationToken** các bạn thêm
```
let token = Messaging.messaging().fcmToken
print("FCM token: \(token ?? "")")
```

Giờ mỗi khi bạn startapp thì một token mới sẽ được sinh ra.

Công đoạn tiếp theo là Tạo thông báo lên màn hình thôi

Bên trong **AppDelegate**
```
func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String) {
  print("Firebase registration token: \(fcmToken)")

  // TODO: If necessary send token to application server.
  // Note: This callback is fired at each app startup and whenever a new token is generated.
}
```

## Gắn device token vào FMC token

```
# Appdelegate
func application(application: UIApplication,
                 didRegisterForRemoteNotificationsWithDeviceToken deviceToken: NSData) {
  Messaging.messaging().apnsToken = deviceToken
}
```

## Thực hiện xử lý nhận message
Các bạn có thể thực hiện theo hướng dẫn của Firebase như sau:
[IOS Firebase Receive Messages in an iOS App](https://firebase.google.com/docs/cloud-messaging/ios/receive)

> Vậy là bây giờ bạn có thể lên consolefirebase và thực hiện gửi push về máy của mình r. 

> Hi Vọng bạn có thể thực hiện push trong ứng dụng của mình.
> Thanks

> Dự án thực tế mình tham gia nhưng chưa có cơ hội làm về Firebase nhiều nên còn nhiếu thiếu xót mong các bạn thông cảm nhé :pensive: 
### Tài liệu tham khảo.
> https://firebase.google.com/doc