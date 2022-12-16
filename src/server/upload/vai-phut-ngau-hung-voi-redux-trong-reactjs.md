## 1. Giới thiệu
 Xin chào các bạn, chắc các bạn không còn xa lạ gì với mình nhỉ. Chắc các bạn cũng biết mình là một tín đồ của reactjs. Với bài chia sẻ lần trước thì mình hướng dẫn các bạn học  ReactJS qua các ví dụ demo để các bạn có thể dễ dàng học/hiểu nhanh về reactjs.

Chia sẻ về quá trình học reactjs thì mình ngày xưa là dev code ruby back-end thì cũng ko biết một tí gì về font-end cả. Năm nay thì mình cũng được join vào một dự án sử dụng reactjs làm font-end kết hợp rails api back-end. Vì là dự án đã phát triển được 3 năm rồi nên mỗi lần maintain 1 - 2 tháng. Vì thế số lượng dev tham gia maintain chỉ 1-2 người là cùng, dự án này thì mình được phân công làm. Ban đầu cũng chưa biết gì về reactjs mình phải chập chững lên các trang chủ reactjs, kênh youtobe  dạy reactjs để học. Do tiến độ làm task thì mình cũng ko có nhiều thời gian để học vừa học đến đâu thì mình vừa tìm hiểu và code luôn. Vì là dự án maintain nên mình cũng ko học được nhiều.

Mới đây thì mình có thời gian rảnh thì mình đã học lại từ đầu reactjs, trong quá trình học mình thấy rất là nhiều thư viện hỗ trợ khi chúng ta lập trình font-end bằng reactjs. Ví dụ  như các thư viện UI Component: Material-UI, React-Bootstrap & reactstrap, React Toolbox
.., Route thì có thư viện React Router DOM, Quản lý state có Redux... và còn rất nhiều thư viện rất hữu ích trong lập trình reactjs.

Ở dự án cũ thì mình không sử dụng thư viện redux, mới đây mình có tìm hiểu về thư viện này nên mình cảm thấy rất tiếc khi không sử dụng nó, nó có những ưu điểm nổi bật nào thì mình sẽ chỉ ra cho bạn ở phần dưới nhé.
## 2. Tìm hiểu về redux
###  2.1 Redux là gì ?
>    Khái niệm: Trang chủ redux có nói nó là một lớp quản lý trạng thái(state) của một ứng dụng reactjs.

Nó được sử dụng phổ biến nhất với các thư viện React, Angular... để xây dựng các giao diện người dùng.

Người sáng tạo ra redux là Dan Abramov và Andrew Clark lấy cảm hứng từ kiến trúc Flux của Facebook.
   
### 2.2 Redux hoạt động như thế nào
Sơ đồ hoạt động của Redux:
![](https://images.viblo.asia/13437cc4-0d26-473d-9e56-ad3d13e51331.jpeg)

Mình sẽ giải thích từng phần cho các bạn:
- Store là như là một kho lưu trữ các state, cho phép truy cập.
- View(component) hiển thị giao diện cho người dùng thao tác.
- Action là những hành động của người dùng như kiểu nhập input, submit form.
- State biểu diễn trạng thái của component, mỗi component có một state private riêng.

==> Tổng kết lại quá trình hoạt động: Đầu tiên trên view người dùng có thể thực hiện một số hành động như là submit form, input giá trị... sẽ tạo ra một action, mỗi action có một type riêng, action đó  sẽ được truyền đến store thông qua dispatcher, store gọi đến reducer phân tích hành động(action) sau đó trả về trạng thái(state), sau đó state sẽ được truyền ra view để hiển thị.

Để hình dung được thì mình đi vào một ví dụ demo bên dưới cho các bạn dễ hiểu hơn nhé.

### 2.3 Tạo một ứng todolist sử dụng redux.
Ok. Đầu tiên bạn khởi tạo một project giúp mình sau đó bạn cài đặt 2 thư viện là redux, react-redux vào project bằng câu lệnh:
```
npm install --save redux
npm install --save react-redux
```

Ở đây chắc các bạn hỏi chúng ta đang học redux tại sao phải cài 2 thư viện, mình cũng giải thích luôn là redux giúp chúng ta tạo một kho lưu trạng thái, lấy ra các trạng thái khi có yêu cầu, hay thực hiện các thao tác trạng thái thay đổi, nhưng việc làm của redux cũng chỉ có thế nó không thể biết được react là ai. Bởi vậy thư viện "react-redux " đóng vai trò là cầu nối tạo liên kết giữa kho lưu trữ trong redux với components của React.

Chắc cái bạn học qua reactjs cơ bản rồi nên các forder trong project mình cũng không cần phải nói chi tiết mình chỉ giới thiệu những forder cần phải tạo khi chúng ta sử dụng redux.

Để tạo được ứng dụng Todo các bạn cần tạo các forder và các file như phí bên dưới của mình nhé:

![](https://images.viblo.asia/c65a9d3a-bda7-426f-8fe0-f75d44605784.png)

Và đây là ứng dụng mà lần này mình muốn hướng dẫn:
![](https://images.viblo.asia/0eecd153-8459-4384-add2-379b0ec3cfd5.png)

Trên đây là một cấu trúc project sử dụng redux, mình chỉ hướng dẫn các bạn trọng tâm thư mục "src" nhé. Một ứng dụng Todo đơn giản chỉ có chức năng add và show todo. Mình sẽ giải thích từng forder, file cũng như code nhé:

### actions
Đầu tiên thư mục actions bạn tạo cho mình file index.js 
```
export const listTodo = () => {
  return {
    type: 'LIST_TODO',
  }
}

export const addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  }
}
```
File này khai báo các hành động(action) ví dụ ứng dụng chúng ta có 2 actions:
- listTodo(): đầu tiên khi load trang chúng ta phải gửi một action listTodo đến store để lấy state list các todo show ra trình duyệt.
- addTodo(): hành động này được gọi khi các bạn ấn nút "Add todo" , sau khi được dispatch nó truyền đến store với hành động thêm todo và truyền một tham số là todo.

### components
Trong ReactJS, mỗi đoạn code sẽ được phân chia thành những Component không lệ thuộc lẫn nhau và có thể tái sử dụng khi cần thiết.
Thư mục components chứa tất cả các components liên quan tới UI của dự án.

Khi chúng ta muốn sử dụng component nào thì chúng ta chỉ việc import vào và sử dụng.  Trong ví dụ todo mình tạo file Todo.js nó là component con và được gọi trong thư mục cha TodoList.

```
import React, { Component } from 'react';

class Todo extends Component {
  render() {
    return (
      <li>{this.props.todo}</li>
    );
  }
}

export default Todo;
```

### containers
Thư mục containers chứa tất cả các components liên quan đến Redux. Cách tổ  chức các thư mục cũng tương tự như thư mục components. 

Trong ví dụ todo thì bạn tạo cho mình 2 file là AddTodo.js, TodoList.js.

AddTodo.js: file này sẽ có chức năng kết nối với redux thông qua {connect} của thư viện 'react-redux'. Sau chi người dùng ấn "Add todo" thì hàm handleSubmit được gọi và nó truyền một props onSubmit(todo) với tham số là todo mình lấy được từ state khi người dùng nhập và form.

Hàm onSubmit sẽ dispatch một hành động addTodo mà chúng ta khai báo ở thư mục index.js trong forder actions, hàm connect() sẽ gửi hành động đến reducer để phân tích.
```
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addTodo } from './../actions/index'

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: ''
    }
  }

  handleChange = (event) => {
    let value = event.target.value;
    this.setState({txtName: value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let todo = this.state.txtName;
    this.props.onSubmit(todo);
  }

  render() {
    return (
      <div className="panel-body">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="txtName"
              onChange={this.handleChange}
             />
          </div>
          <button type="submit" className="btn btn-primary">Add todo</button>
        </form>
      </div>
    );
  }
}

var mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (todo) => {
      dispatch(addTodo(todo))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddTodo);
```
TodoList.js: File này dùng để hiển thị danh sách các todo mà chúng ta thêm ra màn hình.

Đầu tiên khi load trang containers TodoList được gọi để hiển thị lên trình duyệt. Khi đó hàm connect() sẽ kết nối với redux và gọi với tham số là hàm mapStateToProps, hàm mapStateToProps nó là một bộ lọc(filter) lấy state. Ở đây là mình cần lấy state list các todos.
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Todo from './../components/Todo'

class TodoList extends Component {
  render() {
    var elements = this.props.todos.map((todo, index) => {
      return <Todo todo={todo} key={index} />
    })
    return (
      <div className="panel-footer">
        <ul>
         {elements}
        </ul>
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps, null)(TodoList);
```

### reducers
Ở đây mình tạo 2 file là index.js và todos.js

index.js: Nơi gọi các reducer của từng đối tượng, khi  bạn thao tác với nhiều bảng thì bạn nên chia thành nhiều reducer sau đó chúng ta gọi tất cả vào reducers trong file index.js chính, việc này sẽ quản lý tốt các reducer cũng như làm cho code đơn giản hơn.
```
import { combineReducers } from 'redux'
import todos from './todos'

const myReducers  = combineReducers({
  todos
});

export default myReducers;
```
todo.js: file này sau khi dispatch một action gửi đến nó sẽ phân tích trong reducers để trả về state tương ứng với từng hành động.
Ở ví dụ của mình thì mình chỉ có 2 action được gửi đến là  lấy danh sách todo('LIST_TODO'), thêm todo('ADD_TODOk').

Một reducer thì có 2 tham số truyền vào bao gồm state hiện tại và actions.

Với điều kiện switch nó sẽ kiểm tra các type mà action truyền đến từng trường hợp thì nó sẽ có cách xử lý riêng. Ở ví dụ của mình thì có nếu type: 'LIST_TODO' thì nó sẽ trả về state là danh sách các todo hiện có, type: 'ADD_TODO' thì nó sẽ thực hiện thêm todo được truyền đến vào state đang hiện có.
```
var initialState = [];

const myReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LIST_TODO':
      return state;
    case 'ADD_TODO':
      state.push(action.todo)
      return [...state];
    default:
      return state;
  }
}

export default myReducer;
```


Ở thư mục App.js thì chúng ta sẽ import  containers vào để hiển thị lên view cho người dùng .
```
import React from 'react';
import AddTodo from './containers/AddTodo'
import TodoList from './containers/TodoList'

function App() {
  return (
    <div className="App container">
      <div className="row">
        <div className="col-md-5 col-md-offset-3">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">Todos</h3>
            </div>
            <AddTodo />
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
```

File index.js ở đây các bạn chắc thắc mắc tại sao sinh ra một thằng Provider. Thằng Provider là một component được cung cấp bở react-redux giúp cho chúng ta có thể dễ dàng truy cập store cũng như tất cả các funtion của nó ở tất cả các component con.

Chúng ta phải làm là tạo mới store và gói tất cả component con vào component Provider.
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import myReducers from './reducers/index'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(myReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);
```
## 3. Kết luận
Ok. Cám ơn các bạn đã theo dõi bài viết của mình nhé. Mình thì cũng không giỏi trong việc viết văn lắm, bài trên mình đã chia sẻ về kiến thức redux cũng như demo một ví dụ cho các bạn rùi. Cũng rất mong là các bạn nếu học được gì mới, hay về các ngôn ngữ, kiến thức thì hãy chia sẻ nhé. Hẹn gặp lại các bạn vào lần chia sẻ tiếp theo !!!!
## Tài liệu
Các bạn có thể lên trang chủ dạy redux là https://redux.js.org/ , ở trang này sẽ dạy chúng ta đầy đủ và dễ hiểu nhất.