Trong những bài trước, chúng ta đã hoàn thành về chức năng:  add, list, delete, ... Hôm nay, mình sẽ tiếp tục làm demo ToDo App với chức năng Done. 
Những Task nào mà user đã làm xong, người dùng có thể click button Done để đánh dấu là đã làm xong. 
Kết quả sau khi làm xong sẽ như sau:

![](https://images.viblo.asia/8696582a-6fe9-4118-9f56-972984fee9e1.png)


## Phần API
Đầu tiên chúng ta sẽ bắt đầu làm API trước, sau đó sẽ làm phần ReactJs.

Trong table tasks, chúng ta phải thêm trường mới : completed :boolean
```
rails generate migration add_column_completed_to_task
```
```ruby
class AddColumnToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :completed, :boolean, default: false
  end
end

```

Trong tasks_controller, chúng ta sẽ dùng chung với API update task với params truyền lên completed: true/false. 

```ruby
  def update
    task = Task.find params[:id]
    task.update_attributes! task_params
    render json: {
      success: true,
      data: Api::V1::TaskSerializer.new(task)
    }
  end
 
 ...
 
  private
  def task_params
    params.permit [:title, :completed]
  end
  
```

**API update task sẽ như sau:**

```
URL: {url}/api/v1/tasks/:id
Method: "PUT"
Params:
title: :string
completed: :boolean

```

## Phần ReactJs

### Sửa lại component ToDoItem
Trong `src/ToDoItem.js `, chúng ta sẽ bổ sung thêm điều kiện khi render.
* Với điều kiện chưa completed, sẽ thêm button "Done".
* Với điều kiện completed, sẽ thêm dấu gạch ngang vào title, và thay button Done bằng "Completed".

![](https://images.viblo.asia/aae080fc-c509-48c9-8428-a4dd1723e324.png)

vào file `src/ToDoItem.js` , chúng ta sẽ sửa code như sau

```js
import React, { Component } from 'react';
import { Button } from 'reactstrap';

class ToDoItem extends Component {
  renderData() {
    let task = this.props.task;
    if (task.completed) {
      return(
        <tr>
          <td style={{textDecoration: "line-through"}}>
            {task.title}
          </td>
          <td><Button color="danger" onClick={this.props.onDelete}>Delete</Button></td>
          <td>Completed</td>
        </tr>
      )
    } else {
      return(
        <tr>
          <td>{task.title}</td>
          <td><Button color="danger" onClick={this.props.onDelete}>Delete</Button></td>
          <td><Button color="success" onClick={this.props.onDone}>Done</Button></td>
        </tr>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderData()}
      </React.Fragment>
    )
  }
}

export default ToDoItem
```

Ở code trên, chúng ta đã thấy có props mới là props `onDone`. Props này sẽ là method gọi lên server để update task thành completed.

Vào file `src/ToDoList.js`, trong hàm `renderItem()`, chúng ta sẽ bổ sung props `OnDone` này
```js
  renderItem() {
    const items = this.state.items.map((task) =>
      <ToDoItem
        key={task.id}
        task={task}
        onDelete={() => this.onDelete(task.id)} 
        onDone={() => this.onUpdate({id: task.id, completed: true})}
      />
    )
    return items;
  }
```

Props onDone sẽ là hàm `onUpdate() `có params: id và completed: true.

```js
  onUpdate(params) {
    let id = params.id;
    fetch(`{url}/api/v1/tasks/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then((response) => {
      if(response.success) {
       // trường hợp update success, sẽ tạo data mới chứa task mới update đó.
       // sau đó update lại state
        let updatedData = this.state.items.map(item => {
          if(item.id === id) {
            return {...response.data}
          }
          return item;
        });
        this.setState({
          items: updatedData,
        })
      } else {
        alert("Cannot delete");
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
```

Với hàm onUpdate() này, nó cũng sẽ là hàm dùng chung để update attributes khác cho task.

Đến đây chúng ta đã làm xong chức năng Done cho bài demo này rồi.