Trong những bài trước mình đã làm xong TODO App với chức năng cơ bản nhất như Add, Update, Delete, Done, ... Hôm này mình sẽ implement thêm chức năng realtime cho những thao tác đó.
Như các bạn đã biết từ Rails 5 trở lên thì đã có hỗ trợ sẵn actioncable để làm realtime cho project Rails của mình. 

# Implement phía Server
Đầu tiên, generate channel:
```
rails generate channel Tasks
```
Nó sẽ tạo những files sau đây:
```
      create  app/channels/tasks_channel.rb
   identical  app/assets/javascripts/cable.js
      create  app/assets/javascripts/channels/tasks.coffee
```

Trong file `app/channels/tasks_channel.rb`
```ruby
# app/channels/tasks_channel.rb

class TasksChannel < ApplicationCable::Channel
  def subscribed
    stream_from "tasks_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
```

Ở đây mình sẽ subscribed vào channel có tên là tasks_channel. Những data broadcast đến channel này sẽ nhận được.

Tiêp theo ở trong controller mình sẽ broadcast đến channel tasks_channel với data cần thiết như sau:

```ruby
  def create
    task = Task.create! task_params

    ActionCable.server.broadcast("tasks_channel",
      {type: "add", task: Api::V1::TaskSerializer.new(task)})

    render json: {
      success: true,
      data: Api::V1::TaskSerializer.new(task)
    }
  end
  
  def update
    task = Task.find params[:id]
    task.update_attributes! task_params

    ActionCable.server.broadcast("tasks_channel",
      {type: "update", task: Api::V1::TaskSerializer.new(task)})

    render json: {
      success: true,
      data: Api::V1::TaskSerializer.new(task)
    }
  end
  
   def destroy
    task = Task.find params[:id]

    ActionCable.server.broadcast("tasks_channel",
      {type: "delete", task: Api::V1::TaskSerializer.new(task)})

    task.destroy!

    render json: {
      success: true
    }
  end
```

Mỗi action đều có `type` dùng để bên client biết được là data received là từ những action nào.

# Implement phía Client
Actioncable không chỉ support cho bên server, nó cũng có support cho Reactjs.
```
yarn add actioncable
```


Phía Client,  chúng ta sẽ cần 3 bước chính như sau:
+ Kết nối đến ‘/cable’
+ Subscribe tới channel 'tasks_channel'
+ Lắng nghe để nhận data

Trong file src/TodoList.js, trong `componentDidMount` modify code như sau:

```js
  componentDidMount() {
    ...

    const cable = ActionCable.createConsumer('ws://192.168.2.103:2000/cable'); // Kết nói
    this.subscriptions = cable.subscriptions.create('TasksChannel', { // subscribe
      received: (data) => { // data nhận được
        if(data.type === 'add') {
          this.setState({items: [...this.state.items, data.task]});
        } else if(data.type === 'update') {
          let updatedData = this.state.items.map(item => {
            if(item.id === data.task.id) {
              return {...data.task}
            }
            return item;
          });
          this.setState({
            items: updatedData
          })
        } else if(data.type === 'delete') {
          const filteredItems = this.state.items.filter(item => {
            return item.id !== data.task.id
          })
          this.setState({
            items: filteredItems
          })
        }
      }
     })
  }
```

Đến đây là đã xong. =))

# Kết quả:

![](https://images.viblo.asia/6f749fe2-8d21-4cee-a2b8-9932297e0749.png)

Để hiểu chi tiết về actioncable, bạn hãy vào document của nó xem nhé. 

https://guides.rubyonrails.org/action_cable_overview.html