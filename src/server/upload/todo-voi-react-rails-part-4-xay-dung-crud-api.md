Trong bài trước mình đang giới thiệu về cách xây dựng base api rồi. Bạn có thể xem ở đây https://viblo.asia/p/todo-voi-react-rails-part-3-xay-dung-base-api-aWj53NVYl6m . 
Bài tiếp theo ở đây sẽ bắt đầu với API cơ bản: API CRDUD task To Do.

### Routes
```ruby
# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tasks
    end
  end
end

```

### API List tasks 

```ruby
# app/controllers/api/v1/tasks_controller.rb

class Api::V1::TasksController < ApiController
  def index
    tasks = Task.all
    render json: {
      success: true,
      data: ActiveModel::Serializer::CollectionSerializer.new(tasks, serializer: Api::V1::TaskSerializer)
    }
  end
end
```
ApiController là api cha của tất cả api khác kế thừa từ nó. Bạn có thể vào xem bài trước để chi tiết hơn.
Khi response data thì chúng ta sử dụng serilalizer để format json một cách dễ dàng và linh hoạt.

**Request**

Method: `GET`

URL: `localhost:3000/api/v1/tasks`

**Response**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "task1"
        },
        {
            "id": 2,
            "title": "task2"
        },
        {
            "id": 3,
            "title": "task3"
        }
    ]
}
```

### API Show task
```ruby
# app/controllers/api/v1/tasks_controller.rb

def show
    task = Task.find params[:id]
    render json: {
      success: true,
      data: Api::V1::TaskSerializer.new(task)
    }
end
```

**Request**

Method: `GET`

URL: `localhost:3000/api/v1/tasks/1`

**Response**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "title": "task1"
    }
}
```

Nếu task id không tìm thấy, nó sẽ bắt luôn exception và trả về lỗi với format lỗi như đã làm trong bài trước.

**Request**

Method: `GET`

URL: `localhost:3000/api/v1/tasks/999`

**Response**
```json
{
    "success": false,
    "errors": [
        {
            "code": 3001,
            "message": "No data found."
        }
    ]
}
```

### API Create task

```ruby
  def create
    task = Task.create! task_params

    render json: {
      success: true,
      data: Api::V1::TaskSerializer.new(task)
    }
  end
  
  ...
  private
  def task_params
    params.permit [:title]
  end
```

**Request**

Method: `POST`

URL: `localhost:3000/api/v1/tasks`

Body: 
```json
{
	"title": "aaa"
}
```

**Response**
```json
{
    "success": true,
    "data": {
        "id": 5,
        "title": "aaa"
    }
}
```

trong trường hợp create mà có record invalid, thì nó sẽ bắt được các exception và trả về format lỗi tương tự. 


### API Update task

```ruby
  def update
    task = Task.find params[:id]
    task.update_attributes! task_params
    render json: {
      success: true,
      data: Api::V1::TaskSerializer.new(task)
    }
  end
```

**Request**

Method: `PUT`

URL: `localhost:3000/api/v1/tasks/1`

Body: 
```json
{
	"title": "new name"
}
```

**Response**
```json
{
    "success": true,
    "data": {
        "id": 5,
        "title": "new name"
    }
}
```

### API Delete task

```ruby
  def destroy
    task = Task.find params[:id]
    task.destroy!
    render json: {
      success: true
    }
  end
```

**Request**

Method: `DELETE`

URL: `localhost:3000/api/v1/tasks/1`

**Response**
```json
{
    "success": true
}
```

Đến đây là xong. Chúng ta đã làm xong các API cơ bản để có thể CRUD task.