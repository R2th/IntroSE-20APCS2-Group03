# Giới thiệu
Trong bài viết hôm nay mình sẽ giới thiệu về API Reference trong Redux-saga, cách tạo Middleware API và giới thiệu những Effect creators cơ bản.
# Middleware API
## createSagaMiddleware(options)

Tạo một Redux middleware và connect Saga với Redux store.

options: Object- Một danh sách các options để chuyển đến middleware. Các options hiện được hỗ trợ là:

* context: Object -  giá trị ban đầu context của saga.
* sagaMonitor : SagaMonitor - Nếu được cung cấp một Monitor Saga, middleware sẽ phân phối các sự kiện giám sát đến monitor.
* onError: (error: Error, { sagaStack: string }) - Nếu được cung cấp, middleware sẽ gọi nó với các lỗi chưa được phát hiện từ Sagas. Hữu ích cho việc gửi các ngoại lệ chưa được lưu đến các services theo dõi lỗi.
* effectMiddlewares : Hàm [] - cho phép bạn chặn mọi effect, tự mình giải quyết và chuyển sang middleware tiếp theo.

## Ví dụ
**File configureStore.js**

```
import createSagaMiddleware from 'redux-saga'
import reducer from './path/to/reducer'

export default function configureStore(initialState) {
  // Note: passing middleware as the last argument to createStore requires redux@>=3.1.0
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(reducer, initialState, applyMiddleware(/* other middleware, */sagaMiddleware)),
    runSaga: sagaMiddleware.run
  }
}
```

Ở trên tôi sẽ tạo ra một function configureStore sẽ tăng cường Store bằng một phương thức mới runSaga. Sau đó, trong mô-đun chính của tôi, tôi sẽ sử dụng phương thức để bắt đầu root Saga của ứng dụng.

**main.js**

```
import configureStore from './configureStore'
import rootSaga from './sagas'
// ... other imports

const store = configureStore()
store.runSaga(rootSaga)
```

**Note**

* saga phải là một function trả về một Generator Object. Middleware sau đó sẽ lặp lại Generator và thực hiện tất cả yielded Effect.
* saga cũng có thể bắt đầu các sagas khác bằng cách sử dụng các Effects khác nhau do thư viện cung cấp.
* Trong lần lặp đầu tiên, middleware gọi method next() để lấy Effect tiếp theo. Middleware sau đó thực thi yielded Effect như được chỉ định bởi Effects API bên dưới. Trong khi đó, Generator sẽ bị ngưng cho đến khi quá trình thực thi effect kết thúc. Khi nhận được kết quả thực hiện, middleware gọi next(result) trên Generator thông qua kết quả được truy xuất dưới dạng đối số. Quá trình này được lặp lại cho đến khi Generator kết thúc bình thường hoặc bằng cách đưa ra một số lỗi.
* Nếu việc thực thi dẫn đến một lỗi (như được chỉ định bởi mỗi người tạo Effect) thì method throw(error) của Generator được gọi thay thế. Nếu hàm Generator định nghĩa một try/catch xung quanh lệnh yield hiện tại, thì khối catch sẽ được gọi bởi thời gian chạy Generator bên dưới. Thời gian chạy cũng sẽ gọi bất kỳ khối cuối cùng tương ứng.
* Trong trường hợp Saga bị hủy (bằng thủ công hoặc sử dụng Effects được cung cấp), middleware sẽ gọi method return() của Generator. Điều này sẽ khiến Generator bỏ qua trực tiếp đến khối cuối cùng.
# Effect creators
**take**

Tạo một mô tả Effect hướng dẫn middleware chờ đợi một hành động được chỉ định trên Store. Generator tạm dừng cho đến khi một hành động phù hợp pattern được gửi đi.

Kết quả yield take(pattern) là một đối tượng hành động được gửi đi.

pattern được giải thích bằng cách sử dụng các quy tắc sau:

* Nếu take được gọi mà không có đối số hoặc `' * '` tất cả các actions được gửi đi được khớp (ví dụ: take() sẽ khớp với tất cả các actions).
* Nếu đó là một hàm, action được khớp nếu pattern(action) đúng (ví dụ: take(action => action.entities) sẽ khớp với tất cả các action có trường (truthy) entities.)
* Nếu là String, action được khớp nếu action.type === pattern (ví dụ: take(INCREMENT_ASYNC)
* Nếu là một array, mỗi mục trong array được khớp với các quy tắc đã nói ở trên, do đó, array hỗn hợp của các strings và các vị từ hàm được hỗ trợ. Trường hợp sử dụng phổ biến nhất là một mảng các chuỗi, do đó, nó action.type được khớp với tất cả các mục trong array (ví dụ: take([INCREMENT, DECREMENT]) và sẽ khớp với các actions của loại INCREMENT hoặc DECREMENT).

**takeMaybe**

Tương tự như take nhưng không tự động chấm dứt Saga trên một hành động END. Thay vào đó, tất cả các Sagas bị chặn trên một take Effect sẽ lấy được đối tượng END.

**takeEvery**

Sinh ra một saga trên mỗi action được gửi đến Store phù hợp với pattern.

* pattern: String | Array | Function 
* saga: Function 
* args: Array<any> - đối số được chuyển đến nhiệm vụ bắt đầu. takeEverysẽ thêm hành động đến vào danh sách đối số.

Trong ví dụ sau, chúng tôi tạo ra một nhiệm vụ cơ bản fetchUser. Chúng tôi sử dụng takeEvery để bắt đầu một fetchUser nhiệm vụ mới trên mỗi USER_REQUESTED hành động được gửi đi:
```
import { takeEvery } from `redux-saga/effects`

function* fetchUser(action) {
  ...
}

function* watchFetchUser() {
  yield takeEvery('USER_REQUESTED', fetchUser)
}
```

**takeLatest**

Forks một saga trên mỗi action được gửi đến Store phù hợp pattern. Và tự động hủy mọi saga task trước đã bắt đầu trước đó nếu nó vẫn chạy.

Mỗi lần một action được gửi đến Store. Và nếu action này phù hợp pattern, takeLatest bắt đầu một saga task mới trong background. Nếu một saga task đã được bắt đầu trước đó (trên action cuối cùng được gửi trước khi action thực tế) và nếu task này vẫn đang chạy, task sẽ bị hủy.

* pattern: String | Array | Function
* saga: Function
* args: Array<any>- đối số được chuyển đến task bắt đầu. takeLatest sẽ thêm action mới vào danh sách đối số.

Trong ví dụ sau, chúng tôi tạo ra một task cơ bản fetchUser. Chúng tôi sử dụng takeLatest để bắt đầu một fetchUser task mới trên mỗi USER_REQUESTED action được gửi đi . Vì takeLatest hủy bỏ mọi task đang chờ xử lý đã bắt đầu trước đó, chúng tôi đảm bảo rằng nếu người dùng kích hoạt nhiều actions USER_REQUESTED liên tiếp một cách nhanh chóng, chúng tôi sẽ chỉ kết thúc bằng action mới nhất.
    
```
import { takeLatest } from `redux-saga/effects`

function* fetchUser(action) {
  ...
}

function* watchLastFetchUser() {
  yield takeLatest('USER_REQUESTED', fetchUser)
}
```
    
**put**

Tạo một mô tả Effect hướng dẫn middleware lên lịch gửi một action đến store. Dispatch này có thể không ngay lập tức vì các tasks khác có thể nằm ở phía trước trong hàng đợi tasks saga hoặc vẫn đang được tiến hành.

Tuy nhiên, có thể hy vọng store sẽ được cập nhật trong stack frame hiện tại, trừ khi bạn có các middlewares Redux khác với các luồng không đồng bộ làm trì hoãn việc truyền action.
    
**call**

Tạo một mô tả Effect hướng dẫn middleware gọi hàm fn với args như là đối số.

* fn: Function - Hàm Generator hoặc hàm bình thường trả về Promise dưới dạng kết quả hoặc bất kỳ giá trị nào khác.
* args: Array<any> - Một array các giá trị được chuyển qua làm đối số cho fn

**select**
 
Tạo effect hướng dẫn middleware gọi selector được cung cấp trên trạng thái của Store hiện tại (tức là trả về kết quả của selector(getState(), ...args)).

* selector: Function- một chức năng (state, ...args) => args. Nó nhận trạng thái hiện tại và tùy ý một số đối số và trả về một slice trạng thái của Store hiện tại.
* args: Array<any>- các đối số tùy chọn được chuyển đến selector ngoài getState.
* Nếu select được gọi mà không có đối số (nghĩa là yield select()) thì effect được giải quyết với toàn bộ trạng thái (cùng kết quả của một getState() cuộc gọi).

**retry(maxTries, delay, fn, ...args)**

Tạo một mô tả Effect hướng dẫn middleware gọi hàm fn với args như là đối số. Trong trường hợp thất bại sẽ cố gắng thực hiện một cuộc gọi khác sau delay mili giây, nếu một số lần thử < maxTries.

* maxTries: Number - số lượng cuộc gọi tối đa.
* delay: Number- độ dài của cửa sổ thời gian tính bằng mili giây giữa fn các cuộc gọi.
* fn: Function - Hàm Generator hoặc hàm bình thường trả về Promise là kết quả hoặc bất kỳ giá trị nào khác.
* args: Array<any> - Một mảng các giá trị được chuyển qua làm đối số cho fn.

Trong ví dụ sau, chúng tôi tạo ra một task cơ bản retrySaga. Chúng tôi sử dụng retry để cố gắng tìm nạp API 3 lần với khoảng thời gian 10 giây. Nếu request thất bại lần đầu tiên retry sẽ gọi request thêm một lần nữa trong khi các cuộc gọi được tính ít hơn 3.
    
```
import { put, retry } from 'redux-saga/effects'
import { request } from 'some-api';

function* retrySaga(data) {
  try {
    const SECOND = 1000
    const response = yield retry(3, 10 * SECOND, request, data)
    yield put({ type: 'REQUEST_SUCCESS', payload: response })
  } catch(error) {
    yield put({ type: 'REQUEST_FAIL', payload: { error } })
  }
}
```
# Effect combinators

**race(effects)**
    
Tạo một mô tả Effect để hướng dẫn middleware chạy một Race giữa nhiều Effects (điều này tương tự như cách làm Promise.race([...])).

effects: Object - một Object từ điển có dạng {label: effect, ...}
    
Ví dụ sau đây chạy một race giữa hai effects:

1. Một cuộc gọi đến một function fetchUsers trả về một Promise.
2. Một CANCEL_FETCH action cuối cùng có thể được gửi trên Store.

```
import { take, call, race } from `redux-saga/effects`
import fetchUsers from './path/to/fetchUsers'

function* fetchUsersSaga() {
  const { response, cancel } = yield race({
    response: call(fetchUsers),
    cancel: take(CANCEL_FETCH)
  })
}
```
Nếu call(fetchUsers) giải quyết (hoặc từ chối) trước, kết quả của race sẽ là một object với một object có khóa duy nhất {response: result} trong đó kết quả được giải quyết là fetchUsers.

Nếu một action loại CANCEL_FETCH được gửi trên Store trước khi fetchUsers hoàn thành, kết quả sẽ là một object khóa đơn {cancel: action}, trong đó action là hành động được gửi đi.

**all([...effects]) (aka parallel effects)**

Tạo một mô tả Effect hướng dẫn middleware chạy song song nhiều Effects và chờ cho tất cả chúng hoàn thành.
   
Ví dụ sau đây chạy song song hai cuộc gọi chặn:

```
import { fetchCustomers, fetchProducts } from './path/to/api'
import { all, call } from `redux-saga/effects`

function* mySaga() {
  const [customers, products] = yield all([
    call(fetchCustomers),
    call(fetchProducts)
  ])
}
```
**all(effects)**
    
Giống như all([...effects]) nhưng cho phép bạn chuyển vào một dictionary object của effects với các labels, giống như race(effects).

effects: Object - một dictionary Objec có dạng {label: effect, ...}

Ví dụ sau đây chạy song song hai cuộc gọi chặn:

```
import { fetchCustomers, fetchProducts } from './path/to/api'
import { all, call } from `redux-saga/effects`

function* mySaga() {
  const { customers, products } = yield all({
    customers: call(fetchCustomers),
    products: call(fetchProducts)
  })
}
```

# External API

**runSaga(options, saga, ...args)**

Cho phép bắt đầu sagas bên ngoài môi trường Redux middleware. Useful nếu bạn muốn kết nối Saga với input/output bên ngoài, ngoài các hành động lưu trữ.

runSaga trả về một Task object. Giống như trả lại từ một fork effect.

options: Object - các tùy chọn hiện được hỗ trợ là:

* channel- xem tài liệu cho [channel](https://redux-saga.js.org/docs/api/#channel)

    - dispatch(output): Function- được sử dụng để thực hiện các put effects.

    - output: any- đối số được cung cấp bởi Saga cho put Effect.

    - getState(): Function- được sử dụng để thực hiện select và getState effects.

    - sagaMonitor: SagaMonitor

    - onError: Function 

    - context : {} 

    - effectMiddlewares : Hàm []

* saga: Function 

* args: Array<any> - các đối số được cung cấp cho saga.

Các {channel, dispatch} được sử dụng để thực hiện đầy đủ take và put Effects. Điều này xác định giao diện Input/Output của Saga.

channel được sử dụng để thực hiện các take(PATTERN) effects. Mỗi khi một cái gì đó được đưa lên channel, nó sẽ thông báo cho tất cả những người nghe nội bộ đang chờ xử lý. Nếu Saga bị chặn trên take effect và nếu take pattern khớp với đầu vào hiện tại, Saga sẽ được tiếp tục với đầu vào đó.

dispatch được sử dụng để thực hiện các put effects. Mỗi khi Saga phát ra một yield put(output), dispatch được gọi với đầu ra.

# Tài liệu tham khảo
    
 Các bạn tham khảo thêm tại đây: https://redux-saga.js.org/docs/api/