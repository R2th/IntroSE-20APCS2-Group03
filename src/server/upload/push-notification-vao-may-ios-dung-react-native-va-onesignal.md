Bài trước mình có giới thiệu về cách push notification vào máy android sử dụng react native và onesignal ([onesignal android](https://viblo.asia/p/push-notification-vao-may-android-dung-react-native-va-onesignal-3Q75w2QGlWb)).  Trong bài này mình sẽ nói tiếp về cách sử dụng onesignal đối mới máy ios. Dưới đây là các bước cần thiết để push notification vào máy ios.
### 1. Tạo Certificate Request 
* Mở máy Mac OS của bạn và tìm từ `Keychain Access`
* Chọn  `Keychain Access` > `Certificate Assistant` >  `Request a Certificate From a Certificate Authority...`

![](https://images.viblo.asia/b66b95c0-83c9-48e3-8963-6a08c9057664.png)
* Nhập các thông tin , chọn `saved to disk` xong bấm `continue` vào lưu vào máy

![](https://images.viblo.asia/50cc6bd1-88bc-4b6c-ba57-f7006cceef2a.png)
### 2. Enable Push Notifications và apply Certification Request để generate Certificate
* Login vào [apple developer](https://idmsa.apple.com/IDMSWebAuth/login?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2Fios%2Fidentifier%2Fbundle&rv=1) và tạo mới App IDs nếu chưa có.

![](https://images.viblo.asia/ed21a9e7-0503-4623-9725-135c22ba6928.png)
* Tạo IOS certificate và chọn `Apple Push Notification service SSL (Sandbox & Production)` rồi chọn continue

![](https://images.viblo.asia/3077ba14-d937-4d6a-b8cb-c0e1e2028a63.png)
* Chọn App ID vừa tạo ở trên xong click continue 

![](https://images.viblo.asia/913fd9b2-8042-4d0c-b9ab-04c47d7c49f4.png)
* "Choose File..." chọn file certSigningRequest bạn đã tạo và lưu trong máy của bạn ở bước 1

![](https://images.viblo.asia/0235683f-8cd6-40b7-bee5-5a08cf3bd6cd.png)
* Download Apple certificate vào trong máy của bạn 

![](https://images.viblo.asia/037a7faf-b574-426d-8525-fa10c4b504e9.png)
### 3. Creating  Private Key
* Double click trên file vừa download ở bước 2
* Chọn `Login` => certificate của bạn => `Export`

![](https://images.viblo.asia/bd200775-f69e-4bce-9155-47f01b96831b.png)
### 4. Upload Push Certificate to OneSignal
* Vào onesignal và chọn App của bạn => "App Settings" => edit "Apple IOS"

![](https://images.viblo.asia/e8f95343-d156-42e5-8ae0-f0b5c886d4be.jpg)
*  chọn .p12 file và chọn save

![](https://images.viblo.asia/1ffc3679-2a8e-4140-b72e-b1faeaf9a087.jpg)
### 5. iOS Installation
* Enable "Push Notifications", "Background Modes", "Remote notifications"

![](https://images.viblo.asia/17eaab8f-444f-4e20-8885-c8ccd3fbd390.png)
* Build Settings => search "Header Search Paths" => thêm `$(SRCROOT)/../node_modules/react-native-onesignal/ios` và set recursive
* Thêm code vào  AppDelegate.h 
```
#import <RCTOneSignal.h>
//...
@property (strong, nonatomic) RCTOneSignal* oneSignal;
```
* Thêm code vào AppDelegate.m
```
@synthesize oneSignal = _oneSignal;
#...
self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions
                                                               appId:@"YOUR_ONESIGNAL_APP_ID"];
```
### 6. Cách sử dụng
Trong `index.js`
```
import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal'; 

export default class App extends Component {

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onIds(device) {
		console.log('Device info: ', device);
    }
}
```

**Tài liệu tham khảo:**

https://medium.com/differential/react-native-push-notifications-with-onesignal-9db6a7d75e1e
https://documentation.onesignal.com/v5.0/docs/react-native-sdk-setup