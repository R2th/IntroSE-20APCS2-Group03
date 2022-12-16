# Mở đầu
## Giới thiệu ReactNative
React Native cho phép bạn tạo ứng dụng dành cho thiết bị di động chỉ sử dụng JavaScript. Với React Native, bạn không cần phải build như mobile web app, HTML5 app hay hybrid app, mà được build trực tiếp giống như các ứng dụng được viết bằng objective-c hay java.
 Sau  đây là các bước cần thiết để cài đặt môi trường cho React Native.
- Bước 1: Cài đặt home brew
 Chúng ta dùng home brew để cài đặt những phần mềm khác
Đây là lệnh để cài đặt home brew
```sh
/usr/bin/ruby -e "$(curl -fsSLL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- Bước 2: Cài đặt watchman
 Cái này có mục đích để theo dõi files trên đĩa cứng. Có nghĩa là nó giúp React Native có tính hot reload,ví  dụ bạn đang làm UI cho app, nhấn reload lại là thấy thay đổi liền không cần chạy lại simulator.

```sh
brew install watchman
```
- Bước 3: Cài đặt node
```sh
brew install node
```

- Bước 4: Cài đặt react Native
```sh
npm install -g react-native-cli
```

- Bước 5.1: Cài đặt Xcode: Các bạn xem hướng dẫn trên trang chủ của Apple nhé
<https://itunes.apple.com/us/app/xcode/id497799835?mt=12>

 - Bước 5.2: Cài đặt Android studo: Các bạn cài đặt dựa vào link hướng dẫn sau nhé:
<https://developer.android.com/studio/install>
- Bước 6: Tạo một ứng dụng React Native đầu tiên có tên là Hello World

```sh
react-native init HelloWorld
````

Để chạy ứng dụng này các bạn dùng lệnh sau:
( Ở đây mình dùng Xcode để buil)

```sh
react-native run-ios
```
Ứng dụng sẽ được build trên simulator của Xcode

Để reload lại ứng dụng dùng phím Comand+R nhé.
## Cấu trúc một project

Sau khi tạo xong project thì mình mở project bằng __Atom__ ( Các bạn có thể dùng Tool nào cũng được nhé)
Chúng ta sẽ thấy cấu trúc một project như sau: 

![](https://images.viblo.asia/f52b36e0-bd58-4be5-b60c-bf0de14e16cb.png)


Trong thư mục có 2 thư mục con là android và ios chứa các source code giống như những project mà được viết bằng objective c và java. Tuy nhiên 2 thư mục này mình sẽ tìm hiểu cách sử dụng sau :p

Package.json là file khai báo thông tin project, các gói package đã được cài đặt và một số script để chạy project.

File App.js là file mà mình sẽ viêt code vào đây.

Khi app bắt đầu chạy sẽ chạy vào file index.js:
````javascript
AppRegistry.registerComponent(appName, () => App);
````
Câu lệnh này dùng để khai báo component chạy đầu tiên là App( được viết trong file App.js)

## Component

Giống như trong iOS thì mình sử dụng các UIButton, UITextView,... thì trong React Native những cái kiểu vậy gọi là các Component. 
Để sử dụng được các component chúng ta cần khai báo thư viện như sau
```javascript
import React from 'react';
import { Text, View} from 'react-native';
```
Trong đó:

__react__: để hỗ trợ giao tiếp giữa các component

__react-native__: lấy output của các component để bỏ lên màn hình điện thoại.

Chúng ta dùng component nào thì nhớ phải khai báo trong chỗ import này nhé, không là sẽ bị lỗi.
Tạo một component đơn giản, ví dụ ở đây mình muốn tạo một dòng chữ hiển thị trên màn hình, chúng ta viết vào file App.js như sau:

```javascript
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorld extends Component {
  render() {
    return (
      <View>
        <Text>Hello world!</Text>
      </View>
    );
  }
}
```
Màn hình sẽ hiển thị lên dòng chữ Hello world! ở trên cùng. 
Đấy là các component chúng ra sử dụng của thư viện react-native. Tuy nhiên chúng ta có thể tự tạo một component. Ví dụ dưới đây mình tự tạo 1 component có tên là ScreenA như sau:
```javascript
export default class ScreenA extends Component {
  render() {
    return(
      <View>
        <Text> ScreenA </Text>
      </View>
    )
  }
}
```

Sau đó mình sử dụng ScreenA giống như các component View hay Text bình thường
```javascript
export default class HelloWorld extends Component {
  render() {
    return (
      <View>
        <ScreenA />
      </View>
    );
  }
}
```
 
Component bản chất của nó cũng là các class, do vậy nó cũng có các thuộc tính. Trong react native có 2 loại thuộc tính là Prob và state. Sau đây mình sẽ tìm hiểu xem nó là cái gì nhé.
## Props 
Hầu hết các component có thể được customize khi chúng được tạo ra bằng các tham số khác nhau. Các tham số đó được gọi là __props__.
Ví dụ trong một Image như sau:
```javascript
<Image source={pic} style={{width: 193, height: 110}}/>
```
 thì source chính là props của Image.

 Một ví dụ khác, trong component ScreenA mình đã tạo ở trên, mình tạo một props là name như sau:
 ```javascript
 <ScreenA name = "Screen A" />
 ```
 như vậy trong ScreenA mình có thể hiển thị name lên dòng Text bằng cách:

```javascript
export default class ScreenA extends Component {
  render() {
    return(
      <View>
        <Text> {this.props.name} </Text>
      </View>
    )
  }
}
```

__props__ có một đặc điểm đó là __giá trị của nó không thể sửa đổi được__ trong suốt vòng đời của component. Muốn tạo ra một thuộc tính có thể thay đổi được chúng ta sử dụng __state__.

## State
Chúng ta khởi tạo state trong constructor và sau đó gọi setState để thay đổi giá trị của nó.
Đặc điểm cuả state là khi state thay đổi giá trị thì tất cả những giao diện nào sử dụng giá trị của state sẽ đều tự động cập nhật lại.

Ví dụ mình tạo một cái state tên là count như sau:

```javascript
constructor (props) {
    super(props);
    this.state = {
      count: 0
    }
}
```
Sau đó mình tạo một Text để hiển thị biến count lên màn hình
``` javascript
<Text> {this.state.count} </Text>
```
Tiếp theo mình tạo một TouchableOpacity để có sự kiện click làm thay đổi biến count:
```javascript
<TouchableOpacity onPress={() => {this.clickButton()}}>
    <Text> Click </Text>
</TouchableOpacity>
```
Trong hàm clickButton mình làm thay đổi biến count như sau:
```javascript
  clickButton() {
    this.setState({
      count: this.state.count + 1
    });
  }
  ```
Như vậy Text hiển thị biến count kia sẽ tự động thay đổi mỗi khi click vào button mà chúng ta không cần phải viết lệnh set Text cho nó nữa :)
#     Nguồn tham khảo: 
https://facebook.github.io/react-native/docs/getting-started.html
https://www.tutorialspoint.com/react_native/