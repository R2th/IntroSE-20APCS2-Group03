Ok trong bài viết này, mình sẽ hướng dẫn các bạn cấu hình dự án [ReactJS](https://reactjs.org/) kết hợp [Webpack](https://webpack.js.org/) và [Babel](https://babeljs.io/). Bài viết này được thực hiện năm **2021** được cấu hình trên Webpack 5, như các bạn biết thì các bài viết cũ đa số là cấu hình trên Webpack 4, nếu bài viết này quá cũ bạn có thể tìm kiếm bài viết khác nha.

Mình sẽ không đi qua giải thích Webpack và Babel nữa, bạn có thể hiểu cơ bản **Webpack** là trình **đóng gói code Javascript** và **Babel** có nhiệm vụ **chuyển các đoạn code Javascript** trên phiên bản mới về lại phiên bản cũ phù hợp với các trình duyệt cũ hơn. Nào chúng ta bắt đầu thôi...

## 1. Khởi Tạo ReactJS

### Tạo Thư Mục, File Và Khởi Tạo NPM

Đầu tiên các bạn khởi tạo thư mục và cấu hình dự án npm mới:

```bash
$ mkdir react-webpack
$ cd react-webpack
$ npm init -y
```

> Ở đây mình dùng `npm init -y` để khởi tạo nhanh dự án, bạn nào không thích có thể dùng `npm init` để cấu hình từng phần chi tiết nha.

Sau khi chạy xong nó sẽ tạo ra được file `package.json` có nội dung tương tự như sau:

```json
{
  "name": "react-webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```


Tiếp theo bạn tạo một file `index.js` và file `index.html` tại thư mục `public` ở thư mục gốc của dự án. Tạo tiếp 1 file `App.js` nằm ở thư mục `src`, đây là file mình sẽ bắt đầu viết ReactJS vào. Sau khi tạo xong thư mục của bạn sẽ tương tự thế này:

![](https://images.viblo.asia/487bdf34-5117-43bd-b798-d2188da0edca.jpg)

### Cài Đặt ReactJS

Đầu tiên hãy cài `react` và `react-dom` với câu lệnh sau:

```bash
$ npm install --save react react-dom
```

Mở file `index.html` lên và thêm đoạn code sau:

> Ở đây thẻ `<noscript>` dùng thể yêu cầu trình duyệt mở Javascript.
> 
> Và thẻ `<div>` có id `root` dùng để render React.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
</html>
```

Thêm code vào file `index.js` nữa nhé:

```js
import React from "react";
import ReactDOM from "react-dom";
import App from './src/App';

ReactDOM.render(<App />, document.getElementById("root"));
```

Cuối cùng viết `Hello World` với React thôi, cũng dễ mà đúng ko :hugs:, mở file `App.js` và thêm đoạn code sau:

```js
import React from "react";

export default function App() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
```

## 2. Khởi Tạo Webpack

### Cài Đặt Webpack

Đầu tiên các bạn cài đặt tất cả những package sau:

```bash
$ npm install --save-dev webpack webpack-cli webpack-dev-server
```

1. `webpack` là gói thư viện chính.
2. `webpack-cli` dùng để chạy webpack.
3. `webpack-dev-server` dùng để chạy trong quá trình phát triển.

### Cấu Hình Webpack

Tạo file `webpack.config.js` nằm ở thư mục gốc của dự án và thêm như sau:

```js
const path = require("path");

module.exports = {
  /* đây là file đầu tiên mà webpack sẽ đọc ở đây mình để index.js */ 
  entry: path.resolve(__dirname, "index.js"),
  /* cấu hình thư mục đầu ra là dist và tên file là index.bundle.js,
  clean dùng để reset thư mục dist khi build */
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
    clean: true,
  },
};
```

### Thêm File Bundle Vào HTML

Khi file `index.bundle.js` được tạo, mình cần yêu cầu webpack đưa nó làm thẻ `<script>` vào tệp HTML. Để làm điều đó, trước tiên chúng ta cần cài đặt một thư viện khác:

```bash
$ npm install --save-dev html-webpack-plugin
```

Chỉnh sửa lại file `webpack.config.js` như sau:

```js
const path = require("path");
/* thêm html-webpack-plugin vào file cấu hình */
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
    clean: true,
  },
  /* cấu hình file index.html từ folder public */
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
};
```

## 3. Khởi Tạo Babel

### Cài Đặt Babel

Tiếp tục cài đặt các package sau:

```bash
$ npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react
```

1. `@babel/core` là gói thư viện của babel.
2. `babel-loader` dùng để load babel vào dự án.
3. `@babel/preset-env` dùng để chuyển code Javascript về ES5.
4. `@babel/preset-react` dùng để sử dụng babel với ReactJS.


### Cấu Hình Babel

Bây giờ chúng ta cần yêu cầu webpack tải các tệp javascript bằng cách sử dụng babel trước khi đóng gói. Thêm đoạn code sau vào `webpack.config.js`:

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
    clean: true,
  },
  /* đoạn code sau sẽ load các gói babel vào webpack */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
};
```

## 4. Build Và Chạy Thôi

Thêm `scripts` vào file `package.json` như sau:

```js
"scripts": {
    "serve": "webpack serve --mode development",
    "build": "webpack --mode production",
},
```

Ok bây giờ để chạy được thì bạn chỉ cần gõ `npm run serve` là xong, mở [http://localhost:8080/](http://localhost:8080/) và xem thành quả nhé.

![](https://images.viblo.asia/9a600279-0571-4077-a416-e3561f28645e.jpg)

Để build dự án bạn chạy câu lệnh `npm run build` khi đó webpack sẽ gói lại tất cả file Javascript của bạn vào thư mục `dist` mà mình cấu hình trước đó.

![](https://images.viblo.asia/04fa2f46-eeab-4aa3-8e2b-3bde54f33d24.jpg)

Chạy file `index.html` và tận hưởng thành quả :smiley:.

## 5. Bonus

* Để sử dụng Javascript Asynchronous (trên babel 7.4 [không còn dùng gói này nữa](https://babeljs.io/docs/en/babel-polyfill)) bạn cần chỉnh lại `entry` như sau:

```js
module.exports = {
  //...
  entry: ["@babel/polyfill",  path.resolve(__dirname, "index.js")],
}
```

## 6. Kết Thúc

Bài viết đến đây là kết thúc rồi, nếu có sai sót gì bạn bình luận phía dưới đóng góp cho mình nha. Để lại 1 vote và follow mình nếu thấy bài viết giúp ích cho bản thân <3.

Các nguồn tham khảo:
1. https://webpack.js.org/concepts/
2. https://viblo.asia/p/reactjs-ket-hop-voi-webpack-part-1-Eb85ogr052G
3. https://medium.com/age-of-awareness/setup-react-with-webpack-and-babel-5114a14a47e9
4. https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined