Hi~! Nhân lúc làm app với React Native và Firebase nên trong bài viết này mình sẽ hướng dẫn các bạn cách đẩy thông báo (push notification) sử dụng FCM (Firebase Cloud Messaging) đồng thời cũng giải đáp một số thắc mắc mà mình mắc phải (và mình nghĩ đa số ai cũng sẽ gặp) khi code, nào bắt đầu thôi!

*Note: Đây là 1 bài khá dài do không chỉ đơn thuần show code nên các bạn có hứng thú cao độ thì cứ đọc hết nhé ;)
### Push notification là gì?
Push Notification là một dạng tin nhắn đơn giản xuất hiện cùng với thông báo của hệ thống hoặc giống như tin nhắn bật lên -tuỳ thuộc vào nền tảng.
Định nghĩa khá đơn giản và bạn chắc cũng đã gặp rất nhiều khi sử dụng smartphone, dưới đây là hình ảnh về nó:
![](https://images.viblo.asia/5115fc87-848e-4fd8-8ce6-17ae967558ce.gif)

Nguồn: internet

Tiếp theo chúng ta cùng tìm hiểu 1 chút về lịch sử ra đời của nó.
#### Lịch sử phát triển
- 6/2019: Apple ra mắt Apple Push Notification Service (APNs), dịch vụ push notification đầu tiên.
- 5/2010: Google phát hành dịch vụ riêng: Google Cloud to Device Messaging (C2DM).
- 5/2013: Google giới thiệu ‘rich notification’. Rich notification có thể chứa ảnh, các nút hành động – giúp người dùng thực hiện hành động ngay lập tức từ notification: phát nhạc, mở ứng dụng,…
9/2014: Apple thêm các nút tương tác. Các nút này cho phép người dung gửi phản hồi ngay lập tức cho nhà xuất bản ứng dụng, ngay sau đó ra mắt push notification trên Apple Watch.

Và phần quan trọng nhất: nó dùng để làm gì?
#### Lợi ích
Push Notification cung cấp sự tiện lợi và nhiều giá trị cho người dùng. Ví dụ người dùng có thể nhận được:
- Kết quả bóng đá và tin tức ngay trên màn hình khóa.
- Các thông báo từ ứng dụng khác (thông báo tin nhắn đến, bài viết mới,...).

Còn về phía nhà xuất bản ứng dụng:
- Cách để nói chuyện trực tiếp với người dùng.
- Không bị cho vào spam như mail, tăng tỉ lệ tương tác.
- Nhắc nhở người dùng sử dụng ứng dụng cho dù ứng dụng có được mở hoặc không.
- Quảng cáo, thông báo cho người dùng.

![benefit of notification](https://miro.medium.com/max/4358/1*YMFLIMOUrItEIyT4ttLmgA.png)

Nguồn: internet

Đến đây chắc các bạn cũng nắm được push notification là gì rồi đúng không? Vậy tiếp theo chúng ta sẽ dùng FCM để push notification trên Android và iOS, còn vì sao lại dùng FCM? Đương nhiên bạn có nhiều lựa chọn khác như OneSignal nhưng hiện tại mình đang làm app theo phong cách rất 'firebase' nên mình chơi luôn của nó :) Cho bạn này chưa biết về Firebase thì tiếp theo là vài phút quảng cáo...
### Firebase là gì?
Firebase là một dịch vụ hệ thống backend được Google cung cấp sẵn cho ứng dụng Mobile của bạn, với Firebase bạn có thể rút ngắn thời gian phát triển, triển khai và thời gian mở rộng quy mô của ứng dụng mobile mình đang phát triển. Hỗ trợ cả 2 nền tảng Android và IOS, Firebase mạnh mẽ, đa năng, bảo mật và là dịch vụ cần thiết đầu tiên để xây dưng ứng dụng với hàng triệu người sử dụng. Link trang chủ: [Firebase](firebase.com "link đến firebase")

Hiện tại dịch vụ mà Firebase cung cấp rất nhiều nên bạn có thể tha hồ vọc vạch, với Firebase việc bạn cần làm chỉ là tập trung code cho tốt phía client thôi.
![introduction about firebase](https://miro.medium.com/max/3200/1*IF0MJ5hKKrwCWo5ug_LY2w.png)

Nguồn: internet

Với bài viết này chúng ta sẽ cùng vọc Cloud Messaging - nằm trong nhóm Grow, nó là...
### Firebase Cloud Messaging
![Firebase Cloud Messaging](https://i.ytimg.com/vi/sioEY4tWmLI/maxresdefault.jpg)

Nguồn: internet

Tóm gọn trong 3 dòng súc tích:
- Firebase Cloud Messaging(FCM) là phiên bản mới của Google Cloud Messaging(GCM). 
- Đây là một giải pháp nhắn tin đám mây đa nền tảng. 
- Bạn có thể sử dụng Firebase Cloud Messaging cho bất kỳ loại thiết bị người dùng cuối nào bao gồm iOS, Android hoặc thậm chí Web mà không mất phí.

#### Tính năng chính
FCM cung cấp cho chúng ta 3 tính năng chính như sau:
- Gửi tin nhắn thông báo (notification messages) hoặc tin nhắn dữ liệu (data messages).
- Mục tiêu gửi tin nhắn đa dạng: 1 thiết bị cụ thể, 1 nhóm các thiết bị hoặc thiết bị đăng kí theo chủ đề.
- Gửi tin nhắn từ app đến server.

Tổng quan về cách thức hoạt động:
![overview FCM](https://firebase.google.com/docs/cloud-messaging/images/messaging-overview.png)

Nguồn: internet

Cụ thể hơn, chúng ta có 3 cách làm sau:
- Cách 1: dùng app server của bạn
![app server](https://docs.microsoft.com/en-us/xamarin/android/data-cloud/google-messaging/firebase-cloud-messaging-images/04-topic-messaging.png)

Nguồn: internet

- Cách 2: kết hợp Firebse Function
![firebase function](https://miro.medium.com/max/3840/1*xSNuVx9djzjjqMJRu-BK9Q.png)

Nguồn: internet

- Cách 3: dùng Notification Composer
![](https://images.viblo.asia/739a3cc0-0bfe-417c-bc82-d13c07302970.PNG)

Trong bài này mình sẽ thực hiện cách thứ 3, cách 1 và 2 có hơi đặc thù hơn nên sẽ được tách ra thành các bài viết khác để dễ theo dõi.

Phew~! Phần lý thuyết đã xong, Giờ hãy bật Editor lên và code thôi!
### Coding
Tổng quan 1 chút: mình sẽ dùng React Native bản 0.6 để code app và FCM bản 20.0 để push notification.

#### Chuẩn bị
- React native app: xem cách tạo app tại [ĐÂY](https://facebook.github.io/react-native/docs/getting-started)
- Cài đặt dependencies:
	- react-native-firebase: xem cách thiết lập tại [ĐÂY](https://rnfirebase.io/docs/v5.x.x/getting-started)

- Tạo và config trên Firebase: xem tại ĐÂY(Updating..)

#### Tiến hành
##### Bước 1: Cài đặt Firebase Module
Trong ``android/app/build.gradle`` thêm:
```javascript
dependencies {
  // ...
  implementation "com.google.firebase:firebase-messaging:20.0.0"
}
```
Trong ``android/app/src/main/java/com/[app name]/MainApplication.java`` thêm:
```javascript
// ...
import com.facebook.react.ReactApplication; //<- Dòng này
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;//<- Dòng này
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;//<- Dòng này

public class MainApplication extends Application implements ReactApplication {
    // ...

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new RNFirebaseMessagingPackage());//<- Dòng này
      packages.add(new RNFirebaseNotificationsPackage());//<- Dòng này
      return packages;
    }
  };
  // ...
}
```
Trong ``android/app/src/main/AndroidManifest.xml`` thêm:
```javascript
<manifest ...>
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
  <uses-permission android:name="android.permission.VIBRATE" />
  
//...

<application ...>

  <service android:name="io.invertase.firebase.messaging.RNFirebaseMessagingService">
    <intent-filter>
      <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
  </service>
  
  <service android:name="io.invertase.firebase.messaging.RNFirebaseBackgroundMessagingService" />
  
  <activity
  ...
  android:launchMode="singleTop"
>

</application>
```
Xong, các bạn build app xem có bị lỗi gì không, không lỗi thì tiếp tục nào (có lỗi thì tra google hoặc comment bên dưới ngay nhé). À đến đây là các bạn có thể test sơ sơ được rồi :). Để test các bạn làm như sau:

**STEP 1** Mở app và sau đó để ở chế độ Background.

**STEP 2** Truy cập [console.firebase.google.com](https://console.firebase.google.com "Firebase Console"), vào 'Cloud Messaging' và ấn vào nút ``Send your first message``
    
Bạn sẽ được chuyển đến Notification Composer - bộ công cụ soạn Notification của Firebase, ở đây các bạn có thể tạo nhanh 1 notification gồm: Tiêu đề (title), nội dung (text), hình ảnh (image),... Bạn có thể nhìn phần review notification của mình ở bên phải.
![](https://images.viblo.asia/739a3cc0-0bfe-417c-bc82-d13c07302970.PNG)
    
Để push được ngay lúc này, bạn đến phần ``Target`` và chọn đến app của mình
![](https://images.viblo.asia/1831110d-7212-4ff3-ac7b-ede853935d2c.PNG)

Những phần khác bạn có thể tìm hiểu tại [ĐÂY](https://firebase.google.com/docs/cloud-messaging/concept-options), còn bây giờ ấn ``Review`` để thấy được tổng quan phần config mà bạn vừa làm
![](https://images.viblo.asia/42d14537-0d97-46ef-80e8-72bc7e09d960.PNG)

Ấn ``Publish``, nếu có thông báo success nhìn đến phần notification sẽ được như thế này
![](https://images.viblo.asia/9615bc47-561a-4064-adda-21d2d40a7a68.jpg)

Giống Youtube, Zalo,... các kiểu rồi đó :) Cuối cùng chúng ta sẽ code thêm vài dòng để bắt các sự kiện khi notification được đẩy đến và xử lý nó.
##### Bước 2: Bắt sự kiện
Mở file ``App.js`` là sửa thành:
```javascript
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import type { Notification } from 'react-native-firebase';

export default class App extends Component {

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  };

  async componentWillUnmount() {

  }

  //Custom Functions

  //For basic config before listenning Noti

  //Step 1: check permission for Service
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    }
    else {
      this.requestPermission();
    }
  }
  //Step 2: if not has permission -> process request
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('quyền bị từ chối');
    }
  }
  //Step 3: if has permission -> process get Token
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log('token = ', fcmToken);
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //For Listenning Notification
  async createNotificationListeners() {

    //Tạo channel
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');
      console.log('my chanel id = ', channel);
    firebase.notifications().android.createChannel(channel);

    //Vietnamese explain: khi đang ở foreground => show alert khi có noti
    this.notificationListener = firebase.notifications().onNotification((noti) => {
      const { title, body } = noti;
      Alert.alert(title, body);
    });
  }

  // End Custom Functions

  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
              </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
```
Việc copy đoạn trên thì đơn giản rồi nên tiếp theo mình sẽ giải thích từng bước config để bắt được sự kiện khi notification được push đến (phần này dành cho những bạn muốn hiểu nhiều hơn là việc copy code, nếu bạn đã hiểu rồi thì xuống phần dưới nhé ;)). Nào, xoắn não thôi!

Dòng config các bạn hình dung như sau:

1. Setup vài thứ (trong hàm ``checkPermission``)
- Kiểm tra quyền: chúng ta sẽ phải yêu cầu quyền thông báo ứng dụng trong Alert Dialog.
```javascript
async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    }
    else {
      this.requestPermission();
    }
  }
```
- Nếu quyền được cấp, chúng ta sẽ lấy FCM Token về (như ID của mỗi thiết bị) và lưu vào ``AsyncStorage``. 
```javascript
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log('token = ', fcmToken);
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }
```
Để thấy được công dụng của Token, hãy log (dùng console.log) key của thiết bị bạn ra, sau đó vào Notificaion Composer, điền đầy đủ title và text thì nút **Send test message** sẽ được bật, bạn ấn vào
![](https://images.viblo.asia/bfea757f-d9fe-4694-b727-2aadd63371ba.PNG)

Điền key vào _Add an FCM registration token_ sau đó ấn nút **Test**, Boom! Notification bạn vừa push chỉ xuất hiện trên thiết bị có key bạn vừa điền. Là vậy đó!

- Nếu không được cấp quyền thì mình đi xin quyền :)
```javascript
async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('quyền bị từ chối');
    }
  }
```

2. Hàm bắt sự kiện (hàm ``createNotificationListeners``)
- Tạo channel (kể từ bản Android 8.0 trở lên - API 26 bạn phải dùng channel thì notification mới xuất hiện)
```javascript
const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');
      console.log('my chanel id = ', channel);
    firebase.notifications().android.createChannel(channel);
```
- Hàm bắt sự kiện chính của chúng ta đây: ``firebase.notifications().onNotification``, hàm này bắt sự kiện khi có notification được push đến (và app đang ở trạng thái Foreground) cụ thể ở đây mình cho show alert nội dung notificaion được push đến. Bạn có thể xem tại [ĐÂY](https://rnfirebase.io/docs/v5.x.x/notifications/receiving-notifications) để biết được các hàm bắt sự kiện khác.
```javascript
this.notificationListener = firebase.notifications().onNotification((noti) => {
      const { title, body } = noti;
      Alert.alert(title, body);
    });
```

Done~! Vậy là chúng ta đã vọc sơ qua FCM và biết cách sử dụng rồi, phát triển nó theo bất kì cách nào bạn thích và xã hội cho phép vì nó free mà ;)

#### Vấn đề với Head-up Notification
Mình sử dụng cả Android 6.0 và 5.1 thì đều bị lỗi không hiển thị được notification đến theo dạng popup. Mình có tham khảo qua doc của android [https://developer.android.com/guide/topics/ui/notifiers/notifications#Heads-up](https://developer.android.com/guide/topics/ui/notifiers/notifications#Heads-up) và cũng thử nhiều solution trên Stack Overflow nhưng cũng vô vọng, nếu bạn giải quyết được thì share cách cho mọi người nhé ;)

Nguồn tham khảo: 
[https://rnfirebase.io/docs/v5.x.x/](https://rnfirebase.io/docs/v5.x.x/)
Blog: [http://tuitucode.me](http://tuitucode.me)