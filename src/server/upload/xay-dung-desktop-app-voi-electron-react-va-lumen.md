Xin chào các bạn, hôm này mình sẽ giới thiệu đến các bạn cách xây dựng một todo app bằng Electron, React và Lumen 

**Lưu ý**: bài viết chỉ tập trung vào việc xây dựng ứng dụng nên mình sẽ không tập trung vào việc giải thích khái niệm, vì vậy nếu bạn có thắc mắc nào hãy comment bên dưới nhé :) 

## Bắt đầu nào
### Bước 1: xây dựng API (CRUD)
Ở đây mình sử dụng Lumen và sqlite cho tiện, các bạn cũng có thể sử dụng bất cứ code backend, database nào để xây dựng API mà bạn muốn.

**Route:**
```php
$router->get('/todos', "TodoController@index");
$router->post('/todos', "TodoController@store");
$router->post('/todos/delete', "TodoController@delete");
$router->post('/todos/complete', "TodoController@complete");
```
**Controller**
```php
class TodoController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(){}

    public function index() {
        $todos = Todo::all();

        return response()->json(["todos" => $todos], 200);
    }

    public function store(Request $request) {
        $todo = Todo::create([
            'content' => $request->content,
            'completed' => false
        ]);

        return response()->json(['todo' => $todo], 200);
    }

    public function delete(Request $request) {
        $todo = Todo::find($request->id);

        if (!is_null($todo)) {
            $todo->delete();
        }

        return response(200);
    }

    public function complete(Request $request) {
        $todo = Todo::find($request->id);

        if (!is_null($todo)) {
            $todo->completed = !$todo->completed;
            $todo->save();
        }

        return response(200);
    }
}

```
Start API:  `php -S localhost:8000 -t public`

Xong, bây giờ bạn có thể dùng postman để test thử:

Create một task:
![](https://images.viblo.asia/21c80604-e462-49b9-9671-f4c3fb374cf0.png)

Chuyển trạng thái sang hoàn thành:
![](https://images.viblo.asia/e4b1850a-5ace-41f7-b002-2b69f25fd48b.png)

Xóa một task:
![](https://images.viblo.asia/8935fa19-dab7-41e6-8b52-48381652b38f.png)

Lấy danh sách các task đã tạo:
![](https://images.viblo.asia/2e734948-d8dd-4497-a618-eeadda109140.png)

### Bước 2: Tạo todo app bằng Reactjs
Lưu ý: bạn nhớ cài axios nhé, chúng ta sẽ sử dụng nó để call API

Đầu tiên ta cần xây dựng component  để tạo một task mới: **`AddTodo.js`**

```javascript
import React, { Component } from 'react';

class AddTodo extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    }

    this.changeContent = this.changeContent.bind(this)
    this.add = this.add.bind(this)
  }

  changeContent(e) {
    this.setState({ value: e.target.value })
  }

  add() {
    this.props.createTodo(this.state.value)

    this.setState({ value: '' })
  }

  render() {
    return (
      <div className="create-todo">
        <input type="text"
          value={this.state.value}
          onChange={(e) => this.changeContent(e)}
          placeholder="What should I do?"
        />
        <button onClick={this.add}>Save</button>
      </div>
    )
  }
}

export default AddTodo
```

Cái này đơn giản phải không :) 

Tiếp tục với component hiển thị danh sách các task: **`TodoList.js`**
```javascript
import React from 'react'

export default function TodoList({todos, completeTodo, deleteTodo}) {
  return (
    <ul>
      {
        todos.map((todo) => (
          <li key={todo.id}>
            {+todo.completed ? <strike>{todo.content}</strike> : todo.content}
            <div className="btn-groups">
              <button className="complete" onClick={() => completeTodo(todo.id)}>{+todo.completed ? 'Rework' : 'Complete'}</button>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))
      }
    </ul>
  );
}
```

Cuối dùng ta cần đưa 2 component đó ra main component, ở đây là **App.js**

```
import React, { Component } from 'react';
import axios from "axios";
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import './App.css';

const API_URL = 'http://localhost:8000/todos'

class App extends Component {
  constructor() {
    super()

    this.state = {
      todos: []
    }

    this.completeTodo = this.completeTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.createTodo = this.createTodo.bind(this)
  }

  componentDidMount() {
    axios.get(API_URL)
    .then(response => {
      this.setState({
        todos: response.data.todos
      })
    })
  }

  deleteTodo(id) {
    axios.post(`${API_URL}/delete`, {id})
    .then(() => {
      const todos = this.state.todos.filter(todo => todo.id !== id)

      this.setState({todos})
    })
  }

  completeTodo(id) {
    axios.post(`${API_URL}/complete`, {id})
    .then(() => {
      const todos = this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }

        return todo
      })

      this.setState({todos})
    })
  }

  createTodo(content) {
    const todo = {content}

    axios.post(API_URL, todo)
    .then((response) => {
      const todos = this.state.todos.concat([response.data.todo])

      this.setState({todos})
    })
  }

  render() {
    return (
      <div className="App">
        <AddTodo createTodo={this.createTodo}/>

        <TodoList todos={this.state.todos}
          completeTodo={this.completeTodo}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

export default App;
```

Done, giờ chạy thử trên browser nào:
Chạy lệnh: `npm start` và mở browser với url `http://localhost:3000`

![](https://images.viblo.asia/f0cfbb63-ca81-4259-99cf-429e88b2c8ac.png)

 ở đây mình đã skip qua đoạn css, các bạn có thể tự thêm style theo ý thích của mình nhé :D

 Thêm một task mới nào:
 ![](https://images.viblo.asia/57e13a94-7211-49f1-a0fd-b9414932abe8.png)

Nhấn hoàn thành task
 ![](https://images.viblo.asia/a5651fa1-5f37-442e-9c30-f8d28d364776.png)

 Khá đơn giản phải không :) , tiếp tục với bước 3 nào.

 ### Bước 3: Install electron và tạo app bằng electron
 Install electron : `npm install electron --save-dev`

và thêm lệnh run electron vào file `package.json` như sau:

**Lưu ý:** bạn chỉ cần thêm dòng mình bôi đỏ vào script thôi nhé, những thứ khác đừng nên quan tâm vội nhé :D

![](https://images.viblo.asia/aa8d8392-f55b-43f5-b3f6-766b8b3f66a3.png)

Thêm file entry cho electron:
Bạn tạo 1 file `electron.js` trong thư mục `src/` sau đó tiếp tục sửa file `package.json` như sau:

![](https://images.viblo.asia/3009b29f-69ba-4f01-aa52-cddf16b441a2.png)

Hồi hộp chưa :v , phần cuối đây rồi các bạn:
Các bạn sửa file `electron.js` với nội dung như sau:
```javascript
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

//Đoạn trên không cần nói cùng biết là import và lấy một số thứ cần thiết từ electron rồi nhỉ :)

let win; // khai báo biên win dùng để tạo lên một cửa sổ window của app

// Hàm tạo cửa sổ app
function createWindow() {
  win = new BrowserWindow({width: 800, height: 600}); // khai báo độ cao và rộng của cửa sổ

  win.loadURL('http://localhost:3000'); // load url của bạn, ở đây là localhost:3000 vì bạn đang chạy reactjs app trên port 3000

  win.webContents.openDevTools(); // cái này là cho phép bạn sử dụng devtool như browser để dùng cho debug thôi, không có gì đặc biệt 

 // khi close thì ta xóa cửa sổ đi 
  win.on('close', function() {
      win = null;
  })
}

// lắng nghe khi app sẵn sàng thì sẽ khởi tạo cửa sổ app
app.on('ready', createWindow);

// Khi close thì quit khỏi app
app.on('window-all-closed', function() {
  app.quit();
});

app.on('activate', function() {
  if(win == null) {
      createWindow();
  }
})
```

Cuối cùng đã xong hết,  Are you ready :D

chạy lệnh: `npm run electron`

![](https://images.viblo.asia/a8125b9c-eff3-4a74-8fbd-0af529d63b2a.png)

## Kết
Hy vọng qua bài viết này các bạn biết cách xây dựng desktop app sử dụng Electronjs một cách đơn giản.

Hiện tại app của bạn vẫn mới dừng lại ở việc load URL, ở đây là local (bạn cũng có thể load một url từ một site bất kì, nhưng nó khá củ chuối)

Nếu các bạn thích bài viết này và muốn mình viết thêm về cách build thành một file có thể cài đặt cho các hệ điều hành window, linux, macos thì hãy comment bên dưới để mình biết nhé

Git repo: https://github.com/thuyettiensinh/electron-react-todo-app

Thank for you time, bro (☞ﾟヮﾟ)☞