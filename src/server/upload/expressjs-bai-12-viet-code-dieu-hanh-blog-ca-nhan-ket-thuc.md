Trong bài viết này, chúng ta sẽ bổ sung thêm một tính năng nhỏ cho trang chủ để tự động tải thêm các đoạn giới thiệu bài viết `entry` cũ hơn - khi người xem cuộn qua `entry` cuối cùng đang có mặt trong trang.

## Gửi yêu cầu truy xuất thêm dữ liệu

Thao tác này chúng ta đã từng thực hiện trước đó trong [Sub-Series JavaScript](https://viblo.asia/p/jvElaR465kw) và đến bây giờ mới thực sự có tình huống để áp dụng. Cụ thể là chúng ta sẽ viết code JavaScript trong tệp `public/js/main.js` để thêm thao tác xử lý khi người dùng cuộn qua `entry` cuối cùng. Ở đây mình sẽ sử dụng thêm `jQuery` để đơn giản hóa một số thao tác, vì vậy nên cũng sẽ cần cập nhật thêm một chút ở khối `view`.

```view/component/script.ejs
<script src="https://www.unpkg.com/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="/js/main.js"></script>
```

Thao tác xử lý trong code JavaScript ở phía trình duyệt web `client-side` cũng rất đơn giản. Khi người xem blog thực hiện thao tác cuộn, chúng ta cần liên tục kiểm tra vị trí của cạnh dưới của khung hiển thị để xem đã cuộn qua `entry` cuối cùng hay chưa. 

Tại thời điểm người xem blog cuộn qua `entry` cuối cùng thì chúng ta gửi một yêu cầu tới `server` để có thêm một mảng các `object Article`; Sau đó tạo ra các khối `entry` mới và gắn tiếp vào khu vực hiển thị trong khối `#main`. 

Ở đây chúng ta lưu ý là khi truyền tải dữ liệu qua mạng thì sẽ không thể duy trì kiến trúc `Map` của các `object Article` mà sẽ phải chuyển về chuỗi JSON để truyền dữ liệu đi. Do đó khi nhận được, chúng ta sẽ sử dụng ở dạng `object` thông thường chứ không phải là `Map` và vì vậy nên thao tác lấy dữ liệu sẽ là `article["thuộc-tính"]` thay vì `article.get("thuộc-tính")`.

```public/js/main.js
   /* --- Dispatch an event when user finishes reading */

$(window).on("scroll", function(event) {
   window.bottomEdgePosition = window.scrollY + window.innerHeight;

   if (window.bottomEdgePosition != document.body.offsetHeight)
      { /* do nothing */; }
   else
      $("#main").trigger("user-finishes-reading");
}); // #main

   /* --- Load the previous articles from server */

$("#main").on("user-finishes-reading", function(event) {
   var url = "endpoint-xử-lý-yêu-cầu-truy-xuất-thêm-các-entry";
   jQuery.get(url, renderEntry);
}); // #main

   /* --- Render more .entry components */

const renderEntry = function(articleList = []) {
   console.log(articleList);   // for testing
   articleList.forEach(function(article) {
      var entryElement = jQuery(`
         <section class="entry">
            <h2> ${article["title"]} </h2>
            <p> ${article["content"].slice(0, 321)} </p>
            <a href="/article/view/${article["@id"]}"> Đọc tiếp </a>
         </section>
      `);

      $("#main .container").append(entryElement);
   }); // articleList.forEach
}; // renderEntry
```

Để kiểm tra trước hoạt động của code kích hoạt sự kiện người dùng đọc xong `entry` cuối cùng và hàm gắn các phần tử `.entry` mới vào trong `#main` thì bạn có thể giả lập dữ liệu truy vấn được bằng một mảng các `object` chứa các thuộc tính như mô tả trong code của hàm `renderEntry`.

## Thêm route xử lý yêu cầu

Ồ... đây là `route` xử lý đầu tiên trong phần mềm `server` mà chúng ta đang viết lại không phản hồi nội dung một trang HTML để trình duyệt web hiển thị. Thay vào đó thì `route` này lại trả về một chuỗi dữ liệu để sử dụng trong môi trường vận hành code JavaScript ở phía trình duyệt web `client-side`.

Như vậy là lần này chúng ta đang cần cung cấp một giao diện để sử dụng cho việc viết code lập trình - hay còn được gọi là API (Application Programming Interface) - chứ không phải là cung cấp một giao diện đồ họa trên nền trình duyệt web. Để tiện cho việc quản lý code và sử dụng thì chúng ta sẽ tạo ra một nhóm `route/api` cho những yêu cầu tương tự nếu cần bổ sung trong tương lai.

```structure.txt
[express-blog]
.  |
.  +-----[route]
.  |        |
.  |        +-----[api]
.  |                |
.  |                +-----[article]
.  |                +-----[category]
.  |                |
.  |                +-----index.js
.  |
.  +-----app.js
```

Nhóm `router` mới được khai báo trước `session-filter` bởi sử dụng `convention` riêng so với các nhóm `router` trước đó. Ở đây nếu như bạn muốn cung cấp thêm các thao tác chỉnh sửa, cập nhật, xóa bản ghi cho nhóm `route/api` thì có thể sử dụng một phương thức khác để thực hiện chức năng bảo mật đơn giản.

```express-blog/app.js
   /* --- Adding Routers */

app.use("/api", require("./route/api/index"));

app.use(require("./route/session-filter"));

app.use("/"        , require("./route/home"));
app.use("/article" , require("./route/article/index"));
app.use("/category", require("./route/category/index"));
app.use("/admin"   , require("./route/admin/index"));
app.use(require("./route/oops"));
```

```route/api/index.js
const express = require("express");
const router = express.Router();

router.use("/article", require("./article/index.js"));
// ---nhóm "/category" chưa cần bổ sung

module.exports = router;
```

Ở đây `route` đầu tiên của nhóm `api` mà chúng ta đang cần cung cấp cho code JavaScript ở phía trình duyệt web sử dụng là thao tác truy vấn thêm các bản ghi `article` trong `database`. Do đó nên mình sử dụng cách đặt tên nhóm router xử lý chi tiết trong `api/article` giống với các `procedure` trong khối `database`.

```structure.txt
[route]
.  |
.  +-----[api]
.          |
.          +-----[category]
.          +-----[article]
.          |        |
.          |        +-----[procedure]
.          |        |        |
.          |        |        +-----insert.js
.          |        |        +-----select.js
.          |        |        +-----update.js
.          |        |        +-----delete.js
.          |        |
.          |        +-----index.js
.          |
.          +-----index.js
```

```route/api/article/index.js
const express = require("express");
const router = express.Router();

router.use("/select", require("./procedure/select.js"));
// --- các route insert, update, delete chưa cần bổ sung

module.exports = router;
```

Khi code JavaScript ở phía `client-side` gửi yêu cầu tới `/api/article/select` thì chúng ta cần gửi trả lại một mảng chứa các bản ghi `article` mới nhất. Và ở đây chúng ta cũng cần cung cấp các tham số để code JS ở `client-side` không cần phải truy xuất toàn bộ tất cả 1001 bản ghi `article` đang có trong `database`.

```route/api/article/procedure/select.js
const express = require("express");
const router = express.Router();
const databaseManager = require("../../../../database/manager");
const Article = require("../../../../database/type/Article");

router.get("*", async (request, response) => {
   var { top, order, offset } = request.query;

   var selected = [];
   await databaseManager.execute(
      Article.name, "select",
      selected, Number(top), order, [...Article.fieldNames], Number(offset)
   );

   for (var i = 0; i < selected.length; i += 1) {
      var articleObject = Object.fromEntries(selected[i]);
      selected[i] = articleObject;
   }

   response.json(selected);
}); // router.get

module.exports = router;
```

Bên cạnh tham số `order` để chọn chiều duyệt các bản ghi khi truy vấn trong `database`, chúng ta có thể cung cấp tham số `top` để code JS `client-side` có thể tự giới hạn; Và sử dụng các tham số này cho thao tác truy vấn trong `database` mà chúng ta đã có trước đó.

Tuy nhiên giả sử trên trang chủ đang có 10 `entry` mới nhất và chúng ta cần truy vấn thêm 10 `entry` tiếp theo thì lúc này code JS `client-side` lại đang cần truy vấn 20 bản ghi mới nhất và bỏ đi 10 bản ghi đã được bày trên trang chủ. Lý do là vì khi viết code `database` mình đã không dự trù được và bỏ sót một tính năng hỗ trợ cho lệnh truy vấn `select`.

Các phần mềm quản lý Relational Database thường có thêm tùy chọn `offset` cho thao tác `select` để bỏ qua một số bản ghi đầu tiên trong tập kết quả. Và ở thời điểm này, để không ảnh hưởng đến code sử dụng module `database` ở các `route` khác đã viết xong, chúng ta có thể bổ sung tham số `in_offset` ở vị trí cuối cùng trong dãy tham số của `database/procedure/Article/select`.

```database/procedure/Article/select--async-throw.js
const ArticleView = require("../../view/Article");
const Article = require("../../type/Article");

module.exports = async (
   out_selected = [],
   in_top = Infinity,
   in_order = "default", /* default | reversed */
   in_partial = Article.fieldNames,
   // --- số bản ghi đầu tiên cần bỏ qua
   in_offset = 0
) => {
   try {
      /* --- Create view & Index data */
      var view = new ArticleView();
      await ArticleView.indexData(view, in_order, in_partial)

      var index = -1;
      /* --- Loop & Collect records */
      for await (var record of view) {
         index += 1;

         if (index < in_offset)
            continue /* check next reccord */;
         else
            if (out_selected.length == in_top)
               break /* out of the loop */;
            else
               out_selected.push(record);
      } // for .. of
   }
   catch (error) {
      throw error;
   }
}; // module.exports
```

## Tạo đường dẫn URL sử dụng API ở client-side

Bây giờ thì chúng ta đã có thể hoàn thiện code ở phía `client-side` ở đoạn thao tác gửi yêu cầu tới `server` để truy vấn thêm dữ liệu. Ở đây mình sử dụng `offset` là số lượng các khối `.entry` đã có mặt trên trang chủ trước khi gửi yêu cầu và cộng thêm một bản ghi `id-Infinity` mà mình đã sử dụng làm `convention` riêng cho trang thông báo lỗi không tìm thấy bài viết phù hợp.

```public/js/main.js
   /* --- Load the previous articles from server */

$("#main").on("user-finishes-reading", function(event) {
   var top = 10;
   var order = "reversed";
   var offset = $("#main .entry").length + 1;
   var url = `/api/article/select?top=${top}&order=${order}&offset=${offset}`;

   jQuery.get(url, renderEntry);
}); // #main
```

Và kiểm tra hoạt động của tính năng mới thôi. :D

```CMD|Terminal.io
npm start

Server started
```

![](https://images.viblo.asia/b30fc8b4-a244-4c97-a31a-5778936ae5bf.png)

## Kết thúc bài viết

Như vậy là chúng ta đã bổ sung được tính năng tải thêm nội dung đơn giản cho trang chủ blog. Như đã nói trước đó thì đây là bài viết cuối cùng của Sub-Series ExpressJS và cũng là bài viết kết thúc [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m). Kết thúc thôi nhé, chứ chưa hoàn thành... :D Chúng ta vẫn đang còn một vài bài viết về các mô hình lập trình trong Sub-Series JavaScript và một vài bài viết còn lại của Sub-Series NodeJS. :D

Nếu như mục đích của bạn chỉ đơn giản giống với mình khi mới bắt đầu Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên - đó là tự code được một trang blog cá nhân đơn giản để sử dụng - thì đây có lẽ là điểm dừng phù hợp. Tuy nhiên nếu như bạn thực sự quan tâm nhiều hơn tới lập trình thì mình rất hy vọng rằng bạn sẽ tiếp tục đồng hành cùng mình trên chặng đường tự học lập trình trước mắt. Bởi mình thực sự rất yêu thích lập trình và luôn muốn tìm hiểu, chia những kiến thức lập trình "mới" (mới đối với mình thôi, còn đối với các pro thì chắc chắn là cũ mèm rồi :D).

Cụ thể là sau khi xây dựng xong một trang blog cá nhân đơn giản với khoảng 1001 lần `npm test`, rồi `npm start`, rồi sửa lỗi code, rồi lặp lại, v.v... mình cảm thấy rằng nếu như học thêm được những kiến thức mới thì rất có thể, quá trình viết code sẽ thuận lợi hơn, và rất có thể chúng ta sẽ thiết kế được một phần mềm có nhiều tính năng hơn, ví dụ như một nền tảng blog có nhiều người dùng kiểu như Viblo chẳng hạn, hoặc những phần mềm tiện ích ở bất kỳ môi trường ứng dụng nào khác: add-on trình duyệt web, libreoffice plug-in, một ứng dụng desktop, mobile, hay đóng góp vào các dự án mã nguồn mở v.v...

Và vì vậy nên... [Series Một Số Mô Hình Lập Trình Phổ Biến](https://viblo.asia/s/jeZ103X3KWz) :D