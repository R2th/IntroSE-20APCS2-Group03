Trong bài này, chúng ta sẽ bắt đầu viết code điều hành cho nhóm `route/article`. Tuy nhiên trước khi bắt tay vào viết code xử lý cho các `route` mới, chúng ta hãy cùng nhìn lại code xử lý yêu cầu xem trang chủ đã được xử lý trong bài trước.

```express-blog/route/home.js
router.get("/", async (request, response) => {
   var data = new Data();
   
   /* --- Data for Meta */

   var logoText = config.get("logo-text");
   data.set("title", `${logoText} | Trang Chủ`);

   /* --- Data for Topnav */

   data.set("logo-text", logoText);
   
   var categoryList = [];
   await databaseManager.execute(
      Category.name, "select",
      categoryList, Infinity, "default", ["@id", "name"]
   );

   for (var category of categoryList) {
      var id = category.get("@id");
      category.set("url", `/category/view/${id}`);
   }

   data.set("category-list", categoryList.slice(0, -1));

   /* --- Data for Header */

   data.set("heading", config.get("site-heading"))
       .set("description", config.get("site-description"));

   /* --- Data for Entry */

   var articleList = [];
   await databaseManager.execute(
      Article.name, "select",
      articleList, 10, "reversed", ["@id", "title", "content"]
   );
   
   var enryList = [];
   for (var article of articleList.slice(1)) {
      var contentMarkdown = article.get("content");
      var excerptMarkdown = contentMarkdown.slice(0, 300);

      var entry = new Entry();
      entry.set("title", article.get("title"))
           .set("excerpt", `${excerptMarkdown}...`)
           .set("url", `/article/view/${article.get("@id")}`);
           
      enryList.push(entry);
   }

   data.set("entry-list", enryList);

   /* --- Render the Page */

   response.render("index", {
      layout: "home",
      action: null,
      data
   });
}); // router.get
```

Tất cả nội dung công việc mà chúng ta đã xử lý trong đoạn code này chỉ là truy vấn dữ liệu từ `database`, và `map`  (chuyển đổi) sang kiểu dữ liệu phù hợp để cung cấp cho các thành phần trong giao diện trang chủ.

Code điều hành của các `route` khác về cơ bản sẽ không có gì khác biệt nhiều đối với dạng yêu cầu xem nội dung của một trang đơn nào đó, bất kể đó là trang danh mục hay trang bài viết... Như vậy các tác vụ truy vấn dữ liệu cho mỗi thành phần trong giao diện cần trình bày sẽ có khả năng lặp lại rất cao; Mặc dù quá trình chuyển đổi từ dữ liệu truy vấn được sang kiểu dữ liệu phù hợp cho `view` có thể sẽ khác ở mỗi `route`.

Sẽ thật thuận tiện nếu như chúng ta phân tách các tác vụ nhỏ này thành các `sub-procedure` để sử dụng chung cho các `route`; Và đồng thời cung cấp các tham số tùy chọn để điều chỉnh phương thức hoạt động của mỗi `sub-procedure` này để phù hợp với từng `route` cụ thể. Như vậy chúng ta sẽ có thể tập trung code xử lý cho các `route` ở cùng một nơi, và có thể so sánh phương thức hoạt động ở các `route` dễ dàng hơn khi cần thực hiện bất kỳ thao tác điều chỉnh nào.

## Cấu trúc lại code với các sub-procedure

```structure.txt
[express-blog]
.  |
.  +-----[route]
.           |
.           +-----home.js
.           +-----[sub-procedure]
.                    |
.                    +-----get-data-for-meta.js
.                    +-----get-data-for-topnav.js
.                    +-----get-data-for-header.js
.                    +-----get-data-for-entry.js
```

Và đây là kết quả mà chúng ta hướng đến sau khi cấu trúc lại code.

```express-blog/route/home.js
const express = require("express");
const Data = require("../view/type/Data");
const getDataForMeta = require("./sub-procedure/get-data-for-meta");
const getDataForTopnav = require("./sub-procedure/get-data-for-topnav");
const getDataForHeader = require("./sub-procedure/get-data-for-header");
const getDataForEntry = require("./sub-procedure/get-data-for-entry");

const router = express.Router();

router.get("/", async (request, response) => {
   var data = new Data();
   
   await getDataForMeta(data, "home");
   await getDataForTopnav(data);
   await getDataForHeader(data, "home");
   await getDataForEntry(data, "home");

   response.render("index", {
      layout: "home",
      action: null,
      data
   });
}); // router.get

module.exports = router;
```

Ở đây các thao tác `getDataForComponent` sẽ lần lượt thực hiện truy vấn và chuyển đổi kiểu dữ liệu để cung cấp cho các thành phần giao diện và thêm vào `map Data`.

Ngoại trừ thanh điều hướng `topnav`, tất cả các thành phần khác khi xuất hiện trong các `layout` khác nhau và với tham số `action` khác nhau sẽ cần thực hiện thao tác truy vấn và chuyển đổi dữ liệu với logic khác nhau. Do đó chúng ta sẽ cần cung cấp các tham số tùy chọn là `layout` và `action` trong phần định nghĩa của các `sub-procedure` để code sử dụng ở các `route` có thể điều chỉnh phương thức hoạt động của các `sub-procedure`.

## get-data-for-meta

```express-blog/route/sub-procedure/get-data-for-meta.js
const Data = require("../../view/type/Data");
const config = require("../../config");

module.exports = async (
   out_data = new Data(),
   in_layout = "home" /* home | category | article | admin | oops */
) => {
   if (in_layout == "home")
      getMetaForHome(out_data);
   else
      throw new Error("Unsupported layout");
}; // module.exports

const getMetaForHome = (
   out_data = new Data()
) => {
   var logoText = config.get("logo-text");
   out_data.set("title", `${logoText} | Trang Chủ`);
};
```

Đối với phần nội dung trong thẻ `<head>` thì hiện tại chúng ta chỉ có `<title>` thay đổi theo các trang đơn và bạn có thể bổ sung tham số `action` nếu cảm thấy cần thiết. Tạm thời thì chúng ta có thể xuất phát với khối `module.exports` đang hỗ trợ duy nhất `layout: "home"` như ở trên. Những `layout` khác sẽ được hỗ trợ bổ sung thêm khi chúng ta thực hiện tới.

## get-data-for-topnav

```express-blog/route/sub-procedure/get-data-for-topnav.js
const databaseManager = require("../../database/manager");
const config = require("../../config");
const Category = require("../../database/type/Category");
const Data = require("../../view/type/Data");

module.exports = async (
   out_data = new Data()
) => {
   var logoText = config.get("logo-text");
   out_data.set("logo-text", logoText);
   
   var categoryList = [];
   await databaseManager.execute(
      Category.name, "select",
      categoryList, Infinity, "default", ["@id", "name"]
   );

   for (var category of categoryList) {
      var id = category.get("@id");
      category.set("url", `/category/view/${id}`);
   }

   out_data.set("category-list", categoryList.slice(0, -1));
}; // module.exports
```

Riêng đối với thành phần `topnav` thì mình sử dụng thiết kế đơn giản và vì vậy không cần bổ sung thêm tham số tùy chọn nào cả. Trong trường hợp muốn xác định trang đơn đang hiển thị thuộc danh mục nào để tạo hiệu ứng hiển thị cho liên kết tương ứng thì chúng ta sẽ cần thêm cả hai tham số hỗ trợ `layout` và `action`.

## get-data-for-header

```express-blog/route/sub-procedure/get-data-for-header.js
const Data = require("../../view/type/Data");
const config = require("../../config");

module.exports = async (
   out_data = new Data(),
   in_layout = "home", /* home | category | oops */
   in_categoryId = "Infinity"
) => {
   if (in_layout == "home")
      await getHeaderForHome(out_data);
   else
      throw new Error("Unsupported layout");
}; // module.exports

const getHeaderForHome = async (
   out_data = new Data()
) => {
   out_data
      .set("heading", config.get("site-heading"))
      .set("description", config.get("site-description"));
}; // getHeaderForHome
```

Khối `header` được sử dụng lại cho các `layout` là trang chủ `home` và các trang đơn danh mục `category`. Trong trường hợp là một trang đơn hiển thị danh mục, chúng ta cần xác định thông tin về danh mục đó để hiển thị, và vì vậy sẽ cần cung cấp thêm tham số `categoryId`.

## get-data-for-entry

```express-blog/route/sub-procedure/get-data-for-entry.js
const databaseManager = require("../../database/manager");
const Article = require("../../database/type/Article");
const Data = require("../../view/type/Data");
const Entry = require("../../view/type/Entry");

module.exports = async (
   out_data = new Data(),
   in_layout = "home" /* home | category | admin */
) => {
   if (in_layout == "home")
      await getEntryListForHome(out_data);
   else
      throw new Error("Unsupported Layout");
}; // module.exports

const getEntryListForHome = async (
   out_data = new Data()
) => {
   var entryList = [];

   var articleList = [];
   await databaseManager.execute(
      Article.name, "select",
      articleList, 10, "reversed", ["@id", "title", "content"]
   );
   
   for (var article of articleList.slice(1)) {
      var entry = new Entry()
         .set("title", article.get("title"))
         .set("excerpt", article.get("content"))
         .set("url", `/article/view/${article.get("@id")}`);

      entryList.push(entry);
   } // for .. of

   out_data.set("entry-list", entryList);
}; // getEntryListForHome
```

Khối `entry` được hiển thị các trích đoạn ngắn và liên kết tới các bài viết tương ứng được sử dụng cho trang chủ `home`, các trang đơn danh mục `category`, và trong trường hợp hiển thị trong một trang quản trị `admin` thì các liên kết sẽ được sử dụng để trỏ tới `/article/edit/:id` để mở giao diện chỉnh sửa bài viết.

## Kết thúc bài viết

Như vậy là chúng ta đã thực hiện xong việc tái cấu trúc lại code xử lý cho `route` cơ bản đầu tiên và chuẩn bị cho khối `route/article`. Trong bài viết tiếp theo, chúng ta sẽ viết code cho `route` đầu tiên của khối này để xử lý yêu cầu xem nội dung của một bài viết.

[[ExpressJS] Bài 9 - Viết Code Điều Hành Blog Cá Nhân (Tiếp Theo)](https://viblo.asia/p/YWOZrA3YKQ0)