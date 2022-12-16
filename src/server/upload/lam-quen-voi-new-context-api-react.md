Context của React thì ngày xưa cũng đã có. Nhưng trên docs cũng có khuyến cáo là nếu được thì không nên sử dụng vì chúng tôi sẽ sớm viết lại context. Gần đây khi phiên bản 16.3 được ra mắt thì API context mới cũng được ra mắt. Cùng thử dùng new context nào. 
## Khi nào thì dùng context
Dùng context khi bạn muốn share `data` đến tất cả các component con. Như là thông tin user đã đăng nhập, ngôn ngữ... Trên docs có khuyến cao "Nếu mục đích chỉ là tránh truyền props qua nhiều tầng thì không nên dùng context mà hãy dùng [component composition](https://reactjs.org/docs/composition-vs-inheritance.html) thì sẽ đơn giản hơn"
## Sử dụng context API
### React.createContext
```javascript
const {Provider, Consumer} = React.createContext(defaultValue);
```
Khi React render `Consumer` sẽ đọc giá trị của `Provider` gần nhất với nó. `defaultValue` là giá trị mặc định của `Consumer`

### Provider
`<Provider value={/* some value */}>`
Value được truyền vào `Provider` sẽ được truyền đến tất cả các `Consumer` con. Một `Provider` có thể có nhiều `Consumer`. `Provider` có thể lồng nhau.

### Consumer
```javascipt
<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```

`Consumer` là component sẽ được cập nhật khi `value` truyền vào `Provider`. "children" của `Consumer` là một hàm, có tham số là `value` được truyền vào `Provider` và trả về một component. Xem thêm [render props](https://reactjs.org/docs/render-props.html)
`Consumer` sẽ được render lại khi mà `value`thay đổi. Chứ không phụ thuộc vào hàm `shouldComponentUpdate`. Tức là cho dù `shouldComponentUpdate` trả về false nhưng mà `value` có cập nhật thì `Consumer` vẫn render lại.

## Demo
Cùng bắt đầu dùng context API với một ví dụ nhỏ. Bạn có một login modal, Modal này có thể được mở từ bất kỳ đâu, click vào nút login trên header, click vào button trên một component nào đó khi chưa đăng nhập chưa đăng nhập... Cái này sẽ được giải quyết đơn giản bằng context.

[![Image from Gyazo](https://i.gyazo.com/8aa8392cf5ebdc08625edbfc4bd0c3cc.gif)](https://gyazo.com/8aa8392cf5ebdc08625edbfc4bd0c3cc)

Ở component App.js thì sẽ có state `isShowModal` và hàm `showModal` để điều khiển trạng thái mở/đóng của modal. 

```javascript
import React from "react";
import ReactDOM from "react-dom";
import Modal from "./components/Modal";
import "./styles.css";
import { Provider } from "./contexts/modal";
import ChildComponent from "./components/ChildComponent";

class App extends React.Component {
  state = {
    isShowModal: false
  };

  showModal = (bool = true) => {
    this.setState({ isShowModal: bool });
  };

  render() {
    const { isShowModal } = this.state;
    return (
      <Provider
        value={{
          isShowModal: isShowModal,
          showModal: this.showModal
        }}
      >
        <div className="App">
          <h1>Try new context API</h1>
          <button onClick={this.showModal}>Open modal from parent</button>
          <ChildComponent />
          {isShowModal && <Modal />}
        </div>
      </Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
Cho dễ quản lý code thì mình tạo riêng 1 file `modal.js` để tạo context và export ra component khác dùng. hàm `withModal` mình sử dụng Higher order component để có thể tái sử dụng `Consumer` ở nhiều chỗ.
```javascript
import React from "react";

const { Provider, Consumer } = React.createContext({
  isShowModal: false,
  showModal: () => {}
});

const withModal = Component => props => {
  return (
    <Consumer>
      {({ showModal }) => <Component {...props} showModal={showModal} />}
    </Consumer>
  );
};

export { Provider, withModal };
```

Các bạn có thể xem toàn bộ code ở đây https://codesandbox.io/s/o91vrxlywy