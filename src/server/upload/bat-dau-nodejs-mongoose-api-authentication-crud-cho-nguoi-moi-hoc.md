Trong bài viết này, mình và các bạn sẽ cùng thực hiện Authentication và CRUD của 1 ứng dụng Nodejs API một cách đơn giản, phù hợp với những bạn mới học và mới bắt đầu tiếp cận với nodejs.
# 1. Chuẩn bị
* JavaScript
* Node.js
* Postman
* Express (JS framework)
* MongoDB (Database)
* Npm (quản lý các package)
* Visual Studio Code (hoặc Sublime Text)
# 2. Tạo Project 
Đầu  tiên hãy tạo 1 thư mục để triển:
```
~~$ mkdir MyNodeProject
~~$ cd MyNodeProject
...:~/MyNodeProject$ npm init
```
Đến đây bạn đã có 1 file `package.json`:
```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
Tiếp theo bạn cần thiết lập Express bằng cách:
```
...:~/MyNodeProject$ npm i express
```
File `package.json` của bạn sẽ có dạng như này:
```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.4"
  }
}
```

Rồi, bạn tạo 1 file `index.js` giống như `main` ở trong `package.json`
```
...:~/MyNodeProject$ touch index.js
```
Trong file `index.js` sẽ cần thiết lập như sau:
```javascript
const express = require('express')
const app = express()
const PORT = 8797
app.use('/', (req, res) => {
    res.json({"mess": "Hello Would!"})
})

app.listen(PORT, () => {console.log("Server started on http://localhost:"+PORT)})

module.exports = app;
```
Thử start nhé:
```
...:~/MyNodeProject$ node index.js
```
Và mở Postman chạy `http://localhost:8797`, bạn sẽ có được:
![](https://images.viblo.asia/9366fe60-ea79-4d42-8c6f-0d4b7a171505.png)

Để server tự động start lại sau khi có sự thay đổi thì bạn cần cài `nodemon`:
```
...:~/MyNodeProject$ npm i nodemon
```
Và thiết lập `package.json` như sau:
```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "devstart": "nodemon run index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.4",
    "nodemon": "^1.18.10"
  }
}
```
Chạy:
```
...:~/MyNodeProject$ npm run devstart
```
**Các package cần dùng:**
* **body-parser** (parse các request tới server)
* **express** (làm cho ứng dụng chạy)
* **nodemon** (restart khi có thay đổi xảy ra)
* **mongoose** (mô hình hóa object data để đơn giản hóa các tương tác với MongoDB)
* **bcrypt** (hashing và salting passwords)
* **express session** (xử lý sessions)
* **connect-mongo** (lưu trữ session trong MongoDB)
* **dotenv** (sử dụng .env)
* **express-validator**
* **morgan**
```
...:~/MyNodeProject$ npm i body-parser mongoose bcrypt express session connect-mongo dotenv express-validator morgan
```
# 3. Authentication
## 3.1. Connect MongoDB
Ở bài này mình sẽ kết nối db ở https://mlab.com/
![](https://images.viblo.asia/bebb1a18-3dbe-498b-a9e7-a7929b9f699f.png)
![](https://images.viblo.asia/4cb7ca3d-3f77-4656-acf2-57c636584145.png)

Bấm CONTINUE và đặt DATABASE NAME là `mynodeproject_db`![](https://images.viblo.asia/14321a74-9e60-4f59-9ab4-7c84fde20734.png)

Đến đây, bạn hãy tạo 1 database user, và bạn đc cũng cấp 1 link connect db: 

`mongodb://<dbuser>:<dbpassword>@ds111549.mlab.com:11549/mynodeproject_db`

Quay trở lại với project, tạo 1 file `.env` ngang hàng với `index.js`

```
DB_URL = mongodb://<dbuser>:<dbpassword>@ds111549.mlab.com:11549/mynodeproject_db
PORT = 8797
```
Thay thế `<dbuser>` và `<dbpassword>` bằng database user và password bạn vừa tạo.

Rồi, trong file `index.js`
```javascript
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 8797
const db = mongoose.connection;

dotenv.config()

//connect db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
    console.log('DB connection error:', err.message);
})

app.use('/', (req, res) => {
    res.json({"mess": "Hello Would!"})
})

app.listen(PORT, () => {console.log("Server started on http://localhost:"+PORT)})

module.exports = app;
```
Chạy lại `npm run devstart` để kiểm tra kết nối.
## 3.2. Register User
### 3.2.1. Models
Từ thư mục root, tạo `src/models/UserModels.js`
```javascript
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, unique: true, required: true, trim: true},
    username: {type: String, required: true, trim: true, minlength: 2},
    role: {type: String, enum: ['admin', 'customer']},
    password: {type: String, required: true, trim: true, minlength: 6},
    password_confirm: {type: String, required: true, trim: true, minlength: 6},
});

module.exports = mongoose.model('User', userSchema)
```
### 3.2.2. Controllers
Tại `src/controllers/UserControllers.js`
```javascript
const User = require('../models/UserModels')
const bcrypt = require('bcrypt')

exports.register = function(req, res, next){    
    User.findOne({email: req.body.email}, (err, user) => {
        if(user == null){ //Kiểm tra xem email đã được sử dụng chưa
            bcrypt.hash(req.body.password, 10, function(err, hash){ //Mã hóa mật khẩu trước khi lưu vào db
                if (err) {return next(err);}
                const user = new User(req.body)
                user.role = ['customer'] //sau khi register thì role auto là customer
                user.password = hash;
                user.password_confirm = hash;
                user.save((err, result) => {
                    if(err) {return res.json({err})}
                    res.json({user: result})
                })
            })
        }else{
            res.json({err: 'Email has been used'})
        }
    })
}
```
### 3.2.3. Validator
Tạo `src/validators/validator.js`
```javascript
const User = require('../models/UserModels')

exports.UserValidator = function(req, res, next){
    //name
    req.check('email', 'Invalid email.').isEmail();
    req.check('email', 'Email is required.').not().isEmpty();
    req.check('username', 'Username is required.').not().isEmpty();
    req.check('username', 'Username must be more than 1 characters').isLength({min:2});
    req.check('password', 'Password is required.').not().isEmpty();
    req.check('password', 'Password must be more than 6 characters').isLength({min:6});
    req.check('password_confirm', 'Password confirm is required.').not().isEmpty();
    req.check('password_confirm','Password mismatch').equals(req.body.password);

    //check for errors
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
}
```
### 3.2.4. Routes 
Tạo `src/routes/routes.js`
```javascript
const express = require('express')
const router = express.Router()
const {register} = require('../controllers/UserControllers')
const {UserValidator} = require('../validators/validator')

router.post('/register', UserValidator, register)

module.exports = router;
```
### 3.2.5. Cấu hình lại `index.js` 
```javascript
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const routes = require('./src/routes/routes')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 8797
const db = mongoose.connection;

dotenv.config()

//connect db
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
    console.log('DB connection error:', err.message);
})

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())

app.use('/', routes)

app.listen(PORT, () => {console.log("Server started on http://localhost:"+PORT)})

module.exports = app;
```
### 3.2.6. Test
![](https://images.viblo.asia/f15ea358-3cde-49f1-8041-f2bf1ea84585.png)
## 3.3. Login
### 3.3.1.  index.js
```javascript
/*
...
*/
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
/*
...
*/
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));
/*
...
*/
```
### 3.3.2. Controllers
```javascript
exports.login = function(req, res){
    User.findOne({email: req.body.email}).exec(function(err, user){
        if(err) {
            return res.json({err})
        }else if (!user){
            return res.json({err: 'Username and Password are incorrect'})
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(result === true){
                req.session.user = user
                res.json({
                    user: user,
                    "login": "success"
                })
            }else{
                return res.json({err: 'Username and Password are incorrect'})
            }
        })
    })
}
```
### 3.3.3. Routes
```javascript
/*
...
*/
const {register, login} = require('../controllers/UserControllers')

function requiresLogout(req, res, next){
    if (req.session && req.session.user) {
        return res.json({err: 'You must be Logout in to Login continue'});        
    } else {
        return next();
    }
}
router.post('/login', requiresLogout, login)
/*
...
*/
```
## 3.4. Logout
### 3.4.1. Controllers
```javascript
exports.logout = function(req, res){
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return res.json({err});
            } else {
                return res.json({'logout': "Success"});
            }
        });
    }
}
```
### 3.4.2. Routes
```javascript
/*
...
*/
const {register, login, logout} = require('../controllers/UserControllers')

function requiresLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.json({err: 'You must be logged in to view this page.'});
    }
}

router.get('/logout', requiresLogin, logout)
/*
...
*/
```
# 4. CRUD posts
## 4.1. Models
```javascript
//  src/models/PostModels.js


const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Topic = require('./TopicModels')

const postSchema = new Schema({
    title: {type: String, required: true, minlength: 4, maxlength: 150},
    content: {type: String, required: true, minlength: 4, maxlength: 2000},
    poster: {type: Schema.Types.ObjectId, ref: 'User'},
    created: {type: Date, default: Date.now},
    updated: {type: Date}
});

module.exports = mongoose.model('Post', postSchema)
```
## 4.2. Validator
```javascript
//  src/validators/validator.js

/*
...
*/
exports.PostValidator = function(req, res, next){
    //title
    req.check('title', 'Title is required.').notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters').isLength({min:4, max:150});
    //content
    req.check('content', 'Write a content').notEmpty();
    req.check('content', 'Content must be between 4 to 2000 characters').isLength({min:4, max:2000});

    //check for errors
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
}
```
## 4.3. Controllers
```javascript
//  src/controllers/PostControllers.js



const Post = require('../models/PostModels')

exports.listPost = function(req, res){
    const col = 'title content poster created updated'
    Post.find({}, col, (err, posts) => {
        if(err) {return res.json({err})}
        res.json({posts: posts})
    })
}

exports.detailPost = function(req, res){
    Post.findById(req.params.id).populate('poster').exec(function(err, post) {
        if(err) {return res.json({err})}
        res.json({
            title: post.title,
            content: post.content,
            poster: post.poster.username,
            created: post.created,
            updated: post.updated
        })
    })
}

exports.createPost = function(req, res){
    const post = new Post(req.body)
    post.poster = req.session.user._id
    post.save().then(result => {
        res.json({post: result})
    })
}

exports.editPost = function(req, res){
    Post.findById(req.params.id, 'title content', (err, post) => {
        if(err) {return res.json({err})}
        post.title = req.body.title
        post.content = req.body.content
        post.updated = Date.now()
        post.save().then(result => {
            res.json({post: result})
        })
    })
}

exports.deletePost = function(req, res){
    Post.remove({_id: req.params.id}, (err) => {
        if(err) {return res.json({err})}
        res.json({'mess': 'Delete success'})
    })
}
```
## 4.4. Routes
```javascript
/*
...
*/
const {listPost, detailPost, createPost, editPost, deletePost} = require('../controllers/PostControllers')
const {PostValidator, UserValidator} = require('../validators/validator')
/*
...
*/
router.get('/posts', requiresLogin, listPost)
router.get('/post/:id',requiresLogin, detailPost)
router.post('/post/new', requiresLogin, PostValidator, createPost)
router.put('/post/:id/edit', requiresLogin, PostValidator, editPost)
router.delete('/post/:id', requiresLogin, deletePost)
```
# 5. End
Như vậy là đã hoàn thành chức năng Authentication và CRUD 1 cách đơn giản. Hi vọng là bài viết này sẽ 1 phần nào đó giúp được các bạn mới bắt đầu học Nodejs như mình.

Nếu thấy hay, hãy upvote, share để được đẹp trai và xinh gái hơn.