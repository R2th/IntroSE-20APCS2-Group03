# 1. Giới thiệu

Một trong những tính năng quan trọng mà mọi lập trình viên cần phát triển ứng dụng là flow Signup và Login. Trong flow này, người ta thường sử dụng số điện thoại là 1 trong những cách xác thực tài khoản dễ dàng và an toàn để đăng ký tài khoản mới hoặc là sử dụng khi mà người dùng quên mật khẩu. Chắc hẳn bạn cũng đã từng thấy hình ảnh này ở đâu đó phải không:

![](https://images.viblo.asia/2ba13ca7-7c8a-4375-af2c-3b730bf6ae1d.png)
Facebook Account Kit cung cấp cho người dùng cách để đăng ký hoặc đăng nhập sử dụng số điện thoại hoặc email.

> Account Kit lets people quickly register for and login to your app by using just their phone number or email address — no password needed. It's reliable, easy to use and gives you a choice about how you sign up for apps.

Ngoài ra, nếu muốn tìm hiểu thêm tài liệu về bộ công cụ hữu ích này, bạn có thể truy cập [Facebook Account Kit](https://developers.facebook.com/docs/accountkit/) để đọc thêm docs nhé.

Do mới tìm hiểu về React Native nên sẵn dịp này mình sẽ chia sẻ cách mà mình đã sử dụng Facebook AccountKit để xác thực số điện thoại người dùng. 

# 2. Phone Number Verification Flow

1. Khi người dùng nhập vào số điện thoại, hệ thống sẽ gọi đến Account Kit API với số điện thoại vừa nhập
2. Account Kit server hỗ trợ mã xác thực SMS và WhatsApp (xác thực với WhatsApp có sẵn với Android SDK và iOS SDK 5.0 trở lên). Từ đó, Account Kit sẽ gửi tin nhắn với mã xác thực đến số điện thoại. Nếu người dùng không nhận được mã xác thực, Account Kit cho chúng ta các lựa chọn thay thế:

* Phone call: Người dùng nhận cuộc gọi với mã code 

* Facebook notification: nếu số điện thoại được liên kết với tài khoản Facebook, người dùng có thể lấy mã code có trong notification của ứng dụng Facebook
        
3. Sau khi người dùng nhập mã xác thực, SDK sẽ xác thực mã đó và trả về kết quả.

Ok, bắt tay vào làm thử xem nào!

# 3. Tạo và config Facebook Account Kit

Bước đầu tiên là tạo 1 ứng dụng trên Facebook

Truy cập https://developers.facebook.com/apps/ và click vào **Add a New App** :

![](https://images.viblo.asia/9946e2f7-1efa-48c6-84f5-ec9c57ad4779.png)

Điền tên ứng dụng và contact email rồi nhấn nút **Create App ID**:
![](https://images.viblo.asia/e9a8f0d3-a14f-4d0c-9af5-0a57ab02a402.png)

Sau đó là bước **Security Check** bạn không phải người máy, bước này thì các bạn phải tự làm rồi **Submit** thôi (yaoming) 
:joy:
![](https://images.viblo.asia/2adead69-b590-4e0a-adf9-f7af6eda9a61.png)

Sau đó sẽ điều hướng đến trang quản lý ứng dụng của bạn, bạn click vào button **+** ngay cạnh **PRODUCTS** rồi chọn Account Kit để Set up.

![](https://images.viblo.asia/a71e3419-6418-4dd6-bf39-60b7c0bc6609.png)

Để ý một chút sẽ thấy Product **Account Kit** như hình dưới, bạn chỉ cần click vào **Set up** thôi:

![](https://images.viblo.asia/9d4a40ed-4468-42df-902d-8045cfa985be.png)

Tiếp theo bạn click vào **Settings** -> **Basic** 

Kéo xuống dưới cùng click button **+ Add Platform** rồi chọn **iOS**

![](https://images.viblo.asia/7df451d7-9ffb-49b0-a828-4a89edde96e7.png)

Cấu hình **iOS bundle** cho ứng dụng (*ID này sẽ được dùng để upload ứng dụng lên App Store)* 
![](https://images.viblo.asia/54046376-64a8-43a9-9b64-d741470a31f9.png)

Làm tương tự với Platform **Android** nhé:
![](https://images.viblo.asia/84dcbc8a-5cec-4c80-8a1a-9bf49d855d38.png)

Trong dropdown Account Kit, chọn **Settings** rồi bật **Require Server Validation** lên và click vào **Get Started** nhé. 
![](https://images.viblo.asia/24d17491-0120-43af-9fe7-270ce7fc3449.png)

Sau đó bạn sẽ nhận được **Account Kit App Secret** & **Account Kit Client Token** được dùng ngay sau đây thôi:
![](https://images.viblo.asia/985e9b12-828b-4499-9480-995b025c6a88.png)
# 4. Tích hợp thư viện Facebook Account Kit
Đến đây bạn cần tạo 1 project để chạy demo.
Tại thư mục gốc của project, sử dụng command line rồi thêm thư viện sau:

```
yarn add react-native-facebook-account-kit
react-native link react-native-facebook-account-kit
```

Các bạn có thể truy cập https://github.com/underscopeio/react-native-facebook-account-kit để xem cách cài đặt thư viện này nhé. Trong phạm vi bài viết mình sẽ hướng dẫn cụ thể trường hợp thiết bị Android, còn thiết bị iOS thì các bạn có thể làm theo hướng dẫn nhé.


- file "**android/app/src/main/res/values/strings.xml**"

```java
<string name="fb_app_id">YOUR_FACEBOOK_APP_ID</string>
<string name="ak_client_token">YOUR_CLIENT_TOKEN</string>
```

Đến đây bạn cần thay 2 trường **Account Kit App Secret** & **Account Kit Client Token** bạn nhận được ở phần trên vào nhé.
- file "**android/app/src/main/AndroidManifest.xml**"

```java
<application>
    ...
    <meta-data
        android:name="com.facebook.sdk.ApplicationId"
        android:value="@string/fb_app_id" />
    <meta-data
        android:name="com.facebook.accountkit.ApplicationName"
        android:value="@string/app_name" />
    <meta-data
        android:name="com.facebook.accountkit.ClientToken"
        android:value="@string/ak_client_token" />
    ...
</application>
```
- Nếu muốn AccountKit tự điền mã xác thực trên thiết bị có số điện thoại cần nhận mã xác thực thì cần cung cấp thêm các permission vào file "**android/app/src/main/AndroidManifest.xml**":
```java
<uses-permission android:name="android.permission.READ_SMS" />
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```

- Cấu hình application ID trong file "**android/app/build.gradle**" như sau:

```java
defaultConfig {
    applicationId "com.khanhpt.example.accountkit"
    ...
}
```

# 5. Cấu hình xong rồi, Let's code!

Để đơn giản nhất có thể, mình sẽ tạo ra 1 **button** render trong file **App.js**, và khi click vào button đó thì sẽ chuyển sang giao diện xác thực số điện thoại. 

```js
import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import RNAccountKit from 'react-native-facebook-account-kit'

export default class App extends Component {
  componentDidMount() {
    RNAccountKit.configure({
      responseType: 'code',
      initialPhoneCountryPrefix: '+84',
      defaultCountry: 'VN',
    })
  }

  handleLoginButtonPress = async () => {
    try {
      const payload = await RNAccountKit.loginWithPhone()

      if (!payload) {
        console.warn('Login cancelled', payload)
      } else {
        console.warn('Logged with phone. Payload:', payload)
      }
    } catch (err) {
      console.warn('Error', err.message)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login" onPress={this.handleLoginButtonPress} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
```

Bây giờ chỉ cần chạy **react-native run-android** là ok rồi. 

Đoạn code trên mình có config mã số điện thoại và mã nước của VietNam, ngoài ra các bạn có thể xem thêm các config của AccountKit tại [đây](https://github.com/underscopeio/react-native-facebook-account-kit/blob/master/README.MD#usage)

Done, cũng không quá phức tạp đúng không. 

Hẹn gặp bạn tại các bài viết tiếp theo của mình, nếu thấy bài viết hữu ích, đừng tiếc gì 1 Like cho mình để có thêm động lực viết tiếp nhé (thanks).

:point_right:Bài viết đến đây là hết rồi, nếu cảm thấy bài viết hữu ích :ok_hand:, có thể đăng nhập và like cho mình nhé :+1:. Nhớ folow để xem các các bài viết sắp tới của mình nhé. Thanks! :handshake:
# 6. Nguồn tham khảo

https://developers.facebook.com/docs/accountkit/

https://github.com/underscopeio/react-native-facebook-account-kit