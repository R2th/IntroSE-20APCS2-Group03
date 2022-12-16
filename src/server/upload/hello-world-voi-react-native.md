Native là một từ quen thuộc đối với giới lập trình viên. Đặc biệt là Mobile. Với những anh em lập trình Javascript, cụ thể là Reactjs, một trường phái không thể bỏ qua đấy là React Native. Tại sao chúng ta không thử một lần viết đôi ba dòng code Native và chạy trên Mobile. Hôm nay mình cũng rảnh nên ngồi thử tập code đôi ba dòng "from scratch" với React Native

![image.png](https://images.viblo.asia/dc19d30e-9832-457b-b74b-07902e1aab62.png)


# 1. Cài đặt môi trường: 
Là dev Web, với Reactjs và chưa thử code ứng dụng Mobile nào hoàn chỉnh. Vì vậy mình chọn cách build chạy ứng dụng theo document của React Native với "expo". **Expo** là một công cụ dễ dàng cài đặt, nhiều tính năng và cho phép chúng ta xây dựng ứng dụng Mobile chỉ trong vài phút.  Ngoài **Expo** chúng ta cần có thêm một máy ảo mobile (mình build app android nên chạy máy android) hoặc sử dụng máy thật. 

- OK với các điều kiện trên chúng ta mới chỉ là điều kiện cần. Với anh em lập trình js thì **npm** và **Nodejs** là một công cụ rất quen thuộc đúng không. Hãy đảm bảo có tất cả những thứ trên vì đấy là điều kiện đủ để xây dựng App. Mình đã đảm bảo và tiếp tục làm bước dưới đây

Tiếp theo chúng ta sẽ sử dụng command:
```bash
npm install -g expo-cli
```

để cài đặt expo-cli giúp dễ dàng thao tác trên terminal.
Khởi tạo một ứng dụng native bằng expo: 
```bash
expo init MyApp
```

# 2. Test trên môi trường máy ảo:
Do mình build ứng dụng Android. Vì vậy mình có cài đặt sẵn Android Studio tại đây: https://developer.android.com/studio. 
Sau khi cài đặt Android Studio chúng ta tạo một máy ảo :
Chọn nút device manager trên thanh công cụ. Và chọn create device 
 ![image.png](https://images.viblo.asia/e861961c-ded0-46c8-9535-d8d9c1ab2642.png)
 ![image.png](https://images.viblo.asia/f5344066-2142-4196-a251-d6f9cf8ea5f2.png)
 
 Ở đây mình đã có sẵn thiết bị là Pixel 2. Nếu b chưa có thì hãy tạo một thiết bị nhé.

Tiếp theo chúng ta chạy lệnh : 
```bash
npm run start
```

![image.png](https://images.viblo.asia/fc24e249-12eb-41ad-b8b3-413e0a300587.png)

Vào đường dẫn http://localhost:19002 như hình để vào dashboard của expo
![image.png](https://images.viblo.asia/194660aa-3ce2-493c-9618-9f419e9b134b.png)

Chọn vào Run on Android device/emulator (bật sẵn máy ảo lên nhé) và ứng dụng sẽ được chạy trên máy ảo: 
![image.png](https://images.viblo.asia/00731855-2bb8-4ed6-b6dd-5c449f231c97.png)
Ở đây mình đã sửa file App.js thành : 
```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
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

Đối với mọi người dùng Reactjs thì React Native rất dễ tiếp cận phải không nào. Tuy nhiên có một số thành phần Component khác biệt so với Reactjs như mọi người thấy ở trên : View, Scroll View ... chứ không dùng div như ở html.

# 3. Lợi thế của React Native

- **Learn once, write anywhere:** Học một lần và có thể viết  ứng dụng  web lẫn mobile (android, ios). Với Web developer Reactjs. Việc chuyển qua học React native khá dễ dàng và nhanh chóng.
- **Hot reload:** Khi sử dụng react native, chúng ta có thế sử dụng tính năng hot reload giúp lập trình viên xem trực tiếp tất cả thay đổi khi lập trình ứng dụng.
- **Native:** Có thể viết một ứng dụng và chạy trên đa nền tảng: android, ios.
- **Save Time, Money:** cũng nhờ lý do trên, trước khi có react native, lập trình viên phải học từng ngôn ngữ riêng để phát triển ứng dụng android hay ios. Giờ đây chúng ta có thể viết và build một ứng dụng có thể chạy trên đa nền tảng, từ đó giúp tiết kiệm thời gian khi muốn phát triển native app. Mà tiết kiệm thời gian cũng chính là tiết kiệm tiền, ngay cả khi bảo trì cũng vậy, chúng ta chỉ cần bảo trì một source code.
# 4. Kết luận: 
Trong bài viết này, từ một Web developer với chút kiến thức với Reactjs. Mình đã thử cài môi trường và chạy Hello World với React Native. Để tiến tới trở thành một lập trình viên React Native, còn rất nhiều kiến thức phải học ở phía trước như thao tác với phần cứng điện thoại, tuơng tác cử chỉ... Dễ khi bắt đầu nhưng muốn trở thành chuyên nghiệp chúng ta cần phải kiên trì. Hy vọng bài viết sẽ giúp ích phần nào cho mọi người để bắt đầu với một ngôn ngữ mới. Cảm ơn mọi người đã theo dõi tới cuối bài viết. :D Nếu có sai sót nào mong mọi người góp ý vào comment để mình cải thiện nhé !!