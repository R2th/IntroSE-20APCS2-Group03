Trong những bài trước, chúng ta đã làm xong phần API. Các bạn có thể xem lại bài trước ở đây [TODO với React + Rails Part 4: Xây dựng CRUD API](https://viblo.asia/p/todo-voi-react-rails-part-4-xay-dung-crud-api-RQqKL2EMl7z)

Còn về reactjs, trong bài trước cũng đã làm xong rồi. [TODO với React + Rails Part 1: Basic Component](https://viblo.asia/p/todo-voi-react-rails-part-1-basic-component-yMnKMnQgZ7P)

Trong bài hôm này, mình sẽ tiếp tục tích hợp API đó với reactjs. 

### Làm thế nào để gọi API từ reactJS?
Trong reactJS đã có sẵn hàm  [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)  để gọi các API từ backend. 

**Syntax cơ bản:**
```js
    fetch(url, {
        method: 'POST' // 'GET', 'POST', 'PATCH', 'DELETE',.. Default: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            // params cần truyền lên nếu có. 
         })
    })
    .then(res => res.json())
    .then((response) => {
      // xử lý response
    })
    .catch(error => {
      console.log(error);
    })
```

### Task List
Sau khi render react component lần đầu, thì nó sẽ vào 1 lần duy nhất trong  hàm `componentDidMount`, hàm đó làm hàm mình sẽ gọi API get list task. 
Để hiểu rõ hơn, bạn nên đọc thêm về [reactJS lifecycle](https://reactjs.org/docs/state-and-lifecycle.html).

**API**

* url: api/v1/tasks
* method: "GET"


```js
// src/ToDoList.js
  constructor() {
    super()
    this.state = {
      items: [], // khởi tạo component set items state = []
      taskName: ''
    }
  }
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/tasks')
    .then(res => res.json())
    .then((response) => {
      this.setState({items: response.data}); // get list thành công, set state cho items
    })
    .catch(error => {
      console.log(error);
    })
  }
```

### Add Item
**API**

* url: api/v1/tasks
* method: "POST"


```js
// src/ToDoList.js

  onAddItem(e) {
    e.preventDefault();
    fetch('http://localhost:3000/api/v1/tasks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.taskName,
      })
    })
    .then(res => res.json())
    .then((response) => {
      if(response.success) {
        this.setState({items: [...this.state.items, response.data]}); // tạo task thành công, thêm task mới vào array task cũ
      } else {
        alert(response.errors.map(data => data.message).join('\n')); // trường hơp có lỗi, thông báo lỗi cho user
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
```

### Delete Task
**API**

* url: api/v1/tasks/:id
* method: "DELETE"


```js
  onDelete(id) {
    fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then((response) => {
      if(response.success) {
      // Delete thành công, bỏ đi task đã delete đó từ state
        const filteredItems = this.state.items.filter(item => {
          return item.id !== id
        })
        this.setState({
          items: filteredItems,
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

Save và refresh lại. Bạn đã làm xong phần cơ bản để tích hợp API với reactJS. :grinning: