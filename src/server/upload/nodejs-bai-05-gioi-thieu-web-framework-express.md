Như trong [bài trước](https://viblo.asia/p/nodejs-bai-04-gioi-thieu-ve-eventemitterr-va-http-server-trong-nodejs-E375zkNPKGW) đã nói, đối tượng http.Server cung cấp các hàm cấp thấp cho phép chúng ta làm việc sâu hơn với các thành phần của server như giao thức, gói tin… tức là chúng ta có thể viết server theo ý của chúng ta một cách linh hoạt hơn, tuy nhiên trên thực tế thì khi làm một ứng dụng web chúng ta chỉ nên chỉ nên chú trọng vào các chức năng của web chứ không nên đi sâu vào phần kỹ thuật làm gì.

Do đó cộng đồng Node đã phát triển một số module có chức năng đảm nhiệm các thành phần đó cho chúng ta rồi, bạn có thể xem danh sách ở đây: https://github.com/nodejs/node/wiki/modules#web-frameworks

Các module được phân loại thành các chức năng chính sau đây:

1. Router: có chức năng điều hướng các yêu cầu HTTP đến các hàm xử lý tương ứng. Đây cũng là tính năng có trong các web framework phổ biến khác như Ruby on Rails, Django, Sinatra…
1. Static file servers: có các hàm trả về các file tài nguyên cho client
1. Framework: hỗ trợ phát triển ứng dụng, hầu hết các framework này đều được phát triển dựa trên các framework phổ biến khác như Django, Rails, WebMachine, CakePHP… trong đó Express là web framework phổ biến nhất của Node.
1. Middleware: các module loại này hoạt động giữa phần nhận gói tin HTTP và phần chuyển gói tin đó đến các hàm xử lý.

**Express**

Trang chủ của module này có địa chỉ là: http://expressjs.com/

Để có thể sử dụng Express thì trước tiên chúng ta phải cài đặt, bạn mở terminal (cmd trong Windows) lên và gõ 2 dòng lệnh sau:

```
quanghoa@evilgod:~/Project/JS/test$ npm install -g express
quanghoa@evilgod:~/Project/JS/test$ npm install -g express-generator
```
Hai dòng lệnh trên cài module express và express-generator, trong đó express là web framework chính, còn express-generator là module giúp tạo một project Express mẫu, tức là nó tự tạo cho chúng ta các file và thư mục cần thiết.


```
quanghoa@evilgod:~/Project/JS/test$ express --version
4.13.4
```
Chúng ta có thể xem phiên bản express mới vừa được cài bằng cách chạy câu lệnh express --version. Hiện phiên bản express mà mình dùng để viết các bài hướng dẫn này là phiên bản 4.13.4.

Tiếp theo chúng ta sẽ tạo một project Express bằng câu lệnh:


```
quanghoa@evilgod:~/Project/JS/test$ express --ejs FirstProject
    create : FirstProject
    create : FirstProject/package.json
    create : FirstProject/app.js
    create : FirstProject/public
    create : FirstProject/routes
    create : FirstProject/routes/index.js
    create : FirstProject/routes/users/js
    create : FirstProject/public/stylesheets
    create : FirstProject/public/stylesheets/style.css
    create : FirstProject/views
    create : FirstProject/views/index.ejs
    create : FirstProject/views/error.ejs
    create : FirstProject/public/images
    create : FirstProject/public/javascripts
    create : FirstProject/bin
    create : FirstProject/bin/www
 
    install dependencies:
      > cd FirstProject && npm install
     
    run the app:
      > SET DEBUG=FirstProject:* & npm start
```
Câu lệnh express --ejs FirstProject sẽ tạo một project có tên là FirstProject, bao gồm một thư mục có tên FirstProject với các file và thư mục như trên.

Một project Express sử dụng một số module ngoài nữa nên chúng ta phải cài thêm một số module vào thư mục này bằng câu lệnh:

```
quanghoa@evilgod:~/Project/JS/test$ cd FirstProject && npm install
...
```
Câu lệnh trên bao gồm 2 câu lệnh là cd FirstProject và npm install, câu lệnh cd chỉ là chuyển thư mục hiện tại vào thư mục FirstProject, còn câu lệnh npm install sẽ đọc danh sách các module được sử dụng trong file package.json rồi tạo thư mục node_modules và cài đặt các module đó vào thư mục này.

Sau đó để chạy project này thì chúng ta chạy lệnh sau:

```
quanghoa@evilgod:~/Project/JS/test$ SET DEBUG=FirstProject:* & npm start
 
> FirstProject@0.0.0 start C:\Users\PhoCode\FirstProject
> node ./bin/www
 
 FirstProject:server Listening on port 3000 + 0ms
```
 
Trong đó câu lệnh SET DEBUG=FirstProject:* cho phép chúng ta xem các hoạt động đang xảy ra trên server, còn npm start sẽ chạy server. Mặc định server sẽ chạy trên cổng 3000. Chúng ta có thể vào trình duyệt và gõ localhost:3000 hoặc 127.0.0.1:3000 để xem kết quả.

Đây chỉ là một project trống không với một vài câu thông báo cơ bản.

capture

Các câu lệnh npm install hay SET DEBUG... có thể khác tùy thuộc vào phiên bản Express khác nhau. Tuy nhiên các câu lệnh này đều có hướng dẫn sau khi bạn chạy lệnh express --ejs để tạo project, bạn xem lại sau khi chạy lệnh tạo project thì màn hình có in ra một số câu thông báo, trong đó các dòng thông báo cuối cùng là các dòng hướng dẫn bạn cài các module và chạy server (phần install dependencies và run the app).

**File app.js**

app.js

```
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
 
var routes = require('./routes/index');
var users = require('./routes/users');
 
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/', routes);
app.use('/users', users);
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 
// error handlers
 
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
        message: err.message,
        error: err
        });
    });
}
 
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
       message: err.message,
       error: {}
    });
});
 
 
module.exports = app;
```
File app.js là file chính, có thể coi như là file main trong C++, Java… vậy, file này được tạo ra ở thư mục gốc của project. Chúng ta sẽ tìm hiểu một số câu lệnh trong file này.

```
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
```

Như đã nói ở trên, một project tạo từ Express có sử dụng một số module ngoài nữa như serve-favicon, morgan, cookie-parser... mà những module này không được tự động cài khi chúng ta cài Express, do đó chúng ta phải chạy lệnh npm install để npm cài các module còn thiếu. Ngoài ra Express còn tạo 2 module riêng là routes/index và routes/users, 2 module này có nhiệm vụ xử lý các yêu cầu HTTP tương ứng.

```
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

Phương thức app.set() thiết lập các thông số cho project. Các dòng trên thiết lập đường dẫn đến các module View và engine được dụng để dựng trang web của project, chúng ta sẽ tìm hiểu về View sau.

```
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/', routes);
app.use('/users', users);
```

Phương thức app.use() cấu hình các module middleware như favicon, logger, bodyParser...v.v

Ngoài ra phương thức app.use() còn được dùng để chỉ định hàm xử lý cho từng yêu cầu HTTP nữa. Trong đoạn code trên URL '/' sẽ được chuyển đến module routes, còn '/users' sẽ được chuyển đến module users.

Chúng ta sẽ tìm hiểu kỹ hơn trong các bài sau.

Link tham khảo: https://devskill.org/gioi-thieu-web-framework-express-nodejs