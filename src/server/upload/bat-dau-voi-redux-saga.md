#  Redux-Saga là gì?
Mình xin phép được trích dẫn định nghĩa chính thống tại trang chủ của `redux-saga`
> `redux-saga` là một thư viện có khả năng làm cho các ứng dụng **side effects** ( tìm nạp dữ liệu, truy cập bộ nhớ đệm của trình duyệt...) có thể dễ dàng quản lý, thực thi một cách hiệu quả, kiểm tra đơn giản, xử lý lỗi tốt hơn.
> 
Saga được xem như là một thread riêng biệt trong ứng dụng của bạn, mà nó chỉ chịu trách nhiệm về phần side effects. Hãy tưởng tượng rằng Saga như một thread liên tục gọi đến phương thức 'next' của hàm tạo và cố gắng nạp tất cả các dữ liệu một cách nhanh nhất có thể. 

Luồng thực hiện của Redux-Saga sẽ bắt đầu bằng việc phát đi một action. Nếu một reducer được chỉ định thực hiện action này thì reducer sẽ tiến hành cập nhật store với trạng thái mới. Thường thì những action này sẽ tạo side effect như là yêu cầu đến server và sau khi kết thúc thì nó lại gửi một action khác cho reducer tiếp tục xử lý.
# Sử dụng Redux Saga khi nào?
Nói một cách dễ hiểu thì là trong các ứng dụng sử dụng Redux khi bạn thực hiện một action gì đó mà có thể làm thay đổi trạng thái của ứng dụng.

Một số trường hợp như:
* Gọi yêu cầu HTTP đến server.
* Gửi sự kiện WebSocket
* Lưu trữ một số thứ đến cache hoặc local storage của trình duyệt
* ...

Những điều trên không thực sự liên quan đến trạng thái của ứng dụng hoặc không đồng bộ và bạn cần chuyển chúng vào một nơi khác với action hoặc reducer.
# Ví dụ tổng quan
Đây là một trường hợp mà mình cũng thường hay gặp trong chính dự án đang tham gia.

Người dùng tương tác với UI, tương tác này chính là một action có mục đích là yêu cầu lấy dữ liệu từ server. Trong thời gian request trả về response thì sẽ có một tín hiệu dạng là 'loading' hiển thị ở UI. Đương nhiên cuối cùng chính là ta sử dụng giá trị response để có thể render trang.

Hãy đơn giản code của bạn như sau và mình sẽ giải thích từng bước:
```js
// saga.js
import { put } from 'redux-saga/effects';

function* fetchDataSaga() {
    yield put(USER_INTERACTED_WITH_UI, data);
}

function* mySaga() {
    yield takeEvery(FETCH_DATA, fetchDataSaga);
}

export default function* rootSaga() {
    yield all([
        mySaga(),
        ...
    ]);
}
```
Hàm tạo Saga là `fetchDataSaga` sử dụng `put` để có thể phát đi action cùng với tham số `data` truyền vào. Trong lần đầu tiên mà `USER_INTERACTED_WITH_UI` được phát đi thì phương thức thực hiện sẽ kết thúc.

Một Saga khác nữa là `mySaga` sử dụng helper là `takeEvery` chịu trách nhiệm lắng nghe việc phát đi action là `FETCH_DATA` đồng thời thực thi `fetchDataSaga` mỗi khi được gọi.

Với việc giả sử chúng ta cần sử dụng nhiều Saga khác nữa và cùng bắt đầu tất cả chúng cùng một thời điểm. Đây chính là lúc `rootSaga` chịu trách nhiệm thực thi nhiệm vụ ấy. Chúng ta sử dụng helper `call` và truyền vào đấy một mảng các Saga cần thực hiện. Ta cũng có thể hiểu đây là lúc mà các Generator bắt đầu một cách độc lập, song song nhau, như các luồng riêng biệt.

Bây giờ, ta sẽ khiến cho UI hiển thị dấu hiệu 'loading'. Nó sẽ được hoàn thành bằng việc phát đi một action khác cho reducer xử lý bằng cách sử dụng `put` và đưa bào nó một action. 
```js
// saga.js
import { put } from 'redux-saga/effects';

function* fetchDataSaga() {
     yield put(USER_INTERACTED_WITH_UI, data);
     yield put(SHOW_LOADING_ACTION, {isLoading: true});
}
```
```js
// reducer.js
...
case SHOW_LOADING_ACTION: (state, isLoading) => {
    return Object.assign({}, state, {showLoading: isLoading});
}
```
Tiếp theo, thực hiện request bằng việc sử dụng `call` gọi một hàm, lấy các tham số và thực hiện hàm đó.  Ta đưa vào cho `call` một hàm là `GET_DATA` có nhiệm vụ thực thi gọi đến server và trả về promise giữ nội dung response khi thành công. Cuối cùng, ta sẽ phát đi action là `SHOW_DATA_ACTION` để cập nhật UI với dữ liệu bạn nhận được.
```js
// saga.js
import { put, call } from 'redux-saga/effects';

function* fetchDataSaga() {
     yield put(USER_INTERACTED_WITH_UI, data);
    yield put(SHOW_LOADING_ACTION, {isLoading: true});
    
    const data = yield call(GET_DATA, 'https://your-server.com/get-data');
    yield put(SHOW_DATA_ACTION, {data: data});
}
```
```js
// reducer.js
...
case SHOW_DATA_ACTION: (state, data) => {
    return Object.assign({}, state, {data: data, showLoading: false});
}
```
# Helpers
Như ở trên phần ví dụ tổng quan, mình đã sử dụng một số helper trong Saga để thực hiện chức năng lấy dữ liệu. Bây giờ, chúng ta hãy tìm hiểu một cách rõ hơn về chúng.
## takeEvery()
Ở Saga `mySaga` trên, mình đã dùng `takeEvery` để có thể theo dõi liên tục action `FETCH_DATA`.  Generator `mySaga` sẽ tạm dừng cho đến khi action `FETCH_DATA` được kích hoạt, và với mỗi lần gọi đến action đấy thì nó sẽ gọi đến hàm `fetchDataSaga`. Với việc dùng `takeEvery` ở đây thì nó cho phép nhiều instance của `fetchDataSaga` được bắt đầu một cách đồng thời. Tại cùng một thời điểm, chúng ta có thể gọi đến `fetchDataSaga` mới mà không cần quan tâm tác vụ `fetchDataSaga`trước đó đã hoàn thành hay chưa.
## takeLatest()
```js
function* mySaga() {
    yield takeLatest(FETCH_DATA, fetchDataSaga);
}
```
Ta có thể thay thế `takeEvery` bằng `takeLatest` như trên. Nó tương đối giống với `takeEvery`, tuy nhiên **chỉ cho phép một hàm xử lý** có thể chạy tại một thời điểm, không cho phép thực hiện đồng thời như với `takeEvery`. Nếu có một action khác được phát đi trong khi hàm xử lý vẫn đang chạy thì nó sẽ hủy bỏ xử lý hiện tại và sẽ tiếp tục chạy với action mới.
## put()
Gửi một action đến Redux store. Thay vì đi qua Redux store hoặc phát action đến Saga, bạn có thể sử dụng `put`:
```js
yield put(FETCH_DATA);
yield put(SHOW_LOADING_ACTION, {isLoading: true});
```
## call()
Khi bạn muốn gọi đến một vài hàm trong Saga, bạn có thể sử dụng gọi hàm đươn giản trả về promise như là:
```js
delay(1000);
```
Tuy nhiên, bạn có thể sử dụng một cách khác là `call` cho phép bạn gọi hàm và trả về một đối tượng có thể kiểm tra dễ dàng.
```js
yield call(delay, 1000)
```
## all()
Việc sử dụng `all` là cách để chạy các effect một cách song song. Trước tiên, ta hãy xem xét cách viết sai sau:
```js
import { call } from 'redux-saga/effects'

const todos = yield call(fetch, '/api/todos');
const user = yield call(fetch, '/api/user');
```
Effect thứ 2 sẽ không được thực hiện cho đến khi effect thứ nhất được giải quyết.
Bạn hãy viết lại theo cách đúng sau:
```js
import { all, call } from 'redux-saga/effects'

const [todos, user]  = yield all([
  call(fetch, '/api/todos'),
  call(fetch, '/api/user')
]);
```
# Kết luận
Bài viết cơ bản về cơ chế hoạt động của Redux Saga. Ở đây, mình có nói đến một số kỹ thuật của Redux như action, reducer, store. Để hiểu rõ hơn về những thuật ngữ trên thì mong các bạn đã có kiến thức cơ bản về Redux. Ngoài ra thì để chi tiết về Redux Saga các bạn hãy tìm đọc ở trang chủ để nắm rõ hơn về một số vần đề như cài đặt, cấu hình cho dự án của bạn. Cảm ơn các bạn đã theo dõi. (seeyou).
# Tham khảo
https://redux-saga.js.org/