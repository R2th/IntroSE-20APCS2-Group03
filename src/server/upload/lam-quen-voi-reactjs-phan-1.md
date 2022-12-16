# 1. Tổng quan

ReactJS là thư viện JavaScript được sử dụng để xây dựng các thành phần UI có thể tái sử dụng được.

Nhiều người sử dụng ReactJS giống như phần V trong MVC, cung cấp một mô hình lập trình đơn giản và hiệu suất tốt hơn. React cũng có thể render trên server bằng Node và nó có thể cung cấp năng lượng cho các ứng dụng gốc bằng React Native. React thực hiện luồng dữ liệu một chiều, tối giản hơn so với data binding truyền thống.

## Các tính năng

*  **JSX** - là phần mở rộng cú pháp JavaScript. Không cần thiết phải sửa dụng JSX trong React, nhưng nó được khuyến khích.

*  **Components** - React là tất cả về components. Bạn cần nghxi mọi thứ như là một component. Điều đó sẽ giúp bạn maintain code khi làm việc ở các dự án quy mô lớn.

*  **Unidirectional data flow and Flux** - React thực hiện luồng dữ liệu một chiều giúp dễ dàng suy luận về ứng dụng của bạn. Flux là một partern giúp giữ cho dữ liệu của bạn một chiều.

*  **License** - React được cấp phép theo tài liệu Facebook Inc. Tài liệu được cấp phép theo CC BY 4.0.

## Ưu điểm

* React sử dụng DOM ảo. Điều này cải thiện hiệu suất của ứng dụng, vì DOM ảo nhanh hơn DOM thông thường.
* Có thể sử dụng từ phía khách hàng và phía server cũng như các framework khác.
* Component và data patterns cải thiện khả năng đọc, giúp maintain ứng dụng lớn.

## Hạn chế

* Chỉ bao gồm phần views lớn trong ứng dụng, do đó bạn vẫn cần chọn các công nghệ khác để có bộ công cụ hoàn chỉnh cho phát triển toàn bộ ứng dụng.
* Sủ dụng inline templating and JSX, tương đối khó sử dụng mới một số lập trình viên.

# 2. Cài đặt môi trường
Trong phần này chúng tôi sẽ hướng dẫn đầy đủ cách cài đặt môi trường. Có thể hơi nhiều bước nhưng nó sẽ có ích cho phát triển ứng dụng sau này.

Chúng ta cần cài đặt NodeJS và NPM.
NodeJS alf nền tảng cần thiết để phát triển dự án ReactJS. Bạn có thể đọc hướng dẫn cài đặt NodeJS [tại đây] (https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm).

Sau khi cài đặt thành công NodeJS, chúng ta có thể bắt đầu cài đặt React khi dử dụng NPM. Bạn có thể chọn một trong hai cách:
*  Sử dụng webpack và babel.
*  Sử dụng dòng lệnh **create-react-app**.

## 1. Sử dụng webpack và babel

**Webpack** là một module bundler. Nó nhận các module phụ thuộc và biên dịch chúng thành một gói. Bạn có thể sử dụng gói này khi phát triển ứng dụng bằng dòng lệnh hoặc bằng cách config chúng bằng file `webpack.config`.

**Babel** là một trình biên dịch JavaScript. Nó dùng để chuyển đổi mã nguyền sang nguồn khác. 

### Bước 1 - Tạo thư mục Root

Tạo thư mục với name **reactApp** trên máy để cài đặt tất cả các file cần thiết, sử dụng lệnh mkdir

```
>mkdir reactApp
>cd reactApp
```

Để tạo bất kỳ module nào, cần phải tạo file **pack.json**. Do đó, sau khi tạo thư mục chúng ta cần tạo file **pack.json**. Bạn cần chạy lệnh **npm iniut**.

```
\reactApp>npm init
```

Câu lệnh này sẽ hỏi thông tin về module, như packge name, mô tả, tác giả... Bạn có thể bỏ qua điều này bằng cách sử dụng tùy chọn:

```
\reactApp>npm init -y
Wrote to C:\reactApp\package.json:
{
   "name": "reactApp",
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

### Bước 2 - Cài đặt React và React DOM

Nhiệm vụ chính của chúng ta là cài đặt ReactJS và các gói DOM của nó, sử dụng các câu lệnh**install react** và **react-dom** của npm tương ứng. Bạn có thể thêm các gói của chúng vào fiel **pack.json** bằng cách thêm option `--save`.

```
\reactApp>npm install react --save
\reactApp>npm install react-dom --save
```

Hoặc bạn có thể cài đặt chúng trong cùng 1 lệnh:

```
reactApp>npm install react react-dom --save
```

### Bước 3 - Cài đặt webpack

Cài đặt  webpack, webpack-dev-server và webpack-cli.

```
\reactApp>npm install webpack –save
\reactApp>npm install webpack-dev-server --save
\reactApp>npm install webpack-cli --save
```

Hoặc sử dụng một lệnh:

```
\reactApp>npm install webpack webpack-dev-server webpack-cli --save
```

### Bước 4 - Cài đặt babel

Cài đặt babel và các plugin của nó: babel-core, babel-loader, babel-preset-env, babel-present-react và html-webpack-plugin.

```
\reactApp>npm install babel-core babel-loader babel-preset-env babel-preset-react html-webpack-plugin --save-dev
```

### Bước 5 - Tạo files

Để hoàn tất cài đặt, chúng ta cần tạo các file sau: index.html, App.js, main.js, webpack.config.js và .babelrc. 

```
\reactApp>type nul > index.html
\reactApp>type nul > App.js
\reactApp>type nul > main.js
\reactApp>type nul > webpack.config.js
\reactApp>type nul > .babelrc
```

### Bước 6 - Compiler, Server và Loaders

Mở file webpack-config.js và thêm đoạn code sau.
Chúng ta setting webpack entry point thành main.js. Đường dẫn đầu ra là nơi ứng dụng đi kèm sẽ được phục vụ.  Chúng ta cũng đặt server development thành cồng 8001. Tuy nhiên bạn có thể chọn bất kỳ cổng nào bạn muốn.

**webpack.config.js**
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './main.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js'
   },
   devServer: {
      inline: true,
      port: 8080
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ]
}
```

Mở file `package.json` và xóa **"test" "echo \"Error: no test specified\" && exit 1"** trong **"script"**. Chúng ta xóa dòng này vì sẽ không thực hiện bất kỹ thử nghiệm nào trong phần này. Thay vào đó hãy thêm các lệnh **start** và **build**:

```
"start": "webpack-dev-server --mode development --open --hot",
"build": "webpack --mode production"
```

### Bước 7 - index.html

Đây chì là file html thông thường. Chúng ta đặt `div id = "app"` thành phần gốc cho ứng dụng và thêm file index_bundle.js.

```
<!DOCTYPE html>
<html lang = "en">
   <head>
      <meta charset = "UTF-8">
      <title>React App</title>
   </head>
   <body>
      <div id = "app"></div>
      <script src = 'index_bundle.js'></script>
   </body>
</html>
```

### Bước 8 - App.jsx và main.js

Đây là component đầu tiên của React. Chúng ta sẽ tìm hiều các React components sâu hơn trong các phần tiếp theo. Trong phần này chúng ta sẽ thửu render **"Hello World"**

**App.js**
```
import React, { Component } from 'react';
class App extends Component{
   render(){
      return(
         <div>
            <h1>Hello World</h1>
         </div>
      );
   }
}
export default App;
```

Chúng ta cần import component này và render chúng trong App root, 

**main.js**
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

ReactDOM.render(<App />, document.getElementById('app'));
```

Tạo một file có tên .babelrc vào sao chép nội dung sau:
```
{
   "presets":["env", "react"]
}
```

### Bước 9 - Khởi động server

Quá tình cài đặt đã hoàn tất, để khởi động server, ta chạy lệnh sau:

```
\reactApp>npm start
```

Sau đó chúng ta truy cập địa chỉ sau: http://localhost:8001/

![](https://images.viblo.asia/c4c64474-8136-4052-a5f8-916e587c718c.jpg)

### Bước 10 - Tạo bundle

Cuối cùng, để tạo bundle bạn cần chạy lệnh build sau:

```
\reactApp>npm run build
```

## 2. Sử dụng lệnh create-react-app

Thay vì sử dụng webpack và babel, bạn có thể cài đặt ReactJS đơn giản hơn bằng cách sử dụng **create-react-app**

### Bước 1 - Cài đặt **create-react-app**

Sử dụng lệnh sau:

```
C:\Users\Tutorialspoint>cd C:\Users\Tutorialspoint\Desktop\
C:\Users\Tutorialspoint\Desktop>npx create-react-app my-app
```

Lệnh này sẽ tạo thư mục có tên `my-app` trên máy bạn và cài đặt các tệp cần thiết trong đó.

### Bước 2 - Xóa tất cả source file

```
C:\Users\Tutorialspoint\Desktop>cd my-app/src
C:\Users\Tutorialspoint\Desktop\my-app\src>del *
C:\Users\Tutorialspoint\Desktop\my-app\src\*, Are you sure (Y/N)? y
```

### Bước 3 - Thêm file

Thêm files index.css và index.js

```
C:\Users\Tutorialspoint\Desktop\my-app\src>type nul > index.css
C:\Users\Tutorialspoint\Desktop\my-app\src>type nul > index.js
```

Trong file index.js thêm đoạn sau:

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

### Bước 4 - Chạy project

Cuối cùng ta chạy lệnh sau để start:

```
npm start
```

![](https://images.viblo.asia/4d7d9843-7dec-4330-a15d-098458723be6.jpg)

# Nguồn
https://www.tutorialspoint.com/reactjs/reactjs_quick_guide.htm