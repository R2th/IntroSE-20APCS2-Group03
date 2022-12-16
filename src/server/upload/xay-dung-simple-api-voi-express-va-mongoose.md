Chào các bạn, bài viết này mình sẽ giới thiệu cách viết một đơn giản trên NodeJS sử dụng Express và mongodb

# Cấu trúc ứng dụng của bạn
Khi làm việc với NodeJS thì việc bạn cấu trúc ứng dụng của mình rất quan trọng. Không giống với các framework Web như Ruby on rails, Lavarel .... đều được xây dựng sẵn các cấu trúc từ lúc khởi tạo app, với NodeJS bạn phải tự tạo cấu trúc ứng dụng của mình. Cách bạn cấu trúc sẽ ảnh hưởng đến cách bạn Code, và thuận tiện cho việc tái sử dụng sau này của bạn và các thành viên trong team. Mình rất thích xây dựng Web với NodeJS vì khi sử dụng bất khì một library nào bạn cũng phải config, điều này khiến chúng ta hiểu sâu về các khái niệm cũng như cơ chế được sử dụng trong ứng dụng của mình..

Mình chia ứng dụng thành các phần như trên với
- config: nơi mình chứa các config của server, hầu hết được lấy từ ENV variable
- app.js: là file main, include router, middleware, chạy server ...

- controllers: là nơi mình chứa các function được thực hiện khi xử lý các request và trả về response. Có thể có nhiều cách cấu trúc khác như gộp chung với routers nhưng mình để riêng lẻ cho dễ quản lý.

- middlewares: là nơi khai báo các custommiddleware cho ứng dụng của bạn. Bạn muốn mỗi request lên server sẽ hiện log.... thì sẽ khai báo ở đây và sử dụng trong app.js

- lib: là nơi mình khai báo các thư viện như kết nối database, redis .... 

- log: nơi lưu log của ứng dụng

- utils: các tiện ích như logger, send email...

- router: nơi khai báo các router path của ứng dụng


# Mongoose model 
Mongoose là một Object modeling tool được thiết kế trên môi trường bất đồng bộ. Nếu như ở Rails là ActiveRecord thì ở đây ta sử dụng Mongoose để mô hình hoá cho model. 
Chúng ta sẽ khai báo model như sau

```Javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('User', userSchema);

```
Mongoose cũng cho phép ta sử dụng middlware như một dạng callback trong rails vậy

# Controllers
Controllers là nơi nhận các request từ router, truyền các xử lý data về phía model bằng cách include model instance, giống với controllers trong MVC.

```Javascript
const User = require('../models/user');
const logger = require('../utils/logger');

const list_user = (req, res) => {
  User
    .apiQuery(req.query).select('username')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      logger.error(err);
      res.status(422).send(err.errors);
    });
}

const get_user = (req, res) => {
  User.findById(req.params.userId)
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
}

const create_user = (req, res) => {
  const newUser = new User(req.body);

  newUser.save(err => {  
    if (err) return res.status(500).send(err);
    return res.status(200).send(newTodoObj);
  });
}

const update_user = (req, res) => {

}

const delete_user = (req, res) => {
  User.findByIdAndRemove(req.params.userId, (err, data) => {
    if (err) return res.status(500).send(err);
    const response = {
        message: "User successfully deleted"
    };
    return res.status(200).send(response);
  })
}

module.exports = {
  list_user,
  get_user,
  create_user,
  delete_user,
  update_user
}


```

# Router
Là nơi mình khai báo các router path cho ứng dụng. Ở đây nhiều bạn sẽ hỏi sau không gộp chung Router và controller lại thì theo mình thấy thì nếu ứng dụng của bạn nhỏ như bài viết này thì có thể, nhưng khi có khoảng vài chục router path thì việc quản lý code sẽ rất khó khăn.

```Javascript
const user_controller = require('../controllers/users');

module.exports = (app) => {
  app.route('/users').get(user_controller.list_user),
  app.route('/users/:userId').get(user_controller.get_user),
  app.route('/users').post(user_controller.create_user),
  app.route('/users/:userId').put(user_controller.update_user),
  app.route('/users/:userId').put(user_controller.delete_user)
}

```


# Main file
Nhiệm vụ chính của app.js import routers, middleware, viewtemplate và chạy server

```Javascript
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');
const config = require('./config/index');
const logger = require('./utils/logger/index');
const app = express();

//Setup middleware
hbs.registerPartials(__dirname + '/views/partials') // partials view
app.set('view engine', 'hbs'); // engine view

app.use((req, res, next) => { // Custom middleware
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

app.use(express.static(__dirname + '/public')); // public

hbs.registerHelper('getCurrentYear', () => { //ViewHelper
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => { //ViewHelper
  return text.toUpperCase();
});

// run server
app.listen(config.server.port, (err) => {
  if(err) {
    logger.error(err);
    process.exit(1);
  }
  require('./lib/database');  // connect DB

  // import Router
  fs.readdirSync(path.join(__dirname, './routes')).map(file => {
		require('./routes/' + file)(app);
  });

  logger.info(
    `API is now running on port ${config.server.port} in ${config.server.environment} mode`
  );
});

```

Giờ các bạn có thể chạy thử server trên localhost:3000 để thấy kết quả
soure code: https://bitbucket.org/mitom07/demo-crud/src