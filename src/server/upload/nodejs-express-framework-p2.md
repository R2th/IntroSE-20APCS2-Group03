Tiếp tục serie đào sâu node.js ta sẽ tìm hiểu xem tiếp các khái niệm về template, debug và xử lý lỗi trong Express. 

# Template

Express thường được sử dụng để xuất API cho các framework frontend như Angular, React hay Vue. Tuy nhiên trong vài trường hợp người ta sẽ kết xuất ra các trang HTML ngay tại Express. Để làm được điều này Express sử dụng các template engine, tức là các công cụ viết file HTML nhưng đồng thời cũng có thể truyền dữ liệu vào trong đấy và tái sử dụng nhiều lần(tương tự như Blade trong Laravel hay Haml trong Ruby on Rails).

Các template engine phổ biến trong Express là:
- [**ejs**](https://ejs.co)
- [**pug**](https://pugjs.org/api/getting-started.html)
- [**hbs**](https://handlebarsjs.com)

Để sử dụng template trong Express, trước tiên ta cần tải package về:

```
npm install ejs
```

Sau đấy tạo một thư mục là **views**, tại khởi tạo `app` ta dùng `view engine` để khai báo template mà ta sử dụng:

```javascript
// ...
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// ...
```

## Ví dụ

Vì ở đây cả 3 template đều có điểm tương đồng khi sử dụng, nên mình sẽ chỉ làm mẫu với ejs. 

### Tạo partial

Tương tự như các template khác, để dễ dàng cho hiển thị ejs ta sẽ cần một thư mục là **partials** (bên trong thư mục views), tại đây sẽ lưu những thành phần cố định không đổi của trang web như *header*, *footer*,... 

Ta có file head cho các khai báo meta của trang web

```html
<meta charset="UTF-8">
<title>EJS Is Fun</title>

<!-- CSS (load bootstrap from a CDN) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css">
<style>
  body { padding-top:50px; }
</style>
```

Kế đến ta tạo header cho navbar trang web:

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">EJS Is Fun</a>
  <ul class="navbar-nav mr-auto">
    <li class="nav-item">
      <a class="nav-link" href="/">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/about">About</a>
    </li>
  </ul>
</nav>
```

Cuối cùng là footer:

```html
<p class="text-center text-muted">&copy; Copyright 2020 The Awesome People</p>
```

Như vật là đã xong ở thư mục partials.

### Thêm partials vào views

Để có thể sử dụng các file trong partials như những layout chính cho trang web. Ta sử dụng `include`.

```
<%- include('RELATIVE/PATH/TO/FILE') %>
```

Ta tạo một thư mục là *pages* để chứa nội dung trang web. Trong đây ta tạo file index - trang giao diện chính.

```xml
<!DOCTYPE html>
<html lang="en">
<head>
  <%- include('../partials/head'); %>
</head>
<body class="container">

<header>
  <%- include('../partials/header'); %>
</header>

<main>
  <div class="jumbotron">
    <h1>This is great</h1>
    <p>Welcome to templating using EJS</p>
  </div>
</main>

<footer>
  <%- include('../partials/footer'); %>
</footer>

</body>
</html>
```

Như vậy ta đã có được giao diện trang web, để liên kết với server tại `app` ta thiết lập định tuyến như sau:

```javascript
const express = require('express');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.listen(8080);
console.log('Server is listening on port 8080');
```

Lúc này gọi lệnh

```
node index.js
```

ta sẽ có được giao diện như sau:

![ejs](https://ren0503.github.io/assets/img/nodejs/ejs1.png)

### Truyền dữ liệu vào

Để truyền dữ liệu vào cho ejs hiển thị, tại chỗ định tuyến, ta gửi mảng hoặc đối tượng dữ liệu về thông qua `res.render`.

```javascript
const express = require('express');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline
  });
});

app.listen(8080);
console.log('Server is listening on port 8080');
```

Sau đó tại ejs ta hiển thị dữ liệu dựa trên dạng đối tượng truyền về:

```xml
<!DOCTYPE html>
<html lang="en">
<head>
  <%- include('../partials/head'); %>
</head>
<body class="container">

<header>
  <%- include('../partials/header'); %>
</header>

<main>
  <div class="jumbotron">
    <h1>This is great</h1>
    <p>Welcome to templating using EJS</p>

    <h2>Variable</h2>
    <p><%= tagline %></p>

    <ul>
      <% mascots.forEach(function(mascot) { %>
        <li>
          <strong><%= mascot.name %></strong>
          representing <%= mascot.organization %>,
          born <%= mascot.birth_year %>
        </li>
      <% }); %>
    </ul>
  </div>
</main>

<footer>
  <%- include('../partials/footer'); %>
</footer>

</body>
</html>
```

*Lưu ý dữ liệu gửi về từ `app` và dữ liệu xuất tại ejs cần phải đồng nhất với nhau.*

Lúc này giao diện ta có được sẽ là:

![ejs](https://ren0503.github.io/assets/img/nodejs/ejs2.png)

# Xử lý lỗi

## Code đồng bộ

Code đồng bộ đề cập đến các đoạn mã được thực thi tuần tự và từng lệnh một. Khi một lỗi gặp phải trên code đồng bộ, Express sẽ tự động bắt nó. Dưới đây là một ví dụ về hàm routing trong đó ta mô phỏng điều kiện lỗi bằng cách đưa ra một lỗi:

```javascript
app.get('/', (req, res) => {
  throw new Error("Hello error!")
})
```

Express bắt lỗi này cho và phản hồi cho client status code, thông báo và cả trace stack (trong môi trường dev).

![error](/assets/img/nodejs/error1.png)

Tất cả nhờ vào việc Express sẽ chèn một error handle middleware mặc định vào sau mỗi hàm middleware của ta. Việc xử lý tự động này giúp ta giảm được việc sử dụng các khối lệnh `try/catch` cồng kềnh và các lệnh gọi built-in middleware đồng thời cung cấp các hàm xử lý lỗi mặc định .

```javascript
app.get('/', (req, res, next) => {
  try {
      throw new Error("Hello error!")
  }
  catch (error) {
      next(error)
  }
})
```

## Code bất đồng bộ

Khi viết code server-side, hầu hết code của ta đều sẽ dựa trên logic javascript bất đồng bộ để đọc và ghi file trên máy chủ, truy vấn cơ sở dữ liệu và thực hiện các request API. Ta sẽ đưa lỗi vào trong hàm `setTimeout()` và xem Express có thể bắt được lỗi không:

```javascript
app.get('/', (req, res) => {
  setTimeout(() => {
      console.log("Async code example.")
      throw new Error("Hello Error!")
  }, 1000)
})
```

![error](/assets/img/nodejs/error2.png)
*Express không thể bắt được lỗi từ code bất đồng bộ*

Để xử lý các lỗi phát sinh trong quá trình thực thi code không đồng bộ trong Express (phiên bản <5.x), các dev phải tự bắt lỗi và gọi built-in error handler middleware bằng hàm `next()`. Đây là cách thực hiện:

```javascript
app.get('/', (req, res, next) => {
  setTimeout(() => {
      try {
          console.log("Async code example.")
          throw new Error("Hello Error!")
      } catch (error) { // manually catching
          next(error) // passing to default middleware error handler
      }
  }, 1000)
})
```

![error](/assets/img/nodejs/error3.png)

Điều tốt hơn ở đây là ta đã bắt được lỗi và server không gặp sự cố, tuy nhiên vẫn khá cồng kềnh vì hàm `setTimeout()` không trả về một **Promise**. Vì thế ta không thể kết nối nhanh chóng với hàm `catch()`. Tuy nhiên hầu hết các thư viện hỗ trợ bất đồng bộ ngày nay đều trả về một **Promise** (vd file system API), dưới đây là ví dụ về cách bắt lỗi bằng **Promise**.

```javascript
const fsPromises = require('fs').promises
app.get('/', (req, res, next) => {
  fsPromises.readFile('./no-such-file.txt')

     .then(data => res.send(data))

     .catch(err => next(err)) 
})
```
*Lưu ý: Kể từ Express 5.0 (hiện vẫn đang là bản alpha) sẽ trả về error (hoặc reject) bằng cách trả về một Promise.*

## Xử lý lỗi tuỳ chỉnh

Các tự động xử lý lỗi của Express sẽ khá hữu ích với những người mới bắt đầu, nhưng có vài tổ chức hay các dev khác muốn xử lý lỗi theo cách của riêng họ như là lưu tất cả vào một file logs, hoặc gửi cảnh báo đến người dùng hoặc điều hướng sang một trang khác.

## Tuỳ chỉnh với mỗi route

Ta có một ví dụ về xử lý lỗi với mỗi route khác nhau:

```javascript
const express = require('express')
const fsPromises = require('fs').promises;

const app = express()
const port = 3000

app.get('/one', (req, res) => {
  fsPromises.readFile('./one.txt')
    .then(data => res.send(data))
    .catch(err => { // error handling logic 1
        console.error(err) // logging error
        res.status(500).send(err)
    })
})

app.get('/two', (req, res) => {
  fsPromises.readFile('./two.txt')
    .then(data => res.send(data))
    .catch(err => { // error handling logic 2
        console.error(err)
        res.redirect('/error') // redirecting user
    })
})

app.get('/error', (req, res) => {
  res.send("Custom error landing page.")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

Ở đây với hai route ta có hai logic cho việc xử lý lỗi khác nhau. Điều này có thể tạo ra sự dư thừa và không tốt khi ta mở rộng quy mô khi có thêm nhiều route khác.

## Viết hàm middleware handle error

Một giải pháp tốt hơn là tận dụng các hàm middleware của Express. Ta sẽ viết một hoặc nhiều hàm middleware để xử lý lỗi mà tất cả các route có thử sử dụng bằng cách thực hiện lệnh gọi `next()`.

Các hàm middleware làm việc tốt hơn so với các hàm thông thường vì chúng tự động có quyền truy cập vào đối tượng lỗi, request, response và có thể được gọi (hoặc gọi hàm khác) dựa trên thứ tự của chúng chỉ bằng hàm `next()`.

Ví dụ:

```javascript
app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called")
  console.log('Path: ', req.path)
  next() // (optional) invoking next middleware
})
```

Bây giờ ta code lại ví dụ ở mỗi route trên:

```javascript
const express = require('express')
const fsPromises = require('fs').promises

const app = express()
const port = 3000

app.get('/one', (req, res, next) => {
  fsPromises.readFile('./one.txt') // arbitrary file
    .then(data => res.send(data))
    .catch(err => next(err)) // passing error to custom middleware
})

app.get('/two', (req, res, next) => {
  fsPromises.readFile('./two.txt')
    .then(data => res.send(data))
    .catch(err => {
        err.type = 'redirect' // custom prop to specify handling behaviour
        next(err)
    })
})

app.get('/error', (req, res) => {
  res.send("Custom error landing page.")
})

app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called")
  console.log('Path: ', req.path)
  console.error('Error: ', error)
 
  if (error.type == 'redirect')
      res.redirect('/error')

   else if (error.type == 'time-out') // arbitrary condition check
      res.status(408).send(error)
  else
      res.status(500).send(error)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

Thay vì xử lý bên trong mỗi route, giờ đây ta đặt tất cả logic vào trong middleware. Sau đó dựa vào loại lỗi mà xử lý chúng ở middleware.

Điều này vẫn giữ chức năng tương tự trước đây, nhưng hiệu quả hơn. Giả sử các file này không có trên máy chủ, nếu ta truy cập `/one` máy chủ ghi lại lỗi và phản hồi **500**. Còn nếu truy cập `/two` ta sẽ được chuyển hướng đến trang error. 

![error](/assets/img/nodejs/error.png)

Như vậy có thể thấy, đây là một ví dụ cơ bản để hiểu cách tách logic xử lý lỗi từ các route thành middleware. Điều này mở rộng cho các ứng dụng lớn hơn với hàng route để tăng tính module, giảm dự phòng, bảo trì dễ dàng hơn và xử lý ngoại lệ hiệu quả hơn.

## Thêm nhiều middleware xử lý lỗi

Trong phần trước, ta đã hiểu các xử lý lỗi với middleware nhưng chỉ là trên một middleware thôi. Tuy nhiên trong thực tế, nhiều middleware được sử dụng cho nhiều khía cạnh khác nhau. Ví dụ một middleware được dùng để ghi nhật ký lỗi (logs error), một middleware khác để phản hồi client và một cái khác nữa là trình xử lý fail-safe catch-all. Dưới đây là một ví dụ tương tự ví dụ trước đó.

```javascript
// route handlers
app.get('/one')
app.get('/two') 

app.get('/error')
// middleware

app.use(errorLogger)
app.use(errorResponder)
app.use(failSafeHandler)
```

Ta viết lại như sau

```javascript
const express = require('express')
const fsPromises = require('fs').promises

const app = express()
const port = 3000

app.get('/one', (req, res, next) => {
  fsPromises.readFile('./one.txt')
  .then(data => res.send(data))
  .catch(err => next(err)) // passing error to custom middleware
})

app.get('/two', (req, res, next) => {
  fsPromises.readFile('./two.txt')
  .then(data => res.send(data))
  .catch(err => {
      err.type = 'redirect' // adding custom property to specify handling behaviour
      next(err)
  })
})

app.get('/error', (req, res) => {
  res.send("Custom error landing page.")
})

function errorLogger(error, req, res, next) { // for logging errors
  console.error(error) // or using any fancy logging library
  next(error) // forward to next middleware
}

function errorResponder(error, req, res, next) { // responding to client
  if (error.type == 'redirect')
      res.redirect('/error')
  else if (error.type == 'time-out') // arbitrary condition check
      res.status(408).send(error)
  else
      next(error) // forwarding exceptional case to fail-safe middleware
}

function failSafeHandler(error, req, res, next) { // generic handler
  res.status(500).send(error)
}

app.use(errorLogger)
app.use(errorResponder)
app.use(failSafeHandler)

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})
```

Điều này đem lại chức năng tương tự đoạn code ở ví dụ trước, nhưng sẽ mở rộng quy mô tốt hơn khi thêm nhiều route và xử lý nhiều lỗi hơn.

Như đã thảo luận từ trước, khi làm việc với middleware, người ta phải theo dõi trình tự của chúng, và nhớ mỗi middleware phản hồi client và gọi hàm tiếp theo trong stack. Nếu server bị treo, client sẽ phải tiếp tục đợi. Ví dụ nếu ta quên sử dụng `next()` trong middleware đầu tiên (`errorLogger`), các middleware sẽ không được gọi, và client sẽ đợi mãi mà không có phản hồi nào.

# Debug

Express sử dụng module [debug](https://expressjs.com/en/api.html#express.urlencoded) để ghi lại các route, middleware đang được sử dụng, mode của ứng dụng và các luồng của chu trình request-response.

Để có thể xem toàn bộ nhật ký ứng dụng (logs) ta thiết lập biến môi trường `DEBUG` thành **express**.

```bash
$ DEBUG=express:* node index.js
```

Trên window

```bash
> set DEBUG=express:* & node index.js
```

Bạn có thể chạy thử:

```bash
DEBUG=express:* node ./bin/www
  express:router:route new / +0ms
  express:router:layer new / +1ms
  express:router:route get / +1ms
  express:router:layer new / +0ms
  express:router:route new / +1ms
  express:router:layer new / +0ms
  express:router:route get / +0ms
  express:router:layer new / +0ms
  express:application compile etag weak +1ms
  express:application compile query parser extended +0ms
  express:application compile trust proxy false +0ms
  express:application booting in development mode +1ms
  express:router use / query +0ms
  express:router:layer new / +0ms
  express:router use / expressInit +0ms
  express:router:layer new / +0ms
  express:router use / favicon +1ms
  express:router:layer new / +0ms
  express:router use / logger +0ms
  express:router:layer new / +0ms
  express:router use / jsonParser +0ms
  express:router:layer new / +1ms
  express:router use / urlencodedParser +0ms
  express:router:layer new / +0ms
  express:router use / cookieParser +0ms
  express:router:layer new / +0ms
  express:router use / stylus +90ms
  express:router:layer new / +0ms
  express:router use / serveStatic +0ms
  express:router:layer new / +0ms
  express:router use / router +0ms
  express:router:layer new / +1ms
  express:router use /users router +0ms
  express:router:layer new /users +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
```

Để thuận tiện cho debug Express cung cấp cho ta các biến môi trường như sau:

|Name | Purpose|
|------ | ------|
|DEBUG | Bật/tắt namespcace debug cụ thể|
|DEBUG_COLORS	| Có hoặc không sử dụng màu cho output|
|DEBUG_DEPTH | Kiểm tra độ sâu đối tượng|
|DEBUG_FD | File mô tả để ghi output debug|
|DEBUG_SHOW_HIDDEN | Hiển thị các thuộc tính ẩn trên đối tượng được kiểm tra|

# Tổng kết

Như vậy, cơ bản đã hoàn thành các tìm hiểu về Express Framework. Mong là serie bài viết này sẽ có ích cho những ai đang tìm hiểu về nodejs và express.

# Tham khảo

[**digitalocean**](https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application)

[**scoutapm**](https://scoutapm.com/blog/express-error-handling)