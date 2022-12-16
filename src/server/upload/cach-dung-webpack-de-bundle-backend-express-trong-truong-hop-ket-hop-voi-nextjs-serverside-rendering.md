# 1. Giới thiệu
Mình bắt đầu học nextjs vài ngày trước, nhưng ngay khi setup nextjs với express server để làm serverside render gặp lỗi khi cố gắng dùng webpack để bundle server code. Search trên mạng không thấy nên đành mày mò tự làm, thấy khá hay nên chia sẽ mong giúp ích cho bạn nào đang bị vướng ở chỗ này.

Môi trường muốn cài đặt:
- Nextjs với syntax >es6, cái này sẽ được webpack built-in của nextjs giải quyết.
- Server Node.js dùng Express và cú pháp Typescript ( để tích hợp inversifyjs triển khai IOC cho app, khá tiện cho mấy ông php sang node =)) ) , server cũng sẽ được build và bundle sử dụng webpack

Tại sao lại sử dụng webpack cho server ?  Chúng ta không nhất thiết phải dùng webpack để build và bundle ở code js serverside,  nhưng dùng nó sẽ cho chúng ta một số tiện lợi sau:
- Có thể minify, xóa comment, console log, để tăng tốc độ tải và chỉ cần deploy 1 file nếu muốn.
- Có thể sử dụng các file media, css... như là module (với rất nhiều loader có sẵn trong webpack extensions sẽ giúp chúng ta làm rất nhiều thứ).
- Có thể thay đổi code server mà không cần restart (thực ra cái này ko cần webpack chúng ta cũng có thể làm được nhưng thích thì dùng thôi :v )
 
# 2. Vấn đề
Nếu bạn từng dùng express và react làm serverside rendering thì chúng ta dùng hàm renderToString() để render react component từ route check được qua url và ném vào html string trả về, tuy nhiên nextjs là 1 framework out of box ( thứ tiện lợi mà lại làm nhiều người ghét :v ) nên những logic đó hoàn toàn nằm trong cái hộp rồi, chúng ta chỉ cần dùng:

```
import express from "express";
import next from "next";
import {Request, Response} from "next";
const server = express();
const dev = process.env.NODE_ENV !== 'production';
const app = next({
	dev,
	dir: './client',
});
app.prepare().then(() => {
	server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
})
server.listen(8000, () => {
  console.log('server started at http://localhost:8000');
});
```

Chỉ vài dòng code này là đã thực hiện xong việc serverside rendering, tuy nhiên nếu bạn dùng webpack để bundle code này thì sẽ xảy ra lỗi, vì bên trong nextjs đã có webpack built-in rồi nên chúng ta dùng webpack để bundle code qua webpack thì sẽ xảy ra lỗi. (mình đoán thế =)) )
[](https://stackoverflow.com/questions/57916792/cant-use-nextjs-expressjs-with-typescript-and-webpack)

# 3. Cách giải quyết.
Chúng ta sẽ tạo ra 1 file js với syntax CommonJs để import server.js (bundle file từ server) và phần bundle từ nextjs webpack built-in

index.js
```
const next = require('next');
const server = require('../build/server.js').default;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
	dev,
	dir: './client',
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
	server.all('*', (req, res) => {
    return handle(req, res);
  })
})
```

server.ts
```
import express from "express";

const server = express();

const dev = process.env.NODE_ENV !== 'production';

server.listen(8000, () => {
  console.log('server started at http://localhost:8000');
});

export default server
```

Như vậy chúng ta sẽ có phần server và client sử dụng webpack với config khác nhau, hoàn toàn không chồng chéo và xung đột.

webpack.config.js
```
const path = require('path');
const isProduction = false;
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';
module.exports = {
  entry: './server/server.ts',
  target: 'node',
  mode,
  devtool,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.json' ]
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
    library: 'server',    // very important line
    libraryTarget: 'umd',    // very important line
    umdNamedDefine: true     // very important line
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};
```

# Kết
Mình vẫn nghĩ có cách để setting cho dùng trực tiếp webpack để bundle cho file có import nextjs, bạn nào tìm ra rồi chia sẻ nhé :v: