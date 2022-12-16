Thông thường, để nhận được thông báo đẩy, thiết bị của bạn cần được đăng ký với dịch vụ Thông báo đẩy của Apple (APN) bằng cách nhận một mã thông báo thiết bị duy nhất. Sau khi thiết bị được đăng ký, bạn có thể gửi thông báo đẩy đến thiết bị bằng cách gửi yêu cầu tới APN bằng mã thông báo của thiết bị. Tất cả giao tiếp này cần phải được thực hiện từ một số loại máy chủ web.
Bạn có thể triển khai dịch vụ web của riêng mình để giao tiếp với APN, nhưng có các tùy chọn dễ dàng hơn. Một trong số đó là Nhắn tin qua đám mây Firebase (FCM). Với Nhắn tin qua đám mây Firebase (FCM), bạn có một hệ thống dễ sử dụng trong tầm tay, FCM xử lý các công việc của thông báo đẩy, cho phép bạn gửi và nhận thông báo đẩy mà không cần phải viết dịch vụ web của riêng bạn.
Hôm nay tôi sẽ hướng dẫn bạn thực hiện.

# Bắt đầu
Trước tiên bạn cần tải sample project tại [đây](https://koenig-media.raywenderlich.com/uploads/2021/03/Firebase_Materials.zip)
Project mà bạn vừa tải, GoodNew là một app tin tức, nhưng chúng ta sẽ chỉ đang tin tức tốt thôi 
Đầu tiên bạn cần mở Signing & Capabilities tab, và nhập Bundle ID cho app của bạn.

# Config Firebase

Tiếp theo bạn cần config, add Firebase vào dự án của chúng ta
Firebase yêu cầu bạn tải chứng chỉ p8 lên ứng dụng của mình. Đây là một tệp đặc biệt chứa khóa riêng tư cho phép Firebase gửi thông báo. Để nhận chứng chỉ p8, hãy đăng nhập vào Apple Developer. Chọn Certificate, Identifiers & Profiles và đi tới Key. Chọn nút + để tạo khóa mới.

![](https://images.viblo.asia/bc41a6e7-6c44-4d65-9c6c-e114b366cb25.png)

Đặt tên cho nó và kích hoạt dịch vụ Apple Push Notifications service (APN). Chọn Tiếp tục và trên màn hình tiếp theo, hãy chọn Đăng ký.

![](https://images.viblo.asia/6d06b0d1-a245-49a8-8792-c97b850395b3.png)

Sau đó hãy tải file p8 mà bạn vừa tạo về 

### Setting cho Firebase

Tiếp theo, chuyển đến tài khoản Firebase của bạn và chọn Đi tới bảng điều khiển ở góc trên bên phải của trang. Chọn Thêm dự án và làm như sau để tạo dự án của bạn: Sử dụng tên Good News. Bật Google Analytics. Chọn tên và quốc gia cho Google Analytics. Sử dụng cài đặt phân tích mặc định.

Sau đó, bạn sẽ cần định cấu hình Firebase với Apple p8 và thông tin thành viên của mình. Trong dự án Firebase của bạn, hãy chọn bánh răng bên cạnh Tổng quan về dự án và chọn Cài đặt dự án:
![](https://images.viblo.asia/8f33b246-ab1a-414e-8178-695518540fd3.png)
![](https://images.viblo.asia/9ad0a236-2f93-4a5f-adba-cf77f704a8d4.png)

Từ đó, hãy chuyển đến trang cấu hình ứng dụng: Thêm số nhận dạng gói cho dự án của bạn. 
Bạn có thể để trống App nickname và ID Apple store. Sau khi đăng ký ứng dụng của bạn, hãy tải xuống GoogleServices-Info.plist. Bạn sẽ cần cái này để định cấu hình Firebase trong ứng dụng của mình sau này. Bạn có thể chọn Tiếp theo cho các bước còn lại. Bạn sẽ không sử dụng CocoaPods và hiện tại bạn có thể bỏ qua các bước để thêm mã khởi tạo vào ứng dụng của mình.  Tiếp theo, tải lên chứng chỉ p8 của bạn bằng cách đi tới Cloud Message trong cài đặt dự án Firebase của bạn. Trong Khóa xác thực APN, hãy chọn Tải lên.

![](https://images.viblo.asia/997414d1-ea09-48c5-b669-062ebd4d0eda.png)

### Thêm  package Firebase 
Bây giờ, bạn sẽ sử dụng  Swift Package Manager để thêm Firebase vào dự án của mình. Trong Xcode, chọn File ▸ Swift Packages ▸ Add Package Dependency…. Trong cửa sổ bật lên Chọn Package, hãy nhập https://github.com/firebase/firebase-ios-sdk.git. Chọn Tiếp theo, giữ các tùy chọn mặc định, cho đến khi bạn đến màn hình có danh sách các gói. Điều này có thể mất một chút thời gian trong khi Xcode tải xuống dữ liệu cần thiết. Chọn các gói sau từ danh sách: FirebaseAnalytics FirebaseMessaging Nếu bạn không muốn thu thập thông tin về cách người dùng của bạn đang sử dụng thông báo đẩy, vui lòng bỏ chọn FirebaseAnalytics. Sau khi thêm các gói này, có thể mất vài phút để thêm và xây dựng các phần phụ thuộc.

Tiếp theo kéo file GoogleService-Info.plist vào project của bạn

### Config App
Bắt đầu bằng cách mở Info.plist và thêm mục sau: Key: FirebaseAppDelegateProxyEnabled Loại: Boolean Giá trị: KHÔNG (Xcode sẽ hiển thị giá trị này là 0)

![](https://images.viblo.asia/b5dec76c-1ae3-4531-9643-7e62af326b69.png)

Theo mặc định, FirebaseMessaging sử dụng phương pháp xoay vòng để xử lý thông báo đẩy. Bạn sẽ tự xử lý tất cả mã, vì vậy hãy tắt điều này bằng cách sử dụng mục nhập plist bạn vừa thêm. Tiếp theo, bạn sẽ thêm một đại diện ứng dụng vào dự án của mình, người này sẽ chịu trách nhiệm thiết lập thông báo đẩy. Tạo một tệp mới có tên AppDelegate.swift và thay thế mã của nó bằng mã sau:

```
import UIKit
import Firebase
import FirebaseMessaging
import FirebaseAnalytics

class AppDelegate: NSObject, UIApplicationDelegate {
  func application(
    _ application: UIApplication, 
    didFinishLaunchingWithOptions 
      launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    return true
  }
}
```

Tiếp theo, thêm một thuộc tính mới vào AppMain bên trong AppMain.swift:

```
@UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
```

### Khởi động Firebase

Mở lại `AppDelegate.swift` và thêm phần sau vào function `application(_: didFinishLaunchingWithOptions :)`, ngay trước khi `return`:

```
// 1
FirebaseApp.configure()
// 2
FirebaseConfiguration.shared.setLoggerLevel(.min)
```

Sau đó thêm đoạn code sau

```
extension AppDelegate: UNUserNotificationCenterDelegate {
  func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    willPresent notification: UNNotification,
    withCompletionHandler completionHandler:
    @escaping (UNNotificationPresentationOptions) -> Void
  ) {
    completionHandler([[.banner, .sound]])
  }

  func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    didReceive response: UNNotificationResponse,
    withCompletionHandler completionHandler: @escaping () -> Void
  ) {
    completionHandler()
  }
}
```

# Đăng ký nhận thông báo

Với Firebase được định cấu hình, bạn có thể bắt đầu đăng ký để nhận thông báo. Thêm phương thức bên dưới vào extension UNUserNotificationCenterDelegate:

```
func application(
  _ application: UIApplication,
  didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
) {
  Messaging.messaging().apnsToken = deviceToken
}
```

Sau đó thêm vào application(_:didFinishLaunchingWithOptions:), trước return:

```
// 1
UNUserNotificationCenter.current().delegate = self
// 2
let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
UNUserNotificationCenter.current().requestAuthorization(
  options: authOptions) { _, _ in }
// 3
application.registerForRemoteNotifications()
```

Cuối cùng thêm đoạn code sau ở dưới cùng: 
```
extension AppDelegate: MessagingDelegate {
  func messaging(
    _ messaging: Messaging,
    didReceiveRegistrationToken fcmToken: String?
  ) {
    let tokenDict = ["token": fcmToken ?? ""]
    NotificationCenter.default.post(
      name: Notification.Name("FCMToken"),
      object: nil,
      userInfo: tokenDict)
  }
}
```

Và set delegate của FCM là App Delegate của app:

```
Messaging.messaging().delegate = self
```

# Test thử send message

Bây giờ, hãy chuyển đến dự án Firebase của bạn và chọn Nhắn tin qua đám mây được tìm thấy trong Tương tác. Sau đó chọn Gửi tin nhắn đầu tiên của bạn.

![](https://images.viblo.asia/917218c1-c804-4bd5-938b-10c9a918d878.png)

Trong Bước 1, nhập thông tin sau: 
* Notification title: Notification Test
* Notification text: This is a test 
Tiếp theo, chọn ứng dụng của bạn từ menu thả xuống ở Bước 2:

![](https://images.viblo.asia/7dcffcd0-0d4e-4bac-b434-cd405b383406.png)


Điều này sẽ target ứng dụng cụ thể của bạn khi sử dụng bảng điều khiển Cloud Message. Cuối cùng, chọn Xem lại và sau đó Xuất bản. Trên thiết bị của mình, bạn sẽ thấy thông báo sau:

![](https://images.viblo.asia/00ba0937-ede2-43ac-833b-09b60a094d26.png)