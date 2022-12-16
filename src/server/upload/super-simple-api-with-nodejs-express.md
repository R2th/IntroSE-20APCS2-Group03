# Introduction
I will introduce how to create an API using Node.js, Express, MongoDB.

[API creation URL](https://github.com/K-Sato1995/node_api)

# Simple describe of using language
Let me briefly introduce the main technologies used in this article.

For other packages, etc., a brief explanation will be given at the following articles.

* Node.js:  JavaScript that works on Server side

* Express: MVC framework of Node.js

* MongoDB: Database called NoSQL

# Prequisites
Here, it is assumed that Node.js and MongoDB are installed.

If you have not installed it, you can do it easily from the following.

[installing MongoDB](https://docs.mongodb.com/manual/installation/)

[installing Node.js](https://nodejs.org/en/download/)

# Steps

In this article, API development is performed according to the following procedure.

1. Initial setting
2. DB related settings
3. Route settings
4. Controller settings
5. Build an API
6. API operation check

# Initial settings
## Create Project
First, create a directory (project) to store the API and move into it.

```
$ mkdir todoApp
$ cd todoApp
```
## Create `package.json`

Execute the following command under the project to create `package.json`.

`package.json` describes project information and manages project dependencies.

```
$ npm init
```
After running npm init, the following questions will be asked on CLI.

Basically, there is no problem with the default setting for enter hits now.
```
package name: (todoAPP)
version: (1.0.0)
description: 
entry point: (index.js)
test command: 
git repository:
keywords:
author:
license: (ISC)
```

Then the following package.json will be created.

* package.json
```
{
  "name": "todoapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## Important files settings

Create the necessary directories and files with the following command.

```
$ touch server.js
$ mkdir api
$ mkdir api/controllers api/models api/routes
$ touch api/controllers/taskController.js api/models/taskModel.js api/routes/taskRoutes.js
```

If you have done so far, the directory structure will be as follows.
![](https://images.viblo.asia/c172db4f-d267-45bd-a899-7353cd341af9.jpeg)
## Setting related DB
First, install a library to operate `MongoDB` from a `Node.js` app called `mongoose`.

```
npm install mongoose --save
```
And edit api/models/taskModel.js as follows
```
api/models/taskModel.js
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    required: "Enter the name of the task"
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tasks", TaskSchema);
```

Here is what the configuration of each data should be (Schema).

As you can see from the code, each task consists of a string type name and a Date type `created_date`.

## Route Settings

The route defines how the application should react to client requests.
Edit `api/routes/taskRoute.js` as follows:
```
api/routes/taskRoute.js
module.exports = function(app) {
  var taskList = require('../controllers/taskController');

  app.route('/tasks')
    .get(taskList.all_tasks)
    .post(taskList.create_task);


  app.route('/tasks/:taskId')
    .get(taskList.load_task)
    .put(taskList.update_task)
    .delete(taskList.delete_task);
};
```

As you can see from the code, `/tasks` is set to execute all_tasks defined in `api/controllers/taskController` when it receives a GET request and execute `create_task` when it receives a POST request.

The function of `api/controllers/taskController` will be defined from now.

## Sttings of controller

Define the function set in the route in `api/controllers/taskController.js`.

Define the following five functions to satisfy CRUD. The role of each function was described in comments in the code.

* api/controllers/taskController.js
```
var mongoose = require("mongoose"),
  Task = mongoose.model("Tasks");

// Get all the tasks
exports.all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

// Create new task
exports.create_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

// Get a specific task
exports.load_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

// Update a specific task
exports.update_task = function(req, res) {
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    function(err, task) {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

// Delete a specific task
exports.delete_task = function(req, res) {
  Task.remove(
    {
      _id: req.params.taskId
    },
    function(err, task) {
      if (err) res.send(err);
      res.json({ message: "Task successfully deleted" });
    }
  );
};
```
## Build up API
### Install important package

First, install the following two packages required to run the API.

`express` is the MVC framework of `Node.js` as described at the beginning.

`nodemon` is a convenient package that automatically restarts the app if there is a file change.
```
$ npm install --save-dev nodemon
$ npm install express --save
```

### Start build up API at `server.js`

Combine the `Model, Route, Controller` set up so far in `server.js` so that the API can operate.

Let's set `server.js` as follows.

* server.js
```
var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  Task = require("./api/models/taskModel"), // 作成したModelの読み込み
  bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Tododb");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/taskRoutes"); // Routeのインポート
routes(app); //appにRouteを設定する。

app.listen(port); // appを特定のportでlistenさせる。

console.log("todo list RESTful API server started on: " + port);
```

## Start API, behavior checking

### How to start API

Make the server run by this command
```
$ mongod
```
Then open another tab on the terminal and run the API with the following command:
```
$ npm run start
```
## Check behavior via `postman`

### POST (http://localhost:3000/tasks)
Let's create data first.

Since it is a `Post` request, set the option on the left to enter the URL to Post and pass json format data.
![](https://images.viblo.asia/d649cfa8-edb1-4629-88cd-b57aa1b5af71.jpeg)

### Get(http://localhost:3000/tasks)
Next, let's get the data.
Since it is a GET request, let's change the option on the left to enter the URL from POST to GET and execute it.
![](https://images.viblo.asia/fba380a8-a1b8-48ee-ad61-1b9a4a91839f.jpeg)
### GET(http://localhost:3000/tasks/:id)
This time, specify the id and get only the necessary data.
![](https://images.viblo.asia/4b968b9d-f40c-40f9-85ed-e08700a2bf01.jpeg)
### PUT(http://localhost:3000/tasks/:id)
Next, let's update the data once registered.

Changed the option on the left of the URL to PUT.
![](https://images.viblo.asia/fbe2120d-f3ec-4fad-8609-46e50798737d.jpeg)
### DELETE(http://localhost:3000/tasks/:id)
Let's Destroy (delete) the data once registered.

Changed the option on the left of the URL to DELETE.
![](https://images.viblo.asia/e97ba6f1-91b5-47b2-9ee8-75f0e43eb635.jpeg)