Bạn đã bao giờ phải truyền một prop xuống 1 component trong React chỉ với mục đích truyền tiếp nó xuống component con của nó chưa? Đó chính xác là vấn đề mà React Context API cố gắng để cải thiện.

# Vấn đề
Hãy cùng xem ví dụ sau:
- Chúng ta có một loại dữ liệu là 1 số với giá trị là 10.
- Chúng ta cần dữ liệu này trong component Red và Green.
- Component Green là con của component Blue, và Blue lại là con của component Red.
- Vì vậy chúng ta sẽ cần phải gửi dữ liệu từ Red đến Blue chỉ để gửi nó tới Green.

![](https://images.viblo.asia/63dd274d-5426-4c07-a823-f7dc69e1cf7b.png)

Với hình trên thì code của chúng ta sẽ tương tự như sau:

```
const Green = (props) => (
  <div className="green">{props.number}</div>
)
const Blue = (props) => (
  <div className="blue">
    <Green number={props.number} />
  </div>
)
 
class Red extends Component {
  state = {
    number : 10
  }
  render() {
    return  <div className="red">
      {this.state.number}
      <Blue number={this.state.number} />
    </div>
  }
}
```

Chúng ta đã gửi data xuống cho component Blue chỉ để truyền tiếp nó xuống cho Green. Đây mới chỉ là ví dụ đơn giản thôi. Thử tưởng tượng mọi chuyện sẽ tồi tệ thế nào nếu chúng ta có 10 tầng component lồng nhau.

Cho đến React 16.3 thì giải pháp cho vấn đề này là sử dụng Redux hoặc Mobx hoặc bất cứ thư viện nào để xử lý state. Nhưng giờ thì chúng ta đã có giải pháp nằm trong React luôn.

# Giải pháp: Quản lý state bằng React Context?

React Context cung cấp cho chúng ta cơ chế định nghĩa các data store và truy xuất chúng khi cần. Chúng ta không cần phải truyền data thông qua props nữa. Với React Context chúng ta có thể định nghĩa và sử dụng một thứ giống như là "global state" của ứng dụng vậy.

# Cách dùng React Context?

Có 2 bước để setup React context trong ứng dụng của chúng ta:

1. Setup một **Context Provider** và định nghĩa các dữ liệu bạn cần chứa trong đó.

2. Sử dụng một **Context Consumer** bất cứ khi nào bạn cần sử dụng dữ liệu trong store.

Chúng ta có thể khởi tạo một **Context Provider** thông qua việc sử dụng hàm `React.createContext`. Chúng ta sẽ tạm gọi context này là `AppContext`:

```
const AppContext = React.createContext()
```


`AppContext` sẽ được sử dụng để tạo ra một context provider component. Provider này sẽ chứa dữ liệu chúng ta cần trong state của nó và nó sẽ gói toàn bộ nội dung của component Red:

```
class AppProvider extends Component {
  state = {
    number : 10,
  }
render() {
    return <AppContext.Provider value={this.state}>
    </AppContext.Provider>
  }
}
 
//...
 
class Red extends Component {
  render() {
    return  <AppProvider> 
        <div className="red">
          <Blue />
        </div>
    </AppProvider>
  }
}
```


Tóm tắt lại thì bằng việc gói mọi thứ vào bên trong `AppProvider`, chúng ta có thể dễ dàng inject dữ liệu từ attribute `value` khi cần. Bởi vì `AppProvider` được sử dụng như là 1 wrapper component, chúng ta sẽ phải dùng `{this.props.children}` trong hàm `render`.

Sau khi đã setup xong provider, chúng ta có thể truy xuất data bằng cách sử dụng **Context Consumer**.

```
<AppContext.Consumer>
      {(context) => context.number}
</AppContext.Consumer>
```

Mọi dữ liệu chúng ta thêm vào trong property `value` của `AppContext.Provider` sẽ có thể truy xuất thông qua tham số `context` của arrow function.

Code của chúng ta sẽ như dưới đây:

```
const AppContext = React.createContext()
class AppProvider extends Component {
  state = {
    number : 10
  }
render() {
    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>
  }
}
const Green = () => (
  <div className="green">
      <AppContext.Consumer>
        {(context) => context.number}
      </AppContext.Consumer>
  </div>
)
const Blue = () => (
  <div className="blue">
    <Green />
  </div>
)
 
class Red extends Component {
  render() {
    return  <AppProvider> 
        <div className="red">
          <AppContext.Consumer>
            {(context) => context.number}
          </AppContext.Consumer>
          <Blue />
        </div>
    </AppProvider>
  }
}
```

Hãy chú ý rằng chúng ta không còn cần phải truyền prop `number` xuống component Blue hay Green nữa. Tất cả dữ liệu đã được xử lý bởi cơ chế của React Context.


# Sử dụng actions và thay đổi data với React Context


Trừ khi bạn đang làm một cái app tí hon ra thì chắc chắn bạn sẽ cần một cách nào đó để cập nhật/thay đổi data từ React Context. Một ví dụ đơn giản cho tình huống này là chúng ta sẽ có một button với chức năng tăng giá trị của `number`.

![](https://images.viblo.asia/fc245171-7247-41ae-87ce-65f534d69e09.gif)

Chúng ta sẽ cần một cách nào đó thay cho action của Mobx hoặc Redux.

Cái này thực ra khá là dễ. Điều chúng ta cần làm là định nghĩa một hàm trong state của `AppProvider`, và xử lý các thay đổi tới dữ liệu trong state.

```
class AppProvider extends Component {
 state = {
    number : 10,
    inc: () => {
      this.setState({number: this.state.number + 1})
    }
  }
  //...
}
```

Sau khi định nghĩa xong hàm, chúng ta có thể sử dụng nó thông qua `AppContext.Consumer` và gọi nó trong event `onClick`:

```
const Blue = () => (
  <div className="blue">
    <AppContext.Consumer>
        {(context) => <button onClick={context.inc}>INC</button>}
      </AppContext.Consumer>
    <Green />
  </div>
)
```

Đoạn code của chúng ta cuối cùng sẽ như thế này:

```
import React, { Component } from 'react'
const AppContext = React.createContext()
class AppProvider extends Component {
 state = {
    number : 10,
    inc: () => {
      this.setState({number: this.state.number + 1})
    }
  }
 render() {
    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>
  }
}
const Green = () => (
  <div className="green">
     <AppContext.Consumer>
        {(context) => context.number}
      </AppContext.Consumer>
  </div>
)
const Blue = () => (
  <div className="blue">
    <AppContext.Consumer>
        {(context) => <button onClick={context.inc}>INC</button>}
      </AppContext.Consumer>
    <Green />
  </div>
)
```

Dù đây là một api mới nhưng nó cũng có thể được coi là một trong những lựa chọn thay cho các giải pháp quản lý dữ liệu khác, nếu như mục đích của bạn chỉ là tránh việc phải truyền props một cách không cần thiết.

Bài viết được dịch từ [How to use the new React context API](https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87) của tác giả **Daniel**.