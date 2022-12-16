# **Redux-Saga là gì?**
**Redux saga** là một thư viện redux middleware, giúp quản lý những side effect trong ứng dụng redux trở nên đơn giản hơn. Bằng việc sử dụng tối đa tính năng Generators ( function* ) của ES6, nó cho phép ta viết async code nhìn giống như là synchronos.

![](https://images.viblo.asia/3a3bd7b2-986f-4ff9-8793-87eaf56fd023.gif)
# Cách hoạt động của Redux Saga
1.  Khi view dispatch 1 action lên cho reducer xử lý thì trước tiên nó phải đi qua middleware Saga
2.  Khi Saga nhận được action mà view dispatch lên thì nó sẽ bắt lấy action đấy để xử lý 
3.  Sau khi saga xử lý xong thì nó sẽ dùng hàm ***put*** để dispatch một action mới  lên cho reducer (action này có thể kèm theo cả dữ liệu mà saga đã xử lý trước đó)
4.  Bây giờ thì reducer mới nhận được action, sau đó reducer sẽ xử các action theo các điều kiện khác nhau(tùy theo action mà saga gửi lên thì reducer xử lý). 
# Cài đặt #
> `$ npm install redux-saga`
hoặc
`$ yarn add redux-saga`

# Ví dụ thực tế
Cài đặt
> `$ npx create-react-app ` và 
> `$ npm install redux-saga axios react-redux `

1. Tạo một file `saga.js`
```
import RecruitApi from "API/RecruitApi";
import { call, put, takeLatest } from "redux-saga/effects";
import {getAllRecruit} from "./getAllRecruit.js";
import axios from "axios";
function* watchGetAllRecruit() {
  try {
    const result = yield call(async () => {
      return await axios.get("https://fakestoreapi.com/products/category/jewelery")
    });

    if (result && result.success) {
      yield put({ type: "GET_ALL_RECRUIT_SUCCESS", payload: result });
    } else {
      yield put({ type: "GET_ALL_RECRUIT_FAILURE" });
    }
  } catch (error) {
    yield put({
      type: "GET_ALL_RECRUIT_FAILURE",
      payload: error.response.message,
    });
  }
}

function* Saga() {
  yield takeLatest(GET_ALL_RECRUIT, watchGetAllRecruit);
}

export default Saga;
```
2.  Tạo một file `rootSaga.js` để gọi các Saga cần xử lý
```
import { all } from "redux-saga/effects";
import Saga from "./saga";
function* rootSaga() {
  yield all([
  Saga(),
  ]);
}

export default rootSaga;
```
3. Tại file ` App.js` ta dispatch một action lên để cho file Saga xử lý
```
import {useDispatch } from "react-redux";
import {useEffect, useSelector} from "react";

export default function App() {
const dispatch = useDispatch();

useEffect(() => {
dispatch({type: "GET_ALL_RECRUIT"})
}, []);

const {dataRecruit, isLoading} = useSelector(state => state.RecruitReducer)

  return (
    <div className="conatainer">
      {isLoading ? <h2> Data Is Loading </h2> : (
          dataRecruit.map(item => {
              return <div className="wrapper">
                      <h1> {item.title} </h1>
                      <p> {item.description}</p>
              </div>
          })
      )}
    </div>
  );
}
```
4. Tạo một file `Reducer.js` để xử lý các dispatch khi Saga gửi lên:

```
import { combineReducers } from "redux";

const initState = {
  isError: false,
  errorMessage: "",
  dataRecruit: [],
  isLoading: false
};

const RecruitReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_RECRUIT":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_RECRUIT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        dataRecruit: action.payload.data,
      };
    case "GET_ALL_RECRUIT_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
RecruitReducer: RecruitReducer
});

export default rootReducer;
```

5. Tại file `store.js` để config Middleware Saga

```
import { createStore, applyMiddleware } from "redux";
import createSagaMiddle from "redux-saga";
import rootReducer from "./rootReducer.js";
import rootSaga from "./rootSaga.js";

const sagaMiddle = createSagaMiddle();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddle)
  )
);

sagaMiddle.run(rootSaga);

export default store;
```

6. Tại file` index.js` ta import file store để sử dụng
```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
///css
import store from "./redux/store";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

# Kết Luận
Ở bài viết này mình đã giới thiệu mô hình hoạt động thực tế của Redux-saga trong một ứng dụng. Điểm nhấn mạnh ở đây là khi áp dụng Redux-saga vào dự án thực tế thì nó giúp ta quản lý các state hiệu quả hơn và dễ dàng fix các lỗi, nhưng nó cũng có một số hạn chế khá phức tạp và phải khai báo nhiều thành phần khác nhau. Ở bài sau mình sẽ giới thiệu cho các bạn về Redux Toolkit.