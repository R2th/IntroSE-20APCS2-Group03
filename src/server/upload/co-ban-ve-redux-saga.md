Xin chào tất cả các bạn, bài viết này mình xin chia sẻ một chút kiến thức mình tìm hiểu được về Redux saga, mong mọi người theo dõi.
Nếu ai đã từng tìm hiểu qua về redux thì sẽ biết giữa quá trình dispatch một action và reducer chúng ta thường sẽ gọi một API nào đó từ server trả về không ít người sẽ gặp trường hợp mà API chưa kịp trả về kết quả mà các dòng code tiếp theo đã được thực thi sẽ dẫn đến trường hợp không mong muốn, và để khác phục điều đó chúng ta có một thư viện giúp chúng ta xử lý các điều này dễ dàng hơn đó là Redux saga. (trước khi được bài này thì các bạn nên hiểu qua một chút về [redux](https://viblo.asia/p/redux-co-ban-m68Z00JdZkG) và react).
### 1) Redux saga là gì?
- Redux-Saga là một thư viện redux **middleware** , giúp chúng ta quản lý những side effect trong ứng dụng redux trở nên một cách đơn giản hơn và dễ kiểm soát hơn.

![](https://images.viblo.asia/e40d7624-758f-4125-a9f5-3017d4182d49.gif)https://images.viblo.asia/e40d7624-758f-4125-a9f5-3017d4182d49.gif

- Để hiểu được sự hoạt động của redux saga bạn cần hiểu một số khái niệm cơ bản như generator function.
- Generator function là function có khả năng hoãn lại quá trình thực thi mà vẫn giữ nguyên được context. Hơi khó hiểu phải không, nói một cách đơn giản thì generator function là 1 function có khả năng tạm ngưng trước khi hàm kết thúc (khác với pure function khi được gọi sẽ thực thi hết các câu lệnh trong hàm), và có thể tiếp tục chạy tại một thời điểm khác. Chính chức năng mới này giúp ta giải quyết được việc bất đồng bộ, hàm sẽ dừng và đợi async chạy xong rồi tiếp tục thực thi. Chi tiết thì bạn có thể tham khảo [tại đây](https://davidwalsh.name/es6-generators) hoặc [tại đây](https://viblo.asia/p/ban-ve-js-generator-va-su-pha-vo-quy-luat-run-to-completion-Qbq5QAg35D8)

- Ví dụ:
![](https://images.viblo.asia/31560351-9c10-41b8-8f3e-6a641ac9e0d9.png)
- Từ phía redux saga chúng ta gửi request đến Server để chúng ta lấy các API về sau đó ta có response trả về redux saga, sau khi có dữ liệu thì chúng ta sử dụng các effects, trong các effect này chúng ta có các hàm để dispatch sang phía reducers.

### 2) Các kiến thức cơ bản về redux saga

- Redux saga cung cấp cho chúng ta một số method gọi là effect như sau:

    - **Fork**(): sử dụng cơ chế non - blocking call trên function
    - **Call**(): Gọi function. Nếu nó return về một promise, tạm dừng saga cho đến khi promise được giải quyết
    - **Take**(): tạm dừng cho đến khi nhận được action
    - **Put**(): Dùng để dispatch một action
    - **takeEvery**(): Theo dõi một action nào đó thay đổi thì gọi một saga nào đó
    - **akeLastest**() : Có nghĩa là nếu chúng ta thực hiện một loạt các actions, nó sẽ chỉ thực thi và trả lại kết quả của của actions cuối cùng
    - **yield**(): Có nghĩa là chạy tuần tự khi nào trả ra kết quả mới thực thi tiếp
    - **Select**(): Chạy một selector function để lấy data từ state

### 3) Ví dụ

- Đầu tiên chúng ta khởi tạo một project thông qua lệnh sau:

> npx create-react-app my-app
> 
- Tiếp theo là cài đặt một số thư viện liên quan:

> npm install redux redux-saga react-redux
> 
- Sau khi khởi tạo project và cài đặt một số thư viện liên quan chúng ta sẽ vào file index.js để cấu hình redux-saga vào trong project

```js
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootSaga from './sagas/rootSaga';
//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import myReducer from './reducers';
//Redux Saga
import createSagaMiddleware from 'redux-saga'; // hàm này có nhiệm vụ tạo ra một middleware năm giữa action và reducer trong redux
// Middleware
const sagaMiddleware = createSagaMiddleware(); //

var store = createStore(
    myReducer,
    applyMiddleware(sagaMiddleware)
);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);

sagaMiddleware.run(rootSaga); // Hàm này là chạy các saga

serviceWorker.unregister();

```

- file app.js - là file component chính ở đây mình có kết nối để lấy dữ liệu trên store và dispatch các action cần thiết.

```js
// App.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementAction, decrementAction} from './actions';
import './App.css';

class App extends Component {
	onDecrement() {
		this.props.onDecrement(1);
	}

	onIncrement() {
		this.props.onIncrement(1)
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div className="container">
						<div style={{marginBottom: '15px'}}>
							<button onClick={this.onDecrement.bind(this)} style={{marginRight: '15px'}} type="button" className="btn btn-info">Giảm</button>
							<button onClick={this.onIncrement.bind(this)} type="button" className="btn btn-info">Tăng</button>
						</div>
						<div>Counts: <span>{this.props.times}</span></div>
					</div>
				</header>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		times: state.counterReducers ? state.counterReducers : 0
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onDecrement: (step) => {
			dispatch(decrementAction(step));
		},
		onIncrement: (step) => {
			dispatch(incrementAction(step));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

```

- Trong rootSaga

```js
// rootSaga.js

import { all } from 'redux-saga/effects';
import { watchIncrement, watchDecrement } from './counterSagas'
export default function* rootSaga() {
    yield all([ // gọi nhiều saga
        watchIncrement(),
        watchDecrement()
    ]);
}

```

- tại đây các saga sẽ được gom lại trong effect **all** để chạy.

- file counterSagas.js chứa các saga mà mình định nghĩa ví dụ như **watchIncrement**, **watchIncrement**

```js
import { INCREMENT, DECREMENT } from '../actions/actionTypes';
import { takeEvery } from 'redux-saga/effects';

function* increment() {
    yield console.log('this is increment saga', 1111);
}

function* decrement() {
    yield console.log('this is decrement saga', 2222);
}

export function* watchIncrement() { // 
    yield takeEvery(INCREMENT, increment);
}

export function* watchDecrement() { // Khi action DECREMENT được gọi thì hàm decrement sẽ được thực thi và mình sẽ xử lý các side effect ở trong này
    yield takeEvery(DECREMENT, decrement);
}

```

- Khi action có type là  **DECREMENT** được gọi thì hàm decrement sẽ được thực thi và các side effect sẽ được xử lý ở trong này.

- Ví dụ các bạn có thể tham khảo [tại đây](https://github.com/lvgvictory/redux-saga)

### Ưu điểm

- Do tách riêng side-effect ra khỏi action nên việc testing là dễ dàng hơn Redux-Thunk
- Giữ cho action pure synchronos theo chuẩn redux và loại bỏ hoàn toàn callback theo javascript truyền thống

### Nhược điểm

- Function ko viết được dạng arrow-function.
- Phải hiểu về Generator function và các khái niệm trong saga pattern

### Kết luận

Trên đây là một chút kiến thức mà mình tìm hiểu được về các thành phần trong redux-saga, rất mong được sự góp ý của mọi người. Cảm ơn mọi người đã theo dõi bài viết của mình