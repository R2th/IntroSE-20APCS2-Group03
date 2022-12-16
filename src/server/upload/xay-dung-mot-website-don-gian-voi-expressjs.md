Trong bài viết này mình sẽ giới thiệu cách để tạo một blog đơn giản với ExpressJS.
# Cài đặt và sử dụng ES6
Đầu tiên mình khởi tạo project:
```
mkdir blog
cd blog
npm init -y
npm install express
```
Tiếp theo mình sẽ tạo cấu trúc thư mục cho dự án:
![](https://images.viblo.asia/1dd9568f-3d87-4768-b765-2592cd1b5ccc.png)

Code cho file index.js:
```js
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => console.log('server is running in port 3000'));

```
## Cài đặt npm-run-all
Một vài lệnh shell có thể không chạy được trên môi trường window. Mình sử dụng package này để có thể chạy được trên nhiều môi trường khác nhau. Cài đặt:
```
npm install npm-run-all
```
## Cài đặt babel
Babel sẽ giúp chuyển code es6 về es5 để nodejs có thể hiểu và thực thi. Cài đặt:
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
```
Sau đó bạn tạo file .babelrc và thêm đoạn code sau:
```
{  "presets": ["@babel/preset-env"]}
```
Hoặc chạy lệnh dưới đây:
```
echo '{"presets": ["@babel/preset-env"]}' >> .babelrc
```
Tiếp theo thêm đoạn code sau vào file package.json:
```
"scripts": {
  "server": "babel-node ./app",
  "dev": "NODE_ENV=development npm-run-all server"
}
```
Bây giờ bạn có thể chạy đoạn code sau để chạy thử:
```
npm run dev
```
## Cài đặt nodemon
Nodemon là một package giúp bạn restart server mỗi khi có thay đổi ở file trong khi code. Cài đặt:
```
npm install --save-dev nodemon
```
Và cấu hình file nodemon.json:
```
{
  "exec": "npm run dev",
  "watch": ["app/*", "public/*"],
  "ext": "js, html, css, json"
}
```
Thay đổi trong file package.json:
```
"scripts": {
  "server": "babel-node ./app",
  "dev": "NODE_ENV=development nodemon --exec npm run server"
}
```
Từ giờ, khi bạn chạy `npm run dev`. Nếu có bất kỳ thay đổi nào ở thư mục `/app` và `/public` server sẽ tự động restart.
# Sử dụng ESLint trong dự án
Ở đây mình sẽ cài đặt theo cách đơn giản nhất:
```
npm install -g eslint
```
Tại thư mục của dự án, bạn chạy lệnh:
```
eslint --init
```
Rồi cấu hình theo hướng dẫn. Giờ thì bạn có thể áp dụng eslint, giúp code theo chuẩn dễ dàng hơn.
# Sử dụng mongoose
Cài đặt:
```
npm install mongoose
```
Tiếp theo thêm vào file app/index.js :
```js
import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blog';
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Database connection in ${DATABASE_URL}`);
});
```
# Sử dụng template engines
Ở đây mình sẽ sử dụng ejs:
```
npm install ejs
```
```js
// app/index.js

import path from 'path';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```
# CRUD Posts
## Model
```js
// app/models/post.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Post = mongoose.Model('Post', postSchema);

export default Post;
```
## Route
```js
import express from 'express';
import Post from '../models/post';

const postRouter = express.Router();

postRouter.get('/new', (req, res) => {
  res.render('posts/new');
});

postRouter.get('/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('posts/show', { post });
});

postRouter.get('/:id/edit', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('posts/edit', { post });
});

postRouter.post('/:id', async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { title, content } },
  );
  res.redirect(`/posts/${post.id}`);
});

postRouter.delete('/:id', async (req, res) => {
  await Post.remove({ id: req.params.id });
  res.redirect('/');
});

postRouter.post('/', async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.create({ title, content });
  res.redirect(`/posts/${post.id}`);
});

export default postRouter;
```

Ngoài ra thêm vào file app/routes/indes.js:
```js
import express from 'express';
import postRouter from './post';
import Post from '../models/post';

const appRouter = express.Router();

appRouter.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render('home', { posts });
});

appRouter.use('/posts', postRouter);

export default appRouter;
```

File app/index.js cuối cùng như sau:
```js
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import appRouter from './routes';

const app = express();
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blog';
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Database connection in ${DATABASE_URL}`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(appRouter);

app.listen(3000, () => console.log('server is running in port 3000'));

```
# Kết thúc
Mình vừa giới thiệu một website với chức năng CRUD cơ bản, ngoài ra bạn còn có thể kết hợp sử dụng babel và eslint trong quá trình phát triển dự án.