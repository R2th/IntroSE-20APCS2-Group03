Trong bài này, chúng ta sẽ viết code điều hành thực hiện tính năng đăng nhập đơn giản, và giới hạn quyền truy cập của người đọc thông thường vào các giao diện quản trị nội dung của blog.

## Bổ sung nhóm route/admin

Giống với dạng thức `convention` mà chúng ta đã cấu trúc nên các nhóm `route/article` và `route/category`, ở đây chúng ta sẽ bổ sung thêm nhóm `route/admin` với hai thao tác là `action/login` và `action/logout`.

```structure.txt
[route]
.  |
.  +-----[article]
.  +-----[category]
.  +-----[admin]
.           |
.           +-----[action]
.           |        |
.           |        +-----login.js
.           |        +-----logout.js
.           |
.           +-----index.js
```

Khai báo nhóm `router` mới tại `app.js`.

```express-blog/app.js
   /* --- Adding Routers */

app.use("/"        , require("./route/home"));
app.use("/article" , require("./route/article/index"));
app.use("/category", require("./route/category/index"));

app.use("/admin"   , require("./route/admin/index"));

app.use(require("./route/oops"));
```

Tạo `router` đại diện của nhóm `admin`.

```route/admin/index.js
const express = require("express");
const router = express.Router();

router.use("/login", require("./action/login"));
router.use("/logout", require("./action/logout"));

module.exports = router;
```

## Hiển thị giao diện đăng nhập

Với giao diện đăng nhập đã xây dựng thì chúng ta cần bổ sung thêm dữ liệu hiển thị cho liên kết `Viết bài` thay thế vị trí hiển thị thời gian trên thanh `topnav`.

```route/sub-procedure/get-data-for-topnav.js
/* requires... */

module.exports = async (
   out_data = new Data()
) => {
   /* logo-text & category-list... */

   out_data.set("topnav-action", "Viết Bài");
   out_data.set("topnav-endpoint", "/article/add");
};
```

```route/admin/action/login.js
/* requires... */

   /* --- Show login page */

router.get("/", async (request, response) => {
   var data = new Data();
   await getDataForTopnav(data);
   data.set("endpoint", "/admin/login");

   response.render("index.ejs", {
      layout: "admin",
      action: null,
      data
   });
}); // router.get

   /* --- Handle login submit */

router.post("/", (request, response) => {
   // --- not implemented
});

module.exports = router;
```

Kiểm tra kết quả hiển thị trang đăng nhập.

```CMD|Terminal.io
npm start

Server started
```

[http://localhost:8080/admin/login](http://localhost:8080/admin/login)
![](https://images.viblo.asia/aca7ef46-7d13-4ccc-99de-4bc9811692c8.png)

## Xử lý form đăng nhập

Ở đây mình không quản lý thêm các bản ghi `Admin` trong `database` mà chỉ tạo ra một cặp `username` và `password` duy nhất để đăng nhập quản trị blog và lưu trong một tệp `credential.js` ở cấp thư mục đầu tiên của `project`.

```express-blog/credential.js
module.exports = new Map()
   .set("username", "thinhtran.nature@gmail.com")
   .set("password", "abc123!@#");
```

Khi `<form>` đăng nhập được gửi về `server` thì chúng ta cần kiểm tra thông tin đăng nhập - để ra quyết định gắn nhãn [`session=admin`](https://viblo.asia/p/jvElaRNm5kw) cho các yêu cầu sau đó, hoặc yêu cầu thực hiện đăng nhập lại nếu thông tin tài khoản không chính xác.

```route/admin/action/login.js
/* requries... */
/* router.get... */

router.post("/", (request, response) => {
   var { username, password } = request.body;
   var usernameMatched = (username == credential.get("username"));
   var passwordMatched = (password == credential.get("password"));
   var loginMatched = (usernameMatched && passwordMatched);

   if (loginMatched) {
      response.cookie("session", "admin", { httpOnly: true });
      response.redirect("/");
   }
   else {
      /* ask user to login again */;
      response.redirect("/admin/login");
   }
}); // router.post

module.exports = router;
```

Thử đăng nhập với thông tin trong `credential.js`.

```CMD|Terminal.io
npm start

Server started
```

[http://localhost:8080/admin/login](http://localhost:8080/admin/login)
![](https://images.viblo.asia/f77f421b-e435-4482-9ad4-4fb5f532238d.png)

Khi đăng nhập thành công, chúng ta sẽ được chuyển hướng về trang chủ của blog.

## Giới hạn quyền truy cập các giao diện quản trị nội dung của blog

Lúc này trong số 1001 yêu cầu mà `server` nhận được từ các trình duyệt web sẽ có những yêu cầu được gắn nhãn `session=admin` khi đã thực hiện đăng nhập tài khoản quản trị; Và có những yêu cầu khác không được gắn nhãn này nếu chưa thực hiện đăng nhập tài khoản quản trị blog.

Đối với những yêu cầu không có gắn nhãn `session=admin`, chúng ta cần giới hạn quyền truy cập vào các giao diện quản trị nội  dung `add`, `edit`, và `delete` của bất kỳ nhóm nào. 

Cách xử lý đơn giản nhất là chúng ta sẽ chỉnh sửa lại code của từng `router` tương ứng trong mỗi nhóm `route/article` và `route/category` để thêm logic kiểm tra `cookie` và chuyển hướng yêu cầu.

Tuy nhiên do chúng ta đã sử dụng một dạng thức chung `convention` khi định nghĩa các nhóm này, chúng ta có thể tạo một `router` làm bộ lọc để phân tích và chuyển hướng các yêu cầu trước khi gắn các `router` xử lý chính trong `app.js`.

```express-blog/app.js
   /* --- Adding Routers */

app.use(require("./route/session-filter"));

app.use("/"        , require("./route/home"));
app.use("/article" , require("./route/article/index"));
app.use("/category", require("./route/category/index"));
app.use("/admin"   , require("./route/admin/index"));
app.use(require("./route/oops"));
```

Ở đây `session-filter` sẽ lọc ra những yêu cầu không được gắn nhãn `session=admin` và thực hiện chuyển hướng đến trang đăng nhập nếu như đó là những yêu cầu thực hiện một chức năng quản trị nội dung của blog.

```route/session-filter.js
const express = require("express");
const router = express.Router();

router.all("/(:type)?(/:action)?(/:id)?", (request, response, next) => {
   var { session } = request.cookies;
   var { action } = request.params;

   if (session == "admin")
      next() /* go to main routers */;
   else
      if (["add", "edit", "delete"].includes(action))
         response.redirect("/admin/login");
      else
         next() /* go to main routers */;
}); // router.all

module.exports = router;
```

Lúc này nếu như chúng ta mở một trình duyệt web khác và nhấn vào liên kết `Viết bài` khi chưa thực hiện đăng nhập thì sẽ được chuyển hướng tới trang đăng nhập quản trị.

```CMD|Terminal.io
npm start

Server started
```

[http://localhost:8080/article/add](http://localhost:8080/article/add)
![](https://images.viblo.asia/e828d9c8-2bce-41ff-904a-d32349aa32f4.png)

## Đăng xuất tài khoản quản trị

Thao tác đăng xuất tài khoản quản trị blog chỉ đơn giản là chúng ta sẽ bỏ gắn nhãn `session=admin` cho trình duyệt web đã gửi yêu cầu `/admin/logout` và chuyển hướng về trang chủ của blog.

```route/admin/action/logout.js
const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
   response.clearCookie("session");
   response.redirect("/");
});

module.exports = router;
```

```CMD|Terminal.io
npm start

Server started
```

[127.0.0.1:8080/admin/logout](127.0.0.1:8080/admin/logout)
![](https://images.viblo.asia/a92304d1-3507-4794-a90c-d5579d0f2710.png)

## Kết thúc bài viết

Như vậy là chúng ta đã bổ sung được tính năng đăng nhập quản trị đơn giản cho blog cá nhân đang xây dựng. Tới đây thì việc xây dựng một trang blog đơn giản xem như đã hoàn thành và bạn đã có thể đăng tải code lên [Glitch.com](https://glitch.com/) để viết bài chia sẻ thông tin, kiến thức với mọi người xung quanh. :D

Mình đã định kết thúc Sub-Series ExpressJS của chúng ta ở đây. Tuy nhiên mình chợt nghĩ ra là rất có thể bạn cũng sẽ muốn bổ sung thêm tính năng tự động tải thêm nội dung cho giao diện trang chủ khi người xem blog cuộn qua những `entry` mới nhất. Đây là một tính năng khá phổ biến và không quá khó để thực hiện, và nếu như bạn không ngại nán lại thêm một chút thì chúng ta sẽ thử tìm cách bổ sung tính năng này trong bài viết tiếp theo. :D

[[ExpressJS] Bài 12 - Viết Code Điều Hành Blog Cá Nhân (Kết Thúc)](https://viblo.asia/p/E375zAnWlGW)