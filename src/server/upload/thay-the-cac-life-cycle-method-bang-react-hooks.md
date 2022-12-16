# 1. Introduce 
- Trong phiên bản React 16.8.0 được release cách đây không lâu thì react đã giới thiệu khái niệm `React Hooks` hoàn toàn mới, nó mang tới rất nhiều thay đổi đến cách mà chúng ta code một ứng dụng React.
- `Hooks` hướng chúng ta tới `functional component` chứ không phải `class component` như trước nữa.
- Ở bài này chúng ta sẽ tìm hiểu xem hook đã làm cho `stateless component` trở thành `stateful component` như thế nào.
# 2. Content
- Khái niệm `functional component` hay còn được hiểu là `stateless component` còn `class component` thì là `stateful component`. 
- Đúng như tên gọi của nó thì `stateless` nghĩa là ko có state.

```Javascript
// stateless component
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return <h1>Hello world</h1>;
}
ReactDOM.render(<App />, document.getElementById('root'));
```

- Hoặc stateful nghĩa là chúng ta có thể khai báo và sử dụng state.

```Javascript
// stateful component
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    state = { message: "Hello world" };
    
    render() {
        return <h1>{this.state.message}</h1>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### 2.1. State
- Ở trên mình có nói hooks đã làm cho stateless trở thành stateful như nào.
- Khi hook ra đời thì nó cung cấp cho chúng ta api gọi là `useState` và chính `useState` đã giúp `stateless component` trở thành `stateful component`.
- Ta sử dụng nó như sau

```Javascript
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [message, setMessage] = useState('Hello world');

    return <h1>{message}</h1>;
}
ReactDOM.render(<App />, document.getElementById('root'));
```

- Và kết quả chúng ta thu được là giống với 2 ví dụ trên.
- Giải thích một chút đoạn code trên, ở đây mình khởi tạo biến message và 1 hàm `setMessage` là hàm mặc định mà `useState` cung cấp để chúng ta thay đổi state `message` (tương tự như this.setState vậy). Còn giá trị mình truyền vào hàm useState là giá trị khởi tạo mặc định của state message.
- Vậy là chúng ta có thể sử dụng state trong functional component một cách rất dễ dàng rồi. Ngoài ra nếu bạn cần nhiều state hơn thì có thể sử dụng cú pháp tương tự để khai báo

```Javascript
...
const [name, setName] = useState('tunguyen');
const [age, setAge] = useState(40);
...
```

### 2.2. Lifecycle method

- Ngày trước thì trong functional component chúng ta không thể sử dụng được các lifecycle method của React.
- Hook cũng giúp chúng ta cả thiện các hạn chế này của functional component bằng cách cung cấp cho chúng ta các api như là `useEffect`.

- `useEffect` được sử dụng để thay thế cho các lifecycle method như `componentDidMount`, `componentDidUpdate`,  `componentWillReceiveProps`, `componentWillUnMount`.

```Javascript
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Counter = () => {
    useEffect(() => {
        console.log('mounted');
    });
    
    return <p>Hello world</p>;
};
ReactDOM.render(<Counter />, document.getElementById('root'));
```
- Xem ví dụ trên thì khi chạy ta sẽ thấy log `mounted` được in ra sau khi component được render, tương tự như hàm `componentDidMount`.

```Javascript
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Counter = () => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        console.log('mounted or updated');
    });
    
    return (
        <>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
        </>
    );
};
ReactDOM.render(<Counter />, document.getElementById('root'));
```
- Ví dụ tiếp theo trên đây thì `useEffect` được sử dụng như là `componentDidUpdate`. Mỗi khi hàm `setCount` chạy xong là thay đổi giá trị của count thì hàm useEffect đều được trigger.

```Javascript
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [count, setCount] = useState(0);

  return <Counter countProps={count} setCountProps={setCount} />;
};

const Counter = (props) => {
  const { countProps, setCountProps } = props;

  useEffect(() => {
    console.log("mounted or updated");
  });

  return (
    <>
      <p>{countProps}</p>
      <button onClick={() => setCountProps(countProps + 1)}>+</button>
      <button onClick={() => setCountProps(countProps - 1)}>-</button>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
```
- Ví dụ tiếp theo thì `useEffect` hoạt đông như là `componentWillReceiveProps`, mỗi khi prop `countProps` thay đổi thì hàm `useEffect` sẽ được gọi ngay lập tức.

- Và `useEffect` cũng được gọi khi component unmount. Ta sử dụng như sau:

```Javascript
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/counter" component={Counter} />
        <Route path="/home" component={HomePage} />
      </Switch>
    </Router>
  );
};

const HomePage = () => {
  useEffect(() => {
    console.log("homepage mounted or updated");
  });

  useEffect(() => {
    return () => {
      console.log("homepage unmounted");
    };
  }, []);

  return (
    <>
      <Link to="/counter">Go to counter page</Link>
      <p>Home page</p>
    </>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("counter mounted or updated");
  });

  useEffect(() => {
    return () => {
      console.log("counter unmounted");
    };
  }, []);

  return (
    <>
      <Link to="/home">Go to homepage</Link>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
```

- Chúng ta sẽ viết thêm 1 useEffect khác để phục vụ cho việc khi component unmount, ta sử dụng thêm cú pháp [] để chỉ ra useEffect sẽ được call 1 lần duy nhất khi component unmount.
- Với đoạn code trên khi chúng ta chuyển qua lại giữa counter page và homepage thì trong log sẽ log ra như sau


![](https://images.viblo.asia/e00ae960-507f-4080-a4cf-7fcfe7eb8e6e.png)

- Chúng ta còn có thể linh hoạt sử dụng useEffect để tương tác vs prevProps như là `componentWillReceiveProps` vậy
- Cùng xem ví dụ sau
```Javascript
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const App = () => {
  const [count, setCount] = useState(0);

  return <Counter countProps={count} setCountProps={setCount} />;
};

const Counter = props => {
  const { countProps, setCountProps } = props;

  useEffect(() => {
    console.log("mounted or updated");
  });

  const prevCountProps = usePrevious(countProps);

  return (
    <>
      <p>{countProps}</p>
      <p>{prevCountProps}</p>
      <button onClick={() => setCountProps(countProps + 1)}>+</button>
      <button onClick={() => setCountProps(countProps - 1)}>-</button>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
```
- Hàm `usePrevious` sử dụng 2 hook rất linh hoạt trong trường hợp này, nó tạo 1 reference để lưu trữ giá trị của count hiện tại sau đó return ra value của nó, để khi useEffect thì giá trị của reference sẽ được gán bằng giá trị của count. Lần sau khi setCount thì nó sẽ trả ra gía trị trước đó của count. Đây là tip khá thú vị mình tìm được trên trang chủ của react.
# 3. Conclusion
- Trên đây mình đã giới thiệu cũng như đưa ra 1 vài ví dụ về 2 hook useState và useEffect có thể giúp chúng ta biến functional component có thể chạy được y như class component.
- Hiện tại dự án mình đang tham gia cũng đã chuyển qua sử dụng hook và functional component để thay thế cho class component rồi, tương lai chắc chắn hook sẽ được sử dụng rất phổ biến vì sự hiểu quả của nó.
# 4. References
- https://reactjs.org/docs/hooks-state.html
- https://reactjs.org/docs/hooks-effect.html
- https://reactjs.org/docs/hooks-faq.html