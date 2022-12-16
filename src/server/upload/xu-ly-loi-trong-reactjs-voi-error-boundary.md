### Xin chào mọi người, hôm nay mình xin giới thiệu 1 khái niệm trong ReactJs, đó là Error Boundary. 
## Error Boundary là gì ?
Trước đây khi có lỗi ở một `component`, ReactJS sẽ trả ra những lỗi khó hiểu ở các lần render tiếp theo, gây lỗi cho toàn bộ ứng dụng, điều này khiến việc sửa và phục hồi do gặp bug rất khó khăn.
Từ bản `16`, ReactJS mang đến một khái niệm mới `Error Boundary`, là một `component` hỗ trợ việc xử lý lỗi.
## Error Boundary có tác dụng gì ?
Nếu bạn đã từng sử dụng `try ... catch` block, thì bạn có thể hiểu `Error Boundary` có tính năng tương tự, nhưng thay vì áp dụng cho 1 đoạn code thì sẽ áp dụng cho `component`. 

`Error Boundary` sẽ bắt lỗi của tất cả cả các component con, in ra các lỗi đó, và hiển thị ra một `fallback UI ` (Một phẩn hiển thị dự phòng). 

Error Boundary bắt lỗi trong quá trình `render`, trong các hàm `lifecycle`, và trong hàm khởi tạo của tất cả các `component` ở dưới nó (miễn là trong cùng 1 `component tree`). 

### Error Boundary dùng thế nào ?

Bạn chỉ có thể tạo 1 `Error Boundary` bằng 1 ***Class component***.

Một Class component trở thành 1 Error Boundary nếu nó định nghĩa một hoặc cả 2 hàm sau
```js
static getDerivedStateFromError()
```
Hàm này dùng để `render` một `fallback UI` nếu có lỗi được trả ra.

```js
componentDidCatch()
```
Hàm này dùng để bắt và log hoặc hiển thị ra lỗi.

Sau khi `component` của bạn có cả 2 hàm này, bạn sẽ bọc nó quanh một component khác để sử dụng tính năng `Error Boundary`.

### Ví dụ
```jsx
import React, { useState } from "react";
import "./styles.css";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Some thing went wrong</h1>;
    }
    return this.props.children;
  }
}

export default function App() {
  const [counter, setCounter] = useState(0);

  if (counter === 3) {
    throw new Error("Oops, You triggered Doomsday!");
  }

  const countUntilDoom = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={countUntilDoom}>Click on me for money</button>
      <h2>{counter}</h2>
    </div>
  );
}

```

Và trong file index.js
```js
import React from "react";
import ReactDOM from "react-dom";

import App, { ErrorBoundary } from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  rootElement
);
```

Mình xin giải thích ví dụ này như sau:

Bạn có 1 component là `App`, phần `render` của `component` này được bọc quanh 1 `Error Boundary`.
Component này có 1 button mà khi ấn đủ 3 lần nó sẽ trả ra 1 lỗi. Và thay vì màn hình trắng như mọi khi, Error Boundary sẽ bắt được lỗi của component bên trong và render ra `<h1>Some thing went wrong</h1>`

### Error Boundary nên đặt ở đâu ?
Điều này là tùy vào người viết, có thể đặt ở tầng trên cùng của ứng dụng để bắt toàn bộ lỗi, cũng có thể đặt sâu hơn để bắt lỗi cho cụ thể. 

### Giới hạn của Error Boundary
Error Boundary không thể bắt lỗi cho 
- Event Handler 
- Các hàm chạy bất đồng bộ (`setTimeout` hoặc `requestAnimationFrame`)
- Server side render
- Lỗi được phát ra từ chính nó
- Lỗi của các component ở bên trên nó
- Lỗi của component cách component tree của nó 8000 dặm 


Hy vọng sau bài viết này bạn đã có 1 công cụ hữu ích giúp debug trên ứng dụng ReactJs. Bạn có thể đọc thêm ở [đây](https://reactjs.org/docs/error-boundaries.html) .
Cảm ơn vì đã đọc.