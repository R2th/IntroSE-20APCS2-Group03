### 1. Mở đầu  
Tiếp tục chia sẻ về **Reactjs**, công cụ cực kỳ mạnh mẽ và phổ biến hiện nay trong lĩnh vực phát triển ứng dụng **Web**, bài viết này mình sẽ chia sẻ cách chúng ta **Setup** một **project** **React** từ đầu với **Webpack** và **Babel**.  
Việc tạo nên một **Project React** tối ưu thực sự không phải công việc dễ  dàng, đòi hỏi nhiều công sức và có sự am hiểu về hệ sinh thái rộng lớn của **React**. Với một **Project** lớn, mình nghĩ chúng ta vẫn nên sử dụng các bộ **Kit** nổi tiếng như **create-react-app, react-boilerplate,...** Tuy nhiên việc tự **build** **project** chắc chắn sẽ giúp hiểu rõ hơn cách mà **React** hoạt động, cũng như hoàn toàn có thể xử lý những **issue** liên quan đến **config** trong **project** của mình.  
**Project** của chúng ta sẽ sử dụng **Webpack** và **Babel** trong đó:  
+ **Webpack** là công cụ cực kỳ phổ biến và mạnh mẽ giúp chúng ta tổ chức mã nguồn **Javascript** theo nhiều **Module**
+ **Babel** là công cụ giúp **compile** mã nguồn **JSX** và **Javascript ES6+** trong project trở thành phiên bản **Javscript** mà mọi trình duyệt có thể hiểu được.  
  
### 2. Thực hiện  
Bước đầu tiên là khởi tạo thư mục **project** và cài đặt các **dependencies** cần thiết
```
mkdir react-app
cd react-app
npm init -y
```
```
npm install --save react react-dom
```
Tiếp đó ta tạo file gốc của **project**
```
touch index.js
touch index.html
```
và thêm vào đó những dòng code đầu tiên
**index.html**
```html
<!DOCTYPE html>
<html>
    <head>
        <title>my react app</title>
    </head>
    <div id="app"></div>
</html>
```
**index.js**
```js
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => <div>Hello World</div>


ReactDOM.render(<App />, document.getElementById('app'))
```
**Cài đặt và config Webpack**  
Cài đặt **webpack**
```
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
```
+ **weback-cli** giúp tạo môi trường hoạt động của **webpack**
+ **webpack** là công cụ tổ chức, **bundle** mã nguồn
+ **webpack-dev-server** khởi tạo **server** môi trường **development** giúp cho việc phát triển ứng dụng dễ dàng hơn với tính năng như **hot-reload**
+ **html-webpack-plugin** giúp kết nối mã nguồn **Javascript** tạo nên bởi **webpack** và **file** gốc **index.html**  
  
 Và tạo **file** thiết lập và cấu hình **webpack**
```
touch webpack.config.js
```
mặc định **webpack** sẽ tìm đến **file webpack.config.js** tại thư mục gốc của **project**, nếu muốn tạo đường dẫn riêng, chúng ta sẽ cần cho **webpack** biết khi thực hiện **bundle** mã nguồn.  
```js
var path = require('path')

module.exports = {
    entry: './index.js,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    }
}
```
**entry** và **output** là 2 khái niệm cơ bản và quan trọng nhất của **webpack**, theo như **config** ở trên, toàn bộ mã nguồn của chúng ta sẽ được nhận từ **file** gốc **index.js**, sẽ được **webpack** tổ chức, tối ưu và xây dựng thành một **file javscript** duy nhất và lưu tại thư mục **build**.  
Tiếp theo chúng ta cần cho **webpack** biết sẽ nhận mã nguồn từ những **extensions** nào, cũng như sử dụng công cụ gì để **compile** mã nguồn  thông qua thuộc tính **rules**
```js
var path = require('path')
var HtmlWebpackPlugin

module.exports = {
    entry: './index.js,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
       rules: [
           {
               test: /\.(js)$/,
               use: 'babel-loader'
           }
       ]
    },
    plugins: [
        new HtmlWebpacklugin({
            template: './index.html'
        })
    ]
}
```
Ở đây ta sẽ sử dụng công cụ **babel-loader** để **compile** mã nguồn **Javscript** và **plugins HtmlWebpackPlugin** để kết nối **file bundle.js** với file gốc **index.html**.  
Đừng quên chúng ta chưa cài đặt **babel** nhé:
```
    npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
```
trong đó:
+ **@babel/preset-env** giúp **complie** mã nguồn **Javscript Es6+** thành **Javscript ES5**  
+ **@babel/preset-react** sẽ **compile** **jsx** trở thành **javsscript**   
Tất nhiên **babel** cũng cần một chút **config** biết được nó sẽ phải làm gì bằng cách thêm đoạn mã sau vào **file** **package.json**
```json
{
    ...
    "babel": {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
        ]
    }
    ...
}
```
Chúng ta vừa làm khá là nhiều bước, và có vẻ **project** của chúng ta đã có thể hoạt động bước đầu, hãy một lệnh **script** nữa vào **file** **package.json** và kiểm tra thành quả nhé:
```json
...
    script: {
        "start": "webpack"
    }
...
```
Sau đó mở terminal, gõ lệnh:
```
npm start
```
Đợi một xíu khi **webpack compile sucess** rồi mở thư mục **build** vừa được khởi tạo:
![](https://images.viblo.asia/bb128b12-f948-4ba4-a745-50f855798db8.PNG)  
OK chúng ta bước đầu đã **setup** thành công một **project** **react** cơ bản, trong phần tiếp theo của bài viết này mình sẽ giới thiệu nhiều hơn các bước cần bổ sung để chúng ta xây dựng **project** hoàn chỉnh hơn, cảm ơn đã theo dõi bài viết.