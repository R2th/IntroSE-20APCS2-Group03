![Webpack từ A đến Á cùng kentrung](https://images.viblo.asia/2090b88e-6ec0-49fe-b677-65e927fafc2e.png) 

Bài [trước](https://viblo.asia/p/webpack-tu-a-den-a-webpack-load-jquery-XL6lA94rlek) chúng ta đã biết cách thêm thư viện jQuery vào trong webpack. Bài hôm nay sẽ tiếp tục học cách thêm thư viện [Materialize](https://materializecss.com/) phiên bản 1.0.0

## 1. Chuẩn bị file và tình huống
Các file code ban đầu:
```js:webpack.config.js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
```html:dist/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Webpack từ A đến Á cùng kentrung</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
</head>
<body>
  <div class="container">
    <div class="carousel">
      <a class="carousel-item" href="#one!">
        <img src="https://lorempixel.com/250/250/nature/1">
      </a>
      <a class="carousel-item" href="#two!">
        <img src="https://lorempixel.com/250/250/nature/2">
      </a>
      <a class="carousel-item" href="#three!">
        <img src="https://lorempixel.com/250/250/nature/3">
      </a>
      <a class="carousel-item" href="#four!">
        <img src="https://lorempixel.com/250/250/nature/4">
      </a>
      <a class="carousel-item" href="#five!">
        <img src="https://lorempixel.com/250/250/nature/5">
      </a>
    </div>
  </div>
  <script src="main.js"></script>
</body>
</html>
```
Trang html này mình định tạo [Carousel](https://materializecss.com/carousel.html) của Materialize, vì mình chưa học cách thêm css vào trong webpack nên tạm thời thêm css qua link CDN như này.
```html:dist/index.html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
```

```js:src/index.js
$(document).ready(function(){
  $('.carousel').carousel()
})
```
Đoạn code trên có tác dụng tự động chạy Carousel. Chạy thử webpack ta có giao diện trắng tinh và log như sau:
```
Uncaught ReferenceError: $ is not defined at (main.js:1)
```

## 2. Load jQuery
Bài [trước](https://viblo.asia/p/webpack-tu-a-den-a-webpack-load-jquery-XL6lA94rlek) đã hướng dẫn cách thêm jQuery rồi nhưng thôi bài này hướng dẫn lại từ đầu cho dễ theo dõi. Trước tiên mình phải cài đặt jQuery qua npm
```
npm install jquery
```
Sau khi tải xong jQuery tiếp theo ta sửa lại `webpack.config.js` để thêm jQuery thông qua provide plugin của webpack
```js:webpack.config.js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
```
Vậy là chúng ta đã giải quyết xong vấn đề thêm jQuery để hiểu được các kí tự `$` trong code `src/index.js`. Chạy thử webpack và chúng ta có log lỗi như sau:
```
Uncaught TypeError: e(...).carousel is not a function at (main.js:1)
```

Cái này là do chúng ta chưa thêm Materialize Javascript, hàm `carousel` là của Materialize chứ không phải của jQuery  nên nó không hiểu là đúng rồi. 

## 3. Load Materialize
Tải Materialize qua npm 
```
npm install materialize-css@next
```
Bước tiếp theo là chúng ta load Materialize Javascript vào trong file `src/index.js`
```js:src/index.js
import 'materialize-css'

$(document).ready(function(){
  $('.carousel').carousel()
})
```
Câu lệnh import kia nó sẽ tự động tìm trong node-modules rồi đến materialize-css. Trong module này file package.json có khai báo
```
"main": "dist/js/materialize.js"
```
nên câu lệnh import ở trên chỉ là viết tắt của:
```js
import 'materialize-css/dist/js/materialize.js'
```
Chạy lại webpack `npm run dev`  và kết quả là ... vẫn đ*o chạy được, vẫn lỗi như cũ
```
Uncaught TypeError: e(...).carousel is not a function at (main.js:1)
```
Mất khá nhiều thời gian search trên mạng, tốn bao nhiêu nơ ron thần kinh để suy nghĩ tại sao lại vậy. Cuối cùng mình cũng tìm được ra cách fix lỗi nhưng cũng chưa biết giải thích rõ lí do tại sao, các bạn pro có thể comment giải thích giúp mình nhé. Ta sửa lại file `webpack.config.js` và thêm giá trị cho các key jQuery
```js:webpack.config.js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}
```
Chạy lại webpack `npm run dev`  và kết quả là **NGON!**

![Webpack từ A đến Á cùng kentrung](https://images.viblo.asia/866afcc5-e8ce-41f0-aff5-85651f87d444.gif)

-----

Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* Tham khảo cách cài Materialize tại: https://materializecss.com/
* Source code github: https://github.com/kentrung/webpack-tutorial
* Series webpack: https://viblo.asia/s/webpack-tu-a-den-a-cung-kentrung-pmleB8Am5rd