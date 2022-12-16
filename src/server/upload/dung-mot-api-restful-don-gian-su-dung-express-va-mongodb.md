Hì, trước giờ toàn xem ké, học free hoài nên hôm nay cũng viết một bài rồi chia sẽ với mọi người để mọi người ném đá mà rút kinh nghiệm... :v:  hì bài này mình viết ở [https://mrsoi.com](https://mrsoi.com) rồi chuyển qua nên có thể có một số từ hay một số câu cú không hợp với viblo của mình thì mọi người góp ý nha.. 

[Dựng một API RESTful đơn giản sử dụng Express và MongoDB](https://mrsoi.com/dung-mot-api-restful-don-gian-su-dung-express-va-mongodb.html) là bài đầu tiên của blog này của mình... Hì, build ra cái blog rồi để gần tuần mới viết bài đầu tiên thì chắc Khoản là người đầu tiên.. Hì, thật ra thì đang tìm ý tưởng viết thôi... :V :V Mà thôi, bỏ qua vấn đề đó mình sẽ vào vấn đề chính là dựng một API RESTful về quản lý người dùng sử dụng Node nha.. :)))

### 1. Tạo ứng dụng và cài Dependencies cần thiết:
Kiểm tra nodejs và npm version:

```bash
npm -v
#6.0.1
node -v
#v10.1.0
```
#### 1.1 Khởi tạo ứng dụng:

Tạo thư mục và di chuyển vào thư mục.

```bash
mkdir user-api
cd user-api
```
Khởi tạo project nodejs:
```bash
npm init -y
```
![Bước 1: Tạo ứng dụng và cài Dependencies cần thiết](https://mrsoi.com/images/2018/05/restapi-user-1.png)

#### 1.2 Cài dependence cần thiết:

Đầu tiên tất nhiên là express để khởi tạo server rồi phải không nào, để tìm hiểu thêm về express các bạn có thể lên trang document chính chủ của nó để tìm hiểu, mình chỉ trình bày sơ qua một số thứ để có thể xây dựng được API thôi.

```bash
npm install express --save
```

Tiếp theo là cài mongoose, và mongoose-auto-increment, một cái giúp kết nối với cơ sở dữ liệu và cái còn lại thì giúp tạo khóa tự động tăng..

```bash
npm install mongoose mongoose-auto-increment --save
```

Cuối cùng là body-parser thần thánh để xử lý request cũng như response dạng json cho express:
```bash
npm install body-parser --save
```

### 2. Khởi tạo server và kết nối với database.

#### 2.1 Khởi tạo server:

Tạo một file server.js trong thư mục project. và require mấy cái dependence vừa ném cài vào, sau đó mở cổng kết nối server bằng express. Code thì kiểu như thế này:
```  javascript
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/', (req, res) => {
    res.send(`Listening on ${ PORT }`);
})
```

Sau đó chạy server bằng node server.js và lên trình duyệt mở được như thế này là thành công:


![Bước 3: Khởi tạo server.](https://mrsoi.com/images/2018/05/restapi-user-2.png)

#### 2.2 Kết nối server với mLab /utils/db.js:

Thử tạo một thư mục có tên là utils và tạo một file có tên là db.js nha. ( Đây là cá nhân mình thích tách chức năng nhỏ ra các file nhỏ thôi. )

Nội dung file kết nối database db.js sẽ có nội dung tương tự như thế này:
``` javascript
var mongoose = require('mongoose');

const mlabURI = 'mongodb://huynhduckhoan:huynhduckhoan@ds129560.mlab.com:29560/user-api'
const dbName = 'user-api';

const con = mongoose.connect(mlabURI, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("Connected successfully to server")
	}
});

module.exports = con;
```

Thêm một đoạn để nhận kết quả kết nối cơ sở dữ liệu vào server.js

```javascript
const db = require('./utils/db');
```

Chạy lại project thì thấy giống như hình là oke.. :)))

![Bước 4: Kết nối với mlab (mongodb hosting)](https://mrsoi.com/images/2018/05/restapi-user-3.png)

Xong mấy bước căn bản rồi đấy, vui lên đi nào.. :V :V

### 3. Tạo model user:  /models/user.js

Một model schema thì của mongoose thì có nội dung tương tự như thế này:

``` javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../utils/db');
const autoIncrement = require('mongoose-auto-increment');

var userSchema = new Schema({
    userID: {
        type: Number, 
        required: true, 
        unique: true},
    email: {
        type: String, 
        required: true, 
        unique: true},
    password: { 
        type: String, 
        required: true },
    role:  { 
        type: String, 
        required: true,
        default: 'user'},
	dateAdded : { type: Date, default: Date.now },
})

const User = mongoose.model('User', userSchema);
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userID' });

module.exports = {
    User
};
```

đọc code cũng khá là dễ hiểu nên mình không nói gì cho dài thêm bài viết, nếu có thì có đoạn tự động tăng cho userID là đáng nói :

```javascript
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userID' });
```

Ở đây, autoIncrement sẽ phải kết nối với mongodb để nếu như userID trong request của client không có thì sẽ tự động chọn một số để tăng lên.

Còn đoạn này sẽ lấy thời gian bây giờ ( Tức lúc thêm )  làm ngày thêm cho user.

```javascript
dateAdded : { type: Date, default: Date.now }
```

### 4. Khởi tạo express router:
 
Về cơ bản thì router của user nó sẽ có như thế này:

| Route         | HTTP Verb | Description                       |
|---------------|-----------|-----------------------------------|
| /user         | GET       | Nhận tất cả thông tin user        |
| /user         | POST      | thêm một user                     |
| /user/:userID | GET       | Lấy thông tin của user có userID  |
| /user/:userID | PUT       | Cập nhật thông tin user có userID |
| /user/:userID | DELETE    | Xóa user có userID                |

Theo thứ tự mình sẽ lần lượt trình bày đống code có chức năng theo thứ tự nha:
``` javascript
app.get('/user', (req, res) => {
  User.find().then((user) => {
    res.send({user});
  }, (e) => {
    res.status(400).send(e);
  });
});
```

Tạm hiểu đoạn 'GET /user' : Khi có request tới /user thì sẽ tìm các documents  thuộc collection là users mà chính xác hơn phải nói là thuộc userSchema và in ra nếu tìm được, còn nếu không thực hiện được thì sẽ trả về lỗi 400 và gửi ra lỗi. :))) Vì code mongoose khá là dễ hiểu nên mình hướng dẫn cụ thế mà chỉ hướng dẫn đơn giản một lần như như thế. Bạn nào cần có thế lên trang chủ document của mongoose mà tìm hiểu thêm.. :)))
``` javascript
app.post('/user', (req, res) => {
    var user = new User({
        userID: req.body.userID,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    // result = User.addUser(user);
    user.save().then((user) => {
      res.send(user);
    }, (e) => {
      res.status(400).send(e);
    });
});
``` 
``` javascript
app.get('/user/:userID', (req, res) => {
  var userID = req.params.userID;

  User.findOne({userID:userID}).then((user) => {
    res.send(user);
  }, (e) => {
    res.status(400).send(e);
  });
});
``` 
``` javascript
app.put('/user/:userID', (req, res) => {
  var query = { userID: req.params.userID };

  User.findOneAndUpdate(query, {
    role: req.body.role,
    password: req.body.password
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send('Invalid user supplied');
    }
    res.send(raw);
  });
});
``` 
```javascript
app.delete('/user/:userID', (req, res) => {
  var query = { userID: req.params.userID };
  User.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid username supplied');
      }
    res.send(raw);
  });
});
``` 
### 5. Kiểm tra lại API bằng postman:
  
![Kiểm tra lại API bằng postman](https://mrsoi.com/images/2018/05/restapi-user-6.png)

![Kiểm tra lại API bằng postman](https://mrsoi.com/images/2018/05/restapi-user-5.png)

![Kiểm tra lại API bằng postman](https://mrsoi.com/images/2018/05/restapi-user-4.png)

Oke... Mọi thứ đều hoạt động tốt.. :)))

Oke, Các bạn có thể xem code tại github của mình là huynhduckhoan/user-api.

Nguồn: https://mrsoi.com/dung-mot-api-restful-don-gian-su-dung-express-va-mongodb.html