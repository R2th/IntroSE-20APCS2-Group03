# 1. Giới thiệu
React là một thư viện JavaScript front-end mã nguồn mở miễn phí để xây dựng giao diện người dùng hoặc các thành phần UI. Ở bài viết này chúng ta sẽ tìm hiểu về những thành phần cốt lỗi của một react application bao gồm component, jsx, state, props.
## Install react
```
npx create-react-app learn-react
cd learn-react
npm start
```
Theo mặc định, ứng dụng chạy trong cổng localhost 3000 với địa chỉ http://localhost:3000
# 2. Component
React được xây dựng xung quanh các component, chứ không dùng template như các framework khác. Các component cho phép bạn chia giao diện người dùng thành các phần độc lập, có thể tái sử dụng và xử lý logic về từng component một cách riêng biệt. 

Tệp App.js hiện định nghĩa một component React với tên App, và được gọi trong index.js theo cú pháp dưới đây.
```js
import App from './App.js';

ReactDOM.render(<App />, document.getElementById('root'));
```
Câu lệnh trên hiển thị nội dung App component vào trong thẻ div được xác địng trong file *public/index.html* với id là 'root'.

Theo mặc định, tệp public/index.html không chứa bất kỳ nội dung HTML nào để hiển thị trên trình duyệt. Bạn có thể thử thêm một số HTML vào tệp. Tuy nhiên, khi sử dụng React, tất cả nội dung cần được hiển thị thường được định nghĩa là các component của React.

Bây giờ chúng ta hãy xem đoạn code định nghĩa một component của React
```js
function App() {
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
}
```
Như bạn thấy thì component trên được định nghĩa là một hàm javascript và hiển thị dưới dạng một thẻ div. Vì là một hàm javascript nên nó có thể chứa biến và chưa bất kì câu lệnh javascript nào như ví dụ dưới đây: 
```js
function App() {
   const now = new Date()
  const a = 10
  const b = 20
  console.log('Bây giờ là :' + now)
  return (
    <div>
      <p>Xin chào, hôm nay là {now.toLocaleDateString()}</p>
      <p>
        {a} + {b} = {a + b}
      </p>
    </div>
  )
}
```
Và đây là kết quả thực hiện được:
![image.png](https://images.viblo.asia/20ab5514-f10e-4a15-8943-75edfbecc943.png)

## Multiple components
Bạn có thể lồng nhiều component vào nhau trong câu lệnh return. Dưới đây là một ví dụ về multiple components:
```js
const Hello = function () {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}
function App() {
  return (
    <div>
      <Hello />
      <Hello />
      <p>This is testing</p>
    </div>
  )
}
```

# 3. Jsx
Đây đơn giản là một syntax extension của Javascript. Với nó bạn có thể viết Javascript với những tag giống như XML (XML-like).. Về cơ bản, JSX do các thành phần React trả về được biên dịch thành JavaScript. Dưới đây là App component sau khi biên dịch thành javascript
```js
function App() {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log('Bây giờ là :' + now);
  return React.createElement(
      "div", 
      null, 
      React.createElement(
          "p", 
          null, 
          "Xin chao, hom nay la ", 
          now.toLocaleDateString()
      ), 
      React.createElement(
          "p", null, a, " + ", b, " = ", a + b
      )
  );
}
```
Việc biên dịch được xử lý bởi Babel . Các dự án được tạo bằng create-react-app được định cấu hình để biên dịch tự động.

> Vì JSX gần với JavaScript hơn là so với HTML, React DOM sử dụng chuẩn quy tắc đặt tên camelCase cho thuộc tính thay vì dùng tên thuộc tính gốc của HTML. 
> 
> Ví dụ, class trở thành className trong JSX, và tabindex trở thành tabIndex.
# 4. Props
Chúng ta có thể truyền dữ liệu vào các component qua props.
```js
function App(props) {
  return (
    <div>
      <p>Xin chào, hôm nay là {props.now.toLocaleDateString()}</p>
      <p>
        {props.a} + {props.b} = {props.a + props.b}
      </p>
    </div>
  )
}
```
```js
let now = new Date();
let a = 5;
let b = 6;
ReactDOM.render(<App now={now} a={a} b={b} />, document.getElementById('root'));
```
> Props chỉ có thể sử dụng mà không thể thay đổi trong component
# 5. State
State là một kiểu data của component, nó được xem như là trạng thái của một component và có thể thay đổi. Để sử dụng state thì chúng ta cần stateful component, có nghĩa là component được viết dưới dạng class. 
```js
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <button
                    onClick={() => {
                        this.setState({
                            date: new Date()
                        })
                    }}
                >
                    Update Clock
                </button>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
```
Có thể khởi tạo state trong constructor và thay đổi state thông qua hàm setState.
# 6. Tổng kết
Trong bài viết này chúng ta đã tìm hiểu về những thành phần cơ bản của react app. Đây là kiến thức cơ bản nhưng nó cũng là kiến thức quan trọng nhất trong quá trình làm việc với reactjs. Ở phần tiếp theo chúng ta sẽ kết nối react app của chúng ta với server (sử dụng api) để làm một app crud cơ bản.

## Tài liệu tham khảo
https://reactjs.org/docs/getting-started.html

https://www.freecodecamp.org/news/react-beginner-handbook/