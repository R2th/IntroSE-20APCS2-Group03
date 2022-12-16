# 1. Lời mở đầu
Khi học **NodeJs** thì chắc hẳn các bạn sẽ tiếp xúc với nhiều các **framework** khác nhau  của **Node** và chắc hẳn ai đã từng học hay tiếp xúc với **NodeJS** thì sẽ đều sẽ làm việc với **Express framework** - một web application framework của **NodeJS**. 

Mình nghĩ là đây là một **framework** khá dễ học với những bạn mới bắt đầu. Nó khá là tiện khi hỗ trợ rất nhiều các tính năng trên web hay trên mobile. Chúng giúp chúng ta xây dựng backend một cách dễ dàng hơn. Có thể kể đến một vài tính năng mà **Express** hỗ trợ như :
* Middleware
* Routing
* Templating
* Debugging

bên cạnh đó là rất nhiều các API hỗ trợ.

![](https://images.viblo.asia/0f485078-ecef-4570-a282-78a1f25d0541.png)

Nghe cũng thú vị rồi đấy, đi vào tìm hiểu thôi.

# 2. Cài đặt
```
$ mkdir express
$ cd express
$ npm install express --save
```
Tạo xong **express** rồi. Trước hết có in `Hello World` ra cái đã :v: 

Tạo thêm một file **index.js** với nội dung : 
```javascript
// khai báo module express
const express = require('express');
const app = express();

// khai báo route
app.get('/', (req, res) => {
  res.send('Hello World!');
})

// lắng nghe app trên cổng 3000
app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`);
})
```

Chạy `node index.js` để xem kết quả.

# 3. Routing
Như ở ví dụ đơn giản trên thì chúng ta cũng đã nhìn qua sương sương về **route** của **express** bằng cách khai báo như trên.
```javascript
app.get('/', (req, res) => {
  res.send('Hello World!');
})
```
với đoạn code trên chúng ta có thể hiểu được cấu trúc để khai báo một **route** theo cấu trúc
```javascript
app.METHOD(PATH, HANDLER)
```
trong đó :
* `app` một instance của **express**
* `METHOD` các HTTP methods (get, post, delete, put)
* `PATH` đường dẫn trên browser.
* `HANDLER` một function để thực thi đoạn code khi mà `path` được gọi.

### Route parameters
Chúng ta cũng có thể khai báo các params cho url với cú pháp `:param`.
```javascript
// Khai báo routes
app.get('/users/:userId/address/:address', (req, res) => {
  res.send(req.params); // lấy params được truyền trên url req.params
});

// URL
http://localhost:3000/users/1/address/hanoi

// Kết quả :
{"userId":"1","address":"hanoi"}
```

### Sử dụng Router để prefix route
Nếu chúng ta muốn trước khi vào mỗi đường dẫn nào đó đều muốn nó bắt đầu bằng `/admin` chả hạn thì chúng ta chỉ cần khai báo như sau :
```javascript
const router = express.Router();
app.use('/admin', router);

router.get('/blog', (req, res) => {
  res.send('day la route co prefix');
});
```

Ở đọa code trên chúng ta có khai báo một đối tượng **Router**, đây là một object khá mạnh của **express** thường dùng trong các trường hợp như **middleware** hay là xử lý **route**. Nó hỗ trỡ một vài các methods mà các bạn có thể xem tham khảo thêm tại [đây](https://expressjs.com/en/4x/api.html#router).

### app.route()
Một cách nữa để định nghĩa `route` đó là sử dụng **app.route()**. Việc sử dụng cách này sẽ thấy code khá ngắn gọn và dễ dàng tránh nhầm lẫn, cũng tránh việc bị lặp lại khi định nghĩ nhiều **route** mà có chung các đường dẫn.
Ví dụ về việc không sử dụng **app.route()**.
```javascript
function doGet(req, res, next) {
  // code
}

function doPost(req, res, next) {
  // code
}

function doPut(req, res, next) {
  // code
}

app.get('/books/:book', doGet);
app.post('/books/:book', doPost);
app.put('/books/:book', doPut);
```
Có thể thấy có đến 3 đoạn chúng ta đều khai báo là `/books/:book`, nếu có nhiều hơn 3 cái thì nhìn cũng khá là khó chệu. Cách viết tối ưu hơn là sử dụng **app.route()**.
```javascript
function doGet(req, res, next) {
  // code
}

function doPost(req, res, next) {
  // code
}

function doPut(req, res, next) {
  // code
}

app.route('/books/:book')
.get(doGet)
.post(doPost)
.put(doPut);
```

# 4. Middleware
Khi một request được gửi lên thì **Express** sẽ thực hiện lần lượt các hàm **middleware** cho đến khi trả về response cho người dùng. Chúng có quyền truy cập đến các **request** hay **response**. 

Nếu một hàm **Middleware** thực hiện xong mà vẫn chưa phải là hàm cuối cùng trong các hàm cần thực hiện chúng ta cần phải gọi đến hàm **next()** nếu không ứng dụng sẽ bị treo tại ngay cái hàm đó.

Có 5 kiểu **middleware** được sử dụng trong **Express** đó là :
* Application-level middleware
* Router-level middleware
* Error-handling middleware
* Built-in middleware
* Third-party middleware

Chúng ta sẽ đi vào tìm hiểu xem từng kiểu đó là gì

### Application-level middleware
Khi khởi tạo một ứng dụng **Express** chúng ta sẽ có một đối tượng đại diện cho ứng dụng đó, cụ thể là **app**. Đối tượng này thường được chúng ta khai báo dưới dạng tên là **app**.
```javascript
const app = express();
```
thì chúng ta coi đây **app** này là ở **level application**, level cao nhất. Chúng ta có thể khai báo các **middleware** của cấp ứng dụng sử dụng **app.use()** hay là **app.METHOD**(với METHOD là các phương thức HTTP).

**Khai báo middleware cho một đường dẫn cụ thể :**
```javascript
const express = require('express')
const app = express();

// khai báo middleware cho route
app.use('/user/:id', (req, res, next) => {
  console.log('Day la middleware')
  next()
})

app.get('/user/:id', (req, res) => {
  res.send('hello nha')
})

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`)
})
```

**Nếu không khai báo đường dẫn cụ thể, nó sẽ mặc định chạy khi gọi tới tất cả các route :**
```javascript
app.use(function (req, res, next) {
  console.log('Middleware chung route')
  next()
})
```

### Router-level middleware
Middleware này thì tương tự với **middleware cấp ứng dụng**, chỉ khác là **Router-level middleware** là instance của **express.Router()**.

Để sử dụng **middlware** cấp **route** chúng ta cũng sẽ sử dụng **router.use()** hoặc **router.METHOD** như **Application-level middleware**.

Ở trên nếu mọi người để ý thì ở phần tìm hiểu về **Route** mình cũng đã sử dụng **router.use()** để định nghĩa prefix cho route.

**Khai báo middleware chạy ở bất cứ request nào :**
```javascript
router.use(function (req, res, next) {
  console.log('Middleware route')
  next()
})
```

###  Error-handling middleware
Đây là **middleware** dùng cho việc xử lý lỗi. Nhưng khi dùng **middleware** này cần khai báo đủ 4 tham số là `err, req, res, next`. Mặc dù không sử dụng đến tham số **next**, nhưng việc khai báo này là bắt buộc để **Express** nhận ra đây là hàm xử lí lỗi.

Giả sử khi server lỗi. 
```javascript
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

### Third-party middleware
Sử dụng **middlware** này để chúng ta thêm các chức năng cần thiết khác cho app. Giả sử chúng ta thêm một **middleware** là `cookie-parser`.

Chỉ cần chạy lệnh 
```
$ npm install cookie-parser
```
sau đó khai báo ở **cấp ứng dụng** hay **cấp route** thì tùy các bạn định nghĩa. Ví dụ :
```javascript
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```
Chúng ta có thể tham khảo thêm các **middleware** khác tại [đây](http://expressjs.com/en/resources/middleware.html).

# 5. Sử dụng template engines
Nếu như bạn từng tiếp xúc với **Ruby on Rails** thì việc tiếp cận các **template engines** của **NodeJS** khá dễ dàng. Nếu như trong **Rails** có **erb** thì **NodeJS** có **ejs**, hay là **Rails** có **slim** còn **Node** có **pug**. Mình thấy không có quá nhiều sự khác biệt nào trong việc sử dụng template engines trong **Node** nếu như bạn từ tiếp xúc với **Rails**.

Để sử dụng template engine **pug** chỉ cần cài 
```
$ npm install --save pug
```
và khai báo
```javascript
//Khai báo đường dẫn đến thư mục chứa các template
app.set('views', './views')
//Khai báo template engine sử dụng
app.set('view engine', 'pug')
```
Và cách khai báo này cũng tương tự nếu như các bạn dùng **template engines** nào khác.

# 6, Express database
**Express** có thể kết hợp với rất nhiều các loại cơ sở dữ liệu khác nhau.
Giả sử chúng ta kết nối với `mysql` thì trước tiên cần phải cài module mysql trước.
```
$ npm install mysql
```
và khai báo để sử dụng
```javascript
const mysql = require('mysql');
```
Để tạo một `database` chúng ta cần phải khai báo một vài cấu hình đơn giản như `hostname`, `database name`..
```javascript
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
```

Đây chỉ là một ví dụ về cách kết hợp **Express** với **database**. Trên thực tế mình thấy người ta hay sử dụng **NodeJS** với **MongoDB** hơn cả. Để tìm hiểu các sử dụng và kết hợp chúng bạn có thể xem thêm tại [https://github.com/mongodb/node-mongodb-native](https://github.com/mongodb/node-mongodb-native).

# Kết luận
Trên đây là những tìm hiểu của mình về **Express framework**.