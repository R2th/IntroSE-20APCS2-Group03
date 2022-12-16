Trong bài viết này chúng ta sẽ viết code xử lý chi tiết cho yêu cầu gửi từ trình duyệt web tới `endpoint` là trang chủ của blog. Trước khi bắt đầu thì mình sẽ giả định là bạn đã xem hết những bài viết mới nhất của Sub-Series Database và Sub-Series EJS. 

Như vậy thì ở thời điểm hiện tại chúng ta đã có một code quản lý `database` cơ bản và đã có khả năng viết code để mở rộng thêm tính năng nếu cần thiết. Ví dụ như thêm `procedure` truy vấn dữ liệu theo tiêu chí nào đó. Và đồng thời chúng ta cũng đã có code `template` cho trang chủ chờ nạp dữ liệu và `render` phản hồi yêu cầu.

## Tổng quan phần mềm express-blog

Lúc này khi nhìn lại thư mục `express-blog` và tổng quan của phần mềm `server` mà chúng ta đang có. Công việc xử lý của khối `route` về cơ bản là tiếp nhận yêu cầu từ giao diện do khối `view` tạo ra; Sau đó truy vấn dữ liệu từ khối `database` và kiểm tra kết quả truy vấn dữ liệu để ra quyết định yêu cầu khối `view` tạo ra giao diện mới phù hợp.

![](https://images.viblo.asia/578b2407-4bd8-4daf-a93b-3de53915f8de.png)

Khi thiết kế và viết code khối `database` và `view`, chúng ta đã xây dựng hai khối này với hình thức đóng gói, không phụ thuộc lẫn nhau, và cũng không phụ thuộc vào code sử dụng bên ngoài. Mỗi khối này sẽ chỉ đơn giản là thực hiện công việc của mình và cung cấp ra bên ngoài các tham số cho phép tùy chỉnh hoạt động khi sử dụng.

Công việc của khối `route` về cơ bản là điều hành `control` hoạt động của hai khối `database` và `view`; Và điều hành logic hoạt động chính của phần mềm `server`. 

Chúng ta sẽ gặp lại thiết kế tổng quan với các khối xử lý như thế này trong rất nhiều trường hợp khác. Có thể mỗi khối này sẽ được gọi với những cái tên khác. Tuy nhiên về bản chất thì vẫn sẽ là một khối xử lý dữ liệu, một khối xử lý logic hiển thị, và một khối điều hành logic hoạt động của chương trình chính.

Và bây giờ chúng ta sẽ viết code cho `route` xử lý đầu tiên với nội dung điều hành khi nhận được yêu cầu xem trang chủ là:

- Truy vấn dữ liệu từ `database` cho các thành phần `meta`, `topnav`, `header`, `entry`.
- Yêu cầu `view` tạo ra giao diện trang chủ từ `layout` có tên là `home` và dữ liệu vừa truy vấn được.

## Truy vấn dữ liệu cho head

Phần tiêu đề giữa cặp thẻ `<title>` trong phần `<head>` thường sẽ hiển thị tiêu đề bài viết hoặc tiêu đề danh mục. Tuy nhiên ở trang chủ thì thường sẽ là tên của blog hoặc website đó, và những thông tin mang tính chất biểu trưng đặc biệt như thế này thường được lưu riêng ở một tệp nào đó khác chứ không phải là một bản ghi trong `database`. 

Ở đây chúng ta sẽ tạo ra một tệp `config.js` ở cấp thư mục đầu tiên của `project`.

```express-blog/config.js
const config = new Map()
   .set("logo-text", "Your Name");

module.exports = config;
```

Mình chọn sử dụng tên hiển thị ở vị trí `logo` trong thanh điều hướng đồng thời làm tên hiển thị trên thanh tiêu đề `tab` của trình duyệt web. Bạn có thể sử dụng một nội dung khác nếu muốn.

```express-blog/route/home.js
const express = require("express");
const config = require("../config");

const router = express.Router();
router.get("/", async (request, response) => {
   var data = new Data();
   
   /* --- Data for Meta */

   var logoText = config.get("logo-text");
   data.set("title", `${logoText} | Trang Chủ`);

   /* --- Render the Page */

   response.render("index", {
      layout: "home",
      action: null,
      data
   });
}); // router

module.exports = router;
```

```CMD|Terminal.io
npm start

Server Started
```

![](https://images.viblo.asia/e988f8a9-c4c9-4af0-ac69-8993127b9a76.png)

## Truy vấn dữ liệu cho topnav

Dữ liệu cần cung cấp cho thanh điều hướng bao gồm tên `logo` chúng ta đã có ở phần trên và thông tin về các danh mục bao gồm tên hiển thị `name` và đường dẫn liên kết `url`. Như trong phần mở đầu code `database` thì mình có nói về `convention` riêng đó là mình sử dụng một bản ghi `Category` đặc biệt là `id-Infinity` để làm nội dung cho trang thông báo lỗi. Do đó trong code truy vấn mình sẽ bỏ đi bản ghi này và hiển thị tất cả các danh mục còn lại. Bao gồm cả danh mục Giới Thiệu.

```express/route/home.js
const express = require("express");
const config = require("../config");
const Data = require("../view/type/Data");
const databaseManager = require("../database/manager");
const Category = require("../database/type/Category");

const router = express.Router();
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
   
   /* --- Render the Page */

   response.render("index", {
      layout: "home",
      action: null,
      data
   });
}); // router

module.exports = router;
```

```CMD|Terminal.io
npm start

Server Started
```

![](https://images.viblo.asia/4e156c1c-4106-4131-bd8d-655cfb64f1c0.png)

Thủ tục `select` tổ hợp đối với nhóm `Category` thì chúng ta chưa thực hiện trong Sub-Series Database. Tuy nhiên về khả năng tự viết code bổ sung thủ tục này thì mình tin chắc chắn là bạn đã hoàn toàn có thể làm tốt hơn mình ở thời điểm hiện tại. Về logic xử lý thì thủ tục `select` này đơn giản hơn một chút so với `select-by-category-id` của nhóm `Article`.

Trong code xử lý kết quả truy vấn sau đó thì chỉ có một điểm duy nhất mà chúng ta cần lưu ý. Trên thực tế thì chúng ta có hai `class Category` - một của `database/type` và một của `view/type`. Sau khi truy vấn dữ liệu từ `database` thì chúng ta có một mảng các object thuộc `class Category` của `database/type`. Và công việc cần làm là tạo ra một mảng object thuộc `class` tương ứng của `view/type` và đặt vào những dữ liệu cần thiết là tên danh mục `name` và đường dẫn `url` phù hợp với logic thiết kế của khối `route`.

Tuy nhiên JavaScript không mặc định tạo ra ràng buộc rằng chúng ta không được bổ sung các khóa mới vào một `class` kế thừa `Map` trừ khi chúng ta tạo ra một kiểu ràng buộc như vậy. Và vì vậy nên mình đã làm tắt bước này bằng cách bổ sung `url` vào các object thuộc class `database/type/Category` đang có và sử dụng luôn làm dữ liệu truyền vào code `template` của `view`. Trường hợp này có thể được hiểu như một phép chuyển đổi kiểu dữ liệu ngầm định, và chúng ta cần hiểu rằng mình đang làm tắt ở đâu và vì sao lại có thể được làm như vậy.

Về việc tạo ra dạng đường dẫn phù hợp với logic thiết kế khối `route` thì chính là công việc cần được thực hiện ở bên trong khối này. Chúng ta đã không mang tác vụ này vào khối `view` để đảm bảo thiết kế độc lập của `view`. Khi người dùng nhấn vào tên một danh mục trên thanh điều hướng, chúng ta sẽ biên dịch thành yêu cầu muốn xem `view` trang đơn biểu thị danh mục `category` đó: `/category/view/:id`. Và như vậy là chúng ta đã có thanh điều hướng hoạt động với dữ liệu cung cấp từ `database`. Bây giờ bạn có thể bổ sung vào `database` một vài bản ghi trong thư mục `data/Category` để hiển thị thêm liên kết trên thanh điều hướng.

## Truy vấn dữ liệu cho header

Nội dung trong phần `header` ở trang chủ cũng thường sẽ mang tính chất giới thiệu ngắn về website và không được lưu trữ thành bản ghi trong `database`. Ở đây chúng ta sẽ lưu thêm vào tệp `config.js` hai khóa `site-heading` và `site-description`.

```express-blog/config.js
var config = new Map()
   .set("logo-text", "Semi Art")
   .set("site-heading", "Blog Lập Trình")
   .set("site-description", "Blog cá nhân chia sẻ kiết thức lập trình cho người mới.");

module.exports = config;
```

```express/route/home.js
/* requires... */

const router = express.Router();
router.get("/", async (request, response) => {
   var data = new Data();

   /* --- Data for Meta... */
   /* --- Data for Topnav... */

   /* --- Data for Header */

   data.set("heading", config.get("site-heading"))
       .set("description", config.get("site-description"));

   /* --- Render the Page */

   response.render("index", {
      layout: "home",
      action: null,
      data
   });
}); // router

module.exports = router;
```

```CMD|Terminal.io
npm start

Server Started
```

![](https://images.viblo.asia/74937437-a358-4245-a119-43c5996e934d.png)

## Truy vấn dữ liệu cho entry

Thao tác này không khác nhiều so với truy vấn danh sách các danh mục cho `topnav`, tuy nhiên thì ở đây chúng ta sẽ phải viết chi tiết đoạn chuyển đổi dữ liệu từ các object thuộc `class Article` trong `database/type` sang các object thuộc `class Entry` trong `view/type`. Và trong code ví dụ dưới đây thì mình cũng tiếp tục thao tác bỏ bản ghi `id-Infinity` được mình sử dụng làm nội dung cho trang thông báo lỗi. Nếu bạn không sử dụng `convention` tương tự thì có thể sửa lại đoạn `slice(1)`.

```express-blog/route/home.js
/* requires... */
const Article = require("../database/type/Article");
const Entry = require("../view/type/Entry");

const router = express.Router();
router.get("/", async (request, response) => {
   var data = new Data();

   /* --- Data for Meta... */
   /* --- Data for Topnav... */
   /* --- Data for Header... */

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
}); // router

module.exports = router;
```

![](https://images.viblo.asia/f99aa459-8c4f-4e7b-a01e-aa3f0256fc88.png)

## Kết thúc bài viết

Như vậy là chúng ta đã viết xong code xử lý cho `route` đơn giản nhất khi người dùng yêu cầu xem trang chủ của blog.

Trên thực tế thì code xử lý phía trên nên được tách thành các `procedure` phụ để có thể sử dụng lại cho các `route` khác và dễ dàng viết `test` kiểm tra từng đoạn code xử lý dữ liệu. Tuy nhiên để duy trì mạch tư duy và nội dung bài viết dễ theo dõi nên mình đã bỏ qua bước phân tách thành các `procedure` hỗ trợ. Bạn có thể tái cấu trúc lại code nếu cảm thấy cần thiết.

Code `template` và `route` của yêu cầu xem các trang đơn danh mục không có gì khác nhiều nên chúng ta sẽ không thảo luận trong các bài tiếp theo. Mà thay vào đó thì chúng ta sẽ tiếp tục xây dựng `template` cho giao diện xem, thêm mới, và chỉnh sửa bài viết.

[[EJS] Bài 6 - Viết Code Xây Dựng Giao Diện Blog (Tiếp Theo)](https://viblo.asia/p/aWj53xnYK6m)

Sau khi xây dựng xong code `template` cho nhóm giao diện nói trên, chúng ta sẽ tiếp tục viết code xử lý `route` cho nhóm giao diện này.

[[ExpressJS] Bài 8 - Viết Code Điều Hành Blog Cá Nhân (Tiếp Theo)](https://viblo.asia/p/Eb85oAO8Z2G)