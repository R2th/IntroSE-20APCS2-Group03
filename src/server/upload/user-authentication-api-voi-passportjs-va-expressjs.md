Hôm nay bắt đầu vọc Nodejs, thấy khá hay và thú vị nên minhf xin chia sẽ bài viết này, hướng dẫn cho các bạn mới làm quen với nodejs như mình.
Mục đích là tạo web cơ bản với chức năng signup, login, logout cho user nhé, và tất nhiên bạn cần có kiến thức về Nodejs cơ bản, cũng như web cơ bản.
# Setup môi trường
1. Tạo folder dự án:
- Ở đây mình sẽ dùng Express generator để dựng base cũng như cấu trúc folder cho demo này nhé :3 
- Đầu tiên bạn cần cài đặt npm install -g express-generator@4
- Và chạy express passport-demo để khởi tạo demo.
- Cùng ngó qua folder tree nhé, cũng khá là cơ bản rồi, từ từ mình sẽ đi chi tiết nhé
- ![](https://images.viblo.asia/bdae7c35-616e-4fc3-af3d-615c879ba9d1.png)
2. Kết nối và sử dụng Mongodb:
- Ở đây mình sẽ sử dụng ORM là Mongoose cho Mongo nhé, nếu bạn còn chưa có kinh nghiệm hay kiến thức về nó hảy đọc thêm [ở đây ](https://mongoosejs.com/).
- Bạn cần install sẵn mongodb nhé.
- và cài đặt mongoose để sử dụng: npm install mongoose.
3. Install passport
- npm install passport passport-local
- Passport hỗ trợ rất nhiều phương thức authen như với google, facebook, twiter... ở đây mình chỉ dùng passport-local để authen user thôi nhé, bạn có thể tham khảo thêm tại http://www.passportjs.org/docs/
# Xoắn tay lên và code
1. Đầu tiên tạo model user trước nhỉ:
- Đi thẳng vào code nhes
- Set up cho mongoose:
+ app.js
```
var mongoose = require('mongoose');
//require model
require('./models/User');
```
- Tạo model user
+ models/user.js
```
var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var secret = 'secrect password'

//Tạo schema cho user
var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true
    },
    hash: String,
    salt: String
  },
  { timestamps: true }
);

//Khởi tạo password bằng cách mã hóa password với chuỗi salt được tạo ra ngẫu nhiên.
UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

//Kiểm tra password có đúng hay không bằng cách mã hóa password nhập vào + salt và so sánh với hash của user.
UserSchema.methods.validPassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

//Sử dụng JWT để sinh ra token chứa info của user đã login, với secret là key cho để mã hóa cùng, tất nhiên nên dùng biến môi trường nhé =))
UserSchema.methods.generateJWT = function() {
  var today = new Date();Cùng giải thích 1 tí nhé:
- Ở đây mình sẽ sử dụng crypto để mã hóa password, trong model user sẽ có 2 field: hash (Kết quả của password sau khi đã mã hoá), salt (1 chuỗi ngẫu nhiên sinh ra để mã hóa với password thật của user)
- 
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000)
    },
    secret
  );
};

//Method giúp trả về thông tin của user.
UserSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

mongoose.model("User", UserSchema);
```
Mình có comment lại trong code để giải thích khá kĩ rồi, nếu có thắc mắc thì cứ comment nhé, mình sẽ cố gắng giải thích nếu biết. =))
2. Config cho passport:
- Đây là file config passport của mình: passport.js
```
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//Ta sẽ khởi tạo Strategy cho passport, đầu tiên là object chứa tên của field username và password mà ta sẽ truyền vào khi gọi api trong req.body (options, mặc định là //  //  username và password)
//Tiếp theo làm hàm callback để verify, hàm này nhận vào 3 đối số là username, password, verified, với verified là callback để trả về sau khi verify
passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));

```
- Ở trên nếu bạn nào chưa hiểu cách mình dùng hàm verifed (done) thì xem qua đoạn code này của passport local nhé, có thắc mắc có thể cmt bên duới mình sẽ cố gắng giải đáp.
```
  function verified(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }
```
-Link github cho bạn nào muốn đọc hiểu cách hoạt động https://github.com/jaredhanson/passport-local/blob/master/lib/strategy.js 
3. Tạo route :
- Signup
```
//Handle khi user signup, ở đây chỉ demo nên mình sẽ không thực hiện validate nhé.
router.post('/signup', function(req, res){
    var user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
  
  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});
```
-  Login:
```
router.post('/login', function(req, res, next){
// passport.authenticate sẽ nhận vào callback cho method successs ở phần config passport
  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

//Nếu thông tin user là đúng thực hiện tạo JWT và trả dữ liệu về.
    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});
```
- Logout: Cái này thì chắc không cần api nữa nhỉ, ở client ta chỉ việc xóa token có được khi login là xong.
- Bước cuối cùng cũng khá là quan trọng là kiểm tra người dùng đang login nhỉ, thông thường thì phỉa client sẽ sử dụng token có được sau khi login để gửi kem trong header
Mình sẽ có file Auth.js như sau
```
var jwt = require('express-jwt');
var secret = require('../config').secret; // Lấy ra biến secret đã dùng để mã hóa

function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

var auth = {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  })
};

module.exports = auth;

```
- Express-jwt là middleware giúp ta validate lại token jwt và set req.user từ token lấy ra được, các bạn xem thêm tại https://github.com/auth0/express-jwt
- Và bây giờ trong route bạn cần kiểm tra user nào login chỉ việc import và thêm callback auth.required để check nhé, mình sử dụng userProperty: 'payload' nên muốn lấy ra payload mã hóa trong jwt ta chỉ việc: req.payload.id
### Update 1:
- Mình bổ sung 1 tí cho bạn nào ko muốn dùng express-jwt thì có thể tự viết middleware như sau
```
import jwt from 'jsonwebtoken';
var secret = require('../config').secret;

async function authen(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        var token = req.headers.authorization.split(' ')[1];
        try {
            var user = jwt.verify(token, secret)
            req.user = user;
            next()
        } catch (err) {
            return res.status(500).json({
                success: 'false',
                message: 'Invalid User',
            });
        }
    } else {
        return res.status(500).json({
            success: 'false',
            message: 'Authen is required',
        });
    }
}

export default authen;
```
- Ở đây mình cố gắng demo đơn giản cho các bạn vừa làm quen có thể dễ hiểu nhất, có gì góp ý hay thắc mắc m.n comment nhé.
# Tổng kết
- Trên đây là demo app api cơ bản để tạo chức năng đăng ký, đăng nhập cho người dùng, bài viết khá dài, mình viết còn khá nhiều thiếu xót mong mọi người thông cảm, hi vọng trong bài viết sau mình sẽ cố gắng giải thích kĩ hơn và viết đầy đủ cả client side cho các bạn dễ hiểu hơn.
- Nếu có gì sai xót mong các bạn comment để cùng nhau trao đổi nhé, cảm ơn m.n