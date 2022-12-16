![Cover](https://images.viblo.asia/f43918fd-845f-4372-929c-c0bca8ea23e1.png)

# Express
Đối với các bạn làm backend node thì chắc hẵn không còn lạ lẫm gì với framework [Express](http://expressjs.com/). Nó là một web framework cực kỳ mạnh mẽ và dễ sử dụng. Nó giúp những bạn đã có kiến thức về javascript có thể dễ dàng tạo ra một con server mà không nhất thiết phải học thêm một ngôn ngữ khác.

# Decorators
Decorators là một khái niệm khá phổ biến đối với các ngôn ngữ lập trình: chúng ta có `attributes` trong C#, trong Java người ta gọi là `annotations`, còn trong Python thì gọi là `decorators`. Trong JavaScript cũng có khái niệm này và nó khá giống với decorators trong Python, có lẽ đó là lý do tại sao cái tên `decorators` trong JavaScript được lấy tên tương tự và có các tính năng tương đương.

Để hiểu rõ hơn các ạn có thể đọc [tại đây](https://viblo.asia/p/ecmascript-decorators-xQMGJOmNeam)

# Getting Started
Trước khi bắt đầu, mình cũng xin nói sơ qua về [`de-express`](https://github.com/htdangkhoa/de-express). Đây là một thư viện mình đã viết và lấy cảm hứng từ [`NestJS`](https://nestjs.com). Giúp các bạn có thể sử dụng [`Express`](http://expressjs.com) với `decorators` thay vì cách viết thông thường:
```js
app[method]('<path>', (request, response) => {
    // Doing something...
})
```

hoặc

```js
router[method]('<path>', (request, response) => {
    // Doing something...
})
```

Mình sẽ cố gắng có một bài viết nói rõ hơn về cách mình đã viết `de-express`. Ở thời điểm mình viết bài này, phiên bản của `de-express` đang là `1.0.1`.

## Install
```bash
$ yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/plugin-transform-runtime
# npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env @babel/plugin-transform-runtime

$ yarn add -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
# or npm install --save-dev @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties

$ yarn add de-express
# or npm install de-express
```

## Structure
```
.
├── src
│   ├── controllers
│   │   └── example.controller.js
│   ├── modules
│   │   └── example.module.js
│   └── index.js
├── .babelrc
└── package.json
```

## .babelrc
```json
{
  "presets": ["@babel/env"],
  "plugins": [
    "@babel/transform-runtime",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/proposal-class-properties", { "legacy": true }]
  ]
}
```

## example.controller.js
```js
import { Get } from 'de-express/decorator';

class ExampleController {
  @Get()
  async greeting(
      req, // (Optional) if you need to get query or body from request.
      res, // (Optional) if you want to custom response.
  ) {
    return { message: 'Hello world!!!' };
  }
}

export default ExampleController;
```

## example.module.js
```js
import { Module } from 'de-express/decorator';
import ExampleController from '../controllers/example.controller';

export default
@Module(ExampleController)
class ExampleModule {}
```

## index.js
```js
import Factory from 'de-express';
import ServerError from 'de-express/middleware/server-error';
import NotFoundError from 'de-express/middleware/not-found-error';
import ExampleModule from '../modules/example.module';

const port = process.env.PORT || 8080;

const isLog = process.env.NODE_ENV !== 'production';

const { app } = Factory.create(ExampleModule, isLog).applyMiddlewares(
  ServerError(),
  NotFoundError(),
);

const bootstrap = () => {
  app.listen(port, () => {
    console.log(`Server is serving on port ${port}...`);
  });
};

bootstrap(); // => Server is serving on port 8080...
```

## Run it
```bash
$ yarn run babel-node src/index.js
```

# Tổng kết
Như vậy, mình đã giới thiệu với các bạn một cách viết mới cho [Express](http://expressjs.com) bằng việc sử dụng `decorators`.

Với cách viết này:
- Các bạn có thể chia nhỏ dự án của bạn thành nhiều `module`.
- Tách bạch được nơi xử lý logic và dễ dàng viết `Unit testing`.
- Hỗ trợ `async/await`.

# References
- [Express](http://expressjs.com)
- [EcmaScript Decorators](https://viblo.asia/p/ecmascript-decorators-xQMGJOmNeam)
- [NestJS](https://nestjs.com)
- [de-express](https://github.com/htdangkhoa/de-express)