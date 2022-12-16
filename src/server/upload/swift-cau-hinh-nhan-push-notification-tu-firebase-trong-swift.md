Hôm nay chúng ta sẽ tìm hiểu về quá trình khởi tạo và cấu hình 1 project iOS có thể nhận được push notification từ Firebase.
Sẽ gồm các phần chính sau:
1. Apple Developer Program
1. Khởi tạo project
1. Cấu hình trên Firebase Console website
1. Implement firebase code trong Xcode
1. Chạy Demo

Lý do mình đặt 4 phần trong bài viết thành các mục có thứ tự 1,2,3,4 vì là mình muốn các bạn có thể làm theo thứ tự kia để quá trình làm việc nó được  mạch lạc và trôi chảy. Có tài khoản thì khi tạo project sẽ chọn được Team ngay, sau đó, tạo project sẽ có được Bundle ID của app để đem lên firebase cấu hình cùng với file APNs có được khi Apple ID của mình là Apple Developer Program, cấu hình firebase xong thì tải xuống file GoogleService-Info.plist và add vào dự án và implement vài dòng code để lấy device token nữa là xong. Demo tất nhiên luôn là bước cuối cùng.

### 1. Apple Developer Program
Muốn làm việc với firebase thì trước hết phải có thể bật ON cái Push Notifications ở trong Capabilities tab trong Xcode.

![](https://images.viblo.asia/5b8481c4-cf93-44ed-97d6-e13f25df0fc9.png)
Các bước để có thể bật ON Push Notifications:

Bước 1: Nếu chưa có Apple ID thì vô trang này tạo 1 cái: [Apple Account](https://developer.apple.com/account)

Bước 2: Sau khi có được 1 tài khoản Apple ID và đang là 1 tài khoản free hoặc không thuộc tổ chức nào cả, thì phải "mua", bấm nút màu xanh có tên là **Enroll** để trở thành Apple Developer Program
![](https://images.viblo.asia/9efcaf51-38e0-4d01-8076-1ff074ffb257.png)

Mất 1-2 ngày là quá trình mua hoàn tất, mà nếu có vấn đề phát sinh sẽ lâu hơn. Ví dụ: mượn thẻ Visa của người khác để mua thì sẽ gặp vấn đề là thông tin tài khoản không khớp với thông tin của cái bill, sẽ phải cung cấp thêm thông tin để chứng thực, cụ thể ở nước mình là chụp hình cái chứng minh nhân dân rồi gửi cho Apple, có thể chụp passport hoặc bằng lái xe cũng được. 

Thành công thì giao diện Account của mình sẽ như này:

![](https://images.viblo.asia/ec8b752e-d302-46f7-9ddd-f81adbb2df6e.png)

Bước 3: Sau khi mua thành công là có thể thể turn on cái Push Notifications trong Xcode, mình không đi cụ thể chỗ này nữa. 

Tiếp tục, đến phần thứ 2 mình sẽ tạo mới 1 project iOS dùng ngôn ngữ Swift

### 2. Khởi tạo project
Mở Xcode và chọn tạo mới 1 Single View App.

![](https://images.viblo.asia/a4d53bb7-67dc-443d-92fe-0d8ade03e20e.png)
Mình tạo mới 1 project có tên là **Firebase-Notification-Example**

Sau đó Enable Automatically manage signing, chọn Team. Xcode nó tự liên kết với Apple ID để tạo hết các Provisioning Profile và Sign Certificate.

OK, sau khi có Bundle Identifier thì lấy lên Firebase config. 

### 3. Cấu hình trên Firebase console website

Mở trình duyệt và truy cập vào website: [Firebase Console](https://console.firebase.google.com/) 

Rồi tiến hành tạo 1 iOS project mới với Bundle ID là cái Bundle ID ở dưới Xcode, ở cái ví dụ của mình là **com.tuan.Firebase-Notification-Example**

Khi đã tạo xong project thì vô mục Settings và làm tiếp 2 bước sau.

Một là, tải file GoogleService-Info.plist  về máy và add vào Xcode


Hai là, chọn CLOUD MESSAGING, và upload cái file .p12, quá trình tạo file này thì mình không nói ở đây. Thành công sẽ như này: 
![](https://images.viblo.asia/2da06a14-23a1-4d77-b683-00db5209cc2c.png)

Xong phần cấu hình Firebase, chúng ta quay trở lại Xcode và tiến hành code.

### 4. Implement Firebase code trong Xcode

Đầu tiên, chắc chắn là bạn đã thêm file **GoogleService-Info.plist** này vào trong project.

![](https://images.viblo.asia/bede8fef-2e7b-496a-aaba-162e7ed3f3e2.png)

Trong quá trình tạo project trên Firebase  Console website thì các bạn đã được hướng dẫn tạo Pod, và cấu hình Pod rồi nên mình k đề cập tới việc làm sao để lấy các Framework của Firebase về Xcode nữa.

Bây giờ, mở file *AppDelegate.swift* ra, mình chỉ cần cấu hình ở duy nhất 1 file này là đủ rồi.

Trước tiên là import Firebase và UserNotifications frameworks ở khu header của file, trước chỗ  khai báo class AppDelegate. Đừng quên conform 2 delegates của UserNotification và Messaging
```
import Firebase
import UserNotifications

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate, MessagingDelegate {
```

Tiếp theo tạo 1 hàm *configPushNotification*  để đăng ký nhận push cho ứng dụng của mình, với nội dung như sau:
```
    func configApplePush(_ application: UIApplication) {
        if #available(iOS 10.0, *) {
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
        
        if let token = Messaging.messaging().fcmToken {
            print("FCM token: \(token)")
            AppSession.shared.setFirebaseToken(token)
        }
    }
```

Tiếp theo, trong hàm didFinishLaunchingWithOptions thì gõ vài dòng code như sau:
```
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    
        FirebaseApp.configure() // gọi hàm để cấu hình 1 app Firebase mặc định
        Messaging.messaging().delegate = self //Nhận các message từ FirebaseMessaging
        configApplePush(application) // đăng ký nhận push.
    
    ...
    }
```

Tiếp tục, tìm tới hàm *didRegisterForRemoteNotificationsWithDeviceToken* của *AppDelegate* . Tình huống thông thường, mình sẽ lấy cái tham số deviceToken, convert thành String và gửi cho back-end để nhận push. Nhưng, trường hợp của chúng ta là thông qua Firebase nên phải làm thêm vài công đoạn nữa. 

```
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken
    }
```
FIRMessaging tự động làm cho APNS token được set tự động, bằng cái phương pháp swizzling. Tuy nhiên, nếu bạn disable method này trong file Info.plist, FirebaseAppDelegateProxyEnabled là NO, thì phải set apnsToken thủ công ở trong hàm như trên. Theo quan điểm cá nhân thì bạn gõ lệnh thủ công như ở trên cho khỏi lăn tăn.

Rồi, sau đó bạn sẽ nhận được fcmToken từ FirebaseMessaging delegates. Theo mình, nên lưu fcmToken ở cả 2 method này:
```
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String) {
        //Nhận được fcmToken,lưu lại và gửi lên back-end khi làm app thực tế
    }
    
    func messaging(_ messaging: Messaging, didRefreshRegistrationToken fcmToken: String) {
        //Nhận được fcmToken,lưu lại và gửi lên back-end khi làm app thực tế
    }
```

Đến tận đây, có thể nói là xong rồi. Chạy demo thử thôi.

### 5. Demo

Mở lại Firebase Console website: [Firebase Console](https://console.firebase.google.com/) 

Chọn project, rồi chọn tiếp Cloud Messaging ở mục GROW bên menu bên trái.
Nhấn nút *New Message* màu xanh để tới màn hình soạn message về máy.

![](https://images.viblo.asia/65241488-8760-4aee-aade-d6ba9837049e.png)

Kết quả: 

![](https://images.viblo.asia/6b453c0a-9082-4b5a-8a66-c6394e9c98f7.jpg)

Link project: [Github](https://github.com/LeVanTuan/FirebaseNotificationExample/tree/develop)

Xong, hi vọng có thể giúp ích được một chút gì đó cho các bạn. 

Xin chào và hẹn gặp lại.