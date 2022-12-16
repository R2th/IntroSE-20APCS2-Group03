# Mở đầu
Ở phần trước mình đã giới thiệu với các bạn về thư viện React Navigation, cách cài đặt và một số thuộc tính cơ bản. Sau đây mình xin giới thiệu sâu hơn về thư viện này.

![](https://images.viblo.asia/ed1af836-2f90-43cf-911c-ffb197cb3b67.jpeg)
# Navigation lifecycle
Ở phần trước chúng ta sử dụng React navigation để di chuyển giữa 2 màn hình Home và Details thông qua this.props.navigation.navigate('Details') vậy khi đó thì chuyện gì sẽ xảy ra với màn hình Home khi chúng ta rời đi và quay trở lại màn hình đó? Và khi đó làm như thế nào mà màn hình Home biết được rằng người dùng đã chuyển màn hình hay đã quay trở lại ? 
Trên phiên bản web thì khi người dùng điều hướng từ A đến B thì A sẽ unmount (componentWillUnmount sẽ được gọi)  và A sẽ mount lại khi nguời dùng quay trở lại. Mặc dù các phương thức vòng đời này vẫn còn được sử dụng nhưng so với điều hướng trên di động sẽ có nhiều phức tạp hơn. 
Ví dụ khi chúng ta có 1 stack navigator với 2 màn hình là A và B. Khi chúng ta navigate đến A thì componentDidMount sẽ được gọi, sau đó chúng ta thêm B vào thì componentDidMount của nó cũng sẽ được gọi, nhưng A vẫn ở trên stack vì componentWillUnmount của nó vẫn chưa được gọi. Và khi ta quay lại A từ B thì componentDIdMount của A sẽ không được gọi vì A vẫn mount trong suốt quá trình. Vậy để biết màn hình A đẽ bị che và khi nào từ B quay lại A chúng ta sử dụng:

*  Các events như: willFocus, willBlur, didFocus, didBlur. Các bạn có thể tìm hiểu thêm tại [đây](https://reactnavigation.org/docs/en/navigation-prop.html#addlistener-subscribe-to-updates-to-navigation-lifecycle)
*  Sử dụng withNavigationFocus là 1 high order component có thể pass isFocused prop vào trong wrapped component. Nó sẽ hữu ích nếu bạn cần sử dụng trạng thái focus trong hàm render của màn hình hoặc thành phần khác được hiển thị ở đâu đó bên trong màn hình. Đọc thêm ở [đây](https://reactnavigation.org/docs/en/with-navigation-focus.html)
*  Cách cuối cùng ở đây mình muốn giới thiệu có chút đơn giản hơn sơ với 2 cách trên. Chúng ta sử dụng thẻ <NavigationEvents /> để bắt các sự thay đổi của màn hình.
```js
 <NavigationEvents
      onWillFocus={payload => console.log('will focus',payload)}
      onDidFocus={payload => console.log('did focus',payload)}
      onWillBlur={payload => console.log('will blur',payload)}
      onDidBlur={payload => console.log('did blur',payload)}
    />
```

# Truyền data tới các màn hình
1. Ở màn hình gửi: Chúng ta sử dụng `this.props.navigation.navigate('RouteName', { /* params go here */ })`  để navigate tới màn hình và sau tên màn hình cần đến là nơi chúng ta sẽ truyền param vào 
```js
 this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
 });
```
2. Ở màn hình nhận param chúng ta sẽ sử dụng `this.props.navigation.getParam(paramName, defaultValue)` để lấy data
```js
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');
```
* Bạn có thể sử dụng `this.props.navigation.state.params` để get data nhưng nó có thể null nếu như không có tham số nào được cung cấp do đó chúng ta nên sử dụng getParams để tránh những trường hợp không mong muốn. 
* Nếu bạn muốn truy caạp trực tiếp thông qua props thay vì sử dụng `this.props.navigation.state.params`  bạn có thể sử dụng 
[react-navigation-props-mapper](https://github.com/vonovak/react-navigation-props-mapper)

# Authentication flows
Hầu hết các ứng dụng đều yêu cầu người dùng đăng nhập để có quyền truy cập vào ứng dụng, thông thường chúng ta sẽ đi theo flow này:
* User mở app
* Ứng dụng tải 1 số trạng thái xác thực từ bộ nhớ
* Sau khi tải xong, màn hình sẽ xuất hiện đăng nhập hay là vào trong ứng dụng tùy vào trạng thái đã đăng nhập hay chưa.
* Sau khi user đăng xuất sẽ xóa trạng thái dăng nhập và gửi lại cho màn hình đăng nhập
Để đáp ứng được những nhu cầu như vậy chúng ta cần phải sử dụng `SwitchNavigator` thay thế cho `StackNavigator` . Vậy SwitchNavigator là gì ?

![](https://images.viblo.asia/cb8b33c4-ba59-4aad-acde-40436df4cb14.png)


Mục đích của SwitchNavigator là chỉ hiển thị một màn hình tại một thời điểm. Theo mặc định, nó không xử lý các hành động trở lại và nó đặt lại route về trạng thái mặc định của chúng khi bạn chuyển đi. Đây là hành vi chính xác mà chúng ta muốn từ luồng xác thực.

Sử dụng bằng cách gọi:  `createSwitchNavigator(RouteConfigs, SwitchNavigatorConfig);`

* RouterConfigs tương tự như khi chúng ta sử dụng StackNavigator
* SwitchNavigatorConfig gồm các tham số:

    * initialRouteName: Tên của màn hình ban đầu
    * navigationOptions: tùy chỉnh lại navigation
    * defaultNavigationOptions: default navigation option 
    * resetOnBlur: đặt lại trnajg thái của navigators khi chuyển khỏi màn hình. mặc định là true.
    * paths: Cung cấp một ánh xạ của routeName vào đường dẫn cấu hình, ghi đè các đường dẫn được đặt trong routeConfigs.
  
  Ngoài việc sử dụng SwitchNavigator bình thường, ReactNavigation còn cung cấp cho chúng ta các animation khi chuyển screen từ màn hình Auth sang màn hình chính của ứng dụng bằng cách sử dụng `createAnimatedSwitchNavigator`. Để sử dụng chúng ta cần phải cài đặt thư viện `react-native-reanimated >= 1.0.0` 
  ```js
  import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
  createAnimatedSwitchNavigator(RouteConfigs, SwitchNavigatorConfig);
  ```
  
  Sự khác biệt ở đây là phần `SwitchNavigatorConfig` thay vì tạo như bình thường chúng ta sử dụng chúng ta thêm transition 
  ```js
  import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
  import { Transition } from 'react-native-reanimated';

  const MySwitch = createAnimatedSwitchNavigator(
  {
    Home: HomeScreen,
    Other: OtherScreen,
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
       <Transition.Together>
         <Transition.Out
           type="slide-bottom"
           durationMs={400}
           interpolation="easeIn"
         />
         <Transition.In type="fade" durationMs={500} />
       </Transition.Together>
     ),
   }
  );
  ```
  
*   durationMs: thời gian diễn ra animation đơn vị ms
*   delayMs: thời gian nếu muốn delay trước khi bắt đầu animation
*   interpolation: có 4 loại linear, easeIn, easeOut, easeInOut
*   <Transition.In>: chọn chế độ khi bắt đầu animation như fade, scale, slide-top, slide-bottom, slide-left, slide-right.
*   <Transition.Out>: chọn chế độ khi kết thúc animation
*   <Transition.Together>:  Các hiệu ứng chuyển tiếp được lồng trong thành phần này sẽ chạy song song khi hoạt ảnh bắt đầu
*   <Transition.Sequence>: Các chuyển đổi được lồng trong thành phần này sẽ chạy theo thứ tự mà chúng được liệt kê

# Tham Khảo
Bài viết có tham khảo từ https://reactnavigation.org/en/