![image.png](https://images.viblo.asia/16efd631-d00c-4151-8dc4-0b2fc8958c40.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

_Route_ đề cập đến cách các `endpoint` (URI) của ứng dụng phản hồi các `request` của `client`.

Việc xác định `Route` bằng các hàm của đối tượng `app Express` sẽ tương ứng với các hàm HTTP; ví dụ: `app.get()` để xử lý các request `GET` và `app.post` để xử lý các request `POST`. Để có danh sách đầy đủ, hãy xem `app.METHOD`. Bạn cũng có thể sử dụng `app.all()` để xử lý tất cả các hàm `HTTP` và `app.use()` để chỉ định một hàm `middleware` làm `function callback`

Các hàm `Route` này chỉ định một hàm `callback` (đôi khi được gọi là “`handler functions - hàm xử lý`”) được gọi khi ứng dụng nhận được `request` đến Route được chỉ định (`endpoint`) và hàm `HTTP`. Nói cách khác, ứng dụng “`listens - lắng nghe`” các `request` khớp với các Route và các hàm được chỉ định từ trước, và khi phát hiện thấy khớp, ứng dụng sẽ gọi hàm `callback` được chỉ định.

Trên thực tế, các hàm `Route` có thể có nhiều hơn một hàm `callback` làm đối số. Với nhiều hàm `callback`, điều quan trọng là phải cung cấp một hàm `next` như một đối số cho hàm `callback` và sau đó gọi `next()` bên trong phần thân của hàm để chuyển quyền kiểm soát cho lần `callback` tiếp theo.

Đoạn code sau đây là một ví dụ về một `route` rất cơ bản.

```javascript
const express = require('express')
const app = express()

// Phản hồi lại với Client bằng đoạn text "hello world" khi yêu cầu GET được gửi đến trang chủ
app.get('/', (req, res) => {
  res.send('hello world')
})
```


Route methods
----------------------

Các hàm `Route` có nguồn gốc từ một trong các hàm `HTTP` và được đính kèm với một `instance` của lớp `express`.

Đoạn `code` sau là một ví dụ về các `Route` được xác định cho các hàm `GET` và `POST` tới thư mục gốc của ứng dụng.

```javascript
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})
```


Express hỗ trợ các hàm tương ứng với tất cả các hàm request **HTTP**: `get`,, `post`v.v. Để có danh sách đầy đủ, hãy xem `app.METHOD`.

Có một hàm `Route` đặc biệt là `app.all()`, được sử dụng để tải các `function middleware` tại một đường dẫn cho **_tất cả_** các hàm `request HTTP`. Ví dụ: trình xử lý sau được thực thi cho các `request` đến `Route` “`/secret`” cho dù sử dụng `GET`, `POST`, `PUT`, `DELETE` hoặc bất kỳ hàm `request HTTP` nào khác được hỗ trợ trong [mô-đun http](https://nodejs.org/api/http.html#http_http_hàms) .

```javascript
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```


Route paths
---------------

Các `Route paths`, kết hợp với một hàm `request`, xác định các `endpoint` mà tại đó các `request` có thể được thực hiện. `Route paths` có thể là `string`, `string patterns` hoặc `regular expressions`.

Các ký tự `?`, `+`, `*` và `()` là các tập hợp con của các đối số `regular expressions`. Dấu gạch nối `(-)` và dấu chấm `(.)` được hiểu theo nghĩa đen bằng các đường dẫn dựa trên `string`.

Nếu bạn cần sử dụng ký tự đô la (`$`) trong một `đường dẫn string`, hãy đặt nó bên trong `([`xxx`])`. Ví dụ: `path string` cho các `request` tại “`/data/$book`”, sẽ là “`/data/([\$])book`”.

`Express` sử dụng [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) để khớp với các `Route paths`.

`Query strings` không phải là một phần của `Route paths`.

Dưới đây là một số ví dụ về `Route paths` dựa trên `string`.

`Route paths` này sẽ khớp với request với Route `/`:
```javascript
app.get('/', (req, res) => {
  res.send('root')
})
```

`Route paths` này sẽ khớp với các request tới `/about`.
```python
app.get('/about', (req, res) => {
  res.send('about')
})
```

`Route paths` này sẽ khớp với các request tới `/random.text`.
```javascript
app.get('/random.text', (req, res) => {
  res.send('random.text')
})
```

Dưới đây là một số ví dụ về `Route paths` dựa trên các `string patterns`.

`Route paths` này sẽ phù hợp `acd` và `abcd`.
```javascript
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```


`Route paths` này sẽ khớp `abcd`, `abbcd`, `abbbcd` v.v.
```javascript
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```

`Route paths` này sẽ khớp với `abcd`, `abxcd`, `abRANDOMcd`, `ab123cd` v.v.
```javascript
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})
```


`Route paths` này sẽ phù hợp `/abe`và `/abcde`.
```javascript
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
```


Ví dụ về `Route paths` dựa trên regular expressions:

`Route paths` này sẽ khớp với bất kỳ thứ gì có chữ “a” trong đó.
```javascript
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```


Route paths này sẽ khớp `butterfly` và `dragonfly`, nhưng không `butterflyman`, `dragonflyman`v.v.
```javascript
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
```


### Route parameters (Tham số của route)

`Route parameters` (Tham số của route) là các `phân đoạn URL` được đặt tên được sử dụng để truyền các giá trị được chỉ định tại vị trí của chúng trong `URL`. Các `value` đã thu thập được điền vào đối tượng `req.params`, với tên của `Route parameters` được chỉ định trong đường dẫn dưới dạng các khóa tương ứng của chúng.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```


Để xác định các `route` với các tham số của `route`, chỉ cần xác định các `route parameters` trong đường dẫn dưới đây.
```javascript
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params) // kết quả sẽ là { "userId": "...", "bookId": "..." }
})
```


Tên của các `Route parameters` phải được tạo thành từ `các ký tự ([A-Za-z0-9])`.

Vì dấu gạch nối ( `-`) và dấu chấm ( `.`) được hiểu theo nghĩa đen, chúng có thể được sử dụng cùng với các `Route parameters` cho các mục đích hữu ích.

```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```


```
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```


Để có nhiều quyền kiểm soát hơn đối với string có thể được so khớp bởi `Route parameters`, bạn có thể thêm một `regular expressions` trong dấu ngoặc đơn ( `()`):

```
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```


Vì `regular expressions` thường là một phần của `string`, hãy đảm bảo rằng luôn có ký tự `\` vào các ký tự nào có thêm dấu gạch chéo ngược, chẳng hạn `\d+`.

Trong Express 4.x, [ký tự `*` trong `regular expressions` không được diễn giải theo cách thông thường](https://github.com/expressjs/express/issues/2495). Giải pháp thay thế, hãy sử dụng `{0,}`thay vì `*`. Express 5 điều này đã được khắc phục.

Route handlers
-----------------------

Bạn có thể cung cấp nhiều `function callback` hoạt động giống như `middleware` để xử lý một `request`. Ngoại lệ duy nhất là các lệnh `callback` này có thể gọi `next('route')` để bỏ qua các lệnh `callback` còn lại. Bạn có thể sử dụng cơ chế này để áp đặt các điều kiện trước cho một `route`, sau đó chuyển quyền kiểm soát cho các `route` tiếp theo nếu không có lý do gì để tiếp tục với `route` hiện tại.

Các trình xử lý `Route` có thể ở dạng một hàm, một `array` các hàm hoặc kết hợp cả hai, như trong các ví dụ sau.

Một hàm `callback` duy nhất có thể xử lý một `route`. Ví dụ:

```javascript
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})
```


Nhiều hàm `callback` có thể xử lý một `route` (đảm bảo bạn chỉ định đối tượng `next`). Ví dụ:

```javascript
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})
```


Một mảng các hàm `callback` có thể xử lý một `route`. Ví dụ:

```javascript
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

const cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```


Hoặc kết hợp các hàm độc lập và array (*hoặc theo bất cứ cách nào bạn thích*) cũng có thể xử lý một route. Ví dụ:

```python
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
})
```


Response methods
------------------------

Các hàm của đối tượng phản hồi (`res`) trong bảng sau có thể gửi phản hồi đến client và chấm dứt chu kỳ  `request-response`. Nếu không có hàm nào trong số này được gọi từ trình xử lý `Route`, thì `request client` sẽ bị treo.


| Hàm      | Mô tả |
| ----------- | ----------- |
| res.download()| Thông báo tệp đã được tải xuống máy client. | 
| res.end()| Kết thúc quá trình phản hồi. | 
| res.json()| Gửi phản hồi với JSON.| 
| res.jsonp()| Gửi phản hồi JSON với hỗ trợ JSONP.| 
| res.redirect()| Chuyển hướng một request.| 
| res.render()| Render một template có thể là 1 file HTML.| 
| res.send()| Gửi phản hồi của nhiều loại khác nhau. (cái này là gửi chung hết thích gửi gì gửi)| 
| res.sendFile()| Gửi tệp dưới dạng `octet stream`.| 
| res.sendStatus()| Phản hồi status | 


`app.route()`
------------

Bạn có thể tạo các trình `route handlers` có thể điều khiển được cho một `Route paths` bằng cách sử dụng `app.route()`. Bởi vì đường dẫn được chỉ định tại một vị trí duy nhất, việc tạo các `route` theo `mô-đun` rất hữu ích, cũng như giảm bớt sự dư thừa và lỗi chính tả. 

Dưới đây là một ví dụ về các `route handlers` được xác định bằng cách sử dụng `app.route()`.

```javascript
app.route('/book')
  .get((req, res) => {
res.send('Get a random book')
  })
  .post((req, res) => {
res.send('Add a book')
  })
  .put((req, res) => {
res.send('Update the book')
  })
```


`express.Router`
--------------

Sử dụng lớp `express.Router` để tạo các trình xử lý `Route` có thể xuất theo `mô-đun`. Một **Instance** của `Router` là một hệ thống các `Route` và `middleware` hoàn chỉnh; vì lý do này, nó thường được gọi là “`mini-app`”. Đại khái nó có thể được coi như là một app hoàn chỉnh nhưng dạng module nhỏ trong một app lớn.

Ví dụ sau tạo một bộ `Route` dưới dạng `mô-đun`, tải một `function middleware` trong đó, xác định một số `Route` và sau đo import `mô-đun Route` trên một đường dẫn trong ứng dụng chính.

Tạo tệp `Route` có tên `birds.js` trong thư mục của ứng dụng, với nội dung sau:

```javascript
const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
```


Sau đó, import mô-đun `Route` trong ứng dụng của chúng ta:

```javascript
const birds = require('./birds')

// ...

app.use('/birds', birds)
```


Giờ đây, ứng dụng sẽ có thể xử lý các request đến `/birds` và `/birds/about` cũng như gọi hàm `middleware` `timeLog` cụ thể cho route.

Roundup
--------

Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
-----
* https://tuan200tokyo.blogspot.com/2022/11/blog28-routing-trong-nodejs-express.html