![image.png](https://images.viblo.asia/b3ffc1fd-ce83-4f7e-b33e-18e7a02608a7.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Ngày xưa lúc mình mới tiếp cận với Nodejs và đọc các tutorial hướng dẫn trêng mạng, mình luôn phải vật lộn với việc hiểu phần **Authentication** của nó. Thay vì thực sự giải thích cơ chế và những gì đang xảy ra, mình chỉ cảm thấy như tác giả chỉ đơn giản là cung cấp một hướng dẫn về cách sao chép/dán từ tài liệu. Bài viết này nhằm thực sự hướng dẫn bạn qua quy trình **authentication** và giải thích từng cơ chế một.

Bài này mình sẽ chia làm 2 phần để các bạn giễ dàng tham khảo. (PHẦN 2)

**LỜI KHUYÊN: Bạn NÊN vừa đọc vừa đối chiêu với code nếu có thể thì hãy code nó ra là tốt nhất. Việc đó giẽ giúp bạn hiểu hơn khi đọc giải thích. Nếu chỉ đọc giài thích có thể bạn sẽ cảm thấy có lúc rất khó hiểu.**

Điều kiện tiền quyết: mình giả sử như các bạn đã có thế sử dụng cơ bản với `Terminal`/`command-line interface (CLI)` và `Javascript`/`Node.js.`

PHẦN 1
========

Bước 1. Thiết lập cấu trúc tệp
------------------------------

Đầu tiên, chúng ta sẽ tạo một thư mục cấp cao nhất có tên là `“authTut”` chỉ để chứa 2 folder của project là `server` và `client`. Trong trường hợp này, chúng ta sẽ sử dụng [cURL](https://en.wikipedia.org/wiki/CURL) làm `client interface` thay vì trình duyệt (*Chrome hoặc trình duyệt nào khác*), vì mình nghĩ nó sẽ giúp bạn hiểu rõ hơn những gì thực sự xảy ra trong trình duyệt của bạn khi gọi 1 **request**.

Để mô phỏng bộ nhớ của trình duyệt, chúng ta sẽ tạo một thư mục `/client` trong `/authTuts` và chúng ta cũng sẽ tạo một thư mục `/server` nơi chúng ta sẽ xây dựng `server`.

Chạy các lệnh sau trong `**terminal**` của bạn.

```
workspace $ mkdir authTut
workspace $ cd authTut
authTut $ mkdir server
authTut $ mkdir client
```

Bước 2. Khởi tạo `npm` và cài đặt `express` trong thư mục `/server`
--------------------------------------------------------------

Đầu tiên, hãy mở Terminal trên thư mục `/server` của chúng ta, sau đó khởi tạo `npm`. Với nó chúng ta có thể theo dõi những phụ thuộc nào mà `server` của chúng ta có. Tiếp theo, hãy tiếp tục và cài đặt `express` dưới dạng phụ thuộc, sau đó tạo tệp `server.js`.

```
authTut $ cd server
server $ npm init -y
server $ npm install express --save
server $ touch server.js
```

Lưu ý, việc sử dụng flag '`-y`' cùng với '`npm init`' sẽ tự động chấp nhận các `value` mặc định mà `npm` khởi tạo cho `project` của chúng ta. Sau khi enter, bạn sẽ thấy các tùy chọn mặc định được ghi vào `Terminal`.

Tại thời điểm này, bạn sẽ có cấu trúc thư mục `folder` giống như sau:

```
- /authTuts
  - /server
    - /node_modules
    - server.js
    - package.json
  - /client
```

Bước 3. Tạo `server` Express Node.js
------------------------------

Mở thư mục `/authTuts` trong Editor yêu thích của bạn (Mình dùng VsCode), sau đó mở tệp `authTuts/server/server.js`.

Đầu tiên, chúng ta sẽ **request** mô-đun `express`, sau đó chúng ta gọi hàm `express()` để tạo ứng dụng của chúng ta và cuối cùng chúng ta nói `express` sẽ chạy trên Port nào.

```javascript
//npm modules
const express = require('express');

// create the server
const app = express();

// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
```
Ngoài lề: Nếu bạn nào muốn hiểu sâu về việc tại sao cứ gọi hàm `require(...)` bỏ cái tên vào là có một đối tượng để sử dụng thì tham khảo bài viết này nhé [Abstract Factory Pattern. Trong này mình cũng đã có một bài viết chi tiết về các Design Pattern này.](https://viblo.asia/p/blog10-gioi-thieu-ve-javascript-design-patterns-kem-vi-du-truc-quan-series-bi-kip-javascript-phan-8-vlZL9NR8VQK#abstract-factory-pattern)

Tiếp theo, gọi '`node server.js`' từ `terminal`. Điều này sẽ khởi động `server` của chúng ta. Bạn sẽ nhận được câu trả lời “`Listening on localhost:3000`”. (Lệnh '`node`' trong `terminal` của chúng ta có thể được sử dụng để chạy các tệp `Javascript`).

```
Listening on localhost:3000
^C // Cái dấu này là mình nhấn Ctrl + C để ngừng server. Bất cứ khi nào bạn muốn ngừng hoạt động trên Ternimal bạn có thể dùng tổ hợp phím [Ctrl + C]
server $ node server.js
Listening on localhost:3000
```

Nai sừ! Bạn vừa tạo một `server`! Nếu bạn truy cập “ [http://localhost:3000/](http://localhost:3000/)” ngay bây giờ, bạn sẽ thấy thông báo lỗi cho biết “Cannot GET /”, nhưng vẫn tốt hơn là gặp lỗi “This site can't be reached”! (Điều này là bạn đã có 1 `server` chỉ là chưa có `Enpoint` nào thôi :D)

Bước 4. Thêm homepage route vào route `'/'`
--------------------------------------------------

Cập nhật tệp `server.js` để thêm hàm `GET` vào route `'/'` của chúng ta. Khi `client` (trình duyệt hoặc `cURL` như chúng ta sẽ thấy ngay sau đây) gọi hàm `GET`, `server` của chúng ta sẽ phản hồi và kèm dữ liệu. Trong trường hợp này, chúng ta cung cấp hàm `'/'` `GET` với **function callback** cho **server** của chúng ta phản hồi với câu '`you just hit the home page`'.

```javascript
//npm modules
const express = require('express');

// create the server
const app = express();

// create the homepage route at '/'
app.get('/', (req, res) => {
  res.send('you just hit the home page\n')
})

// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
```
Các tham số '`req`' và '`res`' được cung cấp cho hàm **callback** `app.get('/')` của chúng ta là các đối tượng '`request`' và '`response`' được tạo từ các `request headers`.

Nếu bạn truy cập [http://localhost:3000/](http://localhost:3000/) bây giờ, bạn vẫn sẽ thấy lỗi '`Cannot GET /`', vì `server` của chúng ta vẫn hoạt động trên tệp `server.js` cũ và mỗi lần chúng ta thay đổi tệp này thì cần phải `restart` lại `server`. Ok giờ khởi động lại `server` sau khi lưu các thay đổi của mình. Chúng ta có thể làm điều này bằng cách nhấn '`Ctrl + C`' khi đang ở trong `terminal` và sau đó chạy lại '`node server.js`'.

```
Listening on localhost:3000
^C
server $ node server.js
Listening on localhost:3000
```

Bây giờ, khi bạn truy cập lại [http://localhost:3000/](http://localhost:3000/) , bạn sẽ thấy thông báo '`you just hit the home page`'. Mở tab hoặc cửa sổ mới trong **terminal** của bạn và thay đổi vào thư mục `/client` (Bạn có thể dùng lệnh `cd ..` hoặc thao tác trên `UI` để mở 1 `terminal` của 1 thư mục nào đó). Sau đó, gọi lệnh `cURL` và chuyển vào một số tùy chọn để truy cập `endpoint` trang chủ của chúng ta. Bạn sẽ thấy phản hồi của chúng ta được trả lại.

```
server $ cd ..
authTut $ cd client
client $ cURL -X GET http://localhost:3000/
you just hit the home page
```

Ở trên sử dụng tùy chọn '`-X`' để có thể chuyển `curl` thành `GET` hoặc `POST` tới một `endpoint`. Ở đây, chúng ta đang '`GET`' **endpoint** `'/'`.

Bước 5. Dùng `nodemon` trong khi **dev**
--------------------

Sẽ thực sự khó chịu nếu chúng ta phải khởi động lại `server` mỗi khi chúng ta thực hiện thay đổi đối với tệp `server.js` của mình. Hãy sử dụng mô-đun `nodemon`, mô-đun này sẽ tự động khởi động lại `server` của chúng ta mỗi khi chúng ta lưu thay đổi vào tệp `server.js`. Đầu tiên, cài đặt gói `nodemon` trên `global`. Mở 1 Terminal mới sau đó thực hiện lệnh: 

`server $ npm install -g nodemon`

Khi bạn dùng tùy chọn `-g` vào trình cài đặt mô-đun `npm`, nó sẽ cài đặt gói trên môi trường `global` để bạn có thể truy cập mô-đun đó từ bất kỳ đâu trong hệ thống tệp của mình khi bạn đang ở trong `terminal`. Bây giờ, hãy tắt `server` của chúng ta và khởi động nó bằng `nodemon`.

`server $ nodemon server.js`

Bây giờ, chúng ta hãy thay đổi văn bản phản hồi của đường dẫn trang chủ của chúng ta thành một cái gì đó khác và cũng `console.log()` đối tượng `request`, để chúng ta có thể thấy nó trông như thế nào. Sau khi lưu tệp, bạn sẽ thấy `server` khởi động lại trong tab Terminal `server`.

```javascript
//npm modules
const express = require('express');

// create the server
const app = express();

// create the homepage route at '/'
app.get('/', (req, res) => {
  console.log(req)
  res.send('You hit the home page without restarting the server automatically\n')
})

// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
```
Bây giờ, chúng ta hãy gọi lại `curl`, riêng lần này lần này, hãy dùng thêm flag `-v` (**verbose**).

```c
client $ curl -X GET http://localhost:3000 -v
Note: Unnecessary use of -X or --request, GET is already inferred.
* Rebuilt URL to: http://localhost:3000/
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.54.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 66
< ETag: W/"42-Ybeup68SVZ+Id3fqVh25rCkXfno"
< Date: Sun, 29 Oct 2017 19:58:38 GMT
< Connection: keep-alive
< 
You hit the home page without restarting the server automatically
```

Trong `request` thứ 2, chúng ta nhận được thông tin về `curl request` của chúng ta. Hãy tìm hiểu kỹ hơn một chút về nó nhé.

1.  `cURL` cho chúng ta biết rằng chúng ta không cần phải sử dụng `-X GET` vì đó là `value` mặc định cho `cURL`. Tuy nhiên, trong bài viết này mình muốn sử dụng nó để các bạn hiểu rõ hơn.
2.  “`rebuilt URL to…`” cho bạn biết `cURL` đã thêm một dấu gạch chéo vào cuối `URL` của bạn.
3.  “`Đang thử :: 1…`” là địa chỉ `IP` mà `URL` đã giải quyết.
4.  Dòng tiếp theo là `Port` chúng ta đã kết nối, mà bạn nhận thấy là `Port` chúng ta đã chỉ định khi chúng ta tạo `server`.
5.  `>` cho biết dữ liệu `cURL` đã được gửi đến `server`.
6.  `<` cho biết dữ liệu `cURL` đã nhận được từ `server`.
7.  Cuối cùng, bạn thấy văn bản phản hồi mà `server` đã gửi

Nếu bạn lật qua `tab Terminal` nơi `server` đang chạy, bạn sẽ thấy một `output` rất dài. Đây là đối tượng '`request`' mà `server` của chúng ta xây dựng từ dữ liệu chúng ta đã gửi đến `server`.

Bước 6. Cài đặt `uuid` để tự động tạo các `unique string`
------------------------------------------------------

Bây giờ, hãy mở một `Terminal` mới trong thư mục `server` và cài đặt mô-đun `uuid`, giúp chúng ta tạo các `string ngẫu nhiên`. (Mở một tab khác sẽ cho phép chúng ta cài đặt các gói cho `server` của mình mà không phải dừng quá trình `server` hiện tại. Khi chúng ta đưa các mô-đun mới vào tệp `server.js` của mình, `nodemon` sẽ tự động khởi động lại và có thể kéo các mô-đun này vào.)

`server $ npm install --save uuid`

Sau đó, chúng ta thêm nó vào tệp `server` của chúng ta và cập nhật văn bản phản hồi của chúng ta để gửi nó đến `client`. Lưu ý, mình đang sử dụng `string interpolation` trong ví dụ bên dưới ([Nếu bạn chưa quen với cách sử dụng này hãy tham khảo tại đây](https://viblo.asia/p/blog1-nhung-kien-thuc-javascript-can-ban-ma-mot-react-dev-phai-thuoc-nam-long-series-bi-kip-javascript-phan-1-AZoJj7yOLY7)), `request` sử dụng '\`\`' thay vì dấu ngoặc kép. Đó là (\`\`) không phải là (''). (Có thể ở gần phía trên bên trái trên bàn phím của bạn.)

```javascript
//npm modules
const express = require('express');
const { v4: uuid } = require("uuid");

// create the server
const app = express();

// create the homepage route at '/'
app.get('/', (req, res) => {
  console.log(req)
  const uniqueId = uuid()
  res.send(`Hit home page. Received the unique id: ${uniqueId}\n`)
})

// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
```

Bây giờ hãy gọi lại `cURL`.

```
client $ curl -X GET http://localhost:3000
Hit home page. Received the unique id: 044e0263-58b7-4c7f-a032-056cd81069e3
```

Bước 7. Add/configure `express-session`
-----------------------------------------

Cài đặt `express-session`. Middleware này xử lý việc tạo `session` vì `express` không tự động làm điều này.

`server $ npm install express-session --save`

Sau khi nó được cài đặt, hãy sửa đổi tệp `server.js` của chúng ta theo những cách sau:

1.  Tạo một instance `express-session` thông qua require
2.  Add/configure ứng dụng của chúng ta để sử dụng `middleware` `session` với `id session duy nhất` mà chúng ta tạo. Chúng ta sẽ ghi log đối tượng `request.sessionID` trước và sau khi `middleware` được sử dụng.
3.  Gửi `sessionID` cho `client`

Lưu ý, trong cấu hình session bên dưới, mình để '`secret`' là '`keyboard cat`', nhưng trong thực tế, bạn sẽ thay thế điều này bằng một `string` được lấy từ biến môi trường.

```javascript
//npm modules
const express = require('express');
const { v4: uuid } = require("uuid");
const session = require('express-session')

// create the server
const app = express();

// add & configure middleware
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// create the homepage route at '/'
app.get('/', (req, res) => {
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You hit home page!\n`)
})

// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
```

Bây giờ, hãy gọi lại request curl bằng flag -v.

```console
curl -X GET http://localhost:3000 -v
...
< set-cookie: connect.sid=s%3A5199f3ed-3f5a-4478-aed7-fab9ce6ca378.DjQlJ%2F1t%2F00RAfIs5yW6CEsVUXM25aMclq7VGzxVnoY; Path=/; HttpOnly
...
```

Mình đã cắt đi những phần ko cần thiết ở phần `Log` ở trên, nhưng bạn có thể thấy rằng trong dữ liệu được trả về từ `server` (được biểu thị bằng ký hiệu `<`) chúng ta đang đặt `ID session` thành `uuid`. Nếu chúng ta mở sang tab terminal `server` của mình, chúng ta sẽ thấy như sau:

```console
Inside the session middleware
undefined
Inside the homepage callback function
5199f3ed-3f5a-4478-aed7-fab9ce6ca378
```

Khi chúng ta ghi lại `req.sessionID` bên trong `middleware session`, session vẫn chưa được khởi tạo, vì vậy chúng ta chưa thêm `sessionID` vào đối tượng request. Tuy nhiên, khi chúng ta nhận được lệnh `callback` từ `request GET` của mình, `middleware session` đã được chạy và thêm `sessionID` vào đối tượng request.

Hãy thử gọi hàm `cURL` vài lần nữa. Bạn sẽ thấy rằng một `id session` mới được tạo mỗi lần gọi. **Các trình duyệt** **sẽ tự động lưu `id session`** và gửi nó theo từng `request` đến `server`; tuy nhiên, **cURL không** tự động lưu `ID session` của chúng ta và gửi nó trong `headers request`. Hãy cùng fix nó nhé điều đó. Hãy sử dụng lại `cURL`, và sử dụng flag '-c' và đoạn text 'cookie-file.txt'.

`client $ curl -X GET http://localhost:3000 -c cookie-file.txt`

Điều này tạo ra một tệp văn bản trong thư mục /client của chúng ta có tên là 'cookie-file.txt'. Bạn sẽ thấy tệp văn bản này xuất hiện trong project của mình. Bây giờ chúng ta có thể gọi lại `curl`, nhưng lần này gọi `cookie-file.txt` với flag '-b' request `cURL` gửi `id session` của sẽ được gửi trong dữ liệu `headers` của chúng ta. Hãy cũng sử dụng thêm flag '`-v`' để xem điều này.

```console
curl -X GET http://localhost:3000 -b cookie-file.txt -v
...
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.54.0
> Accept: */*
> Cookie: connect.sid=s%3Ade59a40f-6737-4b8d-98bf-bf2bb8495118.e0pWTi2w8%2FAAOKxKgKDBdu99JnspruYSEgLSV3tvxX4
...
```

Mình cũng đã cắt đi những phần ko cần thiết ở phần `Output` ở trên, nhưng như bạn có thể thấy, `id session` đang được gửi trong `headers request` của chúng ta và chúng ta biết nó được gửi tới `server` vì có biểu tượng `>`. Hãy thử gọi hàm này bao nhiêu lần tùy thích. Nếu bạn chuyển qua phần `output` của` terminal server`, bạn sẽ thấy rằng cùng một `id session` đang được xuất ra `Terminal` mỗi lần request. Bạn cũng có thể nhận thấy, chúng ta không thấy consolog '`Inside the session middleware`' được tạo. Điều này là do hàm '`genid`' của chúng ta không được gọi vì id đã được đưa vào.

Tuy nhiên, chúng ta lại có 1 vấn đề ở đây. Hãy thử khởi động lại `server` của chúng ta.

Trong tab `Terminal` nơi `server` đang chạy, nhấn 'Ctrl + C' sau đó khởi động nó bằng `nodemon`.

```console
Inside the homepage callback function
de59a40f-6737-4b8d-98bf-bf2bb8495118
^C
server $ nodemon server.js
Listening on localhost:3000
```

Từ thư mục client, hãy gọi lại lệnh `cURL`.

```
client $ curl -X GET http://localhost:3000 -b cookie-file.txt
```

Sau đó nhìn lại nhật ký server một lần nữa.

```
Listening on localhost:3000
Inside the session middleware
de59a40f-6737-4b8d-98bf-bf2bb8495118
Inside the homepage callback function
ac656d2a-9796-4560-9dbf-73996a1853f8
```

Như bạn có thể thấy ở trên, hàm `genid middleware session` của chúng ta đang được gọi. Điều này là do `session` đã được lưu trữ trong bộ nhớ của `server`. Vì vậy, khi chúng ta khởi động lại `server`, `id session` đã bị xóa cùng với phần còn lại của bộ nhớ. Đây là vấn đề.

1.  `Server` được khởi động lại và bộ nhớ `session` bị xóa.
2.  Chúng ta gửi `request cURL` của chúng ta đến `server` cùng với `id session` của chúng ta
3.  `Server` nhận các `request` và `middleware session` không thể tìm thấy `id session` trong bộ nhớ, vì vậy nó gọi hàm `genid`
4.  Hàm `genid` logging rằng chúng ta đang ở bên trong `middleware session` và nó ghi lại `id session` của đối tượng `request`. Vì chúng ta đã gửi `id session` trong `request cURL` của mình, đối tượng `request` đã thực sự được khởi tạo với `id session` đó. Tuy nhiên, `id session` này bị ghi đè bởi `value` trả về của hàm `genid`.
5.  Khi `middleware session` được thực hiện xong ghi đè `id session` mà chúng ta đã gửi, quyền kiểm soát được chuyển giao cho hàm callback trong `app.get()`, nơi chúng ta ghi lại rằng chúng ta đang ở bên trong hàm `callback hompage` và ghi lại id mới. 

Hãy thực hiện `curl request` đó một lần nữa từ thư mục `client` để hiểu hơn về phần giải thích trên bằng cách nhìn vào thứ tự `log` đã được ghi ra. Đồng thời nhìn vào `source code` để tham chiếu các bước:

`client $ curl -X GET http://localhost:3000 -b cookie-file.txt`

Xem lại nhật ký server.

```
Inside the session middleware
de59a40f-6737-4b8d-98bf-bf2bb8495118
Inside the homepage callback function
b02aa920-7031-427f-ac2e-b82f21140002
```

Một lần nữa, server của chúng ta phản hồi với một `id session` khác, vì chúng ta đã gửi cùng một `id session` từ trước khi chúng ta khởi động lại `server`. Chúng ta cần gọi lại `request curl`, nhưng lần này passed flag '-c' để chúng ta ghi đè thông tin `session` hiện có.

`client $ curl -X GET http://localhost:3000 -c cookie-file.txt`

Quay lại nhật ký server.

```
Inside the session middleware
undefined
Inside the homepage callback function
74f37795-6fcf-4300-beb9-3de41395eafe
```

`Req.sessionID` không được xác định, vì chúng ta đã không gửi thông tin `session` trong `request curl` của chúng ta. Hãy xem `cookie-file.txt` của chúng ta. Chắc chắn, có `id session` đã được tạo và gửi lại.

```
...
#HttpOnly_localhost FALSE / FALSE 0 connect.sid s%3A74f37795-6fcf-4300-beb9-3de41395eafe.5mblOCOvpwAMh7bNuTZ9qyloG5UOcIczep5GjMnVEi8
```

Bây giờ, nếu chúng ta gọi lại `request curl` bằng flag '`-b`'. Chúng ta sẽ không thấy nhật ký '`Inside the session middle`' được ghi ra `output`, vì `genid` không được gọi. `Id session` đang được khớp với `id session` trong bộ nhớ.

Mặc dù vậy, chúng ta vẫn chưa giải quyết được vấn đề đang gặp phải. Nếu chúng ta khởi động lại `server` của mình, bộ nhớ sẽ bị xóa một lần nữa. Vì vậy, chúng ta cần có một số cách để đảm bảo rằng chúng ta có thể lưu `id session` của mình ngay cả khi `server` tắt. Đó là khi chúng ta cần đến '`session store`'. Thông thường, cơ sở dữ liệu của bạn sẽ hoạt động như một kho lưu trữ `session`, nhưng vì chúng ta đang cố gắng giữ mọi thứ trong trong bài viết này đơn giản nhất có thể, chúng ta hãy chỉ lưu trữ thông tin `session` của mình trong tệp văn bản.

Nếu bạn truy cập vào [tài liệu nhanh](https://github.com/expressjs/session), bạn sẽ thấy rằng có một số `npm packages` được cung cấp để hoạt động như một bộ nhớ `cache` hay cái gì gì đó nằm giữa `cơ sở dữ liệu` của bạn và `middleware session`. Chúng ta sẽ sử dụng cái gọi là '[session-file-store](https://www.npmjs.com/package/session-file-store).' Trong thực tế thì chúng ta sử dụng `Redis` hoặc `DynamoDB` (dự án mình đang dùng `DynamoDB`) nhưng đừng lo lắng nếu bạn hiểu cái này thì bạn cũng sẽ sử dụng được những cái kia một cách hiệu quả.
Như thường lệ, chúng ta hãy cài đặt nó.

`server $ npm install session-file-store --save`

Bây giờ, hãy thêm nó vào tệp `server.js` của chúng ta.

```javascript
//npm modules
const express = require('express');
const { v4: uuid } = require("uuid");
const session = require('express-session')
const FileStore = require('session-file-store')(session);

// create the server
const app = express();

// add & configure middleware
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// create the homepage route at '/'
app.get('/', (req, res) => {
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You hit home page!\n`)
})

// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
```

Lưu ý ở trên, rằng chúng ta đang gọi biến `session` khi chúng ta `request FileStore`. Sau đó, chúng ta thêm một `instance` vào `FileStore` vào `cấu hình session` của chúng ta.

Chúng ta cũng cần phải làm một việc khác. Theo mặc định, khi chúng ta sử dụng mô-đun '`session-file-store`', nó sẽ tạo một thư mục '`/session`' mới khi nó được gọi lần đầu tiên. Lần đầu tiên và mỗi lần tiếp theo khi chúng ta tạo một `session mới`, mô-đun sẽ tạo một tệp mới cho thông tin `session` trong thư mục `/session`. Vì chúng ta nhập `session-file-store` trong `server.js` và `session-file-store` phụ thuộc vào thư mục `/session`, nên `node` sẽ khởi động lại `server` mỗi khi chúng ta tạo một `session mới`. Cái này thì ko được kể cả trong môi trường `dev` thì chả nhẽ cứ mỗi lần `request` lại `restart` lại `server` -> ko ổn.

Chúng ta có thể `request nodemon` bỏ qua một tệp hoặc thư mục bằng cách gọi '`- ignore`' và thêm nó vào tên tệp hoặc thư mục.

`server $ nodemon --ignore sessions /server.js`

Bạn sẽ cảm thấy khó khắn nếu mỗi lần cần run nó lại phải gõ một đoạn dài như vậy. Hãy tự làm cho nó dễ dàng hơn bằng cách thêm nó trực tiếp vào các tập lệnh `npm` của chúng ta trong tệp `package.json`.

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev:server": "nodemon --ignore sessions/ server.js" // Bạn thêm dòng này vào là ok
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.2",
    "express-session": "^1.15.6",
    "session-file-store": "^1.1.2",
    "uuid": "^3.1.0"
  }
}
```

Bạn đã thêm câu lệnh ở trên vào file `package.json` bạn hoàn toàn có thể gọi lệnh như sau nó tương đương với lệnh mà chúng ta đã `setup` cho nó: (đừng quên tắt server trước khi run lại lệnh này nhé)

`server $ npm run dev:server`

Bây giờ chúng ta hãy tạo lệnh gọi `cURL` và tạo một tệp `cookie mới` sẽ được lưu vào thư mục `client`.

`client $ curl -X GET http://localhost:3000 -c cookie-file.txt`

File `Cookie-file.txt` của bạn bây giờ sẽ có một `id session` mới được lưu trong đó. Nếu bạn bỏ qua '`...s%3A`', thì phần còn lại trước dấu '.' phải khớp với tên của tệp mới được lưu trong thư mục `/session`.

Bây giờ khởi động lại server một lần nữa.

`server $ npm run dev:server`

Sau đó, gọi lệnh `cURL` truyền cho nó file `cookie-file.txt` với flag '-b' trong lần gọi này, để nó gửi `id session` mà chúng ta đã tạo trước khi chúng ta khởi động lại `server`.

`client $ curl -X GET http://localhost:3000 -b cookie-file.txt`

Hãy thử gọi nó bao nhiêu tùy thích. Bạn sẽ nhận được cùng một `output` `id session` mọi lần `request`. Vì vậy, chúng ta có thể thấy ở đây việc tạo kho lưu trữ tệp `session` cho phép chúng ta lưu các `session` ở phía `server`.

giờ bạn đã có một `Server nodejs` sơ khai không có `Authentication` nhưng đã có thể nhận biết được `request` được gửi từ `id session` nào.

[Ở bài tiếp theo mình sẽ hướng dẫn bạn cách `Authentication` và hoàn chỉnh một `Server nodejs`. (PHẦN 2)](https://viblo.asia/p/blog25-tat-ca-nhung-thu-ban-can-de-xay-dung-mot-nodejs-server-authentication-co-ban-express-sessions-passport-and-curl-part-22-series-bi-kip-javascript-phan-21-E1XVOoA6VMz)

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog24-tat-ca-nhung-thu-ban-can-e-xay.html