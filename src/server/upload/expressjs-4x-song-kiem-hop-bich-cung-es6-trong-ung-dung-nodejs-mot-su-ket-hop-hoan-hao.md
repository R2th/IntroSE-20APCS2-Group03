![](https://images.viblo.asia/af60fee3-209b-4b44-b5a1-f62da2a9c2fe.png)

Như các bạn đã biết, **NodeJS** là một mã nguồn được xây dựng dựa trên nền tảng Javascript V8 Engine, nó được sử dụng để tạo nên các ứng dụng web như các trang phim, forum và đặc biệt là trang mạng xã hội phạm vi hẹp, có tính realtime.

**ExpressJS** là một web framework tối giản và siêu nhanh cho NodeJS.

NodeJS thì được viết dựa trên **ES5**, và ExpressJS cũng thế.

**ES6** hiện tại cũng được NodeJS hỗ trợ, tuy nhiên chưa thực sự chính thức.

ExpressJS core thì hầu như chưa hỗ trợ ES6.

Vâng, giới thiệu nhanh gọn lẹ là vậy. Bạn có muốn theo xu hướng của thế giới, muốn sử dụng những gì mới nhất của JS (ES6) để viết ứng dụng với NodeJs không?

Trong bài này, chúng ta sẽ cùng tìm hiểu cách cấu hình một project để có thể code ExpressJs với ES6 bạn nhé ;)
## Bước 1: Chuẩn bị thư mục
- Tạo một thư mục với tên bất kỳ. VD: `simple-nodeapp`
- Mở terminal (cmd) tại thư mục này
- Chạy lệnh sau để tạo một project mới sử dụng npm:
```
npm init -y
```
- Bạn sẽ nhận tức khắc một file `package.json` thế này:
```
{
  "name": "simple-nodeapp",
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
Đơn giản phải không nào ;)
## Bước 2: Tạo index.js
- Tại thư mục gốc project, bạn tạo một file **index.js** đơn giản với cú pháp ES6 nhé (Có thể là một tên khác)
```
import express from 'express';

console.log('welcome to expressjs');
```
Đơn giản vậy thôi ;)
## Bước 3: Cài đặt các module cần thiết
Chúng ta sẽ cần một số module ở **dependences** lẫn **dev-dependences** như sau:
### Dependences:
- `express`: Web framework gọn nhẹ cho Nodejs

Để cài đặt **express** bạn chạy lệnh bên dưới nhé (tại thư mục gốc project)
```
npm install --save express
```
Đến đây, thư mục **node_modules** sẽ xuất hiện với một mớ module hỗn độn, kèm theo đó file **package.json** của chúng ta sẽ thành thế này:
```
{
  "name": "simple-nodeapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```
### Dev dependences:
- `@babel/cli`, `@babel/core`, `@babel/preset-env`: Các module thuộc thư viện **Babel**

Nói thêm về Babel một tý, **Babel** là một công cụ chuyển đổi JavaScript hay JavaScript transpiler, được dùng với mục đích chuyển đổi code JavaScript được viết dựa trên tiêu chuẩn ECMAScript phiên bản mới về phiên bản cũ hơn trước đó. Cụ thể ở đây, chúng ta sẽ chuyển đổi code được viết bằng ES6 về ES5 để ExpressJs và Nodejs có thể hiểu được.

Cài đặt bộ ba với lệnh sau:
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```
Này thì **package.json**:
```
{
  "name": "simple-nodeapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.5",
    "@babel/preset-env": "^7.4.5"
  }
}
```
Tới đây, chúng ta đã hoàn thành việc cài đặt các module, thư viện cần thiết. Còn một vài bước quan trọng nữa là cấu hình để babel hoạt động trong project, tiếp tục xem thử bạn nhé.
## Bước 4: Tạo file cấu hình cho Babel trong project
- Bạn cần tạo một file `.babelrc` tại thư mục gốc project với nội dung sau:
```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```
File này được sử dụng để bảo với babel cách chuyển đổi các tệp JavaScript. Chúng ta sẽ chuyển đổi code ES mới nhất sang ES5.
Bạn có thể tham khảo chi tiết về babel preset-env [tại đây](https://babeljs.io/docs/en/babel-preset-env) nhé ;)
## Bước 5: Sử dụng Babel để biên dịch file javascript
Đây là công đoạn quan trọng hơn cả, thiếu phần này xem như công sức của chúng ta nãy giờ đổ sông đổ biển cả.
Bạn chú ý phần `scripts` nhé ;)
```
{
  "name": "simple-nodeapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "babel ./index.js -D --out-dir dist",
    "start": "npm run build && node dist/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.5",
    "@babel/preset-env": "^7.4.5"
  }
}
```

Chúng ta sẽ sử dụng babel cli `babel ./index.js -D --out-dir dist` để build file index.js. Code ES6 sẽ được chuyển thành ES5. Từ đó, có thể chạy `node dist/index.js` hệt như những gì bạn đã từng chạy node ;)

Ồ :open_mouth: Như vậy chúng ta đã có thể sử dụng những tính năng mới nhất của ES6 vào ứng dụng Nodejs rồi đấy.

(Tiêu đề bài viết mình có đề cập đến ExpressJs 4.x, tuy nhiên chỉ là cố tình đánh bóng một tý thôi :joy:)

Ở bài viết sau, chúng ta sẽ cùng nhau xây dựng cấu trúc một project ExpressJS hoàn chỉnh hơn (thật sự dùng bản latest 4.x) với một vài API đơn giản sử dụng ES6 nhé. Hẹn gặp lại các bạn ;)