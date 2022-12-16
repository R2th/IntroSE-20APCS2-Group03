![](https://images.viblo.asia/7321932b-aeae-41c1-9978-89d4e9526472.png)

**Expo** là một nền tảng mã nguồn mở giúp việc phát triển các ứng dụng di động đa nền tảng cho cả IOS và Android trở nên dễ dàng hơn nhiều so với trước đây. Expo SDK là một loạt các thư viện gốc cho mỗi nền tảng iOS / Android và nó cho phép JavaScript truy cập các tính năng hệ thống của thiết bị như camera, thông báo đẩy, bộ nhớ cục bộ, danh bạ cũng như các API hệ điều hành và phần cứng khác. Trong bài viết này, ta sẽ thử cài đặt và  xây dựng một ứng dụng cơ bản cùng với Expo và tìm hiểu qua về nó nhé.

## 1. Bắt đầu
Để sử dụng Expo, ta cần cài đặt Node.js phiên bản 12 hoặc mới hơn vì các công cụ của Expo đều dựa trên Node. Bạn có thể kiểm tra phiên bản Node của mình bằng cách chạy lệnh Node -v.
Expo cung cấp một giao diện dòng lệnh được gọi là Expo CLI. Được sử dụng để test và run app trong quá trình phát triển. Để cài đặt Expo CLI, các bạn chạy lệnh sau:
```
npm install -g expo-cli
```

## 2. Cài đặt Mobile Expo Client trên thiết bị Android / IOS
Để test và run app trên các thiết bị Android và IOS, ta cần cài ứng dụng Expo client trên các thiết bị Android và Iphone. Ta có thể tìm thấy ứng dụng này trên Google Play và Apple Store.
1. Google Play (Cho android): https://play.google.com/store/apps/details?id=host.exp.exponent&hl=vi&gl=US
2. Apple Store (Cho ios): https://apps.apple.com/app/apple-store/id982107779

## 3. Xây dựng một ứng dụng Expo
Hãy bắt đầu xây dựng một ứng dụng Expo và xem nó hoạt động ra sao nhé. Để bắt đầu, bạn sử dụng lệnh sau để tạo một App Expo mới:
```
expo init your_app_name
```

Thay thế *yourappname* bằng tên của app mà bạn muốn tạo, sau khi bấm Enter, bạn sẽ được hỏi về lựa chọn cho app template mong muốn. Và để bắt đầu, ở đây mình sẽ chọn "blank" để có một app đơn giản nhất.
![image.png](https://images.viblo.asia/79a6d736-a985-4957-be60-5850ba5cc592.png)

Sau khi khởi tạo app thành công, sử dụng lệnh dưới đây để khởi chạy app nhé:
```
cd your_app_name
npm start
```
hoặc
```
cd your_app_name
yarn start
```

Sau khi thực hiện thành công các lệnh trên, một môi trường development metro sẽ được khởi chạy. Bạn sẽ nhận được một mã QR, sử dụng ứng dụng Expo client đã cài đặt trên Android / IOS để quét, và app sẽ sẵn sàng để chạy trên thiết bị của bạn. Thật kì diệu phải không?
![image.png](https://images.viblo.asia/0fa5f2d1-4f88-4728-8d46-8628f5f9d4bb.png)

## 4. Expo Project
Một Expo project bao gồm một số file quan trọng mà ta sẽ cần phải lưu ý: **App.json** có tất cả các config, chẳng hạn như tên app, SDK version, biểu tượng,.. Các packages của ứng dụng được liệt kê trong package.json. Sau đó là App.js, chạy khi ứng dụng bắt đầu. Ở đó, bạn sẽ thấy phương thức render, phương thức này bao bọc tất cả các component trong một lệnh return.

Bạn có thể sử dụng *styles* ở cuối file App.js để style cho UI của app. Di chuyển cá cstyles ra khỏi phương thức render sẽ nâng cao khả năng đọc mã trong React Native.

Dưới đây là 1 ví dụ cơ bản của App.js:
```
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello I'm Expo!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

## 5. Expo SDK?
Expo đi kèm với một số thư viện tích hợp thường được tìm thấy trong hầu hết các ứng dụng. Tham khảo tài liệu Expo để biết thêm chi tiết về chúng (https://docs.expo.dev/versions/latest/sdk). Tuy nhiên, các thư viện sau sẽ hữu ích trong hầu hết các ứng dụng bạn muốn tạo:
* **AppAuth, AuthSession**: Xác thực người dùng qua OAuth
* **SplashScreen**: Tạo một splash screen khi khởi chạy app
* **localization**: Quản lý i10n/i18n nhằm hỗ trợ đa ngôn ngữ
* **AppLoading**: Load các assets, font và các file tương tự
* **MapView**: Sử dụng bản đồ trong ứng dụng
* **ImagePicker/ImageManipulator**: Mở và chọn lựa các file ảnh hoặc video từ thiết bị
* **Sharing**: Chia sẻ dữ liệu giữa app và thiết bị
* **SecureStore**: Lưu trữ dữ liệu trên device storage
* **Camera**: Sử dụng camera của thiết bị

Một số tính năng bổ sung mà Expo hỗ trợ:
* **Notifications**: Gửi thông báo đẩy từ Expo Push Service
* **Admob**: Google’s SDK cho AdMob
* **FacebookAds**: Facebook SDK
* **Branch**: Tích hợp sử dụng branch.io
* **Amplitude**: Theo dõi các logs event và data của app

Ngoài ra, bạn có thể truy cập thêm:
* **Audio**: Chạy hoặc ghi lại các file âm thanh
* **AV**: Chạy audio/video
* **ART**: Vẽ bằng cách sử dụng SVG
* **Brightness**:  Quản lý độ sáng thiết bị
* **BackgroundFetch**: Chạy ngầm các task
* **Payments**: Thanh toán qua Google Pay hoặc Apple Pay

Expo hỗ trợ cho chúng ta khá nhiều api hữu ích trong quá trình phát triển một ứng dụng, để có thể tìm hiểu sâu hơn về các API mà mình cần, các bạn có thể tham khảo ở Link này nhé: https://docs.expo.dev/versions/latest/sdk

## 6. Build ứng dụng và upload lên store
Để build một ứng dụng Expo, bạn chạy lệnh sau:
```
expo build:[ios|android]
```
Lệnh này sẽ bắt đầu cài đặt một package trên cloud của expo thay vì local, điều này sẽ giúp bạn khỏi lăn tăn về sức mạnh phần cứng của laptop hay pc mà bạn sử dụng. Chỉ cần đợi quá trình build và app của bạn đã được build thành công.
Sau khi app của bạn được đưa vào queue, bạn có thể thoát khỏi terminal. Để xem được trạng thái của bản build, click vào url dưới dòng "You can monitor the build at" nhé!

![image.png](https://images.viblo.asia/e788c977-42b6-4d81-8d06-fea35a61272e.png)

![image.png](https://images.viblo.asia/058d8d3b-8838-48a2-80f3-ac783389191c.png)

Sau khi app build thành công, bạn sẽ có thể download app. Và sau đó nếu bạn muốn upload bản dựng đó của app lên store? hãy chạy lệnh sau:
```
expo upload:[ios|android]
```

## 7. Một số nhược điểm của Expo
Mặc dù có rất nhiều tính năng ấn tượng, nhưng bạn cũng nên biết một số hạn chế của Expo:
1. Expo không hỗ trợ task chạy ngầm khi người dùng tắt ứng dụng
2. Expo app bị giới hạn trong các API gốc được Expo SDK hỗ trợ
3. Expo ràng buộc bạn với bộ công cụ của họ. Điều này có nghĩa là bạn sẽ không thể sử dụng bất kỳ công cụ nào khác để phát triển React Native một khi đã chọn Expo.
4. Bạn sẽ phải chờ đợi quá trình build app Expo được queue trên server của họ

Mặc dù có những hạn chế ở trên, nhưng Expo vẫn rất hữu ích cho chúng ta khi muốn bắt đầu phát triển một mobile app sử dụng React-native. Vì thế nếu bạn muốn, hãy cứ chọn Expo mà đừng ngần ngại nhé!

## 8. Tổng kết
React Native là một trong những lựa chọn hàng đầu hiện nay để phát triển các ứng dụng di động. Expo với SDK và các công cụ dành cho nhà phát triển sẽ giúp đơn giản hoá quá trình phát triển một ứng dụng mobile. Vì vậy, nếu bạn là React Native developer, bạn nên thử tìm hiểu về Expo và những ưu điểm / hạn chế của nó.

Qua bài viết này, mình đã thử tạo và xuất bản một ứng dụng cơ bản với Expo. Nói chung, Expo SDK là một gói các thư viện tuyệt vời sẽ giúp bạn phát triển hầu hết mọi tính năng bạn muốn trong một ứng dụng di động. Mong các bạn cảm thấy bài viết hữu ích, cảm ơn vì đã đọc.

Nguồn: https://blog.logrocket.com/getting-started-with-react-native-and-expo-sdk/