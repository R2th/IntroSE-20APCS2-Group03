Hôm nay mình sẽ hướng dẫn bạn tạo push notification từ việc tạp appID ,tạo certificate tới việc nhận push  bằng cách send Firebase console.
Các bước để tích hợp firebase push notification : 

Tạo APNs certificate  trên  Apple’s Developer

Enable push  trên Firebase Cloud Messaging Console

Thêm Pod firebase

Viết code  push notification 

Send push từ Firebase Notification trong dashboard.

## I.  Tạo file APNs certificate .
**Note: Step ngắn gọn để tạo APNs certificate. Ban đầu bạn tạo App ID sẽ chứa bundle ID và tick chọn  Push Notifications. Sau khi hoàn thành bước tạo App ID bạn vào mục App ID  cuộn xuống phần Push Notifications bạn tạo certificate push.**

Bây giờ mình sẽ hướng dẫn bạn chi tiết cách tạo nhé ^_^:

Các bước tạo app id:
1. Login account develop apple, sau đó chọn mục **Certificates, Identifiers & Profiles**
![](https://images.viblo.asia/88ac2bc0-633d-4ebe-9984-f01b8ac5ad2e.png)

2. Chọn mục Identifiers  và Click (+) để thực hiện đăng ký app ID :
![](https://images.viblo.asia/b786701d-ec00-460b-bbc8-de80f7ebff38.png)
3. Tick chọn App IDs và  ấn nút Continue
![](https://images.viblo.asia/6c00e8e1-9adc-4122-bb31-8b122aaf3e27.png)
4. Nhập bundle ID và  kéo xuống phần  Push Notification  để tick chọn và ấn nút Register
![](https://images.viblo.asia/8215f0d5-e723-43dd-8048-8b3e31fb5a38.png)

![](https://images.viblo.asia/94dce664-6134-46ae-bd0e-f84d61b9be0c.png)

Bạn có thể xem bài viết : https://customersupport.doubledutch.me/hc/en-us/articles/229495568-iOS-How-to-Create-a-Push-Notification-Certificate  tạo file certificate cho push notification:




## 2. Enable Push Notification  Trong Firebase Cloud Messaging Console

Trên Firebase Console bạn  sẽ đăng ký bundle id ở Xcode:
![](https://images.viblo.asia/8d34712b-ad00-4b08-bfb5-fa5a382efc0c.png)

- Trong màn hình quản lý Firebase bạn chọn Project Settings ->  chọn tab Cloud Messaging :
- Trong mục : APNs Certificates bạn update file .P12 lên:

Kết quả : 
![](https://images.viblo.asia/43178fba-c441-49e1-a039-baa78cb3685f.png)

## 3. Viết code để tạo push notification.
```
import Firebase
import UIKit
import UserNotifications
import FirebaseFirestore

class PushNotificationManager: NSObject, MessagingDelegate, UNUserNotificationCenterDelegate {
    let userID: String
    init(userID: String) {
        self.userID = userID
        super.init()
    }
    func registerForPushNotifications() {
        if #available(iOS 10.0, *) {
            // For iOS 10 display notification (sent via APNS)
            UNUserNotificationCenter.current().delegate = self
            let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
            UNUserNotificationCenter.current().requestAuthorization(
                options: authOptions,
                completionHandler: {_, _ in })
            // For iOS 10 data message (sent via FCM)
            Messaging.messaging().delegate = self
        } else {
            let settings: UIUserNotificationSettings =
                UIUserNotificationSettings(types: [.alert, .badge, .sound], categories: nil)
            UIApplication.shared.registerUserNotificationSettings(settings)
        }
        UIApplication.shared.registerForRemoteNotifications()
        updateFirestorePushTokenIfNeeded()
    }
    func updateFirestorePushTokenIfNeeded() {
        if let token = Messaging.messaging().fcmToken {
            let usersRef = Firestore.firestore().collection("users_table").document(userID)
            usersRef.setData(["fcmToken": token], merge: true)
        }
    }
    func messaging(_ messaging: Messaging, didReceive remoteMessage: MessagingRemoteMessage) {
        print(remoteMessage.appData)
    }
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String) {
        updateFirestorePushTokenIfNeeded()
    }
    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
        print(response)
    }
}

```
Trong file AppDelegate.swift:
```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        let pushManager = PushNotificationManager(userID: "currently_logged_in_user_id")
        pushManager.registerForPushNotifications()
        FirebaseApp.configure()
        return true
    }

```

## 4. Send push notification từ Firebase Notifications dashboard
Trong Firebase Console. Ở menu bên trái chọn **Grow -> Cloud Messaging. -> New Notification**:
![](https://images.viblo.asia/2b0f55f0-837e-4d2f-ad29-3699680ce951.png)
Sau khi setting push bạn sẽ nhận được push :

![](https://images.viblo.asia/655c45d9-a183-4809-a96e-01d47a0ee9ad.PNG)

## Tài liệu tham khảo : 
https://www.iosapptemplates.com/blog/ios-development/push-notifications-firebase-swift-5