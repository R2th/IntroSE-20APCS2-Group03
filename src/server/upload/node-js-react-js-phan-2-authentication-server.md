Hôm nay chúng ta sẽ tiếp tục serie Node JS + React JS với chủ đề là authentication + authorization

Hôm nay chúng ta cùng đi tìm hiểu hai khái niệm cơ bản là Authentication và Authorization, cũng như tìm hiểu về cách implement nó trong ứng dụng NodeJS sẽ như thế nào nhé (go)

## Giới thiệu
Bài viết sẽ tập trung vào phía backend với các follow basic nhất như đăng ký, đăng nhập, cách trả về token cho client ...

Ở chức năng này thì chúng ta cần viết các api sau:
- API register account
- API get user detail
- API sign in
- Middleware authentication
- Authorization when get list todos

## Authentication và authorization là gì?

![](https://images.viblo.asia/e371cdb5-6d79-4569-b732-65593f698aa3.png)


### Authentication
Authentication chỉ việc xác thực người dùng, định danh được một người dùng trong hệ thống thông qua đăng nhập, việc định danh có thể thông qua email, user name, số điện thoại ... độc nhất và đại diện cho người dùng đó trong hệ thống.

Authentication tóm tắt cho câu hỏi: **Who are you?**

### Authorization
Authorization thì là bước xác định người dùng đó có quyền gì trong hệ thống, sau khi user Authentication thành công, người đó sẽ có quyền truy cập những tài nguyên nào chính là chỉ việc Authorization.

Còn Authorization tóm tắt cho câu hỏi : **What are you allowed to do?**

Bắt đầu thôi ! Follow cơ bản sẽ là:
- Người dùng đăng ký tài khoản
- Người dùng đăng nhập, server trả về token
- Client sử dụng token này để authentication + authorization

## Register
Chúng ta sẽ implement api đơn giản với việc đăng ký bằng email + password

Ở model user, chúng ta cần một hàm static để hash password mà user set, sử dụng Bcrypt để hash pasword nhé mọi người.

```javascript
// models/user.js
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User extends Model {
  static generatePasswordHash(query, cb) {
    let password = query.password.toString();
    return bcrypt.hash(password, saltRounds);
  }
}
```

Ở controller UserController, chúng ta cần viết hàm để đăng ký tài khoản cũng như hàm để lấy thông tin user

Đầu tiên là hàm register, ở hàm này chúng ta lấy thông tin email + password để tạo account, đồng thời cấp token cho client.
Client sẽ cần lưu lại token này ở browser, sử dụng nó gắn vào mỗi request headers khi gọi api.

```Javascript
class UserController {
  static async register(req, res, next) {
    let {email, password} = req.body;
    let userJson = {
      email: email,
      password: password
    }
    let hash = await User.generatePasswordHash(userJson);
    if (hash) {
      var user = await User.create({email: email, passwordHash: hash});
      if (!_.isNil(user)) resHelper(res, 200, {token: user.generateJWTToken(), user: user.jsonData(), message: 'Create user success'}, 'Create user success');
    } else {
      resHelper(res, 400, {message: 'Create user failed'}, 'Create user failed');
    }
  }
}
```

Hàm generateJWTToken() chúng ta trả về token chứa gì trong đó ? 

- **Lưu ý** : *JWT token không được chứa dữ liệu nhạy cảm, như chứa token khác hay là password cũng như thông tin bí mật. Bởi vì JWT token payload thực chất là một chuỗi base64 có thể decode dễ dàng.*

Mọi người có thể tìm hiểu thêm về Jwt ở đây nhé https://jwt.io/introduction , https://viblo.asia/p/tim-hieu-ve-json-web-token-jwt-7rVRqp73v4bP

Ở đây mình sẽ dùng package `jsonwebtoken` để sign payload chứa email và userId, để khi decode token chúng ta có thể định danh được user nào đang request lên hệ thống.

```javascript
var jwt = require('jsonwebtoken');

class User extends Model {
  generateJWTToken() {
    return jwt.sign({email: this.email, userId: this._id}, process.env.JWT_SECRET);
  }
}
```


## Login
Với login thì chúng ta cần kiểm tra email và password mà user truyền lên. Nếu hợp lệ thì trả về token còn không sẽ bắn lỗi.

```javascript
const _ = require('lodash');

class AuthController {
  static async sign_in(req, res, next) {
    var {email, password} = req.body;
    if (_.isNil(email) || _.isNil(password)) return resHelper(res, 400, {}, 'Invalid parameter');
    var user = await User.get({email: email});
    if (_.isNil(user)) return resHelper(res, 404, null, 'Not found');
    var isAuth = await user.verifyPassword(password);
    if (isAuth) {
      var token = user.generateJWTToken();
      return resHelper(res, 200, {token: token}, 'Sign in success');
    } else {
      return resHelper(res, 400, {error: 'Invalid usename or password'}, 'Sign in failed');
    }
  }
}
```

## Authentication

Với các request cần phải xác thực người dùng, thì bắt buộc phải verify request đó trước khi trả về dữ liệu, chúng ta gọi các hàm để làm nhiệm vụ này là middleware functions.
Các middlewares functions này sẽ có nhiệm vụ lọc những request để kiểm tra tính đúng đắn của request, ví dụ như params truyền lên có đúng với format hay không, hay là header có được phép không, nó cần kiểm tra nếu request đó có gì không đúng thì sẽ bắn lỗi về client.

Với user đã được cấp token đăng nhập, token này sẽ có thể hợp lệ/ không hợp lệ/ hết hạn...
Chúng ta cần kiểm tra 3 điều kiện này, nếu hợp lệ thì sẽ cho phép tiếp tục request đó, cũng như nếu không hợp lệ thì sẽ bắn lỗi 401 về client ngay.

Ở đây mình sẽ dùng middleware authenticate_user để kiểm tra headers có chứa token hợp lệ hay không.
Hợp lệ thì chúng ta sẽ định danh được user đang request, gán nó vào res.locals.currentUser để sử dụng cho các follow sau middlewares - các hàm ở controller xử lý logic.

```javascript
  static async authenticate_user (req, res, next) {
    var authHeader = req.headers['authorizationtoken'];
    if (authHeader && authHeader.split(' ')[0] !== 'Bearer') resHelper(res, 401, {error: 'Unauthorized'}, 'Unauthorized');
    if (_.isNil(authHeader)) return resHelper(res, 401, {error: 'Unauthorized'}, 'Unauthorized');
    var token = authHeader.split(' ')[1];
    var decodedToken = null;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      var currentUser = await User.get({name: decodedToken.userName});
      if (_.isNil(currentUser)) return resHelper(res, 400, {error: 'bad request'}, 'Bad request');
      res.locals.currentUser = currentUser;
    } catch (error) {
      return resHelper(res, 400, {error: 'bad request'}, 'Bad request');
    }
    if (_.isNil(decodedToken)) return resHelper(res, 400, {error: 'bad request'}, 'Bad request');
    next();
  }
```
## Authorization

Hàm này đơn giản là trả về thông tin user với status 200, nếu user đó hợp lệ. Còn không thì về status code 401 hoặc 400.
Client sẽ gọi lên hàm này để lấy thông tin, chúng ta có thể trả về vài thông tin cần thiết như email, name, avatar .v.v.

```javascript
  static user (req, res, next) {
    try {
      resHelper(res, 200, {user: res.locals.currentUser.jsonData()}, 'Load user success');
    } catch {
      resHelper(res, 400, {}, "Bad request");
    }
  }
```
Để request được thông tin này thì user phải đăng nhập trước đó, đồng thời cần gửi token trong header và pass function `authenticate_user`.

Và routes mình sẽ để như sau:

```javascript
// config/api.routes.js

var AuthMiddleware = require('../middlewares/auth_middleware.js');
var AuthController = require('../controllers/api/auth_controller.js');

module.exports = function(router) {
  ...
  router.get('/auth/user', AuthMiddleware.authenticate_user, AuthController.user);
  ...
}
```
Ở đây hãy để ý đến router get user, middleware cần chạy trước controller, vì thế nên thứ tự sẽ là middleware -> controller, tương tự thì các controller nếu có nhiều middleware thì các middleware sẽ theo thứ tự và controller cần chạy sau cùng.

Về authorization, mục đích là phân quyền trong ứng dụng, với những ứng dụng cần phân chia roles, ví dụ admin và user bình thường.
Ví dụ đơn giản là khi ứng dụng cần phân chia resource tương ứng với các type user thì sẽ không cho phép truy cập hay cho phép.

Đơn cử là một ứng dụng có phân chia các gói tài nguyên, ví dụ tài khoản có trả tiền thì sẽ được phép truy cập không giới hạn, còn tài khoản trial thì không chẳng hạn.

Authorize là bước sau khi authenticate, để kiểm tra permission của từng user. Và basic nhất thì ở serie viết này mình cũng implement bằng việc viết middlewares.

Phần tiếp theo mình sẽ tiếp tục với React JS - cách để implement follow signup, login bên FE sẽ như thế nào nhé.

Soruce code:
- NodeJS: https://github.com/at-uytran/todo-backend
- React JS: https://github.com/at-uytran/todo-frontend