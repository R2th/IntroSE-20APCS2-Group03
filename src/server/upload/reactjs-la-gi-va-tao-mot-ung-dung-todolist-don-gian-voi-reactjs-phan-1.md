Xin chào tất cả mọi người, là một developer, chắc hẳn trong chúng ta, không ai còn xa lạ với ReactJS, một thư viện viết bằng JavaScript được phát triển bởi Facebook rất là hot hiện nay.

Vì vậy, trong bài viết này, mình sẽ hướng dẫn mọi người cách tạo một ứng dụng TodoList đơn giản và nhanh chóng bằng ReactJS cho những người mới học để chúng ta có tầm nhìn tổng quan và hiểu rõ hơn về ReactJS một thư viện đang rất hot hiện nay nhé.

### **1.  ReactJS là gì?**
React là một thư viện viết bằng javascript, dùng để xây dựng giao diện người dùng(User Interface – UI).
Để phát triển ứng dụng hoàn chỉnh, một mình React Js là không làm được tất cả, bạn sẽ cần thêm:

* Server side language: để xử lý logic và lưu trữ dữ liệu trên server.
* HTML/CSS nếu bạn làm ứng dụng web.
* Objective C: nếu bạn sử dụng React để xây dựng app cho iOS

### **2.  Các thành phần chính trong một ứng dụng ReactJS ?**

* Component: Component là nơi render ra các mã html thuần, 1 điều quan trọng khác đó là nó cho phép ta chia nhỏ đoạn code của UI thành những phần độc lập với nhau, với mục đích để tiện cho việc quản lý và tái sử dụng.
* Props: Props là viết tắt của Properties, ta có thể hiểu nó như là những thuộc tính của 1 Component. Nếu coi Component như là đối tượng trong lập trình OOP thì Props giống như là những miêu tả về tính chất, đặc trưng của 1 đối tượng.
* State: State được dùng để biểu diễn trạng thái của Component. Tức là giá trị của State có thể thay đổi được, trái ngược hoàn toàn với Props là 1 giá trị bất biến.

Để không bị chậm trễ vào phần chính nên mình chỉ giới thiệu sơ lại về ReactJS, bạn có thể đọc thêm tại [đây](https://viblo.asia/p/nhung-khai-niem-co-ban-trong-reactjs-cho-nguoi-moi-bat-dau-WAyK8pDpKxX) nhé.

### **3.  Tạo một ứng dụng nhỏ TodoList với ReactJs ?**
Tạo 1 react app:
```
npx create-react-app my-app
cd my-app
npm start
```

Ở đây my-app của mình sẽ là todolist-app

Sau khi chạy lệnh `npm start` thì sẽ xuất hiện http://localhost:3000/ :
![](https://images.viblo.asia/dda74d42-5432-423c-9829-6c89a2cf0ed0.png)
> Ở trong phần này, mình sẽ hướng dẫn các bạn cách add 1 task vào list, sau đó hiển thị TodoList nhé. Còn phần edit và delete mình sẽ tiếp tục làm ở phần sau.

Trong file `src/index.js` các bạn chỉnh lại code thành như sau:
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TaskList from './TaskList';

ReactDOM.render(<TaskList />, document.getElementById('root'));
```

Ở file `public/index.html` các bạn nhúng thêm bootstrap ở thẻ `<head>` để giao diện đẹp hơn nhé :D 
```
    <meta name="theme-color" content="#000000" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
```
Tiếp theo, các bạn tạo 2 component là `src/TodoList.js` dùng để hiển thị các task có trong TodoList và `src/TaskList.js` dùng để xử lý các task như sau:

Ở component TodoList.js các bạn viết như sau:
```
import React, { Component } from 'react';

class TodoList extends Component {
    render() {
        return <tr>
            <td>{this.props.name}</td>
        </tr>
    }
}

export default TodoList;
```

Ở component TaskList.js:
```
import React, { Component } from 'react';
import TodoList from './TodoList';

class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: ['Task 1', 'Task 2'],
        }
    }
    render() {
        return (
            <div className="container">
                <br />
                <br />
                <h2>List Task</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name of task</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tasks.map(function (name, index) {
                                return <TodoList name={name}
                                />
                            }.bind(this))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TaskList;

```
> Trong component `TaskList`, chúng ta khai báo 1 state là một mảng tasks dùng để chứa các task, sau đó chúng ta sẽ map mảng để hiện thị các task thông qua việc gửi props `name` đến component TodoList.


Vậy là chúng ta đã hoàn thành phần hiển thị task list, và chúng ta sẽ có một view như thế này :D :
![](https://images.viblo.asia/42061a5e-a7e0-4bb8-95d8-56c05ecec727.png)

Ok tiếp theo chúng ta sẽ tới phần Add 1 Task vào List nhé:

Đầu tiên, chúng ta sẽ tạo 1 component `src/AddTask.js` và code chúng ta sẽ như sau:
```
import React, { Component } from 'react';
import TaskList from './TaskList';

class AddTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showTaskList: false,
            name: '',
        }
    }
    linkList = () => {
        this.props.closeForm()
    }
    handleAddTask = () => {
        this.props.addTask(this.state.name)
        this.linkList()
    }
    isChangedName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    render() {
        if (this.state.showTaskList == true) {
            return (
                <TaskList />
            )
        } else {
            return (
                <React.Fragment>
                    <div className="container">
                        <h2>Add New Task</h2>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Enter name of task" onChange={this.isChangedName} />
                        </div>

                        <button type="submit" style={{ marginRight: 5 + 'px' }} className="btn btn-default" onClick={this.handleAddTask}>Add</button>
                        <button type="button" className="btn btn-default" onClick={this.linkList}>Back</button>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default AddTask;
```
Trong component `AddTask.js` mình `import TaskList from './TaskList';` để khi click nút Back mình có thể gọi component `TaskList` để trở về TodoList :
```
        return (
            <TaskList />
        )
```

Chúng ta có các function như `handleAddTask` dùng để nhận state từ component `AddTask` sau đó sẽ gửi qua component `TaskList` thông qua props. Với hàm `isChangedName` sẽ có nhiệm vụ get các value từ thẻ input type đưa vào state `name`.

Trong component `TaskList.js` chúng ta import thêm component `AddTask.js` nhé
```
import AddTask from './AddTask';
```

Trong TaskList.js chúng ta sẽ tạo ra 3 functions như sau:
```
    setStatus = () => {
        this.setState({
            showAddForm: true,
        })
    }
    closeForm = () => {
        this.setState({
            showAddForm: false,
        })
    }
    addTask = (name) => {
        this.state.tasks.push(name)
        this.forceUpdate()
    }
```

> Chúng ta tạo state `showAddForm` dùng để hiển thị Form Add khi click nút Add,  và function `addTask` dùng để nhận `name` thông qua props từ component `AddTask`.

Tiếp theo chúng ta sẽ tạo 1 sự kiện khi click vào nút Add sẽ show ra component `AddTask` nhé
```
    if (this.state.showAddForm === true) {
        return (
            <AddTask addTask={this.addTask} closeForm={this.closeForm} />
        )
    }
```
`TaskList.js` cuối cùng của chúng ta sẽ như thế này:
```
import React, { Component } from 'react';
import TodoList from './TodoList';
import AddTask from './AddTask';

class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: ['Task 1', 'Task 2'],
            showAddForm: false,
        }
    }
    setStatus = () => {
        this.setState({
            showAddForm: true
        })
    }
    closeForm = () => {
        this.setState({
            showAddForm: false,
            showEditForm: false
        })
    }
    addTask = (name) => {
        this.state.tasks.push(name)
        this.forceUpdate()
    }
    render() {
        if (this.state.showAddForm === true) {
            return (
                <AddTask addTask={this.addTask} closeForm={this.closeForm} />
            )
        } else {
            return (
                <div className="container">
                    <br />
                    <br />
                    <button type="button" className="btn btn-outline-primary" onClick={this.setStatus} >Add Task</button>
                    <h2>List Task</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name of task</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tasks.map(function (name, index) {
                                    return <TodoList name={name}
                                    />
                                }.bind(this))
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default TaskList;

```
Và đây là thành quả cuối cùng của mình :D :
![](https://images.viblo.asia/f1c120b1-e596-4fe5-a596-4d51335a4acf.gif)


Vì mình vừa chỉ mới vừa học và làm React nên bài viết này sẽ không tránh khỏi những thiếu sót. Nếu có bất kỳ thắc mắc hay vấn đề gì thì các bạn hãy comment phía dưới cho mình nhé. Cảm ơn các bạn đã xem, hẹn gặp lại các bạn ở phần 2.

Tham khảo thêm tại:
https://fullstackstation.com/react-js-la-gi/
https://viblo.asia/p/nhung-khai-niem-co-ban-trong-reactjs-cho-nguoi-moi-bat-dau-WAyK8pDpKxX