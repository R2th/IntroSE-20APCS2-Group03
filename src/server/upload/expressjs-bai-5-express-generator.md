Trong bài viết này chúng ta sẽ thực hiện thao tác thiết lập một `project` mới bằng ứng dụng Express Generator chính chủ của ExpressJS, và thảo luận về một số công cụ được Express Generator thiết lập sẵn.

## Cài đặt

```CMD|Terminal.io
npm install express-generator --global
```

## Cú pháp sử dụng

```CMD|Terminal.io
express [các-tham-số-tùy-chọn] [đường-dẫn-tới-thư-mục-gốc-của-project]
```

## Các tham số tùy chọn

```CMD|Terminal.io
-h, --help          xem thông tin sử dụng
    --version       xem phiên bản
-e, --ejs           bổ sung view engine ejs
    --hbs           bổ sung view engine handlebars
    --pug           bổ sung view engine pug
-H, --hogan         bổ sung view engine hogan.js
    --no-view       không sử dụng view engine
-v, --view <engine> bổ sung view <engine> (ejs|hbs|hjs|jade|pug|twig|vash) (mặc định là jade)
-c, --css <engine>  bổ sung css <engine> (less|stylus|compass|sass) (mặc định là không có engine css)
    --git           bổ sung tệp .gitignore
-f, --force         thiết lập project sử dụng một thư mục đã có nội dung
```

## Thiết lập một project mới

Sau khi chúng ta đã có thông tin về cú pháp lệnh sử dụng rồi thì việc tiếp theo là thực hiện thao tác thiết lập một `project` mới thôi.  :D

```CMD|Terminal.io
cd Documents
express --ejs expressjs-blog
```

![](https://images.viblo.asia/8e5a4876-b1d0-4a09-a612-6df76052165a.png)

Trong ảnh minh họa thì mình có sử dụng thêm `css engine` là `less`, tuy nhiên bạn nên để mặc định là không sử dụng nhé. Vì tới thời điểm này việc tự xây dựng giao diện thì chắc chắn là mỗi chúng ta đều có chủ kiến riêng rồi, nên ở một số công cụ mình tiện tay đang xây dựng blog cá nhân mà thêm vào thì bạn cứ bỏ qua đừng quan tâm.

Sau khi chạy câu lệnh thiết lập một `project` mới, Express Generator sẽ tạo ra một thư mục với tên mà chúng ta chỉ định và các tệp bên trong được sắp xếp với cấu trúc như thông báo in ra trong `console`. Và bây giờ chúng ta mở thư mục của `project` trong trình soạn thảo code thì sẽ thấy là chưa có `package` nào được cài đặt cả, nhưng code trong tệp `app.js` đang sử dụng rồi. Thật kỳ lạ. :D

Bây giờ chúng ta xem thử tệp `package.json` để điều chỉnh lại một số thông tin như tên của `project` và xem các câu lệnh khởi động hay chạy thử được thiết lập như thế nào.

![](https://images.viblo.asia/186be525-22ce-4f51-a74c-72b488611ae4.png)

Ồ... như vậy là mọi thứ gần như đã được khai báo đầy đủ hết. Câu lệnh khởi động `project` đang được trỏ tới tệp `www` trong thư mục `bin`. Nếu bạn ngó vào xem nội dung code trong tệp `www` thì sẽ thấy một số thao tác thiết lập khá dài dòng, nhưng nội dung thì vẫn cơ bản là tạo ra một `server` từ module `http` của NodeJS và thiết lập `app` làm hàm tiếp nhận và xử lý tất cả yêu cầu. Điểm quan trọng duy nhất mà chúng ta cần để ý là dòng -

```bin/www.js
var port = normalizePort(process.env.PORT || '3000');
```

Cổng mạng được sử dụng cho phương thức `server.listen` được lấy từ `process.env.PORT` hoặc mặc định là `3000`. Ở đây `process.env` là một `object` chứa các biến môi trường khi chúng ta tạo ra một tệp `.env` để lưu lại một số thiết lập mặc định sử dụng cho một môi trường vận hành nào đó. Tạm thời thì chúng ta có thể chưa cần quan tâm tới yếu tố này và sử dụng giá trị `port` mặc định ở bên phải phép toán `||`. Bạn có thể thay đổi thành một số khác nếu muốn.

Quay lại với tệp `package.json` thì chúng ta có thể bổ sung lệnh `npm test` để sử dụng như lúc trước - trong trường hợp cần chạy thử code để học kiến thức mới và không ảnh hưởng tới code `server` đã có.

```package.json
{
  "name": "express-blog",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "test": "node ./test.js"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1"
  }
}
```

Ở đoạn `dependencies` chúng ta thấy các `package` đã được khai báo đầy đủ và lúc này chúng ta chỉ cần chạy lệnh `npm install` để nhờ `npm` tự động tìm các `package` này và tải về.

```CMD|Terminal.io
cd express-blog
npm install
```

![](https://images.viblo.asia/1b363fd3-bf65-4758-8679-d78be0dc928b.png)

Bây giờ thì chúng ta đã thấy thư mục `node_modules` xuất hiện trong `express-blog` và các `package` đã được cài đặt xong. Thử khởi động `server` nào. :D

```CMD|Terminal.io
npm start
```

Chào mừng bạn đến với Express một lần nữa. :D

![](https://images.viblo.asia/a2a8c9ea-1bdd-4ffe-a41f-6a9c0dd8a55e.png)

Ở `console` chúng ta để ý là đã có chức năng tự động in nhật ký các yêu cầu được gửi tới và cả trạng thái phản hồi. Như vậy là `morgan` trong `app.js` đã hoạt động. Ở đây mình sắp xếp lại code trong tệp `app.js` một chút để chúng ta có thể thảo luận thêm. Do thói quen sử dụng nên mình chỉnh sửa lại tên của các thư mục một chút và bỏ đi các hậu tố `s` ở cuối tên thư mục. Nên nếu bạn thấy thiếu thiếu thì cứ bỏ qua nhé, code của bạn vẫn đủ là được. :D

```app.js
const path = require('path');
const express = require('express');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const httpErrors = require('http-errors');

const indexRouter = require('./route/index');
const userRouter = require('./route/user');

const app = express();

   /* Setup View Engine */

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

   /* Utility Middlewares */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

   /* Các tuyến xử lý yêu cầu */

app.use('/', indexRouter);
app.use('/user', userRouter);

   /* Tạo ngoại lệ 404 và xử lý */

app.use(
   function(req, res, next) {
      next(httpErrors(404));
   },

   function(err, req, res) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('oops');
   }
); // app.use

module.exports = app;
```

Ở đây chúng ta có một đoạn thiết lập các `middleware` bổ trợ là `/* Utility Middlewares */`, một số được `npm` cài đặt về và `require` trong phần code ở đầu tệp, và một số khác là các `middleware` sẵn có của ExpressJS. Trong đó thì tác vụ xử lý các yêu cầu tệp tĩnh được hỗ trợ bởi `express.static` trỏ tới thư mục `public`. Và cuối cùng là `http-errors` được sử dụng để làm điểm xử lý yêu cầu sau cuối nếu tất cả các `route` trước đó đều không phù hợp.

Ở vị trí xử lý ngoại lệ không tìm thấy dữ liệu phù hợp với yêu cầu gửi tới từ trình duyệt web, chúng ta thấy có hai `middleware` - đầu tiên là sử dụng `http-errors` để khởi tạo một `object` mô tả ngoại lệ và chuyển tiếp - sau đó ở hàm xử lý tiếp theo thì các thông tin mô tả ngoại lệ được ghi lại nội bộ và `render` trả về cho người dùng xem giao diện `oops` (nguyên gốc là giao diện `error` nhưng mình quen đặt tên `oops` rồi :D).

Như vậy là mọi thứ đã được thiết lập về cơ bản rất đầy đủ đối với những hiểu biết của chúng ta hiện tại. Bây giờ chúng ta chỉ việc bổ sung thêm các `route` để xử lý các yêu cầu và hoàn thiện blog thôi. 

## Kết thúc bài viết

Về mặt tổng quan kiến thức sử dụng ExpressJS thì chúng ta đã đi qua đầy đủ những thứ cơ bản. Do đó ở các bài viết tiếp theo chúng ta sẽ không có nhiều kiến thức mới, mà thay vào đó chúng ta sẽ nói chi tiết về các thao tác xử lý "đầu -> cuối" của mỗi `route`. Nói tới đây thì mình mới nhớ ra là Sub-Series Database mới chỉ vừa khởi đầu và chúng ta cần chuẩn bị tốt kiến thức này trước khi có thể nói chi tiết về mỗi `route` xử lý được. 

Nhân tiện thì mình vẫn chưa chuẩn bị xong thiết kế web mặt tiền cho blog của mình, do đó nên bạn cứ thong thả nhé. :D Tới khi chúng ta bắt đầu thảo luận về code xử lý chi tiết cho từng `route` thì chắc chắn là cả mình và bạn đều đã có giao diện blog sẵn sàng để sử dụng rồi.

Các bài viết tiếp theo sẽ có tiến trình phụ thuộc vào tiến trình học tập của chúng ta trong Sub-Series Database, và khi viết bài mới ở đây thì mình sẽ mặc định xem như là bạn đã đọc xong những bài viết mới nhất của Sub-Series Database. Vậy nhé, hẹn gặp lại bạn. :D

[[ExpressJS] Bài 6 - Từ từ để xem chúng ta học Database ra sao đã.. học theo cách tự nhiên mà. :D](https://viblo.asia/p/Eb85oAVkZ2G)