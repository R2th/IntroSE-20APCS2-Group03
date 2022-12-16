# `Tại sao nên sử dụng Render props?`
Trong React, khái niệm Render props đã xuất hiện từ rất lâu rồi, nhưng cụ thể nó là gì và tại sao nên sử dụng nó.
Nếu bạn đã sử dụng đến HOC thì Render Props cũng tương tự. Đây là 2 cách phổ biến nhất để xử lý những  bài toán gặp nhưng component khác nhau nhưng lại có chức năng tương tự nhau.
Theo nhận xét cá nhân, Render Props đơn giản và dễ viết hơn HOC. Render props xuất phát tự một anti pattern trong React, nhưng vô tình trở nên phổ biến bởi sự thú vị và tiện lợi của nó. Render là tên của một props truyền vào component, thay vì là string, object, number thì lại là một function. :)
![](https://images.viblo.asia/b2145458-e3c4-4e6f-89e6-21fd4d211d98.jpg)
## Render props
Cách sử dụng ở component
```js
const SampleComponent = () => (
   <RenderPropsComponent
      renderProps={(data) => <li key={data.id}>{data.name}</li>}
   />
)
// hay
const SampleComponent = () => (
   <RenderPropsComponent>
      {(data) => <li key={data.id}>{data.name}</li>}
   <RenderPropsComponent/>
)
```
Cách viết render prop
```js
const data = ... 
const RenderPropsComponent = ({ render })) => render(data)
const RenderPropsComponent = ({ children })) => children(data)
```

## Bài toán TODO LIST
Bài toán kinh điển thường được dùng làm ví dụ, ở đây mình sẽ làm một danh sách TODO, có các thao tác cần dùng như Create, Delete và Done task
```js
export default class ToDoList extends React.Component {
  state = {
    tasks: [],
    newTaskName: ""
  };

  onChangeNewTaskNew = e => {
    this.setState({
      newTaskName: e.target.value
    });
  };

  onAddNewTask = () => {
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          id: Date.now(),
          name: this.state.newTaskName,
          completed: false
        }
      ],
      newTaskName: ""
    });
  };

  onClickDoneTask = taskId => () => {
    const updatedTasks = [...this.state.tasks];
    const competedTaskIndex = this.state.tasks.findIndex(
      task => task.id === taskId
    );
    updatedTasks[competedTaskIndex].completed = true;
    this.setState({
      tasks: updatedTasks
    });
  };

  render() {
    const { tasks, newTaskName } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="new task"
          value={newTaskName}
          onChange={this.onChangeNewTaskNew}
        />
        <input type="button" value="Add" onClick={this.onAddNewTask} />
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.name}
              {task.completed && "<done>"}
              <button onClick={this.onClickDoneTask(task.id)}>Done</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
```

Với những bài toán đơn lẻ như này, có lẽ chưa cần dùng đến render props làm gì.
Nhưng khi yêu cầu là tạo ra nhưng component như Todo List, Employee List, Customer List, ... nhưng cũng có nhưng chức năng Create, Delete và Update thì sao. Những code như này thường có cách thức xử lý giống nhau, việc lặp lại là điều không nên.
```js
class ListController extends React.Component {
  state = {
    tasks: [],
    newTaskName: ""
  };

  onChangeNewTaskNew = e => {
    this.setState({
      newTaskName: e.target.value
    });
  };

  onAddNewTask = () => {
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          id: Date.now(),
          name: this.state.newTaskName,
          completed: false
        }
      ],
      newTaskName: ""
    });
  };

  onClickDoneTask = taskId => () => {
    const updatedTasks = [...this.state.tasks];
    const competedTaskIndex = this.state.tasks.findIndex(
      task => task.id === taskId
    );
    updatedTasks[competedTaskIndex].completed = true;
    this.setState({
      tasks: updatedTasks
    });
  };

  render() {
    const { tasks, newTaskName } = this.state;
    return this.props.children({
      tasks,
      newTaskName,
      onChangeNewTaskNew: this.onChangeNewTaskNew,
      onAddNewTask: this.onAddNewTask,
      onClickDoneTask: this.onClickDoneTask
    });
  }
}

export default class ToDoList extends React.Component {
  render() {
    return (
      <ListController>
        {({
          tasks,
          newTaskName,
          onChangeNewTaskNew,
          onAddNewTask,
          onClickDoneTask,
        }) => (
          <div>
            <input
              type="text"
              placeholder="new task"
              value={newTaskName}
              onChange={onChangeNewTaskNew}
            />
            <input type="button" value="Add" onClick={onAddNewTask} />
            <ul>
              {tasks.map(task => (
                <li key={task.id}>
                  {task.name}
                  {task.completed && "<done>"}
                  <button onClick={onClickDoneTask(task.id)}>Done</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ListController>
    );
  }
}
```
TodoList giờ các khối logic bỗng chốc tách biệt hoàn toàn với view. Thông qua ListController, các methods, state được bao bọc và  xử lý bên trong nó, còn về view thì sử dụng qua những data truyền vào, ngược lại so với cơ chế component - container.

## Conclusion
Trên đây là cách sử dụng đơn giản với Render Props, hãy áp dụng vào chính các project của bạn và bạn sẽ thấy điều thú vị khi sử dụng nó.
## `References`
1. https://medium.com/@leannezhang/render-props-what-how-why-and-when-we-should-use-it-be3ff257b0f5
1. https://reactjs.org/docs/render-props.html