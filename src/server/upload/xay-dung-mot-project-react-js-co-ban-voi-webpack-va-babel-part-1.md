Khi bạn học React chắc chắn bạn sẽ phải xem từng qua các câu lệnh khởi tạo được viết ở document của React Js.

```
npx create-react-app my-app
cd my-app
npm start
```

Bạn tự hỏi là có cách nào khác để tạo một dự án react không? <br/>
Sau đây trong bài viết này mình sẽ giới thiệu các bạn đến một cách khác để build được một project React Js bằng Webpack và Babel nhé. <br/>
Cùng tìm hiểu thôi nào :sunglasses: <br/>
<br/>
![](https://images.viblo.asia/99d9132f-8504-411f-a8e2-071b89a5313a.png)

## 1. Bắt đầu thôi nào
### 1.1 Môi trường
Tất nhiên rồi, project của chúng ta hoạt động trên môi trường **node.js** và cài đặt **npm** hoặc thêm cả **yarn** nếu bạn muốn
### 1.2 Khởi tạo project
Các bạn tạo một folder muốn chứa dự án của mình bằng các câu lệnh sau

```
mkdir react-with-webpack
cd react-with-webpack
npm init -y
```

Khi chạy câu lệnh npm init -y thì các b có thể tùy chỉnh các thông tin của project, các bạn có thể bỏ qua bằng cách bấm enter.  
Sau khi hoàn thì trong folder của bạn sẽ xuất hiện một file package.json với nội dung sau:

```
{
  "name": "react-with-webpack",
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

Vậy là bạn đã khởi tạo thành công project rồi, bước tiếp theo mình sẽ chỉ các bạn thêm các thư viện cần thiết cho dự án nhé!
## 2. Cài đặt các thư viện cần thiết
### 2.1 Cài đặt React Js
Không thể thiếu trong một project về React là thư viện React :smile: 

Bạn cài đặt bằng câu lệnh sau:

```
npm install --save react react-dom 
```

Thư viện react và react-dom sẽ được cài đặt như một dependency
### 2.2 Cài đặt Webpack
Tất nhiên không kém quan trọng đó là webpack một công cụ giúp gói gọn toàn bộ file js, css(bao gồm cả scss,sass,..). Nó giúp bạn compile các module Javascript theo cấu trúc project. Ngoài ra nó có thể tối ưu tùy chọn theo môi trường khác nhau như development hay production. 
Vì một trường browser chỉ nhận HTML, CSS, JavaScript nên bạn sẽ cần webpack để đóng gói và biên dịch ra HTML, CSS, JavaScript cho browser có thể hiểu. 
Bạn cài đặt bằng câu lệnh sau:

```
npm install --save-dev webpack webpack-cli
```

Thư viện webpack và webpack-cli sẽ được cài đặt như một dev dependency.
### 2.3 Cài đặt Babel
Để project React có thể chạy chúng ta cần một trình biên dịch JavaScript để có thể chuyển đổi mã ES6 và JSX thành ES5 và Babel có thể làm điều đó. 
Cài đặt **babel-core**, **babel-loader**, **babel-preset-env**, **babel-preset-react** như một dev dependency.

```
npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react 
```

Trong đó: 
- **babel-core**: Giúp chuyển đổi mã ES6 sang ES5.
- **babel-loader**: Giúp webpack dịch mã, đưa ra các cài đặt trước.
- **babel-preset-env**: Preset giúp babel chuyển đổi mã ES6, ES7 và ES8 sang ES5.
- **babel-preset-react**: Preset giúp chuyển đổi mã JSX sang javascript. 

Đây là file package.json sau khi cài đặt các thư viện cần thiết :heart_eyes: <br/>
<br/>
![](https://images.viblo.asia/6e8a0377-f752-4c48-8e43-cd52e6c39148.png)


## 3. Cấu hình cho dự án
### 3.1 Tạo file html để render
Tạo một folder **src** trong dự án của các bạn. 
Trong folder **src** tạo một file index.html có nội dung cơ bản sau: 

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Build project react with webpack</title>
</head>
<body>
  <div id='root'></div>
</body>
</html>
```

<br/>
Tiếp theo cũng trong folder **src** tạo thêm một file index.js với nội dung cơ bản sau:  <br/>

```
import React from "react";
import ReactDOM from "react-dom";
ReactDOM.render(
  <div>Started build project react with webpack</div>,
  document.getElementById("root")
);
```

Vậy là chúng ta đã thêm những file cần thiết để có thể render, tiếp theo sẽ setup các file cấu hình biên dịch dự án của chúng ta. 
### 3.2 File webpack.config.js
Ở folder gốc chúng ta tạo một file webpack.config.js để xác định các thông tin biên dịch.
```
const path = require("path");

const config = {
  entry: {
    bundle: "./src/index.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: "/node_modules/",
      },
    ],
  },
};

module.exports = config;
```
Trong đó:
- **entry** để xác định file đầu vào.
- **output** xác định file đầu ra và đường dẫn chứa nó.
- **mode** xác định bạn đang làm việc trên môi trường nào.
- **module** thêm các loader cho dự án của bạn
    - **use** xác định loại chuyển đổi
    - **test** xác định files chuyển đổi
    - **exclude** các file sẽ không được chuyển đổi

Webpack sẽ đóng gó tất cả các file js của chúng ta thành một file bundle.js trong folder dist cùng cấp với folder src
### 3.3 File .babelrc 
Để có thể chạy được trên browser thì chúng ta cần cấu hình trình biên dịch. 
Tạo một file .babelrc trong thư mục gốc, với nội dung cơ bản sau: 

```
{
  "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
  ]
}
```

Vậy là đã xong những bước đầu để build được một project React dùng webpack và babel. 

Để chạy dự án thì các bạn chạy câu lệnh 

```
webpack
```

trong terminal, khi webpack chạy xong sẽ tạo cho chúng ta một folder tên là dist và có file bundle.js bên trong. 

Các bạn chèn dòng 

```
<script src="../dist/bundle.js"></script>
```

vô sau thẻ **body** trong file index.html và rồi chạy file html đó và xem những gì mình đã làm được :sunglasses: <br/>
Đây là kết quả của mình. <br/>
<br/>
![](https://images.viblo.asia/13cbef8c-dc26-4ea0-b99b-a51832ad3106.png)


## 4. Thêm style-loader, css-loader, file-loader vô dự án
Để có thể sử dụng các file css và file image, sound,.. ... cho dự án các bạn cần phải cài đặt và cấu hình **style-loader**, **css-loader**, **file-loader** vô trong file webpack.config.js sau đó b có thể style hoặc load file image, sound... cho project React của bạn rồi.
### 4.1 Install style-loader, css-loader
Cài đặt **style-loader**, **css-loader** như một dev dependency.

```
npm install --save-dev style-loader css-loader
```

Cấu hình **style-loader**, **css-loader** vô **webpack** các bạn thêm câu lệnh sau vô rules

```
{
    use: ["style-loader", "css-loader"],
    test: /\.css$/i,
  }
```

Vậy là project của chúng ta có thể thêm style cho trang web rồi.

### 4.2 Install file-loader
Cài đặt **file-loader** như một dev dependency.

```
npm install --save-dev file-loader
```

Cấu hình **file-loader** vô **webpack** các bạn thêm câu lệnh sau vô rules

```
{
    loader: "file-loader",
    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/,
  }
```

Vậy là project của chúng ta có thể import các file image, sound cho trang web rồi.

## 5. Thêm plugins trong webpack
Có rất nhiều plugin mà bạn có thể thêm vào webpack bạn có thể truy cập [plugins trong webpack](https://webpack.js.org/plugins/) để xem nhiều hơn về plugin nhé. 
Mình sẽ giới thiệu các bạn sử dụng plugin **HtmlWebpackPlugin**, plugin này có tác dụng giúp bạn tạo một file html để phục vụ webpack.

Các bạn chạy câu lệnh `npm install --save-dev html-webpack-plugin` plugin sẽ được cài đặt như một dev dependency. 

Sau khi đã cài đặt thì các bạn vào file cấu hình webpack và thêm đoạn code sau để có thể thêm plugin vô webpack nhé. 
```
plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: __dirname + "/dist/index.html"
    }),
  ],
```

Trong đó có một số options cơ bản sau:
- **template**: đường dẫn đến mẫu html mà bạn có.
- **filename**: đường dẫn mà bạn muốn webpack tạo ra file html.
Để xem nhiều hơn về các options thì mọi người vô trang [này](https://github.com/jantimon/html-webpack-plugin#options) xem thêm nhé. 
Sau khi thêm plugin xong thì bạn xóa dòng ``` <script src="../dist/bundle.js"></script> ``` ở file index.html trong thư mục src nhé.

Vậy là mỗi khi chạy câu lệnh `webpack` thì webpack sẽ tự tạo và thêm các file js vô html trong folder giúp bạn rồi, việc còn lại là chỉ cần vô folder dist và mở file html đó thôi. 

![](https://images.viblo.asia/3943d051-9dd1-4f02-bcf0-10aea4345869.png)



## 6. Sử dụng dev server trong webpack
Nếu bạn làm đã đến đây thì có nghĩa là dự án của bạn đã gần hoàn thành việc dựng cơ bản, nhưng có một điều là khi các developer phát triển trên môi trường dev thì không thể nào mà cứ chạy `webpack` xong load đi load trang web lại đúng ko nào. 

Các bạn cần cài đặt thư viện **webpack-dev-server** để có thể tạo một server bằng webpack.

```
npm install --save-dev webpack-dev-server
```

Sau khi cài đặt xong các bạn vô webpack và thêm các câu lệnh sau.

```
devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
  },
```

Trong đó:
- **contentBase**: đường dẫn đến nơi chứa nội dung. 

Để xem thêm nhiều cấu hình(như https,...) cho devServer các bạn truy cập [đây](https://v4.webpack.js.org/configuration/dev-server/) nhé. 

Vậy là đã xong, giờ các bạn chỉ việc chạy câu lệnh **webpack serve** và thế là project của bạn đã được khởi chạy với đường dẫn http://localhost:3000 . **Lưu ý** : địa chỉ localhost của mỗi máy có thể khác nhau hoặc do các bạn thiết lập

Đây là kết quả 

![](https://images.viblo.asia/4d0890d6-654c-4204-94c3-91930d48400e.png)




Một lưu ý là thay vì sử dụng câu lệnh **webpack serve** thì các bạn thể thêm câu lệnh sau vô field **scripts** trong file **package.json** nhé.

```
    "start": "webpack",
    "serve": "webpack serve"
```

Giờ bạn có thể chạy câu lệnh **npm run serve** để khởi chạy project được rồi

## Tài liệu tham khảo
- https://webpack.js.org/
- https://babeljs.io/


## Tiếp theo
Ở phần tiếp theo mình sẽ setup **react router**, **redux**, **axios**, **sass** và **docker** vào source và dựng một source tree mà mình hay dùng trong các dự án.