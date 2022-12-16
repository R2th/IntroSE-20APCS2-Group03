# Tìm hiểu về Node.js

Node.js là framework mã nguồn mở cho server. Nó cho phép ta chạy JavaScript trên server. Node.js chạy trên một vài nền tảng (Windows, Linux, Unix, Mac OS X,...)

Node.js sử dụng lập trình bất đồng bộ, tức là giả sử ta có một task đơn giản là truy vấn lên web server để mở và trả về nội dung của một file cho client thì với PHP hoặc ASP sẽ xử lý như sau:

1. Nhận và xử lý yêu cầu, gửi yêu cầu cho hệ thống file của máy chủ.
2. Chờ trong khi hệ thống mở và đọc file.
3. Trả về nội dung cho client.
4. Sẵn sàng cho yêu cầu tiếp theo.

Còn Node.js xử lý như sau:

1. Nhận và xử lý yêu cầu, gửi yêu cầu cho hệ thống file của máy chủ.
2. Sẵn sàng cho yêu cầu tiếp theo.
3. Khi hệ thống mở và đọc được file thì trả về nội dung client.

Node.js loại bỏ quá trình chờ đợi trong việc nhận request.

Node.js có thể thực hiện các công việc sau:

* Sinh ra nội dung động cho trang web.
* Tạo, mở, đọc, xóa, đóng file trên server.
* Thu thập dữ liệu của form
* Thêm, xóa, sửa dữ liệu của cơ sở dữ liệu.

# Bắt đầu Node.js

Để làm việc với Node.js ta cần cài đặt Node.js từ link https://nodejs.org/. Sau khi cài đặt và có file .js ta có thể chạy file thông qua command line

```
node <tên file>.js
```

Ví dụ về một file Node.js thực hiện trả về một chuỗi khi truy cập vào link server:

```
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);
```

Về mặt cú pháp và các câu lệnh cơ bản thì Node.js sử dụng javascript nên các file Node.js sẽ sử dụng javascript và có đuôi mở rộng là .js.

# Các thành phần của Node.js

## Node.js Module

Ta có thể coi một module của Node.js như một thư viện của JavaScript, là một tập các hàm ta có thể thêm vào ứng dụng để sử dụng. Node.js có một tập các module có sẵn mà ta có thể sử dụng mà không cần cài đặt. Ngoài ra ta cũng có thể tự viết các module riêng cho mình.

Để sử dụng được các module ta cần thêm module vào file Node.js mà ta sử dụng bằng cú pháp:

```
\\ Thêm module http vào.
var http = require('http');
```

Khi đó ta có thể sự dụng các hàm của module http:

```
\\Tạo một server cổng 8080 trả về một trang với Hello World! khi truy cập.
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);
```

Tạo một module của riêng mình:

1. Tạo một file .js
2. Sử dụng *exports* để exports hàm này ra để có thể sử dụng được ngoài module.
3. Thêm module là tên của file .js thông qua *require*.

## Node.js HTTP module.

Node.js có một module có sẵn được gọi là HTTP, cho phép Node.js truyền dữ thông qua giao thức HTTP.

Module http có thể tạo một HTTP server để nhận request và trả về response cho client trên một cổng nào đó sử dụng phương thức createServer().

```
var http = require('http');

//Tạo một server
http.createServer(function (req, res) {
  res.write('Hello World!'); //ghi response cho client
  res.end(); //kết thúc resonpse
}).listen(8080); //server nhận các yêu cầu qua cổng 8080
```

function được truyền vào phương thức createServer() sẽ được thực hiện khi ai đó có gắng truy cập vào cổng 8080 của server. Ta có thể thêm http header vào response cho client bằng phương thức writeHead().

```
var http = require('http');
http.createServer(function (req, res) {
  \\thêm header với content-type và status code.
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!');
  res.end();
}).listen(8080);
```

function được truyền vào createServer() có 2 tham số là req và res. req thể hiện cho request từ client, nó có thuộc tính url giữ một phần url nằm phía sau tên miền. Sử dụng thuộc tính này ta có thể nhận được query string của request.

## Node.js file system module

Node.js file system cho phép ta làm việc với hệ thống file trên server bao gồm:

* Đọc file.
* Tạo file.
* Cập nhập file
* Xóa file.
* Đổi tên file.

Đề sử dụng module này ta thêm nó vào

```
var fs = require('fs');
```

Để đọc file ta sử dụng hàm readFile().

```
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  \\đọc file và ghi nội dung của nó vào response.
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);
```

Tạo file ta có thể dùng 3 phương thức.

* appendFile(). Chèn nội dung vào một file, nếu file không tồn tại thì file sẽ được tạo và chèn nội dung vào.

```
var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
```

* open(). Nhận tham số thứ 2 như là cờ chỉ thị, nếu là w tương ứng sẽ là writing để chỉ file được mở để ghi. Nếu file không tồn tại một file mới được tạo.

```
var fs = require('fs');

fs.open('mynewfile2.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});
```

* writeFile() được dùng để thay thế nội dung của một file nếu đã tồn tại. Nếu file không tồn tại thì file mới được tạo và sẽ chứa nội dung cần được thêm vào.

```
var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
```

Để update file ta sử dụng 2 phương thức:

* appendFile().
* writeFile().

Để xóa file ta sử dụng phương thức:

* unlink()

```
var fs = require('fs');

fs.unlink('mynewfile2.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});
```

Đổi tên file ta sử dụng phương thức:

* rename() với tham số đầu là tên mới, tham số thứ 2 là tên file cần đổi tên.

```
var fs = require('fs');

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});
```
## Node.js NPM

NPM là công cụ quản lý package cho Node.js. Sử dụng NPM cho phép chúng ta tải các package/module của node về để sử dụng, nó đã được cài đặt khi ta cài đăt node. Để cài đặt package ta sử dụng command line:

```
npm install <tên package>
```

## Node.js event.

Node.js thích hợp cho các ứng dụng dựa trên event. Tất cả mọi hành động trên server đều là một event như mở file. Node.js có một module có sẵn gọi là Events cho phép tạo, bắn ra, và lắng nghe event mà ta tạo ra. Để sử dụng ta thêm events module vào. Sau đó tạo một đối tượng của EventEmitter, khi đó ta có thể sử dụng các thuộc tính và phương thức của nó.

```
var events = require('events');
var eventEmitter = new events.EventEmitter();
```

Để bắn ra event ta sử dụng phương thứ emit(). Để nghe và xử lý event ra sử dụng phương thức on()

```
var events = require('events');
var eventEmitter = new events.EventEmitter();

//Tạo một event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}

//Gắn event với event handler.
eventEmitter.on('scream', myEventHandler);

//Bắn ra event.
eventEmitter.emit('scream');
```

# Kết luận.

Trên đây là các thành phần cơ bản của Node.js cung cấp cho ta cái nhìn khái quát về Node.js là gì và các thành phần của nó. Ở các bài tiếp theo ta sẽ tìm hiểu về kết nối cơ sở dữ liệu, các module hữu ích, ...
# Tài liệu tham khảo.
1. https://www.w3schools.com/nodejs/default.asp