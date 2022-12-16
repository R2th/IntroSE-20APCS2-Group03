Chào mọi người, lại là mình đây, sau chuỗi ngày vọc về server với hàng tá các command line khó nhớ thì hãy cùng mình đổi gió một xíu với series này nhé =]].

Hôm nay hãy cùng mình bắt đầu một tour về combo Node JS + React JS. Cả series chúng ta sẽ cùng tìm hiểu về combo ReactJS + Node JS qua những ví dụ cơ bản. Trong đó sẽ trải qua các nội dung như sau 
>- Node JS + React JS - Cài đặt cơ bản
>- Kết nối React JS - Node JS
>- Authentication + Authorization
>- Node JS and Nosql database - mongodb
> - React JS & Redux state management
> 
Series sẽ bắt đầu bằng những cấu hình cơ bản với nội dung là ***Cài đặt cơ bản và kết nối React JS + Node JS***
## Node js + React JS ?

![](https://images.viblo.asia/a1f9d1b6-fcf7-46ca-936b-a15f3cd5bd48.png)


**Node.js** là một hệ thống phần mềm được thiết kế để viết các ứng dụng internet có khả năng mở rộng, đặc biệt là máy chủ web. Chương trình được viết bằng JavaScript, sử dụng kỹ thuật điều khiển theo sự kiện, nhập/xuất không đồng bộ để tối thiểu tổng tài nguyên và tối đa khả năng mở rộng. Node.js bao gồm có V8 JavaScript engine của Google, libUV, và vài thư viện khác.

Với nhiều ưu điểm, thì NodeJs đang phát triển rất nhanh với cộng đồng hỗ trợ lớn.

>- NodeJs viết bằng Javascript nên có cộng đồng hỗ trợ cực lớn, nên những vấn đề gặp phải sẽ nhận được sự support rộng rãi so với nhiều framework khác.
>- Hiệu năng cao + real time: NodeJs với cơ chế xử lý bất đồng bộ - non-blocking giúp NodeJs tiếp nhận và xử lý hàng ngàn request một lúc mà không gặp một khó khăn nào.
>- Dễ dàng mở rộng.
>- JSON API - Với javascript thì NodeJS + Nosql làm server là sự lựa chọn số 1 cho JSON API.
 
Với ứng dụng NodeJs thì một framework nhỏ mà mạnh mẽ thường được sử dụng là Express Js. Ở bài viết này chúng ta sẽ tiến hành cài đặt và cấu hình Express Js cho ứng dụng.

**React JS** đang là một trong những thư viện phổ biến nhất giới frontend. Sử dụng React Js để build các ứng dụng front-end với hiệu năng cao và thời gian xây dựng nhanh nhất có thể.

## Cài đặt các tool cần thiết
* Cài đặt Nodejs

```shell
$ sudo apt-get install curl
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt-get install nodejs
$ node -v
$ npm -v
```
Link: https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu
* Cài đặt mongo db
```shell
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
$ sudo systemctl start mongod
$ sudo systemctl enable mongod
```
Link: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

Sau khi cài các ứng dụng cần thiết thì chúng ta đến bước cấu hình và cài đặt famework + dependencies.

Mình sẽ chia 2 folder để tách backend và frontend làm 2 project riêng.

## Cài đặt
### Node JS
Đầu tiên hãy tạo folder và cài đặt framework
```shell
$ mkdir -p todo/backend
$ cd todo/backend
$ nano package.json
```

Hãy tạo file package.json để cài đặt nhanh framework và các thư viện liên quan. Ở đây mình sẽ cài `chalk` để phần log thêm sinh động, framework `express js`, dùng `mongodb` + `mongoose` làm database và connect database, `morgan` cho việc show log ở terminal dễ dàng hơn. Và `forever` để chạy ngầm server, sử dụng cho việc deploy sau này.

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "chalk": "^4.1.0",
    "body-parser": "1.19.0",
    "express": "^4.17.1",
    "mongodb": "^3.6.1",
    "mongoose": "^5.10.3",
    "morgan": "1.10.0",
    "forever": "3.0.2",
    "cors": "2.8.5"
  }
}
```
Và chạy npm install để cài đặt hết tất cả các dependencies này cho server Node Js
```shell
$ cd todo/backend
$ npm install
```
Hãy chắc rằng bạn đã chạy mongo db
`sudo systemctl status mongod`

Cùng xem cấu trúc thư mục của backend như nào nhé
```
.
├── config
│   ├── api.routes.js
│   ├── database.js
│   └── properties.js
├── controllers
│   └── api
│       └── top_pages_controller.js
├── package.json
├── package-lock.json
└── server.js
```
Mọi cấu hình mình sẽ đặt ở folder `config/`, như database, routes, các setup cho port ứng dụng, link database ...

Các controller xử lý logic sẽ nằm ở `controllers/`. Ở ngoài cùng sẽ là `server.js` dùng cho việc chạy server.

```javascript
// config/properties.js
module.exports = {
  PORT : 4000,
  DB : 'mongodb://localhost:27017/backend-todos',
  CORS : ['http://localhost:3000']
}
```
File `properties.js` này sẽ là nơi chúng ta lưu các thông số cố định như đường link hay các cổng kết nối với các ứng dụng khác .v.v.
```javascript
// config/database.js
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var chalk = require('chalk');
var dbURL = require('./properties').DB;
var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

module.exports = function(){
  mongoose.connect(dbURL);
  mongoose.connection.on('connected', function(){
    console.log(connected("Mongoose default connection is open to ", dbURL));
  });
  mongoose.connection.on('error', function(err){
    console.log(error("Mongoose default connection has occured "+ err +" error"));
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
File cấu hình `database.js` sẽ đảm nhiệm việc quản lý kết nối từ NodeJS đến mongodb, handle khi kết nối/ngắt kết nối và các lỗi nếu có.
```javascript
// server.js
var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');
var cors = require('cors')
var properties = require('./config/properties');
var db = require('./config/database');
var apiRoutes = require('./config/api.routes');
var app = express();
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});
var router = express.Router();

var whitelist = properties.CORS;
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

db();
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use('/api',router);
apiRoutes(router);

app.listen(properties.PORT, (req, res) => {
  console.log(`Server is running on ${properties.PORT} port.`);
})
```

### React js

```shell
$ cd todo
$ npx create-react-app frontend
$ mkdir frontend/src/components
```
Cùng xem cấu trúc cây thư mục sẽ như thế nào, ngoài các folders + files được generate bởi create-react-app, mình sẽ chia nhỏ các folder riêng, ở đây các components sẽ được viết ở folder `src/components`
```
.
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── components
│   │   └── Home
│   │       ├── index.js
│   │       └── MainView.jsx
│   ├── index.css
│   ├── index.js
│   ├── lib
│   ├── reportWebVitals.js
│   └── setupTests.js
└── yarn.lock
```
Để cài đặt nhanh một vài dependencies cần thiết, hãy thêm packages trực tiếp vào package.json, ở react thì trước tiên mình sẽ cài `react-dom`, `react-router-dom` và `axios` để tạo request http lên server Node JS. Dependencies của react sẽ như thế này.

```json
// package.json
{
  ...
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.1",
    "web-vitals": "^0.2.4",
    "react-router-dom": "latest",
    "axios": "0.21.0"
  }
  ...
}
```
```shell
$ cd todo/frontend
$ npm install
```
Như vậy thì cài đặt cơ bản bước đầu đã gần như là hoàn thành.

## Kết nối frontend - backend

**Backend:**
Hãy bắt đầu với một controller nhận request đơn giản nhất - `top_pages_controller.js`.

```javascript
// todo/backend/controllers/api/top_pages_controller.js
exports.index = function (req, res, next) {
  res.json({message: "Top Page"})
}
```
```javascript
// todo/backend/config/api.routes.js
var TopPages = require('../controllers/api/top_pages_controller.js');

module.exports = function(router) {
  router.get('/top_pages', TopPages.index);
}
```
Server Node JS sẽ chạy ở port 4000
```shell
node server.js
```

**Frontend**

Đến đây chúng ta sẽ thử gọi request lên server NodeJS nhé. Để bắt đầu, hãy tạo một http request với axios ngay ở component App.
Với package `axios`, chúng ta dễ dàng tạo một `XMLHttpRequests` từ browser.

```javascript
// App.jsx
import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    message: null
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/top_pages')
      .then(res => {
        let message = res.data.message;
        this.setState({message: message});
      }, err => {
        console.log(err)
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Front end</h1>
        <p>Message from backend: </p>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
export default App;
```
App react local sẽ chạy ở localhost:3000
```shell
npm run start
```

**Lưu ý :**
Đến đây hãy mở lại trang web react qua `localhost:3000` để kiểm tra xem frontend có thể gọi đến backend hay chưa. Trường hợp bị block do Cors thì hãy kiểm tra lại ở NodeJS đã cài package cors cũng như đã allow request chéo từ domain của react js hay chưa.

![](https://images.viblo.asia/3c561282-cf3a-43a3-807c-319c456dae53.png)

Hãy thêm domain của react vào biến `whitelist` ở file server.js nhé. Ở đây server react js của mình chạy ở `localhost:3000` nên ở properties của mình sẽ là `CORS : ['http://localhost:3000']`

Còn đây là kết quả của bài viết hôm nay. React JS nhận được message response từ NodeJS

![](https://images.viblo.asia/17568f6f-12b2-48d7-b4ee-ecc047933276.png)

Như vậy là phần 1 với nội dung Cài đặt cơ bản và kết nối React JS + NodeJS đã xong, hãy đón đọc tiếp những phần sau của series nhé =]].

Repos:
- https://github.com/at-uytran/todo-backend
- https://github.com/at-uytran/todo-frontend