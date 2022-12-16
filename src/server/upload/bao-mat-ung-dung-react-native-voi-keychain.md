Ngày nay, việc bảo mật trên điện thoại được chú ý rất nhiều. Đặc biệt, việc thanh toán trên nền tảng di động ngày càng trở nên phổ biến. Các hãng điện thoại thì lần lượt đưa ra các chế độ bảo mật khác nhau như: Mở khoá bằng vân tay, mống mắt hay nhận diện khuôn mặt ... Đó là sự hỗ trợ của các hãng điện thoại, còn đối với các nhà phát triển ứng dụng thì sao? Thực tế nếu chúng ta đã từng tham code ứng dụng trên native, hẳn chúng ta rất quen thuộc với điều này rồi. Tuy nhiên, với một vài nền tảng cross platform như React native chẳng hạn việc xử lý đó cũng trở nên khá phức tạp. Bây giờ tôi xin phép giới thiệu với các bạn một thư viện mà nếu ai đã code IOS hẳn nghe tên rất quen thuộc. Đó là: Keychain. Cách sử dụng thư viện này khá đơn giản. Chỉ một vài bước hướng dẫn là các bạn có thể áp dụng được vào dự án của mình rồi. Đầu tiên bạn cần cài đặt thư viện với lệnh sau:

```
yarn add react-native-keychain
```

sau đó bạn hãy link đến thư viện vừa được thêm vào:

```
react-native link react-native-keychain
```

sau khi bạn link, bạn có thể kiểm tra trong file *MainApplication.java* và bạn sẽ thấy thư viện đã được tự động thêm vào.

Thông thường trong các ứng dụng, những thứ cần lưu bảo mật như là username hay password sẽ được xử lý lưu lại local để thuận tiện cho việc sử dụng. Dưới đây là đoạn code ví dụ về điều đó với việc áp dụng thư viện này.

```
import * as Keychain from 'react-native-keychain';

async () => {
  const username = 'zuck';
  const password = 'poniesRgr8';

  // Store the credentials
  await Keychain.setGenericPassword(username, password);

  try {
    // Retreive the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log('Credentials successfully loaded for user ' + credentials.username);
    } else {
      console.log('No credentials stored')
    }
  } catch (error) {
    console.log('Keychain couldn\'t be accessed!', error);
  }
  await Keychain.resetGenericPassword()
}
```

Bạn hãy chú ý trong đoạn code trên, chúng ta sẽ thường sử dụng 2 function chính đó là *setGenericPassword* và *getGenericPassword*. 

- setGenericPassword: Đây là function dùng để lưu lại thông tin với việc bảo mật. Nó chỉ lưu được dưới dạng string, vì thế nếu như bạn có 1 object thì hãy vui lòng đưa chúng về dạng  *JSON.stringify* để có thể lưu được với thư viện này.
- getGenericPassword: Function này được dùng để lấy ra thông tin mà bạn đã lưu kiểu bảo mật KeyChain ra. Nó sẽ trả về cho bạn {username, password} 

Ngoài ra bạn còn có thể có thêm các chức năng khác tuỳ theo mục đích mà bạn có thể dùng:

- getSupportedBiometryType: Chức năng này nó kiểm tra xem phần cứng của điện thoại bạn sử dụng có tương thíc với thư viện này hay không. Nó dùng được trên cả 2 hệ điều hành android và ios.
```
Keychain.getSupportedBiometryType().then(biometryType => {
    this.setState({ biometryType });
 });
```

Nó có kiểu trả về là Keychain.BIOMETRY_TYPE với các trạng thái có thể như sau:
```
TOUCH_ID (chỉ iOS)
FACE_ID (chỉ iOS)
FINGERPRINT (chỉ android)
```

- Keychain.ACCESSIBLE enum: Đây là một API cho biết được thông tin, tình trạng khả năng truy cập vào máy, ứng dụng. Ví dụ: WHEN_UNLOCKED, ALWAYS, WHEN_UNLOCKED_THIS_DEVICE_ONLY, ALWAYS_THIS_DEVICE_ONLY, AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY.

Thư viện này còn cung cấp các API hỗ trợ cho bạn lưu và lấy các thông tin từ server với *username* và  *password*: 

```
import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info'

async () => {
  const username = 'adhithi';
  const password = 'poniesRgr8';
  const server = DeviceInfo.getBundleId()

  // Store the credentials
  await  Keychain.setInternetCredentials(server, email, password).then(() => {

  try {
    // Retreive the credentials
    const credentials = await getInternetCredentials(server);
    if (credentials) {
      console.log('Credentials successfully loaded for user ' + credentials.username);
    } else {
      console.log('No credentials stored')
    }
  } catch (error) {
    console.log('Keychain couldn\'t be accessed!', error);
  }
  await Keychain.resetInternetCredentials(server)
}
```

- setInternetCredentials: Nếu bạn muốn lưu tên server cùng thông tin đăng nhập thì thư viện này có thể hỗ trợ điều đó. Nó sẽ lưu bảo mật server/username/password.
- getInternetCredentials: Nó sẽ lấy được thông tin bạn đã lưu ở setInternetCredentials (server/username/password).

Ngoài ra nó còn hỗ trợ bạn việc gỡ bỏ các thông tin đã được lưu ở trên với hàm *resetInternetCredentials*.

*Chú ý trên Android: 
Với những API cũ, nó không hỗ trợ Android keystore, nó vẫn làm việc với thư viện này. Như Facebook nó sử dụng encrypt và decrypt đê thay thế. Từ API 23 trở lên, key được lưu trong Android Keystore nên tính bảo mật sẽ cao hơn.

Cảm ơn các bạn đã theo dõi. Chúng tôi sẽ cố gắng giúp các bạn nhiều hơn trong quá trình làm việc với React Native. Bàn viết được dịch từ [Securing your React Native App using Keychain.](https://medium.com/react-native-training/securing-your-react-native-app-using-keychain-6de10850d203). 

Thankyou!