## Mở đầu
Khi tìm hiểu về React, đặc biệt là về component đôi khi bạn sẽ nhìn thấy các phương thức như componentDidMount(), componentWillUnmount(), ... Đây được gọi là các "React lifecycle methods" - các phương thức trong vòng đời của React component. Các phương thức này sẽ cho phép bạn ghi đè để thực hiện một số nhiệm vụ nhất định. Việc hiểu và biết cách sử dụng các phương thức này sẽ giúp bạn nắm rõ hơn về cách hoạt động của React. Vì vậy, bài viết này mình sẽ giới thiệu về React Component Lifecycle. Mỗi component trong React đều có một vòng đời từ lúc được tạo ra cho đến khi bị hủy bỏ và bạn có thể theo dõi và thao tác trong 3 giai đoạn chính của nó: Mounting, Updating, Unmounting.

## I, Mounting
Mounting là giai đoạn khi component được tạo và render lên DOM.

React có 4 phương thức được gọi theo lần lượt khi mounting 1 component:
1. constructor()
1. getDerivedStateFromProps()
1. render()
1. componentDidMount()

Trong đó phương thức render() là bắt buộc và sẽ luôn được gọi, các phương thức khác thì không bắt buộc và có thể được gọi nếu bạn định nghĩa nó

### 1, constructor
Phương thức **constructor()** sẽ được gọi đầu tiên, khi component đã được khởi tạo, và nó sẽ là nơi thiết lập giá trị state khởi tạo..

Khi component bạn khai báo kế thừa từ React.Component bạn cần gọi hàm super(props) để gọi hàm khởi tạo của thằng cha React.Component

Ví dụ:
```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
```
Lúc này kết quả sẽ hiển thị: **My Favorite Color is red**

### 2, getDerivedStateFromProps
Phương thức **getDerivedStateFromProps()** được gọi ngay trước khi render component

Phương thức này được dùng để thiết lập lại state dựa trên props ban đầu. 

Ví dụ:
```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  static getDerivedStateFromProps(props, state) {
    return {favoritecolor: props.favcol };
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

ReactDOM.render(<Header favcol="yellow"/>, document.getElementById('root'));
```
Trong ví dụ này thay vì hiển thị **My Favorite Color is red** như giá trị favoritecolor: "red" được truyền vào trong constructor thì kết quả sẽ là **My Favorite Color is yellow**

### 3, render
Phương thức render() là phương thức bắt buộc để chèn component vào HTML. Phương thức có cấu trúc như sau:

```
render() {
    return (
        /* Định nghĩa cấu trúc Component */
    )
}
```

### 4, componentDidMount
Phương thức componentDidMount() được gọi sau khi component được render

Đây là nơi bạn chạy các lệnh yêu cầu thành phần nào đó được đặt trong DOM.

Ví dụ:
```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
```
Trong ví dụ trên sau 1s, **My Fovorite Color is red**  sẽ chuyển thành **My Fovorite Color is yellow**.

## II, Updating
Updating là giai đoạn khi component cần cập nhật giao diện mỗi khi props hay state thay đổi.

React có 5 phương thức được gọi theo lần lượt khi updating 1 component:
1. getDerivedStateFromProps()
1. shouldComponentUpdate()
1. render()
1. getSnapshotBeforeUpdate()
1. componentDidUpdate()

Trong đó phương thức render() là bắt buộc và sẽ luôn được gọi, các phương thức khác thì không bắt buộc và có thể được gọi nếu bạn định nghĩa nó.

### 1, getDerivedStateFromProps
Đây là phương thức đầu tiên được gọi khi 1 component được update. Phương thức này được dùng để thiết lập lại state dựa trên props ban đầu. 

Ví dụ:
```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  static getDerivedStateFromProps(props, state) {
    return {favoritecolor: props.favcol };
  }
  changeColor = () => {
    this.setState({favoritecolor: "blue"});
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}

ReactDOM.render(<Header favcol="yellow"/>, document.getElementById('root'));
```
Ví dụ trên nút ấn sẽ thay đổi giá trị favorite color sang blue nhưng hàm getDerivedStateFromProps nên giá trị favorite color vẫn là yellow.

### 2, shouldComponentUpdate
Phương thức shouldComponentUpdate() sẽ trả về giá trị boolean quyết định xem React có nên tiếp tục render hay không. Giá trị mặc định là true.

Ví dụ:
```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  shouldComponentUpdate() {
    return false;
  }
  changeColor = () => {
    this.setState({favoritecolor: "blue"});
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
```

Ví dụ trên khi set giá trị shouldComponentUpdate() là false khi ấn nút Change color giá trị favoritecolor sẽ không được thay đổi.

### 3, render
Phương thức render() là phương thức bắt buộc phải gọi khi update 1 component, nó sẽ render lại khi có những thay đổi mới.

### 4, getSnapshotBeforeUpdate
Phương thức getSnapshotBeforeUpdate() bạn có thể truy cập vào giá trị props và state trước khi update, bạn có thể kiểm tra lại các giá trị trước khi update là gì.

Ví dụ:
```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML =
    "Before the update, the favorite was " + prevState.favoritecolor;
  }

  render() {
    return (
      <div>
        <h1>My Favorite Color is {this.state.favoritecolor}</h1>
        <div id="div1"></div>
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
```
Trong ví dụ trên, ban đầu component mounting và render favoritecolor là red. Sau 1s, giá trị favoritecolor thay đổi thành yellow. Hành động này sẽ kích hoạt giai đoạn update và vì component có phương thức getSnapshotBeforeUpdate(), phương thức này sẽ thực hiện shi message vào thẻ div1 với giá trị favoritecolor là red - giá trị trước khi update.

### 5, componentDidUpdate
Phương thức componentDidUpdate được gọi sau khi component được update với những dữ liệu mới được cập nhật trên giao diện.

Ví dụ:
```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  componentDidUpdate() {
    document.getElementById("mydiv").innerHTML =
    "The updated favorite is " + this.state.favoritecolor;
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <div id="mydiv"></div>
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
```
Trong ví dụ trên, Trong ví dụ trên, ban đầu component mounting và render favoritecolor là red. Sau 1s, giá trị favoritecolor thay đổi thành yellow. Hành động này sẽ kích hoạt giai đoạn update và vì component có phương thức componentDidUpdate(), phương thức này sẽ thực hiện shi message vào thẻ div1 với giá trị favoritecolor là yellow - giá trị sau khi đã update.

## III, Unmounting
Giai đoạn tiếp theo sau khi Update là Unmounting. Đây là giai đoạn xóa bỏ component khỏi DOM.

React chỉ có 1 phương thức được gọi khi component umount là: componentWillUnmount()

### componentWillUnmount
Phương thức này được gọi khi component sắp bị xóa khỏi DOM

Ví dụ:
```
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true};
  }
  delHeader = () => {
    this.setState({show: false});
  }
  render() {
    let myheader;
    if (this.state.show) {
      myheader = <Child />;
    };
    return (
      <div>
      {myheader}
      <button type="button" onClick={this.delHeader}>Delete Header</button>
      </div>
    );
  }
}

class Child extends React.Component {
  componentWillUnmount() {
    alert("The component named Header is about to be unmounted.");
  }
  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
```
Trong ví dụ trên, khi nhấn nút Delete Header để xóa myheader thì React sẽ chạy vào hàm componentWillUnmount() trước khi xóa và thực hiện alert.

Tài liệu tham khảo: https://www.w3schools.com/react/react_lifecycle.asp