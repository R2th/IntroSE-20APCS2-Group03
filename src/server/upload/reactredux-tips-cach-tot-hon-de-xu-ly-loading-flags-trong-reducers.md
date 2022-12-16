**TLDR; Dùng một reducer riêng để lưu trữ toàn bộ isFetching flags thay vì đặt chúng trong tất cả Reducers.**

Khi sử dụng React cho Frontend, Redux cho quản lý state, thường bạn sẽ có đoạn code như thế này trong reducer:

```js
// todo/actions.js
export const getTodos = (dispatch) => () => {
  dispatch({ type: 'GET_TODOS_REQUEST' });
  return fetch('/api/v1/todos')
    .then((todos) => dispatch({ type: 'GET_TODOS_SUCCESS', payload: todos })
    .catch((error) => dispatch({ type: 'GET_TODOS_FAILURE', payload: error, error: true });
};

// todo/reducer.js
const initialState = { todos: [] };
export const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_TODOS_REQUEST': 
      return { ...state, isFetching: true };
    case 'GET_TODOS_SUCCESS': 
      return { ...state, isFetching: false, todos: action.payload };
    case 'GET_TODOS_FAILURE': 
      return { ...state, isFetching: false, errorMessage: action.payload.message };
    default: 
      return state;
  }
};
```

Đoạn code này có thể hoạt động ổn, tuy nhiên khi app đòi hỏi một lượng API calls nhiều hơn, bạn sẽ cần thêm rất nhiều những đoạn code tương tự trong các reducers để xử lý isFetching/errorMessage

## Loading reducer
Chúng ta có thể giải quyết vấn đề này bằng việc tạo một loading reducer để lưu trữ tất cả các state của API request.

```js
// api/loadingReducer.js
const loadingReducer = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
  
  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;  
  
  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: requestState === 'REQUEST',
  };
};
```

Sau đó chúng ta có thể truy cập vào các loading state sử dụng một selector trong component:

```js
// api/selectors.js
import _ from 'lodash';
export const createLoadingSelector = (actions) => (state) => {
  // returns true only when all actions is not loading
  return _(actions)
    .some((action) => _.get(state, `api.loading.${action}`));
};

// components/todos/index.js
import { connect } from 'react-redux';
import Todos from './Todos';
import { createLoadingSelector } from '../../redux/api/selectors';

// Show loading on GET_TODOS_REQUEST
const loadingSelector = createLoadingSelector(['GET_TODOS']);
const mapStateToProps = (state) => ({ isFetching: loadingSelector(state) });
export default connect(mapStateToProps)(Todos);
```

Từ đó chúng ta không cần lưu trữ và xử lý thêm bất kỳ isFetching flags trong các reducers nào nữa, và các reducers ấy sẽ chỉ cần quan tâm đến lưu trữ các data cần thiết khác:

```js
// todo/reducer.js
const initialState = { todos: [] };
export const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_TODOS_SUCCESS': 
      return { ...state, todos: action.payload };
    default: 
      return state;
  }
};
```

## Vậy liệu chúng ta có thể combine API calls?
Khi xây dựng app, đôi lúc chúng ta sẽ cần combine API calls (ví dụ chỉ hiển thị trang todos khi các request getUser và getTodos đều thành công). Cách tiếp cận trên vẫn có thể xử lý tốt trường hợp này:

```js
// components/todos/index.js
import { connect } from 'react-redux';
import Todos from './Todos';
import { createLoadingSelector } from '../../redux/api/selectors';

// Show loading when any of GET_TODOS_REQUEST, GET_USER_REQUEST is active
const loadingSelector = createLoadingSelector(['GET_TODOS', 'GET_USER']);
const mapStateToProps = (state) => ({ isFetching: loadingSelector(state) });
export default connect(mapStateToProps)(Todos);
```

## Xử lý error messages
Xử lý API error messages cũng tương tự như xử lý loading flags, ngoại trừ việc chúng ta sẽ cần lựa chọn message để hiển thị:

```js
// api/errorReducer.js
export const errorReducer = (state = {}, action) => {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store errorMessage
    // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
    //      else clear errorMessage when receiving GET_TODOS_REQUEST
    [requestName]: requestState === 'FAILURE' ? payload.message : '',
  };
};

// api/selectors.js
import _ from 'lodash';
export const createErrorMessageSelector = (actions) => (state) => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error
  return _(actions)
    .map((action) => _.get(state, `api.error.${action}`))
    .compact()
    .first() || '';
};
```

## Nguồn
https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6