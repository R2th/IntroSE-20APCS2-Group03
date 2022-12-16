Trong bài này, chúng ta sẽ bắt đầu viết code cho tuyến xử lý yêu cầu đầu tiên của nhóm `route/article` - đó là yêu cầu dạng `/artice/view/:id` được gửi tới `server` khi người dùng muốn xem trang đơn hiển thị nội dung đầy đủ của một bài viết.

## Tổng quan code xử lý route

Do ở bài viết trước chúng ta đã tái cấu trúc lại code xử lý của `route` đầu tiên là yêu cầu xem trang chủ của blog và di chuyển các chi tiết vào các `sub-procedure`; Ở đây chúng ta sẽ khởi đầu ngay với code sử dụng các `sub-procedure` để định hình tổng quan các tác vụ nhỏ cần xử lý.

```express-blog/route/article/action/view.js
/* requires... */

const router = express.Router();

router.get("/:id", async (request, response, next) => {
   var { id } = request.params;
   var data = new Data();

   try {
      await getDataForMeta(data, "article", "view", id);
      await getDataForTopnav(data);   
      await getDataForArticle(data, "view", id);
   }
   catch (error) {
      return oopsRouter(request, response, next);
   }

   response.render("index", {
      layout: "article",
      action: "view",
      data
   });
}); // router.get

module.exports = router;
```

Tham số `id` được tách lấy từ `request.params` và sử dụng làm tham số  truy vấn bản ghi `article` tương ứng trong `database`. Kết quả khi thực hiện các `sub-procedure` để truy vấn dữ liệu có thể sẽ tìm được bản ghi phù hợp hoặc không. Và trong trường hợp không tìm được bản ghi `article` phù hợp với yêu cầu vì bất kỳ lý do gì - bao gồm cả việc code `sub-procedure` chúng ta viết có logic hoạt động không tốt - sẽ cần phản hồi cho người dùng trang đơn thông báo lỗi.

Như vậy chúng ta sẽ cần chuyển hướng yêu cầu tới `router` xử lý yêu cầu ngoại lệ là `oopsRouter` - tên mặc định do Express Generator tạo ra là `error` nhưng mình đã đổi lại.

## get-data-for-meta

Đối với `sub-procedure` này chúng ta đã tạo ra các tham số tùy chọn bổ sung trong bài trước và bây giờ sẽ chỉ cần bổ sung thêm trường hợp xử lý rẽ nhánh cho khối code điều kiện chính. Sau đó tạo thêm một `procedure` nội bộ trong module này để truy vấn thông tin `title` từ bản ghi trong `database`.

```route/sub-procedure/get-data-for-meta.js
/* requires... */

module.exports = async (
   out_data = new Data(),
   in_layout = "home",  /* home | category | article | admin | oops */
   in_action = "view",  /* view | add | edit | login */
   in_id = "Infinity"
) => {
   if (in_layout == "home")
      getMetaForHome(out_data);
   else if (["article", "oops"].includes(in_layout))
      await getMetaForArticle(out_data, in_action, in_id);
   else
      throw new Error("Unsupported layout");
};

/* ... */

const getMetaForArticle = async (
   out_data = new Data(),
   in_action = "view",  /* view | add | edit */
   in_id = "Infinity"
) => {
   var maybeUnpublished = new Article();
   await databaseManager.execute(
      Article.name, "select-by-id",
      in_id, maybeUnpublished
   );

   if (["view", "add", "edit"].includes(in_action))
      out_data.set("title", maybeUnpublished.get("title"));
   else
      throw new Error("Unsupported action type");
};
```

Như đã nói trước đó thì mình có sử dụng một `convention` riêng cho blog của mình đó là các bản ghi có `id` là `Infinity` sẽ được sử dụng làm nội dung cho trang thông báo ngoại lệ không tìm thấy bài viết. Do đó trong trường hợp `layout` được truyền vào là `oops` thì mình cũng cho xử lý giống với logic của `article`.

## get-data-for-topnav

Do thiết kế thanh điều hướng đơn giản không có trạng thái thay đổi tùy theo trang đơn hiển thị nên ở đây mình không bổ sung thêm code xử lý gì cả. Nếu như bạn muốn hiển thị liên kết của `category` tương ứng với hiệu ứng đặc biệt thì sẽ càn truyền vào tham số bổ sung để truy vấn bản ghi `article` rồi sau đó tìm tới bản ghi `category` tương ứng.

## get-data-for-article

Đây là `sub-procedure` mới được tạo ra để dành riêng cho tác vụ truy vấn dữ liệu cho thành phần `#article` trong cấu trúc các trang đơn hiển thị nội dung đầy đủ của một bài viết. Ở đây chúng ta sẽ có các trường hợp là khi tham số `action` được truyền vào có giá trị `view|add|edit`. Ở đây chúng ta sẽ bổ sung dần dần code hỗ trợ cho các `action`, mở đầu sẽ chỉ có `view.

```route/sub-procedure/get-data-for-article.js
/* requires... */

module.exports = async (
   out_data = new Data(),
   in_action = "view",  /* view | add | edit */
   in_id = "Infinity"
) => {
   if (in_action == "view")
      await getArticle(out_data, in_id);
   else
      throw new Error("Unsupported action type");
};

/* ... */
```

Và sau đó viết code chi tiết cho hai `procedure` nội bộ `getArticle`.

```route/sub-procedure/get-data-for-article.js
/* requires... */
const marked = require("marked");

/* module.exports... */

const getArticle = async (
   out_data = new Data(),
   in_id = "Infinity"
) => {
   var selected = new Article();
   await databaseManager.execute(
      Article.name, "select-by-id",
      in_id, selected
   );

   var contentMarkdown = selected.get("content");
   var contentHTML = marked.parse(contentMarkdown);
   selected.set("content", contentHTML);
   
   out_data.set("article", selected);
};
```

Ở đây lưu ý duy nhất là chúng ta đang lưu trữ nội dung của bài viết ở dạng mã `markdown` nên sẽ cần sử dụng thư viện `marked` để chuyển đổi thành code HTML trước khi sử dụng làm nội dung để chèn vào `template`.

## Code xử lý trang đơn thông báo lỗi

```express-blog/route/oops.js
/* requires... */

const router = express.Router();

router.get("*", async (request, response, next) => {
   var data = new Data();

   try {
      await getDataForMeta(data, "oops", "view", "Infinity");
      await getDataForTopnav(data);   
      await getDataForArticle(data, "view", "Infinity");
   }
   catch (error) {
      console.error(error);
   }

   response.status(404).render("index", {
      layout: "oops",
      action: "view",
      data
   });
}); // router.get

module.exports = router;
```

## Chạy test kiểm tra hoạt động của code

```CMD|Terminal.io
npm start

Server started
```

[http://localhost:8080/article/view/0000](http://localhost:8080/article/view/0000)
![](https://images.viblo.asia/8c8f1977-c37d-4c6f-ab69-2a7cc6c71ff7.png)

[http://localhost:8080/article/view/1234](http://localhost:8080/article/view/1234)
![](https://images.viblo.asia/fbc5fe95-c1d0-444f-be64-31b98aac4ce4.png)

## Kết thúc bài viết

Như vậy là chúng ta đã viết xong code xử lý cho tuyến đầu tiên của nhóm `route/article` tương ứng với thao tác `view`. Trong bài viết tiếp theo, chúng ta sẽ thực hiện code cho thao tác `add` yêu cầu xem giao diện soạn thảo bài viết mới.

[[ExpressJS] Bài 10 - Viết Code Điều Hành Blog Cá Nhân (Tiếp Theo)](https://viblo.asia/p/XL6lAV6m5ek)