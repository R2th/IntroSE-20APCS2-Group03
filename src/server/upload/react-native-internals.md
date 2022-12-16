React Native là một framework giúp cho lập trình viên có thể làm app native bằng cách sử dụng Javascript. Chờ chút, ko phải chúng ta đã có Cordova được một thời gian rồi sao? Tại sao lại phải dùng RN nhỉ?

Điểm khác biệt chủ yếu giữa một ứng dụng RN và Cordova là việc ứng dụng Cordova chạy trong một webview trong khi ứng dụng RN thì được render bằng các view native. Ứng dụng RN có thể truy cập trực tiếp đến mọi API native và view được cung cấp bởi hệ điều hành. Do đó, app xây dựng bằng RN cho chúng ta trải nghiệm và tốc độ như một ứng dụng native vậy.

Bạn có thể nghĩ rằng RN sẽ compile code JS thành code native tương ứng một cách trực tiếp. Tuy vậy điều này rất khó để thực hiện bởi vì Java và Objective-C là những ngôn ngữ kiểu mạnh (mỗi loại dữ liệu có một kiểu riêng biệt) trong khi Javascript thì không phải như vậy. Thay vì thế, cách RN xử lý vấn đề này thông minh hơn nhiều. Về mặt bản chất, RN có thể được coi như là 1 tập hợp của các React component, trong đó mỗi component thể hiện những native view và thành phần tương ứng. Ví dụ, một TextInput native sẽ có một component tương ứng trong React và có thể được import trực tiếp vào trong code JS để sử dụng như bất kì component nào khác. Vì thế, lập trình viên có thể viết code như là cho ứng dụng web React nhưng kết quả nhận được sẽ là một ứng dụng native.

Nghe có vẻ giống ma thuật cổ đại nhỉ 😂

Để hiểu được điều này thì hãy cùng xem cấu trúc và cách mà React Native hoạt động nhé.

# Architecture

Cả iOS và Android có một cấu trúc tương tự nhau với những điểm khác biệt nhỏ.

Nếu chúng ta nhìn vào tổng thể thì platform này bao gồm 3 phần:

1. **Native code/Module**: Phần lớn native code với iOS thì được viết bằng Objective-C hoặc Swift, trong khi với Android thì đó là Java. Nhưng khi viết app bằng RN thì chúng ta rất ít khi phải viết native code cho từng platform.

2. **Máy ảo Javascript**: Máy ảo JS để chạy code Javascript của chúng ta. Với máy ảo và thiết bị IOS/Android RN sử dụng JavascriptCore, một open source engine Javascript xây dựng cho WebKit. Đối với iOS, RN sử dụng JavascriptCore cung cấp bởi nền tảng iOS. Nó được ra mắt lần đầu tiên trong iOS 7 cùng với OS X Mavericks.
https://developer.apple.com/reference/javascriptcore.

Đối với Android, RN đóng gói JavascriptCore vào cùng với ứng dụng. Điều này sẽ làm tăng kích thước của app. Do đó app Hello World của RN sẽ có size khoảng 3-4 MB cho Android.

Đối với debugging mode trong Chrome, Javascript code chạy luôn trong Chrome thay vì JavascriptCore trong thiết bị, và giao tiếp với native code thông qua WebSocket. Tại đây, nó dùng engine V8, cho phép chúng ta truy cập đến rất nhiều thông tin bên trong debugging tool của Chrome như network request, log,...

3. **React Native Bridge**: React Native Bridge là một cầu nối C++/Java có nhiệm vụ xử lý giao tiếp giữa thread native và Javascript. Một giao thức tuỳ chỉnh được sử dụng để truyền tin nhắn.

![](https://images.viblo.asia/483b17f2-435b-4265-8e51-ee8f60d97915.png)

Trong phần lớn trường hợp thì lập trình viên sẽ chỉ cần viết toàn bộ app RN bằng Javascript. Để chạy trên từng platform thì chúng ta sẽ sử dụng command cho platform tương ứng thông qua CLI. Tại thời điểm đó, RN CLI sẽ tạo ra một trình đóng gói có nhiệm vụ đóng gói code JS lại thành một file `main.bundle.js`.  Trình đóng gói này có thể được xem là tương tự như Webpack. Giờ thì mỗi khi một app RN được khởi chạy, mục đầu tiên được load sẽ là entry point của native. Thread native tạo ra một thread máy ảo JS để chạy code Javascript đã được đóng gói. Code JS này chứa toàn bộ logic của ứng dụng. Thread native có thể gửi thông báo thông qua RN Bridge để khởi chạy ứng dụng JS. Tại đây, thread Javascript sẽ bắt đầu phát ra các chỉ dẫn cho thread native thông qua RN Bridge. Chỉ dẫn này bao gồm việc view nào cần phải được load, thông tin nào cần phải được lấy từ phần cứng,... Ví dụ, nếu thread JS muốn một view và một text được khởi tạo, nó sẽ gộp các yêu cầu thành một tin nhắn và gửi nó đến thread native để render.

```
[ [2,3,[2,'Text',{...}]] [2,3,[3,'View',{...}]] ]
```
    
Thread native sẽ xử lý các request này và gửi lại kết quả cho thread JS để chắc chắn rằng các tính toán đã được xử lý thành công.

Chú ý: Để có thể xem được các tin nhắn thông qua cầu nối trên console, dùng đoạn code này vào file `App.js`.

```
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';
MessageQueue.spy(true);
```

# Threading Model

Khi một ứng dụng RN được khởi chạy, nó tạo ra những hàng chờ sau:

1. **Main thread (Native Queue)** - Đây là main thread được tạo ra ngay khi ứng dụng được khởi chạy. Nó tiến hành load ứng dụng và chạy thread JS để thi hành code Javascript. Thread native cũng có nhiệm vụ lắng nghe các UI event như 'press', 'touch',... Những event này sau đó sẽ được gửi cho thread JS thông qua RN Bridge. Một khi Javascript đã được load, thread JS sẽ gửi những thông tin về việc những gì cần phải được render lên màn hình. Những thông tin này sẽ được dùng bởi shadow node thread để tính toán layout. Thread shadow về cơ bản thì là một engine tính toán sẽ quyết định việc tính toán vị trí của các view. Những chỉ dẫn này sau đó sẽ được gửi lại main thread để render ra view.

2. **Javascript thread (JS Queue)** - Hàng chờ Javascript là một hàng chờ để chạy code JS đã được đóng gói. Thread JS này chạy mọi business logic, ví dụ như code RN của chúng ta. 

3. **Custom Native Modules** - Ngoài những thread được tạo ra bởi RN, chúng ta còn có thể tạo ra nhiều thread trên những native module tuỳ biến mà chúng ta xây dựng để đẩy nhanh tốc độ và hiệu năng của ứng dụng. Ví dụ thì các animation được xử lý trong RN bởi 1 thread native riêng để giảm tải cho thread JS.

Tham khảo: https://www.youtube.com/watch?v=0MlT74erp60

# View Managers

View Manager là một module native có tác dụng nối view JSX sang view Native tương ứng.

```

import React, { Component } from 'react';
import { Text, View, AppRegistry } from 'react-native';

class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{padding:40}}>
        <Text>Hello world!</Text>
      </View>
    );
  }
}

export default HelloWorldApp;
AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);

```


Tại đây khi chúng ta viết `<Text />`, Text View manager sẽ khởi tạo một đối tượng `TextView(getContext())` trong Android.

View Manager về cơ bản thì là những class được extend từ class `ViewManager` trong Android và subclass của `RCTViewManager` trong iOS.


# Development mode

Khi ứng dụng được chạy trong DEV mode, thread JS được tạo ra ngay tại máy dùng để phát triển. Mặc dù code JS được chạy trong một thiết bị mạnh hơn nhiều so với điện thoại, bạn sẽ thấy rằng hiệu năng của nó sẽ tệ hơn khá nhiều so với khi chạy bằng mode đóng gói hoặc mode production. Điều này là không thể tránh khỏi bởi vì có thêm rất nhiều việc được làm ở DEV mode khi app chạy để cung cấp những cảnh báo hữu dụng và tin nhắn lỗi, ví dụ nhưng xác thực propTypes và vô vàn assertion khác. Hơn nữa, độ trễ của việc giao tiếp giữa thiết bị và thread JS cũng phần nào làm giảm hiệu năng. 

Tham khảo: https://www.youtube.com/watch?v=8N4f4h6SThc - RN android architecture

Bài viết được dịch từ [React Native Internals](https://www.reactnative.guide/3-react-native-internals/3.1-react-native-internals.html).