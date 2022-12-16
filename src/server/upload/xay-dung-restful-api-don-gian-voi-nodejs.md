Xin chào mọi người, hôm nay mình muốn demo cho những bạn chưa từng làm việc với ngôn ngữ Nodejs hoặc đơn giản là muốn tạo một RESTful API với NodeJS :)
## REST là gì?
Đầu tiên thì các bạn cần hiểu rõ khái niệm về REST và RESTful là gì phải không?

REST là từ viết tắt của Representational State Transfer. Đó là kiến trúc tiêu chuẩn web và Giao thức HTTP.

Hiểu đơn giản thì các ứng dụng RESTful sử dụng các yêu cầu HTTP để thực hiện bốn hoạt động được gọi là CRUD (C: Create, R: Read, U: Update, và D: Delete). 

Để hiểu rõ hơn về khái niệm RESTful các bạn có thể tham khảo bài viết này nhé: [Tìm hiểu về RESTful web services](https://za.gl/8VbNb)

Trong hướng dẫn này, chúng ta sẽ tìm hiểu cách tạo một RESTful API bằng cách sử dụng Node.js.

Công cụ:
* Node.js v7
* MySQL
* Trình soạn thảo văn bản hoặc IDE
* Postman

## Bắt đầu
** Giả định**: Máy bạn đã cài đặt NodeJS và MySQL

* Đầu tiên bạn vào project tạo một tệp package.json - `npm init`

package.json là một tệp cung cấp thông tin cần thiết cho npm, cho phép nó xác định dự án cũng như xử lý các phụ thuộc của dự án. 
`npm init` sẽ nhắc bạn nhập một số thông tin như tên ứng dụng, mô tả, phiên bản, tác giả, từ khóa,.... 
Khi tạo xong các bạn sẽ có 1 file package.json với nội dung như thế này: 
```
{
  "name": "nodejs_api",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

2. Tạo file server.js ở thư mục root. 
Trong file này, mình sẽ viết các giao thức để tạo một app mới.

3. Tạo một thư mục có tên là api
Bên trong thư mục này, mình tạo ra folder controllers để chứa các file controller, file routes.js để quản lý các link API và file db.js để kết nối database.

4. Tạo ProductsController.js trong thư mục api/controllers

Cuối cùng thì project sẽ có cấu trúc như thế này:

![](https://images.viblo.asia/9b3ee120-6b8a-4806-9adc-88b14f492d47.jpg)

## Cài đặt server
1. Ở đây mình dùng 4 package rất hay dùng đó là:
* `express` sẽ được sử dụng để tạo máy chủ
* `nodemon` sẽ giúp mình theo dõi các thay đổi đối với ứng dụng của mình bằng cách xem các tệp đã thay đổi và tự động khởi động lại máy chủ.
* `dotenv` để mình thêm các config cho database(host, port, user, pass, ...) và các config khác
* `mysql` để thao tác với database
```
npm install --save-dev nodemon
```
```
npm install express --save
```
```
npm install dotenv --save
```
```
npm install mysql --save
```

Khi cài đặt thành công, tệp package.json của bạn sẽ được sửa đổi để có 4 gói mới được cài đặt.

Mở file package.json và thêm script này vào mục scripts:  `"start": "nodemon server.js"`

Như vậy file package.json đã được thay đổi thành:
```
{
  "name": "nodejs_api",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "nodemon server.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^1.17.5"
  },
  "dependencies": {
    "express": "^4.16.3",
    "dotenv": "^5.0.1",
    "mysql": "^2.15.0"
  }
}
```

2. Mở tệp server.js và nhập / sao chép mã bên dưới vào tệp
```
let express = require('express');
let app = express();
let port = process.env.PORT || 3000;

app.listen(port);

console.log('RESTful API server started on: ' + port);
```

3. Trên terminal của bạn, tiếp tục chạy `npm run start` để bắt đầu máy chủ và sau đó bạn sẽ thấy
```
RESTful API server started on: 3000
```

## Tạo database
```
CREATE DATABASE nodejs_api;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

INSERT INTO `products` VALUES ('1', 'Iphone X', 'Black', '30000000');
INSERT INTO `products` VALUES ('2', 'Samsung S9', 'White', '24000000');
INSERT INTO `products` VALUES ('3', 'Oppo F5', 'Red', '7000000');
```
Và đây là bảng sau khi chạy sql:

![](https://images.viblo.asia/89561fff-1bb9-40c8-aabe-d0496e1a0b75.jpg)


## Tạo file kết nối Database
Trước tiên mình cần đưa các config cho database ra file .env
Đây là file `.env` với nội dung:
```
DB_HOST="localhost"
DB_USER="root"
DB_PASS=""
DB_NAME="nodejs_api
```
** Lưu ý: ** Các bạn có thể tạo file .env.example để đưa lên git và đưa file .env vào .gitignore

Tiếp đến mình sẽ tạo file db.js:
```
'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "nodejs_api"
});

module.exports = db
```
Như vậy là xong phần config db, khi sử dụng bạn chỉ cần require file db.js vào là có 1 đối tượng db để truy vấn db rồi. 
## Tạo routes
Dưới đây mình đã tạo hai router cơ bản (`/products`, và `/products/productId`) với các phương thức 
* `/products` có phương thức (`GET` và `POST`)
* `/products/productId` có 3 phương thức `GET` , `PUT` và `DELETE`. 
Như bạn có thể thấy, mình đã tạo 2 router và các phương thức để gọi các hàm xử lý tương ứng.

Và đây là nội dung file routes.js:
```
'use strict';
module.exports = function(app) {
  let productsCtrl = require('./controllers/ProductsController');

  // todoList Routes
  app.route('/products')
    .get(productsCtrl.get)
    .post(productsCtrl.store);

  app.route('/products/:productId')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);
};
```
Tiếp đến mình sẽ tạo file controller và các function tương ứng cho từng routes

## Tạo file controller
Trong file ProductsController.js, mình sẽ tạo 5 function có tên: get, detai, update, store, delete và export 5 hàm này để sử dụng trong routes.js.

```
'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM products'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE products SET ? WHERE id = ?'
        db.query(sql, [data, productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO products SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}
```
Ở đây mình dùng package mysql, để tìm hiểu cách sử dụng chi tiết của package này bạn có thể truy cập vào: [](https://www.w3schools.com/nodejs/nodejs_mysql.asp)
## Sắp xếp lại nội dung file server.js
Bên trên, mình đã có một đoạn code ngắn chỉ với mục đích tạo 1 server, sau khi tạo routes, controllers hoàn chỉnh mình sẽ sửa lại file server.js để có thể chạy được app hoàn chỉnh:

Dưới đây là file server.js:
```
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').load()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let routes = require('./api/routes') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('RESTful API server started on: ' + port)
```

Mình đã cập nhật thêm
* `body-parser` để trích xuất toàn bộ phần nội dung của request đến và hiển thị nó trên đó `req.body`.
* load dotenv để sử dụng environment variables
* import file routes để load tất cả routes đã được khai báo trong file
* thêm middleware để check nếu request API không tồn tại
Dễ hiểu phải không nào?? :D

Kế tiếp để chạy lại server các bạn chạy lệnh: 
```
npm run start
```
Và console sẽ hiển thị:
```
RESTful API server started on: 3000
```

## Thực hiện test API trên Postman
* Get all (method GET): `localhost:3000/products`
```
[
    {
        "id": 1,
        "name": "Iphone X",
        "color": "Black",
        "price": 30000000
    },
    {
        "id": 2,
        "name": "Samsung S9",
        "color": "White",
        "price": 24000000
    },
    {
        "id": 3,
        "name": "Oppo F5",
        "color": "Red",
        "price": 7000000
    }
]
```
* Get with id (method GET): `localhost:3000/products/1`
```
{
    "id": 1,
    "name": "Iphone X",
    "color": "Black",
    "price": 30000000
}
```
* Create (method POST):`localhost:3000/products`
```
{
    "message": "Insert success!"
}
```
* Update (method PUT): `localhost:3000/products/4`
```
{
    "message": "Update success!"
}
```
![](https://images.viblo.asia/55dab1cb-6178-46a3-9d50-ebaa31a9aac6.jpg)
* Delete (method DELETE): `localhost:3000/products/4`
```
{
    "message": "Delete success!"
}
```

OK, như vậy mình đã hướng dẫn xong cách xây dựng 1 RESTful API đơn giản với ngôn ngữ NodeJS, bài viết dựa trên kinh nghiệm của bản thân, nếu có gì sai sót mong các bạn comment để mình sửa nhé :)) 

Các bạn có thể tham khảo repo github của mình ở đây nhé: [https://github.com/tienphat/api_nodejs_example](https://github.com/tienphat/api_nodejs_example)

Nếu các bạn yêu thích bài viết và nội dung mình chia sẻ, bạn có thể tặng mình 1 cốc coffe nha ^^.   [Tặng liền!](https://www.buymeacoffee.com/tienphat) Cảm ơn bạn rất nhiều!

Thanks for reading!