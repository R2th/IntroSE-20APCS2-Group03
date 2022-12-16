## Bắt đầu từ useState
Nói về React Hook, đã có nhiều bài viết về `useState`,  nó cho phép chúng ta sử dụng `state` và các chức năng khác của React (life cycle, side effect,...) mà không cần viết `class` component.
```js
import React, { useState } from 'react';

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

   Ở trên là 1 ví dụ đơn giản; `useState` hook khởi tạo initialState là tham số truyền vào, trả về cặp state value `count`,  và 1 hàm dùng để update state đó `setCount`, vì `useState` hook này cũng dễ hiểu nên mình chỉ nói ngắn gọn ngang đây thôi nhé.

## Từ useState đến useReducer
Vậy nếu trong trường hợp logic state của component trở nên lớn và phức tạp hợp thì khi đó dùng ta sẽ dùng một hàm hook là `useReducer` sẽ giúp chúng ta dễ quản lý và tổ chức state tốt hơn.

Vậy `useReducer` là gì, thực chất là là một phiên bản nâng cao của `useState`, dùng trong trường hợp local state của component phức tạp, có nhiều action làm thay đổi state đó. Thay vì các bạn dùng nhiều `useState` hoặc `useState` với value là nested object/array và viết nhiều function để thay đổi state thì bây giờ các bạn có thể tổ chức state và các action làm thay đổi state đó 1 cách logic nhờ `useReducer`

### Reducer là gì
Để sử dụng `useReducer` hook; đầu tiên chúng ta cần biết `reducer` là gì, đơn giản là một hàm có 2 tham số là state, action và trả về new state sau khi thực hiện một action, hãy tưởng tượng `reducer` như là một bộ chuyển đổi, nhận input, thực hiện action tác động đến input đó, rồi tạo ra output.

```js
(state, action) => newState
```

Chúng ta cùng xem qua một reducer cụ thể nhé:
```js
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};
```

Ở trên là một  Todo reducer; state ban đầu là list items todo, có 2 kiểu action type để chuyển đổi 2 trạng thái tương ứng của item là complete: true or false.

Và sử sụng todoReducer đó như sau:
```js
const initialTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: false,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: false,
  },
];

const action = {
  type: 'DO_TODO',
  id: 'a',
};

const newTodos = todoReducer(initialTodos, action);

console.log(newTodos);
// [
//   {
//     id: 'a',
//     task: 'Learn React',
//     complete: true,
//   },
//   {
//     id: 'b',
//     task: 'Learn Firebase',
//     complete: false,
//   },
// ]
```

Đó là 1 ví dụ đơn giản về `reducer`, cũng dễ hiểu đúng không nào, và bây giờ chúng ta cùng tìm hiểu `useReducer` hook trong React nhé

### useReducer hook 
Như đã nói ở trên `useReducer` hook được sử dụng trong trường hợp component có state phức tạp và có nhiều action type làm thay đổi state đó.

`useReducer` function nhận vào `reducer` và `initialState` khởi tạo ban đầu, trả về  `state` hiện tại và `dispatch` function dùng để trigger 1 action

Ok, chúng ta sẽ viết một TodoApp có thể render ra list item và toggle item đó đã hoàn thành hay chưa nhé, mình sẽ sử dụng lại `todoReducer` và `initialTodos` như trên nhé

```js
import React from 'react';

const initialTodos = [...]; // same as above
const todoReducer = (state, action) => newState; //same as above

const App = () => {
  const [todos, dispatch] = React.useReducer(
    todoReducer,
    initialTodos
  );

  const handleChange = todo => {
    dispatch({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleChange(todo)}
            />
            {todo.task}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default App;
```

Ở ví dụ trên:
- React.useReducer: dòng này sử dụng `useReducer` với 2 tham số `todoReducer` và `initialTodos`, trả về `todos` hiện tại và `dispatch` dùng để send action đến reducer làm thay đổi list `todos`
- handleChange: hàm này dùng để dispatch action chuyển đổi trạng thái của item là hoàn thành or chưa hoàn thành
- Tiếp theo chúng ta sẽ render ra list item `todos` đi kèm với 1 checkbox để switch trạng thái complete của item đó, mỗi lần check or uncheck thì sẽ call `handleChange`
- Mỗi lần switch trạng thái hoàn thành như vậy sẽ update `todos` và component sẽ đươcj render lại với list `todos` vừa được update

## Kết Luận
React `useReducer` hook là một cách hữu ích để quản lý state trong React bên cạnh `useState`, và nó có thể kết hợp với `context` dùng để quản lý state trong một ứng dụng mà có thể không cần sử dụng đến `redux`

Cảm ơn các bạn đã dành thời gian đọc, hãy chờ bài biết tiếp theo của mình nhé :grinning:

Refs:
https://reactjs.org/docs/hooks-reference.html#usereducer
https://www.robinwieruch.de/react-usereducer-hook/