# Intro
Xin chào các bạn.

Bài viết này sẽ hướng dẫn cho những bạn mới (và dành cho  người hay quên như mình có thể xem lại khi cần :sweat_smile: ) cách xây dựng một ứng dụng web server với những tech như ở trên.
Mình cũng mới làm việc với Nodejs và ExpressJS được tầm khoảng 1 năm nay thôi. Chưa đến mức thành pro gì cả nhưng với những gì mình đã làm thì cũng muốn đóng góp gì đó cho cộng đồng. Vì mình cũng là người google nhờ cậy cộng đồng nhiều mà :blush:

 Ứng dụng web sử dụng Nodejs và framework khá nổi tiếng của nó ExpressJS với template engine là Pug.

Giờ thì bắt đầu đi từ khái niệm đơn giản nhất những cái trên là gì?

# Từ Javascript đến Nodejs
Trước hết cần hiểu **Javascript** là gì?
Ban đầu Javascript là ngôn ngữ ở phía front-end cùng với CSS và HTML để phát triển giao diện cho một web site (hiện giờ thì vẫn được dùng như vậy).  JavaScript là ngôn ngữ kịch bản (Scripting Language) và đơn luồng (single - thread). (Một ngôn ngữ kịch bản là một ngôn ngữ mà không đòi hỏi một bước biên dịch. Ngôn ngữ kịch bản thường thông dịch (Interpreted) thay vì biên dịch (Compiled) ). 
Tuy nhiên ngày nay Javascript cũng được sử dụng rất nhiều ở phía back-end nhờ những ưu điểm của nó đặc biệt ở những hệ thống Real-time và đã đến lúc tìm hiểu về Nodejs.
**Nodejs** là gì?
NodeJS là một nền tảng được xây dựng trên V8 JavaScript Engine – trình thông dịch thực thi mã JavaScript mà chúng ta có thể xây dựng được các ứng dụng một cách dễ dàng và nhanh chóng.
Ưu điểm của Nodejs:
* Nhẹ và hiệu quả: Nodejs chạy đa nền tàng phía Server, sử dụng kiến trúc hướng sự kiện Event-driven, cơ chế non-blocking I/O. Vì là đơn luồng nên nó tốn tốn ít RAM làm cho ứng dụng nhẹ và nhanh hơn
*  Single page Application: Ứng dụng trên một trang với khả năng xử lý nhiều request và phản hồi nhanh
*  Ứng dụng thời gian thực(real-time): Nodejs rất hiệu quả khi dùng để xây dựng các ứng dụng real-time như chat,...

# Vậy ExpressJS là gì?
* ExpressJS là một framework nhỏ, linh hoạt được xây dựng trên nền tảng Nodejs. Nó dùng để xây dựng các ứng dụng web hoặc mobile
* ExpressJS có vô  số các package hỗ trợ để phát triển tính năng. Sử dụng Nodejs làm nền tảng nên nó có performance mạnh mẽ như nhanh, nhẹ,...
* Rất nhiều Framework hiện nay cũng sử dụng ExpressJS làm core để phát triển như SailsJS

OK, và cuối cùng

# Pug là gì?
Trước khi tìm hiểu về Pug thì cùng tìm hiểu khái niệm **Template Engine** là gì trước đã.  
**Template Engine** là một công cụ giúp chúng ta tách các phần HTML ra thành các phần nhỏ hơn và kết hợp view với dữ liệu nhận được từ phía server. Chắc các bạn đã nghe nhiều về việc tách môt file HTML thành  các phần ví dụ như header, body content và footer. Trên một file view cuối cùng chỉ cần import các thành phần là được. 
Các bạn có thể tham khảo hình vẽ dưới đây:
![](https://images.viblo.asia/bf0cd268-52d1-4e95-9749-d1f05c24831c.PNG)
![](https://images.viblo.asia/f0de4ad0-cfb6-43aa-8e3e-7e45b681aa26.PNG)
Tiếp theo cùng tìm hiểu về Pug.

**Pug** là một template engine hiệu suất cao, mạnh mẽ, dễ hiểu và giàu các tính năng.

# Xây dựng ứng dụng với Nodejs và ExpressJS

### 1. Sử dụng npm để tạo ứng dụng đầu tiên

Mình sẽ sử dụng npm để khởi tạo ứng dụng. NPM cũng được sử dụng để sau này để cài mudule nên ai chưa cài thì hãy cài npm vào máy trước đi nhé.
> NPM (Node Package Manager) là bộ quản lý các package, module node.js, cho phép bạn tải và cài đặt các thư viện node.js từ repository https://www.npmjs.com/ 

**1.1. Khởi tạo**

Tạo thư mục trống rồi đặt tên ứng dụng tùy ý. Trong ứng dụng này mình sẽ đặt tên là **expressApp** . Trong thư mực expressApp vừa tạo mở command prompt(nếu trên windows, còn không thì Terminal commands trên Mac hoặc Linux) rồi chạy command như bên dưới:

> npm init

Lệnh command bên trên dùng để khởi tạo một ứng dụng nodejs. Sau khi chạy lệnh trên sẽ có một vài thiết lập cơ bản như tên ứng dụng, version, mô tả, bạn cứ theo các câu hỏi hiển thị trên command prompt(hoặc Terminal) để thiết lập là được. Hoặc nếu cài mặc định thì bạn cứ enter cũng được, nhớ chú ý câu hỏi. Thiết lập ban đầu sẽ giống như bên dưới.
```
{
  "name": "express-app",
  "version": "1.0.0",
  "description": "app for test",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "TDung",
  "license": "ISC",
  "dependencies": {
  }
}

```

Sau khi thiết lập xong thì sẽ có một file **package.json** được tạo. Đây là file sẽ quản lý các các thiết lập cơ bản của ứng dụng cũng như các module được cài.

**1.2. Cài các module cần thiết**

Sau khi cài đặt xong thì tiếp đến là cài các module. Không thì ứng dụng của bạn sẽ chẳng có gì đâu. 

Tiếp tục trên command prompt chạy lệnh cài module như bên dưới:
> $ npm install express body-parser audit bcrypt crypto-js helmet jsonwebtoken

Bạn đợi một lúc để cài hết các module ở bên trên. Sau khi cài đặt xong sẽ có thêm thư mục **node_modules** và **package-lock.json** trong thư mục ứng dụng. 

**1.3. Xây dựng server**

Tiếp đến chúng ta sẽ viết file index để xây dựng server lắng nghe các request. Server mình sẽ thiết lập với cổng 3000.

Về cơ bản bạn chỉ cần tạo một file index.js rồi viết server lắng nghe các request gửi đến rồi phản hồi. Có nhiều hướng dẫn đơn giản thì viết hết mọi thứ trong một file index duy nhất. Nhưng vì đây là một ứng dụng Web Server nên nếu bạn tổ chức file trong ứng dụng tốt thì sau này sẽ phát triển sẽ dễ dàng hơn nhiều. Nên mình sẽ tách các phần như server, routes, views hay config riêng ra để sau này dễ phát triển. (Tất nhiên cách tổ chức file có nhiều và bạn hoàn toàn có thể tùy chỉnh theo ý mình). Đại khái mình sẽ tổ chức file như bên dưới:
![](https://images.viblo.asia/1be1e3ec-6ed2-422f-84b8-70f09170a83d.PNG)

* Đầu tiên, trong thư mục root của ứng dụng bạn tạo một thư mục **config** và trong thư mục config tạo file **app.json**. Đây là file thiết lập cấu hình cho ứng dụng của bạn. Nội dung của app.json như sau: 
```
{
    "port" : 3000
}
```
Đây là cổng để lắng nghe các request gửi tới server.

* Tiếp theo, trong thư mục root bạn tạo tiếp một thư mục **src**, đây là thư mục chứa toàn bộ các mã nguồn chính của bạn như xử lý request và phản hồi các request. Trong thư mục src bạn tạo file **routes.js**, đây là file tiếp nhận tất cả các request tới server và chỉ định nơi xử lý request đó. (tất nhiên là viết ngay tại đây cũng không sao nhưng chuyên nghiệp thì nên viết ở chỗ khác)

File **routes.js** sẽ có nội dung giống như bên dưới:
```
const express = require('express'); // import module express

const router = express.Router(); 
// xử lý request và phản hồi với text "hello world" huyền thoại
router.get('/', function (req, res) {
    res.send("hello world")
});

// export router
module.exports = router;
```
Tạm thời với code bên trên thì khi có request với link: localhost:3000 thì sẽ trả về một text là "hello world". Tất nhiên là đến đây thì chưa được vì chưa có server.

* Bước tiếp theo chúng ta sẽ tạo server để lắng nghe các request. Ra thư mục root rồi tạo một file là **server.js** rồi viết code như bên dưới để thiết lập server.
```
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/app')

module.exports = {
    start() {
        const app = express();

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json())

        // cài đặt bảo mật cho ứng dụng
        var helmet = require('helmet');
        app.use(helmet())
        app.use(
            helmet.contentSecurityPolicy({
              directives: {
                'default-src': ["'self'"],
                'base-uri': ["'self'"],
                'block-all-mixed-content': [],
                'font-src': ["'self'", 'https:', 'data:'],
                'frame-ancestors': ["'self'"],
                'img-src': ["'self'", 'data:'],
                'object-src': ["'none'"],
                'script-src': ["'self'"],
                'script-src-attr': ["'none'"],
                // "style-src" だけデフォルトから'unsafe-inline'を削除
                'style-src': ["'self'", ' https:'],
                'upgrade-insecure-requests': [],
              },
            })
          )
        // add route
        const routes = require('./src/routes')
        app.use('/', routes)
        // start listen serve
        app.listen( config.port , () => {
            console.log('Listen server on port: ' + config.port )
        })
    }
}
```
Mình giải thích một chút các thiết lập trên.

**bodyParser** để thiếp lập cho xử lý nội dung body content ở phần header như dữ liệu gửi lên server qua form chẳng hạn. **urlencoded** là một kiểu định dạng dữ liệu. Bạn có thể quan sát ở phần Header. Ví dụ có một số kiểu như:
* application/x-www-form-urlencoded
* multipart/form-data
* application/json
* application/xml

**helmet** cũng là một thiết lập bảo mật cho trang web. Thiết lập headers HTTP để ngăn chặn một số kiểu tấn công.

**routes** thiết lập định tuyến để nhận cấc request gửi đến. Nơi xử lý chính là cái file routes mà chúng ta vừa tạo ở trên.

**app.listen** trùm cuối là đây. Đây chính là phần tạo cổng lắng nghe. config.port là cổng nghe thiết lập mà chúng ta vừa cấu hình trong app.json

* Bước cuối cùng để khởi động server. Trong thư mục root tạo một file là **index.js** file này để khởi động cái server mà chúng ta vừa tạo ở trên.
```
const app = require('./server');

app.start();
```

OK,  đến đây chúng ta đã tạo xong một server với cổng lắng nghe là 3000. Khởi động server bằng command line. Trên command prompt bạn chạy lệnh như bên dưới:
> node index.js

Trên command prompt nếu khởi động server thành công thì sẽ có dòng **Listen server on port: 3000** được hiển thị. Bạn mở trình duyệt lên và gõ vào link:
> localhost:3000

Nếu server khởi động thành công thì sẽ có dòng **hello world** hiển thị ra trên trình duyệt. OK welcome you come to Nodejs world. :laughing:

### 2. Sử dụng Template Engine để xây dựng giao diện cho ứng dụng

Sau khi đã tạo server thành công thì chúng ta sẽ tiếp tục với việc làm thế nào để có thể hiển thị giao diện cho cho trang web chứ không thể phản hồi bằng text được đúng không. Ở đây mình sử dụng bootstrap để hỗ phần giao diện cho đẹp mắt chút. Bạn có thể download nó ở trang chủ: https://getbootstrap.com/

**2.1. Cài Pug**

Như đã nói ở trên thì chúng ta sẽ sử dụng pug để làm giao diện. Nên việc đầu tiên là phải cài nó đã. Tiếp tục sử dụng command line:
> npm install pug

Bạn có thể tìm hiểu thêm về pug ở đây: https://www.npmjs.com/package/pug

**2.2. Cài đặt Pug vào ứng dụng**

Bạn mới cài module thì chưa đủ để sử dụng. Tiếp đến chúng ta phải cài nó vào ứng dụng để sử dụng. 

Bạn mở lại file **server.js** và thêm code bên dưới vào ngay đoạn trên add routes:

```
// ----------------//
// add view template engine
app.set('view engine', 'pug')
// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'))
// ----------------//
```

> app.set('view engine', 'pug'): cài đặt pug làm template engine cho ứng dụng


> app.use(express.static(__dirname + '/public')) : sử dụng thư mục /public làm nơi chứa các file static

Như cài đặt ở trên bạn phải tạo thư mục **public** , thư mục này chứa các file static như css, js, image.

**2.3. Thêm file tĩnh vào public**

Khi bạn tải bootstrap thì sẽ có thư mục dist bạn copy toàn bộ thư mục dist vào trong thư mục public của ứng dụng.

Tiếp theo, bạn tạo thư mục **views** trong thư mục root. Đây là nơi chứa toàn bộ mã giao diện của ứng dụng của bạn.

**2.4. Tạo layout cơ bản cho app**

Như mình đã nói ở trên thì khi tạo một layout rồi sau đó chỉ cần extend layout đó cho các content nhỏ thì sẽ sử dụng được một layout chung cho các trang.

Trước tiên trong thư mục **views** tạo một thư mục **layout** rồi sau đó trong thư mục layout tạo một file với tên **layout.pug**

Trong file layout.pug bạn code như bên dưới:

```
doctype html
html
  head
    title #{title}
    link(rel='stylesheet', href='/dist/css/style.css')

    link(rel='stylesheet', href='/dist/css/bootstrap.min.css')
    script(src="/dist/js/bootstrap.min.js")

    meta(name="viewport" content="width=device-width, initial-scale=1")
  body
    main
        block header

        block content
```

Như vậy là đã có layout cơ bản cho ứng dụng rồi. Tiếp theo ta sẽ tạo content cho từng trang. Ở đây mình tạo trang **login** cho ứng dụng.

Để trang web nhìn đẹp hơn chút thì trong thư mục **public/dist/css** bạn tạo file **style.css** và thêm code css như bên dưới:

```
body{
  width: auto;
  height: auto;
  font-family: Arial, Helvetica, sans-serif;
  margin: auto;
  background-color: transparent !important;
}
/* ----------------------------------------------- */
/*                 LOGIN PAGE                      */
/* ----------------------------------------------- */
.login-box{
  width: 70% !important;
  margin-top: 9%;
}
.login-box h2{
  text-align: center;
  margin-top: 40px;
}

.btn.btn-primary.btn-sm.btn-block{
  padding: 8px 10px;
  font-size: 20px;
  margin: 25px 0;
}
```

**2.4. Tạo trang đăng nhập cho ứng dụng**

Trong thư mục **views** bạn tạo file **login.pug** rồi thêm nội dung như bên dưới:

```
extend layout/layout

block content
  div.container
    div.container.shadow.p-3.mb-5.bg-white.rounded.login-box
      h2 Sign In
      form(action="/login/auth", method="post", style='padding: 0 50px;')
        div.form-group
          label(for="Username") Username
          input(type="text", class='form-control', name='Username', required)
        div.form-group
          label(for="Password") Password
          input(type="password", class='form-control', name='Password', required)
        button(class='btn btn-primary btn-sm btn-block', type='submit') Login
```

Đến đây bạn đã tạo xong trang đăng nhập. Tiếp theo ta sẽ xử lý request khi gọi đến trang đăng nhập này.

**2.5. Tạo xử lý request cho trang đăng nhập**

Vào thư mục **src** bạn tạo một thư mục **controllers** rồi trong thư mục controllers bạn tạo một file **get-view-login.js**

```
'use strict';
module.exports = {

    getLoginPage: function(req, res){
        return res.render('login', {
            title: 'Login',
        }) 
    },

}
```

Đây là chỗ xử lý khi có request gọi tới trang đăng nhập. Để vào được đến đây bạn phải thêm vào cả routes nữa thì mới được. 

Mở file **routes.js** bạn thêm xử lý cho lệnh gọi trang đăng nhập. Thêm ngay phía trên module.exports
```
// ... thêm 2 dòng này
let loginPage = require('./controllers/get-view-login');
router.get('/login', loginPage.getLoginPage);
// ... thêm 2 dòng này

// export router
module.exports = router;
```

OK, Vậy là đã hoàn tất phần giao diện. Bạn khởi động lại server và request trang đăng nhập bằng request:  **localhost:3000/login**

Sẽ được màn hình như bên dưới :heart_eyes:

![](https://images.viblo.asia/e5115288-4bf4-473b-a670-58daae949892.PNG)

# Kết lại
Vậy là đến đây là mình đã hướng dẫn xong việc tạo một Web Server sử dụng Nodejs, Express và Pug. Bạn có thể thêm rất nhiều xử lý với các request khác nhau. 
Với cách tổ chức file như ở trên sẽ giúp mình dễ dàng quan sát và phát triển hơn. 

Phần tới mình sẽ viết tiếp một hướng dẫn xây dựng một Web API sử dụng Nodejs và ExpressJS. 

Cảm ơn các bạn đã đọc đến tận đây. Ai có ý kiến hay thắc mắc gì có thể comment dưới bài viết này. :blush::blush: