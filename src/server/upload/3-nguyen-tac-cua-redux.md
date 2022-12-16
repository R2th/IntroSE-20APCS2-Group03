# Three principles
Redux có thể được diễn tả dựa trên 3 nguyên tắc cơ bản

## Single source of truth
State của toàn bộ app sẽ được lưu trữ dưới dạng một object tree với một store duy nhất. Điều này giúp ta kiểm soát được trạng thái một cách đồng bộ trong toàn bộ app.

```javascript
console.log(store.getState())

/* Prints
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*/
```

## State is read-only
Cách duy nhất để thay đổi state là dispatch một action. Action sẽ là một Object mô tả kiểu action (type) và payload của nó.

```javascript
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
```

## Changes are made with pure functions
Để mô tả state tree sẽ thay đổi như thế nào dựa vào loại action, ta sử dụng reducers. Reducers sẽ là những pure function, nhận vào *action* và *previous state*, return *next state*. Reducers sẽ chỉ return một state object mới thay vì là thay đổi previous state. Bạn có thể đọc thêm về pure function [tại đây](https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c).

```javascript
function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

import { combineReducers, createStore } from 'redux'
const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)
```

# References
Bài viết được dịch từ nguồn: https://redux.js.org/introduction/three-principles