### Introduction 
Trong phạm vi bài viết này chúng ta sẽ cùng tìm hiểu về cách tạo restful api với Node, Express và MongoDB.
API của chúng ta sẽ bao gồm những thứ sau:
*  Xử lý các hoạt động crud  
* .Api url có dạng sau: http://localhost:3000/tasks
*  Người dùng có thêm, sửa, xáo dữ liệu với database.
* Trả về kết quả Json.

### Create Api 
Trước khi bắt đầu chúng ta cần install Mongo local. Bạn vui long đến trang tải xuống để cài đặt mongo tại đây. [mongodb](https://www.mongodb.com/try#compass)
Đầu tiên chúng ta cần tạo thư mục ứng dụng, và initializing ứng dụng.
```
mkdir crud
cd crud
touch server.js
```

Create folder call api
```
mkdir api
```
Trong thư mục api này chúng ta sẽ tạo 3 thư mục call models, routes, and controllers.
```
mkdir api/controllers
mkdir api/models
mkdir api/routes
```
Tạo các file, model, route, controller liên quan.
```
touch api/controllers/taskController.js
touch api/model/taskModel.js
touch api/routes/taskRoutes.js
```
Tiếp theo chúng ta cần tạo file `package.json`.
```
npm init

```
Cấu trúc folder của ứng dụng.
![](https://images.viblo.asia/d0d5bb6f-6ed0-44ee-9ce0-a234228dc4bb.png)

### Install the dependencies

Để cài đặt các dependencies cho API của chúng ta chúng ta sẽ thực hiện comand sau:
```
npm i express cors body-parser mongoose
npm i nodemon --save-dev
```
* CROS là một node.js package để jeets nối với Express  dùng để kích hoạt  CORS với các tùy chọn khác nhau.
* Body-parser Node.js phân tích nội dung middleware.
*  Mongoose là một thư viện mô hình dữ liệu đối tượng cho MongoDB và Node.js
*  Nodemon là một tiện ích sẽ theo dõi bất cứ thay đổi nào trong mã nguồn của bạn và tự động khởi động lạo máy chủ của bạn.

Tiếp theo hay mở package.json và thay đổi phần `scripts` như sau:
```
"scripts": {
  "start": "nodemon server.js"
},
```

### Setting up the Server

Cập nhập file `taskController.js`
```
const mongoose = require('mongoose');
const task = mongoose.model('task');

exports.list_all_tasks = (req, res) => {
  task.find({}, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.create_a_task = (req, res) => {
  const newTask = new task(req.body);
  newTask.save((err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.read_a_task = (req, res) => {
  task.findById(req.params.taskId, (err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update_a_task = (req, res) => {
  task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    (err, task) => {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

exports.delete_a_task = (req, res) => {
  task.deleteOne({ _id: req.params.taskId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'task successfully deleted',
     _id: req.params.taskId
    });
  });
};
```

Trong đoạn code trên chúng ta đã import module. Sau đó xác định chức năng tương ứng với CRUD. Bạn có thể tham khảo mongoose tại đây để biết thêm thôn tin: [mongoose](https://www.mongodb.com/try#compass)
Cập nhật file `taskModel.js`
```
const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    task1: {
      type: String,
      required: 'task1 cannot be blank'
    },
    task2: {
      type: String,
      required: 'task2  cannot be blank'
    }
  },
  { collection: 'task' }
);

module.exports = mongoose.model('task', taskSchema);
```

Cập nhật file `RoutesModel.js`

```
const taskBuilder = require('../controllers/taskController');

module.exports = app => {
  app
    .route('/tasks')
    .get(taskBuilder.list_all_tasks)
    .post(taskBuilder.create_a_task);

  app
    .route('/tasks/:taskId')
    .get(taskBuilder.read_a_task)
    .put(taskBuilder.update_a_task)
    .delete(taskBuilder.delete_a_task);
};
```
Trong đoạn code trên chúng ta đã định nghĩa routes.
*  GET /tasks - trả về danh sách tất cả các task.
* POST /tasks - tạo mới task.
* GET tasks/:taskId trả về chi tiết 1 task bởi id.
* PUT tasks/:taskId - update 1 task bởi id.
* DELETE /task/:taskId - xóa 1 task bởi id.

Cuối cùng mở file sever.js và thêm đoạn mã sau:
```
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

global.Task = require('./api/models/taskModel');
const routes = require('./api/routes/taskRoutes');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb://localhost/Vuecrudapp',
  { useNewUrlParser: true }
);

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
```
Ở trên đoạn mã trên chúng ta đã sử dụng Mongoose’s `connect` phương thức để kết nối đến cơ sở dữ liệu. Cái mà chúng đã tạo và sự dung mongo Compass, trước khi tạo
 mới Express app và yêu cầu nbo sử dụng `bodyParser` and `cors`.
 
Sau đó chúng ta yêu cầu nó sử dụng `api/routes/taskRoutes.js` và nắng nghe các kết nối trên port 3000.
Bây giờ chúng ta bắt đầu start ứng dụng node và MongoDB bằng command sau:
```
npm run start
mongod
```
### Testing the RESTful CRUD API
Chúng ta sẽ sử dụng  [postman](https://www.postman.com/). Chúng ta sẽ bắt đầu bằng cách tạo danh sách task mới. Chọn POST là phương thức và nhập:
`http://localhost:3000/tasks`
![](https://images.viblo.asia/e67a6c3e-9de9-41c6-8678-08bc6ca03a6b.png)

### Conclusion

Qua bài giới thiệu này chúng ta đã hiểu và học được cạch tạo crud api với node.js. Sử dụng được các package `express cors body-parser mongoose`... 

### References

https://www.mongodb.com/try#compass

https://mongoosejs.com/docs/api.html

https://www.postman.com/

https://codesource.io/build-a-restful-crud-api-using-node-express-and-mongodb/