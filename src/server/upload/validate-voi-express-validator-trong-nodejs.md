### 1. Mở đầu:

express-validator là một tập hợp các  funtion với chức validator của express.js middlewares.

Trong bài viết này tôi sẽ giới thiệu cách để validaor dữ liệu được gửi từ front-end bằng cách call API nodejs, với việc dùng express-validator và xuất ra các message error để reponse lại phía front-end.
 
### 2. Installation:

Install express-validator với npm (chắc chắn rằng bạn có Node.js 6 or mới nhất):
```
npm install --save express-validator
```
 
### 3. Tạo một validator.js :

Ở đây tôi sẽ tạo validator.js để phục vụ việc validation Object user chẳng hạn, trước khi bạn thực hiện register user vào database, và để validation dữ liệu vào của việc login bằng email user. 
```
const {check} = require('express-validator');

let validateRegisterUser = () => {
  return [ 
    check('user.username', 'username does not Empty').not().isEmpty(),
    check('user.username', 'username must be Alphanumeric').isAlphanumeric(),
    check('user.username', 'username more than 6 degits').isLength({ min: 6 }),
    check('user.email', 'Invalid does not Empty').not().isEmpty(),
    check('user.email', 'Invalid email').isEmail(),
    check('user.birthday', 'Invalid birthday').isISO8601('yyyy-mm-dd'),
    check('user.password', 'password more than 6 degits').isLength({ min: 6 })
  ]; 
}

let validateLogin = () => {
  return [ 
    check('user.email', 'Invalid does not Empty').not().isEmpty(),
    check('user.email', 'Invalid email').isEmail(),
    check('user.password', 'password more than 6 degits').isLength({ min: 6 })
  ]; 
}

let validate = {
  validateRegisterUser: validateRegisterUser,
  validateLogin: validateLogin
};

module.exports = {validate};
```

Trong đoạn code trên tôi đã tạo validateRegisterUser và validateLogin để thực hiện validate cho 2 controller registerUser và login.
Trong đó bạn có thể thấy tôi đã sử dụng các function để check :

```.not()``` : dùng để phủ định mệnh đề tiếp theo như trong ví dụ là phủ định mệnh đề .isEmpty(), hoặc có thể dùng như thế này:

```check('weekday').not().isIn(['sunday', 'saturday'])```

Còn message 'Invalid does not Empty' sẽ trả về khi dữ liệu không thỏa điều kiện validate

```.isEmail()``` : để check nó có phải là email hay không ...


### 4.Call validator từ router:

Bạn cần impport validationResult để nhận kết quả trả về từ validator

``` var {validationResult} = require('express-validator'); ```

```
router.post('/registerUser', validate.validateRegisterUser(), function (req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  userService.registerUser(req.body.user).then(function (user) {
    return res.json({ user: userService.toAuthJSON(user) });
  }).catch(next);
});
```

Ở đây nếu có bất kì lỗi gì bạn sẽ response về phía front-end. Nếu có nhiều lỗi xảy ra cùng 1 lúc thì nó cũng sẽ báo hết nhé.

### 5.Lời kết:
Đây chỉ là bài viết đơn giản về bước đầu validate bằng express-validator. Hy vọng bài viết này sẽ giúp ích cho các bạn có 1 giải pháp để validate data với Nodejs. Để hiểu rõ thêm về express-validator bạn đọc document của nó ở đây nhé https://express-validator.github.io/docs/index.html