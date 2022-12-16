# 1. Mở đầu
Xin chào mọi người, bài viết này chúng ta cùng tìm hiểu về cách xây dựng 1 ứng dụng api xác thực sử dụng JWT, và database sử dụng Sequelize. Một số công nghệ mà chúng ta sẽ sử dụng trong bài viết này:
+ [passport](http://www.passportjs.org/) cung cấp các middleware authentication cực kỳ linh hoạt trong node.js 
+ [JSON Web Token (JWT)](https://jwt.io/) là một phương tiện đại diện cho các yêu cầu chuyển giao giữa hai bên Client - Server , các thông tin trong chuỗi JWT được định dạng bằng JSON.
+ [Sequelize](http://docs.sequelizejs.com/) là một promise-based ORM trong Node.js. Đại khái ORM giúp bạn có thể làm việc được các CSDL với một cú pháp nhất định mà không phải đi nhớ từng dạng query của mỗi database.
# 2. Chi tiết
## 2.1 Khởi tạo project
Đầu tiên tạo thư mục dự án:
```
mkdir express-jwt-sequelize-mysql && cd express-jwt-sequelize-mysql
```
khởi tạo gói `package.json`:
```
npm init
```
cài đặt 1 số thư viện ban đầu:
```
npm install --save express body-parser nodemon
```
tiếp đến tạo file `index.js` 
```
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.json({ message: 'Express is up!' });
});

app.listen(3000, function(){
    console.log('Express is running on port 3000');
});
```
chạy thử project: 
```
nodemon start
```
Các bạn dùng postman, tạo request tới `http://localhost:3000/` nếu như ok thì ra như bên dưới:
![](https://images.viblo.asia/5b926ed5-ddfa-47c4-aef5-248b92666416.png)
## 2.2 Xây dự database
Trong phần này chúng ta sẽ cần tạo database và dùng `Sequelize ORM` để connect tới nó.
Đầu tiên các bạn hãy tạo `database` trong `mysql` đi nhé. Đăng nhập vào mysql và chạy câu lệnh: 
```
create database users_db
```
Tiếp theo là cài đặt các thư viện để làm việc được với database:
```
npm install --save sequelize mysql2
```
ok quay trở lại `index.js` ta cần khởi tạo Sequelize và các thông tin để connect tới database.
```
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: 'users_db',
    username: 'root',
    password: '',
    dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));
```
Nếu mọi thứ đều ổn thì ở log sẽ có message `“Connection has been established successfully.”`
Tiếp theo khởi tạo 1 model là `User` nếu như chưa có bảng đó thì `Sequelize` sẽ giúp chúng ta tạo bảng mới.
## 2.3 Xây dựng chức năng cho app:
Nếu như bạn đã quá quen với ORM `Sequelize` thì bạn không cần phải đọc phần này mà đọc luôn phần sau (authentication)  luôn. Còn nếu như các bạn cũng như mình đang ở mức mới tìm hiểu thì chúng ta nên đọc phần này để hiểu rõ hơn về `Sequelize` nhé.
```
// function thêm mới 1 user
const createUser = async({name, password}) => {
    return await User.create({ name, password });
};
// function lấy ra danh sách users
const Users = async() => {
    return await User.findAll();
};
// function lấy ra 1 users
const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};
```
Để sử dụng hàm này, chúng ta cần call nó ra, và gọi nó ở trong các routes mà chúng ta sẽ định nghĩa ở dưới đây:
```
app.get('/', function(req, res){
    Users().then(user => res.json(user))
});

app.post('/register', function(req, res, next){
    const {name, password} = req.body;
    createUser({ name, password }).then(user =>
        res.json({ user, msg: 'account created successfully' })
    );
})

app.listen(3000, function(){
    console.log('Express is running on port 3000');
});
```
OK các bạn test Postman xem chạy ổn không nhé.
![Test chức năng thêm mới](https://images.viblo.asia/3677ebd7-49f7-4063-9111-1274166644e8.png)
![Test chức năng lấy ra danh sách ](https://images.viblo.asia/619a0839-2f3f-4e27-bea6-cbe784e92fba.png)
## 2.4 Xác thực bằng Passport.js and JSON Web Tokens
Tiếp theo chúng ta đến với mục tiêu chính của bài viêt này. Cài đặt các thư viện cần thiết:
```
npm install passport jsonwebtoken passport-jwt -- save
```
Sau đó , require vào file `index.js`
```
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
var jwt = require('jsonwebtoken');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
```
passport.js về cơ bản là middleware function là function sẽ chạt trước khi chạy vào routes.  Nếu như authentication thất bại, điều đó có nghĩa là hàm callback gọi về 1 errors hoặc null, hoặc false, và routes sẽ không được gọi lên, nhưng 1 lỗi 401 `unauthorized ` sẽ được trả về.
```
// lets create our strategy for web token
var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  var user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);
```
và khởi tạo `passport` trong `app`
```
app.use(passport.initialize());
```
Tiếp đến là xây dựng route login cho app:
```
// login route
app.post('/login', async function(req, res, next) { 
  const { name, password } = req.body;
  if (name && password) {
    // we get the user with the name and save the resolved promise
    returned
    var user = await getUser({ name });
    if (!user) {
      res.status(401).json({ msg: 'No such user found', user });
    }
   if (user.password === password) {
      // from now on we’ll identify the user by the id and the id is
// the only personalized value that goes into our token
      var payload = { id: user.id };
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: 'ok', token: token });
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
});
```
Các bạn có thể tham khảo code ở link github ở dưới nhé.
# 3. Kết luận
Mình xin kết thúc bài viêt của mình tại đây. các bạn có thể tham khảo link gốc của bài viết [tại đây](https://medium.com/devc-kano/basics-of-authentication-using-passport-and-jwt-with-sequelize-and-mysql-database-748e09d01bab) và link [github](https://github.com/emaitee/jwt-passport-mysql) của tác giả.