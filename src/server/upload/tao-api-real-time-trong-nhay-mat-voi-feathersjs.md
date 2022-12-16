Với sự bùng nổ của Nodejs, hiện nay đang có rất nhiều backend framework sử dụng Javascript, và với sự đồng bộ trong việc sử dụng Javascript, việc real-time khi tương tác với backend đã trở nên rất dễ dàng và hiệu quả. Bài viết này sử dụng FeathersJS để tạo ra một API có khả năng real-time với client. Ngoài ra, bạn có thể tìm hiểu thêm các framework khác rất phổ biến như [sails.js](https://sailsjs.com/)  :)

![](https://images.viblo.asia/0a9e1dcb-ccc1-49a2-9f63-cdcd152d5778.jpeg)

Trong bài này, chúng ta sẽ implement API quản lý các task, các chức năng chính bao gồm sửa, xóa, thêm, đọc các task.

# Tạo project.

Cài đặt `feathers-cli` , package giúp chúng ta thực thi các câu lệnh với feathers framework.
```
$ npm install -g @feathersjs/cli
```

Sau đó ta tiến hành generate project

```
$ feathers generate app
```

Feathers sẽ hỏi thăm chúng ta về project định tạo, bạn hãy thoải mái trả lời những gì feathers hỏi :D

```
? Project name todomanager
? Description
? What folder should the source files live in? src
? Which package manager are you using (has to be installed globally)? npm
? What type of API are you making? REST, Realtime via Socket.io
```

Sau khi trả lời feathers về cấu hình project, bạn đã có thể chạy ngay project bằng câu lệnh `npm start`, rất đơn giản và nhanh chóng như rails phải không? Project sẽ được chạy trên port mặc định là `3030`.

Cấu trúc thư mục của feathers bao gồm:
```
-| package.json
-| node_modules
-| public
-| config # app config variable
-| src # app source code
-| test # unit test
```


# Tạo Service (resource)

*có thể bạn biết rồi: **Trong feathers, resource của api được gọi là Service***

Để tạo một service, chúng ta chạy command sau:
```
$ feathers generate service
```

Bạn sẽ được hỏi thăm một chút về service của bạn như tên, route, bạn lưu service của bạn ở db nào, cấu hình db ra sao...

```
? What kind of service is it? NeDB
? What is the name of the service? tasks
? Which path should the service be registered on? /tasks
? What is the database connection string? nedb://../data
```

Tương tự như các api framework khác, để tương tác với resource thông qua api, bạn cần phải có tên, route và để xử lý việc tương tác với resource, đôi khi bạn cần phải dùng đến các callback. Đối với feathers, để xử lý các tương tác với resource, bạn cần phải sử dụng đến hooks.

# Sử dụng service

Sau khi tạo được service, bạn có thể test service với bất kỳ tool test API nào như Postman hoặc thậm chí là curl. Các HTTP actions mặc định trong feathers được định nghĩa như sau:

* find (GET /tasks) – đọc toàn bộ task
* get (GET /tasks/:id) – lấy ra 1 task theo ID
* create (POST /tasks) – tạo task
* update (PUT /tasks/:id) – update toàn bộ field của task theo ID (các field không khai báo sẽ bị clear)
* patch (PATCH /tasks/:id) – chỉ update những field khai báo của task theo ID
* remove (DELETE /tasks/:id) – xóa task


Ví dụ GET đến `http://localhost:3030/tasks` , kết quả trả về như sau:
```JSON
{
    "total": 4,
    "limit": 10,
    "skip": 0,
    "data": [
        {
            "name": "drink water",
            "_id": "8RWmqASc1P40SDa5"
        },
        {
            "name": "learn Feathers",
            "_id": "Cpj5PI3NE6reH3Ha"
        },
        {
            "name": "buy water",
            "_id": "IZK5Knz0HxdVAc4h"
        },
        {
            "name": "go to the gym",
            "_id": "yycI1QLLhipzt6hu"
        }
    ]
}
```

# Hooks
Hooks là các functions được gọi trước hoặc sau các service method hoặc trong trường hợp có lỗi xảy ra khi tương tác với service đó.
Sau khi generate service, feathers cung cấp 1 module để ta khai báo hook với service đó, tương tự với service task của chúng ta:

```Javascript
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
```

Ví dụ, ta muốn trả thêm một attribute `updatedAt` mỗi khi cập nhật task:

```Javascript
const { setNow } = require('feathers-hooks-common')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [setNow('updatedAt')],
    update: [setNow('updatedAt')],
    patch: [setNow('updatedAt')],
    remove: []
  },
```

Như vậy, mỗi khi thực hiện PUT/PATCH/CREATE, dữ liệu trả về của ta sẽ có thêm attribute `updatedAt`

```JSON
{
    "name": "updated task",
    "updatedAt": "2017-12-26T13:27:46.723Z",
    "_id": "vFp2JoNiuksZyO6t"
}
```

# Soi real-time khi tương tác với api sử dụng feathers-client

Mặc định với feathers server, bạn sẽ được subscribe vào 1 channel tên là `anonymous` . Bạn có thể quản lý các channels bằng file `channels.js` , file này được tạo khi generate project.

```Javascript
module.exports = function(app) {
  app.on('connection', connection => {
    // On a new real-time connection, add it to the
    // anonymous channel
    app.channel('anonymous').join(connection);
  });
}
```

Và khi tương tác với service, feathers server sẽ emit message đến các subscriber với action có dạng `<service_name>/<action>` . Để có thể dễ dàng tương tác với feathers server, bạn có thể sử dụng [feathers-client](https://github.com/feathersjs/client) - A client for Feathers services. Cách dùng đơn giản như sau:

Tạo 1 static page:

```html
<script type="text/javascript" src="//unpkg.com/socket.io-client@1.7.3/dist/socket.io.js"></script>
<script type="text/javascript" src="//unpkg.com/@feathersjs/client@^3.0.0/dist/feathers.js"></script>
<script type="text/javascript">
  var socket = io();
  var client = feathers()
    .configure(feathers.socketio(socket));
  var taskService = client.service('tasks');
  
  taskService.on('created', function(task) {
    console.log('Someone created a task', task.name);
  });
  
  taskService.create({
    name: 'Task from client'
  });
</script>
```

Bạn hãy mở console và xem kết quả nhé :D :D :D