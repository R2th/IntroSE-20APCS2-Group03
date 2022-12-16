Đây là bài hướng dẫn làm React dành cho những bạn mới học React. Trong Part 1 này mình sẽ giới thiệu cách tạo các Component cho TODO project của mình.

# Tạo Project
* Bạn cần phải cài dặt `NodeJS` và `npm` nếu chưa có.

* Cài đặt create-react app với  
```
npm install create-react-app --global
```

* Tạo project mới:
```
create-react-app todo_app
```
Nó sẽ tạo project với các file và folder cần thiết để chạy được Reactjs.
* package.json chứa các module/library,
* node_modules: chứa các package của module/library trong package.json
* src: chứa các source code React của bạn.
* public: chứa các file tĩnh như stylesheets, ảnh ....

cd vào todo_app và chạy
```
npm start 
hoặc
yarn start
```

# Components
* `src/index.js` : Đây là component chạy đầu tiên khi App start. 
* `src/App.js`: Đây là component import vào trong index.js, cũng là component render trên screen.
* Ở đây mình sẽ chia ra các component chính như sau:
1. `ToDoList.js` : component cha 
2. `ToDoItem.js` : item của từng Todo
3. `CreateForm.js` : form để tạo Todo


### ToDoList.js
```js
import React, { Component } from 'react'
import CreateForm from './CreateForm';
import ToDoItem from './ToDoItem';

class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      items: [
        {id: 1, name: 'task1'},
        {id: 2, name: 'task2'},
        {id: 3, name: 'task3'},
        {id: 4, name: 'task4'},
      ],
      taskName: ''
    }
  }

  onAddItem(e) {
    e.preventDefault();
    let newTask = {id: Date.now(), name: this.state.taskName}
    this.setState({
      items: [...this.state.items, newTask]
    })
  }

  onDelete(id) {
    const filteredItems = this.state.items.filter(item => {
      return item.id !== id
    })
    this.setState({
      items: filteredItems,
    })
  }

  onChange(e) {
    const taskName = e.target.value;
    this.setState({
      taskName: taskName
    })
  }

  renderItem() {
    const items = this.state.items.map((task) =>
      <ToDoItem
        key={task.id}
        name={task.name}
        onDelete={() => this.onDelete(task.id)}
      />
    )
    return items;
  }

  render() {
    return (
      <div className="container">
        <ul>{this.renderItem()}</ul>
        <CreateForm
          onAddItem={(e) => this.onAddItem(e)}
          value={this.state.taskName}
          onChange={(e) => this.onChange(e)}
        />
      </div>
    )
  }
}

export default TodoList
```

Trong component này chứa component con: `ToDoItem` và `CreateForm` và các method để Add, delete, ... Nó khởi tạo bằng state Items để hiển thị trong danh sách và state taskName là value của CreateForm.

* Component `ToDoItem` có props:` name, onDelete`

* Component `CreateForm` có props: `onAddItem, value, onChange`

### ToDoItem.js
```js
import React, { Component } from 'react'
class ToDoItem extends Component {
  render() {
    return (
      <li>
        {this.props.name}
        <button onClick={this.props.onDelete}>Delete</button>
      </li>
    )
  }
}

export default ToDoItem
```
### CreateForm.js

```js
import React, { Component } from 'react'
class CreateForm extends Component {
  render() {
    return (
      <div className="formCreate">
        <form onSubmit={this.props.onAddItem}>
          <input
            placeholder="task name"
            value={this.props.value}
            onChange={this.props.onChange}/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default CreateForm
```

### Style component
Để style cho các component, bạn thêm className, sau đó viết css cho className đó như bình thường. 

Nếu bạn tách style vào file riêng thì phải import .css đó vào component của bạn.
Trong `ToDoList.js ` 
```js
...
import './ToDoList.css';
...
```
`src/ToDoList.css`
```css
.todo-items ul {
  list-style: none;
}
```

Đến đây bạn đã làm xong một demo về ToDo đơn giản với React, nhưng chưa có connect với server. Bài sau mình sẽ viết Rails API và connect nó vào Reactjs.