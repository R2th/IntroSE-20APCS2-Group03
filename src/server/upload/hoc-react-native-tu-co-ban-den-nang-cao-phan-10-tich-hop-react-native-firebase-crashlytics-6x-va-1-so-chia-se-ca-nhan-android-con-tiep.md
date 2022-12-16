![](https://images.viblo.asia/a1323286-64c0-4a55-b626-ed2eafe21a3e.jpeg)

# I. Giới thiệu

Xin chào các bạn! 

Hôm nay mình giới thiệu 1 chút về Firebase cho React Native nhé. Đối với bạn nào đã từng code mobile thì không còn lạ lẫm thì với cái tên này nữa và đây là tool không thể thiếu cho 1 app mobile. 

Vào 26/9/2019 React Native Firebase ra mắt phiên bản V6.0.0 (https://invertase.io/blog/react-native-firebase-v6) với rất nhiều chức năng mới. Một trong số đó được giới thiệu đầu tiên và nổi bật hơn cả là React Native Firebase Crashlytics.

### React Native Firebase Crashlytics đã được hỗ trợ JavaScript stack traces
![](https://images.viblo.asia/d6749edc-e7cb-4f31-822a-8e1642cbf0ea.jpeg)

![](https://images.viblo.asia/5fa7e4b7-14e9-4036-b907-86ca6fdfa9d7.png)

https://twitter.com/mikediarmid/status/1103049888001155073

Giải thích lại 1 chút tại sao ***JavaScript stack traces*** lại quan trọng.

Khi bạn code native cho Android và iOS thì có https://firebase.google.com/docs/crashlytics hỗ trợ bắt được dòng code nào bị lỗi và bạn sẽ biết nguyên nhân chính xác để fix bug crash đó.

Nhưng React Native thì không được như vậy khi báo bug crash trên Javascript. Cho nên lúc này nếu có crash nào xảy ra trên production thì rất khó biết chỗ nào để fix dòng code đó. Hiện nay theo như tôi biết chỉ có **Bugsnag** (https://www.bugsnag.com/platforms/react-native-error-reporting) báo được dòng code nào bị crash và nhiều công ty lớn sử nhưng phí dịch vụ lại khá đắt đối với nhà phát triển cá nhân hay công ty nhỏ. 

Ví dụ báo crash trên Bugsnag:

![](https://images.viblo.asia/9a070263-3678-4515-a076-eb09afba5886.png)


Từ đó khi React Native Firebase ra mắt phiên bản V6.0.0 đã cung cấp giải pháp thay thế Bugsnag với giá free và ra mắt chức năng báo lỗi crash đủ để biết fix bug ở đâu. 

Do tài liệu dành cho react-native-firebase không hoàn thiện nên khi tích hợp Firebase vào React Native lại có 1 đống vấn đề xảy ra.

Vậy nên tôi làm bài viết này để hướng dẫn các bạn 1 cách dễ hiểu nhất.

#### Thống nhất môi trường
Để người đọc làm theo hướng dẫn của tôi chạy được thì đầu tiên tôi cần thống nhất môi trường với nhau để tránh lỗi

+ Node: 10.15.0
+ React Native: 0.61.5
+ Android Studio: 3.4.2 (mới hơn cũng được)
+ Xcode: 11.3.1
+ CocoaPods: 1.8.4

#### Github
Tôi có link github dưới đây để các bạn đối chiếu nhé

> https://github.com/oTranThanhNghia/SimpleAppReactNative1/tree/add_react_native_firebase_crashlytics_6.x
# II. Hướng dẫn cho Android
## 1) Các bước cài đặt
### a) Cài đặt trên project React Native
```
// bắt buộc phải có khi dùng react-native-firebase 
$ yarn add @react-native-firebase/app 
-- sau đó
$ yarn add @react-native-firebase/crashlytics

-- thường khi cài crashlytics thì bạn nên cài thêm analytics để thống kê người dùng cài app
$ yarn add @react-native-firebase/analytics
```

Khi chạy xong thì trong **package.json** được như sau:

```json
...
"dependencies": {
    "@react-native-firebase/analytics": "6.3.3",
    "@react-native-firebase/app": "6.3.3",
    "@react-native-firebase/crashlytics": "6.3.3",
...    
```

Mở file chạy đầu tiên của js -> index.js 

![](https://images.viblo.asia/4b77ae05-46e7-4734-b919-eb14b5744690.png)


```javascript
// thêm đoạn code sau để cài đặt vào js
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/crashlytics';
import '@react-native-firebase/analytics';
//////////////////////////////////////////////////////////
import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

```

Tạo file **firebase.json** với cấu hình sau:

```json
{
    "react-native": {
      "crashlytics_ndk_enabled": true,
      "crashlytics_debug_enabled": true,
      "crashlytics_disable_auto_disabler": false,
      "crashlytics_auto_collection_enabled": true
    }
}
```

### b) Cấu hình Firebase Console và Android Studio

![](https://images.viblo.asia/72417f53-c7ef-465c-ab32-74407f1e640e.png)


Các bạn vào link sau để tạo project trên Firebase nhé https://console.firebase.google.com/u/2/

Nếu ai chưa có thì sẽ phải tạo từ đầu

![](https://images.viblo.asia/5ddc4ca8-1b29-40e1-82c4-cb5669a38b85.png)
Chọn Android 

![](https://images.viblo.asia/5e0b15d4-57f7-4112-80b9-8a5351b76f50.png)

Hoàn thành các bước để nhận được file ***google-services.json***

![](https://images.viblo.asia/402cfc5c-4f62-4324-bdf0-8be80b9ead50.png)

Để file ***google-services.json*** vào đây

![](https://images.viblo.asia/e57dab6e-10ca-439d-b60b-e0c9b28bc30c.png)

* Lưu ý: mình để file ***google-services.json*** thế này sẽ ăn cho debug và release nhé 

Mở file ***build.gradle*** 

![](https://images.viblo.asia/35dfb73c-f011-49a1-a405-7af95c3df8c0.png)

thêm đoạn sau
```json 
...
repositories {
        google()
        jcenter()
        //// thêm đoạn này 
        maven {
            url 'https://maven.fabric.io/public'
        }
       ////////////////////////////////////////////////
    }
    dependencies {
        classpath("com.android.tools.build:gradle:3.4.2")
        //// thêm đoạn này
        classpath 'io.fabric.tools:gradle:1.28.1'
        classpath 'com.google.gms:google-services:4.3.3'
        ////////////////////////////////////////////////
    }
       
...    
```

Mở ***android/app/build.gradle***

![](https://images.viblo.asia/a70c04b0-39d4-47ee-903b-9ec6c42e3b8c.png)

```
apply plugin: 'com.android.application' // apply after this line
apply plugin: 'io.fabric'
// .....

.....
.....
.....

apply plugin: 'com.google.gms.google-services' // at the bottom 
```



Thêm đoạn sau nếu bạn muốn bắt crash trong Native Development Kit
```
...
crashlytics {
  enableNdk true
}
...
```

Khi hoàn tất thì bạn phải chắc chắn libraries của Firebase đã được nhận trong Android Studio

![](https://images.viblo.asia/3ac8cbe9-48bf-4553-b497-39476a935b74.png)

Đến bước này bạn đã hoàn tất quá trình cài đặt

## *Lưu ý về react-native-firebase-crashlytics

react-native-firebase-crashlytics chỉ bắt crash khi chạy **release** thôi nhé. Chế độ **debug** sẽ không thấy crash trên firebase console đâu 

Cách đơn giản là bạn chỉ cần vào Build Variants -> release là xong 

![](https://images.viblo.asia/68868b44-9b40-43a2-9b1e-a7b99995dd45.png)

Và theo như tôi điều tra trong code thì họ đã cố tình làm như vậy 

![](https://images.viblo.asia/4a94465a-2576-435e-91dd-7c1feb2f12c6.png)

Lý do vì khi chạy chế độ debug thì dev có thể bắt log hay hiển thị màn hình đỏ thần thánh của React Native và dev nhìn thấy cũng fix crash luôn được rồi :) 

## 2) Demo

### Lần thử số 1: Sử dụng `firebase.crashlytics().crash()`

**Như lưu ý tôi đã nêu ở trên thì các bạn phải build app Android ở chế độ release nhé**

![](https://images.viblo.asia/6440b5d2-5901-4e8e-a26c-6bcd8b86997e.png)

Các bạn bỏ commnet đi để thử khi mở màn hình detail nhé

Okay. bây giờ bạn build chạy app ở chế độ release nhé

và đây là kết quả hiển thị trên firebase console

![](https://images.viblo.asia/56abbd1e-d35e-479e-8658-66a92726b9e7.png)

![](https://images.viblo.asia/e709100f-dd11-448b-bb83-65739a6444b3.png)




### Lần thử số 2: Truy cập biến không tồn tại -> crash trên javascipt

Sửa đoạn code sau 
![](https://images.viblo.asia/e5174389-3897-438a-a9cb-e416b7e863d0.png)

thành 
```javascript
...
            <ProgressBar progress={this.state.percent} width={null} height={1} borderRadius={0} />
            <Text>{this.state.perc.a.b.c}</Text>
....
```

Okay. bây giờ bạn build chạy app ở chế độ release nhé

và đây là kết quả hiển thị trên firebase console

![](https://images.viblo.asia/5ec506b0-dc17-44f0-8024-25df2dd3033f.png)

![](https://images.viblo.asia/d1c039f5-b337-4656-87a0-4ab92105603a.png)


Trông cùi mía đúng không các bạn :D . Nhưng hiện tại mình thấy cái này là tốt nhất trong số những tool free hiện nay rồi và dựa vào thông báo đó dev có thể fix được bug.

Còn nếu bạn làm cho dự án doanh nghiệp lớn thì tốt nhất là nên dùng Bugsnag nhé và thông báo lỗi nó sẽ cụ thể như thế này 
![](https://images.viblo.asia/9a070263-3678-4515-a076-eb09afba5886.png)

# III. Hướng dẫn cho iOS
.... 
(còn tiếp)

# IV. Tài liệu tham khảo 

https://invertase.io/oss/react-native-firebase/v6/crashlytics/quick-start

https://invertase.io/oss/react-native-firebase/v6/crashlytics/android-setup

https://firebase.google.com/docs/crashlytics/get-started?platform=android

https://github.com/invertase/react-native-firebase/tree/master/packages/crashlytics

https://github.com/invertase/react-native-firebase/blob/master/docs/app/quick-start.md

https://github.com/invertase/react-native-firebase/tree/master/docs/crashlytics

https://github.com/invertase/react-native-firebase/blob/master/docs/analytics/quick-start.md


https://invertase.io/blog/react-native-firebase-v6