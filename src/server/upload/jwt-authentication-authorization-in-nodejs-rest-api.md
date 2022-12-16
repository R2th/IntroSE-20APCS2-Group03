# 1. Lời mở đầu
* Trong bài viết này, mình sẽ tạo một REST API cho phép chúng ta tạo user, đăng kí, đăng nhập, lấy thông tin user đăng nhập, logout một người dùng ở một thiết bị và log out từ nhiều thiết bị.
* Công nghệ mà chúng ta sử dụng là Node.js với Express, MongoDB. Với MongoDB các bạn có thể cài đặt cơ sở dữ liệu MongDB local, tuy nhiên bạn cũng có thể sử dụng MongoDB Atlas (một clould database serive) như bài viết này.
# 2. Các bước thực hiện
## 2.1 Tạo một MongoDB database với MongoDB Atlas

Bước này các bạn có thể tham khảo hướng dẫn tại đây
https://www.freecodecamp.org/learn/apis-and-microservices/mongodb-and-mongoose/
## 2.2 Thiết lập cấu trúc thư mục cho project
* Tạo một thư mục, ở đây mình đặt tên là `user-registration-api`.
* Hãy cùng xem cấu trúc thư mục của project nhé
![](https://images.viblo.asia/feed89e4-008e-4dc7-8483-51bddb70c7d1.png)
    * Chúng ta có một thư mục gốc là `src`. Bên trong thư mục này có:
    * File `app.js`: nơi thiết lập server express.
    * Thư mục `models` chứa tất cả models mà chúng ta sử dụng với Mongoose, trong phạm vi project này chúng ta có model `User`.
    * Thư mục `db` chứa tất cả các cấu hình kết nối với database.
    * Thư mục middleware sẽ chứa các middleware. Đối với  project này chúng ta sẽ tạo một middleware `auth` giúp chúng ta có những endpoint được bảo vệ.
* Để thực hiện project này chúng ta cần cài đặt Node.js, hãy cài đặt phiên bản mới nhất của node.
* Npm được dùng để cài đặt và quản lý các package của node. Có nhiều Package quản lí khác mà bạn có thể sử dụng và ở đây chúng ta sẽ sử dụng `yarn`. Cài đặt `yarn` bằng `npm` với câu lệnh: `npm install yarn -g`
* Init project Node: `yarn init`
Câu lệnh này sẽ tạo ra một file `package.json` sẽ liệt kê tất cả các package của project
## 2.3 Cài đặt các package cần thiết
* Trong project này chúng ta cần các package sau:
    * **Express.js**: Một framework node.js giúp bạn dễ dàng build một ứng dụng web.
    * **mongodb**: Một driver MongoDB dành cho Node.js
    * **mongoose**: Một công cụ mô hình hóa đối tượng (object modeling) được thiết kế để làm việc với môi trường không đồng bộ. Chúng ta sẽ sử dụng mongoose để định nghĩa cấu trúc database và tương tác với database.
    * **bcrypt.js**: Dùng để mã hóa (hash) mật khẩu của user trước khi lưu chúng trong database.
    * **validator**: Chúng ta sử dụng package này để validate input của user. Ví dụ như đảm bảo rằng người dùng đưa ra một input là một email đúng định dạng
    * **Jsonwebtoken** - JSON Web Token (JWT) sẽ sử dụng để authentication và authorization (để hiểu rõ hơn 2 cái này là gì và khác biệt như thế nào các bạn hãy đọc thêm http://www.differencebetween.net/technology/difference-between-authentication-and-authorization/). Chẳng hạn Package này sẽ giúp chúng ta thiết lập những route được bảo vệ mà chỉ những user đã đăng nhập mới được truy cập.
    * **env-cmd**: Package này sẽ cho chúng ta tạo và quản lý những biến môi trường trong project
    * **nodemon**: Nodemon sẽ chạy lại express server mỗi khi chúng ta thay đổi code.
* Để cài đặt những package trên:
```
yarn add express mongodb mongoose bcryptjs validator jsonwebtoken
```
Đối với nodemon và env-cmd chúng ta cài đặt như là các development dependency:
```
yarn add env-cmd nodemon --dev
```

* Tạo file `.env` ở trong thư mục gốc cùng bậc với thư mục src, để đinh nghĩa tất cả các biến môi trường.
* Mở file `package.json` và thêm vào đoạn script sau ngay  sau dòng `main:index.js`.
```
"scripts":{"start" : "env-cmd -f ./.env nodemon src/app.js"}
```
Như vậy mỗi khi ta chạy câu lệnh `yarn start`, chúng ta sẽ sử dụng nodemon để chạy lại server mỗi khi có thay đổi trong file `src\app.js`
Và chúng ta sẽ sử dụng được các biến môi trường định nghĩa trong file `.env`
## 2.4 Định nghĩa các biến môi trường.
* Mở file `.env` và thêm những biến môi trường sau:
```
MONGODB_URL=mongodb+srv://huongvnq<password>@cluster0-e1zyx.mongodb.net/jwt-nodejs?retryWrites=true&w=majority
JWT_KEY=HuongVNQ
PORT=3000
```
* Biến `MONGODB_URL` sẽ chứa chuỗi kết nối với cơ sở dữ liệu MongoDB mà chúng ta có được khi cấu hình MongoDB trên MongoDB Atlas đã làm ở bước 1. Chuỗi này có chứa một database username ở đây của mình là `huongvnq`, password khi bạn tạo database user, và tên database, ở đây của mình là jwt-nodejs. Các bạn hãy thay đổi theo cấu hình của các bạn.
* Biến `JWT_KEY` sẽ chứa JWT token mà chúng ta sẽ sử dụng để tạo **authentication token** của user
* Biến `PORT` chứa số cổng mà ứng dụng chạy
## 2.5 Tạo một express server
* Trong file app.js:
```js
const express = require('express')
const userRouter = require('./routers/user')
const port = process.env.PORT
require('./db/db')

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
```
* Trong đoạn code trên, chúng ta khai báo sử dụng **express**, user router (mà chúng ta sẽ tạo sau này), số cổng lấy ra từ file `.env`, require file `db.js` mà chứa kết nối đến database (chúng ta sẽ tạo phía sau)
* Tạo một `express()` instance và gán nó cho biến `app`.
Express instance sẽ cho chúng ta các methods như `get, post, delete, patch` để chúng ta gửi các `HTTP` request tới server.
Và vì chúng ta xây dựng các API nên các request của chúng ta sẽ gửi đi dữ liệu và nhận dữ liệu từ server dưới dạng [json](https://www.w3schools.com/whatis/whatis_json.asp)
* Vào terminal gõ lệnh `yarn start`, nếu bạn thấy dòng chữ `Server running on port 3000` tức là bạn đã setup thành công một server express.
## 2.6 Kết nối với database
* Mở file `db/db.js`, và gõ những dòng code sau:
```
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
})
```
* Trong đoạn code trên chúng ta require `mongoose` và sử dụng method connect của mongoose, nhận vào tham số thứ nhất là chuỗi URL kết nối database, và một object option là tham số thứ 2.
## 2.7 Tạo model User
* File `/models/User.js`
```js
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
```
* Dòng thứ 6, chúng ta tạo một userSchema bằng **mongoose.schema()**. Đây là một object định nghĩa các thuộc tính (property) khác nhau của user schema. Mongoose sẽ chuyển đổi user schema này sang **document** trong database MongoDb và các thuộc tính sẽ được chuyển thành các trường trong document.
* Ở đây khi định nghĩa các thuộc tính, chúng ta sẽ định nghĩa các đặc điểm của chúng (loại, có require hay không, có unique hay không, chữ thường hay chữ hoa...) Mongoose đã hỗ trợ chúng ta làm điều đó. Ngoài ra ta sử dụng package [`validators`](https://www.npmjs.com/package/validator) cung cấp nhiều function giúp dễ dàng định nghĩa các validate, chẳng hạn như `isEmail`.
* Chúng ta cũng lưu một danh sách các token vào database. Mỗi lần user đăng kí hay log in, chúng ta sẽ tạo một token và gắn nó vào trong danh sách token. Việc lưu  một danh sách các token sẽ giúp người dùng có thể log in từ nhiều thiết bị khác nhau và một khi họ log out từ một thiết bị, chúng ta vẫn đảm bảo được họ vẫn được log in ở các thiết bị khác.
* Từ dòng 36 đến 43 chúng ta cũng sử dụng hàm `pre-save` mà mongoose cung cấp sẵn cho chúng ta. Nó cho phép chúng ta làm gì đó trước khi lưu object. Ở đây, chúng ta sẽ hash mật khẩu trước khi lưu object. Vì như bạn biết chúng ta sẽ không lưu mật khẩu của người dùng dưới dạng thô để đảm bảo tính bảo mật. Ngoài ra ở đây, chúng ta chỉ thực hiện hash password nếu chúng được thay đổi, đấy là lý do tại sao chúng ta sẽ kiểm tra password có được chỉnh sửa hay không trước.
* Một điều đáng lưu ý nữa, là Mongoose cho phép chúng ta định nghĩa **instance method** và **model method**
    * **Model method** là các phương thức được định nghĩa trên model, được tạo ra bởi `schema static`.
    * **instance method** định nghĩa trên instance hay cũng là document.
* Ở đây, chúng ta định nghĩa 1 instance method là `generateAuthToken`, sử dụng phương thức **sign** của **jwt** để tạo một token dựa trên `JWT_KEY` mà chúng ta lưu trong `.env`. Một khi token được tạo, chúng ta sẽ thêm nó vào danh sách token của user, lưu và trả về token.
* Chúng ta định nghĩa một model method là `findByCredentials`, nhận vào 2 tham số là user email và password. Chúng ta sẽ tìm user nào có email đó sử dụng phương thức **find** của mongoose. Nếu không tìm thấy user, chúng ta sẽ ném một error cho user biết rằng định danh user cung cấp không hợp lệ. Nếu email tồn tại, chúng ta tiếp tục so sánh password người dùng nhập vào với password đã được hashed trong database dựa trên cơ chế **compare** của **bcrypt**, nếu giống nhau chúng ta sẽ trả về user đó. Chúng ta sẽ sử dụng function này để cho user đăng nhập vào ứng dụng.
* Cuối cùng chúng ta tạo một model User sử dụng `mongoose.model('User', userSchema)`, sau đó export ra module để có thể tái sử dụng ở các file khác.
## 2.8 Tạo các route cần thiết
* Chúng ta sẽ tạo các endpoint sau
    * `HTTP POST /users`: Đăng kí user
    * `HTTP POST /users/login`: User đăng nhập
    * `HTTP GET / users/me`: Lấy profile của user.
    * `HTTP POST /users/logout`: User đăng xuất
    * `HTTP post /users/logoutall`: Đăng xuất từ tất cả các thiết bị
* Bắt đầu với route tạo user. File `/routers/user.js`:
```js
const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})
```
* Route đăng kí user sẽ tạo một user theo thông tin người dùng lấy ra từ **req.body**. Sau khi lưu user, chúng ta sẽ tạo một **authentication token** và trả về trong response cùng với user data.
* Test bằng postman: Sử dụng type of data là `JSON(application/json)`, nhấn vào button `raw`, cung cấp các trường dữ liệu require như name, email, password.
![](https://images.viblo.asia/d2ee004a-ff49-425e-ae8d-28c5ca5bc871.png)
* Route login một user đã đăng kí: `POST /users/login`
```js
router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
```
* Cung cấp một object gồm email và password cho phần body của request. Test bằng postman:
![](https://images.viblo.asia/f3f2fc6d-f10b-4a53-a3a4-2108bbc42df0.png)

## 2.9 Tạo một auth middleware
* Middleware là một phần code như cầu nối giữa database và ứng dụng. Khi một request được gửi tới server, middleware sẽ chạy trước khi request tới server và trả về một response. Chúng ta đảm bảo rằng một người cố gắng truy cập vào nguồn resource nhất định có được ủy quền truy cập hay không.
* File `/middleware/auth.js`:
```js
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth
```
* Một express middleware là một hàm nhận vào 3 tham số: `request, response, next`. Ở dòng thứ 5, chúng ta lấy token từ request header và vì token có format `Bearer[space]token`, chúng ta sẽ phải replace `Bearer[space]` với ''.
* Một khi chúng ta có token chúng ta sử dụng `JWT verify method` để kiểm tra token nhận được là hợp lệ chưa và có được tạo từ JWT_KEY hay không. Method verify của JWT trả về một `payload` mà được dùng để tạo token (ở đây token đc tạo với id của user).
* Bây giờ chúng ta có payload từ token, chúng ta sẽ tìm một user mà có id từ payload. Nếu tìm thấy user chúng ta sẽ gắn user vào request (`req.user = user`), gắn token vào request.
* Sau cùng, ta gọi phương thức `next()` để đi tới middleware tiếp theo. Nếu next() không được gọi, ứng dụng sẽ bị đông cứng ở điểm đó và sẽ không xử lý đc đoạn code còn lại tiếp theo đó.
* Bây giờ là lúc sử dụng middleware auth. Mở file `/routers/user.js`, import middleware auth bằng việc require nó đầu file sau khi require user model
```js
const auth = require(../middleware/auth)
```
* Route lấy profile:
```js
router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})
```
* Chỉ với 2 dòng của code chúng ta đã lấy được user profile. Dòng 1, chúng ta viết một get request tới `/users/me` endpoint, truyền vào auth middleware trước method để đảm bảo middleware sẽ chạy trước phần còn lại của hàm. Dòng thứ 3 chúng ta đơn giản chỉ việc lấy user profile từ request, khi middleware đã được thông qua rồi. Và gửi response trả về `res.send(req.user)`
* Test bằng postman. Nhập đúng đường URL, Chọn tab `Authorization`, chọn `Bearer Token` từ dropdown, và cung cấp authentication token phía bên phải, token này bạn nhận được sau khi login.
![](https://images.viblo.asia/db999564-a323-4ba5-b212-b3d840f3f6bd.png)

## 2.10 Logout và Logout từ tất cả các thiết bị
* Route logout, File `/routers/user.js`:
```js
router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})
```
* Chúng ta filter mảng token của user lấy ra những token khác với giá trị token từ request mà ta lấy được khi user login, sau đó lưu lại user. Giờ đây, khi ta get user profile, chúng ta sẽ bị từ chối truy cập bởi vì chúng ta không còn login nữa.
*  Test bằng postman: Đầu tiên chúng ta login để lấy token từ response, sau đs qua url `/users/me/logout` và sử dụng token vừa lấy như là một Bearer Token. Nhấn send, một response code 200 sẽ được trả về. Khi truy cập `/users/me` với token mà chúng ta sử dụng để log out, chúng ta sẽ được response lỗi như dưới đây:
![](https://images.viblo.asia/4de9a1f2-2f88-48ff-a8ae-8e8338e3b580.png)
* Route logout tất cả các thiết bị:
```js
router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
```
* Chúng ta sử dụng phương thức splice để remove tất cả tokens từ mảng token của user. Sau đó save document.
* Test bằng postman: Sử dụng `/users/login` login 3 lần.  Bạn sẽ có 3 token trong mảng token của user. Vào `/users/me` để xem profile. Sử dụng `/users/me/logoutall`, nó sẽ xóa hết mảng token. Vào lại `/users/me`, bạn sẽ không thể xem được user profile được nữa.
# 3 Kết luận
* Qua bài viết trên chúng ta đã hiểu được sơ bộ token là gì và các sử dụng token để authentication và authorization, dùng token để logout từ một thiết bị và tất cả các thiết bị. Mong các bạn sẽ học được nhiều thứ từ bài viết này.
* Tham khảo https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
* Link bài viết gốc https://huongvnq.github.io/2021/08/25/jwt-nodejs/