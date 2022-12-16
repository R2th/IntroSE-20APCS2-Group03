`React Native` (*RN*) là một *framework* cho phép *deverloper* *build* một *native* app sử dụng ngôn ngữ *Javascript* (*JS*). Có vẻ quen thuộc đối với *cross platform developer*, trước đây các bạn cũng đã từng nghe đến hoặc từng thử dùng `Cordova`, và sự thật đau buồn là *Cordova* đã gần như rơi vào quên lãng. Vậy thì lý do gì bạn lại muốn dùng *React Native*?

Điểm khác biệt chính giữa ứng dụng *RN* và *Cordova* đó là ứng dụng *Cordova* chạy bên trong một *Webview*, trong khi ứng dụng bên *RN* lại *render* sử dụng *native View*. Ứng dụng *RN* truy cập trực tiếp vào các *Native API* và *View* cung cấp bởi chính hệ điều hành. Vì thế chạy các ứng dụng *RN* có cảm giác giống và hiệu suất khá tốt với một ứng dụng *native*.

Ban đầu, có nhiều giả định rằng *RN* có thể *compile JS code* sang *native code* một cách trực tiếp. Nhưng điều đó thực sự khó để đạt được vì *Java* lẫn *Objective C* là những ngôn ngữ `strongly typed` trong khi *JS* thì là khác (dùng cả `Dynamically and Weakly typed`), vì thế , *RN* sẽ làm cách thông minh hơn, trong bài viết này chúng ta sẽ tìm hiểu cách *RN* hoạt động. 

### Architecture

Về cơ bản, *RN* có thể được coi là tập các *React component*, trong đó, mỗi *component* sẽ đại diện cho các *Native View* và *Component* tương ứng. Vì thế, *developer* có thể viết code giống như *React webapp* nhưng *output* lại là một ứng dụng *native*.

Ex: Một `TextInput` *component* trong *RN* sẽ tương ứng với một *native* `EditText` trong *Android*.

Vậy quá trình chuyển từ *React component* sang *native View* diễn ra như thế nào? Hãy đi sâu vào kiến trúc bên trong của *RN*:

Nhìn một cách tổng quan, có 3 phần chính từ *RN platform*:

**1. Native Code/Modules**: Hầu hết các *native code* trong *iOS* được viết bởi *Objective C* hoặc *Swift*, trong *android* là *Java*. Đôi khi một ứng dụng cần truy cập các *platform API* và *RN* không có các *module* tương ứng. Có thể bạn sẽ cần phải tái sử dụng các *native code* để tránh phải *re-implement* bằng *JS code*, hoặc có thể viết các đoạn code yêu cầu *performance* cao, xử lý *multi thread* như *image processing, database*...

*RN* cho phép bạn viết bằng *native code* thực sự để truy cập tối đa *platform api*. Đây thực sự là một tính năng nổi bật, tuy đây không phải là điều mà *RN* mong muốn (có thể là mong muốn là làm toàn bộ bằng *JS*), nhưng nếu *RN* không *support* bạn hoàn toàn có thể tự *build* các *module* này bằng *native code*.

Bạn có thể xem thêm [ví dụ cụ thể về native module cho android tại đây](https://facebook.github.io/react-native/docs/native-modules-android.html)

**2. Javascript VM**: *JS virtual machine* là nơi thực thi phần *JS code*. Trong *android/iOS simulator* hoặc *device*, *RN* sẽ dùng các *JavaScriptCore*, đây là *opensource* *Javascript engine* thường được *build* cho *Webkit*. Trong trường hợp *iOS*, *RN* sẽ dùng *JavaScriptCore* cung cấp bở *iOS platform*. Còn đối với *android*, *RN* sẽ gói kèm *JavaScriptCore* trong ứng dụng, điều này làm cho *size* của ứng dụng *RN* của *android* tăng lên một ít. Trường hợp với *Chrome debugging mode*, *JS code* sẽ chạy trực tiếp trên chính *Chrome* và giao tiếp với *Native code* thông qua *WebSocket*, điều này cho phép chúng ta xem được hàng tá thông tin trên *Chrome debugging tool* như *network request, console logs...*.

**3. React Native Bridge**: là một cầu nối `C++/Java` có trách nhiệm giao tiếp giữa các *native thread* và *JS thread*. Một *custom protocol* được dùng để trao đổi *message* 
![The communication of these parts](https://images.viblo.asia/f245d550-4495-4622-b00c-671b55b4e46c.png)

Trong hầu hết các trường hợp, một *developer* sẽ viết ứng dụng *React Native* bằng *JS*. Để chạy ứng dụng sẽ dùng *command* đưa ra bởi *CLI* `react-natvie run-ios` hoặc `react-native run-android`. Ở đây, *React Native CLI* sẽ sinh ra một `packager/bundler` mà sẽ đóng gói toàn bộ *code JS* vào một *file* gọi là `main.bundle.js` (Bạn có thể *extract file APK* để xem, lưu ý là *file* này chỉ có trong *release mode*). 

`Packager` có thể xem tương tự như một `Webpack`. Bây giờ, bất cứ khi nào ứng dụng khởi chạy, *item* đầu tiên được tải là *Native entry point* (hay `AppRegistry`). *Native thread* sinh ra *JS VM thread* mà sẽ dùng để chạy *code JS* kèm theo. 

*Code JS* sẽ chứa tất cả các *business logic* của ứng dụng. *Native thread* gởi *message* thông qua *RN Bridge* để chạy ứng dụng *JS*. Lúc này, *JS thread* được sinh ra sẽ bắt đầu đưa ra các *instruction* (hướng dẫn) cho *Native thread* thông qua *RN Bridge*. Các *instruction* này bao gồm *View* nào để khởi chạy, thông tin nào được lấy ra từ phần cứng ... Ví dụ, nếu *JS thread* muốn một *View* và *Text* được tạo, nó sẽ gởi yêu cầu vào một *message* đơn và gửi nó đến *Native thread* để  *render* chúng.

> Message dạng: `[ [2,3,[2,'Text',{...}]] [2,3,[3,'View',{...}]] ]`

*Native thread* sẽ thực thi những tác vụ này và gởi kết quả ngược trở lại *JS* đảm bảo rằng các tác vụ đã được thực hiện.
Để xem *bridge message* trên *console*, hãy thêm đoạn mã này vào *file* `index.<platform>.js`
    
```js
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';
MessageQueue.spy(true);
```

### Threading Model
Khi ứng dụng *React Native* được khởi chạy, nó sẽ sinh ra các *threading queues* sau:

**1. Main Thread (Native Queue):** được sinh ra ngay lúc ứng dụng khởi chạy. Nó sẽ *load app và start JS thread* để thực thi *JS code*. *Native  thread* cũng lắng nghe các sự kiện *UI* như *click, touch*... Những sự kiện (event) này sẽ truyền sang *JS thread* thông qua *RN Bridge*. Một khi *JS load*, *JS thread* gởi thông tin cần *render* lên màn hình. Những thông tin này được sử dụng bởi `shadow node thread` để tính toán *layout*. *Shadow thread* cơ bản giống như bộ máy tính toán để đưa ra quyết định cuối cùng về các vị trí của *View* trong *layout*. Các *instruction* này sau đó sẽ trả ngược về *Main thread* để *render* lên *View*.

**2. Javascript thread (JS Queue):** là *thread queue* là nơi các *JS thread* chạy. *JS thread* chạy tất cả các *business logic* của ứng dụng.

**3. Custom Native Modules:** Một phần *thread* sinh ra bởi *React Native*, chúng ta cũng có thể sinh ra những *thread* này trên một *custom native module* để tăng tốc *performance* của ứng dụng. Ví dụ, *Animation* được *handle* trong *React Native* bằng một *native thread* để giảm tải cho *JS thread*.

![This is threading models in React native](https://images.viblo.asia/83ff7be0-db99-4fe9-9a2f-21710dae8b4d.png)

### View Managers
Là một *native module* dùng map các *JSX View* sang các *Native Views*.

> Toàn bộ gói *View Managers* và các thành phần khác của *react* được chứa trong package `com.facebook.react`, bạn có thể [`decompile` 1 *file apk*](https://stackoverflow.com/questions/3593420/is-there-a-way-to-get-the-source-code-from-an-apk-file) bất kì.

Ex:
```js
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
Ở đây khi chúng ta tạo `<Text/>`, `TextViewManager` sẽ gọi `new TextView(getContext())` trong trường hợp `android`. `View Manager` cơ bản là các *class extend* từ `ViewManager` trong *android* hoặc `RCTViewManager` trong *iOS*.

### Development mode
Khi ứng dụng chạy ở *DEV mode*, *JS thread* được sinh ra trên *development machine*. Mặc dù *JS code* đang chạy trên một máy mạnh hơn so với một chiếc điện thoại, bạn vẫn sẽ cảm nhận được tốc độ chạy của nó sẽ chậm hơn so với khi build ở *PRODUCTION mode*. Điều này là không thể tránh vì rất nhiều công việc được thực thi ở *DEV mode* lúc *runtime* để cung cấp những cảnh báo, thông báo lỗi như *validate propTypes* và một số *assertion* khác. Ngoài ra, độ trễ của giao tiếp giữa thiết bị và *JS thread* cũng là 1 nguyên nhân.

#### References 
https://facebook.github.io/react-native/

https://www.reactnative.guide/3-react-native-internals/3.1-react-native-internals.html

https://www.youtube.com/watch?v=0MlT74erp60

https://www.youtube.com/watch?v=8N4f4h6SThc