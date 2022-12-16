# Mở đầu
Xin chào các bạn mình đã quay trở lại rồi đây, tiếp tục với series Nodejs cơ bản thì hôm nay mình sẽ giới thiệu đến các bạn Express `Router` và Controller.Vậy tại sao lại cần chia ra làm gì code kia vẫn đang chạy ổn mà nhỉ :/ . Đúng là code kia vẫn đang chạy được nhưng bạn thử nghĩ xem mình đang code tất cả ở file `index.js` mà một trang web thì cần quản lý rất nhiều thứ nếu chúng ta vứt tất cả chúng vào 1 file thì việc quản lý rồi việc maintain sẽ rất khó khăn. Khi bạn chia nhỏ ra theo từng đối tượng để quản lý thì  khi đó việc công việc maintain hay phát triển thêm tính năng cho đối tượng sẽ dễ dàng hơn nhiều. Phải sửa một file lên đến mấy nghìn dòng OMG việc tìm sửa ở dòng nào đã mệt rồi :v. Thôi không lan man nữa chúng ta bắt đầu luôn nhé
# Router
Đầu tiên mình cần tạo một folder và đặt tên là `routes` để chứa các router mà mình định nghĩa, tiếp theo là mình tạo một file js có tên là `product.route.js` để chứa các router của product. Phần `.router` là để mình biết đó là file router thôi :D còn các bạn không thích thì chỉ cần để `.js` là được. Bên trong file `product.route.js` thì chúng ta vần require thằng `Express` vào và tạo một đối tượng `router` từ thằng `Express`.  Tiếp theo là chúng ta sẽ copy toàn bộ các router từ bên index.js sang và thay `app` bằng `router`. À quên các bạn nhớ phải `exports` file router ra nhé để lát nữa chúng ta còn `require` nó trong file `index.js`. Một lưu ý nữa là  ở cả file `index.js` và `product.route.js`  mình đều sử dụng đến phần kết nối với data base vì thế mình sẽ tách phần kết nối với databse ra một file riêng, file nào cần thì sẽ gọi nó vào. Mình đặt tên nó là `connect.js` với nội dụng như sau.
```js
var mysql = require('mysql');

var conn = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password : 'your_password',
    database: 'dbTest',
    charset : 'utf8_general_ci'
 });

 module.exports = conn;
```
Tiếp theo là file `product.route.js` 
```js
var express = require('express')
var router = express()
var conn = require('../connect')

router.get('', function(req, res){
    var sql='SELECT * FROM posts';
    conn.query(sql, function (err, data, fields) {
        res.render('index', {
            posts: data
        });
    });
})

router.get('/search', function(req, res){
    var id = parseInt(req.query.id);
    var sql=`SELECT * FROM posts where id = '${id}'`;
    conn.query(sql, function (err, data, fields) {
        res.render('index', {
            posts: data
        });
    });
})

router.get('/create', function(req, res){
    res.render('create', {
    });
})

router.post('/create', function (req, res) {
    var params =req.body.title;
    var sql = `insert into posts(title) values('${params}');`;
    conn.query(sql, function (err, result) {
        if (err)    console.log(err);
        console.log("1 record inserted");
      });
    res.redirect('/');
})

router.get('/detail', function (req, res) {
    var id = parseInt(req.query.id);
    var sql=`SELECT * FROM posts where id = '${id}'`;
    conn.query(sql, function (err, data, fields) {
        res.render('detail', {
            posts: data
        });
    });
})

router.get('/edit', function (req, res) {
    var id = parseInt(req.query.id);
    var sql=`SELECT * FROM posts where id = '${id}'`;
    conn.query(sql, function (err, data, fields) {
        res.render('update', {
            posts: data
        });
    });
})

router.post('/edit', function (req, res) {
    var params =req.body;
    var sql = `update posts set title = '${params.title}' where id = ${params.id};`;
    conn.query(sql, function (err, result) {
        if (err)    console.log(err);
        console.log("1 record update");
      });
    res.redirect('/');
})

router.get('/delete', function (req, res) {
    var id = parseInt(req.query.id);
    var sql=`Delete FROM posts where id = ${id}`;
    conn.query(sql, function (err, data, fields) {
    });
    res.redirect('/');
})

module.exports = router;

```
Tiếp theo là bên file `index.js` thì mình tạo ra 1 đối tượng `productRoute` require cái thằng `product.route.js` vào
```js
var productRoute = require('./routes/product.route');
```
và gọi đến nó thôi 
```js
 app.use('', productRoute);
```
File `index.js` của mình sẽ như thế này
```js
const express = require('express');
const app = express();
const port = 3000;

var productRoute = require('./routes/product.route');
var conn = require('./connect')

app.set('view engine', 'pug');
app.set('views', './views');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
 
 conn.connect(function (err){
    if(err)
    {
        throw err.stack;
    }
    else
    console.log("connect success");
 })

 app.use('', productRoute);

app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
})
```
Nhìn gọn hơn lúc trước đúng không :v
# Controller
Ở trên mình đã tách ra file router rồi, nhưng trên thực tế thì file router  người ta chỉ dùng để định nghĩa ra các router còn logic xử lý thì người ta lại tách ra một file riêng gọi là `Controller` tương tự mô hình MVC. Vì thế mình sẽ thực hiện tách phần logic ở bên router ra một file mới, phần logic ở đây chính là các function đó :D. Tương tự phần Router mình cũng taọ một folder `controller` và một file `product.controller.js`. Bây giờ mình cần làm ở file `product.controller.js` là exports các function ra và bên router cần thì sẽ gọi đến.

Ví dụ bên router có 1 router như sau 
```js
router.get('', function(req, res){
    var sql='SELECT * FROM posts';
    conn.query(sql, function (err, data, fields) {
        res.render('index', {
            posts: data
        });
    });
})
```
Thì bên controller mình sẽ exports ra 1 hàm đặt tên là `index` như sau:
```js
module.exports.index = function(req, res){
    var sql='SELECT * FROM posts';
    conn.query(sql, function (err, data, fields) {
        res.render('index', {
            posts: data
        });
    });
}
```
khi đó bên file `router` chỉ cần `require` thằng controller vào 
```js
var controller = require('../controller/product.controller');
```
và router  gọi đến thằng controller.index là được
```
router.get('', controller.index);
```
Làm tương tự cho các router và controller khác. thì mình có file `controller` như sau 
```js
var conn = require('../connect')

module.exports.index = function(req, res){
    var sql='SELECT * FROM posts';
    conn.query(sql, function (err, data, fields) {
        res.render('index', {
            posts: data
        });
    });
}

module.exports.search = function(req, res){
    var id = parseInt(req.query.id);
    var sql=`SELECT * FROM posts where id = '${id}'`;
    conn.query(sql, function (err, data, fields) {
        res.render('index', {
            posts: data
        });
    });
}

module.exports.getCreate = function(req, res){
    res.render('create', {
    });
}

module.exports.postCreate = function (req, res) {
    var params =req.body.title;
    var sql = `insert into posts(title) values('${params}');`;
    conn.query(sql, function (err, result) {
        if (err)    console.log(err);
        console.log("1 record inserted");
      });
    res.redirect('/');
}

module.exports.detail = function (req, res) {
    var id = parseInt(req.query.id);
    var sql=`SELECT * FROM posts where id = '${id}'`;
    conn.query(sql, function (err, data, fields) {
        res.render('detail', {
            posts: data
        });
    });
}

module.exports.getEdit = function (req, res) {
    var id = parseInt(req.query.id);
    var sql=`SELECT * FROM posts where id = '${id}'`;
    conn.query(sql, function (err, data, fields) {
        res.render('update', {
            posts: data
        });
    });
}

module.exports.postEdit = function (req, res) {
    var params =req.body;
    var sql = `update posts set title = '${params.title}' where id = ${params.id};`;
    conn.query(sql, function (err, result) {
        if (err)    console.log(err);
        console.log("1 record update");
      });
    res.redirect('/');
}

module.exports.delete = function (req, res) {
    var id = parseInt(req.query.id);
    var sql=`Delete FROM posts where id = ${id}`;
    conn.query(sql, function (err, data, fields) {
    });
    res.redirect('/');
}
```
À vì có sử dụng đến phần kết nối databse nên các bạn nhớ  require thằng `conn` mà mình đã tạo ở trên vào nhé.
File router như sau 
```js
var express = require('express')
var router = express()
var controller = require('../controller/product.controller');

router.get('', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.getCreate);
router.post('/create', controller.postCreate);
router.get('/detail', controller.detail);
router.get('/edit', controller.getEdit);
router.post('/edit', controller.postEdit);
router.get('/delete', controller.delete);

module.exports = router;
```
# Kết luận
Vậy là mình đã giới thiệu đến các bạn về Router và Controller trong Express để giúp code của chúng ta phần nào rõ ràng và dễ bảo trì hơn. Bài viết còn phần nào thiếu sót rất mong các bạn comment xuống bên dưới để mình được bổ sung, nếu thấy bài viết hữu ích thì hãy cho mình một upvote nhé 😃 , Ấn follow để có thể theo dõi được những bài viết mới nhất của mình nhé. Cảm ơn các bạn đã đón đọc.