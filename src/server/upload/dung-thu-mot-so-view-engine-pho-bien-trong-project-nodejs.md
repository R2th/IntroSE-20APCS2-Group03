# View engine trong Node.js là gì?
![](https://images.viblo.asia/05327149-f4ab-4e69-90cf-b6250108eeba.png)
Một cách dễ hiểu nhất thì view engine trong Node.js cũng giống như  Blade trong Laravel vậy. Vậy định nghĩa một cách cơ bản nhất thì view engine chính là công cụ giúp chúng ta viết code HTML một cách ngắn gọn và đơn giản hơn cách thông thường đồng thời nó có thể sử dụng lại. Ngoài ra nó có thể đưa dữ liệu vào từ phía server và render ra đoạn HTML cuối cùng. Một số package view engine thường gặp trong project NodeJS/Express có thể kể ra như sau:
* [EJS](https://github.com/tj/ejs)
* [Pug](https://github.com/pugjs/pug) (Trước đây là Jade)
* [ Handlebars](https://github.com/wycats/handlebars.js)
* [Haml.js](https://github.com/tj/haml.js)
* [Nunjucks](https://github.com/mozilla/nunjucks)
* ...

Hôm nay mình sẽ dùng thử một vài template trên xem cái nào dễ dùng hơn nhé. Bắt đầu thôi...

# EJS

![](https://images.viblo.asia/0669a426-3187-4915-a11e-5441fafbd903.png)

Đầu tiên để tạo demo cho bài viết này ta cần phải tạo một project base với ExpressJS nhé. Để tạo nhanh nhất mình dùng `express-generator`.
```bash
sudo npm install express-generator -g
express --view=ejs Demo_EJS
```
Khi chạy xong lệnh tạo project với view engine là ejs ta có project với cấu trúc thư mục như sau:
![](https://images.viblo.asia/5a283ec7-ae67-41a9-a66e-313805eae33b.png)

Như vậy với câu lệnh trên thì ta đã tạo được 1 project Express sử dụng sẵn view engine EJS. View engine này được setup trong file app.js:
```javascript
// ...
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ...

```

Tiếp theo để minh họa cách sử dụng mình sẽ thực hiện việc bóc tách layout cơ bản của trang web và render dữ liệu từ server. Đầu tiên ta thử việc render ra dữ liệu từ server.

Chỉnh sửa file `routes/index.js`:
```javascript 
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let list = [
      {name: 'PHP'},
      {name: 'Ruby'},
      {name: 'Java'},
      {name: 'Python'},
      {name: 'dotNet'},
      {name: 'C#'},
      {name: 'Swift'},
      {name: 'Pascal'},
  ]
  res.render('index', { title: 'Demo Ejs', list: list });
});

module.exports = router;
```

File `views/index.ejs`:
```javascript
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <header>
      <h3>This is header</h3>
    </header>
    <main>
      <h1><%= title %></h1>
      List of programming languages
      <ul>
          <% list.forEach(function(item) { %>
        <li><%= item.name %></li>
          <% }); %>
      </ul>
    </main>
    <footer>
      <h3>This is footer</h3>
    </footer>
  </body>
</html>

```

Như vậy ta đã thực hiện truyền dữ liệu từ server sang view và render ra. Ngoài ra ta có thể tách các phần header, footer bằng cách thêm các file header.ejs, footer.ejs sau đó include vào như sau:
```javascript
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <header>
      <% include header %>
    </header>
    <main>
      <h1><%= title %></h1>
      List of programming languages
      <ul>
          <% list.forEach(function(item) { %>
        <li><%= item.name %></li>
          <% }); %>
      </ul>
    </main>
    <footer>
      <% include footer %>
    </footer>
  </body>
</html>
```

# Pug

![](https://images.viblo.asia/cb487f14-bc2f-426c-8903-3067e9d76c40.png)
Pug - tên trước đây là Jade, cũng là 1 view engine khá phổ biến trong các project Nodejs. Để sử dụng nó làm view engine ta setup như sau:
```javascript
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```
Với ví dụ như trên ta tạo các file pug với nội dung như sau:
```javascript
// file layout.pug
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    include header
    block content
    include footer
```

```javascript
// file index.pug
extends layout

block content
  h1= title
  | List of programming languages
  ul
    each item in list
      li= item.name
```

Như vậy với cùng một nội dung ta thấy cách viết của Pug rất rõ ràng, ngắn gọn và dễ hiểu. Pug có cách hoạt động gần giống như ngôn ngữ lập trình Python tức là dùng indent hoặc khoảng trắng. Ta không cần quan tâm thẻ đóng/mở vì Pug sẽ thay bạn làm điều đó. Pug thật tuyệt vời phải không nào :D

# Hbs (Handlebars.js)

![](https://images.viblo.asia/6d611f57-3e96-4ac0-9b9d-c86fd83c9985.png)

Để sử dụng template này ta set view engine thành `hbs`. Đồng thời ta phải register các block (trong handlebarjs gọi là partial) như sau:
```javascript
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
```
Với bài toán trên ta cũng sẽ tạo các file hbs có nội dung như sau:
```javascript
// file layout.hbs
<!DOCTYPE html>
<html>
  <head>
    <title>{{title}}</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    {{> header }}
    {{{body}}}
    {{> footer }}
  </body>
</html>

```

```javascript
// file /views/partials/header.hbs
<h3>This is header</h3>
```

```javascript
// file /views/partials/footer.hbs
<h3>This is footer</h3>
```

```javascript
// file index.hbs
<h1>{{title}}</h1>
List of programming languages
<ul>
  {{#each list}}
    <li>{{name}}</li>
  {{/each }}
</ul>

```

# Kết luận
Như vậy mình vừa thử sử dụng một vài view engine khá phổ biến trong project Nodejs. Và nếu lựa chọn để phát triển sản phẩm thì mình chọn Pug vì nó rất đơn giản và dễ hiểu, còn bạn bạn chọn view engine nào cho project Nodejs? :D