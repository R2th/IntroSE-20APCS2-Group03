# 1. Giới thiệu
Chào mọi người nay mình tìm được chủ đề khá hay ho về Render props trong **Reactjs** . Nếu hay ho thật (hihi) và mong nó sẽ giúp ích cho mọi người trong quá trình tìm hiểu học hỏi về **Reactjs** .

-----

## 2. Render Props
- Thuật ngữ **" render props "** đề cập đến một kỹ thuật để chia sẻ code giữa các component **React** bằng cách sử dụng **Props** có giá trị là 1 **function** 
- Một Component với một render prop nhận một function rồi trả về một phần tử React và gọi nó thay vì thực hiện logic của chính nó . 
```js
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)} />
```
- Các thư việc sử dụng render prop để include :  React Router, Downshift and Formik.

## 3. Use Render Props for Cross-Cutting Concerns

- Component là đơn vị chính của việc tái sử dụng code trong Reactjs , nhưng nó không phải lúc nào cũng rõ ràng về cách chia sẻ state hoặc behavior mà một component gói gọn với các component khác cùng trạng thái sử dụng . 
> Ví dụ Component sau sẽ theo dõi vị trí chuột .
```js
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}
```
- Khi di chuyển chuột xung quanh màn hình, sẽ hiển thị tọa độ (x, y) của nó trong <p>.

> - Bây giờ câu hỏi là: Làm thế nào chúng ta có thể sử dụng lại **behavior** này trong một component khác? Nói cách khác, nếu một component khác cần biết về vị trí con trỏ, chúng ta có thể gói gọn **behavior ** đó để có thể dễ dàng chia sẻ nó với component đó không?

 - Vì các component là đơn vị tái sử dụng code cơ bản trong React, nên hãy thử tái cấu trúc code một chút để sử dụng component <Mouse> gói gọn **behavior** mà chúng ta cần sử dụng lại ở nơi khác.

```js
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/* ...but how do we render something other than a <p>? */}
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse />
      </div>
    );
  }
}
```
 - Bây giờ, component <Mouse> đóng gói tất cả các behavior liên quan đến việc lắng nghe các sự kiện **mousemove** và lưu trữ vị trí (x, y) của con trỏ, nhưng nó không thực sự có thể tái sử dụng lại .
 
>  Ví dụ: giả sử chúng ta có một componet <Cat> để hiển thị hình ảnh của một con mèo đuổi theo con chuột xung quanh màn hình. Chúng ta có thể sử dụng **prop <Cat mouse = {{x, y}}>** để báo cho component tọa độ của chuột để nó biết vị trí của hình ảnh trên màn hình.

 - bạn có thể thử render phương thức <Cat> bên trong <Mouse>, giống như sau:

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          We could just swap out the <p> for a <Cat> here ... but then
          we would need to create a separate <MouseWithSomethingElse>
          component every time we need to use it, so <MouseWithCat>
          isn't really reusable yet.
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <MouseWithCat />
      </div>
    );
  }
}
```
 - Cách tiếp cận này sẽ phù hợp với trường hợp sử dụng cụ thể , nhưng chúng ta đã đạt được mục tiêu là gói gọn behavior theo cách có thể sử dụng lại. Bây giờ, mỗi khi chúng ta muốn vị trí chuột cho mỗi trường hợp sử dụng khác nhau ở trên màn hình , chúng ta phải tạo một component mới (<MouseWithCat>) để hiển thị một cái gì đó cụ thể .
 - Đây là nơi  prop xuất hiện: Thay vì fix cứng <Cat> bên trong component <Mouse> và thay đổi hiệu quả đầu ra của nó, chúng ta có thể cung cấp cho <Mouse> chức năng mà nó sử dụng để xác định render .

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```
- Bây giờ, thay vì sao chép một cách hiệu quả component <Mouse> và mã hóa thứ gì đó khác trong phương thức của nó để giải quyết cho một trường hợp sử dụng cụ thể, chúng ta cung cấp một prop mà component <Mouse> có thể sử dụng để xác định những gì nó hiển thị .
- Cụ thể hơn prop là một function mà một component sủ dụng để biết những gì ta sẽ render .
- Kỹ thuật này làm cho quá trình render của chúng ta chia sẻ cực kỳ di động.
- Một điều thú vị mà mọi người cần lưu ý về render props là bạn có thể implement hầu hết  **[higher-order components](https://reactjs.org/docs/higher-order-components.html)** (HOC) bằng cách sử dụng một component thông thường với prop . Ví dụ: nếu bạn muốn có **withMouse** HOC thay vì component <Mouse>, bạn có thể dễ dàng tạo bằng cách sử dụng <Mouse> thông thường với render prop :
```js
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}
```
 
## 4 Kết thúc 
 Mong răng bài viết trên sẽ đem lại lợi ích cho bạn . bài viết có sai sót gì hy vọng mọi người đóng góp giúp mình nhé . Thank you for watching .