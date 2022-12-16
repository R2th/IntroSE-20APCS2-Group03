![](https://images.viblo.asia/37c559c5-f76e-4f6b-9bca-a3f7659892b7.png)

Bắt đầu học React vào khoảng 2 năm trước, tất cả cũng khá ổn cho đến khi mình học thêm Redux :sweat_smile: Thực sự lúc ý mình khá mông lung về kiến trúc cũng như cách sử dụng của Redux, nó có vẻ rất phức tạp với một đứa cũng mới học React như mình. Đã không biết bao nhiêu lần mình đọc series [Redux cho người mới bắt đầu](https://viblo.asia/p/redux-cho-nguoi-moi-bat-dau-part-1-introduction-ZjleaBBZkqJ) của anh @phamvanduc mỗi lần quên kiến thức, hồi ý Redux cũng có khá lằng nhằng với những `connect`, `mapStateToProps`, `mapDispatchToProps` .... thực sự mình ko hiểu chúng được bao nhiêu.

Bẵng đi 2 năm, React đã sử dụng React Hooks gọn nhẹ hơn class Component, Redux cũng cải tiến thêm với [redux-toolkit](https://redux.js.org/introduction/getting-started#!). Woa, khi mình tìm hiểu thì thấy rất dễ hiểu cũng như gọn nhẹ khi phát triển sản phẩm, ước gì 2 năm trước nó đã được như thế này, đỡ vất vả cho anh em. 

## 1. Kiến trúc và luồng hoạt động

Trước mắt chúng ta nhắc lại khái niệm về Redux một chút, **Redux** là 1 thư viện giúp để quản lý và cập nhật trạng thái (state) của ứng dụng. Redux có thể được dùng với nhiều thư viện khác nhau nhưng React-Redux có lẽ là "cặp bài trùng" phổ biến nhất.

![](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

**Redux store** là nơi lưu trữ các state của ứng dụng, các **reducer** trong store có nhiệm vụ cập nhật state theo logic định nghĩa trước, tùy thuộc vào **actions** được kích hoạt ở UI.

- ations sẽ là các javascript object
- reducers ko chứa các logic bất đồng bộ, reducers cũng sẽ chỉnh sửa state trên bản sao khi thực thi để phòng tránh lỗi khi đang thực thi có thể làm mất mát state.


![](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)

**Middleware** sẽ được dùng khi chúng ta muốn thực hiện các lời gọi đồng bộ trước khi cập nhật state. Hiện tại Redux có hỗ trợ middleware mặc định là [Thunk](https://github.com/reduxjs/redux-thunk), ko như phiên bản cách đây tầm 2 năm mình dùng, khi muốn thêm Thunk thì phải install package.

Về cơ bản thì kiến trúc và luồng hoạt động của Redux vẫn như vậy, không có gì thay đổi suốt vài năm qua. Phần tiếp chúng ta cùng tìm hiểu 1 công cụ mới được giới thiệu cách đây chưa lâu, đó là **Redux-Toolkit**

## 2. Redux Toolkit

**Redux Toolkit** đơn giản chỉ là 1 thư viện giúp triển khai code logic Redux một cách đơn giản, gọn gàng và tối ưu hơn. Với Redux Toolkit, developer sẽ cảm thấy "nhẹ người" hơn so với việc code Redux logic trước kia.

Cài đặt

```bash
npm install @reduxjs/toolkit
```

Dưới đây chúng ta sẽ cùng nêu ra các ưu điểm của việc dùng Redux Toolkit so với triển khai logic theo thông thường

### Store Setup

#### Logic thông thường

```js
// src/rootReducer.js
import { combineReducers } from 'redux'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  todos: todosReducer,
  filters: filtersReducer
})

export default rootReducer
```

```js
// src/store.js
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(rootReducer, composedEnhancer)
export default store
```

Với cách tổ chức logic như trên, chúng ta sẽ phải thực hiện các công việc sau:
- Ghép các reducers con lại với nhau thành root reducer
- Import root reducer vào store file
- Nếu muốn sử dụng middleware thì cần phải cài đặt package, sử dụng hàm  `applyMiddleware` để sử dụng


#### Redux Toolkit

```js
// src/store.js
import { configureStore } from '@reduxjs/toolkit'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    filters: filtersReducer
  }
})

export default store
```

Redux Toolkit có API `configureStore` giúp đơn giản hóa quá trình thiết lập store. `configStore` wraps API `createStore` và tự động xử lý hầu hết các thiết lập store thay vì làm thủ công như khi ko dùng `redux-toolkit`

Với `configureStore`, chúng ta có được những lợi ích sau:
- Tự động combine các reducer con thành root reducer
- Tự động add middleware thunk
- Config trong đúng 1 file, ko cần chia ra 2 file khá lằng nhằng


### Slices

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.push(action.payload)
    },
    todoToggled(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    todosLoading(state, action) {
      return {
        ...state,
        status: 'loading'
      }
    }
  }
})

export const { todoAdded, todoToggled, todosLoading } = todosSlice.actions

export default todosSlice.reducer
```

Trước kia khi chưa có redux-toolkit, các actions sẽ được ở 1 nơi, các reducers sẽ ở 1 nơi khác. Khi có thay đổi gì thì phải sửa 2 nơi, khá là cồng kềnh. Với `createSlice`, actions và reducer được cùng chung 1 nhà, việc xử lý thay đổi tiện hơn biết bao nhiêu :grinning:

### Xử lý logic thay đổi state trong reducer

#### Thông thường

```js
function handwrittenReducer(state, action) {
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }
}
```

Reducer sẽ thay đổi trên bản sao của state khi actions được dispatch đến, nếu state ở dạng phức tạp, lồng nhau cách kiểu thì code sẽ trông rất phức tạp :/

### Redux Toolkit

Reducer sẽ ko bao giờ được sửa trực tiếp trên state mà chỉ có thể làm việc đó trên bản sao của state, `redux-toolkit` với việc sử dụng thư viện **Immer** giúp chúng ta viết code như thay đổi trực tiếp state nhưng thực ra vẫn là thay đổi trên bản sao (trông sẽ gọn hơn rất nhiều). Xịn xò chưa =))

**Lưu ý**: Chúng ta chỉ có thể dùng kiểu này trong phạm vi `createSlice` mà thôi

```js
function reducerWithImmer(state, action) {
  state.first.second[action.someId].fourth = action.someValue
}
```



## Tài liệu tham khảo
https://redux.js.org/