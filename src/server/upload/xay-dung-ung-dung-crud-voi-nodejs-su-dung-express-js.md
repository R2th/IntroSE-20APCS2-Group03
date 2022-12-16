Express js là một framework Node js, Express là một framework nhỏ nhưng linh hoạt và cung cấp nhiều tính năng mạnh mẽ cho lập trình cả nền web và mobile.

Bài viết này mình sẽ trình bày các bước xây dựng một api CRUD đơn giản sử dụng Express Js.

### Setup server

Bước đầu tiên là setup server:
``` shell
mkdir api-express
cd api-express
npm init
```

Đặt tên cho entry point,  file này chính là file gốc để chạy server, config các thứ trong này.
Ở đây mình đặt tên là server.js

Tiếp theo là cài express:

```shell
npm install express --save
```

```shell
+ express@4.17.0
added 50 packages from 37 contributors in 8.274s
```

Nếu có thông báo như trên tức là bạn đã cài đặt Express thành công

Config file server.js 

```javascript
const express = require('express');

const port = 3000;
const app = express();

app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
});

app.get("/", function(req, res) {
  res.send('<h1>Response </h1><script>alert("Hello")</script>')
})
```

*app là instance của express, get là method HTTP, '/' là path routing, function handle request và response của method get này*

*```app.listen``` sẽ lắng nghe request ở cổng 3000.*

Router là một công việc basic nhất ở mọi server, ở Express thì cũng như những framework khác, bao gồm HTTP methods như GET, POST, PUT, DELETE

Start server bằng cách chạy ```node server.js```

Bước tiếp theo chúng ta sẽ config database, ở bài viết này mình sẽ dùng Mongo Db.

### Config DB

Nếu các bạn chưa cài Mongo thì có thể làm theo hướng dẫn [này](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

Install packages cần thiết, mình sẽ cài đặt thêm Mongoose (Object Document mapper cho Node js) và chalk để xem log server sinh động hơn.

```shell
npm install mongodb
npm install mongoose
npm install chalk 
```

- Mongo DB là một hệ quản trị CSDL dạng non-Sql, nó lưu dữ liệu dưới dạng Json, và các cơ sở dữ liệu của Mongo Db được gọi là Collection.

Nếu các bạn đã quen thuộc với cơ sở dữ liệu SQL thì ở Mongo Db, các bảng tương đương với Collection, còn các row dữ liệu trong bảng là các Document.

Ví dụ:

colection users:
```swift
[
    {
        _id: 1,
        name: "Nguyen Van A",
        birthday: "01/01/2001"
    },
    {
        _id: 2,
        name: "Nguyen Thi C",
        birthday: "01/02/2003"
    }
]
```

- Mongoose là một thư viện dùng để mô hình hóa đối tượng (Object Document Mapper - ODM) giữa MongoDB và Node Js.

Nhờ Mongoose, chúng ta có thể định nghĩa các object lấy từ cơ sở dữ liệu là Mongo Db. Mongo DB có ưu điểm so với các hệ QTCSDL sql chính là đặc điểm của nó - lưu dữ liệu dưới dạng JSON.

Điều này là lý do chính làm cho việc truy vấn ở MongoDB nhanh hơn rất nhiều so với việc truy vấn CSDL dạng SQL.

- Config DB & model:

Start Mongodb:
```shell
sudo service mongod start
```

```shell
cd demo-express
mkdir api/heros
cd api/heros
```

Tạo các file sau:
- heros.dao.js
- heros.model.js

File: ```heros.model.js```

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var herosSchema = new Schema({
    name :{
        type: String,
        unique : false,
        required : true
    },
    description : {
        type: String,
        unique : false,
        required : true
    }
}, {
    timestamps: true
});

module.exports = herosSchema;
```

File: ```heros.dao.js```

```javascript
var mongoose = require('mongoose');
var herosSchema = require('./heros.model');

herosSchema.statics = {
    create : function(data, cb) {
        var hero = new this(data);
        hero.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var herosModel = mongoose.model('Heros', herosSchema);
module.exports = herosModel;
```

Config cho database cũng như port server chúng ta sẽ để ở `config/properties.js` và `config/database.js`

file `config/database.js`

```javascript
//require mongoose
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

//require chalk
var chalk = require('chalk');

//require database URL ở properties.js
var dbURL = require('./properties').DB;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export các function và import ở server.js
module.exports = function(){
  mongoose.connect(dbURL);

  mongoose.connection.on('connected', function(){
    console.log(connected("Mongoose default connection is open to ", dbURL));
  });

  mongoose.connection.on('error', function(err){
    console.log(error("Mongoose default connection has occured "+err+" error"));
  });

  mongoose.connection.on('disconnected', function(){
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on('SIGINT', function(){
    mongoose.connection.close(function(){
      console.log(termination("Mongoose default connection is disconnected due to application termination"));
      process.exit(0)
    });
  });
}
```

file `config/properties.js`

```javascript
module.exports = {
  PORT : 4000,
  DB : 'mongodb://localhost:27017/api-express',
}
```


### Controller

file ```heros.controller.js```

```javascript
var Heros = require('./heros.dao');

exports.createHero = function (req, res, next) {
    var hero = {
        name: req.body.name,
        description: req.body.description
    };

    Heros.create(hero, function(err, hero) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Hero created successfully"
        })
    })
}

exports.getHeros = function(req, res, next) {
    Heros.get({}, function(err, heros) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            heros: heros
        })
    })
}

exports.getHero = function(req, res, next) {
    Heros.get({name: req.params.name}, function(err, heros) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            heros: heros
        })
    })
}

exports.updateHero = function(req, res, next) {
    var hero = {
        name: req.body.name,
        description: req.body.description
    }
    Heros.update({_id: req.params.id}, hero, function(err, hero) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Hero updated successfully"
        })
    })
}

exports.removeHero = function(req, res, next) {
    Heros.delete({_id: req.params.id}, function(err, hero) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Hero deleted successfully"
        })
    })
}

```

### Config routes

file ```heros.routes.js```

```javascript
var Heros = require('./heros.controller');

module.exports = function(router) {
    router.post('/create', Heros.createHero);
    router.get('/get', Heros.getHeros);
    router.get('/get/:name', Heros.getHero);
    router.put('/update/:id', Heros.updateHero);
    router.delete('/remove/:id', Heros.removeHero);
}
```

Config cho database cũng như port server chúng ta sẽ để ở `config/properties.js` và `config/database.js`

file `config/database.js`

```javascript
//require mongoose
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

//require chalk
var chalk = require('chalk');

//require database URL ở properties.js
var dbURL = require('./properties').DB;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export các function và import ở server.js
module.exports = function(){
  mongoose.connect(dbURL);

  mongoose.connection.on('connected', function(){
    console.log(connected("Mongoose default connection is open to ", dbURL));
  });

  mongoose.connection.on('error', function(err){
    console.log(error("Mongoose default connection has occured "+err+" error"));
  });

  mongoose.connection.on('disconnected', function(){
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on('SIGINT', function(){
    mongoose.connection.close(function(){
      console.log(termination("Mongoose default connection is disconnected due to application termination"));
      process.exit(0)
    });
  });
}
```

file `config/properties.js`

```javascript
module.exports = {
  PORT : 4000,
  DB : 'mongodb://localhost:27017/api-express',
}
```

Và cuối cùng là file ```server.js```

Update file server.js như sau

```javascript
var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');

var properties = require('./config/properties');
var db = require('./config/database');

var herosRoutes = require('./api/heros/heros.routes');
var app = express();

//cài đặt bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//biến cài đặt router
var router = express.Router();

// gọi kết nối database
db();

// configure app.use()
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Config response header
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

// sử dụng express router
app.use('/api',router);
//routing
herosRoutes(router);

// chạy server
app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})
```

Như vậy mình vừa hoàn thành một API CRUD đơn giản bằng Express Js.

Bài viết còn sơ sài và cấu trúc thư mục chưa rõ ràng, mục đích chính là giúp mọi người có thể config được server chạy và có thể response api CRUD.

Các bài viết sau mình sẽ cấu trúc cây thư mục clear hơn. Cảm ơn mọi người đã theo dõi bài viết! 

Tham khảo nguồn [bài viết](https://medium.com/@vsvaibhav2016/create-crud-application-in-express-js-9b88a5a94299)