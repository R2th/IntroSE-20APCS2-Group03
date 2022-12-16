Trong bài này, chúng ta sẽ tiếp tục bổ sung giao diện đăng nhập quản trị đơn giản. 

## Tổng quan layout/admin

```view/layout/admin.ejs
<!doctype html>
<html>
<head>
   <%- include("../component/meta.ejs", { data }) %>
</head>
<body>
   <%- include("../component/topnav.ejs" , { data }) %>
   <%- include("../component/login.ejs" , { data }) %>
   
   <%- include("../component/script.ejs") %>
</body>
</html>
```

Chi tiết code `template` của `component/login`.

```view/component/login.ejs
<form id="login" action="/login" method="post">
   <div class="container">
      <span> Tài khoản </span>
      <input type="text" name="username" placeholder="abc.xyz@example.com" />

      <span> Mật khẩu </span>
      <input type="password" name="password" placeholder="abc123!@#$%^&*()" />
      
      <button type="submit"> Đăng nhập </button>
   </div><!-- .container -->
</form>
```

Ở đây mình quyết định thay đổi thiết kế của thanh điều hướng `topnav` một chút. Vị trí hiển thị thời gian sẽ được thay bằng một liên kết - `Viết Bài`.

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
   
   <a class="time" href="#">
      Viết Bài
   </a>
</nav><!-- #topnav -->
```

## Bổ sung code CSS

```public/css/style.css
@import "./component/base.css";
@import "./component/topnav.css";
@import "./component/header.css";
@import "./component/main.css";
@import "./component/article.css";
@import "./component/login.css";
```

```public/css/component/login.css
#login {
   display: block;
   padding: 90px 0;
}

#login .container {
   max-width: 450px;
   line-height: 1.618;
}

#login span {
   display: block;
   font-weight: bold;
}

#login input {
   border: none;
   border-bottom: 1px solid lightgray;

   display: block;
   width: 100%;
   padding: 3px 18px;
   margin: 3px 0 27px;
}

#login input::placeholder {
   color: lightgray;
}

#login button {
   background: whitesmoke;
   border: none;

   height: 42px;
   padding: 0 18px;

   cursor: pointer;
}

#login button:hover {
   color: white;
   background: black;
}
```

Chạy `test` để xem kết quả hiển thị tạm.

```express-blog/test.js
app.get("*", async (request, response) => {
   response.render("index.ejs", {
      layout: "admin",
      action: null,
      data  : require("./data")
   });
}); // app.get
```

![](https://images.viblo.asia/f6bfc8ce-7bb2-403d-8095-e4c3fc5e7b64.png)

## Cung cấp các tham số data

Đối với `<form>` đăng nhập thì chúng ta cần để code sử dụng bên ngoài có thể quy định `endpoint` để gửi thông tin về `server`.

```view/component/login.ejs
<form id="login" action="<%= data.get("endpoint") %>" method="post">
   <div class="container">
      <span> Tài khoản </span>
      <input type="text" name="username" placeholder="abc.xyz@example.com" />

      <span> Mật khẩu </span>
      <input type="password" name="password" placeholder="abc123!@#$%^&*()" />
      
      <button type="submit"> Đăng nhập </button>
   </div><!-- .container -->
</form>
```

Đối với liên kết `Viết bài` vừa bổ sung của thanh điều hướng `topnav`, đây là thành phần bổ sung dành riêng cho `topnav` và không có ý nghĩa toàn cục với tham số `data`. Do đó mình `prefix` các khóa dữ liệu với từ `topnav-` để tránh nhầm lẫn với các khóa dữ liệu sử dụng chung trong một trang đơn.

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
   
   <a class="writer" href="<%= data.get("topnav-endpoint") %>">
      <%= data.get("topnav-action") %>
   </a>
</nav><!-- #topnav -->
```

Như vậy code sử dụng `topnav` ở phía bên ngoài có thể tùy chỉnh hoạt động của liên kết này bằng cách cung cấp tên hiển thị và đường dẫn tương ứng.

```
data.set("topnav-action", "Viết Bài");
data.set("topnav-endpoint", "/article/add");
```

Bạn có thể chỉnh sửa lại code để thay các khóa `endpoint` trong các `<form>` đã xây dựng và `prefix` bằng tên của `layout`, `component`, hoặc `action` tương ứng nếu cảm thấy cần thiết. Tuy nhiên khi số lượng liên kết bổ sung kiểu như thế này xuất hiện nhiều thì chúng ta nên nghĩ tới việc tái cấu trúc lại code và tạo thêm một kiểu dữ liệu để biểu trưng cho `action` bao gồm tên hiển thị và đường dẫn gửi yêu cầu.

Tương tự thì ở giao diện `article/view` xem nội dung của bài viết thì bạn có thể bổ sung một liên kết hay một nút nhấn `Chỉnh sửa` và giả định trỏ về đường dẫn `/article/edit/:id`. Sau đó thay thế đường dẫn này bằng một tham số đầu vào với tên khóa ở dạng `article-endpoint` hay `edit-endpoint`.

## Kết thúc bài viết

Như vậy là chúng ta đã có được một `<form>` đơn giản để thực hiện chức năng đăng nhập quản trị blog. Về giao diện quản trị blog thì mình cảm thấy thực sự không cần thiết cho một blog đơn giản. 

Lý do là vì chúng ta đã có thể duyệt các bài viết ở giao diện dành cho người xem blog và bổ sung các liên kết để nhấn vào và yêu cầu chuyển sang giao diện thêm mới hoặc chỉnh sửa nội dung. 

Trong trường hợp chưa thực hiện đăng nhập quản trị thì thao tác như trên sẽ được code xử lý ở `server` chuyển hướng tới giao diện đăng nhập. Còn trong trường hợp đã thực hiện đăng nhập trước đó thì code xử lý ở `server` sẽ chuyển hướng tới giao diện thêm mới hoặc chỉnh sửa nội dung như yêu cầu.

Và như vậy là chúng ta đã hoàn thành Sub-Series EJS với code ví dụ xây dựng giao diện cho một blog cá nhân đơn giản. Mình hy vọng rằng ở thời điểm hiện tại, bạn đã có thể hoàn toàn tự tin cấu trúc nên giao diện blog mà bạn mong muốn.

[[ExpressJS] Bài 11 - Viết Code Điều Hành Blog Cá Nhân (Tiếp Theo)](https://viblo.asia/p/eW65GrpYlDO)