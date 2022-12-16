Trong bài viết này, mình sẽ giới thiệu cho các bạn một ứng dụng demo nhỏ sử dụng các công nghệ NodeJS (ExpressJS), EJS, MongoDB<br>
### Cùng tìm hiểu về các khái niệm:
- NodeJS: Nodejs là một nền tảng (Platform) phát triển độc lập được xây dựng ở trên Javascript Runtime của Chrome mà chúng ta có thể xây dựng được các ứng dụng mạng một cách nhanh chóng và dễ dàng mở rộng.<br>
  - Nodejs tạo ra được các ứng dụng có tốc độ xử lý nhanh, realtime thời gian thực.<br>
  - Nodejs áp dụng cho các sản phẩm có lượng truy cập lớn, cần mở rộng nhanh, cần đổi mới công nghệ, hoặc tạo ra các dự án Startup nhanh nhất có thể.<br>
- ExpressJS: Express js là một Framework nhỏ, nhưng linh hoạt được xây dựng trên nền tảng của Nodejs. Nó cung cấp các tính năng mạnh mẽ để phát triển web hoặc mobile<br>
- EJS: Embedded JavaScript templating - Là một ngôn ngữ tạo mẫu đơn giản giúp bạn đánh dấu trang HTML bằng Javascript trong đó. Nó giúp chúng ta có thể quản lý view một cách dễ dàng và nhanh nhất.<br>
- MongoDB: MongoDB là một trong những cơ sở dữ liệu mã nguồn mở NoSQL phổ biến nhất được biết bằng C++, MongoDB là cơ sở dữ liệu hướng tài liệu, nó lưu trữ dữ liệu trong các document dạng JSON với schema động rất linh hoạt. Nghĩa là bạn có thể lưu các bản ghi mà không cần lo lắng về cấu trúc dữ liệu như là số trường, kiểu của trường lưu trữ.<br>
### 
Để chuẩn bị, chúng ta cần cài đặt NodeJS và Mongodb. Tham khảo cách cài đặt [NodeJS](https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/) và [Mongodb](https://hevodata.com/blog/install-mongodb-on-ubuntu/) trên Ubuntu.<br>
**Cấu trúc folder source code:**
```
.
├── db/
|   ├── model/
|   |   └── product.js
|   └── database.js
├── routes/
|   └── controller.js
├── views/
|   ├── add-product.ejs
|   ├── home.ejs
|   └── update-product.ejs
├── app.js
└── package.json
```
Đầu tiên, chúng ta tiến hành khởi tạo dự án:<br>
Tạo folder của dự án: nodejs-demo
Bên trong màn hình terminal chúng ta tiến hành khởi tạo ứng dụng NodeJS:
`npm init`<br>
Tiếp theo chúng ta tiến hành install các node module cần dùng cho ứng dụng:<br>
`npm install body-parser ejs express jquery mongoose nodemon`<br>
**Giải thích:**
- bodyParser: trả về một function hoạt động như một middleware. Chức năng lắng nghe trên req.on (\'data\') và xây dựng req.body từ các đoạn dữ liệu mà nó nhận được => giúp bạn có thể lấy được data form từ req.body
- ejs: cài đặt thư viện ejs
- express: cài đặt thư viện expressjs
- jquery: cài đặt jquery
- mongoose: Mongoose là một thư viện mô hình hóa đối tượng (Object Data Model - ODM) cho MongoDB và Node.js
- nodemon: Giúp chúng ta không phải ngắt server và run lại mỗi khi thay đổi code.
### Các file và giải thích:
**package.json**
```
{
  "name": "nodejs-demo",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "ejs": "^2.6.2",
    "express": "^4.17.1",
    "jquery": "^3.4.1",
    "mongoose": "^5.6.0",
    "nodemon": "^1.19.1",
    "request": "^2.88.0"
  }
}
```
package.json là file đặc biệt, bạn có thể hiểu nó là 1 document giúp bạn biết được trong cái đống code này cần có những gói nào (Nói thêm nodejs xây dựng dựa trên nhiều module gọi là package, quản lý thông quan npm).  Package.json là file cấu hình của npm, giúp cho npm hiểu nó cần phải cài đặt cái gì, thông tin về ứng dụng, phiên bản, ...<br>
Sau khi install các node module như ở trên chúng ta tiến hành sửa lại trong file package.json: 
```
  "main": "app.js",
  "scripts": {
    "start": "nodemon app.js"
  }
```
Mục đích là mỗi lần chúng ta run app bằng lệnh `npm start` thì  app sẽ tự động run file app.js bằng command `nodemon app.js`<br>
**app.js**
```
var express = require('express');
var bodyParser = require('body-parser');

var Database = require('./db/database');
var routes = require('./routes/controller');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './views');

// Website routes
app.use('/', routes);

app.listen(3000, function () {
    console.log("Starting at port 3000...");
});
```
File app.js là main file, ứng dụng sẽ start bằng file này.<br>
`app.set('view engine', 'ejs')`: set view engine sử dụng ejs file.<br>
`app.set('views', './views')`: Cấu hình thư mục view.<br>
`app.use('/', routes)`: Sử dụng router được define trong `var routes = require('./routes/controller')`<br>
Khi run file, app sẽ listen trên port 3000.<br>

**db/database.js**
```
let mongoose = require('mongoose');

const mongodb_url = 'mongodb://localhost:27017/test'

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(mongodb_url, {useNewUrlParser: true})
            .then(() => {
                console.log("Database connection successfully!");
            })
            .catch(err => {
                console.log("Database connection error!");
            })
    }
}

module.exports = new Database();
```
database.js: Đây là file cấu hình kết nối database của mongoose. Bằng việc export ra module này, trên ứng dụng có start `var Database = require('./db/database');` thì mongoose sẽ tự nhận kết nối theo file config.<br>
Ở đây, chúng ta đang cấu hình kết nối tới database: Host: `localhost`, port: `27017` và database name là `test`.<br>
**db/models/product.js**
```
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'No Name'
    },
    type: {
        type: String,
        default: 'No Type'
    }
});

module.exports = mongoose.model('product', productSchema, 'product');
```
product.js: file cấu hình model của mongodb. Ở đây chúng ta có model là `product` có 2 thuộc tính chính là `name` và `type`. <br>
Từ đây, khi có kết nối từ file cấu hình `database.js` chúng ta có thể dễ dàng sử dụng mongoose bằng cách dùng model này để tương tác với DB<br>
**routes/controller.js**
```
var express = require('express');
var router = express.Router();
var Product = require('./../db/models/product');

/**
 * Home page: loading all product
 */
router.get('/', (req, res) => {
    Product.find({})
        .then(products => {
            res.render('home', { products: products })
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});

/**
 * Go to Add Product page
 */
router.get('/add-product', (req, res) => {
    res.render('add-product');
});

/**
 * Add new Product
 */
router.post('/', (req, res) => {
    let newProduct = new Product({
        name: req.body.productName,
        type: req.body.productType
    });

    newProduct.save()
        .then(doc => {
            res.redirect('/')
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});

/**
 * Go to Update Product page
 */
router.get('/update-product/:productId', (req, res) => {
    Product.findById(req.params.productId, (err, product) => {
        if (err) {
            console.log(err);
            throw err
        }
        res.render('update-product', { product: product });
    })
});

/**
 * Delete product
 */
router.delete('/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndDelete(productId, (err, doc) => {
        if (err) throw err;
        res.send(doc)
    })
});

/**
 * Update product
 */
router.post('/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndUpdate(
        { _id: productId },
        { $set: { name: req.body.productName, type: req.body.productType } },
        { useFindAndModify: false })
        .then(doc => {
            res.redirect('/')
        })
});

module.exports = router;
```
controller.js: được sử dụng trong file app.js để cấu hình các router của ứng dụng.<br>
Chúng ta export ra các API CRUD và các controller điều hướng web tại đây<br>
Dễ dàng thao tác với DB dựa trên model `Product = require('./../db/models/product')`<br>
Hơn nữa việc cấu hình view-engine và thư mục của ejs views giúp chúng ta dễ điều hướng web bằng cách sử dụng `res.render('add-product');` <br>
**views/home.ejs**
```
<html>

<head>
    <title>Home page</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
</head>

<body>
    <div class="container">
        <h2>Product Manager</h2>
        <a href="/add-product" class="btn btn-success float-right">Add Product</a>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Product id</th>
                    <th>Product name</th>
                    <th>Product type</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <% products.forEach((entry) => { %>
            <tr ondblclick="handleUpdateProduct('<%= entry.id %>')">
                <td><%= entry.id %></td>
                <td><%= entry.name %></td>
                <td><%= entry.type %></td>
                <td>
                    <input class="btn btn-primary" type="button" value="Update"
                        onclick="handleUpdateProduct('<%= entry.id %>')">
                </td>
            </tr>
            <% }) %>
        </table>
        <script>
            function handleUpdateProduct(value) {
                $(location).attr('href', '/update-product/' + value);
            }
        </script>
    </div>
</body>

</html>
```
home.ejs: Trang chủ của ứng dụng. Sử dụng các cú pháp của ejs `<%= entry.id %>` cho việc hiển thị thông tin.<br>
Sử dụng JQuery để gọi các API khi nhận được action trên web.<br>
**views/add-product.ejs**
```
<head>
    <title>Title</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>

<body>
<div class="container">
    <a href="/"><h3>Home page</h3></a>
    <h2>ADD PRODUCT</h2>
    <form action="/" method="POST">
        <div class="form-group">
            <label>Product name</label>
            <input class="form-control" type="text" name='productName'>
        </div>
        <div class="form-group">
            <label>Product type</label>
            <input class="form-control" type="text" name='productType'>
        </div>
        <input id="add-btn" class="btn btn-primary" type="submit" value="ADD PRODUCT">
    </form>
</div>
</body>
```
add-product.ejs: Form add product<br>
**views/update-product.ejs**
```
<head>
    <title>Title</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
</head>

<body>
    <div class="container">
        <a href="/">
            <h3>Home page</h3>
        </a>
        <h2>UPDATE PRODUCT</h2>
        <form action="/<%= product._id %>" method="POST">
            <div class="form-group">
                <label>Product ID</label>
                <input class="form-control" type="text" name='productId' value="<%= product._id %>" disabled>
            </div>
            <div class="form-group">
                <label>Product name</label>
                <input class="form-control" type="text" name='productName' value="<%= product.name %>">
            </div>
            <div class="form-group">
                <label>Product type</label>
                <input class="form-control" type="text" name='productType' value="<%= product.type %>">
            </div>
            <input id="update-btn" class="btn btn-primary" type="submit" value="SAVE">
            <input id="update-btn" class="btn btn-secondary" type="button" value="DELETE"
                onclick="handleDeleteProduct('<%= product._id %>')">
        </form>
    </div>
    <script>
        function handleDeleteProduct(value) {
            $.ajax({
                url: '/' + value,
                type: 'DELETE',
                success: function (result) {
                    $(location).attr('href', '/');
                }
            })
        }
    </script>
</body>
```
update-product.ejs: form update product: ở đây chúng ta có thể thực hiện update và delete product.<br>
Sau khi đã xong, chúng ta tiến hành run app bằng cách gõ `npm start` (hoặc `nodemon app.js`)
```
> nodemon app.js

[nodemon] 1.19.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node app.js`
Starting at port 3000...
Database connection successfully!
```
Sau khi start app thành công các bạn truy cập vào http://localhost:3000<br>
**Demo app:**
![](https://images.viblo.asia/83500432-440f-49ef-9c3c-4d025c2185b2.gif)
### Kết luận
Như vậy, chúng ta đã hoàn thành xong một ứng dụng demo nhỏ đơn giản để hiểu được thêm về NodeJS, mongoDB, EJS. Bài viết này có mục đích giúp tiếp cận dễ hơn với các công nghệ trên và tìm hiểu phần nào cách hoạt động của chúng. Hy vọng bài viết sẽ giúp ích cho các bạn trong việc tìm hiểu, học các công nghệ và phần nào giúp ích cho công việc của các bạn.