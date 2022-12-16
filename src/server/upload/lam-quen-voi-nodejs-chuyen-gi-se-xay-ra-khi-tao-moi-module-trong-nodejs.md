Chào các bạn! <br>
Nhân dịp Tết đến Xuân sang, chúc mọi người thật nhiều may mắn, hạnh phúc, tấn tài, tấn lộc! <br>
Cùng đến với chủ đề của bài viết này nào!<br>
## 1. Chuyện gì sẽ xảy ra khi tạo mới module trong Node.js:
Trước tiên, mình muốn đặt ra một vấn đề thú vị khi tạo mới một module .js trong Node.js. Vậy câu hỏi sẽ là: *Chuyện gì xảy ra khi chúng ta tạo mới một module?*<br>
Đầu tiên, mình sẽ tạp module app.js với một vài dòng lệnh đơn giản.
```
var message = "Hello Node.js";
function sayHello(message) {
    console.log(message);
}

sayHello(message);
```
Tất nhiên, khi chạy trên terminal, mọi người đều sẽ biết ngay kết quả không thể khác là *Hello Node.js*. Nhưng chuyện gì xảy trước khi chúng ta có kết quả như vậy.<br>
Hãy thêm dòng code sau vào line đầu tiên của module app.js (phải là dòng đầu tiên nhé).
```
var whatHappenning=; //lỗi cú pháp ở đây
var message = "Hello Node.js";
function sayHello(message) {
    console.log(message);
}

sayHello(message);
======= terminal result =========
/home/dinh.tran.minh.hieu/Documents/sample/Nodejs/app.js:1
(function (exports, require, module, __filename, __dirname) { var whatHappenning=;
                                                                                 ^
SyntaxError: Unexpected token ; ...

```
Chạy terminal đoạn code trên, sẽ bị lỗi cú pháp là chắc chắn rồi. Nhưng có điều gì mà chúng ta cần quan tâm ở đây? Vâng, chúng ta có thể thấy dòng code *var whatHappenning=;* được bọc trong một đoạn function trông rất thân quen đúng không nào?.  <br>
Yeah, men. Cùng phân tích tiếp nào. Với lỗi trên giúp cho chúng ta phát hiện ra một điều là đoạn code trong module sẽ được bọc trong một function với các argument. Bây giờ, mình sẽ viết lại đoạn code trên như sau (dĩ nhiên là bỏ line code bị lỗi cú pháp nhé): 
```
(function (exports, require, module, __filename, __dirname) {
    var whatHappenning=; //lỗi cú pháp ở đây
    var message = "Hello Node.js";
    function sayHello(message) {
        console.log(message);
    }

    sayHello(message);
})
```
Nếu các bạn, đã tìm hiểu qua javascript, chắc hẳn, các bạn sẽ nhận ra đây là function sẽ được thi ngay khi khởi tạo. Điều này có nghĩa rằng, các dòng code chúng viết trong một module không được thực thi trực tiếp mà trước khi thực thi nó sẽ được bọc trong function trước khi được thực thi. Giờ mình quay ngược lại các bài trước một chút. Rõ ràng, các bài trước có đề đến *require, exports, module, \__filename, \__dirname*, chúng ta sử dụng những không biết nó bắt nguồn từ đâu. Giờ mình sẽ giải thích thêm ở đây.<br>
Node.js cũng dựa trên javascript engine v8 như trên Chrome browser (trình duyệt Chrome) hoặc các browser khác có sử dụng javascripts engine v8. Tuy nhiên, trên môi trường Node.js lại không có *DOM object* như trên browser, mà Node.js cung cấp cho chúng ta một *global object*. Đó là lý do tại sao chúng ta không thể gọi *console.log(window);* trong Node.js, thay vào đó chúng ta có thể gọi *console.log(global);*. *global object* trong Node.js cũng có các phương thức tương tự như *window object* trên browser, chẳng hạn, *console.log, setTimeout, setInterval, clearTimeout, clearInterval, ...*. Vậy các argument trong function bọc ngoài đoạn code của chúng ta trước khi thực thi nó có thuộc *global object* không hay phạm vi của chúng như thế nào? Thực ra, các argument này không có phạm vi *global* mà chỉ có phạm vi trong *module* mà chúng ta gọi. Và các argument này được truyền vào trong mỗi module để chúng ta thể gọi chúng khi cần thiết.<br>
Việc giải thích ở phần này sẽ giúp chúng ta biết được, tại sao chúng có thể dùng các phương thức *require, exports, module, \__filename, \__dirname* trong mỗi module mà chúng ta tạo ra.

## 2. Giới thiệu và sử dụng một số module/thư viện trong Node.js:
**Module Path:**
*Module Path cung cấp các công cụ để tương tác với file (tập tin) và directory path (đường dẫn) của file.*<br>
*Cách sử dụng:*
```
app.js :
const path = require('path');
console.log("path object: ", path);
console.log("The file path: ", __filename);
console.log("Properties of the file: ", path.parse(__filename));
console.log("Dirname of the file: ", path.dirname(__filename));
console.log("Basename of the file: ", path.basename(__filename));
console.log("Extension name of the file: ", path.extname(__filename));

====== terminal result ======

path object:  { resolve: [Function: resolve],
  normalize: [Function: normalize],
  isAbsolute: [Function: isAbsolute],
  join: [Function: join],
  relative: [Function: relative],
  _makeLong: [Function: _makeLong],
  dirname: [Function: dirname],
  basename: [Function: basename],
  extname: [Function: extname],
  format: [Function: format],
  parse: [Function: parse],
  sep: '/',
  delimiter: ':',
  win32: 
   { resolve: [Function: resolve],
     normalize: [Function: normalize],
     isAbsolute: [Function: isAbsolute],
     join: [Function: join],
     relative: [Function: relative],
     _makeLong: [Function: _makeLong],
     dirname: [Function: dirname],
     basename: [Function: basename],
     extname: [Function: extname],
     format: [Function: format],
     parse: [Function: parse],
     sep: '\\',
     delimiter: ';',
     win32: [Circular],
     posix: [Circular] },
  posix: [Circular] }
The file path:  /home/dinh.tran.minh.hieu/Documents/sample/Nodejs/app.js
Properties of the file:  { root: '/',
  dir: '/home/dinh.tran.minh.hieu/Documents/sample/Nodejs',
  base: 'app.js',
  ext: '.js',
  name: 'app' }
Dirname of the file:  /home/dinh.tran.minh.hieu/Documents/sample/Nodejs
Basename of the file:  app.js
Extension name of the file:  .js
```
Terminal result liệt ra các phương thức có thể sử dụng trong *module path*. Nếu muốn lấy thông tin về đường dẫn của file sử dụng *path.parse(\__filename)*; để lấy thông tin về *dirname* sử dụng *path.dirname(\__filename)*; để lấy thông tin về *basename* sử dụng *path.basename(\__filename)*; ...

**Module OS:**
*Module OS* cung cấp các phương thức và thuộc tính làm việc với thành phần liên quan đến hệ điều hành, chẳng hạn như: bộ nhớ, thông tin CPU, network, operating platform,...
```
const os = require('os');

console.log("The system operating platform: ", os.platform());
console.log("The system operating name: ", os.type());
console.log("The system total memory in bytes: ", os.totalmem());
console.log("The system free memory in bytes: ", os.totalmem());

==== terminal result ====
The system operating platform:  linux
The system operating name:  Linux
The system total memory in bytes:  8225058816
The system free memory in bytes:  8225058816
```

## 3. Lời kết
Việc tìm hiểu kỹ hơn về cách thức hoạt động của một module Node.js giúp ích rất nhiều trong quá trình xây dựng ứng dụng với Node.js. Trong bài viết, này mình cũng giới thiệu thêm về một số module/thư viện trong Node.js và cách sử dụng chúng. Các bạn có thể tìm hiểu thêm trong docs của Node.js<br>
Bài viết không thể tránh khỏi những sai xót, mong nhận được góp ý của các bạn để bài viết được hoàn thiện hơn. Cảm ơn các bạn.<br>

*Nguồn tham khảo:*<br>
    + Node.js: https://nodejs.org/en/docs/