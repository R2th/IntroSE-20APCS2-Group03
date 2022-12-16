> Trước sự thay đổi liên tục của React Native, công nghệ Face ID mới nhất đã có thể triển khai một cách cực kỳ dễ dàng. Bài viết này mình sẽ chia sẻ với các bạn cách để tích hợp và sử dụng Touch ID Và Face ID trên ứng dụng React Native bằng cách sử dụng thư viện nổi tiếng react-native-touch-id.
> 

![](https://images.viblo.asia/18ad9aea-c42d-4838-8ff5-a6a3785821c9.png)

Việc sử dụng Touch ID được biết đến như là xác thực bằng vân tay hiện nay khá phổ biến trên các thiết bị di động cầm tay. Tính năng Touch ID bảo mật ứng dụng và tạo ra một luồng xác thực liền mạch một cách nhanh chóng và tiện dụng cho người dùng.

<br/>

Rất nhiều ứng dụng Ngân hàng như VietcomBank, Ngân hàng lo lắng (Woori bank :D), Techcombank,... sử dụng xác thực bằng Touch ID nhằm thuận tiện cho người dùng và nâng cao tính năng bảo mật.

<br/>

Bằng cách cho phép người dùng đăng nhập bằng vân tay, người dùng sẽ không cần phải nhập mật khẩu dài ngoằng mỗi lần đăng nhập nữa.

<br/>

Với iPhone X trở lên, chúng ta lại có thêm xác thực bằng Face ID. Cả hai cách xác thực bằng Face ID và Touch ID làm tăng rất nhiều trải nghiệm tốt cho người dùng khi sử dụng các ứng dụng di dộng hiện nay, và hơn thế nữa là khả năng bảo mật rất cao.

# I. Cài đặt
Việc cài đặt thư viện **react-native-touch-id** khá là dễ dàng. 

<br/>

Nếu sử dụng **yarn** bạn hãy sử dụng câu lệnh sau:

`yarn add react-native-touch-id`

<br/>

Nếu sử dung **npm** bạn hãy sử dụng câu lệnh sau:

`npm i --save react-native-touch-id`

<br/>

Đừng quên link thư viện bằng câu lệnh sau:

`react-native link react-native-touch-id`

<br/>

Sau khi quá trình cài đặt hoàn tất, chúng ta cần thêm quyền cho ứng dụng cho cả hai nền tảng Android và iOS như sau:

<br/>

Trong file **AndroidManifest.xml** thêm:
`<uses-permission android:name="android.permission.USE_FINGERPRINT"/>`

<br/>

Trong **Info.plist** thêm:
`<key>NSFaceIDUsageDescription</key>
<string>Enabling Face ID allows you quick and secure access to your account.</string>`

<br/>

Sau khi đã thực hiện xong các bước trên, bạn đã hoàn tất việc cài đặt thư viện, tiếp đến chúng ta đã có thể sử dụng thư viện.
# II. Sử dụng
Trong ví dụ đơn giản sau đây, chúng ta sẽ tạo một file có tên là FingerPrint.js.

<br/>

Phương thức được dùng để xác thực Touch ID của người dùng là phương thức `authenticate(reason, config)` của thư viện react-native-touch-id.


## 1. TouchID.authenticate(reason, config)
Phương thức này dùng để xác thực với TouchID hoặc FaceID và sẽ trả về một đối tượng promise. `reason` ở đây là một optional string dùng để hiển thị với người dùng. Nó có thể cung cấp thông tin cho người dùng rằng tại sao việc xác thực lại cần thiết. `config` ở đây là một đối tượng optional để tuỳ biến các chi tiết khi hiển thị dialog.

<br/>

Dưới đây là đoạn code mình demo cách sử dụng phương thức này:
```javascript
import React, { Component } from 'react';
import {
  AlertIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NativeModules
} from 'react-native';

import TouchID from 'react-native-touch-id'

class FingerPrint extends React.Component {
	
  const optionalConfigObject = {
   title: "Authentication Required", // Android
   color: "#e00606", // Android,
   fallbackLabel: "Show Passcode" // iOS 
 }

  pressHandler() {
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(success => {
        AlertIOS.alert('Xác thực thành công');
      })
      .catch(error => {
        AlertIOS.alert('Xác thực thất bại');
      });
  }
	
  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.pressHandler}>
          <Text>
            Authenticate with Touch ID
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
};
```


Trong ví dụ trên bạn có thể quan sát thấy phương thức `pressHandler()` sẽ xủ lý việc xác thực TouchID của người dùng bằng cách sử dụng phương thức `TouchID.authentication()`. Nếu việc xác thực thất bại vì một số lý do nào đó thì một mã lỗi sẽ được return để chúng ta có thể dễ dàng xử lý (hehe)

## 2. TouchID.isSupported()

Phương thức này cho phép bạn kiểm tra xem việc xác thực bằng sinh trắc học vân tay có được hỗ trợ hay không. Nó sẽ return một string là TouchID hoặc FaceID.

<br/>

Ví dụ sau đây là cách sử dụng phương thức này:

```javascript
  clickHandler() {
    TouchID.isSupported()
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else if (biometryType === 'TouchID'){
          console.log('TouchID is supported.');
        } else if (biometryType === true) {
      	  // TouchID đc hỗ trợ trên Android
	}
      })
      .catch(error => {
        // Mã lỗi nếu thiết bị không hỗ trợ
        console.log(error);
      });
    }
```
Thư viện react-native-touch-id  hỗ trợ sử dụng FaceID trên các thiết bị như là iPhoneX. 

<br/>

Phương thức `isSupported()` sẽ return các loại sinh trắc mà thiết bị hỗ trợ và đang được bật trên thiết bị. Nếu thiết bị không hỗ trợ cả TouchID và FaceID thì chúng ta sẽ sử dụng các phương pháp còn lại là sử dụng password hoặc passcode.

<br/>

Lưu ý rằng cần gọi phương thức `isSupported()` trước khi gọi phương thức `authenticate()`. Điều này sẽ đảm bảo chúng ta không xác thực bằng cách sử dụng thư viện này nếu như sinh trắc học trên thiết bị không khả thi.

# III. Kết luận:
Đoạn code sau demo tổng quan cách sử dụng thư viện này để thực hiện việc xác thực. Lưu ý là chúng ta lưu `biometryType` vào state của component. Chúng ta cần đảm bảo người dùng biết được thông tin về việc họ đang xác thực bằng TouchID hay FaceID.

```javascript
'use strict';
import React, { Component } from 'react';
import {
  AlertIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import TouchID from "react-native-touch-id";

export default class FingerPrint extends Component<{}> {
  constructor() {
    super()

    this.state = {
      biometryType: null
    };
  }

  componentDidMount() {
    TouchID.isSupported()
    .then(biometryType => {
      this.setState({ biometryType });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.btn}
          onPress={this.clickHandler}
          underlayColor="#0380BE"
          activeOpacity={1}
        >
          <Text style={{
            color: '#fff',
            fontWeight: '600'
          }}>
            {`Authenticate with ${this.state.biometryType}`}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  clickHandler() {
    TouchID.isSupported()
      .then(authenticate)
      .catch(error => {
        AlertIOS.alert('Không hỗ trợ TouchID');
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  btn: {
    borderRadius: 3,
    marginTop: 200,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#0391D7'
  }
});

function authenticate() {
  return TouchID.authenticate()
    .then(success => {
      AlertIOS.alert('Xác thực thành công');
    })
    .catch(error => {
      console.log(error)
      AlertIOS.alert(error.message);
    });
}
```

> (ngonroi) Bây giờ bạn đã hoàn tất việc tích hợp và sử dụng xác thực bằng sinh trắc học vào ứng dụng React Native. Bạn có thể tìm hiểu thêm về UI và các tuỳ chọn để thay thế cho sinh trắc học nếu chúng không khả dụng. Cảm ơn bạn đã theo dõi bài viết, hãy để lại bình luận bên dưới nhé!