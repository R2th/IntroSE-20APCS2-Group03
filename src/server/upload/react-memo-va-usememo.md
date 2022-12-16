Từ phiên bản react 16.6 facebook giới thiệu `lazy`, `memo`, `contexType`. Công dụng thì các cụ có thể tham khảo link [này](https://reactjs.org/blog/2018/10/23/react-v-16-6.html)

# React Memo
React memo sinh ra với mục địch tránh việc rerender nhiều lần ảnh hưởng đến performance. Cũng giống như việc dùng `PureComponent` hay `shouldComponentUpdate`  được viết một cách ngắn gọn như sau

```js
const MyComponent = React.memo(function MyComponent(props) {
  /* only rerenders if props change */
});
```

Chúng ta hãy xem 1 ví dụ đơn giản với react meno sau đây

```js
const Child = React.memo(props => {
  console.log("rendered");
  return <React.Fragment>{props.name}</React.Fragment>;
});

class App extends React.Component {
  state = {
    value: 1,
    name: "Jioke"
  };

  handleClick = () => {
    this.setState({
      value: this.state.value + 1
    });
  };

  render() {
    return (
      <React.Fragment>
        <Child name={this.state.name} />
        <div>{this.state.value}</div>
        <button onClick={this.handleClick}>+</button>
      </React.Fragment>
    );
  }
}
```

Component `Child` của chúng ta đang bao là một react Memo, như vậy chúng có tác dụng gì chúng ta cùng phân tích nhé

Thứ nhất nó nhận prop là `name` truyền từ component `App`, bình thường mỗi lần chúng ta click button giá trị value thay đổi + 1. Và tất cả được rerender lại update lại Dom để chúng ta có thể nhìn thấy sự thay đổi.

Thứ 2 là có memo thi sao, khi chúng ta nhấn click button chỉ có giá trị value thay đổi `name` không đổi và được truyền vào component `Child` vì là có memo nên nó sẽ check prop chuyền vào có thay đổi không nếu thay đổi chúng sẽ rerender còn không thay đổi sẽ không cần làm gì, tương đối giống với việc sự dụng `shouldComponentUpdate` trong class component hay `PureComponent` phải không nào. Nhưng code nó sáng sủa mà dễ hiểu hơn rất nhiều phải không?

Cùng xem ví dụ trên [codeopen](https://codepen.io/kinsomicrote/pen/JwOoej?editors=1111) nhé.

Mỗi lần chúng ta click button thì component `Child` không hề được render lại, chúng ta chỉ thấy trong console chỉ duy nhất 1 lần `rendered` được in ra phải không. Và bạn có thể xóa memo đi xem kết quả sẽ thế nào nhé. Khi đó bạn sẽ thấy hiệu năng của nó, rất tuyệt vời phải không nào.
 
Từ phiên bản 16.8 facebook lại giới thiệu cho chúng ta khái niệm hook, ai chưa biết có thể tham khảo [tại đây](https://reactjs.org/docs/hooks-intro.html)

Vậy hook sinh ra cho mục đích gì nó gồm những thành phần nào? các cụ tự tìm hiểu. Mình xin nói qua là khi dùng function component  thì chúng chỉ đơn giản return ra 1 cái gì đó mà không dùng được ` lifecycle`. Hook sinh ra là làm cho function component từ cái đơn giản có thể dùng được state, call api như một class component mà nó thực sự là sự chuyển mình một sự thay thế hoàn hảo cho class component.
# useMemo
useMemo cũng giống như khái niệm `React memo`, nhưng có sự khác biệt rõ ràng. Nếu như  `React memo`  sinh ra với mục địch tránh việc rerender nhiều lần thì `useMemo` tránh cho việc tính toán lại một function lặp đi lặp lại nhiều lần mỗi lần component re-render.  Bản chất `useMemo` là caching lại giá trị return của function, mỗi lần component rerender nó sẽ kiểm tra giá trị tham số truyền vào function nếu giá trị đó không thay đổi, thì return value đã caching trong memory. Ngược lại nếu giá trị tham số truyền vào thay đổi, nó sẽ thực hiện tính toán lại vào trả về value, sao đó caching lại value cho những lần rerender tiếp theo.

Chúng ta xem ví dụ sau:
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
a,b là 2 tham số truyền vào `useMemo` để tối ưu cho tính toán khi component re-render

Trong react Memo tham số nó là `props` chuyền vào cho `Child` component.

Bây giờ chúng ta đi xét ví dụ sau:

```js
import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";

function App() {

  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  
  const words = ["hey", "this", "is", "cool"];
  const word = words[wordIndex];

  const computeLetterCount = word => {
    let i = 0;
    while (i < 1000000000) i++;
    return word.length;
  };

const letterCount = useMemo(() => computeLetterCount(word), [word]);

  return (
    <div style={{ padding: "15px" }}>
      <h2>Compute number of letters</h2>

      <p>
        "{word}" has {letterCount} letters
      </p>

      <button
        onClick={() => {
          const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
          setWordIndex(next);
        }}
      >
        Next word
      </button>
      <br />
      <br />
      <h2>Increment a counter (fast ⚡️)</h2>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```

Trong component `App` ta có 2 function thay đổi state là `setCount` và `setWordIndex`,  function `setWordIndex` return index of array. Trong function `computeLetterCount` truyền vào word và trả về chiều dài của `word` truyền vào, điều đặc biệt là function `computeLetterCount` sử dụng `useMemo` để tối ưu cho việc  tính toán mỗi lần component rerender. Chỉ khi nào `word`thay đổi thì function `computeLetterCount` mới được gọi. 

Cùng chạy ví dụ trên bằng [codeopen](https://codesandbox.io/s/usememo-04cgv) này nhé.

Các bạn xem console sẽ hiểu bản chất của vấn đề, khi ta bấm `Increment` button thì function    `computeLetterCount` không hề được gọi vì nó đang sử dụng `useMemo`. Còn khi bấm button `nextword` thì function `computeLetterCount` mới được gọi vì `word` thay đổi.

Qua 2 ví dụ trên ta thấy `React Memo` và `useMemo` là khá tương đồng bạn có thể dùng `React Memo` để tối ưu hóa việc rerender cho class component và function component, `useMemo` tối ưu hóa cho các tính toán phức tạo trong function component.

Trong boilerplate react khi ta sử dụng generate để render function component, nó tự động add thêm `React Memo` cho chúng ta, các bạn thử điều này nhé, nó cũng thật hữu ích cho chúng ta tiết kiệm khá khá thời gian phải không.