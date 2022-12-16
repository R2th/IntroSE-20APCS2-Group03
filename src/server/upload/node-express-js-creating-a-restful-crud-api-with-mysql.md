![](https://images.viblo.asia/3262585e-97db-47ba-8067-f75c2de50e58.jpeg)

Trong bài hôm nay mình sẽ hướng dẫn, tìm hiểu  tạo RESTful  Api  cùng với nodejs & mysql

## I. Create Project Folder

Tạo  project folder
```js
 mkdir node-rest-crud-api
 cd node-rest-crud-api
 ```
Sau khi tạo thành công `node-rest-crud-api`, tiếp theo sử dụng cmd dưới để khởi tạo project nodejs
 
 ```js
 npm init --yes

npm install  
```

Bây giờ cài đặt framwork expressjs & mysql driver

```js
 npm install express --save
 npm install mysql --save
 npm install body-parser --save
 ```
 
 ### II. Create Database and table
 
 Create DB:
 ```sql
 CREATE DATABASE nodejs_mysql;
 ```
 Create table:
 ```sql
--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task`, `status`, `created_at`) VALUES
(1, 'Find bugs', 1, '2019-04-10 23:50:40'),
(2, 'Review code', 1, '2019-04-10 23:50:40'),
(3, 'Fix bugs', 1, '2019-04-10 23:50:40'),
(4, 'Refactor Code', 1, '2019-04-10 23:50:40'),
(5, 'Push to prod', 1, '2019-04-10 23:50:50');
 ```
 
 ## Create files & folder
 
 Tạo cấu trúc thư mục và files như dưới đây
 
 ![](https://images.viblo.asia/95235ffa-5af0-4f7f-b643-fa7e767a1e85.png)
 

 
 #### server.js
  Tạo server.js với nội dung như sau
 ```js
 const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 3000;
app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/appRoutes'); //importing route
routes(app); //register the route
 ```
 
  #### appRoutes.js
 ```js
 'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/appController');

    // todoList Routes
    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};
```
   #### appController.js
```js
'use strict';

var Task = require('../models/appModel.js');

exports.list_all_tasks = function(req, res) {
    Task.getAllTask(function(err, task) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', task);
        res.send(task);
    });
};

exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body);

    //handles null error
    if(!new_task.task || !new_task.status){

        res.status(400).send({ error:true, message: 'Please provide task/status' });

    }
    else{

        Task.createTask(new_task, function(err, task) {

            if (err)
                res.send(err);
            res.json(task);
        });
    }
};


exports.read_a_task = function(req, res) {
    Task.getTaskById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_task = function(req, res) {
    Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function(req, res) {


    Task.remove( req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};
```

#### db.js

Thông tin kết nối database

```js
'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodejs_mysql'
});
// connect to database
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
```
#### appModel.js

```js
'user strict';
var sql = require('./db.js');

//Task object constructor
var Task = function(task){
    console.log(task);
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};
Task.createTask = function createUser(newTask, result) {
    sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Task.getTaskById = function createUser(taskId, result) {
    sql.query("Select task from tasks where id = ? ", taskId, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
Task.getAllTask = function getAllTask(result) {
    sql.query("Select * from tasks", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};
Task.updateById = function(id, task, result){
    sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
Task.remove = function(id, result){
    sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= Task;
```

## III. Demo
Khởi động server
```
$ npm start
```
Nếu output như dưới thì server đã tạo ok
![](https://images.viblo.asia/ef097cc5-18a4-40cc-b714-f5aee5120bb2.png)

Test thử xem thế nào
#### GET
`http://localhost:3000/tasks`
![](https://images.viblo.asia/a512dea2-1d20-4a92-b34e-a52990819658.png)
#### POST
`http://localhost:3000/tasks`
![](https://images.viblo.asia/4d5406b7-253a-426e-9f0e-17b359a58cb2.png)
#### GET Item
`http://localhost:3000/tasks/1`
![](https://images.viblo.asia/a1b3cd79-5e68-4efd-96d3-c7ee3926a55f.png)
####  PUT
`http://localhost:3000/tasks/1`
![](https://images.viblo.asia/ca57c94e-7164-4a75-9765-cc28d26af7c7.png)
####  DELETE
`http://localhost:3000/tasks/6`
![](https://images.viblo.asia/887e8ae1-3ae9-4ec3-91f1-267ac47d9bfd.png)

Như vậy là mình đã hướng dẫn cách tạo RESTful  API , cách kết nối db mysql, cấu trúc folder trong nodejs,  hy vọng sẽ giúp ích cho bạn, Thanks.