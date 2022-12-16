## Introduction
![](https://images.viblo.asia/fc4c4f40-4db1-4913-8ad2-4f437d7b6f19.png)

Như đã biết ở phần [trước](https://viblo.asia/p/reactjs-main-concept-components-and-props-bJzKma1DK9N), ReactJS có một quy tắc chung là *props* của component luôn luôn là **read-only**, vì thế nên để không vi phạm vào quy tắc này, *state* ra đời.

Cũng giống như *props*, *state* cũng có nhiệm vụ chứa các thông tin của component. Tuy nhiên *state* chỉ hoạt động trong component của nó (private), là thành phần của component, và là loại dữ liệu động (có thể thay đổi được). Nếu 1 component cần quản lý state, thì component đó nên là class component hơn là function component.
## Example
Cùng quay trở lại với vd ticking clock ở phần [đầu](https://viblo.asia/p/reactjs-main-concept-jsx-and-rendering-element-63vKjvykK2R), là một trong những cách để update UI thông qua việc gọi `ReactDOM.render()` nhiều lần:
```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
Áp dụng kiến thức về Component và Props ở phần [trước](https://viblo.asia/p/reactjs-main-concept-components-and-props-bJzKma1DK9N), ta có thể khởi tạo component `Clock` và refactor lại vd trên như sau:
```js
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
Tuy nhiên, ta có thể tối ưu hơn nữa bằng cách để component `Clock` tự khởi tạo biến `date` và update chính nó theo thời gian.
Tức là giá trị của `date` sẽ phải được thay đổi liên tục, điều này sẽ vi phạm đến nguyên tắc *read-only* của props. Vì vậy chúng ta sẽ cần đến state và sức mạnh của các `lifecycle` methods.


Việc cần làm đầu tiên, đó là biến  `Clock` từ function component trở thành class component.
### Converting a Function to a Class
Để khởi tạo class component, ta sẽ thực hiện lần lượt các bước như sau:
* tạo 1 ES6 class với tên là `Clock`, extend `React.Component`
* sử dụng method `render()` bên trong 
* chuyển toàn bộ body của function component cũ vào trong hàm `render()`
* sử dụng `this.props.` thay vì `props.` như ở function component
```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
Bước tiếp theo chúng ta sẽ sử dụng `state` để lưu lại giá trị của  `date` cho component `Clock`.
### Adding Local State to a Class
Ta sẽ chuyển `date` từ props sang state như sau:

Đầu tiên, chuyển `this.props.date` thành `this.state.date` ở method `render()`:
```js
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
Sau đó sử dụng `constructor` để khởi tạo giá trị `date` và gán vào state:
```js
constructor(props) {
  super(props);
  this.state = {date: new Date()};
}
```
Và bỏ props `date` khỏi element `<Clock />`:
```js
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
Cuối cùng ta được:
```js
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

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
Demo: [Try it on CodePen](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

Bước tiếp theo chúng ta sẽ sử dụng lifecycle method để update giá trị của `date` theo thời gian và update lại UI tương ứng.
### Adding Lifecycle Methods to a Class
Khi một app sử dụng nhiều component, việc giải phóng tài nguyên bị chiếm dụng bởi các component sau khi các component này bị loại bỏ là điều rất quan trọng. 

Cụ thể trong bài toán này, để khởi tạo giá trị cho `date` và update nó liên tục theo thời gian, ta sẽ sử dụng method đếm `setInterval`.  Tức là `setInterval` sẽ hoạt động ngay sau khi `Clock` được render vào DOM lần đầu tiên, trong React điều này được gọi là *Mounting*. Chúng ta cũng muốn xóa bỏ việc đếm này sau khi `Clock` bị loại bỏ, quá trình này được gọi là *unmounting* trong React.

Để làm được những điều đó, chúng ta sẽ thêm các logic tương ứng khi component được *mount* và *unmount* thông qua 2 method là `componentDidMount()` và `componentWillUnmount()`. Đây chính là *Lifecycle Method* trong React:
* method `componentDidMount()` được chạy sau khi component output được render ra ngoài DOM
* method `componentWillUnmount()` chạy sau khi component bị loại bỏ khỏi DOM

Trở lại với bài toán, chúng ta muốn chạy `setInterval` ngay sau khi `Clock` được render, thì ta cần thêm nó vào trong `componentDidMount()`:
```js
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```
Chúng ta đã lưu lại giá trị của timer ID vào `this.timerID`. Khác với `this.props`, chúng ta có thể thoải mái khai báo thêm các field ở trong class component `Clock` để lưu lại các giá trị mà không ảnh hưởng đến luồng chính của logic, vd như `this.timerID` bên trên.

Tiếp tục, để xóa bỏ quá trình đếm sau khi `Clock` bị loại bỏ khỏi DOM, ta sẽ sử dụng method `clearInterval` và cho nó vào trong `componentWillUnmount()`:
```js
 componentWillUnmount() {
    clearInterval(this.timerID);
  }
```
Sau đó là tạo function `tick()`, trong đó sử dụng method `this.setState()` để set lại giá trị của `date` mỗi khi `tick()` được gọi:
```js
  tick() {
    this.setState({
      date: new Date()
    });
  }
```
Cuối cùng ta được:
```js
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
Demo: [Try it on CodePen](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

Tổng kết lại ta có luồng xử lí như sau:
* Khi `<Clock />` được truyền vào `ReactDOM.render()`, React sẽ gọi đến constructor của component `Clock` sau đó khởi tạo giá trị state là object chứa time hiện tại
* Sau đó React gọi đến method `render()` của component `Clock` và update DOM tương ứng với output của method `render()`
* Sau khi output của component `Clock` được render vào DOM, React sẽ gọi đến lifecycle method `componentDidMount()`. Lúc này bộ đếm sẽ được khởi tạo và gọi đến method `tick()` theo thời gian đã set
* Cứ mỗi lần method `tick()` được gọi, React biết rằng DOM sẽ thay đổi vì giá trị của `this.state.date` thay đổi sau khi gọi đến method `setState()` bên trong. Vì thế nên sau đó React sẽ gọi lại method `render()` và DOM sẽ được cập nhật
* Trường hợp component `Clock` bị remove khỏi DOM, React sẽ gọi đến method `componentWillUnmount()` để xóa bỏ bộ đếm

## Using State Correctly
### Do Not Modify State Directly
Chúng ta không nên modify lại giá trị cho state một cách trực tiếp, làm thế thì component tương ứng sẽ không được render lại, vd:
```js
// Wrong
 this.state.date = new Date();
```
React sẽ trigger việc re-render thông qua method `setState()`, vì thế nên khi muốn modify giá trị của state, ta nên dùng method `setState()`:
```js
// Correct
this.setState({date: new Date()});
```
Việc khai báo giá trị cho `this.state` chỉ được thực hiện ở trong constructor, như vd ticking Clock bên trên.
### State Updates May Be Asynchronous
React có thể gộp nhiều lệnh gọi đến `setState()` vào một batch duy nhất để cải thiện hiệu suất, vì thế nên `this.props` và `this.state` có thể được update một cách bất đồng bộ.

Chúng ta cần chú ý khi sử dụng giá trị của `props` và `state` để tính toán, vd dưới đây có thể sẽ sai trong 1 vài trường hợp:
```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
Để tránh điều này, chúng ta có thể sử dụng dạng khác của method `setState()`, nhận vào một function thay vì object như thông thường. Function này sẽ nhận `state` ngay trước đó là tham số đầu tiên, và tham số thứ hai sẽ là giá trị `props` tại thời điểm việc update đã hoàn thành:
```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
Thay vì dạng `arrow function` như trên, ta có thể viết dưới dạng `regular function`:
```js
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```
## State Updates are Merged
Bản chất của method `setState()` là merged object bên trong vào giá trị `state` hiện tại, vd ta khai báo các field cho state ban đầu như sau:
```js
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```
Sau đó chúng ta có thể update / modified lại từng field một cách độc lập:
```js
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
Vì là *shallow* merged, nên `this.setState({comments})` sẽ chỉ modified `this.state.comments` và không đả động gì đến `this.state.posts`
### Summary
Bài viết nhằm giới thiệu về khái niệm State và Lifecycle trong ReactJS, cảm ơn bạn đã dành thời gian theo dõi.

Nguồn: https://reactjs.org/docs/state-and-lifecycle.html