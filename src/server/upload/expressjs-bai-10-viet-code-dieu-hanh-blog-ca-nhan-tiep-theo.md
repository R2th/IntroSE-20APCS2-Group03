Trước khi bắt tay vào viết code xử lý chi tiết cho tuyến `/article/add` chúng ta hãy dành một chút thời gian để nhìn lại code `tempate` của giao diện soạn thảo bài viết mới đã xây dựng trong Sub-Series EJS.

```express-blog/view/component/article/add.js
<form id="article" action="<%= data.get("endpoint") %>" method="post">
   <div class="container">
      <input type="text" name="title" value="Bài Viết Mới" />
      
      <input type="text" name="keywords" placeholder="Từ khóa liên quan..." />
      
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

Như vậy là code điều hành của `route` này sẽ cần cung cấp cho `template` dữ liệu là danh sách đầy đủ các danh mục tại khóa `category-list` và đường dẫn tại khóa `endpoint` để trỏ tới `router` xử lý yêu cầu lưu bản ghi mới vào `database`.

## Bổ sung router

Trước hết chúng ta cần khai báo thêm `router` mới tại `index` của nhóm `route/article`.

```route/article/index.js
var express = require('express');
var router = express.Router();

router.use("/view", require("./action/view"));
router.use("/add", require("./action/add"));

module.exports = router;
```

## Tổng quan xử lý route

```route/article/action/add.js
router.get("/", async (request, response, next) => {
   var data = new Data();

   await getDataForTopnav(data);
   await getDataForArticle(data, "add");
   data.set("endpoint", "/article/add");

   response.render("index", {
      layout: "article",
      action: "add",
      data
   });
}); // router.get
```

Đường dẫn `endpoint` ở đây mình đặt là `/article/add` để trỏ lại chính xác `router` này. Và như vậy khi soạn thảo xong bài viết và nhấn nút "Đăng bài" thì chúng ta sẽ có một yêu cầu `post` được tiếp nhận như sau:

```route/article/action/add.js
router.get("/", async (request, response, next) => {
   // --- yêu cầu xem giao diện soạn thảo bài viết mới
});

router.post("/", async (request, response, next) => {
   // --- yêu cầu lưu bài viết mới vào database
});
```

## get-data-for-article

Trong code xử lý của `sub-procedure` truy vấn dữ liệu cho khu vực `#article`, chúng ta tiếp tục bổ sung logic rẽ nhánh cho `action == "add"`.

```route/sub-procedure/get-data-for-article.js
module.exports = async (
   in_data = new Data(),
   in_action = "view",  /* view | add | edit */
   in_id = "Infinity"
) => {
   if (in_action == "view")
      await getArticle(in_data, in_id);
   else if (in_action == "add")
      await getCategoryList(in_data);
   else
      throw new Error("Unsupported action type");
};

/* getArticle... */

const getCategoryList = async (
   out_data = new Data()
) => {
   var categoryList = [];
   await databaseManager.execute(
      Category.name, "select",
      categoryList, Infinity, "default"
   );

   out_data.set("category-list", categoryList);
};
```

## Chạy test kiểm tra

```CMD|Terminal.io
npm test

Server started
```

[http://localhost:8080/article/add](http://localhost:8080/article/add)
![](https://images.viblo.asia/905b0a98-8d89-4e96-8e70-90c3a57de5b6.png)

## Truy xuất dữ liệu gửi từ form

Để tách lấy dữ liệu gửi từ `<form>` nhập liệu về `server` ở dạng `object`, chúng ta có thể nhờ đến sự trợ giúp của hai `middleware` tiền xử lý do ExpressJS cung cấp mặc định là `express.json()` và `express.urlencoded()`. Các `middleware` này cần được gắn trước các `router` xử lý `form` vì vậy nên chúng ta sẽ gắn luôn tại `app.js` để sử dụng chung cho tất cả các tuyến xử lý.

```express-blog/app.js
   /* --- Utility Middlewares */

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(pathToPublicFolder));

   /* --- Adding Routers... */
```

Và bây giờ chúng ta đã có thể truy xuất các cặp `name/value` do các `<form>` gửi về qua `request.body`.

```route/article/action/add.js
   /* --- Receive Submitted */

router.post("/", async (request, response, next) => {
   console.log(request.body);
});
```

Và bây giờ chúng ta sẽ thử soạn thảo một bài viết mới rồi nhấn "Đăng bài" để xem thông tin nhận được trong `request.body` hiển thị trong `console`.

```CMD|Terminal.io
npm test

Server started
```

[http://localhost:8080/article/add](http://localhost:8080/article/add)
![](https://images.viblo.asia/6c75e7a5-6c64-4b74-b35e-b7ce965b9fc2.png)

Nhấn nút "Đăng bài":

![](https://images.viblo.asia/578ec77c-3920-4d60-a3b4-38314619d3ae.png)

## Tổng quan xử lý yêu cầu post

Công việc mà chúng ta cần thực hiện ở đây là tạo ra một `object` mô tả bản ghi mới `Article` chưa có `@id` vì chưa được lưu vào `database`. Sau đó yêu cầu `databaseManager` ghi dữ liệu vào thư mục `data`. Nếu cần thiết bạn có thể lưu thêm thông tin về thời gian vào khóa `edited-datetime` của `class Article`. Ở đây mình sẽ chỉ lưu những thông tin vừa nhận được và không thêm thao tác truy vấn thời gian của hệ thống.

Sau khi đã thực hiện lưu trữ xong dữ liệu của bài viết mới, chúng ta sẽ có trị số `@id` đại diện cho bản ghi mới và có thể điều hướng tới trang hiển thị nội dung bài viết `/article/view/:id` bằng phương thức `response.redirect(path)`.

```route/article/action/add.js
/* router.get()... */

router.post("/", async (request, response, next) => {
   var entries = Object.entries(request.body);
   var submitted = new Article(entries);
   
   var inserted = new Article();
   await databaseManager.execute(
      Article.name, "insert",
      submitted, inserted
   );

   response.redirect(`/article/view/${inserted.get("@id")}`);
}); // router.post

module.exports = router;
```

```CMD|Terminal.io
npm start

Server started
```

![](https://images.viblo.asia/6e7310e1-99b7-426b-ac78-9e1eece7d19c.png)

## Kết thúc bài viết

Như vậy là chúng ta đã thực hiện xong code xử lý yêu cầu cho tuyến `/article/add` bao gồm yêu cầu xem giao diện soạn thảo bài viết mới và yêu cầu lưu trữ bài viết mới vào `database`. Phương thức xử lý cho tuyến `/article/edit/:id` để chỉnh sửa nội dung của một bài viết cũng không có gì khác nhiều do đó chúng ta sẽ không thảo luận code chi tiết ở đây. Việc cần làm chỉ là truy vấn dữ liệu của bài viết đã có bằng tham số `id` và nạp vào `<form>` gửi cho trình duyệt web.

Tuyến `article/delete/:id` thì chỉ là một tính năng phụ của `edit` và có thể được bổ sung bằng một liên kết hoặc một nút nhấn trong `<form>` chỉnh sửa bài viết. Sau khi thực hiện xóa bài viết, bạn có thể chuyển hướng người dùng tới trang chủ hoặc trang đơn danh mục.

Trong những bài viết tiếp theo, chúng ta sẽ xây dựng nốt giao diện đăng nhập và quản trị đơn giản.

[[EJS] Bài 9 - Viết Code Xây Dựng Giao Diện Blog (Kết Thúc)](https://viblo.asia/p/3Q75wAvDZWb)

Sau đó viết code điều hành để bổ sung tính năng bảo mật đơn giản này cho blog và đăng tải lên [Glitch.com](https://glitch.com/).

[[ExpressJS] Bài 11 - Viết Code Điều Hành Blog Cá Nhân (Tiếp Theo)](https://viblo.asia/p/eW65GrpYlDO)