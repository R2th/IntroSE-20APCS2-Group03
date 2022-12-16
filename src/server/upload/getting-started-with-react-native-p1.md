![](https://images.viblo.asia/566659d4-140f-41cb-8f84-52c411a44fcb.png)
## I. Reat Native là gì? 
Chắc ai cũng biết rồi, mình nhai lại tí :v: 

React Native là framework xây dựng ứng dụng di động native sử dụng Javascript do Facebook phát hành. Sử dụng React Native để xây dựng ứng dụng iOS và AndroidAndroid chỉ cần 1 ngôn ngữ javascript duy nhất

### React Native có ưu điểm gì ?
 Với cá nhân mình, nó là 1 sự lựa chọn tuyệt vời với những web dev muốn chuyển qua mobile dev như mình 1 cách nhanh chóng thông qua JavaScript.
- Người dùng ứng dụng có trải nghiệm mượt mà hơn. 
- Dev phát triển ứng dụng đơn giản, nhanh chóng và hiệu quả.
- React Native đang được rất nhiều ông lớn đang sử dụng để phát triển ứng dụng của họ như Facebook, Instagram, Skype

## II. SETUP ENV

Note: Trong bài hướng dẫn này, mình hướng dẫn setup trên OS Windows & môi trường phát triển  Android

### 1. Install Node,  JDK

Download & install:

* [ Node's Downloads page ](https://nodejs.org/en/download/)

![](https://images.viblo.asia/a5062b38-de51-4cd3-ab71-70fad6ce4863.png)
* [ Java SE Development Kit (JDK) ](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html )
![](https://images.viblo.asia/1d8bbfa0-02bb-4cda-8848-87bfaf469eee.png)

### 2. Install React Native CLI

Mở  terminal or command prompt và run lệnh bên dưới
```
$sudo npm install -g react-native-cli

```

Khởi tạo project
```
$react-native init getting_started
```

### 3. Android development environment

Có nhiều công cụ để phát triển Android nhưng đến nay công cụ chính thức và mạnh mẽ nhất là Android Studio. Đây là IDE (Môi trường phát triển tích hợp) chính thức cho nền tảng Android, được phát triển bởi Google và được sử dụng để tạo phần lớn các ứng dụng mà bạn có thể sử dụng hàng ngày.
![](https://images.viblo.asia/a0806ce9-e981-4865-8163-f99806e500e5.jpg)
#### 3.1 Cài đặt Android Studio

[Download and install Android Studio](https://developer.android.com/studio/index.html)

Lưu ý: khi cài đặt cần chọn "Custom" để cài đặt , để đảm bảo các phần sau đây k bị thiếu sót:

* Android SDK
* Android SDK Platform
* Android Virtual Device

#### 3.2 Cài đặt Android SDK

Android SDK là một máy ảo của Android dùng trên PC, hỗ trợ bạn lập trình các ứng dụng của Android trên PC và cả những chức năng không khác gì một chiếc máy thật.

**Cách cài đặt.**

Mở Android Studio sau khi đã cài đặt xong, sau đó import **getting_started** folder đã khởi tạo ở bước 2
![](https://images.viblo.asia/ba89c9a5-48da-4c15-83cf-d5d80ffd5d58.png)

Chọn **File -> Setting -> Android SDK**, chọn "SDK Platforms" => chọn  "Show Package Details" đảm bảo các mục sau đây sẽ được chọn
![](https://images.viblo.asia/20545485-97df-4c3a-985d-3680a1061803.png)

Tiếp theo chọn tab  "SDK Tools"  => checked "Show Package Details" chọn như hình dưới.

![](https://images.viblo.asia/df44b1dc-6375-4fb8-8406-97a3b81c56f0.png)

Cuối cùng là click  "Apply" để download and cài đặt  Android SDK

### 4. Test

Sau khi đã chuẩn bị xong tất cả các tool, giờ chúng ta sẽ sử dụng nó xem có vấn đề gì k.

Khởi động máy ảo, Tại màn hình  Android Studio chọn AVD Manager bên góc phải trên cùng như hình dưới.
![](https://images.viblo.asia/3d031734-4011-4229-a4ea-a9f4038ca6a5.png)
Khi đó màn hình dưới sẽ xuất hiện, bạn có thể add thêm devices để test
![](https://images.viblo.asia/99ad21da-8cee-4968-8352-bd8f11bef293.png)
Click double và khởi động devices.
![](https://images.viblo.asia/a13713d6-4766-40ac-b1ae-7d4b635d6009.png)

Tiếp theo chúng ta khởi chạy React-native, (lưu ý đừng tắt máy ảo đi nhé)

- Tại màn hình terminal bên dưới chúng ta thực thi lệnh sau:

```js
npm start
```

![](https://images.viblo.asia/2cfe0f82-b657-4ec4-aa3a-f894ec95c234.png)
Mở thêm 1 cửa sổ terminal, thự hiện lệnh sau:

```
react-native run-android
```

![](https://images.viblo.asia/1232dbbe-c66f-447b-83db-5f41c5adbd59.png)

Nếu bạn thấy màn hình hiển thị như  sau, coi như bạn đã thành công, hoàn tất phần cài đặt môi trường :v
![](https://images.viblo.asia/d124aa8d-3fdc-4cb6-ac5d-787f3f6fb114.png)

## III. Sample React Native App

Mở file App.js, chỉnh sửa chút như sau và test thử

```js

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, Sun*!</Text>
      </View>
    );
  }
}

```

Tại màn hình máy ảo, nhấp double R trên bàn phím để reload lại màn hình máy ảo, bạn sẽ thấy sự thay đổi

![](https://images.viblo.asia/55f9f711-0f1f-4c10-9389-fe35439f9c9c.png)

Như vậy mình chúng ta đã bắt đầu cài đặt đc môi trường và làm quen vs react-native, trong bài viết tới chúng ta sẽ tìm hiểu sâu hơn, và từng bước tìm hiểu, để có thể xây dựng được 1 app hoàn chỉnh. Thank you very much !!!