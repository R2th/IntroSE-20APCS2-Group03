>* Bài viết được tham khảo từ [React Native Internals](https://www.reactnative.guide/3-react-native-internals/3.1-react-native-internals.html). Bắt đầu là một Android Developer, mình tìm hiểu về React Native cách đây vài tuần. Đối với mình, việc nắm rõ kiến trúc của một ngôn ngữ cũng như cách mà nó tạo ra một ứng dụng là một điều thiết yếu đối với bất kì nhà phát triển mobile nào nếu muốn sử dụng ngôn ngữ đó cho dự án của mình. 

>* Chưa từng làm qua web cũng như JS nên React Native khá mới và lạ so với mình. Nếu bài viết có chỗ nào sai sót mong nhận được sự góp ý của mọi người để mình có thể hiểu rõ hơn về React Native.

# Introduction
* React Native là một framework cho phép các nhà phát triển xây dựng các ứng dụng native sử dụng Javascript.

* Ứng dụng RN truy cập trực tiếp đến toàn bộ APIs của ngôn ngữ Native. Như vậy một ứng dụng được xây dựng bằng react native cho hiệu năng và cảm nhận tương tự như một ứng dụng native.

* Đầu tiên, có thể dễ dàng giả định rằng React Native sẽ biên dịch ngôn ngữ JS code trực tiếp sang ngôn ngữ native tương ứng. Nhưng điều này thật sự khó khăn vì Objective C hay Java đều là những ngôn ngữ khá chặt chẽ. Thay vì thế, RN hoạt động một cách thông minh hơn. Về bản chất RN được xem như là một tập hợp các thành phần React (React components), mỗi component thế hiện tương ứng với view hay component nào đó của native. 
# Architecture
* Nhìn chung thì cả ios và android đều có chung một kiến trúc với một vài sự khác biệt nhỏ. Nếu nhìn một cách tổng thế, nền tảng RN sẽ có 3 phần chính:
    
    ## 1. Native Code/ Modules 
     - Đối với ios toàn bộ native code được viết bằng Objective C hoặc Swift, còn với Android sẽ được viết bằng Java. Nhưng để viết một ứng dụng React Native, chúng ta sẽ không bao giờ phải viết bằng native code của Android hay Ios.
    ## 2. Javascript JVM 
    * Máy ảo JS sẽ chạy toàn bộ JS code của chúng ta. Trên các máy ảo Ios hay Android và trên các thiết bị React Native sử dụng JavaScriptCore. Các công cụ JavaScript hỗ trợ Safari. JavaScriptCore là một công cụ mã nguồn mở xây dựng cho Webkit. Với IOS, React Native sử dụng JavaScriptCore được cung cấp bởi nền tảng Ios, được giới thiệu lần đầu tiên trên ios 7.

    * Với Android React Native đóng gói JavaScriptCore cùng với ứng dụng. Do đó sẽ làm tăng kích thước của app. 
    
    * Trong trường hợp sử dụng chế độ debug Chrome, code JavaScript sẽ chạy trên Chrome chứ không chạy trên thiết bị và giao tiếp với native code thông qua Websocket, sử dụng với V8 engine. Điều này cho phép chúng ta quan sát được nhiều thông tin hơn trên công cụ Chrome debugging như network requests, console logs,... 
    ## 3. React Native Bridge 
    * React native bridge là một cầu nối C++/Java giúp giao tiếp giữa luồng native và luồng Javascript. Một giao thức custom sẽ được sử dụng cho việc gửi các messages giữa 2 luồng.
    ![alt](https://www.reactnative.guide/assets/images/rn-architecture.png)
    
* Trong hầu hết các trường hợp, các lập trình viên sẽ viết toàn bộ ứng dụng React Native bằng JavaScript. Sau đó để chạy một ứng dụng như vậy, một câu lệnh cần được thực hiên thông qua **CLI:** `react-native run-android` hoặc `react-native run-ios`. Lúc này, React Native CLI sẽ sinh ra một node packager/bundler làm nhiệm vụ đóng gói JS code vào trong một file có tên `main.bundle.js`. Sau đó, mỗi lần ứng dụng React Native được khởi chạy, thành phần đầu tiên được nạp vào là ngõ vào của native (Đoạn này hiểu lắm, nguyên bản: The first item to be loaded is the native entry point). Native Thread tạo ra một máy ảo JS (JSVM) để chạy JS code đã được đóng gói. JS code đó là toàn bộ business logic của ứng dụng. Luồng Native từ đó sẽ gửi các messages thông qua RN bridge để khởi chạy một ứng dụng JS. Luồng Javascript được sinh ra bắt đầu gửi các lệnh, yêu cầu tới luồng native thông qua RN Bridge. Các lệnh bao gồm các view sẽ được nạp vào, các thông tin nhận từ phần cứng,... Ví dụ, nếu luồng JS muốn một view và text được khởi tạo nó sẽ gửi yêu cầu vào trong một message và gửi nó qua Native thread để render chúng.

    `[ [2,3,[2,'Text',{...}]] [2,3,[3,'View',{...}]] ]`

* Native thread sẽ thực hiện các hoạt động và gửi lại kết quả cho JS để đảm bảo các yêu cầu đã được thực hiện chính xác.

* **Note**: Để theo dõi các messages cầu nối ở console, thêm đoạn sau vào file `index.<platform>.js`

    `import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue'; MessageQueue.spy(true);`

# Threading Model
* Khi một ứng dụng React Native được khởi chạy, nó sẽ sinh ra các hàng đợi luồng (threading queues)
    ## 1. Main thread (*Native Queue*) 
    * Đây là luồng chính được sinh ra đầu tiên để khởi chạy ứng dụng. Nó được nạp vào ứng dụng và khởi chạy JS thread để thực thi các đoạn mã Javascript. Luồng native cũng sẽ lắng nghe các sự UI như ‘press’, ‘touch’,.. Các sự kiện này được chuyển tới luồng JS qua RN Bridge. Mỗi lần Javascript nạp, luồng JS gửi thông tin những thứ cần thiết để hiện lên màn hình. Những thông tin này được sử dụng bởi **shadow node thread** để tính toán các bố cục. The shadow thread đơn giản giống như một công cụ toán học đưa ra các quyết định cuối cùng cách tính toán vị trí của view. Các lệnh này sau đó được truyền trả lại cho main thread để hiển thị view lên giao diện.
    ## 2. Javascript thread (*JS Queue*)
    * Đây là hàng đợi luồng được chạy bởi main bundled JS thread đã nói ở bên trên. Luồng này chạy tất cả các business logic,... code được viết bằng React Native.
    ## 3. Custom Native Modules 
    * Phần luồng được sinh ra bởi Reat Native, chúng ta có thể sinh ra các luồng trên custom native modules do chúng ta xây dụng để tăng hiệu năng của ứng dụng. Ví dụ: Animations được xử lý trong React Native bằng một luồng native riêng biệt thực hiện các các việc từ luồng JS.
# View Manager
* View Manager là một native module giúp ánh xạ JSX Views tới Native views. Ví dụ: 
```javascript
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

* Khi chúng ta viết `<Text />`, Text View Manager sẽ thực thi `new TextView(getContext())` trong trường hợp là Android
View Managers là một class đơn giản kế thừa `ViewManager` trong Android và là một subclasses của `RTCViewManager` trong IOS
# Development mode
* Khi ứng dụng chạy với chế độ **DEV**, luồng Javascript sẽ sinh ra một máy development machine. Ngay cả khi mà JS code đang chạy trên một thiết bị mạnh mẽ hơn so với điện thoại, bạn sẽ sớm nhận biết được hiệu suất thấp hơn đáng kể so với bundled mode và production mode. Điều này là không thể tránh khỏi vì rất nhiều công việc được thực hiện trong DEV mode tại runtime để cung cấp các warning và error mesages cho nhà phát triển. Hơn nữa độ trễ của việc giao tiếp giữa thiết bị và luồng JS cũng xảy ra.
> Cảm ơn bạn đã đọc bài viết của mình!