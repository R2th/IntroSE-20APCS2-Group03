### Giới thiệu

React Native là mobile framework front-end cho phép các developer xây dựng các ứng dụng di động. Với React Native, bạn có thể dễ dàng bắt đầu phát triển ứng dụng cho nhiều nền tảng như iOS, Android và Windows và không cần cần phải biết quá nhiều kiến thức của từng nền tảng.

React Native cho phép bạn tạo ứng dụng dành cho thiết bị di động chỉ cần sử dụng JavaScript. Nó sử dụng cùng một thiết kế như React, cho phép bạn điều chỉnh , kết hợp với UI mobile phong phú từ các component được  khai báo. Nói cách khác React Native đã tận dụng lại những thành phần UI mobile có sẵn giúp dễ dàng xây dựng các ứng dụng hoạt động trên đa nền tảng.
React Framework sử dụng thư viện React.js để xây dựng các components. Vì vậy,bạn cần có kiến thức cơ bản về React.js. Bạn có thể xem qua [ở đây](https://www.liveedu.tv/guides/programming/react-js/)

Tuy nhiên, trước khi chúng ta đi sâu vào một số ví dụ cơ bản về React Native, hãy xem xét các tính năng đáng chú ý của React Native: 
+ Bạn có thể xây dựng một "react mobile app " với React và [JavaScript](https://www.livecoding.tv/learn/javascript/)
 
+ Nó cung cấp preview tức thì cho các thay đổi của bạn , cho phép bạn làm việc hiệu quả nhất có thể. Thay vì biên dịch lại, bạn chỉ cần reload ứng dụng của mình và các phần sẽ được thay đổi  ngay lập tức
+ Nó hoạt động tốt với các công nghệ khác và có thể được embed bất cứ khi nào cần thiết. Ví dụ, nó hoạt động tốt với các ngôn ngữ lập trình di động phổ biến như Java, Objective-C và Scala.

### Cài đặt REACT NATIVE
Để đơn giản , bài viết này sẽ hướng dẫn các bạn cài React native cho MacOS .Nếu bạn muốn cài cho hệ điều hành khác bạn có thể xem hướng dẫn[ tại đây ](https://facebook.github.io/react-native/docs/getting-started.html#content)

Trước tiên, bạn cần cài đặt [Homebrew](https://brew.sh/), một trình quản lý package phổ biến cho MacOS. 
Tiếp theo , tiến hành cài đặt [Python2](https://www.python.org/) và [Watchman](https://facebook.github.io/watchman/). Watchman là dịch vụ xem file của React Native sử dụng để giúp bạn hiểu rõ hơn về file của bạn và mọi thay đổi xảy ra với chúng trong quá trình phát triển dự án của bạn.

Cài đặt bằng cách chạy các lệnh sau trên commands termilnal của iOS:
```
brew install node
brew install watchman
```
Để sử dụng  React Native, bạn cần cài đặt React Native CLI, bằng cách chạy lệnh sau:

```
npm install - g react-native-cli
```

Tiếp theo, bạn cần công cụ  Xcode .Bạn có thể dễ dàng cài đặt bằng cách download về từ Mac AppStore [tại đây](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). 
### Build ứng dụng đầu tiên
Bây giờ, chúng ta hãy tạo một ứng dụng đơn giản kiểu như  "Hello World ".

Để tạo một project mới , bạn cần chạy lệnh sau đây

Giả sự tên của project là "HelloLiveCoding"
```
react-native init HelloLiveCoding
```
Tiếp theo bạn vào thư mục "HelloLiveCoding" vừa tạo xong bằng câu lệnh sau: 
```
cd HelloLiveCoding
```
Để kiểm tra xem mọi thứ đã chạy đúng chưa bạn chạy câu lệnh sau: 
```
react-native run-ios
```

Ok, nếu không có lỗi nào xảy ra chúng ta sẽ sang bước tiếp theo 
### Coding 
Trước khi bắt đầu, điều quan trọng bạn phải hiểu là chúng ta sẽ xây dựng những native components ,nó giống như những đoạn code web blocks.

### Inport những thư viện cần thiết 
Để bắt đầu, bạn cần chỉnh sửa tệp **index.ios.js** 

Press Command⌘ + R và Copy-paste đoạn code dưới đây vào file **index.ios.js** của bạn: 
```
import React, { Component } from ‘react’’
import { AppRegistry, Text } from ‘react-native’;
```
Hai dòng inport trên họat động với chuẩn chính thức của ES2016 JavaScrip. 

Đầu tiên “import statement” các **component** từ thư việc của React. Các component này là các basic UI dùng trong layout React.

Dòng tiếp theo imports **AppRegistry** và **Text** từ React Native
Sau khi inport một số thư việc basic cần thiết tiếp thêm một số dòng code dưới đây: 

```

class HelloLiveCoding extends Component {
 render() {
   return (
     <Text>Hello Livecoding!</Text>
   );
 }
}
```

Như bạn nhìn thấy bên trên , code trên dùng theo chuẩn [ES6](https://es6.io/).  Chuẩn ES6 đã được giới thiệu và sử dụng trong Javascript .
Mặc dù nhiều nền tảng không hỗ trợ hoàn toàn tiêu chuẩn ES6, nhiều công cụ và thư viện cho phép sử dụng JavaScript bằng cách chuyển đổi chúng thành legacy bất cứ khi nào cần.

Chúng ta tạo một class, “HelloWorldApp”, extends “Component”. Như đã thảo luận ở trên, React sử dụng các component có sẵn giúp cho việc tái sử dụng và phát triển  nhanh hơn.

Function **render()**  renders  code cho  mobile app của bạn.


**<Text> Xin chào Livecoding! </ Text>**  Những gì bạn thấy ở đây là [JSX](https://reactjs.org/docs/introducing-jsx.html). JSX là một phần mở rộng cú pháp JavaScript đơn giản cho phép sử dụng XML trong mã JavaScript. Ngoài ra, nó cũng tương tự như XML . <Text> tag  ở đây sẽ hiển thị văn bản đơn giản trên UI của ứng dụng.

Tiếp theo thêm dòng code trong file index.ios.js đối với iOS và tương tự index.android.js đối với Android. 
```
AppRegistryA .registerComponent(“HelloLiveCoding”, () => HelloLiveCoding);
```
Với mã dòng này, HelloLiveCoding được đăng ký với AppRegistry như một Component.
AppRegistry xác định điểm bắt đầu của ứng dụng và cho phép ứng dụng bắt đầu. 

Giờ chỉ cần reload lại và xem kết quả !
### Tổng kết 
Trong hướng dẫn này, chúng ta đã học về React Native và cách chúng ta có thể bắt đầu. Tuy nhiên, có rất nhiều điều để học. Ví dụ, một vài khái niệm khác như Props, Style và State và rất nhiều các khái niệm cơ bản khác về React Native.
Những điều này mình sẽ được giới thiệu ở trong những bài hướng dẫn tiếp theo. thank you!

Link tham khảo : https://blog.liveedu.tv/react-native-tutorial-1/