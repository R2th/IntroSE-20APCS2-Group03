Trong bài viết này, chúng ta sẽ lướt nhanh qua code `template` của trang chỉnh sửa bài viết. Đây cũng là `layout` chi tiết cuối cùng trong nhóm `article` trước khi chúng ta quay lại Sub-Series ExpressJS và viết code xử lý cho các `route` tương ứng.

## Bố cục trang chỉnh sửa bài viết

Về bố cục tổng quan, giao diện chỉnh sửa bài viết `edit` không có gì khác nhiều so với giao diện soạn thảo bài viết mới `add`. Trường hợp sử dụng ở đây là chúng ta sẽ có dữ liệu truy vấn một bản ghi đã có trong `database` để bày vào các thành phần trong `<form>` chờ chỉnh sửa. Do bản ghi này đã được xác định trước do đó nên chúng ta sẽ có thêm một `<input>` ẩn chứa giá trị `@id` để xác định bản ghi trong `database`.

```html:view/layout/article/action/edit.ejs
<!doctype html>
<html>
<head>
   <%- include("../../../component/meta.ejs", { data }) %>
</head>
<body>
   <%- include("../../../component/topnav.ejs" , { data }) %>
   <%- include("../../../component/article/edit.ejs" , { data }) %>

   <%- include("../../../component/script.ejs") %>
</body>
</html>
```

```html:view/component/article/edit.ejs
<form id="article" action="<%= data.get("endpoint") %>" method="post">
   <div class="container">
      <input class="hidden" type="text" name="@id"
             value="<%= data.get("article").get("@id") %>" />

      <input type="text" name="title"
             value="<%= data.get("article").get("title") %>" />

      <input type="text" name="keywords" placeholder="Từ khóa liên quan..."
             value="<%= data.get("article").get("keywords") %>" />

      <select name="category-id">
         <option> Danh Mục </option>
      <% for (var category of data.get("category-list")) { %>
         <option value="<%= category.get("@id") %>">
            <%= category.get("name") %>
         </option>
      <% } %>
      </select>

      <button type="submit"> Đăng bài </button>

      <textarea name="content" placeholder="Nội dung bài viết..."><%= data.get("article").get("content") %></textarea>
   </div><!-- .container -->
</form>
```

## Bổ sung code CSS

Ở đây chúng ta chỉ có thêm 1 class tiện ích `.hidden` để ẩn ô nhập liệu đang chứa `@id` và sẽ định nghĩa trong tệp `base.css`.

```css:public/css/component/base.css
/* --- Reset CSS... */
/* --- Basic Typography... */
/* --- Common Container... */

/* --- Common Utility */

.hidden {
   display: none;
}
```

## Giả lập dữ liệu truy vấn từ database

```c:express-blog/data.js
/* Main... */

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
   Article - Edit
*/

var contentMarkdown = `
> "There is no one who wants pain itself, who seeks after it and 
> wants to have it, simply because they have been holding it along..."

## What is Lorem Ipsum?

Lorem Ipsum is simply dummy text of the printing and typesetting 
industry. Lorem Ipsum has been the industry's standard dummy text 
ever since the 1500s, when an unknown printer took a galley of type 
and scrambled it to make a type specimen book. It has survived not 
only five centuries, but also the leap into electronic typesetting, 
remaining essentially unchanged. It was popularised in the 1960s 
with the release of Letraset sheets containing Lorem Ipsum passages, 
and more recently with desktop publishing software like Aldus PageMaker 
including versions of Lorem Ipsum -
[https://www.lipsum.com/](https://www.lipsum.com/)
`; // contentMarkdown

var theArticle = new Article()
   .set("@id", "1001")
   .set("title", "Bài Viết Thứ 1001")
   .set("keywords", "lập trình web, hướng dẫn cơ bản")
   .set("content", contentHTML);

data.set("article", theArticle);
data.set("endpoint", "/article/edit");

module.exports = data;
```

Chạy `test` để kiểm tra kết quả hiển thị và thông tin truyền về `server` khi gửi `<form>`.

```javascript:express-blog/test.js
/* ... */

app.get("*", async (request, response) => {
   response.render("index.ejs", {
      layout: "article",
      action: "edit",
      data  : require("./data")
   });
}); // app.get

app.post("*", (request, response) => {
   response.json(request.body);
})

app.listen(8080, (_) => console.log("Server started"));
```

```cpp:CMD|Terminal.io
npm test

Server started
```

![](https://images.viblo.asia/d54cd95a-ea0d-4e56-89f1-502d800ba316.png)

Và khi nhấn nút `Đăng bài` để gửi thông tin trong `<form>` về `server`.

![](https://images.viblo.asia/ddea3274-bc2c-45f8-9101-4b4ae756f411.png)

## Kết thúc bài viết

Như vậy là chúng ta đã có code `template` đơn giản cho nhóm các trang đơn hiển thị giao diện làm việc với nội dung của bài viết. Bây giờ hãy cùng quay trở lại Sub-Series ExpressJS và viết code điều hành cho nhóm `route` tương ứng.

[[ExpressJS] Bài 8 - Viết Code Điều Hành Blog Cá Nhân (Tiếp Theo)](https://viblo.asia/p/Eb85oAO8Z2G)

Sau khi thực hiện việc viết code điều hành cho nhóm `route` này, chúng ta sẽ tiếp tục xây dựng giao diện cho trang đăng nhập quản trị blog và bổ sung tính năng bảo mật bằng mật khẩu đơn giản.

[[EJS] Bài 9 - Viết Code Xây Dựng Giao Diện Blog (Kết Thúc)](https://viblo.asia/p/3Q75wAvDZWb)