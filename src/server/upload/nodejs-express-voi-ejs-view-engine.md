Chào mọi người. Đầu xuân năm mới, mình xin phép tiếp tục series NodeJS của mình với framework Express. Chắc hẳn với ai lập trình web cũng ít nhất một lần nghe tới Framework này. Chúng ta cùng bắt đầu với một số kiến thức cơ bản của Express nhé.

![nodejs-express.png](https://images.viblo.asia/28538475-4b47-4933-bb6f-c362a620d252.png)

# 1. Express là gì ?

Theo trang chủ của Node.js chúng ta có những nhận định : 
- Express là một framework NodeJS nhẹ và linh hoạt để cung cấp bộ tính năng mạnh mẽ cho phát triển ứng dụng web và mobile.
- Với vô số các phương thức HTTP và middleware tiện lợi cho chúng ta tạo API đơn giản và nhanh chóng.
- Về hiệu năng: Express cung cấp một lớp các tính năng ứng dụng web cơ bản mà không bỏ đi  các tính năng Node.js mà bạn biết hay yêu thích trước đó.
- Rất nhiều framework phổ biến được xây dựng dựa trên Express.

### Cài đặt :
Hãy chắc chắn bạn đã cài đặt trước NodeJs và NPM. Trong bài đầu tiên của series mình cũng đã giới thiệu cách cài đặt 2 package này. Các bạn có thể vào https://viblo.asia/p/nodejs-bai-1-hello-world-ORNZqn4Ll0n hoặc vào trang chủ của Nodejs và npm để xem cách cài đặt nhé!

Tiếp theo chúng ta sẽ cài đặt package express thông qua npm như các package khác. 

```bash 
npm express --save
```

### Require package và chạy Hello world: 
```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Ứng dụng đang chạy trên cổng ${port}`)
})
```
Ở trên là một ứng dụng cơ bản nhất với Express. 


# 2. Express application generator:
Express đã cung cấp cho chúng ta một công cụ giúp tự động tạo ra nhanh chóng một bộ khung cho ứng dụng của mình, công cụ có tên là express-generator. Để cài đặt công cụ này chúng ta cũng cài như cách cài đặt các package khác trong  ```npm``` .
```bash
npm install -g express-generator 
``` 
Hiển thị các command có sẵn trong express: 
```bash
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support
        --hbs           add handlebars engine support
        --pug           add pug engine support
    -H, --hogan         add hogan.js engine support
        --no-view       generate without view engine
    -v, --view <engine> add view <engine> support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory

```

Trong hướng dẫn tại trang chủ express có sử dụng view engine  là pug. Tuy nhiên pug có vẻ không thân thiện với những bạn đã học HTML cho lắm. vì vậy mình sẽ sử dụng ejs cho thân thiện hơn. Cũng như thân là một lập trình viên Laravel chuyển qua và cách xây dựng cú pháp của ejs cũng khá giống với blade template trong Laravel vì vậy mình sẽ sử dụng nó. Ngoài ra chúng ta có thể sử dụng các view engine khác như ```hbs, hjs, twig, vash``` và mặc định khi không thêm option view chúng ta sẽ được tự động tạo ứng dụng cùng view engine là jade. 

### Sử dụng ejs view engine
```bash
$ express --view=ejs 
```
Cấu trúc của ứng dụng express được tạo từ công cụ expresss-generator: 

![image.png](https://images.viblo.asia/9208d5a5-32b3-4f40-b40a-a416b3fbd558.png)

Với cấu trúc này chúng ta có thể thấy express đã xây dựng lên bộ khung khá đầy đủ cho một ứng dụng với folder ```routes```  và ```views```. 

#### views
Sơ qua về views. Chúng ta có thể thấy được trong folder này, toàn bộ phần hiển thị ra trình duyệt cho user tức phần giao diện đều được đặt trong phần này. Mở file ```views/index.ejs``` chúng ta có :
```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
  </body>
</html>
```
Trong đây chúng ta thấy khá giống một file html bình thường. Tuy nhiên điểm đặc biệt , chúng ta có thể tách một file lớn thành các file nhỏ ejs và tái sử dụng, dùng chung các thành phần giống nhau hay truyền dữ liệu từ bên ngoài vào mà cụ thể ở trong file này chúng ta có thể gửi dữ liệu vào thông qua cặp thẻ ``` <%= data %> ``` Để biết thêm về cú pháp ejs. Mình có để đường link ở đây để mọi người tham khảo : https://ejs.co/#docs 

#### routes: 
Routes là thành phần đóng vai trò điều hướng từ url được nhập vào trên trình duyệt tới các page. hay controllers.

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```
express.Router() có đầy đủ các phương thức HTTP request như: get, post, put, delete. 

Để  tiện cho việc quản lý chúng ta có thể   phân chia file cho router bằng cách : 

Thêm file vào thư mục ```routes```:
```routes/admin.js
var express = require('express');
var router = express.Router();

/* Admin route. */
router.get('/admin', function(req, res, next) {
  res.send('Admin page');
});

module.exports = router;

```

Tiếp theo chúng ta require route vào file app.js 
```app.js
var adminRouter = require('./routes/admin');
...
app.use('/admin', adminRouter);
```
Kết quả : 
![image.png](https://images.viblo.asia/9228da77-04fd-4489-a694-c67a728610e6.png)

# 3. Kết luận.
Bài viết này mình đã chia sẻ cơ bản về express cũng như cách cài đặt, tự tạo một ứng dụng Express với views và routes. Ngoài ra để theo chuẩn mô hình MVC (Model- View - Controller) , mô hình mà sử dụng phổ biến hiện nay mình sẽ viết tiếp ở bìa viết tiếp theo. Xin phép tạm dừng bài viết tại đây. Cảm ơn mọi người đã đọc tới cuối bài viết, nếu có ý kiến góp ý hay phản hồi mong mọi người để lại bình luận dưới bài viết nhé. Đừng quên upvote bài viết giúp mình nhé :D