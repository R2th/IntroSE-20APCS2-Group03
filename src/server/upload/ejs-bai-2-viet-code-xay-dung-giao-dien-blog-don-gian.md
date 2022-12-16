Trong bài viết này, chúng ta sẽ bắt đầu xây dựng giao diện blog đơn giản bằng EJS để sử dụng làm chất liệu cho code server trên nền ExpressJS mà chúng ta đang xây dựng.

## Logic khởi điểm

Ở phần này mình xin trích đoạn lại toàn bộ phần thảo luận về cấu trúc thư mục `view` trong bài viết trước của Sub-Series ExpressJS. Chúng ta sẽ không tạo ra những tệp `template` thụ động với các biến gắn dữ liệu đơn giản mà sẽ tạo ra một phần mềm xây dựng giao diện người dùng bằng EJS.

[[ExpressJS] Bài 6 - Viết Code Điều Hành Một Blog Cá Nhân Đơn Giản](https://viblo.asia/p/Eb85oAVkZ2G)

Đối với việc cấu trúc thư mục `view` thì chắc chắn là mỗi người chúng ta sẽ có một cách sắp xếp riêng. Tuy nhiên thì về cơ bản sẽ chỉ có 2 lối tư duy khởi điểm:

Cách đầu tiên, chúng ta có thể xem như các tệp trong `view` là dạng template thụ động không có chứa kiến trúc logic mà chỉ có các biến chờ gắn dữ liệu để hiển thị. Đối với cách này thì khi code xử lý ở một `route` nào đó cần `render` sẽ cần tìm tới chính xác tệp `template` phù hợp với mục đích hiển thị kết quả của `route` đó. Ví dụ:

```structure.txt
[express-blog]
.  |
.  +-----[view]
.           |
.           +-----home.ejs
.           +-----oops.ejs
.           |
.           +-----[article]
.                    |
.                    +-----view.ejs
.                    +-----edit.ejs
```

```route/home.js
router.get("/", async (request, response) => {
   var data = {};
   /* truy vấn dữ liệu từ database -> data */
   /* cung cấp đường dẫn tới tệp home.ejs */
   response.render("home.ejs", { data });
});
```

```route/article/action/view.js
router.get("/:id", async (request, response) => {
   var { id } = request.params;
   var data = {};
   /* truy vấn dữ liệu từ database -> data */
   /* cun cấp đường dẫn tới tệp article/view.ejs */
   response.render("article/view.ejs", { data });
});
```

Cách thứ hai, là chúng ta có thể nhìn nhận khối `view` ở dạng một phần mềm vẽ giao diện người dùng có chứa logic xử lý riêng và có một tệp đại diện ví dụ như `index.ejs`. Code xử lý ở các `route` sẽ chỉ sử dụng duy nhất tệp này để `render` và truyền các tham số dữ liệu vào để mô tả giao diện muốn hiển thị. Lúc này code logic trong `index.ejs` sẽ phân tích dữ liệu được truyền vào để kiến trúc nên giao diện hiển thị phù hợp.

```structure.txt
[express-blog]
.  |
.  +-----[view]
.           |
.           +-----index.ejs
.           |
.           +-----[layout]
.                    |
.                    +-----home.ejs
.                    +-----oops.ejs
.                    +-----article.ejs
```

```route/home.js
router.get("/", async (request, response) => {
   var data = {};
   /* truy vấn dữ liệu từ database -> data */
   response.render("index.ejs", { layout: "home", data });
});
```

```route/article/action/view.js
router.get("/:id", async (request, response) => {
   var { id } = request.params;
   var data = {};
   /* truy vấn dữ liệu từ database -> data */
   response.render("index.ejs", { layout: "article", action: "view", data });
});
```

Cách xử lý đầu tiên sẽ đơn giản hơn nhưng khi chúng ta cập nhật giao diện người dùng và nếu có sự thay đổi về cấu trúc thư mục bên trong `view` thì sẽ cần phải sửa lại cả ở code xử lý của các `route`. Trong khi đó thì cách xử lý thứ hai rất linh động để chỉnh sửa hoặc tái cấu trúc lại thư mục `view` khi cần thiết nhưng lại yêu cầu thiết lập ban đầu hơi rườm rà hơn một chút.

## Thiết lập ban đầu

Như đã nói thì chúng ta sẽ nhìn nhận thư mục `view` là một phần mềm xây dựng giao diện người dùng. Câu lệnh khởi điểm để kích hoạt phần mềm này là:

```js
response.render("index.ejs", { layout, action, data });
```

Ở đây các tham số đầu vào `layout` và `action` giúp code logic trong `index.ejs` phân tích và lựa chọn các thành phần cần thiết để cấu trúc nên văn bản HTML phù hợp kèm theo dữ liệu được nạp từ `data`.

Xuyên suốt Sub-Series này, chúng ta sẽ không quan tâm tới các khối `database` và `route`; mà thay vào đó sẽ chỉ quan tâm tới thư mục `view`, `public`, và một vài tệp JavaScript trong `express-blog`:

- `express-blog/public/` - Thư mục chứa các tệp CSS và `client-side` JavaScript.
- `express-blog/view/` - Thư mục chứa các tệp `template`.
- `express-blog/test.js` - Khởi tạo một server chạy thử code template.
- `express-blog/data.js` - Giả lập dữ liệu truy vấn được từ `database`.

Và chúng ta sẽ xuất phát với cấu trúc thư mục đơn giản như thế này:

```structure.txt
[express-blog]
.  |
.  +-----[public]
.  |        |
.  |        +-----[css]
.  |        |       |
.  |        |       +-----style.css
.  |        |
.  |        +-----[js]
.  |               |
.  |               +-----main.js
.  |
.  +-----[view]
.  |        |
.  |        +-----index.ejs
.  |
.  +-----test.js
.  +-----data.js
```

Code thiết lập ban đầu cho các tệp trong thư mục `public`.

```public/css/style.css
* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;

   font-family: "Times New Roman", "Times", serif;
   font-size: 45px;
   line-height: 1.618;
}

body {
   padding-top: 90px;
   text-align: center;
}
```

```public/css/main.js
console.log("Client-side JavaScript");
```

Code thiết lập ban đầu cho các tệp trong thư mục `view`.

```view/index.ejs
<!doctype html>
<html>
<head>
   <title> <%= data.get("title") %> </title>

   <meta charset="utf-8" />
   <meta http-equiv="x-ua-compatible" content="ie=edge" />
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

   <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
   <h1> <%= data.get("title") %> </h1>
   
   <script src="/js/main.js"></script>
</body>
</html>
```

Code thiết lập ban đầu cho các tệp trong thư mục gốc `express-blog`.

```data.js
const data = new Map();
data.set("title", "Hello EJS !");

module.exports = data;
```

```test.js
const path = require("path");
const express = require("express");

var app = express();

var pathToView = path.join(__dirname, "view");
var pathToPublic = path.join(__dirname, "public");

app.set("views", pathToView);
app.set("view engine", "ejs");

app.use(express.static(pathToPublic));

app.get("*", async (request, response) => {
   response.render("index.ejs", {
      layout: null,
      action: null,
      data: require("./data.js")
   });
});

app.listen(8080, (_) => console.log("Server started"));
```

Chạy thử `server test`.

```CMD|Terminal.io
npm test

Server started
```

[http://localhost:8080/](http://localhost:8080/)
![](https://images.viblo.asia/08b00aa0-7c8e-4282-8faa-ccc3f5292a4d.png)

## Tham số layout

Tham số `layout` - dịch nôm na là bố cục - được sử dụng để định vị bố cục chính dùng cho trang đơn HTML kết quả.

Giao diện blog đơn giản mà chúng ta đang xây dựng sẽ có một vài `layout` như sau:

- `home` - Giao diện trang chủ
- `category` - Giao diện các trang danh mục
- `article` - Giao diện các trang bài viết
- `admin` - Giao diện các trang quản trị
- `oops` - Giao diện trang thông báo lỗi.

```structure.txt
[view]
.  |
.  +-----[layout]
.  |        |
.  |        +-----home.ejs
.  |        +-----category.ejs
.  |        +-----article.ejs
.  |        +-----admin.ejs
.  |        +-----oops.ejs
.  |
.  +-----index.ejs
```

Lệnh khởi đầu của phần mềm `view` có thể sử dụng tham số này để chọn ra tệp `layout` phù hợp. Và chuyển tiếp các tham số `action` và `data` cho tệp xử lý giao diện tiếp theo.

```view/index.ejs
<%#
   --- Các tham số ---
   
   layout: home | category | article | admin | oops
   action: view | edit
   data  : Map { title }
%>

<% 
   const makeHTML = function(layoutName) {
      if (layoutName == "home")
         return include("./layout/home", { action, data });
      if (layoutName == "category")
         return include("./layout/category", { action, data });
      if (layoutName == "article")
         return include("./layout/article", { action, data });
      if (layoutName == "admin")
         return include("./layout/admin", { action, data });
      if (layoutName == "oops")
         return include("./layout/oops", { action, data });
      if ("any-other-case")
         return `<h1>Unsupported layout</h1>`;
   }; // makeHTML

   var HTMLcode = makeHTML(layout);
%>

<%- HTMLcode %>
```

Lúc này code HTML tạo bố cục sẽ được di chuyển vào các tệp `layout`.

```home|category|article|admin|oops.ejs
<!doctype html>
<html>
<head>
   <title> <%= data.get("title") %> </title>

   <meta charset="utf-8" />
   <meta http-equiv="x-ua-compatible" content="ie=edge" />
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

   <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
   <h1> <%= data.get("title") %> </h1>
   
   <script src="/js/main.js"></script>
</body>
</html>
```

Bây giờ chúng ta có thể chỉnh sửa lại `route` duy nhất trong tệp `test.js` để thử các giá trị khác nhau của tham số `layout`. Trong code ví dụ ở đây mình sẽ thử với `layout` là `home` và chỉnh lại `title` ở `data.js` thành `Trang Chủ`.

```data.js
const data = new Map();
data.set("title", "Trang Chủ");

module.exports = data;
```

```test.js
app.get("*", async (request, response) => {
   response.render("index.ejs", {
      layout: "home",
      action: null,
      data  : require("./data.js")
   });
});
```

```CMD|Terminal.io
npm start

Server started
```

[http://localhost:8080/](http://localhost:8080/)
![](https://images.viblo.asia/2426056e-f063-4820-b44e-24b4583ddd3a.png)

## Tham số action

Nói riêng đối với các giao diện hiển thị các bài viết và các trang nội dung giới thiệu danh mục. Chúng ta sẽ cần cung cấp giao diện xem thông tin cho người đọc blog và giao diện chỉnh sửa nội dung cho người quản trị blog. Việc cung cấp thêm tham số `action` sẽ giúp cho câu lệnh `render` trở nên linh hoạt hơn so với việc sử dụng tên `layout` có dạng như `view-article` hay `edit-article`.

Lúc này chúng ta có thể tạo thêm logic phân nhánh cho các `layout` của các trang bài viết và các trang danh mục như sau.

```structure.txt
[view]
.  |
.  +-----[layout]
.  |        |
.  |        +-----home.ejs
.  |        +-----admin.ejs
.  |        +-----oops.ejs
.  |        |
.  |        +-----[category]
.  |        |        |
.  |        |        +-----[action]
.  |        |        |        |
.  |        |        |        +-----view.ejs
.  |        |        |        +-----add.ejs
.  |        |        |        +-----edit.ejs
.  |        |        |
.  |        |        +-----index.ejs
.  |        |
.  |        +-----[article]
.  |                 |
.  |                 +-----[action]
.  |                 |        |
.  |                 |        +-----add.ejs
.  |                 |        +-----view.ejs
.  |                 |        +-----edit.ejs
.  |                 |
.  |                 +-----index.ejs
.  |
.  +-----index.ejs
```

Như vậy đối với `layout` là `article` và `category` thì chúng ta cần sửa lại là `include` tệp `index.ejs` ở thư mục tương ứng và đồng thời chuyển tiếp tham số `action` và `data`.

```view/index.ejs
   const makeHTML = function(layoutName) {
      ...
      if (layoutName == "category")
         return include("./layout/category/index", { action, data });
      if (layoutName == "article")
         return include("./layout/article/index", { action, data });
      ...
   }; // makeHTML

   var HTMLcode = makeHTML(layout);
%>

<%- HTMLcode %>
```

Ở các tệp `index.ejs` trong thư mục `layout/article` và `layout/category`, chúng ta tiếp tục tạo logic rẽ nhánh với giá trị của tham số `action`.

```category|article->/index.ejs
<%#
   --- Các tham số ---

   action: view | edit
   data  : Map { title }
%>

<% 
   const makeHTML = function(actionType) {
      if (actionType == "view")
         return include("./action/view", { data });
      if (actionType == "add")
         return include("./action/add", { data });
      if (actionType == "edit")
         return include("./action/edit", { data });
      if ("any-other-case")
         return `<h1>Unsupported layout</h1>`;
   }; // makeHTML

   var HTMLcode = makeHTML(action);
%>

<%- HTMLcode %>
```

Giao diện `view.ejs` để đọc nội dung sẽ hiển thị tiêu đề bằng thẻ `<h1>`.

```view/layout/article/action/view.ejs
<!doctype html>
<html>
<head>
   <title> <%= data.get("title") %> </title>

   <meta charset="utf-8" />
   <meta http-equiv="x-ua-compatible" content="ie=edge" />
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

   <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
   <h1> <%= data.get("title") %> </h1>

   <script src="/js/main.js"></script>
</body>
</html>
```

Giao diện `edit.ejs` để chỉnh sửa nội dung sẽ hiển thị tiêu đề trong ô nhập liệu `<input>`.

```view/layout/article/action/edit.ejs
<!doctype html>
<html>
<head>
   <title> <%= data.get("title") %> </title>

   <meta charset="utf-8" />
   <meta http-equiv="x-ua-compatible" content="ie=edge" />
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

   <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
   <input type="text" value="<%= data.get("title") %>" />

   <script src="/js/main.js"></script>
</body>
</html>
```

Bây giờ chúng ta sẽ thử yêu cầu `render` với `layout: "article"` và `action: "edit"` để chỉnh sửa nội dung của một bài viết.

```data.js
const data = new Map();
data.set("title", "Giới Thiệu EJS"};

module.exports = data;
```

```test.js
app.get("*", async (request, response) => {
   response.render("index.ejs", {
      layout: "article",
      action: "edit",
      data  : require("./data.js")
   });
});
```

```CMD|Terminal.io
npm start

Server started
```

[http://localhost:8080/](http://localhost:8080/)
![](https://images.viblo.asia/1b0e1b8a-0e09-46dc-a97f-ac26e56761e9.png)

## Tham số data

Dữ liệu chính để cung cấp cho các giao diện được tập trung toàn bộ trong tham số `data` - một `Map` chứa các object dữ liệu khác tùy vào yêu cầu dữ liệu từ các `layout` cụ thể sau khi chúng ta xây dựng giao diện chi tiết. Lưu ý duy nhất ở đây là chúng ta cần tổng kết cấu trúc của object này tại phần chú thích ở đầu các tệp `template`; Và cố gắng duy trì cách đặt tên các khóa có quy luật để sử dụng chung cho các `layout`.

Ví dụ các trang đơn đều sẽ có chung thanh điều hướng - cần dữ liệu là một mảng các object danh mục, và khóa bổ sung cho `data` sẽ là `category-list`. 

Trang chủ và các trang danh mục cần hiển thị một danh sách các đoạn trích ngắn - cần dữ liệu là một mảng các object bài viết, và khóa bổ sung cho `data` sẽ là `article-list` hoặc `entry-list`.

Chúng ta sẽ bổ sung dần các khóa cho `data` trong quá trình xây dựng các `template` chi tiết.

## Tái sử dụng các thành phần chung

Các `layout` khác nhau vẫn sẽ có những thành phần nhất định có thể sử dụng chung, điển hình là các nội dung trong `<head>`, thanh điều hướng, phần chân trang web, các thẻ `<script>`. Để thuận tiện cho việc chia sẻ các thành phần này giữa các `layout` và chỉnh sửa khi cần thiết, chúng ta sẽ tạo ra thêm một thư mục `component` bên cạnh thư mục `layout`.

Và ở thời điểm khởi đầu thì chúng ta sẽ định nghĩa 2 `component` là:

- `meta.ejs` - chứa các thông tin trong bên trong `<head>`.
- `script.ejs` - chứa các thẻ `<script>` ở cuối `<body>`

```structure.txt
[view]
.  |
.  +-----[component]
.  |        |
.  |        +-----meta.ejs
.  |        +-----script.ejs
.  |
.  +-----[layout]
.  |
.  +-----index.ejs
```

Đường dẫn tìm tới thư mục `component` sẽ tùy vào vị trí của tệp `layout` chi tiết. Ở đây là ví dụ từ `layout/home.ejs` thì chúng ta chỉ cần lùi lại một thư mục `../` và tìm tới thư mục `component/` rồi sau đó chọn tệp thành phần cần sử dụng.

```layout/home.ejs
<!doctype html>
<html>
<head>
   <%- include("../component/meta.ejs", { data }) %>
</head>
<body>
   <h1> <%= data.get("title") %> </h1>

   <%- include("../component/script.ejs") %>
</body>
</html>
```

Như vậy là chúng ta đã thực hiện xong những thao tác thiết lập khởi đầu cho phần mềm xây dựng giao diện blog. Trong bài viết tiếp theo, chúng ta sẽ viết code chi tiết cho các thành phần được sử dụng trong trang chủ.

[[EJS] Bài 3 - Viết Code Xây Dựng Giao Diện Blog (Tiếp Theo)](https://viblo.asia/p/Ljy5VRvV5ra)