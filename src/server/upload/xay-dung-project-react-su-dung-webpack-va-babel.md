Gần đây thì mình đã học `React` và mình đã sử dụng `create-react-app` để tạo project React của mình. Với việc sử dụng `create-react-app` việc config và thời gian để tạo project `React` rất dễ dàng. Mình cũng đoán rằng, các bạn cũng thường xuyên sử dụng `create-react-app` để tạo project `React` của các bạn. Trong bài viết này mình sẽ giới thiệu với các bạn một cách để xây dựng project `React` sử dụng `Webpack 4` và `Babel`. Let’s get started :)

![](https://images.viblo.asia/522a7e09-0a87-4822-a73f-eebeae43e8f7.png)

## Bắt đầu
Trước khi bắt đầu, bạn phải cài đặt `npm` và `Node.js`  trên máy của bạn
### Cấu trúc thư mục
Bạn hãy tạo một thư mục tên của project. Ví dụ mình tạo tên project là react-demo. Trong thư mục project mình tạo 1 thư mục khác là src, và trong thư mục mình tạo 2 thư mục con là components và styles. Cụ thể cấu trúc thư mục sẽ như sau:
    - react-demo
        - src
            - components
            - styles
Bạn có thể tạo các thư mục trên bằng các câu lệnh như sau:
```
mkdir react-demo
cd react-demo
mkdir -p src/components src/styles
```
## Khởi tạo project
Tất cả các project sử dụng trình quản lý gói (npm) phải được khởi tạo. Để khởi tạo chúng ta sử dụng câu lệnh như sau:
```
npm init
```
Sau khi thực hiện dòng lệnh này, trong thư mục dự án `react-demo` sẽ tạo ra một file tên là package.json
<br>
Khi thực hiện `npm init` sẽ có một vài câu hỏi liên quan đến project bạn có thể bỏ qua bằng cách nhấn phím enter hoặc bạn khởi tạo bằng câu lệnh
```
npm init -y
```
Sau khi hoàn thành thì file `package.json` sẽ có nội dung như thế này:
```
{
  "name": "react-demo",
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
## Cài đặt Webpack
Webpack là một gói module cho phép chúng ta gói các tệp project của chúng ta thành một tệp duy nhất.
```
npm install webpack webpack-cli --save-dev
```
Câu lệnh trên sẽ thêm `webpack` và `webpack-cli` như là một dev dependency vào project. 
## Cài đặt React
Cài đặt `react` và `react-dom` như là một dependency
```
npm install react react-dom --save
```
## Cài đặt Babel
Để React hoạt động, chúng ta cần cài đặt Babel cùng với nó. Chúng ta cần Babel để phiên mã ES6 và JSX sang ES5.
<br>
Cài đặt `babel-core`, `babel-loader`, `babel-preset-env`, `babel-preset-react` như một dev dependency
```
npm install @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```
- <strong>babel-core:</strong>Chuyển đổi mã ES6 sang ES5
- <strong>babel-loader:</strong>Giúp webpack dịch mã, đưa ra các cài đặt trước
- <strong>babel-present-env:</strong>Preset giúp babel chuyển đổi mã ES6, ES7 và ES8 sang ES5.
- <strong>babel-present-react:</strong>Preset giúp chuyển đổi mã JSX sang javascript
## Tạo file index
### index.js
Tạo một file index.js bên trong thư mục gốc `src`. Tệp này sẽ là điểm đầu vào ứng dụng của chúng ta.
/src/index.js:
```js
console.log("Đây là index.js");
```
### index.html
Tạo một file index.html bên trong thư mục gốc `src`. Có nội dung như sau:
/src/index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React Demo</title>
</head>

<body>
    <div id="root">

    </div>
</body>

</html>
```

## File entry và output
Tạo một file `webpack.config.js` trong thư mục gốc của project để chúng ta có thể xác định các quy tắc cho các trình tải của mình
<br>
Xác định điểm vào (entry) và thư mục đầu ra(output) của ứng dụng của chúng ta bên trong `webpack.config.js`
```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  }
}
```
Trong đoạn mã trên, `Webpack` sẽ gói tất cả các tệp JavaScript của chúng ta vào tệp index-bundle.js bên trong thư mục `dist`.
## Webpack Loaders
Bây giờ thêm một số trình tải (loader) bên trong tệp này, sẽ chịu trách nhiệm tải và gói các tệp nguồn
<br>
Nội dung file `webpack.config.js` sẽ như sau:
```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
```
Ở đây `babel-loader` được sử dụng để tải các tệp JSX / JavaScript của chúng ta và `css-loader` được sử dụng để tải và gói tất cả các tệp CSS vào một tệp và `style-loader` sẽ thêm tất cả các kiểu bên trong thẻ của tài liệu.
<br>
Trước khi `Webpack` có thể sử dụng `css-loader` và `style-loader`, chúng ta phải cài đặt chúng:
```
npm install css-loader style-loader --save-dev
```
## .babelrc
Bây giờ hãy tạo một tệp `.babelrc` bên trong thư mục gốc của thư mục project với các nội dung sau bên trong nó như sau:
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
Tập tin này sẽ cho `babel` biết những `preset` nào được sử dụng để dịch mã. Ở đây chúng ta đang sử dụng hai `preset`:
- env: đây là `preset` được sử dụng để chuyển mã ES6/ES7/ES8 sang ES5
- react: đây là `preset` được sử dụng để chuyển mã JSX sang ES5
## Biên dịch file sử dụng Webpack
Thêm hai dòng sau vào `scripts` trong file `package.json`:
```
"start": "webpack --mode development --watch",
"build": "webpack --mode production"
```
Ở đây mình đã sử dụng `watch`, vì vậy bất cứ khi nào có sự thay đổi trong các tệp nguồn, `webpack` sẽ tự động biên dịch tất cả các tệp nguồn.
<br>
Bây giờ, bạn có thể biên dịch project sử dụng lệnh sau:
```
npm start
```
Sau khi thực hiện lệnh trên, bạn sẽ thấy tệp `index_bundle.js` được tạo trong thư mục `/ dist` sẽ chứa mã ES5 được phiên mã từ tệp `index.js`
## App.js và App.css
Tạo file `App.js` trong thư mục `components` của `src` với nội dung như sau:
```js
import React, { Component } from "react";

import '../styles/App.css';

class App extends Component {
    render() {
        return (
            <div>
                <h1>My React App!</h1>
            </div>
        );
    }
}

export default App;
```
Tạo file `App.css` trong thư mục `styles` của `src` với nội dung như sau:
```css
h1 {
    color: blue;
    text-align: center;
    font-size: 40px;
}
```
Tệp CSS này được sử dụng để đảm bảo `css-loader` và `style-loader` hoạt động chính xác.
<br>
Bây giờ, chúng ta thay đổi file `index.js` có nội dung như sau:
```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";

ReactDOM.render(<App />, document.getElementById("root"));
```
## Cài đặt Html-webpack-plugin
Bây giờ, chúng ta cũng cần cài đặt `html-webpack-plugin`, plugin này tạo tệp HTML, chèn tập lệnh bên trong tệp HTML và ghi tệp này vào `dist / index.html`.
```
npm install html-webpack-plugin --save-dev
```
Bây giờ, chúng ta cần cấu hình lại plugin này vào file `webpack.config.js` 
```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
```
Ở đây, giá trị của `template` là tệp `index.html` mà chúng ta đã tạo trước đó và nó sử dụng tệp này làm mẫu và tạo tệp mới có tên `index.html` bên trong thư mục `/ dist` với tập lệnh được chèn.
<br>
Quá trình thiết lập gần như hoàn tất, tất cả những gì chúng ta phải làm là biên dịch các tệp nguồn bằng `webpack`, bạn có thể chạy dự án bằng lệnh dưới đây:
```
npm start
```
Bạn sẽ nhận được đầu ra bên trong thư mục `/ dist` của dự án. Bây giờ, hãy mở `index.html` trong trình duyệt web, bạn sẽ thấy nội dung là `My React App!`
<br><br>
Nhưng phương pháp này có một nhược điểm là bạn phải tự làm mới trang web, để xem những thay đổi bạn đã thực hiện. Để có `webpack` xem các thay đổi của chúng ta và làm mới trang web bất cứ khi nào có bất kỳ thay đổi nào được thực hiện đối với các thành phần của chúng ta, chúng ta có thể cài đặt `webpack-dev-server`.
## Cài đặt Webpack-dev-server
Chúng ta cài `Webpack-dev-server` với dòng lệnh sau:
```
npm install webpack-dev-server --save-dev
```
và sau đó thay đổi, `start` ở `script` trong file `package.json`
```
"start": "webpack-dev-server --mode development --open --hot"
```
Tôi đã thêm `--open` và `--hot` để mở và làm mới trang web bất cứ khi nào có bất kỳ thay đổi nào được thực hiện đối với các `components`.
<br>
Bây giờ, mở terminal và chạy dòng lệnh:
```
npm start
```
Và hãy xem kết quả nhé :D
## Lời kết
Trong bài viết này, mình đã giới thiệu với các cách để tạo project React sử dụng Webpack và Babel. Cảm ơn các bạn đã theo dõi bài viết. Nếu bài viết hữu ích, hãy upvote giúp mình :D
:kissing_heart: