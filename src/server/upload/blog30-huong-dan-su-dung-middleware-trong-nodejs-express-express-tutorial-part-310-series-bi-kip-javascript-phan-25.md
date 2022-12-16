![image.png](https://images.viblo.asia/c32bff81-dbd5-4566-885f-4a61ab371052.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Using middleware
--------------------------------

Express là một `Framework` sử dụng `Router` và `Middleware`. Một ứng dụng Express về cơ bản là một tập các lệnh gọi `Middleware function` (các hàm trung gian).

_Các_ hàm `middleware` là các `function` có quyền truy cập vào `đối tượng request - req`, `đối tượng response - res` và `Middleware function` tiếp theo trong chu trình` response-request` của ứng dụng. `Middleware function` tiếp theo thường được biểu thị bằng một biến có tên `next`.

Các `Middleware function` có thể thực hiện các tác vụ sau:

*   Thực thi bất kỳ code nào.
*   Thực hiện các thay đổi đối với `các đối tượn request` và `các đối tượng response`.
*   Kết thúc chu kỳ `request-response`.
*   Gọi `Middleware function` tiếp theo trong ngăn xếp.

Nếu `Middleware function` hiện tại không kết thúc chu kỳ `request-response`, nó phải gọi hàm `next()` để chuyển quyền điều khiển cho `Middleware function` tiếp theo. Nếu không, `request` sẽ bị treo.

Một ứng dụng `Express` có thể sử dụng các loại `middleware` sau:

- [Using middleware](#using-middleware)
- [Middleware cấp ứng dụng (Application-level middleware)](#middleware-cấp-ứng-dụng-application-level-middleware)
- [Middleware cấp Router (Router-level middleware)](#middleware-cấp-router-router-level-middleware)
- [Error-handling middleware](#error-handling-middleware)
- [Middleware tích hợp (Built-in middleware)](#middleware-tích-hợp-built-in-middleware)
- [Middleware của bên thứ ba (Third-party middleware)](#middleware-của-bên-thứ-ba-third-party-middleware)
- [Roundup](#roundup)

Bạn có thể load `middleware cấp ứng dụng` và `cấp Router` bằng một đường dẫn tùy chọn. Bạn cũng có thể load một loạt các `Middleware function` cùng nhau, điều này tạo ra một ngăn xếp con của các `middleware` tại một `Point` duy nhất.

Middleware cấp ứng dụng (Application-level middleware)
--------------------------------

Liên kết `middleware` cấp ứng dụng với một phiên bản của đối tượng `app` bằng cách sử dụng hàm `app.use()` và `app.METHOD()`, `METHOD` là các hàm HTTP của `request` mà `Middleware function` xử lý (chẳng hạn như `GET`, `PUT` hoặc `POST`) sẽ được viết dưới dạng thường không in hoa.

Ví dụ này cho thấy một `Middleware function` không liên kết với bất kỳ đường dẫn nàp. Hàm được thực thi mỗi khi ứng dụng nhận được request.

```javascript
const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```


Ví dụ này cho thấy một `Middleware function` được gắn trên đường dẫn `/user/:id`. Hàm được thực thi cho bất kỳ loại `request HTTP` nào trên đường dẫn `/user/:id`.

```javascript
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.hàm)
  next()
})
```


Ví dụ này cho thấy một `route` và `function` xử lý của nó (`hệ thống middleware`). Hàm xử lý các request `GET` đến đường dẫn `/user/:id`.

```javascript
app.get('/user/:id', (req, res, next) => {
  res.send('USER')
})
```


Đây là một ví dụ về việc load một loạt các `Middleware function` tại một đường dẫn. Ví dụ dưới minh họa một ngăn xếp con `middleware` in thông tin `request` cho bất kỳ loại `request HTTP` nào đến đường dẫn `/user/:id`.

```javascript
app.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.hàm)
  next()
})
```


`Route handlers` cho phép bạn xác định nhiều `route` cho một đường dẫn. Ví dụ dưới đây xác định hai `route` cho các `request GET` đến đường dẫn `/user/:id`. Tuyến thứ hai sẽ không gây ra bất kỳ sự cố nào, nhưng nó sẽ không bao giờ được gọi vì tuyến đầu tiên kết thúc chu trình `request-response`.

Ví dụ này cho thấy một ngăn xếp con `middleware` xử lý các request `GET` đến đường dẫn `/user/:id`.

```javascript
app.get('/user/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
}, (req, res, next) => {
  res.send('User Info')
})

// Trình xử lý cho đường dẫn /user/:id, sẽ in userID mỗi lần chúng ta request
app.get('/user/:id', (req, res, next) => {
  res.send(req.params.id)
})
```


Để bỏ qua phần còn lại của các `Middleware function` khỏi ngăn xếp `middleware` của `Router`, hãy gọi `next('route')` để chuyển quyền kiểm soát cho tuyến tiếp theo. **LƯU Ý** : `next('route')` sẽ chỉ hoạt động trong các `Middleware function` đã được load bằng cách sử dụng các function `app.METHOD()` hoặc `router.METHOD()`.

Ví dụ này cho thấy một ngăn xếp con `middleware` xử lý các request `GET` đến đường dẫn `/user/:id`.

```javascript
app.get('/user/:id', (req, res, next) => {
  // Nếu ID người dùng là 0, hãy chuyển sang Route tiếp theo
  if (req.params.id === '0') next('route')
  // Nếu không thì chuyển quyền kiểm soát cho Middleware function tiếp theo trong ngăn xếp này
  else next()
}, (req, res, next) => {
  // send a regular response
  res.send('regular')
})

// Trình xử lý cho đường dẫn /user/:id, sẽ gửi một phản hồi text với dội dung là 'special'
app.get('/user/:id', (req, res, next) => {
  res.send('special')
})
```


Middleware cũng có thể được khai báo trong một `array` để có thể tái sử dụng.

Ví dụ này cho thấy một `array` có ngăn xếp con `middleware` xử lý các request `GET` đến đường dẫn `/user/:id`:

```javascript
function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logHàm (req, res, next) {
  console.log('Request Type:', req.hàm)
  next()
}

const logStuff = [logOriginalUrl, logHàm]
app.get('/user/:id', logStuff, (req, res, next) => {
  res.send('User Info')
})
```


Middleware cấp Router (Router-level middleware)
-------------------------------------

`Middleware cấp Router` hoạt động giống như `middleware` cấp ứng dụng, ngoại trừ nó bị ràng buộc với một `instance` của `express.Router()`.

```javascript
const router = express.Router()
```

Load `Middleware cấp Router` bằng cách sử dụng các function `router.use()` và `router.METHOD()`.

Ví dụ sau sao chép hệ thống `middleware` được hiển thị ở trên cho `middleware cấp ứng dụng`, bằng cách sử dụng `middleware cấp Router`:

```javascript
const express = require('express')
const app = express()
const router = express.Router()

// Không có đường dẫn gắn kết -> đoạn code này được thực thi cho mọi request
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// Middleware sub-stack hiển thị thông tin request cho bất kỳ loại HTTP request nào tới đường dẫn /user/:id
router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.hàm)
  next()
})

// Middleware sub-stack xử lý các request GET đến đường dẫn /user/:id
router.get('/user/:id', (req, res, next) => {
  // Nếu ID người dùng là 0, hãy chuyển sang bộ định tuyến tiếp theo
  if (req.params.id === '0') next('route')
  // Nếu không thì chuyển quyền kiểm soát cho Middleware function tiếp theo trong ngăn xếp này
  else next()
}, (req, res, next) => {
  // render a regular page
  res.render('regular')
})

// Trình xử lý cho đường dẫn /user/:id, sẽ gửi một phản hồi text với dội dung là 'special'
router.get('/user/:id', (req, res, next) => {
  console.log(req.params.id)
  res.render('special')
})

// Gắn bộ định tuyến router lên ứng dụng chính app
app.use('/', router)
```


Để bỏ qua phần còn lại của các `Middleware function` của `Router`, hãy gọi `next('router')` để chuyển quyền kiểm soát trở lại cho `Router instance`.

Ví dụ này cho thấy một ngăn xếp con `middleware` xử lý các request `GET` đến đường dẫn `/user/:id`.

```javascript
const express = require('express')
const app = express()
const router = express.Router()

router.use((req, res, next) => {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/user/:id', (req, res) => {
  res.send('hello, user!')
})

app.use('/admin', router, (req, res) => {
  res.sendStatus(401)
})
```


Error-handling middleware
-----------------------------

> Error-handling middleware luôn có **_bốn_** đối số. Bạn phải cung cấp bốn đối số để xác định nó là một Function Error Handling Middleware . Ngay cả khi bạn không cần sử dụng đối tượng `next`, bạn phải chỉ định nó để ứng dụng xác định đúng các signature. Nếu không, đối tượng `next` sẽ được hiểu là `middleware` thông thường và sẽ không xử lý được lỗi. -> thự tự là quan trọng nên các bạn ko được thay đổi vị trí các đối số.
`
Xác định các `Function Error Handling Middleware ` theo cách tương tự như các `Middleware function` khác, ngoại trừ với bốn đối số thay vì ba, cụ thể là với chữ ký `(err, req, res, next)`:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```


Middleware tích hợp (Built-in middleware)
----------------------------

Bắt đầu từ bản 4.x, Express không còn phụ thuộc vào [Connect](https://github.com/senchalabs/connect). Các Middleware function trước đây được bao chứa trong Express bây giờ nằm ​​trong các mô-đun riêng biệt; xem [danh sách các Middleware function](https://github.com/senchalabs/connect#middleware) .

Hiện tại Express có một số Middleware function tích hợp sau:

*   [express.static](https://expressjs.com/en/4x/api.html#express.static) cung cấp các nội dung tĩnh như tệp HTML, hình ảnh, v.v.
*   [express.json](https://expressjs.com/en/4x/api.html#express.json) phân tích cú pháp `JSON` của các `request`. **LƯU Ý: Có sẵn với Express 4.16.0+**
*   [express.urlencoded](https://expressjs.com/en/4x/api.html#express.urlencoded) phân tích cú pháp `URL-encoded` của các `request`. **LƯU Ý: Có sẵn với Express 4.16.0+**

Middleware của bên thứ ba (Third-party middleware)
----------------------------------

Sử dụng `middleware` của bên thứ ba để thêm `function` cho ứng dụng `Express`. Cái này thì có vô số kể hằng hà xa số các `middleware` để chúng ta sử dụng. [Danh sách một vài các Middleware bên thứ ba thường được sử dụng.](https://expressjs.com/en/resources/middleware.html)

Cài đặt mô-đun `Node.js` cho các chức năng cần thiết, sau đó `load` nó vào ứng dụng **của** bạn ở `App-level` hoặc `Router-level`.

Ví dụ sau minh họa việc cài đặt và tải `Middleware function` phân tích cú pháp `cookie` có tên là `cookie-parser`.

```console
$ npm install cookie-parser
```

```javascript
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```

Để biết danh sách một vài các Middleware của bên thứ ba thường được sử dụng với Express, hãy xem: [Third-party middleware](https://expressjs.com/en/resources/middleware.html).

Roundup
--------
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
------
* https://tuan200tokyo.blogspot.com/2022/11/blog30-huong-su-dung-middleware-trong.html