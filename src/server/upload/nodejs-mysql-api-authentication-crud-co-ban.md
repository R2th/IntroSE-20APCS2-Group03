Mình đã có một bài về [Bắt đầu Nodejs - Mongoose API (Authentication - CRUD) cho người mới học](https://viblo.asia/p/bat-dau-nodejs-mongoose-api-authentication-crud-cho-nguoi-moi-hoc-Eb85oa66Z2G)
sử dụng **Mongoose**.

Trong bài viết này, mình và các bạn sẽ làm một app API giỗng như bài trên, nhưng với phiên bản **Mysql** nhé.

Không dài dòng nữa. Nào. Bắt đầu thôi.
# 1. Chuẩn bị và tạo project
Những thứ cần **chuẩn bị** và tiến hành **tạo project** giống với  bài viết  [Bắt đầu Nodejs - Mongoose API (Authentication - CRUD) cho người mới học](https://viblo.asia/p/bat-dau-nodejs-mongoose-api-authentication-crud-cho-nguoi-moi-hoc-Eb85oa66Z2G) của mình.

Nhưng có chút thay đổi là cần phải chuẩn bị **MySql** thay vì **MongoDB** 

Và sử dụng package **mysql** và **express-mysql-session** thay cho **mongoose** và **connect-mongo**

Tương tự, chúng ta kiểm tra thành quả sau bước đầu chuẩn bị:
```
...:~/MyNodeProject$ npm run devstart
```
**Các package cần dùng:**
* **body-parser** (parse các request tới server)
* **express** (làm cho ứng dụng chạy)
* **nodemon** (restart khi có thay đổi xảy ra)
* **bcrypt** (hashing và salting passwords)
* **express session** (xử lý sessions)
* **dotenv** (sử dụng .env)
* **express-validator**
* **morgan**
* **express-mysql-session**
* **mysql**
* **mysql2**
* **sequelize**
* **sequelize-cli**
```
...:~/MyNodeProject$ npm i body-parser sequelize sequelize-cli mysql mysql2 express-mysql-session bcrypt express session dotenv express-validator morgan
```
Và mở Postman chạy GET http://localhost:8797
![](https://images.viblo.asia/fbcc3ad8-f938-4bcd-88d1-60d1a313c96b.png)
# 2. Configuration MySql
Tạo file `config.json` đơn giản và điền thông tin db của bạn:
```json
// config/config.json
{
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "mysql"
  }
}
```
Và `databaseConn.js`  cũng điền thông tin db tương ứng:
```javascript
// config/databaseConn.js

let Sequelize = require("sequelize");

let sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
```
`package.json` sẽ có dạng như thế này:
```json
{
  "name": "mynodeproject",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "devstart": "nodemon run index.js",
    "db:create": "npx sequelize db:create",
    "db:migrate": "npx sequelize db:migrate"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^3.0.6",
    "body-parser": "^1.19.0",
    "dotenv": "^8.0.0",
    "express": "^4.17.1",
    "express-mysql-session": "^2.1.0",
    "express-validator": "^5.3.1",
    "morgan": "^1.9.1",
    "mysql": "^2.17.1",
    "mysql2": "^1.6.5",
    "sequelize": "^5.8.8",
    "sequelize-cli": "^5.4.0",
    "session": "^0.1.0"
  }
}
```
Chạy:
```
...:~/MyNodeProject$ npm run db:create
```

## 2.1. Migration
Tạo file `0001_initUser.js` migration:
```javascript
// migrations/0001_initUser.js

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("admin", "customer"),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
      updated_at: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"),
      },
    }).then(() => {
      return queryInterface.addIndex("users", ["id"])
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};
```
Sau đó chaỵ:
```
...:~/MyNodeProject$ npm run db:migrate
```
![](https://images.viblo.asia/2e55ee54-2d07-4ac8-ba17-092770186c63.png)

## 2.2. Model
```javascript
// src/users/userModel.js

"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../config/databaseConn");

// table [extension]
let User = sequelize.define("users", {
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  role: {
    type: Sequelize.ENUM("admin", "customer"),
  },
}, {
  tableName: "users",
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      unique: true,
      fields: ["id"],
    },
  ],
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});

module.exports = {
  User,
};
```
# 3. Authentication
## 3.1. Register
Cần chỉnh lại file `index.js` một chút:
```javascript
// index.js

let express = require('express')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let expressValidator = require('express-validator')
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);

let app = express()
let PORT = 8797

let options = {
  host: "",
  port: "",
  user: "",
  password: "",
  database: ""
};
let sessionStore = new MySQLStore(options);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: true,
  saveUninitialized: false
}));
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())

app.use("/", require("./src/users/userControllers"));

app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
})

module.exports = app;

```
Tạo 1 file `userServices.js` để xử lý logic: 
```javascript
// src/users/userServices.js

let {User} = require("./userModel")
let bcrypt = require('bcrypt')

let findUser = async (body) => {
  return await User.findOne({
    where: {
      email: body.email,
    },
  });
}

let register = async (body) => {
  let user = await findUser(body);
  if(user == null){ //Kiểm tra xem email đã được sử dụng chưa
    bcrypt.hash(body.password, 10, async (err, hash) => { //Mã hóa mật khẩu trước khi lưu vào db
      if (err) {return next(err);}
      await User.create({
        username: body.username,
        email: body.email,
        role: "customer",
        password: hash,
      });
    })
    return true;
  }else{
    return false;
  }
}

module.exports = {
  register,
};
```
Tạo  file `userValidator.js` để validate body:
```javascript
// src/users/userValidator.js

let raiseErr = async (req) => {
  let errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    let err = errors.array();
    let firstError = err.map(error => error.msg)[0];
    return firstError
  }
  return null;
}

let registerValidator = async (req) => {
  req.check('email', 'email is required.').not().isEmpty();
  req.check('email', 'Invalid email.').isEmail();
  req.check('username', 'username is required.').not().isEmpty();
  req.check('username', 'Username must be more than 2 characters').isLength({min:3});
  req.check('password', 'password is required.').not().isEmpty();
  req.check('password', 'Password must be more than 6 characters').isLength({min:6});
  req.check('password_confirmation', 'password_confirmation is required.').not().isEmpty();
  req.check('password_confirmation','Password mismatch').equals(req.body.password);

  //check for errors
  return await raiseErr(req);
}

module.exports = {
  registerValidator,
};

```

Controllers:
```javascript
// src/users/controllers.js

let express = require("express");
let router = new express.Router();

let {register} = require("./userServices");
let {registerValidator} = require("./userValidator");

router.post("/users", async (req, res, next) => {
  try {
    let validator = await registerValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    } else {
      let registed = await register(req.body);
      if (registed == true) {
        return res.send({message: "Register successfully."});
      } else {
        return res.send({message: "Email has been used."});
      }
    }    
  } catch (error) {
    return res.status(500).send({error: "Server Error"});
  }
});

module.exports = router;
```
## 3.2. Log in
- `src/users/userServices.js`
```javascript
...
...
let signIn = async (req) => {
  let user = await findUser(req.body);
  if (user === null) {
    return false;
  } else {
    let comparePass = await bcrypt.compare(req.body.password, user.password);
    if (comparePass === false) {
      return false;
    } else {
      req.session.user = user;
      return true;
    }
  };
};

let isLogging = async (req) => {
  if (req.session && req.session.user) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  register,
  signIn,
  isLogging,
};
```
- `src/users/userValidator.js`
```javascript
...
...
let loginValidator = async (req) => {
  req.check('email', 'email is required.').not().isEmpty();
  req.check('email', 'Invalid email.').isEmail();
  req.check('password', 'password is required.').not().isEmpty();
  req.check('password', 'Password must be more than 6 characters').isLength({min:6});

  //check for errors
  return await raiseErr(req);
}

module.exports = {
  registerValidator,
  loginValidator,
};
```
- `src/users/userControllers.js`
```javascript
...
...
router.post("/login", async (req, res, next) => {
  try {
    let isLogged = await isLogging(req);
    if (isLogged === true) {
      return res.send({message: "You are logged in."});
    }
    let validator = await loginValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    }
    let signIned = await signIn(req)
    if (signIned === false) {
      return res.send({message: "Email or Password is incorrect"});
    } else {
      return res.send({message: "Sign In successfully."});
    }
  } catch (error) {
    return res.status(500).send({error: "Server Error"});
  }
});

module.exports = router;
```
## 3.3. Log out
- `src/users/userControllers.js`
```javascript
...
...
router.get("/logout", async (req, res, next) => {
  try {
    let isLogged = await isLogging(req);
    if (isLogged === false) {
      return res.send({message: "You are not logged in."});
    }
    req.session.user = null;
    return res.send({message: "Sign Out successfully."});
  } catch (error) {
    return res.status(500).send({error: "Server Error"});
  }
});

module.exports = router;
```
# 4. CRUD Posts
## 4.1 Migration
```javascript
// migrations/0002_initPosts.js

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      poster: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
      updated_at: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"),
      },
    }).then(() => {
      return queryInterface.addIndex("posts", ["id"])
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("posts");
  },
};
```
Run:
```
...:~/MyNodeProject$ npm run db:migrate
```
## 4.2. CRUD
```javascript
// src/users/userModel.js
...
let {Post} = require("../posts/postModel");
...
// Relationship
User.hasMany(Post, {
  as: "posts",
  foreignKey: "poster",
});

module.exports = {
  User,
};
```
```javascript
// src/posts/postModel.js

"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../../config/databaseConn");

// table [extension]
let Post = sequelize.define("posts", {
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
  poster: Sequelize.INTEGER,
}, {
  tableName: "posts",
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      unique: true,
      fields: ["id"],
    },
  ],
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});

module.exports = {
  Post,
};
```
```javascript
// index.js
...
app.use("/", require("./src/users/userControllers"));
app.use("/posts", require("./src/posts/postControllers"));
...
```
```javascript
// src/posts/postServices.js

let {User} = require("../users/userModel")
let {Post} = require("./postModel")

let findOneModel = async (model, id) => {
  return await model.findOne({
    attributes: {exclude: ["password", "role"]},
    where: {
      id: id,
    },
  });
}

let createPost = async (titlePost, contentPost, posterPost) => {
  let result = await Post.findOrCreate({
    where: {
      title: titlePost,
      content: contentPost,
      poster: posterPost,
    }
  });
  return result[0];
}

let getPost = async (postId) => {
  let getPost = await findOneModel(Post, postId);
  if (getPost === null) {
    return null
  }
  let getUser = null;
  if (getPost !== null) {
    getUser = await findOneModel(User, getPost.poster);
  }
  return {
    post: getPost,
    poster: getUser
  };
}

let updatePost = async (postId, titlePost, contentPost, posterPost) => {
  let getPost = await findOneModel(Post, postId);
  if (getPost === null) {
    return null
  }
  await Post.update({
    title: titlePost,
    content: contentPost,
    poster: posterPost,
  }, {
    where: {
      id: postId
    }
  })
  let result = await findOneModel(Post, postId);
  return result
}

let deletePost = async (postId) => {
  let getPost = await findOneModel(Post, postId);
  if (getPost === null) {
    return null
  }
  await Post.destroy({
    where: {
      id: postId
    }
  })
  return {}
}

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
```
```javascript
// src/posts/postValidator.js

let raiseErr = async (req) => {
  let errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    let err = errors.array();
    let firstError = err.map(error => error.msg)[0];
    return firstError
  }
  return null;
}

let postValidator = async (req) => {
  req.check('title', 'title is required.').not().isEmpty();
  req.check('content', 'content is required.').not().isEmpty();
  req.check('content', 'content must be less than 255 characters').isLength({max: 255});
  req.check('poster', 'poster is required.').not().isEmpty();
  req.check('poster', 'poster must be number.').isNumeric();

  //check for errors
  return await raiseErr(req);
}

module.exports = {
  postValidator,
};
```
```javascript
// src/posts/postControllers.js

let express = require("express");
let router = new express.Router();

let {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("./postServices");
let {postValidator} = require("./postValidator");

router.post("/", async (req, res, next) => {
  try {
    let titlePost = req.body.title;
    let contentPost = req.body.content;
    let posterPost = req.body.poster;

    let validator = await postValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    }
    let result = await createPost(titlePost, contentPost, posterPost);
    return res.send({
      message: "Create successfully.",
      data: result
    });
  } catch (error) {
    return res.status(500).send({error: "Server Error"});
  }
});

router.get("/:postId", async (req, res, next) => {
  try {
    let {postId} = req.params;
    let result = await getPost(postId);
    if (result === null) {
      return res.status(404).send({message: "Not found Post"});
    }
    return res.send({result});
  } catch (error) {
    return res.status(500).send({error: "Server Error"});
  }
});

router.put("/:postId", async (req, res, next) => {
  try {
    let {postId} = req.params;
    let titlePost = req.body.title;
    let contentPost = req.body.content;
    let posterPost = req.body.poster;

    let validator = await postValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    }

    let result = await updatePost(postId, titlePost, contentPost, posterPost);
    if (result === null) {
      return res.status(404).send({message: "Not found Post"});
    }
    return res.send({
      message: "Update successfully.",
      data: result
    });
  } catch (error) {
    return res.status(500).send({error: "Server Error"});
  }
});

router.delete("/:postId", async (req, res, next) => {
  try {
    let {postId} = req.params;
    let result = await deletePost(postId);
    if (result === null) {
      return res.status(404).send({message: "Not found Post"});
    }
    return res.send({
      message: "Delete successfully.",
      data: result
    });
  } catch (error) {
    return res.status(500).send({error: "Server Error"});
  }
});

module.exports = router;
```
# 5. End
Như vậy là đã hoàn thành chức năng Authentication và CRUD 1 cách đơn giản với phiên bản sử dụng MySql. Hi vọng là bài viết này sẽ 1 phần nào đó giúp được các bạn mới bắt đầu học Nodejs như mình.

Nếu thấy hay, hãy upvote, share để được đẹp trai và xinh gái hơn.