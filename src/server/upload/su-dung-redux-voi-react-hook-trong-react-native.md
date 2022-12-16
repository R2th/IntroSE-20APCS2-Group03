Với việc React Hook đã được sử dụng rộng rãi, khả năng xử lý state và side effect của Component đã quá thông dụng trong function component. React Redux đã đưa ra những hàm Hook API như là sự thay thế cho `connect()`.

Trong bài hướng dẫn này, chúng ta sẽ xây dựng một app React Native đơn giản để cho người dùng viết note và lưu chúng lại. Nếu như các bạn đã quen với hàm React Hook cơ bản và cách sử dụng chúng thì bạn có thể tiếp tục với bài hướng dẫn này, nếu không các bạn nên tìm hiểu trước về các mục cơ bản của React Hook trước.

## Cài đặt Redux
Bạn hãy cài đặt Redux qua hướng dẫn ở đây : https://redux.js.org/introduction/installation/
Sau đó hãy kiểm tra lại `dependencies` trong file `package.json`.

```javascript
"dependencies": {
 "@react-native-community/masked-view": "0.1.5",
 "expo": "~36.0.0",
 "react": "~16.9.0",
 "react-dom": "~16.9.0",
 "react-native": "https://github.com/expo/react-native/archive/sdk-36.0.0.tar.gz",
 "react-native-gesture-handler": "~1.5.0",
 "react-native-paper": "3.4.0",
 "react-native-reanimated": "~1.4.0",
 "react-native-safe-area-context": "0.6.0",
 "react-native-screens": "2.0.0-alpha.12",
 "react-navigation": "4.0.10",
 "react-navigation-stack": "2.0.10",
 "react-redux": "7.1.3",
 "redux": "4.0.5"
 },
```

Sau đó hãy cài đặt dependencies sau bằng terminal
```javascript
yarn add redux react-redux lodash.remove
```
Cài đặt trên giúp cho bạn quản lý tất cả các file liên quan đến Redux vào cùng một nơi rất tiện lợi, nó gọi là ducks. Bạn có thể tham khảo bài viết sau để tìm hiểu rõ hơn: https://medium.com/swlh/the-good-the-bad-of-react-redux-and-why-ducks-might-be-the-solution-1567d5bdc698

## Thêm action type và creator

Khi Redux kiểm soát state của cả ứng dụng, state được diễn đạt như là một Javascript object. Hãy hiểu rằng object này là read-only, chúng ta không thể tự thay đổi được nó. Mà phải dùng action để làm.

Action là các event trong redux. Nó có thể là việc bấm nút, timer hoặc network request.

Để bắt đầu, hãy tạo thư mục `redux` trong `src`. Sau đó tạo file `noteApp.js`.

Vì ứng dụng này làm công việc liên quan đến note, trong file vừa mới tạo, hãy bắt đầu với 2 action như sau.

```javascript

// Action Types

export const ADD_NOTE = 'ADD_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
```

Kế tiếp là các hàm tạo các action này.

```javascript
// Action Creators

let noteID = 0

export function addnote(note) {
  return {
    type: ADD_NOTE,
    id: noteID++,
    note
  }
}

export function deletenote(id) {
  return {
    type: DELETE_NOTE,
    payload: id
  }
}
```

## Thêm Reducer

Phần nhận những Action được gọi là reducer. Bất cứ khi nào action được kích hoạt, state của ứng dụng sẽ thay đổi. Việc quản lý state này dựa vào reducer.

Reducer là một pure function tính toán state tiếp theo dựa vào state trước nó. Nó luôn trả về cùng một output nếu state không thay đổi. Nó có 2 tham số `state` và `action` và phải luôn trả về `state`.

State khởi tạo sẽ là một array trống. Bạn hãy import thêm `remove` trong `lodash.remove` mà bạn đã thêm trước đó.

```javascript
// import the dependency
import remove from 'lodash.remove'

// reducer

const initialState = []

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          id: action.id,
          note: action.note
        }
      ]

    case DELETE_NOTE:
      const deletedNewArray = remove(state, obj => {
        return obj.id != action.payload
      })
      return deletedNewArray

    default:
      return state
  }
}

export default notesReducer
```

## Tùy chỉnh Redux store

Store là một object kết nối các action với reducer. Nó cung cấp và giữ các state ở cấp độ ứng dụng thay vì trong các component. 

Với việc Reducer được tạo xong, tạo file mới `store.js` bên trong `src/redux/`. Thêm function `createStore` trong `redux`.

```javascript
import { createStore } from 'redux'
import notesReducer from './notesApp'

const store = createStore(notesReducer)

export default store
```

Để kết nối Redux store với React native app hãy làm như sau trong file `App.js`

```javascript
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation'
import { Provider as StoreProvider } from 'react-redux'
import store from './src/redux/store'

// modify the App component
export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </StoreProvider>
  )
}
```

## Truy cập vào global state

Để truy cập, hãy dùng hàm `useSelector` của Hook. Nó sẽ giống với `mapStateToProps` ở trong `connect()`.  Điểm khác biệt giữa chúng là hàm hook có thể trả về nhiều thứ không chỉ có object.

Mở file `ViewNotes.js`. Hãy thêm như sau 

```javascript
// ...after rest of the imports
import { useSelector } from 'react-redux'
```

Tiếp theo, thay vì lưu note vào trong một `notes` array bằng cách dùng `useState()`, hãy thay nó như sau 

```javascript
const notes = useSelector(state => state)
```

## Dispatch action

Hàm `useDispatch()` hoàn toàn giống với hàm dispatch ở trong Redux store. Thêm nó như sau 

```javascript
import { useSelector, useDispatch } from 'react-redux'
```

Để dispatch action, làm như sau 

```javascript
const dispatch = useDispatch()
// Note action
const addNote = note => dispatch(addnote(note))
const deleteNote = id => dispatch(deletenote(id))
```

Và thêm các action này vào UI để trigger

```javascript
<List.Item
  title={item.note.noteTitle}
  description={item.note.noteValue}
  descriptionNumberOfLines={1}
  titleStyle={styles.listTitle}
  onPress={() => deleteNote(item.id)}
/>
```

## Kết thúc

Với việc sử dụng `useSelector` và `useDispatch`, chúng ta không chỉ loại được phần nhiều code, mà còn đưa ra một cách truy cập hay hơn cho functional component.  Các bạn nên sử dụng cách này với Redux sẽ giảm được khá nhiều thời gian code đó . Cảm ơn các bạn đã đón đọc.


REF: https://heartbeat.fritz.ai/using-redux-with-react-hooks-in-a-react-native-app-cc410a77f3e2