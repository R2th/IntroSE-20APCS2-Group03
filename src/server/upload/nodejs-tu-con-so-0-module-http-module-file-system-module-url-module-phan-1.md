# 1. Node.js nó là cái gì? 
* Node.js là môi trường server theo mã nguồn mở.
* Node.js miễn phí
* Node.js chạy đa nền tảng (Windows, Linux, Unix, Mac OS X, etc.)
* Node.js sử dụng JavaScript.
# 2.Tại sao sử dụng Node.js? 
- Nhiệm vụ chung cho web server có thể mở file trên server và trả về nội dung cho client.
- Đây là cách  PHP hoặc ASP xử lý  request:
    - Gửi task đến hệ thống computer's file.
     - Chờ đợi trong khi file system mở và đọc file.
     - Trả về nội dung file cho clinet.
     - Sẵn sàng tiến hành request tiếp theo.
 - Đây là cách Node.js xử lý  request:
    - Gửi task đến hệ thống computer's file.
   -  Sẵn sàng tiến hành request tiếp theo.
   -  Khi file system mở và đọc file, server trả về nội dung cho client,
- Node.js hạn chế việc chờ đợi và sẵn sàng cho request tiếp theo.
- Node.js chạy single-threaded, non-blocking, asynchronously programming, nên kiểm soát bộ nhớ rất hiệu quả.
# 3.First code Node.js.
- Khi bạn đã down và cài đặt Nodejs trên máy tính của bạn, hãy thử 1 ví dụ đơn giản nhất là hiển thị "Hello World" trên trình duyệt của bạn.
- Tạo file Node.js file tên "first.js",và add đoạn code sau:
```javascript
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);
```
- Nhớ file myfirst.js máy tính của bạn 
- Tiếp đó chúng ta sẽ sử dụng terminal để có thể Initiate the Node.js File. (Ở đây mình dùng VSCode) 
```javascript
cd /Users/FilePathOnYourComputer/firstJS
node first.js
```
- Tiếp đó chúng ta sẽ truy cập http://localhost:8080 để tận hưởng thành quả.
# 4.Node.js Modules.
- Nói nhiều quá không bằng bắt tay vào thực hành luôn: 
### 1/  Module  Node.js là gì?
- Module trong Node.js giống với  JavaScript libraries, tập hợp các functions bạn muốn thực hiện trong application.
### 2/  Include Modules:
- Để include một module,  bạn sử dụng  func require() với tên giống tên module: 
```javascript
var http = require('http');
```
- Bây giờ application của bạn đã có thể truy cập HTTP Module và cho phép tạo server:
```javascript
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);
```
### 3/  Tạo custom Module:
- Chúng ta sẽ tạo ra module trả về ngày và thời gian hiện tại:
```javascript
exports.myDateTime = function () {
    return Date();
};
```
- Save file trên và đặt tên là "myfirstmodule.js".
### 4/  Include custom Module:
- Sử dụng module "myfirstmodule.js" trong Node.js file "demo_module.js":
```javascript
var http = require('http');
var dt = require('./myfirstmodule');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("The date and time are currently: " + dt.myDateTime());
    res.end();
}).listen(8080);
```
- Chúng ta sử dụng ./ để chỉ nơi chứa module, nghĩa là module được đặt trong cùng thư mục chứ Node.js file.
- Tiếp đó chúng ta initiate demo và check kết quả trên : http://localhost:8080
```javascript
demo_module.js
```
# 5.Node.js HTTP Module.
### 1/  Module  Node.js là gì?
- Node.js được xây dựng dựa trên module gọi là HTTP cho phép Node.js có thể truyền data thông qua Hyper Text Transfer Protocol (HTTP).
- Để include HTTP module, chúng ta dùng require() method:
```javascript
var http = require('http');
```
### 2/ Node.js như một web server:
- HTTP module có thể tạo một HTTP server để listens server ports và trả response trở về cho client.
- Sử dụng createServer() method để tạo một HTTP Server:
```javascript
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
```
- Func truyền vào http.createServer() method sẽ được thực thi khi ai đó cố gắng truy cập vào computer thông qua port8080.
- Save đoạn code trên vào file  "demo_http.js". và initiate the file:
```javascript
node demo_http.js
```
### 4/ Add HTTP Header:
- Nếu trả về từ HTTP server có thể hiển thị HTML, bạn nên include HTTP header đúng content-type:
```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!');
  res.end();
}).listen(8080);
```
- Argument đầu tiên của res.writeHead() method là status code: 200 = OK, argument thứ 2 là 1 object chứa những header trả về.
### 5/ Đọc Query String:
- Func truyền vào trong http.createServer() có một req argument đại diện cho request từ client như một object:
- Object này có một property gọi là "url" chứa những phần của url nằm sau tên domain:
```javascript
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(req.url);
    res.end();
}).listen(8080);
```
- Save code trên vào file "demo_http_url.js" và initiate:
```javescript
node demo_http_url.js
```
- Bạn sẽ thấy các kết quả khác nhau tùy vào việc truyền query: http://localhost:8080/textyouinput
 ### 6/Chia nhỏ Query String:
- URL module có thể dễ dàng chia nhỏ query string thành nhiều phần nhỏ:
```javascript
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.end(txt);
}).listen(8080);

```
- Save code trên vào file "demo_querystring.js" và initiate:
```javescript
node demo_querystring.js
```
- Bạn sẽ thấy các kết quả khác nhau tùy vào việc truyền query: http://localhost:8080/?year=2018&month=May
# 6.Node.js File System Module.
### 1/ Node.js - File Server?
- Node.js file system module cho phép bạn làm việc với file system trên máy tính của bạn:
- Để inculde File System module chúng ta sử dụng require() method:
```javascript
var fs = require('fs');
```
- File System module: thường được dùng để:
    - Read files
    - Create files
    - Update files
    - Delete files
    - Rename files
### 2/ Read Files:
- fs.readFile() method được dùng để đọc file trên máy tính của bạn:
Chúng ta sử dụng file demofile.html để làm ví dụ:
```javascript
<html>
<body>
<h1>My Header</h1>
<p>My paragraph.</p>
</body>
</html>
```
- Tiếp đó chúng ta tạo file "demo_readfile.js" và initiate node:
```javascript
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);
```
```javascript
node demo_readfile.js
```
### 3/ Create Files:
- The File System module có những method để tạo file mới là:
    - fs.appendFile()
    - fs.open()
    - fs.writeFile()
- Tạo một file mới dùng appendFile():
```javascript
var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
```
- fs.Open method lấy "flag" như argument thứ 2, nếu "flag" = "w" thì "writing". Nếu fle không tồn tại, file trống sẽ được tạo:
- Tiếp đó chúng ta tạo file trống:
```javascript
var fs = require('fs');

fs.open('mynewfile2.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});
```
### 4/ Update Files:
- The File System module có những method để update file  là:
    - fs.appendFile()
    - fs.writeFile()
- Để update một file  dùng appendFile() method ta làm như sau:
```javascript
var fs = require('fs');

fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
  if (err) throw err;
  console.log('Updated!');
});
```
- fs.writeFile() method thay thế cho những file quy định:
```javascript
var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
  if (err) throw err;
  console.log('Replaced!');
});
```
### 5/ Delete Files:
- The File System module có  method   fs.unlink() để delete file:
- VD:
```javascript
var fs = require('fs');

fs.unlink('mynewfile2.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});
```
### 6/ Rename Files:
- The File System module có  method   fs.rename() cho phép chúng ta có thể rename file:
- VD:
```javascript
var fs = require('fs');

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});
```
# 7.Node.js URL Module.
    - The URL module chia nhỏ web address thành những phần nhỏ có thể dễ dàng đọc:
    - Để include URL Mode chúng ta sử dụng require() method:
 ```javascript
 var url = require('url');
 ```
 - Parse địa chỉ với url.parse() method, nó sẽ trả về URL object với mỗi phần của address như properties:
 ```javascript
 var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2018&month=may';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2018&month=may'

var qdata = q.query; //returns an object: { year: 2018, month: 'may' }
console.log(qdata.month); //returns 'may'
````
- Giờ chúng ta đã biết làm thế nào để parse query string:
- Tạo hai file html và save chúng cùng file node.js:
summer.html
```javascript
<!DOCTYPE html>
<html>
<body>
<h1>Summer</h1>
<p>I love the sun!</p>
</body>
</html>
```
winter.html
```javascript
<!DOCTYPE html>
<html>
<body>
<h1>Winter</h1>
<p>I love the snow!</p>
</body>
</html>
```
- Tạo Node.js file để mở request file và trả về content cho client. Nếu có gì sai, hãy throw 404 error:
demo_fileserver.js
```javescript
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);
```
- Hãy nhớ initiate file:
```javescript
node demo_fileserver.js
```
- Đến đây đừng quên check kết quả trên: ttp://localhost:8080/summer.html và ttp://localhost:8080/winter.html nhé