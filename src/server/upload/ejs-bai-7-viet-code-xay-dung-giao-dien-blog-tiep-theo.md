Trong bài viết này, chúng ta sẽ tiếp tục viết code `template` cho hai bố cục còn lại của nhóm `layout/article` để hiển thị các giao diện soạn thảo bài viết mới và chỉnh sửa bài viết cũ.

## Bố cục trang soạn thảo bài viết mới

```structure.txt
[view]
.  |
.  +-----[layout]
.           |
.           +-----[article]
.                    |
.                    +-----[action]
.                    |        |
.                    |        +-----view.ejs
.                    |        +-----add.ejs
.                    |        +-----edit.ejs
.                    |
.                    +-----index.ejs
```

```view/layout/article/action/add.ejs
<!doctype html>
<html>
<head>
   <%- include("../../../component/meta.ejs", { data }) %>
</head>
<body>
   <%- include("../../../component/topnav.ejs" , { data }) %>
   <%- include("../../../component/article/add.ejs" , { data }) %>
   
   <%- include("../../../component/script.ejs") %>
</body>
</html>
```

```view/component/article/action/add.ejs
<form id="article" action="/article/add" method="post">
   <div class="container">
      <input type="text" name="title" value="Bài Viết Mới" />
      
      <input type="text" name="keywords" placeholder="Từ khóa liên quan...">
      
      <select name="category-id">
         <option> Danh Mục </option>
         <option value="00"> Giới Thiệu </option>
         <option value="01"> HTML </option>
         <option value="02"> CSS </option>
         <option value="03"> Bootstrap </option>
         <option value="04"> JavaScript </option>
         <option value="05"> jQuery </option>
         <option value="06"> NodeJS </option>
         <option value="07"> ExpressJS </option>
      </select>

      <button type="submit"> Đăng bài </button>

      <textarea name="content" placeholder="Nội dung bài viết..."></textarea>
   </div><!-- .container -->
</form>
```

## Bổ sung code CSS

```public/css/component/article.css
/* ... */

#article [name="title"] {
   border: none;
   border-bottom: 1px solid lightgray;

   display: block;
   width: 100%;
   padding: 0 18px;

   font-size: 2.618em;
}

#article [name="content"] {
   border: 1px solid lightgray;

   display: block;
   width: 100%;
   height: 1080px;
   padding: 9px 18px;
   resize: none;
   
   font-size: 21px;
}

#article [name="title"],
#article [name="keywords"],
#article [name="content"] {
   margin: 27px 0;
}

#article [name="title"]::placeholder,
#article [name="keywords"]::placeholder,
#article [name="content"]::placeholder {
   color: lightgray;
}

#article [name="keywords"],
#article [name="category-id"],
#article [type="submit"] {
   background: whitesmoke;
   border: none;
   border-bottom: 1px solid lightgray;

   display: inline-block;
   height: 45px;
   padding: 0 18px;
   margin-right: 24px;

   cursor: pointer;
}

#article [name="keywords"] {
   background: white;

   width: 100%;
   max-width: 450px;
}
```

Chạy `test` để xem kết quả hiển thị tạm.

```CMD|Terminal.io
npm test

Server started
```

![](https://images.viblo.asia/a0a5253d-ce98-4488-ae69-b4d4f0b6f21f.png)

## Cung cấp tham số data

Trong giao diện này thì logic code `template` của khối `express-blog/view` sẽ không biết trước danh sách các hạng mục và đường dẫn để gửi thông tin mà `<form>` thu thập được ở thuộc tính `action`. Do đó chúng ta cần cung cấp ra bên ngoài các tham số qua các khóa `category-list` và `endpoint` là đường dẫn để gửi yêu cầu tới.

```express-blog/view/type/Data.js
const Data = class extends Map {
   constructor() {
      super();

      /* --- meta.ejs... */
      /* --- topnav.ejs */
      this.set("logo-text"    , "L O G O")
          .set("category-list", []       );

      /* --- header.ejs... */
      /* --- main.ejs... */
      /* --- article/add.ejs */
      this.set("endpoint", "");

      return this;
   }
}; // Data

module.exports = Data;
```

Khóa `category-list` chúng ta đã tạo ra khi xây dựng `topnav` và chỉ cần bổ sung thêm trường dữ liệu `@id` cho `class Category`.

```express-blog/view/type/Category.js
const Category = class extends Map {
   constructor() {
      super();

      this.set("@id", "")
          .set("name", "")
          .set("url" , "");

      return this;
   }
}; // Category

module.exports = Category;
```

```view/component/article/action/add.ejs
<form id="article" action="<%= data.get("endpoint") %>" method="post">
   <div class="container">
      <input type="text" name="title" value="Bài Viết Mới" />
      
      <input type="text" name="keywords" placeholder="Từ khóa liên quan...">
      
      <select name="category-id">
         <option> Danh Mục </option>
      <% for (var category of data.get("category-list")) { %>
         <option value="<%= category.get("@id") %>">
            <%= category.get("name") %>
         </option>
      <% } %>
      </select>

      <button type="submit"> Đăng bài </button>

      <textarea name="content" placeholder="Nội dung bài viết..."></textarea>
   </div><!-- .container -->
</form>
```

Dữ liệu giả định trong `express-blog/data.js` thì chúng ta đã có `category-list` để cung cấp cho `topnav` do đó chỉ cần bổ sung thêm `endpoint` để giao diện này có thể hoạt động được.

```express-blog/data.js
/* requires... */
var data = new Data();

/* TopNav... */
var category1 = new Category()
   .set("@id", "01")
   .set("name", "Html")
   .set("url" , "/category/view/01");

var category2 = new Category()
   .set("@id", "02")
   .set("name", "Css")
   .set("url" , "/category/view/02");

var category3 = new Category()
   .set("@id", "03")
   .set("name", "Bootstrap")
   .set("url" , "/category/view/03");

var category4 = new Category()
   .set("@id", "04")
   .set("name", "JavaScript")
   .set("url" , "/category/view/04");

var category5 = new Category()
   .set("@id", "05")
   .set("name", "jQuery")
   .set("url" , "/category/view/05");

var category6 = new Category()
   .set("@id", "06")
   .set("name", "NodeJS")
   .set("url" , "/category/view/06");

var category7 = new Category()
   .set("@id", "07")
   .set("name", "ExpressJS")
   .set("url" , "/category/view/07");
   
data.set("category-list", [ ... ]);

/* Main... */
/* Article - View... */

/* Article - Add */
data.set("endpoint", "/article/add");

module.exports = data;
```

Bây giờ chúng ta cần bổ sung thêm phương thức `app.post` để kiểm tra thông tin được truyền về `server`.

```express-blog/test.js
const bodyParser = require("body-parser");

/* ... */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(pathToPublic));

app.get("*", async (request, response) => {
   response.render("index.ejs", {
      layout: "article",
      action: "add",
      data  : require("./data")
   });
}); // app.get

app.post("*", (request, response) => {
   response.json(request.body);
})
```

```CMD|Terminal.io
npm test

Server started
```

![](https://images.viblo.asia/d3de1113-9298-4ec4-acc5-9a7c3339cc97.png)

Và kết quả sau khi nhấn `Đăng bài` để gửi dữ liệu về `server`.

![](https://images.viblo.asia/77da0898-a86b-4385-885f-e6af827b8263.png)

## Kết thúc bài viết

Như vậy là chúng ta đã có thêm giao diện trang soạn thảo bài viết mới. Trong bài tiếp theo, chúng ta sẽ lướt nhanh qua code `temlate` của trang chỉnh sửa bài viết đã có và sau đó quay trở lại Sub-Series ExpressJS để viết code điều hành cho nhóm các `layout` này.

[[EJS] Bài 8 - Viết Code Xây Dựng Giao Diện Blog (Tiếp Theo)](https://viblo.asia/p/yMnKMR6jZ7P)