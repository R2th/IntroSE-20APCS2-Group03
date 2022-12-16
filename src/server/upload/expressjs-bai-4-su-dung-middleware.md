Trong bài viết này, chúng ta sẽ nói về việc sử dụng `middleware` - hay các `plug-in` xử lý trung gian trước khi yêu cầu được xử lý bởi các hàm tiếp nhận gắn tại `endpoint` và phản hồi lại cho phía trình duyệt web.

## Cú pháp sử dụng middleware

Ồ... trước hết chúng ta cần biết một `middleware` hay một `plug-in` xử lý trung gian trông như thế nào đã. Ở đây chúng ta sẽ tạo ra một `plug-in` có tên là `logger` để in nhật ký tất cả các yêu cầu nhận được.

```middleware/logger.js
const logger = function(request, response, next) {
   var datetime = new Date();

   console.log("= = = = = = = = = =");
   console.log("Datetime:" + datetime.toString());
   console.log("Request URL: " + request.originalURL);
   
   next(); // chuyển quyền xử lý tới middleware tiếp thep
}; // logger

module.exports = logger;
```

```app.js
const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const homeRouter = require("./route/home");

app.use(logger);
app.use("/", homeRouter);

app.listen(3000);
```

Bạn thấy đấy, một `middlware` về cơ bản là một hàm xử lý thông thường chứ không phải là một khái niệm mới. Tên gọi `middleware` chỉ là để phân biệt với các hàm xử lý cuối cùng đảm nhiệm tác vụ phản hồi lại yêu cầu với các phương thức của `response`.

Để gắn một `middleware` vào trước tất cả các tuyến `route` thì chúng ta có thể sử dụng phương thức `app.use(middleware)` ở vị trí trước khi gắn các `router` như trong code ví dụ ở trên. Trong trường hợp muốn sử dụng một `middleware` cho riêng một tuyến xử lý `route` nào đó thì chúng ta có thể sử dụng phương thức `router.use(middleware)` trước khi gắn hàm xử lý cho các phương thức tiếp nhận yêu cầu của `router`.

```route/homeRouter.js
const express = require("express");
const router = express.Router();

const checkLoginState = require("../middleware/login");

router.use(checkLoginState);

router.get("/", function(request, response, next) {
   // ...
});
```

## Một số middleware phổ biến

Nói đến các `plug-in` tiện ích của các thư viện và `framework` phổ biến, chắc chắn là chúng ta sẽ luôn có thể tìm thấy rất nhiều kết quả lựa chọn nếu Google một cách nghiêm túc. Với ExpressJS thì thao tác tìm kiếm của chúng ta có phần thuận lợi hơn với `npm` là nguồn cung cấp tin cậy bởi mặc định được phân phối kèm môi trường NodeJS.

Bên cạnh đó, ExpressJS có một hạng mục nhỏ được đặt ngay trên trang web của họ và liệt kê một số `middleware` phổ biến nhất để giúp người sử dụng tiết kiệm thời gian.

[ExpressJS.com => Resouces => Middleware](https://expressjs.com/en/resources/middleware.html)
![](https://images.viblo.asia/d6eeb15b-012e-4a01-ab47-8dcdd5003cc6.png)

### a. morgan

Ví dụ đối với tác vụ in nhật ký các yêu cầu gửi đến `server` thì chúng ta có thể sử dụng một `middleware` có tên là `morgan` trong danh sách đó.

```CMD|Terminal.io
npm install morgan --save
```

```app.js
const express = require("express");
const app = express();

const logger = require("morgan");
const homeRouter = require("./route/home");

app.use(logger);
app.use("/", homeRouter);

app.listen(3000);
```

### b. serve-static

Một `middleware` phổ biến khác nữa là `serve-static` được sử dụng để tự động xử lý các yêu cầu truy xuất các tệp tĩnh, ví dụ như các tệp `.css`, `.js`, v.v...

```CMD|Terminal.io
npm install serve-static --save
```

```app.js
const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");
const homeRouter = require("./route/home");

const staticFolder = path.join(__dirname, "static");
const staticServer = serveStatic(staticFolder);

const app = express();
app.use(staticServer);
app.use("/", homeRouter);
// ... other routers

app.listen(3000);
```

Nói riêng đối với tác vụ xử lý các yêu cầu tệp tĩnh thì ExpressJS cung cấp một `middleware` sẵn có là [`express.static(path)`](http://expressjs.com/en/4x/api.html#express.static).

### c. cookie-parser

Một `middleware` phổ biến được sử dụng để gắn các dữ liệu lưu trong `cookie` của trình duyệt web vào object `request`. Điều này giúp cho chúng ta có thể truy xuất các bản ghi `cookie` để xử lý các thao tác ví dụ như kiểm tra thông tin đăng nhập lần cuối của người dùng được lưu lại vào `cookie`.

```CMD|Terminal.io
npm install cookie-parse --save
```

```app.js
const express = require("express");
const homeRouter = require("./route/home");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use("/", homeRouter);
// ... other routers

app.listen(3000);
```

Sau khi gắn `cookieParser` thì các object `request` sẽ được gắn thêm các thuộc tính `request.cookies` và `request.signedCookies`.

### d. compression

Một `middleware` phổ biến được sử dụng để nén nội dung gửi phản hồi giúp giảm lượng băng thông chiếm dụng cho mỗi thao tác gửi dữ liệu phản hồi; Sẽ rất hữu ích khi blog của bạn đang xây dựng có nhiều người truy cập để đọc bài viết.

```CMD|Terminal.io
npm install compression --save
```

```app.js
const express = require("express");
const compression = require("compression");
const homeRouter = require("./route/home");

const app = express();
app.use(compression());
app.use("/", homeRouter);

app.listen(3000);
```

## Kết thúc bài viết

Bài viết giới thiệu về sử dụng `middleware` trong ExpressJS của chúng ta đến đây là kết thúc. Như vậy là tính tới thời điểm hiện tại thì chúng ta đã biết cách tạo ra một `server` với ExpressJS và thực hiện các thao tác điều hướng cơ bản để phân chia các kiểu yêu cầu về các tuyến xử lý `route`. Đồng thời, chúng ta cũng mới biết thêm được về cách gắn các `plug-in` xử lý trung gian cho `app` hoặc mỗi `router` để thực hiện các thao tác tiền xử lý hoặc tiện ích nào đó.

Trong bài viết tiếp theo, chúng ta sẽ nói về phần mềm `express-generator` - giúp nhanh chóng thiết lập một `project` mới với một số `plug-in` phổ biến và một vài thao tác thiết lập sẵn. Điều này giúp cho chúng ta có thể tiết kiệm thời gian và tập trung vào code xử lý chính của `server`, đồng thời tạo ra một dạng thức thư mục chung cho các `project` để có thể dễ dàng chia sẻ và sử dụng code.

[[ExpressJS] Bài 5 - Express Generator](https://viblo.asia/p/gGJ59rOaKX2)