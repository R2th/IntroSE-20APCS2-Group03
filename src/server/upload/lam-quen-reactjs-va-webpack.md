# Làm quen Reactjs và Webpack
![](https://images.viblo.asia/1f45ce18-2a3e-4bd7-a11f-2a8eac025649.png)
## Môi trường:
1. Cài đặt Yarn
2. Cài đặt Node v 9.2.0 trên ubuntu / mac hoặc là trên windows.

## Khởi tạo:
**1. Tạo thư mục project:**
```
mkdir projectName && cd projectName
```
    
**2.  Khởi tạo project với Yarn:**
```
yarn init
```
> Bạn sẽ được yêu cầu trả lời vài câu hỏi, bạn có thể Enter để dùng giá trị mặc định cho nó.
> Sau quá trình này, bạn sẽ có 1 file package.json nằm trên thư mục gốc của project

**3. Để sử dụng es6 trong project. Bạn phải cài đặt babel (được thêm vào phần devDependencies trong file package.json):**
```
yarn add babel-cli babel-loader babel-preset-env babel-preset-react -D
```
**4. Tạo và tùy chỉnh file .babelrc (nằm trên thư mục gốc):**
```
// nội dung cơ bản file .babelrc
{
 "presets": ["env", "react"]
}
```
**5. Thêm các package React:**
```
yarn add react react-dom
```
**6. Install Webpack:**
> Vì Webpack sử dụng chỉ trong quá trình phát triển và đóng gói nên ta thêm nó dưới thẻ devDependencies trong package.json
```
yarn add webpack webpack-dev-server webpack-cli -D
```
**7. Khởi tạo một cấu cơ bản cho project:**
```
- build/
   - index.html
- src/
   - index.js
- webpack.config.js
```
**8. Cài đặt webpack:**
```
// cấu trúc 1 file config webpack.config.js cơ bản
const path = require('path')
const webpack = require('webpack')
module.exports = { 
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js'
  },  
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    port: 3000
  },  
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'}  
    ]   
  }
}
```
> Đầu vào: sẽ là file index.js trong thư mục /src/
> Đầu ra: sẽ cho ra một file index.bundle.js và nó nằm trong thư mục /build/ của project vừa tạo.
**9. Khởi tạo file index.html:**
```
<!-- inside /build/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8">
    <title>Your Project Name</title>
  </head>
  
  <body>
    <div id='root'></div>
  </body>
  <script src="./index.bundle.js"></script>
</html>
```
**10. Khởi tạo file index.js:**
```
// inside src/index.js
import React from 'react'
import {render} from 'react-dom'

const App = () => {
 return <div>
  <h1>React App Running!</h1>
 </div>
}

render(
 <App/>,
 document.getElementById('root')
)
```
**11. Thêm vài câu lệnh để chạy webpack:**

Chúng ta sẽ thêm vài câu lệnh cho thực các tác vụ như bắt đầu chạy serve và đóng gói tất cả các file của project ra một file bundle, hoặc 1 thư mục để release.

Chúng ta sẽ add những script này vào trong file package.json
```
"license": "MIT",
"scripts": {
  "start": "webpack-dev-server --open",
  "build": "npm run clean && npm run compile",
  "clean": "rm -rf ./build/index.bundle.js",
  "compile": "NODE_ENV=production webpack --config ./webpack.config.js --progress"
},
```
> start: sẽ chạy webpack dev server và tự động mở đường dẫn localhost:3000 trên trình duyệt.
> clean: sẽ xóa những file index.bundle.js được sinh ra trong thư mục /build/.
> compile: webpack sẽ biên dịch và sinh ra file index.bundle.js trong thư mục /build/
> build: sẽ chạy lệnh clean và rồi là compile.
## Cài đặt hoàn tất và tiếp theo là thử nó thôi
### Trong quá trình phát triển:
Chúng ta sử dụng webpack để chạy project react. Để sử dụng, đơn giản là gọi câu lệnh:
```
yarn start
```

Nó sẽ tự động mở trình duyệt và đến địa chỉ localhost:3000. Bạn nên thấy nội dung trang index.html ta vừa thêm vào ở đây
Webpack server cũng tự động hỗ trợ ta thấy ngay thay đổi khi chúng ta thay đổi gì đó trong thư mục /src/, nó sẽ tự động reload lại page cho chúng ta thấy.
### Hoàn thiện và chạy project
Chúng ta sử dụng webpack để đóng gói tất cả những gì cần thiết vào một file gọi là bundle
![](https://images.viblo.asia/e52a371b-a3d7-49c9-ad46-fa64eca09ec6.png)
Để đóng gói ta chạy lệnh:
```
yarn build
```

Nó sẽ tạo một file gọi là index.bundle.js trong thư mục /build/, file index.html cũng nằm ở đây.

Sau khi chạy xong, ta vào thư mục /build/, ta sẽ thấy như sau:
```
- build
   
   - index.html
   - index.bundle.js
```
Ở đây là 2 file cho chúng ta pushlish ra ngoài, file index.bundle.js sẽ chứa mọi thứ ta cần, ta chỉ cần mở file index.html trong một trình duyệt.

**Chúng ta có thể đẩy chúng lên một hosting nào đó và hưởng thành quả nào!**


-----


Mình dịch và sửa một xíu từ link : https://itnext.io/from-zero-to-deploy-set-up-react-stack-with-webpack-3-20b57d6cb8d7