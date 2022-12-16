Trong Sub-Series này, chúng ta sẽ chỉ làm các ví dụ về việc sử dụng EJS để kiến trúc nên giao diện blog cá nhân đơn giản sử dụng làm chất liệu cho code xử lý các `route` của Sub-Series ExpressJS. Tuy nhiên thì trước hết, mình muốn dành ra một chút thời gian giới thiệu lại EJS một cách đầy đủ hơn một chút ở bài viết mở đầu trong trường hợp bạn đang sử dụng một `Template Engine` khác. 

## EJS - Embed JavaScript

EJS là một thư viện JavaScript được thiết kế để hỗ trợ tác vụ `templating` - tạo ra các tệp code HTML dạng mẫu `tempalte` chờ gắn dữ liệu thực tế - và chuyển đổi các `template` này trở thành văn bản HTML để trình duyệt web hiển thị. Một thư viện thực hiện tác vụ này còn được người ta gọi với một cái tên khác là `Templating Engine`.

[Trang web chính thức của thư viện EJS](https://ejs.co/)

EJS có thể được cài đặt và sử dụng trong cả môi trường chạy JavaScript của trình duyệt web ở phía `client-side` và của NodeJS ở phía `server-side`.

### a. Sử dụng EJS trong trình duyệt web

Để sử dụng `EJS` trong môi trường trình duyệt web, chúng ta chỉ cần tải về tệp [`ejs.min.js`](https://github.com/mde/ejs/releases) để nhúng thư viện này vào một thẻ `<script>` đứng trước code sử dụng:

```index.html
<script src="ejs.min.js"></script>
<script src="main.js"></script>
```

Như vậy là code JavaScript trong tệp `main.js` đã có thể sử dụng `EJS` để tạo ra và sử dụng các `template`.

```main.js
const ejs = require("ejs");

var template = `
   <body>
      <h1> <%= data.get("title") %> </h1>
      <p> <%= data.get("content") %> </p>
   </body>
`;

var data = new Map()
data.set("title", "Giới thiệu EJS")
     .set("content", "Đây là một thư viện hỗ trợ Templating.");

var html = ejs.render(template, { data });

console.log(html);
```

```console.io
<body>
   <h1> Giới thiệu EJS </h1>
   <p> Đây là một thư viện hỗ trợ Templating. </p>
</body>
```

### b. Sử dụng EJS trong NodeJS

Cài đặt bằng `npm`:

```CMD|Terminal.io
npm install --save ejs
```

Code sử dụng thư viện `ejs`:

```test.js
const ejs = require("ejs");

var template = `
   <body>
      <h1> <%= data.get("title") %> </h1>
      <p> <%= data.get("content") %> </p>
   </body>
`;

var data = new Map();
data.set("title", "Giới thiệu EJS")
    .set("content", "Đây là một thư viện hỗ trợ Templating.");

var html = ejs.render(template, { data });

console.log(html);
```

Kiểm tra code `html` kết quả:

```CMD|Terminal.io
npm test

<body>
   <h1> Giới thiệu EJS </h1>
   <p> Đây là một thư viện hỗ trợ Templating. </p>
</body>
```

Và như chúng ta đã thấy, trong Sub-Series ExpressJS, khi chúng ta gọi phương thức `response.render()` và cung cấp đường dẫn tới tệp `.ejs` kèm theo object `data` cung cấp dữ liệu. ExpressJS đã tự động hóa quá trình đọc nội dung của tệp `.ejs` và chuỗi nội dung `template` được chuyển cho thư viện `EJS` kèm theo `data` để tạo ra code HTML kết quả. Sau đó ExpressJS cũng tự động hóa luôn việc chuyển code HTML kết quả này trình duyệt web đang yêu cầu.

```view/index.ejs
<body>
   <h1> <%= data.get("title") %> </h1>
   <p> <%= data.get("content") %> </p>
</body>
```

```test.js
app.get("/", async (request, response) => {
   // --- giả định dữ liệu truy vấn được từ database -> data
   var data = new Map();
   data.get("title", "Giới thiệu EJS")
       .get("content", "Đây là một thư viện hỗ trợ Templating.");
   
   response.render("index", { data });
});
```

## Những thẻ nhúng cơ bản

Như chúng ta đã thấy thì `template` của EJS về cơ bản vẫn là code HTML và được nhúng thêm code JavaScript bằng các thẻ đánh dấu khu vực dành cho code JavaScript. Cặp thẻ `<%=` và `%>` trong ví dụ mở đầu được sử dụng để hiển thị một giá trị trong JavaScript vào vị trí tương ứng trong code HTML.

Trong trường hợp chúng ta sẽ muốn thực hiện những logic khác ví dụ như lặp lại thao tác gắn dữ liệu cho các phần tử của một danh sách. Lúc này chúng ta có thể sử dụng cặp thẻ `<%` và `%>` - không có dấu `=` - để viết code JavaScript thực hiện thao tác lặp như sau:

```view/index.ejs
<nav>
<% for (var category of data.get("category-list")) { %>
   <a> <%= category %> </a>
<% } %>
</nav>
```

Và khi cung cấp `data` có chứa một mảng `category-list` thì chúng ta sẽ có code HTML kết quả ở dạng như thế này:

```index.html
<nav>
   <a href="#"> HTML </a>
   <a href="#"> CSS </a>
   <a href="#"> Bootstrap </a>
   <a href="#"> JavaScript </a>
   <a href="#"> jQuery </a>
   <a href="#"> NodeJS </a>
   <a href="#"> ExpressJS </a>
</nav>
```

Ở đây chúng ta lưu ý là cặp thẻ `<%` và `%>` được sử dụng để viết code JavaScript xử lý logic chứ không có tác dụng hiển thị bất kỳ giá trị nào ra bề mặt code HTML kết quả.

Một cặp thẻ khác của `ejs` được sử dụng rất phổ biến là `<%-` và `%>` - thẻ mở có dấu `-` - được sử dụng để nhúng một tệp `.ejs` này trong một tệp `.ejs` khác.

```view/component/topnav.ejs
<nav>
<% for (var category of data.get("category-list")) { %>
   <a> <%= category %> </a>
<% } %>
</nav>
```

```index.ejs
<body>
   <%- include("./component/topnav.ejs", { data }) %>
</body>
```

Ở đây chúng ta sử dụng hàm `include()` do thư viện `EJS` cung cấp và truyền tiếp `data` cho `topnav.ejs` sử dụng. Tệp `topnav.ejs` sẽ được biên dịch để lấy code HTML kết quả trả về ở vị trí lời gọi hàm `include()`. Sau đó code HTML kết quả được hiển thị bởi cặp thẻ `<%-` và `%>` giúp duy trì các ký hiệu đặc biệt trong code không bị chuyển đổi thành [code HTML Entity](https://www.w3schools.com/html/html_entities.asp).

Cặp thẻ `<%=` và `%>` sẽ khiến ký hiệu `<` được biên dịch thành `&lt;` và ký hiệu `>` được biên dịch thành `&gt;`. Điều này khiến code HTML kết quả bị thay đổi ví dụ như `<p>` sẽ được biên dịch thành `&lt;p&gt;`. Và khi được hiển thị trên bề mặt trình duyệt web thì các code Entity được chuyển đổi ngược lại thành các ký hiệu `<` và `>`. Như vậy người xem trang web sẽ có cơ hội được học HTML trước khi muốn tìm hiểu lập trình web. :D

Cuối cùng là cặp thẻ `<%#` và `%>` được sử dụng để viết chú thích trong tệp `.ejs`, các chú thích này sẽ được bỏ qua khi code EJS được biên dịch thành code HTML kết quả.

## Kết thúc bài viết

Như vậy là chúng ta đã lướt qua phần giới thiệu thư viện `EJS` bao gồm cách cài đặt và sử dụng cơ bản. Trong bài viết tiếp theo, chúng ta sẽ bắt đầu viết code xây dựng giao diện trang blog cá nhân đơn giản. Tuy nhiên mình cần lưu ý trước tại đây rằng giao diện blog được sử dụng làm ví dụ trong Sub-Series này sẽ ở dạng tối giản để chúng ta có thể tập trung tốt hơn vào logic quản lý code. Do đó chúng ta sẽ không triển khai code CSS responsive và đồng thời thiết kế blog sẽ chỉ đáp ứng những tính năng cơ bản nhất. 

Mình hy vọng rằng Sub-Series này sẽ có thể được sử dụng làm chất liệu khởi điểm để bạn xây dựng nên giao diện blog mà bạn mong muốn với nhiều tính năng mở rộng hơn. Hẹn gặp lại bạn trong những bài viết tiếp theo.

[[EJS] Bài 2 - Viết Code Xây Dựng Giao Diện Blog Đơn Giản](https://viblo.asia/p/07LKXR7klV4)