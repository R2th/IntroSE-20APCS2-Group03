# Mở đầu
   Thực ra là không có mở đầu gì đâu mà hay làm ngay bước tiếp theo ! 🤣🤣🤣
# Tạo cơ sở dữ liệu
Chúng ta sẽ tạo bảng Băng đĩa với các trường sau ( id băng đĩa, tên băng đĩa, thể loại, nhà sản xuất, nội dung, giá ). 
```sql
drop database if exists my_db;
create database my_db default character set utf8 collate utf8_unicode_ci;
use my_db;
-- tạo bảng băng đĩa
create table if not exists bangdia
(
    id int primary key auto_increment,
    tenBangDia varchar(55),
    theLoai varchar(55), 
    nhaSX varchar(55),
    noiDung varchar(255),
    gia float
);
-- thêm dữ liệu vào bảng
insert into bangdia(tenBangDia,theLoai,nhaSX,noiDung,gia) values 
('Doremon1','Hoạt hình','Nhật bổn','Không rõ','12.101'),
('Doremon2','Hoạt hình','Nhật bổn','Không rõ','12.202'),
('Doremon3','Hoạt hình','Nhật bổn','Không rõ','12.303');
```
Sau khi chạy đoạn mã trên(ở đây mình dùng **MySQL**) ta được kết quả sau:

![image.png](https://images.viblo.asia/ca0a2b1a-5b00-42cd-af7a-33fc8f6d1900.png)

# Xây dựng server
Đầu tiên mình sẽ tạo 1 folder **demo** sau đó mở **cmd** dùng lệnh **npm init** để khởi tạo project. Sau đó ta sẽ có 1 file **package.json** với nội dụng như bên dưới.
```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "demo Restful api with Nodejs",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "phamkim",
  "license": "ISC"
}
```
Tiếp theo:

1. Tạo file **index.js** ở thư mục gốc
2. Tạo thư mục **app**. Bên trong chứa các thư mục con sau **common**, **controllers**, **modals**, **routers**.

    ![image.png](https://images.viblo.asia/84ee9a3d-bb2d-416c-9b20-7e37fbe84459.png)
4. Cài các package cần thiết như **express**, **nodemon**, **mysql**, **dotenv**.
```js
npm install express --save
npm install --save-dev nodemon
npm install mysql --save
npm install dotenv --save
npm install body-parser --save
```
Cập nhật file **package.json**.
```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.0.0",
    "express": "^4.17.3",
    "mysql": "^2.18.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
```
Trong file **index.js** ta copy/paste đoạn mã sau.
```js
let express = require('express');
let app = express();
let port = process.env.PORT || 3000;

app.listen(port);

console.log('RESTful API server started on: ' + port);
```
Sau đó chạy lệnh **npm run dev** trong  **terminal** và được kết quả như sau.

![image.png](https://images.viblo.asia/a9678610-8223-4b47-81d4-37612611ec64.png)

# Kết nối cơ sở dữ liệu
Đầu tiên chúng ta tạo file **.env** trong thư mục gốc.
```js
HOST="localhost"
USER="root"
PASSWORD=""
DATABASE="my_db"
```
Tiếp theo, trong thư mục **common** tạo file **connect.js**
```js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
module.exports = db;
```
Chúng ta đã tạo được module kết nối csdl.

# Tạo model
Trong thư mục **models** tạo file **bangDia.model.js**
```js
const db = require("../common/connect");

const BangDia = (bangDia) => {
  //this.id = bangDia.id;
  //this.tenBangDia = bangDia.tenBangDia;
  //this.theLoai = bangDia.theLoai;
  //this.nhaSX = bangDia.nhaSX;
  //this.noiDung = bangDia.noiDung;
  //this.gia = bangDia.gia;
};

BangDia.getById = (id, callback) => {
  const sqlString = "SELECT * FROM bangDia WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

BangDia.getAll = (callback) => {
  const sqlString = "SELECT * FROM bangDia ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

BangDia.insert = (bangDia, callBack) => {
  const sqlString = "INSERT INTO bangDia SET ?";
  db.query(sqlString, bangDia, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...bangDia });
  });
};

BangDia.update = (bangDia, id, callBack) => {
  const sqlString = "UPDATE bangDia SET ? WHERE id = ?";
  db.query(sqlString, [bangDia, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật băng đĩa id = " + id + " thành công");
  });
};

BangDia.delete = (id, callBack) => {
  db.query(`DELETE FROM bangDia WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa băng đĩa id = " + id + " thành công");
  });
};

module.exports = BangDia;
```
# Tạo controller
Trong thư mục **controllers** tạo file **bangDia.controller.js**
```js
const BangDia = require("../models/bangDia.model");

module.exports = {
  getAll: (req, res) => {
    BangDia.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    BangDia.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const bangDia = req.body;
    BangDia.insert(bangDia, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const bangDia = req.body;
    const id = req.params.id;
    BangDia.update(bangDia,id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    BangDia.delete(id, (result) => {
      res.send(result);
    });
  },
};


```
# Tạo router
Trong thư mục **routers** tạo file **bangDia.router.js**
```js
module.exports = function (router) {
  const bangDiaController = require("../controllers/bangDia.controller");
  router.get("/bangDia", bangDiaController.getAll);
  router.post("/bangDia", bangDiaController.insert);
  router.get("/bangDia/:id", bangDiaController.getById);
  router.delete("/bangDia/:id", bangDiaController.delete);
  router.put("/bangDia/:id", bangDiaController.update);
};
```
# Cập nhật sever
Cập nhật file **index.js**
```js
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./app/routers/bangDia.router")(app);

app.listen(port);

console.log("RESTful API server started on: " + port);
```
File **.env** của mình như sau
```js
HOST="localhost"
USER="root"
PASSWORD=""
DATABASE="my_db"
PORT=3000
```

# Hãy cùng xem kết quả nào
* Lấy danh sách băng đĩa
    ![image.png](https://images.viblo.asia/890dcb55-5333-48c7-bf79-bc4861e8e00b.png)
* cập nhật băng đĩa. Cập nhật tên của băng đĩa có id = 2
    ![image.png](https://images.viblo.asia/60809841-d1f7-44d1-a694-dc37a64d78ad.png)
* Lấy băng đĩa theo id = 2
    ![image.png](https://images.viblo.asia/4738a493-b6ef-4ee8-9e9f-389b38527827.png)
* xóa băng đĩa có id = 1
    ![image.png](https://images.viblo.asia/3e154d5a-b056-4708-a401-8ca563739cfa.png)
* thêm băng đĩa mới
![image.png](https://images.viblo.asia/6a0aef61-2d7d-4a74-9207-0cf07d7098fc.png)

Vậy là chúng ta đã tạo được 1 ứng dụng api nho nhỏ. 
Cảm ơn các bạn đã xem bài viết🥰🥰