Trong bài viết này, chúng ta sẽ cùng thảo luận về việc điều hướng các yêu cầu nhận được và tạo ra các tuyến xử lý `route` trong ExpressJS. Hãy cùng xuất phát với các phương thức gửi yêu cầu cơ bản.

## Các Phương Thức Gửi Yêu Cầu Của Trình Duyệt Web

Nếu như bạn tới với Sub-Series ExpressJS từ đâu đó khác thì bạn có thể bỏ qua phần này. Còn trong trường hợp bạn đã đồng hành cùng mình từ đầu [Series Tự Học Lập Trình Web Một Cách Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m) thì đây là phần thông tin khá quan trọng mà mình đã không giới thiệu trong các Sub-Series trước vì chưa có trường hợp ứng dụng.

Trên thực tế thì các yêu cầu gửi từ trình duyệt web tới máy chủ có thể được chia thành nhiều loại với những ý nghĩa biểu thị khác nhau và được MDN liệt kê tại đây - [Các phương thức gửi yêu cầu qua HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

Tuy nhiên thông thường thì sẽ chỉ có 4 phương thức chính, tương ứng với các thao tác phổ biến mà chúng ta muốn thực hiện trên một cơ sở dữ liệu `database` là:

- [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) yêu cầu một bản trình bày dữ liệu từ `database`.
- [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) gửi một gói dữ liệu tới để yêu cầu thêm vào `database`.
- [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) yêu cầu tạo mới hoặc cập nhật một gói dữ liệu tại `database`.
- [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) yêu cầu xóa một gói dữ liệu tại `database`.

Phương thức đầu tiên `GET` là phương thức phổ biến nhất và gắn liền với nhiều thao tác cơ bản khi sử dụng trình duyệt web. Cụ thể là khi chúng ta gõ một địa chỉ URL vào thanh địa chỉ của trình duyệt web, hoặc khi chúng ta nhấn vào một liên kết, đó chính là thao tác gửi yêu cầu bằng `GET` để được xem một bản trình bày dữ liệu. Đây cũng là phương thức mặc định của các biểu mẫu nhập liệu khi được nhấn nút gửi đi.

Phương thức thứ hai là `POST` - như chúng ta đã biết - có thể được sử dụng khi chúng ta chỉ định thuộc tính `method` cho một phần tử `<form>`.

```post.html
<form method="post" action="/login">
   Tài khoản: <input type="text" name="username">
   Mật khẩu: <input type="password" name="password">
   <button type="submit">Đăng nhập</button>
</form>
```

Bên cạnh đó, các phương thức `POST`, `PUT`, và `DELETE`, có thể được gửi qua code JavaScript bằng [XMLHTTPRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest).

## Các phương thức định tuyến

Để định nghĩa một tuyến `route` xử lý yêu cầu trong ExpressJS, chúng ta có thể sử dụng cú pháp cơ bản là `app.method(path, handler)`. Trong đó `method` là tên của các phương thức gửi yêu cầu nói ở phần trước, và `path` là điểm dừng `endpoint` để kích hoạt hàm xử lý yêu cầu `handler`.

```app.js
app.get("/", function(request, response) {
   response.send("Nhận được một yêu cầu GET xem trang chủ.");
});

app.post("/login", function(request, response) {
   response.send("Nhận được một yêu cầu POST thông tin người dùng.");
});

app.put("/post", function(request, response) {
   response.send("Nhận được một yêu cầu PUT nội dung bài viết.");
});

app.delete("/post", function(request, response) {
   response.send("Nhận được một yêu cầu DELETE xóa một bài viêt.");
});
```

## Sử dụng Path định tuyến

Nói riêng về thành phần `path` trong câu lệnh định tuyến cơ bản. Đây là một phần ứng dụng của các biểu thức thường thị `regexp` mà chúng ta đã biết. ExpressJS hỗ trợ một số biểu thức chuỗi cơ bản là `?`, `+`, `*`, và `()`.

```app.js
app.get("/ab?cd", function(request, response) {
   // tiếp nhận cả /abcd và /acd
});
```

```app.js
app.get("/ab+cd", function(request, response) {
   // ký tự b có thể lặp một hoặc nhiều lần
});
```

```app.js
app.get("*", function(request, response) {
   // tiếp nhận tất cả các yêu cầu
});
```

```app.js
app.get("/a(bc)?d", function(request, response) {
   // tiếp nhận /abcd và /ad
});
```

Và tất nhiên là chúng ta cũng có thể sử dụng một `regexp` ở đây thay cho một chuỗi mô tả `path`. Nhưng có lẽ bấy nhiêu là đã tạm đủ cho mục đích tạo blog đơn giản mà chúng ta đang hướng đến rồi. :D

## Sử dụng Path chứa các tham số

Các tham số định tuyến về cơ bản là các thành phần của URL được đặt tên trong code để lưu lại các giá trị ở các vị trí tương ứng khi yêu cầu được gửi tới. Các tham số được viết giống như các thành phần của `path` nhưng được biểu thị với ký tự `:` ở phía trước.

```app.js
app.get("/post/:postId/author/:authorId", function(request, response) {
   response.send(request.params);
});

// path giả định: "/post/0001/author/01"
// request.params: { "postId": "0001", "authorId": "01" }

app.get("/post/:postId-:authorId",  function(request, response) {
   response.send(request.params);
});

// path giả định "/post/0001-01"
// request.params: { "postId": "0001", "authorId": "01" }
```

## Các hàm xử lý yêu cầu

Đối với mỗi `route`, chúng ta có thể gắn một hoặc nhiều hàm xử lý yêu cầu ở dạng mảng. Trong trường hợp sử dụng nhiều hàm xử lý yêu cầu cho một `route`, các hàm xử lý được gắn trước sẽ có thể có thêm tham số thứ ba là `next` để chuyển tiếp quyền xử lý cho hàm tiếp theo `next()` hoặc chuyển sang `route` tiếp theo bằng `next("route")`.

```app.js
const authencicate = function(req, res, next) {
   console.log("Kiểm tra phiên đăng nhập hợp lệ.");
   next(); // chuyển tới xử lý handlePostEdit
};

const handlePostEdit = function(req, res) {
   console.log("Truy vấn dữ liệu và trả về view edit");
};

app.get('/post/:postId/edit', [authencicate, handlePostEdit]);
```

## Phương thức app.route()

Trong trường hợp có nhiều phương thức gửi tới cùng một điểm `endpoint` thì chúng ta có thể sử dụng phương thức `app.route()` để viết các hàm xử lý ở dạng nối tiếp.

```app.js
app.route('/post')
   .all(function(req, res, next) {
      // các bước xử lý chung trước khi
      // phân loại phương thức gửi đến
      next();
   })
   .get(function(req, res) {
      res.send('Get a post')
   })
   .post(function(req, res) {
      res.send('Add a post')
   })
   .put(function(req, res) {
      res.send('Update the post')
   });
```

## Sử dụng các object định tuyến Router

Việc kiến trúc một code `server` với nhiều tuyến xử lý, về mặt tổng quan cũng không khác nhiều so với viết một phần mềm `console` nhỏ. Chúng ta chắc chắn sẽ luôn muốn duy trì phần khung chính `main` của chương trình thật gọn gàng và chỉ tập trung mô tả tổng quan các bước xử lý.

Chính vì vậy nên ExpressJS có cung cấp thêm cho chúng ta một công cụ để thực hiện việc phân tách các hàm xử lý yêu cầu ra khỏi phần thân chương trình chính. Đó là các [object định tuyến Router](https://expressjs.com/en/4x/api.html#router) - có các phương thức và cú pháp điều hướng hoàn toàn tương đồng với `app`.

```app.js
const express = require("express");
const app = express();

const homeRouter = require("./route/home");
const loginRouter = require("./route/login");
const postRouter = require("./route/post");

app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/post", postRouter);

app.listen(3000);
```

```route/home.js
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
   res.send("Nhận được yêu cầu GET xem trang chủ.");
});

module.exports = router;
```

```route/login.js
const express = require("express");
const router = express.Router();

router.post("/", function(req, res) {
   res.send("Nhận được yêu cầu POST thông tin đăng nhập.");
});

module.exports = router;
```

```route/post.js
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
   res.send("Nhận được yêu cầu GET xem một bài viết.");
});

module.exports = router;
```

Khi sử dụng `router`, chúng ta cần lưu ý rằng `path` dùng cho các phương thức của `router` sẽ là các đường dẫn tương đối, nối tiếp với `path` được sử dụng ở `app` khi thực hiện thao tác gắn `router` bằng `app.use`.

Nói tới `app.use`, ở đây chúng ta lại được gặp thêm một khái niệm mới được gọi là `plug-in` xử lý trung gian - hay `middleware`. Tuy nhiên để duy trì trọng tâm bài viết  xoay quanh nội dung giới thiệu các thao tác cơ bản để điều hướng yêu cầu, chúng ta sẽ để dành `middleware` cho bài viết tiếp theo. :D

[[ExpressJS] Bài 4 - Sử dụng Middleware](https://viblo.asia/p/gDVK2rzvKLj)