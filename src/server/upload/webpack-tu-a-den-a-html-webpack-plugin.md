![](https://images.viblo.asia/2090b88e-6ec0-49fe-b677-65e927fafc2e.png)

Bài hôm nay chúng ta sẽ học về plugin [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) được dùng để sắp xếp các file html theo một trật tự nhất định, giúp tối ưu file html hơn.
## 1. Cài đặt
Link plugin: https://github.com/jantimon/html-webpack-plugin

Cài cho Webpack 5
```
npm i --save-dev html-webpack-plugin
```
Cài cho Webpack 4
```
npm i --save-dev html-webpack-plugin@4
```

## 2. Chuẩn bị file
Để bài học được dễ dàng theo dõi chúng ta nên xóa các file trong folder `dist` và thiết lập file theo cấu trúc bên dưới
```
webpack-demo
  ...
  |- dist/
  |- src/
     |- index.js
  |- package.json
  |- webpack.config.js
```

## 3. Cách sử dụng

Plugin sẽ tự động tạo một file HTML, chỉ cần import và thêm plugin vào file cấu hình webpack.config.js
```js:webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
```
Giờ chạy thử webpack xem thế nào: `npm run dev`

Với cấu hình trên webpack sẽ tự động tạo ra một file `dist/index.html` chứa các mục sau
```html:dist/index.html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```
Lưu ý là code trên đã được mình format lại cho dễ nhìn còn thực tế là code HTML đã bị minify lại, loại bỏ tất cả các khoảng trống thừa, bỏ comment, gom các dòng code lại thành một dòng duy nhất, giảm tối đa dung lượng file, tối ưu source code hơn, vân vân và mây mây... Thực tế như này.
```html:dist/index.html
<!doctype html><html><head><meta charset="utf-8"><title>Webpack App</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><script src="main.js"></script></body></html>
```

## 4. Option title
Thay đổi giá trị title của trang HTML như sau
* Tên thuộc tính: `title`
* Kiểu dữ liệu: `string`
* Mặc định: `Webpack App`

Ví dụ chúng ta đổi title thành: Webpack từ A đến Á cùng kentrung
```js:webpack.config.js
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack từ A đến Á cùng kentrung'
    })
  ]
}
```
Kết quả
```html:dist/index.html
<head>
  ...
  <title>Webpack từ A đến Á cùng kentrung</title>
</head>
```
## 5. Option filename
Thay đổi tên file HTML được output ra, bạn cũng có thể chỉ định thư mục chứa trang HTML (eg: assets/admin.html)
* Tên thuộc tính: `filename`
* Kiểu dữ liệu: `string`
* Mặc định: `index.html`

Ví dụ chúng ta tạo ra trang: `dist/about.html`
```js:webpack.config.js
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack từ A đến Á cùng kentrung',
      filename: 'about.html'
    })
  ]
}
```

## 6. Option template
Quy định trang mẫu cho trang HTML được output.
* Tên thuộc tính: `template`
* Kiểu dữ liệu: `string`
* Mặc định: By default it will use `src/index.ejs` if it exists. Please see the [docs](https://github.com/jantimon/html-webpack-plugin/blob/main/docs/template-option.md) for details

Ví dụ nếu chúng ta muốn output ra trang `dist/about.html` từ trang nguồn `src/about-dev.html`
```js:webpack.config.js
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack từ A đến Á cùng kentrung',
      filename: 'about.html',
      template: './src/about-dev.html'
    })
  ]
}
```

## 7. Generating Multiple HTML Files
Để tạo ra được nhiều trang HTML, bạn chỉ cần khai báo thêm giá trị vào trong mảng plugin. 

Ví dụ chúng ta tạo ra hai trang `dist/index.html` và `dist/about.html`
```js:webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin(),  // Generates default index.html
    new HtmlWebpackPlugin({  // Also generate a about.html
      title: 'Webpack từ A đến Á cùng kentrung',
      filename: 'about.html'
    })
  ]
}
```

## 8. Option chunks
Ở phần trên lúc tạo ra hai trang `dist/index.html` và `dist/about.html` thì cả hai trang này đều load chung một file `dist/main.js`. Để tách riêng từng trang load từng file JS ta tạo key entry và sử dụng chunks để thêm vào
```js:webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    homepage: ['./src/index.js', './src/slider.js'],
    aboutpage: ['./src/about.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Trang chủ',
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['homepage']
    }),  
    new HtmlWebpackPlugin({
      title: 'Về chúng tôi',
      filename: 'about.html',
      template: './src/about-dev.html',
      chunks: ['aboutpage']
    })
  ]
}
```
Với cấu hình trên thì ta có hai trang HTML load hai file JS riêng biệt.

Trang `dist/index.html` load file `dist/homepage.js` là kết hợp của hai file `src/index.js` và `src/slider.js`

Trang `dist/about.html` load file `dist/aboutpage.js` là code file `src/about.js`


## 9. Custom template
Có bạn hỏi liệu có thể tách code HTML ra thành từng phần nhỏ rồi gọi nó vào được không? 

Tại sao lại không nhỉ? 

**Javascript** cũng tách ra các file nhỏ được, **css** cũng tách ra các file nhỏ được.

=> vậy thì html cũng sẽ làm được. **Ngon!**

Một trong các cách đó là sử dụng [html-loader](https://www.npmjs.com/package/html-loader) nên các bạn phải cài đặt nó nhé
```
npm install html-loader --save-dev
```


Ví dụ chúng ta tạo trang `src/home.html` và trong này gọi trang `src/header.html` thì cấu trúc file như này
```
webpack-demo
  ...
  |- src/
    - index.js
    - header.html
    - home.html
```

```html:src/header.html
<header>
  Em là header
</header>
```
```html:src/home.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Webpack từ A đến Á cùng kentrung</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <%= require('html-loader!./header.html').default %>
</body>
</html>
```
```js/webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack từ A đến Á cùng kentrung',
      filename: 'home.html',
      template: './src/home.html'
    }),  
  ]
}
```
Chạy lại webpack `npm run dev` và giờ mở file `dist/home.html` xem kết quả
```html:dist/home.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Webpack từ A đến Á cùng kentrung</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
  <header>Em là header</header>
  <script src="main.js"></script>
</body>
</html>
```

Quá tuyệt vời phải không? Các bạn thậm chí có thể đặt biến, if-else, vòng lặp, strip tag các kiểu hệt như ngôn ngữ lập trình thực thụ, giờ code HTML cũng đã lên một trình mới rồi nhé.



-----


Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo.

* Tham khảo [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)
* Source code [github](https://github.com/kentrung/webpack-tutorial)
* Series [webpack](https://viblo.asia/s/webpack-tu-a-den-a-cung-kentrung-pmleB8Am5rd)
* Liên hệ: trungnt256