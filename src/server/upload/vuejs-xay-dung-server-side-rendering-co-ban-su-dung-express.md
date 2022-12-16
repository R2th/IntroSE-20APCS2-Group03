# Cài đặt

Chúng ta sẽ làm việc với webpack-simple template giản của vue-cli

```
# Tạo mới project
$ vue init webpack-simple vue-ssr-example
$ cd vue-ssr-example

# Install dependencies
$ yarn # (or npm install)
```

Chúng ra cũng cần thêm một số package sau:

```
# Install with yarn ...
$ yarn add express vue-server-renderer
$ yarn add vue-ssr-webpack-plugin -D

# ... or with NPM
$ npm install express vue-server-renderer
$ npm install vue-ssr-webpack-plugin -D
```

# Chuẩn bị

Đầu tiên là tạo `file src/main.server.js` dành riêng cho server có nội dung như sau:

```js
src/main.server.js
===================================

import Vue from 'vue';
import App from './App.vue';

// Receives the context of the render call, returning a Promise resolution to the root Vue instance.
export default context => {
  return Promise.resolve(
    new Vue({
      render: h => h(App)
    })
  );
}
```

Tiếp theo là phải lại file `index.html` 1 chút

Thay thế `<div id=”app”></div>`thành `<!–vue-ssr-outlet–>`, như sau:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>vue-ssr-example</title>
  </head>
  <body>
    <!--vue-ssr-outlet-->
    <script src="/dist/build.js"></script>
  </body>
</html>
```

# Cấu hình Webpack 

Bây giờ chúng ta cũng tạo 1 file `webpack.server.config.js` là file cấu hình dành cho server bundle. Copy nội dung từ file `webpack.config.js`

Nhưng có một vài chỗ thay đổi như  sau:

```js
const path = require('path')
const webpack = require('webpack')
// Load the Vue SSR plugin. Cái này không thể thiếu được
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

module.exports = {
  target: 'node',
  // The entry should be our server entry file, not the default one.
  entry: './src/main.server.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',
    // Outputs node-compatible modules instead of browser-compatible.
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  // We can remove the devServer block.
  performance: {
    hints: false
  },
  // Avoids bundling external dependencies, so node can load them directly from node_modules/
  externals: Object.keys(require('./package.json').dependencies),
  devtool: 'source-map',
  // No need to put these behind a production env variable.
  plugins: [
    // Add the SSR plugin here.
    new VueSSRPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
```

# Build Config
Chúng ta phải cập nhật  lại build script trong file `package.json` để có thể build được cả phía `client` và phía `server`

```js
package.json
==========================

{
  ...
  "scripts": {
    ...
    "build": "npm run build:server && npm run build:client",
    "build:client": "cross-env NODE_ENV=production webpack --progress --hide-modules",
    "build:server": "cross-env NODE_ENV=production webpack --config webpack.server.config.js --progress --hide-modules"
  },
  ...
}
```

# Server Script

Bây giờ, chúng ta tiến hành tạo file `server.js` để thực render ứng dụng.


```js
server.js 
===============================

#!/usr/bin/env node

const fs = require('fs');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');

const bundleRenderer = createBundleRenderer(
  // Load SSR bundle
  require('./dist/vue-ssr-bundle.json'),
  {
    template: fs.readFileSync('./index.html', 'utf-8')
  }
);

// Khởi tạo express
const app = express();

// Serve static assets from ./dist on the /dist route.
app.use('/dist', express.static('dist'));

// Render tất cả routes
app.get('*', (req, res) => {
  bundleRenderer
    .renderToStream({url: req.path})
    .pipe(res);
});

app.listen(8080);
```

# Chạy ứng dụng

Tất cả đã hoàn tất,  bây giờ để khởi chạy bạn chỉ cần chạy 2 lệnh sau

```
$ npm run build
$ node ./server.js
```

Sau đó truy cập vào địa chỉ `http://localhost:8080`. Chúc các bạn thành công.!