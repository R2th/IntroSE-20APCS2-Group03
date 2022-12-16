Trước khi bắt đầu thì cũng nên tìm hiểu 1 số ưu nhược điểm của NodeJs nhé. Để coi xem chúng ta có thể dùng NodeJs ở những trường hợp như thế nào? để tối ưu nhất...

# Ưu điểm:
1. Tốn ít Ram hơn vì NodeJs chỉ nhận và xử lý nhiều kết nối với 1 signle thread.
2. JSON APIs: với cơ chế event-driven, non-blocking I/O + JS sẽ thật tuyệt khi làm web bằng JSON
3. Single page application: Với khả năng xử lý nhiều requests đồng thời phải hồi nhanh và bạn không muốn load lại trang quá nhiều thì SPA với NodeJs là 1 sự kết hợp hoàn hảo
4. Streamming data: Xây dựng các proxy phân vùng các luồng dữ liệu để đảm bảo tối đa hoạt động cho các luồng dữ liệu khác
5. Real Time: các ứng dụng như chat, feed như FB, Twitter thì NodeJs làm rất tốt nó sẽ xử lý giao tiếp từ client tới máy chủ theo thời gian thực, tất cả là do cơ chế none-blocking không đồng bộ. 
6. Shelling tools unix: sẽ tận dụng tối đa Unix để hoạt động, tức là có thể xử lý hàng nghìn process và trả ra 1 luồng khiến cho hiệu xuất hoạt động tối đa và tuyệt với nhất
7. Performance nhanh vì được xây dựng dựa vào nền tảng V8 Javascript Engine.
8. Có giấy phép được cấp bởi MIT lincense
# Nhược điểm
1. Ứng dụng nặng tốn tài nguyên có lẽ sẽ không phù hợp với NodeJs.
2. Cộng đồng chưa lớn bằng PHP, Ruby, Python hay .Net.

# Hello World
- Vẫn là nên khởi đầu đơn giản nhất, hiển thị hello word bằng nodejs
    - Tạo 1 file index.js
    - thêm console.log("Hello Word")
    - mở terminal và chạy node `index.js`
    - output // Hello Word


# Express function và Normal function
**normal function**
```
normal();

function normal() {
  console.log("Normal");
}
// Normal
```
**expression function**
```
var expressionFunction = function() {
  console.log("Expression");
}
expressionFunction();
// Expression
```

ở đây các bạn sẽ không thấy gì khác biệt giữa 2 cách viết normal function và express function. Tuy nhiên thử thay đổi 1 chút ở express function xem sao

```
expressionFunction();

var expressionFunction = function() {
  console.log("Expression");
}
// TypeError: expressionFunction is not a function
```

Tức là bạn phải định nghĩa function này trước khi bạn gọi nó. vì bạn đang gọi biến được gắn function đó

Còn với normal function nó sẽ không xảy ra lỗi vì khi load js nó sẽ load tất cả các normal function vào trong scope và các bạn có thể gọi được tất cả ở đâu cũng được

Chúng ta nên tùy vào phạm vi sử dụng function mà có thể áp dụng cho function theo normal funtion or express function.

# Module
Nếu như các bạn code tất cả trong 1 file thì nó sẽ rất là lớn, và khó kiểm soát. Vì vậy chúng ta nên tách ra từng module để khi chúng ta cần j thì gọi vào mà thôi, tránh thừa thãi..

Module được đóng gói và là private chỉ khi nào đc import và được khai báo thì mới được sử dụng
Module có 2 loại:
1. Module được tạo sẵn khi bạn cài đặt NodeJs như http, https, fs, path,... Bạn có thể tham khảo tại https://www.w3schools.com/nodejs/ref_modules.asp

2. Module bên ngoài: được viết sẵn và chỉ cần cài đặt với npm https://www.npmjs.com/. Bạn cũng có thể tự định nghĩa module và sử dụng cho riêng mình.

Mình sẽ hướng dẫn mọi người tự tạo 1 module tự export vào import vào nhé

  - Tạo 1 file navBar.js
    ```
    Cách 1
    function displayNavBar(array) {
      var nav = "";
      for(x in array){
        nav += array[x] + "  "
      }
      return nav;
    } 
    
    module.exports = {
      displayNavBar: displayNavBar
    }
    ```
     
     tạo funtion displayNavBar và return nav. 
     `module.exports` là export function. Các bạn có thể export nhiều function dưới dạng hash như mình định nghĩa hoặc có thể export 1 function như sau:
     ```
     Cách 2
     var displayNavBar = function(array){...}
     module.export = displayNavbar;
     ```
     
     - Ở file index.js chúng ta hãy import file navBar.js bằng cú pháp
       
       `const navBar = var navBar = require('./navBar')`
       
       Sau khi import chúng ta có thể sử dụng được nếu nó là 1 hash
        `console.log(navBar.displayNavBar(["Home","New","Contact"]))` theo Cách 1
        
       `console.log(navBar(["Home", "New", "Contact"]))` Theo cách 2

# NPM
NPM là quản lý các package or modules trong NodeJs. Các bạn có thể vào https://www.npmjs.com/ để download và sử dụng chúng
NPM đã được cài đặt khi bạn cài đặt nodeJs

Sử dụng:
1. Truy cập https://www.npmjs.com/
2. search upper-case trong search packages
3. https://www.npmjs.com/package/upper-case Bạn sẽ được hướng dẫn cách sử dụng upper-case package
4. `npm install upper-case --save` để install package
Note: Chúng ta sẽ thấy tự generate 1 file là package-lock.json và 1 folder node-modules chứa package upper-case
5. `var upperCase = require('upper-case')` import nó trong index.js
6.  console.log(upperCase('string')); hiển thị string 
7.  output: // STRING

Còn rất nhiều packages hữu dụng khác, và các bạn có thể tìm kiếm trên npmjs.com như jquery, bootstrap, css,..

# EventEmitter Object
Có rất nhiều hành động trên máy tính và mỗi 1 hành động là 1 sự kiện (event)

Dó nó là module được tạo sẵn khi cài đặt nodeJs rồi nên chúng ta ko phải download cài đặt thêm nữa
Chúng ta sẽ tạo ra 1 sự kiện và sẽ thực hiện nó.
vẫn ở file index.js
```
// import package events
var events = require('events');
// Khởi tạo event emitter
let EM = new events.EventEmitter();

// Tạo event confess là hãy nói I Love You
EM.on('confess', function(){
  console.log("I love You")
});

// Hành động 
EM.emit("confess");

output: // I Love You
```

# Read And Write File
Làm cách nào để đọc 1 file và để export 1 file?

Chúng ta có thể sử dụng module 'fs' để làm điều đó

Tạo 1 file text.txt với nội dung:
`This is content text`
Vẫn ở file index.js
```
var file = require('fs')

var contentText =  file.readFileSync('text.txt', 'utf8'); // đọc file đồng bộ
var contentText =  file.readFile('text.txt', 'utf8'); // đọc file bất đồng bộ

console.log(contentText)
output: // This í content text

file.writeFileSync('file-export.txt', "This is file export1") // export file đồng bộ
file.writeFile('file-export.txt', "This is file export1") // export file bất đồng bộ
```

Có 2 cách đọc và export file đồng bộ hoặc khồng đồng bộ. Mọi người có thể tham khảo 1 trong 2 cách. 

# Send Email
Bạn có thể dễ dàng gửi mail khi sử dụng package `npm i nodemailer`

```
// import nodemailer
var nodemailer = require('nodemailer');
// Tạo và khai báo user gửi mail
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'iminh@****.com',
    pass: '********'
  }
});

// Nội dung mail, và thông tin địa chỉ gửi
var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
 attachments: {filename: 'text.txt', path: './text.txt'}
};

// send mail
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
output: // Email sent: 250 2.0.0 OK  1559812706 j7sm4278156pjb.26 - gsmtp
```

Đơn giản đúng không mọi người. Còn khá nhiều option và custom trong module mọi người có thể tham khảo https://nodemailer.com/about/

# Kết Luận
Bài 2 cũng kết thúc rồi. Ở bài này mình muốn đề cập tới ưu nhược điểm của nodeJS, Sự khác nhau của normal function và expression function để hỗ trợ và làm dễ hiểu hơn trong phần import và export module. Cũng như làm quen với module trong JS gồm 3 cách:
1. sử dụng những module có trong NodeJS
2. download và sử dụng những module có sẵn trên internet (kiểu như Gem trong ruby)
3. tự tạo 1 module và sử dụng chúng

Ở bài tiếp theo mình sẽ tìm hiểu thêm về cách thức hoạt động server trong js. Hẹn gặp mọi người ở bài tiếp theo