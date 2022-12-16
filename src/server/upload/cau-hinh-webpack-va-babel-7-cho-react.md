Như chúng ta đã biết hiện nay làm việc với React hầu hết sử dụng đến ``create-react-app``, một công cụ tuyệt vời giúp chúng ta chỉ cần tập trung vào React mà ít khi phải quan tâm đến việc chúng đã cấu hình ra sao. Sau một thời gian học React, mình nghĩ các bạn sẽ thắc mắc đến vấn đề đó. Vì vậy hôm nay chúng ta sẽ tìm hiểu cấu hình ``Webpack`` và ``Babel 7`` cho React.

Trước tiên, cùng tìm hiểu về ``Webpack`` và ``Babel`` nhé ! :)

### :point_right: Webpack
``Webpack`` là một module đóng gói giúp chúng ta đóng gói ``project`` của mình thành một file. Nó yêu cầu phải có một file config ``webpack.config.js`` nằm ở thư mục ``root`` của project, là nơi chúng ta sẽ cho ``webpack`` biết cách làm việc với project của mình bằng việc cung cấp thông tin đầu vào và đầu ra

```
const path = require('path');

module.exports = {
  entry: './src/app.js', // relative path
  output: {
    path: path.join(__dirname, 'public'), // absolute path
    filename: 'bundle.js' // file name
  }
};

```

``entry`` là nơi mà ứng dụng của chúng ta sẽ bắt đầu và ``output`` là một đầu ra. Trong ``output`` chúng ta phải cung cấp một đường dẫn tương đối - nơi nó được tạo ra và tên của file đó.

### :point_right: Babel

``Babel`` là một trình biên dịch Javascript. Trên thực tế nó không phải là một function, nó sẽ không biên dịch bất cứ thứ gì theo mặc đinh, thay vào đó chúng ta sẽ cung cấp ``plugins`` và ``preset`` để nó có thể bổ trợ thêm các tính năng trong ngôn ngữ của bạn. Bạn có thể ghé thăm trang chủ của [Babel](https://babeljs.io/) để xem ``doc`` của nó.  Ở trong website của ``babel`` bạn sẽ dễ dàng tìm thấy ``Try It Out``, click vào đấy sẽ thấy cửa sổ như này

![](https://images.viblo.asia/2b6c5275-0ada-45f2-9fa3-420b208b92b4.jpeg)

Ở cột bên trái nơi bạn sẽ viết code và cột phải các bạn sẽ thấy được code sau khi babel biên dịch, bây giờ chúng ta hãy viết một vài JSX vào cột trái nhé

```
const template = <p>Hello</p>;
```

Ở cột phải, ban sẽ thấy được code Javascript tường minh hơn, dễ hiểu hơn đúng không, và trình duyệt của bạn sẽ đọc được code này. Ở phía bên trái, bạn thấy một số tùy chọn PRESETS trong đó một số tùy chọn đã được đánh dấu. Nếu bây giờ bạn bỏ chọn tùy chọn này, bạn sẽ thấy lỗi do ``react-preset`` này chịu trách nhiệm chuyển đổi cú pháp JSX của chúng ta thành mã JavaScript.

Ở trong bài này chúng ta sẽ dùng 2 presets:
1. @babel/preset-env : Giúp babel chuyển đổi code ES6, ES7 và ES8 thành ES5.
2. @babel/preset-react : Giúp chuyển đổi JSX sang mã Javascript.

Chúng ta đã biết được sơ lược về ``webpack`` và ``babel`` rồi, giờ hãy đi cấu hình cho app React của bạn nào.

*  Tạo các thư mục với câu lệnh dưới

```
mkdir react-setup-tutorial
cd react-setup-tutorial
mkdir public src
touch public/index.html src/app.js
```

Chúng ta vừa thêm file ``index.html`` vào ``public``. giờ thêm đoạn code html sau
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>React App</title> 
  </head>

  <body>
    <div id="root"></div>

    <script src="./bundle.js"></script>
  </body>
</html>
```

* Khởi tạo project với
```
npm init -y
```

*  Cài đặt Webpack và Babel
```
npm install webpack webpack-cli --save-dev
```

chúng ta đã cài ``webpack-cli`` vì vậy có thể dùng webpack trong command line. Chúng ta đã biết sẽ cần file cấu hình webpack ở thư mục root, tạo file ``webpack.config.js`` vơi code
```
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  }
};
```

Tiếp theo, thêm lệnh webpack ở file ``package.json``

```
"scripts": {
    "start": "webpack --mode=development",
    "build": "webpack --mode=production"
  }
```

Sẽ có 2 mode, ``develop`` và ``production``. ở ``production`` tệp output sẽ được tối ưu hoá để có thể hoạt động tốt nhất trên môi trường production

* Cài đặt React
```
npm install react react-dom
```
Bây giờ ``import`` react vào file ``app.js`` và thêm các dòng code sau
```
import React from 'react';
import ReactDOM from 'react-dom';

const template = React.createElement('p', {}, 'Hello from react');

ReactDOM.render(template, document.getElementById('root'));
```

Bây giờ chạy dòng lênh ``npm start`` trong terminal và mở file ``index.html`` trong trình duyệt của bạn.

App của bạn hoạt động tốt đúng ko , nhưng ban sẽ thắc mắc tại sao không dùng JSX. Chúng ta cùng thử thêm JSX vào file ``app.js`` nka

```
import React from 'react';
import ReactDOM from 'react-dom';

const template = <p>Hello from react</p>;

ReactDOM.render(template, document.getElementById('root'));
```

Bây giờ chạy lại câu lệnh ``npm start``

App chúng ta sẽ bị lỗi, bời chúng ta dùng JSX và Javacript không hỗ trợ JSX, vì vậy cần biên dịch JSX sang mã Javascript, đây là lúc dùng ``babel``

* Cài đăt và config babel

```
npm install @babel/core @babel/preset-env @babel/preset-react babel-loader --save-dev
```

Chúng ta đã biết về ``@babel/preset-env`` ``@babel/preset-react`` 

@babel/core : Cho phép chạy công cụ babel giống như webpack

babel-loader : Là môt plugin. Nó cho webpack biết cách chạy babel khi webpack nhìn thấy một số tệp nhất định.

Tạo file config ``.babelrc`` vào thư mục root

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

File này sẽ khai báo những ``preset`` để babel có thể biên dịch.

Bây giờ chúng ta thêm đoạn code sau vào file ``webpack.config.js``
```
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
```

* Cài đặt Dev Server:

```
npm install webpack-dev-server --save-dev
```

Thêm đoạn code sau vào file ``webpack.config.js``

```
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  // changed line
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
};
```

Thêm câu lệnh webpack-dev-server vào ``package.json``
```
"scripts": {
    "start": "webpack --mode=development",
    "build": "webpack --mode=production",
    "dev-server": "webpack-dev-server"
  }
```

Cùng start nào
```
npm run dev-server
```

* Load styles cho App

```
mkdir src/styles
touch src/styles/styles.css
```

Thêm đoạn code css vào file ``styles.css``

```
* {
    color: blue
}
```

Để load được ``css`` bạn cần thêm rules mới trong ``webpack.config.js`` . Một số loader hỗ trợ đọc css
```
npm install css-loader style-loader --save-dev
```

css-loader: Cho phép webpack load file css

style-loader:  Đọc css và thêm vào thẻ <style>
    
Bây giờ thêm rules mới vào ``webpack.config.js``
```
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // New rules to load css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
};
```
Import file ``styles.css`` vào ``app.js`` và chạy run dev-server để thấy thay đổi của css.
 ```
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';

const template = <p>Hello from react</p>;

ReactDOM.render(template, document.getElementById('root'));
  ```
 
Như vậy chúng ta đã cấu hình ``Webpack`` và ``Babel`` cho React, bạn có thể tạo project React của riêng mình. Bài viết còn nhiều thiêú sót, cảm ơn các bạn đã dành chút thời gian đã đọc bài viết này :heart_eyes:
    
 Bài viết có tham khảo tại : [Setup Webpack and Babel for React](https://hackernoon.com/how-to-setup-webpack-and-babel-7-for-react-6xpy3615)