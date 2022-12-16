# ReactJS là gì
React là một thư viện Javascript dùng để xây dựng các ứng dụng Single Page Application (SPA) một cách nhanh chóng. Hiện nay React là một trong 3 Framework phổ biến nhất cho Front-end, với cộng đồng lớn, dễ học, nhiều công việc thì React thực sự rất đáng để học. 

Hôm nay, chúng ra sẽ tìm hiểu qua những khái niệm cơ bản nhất trong React nhé.
# Components
Đây là một cái rất mạnh của React, giúp chúng ta chia giao diện ứng dụng thành các phần nhỏ để có thể dễ dàng tái sử dụng lại, chứ không dùng template như các framework khác. Hiện nay trong React sẽ có 2 cách sử dụng components đó là function components và class components nhưng cách hiện tại được ưa chuộng là function components bởi vì nó ngắn ngọn, dễ kiểm tra và có thể dễ dàng sử dụng được [React Hook](https://reactjs.org/docs/hooks-intro.html)
- Khai báo Class Components
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
- Khai báo Function Components
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
- Thực hiện sử dụng Components
```jsx
import React from 'react';
import Welcome from './Welcome.js';

function App() {
  return (
    <div>
       <Welcome name="Khanh" />
    </div>
  );
}
```

# JSX — Javascript Syntax Extension
```jsx
const name = 'Khanh';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
   Đây đơn giản là một syntax extension của Javascript. Với nó bạn có thể viết Javascript với những tag giống như XML (XML-like). Về bản chất, các tag thực sự là những lời gọi hàm, sẽ được chuyển đổi trong React code và end up dưới dạng HTML và Javascript trong cây DOM.
   
# Props & State là gì?
Đây là 2 kiểu dữ liệu trong React mà ai học cũng phải biết, điểm khác nhau cơ bản giữa 2 kiểu dữ liệu này là props sẽ có tính thừa kế và thường được dùng để chia sẽ từ component cha xuống component con. State thì có tính private và chỉ được sử dụng bên trong component, khác với props thì khi state thay đổi giá trị thì UI cũng sẽ được rerender.
### 1. Props
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
Với props chúng ta có thể thay đổi giá trị truyền vào component, từ đó có thể tái sử dụng lại component một cách dễ dàng.

### 2. State
```jsx
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
Sau mỗi giây thì state sẽ được thay đổi là UI cũng được thay đổi theo. `componentDidMount` là một Lifecycle ở trong React, bạn có thể tìm hiểu thêm tại [đây.](https://reactjs.org/docs/state-and-lifecycle.html)

# Xử lý sự kiện 
Xử lý sự kiện trong React rất đơn giản với DOM tương tự như Javascipt thuần
### Sự kiện Click
```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

# Render Lists 
Bạn có thể dễ dàng truyền một mảng, đối tượng vào một component và dễ dàng render các item của mảng.
```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number, index) =>
    <li key={index}>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
### Key
Khi bạn tạo các component một cách dynamically, mỗi thành phần đều cần thuộc tính key, và thuộc tính này là duy nhất (unique). Trong suốt quá trình rendering, các component sẽ bị xáo trộn, chúng cũng có thể bị destroy hay recreate tùy vào sự khác nhau của mỗi giải thuật, việc gán cho nó một key để định danh và đảm bảo rằng các component đều ở đúng vị trí của nó, tối ưu hóa việc rendering.

# Tổng kết
Vừa rồi là một số khái niệm cơ bản của React, bài viết của mình còn nhiều chổ thiếu sót, để hiểu thêm bạn có thể vào trang của [React](https://reactjs.org/docs/getting-started.html) để tìm hiểu kỹ hơn nhé!

Bài viết tham khảo: https://codeaholicguy.com/2016/03/01/hoc-reactjs-trong-15-phut-phan-1/