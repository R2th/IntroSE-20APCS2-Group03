### Mở đầu
2018 là năm mà **React** thật sự chuyển mình quá mạnh mẽ, chúng ta chào đón **React Fiber** - kiến trúc mới trên phiên bản **React 16**, cùng một loạt những thay đổi về **lifecycle** và nhiều **API** mới liên tục xuất hiện trong những phiên bản nhỏ gần đây như **Context API, Fragment, React Lazy, ForwarRefs,...**  
Khi mà chưa kịp làm quen với mớ API mới ở trên thì tại **Hội nghị React** cuối tháng 10 vừa qua, **Hooks** được giới thiệu trên phiên bản **React 16.7-alpha** nhằm tạo tiền đề cho một sự **tiến hoá** tiếp theo của "thư viện" mà chúng ta vẫn luôn yêu thích.

Vậy **Hooks** là gì? theo định nghĩa chính thức, **Hooks** là các **functions** cho phép chúng ta sử dụng các thuộc tính **state** và **lifecycle** trong **functional component**. Hooks không làm việc bên trong **class** mà giúp ta sử dụng **React** mà không cần sử dụng **class**. Như vậy **Hooks** giúp **functional component** có đầy đủ tính năng như **class component**.

Sau đây mình xin giới thiệu cách sử dụng một vài **API** chính của **React-Hooks**
### useState
```js
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
**useState** là một **function** trả về một giá trị **state** và **function** cập nhật giá trị của **state** đó đi theo một cặp. Có thể được gọi **setCount** trong hàm xử lý **event** hoặc một nơi khác. Nó khá tương đồng với **setState** trong **class component**, giá trị **0** truyền vào **function** **useState** là giá trị ban đầu của **state _count_** và chỉ có giá trị trong lần **render** đầu tiên.  
Có thể có nhiều **useState** được gọi trong một **component** nếu cần khai báo nhiều **state**. Cách khai báo kiểu **array destructuring** cho phép chúng ta đặt tên phù hợp cho mỗi **state**.
```js
  const [age, setAge] = useState(4)
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```
### useEffect
**useEffect** là **hooks functions** giúp xử lý các ảnh hưởng / thay đổi bên trong **components**.
```js
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    return function cleanup() {
      console.log('unmount!)
    }
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
**useEffect** trong ví dụ được thực thi sau khi **component** **render** lần đầu và mỗi khi giá trị của **count** được thay đổi. Nếu như bạn quen với **lifecycle** trong **React**, thì **useEffect** tương đồng với **componentDidMount, componentDidUpdate và componentWillUnMount**. Đối với những hàm **lifecycle** khác:  
* **constructor**: vì là **function components** nên sẽ không cần thiết **constructor** nữa. 
* **getDerivedStateFromProps**: Sẽ phát triển trong tương lai.
* **shouldComponentUpdate**: Sử dụng **React.memo** để thay thế.
* **render**: Chính là **functional component**.
* **componentDidCatch** và **getDerivedStateFromError**: Sẽ phát triển trong tương lai.
Như vậy **useEffect** là chưa đủ để thay thế hoàn toàn **Lifecycle** bên trong **class component** hiện tại.

### useReducer
Trước hết thì **useReducer** là một **API** trong phiên bản **React 16.7-alpha**, không liên quan gì đến **redux** cả. Ví dụ sử dụng **useReducer**:
```js
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset'})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```
**useReducer** có 2 thành phần **state** và **dispatch** và nhận vào 2 tham số giá trị khởi tạo **initialState**.**useReducer** cho phép ta quản lý **state** theo kiến trúc **Flux** nổi tiếng (kiến trúc tạo nên thư viện như **Redux** hay **Vuex**). Sử dụng **useReducer** thay cho **useState** khi chúng ta có **state** phức tạp chứa nhiều **sub-value**. Đồng thời giúp tối ưu hiệu năng cho **component** khi cần xử lý **deep update**.  
Qua một vài **API** chính thì có thể thấy  **Hooks** ra đời nhằm mục đích chuyển mọi **component** về dạng **function**, đồng thời các thao tác cũng như tư duy quản lý **state** bên trong **component** cũng hoàn toàn thay đổi, đọc đến đây thì thấy rằng cũng có kha khá thứ sẽ cần giải quyết để **Hooks** thật sự mạnh mẽ, thay thế hoàn toàn được **class components** phải không, vì còn nhiều vấn đề về **lifecycle** hay việc **connect** với thư viện nổi tiếng đi kèm là **Redux** vẫn chỉ đang trong quá trình phát triển. Trước mắt thì **Hooks** sẽ được phát triển song song và chỉ có trên phiên bản **16.7-alpha**, chúng ta vẫn sẽ sử dụng **class component** như bình thường và cùng chờ đợi phiên bản chính thức. Mình thấy rằng **Hooks** có thể là bước đột phá của **React** khi chuyển toàn bộ **component** dựa trên **function**, sẽ là một bước tiến hứa hẹn.
Trên đây là bài viết giới thiệu về **React Hooks** của mình, cảm ơn các bạn đã theo dõi.  
- Tài Liệu Tham khảo [React Docs](https://reactjs.org/docs/getting-started.html)