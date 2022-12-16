## 1. Passport là gì?
Passport.js một trong những module phổ biến nhất của Nodejs hỗ trợ bạn authentication . Nó được thiết kế là một middleware hết sức linh hoạt cho bạn khả năng tùy biến cao với rất nhiều các kịch bản authentication: bạn có thể sử dụng Twitter, Facebook, Google thậm chí là qua username-password trong database. Bạn cũng có thể tùy biến chính xác các route nào cần phải authentication.

## 2. Cài đặt
```bash
npm install passport --save
```

## 3. Cài đặt ban đầu để sử dụng passport.
Trước khi bắt tay vào thực hiện phân quyền cho projectn hay nói cách khác là sử dụng passport cho phần phân quyền. Để sử dụng được passport bạn có tối thiểu 3 bước :
Require thằng passport và chèn 2 thằng middile của nó vào express là passport.initialize() và passport.session(). Chú ý là ứng dụng express của bạn cần sử dụng đến express-session.

### Cấu hình express-session.
```javascript
var expressSession = require('express-session');

app.use(expressSession({secret: 'keyboard cat'}))
```

### Cấu hình Passport.
```javascript
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
```

## 4. Xây dựng chức năng login sử dụng passport
Để thực hiện event login bằng cách check tồn tại user, password ở database các bạn lưu ý phải sử dụng cơ chế đồng bộ, nếu không event login sẽ không hoạt động được do cơ chế bất đồng bộ sẽ thực hiện cả 2 chức năng get data từ database và check authen cùng lúc nên sẽ luôn rơi vào trường hợp fail, dẫn đến login không thực hiện được.

### Cấu hình 1 kịch bản cho thằng Passport và thiết lập 2 hàm serializeUser , deserializeUser
```javascript
passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user);
});
```

Khi có request Login sẽ gọi đến thằng passport.serializeUser mà ta đã định nghĩa trước đó. Hàm này truy cập vào đối tượng user mà ta trả về cho middleware passport.authenticate và xác định xem thành phần nào của đối tượng sẽ lưu vào trong session. Kết quả của hàm này là ta sẽ có đối tượng req.session.passport.user = các thông tin ta truyền vào trong serializeUser.Trong ví dụ bên trên thì nó là user. Đồng thời với trên passport cũng có gắn thông tin user vào req.user.

Khi request được tính là đã xác thực nó sẽ gọi hàm passport.deserializeUser. Hàm này sử dụng thông tin trong session để lấy dữ liệu đầy đủ về thằng user rồi gắn nó vào req.user.

### Thiết lập 1 route có dùng middleware passport.authenticate.
```javascript
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
const bcrypt= require('bcrypt')

router.get('/', function (req, res, next) {
    console.log('login')
    if (req.isAuthenticated()) {
        res.redirect('../');
    }
    else{
        res.render('shop/login')
    }
});

router.post('/', passport.authenticate('local', {
    successRedirect: '../',
    failureRedirect: '/product/login',
    failureFlash: true
    }));

passport.use('local', new  localStrategy({passReqToCallback : true}, (req, username, password, done) => {

    loginAttempt();

    async function loginAttempt() {

        const client = await pool.connect()
        try{
            await client.query('BEGIN')
            var pwd = await bcrypt.hash(password, 5);
            var currentAccountsData = await JSON.stringify(client.query("SELECT * FROM public.user " +
                "INNER JOIN public.permission ON public.user.role = public.permission.id " +
                "WHERE public.user.username = '"+username+"' AND public.user.password = '"+password+"'", function(err, result) {

                if(err) {
                    return done(err)
                }
                if(result.rows[0] == null){
                    return done(null, false);
                }
                else{
                    console.log(result.rows.length);
                    console.log(result.rows[0].username);

                    if (result.rows[0] && result.rows[0].username == username && result.rows[0].password == password) {
                        if (req.body.remember) {
                            console.log('remember')
                            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
                        } else {
                            console.log('no remember')
                            req.session.cookie.expires = false; // Cookie expires at end of session
                        }
                        return done(null, result.rows[0]);
                    } else {
                        return done(null, false);
                    }
                }
            }))
        }
        catch(e){throw (e);}
        };
    }
))
```

### Các hàm các middleware của passport:
* passport.initialize : middleware được gọi ở từng request, kiểm tra session lấy ra passport.user nếu chưa có thì tạo rỗng.
* passport.session: middleware sử dụng kịch bản Passport , sử dụng session lấy thông tin user rồi gắn vào req.user.
* passport.deserializeUser : hàm được gọi bởi passport.session .Giúp ta lấy dữ liệu user dựa vào thông tin lưu trên session và gắn vào req.user
* passport.authenticate: middleware giúp ta gắn kịch bản local vào route.
* passport.serializeUser: hàm được gọi khi xác thực thành công để lưu thông tin user vào session

### Với từng request passport gắn thêm cho bạn 4 hàm:
```javascript
req.login()
req.logout()
req.isAuthenticated()
req.isUnauthenticated()
```

### Login page.
![](https://images.viblo.asia/c2362e44-609d-4472-a652-a9ab6ad75af8.png)

page add product cho phân quyền ADMIN

![](https://images.viblo.asia/7ae957ac-ea27-464e-ac9c-b829e5268db9.png)

Check quyền cho page.
```javascript
/* GET add product page. */
router.get('/', function(req, res, next) {
    if (req.isAuthenticated() && 'ADMIN' == req.session.passport.user.name_role){
        console.log(req.session.passport.user)
        res.render('shop/addProduct');
    } else {
        res.send('ban da khong co quyen')
    }

});
```

Không có quyền
![](https://images.viblo.asia/a7f84606-d03b-4c05-9315-f04bcc7c4a14.png)

Nguồn tham khảo: http://toon.io/understanding-passportjs-authentication-flow/