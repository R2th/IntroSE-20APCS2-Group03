[Từng bước để xây dựng một ứng dụng React Redux.](https://viblo.asia/p/tung-buoc-de-xay-dung-mot-ung-dung-react-redux-gGJ59jgPKX2)

**Redux** đang trở thành một hướng đi tốt nhất với bất cứ một lập trình viên nào khi tìm đến ReactJS. Trong tích tắc Google sẽ cho bạn vô vàn kết quả các ví dụ cho thấy cách thực hiện. Tuy nhiên các ứng dụng React-Redux có quá nhiều phần như:  “**Reducers**”, “**Actions**”, “**Action** **Creators**”, “**State**”, “**Middleware**” và hơn thế nữa. Liệu bạn có bị choáng ngợp @@!

Khi bắt đầu tìm hiểu nó, thực sự mình lại không thể tìm thấy các hướng dẫn đại loại như "Phần nào trong **React Redux** chúng ta nên bắt đầu trước" hay cách tiếp cận chung với bất kì một ứng dụng **React-Redux** nào. Vì vậy, qua việc tổng hợp lại các kiến thức từ các ví dụ mà mình đã làm và các bài hướng dẫn mà mình đã đọc thì bài viết này ra đời, nhằm đưa ra các bước chung về [cách xây dựng hầu hết các ứng dụng **React Redux.**](https://viblo.asia/p/tung-buoc-de-xay-dung-mot-ung-dung-react-redux-gGJ59jgPKX2)

Bắt đầu nào:

## BƯỚC 1 - Viết một mô hình chi tiết (A Detailed Mock) của màn hình
Mô hình ban đầu nên bao gồm dữ liệu và các hiệu ứng hình ảnh (giống như strikethrough the (phần văn bản bị gạch bỏ để  ám chỉ thành phần không được chọn) hoặc bộ lọc "All" dưới dạng văn bản thay vì liên kết).

![](https://images.viblo.asia/e8f5bd76-d3e9-47cf-8395-dc2f87e69ecf.png)

# BƯỚC 2 - Chia ứng dụng thành các thành phần
Hãy thử chia ứng dụng thành nhiều phần dựa trên mục đích tổng thể của từng thành phần.

Chúng tôi có 3 thành phần “AddTodo”, “TodoList” và “Filter” component.

![](https://images.viblo.asia/53e3a3fc-1dfe-4ccc-b4ef-ae9534ab9846.png)

### Redux Terms: “Actions” và “States”

Mỗi thành phần thực hiện hai quá trình:

1. Render DOM dựa trên một số dữ liệu. Dữ liệu này được gọi là "**State**".
2. Lắng nghe người dùng và các sự kiện khác và gửi chúng đến các chức năng JS. Chúng được gọi là "**Actions**"

## BƯỚC 3 - Liệt kê State và Actions cho từng thành phần

Chúng ta có 3 thành phần “AddTodo”, “TodoList” và “Filter”. Hãy liệt kê **State** và **Actions** cho từng thành phần trong số chúng.

### 3.1 AddTodo - State và Actions
Trong thành phần này, chúng ta **không có state** vì giao diện thành phần không thay đổi dựa trên bất kỳ dữ liệu nào nhưng cần phải cho các thành phần khác biết khi nào người dùng tạo một Todo mới. Hãy gọi **action** này là “ADD_TODO”.

![](https://images.viblo.asia/f7b10d59-aca9-4f3c-81c6-885652a1986c.png)

### 3.2 TodoList - State và Actions
Thành phần TodoList cần một mảng các mục Todo để tự render, vì vậy nó cần một **state**, hãy gọi nó là Todos (Array). Nó cũng cần phải biết "Bộ lọc" nào được bật để hiển thị thích hợp (hoặc ẩn) các mục Todo, nó cần một **state** khác, hãy gọi nó là "VisibilityFilter" (boolean).

![](https://images.viblo.asia/722fec60-3683-4b29-b3b5-49737ecbde03.png)

###  3.3 Filter - State và Actions
Thành phần bộ lọc (Filter) hiển thị chính nó dưới dạng Liên kết hoặc dưới dạng văn bản đơn giản tùy thuộc vào việc liệu nó có hoạt động hay không. Hãy gọi **state** này là "CurrentFilter".

Thành phần bộ lọc cũng cần cho các thành phần khác biết khi người dùng nhấp vào thành phần đó. Hãy gọi **action** này là “SET_VIBILITY_FILTER”

### Redux Term: “Action Creators”
Action Creators là các hàm đơn giản, công việc là nhận dữ liệu từ sự kiện DOM, định dạng nó như một đối tượng JSON và trả về đối tượng đó (còn gọi là “Action”).

## BƯỚC 4 - Tạo Action Creators cho mỗi Action
Chúng ta có 3 **Actions**: add_todo, toggle_todo và set_visibility_filter. Hãy tạo **Action Creators** cho từng **action**.

```
// 1. Đưa văn bản từ trường AddTodo và trả về JSON thích hợp để gửi đến các thành phần khác.
export const addTodo = (text) => {
 return {
 type: ‘ADD_TODO’,
 id: nextTodoId++,
 text,  //<--ES6. same as text:text, in ES5
 completed: false //<-- initially this is set to false
 }
}
// 2. Lấy bộ lọc (filter) và trả về đối tượng JSON thích hợp để gửi đến các thành phần khác.
export const setVisibilityFilter = (filter) => {
 return {
 type: ‘SET_VISIBILITY_FILTER’,
 filter
 }
}
// 3. Lấy id của mục Todo và trả về đối tượng JSON thích hợp để gửi đến các thành phần khác.
export const toggleTodo = (id) => {
 return {
 type: ‘TOGGLE_TODO’,
 id
 }
}
```
### Redux Term: “Reducers”
Reducers là các hàm nhận "**state**" từ Redux và đối tượng JSON sau đó trả về một "**state**" mới được lưu trữ trong Redux.
```
const todo = (state = [], action) => {
 switch (action.type) {
  case ‘ADD_TODO’:
     return 
       […state,{id: action.id, text: action.text, completed:false}]; 
 }
```
## BƯỚC 5 - Viết Reducers cho mỗi Action
```
const todo = (state, action) => {
  switch (action.type) {
     case ‘ADD_TODO’:
      return […state,{id: action.id, text: action.text, 
              completed:false}]
 
     case ‘TOGGLE_TODO’:
        return state.map(todo =>
                if (todo.id !== action.id) {
                  return todo
                }
                 return Object.assign({}, 
                    todo, {completed: !todo.completed})
            )
 
      case ‘SET_VISIBILITY_FILTER’: {
       return action.filter
      }
 
     default:
      return state
    } 
}
```
### Redux Term: Các thành phần “Presentational” và “Container”
Việc duy trì logic React và Redux bên trong mỗi thành phần có thể làm cho nó lộn xộn, vì vậy Redux khuyên bạn chỉ nên tạo thành phần trình bày giả gọi là thành phần “**Presentational**” và một thành phần cha mẹ được gọi là thành phần “**Container**”, gửi “Actions” và hơn thế nữa.

Sau đó, **Container** mẹ chuyển dữ liệu đến thành phần **presentational**, xử lý các sự kiện, xử lý React thay cho thành phần **Presentational**.

![](https://images.viblo.asia/e8315815-3496-4cf8-9ddb-2d32204b4b94.png)
Chú thích: Đường chấm màu vàng là thành phần “Presentational”. Đường chấm đen là thành phần "Container".

## BƯỚC 6 - Implement các thành phần Presentational 
Bây giờ chúng ta sẽ Implement 3 thành phần Presentational như trong hình trên.

### 6.1 — Implement AddTodoForm Presentational
![](https://images.viblo.asia/b0d23e5f-f2be-456a-adf9-c9370732479a.png)
### 6.2 — Implement TodoList Presentational
![](https://images.viblo.asia/cd55e97e-1c49-4f4f-a08a-7bfe0ea87611.png)
### 6.3 — Implement Link Presentational
![](https://images.viblo.asia/dbff9f29-7ef8-4c7e-b2c3-1c9580fa197b.png)
## BƯỚC 7 - Tạo thành phần Container cho một/tất cả thành phần Presentational
Đã đến lúc kết nối Redux cho từng thành phần!
### 7.1 Tạo Container Component — AddTodo
![](https://images.viblo.asia/48a3633f-c170-4ca0-a132-eb34cf770acf.png)
### 7.2 Tạo Container Component — TodoList Container
![](https://images.viblo.asia/39f496d6-0a51-498a-99cd-844fea5f6fc0.png)
### 7.3 Tạo Container Component — Filter Container
![](https://images.viblo.asia/ab1af5e8-cc2a-4b36-adbd-ab7af65d8472.png)

## BƯỚC 8 - Cuối cùng tổng hợp các thành phần vào hàm main

```
import React from ‘react’ // ← Main React library
import { render } from ‘react-dom’ // ← Main react library
import { Provider } from ‘react-redux’ //← Bridge React and Redux
import { createStore } from ‘redux’ // ← Main Redux library
import todoApp from ‘./reducers’ // ← Danh sách các Reducers chúng ta đã tạo
//Import tất cả các thành phần chúng tôi đã tạo trước đó
import AddTodo from ‘../containers/AddTodo’
import VisibleTodoList from ‘../containers/VisibleTodoList’
import Footer from ‘./Footer’ // ← Đây là một thành phần presentational chứa 3 FilterLink Container

let store = createStore(reducers)
render(
 <Provider store={store}> 
 <div>
 <AddTodo />
 <VisibleTodoList />
 <Footer />
 </div>
 </Provider>,
 document.getElementById(‘root’)
)
```

Hoàn thành!

Các bạn vừa đọc xong bài viết [Từng bước để xây dựng một ứng dụng React Redux](https://viblo.asia/p/tung-buoc-de-xay-dung-mot-ung-dung-react-redux-gGJ59jgPKX2)

Tham khảo [Midium Post](https://medium.com/@rajaraodv/step-by-step-guide-to-building-react-redux-apps-using-mocks-48ca0f47f9a) của [Rajaraodv](https://medium.com/@rajaraodv)