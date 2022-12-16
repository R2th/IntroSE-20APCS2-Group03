Trong bài viết này mình xin giới thiệu tới mọi người cách setup và push một notification đơn giản cho ứng dụng React Native sử dụng OneSignal.
### Setup Firebase
Để sử dụng dịch vụ của one signal, chúng ta cần 2 thứ:
* *Google server key*
* *Sender id*

Vậy để tạo 2 thứ trên, trước hết cần tạo 1 project trên ***Firebase***
> #### console.firebase.google.com[](http://console.firebase.google.com/)


Khởi tạo project ***Firebase***, click vào icon *Setting* bên cạnh *Project Overview* để di chuyển tới màn hình *Setting*. 


![](https://images.viblo.asia/3b7f401c-c190-4036-88d4-39af9d02090d.jpg)

Chọn vào *Cloud Messaging*, tại đây bạn sẽ thấy 2 thông tin quan trọng đó là **Google server key** và **Sender id**. Kết thúc phần setup ***Firebase*** ở đây.
### Set up One signal
Bước tiếp theo là setup ***One signal***
> #### onesignal.com

Tạo một tài khoản trên ***One signal*** nếu chưa có. Sau khi tạo xong bạn tạo tiếp một application ***One signal***.

Bạn sẽ nhập tên ứng dụng và nền tảng sử dụng ***One signal*** như hình bên dưới
![](https://images.viblo.asia/1ea931ed-bd86-405b-98c4-ad241bf48d26.jpg)


Tiếp theo, chúng ta sẽ cấu hình nền tảng sử dụng, ở đây mình chọn app Android. Điền *Google server key* và *Sender id* vừa tạo được ở trên


![](https://images.viblo.asia/7c52c7bc-9dc4-4eb1-8f18-23fda9a2ab0e.jpg)

Ở màn hình tiếp theo, chọn React Native

![](https://images.viblo.asia/31f23a5b-14c0-48f2-9324-7053c8bf708b.jpg)

Đến đây là xong phần **Set up One signal** rồi. Phần tiếp theo là khởi tạo project *React Native*.
### React Native Setup

Trước khi bắt đầu khởi tạo ứng dụng, hãy chắc chắn rằng máy của bạn đã cài *React Native CLI* và *NPM* hoặc *Yarn*. Bắt đầu bằng lệnh
```
react-native init OnesignalDemo
```
Tiếp theo là cài đặt ***One Signal*** package
```
yarn add react-native-onesignal
```
Mở project trên một Editor bất kỳ, mở *Manifest file* từ đường dẫn ***android/app/src/main/AndroidManifest.xml*** thêm tag sau
```
android:launchMode="singleTop"
```
![](https://images.viblo.asia/809133c7-74d9-4da4-bb8c-623a004537a3.png)

Mở tiếp file ***android/app/build.gradle*** và thêm *One Signal App id* và *Google Sender id* ở đây

![](https://images.viblo.asia/43c98dfc-103b-4f50-bc60-8a6894d4a202.png)

Ở trên cùng của file thêm đoạn code sau
```
buildscript {
    repositories {
        maven { url 'https://plugins.gradle.org/m2/' } // Gradle Plugin Portal 
    }
    dependencies {
        classpath 'gradle.plugin.com.onesignal:onesignal-gradle-plugin:[0.12.6, 0.99.99]'
    }
}

apply plugin: 'com.onesignal.androidsdk.onesignal-gradle-plugin'
```

Tiếp theo là khởi tạo *OneSignal SDK* trong project. Thêm đoạn sau vào *App.js* hoặc *index.js*
```
import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

export default class App extends Component {

constructor(properties) {
  super(properties);
  //Remove this method to stop OneSignal Debugging 
  OneSignal.setLogLevel(6, 0);
  
  // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
  OneSignal.init("YOUR_ONESIGNAL_APP_ID", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
  OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

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

Xong phần cài đặt, và bây giờ chúng ta có thể chạy ứng dụng *React Native* để chuẩn bị nhận 1 push notification. Trước hết cần connect thiết bị Android với máy tính (cần bật chế độ USB debug trên Android). Mở terminal lên và chạy lệnh
```
adb devices
```
Thao tác này sẽ liệt kê các thiết bị hoặc trình giả lập (emulator) được kết nối với máy tính. Khi đã thấy id của thiết bị trên terminal thì hãy run ứng dụng qua lệnh
```
react-native run-android
```
### Push notification
Bây giờ để chắc chắn *One Signal* hoạt động tốt thì hãy vào tab *Audience* trên *onesignal.com*. Nếu bạn thấy số lượng người subcribe là 1 thì bạn đã cài đặt thành công *One Signal rồi đấy* 

Vào tab *Message* và push thử một Notification nhé
![](https://images.viblo.asia/5a4825ff-03b4-462f-b94d-cd252475e0a4.png)

Và đây là Notification nhận được trên thiết bị

![](https://images.viblo.asia/d811f3bb-08e7-44b1-a0c0-094ea4d1842b.jpg)

Các phiên bản mình sử dụng trong project này
* React Native: 0.63.2
* Node: v12.13.0
* react-native-onesignal: 3.9.0
* Android Studio: 4.0.1

Vậy là bài viết này mình đã giới thiệu tới mọi người cách sử dụng push notification trên máy Android một cách đơn giản nhất. Cảm ơn mọi người đã đọc. Hẹn gặp lại vào bài viết sau!