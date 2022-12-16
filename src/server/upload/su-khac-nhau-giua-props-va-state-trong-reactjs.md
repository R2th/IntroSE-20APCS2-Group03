Gần đây mình có tìm hiểu về ReactJS, trong quá trình tìm hiểu thì mình thấy `Props` và `State` được dùng khá là nhiều. Vậy chúng là gì và chúng khác nhau như thế nào, ở bài viết này thì mình sẽ trình bày cho các bạn về những phần đó.

**1.Props**
- Khái niệm : là 1 từ viết ngắn gọn của `properties` , nhưng lại là 1 khái niệm trong ReactJS. `props` là 1 đối tượng, nó lưu trữ các giá trị của các attribute (thuộc tính) của một thẻ (Tag).Là cách mà component có thể nhận được các giá trị của thuộc tính truyền vào từ bên ngoài vào, và là cách mà các component có thể nói chuyện với nhau.
 
Ví dụ :
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="ReactJS" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Trong đó, `name` ở `{props.name}` là property, `Welcome` là Component. Mỗi `property` của Component sẽ tương ứng với 1 attribute của thẻ, giá trị của attribute sẽ được truyền vào property của Component.
- Chúng ta sử dụng `props` để truyền gửi dữ liệu đến các component.
- Mọi component được gọi là hàm javascript thuần khiết (pure function).
- `props` tương ứng với tham số của pure function javascript .
- Không thể thay đổi dữ liệu của `props` .

Với ví dụ trên, dòng `<Welcome name="ReactJS" />` tạo ra một Component `Welcome` và `attribute` có value là `ReactJS`, ở bên trên chúng ta có 1 function component trả về `Hello, {props.name}` và như vậy, `{props.name}` sẽ cho chúng ta giá trị là `ReactJS` mà Component `Welcome` truyền vào, và cuối cùng thì khi `render` sẽ ra đoạn : `Hello, ReactJS`. Giống như là 1 cách gọi hàm trong `javascript`  đúng không nhỉ :D 

- Không nên thay đổi `props`: bạn có thể thay đổi `props` bằng cách sử dụng `setProps` hay `replaceProps` nhưng không được React khuyến khích ( [`Props are Read-Only`](https://reactjs.org/docs/components-and-props.html#props-are-read-only)) - React tuân theo 1 rule đó là pure function: không làm thay đổi giá trị đầu vào và luôn trả về 1 kiểu định dạng.


 Chúng ta hãy cùng thử xem ví dụ (mình lấy từ trang chủ của React):
 
 ```javascript
 function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
 ```
 
 Có thể thấy `Clock` component vẫn phải phụ thuộc vào function `tick()` để update data.Để `Clock` component sẽ hoạt động độc lập và tự update chính nó thì chúng ta sẽ sử dụng `State`.

**2. State**

- Khái niệm: Cũng giống như `props` , state cũng lưu trữ thông tin về component, nhưng là lưu trữ dữ liệu động của một component.
- `State` là dữ liệu động , nó cho phép một component theo dõi thông tin thay đổi giữa các kết xuất (`render`) và làm cho nó có thể tương tác.
- `State` chỉ có thể được sử dụng ở trong một component sinh ra nó.
- Nếu dự đoán được một component cần quản lý state, thì nó nên được tạo ở trong một class component chứ không phải là một function component.

Và với ví dụ trên thì chúng ta bắt đầu thử sử dụng `state` thay cho `props` xem sao nhé :D

`1. Thay thế this.props.date bằng this.state.date ở render() method.`

```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
`2. Thêm class contructor().`

 ```javascript
 class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 ```
 `3. Xóa date prop từ <Clock /> element.`

```javascript
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Có vẻ như vẫn đang thấy hơi sai sai vì `Clock` chỉ update khi F5, để giải quyết được bài toán đó thì chúng ta cần thêm các method đặc biệt gọi là `lifecycle methods`, và ở ví dụ này chúng ta thêm 2 function:

 - `componentDidMount()`: đây là nơi chúng ta khởi tạo Timer
         
  - `componentWillUnmount()`: đây là nơi chúng ta clear Timer

Và cuối cùng để update state chúng ta sử dụng `this.setState()`,  full code :

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Đoạn code sẽ hoạt động như sau:

   - Component khởi tạo và khởi tạo luôn State với date = current time
   - Sau khi Compnent khởi tạo với giá trị state được khởi tạo thì `componentDidMount` sẽ chạy và khởi tạo interval và gán nó cho `this.Timer`
   - Sau khi interval chạy thì sẽ update `State` mỗi giây bằng method `this.setState()`
   - State thay đổi sẽ raise sự kiện change và render sẽ update UI mới nhất.
   - Trước khi chúng ta rời khởi page thì function `componentWillUnmount()` sẽ chạy và clear interval

Và chúng ta có một chút so sánh giữa `state` và `props`


|   |  Props | State |
| -------- | -------- | -------- |
| Có thể nhận giá trị ban đầu từ component cha     | Yes     | Yes     |
| Có thể thay đổi bởi component cha      | Yes     | No     |
| Có thể set giá trị mặc định bên trong component      | Yes     | Yes     |
| Có thể thay đổi bên trong component      | No     | Yes     |
| Có thể set giá trị ban đầu cho các component con    | Yes     | Yes     |
| Có thể thay đổi trong các component con    | Yes     | No     |




 **Chốt tộ**
 
Hi vọng với bài viết này sẽ giúp các bạn hiểu thêm về `props` và `state` và có gì chưa đúng mong các bạn góp ý :D 

*Tham khảo :*

[https://reactjs.org/docs/components-and-props.html](https://reactjs.org/docs/components-and-props.html)

[https://reactjs.org/docs/state-and-lifecycle.html](https://reactjs.org/docs/state-and-lifecycle.html)

[https://lucybain.com/blog/2016/react-state-vs-pros/](https://lucybain.com/blog/2016/react-state-vs-pros/)

[https://www.agiliq.com/blog/2018/05/understanding-react-state-and-props/](https://www.agiliq.com/blog/2018/05/understanding-react-state-and-props/)