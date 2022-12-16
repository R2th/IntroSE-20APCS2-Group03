![image.png](https://images.viblo.asia/9f0cd74c-2072-4317-b68c-9df0b76b846d.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Tổng quan
---------

_Các_ hàm `middleware` là các hàm có quyền truy cập vào đối tượng request (`req`), đối tượng response(`res`) và hàm `next` trong chu trình `request-response` của ứng dụng. Hàm `next` này là một hàm trong `Routing Express`, khi được gọi, sẽ thực thi `middleware` kế tiếp ngay sau `middleware` hiện tại trong `stack`.

Các hàm `middleware` có thể thực hiện các tác vụ sau:

*   Thực thi bất kỳ `logic code` nào mà bạn muốn.
*   Thực hiện các thay đổi đối với các đối tượng `request` và các đối tượng `response`.
*   Kết thúc chu kỳ `request-response`.
*   Gọi `middleware` tiếp theo trong `call-stack` (ngăn xếp).

Nếu hàm `middleware` hiện tại không kết thúc chu kỳ `request-response`, nó phải gọi hàm `next()` để chuyển quyền điều khiển cho hàm `middleware` tiếp theo. Nếu không, `request` sẽ bị treo. **(Cái này rất quan trọng nên các bạn chú ý nhé)**

Hình sau cho thấy các phần tử của hàm middleware:

![](https://miro.medium.com/max/1042/1*uwNmNlj_t6NSVLULu3R5ug.png)

Bắt đầu với `Express 5`, các hàm `middleware` trả về một `Promise` sẽ gọi `next(value)` khi chúng từ chối hoặc gặp lỗi. Hàm `next` sẽ được gọi với `value` bị từ chối hoặc Lỗi được ném ra.

Một số ví dụ `KINH ĐIỂN`
------

Đây là một ví dụ về ứng dụng `Express` “`Hello World`” đơn giản. Phần còn lại của bài viết này sẽ giới thiệu và thêm ba hàm `middleware kinh điển`: hàm đầu tiên được gọi là `myLogger` sẽ in một thông báo nhật ký đơn giản, một cái khác được gọi là `requestTime` sẽ hiển thị dấu thời gian của `request HTTP` và hàm còn lại được gọi là `validateCookies` authentication các `cookie` được gửi đến `server`. 

```javascript
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```


### Hàm middleware: myLogger

Đây là một ví dụ đơn giản về hàm `middleware` được gọi là “`myLogger`”. Hàm này chỉ in đoạn text “`LOGGED`” khi một `request` được gửi đến ứng dụng. Hàm `middleware` được gán cho một biến có tên `myLogger`.

```javascript
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```


> Lưu ý ở trên việc gọi tới hàm `next()` này sẽ gọi hàm `middleware` tiếp theo trong ứng dụng. Hàm `next()` không phải là một phần của `Node.js` hoặc `Express API`, nhưng là đối số thứ ba được chuyển cho hàm `middleware`. Hàm `next()` có thể được đặt tên tùy ý có thể là bất kỳ thứ gì, nhưng theo quy ước, nó luôn được đặt tên là “`next`”. Để tránh nhầm lẫn, hãy luôn sử dụng quy ước này.

Để sử dụng hàm `middleware`, hãy gọi `app.use()` và chỉ định hàm `middleware` làm đối số. Ví dụ, đoạn code sau tải hàm middleware `myLogger` trước khi `Routing` đến đường dẫn gốc (`/`).

```javascript
const express = require('express')
const app = express()

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```


Mỗi khi ứng dụng nhận được một `request`, nó sẽ in đoạn text “`LOGGED`” lên `terminal`.

> Lưu ý: Thứ tự tải `middleware` rất quan trọng: các hàm `middleware` được tải trước cũng được thực thi trước.

Nếu `myLogger` được tải sau `route` dẫn đến đường dẫn gốc (`/`), `request` sẽ không bao giờ in “`LOGGED`”, vì `route handler` của đường dẫn gốc chấm dứt chu kỳ `request-response` trước khi `load` `middleware` `myLogger` :D.

Hàm middleware `myLogger` chỉ đơn giản là in một đoạn `text`, sau đó chuyển `request` đến hàm `middleware` tiếp theo trong ngăn xếp bằng cách gọi hàm `next()`.

### Hàm middleware: requestTime

Tiếp theo, chúng ta sẽ tạo một hàm `middleware` được gọi là “`requestTime`” và thêm một thuộc tính được gọi `requestTime` vào `đối tượng request`. *Đây là một tính năng mạnh mẽ của Middleware giúp ta thêm bất kỳ `data` gì vào `req` và `res` và cứ thế gửi nó thông qua `callback` của các `middleware` tiếp theo vào thế là dữ liệu có thể đi tới mọi nợi mà chúng ta muôn (Quá đỉnh).*

```javascript
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

Ứng dụng hiện sử dụng hàm middleware `requestTime`. Ngoài ra, hàm `callback` của route (`/`) sử dụng thuộc tính mà hàm `middleware` đã thêm vào `req` (`đối tượng request`).

```javascript
const express = require('express')
const app = express()

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>'
  responseText += `<small>Requested at: ${req.requestTime}</small>`
  res.send(responseText)
})

app.listen(3000)
```


Khi bạn thực hiện `request` tới (`/`), ứng dụng hiện hiển thị dấu thời gian `request` của bạn trong trình duyệt.

### Hàm middleware: validateCookies

Cuối cùng, chúng ta sẽ tạo một hàm `middleware` để `validate` các `Cookies` đến và gửi phản hồi `status 400` nếu `cookie` không hợp lệ.

Đây là một ví dụ về hàm `validateCookies` với một `service asynchronous` bên ngoài. (cứ ví dụ như mình dùng hàm externallyValidateCookie của một ông nào đố code hoặc của một bên thứ 3 cũng được)

```javascript
async function cookieValidator (cookies) {
  try {
    await externallyValidateCookie(cookies);
    // Nếu các bạn muốn chạy thử có thể thay thế bằng 1 Promise bất kỳ
    // await new Promise((resolve) => resolve(cookies)); 
  } catch {
throw new Error('Invalid cookies')
  }
}
```


Ở đây chúng ta sử dụng middleware `cookie-parser` (nếu bạn chưa cài thì cứ: `npm i cookie-parser` là sẽ cài đặt được `middleware` này) để phân tích các `cookie` đến từ đối tượng `req` và chuyển chúng đến hàm `cookieValidator` của chúng ta. Middleware `validateCookies` trả về một `Promise` mà khi bị Reject sẽ tự động kích hoạt trình `error Handling` của chúng ta.

```javascript
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// Hiện tại mình MOCK đơn giản hàm này như vậy.
// Trong thực tế nó có thể là một thư viện hoặc một cái gì gì đấy trả về 1 Promoise.v.v.
const externallyValidateCookie = (cookies) => new Promise((resolve) => resolve(cookies));

async function cookieValidator(cookies) {
  try {
    await externallyValidateCookie(cookies);
  } catch {
    throw new Error("Invalid cookies");
  }
}

async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies || "cookies");
  console.log("req.cookies :>> ", req.cookies);
  next();
}

app.use(validateCookies);

app.get("/", (req, res) => {
  let responseText = "Hello World!<br>";
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.listen(3000);
```


Lưu ý cách gọi `next()` sau `block-code` `await cookieValidator(req.cookies)`: Điều này đảm bảo rằng nếu `cookieValidator` được giải quyết, `middleware` tiếp theo trong ngăn xếp sẽ được gọi. Nếu bạn chuyển bất kỳ thứ gì vào làm đối số cho hàm `next()` (ngoại trừ string `'route'`hoặc `'router'`), `Express` sẽ coi như `request` hiện tại hặp lỗi và sẽ bỏ qua mọi `function Routing` và `middleware` đi thẳng đến vị trí `error handler`.

> Bởi vì chúng ta có quyền truy cập vào `đối tượng request`, `đối tượng response` và các `hàm middleware` tiếp theo trong `ngăn xếp` và `toàn bộ API Node.js` => khả năng của hàm middleware là vô tận và nó có thể làm mọi thứ. NAI SƠ :D


Configurable middleware
----------------------------------------

Nếu bạn cần `middleware` của mình có thể định các `configure` một cách linh hoạt, hãy `exports` một hàm chấp nhận một đối tượng tùy chọn hoặc các tham số khác, sau đó trả về một `middleware` dựa trên các tham số `input`. (Nó gần gần như `Abstract Factory Design Pattern`)

Ví dụ mình tạo 1 file: `my-middleware.js`

```javascript
module.exports = function (options) {
  return function (req, res, next) {
// Implement the middleware function based on the options object
next()
  }
}
```


Middleware bây giờ có thể được sử dụng như hình dưới đây.

```javascript
const mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

Roundup
------
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉2

Ref
----
* https://tuan200tokyo.blogspot.com/2022/11/blog29-tao-mot-middleware-chuan-chinh.html