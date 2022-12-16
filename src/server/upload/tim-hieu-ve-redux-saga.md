## Mở đầu
Trong các bài viết trước thì mình đã giới thiệu với mọi người về **react**, **redux** và luồng hoạt động của 1 ứng dụng khi sử dụng **redux**

![](https://images.viblo.asia/9562b65a-945a-489b-8405-7a1befad0a22.gif)

Như mọi người có thể thấy trong hình ảnh trên khi 1 **Action** được dispatch đến **Reducer** thì nó có chạy qua **Middleware**, vậy **Middleware** này thực sự có nhiệm vụ là gì?

Trong Redux, **Middleware** là lớp nằm giữa **Reducers** và **Actions**. Vị trí mà **Middleware** hoạt động là trước khi **Reducers** nhận được **Actions** và sau khi 1 Action được dispatch. **Middleware** trong Redux được biết đến nhiều nhất trong việc xử lý 1 thao tác bất đồng bộ - thông thường ở đây là các API request. 

Trong Redux có 2 thư viện khá nổi tiếng dùng để làm nhiệm vụ giống như 1 middleware đó là **Redux-thunk** và **Redux-saga**. Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu về Redux-saga được triển khai như thế nào trong Redux nhé.
## Redux-saga là gì?
**Redux-Saga** là một thư viện redux middleware, giúp quản lý những side effect trong ứng dụng redux trở nên đơn giản hơn. Bằng việc sử dụng tối đa tính năng **Generators** (function*) của ES6, nó cho phép ta viết async code nhìn giống như là synchronos.

Vậy **side effect** là cái gì nhỉ? Như mọi người đã biết tất cả các xử lý trong Reducers đều là đồng bộ, nhưng thực tế là có những thao tác mà ta bắt buộc phải xử lý bất đồng bộ, ví dụ như là đợi 1 request dùng để fetch dữ liệu về rồi sau đó mới thực hiện tiếp các thao tác khác (thay đổi state, dispatch 1 action bất kỳ...) đó chính là **side effect**.

### Cấu trúc của 1 saga
Bình thường 1 saga sẽ có dạng như thế này:
```js
import { put, call, takeEvery } from 'redux-saga/effects';

function* someSaga() {
  // Wait for (every) SOME_ACTION action
  takeEvery('SOME_ACTION', doSomeThing);
}
function* doSomeThing(action}) {
  try {
    // Tell redux-saga to call fetchSomeThing with the param from action
    yield call(fetchSomeThing, action.payload)
    // Tell redux-saga to dispatch the someThingSuccess action
    yield put(someThingSuccess())
  }
  catch (err) {
    // You get it
    yield put (someThingFailed(err))
  }
}
```

Tron ví dụ  trên, các method mà **redux-saga** cung cấp **put**, **call**, **takeEvery** chính là các side effect mà chúng ta đang đề cập đến. Ngoài ra thì còn có 1 số các effect khác hay dùng như là: fork, select, takeLatest, take, all.

Sau đây sẽ là nhiệm vụ chính của từng method:

- **put**: Có nhiệm vụ dispatch 1 action
- **call**: Dùng để call 1 function. Nếu nó return về một promise, tạm dừng saga cho đến khi promise được giải quyết
- **takeEvery**: Thực thi và trả lại kết quả của mọi actions được gọi.
- **takeLatest**: Nếu chúng ta thực hiện một loạt các actions, nó sẽ chỉ trả lại kết quả của actions cuối cùng.
- **Select**: Call 1 selector để lấy data từ store.
- **fork**: Thực hiện một hoạt động non-blocking trên function được truyền cho nó.
- **take**: Tạm dừng cho đến khi nhận được action.
- **all**: Thực hiện song song tất cả các saga.

### Ví dụ
```js
import { call, put, takeLatest, fork, select, all } from 'redux-saga/effects';
import { selectUser } from './selectors';
import { GET_USER } from './constants';

const requestGetUser = async userId => { // Tạo 1 function dùng để fetch data
  const options = {
    query: {
      $select: ['name', 'email'],
    },
  };
  return await feathers.rest.service('users').get(userId, options);
};

function* getUser() {
   try {
   const userId = yeild select(selectUser()); // dùng select để gọi selector `selectUser` và get userId từ store
    const response = yield call(requestGetUser, // userId); call function `requestGetUser` 
   yield put(getUserSucceed(response); // dispatch action `getUserSucceed` khi có response trả về
  } catch (err) {
    yield put(getUserFailed(err)); // dispatch action `getUserFailed` khi có lỗi xảy ra
  }
}

function* getUserWatcher() {
  yield takeLatest(GET_USER, getUser); // Lắng nghe việc dispatch action là GET_USER đồng thời thực thi getUser mỗi khi được gọi
}

export default function* watchSaga() {
  yield all([fork(getUserWatcher)])
}
```

### Kết

Bên trên là 1 ví dụ điển hình cho việc sử dụng các **effect** của **redux-saga**. Ngoài ra, để có thể hiểu thêm chi tiết về **redux saga** thì các bạn hãy tìm đọc ở trang chủ để nắm rõ hơn về một số vần đề như cách **Inject Saga Middleware** vào **Redux Store**, **Cancel saga**, hay cấu hình của **redux saga** cho 1 dự án.