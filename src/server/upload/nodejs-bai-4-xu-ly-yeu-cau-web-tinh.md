Trong bài viết này, chúng ta sẽ cùng thảo luận về yêu cầu web tĩnh và cách làm việc với đường dẫn thư mục trong NodeJS. Đây là hai khái niệm không mới đối với chúng ta, tuy nhiên khi bắt tay vào việc tự xây dựng một phần mềm `server` cho riêng mình thì những yếu tố căn bản này lại trở nên đặc biệt quan trọng. Hãy cùng bắt đầu với các yêu cầu web tĩnh.

## Các yêu cầu web tĩnh thì khác gì với những yêu cầu không tĩnh?

Ầy... chuyện dài lắm. Nhưng chúng ta cứ bắt đầu đơn giản thôi. Khi nào nói xong thì là hết chuyện. :D

Đầu tiên thì là thao tác mà chúng ta vẫn làm hàng ngày, đó là truy cập vào các trang web và tìm kiếm tin tức cập nhật hoặc kiến thức. Chúng ta có thể xuất phát với trang chủ của một trang web rồi nhấn vào một liên kết bài viết nào đó. Một yêu cầu mới được tạo ra và gửi tới máy chủ của trang web nọ và liên kết URL trên thanh địa chỉ của trình duyệt web cũng thay đổi, chúng ta nhận được kết quả phản hồi là một trang đơn mới được thay thế vào trang đơn hiện tại.

Có trang web thì chúng ta thấy các liên kết trên thanh địa chỉ có dạng kết thúc là tên một tệp `.html`, ví dụ như trang blog cá nhân mà bạn đang sử dụng trên `Github Pages`; Và có những trang web khác thì các liên kết lại ở dạng không liên quan gì tới tên của một tệp HTML, ví dụ như YouTube - [**https://www.youtube.com/watch?v=mQLvOJqGrcw**](https://www.youtube.com/watch?v=mQLvOJqGrcw).

Khi một yêu cầu được gửi về máy chủ với dạng đầu tiên thì chúng ta có thể gọi là yêu cầu web tĩnh. Trường hợp còn lại thì... không nhất thiết phải có tên gọi để phân biệt, chúng ta cứ biết nó không phải là yêu cầu web tĩnh thôi. :D

Đối với trường hợp yêu cầu web tĩnh thì thông điệp gửi từ trình duyệt web được hiểu chính xác là tôi muốn xem tệp `bai-blog-so-1001.html`; Còn trường hợp như của link YouTube kia thì là tôi muốn xem `watch` một `v`ideo có mã ký hiệu như thế này `mQLvOJqGrcw`. Ở đây chúng ta quan tâm tới yêu cầu web tĩnh trước là bởi vì cách thức vận hành đơn giản nhất của một `server` đó là chúng ta cứ kết nối yêu cầu xem một tệp tĩnh với một tệp dữ liệu có tên trùng khớp đang lưu trữ trong máy chủ. Và chúng ta cần phải thực hiện được điều này đã rồi mới có thể thả diều suy nghĩ tưởng tượng về những logic hoạt động phức tạp hơn được. :D

## Làm thế nào để xem được nội dung yêu cầu mà trình duyệt web gửi tới?

Trong đoạn code `server` mà chúng ta sử dụng từ đầu cho đến giờ có một điểm bị bỏ quên, đó là tham số `request` của hàm xử lý yêu cầu `handleRequest`.

```nodejs-blog/server.js
   /* Creating a server */

const http = require('http');
const fsPromises = require('fs/promises');
const path = require('path');

const handleRequest = function(request, response) {
   var indexHtml = path.join(__dirname, 'static', 'index.html');

   fsPromises.readFile(indexHtml)
      .then(function(data) {
         response.setHeader('content-type', 'text/html');
         response.statusCode = 200;
         response.end(data);
      })
      .catch(function(error) {
         throw(error);
      });
}; // handleRequest

const server = http.createServer(handleRequest);

   /* Start running server ... */
```

Khi có một yêu cầu gửi tới từ trình duyệt web, `server` sẽ tạo ra một `object IncomingMessage` trong [**module `http`**](https://nodejs.org/dist/latest-v16.x/docs/api/http.html),  và truyền vào vị trí tham số `request` của hàm xử lý `handleRequest` mà chúng ta đã viết. Và trong [**tài liệu về module `http`**](https://nodejs.org/dist/latest-v16.x/docs/api/http.html) thì NodeJS có cung cấp cho chúng ta đủ thứ để truy xuất các thông tin liên quan tới yêu cầu được gửi tới - giao thức truyền tải, phương thức đóng gói thông tin, tiêu đề, tên miền, v.v...

Và sau một lượt nhìn ngó cái `Table of contents` của `http` thì chúng ta cũng biết được là các `object IncomingMessage` có một thuộc tính `url` để mô tả đường dẫn được biểu thị trong liên kết gửi yêu cầu từ trình duyệt web. Bây giờ chúng ta sẽ thử thêm thao tác in đường dẫn ra cửa sổ dòng lệnh mỗi khi có yêu cầu gửi tới `server` và theo dõi kết quả. Ở đây chúng ta sẽ đặt tạm một biến `requestCount` để theo dõi số lượt yêu cầu gửi tới.

```nodejs-blog/server.js
   /* Creating a server */
...

var requestCount = 0;
const handleRequest = function(request, response) {
   requestCount += 1;
   console.log(requestCount + ': ' + request.url);
   ...
```

Sau khi khởi động lại `server` thì chúng ta có thể thử truy cập lại một vài lần với những địa chỉ truy cập giả định tùy ý để xem kết quả tương ứng với các lượt truy cập.

[http://127.0.0.1:3000](http://127.0.0.1:3000/)

```CMD|Terminal.io
1: /
2: /asset/style.css
3: /asset/main.js
4: /favicon.ico
```

[http://127.0.0.1:3000/post/an-article.html](http://127.0.0.1:3000/post/an-article.html)

```CMD|Terminal.io
5: /post/an-article.html
6: /asset/style.css
7: /asset/main.js
8: /favicon.ico
```

Ồ... như vậy là mỗi lần chúng ta gửi yêu cầu tới, hàm `requestHandler` hiện tại đang trả về nội dung của tệp `index.html`; Và các thẻ `<link>` và `<script>` lần lượt gửi tiếp yêu cầu tới để xin tải thêm tệp `style.css` và `main.js`; Cuối cùng là trình duyệt tự gửi yêu cầu xin tải tệp ảnh `favicon.ico` để làm cái biểu tượng trên thanh tab bar. 

Yêu cầu chính mà chúng ta nhận được là dòng đầu tiên của mỗi lượt nhập địa chỉ mới để truy cập. Đối với trang chủ thì là `/` và đối với lần tiếp theo là `/post/an-article.html`. Nếu vậy thì có lẽ là chúng ta cũng đoán ra được rồi, đoạn liên kết `url` mà `server` nhận được là tính từ vị trí kết thúc cái tên miền giống như trường hợp của cái link YouTube ở phía trên. :D

## Gửi tệp HTML đáp ứng các yêu cầu web tĩnh

```
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
   +---server.js
   +---test.js
```

Bây giờ chúng ta sẽ giả định các yêu cầu gửi tới cần xử lý - 

1. Nếu là `/` thì sẽ gửi trả nội dung của trang chủ `index.html`.
2. Nếu ở dạng `/post/an-article.html` thì sẽ gửi trả nội dung của tệp HTML bài viết blog tương ứng là `an-article.html`.
3. Trong trường hợp không tìm thấy bài viết tương ứng hoặc dạng yêu cầu khác thì sẽ gửi trả nội dung của trang `oops.html`.
4. Nếu có dạng `/asset/style.css` thì sẽ gửi trả nội dung của tệp hỗ trợ tương ứng trong thư mục `asset` là `style.css`, và đối vối `main.js` cũng tương tự.
5. Trong trường hợp không tìm thấy tệp hỗ trợ tương ứng trong thư mục `asset` thì in ra thông báo ngoại lệ ở `console` của `server`.

Vậy bây giờ chúng ta cần chuẩn bị thêm nội dung đơn giản cho các tệp - `oops.html`, `an-article.html`, `another-article.html`, `style.css`, và `main.js`.

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
   <h1>
      <h1>Oops ! Not-Found</h1>
   </h1>
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

```nodejs-blog/static/asset/style.css
h1 {
   font-size: 90;
   line-height: 1.5;
   text-align: center;
}
```

```nodejs-blog/static/asset/main.js
console.log('Client-side JavaScript');
```

Nếu như chúng ta có thể tìm và gửi trả chính xác các tệp được yêu cầu với dự kiến như trên thì chúng ta sẽ có thể sử dụng blog này giống như cách sử dụng `Github Pages` cơ bản; Và như vậy là trang blog của bạn sẽ có thể chuyển nội dung sang `Glitch` dần dần trong thời gian chúng ta tiếp tục học các logic xử lý phức tạp hơn. :D

Bây giờ chúng ta sẽ xem lại đoạn code `server` mà chúng ta đã có và đặt một chút suy nghĩ cho hàm xử lý yêu cầu `handleRequest`.

```nodejs-blog/test.js
   /* Creating a server */

const http = require('http');
const fsPromises = require('fs/promises');   
const path = require('path');

const handleRequest = function(request, response) {
   var indexHtml = path.join(__dirname, 'static', 'index.html');

   fsPromises.readFile(indexHtml)
      .then(function(data) {
         response.setHeader('content-type', 'text/html');
         response.statusCode = 200;
         response.end(data);
      })
      .catch(function(error) {
         throw(error);
      });
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

Như vậy là chúng ta có tất cả các kiểu yêu cầu gửi tới được tập trung tiếp nhận tại `handleRequest`. Với mỗi đối tượng dữ liệu được yêu cầu là các nội dung bài viết `/post` hay các nội dung hỗ trợ `/asset` thì chúng ta sẽ cần phân chia lộ trình xử lý riêng.

Với mỗi kiểu tệp dữ liệu khác nhau thì khi phản hồi lại, chúng ta cũng sẽ phải thiết lập tiêu đề `response.setHeader` với kiểu nội dung `content-type` phù hợp để thông báo cho trình duyệt web. Ví dụ như `text/html` cho nội dung code HTML, `text/css` cho nội dung code CSS, hoặc `text/javascript` ....

Lúc này tổng quan logic hoạt động của hàm `handleRequest` về cơ bản là một cấu trúc điều kiện `if` dựa trên nội dung của `request.url` mà chúng ta nhận được. Như vậy chúng ta có thể chuyển tiếp tác vụ xử lý yêu cầu cho các hàm xử lý tác vụ phụ `handleTypeRequest` ở dạng như thế này -

```nodejs-blog/test.js
   /* Creating a server */

const http = require('http');

const handleRequest = function(request, response) {
   if (request.url == '/')
      handleHomeRequest(request, response);
   else if (request.url.startsWith('/post'))
      handlePostRequest(request, response);
   else if (request.url.startsWith('/asset'))
      handleAssetRequest(request, response);
   else
      handleOopsRequest(request, response);
}; // handleRequest

/* ... */
```

Và lúc này chúng ta sẽ có thể di chuyển tất cả phần code xử lý yêu cầu chi tiết ra một tệp `route.js` bên ngoài ở dạng một `module` hỗ trợ nhỏ. Ở đây chúng ta cũng sẽ làm quen luôn với cú pháp `exports` của CJS thay cho cú pháp của JavaScript cung cấp mặc định.

```nodejs-blog/route.js
const handleHomeRequest = function(request, response) {
   response.end('Homepage');
}; // handleHomeRequest

const handlePostRequest = function(request, response) {
   response.end('Post');
}; // handlePostRequest

const handleAssetRequest = function(request, response) {
   response.end('Asset');
}; // handleAssetRequest

const handleOopsRequest = function(request, response) {
   response.end('Not found');
}; // handleOopsRequest

// Xuất khẩu các thành phần của module
// muốn chia sẻ cho code bên ngoài sử dụng
module.exports = {
   handleHomeRequest,
   handlePostRequest,
   handleOopsRequest,
   handleAssetRequest
}; // exports
```

Bây giờ chúng ta cần thêm lệnh `require` vào `test.js` để sử dụng các hàm của `route.js` cung cấp. Ở bước này chúng ta có thể viết lại các hàm xử lý trong `handleRequest` thành dạng phương thức của `object` thu được sau khi `require`.

```nodejs-blog/test.js
   /* Creating a server */

const http = require('http');
const fsPromises = require('fs/promises');   
const path = require('path');

const handleRequest = function(request, response) {
   var routeJs = path.join(__dirname, 'route.js');
   var route = require(routeJs);
   
   if (request.url == '/')
      route.handleHomeRequest(request, response);
   /* ... */
```

Hãy khởi động lại `server` và thử truy cập với các dạng liên kết `request.url` để xem logic điều hành của `handleRequest` đã hoạt động ổn thỏa chưa. :D

[http://127.0.0.1:3000/](http://127.0.0.1:3000/)
![](https://images.viblo.asia/be402eaf-2960-4699-93c6-e8f5e32d9e7e.png)

[http://127.0.0.1:3000/post/an-article.html](http://127.0.0.1:3000/post/an-article.html)
![](https://images.viblo.asia/9ebaf26f-e2af-4ad3-9644-7c939ce16819.png)

[http://127.0.0.1:3000/asset/style.css](http://127.0.0.1:3000/asset/style.css)
![](https://images.viblo.asia/e62ffb95-d529-4d1e-9894-883bdff61300.png)

[http://127.0.0.1:3000/something-else](http://127.0.0.1:3000/something-else)
![](https://images.viblo.asia/41b127aa-9d90-4ce1-bc4c-4bda13faf82d.png)

Sau khi đã chắc chắn logic điều hành của hàm `handleRequest` hoạt động ổn rồi thì chúng ta bắt đầu viết code chi tiết cho các hàm xử lý tác vụ phụ. Hàm đầu tiên là `handleHomeRequest` thì chúng ta chỉ việc `copy/paste` code xử lý cũ của `handleRequest` là có thể sử dụng được, vì trước đó chúng ta chỉ có thể gửi lại cho người xem duy nhất trang `index.html` đối với tất cả mọi yêu cầu. :D

Tuy nhiên thì ở khối `.catch`, trong trường hợp vì lý do nào đó mà chúng ta ko thể truy xuất và đọc được tệp `index.html` thì phương án xử lý là thông báo lỗi ra `console` thay vì `throw`.

```nodejs-blog/route.js
const fsPromises = require('fs/promises');
const path = require('path');

const handleHomeRequest = function(request, response) {
   var indexHtml = path.join(__dirname, 'static', 'index.html');
   
   fsPromises.readFile(indexHtml)
      .then(function(data) {
         response.setHeader('content-type', 'text/html');
         response.statusCode = 200;
         response.end(data);
      })
      .catch(function(error) {
         console.error(error);
      });
}; // handleHomeRequest

/* ... */
```

[http://127.0.0.1:3000/](http://127.0.0.1:3000/)
![](https://images.viblo.asia/efdaa559-61e0-4791-a6a8-d5cd6d068926.png)

Như vậy là nội dung của tệp `index.html` đã được trả về sau khi chúng ta gửi yêu cầu là `/`. Tuy nhiên tệp `style.css` vẫn chưa được tải kèm theo, và tệp `main.js` hiển nhiên cũng vậy. Chúng ta sẽ xử lý hàm `handleAssetRequest` sau đó để khắc phục điểm này.

Bây giờ theo trình tự là tới hàm `handlePostRequest`. Về đường dẫn để tìm kiếm tệp thì chúng ta vẫn xuất phát từ thư mục `static` và chỉ cần thay thế chuỗi `'index.html'` bằng `request.url`. Trong trường hợp không tìm thấy nội dung hay không đọc được tệp thì chúng ta sẽ cần in thông báo ngoại lệ ra `console`, và gửi lại cho người dùng một trang đơn thông báo không tìm thấy nội dung - tức là chuyển quyền điều khiển tới cho hàm `handleOopsRequest`. :D

```nodejs-blog/route.js
/* handleHomeRequest... */

const handlePostRequest = function (request, response) {
   var postHtml = path.join(__dirname, 'static', request.url);

   fsPromises.readFile(postHtml)
      .then(function(data) {
         response.setHeader('content-type', 'text/html');
         response.writeHead(200);
         response.end(data);
      })
      .catch(function(error) {
         console.error(error);
         handleOopsRequest(request, response);
      });
}; // handlePostRequest

/* ... */
```

[http://127.0.0.1:3000/post/an-article.html](http://127.0.0.1:3000/post/an-article.html)
![](https://images.viblo.asia/460bd69c-2a17-4bcf-b379-4de2f0e3709a.png)

[http://127.0.0.1:3000/post/another-article.html](http://127.0.0.1:3000/post/another-article.html)
![](https://images.viblo.asia/c2fe530c-eeaa-4599-a14d-e7735e5ba775.png)

Tiếp theo là hàm `handleAssetRequest` để gửi kèm các tệp CSS và JavaScript khi được yêu cầu thêm. Ở đây chúng ta có 2 kiểu nội dung trả về là `text/css` và `text/javascript`. Do đó chúng ta cần xây dựng một hàm nhỏ hỗ trợ để kiểm tra loại tệp được yêu cầu từ `request.url`. Bên cạnh đó thì kiểu nội dung `text/html` cũng cần gõ lặp lại thủ công vào các hàm khác nhiều lần nên chúng ta cũng sẽ tạo ra một biến tham chiếu để tránh khả năng mắc lỗi typo. :D

```nodejs-blog/route.js
const fsPromises = require('fs/promises');
const path = require('path');

const handleHomeRequest = function(request, response) {
   /* ... */
};

const handlePostRequest = function(request, response) {
   /* ... */
};

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
   response.end('Not found');
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
   handleOopsRequest,
   handleAssetRequest
}; // exports
```

[http://127.0.0.1:3000/](http://127.0.0.1:3000/)
![](https://images.viblo.asia/b4ae565c-7d70-4fd2-a4e9-74b9d393e23f.png)

[http://127.0.0.1:3000/post/an-article.html](http://127.0.0.1:3000/post/an-article.html)
![](https://images.viblo.asia/363c6b2f-5bb2-40c3-bee1-9636e2aee680.png)

Như vậy là các tệp `style.css` và `main.js` đã được tải kèm trang chủ và các trang bài viết. Bây giờ chúng ta chỉ còn hàm `handleOopsRequest` để trả về trang đơn thông báo cho người dùng khi không tìm thấy bài viết phù hợp. Ở đây chúng ta sửa lại đường dẫn tìm kiếm tệp và thay `request.url` bằng đường dẫn tĩnh `/oops.html`. :D Kiểu nội dung trả về là `textType.html` vì chúng ta đã biết trước kiểu tệp trả về; Đồng thời chúng ta cũng cần sửa lại tín hiệu phản hồi là `writeHead(404)` thay vì `writeHead(200)` để biểu thị lỗi truy vấn.

```nodejs-blog/route.js
/* handeAssetRequest... */

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

/* ... */
```

[http://127.0.0.1:3000/something-else](http://127.0.0.1:3000/something-else)
![](https://images.viblo.asia/7ac4bf6c-42f0-4b50-b3fe-4e68fa13657c.png)

## Kết thúc bài viết

Ở đây mình tổng kết lại code của tệp `test.js` và `route.js` để bạn có thể so sánh và kiểm tra lại, để phòng trường hợp mình viết bài có nhầm lẫn ở đoạn nào đó mà mình soát lại không thấy. :D

```nodejs-blog/test.js
   /* Creating a server */

const http = require('http');
const path = require('path');

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

Ở phần code `export` các thành phần của `module` hỗ trợ `route.js`, nếu không muốn phải khai báo lại tên biến của các hàm muốn `export` thì chúng ta có thể gán trực tiếp các hàm đó vào thành thuộc tính của `object exports` đại diện của `module` -

```nodejs-blog/route.js
module.exports.handleHomeRequest = function() { /* ... */ };

   // --- hoặc
   
exports.handleHomeRequest = function() { /* ... */ };
```

Trong đó thì biến rời rạc `exports` ở dòng dưới là một lối tắt được NodeJS gán tham chiếu tới `object` đang lưu ở thuộc tính `module.exports`. Do đó cả 2 cách viết là tương đồng nếu như chúng ta không gán thứ gì đó khác thay thế cho địa chỉ tham chiếu mà thuộc tính `module.exports` đang lưu trữ từ đầu hoặc trỏ biến rời rạc `exports` đi đâu đó khác. :D

```nodejs-blog/route.js
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
}; // exports
```

Như vậy là tới thời điểm hiện tại, chúng ta đã có thể sử dụng code `server` đơn giản này để làm blog giống như cách sử dụng `Github Pages` cơ bản - tức là tạo ra các bài viết bằng các trang đơn được viết bằng code HTML. Đây cũng chính là điểm mà chúng ta chính thức bắt đầu tìm hiểu cách để tự động hóa việc tạo ra các trang đơn HTML từ một nguồn nội dung nhập liệu dễ hơn đứng từ góc độ của người sử dụng trang web.

Điều này có nghĩa là chúng ta sẽ có thể tạo nội dung bài viết ở một dạng khác ví dụ như [**các tệp `markdown`**](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) với cách biểu thị nhanh các nội dung trong khung soạn thảo giống như `Viblo` đang sử dụng.

![](https://images.viblo.asia/2845474f-a080-4c57-bf24-29b41fb4d5ed.png)

Sau đó những nội dung trong các tệp `markdown` sẽ được biên dịch thành code `HTML` và gửi thẳng cho trình duyệt web, hoặc lưu lại thành các tệp `HTML` tương ứng trong thư mục `nodejs-blog/static/post`. 

Đối với một tác vụ như thế này, chúng ta đã bắt đầu phải nghĩ tới sự trợ giúp của các thư viện JavaScript hỗ trợ từ bên ngoài; Và trong bài sau, chúng ta sẽ làm quen với cách thức cài đặt và sử dụng các thư viện hỗ trợ trong môi trường NodeJS. Bây giờ thì hãy nghỉ giải lao một chút đã. Hẹn gặp lại bạn trong bài viết tiếp theo. :D

[[NodeJS] Bài 5 - NPM - NodeJS Packpage Manager](https://viblo.asia/p/1VgZvAa1KAw)