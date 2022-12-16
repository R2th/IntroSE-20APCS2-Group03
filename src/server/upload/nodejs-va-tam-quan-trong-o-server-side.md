Trong các bài trước, mình có viết một chút về các khái niệm, thành phần kiến trúc của node. Tiếp tục với series về **nodejs** mình xin viết thêm một chút về tầm quan trong của nodejs ở phía **server-side**, rất mong nhận được các góp ý. 

OK!  **Node.js** là một trong những công nghệ phía máy chủ mạnh mẽ, có khả năng mở rộng rấtcao. Chúng ta có thể viết một ứng dụng chỉ bằng một ngôn ngữ **JAVASCRIPT** .Chúng ta có thể sử dụng bất kỳ một frontend frameworks như **Angular**,  **React**,  **Ember**, **Vue**  hoặc thậm chí **jQuery** đơn thuần và phía backend, ta chỉ cần sử dụng một nền tảng của javascript đó là “**Node.js** “. 

### Web Development 
![](https://images.viblo.asia/0e679fd6-b4da-4ea3-b4f0-783ace91e7d8.png)

Trong hình trên là một ví dụ về công nghệ Fullstack Web Development. 

Phía Frontend, chúng ta có thể sử dụng bất kỳ client-side javascript framework mới nhất nào đó, và mình đã đề cập một số framework mới và khá ưa chuộng ngày nay. Phía back-end hay server-side, chúng ta có thể sử dụng **Node.js** . 

### Mobile Development
![](https://images.viblo.asia/0c2155c0-1fce-4c89-b023-2503f152f4e6.png)

Chúng ta cũng có thể sử dụng  Node.js  trong phát triển thiết bị di động. 

### Desktop Application Development

Chúng ta cũng có thể hoàn toàn phát triển các ứng dụng máy tính để bàn bằng Node.js bằng cách sử dụng khung công tác của nó có tên là [Electron](https://electronjs.org/).  

**Slack**, **Github**, **Atom** và nhiều phần mềm khác dành cho máy tính để bàn cũng được xây dựng dựa trên **Electron** .

### Core của Node.js
**Node.js** được được xây dựng và chạy trên **V8 engine**. **V8 engine** dựa trên **C++**. Vì vậy, cuối cùng, trái tim của **Node.js** chính là **C++** .
![](https://images.viblo.asia/f51eee29-a3ae-4c73-a85b-1c9f9a6cc314.png)

Chính vì vậy nên Nodejs có khả năng mở rộng cao. Đối với các hệ thống tệp thực hiện các thao tác **I/O,** Nodejs sử dụng **non-blocking** và **single threaded**. Thời gian gửi yêu cầu và nhận phản hồi, giao tiếp qua internet rất nhanh.  
<br>
#### Xây dựng nhanh một ứng dụng web đơn giản sử dụng Nodejs và Express:
**Express** là khung ứng dụng web cho Node.js cung cấp một bộ tính năng mạnh mẽ để phát triển các ứng dụng web nhanh chóng và phong phú.  

Để bắt đầu ta tạo một thư mục dự án và đi đến thư mục đó chạy lệnh sau bằng terminal:
```
npm init
```

Sau khi hoàn tất việc tải dữ liệu, trong thư mục gốc của bạn sẽ xuất hiện một file **package.json**. Tệp này chứa các cấu hình cho các phụ thuộc của project, nó sẽ tự động cập nhật khi tải các gói mới từ **Node Package Manager**. 

##### Cài đặt khung express
Để tải gói Express từ  Node Package Manager ta chạy lênh:
```
npm install --save express
```

Sau khi hoàn tất ta tao một file **app.js** trong thư mục gốc, file này chính là main server file, nó sẽ khởi động máy chủ node và phục vụ một số tệp tĩnh. Thêm đoạn mã sau vào trong tệp để tạo một server-side: 
```js
// app.js

var express = require('express');
var app = express();
var port = 3000;

app.listen(port, function(){
    console.log('hello world');
})
```

Bây giờ mở terminal và gõ lệnh **`node app`** ta sẽ nhận được dòng *‘hello world’*. 

Nếu chúng ta không muốn khởi động lại máy chủ theo cách thủ công thì chúng ta có thể sử dụng một gói được gọi đó là **`nodemon`**. Nó sẽ tải lại máy chủ mỗi khi chúng ta có sự thay đổi về tệp. 
```
npm install -g nodemon
```

Thêm dòng sau vào đối tượng scripts trong file **package.json **.
```
"start": "nodemon app.js"
```

Khi bạn nhập npm start trên terminal, nó sẽ tự khởi động tải lại máy chủ khi chúng ta thay đổi các tập tin. 

Nếu chúng ta muốn thiết lập định tuyến trong **express app**, ta sẽ làm như sau: 
```js
// app.js

var express = require('express');
var app = express();
var port = 3000;

app.listen(port, function(){
     console.log('Server is running on port:', port);
})
app.get('/', function(req, res){
     res.send('Hello Express');
});
```

Khởi động lại máy chủ . truy cập url http://localhost:3000 bằng trình duyệt ta sẽ nhận được dòng *Hello Express* trên trình duyệt. 

Có vẻ ngon nghẻ, tiếp tục ta tạo một thư mục **public** trong thư mục gốc  để chứa các thư viện như **bootstrap, jquery** hay các file **CSS** và **Javascript**… Ngoài ra, Ta cần tạo thêm thư mục **views** trong thư mục gốc để chưa các tệp **HTML**. 

Để sử dụngcác tệp tĩnh từ máy chủ ta thêm vào tệp **app.js** đoạn mã:
```js
// app.js

app.use(express.static('public'));
```

Truy cập  http://localhost:3000/css/bootstrap.css nếu mã CSS hiển thị trên trình duyệt, thì chúng ta đã thành công. 

Toàn bộ tệp **app.js** sẽ trông như thế này:
```js
// app.js
var express = require('express');
var app = express(); 
var port = 3000;  

app.use(express.static('public')); 
app.listen(port, function(){   
    console.log('Server is running on port:', port); 
}) 
app.get('/', function(req, res){     
    res.send('Hello Express'); 
});
```

Ở đây chúng ta sẽ sử dụng  **“ejs” templating engine** vì nó hoàn toàn là **html** thuần khá quen thuộc và đơn giản.
```
npm install --save ejs
```

Và cần bổ sung vào tệp app.js để có thể sử dụng **view engine**. 
```js
// app.js

app.set('view engine', 'ejs');
```

Tạo một tệp view **index.ejs** trong thư mục **views**:
```html
<!-- index.ejs -->

<!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8">
      <title>EJS Engine</title>
      <link rel="stylesheet" href="/css/bootstrap.min.css">
   </head>
   <body>
      <div class="container">
         <div class="jumbotron">
            NodeJS&Express Cơ Bản
         </div>
      </div>
   </body>
</html>
```

Thiết lập các định tuyến cho ứng dụng chúng ta cần sử dụng module bộ định tuyến được cung cấp bởi Express:
```js
// app.js

var itemRouter = express.Router();
```

Bây giờ chúng tôi có thể tạo nhiều định tuyến mong muốn. 
```js
// app.js

var itemRouter = express.Router();

app.use('/items', itemRouter);  

itemRouter.route('/').get(function (req, res) {   
    res.render('items'); 
}); 
itemRouter.route('/single').get(function (req, res) {   
    res.render('singleItem'); 
});
```

Vì vậy, khi truy cập URL  http://localhost:3000/items, express sẽ hiển thị chế độ xem file **items.ejs **. 

Ta có thể tách riêng các bộ định tuyến ra một file riêng biệt để dễ dàng quản lý bằng cách tạo file **itemRoutes.js** với đường dẫn file từ thư mục root là: **src >> routes >> itemRoutes.js** và thêm đoạn mã sau:
```js
// itemRoutes.js

var express = require('express'); 
var app = express(); 
var itemRouter = express.Router();  

itemRouter.route('/').get(function (req, res) {   
    res.render('items'); 
});  
itemRouter.route('/single').get(function (req, res) {   
    res.render('singleItem'); 
});  

module.exports = itemRouter;
```

Trong **app.js** cần gọi đến file định tuyến đó:
```js
// app.js 

var express = require('express');  
var app = express(); 
var port = 3000;  
var itemRouter = require('./src/routes/itemRoutes'); 
 
app.set('view engine', 'ejs'); 
app.use(express.static('public')); 
app.use('/items', itemRouter);

app.listen(port, function () {   
    console.log('Server is running on port:', port); 
});  
app.get('/', function (req, res) {   
    res.render('index'); 
});
```

Vậy đó, thật đợn giản và nhanh chóng.
Và mình tạm dừng ở đây. Tiếp nối sẽ là việc **CRUD** sử dụng **CSDL noSQL MongoDB**. 

***TTB 2019.***