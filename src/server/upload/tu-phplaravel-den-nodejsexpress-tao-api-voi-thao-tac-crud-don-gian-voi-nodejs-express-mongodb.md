Chào các bạn, ở [bài trước](https://viblo.asia/p/tu-phplaravel-chuyen-sang-nodeexpress-63vKjVB6K2R) chúng ta đã tìm hiểu về Node.js, giống và khác PHP như thế nào, ở phần này chúng ta sẽ tiếp tục tìm hiểu về Express, mongoDB và tạo một API đơn giản với thao tác CRUD sau đó so sánh với Laravel của PHP xem giống và khác nhau ra sao nhé :laughing: 
# Bắt đầu
Trong bài sử dụng các modules:
1. Express (Node.js framework)
2. Mongoose (MongoDB ODM)
# Express Framework
## Express là gì?
Express là một framework đơn giản, linh hoạt, được xây dựng trên nền tảng Node.js, cũng tương tự như Laravel, express bao gồm các chức năng về điều hướng (router) và middleware nhưng về mặt cấu trúc và chức năng đơn giản hơn Laravel rất nhiều (không có sẵn các chức năng như authentication, authorization, validate,...)
## Cài đặt và bắt đầu project
Tương tự như PHP, chúng ta tạo mới project bằng ```composer```, ta dùng
```
mkdir demo_express
npm install express --save
touch app.js
```

Nội dung file ```app.js``` bao gồm:

```javascript
const port = 1234;
const express = require('express');
const app = express();
//================================
app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});

```

Chạy ```node app.js``` để bắt đầu Hello World các bạn nhé :stuck_out_tongue_winking_eye:
Có thể thấy:

*  ```require('express')``` để import module express vừa kéo về bằng npm
*  ```app = express()``` khởi tạo express web server
*  ```app.listen(port, () => console.log(`Example app listening on port ${port}!`))``` lắng nghe sự kiện tại cổng ```1234``` khi có request vào web server
*  ```app.get('/', (req, res) => res.send('Hello World!'))``` Rất quen thuộc rồi phải không các bạn :D. Router này lắng nghe request bằng phương thức GET vào đường dẫn '/' và trả về xâu "Hello World!"

Một express web app đơn giản chỉ như vậy, express chỉ giống như chiếc khung, khi cần sử dụng đến chức năng nào thì bạn cần require thêm module đó vào chứ không điện nước đầy đủ như Laravel được :stuck_out_tongue_winking_eye:

# Mongoose ODM
## MongoDB
Trước hết chúng ta cần tìm hiểu về MongoDB, để hiểu rõ hơn về MongoDB, các bạn có thể tham khảo tại [đây](https://viblo.asia/p/tim-hieu-ve-mongodb-4P856ajGlY3)
Vậy MongoDB là một hệ quản trị cơ sở dữ liệu thuộc họ NoSQL (Cơ sở dữ liệu không quan hệ), giữa SQL và NoSQL có những khái niệm tương đương

| SQL | NoSQL |
| -------- | -------- | 
| Table | Collection | 
| Row | Document |
| Column | Field |
| Joins	 | Embeded documents, linking |
| Primary key | Primary key |
## ODM và ORM
Với các cơ sở dữ liệu quan hệ và các framework, chúng ta thường nghe đến khái niệm ORM (Object Relation Mapping), ORM là một cơ chế ánh xạ các bản ghi của các hệ quản trị CSDL quan hệ thành các đối tượng trong các ngôn ngữ lập trình hướng đối tượng như Java, C#, PHP. Ở Laravel Framework, chúng ta được tiếp cận với Eloquent :heart_eyes:
Tương tự với khái niệm ORM ở SQL, với NoSQL chúng ta có khái niệm ODM.
## Mongoose
Mongoose là một module trong Node.js hỗ trợ chúng ta thao tác với mongoDB thông qua ODM

Cài đặt: 
```npm install mongoose --save```
Sau đó kết nối với mongoDB:
```javascript 
const port = 1234;
const express = require('express');
const product = require('./routes/product'); // Imports routes for the products
const app = express();
app.use(express.urlencoded());
//===============================
const MONGO_URL = "mongodb://127.0.0.1:27017/mongo_crud";

const mongoose = require('mongoose');
mongoose.connect(MONGO_URL);
mongoose.Promise = global.Promise;
let dB = mongoose.connection;

dB.on('error', console.error.bind(console, 'Connect to mongo failed'));
//===============================

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});
```
# Xây dựng API
## Cấu trúc thư mục
![](https://images.viblo.asia/e131e28d-5bad-4d02-84a6-b922b5f164a1.png)
## Xây dựng Model
Chúng ta xây dựng Model Product với cấu trúc bên dưới
```javascript 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100,
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Product', ProductSchema);
```
Tạo một collection với cấu trúc gồm 2 field:
1. name: require, max: 100, kiểu String
2. price: require, kiểu Number
## Xây dựng Controller
Xây dựng controller với các thao tác CRUD thông qua model Product
```javascript 
const Product = require('../models/Product');

//save a product
exports.store = (request, response) => {
    let product = new Product({
        name: request.body.name,
        price: request.body.price,
    });
    product.save((error) => {
        if (error) {
            response.send(error.toString());
        }
        response.send('Product created');
    })
};

//get all
exports.index = (request, response) => {
    Product.find({}, (error, products) => {
        if (error) {
            response.send(error.toString());
        }

        response.send(products);
    });
};

exports.show = (request, response) => {
    Product.findById(request.params.id, (error, product) => {
        if (error) {
            throw error;
        }
        response.send(product);
    });
};

exports.update = (request, response) => {
    Product.findByIdAndUpdate(request.params.id, {$set: request.body }, (error, product) => {
        if (error) {
            response.send(error.toString());
        }
        response.send(product);
    });
};

exports.delete = (request, response) => {
    Product.findOneAndDelete(request.params.id, (error) => {
        if (error) {
            response.send(error.toString());
        }
        response.send('Product deleted');
    })
};
```
## Xây dựng router
Xây dựng router với các thao tác CRUD (Create, Read, Update, Delete)
```javascript
const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.post('/', ProductController.store); //thêm mới một sản phẩm
router.get('/', ProductController.index); //xem toàn bộ sản phẩm
router.get('/:id', ProductController.show); //Xem chi tiết một sản phẩm
router.put('/:id', ProductController.update); //Cập nhật một sản phẩm
router.delete('/:id', ProductController.delete); //Xóa một sản phẩm

module.exports = router;
```
Sau khi xây dựng hoàn tất các thành phần chúng ta kích hoạt router tại app.js thông qua middleware
```app.use('/products', product);```, file app.js hoàn chỉnh lúc này

```javascript
const port = 1234;
const express = require('express');
const product = require('./routes/product'); // Imports routes for the products
const app = express();
app.use(express.urlencoded());
//===============================
const MONGO_URL = "mongodb://127.0.0.1:27017/mongo_crud";

const mongoose = require('mongoose');
mongoose.connect(MONGO_URL);
mongoose.Promise = global.Promise;
let dB = mongoose.connection;

dB.on('error', console.error.bind(console, 'Connect to mongo failed'));
//===============================
app.use('/products', product);

//================================
app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});
```

# Demo
Để chạy thử API các bạn sử dụng Postman để check thử nhé
## Thêm sản phẩm
![](https://images.viblo.asia/833500e8-efd0-4029-b086-59f88a4ca2f7.png)
## Xem toàn bộ sản phẩm
![](https://images.viblo.asia/415bf15f-f028-44e8-99ca-18d21957bd20.png)
## Xem chi tiết
![](https://images.viblo.asia/1aa14ebc-2d37-4854-955a-722a94a5d0aa.png)