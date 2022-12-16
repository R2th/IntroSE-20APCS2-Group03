## Overview
Với nền tảng Node.js ngày càng phát triển thì có vô vàn những framework mạnh mẽ ra đời 1 trong số chúng là Sails.js.
Sails.js là 1 MVC framework, hiện tại đang chiếm tới 19k star rating trên Github: https://github.com/balderdashy/sails/.
Sails.js support những kiến trúc hiện đại như là build API hướng dữ liệu, các app realtime. Một số tính năng mà Jails.js cung cấp:
- Waterline ORM
- Sinh Rest API
- WebSocket
- Chính sách (quản lý quyền truy xuất)
- Pipline linh hoạt
SailsJs hỗ trợ rất tốt những module của cộng đồng Javascript, bên cạnh đó nó còn có những tài liệu hướng dẫn rất chi tiết.
## Mục đích
Chúng ta sẽ build 1 app đơn giản list ra những comment của user và hỗ trợ việc xác thực tài khoản thông qua quá trình login
## Cấu trúc thư mục
Một app Sails.js cơ bản thường có 1 cấu trúc thư mục như sau:
```
├── api
│ ├── controllers
│ ├── models
│ ├── policies
│ ├── responses
│ └── services
├── assets
│ ├── images
│ ├── js
│ │ └── dependencies
│ ├── styles
│ └── templates
├── config
│ ├── env
│ └── locales
├── node_modules
│ ├── ejs
│ ├── grunt
│ ├── grunt-contrib-clean
│ ├── rc
│ ├── sails
│ └── sails-disk
├── tasks
│ ├── config
│ └── register
└── views
```
Đây là mô hình MVC quen thuộc, trong đó:
- Models: lấy data từ database
- Views: render web page. Trong Sails.js chúng ta dùng .ejs template
- Controllers: xử lý request của user, nhận data từ models và tạo views tương ứng
- Policies: giới hạn quyền truy cập vào từng phần của app. Có thể dùng: HTTP Basic Authen, OAuth 2.0 hoặc là tính năng sign in từ bên thứ 3
## Cài đặt ban đầu
Trước tiên hãy chắc chắn là bạn đã cài đặt `npm` và `Node.js`. Sau đó bạn có thể cài đặt bản mới nhất của Sails bằng câu lệnh sau:
```
npm -g install sails
```
Sau khi install xong chúng ta sẽ tạo 1 app mới bằng câu lệnh:
```
sails new app
cd app
sails lift
```
Khi bạn tạo app mới có thể sẽ có câu hỏi, khởi tạo 1 Webapp hay 1 project rỗng, như sau:
```
 Choose a template for your new Sails app:
 1. Web App  ·  Extensible project with auth, login, & password recovery
 2. Empty    ·  An empty Sails app, yours to configure
```
Trong bài viết này, tôi làm API nên sẽ chọn option 2.
Chạy xong bạn sẽ tạo ra được folder chứa project với cấu trúc đầu tiên.
## Cài đặt điều hướng
Sails.js có 1 cách rất hay để tự sinh ra các API routes và actions dựa trên thiết kế của app là Blueprints. Blueprints sẽ tạo ra resful API dựa trên models và controllers mà bạn tạo. Ví dụ, bạn có model Task.js và controller: TaskController.js, Blueprints sẽ giúp bạn sinh ra 1 url /task/crete?id=1&name=code để tạo 1 task mới. Database của sails sẽ được sử dụng mặc định, bạn ko cần lo lắng đến việc lưu dữ liệu ở đâu nữa cơ :D.
Bạn có thể sinh controller và model 1 cách dễ dàng bằng câu lệnh sau:
```
sails generate api task
```
Tuy nhiên trong project chúng ta sẽ tạo các file và điều hướng bằng tay. Đầu tiên là mở file `config/routes.js` và add đoạn sau:
```Javascript
'get /api/random-quote': 'QuoteController.getQuote',
'get /api/protected/random-quote': 'QuoteController.getProtectedQuote'
```
Ngay khi người dùng truy cập vào những điều hướng này QuoteController sẽ thực thi tác vụ tương ứng và trả về kết quả cho client.

## Cài đặt controllers
Chúng ta hãy đi ngay vào việc cài đặt controllers. Mở folder `api/controller`, tạo 1 file `QuoteController.js` như sau:

``` Javascript
/**
 * QuoteController
 *
 * @description :: Server-side logic for managing quotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getQuote: function(req, res) {
        return res.json({ quote: sails.helpers.quoter() });
    },

    getProtectedQuote: function(req, res) {
        return res.json({ quote: sails.helpers.quoter() });
    }
};
```
Theo quy chuẩn code thông thường các controller được tạo theo tên kiểu: TaskController.js, ItemController.js. Nếu bạn từng làm với Express.js thì cấu trúc này rất quen thuộc.
Ở đoạn code trên, bạn có thấy thiếu cái gì ko? Đó là function `sails.helpers.quoter()`. `quoter` là 1 Sails helper, nó trả về giá trị của 1 function trong helper là `quoter()`, vậy cùng tìm hiểu cách tạo helper nào.

## Tạo helper
Các helper đơn giản là những function trợ giúp mà chúng ta có thể sử dụng bất kỳ đâu trong app. 
Các helpers có thể là các hàm synchorized hoặc asynchoronized, tuỳ vào cách chúng ta cần implement. Ở ví dụ này chúng ta chỉ làm đơn giản là 1 hàm `sync` với key word `sync: true`. Với các hàm async khi gọi cần phải có từ khoá `await` ở trước.

Cụ thểtạo trong folder `api/helpers` file `quoter.js` như sau:
```
module.exports = {
  sync: true,
  friendlyName: 'Random quote',
  description: 'Return a random quote.',
  fn: function (inputs, exits) {
    let quotes = sails.config.custom.quotes;
    var totalAmount = quotes.length;
    var rand = Math.floor(Math.random() * totalAmount);
    return exits.success(quotes[rand]);
  }
};
```
Vì chúng ta dùng 1 `custom config` tên là `quotes`, nên cần khai báo trong `config/custom` trường sau:
```
quotes: "nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim i"
```

Sau đó chúng ta có thể sử phần mềm Postman để check API chạy có ok ko?
Các bạn hãy chạy `sails lift` trên console để run server app. Dùng Postman truy cập vào API: `http://localhost:1337/api/random-quote` được kết quả như sau:<br>
![](https://images.viblo.asia/24f05b62-c6a6-4bc3-83b1-c05a6a3271a6.png)

Kết thúc phần 1 chúng ta đã tạo được 1 API đơn giản gồm Routes, Controllers và Helpers.
Phần sau chúng ta làm quen với Models và cách tạo 1 Authentication API đơn giản

Refs: https://scotch.io/tutorials/build-a-sailsjs-app-from-api-to-authentication#toc-setting-up-policies
https://sailsjs.com/documentation/concepts/helpers
https://hellosails.com/building-api-authentication-from-scratch-part-1/