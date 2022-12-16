Bài viết này mình sẽ giới thiệu với mọi người về cách mà Nicolas (Twitter’s JavaScript web platform and Twitter Lite Leader) đã sử dụng để load reducers một cách dynamic trong React Redux.

# 1. Redux modules
Redux modules thì bao gồm reducer, actions, action creators, và selectors. Chi tiết hơn về redux các bạn có thể tham khảo ở rất nhiều bài viết khác vậy nên mình cũng không trình bày trong bài viết này nữa.
Dưới đây là 1 ví dụ về Redux module:
```js
// data/notifications/index.js

const initialState = [];
let notificationId = 0;

const createActionName = name => `app/notifications/${name}`;

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, { ...action.payload, id: notificationId += 1 }];
    case REMOVE_NOTIFICATION:
      return state.slice(1);
    default:
      return state;
  }
}

// selectors
export const selectAllNotifications = state => state.notifications;
export const selectNextNotification = state => state.notifications[0];

// actions
export const ADD_NOTIFICATION = createActionName(ADD_NOTIFICATION);
export const REMOVE_NOTIFICATION = createActionName(REMOVE_NOTIFICATION);

// action creators
export const addNotification = payload => ({ payload, type: ADD_NOTIFICATION });
export const removeNotification = () => ({ type: REMOVE_NOTIFICATION });
```
Module này có thể được sử dụng để thêm vào và trỏ tới các notifications. Dưới đây là ví dụ cách chúng được sử dụng để cung cấp Props cho 1 React component:

```
// components/NotificationView/connect.js

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { removeNotification, selectNextNotification } from '../../data/notifications';

const mapStateToProps = createStructuredSelector({
  nextNotification: selectNextNotification
});
const mapDispatchToProps = { removeNotification };

export default connect(mapStateToProps, mapDispatchToProps);
```

```
// components/NotificationView/index.js

import connect from './connect';
export class NotificationView extends React.Component { /*...*/ }
export default connect(NotificationView);
```

Điều này cho phép bạn có thể import các modules cụ thể để thay đổi cũng như trỏ tới những phần cụ thể của cả state tổng.

Và cuối cùng là combineReducers để add vào store

```
// data/createStore.js

import { combineReducers, createStore } from 'redux';
import notifications from './notifications';

const initialState = /* from local storage or server */

const reducer = combineReducers({ notifications });
const store = createStore(reducer, initialState);

export default store;
```

Bạn sẽ để ý thấy rằng notifications namespace sẽ được định nghĩa tại thời điểm store được tạo, chứ không phải tại thời điểm Redux module định nghĩa reducer.  Nếu reducer "notifications" bị thay đổi ở bên ngoài createStore, tất cả các selectors trong "Notifications" redux module sẽ không thể hoạt động được nữa.  Tệ hơn là, các Redux module đều cần import vào file createStore trước khi nó được add vào reducer của store. Điều này không ổn với các app lớn, bởi khi đó có thể có tới rất nhiều Redux modules, và trong số đó nhiều cái chỉ sử dụng ở một số components và không cần thiết phải được khởi tạo từ đầu.
Các vấn đề trên đều có thể tránh được khi sử dụng Redux reducer registry.
# 2. Redux reducer registry
Reducer registry cho phép Redux reducers có thể add vào reducer của store sau khi store đã được tạo ra. Điều này cho phép Redux modules có thể được load động khi cần.

```
// data/reducerRegistry.js

export class ReducerRegistry {
  constructor() {
    this._emitChange = null;
    this._reducers = {};
  }

  getReducers() {
    return { ...this._reducers };
  }

  register(name, reducer) {
    this._reducers = { ...this._reducers, [name]: reducer };
    if (this._emitChange) {
      this._emitChange(this.getReducers());
    }
  }

  setChangeListener(listener) {
    this._emitChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();
export default reducerRegistry;
```

Mỗi Redux module giờ đây có thể tự đăng ký và định nghĩa các reducer của riêng mình
```
// data/notifications/index.js

import reducerRegistry from '../reducerRegistry';

const initialState = [];
let notificationId = 0;

const reducerName = 'notifications';

const createActionName = name => `app/${reducerName}/${name}`;

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, { ...action.payload, id: notificationId += 1 }];
    case REMOVE_NOTIFICATION:
      return state.slice(1);
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

// selectors
export const selectAllNotifications = state => state[reducerName];
export const selectNextNotification = state => state[reducerName][0];

// actions
export const ADD_NOTIFICATION = createActionName(ADD_NOTIFICATION);
export const REMOVE_NOTIFICATION = createActionName(REMOVE_NOTIFICATION);

// action creators
export const addNotification = payload => ({ payload, type: ADD_NOTIFICATION });
export const removeNotification = () => ({ type: REMOVE_NOTIFICATION });
```

Tiếp đến, chúng ta cần thay thế combined reducer của store (bằng hàm [replaceReducer](https://redux.js.org/api-reference/store#replaceReducer)) mỗi khi một reducer đăng ký mới.

```
// data/createStore.js

import { combineReducers, createStore } from 'redux';
import reducerRegistry from './reducerRegistry';

const initialState = /* from local storage or server */

// Preserve initial state for not-yet-loaded reducers
const combine = (reducers) => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return combineReducers(reducers);
};

const reducer = combine(reducerRegistry.getReducers());
const store = createStore(reducer, initialState);

// Replace the store's reducer whenever a new reducer is registered.
reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

export default store;
```

Như vậy, việc quản lý Redux store’s reducer với registry có thể giúp bạn thực hiện code-split trong app cũng như modun hoá việc quản lý statemanagement tốt hơn .