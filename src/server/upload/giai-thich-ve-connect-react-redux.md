`Redux` là một thư viện cực kì đơn giản cho việc quản lý `state` và nó được tạo ra để làm việc với `React` một cách dễ dàng cho mọi người. Tuy nhiên, có rất nhiều trường hợp developer tuân theo 1 cách mù quáng những đoạn code sample để tích hợp chúng lại với nhau mà không hề hiểu nguyên nhân sâu xa bên trong  

# 1. React và redux độc lập với nhau
Rất khó tin nhưng thực ra `react` & `redux` là 2 thư viện & được sử dụng hoàn toàn độc lập với nhau. Hãy xem sơ đồ về luồng quản lí `state` của redux

![](https://images.viblo.asia/82da388e-1e85-48c1-9967-ed06ac8d4a5d.png)

Nếu bạn đã từng sử dụng `redux` thì hẳn bạn đều biết chức năng chính của nó xoay quanh `store` (đó là `state` của toàn bộ app). Ta không thể chỉnh sửa nó một cách trực tiếp mà phải thông qua `reducers` & cách duy nhất là gửi một action (`dispatch actions`). Vậy tóm lại ta có

> Để thay đổi dữ liệu, ta cần phải gửi đi một action
> 

Mặt khác, khi chúng ta muốn nhận data, ta không lấy trực tiếp nó từ `store`. Thay vào đó, ta phải lấy 1 `snapshot` của chúng trong `store` bằng hàm `store.getState()`. Hàm này sẽ trả cho ta `state` của app tại thời điểm ta gọi hàm

> Để lấy dữ liệu, ta cần lấy `state` hiện tại của `store` bằng hàm `store.getState()`
> 

Để cụ thể hơn, ta sẽ đi vào bài toán TodoList

# 2. Liên kết với nhau
Nếu ta muốn liên kết ứng dụng `react` với `redux store`, đầu tiên ta phải cho app biết sự tồn tại của `store`. Đây là nơi chúng ta đến với phần chính đầu tiên của thư viện Reac-redux hay còn được gọi là `Provider`

`Provider` là một component của `react` được cung cấp bởi thư viện `react-redux`. Nó dùng cho 1 mục đích duy nhất đó là cung cấp `store` cho những component con của nó
```javascript
//This is the store we create with redux's createStore method
const store = createStore(todoApp, {})

// Provider is given the store as a prop
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-node')
)
```
Vì `provider` chỉ làm cho `store` có thể truy cập đến những component con của nó trong khi ta muốn toàn bộ app đều có thể truy cập đến `store`. Vì vậy ta để component `App` bên trong `Provider`

1. `<Provider store>` - Wrap app React & giúp cho `Redux state` có thể truy cập đến toàn bộ `container components`
2. `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])` - Tạo ra một `higher-order` component để tạo ra các `container components` khỏi các component base của React

Và sơ đồ ở phía trên của ta sẽ phải sửa thành
![](https://images.viblo.asia/5b1e4f69-1666-449c-844c-d46e4b5a7ac6.png)


# 3. Connect
Bây giờ, ta đã "cung cấp" `store` của redux đến toàn bộ app của ta, nên chúng ta có thể `connect` tất cả những component đến nó. Như ta đã nói ở phần trên rằng không có cách nào để tương tác trực tiếp với `store`. Nhưng ta có thể truy xuất dữ liệu bằng cách lấy `current state` hoặc thay đổi state của `store` bằng cách gửi đi một action. (Chúng ta chỉ có quyền truy cập vào các component top & bottom của sơ đồ phía trên)

Đó chính xác là những gì mà `connect` làm. Hãy xem đoạn code dưới đây, `connect` được dùng để `map store state` & `dispatch` đến `props` của một component

## 1. When to use connect()
### 1. Creating container components
Nếu bạn chỉ tạo ra 1 component tĩnh (fix data) thì bạn không cần dùng `connect`
Nhưng nếu bạn muốn lấy data từ `Redux store` hoặc bạn muốn gửi actions đến nó hoặc bạn muốn cả 2 thì bạn có thể tạo ra một `container component` và trả về với hàm `connect()`

```javascript
import { connect } from 'react-redux'

const TodoItem = ({ todo, destroyTodo }) => {
  return (
    <div>
      {todo.text}
      <span onClick={destroyTodo}> x </span>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    todo: state.todos[0]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    destroyTodo: () =>
      dispatch({
        type: 'DESTROY_TODO'
      })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem)
```

`mapStateToProps` & `mapDispatchToProps` đến là các hàm thuần túy được cung cấp cho `store` những `state` & `dispatch` tương ứng. Thêm nữa, cả 2 hàm này đều phải trả về 1 object và những `key` của object này sẽ được gửi đi như là `props` của component mà chúng đã connect

* `mapStateToProps(state, [ownProps]) => stateProps` có 2 tham số, Tham số thứ 2 không require. Tham số đầu tiên là `current state` của `Redux store`. Tham số thứ 2, nếu được truyền, thì nó là một object của `props` đã được truyền cho component
Nếu một object thuần được return thì object đó sẽ được merge với props của component hiện tại. Tuy nhiên, nếu một function được return thì function đó sẽ được sử dụng như là `mapStateToProps` cho mỗi instant của component. Điều này rất hữu ích cho việc cải thiện hiệu năng & bộ nhớ

* `mapDispatchToProps(dispatch, [ownProps]) => dispatchProps`: hàm này có thể return 1 object hoặc là 1 function
1. Default implementations
Nếu bạn không cung cấp

Trong trường hợp này thì hàm `máptateToProps` trả về một object với chỉ một key: "todo" và `mapDispatchToProps` trả về một object với key là `destroyTodo`
Các `connected component` cung cấp `todo` & `destroyTodo` như là `props` cho `TodoItem`
![](https://images.viblo.asia/cd591f66-cfe3-40ad-b2e2-253981f5d7dd.png)

> Điều quan trọng là chỉ có những component nằm bên trong `Providers` mới có thể connect
> 

`Redux` là một tool rất mạnh và nó càng mạnh mẽ hơn nữa khi được kết hợp với `React`. Hi vọng qua bài viết này các bạn đã có được một sự hình dung về cách hoạt động của `connect`