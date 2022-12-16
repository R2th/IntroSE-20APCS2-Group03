Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách thiết lập và sử dụng một View Engine - công cụ sẽ giúp chúng ta tạo ra các dạng mẫu `template` của code HTML chưa có chứa dữ liệu thực tế; Và đồng thời thực hiện công việc tạo ra nội dung văn bản HTML kèm theo dữ liệu được cung cấp để gửi phản hồi lại yêu cầu của trình duyệt web.

## Câu lệnh tạo ra một văn bản HTML

Chúng ta sẽ xuất phát từ câu lệnh để tạo ra các trang đơn HTML mà chúng ta đã nói đến ở cuối bài trước. Ở đây chúng ta sẽ nhìn lại code tạo Express `app` một chút, vị trí mà chúng ta cần quan tâm tới là các đoạn truy vấn các tệp tĩnh và gửi trả lại bằng phương thức `response.sendFile()`.

```nodejs-blog/test.js
const express = require('express');
const path = require('path');

   /* Creating Server */

const app = express();

   /* Adding Routes */

const staticFolder = path.join(__dirname, 'static');

app.get('/', function(request, response) {
   var indexHtml = path.join(staticFolder, 'index.html');
   response.sendFile(indexHtml);
});

app.get('*', function(request, response) {
   var staticFile = path.join(staticFolder, request.originalUrl);
   response.sendFile(staticFile, errorHandler);
   
   const errorHandler = function(error) {
      if (error instanceof Error) {
         var oopsHtml = path.join(staticFolder, 'oops.html')
         response.status(404).sendFile(oopsHtml)
      }
      else {
         /* do nothing */ ;
      }
   }; // errorHandler
}); // app.get *

   /* Start Running Server */

app.listen(3000, function() {
   console.log('Server is running at...');
   console.log('http://127.0.0.1:3000');
});
```

Chúng ta sẽ bắt đầu chỉnh sửa code ở đoạn thêm `route` xử lý cho yêu cầu xem trang chủ `app.get('/', ...)` để sử dụng một `template`.

Trước hết thì chúng ta sẽ tạm giả định dữ liệu `data` truy vấn được từ một tệp nào đó và được chuyển thành một `object JSON`. Sau đó dữ liệu này được truyền vào phương thức [`response.render()`](https://expressjs.com/en/4x/api.html#res.render) mà chúng ta đã nói đến ở cuối bài trước -  kèm theo một tệp `template` có tên là `index`.

Phương thức `render` sau khi sử dụng tệp `template index` và dữ liệu `data` để tạo ra nội dung của một tệp HTML hoàn chỉnh sẽ tự động gửi cho trình duyệt web.

```nodejs-blog/test.js
   /* Adding Routes ... */

app.get('/', function(request, response) {
   // giả định data truy vấn được từ một tệp tĩnh
   var data = {
      title: 'Trang chủ | Blog lập trình?',
      heading: 'Blog lập trình tự nhiên',
      content: null
   };
   response.render('index', data);
});
```

Thực tế thì phương thức `response.render()` sẽ không trực tiếp việc tạo ra nội dung HTML từ tệp `template`, mà sẽ ủy thác tác vụ này cho View Engine ở dạng `plug-in` bổ trợ. Có rất nhiều View Engine khác nhau đang được chia sẻ bởi cộng đồng; Và ExpressJS có cung cấp cho chúng ta một trang tài liệu liệt kê những View Engine phổ biến nhất ở đây - [ExpressJS.com -> Resouces -> Template Engines](https://expressjs.com/en/resources/template-engines.html)

![](https://images.viblo.asia/dad765f5-e397-4078-aed7-b56218a862f3.png)

Mỗi một Template Engine sẽ đưa ra một ngôn ngữ riêng để biểu thị dạng mẫu của văn bản HTML - thường được gọi là Templating Language. Bạn có thể xem qua từng Engine trong danh sách đó để chọn ra thứ phù hợp nhất và sử dụng. Còn trong ví dụ ở đây thì mình sẽ sử dụng [EJS - Embedded JavaScript](https://ejs.co/#docs) - một trong những Template Engine thân thiện nhất bởi có cú pháp dạng nhúng trong code HTML và các câu lệnh tương đồng với JavaScript.

```index.ejs
<!doctype html>
<html lang="en">
<head>
   <title><%= title %></title>
   <link rel="stylesheet" href="/asset/style.css">
</head>
<body>
   <h1><%= heading %></h1>

   <div>
   <% if (content) { %>
      <%= content %>
   <% } else { %>
      <p>Trang web đang trong quá trình xây dựng...</p>
   <% } %>
   </div>

   <script src="/asset/main.js"></script>
</body>
</html>
```

Kết quả thu được sau khi `render` thành HTML từ `ejs` thực sự rất dễ đoán. Các vị trí `<%= title %>` trong khối `<head>`, và `<%= heading %>` trong khối `<body>`, sẽ được gắn dữ liệu thực tế tương ứng với các thuộc tính của `data`. Riêng đối với vị trí `<%= content %>` thì ở đây có một khối lệnh điều kiện bằng cú pháp JavaScript để hiển thị nội dung ở dạng có điều kiện.

Sau khi bạn đã chọn xong một `engine` phù hợp thì chúng ta  tiến hành cài đặt và thiết lập để sử dụng thôi. :D

## Cài đặt và thiết lập View Engine

Nhờ `npm` cài đặt thêm Template Engine đã chọn vào `project`.

```CMD | Terminal.io
npm install ejs --save
```

Để sử dụng một View Engine thì chúng ta cần khai báo với Express `app` ở vị trí trước khi bổ sung các `route` xử lý yêu cầu, bằng cách sử dụng phương thức [`app.set()`](https://expressjs.com/en/4x/api.html#app.set). Đồng thời, ở đây chúng ta cũng sẽ thực hiện thao tác khai báo đường dẫn tới thư mục chứa các tệp `template`. Trong code ví dụ dưới đây mình sẽ đặt các tệp `template` trong thư mục `view` là thư mục con của `nodejs-blog`.

```nodejs-blog/test.js
   /* Creating Server ... */

   /* Setup View Engine */

const templateFolder = path.join(__dirname, 'view');

app.set('views', templateFolder);
app.set('view engine', 'ejs');   // tên của engine - ejs, pug, hbs, ...

   /* Adding Routes ... */
```

Sau đó là tạo ra tệp `template` với tên `index` trong thư mục `view` để phương thức `response.render()` có thể hoạt động được. Ở đây nếu như bạn cũng chọn `ejs` giống như mình thì có thể lưu ý nhanh cách sử dụng cơ bản - đó là ở những thẻ `ejs` hiển thị dữ liệu của các biến thì chúng ta xuất phát bằng ký hiệu mở đầu là `<%=` có thêm dấu `=` so với các đoạn logic hiển thị khác.

```nodejs-blog/view/index.ejs
<!doctype html>
<html lang="en">
<head>
   <title><%= title %></title>
   <link rel="stylesheet" href="/asset/style.css">
</head>
<body>
   <h1><%= heading %></h1>
   
   <div>
   <% if (content) { %>
      <%= content %>
   <% } else { %>
      <p>Trang web đang trong quá trình xây dựng...</p>
   <% } %>
   </div>
   
   <script src="/asset/main.js"></script>
</body>
</html>
```

![](https://images.viblo.asia/af753cc8-2f44-483c-ac7c-ee1f6c06bdac.png)

Để sử dụng một thành phần cho nhiều trang đơn khác nhau ví dụ như thanh điều hướng `navbar` thì chúng ta có thể tạo ra một tệp `template` riêng cho thành phần này. Sau đó `include` vào code của các tệp `template` đại diện cho các trang đơn.

```nodejs-blog/view/component/navbar.ejs
<nav>Thanh điều hướng chính</nav>
```

```nodejs-blog/view/index.ejs
<!doctype html>
<html lang="en">
<head>
   <title><%= title %></title>
   <link rel="stylesheet" href="/asset/style.css">
</head>
<body>
   <%- include('component/navbar', {category: 0}) %>
   
   <!-- ... -->
</body>
</html>
```

![](https://images.viblo.asia/8fe11992-d6a7-45a0-9647-2baf8c95ef84.png)

Đối với `ejs` mà mình đang sử dụng trong code ví dụ ở đây thì các thẻ `include` sẽ mở đầu bằng ký hiệu `<%-` có thêm dấu `-` so với các thẻ `ejs` thông thường. Và đường dẫn tới tệp `ejs` của `navbar` là đường dẫn ở dạng tương quan tính từ vị trí của tệp `ejs` đang muốn `include` thanh `navbar`. 

Bên cạnh đó thì `ejs` cũng hỗ trợ chuyển tiếp dữ liệu vào `template` của thành phần được `include` ở dạng `object` như trên `{ category: 0 }`. Đối với thanh `navbar` thì dữ liệu này có ý nghĩa biểu thị cho `navbar` biết là đang ở trang đơn thuộc danh mục nào, để có thể thay đổi phong cách hiển thị của liên kết tương ứng (nếu thiết kế web có yêu cầu).

Về việc tổ chức lưu trữ các tệp `template` thì mình thường tạo ra một thư mục `component` bên trong thư mục `view` để chứa các thành phần của trang web như vậy; Còn các tệp `template` đại diện cho các trang đơn thường được gọi là `layout` sẽ được đặt ngay ở cấp cao nhất của thư mục `view`. Cái này là tùy cách sắp xếp của mỗi người thôi; Vì vậy nên bạn cứ thoải mái tạo ra logic lưu trữ các tệp `template` của bạn. Miễn sao phù hợp với logic lúc viết code sử dụng là được. :D

## Kết thúc bài viết

Như vậy là tính tới thời điểm hiện tại, chúng ta đã biết cách cấu trúc các trang đơn bằng code logic hiển thị. Việc này giúp cho chúng ta không cần phải viết lặp lại code HTML cho từng trang đơn cụ thể; Và khi cần thực hiện chỉnh sửa giao diện của trang web, chúng ta sẽ không cần phải copy/paste code chỉnh sửa cho 1001 bài viết blog nữa. :D

Việc cần làm tiếp theo là chúng ta sẽ cần tổ chức lưu trữ dữ liệu của 1001 bài viết blog ở dạng đơn giản hơn và thân thiện hơn đối với thao tác khởi tạo hay chỉnh sửa nội dung - đứng từ góc nhìn của một người sử dụng blog. Điều này cũng có nghĩa là chúng ta sẽ cần xây dựng thêm giao diện "đăng nhập" và "viết bài" cho người quản trị blog; Và đoạn code điều hướng yêu cầu cần xử lý cũng sẽ trở nên phức tạp hơn một chút. Do đó bên cạnh việc chọn lựa ra một phương thức để lưu trữ nội dung của các bài blog, chúng ta sẽ đồng thời chuẩn bị thêm một ít kiến thức về các thao tác điều hướng yêu cầu căn bản của ExpressJS.

Về việc tổ chức lưu trữ dữ liệu thì đây không phải là nội dung thuộc về `framework` và thực ra là một chủ đề độc lập trong lập trình phần mềm nói chung. Do đó chúng ta sẽ tạo ra một Sub-Series riêng dành cho chủ đề này với code sử dụng dữ liệu sẽ được minh họa trên nền NodeJS.

[[Database] Bài 1 - Database Là Cái Gì?](https://viblo.asia/p/4dbZNRqvZYM)

Và phần kiến thức cần tìm hiểu thêm về các thao tác điều hướng căn bản trong ExpressJS sẽ chính là nội dung thảo luận của chúng ta trong bài viết tiếp theo. :D

[[ExpressJS] Bài 3 - Điều Hướng Cơ Bản](https://viblo.asia/p/Az45bRo65xY)