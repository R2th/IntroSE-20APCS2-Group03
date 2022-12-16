Chào mọi người, chắc hẳn khi phát triển các ứng dụng mobile thì Firebase là một nền tảng rất quen thuộc với chúng ta. Tuy nhiên, đối với các ứng dụng native thì việc cấu hình có vẻ sẽ quen thuộc hơn. Vừa rồi mình có cơ hội làm việc trong dự án React Native và đưa FCM vào trong dự án đó. Sau đây mình sẽ chia sẻ các bước để cấu hình FCM vào một project RN.
## Cài đặt React Native Firebase 
Các bạn có thể sử dụng yarn hoặc npm.
Ở đây mình sẽ sử dụng npm.
Trên terminal, chạy câu lệnh
```
npm install --save react-native-firebase
```
Sau khi chạy xong, thì firebase đã được thêm vào trong file package.json của dự án React Native.
Tiếp theo điều bạn cần làm là vào console của Firebase và tạo cho mình một Firebase project.
Sau đó cần tạo và tải xuống file config cho cả 2 nền tảng Android và IOS
Đối với android: google-services.json
Đối với ios: GoogleService-Info.plist
Trong 2 file này sẽ chứa đầy đủ các thông tin để app có thể kết nối đến Firebase project mà chúng ta vừa tạo ở trên.
## Cấu hình FCM trong dự án RN
### IOS
Chúng ta sẽ sử dụng cocoapod để thêm thư viện Firebase vào native code.
Mở pod file sau đó thêm 2 dòng sau vào trong đó:
```
pod 'Firebase/Core', '4.9.0'
pod 'Firebase/Messaging', '4.9.0'
```
Sau đó, mở terminal và chạy pod install để import thư viện.
Sau khi chạy trong pod install, chúng ta mở project lên thông qua file .xcworkspace
Mở file AppDelegate.m
Import thư viện
```
#import <Firebase.h>
```
Sau đó trong function didFinishLaunchingWithOptions chúng ta sẽ thêm init config  của firebase 
```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
....
}
```
Ngoài ra, để sử dụng FCM trên IOS thì chúng ta còn cần phải có Certificate đã được enable [APNS](https://developer.apple.com/notifications/)
Sau khi tạo xong certificate của ios, thì chúng ta cần update file .p12 lên firebase để có thể sử dụng được FCM. Đây là một yêu cầu bắt buộc đối với IOS.
### Android
Đối với android, mở thư mục **android/app/build.gradle**
Thêm dòng sau vào trong dependency:
```
dependencies {
  // ...
  implementation "com.google.firebase:firebase-messaging:17.3.4"
  implementation 'me.leolin:ShortcutBadger:1.1.21@aar' // <-- Add this line if you wish to use badge on Android
}
```
Tiếp theo cài đặt RNFirebaseMessagingPackage.
Mở **android/app/src/main/java/com/[app name]/MainApplication.java**
Thêm RNFirebaseMessagingPackage vào trong file đó:
```
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; 
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
```
```
 @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFirebasePackage(),
           new RNFirebaseMessagingPackage(), //add this
           new RNFirebaseNotificationsPackage(), //add this
      );
    }
```

Thêm messaging service vào trong file android manifest:
Mở file **android/app/src/main/AndroidManifest.xml**
Thêm đoạn sau vào trong thẻ application:
```
<application ...>

<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/ic_stat_name" />
        <receiver android:name="io.invertase.firebase.notifications.RNFirebaseNotificationReceiver" />
        <receiver
            android:name="io.invertase.firebase.notifications.RNFirebaseNotificationsRebootReceiver"

            android:enabled="true"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <action android:name="android.intent.action.QUICKBOOT_POWERON" />
                <action android:name="com.htc.intent.action.QUICKBOOT_POWERON" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </receiver>
        
            <service android:name="io.invertase.firebase.messaging.RNFirebaseMessagingService">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
        <service android:name="io.invertase.firebase.messaging.RNFirebaseInstanceIdService">
            <intent-filter>
                <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
            </intent-filter>
        </service>

</application>
```
* Để có thể nhận được thông báo khi ứng dung đang dưới background thì hãy thêm dòng này vào trong thẻ application
```
<application ...>
  <service android:name="io.invertase.firebase.messaging.RNFirebaseBackgroundMessagingService" />
</application>
```
## Xử lý nhận và click notification trong RN app
Đầu tiên, chúng ta cần phải import thư viện 
### Đăng ký device với Firebase
```
const fcmToken = await firebase.messaging().getToken();
if (fcmToken) {
    // user has a device token
} else {
    // user doesn't have a device token yet
}
```
Đoạn code này sẽ lấy về token hiện tại trên device, nếu như k có fcm token thì sẽ thực hiện tạo 1 token mới, đăng ký nó với firebase và trả về token cho user.
Ngoài ra, chúng ta còn 1 function khác để nhận được token khi token được thay đổi:
```
firebase.messaging().onTokenRefresh(fcmToken => {
        // Process your token as required
    });
```
### Kiểm tra và yêu cầu cấp quyền nhận notification
1) Kiểm tra xem device đã cấp permission cho việc nhận notification hay chưa
```
firebase.messaging().hasPermission()
  .then(enabled => {
    if (enabled) {
      // user has permissions
    } else {
      // user doesn't have permission
    } 
  });
```
2) Yêu cầu cấp quyền
```
firebase.messaging().requestPermission()
  .then(() => {
    // User has authorised  
  })
  .catch(error => {
    // User has rejected permissions  
  });
```
### Lắng nghe notification 
```
firebase.messaging().onMessage((message: RemoteMessage) => {
        // sẽ được gọi khi ứng dụng nhận được notification khi ở trạng thái foreground.
    });
```

### Mở notification
Mở notification trong khi app đang ở trạng thái background hoặc foreground
```
firebase.notifications().onNotificationOpened((notificationOpen) => {
    // Get the action triggered by the notification being opened
    const action = notificationOpen.action;
    // Get information about the notification that was opened
    ///
  });
```
Mở notification khi app closed
firebase.notifications().getInitialNotification((notificationOpen) => {
    // Get the action triggered by the notification being opened
    const action = notificationOpen.action;
    // Get information about the notification that was opened
    ///
  });

## Kết
Cảm ơn mọi người đã đọc bài viết này. 
Nếu như những gì ở trên khó hiểu thì bạn có thể đọc tại đây
https://rnfirebase.io/docs/v5.x.x/messaging/receiving-messages