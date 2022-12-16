![Webpack từ A đến Á cùng kentrung](https://images.viblo.asia/2090b88e-6ec0-49fe-b677-65e927fafc2e.png) 

Trong bài [trước](https://viblo.asia/p/webpack-tu-a-den-a-webpack-style-loader-ByEZk2Q4KQ0) chúng ta đã biết cách thiết lập Webpack để load css vào bên trong file javascript thông qua style-loader. Giờ chúng ta sẽ giải quyết thêm một vài vấn đề khi import ảnh hay import font trong file css thông qua **css-loader**


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
  <h1>Webpack từ A đến Á cùng kentrung</h1>
  <script src="main.js"></script>
</body>
</html>
```
Trong folder **src** ta thêm font và ảnh như cấu trúc bên dưới
```
webpack-demo
  ...
  |- src/
    |- index.js
    |- css/
      |- style.css
    |- fonts/
      |- DancingScript-Bold.ttf
    |- images/
      |- img_webpack.png
```
Font này các bạn có thể tải tại đây: https://fonts.google.com/specimen/Dancing+Script 

```css:src/css/style.css
@font-face {
  font-family: DancingScript-Bold;
  src: url("../fonts/DancingScript-Bold.ttf");
}
h1 {
  font-family: DancingScript-Bold;
  padding: 3em 0;
  background: url("../images/img_webpack.png")no-repeat center right;
}
```
Code file JS gọi file CSS ở trên vào
```js:src/index.js
import './css/style.css'
```
Vậy là xong phần chuẩn bị, phần tiếp theo chúng ta bắt đầu tìm hiểu về **css-loader** là gì?

## 2. Webpack css-loader

**css-loader** giúp chúng ta giải quyết các vấn đề khi import các tài nguyên như ảnh hay font ở trong file css, để sử dụng chúng ta phải cài đặt nó thông qua npm. Lưu ý là chúng ta nên kết hợp cùng với style-loader còn về vấn đề đường dẫn các file tài nguyên ảnh hay font thì chúng ta sử dụng **file-loader** hoặc **url-loader**
```
npm install css-loader style-loader file-loader --save-dev
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
}
```
Đoạn code trên có ý nghĩa:
* Tạo ra rule (quy định, quy tắc) thứ nhất để kiểm tra các file có đuôi là css
* Sử dụng **css-loader** để chuyển css ở trên thành css in js
* Sử dụng **style-loader** xác định vị trí sẽ chèn vào trong file html
* Tạo ra rule thứ hai kiểm tra các file có đuôi là png - jpg - jpeg - gif - svg - eot - ttf  - woff - woff2 
* Sử dụng **file-loader** để lấy đường dẫn tới các file tài nguyên

Thế là xong phần cấu hình giờ chúng ta chạy webpack xem thế nào: `npm run dev`. Khi chạy xong câu lệnh trên chúng ta thấy trong folder dist tự động sinh ra file theo cấu trúc bên dưới
```
webpack-demo
  ...
  |- dist/
    |- index.html
    |- main.js
    |- src/
      |- fonts/
        |- DancingScript-Bold.ttf
      |- images/
        |- img_webpack.png
```
Giờ chúng ta mở file `dist/index.html` sẽ có giao diện như này

![](https://images.viblo.asia/030d4348-924b-4ed7-ae1b-a09f65f91857.png)

Xem code trong F12
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack từ A đến Á cùng kentrung</title>
  <style>
    @font-face {
      font-family: DancingScript-Bold;
      src: url(src/fonts/DancingScript-Bold.ttf);
    }
    h1 {
      font-family: DancingScript-Bold;
      padding: 3em 0;
      background: url(src/images/img_webpack.png)no-repeat center right;
    }
  </style>
</head>
<body>
  <h1>Webpack từ A đến Á cùng kentrung</h1>
  <script src="main.js"></script>
</body>
</html>
```

Ta thấy phần code css giờ đã được tự động thêm vào trang html thông qua thẻ style trong khối head. **Thật là vi diệu!**


## 3. Option source map
Với cấu hình ở trên thì có một vấn đề xảy ra là làm sao biết được css đang tác động nó ở dòng nào, file nào. Giờ chúng ta chạy `dist/index.html` và tìm thử thẻ h1 đang nhận css như thế nào.
```html
<style>

h1 {
  font-family: DancingScript-Bold;
  padding: 3em 0;
  background: url(src/assets/images/img_webpack.png)no-repeat center right;
}
```
Khi debug css thì nó chỉ tới chỗ style trong khối head. Chúng ta không biết được thực sự nó là dòng bao nhiêu cả, việc sửa css sẽ mất rất nhiều thời gian, bực mình khó chịu. Nếu file css mà lên tới cả ngàn dòng thì sửa css đúng là ác con nhà bà mộng luôn. Thấu hiểu điều đó webpack cũng cung cấp chế độ **source map** nhằm giúp chúng ta dễ dàng debug hơn. Ta sửa lại file `webpack.config.js`
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
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
}
```
Giờ chúng ta chạy lại `dist/index.html` và tìm thử thẻ h1 đang nhận css như thế nào.
```css
style.css:5

h1 {
  font-family: DancingScript-Bold;
  padding: 3em 0;
  background: url(src/assets/images/img_webpack.png)no-repeat center right;
}
```
Quả thật với cấu hình này việc sửa css đã sướng hơn rất nhiều cho các css-er ^^.

## 4. Option import

| Name  | Type | Default | Description
| -------- | -------- | -------- | --------
| import | Boolean\Function | true | Enables/Disables `@import` at-rules handling

Một tác dụng mình thấy rất hay của css-loader đó là khả năng import file css khác vào file css hiện tại, bây giờ css các bạn có thể chia nhỏ theo từng khối hay từng chức năng rồi file css nào cần thì gọi vào. 

File `src/css/style.css` ở ví dụ trước
```css
@font-face {
  font-family: DancingScript-Bold;
  src: url("../fonts/DancingScript-Bold.ttf");
}
h1 {
  font-family: DancingScript-Bold;
  padding: 3em 0;
  background: url("../images/img_webpack.png")no-repeat center right;
}
```
Giờ chúng ta có thể tách ra thêm một file css chỉ lo việc thêm font là `src/css/font.css`
```css
@font-face {
  font-family: DancingScript-Bold;
  src: url("../fonts/DancingScript-Bold.ttf");
}
```
File `src/css/style.css` ta chỉ việc import nó vào
```css
@import "./font.css";
h1 {
  font-family: DancingScript-Bold;
  padding: 3em 0;
  background: url("../images/img_webpack.png")no-repeat center right;
}
```
File `webpack.config.js` các bạn không cần sửa lại vẫn chạy được vì giá trị của import mặc định là true rồi, ngoài ra còn có giá trị là Function nữa, các bạn nên tìm hiểu thêm.
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
        test: /\.css$/i,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: { import: true },
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
}
```
Build lại webpack `npm run dev` và xem kết quả vẫn ok, xem code trong F12 thì css đã được tách ra riêng
```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack từ A đến Á cùng kentrung</title>
  <style>
    @font-face {
      font-family: DancingScript-Bold;
      src: url(src/fonts/DancingScript-Bold.ttf);
    }
  </style>
  <style>
    h1 {
      font-family: DancingScript-Bold;
      padding: 3em 0;
      background: url(src/images/img_webpack.png)no-repeat center right;
    }
  </style>
</head>
<body>
  <h1>Webpack từ A đến Á cùng kentrung</h1>
  <script src="main.js"></script>
</body>
</html>
```

## 5. Option modules

| Name  | Type | Default | Description
| -------- | -------- | -------- | --------
| modules | Boolean\String\Object | auto: true | Enables/Disables CSS Modules and their configuration

Bật/Tắt tính năng [CSS Modules](https://github.com/css-modules/css-modules), sử dụng giá trị false sẽ làm tăng hiệu suất vì webpack tránh phân tích cú pháp các tính năng của css-modules, điều này sẽ hữu ích cho developer nếu muốn sử dụng vanilla css hoặc sử dụng các công nghệ khác.

Một trong những tính năng của css modules là khả năng khai báo biến trong file css. 

Bạn có thể sử dụng `@value` cho các giá trị cụ thể được sử dụng lại trong toàn bộ tài liệu. 

Chúng ta nên sử dụng tiền tố `v-` cho các giá trị value, `s-` cho bộ chọn selectors và `m-` cho các quy tắc về media screen.
```css:src/css/style.css
@value v-text-primary: #4055bf;
@value v-text-red: #ff0000;
@value s-big-title: h1;
@value m-large: (max-width: 960px);

@font-face {
  font-family: DancingScript-Bold;
  src: url("../fonts/DancingScript-Bold.ttf");
}
s-big-title {
  color: v-text-primary;
  font-family: DancingScript-Bold;
  padding: 3em 0;
  background: url("../images/img_webpack.png")no-repeat center right;
}
@media m-large {
  s-big-title {
    color: v-text-red;
  }
}
```
```js:src/index.js
import style from './css/style.css'
console.log(style)
```
Sửa lại file `webpack.config.js` để nhận cấu hình
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
        test: /\.css$/i,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: { 
              modules: true,
            },
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
}

```
Build lại webpack `npm run dev` và xem kết quả file `dist/index.html`
```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack từ A đến Á cùng kentrung</title>
  <style>
    @font-face {
      font-family: DancingScript-Bold;
      src: url(src/fonts/DancingScript-Bold.ttf);
    }
    h1 {
      color: #4055bf;
      font-family: DancingScript-Bold;
      padding: 3em 0;
      background: url(src/images/img_webpack.png)no-repeat center right;
    }
    @media (max-width: 960px) {
      h1 {
        color: #ff0000;
      }
    }
  </style>
</head>
<body>
  <h1>Webpack từ A đến Á cùng kentrung</h1>
  <script src="main.js"></script>
</body>
</html>
```
Còn đây là console log của file js
```js:console
{
  v-text-primary: "#4055bf", 
  v-text-red: "#ff0000", 
  s-big-title: "h1", 
  m-large: "(max-width: 960px)"
}
```
Bắt đầu đau đầu rồi đấy, css giờ đã được nâng trình lên như một ngôn ngữ lập trình thực thụ không còn đơn giản như xưa nữa rồi, ngoài ra còn rất nhiều option khác của **css-loader** mà mình không nói hết được, các bạn tìm hiểu thêm nhé.


-----

Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo.

* Tham khảo thêm các cấu hình khác cho css-loader tại: https://webpack.js.org/loaders/css-loader/
* Source code github: https://github.com/kentrung/webpack-tutorial
* Series webpack: https://viblo.asia/s/webpack-tu-a-den-a-cung-kentrung-pmleB8Am5rd