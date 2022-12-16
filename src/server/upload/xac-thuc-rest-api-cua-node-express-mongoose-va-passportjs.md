![](https://images.viblo.asia/0e5efd06-6281-4503-8dc0-bd96f574ae31.png)

Trong bài viết này mình sẽ giới thiệu cho các bạn về cách bảo mật REST API Node , Express, MongoDB và Mongoose  bằng cách sử dụng Passport.js Authentication.

Cho đến tận bây giờ, Passport.js vẫn là một phần mềm trung gian xác thực mạnh mẽ, linh hoạt và là module cho môi trường Node.js. Vì vậy, trong bài viết này bạn sẽ thấy rất nhiều sự ảnh hưởng của Passport.js. Cơ chế xác thực để tạo mã thông báo web JSON (JWT), tất cả được xử lý bởi Passport.js. Công việc Express chỉ xử lý định tuyến API, phần mềm trung gian để truy cập cơ sở dữ liệu MongoDB được xử lý bởi Mongoose.js.

Luồng xác thực của nó rất đơn giản, một người dùng trái phép truy cập tài nguyên an toàn sẽ trả về 403. Sau đó, người dùng đăng nhập bằng tên người dùng và mật khẩu. Phản hồi thành công sẽ trả về mã JWT (được tạo bởi mô-đun Passport.js - JWT) sẽ đặt trong header Ủy quyền trong mọi yêu cầu đối với tài nguyên an toàn. Đăng nhập thất bại sẽ trả về 401. Để giải thích rõ ràng hơn, bạn có thể tham khảo sơ đồ trình tự này.

![](https://images.viblo.asia/84a7c899-e5f0-410b-bf77-de4d546dc211.png)

Bên trên chỉ là một mô hình đơn giản của việc xác thực sử dụng Node, Express, Mongoose, MongoDB, and Passport.js
Bây giờ chúng ta bắt đầu đi vào chi tiết phần xác thực này, trước tiên hãy kiểm tra xem bạn đã cài đặt Node.js phiên bản mới nhất chưa bằng cách mở terminal lên và gõ lệnh:
```
node -v
npm -v
```
### **1. Cài đặt Express.js và Tạo Ứng dụng Express mới**

Đầu tiên, bạn phải cài đặt Express.js để phát triển ứng dụng đơn giản và nhanh hơn. Mở terminal (OS X hoặc Linux) hoặc dòng lệnh Node.js (Windows) sau đó nhập lệnh này:
```
npm install express-generator -g
```
Bây giờ, tạo một ứng dụng khởi động Express.js mới bằng cách nhập lệnh này trong thư mục dự án Node của bạn.
```
express node-rest-auth
```
Lệnh đó cho phép express tạo một ứng dụng Node.js mới với tên `"node-rest-auth"`. Chuyển đến thư mục dự án vừa tạo.
```
cd node-rest-auth
```
Gõ lệnh này để cài đặt các phụ thuộc Node mặc định.
```
npm install
```

Bây giờ hãy kiểm tra máy chủ Express của bạn bằng cách gõ lệnh này.
```
npm start
or
nodemon
```
Bạn sẽ thấy trang này nếu ứng dụng Express được tạo đúng.
![](https://images.viblo.asia/bd19199b-5428-4c90-9e83-dd7f97359a0c.png)

Lần này bạn phải cài đặt tất cả các thư viện và phụ thuộc cần thiết. Nhập lệnh này để cài đặt thư viện và các phụ thuộc ( mongoose, bcrypt, jsonwebtoken, morgan, passport, passport-jwt ).
```
npm install mongoose bcrypt-nodejs jsonwebtoken morgan passport passport-jwt --save
```

### 2. Cấu hình ứng dụng Node.js và Passport.js****
Tạo các tệp riêng cho cấu hình. Cho rằng, tạo thư mục mới trên thư mục gốc.\
```
mkdir config
```
Tạo một tệp cấu hình cho Cơ sở dữ liệu và Passport.js.
```
touch config/database.js
touch config/passport.js
```
Mở và chỉnh sửa `"config / database.js"` sau đó thêm các dòng code này.
```js
module.exports = {
  'secret':'nodeauthsecret',
  'database': 'mongodb://localhost/node-auth'
};
```
Cấu hình này chứa tham số kết nối cơ sở dữ liệu và bí mật để tạo mã thông báo JWT.

Mở và chỉnh sửa `"config / Passport.js"` sau đó thêm các dòng code này.
```js
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/user');
var config = require('../config/database'); // get db config file

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
```
Cấu hình này được sử dụng để nhận người dùng bằng cách khớp mã thông báo JWT với mã thông báo nhận từ máy khách. Cấu hình này cần tạo mô hình Người dùng sau.

Bây giờ, hãy mở và chỉnh sửa` "app.js"` từ thư mục gốc của dự án. Khai báo thư viện cần thiết để khởi tạo với máy chủ bằng cách thêm các dòng yêu cầu này.
```js
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
```
Tạo kết nối đến MongoDB.
```js
mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
```
Khai báo một biến cho route API.
```js
var api = require('./routes/api');
```
Để làm cho máy chủ này CORS-ENABLE, bạn cần cài đặt module CORS bằng cách gõ lệnh này.
```
npm install cors --save
```
Thêm dòng này để kích hoạt CORS trong ứng dụng Node, Express.js.
```js
app.use(cors());
```
Khởi tạo passport bằng cách thêm dòng này.
```js
app.use(passport.initialize());
```
Thay thế landing page và route mặc định bằng các dòng này.
```js
app.get('/', function(req, res) {
  res.send('Page under construction.');
});

app.use('/api', api);
```
### **3. Tạo mô hình Express**
Bạn cần tạo một mô hình Người dùng để xác thực và dữ liệu được ủy quyền. Tạo thư mục mô hình đầu tiên trên thư mục gốc của dự án.
```
mkdir models
```
Tạo các tệp Javascript này cho các mô hình.
```
touch models/book.js
touch models/user.js
```
Mở và chỉnh sửa `"models/book.js"` sau đó thêm các dòng code này.
```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  isbn: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Book', BookSchema);
```
Mở và chỉnh sửa "models/ user.js" sau đó thêm các dòng code này thực hiện đăng nhập bảo mật hoặc lược đồ xác thực lưu mật khẩu dưới dạng giá trị được mã hóa bằng Bcrypt
```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  username: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
```
### **4. Tạo bộ định tuyến nhanh cho REST API**
Bây giờ, đã đến lúc tạo một Bộ định tuyến để xác thực người dùng và hạn chế tài nguyên. Trong các routes, tạo một  thư mục Javascript mới.
```
touch routes/api.js
```
Mở và chỉnh sửa `"routes/ api.js"` sau đó khai báo tất cả các biến yêu cầu.
```js
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var Book = require("../models/book");
```
Tạo một bộ định tuyến để đăng ký người dùng mới.
```js
router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});
```
Tạo một bộ định tuyến để đăng nhập.
```js
router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});
```
Tạo một bộ định tuyến để add new book chỉ có thể truy cập đối với người dùng được ủy quyền.
```js
router.post('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    var newBook = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher
    });

    newBook.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save book failed.'});
      }
      res.json({success: true, msg: 'Successful created new book.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
```
Tạo bộ định tuyến để nhận danh sách sách có thể truy cập đối với người dùng được ủy quyền.
```js
router.get('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Book.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
```
Tạo một hàm cho mã thông báo phân tích cú pháp từ các tiêu đề yêu cầu.
```js
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
```
Cuối cùng, xuất bộ định tuyến dưới dạng một mô-đun.
```js
module.exports = router;
```
### **5. Chạy và kiểm tra REST API bảo mật Node.js, Express.js, MongoDB**
Bây giờ, đã đến lúc chạy và kiểm tra API REST an toàn này. Gõ lệnh này để chạy máy chủ.
```
nodemon
```
Bạn sẽ thấy nhật ký này trong thiết bị đầu cuối nếu máy chủ chạy chính xác.
```
[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./bin/www`
```
Bạn có thể kiểm tra REST API an toàn của bạn bằng cách sử dụng Postman REST Client.. Bạn có thể cài đặt Postman cho tiện ích mở rộng Chrome.

Bây giờ, mở Postman sau đó nhập phương thức, địa chỉ (http://localhost:3000/api/signup) và các tham số để tạo hoặc đăng ký người dùng mới.

![](https://images.viblo.asia/8d60dc5e-8256-4ce6-8433-76615f7880e6.png)

Sau khi nhấp vào nút Gửi và tạo thành công người dùng mới, bạn sẽ thấy thông báo này.

![](https://images.viblo.asia/ca810a51-156d-40f2-a6db-594ecee607d6.png)

Tiếp theo, bạn phải kiểm tra xem REST API cho tài nguyên Sách có bị hạn chế chỉ cho người dùng được ủy quyền hay không. Thay đổi phương thức thành "GET" và điểm cuối API thành " http://localhost:3000/api/book " sau đó nhấp vào nút Gửi. Bạn sẽ thấy thông báo này trên kết quả Postman.
```
Unauthorized
```
Để truy cập tài nguyên sách, bạn phải đăng nhập bằng người dùng đã đăng ký trước đó. Thay đổi phương thức thành "POST" và điểm cuối thành " http://localhost:3000/api/signin " sau đó điền thông tin đăng nhập như bên dưới ảnh chụp màn hình.

![](https://images.viblo.asia/fa5ccd6a-b9e5-410c-a878-f3fa93970762.png)

Nếu đăng nhập thành công, bạn sẽ nhận được mã thông báo JWT như bên dưới.
```
{
  "success": true,
  "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwiX192IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJwYXNzd29yZCI6IiQyYSQxMCRCLjByc3lnTHEwMzE4Njk5RWNlTU9lMllqWlJQZ3ZwL1VhZk8yb25OUkwuZDVWR3hmUjlOZSIsInVzZXJuYW1lIjoidGVzdEBleGFtcGxlLmNvbSIsIl9pZCI6IjU4ZWI5MzljNGE4MGYzNGU4OGU2NGY2MiJ9LCJpYXQiOjE0OTE4MzQ0OTF9.O2ljjVJVYBt65b0bTWnjyU-IDwJ9gXfDbzqDO7lccWc"
}
```

Chỉ cần sao chép và dán giá trị mã thông báo để sử dụng trong các tiêu đề yêu cầu của tài nguyên sách bị hạn chế. Bây giờ, hay thêm đoạn mã đó vào:
![](https://images.viblo.asia/376ce122-b122-47d0-b25e-d76c7399c498.png)
Nếu bạn thấy mảng trống trong phản hồi, thì bạn được phép sử dụng tài nguyên sách. Bây giờ, bạn có thể làm điều tương tự để đăng cuốn sách mới.
Như vậy trong bài viết này mình đã hướng dẫn các bạn 1 cách đơn giản nhất để có thể chạy và khởi taọ xác thực REST API của Node, Express, Mongoose và Passport.js

### **Tài kiệu tham khảo:**
1. https://www.djamware.com/post/58eba06380aca72673af8500/node-express-mongoose-and-passportjs-rest-api-authentication
2. http://www.passportjs.org/