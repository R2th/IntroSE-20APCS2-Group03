Có rất nhiều template engine được sử dụng cho Nodejs. Nếu chúng ta sử dụng Express.js thì có thể cái plug-in consolidate.js nó hỗ trợ rất nhiều template engine, có thể kể ra danh sách template engine như sau.
* atpl
* dust (website)
* eco
* ect (website)
* ejs
* haml (website)
* haml-coffee (website)
* handlebars (website)
* hogan (website)
* jade (website)
* jazz
* jqtpl (website)
* JUST
* liquor
* mustache
* QEJS
* swig (website)
* templayed
* toffee
* underscore (website)
* walrus (website)
* whiskers

Nhưng với việc có rất nhiều template engine thì sẽ khiến chúng ta phân vân không biết nên chọn cái nào.
Để trả lời cho câu hỏi cái nào sẽ là template engine tốt nhất cho Nodejs?
Câu trả lời có lẽ là không có, vì nếu đã có một template engine tốt nhất rồi thì tại sao lại còn có những template engine khác làm gì. Ở đây chúng ta chỉ có thể trả lời cho việc Template engine nào được sử dụng nhiều nhất, và điểm mạnh, điểm yếu của mỗi cái để người dùng có thể chọn lựa sao cho phù hợp với dự án.
# Những Template Engine phổ biến
Theo như nghiên cứu tài liệu từ một số chỗ, chẳng hạn như 
[](https://www.quora.com/What-is-the-best-Node-js-template-engine)
[](https://tutorialzine.com/forum/111/the-best-nodejs-templating-engine)
[](https://expressjs.com/en/guide/using-template-engines.html)
Jade có vẻ như là template engine được dùng phổ biến nhất, nó cũng là template engine mặc định khi mà cài đặt Express.js, nhưng có vẻ như khá nhiều khá thích sử dụng EJS bởi vì tính thuận tiện và đơn giản
![](https://images.viblo.asia/91e46ed7-00ce-45c4-9a9d-efad0c14de9c.png)

![](https://images.viblo.asia/e136f19e-0331-4db8-be70-4bff5bfaaed6.png)

Handlebars cũng là một lựa chọn tốt
![](https://images.viblo.asia/7fbf4606-1718-47d8-adbb-cbc2a6323a8b.png)

Một số suggest từ một số trang 

![](https://images.viblo.asia/ba1f73fd-5d24-4206-a935-93a2043f15d4.png)

![](https://images.viblo.asia/b6c5edcb-ad49-4790-8ace-2feae7ac9e39.png)

Ở bài này mình sẽ giới thiệu về EJS, template engine được khá nhiều người ưa dùng
# EJS
Nếu như bạn đã quen thuộc với việc sử dụng HTML thì việc dùng EJS khá dễ dàng, vì với syntax khá giống với html, bạn có thể tạo ra các partial view với ejs để giúp cho việc reused trở nên dễ dàng và giúp cho code dễ đọc, dễ bảo trì hơn.
EJS giúp bạn truyền data vào các views.
Một số bước để có sử dụng EJS với Nodejs
## Cài đặt 
chỉ cần chạy lệnh 
```
$ npm install ejs
```
## Sử dụng
```
var express = require('express'); 
var app = express();
app.set('view engine', 'ejs');
app.get('/', function(req, res){ 
 	res.render('index',{user: "Great User",title:"homepage"});
});
```
Chúng ta cần bước set view Engine cho ejs 
```
app.set('view engine', 'ejs');
```
vì mặc định khi cái express.js thì default view engine sẽ là Jade(pug)
Chúng ta truyền view tới user bằng cú pháp
```
res.render('index',{user: "Great User",title:"homepage"});
```
với index là view và dữ liệu được truyền là user và title.
Với việc tạo và sử dụng Partial views 
giả sử chúng ta đã tạo ra 2 file là header.ejs 
```
<title>
Hello World
</title>
```
và body.ejs 
```
<div>
Welcome, Great User
</div>
```

thì ở chỗ gọi tới 2 file đó chúng ta dùng từ khóa include 
```
<html>
  <head>
    <% include('header.ejs') %>
  </head>
  <body>
    <% include('body.ejs') %>
  </body>
</html>
```
Chúng ta có thể sử dụng javascript cho tempalating trong ejs 
Ở trong ejs không có hỗ trợ block, mà những việc thực hiện với các danh sách chúng ta phải sử dụng forEach
```
<ul>
  <% users.forEach(function(user){ %>
    <%= user.name %>
  <% })%>
</ul>
```
Với data tương ứng cho danh sách như sau 
```
app.get('/', function(req, res){ 
  res.render('index',{users : [
            { name: 'name1' },
            { name: 'name2' },
            { name: 'name3' }
  ]});
});
```