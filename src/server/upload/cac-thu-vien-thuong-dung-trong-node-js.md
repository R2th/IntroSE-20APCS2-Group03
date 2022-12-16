Nodejs module giúp lập trình viên Nodejs phát triển ứng dụng cực nhanh, lý do là các việc cần xử lý hầu hết là các module đã giải quyết cho chúng ta rồi. 
Dưới đây mình sẽ liệt kê danh sách các module thường được sử dụng trong node js.

### 1. express
Đây là một trong những module (hay framework) được sử dụng nhiều nhất, expressjs là bộ khung giúp bạn dựng các ứng dụng web trên Nodejs, bạn có thể dễ dàng custom router, controller, … với express. 
- Làm ứng dụng MEAN stack (MongoDB, Express.js, Angular.js, Node.js)
- Có thể xử lý dễ dàng nhiều loại yêu cầu như GET, PUT, POST và DELETE
- Xây dựng các single page app, multi page app và hybrid web app.

### 2. async
Workflow của nodejs chạy theo hướng bất đồng bộ và callback, đây là một trong những điểm mạnh của nodejs. Nhưng đây lại là nỗi khốn khổ của phần lớn begginner bởi không thể kiểm soát được các luồng của async. Async là module giúp bạn khử bất đồng bộ, chạy các hàm 1 cách tuần tự.
```
async function handler (req, res) {
  let response;
  try {
    response = await request('https://user-handler-service')  ;
  } catch (err) {
    logger.error('Http error', err);
    return res.status(500).send();
  }

  let document;
  try {
    document = await Mongo.findOne({ user: response.body.user });
  } catch (err) {
    logger.error('Mongo error', err);
    return res.status(500).send();
  }

  executeLogic(document, req, res);
}
```

### 3.lodash
Lodash giúp bạn tăng sức mạnh cho ứng dụng javascript và nodejs với các hàm mở rộng để xử lý chuỗi, mảng, object, …
```
// import entire library
import _ from "lodash"
const nums = [1, 2, 2, 3, 1, 4]
let res = _.uniq(nums)

// import methods by name
// Still loads entire lodash library!!
import { uniq } from "lodash"
const nums = [1, 2, 2, 3, 1, 4]
let res = uniq(nums) // better readability

// import only what you need
import uniq from "loadash/uniq"
const nums = [1, 2, 2, 3, 1, 4]
let res = uniq(nums)
```

### 4. cheerio
Cheerio phân tích cú pháp như HTML và cung cấp API để duyệt/thao tác cấu trúc dữ liệu kết quả
```
const cheerio = require('cheerio');
const $ = cheerio.load('<ul id="fruits">...</ul>');
```

### 5. nodemailer
Gửi các email từ Node.JS, dễ dàng gửi các email - sử dụng SMTP
```
const nodemailer = require("nodemailer");
let testAccount = await nodemailer.createTestAccount();
let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user, 
    pass: testAccount.pass
 }
});
let info = await transporter.sendMail({
  from: '"Fred Foo" <foo@example.com>',
  to: "bar@example.com, baz@example.com",
  subject: "Hello ✔", 
  text: "Hello world?",
  html: "<b>Hello world?</b>"
});
```

### 6. faker
Tạo một lượng lớn dữ liệu giả trong trình duyệt và node.js. Xây dựng Front End UI và tương tác với dữ liệu trong khi quá trình xây dựng API chưa hoàn tất. Nhiều phương thức API bao gồm địa chỉ, công ty, cơ sở dữ liệu, hình ảnh, tên (FirstName, lastName)
```
var faker = require('faker');
var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card
```

### 7. morgan
Phần mềm trung gian logger yêu cầu HTTP cho node.js 
```
morgan
(':method :url :status :res[content-length] - :response-time ms')
---
var express = require('express')
var morgan = require('morgan')
var app = express()
app.use(morgan('combined'))
app.get('/', function (req, res) {
res.send('hello, world!')
})
```

### 8. http-errors
Tạo erros HTTP cho Express, Koa, Connect, v.v. Dễ dàng gửi phản hồi lỗi, nhiều thuộc tính lỗi có sẵn
```
app.use(function (req, res, next) {
 if (!req.user) 
   return next(createError(401, 'Please login to view this page.'))
  next()
})
```

### 19moment 
Cung cấp các hàm helper để xử lý, tính toán, xác thực, hiển thị, … thời gian trong javascript.
```
const moment = require('moment');

let d1 = moment("2018-06-03");
console.log(d1.format('ll'));

let d2 = moment([2017, 11, 23]);
console.log(d2.format('ll'));

let d3 = moment({ year :2010, month :3, day :5, 
    hour :15, minute :10, second :3, millisecond :123});
console.log(d3.format('ll'));

let d4 = moment(1530471537000);
console.log(d4.format('ll'));

let d5 = moment(new Date(2011, 11, 22));
console.log(d5.format('ll'))
```


### 10.socket.io
Socket.io là package giúp tạo các ứng dụng realtime bằng kết nối socket.
```
const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
  client.on('event', data => { ... });
  client.on('disconnect', () => { ... });
});
server.listen(3000);
```

### 11.mongoose 
Mongoose có sẵn các hàm giúp tương tác đến CSDL MongoDB một cách dễ dàng.

### 12.mysql
mysql.js giúp bạn dễ dàng kết nối đến cơ sở dữ liệu mysql bằng Nodejs.