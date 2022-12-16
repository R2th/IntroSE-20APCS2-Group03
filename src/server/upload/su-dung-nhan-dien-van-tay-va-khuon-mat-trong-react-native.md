Hiện nay, việc tích hợp nhận diện vân tay và nhận diện khuôn mặt trong các ứng dụng mobile cho các chứng năng login, thanh toán... được sử dụng khá phổ biến, vừa mang tính bảo mật, vừa tiết kiệm thao tác cho người dùng.

Hôm nay mình xin chia sẻ về cách sử dụng nó trong ứng dụng React native với ví dụ Login đơn giản: 
- Login vào app với account có { username: 'Huediemdue', password: 'Huediemdue@123Viblo' }
-  Cài đặt login faceid/touchid trên máy.
-  Login touch/faceid cho những lần sau.

# 1. Thực hiện nhận dạng vân tay/khuôn mặt

## 1.1 Thư viện sử dụng để nhận dạng
- Thư viện mình giới thiệu ở đây là : [react-native-touch-id](https://github.com/naoufal/react-native-touch-id)
- Trong số các thư viện mình đã tìm, mình thấy thư viện này có vẻ khá ổn định và được quan tâm khá nhiều mặc dù đã khá lâu không maintain.
- Thư viện hỗ trợ cho cả Android và IOS. Tuy nhiên, nếu bạn nào muốn tìm hiểu về face recognition trên Android thì theo mình check hiện tại thì không support.
> React Native Touch ID is a React Native library for authenticating users with biometric authentication methods like Face ID and Touch ID on both iOS and Android (experimental).
> 
> ⚠️ Note: This library is not currently actively maintained. If you're looking for something more stable that "just works", the awesome folks over at Expo have begun open-sourcing some of their modules for compatability with React Native projects not built with Expo. As such you can attempt to use their equivalent library called LocalAuthentication at expo-local-authentication if you run into any issues here!

Trong đường link tới LocalAuthentication có viết rõ: 
> Use FaceID and TouchID (iOS) or the Fingerprint API (Android) to authenticate the user with a face or fingerprint scan.
## 1.2 Cách cài đặt thư viện
Bạn run: 
```
npm i --save react-native-touch-id
```
hoặc
```
yarn add react-native-touch-id
```

In the AndroidManifest.xml add:

`<uses-permission android:name="android.permission.USE_FINGERPRINT"/>`

In the Info.plist add:
```
<key>NSFaceIDUsageDescription</key>
<string>Enabling Face ID allows you quick and secure access to your account.</string>
```


Về việc link thư viện hay sử dụng thư viện, bạn có thể xem thêm hướng dẫn ở [trang của lib ](https://github.com/naoufal/react-native-touch-id#install)
## 1.3 Cách sử dụng
```
import TouchID from 'react-native-touch-id'
```
## 1.3.1 Hàm isSupported()
- Hàm giúp check device có support sử dụng faceid/touchid hay không.
- Return 1 promise rejects  nếu error.
- Ở IOS, nếu có support loại sinh trắc học nào thì response trả về FaceID hoặc TouchID.
- Ở Android thì trả về true/false.

```
const optionalConfigObject = {
  unifiedErrors: false // use unified error messages (default false)
  passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
}

TouchID.isSupported(optionalConfigObject)
  .then(biometryType => {
    // Success code IOS
    if (biometryType === 'FaceID') {
        console.log('FaceID is supported.');
    } else if {
        console.log('TouchID is supported.');
    } else if (biometryType === true) {
      // Touch ID is supported on Android
    }
  })
  .catch(error => {
    // Failure code
    console.log(error);
  });
```

## 1.3.2 Hàm authenticate(reason, config)
- Đây là hàm giúp xác thưc vân tay/khuôn mặt, return Promise.
```
TouchID.authenticate('to demo this react-native component', optionalConfigObject)
  .then(success => {
    AlertIOS.alert('Authenticated Successfully');
  })
  .catch(error => {
    AlertIOS.alert('Authentication Failed');
  });
```


**Một số error name trả về cần chú ý**: 
> + LAErrorTouchIDNotEnrolled: chưa đăng kí sinh trắc học đã được support trên device.
> + RCTTouchIDNotSupported: device không support.
> + ....
> 

## 1.3.3. Nhận diện khuôn mặt trên Android
Đã có ai đã từng thắc mắc tại sao không thấy support nhận diện khuôn mặt trên Android nhỉ? Mình cũng thế đấy :D.

Theo mình tìm hiểu thì nhận diện khuôn mặt trên Android là 2D còn IOS thì 3D rồi. Vậy tức là mình lấymột ảnh cũng nhận diện được (?). Vì tính bảo mật chưa cao này, mà với các tính năng như thanh toán, chuyển tiền... không khuyến khích được dùng, và theo mình được biết thì các app android vẫn ưu tiên support vân tay hơn :D.

Mình có lọ mọ  vào đây đọc ở native android, có hướng dẫn support face, mọi người có thể tham khảo nhé ạ:

https://developer.android.com/reference/androidx/biometric/package-summary?hl=en
https://developer.android.com/training/sign-in/biometric-auth

Và mọi người có tìm và biết về sử dụng face recognition trên Android thì comment dưới để cùng chia sẻ và bàn luận với mình nhé ạ :D . Rất mong có ý kiến để hoàn thiện phần khuyết thiếu này ạ.
# 2. Lưu thông tin login
## 2.1. Giới thiệu [react-native-keychain](https://github.com/oblador/react-native-keychain/blob/master/README.md)
Về thông tin giới thiệu, bạn có thể xem ở trang chủ.
## 2.2. Sử dụng thư viện lưu thông tin
Thư viện cung cấp 1 API để lưu trữ và truy xuất thông tin trên máy chủ cùng tên người dùng và mật khẩu.
```
import * as Keychain from 'react-native-keychain';

async () => {
  const username = 'Huediemdue';
  const password = 'Huediemdue@123Viblo';

  // Store the credentials
  await Keychain.setGenericPassword(username, password);

  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log('Credentials successfully loaded for user ' + credentials.username);
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log('Keychain couldn\'t be accessed!', error);
  }
  await Keychain.resetGenericPassword();  // reset information save
}
```
Vậy là mình có đủ lib và thông tin để giải quyết bài toán đầu bài rồi :D .

# 3. Kết luận
Trên đây là những hiểu biết của mình khi tìm hiểu và làm việc về nhận diện khuôn mặt/ vân tay và ứng dụng trong dự án. Cũng có nhiều lib khác cũng như cách sử dụng khác khi giải quyết bài toán trên, mong nhận được nhiều ý kiến đóng góp từ mọi người. 

Xin cảm ơn ạ!