# I. Giới thiệu 
React JS là một thư viện của Javascript được sử dụng cho việc xây dựng các thành phần UI có khả năng tái sử dụng, với việc sử dụng React ta thường có xu hướng đến khái niệm Single Page Application. Bằng cách đóng gói, tái sử dụng, và sửa đổi các thành phần trên giao diện mà không cần phải load lại trang, điều này đã làm cho trải nghiệm người dùng được cải thiện đáng kể. Bên cạnh đó với cách thiết kế cấu trúc tái sử dụng như vậy, chương trình của chúng ta sẽ tinh gọn, rõ ràng hơn, hiệu suất cũng tăng lên bằng cách cập nhật thành phần mong muốn chứ không phải toàn bộ page content. 

Lifecycle là một trong những khái niệm căn bản khi làm việc với React, bài viết giới đây mình sẽ cùng tìm hiểu, thực hành để hiểu rõ hơn về nó nhé. 
# II. Lifecycle of Components
![](https://images.viblo.asia/5cc5aaf6-0c4d-4a3b-9408-ca4372a9d3d8.png)

Mỗi component trong React đều có một vòng đời với 3 giai đoạn chính: **Mounting**, **Updating** và **Unmounting**
## 1. Mounting
Vậy mounting là gì? Khái niệm mounting được hiểu là việc put các element vào DOM.

React có 4 methods được gọi lần lượt khi mouting một component: 
```
1. constructor()
2. getDerivedStateFromProps()
3. render()
4. componentDidMount()
```
`render()` là bắt buộc và luôn được thực thi trong khi các method khác là optional. 

### constructor
`constructor()` method được gọi đầu tiên khi component được khởi tạo, và đây cũng là nơi chúng ta initial các state của component. Đối số `props` sẽ được truyền vào phương thức này để cho phép nó kế thừa các thuộc tính từ constructor của component cha. Cùng xem ví dụ dưới để hiểu rõ hơn nhé.
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
```

### getDerivedStateFromProps
`getDerivedStateFromProps()` method được gọi ngay trước khi render element vào DOM. Đây là nơi để set `state` dựa trên các props đã được khởi tạo trược đó. `state` được sử dụng như là đối số của method này và trả về một object state đã được thay đổi khác với state ban đầu. 
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
```
Có thể thấy đoạn code trên đã thay đổi `state` với thuộc tính `favoritecolor` từ "red" sang giá trị khác được lấy thông qua `props.favcol`

### render
`render()` là method bắt buộc và nó thực hiện việc đưa các output HTML vào DOM. 
```
class Header extends React.Component {
  render() {
    return (
      <h1>This is the content of the Header component</h1>
    );
  }
}
```

### componentDidMount
`componentDidMount()` method được gọi sau khi component đã được render. 

Ví dụ sau đã đổi thuộc tính `favoritecolor` sau một timeout nhất định.
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
```

## 2. Updating
Một component được update khi có sự thay đổi về `state` hay `props` của nó.
React có 5 methods được gọi khi một component được update:
```
1. getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()
```
`render()` method là require và luôn được gọi trong khi các method còn lại là optional.
### getDerivedStateFromProps
`getDerivedStateFromProps()` method là phương thức được gọi đầu tiên khi compomnent đã updated. Nó vẫn thực hiện công việc như mình đã giới thiệu ở phần `Mounting` đó là set lại `state` theo prop được initial trước đó. 

Với ví dụ sau ta có function change favorite color sang "blue", nhưng sau khi update nó lại được set lại là như ban đầu là giá trị `props.favcol`
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
```
### shouldComponentUpdate
Với `shouldComponentUpdate()` method ta có thể trả về giá trị boolean để chỉ định rằng có thực thi việc rendering hay không (giá trị mặc định: `true`). 

Với đoạn code dưới đây mặc dù sau khi thay đổi favorite color nhưng giao hiện với không được render lại
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
```
### render
`render()` method thực hiện render lại HTML khi một component đã được update
```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
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
```
### getSnapshotBeforeUpdate
Với `getSnapshotBeforeUpdate()` method ta có thể lấy được giá trị `props` và `state` trước khi update. 
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
  componentDidUpdate() {
    document.getElementById("div2").innerHTML =
    "The updated favorite is " + this.state.favoritecolor;
  }
  render() {
    return (
      <div>
        <h1>My Favorite Color is {this.state.favoritecolor}</h1>
        <div id="div1"></div>
        <div id="div2"></div>
      </div>
    );
  }
}
```
### componentDidUpdate
`componentDidUpdate()` method được gọi sau khi component đã được updated
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
```
## 3. Unmounting
`componentWillUnmount()` method được gọi khi một component được remove khỏi DOM. 
Ví dụ sau thực hiện việc remove header sau khi ta thực hiện click vào button `Delete Header`
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
```
Trên đây mình đã giới thiệu về môt số method trong liffe cycle của react component. Chúc mọi người một ngày làm việc vui vẻ!

Tài liệu tham khảo https://www.w3schools.com/react/react_lifecycle.asp