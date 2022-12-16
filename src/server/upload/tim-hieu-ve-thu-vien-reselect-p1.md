# 1. Reselect
Reselect là một thư viện "selector"  danh cho redux và một số khác . Lấy cảm hứng từ [NuclearJS](https://github.com/optimizely/nuclear-js),[ subscriptions](https://github.com/Day8/re-frame#just-a-read-only-cursor) trong [re-frame](https://github.com/Day8/re-frame)              
Trươc khi tiềm hiểu Reselect chúng ta nên tìm hiểu một tí về `selector` . `selector` có thể hiểu là một đoạn logic được sử dụng để tính toán ra một giá trị nào đó từ các giá trị có sẵn, hoặc chỉ đơn giản là lấy một giá trị từ một giá trị có sẵn.Bên canh đó trong `reselect `  còn có một số chức năng như

* `Selector` cho phép tính toán được dử liệu dẩn xuất . Cho phép Redux lưu trử trạng thái ở mức tối thiểu
* `Selector` cho phép lưu dử liệu trước đó .Chỉ thay đổi khi các đối số của nó thay đổi
* `Selector` cho phép kết hợp , làm đầu vào cho một selector khác

### Cách sử dụng
##### 1) Cài đặt
```
npm install reselect
```
##### 2) Demo
```
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

Trong ví dụ trên, `mapStateToProps` gọi `getVibleTodos` để tính `todos` Điều này hoạt động tốt, nhưng có một hạn chế là `todos` được tính toán mỗi khi `state` được cập nhật. Nếu `state`lớn hoặc việc tính toán tốn kém, việc lặp lại phép tính trên mỗi lần cập nhật có thể gây ra các vấn đề về hiệu suất. `Selector` lại có thể giúp tránh những tính toán lại không cần thiết này.
Sau đây chúng ta sẻ giải quyết vấn đề này
##### Creating a Memoized Selector
Chúng ta hảy thay thế `getVibleTodos` bằng một bộ chọn đã ghi nhớ để tính toán lại các `todos` khi giá trị của `state.todos` hoặc `state.visibilityFilter` thay đổi, nhưng không thay đổi các thành phần không cần thiết

`Reselect` cung cấp một chức năng `createSelector` để tạo các bộ chọn được ghi nhớ. `createSelector` nhận một mảng các `selector` đầu vào và một hàm biến đổi làm đối số của nó. Nếu State của Redux bị đột biến theo cách khiến giá trị của bộ chọn đầu vào thay đổi, bộ chọn sẽ gọi hàm biến đổi của nó với các giá trị của bộ chọn đầu vào làm đối số và trả về kết quả. Nếu giá trị của các bộ chọn đầu vào giống với lần gọi trước đó đến bộ chọn, nó sẽ trả về giá trị đã tính trước đó thay vì gọi hàm biến đổi.

Hãy xác định một bộ chọn được ghi nhớ có tên getVibleTodos để thay thế phiên bản không được ghi nhớ ở trên:

`selectors/index.js`

```
import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)
```
##### Composing Selectors
Bản thân một  `selector` đã ghi nhớ có thể là một bộ chọn đầu vào cho một `selector` đã ghi nhớ khác. Đây là `getVibleTodos` đang được sử dụng như một `selector` đầu vào cho một `selector` kem theo phần  lọc  các việc cần làm theo từ khóa:

```
const getKeyword = (state) => state.keyword

const getVisibleTodosFilteredByKeyword = createSelector(
  [ getVisibleTodos, getKeyword ],
  (visibleTodos, keyword) => visibleTodos.filter(
    todo => todo.text.includes(keyword)
  )
)
```
##### Connecting a Selector to the Redux Store
Nếu bạn đang sử dụng React Redux, bạn có thể gọi các `selector` dưới dạng các hàm thông thường bên trong `mapStateToProps ()`:
`containers/VisibleTodoList.js

```
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../selectors'

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```