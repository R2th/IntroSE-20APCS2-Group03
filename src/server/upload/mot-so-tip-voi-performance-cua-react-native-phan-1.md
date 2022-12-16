## How React native applications work?

React Native là một framework cho phép developer build một native app sử dụng JS. Có vẻ từ **cross platform** bạn đã từng nghe qua hoặc có thể đã sử dụng như Cordova. Sự thật đau buồn thay Cordova đã gần như rơi vào lãng quên. Vậy lý do gì muốn bạn lại muốn sử dụng React Native ?

Điểm khác biệt chính giữa React Native và Cordova là Cordova chạy trên một webview, trong khi RN lại render trên Native view. Ứng dụng Rn truy cập trực tiếp vào các Native api và view được cung cấp bởi các platfrom cụ thể thông qua bridge giữa JS và native code. Vì vậy ứng dụng RN cho cảm giác giống và hiệu năng khá tốt với một ứng dụng Native

Ban đầu, có nhiều giả định rằng React Native có thể compile JS code sang native một cách trực tiếp. Nhưng điều đó thực sự khó có thể xảy ra khi mà Java lẫn obj-c là những ngôn ngữ dạng **strongly typed** trong khi JS thì khác ( dùng cả **dynamically** lẫn **weakly typed** ) vì vậy RN sẽ xử lý thông minh hơn, chúng ta sẽ tìm hiểu React Native dã làm như thế nào (?)

> Ok! This looks like black magic 🙄.

### Architecture 🤖

Về cơ bản React Native được coi là tập hợp các react component cấu thành nên, mỗi một component sẽ đại diện cho một native view tương ứng. Ví dụ Textinput sẽ tương ứng với EditText trong Android hay TextField trong IOS .

![](https://images.viblo.asia/3bcc1b1d-d194-441d-80b2-1439f1b230b4.png)

**1. Native Code/ Modules** : Hầu hết các native code trong IOS được viết bằng obj-c hoặc swift, trong Android bằng Java hoặc Kotlin. Đôi khi một ứng dụng cần truy cập các platform API và RN không có các module tương ứng. Có thể bạn cần tái sử dụng native code hoặc có thể viết các đoạn code có performance cao, xử lý multi thread như image processing, I/O database…
RN cho phép bạn viết native code thực sự để truy cập tối đa platform API. Đây là điểm nổi bật của RN so với các platform cross trước đây, tuy không phải là điều mà RN muốn, nhưng nếu RN không thể hỗ trợ bạn hoàn toàn, bạn có thể [làm điều đó với native code](https://reactnative.dev/docs/native-modules-android.html) 

**2. JVM** : có thể lúc đọc trong đầu bạn sẽ có suy nghĩ Java virtual machine trong Java (yaoming) 
![](https://images.viblo.asia/69215212-9275-481d-a364-453f7ec81e19.jpg)
Thực tế nó là javascript virtual machine nơi thực thi JS code . Trong android/iOS, RN sẽ dung JavaScriptCore, đây là opensource javascript engine thường được build cho Webkit. Trong TH của IOS, RN sẽ dùng JavaScriptCore cung cấp bới IOS platformm, nó được giới thiệu lần đầu tiên trong iOS 7 cùng với OS X Mavericks. Còn đối với Android, RN sẽ build kèm gói JavascriptCore trong ứng dụng => dẫn đến size application của ứng dụng tăng lên một ít. 

> Do đó, ứng dụng Hello World của RN sẽ mất khoảng 3 đến 4 megabyte cho Android.

Trường hợp Chrome Debug Mode , JS code sẽ chạy trực tiếp trên chính chrome và giao tiếp với native code thông qua Websocket => điều này show cho chúng ta một đống thông tin như network request, console logs, etc. 😎

**3.  React Native Bridge:** 

![](https://images.viblo.asia/2bf1c0a1-0098-4ee3-b876-5550b0db6dbe.png)
![](https://images.viblo.asia/0f642be7-fd85-4522-a773-33ba769faa16.png)
Bạn có thấy sự khác biệt giữa RN và Flutter không :stuck_out_tongue_winking_eye:

Là một cầu nối C++/Java có trách nhiệm giao tiếp giữa các Native thread và JS thread. Một custom protocol được dùng để trao đổi message. 

Trong hầu hết các trường hợp, một developer sẽ viết ứng dụng RN bằng JS, để chạy ứng dụng sử dụng command CLI *react-native run-ios* hoặc* run-android*. Ở đây react-native CLI sẽ sinh ra một ***packager/bundler***  để đóng gói toàn bộ JS code và một file gọi là **main.bundle.js**

Packager có thể xem tương tự như một Webpack. Bây giờ, bất cứ khi nào ứng dụng khởi chạy, item đầu tiên được tải là Native entry point (hay AppRegistry). Native thread sinh ra JS VM thread mà sẽ dùng để chạy code JS kèm theo.

Code JS sẽ chứa tất cả các business logic của ứng dụng. Native thread gửi message thông qua RN Bridge để chạy ứng dụng JS. Lúc này, JS thread được sinh ra sẽ bắt đầu đưa ra các instruction (hướng dẫn) cho Native thread thông qua RN Bridge. Các instruction này bao gồm View nào để khởi chạy, thông tin nào được lấy ra từ phần cứng ... Ví dụ, nếu JS thread muốn một View và Text được tạo, nó sẽ gửi yêu cầu vào một message đơn và gửi nó đến Native thread để render chúng.

> [ [2,3,[2,'Text',{...}]] [2,3,[3,'View',{...}]] ]

Native thread sẽ thực thi những tác vụ này và gởi kết quả ngược trở lại JS đảm bảo rằng các tác vụ đã được thực hiện.

### Threading Model 🚧

**1. Main Thread (Native Queue):** được sinh ra ngay lúc ứng dụng khởi chạy. Nó sẽ load app và start JS thread để thực thi JS code. Native thread cũng lắng nghe các sự kiện UI như click, touch... Những sự kiện (event) này sẽ truyền sang JS thread thông qua RN Bridge. Một khi JS load, JS thread gởi thông tin cần render lên màn hình. Những thông tin này được sử dụng bởi shadow node thread để tính toán layout. Shadow thread cơ bản giống như bộ máy tính toán để đưa ra quyết định cuối cùng về các vị trí của View trong layout. Các instruction này sau đó sẽ trả ngược về Main thread để render lên View.

**2. Javascript thread (JS Queue):** là thread queue là nơi các JS thread chạy. JS thread chạy tất cả các business logic của ứng dụng.

**3. Custom Native Modules:** Một phần thread sinh ra bởi React Native, chúng ta cũng có thể sinh ra những thread này trên một custom native module để tăng tốc performance của ứng dụng. Ví dụ, Animation được handle trong React Native bằng một native thread để giảm tải cho JS thread.

### View Managers 👓

Là một native module dùng map các JSX View sang các Native Views.

> Toàn bộ gói View Managers và các thành phần khác của react được chứa trong package com.facebook.react, bạn có thể decompile 1 file apk bất kì.

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

Ở đây khi chúng ta tạo <Text/>, TextViewManager sẽ gọi new TextView(getContext()) trong trường hợp android. View Manager cơ bản là các class extend từ ViewManager trong android hoặc RCTViewManager trong iOS.

### Development mode 🔨

Khi ứng dụng chạy ở DEV mode, JS thread được sinh ra trên development machine. Mặc dù JS code đang chạy trên một máy mạnh hơn so với một chiếc điện thoại, bạn vẫn sẽ cảm nhận được tốc độ chạy của nó sẽ chậm hơn so với khi build ở *PRODUCTION* mode. Điều này là không thể tránh vì rất nhiều công việc được thực thi ở DEV mode lúc runtime để cung cấp những cảnh báo, thông báo lỗi như validate propTypes và một số assertion khác. Ngoài ra, độ trễ của giao tiếp giữa thiết bị và JS thread cũng là 1 nguyên nhân.

## Hunting memory leaks in React Native apps

![](https://images.viblo.asia/46abbe33-5ca3-463c-bb12-a92824528eb8.jpg)

Trong JS, memory được quản lý tự động bởi [Garbage Collector (GC)] (https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) . GC là một backgroud process , một anh quản lý đô thị có những chuyến kiểm tra định kỳ bản đồ quy hoạnh nhà cửa đất cát của các hộ dân ( objects ). Nếu tình cờ gặp một ngôi nhà hay một mảnh đất không có chủ sở hữu trực tiếp hay gián tiếp sẽ bị ban quản lý thu lại và bán cho các hộ dân cần nó ( giải phóng bộ nhớ cho các object khác cần dùng).

> Nhiều bạn sẽ lầm tưởng rằng các ngôn ngữ dựa trên Garbage Collection (GC) để quản lý bộ nhớ ( như Java, Javascript ) có khả năng ngăn cản memory leaks

Để mình chỉ cho bạn một ví dụ, trong một ngôi nhà có bạn và bố mẹ , có thể coi đây 2 reference cho 1 đối tượng là ngôi nhà. Khi bạn lớn lên và sống tự lập, bạn rời khỏi ngôi nhà ( reference của bạn đến đối tượng nhà bị xóa bỏ ) nhưng vẫn còn reference là bố mẹ bạn. Vậy nên khi anh quản lý đô thị (GC) đi kiểm tra vẫn thấy object còn reference đến nó dẫn đến object đó không được giải phóng

Dưới đây là một số lỗi phổ biến trong một ứng dụng React native dẫn đến memory leaks:
### 1. Unreleased timers/listeners added in componentDidMount

```
class Composer extends Component {
  state = { showAccessory: false }
  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', () => this.setState({ showAccessory: true }));
    Keyboard.addListener('keyboardDidHide', () => this.setState({ showAccessory: false }));
  }

  render() {
    return (
      <View>
        <EditTextComponent />
        {this.state.showAccessory && <AccessoryView />}
      </View>
    );
  }
}
```

Trong ví dụ trên, chúng ta lắng nghe sự kiện **keyboardDidShow** và **keyboardDidHide** để lưu giữ trạng thái hiện tại của keyboard như là một state của component. Sự kiện được đăng ký khi component được render xong, nhưng dường như ở ví dụ trên sự kiện trên sẽ không bao giờ bị remove đi. Do đó, chúng ta vẫn nhận được các event ngay cả khi component unmounted. Đồng thời, Keyboard module sẽ giữa lại các danh sách các active listeners trong global scope. Cụ thể trong TH này nó sẽ giữ những thông tin trong arrows function được truyền thông qua phương thức addListener. Lần lượt, arrow functions giữ *this* -   reference của Composer component. Để lần lượt truy cập properties của nó thông qua this.props. Con của nó this.props.children, con của con nó, etc... Lỗi này đơn giản dẫn đến vùng nhớ rất bị giữ lại rất lớn do các reference giữ lại. Trong TH trên chúng ta có thể remove listeners trong **componentWillUnmount**

```
class Composer extends Component {
  state = { showAccessory: false };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this.setState({ showAccessory: true })
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.setState({ showAccessory: false })
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    return (
      <View>
        <EditTextComponent />
        {this.state.showAccessory && <AccessoryView />}
      </View>
    );
  }
}}
```

**Luôn luôn nhớ rằng :**

> Nếu component của bạn có đăng ký lắng nghe hoặc sử dụng setTimeOut, setInterval hoặc sử dụng những method dưới dạng một callback funtion. Hãy chắc chắn rằng nhưng listener và callback được xoá bỏ hoàn toàn khi mà component unmounts.

Để giải quyết vấn đề trên chúng ta có thể tham khảo [HOC ( Higher-Order Components )](https://medium.com/@bosung90/use-higher-order-component-in-react-native-df44e634e860).

### 2. Closure scope leaks

Một cách đơn giản,** Closure scope** có nghĩa là hàm nằm trong phạm vi của hàm khác có thể tham chiếu tới các biến của hàm bao nó. Vậy tại sao closure có thể gây ra memory lake, hãy xem ví dụ dưới đây:

```
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing)
      console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(someMessage);
    }
  };
};
setInterval(replaceThing, 1000);
```

Trong ví dụ trên mỗi khi replaceThing được gọi, theThing sẽ tạo ra một mảng chưa 1.000.000 phần từ * và một closures ( someMethod ). Cùng lúc đó biến unused cũng chưa một closure giữa tham chiếu đến originaThing ( là obj theThing được tạo ra từ lúc replaceThing được khởi tạo trước đó.
Một điều quan trọng là khi một scope được tạo ra, các closure có cùng scope cha sẽ chia sẻ chung scope đó. Ở trên unused và someMethod cùng chia sẻ một scope. Mặc dù unused không được gọi đến nhưng nó có giữ tham chiếu đến originalThing ( instance của originalThing ) nên GC coi nó vẫn đang hoạt động và không thể giải phóng bộ nhớ được. Khi đoạn code này chạy bộ nhớ sẽ được cấp phát liên tục sau mỗi 1000 milisecond , về bản chất nó sẽ tạo một linked-list các closure (root là theThing) .

### Does my app leak memory?

Thông thường, khá khó để biết ứng dụng có bị rò rỉ hay không - đặc biệt là đôi khi các rò rỉ quá nhỏ đến mức hầu như không thể nhận thấy. Cách tiếp cận tốt nhất là phân tích một quy trình công việc trong ứng dụng của bạn mà bạn mong đợi là trung tính bộ nhớ, tức là, một chuỗi các bước không nên dẫn đến bất kỳ đối tượng mới nào được giữ lại. Ví dụ: điều hướng đến một màn hình mới và quay lại màn hình trước đó, hoặc thêm và xóa các mục khỏi danh sách là cả hai tình huống mà trong hầu hết các trường hợp không nên tăng mức sử dụng bộ nhớ. Nếu một quy trình công việc như vậy dẫn đến rò rỉ, bạn sẽ nhận thấy mức tiêu thụ bộ nhớ của ứng dụng của bạn sẽ tăng lên sau khi bạn lặp lại nó nhiều lần.

Cách dễ nhất để quan sát điều đó là bằng cách sử dụng *Instruments* trên iOS hoặc Android Studio Profiler cho Android. Cả hai công cụ này đều hiển thị tổng mức sử dụng bộ nhớ của ứng dụng - bao gồm cả bộ nhớ được cấp phát bởi JS, cũng như bộ nhớ được phân bổ bởi modules và views. Hãy cùng xem cách sử dụng chúng:

**I. Monitoring memory usage on iOS**
Sau khi khởi chạy ứng dụng từ Xcode, chọn "Debug navigator" (bước 1) và chọn phần Memory (bước 2):

![](https://images.viblo.asia/4fdce569-b314-4f68-a1fe-16fb0507021d.png)

Sử dụng ứng dụng của bạn trong một thời gian và xem cách sử dụng bộ nhớ, việc tracking thông qua debug navigator không hẳn đã chính xác nhưng cũng là một thông tin để chúng ta tham khảo màn hình đó có khả năng đang bị memory leak.
Tham khảo hình ở ví dụ trên, thực hiện open screen B từ screen A, tại screen B thực hiện call api đổ dữ liệu vào một Flatlist. Trực quan ta có thể thế memory khi vào screen B đều tăng lên do có thực hiện thay đổi bộ nhớ, memory sẽ giảm đi khi back lại màn hình A nếu ở đây không có hiện tượng memory leak, cứ như vậy tăng rồi lại giảm. Từ đó ta có thể đoán định màn hình này không có khả năng bị memory leak

![](https://images.viblo.asia/810349b2-12f4-4d7f-b201-924fe3b59081.png)

Nếu mức sử dụng bộ nhớ tăng sau một chuỗi các hành động ra vào màn hình đó, ứng dụng có khả năng bị rò rỉ bộ nhớ.

**2. Monitoring memory usage in Android Studio**

Khi kiểm tra ứng dụng của bạn trên Android, bạn có thể sử dụng các công cụ Android Studio Profiler. Đầu tiên, mở project của bạn với studio Android. Khi bạn đã kết nối thiết bị hoặc simulator và ứng dụng của bạn được khởi chạy, bạn nên điều hướng đến tab Prof Profiler ở phía dưới cùng và chọn phần MEMORY:

![](https://images.viblo.asia/5f199d7f-5b8f-46a7-9db7-92b9b61c2554.png)

Khi back từ screen B về A bộ nhớ không được giảm mà vẫn tăng, ở đây có thể gây ra memory leak 

## MUST READ!!!
- Sử dụng bản build prod ( staging ) với ứng dụng RN của bạn. Ở chế độ dev, một số module của RN sẽ giữ lại các objects để cung cấp các cảnh báo khi cần thiết. Một ví dụ , event pool của RN sẽ giữ lại các touch event đã được dispatched đến các component, nó sẽ giữ lại các reference đến các thành phần trước đó của component. Điều này không xảy ratreen bản prod ( staging ), vì thế sử dụng bản prod (staging) sẽ giúp bạn tránh được issues này 
- Sử dụng câu lệnh console.log. Khi bạn truyền một đối tượng đến console.log và kết nối Web Inspector, UI constroller sẽ giữ lại object để sau này bạn có thể mở rộng và kiểm tra nó.
- Như ở trên , việc in ra một object từ snapshot và thực hiện hot reload , giá trị của nó được giữ lại ở trước thời điểm hot reload, do có thể nó vẫn còn bị giữ reference chưa bị xoá bỏ. Để snapshot và in ra đúng , bạn nên reload lại app và reconnect đến web inspector.

## Unnecessary Renders

Mục tiêu: chia sẻ dưới đây nhằm mục đích làm rõ cách hoạt động của *React render()* và cách bạn có thể dễ dàng giảm số lần render() mà các component() của bạn thực hiện và tự động cải thiện hiệu suất ứng dụng / UI của bạn.

Lưu ý: bạn không cần phải tối ưu hóa quá sớm hoặc nếu bạn nghĩ rằng bạn không cần thiết phải làm nó. Tại sao lại vậy , bạn có thể tham khảo thêm ở [đây](https://stackify.com/premature-optimization-evil/#:~:text=%E2%80%9CPremature%20optimization%20is%20the%20root,famous%20saying%20among%20software%20developers.&text=%E2%80%9CThe%20real%20problem%20is%20that,of%20it) nha 

> The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil (or at least most of it) in programming.

nhưng chúng ta phải nắm vững được cách React render () hoạt động. Có một số cách tối ưu khá dễ để làm, bạn có thể sử dụng chúng trong dự án của mình

### Vậy, React render () hoạt động như thế nào?

**render()** được gọi như chúng ta biết mỗi lần props hoặc state có thay đổi trên component. Điều này ngay lập tức hàm render() sẽ render lại component và tất cả các con của nó. 
React sẽ áp dụng thuật toán đối chiếu ( [reconciliation algorithm](https://reactjs.org/docs/reconciliation.html) ) và xác định xem có component mới cần render không, các component không cần thiết nữa và có cần render lại các component đang tồn tại không. 

Khi component được khởi tạo, hàm render() được gọi sẽ thực hiện tạo một cây trên React elements. Với mỗi nextState và update props, render() sẽ tạo ra một cây khác với các component khác. Sau đó React sẽ tìm ra cách để cập nhật UI hiệu quả để phù hợp với cây mới được tạo.

Chính việc tạo thành một cây mới sẽ gây tốn hiệu năng và tài nguyên của app. Vấn đề đặt ra là phải tối thiệu thao tác chuyển đổi thành một cây khác. Tuy nhiên độ phức tạp của thuật toán có thể đạt đến mức O(n^3) với n là số phần tử trên cây.

Nếu sử dụng việc so sánh giữa 2 cây có sự khác nhau giữa các element sau đó đưa ra quyết định render , ví dụ có 1000 phần tử cần thực hiện 1 tỷ phép so sánh. Điều thật crazy. Thay vào đó React sẽ thực hiện thuật toán Heuristic O(n) dựa trên 2 giả định:

- 2 phần tử có kiểu khác nhau sẽ tạo ra các cây khác nhau
- Dev có thể gợi ý cho RN biết đó là các elements con nào ổn định qua các lần render với prop key

**The Diffing Algorithm**

RN sẽ so sánh 2 cây khác nhau. Trước tiên RN sẽ so sánh hai root elements trước. Bất cứ root element của 2 cây có kiểu khác nhau, RN sẽ xoá bỏ cây cũ và build một cây mới từ đầu. Ví dụ 

```
<View>
  <Counter />
</View>

<span>
  <Counter />
</span>
```
Nếu so sánh thấy 2 elements có cùng kiểu thì RN sẽ so sánh các thuộc tính của nó từ đó quyết định chỉ update lại các thuộc tính đó.

**Component Elements Of The Same Type**

Khi một component được update, instance của nó vẫn được giữ nguyên, để giữa được state của component trong quá trình renders. RN cập nhật props của instance sao cho match với element mới và gọi componentWillReceiveProps(), componentWillUpdate() để cập nhật prop cho instance.

**Recursing On Children**

Mặc định RN sẽ duyệt danh sách các child component bên trong component cha cho đến phát hiện có sự thay đổi
Ex: trong một ví dụ dưới đây, thêm một element vào cuối children, việc render của nó vẫn cho hiệu năng tốt

```
#Before:
<View>
  <Text>first</lText>
  <Text>second</Text>
</View>

#After: 
<View>
  <Text>first</Text>
  <Text>second</Text>
  <Text>third</Text>
</View>
```

React sẽ match 2 phần tử đầu tiên và insert phần tử thứ 3 vào tree. Nhưng nếu thực hiện add vào đầu tiên hiệu suất sẽ giảm

```
Before:
<View>
  <Text>first</lText>
  <Text>second</Text>
</View>

After: 
<View>
  <Text>third</Text>
  <Text>first</Text>
  <Text>second</Text>
</View>
```
RN sẽ phải cập nhật tất cả thay vì phát hiện phần tử trùng khớp

**Keys**

Để giải quyết vấn đề này, React hỗ trợ một thuộc tính quan trọng. Khi child có key, React sử dụng key để match chilrden. Ví dụ: thêm key sẽ dân đến việc chuyển đổi key hiệu quả

```
Before:
<View>
  <Text key=”1234”>first</lText>
  <Text key=“5678”>second</Text>
</View>

After: 
<View>
  <Text key=“2468”>third</Text>
  <Text key=”1234”>first</lText>
  <Text key=“5678”>second</Text>
</View>
```

Việc sử dụng key sẽ giúp RN nhận biết được sự thay đổi của view nào từ đó đưa ra quyết định có hay không render lại nó.

**NOTE:**
Vì vậy, như bạn có thể tưởng tượng, nếu bạn có một hệ thống phân cấp với views phức tạp và cũng có nhiều cập nhật State van props, được kích hoạt bởi các event khác nhau hoặc cập nhật trong store redux, điều này có thể dẫn đến nhiều render và tính toán không cần thiết.

Để làm cho điều này rõ ràng hơn, hãy để một ví dụ đơn giản. Làm một ứng dụng counter cơ bản
```
export class Counters extends Component {
  state = {
    counter1: 0,
    counter2: 0
  };
  render() {
    return (
      <View>
        <Button
          title={"Increase counter 1"}
          onPress={() => {
            this.setState({ counter1: this.state.counter1 + 1 });
          }}
        />
        <Button
          title={"Increase counter 2"}
          onPress={() => {
            this.setState({ counter2: this.state.counter2 + 1 });
          }}
        />
        <CounterDisplay value={this.state.counter1} />
        <CounterDisplay value={this.state.counter2} />
      </View>
    );
  }
}

class CounterDisplay extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.value}</Text>
      </View>
    );
  }
}
```
Ở ví dụ trên nhiều bạn sẽ nghĩ rằng khi click vào button đầu tiên, chỉ duy nhất couter1 thay đổi state nên khi render chỉ có mình counter 1 bị render lại, nhưng thực tế ở đây cả hai CouterDisplay đều được render lại, couter1 cập nhật giá trị mới còn couter2 thì vẫn giữ nguyên. Lý do là state được cập nhật hàm render() được kích hoạt, các child component trong đó đều bị render lại
Nếu với một small component như ví dụ trên thì hiệu năng chả thấm vào đâu. Nhưng hay tưởng tượng một màn hình với khoảng 20 component việc render lại toàn bộ chúng sẽ down hiệu năng của app như thế nào.

**Vậy làm thế nào để tối ưu hoá code tránh những render không cần thiết ?**

Ở phần tiếp theo mình sẽ giới thiệu về một số tip để tránh render lại code như 
- Sử dụng shouldComponentUpdate trong component hay sử dụng React Hook
-Khi nào nên sử dụng PureComponent hoặc Component