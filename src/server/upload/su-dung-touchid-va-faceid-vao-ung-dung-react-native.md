Việc dùng Touch ID hoặc Face ID cho việc xác thực người dùng đã trở nên dễ dàng hơn bao giờ hết. 
![](https://images.viblo.asia/6994fd66-ad1b-48d1-a90f-9a9c7341f311.png)
Sử dụng Touch ID hay được biết đến như là dùng dấu vân tay xác thực đã quá phổ biến trong các ứng dụng mobile. Chức năng bảo mật ứng dụng bằng Touch ID giúp cho việc xác thực người dùng bớt rắc rối hơn.

Rất nhiều ứng dụng ngân hàng như là TPBank, Vietcombank,... đều dùng Touch ID, rất nhanh gọn và tiện dụng

Người dùng không phải nhập những dòng mật khẩu dài dòng mỗi lần đăng nhập, mà chỉ cần đưa ngón tay lên quẹt mất chưa đầy 0,5s đã có thể đăng nhập thành công.

Với sự xuất hiện của Face ID trên iPhoneX, Touch ID và Face ID đã tăng tính tương tác của người dùng với các thiết bị di động, làm cho chúng trở nên bảo mật hơn.

Trong bài này chúng ta sẽ tìm hiểu cách sử dụng Touch ID và Face ID với thư viện `react-native-touch-id`.

# Cài đặt
Việc cài đặt khá là đơn giản, nếu bạn sử dụng `yarn`, hãy gõ câu lệnh sau :

`yarn add react-native-touch-id`

Nếu bạn sử dụng `npm`, hãy chạy câu lệnh sau : 

`npm i --save react-native-touch-id`

Và hãy đảm bảo rằng bạn đã kết nối thư viện bằng câu lệnh sau :

`react-native link react-native-touch-id`

Sau khi việc cài đặt hoàn tất, bạn cần phải thêm quyền cho cả Android và iOS.

Trong file `AndroidManifest.xml` : 

`<uses-permission android:name="android.permission.USE_FINGERPRINT"/>`

Trong file `Info.plist` : 

`<key>NSFaceIDUsageDescription</key>
<string>Enabling Face ID allows you quick and secure access to your account.</string>`

Một khi các bước trên hoàn thiện, bạn đã sẵn sàng để sử dụng thư viện.

# Sử dụng

Trong ví dụ ở bên dưới, chúng ta sẽ tạo ra một component là `FingerPrint.js`.

Hàm được sử dụng cho việc xác thực người dùng bằng Touch ID mang tên là `authenticate(reason, config)` nằm trong thư viện `react-native-touch-id`.

## TouchID.authenticate(reason, config)

Hàm xác thực bằng Touch ID hoặc Face ID này sẽ trả về một `promise object`. `reason` là một `optional string` được hiển thị cho người dùng. Nó sẽ đưa ra thông tin rằng tại sao lại cần việc xác thực ở đây. `config` là một `optional object` mà có thể chứ thêm các chi tiết cho việc hiển thị dialog.

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
	
  //config is optional to be passed in on Android
  const optionalConfigObject = {
   title: "Authentication Required", // Android
   color: "#e00606", // Android,
   fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
 }

  pressHandler() {
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(success => {
        AlertIOS.alert('Authenticated Successfully');
      })
      .catch(error => {
        AlertIOS.alert('Authentication Failed');
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
Trong ví dụ trên, bạn có thể thấy hàm `pressHandler()` quản lý việc xác thực Touch ID của người dùng bằng cách sử dụng hàm `TouchID.authentication()`. Nếu như việc xác thực lỗi vì lý do nào đó, một mã lỗi sẽ được trả về.

Các lỗi được Apple mô tả bằng văn bản sau : https://developer.apple.com/documentation/localauthentication/laerror?source=post_page-----707e7db17edc----------------------

## TouchID.isSupported()

Sử dụng hàm này sẽ cho bạn biết được việc xác thực bằng sinh trắc học có được hỗ trợ không. Nó sẽ trả về các string là TouchID hoặc FaceID.

Ví dụ dưới đây sẽ chỉ ra cách sử dụng của hàm `isSupported()` : 

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
      	  // Touch ID is supported on Android
	}
      })
      .catch(error => {
        // Failure code if the user's device does not have touchID or faceID enabled
        console.log(error);
      });
    }
```

Thư việc `react-native-touch-id` hỗ trợ sử dụng Face ID cho iPhoneX. Hàm `isSupported()` trả về kiểu sinh trắc được hỗ trợ và đang bật ở trên thiết bị. Nếu như thiết bị không hỗ trợ xác thực sinh trắc học, chúng ta sẽ trở về với kiểu nhập mật khẩu như bình thường.

Chú ý rằng hàm này cần phải được sử dụng trước khi gọi hàm `authenticate()`. Điều này đảm bảo rằng chúng ta sẽ không xác thực sinh trắc khi thiết bị không hỗ trợ. 

## Kết hợp các chức năng

Đoạn code bên dưới sẽ là một phiên bản hoàn thiện đối chức năng xác thực bằng `react-native-touch-id`. Chú ý rằng chúng ta sẽ lưu `biometryType` vào `component state`. Chúng ta cần phải đảm bảo rằng mesage đúng cho người dùng.

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
        AlertIOS.alert('TouchID not supported');
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
      AlertIOS.alert('Authenticated Successfully');
    })
    .catch(error => {
      console.log(error)
      AlertIOS.alert(error.message);
    });
}

```

Giờ các bạn đã cài đặt xác thực sinh trắc học thành công vào trong ứng dụng React-Native. Chú ý rằng nếu như bạn lưu mật khẩu người dùng hoặc thông tin nhạy cảm, bạn phải lưu chúng vào trong keychain bảo mật. `react-native-keychain` sẽ giúp bạn thực hiện điều này. Cảm ơn các bạn đã đón đọc.

REF : https://medium.com/react-native-training/integrate-touch-id-and-face-id-to-your-react-native-app-707e7db17edc