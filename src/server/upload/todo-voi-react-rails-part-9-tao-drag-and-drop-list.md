Trong bài này mình sẽ implement tiếp ứng dụng TO DO với chức năng drag and drop các task. 
* Phía react, mình sẽ sử dụng một thư viện khá phổ biến tên là [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) để giúp chúng ta làm drap&drap list một cách đơn giản và phong phú. 
* Phía rails, mình sẽ sử dụng [gem ranked-model](https://github.com/mixonic/ranked-model) để hỗ trợ trong việc xử lý lưu order vào database.

# Phía Rails
* Gemfile
```ruby
gem "ranked-model"
```

=> `bundle install`

* Tạo migration add column vào bảng task
```
$ rails g migration add_column_row_order_to_tasks
```

```rb
class AddColumnRowOrderToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :row_order, :integer
  end
end
```

=> `rails db:migrate`

* Include vào model Task

```rb
class Task < ApplicationRecord
  include RankedModel
  ranks :row_order
  
   ...
end
```

Để update order, mình chỉ đơn giản update vào column_position là nó sẽ tự xử lý update order cho mình rồi. 
Ở đây, mình có thể dùng:
```rb
Task.first.update_attributes row_order_position: 0  # hoặc 1, 2, 37. :first, :last, :up and :down đều được
```

* Cập nhật trong `api/v1/tasks_controller.rb`:

```rb
  def index
    tasks = Task.rank(:row_order).all  #order theo row_order
    ...
  end

  private
  def task_params
    params.permit [:title, :completed, :row_order_position] # thêm params `row_order_position` vào permit params
  end
```

Như vậy khi cần update order, mình chỉ cần gọi api update task cùng với params `row_order_position` là xong. 

# Phía React
*  Cài đặt
```
# yarn
yarn add react-beautiful-dnd
```

`react-beautiful-dnd` có cấu trúc component như sau: 

![](https://images.viblo.asia/1eb816ed-094c-4ac6-914d-a001b4c3c5be.gif)

* `<DragDropContext />` : phần cha. Mình sẽ để các phần cần drag&drop ở trong này.
* `<Droppable />` : phần mình có thể drop cái khác vào trong này. Nó sẽ chứa các <Draggable /> nhiều khác.
* `<Draggable />` : phần con để có thể drag qua lại.

Vậy đầu tiên, mình phải điều chỉnh component của mình theo cấu trúc này.

* src/ToDoList.js: sửa như sau:

```js
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

...

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items: items
    })

    this.onUpdate({id: result.draggableId, row_order_position: result.destination.index});
  }

  renderItem() {
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <tbody ref={provided.innerRef}>
              {
                this.state.items.map((item, index) => (
                    <ToDoItem
                      index={index}
                      key={item.id}
                      task={item}
                      onDelete={() => this.onDelete(item.id)}
                      onDone={() => this.onUpdate({id: item.id, completed: true})}
                      onFocusOut={(title) => this.onUpdate({id: item.id, title: title})}
                    />
                  )
                )
              }
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
```

* src/ToDoItem.js: sửa như sau:

```js
import {Draggable} from 'react-beautiful-dnd';
...

  renderData(task, provided) {
    if (task.completed) {
      return(
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
       ...
        </tr>
      )
    } else {
      return(
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
         ...
        </tr>
      )
    }
  }
  
  render() {
    let task = this.props.task;
    let index = this.props.index;

    return (
      <React.Fragment>
        <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
            {(provided, snapshot) => (
                this.renderData(task, provided)
              )
            }
        </Draggable>
      </React.Fragment>
    )
  }
```

Đến đây là xong. Chúng ta sẽ nhận được chức năng drap & drop cơ bản nhất. Ngoài ra còn rất nhiều tình năng bạn có thể làm được với react-beautiful-dnd.

Để chi tiết hơn, bạn có thể vào xem document của nó: 

https://github.com/atlassian/react-beautiful-dnd

https://github.com/mixonic/ranked-model