# 1: EventEmitter
**EventEmitter** là một lớp trong Node, lớp này có chức năng chính là phát sinh sự kiện, vì Node chạy theo hướng lập trình sự kiện nên lớp này là một trong số những lớp cốt lõi của Node, cũng vì thế nên dù EventEmitter không liên quan gì tới web nhưng đóng một vai trò rất quan trọng.

Ví dụ
Chúng ta tạo một file có tên pulser.js với nội dung như sau:

pulser.js

```javascript
var events = require('events');
var util = require('util');

function Pulser() {
    events.EventEmitter.call(this);
}

util.inherits(Pulser, events.EventEmitter);

Pulser.prototype.start = function() {
    var self = this;
    this.id = setInterval(function() {
    self.emit('pulse');
    }, 1000);
}

var pulser = new Pulser();
pulser.on('pulse', function() {
    console.log('pulse received');
});
pulser.start();
```

Trong đoạn code trên chúng ta định nghĩa lớp Pulser kế thừa từ lớp EventEmitter.

```javascript
var events = require('events');
var util = require('util');
```

Đầu tiên chúng ta cần dùng 2 gói là events và util.

```javascript

function Pulser() {
    events.EventEmitter.call(this);
}
util.inherits(Pulser, events.EventEmitter);
```
Tiếp theo đoạn code trên chúng ta định nghĩa lớp Pulser bằng hàm khởi tạo Pulser(), dòng events.EventEmitter.call(this) và util.inherits(...) có tác dụng sao chép toàn bộ những gì có trong lớp EventEmitter vào lớp Pulser, hay nói cách khác là ở đây chúng ta tiến hành cho lớp Pulser kế thừa từ lớp EventEmitter.

```javascript
Pulser.prototype.start = function() {
    ...
    self.emit('pulse');
    ...
}
```

Tiếp theo chúng ta định nghĩa hàm start() cho đối tượng prototype của lớp Pulser, hàm này về cơ bản thì cứ sau 1 giây sẽ phát đi một sự kiện bằng phương thức emit().

Phương thức emit() là phương thức của lớp EventEmitter nhưng chúng ta đã cho kế thừa trong lớp Pulser nên có thể gọi từ lớp Pulser. Phương thức emit() sẽ làm công việc phát sinh một sự kiện để các đối tượng khác có thể lắng nghe và “bắt” sự kiện này, tham số đầu vào của phương thức emit() gồm có 1 chuỗi là tên sự kiện dùng để phân biệt các sự kiện, sau đó là danh sách các tham số, ở đây chúng ta không đưa vào tham số nào, nhưng giả sử nếu muốn bạn có thể truyền bất cứ thứ gì cũng được, ví dụ emit('pulse', 1, 'hello world', 2.7465).

```javascript
var pulser = new Pulser();
pulser.on('pulse', function() {
    console.log('pulse received');
});
pulser.start();
```

Tiếp theo chúng ta tạo một đối tượng lớp Pulser(), sau đó chúng ta cho đối tượng này “lắng nghe” sự kiện pulse bằng phương thức on(), phương thức này nhận vào tên sự kiện và hàm sẽ xử lý sự kiện đó, ở đây sự kiện phát đi không mang theo tham số nào, nhưng giả sử như nếu có thì nếu muốn bắt các tham số đó, chúng ta chỉ cần khai báo trong hàm xử lý là được, ví dụ:

```javascript
pulser.on('pulse', function(arg1, arg2, someArg) {
    console.log('pulse received', arg1, arg2, someArg);
});
```

Chạy đoạn code trên chúng ta được kết quả như sau:

Output

```scala
quanghoa@evilgod:~/Project/JS$ node pulser.js
pulse received
pulse received
pulse received
pulse received
pulse received
pulse received
pulse received
...
```
Bạn có thể phát ra bao nhiêu sự kiện cũng được, và mỗi sự kiện có thể có bao nhiêu phương thức lắng nghe cũng được.

# 2: HTTP Server 
Đối tượng HTTP Server là đối tượng chính trong một ứng dụng Node, mục đích chính của đối tượng này là lắng nghe và giao tiếp với các kết nối HTTP. Mặc dù sau này hầu hết (hoặc chắc chắn) chúng ta sẽ sử dụng một web framework khác là Express để phát triển ứng dụng vì framework này đã đơn giản hóa mọi thứ, chúng ta chỉ cần quan tâm đến việc phát triển các tính năng chứ không cần quan tâm đến mấy thứ cấp dưới như giao thức, gói tin…v.v. nhưng vì Express cũng được xây dựng dựa trên đối tượng HTTP Server nên ít nhất chúng ta cũng nên tìm hiểu qua.

Trong bài [cài đặt Node](https://viblo.asia/p/nodejs-bai-02-huong-dan-cai-dat-va-su-dung-node-js-WAyK84voKxX), chúng ta đã viết thử một web server đơn giản như sau:

server.js

```css
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello, World!\n');
}).listen(8124, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8124');
```

Hàm http.createServer() sẽ tạo một đối tượng http.Server, và bởi vì đối tượng này kế thừa từ lớp EventEmitter nên chúng ta có thể viết lại đoạn code trên cho dễ nhìn hơn như sau:

server.js
```javascript
var http = require('http');
var server = http.createServer();
server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello, World!\n');
});
server.listen(8124, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8124');
```

Khi sự kiện request xảy ra (tức là khi có người truy cập vào website), hàm function(req, res) {...} sẽ được gọi, hàm này có 2 tham số là req và res, trong đó req là một đối tượng lớp http.IncomingMessage, còn res là đối tượng lớp http.ServerResponse. Đối tượng req chứa thông tin của gói tin được gửi lên, đối tượng res sẽ chứa những dữ liệu trả về cho trình duyệt. Hàm listen() sẽ chạy server và lắng nghe trên cổng do chúng ta chỉ định, ở đây là cổng 8124.

Chúng ta sẽ sửa lại đoạn code trên một tí để server trả về một số thông tin khác thay vì chỉ in ra dòng chữ Hello, World như trên:

server.js

```javascript
var http = require('http');
var util = require('util');
var url  = require('url');
var os   = require('os');
var server = http.createServer();
server.on('request', function(req, res) {
    var reqUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    var content = "";

    if(reqUrl.pathname === '/') {
        content += "<html>";
        content += "<head>";
        content += "<title>Hello, World!</title>";
        content += "</head>";
        content += "<body>";
        content += "<p><a href='/osinfo'>OS Info</a></p>";
        content += "</body>";
        content += "</html>";
    } else if (reqUrl.pathname === '/osinfo') {
        content += "<html>";
        content += "<head>";
        content += "<title>Operating System Info</title>";
        content += "</head>";
        content += "<body>";
        content += "<h1>Operating System Info</h1>";
        content += "<table>";
        content += "<tr><th>TMP Directory</th><td>" + os.tmpDir() + "</td></tr>";
        content += "<tr><th>Host Name</th><td>" + os.hostname() + "</td></tr>";
        content += "<tr><th>OS Type</th><td>" + os.type() + " " + os.platform() + " " + os.arch() + "</td></tr>";
        content += "<tr><th>Memory</th><td>total: " + os.totalmem() + ", free: " + os.freemem() + "</td></tr>"; 
        content += "</table>";
        content += "</body>";
        content += "</html>";
    }

    res.end(content);

});
server.listen(8124);
console.log('Listening to http://127.0.0.1:8124');
```
Nếu bạn đã từng làm việc với PHP thì đoạn code trên làm một số công việc tương tự như hàm sysinfo() trong PHP, module os có chức năng cung cấp các thông tin về server, nếu muốn bạn có thể tìm hiểu thêm về module này trên mạng.

Điều quan trọng hơn cần quan tâm trong đoạn code trên là phần routing, tức là phần xử lý từng đường dẫn url riêng biệt. Khi chúng ta gõ 127.0.0.1:8124 lên trình duyệt thì trình duyệt sẽ gửi một gói tin HTTP đến server và server sẽ truyền gói tin đó vào tham số req trong hàm xử lý, tham số này chứa một số thông tin có thể dùng cho việc routing là request.url và request.method.

Ở đoan code trên chúng ta dùng trường request.url để routing, đây là một chuỗi chứa đường dẫn phía sau địa chỉ server, ví dụ 127.0.0.1:8124 thì request.url chỉ là '/', nếu 127.0.0.1:8124/osinfo thì request.url là '/osinfo'. Ngoài ra chúng ta không dùng tham số này một cách bình thường mà thay vào đó chúng ta tạo một đối tượng lớp URL bằng phương thức url.parse(), sau đó mỗi lần kiểm tra đường dẫn để trả về nội dung thì chúng ta xem trường url.pathname.

Ngoài url ra thì có một tham số chúng ta cũng hay quan tâm tới là request.method, nếu bạn đã từng làm web trước đây thì bạn sẽ biết là một yêu cầu gửi lên server thường có các kiểu method như GET, POST, PUT... ở đây chúng ta chưa đụng tới và sẽ tìm hiểu trong các bài sau.

Ngoài ra cách kiểm tra đường dẫn bằng cách so sánh chuỗi trong đoạn code trên thường không hiệu quả với các ứng dụng lớn, vì các ứng dụng lớn thường có đường dẫn rất phức tạp và có cả tham số nên thường chúng ta sẽ sử dụng các phương pháp khớp mẫu chuỗi để routing, chúng ta sẽ tìm hiểu thêm trong các bài sau.

Chạy đoạn code trên chúng ta có kết quả tương tự như sau:
![](https://images.viblo.asia/1646055d-73ab-4a72-8c6c-1571eae003bf.png)

Tham khảo: https://devskill.org/gioi-thieu-ve-eventemitterr-va-http-server-trong-nodejs