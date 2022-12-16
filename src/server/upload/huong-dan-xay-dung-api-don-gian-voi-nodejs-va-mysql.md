## Khởi tạo project
### Requirement
- Nodejs 6.x
- Express 4.x
- Mysql 5.x

### Cài đặt

- Install npm
```
npm init

npm install
```

- Install express
```
npm install express --save

npm install express-generator -g

express -h

express --view=pug
```

- Chạy app với lệnh sau:

Trên hệ điều hành MacOS hoặc Linux:
```
DEBUG=myapp:* npm start
```
Trên hệ điều hành Windows::
```
set DEBUG=myapp:* & npm start
```


### Running Test

Truy cập app trên trình duyệt với đường link như bên dưới:

```
http://localhost:3000/
```

### Cài đặt Sequelize
Tham khảo cài đặt tại http://docs.sequelizejs.com/manual/installation/getting-started.html

Bằng sử dụng các lệnh sau:

```
npm install -g sequelize-cli
```

Sau đó ta tạo một file với tên `.sequelizerc` trong thư mục root của dự án. Trong file này chúng ta sẽ chỉ rõ đường dẫn (path) được require bởi Sequelize:
```
const path = require('path');

module.exports = {
  "config": path.resolve('./config', 'config.json'),
  "models-path": path.resolve('./models'),
  "seeders-path": path.resolve('./seeders'),
  "migrations-path": path.resolve('./migrations')
};

```

Rồi tiếp ta chạy lệnh:
```
npm install --save sequelize mysql2
```
để install packpage cho mysql.
Lệnh sau sẽ tạo các code mẫu cho việc kết nối đến DB của chúng ta.
```
sequelize init
```
Ta nhìn lai thì cấu trúc dự án sẽ như thế này:
```
nodejs_api
├── app.js
├── bin
│   └── www
├── package.json
├── config
│   └── config.json
├── migrations
├── models
│   └── index.js
└── seeders
└── routes
└── views
└── public
```

Tiếp theo ta tạo thư mục controllers trong thư mục root của dự án:
```
mkdir controllers
```

### Tạo các models

Quan hệ giữa 2 bảng `todos` và `todo_items` là 1-n. Một Todo có nhiều TodoItem và một TodoItem thuộc về một Todo. Chạy lệnh sau:
```
sequelize model:create --name Todo --attributes title:string
```
Câu lệnh này sẽ sinh ra 1 file todo.js trong thư mục `models` và file `<date>-create-todo.js` migration file trong thư mục `migrations`. `<date>` sẽ là thời gian model được tạo ra. Todo model sẽ như sau:
```
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    title: DataTypes.STRING
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
```
Tương tự với bảng `todo_items` ta chạy lệnh sau:
```
sequelize model:create --name TodoItem --attributes content:string,complete:boolean
```
Cuối cùng chúng ta chạy lệnh migrate để tạo migration:
```
sequelize db:migrate
```

### Tạo controller và sửa routing mặc định

#### Tạo todoController
Tạo 1 file `todo.js` trong thư mục `controllers`. Trong file này thêm chức năng `create`.
```
const Todo = require('../models').Todo;

module.exports = {
  create(req, res) {
    return Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
};
```

Tiếp đến chúng ta tạo file `index.js` trong `controllers` để export controller.
```
const todos = require('./todos');

module.exports = {
  todos,
};
```

#### Sửa routes

Sửa file `index.js` trong thư mục `routes` thành như sau:
```
const todosController = require('../controllers').todos;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/todos', todosController.create);
};
```


Như vậy chúng ta vừa tạo route cho phương thức POST để `create` Todo. Tiếp theo chúng ta thêm route này vào file `app.js` của ứng dụng.

Ta sửa file `app.js` như sau:
```
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
```

Chú ý là phải thêm vào trước app.get('*', ...) vì ứng dụng sẽ tự tìm kiếm các route theo thứ tự để match, nếu không phù hợp mới chuyển sang route ở dưới. app.get('*', ...) là catch tất cả các request và return message luôn.


![](https://images.viblo.asia/e89793db-4516-4085-91c5-42075c3a1d9a.png)

Dùng postman để tạo một todo:
![](https://images.viblo.asia/84d1962e-152e-4b22-b869-d0e83c56683a.png)

#### Danh sách các todos

Thêm chức năng `list` todo vào controller `todosController` sau phương thức `create`.
```
list(req, res) {
  return Todo
    .all()
    .then(todos => res.status(200).send(todos))
    .catch(error => res.status(400).send(error));
},
```

Tiếp theo mở file `routes/index.js` để tạo 1 URL map với todo GET request để liệt kê danh sách todos;

```
app.post('/api/todos', todosController.create);
app.get('/api/todos', todosController.list);
```

Và kết quả trên postman là:
![](https://images.viblo.asia/718e9f61-aaf6-421f-9c7b-b59d92b4b659.png)


#### Update một todo

Tương tự chúng ta thêm hàm `update` todo trong `todosController` dưới `list` như sau:

```
update(req, res) {
  return Todo
    .findById(req.params.todoId, {
      include: [{
        model: TodoItem,
        as: 'todoItems',
      }],
    })
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: 'Todo Not Found',
        });
      }
      return todo
        .update({
          title: req.body.title || todo.title,
        })
        .then(() => res.status(200).send(todo))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
```

Thêm route trong `routes/index.js`

```
app.put('/api/todos/:todoId', todosController.update);
```

Kết quả postman :
![](https://images.viblo.asia/9bad8d12-50a0-4170-805d-5270d0a1ee5f.png)

#### Xóa todos
Cuối cùng chúng ta tạo chức năng delete todo.

Thêm đoạncode vào file `controllers/todos.js`

```
destroy(req, res) {
  return Todo
    .findById(req.params.todoId)
    .then(todo => {
      if (!todo) {
        return res.status(400).send({
          message: 'Todo Not Found',
        });
      }
      return todo
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
```
Thêm route :
```
app.delete('/api/todos/:todoId', todosController.destroy);
```

Nếu test bằng POSTMAN chúng ta có thể ngạc nhiên vì không thấy bất cứ data nào trả về. Sửa đổi một chút code trả về một status = 200 và một message xóa thành công.

```
  return todo
    .destroy()
    .then(() => res.status(200).send({ message: 'Todo deleted successfully.' }))
    .catch(error => res.status(400).send(error));
```


Kết quả:
![](https://images.viblo.asia/ea118fde-db19-4a71-8afd-517cfb098a4a.png)

Như vậy, ta đã tạo một ứng dụng nodejs viết api đơn giản. Tùy thuộc vào từng dự án có độ bảo mật khác nhau, ta có thể sử dụng token key để verify các request, hoặc allow ip server  để không làm ảnh hưởng đến thông tin của dự án và hạn chế truy cập vãng lai có ý đồ xấu :D

Các bạn có thể download code tham khảo [tại đây](https://github.com/huuhv/nodejs_api).

## Tham khảo
- https://expressjs.com/
- http://docs.sequelizejs.com/manual/installation/getting-started.html
- https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
- [Github code](https://github.com/huuhv/nodejs_api)