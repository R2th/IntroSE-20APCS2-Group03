![image.png](https://images.viblo.asia/d4e9f5af-10eb-4cf9-b017-49d1d624bc78.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một `upvote` và `đăng ký` để ủng hộ mình nhé 😊.

_**Error Handling**_ đề cập đến cách **Express** bắt và xử lý các lỗi xảy ra **synchronous** và **asynchronous**. **Express** đi kèm với một trình xử lý **Lỗi** mặc định, vì vậy bạn không cần phải viết nó để bắt đầu sử dụng.

Catching Errors
-------

Điều quan trọng là đảm bảo rằng **Express** nắm bắt được tất cả các lỗi xảy ra trong khi **route handlers** và **middleware** được run.

Các lỗi xảy ra trong code **synchronous** `Đồng bộ` bên trong **route handlers** và **middleware** không cần thực hiện thêm công việc nào. Nếu code **synchronous** tạo ra lỗi, thì **Express** sẽ bắt và xử lý nó. Ví dụ:

```javascript
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```
    

Đối với các lỗi trả về từ các hàm **asynchronous** `Bất đồng bộ` được gọi bởi **route handlers** và **middleware**, bạn phải chuyển chúng cho hàm `next()`, nơi **Express** sẽ bắt và xử lý chúng. Ví dụ:

```javascript
app.get('/', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})
```
    

Bắt đầu với **Express 5**, các **route handlers** và **middleware** trả về một `Promise` sẽ tự động gọi `next(value)` khi chúng bị `reject` hoặc `gặp lỗi`. Ví dụ:

```javascript
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id)
  res.send(user)
})
```
    

Nếu `getUserById` ném lỗi hoặc `reject`, `next` sẽ được gọi với `lỗi` đã ném hoặc `value` bị `reject`. Nếu không cung cấp `value` bị `reject`, `next` sẽ được gọi với đối tượng `Lỗi` mặc định do **Router Express** cung cấp.

Nếu bạn chuyển bất kỳ thứ gì vào hàm `next()` (ngoại trừ string `'route'`), **Express** coi **request** hiện tại là một `lỗi` và sẽ bỏ qua mọi **route handlers** và **middleware** tiếp theo và tới thẳng xử lý lỗi.

Nếu lệnh `callback` trong một chuỗi không cung cấp dữ liệu, chỉ có lỗi, bạn có thể đơn giản hóa code này như sau:

```js
app.get('/', [
  function (req, res, next) {
    fs.writeFile('/inaccessible-path', 'data', next)
  },
  function (req, res) {
    res.send('OK')
  }
])
```
    

Trong ví dụ trên `next` được cung cấp dưới dạng `callback` cho `fs.writeFile`, được gọi có hoặc không có lỗi. Nếu không có lỗi, trình xử lý thứ hai sẽ được thực thi, ngược lại **Express** sẽ bắt và xử lý lỗi.

Bạn phải bắt lỗi xảy ra trong code **asynchronous** được gọi bởi `route handlers` hoặc `middleware` và chuyển chúng cho **Express** để xử lý. Ví dụ:

```js
app.get('/', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN')
    } catch (err) {
      next(err)
    }
  }, 100)
})
```
    

Ví dụ trên sử dụng một khối `try...catch` để bắt lỗi trong code `asynchronous` và chuyển chúng cho `Express`. Nếu khối `try...catch` được bỏ qua, `Express` sẽ không bắt lỗi vì nó không phải là một phần của code xử lý `synchronous`.

Sử dụng các **`promise`** để thay thế cho khối `try...catch` hoặc khi sử dụng các hàm trả về `promise`. Ví dụ:

```javascript
app.get('/', (req, res, next) => {
  Promise.resolve().then(() => {
    throw new Error('BROKEN')
  }).catch(next) // Errors will be passed to Express.
})
```
    

Vì các **promise** tự động bắt cả lỗi `synchronous` và các **promise** bị `reject`, bạn có thể chỉ cần cung cấp làm `next` trình xử lý bắt cuối cùng và **Express** sẽ bắt lỗi, vì trình xử lý bắt được cung cấp lỗi làm đối số đầu tiên.

Bạn cũng có thể sử dụng một chuỗi các trình xử lý để dựa vào việc bắt lỗi `synchronous`, bằng cách giảm code `asynchronous` thành một cái gì đó nhỏ. Ví dụ:

```javascript
app.get('/', [
  function (req, res, next) {
    fs.readFile('/maybe-valid-file', 'utf-8', (err, data) => {
      res.locals.data = data
      next(err)
    })
  },
  function (req, res) {
    res.locals.data = res.locals.data.split(',')[1]
    res.send(res.locals.data)
  }
])
```
    

Ví dụ trên sử dụng câu lệnh phổ biến từ đối tương `readFile`. Nếu `readFile` gây ra lỗi, thì nó sẽ chuyển lỗi cho **Express**, nếu không, bạn sẽ nhanh chóng quay lại `Global Error Handling synchronous` trong trình xử lý tiếp theo trong chuỗi. Sau đó, nó sẽ cố gắng xử lý dữ liệu. Nếu điều này không thành công thì trình `Error Handling synchronous` sẽ bắt nó. Nếu bạn đã thực hiện quá trình xử lý này bên trong lệnh `readFile` **callback** thì ứng dụng có thể thoát và trình `Error Handling Express` sẽ không chạy.

Cho dù bạn sử dụng hàm nào, nếu bạn muốn các trình `Error Handling Express` được gọi đến và ứng dụng vẫn có thể tồn tại, bạn phải đảm bảo rằng `Express` nhận được lỗi.
> Đoạn này giải thích hơi khó hiểu nhưng ko sao bạn đọc hết bài này sẽ hiểu đoạn này mình muốn nói gì.

Default Error handler
------------------------

**Express** tích hợp một trình xử lý `lỗi` giúp xử lý mọi lỗi có thể gặp phải trong ứng dụng. `Middleware function Error Handling` mặc định này được thêm vào cuối ngăn xếp `Middleware`.

Nếu bạn chuyển một lỗi đến `next()` và bạn không xử lý nó trong một trình xử lý `lỗi` tùy chỉnh, nó sẽ được xử lý bởi trình xử lý `lỗi` tích hợp sẵn; lỗi sẽ được ghi cho `Client` với `Stack Trace`. **Stack Trace** không được cung cấp trong môi trường `production environment`.

Đặt biến môi trường `NODE_ENV`thành `production`, để chạy ứng dụng ở chế độ `production environment`.

Khi một lỗi được ghi, thông tin sau sẽ được thêm vào `response`:

*   Đặt `res.statusCode` từ `err.status` (hoặc `err.statusCode`). Nếu `value` này nằm ngoài phạm vi `4xx` hoặc `5xx`, nó sẽ được đặt thành 500.
*   Đặt `res.statusMessage` theo code trạng thái.
*   Phần nội dung sẽ là `HTML` của thông báo code trạng thái khi ở trong môi trường `production`, nếu không sẽ là `err.stack`.
*   Bất kỳ headers nào được chỉ định trong một đối tượng `err.headers`.

Nếu bạn gọi `next()` gặp lỗi sau khi bắt đầu `response` (ví dụ: nếu bạn gặp lỗi khi truyền `response` tới `Client`), trình xử lý `lỗi` mặc định **Express** sẽ đóng kết nối và không thực hiện được **request**.

Vì vậy, khi bạn thêm trình xử lý `lỗi` tùy chỉnh, bạn phải ủy quyền cho trình xử lý `lỗi` **Express** mặc định, khi các **headers** đã được gửi đến **Client**:

```javascript
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}
```
    

Lưu ý rằng trình xử lý `lỗi` mặc định có thể được kích hoạt nếu bạn gọi `next()` nhiều lần với lỗi trong code của mình, ngay cả khi có sẵn `middleware Error Handling` tùy chỉnh.

Viết một trình xử lý `Lỗi`
--------------------

Xác định các `Middleware function Error Handling` theo cách tương tự như các `Middleware function` khác, ngoại trừ các `function Error Handling` có bốn đối số thay vì ba. Ví dụ:`(err, req, res, next)`.

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```
    

Bạn xác phải khai báo `middleware Error Handling` cuối cùng, sau các việc gọi các `app.use()` khác và `Router`; Ví dụ:

```javascript
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use((err, req, res, next) => {
  // logic
})
```
    

`Response` từ bên trong một **Middleware function** có thể ở bất kỳ định dạng nào, chẳng hạn như trang lỗi `HTML`, thông báo đơn giản hoặc là một `string JSON`.

Đối với `organizational` (và framework cấp cao hơn - `higher-level framework`), bạn có thể xác định một số `Middleware function Error Handling`, giống như cách bạn làm việc với các `Middleware function` thông thường. Ví dụ: để xác định một trình xử lý `lỗi` cho các `request` được thực hiện bằng cách sử dụng `XHR` và những `request` không có:

```javascript
const bodyParser = require('body-parser')
const hàmOverride = require('hàm-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(hàmOverride())
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
```
    

Trong ví dụ này, thông tin chung `logErrors` có thể ghi `request` và thông tin lỗi `stderr`, ví dụ:

```javascript
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
```
    

Cũng trong ví dụ này, `clientErrorHandler` được định nghĩa như sau: Lỗi được chuyển một cách rõ ràng cho lỗi tiếp theo.

Lưu ý rằng khi _không_ gọi `next` trong một hàm `Error Handling`, bạn có trách nhiệm phải viết (và kết thúc) `response`. Nếu không, những `request` đó sẽ "**`treo`**" và dần dần sẽ tràn bộ nhớ :D.

```javascript
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
```
    

Implement function "`catch-all`" có tên `errorHandler` như sau (ví dụ):

```python
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
```
    

Nếu bạn có một trình xử lý `Route` với nhiều hàm `callback`, bạn có thể sử dụng tham số `route` để chuyển sang trình xử lý tuyến tiếp theo. Ví dụ:

```javascript
app.get('/a_route_behind_paywall',
  (req, res, next) => {
    if (!req.user.hasPaid) {
      // continue handling this request
      next('route')
    } else {
      next()
    }
  }, (req, res, next) => {
    PaidContent.find((err, doc) => {
      if (err) return next(err)
      res.json(doc)
    })
  })

app.get('/a_route_behind_paywall',
  (req, res, next) => {
    // Nếu ko có next('route') thì route này sẽ ko bao giờ được thực thi
    next()
  })
```
    

Trong ví dụ này, trình xử lý `getPaidContent` sẽ bị bỏ qua nhưng bất kỳ trình xử lý nào còn lại trong `app` xử lý cho `Route` cho `/a_route_behind_paywall` sẽ tiếp tục được thực thi.

Việc gọi đến `next()` và `next(err)` cho biết rằng trình xử lý hiện tại đã hoàn tất và ở giai đoạn nào. `next(err)` sẽ bỏ qua tất cả các trình xử lý còn lại trong chuỗi ngoại trừ những trình xử lý được thiết lập để `Error Handling` như được mô tả ở trên.

Roudup
-------
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
-----
* https://tuan200tokyo.blogspot.com/2022/11/blog34-error-handling-trong-nodejs.html