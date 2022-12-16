# 1. Giới thiệu

Đối với mobile developer, chắc hẳn khái niệm **lifecycle** hay còn gọi là vòng đời của ứng dụng không còn xa lạ với các bạn nữa. Thông thường, vòng đời ứng dụng **android** bắt đầu từ khi ứng dụng được hiển thị lên màn hình cho đến khi thoát khỏi ứng dụng:
![](https://images.viblo.asia/b8daa725-d03d-467c-b976-e6c56e0b56c6.png)

Còn trong **react native**, vòng đời ứng dụng sẽ như sau:
![](https://images.viblo.asia/2ceca49d-97fe-481a-8a1f-938532e75ee9.png)

Để có cái nhìn tổng quát về sơ đồ vòng đời, bạn đọc có thể xem qua tại [đây](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

> **Lưu ý**: Trong bài viết này mình sẽ chia sẻ chi tiết về vòng đời của React native (chú ý bài viết này được mình viết tại phiên bản **0.59** nên sẽ có đôi chút cập nhật so với các phiên bản trước đó hoặc cũng có thể lỗi thời nếu có các cập nhật trong các phiên bản tiếp theo)

# 2. The component lifecycle

React cho phép bạn định nghĩa các component như class hoặc function. Component định nghĩa như class cung cấp nhiều tính năng, để khai báo 1 React component, bạn cần extend **React.Component** như sau:
```js
class Welcome extends React.Component {
  render() {
    return <Text>Hello, {this.props.name}</Text>;
  }
}
```

Để view hiển thị lên màn hình, phương thức bắt buộc bạn cần gọi đó là **render**()

Mỗi component có các method lifecycle cho phép bạn có thể override để chạy code hiển thị lên màn hình mobile. Lifecycle thường được chia làm 3 phần chính: 

* **Mounting**

* **Updating**

* **Unmounting**

# 3. Mounting

Bao gồm các method được gọi khi 1 instance của component được khởi tạo:

## 3.1. constructor()
```js
constructor(props)
```

Nếu bạn không khởi tạo state và không bind các methods thì không cần implement method này.

Đây là hàm khởi tạo cho React component, được gọi trước khi ứng dụng được mount.  Khi implement constructor, bạn nên gọi **super(props)** trước khi khởi tạo các state, nếu không, this.props sẽ không được khai báo có thể dẫn đến bugs.

Trong hàm này, bạn có thể:

- Khởi tạo state bằng cách khai báo this.state

- Binding các method xử lý sự kiện như 1 instance
    
```js
constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```
Trong constructor, bạn không nên gọi **setState**()  mà chỉ nên gọi hàm này trong các methods khác 

## 3.2. getDerivedStateFromProps()
```js
static getDerivedStateFromProps(props, state)
```
Method này được gọi ngay trước khi gọi phương thức render, cả 2 method được mount lúc khởi tạo và trong các lần cập nhật tiếp theo. Nó trả về 1 đối tượng được cập nhật trạng thái hoặc là không cập nhật gì cả.

## 3.3. render()
```js
render()
```

Method render là phương thức **bắt buộc** phải có trong 1 component để hiển thị view lên màn hình.

**Lưu ý**: **render**() sẽ không được gọi khi **shouldComponentUpdate**() trả về **false**.

## 3.4. componentDidMount()

Method này được gọi ngay sau khi component được mounted. Nếu bạn cần load dữ liệu từ network, đây là nơi thích hợp để khởi tạo các request network. Tại đây, các bạn có thể đăng ký các sự kiện để lắng nghe và đừng quên hủy các sự kiện tại **componentWillUnmount**().

Bạn có thể gọi **setState**() ngay tại **componentDidMount**(), điều đó sẽ xảy ra trước khi screen thiết bị update giao diện mới. 

>**Lưu ý**: Phiên bản 0.59 đã loại bỏ 1 số method sau đây, nên bạn cần lưu ý khi sử dụng chúng nhé:
> * UNSAFE_componentWillMount()
# 4. Updating
Update có thể xảy ra khi thay đổi props hoặc state. Những method sau được gọi theo thứ tự để component được re-render.

## 4.1. static getDerivedStateFromProps()
```js
static getDerivedStateFromProps(props, state)
```

Method này được gọi ngay trước khi gọi method render, giống với method tại phần Mounting phía trên nên mình không nhắc lại nữa

## 4.2. shouldComponentUpdate()
```js
shouldComponentUpdate(nextProps, nextState)
```

Method này cho React biết rằng component output có không bị ảnh hưởng bởi sự thay đổi state hoặc props. Mặc định là sẽ re-render lại khi có sự thay đổi về state. shouldComponentUpdate được gọi trước khi rendering khi mà nhận được state và props mới. Method này không được gọi khi khởi tạo render hoặc khi forceUdate được sử dụng. 

**Lưu ý**: Method này chỉ được dùng như là 1 cách để tối ưu hiệu năng, không nên dựa dẫm vào nó để tránh việc render, vì điều đó sẽ dẫn đến bugs. 

Nếu bạn tự tin để xử lý nó bằng tay, bạn có thể so sánh this.props vs nextProps và this.state vs nextState và return false để React có thể skip update giao diện. 

## 4.3. render()
Method này tương tự method render phía trên.
## 4.4. getSnapshotBeforeUpdate()
```js
getSnapshotBeforeUpdate(prevProps, prevState)
```
Method này được gọi ngay trước khi rendered output được committed. Bất kỳ giá trị nào được trả về từ method này đều được truyền vào như là params tới **componentDidUpdate**().

## 4.5. componentDidUpdate()
```js
componentDidUpdate(prevProps, prevState, snapshot)
```

Method này được gọi ngay sau khi có sự update, nó không được gọi cho lần khởi tạo render. Tại đây bạn cũng có thể thực hiện các request network sau khi so sánh current props vs previous props. 
```js
componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```
Bạn cũng có thể **setState**() ngay trong **componentDidUpdate**() nhưng cần phải đặt trong 1 vòng điều kiện nếu không sẽ xảy ra vòng lặp vô hạn.

**Lưu ý**: **componentDidUpdate** sẽ không được gọi nếu **shouldComponentUpdate** trả về **false**.

>**Lưu ý**: Phiên bản 0.59 đã loại bỏ 1 số method sau đây, nên bạn cần lưu ý khi sử dụng chúng nhé:
> * UNSAFE_componentWillUpdate()
> * UNSAFE_componentWillReceiveProps()

# 5. Unmounting
Được gọi khi muốn component được remove.

## 5.1. componentWillUnmount()
```js
componentWillUnmount()
```

Method này được gọi nay trước khi component được unmounted và destroyed nên hãy thực thi bất kỳ hành động nào để dọn dẹp trong method này như là: invalidate timers, cancel network requests, unsubscribe các sự kiện trong **componentDidMount**().

Bạn không nên gọi **setState** trong **componentWillUnmout**() vì nó sẽ không bao giờ được re-render. Một khi component được unmounted, nó sẽ không bao giờ được mount lại.

:point_right:Bài viết đến đây là hết rồi, nếu cảm thấy bài viết hữu ích :ok_hand:, có thể đăng nhập và like cho mình nhé :+1:. Nhớ folow để xem các các bài viết sắp tới của mình nhé. Thanks! :handshake:
# 6. Tham khảo
https://reactjs.org/docs/react-component.html

http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/