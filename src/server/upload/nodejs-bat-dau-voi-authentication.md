Xác thực là một phần quan trọng trong ứng dụng web hiện nay, bài viết này tôi sẽ chia sẻ với các bạn một cách cơ bản nhất về việc sử dụng nó trong ứng dụng web NodeJS

### Authentication?
Xác thực, đúng như cái tên của nó, dùng để xác định người dùng và quyền truy cập vào các nội dung mà họ được phép. Hiện nay cách phổ biến nhất để xác thực là 1 form login với thông tin đăng nhập để xác minh người dùng
![](https://images.viblo.asia/6e6fbbc7-81e2-4d51-8896-7c7fae2b6490.png)
![](https://images.viblo.asia/fc940a6c-154e-4fcc-b9a7-c6269c675078.png)

Để đi tiếp thì chúng ta sẽ phải nắm được
- Xác thực
- Uỷ quyền
- Session
- Cookie

Phần khung của bài chia sẻ này sẽ tập trung đi vào
1. User registration (setting up routes và database)
2. Sessions và Cookies
3. Custom middleware
Và sử dụng NodeJS, Express(JS Framework), MongoDB(Database)
+ các package kèm theo (body-parser, express, [nodemon](https://github.com/remy/nodemon), [mongoose](http://mongoosejs.com/docs/), [bcrypt](https://www.npmjs.com/package/bcrypt), [express-session](https://www.npmjs.com/package/express-session), [connect-mongo](https://www.npmjs.com/package/connect-mongo))
### User registration
#### Connect to MongoDB
- Install [Mongoose](http://mongoosejs.com/docs/)
- Install MongoDB
- Setup [mongod](https://docs.mongodb.com/manual/reference/program/mongod/)
- Chạy mongod trên localhost
#### Tạo schema
MongoDB là 1 cơ sở dữ liệu mà ở đó JSON được lưu trữ như các đối tượng. Model/Schema mô tả những gì mà đối tượng sẽ được lưu.
- Tạo 1 schema theo [docs](https://mongoosejs.com/docs/guide.html)
- Schema nên mô tả các trường và chỉ định kiểu dữ liệu cho từng trường

Ví dụ
```NodeJS
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConfirmation: {
    type: String,
    required: true
  }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
```
#### Insert data to MongoDB
- Thêm [body-parser](https://github.com/expressjs/body-parser) để phân tích cú pháp trong body của request trong middleware
- Sử dụng POST method để gửi data tới server
- Lưu trữ giá trị đã điền trong form và lưu trong database với schema

```NodeJS
if (req.body.email &&
  req.body.username &&
  req.body.password &&
  req.body.passwordConfirmation) {
  const = userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  }
  // Dùng schema.create để insert data vào db
  User.create(userData, function (err, user) {
    if (err) {
      return next(err)
    } else {
      return res.redirect('/profile');
    }
  });
}
```
Sử dụng [mongoShell](https://docs.mongodb.com/manual/reference/mongo-shell/) để xem nếu data đã được lưu trong database (`db.users.find()`)

#### Hashing và salting
Hàm băm mã hoá là lấy một chuỗi thông tin và trả về 1 chuỗi biểu diễn thông tin này, các giá trị băm khó mà được giải mã hoặc "unhashed", điều đó giải thích vì sao chúng hay sử dụng để lưu mật khẩu

Salt là dữ liệu ngẫu nhiên là đầu vào cho hàm băm
Ở đây sử dụng [bcrypt](https://www.npmjs.com/package/bcrypt)

Trước hết phải cài đặt bcrypt
Sau đó
```

// Generates hash using bCrypt
  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }
```
Rồi lưu giá trị sau khi hash của password vào database

### Sessions and Cookies
HTTP là giao thức không có trạng thái, nghĩa là server không theo dõi ai đang truy cập trang web. Và để hiển thị nội dung cụ thể cho người dùng đã đăng nhập, do đó các sessionID được tạo. Cookies là cặp key/values được quản lý bởi trình duyệt, tương ứng với các phiên
#### Setup sessions
- Add [express-session package](https://www.npmjs.com/package/express-session)
- Add session middleware

```
//sử dụng session để kiểm tra login
app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: false
}));
```
Lưu trữ userId MongoDB (__id) trong req.session.userId

Xác thực user khi login
```
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}
```

Logout
```
// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
```

#### Một cách khác để lưu trữ session
Hiện tại session được lưu trên RAM, nếu muốn có dung lượng lưu trữ lớn hơn, có thể sử dụng MongoDB
- Add [connect-mongo](https://www.npmjs.com/package/connect-mongo)
- Sau đó gần tương tự như cách tạo session bên trên
```
app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
```
Khi kiểm tra với `mongoShell` ta sẽ thấy `sessions` collection được tạo
### Custom Middleware
Middleware chạy ngay sau khi nhận được request. Ở ví dụ trên body-parser package có thể được sử dụng là middleware. Nó chuyển các request thành một định dạng dễ sử dụng đối với một JS program
Các function middleware có thể được ghép nối với nhau để phù hợp với request/response. Khi viết 1 custom middleware, `next()` luôn phải được gọi ở cuối để chuyển tới chu trình tiếp theo.
Ví dụ: Tạo middleware yêu cầu đăng nhập cho một số page nhất định
```
// middleware
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

router.get('/profile', middleware.requiresLogin, function(req, res, next) {
  //...
});
```
Rất linh hoạt khi routing đúng không nào!

Cuối cùng cảm ơn bạn đã theo dõi bài viết. Hãy vote and comment để thể hiện cảm xúc của bạn về bài viết này nhé!. See you again! :D

Refs:
> https://github.com/expressjs
> 
> https://www.mongodb.com/
> 
> https://www.npmjs.com/package/bcrypt
> 
> https://mongoosejs.com/
> 
> https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359