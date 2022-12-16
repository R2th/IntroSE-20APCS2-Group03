Khi bạn gọi **setState** ở trong một component, điều gì đã xảy ra?

```javascript
import React from "react";
import ReactDOM from "react-dom";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ clicked: true });
  }
  render() {
    if (this.state.clicked) {
      return <h1>Thanks</h1>;
    }
    return <button onClick={this.handleClick}>Click me!</button>;
  }
}

ReactDOM.render(<Button />, document.getElementById("container"));
```

Chắc bạn cũng biết rằng React sẽ re-renders lại components thay đổi **state** `{ clicked: true }` cập nhật DOM và return ra `<h1>Thanks</h1>`. Có vẻ dễ nhưng... thế React làm điều đó hay React DOM?

Cập nhật DOM nghe có vẻ như React DOM sẽ thực hiện điều trên nhưng rất tiếc là không phải :)). Mà cơ sở **React.Component** của chúng ta được định nghĩa bên trong chính React.

## Vậy làm thế nào để setState trong React.Component cập nhật DOM?

Chúng ta có thể nghĩ rằng lớp **React.Component** chứa logic cập nhật DOM. Nếu điều này xảy ra thì làm sao mà `this.setState()` có thể làm việc trong môi trường khác? Tỷ dụ một một component ở trong ứng dụng React Native cũng **extend React.Component** và chúng ta vẫn có thể gọi `this.setState()` như bên trên mặc cho React Native làm việc với native view của Android và IOS chứ không phải là DOM.

Như vậy, bằng một cách nào đó **React.Component đại diện xử lý cập nhật state trên nền tảng cụ thể.** Trước khi tìm hiểu xem điều gì đã xảy ra hãy tìm hiểu sâu hơn về cách phân tách gói và tại sao.

_Có một sai lầm phổ biến đó là *engine* React ở trong package *React* nhưng thật ra không phải_

Thực tế, kể từ khi [package split in React 0.14](https://reactjs.org/blog/2015/07/03/react-v0.14-beta-1.html#two-packages) thì gói React chỉ hiển thị API để defining components. Hầu hết các **implementation** của React đểu lives ở trong “renderers”. Một vài tỷ dụ của renderers như là _react-dom, react-dom/server, react-native, react-test-renderer, react-art_.

Đây là lý do tại sao mà gói **React** được sử dụng ở bất kể nền tảng nào. Tất cả các exports tỷ dụ như _React.Component, React.createElement, React.Children_ các utilities hay thậm chí cả Hooks đều độc lập với target platform. Cho dù bạn chạy _React DOM, React DOM Server, or React Native_ thì componets của bạn sẽ import và sử dụng chúng theo cùng một cách.

Ngược lại các gói dành riêng cho nền tảng tỷ dụ như _ReactDOM.render()_ cho phép bạn mount cấu trúc React vào DOM node. Mỗi một renderer sẽ cung cấp một API như thế. Một điều đáng nói ở đây nữa là gói React chỉ cho bạn sử dụng các tính năng của React nhưng chúng không biết cách mà renderer implemented như thế nào.

Oke bây giờ chúng ta đã biết được một số thứ thú vị trong gói React và renderers như _react-dom, react-native_ nhưng vẫn chưa trả lời được câu hỏi ở mục một. :))

## Câu trả lời là mọi renderer sẽ thiết lập một trường đặc biệt trong lớp được tạo.

Trường này được gọi là **updater**. Nó không phải là một thứ mà bạn có thể thiết lập, mà nó có một cái gì đó _React DOM, React DOM Server hoặc React Native_ được thiết lập ngay sau khi tạo một thể hiện của lớp của bạn:

```javascript
// Inside React DOM
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactDOMUpdater;

// Inside React DOM Server
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactDOMServerUpdater;

// Inside React Native
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactNativeUpdater;
```

Hãy nhìn vào [đây](https://github.com/facebook/react/blob/ce43a8cd07c355647922480977b46713bd51883e/packages/react/src/ReactBaseClasses.js#L58-L67) tất cả những gì nó làm là ủy thác công việc cho renderer đã tạo ra thể hiện components này:

```javascript
// A bit simplified
setState(partialState, callback) {
  // Use the `updater` field to talk back to the renderer!
  this.updater.enqueueSetState(this, partialState, callback);
}
```

Và đây chính là cách `this.setState()` có thể cập nhật DOM thậm chí nó không được định nghĩa trong gói react. Nó đọc `this.updater` được thiết lập bởi React DOM và hãy để React DOM quản lý và xử lý cập nhật.

[Source](https://overreacted.io/how-does-setstate-know-what-to-do/)