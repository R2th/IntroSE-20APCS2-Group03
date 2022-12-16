![image.png](https://images.viblo.asia/153888df-e670-454b-9dbb-f60d4f25326e.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉. Nếu bạn thấy Blog này hay xin hãy cho mình một like và POST ký để ủng hộ mình nhé 😊.

Ngày xưa lúc mình mới tiếp cận với Nodejs và đọc các tutorial hướng dẫn trêng mạng, mình luôn phải vật lộn với việc hiểu phần Authentication của nó. Thay vì thực sự giải thích cơ chế và những gì đang xảy ra, mình chỉ cảm thấy như tác giả chỉ đơn giản là cung cấp một hướng dẫn về cách sao chép/dán từ tài liệu. Bài viết này nhằm thực sự hướng dẫn bạn qua quy trình authentication và giải thích từng cơ chế một.

**LỜI KHUYÊN: Bạn NÊN vừa đọc vừa đối chiêu với code nếu có thể thì hãy code nó ra là tốt nhất. Việc đó giẽ giúp bạn hiểu hơn khi đọc giải thích. Nếu chỉ đọc giài thích có thể bạn sẽ cảm thấy có lúc rất khó hiểu.**

Điều kiện tiền quyết:mình giả sử như các bạn đã có thế sử dụng cơ bản với `Terminal/command-line interface(CLI)` và `Javascript/Node.js`.

PHẦN 2 - Authentication ([Các bạn tham khảo Phần 1 ở đây nhé](https://viblo.asia/p/blog24-tat-ca-nhung-thu-ban-can-de-xay-dung-mot-nodejs-server-authentication-co-ban-express-sessions-passport-and-curl-part-12-series-bi-kip-javascript-phan-20-obA46PABLKv))
========

Bước 1. Thêm endpoint login
--------------------------------

Đầu tiên, chúng ta sẽ thêm một route `login` vào ứng dụng của mình với cả hàm GET và POST. Lưu ý rằng trong hàm POST, chúng ta đang gọi '`req.body`'. Điều này sẽ ghi lại dữ liệu mà chúng ta gửi đến `server` trong `request POST` của chúng ta.

```javascript
//npm modules
const express = require('express');
const { v4:uuid } = require("uuid");
const session = require('express-session')
const FileStore = require('session-file-store')(session);

//create the server
const app = express();

//add & configure middleware
app.use(session({
  genid:(req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() //use UUIDs for session IDs
  },
  store:new FileStore(),
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true
}))

//create the homepage route at '/'
app.get('/',(req, res) => {
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You got home page!\n`)
})

//create the login get and post routes
app.get('/login',(req, res) => {
  console.log('Inside GET /login callback function')
  console.log(req.sessionID)
  res.send(`You got the login page!\n`)
})

app.post('/login',(req, res) => {
  console.log('Inside POST /login callback function')
  console.log(req.body)
  res.send(`You posted to the login page!\n`)
})

//tell the server what port to listen on
app.listen(3000,() => {
  console.log('Listening on localhost:3000')
})
```

Bước 2. Configure Express để có thể đọc dữ liệu từ POST
--------------------------------------------------------

Trong terminal `client` của chúng ta, chạy một lệnh cURL mới.

`curl -X POST http://localhost:3000/login -b cookie-file.txt -H 'Content-Type:application/json' -d '{"email":"test@test.com", "password":"password"}'`

Lưu ý, nếu bạn đang sử dụng máy Windows, bạn sẽ cần sử dụng dấu ngoặc kép và sử dụng gạch chéo ngược để phân biệt chúng, như sau:

`curl -X POST  http://localhost:3000/login -b cookie-file.txt -H "Content-Type:application/json" -d "{\"email\":\"test@test.com\", \"password\":\"password\"}"`

Mình sẽ chỉ sử dụng các dấu ngoặc kép cho phần còn lại của bài viết này vì nó dễ đọc hơn. Chỉ cần nhớ trên Windows, bạn cần sử dụng dấu ngoặc kép và escape nó bằng dẫu chéo ngược.

Được rồi hãy quay lại nào. Ở trên, chúng ta đã thay đổi một vài điều.

1.  Chúng ta hiện đang sử dụng `-X POST` thay vì `-X GET`
2.  Chúng ta đã thêm `flag -H` để đặt loại nội dung `headers` thành `application/json`
3.  Chúng ta thêm `flag -d` cùng với dữ liệu mà chúng ta muốn gửi. Lưu ý rằng nó nằm trong dấu ngoặc kép

Nhìn vào output server của chúng ta, chúng ta thấy:

```
Inside POST /login callback function
undefined
```

Có vẻ như `req.body` là '`undefined`'. Vấn đề ở đây là `Express` không thực sự biết cách đọc nội dung `JSON`, vì vậy chúng ta cần thêm một `middleware` khác để thực hiện việc này. Chúng ta có thể sử dụng `middleware` `body-parser` để phân tích cú pháp cơ thể dữ liệu và thêm nó vào thuộc tính `req.body.`. Chúng ta lại cài đặt nó thôi.

`server $ npm install body-parser --save`

*Ngoài lề:Dùng Nodejs rất nhẹ nhàng nhất là Express vì nó chả có cái gì cả. Cần gì thì cứ dùng Middleware nấy là xong.*

Sau đó, `require` nó trong `server.js` và `configure express` để sử dụng nó.

```javascript
//npm modules
const express = require('express');
const { v4:uuid } = require("uuid")
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');

//create the server
const app = express();

//add & configure middleware
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.use(session({
  genid:(req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() //use UUIDs for session IDs
  },
  store:new FileStore(),
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true
}))

//create the homepage route at '/'
app.get('/',(req, res) => {
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You got home page!\n`)
})

//create the login get and post routes
app.get('/login',(req, res) => {
  console.log('Inside GET /login callback function')
  console.log(req.sessionID)
  res.send(`You got the login page!\n`)
})

app.post('/login',(req, res) => {
  console.log('Inside POST /login callback function')
  console.log(req.body)
  res.send(`You posted to the login page!\n`)
})

//tell the server what port to listen on
app.listen(3000,() => {
  console.log('Listening on localhost:3000')
})
```

Bạn sẽ nhận thấy ở trên rằng khi chúng ta định `configure` ứng dụng của mình để sử dụng `middleware` phân tích cú pháp `body-parser`, `bodyParser.json()` và `bodyParser.urlencoded()`. Trong khi chúng ta gửi dữ liệu của mình trực tiếp đến `server` ở định dạng `JSON`.

Bước 3. Add và configure `Passport.js`
------------------------------------

Cài đặt mô-đun `passport.js` cùng với mô-đun authentication passport-local strategy.

`server $ npm install passport passport-local --save`

Trước khi chúng ta đi vào code, hãy nói về quy trình authentication. (Đọc có khi sẽ có chút khó hiểu vì bạn vẫn chưa mường tượng được nó. Nhưng ko sao bí quyết là bạn đọc qua 1 lần sau đó nhìn vào `source code` và đọc lại sẽ hiểu rõ nó hơn. Ở đây mình chỉ `Overview` qua thôi)

1.  User sẽ `POST` thông tin login của họ lên route `/login`
2.  Chúng ta cần làm gì đó với dữ liệu đó. Đây là nơi `passport` xuất hiện. Chúng ta có thể gọi `passport.authenticate(‘login strategy’, callback(err, user, info))`. Hàm này nhận 2 tham số. 'Strategy login' của chúng ta là 'local' trong trường hợp này, vì chúng ta sẽ authentication bằng `email` và `password` (bạn có thể tìm thấy [danh sách các `strategy` `login` khác](http://www.passportjs.org/docs/facebook) bằng `passport`. Chúng bao gồm `Facebook`, `Twitter`, v.v.) và `function callback` cấp cho chúng ta quyền truy cập vào đối tượng `user` nếu `authentication` thành công và đối tượng `error` nếu không thành công .
3.  `passport.authenticate()` sẽ gọi `strategy authentication` '`local`' của chúng ta, vì vậy chúng ta cần **configure** `passport` để sử dụng `strategy` đó. Chúng ta có thể `configure passport` bằng `passport.use(new strategyClass)`. Ở đây, chúng ta cho `passport` biết cách sử dụng `strategy local` để `authentication user`.
4.  Bên trong khai báo `StrategyClass`, chúng ta sẽ lấy dữ liệu từ `request POST` của chúng ta, sử dụng dữ liệu đó để tìm `user` phù hợp trong `cơ sở dữ liệu` và kiểm tra xem thông tin `login` có khớp không. Nếu chúng khớp, `passport` sẽ thêm hàm `login()` vào đối tượng `request` của chúng ta và chúng ta sẽ gọi hàm **callback** `passport.authenticate()`.
5.  Bên trong hàm **callback** `passport.authenticate()`, chúng ta gọi hàm `req.login()`.
6.  Hàm `req.login(user, callback())` nhận đối tượng `user` mà chúng ta vừa trả về từ `strategy local` của mình và gọi `passport.serializeUser(callback())`. Nó nhận đối tượng `user` đó và 
    1.  Lưu _user id_ vào **session file store**
    2.  Lưu _user id_ trong **request object as request.session.passport**
    3.  Thêm _user object_ yêu **request object as request.user** . 
7. Bây giờ, trên các request tiếp theo đến các `route` sẽ được `authorized`, chúng ta có thể truy xuất đối tượng `user` mà không cần `request user login` lại (bằng cách lấy `id` từ `session file store` và sử dụng `id` đó để lấy đối tượng `user` từ `cơ sở dữ liệu` và thêm nó vào đối tượng `request` của chúng ta ).

OK! Đó có lẽ là quá nhiều cho phần giải thích này rồi!
Mọi thứ sẽ rõ ràng hơn sau khi xem code và `ouput log` của `server`.

```javascript
//npm modules
const express = require('express');
const { v4:uuid } = require("uuid")
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
  {id:'2f24vvg', email:'test@test.com', password:'password'}
]

//configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField:'email' },
  (email, password, done) => {
    console.log('Inside local strategy callback')
    //here is where you make a call to the database
    //to find the user based on their username or email address
    //for now, we'll just pretend we found that it was users[0]
    const user = users[0] 
    if(email === user.email && password === user.password) {
      console.log('Local strategy returned true')
      return done(null, user)
    }
  }
));

//tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here')
  done(null, user.id);
});

//create the server
const app = express();

//add & configure middleware
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.use(session({
  genid:(req) => {
    console.log('Inside session middleware genid function')
    console.log(`Request object sessionID from client:${req.sessionID}`)
    return uuid() //use UUIDs for session IDs
  },
  store:new FileStore(),
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());

//create the homepage route at '/'
app.get('/', (req, res) => {
  console.log('Inside the homepage callback')
  console.log(req.sessionID)
  res.send(`You got home page!\n`)
})

//create the login get and post routes
app.get('/login', (req, res) => {
  console.log('Inside GET /login callback')
  console.log(req.sessionID)
  res.send(`You got the login page!\n`)
})

app.post('/login', (req, res, next) => {
  console.log('Inside POST /login callback')
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    console.log(`req.session.passport:${JSON.stringify(req.session.passport)}`)
    console.log(`req.user:${JSON.stringify(req.user)}`)
    req.login(user, (err) => {
      console.log('Inside req.login() callback')
      console.log(`req.session.passport:${JSON.stringify(req.session.passport)}`)
      console.log(`req.user:${JSON.stringify(req.user)}`)
      return res.send('You were authenticated & logged in!\n');
    })
  })(req, res, next);
})

//tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
```

OK. Có vẻ như chúng ta đã thêm một loạt code ở đây, vì mình đã thêm rất nhiều `console.log` để giễ dàng hơn trong việc phân tích code. ***(Các bạn vừa đọc phần giải thích vừa nhìn vào `code` từng bước từng bước 1 chứ nếu chỉ đọc giải thích ko sẽ rất khó hiểu)***

1.  Ở đầu, chúng ta `request passport` và `strategy local passport`.
2.  Đi xuống giữa file, chúng ta có thể thấy rằng chúng ta định `configure` ứng dụng của mình để sử dụng `passport` làm `middleware` với các lệnh gọi đến `app.use(passport.initialize())` và `app.use(passport.session())`. Lưu ý rằng chúng ta gọi những hàm này sau khi chúng ta configure ứng dụng của mình để sử dụng `express-session` và `session-file-store`. Điều này là do `passport` sẽ dựa trên những thứ này để hoạt động.
3.  Đi sâu xuống, chúng ta thấy hàm `app.post('login')` của chúng ta ngay lập tức gọi `passport.authenticate()` với `strategy local`.
4.  `Strategy local` được `configure` ở đầu tệp với `passport.use(new LocalStrategy())`. `Strategy local` sử dụng tên `user` và `password` để `authentication user`; Tuy nhiên, vì mặc định của `Strategy local` sử dụng địa chỉ `email` thay vì `user`, vì vậy ở đây chúng ta chỉ đặt bí danh trường `user` là '`email`'. Sau đó, chúng ta cho `strategy local` biết cách tìm và xác định `user` trong `cơ sở dữ liệu`. Ở đây, thông thường bạn sẽ thấy một cái gì đó giống như '`DB.findById()`' nhưng bây giờ chúng ta sẽ bỏ qua điều đó và giả định rằng `user` chính xác được trả lại cho chúng ta bằng cách gọi `array user` của chúng ta chứa đối tượng `user` duy nhất của chúng ta. Lưu ý, trường '`email`' và '`password`' được chuyển vào hàm bên trong `LocalStrategy()` mới là `email` và `password` mà chúng ta gửi đến server cùng với `request POST` của chúng ta. Nếu dữ liệu chúng ta nhận được từ `request POST` khớp với dữ liệu chúng ta tìm thấy trong `cơ sở dữ liệu` của mình, chúng ta gọi là `done(error object, user object)` và truyền vào `null` và đối tượng `user` được trả về từ cơ sở dữ liệu. (Chúng ta sẽ đảm bảo xử lý các trường hợp thông tin `authentication` không khớp ở cuối bài này các bạn yên tâm.)
5.  Sau khi hàm `done()` được gọi, chúng ta đi tới hàm callback `passport.authenticate()`, nơi chúng ta chuyển đối tượng `user` vào hàm `req.login()` (hãy nhớ rằng, lệnh gọi tới `passport.authenticate()` đã thêm thông tin `login()` hàm đối với đối tượng `request` của chúng ta ([nếu bạn đã đọc 1 bài viết của mình về **Factory Design Pattern** thì sẽ hoàn toàn hiểu làm cách nào có thể gắn `login` vào `request` - còn nếu bạn ko biết cũng ko sao :D](https://viblo.asia/p/blog10-gioi-thieu-ve-javascript-design-patterns-kem-vi-du-truc-quan-series-bi-kip-javascript-phan-8-vlZL9NR8VQK)). Hàm `req.login()` xử lý việc tuần tự hóa `id user` vào `session store` và bên trong đối tượng `request` của chúng ta và cũng thêm đối tượng `user` vào đối tượng `request`.
6.  Cuối cùng, `respond` trả về rằng "`You were authenticated & logged in!`"

Chúng ta cùng thử nhé! Gọi `request cURL` và gửi thông tin `login` của chúng ta đến `server`. Lưu ý, trước khi thực hiện thao tác bên dưới, mình đã xóa tất cả các tệp được lưu trữ trong thư mục `/session` của mình và mình đang gọi `request POST` với `flag '-c'` để `tạo/ghi đè` `cookie-file.txt` trong thư mục `client` của chúng ta. Vì vậy, về cơ bản chúng ta đang bắt đầu với tất cả mọi thứ đã sạch sẽ.

```
client $ curl -X POST  http://localhost:3000/login -c cookie-file.txt -H 'Content-Type:application/json' -d '{"email":"test@test.com", "password":"password"}'
You were authenticated & logged in!
```

Trong ouput log server, bạn sẽ thấy một cái gì đó như sau.

```
Inside session middleware genid function
Request object sessionID from client:undefined
Inside POST /login callback
Inside local strategy callback
Local strategy returned true
Inside passport.authenticate() callback
req.session.passport:undefined
req.user:undefined
Inside serializeUser callback. User id is save to the session file store here
Inside req.login() callback
req.session.passport:{"user":"2f24vvg"}
req.user:{"id":"2f24vvg","email":"test@test.com","password":"password"}
```

Như bạn thấy ở trên, trước khi chúng ta gọi `req.login()`, đối tượng `req.session.passport` và đối tượng `req.user` là `undefined`. Sau khi hàm `req.login()` được gọi (tức là khi chúng ta đang ở trong hàm **callback** `req.login()`), chúng đã được xác định và in ra log tương ứng!

Bước 4. Thêm `requires authorization` (yếu cầu phải được ủy quyền)
-----------------------------------------

Hãy thêm một `route` vào ứng dụng của chúng ta đó là `requires authorization`. Lưu ý, bây giờ `user` đã được '`authentication`' (tức là đã login), chúng ta có thể nói về '`authorization`' cho `server` cho các `route` nào `request user login` trước khi họ có thể được truy cập vào logic để lấy dữ liện bên trong.

```JavaScript
//npm modules
const express = require('express');
const { v4:uuid } = require("uuid")
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
  {id:'2f24vvg', email:'test@test.com', password:'password'}
]

//configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField:'email' },
  (email, password, done) => {
    console.log('Inside local strategy callback')
    //here is where you make a call to the database
    //to find the user based on their username or email address
    //for now, we'll just pretend we found that it was users[0]
    const user = users[0] 
    if(email === user.email && password === user.password) {
      console.log('Local strategy returned true')
      return done(null, user)
    }
  }
));

//tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here')
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is:${id}`)
  const user = users[0].id === id ? users[0] :false; 
  done(null, user);
});

//create the server
const app = express();

//add & configure middleware
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.use(session({
  genid:(req) => {
    console.log('Inside session middleware genid function')
    console.log(`Request object sessionID from client:${req.sessionID}`)
    return uuid() //use UUIDs for session IDs
  },
  store:new FileStore(),
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());

//create the homepage route at '/'
app.get('/', (req, res) => {
  console.log('Inside the homepage callback')
  console.log(req.sessionID)
  res.send(`You got home page!\n`)
})

//create the login get and post routes
app.get('/login', (req, res) => {
  console.log('Inside GET /login callback')
  console.log(req.sessionID)
  res.send(`You got the login page!\n`)
})

app.post('/login', (req, res, next) => {
  console.log('Inside POST /login callback')
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    console.log(`req.session.passport:${JSON.stringify(req.session.passport)}`)
    console.log(`req.user:${JSON.stringify(req.user)}`)
    req.login(user, (err) => {
      console.log('Inside req.login() callback')
      console.log(`req.session.passport:${JSON.stringify(req.session.passport)}`)
      console.log(`req.user:${JSON.stringify(req.user)}`)
      return res.send('You were authenticated & logged in!\n');
    })
  })(req, res, next);
})

app.get('/authrequired', (req, res) => {
  console.log('Inside GET /authrequired callback')
  console.log(`User authenticated? ${req.isAuthenticated()}`)
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
})

//tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
```

Bạn có thể thấy ở trên, chúng ta đã thêm một route '`/authrequired`' có sẵn thông qua hàm `get` để kiểm tra đối tượng `request` của chúng ta để xem liệu `req.isAuthenticated()` có đúng không. Đây là `function` được thêm vào đối tượng `request` của chúng ta bằng `passport` ([Xem qua để hiểu cách thêm Factory design pattern](https://viblo.asia/p/blog10-gioi-thieu-ve-javascript-design-patterns-kem-vi-du-truc-quan-series-bi-kip-javascript-phan-8-vlZL9NR8VQK)). Hãy tạo một `session mới` bằng cách truy cập `home`, sau đó sử dụng `session` mới đó để thử chuyển sang route `/authrequired`.

Lưu ý, trong `request` thứ hai của bên dưới, chúng ta đang dùng `flag '-L'`, `flag` này `request cURL` tuân thủ theo các chuyển hướng trong `logic` của chúng ta.

```
client $ curl -X GET http://localhost:3000 -c cookie-file.txt
You got home page!
client $ curl -X GET http://localhost:3000/authrequired -b cookie-file.txt -L
You got home page!
```

Bây giờ, hãy kiểm tra `ouput log của server`.

```
#first request to the home page
Inside session middleware genid function
Request object sessionID from client: undefined
Inside the homepage callback
e6388389-0248-4c69-96d1-fda44fbc8839
#second request to the /authrequired route
Inside GET /authrequired callback
User authenticated? false
```

Bạn có thể thấy ở trên rằng chúng ta chưa bao giờ sử dụng hàm `callback` của `passport.deserializeUser()`, vì chúng ta chưa `authentication`. Bây giờ, hãy truy cập lại `route login` và sử dụng `cookie-file.txt` hiện có của chúng ta, sau đó truy cập vào route `/authrequired`.

```
curl -X POST http://localhost:3000/login -b cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"test@test.com", "password":"password"}'
You were authenticated & logged in!
curl -X GET http://localhost:3000/authrequired -b cookie-file.txt -L
you hit the authentication endpoint
```

Lần này, bạn có thể thấy chúng ta nhận được thông báo "`you hit the authentication endpoint`"
Trong `ouput log server`, chúng ta thấy:

```
Inside POST /login callback
Inside local strategy callback
Local strategy returned true
Inside passport.authenticate() callback
req.session.passport: undefined
req.user: undefined
Inside serializeUser callback. User id is save to the session file store here
Inside req.login() callback
req.session.passport: {"user":"2f24vvg"}
req.user: {"id":"2f24vvg","email":"test@test.com","password":"password"}
Inside deserializeUser callback
The user id passport saved in the session file store is: 2f24vvg
Inside GET /authrequired callback
User authenticated? true
```

Một điều mới cần chỉ ra ở đây là chúng ta đã nhận được hàm `callback deserializeUser`, hàm này khớp `id session` của chúng ta với `session-file-store` và truy xuất `id user` của chúng ta.

Bước 5. Kết nối `cơ sở dữ liệu` và xử lý thông tin `login` không chính xác
--------------------------------------------------------------------------

Đây sẽ là một bước tiến lớn nữa! Đầu tiên, hãy tạo một thư mục khác bên trong `authTuts` có tên là '`db`', khởi tạo npm và cài đặt [json-server](https://www.npmjs.com/package/json-server) và tạo một tệp `db.json` mới.

```
authTuts $ mkdir db
authTuts $ cd db
db $ npm init -y
db $ npm install json-server --save
db $ touch db.json
```

Sau khi cài đặt xong `json-server`, hãy thêm tập lệnh “`json:server`” mới vào `package.json` của nó (`db/package.json`):

```json
{
  "name": "db",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "json:server": "json-server --watch ./db.json --port 5000"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "json-server": "^0.17.0"
  }
}
```

Vậy mục đích của tất cả những điều chúng ta làm này giờ là gì? 
`json-server` là một `package` tự động thiết lập các route `RESTful` cho dữ liệu trong tệp `db.json`. Hãy thử sao chép/dán phần sau vào tệp db.json của bạn.

```json
{
  "users": [
    {
      "id":"2f24vvg",
      "email": "test@test.com",
      "password": "password" 
    },
    {
      "id":"d1u9nq",
      "email": "user2@example.com",
      "password": "password"
    }
  ]
}
```

Sau đó gọi '`npm run json:server`' từ thư mục `/db`.

`db $ npm run json:server`

Sau đó, mở [http://localhost:5000/user](http://localhost:5000/users) trong trình duyệt của bạn. Bạn sẽ thấy `JSON` từ tệp `db.json` của chúng ta đang được xuất hiện. 
Hãy thử truy cập vào một route `/user` cụ thể:[http://localhost:5000/users/2f24vvg](http://localhost:5000/users/2f24vvg). Bạn sẽ chỉ thấy `id`, `email` và `password` của `user đó`. 
Hãy thử lại lần nữa, nhưng thay vì chuyển trực tiếp `id user` vào `URL`, hãy chuyển địa chỉ `email` dưới dạng tham số truy vấn tới URL:[http://localhost:5000/users? Email=user2@example.com](http://localhost:5000/users?email=test@test.com). Lần này, bạn sẽ nhận được đối tượng `JSON` của `user` thứ hai của chúng ta. Khá tuyệt, phải không?! Một `Fake API` hoàn hảo.\

Trong thực tế cũng vậy mô hình Microservice chúng ta sẽ có nhiều `RESTful API` khác nhau cho các `feature` khác nhau. Và hiện tại chúng ta cứ xem như phần `CRUD` (*Thêm xóa sửa User và quản lý user*) một bên khác đang làm và mình tạm thời Mock nó bằng cái `Fake API` này.

Để server json chạy trong tab riêng của nó trong terminal và hãy lật lại tab `Terminal` của chúng ta trong thư mục server (hoặc mở một cái mới nếu bạn cần) và hãy cài đặt `axios`, một gói giúp tìm nạp dữ liệu. (`fetch data`)

`server $ npm install axios --save`

Trong `configure LocalStrategy` của chúng ta, bây giờ chúng ta sẽ tìm `fetch` đối tượng `user` của chúng ta từ `endpoint REST/users` bằng cách sử dụng địa chỉ `email` làm tham số truy vấn (giống như chúng ta đã làm theo cách thủ công trước đây). Trong khi đó cũng cập nhật `configure` của chúng ta để xử lý thông tin `login user` không hợp lệ hoặc bất kỳ `error` nào được trả về bởi `axios` từ `server json`.

Trong hàm `passport.deserializeUser()` của chúng ta, hãy trả về đối tượng `user` bằng cách gọi `axios` để truy xuất endpoint `/users` và chuyển `id user` trong đường dẫn (tức là `/users/:id`).

Hãy cũng xử lý các `error` khác nhau có thể xuất hiện trong quá trình `authentication` trong hàm callback` passport.authenticate()` của chúng ta và thay vì chỉ cho `user` biết rằng họ đã `login`, hãy chuyển hướng `user` đến đường dẫn `/authrequired`.

```javascript
//npm modules
const express = require('express');
const { v4: uuid } = require("uuid")
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    axios.get(`http://localhost:5000/users?email=${email}`)
    .then(res => {
      const user = res.data[0]
      if (!user) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      if (password != user.password) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      return done(null, user);
    })
    .catch(error => done(error));
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  axios.get(`http://localhost:5000/users/${id}`)
  .then(res => done(null, res.data) )
  .catch(error => done(error, false))
});

// create the server
const app = express();

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// create the homepage route at '/'
app.get('/', (req, res) => {
  res.send(`You got home page!\n`)
})

// create the login get and post routes
app.get('/login', (req, res) => {
  res.send(`You got the login page!\n`)
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/authrequired');
    })
  })(req, res, next);
})

app.get('/authrequired', (req, res) => {
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
})

// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
```

Như bạn có thể thấy ở trên, mình đã xóa tất cả `code` dùng để `ouput log server` của chúng ta. Vì bây giờ chúng ta đã hiểu quy trình `authentication`, nên tất cả việc `logging` đó là không cần thiết. Có khá nhiều `code` mới ở trên, nhưng mình nghĩ rằng nó sẽ khá dễ dàng để hiểu những gì đang xảy ra. Hầu hết chúng ta chỉ thêm câu lệnh '`if`' để xử lý bất kỳ `error` nào được `throw` ra.

Hãy thử gọi endpoint `login` với `request CURL POST`. Lưu ý, mình đã bỏ flag '`-X POST`' vì chúng ta muốn `cURL` đi theo chuyển hướng từ route `/login` đến route `/authrequired` mà chúng ta GET được. Nếu chúng ta để flag '`-X POST`' thì nó cũng sẽ cố gắng `POST` lên route `/authrequired`. Thay vào đó, chúng ta sẽ chỉ để `cURL` phán đoán nó sẽ làm gì trên mỗi `route`.

```
client $ curl http://localhost:3000/login -c cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"test@test.com", "password":"password"}' -L
you hit the authentication endpoint
```

Bước 6. Xử lý mã hóa password
--------------------------------

Đầu tiên, hãy cài đặt `bcrypt` trên `server` của chúng ta.

```
server $ npm install bcrypt-nodejs --save
```

Bây giờ chúng ta `require` nó trong tệp `server.js` và gọi nó trong `configure LocalStrategy`, nơi chúng ta khớp thông tin login mà user gửi với thông tin login được lưu trên chương trình phụ trợ. Đầu tiên, bạn nhập `password` bạn nhận được từ `user`, `password` này phải là văn bản thuần túy và đối số thứ 2 là `password` được băm (`hash`) và được lưu trữ trong `cơ sở dữ liệu`.

```javascript
//npm modules
const express = require('express');
const { v4: uuid } = require("uuid")
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    axios.get(`http://localhost:5000/users?email=${email}`)
    .then(res => {
      const user = res.data[0]
      if (!user) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      return done(null, user);
    })
    .catch(error => done(error));
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  axios.get(`http://localhost:5000/users/${id}`)
  .then(res => done(null, res.data) )
  .catch(error => done(error, false))
});

// create the server
const app = express();

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// create the homepage route at '/'
app.get('/', (req, res) => {
  res.send(`You got home page!\n`)
})

// create the login get and post routes
app.get('/login', (req, res) => {
  res.send(`You got the login page!\n`)
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/authrequired');
    })
  })(req, res, next);
})

app.get('/authrequired', (req, res) => {
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
})

// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
```

Bây giờ chúng ta chỉ cần đảm bảo rằng chúng ta đã lưu trữ `password hash` trong `cơ sở dữ liệu`. Bạn có thể [sử dụng công cụ này](https://www.browserling.com/tools/bcrypt) để hash 'password' và lưu trữ các `value password` trong tệp 'db.json'.

```json
{
  "users": [
    {
      "id":"2f24vvg",
      "email": "test@test.com",
      "password": "$2a$12$nv9iV5/UNuV4Mdj1Jf8zfuUraqboSRtSQqCmtOc4F7rdwmOb9IzNu" 
    },
    {
      "id":"d1u9nq",
      "email": "user2@example.com",
      "password": "$2a$12$VHZ9aJ5A87YeFop4xVW.aOMm95ClU.EviyT9o0i8HYLdG6w6ctMfW"
    }
  ]
}
```

Cuối cùng, hãy thử login lại.

```console
client $ curl http://localhost:3000/login -c cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"test@test.com", "password":"password"}' -L
you hit the authentication endpoint
```

Yeah :D You did it!
=================

Hy vọng rằng bạn đã biết thêm một chút về những điều sau:

*   `Express` và cách nó sử dụng `middleware`
*   Cách dữ liệu `session` được lưu trữ và truy xuất cả trên `server` và `client`
*   Quy trình `authentication` của `passport` và cách sử dụng nó để `authorization`
*   Cách sử dụng `bcrypt` để kiểm tra dựa trên `password` đã `hash`.

Mình sẽ để thêm quy trình `POST` `Signup` như một bài tập cho bạn. Và đây là một gợi ý nhỏ: hãy kiểm tra để đảm bảo rằng không có `user` có địa chỉ `email` đó đã có trong `cơ sở dữ liệu`, nếu không có, bạn có thể sử dụng `axios.post()` để lưu trữ dữ liệu trong `db.json(đảm bảo password đã được hash bằng bcrypt)`, sau đó gọi `req.login()` với đối tượng `user` mà bạn đã tạo.

Và cuối cùng, hãy luôn tham khảo tài liệu nếu bạn đang tìm kiếm thêm thông tin!

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog25-tat-ca-nhung-thu-ban-can-e-xay.html