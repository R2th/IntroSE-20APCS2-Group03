Bây giờ chúng ta sẽ cùng bắt tay vào xây dựng những thành phần có mặt trong trang chủ của blog. Khởi đầu sẽ là thanh điều hướng chính với thiết kế đơn giản chỉ bao gồm các liên kết trỏ tới các danh mục bài viết. Tuy nhiên trước hết hãy nhìn lại tổng quan cấu trúc thư mục `view` mà chúng ta đang có.

```
[view]
.  |
.  +-----[component]
.  |        |
.  |        +-----meta.ejs
.  |        +-----script.ejs
.  |
.  +-----[layout]
.  |        |
.  |        +-----home.ejs
.  |        |
.  |        +-----oops.ejs
.  |        +-----admin.ejs
.  |        +-----[category]
.  |        +-----[article]
.  |
.  +-----index.ejs
```

## Bổ sung component/topnav

Chúng ta mới chỉ có 2 `component` đầu tiên là:

- `meta.ejs` - chứa tất cả các thông tin trong `<head>`.
- `script.ejs` - chứa tất cả các thẻ `<script>` ở cuối `<body>`.
    
Và bởi vì một thanh điều hướng là thành phần hiển nhiên không thể thiếu trong các `layout` nói chung. Do đó nên chúng ta sẽ đặt ngay thành phần này vào tệp `component` thứ ba với tên gọi là `topnav.ejs` và `include` vào `home.ejs`.

```view/component/topnav.ejs
<nav id="topnav">
   <a class="logo" href="/"> L O G O </a>
   
   <a class="nav-link" href="#"> Html </a>
   <a class="nav-link" href="#"> Css </a>
   <a class="nav-link" href="#"> Bootstrap </a>
   <a class="nav-link" href="#"> JavaScript </a>
   <a class="nav-link" href="#"> jQuery </a>
   <a class="nav-link" href="#"> NodeJS </a>
   <a class="nav-link" href="#"> ExpressJS </a>
   
   <a class="time" target="_blank"
      href="https://www.google.com/search?q=time">
      <time id="time"> 10:01 A.M - May 1, 2022 </time>
   </a>
</nav><!-- #topnav -->
```

```view/layout/home.ejs
<!doctype html>
<html>
<head>
   <%- include("../component/meta.ejs", { data }) %>
</head>
<body>
   <%- include("../component/topnav.ejs", { data }) %>

   <%- include("../component/script.ejs") %>
</body>
</html>
```

## Code CSS & Client-side JavaScript

Trong code của `topnav.ejs` thì chúng ta đang tạm đặt vào các liên kết giả `mockup` để theo dõi kết quả hiển thị trước khi viết code logic để tạo ra các liên kết từ dữ liệu do tham số `data` cung cấp. Và ở đây thì mình đã chuẩn bị sẵn code CSS và `client-side` JavaScript cho thanh điều hướng này. Bạn có thể thực hiện thao tác copy/paste đơn giản để dành thời gian thảo luận về các thành phần khác.

```structure.txt
[express-blog]
.  |
.  +-----[public]
.  |        |
.  |        +-----[css]
.  |        |       |
.  |        |       +-----[component]
.  |        |       |        |
.  |        |       |        +-----base.css
.  |        |       |        +-----topnav.css
.  |        |       |
.  |        |       +-----style.css
.  |        |
.  |        +-----[js]
.  |               |
.  |               +-----main.js
.  |
.  +-----[view]
.  +-----data.js
.  +-----test.js
```

- [public/css/component/base.css](https://gist.github.com/semiarthanoian/bc650ed8565a74680449d7708e7d7f5f)
- [public/css/component/topnav.css](https://gist.github.com/semiarthanoian/2ef666bac966ad3187ad32e24c1e4804)

```public/css/style.css
@import "./component/base.css";
@import "./component/topnav.css";
```

- [public/js/main.js](https://gist.github.com/semiarthanoian/82ba47b21dd259c828b9c6e069eedda6)

Chạy `test` để kiểm tra kết quả hiển thị.

```CMD|Terminal.io
npm test

Server Started
```

![](https://images.viblo.asia/fd8b684b-58c3-45ff-957f-c2a7236af9ee.png)

## Sử dụng tham số data

Mục đích của việc cung cấp các tham số cho code bên ngoài sử dụng đó là để phần mềm vẽ giao diện `view` của chúng ta có thể được sử dụng lại ở bất kỳ `project` blog cá nhân nào khác. Đó cũng là tiêu chí thiết kế chung của các `node module` hay các `npm package`, và cả ở những môi trường lập trình khác thì mọi người cũng đều hướng đến.

Trong code hiển thị tạm của `topnav.ejs` ở phía trên thì chúng ta có một vài thành phần sau cần tạo tham số đầu vào:

- Đoạn chữ `L O G O` - Tên của mỗi blog sẽ khác nhau.
- Các liên kết tới các trang đơn danh mục - Số lượng liên kết, tên hiển thị, đường dẫn trong `href`.

Nói riêng về các liên kết tới các trang đơn danh mục. Chúng ta sẽ cần dữ liệu đầu vào là một mảng các `object` mô tả danh mục với các trường dữ liệu là tên hiển thị `name`, và đường dẫn liên kết `url` sử dụng cho `href`. Lúc này bạn có thể thấy rõ ràng là chúng ta có rất nhiều thông tin cần cung cấp để hướng dẫn người viết code sử dụng `view` từ bên ngoài. 

Nếu như bạn có theo dõi [Sub-Series Database](https://viblo.asia/p/4dbZNRqvZYM) thì sẽ thấy có một thao tác rất quan trọng đó là việc định nghĩa các kiểu dữ liệu `type` để sử dụng cho chương trình đang xây dựng. Mặc dù các kiểu dữ liệu tự định nghĩa có thể không có nhiều tính năng bổ sung so với các kiểu dữ liệu mặc định mà ngôn ngữ cung cấp; Nhưng điều quan trọng nhất là chúng ta có thể biểu thị ý nghĩa của mỗi `object` dữ liệu rất rõ ràng và giảm bớt khả năng phát sinh nhầm lẫn khi viết code sử dụng.

Và bây giờ thì chúng ta sẽ tạo ra các kiểu dữ liệu sử dụng cho phần mềm `view` ở đây. Đầu tiên chúng ta sẽ di chuyển tệp `data.js` ở bên ngoài vào trong thư mục `view`. Sau đó tạo thêm một thư mục `type` bên cạnh hai thư mục `component` và `layout`; Và các kiểu dữ liệu đầu tiên trong thư mục `type` là hai `class` có tên là `Data` và `Category`.

```structure.txt
[view]
.  |
.  +-----[component]
.  +-----[layout]
.  +-----[type]
.  |        |
.  |        +-----Data.js
.  |        +-----Category.js
.  |
.  +-----index.ejs
```

Ở đây `class Data` được sử dụng để tạo ra `object` tham số `data` lớn nhất chứa tất cả dữ liệu cung cấp vào `index.ejs` và được truyền vào các `layout` rồi tới các `component`; Còn `class Category` là để chung chuyển dữ liệu đầu vào biểu thị cho các danh mục bài viết.

```express-blog/view/type/Data.js
const Data = class extends Map {
   constructor() {
      super();

      this.set("title"        , "The Blog")
          .set("logo-text"    , "L O G O" )
          .set("category-list", []        );

      return this;
   }
}; // Data

module.exports = Data;
```

```express-blog/view/type/Category.js
const Category = class extends Map {
   constructor() {
      super();

      this.set("name", "")
          .set("url" , "");

      return this;
   }
}; // Category

module.exports = Category;
```

Và sửa lại phần chú thích ở đầu tệp `view/index.ejs` để mô tả tham số `data` là một `object` tạo ra bởi `class Data`.

```view/index.ejs
<%#
   --- Các tham số ---
   
   layout: home | category | article | admin | oops
   action: view | edit
   data  : Data { ... }
%>
```

Cuối cùng là sửa lại code trong tệp `topnav.ejs` để sử dụng các tham số dữ liệu đầu vào trong `data`. Ở đây chúng ta có một mảng chứa các `object Category` được lưu trong khóa `category-list`. Thao tác tạo các liên kết về cơ bản là lặp qua mảng này và tạo ra các phần tử `<a>` giống với ví dụ trong bài giới thiệu EJS.

```view/component/topnav.ejs
<nav id="topnav">
   <a class="logo" href="/">
      <%= data.get("logo-text") %>
   </a>
   
<% for (var category of data.get("category-list")) { %>
   <a class="nav-link" href="<%= category.get("url") %>">
      <%= category.get("name") %>
   </a>
<% } %>
   
   <a class="time" target="_blank"
      href="https://www.google.com/search?q=time">
      <time id="time"> 10:01 A.M - May 1, 2022 </time>
   </a>
</nav><!-- #topnav -->
```

Để chạy thử code `template` mới, chúng ta cần giả lập dữ liệu truy vấn được từ nguồn nào đó trong tệp `express-blog/data.js` sử dụng các `class` dữ liệu trong `view/type`.

```express-blog/data.js
const Data = require("./view/type/Data");
const Category = require("./view/type/Category");

var category1 = new Category()
   .set("name", "Html")
   .set("url" , "/category/view/01");

var category2 = new Category()
   .set("name", "Css")
   .set("url" , "/category/view/02");

var category3 = new Category()
   .set("name", "Bootstrap")
   .set("url" , "/category/view/03");

var category4 = new Category()
   .set("name", "JavaScript")
   .set("url" , "/category/view/04");

var category5 = new Category()
   .set("name", "jQuery")
   .set("url" , "/category/view/05");

var category6 = new Category()
   .set("name", "NodeJS")
   .set("url" , "/category/view/06");

var category7 = new Category()
   .set("name", "ExpressJS")
   .set("url" , "/category/view/07");

var data = new Data()
   .set("category-list", [
      category1,
      category2,
      category3,
      category4,
      category5,
      category6,
      category7
   ]);

module.exports = data;
```

```CMD|Terminal.io
npm test

Server Started
```

![](https://images.viblo.asia/2caff493-e8cc-4436-bd8f-b56bfeae8a6b.png)

Các liên kết tới các trang danh mục đã được hiển thị và được gắn đường dẫn ở thuộc tính `href`. Như vậy là chúng ta đã có code `template` của thanh điều hướng chính hoạt động tốt nếu dữ liệu truyền vào hợp lệ. 

Trong bài tiếp theo, chúng ta sẽ lướt nhanh qua các thành phần còn lại có mặt trong giao diện trang chủ.

[[EJS] Bài 4 - Viết Code Xây Dựng Giao Diện Blog (Tiếp Theo)](https://viblo.asia/p/Az45bRyN5xY)