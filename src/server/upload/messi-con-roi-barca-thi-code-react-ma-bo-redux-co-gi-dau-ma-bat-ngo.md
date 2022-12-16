Chào mọi người, sau một năm Thọi lên núi bế quang tu luyện thì nay mình đã trở lại với tất cả mọi người rồi đây. (-\_-) Chuyện là mấy ngày nay, chắc hẳn các bạn đều hay tin là Messi đã rời Barcelona sau gần 21 năm gắn bó. Thông qua sự kiện này, mình bất chợt nhớ đến là từ lâu mình đã không còn sử dụng Redux :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

![](https://images.viblo.asia/01d1eb63-1e3a-46e2-97d1-afaa24d2e903.jpeg)

Các bạn có thể follow medium của mình: https://huynhtrongthoai.medium.com/messi-c%C3%B2n-r%E1%BB%9Di-baca-th%C3%AC-code-react-m%C3%A0-b%E1%BB%8F-redux-c%C3%B3-g%C3%AC-%C4%91%C3%A2u-m%C3%A0-b%E1%BA%A5t-ng%E1%BB%9D-d650cb06c72

### Vậy tại sao mà mình đã từ bỏ Redux?

Quay lại một xíu về quá khứ, lúc mà React vẫn còn đơn sơ, thì việc quản lý global state của ứng dụng đều do thằng root đảm nhận … Mỗi lần component ông nội muốn gửi state cho component cháu đều phải gửi thông qua component cha.

Chính điều đó, dẫn đến việc mã code của ta lằn nhằn, rối bời vì props được truyền vào component cha đó sẽ không có ích gì cho bản thân của nó. Vì vậy nó được anh chị giang hồ đồn đại với cái tên là **Prop drilling.**

> Nhưng không sao, ở đâu có cái khó, ở đó có Redux. Redux thật sự giúp chúng ta giải quyết vấn đề trên bằng cách tạo ra 1 store chung để quản lý tất cả state của ứng dụng.

![image.png](https://images.viblo.asia/80159c36-0b0b-4c09-b505-9b25a9cace5c.png)

Tuy nhiên, khi làm việc với Redux, chúng ta sẽ bắt gặp một vài nhược điểm như sau:

*   Tốn quá nhiều thời gian để code, quá nhiều file từ action, reducer, middleware,…
*   Chỉ cần 1 thay đổi nhỏ => Redux sẽ cấu trúc lại DOM => giảm hiệu suất.
*   Không cache state.

Cứ tưởng Redux cứ mãi trên đỉnh cao thì ông tổ React đã cho ra đời một bộ chiêu thức mới: React Hook + Context API  và gần như khắc phục hoàn toàn nhược điểm trên.

Và từ đó, React như khẳng định lại quan điểm: “Thà ta phụ người thiên hạ, chứ không để Redux chiếm thị phần của ta”.
### Bộ chiêu thức React-hook với Context API sẽ thi triển như thế nào?

Để build một ứng dụng React, đơn giản nhất là chỉ cần sử dụng useReducer và useContext.

*   useReducer: nhận vào `reducer` và `initialState` khởi tạo ban đầu, trả về `state` hiện tại và `dispatch` function dùng để trigger 1 action.
*   useContext: là một hooks trong React Hooks cho phép chúng ta có thể làm việc với React Context trong một functional component.

Các bạn nếu muốn hiểu rõ nó là gì thì có thể ghé thăm bài này của mình: [https://huynhtrongthoai.medium.com/reactjs-understand-the-nature-of-hook-in-react-8b0d73563e33](https://huynhtrongthoai.medium.com/reactjs-understand-the-nature-of-hook-in-react-8b0d73563e33)

Sau đây là cách implement cơ bản trong một component:

```
// TodoApp.js
import { useReducer, createContext, useMemo } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

export const AppContext = createContext(null);
const cache = {};

export default function TodoApp() {
  const [state, dispatch] = useReducer(reducer, cache.state || initialState);
  cache.state = state;
  const actions = useMemo(() => ({
    setInput: (value) => {
      dispatch({
        type: 'SET_INPUT', 
        payload: value
      })
    },
    addTodo: ({ id, content }) => {
      dispatch({
        type: 'ADD_TODO',
        payload: { id, content }
      })
    }
  }), []);
  return (
    <AppContext.Provider value={[state, actions]}>
      <div className="todo-app">
        <h1>{state.title}</h1>
        <input value={state.input} onChange={e => actions.setInput(e.target.value)} />
        <AddTodo />
        <TodoList />
      </div>
    </AppContext>
  );
}
```

Tuy nhiên, khi làm với **context** ta cần chú ý rằng: “Chỉ cần một giá trị trong contextProvider bị thay đổi thì toàn bộ các component trong context đều render lại.

Và ta sẽ giải quyết vấn đề bằng cách sử dụng useMemo để memorize component.

```
// AddTodo.js
import { useContext, memo } from 'react';
import { appContext } from './TodoApp';

const genId = () => Math.rand();

export default const AddTodo = () => {
  const [state, actions] = useContext(appContext);
  return useMemo(() => {
    function handleAddTodo() {
      if (content) {
        actions.addTodo({ id: genId(), content: input });
        actions.setInput('');
      }
    }
    return  (
      <button onClick={handleAddTodo}>
        Add Todo
      </button>
    );
  }, [state.input, actions])
}
```

Như vậy, ta đã có thể dễ dàng thay thế redux rồi phải không nào? Tuy nhiên mình có một số lưu ý khi làm việc với Hook + Context.

*   Bạn không nên tiếp cận Context để giải quyết mọi vấn đề chia sẻ state.
*   Context KHÔNG nhất thiết phải chung cho toàn bộ ứng dụng mà có thể được áp dụng cho từng module, từng phần riêng lẻ.
*   Bạn có thể (và có lẽ nên) có nhiều context được phân tách hợp lý trong ứng dụng của mình.

### **Vậy khi thao tác với API thì phải tạo rất nhiều state như data, loading, errors?**

Lúc này, có lẽ chúng ta nên nhờ vào một thư viện phù hợp hơn với Hook. Mình biết có 3 thư viện mà support cho vấn đề này.

*   React-Query (**recommend**): mình sẽ phân tích nó trong bài tiếp theo.
*   SWR: khá giống với React-Query với sự đỡ đầu của NextJS.
*   Apollo Client: cú pháp tương tự như React-Query.

> Điểm khác biệt là Apollo Cient sẽ làm việc với GraphQL còn React-Query và SWR sẽ làm việc với REST API.

### Tổng kết

Cuối cùng chúng ta đã hiểu tại sao mà Redux đang dần bị thay thế bởi Hook và Context API. Thông qua đó, ta cũng đã biết được cách để quản lý state ứng dụng mà không cần đến Redux.

Hy vọng bài viết này thực sự hữu ích với các bạn.

> **Nếu các bạn thấy hay, xin cho mình vài like để tạo động lực cho mình làm các bài tiếp theo ạ !!! Cảm ơn mọi người rất nhiều ❤**

Tài liệu tham khảo: [https://dev.to/ipshot/enhancing-usereducer-38ba](https://dev.to/ipshot/enhancing-usereducer-38ba)