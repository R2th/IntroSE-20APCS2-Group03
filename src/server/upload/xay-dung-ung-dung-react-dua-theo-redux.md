## 1. Giới thiệu
React là thư viện javascript để xây dựng ứng dụng frontend và được phát triển bởi Facebook. Ưu điểm là tăng khả năng trải nghiệm của người dùng, Facebook được làm hoàn toàn bằng React nên bạn có thể thấy khả năng ưu việt của nó. 

Redux là thư viện javascript để quản lý trạng thái state của ứng dụng. Nó có thể được tích hợp vào các app frontend được viết bằng React, Angular, hay VueJS. Ngoài Redux thì còn có thư viện Flux. Đây là 2 kiến trúc quản lý state hay dùng, tuy nhiên Redux có ưu điểm hơn là:
  *  giảm bớt độ phức tạp hơn so với Flux vì loại bỏ thành phần dispatch và gắn chức năng dispatcher cho state.
  *  chỉ có 1 state duy nhất , hạn chế độ phức tạp khi đồng bộ giữa các state trong flux , giúp chia sẻ code và tái sử dụng.

Các thành phần cơ bản trong kiến trúc Redux là:
  * action
  * container 
  * component
  * reducer
  * store 

Để khởi tạo ứng dụng ta sử dụng công cụ `create-react-app` của Facebook 
```ruby
    sudo npm install -g create-react-app
    create-react-app test-react-redux
```
Cài đặt thư viện 
```ruby
    cd test-react-redux
    npm install --save redux react-redux
    -- react-redux có nhiệm vụ kết nối giữa react và redux
```
Cấu trúc thư mục:

![](https://images.viblo.asia/c3b404bb-e7b5-4fbd-9857-7204b4f8385e.png)

## 2. Các thành phần Redux
### Actions
Action là những đối tượng mô tả cách chúng ta muốn thay đổi state. Bạn có thể hình dung action như là những API cho state của bạn.

VD: ta có TodoActions định nghĩa ra các thao tác thêm sửa xóa... công việc. Các action mang type và các thông tin id, text.
```ruby
    // actions/TodoActions.js
    import * as types from '../constants/ActionTypes';

    export function addTodo(text) {
        return {
            type: types.ADD_TODO,
            text
        };
    }

    export function deleteTodo(id) {
        return {
            type: types.DELETE_TODO,
            id
        };
    }

    export function editTodo(id, text) {
        return {
            type: types.EDIT_TODO,
            id,
            text
        };
    }
```
Note: Action trong Redux là một object mà bắt buộc phải có ít nhất 1 property là "type". Mục đích của prop Type này là để Reducer nhận biết được là Action nào. Action ngoài prop type nó còn có thể bao gồm nhiều props khác để truyền data qua Reducer.

### Reducers
Chúng ta tạo ra các sub-reducers và một root-reducer quản lý chung, root-reducer là tham số để truyền vào khi tạo store. Reducers là các pure function hoạt động theo nguyên lý :
`(state, action) => (new state)`

Vì là pure function nên các reducers sẽ không trực tiếp thay đổi state mà nó nhận được, mà tạo ra các bản copy và thay đổi trên đó. Để thực hiện điều này chúng ta có thể dùng các function filter() map() Object.assign()
```ruby
    // reducers/todosReducers.js
    import { ADD_TODO, DELETE_TODO, EDIT_TODO, MARK_TODO, MARK_ALL, CLEAR_MARKED } from '../constants/ActionTypes';

    const initialState = [{
        text: 'Use Redux',
        marked: false,
        id: 0
    }];

    export default function todos(state = initialState, action) {
        switch (action.type) {
            case ADD_TODO:
                return [{
                    id: (state.length === 0) ? 0 : state[0].id + 1,
                    marked: false,
                    text: action.text
                }, ...state];

            case DELETE_TODO:
                return state.filter((todo) => todo.id !== action.id);

            case EDIT_TODO:
                return state.map((todo) => todo.id === action.id ? { ...todo, text: action.text } : todo);

            default:
                return state;
        }
    }
```
Root-reducer sẽ tập hợp các sub-reducers lại thông qua combineReducers() của Redux.
```ruby
    // reducers/rootReducers.js
    import { combineReducers } from 'redux';
    import todosReducers from './todosReducers';

    const rootReducer = combineReducers({
        todosReducers
    });

    export default rootReducer;
```

### Containers
Chúng ta có 1 container là TodoApp:
```ruby
    // containers/TodoApp.js
    import React, { Component } from 'react';
    import { connect } from 'react-redux';
    import { bindActionCreators } from 'redux';
    import Header from '../components/Header';
    import MainSection from '../components/MainSection';
    import * as TodoActions from '../actions/TodoActions';

    class TodoApp extends Component {
        render() {
            const { todos, actions } = this.props;

            return (
                <div>
                    <Header addTodo={actions.addTodo} />
                    <MainSection todos={todos} actions={actions} />
                </div>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            todos: state.todosReducers
        };
    }

    function mapDispatchToProps(dispatch) {
        return {
            actions: bindActionCreators(TodoActions, dispatch)
        };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
```
### Component
Component thông thường, chúng không giao tiếp với Redux, chỉ nhận giá trị và thao tác thông qua props.

Các xử lý hiển thị dữ liệu sẽ thực thi ở đây và các action nhận được từ container sẽ sử dụng như callback.

### Store 
Chúng ta sử dụng hàm createStore() với tham số là root-reducer 
```ruby
    import { createStore } from 'redux';
    import rootReducer from './reducers/rootReducer';

    // initialState
    const initialState = {}

    // Create store
    const store = createStore(rootReducer, initialState);
```

### Khởi tạo Root Component 
App sử dụng Redux root component đảm nhận thêm việc khởi tạo store và bao các component lại với Provider của react-redux giúp component có thể giao tiếp với redux.
```ruby
    // index.js
    import 'todomvc-app-css/index.css';
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { createStore } from 'redux';
    import { Provider } from 'react-redux'
    import TodoApp from './containers/TodoApp';
    import rootReducer from './reducers/rootReducer';

    // initialState
    const initialState = {}

    // Create store
    const store = createStore(rootReducer, initialState);

    const appRoot = (
        <Provider store={store}>
            <div>
                <TodoApp />
            </div>
        </Provider>
    )

    ReactDOM.render(appRoot, document.getElementById('root'))
```