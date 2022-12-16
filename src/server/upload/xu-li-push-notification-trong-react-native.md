Chào các bạn, khi làm việc với những app mobile, nhất là các app mạng xã hội, mua sắm... thì việc xử lí push notification chắc hẳn quen thuộc và cần thiết. Trong bài này, mình xin giới thiệu qua về một thư viện giúp xử lí công việc đó.
# 1. Giới thiệu thư viện [react-native-firebase](https://github.com/invertase/react-native-firebase) 
Đây là một thư viện, theo mình thấy là khá tốt và ổn định cho việc xử lí với firebase và push notification.

Config thư viện với project: 
- Cài đặt: Mình có thể chạy lệnh yarn hoặc npm, ở đây mình dùng npm 
```
npm install --save react-native-firebase
```
- Sau khi chạy xong, mình cần một vài config riêng cho Android và IOS, cũng như việc chuẩn bị config trên https://console.firebase.google.com/u/0/  để tải xuống file config cho cả 2 nền tảng Android và IOS (Đối với android: google-services.json, đối với ios: GoogleService-Info.plist). 

Sau khi config và cài đặt thành công thư viện cho project, chúng ta bắt tay vào tìm hiểu và sử dụng thư viện đó.

Tham khảo link : https://rnfirebase.io/docs/v4.2.x/messaging/receiving-messages
# 2. Yêu cầu quyền và lắng nghe notification
- Gọi tới firebase `import firebase from 'react-native-firebase'`
- Khi bắt đầu muốn cho phép việc gửi, nhận, hiển thị notification, đầu tiên ta phải `requestPermissionAndListen` bằng hàm: 
```
const requestPermissionAndListen = async () => {
  try {
    await firebase.messaging().requestPermission();

    // User has authorised and listen permission
    listenNotifications()

    // return
    return Promise.resolve(true)
  } catch (error) {
  }

  // User has rejected permissions
  return Promise.reject(false)
}
```
- Check xem đã có quyền chưa 
```
const permissionEnabled = async () => {
  try {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions
      return Promise.resolve(true)
    }
  } catch (error) {
  }

  // User has rejected permissions
  return Promise.reject(false)
}
```
- Khi muốn firebase gửi notification về, thì ta cần có được token của máy đó, ta sử dụng hàm `getToken`
```
const currentToken = async () => {
  try {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // user has a device token
      return Promise.resolve(fcmToken)
    }
  } catch (error) { }

  // user doesn't have a device token yet
  return Promise.reject(null)
}
```
# 3. Các vấn đề gặp phải khi hiển thị push notification bên Android và IOS
 Khi làm việc với Android và IOS, mình nhận thấy có sự khác biệt về xử lí hiển thị notification, bởi cần handle việc hiển thị notification ở trong lúc dùng app, ngoài app và cả trường hợp kill app. (background, foreground, kill app)

Bên IOS : 
```
firebase.notifications().onNotification((notification) => {
    try {
 //     showNotification
    } catch (error) { }
  });
```

Bên Android: 
```
firebase.messaging().onMessage((message) => {
    // handle for Android
  //  showNotificationAndroid
    // setBadge()
  });
```
### Sự khác biệt: 


|  Sự khác biệt | Android  | IOS |
| -------- | -------- | -------- |
| Badge  và Notification   |  Chỉ đúng với case background    |  Tự hiển thị tương ứng cho cả 3 case     |



+ Đối với IOS: Dựa và thông tin trả về bên firebase, sẽ hiển thị tương ứng, title, message và badge tương ứng.

**Action**
```
firebase.messaging().onMessage((message) => {
    // Process your message as required
    // handle for Android
   // showNotificationAndroid
    // setBadge()
  });
```
**Hiển thị**
```
firebase.notifications().displayNotification(new_notification).catch(err => console.error(err));
```
+ Đối với bên Android: Không thể tự xử lí được việc hiển thị đúng badge trả về ở cả 3 case ( TH kill app và foreground, ta phải tự handle cho đúng từ việc hiển thị tới badge tương ứng).

**Cách xử lí**
```
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => PushNotificationHandler.bgMessaging)
```
**Handle việc hiển thị notification**
```
const localNotification = new firebase.notifications.Notification()
    .setNotificationId(data.notificationId)
    .setTitle(data.title)
    .setData({ data })
    .setBody(data.body)
    .android.setChannelId(ANDROID_CHANNEL_ID)
    .android.setSmallIcon(SMALL_ICON)
  return firebase.notifications().displayNotification(localNotification);
```
# 4. Xử lí action với notification
```
// when a notification is clicked / tapped / opened
  // App in Foreground and background
  this.notificationOpenedUnlistener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    // Get the action triggered by the notification being opened
    const action = notificationOpen.action;
    // Get information about the notification that was opened
    const notification = notificationOpen.notification;
    firebase.notifications().removeDeliveredNotification(notification._notificationId)
    clickNotification(notification)
  });


  try {
    // App Closed
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;
      firebase.notifications().removeDeliveredNotification(notification._notificationId)
      clickNotification(notification)
    }
  } catch (error) {
  }
```
Trên đây là một vài giới thiệu về xử lí push notification trong react native, tuỳ từng phiên bản lại có một chút sự thay đổi, nên các bạn nên đọc qua thêm ở trang chủ của firebase (Version RN hiện tại mình dùng trong bài là 0.59).