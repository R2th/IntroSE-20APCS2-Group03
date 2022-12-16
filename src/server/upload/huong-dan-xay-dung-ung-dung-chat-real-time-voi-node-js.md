Trong hướng dẫn này, chúng ta sẽ học cách xây dựng một ứng dụng trò chuyện thời gian thực đơn giản bằng Node, Express và Socket.io. Ứng dụng trò chuyện này sẽ hỗ trợ tên người dùng tùy chỉnh, tham gia và để lại tin nhắn và tất nhiên chính các tin nhắn đó, tất cả đều ở thời gian thực. Dưới đây là một cái nhìn vào ứng dụng đã hoàn thành:

![](https://images.viblo.asia/d021e5e7-2d89-4643-ba4a-1964d55b2530.png)

Chúng ta sẽ tạo một ứng dụng Node.js , vì vậy hãy chắc chắn rằng bạn đã cài đặt nó.

# Bắt đầu
* Tạo một thư mục
* Cd vào thư mục đó trong terminal của bạn (dòng lệnh)
* Chạy npm init. Sẽ tạo một package.jsontập tin mới . (nó sẽ hỏi bạn tên / phiên bản, v.v.)
* Cài đặt các dependencies bằng cách chạy:
```
        npm install --save express // a web framework for node
        npm install --save socket.io // real-time module for our app
```
# Cấu trúc tập tin
Bây giờ các dependencies của chúng ta đã được cài đặt, hãy tạo cấu trúc tệp của chúng ta:

* Thêm một file server.js
* Tạo một thư mục có tên publicvới các tệp sau: - index.html- style.css-client.js
# Thiết lập máy chủ

Mở  tập tin **server.js** lên. Đây là nơi chúng ta cần yêu cầu **express và socket.io** và tạo một máy chủ mới. Chúng ta cũng cần sử dụng app.get để phân phối tệp HTML một cách dễ dàng. Ngoài ra, chúng ta phải cho express biết rằng tất cả các tệp tĩnh (html, css, js) của chúng ta đều nằm trong thư mục chung. Cuối cùng, chúng ta cần mở một cổng trên localhosttên máy chủ:

```
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.get("/", function(req, res, next) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static("public"));

server.listen(7777);
```

Bây giờ, mở tập tin index.html  của bạn trong thư mục công cộng. Trong đó, chúng ta sẽ cần tạo một tài liệu HTML bình thường với các mục sau:

Liên kết tập tin CSS của chúng tôi
Tạo một formvới hai đầu vào - một cho tin nhắn (có id), một cho nút gửi
Tạo một ulid với các tin nhắn đi vào
Link liên kết JQuery cho JavaScript phía máy khách của chúng tôi
Link liên kết /socket.io/socket.io.js
Link liên kết client.js

```
 <html>  
    <head>
      <title> Real Time Chat </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="style.css" />
    </head>
    <body>
        <h1> Chat! </h1>
        <form>
            <input id="message" type="text" placeholder="message">
            <input type="submit" value="Send">
        </form>

        <ul id="thread"></ul>

        <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>

        <script src="/socket.io/socket.io.js"></script>

        <script src="client.js"></script>  
    </body>
 </html> 
```
Bây giờ bạn hãy di chuyển vào forder mình vừa tạo , hãy chạy **node server.js** và chuyển đến  **localhost:7777** trong trình duyệt của bạn, bạn sẽ thấy tệp HTML của mình được hiển thi.

# Tương tác với máy chủ
Mở   tập tin  **client.js** của bạn lên . Tại thời điểm này, chúng tôi cần kết nối với máy chủ của chúng ta bằng **io.connect** . Khi kết nối, chúng ta hãy phát ra một thông báo để xác nhận kết nối của chúng ta với một sự kiện  join.
```
var socket = io.connect("http://localhost:7777");
socket.on("connect", function(data) {
  socket.emit("join", "Hello server from client");
});
```

Sau đó, chúng ta có thể mở lại tập tin **server.js** của mình và ghi lại một thông báo rằng máy khách được kết nối. Ngoài ra, chúng tôi có thể lắng nghe **join** sự kiện chúng tôi đã viết trước đó để ghi lại dữ liệu từ máy khách. Đây là cách nó sẽ hoạt động:
```
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.get("/", function(req, res, next) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static("public"));

io.on("connection", function(client) {
  console.log("Client connected...");

  client.on("join", function(data) {
    console.log(data);
  });
});

server.listen(7777);
```

Bây giờ, nếu bạn chạy lại tệp **server.js** trong thiết bị đầu cuối của mình (CTRL + C để thoát) và làm mới  localhost:7777 trong trình duyệt của bạn, bạn sẽ thấy các thông báo client connected...&  Hello server from clienttrong thiết bị đầu cuối xác nhận kết nối!

# Tạo ứng dụng chat
Cuối cùng! Bây giờ chúng ta có kết nối, chúng ta có thể sử dụng nó để phát và gửi tin nhắn. Đây là những gì chúng ta cần làm trong tập tin client.js :

* Lắng nghe một sự kiện ( thread) sẽ nhận được bất kỳ tin nhắn nào được phát ra từ máy chủ có
* sử dụng hàm JQuery .submit () để - phát thông báo từ messageid của chúng ta (trong đầu vào của chúng tôi) - đặt lại biểu mẫu - sử dụng return false; để ngăn chặn từ hành động mặc định của nó (trang làm mới)
```

var socket = io.connect("http://localhost:7777");
socket.on("connect", function(data) {
  socket.emit("join", "Hello server from client");
});


socket.on("thread", function(data) {
  $("#thread").append("<li>" + data + "</li>");
});


$("form").submit(function() {
  var message = $("#message").val();
  socket.emit("messages", message);
  this.reset();
  return false;
});
```

Tuy nhiên, trước khi chúng ta có một ứng dụng chức năng, chúng ta phải thêm messages sự kiện vào máy chủ của chúng ta và phát ra nó vào sự kiện!
```
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.get("/", function(req, res, next) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static("public"));

io.on("connection", function(client) {
  console.log("Client connected...");

  client.on("join", function(data) {
    console.log(data);
  });

  client.on("messages", function(data) {
    client.emit("thread", data);
    client.broadcast.emit("thread", data);
  });
});

server.listen(7777);
```

# Sửa lại giao diện
Mở file style.css và tùy chỉnh nó theo ý thích của bạn!
```
 html, body {
    text-align: center;
    font-family: 'Avenir Next', 'Helvetica', 'Arial', sans-serif;
  }

  html,body,li,form,ul {
    padding: 0;
    margin: 0;
  }

  form {
    padding-bottom: 2%;
  }

  li {
    list-style: none;
    width: 100vw;
  }

  li:nth-child(odd) {
    background: #eee;
  }
```
Như vậy, ta đã hoàn thành một ứng dụng chat đơn giản bằng node js + socket io ! Nếu bạn mở nhiều tab, bạn sẽ thấy các tin nhắn đang được gửi real time!

**Cảm ơn các bạn đã xem bài viết của mình**