![Webpack từ A đến Á cùng kentrung](https://images.viblo.asia/2090b88e-6ec0-49fe-b677-65e927fafc2e.png) 

Trong bài [trước](https://viblo.asia/p/webpack-tu-a-den-a-webpack-css-loader-bWrZn07n5xw) chúng ta đã biết cách thiết lập Webpack để load css trong ứng dụng của bạn thông qua style-loader và css-loader. Bài hôm nay chúng ta sẽ học cách chuyển scss thành css thông qua `sass-loader`

## 1. Chuẩn bị file
```html:dist/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack từ A đến Á cùng kentrung</title>
</head>
<body>
  <h1>kentrung heading 1</h1>
  <h2>kentrung heading 2</h2>
  <h3>kentrung heading 3</h3>
  <h4>kentrung heading 4</h4>
  <h5>kentrung heading 5</h5>
  <h6>kentrung heading 6</h6>
  <script src="main.js"></script>
</body>
</html>
```
Trong folder **src** ta tạo các file `scss` theo cấu trúc bên dưới
```
webpack-demo
  ...
  |- src/
    |- index.js
    |- scss/
      |- colors.scss
      |- style.scss
```
```scss:src/scss/colors.scss
$text-primary: #007bff;
$text-secondary: #6c757d;
$text-success: #28a745;
$text-danger: #dc3545;
$text-waring: #ffc107;
$text-info: #17a2b8;
```
```scss:src/scss/style.scss
@import './colors.scss';

h1 {color: $text-primary;}
h2 {color: $text-secondary;}
h3 {color: $text-success;}
h4 {color: $text-danger;}
h5 {color: $text-waring;}
h6 {color: $text-info;}
```
File js  gọi file scss ở trên vào
```js:src/index.js
import './scss/style.scss'
```
Vậy là xong phần chuẩn bị, phần tiếp theo chúng ta bắt đầu tìm hiểu về **sass-loader** là gì?

## 2. Webpack sass-loader
Link thư viện:
https://www.npmjs.com/package/sass-loader

**sass-loader** giúp chúng ta compile (biên dịch) file scss sang css. Để sử dụng chúng ta phải cài đặt nó thông qua npm (lưu ý là chúng ta phải cài thêm cả `node-sass`)
```
npm install sass-loader style-loader css-loader sass node-sass webpack --save-dev
```
Sau khi cài đặt xong chúng ta chỉnh sửa lại file cấu hình
```js:webpack.config.js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
}
```
Đoạn code trên có ý nghĩa:

* Tạo ra một rule (quy định, quy tắc) để kiểm tra tất cả các file có đuôi là sass hoặc scss
* Thứ tự áp dụng loader từ dưới lên trên sẽ là sass-loader => css-loader => style-loader
* Sử dụng **sass-loader** để chuyển scss thành css
* Sử dụng **css-loader** chuyển css ở trên thành css in js
* Sử dụng **style-loader** xác định vị trí sẽ chèn vào trong file html.

Thế là xong phần cấu hình giờ chúng ta chạy webpack xem thế nào: `npm run dev`

Khi chạy xong câu lệnh trên, giờ chúng ta chạy file `dist/index.html` và xem code trong F12
```html:dist/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack từ A đến Á cùng kentrung</title>
  <style>
    h1{color:#007bff}h2{color:#6c757d}h3{color:#28a745}h4{color:#dc3545}h5{color:#ffc107}h6{color:#17a2b8}
  </style>
</head>
<body>
  <h1>kentrung heading 1</h1>
  <h2>kentrung heading 2</h2>
  <h3>kentrung heading 3</h3>
  <h4>kentrung heading 4</h4>
  <h5>kentrung heading 5</h5>
  <h6>kentrung heading 6</h6>
  <script src="main.js"></script>
</body>
</html>
```
Ta thấy phần code scss đã được chuyển thành css và tự động thêm vào trang html thông qua thẻ style trong khối head. **Thật là vi diệu!**

## 3. Option outputStyle
Theo mặc định thì webpack sẽ chuyển scss sang css theo kiểu `compressed` tức là code css đã được viết gộp lại thành một dòng như này
```css
h1{color:#007bff}h2{color:#6c757d}h3{color:#28a745}h4{color:#dc3545}h5{color:#ffc107}h6{color:#17a2b8}
```

Ngoài kiểu này ra chúng ta còn kiểu khác đó là `expanded`. Sửa lại file `webpack.config.js` như sau
```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {outputStyle: 'expanded'}
            }
          }
        ],
      },
    ],
  },
}
```
Và đây là css khi được outputStyle kiểu **expanded**
```css
h1 {
  color: #007bff;
}

h2 {
  color: #6c757d;
}

h3 {
  color: #28a745;
}

h4 {
  color: #dc3545;
}

h5 {
  color: #ffc107;
}

h6 {
  color: #17a2b8;
}
```
Thực ra về kiểu **outputStyle** này thì có tận bốn kiểu là: nested, expanded, compact, compressed nhưng mình thử với hai kiểu nested và compact thì lại bị báo không hỗ trợ. Dù sao thì mình cũng chủ yếu dùng kiểu compressed mặc định cho nhẹ nên không cần quan tâm lắm mấy kiểu output kia. Các bạn muốn tìm hiểu kĩ hơn thì có thể search google xem lí do tại sao không được nhé.

## 4. Option source map
Với cấu hình ở trên thì có một vấn đề xảy ra là làm sao biết được css đang tác động nó ở dòng nào, file nào. Giờ chúng ta chạy `dist/index.html` và tìm thử thẻ h1 đang nhận css như thế nào.
```html
<style>

h1{color:#007bff}h2{color:#6c757d}h3{color:#28a745}h4{color:#dc3545}h5{color:#ffc107}h6{color:#17a2b8}
```
Khi debug css thì nó chỉ tới chỗ style trong khối head. Chúng ta không biết được thực sự nó là dòng bao nhiêu cả, việc sửa css sẽ mất rất nhiều thời gian, bực mình khó chịu. Sửa css đã khổ giờ lại sửa theo kiểu scss để tìm đúng vị trí của nó càng khổ hơn. Thấu hiểu điều đó webpack cũng cung cấp chế độ **source map** nhằm giúp chúng ta dễ dàng debug hơn. Ta sửa lại file `webpack.config.js`
```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ],
      },
    ],
  },
}
```
Giờ chúng ta chạy lại `dist/index.html` và tìm thử thẻ h1 đang nhận css như thế nào.
```html
style.scss:3

h1 {
  color: #007bff;
}
```
Quả thật với cấu hình này việc sửa css đã sướng hơn rất nhiều cho các css-er ^^ Còn rất nhiều option khác của **sass-loader** mà mình không nói hết được. 


-----

Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo.

* Tham khảo thêm các cấu hình khác cho sass-loader: https://webpack.js.org/loaders/sass-loader/
* Source code github: https://github.com/kentrung/webpack-tutorial
* Series webpack: https://viblo.asia/s/webpack-tu-a-den-a-cung-kentrung-pmleB8Am5rd