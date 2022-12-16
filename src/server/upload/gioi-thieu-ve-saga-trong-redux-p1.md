> Redux Saga là 1 thư viện được sử dụng để xử lý các `side effects` trong redux. Khi bạn gọi một `action` mà làm thay đổi state của ứng dựng và bạn có thể muốn làm điều gì đó với sự thay đổi của state.

# Khi nào thì sử dụng Redux Saga
Trong 1 ứng dụng sử dụng `redux`, khi bạn gọi một `action` sẽ làm thay đổi trạng thái state của ứng dụng.


Khi điều này xảy ra, bạn có thể sẽ muốn làm điều gì đó với sự thay đổi này của state.

Ví dụ bạn có thể muốn:
* tạo ra 1 request HTTP đến server
* gửi 1 sự kiện WebSocket
* lấy 1 số dữ liệu từ GraphQL server
* lưu 1 số thứ vào cache hoặc local storage của trình duyệt

... bạn đã nắm được ý tưởng rồi đó.

Những thứ trên đều là những thứ không thật sự liên quan đến state của ứng dụng, hoặc là bất đồng bộ và bạn cần phải chuyển chúng vào trong 1 chỗ ở ngoài `actions` hoặc `reducers` (bạn có thể để chúng vào chung 1 chỗ, về mặt lý thuyết là vậy nhưng đó không phải là 1 cách hay, chưa kể code nhìn sẽ rối rắm nữa).

Sử dụng `Redux Saga`,  `Redux middleware` sẽ giúp bạn với các `side effects`.

# Ví dụ cơ bản về sử dụng Redux Saga
Để tránh việc nhồi nhét quá nhiều lý thuyết trước khi nhìn thấy những dòng code thật sự, bây giờ mình xin tóm tắt cách mình đã giải quyết vấn đề gặp phải khi xây dựng 1 sample app.

Trong 1 chat room, khi 1 người dùng viết 1 message mình sẽ ngay lập tức show message đó lên màn hình, để cung cấp phản hồi nhanh chóng nhất. Việc này sẽ được thực hiện qua `Redux Action`:
```javascript
const addMessage = (message, author) => ({
  type: 'ADD_MESSAGE',
  message,
  author
})
```
và state sẽ được thay đổi thông qua 1 reducer:
```javascript
const messages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return state.concat([{
        message: action.message,
        author: action.author
      }])
    default:
      return state
  }
}
```
Bạn khởi tạo `Redux Saga` bằng cách import nó, rồi áp dụng saga như là `middleware` trong `Redux Store`:
```javascript
//...
import createSagaMiddleware from 'redux-saga'
//...
```
Rồi chúng ta tạo ra 1 `middleware` và chúng ta sử dụng nó trong `Redux Store` vừa mới được tạo:
```js
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
```
Bước cuối cùng là chạy `saga`. Chúng ta import và chạy method của `middleware`:
```js
import handleNewMessage from './sagas'
//...
sagaMiddleware.run(handleNewMessage)
```
Chúng ta chỉ cần viết saga, lưu trong `./sagas/index.js`:
```js
import { takeEvery } from 'redux-saga/effects'

const handleNewMessage = function* handleNewMessage(params) {
  const socket = new WebSocket('ws://localhost:8989')
  yield takeEvery('ADD_MESSAGE', (action) => {
    socket.send(JSON.stringify(action))
  })
}

export default handleNewMessage
```
Đoạn code trên có nghĩa là: **mỗi lần** action `ADD_MESSAGE` được gọi, chúng ta sẽ gửi 1 message đến `WebSockets` server, trong trường hợp này sẽ phản hồi trên `localhost:8989`.

Các bạn hãy để ý chúng ta sử dụng `function*`, nó không phải 1 function bình thường mà là `generator function`.
# Tạm kết
Trong bài viết tiếp theo mình sẽ giới thiệu kỹ hơn về `side effects` trong saga, cảm ơn các bạn đã đọc. Bài viết có tham khảo từ: https://flaviocopes.com/redux-saga/