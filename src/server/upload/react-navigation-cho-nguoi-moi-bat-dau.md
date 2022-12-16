## 1. Project Setup
Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các phần sau trong hệ thống máy tính của mình:
- IDE: XCode (dành cho máy Mac), và Android Studio
- [Node](https://nodejs.org/en/download/) latest version (phiên bản mới nhất)
- Code Editor ( Visual studio code ) with terminal.

Trong bài viết này, mình sẽ sử dụng Xcode để build ứng dụng trên IOS.

Giả sử bạn đã cài đặt Node, open terminal và chạy lệnh sau:
```
npm install -g react-native-cli
```
React-native-cli sẽ được cài đặt trong hệ thống của bạn. Sau khi cài xong, chạy command dưới để tạo ứng dụng:
```
react-native init MyProjectName
```
Chờ vài phút cho đến khi dự án được cài đặt. Sau khi thực hiện xong, truy cập vào thư mục của ứng dụng bạn vừa tạo:
```
cd MyProjectName
```
Bạn có thể thấy cấu trúc code đầy đủ của ứng dụng được cài đặt với các file và thư mục mặc định được cung cấp bởi React-native-cli.
![](https://images.viblo.asia/ab762526-1977-4eed-9533-62956f4ef9cb.png)

## 2. Creating Screens and Components
Sau khi hoàn thành việc thiết lập môi trường dự án. Bây giờ chúng ta sẽ tạo các màn hình và các thành phần (component) sẽ sử dụng trong ứng dụng của mình.
### 2.1 Creating the src folder
Ngay bên dưới thư mục `node modules`, thêm một thư mục và đặt tên là `src`.
Thực ra, bạn có thể đặt tên cho thư mục là gì cũng được. Mình đặt tên nó là src vì nó thường được khuyến nghị để giúp các nhà phát triển khác (developer) hiểu, biết được nơi chứa mã nguồn của ứng dụng.
Khi bạn đã tạo thư mục src, bạn phải tạo thêm hai thư mục bên trong thư mục src. Một cho các màn hình mà bạn sẽ tạo và một cho các thành phần (components). Cấu trúc code của bạn sẽ trông giống như sau:
![](https://images.viblo.asia/550508db-ed01-4c82-a0e4-49d85239971c.png)

Sau khi tạo folder xong, tiến hành cài đặt React Navigation. Mình sẽ sử dụng React Navigation để navigate giữa các màn hình. Chạy command line sau để cài đặt:
```
npm install react-navigation
```
Sau khi React Navigation được cài đặt, hãy chuyển đến cấu trúc thư mục và tạo một tệp có tên là Route.js. Nơi này sẽ chứa mã code để điều hướng giữa các màn hình trong ứng dụng. Nó nên được thêm vào bên ngoài thư mục src:
![](https://images.viblo.asia/b44be8e1-4ce1-4877-ac58-8e703bfa2948.png)

Bên trong file Routes.js, implement như sau:
```javascript
import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
const Project= createStackNavigator({
  Home: {
   screen: Home
  },
  Profile: {
   screen: Profile
  }
});
export default createAppContainer(Project);
```

Bạn có thể thấy trong đoạn mã ở trên mình đã định nghĩa 2 file đó là `Home` và `Profile` - và sử dụng chúng trong navigation component. 2 tệp này về cơ bản là các màn hình chứa mã code cho ứng dụng.
Tiếp theo, chuyển đến tệp App.js trong thư mục dự án của bạn và xóa tất cả mã hiện có. Sau đó, thêm các dòng mã sau:
```javascript
import React, {Component} from "react";
import Routes from "./Routes";
const App = () => <Routes/>
export default App;
```

Khi bạn đã hoàn tất các thay đổi trong tệp App.js, thay đổi tệp index.js để hoàn tất quy trình điều hướng.
```javascript
import { AppRegistry } from 'react-native';
import App from './App';
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
AppRegistry.registerComponent('AwesomeProject', () => App);
```

Vậy là xong, thiết lập điều hướng đã hoàn tất, chúng ta có thể tiến tới việc tạo các màn hình và các thành phần (components) của riêng mình cho ứng dụng.

## 3. Screens Creation and Navigation
Chuyển đến screen folder trong thư mục src bạn đã tạo và thêm hai file - Home.js và Profile.js
Khi bạn đã hoàn tất việc tạo các tệp đó, viết code và liên kết chúng để điều hướng giữa cả hai màn hình. Như này này: 

### Home.js
```javascript
import React from 'react';
import { Button, View, Text } from 'react-native';
class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
   };
render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
<Button title="Go to Profile screen"
    onPress={() => this.props.navigation.navigate('Profile')}
   />
  </View>
);
}
}
export default Home;
```

### Profile.js
```javascript
import React from 'react';
import { Button, View, Text } from 'react-native';
class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile'
   };
 render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
<Button title="Go to Home screen"
    onPress={() => this.props.navigation.navigate('Home')}
   />
  </View>
);
}
}
export default Profile;
```

Bạn sẽ nhận thấy rằng code cho cả hai tệp gần giống nhau. Điều này là do chúng ta đang tập trung vào điều hướng và không phải vào việc tạo nội dung. Về nội dung cho từng màn hình chúng ta có thể thực hiện ở các phần tiếp theo.

XONG RỒI!!!! Chạy thử ngay thôi :D

Run command line sau: 
- IOS:
```
react-native run-ios
```

hoặc 

- Android: 
```
react-native run-android
```

Và Kết quả là đây. 
- HOME screen:

![](https://images.viblo.asia/ab50c637-b996-4d2d-8508-1398df598f69.png)
- PROFILE  screen:

![](https://images.viblo.asia/074d051c-8030-4b17-a4b1-942ced810399.png)

Nguồn tham khảo: https://medium.com/better-programming/react-native-navigating-between-the-screens-and-code-structure-for-beginners-6b815ee8f79