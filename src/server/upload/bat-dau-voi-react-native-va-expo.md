Trong bài viết này, chúng ta sẽ tìm hiểu cách tạo một ứng dụng React Native với [Expo](https://expo.io/) và [tạo ứng dụng React Naive](https://github.com/react-community/create-react-native-app),  tìm hiểu về một số khác biệt giữa  React và React Native và cấu trúc file trong project React Naitve.

Bạn đan suy nghĩ về việc làm một ứng dụng điện thoại? Biết React và không có thời gian để học ngôn ngữ khác? Thật may là React Native đã xuất hiện để tiết kiệm thời gian cho chúng ta. Nó  cho phép chúng ta truy cập dễ dàng vào API của điện thoại để chúng ta có thể truy cập vào danh bạ, thông báo, máy ảnh...

#### Facebook Guide
Nếu bạn đang tìm kiếm cách nhanh nhất để  Bắt đầu với  React Native, thì không có gì khác tốt hơn [Hướng dẫn của Facebook](https://facebook.github.io/react-native/docs/getting-started.html).

Trước tiên, chúng ta cần cài đặt create-react-native-app:
```javascript
$ npm install -g create-react-native-app
```

Sau đó, chúng ta tạo Project :
```javascript
$ create-react-native-app AlligatorProject

$ cd AlligatorProject
$ npm start
```
Khi chúng ta chạy npm start, chúng ta có thể xem command line để biết thêm chi tiết về cách  chạy ứng dụng bằng máy ảo hoặc cài đặt ứng dụng Expo trên điện thoại và chạy nó ở đó.

Sau đó, code từ chính ứng dụng được tạo cho chúng ta biết phải làm gì tiếp theo:
```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
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
> Lưu ý rằng đoạn code trên được lấy từ project Create React Native App

#### Giới thiệu Expo 
Theo Expo team:
> Expo là một công cụ mã nguồn mở và miễn phí được xây dựng xung quanh React Native để giúp bạn xây dựng các dự án iOS và Android  bằng JavaScript và React.

Về cơ bản: 
* Trong khi test, chúng ta có thể tận dụng một môi trường gần giống với môi trường phát triển React.js.
* Thông qua [SDK Expo](https://docs.expo.io/versions/latest/sdk/overview/#expo-sdk), chúng ta có thể chạm vào điện thoại giống như cách chúng ta làm với code Android hoặc iOS

Khi chúng ta tiếp tục phát triển, chúng ta có thể gặp phải những hạn chế của  Expo. Cụ thể, hiện tại nó không hỗ trợ tích hợp Bluetooth hoặc bất kỳ plugin nào của bên thứ ba được xây dựng bằng code iOS hoặc Android. Tất cả các công cụ của bên thứ ba trong một dự án Expo phải được xây dựng trong môi trường Expo.

Nhưng đừng băn khoăn! Nếu chúng ta gặp một trong những hạn chế này, Expo sẽ có lệnh sau: 
```
$ npm run eject
```

Ejecting sẽ chuyển đổi dự án  thành dự án  React Native, nghĩa là mỗi khi build ứng dụng từ bây giờ, nó được chuyển đổi thành code iOS(Objective C) hoặc Android(Java). Điều này cho phép chúng ta khắc phục những hạn chế Expo được đề cập ở trên, nhưng có thể khiến việc test và build app khó khăn hơn đáng kể.
Lưu ý rằng Eject ra là một hành động vĩnh viễn, vì vậy chúng ta nên:

Hãy chắc chắn rằng một dự án được lưu trữ phiên bản trước ở đâu đó trước khi chúng ta Eject. Bằng cách đó chúng ta cũng có thể quay lại bất cứ khi nào chúng ta muốn.

#### Create-react-native-app cho chúng ta những gì
Nếu chúng ta xem thư mục được tạo bởi Create-react-native-app, chúng ta sẽ thấy các file sau:
![](https://images.viblo.asia/5969827d-59a9-445f-aec6-b680a1f5a887.png)
* .babelrc định nghĩa cách JSX  sẽ được chuyển đổi thành JS.
* .gitignore bỏ qua thay đổi tất cả các file được định nghĩa trong file gitignore
* .watchmanconfig xác định cách các file nên được xem để thay đổi.
* App.js là trung tâm của dự án của chúng tôi, tương tự như root component trong React.js.
* app.json  cấu hình các phần trong ứng dụng.
* App.test.js là trung tâm test của dự án của và có thể bắt đầu TDD ngay lập tức.
* pack.json và package-lock.json xác định một tập các filw và tập lệnh cơ bản để giúp chúng tôi bắt đầu và chạy.

#### Chỉnh sủa App
Sửa file App.js  như sau:
```js
 import React from 'react';
  import { StyleSheet, Text, View } from 'react-native';

  export default class App extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          Welcome to our app!
        </View>
      );
    }
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

Nhìn vào code của ứng dụng, chúng ta thấy rất nhiều code tương tự như React.js. Từ trên xuống dưới, chúng ta thấy:
* ES6 imports
* [object destructuring](https://alligator.io/js/object-array-destructuring-es2015/)
* Class được export kế thừa từ React Component
* render() function trả về  JSX
* gán biến const

 Nhưng cũng có một số điều mới:
*  <Text> và <View> không phải là thẻ HTML. Điều này là do ứng dụng React Native không phải là một trang web. Tất cả các thẻ trong React Native phải là React Native Component.
*  Không có className hoặc CSS imports. Đối tượng React Native StyleSheet cho phép chúng ta sử dụng toàn bộ sức mạnh của ES6: những thứ như biến, arrow function, cho các vòng lặp và ternaries.

Ví dụ: nếu chúng ta quen với điều này từ React.js:
```js
<img src="myPic.gif" />
```
Trong React Native, nó sẽ trông như thế này:
```js
<Image source="myPic.gif" />
```
Ngoài ra, chúng ta phải import Image  từ React Native. Không khác biệt nhiều lắm, nhưng khi chúng ta chuyển đổi giữa React.js và React Native, những khác biệtđó có thể dẫn đến một số lỗi gây khó chịu.
    
Có một sự khác biệt thứ ba sẽ xuất hiện khi ứng dụng phức tạp hơn: nhiều package npm import cho React.js sẽ không hoạt động với React Native
    
#### Tổng kết
Expo và create-react-native-app cho phép chúng ta sử dụng môi trường phát triển React Native rất giống với React.js, nhưng cũng cho phép chúng tôi tận dụng các tính năng của thiết bị di động gốc.
    
Tóm lại, ba điểm khác biệt chính giữa React.js và React Native là:
* Không còn HTML nữa
* Không còn CSS nữa
* Mọi gói npm của React.js dựa trên HTML hoặc CSS sẽ không hoạt động với React Native

Với React Native, chúng ta phải hy sinh một số công cụ hữu ích từ phát triển web thuần túy, nhưng có một số công cụ mạnh mẽ mà chúng tôi có được để trao đổi, điều này khiến cho việc chuyển sang React Native rất xứng đáng.
    
Bài viết được dịch từ: [Getting Started with React Native and Expo](https://alligator.io/react/react-native-getting-started/)