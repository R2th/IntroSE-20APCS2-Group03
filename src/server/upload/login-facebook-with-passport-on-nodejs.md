Chào mọi người, như mọi người đã biết, đăng nhập Facebook được sử dụng rộng rãi như một mô-đun xác thực trên các trang web. Thay vì phải điền các thông tin như email, password thì có phương pháp tốt hơn là sử dụng các thông tin người dùng đã được xác minh qua Facebook.

Trong bài viết này, chúng tôi sẽ tìm hiểu và triển khai Hệ thống đăng nhập Facebook bằng Nodejs và ExpressJS. 

Bài viết này dành cho những newbie hoặc bạn nào đang muốn làm login với Passport NodeJs nhé. Nào mình cùng bắt đầu nào!
## 1. Tạo app Facebook
Điều đầu tiên bạn cần là AppID  và AppSecret  từ Ứng dụng Facebook. Bạn hãy vào link sau:\
[https://developers.facebook.com](https://developers.facebook.com)

Tạo ứng dụng facebook, điền tên cho app hoặc bạn có thể để trống.

![Create app facebook](https://images.viblo.asia/18e2de90-96bc-4cbb-99d5-0dd7278e5a63.PNG)

Tiếp theo chọn nền tảng Website để tạo app của bạn.

![](https://images.viblo.asia/664c63c7-fa66-413b-ad5b-6ea0d8c61078.PNG)

Sau khi hoàn thành, nó sẽ chuyển hướng bạn đến trang quản lý ứng dụng.
Nếu bạn muốn tạo app để test trên môi trường localhost thì hãy thêm localhost: 3000 làm địa chỉ trang.
![](https://images.viblo.asia/99f5def4-a838-406d-aa6f-f70d6cf18ce0.PNG)

Okey như vậy đã xong phần tạo ứng dụng trên facebook. Tiếp theo mình sẽ hướng dẫn phần code trên NodeJs
## 2. Install project
Tạo folder dự án và 
1. Run npm

```
npm init
```

2. Install package
```
npm i express
```
```
npm i cookie-parse
```
```
npm i ejs
```
```
npm i passport
```
```
npm i passport-facebook
```

Sau khi chạy xong các bạn sẽ được 1 file package.json như này:

```
{
  "name": "passport_facebook",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cookie-parser": "^1.4.4",
    "ejs": "^2.6.2",
    "express": "^4.17.1",
    "express-session": "^1.16.2",
    "passport": "^0.4.0",
    "passport-facebook": "^3.0.0"
  }
}
```

## 3. Tạo file config
Trong source của bạn, tạo 1 file config.js  và cập nhật Facebook AppID và AppSecret. 

Bạn có thể lấy ở đây:
![AppID, AppSecret](https://images.viblo.asia/9f79269c-1257-45c5-9ccb-d7e95f6a635c.PNG)

```
//config.js
module.exports={
  "facebook_key"      :     "FB_APP_ID", //Điền App ID của bạn vào đây
  "facebook_secret"   :     "FB_API_SECRET", //Điền App Secret ở đây
  "callback_url"      :     "http://localhost:3000/auth/facebook/callback"
}
```

Những route cần tạo cho ứng dụng:
1. `/auth/facebook`	Xác thực người dùng với Facebook
2. `/auth/facebook/callback`	Lấy thông tin người dùng từ nếu đăng nhập thành công
3. `/logout`	Đăng xuất khỏi ứng dụng

## 4. Config passport:
Ở đây mình đang dùng package node `passport` để xác thực OAuth . Nó đòi hỏi cần config một số tham số như `clientID`, `clientSecret`, `callbackURL`:

```
//app.js
/*config is our configuration variable.*/
passport.use(new FacebookStrategy({
    clientID: config.facebook_key,
    clientSecret:config.facebook_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      if(config.use_database) {
         //Further code of Database.
      }
      return done(null, profile);
    });
  }
));
```

Tiếp mình sẽ tạo 1 file routes để chứa các routers có trong project
## 5. Config routes
Dưới đây là nội dung file routes.js cần tạo:
File này mình cần tạo route index, login, logout và các routes để auth facebook.
```
//routes.js
const express  = require('express')
const router   = express.Router();
const passport = require('passport')

module.exports = (function() {   

    router.get('/', function(req, res){
	  res.render('index', { user: req.user });
	});
    
    router.get('/login', function(req, res){
	  //Return to page login
	});
    
    router.get('/account', ensureAuthenticated, function(req, res){
	  res.render('account', { user: req.user });
	});

	router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

	router.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	  });

	router.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

    return router;    
})();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
```

Tiếp đến mình sẽ tạo 1 file app.js để run app
## 6. Tạo file app main
Dưới đây là nội dung file app.js:
```
//app.js
//Khai báo các package sẽ sử dụng
const express = require('express');
const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');
const app = express();

// Passport session setup. 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Sử dụng FacebookStrategy cùng Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(accessToken, refreshToken, profile, done);
      return done(null, profile);
    });
  }
));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // sử dụng view ejs
app.use(cookieParser()); //Parse cookie
app.use(bodyParser.urlencoded({ extended: false })); //Parse body để get data
app.use(session({ secret: 'keyboard cat', key: 'sid'}));  //Save user login
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(3000);
```

Trong file mình có sử dụng `serializeUser` và `deserializeUser`:

Khi có request Login sẽ gọi đến thằng passport.serializeUser mà ta đã định nghĩa trước đó. Hàm này truy cập vào đối tượng user mà ta trả về cho middleware passport.authenticate và xác định xem thành phần nào của đối tượng sẽ lưu vào trong session. Kết quả của hàm này là ta sẽ có đối tượng req.session.passport.user = các thông tin ta truyền vào trong serializeUser.Trong ví dụ bên trên thì nó là user. Đồng thời với trên passport cũng có gắn thông tin user vào req.user.

Khi request được tính là đã xác thực nó sẽ gọi hàm passport.deserializeUser. Hàm này sử dụng thông tin trong session để lấy dữ liệu đầy đủ thông tin của user rồi gắn nó vào req.user để gửi đi.

Để hiểu hơn nữa các bạn có thể tham khảo [https://stackoverflow.com/a/27637668](https://stackoverflow.com/a/27637668)

## 7. Tạo view index:
```
index.ejs
<% if (!user) { %>
  <div style="width:500px;height:180px;">
    <h2 style="font-size:40px;">Welcome! Please log in.</h2>
    <a href="/auth/facebook">Login with Facebook</a>
    </div>
<% } else { %>
    <h2>Hello, <%= user.displayName %>.</h2>
    <p>ID: <%= user.id %></p>
	<p>Name :<%= user.displayName %></p>
	<a href="/logout">Logout</a>
<% } %>
```
Khi đăng nhập, mình sẽ hiển thỉ các thông tin trả về từ Facebook.

## 8. Run app NodeJs
Mình sẽ chạy command sau để run app:

```
node app
```

Truy cập [http://localhost:3000](http://localhost:3000) để check.

![Index page](https://images.viblo.asia/54bea916-389d-4020-ab1f-d5c62bdcc9bd.PNG)

Click Login with facebook sẽ được redirect đến trang của facebook để cấp quyền accept ứng dụng.

![Login with Facebook](https://images.viblo.asia/6d94ff0b-f503-4a49-9b9d-dbf0a473fe74.PNG)

Đăng nhập bằng tài khoản Facebook và cho phép ứng dụng. Sau khi xác thực thành công, bạn sẽ được chuyển hướng đến URL gọi lại được chỉ định (chính là `http://localhost:3000/auth/facebook/callback`).

Sau đó sẽ redirect đến trang đã được khai báo
![Logined](https://images.viblo.asia/b7940aa5-a8e6-4b26-900e-0d26e55dbaab.PNG)

## 9. Phần kết luận
Như vậy mình đã hướng dẫn xong cách tạo ứng dụng nodeJs login facebook qua passport, nếu bạn có thắc mắc gì hãy để lại comment ở dưới nhé.

Source github: [https://github.com/tienphat/login_facebook_nodejs_passport](https://github.com/tienphat/login_facebook_nodejs_passport)

Cảm ơn các bạn đã theo dõi bài viết của mình. See you :D

## 10. Tham khảo
https://codeforgeek.com/facebook-login-using-nodejs-express/
https://codetheworld.io/xac-thuc-dang-nhap-bang-passport-facebook.html
https://www.npmjs.com/package/express-session