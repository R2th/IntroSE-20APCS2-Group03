# Giới thiệu Redux-Saga
Các bạn chắc hẳn đã có lúc gặp phải vấn đề trong việc quản lý và kiểm soát các request API. Trong redux có thư viện là redux-saga giúp bạn giải quyết những khó khăn trên. nó sẽ giúp giúp quản lý những side effect trong ứng dụng redux trở nên đơn giản hơn. Bằng việc sử dụng tối đa tính năng Generators (function*) của ES6, nó cho phép ta viết async code nhìn giống như là synchronos.

# Hoạt động của Redux-Saga
Đầu tiên bạn phải hiểu cơ chế của Generator function của ES6 mình cũng đã có bài viết về nó đây: http://.........
OK bắt đầu với luồng hoạt động của redux-saga
Từ Redux-Saga sẽ gửi request đến server. Từ server trả về  response tới redux-saga. Sau khi có dữ liệu chũng ta sẽ sử dụng các effects  gồm những function để dispatch sang reducers.

# Basic Helpers
Mình sẽ giới thiệu các basic helpers mà bạn có thể sử dụng để chạy effects của bạn:
1. takeEvery() : thực thi và trả lại kết quả của mọi actions được gọi.
2. takeLastest() : có nghĩa là nếu chúng ta thực hiện một loạt các actions, nó sẽ chỉ thực thi và trả lại kết quả của của actions cuối cùng.
3. take() :  tạm dừng cho đến khi nhận được action
4. put() : dispatch một action.
5. call(): gọi function. Nếu nó return về một promise, tạm dừng saga cho đến khi promise được giải quyết.
6. race() : chạy nhiều effect đồng thời, sau đó hủy tất cả nếu một trong số đó kết thúc.

# Example
Nói nhiều lại gây khó hiểu vì vậy mình sẽ cố vận dụng làm VD để cho các bạn dễ hiểu hơn về nó ^^
Đòi hỏi các bạn cần phải có kiến thức cơ bản về redux đã nhé ^^

1. tạo 1 app react `npx create-react-app demo-redux-saga`
2. cd demo-redux-saga
3. yarn start
4. yarn add redux // cài đặt redux
5. tạo 1 file redux.js trong thư mục src và paste code sau
   ```
   // action types
    const API_CALL_REQUEST = "API_CALL_REQUEST";
    const API_CALL_SUCCESS = "API_CALL_SUCCESS";
    const API_CALL_FAILURE = "API_CALL_FAILURE";

    // reducer with initial state
    const initialState = {
      fetching: false,
      dog: null,
      error: null
    };

    export function reducer(state = initialState, action) {
      switch (action.type) {
        case API_CALL_REQUEST:
          return { ...state, fetching: true, error: null };
        case API_CALL_SUCCESS:
          return { ...state, fetching: false, dog: action.dog };
        case API_CALL_FAILURE:
          return { ...state, fetching: false, dog: null, error: action.error };
        default:
          return state;
      }
    }
   ```
6. yarn add redux-saga // import redux-saga
7. yarn add axios // promise-based API calls
8. tiếp đến là việc giả lập API. Ở bài này mình sẽ dùng https://www.mockapi.io/ để giả lập API
   các tạo khá đơn giản và mình nhận được kết qua sau:
   ![](https://images.viblo.asia/41ccaa3d-0b28-47e1-b867-0544b4b76f86.png)https://images.viblo.asia/41ccaa3d-0b28-47e1-b867-0544b4b76f86.png
9. Tạo file sagas.js và add code:
   ```
    import { takeLatest, call, put } from "redux-saga/effects";
    import axios from "axios";

    // watcher saga: watches for actions dispatched to the store, starts worker saga
    export function* watcherSaga() {
      yield takeLatest("API_CALL_REQUEST", workerSaga);
    }

    // function that makes the api request and returns a Promise for response
    function fetchProduct() {
      return axios({
        method: "GET",
        url: "http(s)://5af675a576035f0014f2bcc3.mockapi.io/api/"
      });
    }

    // worker saga: makes the api call when watcher saga sees the action
    function* workerSaga() {
      try {
        const response = yield call(fetchProduct);
        const data = response.data;

        // dispatch a success action to the store with the new dog
        yield put({ type: "API_CALL_SUCCESS", data });

      } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: "API_CALL_FAILURE", error });
      }
    }
   ```
   Đừng lo lắng, mình sẽ giải thích đoạn code trên ngay sau đây:
   - watchesSaga: 1 generator function sẽ gửi action được dispatched tới Store.
   - takeLatest: tức là nếu chúng ta thực hiện 1 loạt các actions chúng sẽ chỉ thực thi và để trả lại kết quả cuối cung
   - fetchProduct function request lên API
   - workerSaga generator function dùng để gọi hàm call lên api và trả về kết quả
   - nếu fetchProduct thành công => dispatch type action và dữ liệu product trong payload store
   - nếu fetchProduct lỗi => dispatch type action và lỗi
   - put để dispatch
10. OK giải thích đã xong. Giờ cần mock React, Redux, Redux-Saga vào.
    Giờ bạn thấy react, redux, redux-saga đang riêng biệt. ở đâu mình phải gom chúng lại điều này cần import `react-redux`
    yarn add react-redux // import react-redux
11. index.js các bạn sẽ viết ntn:
    ```
    import React from "react";
    import ReactDOM from "react-dom";
    import "./index.css";
    import App from "./App";
    import registerServiceWorker from "./registerServiceWorker";

    import { createStore, applyMiddleware, compose } from "redux";
    import createSagaMiddleware from "redux-saga";
    import { Provider } from "react-redux";

    import { reducer } from "./redux";
    import { watcherSaga } from "./saga";

    // create the saga middleware
    const sagaMiddleware = createSagaMiddleware();

    // dev tools middleware
    const reduxDevTools =
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

    // create a redux store with our reducer above and middleware
    let store = createStore(
      reducer,
      compose(applyMiddleware(sagaMiddleware), reduxDevTools)
    );

    // run the saga
    sagaMiddleware.run(watcherSaga);

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
    registerServiceWorker();
    ```
    
- để  thuận lợi cho việc debugger test và theo dỗi các state, action, log... các bạn có thể dùng Redux DevTools  Extension trên chrome. add `window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();` để kết nỗi giữa extension và store
- Tạo store `createStore`. Hàm này sẽ có tham số đầu tiên là reducer, tham số thứ 2 là initialState (giá trị khởi tại state)
- <Provider> component với `store` bao quanh <App /> ứng dụng sẽ được làm việc với Redux trong React.
- Xong redux giờ tạo saga middleware : const sagaMiddleware = createSagaMiddleware(); và apply nó vào trong store
- Trigger workerSaga when gọi đến API ` sagaMiddleware.run(watcherSaga);`
OK vậy là đã xong phần mock 3 thằng react - redux - redux-saga vào với nhau.
12. Connect giữa App Component với redux.
- mở file app.js ra và sửa 1 chút App component:
    ```
    import React, { Component } from "react";
    import "./App.css";

    import { connect } from "react-redux";

    class App extends Component {
      render() {
        const { fetching, products, fetchProducts, error } = this.props;
        return (
          <div className="App">
            {products ? (
              <div>
                <p className="App-intro">Products</p>
                {products.map((product, index) => (
                  <p>{product.id} - {product.name} - {product.price}</p>
                ))}
              </div>
            ) : (
              <p className="App-intro">No Products</p>
            )}

            {fetching ? (
              <button disabled>Fetching...</button>
            ) : (
              <button onClick={fetchProducts}>Fetch Product</button>
            )}

            {error && <p style={{ color: "red" }}>something went wrong!</p>}

          </div>
        );
      }
    }

    const mapStateToProps = state => {
      return {
        fetching: state.fetching,
        products: state.products,
        error: state.error
      };
    };

    const mapDispatchToProps = dispatch => {
      return {
        fetchProducts: () => dispatch({ type: "API_CALL_REQUEST" })
      };
    };

    export default connect(mapStateToProps, mapDispatchToProps)(App);
    ```
    
- Chỗ này thì là redux rồi. chẳng liên quan gì tới saga nữa. Vậy mình giải thích qua phần này nhé
- Để ý ngay `mapStateToProps` => sẽ tạo ra các state hiện tại `products, fetching, error` như 1 props trong App component
- Tiếp đến là `mapdispatchToProps` => sẽ tạo era 1 function gọi đến `fetchProducs`  ở đây chúng ta sẽ dispatch `API_CALL_REQUEST`
- Không quên connect App component với redux `connect(mapStateToProps, mapDispatchToProps)(App);`
# Kết Luận
Mình cũng mới tìm hiểu về React và redux. Mọi người có gì góp ý mình nhé ^^