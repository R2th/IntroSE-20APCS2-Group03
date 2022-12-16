**Chào bạn, sau một khoảng thời gian nghỉ tết ngắn, chúng ta hầu hết đã trở lại với công việc và mình cũng không ngoại lệ. Dư âm tết vẫn còn đấy nhưng cũng không thể quên nhiệm vụ, thế là hôm nay mình đã trở lại với một bài viết mới với một chủ đề tuy cũ nhưng lại mới với bản thân mình, đó là xây dựng các ứng dụng `Server-Side Rendering (SSR)` trong `React` và đặc biệt hơn mình sẽ không theo 1 Framework SSR thông dụng nào cả (Ví dụ `Next`) mà sẽ tự xây dựng theo phong cách của bản thân. Nào bạn cùng theo dõi bài viết nhé :grinning: .**
# 1. Chuẩn bị
## Yêu cầu:
- Môi trường mình sẽ sử dụng:
  - window 10
  - node v12.14.0
  - yarn v1.22.4
  - editor: VSCode
- Có kiến thức cơ bản về `React`
- Có một chút kiến thức về `Webpack`
- Có một chút kiến thức về `SSR`

## Mục đích:
- Hiểu cách xây dựng một ứng dụng nhỏ theo xu thế `Single page application (SPA)` bằng `SSR`
- Tiền đề để bạn có thể đào sâu hơn về các công nghệ liên quan đến `SSR` trong `React`

## Những phần bỏ qua:
- Phần cấu hình mình sẽ không mô tả chi tiết trong bài viết, các bạn có thể theo dõi thông qua repo.
- Không giải thích các thuật ngữ, khái niệm cơ bản mà các bạn hoàn toàn có thể đọc thông qua trang chính thức của thư viện đó.
# 2. Nội dung
## Nói một chút về SSR trong React
Bạn sẽ thường nghĩ đến `SSR` là cách nội dung của một trang web (full html) được render trên server chứ không phải trên trình duyệt của người dùng (client) bằng `JavaScript`, và mọi trang đều làm cùng 1 cách như vậy, thường thì bạn sẽ thấy cách render này được sử dụng bởi các ngôn ngữ/ framework server như `PHP/ Java, .etc` và các tương tác phía client sẽ được triển khai bằng JavaScript.

Điều này gần như trái ngược với cách tiếp cận của `Client-Side Rendering (CSR)` đó là mỗi khi user truy cập vào một trang web, phía server sẽ gởi đến client một file html đơn giản có chưa các liên kết gồm link và script sau đó browser sẽ tiếp tục kích hoạt request để lấy các asset ấy, trong đó sẽ bao gồm 1 file `.js` (đóng gọi toàn bộ những thứ cần thiết để tạo markup thông qua JS), và sau đó `JavaScript engine` từ trình duyệt của client sẽ tạo ra markup dựa vào tệp `.js` đã được tải.

Theo cách hiểu của mình thì `SSR` trong `React` sẽ hơi khác một chút, trang đầu tiên (`initial page`) sẽ được render từ phía server và gửi đến trình duyệt của client, khi user điều hướng đến các trang tiếp theo sẽ render trực tiếp tại client (đối với cách áp dụng code-splitting thì sẽ cần tải thêm script từ phía server), render theo hướng này thường được gọi là `isomorphic/universal application`.

## Server dùng để render
Với bài viết này mình sẽ dùng Node server (với express framework) để xây dựng phần server-side vì tính phổ biến của nó, ngoài ra bạn cũng có thể dùng nhiều loại server khác.

## Khởi tạo ứng dụng
Tất nhiên là bạn hoàn toàn có thể tạo ứng dụng node bằng `yarn` hoặc `npm`, trong bài viết này mình sẽ dùng `yarn`.

#### Cài đặt thư viện

Mình sẽ cần cài một số lib quan trọng sau
```bash
# devDependencies
yarn add -D @babel/core @babel/preset-env @babel/preset-react babel-loader webpack@4 webpack-cli@3 webpack-node-externals

# dependencies
yarn add express react react-dom

# polyfill
yarn add core-js regenerator-runtime
```

#### Cấu hình để build

`.babelrc.js`
```js
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        corejs: require('core-js/package.json').version,
      },
    ],
    '@babel/react',
  ],
};
```

`webpack.config.js`
```js
const path = require('path');
const fs = require('fs');

const webpackNodeExternals = require('webpack-node-externals');

const rootDir = fs.realpathSync(process.cwd());
const srcDir = path.resolve(rootDir, 'src');
const buildDir = path.resolve(rootDir, 'build');

const common = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: srcDir,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules', srcDir],
    extensions: ['.js', '.jsx', '.json'],
  },
};

const clientConfig = {
  ...common,
  target: 'web',
  name: 'client',
  entry: {
    client: path.resolve(srcDir, 'client.js'),
  },
  output: {
    publicPath: '/',
    path: buildDir,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: module => /node_modules/.test(module.resource),
          enforce: true,
        },
      },
    },
  },
  devtool: 'eval-source-map',
};

const serverConfig = {
  ...common,
  target: 'node',
  name: 'server',
  entry: {
    server: path.resolve(srcDir, 'server.js'),
  },
  output: {
    publicPath: '/',
    path: buildDir,
    filename: 'server.js',
  },
  devtool: 'eval-source-map',
  externals: [webpackNodeExternals()],
  node: {
    __dirname: false,
  },
};

module.exports = [clientConfig, serverConfig];
```

Với webpack bạn có thể sử dụng một mảng chứa nhiều config khác nhau để có thể xử lý cho nhiều đầu vào và đầu ra khác nhau nhé.
Cụ thể ở đây sẽ chứa config cho `server` và `client`
Khi tiến hành build sẽ mong đợi 2 loại đầu ra sau
1. Cho phía client: `client.js` và `vendor.js`
2. Cho phía server: `server.js`

#### Tạo các component và entry point

`src/Html.jsx`
```jsx
import React from 'react';

const Html = ({ content, state, scripts }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Server Side Rendered React App !</title>
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.APP_STATE=${JSON.stringify(state)}`,
          }}
        />
        {scripts.map((script, index) => (
          <script key={index} src={script} />
        ))}
      </body>
    </html>
  );
};

export default Html;
```

component này sẽ được dùng để render toàn bộ nội dung html gửi đến client

`src/App.jsx`
```jsx
import React from 'react';

const App = ({ initialText }) => {
  const [text, setText] = React.useState(initialText);

  const handleTextChange = () => {
    setText('changed in the browser!');
  };

  return (
    <div>
      <p>{text}</p>
      <button onClick={handleTextChange}>change text</button>
    </div>
  );
};

export default App;
```

component này sẽ tạo ra nội dung cụ thể và được đưa vào bên trong `div có id là app`. bạn có thể xem nó giống như `App.jsx` mà các ứng dụng `CSR` thường làm.
Ngoài ra chúng ta sẽ thêm một event-handler đơn giản để thay đổi 1 đoạn text.

`src/server.js`
```js
import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Html from './Html';
import App from './App';

const app = express();
const port = 6969;

app.use(express.static(path.join(__dirname)));

app.get('*', async (req, res) => {
  const scripts = ['vendor.js', 'client.js'];
  const initialState = {
    initialText: 'rendered on the server side!',
  };

  const content = ReactDOMServer.renderToString(<App {...initialState} />);

  const html = ReactDOMServer.renderToStaticMarkup(
    <Html content={content} state={initialState} scripts={scripts} />,
  );

  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
```

Chúng ta sẽ dựng 1 server express đơn giản và serve các static file trong cùng folder sau khi build.
Phần quan trọng nhất của demo này, bạn sẽ thấy `app.get('*', async (req, res) => {})` và nó làm nhiệm vụ nhận mọi request từ phía client.
Đối với render React phía server chúng ta sẽ cần dùng `react-dom/server`. Mình sẽ dùng 2 phương thức `renderToString` và `renderToStaticMarkup`, về cơ bản thì 2 phương thức này là hoàn toàn tương tự nhau chỉ khác là `renderToString` sẽ cho phép event-handler sau khi đồng bộ với phía client và `renderToStaticMarkup` sẽ bỏ qua tất cả attribute mà React thêm vào DOM trong quá trình render
`scripts = ['vendor.js', 'client.js']`  2 file này sẽ được tạo ra khi ta tiến hành build client bằng webpack
Ngoài ra `initialState` sẽ được dùng để chứng minh việc render phía server lần đầu tiên.

`src/client.js`
```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// Lấy state từ một biến global được đưa vào HTML do server tạo
const initialState = window.APP_STATE;

ReactDOM.hydrate(<App {...initialState} />, document.getElementById('app'));
```

Chúng ta sẽ cần dùng `hydrate` thay cho `render` đây là yêu cầu khi bạn đã render ứng dụng từ phía server và muốn kết nối nó với phía client

#### Chạy demo

```bash
yarn start
```

Truy cập `http://localhost:6969`

![](https://images.viblo.asia/124ced8b-bf20-482e-a737-74a92425ac89.PNG)

Mọi thứ đã hoạt động mà không có lỗi gì xảy ra

Tiến hay thay đổi text bằng cách click vào button

![](https://images.viblo.asia/10db59b0-77b9-421e-b4c5-0b5d8fc9fec3.PNG)

Text được thay đổi trực tiếp từ phía client, đó chính xác là những gì chúng ta mong đợi.

Demo kết thúc.

# 3. Kết luận
Mọi thứ trông thật đơn giản bạn nhỉ :grinning:.

Đây chỉ mới được gọi là bước đệm, bước khởi đầu để chúng ta sẽ đi với `SSR` trong `React` trong tương lai.

Hi vọng bài viết này có ích và giúp bạn trong quá trình tiến tới hoàn thiện khả năng lập trình Web và đặc biệt là luôn giữ tình yêu với `React` :100:.

Nếu bạn cảm thấy thích thú với `SSR` trong `React` và mong muốn mình chia sẽ thêm về `state management, routing, fetching data, .etc` thì hãy comment bên dưới nhé.

Cảm ơn đã đọc bài viết này :clap:
[Repo tại đây](https://github.com/daint2git/viblo.asia/tree/master/react-ssr-express)