Giao diện các trang đơn danh mục bài viết của thiết kế blog dạng này sẽ không có gì khác nhiều so với giao diện trang chủ, chúng ta vẫn sẽ có thanh điều hướng `topnav`, phần `header` hiển thị tên danh mục và đoạn giới thiệu ngắn, và phần `main` hiển thị các trích đoạn ngắn của các bài viết mới nhất thuộc danh mục đó.

Ở thời điểm mình đang soạn bài viết này thì có lẽ bạn đã hoàn thành xong code `template` như trên rồi. Ở đây chúng ta sẽ bắt đầu nói về nhóm `template` chính của blog là `layout/article` bao gồm:

- Giao diện xem bài viết `view.ejs`
- Giao diện soạn thảo bài viết mới `add.ejs`
- Giao diện chỉnh sửa bài viết cũ `edit.ejs`

```structure.txt
[view]
.  |
.  +-----index.ejs
.  +-----[component]
.  +-----[layout]
.           |
.           +-----[article]
.           |        |
.           |        +-----[action]
.           |        |        |
.           |        |        +-----view.ejs
.           |        |        +-----add.ejs
.           |        |        +-----edit.ejs
.           |        |
.           |        +-----index.ejs
.           |
.           +-----[category]
.           +-----admin.ejs
.           +-----home.ejs
.           +-----oops.ejs
```

## Xem lại logic hiển thị từ điểm khởi đầu

Trước khi bắt tay vào viết code `template` cho tệp `view.ejs` thì chúng ta sẽ nhìn lại một chút logic hiển thị tính từ điểm khởi đầu là tệp `view/index.ejs`.

```view/index.ejs
<%#
   --- Các tham số ---
   
   layout: home | category | article | oops | admin
   action: view | add | edit
   data  : Data { ... }
%>

<% 
   const makeHTML = function(layoutName) {
      if (layoutName == "home")
         return include("./layout/home", { action, data });
      if (layoutName == "category")
         return include("./layout/category/index", { action, data });
      if (layoutName == "article")
         return include("./layout/article/index", { action, data });
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

Khi lệnh `render` được phát động với tham số `layout: "article"`, code logic ở đây sẽ gọi hàm `include()` trỏ tới tệp `layout/article/index.ejs` và thu được kết quả là code HTML để hiển thị ở dòng `<%- HTMLcode %>`. Hàm `include()` ở đây về cơ bản sẽ chạy code `template` trong tệp `index.ejs` của nhóm `layout/article` mà chúng ta đã viết trong bài trước:

```layout/article/index.ejs
<%#
   --- Các tham số ---

   action: view | add | edit
   data  : Data { ... }
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

Ở đây logic hiển thị tiếp tục kiểm tra tham số `action` được truyền vào và chọn một trong số các tệp `template` chi tiết sau cùng để tạo ra code HTML trả về cho code sử dụng bên ngoài.

## Bố cục trang đơn xem bài viết

Chúng ta sẽ bắt đầu với bố cục của trang đơn hiển thị nội dung bài viết cho người dùng đọc blog. Nội dung của một bài viết blog như chúng ta đã biết - là nội dung hoàn chỉnh và độc lập với các thành phần khác trong trang web và thường được đặt trong thẻ `<article>`. Như vậy trang đơn mà chúng ta đang xây dựng lúc này sẽ không cần `component/header` để hiển thị thông tin giới thiệu ngắn. Về cơ bản thì chúng ta chỉ cần sử dụng lại các `component` bao gồm `meta.ejs`, `topnav.ejs`, và `scriptejs`.

```view/layout/article/action/view.ejs
<!doctype html>
<html>
<head>
   <%- include("../../../component/meta.ejs", { data }) %>
</head>
<body>
   <%- include("../../../component/topnav.ejs" , { data }) %>
   
   <article id="article">
      <div class="container">
         <h1> Bài Viết Thứ 1001 </h1>
         <span> Thu May 05 2022 10:40:35 GMT+0700 (Indochina Time) </span>

         <blockquote>
            "There is no one who wants pain itself, who seeks after it and 
            wants to have it, simply because they have been holding it along..."
         </blockquote>

         <h2> What is Lorem Ipsum? </h2>

         <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem Ipsum has been the industry's standard dummy text 
            ever since the 1500s, when an unknown printer took a galley of type 
            and scrambled it to make a type specimen book. It has survived not 
            only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s 
            with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker 
            including versions of Lorem Ipsum -
            <a href="https://www.lipsum.com/" target="_blank">
               https://www.lipsum.com/
            </a>
         </p>
      </div><!-- .container -->
   </article>
   
   <%- include("../../../component/script.ejs") %>
</body>
</html>
```

Ở đây bạn có thể sẽ không cần phải tạo một `component` riêng để tách khối `<article>` ra khỏi `template` này. Tuy nhiên mình có sử dụng một `convention` riêng đó là trang thông báo lỗi không tìm thấy nội dung thường được mình xem là một bài viết đặc biệt. Vì vậy nên ở đây mình sẽ tách khối `<article>` thành một `component` để tái sử dụng lại cho `layout/oops.ejs`. 

Thêm vào đó thì chúng ta có ba bố cục của nhóm này tương ứng với các thao tác xem `view`, thêm mới `add`, và chỉnh sửa `edit`. Do đó nên chúng ta cũng sẽ tạo ra một nhóm `component/article` bao gồm các `component` tương ứng với các bố cục `view`, `add`, và `edit`.

```structure.txt
[view]
.  |
.  +-----[component]
.           |
.           +-----[article]
.                    |
.                    +-----view.ejs
.                    +-----add.ejs
.                    +-----edit.ejs
```

```view/component/article/view.ejs
<article id="article">
   <div class="container">
      <h1> Bài Viết Thứ 1001 </h1>
      <span> Thu May 05 2022 10:40:35 GMT+0700 (Indochina Time) </span>

      <blockquote>
         "There is no one who wants pain itself, who seeks after it and 
         wants to have it, simply because they have been holding it along..."
      </blockquote>

      <h2> What is Lorem Ipsum? </h2>

      <p>
         Lorem Ipsum is simply dummy text of the printing and typesetting 
         industry. Lorem Ipsum has been the industry's standard dummy text 
         ever since the 1500s, when an unknown printer took a galley of type 
         and scrambled it to make a type specimen book. It has survived not 
         only five centuries, but also the leap into electronic typesetting, 
         remaining essentially unchanged. It was popularised in the 1960s 
         with the release of Letraset sheets containing Lorem Ipsum passages, 
         and more recently with desktop publishing software like Aldus PageMaker 
         including versions of Lorem Ipsum -
         <a href="https://www.lipsum.com/" target="_blank">
            https://www.lipsum.com/
         </a>
      </p>
   </div><!-- .container -->
</article>
```

Như vậy code `layout` mới trông sẽ gọn gàng hơn rất nhiều.

```view/layout/article/action/view.ejs
<!doctype html>
<html>
<head>
   <%- include("../../../component/meta.ejs", { data }) %>
</head>
<body>
   <%- include("../../../component/topnav.ejs" , { data }) %>
   <%- include("../../../component/article/view.ejs", { data }) %>
   
   <%- include("../../../component/script.ejs") %>
</body>
</html>
```

## Bổ sung code CSS

```structure.txt
[express-blog]
.  |
.  +-----[view]
.  +-----[public]
.           |
.           +-----[css]
.                   |
.                   +-----[component]
.                   +-----style.css
```

```public/css/component/article.css
#article {
   color: black;
   background: white;

   padding: 72px 0;
}

#article h1 {
   font-size: 2.618em;
}

#article h1 + span {
   color: lightgray;

   display: block;
   margin: 9px 0 18px;
}

#article h2 {
   font-size: 1.618em;
}

#article h3 {
   font-size: 1em;
}

#article p {
   margin: 27px 0;
}

#article a {
   color: royalblue;
}

#article blockquote {
   background: whitesmoke;
   border-left: 6px solid lightgray;

   padding: 18px;
   margin: 27px 0;

   font-size: 21px;
   font-style: italic;
}

#article img {
   display: block;
   max-width: 100%;
   height: auto;
   margin: 0 auto;
}

#article code {
   background: whitesmoke;
   display: inline-block;
   padding: 3px 6px;

   font-family: "Noto Mono", "Consolas", "Menlo", monospace;
   font-size: 15px;
}

#article pre {
   background: whitesmoke;

   display: block;
   width: 100%;
   margin: 36px 0;
   max-height: 480px;
   overflow-y: scroll;
}

#article pre > code {
   display: block;
   padding: 72px 18px 27px;

   position: relative;

   font-family: "Noto Mono", "Consolas", "Menlo", monospace;
   font-size: 0.618em;
   line-height: 1.618;
   overflow-x: scroll;
}

#article pre > code::before {
   content: ""  attr(class);

   color: white;
   background: gray;

   display: inline-block;
   padding: 9px 18px;

   position: absolute;
   top: 0;
   left: 0;
}
```

```public/css/style.css
@import "./component/base.css";
@import "./component/topnav.css";
@import "./component/header.css";
@import "./component/main.css";
@import "./component/article.css";
```

Chạy `test` để xem kết quả hiển thị giả định.

```express-blog/test.js
app.get("*", async (request, response) => {
   response.render("index.ejs", {
      layout: "article",
      action: "view",
      data  : null
   });
}); // app.get
```

```CMD|Terminal.io
npm test

Server started
```

![](https://images.viblo.asia/4d9e287b-2165-440d-a30b-5419ad904abc.png)

## Cung cấp tham số data

Trong thiết kế đơn giản ở đây mình chỉ sử dụng các thông tin bao gồm tiêu đề đầy đủ của bài viết `title`, thời điểm chỉnh sửa lần cuối `edited-datetime`, và nội dung của bài viết `content` đã được biên dịch sang code HTML từ nguồn nào đó mà khối `express-blog/view` không cần quan tâm tới.

Vì vậy nên chúng ta sẽ chỉ cần cung cấp duy nhất một khóa có tên là `article` đại diện cho bản ghi chứa nội dung của bài viết cần hiển thị; Và đồng thời định nghĩa một kiểu dữ liệu tương ứng trong `view/type`.

```view/component/article/view.ejs
<article id="article">
   <div class="container">
      <h1> <%= data.get("article").get("title") %> </h1>
      <span> <%= data.get("article").get("edited-datetime") %> </span>

      <%- data.get("article").get("content") %>
   </div><!-- .container -->
</article>
```

```view/type/Article.js
const Article = class extends Map {
   constructor() {
      super();

      this.set("title", "Tiêu đề bài viết")
          .set("content", "Nội dung đầy đủ của bài viết...")
          .set("edited-datetime", new Date().toString());

      return this;
   }
}; // Article

module.exports = Article;
```

Viết lại `test` để hiển thị các thông tin mặc định của `class Article` mới.

```express-blog/test.js
app.get("*", async (request, response) => {
   var Article = require("./view/type/Article");
   var data = require("./data")
      .set("article", new Article());

   response.render("index.ejs", {
      layout: "article",
      action: "view",
      data
   });
}); // app.get
```

```CMD|Terminal.io
npm test

Server started
```

![](https://images.viblo.asia/0ab02482-ffbd-4b03-b78b-8e99db2e0083.png)

Như vậy là chúng ta đã thực hiện xong những thiết lập cơ bản cho nhóm `layout/article` và viết xong `template` đơn giản cho trang hiển thị nội dung bài viết với bố cục `action/view.ejs`. Trong những bài viết tiếp theo, chúng ta sẽ hoàn thành hai bố cục còn lại của nhóm `layout/article` trước khi quay lại Sub-Series ExpressJS để viết code điều hành cho nhóm `article`.

[[EJS] Bài 7 - Viết Code Xây Dựng Giao Diện Blog (Tiếp Theo)](https://viblo.asia/p/bJzKmAoBK9N)