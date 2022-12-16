Dạo gần đây mình đang tự học Reactjs nên thỉnh thoảng mình sẽ viết bài liên quan tới chủ đề này để tự tổng hợp kiến thức cũng như có thể học hỏi thêm từ mọi người.

Một khái niệm cơ bản và xuyên suốt trong React đó chính là component. 
- Về cơ bản Component cho phép bạn chia giao diện người dùng thành các phần độc lập và có thể tái sử dụng và có logic xử lý riêng biệt. 
- Về mặt khái niệm, các  component giống như các hàm JavaScript. Chúng nhận các giá trị đầu vào (được gọi là “props”) và trả về các phần tử React mô tả những gì sẽ xuất hiện trên màn hình. 
- Có 2 loại Component là Function Component, Class Component.

Và hôm nay chúng ta sẽ tìm hiểu  về vòng đời của Class Component.

**Class components** - Chúng phức tạp hơn functional components ở chỗ nó còn có: phương thức khởi tạo, life-cycle, hàm render() và quản lý state (data). 

Ví dụ dưới đây là class component:
```
class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}
```
Class ExampleComponent kế thừa Component, vì vậy React hiểu class này là một component, và nó renders (returns) 1 React Element.

*Vì vậy, một React class component là:*
1. là một class ES6, nó sẽ là một component khi nó "kế thừa" React component.
2. có thể nhận props (trong hàm khởi tạo) nếu cần.
3. có thể maintain data của nó với state
4. phải có 1 method render() trả về 1 React element (JSX), or null
    
Các React class component có một đối tượng trạng thái (**state**) được tích hợp sẵn.

- Đối tượng state là nơi bạn lưu trữ các giá trị thuộc tính thuộc về component.

- Khi đối tượng trạng thái thay đổi, component sẽ được hiển thị lại.

***NOTE***: Luôn sử dụng phương thức setState () để thay đổi đối tượng state, nó sẽ đảm bảo rằng component biết nó đã được cập nhật và gọi phương thức render () để hiển thị lại dữ liệu cho chính xác (và tất cả các phương thức vòng đời khác).



## Lifecycle of Components

Mỗi React class component có một vòng đời mà bạn có thể theo dõi và thao tác trong ba giai đoạn chính của nó.

Ba giai đoạn là: Mounting, Updating, and Unmounting.

![](https://images.viblo.asia/c6678da4-7413-4282-9e24-07d78b8d6494.jpeg)

### Mounting
Mounting - mình dịch trên GG có nghĩa là "gắn"; nên có thể hiểu đơn giản Mounting có nghĩa là gắn các component vào DOM. Ở giai đoạn này React có bốn phương thức tích hợp được gọi, theo thứ tự này, khi gắn kết một thành phần:
1. constructor()
3. static getDerivedStateFromProps()
5. render() *
7. componentDidMount()

Phương thức render () là bắt buộc và sẽ luôn được gọi, các phương thức khác là tùy chọn và sẽ được gọi nếu bạn định nghĩa lại chúng (OverRiding).
### Updating

Giai đoạn tiếp theo trong vòng đời là khi một component được cập nhật.

Một component được cập nhật bất cứ khi nào có thay đổi về state hoặc props của thành phần.

Ở giai đoạn này React có năm phương thức tích hợp được gọi, theo thứ tự này, khi một thành phần được cập nhật:

1. static getDerivedStateFromProps()


3. shouldComponentUpdate()


5. render() *


7. getSnapshotBeforeUpdate()


9. componentDidUpdate()

Phương thức render () là bắt buộc và sẽ luôn được gọi, các phương thức khác là tùy chọn và sẽ được gọi nếu bạn định nghĩa lại chúng (OverRiding).

### Unmounting

Giai đoạn tiếp theo trong vòng đời là khi một component bị xóa khỏi DOM, hoặc bị ngắt kết nối.

React chỉ có một phương thức tích hợp được gọi khi một component được ngắt kết nối:

1. componentWillUnmount()

## Chi tiết các hàm

### 1. constructor()
Tương tự với các ngôn ngữ lập trình hướng đối tương khác.
- constructor () là phương thức được gọi đầu tiên, ngày sau khi component được khởi tạo và nó là nơi để khởi tạo trạng thái ban đầu và các giá trị ban đầu khác cho component.

- Phương thức constructor () được gọi với props, như là các tham số, và bạn phải luôn bắt đầu bằng cách gọi super (props) trước bất kỳ thứ gì khác, điều này sẽ khởi tạo phương thức constructor của cha và cho phép thành phần kế thừa các phương thức từ cha của nó.
- contructor() luôn được gọi khi bạn khởi tạo đối tượng.

```
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "green"};
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
```
### 2. static getDerivedStateFromProps()
Ở giai đoạn Mounting
- Phương thức getDerivedStateFromProps () được gọi ngay trước khi render component trong DOM.

- Đây là nơi để thiết lập đối tượng **State** dựa trên các **props** ban đầu.

- Nó nhận State như một tham số và trả về một đối tượng có các thay đổi state.

Ví dụ bên dưới bắt đầu với màu yêu thích là "green", nhưng phương thức getDerivedStateFromProps () cập nhật màu yêu thích dựa trên thuộc tính favcol được truyền vào hàm render():

```
class Car extends React.Component {
  constructor(props) { // 2. Khởi tạo giá trị ban đầu cho đối tượng
    super(props);
    this.state = {favoritecolor: "green"};
  }
  static getDerivedStateFromProps(props, state) { //3. Thiết lập giá trị cho đối tượng 
    return {favoritecolor: props.favcol };
  }
  render() { // 4. render HTML dựa trên state
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

ReactDOM.render(<Header favcol="yellow"/>, document.getElementById('root'));  // 1. Tạo đối tượng + truyền tham số favcol
```

Tại giai đoạn UPDATE, phương thức getDerivedStateFromProps cũng được gọi đầu tiên khi một component được cập nhật.

Đây vẫn là nơi để thiết lập State dựa trên các props ban đầu.

Ví dụ bên dưới có một nút thay đổi màu yêu thích thành màu xanh, nhưng vì phương thức getDerivedStateFromProps () được gọi, cập nhật trạng thái với màu từ thuộc tính favcol (màu vàng), màu yêu thích vẫn được hiển thị dưới dạng màu vàng:

```
class Header extends React.Component {
  constructor(props) { // 2
    super(props);
    this.state = {favoritecolor: "green"};
  }
  static getDerivedStateFromProps(props, state) { // 3, 6
    return {favoritecolor: props.favcol };
  }
  changeColor = () => { // 5
    this.setState({favoritecolor: "blue"});
  }
  render() { // 4, 7
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}

ReactDOM.render(<Header favcol="yellow"/>, document.getElementById('root')); // 1
```
 **NOTE:** getDerivedStateFromProps() luôn được gọi trước khi thực hiện render()

### 3. render() 
Phương thức render () là bắt buộc ở giai đoạn (Mounting, Update) và là phương thức thực sự xuất HTML ra DOM.

```
class Header extends React.Component {
  render() {
    return (
      <h1>This is the content of the Header component</h1>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
```
### 4. componentDidMount()
Phương thức componentDidMount () được gọi sau khi component đó đã được gắn vào trong DOM (đã hiển thị).

(được thực thi sau lần hiển thị đầu tiên chỉ ở phía client. Đây là nơi các thực hiện AJAX và cập nhật DOM hoặc state sẽ xảy ra. Phương pháp này cũng được sử dụng để tích hợp với các khung JavaScript khác và bất kỳ hàm nào có quá trình thực thi như setTimeout hoặc setInterval.)
```
class Header extends React.Component {
  constructor(props) { // 2
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() { // 4
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  render() { // 3
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root')); // 1
```

### 5. shouldComponentUpdate
- Trong phương thức shouldComponentUpdate (), trả về một giá trị Boolean chỉ định liệu React có nên tiếp tục update component hay không.

- Giá trị mặc định là true.

Ví dụ dưới đây cho thấy điều gì sẽ xảy ra khi phương thức shouldComponentUpdate () trả về false:

```
class Header extends React.Component {
  constructor(props) { // 2
    super(props);
    this.state = {favoritecolor: "red"};
  }
  shouldComponentUpdate() { // 5
    return false;
  }
  changeColor = () => { // 4
    this.setState({favoritecolor: "blue"});
  }
  render() { // 3
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root')); // 1
```
Để dễ hình dùng các bạn có thể nhìn lại hình ở phía trên. KhishouldComponentUpdate() trả về false thì sẽ không thực hiện gì tiếp theo.

Sau khi component đã được gắn vào DOM (đã thực hiện hàm render 1 lần với màu đỏ ở giai đoạn Mounting), ta thực hiện action click button -> hàm changeColor() được thực hiện (thực hiện update lại state) như bình thường khi state được update thì hàm render() sẽ được gọi để update với màu xanh nhưng,  shouldComponentUpdate() lại trả về false tức là '*dù cho bất cứ điều gì cũng không được thực hiện render (thay đổi) :v*'

### 6. getSnapshotBeforeUpdate

- Trong phương thức getSnapshotBeforeUpdate (), bạn có quyền truy cập vào các props và state trước khi cập nhật, có nghĩa là ngay cả sau khi cập nhật, bạn vẫn có thể kiểm tra các giá trị trước khi cập nhật.

- Nếu có phương thức getSnapshotBeforeUpdate (), bạn cũng nên bao gồm phương thức componentDidUpdate (), nếu không bạn sẽ gặp lỗi.

```
class Header extends React.Component {
  constructor(props) { // 2. RED
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() { // 4. RED -> YELLOW
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  getSnapshotBeforeUpdate(prevProps, prevState) { // 5. 
    document.getElementById("div1").innerHTML =
    "Before the update, the favorite was " + prevState.favoritecolor;
  }
  componentDidUpdate() { // 6
    document.getElementById("div2").innerHTML =
    "The updated favorite is " + this.state.favoritecolor;
  }
  render() { // 3. RED, 7. YELLOW; div1: RED
    return (
      <div>
        <h1>My Favorite Color is {this.state.favoritecolor}</h1>
        <div id="div1"></div>
        <div id="div2"></div>
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root')); // 1

```

- Khi component được gắn kết (Mounting), nó được hiển thị với màu yêu thích "RED".

- Khi component đã gắn vào DOM, một bộ đếm thời gian sẽ thay đổi State, sau một giây, màu yêu thích sẽ trở thành "YELLOW".

- Hành động này kích hoạt giai đoạn UPDATE và vì thành phần này có phương thức getSnapshotBeforeUpdate (), phương thức này được thực thi và ghi dữ liệu cũ (RED)  vào phần tử DIV1 trống.

- Sau đó, phương thức componentDidUpdate () tiếp tục được thực thi và viết một dữ liệu hiện tại (YELLOW) trong phần tử DIV2 trống.

### 7. componentDidUpdate
- Phương thức componentDidUpdate() được gọi sau khi thành phần được cập nhật trong DOM.

```
class Header extends React.Component {
  constructor(props) { // 1
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() { // 3
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  componentDidUpdate() { // 4
    document.getElementById("mydiv").innerHTML =
    "The updated favorite is " + this.state.favoritecolor;
  }
  render() { // 2, 5
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

### 8. componentWillUnmount

Phương thức componentWillUnmount được gọi khi thành phần sắp bị xóa khỏi DOM.

```
class Container extends React.Component {
  constructor(props) { // 1
    super(props);
    this.state = {show: true};
  }
  delHeader = () => { // 4
    this.setState({show: false});
  }
  render() { // 2, 6
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
  componentWillUnmount() { // 5
    alert("The component named Header is about to be unmounted.");
  }
  render() { // 3
    return (
      <h1>Hello World!</h1>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
```

Hi vọng với những kiến thức cơ bản và chú thích thứ tự thực hiện các hàm trong lbên trong mỗi ví dụ các bạn sẽ hiểu hơn về React Lifecycle.

(https://www.w3schools.com/react/react_lifecycle.asp

https://reactjs.org/docs/react-component.html)

Khi đang viết bài này thì mình được biết là hiện tại function component được sử dụng phổ biến hơn class component ;))