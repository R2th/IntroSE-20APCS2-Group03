# Giới thiệu về passport.js
***Passport.js*** là một trong những module phổ biến của ***Nodejs***, và cũng là *middleware*  hết sức linh hoạt và có khả năng tùy biến cao. ***Passport.js*** được sử dụng với nhiều kịch bản xác thực như **Facebook, Google+, Twitter** hay thậm chí là sử dụng kiểu xác thực thông qua local ***username - password*** trong database. Trong bài viết chúng ta sẽ tìm hiểu ví dụ đơn giản về đăng ký và đăng nhập
thông qua local ***username - password***
# Cấu trúc thư mục
![](https://images.viblo.asia/4c884117-47aa-4690-b4d7-97f350085799.png)
# Thiết lập passport cho ứng dụng
Để sử dụng passport ta cần thực hiện 3 bước
## 1.Cài đặt `express-session, passport` và sử dụng middleware của passport là `passport.initialize()` and `passport.session() `.
**app.js**
```
var express = require('express')
var path    = require('path')
var http = require('http')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var app = express();

/* Khai báo các router cần dùng */
var userRouter = require('./router/userRouter')

/* Kết nối tới cơ sở dữ liệu */
mongoose.connect('mongodb://localhost:27017/framgia_tuts')
mongoose.connection.on('error', function(err) {
     console.log('Lỗi kết nối đến CSDL: ' + err);
 });

/* Khai báo để sử dụng kịch bản passport */
require('./configs/passport');

/* Cài đặt template ejs */
app.engine('ejs', require('ejs-locals'));
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, 'views'));

/* Cấu hình passport */
app.use(session({
    secret : 'secured_key',
    resave : false,
    saveUninitialized : false
}))
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
app.use(passport.initialize());
app.use(passport.session());

/* Cài đặt router */
app.get('/',function(req,res){
    res.render('homepage')
})
app.use('/nguoi-dung',userRouter)

/* Kết nối tới host */
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
```
> Hàm flash() sẽ khởi tạo module connect-flash, module này chỉ đơn giản là một module hỗ trợ hiển thị các câu thông báo. Trong bài viết này chưa sử dụng để hiển thị mà chỉ nhận thông báo.
## 2. Cấu hình passport và cài đặt 2 hàm `serializeUser`, `deserializeUser`
> passport.deserializeUser : hàm được gọi bởi passport.session .Giúp ta lấy dữ liệu user dựa vào thông tin lưu trên session và gắn vào req.user.
-----
> passport.serializeUser: hàm được gọi khi xác thực thành công để lưu thông tin user vào session.

-----
**passport.js**
```
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

   //Passport register
passport.use('local.register', new LocalStrategy({
    usernameField : 'email',
    passswordField : 'password',
    passReqToCallback : true
},function(req, email, password, done){
    User.findOne({
      'local.email' : email       
  }, function(err, user){
      if(err){
          return done(err)
      }
      if(user){
        console.log('email đã tồn tại')
          return done(null, false, {
              message : 'Email đã được sử dụng, vui lòng chọn email khác'    
          })
      }

      var newUser = new User();
      newUser.info.firstname = req.body.firstname;
      newUser.info.lastname = req.body.lastname;
      newUser.local.email = email;
      newUser.local.password = password;

      newUser.save(function(err, result) {
          if (err) {
              return done(err);
          } else {                    
            return done(null, newUser);            
          }
      });
  })
}));
```
> local.register là tên biến tuỳ ý các bạn đặt
-----
> Đây là ví dụ đơn giản nên chưa thiết lập mã hoá, để sử dụng mã hoá trong node ta dùng hàm *`hashSync`* của *`bcrypt-nodejs`*


## 3. Thiết lập router để nhận kịch bản của passport
**userRouter.js**
```
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.route('/dang-ky')
    .get(function(req, res) {   
        res.render('register');
    })
    .post(passport.authenticate('local.register', { 
        successRedirect: '/',
        failureRedirect: '/nguoi-dung/dang-ky',
        failureFlash: true }))

module.exports = router;
```
# Tạo kịch bản đăng nhập
**passport.js**
```
/* Passport login */
passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({
        'local.email': email
    }, function(err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, {
                message: 'Tài khoản này không tồn tại, vui lòng kiểm tra lại.'
            });
        }
        
        return done(null, user);
    });
}));
```
**userRouter.js**
```
router.route('/dang-nhap')
    .get(function(req, res) {   
        res.render('login');
    })
    .post(passport.authenticate('local.login', { 
        successRedirect: '/',
        failureRedirect: '/nguoi-dung/dang-nhap',
        failureFlash: true }))
```
**register.ejs**
```
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Framgia_tuts</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
  <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
</head>
<body>
    <div class="container">
	<div class="row centered-form">
            <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
		<div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Register</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" action="/nguoi-dung/dang-ky" method="post">
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" name="firstname" id="firstname" class="form-control input-sm" placeholder="First Name">
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" name="lastname" id="lastname" class="form-control input-sm" placeholder="Last Name">
                                    </div>
                                </div>
                            </div>
	
                            <div class="form-group">
                                <input type="email" name="email" id="email" class="form-control input-sm" placeholder="Email Address">
                            </div>
	
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6">
                                    <div class="form-group">
                                        <input type="password" name="password" id="password" class="form-control input-sm" placeholder="Password">
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6">
                                    <div class="form-group">
                                        <input type="password" name="password_confirmation" id="password_confirmation" class="form-control input-sm" placeholder="Confirm Password">
                                    </div>
                                </div>
                            </div>
								
                            <input type="submit" value="Register" class="btn btn-info btn-block">			    		
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```
**login.ejs**
```
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Framgia_tuts</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
  <h2>login form</h2>
  <form action="/nguoi-dung/dang-nhap" method="POST">
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" class="form-control" id="password" placeholder="Enter password" name="password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
</body>
</html>
```
**user.js**
```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    info: {
        firstname: String,
        lastname: String,
    },
    local: {
        email: {
            type: String
        },
        password: {
            type: String
        }
    }
});

module.exports = mongoose.model('User', userSchema);
```
Trong bài viết này chúng ta đã tạo một ví dụ cơ bản về xác thực thông qua passport.js
-----
Các bước xác thực trong passport các bạn có thể tham khảo:

-----
https://viblo.asia/p/tim-hieu-ve-passportjs-cac-buoc-xac-thuc-tai-khoan-GrLZDVQJ5k0

-----
Tham khảo:

-----
http://www.passportjs.org/docs/downloads/html/
https://phocode.com/blog/2016/10/18/nodejs-xac-thuc-nguoi-dung-voi-passportjs/