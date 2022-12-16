Như vậy là chúng ta lại bắt đầu một `Sub-Series` mới của [Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m) để tìm hiểu về một `framework` có tên là `ExpressJS`. Đây là một `framework` rất phổ biến dành cho các ứng dụng `web` trên nền `NodeJS` - và sẽ giúp đỡ chúng ta xây dựng phần mềm `server` thuận lợi hơn với nhiều công cụ trừu tượng có cách sử dụng đơn giản.

Trước khi bắt đầu bước vào phần nội dung chính của bài viết, chúng ta sẽ cùng nhìn lại code `server` đơn giản mà chúng ta đã viết trước đó. Ở đây chúng ta vẫn sẽ sử dụng lại cấu trúc thư mục như cũ với các tệp HTML, CSS, và JS giả định đã được tạo ra trước đó. Các thành phần được tạo ra bởi `npm` thì mình sẽ không liệt kê ở đây, tuy nhiên thì chúng ta đều đã biết là `project` khởi đầu đã được `init` xong xuôi rồi. Chúng ta chỉ việc cài đặt thêm `ExpressJS` để viết code thử và học kiến thức mới thôi. :D

```map.txt
[nodejs-blog]
   |
   +---[static]
   |      |
   |      +---[asset]
   |      |      |
   |      |      +---style.css
   |      |      +---main.js
   |      |
   |      +---[post]
   |      |      |
   |      |      +---an-article.html
   |      |      +---another-article.html
   |      |
   |      +---index.html
   |      +---oops.html
   |
   +---route.js
   +---server.js
   +---test.js
```

```/nodejs-blog/route.js
const fsPromises = require('fs/promises');
const path = require('path');

const handleHomeRequest = function(request, response) {
   var indexHtml = path.join(__dirname, 'static', 'index.html');

   fsPromises.readFile(indexHtml)
      .then(function(data) {
         response.setHeader('content-type', textType.html);
         response.writeHead(200);
         response.end(data);
      })
      .catch(function(error) {
         console.error(error);
      });
}; // handleHomeRequest

const handlePostRequest = function(request, response) {
   var postHtml = path.join(__dirname, 'static', request.url);

   fsPromises.readFile(postHtml)
      .then(function(data) {
         response.setHeader('content-type', textType.html);
         response.writeHead(200);
         response.end(data);
      })
      .catch(function(error) {
         console.error(error);
         handleOopsRequest(request, response);
      });
}; // handlePostRequest

const handleAssetRequest = function(request, response) {
   var assetFile = path.join(__dirname, 'static', request.url);

   fsPromises.readFile(assetFile)
      .then(function(data) {
         var contentType = textType.get(request.url);
         response.setHeader('content-type', contentType);
         response.writeHead(200);
         response.end(data);
      })
      .catch(function(error) {
         console.error(error);
      });
}; // handleAssetRequest

const handleOopsRequest = function(request, response) {
   var oopsHtml = path.join(__dirname, 'static', 'oops.html');

   fsPromises.readFile(oopsHtml)
      .then(function(data) {
         response.setHeader('content-type', textType.html);
         response.writeHead(404);
         response.end(data);
      })
      .catch(function(error) {
         console.error(error);
      });
}; // handleOopsRequest

const textType = {
   html: 'text/html',
   css: 'text/css',
   js: 'text/javascript',

   get(url) {
      if (url.endsWith('.html'))
         return textType.html;
      else if (url.endsWith('.css'))
         return textType.css;
      else if (url.endsWith('.js'))
         return textType.js;
      else
         return '';
   }
}; // textType

module.exports = {
   handleHomeRequest,
   handlePostRequest,
   handleAssetRequest,
   handleOopsRequest
}; // module.exports
```

```nodejs-blog/server.js
const http = require('http');
const path = require('path');

   /* Creating a server */

const handleRequest = function(request, response) {
   var routeJs = path.join(__dirname, 'route.js');
   var route = require(routeJs);

   if (request.url == '/')
      route.handleHomeRequest(request, response);
   else if (request.url.startsWith('/post'))
      route.handlePostRequest(request, response);
   else if (request.url.startsWith('/asset'))
      route.handleAssetRequest(request, response);
   else
      route.handleOopsRequest(request, response);
}; // handleRequest

const server = http.createServer(handleRequest);

   /* Start running server */

const port = 3000;
const hostname = '127.0.0.1';

const callback = function() {
   console.log('Server is running at...');
   console.log('http://' + hostname + ':' + port + '/');
}; // callback

server.listen(port, hostname, callback);
```

```nodejs-blog/test.js
// xóa nội dung để làm quen với ExpressJS
```

```nodejs-blog/static/index.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
   <title>Homepage</title>
   
   <link rel="stylesheet" href="/asset/style.css">
</head>
<body>
   <h1>Homepage</h1>
   <script src="/asset/main.js"></script>
</body>
</html>
```

```nodejs-blog/static/oops.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Oops ! Not-Found</title>
   <link rel="stylesheet" href="/asset/style.css">
</head>
<body>
   <h1>Oops ! Not-Found</h1>
   <script src="/asset/main.js"></script>
</body>
</html>
```

```nodejs-blog/static/post/an-article.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>An Article</title>
   <link rel="stylesheet" href="/asset/style.css">
</head>
<body>
   <h1>An Article</h1>
   <script src="/asset/main.js"></script>
</body>
</html>
```

```nodejs-blog/static/post/another-article.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Another Article</title>
   <link rel="stylesheet" href="/asset/style.css">
</head>
<body>
   <h1>Another Article</h1>
   <script src="/asset/main.js"></script>
</body>
</html>
```

```nodejs-blog/static/asset/main.js
console.log('Client-side JavaScript');
```

```nodejs-blog/static/asset/style.css
h1 {
   font-size: 90px;
   line-height: 1.5;
   text-align: center;
}
```

## Cài đặt và sử dụng cơ bản

Giống với các `package` khác mà chúng ta đã thử cài đặt từ `npm`, việc tiến hành cài đặt `ExpressJS` cho `project` hiện hành được thực hiện bằng một dòng lệnh -

```CMD|Terminal.io
npm install express --save
```

![](https://images.viblo.asia/3686ae8c-4bb9-4b80-b101-66037fc3f432.png)

Và như vậy là chúng ta đã có thể viết code để sử dụng thử `ExpressJS` giống như lần đầu tiên khởi tạo một `server` trên nền `NodeJS`. Mà thực ra thì không phải là chúng ta viết, là `copy/paste` về từ [**trang chủ của `ExpressJS`**](https://expressjs.com/en/starter/hello-world.html) thôi. :D

```nodejs-blog/test.js
const express = require('express');

   /* Creating server */
   
const app = express();

   /* Adding a route */

const path = '/';

app.get(path, function(request, response) {
   response.send('Hello World!');
});

   /* Start running server */

const port = 3000;

app.listen(port, function() {
   console.log('Server is running at...');
   console.log(`http://127.0.0.1:${port}`);
});
```

Bắt đầu chạy thử code `Hello World` được cung cấp bởi [**ExpressJS.com**](https://expressjs.com/en/starter/hello-world.html).

```CMD|Terminal.io
npm test
```

![](https://images.viblo.asia/9b84da70-9bef-4e67-93c9-508c209e262e.png)

Tuyệt.. mọi thứ đã hoạt động tốt giống như ExpressJS quảng cáo. :D

Đối với code khởi tạo `server` đơn giản thì hiển nhiên chúng ta chưa thể nhìn thấy được nhiều sự khác biệt giữa code `Hello World` không có ExpressJS và code `Hello World` mà chúng ta vừa mới `copy/paste` từ trang chủ của ExpressJS. Ở đây chúng ta chỉ nhận ra một chi tiết khác biệt nho nhỏ - đó là đoạn `app.get()` chắc chắn là có ý nghĩa tương đương với đoạn code mà chúng ta truyền hàm xử lý yêu cầu `handleRequest` vào phương thức `http.createServer` trong code `server` cũ.

Tuy nhiên ở đây `app.get()` nhận vào thêm một tham số `path` chỉ đường dẫn nhận diện từ yêu cầu được gửi tới. Và hàm xử lý yêu cầu được truyền vào sẽ chỉ được thực thi khi yêu cầu gửi tới phù hợp với `path` mà chúng ta truyền vào phương thức `app.get()`. Như vậy là chúng ta không phải khởi đầu với một hàm `handleRequest` tiếp nhận tất cả các kiểu `reuqest` truyền tới và sau đó lại phải thực hiện phân tích để chia tác vụ về các hàm xử lý phụ. Nếu vậy có lẽ ExpressJS sẽ cho phép chúng ta tạo ra thêm những chu trình xử lý `route` khác với cách thức tương tự như cái `route` dành cho trang chủ trong code ví dụ vừa rồi.

```nodejs-blog/test.js
const express = require('express');

   /* Creating server */

const app = express();

   /* Adding routes */

app.get('/', function(request, response) {
   response.send('Bạn vừa yêu cầu xem Trang Chủ');
});

app.get('/post', function(request, response) {
   response.send('Bạn vừa yêu cầu xem Bài Viết');
});

   /* Start running server */

app.listen(3000, function() {
   console.log('Server is running at...');
   console.log('http://127.0.0.1:3000');
});
```

![](https://images.viblo.asia/90d85e48-d58f-4f28-8b4b-d6d46d4be9a9.png)

Thật tuyệt... Như vậy là chúng ta không cần phải thực hiện thao tác phân tích đường dẫn yêu cầu ở một hàm tiếp nhận `request` tổng bộ rồi ủy thác công việc tới hàm xử lý phù hợp ở cấp thấp hơn. Tất cả những gì chúng ta cần làm đó là truyền các cặp `đường dẫn/hàm xử lý` tương ứng vào các câu lệnh `app.get(path, handler)`. 

Tuy nhiên đó vẫn chưa phải là tất cả những gì mà ExpressJS có thể giúp đỡ chúng ta thay đổi code `server` đơn giản mà chúng ta đã có trước đó. Bây giờ chúng ta sẽ thử gửi trả lại các tệp HTML tĩnh tương ứng với các yêu cầu.

```nodejs-blog/test.js
const express = require('express');
const path = require('path');

   /* Creating server */

const app = express();

   /* Adding routes */

const staticFolder = path.join(__dirname, 'static');

app.get('/', function(request, response) {
   var indexHtml = path.join(staticFolder, 'index.html');
   response.sendFile(indexHtml);
});

app.get('*', function(request, response) {
   var staticFile = path.join(staticFolder, request.originalUrl);
   
   response.sendFile(staticFile, function(error) {
      var oopsHtml = path.join(staticFolder, 'oops.html')
      
      if (error instanceof Error)
         response.status(404).sendFile(oopsHtml)
      else
         { /* do nothing */; }
   }); // response
});

   /* Start running server */

app.listen(3000, function() {
   console.log('Server is running at...');
   console.log('http://127.0.0.1:3000');
});
```

![](https://images.viblo.asia/17a297ed-328a-49a2-877f-ac3cc594c4ea.png)

Thao tác gửi trả một tệp tĩnh cũng là một trong số những thao tác rất phổ biến và vì vậy ExpressJS cũng đã giúp chúng ta đơn giản hóa mọi thao tác xử lý chi tiết. Chúng ta đã không cần phải viết đoạn code nhờ `File System` truy xuất tới tệp cần gửi trả để đọc nội dung. :D

Nếu như `jQuery` ở phía `client-side` là một nhà thông thái trong nhóm tác vụ làm việc với cấu trúc văn bản HTML và CSS; Thì `ExpressJS` ở đây lại đặc biệt am hiểu về những thao tác điều hướng `route`, và phản rồi `response` khi làm việc với các yêu cầu `request` gửi tới từ đâu đó.

Ở đây chúng ta đã sử dụng `path` ở lần gắn hàm xử lý sự kiện thứ hai là `*`, nó có nghĩa là hàm xử lý truyền vào ở đây sẽ được áp dụng cho tất cả các yêu cầu gửi tới. Ký hiệu này được sử dụng với ý nghĩa tương tự ở rất nhiều công cụ lập trình khác mà chúng ta đã học; Ví dụ như bộ chọn `*` của CSS cũng là để chọn tất cả các phần tử HTML có mặt trong trang web đơn; Hoặc trong [**các biểu thức thường thị `RexExp`**](https://viblo.asia/p/Qbq5QRv4KD8) giúp làm việc với các chuỗi, thì `*` cũng có ý nghĩa là bất kỳ kí tự nào. Vậy chúng ta cứ ghi nhớ `*` có nghĩa là `bất kỳ` cái gì cũng phù hợp. :D

## Làm quen với tài liệu

Sau khi chúng ta đã hiểu sơ lược về những giá trị mà ExpressJS đem lại, việc tiếp tục tìm hiểu về `framework` này chắc chắn vẫn sẽ là xuất phát từ tài liệu chính thức trên trang chủ của `framework` - [ExpressJS.com](https://expressjs.com/en/4x/api.html#express).

![](https://images.viblo.asia/bdbc7f22-efee-40f7-ab61-4c99f36868c0.png)

Bộ tài liệu chính thức mà ExpressJS cung cấp cho chúng ta rất gọn gàng với 5 chỉ mục chính ở phía bên trái được đặt trong một danh sách `đóng/mở` dạng `accordion` giúp chúng ta luôn luôn duy trì được cái nhìn tổng quan về các công cụ được cung cấp. Và điểm khởi đầu của `framework` là hàm `express()`.

```app.js
cosnt express = require('express');
cosnt app = express();
```

ExpressJS gọi phần mềm `server` của chúng ta là `app` (application) - hay `ứng dụng` - để biểu thị một phần mềm hoạt động qua tương tác mạng `network` nói chung. Và như vậy chúng ta có chỉ mục tiếp theo cần mở xem là [**Application**](https://expressjs.com/en/4x/api.html#app).

![](https://images.viblo.asia/90f5ea36-bd9c-49c0-b4d9-5e6534423f27.png)

```app.js
const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(3000);
```

Bên cạnh đó thì `object express` cũng có một phương thức nổi bật so với số còn lại đó là `express.Router()` và chúng ta cũng thấy có một chỉ mục tương ứng cùng tên [**Router**](https://expressjs.com/en/4x/api.html#router) - tạm dịch là trình định tuyến - điều hướng yêu cầu nhận được tới đâu đó để xử lý. Các `router` sẽ giúp chúng ta tách rời tác vụ phân tích và chuyển hướng yêu cầu khỏi phần thân chương trình chính ở tệp khởi tạo ứng dụng `app` trong trường hợp bạn có dự định xây dựng một thứ gì đó đồ sộ. :D

```router.js
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
   res.send('hello world');
});

module.exports = { router };
```

```app.js
const path = require('path');
const express = require('express');
const app = express();

const routerJs = path.join(__dirname, 'router.js');
const { router } = require(routerJs);

app.use('/', router);
app.listen(3000);
```

Hai chỉ mục còn lại là [**Request**](https://expressjs.com/en/4x/api.html#req) và [**Response**](https://expressjs.com/en/4x/api.html#res) thì chúng ta cũng có thể đoán ra được là liên quan tới 2 tham số đầu tiên `(req, res)` mà các hàm xử lý nhận được. Như vậy là chúng ta có thể thấy tổng quan những công cụ của ExpressJS được liệt kê trong trong tài liệu này sẽ giúp chúng ta đơn giản hóa các tác vụ phân tích và điều hướng yêu cầu tới những chu trình xử lý riêng. Như vậy thì chúng ta sẽ có thể tập trung tốt hơn vào việc viết code xử lý yêu cầu cụ thể và không tốn quá nhiều năng lượng vào thao tác phân tích địa chỉ yêu cầu và khởi tạo logic điều hướng.

## Thế cái tác vụ tự động tạo ra mấy trang web đơn từ nguồn dữ liệu đơn giản sẽ được hỗ trợ ở chỗ nào?

À.. mình quên khuấy mất. Cái này mới là cái quan trọng nhất đối với nhu cầu tạo blog đơn giản của chúng ta hiện tại; Chứ cái tác vụ phân tích với điều hướng yêu cầu thì cũng chưa hẳn là quan trọng lắm. :D

Phương thức [`resonse.render(template, data)`](https://expressjs.com/en/4x/api.html#res.render) sẽ giúp chúng ta sử dụng các biểu mẫu `template` mô tả code HTML ở dạng chưa có dữ liệu thực tế - gắn với dữ liệu `data` truy vấn được bởi logic cung cấp trong hàm xử lý sự kiện và tạo ra code HTML hoàn chỉnh để gửi trả cho trình duyệt web. 

Và như vậy là chúng ta sẽ cần tìm hiểu cách thức để tạo ra cái `template` mà chúng ta vừa nói đến, và... hoàn thiện trang blog đơn giản mà chúng ta đang xây dựng thôi. :D 

Hẹn gặp lại bạn trong bài viết tiếp theo.

[[ExpressJS] Bài 2 - Thiết Lập & Sử Dụng View Engine](https://viblo.asia/p/expressjs-bai-2-thiet-lap-su-dung-view-engine-ByEZkAw25Q0)