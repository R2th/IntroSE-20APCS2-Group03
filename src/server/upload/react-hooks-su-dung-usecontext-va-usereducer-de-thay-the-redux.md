# useContext là gì?
Chia sẻ state giữa các component là bài toán phổ biến trong React App. Giải pháp tốt nhất là bạn phải lifting state (đẩy state từ component con lên component cha). Nhưng nó yêu cầu bạn phải truyền props xuống cho các component con. Điều đó không phải là vấn đề quá lớn, nhưng trong một số trường hợp truyền props xuống quá nhiều cấp component lại rất khó khăn và tốn nhiều thời gian.

Để tránh được vấn đề này, bạn có thể tạo một context để thêm những shared state và sau đó component nào cần thì bạn gọi context đó ra xài, không cần phải truyền từ cha xuống con nữa. Nó cũng giống như biến global được chia sẻ và sử dụng ở nhiều nơi, nhưng context được quản lí tốt hơn để maintain code dễ hơn.

Ví dụ sử dụng context:
```
import React from 'react';

const ExampleContext = React.createContext();

const App = () => {
  return (
    <ExampleContext.Provider value={{ color: 'red' }}>
      <div className='App'>
        <ChildComponent />
      </div>
    </ExampleContext.Provider>
  );
};

const ChildComponent = () => {
  const { color } = React.useContext(ExampleContext);

  return <p style={{ color }}>This text is {color}</p>;
};

export default App;
```

Đầu tiên chúng ta sẽ định nghĩa 1 context:
```
const ExampleContext = React.createContext();
```
Sau đó bao bọc toàn bộ thành phần DOM của component bằng thẻ Provider, đồng thời truyền giá trị mà mình muốn chia sẻ đến các component khác
```
<ExampleContext.Provider value={{ color: 'red' }}>
    <div className="App">
        <ChildComponent />
    </div>
</ExampleContext.Provider>
```
Như vậy là chúng ta đã có thể sử dụng context đó trong các component con thông qua useContext:
```
const ChildComponent = () => {
  const { color } = React.useContext(ExampleContext);

  return <p style={{ color }}>This text is {color}</p>;
};
```

# useReducer là gì?
Nghe cái tên thôi chúng ta cũng có thể đoán được ra nhiệm vụ của useReducer là gì rồi, chức năng của useReducer khá giống với Reducer trong Redux. 

Giống như Reducer trong Redux thì useReducer cũng nhận vào một reducer dạng (state, action) và trả ra một newState. Khi sử dụng chúng ta sẽ nhận được một cặp bao gồm current state và dispatch function.

Ví dụ sử dụng useReducer:
```
import * as React from 'react';

const countReducer = (state, action) => {
  const { type, step } = action;
  switch (type) {
    case 'INCREMENT': {
      return {
        ...state,
        count: state.count + step,
      };
    }
    case 'DECREMENT': {
      return {
        ...state,
        count: state.count - step,
      };
    }
    default:
      return state;
  }
};

const Counter = ({ initialCount = 0, step = 1 }) => {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;
  const increment = () => dispatch({ type: 'INCREMENT', step });
  const decrement = () => dispatch({ type: 'DECREMENT', step });
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};

const App = () => {
  return <Counter />;
};

export default App;
```

# Kết luận
Tóm lại là với useContext chúng ta có thể chia sẻ state tới các component, useReducer thì cho phép chúng ta cập nhật giá trị mới cho state. Nghe khá là giống với flow của Redux phải không nào?

Vậy thì chúng ta có thể thay thế Redux bằng React Hooks không?

Câu trả lời là có! Tuy nhiên chỉ khi mà App của bạn có quy mô nhỏ, không nhiều state và bạn chỉ muốn chia sẻ state giữa các Component thì bạn hoàn toàn có thể sử dụng useContext để thay thế cho Redux.

Còn nếu như App của bạn cần phải xử lý nhiều logic phức tạp thì lúc này bạn nên dùng sagas hoặc là middleware của Redux. Ngoài ra Redux còn cung cấp cho chúng ta một vài lợi thế quan trọng: 

- Browser Tools: bạn có thể sử dụng **React Dev Tools** để debug ứng dụng của mình. Nó cho phép chúng ta xem lại các dispatched actions, kiểm tra state và time travel. Bạn có thể chuyển đổi qua lại lịch sử của action và kiểm tra state trông như thế nào sau mỗi dispatched action.
- Testing: Redux dựa trên các pure function nên dễ dàng thực hiện kiểm thử. Tất cả các bài test đều tập trung vào việc kiểm tra outputs dựa trên các inputs đã cho.
- Patterns và tổ chức code: Redux được nghiên cứu kỹ lưỡng và có công thức cho hầu hết các vấn đề. Có một phương pháp gọi là Ducks mà bạn có thể sử dụng để tổ chức code Redux.

Cảm ơn các bạn đã theo dõi, hy vọng qua bài viết này các bạn sẽ có 1 cái nhìn chính xác hơn về React Hooks và Redux đồng thời đưa ra được những lựa chọn công nghệ phù hợp cho dự án của mình.