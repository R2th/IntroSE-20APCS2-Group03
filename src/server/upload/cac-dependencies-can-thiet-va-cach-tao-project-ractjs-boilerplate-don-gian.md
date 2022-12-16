## Giới thiệu
Chắc hẳn khi bạn đi phỏng vấn xin việc về ReactJS hay học ReactJS trong một thời gian dài phải nghe qua Webpack, Babel rồi chứ. Vậy webpack là gì, babel là gì? 
   
   Có khi nào khi bạn làm một project ReactJS bạn tự hỏi, làm thế nào mà trình duyệt có thể hiểu được cái code JSX hay ES2015, ES2016, ES2017 trong khi bạn chạy đoạn code đó trong trình duyệt mà nó lại báo lỗi. Làm thế nào chúng ta có thể quản lý các module, tối ưu hoá CSS, images vân vân và mây mây.
Khi bạn có các câu hỏi đó thì bạn sẽ được tiếp cận đến với webpack và babel.

Webpack là một module mạnh mẽ, nó nhận nhiệm vụ đóng gói tất cả các tệp của chúng ta (JavaScript, LESS, CSS, JSX, ES6, v.v.) thành 1 file duy nhất. Nhờ đó, project sẽ được module hoá và tăng performence.

Babel là một công cụ chuyển đổi mã lệnh JavaScript hay JavaScript transpiler, được dùng với mục đích chuyển đổi mã lệnh JavaScript được viết dựa trên tiêu chuẩn ECMAScript phiên bản mới về phiên bản cũ hơn trước đó.

Nhưng nói lý thuyết không gì rất dễ nhanh quyên nên mình quyết định vừa đi vào ví dụ, vừa nói luôn tác dụng của chúng nhé.

## Khởi tạo Project
Đầu tiên bạn tạo thư mục mới và nhập: 
`mkdir react-app`
trên cả win lẫn mac,

Tạo thư mục src và thêm 2 file index.js và index.html trong src theo lệnh:

Trên MacOS:
   ```
   mkdir src
   touch src/index.html
   touch src/index.js
```
Trên Win:
   ```
   mkdir src
   echo "" > src\index.html
   echo "" > src\index.js
```
Sau đó chúng ta sửa file index.html và index.js như sau:

**src/index.js**

    > `console.log("Hello React App")`

![](https://images.viblo.asia/278c6397-fa42-4038-a0f9-b9f10c844e7c.png)
## Thêm Webpack vào project
Chúng ta bắt đầu tiến hành cài đặt webpack, bạn dùng lệnh:

`npm install -D webpack webpack-cli webpack-dev-server`
* **webpack**: là một module đóng gói dùng để dùng để đóng gói Javascript file của app, tại thời điểm hiện tại phiên bản của nó là “4.29.6”
* **webpack-cli**: giúp ta có thể dùng webpack ở command line, version hiện tại là “3.3.0”
* **webpack-dev-server**: sử dụng để theo dõi sự thay đổi trong code của app, khi ta thay đổi code thì nó sẽ giúp chúng ta refresh browser và cập nhật lại UI, version hiện tại là “3.2.1”.

Sau khi cài đặt các dependencies đó, bạn thêm các dòng sau vào ***scripts*** tag trong package.json file:

```
"scripts": {
    "webpack": "webpack",
    "start": "webpack-dev-server --open",
}
```
 
 Cuối cùng bạn chạy lệnh ***npm run webpack*** ở command line, việc này làm webpack chạy theo ***mode production*** và sau quan sát cấu trúc thư mục của bạn: 
 
 ![](https://images.viblo.asia/f1dd1f4f-34a7-4e1c-8d40-d659c47a6902.png)

Bạn có để ý thấy thư mục **dist** được tạo mới và có file **main.js** được sinh ra chứ, 
ta mở file “main.js" xem có gì nào, một dòng js dài loằng ngoằng, thôi bỏ qua. 

Cấu hình lại webpack với ***mode development*** xem có khác biệt gì nào:
```
"scripts": {
    "webpack": "webpack --mode development",
    "start": "webpack-dev-server --open",
}
```
Tiếp tục chạy lệnh **npm run webpack** và xem file ***main.js*** xem có thay đổi gì nào:
![](https://images.viblo.asia/4c3bdfc9-5700-4efb-b81a-70cf439fea89.png)

Kéo xuống dưới ta để ý thấy module **./src/index.js** đã được tạo ra.
## Cấu hình webpack
Lúc trước, do ta chưa cấu hình webpack nên webpack 4 tự động tạo thư mục **dist** và file bundle **main.js**. Giờ ta cấu hình lại webpack để nó bundle ra thư mục và file mình muốn cũng như thêm các plugins khác.

Nhưng trước đó ta cần cài **path** để làm việc với file và thư mục và **html-webpack-plugin** để đơn giản hoá việc tạo tệp html nhằm kết nối với file bundle mà webpack đã tạo:

`npm install -D path html-webpack-plugin`

Tạo file config webpack nào:

* Trên mac chạy 
    `touch webpack.config.js `
* Trên win chạy
    `echo "" > webpack.config.js `

Trong file webpack.config.js ta thêm vào như sau:

![](https://images.viblo.asia/c9c8eda5-782d-4fd9-a090-7e5cfcc15d83.png)

* **Entry và output**: dùng để nói với server của chúng ta là file nào cần phải được bundle và từ đâu, khi biên dich xong thì tên file đó là gì và đặt ở chỗ nào.
* **Plugins**: là nơi cài đặt các plugin cho app, hiện tại ta chỉ set **html-webpack-plugin** để inject file bundle.js mà webpack đã bundle vào file index.html.

Đã tạm xong bước đầu cài cấu hình webpack, ta tiếp tục chạy lệnh:
	`npm run webpack  `
Và kết quả là ta có thư mục build mới cùng với file ***bundle.js***, ***index.html*** bên trong:

![](https://images.viblo.asia/2c3381ec-1fce-4a24-b01f-dac342d49abd.png)

## Cài đặt React và React-dom
   Vậy là webpack đã chạy xong rồi, tiếp đó để xây dựng ứng dụng ReactJS ta cài các dependencies react, react-dom, ta gõ lệnh: 
`npm install react react-dom`
   Sau đó ta sửa file index.js:
   
![](https://images.viblo.asia/907e34f0-4adc-4fb9-a64d-35f1c3b3bfac.png)

  Ta lại tiếp tục chạy lệnh **npm run webpack** một lần nữa nào, và … lỗi ***You may need an appropriate loader to handle this file type***. 
Oh my why?.  Lý do là webpack không thể tự mình đọc được cú pháp js mới nhất được vậy nên ta cần phải tìm đến babel để giải quyết lỗi này nào.

## Cài đặt babel
     `npm install -D @babel/core babel-loader @babel/preset-env @babel/preset-react `
* **@babel/core**: dùng để dịch code ES6 hoặc hơn thành ES5
* **@babel/preset-env**: dùng để xác đinh bộ plugin hay transformation nào được sử dụng.
* **@babel/preset-react**: để dịch React code thành ES5
* **babel-loader**: webpack helper cái mà cho phép chuyển đổi JS sửa dụng babel và webpack
  
Ta thêm file **.babelrc** để cấu hình babel:
>     Win: `echo “” > .babelrc`
>     Mac: `touch .babelrc`
   Trong file **.babelrc** ta chỉnh sửa như sau:
   
![](https://images.viblo.asia/2b7c39c3-f90a-4adc-840d-9d27478a0729.png)

Để sử dụng babel trong webpack, ta tiến vào config file ***weback.config.js***:

![](https://images.viblo.asia/94f10ef7-0171-4047-880d-db8bf76ff524.png)

Lần này thay vì chạy ***npm run webpack*** ta sẽ chạy ***npm start***, cửa sổ trình duyệt mở lên chạy ứng dụng reactjs của chúng ta:

![](https://images.viblo.asia/faca3ea9-7421-42b1-ae70-43fae54d1705.png)

Nhìn đơn giản nhỉ, thử thêm 1 ít style cho nó nào:
    Tạo thư mục **css** và file **style.css** cho ứng dụng: 
    Mac: 
```
    mkdir css
    touch style.css
```
           
   Win: 
```
    mkdir css
    echo “” > css/style.css
```
           
Trong file **style.css** ta sửa theo bất kỳ style nào mình muốn: 

![](https://images.viblo.asia/307c8cdb-6c6e-4065-a3f7-96f5c41fa8b3.png)

sau đó import vào file ***index.js*** và quan sát kết quả:

![](https://images.viblo.asia/91a69bb9-4e52-4397-a885-39834f6d8d4c.png)

Vâng, có lỗi xảy ra và lần này vẫn là ***You may need an appropriate loader to handle this file type*** vậy ra ta cần bộ dependencies khác để biên dịch css. 
## Cài đặt style cho project
        npm install -D style-loader css-loader
* **style-loader**: thêm vào DOM các thẻ style 
* **css-loader**:  sẽ load css vào app của chúng ta.
    Cấu hình nó vào trong **webpack.config.js**:
    
![](https://images.viblo.asia/67618cd6-47eb-4edd-a7a7-90c404de469e.png)

Cuối cùng cũng kết thúc, chạy **npm start** và quan sát thành quả, css đã được load. Yeah

![](https://images.viblo.asia/a6b592f3-d14b-4ea9-aef1-51faa94a8ba4.png)

## Kết luận
Hy vọng bài này có ích cho các bạn. Hẹn gặp lại vào các bài sau nhé

Tài liệu tham khảo: https://medium.freecodecamp.org/how-to-use-reactjs-with-webpack-4-babel-7-and-material-design-ff754586f618