Cho dù có là newbie hay senior Redux thì đôi khi chúng ta luôn phải vật lộn với việc tìm kiếm các giải pháp đơn giản, gọn gàng cho các tình huống phức tạp. Bài viết này sẽ giới thiệu một số giải pháp mà Redux-Saga hỗ trợ để giải quyết các tình huống trên.

![](https://images.viblo.asia/f985d0b8-f1ed-4a43-b5ae-623747140d21.png)

## Redux là đồng bộ

Như đã biết, Redux quản lý các state trong ứng dụng một cách đồng bộ. Và một trong những khái niệm chính của Redux là reducers.

`Reducer` là một function hoàn toàn, nhận state trước đó và một action, và trả về state tiếp theo. 

Những điều bạn không bao giờ nên làm bên trong một reducer:
- Thay đổi các đối số của nó.
- Thực hiện các tương tác (side effects) như lệnh gọi API hay chuyển đổi định tuyến.
- Gọi các hàm không thuần (non-pure) như Date.now() hoặc Math.random().

## Side effects là gì?

Redux xử lý dữ liệu với "độ tinh khiết", không trộn lẫn nhau cao nhất có thể, nhưng đối với hầu hết các ứng dụng, bạn không thể tránh được các side effects. Side effects được yêu cầu để tương tác với thế giới bên ngoài ứng dụng. Hiểu đơn giản, chúng là bất kỳ tương tác nào đó với thế giới bên ngoài ứng dụng Redux. Ví dụ,
- Giao tiếp với backend server
- Logging (Splunk)
- Thu thập dữ liệu phân tích (Mixpanel, Google Analytics)
- Truy cập local storage của trình duyệt

## Middleware

![](https://images.viblo.asia/7ad5292a-ac78-4928-8a7d-0ba65f6604cb.jpg)

Vì vậy, chúng ta có thể làm gì nếu Redux không thể chạy các side effects? Đó chính là middleware.

`Middleware` cung cấp một điểm mở rộng của bên thứ ba giữa việc `dispatch` một action và thời điểm nó đạt đến reducer. `Middleware` không tách biệt với Redux. Nó thường là một package được cài đặt hoặc có thể được custom, viết bởi cá nhân.

### Những tiêu chí để chọn một middleware tốt? (1)

1. Truy cập vào Redux store. Điều này rất hữu ích khi muốn đưa ra một số quyết định dựa các state của ứng dụng.
2. Có khả năng dispatch một action khác từ bên trong middleware. 
3. Khả năng chạy các side effects.
4. Hủy bỏ một side effect. Vì các side effects có thể là bất đồng bộ, nên đôi khi chúng ta có thể muốn hủy quá trình không đồng bộ trước khi nó kết thúc và ảnh hưởng đến các state. (ví dụ: user quyết định hủy upload tệp trước khi upload xong).
5. Cho phép người dùng kích hoạt một số action nhiều lần (như nhấp vào nút refresh). Trong trường hợp này, chúng ta có thể muốn hủy bỏ tất cả các side effects trước đó và luôn duy trì hoạt động của side effects mới nhất, để tránh xử lý không cần thiết và tương quan nhất quán với action của người dùng.
6. Chạy cùng một side effects cụ thể cho các action được dispatch khác nhau.
7. ***Debounce***: delay việc gọi một side effects cho đến sau vài ms trôi qua kể từ lần gọi cuối cùng. Ví dụ: hiệu ứng autocomplete.
8. ***Throttle***: điều chỉnh tốc độ chạy các side effects trong ứng dụng, nghĩa là ngăn side effects chạy nhiều hơn một lần mỗi X ms. 
9. ***Race***: đôi khi, chúng ta muốn race giữa nhiều side effects và khi một trong số chúng kết thúc sẽ hủy bỏ tất cả các effects còn lại vì dư thừa.
10. ***All***: chạy nhiều side effects song song, đợi tất cả chúng kết thúc và sau đó chỉ thực hiện một số action khác.

### Side-effects middleware của Redux

Một số middleware phổ biến nhất là redux-saga, redux-thunk, redux-observable và redux-promise.

![](https://images.viblo.asia/f45288e7-1d74-496f-8ad4-b4461d1e0e18.png)

## Redux-Saga

Sagas được triển khai dưới dạng các hàm khởi tạo (generator) cung cấp các đối tượng cho middleware redux-saga.

### Generator

`generator` là khái niệm cốt lõi trong `Redux-Saga`, vì vậy trước khi nói về Redux-Saga, chúng ta phải hiểu **generator** là gì, cách chúng hoạt động và cách sử dụng chúng. Nếu bạn đã quen thuộc với nó, bạn có thể bỏ qua phần setup Redux-Saga.

**Là gì?**

- Một hàm generator được định nghĩa bởi khai báo `function*` (từ khóa function được theo sau bởi một dấu hoa thị).
- Các functions có thể được thoát và sau đó nhập lại. Các ràng buộc biến của chúng sẽ được lưu lại qua các lần truy cập lại.
- Trả về một đối tượng Generator, là một loại Iterator.

Ví dụ,
```js
function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

console.log(gen.next()); // {value: 10, done: false}
console.log(gen.next()); // {value: 20, done: false}
console.log(gen.next()); // {value: undefined, done: true}
```

Nhìn vào trên, chúng ta có thể thấy rằng việc gọi hàm khởi tạo không thực thi phần thân của nó ngay lập tức. Thay vào đó, một đối tượng `iterator` cho hàm sẽ được trả về. Khi method `next()` được gọi, phần thân của hàm được thực thi cho đến khi biểu thức `yield` đầu tiên chỉ định giá trị sẽ được trả về từ `iterator`.

Method `next()` trả về một đối tượng có thuộc tính `value` chứa giá trị được tạo ra và thuộc tính `done`, cho biết liệu **generator** có mang lại giá trị cuối cùng của nó hay không, dưới dạng **boolean**.

Trong ví dụ, khi `i` bằng **10**:
1. Gọi `next()` vào lần đầu tiên thực hiện `yield` đầu tiên, trả về `{value: 10, done: false}`. `done` là false vì generator chưa được thực hiện.
2. Gọi `next()` lần thứ hai, chúng ta quay lại hàm generator ở vị trí chính xác mà chúng ta đã đặt nó và thực thi hàm cho đến khi chúng ta đến yield thứ hai. Kết quả thứ hai trả về `{value: 20, done: true}` vì `i + 10` bằng **20** và generator chưa được thực hiện.
3. Gọi `next()` lần thứ ba sẽ trả về `{value: undefined, done: true}` vì generator đã mang lại giá trị cuối cùng của nó.

Lưu ý rằng chúng ta có thể gọi next() bất cứ khi nào chúng ta muốn, điều đó có nghĩa là hàm khởi tạo của chúng ta có luồng bất đồng bộ, nhưng bạn có thể thấy rõ rằng nó cũng trông như đồng bộ. Khá giống `async/await` :v 

```js
function* generator() {
  const i = 1000;
  yield i;
  const result = yield i + 1;
  yield i + result;
}

const gen = generator();

console.log(gen.next());  // {value: 1000, done: false}
console.log(gen.next());  // {value: 1001, done: false}
console.log(gen.next(3)); // {value: 1003, done: false}
console.log(gen.next());  // {value: undefined, done: true}
```

Trong ví dụ trên, chúng ta sẽ thấy cách chúng ta có thể truyền dữ liệu vào giữa các lần lặp của generator:

Vào lần thứ ba, đối tượng khi gọi `next()` được trả về là `{value: 1003, done: false}` vì i bằng **1000** và sau đó chúng ta chuyền giá trị 3 cho phương thức `next`, do đó `1000 + 3` mang lại `1003`.

**Đợi chút. Wth???**

*Và đây là lý do tại sao:* việc gọi phương thức `next()` với một đối số sẽ tiếp tục thực hiện hàm của generator, thay thế biểu thức `yield` nơi việc thực thi bị tạm dừng bằng đối số từ `next()`.

Cũng cần lưu ý rằng các functions của generator có thể gọi các functions của generator khác từ bên trong chúng.

## Setup Redux-Saga
```js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './saga';

// tạo middleware
export const sagaMiddleware = createSagaMiddleware();

// mount on store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

// chạy saga
sagaMiddleware.run(rootSaga);
```

Khi tạo Redux `store`, chúng ta cũng tạo `middleware Redux-Saga` và kết nối nó với `store` thông qua `applyMiddleware`. Sau khi `store` được tạo, gọi `run` với `root saga` để start `middleware redux-saga`.

### Watchers và Workers

- File saga chính thường được chia thành hai loại sagas khác nhau: watchers và workers.
- Watcher saga thấy mọi action được dispatch đến store redux; nếu nó khớp với action mà nó được yêu cầu xử lý, nó sẽ gán nó cho worker saga tương ứng của nó.
- Worker saga đang chạy tất cả các side effects mà nó phải thực hiện.
- Watcher saga thường là root saga để export và mount on trên store.

Ví dụ,
```js
// watcher
export function* watchGetItems() {
  yield takeEvery('GET_ITEMS_REQUEST_ACTION', getItems);
}

// worker
export function* getItems() {
  const items = yield call(api.getItems);
  yield put({
    type: 'GET_ITEMS_SUCCESS_ACTION',
    payload: items
  });
}
```
Trong ví dụ trên, `watcher` saga đang lắng nghe **GET_ITEMS_REQUEST_ACTION**. Khi loại action này được `dispatch`, watcher sẽ gọi `getItems` saga. Sau đó, Redux-Saga sẽ bắt đầu thực thi hàm `getItems`. Ở `yield` đầu tiên, chúng ta gọi một số API và ở `yield` thứ hai, chúng ta thực hiện một action khác thuộc loại **GET_ITEMS_SUCCESS_ACTION** và `payload` chứa kết quả của `yield` trước đó.

`call` và `put` là những "người tạo" hiệu ứng (creators). Và bây giờ, chúng ta hãy xem cách Redux-Saga triển khai các thuộc tính như đã nói ở phần (1) này như thế nào :D

### Effect Creators

Các action Redux đóng vai trò là hướng dẫn cho `middleware Saga`:
- **select**: trả về state đầy đủ của ứng dụng
- **put**: dispatch một action vào store (**non-blocking**)
- **call**: chạy một phương thức, Promise hoặc Saga khác (**blocking**)
- **take**: đợi một action/nhiều actions redux được dispatch vào store (**blocking**)
-  **cancel**: hủy bỏ quá trình thực thi saga.
- **fork**: thực hiện một cuộc gọi `non-blocking` đến một **generator** hoặc một hàm trả về một `Promise`. Sẽ rất hữu ích khi gọi **fork** trên mỗi sagas bạn muốn chạy khi start ứng dụng vì nó sẽ chạy đồng thời tất cả sagas. (**non-blocking**)
- **debounce**: mục đích của `debounce` là ngăn không cho gọi saga cho đến khi các action được giải quyết. Ví dụ: dispatching action tự động hoàn thành sẽ chỉ được xử lý sau 100 ms kể từ khi người dùng ngừng nhập.
- **throttle**: mục đích là bỏ qua các action đến trong một khoảng thời gian nhất định trong khi đang xử lý một tác vụ. Ví dụ: dispatching action tự động hoàn thành sẽ được xử lý cứ sau 100 ms, trong khi action được xử lý sẽ là action được dispatch cuối cùng trong khoảng thời gian đó. Nó sẽ giúp chúng ta đảm bảo rằng người dùng sẽ không làm "tràn" server với các requests.
- **delay**: thực thi block cho một số ms được xác định trước.

### Các tổ hợp effects

-  **race**: một race giữa nhiều sagas. Khi một trong các sagas kết thúc, tất cả các sagas khác sẽ bị hủy bỏ, tương tự như `Promise.race([...])`. **fork** và **race** được sử dụng để quản lý đồng thời giữa các Sagas.
- **all**: chạy song song nhiều effects và đợi tất cả chúng hoàn thành, tương tự như `Promise.all`.

### Helpers

- **takeEvery**: thực hiện mọi action phù hợp và chạy sage đã cho (**non-blocking**).
```js
export function* watcherSaga() {
  yield takeEvery('SOME_ACTION', workerSaga);
}
```

- **takeLatest**: thực hiện mọi action matching và chạy saga đã cho, nhưng hủy sagas trước đó vẫn đang chạy (**blocking**).
```js
export function* watcherSaga() {
  yield takeLatest('SOME_ACTION', workerSaga);
}
```

So sánh hai ví dụ trên để hiểu rõ hơn
```js
export function* workerSaga() {
  const result = yield call(api.getData);
  yield put(action(result));
}
```

Trong ví dụ trên, chúng tôi `call`. `call` là một `blocking creator`. Điều này có nghĩa là saga sẽ không tiếp tục chạy đến `yield` tiếp theo cho đến khi lệnh gọi API kết thúc. Sau khi hoàn thành, chúng ta sẽ `put`. `put` là một action dispatching mới với kết quả từ `yield` trước đó. `put` là `non-blocking`.
```js
export function* workerSaga() {
  yield put(asyncAtion()); // call some saga ?
  const resp = yield take(“ASYNC_ACTION_SUCCESS”);
  yield put(action(resp));
}
```

Trong ví dụ này, chúng tôi gọi `put` với một số action. `put` là một generator hiệu ứng `non-blocking`, vì vậy nó sẽ dispatch một action (có thể là một action trigger một số saga khác), nhưng saga không đợi action này kết thúc. Saga có thể tự do chạy đến `yield` tiếp theo - `take`. `take` là một generator hiệu ứng `blocking`. Nó đang đợi **ASYNC_ACTION_SUCCESS** được gửi đi. Chỉ khi nó được gửi đi, saga tiếp tục đến yield cuối cùng - `put` - dispatch một action với payload được trả lại từ `yield` trước đó.

Nếu chúng ta so sánh hai ví dụ này, chúng đang làm điều tương tự. Sự khác biệt duy nhất là trong ví dụ đầu tiên, chúng ta bị chặn cho đến khi action bất đồng bộ kết thúc, trong khi trong ví dụ thứ hai, chúng ta có thể làm bất cứ điều gì chúng tôi muốn cho đến khi chúng tôi quyết định đợi (take) một action thành công được gửi đi.

### Unit test

Effect Creators trả về JS Objects - trong unit testing, chúng ta có thể so sánh giá trị của đối tượng đó với giá trị mong đợi.
```js
describe('itemSaga', function() {
  const watcherSaga = itemSaga();
  it('should takeLatest GET_ITEM_REQUEST', function() {
    expect(watcherSaga.next().value).toEqual(
      takeLatest('GET_ITEM_REQUEST', readItem)
    );
  });
  
  const workerSaga = readItem();
  it('should call readItemById', function() {
    expect(workerSaga.next().value).toEqual(
      call(readItemById(100))
    );
  });

  it('should take GET_ITEM_SUCCESS', function() {
    expect(workerSaga.next().value).toEqual(
      put(readItemSuccessAction({id: 100, name: 'item'}))
    );
  });
  
  it('should be done', function() {
    expect(workerSaga.next().done).toEqual(true);
  });
});
```

Đây là một số thư viện hữu ích cho testing trong `redux-saga`:
1. [redux-saga-test](https://github.com/stoeffel/redux-saga-test)
2. [redux-saga-testing](https://github.com/antoinejaussoin/redux-saga-testing/)
3. [redux-saga-test-engine](https://github.com/timbuckley/redux-saga-test-engine)
4. [redux-saga-tester](https://github.com/wix/redux-saga-tester)
5. [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan)

<br>

[Tham khảo](https://medium.com/nmc-techblog/the-power-of-redux-saga-3dbd26a08b49)