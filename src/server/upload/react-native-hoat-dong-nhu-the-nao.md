Chắc hẳn rất nhiều dev đã nghe tới React Native, nhưng nó hoạt động như thế nào ? Nó khác gì so với ReactJS dành cho web development ?
Bài viết này sẽ giúp chúng ta đi vào trả lời một phần vấn đề trên!!!. Let's GOOOOOOOOOOOOOO :red_car: :car: :checkered_flag:

## How does React Native work?
Ý tưởng viết mobile apps trong JavaScript có vẻ hơi lạ. Làm sao để sử dụng React hoạt động đới với môi trường phát triển mobile. Để hiểu về nền tảng kỹ thuật của React Native. Đầu tiên chúng ta sẽ cần nhớ lại một trong những tính năng của React đó là Virtual DOM

Trong React, Virtual DOM hoạt động như một layer giữa mô tả về cách hiển thị mọi thứ và công việc được thực hiện để hiển thị trên page.
Để hiển thị UI trên browser, developer phải sửa DOM(Document Object Model) của browser. Đây là cách tốn hiệu năng vì viết lại DOM nhiều lần sẽ tác động đáng kể đến performance. Thay vì thay đổi trực tiếp trên page, React tính toán những thay đổi cần thiết bằng cách sử dụng một phiên bản bộ nhớ của DOM hay nói cách khác là một bản sao của DOM và hiển thị lại những thay đổi cần thiết. Dưới đây là hình ảnh mô tả cho hoạt động của React
![](https://images.viblo.asia/76dad722-cce3-487d-b77f-b2a0359b23cc.png)

Dưới đây là cách mà React Native hoạt động. Thay vì render DOM của browser, Reat Native gọi Objective-C API để hiển thị lên iOS component, hoặc Java API để hiển thị Android component
![](https://images.viblo.asia/6c5368ef-6d9e-4819-8e4e-f9e77ee6209b.png)

**Bridge** là cầu nối giữa các React Component với native UI element tương ứng ví dụ như `View` có thể là iOS `UIView`. React Native hiện tại support cho Android và iOS. Bởi vì abtraction layer được cung cấp bởi Vitural DOM. React Native cũng có thể nhắm đến nhiều platform khác. "*Target platform là gì không quan trọng, quan trọng là cần bridge*"

## Rendering Lifecycle
Khi React chạy trong browser, vòng đời bắt đầu khi mounting các React Component
![](https://images.viblo.asia/b1ac0979-e827-4d62-a209-812288bead15.png)
Sau đó React xử lý việc rendering và rerendering các component nào cần thiết
![](https://images.viblo.asia/6d6acc48-295f-44a3-bc4b-cb0a5503f56a.png)
Đối với trạng thái render, dev trả về HTML markup từ method `render` của React component mà React sau đó hiển thị trực tiếp vào page khi cần thiết

Với React Native thì vòng đời cũng tương tự, nhưng quá trình render hơi khác một chút vì React Native phụ thuộc vào bridge. Bidge biên dịch các mã JS và gọi platform của host, các API và các UI elements. Vì React Native không chạy trên main thread, nó có thể chạy bất đồng bộ nên nó không ảnh hưởng đến trải nghiệm của người dùng

Cảm ơn bạn đã theo dõi bài viết, Là một newbie mới vooc React Native nên có rất nhiều hạn chế về kiến thức mong bạn comment để cùng phát triển.

## From zero... - learn the basics
- React Native giống React nhưng nó sử dụng Native component thay cho web component để build các block. Để hiểu hơn về cấu trúc cơ bản của một app React Native, chúng ta cần hiểu một số khái niệm cơ bản của React như là JSX, components, state, props. Nếu ta đã biết về chúng rồi thì cần học thêm một số khái niệm cụ thể của React Native như là Native component.
- Hãy cùng đến với `Hello World` quen thuộc.
```ReactJS
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View>
        <Text>Hello world!</Text>
      </View>
    );
  }
}
```
Nhìn có vẻ không giống như JavaScript nhỉ :D. Trước tiên ES6 là bộ cải tiến cho JavaScript - là một bộ tiêu chuẩn chính thức nhưng chưa hỗ trợ tất cả các trình duyệt. React Native cũng đã hỗ trợ ES6. `Import`, `extends` là ví dụ đầu tiên về tính năng của ES6. Bạn đang tự hỏi `<View>`, `<TextView>` là gì ?. Đây là JSX -  một syntax dùng để nhúng XML và JavaScript. Nhiều ngôn ngữ sử dụng template để nhúng code bên trong markup language. Với React thì điều này ngược lại, JSX cho phép bạn viết markup language bên trong code, nó giống như HTML trên web, thay vì sử dụng các `div`, `span` tag thì sử dụng React Component. Trong trường hợp này thì `<Text>` là một thành phần tích hợp chỉ hiển thị một số văn bản và `View` giống như `div` hoặc `span`

> Refs: Learning React Native - Google