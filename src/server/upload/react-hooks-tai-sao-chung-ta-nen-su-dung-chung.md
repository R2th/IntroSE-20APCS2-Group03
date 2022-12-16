Hook là một khái niệm mới đc React team công bố gần đây ở React Conf 2018. Nó cho phép một functional component có thể sử dụng state, sử dụng các lifecycle method, context và nhiều thứ khác. Cộng đồng React đã có nhiều ý kiến trái chiều và suy nghĩ về tương lai phát triển của React. Tôi đã nghịch thử hooks vào cuối tuần và sau đây là một số lý do tôi nghĩ hooks là một ý tưởng hay.

### Không còn wrapper hell

![](https://images.viblo.asia/a111e269-2d96-419b-b3e5-0a6201935c5e.png)

Nếu bạn đang làm việc với React, hình ảnh trên hẳn sẽ rất quen thuộc, có lẽ bạn thấy chúng hàng ngày. Cho đến bây giờ, cách chính để tái sử dụng logic cho các component là bọc chúng trong một component khác, hay còn gọi là Higher Order Component hoặc sử dùng render props.

Với hooks, chúng ta có thể tái sử dụng logic trong component mà ko cần tạo ra một HOC hay sử dụng render props pattern.

Ví dụ bạn muốn tạo mộ logic counter, có thể tăng hoặc giảm. Bởi vì logic này có thể đc sử dụng ở nhiều component khác nhau, bạn muốn chúng có thể tái sử dụng đc. Đây là cách làm với HOC:

```
import React from 'react';
import ReactDOM from 'react-dom';

const withCounter = Component => {
  return class ComponentWithCounter extends React.Component {
    state = {
      count: 0,
    };

    handleDecrement = () => {
      this.setState({ count: this.state.count - 1 });
    };

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      const { count } = this.state;

      return (
        <Component {...this.prop} count={count} onIncrease={this.handleIncrement} onDecrease={this.handleDecrement} />
      );
    }
  };
};

const App = ({ count, onIncrease, onDecrease }) => {
  return (
    <div>
      <div>Current count: {count}</div>
      <div>
        <button onClick={onDecrease}>-</button>
        <button onClick={onIncrease}>+</button>
      </div>
    </div>
  );
};

const AppWithCounter = withCounter(App);

ReactDOM.render(<AppWithCounter />, document.getElementById('root'));
```

Và đây là cách làm với hooks

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const useCounter = () => {
  const [count, setCount] = useState(0);

  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);

  return [ count, onIncrease, onDecrease ];
};

const App = () => {
  const [ count, onIncrease, onDecrease ] = useCounter();

  return (
    <div>
      <div>Current count: {count}</div>
      <div>
        <button onClick={onDecrease}>-</button>
        <button onClick={onIncrease}>+</button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

Ko cần class, cũng chẳng cần wrapper. Một component chỉ đơn giản là sử dụng cái hook mà chứa logic đó.

### Effect Hook

Theo cách hiện tại, khi chúng ta muốn thực hiện một điều gì đấy sau khi render xong, chúng ta sẽ sử dụng ComponentDidUpdate. Nhưng vì ComponentDidUpdate ko đc gọi ở lần render đầu tiên, chúng ta sẽ cần phải viết đoạn code y hệt như thế ở ComponentDidMount nữa.

![](https://images.viblo.asia/b1dd2e59-555d-45a8-8963-337e9676fd29.png)

Rất may thay, có một hook dành cho những việc như này, nó đc gọi là useEffect. Về cơ bản thì effect là thứ mà sẽ đc gọi sau mỗi lần render. Đoạn code trên có thể đc viết ngắn gọn lại như sau:

![](https://images.viblo.asia/beb62f1c-38af-49ef-a4e0-ccf93d06b91a.png)

Có thể bạn nghĩ rằng nó sẽ ko hiệu quả lắm nếu cứ chạy làm effect sau mỗi lần render, và bạn đã đúng. React team đã tính đến trường hợp này và đã cung cấp cho chúng ta một cách để tối ưu chúng. useEffect hook nhận thêm một mảng vào đối số thứ hai, nó sẽ chỉ chạy lại effect nếu giá trị trong mảng khác với giá trị trước đó.

![](https://images.viblo.asia/5e493aec-9a26-4084-9960-8efc6391e169.png)

Và một điều rất hay nữa ở effect là chúng đc deferred sau quá trình vẽ của browser. Ví dụ một trường hợp code lởm như sau:

```
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const usePerformance = initialTimestamp => {
  const [timings, updateTimings] = useState([]);
  let prev = initialTimestamp;

  useEffect(() => {
    const newTimestamp = new Date().getTime();

    updateTimings([...timings, newTimestamp - prev]);
    prev = newTimestamp;
  });

  return timings;
};

const App = () => {
  const timings = usePerformance(new Date().getTime());

  return (
    <div>
      <div>Performance timings </div>
      <div>
        {timings.map((time, i) => (
          <div key={i}>
            Re-render number {i} took {time}
            ms
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

Nhìn qua bạn cũng có thể thấy rằng component App sẽ liên tục bị re-render sau mỗi lần render, điều này cũng giống như bạn gọi setState ở componentDidUpdate vậy. Nhưng vì useEffect ko block main thread nên người dùng vẫn có thể thao tác với app bình thường mặc dù nó liên tục bị re-render.

Nếu bạn muốn useEffect chạy ở main thread, có một số cách khác như useLayoutEffect và useMutationEffect. Bạn có thể đọc chúng ở [React docs](https://reactjs.org/docs/hooks-reference.html)

### Khiến code đc minified tốt hơn
Theo ý kiến của tôi thì đây là lý do lớn nhất cho câu hỏi tại sao chúng ta nên sử dụng hook.

Hook cho phép chúng viết hoàn toàn bằng functional component mà ko cần phải dùng tới class-based component. Các minifier của javascript ko hoạt động ngon lắm với class. Bạn có thể xem thêm ở [video này](https://youtu.be/lsd2-TCgHEs) để biết thêm về vấn đề.

Ở đầu bài viết, tôi có 2 đoạn code, một sử dụng HOC và một sử dụng hook. Hãy thử so sánh giữa 2 file bundle đc generate ra xem sao. Cả 2 đều đc gen bởi webpack, bạn có thể xem ở đây

[usingHOC.bundle.js](https://gist.github.com/jackyef/761390607b241667ed0f05fb49a0691f#file-usinghoc-bundle-js-L123) (3.5 KiB minified, 174 lines)
[usingHook.bundle.js](https://gist.github.com/jackyef/f49a3464b67f4cd75fbacd0474080b8b) (2.47 KiB minified, 150 lines)

Ngoài vấn đề dung lượng file và số dòng code, nếu để ý bạn sẽ thấy chúng ta vẫn còn một số biến là handleDecrement, onDecrease... ở usingHOC.bundle.js. Các biến đó ko thể minify đc vì chúng ta sử dụng class. Nếu bạn thử search những biến đấy ở usingHook.bundle.js, bạn sẽ ko thể thấy chúng.

Sự khác biệt giữa 1 KiB dung lượng file cũng khá bất ngờ, nếu ở một app React lớn hơn, dung lượng tiết kiệm đc sẽ càng lớn hơn nữa.

Cám ơn vì đã đọc.

Bài viết được dịch lại của tác giả Jacky Efendi từ: https://medium.com/@jackyef/react-hooks-why-we-should-embrace-it-86e408663ad6