# Tổng quan bài viết
Trong version 16.8 gần đây, trang chủ của reactjs đã công bố chính thức việc đưa vào sử dụng react hooks sau thời gian thử nghiệm. các bạn có thể xem [tại đây](https://reactjs.org/docs/hooks-intro.html) với nhiều tính năng mới như khả năng sử dụng local state trong component, xử lý side effects và nhiều thứ khác. 
> Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

Nghe thôi đã thấy sướng rồi. Nhưng còn nhiều hơn thế, nhưng bài viết này sẽ không tập chung vào react hook mà tôi muốn nói đến `redux hook` (một thứ rất được recommend dùng với react).

Tại sao lại có redux hook, đơn giản thôi, redux sống với react, khi react thay đổi thì nó cũng cần thay đổi chứ sao!

Reac Redux hiện tại cũng đã cũng cấp API hook để thay thể connect() ở HOC như trước đây. API này cho phép bạn đăng ký tới Redux store và dispath actions. mà không cần phải sử dụng connect để wrap component.

**Chú ý**: React redux hook được thêm vào từ version v7.1.0 (No Breaking Changes).

Nội dung bài viết:
* useSelector()
* useDispatch()
* useStore()
* Chú ý khi dùng
* Một vài hooks hữu ích
## Sử dụng Hooks trong React Redux()

Nếu trước đây bạn sử dụng connect(), và bạn phải wrapp App component của bạn bằng 1 component là `<Provider>` như ví dụ này:
```
const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
với bạn update mới, bạn có thể import và sử dụng bất ký thứ gì trong React redux hook api vào trực tiếp function component. :)
## useSelector()
`const result : any = useSelector(selector : Function, equalityFn? : Function)`

Thay thế cho việc bạn dùng mapStateToProps để lấy state của Redux store ra sử dụng trong component. selector sẽ được gọi dựa theo function bạn truyền vào trong tham số đầu tiên của useSelector, với tham số đầu tiên của function chính là store state.

chú ý: 
*     Function là tham số của useSelector nên là 1 pure function.
*     Nó sẽ chạy mỗi khi action được dispatch hoàn tất.
*     Một số điểm khác việt việc dùng useSelector và mapState:
        - Selector có thể trả về bất kỳ giá trị nào không chỉ là 1 object. Kết quả trả về của selector sẽ được sử dụng giống như kết quả trả về của useSelector() hook.
        - Khi action được dispatch, useSelector() sẽ so sánh (shallow compare) giá trị mới và cũ của selector, nếu chúng khác nhau thì component sẽ render lại. còn không thì việc render lại sẽ không diễn ra.
        - hàm get selector không nhận ownProps làm tham số. tuy nhiên props có thể được sử dụng thông qua closure (xem tại đây).
        - Phải cẩn trọng khi sử dụng memoizing selectors.

Bạn có thể gọi nhiều lần useSelector() trong 1 function component, mỗi lần gọi nó sẽ tạo 1 subscription tới redux store riêng.

## Cơ chế So sánh và cập nhật
khi function component render, selector function sẽ được gọi và kết quả của nó sẽ được trả về từ useSelector() hook (giá trị trả về sẽ được cache để trả về cho lần gọi tới nếu selector không bị thay đổi).

Tuy nhiên, nếu 1 action được dispath trên redux store. useSelector() chỉ render lại khi selector được subcribe trả về mới phải khác với gía trị cũ của nó. tại bản v7.1.0-alpha.5, phép so sánh giữ 2 phiên bản cũ và mới của selector là ===. đây chính là sự khác biệt so với connect() mà chúng ta hay sử dụng ngày trước. Chúng chỉ được so sánh == trong giá trị trả về của mapSate để xác định component có cần render lại hay không. Việc dùng useSelector sẽ giúp bạn quản lý redux state chặt chẽ hơn.

với mapState, tất cả các selector được trả về trong một object. tạo ra object mới mỗi lần cũng không là vấn đề, connect() sẽ so sánh từng selector trong nó.

với việc dùng useSelector, đương nhiên rằng việc bạn trả về 1 object mới thì nó sẽ re-render lại rồi. vậy đừng nên trả về trong useSelector một object. thay vào đó bạn hãy thử: 
-  dùng nhiều useSelector cho riêng các selector muốn sử dụng.
-  dùng reselect hoặc tự viết 1 lib ra để quản lý state dạng này. 
-  dùng shallowEqual như một function truyền vào tham số thứ 2 của useSelector
=> mục đích cuối cùng cũng như việc tương tự bạn sử dụng _.isEqual() hoặc Immutable.js để so sánh

Ví dụ:
cách dùng đơn giản
```
import React from 'react'
import { useSelector } from 'react-redux'

export const CounterComponent = () => {
  const counter = useSelector(state => state.counter)
  return <div>{counter}</div>
}
```

dùng props để xác định cái gì được lấy ra:

```
import React from 'react'
import { useSelector } from 'react-redux'

export const TodoListItem = props => {
  const todo = useSelector(state => state.todos[props.id])
  return <div>{todo.text}</div>
}
```

### Sử dụng memoizing selectors

khi muốn sử dụng useSelector() chỉ trong component, xem ví dụ bên dưới. một instance mới của selector được tạo ngay sau khi component được render. Nó hoạt động nếu không giữ một state nào. Nó sẽ dùng để tạo ra một giá trị selector mới.

Tuy nhiên việc tạo memoizing selector từ việc sử dụng createSelector từ reselector có state bên trong. và do đó phải cẩn thận khi sử dụng chúng. Dưới đây bạn có thể tìm thấy các kịch bản sử dụng điển hình của memoizing selector.

Khi selector chỉ phụ thuộc vào state, chỉ cần đảm bảo rằng nó được khai báo bên ngoài component để sử dụng mỗi lần render.

```
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const selectNumOfDoneTodos = createSelector(
  state => state.todos,
  todos => todos.filter(todo => todo.isDone).length
)

export const DoneTodosCounter = () => {
  const NumOfDoneTodos = useSelector(selectNumOfDoneTodos)
  return <div>{NumOfDoneTodos}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <DoneTodosCounter />
    </>
  )
}
```

Điều tương tự cũng đúng nếu selector phụ thuộc vào props của component, nhưng sẽ chỉ được sử dụng trong một trường hợp duy nhất component:
```
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const selectNumOfTodosWithIsDoneValue = createSelector(
  state => state.todos,
  (_, isDone) => isDone,
  (todos, isDone) => todos.filter(todo => todo.isDone === isDone).length
)

export const TodoCounterForIsDoneValue = ({ isDone }) => {
  const NumOfTodosWithIsDoneValue = useSelector(state =>
    selectNumOfTodosWithIsDoneValue(state, isDone)
  )

  return <div>{NumOfTodosWithIsDoneValue}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <TodoCounterForIsDoneValue isDone={true} />
    </>
  )
}
```
Tuy nhiên, khi selector được sử dụng trong nhiều instance của component và phụ thuộc vào props của component, bạn cần đảm bảo rằng mỗi instance của component  có phiên bản selector riêng của nó

```
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const makeNumOfTodosWithIsDoneSelector = () =>
  createSelector(
    state => state.todos,
    (_, isDone) => isDone,
    (todos, isDone) => todos.filter(todo => todo.isDone === isDone).length
  )

export const TodoCounterForIsDoneValue = ({ isDone }) => {
  const selectNumOfTodosWithIsDone = useMemo(
    makeNumOfTodosWithIsDoneSelector,
    []
  )

  const numOfTodosWithIsDoneValue = useSelector(state =>
    selectNumOfTodosWithIsDoneValue(state, isDone)
  )

  return <div>{numOfTodosWithIsDoneValue}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <TodoCounterForIsDoneValue isDone={true} />
      <span>Number of unfinished todos:</span>
      <TodoCounterForIsDoneValue isDone={false} />
    </>
  )
}
```
## useDispatch()
```
const dispatch = useDispatch()
```
hook này trả về một tham chiếu tới dispatch function trong redux store. dùng nó để dispatch một action. ví dụ:
```
import React from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch({ type: 'increment-counter' })}>
        Increment counter
      </button>
    </div>
  )
}
```

nếu bạn sử dụng 1 function có dùng dispatch trong đó mà truyền tới component con dưới dạng props. thì bạn nên dùng useCallback để wrap lại nó. mục đích là để lưu trữ nó lại cho lần gọi sử dụng sau. ví nếu không các component con có thể bị render lại nếu dispatch thay đổi.

```
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()
  const incrementCounter = useCallback(
    () => dispatch({ type: 'increment-counter' }),
    [dispatch]
  )

  return (
    <div>
      <span>{value}</span>
      <MyIncrementButton onIncrement={incrementCounter} />
    </div>
  )
}

export const MyIncrementButton = React.memo(({ onIncrement }) => (
  <button onClick={onIncrement}>Increment counter</button>
))
```

## useStore()

```
const store = useStore()
```

cái tên nói lên tất cả, giống với việc bạn lấy Redux store và truyền store vàp `<Provider>`. không nên dùng nó, hãy dùng useSelector vì nó đã giải quyết được vấn đề lấy redux state của bạn rồi.

## Kết luận
- Trên đây là một số hook mới đã được cập nhận trên react-redux để thao tác nhanh gọn hơn khi bạn đã dùng react hook cho project của mình rồi.
- Chúc bạn code vui vẻ và cảm ơn đã đọc bài của tôi!
Nguồn: https://react-redux.js.org/api/hooks