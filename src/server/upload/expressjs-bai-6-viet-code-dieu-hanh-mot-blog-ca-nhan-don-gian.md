Trong bài viết này, chúng ta sẽ bắt đầu thảo luận về việc viết code xây dựng một trang blog cá nhân đơn giản để đăng tải lên [Glich.com](http://semiarthanoian.glitch.me/) như đã dự định trước đó.

Ở thời điểm hiện tại thì mình tin là bạn đã hoàn thành xong [code quản lý Database đơn giản](https://viblo.asia/p/databaseDo754rbJZM6) với các `procedure` làm việc với các tệp dữ liệu tĩnh; Đồng thời cũng đã cảm thấy tự tin và sẵn sàng bổ sung thêm code quản lý Database nếu cảm thấy cần thiết trong quá trình viết code xử lý cho các `route` ở đây. 

Do đó trong các bài viết thuộc Sub-Series ExpressJS này chúng ta sẽ không có các đoạn code ví dụ chi tiết để bổ sung thêm tính năng vào module `database/manager` đã xây dựng trong Sub-Series Database. Thay vào đó thì chúng ta sẽ chỉ nói tới khía cạnh của code sử dụng `consumer` yêu cầu `database/manager` thực hiện các thao tác với các bản ghi là các tệp dữ liệu tĩnh.

## Định nghĩa lại về phần mềm server

Chúng ta hãy chọn một góc nhìn đứng lùi ra xa những dòng code xử lý chi tiết một chút và quay trở lại với vị trí của một người sử dụng một trang blog đã biết một chút về lập trình. Khi chúng ta nhấn vào một liên kết nào đó trên trang blog và gửi yêu cầu tới `server`, về cơ bản là chúng ta chỉ đang yêu cầu thực hiện một thủ tục nào đó với những dữ liệu đang có trong `database`.

```procedure.txt
https://viblo.asia/posts/Eb85oAVkZ2G/edit

Yêu cẩu server thực hiện một procedure
Kiểu bản ghi: post
Tên thủ tục : edit
Tham số     : Eb85oAVkZ2G
```

Trong ví dụ trên thì `procedure` này có ý nghĩa là chúng ta đang yêu cầu `server` trình bày dữ liệu của bản ghi bài viết `post` có tên định danh trong `database` là  `Eb85oAVkZ2G` trên giao diện để soạn thảo `edit` một bài viết.

Như vậy việc xây dựng một phần mềm `server` về cơ bản là chúng ta đang thiết kế một giao diên sử dụng `database` cho trình duyệt web. Giao diện này  bao gồm các `procedure` để người sử dụng trang web có thể lựa chọn và yêu cầu thực hiện. Các `procedure` này được ẩn trong các nút nhấn hay các liên kết trong giao diện đồ họa được vẽ trên nền trình duyệt web.

## Thiết kế tổng quan các route xử lý

Ở thời điểm hiện tại, chúng ta đều đã có thiết kế blog cá nhân riêng và vì vậy nên các `procedure` hay các `route` cần xây dựng sẽ có phần khác nhau đôi chút tùy thuộc vào thiết kế giao diện người dùng và kịch bản sử dụng `strategy`.

Blog cá nhân mà mình đang đăng tải tại [Glitch.com](http://semiarthanoian.glitch.me/) có kịch bản sử dụng ở dạng tối giản `minimal`. Đó là toàn bộ nội dung của blog là một Series bài viết duy nhất. Trong đó thì bài viết mở đầu Series được sử dụng làm nội dung cho trang chủ, và sau đó người xem chỉ đơn giản là đi từ bài viết này tới bài viết khác trong hành trình [Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](semiarthanoian.glitch.me).

Do đó nên các `route` xử lý mà phần mềm `server` cần cung cấp chỉ bao gồm trang chủ `/` và các trang hiển thị nội dung của các bài viết `/article/:id`; Và đối với nhu cầu sử dụng cá nhân thì mình không cần tới tính năng bảo mật dạng như đăng nhập quản trị nên cũng không có thêm `route` xử lý nào cho những tính năng như vậy.

Tuy nhiên ở đây mình sẽ cùng bạn thảo luận về một thiết kế blog phổ biến có kèm theo tính năng đăng nhập cho người quản trị blog. Như vậy chúng ta sẽ có thêm các bản ghi `Admin` trong `database` và mỗi người sẽ tự bổ sung code cho module `database/manager` để làm chất liệu cho các `procedure` cung cấp cho trình duyệt web sử dụng.

Hãy tạm giả định rằng  các yêu cầu `request` gửi tới server đều sử dụng phương thức `GET`. Như vậy chúng ta có thể biểu thị một số `procedure` đối với các bản ghi `Article` ở dạng đường dẫn trên thanh địa chỉ của trình duyệt web như thế này.

- `/article/add` - Yêu cầu trình bày một bản ghi `Article` mới chưa có dữ liệu và đặt trên giao diện soạn thảo bài viết.
- `/article/view/0001`- Yêu cầu trình bày một bản ghi `Article` đã lưu trong `database` có `id` là `0001` và đặt trên giao diện xem bài viết.
- `/article/edit/0001` - Yêu cầu trình bày một bản ghi `Article` đã lưu trong `database` có `id` là `0001` và đặt trên giao diện soạn thảo bài viết.
- `/article/delete/0001` - Yêu cầu xóa một bản ghi `Article` đã lưu trong `database`.

Bạn thấy đấy, các yêu cầu mà trình duyệt web gửi tới server cũng không khác so với khi chúng ta viết một dòng lệnh yêu cầu `database/manager.js` thực hiện một `procedure` mà chúng ta đã thiết kế trong Sub-Series Database.

```test.js
var selected = new Article();

await databaseManager.execute(
   /* kiểu bản ghi */   Article.name,
   /* tên thủ tục  */   "select-by-id",
   /* tham số id   */   "0001"
   /* nhận kết quả */   selected
};
```

Và để phản ánh các `procedure` như trên vào code `server` thì chúng ta có thể tạo ra các `route` đáp ứng các yêu cầu với cấu trúc thư mục có dạng như thế này.

```structure.txt
[express-blog]
.  |
.  +-----[route]
.  |        |
.  |        +-----home.js
.  |        +-----oops.js
.  |        |
.  |        +-----[article]
.  |                 |
.  |                 +-----[action]
.  |                 |        |
.  |                 |        +-----view.js
.  |                 |        +-----add.js
.  |                 |        +-----edit.js
.  |                 |        +-----delete.js
.  |                 |
.  |                 +-----index.js
.  |
.  +-----app.js
```

```app.js
app.use("/", require("./route/home.js"));
app.use("/article", require("./route/article/index.js"));
```

```article/index.js
router.use("/view", require("./action/view.js"));
router.use("/add", require("./action/add.js"));
router.use("/edit", require("./action/edit.js"));
router.use("/delete", require("./action/delete.js"));

module.exports = router;
```

Và tới đây thì chúng ta có các `procedure` sẽ được xử lý chi tiết tại các `router` sau cùng là `add.js`, `view.js`, `edit.js`, và `delete.js`. Ví dụ tổng quan xử lý tại `view.js` sẽ như thế này.

```acticle/action/view.js
router.get("/:id", async (request, response) => {
   var { id } = request.params;
   /* Truy vấn dữ liệu từ database với id nhận được*/
   /* Nếu có bản ghi phù hợp thì render giao diện xem bài viết */
   /* Nếu không tìm thấy thì render giao diện thông báo lỗi */
);

module.exports = router;
```

Với yêu cầu giả định đã nói ở trên là `/article/view/0001` thì đầu tiên `request` sẽ được `app.js` chuyển cho `router` đại diện cho nhóm `article` là `route/article/index.js`. Ở đây đường dẫn tương quan `path` của `request` tiếp tục được tính từ sau vị trí `/article` và yêu cầu được chuyển tiếp tới `router view.js` để tách lấy `id = 0001` và thực hiện các thao tác xử lý chi tiết.

Đây cũng sẽ là dạng thức `pattern` mà chúng ta sẽ áp dụng tổng quan cho các nhóm router khác là `category` và `admin`. Các yêu cầu sẽ được chuyển tiếp từ `app.js` tới các nhóm `router` và tìm tới một `router` xử lý chi tiết cuối cùng `endpoint`.

Tuy nhiên thì bạn có thể cân nhắc việc chọn ra những `route` quan trọng trước khi quyết định viết code. Lý do là vì đứng từ vị trí vừa là người sử dụng blog, kiêm coder, và quản lý một `database` đơn giản bằng các tệp tĩnh, thì rất có thể việc xây dựng giao diện người dùng để chỉnh sửa các bản ghi `Admin` là điều không cần thiết. Và ở đây thì chúng ta sẽ tạm có cấu trúc các nhóm `router` để xử lý các yêu cầu như thế này.

```structure.txt
[express-blog]
.  |
.  +-----[route]
.  |        |
.  |        +-----home.js
.  |        +-----oops.js
.  |        |
.  |        +-----[admin]
.  |        |        |
.  |        |        +-----[action]
.  |        |        |        |
.  |        |        |        +-----login.js
.  |        |        |        +-----logout.js
.  |        |        |
.  |        |        +-----index.js
.  |        |
.  |        +-----[article]
.  |        |        |
.  |        |        +-----[action]
.  |        |        |        |
.  |        |        |        +-----view.js
.  |        |        |        +-----add.js
.  |        |        |        +-----edit.js
.  |        |        |        +-----delete.js
.  |        |        |
.  |        |        +-----index.js
.  |        |
.  |        +-----[category]
.  |                 |
.  |                 +-----[action]
.  |                 |        |
.  |                 |        +-----view.js
.  |                 |        +-----add.js
.  |                 |        +-----edit.js
.  |                 |        +-----delete.js
.  |                 |
.  |                 +-----index.js
.  |
.  +-----app.js
```

## Cấu trúc thư mục view

Đối với việc cấu trúc thư mục `view` thì chắc chắn là mỗi người chúng ta sẽ có một cách sắp xếp riêng. Tuy nhiên thì về cơ bản sẽ chỉ có 2 lối tư duy khởi điểm:

Cách đầu tiên, chúng ta có thể xem như các tệp trong `view` là dạng template thụ động không có chứa logic hiển thị mà chỉ có các biến chờ gắn dữ liệu để hiển thị. Đối với cách này thì khi code xử lý ở một `route` nào đó cần `render` sẽ cần tìm tới chính xác tệp `template` phù hợp với mục đích hiển thị kết quả của `route` đó. Ví dụ:

```structure.txt
[express-blog]
.  |
.  +-----[view]
.           |
.           +-----home.ejs
.           +-----oops.ejs
.           |
.           +-----[article]
.                    |
.                    +-----view.ejs
.                    +-----edit.ejs
```

```route/home.js
router.get("/", async (request, response) => {
   var data = {};
   /* truy vấn dữ liệu từ database -> data */
   response.render("home.ejs", { data });
});
```

```route/article/action/view.js
router.get("/:id", async (request, response) => {
   var { id } = request.params;
   var data = {};
   /* truy vấn dữ liệu từ database -> data */
   response.render("article/view.ejs", { data });
});
```

Cách thứ hai, là chúng ta có thể nhìn nhận khối `view` ở dạng một phần mềm vẽ giao diện người dùng có chứa logic xử lý riêng và có một tệp đại diện ví dụ như `index.ejs`. Code xử lý ở các `route` sẽ chỉ sử dụng duy nhất tệp này để `render` và truyền các tham số dữ liệu vào để mô tả giao diện muốn hiển thị. Lúc này code logic trong `index.ejs` sẽ phân tích các tham  số được truyền vào để kiến trúc nên giao diện hiển thị phù hợp.

```structure.txt
[express-blog]
.  |
.  +-----[view]
.           |
.           +-----index.ejs
.           |
.           +-----[layout]
.                    |
.                    +-----home.ejs
.                    +-----oops.ejs
.                    +-----article.ejs
```

```route/home.js
router.get("/", async (request, response) => {
   var data = {};
   /* truy vấn dữ liệu từ database -> data */
   response.render("index.ejs", { layout: "home", data });
});
```

```route/article/action/view.js
router.get("/:id", async (request, response) => {
   var { id } = request.params;
   var data = {};
   /* truy vấn dữ liệu từ database -> data */
   response.render("index.ejs", { layout: "article", action: "view", data });
});
```

Cách xử lý đầu tiên sẽ đơn giản hơn nhưng khi chúng ta cập nhật giao diện người dùng và nếu có sự thay đổi về cấu trúc thư mục bên trong `view` thì sẽ cần phải sửa lại cả ở code xử lý của các `route`. Trong khi đó thì cách xử lý thứ hai rất linh động để chỉnh sửa hoặc tái cấu trúc lại thư mục `view` khi cần thiết, nhưng lại yêu cầu thiết lập ban đầu hơi rườm rà hơn một chút.

Nói tới đây thì mình không biết chắc chắn được lựa chọn `View Engine` và phương thức xử lý của bạn như thế nào. Và vì vậy nên mình quyết định chia sẻ cách làm của mình theo phương thức thứ hai. Tức là chúng ta sẽ nhìn nhận khối `view` như một phần mềm vẽ giao diện người dùng, cũng giống như việc nhìn nhận khối `database` là một phần mềm quản lý cơ sở dữ liệu.

```structure.txt
[express-blog]
.  |
.  +-----[database]
.  |        |
.  |        +-----manager.js
.  |
.  +-----[view]
.  |        |
.  |        +-----index.ejs
.  |
.  +-----[route]
.  |
.  +-----app.js
```

Để thuận tiện thì mình chọn sử dụng `Tempalte Engine` có tên là `EJS` như đã nói trước đó trong bài ExpressJS số 2. Nếu như bạn đang sử dụng một `View Engine` khác thì việc đọc code template của `EJS` cũng sẽ không gặp trở ngại gì đâu. Bởi vì tất cả chỉ là code JavaScript được nhúng xen kẽ trong code HTML thôi, chứ hoàn toàn không có cú pháp hay từ khóa nào mới cả.

Và phần nội dung chia sẻ về việc viết code cho khối `view` cũng sẽ được đặt vào một Sub-Series riêng để chúng ta có thể tập trung và dễ theo dõi hơn. Code xử lý chi tiết của các `route` chắc chắn vẫn sẽ ở lại với Sub-Series ExpressJS này và không đi lạc sang Sub-Series mới. :D

[[EJS] Bài 1 - EJS Là Cái Gì?](https://viblo.asia/p/YWOZrAVrKQ0)

Lần này có một chút khác biệt so với khi chúng ta khởi đầu Sub-Series Database - các bài viết tiếp theo trong Sub-Series ExpressJS ở đây sẽ không phải chờ đợi cho đến khi phần mềm `view` được xây dựng hoàn thiện. Chúng ta sẽ cập nhật code xử lý của các nhóm `router` ngay khi giao diện của các trang đơn tương ứng đã sẵn sàng.

[[ExpressJS] Bài 7 - Viết Code Điều Hành Blog Cá Nhân (Tiếp Theo)](https://viblo.asia/p/E375zAr2lGW)