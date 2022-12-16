# Webpack là gì?
![](https://images.viblo.asia/75b6e49b-fe2f-4ae9-bf97-614ae50c3ce4.png)https://images.viblo.asia/75b6e49b-fe2f-4ae9-bf97-614ae50c3ce4.png
# Lợi ích khi dùng webpack
1. Dành cho các dự án lớn, dễ dàng phát triển, quản lý và customize
2. Tăng tốc độ cho project
3. Phân chia các module và chỉ load khi thật sự cần
4. Đóng gói tất cả các file nguồn thành 1 file duy nhất. Nhờ vào loader mà nó có thể biên dịch các loại file khác nhau.
5. Biến các tài nguyên tĩnh (image, css,..) thành module.
6. Biến đổi các mã nguồn: js, less, sass -> js, css or es6 -> es5 (nhằm hỗ trợ các trình duyệt)
7. Đóng gói các module => sẽ giải duyết được các đường dẫn trong react ^^ (mình khác thích lợi ích này của nó ^^, tiện vô cùng khi import module)
8. JSX -> JS ( Browser sẽ không hiểu JSX nên webpack sẽ giúp chuyển đổi)
9. Áp dụng Css preprocessor để xây dựng stylesheet (vd: SASS)
# Cài đặt
1. Phân tách các module (chia nhỏ các module để dễ quản lý)
2. Tạo 1 folder: demo-webpack `mkdir demo-webpack`
3. cd demo-webpack
4. tạo file package.json `npm init`

![](https://images.viblo.asia/a5374ce1-99d5-4a7c-bfb9-1d4aebdcb88f.png)

5. Tạo src folder `mkdir src` và tào 1 file index.html `touch index.html`
6. Trong index.html định nghĩ 1 file HTML cơ bản
    ```
    <!DOCTYPE html>
      <html lang="">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Webpack</title>
      </head>
      <body>

      </body>
    </html>
    ```
7. Tạo 2 file js trong thư mục src `src/math.js` và file `src/index.js`
    ```
    // math.js
     const  sum = (a, b) => (
      a + b
    )

    module.exports = sum
    // export default sum (ES6)
    ```
    ```
    // index.js
    // import sum from './math' (ES6)
    var sum = require('./math')

    const total = sum(3,5)
    console.log(total)
    document.write(total)
    ```
    8. OK việc còn lại là sẽ nhúng file js vào trong `index.html`
    ```
    <script src="src/index.js"></script>
    ```
9. Chạy file index.html và bậy console sẽ thấy lỗi `require is not defined`
10. Đừng lo, webpack sẽ giải quyết vấn đề này cho bạn.
11. Cài đặt webpack `npm install --save-dev webpack`
12. Tạo file `webpack.config.js` để config webpack nhé
    ```
    const path = require('path') // lấy đường dẫn tuyệt đối của thư mục

    const config = {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
      }
    }
    module.exports = config;
    ```
path: lấy đường dẫn tuyệt đổi của thư mục. Nếu bạn không định nghĩa. webpack sẽ tạo ra **1 dist folder** mặc định lưu trữ các file đc tạo ra.

config: config webpack -> entry là điểm bắt đầu (file js) -> requied các file được requie trong file index.js (ở VD này là file math.js) -> tạo ra file buidle.js trong thư mục build (khá dễ hiểu phải không nào)

13. để build webpack. Chúng ta cần cài đặt `webpack-cli` ở global `npm i -g webpack-cli` xong xuối nhớ chạy `webpack` nhé
Note: Bạn có thể tạo script trong package.json 
    ```
    "build": "webpack --mode development"
    ```
15. Sau khi chạy xong các bạn sẽ thấy thư mục build với file `bundle.js`
16. Giờ đây thay vì bạn nhúng file index.js như ở bước 8. Thì bạn chỉ cần nhúng file bundle.js là xong
    
    `<script src="build/bundle.js"></script>`
16. Giờ thì F5 lại và xem đã chạy chưa nào....
Vậy là đã xong 1 VD đơn giản về webpack cho các bạn hình dung ra được webpack sẽ làm j và làm như thế nào: Nó sẽ đóng gói các module lại.
# Loader
1. Cho phép xử lý 1 file trước khi require(import) vào
2. Giúp biến đổi 1 file từ nhiều ngôn ngữ (cú pháp)(jsx, es6, 7,...) khác nhau sang js 
3. Sử dụng các loader đã được xây dựng sẵn.
# Babel
1. Biến đổi ES6 -> ES5 (nhưng chúng ta đã biết có 1 số trình duyệt không hỗ trợ es6, vì vậy cần thằng này để mình có thể sử dụng được trên tất cả các trình duyệt khác nhau)
2. Webpack giúp kết nối các module lại với nhau:
* `balel-loader` kết nối babel vs webpack
* `babel-core` lấy và phân tích mã, output ra 1 số file
* `babel-preset-env` đảm nhận phần gọi biến đổi es6 -> es5
* `babel-preset-react` đản nhận phần biến đổi jsx -> js
(Vì mình làm việc vs react nên cần mấy cái chuyển đổi này nhé ^^)
# Cài đặt
1. Ok như đã nói ở trên đầu tiên mình sẽ cài đặt với các module
`npm install --save-dev babel-loader@7 babel-core babel-preset-env babel-preset-react`
Chú ý 1 tý nhé https://github.com/babel/babel-loader
khi dùng các phiên bản `babel-loader 8.x`
ở đây mình dùng babel-loader 7.x
2. Thiết lập config cho module
    ```
    // webpack.config.js
    .....
    },
    module: {
        rules: [
          {
            use: 'babel-loader',
            exclude: /node_modules/,
            test: /\.js$/
          }
        ]
      }
    ```
module: định nghĩa module

use: tên module

test: định nghĩa các file có đuôi là js được sử dụng
exculuse: ignore node_modules folder

3. Tạo file `.babelrc` để  khai báo các plugins
   ```
   {
     "presets": ["babel-preset-env"]
   }
   ```

4. OK vậy giờ ở 2 file index.js và file math.js bạn sử dụng import và export cú pháp của es6 mà mình đã comment nó lại ở phái trên rồi ý.
5. build lại với `webpack` nhé rồi chạy
6. Hiểu đơn giản như thế này nhé: 
   `webpack.config.js` sẽ kết nối webpack với babel thông qua config mà chúng ta dùng
   
   `.babelrc` file sẽ config vs babel là mầy có thể đọc hiểu es6 và chuyển đổi thành es5
   
7. Thật ra giờ các browser đều hỗ trợ es6 nên việc test label chuyển đổi từ es6 -> es5 này hơi tù. Các bạn có thể hạ version browser xuống và test thừ nhé ^^
# Css Loader
Ok đi nhanh vào phần css Loader nhé
Để webpack hiểu được css bạn cần 2 module cơ bản
1. Css-loader: Giúp webpack hiểu đc cú pháp css
2. style-loader: Giúp nhận các css import vào html
3. Tạo file image.css
    ```
    p {
      color: red;
    }

5. OK. tiếp tục modification project nhé. Sử dụng js để tạo ra element
    ```
    //index.js
    var para = document.createElement("P");
    var t = document.createTextNode(`Sum: ${total}`);
    para.appendChild(t);
    document.body.appendChild(para);
    ```
6. add module trong webpack config
   ```
   {
    use: ['style-loader', 'css-loader'],
    exclude: /node_modules/,
    test: /\.css$/
   }
   ```
7. Build lại webpack và F5 lại xem nhé ^^
# React with Webpack
Phần trên mình đã giới thiệu cơ bản về webpack rồi. Giờ thì làm như nào để có thể sử dụng webpack vs react app
Mình vẫn làm việc với folder `demo-webpack` nhé
1. Đầu tiên mình phải cài đặt các package cần thiết cho react đó là `react` và `react-dom`
    `npm install --save react react-dom`
2. Các package về webpack + config trong webpack.config.js + .babelrc ở trên rồi. Nên hiện tại chỉ cần add thêm element 
    
    `<div id="root"></div>` vào trong file `index.html` mà thôi
3. Rồi. tương tự như khi mình tạo react = create-react-app mà thôi. Trong file index.js mình xóa hết đi nhé và add các khai báo react , react-dom zô
 ```
 import React from 'react'
import ReactDom from 'react-dom'

ReactDom.render(
  <h1>React - Webpack</h1>,
  document.getElementById('root')
)
 ```
4. Nhớ build `npm run build` lại và chạy file index.html nhé

# Kết Luận
Đây là những kiến thức cơ bản về Webpack - Tất nhiên có vô số những config , plugin hỗ trợ nhiều phần. Tuy nhiên nếu bạn là những người mới và đang muốn học về webpack nên đi từ nhưng bài viết nhỏ nhất. Ở bài viết sau mình sẽ đề cập đến split build, cache, dev-server...