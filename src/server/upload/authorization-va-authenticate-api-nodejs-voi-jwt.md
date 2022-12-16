Xin chào các bạn, sau một vài bài lý thuyết về NodeJS thì hôm nay chúng ta cùng đi vào thực hành nhé. Và hôm nay chúng ta sẽ làm bước một bước mình nghĩ là khá quan trọng trong quá trình xây dựng API, đó chính là Authenticate và Authorization. Mình sẽ không nói nhiều về 2 khái niệm này và tại sao chúng ta phải làm, cũng đã có rất nhiều bài viết so sánh hai khái niệm này.

Trong bài viết này thì mình sẽ sử dụng:
*  NodeJS
*  Express
*  MongoDB

# Tạo project
Chúng ta sẽ sử dụng express generator để tự động tạo app. Bạn có thể vào trang sau để rõ hơn: https://expressjs.com/en/starter/generator.html

Chạy lệnh sau để cài đặt express-generator

```
npm install -g express-generator
```

Sau đó chạy
```
express
```
để generate code

![](https://images.viblo.asia/a9593972-a26b-43d8-88a4-61acbde14e60.png)

Bạn sẽ thấy có 1 vài folder bạn không có vì do mình tự tạo thêm thôi, cái này mình sẽ hướng dẫn ở phần sau
Ở thư mục dự án, hãy chạy 
```
npm install
```

và chạy 
```
npm start 
```
để khởi tạo app. App sẽ được chạy mặc định ở port 3000. Bạn có thể tạo một file `.env` để thay đổi port hoặc thay đổi port mặc định ở trong `bin\wwww`. Nhưng có vấn đề là chả lẽ mỗi lần sửa đổi file gì sẽ phải start lại 1 lần thì rất mất công. Vậy hãy cài thêm `nodemon` để action này được tự động nhé. Chi tiết cách cài đặt bạn có thể xem tại đây: https://www.npmjs.com/package/nodemon. 

Sau khi đã cài thành công `nodemon` bạn vào file `package.json`, thay đổi `start` trong `script` thành `nodemon ./bin/www`
```javascript
  "scripts": {
    "start": "nodemon ./bin/www"
  },
```

Và giờ hãy start lại npm, sau đó thử thay đổi 1 file nào đó nhé.

#  Tạo DB
Tại sao lại là mongoDB? Thật ra là do mình chưa làm việc với mongoDB, nên muốn tìm hiểu nó là chính, đơn giản vậy thôi :D. Các bạn hãy thuy cập vào trang web https://www.mongodb.com/, sau đó sign in vào. Sau khi đồng ý với điều khoản và chọn gói free (nếu bạn có muney). Sau đó hãy tới những thiết lập cho sv, phần này thì bạn có thể tùy chọn bên cùng cấp, vị trí đặt server,... Sau đó ấn `Create Cluster`

![](https://images.viblo.asia/41912444-8226-4ae2-84a1-a0a0e788281e.png)

Sau đó thì sẽ xuất hiện 1 bảng nhỏ có những bước sau, hãy hoàn thành đủ các bước nhé, khi ấn vào từng bước sẽ có hướng dẫn cụ thể nên mình sẽ không nói nữa nha

![](https://images.viblo.asia/34c12c15-a100-45d7-afa1-b2bc61939105.png)
Chi tiết về từng bước như sau, ngoại trừ bước đầu đã gạch nha:

* Tạo người dùng cho db (ở đây bạn sẽ được tạo người dùng và phân quyền cho người dùng đó)
* Thiết lập whitelist cho địa chị IP (quy định những ip nào có thể truy cập, bạn cũng có thể cho phép truy cập từ toàn bộ các ip)
* Load data mẫu (cái này làm hay không cũng được, nhưng mình thích nhìn nó lên 100% nên sẽ làm)
*  Kết nối tới cluster của bạn (riêng cái này mình sẽ hướng dẫn chi tiết ở dưới)

Ở đây sẽ có 3 options cho bạn chọn 
* Kết nối với mongo shell
* Kết nối với app của bạn
* Kết nối sử dụng MongoDB Compass

![](https://images.viblo.asia/60b89c7b-b3de-4daa-aee4-9a6aa0a643d7.png)

Ở đây mình sẽ sử dụng số 2 và 3, số 2 để mình sử dụng trong project để kết nối, còn số 3 thì như là giao diện để mình xem (tương tự viêc bạn sử dụng phpmyadmin, mysql workbench,...). Trước tiên mình sẽ tải mongoDB compass. Bạn hãy click vào option thứ 3 và tải về rồi cài đặt nhé

![](https://images.viblo.asia/50f872f1-50fa-417a-a30f-6be7447dd340.png)

Sau khi cài đặt xong, bạn hãy copy đoạn ở phần 2, sau đó thay `password` bằng password của user bạn tạo rồi ấn connect trong app MongoDB Compass
![](https://images.viblo.asia/326634cd-cbfd-462e-8a3c-bfbb291f5c4e.png)

Và đây là kết quả. Do đã load sample data nên mình có khá nhiều db, và mình có tạo thêm db là express để demo

![](https://images.viblo.asia/9ad4c1d7-eeb1-4074-bbe1-fa8cd6ed9af9.png)

Vậy là chúng ta đã tạo xong DB

# Kết nối DB
Giờ để kết nối và thao tác với DB, chúng ta sẽ sử dụng `mongoose` https://www.npmjs.com/package/mongoose.

Đầu tiền hãy tạo file `.env` để lưu những thiết lập này, chứ không thể lưu trực tiếp trong code được, vì như vậy nếu có lỡ để public repo ra thì không khác gì bạn đang cho tất cả mọi người kết nối vào db của mình. Bạn hãy vào lại trang web của mongodb. Bạn hãy click vào option thứ 2 ở phần mình hướng dẫn phía trên. Còn nếu đã tắt đi rồi thì có thể ấn vào nút `connect`.

![](https://images.viblo.asia/b8e4649b-5b70-411b-9b6f-00b7d9d6a7b9.png)

Giờ hãy copy giá trị của `const uri` thôi nhé và paste vào `.env` nhớ điền `password` và `dbname` 

`.env`
```
DB_CONNECT=mongodb+srv:.....
```
Ở trong file `app.js`
```javascript
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('DB Connected')
);
```

Giờ hãy để ý trong terminal, chỗ mà đang chạy sv, nếu thấy dòng `DB Connected` tức là đã kết nối thành công rồi đó
![](https://images.viblo.asia/036b69c6-4d45-41dd-a6ce-77e6c570bc95.png)

# Authenticate
Trước khi authenticate thì chúng ta sẽ phải có user. Vì vậy mình sẽ tạo 1 api để thêm user trước. Đầu tiên hãy tạo model nhé

```models/User.js```:
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 225
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
});

module.exports = mongoose.model('User', userSchema);
```
Chúng ta khởi tạo 1 schema và đặt điều kiện cho từng key trong nó.

Vì có điều kiện nên khi có request gửi lên chắc chắn ta sẽ phải validate, mongoose cũng có hỗ trợ validate nhưng mình sẽ không dùng mà sẽ dùng 1 package là `Joi`, Bạn có thể tự tìm hiểu thêm về package này nhé, mình sẽ không đi vào chi tiết

`validations/auth.js`:
```javascript
const Joi = require('joi');

const registerValidator = (data) => {
    const rule = Joi.object({
        name: Joi.string().min(6).max(225).required(),
        email: Joi.string().min(6).max(225).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    })

    return rule.validate(data);
}

module.exports.registerValidator = registerValidator;
```

Tạo thêm file `routes/auth.js` 

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('./../models/User');
const { registerValidator } = require('./../validations/auth');

router.post('/register', async (request, response) => {
    const { error } = registerValidator(request.body);

    if (error) return response.status(422).send(error.details[0].message);

    const checkEmailExist = await User.findOne({ email: request.body.email });

    if (checkEmailExist) return response.status(422).send('Email is exist');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(request.body.password, salt);

    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashPassword,
    });

    try {
        const newUser = await user.save();
        await response.send(newUser);
    } catch (err) {
        response.status(400).send(err);
    }
});

module.exports = router;
```

Và để sử dụng được thì trong `app.js` sẽ thêm đoạn sau:

```javascript
app.use('/api/auth', authRouter);
```

Giải thích chút thì ban đầu nếu có error thì mình sẽ trả về 402 và message của nó. Bạn có thể console.log error ra là sẽ rõ, hoặc có thể log cả đoạn `registerValidator(request.body)` để thấy được tất cả những gì trả về. Để có thể sử dụng trong postman thì bạn dùng 
```jasvascript
return response.send(registerValidator(request.body));
```
để dễ nhìn hơn nhé. Giờ hãy thử mở postman lên và tạo thử tài khoản những không khớp với validation rule xem sao

![](https://images.viblo.asia/d44164a5-c24f-4f19-8668-203edb749d8d.png)

Như bạn thấy email đã bị báo sai định dạng rồi nè.  Quay trở về code nào, sau đó thì bạn có thấy mình sẽ check xem email có tồn tại không, điều này là dĩ nhiên vì mình không muốn tồn tại 2 email giống nhau trong hệ thống của mình được. Tiếp tới thì mình có mã hóa mật khẩu, lib mình sử dung là `bcryptjs` nhé. Cuối cùng thì save lại user và send thông tin đó lên thôi.

![](https://images.viblo.asia/2aacbdd8-e388-4465-a75c-51fcedb07082.png)

Vậy là chúng ta đã tạo thành công user rồi

Sau khi có tài khoản rồi thì chúng ta phải đăng nhập vào hệ thống chứ nhỉ

Quay lại file `routes/auth.js`

```javascript
router.post('/login', async (request, response) => {
    const user = await User.findOne({email: request.body.email});
    if (!user) return response.status(422).send('Email or Password is not correct');

    const checkPassword = await bcrypt.compare(request.body.password, user.password);

    if (!checkPassword) return response.status(422).send('Email or Password is not correct');
    
    return response.send(`User ${user.name} has logged in`);
})
```

![](https://images.viblo.asia/7dc58e42-827f-4cde-a835-9c6674b14626.png)

Giờ hãy tạo thêm 1 api lấy danh sách users nhỉ

`routes.users`
```javascript
const express = require('express');
const User = require('./../models/User');
const router = express.Router();

router.get('/', (request, response) => {
    User.find({}).exec(function (err, users) {
        response.send(users);
    });
});

module.exports = router;
```


`app.js`
```javascript
app.use('/api/users', userRouter);
```

Và đây là danh sách users của chúng ta 
![](https://images.viblo.asia/9077eeda-e76e-4083-9899-33c67bbee80d.png)

Từ đã, tại sao lại có thể sử dụng api 1 cách dễ dàng vậy nhỉ, thế này thì sai quá. Và đó là lí do chúng ta sẽ đến tới với phần tiếp theo


# Authorization
Về cơ bản chúng ta sẽ tạo ra một token xác thực, mỗi request người dùng gửi lên đều phải đi kèm với token đó, nếu đúng token thì người dùng mới có thể gọi được tới những api mà chúng ta yêu cầu phải xác thực. Và chúng ta sẽ sử dụng `JWT` https://www.npmjs.com/package/jsonwebtoken.

Đầu tiện để tạo ra token, thì mỗi khi người dùng đăng nhập chúng ta sẽ tạo ra một token cho người dùng đó. Giờ chúng ta sẽ phải sửa lại chức năng đăng nhập một chút
`.env`
```
TOKEN_SECRET=somethingrandom
```

`routes/auth.js`

```javascript
const jwt = require('jsonwebtoken');

router.post('/login', async (request, response) => {
    const user = await User.findOne({email: request.body.email});
    if (!user) return response.status(422).send('Email or Password is not correct');

    const checkPassword = await bcrypt.compare(request.body.password, user.password);

    if (!checkPassword) return response.status(422).send('Email or Password is not correct');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    response.header('auth-token', token).send(token);
})
```

Bạn sẽ thấy sau khi validate xong mình sẽ tạo ra 1 token dựa trên id của user, sau đó sẽ có sử dụng `token_secret`, `token_secret` vô cùng quan trọng vì nếu thông tin user lộ ra thì token cũng chưa thể bị đánh cắp ngay vì còn `token_secret`. Bạn có thể tạo 1 chuỗi string bất kì, ở đây thì mình ghi tạm là `somethingrandom`  thôi chứ mình thậm chí còn gõ 1 chuỗi linh tinh r mã hóa nó lại cơ :v. Và option cuối cùng là những tùy chỉnh bạn muốn thêm, ở đây mình sẽ set thời gian hết hạn cho token là 1 ngày.

Tiếp tới hãy tạo thêm middleware để xác thực api nhé 

`middlewares/verifyToken.js`

```javascript
const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    const token = request.header('auth-token');

    
    if (!token) return response.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        return response.status(400).send('Invalid Token');
    }
};
```

Ở đây mình sẽ kiểm tra trong `auth-token` ở trong header (cái này thì bạn đặt là gì cũng được nhé, đừng đặt trùng với nhưng cái mặc định là được). Nếu không có token thì sẽ trả về 401, còn nếu có nhưng mà token không đúng với token được gen ra thì sẽ là 400.

Giờ ở trong `routes.users` sẽ bổ sung middleware:
```javascript
const verifyToken = require('./../middlewares/verifyToken');

router.get('/', verifyToken, (request, response) => {
    User.find({}).exec(function (err, users) {
        response.send(users);
    });
});
```

Giờ hãy thử truy cập lại nhé 
![](https://images.viblo.asia/8e1e9ee8-ad76-44c6-92c9-51cc965606f5.png)

Giờ thì không được đâu sói ạ. Muốn có thể dùng api này thì bạn hay đăng nhập lại nhé. Giờ sau khi đăng nhập lại thì sẽ có 1 token cho bạn, hay copy token đó và đưa vào header. Key: auth-token, value sẽ là token bạn copy đó

![](https://images.viblo.asia/a713b92e-dd50-41f4-be4c-c95faa17184b.png)

Vậy là đã xong, mong bài viết này sẽ giúp íc được các bạn phần nào

Đây là repo của mình nếu bạn nào muốn xem lại code nhé:
https://github.com/duongmanhhoang/demo-node-js