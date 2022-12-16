# Mở đầu
Chắc hẳn mọi người đã quá quen với việc phát triển ứng dụng web với mô hình MVC rồi nhỉ. Mình đã từng gặp khó trong việc phát triển MVC khi chuyển sang học framework Express js vì không biết phát triển như thế nào cho chuẩn và hợp lý. Thì bài viết ngày hôm nay mình sẽ cùng phát triển chức năng login dùng passport-local và mô hình MVC nhé.
Bài viết này mình sẽ đi chi tiết từ khởi tạo dự án đển khi hoàn thành chức năng, vì vậy có thể bài viết này sẽ khá dài.
# Chuẩn bị 
## Khởi tạo dự án
```
mkdir demo && cd demo
npm init
```
## Cài các gói package cần thiết
```
npm install --save express express-session mongoose passport passport-local ejs bcrypt
```
Giải thích: 
* `express-session`: Hỗ trợ trong việc tạo session.
* `mongoose`: Cái này sẽ làm việc với mongodb, `mongoose` sẽ giúp chúng ta thao tác với bản ghi như một đối tượng vậy.
* `bcrypt`: Mã hóa password.
* `passport-local`: Là gói hỗ trợ việc authen trong nodejs, ngoài ra còn có passport-facebook, passport-google.
## Cài đặt babel-cli để dùng cú pháp ES6
```
npm install --save babel-cli babel-preset-env
```
Config:
Tạo file `.babelrc` với nội dung:
```
{
  "presets": ["env"]
}
```
Vào file `package.json`: thêm dòng sau vào trong `option: scripts`
```
"start": "babel-node app/index.js"
```
![](https://images.viblo.asia/9b40c197-95eb-4e24-94ce-4ba9da03eb92.png)
## Cấu trúc thư mục
Chúng ta sẽ xây dựng cấu trúc thư mục dự án theo mô hình MVC. Tất cả code của mình sẽ gói gọn vào trong thư mục app.
![](https://images.viblo.asia/085b8a59-67db-4f6f-8666-8bb6bfe0cd4d.png)
Ý nghĩa các thư mục: 
* Config: Chưa các file cấu hình như là connect db, config view, session,.. cho dự án. Mình sẽ gói gọn thành các module rồi chỉ cần import ở chỗ cần thiết thôi.
* Controller: Sẽ là nơi quyết định render ra file view nào, xử lý logic ra sao.
* Models: Thư mục này sẽ là nơi làm việc với đối tượng CSDL bao gồm truy vấn và định nghĩa đối tượng.
* Routes: Thư mục này dùng để định nghĩa các router cho dự án.
* View: thì là nơi chứa file view rồi ở đây view enginer mình sẽ dùng .ejs nhé.
# Tiến hành
## Connect mongodb:
Tạo file app/config/connectDB.js gói lại thành 1 modules để import ở index.js. Việc modules hóa sẽ giúp cho chúng ta dễ dàng maintain và cũng dễ dàng hiểu code hơn.
```
import mongoose from "mongoose";
let connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/my_blogs', { useNewUrlParser: true, useUnifiedTopology: true });
};
module.exports = connectDB;
```
## Config file view engine:
Tạo file app/config/viewEngine.js
```
import express from "express";
let configViewEngine = (app) => {
  app.set("view engine", "ejs");
  app.set("views", "./app/views");
};
module.exports = configViewEngine;
```
Các bạn bạn chú ý là mình có đặt thư mục view mặc định là `./app/views` và view engine là ejs nhé.
## Định nghĩa model users
Đối tượng user mình chỉ dùng là email và password mà thôi.
```
import mongoose from "mongoose";
let Schema = mongoose.Schema;
let UserSchema = new Schema({
  email: String,
  password: String
});
module.exports = mongoose.model("user", UserSchema);
```
## Tạo usersController
Như mình đã nói controller chỉ có nhiệm vụ gọi view và xử lý logic mà thôi. Ở dự án này mình xây dựng 2 function là index và login. Controller của mình có 2 thành phần:
* Function để render ra form view login.
* Function index dùng để điều hướng khi login thành công.
```
let index = (req, res) => {
  return res.render("users/index");
}

let login = (req, res) => {
  return res.render("users/login");
}

module.exports = {
  index: index,
  login: login
}
```
File controller sẽ import ở file routers
## Tạo file view tương ứng với controller
/users/index.ejs
```
<h1>Index</h1>
<a href="/login">Login</a><br>
<a href="/fakeUser">Create User to test login</a>
```
/login/index.ejs 
```
<h1>Login</h1>
<form action="/login" method="post">
      <input type="text" name="email" id="email"></br> </br>
      <input type="password" name="password" id="password"> </br> </br>
      <input type="submit" value="Login">
</form>
```
## Xây dựng routes 
Ở đây các bạn chú ý chúng ta sẽ import ra usersController để truyền vào router. 
```
import express from "express";
import users from "../controllers/UsersController";

let router = express.Router();

let initRoutes = (app) => {
  router.get("/", users.index);
  router.get("/login", users.login);

  return app.use("/", router);
};

module.exports = initRoutes;
```
File router này sẽ import ở file index.js
## Import vào file index.js
file app/index.js
```
import express from "express";
import connectDB from "./config/connectDB";
import initRoutes from "./routes/web";
import configViewEngine from "./config/viewEngine";
import bodyParser from "body-parser";

let app = express();
let port = 3000;

connectDB();
configViewEngine(app);
app.use(bodyParser.urlencoded({extended: true}));
initRoutes(app);

app.listen(port, () => {
  console.log("Port 3000 is running");
});
```
## Chạy thử
Giờ các bạn có thể khởi động lại server chạy `npm start` theo url: http://localhost:3000/ hoặc http://localhost:3000/login thì sẽ được kết quả như hình dưới nhé:
![](https://images.viblo.asia/15874f46-6ed1-44d3-8f9e-0d9fd3b95998.gif)
# Xây dựng chức năng login dùng passport
Passport là một thư viện hỗ trợ authen trong nodejs. Nó được thiết kế thành một module vì vậy có thể làm cho Passport dễ dàng tích hợp vào trong ứng dụng của bạn. Nó hỗ trợ hầu hết các công việc của login từ việc tạo session, login thành công (hoặc thất bại) thì điều hướng và thông báo ra sao,...

Cài đặt thư viện passport và passport-local mình đã cài ở trên rồi nhé. 
## Cơ bản về passport-local:
### Route
Chúng ta có thể config tạo router, redirect success hay redirect faild ở router như bên dưới. Nếu bạn k muốn dùng tự động tạo session khi login thành công thì có thể thêm option `session: false` vào router.
```
  router.post("/login", passport.authenticate('local',{
    failureRedirect: "/login",
    successRedirect: '/'
  }));
```
### Cấu hình passport-local
#### Passport params 
Mặc định passport params dùng tham số là `username` và `password` các bạn có thể config dùng trường khác như sau:
```
let initPassportLocal = () => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, password, done)=> {
   ...
  }));
};
```
#### Thiết lập:
Tiến hành kiểm tra email và password từ database nếu không có user thì trả về callback là done với params là errors (`done(null, false)`), còn nếu đúng thì trả về ` return done(null, user);`
```
let initPassportLocal = () => {
  passport.use(new LocalStrategy({
  ...
  }, async (req, email, password, done)=> {
    try {
      let user = await UserModel.findByEmail(email);
      if (!user) {
        return done(null, false);
      }

      let checkPassword = await(user.comparePassword(password));

      if (!checkPassword) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(null, false,);
    }
  }));
};
```
`passportLocal.js` hoàn chỉnh như sau:  https://github.com/longnguyen28596/passport-local/blob/master/app/controllers/auth/passportLocal.js
#### Các hàm hỗ trợ thêm cho từng request
Với từng request passport gắn thêm một số hàm:
* req.login()
* req.logout()
* req.isAuthenticated()
* req.isUnauthenticated()
# Kết luận
Mình xin kết thúc bài viết ở đây. Đây là hướng dẫn của mình về xây dựng chức năng login bằng `passport-local` với mô hình MVC. github các bạn có thể tham khảo: https://github.com/longnguyen28596/passport-local