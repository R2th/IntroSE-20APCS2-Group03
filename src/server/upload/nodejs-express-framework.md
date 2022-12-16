Ở các phần trước ta đã hiểu về V8 Engine và kiến trúc bên trong Node.js. Ở bài viết này ta sẽ tìm hiển về ứng dụng của Node.js mà gần gũi nhất là Express. Một framework được dùng cho xây dựng server backend trền nền tảng node.js

> Express là một framework được xây dựng trên nền tảng của Nodejs. Nó cung cấp các tính năng mạnh mẽ để phát triển web hoặc mobile. Express hỗ trợ các method HTTP và middleware tạo ra API vô cùng mạnh mẽ và dễ sử dụng.

Các tính năng nổi bật của Express:

- Thiết lập router cho phép sử dụng với các hành động khác nhau dựa trên phương thức HTTP và URL.
- Hỗ trợ xây dựng theo mô hình MVC
- Cho phép định nghĩa middleware giúp tổ chức và tái sử dụng code
- Hỗ trợ RESTful API

Để sử dụng express ta cần tải gói package express.

```
npm install express
```

Hoặc sử dụng yarn

```
yarn add express
```

# Hello World

Trước tiên ta tìm một thư mục rỗng, sử dụng cmd hoặc git (nhớ là phải tải [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) hoặc [nodejs](https://nodejs.org/en/download/) trước). Rồi thực hiện lệnh

```
npm init -y
```

Sau khi đã có file package.json rồi ta tạo file index.js.

Tại đây, ta khai báo module express và tạo ứng dụng. Ứng dụng được đặt tên `app`, sau khi được khởi tạo `app` sẽ có các phương thức để định tuyến HTTP, cấu hình middleware, hiển thị chế độ xem HTML, đăng ký template engine và sửa đổi cài đặt để kiểm soát ứng dụng hoạt động,... 

```javascript
const express = require('express'); 
const app = express(); 
```

Phần định tuyến bởi phương thức `app.get()` sẽ chỉ định một hàm callback bất cứ khi nào có một yêu cầu HTTP GET với một đường dẫn ('/'). Hàm callback nhận vào hai đối số là request và response, và trả về phản hồi bằng gọi hàm send để trả về chuỗi Hello World.

```javascript
app.get('/', (req, res) => {   
    res.send('Hello World!') 
});
```

Phần cuối chương trình chạy ứng dụng trên `port` được chỉ định là 3000, với máy chủ đang chạy có thể truy cập `localhost:3000` trên trình duyệt để xem kết quả.

```javascript
const port = 3000;  

app.listen(port, () => {   
    console.log(`Example app listening on port ${port}!`) 
});
```

Lúc này ta thực hiện lệnh tại git:

```
node index.js
```

Ta được kết quả như sau:

![hellow_world](https://www.tutorialspoint.com/expressjs/images/hello_world.jpg)

# Routing

Routing/định tuyến đề cập đến cách các endpoint(URI) của ứng dụng phản hồi các yêu cầu từ client. 

Ta xác định định tuyến bằng các phương thức của đối tượng trong ứng dụng Express tương ứng với các phương thức HTTP. Ví dụ: `app.get()` để xử lý yêu cầu **GET** và `app.post` để xử lý yêu cầu **POST**. Tương tự với các phương thức khác như PUT, PATH, DELETE,... Ta cũng có thể sử dụng `app.all()` để xử lý tất cả các phương thức HTTP và `app.use` để chi định middleware cần thiết (ta sẽ nói về middleware sau).

Các phương thức định tuyến này chỉ định một hàm callback (đôi khi được gọi là "handler function"), chúng được gọi khi ứng dụng nhận được yêu cầu đến tuyến được chỉ định (endpoint) và phương thức HTTP. Nói cách khác, nó sẽ "lắng nghe" các yêu cầu ứng với (các) tuyến và (các) phương thức được chỉ định, và khi thấy trùng, ứng dụng sẽ gọi hàm callback được chỉ định.

Ví dụ:

```javascript
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})
```

Về hai tham số là req và res ta sẽ tìm hiểu như sau:

## Request

Request viết tắt là req là các yêu cầu từ phía client đến server. Như ở ví dụ trên thì request có vẻ không cần thiết, nhưng thực tế ta sẽ cần rất nhiều thông tin từ request, như **body** từ phương thức POST, thông tin từ đường dẫn, các yêu cầu xác thực,... Vì thế có rất rất nhiều loại request, nhưng ở đây ta chỉ cần quan tâm đến những loại thường dùng là:

### req.body

Lấy phần thông tin từ body của request. Sau phiên bản Express.4x để lấy thông tin từ phương thức POST của HTTP. Ta phải sử dụng body-parser.

```javascript
const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', function (req, res) {
  console.log(req.body)
  res.json(req.body)
})
```

### req.params

Lấy tham số từ parameter của đường dẫn. Ví dụ như ta có link là:

> GET /api/users/:name

```javascript
console.dir(req.params.name)
```

### req.query

Tương tự như `req.params` nhưng là lấy query từ link

> GET /api/users?name="Bob"

```javascript
console.dir(req.query.name)
```

### req.header

Lấy thông tin từ header của HTTP. Chủ yếu dùng để xác thực người dùng

```javascript
const token = req.headers.authorization;
```

## Response

Response viết tắt là res. Là phản hồi từ phía server đến client. Có thể là gửi về dữ liệu mà client yêu cầu, hoặc thực hiện các thao tác mà client mong muốn, như chuyển hướng, render đến template,... Ta có bảng tóm tắt các res thường dùng như sau.

| Method | Description |
| ------ | ------ |
|res.download()| Tệp được tải xuống|
|res.end()| Kết thúc quá trình response|
|res.json()| Gửi về file json|
|res.jsonp()| Gửi về file json hỗ trợ JSONP|
|res.redirect()| Chuyển hướng request|
|res.render()| Render ra giao diện theo template|
|res.send()| Gửi về nhiều loại tệp khác nhau|
|res.sendFile() | Gửi về dưới dạng luồng octet|
|res.status()| Gửi về trạng thái của HTTP phản hồi|

Như đã nói ở trên khi tạo `app` với Express, ta sẽ có tất cả tính năng mà Express cung cấp và đôi khi nó sẽ trở nên thừa thải khi ta chỉ cần tính năng định tuyết, lúc này để tối ưu ta làm như sau:

```javascript
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.send('Home page')
})

module.exports = router
```

Sau đấy tại file index.js ta xuất nó ra:

```javascript
const routes = require('./routes')

// ...

app.use('/api', routes)
```

# Middleware

> Middleware là các hàm được dùng để tiền xử lý, lọc các request trước khi đưa vào xử lý logic hoặc điều chỉnh các response trước khi gửi về cho người dùng.

Ta sẽ tìm hiểu cách Express sử dụng middleware:

![middleware](https://ren0503.github.io/assets/img/nodejs/middleware.png)

Hình trên mô tả khi một request gửi đến Express sẽ được xử lý qua 5 bước như sau :

- Tìm định tuyến tương ứng với request
- Dùng CORS Middleware để kiểm tra cross-origin Resource sharing của request
- Dùng CRSF Middleware để xác thực CSRF của request, chống fake request
- Dùng Auth Middleware để xác thực request có được truy cập hay không
- Xử lý công việc được yêu cầu bởi request (Main Task)

Bất kỳ bước nào trong các bước 2,3,4 nếu xảy ra lỗi sẽ trả về response thông báo cho người dùng, có thể là lỗi CORS, lỗi CSRF hay lỗi auth tùy thuộc vào request bị dừng ở bước nào.

Hàm middleware thường có dạng như sau:

```javascript
async function name(req, res, next) {
    await something
    next();
}
```

Ta thấy hàm middleware sử dụng 3 tham số `req`, `res` và `next`, hai tham số trước ta đã biết còn `next` được dùng để chuyển tiếp sang hành động kế tiếp. Trong một vài trường hợp ta sẽ sử dụng tham số `err`, đối tượng lỗi.Các chức năng middleware có thể thực hiện các tác vụ sau:

- Thực hiện bất cứ đoạn code nào
- Thay đổi các đối tượng request và response
- Kết thúc một quá trình request-response
- Gọi hàm middleware tiếp theo trong stack

Trong Express, có 5 kiểu middleware có thể sử dụng :

- Application-level middleware (middleware cấp ứng dụng)
- Router-level middleware (middlware cấp điều hướng - router)
- Error-handling middleware (middleware xử lý lỗi)
- Built-in middleware (middleware sẵn có)
- Third-party middleware (middleware của bên thứ ba)

## Application-level middleware

Ở đây ta xây dựng application-level middleware của ứng dụng bằng cách sử dụng `app.use()` và `app.METHOD` trong đó METHOD là phương thức HTTP của request mà middleware xử lý như (GET, PUT hoặc POST). 

Ví dụ dưới đây mô tả một hàm ko khai báo đường dẫn cụ thể, do đó nó sẽ được thực hiện mỗi lần request:

```javascript
const express = require('express')
const app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
```

Ví dụ dưới đây dùng hàm use đến đường dẫn `/user/:id`. Hàm này sẽ được thực hiện mỗi khi request đến đường dẫn `/user/:id` bất kể phương thức HTTP nào:

```javascript
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

Tiếp theo là một ví dụ cho hàm được thực hiện mỗi khi truy cập đến đường dẫn `/user/:id` bằng phương thức GET:

```javascript
app.get('/user/:id', function (req, res, next) {
  res.send('USER')
})
```

Khi muốn gọi một loạt hàm middleware cho một đường dẫn cụ thể, chúng ta có thể thực hiện như ví dụ dưới đây, bằng cách khai báo liên tiếp các tham số là các hàm sau tham số đường dẫn:

```javascript
app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

Hoặc ta có thể tách ra thành 2 lần khai báo `app.use`, gọi là multiple routes, tuy nhiên ở các hàm phía trước cần gọi hàm `next()` khi kết thúc mỗi hàm, nếu không như ví dụ dưới đây, route thứ 2 sẽ không bao giờ được thực hiện do hàm thứ 2 trong route thứ nhất không gọi đến hàm `next()`:

```javascript
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id)
  next()
}, function (req, res, next) {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id)
})
```

*Lưu ý*: Khi muốn bỏ qua các hàm middleware tiếp theo không thực hiện nữa, chúng ta sẽ sử dụng lệnh `next('route')`, tuy nhiên việc này chỉ tác dụng với các hàm middleware được load thông qua hàm `app.METHOD` hoặc `router.METHOD`.

Ví dụ dưới đây mô tả một hàm middleware sẽ kết thúc ngạy lập tức khi tham số `id=0`:

```javascript
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special')
})
```

## Router-level middleware

Các middleware này về chức năng không khác gì so với application-level middlewware ở trên, tuy nhiên thay vì dùng biến `app` thì ta dùng `router` để chuyên biệt về việc định tuyến:

```javascript
const router = express.Router()
```

Router-level middleware sử dụng `route.use()` và `router.METHOD()`. Phần code dưới đây mô tả một cách sử dụng router để thiết lập các route cần thiết cho một resource có tên là user:

```javascript
const express = require('express')
const app = express()
const router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)
```

## Error-handling middleware

Đây là các middleware phục vụ cho việc xử lý lỗi. Một lưu ý là các hàm cho việc này luôn nhận bốn tham số (*err, req, res, next*). Khi muốn khai báo một middlware cho việc xử lý lỗi, cần phải tạo một hàm có 4 tham số đầu vào. Mặc dù ta có thể không cần sử dụng đối tượng next, nhưng hàm vẫn cần format với bốn tham số như vậy. Nếu không Express sẽ không thể xác định đó là hàm xử lý lỗi, và sẽ không chạy khi có lỗi xảy ra, chỉ hoạt động giống như các hàm middlware khác.

Đoạn code dưới đây mô tả một hàm xử lý lỗi truyền về cho client lỗi 500 khi có lỗi xảy ra từ server:

```javascript
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

## Built-in middleware

Kể từ phiên bản 4.x, Express đã không còn phụ thuộc vào thư viện [Connect](https://github.com/senchalabs/connect). Tất cả các hàm middleware trước đây đều đã được tách ra thành các modules riêng biệt. Điều này cung cấp cách tối ưu hóa và tùy chỉnh ứng dụng Express một cách linh hoạt nhất, giúp tạo ra một ứng dụng Web Application phù hợp với nhu cầu, không bị thừa những thứ không cần thiết. Có thể tham khảo các modules middlware đã được tách ra ở [đây](https://github.com/senchalabs/connect#middleware).

Express có các hàm built-in middleware sau:

- [express.static](https://expressjs.com/en/4x/api.html#express.static) các file tĩnh như hình ảnh, HTML, ....
- [express.json](https://expressjs.com/en/4x/api.html#express.json) phân tích cú pháp request đến với JSON payload. *Lưu ý*: Chỉ khả dụng từ Express 4.16.0+
- [express.urlencoded](https://expressjs.com/en/api.html#express.urlencoded)  phân tích cú pháp request đến với URL-encoded payloads. *Lưu ý*: Chỉ khả dụng từ Express 4.16.0+

## Third-party middleware

Sử dụng Third-party sẽ giúp ta thêm các chức năng cho vào web app của mình mà không cần mất công triển khai. Ta sẽ cần cài đặt module thông qua **npm**, sau đó khai báo sử dụng trong đối tượng `app` nếu dùng ở **Application-level**, hoặc qua đối tượng `router` nếu dùng ở **Router-level**.

Ví dụ:

```
$ npm install cookie-parser
```

```javascript
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```

Bạn có thể xem danh sách các Third-party middleware thường xuyên được sử dụng tại [đây](http://expressjs.com/en/resources/middleware.html)

# Tổng kết

Bài viết tới đây hơi dài nhưng chỉ mới là phần routing và middleware của Express, bài viết tiếp theo sẽ nói về các tính năng nâng cao khác từ Express.