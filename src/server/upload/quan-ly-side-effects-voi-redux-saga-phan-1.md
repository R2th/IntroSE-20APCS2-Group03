Nếu đã tìm hiểu [Redux](https://redux.js.org/introduction/getting-started) thì giữa quá trình dispatch một action và reducer chúng ta thường sẽ gọi một API nào đó từ server, rất có thể xảy ra trường hợp khi API chưa kịp trả về kết quả nhưng các dòng code tiếp theo đã được thực thi sẽ dẫn đến hiển thị sai, và để khắc phục điều đó, có một thư viện giúp chúng ta xử lý điều này dễ dàng hơn đó là **Redux saga (middleware).**

Để hiểu về Redux Saga, chúng ta sẽ cùng xem qua các khái niệm cơ bản liên quan đến nó.

Okay, A mây ding, gút chóp. Let's do it =))

-----

### 1. Generators first!
Để hiểu về sagas, trước tiên chúng ta cần hiểu **generators** là gì. Theo như [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function%2A):

> Generators are functions which can be exited and later re-entered. Their context will be saved across re-entrances.”

Chúng ta có thể hiểu generator function như một interator. Nó có một method next() trả về phần tử tiếp theo hoặc sẽ thông báo rằng đã hoàn thành việc lặp qua tất cả các phần tử.

KHOAN... Thế Interator là gì? Nó đảm nhận nhiệm vụ gì? (yaoming) - Nếu chưa rõ chúng ta có thể tham khảo [tại đây nhớ](https://medium.com/andy-le/javascript-generator-afa8a802f972).

Và đây là một ví dụ đơn giản về generator, nó sẽ trả về dữ liệu kiểu Object:

```
function* namesEmitter() {
  yield "William";
  yield "Jacob";
  return "Daniel";
}
// execute the generator
var generator = namesEmitter();
console.log(generator.next()); // prints {value: "William", done: false}
console.log(generator.next()); // prints {value: "Jacob", done: false}
console.log(generator.next()); // prints {value: "Daniel", done: true}
```

Cấu trúc của object trả về từ generator rất đơn giản - chỉ cần có giá trị được tạo ra bởi yield | return, thì giá trị đó sẽ gán vào thuộc tính value. Nếu không có các giá trị bổ sung nào nữa thì thuộc tính value sẽ là undefined và thuộc tính "done" sẽ trở thành true (trong trường hợp phần tử cuối của generator được trả về bởi return).

Một điều quan trọng mà chúng ta cần lưu ý nữa là khi execute `namesEmitter`, quá trình thực thi dừng lại khi `yield hoặc return` được gọi. Quá trình thực thi được tiếp tục từ vị trí dừng khi method `next()` của generator được gọi.

Khi độ dài của tập dữ liệu không xác định, chúng ta có thể viết như sau:

```
var results = generator.next();
while(!results.done){
 console.log(results.value);
 results = generator.next();
}
console.log(results.value);
```

Okay. Đó là những khái niệm cơ bản về Generator. Các bạn có thể tự tìm hiểu thêm nhé! Hãy uống một chén à nhầm ngụm nước rồi chúng ta tiếp tục tìm hiểu sagas nào.

-----

### 2. Sagas
`Redux-Saga` là một thư viện `redux middleware`, giúp quản lý side effect trong ứng dụng redux trở nên đơn giản hơn. Bằng việc sử dụng tối đa tính năng Generators (function*) của ES6, nó cho phép ta viết async code nhìn giống như là synchronos.

Hầu hết các xử lý trong Reducers đều là đồng bộ, nhưng thực tế là có những thao tác mà ta bắt buộc phải xử lý bất đồng bộ, ví dụ như là đợi 1 request dùng để fetch dữ liệu về rồi sau đó mới thực hiện tiếp các thao tác khác (thay đổi state, dispatch 1 action bất kỳ...) đó chính là `side effect.`

Theo [docs](https://github.com/redux-saga/redux-saga) thì:

> “Saga is like a separate thread in your application that’s solely responsible for side effects.”

Hãy tưởng tượng Saga như một luồng liên tục gọi phương thức next() của Generator function và cố gắng tìm nạp tất cả các giá trị đã thu được càng nhanh càng tốt. Chúng ta có thể tự hỏi rằng, nó liên quan như thế nào đến React và tại sao chúng ta nên sử dụng nó? Vì vậy, trước tiên chúng ta sẽ xem cách Saga kết nối với React/Redux.

Một luồng React phổ biến được cung cấp bởi Redux-Saga sẽ bắt đầu với một action. Nếu một reducer được chỉ định để xử lý action này - reducer sẽ cập nhật store.

Nhưng nếu một Saga được chỉ định để xử lý action đó - chúng ta thường tạo ra một side-effect (như một request tới server), và sau khi hoàn tất, Saga sẽ gửi một action khác để reducer xử lý, lúc này Reducer mới bắt đầu cập  nhật store.

![](https://images.viblo.asia/21b339d7-aa23-4cc7-9577-7f0851b75bae.gif)

-----

##### Common use case
Chúng ta có thể minh họa bởi common flow sau đây:

User tương tác với UI (tạo ra action), tương tác này kích hoạt một request tới server. Và cuối cùng chúng ta sử dụng response value (trả về từ server) để render view.

Hãy tạo một action cho từng bước, và xem nó như thế nào với Redux-Saga:

```
// saga.js
import { take } from 'redux-saga/effects'
function* mySaga(){ 
    yield take(USER_INTERACTED_WITH_UI_ACTION);
}

Generator function của Saga được đặt tên là 'mySaga'. Nó sử dụng Redux-Saga [effect](https://redux-saga.js.org/docs/api/) được gọi là [take](https://redux-saga.js.org/docs/api/) (còn một vài effect nữa các bạn có thể tự đọc hiểu nhé), đang tạm dừng thực thi Saga cho đến khi nhận được action. Khi USER_INTERACTED_WITH_UI_ACTION được dispatch, quá trình thực thi phương thức sẽ kết thúc, giống như ví dụ về generator trước đó (done = true).

Bây giờ, chúng ta sẽ hiển thị dòng "loading" để đáp lại action này. Điều này sẽ được thực hiện bằng cách dispatch một action:

// saga.js
import { take, put } from 'redux-saga/effects'
function* mySaga(){ 
    yield take(USER_INTERACTED_WITH_UI_ACTION);
    yield put(SHOW_LOADING_ACTION, {isLoading: true});
}
// reducer.js
...
case SHOW_LOADING_ACTION: (state, isLoading) => {
    return Object.assign({}, state, {showLoading: isLoading});
}
...
```

Bước tiếp theo là thực hiện một request bằng cách sử dụng [call](https://redux-saga.js.org/docs/api/) effect, nhận vào một function và một argument, đồng thời thực thi function bằng cách sử dụng argument đó. Chúng ta sẽ cung cấp cho call một function "GET" thực hiện lệnh gọi server và trả về một promise, hàm này sẽ giữ nội dung phản hồi khi thành công:

```
// saga.js
import { take, put, call } from 'redux-saga/effects'
function* mySaga(){ 
    yield take(USER_INTERACTED_WITH_UI_ACTION);
    yield put(SHOW_LOADING_ACTION, {isLoading: true});
    const data = yield call(GET, 'https://my.server.com/getdata');
    yield put(SHOW_DATA_ACTION, {data: data});
}
// reducer.js
...
case SHOW_DATA_ACTION: (state, data) => {
    return Object.assign({}, state, {data: data, showLoading: false};
}
...
```

Để kết thúc, ta dispatch SHOW_DATA_ACTION để cập nhật giao diện người dùng với dữ liệu đã nhận.

-----

##### Điều gì đã xảy ra ở đây?
Sau khi ứng dụng khởi động, tất cả các Sagas đều được thực thi, chúng ta có thể nghĩ về nó giống như thực hiện phương thức next() của Generator function cho đến khi không còn kết quả nào. `take effect` tạo ra một cái gì đó giống như một thread sleep, sẽ tiếp tục thực thi sau khi USER_INTERACTED_WITH_UI_ACTION được dispatch.

Khi điều đó xảy ra, nó tiếp tục dispatching SHOW_LOADING_ACTION, sẽ được xử lý bởi reducer. Vì Saga vẫn đang chạy,` call effect`sẽ chạy tạo ra một request đến server và Saga sẽ sleep lại cho đến khi request được trả lời.

-----

##### Use it again and again (Dùng đi dùng lại)
Trong ví dụ trên, sẽ chỉ có một tương tác của user sẽ được xử lý bởi Saga, vì sau khi ta gọi put với SHOW_DATA_ACTION sẽ không còn gì để phát ra (thuộc tính done = true).

Nếu chúng ta muốn lặp lại cùng một chuỗi hành động mỗi khi USER_INTERACTED_WITH_UI_ACTION được dispatched, chúng ta có thể làm như sau:

```
// saga.js
import { take, put, call } from 'redux-saga/effects'
1. function* mySaga(){ 
2.   while (true){
3.    yield take(USER_INTERACTED_WITH_UI_ACTION);
4.    yield put(SHOW_LOADING_ACTION, {isLoading: true});
5.    const data = yield call(GET, 'https://my.server.com/getdata');
6.    yield put(SHOW_DATA_ACTION, {data: data});
7.  }
8. }
// reducer.js
...
case SHOW_LOADING_ACTION: (state, isLoading) => {
    return Object.assign({}, state, {showLoading: isLoading});
},
case SHOW_DATA_ACTION: (state, data) => {
    return Object.assign({}, state, {data: data, showLoading: false};
}
...
```

Vòng lặp vô hạn này sẽ không gây tràn stack và sẽ không làm hỏng client của bạn. Vì `take effect` hoạt động giống như một thread sleep, việc thực thi mySaga đang chờ xử lý cho đến khi action chỉ định được gửi đi. Điều này hoạt động tương tự sau khi chạy vào vòng lặp.

Ok. Hãy xem lại quy trình, từng bước:
1. Ứng dụng start và chạy tất cả các Saga hiện có của nó.
2. mySaga chạy, vào vòng lặp while(true) và 'sleeping' trên dòng 3.
3. USER_INTERACTED_WITH_UI_ACTION action được dispatch
4. Luồng của Saga thức dậy và di chuyển đến dòng 4, nơi nó phát ra SHOW_LOADING_ACTION để reducer xử lý (reducer bây giờ có thể sẽ làm cho view hiển thị loading).
5. Chúng ta sẽ gửi một request đến serve (dòng 5), và sleep cho đến khi promise được giải quyết với nội dung được lưu trong biến data.
6. SHOW_DATA_ACTION được dispatch cùng với dữ liệu nhận được (biến data), vì vậy bây giờ reducer có thể sử dụng nó để update state trong store.
7. Chúng ta vào lại vòng lặp và quay lại bước 2.\

-----

##### Một số side effect
* **put**: Có nhiệm vụ dispatch 1 action
* **call**: Dùng để call 1 function. Nếu nó return về một promise, tạm dừng saga cho đến khi promise được giải quyết
* **takeEvery**: Thực thi và trả lại kết quả của mọi actions được gọi.
* **takeLatest**: Nếu chúng ta thực hiện một loạt các actions, nó sẽ chỉ trả lại kết quả của actions cuối cùng.
* **Select**: Call 1 selector để lấy data từ store.
* **fork**: Thực hiện một hoạt động non-blocking trên function được truyền cho nó.
* **take**: Tạm dừng cho đến khi nhận được action.
* **all**: Thực hiện song song tất cả các saga.

-----

##### To be continue....What next?
Vì nội dung khá dài nên mình sẽ tách ra làm 2 phần và chúng ta vừa đi qua nội dung của phần 1: một số khái niệm cơ bản liên quan đến Redux-Saga và chỉ ra cách nó được tích hợp vào ứng dụng React.

Trong phần thứ 2...nội dung thì mình xin được giữ bí mật nhé =)). Các bạn hãy đón đọc nhé.

Thank you so much.