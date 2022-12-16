Sau đây mình xin giới thiệu với các bạn một project nhỏ CRUD sử dụng MEAN Stack.

Mình xin giới thiệu qua về MEAN Stack.

* [Mongo DB](https://www.mongodb.com/) - một database dạng open-source có dạng NoSQL
* [Express JS](https://expressjs.com/) - một framework app web cơ bản sử dụng với NodeJS. Nó giúp xây dựng RESTful APIs và các web app.
* [ Angular 7 ](https://cli.angular.io/)-  một framework khá mạnh mẽ để tạo ra một trang web Single Page Application) Tuy nhiên Angular 7 chỉ là một framework làm việc ở phía client
* [Node JS](https://nodejs.org/en/) - một nền tảng cho việc viết ứng dụng Javascript phía server, không giống như Javascript chúng ta thường viết trên trình duyệt. Với ngôn ngữ Javascript và nền tảng nhập xuất bất đồng bộ, nó là một nền tảng mạnh mẽ để phát triển các ứng dụng thời gian thực.


Ngoài ra tôi sẽ sử dụng [Visual Code](https://code.visualstudio.com/download).

Trong phần 1, mình sẽ tạo dựng phần Backend trước.

> ### Nội dung
> 1. Xây dựng NodeJS Backend
> 2. Kết nối MongoDB
> 3. Tạo model với Mongoose JS
> 4. Tạo RESTful APIs sử dụng ExpressJS Routes

### 1. Xây dựng NodeJS Backend
Đầu tiên chúng ta hãy tạo một folder chứa toàn bộ code backend và frontend nhé. Mở folder bằng VS Code.

Chúng ta sẽ tạo folder `backend` và di chuyển vào thư mục này:
```
mkdir backend
cd backend
```
Tiếp theo chúng ta sẽ tạo project sử dụng câu lệnh sau:
```
npm init -y
```
Cần cài thêm một vài package để hỗ trợ:
```
npm install --save body-parser cors express mongoose
```
* body-parser - Các bạn có thể tham khảo [tại đây](https://viblo.asia/p/day-du-lieu-da-nhap-len-html-su-dung-body-parser-gAm5yG1VZdb).
* CORS - Các bạn có thể tham khảo [tại đây](https://viblo.asia/p/cors-jvElaBNd5kw)

Cần có một file đầu vào của backend, chúng ta đặt cho nó là `server.js`
```
touch server.js
```
Nội dung của file như sau:
```
let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db');

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// Setting up port with express js
const employeeRoute = require('../backend/routes/employee.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/api', employeeRoute)

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
```
### 2. Kết nối MongoDB
Tiếp theo chúng ta sẽ tạo database sử dụng package mongoose. Đầu tiên là tạo folder database:
```
mkdir database
```
Sau đó tạo file `db.js` :
```
touch database/db.js
```
Nội dung trong `db.js` :
```
module.exports = {
  db: 'mongodb://localhost:27017/meandb'
};
```
**Lưu ý:** meandb là tên của database. Chúng ta có thể kiểm tra bằng cách:
> 1. Vào terminal gõ `mongo` để mở màn hình mongo shell
> 2. gõ `show dbs` sẽ thấy một db tên là `meandatabase`

Đoạn code sau để tạo connection tới database (đã có trong file server.js):
```
let mongoose = require('mongoose');

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)
```
### 3. Tạo model với Mongoose JS
Tiếp theo chúng ta sẽ tạo folder `models` bên trong folder `backend`:
```
mkdir models
```
Sau đó tạo file `Empoyee.js`:
```
touch models/Employee.js
```
Nội dung trong `Empoyee.js`:
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Employee = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'employees'
})

module.exports = mongoose.model('Employee', Employee)
```
### 4. Tạo RESTful APIs sử dụng ExpressJS Routes
Việc cuối cùng chúng ta cần làm là tạo routes để truy cập vào Employee thông qua RESTful APIs.

Tạo folder `routes`:
```
mkdir routes
```
Tạo file `employee.route.js`:
```
touch routes/employee.route.js
```
Nội dung file: 
```
const express = require('express');
const app = express();
const employeeRoute = express.Router();

// Employee model
let Employee = require('../models/Employee');

// Add Employee
employeeRoute.route('/create').post((req, res, next) => {
  Employee.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Employees
employeeRoute.route('/').get((req, res) => {
  Employee.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
employeeRoute.route('/read/:id').get((req, res) => {
  Employee.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update employee
employeeRoute.route('/update/:id').put((req, res, next) => {
  Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete employee
employeeRoute.route('/delete/:id').delete((req, res, next) => {
  Employee.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = employeeRoute;
```
OK. Chúng ta vừa tạo xong phần backend cho PET project CRUD này. Chúng ta sẽ kiểm tra các API đã ổn chưa nhé.

1. Bật server của mongodb: `sudo service mongod start`
2. Bật server của backend (các bạn lưu ý cần cd vào thư mục `backend` nhé): `node server.js`
3. Mở một terminal mới và gõ: `curl -i -H "Accept: application/json" localhost:4000/api`

Nếu nội dung ra như sau thì các bạn đã thành công.
![](https://images.viblo.asia/a6af45bc-79e5-4767-b1a9-9c7bfd2048af.png)

Trong phần 1, mình đã giới thiệu cho các bạn cách tạo backend sử dụng NodeJS, ExpressJS, Mongodb. Trong phần 2, mình sẽ tiếp tục với việc tạo frontend sử dụng framework Angular 7.

Rất mong nhận được sự góp ý của các bạn.

[Phần 2: PET project use MEAN Stack [Part2_Frontend]](https://viblo.asia/p/pet-project-use-mean-stack-part2-frontend-Ljy5Vp6yZra)