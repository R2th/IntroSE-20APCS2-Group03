Các dự án React điển hình sẽ sử dụng Babel và Webpack. Babel được sử dụng để chuyển code JSX và ES6 thành code ES5. Webpack được dùng để làm một bundler. Sẽ rất thuận tiện nếu như chúng ta có một dự án base để khởi tạo bất kì một dự án React nào. Đó là thứ mà chúng ta sẽ tìm hiểu trong bài viết này.

# Cài đặt node.js và npm
Chúng ta cần node.js và npm để tải và cài đặt các gói thư viện node như React, webpack,... Ta có thể tải và cài đặt chúng từ [đây](https://nodejs.org/en/). Khi chúng ta cài đặt node.js, npm cũng sẽ được tự động cài đặt.

Chúng ta có thể cài node.js thông qua [nvm](https://github.com/nvm-sh/nvm). Sử dụng nvm sẽ giúp chúng ta dễ dàng chuyển đổi giữa các phiên bản của node.

Khi đã hoàn thành quá trình cài đặt node.js và npm, ta có thể tới xác nhận lại bằng các lệnh:
```
> node --version
v12.14.1

> npm --version
6.13.4
```

# Tạo thư mục dự án
Hãy tạo một thư mục với tên `react-starter`. 

## Package.json
Trong một dự án node, file package.json dùng để chứa các thông tin về dự án như tên, bản quyền, các đoạn script, dependency,... Ta có thể tạo file này mặc định với lệnh
```
npm init -y
```
Tùy chọn `-y`  là để đặt giá trị mặc định cho file. Bây giờ `package.json` đã được tạo với nội dung sau:
```json
{
  "name": "react-starter",
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

# Tạo source code
Chúng ta sẽ bố trí kiến trúc thư mục dự án theo kiểu tất cả file source code sẽ nằm trong một thư mục có tên là `src`. Và khi chúng ta build dự án thì các file có thể deploy được sẽ được tạo và lưu tại thư mục `/dist`.

Vậy thì, đầu tiên hãy tạo thư mục `src` ở ngay thư mục gốc của dự án. Thư mục này sẽ chứa tất cả code của các component của React, được viết bởi JSX, SCSS và template HTML để render ra các component. Khi chúng ta build dự án, tất cả JSX sẽ được chuyển đổi thành javascript, tất cả SCSS sẽ được chuyển thành CSS thuần, HTML sẽ được chỉnh sửa để chứa các tham chiếu tới các file cần thiết và sẽ được sao chép tới thư mục `/dist`.

## Template HTML
Để bắt đầu, chúng ta sẽ tạo file `index.html` bên trong thư mục `src`.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Starter</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
Các component React sẽ được render ở bên trong thẻ `div`. Bây giờ, chúng ta đang không thấy tham chiếu nào tới bất kì một file javascript hay CSS nào cả. Chúng sẽ được thêm vào file html được tạo khi chúng ta chạy bước build dự án.

## React component
Đã tới lúc chúng ta tạo các component của React. Hãy tạo file `index.js` trong thư mục `src` với nội dung:
```js
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return <h1>Hello React 16,Webpack 4 & Babel 7!</h1>;
};

ReactDOM.render(<App />, document.getElementById("root"));
```
Chúng ta import gói `react` để tạo component `App`. Và gói `react-dom` để render các component của chúng ta trong thẻ html.

> Chúng ta có thể sẽ nhầm lẫn rằng, component `App` không sử dụng `React` để tạo component. Vậy thì import gói `react` để làm gì? Thực ra là vì khi JSX được chuyển đổi sang javascript, thì đoạn code sẽ có thêm dòng `React.createElement`. Vì vậy gói `react` vẫn cần phải có.

Tuy nhiên, ta chưa cài các gói `react` và `react-dom`, hãy cài chúng với lệnh:

`npm install react react-dom --save`

# Webpack
Cho tới giờ, tất cả source code của chúng ta đều nằm trong thư mục `src`. Chúng ta chưa có file nào để deploy lên server cả. Điều gì sẽ xảy ra nếu ta sao chép các file `index.html` và `index.js` lên một web server như nginx hay apache? Nó chỉ đơn giản là render file `index.html` lên trình duyệt thôi, còn file `index.js` thì sẽ bị bỏ qua.

Vì vậy, ta sẽ cần một công cụ để gắn 2 file này lại với nhau và chuẩn bị để deploy. Đó chính là webpack. Webpack là một bundler. Nói dễ hiểu thì nó gói tất cả các dependencies của dự án vào một file và đặt nó bên trong thư mục `/dist`. 

Hãy chạy lệnh sau để cài đặt webpack.

```
npm install --save-dev webpack
```

Một khi webpack được cài đặt xong, ta cần tạo hướng dẫn cho webpack về những việc cần làm. Vì vậy, hãy tạo file `webpack.config.js` trong thư mục gốc của dự án. Webpack luôn luôn kiểm tra file này để biết được cách đóng gói dự án lại.

## Cấu hình cho webpack
File `webpack.config.js` được tạo cần nội dung như sau:
```js
var path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
```
Bây giờ, khi webpack đọc file config, nó sẽ hiểu được rằng nó sẽ cần tạo một file đóng gói từ file `index.js`. Sau đó, nó cần tìm thư mục `/dist` để đưa file đó vào và đặt tên là `bundle.js`.

## Chạy webpack
Bây giờ, hãy tạo một đoạn script trong file `package.json`. Trong file `package.json`, ta có thể thấy một đoạn code như sau:
```js
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

Ta không cần tới lệnh `test` vào lúc này. Thay vào đó, hãy thay bằng lệnh `start` để khởi chạy webpack.
```js
"scripts": {
  "start": "webpack"
}
```

Để chạy lệnh `start`, hãy tới thư mục gốc của dự án và chạy lệnh `npm start`.

Ta dự kiến rằng file `bundle.js` sẽ xuất hiện ở thư mục `dist`. Nhưng, thay vào đó, ta lại nhận được thông báo lỗi ở console như sau:
```
One CLI for webpack must be installed.
...
You need to install 'webpack-cli' to use webpack via CLI.
```

Lỗi này có nghĩa là, vì chúng ta cần sử dụng webpack như một công cụ dòng lệnh, chúng ta sẽ cần phải cài đặt thêm `webpack-cli`. Hãy cài nó với lệnh:
```
npm install webpack-cli --save-dev
```

Sau khi đã hoàn tất cài đặt, ta hãy thử chạy lại lệnh `npm start`.

Lần này lại xuất hiện thêm lỗi:

```
Module parse failed: Unexpected token (5:9)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
```

Lỗi này hoàn toàn không phải do webpack. Về cơ bản, webpack là một bundler. Nó đang cố để tạo một bundle. Trong quá trình này, nó không thể hiểu được cú pháp của JSX trong file `index.js`. Để giải quyết vấn đề này sẽ cần tới Babel.

# Babel
Babel là một transpiler(bộ chuyển tiếp), có nghĩa là nó có thể chuyển đổi một loại code thành loại code khác.  Trong dự án của chúng ta, Babel sẽ được dùng để chuyển JSX thành javascript.

Babel có thể tự nó chuyển JSX sang javascript. Nhưng công việc này đã được chúng ta chuyển sang cho webpack. Vì vậy, để webpack có thể sử dụng Babel để xử lý file JSX, ta sẽ cần `babel-loader`.

> Webpack sử dụng `babel-loader` để xử lí các file JSX và ES6. Và nó có thể sử dụng `sass-loader` để xử lí file SCSS.

Để cho `babel-loader` có thể hoạt động, ta cần cài đặt gói `@babel/core`. Ta cũng cần cài thêm `@babel/preset-env @babel/preset-react` để chuyển ES6 và JSX sang ES5 một cách tương ứng.
```
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

Bây giờ, tất cả những gì babel yêu cầu đều đã được cài đặt. Nhưng ta chưa cài đặt cho webpack để sử dụng `babel-loader`. Hãy thêm vào file `webpack.config.js`:
```js
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }
  ]
}
```

Đoạn code trên tạo ra một qui tắc trong file config. Qui tắc này được áp dụng cho file có đuôi .js hay .jsx và ngoại trừ những file có trong thư mục `node_modules`. Mỗi khi webpack cần thêm một file javascript hay file JSX vào bundle thì nó sử dụng babel để chuyển đổi code và thêm vào bundle.

## .babelrc
Webpack sử dụng babel thông qua `babel-loader`. Babel cần biết rằng những cài đặt mà nó cần có là gì. Vì vậy, ta cần tạo ra file `.babelrc` ở thư mục gốc của dự án với nội dung sau:
```
{ "presets": ["@babel/preset-env", "@babel/preset-react"] }
```

Bây giờ, hãy chạy lệnh `npm start`. Bây giờ, webpack đã thành công tạo được `bundle.js` bên trong thư mục `/dist`. Ta có thể thấy kết quả sau trên console.
```
> webpack

Hash: 8e96f900f4a0ada759de
Version: webpack 4.41.6
Time: 7229ms
Built at: 02/18/2020 09:43:53
    Asset      Size  Chunks             Chunk Names
bundle.js  1.08 MiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/index.js] 255 bytes {main} [built]
    + 11 hidden modules
```

# HtmlWebpackPlugin
Bây giờ ta đã có `bundle.js` trong thư mục `/dist`. Nhưng chưa có file HTML nào trong đó để deploy cả. Vì vậy `HtmlWebpackPlugin` là một plugin của webpack có thể giúp chúng ta. Hãy cài đặt nó với lệnh:
```
npm install --save-dev html-webpack-plugin
```

Chúng ta sẽ cần cho webpack biết rằng nó cần sử dụng `HtmlWebpackPlugin`. Ta sẽ sửa file `webpack.config.js` với nội dung như sau:
```js
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = {
  entry: "./src/index.js",
  //...
  module: {
    /*...*/
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
```

Ở đây, ta đã thêm `HtmlWebpackPlugin` vào mảng `plugins` với tùy chọn template, ta có thể đưa đường dẫn của file HTML vào đây.

Bây giờ hãy chạy lệnh `npm start`, webpack sẽ tạo ra cả `bundle.js` và `index.html` trong thư mục `/dist`. File HTML được tạo sẽ chứa tham chiếu tới file `bundle.js`.

Ta có thể mở file `index.html` trên trình duyệt để xem kết quả.

![](https://images.viblo.asia/6b997b0f-cbe7-411e-90a0-8702662a5f4c.png)

# WebpackDevServer
Trong quá trình phát triển dự án, mỗi lần chúng ta chạy lệnh webpack sẽ đều phải đợi quá trình build kết thúc. Rồi mới mở file html để kiểm tra kết quả. Việc này khá mất thời gian.

Webpack có một web server của riêng nó gọi là `webpack-dev-server`. Nó tự động tải lại trình duyệt khi các file có sự thay đổi.
 Hãy cài đặt `webpack-dev-server` với lệnh:
 ```
 npm i webpack-dev-server --save-dev
 ```
 
 Bây giờ ta hãy cập nhật đoạn script trong `package.json`
 
 ```json
 "scripts": {
  "start": "webpack-dev-server --open --hot",
  "build": "webpack"
}
 ```
 
 Trong đoạn script `start`, thay vì build dự án, ta trực tiếp đưa kết quả lên trình duyệt. `webpack-dev-server` có thể sử dụng webpack và lưu `bundle.js`, `index.html` trong bộ nhớ. Sau đó sử dụng file HTML trực tiếp trong bộ nhớ. Nó không tạo file trong thư mục `/dist`.
 
 Tùy chọn `--open` là để mở trình duyệt mặc định một cách tự động. `--hot` là để đặt một bộ quan sát, kiểm tra xem mỗi khi có file thay đổi thì sẽ tự động tải lại trình duyệt.
 
 Hãy chạy `npm start`. Ta sẽ thấy `webpack-dev-server` sẽ hiển thị kết quả trên trình duyệt. Ta có thể thay đổi một component bất kì và trình duyệt sẽ tự động cập nhật sự thay đổi.
 
 # Phần kết
 Tóm lại, ta đã tạo ra được một dự án base để khởi tạo bất kì một dự án React nào. Đây chỉ là bước khởi đầu, vẫn cần phải có sự cải tiến rất nhiều để có thể đưa dự án vào thực tế hoạt động.
 
 Nguồn: https://backbencher.dev/articles/create-react-starter-webpack-babel