# Giới thiệu
Xin chào các bạn, hôm nay mình sẽ làm 1 demo về Push Notification trong React-Native bằng Firebase nhé.

**Nguồn tham khảo**:

https://medium.com/@yangnana11/how-to-set-up-firebase-notification-in-react-native-app-android-only-4920eb875eae

https://rnfirebase.io/docs/v5.x.x/installation/android

Mình chưa config trên iOS nên bản demo này sẽ chỉ chạy trên Android thôi nhé :D

Github demo : https://github.com/oNguyenManhDuc/rn-demo-firebase/tree/push_notification

# Thư viện sử dụng 
"react-native": "0.57.0",

"react-native-firebase": "^5.0.0",
# Firebase Console
Đầu tiên các bạn hãy tạo Project ở Firebase console(https://console.firebase.google.com/). Sau đó vào phần Cloud Messaging nhé.
![](https://images.viblo.asia/1b8b21ea-c6fa-413f-a03c-f7aa4e886a3b.png)

# Config Android
Mở file ***android/build.gradle*** :

```
buildscript {
  // ...
  repositories {
        google()  // <-- Check this line exists and is above jcenter
        jcenter()
        // ...
    }
  dependencies {
    // ...
    classpath 'com.google.gms:google-services:4.0.1'
  }
}
```
Sử dụng build tool 3.2.0:
```
classpath 'com.android.tools.build:gradle:3.2.0'
```

file ***android/app/build.gradle*** :
```
dependencies {
  // This should be here already
  implementation project(':react-native-firebase')

  // Firebase dependencies
  implementation "com.google.android.gms:play-services-base:16.0.1"
  implementation "com.google.firebase:firebase-core:16.0.4"
  ...
  }
```

```
implementation project(':react-native-firebase')
```

File ***android/app/src/.../MainApplication.java*** :
```
...
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
...

@Override
protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
              new RNFirebaseMessagingPackage(),
                new RNFirebaseNotificationsPackage()
      );
}

@Override
public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
}
```

File ***android/app/src/main/AndroidManifest.xml*** :

```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.VIBRATE" />
```

```
<activity
...
android:launchMode="singleTop">
...
</activity>
```

```
<application ....>
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
        <service android:name="io.invertase.firebase.messaging.RNFirebaseBackgroundMessagingService" />
    </application>
```

Đến đây hãy thử build nhé. Nếu may mắn các bạn có thể build được ngay, nếu không hay comment cho mình biết vấn đề của bạn nhé. Mình cũng đã phải build và sửa khá nhiều lần mới có thể chạy được :))

# (Android) Lắng nghe FCM message ở background.
Tham khảo : 
https://rnfirebase.io/docs/v5.x.x/messaging/receiving-messages#4

Tạo 1 file .js VD: **bgMessaging.js**
```
// @flow
import firebase from 'react-native-firebase';
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';

export default async (message: RemoteMessage) => {
    // handle your message

    return Promise.resolve();
}
```

Đăng ký background handler này ở **index.js**:
```
import bgMessaging from './src/bgMessaging'; //Đường dẫn tới file bgMessaging bạn vừa tạo ở trên nhé

 AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); 
```

# Receiving message
```
export default class App extends Component {
    async componentDidMount() {
        const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const action = notificationOpen.action;
            const notification: Notification = notificationOpen.notification;
            var seen = [];
            alert(JSON.stringify(notification.data, function(key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            }));
        } 
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('My apps test channel');
// Create the channel
        firebase.notifications().android.createChannel(channel);
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
            notification
                .android.setChannelId('test-channel')
                .android.setSmallIcon('ic_launcher');
            firebase.notifications()
                .displayNotification(notification);
            
        });
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            var seen = [];
            alert(JSON.stringify(notification.data, function(key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            }));
            firebase.notifications().removeDeliveredNotification(notification.notificationId);
            
        });
    }
    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }
render() {
    return (
    ...
    )
    }
}
```
Remind: Các bạn nhớ để ý phần này nhé
```
const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('My apps test channel');
```
Ở Firebase Console khi Compose notification. 
mục 5. Additional options (optional), nhớ chọn channel là "test-channel" nhé. Hoặc đổi trong code đi :D.

# Kết quả

Vậy là xong rồi. Bây giờ hãy mở phần Firebase Console >> Cloud Messaging ra và test nào. Và đay là kết quả của mình.
Chúc các bạn thành công 

![](https://images.viblo.asia/25833359-2d96-4872-aed5-7d98e2cc345e.png)
![](https://images.viblo.asia/ea57681e-a924-4705-8cce-76a35bb501de.png)