## Redux
Redux là một thư viện Javascript giúp tạo ra thành một lớp quản lý trạng thái của ứng dụng. Được dựa trên nền tảng tư tưởng của kiến trúc Flux do Facebook giới thiệu, do vậy Redux thường là bộ đôi kết hợp hoàn hảo với React (React Js và React Native) và đương nhiên khi nhắc đến reactJs điều đầu tiên ngưới ta nhớ đến đó chính là redux.
Một số khái niệm:
+ Actions: các khối thông tin (payloads) gửi dữ liệu từ ứng dụng của bạn đến Store. Chúng là nguồn thông tin duy nhất cho Store. Bạn có thể gửi chúng đến Store bằng cách sử dụng store.dispatch().
+ Reducers: Lắng nghe các hành động (Actions) và thực hiện các thay đổi trên các giá trị của Store. Hãy nhớ rằng các hành động chỉ mô tả những gì đã xảy ra, nó không thay đổi dữ liệu trên Store.
+ Store: Quản lý nhiều reducers.
+ Provider: là component chứa nhiều store.
+ Tham khảo : https://redux.js.org/basics

![](https://images.viblo.asia/f21e0160-0583-45f3-9ecb-2565030a9d76.png)

## Redux saga
+ Redux-Saga là một thư viện redux middleware, giúp quản lý những side effect trong ứng dụng redux trở nên đơn giản hơn. Bằng việc sử dụng tối đa tính năng Generators (function*) của ES6, nó cho phép ta viết async code nhìn giống như là synchronos.
+ Hoạt động: nằm giữa Action và Provider, nó sẻ thực hiện một hành động nào đó (vd: gửi các request đến server nào đó) rồi nhận dữ liệu sau đó effects qua Provider.
+ Tham khảo: https://redux-saga.js.org/

![](https://images.viblo.asia/00672ecc-87fc-4cde-94ba-073c4d9b3ef0.jpg)

## Build project
Bây giờ làm một ví dụ để hiểu rõ hơn nhé :D

Cài đặt và tạo project mình đã hướng dẫn: https://viblo.asia/p/react-native-LzD5d6kdZjY

Mình sẻ làm chức năng đếm số, sử dụng một số thư viện sau:
```
  "react-native-button": "^2.3.0",
  "react-redux": "^5.0.7",
  "redux": "^4.0.0",
  "redux-saga": "^0.16.0"
```
+ Tạo file actionTypes chứa hai hằng số tăng, giảm

src/actions/actionTypes.js
```
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
```
+ Tạo hàm increaseAction, decreaseAction
src/actions/index.js
```
import { INCREMENT, DECREMENT } from './actionTypes';

// Tăng với giá trị step
export const increaseAction = (step) => {
    return {
        type: INCREMENT,
        step: step
    }
}

// Giảm với giá trị step
export const decreaseAction = (step) => {
    return {
        type: DECREMENT,
        step: step
    }
}
```
+ Cho phép component CounterContainer có thể truy cập để dispatch như là props

src/containers/CounterContainer.js
```
import { connect } from 'react-redux';
import CounterComponent from '../components/CounterComponent';

//Actions
import { increaseAction } from '../actions';
import { decreaseAction } from '../actions';

const mapStateToProps = (state) => {
    return {
        times: state.counterReducers ? state.counterReducers : 0
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDecrement: (step) => {
            dispatch(decreaseAction(step));
        },
        onIncrement: (step) => {
            dispatch(increaseAction(step));
        }
    };
}
const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
export default CounterContainer;
```
+ Tạo một hàm để lắng nghe các actions và không thay đổi state

src/reducers/CounterReducers.js
```
import { DECREMENT, INCREMENT } from '../actions/actionTypes';

//state không thay đổi, chỉ trả về giá trị cuối cùng
const counterReducers = (times = 0, action) => {
    switch (action.type) {
        case INCREMENT:
            return times + action.step;
        case DECREMENT:
            return times - action.step;

        default:
            return times;
    }
}

export default counterReducers;
```
+ Đưa tất cả reducers vào store bằng cách dùng combineReducers sẻ giúp việc gộp nhiều reducers lại

 src/reducers/index.js
```
import { combineReducers } from 'redux';
import counterReducers from './CounterReducers';

const allReducers = combineReducers({
    counterReducers,
});
export default allReducers;
```
+ Tạo Component chứa 2 button tăng, giảm giá trị

src/components/CounterComponent.js
```
import React, { Component } from 'react';
import Button from 'react-native-button';

import { Text, View, } from 'react-native';

export default class CounterComponent extends Component {
    render() {
        return (
            <View style={{ flex: 1, marginTop: 30 }}>
                <Text style={{ margin: 20, fontWeight: 'bold', color: 'forestgreen', fontSize: 20 }}>
                    Redux Sagas
                </Text>
                <View style={{ height: 50, margin: 10, flexDirection: 'row' }}>
                    <Button
                        containerStyle={{ padding: 10, height: 45, borderRadius: 10, backgroundColor: 'darkviolet' }}
                        style={{ fontSize: 18, color: 'white' }}
                        onPress={() => {
                            this.props.onDecrement(1);
                        }}>
                        Decrement -
                    </Button>
                    <Button
                        containerStyle={{ padding: 10, height: 45, borderRadius: 10, backgroundColor: 'darkviolet',  marginLeft: 30 }}
                        style={{ fontSize: 18, color: 'white'}}
                        onPress={() => {
                            this.props.onIncrement(1)
                        }}>
                        Increment +
                    </Button>
                </View>
                <Text style={{ margin: 10, fontWeight: 'bold', color: 'darkblue', fontSize: 17}}>
                    Counts: {this.props.times}
                </Text>
            </View>
        );
    }
}
```
+ Đưa tất cả store vào Provider

App.js
```
import React, { Component } from 'react';
//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/reducers';
import CounterContainer from './src/containers/CounterContainer';

let store = createStore(allReducers);
const App = () => (
    <Provider store={store}>
        <CounterContainer />
    </Provider>
);

export default class AppSaga extends Component {
    render() {
        return <App/>;
    }
}
```
index.js
```
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('demo_redux_saga', () => App);
```
Đó là cách dùng redux, bây giờ mình sẻ sử dụng redux saga
+ Tạo các hàm saga, để ý hàm thì có thêm * nhé 

src/sagas/counterSagas.js
```
import { INCREMENT, DECREMENT} from '../actions/actionTypes';

//takeEvery khi thực hiện một hành động nào đó nó sẻ gọi một hàm trước khi dispatch vào reducers
import { takeEvery } from 'redux-saga/effects'; 

function* increment() {
    console.log(`This is increment saga`);
}

export function* watchIncrement() {
    yield takeEvery(INCREMENT, increment);
}

function* decrement() {
    console.log(`This is decrement saga`);
}

export function* watchDecrement() {
    yield takeEvery(DECREMENT, decrement);
}
```
+ Tạo root chứa tất cả hàm saga

src/sagas/rootSaga.js
```
import { all } from 'redux-saga/effects';

import { sayHello } from './counterSagas';
import { watchIncrement, watchDecrement } from './counterSagas';

export default function* rootSaga() {
    yield all([
        watchIncrement(),
        watchDecrement(),
    ]);
}
```
+ Sửa lại file App.js
```
import React, { Component } from 'react';
//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/reducers';
import CounterContainer from './src/containers/CounterContainer';
//Redux saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/sagas/rootSaga';
//Middleware
const sagaMiddleware = createSagaMiddleware();
//Từ applyMiddleware vào Reducers thì tạo một store, sagaMiddleware nằm giữa Action và Reducers.
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
const App = () => (
    <Provider store={store}>
        <CounterContainer />
    </Provider>
);

export default class AppSaga extends Component {
  render() {
    return <App/>;
  }
}

sagaMiddleware.run(rootSaga); //Chạy xuyên suốt các hàm rootSaga trong app 
```
## Kết quả
![](https://images.viblo.asia/ad255a14-c15c-490f-9675-177731091a37.png)

Vậy là đã xong, mình mới tìm hiểu, có chỗ nào không đúng mong các bạn góp ý..

Chúc các bạn làm thành công (~.~)
## Tài liệu tham khảo
https://github.com/reduxjs/react-redux/blob/master/docs/api.md

https://github.com/redux-saga/redux-saga/blob/master/docs/api/README.md